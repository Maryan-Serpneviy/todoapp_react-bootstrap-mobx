import React, { Component } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import withStore from '~hoc/withStore'
import Header from '~cm/Header'
import TableComponent from '~cm/TableComponent'
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'

export default @withStore class extends Component {
    store = this.props.store.courses
    state = {
        showEdit: false,
        showDelete: false
    }
    addInput = React.createRef()

    componentWillMount() {
        this.store.loadItems()
    }

    handleInput = event => {
        this.store.handleNew(event.target.value)
    }

    handleEnterKey = event => {
        if (event.key === 'Enter' && this.store.addValue.trim()) {
            this.store.add()
        }
    }

    handleClose = () => {
        this.setState({
            showEdit: false,
            showDelete: false
        })
    }

    handleEdit = event => {
        this.store.setEditValue(event.target.id)
        this.setState({ showEdit: true })
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
        this.store.edit(this.store.currId)
        this.setState({ showEdit: false })
    }

    handleDelete = event => {
        this.store.currId = this.store.getId(event.target.id)
        this.setState({ showDelete: true })
    }

    deleteItem = () => {
        this.store.delete(this.store.currId)
        this.setState({ showDelete: false })
        this.addInput.current.focus()
    }

    handleSort = event => {
        this.store.sort(event.target.innerText)
    }

    handleDnd = newItems => {
        this.store.dragAndDrop(newItems)
    }

    render() {
        const { showEdit, showDelete } = this.state
        const { items, addValue, editValue } = this.store

        return (
            <>
                <Header />
                <h1>Courses</h1>
                <section className="wrapper">
                    <InputGroup className="p-3 mb-2">
                        <FormControl
                            ref={this.addInput}
                            value={addValue}
                            onChange={this.handleInput}
                            onKeyDown={this.handleEnterKey}
                            placeholder="Recipient's course title"
                        />
                        <Button onClick={() => this.store.add()} variant="outline-secondary">Add</Button>
                    </InputGroup>
    
                    {showEdit && <ModalEdit
                        show={showEdit}
                        value={editValue}
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
                        items={items}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleSort={this.handleSort}
                        handleDnd={this.handleDnd}
                        tableHeadings={['Course', 'Students']}
                        baseId="course"
                    />
                </section>
            </>
        )
    }
}
