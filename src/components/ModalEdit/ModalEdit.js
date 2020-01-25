import React, { useRef, useEffect } from 'react'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function ModalEdit(props) {
    const { show, value, handleClose, handleChange, handleEdit } = props
    const input = useRef(null)

    useEffect(() => {
        input.current.focus()
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit item</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup className="p-3 mb-1">
                        <FormControl
                            ref={input}
                            value={value}
                            onChange={handleChange}
                            onKeyUp={handleChange}
                            maxLength={20}
                        />
                </InputGroup>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalEdit.propTypes = {
    show: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}
