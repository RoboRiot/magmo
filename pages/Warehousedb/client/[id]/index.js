import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import Link from "next/link";
import firebase from "../../../../context/Firebase"; // Adjust the path as needed
import LoggedIn from "../../../LoggedIn";

const ClientComponent = () => {
    const router = useRouter();
    const { id } = router.query;
    const [client, setClient] = useState({ Company: '', Name: '', Location: '', LastPM: '',NextPM: '', Machines: [] });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            const db = firebase.firestore();
            db.collection('Client').doc(id).get()
                .then(async doc => {
                    if (doc.exists) {
                        const clientData = doc.data();
                        // Fetch machine data for each reference in the Machines array
                        const machines = await Promise.all(clientData.Machines.map(async ref => {
                            const machineDoc = await ref.get();
                            return machineDoc.exists ? machineDoc.data() : null;
                        }));
                        // Set the client data along with the fetched machines
                        setClient({ ...clientData, Machines: machines.filter(m => m) });
                    }
                })
                .catch(error => console.error('Error fetching client data:', error));
        }
    }, [id]);

    // Handle field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };

    // Add new machine
    const addMachine = () => {
        const newId = 'AIS' + Math.floor(100000 + Math.random() * 900000);
        router.push(`../Machines/${newId}`);
    };

    // Delete a machine
    const deleteMachine = (machineIndex) => {
        const newMachines = client.Machines.filter((_, index) => index !== machineIndex);
        setClient({ ...client, Machines: newMachines });
    };

    // Submit changes to the database
    const handleSubmit = () => {
        const db = firebase.firestore();
        db.collection('Client').doc(id).set(client)
            .then(() => console.log('Client updated successfully'))
            .catch(error => console.error('Error updating client:', error));
    };

    //change date format DB to Form
    function convertDateToInputFormat(dateStr) {
        if (!dateStr) return '';
    
        const [month, day, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    //change date format Form to DB
    function convertInputDateBack(dateStr) {
        if (!dateStr) return '';
    
        const [year, month, day] = dateStr.split('-');
        return `${month}/${day}/${year}`;
    }
    

    return (
        <LoggedIn>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Client Details</h2>
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Company</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                            name="Company"
                                            value={client.Company}
                                            onChange={handleChange}
                                            readOnly={!editMode}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Name</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                            name="Name"
                                            value={client.Name}
                                            onChange={handleChange}
                                            readOnly={!editMode}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Location</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                            name="Location"
                                            value={client.Location}
                                            onChange={handleChange}
                                            readOnly={!editMode}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Last PM</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="date"
                                            name="LastPM"
                                            value={new Date(convertDateToInputFormat(client.LastPM))}
                                            onChange={handleChange}
                                            readOnly={!editMode}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Next PM</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="date"
                                            name="NextPM"
                                            value={new Date(client.NextPM)}
                                            onChange={handleChange}
                                            readOnly={!editMode}
                                        />
                                    </Col>
                                </Form.Group>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Machine Brand</th>
                                            <th>Machine Model</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {client.Machines.map((machine, index) => (
                                            <tr key={index}>
                                                <td>{machine.Brand}</td>
                                                <td>{machine.Model}</td>
                                                <td>
                                                    <Button variant="danger" onClick={() => deleteMachine(index)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between pb-3">
                                    <Button variant="primary" onClick={addMachine} className="me-2">Add Machine</Button>
                                    <Button variant="secondary" onClick={() => setEditMode(!editMode)} className="me-2">{editMode ? 'Lock Fields' : 'Edit Fields'}</Button>
                                    <Button variant="success" onClick={handleSubmit}>Submit Changes</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </LoggedIn>
    );
};

export default ClientComponent;
