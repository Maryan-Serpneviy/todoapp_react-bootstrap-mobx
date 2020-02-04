import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface ModalProps {
    show: boolean
    handleClose: () => void
    handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ModalRemove: React.FC<ModalProps> = ({ show, handleClose, handleDelete }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Delete item?</Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleDelete}>
                Delete item
            </Button>
        </Modal.Footer>
    </Modal>
)

export default ModalRemove
