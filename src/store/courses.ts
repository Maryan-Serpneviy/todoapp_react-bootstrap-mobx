import { observable, computed, action } from 'mobx'

export default class CoursesStore {
    constructor(rootStore: object) {
        this.rootStore = rootStore
        this.service = this.rootStore.service
        this.storage = this.rootStore.storage
        this.sortDirect = this.rootStore.sortDirect
        this.sortReverse = this.rootStore.sortReverse
    }

    @observable items: object[] = []
    @observable editValue: string = ''

    private cached: object[] = []
    private matched: object[] = []
    addValue = ''
    currId: number = null

    private editKey = 'course'
    private storageKey = 'courses'
    
    private isSorted = {
        course: false,
        students: false
    }

    @computed get getId() {
        return (rawId: string): number => Number(/\d+/.exec(rawId)[0])
    }

    @computed get itemExist(): boolean {
        return this.cached.some(el => {
            return el[this.editKey].toLowerCase() === this.addValue.toLowerCase()
        })
    }

    @action loadItems() {
        try {
            const serializedState = this.storage.getItem(this.storageKey)
            this.items = JSON.parse(serializedState)
            this.cached = [...this.items] // for search filter
        } catch (err) {
            this.items = this.service.getCourses()
            this.cached = this.service.getCourses()
        }
    }

    @action handleNew(inputVal: string): void {
        this.addValue = inputVal
        this.matched = this.cached.filter(el => {
            return el[this.editKey]
                .toLowerCase()
                .includes(inputVal.toLowerCase())
        })
        this.items = [...this.matched]
    }

    @action add(): void {
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

    @action setEditValue(rawId: string): void {
        this.currId = this.getId(rawId)
        this.editValue = this.items.find(el => el.id === this.currId)[this.editKey]
    }

    @action change(newVal: string): void {
        this.editValue = newVal
    }

    @action edit(id: number): void {
        if (this.editValue.trim()) {
            this.items.find(el => el.id === id)[this.editKey] = this.editValue
            this.cached.find(el => el.id === id)[this.editKey] = this.editValue
            this.setItems()
        }
    }

    @action delete(id: number): void {
        this.items = this.cached.filter(el => el.id !== id)
        this.cached = [...this.items] // update cached data
        this.addValue = ''
        this.setItems()
    }

    @action sort(title: string): void {
        const prop = title.toLowerCase()
        
        !this.isSorted[prop] ?
            this.items = this.sortDirect(this.items, prop) :
            this.items = this.sortReverse(this.items, prop)

        this.isSorted[prop] = !this.isSorted[prop]
    }

    @action dragAndDrop(newItems: object[]): void {
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
