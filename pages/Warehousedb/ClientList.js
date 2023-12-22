import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container, Table } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../context/AuthUserContext";
import firebase from "../../context/Firebase";
import LoggedIn from "../LoggedIn";

export default function ClientList() {
  // Hooks and state initialization
  const { signOut } = useAuth();
  const [clients, setClients] = useState([]);
  const db = firebase.firestore();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dItem, setDItem] = useState();
  const router = useRouter();

  // Fetch data when the component mounts or route changes
  useEffect(() => {
    fetchData();
  }, [router.route]);

  // Function to fetch clients from Firebase
  async function fetchClients() {
    let data = [];
    let id = [];

    await db.collection("Client")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          id.push(element.id);
          data.push(element.data());
        });
      });

    return [data, id];
  }

  // Function to initiate fetching of data and setting state
  async function fetchData() {
    let [data, id] = await fetchClients();
    setClients(data.map((client, index) => ({ ...client, id: id[index] })));
  }

  // Handler for row selection (navigation)
  const rowSelect = (id) => {
    router.push("item/" + id);
  };

  // Handler for checking deletion confirmation
  const checkDelete = async (client) => {
    setDItem(client.Name);
    handleShow();
  };

  // Handler for actual deletion of a client
  const deleteItem = async (clientId) => {
    await db.collection("Client").doc(clientId).delete();
    setClients(clients.filter(client => client.id !== clientId));
    handleClose();
  };

  return (
    <LoggedIn>
      {/* Modal for deletion confirmation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to delete "{dItem}"</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => deleteItem(dItem)}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main container for displaying the client list */}
      <Container className={`${styles.myCustomContainer} d-flex align-items-center justify-content-center`} style={{ minHeight: "100vh", width: "100%" }}>
        <div className="w-100" style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Card className="align-items-center justify-content-center" style={{ width: "100%" }}>
            <Card.Body style={{ width: "100%" }}>
              <h2 className="text-center mb-4">Client List</h2>
              {/* Table to display clients */}
              <Table style={{ width: "100%" }} striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Machines</th>
                    <th>Last PM</th>
                    <th>Next PM</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={client.id}>
                      <td onClick={() => rowSelect(client.id)}>{client.Name}</td>
                      <td onClick={() => rowSelect(client.id)}>{client.Company}</td>
                      <td onClick={() => rowSelect(client.id)}>{client.Location}</td>
                      <td onClick={() => rowSelect(client.id)}>{client.Machines.join(", ")}</td>
                      <td onClick={() => rowSelect(client.id)}>{client.LastPM}</td>
                      <td onClick={() => rowSelect(client.id)}>{client.NextPM}</td>
                      <td>
                        {/* Delete button for each client */}
                        <Button onClick={() => checkDelete(client)} variant="danger">
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
