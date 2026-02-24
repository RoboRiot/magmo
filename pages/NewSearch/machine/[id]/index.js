import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Table,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import firebase from "../../../../context/Firebase";
import styles from "../Machine.module.css";

// Import for SSR
import { adminDb } from "../../../../context/FirebaseAdmin";

const Machine = ({ initialMachine, initialAssociatedParts, error: initialError }) => {
  const router = useRouter();
  const [selectedMachine, setSelectedMachine] = useState(
    initialMachine || null
  );
  const [associatedParts, setAssociatedParts] = useState(
    Array.isArray(initialAssociatedParts) ? initialAssociatedParts : []
  );
  const [error, setError] = useState(initialError || null);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintSuccess, setShowPrintSuccess] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (!id) {
        const pathSegments = router.asPath.split("/");
        const machineIdFromPath = pathSegments[pathSegments.length - 1];
        console.log(`Machine ID extracted from URL path: ${machineIdFromPath}`);
        fetchMachineData(machineIdFromPath);
      } else {
        console.log(`Machine ID from router query: ${id}`);
        // If SSR already hydrated, avoid re-fetching unless we truly need to.
        if (!selectedMachine) {
          fetchMachineData(id);
        }
      }
    }
  }, [router.isReady, selectedMachine]);

  const fetchMachineData = async (machineId) => {
    try {
      console.log(`Attempting to fetch machine data for ID: ${machineId}`);
      const db = firebase.firestore();
      const machineDoc = await db.collection("Machine").doc(machineId).get();
      if (machineDoc.exists) {
        const machineData = machineDoc.data();
        setSelectedMachine(machineData);
        setError(null);
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
      const partsDocs = await Promise.all(
        associatedPartsRefs.map((ref) => ref.get())
      );

      const partsData = await Promise.all(
        partsDocs.map(async (doc) => {
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
        })
      );

      setAssociatedParts(partsData.filter((p) => p));
      setError(null);
      console.log("Associated parts data:", partsData);
    } catch (error) {
      console.error("Error fetching associated parts:", error);
      setError("Error fetching associated parts");
    }
  };

  const handlePrintMulti = async () => {
    setIsPrinting(true);
    // Create your payload with the mapped items.
    // Replace 'associatedParts' with your actual variable containing the list.
    const payload = {
      items: associatedParts.map((part) => ({
        name: part.name,
        arrival_date: part.arrival_date, // Ensure your part has a 'date' field.
        poNumber: part.poNumber || "",
        OEM: part.TheMachine ? part.TheMachine.oem || "" : "",
        modality: part.TheMachine ? part.TheMachine.modality || "" : "",
        model: part.TheMachine ? part.TheMachine.model || "" : "",
        local_sn: part.id, // Using document id as the local serial number.
        client: part.clientName || "",
        description:
          part.description ||
          (part.descriptions && part.descriptions.length > 0
            ? part.descriptions[0].description
            : ""),
      })),
      test_print: true, // Hard-coded here if you want to test printing one item
      index: 1, // Hard-coded index (1-based)
    };

    try {
      const response = await fetch(
        "https://9d70-174-76-22-138.ngrok-free.app/print_multi",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      console.log("Print multi result:", result.status);
      if (!response.ok || result?.status === "error") {
        throw new Error(result?.message || "Print failed.");
      }
      setShowPrintSuccess(true);
    } catch (error) {
      console.error("Error printing multiple labels:", error);
      setError(error?.message || "Error printing multiple labels");
    } finally {
      setIsPrinting(false);
    }
  };

  const handleSelectPart = (id, name) => {
    console.log(`Selected part ID: ${id}, Name: ${name}`);
    router.push("../item/" + id);
  };

  const handleDragStart = (index) => (event) => {
    if (event.target.closest("button")) {
      event.preventDefault();
      return;
    }
    setDragIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "text/plain",
      associatedParts[index]?.id || String(index)
    );
  };

  const handleDragOver = (index) => (event) => {
    event.preventDefault();
    if (dragOverIndex !== index) setDragOverIndex(index);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    if (dragIndex == null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    setAssociatedParts((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const formatDate = (input) => {
    let date;

    if (input && input.seconds) {
      // Handle timestamp object with 'seconds' property
      date = new Date(input.seconds * 1000);
    } else if (typeof input === "string") {
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
    <div className={styles.page}>
      {isPrinting && (
        <div className={styles.loadingOverlay}>
          <img
            src="/magmo-logo.png"
            alt="Printing"
            className={styles.loadingLogo}
          />
        </div>
      )}
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <img src="/magmo-logo.png" alt="Magmo" className={styles.brandLogo} />
            <div>
              <div className={styles.brandName}>Magmo</div>
              <div className={styles.brandSub}>Machine Detail</div>
            </div>
          </div>
          <Button
            variant="outline-secondary"
            className={styles.backButton}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </header>

        <div className={styles.card}>
          <Modal
            show={showPrintSuccess}
            onHide={() => setShowPrintSuccess(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Print Complete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              All items were sent to the printer successfully.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setShowPrintSuccess(false)}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Machine Details</div>
              <div className={styles.cardSubtitle}>
                Drag and drop parts to reorder this list.
              </div>
            </div>
            <div className={styles.cardMeta}>
              {associatedParts.length} parts
            </div>
          </div>
          <div className={styles.cardBody}>
            {error && !selectedMachine && (
              <Alert variant="danger">{error}</Alert>
            )}
            {selectedMachine ? (
              <>
                <div className={styles.machineGrid}>
                  <div className={styles.machineInfo}>
                    <div className={styles.machineName}>
                      {selectedMachine.name || "Unnamed Machine"}
                    </div>
                    <div className={styles.machineMetaRow}>
                      <span>OEM: {selectedMachine.OEM || "N/A"}</span>
                      <span>Modality: {selectedMachine.Modality || "N/A"}</span>
                      <span>Model: {selectedMachine.Model || "N/A"}</span>
                    </div>
                  </div>
                  <div className={styles.machineDates}>
                    <div>
                      <span className={styles.dateLabel}>Last PM</span>
                      <span>{formatDate(selectedMachine.lastPM)}</span>
                    </div>
                    <div>
                      <span className={styles.dateLabel}>Next PM</span>
                      <span>{formatDate(selectedMachine.nextPM)}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    Associated Parts
                    <span className={styles.tableHint}>
                      Click + hold to move
                    </span>
                  </div>
                  <div className={styles.tableWrap}>
                    <Table
                      striped
                      bordered
                      hover
                      size="sm"
                      className={styles.table}
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Part Number</th>
                          <th>Serial Number</th>
                          <th>Date</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {associatedParts.length === 0 && (
                          <tr>
                            <td colSpan={6} className={styles.emptyState}>
                              No associated parts found.
                            </td>
                          </tr>
                        )}
                        {associatedParts.map((part, index) => (
                          <tr
                            key={part.id}
                            draggable
                            onDragStart={handleDragStart(index)}
                            onDragOver={handleDragOver(index)}
                            onDrop={handleDrop(index)}
                            onDragEnd={handleDragEnd}
                            className={`${styles.draggableRow} ${
                              dragIndex === index ? styles.dragging : ""
                            } ${
                              dragOverIndex === index && dragIndex !== index
                                ? styles.dropTarget
                                : ""
                            }`}
                          >
                            <td>{part.name}</td>
                            <td>{part.id}</td>
                            <td>{part.pn}</td>
                            <td>{part.sn}</td>
                            <td>{formatDate(part.date || part.arrival_date)}</td>
                            <td>
                              <Button
                                variant="primary"
                                size="sm"
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
                  </div>
                  <div className={styles.tableActions}>
                    <Button
                      variant="secondary"
                      className={styles.actionButton}
                      onClick={handlePrintMulti}
                    >
                      Print All Items
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              !error && <p className={styles.loadingText}>Loading machine data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machine;

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
    // Fetch machine data from Firestore using Admin SDK
    const machineDoc = await adminDb.collection("Machine").doc(id).get();

    if (!machineDoc.exists) {
      return {
        notFound: true, // This will show a 404 page
      };
    }

    const machineData = machineDoc.data();

    // Fetch associated parts if they exist
    let associatedParts = [];
    if (
      machineData.associatedParts &&
      Array.isArray(machineData.associatedParts)
    ) {
      try {
        const partsPromises = machineData.associatedParts
          .map((partRef) => {
            if (partRef.path) {
              return adminDb.doc(partRef.path).get();
            }
            return null;
          })
          .filter(Boolean);

        const partsDocs = await Promise.all(partsPromises);
        const toDisplayValue = (value) => {
          if (Array.isArray(value)) {
            return value.filter((v) => v != null && v !== "").join(", ");
          }
          return value ?? "";
        };

        associatedParts = await Promise.all(
          partsDocs.map(async (doc) => {
            if (!doc.exists) {
              return null;
            }
            const data = doc.data() || {};
            let clientName = "";

            // Fetch client name if ClientFrom reference exists
            if (data.ClientFrom && data.ClientFrom.path) {
              try {
                const clientDoc = await adminDb.doc(data.ClientFrom.path).get();
                clientName = clientDoc.exists ? clientDoc.data().name : "";
              } catch (error) {
                console.error("Error fetching client data:", error);
              }
            }

            return {
              id: doc.id,
              name: data.name || "",
              pn: toDisplayValue(data.pn),
              sn: toDisplayValue(data.sn),
              date: data.date || data.arrival_date || "",
              clientName,
            };
          })
        );

        // Filter out null values
        associatedParts = associatedParts.filter((part) => part !== null);
      } catch (error) {
        console.error("Error fetching associated parts:", error);
      }
    }

    // Serialize the machine data, removing any non-serializable fields
    const serializedMachine = {
      id,
      name: machineData.name || "",
      Model: machineData.Model || "",
      OEM: machineData.OEM || "",
      Modality: machineData.Modality || "",
      lastPM: machineData.lastPM || null,
      nextPM: machineData.nextPM || null,
      // Add other machine fields as needed, but ensure they're serializable
    };

    return {
      props: {
        initialMachine: serializedMachine,
        initialAssociatedParts: associatedParts,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "Failed to load machine data",
      },
    };
  }
}
