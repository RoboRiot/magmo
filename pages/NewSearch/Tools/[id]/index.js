import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import firebase from "../../../../context/Firebase";
import LoggedIn from "../../../LoggedIn";
import { fetchClients } from "../../../../utils/fetchAssociations";
import {
  buildNameTokens,
  buildWorkOrderTokens,
  updateMachineFields,
} from "../../../../utils/itemFormShared";
import {
  fetchTrackerCatalog,
  buildAllOems,
  buildModelsForSelection,
  syncTrackerFromSelections,
  deleteTrackerOem,
  deleteTrackerModel,
} from "../../../../utils/trackerCatalog";
import MultiSelectDropdown from "../../../../components/MultiSelectDropdown";
import ParentModal from "../../AddItem/parentModal";
import styles from "../ToolDetail.module.css";

const TOOL_PREFIX = "AIS_T";

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry || "").trim()).filter(Boolean);
  }
  const text = String(value || "").trim();
  return text ? [text] : [];
}

function normalizeSelection(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry || "").trim())
      .filter((entry) => entry && entry.toLowerCase() !== "n/a");
  }
  const text = String(value || "").trim();
  return text && text.toLowerCase() !== "n/a" ? [text] : [];
}

function uniqueSelection(values) {
  return Array.from(new Set(values || []));
}

function selectionToStoredValue(values) {
  const cleaned = uniqueSelection(normalizeSelection(values));
  if (!cleaned.length) return "";
  return cleaned.length === 1 ? cleaned[0] : cleaned;
}

function mergeOptionsWithSelection(options, selected) {
  const map = new Map();
  (options || []).forEach((value) => {
    const normalized = String(value || "").trim();
    if (normalized) map.set(normalized.toLowerCase(), normalized);
  });
  (selected || []).forEach((value) => {
    const normalized = String(value || "").trim();
    if (normalized) map.set(normalized.toLowerCase(), normalized);
  });
  return Array.from(map.values());
}

function getRefId(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value?.id) return value.id;
  return "";
}

function getMostRecentWorkOrderEntry(workOrders = []) {
  if (!Array.isArray(workOrders) || !workOrders.length) {
    return { workOrder: "", date: "" };
  }
  return [...workOrders].sort((a, b) => {
    const aDate = Date.parse(a?.date || "");
    const bDate = Date.parse(b?.date || "");
    const aTime = Number.isFinite(aDate) ? aDate : 0;
    const bTime = Number.isFinite(bDate) ? bDate : 0;
    return bTime - aTime;
  })[0] || { workOrder: "", date: "" };
}

function normalizeComponentItems(items = []) {
  const seen = new Set();
  return (items || [])
    .map((item) => ({
      id: String(item?.id || "").trim(),
      name: String(item?.name || "").trim(),
      pn: Array.isArray(item?.pn) ? item.pn.join(", ") : String(item?.pn || ""),
      sn: Array.isArray(item?.sn) ? item.sn.join(", ") : String(item?.sn || ""),
    }))
    .filter((item) => {
      if (!item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
}

function areHistorySnapshotsEqual(a, b) {
  return (
    a?.fromClientId === b?.fromClientId &&
    a?.fromMachineId === b?.fromMachineId &&
    a?.currentClientId === b?.currentClientId &&
    a?.currentMachineId === b?.currentMachineId &&
    a?.localLocFrom === b?.localLocFrom &&
    a?.localLocCurrent === b?.localLocCurrent &&
    a?.workOrder === b?.workOrder
  );
}

function hasHistorySnapshotValues(snapshot) {
  return [
    snapshot?.fromClientId,
    snapshot?.fromMachineId,
    snapshot?.currentClientId,
    snapshot?.currentMachineId,
    snapshot?.localLocFrom,
    snapshot?.localLocCurrent,
    snapshot?.workOrder,
  ].some((value) => String(value || "").trim() !== "");
}

function formatSavedAt(value) {
  if (!value) return "-";
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return "-";
  return new Date(parsed).toLocaleString();
}

async function generateToolId(db) {
  const snap = await db.collection("Tool").get();
  let maxNumber = 0;
  snap.docs.forEach((doc) => {
    const match = String(doc.id || "").match(/^AIS_T(\d{5})$/);
    if (!match) return;
    maxNumber = Math.max(maxNumber, Number(match[1]));
  });

  let nextNumber = maxNumber + 1;
  while (nextNumber <= 99999) {
    const nextId = `${TOOL_PREFIX}${String(nextNumber).padStart(5, "0")}`;
    const existing = await db.collection("Tool").doc(nextId).get();
    if (!existing.exists) return nextId;
    nextNumber += 1;
  }
  throw new Error("No Tool IDs are available.");
}

export default function ToolDetailPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const routeId = useMemo(() => {
    if (!router.isReady) return "";
    return String(router.query.id || "").trim();
  }, [router.isReady, router.query.id]);
  const isNew = routeId === "new";

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [slackLoading, setSlackLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [clients, setClients] = useState([]);
  const [machines, setMachines] = useState([]);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [trackerCatalog, setTrackerCatalog] = useState({
    modalities: [],
    oemsByModality: {},
    modelsByModalityOem: {},
    meta: {},
  });
  const [trackerLoading, setTrackerLoading] = useState(false);
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedOems, setSelectedOems] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    fromClientId: "",
    currentClientId: "",
    fromMachineId: "",
    currentMachineId: "",
    localLocFrom: "",
    localLocCurrent: "",
  });
  const [workOrders, setWorkOrders] = useState([{ workOrder: "", date: "" }]);
  const [componentItems, setComponentItems] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectionHistory, setSelectionHistory] = useState([]);

  const selectedFromMachine = useMemo(
    () => machines.find((machine) => machine.id === form.fromMachineId) || null,
    [form.fromMachineId, machines]
  );
  const selectedCurrentMachine = useMemo(
    () =>
      machines.find((machine) => machine.id === form.currentMachineId) || null,
    [form.currentMachineId, machines]
  );

  const applyMergedMachineFields = useCallback((merged, { force = false } = {}) => {
    if (!merged) return;
    const nextOems = uniqueSelection(normalizeSelection(merged.oem));
    const nextModalities = uniqueSelection(normalizeSelection(merged.modality));
    const nextModels = uniqueSelection(normalizeSelection(merged.model));

    setSelectedOems((prev) => {
      if (!force && prev.length) return prev;
      return nextOems;
    });
    setSelectedModalities((prev) => {
      if (!force && prev.length) return prev;
      return nextModalities;
    });
    setSelectedModels((prev) => {
      if (!force && prev.length) return prev;
      return nextModels;
    });
  }, []);

  const getClientName = useCallback(
    (clientId) => clients.find((client) => client.id === clientId)?.name || "",
    [clients]
  );

  const getMachineName = useCallback(
    (machineId) =>
      machines.find((machine) => machine.id === machineId)?.name || "",
    [machines]
  );

  const buildHistorySnapshot = useCallback(() => {
    const latestWorkOrder = getMostRecentWorkOrderEntry(workOrders);
    return {
      fromClientId: form.fromClientId,
      fromClientName: getClientName(form.fromClientId),
      fromMachineId: form.fromMachineId,
      fromMachineName: getMachineName(form.fromMachineId),
      currentClientId: form.currentClientId,
      currentClientName: getClientName(form.currentClientId),
      currentMachineId: form.currentMachineId,
      currentMachineName: getMachineName(form.currentMachineId),
      toClientId: form.currentClientId,
      toClientName: getClientName(form.currentClientId),
      toMachineId: form.currentMachineId,
      toMachineName: getMachineName(form.currentMachineId),
      localLocFrom: form.localLocFrom,
      localLocCurrent: form.localLocCurrent,
      workOrder: String(latestWorkOrder?.workOrder || "").trim(),
    };
  }, [form, getClientName, getMachineName, workOrders]);

  const currentWorkOrderIndex = useMemo(() => {
    if (!Array.isArray(workOrders) || !workOrders.length) return 0;
    let bestIndex = 0;
    let bestTime = Date.parse(workOrders[0]?.date || "");
    if (!Number.isFinite(bestTime)) bestTime = 0;

    workOrders.forEach((entry, index) => {
      const parsed = Date.parse(entry?.date || "");
      const nextTime = Number.isFinite(parsed) ? parsed : 0;
      if (nextTime > bestTime || (nextTime === bestTime && index > bestIndex)) {
        bestIndex = index;
        bestTime = nextTime;
      }
    });

    return bestIndex;
  }, [workOrders]);

  const currentWorkOrder =
    workOrders[currentWorkOrderIndex] || { workOrder: "", date: "" };

  const filteredMachines = useCallback(
    (clientId) => {
      if (!clientId) return machines;
      return machines.filter((machine) => !machine.clientId || machine.clientId === clientId);
    },
    [machines]
  );

  const loadTracker = useCallback(
    async (force = false) => {
      if (trackerLoading) return;
      if (!force && trackerCatalog.modalities.length) return;
      setTrackerLoading(true);
      try {
        const catalog = await fetchTrackerCatalog();
        setTrackerCatalog(catalog);
      } catch (error) {
        console.error("Failed to load tracker catalog:", error);
      } finally {
        setTrackerLoading(false);
      }
    },
    [trackerLoading, trackerCatalog.modalities.length]
  );

  useEffect(() => {
    loadTracker();
  }, [loadTracker]);

  const allOemOptions = useMemo(
    () => buildAllOems(trackerCatalog),
    [trackerCatalog]
  );
  const modelOptions = useMemo(
    () =>
      buildModelsForSelection(
        trackerCatalog,
        selectedModalities,
        selectedOems
      ),
    [trackerCatalog, selectedModalities, selectedOems]
  );
  const modalityOptionsForUI = useMemo(
    () => mergeOptionsWithSelection(trackerCatalog.modalities, selectedModalities),
    [trackerCatalog.modalities, selectedModalities]
  );
  const oemOptionsForUI = useMemo(
    () => mergeOptionsWithSelection(allOemOptions, selectedOems),
    [allOemOptions, selectedOems]
  );
  const modelOptionsForUI = useMemo(
    () => mergeOptionsWithSelection(modelOptions, selectedModels),
    [modelOptions, selectedModels]
  );
  const canManageModels =
    !trackerLoading && selectedModalities.length > 0 && selectedOems.length > 0;

  const handleOemSelectionChange = useCallback((nextSelection) => {
    setSelectedOems(nextSelection || []);
    setSelectedModels([]);
  }, []);

  const handleModalitySelectionChange = useCallback((nextSelection) => {
    setSelectedModalities(nextSelection || []);
    setSelectedModels([]);
  }, []);

  const handleDeleteOemOption = useCallback(
    async (oem) => {
      if (!oem) return;
      try {
        await deleteTrackerOem({ oem, catalog: trackerCatalog });
        setSelectedOems((prev) => prev.filter((value) => value !== oem));
        loadTracker(true);
      } catch (error) {
        console.error("Failed to delete OEM:", error);
      }
    },
    [trackerCatalog, loadTracker]
  );

  const handleDeleteModelOption = useCallback(
    async (model) => {
      if (!model || !selectedModalities.length || !selectedOems.length) return;
      try {
        const ops = [];
        selectedModalities.forEach((modalityValue) => {
          selectedOems.forEach((oemValue) => {
            ops.push(
              deleteTrackerModel({
                modality: modalityValue,
                oem: oemValue,
                model,
                catalog: trackerCatalog,
              })
            );
          });
        });
        await Promise.allSettled(ops);
        setSelectedModels((prev) => prev.filter((value) => value !== model));
        loadTracker(true);
      } catch (error) {
        console.error("Failed to delete model:", error);
      }
    },
    [selectedModalities, selectedOems, trackerCatalog, loadTracker]
  );

  const handleAddModelOption = useCallback(
    async (incomingModel) => {
      if (!canManageModels) return false;
      const normalizedModel = String(incomingModel || "").trim();
      if (!normalizedModel) return false;

      const alreadyExists = modelOptionsForUI.some(
        (value) =>
          String(value || "").trim().toLowerCase() ===
          normalizedModel.toLowerCase()
      );

      if (!alreadyExists) {
        await syncTrackerFromSelections({
          selections: {
            modalities: selectedModalities,
            oems: selectedOems,
            models: [normalizedModel],
          },
          catalog: trackerCatalog,
        });
        loadTracker(true);
      }

      setSelectedModels((prev) =>
        uniqueSelection([...normalizeSelection(prev), normalizedModel])
      );
      return true;
    },
    [
      canManageModels,
      modelOptionsForUI,
      selectedModalities,
      selectedOems,
      trackerCatalog,
      loadTracker,
    ]
  );

  useEffect(() => {
    if (!selectedFromMachine && !selectedCurrentMachine) return;
    const merged = updateMachineFields(
      null,
      selectedCurrentMachine,
      selectedFromMachine
    );
    applyMergedMachineFields(merged, { force: true });
  }, [applyMergedMachineFields, selectedCurrentMachine, selectedFromMachine]);

  useEffect(() => {
    if (!router.isReady || !routeId) return;
    let cancelled = false;

    const loadData = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const db = firebase.firestore();
        const [clientsData, machineSnap, toolDoc] = await Promise.all([
          fetchClients(),
          db.collection("Machine").get(),
          isNew ? Promise.resolve(null) : db.collection("Tool").doc(routeId).get(),
        ]);

        const loadedClients = (Array.isArray(clientsData) ? clientsData : [])
          .map((client) => ({
            id: client.id,
            name: String(client.name || client.id || "").trim(),
          }))
          .filter((client) => client.id)
          .sort((a, b) => a.name.localeCompare(b.name));

        const loadedMachines = machineSnap.docs
          .map((doc) => {
            const data = doc.data() || {};
            return {
              id: doc.id,
              name: String(data.name || doc.id || "").trim(),
              clientId: getRefId(data.client),
              OEM: data.OEM ?? data.oem ?? "",
              oem: data.oem ?? data.OEM ?? "",
              Modality: data.Modality ?? data.modality ?? "",
              modality: data.modality ?? data.Modality ?? "",
              Model: data.Model ?? data.model ?? "",
              model: data.model ?? data.Model ?? "",
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        if (cancelled) return;
        setClients(loadedClients);
        setMachines(loadedMachines);

        if (isNew) {
          setIsLoading(false);
          return;
        }

        if (!toolDoc?.exists) {
          setLoadError("Tool not found.");
          setIsLoading(false);
          return;
        }

        const data = toolDoc.data() || {};
        const componentIds = Array.isArray(data.componentItemIds)
          ? data.componentItemIds
          : [];
        let loadedComponents = normalizeComponentItems(data.componentItems || []);
        const missingComponentIds = componentIds.filter(
          (id) => !loadedComponents.some((item) => item.id === id)
        );
        if (missingComponentIds.length) {
          const docs = await Promise.all(
            missingComponentIds.map((id) => db.collection("Test").doc(id).get())
          );
          loadedComponents = normalizeComponentItems([
            ...loadedComponents,
            ...docs
              .filter((doc) => doc.exists)
              .map((doc) => ({ id: doc.id, ...(doc.data() || {}) })),
          ]);
        }

        const docPhotoUrls = Array.isArray(data.photoUrls) ? data.photoUrls : [];
        let loadedPhotos = docPhotoUrls.map((url) => ({ url }));
        try {
          const storageList = await firebase.storage().ref().child(`Tools/${routeId}`).listAll();
          const storageUrls = await Promise.all(
            storageList.items.map((itemRef) => itemRef.getDownloadURL())
          );
          loadedPhotos = storageUrls.map((url) => ({ url }));
        } catch (photoError) {
          console.warn("Tool photos could not be listed", photoError);
        }

        if (cancelled) return;
        const loadedOems = normalizeSelection(data.oem ?? data.OEM);
        const loadedModalities = normalizeSelection(
          data.modality ?? data.Modality ?? data.systems ?? data.system
        );
        const loadedModels = normalizeSelection(data.model ?? data.Model);
        setSelectedOems(loadedOems);
        setSelectedModalities(loadedModalities);
        setSelectedModels(loadedModels);
        setForm({
          name: String(data.name || "").trim(),
          description: String(data.description || "").trim(),
          fromClientId: getRefId(data.ClientFrom) || data.fromClientId || "",
          currentClientId:
            getRefId(data.ClientCurrent) || data.currentClientId || "",
          fromMachineId: getRefId(data.MachineFrom) || data.fromMachineId || "",
          currentMachineId:
            getRefId(data.MachineCurrent) || data.currentMachineId || "",
          localLocFrom: String(data.localLocFrom || "").trim(),
          localLocCurrent: String(data.localLocCurrent || "").trim(),
        });
        setWorkOrders(
          Array.isArray(data.workOrders) && data.workOrders.length
            ? data.workOrders
            : [{ workOrder: "", date: "" }]
        );
        setComponentItems(loadedComponents);
        setPhotos(loadedPhotos);
        setSelectionHistory(
          Array.isArray(data.selectionHistory) ? data.selectionHistory : []
        );
      } catch (error) {
        console.error("Failed to load tool", error);
        if (!cancelled) setLoadError("Failed to load tool.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, [isNew, routeId, router.isReady]);

  const handleFieldChange = (field) => (eventOrValue) => {
    const value =
      eventOrValue && typeof eventOrValue === "object" && "target" in eventOrValue
        ? eventOrValue.target?.value || ""
        : eventOrValue || "";
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaveError("");
    setSaveSuccess("");
  };

  const handleWorkOrderChange = (index, field, value) => {
    setWorkOrders((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    );
  };

  const handleFilesSelected = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const nextPhotos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...nextPhotos]);
    event.target.value = "";
  };

  const uploadPhotos = async (toolId) => {
    const storageRef = firebase.storage().ref();
    const uploadedUrls = [];
    for (let i = 0; i < photos.length; i += 1) {
      const photo = photos[i];
      if (!photo?.file) {
        if (photo?.url) uploadedUrls.push(photo.url);
        continue;
      }
      const safeName = String(photo.file.name || `photo-${i}.jpg`).replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );
      const photoRef = storageRef.child(`Tools/${toolId}/${Date.now()}-${i}-${safeName}`);
      await photoRef.put(photo.file, {
        contentType: photo.file.type || "image/jpeg",
      });
      uploadedUrls.push(await photoRef.getDownloadURL());
    }
    return uploadedUrls;
  };

  const saveTool = async ({ showSuccess = true } = {}) => {
    const name = String(form.name || "").trim();
    if (!name) {
      setSaveError("Name is required.");
      throw new Error("Name is required.");
    }

    setSaveError("");
    setSaveSuccess("");
    const db = firebase.firestore();
    const toolId = isNew ? await generateToolId(db) : routeId;
    const currentUser = firebase.auth().currentUser;
    const currentSnapshot = buildHistorySnapshot();
    const safeHistory = Array.isArray(selectionHistory) ? selectionHistory : [];
    const lastHistoryEntry = safeHistory.length
      ? safeHistory[safeHistory.length - 1]
      : null;
    const nextSelectionHistory =
      hasHistorySnapshotValues(currentSnapshot) &&
      !areHistorySnapshotsEqual(lastHistoryEntry, currentSnapshot)
        ? [
            ...safeHistory,
            {
              ...currentSnapshot,
              savedAt: new Date().toISOString(),
            },
          ]
        : safeHistory;

    const componentItemIds = componentItems.map((item) => item.id);
    const storedOem = selectionToStoredValue(selectedOems);
    const storedModality = selectionToStoredValue(selectedModalities);
    const storedModel = selectionToStoredValue(selectedModels);
    const payload = {
      name,
      nameLower: name.toLowerCase(),
      nameTokens: buildNameTokens(name),
      description: String(form.description || "").trim(),
      oem: storedOem,
      OEM: storedOem,
      modality: storedModality,
      Modality: storedModality,
      model: storedModel,
      Model: storedModel,
      systems: normalizeSelection(selectedModalities),
      system: normalizeSelection(selectedModalities)[0] || "",
      workOrders,
      workOrderTokens: buildWorkOrderTokens(workOrders),
      fromClientId: form.fromClientId,
      fromClientName: getClientName(form.fromClientId),
      currentClientId: form.currentClientId,
      currentClientName: getClientName(form.currentClientId),
      locationFromName: getClientName(form.fromClientId),
      locationCurrentName: getClientName(form.currentClientId),
      fromMachineId: form.fromMachineId,
      fromMachineName: getMachineName(form.fromMachineId),
      currentMachineId: form.currentMachineId,
      currentMachineName: getMachineName(form.currentMachineId),
      localLocFrom: String(form.localLocFrom || "").trim(),
      localLocCurrent: String(form.localLocCurrent || "").trim(),
      componentItemIds,
      componentItems,
      componentItemRefs: componentItemIds.map((id) =>
        db.collection("Test").doc(id)
      ),
      selectionHistory: nextSelectionHistory,
      TheMachine: {
        oem: storedOem,
        OEM: storedOem,
        modality: storedModality,
        Modality: storedModality,
        model: storedModel,
        Model: storedModel,
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastEdited: currentUser?.email || "unknown",
    };

    if (form.fromClientId) {
      payload.ClientFrom = db.collection("Client").doc(form.fromClientId);
    } else {
      payload.ClientFrom = firebase.firestore.FieldValue.delete();
    }
    if (form.currentClientId) {
      payload.ClientCurrent = db.collection("Client").doc(form.currentClientId);
    } else {
      payload.ClientCurrent = firebase.firestore.FieldValue.delete();
    }
    if (form.fromMachineId) {
      payload.MachineFrom = db.collection("Machine").doc(form.fromMachineId);
    } else {
      payload.MachineFrom = firebase.firestore.FieldValue.delete();
    }
    if (form.currentMachineId) {
      payload.MachineCurrent = db.collection("Machine").doc(form.currentMachineId);
    } else {
      payload.MachineCurrent = firebase.firestore.FieldValue.delete();
    }
    if (isNew) payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    await db.collection("Tool").doc(toolId).set(payload, { merge: true });
    const photoUrls = await uploadPhotos(toolId);
    await db.collection("Tool").doc(toolId).set({ photoUrls }, { merge: true });

    setPhotos(photoUrls.map((url) => ({ url })));
    setSelectionHistory(nextSelectionHistory);
    if (showSuccess) setSaveSuccess("Tool saved.");
    if (isNew) {
      router.replace(`/NewSearch/Tools/${toolId}`);
    }
    return { toolId, photoUrls, selectionHistory: nextSelectionHistory };
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await saveTool({ showSuccess: true });
    } catch (error) {
      console.error("Failed to save tool", error);
      setSaveError(error?.message || "Failed to save tool.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToSlack = async () => {
    if (slackLoading) return;
    setSlackLoading(true);
    setSaveError("");
    setSaveSuccess("");
    try {
      const saved = await saveTool({ showSuccess: false });
      const toolId = saved?.toolId || routeId;
      const safeName = String(form.name || toolId || "Untitled item").trim();
      const title = `${safeName}${toolId ? ` (${toolId})` : ""}`;
      const photoUrls = Array.isArray(saved?.photoUrls)
        ? saved.photoUrls
        : photos.map((photo) => photo?.url).filter(Boolean);
      const idToken = await firebase.auth().currentUser?.getIdToken();
      const resp = await fetch("/api/slack/add-to-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          listKey: "tools",
          title,
          work_order: currentWorkOrder?.workOrder || "",
          photoUrls,
        }),
      });
      const json = await resp.json();
      console.log("[SLACK][tool] response:", json);
      if (json?.debug?.steps) console.table(json.debug.steps);
      if (!resp.ok || !json?.ok) {
        throw new Error(json?.message || json?.error || "Slack add failed.");
      }
      setSaveSuccess("Tool added to Slack.");
    } catch (error) {
      console.error("Failed to add tool to Slack", error);
      setSaveError(error?.message || "Failed to add tool to Slack.");
    } finally {
      setSlackLoading(false);
    }
  };

  const removeHistoryEntry = async (index) => {
    const nextHistory = selectionHistory.filter((_, i) => i !== index);
    setSelectionHistory(nextHistory);
    if (!isNew && routeId) {
      await firebase
        .firestore()
        .collection("Tool")
        .doc(routeId)
        .set({ selectionHistory: nextHistory }, { merge: true });
    }
  };

  return (
    <LoggedIn>
      <div className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>{isNew ? "New Tool" : routeId}</h1>
              <div className={styles.subtitle}>
                Build a tool from inventory items and track where it goes.
              </div>
            </div>
            <Button
              variant="outline-secondary"
              onClick={() => router.push("/NewSearch/Tools")}
            >
              Back
            </Button>
          </header>

          <section className={styles.card}>
            {isLoading && (
              <div className={styles.loadingRow}>
                <Spinner animation="border" size="sm" />
                <span>Loading tool...</span>
              </div>
            )}
            {loadError && <Alert variant="danger">{loadError}</Alert>}
            {saveError && <Alert variant="danger">{saveError}</Alert>}
            {saveSuccess && <Alert variant="success">{saveSuccess}</Alert>}

            {!isLoading && !loadError && (
              <Form onSubmit={handleSave} className={styles.form}>
                <div className={styles.grid}>
                  <Form.Group controlId="tool-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={form.name}
                      onChange={handleFieldChange("name")}
                      placeholder="Tool name"
                    />
                  </Form.Group>
                  <Form.Group controlId="tool-id">
                    <Form.Label>Tool ID</Form.Label>
                    <Form.Control
                      value={isNew ? "Generated on save" : routeId}
                      readOnly
                    />
                  </Form.Group>
                </div>

                <Form.Group controlId="tool-description">
                  <Form.Label>How It Is Used</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={form.description}
                    onChange={handleFieldChange("description")}
                    placeholder="Describe how this tool is used"
                  />
                </Form.Group>

                <div className={styles.gridThree}>
                  <MultiSelectDropdown
                    label="OEM"
                    placeholder={trackerLoading ? "Loading..." : "Select OEM"}
                    options={oemOptionsForUI}
                    selected={selectedOems}
                    onChange={handleOemSelectionChange}
                    enableDelete
                    onDeleteOption={handleDeleteOemOption}
                    disabled={trackerLoading}
                  />
                  <MultiSelectDropdown
                    label="Modality"
                    placeholder={trackerLoading ? "Loading..." : "Select Modality"}
                    options={modalityOptionsForUI}
                    selected={selectedModalities}
                    onChange={handleModalitySelectionChange}
                    disabled={trackerLoading}
                  />
                  <MultiSelectDropdown
                    label="Model"
                    placeholder={
                      selectedModalities.length && selectedOems.length
                        ? "Select Model"
                        : "Select Modality + OEM"
                    }
                    options={modelOptionsForUI}
                    selected={selectedModels}
                    onChange={setSelectedModels}
                    enableDelete
                    onDeleteOption={handleDeleteModelOption}
                    enableAdd
                    addPlaceholder={
                      canManageModels
                        ? "Add new model for selected branch"
                        : "Select Modality + OEM first"
                    }
                    onAddOption={handleAddModelOption}
                    addDisabled={!canManageModels}
                    disabled={
                      trackerLoading ||
                      !selectedModalities.length ||
                      !selectedOems.length
                    }
                  />
                </div>

                <div className={styles.grid}>
                  <section className={styles.section}>
                    <div className={styles.sectionTitle}>From</div>
                    <Form.Group controlId="tool-from-client" className="mb-2">
                      <Form.Label>Client</Form.Label>
                      <Form.Control
                        as="select"
                        value={form.fromClientId}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((prev) => ({
                            ...prev,
                            fromClientId: value,
                            fromMachineId: "",
                          }));
                        }}
                      >
                        <option value="">None selected</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name || client.id}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="tool-from-machine" className="mb-2">
                      <Form.Label>Machine</Form.Label>
                      <Form.Control
                        as="select"
                        value={form.fromMachineId}
                        onChange={handleFieldChange("fromMachineId")}
                      >
                        <option value="">None selected</option>
                        {filteredMachines(form.fromClientId).map((machine) => (
                          <option key={machine.id} value={machine.id}>
                            {machine.id} - {machine.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="tool-from-local">
                      <Form.Label>Local Location</Form.Label>
                      <Form.Control
                        value={form.localLocFrom}
                        onChange={handleFieldChange("localLocFrom")}
                        placeholder="Region/section/bin/pallet"
                      />
                    </Form.Group>
                  </section>

                  <section className={styles.section}>
                    <div className={styles.sectionTitle}>Current / To</div>
                    <Form.Group controlId="tool-current-client" className="mb-2">
                      <Form.Label>Client</Form.Label>
                      <Form.Control
                        as="select"
                        value={form.currentClientId}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((prev) => ({
                            ...prev,
                            currentClientId: value,
                            currentMachineId: "",
                          }));
                        }}
                      >
                        <option value="">None selected</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name || client.id}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="tool-current-machine" className="mb-2">
                      <Form.Label>Machine</Form.Label>
                      <Form.Control
                        as="select"
                        value={form.currentMachineId}
                        onChange={handleFieldChange("currentMachineId")}
                      >
                        <option value="">None selected</option>
                        {filteredMachines(form.currentClientId).map((machine) => (
                          <option key={machine.id} value={machine.id}>
                            {machine.id} - {machine.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="tool-current-local">
                      <Form.Label>Local Location</Form.Label>
                      <Form.Control
                        value={form.localLocCurrent}
                        onChange={handleFieldChange("localLocCurrent")}
                        placeholder="Region/section/bin/pallet"
                      />
                    </Form.Group>
                  </section>
                </div>

                <section className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    <span>Current Work Order</span>
                    <div className={styles.inlineActions}>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => setShowHistoryModal(true)}
                      >
                        History
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() =>
                          setWorkOrders((prev) => [
                            ...prev,
                            { workOrder: "", date: "" },
                          ])
                        }
                      >
                        New
                      </Button>
                    </div>
                  </div>
                  <div className={styles.currentWorkOrder}>
                    <Form.Group controlId="tool-current-work-order">
                      <Form.Label>Work Order</Form.Label>
                      <Form.Control
                        value={currentWorkOrder.workOrder || ""}
                        onChange={(event) =>
                          handleWorkOrderChange(
                            currentWorkOrderIndex,
                            "workOrder",
                            event.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="tool-current-work-order-date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={currentWorkOrder.date || ""}
                        onChange={(event) =>
                          handleWorkOrderChange(
                            currentWorkOrderIndex,
                            "date",
                            event.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </div>
                </section>

                <section className={styles.tableCard}>
                  <div className={styles.tableHeader}>
                    <span>Built From Items ({componentItems.length})</span>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => setShowComponentModal(true)}
                    >
                      Select Items
                    </Button>
                  </div>
                  <div className={styles.tableWrap}>
                    <Table striped bordered hover size="sm" className={styles.table}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Part Number</th>
                          <th>Serial Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {componentItems.length === 0 && (
                          <tr>
                            <td colSpan={5} className={styles.emptyState}>
                              No items selected.
                            </td>
                          </tr>
                        )}
                        {componentItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name || item.id}</td>
                            <td>{item.id}</td>
                            <td>{item.pn || "-"}</td>
                            <td>{item.sn || "-"}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => router.push(`/NewSearch/item/${item.id}`)}
                              >
                                Open
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                className="ms-2"
                                onClick={() =>
                                  setComponentItems((prev) =>
                                    prev.filter((entry) => entry.id !== item.id)
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </section>

                <section className={styles.section}>
                  <div className={styles.tableHeader}>
                    <span>Pictures</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline-primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFilesSelected}
                  />
                  <div className={styles.photoGrid}>
                    {photos.length === 0 && (
                      <div className={styles.emptyState}>No pictures added.</div>
                    )}
                    {photos.map((photo, index) => (
                      <div key={`${photo.url}-${index}`} className={styles.photoTile}>
                        <img src={photo.url} alt={`Tool photo ${index + 1}`} />
                        <button
                          type="button"
                          className={styles.removePhoto}
                          onClick={() =>
                            setPhotos((prev) => prev.filter((_, i) => i !== index))
                          }
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <div className={styles.actions}>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddToSlack}
                    disabled={isSaving || slackLoading}
                  >
                    {slackLoading ? "Slack..." : "Slack"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => router.push("/NewSearch/Tools")}
                  >
                    Back To Tools
                  </Button>
                </div>
              </Form>
            )}
          </section>

          <ParentModal
            show={showComponentModal}
            handleClose={() => setShowComponentModal(false)}
            selectionMode="multiple"
            title="Select Tool Items"
            subtitle="Search and choose the inventory items that make up this tool."
            selectedItems={componentItems}
            onConfirm={(items) => setComponentItems(normalizeComponentItems(items))}
          />

          <Modal
            show={showHistoryModal}
            onHide={() => setShowHistoryModal(false)}
            size="xl"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Tool History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Saved At</th>
                    <th>From Client</th>
                    <th>From Machine</th>
                    <th>To Client</th>
                    <th>To Machine</th>
                    <th>Work Order</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectionHistory.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-muted">
                        No history yet. A row is added on save when routing or work order changes.
                      </td>
                    </tr>
                  )}
                  {selectionHistory.map((entry, index) => (
                    <tr key={`${entry.savedAt || "history"}-${index}`}>
                      <td>{formatSavedAt(entry.savedAt)}</td>
                      <td>{entry.fromClientName || "-"}</td>
                      <td>{entry.fromMachineName || "-"}</td>
                      <td>{entry.toClientName || entry.currentClientName || "-"}</td>
                      <td>{entry.toMachineName || entry.currentMachineName || "-"}</td>
                      <td>{entry.workOrder || "-"}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => removeHistoryEntry(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </LoggedIn>
  );
}
