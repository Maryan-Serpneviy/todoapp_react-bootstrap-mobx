import React from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import withStore from '~hoc/withStore'
import wrappedCourses from '~cn/Courses'
import Header from '~cm/Header'
import Footer from '~cm/Footer'
import PaginationComponent from '~cm/PaginationComponent'
import StudentsTable from '~cm/StudentsTable'
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'
import AmountFilter from '~cm/AmountFilter'

const Courses = wrappedCourses.wrappedComponent

export default @withStore class extends Courses {
    constructor(props) {
        super(props)
        this.store = this.props.store.students
        this.handleInput = this.handleInput.bind(this)
        this.handleEnterKey = this.handleEnterKey.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editItem = this.editItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    state = {
        showEdit: false,
        showDelete: false
    }
    addInput = React.createRef()

    componentWillMount() {
        this.store.loadItems()
        localStorage.clear()
    }

    changeAmount = (event) => {
        this.store.setFilter(event.target.value)
    }

    render() {
        const { showEdit, showDelete } = this.state

        return (
            <>
                <Header />
                <h1>Students</h1>
                <AmountFilter
                    amount={this.store.amount}
                    changeAmount={this.changeAmount}
                />
                <section className="wrapper">
                    <InputGroup className="p-3 mb-2">
                        <FormControl
                            ref={this.addInput}
                            value={this.store.addValue}
                            onChange={this.handleInput}
                            onKeyDown={this.handleEnterKey}
                            placeholder="Recipient's username"
                        />
                        <Button onClick={() => this.store.add()} variant="outline-secondary">Add</Button>
                    </InputGroup>

                    {showEdit && <ModalEdit
                        show={this.state.showEdit}
                        value={this.store.editValue}
                        handleClose={this.handleClose}
                        handleEdit={this.editItem}
                        handleChange={this.handleChange}
                    />}
    
                    {showDelete && <ModalRemove
                        show={showDelete}
                        handleClose={this.handleClose}
                        handleDelete={this.deleteItem}
                    />}

                    {this.store.items.length && <StudentsTable
                        items={this.store.items}
                        amount={this.store.amount}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleSort={this.handleSort}
                    />}
                </section>
            </>
        )
    }
}
