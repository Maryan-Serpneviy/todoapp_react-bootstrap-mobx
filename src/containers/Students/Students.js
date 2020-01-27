import React from 'react'
import { Button, InputGroup, FormControl, Pagination } from 'react-bootstrap'
import withStore from '~hoc/withStore'
import wrappedCourses from '~cn/Courses'
import Header from '~cm/Header'
import StudentsTable from '~cm/StudentsTable'
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'

const Courses = wrappedCourses.wrappedComponent
// add footer

export default @withStore class extends Courses {
    constructor(props) {
        super(props)
        this.store = this.props.store.students
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

    state = {
        showEdit: false,
        showDelete: false,
        currId: null,
        amount: 5
    }
    addInput = React.createRef()

    componentWillMount() {
        !localStorage.getItem('students') ?
            this.store.load() : null // load localStorage
    }

    render() {
        const { showEdit, showDelete, amount } = this.state

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
                        {/* AmountFilter amount={amount} change={changeamount} */}
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
                        amount={amount}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleSort={this.handleSort}
                    />}

                    {this.store.items.length && (
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>)}
                </section>
            </>
        )
    }
}
