import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Table,
  Button,
  Alert,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import firebase from "../../../../context/Firebase";
import { useAuth } from "../../../../context/AuthUserContext";
import ClientInfoModal from "../../ClientInfoModal";
import MachineCreationModal from "../../MachineCreationModal";
import MachineEditModal from "../../MachineEditModal";
import styles from "../Client.module.css";
import clientMachineHelpers from "../../../../lib/clientMachines.cjs";
import trailerDirectoryHelpers from "../../../../lib/ops/trailerDirectory.cjs";

// Import for SSR
import { adminDb } from "../../../../context/FirebaseAdmin";

const {
  extractDocumentId,
  serializeMachineDocument,
  sortMachineRecords,
} = clientMachineHelpers;
const { serializeTrailerDirectory } = trailerDirectoryHelpers;

const Client = ({
  initialClient,
  initialMachines,
  initialTrailers,
  error: initialError,
}) => {
  const router = useRouter();
  const { authUser } = useAuth();
  const [selectedClient, setSelectedClient] = useState(initialClient || null);
  const [machineOptions, setMachineOptions] = useState(
    Array.isArray(initialMachines) ? initialMachines : []
  );
  const [error, setError] = useState(initialError || null);
  const [isLoading, setIsLoading] = useState(
    !initialClient && !initialError
  );
  const [machinesLoading, setMachinesLoading] = useState(false);

  // State for machine addition modals
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [showCreateMachineModal, setShowCreateMachineModal] = useState(false);
  const [availableMachines, setAvailableMachines] = useState([]);
  const [machineToEdit, setMachineToEdit] = useState(null);
  const [savingMachineId, setSavingMachineId] = useState("");
  const [editMachineError, setEditMachineError] = useState("");
  const [machineUpdateMessage, setMachineUpdateMessage] = useState("");
  const [machineToDelete, setMachineToDelete] = useState(null);
  const [deletingMachineId, setDeletingMachineId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [blockingParts, setBlockingParts] = useState([]);
  const [trailerOptions, setTrailerOptions] = useState(
    Array.isArray(initialTrailers) ? initialTrailers : []
  );
  const [selectedTrailerId, setSelectedTrailerId] = useState("");
  const [savingTrailerId, setSavingTrailerId] = useState("");
  const [trailerLinkError, setTrailerLinkError] = useState("");
  const [trailerLinkMessage, setTrailerLinkMessage] = useState("");
  const canDeleteMachines =
    authUser?.isAdmin === true ||
    String(authUser?.role || "").toLowerCase() === "admin";

  useEffect(() => {
    if (!router.isReady) return;
    const activeId = router.query.id || router.asPath.split("/").pop();
    if (!activeId) return;

    // The page is server-rendered with the client and its linked machines. Keep
    // that data instead of immediately repeating the same reads through the
    // browser Firestore SDK, which can be blocked by a proxy or streaming
    // transport even while the Magmo server can reach Firestore normally.
    if (initialClient?.id === activeId) {
      setSelectedClient(initialClient);
      setMachineOptions(
        Array.isArray(initialMachines) ? initialMachines : []
      );
      setTrailerOptions(Array.isArray(initialTrailers) ? initialTrailers : []);
      setError(initialError || null);
      setIsLoading(false);
      setMachinesLoading(false);
      return;
    }

    fetchClientData(activeId, { silent: Boolean(initialClient) });
  }, [
    router.isReady,
    router.query.id,
    initialClient,
    initialMachines,
    initialTrailers,
    initialError,
  ]);

  const fetchMachineRefs = async (machineRefs = []) => {
    const validRefs = machineRefs.filter(
      (machineRef) => machineRef && typeof machineRef.get === "function"
    );
    const machines = [];
    const chunkSize = 20;

    for (let index = 0; index < validRefs.length; index += chunkSize) {
      const chunk = validRefs.slice(index, index + chunkSize);
      const machineDocs = await Promise.all(chunk.map((machineRef) => machineRef.get()));
      machineDocs.forEach((machineDoc) => {
        if (!machineDoc.exists) return;
        const machineData = machineDoc.data() || {};
        machines.push({
          id: machineDoc.id,
          name: machineData.name || "",
          local: machineData.local || "",
          OEM: machineData.OEM || machineData.oem || "",
          Modality: machineData.Modality || machineData.modality || "",
          Model: machineData.Model || machineData.model || "",
          lastPM: machineData.lastPM || null,
          nextPM: machineData.nextPM || null,
        });
      });
    }

    return machines;
  };

  const fetchClientData = async (clientId, { silent = false } = {}) => {
    if (!silent) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();
      if (clientDoc.exists) {
        const clientData = clientDoc.data();
        setSelectedClient({ id: clientId, ...clientData });

        const machineRefs = Array.isArray(clientData.machines)
          ? clientData.machines
          : [];
        setMachinesLoading(true);
        const machines = await fetchMachineRefs(machineRefs);
        setMachineOptions(machines);
      } else {
        setError("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Error fetching client data");
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
      setMachinesLoading(false);
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

  const handleEditMachineClick = (machine) => {
    setMachineToEdit(machine);
    setEditMachineError("");
    setMachineUpdateMessage("");
  };

  const handleCloseEditMachineModal = () => {
    if (savingMachineId) return;
    setMachineToEdit(null);
    setEditMachineError("");
  };

  const handleSaveMachine = async (form) => {
    if (!machineToEdit?.id || !canDeleteMachines) return;

    const name = String(form?.name || "").trim();
    if (!name) {
      setEditMachineError("Machine name is required.");
      return;
    }

    setSavingMachineId(machineToEdit.id);
    setEditMachineError("");
    setMachineUpdateMessage("");
    try {
      const OEM = String(form?.OEM || "").trim();
      const Modality = String(form?.Modality || "").trim();
      const Model = String(form?.Model || "").trim();
      const db = firebase.firestore();
      const updatePayload = {
        name,
        local: String(form?.local || "").trim(),
        OEM,
        oem: OEM,
        Modality,
        modality: Modality,
        Model,
        model: Model,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastPM: form?.lastPM
          ? form.lastPM
          : firebase.firestore.FieldValue.delete(),
        nextPM: form?.nextPM
          ? form.nextPM
          : firebase.firestore.FieldValue.delete(),
      };

      await db.collection("Machine").doc(machineToEdit.id).set(updatePayload, {
        merge: true,
      });

      const updatedMachine = {
        ...machineToEdit,
        name: updatePayload.name,
        local: updatePayload.local,
        OEM,
        oem: OEM,
        Modality,
        modality: Modality,
        Model,
        model: Model,
        lastPM: form?.lastPM || null,
        nextPM: form?.nextPM || null,
      };
      setMachineOptions((current) =>
        current.map((machine) =>
          machine.id === updatedMachine.id ? updatedMachine : machine
        )
      );
      setMachineToEdit(null);
      setMachineUpdateMessage(`${name} was updated.`);
    } catch (error) {
      console.error("Error updating machine:", error);
      setEditMachineError(error?.message || "Failed to update machine.");
    } finally {
      setSavingMachineId("");
    }
  };

  const handleDeleteMachineClick = (machine) => {
    setMachineToDelete(machine);
    setDeleteError("");
    setBlockingParts([]);
  };

  const handleCloseDeleteMachineModal = () => {
    if (deletingMachineId) return;
    setMachineToDelete(null);
    setDeleteError("");
    setBlockingParts([]);
  };

  const handleConfirmDeleteMachine = async () => {
    const clientId = selectedClient?.id || router.query.id || router.asPath.split("/").pop();
    if (!machineToDelete?.id || !clientId || !canDeleteMachines) return;

    setDeletingMachineId(machineToDelete.id);
    setDeleteError("");
    setBlockingParts([]);
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        throw new Error("You must be signed in to delete a machine.");
      }
      const token = await currentUser.getIdToken(true);
      const response = await fetch("/api/machines/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientId,
          machineId: machineToDelete.id,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setBlockingParts(Array.isArray(result.blockingParts) ? result.blockingParts : []);
        throw new Error(result.error || "Failed to delete machine.");
      }

      setMachineOptions((prev) =>
        prev.filter((machine) => machine.id !== machineToDelete.id)
      );
      setMachineToDelete(null);
    } catch (error) {
      console.error("Error deleting machine:", error);
      setDeleteError(error?.message || "Failed to delete machine.");
    } finally {
      setDeletingMachineId("");
    }
  };

  // When adding an existing machine
  const handleAddMachine = async (machine) => {
    try {
      const db = firebase.firestore();
      const clientId = router.query.clientId || router.asPath.split("/").pop();

      // Update client's "machines" array with the machine reference
      await db
        .collection("Client")
        .doc(clientId)
        .update({
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
      await db
        .collection("Client")
        .doc(clientId)
        .update({
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

  const linkedTrailers = trailerOptions.filter(
    (trailer) => trailer.currentClientId === selectedClient?.id
  );

  const updateTrailerClientLink = async (trailer, clientId) => {
    if (!trailer?.sourceId || !canDeleteMachines) return;
    if (
      clientId &&
      trailer.currentClientId &&
      trailer.currentClientId !== clientId &&
      typeof window !== "undefined" &&
      !window.confirm(
        `${trailer.name || trailer.id} is currently linked to ${
          trailer.currentClientName || trailer.currentClientId
        }. Move its client link to ${selectedClient?.name || clientId}?`
      )
    ) {
      return;
    }

    setSavingTrailerId(trailer.id);
    setTrailerLinkError("");
    setTrailerLinkMessage("");
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) throw new Error("You must be signed in to change trailer links.");
      const token = await currentUser.getIdToken(true);
      const response = await fetch("/api/trailers/link-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trailerId: trailer.sourceId,
          clientId,
          expectedClientId: trailer.currentClientId || "",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "Failed to update the trailer link.");
      }

      setTrailerOptions((current) =>
        current.map((entry) =>
          entry.id === trailer.id
            ? {
                ...entry,
                currentClientId: result.clientId || "",
                currentClientName: result.clientName || "",
                currentClientAddress: result.clientAddress || "",
                needsReview: !result.clientId || entry.legacySourceIds?.length > 0,
              }
            : entry
        )
      );
      if (clientId && result.associatedMachineId) {
        const machineDocument = await firebase
          .firestore()
          .collection("Machine")
          .doc(result.associatedMachineId)
          .get();
        if (machineDocument.exists) {
          const data = machineDocument.data() || {};
          const machine = {
            id: machineDocument.id,
            name: data.name || "",
            local: data.local || "",
            OEM: data.OEM || data.oem || "",
            Modality: data.Modality || data.modality || "",
            Model: data.Model || data.model || "",
            lastPM: data.lastPM || null,
            nextPM: data.nextPM || null,
          };
          setMachineOptions((current) =>
            sortMachineRecords([
              ...current.filter((entry) => entry.id !== machine.id),
              machine,
            ])
          );
        }
      } else if (!clientId && result.associatedMachineId) {
        setMachineOptions((current) =>
          current.filter((entry) => entry.id !== result.associatedMachineId)
        );
      }
      setSelectedTrailerId("");
      setTrailerLinkMessage(
        clientId
          ? `${trailer.name || trailer.id} is now linked to this client.`
          : `${trailer.name || trailer.id} was unlinked from this client.`
      );
    } catch (linkError) {
      console.error("Failed to update trailer client link:", linkError);
      setTrailerLinkError(
        linkError?.message || "Failed to update the trailer link."
      );
    } finally {
      setSavingTrailerId("");
    }
  };

  return (
    <div className={styles.page}>
      <Modal show={Boolean(machineToDelete)} onHide={handleCloseDeleteMachineModal}>
        <Modal.Header closeButton={!deletingMachineId}>
          <Modal.Title>Delete Machine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}
          {blockingParts.length > 0 && (
            <Alert variant="warning">
              Move these associated parts before deleting this machine:
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
          <strong>{machineToDelete?.name || machineToDelete?.id}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteMachineModal}
            disabled={Boolean(deletingMachineId)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDeleteMachine}
            disabled={Boolean(deletingMachineId)}
          >
            {deletingMachineId ? "Deleting..." : "Yes, delete machine"}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link
            href="/NewSearch/mainSearch"
            className={styles.brand}
            aria-label="Go to Main Search">

            <img src="/magmo-logo.png" alt="Magmo" className={styles.brandLogo} />
            <div>
              <div className={styles.brandName}>Magmo</div>
              <div className={styles.brandSub}>Client Detail</div>
            </div>

          </Link>
          <Button
            variant="outline-secondary"
            className={styles.backButton}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Client Machines</div>
              <div className={styles.cardSubtitle}>
                Manage machines linked to this client.
              </div>
            </div>
            <div className={styles.cardMeta}>
              {machineOptions.length} machines
            </div>
          </div>

          <div className={styles.cardBody}>
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading && (
              <div className={styles.loadingWrap}>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}

            {!isLoading && selectedClient && (
              <>
                <div className={styles.clientSummary}>
                  <div className={styles.clientName}>{selectedClient.name}</div>
                  <div className={styles.clientMetaRow}>
                    <span>
                      Location: {selectedClient.local || "Unknown"}
                    </span>
                    <span>Client ID: {selectedClient.id}</span>
                  </div>
                </div>

                <div className={styles.trailerLinkPanel}>
                  <div className={styles.tableHeader}>
                    <div>
                      <span>Linked trailers</span>
                      {trailerLinkMessage && (
                        <span className={styles.successMessage} role="status">
                          {trailerLinkMessage}
                        </span>
                      )}
                    </div>
                    <Link href="/NewSearch/Trailers" className={styles.tableHint}>
                      Open trailer directory
                    </Link>
                  </div>
                  <div className={styles.trailerLinkBody}>
                    {trailerLinkError && (
                      <Alert variant="danger">{trailerLinkError}</Alert>
                    )}
                    {canDeleteMachines && (
                      <div className={styles.linkControls}>
                        <Form.Control
                          as="select"
                          value={selectedTrailerId}
                          onChange={(event) => setSelectedTrailerId(event.target.value)}
                          aria-label="Select a trailer to link"
                        >
                          <option value="">Select a trailer</option>
                          {trailerOptions.map((trailer) => (
                            <option key={trailer.id} value={trailer.id}>
                              {trailer.name || trailer.id}
                              {trailer.currentClientName
                                ? ` — currently ${trailer.currentClientName}`
                                : " — not linked"}
                            </option>
                          ))}
                        </Form.Control>
                        <Button
                          variant="primary"
                          disabled={!selectedTrailerId || Boolean(savingTrailerId)}
                          onClick={() => {
                            const trailer = trailerOptions.find(
                              (entry) => entry.id === selectedTrailerId
                            );
                            if (trailer) {
                              updateTrailerClientLink(trailer, selectedClient.id);
                            }
                          }}
                        >
                          {savingTrailerId ? "Saving..." : "Link trailer"}
                        </Button>
                      </div>
                    )}
                    <div className={styles.linkedTrailerList}>
                      {linkedTrailers.length === 0 ? (
                        <div className={styles.emptyState}>
                          No trailers are linked to this client.
                        </div>
                      ) : (
                        linkedTrailers.map((trailer) => (
                          <div key={trailer.id} className={styles.linkedTrailerRow}>
                            <div>
                              <Link
                                href={{
                                  pathname: `/NewSearch/Trailers/${encodeURIComponent(
                                    trailer.sourceId || trailer.id
                                  )}`,
                                  query: {
                                    returnTo: `/NewSearch/client/${selectedClient.id}`,
                                  },
                                }}
                                className={styles.linkedTrailerName}
                              >
                                {trailer.name || trailer.id}
                              </Link>
                              <div className={styles.tableHint}>
                                {trailer.associatedMachineId
                                  ? `Machine ${trailer.associatedMachineId}`
                                  : "No associated machine"}
                              </div>
                            </div>
                            {canDeleteMachines && (
                              <Button
                                size="sm"
                                variant="outline-danger"
                                disabled={Boolean(savingTrailerId)}
                                onClick={() => updateTrailerClientLink(trailer, "")}
                              >
                                {savingTrailerId === trailer.id
                                  ? "Saving..."
                                  : "Unlink"}
                              </Button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.actionRow}>
                  <Button variant="primary" onClick={openAddMachineModal}>
                    Add Existing Machine
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowCreateMachineModal(true)}
                  >
                    Create New Machine
                  </Button>
                </div>

                <div className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    <div>
                      <span>Machines</span>
                      {machineUpdateMessage && (
                        <span className={styles.successMessage} role="status">
                          {machineUpdateMessage}
                        </span>
                      )}
                    </div>
                    <span className={styles.tableHint}>
                      {machinesLoading
                        ? "Loading machines..."
                        : "Select a machine to view details."}
                    </span>
                  </div>
                  <div className={styles.tableWrap}>
                    {machinesLoading ? (
                      <div className={styles.loadingWrap}>
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading machines...</span>
                        </Spinner>
                      </div>
                    ) : (
                    <Table striped bordered hover size="sm" className={styles.table}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Location</th>
                          <th>OEM</th>
                          <th>Modality</th>
                          <th>Select</th>
                          {canDeleteMachines && <th>Edit</th>}
                          {canDeleteMachines && <th>Delete</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {machineOptions.length === 0 ? (
                          <tr>
                            <td
                              colSpan={canDeleteMachines ? 7 : 5}
                              className={styles.emptyState}
                            >
                              No machines assigned yet.
                            </td>
                          </tr>
                        ) : (
                          machineOptions.map((machine) => (
                            <tr key={machine.id}>
                              <td>{machine.name}</td>
                              <td>{machine.local}</td>
                              <td>{machine.OEM}</td>
                              <td>{machine.Modality}</td>
                              <td>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    handleSelectMachine(machine.id, machine.name)
                                  }
                                >
                                  Select
                                </Button>
                              </td>
                              {canDeleteMachines && (
                                <td>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    disabled={Boolean(savingMachineId || deletingMachineId)}
                                    onClick={() => handleEditMachineClick(machine)}
                                  >
                                    Edit
                                  </Button>
                                </td>
                              )}
                              {canDeleteMachines && (
                                <td>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    disabled={Boolean(deletingMachineId)}
                                    onClick={() => handleDeleteMachineClick(machine)}
                                  >
                                    {deletingMachineId === machine.id
                                      ? "Deleting..."
                                      : "Delete"}
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
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
      <MachineEditModal
        show={Boolean(machineToEdit)}
        machine={machineToEdit}
        saving={Boolean(savingMachineId)}
        error={editMachineError}
        handleClose={handleCloseEditMachineModal}
        onSaveMachine={handleSaveMachine}
      />
    </div>
  );
};

export default Client;

// Server-side rendering function
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    if (!adminDb) {
      return {
        props: {
          error: "Firebase Admin not configured for SSR.",
        },
      };
    }
    // Fetch client data from Firestore using Admin SDK
    const clientDoc = await adminDb.collection("Client").doc(id).get();

    if (!clientDoc.exists) {
      return {
        notFound: true, // This will show a 404 page
      };
    }

    const clientData = clientDoc.data();

    const machineRefs = Array.isArray(clientData.machines) ? clientData.machines : [];
    const machineDocsById = new Map();
    const chunkSize = 20;

    // Resolve machine references with the Admin SDK as part of SSR. A missing
    // or malformed legacy reference should not prevent the rest of the
    // client's machines from rendering.
    for (let index = 0; index < machineRefs.length; index += chunkSize) {
      const chunk = machineRefs.slice(index, index + chunkSize);
      const machineResults = await Promise.allSettled(
        chunk.map(async (machineRef) => {
          if (machineRef && typeof machineRef.get === "function") {
            return machineRef.get();
          }

          const machineId = extractDocumentId(machineRef, "Machine");

          if (!machineId) return null;
          return adminDb.collection("Machine").doc(machineId).get();
        })
      );

      machineResults.forEach((result) => {
        if (result.status !== "fulfilled" || !result.value?.exists) return;
        machineDocsById.set(result.value.id, result.value);
      });
    }

    // Older data is not always mirrored in Client.machines. Union the forward
    // references above with machines that point back to this client, supporting
    // both DocumentReference and historical string formats.
    const machineCollection = adminDb.collection("Machine");
    const reverseClientValues = [
      clientDoc.ref,
      id,
      `Client/${id}`,
      `/Client/${id}`,
    ];
    const reverseResults = await Promise.allSettled(
      reverseClientValues.map((clientValue) =>
        machineCollection.where("client", "==", clientValue).get()
      )
    );
    reverseResults.forEach((result) => {
      if (result.status !== "fulfilled") return;
      result.value.docs.forEach((machineDoc) => {
        machineDocsById.set(machineDoc.id, machineDoc);
      });
    });

    const serializedMachines = sortMachineRecords(
      Array.from(machineDocsById.values())
        .map(serializeMachineDocument)
        .filter(Boolean)
    );

    // Serialize the client data, removing any non-serializable fields
    const serializedClient = {
      id,
      name: clientData.name || "",
      local: clientData.local || "",
      // Add other client fields as needed, but ensure they're serializable
    };

    const [trailerSnapshot, allClientsSnapshot] = await Promise.all([
      adminDb.collection("Trailers").get(),
      adminDb.collection("Client").get(),
    ]);
    const trailerRecords = trailerSnapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() || {}),
    }));
    const directoryClients = allClientsSnapshot.docs
      .filter((document) => document.id !== "AIS62854")
      .map((document) => ({ id: document.id, ...(document.data() || {}) }));
    const serializedTrailers = serializeTrailerDirectory(
      trailerRecords,
      directoryClients
    );

    return {
      props: {
        initialClient: serializedClient,
        initialMachines: serializedMachines,
        initialTrailers: serializedTrailers,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load client data",
      },
    };
  }
}
