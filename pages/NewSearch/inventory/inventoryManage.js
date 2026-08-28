import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import { useRouter } from "next/router";
import LoggedIn from "../../LoggedIn";
import firebase from "../../../context/Firebase";
import { formatLoc } from "../../../utils/itemFormShared";
import { fetchPartsWithMachineDataPage } from "../../../utils/fetchAssociations";
import {
  getRefId as getWarehouseRefId,
  stripAssociatedPartsFromMachineSnapshot,
  syncAssociatedPartsForItem,
} from "../../../utils/warehouseAssociations";
import styles from "../../../styles/InventoryManage.module.css";

const {
  parseStorageUnitId,
} = require("../../../lib/inventory/storageUnitContract.cjs");

const KEEP_VALUE = "__KEEP__";
const CLEAR_VALUE = "__CLEAR__";
const PAGE_SIZE = 25;
const GROUP_TYPES = {
  shipping: "Shipping",
  receiving: "Receiving",
};
const INVENTORY_PAGE_TIMEOUT_MS = 30000;
const AUXILIARY_LOAD_TIMEOUT_MS = 12000;
const photoCache = new Map();
const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function normalizeLocation(loc = {}) {
  let sectionLetter = "";
  let sectionNumber = "";

  if (typeof loc.section === "string") {
    const match = loc.section.trim().match(/^([A-Za-z]+)\s*(.*)$/);
    sectionLetter = match?.[1]?.toUpperCase() || "";
    sectionNumber = match?.[2] || "";
  } else if (loc.section && typeof loc.section === "object") {
    sectionLetter = String(loc.section.letter || "").trim().toUpperCase();
    sectionNumber =
      loc.section.number !== undefined && loc.section.number !== null
        ? String(loc.section.number).trim()
        : "";
  }

  return {
    region: String(loc.region ?? "").trim(),
    sectionLetter,
    sectionNumber,
    bin: String(loc.bin ?? "").trim(),
    pallet: String(loc.pallet ?? "").trim(),
  };
}

function sortNatural(values) {
  return Array.from(
    new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))
  ).sort((a, b) => naturalCollator.compare(a, b));
}

function sequence(count, formatter = (value) => String(value)) {
  const parsed = Number(count);
  if (!Number.isFinite(parsed) || parsed <= 0) return [];
  return Array.from({ length: parsed }, (_, index) => formatter(index + 1));
}

function storedValue(value) {
  const normalized = String(value ?? "").trim();
  if (/^\d+$/.test(normalized)) return Number(normalized);
  return normalized;
}

function getCommonValue(items, field) {
  if (!items.length) return "";
  const first = String(items[0]?.[field] ?? "");
  return items.every((item) => String(item?.[field] ?? "") === first)
    ? first
    : KEEP_VALUE;
}

function buildEditorState(selectedItems) {
  return {
    region: getCommonValue(selectedItems, "region"),
    sectionLetter: getCommonValue(selectedItems, "sectionLetter"),
    sectionNumber: getCommonValue(selectedItems, "sectionNumber"),
    pallet: getCommonValue(selectedItems, "pallet"),
    bin: getCommonValue(selectedItems, "bin"),
  };
}

function buildExteriorEditorState() {
  return {
    fromClient: KEEP_VALUE,
    fromMachine: KEEP_VALUE,
    currentClient: KEEP_VALUE,
    currentMachine: KEEP_VALUE,
  };
}

function resolveEditorValue(editorValue, originalValue) {
  if (editorValue === KEEP_VALUE) return String(originalValue ?? "");
  if (editorValue === CLEAR_VALUE) return "";
  return String(editorValue ?? "").trim();
}

function getRefId(ref) {
  const refId = getWarehouseRefId(ref);
  if (refId) return String(refId).split("/").filter(Boolean).pop() || refId;
  if (typeof ref === "string") return ref.split("/").filter(Boolean).pop() || ref;
  return "";
}

function getMachineLabel(machine) {
  return [
    machine?.name || machine?.id,
    machine?.OEM || machine?.oem,
    machine?.Modality || machine?.modality,
    machine?.Model || machine?.model,
  ]
    .filter(Boolean)
    .join(" - ");
}

function getTimestampMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (value.seconds) return value.seconds * 1000;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getGroupDateLabel(group) {
  const millis = getTimestampMillis(group?.updatedAt || group?.createdAt);
  if (!millis) return "No date";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(millis));
}

function normalizeGroupDocument(document) {
  const doc = document.data() || {};
  const type = doc.type === "receiving" ? "receiving" : "shipping";
  return {
    id: document.id,
    name: doc.name || `${GROUP_TYPES[type]} Group`,
    type,
    itemIds: Array.isArray(doc.itemIds) ? doc.itemIds : [],
    itemCount:
      Number.isFinite(Number(doc.itemCount)) && Number(doc.itemCount) >= 0
        ? Number(doc.itemCount)
        : Array.isArray(doc.itemIds)
        ? doc.itemIds.length
        : 0,
    createdAt: doc.createdAt || null,
    updatedAt: doc.updatedAt || null,
  };
}

function mapItemDocument(document) {
  const doc = document.data() || {};
  const currentLocation = normalizeLocation(doc.newLocalCurrent || {});
  const fromLocation = normalizeLocation(doc.newLocalFrom || {});
  return {
    id: document.id,
    name: doc.name || "",
    pn: doc.pn || "",
    sn: doc.sn || "",
    localSN: doc.localSN || doc.local_sn || "",
    ...currentLocation,
    currentBin: currentLocation.bin,
    currentPallet: currentLocation.pallet,
    fromBin: fromLocation.bin,
    fromPallet: fromLocation.pallet,
    clientFromId: getRefId(doc.ClientFrom || doc.clientFromId),
    clientCurrentId: getRefId(doc.ClientCurrent || doc.clientCurrentId),
    machineFromId: getRefId(doc.MachineFrom || doc.Machine),
    currentMachineId: getRefId(doc.MachineCurrent || doc.CurrentMachine),
  };
}

function normalizeInventoryItem(rawItem = {}) {
  const currentLocation = normalizeLocation(rawItem.newLocalCurrent || {});
  const fromLocation = normalizeLocation(rawItem.newLocalFrom || {});
  return {
    id: rawItem.id || "",
    name: rawItem.name || "",
    pn: rawItem.pn || "",
    sn: rawItem.sn || "",
    localSN: rawItem.localSN || rawItem.local_sn || "",
    ...currentLocation,
    currentBin: currentLocation.bin,
    currentPallet: currentLocation.pallet,
    fromBin: fromLocation.bin,
    fromPallet: fromLocation.pallet,
    clientFromId: getRefId(rawItem.ClientFrom || rawItem.clientFromId),
    clientCurrentId: getRefId(
      rawItem.ClientCurrent || rawItem.clientCurrentId
    ),
    machineFromId: getRefId(
      rawItem.MachineFrom || rawItem.Machine || rawItem.machineFromId
    ),
    currentMachineId: getRefId(
      rawItem.MachineCurrent ||
        rawItem.CurrentMachine ||
        rawItem.currentMachineId
    ),
  };
}

function normalizeStorageUnitDocument(document) {
  const data = document.data() || {};
  const documentId = String(document.id || "").trim();
  const parsedUnit = parseStorageUnitId(documentId);
  if (!parsedUnit || documentId !== parsedUnit.id) return null;

  const { id: code, type: kind, number: parsedNumber } = parsedUnit;
  const storedCode = String(data.code || "").trim();
  const storedCodeUnit = storedCode ? parseStorageUnitId(storedCode) : null;
  const storedNumber = Number(data.number);
  const metadataMismatch =
    (storedCode && storedCodeUnit?.id !== code) ||
    (data.kind && data.kind !== kind) ||
    (data.number !== undefined &&
      data.number !== null &&
      (!Number.isSafeInteger(storedNumber) || storedNumber !== parsedNumber));
  const rawLocation = data.warehouseLocation || data.location || {};
  const location = normalizeLocation(rawLocation);
  const locationCandidates = Array.isArray(data.locationCandidates)
    ? data.locationCandidates
    : [];

  return {
    id: document.id,
    code,
    kind,
    number: parsedNumber,
    displayNumber: String(parsedNumber),
    name: data.name || `${kind === "bin" ? "Bin" : "Pallet"} ${parsedNumber}`,
    active: data.active !== false,
    region: location.region,
    sectionLetter: location.sectionLetter,
    sectionNumber: location.sectionNumber,
    locationStatus: String(data.locationStatus || "unknown").toLowerCase(),
    locationCandidates,
    parentPalletId: String(data.parentPalletId || "").trim().toUpperCase(),
    parentStatus: String(data.parentStatus || "none").toLowerCase(),
    reviewRequired:
      metadataMismatch ||
      data.reviewRequired === true ||
      String(data.locationStatus || "").toLowerCase() === "review_required" ||
      String(data.parentStatus || "").toLowerCase() === "review_required",
  };
}

function storageUnitLocationLabel(unit) {
  if (unit.region && unit.sectionLetter && unit.sectionNumber) {
    return `${unit.region} - ${unit.sectionLetter}${unit.sectionNumber}`;
  }
  if (unit.reviewRequired && unit.locationCandidates.length > 0) {
    return `${unit.locationCandidates.length} locations need review`;
  }
  return "Unknown";
}

function storageUnitMatchesSearch(unit, searchValue) {
  const search = String(searchValue || "").trim().toLowerCase();
  if (!search) return true;
  const compactSearch = search.replace(/[\s_-]+/g, "");
  const location = storageUnitLocationLabel(unit);
  const values = [
    unit.code,
    unit.displayNumber,
    unit.name,
    unit.kind,
    `${unit.kind} ${unit.displayNumber}`,
    location,
    unit.parentPalletId,
  ].map((value) => String(value || "").toLowerCase());
  return values.some(
    (value) =>
      value.includes(search) ||
      value.replace(/[\s_-]+/g, "").includes(compactSearch)
  );
}

function locationValueMatches(item, value, scope, currentField, fromField) {
  if (!value) return true;
  if (scope === "current") return item[currentField] === value;
  if (scope === "from") return item[fromField] === value;
  return item[currentField] === value || item[fromField] === value;
}

function itemMatchesInventoryFilters(item, filters) {
  if (filters.region && item.region !== filters.region) return false;
  if (filters.sectionLetter && item.sectionLetter !== filters.sectionLetter) {
    return false;
  }
  if (filters.sectionNumber && item.sectionNumber !== filters.sectionNumber) {
    return false;
  }
  if (
    !locationValueMatches(
      item,
      filters.bin,
      filters.binLocationScope,
      "currentBin",
      "fromBin"
    )
  ) {
    return false;
  }
  if (
    !locationValueMatches(
      item,
      filters.pallet,
      filters.palletLocationScope,
      "currentPallet",
      "fromPallet"
    )
  ) {
    return false;
  }
  const nameSearch = String(filters.name || "").trim().toLowerCase();
  if (
    nameSearch &&
    !String(item.name || "").toLowerCase().includes(nameSearch)
  ) {
    return false;
  }
  const localSearch = filters.localSN.trim().toLowerCase();
  if (
    localSearch &&
    !String(item.localSN || "").toLowerCase().includes(localSearch)
  ) {
    return false;
  }
  return true;
}

const INVENTORY_FILTER_FIELDS = [
  "region",
  "sectionLetter",
  "sectionNumber",
  "bin",
  "binLocationScope",
  "pallet",
  "palletLocationScope",
  "name",
  "localSN",
];

function getInventoryFilterKey(filters) {
  return JSON.stringify(
    INVENTORY_FILTER_FIELDS.map((field) => String(filters?.[field] || "").trim())
  );
}

function inventoryFiltersEqual(left, right) {
  return INVENTORY_FILTER_FIELDS.every(
    (field) => String(left?.[field] || "") === String(right?.[field] || "")
  );
}

function getFirestoreEqualityValues(value) {
  const text = String(value ?? "").trim();
  if (!text) return [];
  const values = [text];
  if (/^-?\d+(?:\.\d+)?$/.test(text)) values.push(Number(text));
  return values.filter(
    (entry, index) =>
      values.findIndex(
        (candidate) =>
          typeof candidate === typeof entry && candidate === entry
      ) === index
  );
}

function buildInventoryQueryPlan(db, filters) {
  const collection = db.collection("Test");
  const documentId = firebase.firestore.FieldPath.documentId();
  const orderedFieldQuery = (field, value, label) => {
    const values = getFirestoreEqualityValues(value);
    if (!values.length) return null;
    const query =
      values.length === 1
        ? collection.where(field, "==", values[0])
        : collection.where(field, "in", values);
    return {
      query: query.orderBy(documentId),
      label,
    };
  };
  const scopedLocationQuery = (kind, value, requestedScope) => {
    const fields = {
      bin: {
        current: "newLocalCurrent.bin",
        from: "newLocalFrom.bin",
      },
      pallet: {
        current: "newLocalCurrent.pallet",
        from: "newLocalFrom.pallet",
      },
    };
    const scope =
      requestedScope === "current" || requestedScope === "from"
        ? requestedScope
        : "both";
    const sides = scope === "both" ? ["current", "from"] : [scope];
    const plans = sides
      .map((side) =>
        orderedFieldQuery(fields[kind][side], value, `${kind}-${side}`)
      )
      .filter(Boolean);
    if (plans.length === 1) return plans[0];
    return {
      query: null,
      queries: plans.map((plan) => plan.query),
      label: `${kind}-current-from`,
    };
  };

  const localSearch = String(filters.localSN || "").trim();
  if (localSearch) {
    const compactLocalSearch = localSearch.replace(/\s+/g, "");
    if (/^(?:ais)?\d+$/i.test(compactLocalSearch)) {
      const digits = compactLocalSearch.replace(/^ais/i, "");
      const prefix = `AIS${digits}`;
      return {
        query: collection
          .orderBy(documentId)
          .startAt(prefix)
          .endAt(`${prefix}\uf8ff`),
        label: "local-sn-document-prefix",
      };
    }
    return {
      query: collection
        .orderBy("localSN")
        .startAt(localSearch)
        .endAt(`${localSearch}\uf8ff`),
      label: "local-sn-prefix",
    };
  }

  if (filters.bin) {
    return scopedLocationQuery(
      "bin",
      filters.bin,
      filters.binLocationScope
    );
  }
  if (filters.pallet) {
    return scopedLocationQuery(
      "pallet",
      filters.pallet,
      filters.palletLocationScope
    );
  }

  const nameSearch = String(filters.name || "").trim().toLowerCase();
  if (nameSearch) {
    const primaryToken = Array.from(
      new Set(nameSearch.split(/[^a-z0-9]+/).filter(Boolean))
    ).sort((left, right) => right.length - left.length || left.localeCompare(right))[0];
    return {
      query: primaryToken
        ? collection
            .where("nameTokens", "array-contains", primaryToken)
            .orderBy(documentId)
        : collection.where(documentId, "==", "__inventory_search_no_match__"),
      label: "name-token",
    };
  }

  if (filters.region) {
    return orderedFieldQuery(
      "newLocalCurrent.region",
      filters.region,
      "region"
    );
  }
  if (filters.sectionLetter) {
    return orderedFieldQuery(
      "newLocalCurrent.section.letter",
      filters.sectionLetter,
      "section-letter"
    );
  }
  if (filters.sectionNumber) {
    return orderedFieldQuery(
      "newLocalCurrent.section.number",
      filters.sectionNumber,
      "section-number"
    );
  }


  return { query: null, label: "unfiltered" };
}

function isAbortError(error) {
  return error?.name === "AbortError";
}


function logInventoryDebug(event, details = {}) {
  console.info("[inventoryManage][load-debug]", {
    event,
    elapsedMs: Math.round(details.elapsedMs || 0),
    ...details,
  });
}

function withTimeout(promise, label, timeoutMs, onTimeout = null) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      try {
        onTimeout?.();
      } catch {
        // Timeout cleanup must not replace the original timeout error.
      }
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() =>
    clearTimeout(timeoutId)
  );
}

async function timedFirestoreGet(label, promise, timeoutMs, startedAt) {
  logInventoryDebug(`${label}:start`, {
    elapsedMs: Date.now() - startedAt,
    timeoutMs,
  });
  const result = await withTimeout(promise, label, timeoutMs);
  logInventoryDebug(`${label}:done`, {
    elapsedMs: Date.now() - startedAt,
    docs: result?.docs?.length,
  });
  return result;
}
async function fetchUnionInventoryPage({
  queries,
  filters,
  page,
  pageSize,
}) {
  const snapshots = await Promise.all(queries.map((query) => query.get()));
  const itemById = new Map();

  snapshots.forEach((snapshot) => {
    snapshot.docs.forEach((document) => {
      const data = document.data() || {};
      if (data.visible === false || itemById.has(document.id)) return;
      const item = mapItemDocument(document);
      if (itemMatchesInventoryFilters(item, filters)) {
        itemById.set(document.id, item);
      }
    });
  });

  const matchingItems = Array.from(itemById.values()).sort((left, right) =>
    naturalCollator.compare(left.id, right.id)
  );
  const offset = Math.max(0, (page - 1) * pageSize);
  return {
    items: matchingItems.slice(offset, offset + pageSize),
    hasNextPage: offset + pageSize < matchingItems.length,
    totalMatches: matchingItems.length,
    branchCounts: snapshots.map((snapshot) => snapshot.size),
  };
}


const LOCATION_SCOPE_OPTIONS = [
  { value: "both", label: "Both" },
  { value: "current", label: "Current" },
  { value: "from", label: "From" },
];

function LocationScopeToggle({ label, value, onChange, disabled = false }) {
  return (
    <div
      className="d-flex flex-wrap gap-1 mt-2"
      role="group"
      aria-label={`${label} location search scope`}
    >
      {LOCATION_SCOPE_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={value === option.value ? "primary" : "outline-secondary"}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

function SearchableExteriorPicker({
  label,
  value,
  options,
  searchValue,
  onSearchChange,
  onChange,
  keepLabel,
  clearLabel,
  placeholder,
  disabled,
}) {
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel =
    value === KEEP_VALUE
      ? keepLabel
      : value === CLEAR_VALUE
      ? clearLabel
      : selectedOption?.label || "Not selected";
  const search = String(searchValue || "").trim().toLowerCase();
  const filteredOptions = options.filter((option) =>
    [option.label, option.value]
      .filter(Boolean)
      .some((entry) => String(entry).toLowerCase().includes(search))
  );

  return (
    <Form.Group className={styles.searchablePicker}>
      <div className={styles.pickerLabelRow}>
        <Form.Label>{label}</Form.Label>
        <span>{selectedLabel}</span>
      </div>
      <Form.Control
        value={searchValue}
        placeholder={placeholder}
        onChange={(event) => onSearchChange(event.target.value)}
        disabled={disabled}
      />
      <div className={styles.pickerList}>
        <button
          type="button"
          className={`${styles.pickerOption} ${
            value === KEEP_VALUE ? styles.pickerOptionActive : ""
          }`}
          onClick={() => onChange(KEEP_VALUE)}
          disabled={disabled}
        >
          {keepLabel}
        </button>
        <button
          type="button"
          className={`${styles.pickerOption} ${
            value === CLEAR_VALUE ? styles.pickerOptionActive : ""
          }`}
          onClick={() => onChange(CLEAR_VALUE)}
          disabled={disabled}
        >
          {clearLabel}
        </button>
        {filteredOptions.slice(0, 80).map((option) => (
          <button
            type="button"
            key={option.value}
            className={`${styles.pickerOption} ${
              value === option.value ? styles.pickerOptionActive : ""
            }`}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            title={option.label}
          >
            {option.label}
          </button>
        ))}
        {filteredOptions.length === 0 && (
          <div className={styles.pickerEmpty}>No matches found.</div>
        )}
      </div>
    </Form.Group>
  );
}

export default function InventoryManage() {
  const router = useRouter();

  const [viewMode, setViewMode] = useState("items");
  const [storageUnits, setStorageUnits] = useState([]);
  const [storageUnitsLoading, setStorageUnitsLoading] = useState(true);
  const [storageUnitError, setStorageUnitError] = useState("");
  const [storageSearch, setStorageSearch] = useState("");
  const [items, setItems] = useState([]);
  const [itemsFullyLoaded, setItemsFullyLoaded] = useState(false);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Starting inventory load...");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [pageCursors, setPageCursors] = useState([]);
  const [hasNextInventoryPage, setHasNextInventoryPage] = useState(false);
  const [pickerDataLoaded, setPickerDataLoaded] = useState(false);
  const [pickerDataLoading, setPickerDataLoading] = useState(false);
  const [directory, setDirectory] = useState({
    Region: [],
    Section: {},
    Bin: 0,
    Pallet: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    region: "",
    sectionLetter: "",
    sectionNumber: "",
    bin: "",
    binLocationScope: "both",
    pallet: "",
    palletLocationScope: "both",
    name: "",
    localSN: "",
  });
  const [palletScope, setPalletScope] = useState({
    key: "",
    options: [],
    loading: false,
  });
  const [clients, setClients] = useState([]);
  const [machines, setMachines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupLoadError, setGroupLoadError] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showExteriorLocationModal, setShowExteriorLocationModal] =
    useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupListModalType, setGroupListModalType] = useState(null);
  const [groupModalType, setGroupModalType] = useState("shipping");
  const [groupMode, setGroupMode] = useState("existing");
  const [groupSearch, setGroupSearch] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [groupListSearch, setGroupListSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [locationEditor, setLocationEditor] = useState({
    region: KEEP_VALUE,
    sectionLetter: KEEP_VALUE,
    sectionNumber: KEEP_VALUE,
    pallet: KEEP_VALUE,
    bin: KEEP_VALUE,
  });
  const [exteriorLocationEditor, setExteriorLocationEditor] = useState(
    buildExteriorEditorState()
  );
  const [exteriorSearch, setExteriorSearch] = useState({
    fromClient: "",
    fromMachine: "",
    currentClient: "",
    currentMachine: "",
  });
  const [itemPhotos, setItemPhotos] = useState({});
  const [photoViewerItem, setPhotoViewerItem] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const photoLoadGeneration = useRef(0);
  const inventoryFilterKeyRef = useRef(null);
  const initialInventoryLoadDone = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();
    const db = firebase.firestore();

    const loadDirectory = async () => {
      try {
        const directoryDoc = await timedFirestoreGet(
          "directory",
          db.collection("Warehouse").doc("directory").get(),
          AUXILIARY_LOAD_TIMEOUT_MS,
          startedAt
        );
        if (cancelled) return;
        setDirectory({
          Region: directoryDoc.data()?.Region || [],
          Section: directoryDoc.data()?.Section || {},
          Bin: directoryDoc.data()?.Bin || 0,
          Pallet: directoryDoc.data()?.Pallet || 0,
        });
      } catch (error) {
        if (!cancelled) {
          console.warn("Inventory directory could not be loaded", error);
        }
      }
    };

    const loadGroups = async () => {
      try {
        const groupSnap = await timedFirestoreGet(
          "shipping_groups",
          db.collection("shipping_groups").get(),
          AUXILIARY_LOAD_TIMEOUT_MS,
          startedAt
        );
        if (cancelled) return;
        const groupData = groupSnap.docs
          .map(normalizeGroupDocument)
          .filter((group) => GROUP_TYPES[group.type])
          .sort((left, right) => {
            const byType = naturalCollator.compare(
              GROUP_TYPES[left.type],
              GROUP_TYPES[right.type]
            );
            if (byType) return byType;
            const byDate =
              getTimestampMillis(right.updatedAt || right.createdAt) -
              getTimestampMillis(left.updatedAt || left.createdAt);
            return byDate || naturalCollator.compare(left.name, right.name);
          });
        setGroups(groupData);
        setGroupLoadError("");
      } catch (error) {
        if (!cancelled) {
          console.warn("Inventory groups could not be loaded", error);
          setGroups([]);
          setGroupLoadError("");
        }
      }
    };

    const loadStorageUnits = async () => {
      setStorageUnitsLoading(true);
      try {
        const storageSnapshot = await timedFirestoreGet(
          "storage units",
          db.collection("StorageUnits").get(),
          AUXILIARY_LOAD_TIMEOUT_MS,
          startedAt
        );
        if (cancelled) return;
        const units = storageSnapshot.docs
          .map(normalizeStorageUnitDocument)
          .filter(
            (unit) =>
              unit &&
              unit.number > 0 &&
              (unit.kind === "bin" || unit.kind === "pallet")
          )
          .sort((left, right) => naturalCollator.compare(left.code, right.code));
        setStorageUnits(units);
        setStorageUnitError("");
      } catch (error) {
        if (!cancelled) {
          console.warn("Storage units could not be loaded", error);
          setStorageUnits([]);
          setStorageUnitError(
            error?.message || "Bins and pallets could not be loaded."
          );
        }
      } finally {
        if (!cancelled) setStorageUnitsLoading(false);
      }
    };

    loadDirectory();
    loadGroups();
    loadStorageUnits();

    return () => {
      cancelled = true;
    };
  }, [loadAttempt]);


  useEffect(() => {
    const requestFilterKey = getInventoryFilterKey(filters);
    const filtersChanged = inventoryFilterKeyRef.current !== requestFilterKey;
    if (filtersChanged) {
      inventoryFilterKeyRef.current = requestFilterKey;
      setPageCursors([]);
      setHasNextInventoryPage(false);
      setSelectedIds(new Set());
      if (page !== 1) {
        setPage(1);
        return undefined;
      }
    }

    const abortController = new AbortController();
    let cancelled = false;
    const startedAt = Date.now();
    const db = firebase.firestore();

    const loadItems = async () => {
      const isInitialLoad = !initialInventoryLoadDone.current;
      setLoading(isInitialLoad);
      setSaveError("");
      setItemsFullyLoaded(true);
      setLoadingMoreItems(!isInitialLoad);
      setLoadingStatus("Loading inventory page...");
      if (isInitialLoad) {
        setItems([]);
        setItemPhotos({});
      }
      photoLoadGeneration.current += 1;

      try {
        const cursor = page > 1 ? pageCursors[page - 2] || null : null;
        const activeFilters = { ...filters };
        const hasActiveFilters = [
          "region",
          "sectionLetter",
          "sectionNumber",
          "bin",
          "pallet",
          "name",
          "localSN",
        ].some((field) => String(activeFilters[field] || "").trim());
        const queryPlan = buildInventoryQueryPlan(db, activeFilters);
        logInventoryDebug("items:query-plan", {
          page,
          queryPlan: queryPlan.label,
        });
        let nextItems = [];
        let hasNextPage = false;
        let lastDoc = null;

        if (Array.isArray(queryPlan.queries) && queryPlan.queries.length > 1) {
          const unionResult = await withTimeout(
            fetchUnionInventoryPage({
              queries: queryPlan.queries,
              filters: activeFilters,
              page,
              pageSize: PAGE_SIZE,
            }),
            `inventory ${queryPlan.label} page ${page}`,
            INVENTORY_PAGE_TIMEOUT_MS,
            () => abortController.abort()
          );
          if (cancelled || abortController.signal.aborted) return;
          nextItems = unionResult.items;
          hasNextPage = unionResult.hasNextPage;
          setPageCursors([]);
          logInventoryDebug("items:union-done", {
            elapsedMs: Date.now() - startedAt,
            page,
            queryPlan: queryPlan.label,
            branchCounts: unionResult.branchCounts,
            totalMatches: unionResult.totalMatches,
          });
        } else {
          const result = await withTimeout(
            fetchPartsWithMachineDataPage({
              pageSize: PAGE_SIZE,
              startAfterDoc: cursor,
              visibleOnly: true,
              needsMachineData: false,
              queryOverride: queryPlan.query,
              queryOverrideLabel: queryPlan.label,
              allowLegacyScanFallback: false,
              signal: abortController.signal,
              filterFn: hasActiveFilters
                ? (part) =>
                    itemMatchesInventoryFilters(
                      normalizeInventoryItem(part),
                      activeFilters
                    )
                : null,
              debugLabel: `inventoryManage:p${page}`,
              onDebug: (event) =>
                logInventoryDebug(event.event || "items:page", {
                  elapsedMs: Date.now() - startedAt,
                  ...event,
                }),
            }),
            `inventory page ${page}`,
            INVENTORY_PAGE_TIMEOUT_MS,
            () => abortController.abort()
          );
          if (cancelled || abortController.signal.aborted) return;
          nextItems = (result.parts || []).map(normalizeInventoryItem);
          hasNextPage = Boolean(result.hasNextPage && result.lastDoc);
          lastDoc = result.lastDoc || null;
        }

        initialInventoryLoadDone.current = true;
        setItems(nextItems);
        setItemPhotos({});
        setHasNextInventoryPage(hasNextPage);
        if (lastDoc) {
          setPageCursors((current) => {
            const nextCursors = [...current];
            nextCursors[page - 1] = lastDoc;
            return nextCursors;
          });
        }
        setLoading(false);
        setLoadingMoreItems(false);
        setLoadingStatus(
          `Loaded ${nextItems.length} inventory item${
            nextItems.length === 1 ? "" : "s"
          } for page ${page}.`
        );
        logInventoryDebug("items:page-done", {
          elapsedMs: Date.now() - startedAt,
          page,
          returned: nextItems.length,
          hasNextPage,
        });
      } catch (error) {
        if (cancelled || isAbortError(error)) return;
        console.error("Failed to load inventory items", error);
        initialInventoryLoadDone.current = true;
        setLoading(false);
        setLoadingMoreItems(false);
        setItemsFullyLoaded(true);
        setLoadingStatus("Inventory item loading stopped.");
        setSaveError(error.message || "Inventory data could not be loaded.");
      }
    };

    logInventoryDebug("page-load:start", { elapsedMs: 0 });
    loadItems();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [loadAttempt, page, filters]);

  useEffect(() => {
    if (!router.isReady) return;
    const getParam = (key) => {
      const value = router.query[key];
      return Array.isArray(value) ? value[0] : value || "";
    };
    const getScopeParam = (key) => {
      const value = getParam(key);
      return value === "current" || value === "from" ? value : "both";
    };
    const requestedView = String(getParam("view") || "items").toLowerCase();
    setViewMode(
      ["items", "bins", "pallets"].includes(requestedView)
        ? requestedView
        : "items"
    );

    setFilters((current) => {
      const next = {
        ...current,
        region: getParam("region"),
        sectionLetter: getParam("sectionLetter"),
        sectionNumber: getParam("sectionNumber"),
        bin: getParam("bin"),
        binLocationScope: getScopeParam("binLocationScope"),
        pallet: getParam("pallet"),
        palletLocationScope: getScopeParam("palletLocationScope"),
        name: getParam("name"),
        localSN: getParam("localSN"),
      };
      return inventoryFiltersEqual(current, next) ? current : next;
    });
  }, [router.isReady, router.query]);

  const visibleStorageUnits = useMemo(
    () =>
      storageUnits.filter(
        (unit) =>
          (viewMode === "bins" ? unit.kind === "bin" : unit.kind === "pallet") &&
          storageUnitMatchesSearch(unit, storageSearch)
      ),
    [storageSearch, storageUnits, viewMode]
  );

  const regionOptions = useMemo(
    () =>
      sortNatural([
        ...(Array.isArray(directory.Region) ? directory.Region : []),
        ...items.map((item) => item.region),
      ]),
    [directory.Region, items]
  );

  const getRegionDimensions = (region) => {
    const entry = directory.Section?.[region];
    if (!Array.isArray(entry) || entry.length < 2) {
      return { columns: 0, rows: 0 };
    }
    return {
      columns: Number(entry[0]) || 0,
      rows: Number(entry[1]) || 0,
    };
  };

  const allSectionLetters = useMemo(() => {
    const configured = Object.keys(directory.Section || {}).flatMap((region) => {
      const { rows } = getRegionDimensions(region);
      return sequence(rows, (number) => String.fromCharCode(64 + number));
    });
    return sortNatural([
      ...configured,
      ...items.map((item) => item.sectionLetter),
    ]);
  }, [directory.Section, items]);

  const allSectionNumbers = useMemo(() => {
    const configured = Object.keys(directory.Section || {}).flatMap((region) => {
      const { columns } = getRegionDimensions(region);
      return sequence(columns);
    });
    return sortNatural([
      ...configured,
      ...items.map((item) => item.sectionNumber),
    ]);
  }, [directory.Section, items]);

  const palletOptions = useMemo(
    () =>
      sortNatural([
        ...sequence(directory.Pallet),
        ...items.map((item) => item.pallet),
        ...items.map((item) => item.fromPallet),
      ]),
    [directory.Pallet, items]
  );

  const binOptions = useMemo(
    () =>
      sortNatural([
        ...sequence(directory.Bin),
        ...items.map((item) => item.bin),
        ...items.map((item) => item.fromBin),
      ]),
    [directory.Bin, items]
  );

  const sectionOptionsForRegion = (region, type) => {
    if (!region || region === KEEP_VALUE || region === CLEAR_VALUE) {
      return type === "letter" ? allSectionLetters : allSectionNumbers;
    }
    const dimensions = getRegionDimensions(region);
    if (type === "letter") {
      return sequence(dimensions.rows, (number) =>
        String.fromCharCode(64 + number)
      );
    }
    return sequence(dimensions.columns);
  };

  const itemsForSelectedRegion = useMemo(
    () =>
      filters.region
        ? items.filter((item) => item.region === filters.region)
        : items,
    [filters.region, items]
  );

  const filterSectionLetters = useMemo(
    () => {
      if (!filters.region) return [];
      const { rows } = getRegionDimensions(filters.region);
      return sortNatural([
        ...sequence(rows, (number) => String.fromCharCode(64 + number)),
        ...itemsForSelectedRegion.map((item) => item.sectionLetter),
      ]);
    },
    [directory.Section, filters.region, itemsForSelectedRegion]
  );

  const itemsForSelectedSectionLetter = useMemo(
    () =>
      filters.sectionLetter
        ? itemsForSelectedRegion.filter(
            (item) => item.sectionLetter === filters.sectionLetter
          )
        : itemsForSelectedRegion,
    [filters.sectionLetter, itemsForSelectedRegion]
  );

  const filterSectionNumbers = useMemo(
    () => {
      if (!filters.region) return [];
      const { columns } = getRegionDimensions(filters.region);
      return sortNatural([
        ...sequence(columns),
        ...itemsForSelectedSectionLetter.map((item) => item.sectionNumber),
      ]);
    },
    [directory.Section, filters.region, itemsForSelectedSectionLetter]
  );

  const itemsForSelectedSection = useMemo(
    () =>
      filters.sectionNumber
        ? itemsForSelectedSectionLetter.filter(
            (item) => item.sectionNumber === filters.sectionNumber
          )
        : itemsForSelectedSectionLetter,
    [filters.sectionNumber, itemsForSelectedSectionLetter]
  );

  const palletScopeKey = [
    filters.region,
    filters.sectionLetter,
    filters.sectionNumber,
  ].join("|");

  useEffect(() => {
    let cancelled = false;

    if (!filters.region) {
      setPalletScope({ key: "", options: [], loading: false });
      return undefined;
    }

    setPalletScope({ key: palletScopeKey, options: [], loading: true });
    const db = firebase.firestore();

    withTimeout(
      db
        .collection("Test")
        .where("newLocalCurrent.region", "==", filters.region)
        .get(),
      `pallet options for region ${filters.region}`,
      AUXILIARY_LOAD_TIMEOUT_MS
    )
      .then((snapshot) => {
        if (cancelled) return;
        const scopedItems = snapshot.docs
          .filter((document) => document.data()?.visible !== false)
          .map(mapItemDocument)
          .filter(
            (item) =>
              (!filters.sectionLetter ||
                item.sectionLetter === filters.sectionLetter) &&
              (!filters.sectionNumber ||
                item.sectionNumber === filters.sectionNumber)
          );
        setPalletScope({
          key: palletScopeKey,
          options: sortNatural([
            ...scopedItems.map((item) => item.currentPallet),
            ...scopedItems.map((item) => item.fromPallet),
          ]),
          loading: false,
        });
      })
      .catch((error) => {
        console.warn("Scoped pallet options could not be loaded", error);
        if (!cancelled) {
          setPalletScope({
            key: palletScopeKey,
            options: [],
            loading: false,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    filters.region,
    filters.sectionLetter,
    filters.sectionNumber,
    palletScopeKey,
  ]);

  const palletOptionsLoading =
    Boolean(filters.region) &&
    (palletScope.key !== palletScopeKey || palletScope.loading);

  const filterPalletOptions = useMemo(() => {
    if (!filters.region) return palletOptions;
    return palletScope.key === palletScopeKey ? palletScope.options : [];
  }, [
    filters.region,
    palletOptions,
    palletScope,
    palletScopeKey,
  ]);

  const itemsForSelectedPallet = useMemo(
    () =>
      filters.pallet
        ? itemsForSelectedSection.filter(
            (item) =>
              locationValueMatches(
                item,
                filters.pallet,
                filters.palletLocationScope,
                "currentPallet",
                "fromPallet"
              )
          )
        : itemsForSelectedSection,
    [
      filters.pallet,
      filters.palletLocationScope,
      itemsForSelectedSection,
    ]
  );

  const filterBinOptions = useMemo(
    () =>
      sortNatural([
        ...sequence(directory.Bin),
        ...itemsForSelectedPallet.map((item) => item.bin),
        ...itemsForSelectedPallet.map((item) => item.fromBin),
      ]),
    [directory.Bin, itemsForSelectedPallet]
  );

  const editorHasRegion =
    Boolean(locationEditor.region) &&
    locationEditor.region !== KEEP_VALUE &&
    locationEditor.region !== CLEAR_VALUE;
  const editorSectionLetters = sectionOptionsForRegion(
    editorHasRegion ? locationEditor.region : "",
    "letter"
  );
  const editorSectionNumbers = sectionOptionsForRegion(
    editorHasRegion ? locationEditor.region : "",
    "number"
  );
  const exteriorMachineOptionsForClient = (clientId) => {
    if (!clientId || clientId === KEEP_VALUE || clientId === CLEAR_VALUE) {
      return machines;
    }
    const filteredMachines = machines.filter((machine) =>
      (machine.clientIds || []).includes(clientId)
    );
    return filteredMachines.length ? filteredMachines : machines;
  };
  const exteriorFromMachineOptions = useMemo(
    () => exteriorMachineOptionsForClient(exteriorLocationEditor.fromClient),
    [exteriorLocationEditor.fromClient, machines]
  );
  const exteriorCurrentMachineOptions = useMemo(
    () => exteriorMachineOptionsForClient(exteriorLocationEditor.currentClient),
    [exteriorLocationEditor.currentClient, machines]
  );
  const clientPickerOptions = useMemo(
    () =>
      clients.map((client) => ({
        value: client.id,
        label: client.name || client.id,
      })),
    [clients]
  );
  const fromMachinePickerOptions = useMemo(
    () =>
      exteriorFromMachineOptions.map((machine) => ({
        value: machine.id,
        label: getMachineLabel(machine),
      })),
    [exteriorFromMachineOptions]
  );
  const currentMachinePickerOptions = useMemo(
    () =>
      exteriorCurrentMachineOptions.map((machine) => ({
        value: machine.id,
        label: getMachineLabel(machine),
      })),
    [exteriorCurrentMachineOptions]
  );

  const filteredItems = useMemo(
    () => items.filter((item) => itemMatchesInventoryFilters(item, filters)),
    [filters, items]
  );

  const totalPages = Math.max(1, page + (hasNextInventoryPage ? 1 : 0));
  const displayedItems = useMemo(() => {
    return filteredItems;
  }, [filteredItems]);


  useEffect(() => {
    setFilters((current) => {
      const next = { ...current };
      let changed = false;

      if (
        next.sectionLetter &&
        !filterSectionLetters.includes(next.sectionLetter)
      ) {
        next.sectionLetter = "";
        next.sectionNumber = "";
        next.pallet = "";
        next.bin = "";
        changed = true;
      }
      if (
        next.sectionNumber &&
        !filterSectionNumbers.includes(next.sectionNumber)
      ) {
        next.sectionNumber = "";
        next.pallet = "";
        next.bin = "";
        changed = true;
      }
      if (
        !palletOptionsLoading &&
        next.pallet &&
        !filterPalletOptions.includes(next.pallet)
      ) {
        next.pallet = "";
        next.bin = "";
        changed = true;
      }
      if (next.bin && !filterBinOptions.includes(next.bin)) {
        next.bin = "";
        changed = true;
      }

      return changed ? next : current;
    });
  }, [
    filterBinOptions,
    filterPalletOptions,
    palletOptionsLoading,
    filterSectionLetters,
    filterSectionNumbers,
  ]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    const generation = ++photoLoadGeneration.current;
    const queue = displayedItems.filter(
      (item) => item.id && !photoCache.has(item.id)
    );

    displayedItems.forEach((item) => {
      if (photoCache.has(item.id)) {
        setItemPhotos((current) => ({
          ...current,
          [item.id]: photoCache.get(item.id),
        }));
      }
    });

    const worker = async () => {
      while (queue.length && photoLoadGeneration.current === generation) {
        const item = queue.shift();
        try {
          const result = await firebase
            .storage()
            .ref()
            .child(`Parts/${item.id}`)
            .listAll();
          const sortedItems = [...result.items].sort((a, b) =>
            naturalCollator.compare(a.name, b.name)
          );
          const photos = await Promise.all(
            sortedItems.map((photoRef) => photoRef.getDownloadURL())
          );
          photoCache.set(item.id, photos);
          if (photoLoadGeneration.current === generation) {
            setItemPhotos((current) => ({
              ...current,
              [item.id]: photos,
            }));
          }
        } catch (error) {
          console.warn(`Failed to load photos for item ${item.id}`, error);
          photoCache.set(item.id, []);
          if (photoLoadGeneration.current === generation) {
            setItemPhotos((current) => ({ ...current, [item.id]: [] }));
          }
        }
      }
    };

    Promise.all(
      Array.from({ length: Math.min(6, queue.length) }, () => worker())
    );
  }, [displayedItems]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.has(item.id)),
    [items, selectedIds]
  );

  const selectedExteriorLocations = useMemo(() => {
    const clientById = new Map(clients.map((client) => [client.id, client]));
    const machineById = new Map(machines.map((machine) => [machine.id, machine]));
    const summarizeSide = (side) => {
      if (!selectedItems.length) return "No items selected";
      const isFrom = side === "from";
      const locationPairs = selectedItems.map((item) => ({
        clientId: isFrom ? item.clientFromId : item.clientCurrentId,
        machineId: isFrom ? item.machineFromId : item.currentMachineId,
      }));
      const firstKey = `${locationPairs[0].clientId || ""}::${
        locationPairs[0].machineId || ""
      }`;
      const allMatch = locationPairs.every(
        (location) =>
          `${location.clientId || ""}::${location.machineId || ""}` ===
          firstKey
      );
      if (!allMatch) return "Locations are not the same";

      const { clientId, machineId } = locationPairs[0];
      const client = clientById.get(clientId);
      const machine = machineById.get(machineId);
      const values = [
        client?.name || clientId,
        machine ? getMachineLabel(machine) : machineId,
      ].filter(Boolean);
      return values.length ? values.join(" • ") : "No location set";
    };

    return {
      from: summarizeSide("from"),
      current: summarizeSide("current"),
    };
  }, [clients, machines, selectedItems]);

  const groupsByType = useMemo(() => {
    const search = groupListSearch.trim().toLowerCase();
    return Object.keys(GROUP_TYPES).reduce((acc, type) => {
      acc[type] = groups.filter((group) => {
        if (group.type !== type) return false;
        if (!search) return true;
        return [group.name, group.id]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(search));
      });
      return acc;
    }, {});
  }, [groupListSearch, groups]);

  const modalGroups = useMemo(() => {
    const search = groupSearch.trim().toLowerCase();
    return groups
      .filter((group) => group.type === groupModalType)
      .filter((group) => {
        if (!search) return true;
        return [group.name, group.id]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(search));
      });
  }, [groupModalType, groupSearch, groups]);

  const toggleSelect = (id) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const visibleIds = displayedItems.map((item) => item.id);
    setSelectedIds((current) => {
      const next = new Set(current);
      if (visibleIds.every((id) => next.has(id))) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const openLocationEditor = () => {
    if (!selectedItems.length) return;
    setSaveError("");
    setLocationEditor(buildEditorState(selectedItems));
    setShowLocationModal(true);
  };

  const ensurePickerDataLoaded = async () => {
    if (pickerDataLoaded || pickerDataLoading) return;
    setPickerDataLoading(true);
    try {
      const db = firebase.firestore();
      const [clientSnap, machineSnap] = await Promise.all([
        db.collection("Client").get(),
        db.collection("Machine").get(),
      ]);
      const clientMachineIds = new Map();
      const clientData = clientSnap.docs.map((document) => {
        const doc = document.data() || {};
        const machineIds = Array.isArray(doc.machines)
          ? doc.machines.map(getRefId).filter(Boolean)
          : [];
        machineIds.forEach((machineId) => {
          if (!clientMachineIds.has(machineId)) {
            clientMachineIds.set(machineId, new Set());
          }
          clientMachineIds.get(machineId).add(document.id);
        });
        return {
          id: document.id,
          name: doc.name || document.id,
        };
      });
      const machineData = machineSnap.docs.map((document) => {
        const doc = stripAssociatedPartsFromMachineSnapshot(
          document.data() || {}
        );
        const directClientId = getRefId(doc.client || doc.Client);
        const clientIds = new Set(clientMachineIds.get(document.id) || []);
        if (directClientId) clientIds.add(directClientId);
        return {
          id: document.id,
          ...doc,
          clientIds: Array.from(clientIds),
        };
      });
      clientData.sort((a, b) => naturalCollator.compare(a.name, b.name));
      machineData.sort((a, b) =>
        naturalCollator.compare(getMachineLabel(a), getMachineLabel(b))
      );
      setClients(clientData);
      setMachines(machineData);
      setPickerDataLoaded(true);
    } catch (error) {
      console.error("Failed to load picker data", error);
      setSaveError("Client and machine picker data could not be loaded.");
    } finally {
      setPickerDataLoading(false);
    }
  };

  const openExteriorLocationEditor = async () => {
    if (!selectedItems.length) return;
    setSaveError("");
    setExteriorLocationEditor(buildExteriorEditorState());
    setExteriorSearch({
      fromClient: "",
      fromMachine: "",
      currentClient: "",
      currentMachine: "",
    });
    setShowExteriorLocationModal(true);
    ensurePickerDataLoaded();
  };

  const openGroupEditor = (type) => {
    if (!selectedItems.length) return;
    const typeGroups = groups.filter((group) => group.type === type);
    setSaveError("");
    setGroupModalType(type);
    setGroupMode(typeGroups.length ? "existing" : "new");
    setGroupSearch("");
    setSelectedGroupId(typeGroups[0]?.id || "");
    setNewGroupName("");
    setShowGroupModal(true);
  };

  const openGroupList = (type) => {
    setGroupListSearch("");
    setGroupListModalType(type);
  };

  const closeGroupList = () => {
    setGroupListModalType(null);
    setGroupListSearch("");
  };

  const closeGroupEditor = () => {
    if (saving) return;
    setShowGroupModal(false);
    setGroupSearch("");
    setSelectedGroupId("");
    setNewGroupName("");
  };

  const updateLocationEditor = (field, value) => {
    setLocationEditor((current) => {
      const next = { ...current, [field]: value };
      if (field === "region" && value !== KEEP_VALUE) {
        next.sectionLetter = CLEAR_VALUE;
        next.sectionNumber = CLEAR_VALUE;
        next.pallet = KEEP_VALUE;
        next.bin = KEEP_VALUE;
      }
      if (
        (field === "sectionLetter" || field === "sectionNumber") &&
        value === CLEAR_VALUE
      ) {
        next.sectionLetter = CLEAR_VALUE;
        next.sectionNumber = CLEAR_VALUE;
      }
      return next;
    });
  };

  const updateExteriorLocationEditor = (field, value) => {
    setExteriorLocationEditor((current) => {
      const next = { ...current, [field]: value };
      if (field === "fromClient") {
        next.fromMachine = value === KEEP_VALUE ? KEEP_VALUE : CLEAR_VALUE;
      }
      if (field === "currentClient") {
        next.currentMachine = value === KEEP_VALUE ? KEEP_VALUE : CLEAR_VALUE;
      }
      return next;
    });
    if (field === "fromClient") {
      updateExteriorSearch("fromMachine", "");
    }
    if (field === "currentClient") {
      updateExteriorSearch("currentMachine", "");
    }
  };

  const updateExteriorSearch = (field, value) => {
    setExteriorSearch((current) => ({ ...current, [field]: value }));
  };

  const applyGroupUpdate = async () => {
    if (!selectedItems.length) return;
    setSaveError("");

    const selectedItemIds = selectedItems.map((item) => item.id).filter(Boolean);
    if (!selectedItemIds.length) {
      setSaveError("Select at least one valid item.");
      return;
    }

    const name = newGroupName.trim();
    if (groupMode === "new" && !name) {
      setSaveError("Enter a group name.");
      return;
    }
    if (groupMode === "existing" && !selectedGroupId) {
      setSaveError(`Select a ${GROUP_TYPES[groupModalType].toLowerCase()} group.`);
      return;
    }

    setSaving(true);
    try {
      const db = firebase.firestore();
      const now = firebase.firestore.FieldValue.serverTimestamp();
      let savedGroup;

      if (groupMode === "new") {
        const docRef = db.collection("shipping_groups").doc();
        const uniqueItemIds = Array.from(new Set(selectedItemIds));
        const payload = {
          name,
          type: groupModalType,
          itemIds: uniqueItemIds,
          itemCount: uniqueItemIds.length,
          createdAt: now,
          updatedAt: now,
        };
        await docRef.set(payload);
        savedGroup = {
          id: docRef.id,
          ...payload,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else {
        const docRef = db.collection("shipping_groups").doc(selectedGroupId);
        const groupDoc = await docRef.get();
        if (!groupDoc.exists) {
          throw new Error("That group no longer exists.");
        }
        const previous = normalizeGroupDocument(groupDoc);
        const mergedItemIds = Array.from(
          new Set([...(previous.itemIds || []), ...selectedItemIds])
        );
        const payload = {
          name: previous.name,
          type: previous.type,
          itemIds: mergedItemIds,
          itemCount: mergedItemIds.length,
          updatedAt: now,
        };
        await docRef.update(payload);
        savedGroup = {
          ...previous,
          ...payload,
          updatedAt: new Date().toISOString(),
        };
      }

      setGroups((current) => {
        const next = current.filter((group) => group.id !== savedGroup.id);
        next.push(savedGroup);
        return next.sort((a, b) => {
          const byType = naturalCollator.compare(
            GROUP_TYPES[a.type],
            GROUP_TYPES[b.type]
          );
          if (byType) return byType;
          const byDate =
            getTimestampMillis(b.updatedAt || b.createdAt) -
            getTimestampMillis(a.updatedAt || a.createdAt);
          return byDate || naturalCollator.compare(a.name, b.name);
        });
      });
      setSelectedIds(new Set());
      setShowGroupModal(false);
      router.push(`/NewSearch/inventory/groups/${savedGroup.id}`);
    } catch (error) {
      console.error("Failed to update inventory group", error);
      setSaveError(error.message || "The group update could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const applyLocationUpdate = async () => {
    if (!selectedItems.length) return;
    setSaveError("");
    setSaving(true);
    try {
      const updates = selectedItems.map((item) => {
        const region = resolveEditorValue(locationEditor.region, item.region);
        const sectionLetter = resolveEditorValue(
          locationEditor.sectionLetter,
          item.sectionLetter
        ).toUpperCase();
        const sectionNumber = resolveEditorValue(
          locationEditor.sectionNumber,
          item.sectionNumber
        );
        const pallet = resolveEditorValue(locationEditor.pallet, item.pallet);
        const bin = resolveEditorValue(locationEditor.bin, item.bin);

        if (Boolean(sectionLetter) !== Boolean(sectionNumber)) {
          throw new Error(
            "Section Letter and Section Number must both be selected or both cleared."
          );
        }

        if (region && sectionLetter && sectionNumber) {
          const validLetters = sectionOptionsForRegion(region, "letter");
          const validNumbers = sectionOptionsForRegion(region, "number");
          if (
            validLetters.length &&
            !validLetters.includes(sectionLetter)
          ) {
            throw new Error(
              `Section letter ${sectionLetter} is not valid for Region ${region}.`
            );
          }
          if (
            validNumbers.length &&
            !validNumbers.includes(sectionNumber)
          ) {
            throw new Error(
              `Section number ${sectionNumber} is not valid for Region ${region}.`
            );
          }
        }

        const section =
          sectionLetter && sectionNumber
            ? { letter: sectionLetter, number: storedValue(sectionNumber) }
            : null;
        const location = {
          region,
          section: section || undefined,
          bin: bin ? storedValue(bin) : "",
          pallet: pallet ? storedValue(pallet) : "",
        };
        const newLocalCurrent = {
          region,
          bin: location.bin,
          pallet: location.pallet,
        };
        if (section) newLocalCurrent.section = section;

        return {
          item,
          display: {
            region,
            sectionLetter,
            sectionNumber,
            bin,
            pallet,
            currentBin: bin,
            currentPallet: pallet,
          },
          firestore: {
            region,
            section: section || firebase.firestore.FieldValue.delete(),
            bin: location.bin,
            pallet: location.pallet,
            newLocalCurrent,
            localLocCurrent: formatLoc(location),
          },
        };
      });

      const db = firebase.firestore();
      for (let index = 0; index < updates.length; index += 400) {
        const batch = db.batch();
        updates.slice(index, index + 400).forEach((update) => {
          batch.update(db.collection("Test").doc(update.item.id), update.firestore);
        });
        await batch.commit();
      }

      const updateMap = new Map(
        updates.map((update) => [update.item.id, update.display])
      );
      setItems((current) =>
        current.map((item) =>
          updateMap.has(item.id)
            ? { ...item, ...updateMap.get(item.id) }
            : item
        )
      );
      setSelectedIds(new Set());
      setShowLocationModal(false);
    } catch (error) {
      console.error("Failed to update inventory locations", error);
      setSaveError(error.message || "The location change could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const applyExteriorLocationUpdate = async () => {
    if (!selectedItems.length) return;
    setSaveError("");

    const hasChanges = Object.values(exteriorLocationEditor).some(
      (value) => value !== KEEP_VALUE
    );
    if (!hasChanges) {
      setSaveError("Choose at least one exterior field to change.");
      return;
    }

    setSaving(true);
    try {
      const db = firebase.firestore();
      const fieldDelete = firebase.firestore.FieldValue.delete();
      const selectedDocs = await Promise.all(
        selectedItems.map((item) => db.collection("Test").doc(item.id).get())
      );
      const machineDataById = machines.reduce((map, machine) => {
        map[machine.id] = machine;
        return map;
      }, {});

      const resolveExteriorId = (editorValue, originalId) => {
        if (editorValue === KEEP_VALUE) return originalId || "";
        if (editorValue === CLEAR_VALUE) return "";
        return String(editorValue || "").trim();
      };
      const buildRefUpdate = (collection, id) =>
        id ? db.collection(collection).doc(id) : fieldDelete;

      for (const docSnap of selectedDocs) {
        if (!docSnap.exists) continue;
        const previousItemData = docSnap.data() || {};
        const previousFromMachineId = getRefId(
          previousItemData.MachineFrom || previousItemData.Machine
        );
        const previousCurrentMachineId = getRefId(
          previousItemData.MachineCurrent || previousItemData.CurrentMachine
        );
        const nextFromMachineId = resolveExteriorId(
          exteriorLocationEditor.fromMachine,
          previousFromMachineId
        );
        const nextCurrentMachineId = resolveExteriorId(
          exteriorLocationEditor.currentMachine,
          previousCurrentMachineId
        );
        const updatePayload = {};

        if (exteriorLocationEditor.fromClient !== KEEP_VALUE) {
          const nextClientId = resolveExteriorId(
            exteriorLocationEditor.fromClient,
            getRefId(previousItemData.ClientFrom) ||
              previousItemData.clientFromId
          );
          updatePayload.ClientFrom = buildRefUpdate("Client", nextClientId);
          updatePayload.clientFromId = fieldDelete;
        }
        if (exteriorLocationEditor.currentClient !== KEEP_VALUE) {
          const nextClientId = resolveExteriorId(
            exteriorLocationEditor.currentClient,
            getRefId(previousItemData.ClientCurrent) ||
              previousItemData.clientCurrentId
          );
          updatePayload.ClientCurrent = buildRefUpdate("Client", nextClientId);
          updatePayload.clientCurrentId = fieldDelete;
        }
        if (exteriorLocationEditor.fromMachine !== KEEP_VALUE) {
          updatePayload.MachineFrom = buildRefUpdate(
            "Machine",
            nextFromMachineId
          );
          updatePayload.Machine = fieldDelete;
          updatePayload.machineFromId = fieldDelete;
          updatePayload.machineId = fieldDelete;
        }
        if (exteriorLocationEditor.currentMachine !== KEEP_VALUE) {
          updatePayload.MachineCurrent = buildRefUpdate(
            "Machine",
            nextCurrentMachineId
          );
          updatePayload.CurrentMachine = fieldDelete;
          updatePayload.machineCurrentId = fieldDelete;
          updatePayload.currentMachineId = fieldDelete;
        }

        await db.collection("Test").doc(docSnap.id).update(updatePayload);
        await syncAssociatedPartsForItem({
          db,
          firebase,
          partId: docSnap.id,
          previousItemData,
          nextMachineIds: [nextFromMachineId, nextCurrentMachineId].filter(
            Boolean
          ),
          nextMachineDataById: machineDataById,
        });
      }

      setSelectedIds(new Set());
      setShowExteriorLocationModal(false);
    } catch (error) {
      console.error("Failed to update exterior inventory locations", error);
      setSaveError(
        error.message || "The exterior location change could not be saved."
      );
    } finally {
      setSaving(false);
    }
  };

  const applyExteriorLocationSwap = async () => {
    if (!selectedItems.length) return;
    setSaveError("");
    setSaving(true);

    try {
      const db = firebase.firestore();
      const fieldDelete = firebase.firestore.FieldValue.delete();
      const selectedDocs = await Promise.all(
        selectedItems.map((item) => db.collection("Test").doc(item.id).get())
      );
      const machineDataById = machines.reduce((map, machine) => {
        map[machine.id] = machine;
        return map;
      }, {});
      const buildRefUpdate = (collection, id) =>
        id ? db.collection(collection).doc(id) : fieldDelete;

      for (const docSnap of selectedDocs) {
        if (!docSnap.exists) continue;
        const previousItemData = docSnap.data() || {};
        const previousFromClientId =
          getRefId(previousItemData.ClientFrom) ||
          previousItemData.clientFromId ||
          "";
        const previousCurrentClientId =
          getRefId(previousItemData.ClientCurrent) ||
          previousItemData.clientCurrentId ||
          "";
        const previousFromMachineId = getRefId(
          previousItemData.MachineFrom || previousItemData.Machine
        );
        const previousCurrentMachineId = getRefId(
          previousItemData.MachineCurrent || previousItemData.CurrentMachine
        );
        const nextFromMachineId = previousCurrentMachineId;
        const nextCurrentMachineId = previousFromMachineId;
        const previousNewLocalFrom = previousItemData.newLocalFrom || {};
        const previousNewLocalCurrent = previousItemData.newLocalCurrent || {};
        const previousLocalLocFrom = previousItemData.localLocFrom || "";
        const previousLocalLocCurrent = previousItemData.localLocCurrent || "";

        const updatePayload = {
          ClientFrom: buildRefUpdate("Client", previousCurrentClientId),
          ClientCurrent: buildRefUpdate("Client", previousFromClientId),
          MachineFrom: buildRefUpdate("Machine", nextFromMachineId),
          MachineCurrent: buildRefUpdate("Machine", nextCurrentMachineId),
          newLocalFrom: previousNewLocalCurrent,
          newLocalCurrent: previousNewLocalFrom,
          localLocFrom: previousLocalLocCurrent,
          localLocCurrent: previousLocalLocFrom,
          clientFromId: fieldDelete,
          clientCurrentId: fieldDelete,
          Machine: fieldDelete,
          CurrentMachine: fieldDelete,
          machineFromId: fieldDelete,
          machineCurrentId: fieldDelete,
          machineId: fieldDelete,
          currentMachineId: fieldDelete,
        };

        await db.collection("Test").doc(docSnap.id).update(updatePayload);
        await syncAssociatedPartsForItem({
          db,
          firebase,
          partId: docSnap.id,
          previousItemData,
          nextMachineIds: [nextFromMachineId, nextCurrentMachineId].filter(
            Boolean
          ),
          nextMachineDataById: machineDataById,
        });
      }

      setSelectedIds(new Set());
      setShowExteriorLocationModal(false);
      setLoadAttempt((current) => current + 1);
    } catch (error) {
      console.error("Failed to swap exterior inventory locations", error);
      setSaveError(
        error.message || "The exterior locations could not be swapped."
      );
    } finally {
      setSaving(false);
    }
  };

  const openPhotoViewer = (event, item, photoIndex) => {
    event.stopPropagation();
    setPhotoViewerItem({
      ...item,
      photos: itemPhotos[item.id] || [],
    });
    setActivePhotoIndex(photoIndex);
  };

  const closePhotoViewer = () => {
    setPhotoViewerItem(null);
    setActivePhotoIndex(0);
  };

  const showPreviousPhoto = () => {
    const count = photoViewerItem?.photos?.length || 0;
    if (!count) return;
    setActivePhotoIndex((current) => (current === 0 ? count - 1 : current - 1));
  };

  const showNextPhoto = () => {
    const count = photoViewerItem?.photos?.length || 0;
    if (!count) return;
    setActivePhotoIndex((current) => (current === count - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    if (!photoViewerItem) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showPreviousPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoViewerItem]);

  const changeInventoryView = (nextView) => {
    if (!["items", "bins", "pallets"].includes(nextView)) return;
    setViewMode(nextView);
    setStorageSearch("");
  };

  const openStorageUnit = (code) => {
    router.push(
      `/NewSearch/inventory/storage/${encodeURIComponent(String(code || ""))}`
    );
  };

  const clearFilters = () => {
    setFilters({
      region: "",
      sectionLetter: "",
      sectionNumber: "",
      bin: "",
      pallet: "",
      name: "",
      binLocationScope: "both",
      localSN: "",
      palletLocationScope: "both",
    });
  };

  if (loading) {
    return (
      <LoggedIn>
        <div className={styles.loadingPage}>
          <img
            src="/magmo-logo.png"
            alt="Loading Magmo"
            className={styles.loadingLogo}
          />
          <div>{loadingStatus || "Loading inventory..."}</div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setLoadAttempt((current) => current + 1)}
          >
            Retry
          </Button>
        </div>
      </LoggedIn>
    );
  }

  return (
    <LoggedIn>
      <div className={styles.page}>
        <Container fluid="xl" className={styles.container}>
          <header className={styles.header}>
            <div>
              <div className={styles.eyebrow}>Warehouse tools</div>
              <h1 className={styles.title}>Inventory Management</h1>
              <p className={styles.subtitle}>
                Search items, bins, and pallets without losing historical
                container or warehouse-location data.
              </p>
            </div>
            <div className={styles.headerActions}>
              <Button
                variant="outline-secondary"
                onClick={() => router.push("/Warehousedb/WarehouseSelect")}
              >
                Back
              </Button>
            </div>
          </header>

          <nav className={styles.inventoryTabs} aria-label="Inventory type">
            {[
              ["items", "Items"],
              ["bins", "Bins"],
              ["pallets", "Pallets"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={`${styles.inventoryTab} ${
                  viewMode === value ? styles.inventoryTabActive : ""
                }`}
                onClick={() => changeInventoryView(value)}
                aria-current={viewMode === value ? "page" : undefined}
              >
                <span>{label}</span>
                {value !== "items" && (
                  <strong>
                    {
                      storageUnits.filter(
                        (unit) =>
                          unit.kind === (value === "bins" ? "bin" : "pallet")
                      ).length
                    }
                  </strong>
                )}
              </button>
            ))}
          </nav>

          {viewMode === "items" && saveError && !showLocationModal && (
            <Alert variant="danger">
              <div className={styles.alertRow}>
                <span>{saveError}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setLoadAttempt((current) => current + 1)}
                >
                  Retry Load
                </Button>
              </div>
            </Alert>
          )}
          {viewMode === "items" && groupLoadError && (
            <Alert variant="warning">{groupLoadError}</Alert>
          )}
          {viewMode === "items" && loadingMoreItems && (
            <Alert variant="info">{loadingStatus}</Alert>
          )}
          {viewMode === "items" &&
            !itemsFullyLoaded &&
            !loadingMoreItems &&
            items.length > 0 && (
            <Alert variant="warning">
              Inventory is only partially loaded. {loadingStatus}
            </Alert>
          )}
          {viewMode !== "items" && storageUnitError && (
            <Alert variant="danger">
              <div className={styles.alertRow}>
                <span>{storageUnitError}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setLoadAttempt((current) => current + 1)}
                >
                  Retry Load
                </Button>
              </div>
            </Alert>
          )}

          <div className={viewMode === "items" ? "" : "d-none"}>
          <section className={styles.filterCard}>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Filter inventory</h2>
                <p>Options are sorted alphabetically and numerically.</p>
              </div>
              <Button variant="link" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
            <div className={styles.filterGrid}>
              <Form.Group>
                <Form.Label>Region</Form.Label>
                <Form.Select
                  value={filters.region}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      region: value,
                      sectionLetter: "",
                      sectionNumber: "",
                      pallet: "",
                      bin: "",
                    }));
                  }}
                >
                  <option value="">All regions</option>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Section Letter</Form.Label>
                <Form.Select
                  value={filters.sectionLetter}
                  disabled={!filters.region}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      sectionLetter: value,
                      sectionNumber: "",
                      pallet: "",
                      bin: "",
                    }));
                  }}
                >
                  <option value="">
                    {filters.region ? "All letters" : "Select a region first"}
                  </option>
                  {filterSectionLetters.map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Section Number</Form.Label>
                <Form.Select
                  value={filters.sectionNumber}
                  disabled={!filters.region}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      sectionNumber: value,
                      pallet: "",
                      bin: "",
                    }));
                  }}
                >
                  <option value="">
                    {filters.region ? "All numbers" : "Select a region first"}
                  </option>
                  {filterSectionNumbers.map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Pallet</Form.Label>
                <Form.Select
                  value={filters.pallet}
                  disabled={palletOptionsLoading}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      pallet: value,
                      bin: "",
                    }));
                  }}
                >
                  <option value="">
                    {palletOptionsLoading ? "Loading pallets..." : "All pallets"}
                  </option>
                  {filterPalletOptions.map((pallet) => (
                    <option key={pallet} value={pallet}>
                      {pallet}
                    </option>
                  ))}
                </Form.Select>
                <LocationScopeToggle
                  label="Pallet"
                  value={filters.palletLocationScope}
                  disabled={palletOptionsLoading}
                  onChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      palletLocationScope: value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bin</Form.Label>
                <Form.Select
                  value={filters.bin}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      bin: value,
                    }));
                  }}
                >
                  <option value="">All bins</option>
                  {filterBinOptions.map((bin) => (
                    <option key={bin} value={bin}>
                      {bin}
                    </option>
                  ))}
                </Form.Select>
                <LocationScopeToggle
                  label="Bin"
                  value={filters.binLocationScope}
                  onChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      binLocationScope: value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  value={filters.name}
                  placeholder="Search item name"
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      name: value,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Local SN</Form.Label>
                <Form.Control
                  value={filters.localSN}
                  placeholder="Search Local SN"
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((current) => ({
                      ...current,
                      localSN: value,
                    }));
                  }}
                />
              </Form.Group>
            </div>
          </section>

          <section className={styles.groupCard}>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Shipping and receiving groups</h2>
                <p>Open a group list to view item sheets.</p>
              </div>
            </div>
            <div className={styles.groupActionRow}>
              {Object.keys(GROUP_TYPES).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant="outline-primary"
                  className={styles.groupActionButton}
                  onClick={() => openGroupList(type)}
                >
                  <span>{GROUP_TYPES[type]} Groups</span>
                  <strong>{groupsByType[type]?.length || 0}</strong>
                </Button>
              ))}
            </div>
          </section>

          <section className={styles.inventoryCard}>
            <div className={styles.inventoryToolbar}>
              <div>
                <h2>Items</h2>
                <p>
                  {showAll
                    ? `${filteredItems.length} item${
                        filteredItems.length === 1 ? "" : "s"
                      } shown`
                    : `${displayedItems.length} of ${filteredItems.length} items shown`}
                  {!itemsFullyLoaded ? " while inventory is still loading" : ""}
                </p>
              </div>
              <div className={styles.adminActions}>
                <Form.Check
                  type="checkbox"
                  label="Select all shown"
                  checked={
                    displayedItems.length > 0 &&
                    displayedItems.every((item) => selectedIds.has(item.id))
                  }
                  onChange={toggleSelectAll}
                />
                <Button
                  onClick={openLocationEditor}
                  disabled={selectedIds.size === 0}
                >
                  Change Storage / Container
                  {selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={openExteriorLocationEditor}
                  disabled={selectedIds.size === 0}
                >
                  Change Exterior Location
                  {selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => openGroupEditor("shipping")}
                  disabled={selectedIds.size === 0}
                >
                  Add to Shipping Group
                  {selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => openGroupEditor("receiving")}
                  disabled={selectedIds.size === 0}
                >
                  Add to Receiving Group
                  {selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}
                </Button>
              </div>
            </div>

            <div className={styles.tableWrap}>
              <Table bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.selectColumn}></th>
                    <th className={styles.pictureColumn}>Pictures</th>
                    <th>Name</th>
                    <th>PN</th>
                    <th>SN</th>
                    <th>Local SN</th>
                    <th>Current Region</th>
                    <th>Current Section</th>
                    <th>Current Bin</th>
                    <th>From Bin</th>
                    <th>Current Pallet</th>
                    <th>From Pallet</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedItems.map((item) => (
                    <tr
                      key={item.id}
                      className={styles.clickableRow}
                      onClick={() =>
                        router.push(`/NewSearch/item/${item.id}`)
                      }
                    >
                      <td
                        className={styles.selectColumn}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Form.Check
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                      </td>
                      <td
                        className={styles.pictureColumn}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {itemPhotos[item.id] === undefined ? (
                          <div className={styles.photoLoading}>
                            <Spinner animation="border" size="sm" />
                            <span>Loading</span>
                          </div>
                        ) : itemPhotos[item.id].length > 0 ? (
                          <div className={styles.thumbnailList}>
                            {itemPhotos[item.id].map((photo, photoIndex) => (
                              <button
                                key={photo}
                                type="button"
                                className={styles.thumbnailButton}
                                onClick={(event) =>
                                  openPhotoViewer(event, item, photoIndex)
                                }
                                aria-label={`Open picture ${
                                  photoIndex + 1
                                } of ${itemPhotos[item.id].length} for ${
                                  item.name
                                }`}
                              >
                                <img
                                  src={photo}
                                  alt=""
                                  className={styles.thumbnail}
                                  loading="lazy"
                                />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.emptyValue}>No pictures</span>
                        )}
                      </td>
                      <td className={styles.nameCell}>{item.name || "-"}</td>
                      <td>{item.pn || "-"}</td>
                      <td>{item.sn || "-"}</td>
                      <td>{item.localSN || "-"}</td>
                      <td>{item.region || "-"}</td>
                      <td>
                        {item.sectionLetter && item.sectionNumber
                          ? `${item.sectionLetter}${item.sectionNumber}`
                          : "-"}
                      </td>
                      <td>{item.currentBin || "-"}</td>
                      <td>{item.fromBin || "-"}</td>
                      <td>{item.currentPallet || "-"}</td>
                      <td>{item.fromPallet || "-"}</td>
                    </tr>
                  ))}
                  {displayedItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={12}
                        className={styles.emptyState}
                      >
                        No items match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div className={styles.tableFooter}>
              {!showAll && totalPages > 1 && (
                <Pagination size="sm" className={styles.pagination}>
                  <Pagination.Prev
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Pagination.Prev>
                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter(
                      (pageNumber) =>
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - page) <= 1
                    )
                    .map((pageNumber, index, visiblePages) => {
                      const previous = visiblePages[index - 1];
                      return (
                        <React.Fragment key={pageNumber}>
                          {previous && pageNumber - previous > 1 && (
                            <Pagination.Ellipsis disabled />
                          )}
                          <Pagination.Item
                            active={pageNumber === page}
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </Pagination.Item>
                        </React.Fragment>
                      );
                    })}
                  <Pagination.Next
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={page === totalPages}
                  >
                    Next
                  </Pagination.Next>
                </Pagination>
              )}
              <Button
                variant="outline-primary"
                size="sm"
                className={styles.showAllButton}
                onClick={() => {
                  setLoadAttempt((current) => current + 1);
                }}
              >
                Reload Page
              </Button>
            </div>
          </section>
          </div>

          {viewMode !== "items" && (
            <>
              <section className={styles.filterCard}>
                <div className={styles.sectionHeading}>
                  <div>
                    <h2>
                      Search {viewMode === "bins" ? "bins" : "pallets"}
                    </h2>
                    <p>
                      Search by number, canonical ID, warehouse position, or
                      parent pallet.
                    </p>
                  </div>
                  <Button variant="link" onClick={() => setStorageSearch("")}>
                    Clear search
                  </Button>
                </div>
                <Form.Group className={styles.storageSearch}>
                  <Form.Label>
                    {viewMode === "bins" ? "Bin" : "Pallet"} search
                  </Form.Label>
                  <Form.Control
                    type="search"
                    value={storageSearch}
                    placeholder={
                      viewMode === "bins"
                        ? "Try 47, B47, or bin 47"
                        : "Try 65, P65, or pallet 65"
                    }
                    onChange={(event) => setStorageSearch(event.target.value)}
                    autoComplete="off"
                  />
                </Form.Group>
              </section>

              <section className={styles.inventoryCard}>
                <div className={styles.inventoryToolbar}>
                  <div>
                    <h2>{viewMode === "bins" ? "Bins" : "Pallets"}</h2>
                    <p>
                      {storageUnitsLoading
                        ? "Loading storage records..."
                        : `${visibleStorageUnits.length} ${
                            viewMode === "bins" ? "bin" : "pallet"
                          }${visibleStorageUnits.length === 1 ? "" : "s"}`}
                    </p>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setLoadAttempt((current) => current + 1)}
                    disabled={storageUnitsLoading}
                  >
                    Reload
                  </Button>
                </div>

                <div className={styles.tableWrap}>
                  <Table bordered hover responsive className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Warehouse Position</th>
                        {viewMode === "bins" && <th>Parent Pallet</th>}
                        <th>Status</th>
                        <th aria-label="Open"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleStorageUnits.map((unit) => (
                        <tr
                          key={unit.code}
                          className={styles.clickableRow}
                          onClick={() => openStorageUnit(unit.code)}
                        >
                          <td>
                            <strong className={styles.storageUnitCode}>
                              {unit.code}
                            </strong>
                          </td>
                          <td>{unit.kind === "bin" ? "Bin" : "Pallet"}</td>
                          <td>{storageUnitLocationLabel(unit)}</td>
                          {viewMode === "bins" && (
                            <td>{unit.parentPalletId || "-"}</td>
                          )}
                          <td>
                            <span
                              className={`${styles.storageStatus} ${
                                unit.reviewRequired
                                  ? styles.storageStatusReview
                                  : unit.locationStatus === "confirmed"
                                  ? styles.storageStatusConfirmed
                                  : styles.storageStatusUnknown
                              }`}
                            >
                              {unit.reviewRequired
                                ? "Review needed"
                                : unit.locationStatus === "confirmed"
                                ? "Mapped"
                                : "Location unknown"}
                            </span>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={(event) => {
                                event.stopPropagation();
                                openStorageUnit(unit.code);
                              }}
                            >
                              Open
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {!storageUnitsLoading && visibleStorageUnits.length === 0 && (
                        <tr>
                          <td
                            colSpan={viewMode === "bins" ? 6 : 5}
                            className={styles.emptyState}
                          >
                            No {viewMode === "bins" ? "bins" : "pallets"}
                            match this search.
                          </td>
                        </tr>
                      )}
                      {storageUnitsLoading && (
                        <tr>
                          <td
                            colSpan={viewMode === "bins" ? 6 : 5}
                            className={styles.emptyState}
                          >
                            <Spinner animation="border" size="sm" /> Loading...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </section>
            </>
          )}
        </Container>
      </div>

      <Modal
        show={showLocationModal}
        onHide={() => !saving && setShowLocationModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton={!saving}>
          <Modal.Title>Change Storage / Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.modalIntro}>
            Updating {selectedItems.length} selected item
            {selectedItems.length === 1 ? "" : "s"}. Region and section are
            optional warehouse coordinates. Bin and pallet remain current even
            when the item is at a client or machine.
          </p>
          {saveError && <Alert variant="danger">{saveError}</Alert>}

          <div className={styles.locationFlow}>
            <div className={styles.locationStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Region</h3>
                <p>Select a region only when the item has a warehouse position.</p>
                <Form.Select
                  value={locationEditor.region}
                  onChange={(event) =>
                    updateLocationEditor("region", event.target.value)
                  }
                  disabled={saving}
                >
                  <option value={KEEP_VALUE}>Keep current</option>
                  <option value={CLEAR_VALUE}>Clear region</option>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>
                      Region {region}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            <div className={styles.locationStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Section</h3>
                <p>
                  Select a region first. The available letter and number follow
                  that region's configured grid.
                </p>
                <div className={styles.sectionPair}>
                  <Form.Group>
                    <Form.Label>Letter</Form.Label>
                    <Form.Select
                      value={locationEditor.sectionLetter}
                      onChange={(event) =>
                        updateLocationEditor(
                          "sectionLetter",
                          event.target.value
                        )
                      }
                      disabled={saving || !editorHasRegion}
                    >
                      <option value={KEEP_VALUE}>Keep current</option>
                      <option value={CLEAR_VALUE}>Clear section</option>
                      {editorSectionLetters.map((letter) => (
                        <option key={letter} value={letter}>
                          {letter}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Number</Form.Label>
                    <Form.Select
                      value={locationEditor.sectionNumber}
                      onChange={(event) =>
                        updateLocationEditor(
                          "sectionNumber",
                          event.target.value
                        )
                      }
                      disabled={saving || !editorHasRegion}
                    >
                      <option value={KEEP_VALUE}>Keep current</option>
                      <option value={CLEAR_VALUE}>Clear section</option>
                      {editorSectionNumbers.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </div>

            <div className={styles.locationStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Pallet and Bin</h3>
                <p>
                  These are physical storage containers and can travel with the
                  item outside the warehouse.
                </p>
                <div className={styles.sectionPair}>
                  <Form.Group>
                    <Form.Label>Pallet</Form.Label>
                    <Form.Select
                      value={locationEditor.pallet}
                      onChange={(event) =>
                        updateLocationEditor("pallet", event.target.value)
                      }
                      disabled={saving}
                    >
                      <option value={KEEP_VALUE}>Keep current</option>
                      <option value={CLEAR_VALUE}>No pallet</option>
                      {palletOptions.map((pallet) => (
                        <option key={pallet} value={pallet}>
                          Pallet {pallet}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Bin</Form.Label>
                    <Form.Select
                      value={locationEditor.bin}
                      onChange={(event) =>
                        updateLocationEditor("bin", event.target.value)
                      }
                      disabled={saving}
                    >
                      <option value={KEEP_VALUE}>Keep current</option>
                      <option value={CLEAR_VALUE}>No bin</option>
                      {binOptions.map((bin) => (
                        <option key={bin} value={bin}>
                          Bin {bin}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLocationModal(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={applyLocationUpdate} disabled={saving}>
            {saving ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              "Apply Storage Change"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExteriorLocationModal}
        onHide={() => !saving && setShowExteriorLocationModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton={!saving}>
          <Modal.Title>Change Exterior Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.modalIntro}>
            Updating {selectedItems.length} selected item
            {selectedItems.length === 1 ? "" : "s"}. Set the client and
            machine refs for the From and Current sides, or leave{" "}
            <strong>Keep current</strong> selected.
          </p>
          <div className={styles.selectedExteriorSummary}>
            <div>
              <span>Selected From location</span>
              <strong>{selectedExteriorLocations.from}</strong>
            </div>
            <div>
              <span>Selected Current location</span>
              <strong>{selectedExteriorLocations.current}</strong>
            </div>
          </div>
          {saveError && <Alert variant="danger">{saveError}</Alert>}

          <div className={styles.exteriorGrid}>
            <section className={styles.exteriorPanel}>
              <h3>From</h3>
              <SearchableExteriorPicker
                label="Client From"
                value={exteriorLocationEditor.fromClient}
                options={clientPickerOptions}
                searchValue={exteriorSearch.fromClient}
                onSearchChange={(value) =>
                  updateExteriorSearch("fromClient", value)
                }
                onChange={(value) =>
                  updateExteriorLocationEditor("fromClient", value)
                }
                keepLabel="Keep current client"
                clearLabel="Clear client from"
                placeholder="Search clients"
                disabled={saving}
              />
              <SearchableExteriorPicker
                label="Machine From"
                value={exteriorLocationEditor.fromMachine}
                options={fromMachinePickerOptions}
                searchValue={exteriorSearch.fromMachine}
                onSearchChange={(value) =>
                  updateExteriorSearch("fromMachine", value)
                }
                onChange={(value) =>
                  updateExteriorLocationEditor("fromMachine", value)
                }
                keepLabel="Keep current machine"
                clearLabel="Clear machine from"
                placeholder="Search machines"
                disabled={saving}
              />
            </section>

            <section className={styles.exteriorPanel}>
              <h3>Current</h3>
              <SearchableExteriorPicker
                label="Client Current"
                value={exteriorLocationEditor.currentClient}
                options={clientPickerOptions}
                searchValue={exteriorSearch.currentClient}
                onSearchChange={(value) =>
                  updateExteriorSearch("currentClient", value)
                }
                onChange={(value) =>
                  updateExteriorLocationEditor("currentClient", value)
                }
                keepLabel="Keep current client"
                clearLabel="Clear client current"
                placeholder="Search clients"
                disabled={saving}
              />
              <SearchableExteriorPicker
                label="Machine Current"
                value={exteriorLocationEditor.currentMachine}
                options={currentMachinePickerOptions}
                searchValue={exteriorSearch.currentMachine}
                onSearchChange={(value) =>
                  updateExteriorSearch("currentMachine", value)
                }
                onChange={(value) =>
                  updateExteriorLocationEditor("currentMachine", value)
                }
                keepLabel="Keep current machine"
                clearLabel="Clear machine current"
                placeholder="Search machines"
                disabled={saving}
              />
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={applyExteriorLocationSwap}
            disabled={saving}
          >
            Swap From / Current
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowExteriorLocationModal(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={applyExteriorLocationUpdate} disabled={saving}>
            {saving ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              "Apply Exterior Change"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showGroupModal}
        onHide={closeGroupEditor}
        centered
        size="lg"
      >
        <Modal.Header closeButton={!saving}>
          <Modal.Title>
            Add to {GROUP_TYPES[groupModalType]} Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.modalIntro}>
            Adding {selectedItems.length} selected item
            {selectedItems.length === 1 ? "" : "s"} to a{" "}
            {GROUP_TYPES[groupModalType].toLowerCase()} group.
          </p>
          {saveError && <Alert variant="danger">{saveError}</Alert>}

          <div className={styles.groupModeRow}>
            <Form.Check
              type="radio"
              id="group-mode-existing"
              name="groupMode"
              label="Use existing group"
              checked={groupMode === "existing"}
              onChange={() => setGroupMode("existing")}
              disabled={saving || groups.filter((group) => group.type === groupModalType).length === 0}
            />
            <Form.Check
              type="radio"
              id="group-mode-new"
              name="groupMode"
              label="Create new group"
              checked={groupMode === "new"}
              onChange={() => setGroupMode("new")}
              disabled={saving}
            />
          </div>

          {groupMode === "existing" ? (
            <div className={styles.groupPicker}>
              <Form.Group>
                <Form.Label>Search groups</Form.Label>
                <Form.Control
                  value={groupSearch}
                  placeholder={`Search ${GROUP_TYPES[
                    groupModalType
                  ].toLowerCase()} groups`}
                  onChange={(event) => setGroupSearch(event.target.value)}
                  disabled={saving}
                />
              </Form.Group>
              <div className={styles.pickerList}>
                {modalGroups.map((group) => (
                  <button
                    type="button"
                    key={group.id}
                    className={`${styles.pickerOption} ${
                      selectedGroupId === group.id
                        ? styles.pickerOptionActive
                        : ""
                    }`}
                    onClick={() => setSelectedGroupId(group.id)}
                    disabled={saving}
                  >
                    <span>{group.name}</span>
                    <small>
                      {group.itemCount} item
                      {group.itemCount === 1 ? "" : "s"} - {group.id}
                    </small>
                  </button>
                ))}
                {modalGroups.length === 0 && (
                  <div className={styles.pickerEmpty}>No matching groups.</div>
                )}
              </div>
            </div>
          ) : (
            <Form.Group>
              <Form.Label>Group name</Form.Label>
              <Form.Control
                value={newGroupName}
                placeholder={`${GROUP_TYPES[groupModalType]} group name`}
                onChange={(event) => setNewGroupName(event.target.value)}
                disabled={saving}
                autoFocus
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeGroupEditor}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={applyGroupUpdate} disabled={saving}>
            {saving ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              `Add to ${GROUP_TYPES[groupModalType]} Group`
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={Boolean(groupListModalType)}
        onHide={closeGroupList}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {GROUP_TYPES[groupListModalType] || "Inventory"} Groups
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.groupListModalHeader}>
            <p className={styles.modalIntro}>
              Select a group to view its item sheet.
            </p>
            <Form.Control
              className={styles.groupSearch}
              value={groupListSearch}
              placeholder={`Search ${
                GROUP_TYPES[groupListModalType]?.toLowerCase() || "inventory"
              } groups`}
              onChange={(event) => setGroupListSearch(event.target.value)}
            />
          </div>
          <div className={styles.groupPanel}>
            <div className={styles.groupPanelHeader}>
              <h3>{GROUP_TYPES[groupListModalType] || "Groups"}</h3>
              <span>{groupsByType[groupListModalType]?.length || 0}</span>
            </div>
            <div className={styles.groupList}>
              {(groupsByType[groupListModalType] || []).map((group) => (
                <button
                  type="button"
                  key={group.id}
                  className={styles.groupListItem}
                  onClick={() =>
                    router.push(`/NewSearch/inventory/groups/${group.id}`)
                  }
                >
                  <span>
                    <strong>{group.name}</strong>
                    <small>{group.id}</small>
                  </span>
                  <span>
                    {group.itemCount} item{group.itemCount === 1 ? "" : "s"}
                    <small>{getGroupDateLabel(group)}</small>
                  </span>
                </button>
              ))}
              {(groupsByType[groupListModalType] || []).length === 0 && (
                <div className={styles.groupEmpty}>
                  No{" "}
                  {GROUP_TYPES[groupListModalType]?.toLowerCase() ||
                    "inventory"}{" "}
                  groups yet.
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeGroupList}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={Boolean(photoViewerItem)}
        onHide={closePhotoViewer}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {photoViewerItem?.name || "Item picture"}
            {photoViewerItem?.photos?.length > 0 &&
              ` - Picture ${activePhotoIndex + 1} of ${
                photoViewerItem.photos.length
              }`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.photoViewerBody}>
          {photoViewerItem?.photos?.[activePhotoIndex] ? (
            <img
              src={photoViewerItem.photos[activePhotoIndex]}
              alt={`${photoViewerItem.name || "Item"} picture ${
                activePhotoIndex + 1
              }`}
              className={styles.fullPhoto}
            />
          ) : (
            <div>No picture selected.</div>
          )}
          {photoViewerItem?.photos?.length > 1 && (
            <div className={styles.viewerThumbnails}>
              {photoViewerItem.photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  className={`${styles.viewerThumbnailButton} ${
                    index === activePhotoIndex
                      ? styles.viewerThumbnailSelected
                      : ""
                  }`}
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Show picture ${index + 1}`}
                >
                  <img
                    src={photo}
                    alt=""
                    className={styles.viewerThumbnail}
                  />
                </button>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={showPreviousPhoto}
            disabled={(photoViewerItem?.photos?.length || 0) <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            onClick={showNextPhoto}
            disabled={(photoViewerItem?.photos?.length || 0) <= 1}
          >
            Next
          </Button>
          <Button variant="secondary" onClick={closePhotoViewer}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </LoggedIn>
  );
}
