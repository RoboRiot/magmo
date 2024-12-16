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

const Client = () => {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState(null);
  const [machineOptions, setMachineOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { clientId } = router.query;
      if (!clientId) {
        const pathSegments = router.asPath.split("/");
        const clientIdFromPath = pathSegments[pathSegments.length - 1];
        console.log(`Client ID extracted from URL path: ${clientIdFromPath}`);
        fetchClientData(clientIdFromPath);
      } else {
        console.log(`Client ID from router query: ${clientId}`);
        fetchClientData(clientId);
      }
    }
  }, [router.isReady]);

  const fetchClientData = async (clientId) => {
    try {
      console.log(`Attempting to fetch client data for ID: ${clientId}`);
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();
      if (clientDoc.exists) {
        const clientData = clientDoc.data();
        setSelectedClient(clientData);
        console.log("Client data:", clientData);

        const machinePromises = clientData.machines.map((machineRef) =>
          machineRef.get()
        );
        const machineDocs = await Promise.all(machinePromises);
        const machines = machineDocs.map((machineDoc) => ({
          id: machineDoc.id,
          ...machineDoc.data(),
        }));
        setMachineOptions(machines);
        console.log("Machine data:", machines);
      } else {
        console.error("Client not found");
        setError("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Error fetching client data");
    }
  };

  const handleSelectMachine = (id, name) => {
    console.log(`Selected machine ID: ${id}, Name: ${name}`);
    router.push("../machine/" + id);
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
                      <Button
                        variant="primary"
                        style={{ marginTop: '20px' }}
                        onClick={() => router.back()}
                      >
                        back
                      </Button>
                    </tbody>
                  </Table>
                </>
              ) : (
                !error && <p>Loading client data...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Client;
