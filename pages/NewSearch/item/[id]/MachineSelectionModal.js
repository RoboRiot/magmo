import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, FormControl, Spinner } from "react-bootstrap";
import { fetchModels } from "../../../../utils/fetchAssociations"; // Assuming you already have this

export default function MachineSelectionModal({ show, handleClose, setMachine }) {
  const [Modality, setModality] = useState(null);
  const [OEM, setOEM] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [loadingModels, setLoadingModels] = useState(false);

  // Fetch models when Modality and OEM are selected
  useEffect(() => {
    if (Modality && OEM) {
      setLoadingModels(true);
      fetchModels(OEM, Modality)
        .then((fetchedModels) => {
          setModels(fetchedModels);
          setLoadingModels(false);
        })
        .catch((error) => {
          console.error("Error fetching models: ", error);
          setLoadingModels(false);
        });
    }
  }, [Modality, OEM]);

  const handleModalitySelect = (selectedModality) => {
    setModality(selectedModality);
    setOEM(null); // Reset OEM and Model when Modality changes
    setSelectedModel(null);
  };

  const handleOEMSelect = (selectedOEM) => {
    setOEM(selectedOEM);
    setSelectedModel(null); // Reset Model when OEM changes
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleSaveSelection = () => {
    if (selectedModel) {
      // Pass selected machine data back to the parent
      setMachine({ Modality, OEM, Model: selectedModel });
      handleClose(); // Close the modal
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Machine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Dropdown onSelect={handleModalitySelect}>
            <Dropdown.Toggle variant="outline-secondary" className="w-100">
              {Modality || "Select Modality"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="CT">CT</Dropdown.Item>
              <Dropdown.Item eventKey="MRI">MRI</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {Modality && (
          <div className="mb-3">
            <Dropdown onSelect={handleOEMSelect}>
              <Dropdown.Toggle variant="outline-secondary" className="w-100">
                {OEM || "Select OEM"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="GE">GE</Dropdown.Item>
                <Dropdown.Item eventKey="Philips">Philips</Dropdown.Item>
                <Dropdown.Item eventKey="Siemens">Siemens</Dropdown.Item>
                <Dropdown.Item eventKey="Toshiba">Toshiba</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}

        {Modality && OEM && (
          <div className="mb-3">
            <FormControl
              placeholder="Search models"
              aria-label="Search models"
              aria-describedby="basic-addon2"
              onChange={(e) => setSelectedModel(e.target.value)}
            />
            {loadingModels ? (
              <Spinner animation="border" />
            ) : (
              models.length > 0 && (
                <Dropdown onSelect={handleModelSelect}>
                  <Dropdown.Toggle variant="outline-secondary" className="w-100">
                    {selectedModel || "Select Model"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {models.map((model) => (
                      <Dropdown.Item key={model} eventKey={model}>
                        {model}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveSelection}
          disabled={!selectedModel}
        >
          Save Selection
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
