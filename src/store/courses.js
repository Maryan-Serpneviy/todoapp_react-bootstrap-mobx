import { observable, computed, action } from 'mobx'

export default class CoursesStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.service = this.rootStore.service
        this.storage = this.rootStore.storage
        this.sortDirect = this.rootStore.sortDirect
        this.sortReverse = this.rootStore.sortReverse
    }

    @observable items = []
    @observable editValue = ''

    cached = []
    matched = []
    currId = null
    addValue = ''

    editKey = 'course'
    storageKey = 'courses'
    
    isSorted = {
        course: false,
        students: false
    }

    @computed get getId() {
        return (rawId) => Number(/\d+/.exec(rawId)[0])
    }

    @computed get itemExist() {
        return this.cached.some(el => {
            return el[this.editKey].toLowerCase() === this.addValue.toLowerCase()
        })
    }

    @action loadItems() {
        try {
            const serializedState = this.storage.getItem(this.storageKey)
            if (serializedState === null) {
                return undefined
            }
            this.items = JSON.parse(serializedState)
            this.cached = [...this.items] // for search results filter
        } catch (err) {
            this.items = this.service.getCourses()
            this.cached = this.service.getCourses()
        }
    }

    @action handleNew(inputVal) {
        this.addValue = inputVal
        this.matched = this.cached.filter(el => {
            return el[this.editKey]
                .toLowerCase()
                .includes(inputVal.toLowerCase())
        })
        this.items = [...this.matched]
    }

    @action add() {
        if (!this.itemExist && this.addValue.trim()) {
            this.cached.unshift({
                id: Math.round(Math.random() * 10000),
                students: Math.round(Math.random() * 100),
                course: this.addValue
            })
            this.items = [...this.cached]
            this.addValue = ''
            this.setItems()
        }
    }

    @action setEditValue(rawId) {
        this.currId = this.getId(rawId)
        this.editValue = this.items.find(el => el.id === this.currId)[this.editKey]
    }

    @action change(newVal) {
        this.editValue = newVal
    }

    @action edit(id) {
        this.items.find(el => el.id === id)[this.editKey] = this.editValue
        this.cached.find(el => el.id === id)[this.editKey] = this.editValue
        this.setItems()
    }

    @action delete(id) {
        this.items = this.cached.filter(el => el.id !== id)
        this.cached = [...this.items] // update cached data
        this.addValue = ''
        this.setItems()
    }

    @action sort(title) {
        const prop = title.toLowerCase()
        
        !this.isSorted[prop] ?
            this.items = this.sortDirect(this.items, prop) :
            this.items = this.sortReverse(this.items, prop)

        this.isSorted[prop] = !this.isSorted[prop]
    }

    @action dragAndDrop(newItems) {
        this.items = newItems
        this.cached = newItems
        this.setItems()
    }

    setItems() {
        try {
            this.storage.setItem(this.storageKey, JSON.stringify(this.cached))
        } catch (err) {
            console.error(err)
        }
    }
}
