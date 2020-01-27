import CoursesStore from '~s/courses'
import StudentsStore from '~s/students'

import * as service from '~/api'
import { getCourses } from '~/api/courses'
import { sortDirect, sortReverse } from '~/helpers/sort'

class RootStore {
    constructor() {
        this.service = {
            ...service,
            getCourses
        }
        this.storage = localStorage
        this.sortDirect = sortDirect
        this.sortReverse = sortReverse

        this.courses = new CoursesStore(this)
        this.students = new StudentsStore(this)
    }

}

export default new RootStore()
