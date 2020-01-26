import React from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import withStore from '~hoc/withStore'
import wrappedCourses from '~cn/Courses'
import Header from '~cm/Header'
import CoursesTable from '~cm/CoursesTable' // studentstable
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'

const Courses = wrappedCourses.wrappedComponent
// add footer
// withStore
export default @useStore class extends Courses {
    constructor(props) {
        super(props)
        this.handleInput = this.handleInput.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editItem = this.editItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    store = this.props.store.students
    state = {
        showEdit: false,
        showDelete: false,
        currId: null
    }
    addInput = React.createRef()

    render() {
        console.log(this.props)
        return (
            <>
                <Header />
                <h1>Students</h1>
                <section className="wrapper">
                    <InputGroup className="p-3 mb-2">
                        <FormControl
                            ref={this.addInput}
                            placeholder="Recipient's username"
                            onKeyUp={this.handleInput}
                        />
                        <Button onClick={this.handleAdd} variant="outline-secondary">Add</Button>
                    </InputGroup>
                </section>
            </>
        )
    }
}
