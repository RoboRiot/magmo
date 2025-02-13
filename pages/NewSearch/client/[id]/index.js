import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Table,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import firebase from "../../../../context/Firebase";
import ClientInfoModal from "../../ClientInfoModal";
import MachineCreationModal from "../../MachineCreationModal";

const Client = () => {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState(null);
  const [machineOptions, setMachineOptions] = useState([]);
  const [error, setError] = useState(null);

  // State for machine addition modals
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [showCreateMachineModal, setShowCreateMachineModal] = useState(false);
  const [availableMachines, setAvailableMachines] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const { clientId } = router.query;
      // Extract clientId from query or URL path
      const id = clientId || router.asPath.split("/").pop();
      fetchClientData(id);
    }
  }, [router.isReady]);

  const fetchClientData = async (clientId) => {
    try {
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();
      if (clientDoc.exists) {
        const clientData = clientDoc.data();
        setSelectedClient(clientData);

        // Fetch machine documents referenced in the client's machines array
        const machinePromises = clientData.machines.map((machineRef) =>
          machineRef.get()
        );
        const machineDocs = await Promise.all(machinePromises);
        const machines = machineDocs.map((machineDoc) => ({
          id: machineDoc.id,
          ...machineDoc.data(),
        }));
        setMachineOptions(machines);
      } else {
        setError("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Error fetching client data");
    }
  };

  // Fetch available machines (those not yet assigned to a client)
  const fetchAvailableMachines = async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("Machine")
        .where("client", "==", null)
        .get();
      const machines = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableMachines(machines);
    } catch (error) {
      console.error("Error fetching available machines:", error);
      setError("Failed to fetch available machines.");
    }
  };

  const handleSelectMachine = (id, name) => {
    // Navigate to the machine details page if needed
    router.push("../machine/" + id);
  };

  // When adding an existing machine
  const handleAddMachine = async (machine) => {
    try {
      const db = firebase.firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop();

      // Update client's "machines" array with the machine reference
      await db.collection("Client").doc(clientId).update({
        machines: firebase.firestore.FieldValue.arrayUnion(
          db.collection("Machine").doc(machine.id)
        ),
      });

      // Update local state to include the newly added machine
      setMachineOptions((prev) => [...prev, machine]);
      setShowAddMachineModal(false);
    } catch (error) {
      console.error("Error adding machine to client:", error);
      setError("Failed to add machine to client.");
    }
  };

  // When creating a new machine for the client
  const handleCreateMachine = async (newMachine) => {
    try {
      const db = firebase.firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop();
      const machineId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;
      const machineWithId = {
        ...newMachine,
        id: machineId,
        client: db.collection("Client").doc(clientId),
      };
      // Create the machine document
      await db.collection("Machine").doc(machineId).set(machineWithId);
      // Add the machine reference to the client
      await db.collection("Client").doc(clientId).update({
        machines: firebase.firestore.FieldValue.arrayUnion(
          db.collection("Machine").doc(machineId)
        ),
      });
      // Update local state
      setMachineOptions((prev) => [...prev, { id: machineId, ...newMachine }]);
      setShowCreateMachineModal(false);
    } catch (error) {
      console.error("Error creating and adding machine:", error);
      setError("Failed to create and add machine.");
    }
  };

  // Open the modal to add an existing machine; fetch available machines first
  const openAddMachineModal = async () => {
    await fetchAvailableMachines();
    setShowAddMachineModal(true);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Header>
              <h4>Client Machines</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {selectedClient ? (
                <>
                  <h5>Client: {selectedClient.name}</h5>
                  <p>Location: {selectedClient.local}</p>
                  <div className="mb-3">
                    <Button variant="primary" onClick={openAddMachineModal}>
                      Add Existing Machine
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={() => setShowCreateMachineModal(true)}
                    >
                      Create New Machine
                    </Button>
                  </div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>OEM</th>
                        <th>Modality</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {machineOptions.map((machine) => (
                        <tr key={machine.id}>
                          <td>{machine.name}</td>
                          <td>{machine.local}</td>
                          <td>{machine.OEM}</td>
                          <td>{machine.Modality}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleSelectMachine(machine.id, machine.name)
                              }
                            >
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Button
                    variant="primary"
                    style={{ marginTop: "20px" }}
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                </>
              ) : (
                !error && <p>Loading client data...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal to add an existing machine to the client */}
      <ClientInfoModal
        show={showAddMachineModal}
        handleClose={() => setShowAddMachineModal(false)}
        machineOptions={availableMachines}
        setSelectedMachine={handleAddMachine}
      />

      {/* Modal to create a new machine and attach it to the client */}
      <MachineCreationModal
        show={showCreateMachineModal}
        handleClose={() => setShowCreateMachineModal(false)}
        onCreateMachine={handleCreateMachine}
      />
    </Container>
  );
};

export default Client;
