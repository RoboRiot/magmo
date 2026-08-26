import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const formatDateInput = (value) => {
  if (!value) return "";

  let date;
  if (typeof value?.toDate === "function") {
    date = value.toDate();
  } else if (value?.seconds) {
    date = new Date(value.seconds * 1000);
  } else {
    date = new Date(value);
  }

  return Number.isNaN(date?.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const buildForm = (machine) => {
  const safeMachine = machine || {};
  return {
    name: safeMachine.name || "",
    local: safeMachine.local || "",
    OEM: safeMachine.OEM || safeMachine.oem || "",
    Modality: safeMachine.Modality || safeMachine.modality || "",
    Model: safeMachine.Model || safeMachine.model || "",
    lastPM: formatDateInput(safeMachine.lastPM),
    nextPM: formatDateInput(safeMachine.nextPM),
  };
};

const MachineEditModal = ({
  show,
  machine,
  saving = false,
  error = "",
  handleClose,
  onSaveMachine,
}) => {
  const [form, setForm] = useState(buildForm(machine));
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!show) return;
    setForm(buildForm(machine));
    setValidationError("");
  }, [show, machine]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setValidationError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!String(form.name || "").trim()) {
      setValidationError("Machine name is required.");
      return;
    }
    onSaveMachine(form);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!saving}>
          <Modal.Title>Edit Machine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(validationError || error) && (
            <Alert variant="danger">{validationError || error}</Alert>
          )}
          <Form.Group controlId="editMachineName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              disabled={saving}
              autoFocus
            />
          </Form.Group>
          <Form.Group controlId="editMachineLocation" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={form.local}
              onChange={handleChange("local")}
              disabled={saving}
            />
          </Form.Group>
          <Form.Group controlId="editMachineOEM" className="mt-3">
            <Form.Label>OEM</Form.Label>
            <Form.Control
              type="text"
              value={form.OEM}
              onChange={handleChange("OEM")}
              disabled={saving}
            />
          </Form.Group>
          <Form.Group controlId="editMachineModality" className="mt-3">
            <Form.Label>Modality</Form.Label>
            <Form.Control
              type="text"
              value={form.Modality}
              onChange={handleChange("Modality")}
              disabled={saving}
            />
          </Form.Group>
          <Form.Group controlId="editMachineModel" className="mt-3">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              value={form.Model}
              onChange={handleChange("Model")}
              disabled={saving}
            />
          </Form.Group>
          <div className="row mt-3">
            <Form.Group controlId="editMachineLastPM" className="col-sm-6">
              <Form.Label>Last PM</Form.Label>
              <Form.Control
                type="date"
                value={form.lastPM}
                onChange={handleChange("lastPM")}
                disabled={saving}
              />
            </Form.Group>
            <Form.Group controlId="editMachineNextPM" className="col-sm-6 mt-3 mt-sm-0">
              <Form.Label>Next PM</Form.Label>
              <Form.Control
                type="date"
                value={form.nextPM}
                onChange={handleChange("nextPM")}
                disabled={saving}
              />
            </Form.Group>
          </div>
          {machine?.id && (
            <Form.Text className="text-muted d-block mt-3">
              Machine ID: {machine.id}
            </Form.Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MachineEditModal;
