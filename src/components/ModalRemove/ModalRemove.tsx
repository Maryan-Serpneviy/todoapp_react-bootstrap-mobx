import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const ModalRemove: React.FC<Props> = ({ show, handleClose, handleDelete }: InferProps<typeof ModalRemove.propTypes>) => (
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

ModalRemove.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

interface Props {
    show: boolean
    handleClose: () => void
    handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default ModalRemove
