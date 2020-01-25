import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function ModalRemove({ show, handleClose, handleDelete }) {
    return (
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
}

ModalRemove.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}
