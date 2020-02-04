import React from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import withStore from '~hoc/withStore'
import wrappedCourses from '~cn/Courses'
import Header from '~cm/Header'
import TableComponent from '~cm/TableComponent'
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'
import AmountFilter from '~cm/AmountFilter'

const Courses = wrappedCourses.wrappedComponent

@withStore
export default class extends Courses {
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
        this.handleDnd = this.handleDnd.bind(this)
    }

    componentWillMount() {
        this.store.loadItems()
    }

    componentDidMount() {
        this.store.setFilter(this.store.amount)
    }

    state = {
        showEdit: false,
        showDelete: false
    }
    addInput = React.createRef()

    changeAmount = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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

                    <TableComponent
                        items={this.store.items}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleSort={this.handleSort}
                        handleDnd={this.handleDnd}
                        tableHeadings={['Name', 'Email']}
                        baseId="student"
                    />
                </section>
            </>
        )
    }
}
