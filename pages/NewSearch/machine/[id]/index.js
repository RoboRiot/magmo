import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Table,
  Button,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import firebase from "../../../../context/Firebase";
import { useAuth } from "../../../../context/AuthUserContext";
import { fetchAssociatedPartsByEntity } from "../../../../utils/fetchAssociatedPartsByEntity";
import { resolveAssociatedPartForPrint } from "../../../../utils/resolveAssociatedPartForPrint";
import styles from "../Machine.module.css";

// Import for SSR
import { adminDb } from "../../../../context/FirebaseAdmin";
const {
  firstEntityRoleValue,
  groupAssociatedParts,
  referenceId,
} = require("../../../../lib/associatedPartRoles.cjs");

const getRefId = (ref) => {
  return referenceId(ref) || null;
};

const formatDateInput = (input) => {
  if (!input) return "";
  let date = null;
  if (input.seconds) {
    date = new Date(input.seconds * 1000);
  } else if (typeof input.toDate === "function") {
    date = input.toDate();
  } else {
    date = new Date(input);
  }
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const buildEditForm = (machine = {}) => ({
  name: machine.name || "",
  local: machine.local || "",
  OEM: machine.OEM || machine.oem || "",
  Modality: machine.Modality || machine.modality || "",
  Model: machine.Model || machine.model || "",
  lastPM: formatDateInput(machine.lastPM),
  nextPM: formatDateInput(machine.nextPM),
});

const Machine = ({ initialMachine, initialAssociatedParts, error: initialError }) => {
  const router = useRouter();
  const { authUser } = useAuth();
  const [selectedMachine, setSelectedMachine] = useState(
    initialMachine || null
  );
  const [associatedPartsByRole, setAssociatedPartsByRole] = useState(() =>
    groupAssociatedParts(
      Array.isArray(initialAssociatedParts) ? initialAssociatedParts : [],
      "machine",
      initialMachine?.id
    )
  );
  const [associatedPartsGroup, setAssociatedPartsGroup] = useState("current");
  const [associatedPartsLoading, setAssociatedPartsLoading] = useState(false);
  const [associatedPartsError, setAssociatedPartsError] = useState("");
  const [printError, setPrintError] = useState("");
  const [error, setError] = useState(initialError || null);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isPrinting, setIsPrinting] = useState("");
  const [showPrintSuccess, setShowPrintSuccess] = useState(false);
  const [isEditingMachine, setIsEditingMachine] = useState(false);
  const [isSavingMachine, setIsSavingMachine] = useState(false);
  const [editForm, setEditForm] = useState(buildEditForm(initialMachine || {}));
  const [editError, setEditError] = useState("");
  const isAdminUser =
    authUser?.isAdmin === true ||
    String(authUser?.role || "").toLowerCase() === "admin";
  const queryMachineId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const pathMachineId = router.asPath
    .split(/[?#]/, 1)[0]
    .split("/")
    .filter(Boolean)
    .pop();
  const routeMachineId = String(
    queryMachineId || (router.isReady ? pathMachineId : "") || ""
  ).trim();
  const activeMachineId = routeMachineId || selectedMachine?.id || "";
  const associatedPartsForView =
    associatedPartsByRole[associatedPartsGroup] || [];
  const associatedPartCounts = {
    from: associatedPartsByRole.from.length,
    current: associatedPartsByRole.current.length,
  };
  const associatedPartTotal = new Set(
    [...associatedPartsByRole.from, ...associatedPartsByRole.current].map(
      (part) => part.id
    )
  ).size;

  useEffect(() => {
    if (!router.isReady || !routeMachineId) return undefined;

    const selectedMachineId = referenceId(selectedMachine?.id);
    if (selectedMachineId && selectedMachineId !== routeMachineId) {
      setSelectedMachine(null);
      setAssociatedPartsByRole({ from: [], current: [] });
      setAssociatedPartsError("");
      setPrintError("");
      setError(null);
      setIsEditingMachine(false);
      return undefined;
    }
    if (selectedMachineId === routeMachineId) return undefined;

    let cancelled = false;
    const loadMachine = async () => {
      try {
        const machineDoc = await firebase
          .firestore()
          .collection("Machine")
          .doc(routeMachineId)
          .get();
        if (cancelled) return;
        if (machineDoc.exists) {
          setSelectedMachine({ id: machineDoc.id, ...machineDoc.data() });
          setError(null);
        } else {
          setError("Machine not found");
        }
      } catch (loadError) {
        console.error("Error fetching machine data:", loadError);
        if (!cancelled) setError("Error fetching machine data");
      }
    };

    loadMachine();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, routeMachineId, selectedMachine?.id]);

  useEffect(() => {
    if (!selectedMachine || isEditingMachine) return;
    setEditForm(buildEditForm(selectedMachine));
  }, [selectedMachine, isEditingMachine]);

  useEffect(() => {
    if (!activeMachineId) return undefined;
    let cancelled = false;

    const loadAssociatedParts = async () => {
      setAssociatedPartsLoading(true);
      setAssociatedPartsError("");
      try {
        const groups = await fetchAssociatedPartsByEntity(firebase.firestore(), {
          entityType: "machine",
          entityId: activeMachineId,
        });
        if (!cancelled) setAssociatedPartsByRole(groups);
      } catch (partsError) {
        console.error("Error fetching associated machine parts:", partsError);
        if (!cancelled) {
          setAssociatedPartsError(
            "The complete associated-parts list could not be verified. Print All is disabled until the list reloads successfully."
          );
        }
      } finally {
        if (!cancelled) setAssociatedPartsLoading(false);
      }
    };

    loadAssociatedParts();
    return () => {
      cancelled = true;
    };
  }, [activeMachineId]);

  const handlePrintMulti = async (role) => {
    if (associatedPartsError) {
      setPrintError(
        "Print All is unavailable because the complete associated-parts list could not be verified."
      );
      return;
    }
    const parts = associatedPartsByRole[role] || [];
    setIsPrinting(role);
    setPrintError("");
    try {
      const db = firebase.firestore();
      const resolvedItems = await Promise.all(
        parts.map((part) =>
          resolveAssociatedPartForPrint(db, part, { role })
        )
      );
      const payload = {
        items: resolvedItems.filter(Boolean),
        test_print: true,
        index: 1,
      };

      if (!payload.items.length) {
        throw new Error("No items available to print.");
      }
      const idToken = await firebase.auth().currentUser?.getIdToken();
      const response = await fetch("/api/print/multi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result?.ok === false) {
        const detail =
          result?.details ||
          (Array.isArray(result?.attempts)
            ? result.attempts
                .map((entry) => `${entry.url} => ${entry.status ?? entry.error}`)
                .join(" | ")
            : "");
        throw new Error(
          `${result?.error || `Print proxy failed (${response.status})`}${
            detail ? ` | ${detail}` : ""
          }`
        );
      }
      console.log("Print multi result:", result.status);
      if (!response.ok || result?.status === "error") {
        throw new Error(result?.message || "Print failed.");
      }
      setShowPrintSuccess(true);
    } catch (error) {
      console.error("Error printing multiple labels:", error);
      setPrintError(error?.message || "Error printing multiple labels");
    } finally {
      setIsPrinting("");
    }
  };

  const handleSelectPart = (id, name) => {
    console.log(`Selected part ID: ${id}, Name: ${name}`);
    router.push("../item/" + id);
  };

  const handleEditFieldChange = (field) => (event) => {
    const value = event?.target?.value ?? "";
    setEditForm((prev) => ({ ...prev, [field]: value }));
    setEditError("");
  };

  const handleStartEditMachine = () => {
    setEditForm(buildEditForm(selectedMachine || {}));
    setEditError("");
    setIsEditingMachine(true);
  };

  const handleCancelEditMachine = () => {
    setEditForm(buildEditForm(selectedMachine || {}));
    setEditError("");
    setIsEditingMachine(false);
  };

  const handleSaveMachine = async () => {
    if (!activeMachineId) return;
    const name = String(editForm.name || "").trim();
    if (!name) {
      setEditError("Machine name is required.");
      return;
    }

    setIsSavingMachine(true);
    setEditError("");
    try {
      const db = firebase.firestore();
      const updatePayload = {
        name,
        local: String(editForm.local || "").trim(),
        OEM: String(editForm.OEM || "").trim(),
        oem: String(editForm.OEM || "").trim(),
        Modality: String(editForm.Modality || "").trim(),
        modality: String(editForm.Modality || "").trim(),
        Model: String(editForm.Model || "").trim(),
        model: String(editForm.Model || "").trim(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      if (editForm.lastPM) {
        updatePayload.lastPM = editForm.lastPM;
      } else {
        updatePayload.lastPM = firebase.firestore.FieldValue.delete();
      }
      if (editForm.nextPM) {
        updatePayload.nextPM = editForm.nextPM;
      } else {
        updatePayload.nextPM = firebase.firestore.FieldValue.delete();
      }

      await db.collection("Machine").doc(activeMachineId).set(updatePayload, {
        merge: true,
      });

      setSelectedMachine((prev) => ({
        ...(prev || {}),
        id: activeMachineId,
        name: updatePayload.name,
        local: updatePayload.local,
        OEM: updatePayload.OEM,
        oem: updatePayload.oem,
        Modality: updatePayload.Modality,
        modality: updatePayload.modality,
        Model: updatePayload.Model,
        model: updatePayload.model,
        lastPM: editForm.lastPM || null,
        nextPM: editForm.nextPM || null,
      }));
      setIsEditingMachine(false);
    } catch (error) {
      console.error("Error saving machine:", error);
      setEditError("Failed to save machine.");
    } finally {
      setIsSavingMachine(false);
    }
  };

  const handleDragStart = (partId) => (event) => {
    if (event.target.closest("button")) {
      event.preventDefault();
      return;
    }
    setDragIndex(partId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", partId || "");
  };

  const handleDragOver = (partId) => (event) => {
    event.preventDefault();
    if (dragOverIndex !== partId) setDragOverIndex(partId);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (partId) => (event) => {
    event.preventDefault();
    if (dragIndex == null || dragIndex === partId) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    setAssociatedPartsByRole((prev) => {
      const next = [...(prev[associatedPartsGroup] || [])];
      const fromIndex = next.findIndex((part) => part.id === dragIndex);
      const toIndex = next.findIndex((part) => part.id === partId);
      if (fromIndex < 0 || toIndex < 0) return prev;
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return { ...prev, [associatedPartsGroup]: next };
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
          <Link
            href="/NewSearch/mainSearch"
            className={styles.brand}
            aria-label="Go to Main Search">

            <img src="/magmo-logo.png" alt="Magmo" className={styles.brandLogo} />
            <div>
              <div className={styles.brandName}>Magmo</div>
              <div className={styles.brandSub}>Machine Detail</div>
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
            <div className={styles.cardHeaderActions}>
              {selectedMachine && isAdminUser && !isEditingMachine && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleStartEditMachine}
                >
                  Edit Machine
                </Button>
              )}
              <div className={styles.cardMeta}>
                {associatedPartsForView.length} of {associatedPartTotal} parts
              </div>
            </div>
          </div>
          <div className={styles.cardBody}>
            {error && !selectedMachine && (
              <Alert variant="danger">{error}</Alert>
            )}
            {selectedMachine ? (
              <>
                <div className={styles.machineGrid}>
                  {isEditingMachine ? (
                    <div className={styles.editPanel}>
                      {editError && <Alert variant="danger">{editError}</Alert>}
                      <div className={styles.editGrid}>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            value={editForm.name}
                            onChange={handleEditFieldChange("name")}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            value={editForm.local}
                            onChange={handleEditFieldChange("local")}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>OEM</Form.Label>
                          <Form.Control
                            value={editForm.OEM}
                            onChange={handleEditFieldChange("OEM")}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Modality</Form.Label>
                          <Form.Control
                            value={editForm.Modality}
                            onChange={handleEditFieldChange("Modality")}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Model</Form.Label>
                          <Form.Control
                            value={editForm.Model}
                            onChange={handleEditFieldChange("Model")}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Last PM</Form.Label>
                          <Form.Control
                            type="date"
                            value={editForm.lastPM}
                            onChange={handleEditFieldChange("lastPM")}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Next PM</Form.Label>
                          <Form.Control
                            type="date"
                            value={editForm.nextPM}
                            onChange={handleEditFieldChange("nextPM")}
                          />
                        </Form.Group>
                      </div>
                      <div className={styles.editActions}>
                        <Button
                          variant="secondary"
                          onClick={handleCancelEditMachine}
                          disabled={isSavingMachine}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleSaveMachine}
                          disabled={isSavingMachine}
                        >
                          {isSavingMachine ? "Saving..." : "Save Machine"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.machineInfo}>
                        <div className={styles.machineName}>
                          {selectedMachine.name || "Unnamed Machine"}
                        </div>
                        <div className={styles.machineMetaRow}>
                          <span>OEM: {selectedMachine.OEM || "N/A"}</span>
                          <span>
                            Modality: {selectedMachine.Modality || "N/A"}
                          </span>
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
                    </>
                  )}
                </div>

                <div className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    <div>
                      <div>Associated Parts</div>
                      <span className={styles.tableHint}>
                        Click + hold to move
                      </span>
                    </div>
                    <div className={styles.partToggle} role="group" aria-label="Associated parts group">
                      <button
                        type="button"
                        className={`${styles.partToggleButton} ${
                          associatedPartsGroup === "current"
                            ? styles.partToggleActive
                            : ""
                        }`}
                        onClick={() => setAssociatedPartsGroup("current")}
                      >
                        Current ({associatedPartCounts.current})
                      </button>
                      <button
                        type="button"
                        className={`${styles.partToggleButton} ${
                          associatedPartsGroup === "from"
                            ? styles.partToggleActive
                            : ""
                        }`}
                        onClick={() => setAssociatedPartsGroup("from")}
                      >
                        From ({associatedPartCounts.from})
                      </button>
                    </div>
                  </div>
                  {associatedPartsError && (
                    <Alert variant="danger" className={styles.printAlert}>
                      {associatedPartsError}
                    </Alert>
                  )}
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
                        {associatedPartsLoading &&
                          associatedPartsForView.length === 0 && (
                            <tr>
                              <td colSpan={6} className={styles.emptyState}>
                                Loading associated parts...
                              </td>
                            </tr>
                          )}
                        {!associatedPartsLoading &&
                          associatedPartsError &&
                          associatedPartsForView.length === 0 && (
                            <tr>
                              <td colSpan={6} className={styles.emptyState}>
                                {associatedPartsError}
                              </td>
                            </tr>
                          )}
                        {!associatedPartsLoading &&
                          !associatedPartsError &&
                          associatedPartsForView.length === 0 && (
                          <tr>
                            <td colSpan={6} className={styles.emptyState}>
                              No associated parts found.
                            </td>
                          </tr>
                          )}
                        {associatedPartsForView.map((part) => (
                          <tr
                            key={part.id}
                            draggable
                            onDragStart={handleDragStart(part.id)}
                            onDragOver={handleDragOver(part.id)}
                            onDrop={handleDrop(part.id)}
                            onDragEnd={handleDragEnd}
                            className={`${styles.draggableRow} ${
                              dragIndex === part.id ? styles.dragging : ""
                            } ${
                              dragOverIndex === part.id && dragIndex !== part.id
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
                  {printError && (
                    <Alert variant="danger" className={styles.printAlert}>
                      {printError}
                    </Alert>
                  )}
                  <div className={styles.tableActions}>
                    <Button
                      variant="secondary"
                      className={styles.actionButton}
                      onClick={() => handlePrintMulti("from")}
                      disabled={
                        Boolean(isPrinting) ||
                        associatedPartsLoading ||
                        Boolean(associatedPartsError) ||
                        !associatedPartCounts.from
                      }
                    >
                      {isPrinting === "from"
                        ? "Printing From..."
                        : `Print All From (${associatedPartCounts.from})`}
                    </Button>
                    <Button
                      variant="secondary"
                      className={styles.actionButton}
                      onClick={() => handlePrintMulti("current")}
                      disabled={
                        Boolean(isPrinting) ||
                        associatedPartsLoading ||
                        Boolean(associatedPartsError) ||
                        !associatedPartCounts.current
                      }
                    >
                      {isPrinting === "current"
                        ? "Printing Current..."
                        : `Print All Current (${associatedPartCounts.current})`}
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
            const partId = getRefId(partRef);
            return partId
              ? adminDb.collection("Test").doc(partId).get()
              : null;
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
              machineFromId: getRefId(
                firstEntityRoleValue(data, "machine", "from")
              ),
              machineCurrentId: getRefId(
                firstEntityRoleValue(data, "machine", "current")
              ),
            };
          })
        );

        const groupedParts = groupAssociatedParts(
          associatedParts.filter(Boolean),
          "machine",
          id
        );
        associatedParts = Array.from(
          new Map(
            [...groupedParts.from, ...groupedParts.current].map((part) => [
              part.id,
              part,
            ])
          ).values()
        );
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
      associatedParts: Array.isArray(machineData.associatedParts)
        ? machineData.associatedParts.map(getRefId).filter(Boolean)
        : [],
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
