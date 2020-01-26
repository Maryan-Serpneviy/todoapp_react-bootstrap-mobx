import { observable, computed, action } from 'mobx'
import getCourses from '~/api/courses'
import { sortDirect, sortReverse } from '~/helpers/sort'

export default class CoursesStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable items = getCourses()
    @observable editValue = ''

    cached = getCourses()
    matched = []
    addValue = ''
    
    isSorted = {
        course: false,
        students: false
    }

    @computed get getId() {
        return (rawId) => Number(/\d+/.exec(rawId)[0])
    }

    @action handleNew(inputVal) {
        this.matched = this.cached.filter(el => {
            return el.course.toLowerCase().includes(inputVal.toLowerCase())
        })
        this.items = [...this.matched]
        this.addValue = inputVal
    }

    @action add() {
        const exist = this.cached.find(el => {
            return el.course.toLowerCase() === this.addValue.toLowerCase()
        })
        if (!exist) {
            this.cached.push({
                id: Math.round(Math.random() * 10000),
                students: Math.round(Math.random() * 100),
                course: this.addValue
            })
            this.items = [...this.cached]
        }
    }

    @action setEditValue(id) {
        this.editValue = this.items.find(el => el.id === id).course
    }

    @action change(newVal) {
        this.editValue = newVal
    }

    @action edit(id) {
        this.items.find(el => el.id === id).course = this.editValue
        this.cached.find(el => el.id === id).course = this.editValue
    }

    @action delete(id) {
        this.items = this.cached.filter(el => el.id !== id)
        this.cached = [...this.items]
    }

    @action sort(title) {
        const prop = String(title.toLowerCase())
        
        !this.isSorted[prop] ?
            this.items = sortDirect(this.items, prop) :
            this.items = sortReverse(this.items, prop)

        this.isSorted[prop] = !this.isSorted[prop]
    }
}
