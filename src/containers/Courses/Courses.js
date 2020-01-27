import React, { Component } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import withStore from '~hoc/withStore'
import Header from '~cm/Header'
import CoursesTable from '~cm/CoursesTable'
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'

export default @withStore class extends Component {
    store = this.props.store.courses
    state = {
        showEdit: false,
        showDelete: false,
        currId: null
    }
    addInput = React.createRef()

    handleInput = event => {
        if (event.key === 'Enter') {
            this.handleAdd()
        }
        this.store.handleNew(event.target.value)
    }

    handleAdd = () => {
        this.addInput.current.value = ''
        this.store.add()
    }

    handleClose = () => {
        this.setState({
            showEdit: false,
            showDelete: false
        })
    }

    handleEdit = event => {
        const id = this.store.getId(event.target.id)
        this.store.setEditValue(id)
        this.setState({
            showEdit: true,
            currId: id
        })
    }

    handleChange = event => {
        if (event.key === 'Escape') {
            this.setState({ showEdit: false })
        }
        if (event.key === 'Enter') {
            this.editItem()
        }
        this.store.change(event.target.value)
    }

    editItem = () => {
        this.store.edit(this.state.currId)
        this.setState({ showEdit: false })
    }

    handleDelete = event => {
        const id = this.store.getId(event.target.id)
        this.setState({
            showDelete: true,
            currId: id
        })
    }

    deleteItem = () => {
        this.addInput.current.value = ''
        this.store.delete(this.state.currId)
        this.setState({ showDelete: false })
    }

    handleSort = event => {
        this.store.sort(event.target.innerText)
    }

    componentWillMount() {
        this.store.loadItems()
    }

    render() {
        const { showEdit, showDelete } = this.state

        return (
            <>
                <Header />
                <h1>Courses</h1>
                <section className="wrapper">
                    <InputGroup className="p-3 mb-2">
                        <FormControl
                            ref={this.addInput}
                            placeholder="Recipient's course title"
                            onKeyUp={this.handleInput}
                        />
                        <Button onClick={this.handleAdd} variant="outline-secondary">Add</Button>
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
    
                    <CoursesTable
                        items={this.store.items}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleSort={this.handleSort}
                    />
                </section>
            </>
        )
    }
}
