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
  Table,
} from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";
import LoggedIn from "../../LoggedIn";
import { useRouter } from "next/router";
import {
  fetchClients,
  fetchMachinesForClient,
} from "../../../utils/fetchAssociations";
import ClientTable from "../../../utils/ClientTable";
import ClientInfoModal from "../ClientInfoModal";
import ParentModal from "./parentModal";
import MachineSelectionModal from "../item/[id]/MachineSelectionModal";
import InfoModal from "../InfoModal";
import InflowAPI from "../../../utils/inflowAPI";
import NewLocal, { LocationControls } from "../item/[id]/NewLocal";
import {
  buildLocalLocObject,
  formatLoc,
  updateMachineFields,
  buildNameTokens,
  buildGeneralSearchTokens,
  buildWorkOrderTokens,
  findExistingItemByAis,
} from "../../../utils/itemFormShared";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import ItemMovementDateField from "../../../components/ItemMovementDateField";
import {
  fetchTrackerCatalog,
  buildAllOems,
  buildModelsForSelection,
  syncTrackerFromSelections,
  deleteTrackerOem,
  deleteTrackerModel,
} from "../../../utils/trackerCatalog";
import {
  buildMachineSummary,
  buildMachineDetailHydrationSeed,
  commitItemWithMachineBacklinks,
  createMachineDetailHydrationState,
  findMachineDetailRequestBranch,
  stripAssociatedPartsFromMachineSnapshot,
  summarizeMachineDetailHydration,
} from "../../../utils/warehouseAssociations";
import {
  appendSaveHistory,
} from "../../../utils/itemAudit";
import { preparePhotosForAnalysis } from "../../../utils/itemImageAnalysis";
import {
  createItemPhotoStorageName,
  normalizeItemPhotoCategory,
} from "../../../utils/itemPhotos";
import { addItemToShippingGroup } from "../../../utils/inventoryGroups";
import ItemPhotoTabs from "../../../components/ItemPhotoTabs";
import ShippingGroupField from "../../../components/ShippingGroupField";
import ItemAssociationTypeControl, {
  buildItemAssociationSnapshot,
  inferItemAssociationType,
  itemAssociationTypeForStorage,
  ITEM_ASSOCIATION_MACHINE,
  ITEM_ASSOCIATION_SITE,
  ITEM_ASSOCIATION_TRAILER,
} from "../../../components/ItemAssociationTypeControl";
import associatedPartRoles from "../../../lib/associatedPartRoles.cjs";
import styles from "./NewItem.module.css";
const {
  trailerClientId,
  trailerMachineId,
  trailerName,
  trailersForClient,
} = require("../../../lib/ops/trailerClientLinks.cjs");
const { firstEntityRoleValue } = associatedPartRoles;

const LEGACY_TRAILER_CLIENT_ID = "AIS62854";
const LEGACY_ITEM_ASSOCIATION_FIELDS = [
  "Machine",
  "fromMachine",
  "fromMachineId",
  "machineId",
  "fromClient",
  "clientFrom",
  "Client",
  "fromClientId",
  "fromTrailer",
  "trailerFrom",
  "fromTrailerId",
  "CurrentMachine",
  "currentMachine",
  "currentMachineId",
  "currentClient",
  "clientCurrent",
  "CurrentClient",
  "currentClientId",
  "currentTrailer",
  "trailerCurrent",
  "currentTrailerId",
  "associationTypeFrom",
  "associationTypeCurrent",
];
const ITEM_RENAME_FIELDS_TO_REPLACE = Array.from(
  new Set([
    ...LEGACY_ITEM_ASSOCIATION_FIELDS,
    "MachineFrom",
    "MachineCurrent",
    "ClientFrom",
    "ClientCurrent",
    "TrailerFrom",
    "TrailerCurrent",
    "fromAssociationType",
    "currentAssociationType",
    "clientFromId",
    "clientCurrentId",
    "machineFromId",
    "machineCurrentId",
    "trailerFromId",
    "trailerCurrentId",
    "associationFrom",
    "associationCurrent",
    "Parent",
  ])
);

function isSelectableItemClient(client) {
  return (
    String(client?.id || "").trim() !== LEGACY_TRAILER_CLIENT_ID &&
    String(client?.name || "").trim().toLowerCase() !== "ais trailers"
  );
}

function createEmptyItemFormState(localSN = "") {
  return {
    name: "",
    pn: [""],
    sn: [""],
    localSN,
    date: new Date().toISOString().split("T")[0],
    price: "",
    status: "",
    poNumber: "",
    trackingNumber: "",
    length: "",
    width: "",
    height: "",
    arrival_date: "",
    departure_date: "",
    movementDateType: "arrival",
    visible: true,
  };
}

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
    <Link
      href={`/${route}`}
      className={`btn btn-${type}`}
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}>

      {isLoading ? "Loading…" : name}

    </Link>
  );
}

function OemEvidenceCard({ evidence }) {
  if (!evidence) return null;
  const statusText = evidence.supportsMatch
    ? "Supports this comparison"
    : evidence.found
    ? "Official reference found"
    : "No exact official result";
  return (
    <div className={styles.analysisOemEvidence}>
      <div className={styles.analysisOemEvidenceHeader}>
        <div>
          <div className={styles.analysisOemKicker}>Official OEM website</div>
          <strong>
            {evidence.productName || evidence.oem || "Manufacturer reference"}
          </strong>
        </div>
        <span
          className={
            evidence.supportsMatch
              ? styles.analysisOemSupported
              : styles.analysisOemReference
          }
        >
          {statusText}
        </span>
      </div>
      {evidence.summary && <p>{evidence.summary}</p>}
      {(evidence.officialPartNumbers || []).length > 0 && (
        <div className={styles.analysisOemDetails}>
          <span>Official PN</span>
          <strong>{evidence.officialPartNumbers.join(", ")}</strong>
        </div>
      )}
      {(evidence.models || []).length > 0 && (
        <div className={styles.analysisOemDetails}>
          <span>Models</span>
          <strong>{evidence.models.join(", ")}</strong>
        </div>
      )}
      {(evidence.sources || []).length > 0 && (
        <div className={styles.analysisOemSources}>
          {evidence.sources.map((source, index) => (
            <a
              key={`${source.url}-${index}`}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.title || `Official source ${index + 1}`}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewItem() {
  const router = useRouter();
  const { signOut, authUser } = useAuth();
  const isAdminUser =
    authUser?.isAdmin === true ||
    String(authUser?.role || "").toLowerCase() === "admin";
  const SHOW_SLACK_BUTTONS =
    process.env.NEXT_PUBLIC_SHOW_SLACK_BUTTONS === "true";
  // Initialize item state – for a new item, these start empty.
  // We store PN and SN as arrays.
  const [items, setItems] = useState(() => createEmptyItemFormState());

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
  const [trailers, setTrailers] = useState([]);
  const [selectedClientFrom, setSelectedClientFrom] = useState(null);
  const [selectedClientCurrent, setSelectedClientCurrent] = useState(null);
  const [selectedTrailerFrom, setSelectedTrailerFrom] = useState(null);
  const [selectedTrailerCurrent, setSelectedTrailerCurrent] = useState(null);
  const [associationTypeFrom, setAssociationTypeFrom] = useState(
    ITEM_ASSOCIATION_SITE
  );
  const [associationTypeCurrent, setAssociationTypeCurrent] = useState(
    ITEM_ASSOCIATION_SITE
  );
  const [trailerLinkPrompt, setTrailerLinkPrompt] = useState(null);
  const allTrailerOptions = useMemo(
    () => {
      const byId = new Map();
      [...trailers, selectedTrailerFrom, selectedTrailerCurrent]
        .filter(Boolean)
        .forEach((trailer) => byId.set(trailer.id, trailer));
      return [...byId.values()].sort((left, right) =>
        String(left?.name || left?.id || "").localeCompare(
          String(right?.name || right?.id || ""),
          undefined,
          { sensitivity: "base", numeric: true }
        )
      );
    },
    [selectedTrailerCurrent, selectedTrailerFrom, trailers]
  );
  const [photos, setPhotos] = useState([]);
  const [activePhotoCategory, setActivePhotoCategory] = useState("item");
  const [selectedShippingGroupId, setSelectedShippingGroupId] = useState("");
  const [show, setShow] = useState(false); // error modal for missing required fields
  const [showErr, setShowErr] = useState(false);
  const [Err, setErr] = useState(
    "Missing required field: Name and Description"
  );
  const [showDescModal, setShowDescModal] = useState(false);
  const [showWoModal, setShowWoModal] = useState(false);
  const [showSaveHistoryModal, setShowSaveHistoryModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveRedirectPath, setSaveRedirectPath] = useState("");
  const [machineSelectionModal, setMachineSelectionModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedCurrentMachine, setSelectedCurrentMachine] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [TheMachine, setTheMachine] = useState(null);
  const [machineOptionsFrom, setMachineOptionsFrom] = useState([]);
  const [machineOptionsCurrent, setMachineOptionsCurrent] = useState([]);
  const [machineOptionsLoadingFrom, setMachineOptionsLoadingFrom] =
    useState(false);
  const [machineOptionsLoadingCurrent, setMachineOptionsLoadingCurrent] =
    useState(false);
  const machineOptionsRequestRef = useRef({ from: 0, current: 0 });
  const associationSelectionRequestRef = useRef({ from: 0, current: 0 });
  const associationSelectionStatusRef = useRef({
    from: { pending: false, error: "" },
    current: { pending: false, error: "" },
  });
  const [associationSelectionStatus, setAssociationSelectionStatus] = useState(
    associationSelectionStatusRef.current
  );
  const associationSelectionPending = Object.values(
    associationSelectionStatus
  ).some((status) => status.pending);
  const associationSelectionError = Object.values(associationSelectionStatus)
    .map((status) => status.error)
    .find(Boolean) || "";
  const machineDetailRequestRef = useRef(0);
  const latestMachineDetailOwnerRef = useRef({ branch: "", requestId: 0 });
  const machineDetailHydrationRef = useRef(
    createMachineDetailHydrationState()
  );
  const [machineDetailHydration, setMachineDetailHydration] = useState(
    createMachineDetailHydrationState
  );
  const machineDetailHydrationSummary = summarizeMachineDetailHydration(
    machineDetailHydration
  );
  const [search, setSearch] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [addToWebsite, setAddToWebsite] = useState(false);
  const [machinePick, setMachinePick] = useState(false);
  const machineOptions = machinePick
    ? machineOptionsFrom
    : machineOptionsCurrent;
  const machineOptionsLoading = machinePick
    ? machineOptionsLoadingFrom
    : machineOptionsLoadingCurrent;
  const [freqItem, setFreqItem] = useState(0);
  const [usagePastYear, setUsagePastYear] = useState(0);
  const [machineFrequency, setMachineFrequency] = useState(0);
  // For extra (dimensions/price/DOM) section collapse.
  const [showExtra, setShowExtra] = useState(false);
  const [bluefolderLoading, setBluefolderLoading] = useState(false);
  const [slackLoadingKey, setSlackLoadingKey] = useState("");
  const [selectionHistory, setSelectionHistory] = useState([]);
  const [saveHistory, setSaveHistory] = useState([]);
  const [analyzingPhotos, setAnalyzingPhotos] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [matchPreviewUrl, setMatchPreviewUrl] = useState("");
  const [matchPreviewLoading, setMatchPreviewLoading] = useState(false);

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
  const localSnSeedRef = useRef(null);

  // Inside your NewItem component:
  const [loading, setLoading] = useState(false);
  const [savedDocId, setSavedDocId] = useState(null);
  const committedDocIdRef = useRef("");
  const saveInFlightRef = useRef(null);
  const [saveOperationPending, setSaveOperationPending] = useState(false);
  const [associationHydration, setAssociationHydration] = useState({
    pending: false,
    error: "",
  });
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      associationSelectionRequestRef.current = {
        from: associationSelectionRequestRef.current.from + 1,
        current: associationSelectionRequestRef.current.current + 1,
      };
      machineOptionsRequestRef.current = {
        from: machineOptionsRequestRef.current.from + 1,
        current: machineOptionsRequestRef.current.current + 1,
      };
      machineDetailRequestRef.current += 1;
      latestMachineDetailOwnerRef.current = { branch: "", requestId: 0 };
      machineDetailHydrationRef.current = createMachineDetailHydrationState();
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

    const rawLocalSn = router.query.localSN ?? router.query.prefillId;
    const seededLocalSn = Array.isArray(rawLocalSn) ? rawLocalSn[0] : rawLocalSn;
    const normalizedLocalSn = String(seededLocalSn || "").trim();

    if (!normalizedLocalSn) return;
    if (localSnSeedRef.current === normalizedLocalSn) return;
    localSnSeedRef.current = normalizedLocalSn;

    setItems((prev) => {
      const existingLocalSn = String(prev.localSN || "").trim();
      if (existingLocalSn) return prev;
      return { ...prev, localSN: normalizedLocalSn };
    });
  }, [router.isReady, router.query.localSN, router.query.prefillId]);

  useEffect(() => {
    if (!router.isReady) return;
    const rawCloneFrom = Array.isArray(router.query.cloneFrom)
      ? router.query.cloneFrom[0]
      : router.query.cloneFrom;
    const cloneFrom = String(rawCloneFrom || "").trim();
    const previousCloneFrom = String(cloneSeedRef.current || "").trim();
    if (previousCloneFrom === cloneFrom) return;
    cloneSeedRef.current = cloneFrom || null;

    const rawLocalSn = router.query.localSN ?? router.query.prefillId;
    const seededLocalSn = Array.isArray(rawLocalSn) ? rawLocalSn[0] : rawLocalSn;
    const normalizedLocalSn = String(seededLocalSn || "").trim();
    setItems(createEmptyItemFormState(normalizedLocalSn));
    setDescriptions([{ description: "", date: "" }]);
    setWorkOrders([{ workOrder: "", date: "" }]);
    setDOM("");
    setNewLocalFrom({
      region: "",
      section: { letter: "", number: "" },
      bin: "",
      pallet: "",
    });
    setNewLocalCurrent({
      region: "",
      section: { letter: "", number: "" },
      bin: "",
      pallet: "",
    });
    setAddToWebsite(false);
    setSavedDocId(null);
    committedDocIdRef.current = "";
    setSelectionHistory([]);
    setSaveHistory([]);
    setSelectedDesc(0);
    setSelectedParent(null);
    setSelectedClientFrom(null);
    setSelectedClientCurrent(null);
    setSelectedTrailerFrom(null);
    setSelectedTrailerCurrent(null);
    setAssociationTypeFrom(ITEM_ASSOCIATION_SITE);
    setAssociationTypeCurrent(ITEM_ASSOCIATION_SITE);
    setSelectedMachine(null);
    setSelectedCurrentMachine(null);
    setTheMachine(null);
    setMachineFieldsInitialized(false);
    setSelectedOems([]);
    setSelectedModalities([]);
    setSelectedModels([]);
    setMachineOptionsFrom([]);
    setMachineOptionsCurrent([]);
    machineOptionsRequestRef.current = {
      from: machineOptionsRequestRef.current.from + 1,
      current: machineOptionsRequestRef.current.current + 1,
    };
    associationSelectionRequestRef.current = {
      from: associationSelectionRequestRef.current.from + 1,
      current: associationSelectionRequestRef.current.current + 1,
    };
    associationSelectionStatusRef.current = {
      from: { pending: false, error: "" },
      current: { pending: false, error: "" },
    };
    setAssociationSelectionStatus(associationSelectionStatusRef.current);
    machineDetailRequestRef.current += 1;
    latestMachineDetailOwnerRef.current = { branch: "", requestId: 0 };
    machineDetailHydrationRef.current = createMachineDetailHydrationState();
    setMachineDetailHydration(machineDetailHydrationRef.current);
    setMachineOptionsLoadingFrom(false);
    setMachineOptionsLoadingCurrent(false);
    setShowMachineModal(false);
    setShowLocalLocFrom(false);
    setShowLocalLocCurrent(false);
    setTrailerLinkPrompt(null);
    setPhotos([]);
    setActivePhotoCategory("item");
    setSelectedShippingGroupId("");
    setAnalysisResult(null);
    setMatchPreviewUrl("");
    setAssociationHydration({ pending: Boolean(cloneFrom), error: "" });

    if (!cloneFrom) return;

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

    const getStoredDocumentId = (value) => {
      if (!value) return "";
      const rawValue =
        typeof value === "string" ? value : value?.id || value?.path || "";
      const segments = String(rawValue).split("/").filter(Boolean);
      return segments[segments.length - 1] || "";
    };

    const resolveDoc = async (ref, collection) => {
      if (!ref) return null;
      const documentId = getStoredDocumentId(ref);
      if (!documentId) {
        throw new Error(`Stored ${collection} association has no document ID.`);
      }
      const doc =
        typeof ref.get === "function"
          ? await ref.get()
          : ref?.path && typeof ref !== "string"
            ? await db.doc(ref.path).get()
            : await db.collection(collection).doc(documentId).get();
      if (!doc.exists) {
        throw new Error(
          `Stored ${collection} association ${documentId} no longer exists. Select a replacement on the source item before cloning it.`
        );
      }
      return { id: doc.id, ...doc.data() };
    };

    (async () => {
      try {
        const doc = await db.collection("Test").doc(cloneFrom).get();
        if (!doc.exists) {
          throw new Error(`Clone source ${cloneFrom} was not found.`);
        }

        const data = doc.data() || {};
        const machineFromValue = firstEntityRoleValue(data, "machine", "from");
        const machineCurrentValue = firstEntityRoleValue(
          data,
          "machine",
          "current"
        );
        const storedMachineFromId = getStoredDocumentId(machineFromValue);
        const storedMachineCurrentId = getStoredDocumentId(machineCurrentValue);
        const dateValue = toDateString(data.date);
        const arrivalValue =
          toDateString(data.arrival_date) ||
          (typeof data.arrival_date === "string" ? data.arrival_date : "");
        const departureValue =
          toDateString(data.departure_date) ||
          (typeof data.departure_date === "string" ? data.departure_date : "");

        if (!cancelled) {
          setItems((prev) => ({
            ...prev,
            name: data.name || "",
            pn: toArray(data.pn),
            // A cloned item is a distinct physical item, so its serial number
            // must be entered separately instead of inherited from the source.
            sn: [""],
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
            departure_date: departureValue || "",
            movementDateType:
              data.movementDateType === "departure" ? "departure" : "arrival",
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
          setSelectionHistory([]);
          setSaveHistory([]);
          setSelectedDesc(0);
        }

        if (data.TheMachine && !cancelled) {
          setTheMachine(data.TheMachine);
          setMachineFieldsInitialized(false);
          setSelectedOems(
            uniqueSelection(
              normalizeSelection(data.TheMachine.oem || data.TheMachine.OEM)
            )
          );
          setSelectedModalities(
            uniqueSelection(
              normalizeSelection(
                data.TheMachine.modality || data.TheMachine.Modality
              )
            )
          );
          setSelectedModels(
            uniqueSelection(
              normalizeSelection(data.TheMachine.model || data.TheMachine.Model)
            )
          );
        }

        const parentDoc = await resolveDoc(data.Parent, "Test");
        if (parentDoc && !cancelled) {
          setSelectedParent({ id: parentDoc.id, name: parentDoc.name || "" });
        }

        const clientFromDoc = await resolveDoc(
          firstEntityRoleValue(data, "client", "from"),
          "Client"
        );
        if (clientFromDoc && !cancelled) {
          setSelectedClientFrom({ id: clientFromDoc.id, ...clientFromDoc });
        }

        const clientCurrentDoc = await resolveDoc(
          firstEntityRoleValue(data, "client", "current"),
          "Client"
        );
        if (clientCurrentDoc && !cancelled) {
          setSelectedClientCurrent({ id: clientCurrentDoc.id, ...clientCurrentDoc });
        }

        const trailerFromDoc = await resolveDoc(
          firstEntityRoleValue(data, "trailer", "from"),
          "Trailers"
        );
        if (trailerFromDoc && !cancelled) {
          const linkedClientId = trailerClientId(trailerFromDoc);
          setSelectedTrailerFrom({
            id: trailerFromDoc.id,
            ...trailerFromDoc,
            name: trailerName(trailerFromDoc),
            clientId: linkedClientId,
            machineId: trailerMachineId(trailerFromDoc),
            storedAssociationMachineId: storedMachineFromId,
          });
          if (!clientFromDoc && linkedClientId) {
            const linkedClientDoc = await resolveDoc(linkedClientId, "Client");
            if (linkedClientDoc && !cancelled) {
              setSelectedClientFrom({
                id: linkedClientDoc.id,
                ...linkedClientDoc,
                derivedFromTrailer: true,
              });
            }
          }
        }

        const trailerCurrentDoc = await resolveDoc(
          firstEntityRoleValue(data, "trailer", "current"),
          "Trailers"
        );
        if (trailerCurrentDoc && !cancelled) {
          const linkedClientId = trailerClientId(trailerCurrentDoc);
          setSelectedTrailerCurrent({
            id: trailerCurrentDoc.id,
            ...trailerCurrentDoc,
            name: trailerName(trailerCurrentDoc),
            clientId: linkedClientId,
            machineId: trailerMachineId(trailerCurrentDoc),
            storedAssociationMachineId: storedMachineCurrentId,
          });
          if (!clientCurrentDoc && linkedClientId) {
            const linkedClientDoc = await resolveDoc(linkedClientId, "Client");
            if (linkedClientDoc && !cancelled) {
              setSelectedClientCurrent({
                id: linkedClientDoc.id,
                ...linkedClientDoc,
                derivedFromTrailer: true,
              });
            }
          }
        }

        if (!cancelled) {
          setAssociationTypeFrom(
            inferItemAssociationType({
              storedType: data.fromAssociationType || data.associationTypeFrom,
              trailer: trailerFromDoc,
              machine: machineFromValue,
            })
          );
          setAssociationTypeCurrent(
            inferItemAssociationType({
              storedType:
                data.currentAssociationType || data.associationTypeCurrent,
              trailer: trailerCurrentDoc,
              machine: machineCurrentValue,
            })
          );
        }

        const machineFromDoc = await resolveDoc(
          machineFromValue,
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
          machineCurrentValue,
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
        if (!cancelled) {
          const initialMachineHydration = buildMachineDetailHydrationSeed({
            fromMachine: machineFromDoc,
            currentMachine: machineCurrentDoc,
            preferredMachine: data.TheMachine || null,
          });
          machineDetailHydrationRef.current = initialMachineHydration.state;
          setMachineDetailHydration(initialMachineHydration.state);
          latestMachineDetailOwnerRef.current = initialMachineHydration.owner;
        }
      } catch (error) {
        console.error("Clone load failed:", error);
        if (!cancelled) {
          const message =
            error?.message ||
            "Failed to load every saved association from the clone source.";
          setAssociationHydration({ pending: false, error: message });
          setErr(message);
          setShowErr(true);
        }
      } finally {
        if (!cancelled) {
          setAssociationHydration((previous) => ({
            ...previous,
            pending: false,
          }));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    router.isReady,
    router.query.cloneFrom,
    router.query.localSN,
    router.query.prefillId,
  ]);

  // -------------------- Since this is "add" mode, we do not fetch an existing document.
  // However, we still fetch global PN and SN options and clients for selection.
  useEffect(() => {
    async function fetchClientsData() {
      try {
        const [clientsData, trailerSnapshot] = await Promise.all([
          fetchClients(),
          firebase.firestore().collection("Trailers").get(),
        ]);
        console.log("Clients:", clientsData);
        setClients((clientsData || []).filter(isSelectableItemClient));
        setTrailers(
          trailerSnapshot.docs
            .filter((snapshot) => snapshot.id !== "layout_meta")
            .map((snapshot) => {
              const data = snapshot.data() || {};
              return {
                id: snapshot.id,
                ...data,
                name: trailerName({ id: snapshot.id, ...data }),
                clientId: trailerClientId(data),
                machineId: trailerMachineId(data),
              };
            })
            .sort((left, right) => left.name.localeCompare(right.name))
        );
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
          category: activePhotoCategory,
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
      {
        file: capturedPhoto,
        url: URL.createObjectURL(capturedPhoto),
        category: activePhotoCategory,
      },
    ]);
    setCapturedPhoto(null);
    setShowCameraModal(false);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleAnalyzePhotos = async () => {
    if (!photos.length || analyzingPhotos) return;
    setAnalyzingPhotos(true);
    try {
      const preparedImages = await preparePhotosForAnalysis(photos, {
        maxImages: 4,
        maxDimension: 1600,
        jpegQuality: 0.82,
      });
      if (!preparedImages.length) {
        throw new Error("The selected photos could not be prepared for analysis.");
      }

      const currentUser = firebase.auth().currentUser;
      const idToken = currentUser ? await currentUser.getIdToken() : "";
      const response = await fetch("/api/items/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          images: preparedImages,
          hints: {
            oem: selectedOems,
            modality: selectedModalities,
            model: selectedModels,
          },
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Smart Camera is temporarily busy. Please wait a minute and try again."
          );
        }
        throw new Error(result?.error || "The photos could not be analyzed.");
      }
      setAnalysisResult(result);
      setShowAnalysisModal(true);
    } catch (error) {
      console.error("Smart Camera analysis failed:", error);
      setErr(error?.message || "The photos could not be analyzed.");
      setShowErr(true);
    } finally {
      setAnalyzingPhotos(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const match = analysisResult?.match;
    if (!showAnalysisModal || !match?.id) {
      setMatchPreviewUrl("");
      setMatchPreviewLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setMatchPreviewUrl("");
    setMatchPreviewLoading(true);
    const prefix = match.photoStoragePrefix || `Parts/${match.id}/`;
    firebase
      .storage()
      .ref()
      .child(prefix)
      .listAll()
      .then((result) =>
        result.items
          .filter((entry) => /\.(?:png|jpe?g|webp|gif)$/i.test(entry.name))
          .sort((left, right) => left.name.localeCompare(right.name))[0]
      )
      .then((photoRef) => (photoRef ? photoRef.getDownloadURL() : ""))
      .then((url) => {
        if (!cancelled) setMatchPreviewUrl(url || "");
      })
      .catch((error) => {
        console.warn("Could not load comparison photo:", error);
      })
      .finally(() => {
        if (!cancelled) setMatchPreviewLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [analysisResult, showAnalysisModal]);

  const applyAnalysisMatch = () => {
    const match = analysisResult?.match;
    if (!match) return;
    const partNumbers = uniqueSelection(normalizeSelection(match.partNumbers));
    const oems = uniqueSelection(normalizeSelection(match.oem));
    const modalities = uniqueSelection(normalizeSelection(match.modality));
    const models = uniqueSelection(normalizeSelection(match.model));

    setItems((previous) => ({
      ...previous,
      name: match.name || previous.name,
      pn: partNumbers.length ? partNumbers : previous.pn,
    }));
    if (oems.length) setSelectedOems(oems);
    if (modalities.length) setSelectedModalities(modalities);
    if (models.length) setSelectedModels(models);
    setShowAnalysisModal(false);
  };

  // -------------------- Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseErr = () => setShowErr(false);
  const handleShowErr = () => setShowErr(true);
  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
    if (saveRedirectPath) {
      const nextPath = saveRedirectPath;
      setSaveRedirectPath("");
      router.push(nextPath);
    }
  };
  const handleShowSaveModal = () => setShowSaveModal(true);
  const handleCloseDescModal = () => setShowDescModal(false);
  const handleShowDescModal = () => setShowDescModal(true);
  const handleCloseWoModal = () => setShowWoModal(false);
  const handleShowWoModal = () => setShowWoModal(true);
  const handleCloseSaveHistoryModal = () => setShowSaveHistoryModal(false);
  const handleShowSaveHistoryModal = () => setShowSaveHistoryModal(true);
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
  const setMachineOptionsForBranch = (isFromBranch, next) => {
    if (isFromBranch) setMachineOptionsFrom(next);
    else setMachineOptionsCurrent(next);
  };

  const createEmptyWarehouseLocation = () => ({
    region: "",
    section: { letter: "", number: "" },
    bin: "",
    pallet: "",
  });

  const updateBranchAssociationSelectionStatus = (requestKey, next) => {
    const updated = {
      ...associationSelectionStatusRef.current,
      [requestKey]: next,
    };
    associationSelectionStatusRef.current = updated;
    setAssociationSelectionStatus(updated);
  };

  const beginBranchAssociationSelection = (
    isFromBranch,
    { pending = false } = {}
  ) => {
    const requestKey = isFromBranch ? "from" : "current";
    const requestId =
      associationSelectionRequestRef.current[requestKey] + 1;
    associationSelectionRequestRef.current[requestKey] = requestId;
    machineOptionsRequestRef.current[requestKey] += 1;
    updateBranchAssociationSelectionStatus(requestKey, {
      pending,
      error: "",
    });
    return { requestKey, requestId };
  };

  const isBranchAssociationSelectionActive = (requestKey, requestId) =>
    associationSelectionRequestRef.current[requestKey] === requestId;

  const finishBranchAssociationSelection = (
    requestKey,
    requestId,
    error = ""
  ) => {
    if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
    updateBranchAssociationSelectionStatus(requestKey, {
      pending: false,
      error,
    });
  };

  const clearBranchWarehousePosition = (isFromBranch) => {
    if (isFromBranch) {
      setShowLocalLocFrom(false);
      setNewLocalFrom(createEmptyWarehouseLocation());
    } else {
      setShowLocalLocCurrent(false);
      setNewLocalCurrent(createEmptyWarehouseLocation());
    }
  };

  async function loadMachineOptionsForBranch(
    isFromBranch,
    clientOverride = null
  ) {
    const selectedClient =
      clientOverride ||
      (isFromBranch ? selectedClientFrom : selectedClientCurrent);
    const clientId = String(selectedClient?.id || "").trim();
    const requestKey = isFromBranch ? "from" : "current";
    const requestId = machineOptionsRequestRef.current[requestKey] + 1;
    machineOptionsRequestRef.current[requestKey] = requestId;

    setMachineOptionsForBranch(isFromBranch, []);
    if (isFromBranch) setMachineOptionsLoadingFrom(true);
    else setMachineOptionsLoadingCurrent(true);
    try {
      if (!clientId) {
        setMachineOptionsForBranch(isFromBranch, []);
        return [];
      }
      const machines = await fetchMachinesForClient(clientId);
      if (machineOptionsRequestRef.current[requestKey] !== requestId) {
        const supersededError = new Error(
          "Machine options request was superseded."
        );
        supersededError.name = "AbortError";
        throw supersededError;
      }
      setMachineOptionsForBranch(isFromBranch, machines);
      return machines;
    } catch (error) {
      if (machineOptionsRequestRef.current[requestKey] === requestId) {
        setMachineOptionsForBranch(isFromBranch, []);
      }
      throw error;
    } finally {
      if (machineOptionsRequestRef.current[requestKey] === requestId) {
        if (isFromBranch) setMachineOptionsLoadingFrom(false);
        else setMachineOptionsLoadingCurrent(false);
      }
    }
  }

  const handleClientInfo = async (clientId) => {
    const isFromBranch = machinePick;
    if (!clientId) {
      beginBranchAssociationSelection(isFromBranch);
      if (isFromBranch) {
        setSelectedClientFrom(null);
      } else {
        setSelectedClientCurrent(null);
      }
      clearBranchWarehousePosition(isFromBranch);
      setMachineOptionsForBranch(isFromBranch, []);
      setTrailerLinkPrompt(null);
      handleCloseClientModal();
      return;
    }
    const { requestKey, requestId } = beginBranchAssociationSelection(
      isFromBranch,
      { pending: true }
    );

    try {
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      if (!clientDoc.exists) {
        throw new Error("The selected client/site no longer exists.");
      }
      const clientData = { id: clientDoc.id, ...clientDoc.data() };
      if (!isSelectableItemClient(clientData)) {
        throw new Error(
          "AIS TRAILERS is retired. Select the actual client/site or a trailer instead."
        );
      }
      const previousClientId = String(
        (isFromBranch ? selectedClientFrom : selectedClientCurrent)?.id || ""
      ).trim();
      if (previousClientId !== String(clientData.id).trim()) {
        clearBranchWarehousePosition(isFromBranch);
      }
      if (isFromBranch) {
        setSelectedClientFrom(clientData);
      } else {
        setSelectedClientCurrent(clientData);
      }
      if (isFromBranch) {
        setShowLocalLocFrom(isSocalWarehouseClient(clientData));
      } else {
        setShowLocalLocCurrent(isSocalWarehouseClient(clientData));
      }
      await loadMachineOptionsForBranch(isFromBranch, clientData);
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      handleCloseClientModal();
      setTrailerLinkPrompt(null);
      finishBranchAssociationSelection(requestKey, requestId);
    } catch (error) {
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      if (error?.name === "AbortError") {
        finishBranchAssociationSelection(requestKey, requestId);
        return;
      }
      const message = error?.message || "Failed to select this client/site.";
      finishBranchAssociationSelection(requestKey, requestId, message);
      setErr(message);
      setShowErr(true);
    }
  };

  const handleDeclineTrailerLink = () => {
    setTrailerLinkPrompt(null);
  };

  const handleConfirmTrailerLink = () => {
    const selectedTrailer = trailerLinkPrompt?.trailers?.find(
      (trailer) => trailer.id === trailerLinkPrompt.trailerId
    );
    if (!selectedTrailer) return;

    const associatedMachine = selectedTrailer.machineId
      ? trailerLinkPrompt.machines.find(
          (machine) => machine.id === selectedTrailer.machineId
        ) || null
      : null;
    beginBranchAssociationSelection(trailerLinkPrompt.isFromBranch);
    if (associatedMachine) {
      applyImmediateMachineDetails(
        trailerLinkPrompt.isFromBranch,
        associatedMachine
      );
    }
    if (trailerLinkPrompt.isFromBranch) {
      setSelectedTrailerFrom(selectedTrailer);
      setAssociationTypeFrom(ITEM_ASSOCIATION_TRAILER);
      if (associatedMachine) setSelectedMachine(associatedMachine);
    } else {
      setSelectedTrailerCurrent(selectedTrailer);
      setAssociationTypeCurrent(ITEM_ASSOCIATION_TRAILER);
      if (associatedMachine) setSelectedCurrentMachine(associatedMachine);
    }
    setTrailerLinkPrompt(null);
  };

  const handleTrailerSelection = async (isFromBranch, trailerId) => {
    const { requestKey, requestId } = beginBranchAssociationSelection(
      isFromBranch,
      { pending: Boolean(trailerId) }
    );
    if (!trailerId) {
      if (isFromBranch) {
        setSelectedTrailerFrom(null);
        setSelectedMachine(null);
      } else {
        setSelectedTrailerCurrent(null);
        setSelectedCurrentMachine(null);
      }
      cancelMachineDetailHydration(isFromBranch);
      return;
    }
    const trailer = trailers.find((entry) => entry.id === trailerId);
    if (!trailer?.clientId) {
      const message =
        "This trailer is not linked to a client/site. Link it on the trailer page first.";
      finishBranchAssociationSelection(requestKey, requestId, message);
      setErr(message);
      setShowErr(true);
      return;
    }

    try {
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(trailer.clientId).get();
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      if (!clientDoc.exists) {
        throw new Error("The trailer's linked client/site no longer exists.");
      }
      const client = { id: clientDoc.id, ...clientDoc.data() };
      let availableMachines = await loadMachineOptionsForBranch(
        isFromBranch,
        client
      );
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      let associatedMachine = trailer.machineId
        ? availableMachines.find((machine) => machine.id === trailer.machineId)
        : null;
      if (trailer.machineId && !associatedMachine) {
        const machineDoc = await db
          .collection("Machine")
          .doc(trailer.machineId)
          .get();
        if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
        if (machineDoc.exists) {
          associatedMachine = {
            id: machineDoc.id,
            ...stripAssociatedPartsFromMachineSnapshot(machineDoc.data() || {}),
          };
          availableMachines = [
            associatedMachine,
            ...availableMachines.filter(
              (machine) => machine.id !== associatedMachine.id
            ),
          ];
          if (isBranchAssociationSelectionActive(requestKey, requestId)) {
            setMachineOptionsForBranch(isFromBranch, availableMachines);
          }
        }
      }
      if (!associatedMachine) {
        throw new Error(
          "This trailer has no linked machine. Link its machine on the trailer page before attaching an item."
        );
      }
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      const previousClientId = String(
        (isFromBranch ? selectedClientFrom : selectedClientCurrent)?.id || ""
      ).trim();
      if (previousClientId !== String(client.id).trim()) {
        clearBranchWarehousePosition(isFromBranch);
      }
      applyImmediateMachineDetails(isFromBranch, associatedMachine);

      if (isFromBranch) {
        setSelectedClientFrom(client);
        setSelectedTrailerFrom(trailer);
        setSelectedMachine(associatedMachine);
        setAssociationTypeFrom(ITEM_ASSOCIATION_TRAILER);
      } else {
        setSelectedClientCurrent(client);
        setSelectedTrailerCurrent(trailer);
        setSelectedCurrentMachine(associatedMachine);
        setAssociationTypeCurrent(ITEM_ASSOCIATION_TRAILER);
      }
      finishBranchAssociationSelection(requestKey, requestId);
    } catch (error) {
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      if (error?.name === "AbortError") {
        finishBranchAssociationSelection(requestKey, requestId);
        return;
      }
      console.error("Error selecting trailer:", error);
      const message = error?.message || "Failed to select trailer.";
      finishBranchAssociationSelection(requestKey, requestId, message);
      setErr(message);
      setShowErr(true);
    }
  };

  const replaceMachineDetailHydration = (next) => {
    machineDetailHydrationRef.current = next;
    setMachineDetailHydration(next);
  };

  const updateMachineDetailHydrationForBranch = (branch, nextStatus) => {
    const next = {
      ...machineDetailHydrationRef.current,
      [branch]: {
        ...machineDetailHydrationRef.current[branch],
        ...nextStatus,
      },
    };
    replaceMachineDetailHydration(next);
  };

  const updateMachineDetailHydrationForRequest = (requestId, nextStatus) => {
    const branch = findMachineDetailRequestBranch(
      machineDetailHydrationRef.current,
      requestId
    );
    if (!branch) return false;
    updateMachineDetailHydrationForBranch(branch, nextStatus);
    return true;
  };

  const cancelMachineDetailHydration = (isFromBranch) => {
    const branch = isFromBranch ? "from" : "current";
    const next = {
      ...machineDetailHydrationRef.current,
      [branch]: createMachineDetailHydrationState()[branch],
    };
    replaceMachineDetailHydration(next);
    if (latestMachineDetailOwnerRef.current.branch === branch) {
      const remaining = ["from", "current"]
        .map((key) => ({ branch: key, ...next[key] }))
        .filter((entry) => entry.machineId && !entry.error)
        .sort((left, right) => right.requestId - left.requestId)[0];
      latestMachineDetailOwnerRef.current = remaining
        ? { branch: remaining.branch, requestId: remaining.requestId }
        : { branch: "", requestId: 0 };
      if (remaining?.machineData) {
        applySelectedMachineDetails(remaining.machineData);
      }
    }
  };

  const swapMachineDetailHydrationBranches = () => {
    replaceMachineDetailHydration({
      from: machineDetailHydrationRef.current.current,
      current: machineDetailHydrationRef.current.from,
    });
    const owner = latestMachineDetailOwnerRef.current;
    if (owner.branch) {
      latestMachineDetailOwnerRef.current = {
        ...owner,
        branch: owner.branch === "from" ? "current" : "from",
      };
    }
  };

  const applySelectedMachineDetails = (machineData) => {
    const safeMachineData = stripAssociatedPartsFromMachineSnapshot(
      machineData || {}
    );
    setTheMachine(safeMachineData);
    const merged = updateMachineFields(safeMachineData, null, null);
    setSelectedOems(uniqueSelection(normalizeSelection(merged.oem)));
    setSelectedModalities(uniqueSelection(normalizeSelection(merged.modality)));
    setSelectedModels(uniqueSelection(normalizeSelection(merged.model)));
    setMachineFieldsInitialized(true);
  };

  const applyImmediateMachineDetails = (isFromBranch, machineData) => {
    const branch = isFromBranch ? "from" : "current";
    const safeMachineData = stripAssociatedPartsFromMachineSnapshot(
      machineData || {}
    );
    cancelMachineDetailHydration(isFromBranch);
    updateMachineDetailHydrationForBranch(branch, {
      requestId: 0,
      machineId: String(machineData?.id || "").trim(),
      pending: false,
      error: "",
      machineData: safeMachineData,
    });
    latestMachineDetailOwnerRef.current = { branch, requestId: 0 };
    applySelectedMachineDetails(safeMachineData);
  };

  const fetchMachine = async (machineId, requestId) => {
    const db = firebase.firestore();
    const doc = await db.collection("Machine").doc(machineId).get();
    if (
      !findMachineDetailRequestBranch(
        machineDetailHydrationRef.current,
        requestId
      )
    ) return false;
    if (!doc.exists) {
      throw new Error(`The selected machine ${machineId} no longer exists.`);
    }

    const machineData = {
      id: doc.id,
      ...stripAssociatedPartsFromMachineSnapshot(doc.data() || {}),
    };
    if (latestMachineDetailOwnerRef.current.requestId === requestId) {
      applySelectedMachineDetails(machineData);
    }

    const machineModel = machineData.Model || machineData.model || "";
    if (machineModel) {
      try {
        const machinesSnapshot = await db
          .collection("Machine")
          .where("Model", "==", machineModel)
          .get();
        if (
          !findMachineDetailRequestBranch(
            machineDetailHydrationRef.current,
            requestId
          )
        ) return false;
        if (latestMachineDetailOwnerRef.current.requestId === requestId) {
          setMachineFrequency(machinesSnapshot.size);
        }
      } catch (error) {
        console.error("Failed to calculate machine frequency:", error);
      }
    } else {
      if (latestMachineDetailOwnerRef.current.requestId === requestId) {
        setMachineFrequency(0);
      }
    }
    return findMachineDetailRequestBranch(
      machineDetailHydrationRef.current,
      requestId
    )
      ? machineData
      : false;
  };

  // -------------------- Frequency/Usage (unchanged)
  const calculateItemFrequencyAndUsage = async (pn) => {
    const db = firebase.firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const normalizedPN = pn !== undefined ? pn : "";
    const itemsSnapshot = await db
      .collection("Test")
      .where("pn", "==", normalizedPN)
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
    const nextPhotos = [...photos];
    for (let i = 0; i < nextPhotos.length; i++) {
      if (nextPhotos[i].file) {
        const category = normalizeItemPhotoCategory(nextPhotos[i].category);
        const storageName = createItemPhotoStorageName(
          category,
          nextPhotos[i].file,
          i
        );
        const photoRef = storageRef.child(
          `Parts/${docID}/${storageName}`
        );
        const metadata = {
          contentType: nextPhotos[i]?.file?.type || "image/jpeg",
          cacheControl: "public,max-age=31536000,immutable",
        };
        await photoRef.put(nextPhotos[i].file, metadata);
        const url = await photoRef.getDownloadURL();
        nextPhotos[i] = {
          ...nextPhotos[i],
          url,
          file: null,
          category,
          storageName,
        };
      }
    }
    setPhotos(nextPhotos);
    return nextPhotos.map((photo) => photo?.url).filter(Boolean);
  };

  async function runItemSave(redirect = true, options = {}) {
    const forceNew = Boolean(options.forceNew);
    const activeSave = saveInFlightRef.current;
    if (activeSave) {
      if (activeSave.forceNew === forceNew) return activeSave.promise;
      await activeSave.promise;
      return runItemSave(redirect, options);
    }

    const promise = toSend(redirect, options);
    const saveEntry = { promise, forceNew };
    saveInFlightRef.current = saveEntry;
    setSaveOperationPending(true);
    try {
      return await promise;
    } finally {
      if (saveInFlightRef.current === saveEntry) {
        saveInFlightRef.current = null;
        setSaveOperationPending(false);
      }
    }
  }

  // -------------------- Submission Handler
  // For NewItem, only require Name and Description.
  async function handleSubmit(event) {
    event.preventDefault();
    if (!isReadyForActions) {
      handleShow();
    } else {
      safeSetLoading(true); // start loading before async work
      try {
        const docId = await runItemSave();
        if (!docId) return;
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
    const liveAssociationStatus = Object.values(
      associationSelectionStatusRef.current
    );
    const liveAssociationPending = liveAssociationStatus.some(
      (status) => status.pending
    );
    const liveAssociationError =
      liveAssociationStatus.map((status) => status.error).find(Boolean) || "";
    const liveMachineDetail = summarizeMachineDetailHydration(
      machineDetailHydrationRef.current
    );
    if (
      liveAssociationPending ||
      liveAssociationError ||
      liveMachineDetail.pending ||
      liveMachineDetail.error
    ) {
      if (liveAssociationPending) {
        throw new Error(
          "A client, trailer, or linked machine selection is still loading. Wait for it to finish before saving."
        );
      }
      if (liveAssociationError) {
        throw new Error(
          `Saving is blocked because an association selection failed: ${liveAssociationError}`
        );
      }
      if (liveMachineDetail.pending) {
        throw new Error(
          "The selected machine details are still loading. Wait for them to finish before saving."
        );
      }
      throw new Error(
        `Saving is blocked because the selected machine could not be loaded: ${liveMachineDetail.error}`
      );
    }
    if (associationHydration.pending) {
      throw new Error(
        "The clone source associations are still loading. Wait for loading to finish before saving."
      );
    }
    if (associationHydration.error) {
      throw new Error(
        `Saving is blocked because the clone source was not fully hydrated: ${associationHydration.error}`
      );
    }
    const { id } = router.query;
    const db = firebase.firestore();
    const { forceNew = false, waitForPhotos = false } = options;
    const existingId = forceNew
      ? null
      : savedDocId || committedDocIdRef.current || id || null;

    // Get the current authenticated user
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown";
    const savedAt = new Date();
    const nextSaveHistory = appendSaveHistory(
      forceNew ? [] : saveHistory,
      userEmail,
      savedAt
    );

    const validateAssociationBranch = ({
      label,
      type,
      client,
      trailer,
      machine,
    }) => {
      if (type === ITEM_ASSOCIATION_MACHINE && !machine?.id) {
        throw new Error(`${label}: select a machine or choose Site only.`);
      }
      if (type === ITEM_ASSOCIATION_TRAILER) {
        if (!trailer?.id) throw new Error(`${label}: select a trailer.`);
        if (!machine?.id) {
          throw new Error(
            `${label}: the selected trailer must have a linked machine.`
          );
        }
        const linkedMachineId = String(trailer?.machineId || "").trim();
        const storedAssociationMachineId = String(
          trailer?.storedAssociationMachineId || ""
        ).trim();
        const selectedMachineId = String(machine.id).trim();
        const matchesLiveLink =
          Boolean(linkedMachineId) && linkedMachineId === selectedMachineId;
        const matchesStoredHistoricalPair =
          Boolean(storedAssociationMachineId) &&
          storedAssociationMachineId === selectedMachineId;
        if (!matchesLiveLink && !matchesStoredHistoricalPair) {
          throw new Error(
            `${label}: the selected machine is not the machine linked inside this trailer. Reselect the trailer or fix its machine link first.`
          );
        }
      }
      if (
        (type === ITEM_ASSOCIATION_MACHINE ||
          type === ITEM_ASSOCIATION_TRAILER) &&
        !client?.id
      ) {
        throw new Error(`${label}: select the client/site for this association.`);
      }
      if (client && !isSelectableItemClient(client)) {
        throw new Error(
          `${label}: AIS TRAILERS is retired. Select the actual client/site.`
        );
      }
      if (client?.derivedFromTrailer) {
        throw new Error(
          `${label}: this legacy site was derived from the trailer's present location, not proven history. Reselect the correct client/site before saving.`
        );
      }
    };

    validateAssociationBranch({
      label: "From",
      type: associationTypeFrom,
      client: selectedClientFrom,
      trailer: selectedTrailerFrom,
      machine: selectedMachine,
    });
    validateAssociationBranch({
      label: "Current",
      type: associationTypeCurrent,
      client: selectedClientCurrent,
      trailer: selectedTrailerCurrent,
      machine: selectedCurrentMachine,
    });

    // Always use the current state values for OEM, modality, and model.
    const storedOem = selectionToStoredValue(selectedOems);
    const storedModality = selectionToStoredValue(selectedModalities);
    const storedModel = selectionToStoredValue(selectedModels);

    const machineDetailOwner = latestMachineDetailOwnerRef.current;
    const hydratedMachineData = machineDetailOwner.branch
      ? machineDetailHydrationRef.current[machineDetailOwner.branch]?.machineData
      : null;
    const machineData = {
      ...(hydratedMachineData || TheMachine || {}),
      oem: storedOem,
      OEM: storedOem,
      modality: storedModality,
      Modality: storedModality,
      model: storedModel,
      Model: storedModel,
    };

    const formattedItems = { ...items, descriptions, workOrders };
    const movementDateType =
      items.movementDateType === "departure" ? "departure" : "arrival";
    const movementDate =
      movementDateType === "departure"
        ? items.departure_date || ""
        : items.arrival_date || "";
    const storedFromAssociationType = itemAssociationTypeForStorage({
      type: associationTypeFrom,
      client: selectedClientFrom,
      machine: selectedMachine,
      trailer: selectedTrailerFrom,
    });
    const storedCurrentAssociationType = itemAssociationTypeForStorage({
      type: associationTypeCurrent,
      client: selectedClientCurrent,
      machine: selectedCurrentMachine,
      trailer: selectedTrailerCurrent,
    });
    const initialHistorySnapshot = {
      fromAssociationType: storedFromAssociationType,
      fromClientId: selectedClientFrom?.id || "",
      fromClientName: (selectedClientFrom?.name || "").trim(),
      fromTrailerId: selectedTrailerFrom?.id || "",
      fromTrailerName: (selectedTrailerFrom?.name || "").trim(),
      fromMachineId: selectedMachine?.id || "",
      fromMachineName: (selectedMachine?.name || "").trim(),
      currentAssociationType: storedCurrentAssociationType,
      currentClientId: selectedClientCurrent?.id || "",
      currentClientName: (selectedClientCurrent?.name || "").trim(),
      currentTrailerId: selectedTrailerCurrent?.id || "",
      currentTrailerName: (selectedTrailerCurrent?.name || "").trim(),
      currentMachineId: selectedCurrentMachine?.id || "",
      currentMachineName: (selectedCurrentMachine?.name || "").trim(),
      workOrder: (mostRecentWorkOrder?.workOrder || "").trim(),
      movementDateType,
      movementDate,
      arrivalDate: items.arrival_date || "",
      departureDate: items.departure_date || "",
      savedAt: savedAt.toISOString(),
      savedByEmail: userEmail,
    };
    const hasInitialHistory = [
      initialHistorySnapshot.fromClientId,
      initialHistorySnapshot.fromTrailerId,
      initialHistorySnapshot.fromMachineId,
      initialHistorySnapshot.currentClientId,
      initialHistorySnapshot.currentTrailerId,
      initialHistorySnapshot.currentMachineId,
      initialHistorySnapshot.workOrder,
      initialHistorySnapshot.movementDate,
    ].some((value) => String(value || "").trim() !== "");
    const historyBaseline = forceNew
      ? []
      : Array.isArray(selectionHistory)
        ? selectionHistory
        : [];
    const lastHistoryEntry = historyBaseline.at(-1) || null;
    const historyFields = [
      "fromAssociationType",
      "fromClientId",
      "fromClientName",
      "fromTrailerId",
      "fromTrailerName",
      "fromMachineId",
      "fromMachineName",
      "currentAssociationType",
      "currentClientId",
      "currentClientName",
      "currentTrailerId",
      "currentTrailerName",
      "currentMachineId",
      "currentMachineName",
      "workOrder",
      "movementDateType",
      "movementDate",
      "arrivalDate",
      "departureDate",
    ];
    const historyChanged = historyFields.some(
      (field) =>
        String(lastHistoryEntry?.[field] || "") !==
        String(initialHistorySnapshot[field] || "")
    );
    const nextSelectionHistory =
      (hasInitialHistory || lastHistoryEntry) &&
      (!lastHistoryEntry || historyChanged)
        ? [...historyBaseline, initialHistorySnapshot].slice(-100)
        : historyBaseline;
    formattedItems.selectionHistory = nextSelectionHistory;
    formattedItems.saveHistory = nextSaveHistory;
    // Remove any unused fields.
    formattedItems.status = items.status || "";
    formattedItems.nameLower = (items.name || "").toLowerCase();
    formattedItems.nameTokens = buildNameTokens(items.name);
    formattedItems.workOrderTokens = buildWorkOrderTokens(workOrders);
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
    formattedItems.arrival_date = items.arrival_date || "";
    formattedItems.departure_date = items.departure_date || "";
    formattedItems.movementDateType = movementDateType;
    formattedItems.movementDate = movementDate;
    formattedItems.poNumber = items.poNumber || "";
    formattedItems.trackingNumber = items.trackingNumber || "";
    formattedItems.TheMachine = buildMachineSummary(machineData);
    formattedItems.addedToWebsite = addToWebsite;
    formattedItems.visible = items.visible;
    formattedItems.associationSchemaVersion = 2;

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

    delete formattedItems.Machine;
    delete formattedItems.CurrentMachine;
    delete formattedItems.MachineFrom;
    delete formattedItems.MachineCurrent;
    delete formattedItems.ClientFrom;
    delete formattedItems.ClientCurrent;
    delete formattedItems.TrailerFrom;
    delete formattedItems.TrailerCurrent;
    delete formattedItems.fromAssociationType;
    delete formattedItems.currentAssociationType;
    delete formattedItems.associationTypeFrom;
    delete formattedItems.associationTypeCurrent;
    delete formattedItems.clientFromId;
    delete formattedItems.clientCurrentId;
    delete formattedItems.machineFromId;
    delete formattedItems.machineCurrentId;
    delete formattedItems.trailerFromId;
    delete formattedItems.trailerCurrentId;
    delete formattedItems.associationFrom;
    delete formattedItems.associationCurrent;
    LEGACY_ITEM_ASSOCIATION_FIELDS.forEach((field) => {
      delete formattedItems[field];
    });

    const effectiveAt = movementDate || savedAt.toISOString();
    const effectiveAtSource = movementDate
      ? `item.${movementDateType}_date`
      : "item-save";
    const fromAssociation = buildItemAssociationSnapshot({
      type: associationTypeFrom,
      client: selectedClientFrom,
      machine: selectedMachine,
      trailer: selectedTrailerFrom,
      effectiveAt,
      effectiveAtSource,
    });
    const currentAssociation = buildItemAssociationSnapshot({
      type: associationTypeCurrent,
      client: selectedClientCurrent,
      machine: selectedCurrentMachine,
      trailer: selectedTrailerCurrent,
      effectiveAt,
      effectiveAtSource,
    });

    const addAssociationFields = (association, suffix) => {
      if (!association) return;
      const typeField =
        suffix === "From" ? "fromAssociationType" : "currentAssociationType";
      const mapField = suffix === "From" ? "associationFrom" : "associationCurrent";
      formattedItems[typeField] = association.associationType;
      formattedItems[`client${suffix}Id`] = association.clientId;
      if (association.machineId) {
        formattedItems[`machine${suffix}Id`] = association.machineId;
      }
      if (association.trailerId) {
        formattedItems[`trailer${suffix}Id`] = association.trailerId;
      }
      formattedItems[mapField] = association;
    };
    addAssociationFields(fromAssociation, "From");
    addAssociationFields(currentAssociation, "Current");

    // Set machine references for each branch.
    if (fromAssociation?.machineId) {
      formattedItems.MachineFrom = db
        .collection("Machine")
        .doc(fromAssociation.machineId);
    }
    if (currentAssociation?.machineId) {
      formattedItems.MachineCurrent = db
        .collection("Machine")
        .doc(currentAssociation.machineId);
    }

    // Store the client/site snapshot even when a trailer is selected so the
    // item retains the site where that historical movement occurred.
    if (fromAssociation?.clientId) {
      formattedItems.ClientFrom = db
        .collection("Client")
        .doc(fromAssociation.clientId);
    }
    if (currentAssociation?.clientId) {
      formattedItems.ClientCurrent = db
        .collection("Client")
        .doc(currentAssociation.clientId);
    }
    if (fromAssociation?.trailerId) {
      formattedItems.TrailerFrom = db
        .collection("Trailers")
        .doc(fromAssociation.trailerId);
    }
    if (currentAssociation?.trailerId) {
      formattedItems.TrailerCurrent = db
        .collection("Trailers")
        .doc(currentAssociation.trailerId);
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

    const nextMachineIds = [
      fromAssociation?.machineId,
      currentAssociation?.machineId,
    ].filter(Boolean);

    const queuePhotoUpload = async (targetDocId) => {
      const hasNewPhotos = photos.some((photo) => photo && photo.file);
      if (!hasNewPhotos) {
        return photos.map((photo) => photo?.url).filter(Boolean);
      }
      if (waitForPhotos) {
        return uploadPhotos(targetDocId);
      }
      uploadPhotos(targetDocId).catch((error) => {
        console.error("Error uploading photos:", error);
      });
      return photos.map((photo) => photo?.url).filter(Boolean);
    };

    const withLocalSn = (payload, value) => {
      const localSn = String(value || "").trim();
      const indexedPayload = {
        ...payload,
        localSN: localSn,
        local_sn: localSn,
      };
      indexedPayload.generalSearchTokens = buildGeneralSearchTokens(
        indexedPayload,
        localSn
      );
      return indexedPayload;
    };

    const duplicateAisMessage = (localSn) =>
      `There is already an item with AIS "${localSn}". Please use a different AIS.`;

    const itemAisExists = async (localSn, ignoreDocId = "") => {
      const existingItem = await findExistingItemByAis(db, localSn, {
        ignoreDocId,
      });
      return Boolean(existingItem);
    };

    const generateAvailableDocId = async () => {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const generatedId = generateCustomID();
        if (!(await itemAisExists(generatedId))) {
          return generatedId;
        }
      }
      throw new Error("Could not generate a unique item ID. Please try again.");
    };

    let committedDocId = "";
    try {
      if (docId) {
        // Check if a localSN is provided and if it differs from the current docId.
        const newDocId =
          items.localSN && items.localSN.trim() !== ""
            ? items.localSN.trim()
            : docId;
        const payloadWithLocalSn = withLocalSn(formattedItems, newDocId);
        if (docId !== newDocId) {
          if (await itemAisExists(newDocId, docId)) {
            throw new Error(duplicateAisMessage(newDocId));
          }
          await commitItemWithMachineBacklinks({
            db,
            partId: newDocId,
            previousPartId: docId,
            itemData: payloadWithLocalSn,
            nextMachineIds,
            renameFieldsToReplace: ITEM_RENAME_FIELDS_TO_REPLACE,
          });

          docId = newDocId;
        } else {
          // Deep-clean the formattedItems to remove any undefined nested values.
          const cleanFormattedItems = shallowClean(payloadWithLocalSn);
          LEGACY_ITEM_ASSOCIATION_FIELDS.forEach((field) => {
            cleanFormattedItems[field] =
              firebase.firestore.FieldValue.delete();
          });
          if (!fromAssociation?.machineId) {
            cleanFormattedItems.MachineFrom =
              firebase.firestore.FieldValue.delete();
          }
          if (!currentAssociation?.machineId) {
            cleanFormattedItems.MachineCurrent =
              firebase.firestore.FieldValue.delete();
          }
          if (!fromAssociation?.clientId) {
            cleanFormattedItems.ClientFrom =
              firebase.firestore.FieldValue.delete();
          }
          if (!currentAssociation?.clientId) {
            cleanFormattedItems.ClientCurrent =
              firebase.firestore.FieldValue.delete();
          }
          if (!fromAssociation?.trailerId) {
            cleanFormattedItems.TrailerFrom =
              firebase.firestore.FieldValue.delete();
          }
          if (!currentAssociation?.trailerId) {
            cleanFormattedItems.TrailerCurrent =
              firebase.firestore.FieldValue.delete();
          }
          const clearMissingAssociationFields = (association, suffix) => {
            const typeField =
              suffix === "From"
                ? "fromAssociationType"
                : "currentAssociationType";
            const mapField = suffix === "From" ? "associationFrom" : "associationCurrent";
            if (!association) {
              cleanFormattedItems[typeField] =
                firebase.firestore.FieldValue.delete();
              cleanFormattedItems[mapField] =
                firebase.firestore.FieldValue.delete();
              cleanFormattedItems[`client${suffix}Id`] =
                firebase.firestore.FieldValue.delete();
            }
            if (!association?.machineId) {
              cleanFormattedItems[`machine${suffix}Id`] =
                firebase.firestore.FieldValue.delete();
            }
            if (!association?.trailerId) {
              cleanFormattedItems[`trailer${suffix}Id`] =
                firebase.firestore.FieldValue.delete();
            }
          };
          clearMissingAssociationFields(fromAssociation, "From");
          clearMissingAssociationFields(currentAssociation, "Current");
          cleanFormattedItems.associationTypeFrom =
            firebase.firestore.FieldValue.delete();
          cleanFormattedItems.associationTypeCurrent =
            firebase.firestore.FieldValue.delete();
          await commitItemWithMachineBacklinks({
            db,
            partId: docId,
            previousPartId: docId,
            itemData: cleanFormattedItems,
            nextMachineIds,
          });

        }
      } else {
        // For a new item, if localSN is provided, use it; otherwise, generate a custom ID.
        const requestedDocId =
          items.localSN && items.localSN.trim() !== "" ? items.localSN.trim() : "";
        docId = requestedDocId || (await generateAvailableDocId());
        if (requestedDocId && (await itemAisExists(docId))) {
          throw new Error(duplicateAisMessage(docId));
        }
        const payloadWithLocalSn = withLocalSn(formattedItems, docId);
        await commitItemWithMachineBacklinks({
          db,
          partId: docId,
          itemData: payloadWithLocalSn,
          nextMachineIds,
        });

      }

      committedDocId = docId;
      if (!forceNew) committedDocIdRef.current = docId;

      setItems((prev) => ({
        ...prev,
        localSN: docId,
        associationFrom: fromAssociation || null,
        associationCurrent: currentAssociation || null,
        fromAssociationType: fromAssociation?.associationType || "",
        currentAssociationType: currentAssociation?.associationType || "",
        clientFromId: fromAssociation?.clientId || "",
        clientCurrentId: currentAssociation?.clientId || "",
        machineFromId: fromAssociation?.machineId || "",
        machineCurrentId: currentAssociation?.machineId || "",
        trailerFromId: fromAssociation?.trailerId || "",
        trailerCurrentId: currentAssociation?.trailerId || "",
      }));
      setSaveHistory(nextSaveHistory);
      setSelectionHistory(forceNew ? [] : nextSelectionHistory);
      if (!forceNew) {
        setSavedDocId(docId);
      }
      await queuePhotoUpload(docId);

      if (selectedShippingGroupId) {
        await addItemToShippingGroup({
          db,
          firebase,
          groupId: selectedShippingGroupId,
          itemId: docId,
          previousItemId: existingId || "",
        });
      }

      try {
        const indexToken = currentUser ? await currentUser.getIdToken() : "";
        const indexResponse = await withTimeout(
          fetch("/api/items/sync-index", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(indexToken ? { Authorization: `Bearer ${indexToken}` } : {}),
            },
            body: JSON.stringify({
              itemId: docId,
              previousItemId: existingId && existingId !== docId ? existingId : "",
            }),
          }),
          20000,
          "Smart Camera index update"
        );
        if (!indexResponse.ok) {
          const indexError = await indexResponse.json().catch(() => ({}));
          throw new Error(indexError?.error || "Smart Camera index update failed.");
        }
      } catch (error) {
        console.error("Smart Camera index update failed:", error);
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

      if (redirect) {
        setSaveRedirectPath(`/NewSearch/item/${docId}`);
        handleShowSaveModal();
      } else {
        handleShowSaveModal();
      }
      return docId;
    } catch (error) {
      if (committedDocId) {
        console.error("Post-save follow-up failed:", error);
        setErr(
          `Item ${committedDocId} was saved, but a follow-up action failed: ${
            error?.message || "Unknown follow-up error"
          }`
        );
        setShowErr(true);
        return committedDocId;
      }
      if (error?.code === "warehouse-associations/target-exists") {
        error = new Error(
          duplicateAisMessage(String(items.localSN || docId || "").trim())
        );
      }
      console.error("Error saving data:", error);
      setErr(error?.message || "Save failed.");
      setShowErr(true);
      return null;
    }
  }

  const isReadyForActions =
    (items.name || "").trim() !== "" &&
    (descriptions[selectedDesc]?.description || "").trim() !== "";

  const ensureSaved = async (options = {}) => {
    if (!isReadyForActions) {
      handleShow();
      return null;
    }
    if (savedDocId || committedDocIdRef.current) {
      return savedDocId || committedDocIdRef.current;
    }
    const docId = await runItemSave(false, options);
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
      const idToken = await firebase.auth().currentUser?.getIdToken();
      const response = await fetch("/api/print/label", {
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
      console.log("Print result:", result);
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };

  const handleSendToInflow = async () => {
    try {
      const docId = await ensureSaved({ waitForPhotos: true });
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
    if (bluefolderLoading) return;

    const currentWorkOrder = (mostRecentWorkOrder?.workOrder || "").trim();
    if (!currentWorkOrder) {
      alert("Please fill out the work order field before adding to BlueFolder.");
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to send this item to BlueFolder work order ${currentWorkOrder}?`
      )
    ) {
      return;
    }

    setBluefolderLoading(true);
    try {
      const docId = await ensureSaved({ waitForPhotos: true });
      if (!docId) return;

      const currentUser = firebase.auth().currentUser;
      const submittedByEmail = currentUser?.email || "";

      const payload = {
        name: items.name,
        pn: items.pn[0] || "",
        sn: items.sn[0] || "",
        status: items.status,
        description: descriptions[selectedDesc]?.description || "",
        workOrder: currentWorkOrder,
        localsn: docId,
        taxable: false,
        taxableDefault: false,
        tax: false,
        submittedByEmail,
      };

      const idToken = await firebase.auth().currentUser?.getIdToken();
      const response = await fetch("/api/bluefolder/proxy", {
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
          `${result?.error || `BlueFolder proxy failed (${response.status})`}${
            detail ? ` | ${detail}` : ""
          }`
        );
      }
      alert("Item has been sent to BlueFolder successfully.");
      console.log("BlueFolder result:", result);
    } catch (error) {
      console.error("BlueFolder error:", error);
      alert(`Item was not sent to BlueFolder: ${error?.message || "Unknown error"}`);
    } finally {
      setBluefolderLoading(false);
    }
  };

  const handleAddToSlack = async (which = "shipping") => {
    if (slackLoadingKey) return;
    setSlackLoadingKey(which);
    try {
      const docId = await ensureSaved({ waitForPhotos: true });
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

      const rawDescription =
        selectedDesc != null && descriptions?.[selectedDesc]
          ? descriptions[selectedDesc].description || ""
          : items?.description || "";
      const currentUser = firebase.auth().currentUser;
      const submittedByEmail = currentUser?.email || authUser?.email || "";
      const description = rawDescription;

      const tracking = items?.trackingNumber ?? items?.tracking ?? "";
      const local_sn = docId || items?.localSN || "";

      const photoUrls = await uploadPhotos(docId);
      const shippingDate = items?.departure_date || "";
      const receivedDate = items?.arrival_date || "";

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
          description,
          submittedByEmail,
          photoUrls,
          shipping_date: shippingDate,
          received_date: receivedDate,
          departure_date: items?.departure_date || "",
          arrival_date: items?.arrival_date || "",
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

      const opsNote = mostRecentWO && ["shipping", "receiving"].includes(which)
        ? json?.opsMovement?.attached
          ? ` It is also linked to work order #${mostRecentWO} in Ops.`
          : ` Slack was updated, but work order #${mostRecentWO} could not be linked in Ops.`
        : "";
      alert(
        `Added to Slack ${
          which === "shipping"
            ? "Shipping"
            : which === "receiving"
            ? "Receiving"
            : "Tasks"
        } list.${opsNote}`
      );
    } catch (e) {
      console.error(e);
      setErr("Error adding to Slack");
      setShowErr(true);
    } finally {
      setSlackLoadingKey("");
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
      const docId = await runItemSave(false, { forceNew: true });
      if (docId) {
        // Prepare for the next clone without overwriting the last one.
        setSavedDocId(null);
        committedDocIdRef.current = "";
        setSelectionHistory([]);
        setSaveHistory([]);
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
    return (
      name &&
      ["interior socal", "interior norcal"].includes(name.toLowerCase())
    );
  };

  const handleSetSelectedMachine = (machine) => {
    if (!machine?.id) return;
    const isFromBranch = machinePick;
    beginBranchAssociationSelection(isFromBranch);
    const requestId = machineDetailRequestRef.current + 1;
    machineDetailRequestRef.current = requestId;
    const requestBranch = isFromBranch ? "from" : "current";
    updateMachineDetailHydrationForBranch(requestBranch, {
      requestId,
      machineId: machine.id,
      pending: true,
      error: "",
      machineData: null,
    });
    latestMachineDetailOwnerRef.current = {
      branch: requestBranch,
      requestId,
    };
    const isSocalInterior = ["interior socal", "interior norcal"].includes(
      machine.name?.toLowerCase()
    );
    const selectedMachineData = {
      ...stripAssociatedPartsFromMachineSnapshot(machine),
      id: machine.id,
      name: machine.name || machine.Model || machine.model || machine.id,
    };
    if (isFromBranch) {
      setSelectedMachine(selectedMachineData);
      setSelectedTrailerFrom(null);
      setAssociationTypeFrom(ITEM_ASSOCIATION_MACHINE);
      setShowLocalLocFrom(
        isSocalInterior || isSocalWarehouseClient(selectedClientFrom)
      );
    } else {
      setSelectedCurrentMachine(selectedMachineData);
      setSelectedTrailerCurrent(null);
      setAssociationTypeCurrent(ITEM_ASSOCIATION_MACHINE);
      setShowLocalLocCurrent(
        isSocalInterior || isSocalWarehouseClient(selectedClientCurrent)
      );
    }
    setShowMachineModal(false);
    fetchMachine(machine.id, requestId)
      .then((machineData) => {
        if (!machineData) return;
        updateMachineDetailHydrationForRequest(requestId, {
          pending: false,
          error: "",
          machineData,
        });
      })
      .catch((error) => {
        if (
          !findMachineDetailRequestBranch(
            machineDetailHydrationRef.current,
            requestId
          )
        ) return;
        const message =
          error?.message || "Failed to load the selected machine details.";
        updateMachineDetailHydrationForRequest(requestId, {
          pending: false,
          error: message,
        });
        setErr(`${message} Reselect the machine before saving.`);
        setShowErr(true);
      });
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

  const normalizeWarehouseText = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");

  const isSocalWarehouseClient = (client) => {
    const name = normalizeWarehouseText(client?.name);
    const location = normalizeWarehouseText(client?.location);
    return (
      client?.id === "AIS17182" ||
      name === "socalwarehouse" ||
      name.includes("socalwarehouselakeforest") ||
      (name.includes("socalwarehouse") && location.includes("lakeforest"))
    );
  };

  const isInteriorWarehouseMachine = (machine) =>
    ["interior socal", "interior norcal"].includes(
      machine?.name?.toLowerCase()
    );

  const shouldShowLocalLocation = (client, machine) =>
    isSocalWarehouseClient(client) || isInteriorWarehouseMachine(machine);

  const cloneLocalLocation = (value) => ({
    region: value?.region || "",
    section: {
      letter: value?.section?.letter || "",
      number: value?.section?.number || "",
    },
    bin: value?.bin || "",
    pallet: value?.pallet || "",
  });

  const handleAssociationTypeChange = (isFromBranch, nextType) => {
    if (isFromBranch) {
      setAssociationTypeFrom(nextType);
      if (nextType === ITEM_ASSOCIATION_SITE) {
        setSelectedTrailerFrom(null);
        setSelectedMachine(null);
        cancelMachineDetailHydration(true);
      } else if (nextType === ITEM_ASSOCIATION_MACHINE) {
        setSelectedTrailerFrom(null);
      } else if (!selectedTrailerFrom) {
        setSelectedMachine(null);
        cancelMachineDetailHydration(true);
      }
    } else {
      setAssociationTypeCurrent(nextType);
      if (nextType === ITEM_ASSOCIATION_SITE) {
        setSelectedTrailerCurrent(null);
        setSelectedCurrentMachine(null);
        cancelMachineDetailHydration(false);
      } else if (nextType === ITEM_ASSOCIATION_MACHINE) {
        setSelectedTrailerCurrent(null);
      } else if (!selectedTrailerCurrent) {
        setSelectedCurrentMachine(null);
        cancelMachineDetailHydration(false);
      }
    }
  };

  const openMachineModalForBranch = async (isFromBranch) => {
    setMachinePick(isFromBranch);
    handleShowMachineModal();
    try {
      await loadMachineOptionsForBranch(isFromBranch);
    } catch (error) {
      if (error?.name === "AbortError") return;
      setErr(error?.message || "Failed to load machines for this client.");
      setShowErr(true);
    }
  };

  const handleSwapFromCurrent = () => {
    beginBranchAssociationSelection(true);
    beginBranchAssociationSelection(false);
    swapMachineDetailHydrationBranches();
    const nextFromClient = selectedClientCurrent;
    const nextCurrentClient = selectedClientFrom;
    const nextFromTrailer = selectedTrailerCurrent;
    const nextCurrentTrailer = selectedTrailerFrom;
    const nextFromMachine = selectedCurrentMachine;
    const nextCurrentMachine = selectedMachine;
    const nextAssociationTypeFrom = associationTypeCurrent;
    const nextAssociationTypeCurrent = associationTypeFrom;
    const nextNewLocalFrom = cloneLocalLocation(newLocalCurrent);
    const nextNewLocalCurrent = cloneLocalLocation(newLocalFrom);

    setSelectedClientFrom(nextFromClient);
    setSelectedClientCurrent(nextCurrentClient);
    setSelectedTrailerFrom(nextFromTrailer);
    setSelectedTrailerCurrent(nextCurrentTrailer);
    setSelectedMachine(nextFromMachine);
    setSelectedCurrentMachine(nextCurrentMachine);
    setAssociationTypeFrom(nextAssociationTypeFrom);
    setAssociationTypeCurrent(nextAssociationTypeCurrent);
    setNewLocalFrom(nextNewLocalFrom);
    setNewLocalCurrent(nextNewLocalCurrent);
    setShowLocalLocFrom(
      shouldShowLocalLocation(nextFromClient, nextFromMachine)
    );
    setShowLocalLocCurrent(
      shouldShowLocalLocation(nextCurrentClient, nextCurrentMachine)
    );
  };

  useEffect(() => {
    setShowLocalLocFrom(
      shouldShowLocalLocation(selectedClientFrom, selectedMachine)
    );
  }, [selectedClientFrom, selectedMachine]);

  useEffect(() => {
    setShowLocalLocCurrent(
      shouldShowLocalLocation(selectedClientCurrent, selectedCurrentMachine)
    );
  }, [selectedClientCurrent, selectedCurrentMachine]);

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
      <Modal show={showSaveModal} onHide={handleCloseSaveModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Item Saved</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item has been saved successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSaveModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSaveHistoryModal} onHide={handleCloseSaveHistoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Save History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Saved At</th>
                <th>Saved By</th>
              </tr>
            </thead>
            <tbody>
              {(saveHistory || []).length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center text-muted">
                    No save history yet.
                  </td>
                </tr>
              ) : (
                [...(saveHistory || [])].reverse().map((entry, index) => (
                  <tr key={`${entry?.savedAt || "save"}-${index}`}>
                    <td>
                      {entry?.savedAt
                        ? new Date(entry.savedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td>{entry?.savedByEmail || entry?.email || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSaveHistoryModal}>
            Close
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
        loading={machineOptionsLoading}
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

      <Modal
        show={Boolean(trailerLinkPrompt)}
        onHide={handleDeclineTrailerLink}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Link this item to a trailer?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{trailerLinkPrompt?.clientName}</strong> currently has
            {trailerLinkPrompt?.trailers?.length === 1
              ? " a trailer"
              : " multiple trailers"} linked to it. Should this item&apos;s{" "}
            <strong>
              {trailerLinkPrompt?.isFromBranch ? "From" : "Current"}
            </strong>{" "}
            location be connected to a trailer?
          </p>
          {trailerLinkPrompt?.trailers?.length === 1 ? (
            <p className="mb-0">
              Trailer: <strong>{trailerLinkPrompt.trailers[0].name}</strong>
            </p>
          ) : (
            <Form.Group controlId="new-item-client-trailer-confirmation">
              <Form.Label>Choose the trailer</Form.Label>
              <Form.Select
                value={trailerLinkPrompt?.trailerId || ""}
                onChange={(event) =>
                  setTrailerLinkPrompt((previous) => ({
                    ...previous,
                    trailerId: event.target.value,
                  }))
                }
              >
                <option value="">Select a trailer</option>
                {(trailerLinkPrompt?.trailers || []).map((trailer) => (
                  <option key={trailer.id} value={trailer.id}>
                    {trailer.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeclineTrailerLink}>
            No, client only
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmTrailerLink}
            disabled={!trailerLinkPrompt?.trailerId}
          >
            Yes, link trailer
          </Button>
        </Modal.Footer>
      </Modal>

      <ParentModal
        show={showParentModal}
        handleClose={handleCloseParentModal}
        selectionMode="single"
        selectedItems={selectedParent ? [selectedParent] : []}
        onConfirm={(items = []) => setSelectedParent(items[0] || null)}
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
      {/* Smart Camera comparison modal */}
      <Modal
        show={showAnalysisModal}
        onHide={() => setShowAnalysisModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className={styles.analysisModalHeader}>
          <div>
            <div className={styles.analysisKicker}>Smart Camera</div>
            <Modal.Title>
              {analysisResult?.match
                ? "Is this a good comparison?"
                : "No close catalog match found"}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className={styles.analysisModalBody}>
          {analysisResult?.match ? (
            <>
              <div className={styles.analysisSummary}>
                <div>
                  <div className={styles.analysisMatchLabel}>Closest match</div>
                  <h4 className={styles.analysisMatchName}>
                    {analysisResult.match.name || "Unnamed catalog item"}
                  </h4>
                  <div className={styles.analysisItemId}>
                    Inventory ID: {analysisResult.match.id}
                  </div>
                </div>
                <div
                  className={`${styles.analysisConfidence} ${
                    analysisResult.match.isLikelySameItem
                      ? styles.analysisConfidenceStrong
                      : styles.analysisConfidenceReview
                  }`}
                >
                  {Math.round((analysisResult.match.confidence || 0) * 100)}%
                  <span>match confidence</span>
                </div>
              </div>

              {!analysisResult.match.isLikelySameItem && (
                <div className={styles.analysisReviewNotice}>
                  This is the closest available item, but the evidence is not
                  strong. Check the PN and photos carefully before using it.
                </div>
              )}

              <div className={styles.analysisComparisonGrid}>
                <div className={styles.analysisPhotoCard}>
                  <div className={styles.analysisPhotoLabel}>New item</div>
                  {photos[0]?.url ? (
                    <img src={photos[0].url} alt="New item" />
                  ) : (
                    <div className={styles.analysisPhotoPlaceholder}>
                      No preview
                    </div>
                  )}
                </div>
                <div className={styles.analysisPhotoCard}>
                  <div className={styles.analysisPhotoLabel}>Catalog item</div>
                  {matchPreviewLoading ? (
                    <div className={styles.analysisPhotoPlaceholder}>
                      <Spinner animation="border" size="sm" />
                    </div>
                  ) : matchPreviewUrl ? (
                    <img src={matchPreviewUrl} alt="Catalog comparison" />
                  ) : (
                    <div className={styles.analysisPhotoPlaceholder}>
                      No catalog photo available
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.analysisFieldGrid}>
                <div>
                  <span>PN</span>
                  <strong>
                    {(analysisResult.match.partNumbers || []).join(", ") ||
                      "Not recorded"}
                  </strong>
                </div>
                <div>
                  <span>OEM</span>
                  <strong>
                    {(analysisResult.match.oem || []).join(", ") ||
                      "Not recorded"}
                  </strong>
                </div>
                <div>
                  <span>Modality</span>
                  <strong>
                    {(analysisResult.match.modality || []).join(", ") ||
                      "Not recorded"}
                  </strong>
                </div>
                <div>
                  <span>Model</span>
                  <strong>
                    {(analysisResult.match.model || []).join(", ") ||
                      "Not recorded"}
                  </strong>
                </div>
              </div>

              {(analysisResult.match.reasons || []).length > 0 && (
                <div className={styles.analysisReasons}>
                  <div>Why it matched</div>
                  <ul>
                    {analysisResult.match.reasons.map((reason, index) => (
                      <li key={`${reason}-${index}`}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
              <OemEvidenceCard evidence={analysisResult.oemEvidence} />
            </>
          ) : (
            <div className={styles.analysisEmptyState}>
              <div className={styles.analysisEmptyIcon}>?</div>
              <h4>We could not find a useful comparison yet.</h4>
              <p>
                {analysisResult?.message ||
                  "Try adding a sharp, close photo of the label and another photo of the full item."}
              </p>
              {(analysisResult?.observation?.partNumbers || []).length > 0 && (
                <div className={styles.analysisObservedPn}>
                  Label PN read: {analysisResult.observation.partNumbers.join(", ")}
                </div>
              )}
              <OemEvidenceCard evidence={analysisResult?.oemEvidence} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowAnalysisModal(false)}
          >
            {analysisResult?.match ? "No, keep my fields" : "Close"}
          </Button>
          {analysisResult?.match && (
            <Button variant="primary" onClick={applyAnalysisMatch}>
              Yes, fill item fields
            </Button>
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
                    <ItemMovementDateField items={items} setItems={setItems} />
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
                      {(selectedClientFrom || selectedTrailerFrom) && (
                        <div
                          style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            marginBottom: "1rem",
                          }}
                        >
                          {selectedClientFrom && (
                            <p>
                              <strong>Selected Client/Site (From):</strong>{" "}
                              {selectedClientFrom.name}
                              {selectedClientFrom.derivedFromTrailer && (
                                <span className="text-warning ms-2">
                                  Legacy live-derived value — verify before saving
                                </span>
                              )}
                            </p>
                          )}
                          <ItemAssociationTypeControl
                            value={associationTypeFrom}
                            onChange={(nextType) =>
                              handleAssociationTypeChange(true, nextType)
                            }
                            hasTrailerOptions={allTrailerOptions.length > 0}
                            branchLabel="From"
                          />
                          {associationTypeFrom === ITEM_ASSOCIATION_TRAILER && (
                            <Form.Group className="mb-2">
                              <Form.Label>Trailer</Form.Label>
                              <Form.Select
                                value={selectedTrailerFrom?.id || ""}
                                onChange={(event) =>
                                  handleTrailerSelection(true, event.target.value)
                                }
                              >
                                <option value="">Choose a trailer</option>
                                {allTrailerOptions.map((trailer) => (
                                  <option key={trailer.id} value={trailer.id}>
                                    {trailer.name}
                                    {trailer.clientId === selectedClientFrom?.id
                                      ? " — at selected site"
                                      : ""}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Text muted>
                                Selecting a trailer fills its current client and linked
                                machine. You can change the client/site separately afterward.
                              </Form.Text>
                            </Form.Group>
                          )}
                          {selectedTrailerFrom && (
                            <div className="mb-2">
                              <div className="d-flex align-items-center gap-2">
                              <span>
                                <strong>Selected Trailer (From):</strong>{" "}
                                {selectedTrailerFrom.name}
                              </span>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => setSelectedTrailerFrom(null)}
                              >
                                Remove trailer
                              </Button>
                              </div>
                              <small className="text-muted">
                                The client/site above is stored on the item as its
                                historical source.
                              </small>
                            </div>
                          )}
                          {associationTypeFrom === ITEM_ASSOCIATION_MACHINE && (
                          <div style={{ marginTop: "0.5rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => openMachineModalForBranch(true)}
                            >
                              Select Machine for{" "}
                              {selectedClientFrom?.name || selectedTrailerFrom?.name}
                            </Button>
                            {selectedMachine && (
                              <p style={{ marginTop: "0.5rem" }}>
                                <strong>Selected Machine (From):</strong>{" "}
                                {selectedMachine.name}
                              </p>
                            )}
                          </div>
                          )}
                          {associationTypeFrom === ITEM_ASSOCIATION_TRAILER &&
                            selectedMachine && (
                              <p className="mb-0">
                                <strong>Linked machine inside trailer:</strong>{" "}
                                {selectedMachine.name}
                              </p>
                            )}
                        </div>
                      )}
                      <LocationControls
                        selectedClient={selectedClientFrom}
                        value={newLocalFrom}
                        onChange={setNewLocalFrom}
                        warehouseEnabled={isSocalWarehouseClient(selectedClientFrom)}
                        variant="outline-secondary"
                        borderColor="#9aa4b2"
                      />
                    </Col>
                    <Col
                      xs={12}
                      md="auto"
                      className="d-flex align-items-start justify-content-center"
                    >
                      <Button
                        variant="outline-primary"
                        onClick={handleSwapFromCurrent}
                        disabled={
                          !selectedClientFrom &&
                          !selectedClientCurrent &&
                          !selectedTrailerFrom &&
                          !selectedTrailerCurrent
                        }
                        title="Swap from and current client/machine"
                        aria-label="Swap from and current client/machine"
                        className="mb-3 p-1"
                        style={{
                          width: "2.25rem",
                          height: "2.25rem",
                          lineHeight: 1,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                            lineHeight: 0.9,
                          }}
                        >
                          <span>&rarr;</span>
                          <span>&larr;</span>
                        </span>
                      </Button>
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
                      {(selectedClientCurrent || selectedTrailerCurrent) && (
                        <div
                          style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            marginBottom: "1rem",
                          }}
                        >
                          {selectedClientCurrent && (
                            <p>
                              <strong>Selected Client/Site (Current):</strong>{" "}
                              {selectedClientCurrent.name}
                              {selectedClientCurrent.derivedFromTrailer && (
                                <span className="text-warning ms-2">
                                  Legacy live-derived value — verify before saving
                                </span>
                              )}
                            </p>
                          )}
                          <ItemAssociationTypeControl
                            value={associationTypeCurrent}
                            onChange={(nextType) =>
                              handleAssociationTypeChange(false, nextType)
                            }
                            hasTrailerOptions={allTrailerOptions.length > 0}
                            branchLabel="Current"
                          />
                          {associationTypeCurrent === ITEM_ASSOCIATION_TRAILER && (
                            <Form.Group className="mb-2">
                              <Form.Label>Trailer</Form.Label>
                              <Form.Select
                                value={selectedTrailerCurrent?.id || ""}
                                onChange={(event) =>
                                  handleTrailerSelection(false, event.target.value)
                                }
                              >
                                <option value="">Choose a trailer</option>
                                {allTrailerOptions.map((trailer) => (
                                  <option key={trailer.id} value={trailer.id}>
                                    {trailer.name}
                                    {trailer.clientId === selectedClientCurrent?.id
                                      ? " — at selected site"
                                      : ""}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Text muted>
                                Selecting a trailer fills its current client and linked
                                machine. You can change the client/site separately afterward.
                              </Form.Text>
                            </Form.Group>
                          )}
                          {selectedTrailerCurrent && (
                            <div className="mb-2">
                              <div className="d-flex align-items-center gap-2">
                              <span>
                                <strong>Selected Trailer (Current):</strong>{" "}
                                {selectedTrailerCurrent.name}
                              </span>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => setSelectedTrailerCurrent(null)}
                              >
                                Remove trailer
                              </Button>
                              </div>
                              <small className="text-muted">
                                The client/site above is stored separately on this item.
                              </small>
                            </div>
                          )}
                          {associationTypeCurrent === ITEM_ASSOCIATION_MACHINE && (
                          <div style={{ marginTop: "0.5rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => openMachineModalForBranch(false)}
                            >
                              Select Machine for{" "}
                              {selectedClientCurrent?.name || selectedTrailerCurrent?.name}
                            </Button>
                            {selectedCurrentMachine && (
                              <p style={{ marginTop: "0.5rem" }}>
                                <strong>Selected Machine (Current):</strong>{" "}
                                {selectedCurrentMachine.name}
                              </p>
                            )}
                          </div>
                          )}
                          {associationTypeCurrent === ITEM_ASSOCIATION_TRAILER &&
                            selectedCurrentMachine && (
                              <p className="mb-0">
                                <strong>Linked machine inside trailer:</strong>{" "}
                                {selectedCurrentMachine.name}
                              </p>
                            )}
                        </div>
                      )}
                      <LocationControls
                        selectedClient={selectedClientCurrent}
                        value={newLocalCurrent}
                        onChange={setNewLocalCurrent}
                        warehouseEnabled={isSocalWarehouseClient(selectedClientCurrent)}
                        variant="outline-primary"
                        borderColor="#4b8bf4"
                      />
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
                <ShippingGroupField
                  itemId={savedDocId || ""}
                  value={selectedShippingGroupId}
                  onChange={setSelectedShippingGroupId}
                />

                {/* Photo Action Row */}
                <div style={{ marginBottom: "1rem" }}>
                  <Row className={`mb-3 ${styles.photoActionsRow}`}>
                    <Col xs={12} md={6}>
                      <ButtonGroup>
                        <Button
                          variant="outline-secondary"
                          onClick={handleShowCameraModal}
                        >
                          Take {activePhotoCategory} Photo
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={handleBrowsePhotos}
                        >
                          Browse {activePhotoCategory}
                        </Button>
                        <Button
                          variant="primary"
                          className={styles.analyzeButton}
                          onClick={handleAnalyzePhotos}
                          disabled={!photos.length || analyzingPhotos}
                        >
                          {analyzingPhotos ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                              />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze"
                          )}
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col xs={12} md={6} className={styles.photoActionsRight}>
                      <Button
                        variant="success"
                        onClick={handleSendToInflow}
                        disabled={!isReadyForActions || saveOperationPending}
                        style={{ marginLeft: "auto" }}
                      >
                        Send to inFlow
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleBluefolderButton}
                        disabled={
                          !isReadyForActions ||
                          bluefolderLoading ||
                          saveOperationPending
                        }
                        style={{ marginLeft: "0.5rem", marginRight: ".5rem" }}
                      >
                        {bluefolderLoading ? "Sending..." : "BlueFolder"}
                      </Button>
                      <Button
                        variant={addToWebsite ? "primary" : "outline-primary"}
                        onClick={handleToggleAddToWebsite}
                        disabled={!isReadyForActions || saveOperationPending}
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
                <ItemPhotoTabs
                  photos={photos}
                  activeCategory={activePhotoCategory}
                  onCategoryChange={setActivePhotoCategory}
                  onRemovePhoto={removePhoto}
                />
                {/* Extra Section: Dimensions, Price, and DOM */}

                {/* Submit Row */}
                <div className={`mt-3 d-flex flex-wrap align-items-center ${styles.actionRow}`}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={
                      loading ||
                      saveOperationPending ||
                      associationHydration.pending ||
                      Boolean(associationHydration.error) ||
                      associationSelectionPending ||
                      Boolean(associationSelectionError) ||
                      machineDetailHydrationSummary.pending ||
                      Boolean(machineDetailHydrationSummary.error)
                    }
                    style={{ marginRight: "1rem" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="info"
                    onClick={handleClone}
                    disabled={
                      loading ||
                      saveOperationPending ||
                      associationHydration.pending ||
                      Boolean(associationHydration.error) ||
                      associationSelectionPending ||
                      Boolean(associationSelectionError) ||
                      machineDetailHydrationSummary.pending ||
                      Boolean(machineDetailHydrationSummary.error)
                    }
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
                          disabled={
                            !isReadyForActions ||
                            Boolean(slackLoadingKey) ||
                            saveOperationPending
                          }
                          style={{
                            border: "none",
                            borderRight: "1px solid #ced4da",
                          }}
                        >
                          {slackLoadingKey === "receiving"
                            ? "Receiving..."
                            : "Receiving"}
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleAddToSlack("shipping")}
                          disabled={
                            !isReadyForActions ||
                            Boolean(slackLoadingKey) ||
                            saveOperationPending
                          }
                          style={{ border: "none" }}
                        >
                          {slackLoadingKey === "shipping"
                            ? "Shipping..."
                            : "Shipping"}
                        </Button>
                      </div>
                    </div>
                  )}
                  <Button
                    variant="info"
                    onClick={handlePrint}
                    disabled={!isReadyForActions || saveOperationPending}
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
                        {isAdminUser && (
                          <div className="mt-2">
                            <Button
                              variant="outline-secondary"
                              onClick={handleShowSaveHistoryModal}
                            >
                              Save History
                            </Button>
                          </div>
                        )}
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







