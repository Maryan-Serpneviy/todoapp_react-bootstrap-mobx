import React from 'react'
import { Table, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function TableComponent(props) {
   const {
      items,
      handleEdit,
      handleDelete,
      handleSort,
      baseId
   } = props

   const [first, second] = props.tableHeaders

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
               {items.map(item => (
                   <tr className="text-center" key={item.id}>
                       <td>{item[first.toLowerCase()]}</td>
                       <td>{item[second.toLowerCase()]}</td>
                       <td>
                           <Button id={`${baseId}_edit-${item.id}`} onClick={handleEdit}>
                              Edit
                           </Button>
                       </td>
                       <td>
                           <Button id={`${baseId}_del-${item.id}`} onClick={handleDelete} variant="danger">
                              Delete
                           </Button>
                       </td>
                   </tr>
               ))}
           </tbody>
       </Table>
   )
}

TableComponent.propTypes = {
   items: PropTypes.array.isRequired,
   handleEdit: PropTypes.func.isRequired,
   handleDelete: PropTypes.func.isRequired,
   handleSort: PropTypes.func,
   tableHeaders: PropTypes.array.isRequired,
   baseId: PropTypes.string
}
