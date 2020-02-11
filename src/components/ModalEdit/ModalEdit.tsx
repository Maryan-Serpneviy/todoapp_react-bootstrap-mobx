import React, { useRef, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'

const ModalEdit: React.FC<Props> = (props: InferProps<typeof ModalEdit.propTypes>) => {
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
    value: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

interface Props {
    show: boolean
    value?: string
    handleClose: () => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default ModalEdit
