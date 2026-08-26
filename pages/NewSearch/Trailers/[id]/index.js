import React, { useCallback, useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import firebase from "../../../../context/Firebase";
import LoggedIn from "../../../LoggedIn";
import { fetchClients } from "../../../../utils/fetchAssociations";
import {
  fetchAssociatedPartsForMachine,
  formatPartDate,
} from "../../../../utils/fetchAssociatedPartsForMachine";
import { resolveAssociatedPartForPrint } from "../../../../utils/resolveAssociatedPartForPrint";
import {
  HELIUM_REFRESH_MS,
  loadTrailerHeliumIndex,
} from "../../../../utils/trailerHelium";
import TrailerHeliumStatus from "../../../../components/TrailerHeliumStatus";
import TrailerProvenanceBadge from "../../../../components/TrailerProvenanceBadge";
import {
  manualTrailerProvenance,
  normalizeTrailerProvenance,
} from "../../../../utils/trailerProvenance";
import styles from "../TrailerDetail.module.css";
const {
  clientLocation,
  resolveClientRecord,
} = require("../../../../lib/ops/trailerClientLinks.cjs");

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

function getClientLocationText(client) {
  return clientLocation(client);
}

function resolveClientSelection(clients, clientId, clientName) {
  return resolveClientRecord(clients, clientId, clientName);
}

function toDateInputValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString().slice(0, 10);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? ""
    : parsed.toISOString().slice(0, 10);
}

function sortLocationHistory(entries = []) {
  return [...entries].sort((a, b) => {
    const aTime = new Date(a.arrivalDate || "").getTime() || 0;
    const bTime = new Date(b.arrivalDate || "").getTime() || 0;
    return bTime - aTime;
  });
}

function currentLocationSignature(value = {}) {
  return JSON.stringify({
    clientId: String(value.locationCurrentId || "").trim(),
    name: String(value.currentName || "").trim(),
    address: String(value.currentClientLocation || "").trim(),
    arrivalDate: String(value.currentArrivalDate || "").trim(),
    departureDate: String(value.currentDepartureDate || "").trim(),
  });
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
  const [printError, setPrintError] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintSuccess, setShowPrintSuccess] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [originalTrailerName, setOriginalTrailerName] = useState("");
  const [mondayBoardId, setMondayBoardId] = useState("");
  const [locationHistory, setLocationHistory] = useState([]);
  const [currentProvenance, setCurrentProvenance] = useState(null);
  const [loadedCurrentLocationSignature, setLoadedCurrentLocationSignature] =
    useState("");
  const [loadedCurrentClientId, setLoadedCurrentClientId] = useState("");
  const [loadedAssociatedMachineId, setLoadedAssociatedMachineId] = useState("");
  const [isShiftingLocation, setIsShiftingLocation] = useState(false);
  const [heliumTelemetry, setHeliumTelemetry] = useState(null);

  const [form, setForm] = useState({
    name: "",
    locationFromId: "",
    locationCurrentId: "",
    currentName: "",
    currentClientLocation: "",
    locationNextId: "",
    nextName: "",
    nextClientLocation: "",
    currentArrivalDate: "",
    currentDepartureDate: "",
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
        const [trailerDoc, clientsData, machinesSnapshot] = await Promise.all([
          db.collection("Trailers").doc(trailerId).get(),
          fetchClients(),
          db.collection("Machine").get(),
        ]);

        const trailerData = trailerDoc.exists ? trailerDoc.data() || {} : {};
        const normalizedClients = Array.isArray(clientsData)
          ? [...clientsData]
              .map((client) => ({
                ...client,
                id: client?.id || "",
                name: String(client?.name || "").trim(),
              }))
              .filter((client) => client.id)
              .sort((a, b) => a.name.localeCompare(b.name))
          : [];
        const currentMachineId =
          String(trailerData.associatedMachineId || "").trim() ||
          getRefId(trailerData.associatedMachine);

        if (!cancelled) {
          const loadedName =
            String(trailerData.name || "").trim() ||
            String(trailerData.mondayBoardName || "").trim() ||
            trailerId;
          const storedCurrentClientId =
            getRefId(trailerData.currentClient) ||
            String(
              trailerData.currentClientId || trailerData.locationCurrentId || ""
            ).trim();
          const storedCurrentName = String(
            trailerData.locationCurrentName ||
              trailerData.locationCurrent ||
              trailerData.location ||
              ""
          ).trim();
          const resolvedCurrentClient = resolveClientSelection(
            normalizedClients,
            storedCurrentClientId,
            storedCurrentName
          );
          const storedNextClientId =
            getRefId(trailerData.nextClient) ||
            String(trailerData.nextClientId || trailerData.locationNextId || "").trim();
          const storedNextName = String(
            trailerData.locationNextName || trailerData.locationNext || ""
          ).trim();
          const resolvedNextClient = resolveClientSelection(
            normalizedClients,
            storedNextClientId,
            storedNextName
          );
          const loadedForm = {
            name: loadedName,
            locationFromId: String(trailerData.locationFromId || "").trim(),
            locationCurrentId: resolvedCurrentClient?.id || storedCurrentClientId,
            currentName: resolvedCurrentClient?.name || storedCurrentName,
            currentClientLocation:
              getClientLocationText(resolvedCurrentClient) ||
              String(trailerData.locationCurrentClientLocation || "").trim(),
            locationNextId: resolvedNextClient?.id || storedNextClientId,
            nextName: resolvedNextClient?.name || storedNextName,
            nextClientLocation:
              getClientLocationText(resolvedNextClient) ||
              String(trailerData.locationNextClientLocation || "").trim(),
            currentArrivalDate: toDateInputValue(
              trailerData.locationCurrentArrivalDate ||
                trailerData.currentLocationArrivalDate
            ),
            currentDepartureDate: toDateInputValue(
              trailerData.locationCurrentDepartureDate ||
                trailerData.currentLocationDepartureDate
            ),
            model: String(trailerData.model || "").trim(),
            vin: String(trailerData.vin || "").trim(),
            associatedMachineId: currentMachineId,
          };
          setForm(loadedForm);
          setCurrentProvenance(
            normalizeTrailerProvenance(trailerData.locationCurrentProvenance)
          );
          setLoadedCurrentLocationSignature(currentLocationSignature(loadedForm));
          setLoadedCurrentClientId(loadedForm.locationCurrentId || "");
          setLoadedAssociatedMachineId(currentMachineId || "");
          setLocationHistory(
            sortLocationHistory(
              Array.isArray(trailerData.locationHistory)
                ? trailerData.locationHistory.map((entry) => {
                    const clientId =
                      getRefId(entry?.client) || String(entry?.clientId || "").trim();
                    const nameSnapshot = String(
                      entry?.clientNameSnapshot || entry?.clientName || ""
                    ).trim();
                    const locationSnapshot = String(
                      entry?.clientLocationSnapshot || entry?.clientLocation || ""
                    ).trim();
                    const client = resolveClientSelection(
                      normalizedClients,
                      clientId,
                      nameSnapshot
                    );
                    return {
                      clientId: client?.id || clientId,
                      clientName: client?.name || nameSnapshot,
                      clientLocation:
                        getClientLocationText(client) || locationSnapshot,
                      clientNameSnapshot: nameSnapshot,
                      clientLocationSnapshot: locationSnapshot,
                      arrivalDate: toDateInputValue(entry?.arrivalDate),
                      departureDate: toDateInputValue(entry?.departureDate),
                      provenance: normalizeTrailerProvenance(entry?.provenance),
                    };
                  })
                : []
            )
          );
          setOriginalTrailerName(loadedName);
          setMondayBoardId(String(trailerData.mondayBoardId || "").trim());
        }

        const machineDocs = machinesSnapshot.docs.map((machineDocument) => {
          const data = machineDocument.data() || {};
          return {
            id: machineDocument.id,
            name: String(data.name || "").trim(),
          };
        });
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

  useEffect(() => {
    if (!router.isReady || !trailerId) return undefined;
    let cancelled = false;

    const loadHelium = async () => {
      try {
        const index = await loadTrailerHeliumIndex(firebase);
        if (!cancelled) setHeliumTelemetry(index[trailerId.toUpperCase()] || null);
      } catch (error) {
        console.error("Failed to load trailer helium telemetry", error);
        if (!cancelled) setHeliumTelemetry(null);
      }
    };

    loadHelium();
    const timer = window.setInterval(loadHelium, HELIUM_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [router.isReady, trailerId]);

  const handleFieldChange = (field) => (event) => {
    const value = event?.target?.value ?? "";
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaveError("");
    setSaveSuccess("");
  };

  const syncTrailerClientLink = async ({
    clientId,
    associatedMachineId,
    expectedClientId,
  }) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      throw new Error("You must be signed in to change a trailer/client link.");
    }
    const token = await currentUser.getIdToken(true);
    const response = await fetch("/api/trailers/link-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        trailerId,
        clientId: String(clientId || "").trim(),
        expectedClientId: String(expectedClientId || "").trim(),
        associatedMachineId: String(associatedMachineId || "").trim(),
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        result.error || "Failed to synchronize the trailer/client link."
      );
    }
    return result;
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
      const locationCurrentId = String(form.locationCurrentId || "").trim();
      const locationNextId = String(form.locationNextId || "").trim();
      const fromClient = clientOptions.find((client) => client.id === locationFromId);
      const currentClient = resolveClientSelection(
        clientOptions,
        locationCurrentId,
        form.currentName
      );
      const nextClient = resolveClientSelection(
        clientOptions,
        locationNextId,
        form.nextName
      );
      if (!currentClient) {
        throw new Error(
          "Select the current client from the Client DB before saving this trailer."
        );
      }
      if (locationNextId && !nextClient) {
        throw new Error("Select a valid destination from the Client DB.");
      }
      if (
        locationHistory.some(
          (entry) =>
            (entry.clientName ||
              entry.clientLocation ||
              entry.arrivalDate ||
              entry.departureDate) &&
            !resolveClientSelection(clientOptions, entry.clientId, "")
        )
      ) {
        throw new Error(
          "Link every previous location to a Client DB record before saving the timeline."
        );
      }
      const locationFromName = String(fromClient?.name || "").trim();
      const locationCurrentName =
        String(currentClient?.name || form.currentName || "Unknown").trim();
      const locationCurrentClientLocation = String(
        getClientLocationText(currentClient) ||
          form.currentClientLocation ||
          "Unknown"
      ).trim();
      const locationNextName = String(
        nextClient?.name || form.nextName || ""
      ).trim();
      const locationNextClientLocation = String(
        getClientLocationText(nextClient) || form.nextClientLocation || ""
      ).trim();
      const cleanHistory = sortLocationHistory(
        locationHistory
          .map((entry) => {
            const client = resolveClientSelection(
              clientOptions,
              entry.clientId,
              entry.clientName
            );
            return {
              clientId: String(client?.id || entry.clientId || "").trim(),
              client: client?.id
                ? db.collection("Client").doc(client.id)
                : null,
              clientName: String(
                client?.name || entry.clientName || ""
              ).trim(),
              clientLocation: String(
                getClientLocationText(client) || entry.clientLocation || ""
              ).trim(),
              clientNameSnapshot: String(
                entry.clientNameSnapshot || entry.clientName || client?.name || ""
              ).trim(),
              clientLocationSnapshot: String(
                entry.clientLocationSnapshot ||
                  entry.clientLocation ||
                  getClientLocationText(client) ||
                  ""
              ).trim(),
              arrivalDate: String(entry.arrivalDate || "").trim(),
              departureDate: String(entry.departureDate || "").trim(),
              provenance:
                normalizeTrailerProvenance(entry.provenance) ||
                manualTrailerProvenance(
                  firebase.auth().currentUser,
                  "Trailer location timeline saved in Magmo"
                ),
            };
          })
          .filter(
            (entry) =>
              entry.clientId ||
              entry.clientName ||
              entry.clientLocation ||
              entry.arrivalDate ||
              entry.departureDate
          )
      );

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

      const nextCurrentClientId = String(
        currentClient?.id || locationCurrentId || ""
      ).trim();
      if (
        nextCurrentClientId !== loadedCurrentClientId ||
        associatedMachineId !== loadedAssociatedMachineId
      ) {
        await syncTrailerClientLink({
          clientId: nextCurrentClientId,
          associatedMachineId,
          expectedClientId: loadedCurrentClientId,
        });
      }

      const normalizedCurrentForm = {
        locationCurrentId: String(currentClient?.id || locationCurrentId || ""),
        currentName: locationCurrentName,
        currentClientLocation: locationCurrentClientLocation,
        currentArrivalDate: form.currentArrivalDate || "",
        currentDepartureDate: form.currentDepartureDate || "",
      };
      const nextCurrentProvenance =
        currentLocationSignature(normalizedCurrentForm) !==
        loadedCurrentLocationSignature
          ? manualTrailerProvenance(
              firebase.auth().currentUser,
              "Current trailer location edited in Magmo"
            )
          : currentProvenance;
      const payload = {
        name: nextName,
        locationFromId,
        locationFromName,
        locationCurrentId: String(currentClient?.id || locationCurrentId || ""),
        currentClientId: String(currentClient?.id || locationCurrentId || ""),
        currentClient: currentClient?.id
          ? db.collection("Client").doc(currentClient.id)
          : null,
        locationCurrentName,
        locationCurrentClientLocation,
        locationNextId: String(nextClient?.id || locationNextId || ""),
        nextClientId: String(nextClient?.id || locationNextId || ""),
        nextClient: nextClient?.id
          ? db.collection("Client").doc(nextClient.id)
          : null,
        locationNextName,
        locationNextClientLocation,
        locationNext: locationNextName,
        locationCurrentArrivalDate: form.currentArrivalDate || "",
        locationCurrentDepartureDate: form.currentDepartureDate || "",
        locationCurrentProvenance: nextCurrentProvenance,
        locationFrom: locationFromName,
        locationCurrent: locationCurrentName,
        location: locationCurrentName,
        locationHistory: cleanHistory,
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
      setForm((prev) => ({
        ...prev,
        locationCurrentId: String(currentClient?.id || locationCurrentId || ""),
        currentName: locationCurrentName,
        currentClientLocation: locationCurrentClientLocation,
        locationNextId: String(nextClient?.id || locationNextId || ""),
        nextName: locationNextName,
        nextClientLocation: locationNextClientLocation,
      }));
      setLocationHistory(cleanHistory);
      setCurrentProvenance(nextCurrentProvenance);
      setLoadedCurrentLocationSignature(
        currentLocationSignature(normalizedCurrentForm)
      );
      setOriginalTrailerName(nextName);
      setLoadedCurrentClientId(nextCurrentClientId);
      setLoadedAssociatedMachineId(associatedMachineId);
      setSaveSuccess("Trailer and location timeline saved.");
    } catch (error) {
      console.error("Failed to save trailer", error);
      setSaveError(error?.message || "Failed to save trailer.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShiftLocation = async () => {
    if (!trailerId) return;
    const nextClientId = String(form.locationNextId || "").trim();
    const requestedNextName = String(form.nextName || "").trim();
    if (!nextClientId) {
      setSaveError("Select a destination from the Client DB before moving the trailer.");
      setSaveSuccess("");
      return;
    }

    const currentClientId = String(form.locationCurrentId || "").trim();
    const currentClient = resolveClientSelection(
      clientOptions,
      currentClientId,
      form.currentName
    );
    const nextClient = resolveClientSelection(
      clientOptions,
      nextClientId,
      requestedNextName
    );
    if (!currentClient || !nextClient) {
      setSaveError(
        !currentClient
          ? "Link the current stay to a Client DB record before moving the trailer."
          : "Select a valid destination from the Client DB."
      );
      setSaveSuccess("");
      return;
    }
    const currentClientName =
      String(currentClient?.name || form.currentName || "Unknown").trim();
    const nextClientName = String(
      nextClient?.name || requestedNextName || "Unknown"
    ).trim();
    const currentClientLocation = String(
      getClientLocationText(currentClient) ||
        form.currentClientLocation ||
        "Unknown"
    ).trim();
    const nextClientLocation = String(
      getClientLocationText(nextClient) || form.nextClientLocation || "Unknown"
    ).trim();
    const movementProvenance = manualTrailerProvenance(
      firebase.auth().currentUser,
      "Trailer moved manually in Magmo"
    );
    const currentHistoryEntry = {
      clientId: String(currentClient?.id || currentClientId || ""),
      client: firebase.firestore().collection("Client").doc(currentClient.id),
      clientName: currentClientName,
      clientLocation: currentClientLocation,
      clientNameSnapshot: currentClientName,
      clientLocationSnapshot: currentClientLocation,
      arrivalDate: String(form.currentArrivalDate || "").trim(),
      departureDate: String(form.currentDepartureDate || "").trim(),
      provenance: movementProvenance,
    };
    const cleanExistingHistory = locationHistory
      .map((entry) => {
        const client = resolveClientSelection(
          clientOptions,
          entry.clientId,
          entry.clientName
        );
        return {
          clientId: String(client?.id || entry.clientId || "").trim(),
          client: client?.id
            ? firebase.firestore().collection("Client").doc(client.id)
            : null,
          clientName: String(client?.name || entry.clientName || "").trim(),
          clientLocation: String(
            getClientLocationText(client) || entry.clientLocation || ""
          ).trim(),
          clientNameSnapshot: String(
            entry.clientNameSnapshot || entry.clientName || client?.name || ""
          ).trim(),
          clientLocationSnapshot: String(
            entry.clientLocationSnapshot ||
              entry.clientLocation ||
              getClientLocationText(client) ||
              ""
          ).trim(),
          arrivalDate: String(entry.arrivalDate || "").trim(),
          departureDate: String(entry.departureDate || "").trim(),
          provenance: normalizeTrailerProvenance(entry.provenance),
        };
      })
      .filter(
        (entry) =>
          entry.clientId ||
          entry.clientName ||
          entry.clientLocation ||
          entry.arrivalDate ||
          entry.departureDate
      );
    const nextHistory = sortLocationHistory([
      currentHistoryEntry,
      ...cleanExistingHistory,
    ]);

    setIsShiftingLocation(true);
    setSaveError("");
    setSaveSuccess("");
    try {
      await syncTrailerClientLink({
        clientId: String(nextClient?.id || nextClientId || ""),
        associatedMachineId: String(form.associatedMachineId || "").trim(),
        expectedClientId: loadedCurrentClientId || currentClientId,
      });
      await firebase.firestore().collection("Trailers").doc(trailerId).set(
        {
          locationFromId: String(currentClient?.id || currentClientId || ""),
          locationFromName: currentClientName,
          locationFrom: currentClientName,
          locationCurrentId: String(nextClient?.id || nextClientId || ""),
          currentClientId: String(nextClient?.id || nextClientId || ""),
          currentClient: firebase
            .firestore()
            .collection("Client")
            .doc(nextClient.id),
          locationCurrentName: nextClientName,
          locationCurrentClientLocation: nextClientLocation,
          locationCurrent: nextClientName,
          location: nextClientName,
          locationCurrentArrivalDate: "",
          locationCurrentDepartureDate: "",
          locationCurrentProvenance: movementProvenance,
          locationNextId: "",
          nextClientId: "",
          nextClient: null,
          locationNextName: "",
          locationNext: "",
          locationNextClientLocation: "",
          locationHistory: nextHistory,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      setForm((prev) => ({
        ...prev,
        locationFromId: String(currentClient?.id || currentClientId || ""),
        locationCurrentId: String(nextClient?.id || nextClientId || ""),
        currentName: nextClientName,
        currentClientLocation: nextClientLocation,
        locationNextId: "",
        nextName: "",
        nextClientLocation: "",
        currentArrivalDate: "",
        currentDepartureDate: "",
      }));
      setLocationHistory(nextHistory);
      setCurrentProvenance(movementProvenance);
      setLoadedCurrentClientId(String(nextClient?.id || nextClientId || ""));
      setLoadedAssociatedMachineId(String(form.associatedMachineId || "").trim());
      setLoadedCurrentLocationSignature(
        currentLocationSignature({
          locationCurrentId: String(nextClient?.id || nextClientId || ""),
          currentName: nextClientName,
          currentClientLocation: nextClientLocation,
          currentArrivalDate: "",
          currentDepartureDate: "",
        })
      );
      setSaveSuccess(
        `Moved to ${nextClientName}; ${currentClientName} was archived.`
      );
    } catch (error) {
      console.error("Failed to shift trailer location", error);
      setSaveError("Failed to shift trailer location.");
    } finally {
      setIsShiftingLocation(false);
    }
  };

  const handleLocationClientChange = (kind) => (event) => {
    const clientId = String(event?.target?.value || "").trim();
    const client = resolveClientSelection(clientOptions, clientId, "");
    setForm((prev) => ({
      ...prev,
      [kind === "current" ? "locationCurrentId" : "locationNextId"]:
        client?.id || "",
      [kind === "current" ? "currentName" : "nextName"]:
        client?.name || "",
      [kind === "current" ? "currentClientLocation" : "nextClientLocation"]:
        getClientLocationText(client),
    }));
    setSaveError("");
    setSaveSuccess("");
  };

  const handleLocationHistoryChange = (index, field, value) => {
    setLocationHistory((prev) =>
      prev.map((entry, entryIndex) => {
        if (entryIndex !== index) return entry;
        const provenance = manualTrailerProvenance(
          firebase.auth().currentUser,
          "Previous trailer location edited in Magmo"
        );
        if (field !== "clientId") {
          return { ...entry, [field]: value, provenance };
        }
        const client = resolveClientSelection(clientOptions, value, "");
        return {
          ...entry,
          clientId: client?.id || "",
          clientName: client?.name || "",
          clientLocation: getClientLocationText(client),
          clientNameSnapshot: client?.name || "",
          clientLocationSnapshot: getClientLocationText(client),
          provenance,
        };
      })
    );
    setSaveError("");
    setSaveSuccess("");
  };

  const handleAddLocationHistory = () => {
    setLocationHistory((prev) => [
      ...prev,
      {
        clientId: "",
        clientName: "",
        clientLocation: "",
        clientNameSnapshot: "",
        clientLocationSnapshot: "",
        arrivalDate: "",
        departureDate: "",
        provenance: manualTrailerProvenance(
          firebase.auth().currentUser,
          "Previous trailer location added in Magmo"
        ),
      },
    ]);
  };

  const handleRemoveLocationHistory = (index) => {
    setLocationHistory((prev) =>
      prev.filter((_, entryIndex) => entryIndex !== index)
    );
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
        const parts = await fetchAssociatedPartsForMachine(machineId, {
          role: "current",
        });
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

  const handlePrintAllItems = async () => {
    setIsPrinting(true);
    setPrintError("");
    try {
      const db = firebase.firestore();
      const resolvedItems = await Promise.all(
        associatedParts.map((part) => resolveAssociatedPartForPrint(db, part))
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
                .map(
                  (entry) =>
                    `${entry.url} => ${entry.status ?? entry.error}`
                )
                .join(" | ")
            : "");
        throw new Error(
          `${result?.error || `Print proxy failed (${response.status})`}${
            detail ? ` | ${detail}` : ""
          }`
        );
      }
      if (result?.status === "error") {
        throw new Error(result?.message || "Print failed.");
      }
      setShowPrintSuccess(true);
    } catch (error) {
      console.error("Error printing trailer items:", error);
      setPrintError(error?.message || "Error printing trailer items.");
    } finally {
      setIsPrinting(false);
    }
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

  return (
    <LoggedIn>
      <div className={styles.page}>
        {isPrinting && (
          <div className={styles.loadingOverlay} role="status" aria-live="polite">
            <img
              src="/magmo-logo.png"
              alt="Printing"
              className={styles.loadingLogo}
            />
            <span className={styles.visuallyHidden}>Printing all trailer items</span>
          </div>
        )}
        <Modal
          show={showPrintSuccess}
          onHide={() => setShowPrintSuccess(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Print Complete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            All trailer items were sent to the printer successfully.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowPrintSuccess(false)}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
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

                <TrailerHeliumStatus telemetry={heliumTelemetry} />

                <section className={styles.locationCard}>
                  <div className={styles.locationHeader}>
                    <div>
                      <h2 className={styles.locationTitle}>Location timeline</h2>
                      <div className={styles.helperText}>
                        Every stop links to a Client DB record. Client names and
                        addresses stay synchronized; history also keeps an audit
                        snapshot from the time of the stop.
                      </div>
                    </div>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save timeline"}
                    </Button>
                  </div>

                  <div className={styles.locationGroup}>
                    <div className={styles.locationGroupHeading}>
                      <span>Current stay</span>
                      <TrailerProvenanceBadge provenance={currentProvenance} />
                    </div>
                    <div className={styles.locationGrid}>
                      <Form.Group controlId="trailer-location-current">
                        <Form.Label>Location / client</Form.Label>
                        <Form.Select
                          value={form.locationCurrentId}
                          onChange={handleLocationClientChange("current")}
                          required
                        >
                          <option value="">
                            {form.currentName
                              ? `Unlinked legacy location: ${form.currentName}`
                              : "Select a Client DB record"}
                          </option>
                          {clientOptions.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name || client.id}
                              {getClientLocationText(client)
                                ? ` — ${getClientLocationText(client)}`
                                : ""}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="trailer-current-address">
                        <Form.Label>Client DB address</Form.Label>
                        <Form.Control
                          type="text"
                          value={form.currentClientLocation}
                          placeholder="Unknown"
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId="trailer-arrival-date">
                        <Form.Label>Arrival date</Form.Label>
                        <Form.Control
                          type="date"
                          value={form.currentArrivalDate}
                          onChange={handleFieldChange("currentArrivalDate")}
                        />
                      </Form.Group>
                      <Form.Group controlId="trailer-departure-date">
                        <Form.Label>Planned departure</Form.Label>
                        <Form.Control
                          type="date"
                          value={form.currentDepartureDate}
                          onChange={handleFieldChange("currentDepartureDate")}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className={styles.locationGroup}>
                    <div className={styles.locationGroupHeading}>Move trailer</div>
                    <div className={styles.locationGrid}>
                      <Form.Group controlId="trailer-location-next">
                        <Form.Label>Destination / client</Form.Label>
                        <Form.Select
                          value={form.locationNextId}
                          onChange={handleLocationClientChange("next")}
                        >
                          <option value="">Select a Client DB record</option>
                          {clientOptions.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name || client.id}
                              {getClientLocationText(client)
                                ? ` — ${getClientLocationText(client)}`
                                : ""}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="trailer-next-address">
                        <Form.Label>Destination Client DB address</Form.Label>
                        <Form.Control
                          type="text"
                          value={form.nextClientLocation}
                          placeholder="Unknown"
                          readOnly
                        />
                      </Form.Group>
                    </div>
                    <div className={styles.locationActions}>
                      <Button
                        type="button"
                        variant="outline-primary"
                        onClick={handleShiftLocation}
                        disabled={
                          isShiftingLocation ||
                          (!form.locationNextId && !String(form.nextName || "").trim())
                        }
                      >
                        {isShiftingLocation
                          ? "Moving..."
                          : "Move & archive current"}
                      </Button>
                      <span className={styles.helperText}>
                        Makes the destination current and adds the current stay
                        to previous locations.
                      </span>
                    </div>
                  </div>

                  <div className={styles.historyHeader}>
                    <span>Previous locations ({locationHistory.length})</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline-primary"
                      onClick={handleAddLocationHistory}
                    >
                      Add previous location
                    </Button>
                  </div>
                  {locationHistory.length === 0 ? (
                    <div className={styles.emptyState}>
                      No previous locations recorded. Add one to complete or
                      correct the timeline.
                    </div>
                  ) : (
                    <div className={styles.historyList}>
                      {locationHistory.map((entry, index) => (
                        <div key={`history-${index}`} className={styles.historyItem}>
                          <Form.Group controlId={`history-name-${index}`}>
                            <Form.Label className={styles.locationLabelWithBadge}>
                              <span>Location / client</span>
                              <TrailerProvenanceBadge provenance={entry.provenance} />
                            </Form.Label>
                            <Form.Select
                              value={entry.clientId || ""}
                              onChange={(event) =>
                                handleLocationHistoryChange(
                                  index,
                                  "clientId",
                                  event.target.value
                                )
                              }
                            >
                              <option value="">
                                {entry.clientName
                                  ? `Unlinked legacy location: ${entry.clientName}`
                                  : "Select a Client DB record"}
                              </option>
                              {clientOptions.map((client) => (
                                <option key={client.id} value={client.id}>
                                  {client.name || client.id}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group controlId={`history-address-${index}`}>
                            <Form.Label>Client DB address</Form.Label>
                            <Form.Control
                              type="text"
                              value={entry.clientLocation || ""}
                              placeholder="Unknown"
                              readOnly
                            />
                          </Form.Group>
                          <Form.Group controlId={`history-arrival-${index}`}>
                            <Form.Label>Arrival</Form.Label>
                            <Form.Control
                              type="date"
                              value={entry.arrivalDate || ""}
                              onChange={(event) =>
                                handleLocationHistoryChange(
                                  index,
                                  "arrivalDate",
                                  event.target.value
                                )
                              }
                            />
                          </Form.Group>
                          <Form.Group controlId={`history-departure-${index}`}>
                            <Form.Label>Departure</Form.Label>
                            <Form.Control
                              type="date"
                              value={entry.departureDate || ""}
                              onChange={(event) =>
                                handleLocationHistoryChange(
                                  index,
                                  "departureDate",
                                  event.target.value
                                )
                              }
                            />
                          </Form.Group>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleRemoveLocationHistory(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

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
                    Machines are stored separately from clients. Saving this
                    trailer moves its associated machine to the selected current
                    client. <Link href="/NewSearch/Trailers">Open trailer directory</Link>.
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
                  {printError && (
                    <Alert variant="danger" className={styles.printAlert}>
                      {printError}
                    </Alert>
                  )}
                  <div className={styles.tableActions}>
                    <Button
                      type="button"
                      variant="secondary"
                      className={styles.printButton}
                      onClick={handlePrintAllItems}
                      disabled={
                        isPrinting || partsLoading || associatedParts.length === 0
                      }
                    >
                      {isPrinting ? "Printing..." : "Print All Items"}
                    </Button>
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
