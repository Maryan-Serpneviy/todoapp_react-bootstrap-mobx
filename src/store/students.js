import { observable, action } from 'mobx'

export default class StudentsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.courses = this.rootStore.courses
        this.service = this.rootStore.service
        this.storage = this.rootStore.storage

        this.getId = this.courses.getId
        this.itemExist = this.courses.itemExist
        this.handleNew = this.courses.handleNew
        this.setEditValue = this.courses.setEditValue
        this.change = this.courses.change
        this.edit = this.courses.edit
        this.delete = this.courses.delete
        this.sort = this.courses.sort
        this.setItems = this.courses.setItems
        this.getItems = this.courses.getItems
    }

    @observable items = []
    @observable editValue = ''

    cached = []
    matched = []
    addValue = ''
    editKey = 'name'
    storageKey = 'students'

    isSorted = {
        name: false,
        email: false
    }

    @action loadItems() {
        if (!localStorage.getItem(this.storageKey)) {
            this.requestItems()
        } else {
            this.getItems()
        }
    }

    @action requestItems() {
        return new Promise((resolve, reject) => {
            this.service.getUsers().then(data => {
                this.items = data
                this.cached = data
                resolve(true)
                reject(false)
            })
        })
    }

    @action add() {
        const exist = this.cached.some(el => {
            return el.name.toLowerCase() === this.addValue.toLowerCase()
        })
        if (!exist) {
            const email = this.cached[Math.round(Math.random() * this.cached.length)].email

            this.cached.unshift({
                id: Math.round(Math.random() * 10000),
                name: this.addValue,
                email
            })
            this.items = [...this.cached]
            this.setItems()
        }
    }
}
