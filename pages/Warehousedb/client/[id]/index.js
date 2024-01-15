import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import firebase from "../../../../context/Firebase"; // Adjust the path as needed
import LoggedIn from "../../../LoggedIn";

const ClientComponent = () => {
    const router = useRouter();
    const { id } = router.query;
    const [client, setClient] = useState({ Company: '', Name: '', Location: '', LastPM: '', NextPM: '', Machines: [] });
    const [editMode, setEditMode] = useState(false);
    const [machineRefs, setMachineRefs] = useState([]);

    useEffect(() => {
        if (id) {
            const db = firebase.firestore();
            db.collection('Client').doc(id).get()
                .then(async doc => {
                    if (doc.exists) {
                        const clientData = doc.data();
                        const machineReferences = clientData.Machines;
                        setMachineRefs(machineReferences);
                        const machines = await Promise.all(machineReferences.map(async ref => {
                            const machineDoc = await ref.get();
                            return machineDoc.exists ? machineDoc.data() : null;
                        }));
                        setClient({ ...clientData, Machines: machines.filter(m => m) });
                    }
                })
                .catch(error => console.error('Error fetching client data:', error));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };

    const addMachine = () => {
        const newId = 'AIS' + Math.floor(100000 + Math.random() * 900000);
        router.push(`../Machines/${newId}`);
    };

    const deleteMachine = (machineIndex) => {
        const newMachines = client.Machines.filter((_, index) => index !== machineIndex);
        const newMachineRefs = machineRefs.filter((_, index) => index !== machineIndex);
        setClient({ ...client, Machines: newMachines });
        setMachineRefs(newMachineRefs);
    };

    const handleSubmit = () => {
        const db = firebase.firestore();
        const clientDataToSave = {
            ...client,
            Machines: machineRefs // Save only the references
        };
        db.collection('Client').doc(id).set(clientDataToSave)
            .then(() => console.log('Client updated successfully'))
            .catch(error => console.error('Error updating client:', error));
    };

    function convertDateToInputFormat(dateStr) {
        if (!dateStr) return '';
        const [month, day, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    function convertInputDateBack(dateStr) {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${month}/${day}/${year}`;
    }

    const handleBack = () => {
        router.back();
    };

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
                                            value={convertDateToInputFormat(client.LastPM)}
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
                                            value={convertDateToInputFormat(client.NextPM)}
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

                                <Row>
                                    <Col xs={6} className="mb-2">
                                        <Button variant="primary" onClick={addMachine}>Add Machine</Button>
                                    </Col>
                                    <Col xs={6} className="mb-2">
                                        <Button variant="secondary" onClick={() => setEditMode(!editMode)}>{editMode ? 'Lock Fields' : 'Edit Fields'}</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="info" onClick={handleBack}>Back</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="success" onClick={handleSubmit}>Submit Changes</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </LoggedIn>
    );
};

export default ClientComponent;