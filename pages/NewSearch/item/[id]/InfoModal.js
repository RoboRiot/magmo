// InfoModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ show, handleClose, itemName }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {itemName}</p>
        <p><strong>Dimensions:</strong> {itemName}</p>
        <p><strong>Price:</strong> {itemName}</p>
        <p><strong>Frequency:</strong> {itemName}</p>
        <p><strong>Usage past 1 year:</strong> {itemName}</p>
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
