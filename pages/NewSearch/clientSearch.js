import React, { useState, useEffect } from "react";
import { FormControl, Button, Spinner, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { fetchClients } from "../../utils/fetchAssociations";
import ClientTable from "../../utils/ClientTable";
import styles from "../../styles/ClientSearch.module.css";

// import styles from "../../styles/ClientPage.module.css";

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const router = useRouter();

  // Fetch clients when the component mounts
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);
        setLoadError(null);
      } catch (error) {
        console.error("Error fetching clients: ", error);
        setLoadError("Failed to load clients. Please try again.");
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

  const normalizedSearch = clientSearchTerm.trim().toLowerCase();
  const filteredClients = (Array.isArray(clients) ? clients : []).filter(
    (client) =>
      (client?.name || "").toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <img
              src="/magmo-logo.png"
              alt="Magmo"
              className={styles.brandLogo}
            />
            <div>
              <div className={styles.brandName}>Magmo</div>
              <div className={styles.brandSub}>Client Search</div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="outline-secondary"
              className={styles.backButton}
              onClick={() => router.push("../Warehousedb/WarehouseSelect")}
            >
              Back
            </Button>
          </div>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Clients</div>
              <div className={styles.cardSubtitle}>
                Search by name and manage client records.
              </div>
            </div>
            <div className={styles.cardBadge}>
              {filteredClients.length} clients
            </div>
          </div>

          <div className={styles.cardBody}>
            {loadError && <Alert variant="danger">{loadError}</Alert>}
            {isLoading ? (
              <div className={styles.loadingWrap}>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                <div className={styles.searchRow}>
                  <FormControl
                    type="text"
                    placeholder="Search by name"
                    value={clientSearchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                  <Button
                    variant="outline-secondary"
                    className={styles.clearButton}
                    onClick={clearSelection}
                    disabled={!clientSearchTerm}
                  >
                    Clear
                  </Button>
                </div>

                <div className={styles.actionRow}>
                  <Button
                    variant="primary"
                    className={styles.primaryButton}
                    onClick={addClient}
                  >
                    Add New Client
                  </Button>
                </div>

                <div className={styles.tableWrap}>
                  <ClientTable
                    clients={filteredClients}
                    onSelectClient={handleSelectClient}
                    onInfoClick={handleClientInfo}
                    isClientSearch={true}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClientPage;
