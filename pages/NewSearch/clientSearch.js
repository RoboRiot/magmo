import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { fetchClients } from "../../utils/fetchAssociations";
import ClientTable from "../../utils/ClientTable";
import styles from "../../styles/MainSearch.module.css";

// import styles from "../../styles/ClientPage.module.css";

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch clients when the component mounts
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, []);

  // Handle search input changes
  const handleSearchChange = (event) => {
    setClientSearchTerm(event.target.value);
  };

  // Handle client selection
  const handleSelectClient = (clientId) => {
    console.log("Selected client ID:", clientId);
    // Redirect to client-specific page
    router.push(`client/${clientId}`);
  };

  // Handle client info button click
  const handleClientInfo = (clientId) => {
    router.push(`client/${clientId}/addClient`);
  };
  

  // Clear search input
  const clearSelection = () => {
    setClientSearchTerm("");
  };

  const addClient = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
  
  // Navigate to the new route with the random number
  router.push(`client/AIS${randomNumber}/addClient`);
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Clients</h2>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "300px" }}
            >
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Row className="mb-3">
                <Col md={{ span: 6, offset: 3 }}>
                  <FormControl
                    type="text"
                    placeholder="Search by name"
                    value={clientSearchTerm}
                    onChange={handleSearchChange}
                    className="mb-3"
                  />
                  <Row className="mb-3">
                    <Col md={4}>
                      <Button
                        variant="secondary"
                        className="w-100"
                        onClick={clearSelection}
                      >
                        Clear Search
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={addClient}
                      >
                        Add New Client
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="secondary"
                        className="w-100"
                        onClick={() => router.push("../Warehousedb/WarehouseSelect")}
                      >
                        back
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <ClientTable
                clients={clients.filter((client) =>
                  client.name
                    .toLowerCase()
                    .includes(clientSearchTerm.toLowerCase())
                )}
                onSelectClient={handleSelectClient}
                onInfoClick={handleClientInfo}
                isClientSearch={true}
                // clearSelection={clearSelection}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClientPage;
