import { observable, computed, action } from 'mobx'
import { sortDirect, sortReverse } from '~/helpers/sort'

export default class StudentsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.service = this.rootStore.service
        // this.method = this.rootStore.method probably
    }

    @observable items = []
    @observable editValue = ''

    cached = []
    matched = []
    addValue = ''

    isSorted = {
        name: false,
        email: false
    }

    @action load() {
        this.service.getUsers().then(data => {
            this.items = data
        })
    }
}
