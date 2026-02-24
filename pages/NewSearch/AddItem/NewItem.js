import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  FormControl,
  Collapse,
  InputGroup,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";
import LoggedIn from "../../LoggedIn";
import { useRouter } from "next/router";
import { fetchClients } from "../../../utils/fetchAssociations";
import ClientTable from "../../../utils/ClientTable";
import ClientInfoModal from "../ClientInfoModal";
import ParentModal from "./parentModal";
import MachineSelectionModal from "../item/[id]/MachineSelectionModal";
import InfoModal from "../InfoModal";
import InflowAPI from "../../../utils/inflowAPI";
import NewLocal from "../item/[id]/NewLocal";
import {
  buildLocalLocObject,
  formatLoc,
  updateMachineFields,
  buildNameTokens,
} from "../../../utils/itemFormShared";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import {
  fetchTrackerCatalog,
  buildAllOems,
  buildModelsForSelection,
  syncTrackerFromSelections,
  deleteTrackerOem,
  deleteTrackerModel,
} from "../../../utils/trackerCatalog";
import styles from "./NewItem.module.css";

// Load BarcodeScannerComponent only on the client-side.
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

// Simulate network delay.
function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// Custom LoadingButton component.
function LoadingButton({ type, name, route }) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      let cancelled = false;
      simulateNetworkRequest().then(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [isLoading]);
  const handleClick = () => setLoading(true);
  return (
    <Link href={`/${route}`}>
      <a
        className={`btn btn-${type}`}
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Loading…" : name}
      </a>
    </Link>
  );
}

export default function NewItem() {
  const router = useRouter();
  const { signOut } = useAuth();
  const SHOW_SLACK_BUTTONS =
    process.env.NEXT_PUBLIC_SHOW_SLACK_BUTTONS === "true";
  // Initialize item state – for a new item, these start empty.
  // We store PN and SN as arrays.
  const [items, setItems] = useState({
    name: "",
    pn: [""],
    sn: [""], // This will be overridden on submit.
    localSN: "", // NEW FIELD: holds user input for a local serial number.
    date: new Date().toISOString().split("T")[0], // auto-fill current date
    price: "",
    status: "",
    poNumber: "",
    trackingNumber: "",
    length: "",
    width: "",
    height: "",
    arrival_date: "", // NEW FIELD: Arrival Date
    visible: true,
  });

  const [editingPn, setEditingPn] = useState(true);
  // const [newPn, setNewPn] = useState(""); // for the input value when editing

  const [editingSn, setEditingSn] = useState(true);
  // const [newSn, setNewSn] = useState("");

  // DOM is the Date of Manufacture input (user provided).
  const [DOM, setDOM] = useState("");
  // OEM, Modality, Model fields (multi-select).
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedOems, setSelectedOems] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  // Local location states.
  const [newLocalFrom, setNewLocalFrom] = useState({
    region: "",
    section: { letter: "", number: "" },
    bin: "",
    pallet: "",
  });
  const [newLocalCurrent, setNewLocalCurrent] = useState({
    region: "",
    section: { letter: "", number: "" },
    bin: "",
    pallet: "",
  });

  // Other states.
  const [pnOptions, setPnOptions] = useState([]);
  const [snOptions, setSnOptions] = useState([]);
  const [pnSnLoaded, setPnSnLoaded] = useState(false);
  const [pnSnLoading, setPnSnLoading] = useState(false);
  const [descriptions, setDescriptions] = useState([
    { description: "", date: "" },
  ]);
  const [workOrders, setWorkOrders] = useState([{ workOrder: "", date: "" }]);
  const [clients, setClients] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false); // error modal for missing required fields
  const [showErr, setShowErr] = useState(false);
  const [Err, setErr] = useState(
    "Missing required field: Name and Description"
  );
  const [showDescModal, setShowDescModal] = useState(false);
  const [showWoModal, setShowWoModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [machineSelectionModal, setMachineSelectionModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedCurrentMachine, setSelectedCurrentMachine] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [TheMachine, setTheMachine] = useState(null);
  const [machineOptions, setMachineOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [addToWebsite, setAddToWebsite] = useState(false);
  const [machinePick, setMachinePick] = useState(false);
  const [freqItem, setFreqItem] = useState(0);
  const [usagePastYear, setUsagePastYear] = useState(0);
  const [machineFrequency, setMachineFrequency] = useState(0);
  // For extra (dimensions/price/DOM) section collapse.
  const [showExtra, setShowExtra] = useState(false);

  const [trackerCatalog, setTrackerCatalog] = useState({
    modalities: [],
    oemsByModality: {},
    modelsByModalityOem: {},
    meta: {},
  });
  const [trackerLoading, setTrackerLoading] = useState(false);

  // For PN/SN "add new" functionality.
  const [addingNewPn, setAddingNewPn] = useState(false);
  const [newPn, setNewPn] = useState("");
  const [addingNewSn, setAddingNewSn] = useState(false);
  const [newSn, setNewSn] = useState("");

  // For browsing photos.
  const browseInputRef = useRef(null);
  const cloneSeedRef = useRef(null);

  // Inside your NewItem component:
  const [loading, setLoading] = useState(false);
  const [savedDocId, setSavedDocId] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetLoading = (value) => {
    if (isMountedRef.current) setLoading(value);
  };

  const withTimeout = (promise, ms, label = "Operation") =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`${label} timed out after ${Math.ceil(ms / 1000)}s`));
      }, ms);
      promise
        .then((result) => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });

  const shallowClean = (obj) => {
    const newObj = {};
    Object.keys(obj || {}).forEach((key) => {
      newObj[key] = obj[key] === undefined ? "" : obj[key];
    });
    return newObj;
  };

  const normalizeSelection = (value) => {
    if (Array.isArray(value)) {
      return value
        .map((v) => String(v).trim())
        .filter((v) => v && v.toLowerCase() !== "n/a");
    }
    if (value == null) return [];
    const normalized = String(value).trim();
    if (!normalized || normalized.toLowerCase() === "n/a") return [];
    return [normalized];
  };

  const uniqueSelection = (values) => Array.from(new Set(values || []));

  const selectionToStoredValue = (values) => {
    const cleaned = uniqueSelection(normalizeSelection(values));
    if (cleaned.length === 0) return "";
    if (cleaned.length === 1) return cleaned[0];
    return cleaned;
  };

  const selectionToPrintValue = (values) => {
    const cleaned = uniqueSelection(normalizeSelection(values));
    if (cleaned.length === 0) return "";
    if (cleaned.length === 1) return cleaned[0];
    return "Multi";
  };

  const mergeOptionsWithSelection = (options, selected) => {
    const map = new Map();
    (options || []).forEach((value) => {
      if (value == null) return;
      const normalized = String(value).trim();
      if (!normalized) return;
      map.set(normalized.toLowerCase(), normalized);
    });
    (selected || []).forEach((value) => {
      if (value == null) return;
      const normalized = String(value).trim();
      if (!normalized) return;
      map.set(normalized.toLowerCase(), normalized);
    });
    return Array.from(map.values());
  };

  useEffect(() => {
    if (!router.isReady) return;
    const cloneFrom = router.query.cloneFrom;
    if (!cloneFrom || cloneSeedRef.current === cloneFrom) return;
    cloneSeedRef.current = cloneFrom;

    let cancelled = false;
    const db = firebase.firestore();

    const toArray = (value) => {
      if (Array.isArray(value)) return value;
      if (value === null || value === undefined || value === "") return [""];
      return [value];
    };

    const toDateString = (value) => {
      if (!value) return "";
      if (value?.toDate) {
        const d = value.toDate();
        return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
      }
      if (value instanceof Date) {
        return isNaN(value.getTime()) ? "" : value.toISOString().slice(0, 10);
      }
      if (typeof value === "string") {
        if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
        const parsed = Date.parse(value);
        if (!isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10);
      }
      return "";
    };

    const resolveDoc = async (ref, collection) => {
      if (!ref) return null;
      try {
        if (typeof ref.get === "function") {
          const doc = await ref.get();
          return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }
        if (typeof ref === "string") {
          const doc = await db.collection(collection).doc(ref).get();
          return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }
        if (ref?.id) {
          const doc = await db.collection(collection).doc(ref.id).get();
          return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }
        if (ref?.path) {
          const doc = await db.doc(ref.path).get();
          return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }
      } catch (error) {
        console.error(`Clone ref lookup failed (${collection})`, error);
      }
      return null;
    };

    (async () => {
      try {
        const doc = await db.collection("Test").doc(cloneFrom).get();
        if (!doc.exists) {
          if (!cancelled) {
            setErr("Clone source not found.");
            setShowErr(true);
          }
          return;
        }

        const data = doc.data() || {};
        const dateValue = toDateString(data.date);
        const arrivalValue =
          toDateString(data.arrival_date) ||
          (typeof data.arrival_date === "string" ? data.arrival_date : "");

        if (!cancelled) {
          setItems((prev) => ({
            ...prev,
            name: data.name || "",
            pn: toArray(data.pn),
            sn: toArray(data.sn),
            localSN: "",
            date: dateValue || prev.date || "",
            price: data.price ?? "",
            status: data.status ?? "",
            poNumber: data.poNumber ?? "",
            trackingNumber: data.trackingNumber ?? "",
            length: data.length ?? "",
            width: data.width ?? "",
            height: data.height ?? "",
            arrival_date: arrivalValue || "",
            visible: data.visible !== undefined ? data.visible : true,
          }));
          setDescriptions(
            Array.isArray(data.descriptions) && data.descriptions.length
              ? data.descriptions
              : [{ description: "", date: "" }]
          );
          setWorkOrders(
            Array.isArray(data.workOrders) && data.workOrders.length
              ? data.workOrders
              : [{ workOrder: "", date: "" }]
          );
          setDOM(data.DOM || "");
          setNewLocalFrom(
            data.newLocalFrom || {
              region: "",
              section: { letter: "", number: "" },
              bin: "",
              pallet: "",
            }
          );
          setNewLocalCurrent(
            data.newLocalCurrent || {
              region: "",
              section: { letter: "", number: "" },
              bin: "",
              pallet: "",
            }
          );
          setAddToWebsite(Boolean(data.addedToWebsite));
          setSavedDocId(null);
          setSelectedDesc(0);
        }

        if (data.TheMachine && !cancelled) {
          setTheMachine(data.TheMachine);
          setMachineFieldsInitialized(false);
          if (!selectedOems.length) {
            setSelectedOems(
              uniqueSelection(
                normalizeSelection(data.TheMachine.oem || data.TheMachine.OEM)
              )
            );
          }
          if (!selectedModalities.length) {
            setSelectedModalities(
              uniqueSelection(
                normalizeSelection(
                  data.TheMachine.modality || data.TheMachine.Modality
                )
              )
            );
          }
          if (!selectedModels.length) {
            setSelectedModels(
              uniqueSelection(
                normalizeSelection(
                  data.TheMachine.model || data.TheMachine.Model
                )
              )
            );
          }
        }

        const parentDoc = await resolveDoc(data.Parent, "Test");
        if (parentDoc && !cancelled) {
          setSelectedParent({ id: parentDoc.id, name: parentDoc.name || "" });
        }

        const clientFromDoc = await resolveDoc(data.ClientFrom, "Client");
        if (clientFromDoc && !cancelled) {
          setSelectedClientFrom({ id: clientFromDoc.id, ...clientFromDoc });
        }

        const clientCurrentDoc = await resolveDoc(data.ClientCurrent, "Client");
        if (clientCurrentDoc && !cancelled) {
          setSelectedClientCurrent({ id: clientCurrentDoc.id, ...clientCurrentDoc });
        }

        const machineFromDoc = await resolveDoc(
          data.MachineFrom || data.Machine,
          "Machine"
        );
        if (machineFromDoc && !cancelled) {
          setSelectedMachine({
            id: machineFromDoc.id,
            name: machineFromDoc.name || machineFromDoc.Model || "",
          });
          if (!data.TheMachine) {
            setTheMachine(machineFromDoc);
            setMachineFieldsInitialized(false);
          }
        }

        const machineCurrentDoc = await resolveDoc(
          data.MachineCurrent || data.CurrentMachine,
          "Machine"
        );
        if (machineCurrentDoc && !cancelled) {
          setSelectedCurrentMachine({
            id: machineCurrentDoc.id,
            name: machineCurrentDoc.name || machineCurrentDoc.Model || "",
          });
          if (!data.TheMachine && !machineFromDoc) {
            setTheMachine(machineCurrentDoc);
            setMachineFieldsInitialized(false);
          }
        }
      } catch (error) {
        console.error("Clone load failed:", error);
        if (!cancelled) {
          setErr("Failed to load clone data.");
          setShowErr(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    router.isReady,
    router.query.cloneFrom,
    selectedOems,
    selectedModalities,
    selectedModels,
  ]);

  // -------------------- Since this is "add" mode, we do not fetch an existing document.
  // However, we still fetch global PN and SN options and clients for selection.
  useEffect(() => {
    async function fetchClientsData() {
      try {
        const clientsData = await fetchClients();
        console.log("Clients:", clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }
    fetchClientsData();
  }, []);

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

  // Keep selected models even if they are not in the catalog yet.
  // The tracker sync will add any missing models automatically.

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

  // Tracker updates are only performed on Save.

  const loadPnSnOptions = async () => {
    if (pnSnLoaded || pnSnLoading) return;
    setPnSnLoading(true);
    try {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("Test")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(500)
        .get();
      let pnSet = new Set();
      let snSet = new Set();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (Array.isArray(data.pn)) {
          data.pn.forEach((pn) => pn && pnSet.add(pn));
        } else if (data.pn) {
          pnSet.add(data.pn);
        }
        if (Array.isArray(data.sn)) {
          data.sn.forEach((sn) => sn && snSet.add(sn));
        } else if (data.sn) {
          snSet.add(data.sn);
        }
      });
      setPnOptions([...pnSet]);
      setSnOptions([...snSet]);
      setPnSnLoaded(true);
    } catch (error) {
      console.error("Error fetching PN/SN options:", error);
    } finally {
      setPnSnLoading(false);
    }
  };

  const [machineFieldsInitialized, setMachineFieldsInitialized] =
    useState(false);

  useEffect(() => {
    if (
      !machineFieldsInitialized &&
      (TheMachine || selectedCurrentMachine || selectedMachine)
    ) {
      const updatedFields = updateMachineFields(
        TheMachine,
        selectedCurrentMachine,
        selectedMachine
      );

      // Only set fields if they are empty
      if (!selectedOems.length) {
        setSelectedOems(
          uniqueSelection(normalizeSelection(updatedFields.oem))
        );
      }
      if (!selectedModalities.length) {
        setSelectedModalities(
          uniqueSelection(normalizeSelection(updatedFields.modality))
        );
      }
      if (!selectedModels.length) {
        setSelectedModels(
          uniqueSelection(normalizeSelection(updatedFields.model))
        );
      }

      setMachineFieldsInitialized(true);
    }
  }, [
    TheMachine,
    selectedCurrentMachine,
    selectedMachine,
    machineFieldsInitialized,
    selectedOems.length,
    selectedModalities.length,
    selectedModels.length,
  ]);

  const [signal, setSignal] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setSignal(router.query.signal || null);
    }
  }, [router.isReady, router.query.signal]);

  // -------------------- Handlers for PN and SN dropdowns

  // PN: when a user selects an existing PN value.
  const handlePnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedPn = Array.isArray(prev.pn) ? [...prev.pn] : [];
      updatedPn[0] = selected;
      return { ...prev, pn: updatedPn };
    });
  };

  const handlePnChange = (index, value) => {
    setItems((prev) => {
      const newPn = [...prev.pn];
      newPn[index] = value;
      return { ...prev, pn: newPn };
    });
  };

  const addPn = () => {
    if (newPn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        pn: [...prev.pn, newPn.trim()],
      }));
    }
    setNewPn("");
    setAddingNewPn(false);
  };

  // SN: when a user selects an existing SN value.
  const handleSnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedSn = Array.isArray(prev.sn) ? [...prev.sn] : [];
      updatedSn[0] = selected;
      return { ...prev, sn: updatedSn };
    });
  };

  const handleSnChange = (index, value) => {
    setItems((prev) => {
      const newSn = [...prev.sn];
      newSn[index] = value;
      return { ...prev, sn: newSn };
    });
  };

  const addSn = () => {
    if (newSn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        sn: [...prev.sn, newSn.trim()],
      }));
    }
    setNewSn("");
    setAddingNewSn(false);
  };

  // -------------------- Photo Browse Handlers
  const handleBrowsePhotos = () => {
    if (browseInputRef.current) {
      browseInputRef.current.click();
    }
  };

  const handleFilesSelected = (e) => {
    const files = e.target.files;
    if (files.length) {
      const newPhotos = [];
      for (let i = 0; i < files.length; i++) {
        newPhotos.push({
          file: files[i],
          url: URL.createObjectURL(files[i]),
        });
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
    e.target.value = "";
  };

  // -------------------- Photo Capture Handlers remain as in your index.js
  const handleCapture = (err, result) => {
    if (result) {
      setCapturedPhoto(result);
    }
  };

  const capturePhoto = () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      setCapturedPhoto(blob);
    }, "image/png");
  };

  const savePhoto = () => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      { file: capturedPhoto, url: URL.createObjectURL(capturedPhoto) },
    ]);
    setCapturedPhoto(null);
    setShowCameraModal(false);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // -------------------- Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseErr = () => setShowErr(false);
  const handleShowErr = () => setShowErr(true);
  const handleCloseSaveModal = () => setShowSaveModal(false);
  const handleShowSaveModal = () => setShowSaveModal(true);
  const handleCloseDescModal = () => setShowDescModal(false);
  const handleShowDescModal = () => setShowDescModal(true);
  const handleCloseWoModal = () => setShowWoModal(false);
  const handleShowWoModal = () => setShowWoModal(true);
  const handleCloseClientModal = () => setShowClientModal(false);
  const handleShowClientModal = () => setShowClientModal(true);
  const handleCloseMachineModal = () => setShowMachineModal(false);
  const handleShowMachineModal = () => {
    setShowMachineModal(true);
    setShowClientModal(false);
  };
  const handleCloseParentModal = () => setShowParentModal(false);
  const handleShowParentModal = () => setShowParentModal(true);

  const handleDeleteOemOption = async (oemName) => {
    if (!oemName) return;
    try {
      await deleteTrackerOem({ oem: oemName, catalog: trackerCatalog });
      setSelectedOems((prev) => prev.filter((value) => value !== oemName));
      await loadTracker(true);
    } catch (error) {
      console.error("Failed to delete OEM:", error);
    }
  };

  const handleDeleteModelOption = async (modelName) => {
    if (!modelName) return;
    if (!selectedModalities.length || !selectedOems.length) return;
    try {
      const ops = [];
      selectedModalities.forEach((modalityValue) => {
        selectedOems.forEach((oemValue) => {
          ops.push(
            deleteTrackerModel({
              modality: modalityValue,
              oem: oemValue,
              model: modelName,
              catalog: trackerCatalog,
            })
          );
        });
      });
      await Promise.allSettled(ops);
      setSelectedModels((prev) => prev.filter((value) => value !== modelName));
      await loadTracker(true);
    } catch (error) {
      console.error("Failed to delete model:", error);
    }
  };

  // -------------------- Work Orders / Descriptions Handlers (unchanged)
  const addDescription = () => {
    setDescriptions([...descriptions, { description: "", date: "" }]);
  };

  const removeDescription = (index) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index, field, value) => {
    const newDescriptions = descriptions.map((desc, i) =>
      i === index ? { ...desc, [field]: value } : desc
    );
    setDescriptions(newDescriptions);
  };

  const addWorkOrder = () => {
    setWorkOrders([...workOrders, { workOrder: "", date: "" }]);
  };

  const removeWorkOrder = (index) => {
    setWorkOrders(workOrders.filter((_, i) => i !== index));
  };

  const handleWorkOrderChange = (index, field, value) => {
    const newWorkOrders = workOrders.map((wo, i) =>
      i === index ? { ...wo, [field]: value } : wo
    );
    setWorkOrders(newWorkOrders);
  };

  const listDescriptions = () => {
    setShowDescModal(true);
  };

  const selectDescription = (index) => {
    setSelectedDesc(index);
    setShowDescModal(false);
  };

  // -------------------- Machine Selection (unchanged)
  const handleClientInfo = async (clientId) => {
    // Clear any previously selected machine/local loc for the branch
    if (machinePick) {
      setSelectedMachine(null);
      setShowLocalLocFrom(false);
    } else {
      setSelectedCurrentMachine(null);
      setShowLocalLocCurrent(false);
    }

    const db = firebase.firestore();
    const clientDoc = await db.collection("Client").doc(clientId).get();
    if (clientDoc.exists) {
      const clientData = clientDoc.data();
      if (machinePick) {
        setSelectedClientFrom({ id: clientDoc.id, ...clientData });
      } else {
        setSelectedClientCurrent({ id: clientDoc.id, ...clientData });
      }
      if (clientData.name === "SoCalWarehouse") {
        if (machinePick) setShowLocalLocFrom(true);
        else setShowLocalLocCurrent(true);
      }
      // Fetch machines for this client:
      const machinePromises = clientData.machines.map((machineRef) =>
        machineRef.get()
      );
      const machineDocs = await Promise.all(machinePromises);
      const machines = machineDocs.map((machineDoc) => ({
        id: machineDoc.id,
        ...machineDoc.data(),
      }));
      setMachineOptions(machines);
      handleCloseClientModal();
    }
  };

  const fetchMachine = async (machineId) => {
    const db = firebase.firestore();
    const doc = await db.collection("Machine").doc(machineId).get();
    if (doc.exists) {
      const machineData = doc.data();
      setTheMachine(machineData);

      // Ensure OEM, Modality, and Model update properly only if necessary
      if (!selectedOems.length) {
        setSelectedOems(
          uniqueSelection(normalizeSelection(machineData.oem || machineData.OEM))
        );
      }
      if (!selectedModalities.length) {
        setSelectedModalities(
          uniqueSelection(
            normalizeSelection(machineData.modality || machineData.Modality)
          )
        );
      }
      if (!selectedModels.length) {
        setSelectedModels(
          uniqueSelection(
            normalizeSelection(machineData.model || machineData.Model)
          )
        );
      }

      // Set machine frequency count
      const machinesSnapshot = await db
        .collection("Machine")
        .where("Model", "==", machineData.Model || machineData.model)
        .get();
      setMachineFrequency(machinesSnapshot.size);
    } else {
      console.error("Machine not found");
    }
  };

  // -------------------- Frequency/Usage (unchanged)
  const calculateItemFrequencyAndUsage = async (pn) => {
    const db = firebase.firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const itemsSnapshot = await db
      .collection("Test")
      .where("pn", "==", pn)
      .get();
    setFreqItem(itemsSnapshot.size);
    let usagePastYear = 0;
    itemsSnapshot.forEach((doc) => {
      const itemData = doc.data();
      itemData.workOrders.forEach((workOrder) => {
        const workOrderDate = new Date(workOrder.date);
        if (workOrderDate >= oneYearAgo && workOrderDate <= currentDate) {
          usagePastYear++;
        }
      });
    });
    setUsagePastYear(usagePastYear);
  };

  // -------------------- Photo Upload (unchanged)
  const uploadPhotos = async (docID) => {
    const storageRef = firebase.storage().ref();
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].file) {
        const photoRef = storageRef.child(
          `Parts/${docID}/${docID}${i === 0 ? ".jpg" : `.${i + 1}.jpg`}`
        );
        const metadata = { contentType: "image/png" };
        await photoRef.put(photos[i].file, metadata);
        const url = await photoRef.getDownloadURL();
        photos[i].url = url;
      }
    }
  };

  // -------------------- Submission Handler
  // For NewItem, only require Name and Description.
  async function handleSubmit(event) {
    event.preventDefault();
    if (!isReadyForActions) {
      handleShow();
    } else {
      safeSetLoading(true); // start loading before async work
      try {
        const docId = await toSend();
        if (!docId) {
          setErr("Save failed. Please try again.");
          setShowErr(true);
        }
      } catch (error) {
        console.error(error);
        setErr(error?.message || "Save failed.");
        setShowErr(true);
      } finally {
        safeSetLoading(false); // end loading after async work completes
      }
    }
  }

  async function toSend(redirect = true, options = {}) {
    const { id } = router.query;
    const db = firebase.firestore();
    const { forceNew = false } = options;
    const existingId = forceNew ? null : (savedDocId || id || null);

    // Get the current authenticated user
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown";

    // Always use the current state values for OEM, modality, and model.
    const storedOem = selectionToStoredValue(selectedOems);
    const storedModality = selectionToStoredValue(selectedModalities);
    const storedModel = selectionToStoredValue(selectedModels);

    const machineData = {
      ...(TheMachine || {}),
      oem: storedOem,
      OEM: storedOem,
      modality: storedModality,
      Modality: storedModality,
      model: storedModel,
      Model: storedModel,
    };

    const formattedItems = { ...items, descriptions, workOrders };
    // Remove any unused fields.
    formattedItems.status = items.status || "";
    formattedItems.nameLower = (items.name || "").toLowerCase();
    formattedItems.nameTokens = buildNameTokens(items.name);
    formattedItems.DOM = DOM; // Date of Manufacture
    const fromDetails = buildLocalLocObject(newLocalFrom);
    const currentDetails = buildLocalLocObject(newLocalCurrent);

    if (Object.keys(fromDetails).length) {
      formattedItems.newLocalFrom = fromDetails;
      formattedItems.localLocFrom = formatLoc(newLocalFrom) || "";
    } else {
      formattedItems.localLocFrom = "";
      formattedItems.newLocalFrom = {};
    }

    if (Object.keys(currentDetails).length) {
      formattedItems.newLocalCurrent = currentDetails;
      formattedItems.localLocCurrent = formatLoc(newLocalCurrent) || "";
    } else {
      formattedItems.localLocCurrent = "";
      formattedItems.newLocalCurrent = {};
    }
    formattedItems.date = items.date || "";
    formattedItems.arrival_date = items.arrival_date || ""; // NEW: Arrival Date
    formattedItems.poNumber = items.poNumber || "";
    formattedItems.trackingNumber = items.trackingNumber || "";
    formattedItems.TheMachine = machineData || {};
    formattedItems.addedToWebsite = addToWebsite;
    formattedItems.visible = items.visible;

    // Add the current user's email under the "user" field
    formattedItems.user = userEmail;
    formattedItems.lastEdited = userEmail;
    // Clean pn and sn arrays to replace undefined values with an empty string.
    formattedItems.pn = (items.pn || []).map((value) =>
      value === undefined ? "" : value
    );
    formattedItems.sn = (items.sn || []).map((value) =>
      value === undefined ? "" : value
    );

    // Set machine references for each branch.
    if (selectedMachine && selectedMachine.id) {
      formattedItems.MachineFrom = db
        .collection("Machine")
        .doc(selectedMachine.id);
    }
    if (selectedCurrentMachine && selectedCurrentMachine.id) {
      formattedItems.MachineCurrent = db
        .collection("Machine")
        .doc(selectedCurrentMachine.id);
    }

    // ***** NEW: Set client references for each branch *****
    if (selectedClientFrom && selectedClientFrom.id) {
      formattedItems.ClientFrom = db
        .collection("Client")
        .doc(selectedClientFrom.id);
    }
    if (selectedClientCurrent && selectedClientCurrent.id) {
      formattedItems.ClientCurrent = db
        .collection("Client")
        .doc(selectedClientCurrent.id);
    }
    // ******************************************************

    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    }

    // Only add dateCreated if this is a new document
    if (!existingId) {
      formattedItems.dateCreated = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    }

    // --- LOCAL SN LOGIC ---
    let docId = existingId;

    const queueAssociationUpdates = (targetDocId) => {
      const updates = [];
      if (selectedMachine && selectedMachine.id) {
        updates.push(
          db
            .collection("Machine")
            .doc(selectedMachine.id)
            .update({
              associatedParts: firebase.firestore.FieldValue.arrayUnion(
                db.collection("Test").doc(targetDocId)
              ),
            })
        );
      }
      if (selectedCurrentMachine && selectedCurrentMachine.id) {
        updates.push(
          db
            .collection("Machine")
            .doc(selectedCurrentMachine.id)
            .update({
              associatedParts: firebase.firestore.FieldValue.arrayUnion(
                db.collection("Test").doc(targetDocId)
              ),
            })
        );
      }
      if (updates.length) {
        Promise.allSettled(updates).then((results) => {
          results.forEach((result) => {
            if (result.status === "rejected") {
              console.error("Error updating associatedParts:", result.reason);
            }
          });
        });
      }
    };

    const queuePhotoUpload = (targetDocId) => {
      const hasNewPhotos = photos.some((photo) => photo && photo.file);
      if (!hasNewPhotos) return;
      uploadPhotos(targetDocId).catch((error) => {
        console.error("Error uploading photos:", error);
      });
    };

    try {
      if (docId) {
        // Check if a localSN is provided and if it differs from the current docId.
        const newDocId =
          items.localSN && items.localSN.trim() !== ""
            ? items.localSN.trim()
            : docId;
        if (docId !== newDocId) {
          // Migrate: Create a new document with the newDocId.
          await withTimeout(
            db.collection("Test").doc(newDocId).set(formattedItems),
            45000,
            "Firestore save"
          );

          queueAssociationUpdates(newDocId);
          queuePhotoUpload(newDocId);

          // Delete the old document.
          try {
            await withTimeout(
              db.collection("Test").doc(docId).delete(),
              20000,
              "Delete old item"
            );
          } catch (deleteError) {
            console.error("Error deleting old item:", deleteError);
          }

          // Set docId to the new document ID.
          docId = newDocId;
        } else {
          // Deep-clean the formattedItems to remove any undefined nested values.
          const cleanFormattedItems = shallowClean(formattedItems);
          await withTimeout(
            db.collection("Test").doc(docId).update(cleanFormattedItems),
            45000,
            "Firestore save"
          );

          queueAssociationUpdates(docId);
          queuePhotoUpload(docId);
        }
      } else {
        // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
        docId =
          items.localSN && items.localSN.trim() !== ""
            ? items.localSN.trim()
            : generateCustomID();
        await withTimeout(
          db.collection("Test").doc(docId).set(formattedItems),
          45000,
          "Firestore save"
        );

        queueAssociationUpdates(docId);
        queuePhotoUpload(docId);
      }

      console.log("Item saved!");
      try {
        const selections = {
          modalities: selectedModalities,
          oems: selectedOems,
          models: selectedModels,
        };
        const updated = await syncTrackerFromSelections({
          selections,
          catalog: trackerCatalog,
        });
        if (updated) {
          loadTracker(true);
        }
      } catch (error) {
        console.error("Failed to sync tracker selections:", error);
      }

      if (!forceNew) {
        setSavedDocId(docId);
      }

      // Redirect to the new URL using the new document id.
      if (redirect) {
        router.push(`/NewSearch/item/${docId}`);
      } else {
        // Optionally, show a save confirmation modal.
        handleShowSaveModal();
      }
      return docId;
    } catch (error) {
      console.error("Error saving data:", error);
      return null;
    }
  }

  const isReadyForActions =
    (items.name || "").trim() !== "" &&
    (descriptions[selectedDesc]?.description || "").trim() !== "";

  const ensureSaved = async () => {
    if (!isReadyForActions) {
      handleShow();
      return null;
    }
    if (savedDocId) return savedDocId;
    const docId = await toSend(false);
    if (!docId) {
      setErr("Failed to save item before action.");
      setShowErr(true);
    }
    return docId;
  };

  // -------------------- Info Modal Handlers (unchanged)
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const handleShowInfoModal = async () => {
    const db = firebase.firestore();
    try {
      const docId = savedDocId || router.query.id;
      if (!docId) {
        setErr("Save the item before viewing info.");
        setShowErr(true);
        return;
      }
      const doc = await db.collection("Test").doc(docId).get();
      if (doc.exists) {
        const data = doc.data();
        setItemName(data.name || "N/A");
        setShowInfoModal(true);
      } else {
        console.error("Item not found");
      }
    } catch (error) {
      console.error("Error fetching item info:", error);
    }
  };
  const handleCloseInfoModal = () => setShowInfoModal(false);

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event.value;
    setItems((prevItems) => ({ ...prevItems, [field]: value }));
  };

  const mostRecentWorkOrder =
    workOrders && workOrders.length > 0
      ? workOrders.reduce((latest, current) => {
          const latestDate = new Date(latest.date);
          const currentDate = new Date(current.date);
          return currentDate > latestDate ? current : latest;
        }, workOrders[0])
      : {};

  const handleShowCameraModal = () => {
    setShowCameraModal(true);
  };

  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  const handlePrint = async () => {
    const docId = await ensureSaved();
    if (!docId) return;

    const payload = {
      name: items.name,
      pn: items.pn,
      sn: items.sn,
      wo: workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "",
      status: items.status,
      local_sn: docId,
      descriptions: descriptions,
      date: items.date || new Date().toISOString().split("T")[0],
      DOM: DOM,
      oem: selectionToPrintValue(selectedOems),
      modality: selectionToPrintValue(selectedModalities),
      model: selectionToPrintValue(selectedModels),
      poNumber: items.poNumber,
      arrival_date: items.arrival_date,
      trackingNumber: items.trackingNumber,
    };

    console.log("Payload for printing:", payload);
    try {
      const response = await fetch(
        "https://9d70-174-76-22-138.ngrok-free.app/print-label",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      console.log("Print result:", result);
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };

  const handleSendToInflow = async () => {
    try {
      const docId = await ensureSaved();
      if (!docId) return;

      const name = (items.name || "").trim();
      if (!name) {
        alert("Item needs a name before sending to inFlow.");
        return;
      }

      const description = (descriptions[selectedDesc]?.description || "").trim();
      const imageUrls = photos.map((p) => p.url).filter(Boolean);
      const sku = docId.toString();

      const arrivalISO = items.arrival_date
        ? new Date(items.arrival_date).toISOString().slice(0, 10)
        : "";

      const pnStr = Array.isArray(items.pn)
        ? items.pn.filter(Boolean).join(", ")
        : items.pn || "";
      const snStr = Array.isArray(items.sn)
        ? items.sn.filter(Boolean).join(", ")
        : items.sn || "";

      const mostRecentWO =
        workOrders?.length
          ? workOrders.reduce((latest, cur) =>
              new Date(cur.date) > new Date(latest.date) ? cur : latest
            )
          : { workOrder: "", date: "" };

      const customFields = {
        custom1: selectionToPrintValue(selectedOems),
        custom2: selectionToPrintValue(selectedModalities),
        custom3: selectionToPrintValue(selectedModels),
        custom4: (description || "").trim(),
        custom5: (mostRecentWO.workOrder || "").trim(),
        custom6: (selectedClientFrom?.name || "").trim(),
        custom7: pnStr,
        custom8: snStr,
        custom9: arrivalISO,
        custom10: (selectedClientCurrent?.name || "").trim(),
      };

      const created = await InflowAPI.upsertProduct({
        name,
        description,
        sku,
        imageUrls,
        customFields,
      });

      alert(
        `Sent to inFlow successfully. ID: ${
          created?.productId || created?.id || "(unknown)"
        }`
      );
    } catch (err) {
      console.error(err);
      alert("Error sending to inFlow: " + err.message);
    }
  };

  const handleBluefolderButton = async () => {
    const docId = await ensureSaved();
    if (!docId) return;

    const currentWorkOrder =
      workOrders && workOrders.length > 0 ? workOrders[0].workOrder : "";
    if (!currentWorkOrder) {
      alert("Please fill out the work order field before adding to BlueFolder.");
      return;
    }

    const payload = {
      name: items.name,
      pn: items.pn[0] || "",
      sn: items.sn[0] || "",
      status: items.status,
      description: descriptions[selectedDesc]?.description || "",
      workOrder: currentWorkOrder,
      localsn: docId,
    };

    try {
      const response = await fetch(
        "https://9d70-174-76-22-138.ngrok-free.app/bluefolder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      alert("BlueFolder service item added successfully!");
      console.log("BlueFolder result:", result);
    } catch (error) {
      console.error("BlueFolder error:", error);
      alert("Error adding data to BlueFolder.");
    }
  };

  const handleAddToSlack = async (which = "shipping") => {
    try {
      const docId = await ensureSaved();
      if (!docId) return;

      const safeName = (items?.name || docId || "Untitled").trim();
      const title = `${safeName}${docId ? ` (${docId})` : ""}`;

      const pn0 = Array.isArray(items?.pn) ? items.pn[0] : items?.pn;
      const sn0 = Array.isArray(items?.sn) ? items.sn[0] : items?.sn;
      const pn_sn = [pn0 && `PN: ${pn0}`, sn0 && `SN: ${sn0}`]
        .filter(Boolean)
        .join("  ");

      const mostRecentWO =
        workOrders && workOrders.length
          ? [...workOrders].sort(
              (a, b) => new Date(b?.date || 0) - new Date(a?.date || 0)
            )[0]?.workOrder
          : "";

      const description =
        selectedDesc != null && descriptions?.[selectedDesc]
          ? descriptions[selectedDesc].description || ""
          : items?.description || "";

      const tracking = items?.trackingNumber ?? items?.tracking ?? "";
      const local_sn = docId || items?.localSN || "";

      const photoUrls = Array.isArray(photos)
        ? photos.map((p) => p?.url).filter(Boolean)
        : [];

      const idToken = await firebase.auth().currentUser?.getIdToken();
      const resp = await fetch("/api/slack/add-to-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          listKey: which,
          title,
          pn_sn,
          work_order: mostRecentWO || "",
          local_sn,
          tracking,
          description: (description || "").trim(),
          photoUrls,
        }),
      });

      const json = await resp.json();
      console.log("[SLACK][handleAddToSlack] response:", json);
      if (json?.debug?.steps) console.table(json.debug.steps);
      if (json?.debug?.photos) console.table(json.debug.photos);

      if (!resp.ok || !json?.ok) {
        setErr(`Slack add failed: ${json?.error || "unknown error"}`);
        setShowErr(true);
        return;
      }

      alert(
        `Added to Slack ${
          which === "shipping"
            ? "Shipping"
            : which === "receiving"
            ? "Receiving"
            : "Tasks"
        } list.`
      );
    } catch (e) {
      console.error(e);
      setErr("Error adding to Slack");
      setShowErr(true);
    }
  };

  const handleToggleAddToWebsite = async () => {
    const docId = await ensureSaved();
    if (!docId) return;

    const next = !addToWebsite;
    setAddToWebsite(next);
    try {
      await firebase
        .firestore()
        .collection("Test")
        .doc(docId)
        .update({ addedToWebsite: next });
    } catch (error) {
      console.error("Error updating addedToWebsite:", error);
    }
  };

  const handleAddNewPn = () => {
    if (newPn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        pn: [...prev.pn, newPn.trim()],
      }));
    }
    setNewPn("");
    setAddingNewPn(false);
  };

  const handleAddNewSn = () => {
    if (newSn.trim() !== "") {
      setItems((prev) => ({
        ...prev,
        sn: [...prev.sn, newSn.trim()],
      }));
    }
    setNewSn("");
    setAddingNewSn(false);
  };

  const [showLocalLocFrom, setShowLocalLocFrom] = useState(false);
  const [showLocalLocCurrent, setShowLocalLocCurrent] = useState(false);
  const [showNewLocalModalFrom, setShowNewLocalModalFrom] = useState(false);
  const [showNewLocalModalCurrent, setShowNewLocalModalCurrent] =
    useState(false);

  async function handleClone(event) {
    event.preventDefault();
    if (!isReadyForActions) {
      handleShow(); // your existing error modal
      return;
    }
    safeSetLoading(true);
    try {
      // save but don’t redirect
      const docId = await toSend(false, { forceNew: true });
      if (!docId) {
        setErr("Save failed. Please try again.");
        setShowErr(true);
      } else {
        // Prepare for the next clone without overwriting the last one.
        setSavedDocId(null);
        setItems((prev) => ({ ...prev, localSN: "" }));
      }
    } catch (err) {
      console.error(err);
      setErr(err?.message || "Save failed.");
      setShowErr(true);
    } finally {
      safeSetLoading(false);
    }
  }

  const condition = (name) => {
    return name && name.toLowerCase() === "interior socal";
  };

  const handleSetSelectedMachine = (machine) => {
    const isSocalInterior = machine.name?.toLowerCase() === "interior socal";
    if (machinePick) {
      setSelectedMachine({ id: machine.id, name: machine.name });
      setShowLocalLocFrom(
        isSocalInterior ||
          selectedClientFrom?.name?.toLowerCase() === "socalwarehouse"
      );
    } else {
      setSelectedCurrentMachine({ id: machine.id, name: machine.name });
      setShowLocalLocCurrent(
        isSocalInterior ||
          selectedClientCurrent?.name?.toLowerCase() === "socalwarehouse"
      );
    }
    fetchMachine(machine.id);
    setShowMachineModal(false);
  };

  const [currentPnIndex, setCurrentPnIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSnIndex, setCurrentSnIndex] = useState(0);
  const [showSnDropdown, setShowSnDropdown] = useState(false);

  useEffect(() => {
    if (showDropdown || showSnDropdown) {
      loadPnSnOptions();
    }
  }, [showDropdown, showSnDropdown]);

  const handleAddNewClient = () => {
    // Generate a random client number as part of the URL.
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    // When pushing, include a query parameter (from=item) and the current item id if available.
    router.push(`/NewSearch/client/AIS${randomNum}/addClient?from=addItem`);
  };

  const [showMachineSelect, setShowMachineSelect] = useState(false);

  const [selectedClientFrom, setSelectedClientFrom] = useState(null);
  const [selectedClientCurrent, setSelectedClientCurrent] = useState(null);

  useEffect(() => {
    setShowLocalLocFrom(
      selectedClientFrom?.name?.toLowerCase() === "socalwarehouse"
    );
  }, [selectedClientFrom]);

  useEffect(() => {
    setShowLocalLocCurrent(
      selectedClientCurrent?.name?.toLowerCase() === "socalwarehouse"
    );
  }, [selectedClientCurrent]);

  return (
    <LoggedIn>
      {/* Error Modal */}
      <MachineSelectionModal
        show={machineSelectionModal}
        handleClose={() => setMachineSelectionModal(false)}
        setMachine={handleSetSelectedMachine}
        machineOptions={machineOptions} // if your modal needs the list of machines
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Missing required field: Name and Description</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Other Modals: showErr, showSaveModal, Descriptions, Work Orders, etc. */}
      <Modal show={showErr} onHide={handleCloseErr}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Err}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseErr}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSaveModal} onHide={handleCloseSaveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Save Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data has been saved successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSaveModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDescModal} onHide={handleCloseDescModal}>
        <Modal.Header closeButton>
          <Modal.Title>Descriptions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-3" onClick={addDescription}>
            Add Description
          </Button>
          {descriptions.map((desc, index) => (
            <Row key={index} className="mb-3">
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => selectDescription(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-between">
                  <span>{desc.description || "Description"}</span>
                  <span
                    style={{
                      borderLeft: "1px solid #ccc",
                      paddingLeft: "10px",
                    }}
                  >
                    {desc.date || "Date"}
                  </span>
                </div>
              </Button>
            </Row>
          ))}
          <Button variant="primary" onClick={handleCloseDescModal}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
      <Modal show={showWoModal} onHide={handleCloseWoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Work Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            className="mb-3"
            onClick={addWorkOrder}
            style={{ marginBottom: "1rem" }}
          >
            Add Work Order
          </Button>
          {workOrders.map((wo, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Work Order"
                  value={wo.workOrder}
                  onChange={(e) =>
                    handleWorkOrderChange(index, "workOrder", e.target.value)
                  }
                  style={{ marginBottom: "0.5rem" }}
                />
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={wo.date}
                  onChange={(e) =>
                    handleWorkOrderChange(index, "date", e.target.value)
                  }
                />
              </Col>
              <Col>
                <Button variant="danger" onClick={() => removeWorkOrder(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="primary" onClick={handleCloseWoModal}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
      {/* Machine Selection Modal */}
      <ClientInfoModal
        show={showMachineModal}
        handleClose={handleCloseMachineModal}
        selectedClient={selectedClient}
        machineOptions={machineOptions}
        setSelectedMachine={handleSetSelectedMachine}
      />
      <Modal show={showClientModal} onHide={handleCloseClientModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Search by name"
            className="mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ClientTable
            clients={clients.filter((client) =>
              client.name.toLowerCase().includes(search.toLowerCase())
            )}
            onSelectClient={handleClientInfo}
            onInfoClick={handleClientInfo}
            clearSelection={() => handleClientInfo(null)}
            onAddClient={handleAddNewClient} // new prop
          />
        </Modal.Body>
      </Modal>

      <ParentModal
        show={showParentModal}
        handleClose={handleCloseParentModal}
        setSelectedParent={setSelectedParent}
      />
      <MachineSelectionModal
        show={machineSelectionModal}
        handleClose={() => setMachineSelectionModal(false)}
        setMachine={setTheMachine}
      />
      {/* Camera Modal */}
      <Modal show={showCameraModal} onHide={handleCloseCameraModal}>
        <Modal.Header closeButton>
          <Modal.Title>Take a Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="camera">
            {!capturedPhoto ? (
              <BarcodeScannerComponent
                width="100%"
                height={300}
                onUpdate={handleCapture}
                facingMode={cameraFacing}
              />
            ) : (
              <div className="photo-preview">
                <img
                  src={URL.createObjectURL(capturedPhoto)}
                  alt="captured"
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!capturedPhoto ? (
            <>
              <Button
                onClick={capturePhoto}
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: "10px",
                }}
              >
                📷
              </Button>
              <Button
                onClick={() =>
                  setCameraFacing((prev) =>
                    prev === "environment" ? "user" : "environment"
                  )
                }
              >
                Flip Camera
              </Button>
              <Button variant="secondary" onClick={handleCloseCameraModal}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setCapturedPhoto(null)}
              >
                Retake
              </Button>
              <Button variant="primary" onClick={savePhoto}>
                OK
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      {/* Descriptions Modal */}
      <Modal show={showDescModal} onHide={handleCloseDescModal}>
        <Modal.Header closeButton>
          <Modal.Title>Descriptions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-3" onClick={addDescription}>
            Add Description
          </Button>
          {descriptions.map((desc, index) => (
            <Row key={index} className="mb-3">
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => selectDescription(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-between">
                  <span>{desc.description || "Description"}</span>
                  <span
                    style={{
                      borderLeft: "1px solid #ccc",
                      paddingLeft: "10px",
                    }}
                  >
                    {desc.date || "Date"}
                  </span>
                </div>
              </Button>
            </Row>
          ))}
          <Button variant="primary" onClick={handleCloseDescModal}>
            OK
          </Button>
        </Modal.Body>
      </Modal>

      {/* Info Modal */}
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        itemName={items.name}
        dimensions={`${items.length},${items.width},${items.height}`}
        price={items.price}
        freqI={freqItem}
        freqM={machineFrequency}
        usage={usagePastYear}
      />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999, // Make sure it's above everything else
          }}
        >
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {/* Main Form */}
      <Container fluid className={styles.page}>
        <div className={styles.shell}>
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <div className={styles.header}>
                <div className={styles.kicker}>New Item</div>
                <h2 className={styles.title}>Add New Item</h2>
                <div className={styles.subtitle}>
                  Capture details, photos, and routing before saving.
                </div>
              </div>
              <Form onSubmit={handleSubmit}>
                {/* Row for Name and PN */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={items.name}
                        onChange={handleChange("name")}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="pn">
                      <Form.Label>Product Number</Form.Label>
                      <div style={{ position: "relative" }}>
                        <InputGroup>
                          {/* Editable input field displaying the current PN */}
                          <Form.Control
                            type="text"
                            value={items.pn[currentPnIndex] || ""}
                            onChange={(e) =>
                              handlePnChange(currentPnIndex, e.target.value)
                            }
                          />
                          {/* Arrow button to toggle dropdown */}
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            &#9662;
                          </Button>
                          {/* Plus button to add a new PN */}
                          <InputGroup.Text>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setAddingNewPn(true)}
                            >
                              +
                            </Button>
                          </InputGroup.Text>
                        </InputGroup>
                        {/* Dropdown list showing only the current item's PN options */}
                        {showDropdown && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                              zIndex: 1000,
                              maxHeight: "150px",
                              overflowY: "auto",
                            }}
                          >
                            {items.pn.map((pnOption, idx) => (
                              <div
                                key={idx}
                                style={{ padding: "8px", cursor: "pointer" }}
                                onClick={() => {
                                  setCurrentPnIndex(idx);
                                  setShowDropdown(false);
                                }}
                              >
                                {pnOption}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Input for adding a new PN, if triggered */}
                      {addingNewPn && (
                        <Form.Control
                          type="text"
                          placeholder="Enter new PN"
                          value={newPn}
                          onChange={(e) => setNewPn(e.target.value)}
                          onBlur={handleAddNewPn}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddNewPn();
                            }
                          }}
                        />
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                {/* Row for SN */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="sn">
                      <Form.Label>Serial Number</Form.Label>
                      <div style={{ position: "relative" }}>
                        <InputGroup>
                          {/* Inline editable input showing the currently selected SN */}
                          <Form.Control
                            type="text"
                            value={items.sn[currentSnIndex] || ""}
                            onChange={(e) =>
                              handleSnChange(currentSnIndex, e.target.value)
                            }
                          />
                          {/* Arrow button to toggle SN dropdown */}
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowSnDropdown(!showSnDropdown)}
                          >
                            &#9662;
                          </Button>
                          {/* Plus button to add a new SN */}
                          <InputGroup.Text>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setAddingNewSn(true)}
                            >
                              +
                            </Button>
                          </InputGroup.Text>
                        </InputGroup>
                        {/* Dropdown list for SN options */}
                        {showSnDropdown && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                              zIndex: 1000,
                              maxHeight: "150px",
                              overflowY: "auto",
                            }}
                          >
                            {items.sn.map((snOption, idx) => (
                              <div
                                key={idx}
                                style={{ padding: "8px", cursor: "pointer" }}
                                onClick={() => {
                                  setCurrentSnIndex(idx);
                                  setShowSnDropdown(false);
                                }}
                              >
                                {snOption}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Input for adding a completely new SN */}
                      {addingNewSn && (
                        <Form.Control
                          type="text"
                          placeholder="Enter new SN"
                          value={newSn}
                          onChange={(e) => setNewSn(e.target.value)}
                          onBlur={handleAddNewSn}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddNewSn();
                            }
                          }}
                        />
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="status">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={items.status || ""}
                        onChange={handleChange("status")}
                      >
                        <option value="">Select status</option>
                        <option value="Good">Good</option>
                        <option value="Bad">Bad</option>
                        <option value="Unknown">Unknown</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Row for Local SN, Arrival Date, Tracking */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="localSN">
                      <Form.Label>Local SN</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Local SN"
                        value={items.localSN || ""}
                        onChange={handleChange("localSN")}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="arrivalDate">
                      <Form.Label>Arrival Date</Form.Label>
                      <Form.Control
                        placeholder="Enter Arrival Date"
                        type="date"
                        value={items.arrival_date}
                        onChange={(e) => {
                          const value = e.target.value;
                          setItems((prev) => ({
                            ...prev,
                            arrival_date: value,
                          }));
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="trackingNumber">
                      <Form.Label>Tracking Number</Form.Label>
                      <Form.Control
                        placeholder="Tracking Number"
                        type="text"
                        value={items.trackingNumber}
                        onChange={handleChange("trackingNumber")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Row for OEM, Modality, Model */}
                <Row className="mb-3">
                  <Col>
                    <MultiSelectDropdown
                      label="OEM"
                      placeholder={trackerLoading ? "Loading..." : "Select OEM"}
                      options={oemOptionsForUI}
                      selected={selectedOems}
                      onChange={setSelectedOems}
                      enableDelete
                      onDeleteOption={handleDeleteOemOption}
                      disabled={trackerLoading}
                    />
                  </Col>
                  <Col>
                    <MultiSelectDropdown
                      label="Modality"
                      placeholder={trackerLoading ? "Loading..." : "Select Modality"}
                      options={modalityOptionsForUI}
                      selected={selectedModalities}
                      onChange={setSelectedModalities}
                      disabled={trackerLoading}
                    />
                  </Col>
                  <Col>
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
                      disabled={
                        trackerLoading ||
                        !selectedModalities.length ||
                        !selectedOems.length
                      }
                    />
                  </Col>
                </Row>
                {/* Work Orders and Descriptions Section */}
                <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      onClick={handleShowWoModal}
                      className="me-2"
                    >
                      Manage Work Orders
                    </Button>
                    {workOrders.length > 0 && (
                      <div className="d-flex flex-column align-items-start">
                        <Form.Label>Work Order</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Most Recent Work Order"
                          value={mostRecentWorkOrder?.workOrder || ""}
                          onChange={(e) =>
                            handleWorkOrderChange(
                              workOrders.indexOf(mostRecentWorkOrder),
                              "workOrder",
                              e.target.value
                            )
                          }
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Work Order Date"
                          value={mostRecentWorkOrder?.date || ""}
                          onChange={(e) =>
                            handleWorkOrderChange(
                              workOrders.indexOf(mostRecentWorkOrder),
                              "date",
                              e.target.value
                            )
                          }
                          style={{ marginBottom: "0.5rem" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* Description Editing */}
                <div style={{ marginBottom: "1rem" }}>
                  <Form.Group controlId="desc">
                    <Button
                      variant="outline-secondary"
                      onClick={listDescriptions}
                      className="mb-2 me-2"
                    >
                      List Descriptions
                    </Button>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      value={descriptions[selectedDesc]?.description || ""}
                      onChange={(e) =>
                        handleDescriptionChange(
                          selectedDesc,
                          "description",
                          e.target.value
                        )
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                    <Form.Control
                      type="date"
                      value={descriptions[selectedDesc]?.date || ""}
                      onChange={(e) =>
                        handleDescriptionChange(
                          selectedDesc,
                          "date",
                          e.target.value
                        )
                      }
                      style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                    />
                  </Form.Group>
                </div>
                {/* Machine Selection Row with Local Loc Inputs */}
                <div style={{ marginBottom: "1rem" }}>
                  <Row className="mb-3">
                    <Col>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setMachinePick(true);
                          handleShowClientModal();
                        }}
                        className="me-2"
                      >
                        Select From
                      </Button>
                      {selectedClientFrom && (
                        <div
                          style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            marginBottom: "1rem",
                          }}
                        >
                          <p>
                            <strong>Selected Client (From):</strong>{" "}
                            {selectedClientFrom.name}
                          </p>
                          <div style={{ marginTop: "0.5rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowMachineModal(true)}
                            >
                              Select Machine for {selectedClientFrom.name}
                            </Button>
                            {selectedMachine && (
                              <>
                                <p style={{ marginTop: "0.5rem" }}>
                                  <strong>Selected Machine (From):</strong>{" "}
                                  {selectedMachine.name}
                                </p>
                                {showLocalLocFrom && (
                                  <>
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        setShowNewLocalModalFrom(true)
                                      }
                                      className="w-100 mb-2"
                                    >
                                      {[
                                        newLocalFrom.region,
                                        newLocalFrom.section?.letter +
                                          newLocalFrom.section?.number,
                                        newLocalFrom.bin &&
                                          `B${newLocalFrom.bin}`,
                                        newLocalFrom.pallet &&
                                          `P${newLocalFrom.pallet}`,
                                      ]
                                        .filter(Boolean)
                                        .join("-") || "Set Local Location"}
                                    </Button>
                                    <Modal
                                      show={showNewLocalModalFrom}
                                      onHide={() =>
                                        setShowNewLocalModalFrom(false)
                                      }
                                      centered
                                    >
                                      <Modal.Header>
                                        <Modal.Title>
                                          Edit Local Loc (From)
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <NewLocal
                                          selectedClient={selectedClientFrom}
                                          showLocalLoc={showNewLocalModalFrom}
                                          value={newLocalFrom}
                                          onChange={setNewLocalFrom}
                                          onSave={(p) => {
                                            setNewLocalFrom(p);
                                            setShowNewLocalModalFrom(false);
                                          }}
                                          onCancel={() =>
                                            setShowNewLocalModalFrom(false)
                                          }
                                        />
                                      </Modal.Body>
                                    </Modal>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setMachinePick(false);
                          handleShowClientModal();
                        }}
                        className="me-2"
                      >
                        Select Current
                      </Button>
                      {selectedClientCurrent && (
                        <div
                          style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            marginBottom: "1rem",
                          }}
                        >
                          <p>
                            <strong>Selected Client (Current):</strong>{" "}
                            {selectedClientCurrent.name}
                          </p>
                          <div style={{ marginTop: "0.5rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowMachineModal(true)}
                            >
                              Select Machine for {selectedClientCurrent.name}
                            </Button>
                            {selectedCurrentMachine && (
                              <>
                                <p style={{ marginTop: "0.5rem" }}>
                                  <strong>Selected Machine (Current):</strong>{" "}
                                  {selectedCurrentMachine.name}
                                </p>
                                {showLocalLocCurrent && (
                                  <>
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        setShowNewLocalModalCurrent(true)
                                      }
                                      className="w-100 mb-2"
                                    >
                                      {[
                                        newLocalCurrent.region,
                                        newLocalCurrent.section?.letter +
                                          newLocalCurrent.section?.number,
                                        newLocalCurrent.bin &&
                                          `B${newLocalCurrent.bin}`,
                                        newLocalCurrent.pallet &&
                                          `P${newLocalCurrent.pallet}`,
                                      ]
                                        .filter(Boolean)
                                        .join("-") || "Set Local Location"}
                                    </Button>
                                    <Modal
                                      show={showNewLocalModalCurrent}
                                      onHide={() =>
                                        setShowNewLocalModalCurrent(false)
                                      }
                                      centered
                                    >
                                      <Modal.Header>
                                        <Modal.Title>
                                          Edit Local Loc (Current)
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <NewLocal
                                          selectedClient={selectedClientCurrent}
                                          showLocalLoc={
                                            showNewLocalModalCurrent
                                          }
                                          value={newLocalCurrent}
                                          onChange={setNewLocalCurrent}
                                          onSave={(p) => {
                                            setNewLocalCurrent(p);
                                            setShowNewLocalModalCurrent(false);
                                          }}
                                          onCancel={() =>
                                            setShowNewLocalModalCurrent(false)
                                          }
                                        />
                                      </Modal.Body>
                                    </Modal>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        onClick={handleShowParentModal}
                        className="me-2"
                      >
                        Select Parent
                      </Button>
                      {selectedParent && (
                        <Form.Control
                          type="text"
                          placeholder="Selected Parent"
                          value={selectedParent.name}
                          readOnly
                          style={{ cursor: "default", marginTop: "0.5rem" }}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
                {/* Photo Action Row */}
                <div style={{ marginBottom: "1rem" }}>
                  <Row className={`mb-3 ${styles.photoActionsRow}`}>
                    <Col xs={12} md={6}>
                      <ButtonGroup>
                        <Button
                          variant="outline-secondary"
                          onClick={handleShowCameraModal}
                        >
                          Take Photo
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={handleBrowsePhotos}
                        >
                          Browse
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col xs={12} md={6} className={styles.photoActionsRight}>
                      <Button
                        variant="success"
                        onClick={handleSendToInflow}
                        disabled={!isReadyForActions}
                        style={{ marginLeft: "auto" }}
                      >
                        Send to inFlow
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleBluefolderButton}
                        disabled={!isReadyForActions}
                        style={{ marginLeft: "0.5rem", marginRight: ".5rem" }}
                      >
                        BlueFolder
                      </Button>
                      <Button
                        variant={addToWebsite ? "primary" : "outline-primary"}
                        onClick={handleToggleAddToWebsite}
                        disabled={!isReadyForActions}
                      >
                        {addToWebsite ? "Added to Website" : "Add to Website"}
                      </Button>
                      <Form.Check
                        type="checkbox"
                        id="hide-checkbox"
                        label="Hide"
                        checked={!items.visible}
                        onChange={(e) => {
                          const isHidden = e.currentTarget.checked;
                          setItems((prev) => ({
                            ...prev,
                            visible: !isHidden,
                          }));
                        }}
                        className="ms-3"
                      />
                    </Col>
                  </Row>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={browseInputRef}
                    style={{ display: "none" }}
                    onChange={handleFilesSelected}
                  />
                </div>
                {/* Photo Gallery */}
                <div className="mt-3 d-flex flex-wrap">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center mb-2 me-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {photo.file && (
                        <Button
                          variant="danger"
                          size="sm"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            padding: "0 5px",
                          }}
                          onClick={() => removePhoto(index)}
                        >
                          X
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {/* Extra Section: Dimensions, Price, and DOM */}

                {/* Submit Row */}
                <div className={`mt-3 d-flex flex-wrap align-items-center ${styles.actionRow}`}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: "1rem" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="info"
                    onClick={handleClone}
                    style={{ marginRight: "1rem" }}
                  >
                    Clone
                  </Button>
                  <LoadingButton
                    type="secondary"
                    name="Back"
                    route="NewSearch/mainSearch"
                  />
                  {SHOW_SLACK_BUTTONS && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: ".5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          lineHeight: "12px",
                          textAlign: "center",
                        }}
                      >
                        Slack
                      </span>
                      <div
                        style={{
                          display: "flex",
                          border: "1px solid #ced4da",
                          borderRadius: 6,
                          overflow: "hidden",
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          onClick={() => handleAddToSlack("receiving")}
                          disabled={!isReadyForActions}
                          style={{
                            border: "none",
                            borderRight: "1px solid #ced4da",
                          }}
                        >
                          Receiving
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleAddToSlack("shipping")}
                          disabled={!isReadyForActions}
                          style={{ border: "none" }}
                        >
                          Shipping
                        </Button>
                      </div>
                    </div>
                  )}
                  <Button
                    variant="info"
                    onClick={handlePrint}
                    disabled={!isReadyForActions}
                    style={{ marginLeft: "auto" }}
                  >
                    Print Label
                  </Button>
                </div>
                <div style={{ textAlign: "center", margin: "1rem 0" }}>
                  <Button
                    variant="link"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "24px",
                    }}
                    onClick={() => setShowExtra(!showExtra)}
                  >
                    ▼
                  </Button>
                </div>
                <Collapse in={showExtra}>
                  <div id="extra-collapse" className="mt-3">
                    <Row>
                      <Form.Group as={Col} controlId="dimensions">
                        <Form.Label>Dimensions (L x W x H)</Form.Label>
                        <Row>
                          <Col>
                            <Form.Control
                              placeholder="Length"
                              type="text"
                              value={items.length}
                              onChange={handleChange("length")}
                            />
                          </Col>
                          x
                          <Col>
                            <Form.Control
                              placeholder="Width"
                              type="text"
                              value={items.width}
                              onChange={handleChange("width")}
                            />
                          </Col>
                          x
                          <Col>
                            <Form.Control
                              placeholder="Height"
                              type="text"
                              value={items.height}
                              onChange={handleChange("height")}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          placeholder="Price"
                          type="text"
                          value={items.price}
                          onChange={handleChange("price")}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3">
                      <Form.Group as={Col} controlId="DOM">
                        <Form.Label>DOM (Date of Manufacture)</Form.Label>
                        <Form.Control
                          placeholder="Enter DOM"
                          type="date"
                          value={DOM}
                          onChange={(e) => setDOM(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="poNumber">
                        <Form.Label>PO Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="PO Number"
                          value={items.poNumber || ""}
                          onChange={handleChange("poNumber")}
                        />
                      </Form.Group>
                    </Row>
                  </div>
                </Collapse>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}







