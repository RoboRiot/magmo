import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MachineCreationModal = ({ show, handleClose, onCreateMachine }) => {
  const [newMachine, setNewMachine] = useState({
    name: "",
    OEM: "",
    Modality: "",
    Model: "",
    local: "",
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setNewMachine((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    onCreateMachine(newMachine);
    setNewMachine({
      name: "",
      OEM: "",
      Modality: "",
      Model: "",
      local: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Machine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="machineName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter machine name"
              value={newMachine.name}
              onChange={handleChange("name")}
            />
          </Form.Group>
          <Form.Group controlId="OEM" className="mt-3">
            <Form.Label>OEM</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OEM"
              value={newMachine.OEM}
              onChange={handleChange("OEM")}
            />
          </Form.Group>
          <Form.Group controlId="Modality" className="mt-3">
            <Form.Label>Modality</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter modality"
              value={newMachine.Modality}
              onChange={handleChange("Modality")}
            />
          </Form.Group>
          <Form.Group controlId="Model" className="mt-3">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter model"
              value={newMachine.Model}
              onChange={handleChange("Model")}
            />
          </Form.Group>
          <Form.Group controlId="local" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={newMachine.local}
              onChange={handleChange("local")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Add Machine
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MachineCreationModal;