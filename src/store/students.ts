import { observable, action, computed } from 'mobx'

export default class StudentsStore {
    constructor(rootStore: object) {
        this.rootStore = rootStore
        this.courses = this.rootStore.courses
        this.service = this.rootStore.service
        this.storage = this.rootStore.storage
        this.sortDirect = this.rootStore.sortDirect
        this.sortReverse = this.rootStore.sortReverse

        this.getId = this.courses.getId
        this.handleNew = this.courses.handleNew
        this.setEditValue = this.courses.setEditValue
        this.change = this.courses.change
        this.edit = this.courses.edit
        this.delete = this.courses.delete
        this.sort = this.courses.sort
        this.dragAndDrop = this.courses.dragAndDrop
        this.setItems = this.courses.setItems
    }

    @observable items: object[] = []
    @observable editValue: string = ''
    @observable amount: number = 20

    private cached: object[] = []
    private matched: object[] = []
    addValue = ''
    private editKey = 'name'
    private storageKey = 'students'

    private isSorted = {
        name: false,
        email: false
    }

    @computed get itemExist(): boolean {
        return this.cached.some(el => {
            return el.name.toLowerCase() === this.addValue.toLowerCase()
        })
    }

    @action loadItems(): void {
        try {
            const serializedState = this.storage.getItem(this.storageKey)
            if (serializedState === null) {
                throw new Error('local storage disabled')
            }
            this.items = JSON.parse(serializedState)
            this.cached = [...this.items] // for search filter
        } catch (err) {
            this.requestItems()
        }
    }

    @action requestItems() {
        return new Promise((resolve, reject) => {
            this.service.getComments().then(data => {
                this.cached = data
                this.setFilter(this.amount)
                resolve(true)
                reject(false)
            })
            .catch(() => this.requestItems())
        })
    }

    @action add(): void {
        if (!this.itemExist) {
            const email = this.cached[Math.round(Math.random() * this.cached.length)].email

            this.cached.unshift({
                id: Math.round(Math.random() * 10000),
                name: this.addValue,
                email
            })
            this.items = [...this.cached]
            this.addValue = ''
            this.setItems()
        }
    }

    @action setFilter(value: string): void {
        if (value === 'All') {
            this.items = [...this.cached]
        } else {
            this.amount = Number(value)
            this.matched = this.cached.slice(0, this.amount)
            this.items = [...this.matched]
        }
    }
}
