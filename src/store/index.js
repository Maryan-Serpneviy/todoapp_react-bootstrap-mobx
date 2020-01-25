import CoursesStore from './courses'
import StudentsStore from './students'

class RootStore {
    constructor() {
        this.courses = new CoursesStore(this)
        this.students = new StudentsStore(this)
    }

}

export default new RootStore()
