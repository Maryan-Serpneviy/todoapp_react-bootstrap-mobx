import CoursesStore from './courses'
import StudentsStore from './students'

import * as service from '~/api'

class RootStore {
    constructor() {
        this.service = {
            service
        }

        this.courses = new CoursesStore(this)
        this.students = new StudentsStore(this)
        // rootStore.service.getComments / users
    }

}

export default new RootStore()
