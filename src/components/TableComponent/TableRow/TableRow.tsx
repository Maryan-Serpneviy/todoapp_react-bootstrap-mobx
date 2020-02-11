import React, { useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { Button } from 'react-bootstrap'

const TableRow: React.FC<Props> = (props: InferProps<typeof TableRow.propTypes>) => {
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
   const ref = useRef<HTMLTableRowElement>(null)

   const [, drop] = useDrop({
      accept: 'item',
      hover(item: DragItem, monitor: DropTargetMonitor) {
         if (!ref.current) {
            return
         }
         const dragIndex = item.index
         const hoverIndex = index
         if (dragIndex === hoverIndex) {
            return
         }
         const hoverBoundingRect = ref.current.getBoundingClientRect()
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset = monitor.getClientOffset()
         const hoverClientY = clientOffset.y - hoverBoundingRect.top
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
         }
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
         }
         moveItem(dragIndex, hoverIndex)
         item.index = hoverIndex
      }
   })

   const [{ isDragging }, drag] = useDrag({
      item: { type: 'item', id: item.id, index },
      collect: (monitor: any) => ({
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

TableRow.propTypes = {
   item: PropTypes.object.isRequired,
   index: PropTypes.number.isRequired,
   baseId: PropTypes.string,
   first: PropTypes.string.isRequired,
   second: PropTypes.string.isRequired,
   handleEdit: PropTypes.func.isRequired,
   handleDelete: PropTypes.func.isRequired,
   moveItem: PropTypes.func.isRequired
}

interface Props {
   item: object
   index: number
   baseId?: string
   first: string
   second: string
   handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
   handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
   moveItem: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
   id: any
   text: string
   index: number
}

export default TableRow
