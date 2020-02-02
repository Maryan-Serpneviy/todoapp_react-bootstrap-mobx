import React, { useCallback } from 'react'
import { Table } from 'react-bootstrap'
import TableRow from './TableRow'
import PropTypes from 'prop-types'

function TableComponent(props) {
    const {
        items,
        handleEdit,
        handleDelete,
        handleSort,
        handleDnd,
        baseId
    } = props
    const [first, second] = props.tableHeadings

    const moveItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = items[dragIndex]
            const newItems = [...items]
            newItems.splice(dragIndex, 1)
            newItems.splice(hoverIndex, 0, dragItem)
            handleDnd(newItems)
        },
        [items]
    )

    const renderRow = (item, index) => (
        <TableRow
            key={item.id}
            index={index}
            item={item}
            first={first.toLowerCase()}
            second={second.toLowerCase()}
            baseId={baseId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            moveItem={moveItem}
        />
    )

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className="text-center">
                    <th onClick={handleSort} className="interactive" title="Sort">{first}</th>
                    <th onClick={handleSort} className="interactive" title="Sort">{second}</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            
            <tbody>
                {items.map((item, i) => renderRow(item, i))}
            </tbody>
        </Table>
    )
}

TableComponent.propTypes = {
    items: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSort: PropTypes.func,
    tableHeadings: PropTypes.array.isRequired,
    baseId: PropTypes.string
}

export default TableComponent
