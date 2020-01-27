import { observable, computed, action } from 'mobx'
import { getCourses } from '~/api/courses'
import { sortDirect, sortReverse } from '~/helpers/sort'

export default class CoursesStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.service = this.rootStore.service
        this.storage = this.rootStore.storage
    }

    @observable items = getCourses()
    @observable editValue = ''

    cached = getCourses()
    matched = []
    addValue = ''
    editKey = 'course'
    
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

    @action handleNew(inputVal) {
        this.matched = this.cached.filter(el => {
            return el[this.editKey]
                .toLowerCase()
                .includes(inputVal.toLowerCase())
        })
        this.items = [...this.matched]
        this.addValue = inputVal
    }

    @action add() {
        if (!this.itemExist) {
            this.cached.unshift({
                id: Math.round(Math.random() * 10000),
                students: Math.round(Math.random() * 100),
                course: this.addValue
            })
            this.items = [...this.cached]
        }
    }

    @action setEditValue(id) {
        this.editValue = this.items.find(el => el.id === id)[this.editKey]
    }

    @action change(newVal) {
        this.editValue = newVal
    }

    @action edit(id) {
        this.items.find(el => el.id === id)[this.editKey] = this.editValue
        this.cached.find(el => el.id === id)[this.editKey] = this.editValue
    }

    @action delete(id) {
        this.items = this.cached.filter(el => el.id !== id)
        this.cached = [...this.items]
    }

    @action sort(title) {
        const prop = title.toLowerCase()
        
        !this.isSorted[prop] ?
            this.items = sortDirect(this.items, prop) :
            this.items = sortReverse(this.items, prop)

        this.isSorted[prop] = !this.isSorted[prop]
    }
}
