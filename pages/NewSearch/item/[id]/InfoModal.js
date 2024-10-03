// InfoModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ show, handleClose, itemName, dimensions, price, freqI, freqM, usage }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {itemName} </p>
        <p><strong>Dimensions:</strong> {dimensions}</p>
        <p><strong>Price:</strong> {price}</p>
        <p><strong>Frequency of item:</strong> {freqI} </p>
        <p><strong>Frequency of Machine:</strong> {freqM} </p>
        <p><strong>Usage past 1 year:</strong> {usage} </p>
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
