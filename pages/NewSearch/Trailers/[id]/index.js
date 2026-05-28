import React, { useCallback, useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert, Button, Form, Spinner, Table } from "react-bootstrap";
import firebase from "../../../../context/Firebase";
import LoggedIn from "../../../LoggedIn";
import { fetchClients } from "../../../../utils/fetchAssociations";
import {
  fetchAssociatedPartsForMachine,
  formatPartDate,
} from "../../../../utils/fetchAssociatedPartsForMachine";
import styles from "../TrailerDetail.module.css";

const TRAILER_CLIENT_ID = "AIS62854";
const SOCAL_CLIENT_ID = "AIS17182";
const SOCAL_LOCATION_NAME = "socal";
const DEFAULT_RETURN_TO = "/NewSearch/mainSearch?showTrailerMap=1";

function decodeReturnTo(value) {
  if (!value) return DEFAULT_RETURN_TO;
  try {
    return decodeURIComponent(String(value));
  } catch (error) {
    return String(value);
  }
}

function getRefId(refValue) {
  if (!refValue) return "";
  if (typeof refValue === "string") return refValue;
  if (refValue?.id) return refValue.id;
  return "";
}

async function resolveMachineDoc(db, machineRef) {
  if (!machineRef) return null;
  if (typeof machineRef.get === "function") {
    const doc = await machineRef.get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }
  const machineId = getRefId(machineRef);
  if (!machineId) return null;
  const doc = await db.collection("Machine").doc(machineId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export default function TrailerDetailPage() {
  const router = useRouter();
  const trailerId = useMemo(() => {
    if (!router.isReady) return "";
    return String(router.query.id || "").trim();
  }, [router.isReady, router.query.id]);
  const returnTo = useMemo(
    () => decodeReturnTo(router.query.returnTo),
    [router.query.returnTo]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [machineOptions, setMachineOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [associatedParts, setAssociatedParts] = useState([]);
  const [partsLoading, setPartsLoading] = useState(false);
  const [partsError, setPartsError] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [originalTrailerName, setOriginalTrailerName] = useState("");
  const [mondayBoardId, setMondayBoardId] = useState("");

  const [form, setForm] = useState({
    name: "",
    locationFromId: "",
    locationCurrentId: SOCAL_CLIENT_ID,
    model: "",
    vin: "",
    associatedMachineId: "",
  });

  const handleBack = useCallback(() => {
    router.push(returnTo || DEFAULT_RETURN_TO);
  }, [returnTo, router]);

  useEffect(() => {
    if (!router.isReady || !returnTo) return;
    router.beforePopState(() => {
      router.push(returnTo);
      return false;
    });
    return () => {
      router.beforePopState(() => true);
    };
  }, [router, router.isReady, returnTo]);

  useEffect(() => {
    if (!router.isReady || !trailerId) return;

    let cancelled = false;
    const loadData = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const db = firebase.firestore();
        const [trailerDoc, clientDoc, clientsData] = await Promise.all([
          db.collection("Trailers").doc(trailerId).get(),
          db.collection("Client").doc(TRAILER_CLIENT_ID).get(),
          fetchClients(),
        ]);

        const trailerData = trailerDoc.exists ? trailerDoc.data() || {} : {};
        const currentMachineId =
          String(trailerData.associatedMachineId || "").trim() ||
          getRefId(trailerData.associatedMachine);

        if (!cancelled) {
          const loadedName =
            String(trailerData.name || "").trim() ||
            String(trailerData.mondayBoardName || "").trim() ||
            trailerId;
          setForm({
            name: loadedName,
            locationFromId: String(trailerData.locationFromId || "").trim(),
            locationCurrentId:
              String(trailerData.locationCurrentId || "").trim() ||
              SOCAL_CLIENT_ID,
            model: String(trailerData.model || "").trim(),
            vin: String(trailerData.vin || "").trim(),
            associatedMachineId: currentMachineId,
          });
          setOriginalTrailerName(loadedName);
          setMondayBoardId(String(trailerData.mondayBoardId || "").trim());
        }

        const machineRefs = Array.isArray(clientDoc.data()?.machines)
          ? clientDoc.data().machines
          : [];
        const machineDocs = await Promise.all(
          machineRefs.map((machineRef) => resolveMachineDoc(db, machineRef))
        );
        const uniqueMachines = [];
        const seen = new Set();
        machineDocs.forEach((machine) => {
          if (!machine?.id) return;
          if (seen.has(machine.id)) return;
          seen.add(machine.id);
          uniqueMachines.push(machine);
        });
        uniqueMachines.sort((a, b) => {
          const nameA = String(a.name || "").toLowerCase();
          const nameB = String(b.name || "").toLowerCase();
          if (nameA !== nameB) return nameA.localeCompare(nameB);
          return a.id.localeCompare(b.id);
        });

        if (!cancelled) {
          setMachineOptions(uniqueMachines);
          const normalizedClients = Array.isArray(clientsData)
            ? [...clientsData]
                .map((client) => ({
                  id: client?.id || "",
                  name: String(client?.name || "").trim(),
                }))
                .filter((client) => client.id)
                .sort((a, b) => a.name.localeCompare(b.name))
            : [];
          setClientOptions(normalizedClients);
        }
      } catch (error) {
        console.error("Failed to load trailer detail", error);
        if (!cancelled) {
          setLoadError("Failed to load trailer details.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, trailerId]);

  const handleFieldChange = (field) => (event) => {
    const value = event?.target?.value ?? "";
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaveError("");
    setSaveSuccess("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!trailerId) return;
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess("");
    try {
      const db = firebase.firestore();
      const associatedMachineId = String(form.associatedMachineId || "").trim();
      const nextName = String(form.name || "").trim();
      const locationFromId = String(form.locationFromId || "").trim();
      const locationCurrentId =
        String(form.locationCurrentId || "").trim() || SOCAL_CLIENT_ID;
      const fromClient = clientOptions.find((client) => client.id === locationFromId);
      const currentClient = clientOptions.find(
        (client) => client.id === locationCurrentId
      );
      const locationFromName = String(fromClient?.name || "").trim();
      const locationCurrentName =
        String(currentClient?.name || "").trim() || SOCAL_LOCATION_NAME;

      if (mondayBoardId && nextName && nextName !== originalTrailerName) {
        const idToken = await firebase.auth().currentUser?.getIdToken();
        const response = await fetch("/api/monday/rename-trailer-board", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
          body: JSON.stringify({ boardId: mondayBoardId, name: nextName }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload?.error || "Failed to update Monday board name.");
        }
      }

      const payload = {
        name: nextName,
        locationFromId,
        locationFromName,
        locationCurrentId,
        locationCurrentName,
        locationFrom: locationFromName,
        locationCurrent: locationCurrentName,
        location: locationCurrentName,
        model: String(form.model || "").trim(),
        vin: String(form.vin || "").trim(),
        associatedMachineId,
        associatedMachine: associatedMachineId
          ? db.collection("Machine").doc(associatedMachineId)
          : null,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      if (mondayBoardId) {
        payload.mondayBoardId = mondayBoardId;
        payload.mondayBoardName = nextName;
      }

      await db.collection("Trailers").doc(trailerId).set(payload, { merge: true });
      setOriginalTrailerName(nextName);
      setSaveSuccess("Trailer saved.");
    } catch (error) {
      console.error("Failed to save trailer", error);
      setSaveError(error?.message || "Failed to save trailer.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const machineId = String(form.associatedMachineId || "").trim();
    if (!machineId) {
      setAssociatedParts([]);
      setPartsError("");
      setPartsLoading(false);
      return undefined;
    }

    let cancelled = false;
    const loadAssociatedParts = async () => {
      setPartsLoading(true);
      setPartsError("");
      try {
        const parts = await fetchAssociatedPartsForMachine(machineId);
        if (!cancelled) {
          setAssociatedParts(parts);
        }
      } catch (error) {
        console.error("Failed to load associated machine items", error);
        if (!cancelled) {
          setPartsError("Failed to load associated machine items.");
          setAssociatedParts([]);
        }
      } finally {
        if (!cancelled) {
          setPartsLoading(false);
        }
      }
    };

    loadAssociatedParts();
    return () => {
      cancelled = true;
    };
  }, [form.associatedMachineId]);

  const handleSelectPart = useCallback(
    (itemId) => {
      if (!itemId) return;
      router.push(`/NewSearch/item/${itemId}`);
    },
    [router]
  );

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

  return (
    <LoggedIn>
      <div className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>{trailerId || "Trailer Detail"}</h1>
              <div className={styles.subtitle}>
                Edit trailer fields and associated machine.
              </div>
            </div>
            <Button variant="outline-secondary" onClick={handleBack}>
              Back
            </Button>
          </header>

          <section className={styles.card}>
            {isLoading && (
              <div className={styles.loadingRow}>
                <Spinner animation="border" size="sm" />
                <span>Loading trailer...</span>
              </div>
            )}
            {loadError && <Alert variant="danger">{loadError}</Alert>}
            {saveError && <Alert variant="danger">{saveError}</Alert>}
            {saveSuccess && <Alert variant="success">{saveSuccess}</Alert>}

            {!isLoading && !loadError && (
              <Form onSubmit={handleSave} className={styles.form}>
                <Form.Group controlId="trailer-id">
                  <Form.Label>Trailer ID</Form.Label>
                  <Form.Control value={trailerId} readOnly />
                </Form.Group>

                <Form.Group controlId="trailer-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={form.name}
                    onChange={handleFieldChange("name")}
                    placeholder="Trailer name"
                  />
                </Form.Group>

                <Form.Group controlId="trailer-location-from">
                  <Form.Label>Location From</Form.Label>
                  <Form.Control
                    as="select"
                    value={form.locationFromId}
                    onChange={handleFieldChange("locationFromId")}
                  >
                    <option value="">None selected</option>
                    {clientOptions.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name || client.id}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="trailer-location-current">
                  <Form.Label>Location Current</Form.Label>
                  <Form.Control
                    as="select"
                    value={form.locationCurrentId || SOCAL_CLIENT_ID}
                    onChange={handleFieldChange("locationCurrentId")}
                  >
                    {!clientOptions.some((client) => client.id === SOCAL_CLIENT_ID) && (
                      <option value={SOCAL_CLIENT_ID}>socal</option>
                    )}
                    {clientOptions.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name || client.id}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="trailer-model">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    value={form.model}
                    onChange={handleFieldChange("model")}
                    placeholder="Model"
                  />
                </Form.Group>

                <Form.Group controlId="trailer-vin">
                  <Form.Label>VIN</Form.Label>
                  <Form.Control
                    value={form.vin}
                    onChange={handleFieldChange("vin")}
                    placeholder="VIN"
                  />
                </Form.Group>

                <Form.Group controlId="trailer-associated-machine">
                  <Form.Label>Associated Machine</Form.Label>
                  <Form.Control
                    as="select"
                    value={form.associatedMachineId}
                    onChange={handleFieldChange("associatedMachineId")}
                  >
                    <option value="">None selected</option>
                    {machineOptions.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.id} - {machine.name || "Unnamed Machine"}
                      </option>
                    ))}
                  </Form.Control>
                  <div className={styles.helperText}>
                    Machines are loaded from{" "}
                    <Link href="/NewSearch/client/AIS62854">
                      <a>AIS Trailers client</a>
                    </Link>
                    .
                  </div>
                </Form.Group>

                <div className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    Associated Parts
                    <span className={styles.tableHint}>Click + hold to move</span>
                  </div>
                  <div className={styles.tableWrap}>
                    <Table striped bordered hover size="sm" className={styles.table}>
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
                        {!form.associatedMachineId && (
                          <tr>
                            <td colSpan={6} className={styles.emptyState}>
                              Select an associated machine to view its items.
                            </td>
                          </tr>
                        )}
                        {form.associatedMachineId && partsLoading && (
                          <tr>
                            <td colSpan={6} className={styles.emptyState}>
                              Loading associated parts...
                            </td>
                          </tr>
                        )}
                        {form.associatedMachineId && !partsLoading && partsError && (
                          <tr>
                            <td colSpan={6} className={styles.emptyState}>
                              {partsError}
                            </td>
                          </tr>
                        )}
                        {form.associatedMachineId &&
                          !partsLoading &&
                          !partsError &&
                          associatedParts.length === 0 && (
                            <tr>
                              <td colSpan={6} className={styles.emptyState}>
                                No associated parts found.
                              </td>
                            </tr>
                          )}
                        {form.associatedMachineId &&
                          !partsLoading &&
                          !partsError &&
                          associatedParts.map((part, index) => (
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
                              <td>{formatPartDate(part.date)}</td>
                              <td>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleSelectPart(part.id)}
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </div>

                <div className={styles.actions}>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={handleBack}
                  >
                    Back To Main Search
                  </Button>
                </div>
              </Form>
            )}
          </section>
        </div>
      </div>
    </LoggedIn>
  );
}
