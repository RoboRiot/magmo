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
  Table,
} from "react-bootstrap";

import Link from "next/link";
import { useAuth } from "../../../../context/AuthUserContext";
import firebase from "../../../../context/Firebase";
import LoggedIn from "../../../LoggedIn";
import { useRouter } from "next/router";
import {
  fetchClients,
  fetchMachinesForClient,
} from "../../../../utils/fetchAssociations";
import ClientTable from "../../../../utils/ClientTable";
import ParentModal from "../../AddItem/parentModal";
import dynamic from "next/dynamic";
import InfoModal from "../../InfoModal";
import MachineSelectionModal from "./MachineSelectionModal";
import MachineCreationModal from "../../MachineCreationModal";
import NewLocal, { LocationControls } from "./NewLocal";
import styles from "../../AddItem/NewItem.module.css";

//inflow API
import InflowAPI from "../../../../utils/inflowAPI";
import {
  buildLocalLocObject,
  formatLoc,
  updateMachineFields,
  buildNameTokens,
  buildGeneralSearchTokens,
  buildWorkOrderTokens,
  getItemCreatedDate,
  getMostRecentDatedEntry,
  getMostRecentDatedEntryIndex,
  findExistingItemByAis,
} from "../../../../utils/itemFormShared";
import MultiSelectDropdown from "../../../../components/MultiSelectDropdown";
import ItemMovementDateField from "../../../../components/ItemMovementDateField";
import {
  fetchTrackerCatalog,
  buildAllOems,
  buildModelsForSelection,
  syncTrackerFromSelections,
  deleteTrackerOem,
  deleteTrackerModel,
} from "../../../../utils/trackerCatalog";
import {
  buildMachineSummary,
  buildMachineDetailHydrationSeed,
  commitItemWithMachineBacklinks,
  createMachineDetailHydrationState,
  findMachineDetailRequestBranch,
  stripAssociatedPartsFromMachineSnapshot,
  stripEmbeddedMachineAssociations,
  summarizeMachineDetailHydration,
} from "../../../../utils/warehouseAssociations";
import {
  appendSaveHistory,
} from "../../../../utils/itemAudit";
import {
  createItemPhotoStorageName,
  getItemPhotoCategory,
  normalizeItemPhotoCategory,
} from "../../../../utils/itemPhotos";
import { addItemToShippingGroup } from "../../../../utils/inventoryGroups";
import ItemPhotoTabs from "../../../../components/ItemPhotoTabs";
import ShippingGroupField from "../../../../components/ShippingGroupField";
import ItemAssociationTypeControl, {
  buildItemAssociationSnapshot,
  inferItemAssociationType,
  itemAssociationTypeForStorage,
  ITEM_ASSOCIATION_MACHINE,
  ITEM_ASSOCIATION_SITE,
  ITEM_ASSOCIATION_TRAILER,
} from "../../../../components/ItemAssociationTypeControl";
import associatedPartRoles from "../../../../lib/associatedPartRoles.cjs";
const {
  trailerClientId,
  trailerMachineId,
  trailerName,
  trailersForClient,
} = require("../../../../lib/ops/trailerClientLinks.cjs");
const {
  buildStorageUnitRoute,
  isReservedStorageUnitId,
} = require("../../../../lib/inventory/storageUnitContract.cjs");
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

function preserveStoredAssociationSnapshot(nextAssociation, storedSnapshot) {
  if (!nextAssociation || !storedSnapshot) return nextAssociation;
  const identityFields = [
    "associationType",
    "clientId",
    "machineId",
    "trailerId",
  ];
  const matchesStoredIdentity = identityFields.every((field) => {
    const nextValue = String(nextAssociation?.[field] || "")
      .trim()
      .toLowerCase();
    const storedValue = String(storedSnapshot?.[field] || "")
      .trim()
      .toLowerCase();
    return nextValue === storedValue;
  });
  if (!matchesStoredIdentity) return nextAssociation;

  const preserveField = (field) =>
    Object.prototype.hasOwnProperty.call(storedSnapshot, field)
      ? storedSnapshot[field]
      : nextAssociation[field];
  return {
    ...storedSnapshot,
    ...nextAssociation,
    clientNameSnapshot: preserveField("clientNameSnapshot"),
    clientLocationSnapshot: preserveField("clientLocationSnapshot"),
    machineNameSnapshot: preserveField("machineNameSnapshot"),
    trailerNameSnapshot: preserveField("trailerNameSnapshot"),
    effectiveAt: preserveField("effectiveAt"),
    effectiveAtSource: preserveField("effectiveAtSource"),
    resolutionSource: preserveField("resolutionSource"),
  };
}

// Import for SSR
import { adminDb } from "../../../../context/FirebaseAdmin";

// This will only load the component on the client-side.
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

// Simulates a network request delay.
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

function isValidMachineValue(value) {
  if (value == null) return false;
  if (Array.isArray(value)) {
    return value.some((v) => {
      const trimmed = String(v || "").trim();
      return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
    });
  }
  if (typeof value !== "string") return Boolean(value);
  const trimmed = value.trim();
  return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
}

function normalizeSelection(value) {
  if (Array.isArray(value)) {
    return value
      .map((v) => String(v).trim())
      .filter((v) => v && v.toLowerCase() !== "n/a");
  }
  if (value == null) return [];
  const normalized = String(value).trim();
  if (!normalized || normalized.toLowerCase() === "n/a") return [];
  return [normalized];
}

function uniqueSelection(values) {
  return Array.from(new Set(values || []));
}

function selectionToStoredValue(values) {
  const cleaned = uniqueSelection(normalizeSelection(values));
  if (cleaned.length === 0) return "";
  if (cleaned.length === 1) return cleaned[0];
  return cleaned;
}

function selectionToPrintValue(values) {
  const cleaned = uniqueSelection(normalizeSelection(values));
  if (cleaned.length === 0) return "";
  if (cleaned.length === 1) return cleaned[0];
  return "Multi";
}

function mergeOptionsWithSelection(options, selected) {
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
}


function DisplayItemInner({ initialItem, initialMachineData, error }) {
  // Feature flag to show/hide the 3 Slack buttons
  const SHOW_SLACK_BUTTONS =
    process.env.NEXT_PUBLIC_SHOW_SLACK_BUTTONS === "true";

  const router = useRouter();
  const { signOut, authUser } = useAuth();
  const isAdminUser =
    authUser?.isAdmin === true || String(authUser?.role || "").toLowerCase() === "admin";
  // const { id } = router.query;
  const { id: idFromRouter } = router.query;
  const initialId = idFromRouter || initialItem?.id;
  // Use a single local var everywhere in this component
  const id = initialId;
  const itemLoadRequestRef = useRef(0);
  const committedItemIdRef = useRef(String(initialId || "").trim());

  const [items, setItems] = useState({
    name: initialItem?.name || "",
    pn: Array.isArray(initialItem?.pn)
      ? initialItem.pn
      : (initialItem?.pn ? [initialItem.pn] : []),
    sn: Array.isArray(initialItem?.sn)
      ? initialItem.sn
      : (initialItem?.sn ? [initialItem.sn] : []),

    // hydrate these from initialItem so SSR renders fully on deploy
    price: initialItem?.price ?? "",
    status: initialItem?.status ?? "",
    length: initialItem?.length ?? "",
    width: initialItem?.width ?? "",
    height: initialItem?.height ?? "",
    poNumber: initialItem?.poNumber ?? "",
    trackingNumber: initialItem?.trackingNumber ?? "",
    localSN: initialItem?.localSN || initialId || "",
    arrival_date: initialItem?.arrival_date || "",
    departure_date: initialItem?.departure_date || "",
    movementDateType:
      initialItem?.movementDateType === "departure" ? "departure" : "arrival",
    date: initialItem?.date || "",
    dateCreated: initialItem?.dateCreated || "",
    visible: initialItem?.visible ?? true,
    attached: initialItem?.attached === true,
  });
  const [savedName, setSavedName] = useState(initialItem?.name || "");
  // ⬇️ put this INSIDE DisplayItem, after the related useState hooks
  useEffect(() => {
    if (!initialItem) return;

    setDescriptions(initialItem.descriptions || []);
    setWorkOrders(initialItem.workOrders || []);
    setSelectedDesc(
      Math.max(
        0,
        getMostRecentDatedEntryIndex(initialItem.descriptions || [])
      )
    );
    setSelectionHistory(
      Array.isArray(initialItem.selectionHistory)
        ? initialItem.selectionHistory
        : []
    );
    setSaveHistory(
      Array.isArray(initialItem.saveHistory) ? initialItem.saveHistory : []
    );
    setDOM(initialItem.DOM || "");

    setItems(prev => ({
      ...prev,
      // only overwrite if SSR provided a value; otherwise keep what you have
      status: initialItem.status ?? prev.status ?? "",
      price: initialItem.price ?? prev.price ?? "",
      length: initialItem.length ?? prev.length ?? "",
      width: initialItem.width ?? prev.width ?? "",
      height: initialItem.height ?? prev.height ?? "",
      poNumber: initialItem.poNumber ?? prev.poNumber ?? "",
      trackingNumber: initialItem.trackingNumber ?? prev.trackingNumber ?? "",
      localSN: initialItem.localSN ?? prev.localSN ?? initialItem.id ?? "",
      arrival_date: initialItem.arrival_date ?? prev.arrival_date ?? "",
      departure_date: initialItem.departure_date ?? prev.departure_date ?? "",
      movementDateType:
        initialItem.movementDateType === "departure"
          ? "departure"
          : prev.movementDateType || "arrival",
      date: initialItem.date ?? prev.date ?? "",
      dateCreated: initialItem.dateCreated ?? prev.dateCreated ?? "",
    }));

    if (initialItem.name) {
      setSavedName(initialItem.name);
    }
  }, [initialItem]);

  useEffect(() => {
    let isCancelled = false;

    const logQuickbooksAuthDebug = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const tokenResult = currentUser
          ? await currentUser.getIdTokenResult()
          : null;

        if (isCancelled) return;

        console.group("[Quickbooks Debug] Access Check");
        console.log("route item id:", id);
        console.log("authUser (context):", authUser);
        console.log("authUser.role:", authUser?.role || null);
        console.log("authUser.isAdmin:", authUser?.isAdmin ?? null);
        console.log("computed isAdminUser:", isAdminUser);
        console.log(
          "firebase.currentUser.email:",
          currentUser?.email || null
        );
        console.log("firebase token claims:", tokenResult?.claims || null);
        console.log("firebase token claims.role:", tokenResult?.claims?.role ?? null);
        console.log(
          "firebase token claims.isAdmin:",
          tokenResult?.claims?.isAdmin ?? null
        );
        if (!isAdminUser) {
          console.warn(
            "Quickbooks button is disabled because computed isAdminUser is false."
          );
        }
        console.groupEnd();
      } catch (debugError) {
        console.error("[Quickbooks Debug] Failed to read auth claims:", debugError);
      }
    };

    logQuickbooksAuthDebug();

    return () => {
      isCancelled = true;
    };
  }, [authUser, id, isAdminUser]);



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

  // New states for separate client selections:
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
  const [trailers, setTrailers] = useState([]);
  const [trailerLinkPrompt, setTrailerLinkPrompt] = useState(null);
  const trailerOptionsFrom = useMemo(() => {
    const matches = trailersForClient(trailers, selectedClientFrom?.id);
    return selectedTrailerFrom && !matches.some((entry) => entry.id === selectedTrailerFrom.id)
      ? [selectedTrailerFrom, ...matches]
      : matches;
  }, [selectedClientFrom?.id, selectedTrailerFrom, trailers]);
  const trailerOptionsCurrent = useMemo(() => {
    const matches = trailersForClient(trailers, selectedClientCurrent?.id);
    return selectedTrailerCurrent &&
      !matches.some((entry) => entry.id === selectedTrailerCurrent.id)
      ? [selectedTrailerCurrent, ...matches]
      : matches;
  }, [selectedClientCurrent?.id, selectedTrailerCurrent, trailers]);
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

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedCurrentMachine, setSelectedCurrentMachine] = useState(null);

  // whenever you pick a new “From” client or machine, clear the old From-loc:
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientFrom, selectedMachine]);
  // const didMountFrom = useRef(false);

  // useEffect(() => {
  //   if (!didMountFrom.current) {
  //     // first time through (the data-load phase), don’t clear
  //     didMountFrom.current = true;
  //     return;
  //   }
  //   // thereafter, when the user picks a new client or machine, clear:
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  //   setLocalLocFrom("");
  // }, [selectedClientFrom, selectedMachine]);

  // whenever you pick a new “Current” client or machine, clear the old Current-loc:
  // useEffect(() => {
  //   setNewLocalCurrent({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);
  // const [didFetch, setDidFetch] = useState(false);

  // useEffect(() => {
  //   if (!didFetch) {
  //     // we’re in the data-load phase, skip clearing
  //     setDidFetch(true);
  //     return;
  //   }
  //   // only clear on subsequent user changes:
  //   setNewLocalCurrent({ region: "", section: {}, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);

  // These arrays will be populated from Firebase.
  const [pnOptions, setPnOptions] = useState([]);
  const [snOptions, setSnOptions] = useState([]);
  const [pnSnLoaded, setPnSnLoaded] = useState(false);
  const [pnSnLoading, setPnSnLoading] = useState(false);

  const [descriptions, setDescriptions] = useState([
    { description: "", date: "" },
  ]);
  const [workOrders, setWorkOrders] = useState([{ workOrder: "", date: "" }]);
  const [clients, setClients] = useState([]);
  const [clientsLoaded, setClientsLoaded] = useState(false);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [activePhotoCategory, setActivePhotoCategory] = useState("item");
  const [selectedShippingGroupId, setSelectedShippingGroupId] = useState("");
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [Err, setErr] = useState("N/A");
  const [showDescModal, setShowDescModal] = useState(false);
  const [showWoModal, setShowWoModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSaveHistoryModal, setShowSaveHistoryModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [machineSelectionModal, setMachineSelectionModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState(() =>
    Math.max(
      0,
      getMostRecentDatedEntryIndex(initialItem?.descriptions || [])
    )
  );
  const cameraContainerRef = useRef(null);

  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [originalChildIds, setOriginalChildIds] = useState([]);
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
  const [clientSearch, setClientSearch] = useState("");
  const [machineSearch, setMachineSearch] = useState("");
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showCreateMachineModal, setShowCreateMachineModal] = useState(false);
  const [savingClient, setSavingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    location: "",
  });
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
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
  // State for the extra (dimensions/price/DOM/PO Number) section.
  const [showExtra, setShowExtra] = useState(false);
  const [bluefolderLoading, setBluefolderLoading] = useState(false);
  const [slackLoadingKey, setSlackLoadingKey] = useState("");

  const [trackerCatalog, setTrackerCatalog] = useState({
    modalities: [],
    oemsByModality: {},
    modelsByModalityOem: {},
    meta: {},
  });
  const [trackerLoading, setTrackerLoading] = useState(false);
  // State for the local warehouse location inputs.
  const [localLocFrom, setLocalLocFrom] = useState("");
  const [localLocCurrent, setLocalLocCurrent] = useState("");

  // New state for DOM (Date of Manufacture)
  const [DOM, setDOM] = useState("");
  // New state for OEM, Modality, and Model (multi-select).
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedOems, setSelectedOems] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectionHistory, setSelectionHistory] = useState(
    Array.isArray(initialItem?.selectionHistory)
      ? initialItem.selectionHistory
      : []
  );
  const [saveHistory, setSaveHistory] = useState(
    Array.isArray(initialItem?.saveHistory) ? initialItem.saveHistory : []
  );
  const cameraVideoConstraints = useMemo(
    () => ({
      facingMode: { ideal: cameraFacing },
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      frameRate: { ideal: 30, max: 60 },
    }),
    [cameraFacing]
  );

  const getMostRecentWorkOrderEntry = (orders = []) => {
    return getMostRecentDatedEntry(orders, { workOrder: "", date: "" });
  };

  const buildSelectionHistorySnapshot = () => {
    const latestWorkOrder = getMostRecentWorkOrderEntry(workOrders);
    const movementDateType =
      items?.movementDateType === "departure" ? "departure" : "arrival";
    const movementDate =
      movementDateType === "departure"
        ? items?.departure_date || ""
        : items?.arrival_date || "";
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
    return {
      fromAssociationType: storedFromAssociationType,
      fromClientId: selectedClientFrom?.id || "",
      fromClientName: (selectedClientFrom?.name || "").trim(),
      fromMachineId: selectedMachine?.id || "",
      fromMachineName: (selectedMachine?.name || "").trim(),
      fromTrailerId: selectedTrailerFrom?.id || "",
      fromTrailerName: (selectedTrailerFrom?.name || "").trim(),
      currentAssociationType: storedCurrentAssociationType,
      currentClientId: selectedClientCurrent?.id || "",
      currentClientName: (selectedClientCurrent?.name || "").trim(),
      currentMachineId: selectedCurrentMachine?.id || "",
      currentMachineName: (selectedCurrentMachine?.name || "").trim(),
      currentTrailerId: selectedTrailerCurrent?.id || "",
      currentTrailerName: (selectedTrailerCurrent?.name || "").trim(),
      workOrder: (latestWorkOrder?.workOrder || "").trim(),
      movementDateType,
      movementDate,
      arrivalDate: items?.arrival_date || "",
      departureDate: items?.departure_date || "",
    };
  };

  const getHistoryMovementDate = (entry) => {
    if (entry?.movementDate) return entry.movementDate;
    if (entry?.movementDateType === "departure") {
      return entry?.departureDate || "";
    }
    return entry?.arrivalDate || entry?.departureDate || "";
  };

  const getHistoryMovementDateLabel = (entry) => {
    const date = getHistoryMovementDate(entry);
    if (!date) return "-";
    return entry?.movementDateType === "departure" ? "Departure" : "Arrival";
  };

  const hasSelectionSnapshotValues = (snapshot) =>
    [
      snapshot?.fromClientId,
      snapshot?.fromClientName,
      snapshot?.fromAssociationType,
      snapshot?.fromMachineId,
      snapshot?.fromMachineName,
      snapshot?.fromTrailerId,
      snapshot?.fromTrailerName,
      snapshot?.currentClientId,
      snapshot?.currentClientName,
      snapshot?.currentAssociationType,
      snapshot?.currentMachineId,
      snapshot?.currentMachineName,
      snapshot?.currentTrailerId,
      snapshot?.currentTrailerName,
      snapshot?.workOrder,
      snapshot?.movementDate,
    ].some((value) => String(value || "").trim() !== "");

  const areSelectionSnapshotsEqual = (a, b) => {
    const aDate = String(a?.movementDate || "").trim();
    const bDate = String(b?.movementDate || "").trim();
    const datesMatch =
      !aDate && !bDate
        ? true
        : a?.movementDateType === b?.movementDateType && aDate === bDate;

    return (
      a?.fromClientId === b?.fromClientId &&
      a?.fromClientName === b?.fromClientName &&
      a?.fromAssociationType === b?.fromAssociationType &&
      a?.fromMachineId === b?.fromMachineId &&
      a?.fromMachineName === b?.fromMachineName &&
      a?.fromTrailerId === b?.fromTrailerId &&
      a?.fromTrailerName === b?.fromTrailerName &&
      a?.currentClientId === b?.currentClientId &&
      a?.currentClientName === b?.currentClientName &&
      a?.currentAssociationType === b?.currentAssociationType &&
      a?.currentMachineId === b?.currentMachineId &&
      a?.currentMachineName === b?.currentMachineName &&
      a?.currentTrailerId === b?.currentTrailerId &&
      a?.currentTrailerName === b?.currentTrailerName &&
      a?.workOrder === b?.workOrder &&
      datesMatch
    );
  };

  const applyMergedMachineFields = (merged, { force = false } = {}) => {
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
  };

  // More info modal state.
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [itemName, setItemName] = useState("");

  const [machineFieldsInitialized, setMachineFieldsInitialized] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [associationLoadError, setAssociationLoadError] = useState("");

  // near the top of DisplayItem()
  const [showLocalModalFrom, setShowLocalModalFrom] = useState(false);
  const [showLocalModalCurrent, setShowLocalModalCurrent] = useState(false);

  const openLocalModalFrom = () => setShowLocalModalFrom(true);
  const closeLocalModalFrom = () => setShowLocalModalFrom(false);
  const openLocalModalCurrent = () => setShowLocalModalCurrent(true);
  const closeLocalModalCurrent = () => setShowLocalModalCurrent(false);

  // at the top of DisplayItem()
  const [showNewLocalModalFrom, setShowNewLocalModalFrom] = useState(false);
  const [showNewLocalModalCurrent, setShowNewLocalModalCurrent] =
    useState(false);

  const createEmptyLocal = () => ({
    region: "",
    section: { letter: "", number: "" },
    bin: "",
    pallet: "",
  });

  // when the From-client changes, clear any old local-loc
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientFrom]);

  // // when the From-machine changes, clear any old local-loc
  // useEffect(() => {
  //   setNewLocalFrom({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedMachine]);

  // same for Current:
  // useEffect(() => {
  //   setNewLocalCurrent({ region: "", section: { letter: "", number: "" }, bin: "", pallet: "" });
  // }, [selectedClientCurrent, selectedCurrentMachine]);

  // const handleSendToInflow = async () => {
  //   try {
  //     const name = items.name;
  //     const description = descriptions[selectedDesc]?.description || "";
  //     // gather every photo URL from Firebase Storage
  //     const imageUrls = photos.map((p) => p.url);
  //     await InflowAPI.upsertProduct({ name, description, imageUrls });
  //     alert("Sent to inFlow successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error sending to inFlow: " + err.message);
  //   }
  // };

const handleSendToInflow = async () => {
  try {
    const name = (items.name || '').trim();
    if (!name) {
      alert('Item needs a name before sending to inFlow.');
      return;
    }

    // Regular description (don’t also send a custom “Description” unless you truly have one)
    const description = (descriptions[selectedDesc]?.description || '').trim();

    // Photos already fetched from storage
    const imageUrls = photos.map(p => p.url).filter(Boolean);

    // SKU = your item id
    const sku = (id ?? '').toString();

   

    // Basic normalizers
    const toCSV = arr => (Array.isArray(arr) ? arr.filter(Boolean).join(', ') : (arr || ''));

    // YYYY-MM-DD for the date field in inFlow
    const arrivalISO = items.arrival_date
      ? new Date(items.arrival_date).toISOString().slice(0, 10)
      : '';

    const pnStr = Array.isArray(items.pn) ? items.pn.filter(Boolean).join(', ') : (items.pn || '');
    const snStr = Array.isArray(items.sn) ? items.sn.filter(Boolean).join(', ') : (items.sn || '');

    // Most recent WO (you already have this)
    const mostRecentWO =
      workOrders?.length
        ? workOrders.reduce((latest, cur) => (new Date(cur.date) > new Date(latest.date) ? cur : latest), workOrders[0])
        : { workOrder: '', date: '' };

    // Build the numbered fields (match your inFlow “Field 1..10”)
    const customFields = {
      custom1: selectionToPrintValue(selectedOems),                      // OEM   (dropdown)
      custom2: selectionToPrintValue(selectedModalities),                 // Modality (dropdown)
      custom3: selectionToPrintValue(selectedModels),                    // Model (dropdown)
      custom4: (description || '').trim(),              // Description (text) - optional duplicate
      custom5: (mostRecentWO.workOrder || '').trim(),   // Work Order (text)
      custom6: (selectedClientFrom?.name || '').trim(), // From (text)
      custom7: pnStr,                                   // Product Number (text)
      custom8: snStr,                                   // Serial Number (text)
      custom9: arrivalISO,                              // Arrival Date (date)
      custom10: (selectedClientCurrent?.name || '').trim(), // Current (text)
    };

    console.log('[inFlow] customFields to send (numbered):', customFields);


    const created = await InflowAPI.upsertProduct({
      name,
      description,
      sku,
      imageUrls,
      customFields,
    });

    alert(`Sent to inFlow successfully. ID: ${created?.productId || created?.id || '(unknown)'}`);
  } catch (err) {
    console.error(err);
    alert('Error sending to inFlow: ' + err.message);
  }
};


  // const [storedMachine, setStoredMachine] = useState(null);

  // useEffect(() => {
  //   // once any of these three change, re-merge:
  //   if (TheMachine || selectedCurrentMachine || selectedMachine) {
  //     const merged = updateMachineFields(
  //       TheMachine,
  //       selectedCurrentMachine,
  //       selectedMachine
  //     );
  //     setOem(merged.oem);
  //     setModality(merged.modality);
  //     setModel(merged.model);
  //   }
  // }, [TheMachine, selectedCurrentMachine, selectedMachine]);

  // whenever the “From” client changes:
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

  const shouldShowLocalLocation = (client, machine, localLoc = "") =>
    isSocalWarehouseClient(client) ||
    isInteriorWarehouseMachine(machine) ||
    Boolean(localLoc);

  useEffect(() => {
    setShowLocalLocFrom(
      shouldShowLocalLocation(selectedClientFrom, selectedMachine, localLocFrom)
    );
  }, [selectedClientFrom, selectedMachine, localLocFrom]);

  // whenever the “Current” client changes:
  useEffect(() => {
    setShowLocalLocCurrent(
      shouldShowLocalLocation(
        selectedClientCurrent,
        selectedCurrentMachine,
        localLocCurrent
      )
    );
  }, [selectedClientCurrent, selectedCurrentMachine, localLocCurrent]);

  const loadClients = async () => {
    if (clientsLoaded || clientsLoading) return;
    setClientsLoading(true);
    try {
      const [clientsData, trailerSnapshot] = await Promise.all([
        fetchClients(),
        firebase.firestore().collection("Trailers").get(),
      ]);
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
      setClientsLoaded(true);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    } finally {
      setClientsLoading(false);
    }
  };

  const setMachineOptionsForBranch = useCallback((isFromBranch, next) => {
    if (isFromBranch) setMachineOptionsFrom(next);
    else setMachineOptionsCurrent(next);
  }, []);

  const loadMachineOptionsForBranch = useCallback(
    async (isFromBranch, clientOverride = null) => {
      const selectedClient = clientOverride ||
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
        console.error("Failed to load machines for selected client:", error);
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
    },
    [selectedClientCurrent, selectedClientFrom, setMachineOptionsForBranch]
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

  // Keep selected models even if they are not in the catalog yet.

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

  // Tracker list mutations can happen inline (add/delete), while general sync also runs on Save.

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

  const handleAddModelOption = useCallback(async (incomingModel) => {
    if (!canManageModels) return;

    const normalizedModel = String(incomingModel || "").trim();
    if (!normalizedModel) return;

    const alreadyExists = modelOptionsForUI.some(
      (value) =>
        String(value || "").trim().toLowerCase() ===
        normalizedModel.toLowerCase()
    );

    if (alreadyExists) {
      setSelectedModels((prev) =>
        uniqueSelection([...normalizeSelection(prev), normalizedModel])
      );
      return true;
    }

    try {
      await syncTrackerFromSelections({
        selections: {
          modalities: selectedModalities,
          oems: selectedOems,
          models: [normalizedModel],
        },
        catalog: trackerCatalog,
      });
      setSelectedModels((prev) =>
        uniqueSelection([...normalizeSelection(prev), normalizedModel])
      );
      loadTracker(true);
      return true;
    } catch (error) {
      console.error("Failed to add model:", error);
      return false;
    }
  }, [
    canManageModels,
    modelOptionsForUI,
    selectedModalities,
    selectedOems,
    trackerCatalog,
    loadTracker,
  ]);

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


  useEffect(() => {
    const requestedId = String(id || "").trim();
    if (!requestedId) return undefined;
    const requestId = itemLoadRequestRef.current + 1;
    itemLoadRequestRef.current = requestId;
    committedItemIdRef.current = requestedId;

    // Dynamic route navigation reuses this component. Clear every association
    // before loading the next item so an absent field can never inherit the
    // previous item's client, trailer, machine, or warehouse position.
    setSelectedClientFrom(null);
    setSelectedClientCurrent(null);
    setSelectedTrailerFrom(null);
    setSelectedTrailerCurrent(null);
    setSelectedMachine(null);
    setSelectedCurrentMachine(null);
    setAssociationTypeFrom(ITEM_ASSOCIATION_SITE);
    setAssociationTypeCurrent(ITEM_ASSOCIATION_SITE);
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
    setSelectedParent(null);
    setSelectedChildren([]);
    setOriginalChildIds([]);
    setTheMachine(null);
    setSelectedOems([]);
    setSelectedModalities([]);
    setSelectedModels([]);
    setLocalLocFrom("");
    setLocalLocCurrent("");
    setNewLocalFrom(createEmptyLocal());
    setNewLocalCurrent(createEmptyLocal());
    setDOM("");
    setPhotos([]);
    setAddToWebsite(false);
    setAssociationLoadError("");

    fetchData(requestedId, requestId);
    return () => {
      if (itemLoadRequestRef.current === requestId) {
        itemLoadRequestRef.current += 1;
      }
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
  }, [id]);

  async function resolveClientFromMachine(
    machineRef,
    setClient,
    setMachine,
    isFrom = true,
    isActive = () => true
  ) {
    const machineDoc = await machineRef.get();
    if (!isActive()) return;
    if (machineDoc.exists) {
      const machineData = stripAssociatedPartsFromMachineSnapshot(
        machineDoc.data() || {}
      );
      setMachine({ id: machineDoc.id, ...machineData });

      // Determine if the machine is "interior socal"
      // const isSocalInterior = machineData.name && machineData.name.toLowerCase() === "interior socal";
      // if (isSocalInterior) {
      //   if (isFrom) {
      //     setShowLocalLocFrom(true);
      //   } else {
      //     setShowLocalLocCurrent(true);
      //   }
      // } else {
      // Optionally clear the flag if it is not "interior socal"
      // if (isFrom) {
      //   setShowLocalLocFrom(false);
      // } else {
      //   setShowLocalLocCurrent(false);
      // }
      // }
      // new: fetch client name and combine both checks
      const clientDoc =
        machineData.client && typeof machineData.client.get === "function"
          ? await machineData.client.get()
          : null;
      if (!isActive()) return;
      const clientName =
        clientDoc && clientDoc.exists ? clientDoc.data().name : null;
      const isSocalInterior = ["interior socal", "interior norcal"].includes(
        machineData.name?.toLowerCase()
      );
      const shouldShow =
        isSocalInterior ||
        isSocalWarehouseClient(
          clientDoc && clientDoc.exists
            ? { id: clientDoc.id, ...clientDoc.data() }
            : { name: clientName }
        );

      if (isFrom) {
        setShowLocalLocFrom(shouldShow);
      } else {
        setShowLocalLocCurrent(shouldShow);
      }

      if (clientDoc && clientDoc.exists) {
        setClient({ id: clientDoc.id, ...clientDoc.data() });
      }
    }
  }

  const fetchData = async (requestedId, requestId) => {
    const id = String(requestedId || "").trim();
    if (!id) return;
    const isActiveLoad = () => itemLoadRequestRef.current === requestId;
    setIsLoading(true);
    setAssociationLoadError("");
    const loadStartedAt = Date.now();
    const db = firebase.firestore();
    const storedDocumentId = (value) => {
      if (!value) return "";
      const rawValue =
        typeof value === "string" ? value : value?.id || value?.path || "";
      const segments = String(rawValue).split("/").filter(Boolean);
      return segments[segments.length - 1] || "";
    };
    const resolveStoredDocument = async (collection, value) => {
      if (!value) return null;
      let snapshot = null;
      if (typeof value.get === "function") {
        snapshot = await value.get();
      } else {
        const rawId =
          typeof value === "string"
            ? value
            : value?.id || value?.path || "";
        const segments = String(rawId).split("/").filter(Boolean);
        const documentId = segments[segments.length - 1] || "";
        if (!documentId) return null;
        snapshot = await db.collection(collection).doc(documentId).get();
      }
      if (!isActiveLoad()) return null;
      return snapshot;
    };
    try {
      const doc = await db.collection("Test").doc(id).get();
      if (!isActiveLoad()) return;
      if (doc.exists) {
        console.log("test");
        const data = stripEmbeddedMachineAssociations(doc.data() || {});
        const normalizedPN = Array.isArray(data.pn) ? data.pn : [data.pn];
        const normalizedSN = Array.isArray(data.sn) ? data.sn : [data.sn];
        const resolvedLocalSn = String(
          data.localSN || data.local_sn || id || ""
        ).trim();
        setItems({
          ...data,
          pn: normalizedPN,
          sn: normalizedSN,
          localSN: resolvedLocalSn,
          arrival_date: data.arrival_date || "",
          departure_date: data.departure_date || "",
          movementDateType:
            data.movementDateType === "departure" ? "departure" : "arrival",
          visible: data.visible !== undefined ? data.visible : true,
          attached: data.attached === true,
        });
        if (!String(data.localSN || "").trim() && resolvedLocalSn) {
          db
            .collection("Test")
            .doc(id)
            .set({ localSN: resolvedLocalSn, local_sn: resolvedLocalSn }, { merge: true })
            .catch((err) => {
              console.error("Failed to backfill localSN:", err);
            });
        }
        setSavedName(data.name || "");
        setDescriptions(data.descriptions || []);
        setWorkOrders(data.workOrders || []);
        setSelectedDesc(
          Math.max(
            0,
            getMostRecentDatedEntryIndex(data.descriptions || [])
          )
        );
        setSelectionHistory(
          Array.isArray(data.selectionHistory) ? data.selectionHistory : []
        );
        setSaveHistory(Array.isArray(data.saveHistory) ? data.saveHistory : []);
        if (data.localLocFrom) setLocalLocFrom(data.localLocFrom);
        if (data.localLocCurrent) setLocalLocCurrent(data.localLocCurrent);
        if (data.DOM) {
          setDOM(data.DOM);
        }

      // …after you do setItems, setDescriptions, etc.

      // load the “newLocal” maps
      if (data.newLocalFrom) setNewLocalFrom(data.newLocalFrom);
      if (data.newLocalCurrent) setNewLocalCurrent(data.newLocalCurrent);

      // Load PO Number if it exists.
      if (data.poNumber) {
        setItems((prev) => ({ ...prev, poNumber: data.poNumber }));
      }

      const clientFromValue = firstEntityRoleValue(data, "client", "from");
      const clientCurrentValue = firstEntityRoleValue(
        data,
        "client",
        "current"
      );
      const clientFromId = storedDocumentId(clientFromValue);
      const clientCurrentId = storedDocumentId(clientCurrentValue);
      const [clientFromDoc, clientCurrentDoc] = await Promise.all([
        resolveStoredDocument("Client", clientFromValue),
        resolveStoredDocument("Client", clientCurrentValue),
      ]);
      if (!isActiveLoad()) return;
      const missingAssociationReferences = [];
      const resolvedClientFromName = clientFromDoc?.exists
        ? clientFromDoc.data()?.name
        : data.associationFrom?.clientNameSnapshot || data.fromClientName || null;
      const resolvedClientCurrentName = clientCurrentDoc?.exists
        ? clientCurrentDoc.data()?.name
        : data.associationCurrent?.clientNameSnapshot ||
          data.currentClientName ||
          null;

      if (clientFromDoc?.exists) {
        setSelectedClientFrom({
          id: clientFromDoc.id,
          ...clientFromDoc.data(),
        });
      } else if (clientFromId) {
        missingAssociationReferences.push(`Client/${clientFromId}`);
        setSelectedClientFrom({
          id: clientFromId,
          name: resolvedClientFromName || clientFromId,
          missingReference: true,
        });
      }
      if (clientCurrentDoc?.exists) {
        setSelectedClientCurrent({
          id: clientCurrentDoc.id,
          ...clientCurrentDoc.data(),
        });
      } else if (clientCurrentId) {
        missingAssociationReferences.push(`Client/${clientCurrentId}`);
        setSelectedClientCurrent({
          id: clientCurrentId,
          name: resolvedClientCurrentName || clientCurrentId,
          missingReference: true,
        });
      }

      const trailerFromValue = firstEntityRoleValue(data, "trailer", "from");
      const trailerCurrentValue = firstEntityRoleValue(
        data,
        "trailer",
        "current"
      );
      const machineFromValue = firstEntityRoleValue(data, "machine", "from");
      const machineCurrentValue = firstEntityRoleValue(
        data,
        "machine",
        "current"
      );
      const trailerFromId = storedDocumentId(trailerFromValue);
      const trailerCurrentId = storedDocumentId(trailerCurrentValue);
      const storedMachineFromId = storedDocumentId(machineFromValue);
      const storedMachineCurrentId = storedDocumentId(machineCurrentValue);
      setAssociationTypeFrom(
        inferItemAssociationType({
          storedType: data.fromAssociationType || data.associationTypeFrom,
          trailer: trailerFromId,
          machine: machineFromValue,
        })
      );
      setAssociationTypeCurrent(
        inferItemAssociationType({
          storedType: data.currentAssociationType || data.associationTypeCurrent,
          trailer: trailerCurrentId,
          machine: machineCurrentValue,
        })
      );
      const [trailerFromDoc, trailerCurrentDoc] = await Promise.all([
        resolveStoredDocument("Trailers", trailerFromValue),
        resolveStoredDocument("Trailers", trailerCurrentValue),
      ]);
      if (!isActiveLoad()) return;
      if (trailerFromDoc?.exists) {
        const trailerData = trailerFromDoc.data() || {};
        const linkedClientId = trailerClientId(trailerData);
        setSelectedTrailerFrom({
          id: trailerFromDoc.id,
          ...trailerData,
          name: trailerName({ id: trailerFromDoc.id, ...trailerData }),
          clientId: linkedClientId,
          machineId: trailerMachineId(trailerData),
          storedAssociationMachineId: storedMachineFromId,
        });
        if (!clientFromValue && linkedClientId) {
          const linkedClientDoc = await db.collection("Client").doc(linkedClientId).get();
          if (!isActiveLoad()) return;
          if (linkedClientDoc.exists) {
            setSelectedClientFrom({
              id: linkedClientDoc.id,
              ...linkedClientDoc.data(),
              derivedFromTrailer: true,
            });
          } else {
            missingAssociationReferences.push(`Client/${linkedClientId}`);
            setSelectedClientFrom({
              id: linkedClientId,
              name: linkedClientId,
              missingReference: true,
              derivedFromTrailer: true,
            });
          }
        }
      } else if (trailerFromId) {
        missingAssociationReferences.push(`Trailers/${trailerFromId}`);
        setSelectedTrailerFrom({
          id: trailerFromId,
          name:
            data.associationFrom?.trailerNameSnapshot ||
            data.fromTrailerName ||
            trailerFromId,
          storedAssociationMachineId: storedMachineFromId,
          missingReference: true,
        });
      }
      if (trailerCurrentDoc?.exists) {
        const trailerData = trailerCurrentDoc.data() || {};
        const linkedClientId = trailerClientId(trailerData);
        setSelectedTrailerCurrent({
          id: trailerCurrentDoc.id,
          ...trailerData,
          name: trailerName({ id: trailerCurrentDoc.id, ...trailerData }),
          clientId: linkedClientId,
          machineId: trailerMachineId(trailerData),
          storedAssociationMachineId: storedMachineCurrentId,
        });
        if (!clientCurrentValue && linkedClientId) {
          const linkedClientDoc = await db.collection("Client").doc(linkedClientId).get();
          if (!isActiveLoad()) return;
          if (linkedClientDoc.exists) {
            setSelectedClientCurrent({
              id: linkedClientDoc.id,
              ...linkedClientDoc.data(),
              derivedFromTrailer: true,
            });
          } else {
            missingAssociationReferences.push(`Client/${linkedClientId}`);
            setSelectedClientCurrent({
              id: linkedClientId,
              name: linkedClientId,
              missingReference: true,
              derivedFromTrailer: true,
            });
          }
        }
      } else if (trailerCurrentId) {
        missingAssociationReferences.push(`Trailers/${trailerCurrentId}`);
        setSelectedTrailerCurrent({
          id: trailerCurrentId,
          name:
            data.associationCurrent?.trailerNameSnapshot ||
            data.currentTrailerName ||
            trailerCurrentId,
          storedAssociationMachineId: storedMachineCurrentId,
          missingReference: true,
        });
      }

      let machineFromData = null;
      let machineCurrentData = null;

      const [machineFromDoc, machineCurrentDoc] = await Promise.all([
        resolveStoredDocument("Machine", machineFromValue),
        resolveStoredDocument("Machine", machineCurrentValue),
      ]);
      if (!isActiveLoad()) return;

      if (machineFromDoc?.exists) {
        machineFromData = stripAssociatedPartsFromMachineSnapshot(
          machineFromDoc.data() || {}
        );
        setSelectedMachine({ id: machineFromDoc.id, ...machineFromData });
      } else if (storedMachineFromId) {
        missingAssociationReferences.push(`Machine/${storedMachineFromId}`);
        setSelectedMachine({
          id: storedMachineFromId,
          name:
            data.associationFrom?.machineNameSnapshot ||
            data.fromMachineName ||
            storedMachineFromId,
          missingReference: true,
        });
      }
      if (machineCurrentDoc?.exists) {
        machineCurrentData = stripAssociatedPartsFromMachineSnapshot(
          machineCurrentDoc.data() || {}
        );
        setSelectedCurrentMachine({ id: machineCurrentDoc.id, ...machineCurrentData });
      } else if (storedMachineCurrentId) {
        missingAssociationReferences.push(`Machine/${storedMachineCurrentId}`);
        setSelectedCurrentMachine({
          id: storedMachineCurrentId,
          name:
            data.associationCurrent?.machineNameSnapshot ||
            data.currentMachineName ||
            storedMachineCurrentId,
          missingReference: true,
        });
      }
      const nameFrom = machineFromData?.name?.toLowerCase();
      const nameCurrent = machineCurrentData?.name?.toLowerCase();

      // If the machine’s name is “interior socal”, show that branch:
      // setShowLocalLocFrom(nameFrom === "interior socal");
      // // Or if your Firestore already has a value for localLocFrom, show it anyway:
      // if (data.localLocFrom) setShowLocalLocFrom(true);

      // setShowLocalLocCurrent(nameCurrent === "interior socal");
      // if (data.localLocCurrent) setShowLocalLocCurrent(true);
      // new: combine machine-name OR client-name check, keep existing-data
      setShowLocalLocFrom(
        ["interior socal", "interior norcal"].includes(nameFrom) ||
          isSocalWarehouseClient({
            id: data.ClientFrom?.id,
            name: resolvedClientFromName,
          }) ||
          Boolean(data.localLocFrom)
      );
      setShowLocalLocCurrent(
        ["interior socal", "interior norcal"].includes(nameCurrent) ||
          isSocalWarehouseClient({
            id: data.ClientCurrent?.id,
            name: resolvedClientCurrentName,
          }) ||
          Boolean(data.localLocCurrent)
      );

      const theMachineData = data.TheMachine || null;

      const initialMachineHydration = buildMachineDetailHydrationSeed({
        fromMachine: machineFromData
          ? { id: machineFromDoc.id, ...machineFromData }
          : null,
        currentMachine: machineCurrentData
          ? { id: machineCurrentDoc.id, ...machineCurrentData }
          : null,
        preferredMachine: theMachineData,
      });
      machineDetailHydrationRef.current = initialMachineHydration.state;
      setMachineDetailHydration(initialMachineHydration.state);
      latestMachineDetailOwnerRef.current = initialMachineHydration.owner;

      setTheMachine(theMachineData);
      if (theMachineData) {
        // pull both variants, prefer lowercase if it exists
        const OEM = theMachineData.oem ?? theMachineData.OEM;
        const Modality = theMachineData.modality ?? theMachineData.Modality;
        const Model = theMachineData.model ?? theMachineData.Model;
        setTheMachine({ ...theMachineData, OEM, Modality, Model });
      }
      // setStoredMachine(theMachineData);

      // **right here** merge from the three sources you just fetched:
      const merged = updateMachineFields(
        theMachineData,
        machineCurrentData,
        machineFromData
      );
      applyMergedMachineFields(merged, { force: true });

      console.log(
        "SelectedMachine:",
        selectedMachine,
        "SelectedCurrentMachine:",
        selectedCurrentMachine
      );
      // Show local loc inputs if applicable
      // if (
      //   selectedMachine &&
      //   selectedMachine.name &&
      //   selectedMachine.name.toLowerCase() === "interior socal"
      // ) {
      //   setShowLocalLocFrom(true);
      // }
      // if (
      //   selectedCurrentMachine &&
      //   selectedCurrentMachine.name &&
      //   selectedCurrentMachine.name.toLowerCase() === "interior socal"
      // ) {
      //   setShowLocalLocCurrent(true);
      // }

      const currentItemRef = db.collection("Test").doc(id);
      const [parentDoc, childrenSnap] = await Promise.all([
        data.Parent && typeof data.Parent.get === "function"
          ? data.Parent.get()
          : Promise.resolve(null),
        db.collection("Test").where("Parent", "==", currentItemRef).get(),
      ]);
      if (!isActiveLoad()) return;
      if (parentDoc?.exists) {
        setSelectedParent({ id: parentDoc.id, ...parentDoc.data() });
      } else {
        setSelectedParent(null);
      }
      const children = childrenSnap.docs
        .filter((childDoc) => childDoc.id !== id)
        .map((childDoc) => ({
          id: childDoc.id,
          ...childDoc.data(),
        }));
      setSelectedChildren(children);
      setOriginalChildIds(children.map((child) => child.id));

      // Priority auto‑population of machine fields.
      // const updatedFields = updateMachineFields(storedMachine, selectedCurrentMachine, selectedMachine);
      // // console.log("Updated machine fields:", updatedFields);
      // setOem(updatedFields.oem);
      // setModality(updatedFields.modality);
      // setModel(updatedFields.model);

        const loadMs = Date.now() - loadStartedAt;
        if (loadMs > 1500) {
          console.warn("[item][slow-load]", {
            id,
            loadMs,
            hasClientFrom: Boolean(data.ClientFrom),
            hasClientCurrent: Boolean(data.ClientCurrent),
            hasMachineFrom: Boolean(data.MachineFrom),
            hasMachineCurrent: Boolean(data.MachineCurrent),
            hasParent: Boolean(data.Parent),
          });
        }
        if (missingAssociationReferences.length) {
          const uniqueMissingReferences = Array.from(
            new Set(missingAssociationReferences)
          );
          setErr(
            `Some saved associations no longer resolve (${uniqueMissingReferences.join(
              ", "
            )}). Their stored IDs were preserved; select replacements before saving.`
          );
          setShowErr(true);
        }
        setIsLoading(false);
        Promise.all([
          fetchPhotos(id, requestId),
          checkIfAddedToWebsite(id, requestId),
          calculateItemFrequencyAndUsage(data.pn, requestId),
        ]).catch((err) => {
          if (isActiveLoad()) {
            console.error("Background item loads failed:", err);
          }
        });
      } else {
        router.push({
          pathname: "../AddItem/NewItem",
          query: { signal: id },
        });
      }
    } catch (error) {
      if (isActiveLoad()) {
        console.error("Error fetching item:", error);
        const message =
          error?.message || "Failed to load every saved item association.";
        setAssociationLoadError(message);
        setErr(
          `Saving is blocked because the saved associations could not be fully loaded: ${message}`
        );
        setShowErr(true);
      }
    } finally {
      if (isActiveLoad()) setIsLoading(false);
    }
  };

  const calculateItemFrequencyAndUsage = async (pn, requestId = null) => {
    const db = firebase.firestore();
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const normalizedPN = pn !== undefined ? pn : "";
    const itemsSnapshot = await db
      .collection("Test")
      .where("pn", "==", normalizedPN)
      .get();

    if (requestId != null && itemLoadRequestRef.current !== requestId) return;

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
    applyMergedMachineFields(
      updateMachineFields(safeMachineData, null, null),
      { force: true }
    );
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

  const fetchPhotos = async (docID, requestId = null) => {
    const storageRef = firebase.storage().ref();
    const listRef = storageRef.child(`Parts/${docID}`);
    try {
      const res = await listRef.listAll();
      const sortedItems = [...res.items].sort((left, right) =>
        left.name.localeCompare(right.name)
      );
      const loadedPhotos = await Promise.all(
        sortedItems.map(async (photoRef) => ({
          url: await photoRef.getDownloadURL(),
          file: null,
          storageName: photoRef.name,
          category: getItemPhotoCategory(photoRef.name),
        }))
      );
      if (requestId != null && itemLoadRequestRef.current !== requestId) return;
      setPhotos(loadedPhotos);
    } catch (error) {
      console.error("Error fetching photos: ", error);
    }
  };

  const checkIfAddedToWebsite = async (docID, requestId = null) => {
    const db = firebase.firestore();
    const partsDoc = await db.collection("Parts").doc(docID).get();
    if (requestId != null && itemLoadRequestRef.current !== requestId) return;
    if (partsDoc.exists) {
      setAddToWebsite(true);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseErr = () => setShowErr(false);
  const handleShowErr = () => setShowErr(true);
  const handleCloseSaveModal = () => setShowSaveModal(false);
  const handleClosePrintModal = () => setShowPrintModal(false);
  const handleShowSaveModal = () => setShowSaveModal(true);
  const handleShowPrintModal = () => setShowPrintModal(true);
  const handleMachineSelectionModal = () => setMachineSelectionModal(false);
  const handleCloseDescModal = () => setShowDescModal(false);
  const handleShowDescModal = () => setShowDescModal(true);
  const handleCloseWoModal = () => setShowWoModal(false);
  const handleShowWoModal = () => setShowWoModal(true);
  const handleCloseHistoryModal = () => setShowHistoryModal(false);
  const handleShowHistoryModal = () => setShowHistoryModal(true);
  const handleCloseSaveHistoryModal = () => setShowSaveHistoryModal(false);
  const handleShowSaveHistoryModal = () => setShowSaveHistoryModal(true);
  const handleQuickbooksButton = () => {
    console.log("[Quickbooks Debug] Quickbooks button clicked", {
      id,
      authUser,
      isAdminUser,
    });
    alert("test");
  };
  const handleCloseClientModal = () => {
    setShowClientModal(false);
    setClientSearch("");
  };
  const handleShowClientModal = async () => {
    await loadClients();
    setClientSearch("");
    setShowClientModal(true);
  };
  const handleCloseMachineModal = () => {
    setShowMachineModal(false);
    setMachineSearch("");
  };
  const handleShowMachineModal = () => {
    setShowMachineModal(true);
    setMachineSearch("");
    setShowClientModal(false);
  };
  const handleCloseAddClientModal = () => {
    setShowAddClientModal(false);
    setNewClient({ name: "", location: "" });
  };
  const handleShowAddClientModal = () => {
    setShowAddClientModal(true);
  };
  const handleCloseCreateMachineModal = () => {
    setShowCreateMachineModal(false);
  };
  const handleShowCreateMachineModal = () => {
    const activeClient = machinePick ? selectedClientFrom : selectedClientCurrent;
    if (!activeClient?.id) {
      setErr("Please select a client before creating a machine.");
      setShowErr(true);
      return;
    }
    setShowCreateMachineModal(true);
  };
  const handleCloseParentModal = () => setShowParentModal(false);
  const handleShowParentModal = () => setShowParentModal(true);
  const handleCloseChildModal = () => setShowChildModal(false);
  const handleShowChildModal = () => setShowChildModal(true);

  const handleConfirmParentSelection = async (selectedItems = []) => {
    const nextParent = selectedItems[0] || null;
    const wasAttached = items.attached === true;
    setSelectedParent(nextParent);

    if (!id) return;
    const db = firebase.firestore();
    const itemRef = db.collection("Test").doc(id);

    try {
      if (nextParent && nextParent.id) {
        await itemRef.set(
          { Parent: db.collection("Test").doc(nextParent.id) },
          { merge: true }
        );
      } else {
        setItems((prev) => ({
          ...prev,
          attached: false,
          visible: wasAttached ? true : prev.visible,
        }));
        const clearParentPayload = {
          Parent: firebase.firestore.FieldValue.delete(),
          attached: false,
        };
        if (wasAttached) {
          clearParentPayload.visible = true;
        }
        await itemRef
          .update(clearParentPayload)
          .catch((error) => {
            if (error?.code === "not-found") return;
            throw error;
          });
      }
    } catch (error) {
      console.error("Error updating parent relation:", error);
      setErr("Failed to update parent relation.");
      setShowErr(true);
    }
  };

  const handleAttachToggle = async () => {
    if (!id) return;

    const isCurrentlyAttached = items.attached === true;
    if (!isCurrentlyAttached && !selectedParent?.id) {
      setErr("Select a parent before attaching this item.");
      setShowErr(true);
      return;
    }

    const nextAttached = !isCurrentlyAttached;
    const nextVisible = !nextAttached;
    const previousVisible = items.visible !== false;
    setItems((prev) => ({
      ...prev,
      attached: nextAttached,
      visible: nextVisible,
    }));

    try {
      await firebase.firestore().collection("Test").doc(id).set(
        {
          attached: nextAttached,
          visible: nextVisible,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating attachment state:", error);
      setItems((prev) => ({
        ...prev,
        attached: isCurrentlyAttached,
        visible: previousVisible,
      }));
      setErr("Failed to update attachment state.");
      setShowErr(true);
    }
  };

  const handleConfirmChildrenSelection = async (items = []) => {
    const safeItemId = String(id || "").trim();
    const dedupedChildren = Array.from(
      new Set((items || []).map((child) => String(child?.id || "").trim()))
    )
      .filter(Boolean)
      .filter((childId) => childId !== safeItemId)
      .map((childId) => (items || []).find((child) => child?.id === childId))
      .filter(Boolean);

    setSelectedChildren(dedupedChildren);

    if (!safeItemId) {
      setOriginalChildIds(dedupedChildren.map((child) => child.id));
      return;
    }

    const db = firebase.firestore();
    const parentRef = db.collection("Test").doc(safeItemId);
    const nextChildIds = dedupedChildren.map((child) => child.id);
    const removedChildIds = (originalChildIds || []).filter(
      (childId) => !nextChildIds.includes(childId)
    );

    try {
      const applyParentPromises = nextChildIds.map((childId) =>
        db.collection("Test").doc(childId).set({ Parent: parentRef }, { merge: true })
      );
      const clearParentPromises = removedChildIds.map((childId) =>
        db
          .collection("Test")
          .doc(childId)
          .update({ Parent: firebase.firestore.FieldValue.delete() })
          .catch((error) => {
            if (error?.code === "not-found") return;
            throw error;
          })
      );
      await Promise.all([...applyParentPromises, ...clearParentPromises]);
      setOriginalChildIds(nextChildIds);
    } catch (error) {
      console.error("Error updating child relations:", error);
      setErr("Failed to update child relations.");
      setShowErr(true);
    }
  };

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
      setLocalLocFrom("");
      setNewLocalFrom(createEmptyLocal());
    } else {
      setShowLocalLocCurrent(false);
      setLocalLocCurrent("");
      setNewLocalCurrent(createEmptyLocal());
    }
  };

  const handleClearClientSelection = () => {
    const isFromBranch = machinePick;
    beginBranchAssociationSelection(isFromBranch);

    if (isFromBranch) {
      setSelectedClientFrom(null);
    } else {
      setSelectedClientCurrent(null);
    }

    clearBranchWarehousePosition(isFromBranch);
    setMachineOptionsForBranch(isFromBranch, []);
    handleCloseClientModal();
  };

  // When a client is selected from the client table.
  const handleClientInfo = async (clientId) => {
    const isFromBranch = machinePick;
    if (!clientId) {
      handleClearClientSelection();
      return;
    }
    const { requestKey, requestId } = beginBranchAssociationSelection(
      isFromBranch,
      { pending: true }
    );

    try {
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(clientId).get();
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) {
        return;
      }
      if (!clientDoc.exists) {
        throw new Error("The selected client/site no longer exists.");
      }

      const clientData = { id: clientDoc.id, ...clientDoc.data() };
      if (!isSelectableItemClient(clientData)) {
        throw new Error(
          "AIS TRAILERS is a retired grouping record. Select the actual client/site or a trailer instead."
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
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) {
        return;
      }
      handleCloseClientModal();
      // Do not silently replace the independently selected trailer or machine.
      setTrailerLinkPrompt(null);
      finishBranchAssociationSelection(requestKey, requestId);
    } catch (error) {
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) return;
      if (error?.name === "AbortError") {
        finishBranchAssociationSelection(requestKey, requestId);
        return;
      }
      console.error("Error selecting client:", error);
      const message = error?.message || "Failed to select client.";
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
        "This trailer is not linked to a Client DB record. Link it in Trailer Setup first.";
      finishBranchAssociationSelection(requestKey, requestId, message);
      setErr(message);
      setShowErr(true);
      return;
    }
    try {
      const db = firebase.firestore();
      const clientDoc = await db.collection("Client").doc(trailer.clientId).get();
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) {
        return;
      }
      if (!clientDoc.exists) throw new Error("The trailer's linked client no longer exists.");
      const client = { id: clientDoc.id, ...clientDoc.data() };
      let availableMachines = await loadMachineOptionsForBranch(
        isFromBranch,
        client
      );
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) {
        return;
      }
      let associatedMachine = trailer.machineId
        ? availableMachines.find((machine) => machine.id === trailer.machineId)
        : null;
      if (trailer.machineId && !associatedMachine) {
        const machineDoc = await db
          .collection("Machine")
          .doc(trailer.machineId)
          .get();
        if (!isBranchAssociationSelectionActive(requestKey, requestId)) {
          return;
        }
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
      if (!isBranchAssociationSelectionActive(requestKey, requestId)) {
        return;
      }
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

  const handleCreateClientFromModal = async () => {
    const name = (newClient.name || "").trim();
    const local = (newClient.location || "").trim();
    const isFromBranch = machinePick;

    if (!name) {
      setErr("Client name is required.");
      setShowErr(true);
      return;
    }

    setSavingClient(true);
    try {
      const db = firebase.firestore();
      const clientId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;
      const payload = {
        name,
        local,
        machines: [],
      };

      await db.collection("Client").doc(clientId).set(payload, { merge: true });

      const createdClient = { id: clientId, ...payload };
      setClients((prev) => {
        const next = [...prev.filter((client) => client.id !== clientId), createdClient];
        return next.sort((a, b) =>
          String(a?.name || "").localeCompare(String(b?.name || ""))
        );
      });

      if (isFromBranch) {
        setSelectedClientFrom(createdClient);
        setSelectedMachine(null);
        setShowLocalLocFrom(isSocalWarehouseClient(createdClient));
        setLocalLocFrom("");
        setNewLocalFrom(createEmptyLocal());
      } else {
        setSelectedClientCurrent(createdClient);
        setSelectedCurrentMachine(null);
        setShowLocalLocCurrent(isSocalWarehouseClient(createdClient));
        setLocalLocCurrent("");
        setNewLocalCurrent(createEmptyLocal());
      }
      beginBranchAssociationSelection(isFromBranch);
      cancelMachineDetailHydration(isFromBranch);
      setMachineOptionsForBranch(isFromBranch, []);
      handleCloseAddClientModal();
      handleCloseClientModal();
    } catch (error) {
      console.error("Error creating client:", error);
      setErr("Failed to create client.");
      setShowErr(true);
    } finally {
      setSavingClient(false);
    }
  };

  const handleCreateMachineForClient = async (newMachine) => {
    const isFromBranch = machinePick;
    const activeClient = isFromBranch ? selectedClientFrom : selectedClientCurrent;
    if (!activeClient?.id) {
      setErr("Please select a client before creating a machine.");
      setShowErr(true);
      return;
    }

    try {
      const db = firebase.firestore();
      const machineId = `AIS${Math.floor(10000 + Math.random() * 90000)}`;
      const machineRef = db.collection("Machine").doc(machineId);
      const clientRef = db.collection("Client").doc(activeClient.id);
      const machinePayload = {
        ...newMachine,
        id: machineId,
        client: clientRef,
      };

      await machineRef.set(machinePayload);
      await clientRef.set(
        {
          machines: firebase.firestore.FieldValue.arrayUnion(machineRef),
        },
        { merge: true }
      );

      const createdMachine = { id: machineId, ...newMachine };
      setMachineOptionsForBranch(isFromBranch, (prev) => [
        ...prev.filter((machine) => machine.id !== machineId),
        createdMachine,
      ]);
      setShowCreateMachineModal(false);
      handleSetSelectedMachine(createdMachine);
    } catch (error) {
      console.error("Error creating machine:", error);
      setErr("Failed to create machine.");
      setShowErr(true);
    }
  };

  const handleDeleteHistoryEntry = async (indexToDelete) => {
    const previousHistory = Array.isArray(selectionHistory)
      ? [...selectionHistory]
      : [];
    const itemId = String(id || "").trim();
    if (!itemId) return;
    const nextHistory = previousHistory.filter(
      (_, index) => index !== indexToDelete
    );
    setSelectionHistory(nextHistory);

    try {
      const db = firebase.firestore();
      await db
        .collection("Test")
        .doc(itemId)
        .set({ selectionHistory: nextHistory }, { merge: true });
    } catch (error) {
      console.error("Error deleting history entry:", error);
      setSelectionHistory(previousHistory);
      setErr("Failed to delete history entry.");
      setShowErr(true);
    }
  };

  // Reordering function for dropdowns.
  const reorderArray = (arr, selectedValue) => {
    const newArr = arr.filter((val) => val !== selectedValue);
    return [selectedValue, ...newArr];
  };

  const [addingNewPn, setAddingNewPn] = useState(false);
  const [newPn, setNewPn] = useState("");
  const [addingNewSn, setAddingNewSn] = useState(false);
  const [newSn, setNewSn] = useState("");

  const handlePnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedPn = Array.isArray(prev.pn) ? [...prev.pn] : [];
      updatedPn[0] = selected;
      return { ...prev, pn: updatedPn };
    });
  };

  const handleSnSelect = (e) => {
    const selected = e.target.value;
    setItems((prev) => {
      let updatedSn = Array.isArray(prev.sn) ? [...prev.sn] : [];
      updatedSn[0] = selected;
      return { ...prev, sn: updatedSn };
    });
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

  // Generate custom document ID if needed.
  const generateCustomID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIS${randomNum}`;
  };

  function shallowClean(obj) {
    const newObj = {};
    for (const key in obj) {
      console.log(key, obj[key]);
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key] === undefined ? "" : obj[key];
      }
    }
    return newObj;
  }

  async function toSend(options = {}) {
    const { redirect = true, showSaved = true } = options;
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
      isLoading ||
      associationLoadError ||
      liveAssociationPending ||
      liveAssociationError ||
      liveMachineDetail.pending ||
      liveMachineDetail.error
    ) {
      const message = isLoading
        ? "The saved item associations are still loading. Wait for loading to finish before saving."
        : associationLoadError
          ? `Saving is blocked because the saved associations were not fully loaded: ${associationLoadError}`
          : liveAssociationPending
            ? "A client, trailer, or linked machine selection is still loading. Wait for it to finish before saving."
            : liveAssociationError
              ? `Saving is blocked because an association selection failed: ${liveAssociationError}`
              : liveMachineDetail.pending
                ? "The selected machine details are still loading. Wait for them to finish before saving."
                : `Saving is blocked because the selected machine could not be loaded: ${liveMachineDetail.error}`;
      setErr(message);
      setShowErr(true);
      return null;
    }
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "unknown";
    const savedAt = new Date();
    const nextSaveHistory = appendSaveHistory(saveHistory, userEmail, savedAt);

    const validateAssociationBranch = ({
      label,
      type,
      client,
      trailer,
      machine,
    }) => {
      const unresolved = [
        ["client/site", client],
        ["trailer", trailer],
        ["machine", machine],
      ].find(([, value]) => value?.missingReference);
      if (unresolved) {
        throw new Error(
          `${label}: the saved ${unresolved[0]} ${unresolved[1].id} no longer resolves. Select a valid replacement before saving.`
        );
      }
      if (type === ITEM_ASSOCIATION_MACHINE && !machine?.id) {
        throw new Error(`${label}: select a machine or choose Site only.`);
      }
      if (type === ITEM_ASSOCIATION_TRAILER) {
        if (!trailer?.id) {
          throw new Error(`${label}: select a trailer.`);
        }
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

    try {
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
    } catch (error) {
      setErr(error?.message || "Association validation failed.");
      setShowErr(true);
      return null;
    }

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
    const currentSelectionSnapshot = buildSelectionHistorySnapshot();
    const safeHistory = Array.isArray(selectionHistory) ? selectionHistory : [];
    const lastHistoryEntry =
      safeHistory.length > 0 ? safeHistory[safeHistory.length - 1] : null;
    const shouldAppendHistory =
      hasSelectionSnapshotValues(currentSelectionSnapshot) &&
      !areSelectionSnapshotsEqual(lastHistoryEntry, currentSelectionSnapshot);
    const nextSelectionHistory = shouldAppendHistory
      ? [
          ...safeHistory,
          {
            ...currentSelectionSnapshot,
            savedAt: savedAt.toISOString(),
            savedByEmail: userEmail,
          },
        ]
      : safeHistory;

    const formattedItems = { ...items, descriptions, workOrders };
    formattedItems.selectionHistory = nextSelectionHistory;
    formattedItems.saveHistory = nextSaveHistory;
    // Remove any unused fields.
    formattedItems.status = items.status || "";
    formattedItems.nameLower = (items.name || "").toLowerCase();
    formattedItems.nameTokens = buildNameTokens(items.name);
    formattedItems.workOrderTokens = buildWorkOrderTokens(workOrders);
    formattedItems.DOM = DOM; // Date of Manufacture
    formattedItems.localLocFrom = localLocFrom || "";
    formattedItems.localLocCurrent = localLocCurrent || "";
    formattedItems.date = items.date || "";
    formattedItems.arrival_date = items.arrival_date || "";
    formattedItems.departure_date = items.departure_date || "";
    formattedItems.movementDateType =
      items.movementDateType === "departure" ? "departure" : "arrival";
    formattedItems.movementDate =
      formattedItems.movementDateType === "departure"
        ? formattedItems.departure_date
        : formattedItems.arrival_date;
    formattedItems.poNumber = items.poNumber || "";
    formattedItems.trackingNumber = items.trackingNumber || "";
    formattedItems.TheMachine = buildMachineSummary(machineData);
    formattedItems.addedToWebsite = addToWebsite;
    formattedItems.associationSchemaVersion = 2;

    // NEW: Add the user's email under the field "user"
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

    const fromDetails = buildLocalLocObject(newLocalFrom);
    const currentDetails = buildLocalLocObject(newLocalCurrent);

    console.log(
      "From Details: " +
        fromDetails.region +
        " " +
        fromDetails.section?.letter +
        fromDetails.section?.number +
        " " +
        fromDetails.bin +
        " " +
        fromDetails.pallet
    );
    console.log(
      "Current Details: " +
        currentDetails.region +
        " " +
        currentDetails.section?.letter +
        currentDetails.section?.number +
        " " +
        currentDetails.bin +
        " " +
        currentDetails.pallet
    );

    if (Object.keys(fromDetails).length) {
      formattedItems.newLocalFrom = fromDetails;
      formattedItems.localLocFrom = formatLoc(newLocalFrom) || "";
    } else {
      // all fields empty — force an empty string and remove any stray map
      console.log("entered empty fromDetails else");
      formattedItems.localLocFrom = "";
      formattedItems.newLocalFrom = {};
    }

    if (Object.keys(currentDetails).length) {
      formattedItems.newLocalCurrent = currentDetails;
      formattedItems.localLocCurrent = formatLoc(newLocalCurrent) || "";
    } else {
      // all fields empty — force an empty string and remove any stray map
      formattedItems.localLocCurrent = "";
      formattedItems.newLocalCurrent = {};
    }

    const effectiveAt =
      formattedItems.movementDate || savedAt.toISOString();
    const effectiveAtSource = formattedItems.movementDate
      ? `item.${formattedItems.movementDateType || "arrival"}_date`
      : "item-save";
    const fromAssociation = preserveStoredAssociationSnapshot(
      buildItemAssociationSnapshot({
        type: associationTypeFrom,
        client: selectedClientFrom,
        machine: selectedMachine,
        trailer: selectedTrailerFrom,
        effectiveAt,
        effectiveAtSource,
      }),
      items?.associationFrom
    );
    const currentAssociation = preserveStoredAssociationSnapshot(
      buildItemAssociationSnapshot({
        type: associationTypeCurrent,
        client: selectedClientCurrent,
        machine: selectedCurrentMachine,
        trailer: selectedTrailerCurrent,
        effectiveAt,
        effectiveAtSource,
      }),
      items?.associationCurrent
    );

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

    if (selectedParent && selectedParent.id) {
      formattedItems.Parent = db.collection("Test").doc(selectedParent.id);
    }
    if (formattedItems.attached === true && selectedParent?.id) {
      formattedItems.visible = false;
    }
    if (formattedItems.attached === true && !selectedParent?.id) {
      formattedItems.attached = false;
      formattedItems.visible = true;
    }

    // Client/site is an immutable branch snapshot. It remains stored even when
    // a trailer is selected, so later trailer moves cannot rewrite history.
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
    if (fromAssociation) {
      formattedItems.fromAssociationType = fromAssociation.associationType;
      formattedItems.clientFromId = fromAssociation.clientId;
      if (fromAssociation.machineId) {
        formattedItems.machineFromId = fromAssociation.machineId;
      }
      if (fromAssociation.trailerId) {
        formattedItems.trailerFromId = fromAssociation.trailerId;
      }
      formattedItems.associationFrom = fromAssociation;
    }
    if (currentAssociation) {
      formattedItems.currentAssociationType =
        currentAssociation.associationType;
      formattedItems.clientCurrentId = currentAssociation.clientId;
      if (currentAssociation.machineId) {
        formattedItems.machineCurrentId = currentAssociation.machineId;
      }
      if (currentAssociation.trailerId) {
        formattedItems.trailerCurrentId = currentAssociation.trailerId;
      }
      formattedItems.associationCurrent = currentAssociation;
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

    // Only attach the richer “newLocal” map when the user actually filled something in
    if (Object.keys(fromDetails).length) {
      formattedItems.newLocalFrom = fromDetails;
    }
    if (Object.keys(currentDetails).length) {
      formattedItems.newLocalCurrent = currentDetails;
    }

    const syncChildrenForItem = async (targetDocId) => {
      const safeTargetId = String(targetDocId || "").trim();
      if (!safeTargetId) return;
      const parentRef = db.collection("Test").doc(safeTargetId);
      const nextChildIds = Array.from(
        new Set(
          (selectedChildren || [])
            .map((child) => String(child?.id || "").trim())
            .filter(Boolean)
        )
      ).filter((childId) => childId !== safeTargetId);
      const previousChildIds = Array.from(
        new Set((originalChildIds || []).map((childId) => String(childId || "").trim()))
      ).filter(Boolean);
      const removedChildIds = previousChildIds.filter(
        (childId) => !nextChildIds.includes(childId)
      );

      const applyParentPromises = nextChildIds.map((childId) =>
        db.collection("Test").doc(childId).set({ Parent: parentRef }, { merge: true })
      );
      const clearParentPromises = removedChildIds.map((childId) =>
        db
          .collection("Test")
          .doc(childId)
          .update({ Parent: firebase.firestore.FieldValue.delete() })
          .catch((error) => {
            if (error?.code === "not-found") return;
            throw error;
          })
      );

      if (applyParentPromises.length || clearParentPromises.length) {
        await Promise.all([...applyParentPromises, ...clearParentPromises]);
      }
      setOriginalChildIds(nextChildIds);
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

    const showDuplicateLocalSnError = (localSn) => {
      setErr(
        `There is already an item with AIS "${localSn}". Please use a different AIS.`
      );
      setShowErr(true);
    };

    const assertRegularItemId = (localSn) => {
      if (isReservedStorageUnitId(localSn)) {
        throw new Error(
          `${String(localSn).trim().toUpperCase()} is reserved for a bin or pallet label. Open Inventory Management to create or view that storage unit.`
        );
      }
    };

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

    const nextMachineIds = [
      fromAssociation?.machineId,
      currentAssociation?.machineId,
    ].filter(Boolean);

    let docId = committedItemIdRef.current || id;
    try {
      if (docId) {
        // Check if a localSN is provided and if it differs from the current docId.
        const newDocId =
          items.localSN && items.localSN.trim() !== ""
            ? items.localSN.trim()
            : docId;
        assertRegularItemId(newDocId);
        const payloadWithLocalSn = withLocalSn(formattedItems, newDocId);
        if (docId !== newDocId) {
          if (await itemAisExists(newDocId, docId)) {
            showDuplicateLocalSnError(newDocId);
            return null;
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
            const clientIdField = `client${suffix}Id`;
            const machineIdField = `machine${suffix}Id`;
            const trailerIdField = `trailer${suffix}Id`;
            if (!association) {
              cleanFormattedItems[typeField] =
                firebase.firestore.FieldValue.delete();
              cleanFormattedItems[mapField] =
                firebase.firestore.FieldValue.delete();
              cleanFormattedItems[clientIdField] =
                firebase.firestore.FieldValue.delete();
            }
            if (!association?.machineId) {
              cleanFormattedItems[machineIdField] =
                firebase.firestore.FieldValue.delete();
            }
            if (!association?.trailerId) {
              cleanFormattedItems[trailerIdField] =
                firebase.firestore.FieldValue.delete();
            }
          };
          clearMissingAssociationFields(fromAssociation, "From");
          clearMissingAssociationFields(currentAssociation, "Current");
          cleanFormattedItems.associationTypeFrom =
            firebase.firestore.FieldValue.delete();
          cleanFormattedItems.associationTypeCurrent =
            firebase.firestore.FieldValue.delete();
          if (!selectedParent || !selectedParent.id) {
            cleanFormattedItems.Parent = firebase.firestore.FieldValue.delete();
          }
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
        assertRegularItemId(docId);
        if (requestedDocId && (await itemAisExists(docId))) {
          showDuplicateLocalSnError(docId);
          return;
        }
        const payloadWithLocalSn = withLocalSn(formattedItems, docId);
        await commitItemWithMachineBacklinks({
          db,
          partId: docId,
          itemData: payloadWithLocalSn,
          nextMachineIds,
        });
      }
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
      committedItemIdRef.current = docId;
      setSelectionHistory(nextSelectionHistory);
      setSaveHistory(nextSaveHistory);
      await syncChildrenForItem(docId);
      if (selectedShippingGroupId) {
        await addItemToShippingGroup({
          db,
          firebase,
          groupId: selectedShippingGroupId,
          itemId: docId,
          previousItemId: id || "",
        });
      }
      // Update Tracker only on Save.
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

      // Upload any new photos to Firebase Storage.
      const photoUrls = await uploadPhotos(docId);
      console.log("Item saved and associatedParts updated!");

      setSavedName(items.name || "");

      // Redirect to the new URL using the new document id.
      if (redirect) {
        router.push(`/NewSearch/item/${docId}`);
      }

      // Optionally, you can also show a save confirmation modal:
      if (showSaved) {
        handleShowSaveModal();
      }
      return {
        docId,
        photoUrls,
        selectionHistory: nextSelectionHistory,
        saveHistory: nextSaveHistory,
      };
    } catch (error) {
      if (error?.code === "warehouse-associations/target-exists") {
        showDuplicateLocalSnError(
          String(items.localSN || docId || "").trim()
        );
        return null;
      }
      console.error("Error saving data:", error);
      setErr(error?.message || "Save failed.");
      setShowErr(true);
      return null;
    }
  }

  // Additional state for local warehouse location inputs.
  const [showLocalLocFrom, setShowLocalLocFrom] = useState(false);
  const [showLocalLocCurrent, setShowLocalLocCurrent] = useState(false);

  const cloneLocalLocation = (value) => ({
    region: value?.region || "",
    section: {
      letter: value?.section?.letter || "",
      number: value?.section?.number || "",
    },
    bin: value?.bin || "",
    pallet: value?.pallet || "",
  });

  const handleSwapFromCurrent = () => {
    beginBranchAssociationSelection(true);
    beginBranchAssociationSelection(false);
    swapMachineDetailHydrationBranches();
    const nextFromClient = selectedClientCurrent;
    const nextCurrentClient = selectedClientFrom;
    const nextFromMachine = selectedCurrentMachine;
    const nextCurrentMachine = selectedMachine;
    const nextFromTrailer = selectedTrailerCurrent;
    const nextCurrentTrailer = selectedTrailerFrom;
    const nextAssociationTypeFrom = associationTypeCurrent;
    const nextAssociationTypeCurrent = associationTypeFrom;
    const nextNewLocalFrom = cloneLocalLocation(newLocalCurrent);
    const nextNewLocalCurrent = cloneLocalLocation(newLocalFrom);
    const nextLocalLocFrom = localLocCurrent;
    const nextLocalLocCurrent = localLocFrom;

    setSelectedClientFrom(nextFromClient);
    setSelectedClientCurrent(nextCurrentClient);
    setSelectedMachine(nextFromMachine);
    setSelectedCurrentMachine(nextCurrentMachine);
    setSelectedTrailerFrom(nextFromTrailer);
    setSelectedTrailerCurrent(nextCurrentTrailer);
    setAssociationTypeFrom(nextAssociationTypeFrom);
    setAssociationTypeCurrent(nextAssociationTypeCurrent);
    setNewLocalFrom(nextNewLocalFrom);
    setNewLocalCurrent(nextNewLocalCurrent);
    setLocalLocFrom(nextLocalLocFrom);
    setLocalLocCurrent(nextLocalLocCurrent);
    setShowLocalLocFrom(
      shouldShowLocalLocation(nextFromClient, nextFromMachine, nextLocalLocFrom)
    );
    setShowLocalLocCurrent(
      shouldShowLocalLocation(
        nextCurrentClient,
        nextCurrentMachine,
        nextLocalLocCurrent
      )
    );
  };

  const handleAssociationTypeChange = (isFromBranch, nextType) => {
    beginBranchAssociationSelection(isFromBranch);
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

  // When a machine is selected from the modal.
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
    // const condition = (name) => name && name.toLowerCase() === "interior socal";
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
    handleCloseMachineModal();
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

  // Function to handle printing the label.
  const handlePrint = async () => {
    if (!items.name) {
      alert("Missing name");
      return;
    }

    let clientName = "";

    // Attempt to fetch client name from the Machine document reference.
    if (items.Machine && typeof items.Machine.get === "function") {
      try {
        const machineDoc = await items.Machine.get();
        if (machineDoc.exists) {
          const machineData = stripAssociatedPartsFromMachineSnapshot(
            machineDoc.data() || {}
          );
          if (
            machineData.client &&
            typeof machineData.client.get === "function"
          ) {
            const clientDoc = await machineData.client.get();
            if (clientDoc.exists) {
              clientName = clientDoc.data().name || "";
            }
          }
        }
      } catch (error) {
        console.error("Error fetching machine or client:", error);
      }
    } else {
      console.warn("No Machine reference available in the item");
    }
    console.log(clientName, ":", items.client);
    // Fallback: if no client name was found, check items.client.
    if (!clientName && items.client) {
      if (typeof items.client.get === "function") {
        try {
          const clientDoc = await items.client.get();
          if (clientDoc.exists) {
            clientName = clientDoc.data().name || "";
          }
        } catch (error) {
          console.error("Error fetching client from items.client:", error);
        }
      } else {
        clientName = items.client;
      }
    }
    const mostRecentWorkOrder = getMostRecentDatedEntry(workOrders, {
      workOrder: "",
      date: "",
    });
    const mostRecentDescription = getMostRecentDatedEntry(descriptions, {
      description: "",
      date: "",
    });
    const currentWorkOrder = (mostRecentWorkOrder.workOrder || "").trim();
    const payload = {
      name: items.name,
      pn: items.pn,
      sn: items.sn,
      wo: currentWorkOrder,
      client: clientName,
      status: items.status,
      local_sn: id,
      descriptions: [mostRecentDescription],
      date: getItemCreatedDate(items),
      DOM: DOM,
      oem: selectionToPrintValue(selectedOems),
      modality: selectionToPrintValue(selectedModalities),
      model: selectionToPrintValue(selectedModels),
      poNumber: items.poNumber,
      arrival_date: items.arrival_date, // NEW: Include arrival_date
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
      if (result?.bluefolderStatusCheck || result?.debug?.statusCheck) {
        console.log(
          "[BlueFolder][status-check]",
          result.bluefolderStatusCheck || result.debug.statusCheck
        );
      }
      if (response.status === 409 && result?.code === "work_order_closed") {
        alert(result?.error || `Work order ${currentWorkOrder} is closed.`);
        return;
      }
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
      console.log("Print result:", result.status);

      if (result.status.includes("successfully.")) {
        handleShowPrintModal();
      } else {
        console.error("Error printing label:", result.error);
      }
    } catch (error) {
      console.error("Error printing label:", error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // Only check that the Name field is filled out.
    if (!items.name) {
      handleShow(); // This shows the "missing field" modal.
    } else {
      toSend();
    }
  }

  // Handlers for input changes.
  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event.value;
    setItems((prevItems) => ({ ...prevItems, [field]: value }));
  };

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

  const handleShowCameraModal = () => {
    setCapturedPhoto(null);
    setShowCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setCapturedPhoto(null);
  };

  const handleCapture = (err) => {
    if (err) {
      const errorName = err?.name || "";
      if (errorName !== "NotFoundException") {
        console.warn("Camera scan update warning:", err);
      }
    }
  };

  const handleCameraError = (error) => {
    console.error("Camera access error:", error);
    setErr("Camera access failed. Check browser permissions and try again.");
    setShowErr(true);
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
    handleCloseCameraModal();
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    if (showPhotoViewer) {
      const nextLength = Math.max((photos || []).length - 1, 0);
      if (nextLength === 0) {
        setShowPhotoViewer(false);
        setActivePhotoIndex(0);
      } else if (index <= activePhotoIndex) {
        setActivePhotoIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const openPhotoViewer = (index) => {
    setActivePhotoIndex(index);
    setShowPhotoViewer(true);
  };

  const closePhotoViewer = () => {
    setShowPhotoViewer(false);
  };

  const showPreviousPhoto = () => {
    if (!photos.length) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const showNextPhoto = () => {
    if (!photos.length) return;
    setActivePhotoIndex((prev) =>
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!showPhotoViewer) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowPhotoViewer(false);
      }
      if (event.key === "ArrowLeft" && photos.length) {
        setActivePhotoIndex((prev) =>
          prev === 0 ? photos.length - 1 : prev - 1
        );
      }
      if (event.key === "ArrowRight" && photos.length) {
        setActivePhotoIndex((prev) =>
          prev === photos.length - 1 ? 0 : prev + 1
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPhotoViewer, photos.length]);

  const mostRecentWorkOrder = getMostRecentWorkOrderEntry(workOrders);

  const capturePhoto = () => {
    const cameraContainer = cameraContainerRef.current;
    const video = cameraContainer
      ? cameraContainer.querySelector("video")
      : document.querySelector("video");
    if (!video || !video.videoWidth || !video.videoHeight) {
      setErr("Camera is not ready yet. Please wait a second and try again.");
      setShowErr(true);
      return;
    }

    const maxEdge = 1920;
    const largestEdge = Math.max(video.videoWidth, video.videoHeight);
    const scale = largestEdge > maxEdge ? maxEdge / largestEdge : 1;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        setErr("Unable to capture photo. Please try again.");
        setShowErr(true);
        return;
      }
      setCapturedPhoto(blob);
    }, "image/jpeg", 0.95);
  };

  const handleShowInfoModal = async () => {
    const db = firebase.firestore();
    try {
      const doc = await db.collection("Test").doc(id).get();
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
  const handleCloneToNewItem = () => {
    if (!id) {
      setErr("Item ID not ready yet.");
      setShowErr(true);
      return;
    }
    router.push(`/NewSearch/AddItem/NewItem?cloneFrom=${encodeURIComponent(id)}`);
  };

  const handlePnChange = (index, value) => {
    setItems((prev) => {
      const newPn = [...prev.pn];
      newPn[index] = value;
      return { ...prev, pn: newPn };
    });
  };

  const addPn = () => {
    setItems((prev) => ({
      ...prev,
      pn: [...prev.pn, ""],
    }));
  };

  const handleSnChange = (index, value) => {
    setItems((prev) => {
      const newSn = [...prev.sn];
      newSn[index] = value;
      return { ...prev, sn: newSn };
    });
  };

  const addSn = () => {
    setItems((prev) => ({
      ...prev,
      sn: [...prev.sn, ""],
    }));
  };

  const browseInputRef = useRef(null);

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
    setNewClient({ name: "", location: "" });
    handleCloseClientModal();
    handleShowAddClientModal();
  };

  const handleClearMachineSelection = () => {
    const isFromBranch = machinePick;
    beginBranchAssociationSelection(isFromBranch);
    cancelMachineDetailHydration(isFromBranch);
    if (isFromBranch) {
      setSelectedMachine(null);
      setShowLocalLocFrom(false);
      setLocalLocFrom("");
      setNewLocalFrom(createEmptyLocal());
    } else {
      setSelectedCurrentMachine(null);
      setShowLocalLocCurrent(false);
      setLocalLocCurrent("");
      setNewLocalCurrent(createEmptyLocal());
    }
    handleCloseMachineModal();
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

  const handleBluefolderButton = async () => {
    if (bluefolderLoading) return;

    // Always send the most recent work order (by date), not the first-created entry.
    const currentWorkOrder = (mostRecentWorkOrder?.workOrder || "").trim();
    if (!currentWorkOrder) {
      alert(
        "Please fill out the work order field before adding to BlueFolder."
      );
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to send this item to BlueFolder work order ${currentWorkOrder}?`
      )
    ) {
      return;
    }

    const resolvedLocalSn = String(items.localSN || id || "").trim();
    const currentUser = firebase.auth().currentUser;
    const submittedByEmail = currentUser?.email || "";

    // Build the payload to send to your proxy endpoint.
    const payload = {
      name: items.name,
      pn: items.pn[0] || "",
      sn: items.sn[0] || "",
      status: items.status,
      description: descriptions[selectedDesc]?.description || "",
      workOrder: currentWorkOrder,
      localsn: resolvedLocalSn,
      taxable: false,
      taxableDefault: false,
      tax: false,
      submittedByEmail,
    };

    setBluefolderLoading(true);
    try {
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

// // Slack integration handler.
// const handleAddToSlack = async (which) => {
//   try {
//     const pn0 = Array.isArray(items.pn) ? items.pn[0] : items.pn;
//     const sn0 = Array.isArray(items.sn) ? items.sn[0] : items.sn;

//     const linkUrl = typeof window !== "undefined" ? window.location.href : "";
//     const safeName = (items?.name || id || "Untitled").trim();
//     const title = `${safeName}${id ? ` (${id})` : ""}`;

//     console.log("[SLACK][handleAddToSlack] which:", which);
//     console.log("[SLACK] title:", title);
//     console.log("[SLACK] PN:", items.pn, "SN:", items.sn);

//     const resp = await fetch("/api/slack/add-to-list", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         listKey: which,      // "shipping" | "receiving" | "tasks"
//         title,
//         pn: items.pn,
//         sn: items.sn,
//         // keeping it minimal by design while we stabilize PN/SN
//         linkUrl,
//       }),
//     });
// Slack integration handler (drop-in replacement)
// Slack integration handler (drop-in replacement)


// Slack integration handler (client) — replace your existing handleAddToSlack with this
const handleAddToSlack = async (which = "shipping") => {
  if (slackLoadingKey) return;
  setSlackLoadingKey(which);
  try {
    const saved = await toSend({ redirect: false, showSaved: false });
    if (!saved?.docId) return;
    const docId = saved.docId;
    const safeName = (items?.name || docId || "Untitled").trim();
    const title = `${safeName}${docId ? ` (${docId})` : ""}`;

    const pn0 = Array.isArray(items?.pn) ? items.pn[0] : items?.pn;
    const sn0 = Array.isArray(items?.sn) ? items.sn[0] : items?.sn;
    const pn_sn = [pn0 && `PN: ${pn0}`, sn0 && `SN: ${sn0}`]
      .filter(Boolean)
      .join("  ");

    const mostRecentWO =
      (workOrders && workOrders.length)
        ? [...workOrders].sort((a,b) => new Date(b?.date||0) - new Date(a?.date||0))[0]?.workOrder
        : "";

    const rawDescription =
      (selectedDesc != null && descriptions?.[selectedDesc])
        ? (descriptions[selectedDesc].description || "")
        : (items?.description || "");
    const currentUser = firebase.auth().currentUser;
    const submittedByEmail = currentUser?.email || authUser?.email || "";
    const description = rawDescription;

    const tracking = items?.trackingNumber ?? items?.tracking ?? "";
    const local_sn = docId || items?.localSN || "";

    const photoUrls = Array.isArray(saved?.photoUrls)
      ? saved.photoUrls
      : photos.map((photo) => photo?.url).filter(Boolean);
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
        pn_sn,                 // <— server expects this
        work_order: mostRecentWO || "",
        local_sn,
        tracking,
        description,
        submittedByEmail,
        photoUrls,             // array of https URLs
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
      `Added to Slack ${which === "shipping" ? "Shipping" : which === "receiving" ? "Receiving" : "Tasks"} list.${opsNote}`
    );
  } catch (e) {
    console.error(e);
    setErr("Error adding to Slack");
    setShowErr(true);
  } finally {
    setSlackLoadingKey("");
  }
};


  return (
    <LoggedIn>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <img
            src="/magmo-logo.png"
            alt="Loading Magmo"
            className={styles.loadingLogo}
          />
        </div>
      )}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Missing field</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
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
        <Modal show={showPrintModal} onHide={handleClosePrintModal}>
          <Modal.Header closeButton>
            <Modal.Title>Print Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Info has been sent to print.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClosePrintModal}>
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
            <div className="mb-3" style={{ marginBottom: "1rem" }}>
              <Button variant="primary" onClick={addWorkOrder}>
                Add Work Order
              </Button>
            </div>
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
                  <Button
                    variant="danger"
                    onClick={() => removeWorkOrder(index)}
                  >
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

        <Modal show={showHistoryModal} onHide={handleCloseHistoryModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Selection History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>Saved At</th>
                  <th>From Type</th>
                  <th>From Client</th>
                  <th>From Trailer</th>
                  <th>From Machine</th>
                  <th>Current Type</th>
                  <th>Current Client</th>
                  <th>Current Trailer</th>
                  <th>Current Machine</th>
                  <th>Work Order</th>
                  <th>Date Type</th>
                  <th>Arrival/Departure Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(selectionHistory || []).length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center text-muted">
                      No history yet. A row will be added on Save when From/Current/Machine/WO/date changes.
                    </td>
                  </tr>
                ) : (
                  selectionHistory.map((entry, index) => (
                    <tr key={`${entry?.savedAt || "history"}-${index}`}>
                      <td>
                        {entry?.savedAt
                          ? new Date(entry.savedAt).toLocaleString()
                          : "-"}
                      </td>
                      <td>{entry?.fromAssociationType || (entry?.fromTrailerId ? "trailer" : entry?.fromMachineId ? "machine" : "site")}</td>
                      <td>{entry?.fromClientName || "-"}</td>
                      <td>{entry?.fromTrailerName || entry?.fromTrailerId || "-"}</td>
                      <td>{entry?.fromMachineName || "-"}</td>
                      <td>{entry?.currentAssociationType || (entry?.currentTrailerId ? "trailer" : entry?.currentMachineId ? "machine" : "site")}</td>
                      <td>{entry?.currentClientName || "-"}</td>
                      <td>{entry?.currentTrailerName || entry?.currentTrailerId || "-"}</td>
                      <td>{entry?.currentMachineName || "-"}</td>
                      <td>{entry?.workOrder || "-"}</td>
                      <td>{getHistoryMovementDateLabel(entry)}</td>
                      <td>{getHistoryMovementDate(entry) || "-"}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteHistoryEntry(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseHistoryModal}>
              Close
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

        <Modal show={showMachineModal} onHide={handleCloseMachineModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Select Machine
              {(machinePick ? selectedClientFrom?.name : selectedClientCurrent?.name)
                ? ` for ${machinePick ? selectedClientFrom?.name : selectedClientCurrent?.name}`
                : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="text"
              placeholder="Search by machine name"
              className="mb-3"
              value={machineSearch}
              onChange={(e) => setMachineSearch(e.target.value)}
            />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleClearMachineSelection}
                      >
                        Clear Selection
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="ms-2"
                        onClick={handleShowCreateMachineModal}
                      >
                        Add New Machine
                      </Button>
                    </div>
                  </td>
                </tr>
                {machineOptionsLoading && (
                  <tr>
                    <td colSpan={3} className="text-center text-muted">
                      Loading machines…
                    </td>
                  </tr>
                )}
                {machineOptions
                  .filter((machine) =>
                    (machine.name || "")
                      .toLowerCase()
                      .includes(machineSearch.toLowerCase())
                  )
                  .map((machine) => (
                    <tr key={machine.id}>
                      <td>{machine.name}</td>
                      <td>{machine.local || machine.location || ""}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSetSelectedMachine(machine)}
                        >
                          Select
                        </Button>
                      </td>
                    </tr>
                  ))}
                {!machineOptionsLoading &&
                  machineOptions.filter((machine) =>
                    (machine.name || "")
                      .toLowerCase()
                      .includes(machineSearch.toLowerCase())
                  ).length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-muted">
                      No machines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMachineModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showClientModal} onHide={handleCloseClientModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="text"
              placeholder="Search by name"
              className="mb-3"
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
            />
            <ClientTable
              clients={clients.filter((client) =>
                (client.name || "")
                  .toLowerCase()
                  .includes(clientSearch.toLowerCase())
              )}
              onSelectClient={handleClientInfo}
              onInfoClick={handleClientInfo}
              clearSelection={handleClearClientSelection}
              onAddClient={!machinePick ? handleAddNewClient : undefined}
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
              <Form.Group controlId="item-client-trailer-confirmation">
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

        <Modal show={showAddClientModal} onHide={handleCloseAddClientModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newClientName" className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter client name"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="newClientLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={newClient.location}
                onChange={(e) =>
                  setNewClient((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddClientModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateClientFromModal}
              disabled={savingClient}
            >
              {savingClient ? "Creating..." : "Create Client"}
            </Button>
          </Modal.Footer>
        </Modal>

        <MachineCreationModal
          show={showCreateMachineModal}
          handleClose={handleCloseCreateMachineModal}
          onCreateMachine={handleCreateMachineForClient}
        />

        <ParentModal
          show={showParentModal}
          handleClose={handleCloseParentModal}
          selectionMode="single"
          title="Select Parent"
          subtitle="Search and choose a parent item for this part."
          selectedItems={selectedParent ? [selectedParent] : []}
          excludeIds={[id]}
          onConfirm={handleConfirmParentSelection}
        />

        <ParentModal
          show={showChildModal}
          handleClose={handleCloseChildModal}
          selectionMode="multiple"
          title="Select Children"
          subtitle="Search and choose child items for this part."
          selectedItems={selectedChildren}
          excludeIds={[id]}
          onConfirm={handleConfirmChildrenSelection}
        />

        <MachineSelectionModal
          show={machineSelectionModal}
          handleClose={() => setMachineSelectionModal(false)}
          setMachine={setTheMachine}
        />

        <Modal show={showCameraModal} onHide={handleCloseCameraModal}>
          <Modal.Header closeButton>
            <Modal.Title>Take a Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="camera" ref={cameraContainerRef}>
              {!capturedPhoto && (
                <BarcodeScannerComponent
                  width="100%"
                  height={300}
                  onUpdate={handleCapture}
                  onError={handleCameraError}
                  facingMode={cameraFacing}
                  videoConstraints={cameraVideoConstraints}
                  stopStream={!showCameraModal}
                />
              )}
              {capturedPhoto && (
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
                  Snap
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

        <Modal show={showPhotoViewer} onHide={closePhotoViewer} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Photo {Math.min(activePhotoIndex + 1, photos.length)} of {photos.length}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            {photos[activePhotoIndex]?.url ? (
              <img
                src={photos[activePhotoIndex].url}
                alt={`Photo ${activePhotoIndex + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div>No image selected.</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={showPreviousPhoto}
              disabled={photos.length <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline-secondary"
              onClick={showNextPhoto}
              disabled={photos.length <= 1}
            >
              Next
            </Button>
            <Button variant="secondary" onClick={closePhotoViewer}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <InfoModal
          show={showInfoModal}
          handleClose={handleCloseInfoModal}
          itemName={items.name}
          dimensions={items.length + "," + items.width + "," + items.height}
          price={items.price}
          freqI={freqItem}
          freqM={machineFrequency}
          usage={usagePastYear}
        />

        <Container fluid className={styles.page}>
          <div className={styles.shell}>
            <Card className={styles.card}>
              <Card.Body className={styles.cardBody}>
                <div className={styles.header}>
                  <div className={styles.kicker}>Item</div>
                  <h2 className={styles.title}>
                    {savedName || "Item Details"}
                  </h2>
                  <div className={styles.subtitle}>
                    Review and update fields, photos, and routing information.
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
                            <Form.Control
                              type="text"
                              value={items.pn[currentPnIndex] || ""}
                              onChange={(e) =>
                                handlePnChange(currentPnIndex, e.target.value)
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowDropdown(!showDropdown)}
                            >
                              &#9662;
                            </Button>
                            <InputGroup.Text>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setAddingNewPn(true)}
                              >
                                +
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
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
                              {(Array.isArray(items.pn) ? items.pn : []).map((pnOption, idx) => (
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
                        {addingNewPn && (
                          <Form.Control
                            type="text"
                            placeholder="Enter new PN"
                            value={newPn}
                            onChange={(e) => setNewPn(e.target.value)}
                            onBlur={handleAddNewPn}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddNewPn()
                            }
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Row for SN and Status */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="sn">
                        <Form.Label>Serial Number</Form.Label>
                        <div style={{ position: "relative" }}>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              value={items.sn[currentSnIndex] || ""}
                              onChange={(e) =>
                                handleSnChange(currentSnIndex, e.target.value)
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => setShowSnDropdown(!showSnDropdown)}
                            >
                              &#9662;
                            </Button>
                            <InputGroup.Text>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setAddingNewSn(true)}
                              >
                                +
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
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
                              {(Array.isArray(items.sn) ? items.sn : []).map((snOption, idx) => (
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
                        {addingNewSn && (
                          <Form.Control
                            type="text"
                            placeholder="Enter new SN"
                            value={newSn}
                            onChange={(e) => setNewSn(e.target.value)}
                            onBlur={handleAddNewSn}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddNewSn()
                            }
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
                  {/* Row for Local SN and movement date */}
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
                  </Row>
                  {/* Row for OEM, Modality, Model */}
                  <Row className="mb-3">
                    <Col>
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
                    </Col>
                    <Col>
                      <MultiSelectDropdown
                        label="Modality"
                        placeholder={trackerLoading ? "Loading..." : "Select Modality"}
                        options={modalityOptionsForUI}
                        selected={selectedModalities}
                        onChange={handleModalitySelectionChange}
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
                    </Col>
                  </Row>
                  {/* Work Orders and Inline Description Section */}
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
                            value={mostRecentWorkOrder.workOrder}
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
                            value={mostRecentWorkOrder.date}
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
                          style={{
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {/* Machine Selection Row */}
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
                                onFocus={loadClients}
                                onChange={(event) =>
                                  handleTrailerSelection(true, event.target.value)
                                }
                              >
                                <option value="">
                                  Choose a trailer
                                </option>
                                {allTrailerOptions.map((trailer) => (
                                  <option value={trailer.id} key={trailer.id}>
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
                              <p className="text-muted small mb-2">
                                <strong>Selected Trailer (From):</strong>{" "}
                                {selectedTrailerFrom.name}. The client/site above is saved
                                on this item as its historical source.
                              </p>
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
                                <>
                                  <p style={{ marginTop: "0.5rem" }}>
                                    <strong>Selected Machine (From):</strong>{" "}
                                    {selectedMachine.name}
                                  </p>
                                  {false && showLocalLocFrom && (
                                    <>
                                      <Button
                                        variant="outline-secondary"
                                        onClick={() =>
                                          setShowNewLocalModalFrom(true)
                                        }
                                        className="w-100 mb-2"
                                      >
                                        {/* build a little helper inline: region-section-bin-pallet */}
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
                                          .join("-")}
                                        {/* e.g. “E-A7-B3-P2” */}
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
                                        {/* <Modal.Footer>
                                          <Button
                                            variant="secondary"
                                            onClick={() => setShowNewLocalModalFrom(false)}
                                          >
                                            Close
                                          </Button>
                                        </Modal.Footer> */}
                                      </Modal>
                                    </>
                                  )}
                                </>
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
                                onFocus={loadClients}
                                onChange={(event) =>
                                  handleTrailerSelection(false, event.target.value)
                                }
                              >
                                <option value="">
                                  Choose a trailer
                                </option>
                                {allTrailerOptions.map((trailer) => (
                                  <option value={trailer.id} key={trailer.id}>
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
                              <p className="text-muted small mb-2">
                                <strong>Selected Trailer (Current):</strong>{" "}
                                {selectedTrailerCurrent.name}. The client/site above is
                                stored separately on this item.
                              </p>
                            )}
                            {associationTypeCurrent === ITEM_ASSOCIATION_MACHINE && (
                            <div style={{ marginTop: "0.5rem" }}>
                              <Button
                                variant="outline-secondary"
                                onClick={() => openMachineModalForBranch(false)}
                              >
                                Select Machine for{" "}
                                {selectedClientCurrent?.name ||
                                  selectedTrailerCurrent?.name}
                              </Button>
                              {selectedCurrentMachine && (
                                <>
                                  <p style={{ marginTop: "0.5rem" }}>
                                    <strong>Selected Machine (Current):</strong>{" "}
                                    {selectedCurrentMachine.name}
                                  </p>
                                  {false && showLocalLocCurrent && (
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
                                          .join("-")}
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
                                            selectedClient={
                                              selectedClientCurrent
                                            }
                                            showLocalLoc={
                                              showNewLocalModalCurrent
                                            }
                                            value={newLocalCurrent}
                                            onChange={setNewLocalCurrent}
                                            onSave={(p) => {
                                              setNewLocalCurrent(p);
                                              setShowNewLocalModalCurrent(
                                                false
                                              );
                                            }}
                                            onCancel={() =>
                                              setShowNewLocalModalCurrent(false)
                                            }
                                          />
                                        </Modal.Body>
                                        {/* <Modal.Footer>
                                          <Button
                                            variant="secondary"
                                            onClick={() => setShowNewLocalModalCurrent(false)}
                                          >
                                            Close
                                          </Button>
                                        </Modal.Footer> */}
                                      </Modal>
                                    </>
                                  )}
                                </>
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
                          className="me-2 mb-2"
                        >
                          Select Parent
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={handleShowChildModal}
                          className="me-2 mb-2"
                        >
                          Select Children
                        </Button>
                        <Button
                          variant={items.attached ? "success" : "outline-secondary"}
                          onClick={handleAttachToggle}
                          className="mb-2"
                          disabled={!items.attached && !selectedParent?.id}
                          title={
                            selectedParent?.id
                              ? items.attached
                                ? "Detach and show this item in searches"
                                : "Attach to parent and hide from searches"
                              : "Select a parent before attaching this item"
                          }
                        >
                          {items.attached ? "Attached" : "Attach"}
                        </Button>
                        {selectedParent && (
                          <Form.Control
                            type="text"
                            placeholder="Selected Parent"
                            value={selectedParent.name}
                            readOnly
                            style={{ marginTop: "0.5rem" }}
                          />
                        )}
                        <div
                          style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            padding: "0.5rem 0.75rem",
                            marginTop: "0.5rem",
                            maxHeight: "140px",
                            overflowY: "auto",
                          }}
                        >
                          <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
                            Selected Children ({selectedChildren.length})
                          </div>
                          {selectedChildren.length === 0 ? (
                            <div style={{ color: "#64748b" }}>
                              No children selected.
                            </div>
                          ) : (
                            selectedChildren.map((child) => (
                              <div key={child.id}>
                                <Link href={`/NewSearch/item/${child.id}`}>
                                  {child.name || child.id}
                                </Link>
                              </div>
                            ))
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <ShippingGroupField
                    itemId={id || ""}
                    value={selectedShippingGroupId}
                    onChange={setSelectedShippingGroupId}
                  />

                  {/* Photo options */}
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
                        </ButtonGroup>
                      </Col>
                      <Col xs={12} md={6} className={styles.photoActionsRight}>
                        <Button
                          variant="secondary"
                          onClick={handleBluefolderButton}
                          disabled={bluefolderLoading}
                          style={{ marginLeft: "auto", marginRight: ".5rem" }}
                        >
                          {bluefolderLoading ? "Sending..." : "BlueFolder"}
                        </Button>

                        <Form.Check
                          type="checkbox"
                          id="hide-checkbox"
                          label="Hide"
                          // box is checked when we want visible = false
                          checked={!items.visible}
                          onChange={(e) => {
                            // grab checked immediately
                            const isHidden = e.currentTarget.checked;
                            setItems((prev) => ({
                              ...prev,
                              visible: !isHidden,
                              attached: isHidden ? prev.attached : false,
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
                    onOpenPhoto={openPhotoViewer}
                  />
                  {/* Action Buttons */}
                  <div className={`mt-3 d-flex flex-wrap align-items-center ${styles.actionRow}`}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={
                        isLoading ||
                        Boolean(associationLoadError) ||
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
                      variant="secondary"
                      onClick={handleCloneToNewItem}
                      disabled={
                        isLoading ||
                        Boolean(associationLoadError) ||
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
                      type="primary"
                      name="Back"
                      route="NewSearch/mainSearch"
                    />
                    {SHOW_SLACK_BUTTONS && (
                      <div style={{ display: "flex", flexDirection: "column", marginLeft: ".5rem" }}>
                        <span style={{ fontSize: 12, lineHeight: "12px", textAlign: "center" }}>Slack</span>
                        <div style={{ display: "flex", border: "1px solid #ced4da", borderRadius: 6, overflow: "hidden" }}>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleAddToSlack("receiving")}
                            disabled={Boolean(slackLoadingKey)}
                            style={{ border: "none", borderRight: "1px solid #ced4da" }}
                          >
                            {slackLoadingKey === "receiving"
                              ? "Receiving..."
                              : "Receiving"}
                          </Button>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleAddToSlack("shipping")}
                            disabled={Boolean(slackLoadingKey)}
                            style={{ border: "none" }}
                          >
                            {slackLoadingKey === "shipping"
                              ? "Shipping..."
                              : "Shipping"}
                          </Button>
                          {/* <Button
                            variant="outline-primary"
                            onClick={() => handleAddToSlack("tasks")}
                          >
                            Tasks
                          </Button> */}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="info"
                      onClick={handlePrint}
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
                      <div className="d-flex justify-content-end mb-3">
                        <Button variant="secondary" onClick={handleShowInfoModal}>
                          More Info
                        </Button>
                      </div>
                      <Row>
                        <Form.Group as={Col} controlId="dimensions">
                          <Form.Label>Dimensions</Form.Label>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Form.Control
                              placeholder="Length"
                              type="text"
                              value={items.length}
                              onChange={handleChange("length")}
                            />
                            <span style={{ padding: "0 5px" }}>x</span>
                            <Form.Control
                              placeholder="Width"
                              type="text"
                              value={items.width}
                              onChange={handleChange("width")}
                            />
                            <span style={{ padding: "0 5px" }}>x</span>
                            <Form.Control
                              placeholder="Height"
                              type="text"
                              value={items.height}
                              onChange={handleChange("height")}
                            />
                          </div>
                        </Form.Group>
                      </Row>

                      <Row className="mt-3">
                        <Form.Group as={Col} controlId="Price">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            placeholder="Price"
                            type="text"
                            value={items.price}
                            onChange={handleChange("price")}
                          />
                          <div className="mt-2 d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              onClick={handleShowHistoryModal}
                            >
                              History
                            </Button>
                            {isAdminUser && (
                              <Button
                                variant="outline-secondary"
                                className="ms-2"
                                onClick={handleShowSaveHistoryModal}
                              >
                                Save History
                              </Button>
                            )}
                            <Button
                              variant="outline-secondary"
                              className="ms-2"
                              onClick={handleQuickbooksButton}
                              disabled={!isAdminUser}
                            >
                              Quickbooks
                            </Button>
                          </div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="DOM">
                          <Form.Label>DOM</Form.Label>
                          <Form.Control
                            placeholder="Date of Manufacture"
                            type="date"
                            value={DOM}
                            onChange={(e) => setDOM(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="poNumber">
                          <Form.Label>PO Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="PO Number"
                            value={items.poNumber || ""}
                            onChange={handleChange("poNumber")}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="trackingNumber">
                          <Form.Label>Tracking Number</Form.Label>
                          <Form.Control
                            placeholder="Tracking Number"
                            type="text"
                            value={items.trackingNumber || ""}
                            onChange={handleChange("trackingNumber")}
                          />
                        </Form.Group>
                      </Row></div>
                  </Collapse>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </LoggedIn>
  );
}

export default function DisplayItemPage(props) {
  const router = useRouter();
  const idFromRouter = router.query?.id;
  const key = props?.initialItem?.id || idFromRouter || "new-item";
  return <DisplayItemInner {...props} key={key} />;
}

// Server-side rendering function
export async function getServerSideProps(context) {
  const { id } = context.params;
  const storageUnitRoute = buildStorageUnitRoute(id);
  if (storageUnitRoute) {
    return {
      redirect: {
        destination: storageUnitRoute,
        permanent: false,
      },
    };
  }

  try {
    if (!adminDb) {
      return { props: { error: "Firebase Admin not configured for SSR." } };
    }
    const itemDoc = await adminDb.collection("Test").doc(id).get();
    if (!itemDoc.exists) {
      const safeId = encodeURIComponent(String(id || "").trim());
      return {
        redirect: {
          destination: `/NewSearch/AddItem/NewItem?localSN=${safeId}&fromScan=1`,
          permanent: false,
        },
      };
    }

    const itemData = itemDoc.data();

    // normalize to arrays for consistent client-side handling
    const pnArray = Array.isArray(itemData.pn)
      ? itemData.pn
      : (itemData.pn ? [itemData.pn] : []);
    const snArray = Array.isArray(itemData.sn)
      ? itemData.sn
      : (itemData.sn ? [itemData.sn] : []);

    // Optional machine data was removed from SSR props to avoid
    // passing non-serializable Firestore references.

    const serializedItem = {
      id,
      name: itemData.name || "",
      pn: pnArray,
      sn: snArray,
      price: itemData.price || "",
      status: itemData.status || "",
      length: itemData.length || "",
      width: itemData.width || "",
      height: itemData.height || "",
      poNumber: itemData.poNumber || "",
      trackingNumber: itemData.trackingNumber || "",
      localSN: itemData.localSN || itemData.local_sn || id || "",
      arrival_date: itemData.arrival_date || "",
      departure_date: itemData.departure_date || "",
      movementDateType:
        itemData.movementDateType === "departure" ? "departure" : "arrival",
      date: itemData.date || "",
      dateCreated: itemData.dateCreated || "",
      visible: itemData.visible !== undefined ? itemData.visible : true,
      attached: itemData.attached === true,

      // add the pieces the UI reads directly
      descriptions: itemData.descriptions || [],
      workOrders: itemData.workOrders || [],
      selectionHistory: itemData.selectionHistory || [],
      saveHistory: itemData.saveHistory || [],
      DOM: itemData.DOM || "",
    };

    return {
      props: {
        initialItem: serializedItem,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { error: "Failed to load item data" } };
  }
}

