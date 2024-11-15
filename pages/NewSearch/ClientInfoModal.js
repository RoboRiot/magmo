import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ClientInfoModal = ({
  show,
  handleClose,
  selectedClient,
  machineOptions,
  setSelectedMachine,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select a Machine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {machineOptions.map((machine) => (
              <tr key={machine.id}>
                <td>{machine.name}</td>
                <td>{machine.local}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setSelectedMachine(machine)}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientInfoModal;
