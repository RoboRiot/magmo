import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Table,
} from "react-bootstrap";
import { useRouter } from "next/router";
import firebase from "../../../../context/Firebase";
import ClientInfoModal from "../../ClientInfoModal";
import MachineCreationModal from "../../MachineCreationModal";

const AddClient = () => {
  const router = useRouter();
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState({
    name: "",
    location: "",
  });
  const [addedMachines, setAddedMachines] = useState([]);
  const [showClientInfoModal, setShowClientInfoModal] = useState(false);
  const [showMachineCreationModal, setShowMachineCreationModal] = useState(false);
  const [machineOptions, setMachineOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleClientId = () => {
      const { id } = router.query;
      if (id) {
        setClientId(id);
        fetchClientData(id);
      }
    };

    if (router.isReady) {
      handleClientId();
    }
  }, [router.isReady, router.query]);

  const fetchClientData = async (id) => {
    const db = firebase.firestore();
    try {
      const doc = await db.collection("Client").doc(id).get();
      if (doc.exists) {
        const data = doc.data();
        setClient({
          name: data.name || "",
          location: data.local || "",
        });
        const machineRefs = data.machines || [];
        const machines = await Promise.all(
          machineRefs.map((ref) =>
            ref.get().then((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
        setAddedMachines(machines);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Failed to fetch client data.");
    }
  };

  const fetchAvailableMachines = async () => {
    const db = firebase.firestore();
    try {
      const snapshot = await db
        .collection("Machine")
        .where("client", "==", null)
        .get();
      const machines = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMachineOptions(machines);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError("Failed to fetch machines.");
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMachine = (machine) => {
    setAddedMachines((prev) => [...prev, machine]);
    setShowClientInfoModal(false);
  };

  const handleCreateMachine = async (newMachine) => {
    const db = firebase.firestore();
    const machineId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;
    try {
      const machineWithId = {
        ...newMachine,
        id: machineId,
        client: db.collection("Client").doc(clientId),
      };
      await db.collection("Machine").doc(machineId).set(machineWithId);

      const clientRef = db.collection("Client").doc(clientId);
      await clientRef.update({
        machines: firebase.firestore.FieldValue.arrayUnion(
          db.collection("Machine").doc(machineId)
        ),
      });

      setShowMachineCreationModal(false);
      setAddedMachines((prev) => [...prev, { id: machineId, ...newMachine }]);
    } catch (error) {
      console.error("Error creating and adding machine:", error);
      setError("Failed to create and add machine.");
    }
  };

  const handleRemoveMachine = (index) => {
    setAddedMachines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const db = firebase.firestore();
    try {
      if (clientId) {
        // Use set with merge to update an existing client (or create it if it doesn't exist)
        await db.collection("Client").doc(clientId).set(
          {
            ...client,
            machines: addedMachines.map((machine) =>
              db.collection("Machine").doc(machine.id)
            ),
          },
          { merge: true }
        );
      } else {
        const newClientId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;
        await db.collection("Client").doc(newClientId).set({
          ...client,
          machines: addedMachines.map((machine) =>
            db.collection("Machine").doc(machine.id)
          ),
        });

        for (const machine of addedMachines) {
          await db.collection("Machine").doc(machine.id).update({
            client: db.collection("Client").doc(newClientId),
          });
        }
      }
      alert("Client and machines saved successfully.");
      router.push("../../clientSearch");
    } catch (error) {
      console.error("Error saving client:", error);
      setError("Failed to save client.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Header>
              <h4>{clientId ? "Edit Client" : "Add New Client"}</h4>
            </Card.Header>
            <Card.Body>
              {error && <p className="text-danger">{error}</p>}
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="clientName">
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter client name"
                        value={client.name}
                        onChange={handleChange("name")}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="clientLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={client.location}
                        onChange={handleChange("location")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => setShowClientInfoModal(true)}
                    >
                      Add Machine
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={() => setShowMachineCreationModal(true)}
                    >
                      Create Machine
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Machine Name</th>
                          <th>Location</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addedMachines.map((machine, index) => (
                          <tr key={index}>
                            <td>{machine.name}</td>
                            <td>{machine.local}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveMachine(index)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={6}>
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      className="w-100"
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      variant="primary"
                      onClick={() => router.back()}
                      className="w-100"
                    >
                      Back
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ClientInfoModal
        show={showClientInfoModal}
        handleClose={() => setShowClientInfoModal(false)}
        machineOptions={machineOptions}
        setSelectedMachine={handleAddMachine}
      />

      <MachineCreationModal
        show={showMachineCreationModal}
        handleClose={() => setShowMachineCreationModal(false)}
        onCreateMachine={handleCreateMachine}
      />
    </Container>
  );
};

export default AddClient;
