import { configure } from 'mobx'
import CoursesStore from '~s/courses'
import StudentsStore from '~s/students'

import * as sort from '~/helpers/sort'
import * as service from '~/api'
import { getCourses } from '~/api/courses'

configure({ enforceActions: 'observed' })
class RootStore {
    service: object
    storage: object
    courses: object
    students: object

    constructor() {
        this.service = {
            ...service,
            getCourses
        }
        this.storage = localStorage
        this.sortDirect = sort.sortDirect
        this.sortReverse = sort.sortReverse

        this.courses = new CoursesStore(this)
        this.students = new StudentsStore(this)
    }

}

export default new RootStore()
