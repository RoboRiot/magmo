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
        
        // Fetch associated parts
        if (machineData.associatedParts) {
          fetchAssociatedParts(machineData.associatedParts);
        }
      } else {
        console.error("Machine not found");
        setError("Machine not found");
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
      setError("Error fetching machine data");
    }
  };
  
  const fetchAssociatedParts = async (associatedPartsRefs) => {
    try {
      const db = firebase.firestore();
      const partsDocs = await Promise.all(associatedPartsRefs.map(ref => ref.get()));

      const partsData = await Promise.all(partsDocs.map(async (doc) => {
        if (!doc.exists) {
          // skip or return an empty object
          return null;
        }
        const data = doc.data() || {};
        let clientName = "";
        if (data.ClientFrom?.get) {
          const clientDoc = await data.ClientFrom.get();
          clientName = clientDoc.exists ? clientDoc.data().name : "";
        }        
        return { id: doc.id, ...data, clientName };
      }));

      setAssociatedParts(partsData.filter(p => p));
      console.log("Associated parts data:", partsData);
    } catch (error) {
      console.error("Error fetching associated parts:", error);
      setError("Error fetching associated parts");
    }
  };

  const handlePrintMulti = async () => {
    // Create your payload with the mapped items.
    // Replace 'associatedParts' with your actual variable containing the list.
    const payload = {
      items: associatedParts.map(part => ({
        name: part.name,
        arrival_date: part.arrival_date, // Ensure your part has a 'date' field.
        poNumber: part.poNumber || "",
        OEM: part.TheMachine ? part.TheMachine.oem || "" : "",
        modality: part.TheMachine ? part.TheMachine.modality || "" : "",
        model: part.TheMachine ? part.TheMachine.model || "" : "",
        local_sn: part.id, // Using document id as the local serial number.
        client: part.clientName || "",
        description: part.description ||
          (part.descriptions && part.descriptions.length > 0
            ? part.descriptions[0].description
            : "")
      })),
      test_print: true, // Hard-coded here if you want to test printing one item
      index: 1          // Hard-coded index (1-based)
    };

    try {
      const response = await fetch("https://9d70-174-76-22-138.ngrok-free.app/print_multi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log("Print multi result:", result.status);
    } catch (error) {
      console.error("Error printing multiple labels:", error);
    }
  };
  
  

  const handleSelectPart = (id, name) => {
    console.log(`Selected part ID: ${id}, Name: ${name}`);
    router.push("../item/" + id);
  };

  const formatDate = (input) => {
    let date;
  
    if (input && input.seconds) {
      // Handle timestamp object with 'seconds' property
      date = new Date(input.seconds * 1000);
    } else if (typeof input === 'string') {
      // Handle date string
      date = new Date(input);
    } else {
      return "N/A";
    }
  
    if (isNaN(date.getTime())) {
      // Invalid date string
      return "Invalid Date";
    }
  
    return date.toLocaleDateString();
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
                  <p>Model: {selectedMachine.Modality}</p>
                  <p>Model: {selectedMachine.OEM}</p>
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
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", paddingTop: "20px" }}>
                          <Button variant="secondary" onClick={handlePrintMulti}>
                            Print All Items
                          </Button>
                        </td>
                      </tr>
                      {/* <Col md={4}> */}
                      <Button
                        variant="primary"
                        style={{ marginTop: '20px' }}
                        onClick={() => router.back()}
                      >
                        back
                      </Button>
                    {/* </Col> */}
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
