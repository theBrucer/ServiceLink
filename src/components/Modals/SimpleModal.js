import React from "react";
import { Button, Modal } from "react-bootstrap";
import history from "../../history";


// This Modal is for displaying information and two actions.
// For creating a Form modal, refer to the FormModal.js

const SimpleModal = (props) => {
    const handleClose = () => {
        history.push(props.onCloseUrl);
    };

    const { title, body, onSubmit, onSubmitLabel, onSubmitVariant, dialogClassName } = props;

    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                // animation={false}
                dialogClassName={dialogClassName}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={onSubmitVariant} onClick={onSubmit}>
                        {onSubmitLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SimpleModal;
