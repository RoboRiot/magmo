import React, { useState, useEffect } from "react";
import { FormControl, Button, Spinner, Alert, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "../../context/Firebase";
import { useAuth } from "../../context/AuthUserContext";
import { fetchClients } from "../../utils/fetchAssociations";
import ClientTable from "../../utils/ClientTable";
import styles from "../../styles/ClientSearch.module.css";

// import styles from "../../styles/ClientPage.module.css";

const ClientPage = () => {
  const { authUser } = useAuth();
  const [clients, setClients] = useState([]);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [selectingClientId, setSelectingClientId] = useState("");
  const [clientToDelete, setClientToDelete] = useState(null);
  const [deletingClientId, setDeletingClientId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [blockingParts, setBlockingParts] = useState([]);
  const router = useRouter();
  const canDeleteClients =
    authUser?.isAdmin === true ||
    String(authUser?.role || "").toLowerCase() === "admin";

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
  const handleSelectClient = async (clientId) => {
    console.log("Selected client ID:", clientId);
    setSelectingClientId(clientId);
    // Redirect to client-specific page
    try {
      await router.push(`client/${clientId}`);
    } catch (error) {
      console.error("Error opening client:", error);
      setSelectingClientId("");
    }
  };

  // Handle client info button click
  const handleClientInfo = (clientId) => {
    router.push(`client/${clientId}/addClient`);
  };

  const handleDeleteClientClick = (client) => {
    setClientToDelete(client);
    setDeleteError("");
    setBlockingParts([]);
  };

  const handleCloseDeleteModal = () => {
    if (deletingClientId) return;
    setClientToDelete(null);
    setDeleteError("");
    setBlockingParts([]);
  };

  const handleConfirmDeleteClient = async () => {
    if (!clientToDelete?.id || !canDeleteClients) return;

    setDeletingClientId(clientToDelete.id);
    setDeleteError("");
    setBlockingParts([]);
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        throw new Error("You must be signed in to delete a client.");
      }
      const token = await currentUser.getIdToken(true);
      const response = await fetch("/api/clients/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientId: clientToDelete.id }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setBlockingParts(Array.isArray(result.blockingParts) ? result.blockingParts : []);
        throw new Error(result.error || "Failed to delete client.");
      }

      setClients((prev) =>
        prev.filter((client) => client.id !== clientToDelete.id)
      );
      setClientToDelete(null);
    } catch (error) {
      console.error("Error deleting client:", error);
      setDeleteError(error?.message || "Failed to delete client.");
    } finally {
      setDeletingClientId("");
    }
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

  const openTrailersClient = () => {
    router.push("/NewSearch/client/AIS62854");
  };

  const openLakeForestClient = () => {
    router.push("/NewSearch/client/AIS17182");
  };

  const openLathropClient = () => {
    router.push("/NewSearch/client/AIS25097");
  };

  const normalizedSearch = clientSearchTerm.trim().toLowerCase();
  const filteredClients = (Array.isArray(clients) ? clients : []).filter(
    (client) =>
      (client?.name || "").toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className={styles.page}>
      <Modal show={Boolean(clientToDelete)} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton={!deletingClientId}>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}
          {blockingParts.length > 0 && (
            <Alert variant="warning">
              Move these associated parts before deleting this client:
              <ul className={styles.blockingList}>
                {blockingParts.map((part) => (
                  <li key={part.id}>
                    {part.id}
                    {part.name ? ` - ${part.name}` : ""}
                  </li>
                ))}
              </ul>
            </Alert>
          )}
          Are you sure you want to delete{" "}
          <strong>{clientToDelete?.name || clientToDelete?.id}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}
            disabled={Boolean(deletingClientId)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDeleteClient}
            disabled={Boolean(deletingClientId)}
          >
            {deletingClientId ? "Deleting..." : "Yes, delete client"}
          </Button>
        </Modal.Footer>
      </Modal>
      {selectingClientId && (
        <div className={styles.loadingOverlay}>
          <img
            src="/magmo-logo.png"
            alt="Loading Magmo"
            className={styles.loadingLogo}
          />
        </div>
      )}
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/NewSearch/mainSearch">
            <a className={styles.brand} aria-label="Go to Main Search">
              <img
                src="/magmo-logo.png"
                alt="Magmo"
                className={styles.brandLogo}
              />
              <div>
                <div className={styles.brandName}>Magmo</div>
                <div className={styles.brandSub}>Client Search</div>
              </div>
            </a>
          </Link>
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
                  <Button
                    variant="outline-primary"
                    className={styles.primaryButton}
                    onClick={openTrailersClient}
                  >
                    Trailers
                  </Button>
                  <Button
                    variant="outline-primary"
                    className={styles.primaryButton}
                    onClick={openLakeForestClient}
                  >
                    Lake Forest
                  </Button>
                  <Button
                    variant="outline-primary"
                    className={styles.primaryButton}
                    onClick={openLathropClient}
                  >
                    Lathrop
                  </Button>
                </div>

                <div className={styles.tableWrap}>
                  <ClientTable
                    clients={filteredClients}
                    onSelectClient={handleSelectClient}
                    onInfoClick={handleClientInfo}
                    canDeleteClients={canDeleteClients}
                    deletingClientId={deletingClientId}
                    onDeleteClient={handleDeleteClientClick}
                    isClientSearch={true}
                    selectingClientId={selectingClientId}
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
