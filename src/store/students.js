import { observable, computed, action } from 'mobx'

export default class StudentsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
}
