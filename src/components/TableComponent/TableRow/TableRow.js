import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Button } from 'react-bootstrap'

export default function TableRow(props) {
   const {
      item,
      index,
      baseId,
      first,
      second,
      handleEdit,
      handleDelete,
      moveItem
   } = props
   const ref = useRef(null)

   const [, drop] = useDrop({
      accept: 'item',
      hover(item, monitor) {
         if (!ref.current) {
            return
         }
         const dragIndex = item.index
         const hoverIndex = index
         // Avoid replace items with themselves
         if (dragIndex === hoverIndex) {
            return
         }
         // Determine rectangle on screen
         const hoverBoundingRect = ref.current.getBoundingClientRect()
         // Get vertical middle
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         // Determine mouse position
         const clientOffset = monitor.getClientOffset()
         // Get pixels to the top
         const hoverClientY = clientOffset.y - hoverBoundingRect.top
         // Dragging downwards
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
         }
         // Dragging upwards
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
         }
         // Time to actually perform the action
         moveItem(dragIndex, hoverIndex)
         item.index = hoverIndex
      }
   })

   const [{ isDragging }, drag] = useDrag({
      item: { type: 'item', id: item.id, index },
      collect: monitor => ({
         isDragging: monitor.isDragging()
      })
   })
   const opacity = isDragging ? 0 : 1
   drag(drop(ref))

   return (
      <tr ref={ref} className="text-center" key={item.id} style={{ opacity }}>
         <td>{item[first]}</td>
         <td>{item[second]}</td>
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
   )
}
