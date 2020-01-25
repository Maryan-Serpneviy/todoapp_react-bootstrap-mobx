import React from 'react'
import { Table, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function CoursesTable(props) {
    const { items, handleEdit, handleDelete, handleSort } = props

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className="text-center">
                    <th onClick={handleSort} className="interactive" title="Click to sort">Course</th>
                    <th onClick={handleSort} className="interactive" title="Click to sort">Students</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr className="text-center" key={item.id}>
                        <td>{item.course}</td>
                        <td>{item.students}</td>
                        <td>
                            <Button id={`course_edit-${item.id}`} onClick={handleEdit}>Edit</Button>
                        </td>
                        <td>
                            <Button id={`course_del-${item.id}`} onClick={handleDelete} variant="danger">Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

CoursesTable.propTypes = {
    items: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSort: PropTypes.func
}
