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

const Machine = () => {
  const router = useRouter();
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [associatedParts, setAssociatedParts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { machineId } = router.query;
      if (!machineId) {
        const pathSegments = router.asPath.split("/");
        const machineIdFromPath = pathSegments[pathSegments.length - 1];
        console.log(`Machine ID extracted from URL path: ${machineIdFromPath}`);
        fetchMachineData(machineIdFromPath);
      } else {
        console.log(`Machine ID from router query: ${machineId}`);
        fetchMachineData(machineId);
      }
    }
  }, [router.isReady]);

  const fetchMachineData = async (machineId) => {
    try {
      console.log(`Attempting to fetch machine data for ID: ${machineId}`);
      const db = firebase.firestore();
      const machineDoc = await db.collection("Machine").doc(machineId).get();
      if (machineDoc.exists) {
        const machineData = machineDoc.data();
        setSelectedMachine(machineData);
        console.log("Machine data:", machineData);
        fetchAssociatedParts(machineId);
      } else {
        console.error("Machine not found");
        setError("Machine not found");
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
      setError("Error fetching machine data");
    }
  };

  const fetchAssociatedParts = async (machineId) => {
    try {
      const db = firebase.firestore();
      const partsSnapshot = await db.collection("Test").where("Machine", "==", db.collection("Machine").doc(machineId)).get();
      const partsData = partsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssociatedParts(partsData);
      console.log("Associated parts data:", partsData);
    } catch (error) {
      console.error("Error fetching associated parts:", error);
      setError("Error fetching associated parts");
    }
  };

  const handleSelectPart = (id, name) => {
    console.log(`Selected part ID: ${id}, Name: ${name}`);
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString();
    }
    return "N/A";
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Header>
              <h4>Machine Details</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {selectedMachine ? (
                <>
                  <h5>Machine: {selectedMachine.name}</h5>
                  <p>Model: {selectedMachine.Model}</p>
                  <p>Last PM: {formatDate(selectedMachine.lastPM)}</p>
                  <p>Next PM: {formatDate(selectedMachine.nextPM)}</p>
                  <h5>Associated Parts</h5>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Part Number</th>
                        <th>Serial Number</th>
                        <th>Date</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {associatedParts.map((part) => (
                        <tr key={part.id}>
                          <td>{part.name}</td>
                          <td>{part.pn}</td>
                          <td>{part.sn}</td>
                          <td>{part.date}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleSelectPart(part.id, part.name)
                              }
                            >
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                !error && <p>Loading machine data...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Machine;
