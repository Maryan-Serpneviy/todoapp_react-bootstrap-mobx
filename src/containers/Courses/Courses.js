import React, { useState, useRef } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import Header from '~cm/Header'
import CoursesTable from '~cm/CoursesTable'
import ModalEdit from '~cm/ModalEdit'
import ModalRemove from '~cm/ModalRemove'
import useStore from '~h/useStore'

export default useStore(function Courses(props) {
    const store = props.store.courses
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [currId, setCurrId] = useState(null)
    const addInput = useRef(null)

    const handleInput = event => {
        if (event.key === 'Enter') {
            handleAdd()
        }
        store.handleNew(event.target.value)
    }

    const handleAdd = () => {
        addInput.current.value = ''
        store.add()
    }

    const handleClose = () => {
        setShowEdit(false)
        setShowDelete(false)
    }

    const handleEdit = event => {
        const id = store.getId(event.target.id)
        store.setEditValue(id)
        setCurrId(id)
        setShowEdit(true)
    }

    const handleChange = event => {
        if (event.key === 'Escape') {
            setShowEdit(false)
        }
        if (event.key === 'Enter') {
            editItem()
        }
        store.change(event.target.value)
    }

    const editItem = () => {
        store.edit(currId)
        setShowEdit(false)
    }

    const handleDelete = event => {
        const id = store.getId(event.target.id)
        setCurrId(id)
        setShowDelete(true)
    }

    const deleteItem = () => {
        addInput.current.value = ''
        store.delete(currId)
        setShowDelete(false)
    }

    const handleSort = event => {
        store.sort(event.target.innerText)
    }

    return (
        <>
            <Header />
            <h1>Courses</h1>
            <section className="wrapper">
                <InputGroup className="p-3 mb-2">
                    <FormControl
                        ref={addInput}
                        placeholder="Recipient's course title"
                        onKeyUp={handleInput}
                    />
                    <Button onClick={handleAdd} variant="outline-secondary">Add</Button>
                </InputGroup>

                {showEdit && <ModalEdit
                    show={showEdit}
                    value={store.editValue}
                    handleClose={handleClose}
                    handleEdit={editItem}
                    handleChange={handleChange}
                />}

                {showDelete && <ModalRemove
                    show={showDelete}
                    handleClose={handleClose}
                    handleDelete={deleteItem}
                />}

                <CoursesTable
                    items={store.items}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleSort={handleSort}
                />
            </section>
        </>
    )
})
