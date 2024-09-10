// InfoModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ show, handleClose, itemName, dimensions, price,  }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> "RTM"</p>
        <p><strong>Dimensions:</strong> "6x3x1"</p>
        <p><strong>Price:</strong> "$300"</p>
        <p><strong>Frequency of item:</strong> "4"</p>
        <p><strong>Frequency of Machine:</strong> "13"</p>
        <p><strong>Usage past 1 year:</strong> "2"</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
