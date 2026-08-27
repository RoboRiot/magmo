import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Button, Form, InputGroup, Table, Alert } from "react-bootstrap";
import firebase from "../context/Firebase";
import { fetchClients } from "../utils/fetchAssociations";
import {
  fetchAssociatedPartsForMachine,
  formatPartDate,
} from "../utils/fetchAssociatedPartsForMachine";
import {
  TRAILER_LAYOUT_DOC_ID,
  TRAILER_LAYOUT_STORAGE_BACKUP_KEY as LAYOUT_STORAGE_BACKUP_KEY,
  TRAILER_LAYOUT_STORAGE_KEY as LAYOUT_STORAGE_KEY,
  TRAILER_LAYOUT_VERSION as LAYOUT_OVERRIDES_VERSION,
  TRAILER_SLOT_RECT as SLOT_RECT,
  TRAILER_YARD_BASE_SLOTS as LF_MAP_SLOTS,
  TRAILER_YARD_CANONICAL_SLOT_NUMBERS as SLOT_NUMBER_SET,
  TRAILER_YARD_PLACEHOLDER_SLOTS as LF_MAP_PLACEHOLDERS,
  buildPositionedTrailerSlots,
  cloneTrailerLayoutOverrides as cloneOverrides,
  extractTrailerNumber,
  resolveTrailerMapPlacement,
  resolveTrailerNumber,
} from "../utils/trailerYardLayout";
import {
  MONDAY_TRAILER_CONNECTION_MESSAGE,
  buildTrailerDocIdFromMondayBoardName,
  fetchMondayTrailerBoards,
  isTrailerRecordSnapshot,
  syncMondayTrailerBoardsToFirebase,
} from "../utils/mondayTrailerSync";
import {
  HELIUM_REFRESH_MS,
  attachTrailerHelium,
  loadTrailerHeliumIndex,
} from "../utils/trailerHelium";
import TrailerMapSummary from "./TrailerMapSummary";
import TrailerUsMap from "./TrailerUsMap";
import TrailerYardWarehouse from "./TrailerYardWarehouse";
import { isTrailerInTransit } from "../utils/trailerUsMap";
import {
  manualTrailerProvenance,
  normalizeTrailerProvenance,
} from "../utils/trailerProvenance";
import TrailerProvenanceBadge from "./TrailerProvenanceBadge";
import styles from "./TrailerMapModal.module.css";
const {
  clientLocation,
  resolveClientRecord,
} = require("../lib/ops/trailerClientLinks.cjs");

const RETURN_TO_MAIN_SEARCH = "/NewSearch/mainSearch?showTrailerMap=1";
const MONDAY_TRAILER_DRAG_TYPE = "application/x-ais-monday-trailer";
const ROTATE_STEP_DEGREES = 45;
const ROTATE_STEP_OPTIONS = [45, 22.5];
const TRAILER_CLIENT_ID = "AIS62854";
const SOCAL_CLIENT_ID = "AIS17182";
const NORCAL_CLIENT_ID = "AIS25097";
const SOCAL_LOCATION_NAME = "socal";
const DEFAULT_YARD_VIEW_KEY = "lakeForest";
const ONSITE_FOLDER_ID = "20099194";

const TRAILER_MAP_VIEWS = [
  {
    key: "lakeForest",
    label: "Lake Forest Yard",
    shortLabel: "Lake Forest",
    type: "yard",
    mondayFolderIds: ["20099188"],
    mondayFolderNames: ["lakeforest"],
    locationCurrentId: SOCAL_CLIENT_ID,
    locationCurrentName: "SoCalWarehouse - Lake Forest",
  },
  {
    key: "iceRink",
    label: "Lake Forest Satellite Lot 1 (Ice Rink)",
    shortLabel: "Satellite Lot 1",
    type: "yard",
    mondayFolderIds: ["20761388"],
    mondayFolderNames: ["lakeforest - ice rink lot"],
    locationCurrentId: SOCAL_CLIENT_ID,
    locationCurrentName: "Lake Forest Satellite Lot 1 (Ice Rink)",
  },
  {
    key: "lathrop",
    label: "Lathrop Yard",
    shortLabel: "Lathrop",
    type: "yard",
    mondayFolderIds: ["20364361"],
    mondayFolderNames: ["lathrop"],
    locationCurrentId: NORCAL_CLIENT_ID,
    locationCurrentName: "NorCal Warehouse - Lathrop",
  },
  {
    key: "usMap",
    label: "U.S. Map",
    shortLabel: "U.S. Map",
    type: "national",
    mondayFolderIds: [ONSITE_FOLDER_ID],
    mondayFolderNames: ["onsite"],
  },
];

const TRAILER_MAP_VIEW_BY_KEY = Object.fromEntries(
  TRAILER_MAP_VIEWS.map((view) => [view.key, view]),
);

function normalizeFolderName(value) {
  return String(value || "").trim().toLowerCase();
}

function folderMatchesView(folder, view) {
  if (!folder || !view) return false;
  const folderId = String(folder.id || folder.folderId || "").trim();
  const folderName = normalizeFolderName(folder.name || folder.folderName);
  return (
    view.mondayFolderIds.includes(folderId) ||
    view.mondayFolderNames.includes(folderName)
  );
}

function buildYardPlacementPayload(yardKey, lfOnMap, lfSlot) {
  if (yardKey === DEFAULT_YARD_VIEW_KEY) {
    return { lfOnMap, lfSlot };
  }
  return {
    yardPlacements: {
      [yardKey]: {
        onMap: lfOnMap,
        slot: lfSlot,
      },
    },
  };
}

function getYardLocationPayload(view, trailer = {}) {
  const currentName =
    String(view?.locationCurrentName || "").trim() ||
    String(trailer?.locationCurrentName || "").trim() ||
    SOCAL_LOCATION_NAME;
  const currentId =
    String(view?.locationCurrentId || "").trim() ||
    String(trailer?.locationCurrentId || "").trim() ||
    SOCAL_CLIENT_ID;
  return {
    locationCurrentId: currentId,
    locationCurrentName: currentName,
    locationCurrent: currentName,
    location: currentName,
  };
}

function getYardStorageKey(baseKey, yardKey) {
  return yardKey === DEFAULT_YARD_VIEW_KEY
    ? baseKey
    : `${baseKey}:${yardKey}`;
}

function buildSimpleYardRowSlots(trailers, overrides, yardKey) {
  const normalizedOverrides = cloneOverrides(overrides);
  const orderedTrailers = [...trailers]
    .filter((trailer) => trailer.existsInDb)
    .sort(
      (left, right) =>
        Number(left.number || Number.POSITIVE_INFINITY) -
          Number(right.number || Number.POSITIVE_INFINITY) ||
        getTrailerDisplayName(left).localeCompare(getTrailerDisplayName(right)),
    );
  const slotWidth = SLOT_RECT.w;
  // The satellite yards use a wider canvas than Lake Forest. A taller
  // percentage keeps the rendered trailer at the same rectangular aspect.
  const slotHeight = 32;
  const gap = 3;
  const totalWidth =
    orderedTrailers.length * slotWidth +
    Math.max(0, orderedTrailers.length - 1) * gap;
  const startX = Math.max(3, (100 - totalWidth) / 2);
  const usedSlots = new Set();

  const rowSlots = orderedTrailers
    .map((trailer, index) => {
      let slot = Number.isFinite(trailer.number)
        ? trailer.number
        : 20000 + index;
      while (usedSlots.has(slot)) slot += 1;
      usedSlots.add(slot);

      const identity = String(
        trailer.persistId ||
          trailer.mondayBoardId ||
          trailer.id ||
          `trailer-${index}`,
      )
        .trim()
        .replace(/[^a-z0-9_-]+/gi, "-");
      const key = `yard-${yardKey}-${identity}`;
      const override = normalizedOverrides[key] || {};
      if (override.deleted === true) return null;
      return {
        key,
        slot: Number.isFinite(override.slot) ? override.slot : slot,
        x: Number.isFinite(override.x)
          ? override.x
          : startX + index * (slotWidth + gap),
        y: Number.isFinite(override.y) ? override.y : 34,
        w: Number.isFinite(override.w) ? override.w : slotWidth,
        h: Number.isFinite(override.h) ? override.h : slotHeight,
        r: Number.isFinite(override.r) ? override.r : 0,
        custom: false,
      };
    })
    .filter(Boolean);

  return rowSlots;
}

function normalizePersistedSlot(value) {
  const slot = Number(value);
  if (!Number.isFinite(slot) || slot <= 0) return null;
  return slot;
}

function toMillis(value) {
  if (!value) return 0;
  if (typeof value?.toMillis === "function") {
    try {
      return value.toMillis();
    } catch (error) {
      return 0;
    }
  }
  if (typeof value?.seconds === "number") {
    return value.seconds * 1000;
  }
  if (value instanceof Date) {
    return value.getTime();
  }
  const parsed = Date.parse(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
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

function getUprightLabelRotation(itemRotation = 0) {
  const angle = Number(itemRotation) || 0;
  const normalized = ((angle % 360) + 360) % 360;
  return Number((-normalized).toFixed(2));
}

function getTrailerLocationFrom(trailer) {
  return String(trailer?.locationFromName || "").trim() || "-";
}

function getTrailerLocationCurrent(trailer) {
  return String(trailer?.locationCurrentName || "").trim() || SOCAL_LOCATION_NAME;
}

function getTrailerLocationNext(trailer) {
  return String(trailer?.locationNextName || "").trim() || "-";
}

function getClientLocationText(client) {
  return clientLocation(client);
}

function toDateInputValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString().slice(0, 10);
  }
  try {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  } catch (error) {
    return "";
  }
}

function getTodayDateInputValue() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function sortLocationHistory(entries = []) {
  return [...entries].sort((a, b) => {
    const aTime = new Date(a.arrivalDate || "").getTime() || 0;
    const bTime = new Date(b.arrivalDate || "").getTime() || 0;
    return bTime - aTime;
  });
}

function getTrailerDisplayNumber(trailer, fallbackSlotNumber) {
  const aisNumber =
    getAisTrailerNumber(trailer?.id) ||
    getAisTrailerNumber(trailer?.name) ||
    getAisTrailerNumber(trailer?.mondayBoardName);
  if (Number.isFinite(aisNumber)) return String(aisNumber);
  const storedAcronym = sanitizeTrailerMapAcronym(trailer?.mapAcronym);
  if (storedAcronym) return storedAcronym;
  return buildTrailerMapAcronym(getTrailerDisplayName(trailer)) || String(fallbackSlotNumber);
}

function getTrailerDisplayName(trailer) {
  return (
    String(trailer?.name || "").trim() ||
    String(trailer?.mondayBoardName || "").trim() ||
    String(trailer?.id || "").trim()
  );
}

function normalizeHoverText(value) {
  return String(value || "").trim().toLowerCase();
}

function buildTrailerHoverKey(trailer) {
  if (!trailer) return null;
  const aisNumber =
    getAisTrailerNumber(trailer.id) ||
    getAisTrailerNumber(trailer.name) ||
    getAisTrailerNumber(trailer.mondayBoardName);
  if (Number.isFinite(aisNumber)) return `number:${aisNumber}`;

  const mondayBoardId = String(trailer.mondayBoardId || "").trim();
  if (mondayBoardId) return `monday:${mondayBoardId}`;

  const displayName = normalizeHoverText(getTrailerDisplayName(trailer));
  return displayName ? `name:${displayName}` : null;
}

function buildMondayBoardHoverKey(board) {
  if (!board) return null;
  const aisNumber = getAisTrailerNumber(board.name);
  if (Number.isFinite(aisNumber)) return `number:${aisNumber}`;

  const boardId = String(board.id || "").trim();
  if (boardId) return `monday:${boardId}`;

  const boardName = normalizeHoverText(board.name);
  return boardName ? `name:${boardName}` : null;
}

function getAisTrailerNumber(value) {
  const match = String(value || "").match(/\bAIS\s*[-_]?\s*(\d+)\b/i);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function hasAisTrailerNumber(value) {
  return Number.isFinite(getAisTrailerNumber(value));
}

function sanitizeTrailerMapAcronym(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase()
    .slice(0, 8);
}

function buildTrailerMapAcronym(value) {
  const words = String(value || "")
    .trim()
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  if (!words.length) return "";
  if (words.length === 1) return sanitizeTrailerMapAcronym(words[0]).slice(0, 6);
  return sanitizeTrailerMapAcronym(words.map((word) => word[0]).join(""));
}

function promptForTrailerMapAcronym(trailerName) {
  if (typeof window === "undefined") return "";
  const displayName = String(trailerName || "").trim() || "this trailer";
  const suggested = buildTrailerMapAcronym(displayName);
  const value = window.prompt(
    `Enter a map acronym for ${displayName}. This only changes the map label.`,
    suggested
  );
  return sanitizeTrailerMapAcronym(value);
}

function normalizeTrailerDoc(docSnap, yardKey = DEFAULT_YARD_VIEW_KEY) {
  const data = docSnap.data() || {};
  const number = resolveTrailerNumber({
    id: docSnap.id,
    number: data.number,
    mondayBoardName: data.mondayBoardName,
    name: data.name,
  });
  const storedYardPlacement =
    yardKey === DEFAULT_YARD_VIEW_KEY
      ? null
      : data.yardPlacements?.[yardKey] || null;
  const yardPlacementConfigured =
    yardKey === DEFAULT_YARD_VIEW_KEY
      ? "lfOnMap" in data || "lfSlot" in data
      : Boolean(
          storedYardPlacement &&
            ("onMap" in storedYardPlacement || "slot" in storedYardPlacement),
        );
  const placement =
    yardKey === DEFAULT_YARD_VIEW_KEY
      ? resolveTrailerMapPlacement({
          lfSlot: data.lfSlot,
          lfOnMap: data.lfOnMap,
          number: yardPlacementConfigured ? number : null,
        })
      : resolveTrailerMapPlacement({
          lfSlot: storedYardPlacement?.slot,
          lfOnMap: storedYardPlacement?.onMap,
          number: null,
        });

  const locationFromId = String(data.locationFromId || "").trim();
  const locationFromName = String(
    data.locationFromName || data.locationFrom || ""
  ).trim();
  const rawCurrentId = String(data.locationCurrentId || "").trim();
  const rawCurrentName = String(
    data.locationCurrentName || data.locationCurrent || data.location || ""
  ).trim();
  const locationCurrentId = rawCurrentId;
  const locationCurrentName = rawCurrentName;
  const locationCurrentClientLocation = String(
    data.locationCurrentClientLocation || data.locationCurrentLocation || ""
  ).trim();
  const locationCurrentArrivalDate = toDateInputValue(
    data.locationCurrentArrivalDate || data.currentLocationArrivalDate
  );
  const locationCurrentDepartureDate = toDateInputValue(
    data.locationCurrentDepartureDate || data.currentLocationDepartureDate
  );
  const locationNextId = String(data.locationNextId || "").trim();
  const locationNextName = String(
    data.locationNextName || data.locationNext || ""
  ).trim();
  const locationNextClientLocation = String(
    data.locationNextClientLocation || data.locationNextLocation || ""
  ).trim();
  const locationStatus = isTrailerInTransit(data)
    ? "transit"
    : String(data.locationStatus || "").trim().toLowerCase();
  const transitDepartureDate = toDateInputValue(data.transitDepartureDate);
  const transitExpectedArrivalDate = toDateInputValue(
    data.transitExpectedArrivalDate
  );
  const contractLength = String(
    data.contractLength ||
      data.contractDuration ||
      data.duration ||
      data.siteDuration ||
      ""
  ).trim();
  const locationHistory = sortLocationHistory(
    Array.isArray(data.locationHistory)
      ? data.locationHistory.map((entry) => ({
          clientId: String(entry?.clientId || "").trim(),
          clientName: String(entry?.clientName || "").trim(),
          clientLocation: String(entry?.clientLocation || "").trim(),
          arrivalDate: toDateInputValue(entry?.arrivalDate),
          departureDate: toDateInputValue(entry?.departureDate),
          provenance: normalizeTrailerProvenance(entry?.provenance),
        }))
      : []
  );

  return {
    id: docSnap.id,
    sourceId: docSnap.id,
    persistId: docSnap.id,
    existsInDb: true,
    number,
    name: String(data.name || "").trim(),
    mapAcronym: sanitizeTrailerMapAcronym(data.mapAcronym),
    mondayBoardId: String(data.mondayBoardId || "").trim(),
    mondayBoardName: String(data.mondayBoardName || "").trim(),
    mondayFolderId: String(data.mondayFolderId || "").trim(),
    mondayFolderName: String(data.mondayFolderName || "").trim(),
    locationFromId,
    locationFromName,
    locationCurrentId,
    locationCurrentName,
    locationCurrentClientLocation,
    locationCurrentArrivalDate,
    locationCurrentDepartureDate,
    locationCurrentProvenance: normalizeTrailerProvenance(
      data.locationCurrentProvenance
    ),
    locationCurrentLatitude:
      data.locationCurrentLatitude ?? data.currentLatitude ?? data.latitude ?? null,
    locationCurrentLongitude:
      data.locationCurrentLongitude ??
      data.currentLongitude ??
      data.longitude ??
      null,
    locationNextId,
    locationNextName,
    locationNextClientLocation,
    locationStatus,
    inTransit: locationStatus === "transit",
    transitDepartureDate,
    transitExpectedArrivalDate,
    contractLength,
    locationHistory,
    model: String(data.model || "").trim(),
    vin: String(data.vin || "").trim(),
    associatedMachineId:
      String(data.associatedMachineId || "").trim() ||
      getRefId(data.associatedMachine),
    lfSlot: placement.lfSlot,
    lfOnMap: placement.lfOnMap,
    lfSlotExplicit: placement.lfSlotExplicit,
    yardPlacementConfigured,
    updatedAt: data.updatedAt || data.createdAt || null,
  };
}

function buildCanonicalTrailers(rawTrailers = []) {
  const byId = new Map();
  const byNumber = new Map();
  const sourcesByNumber = new Map();

  rawTrailers.forEach((trailer) => {
    byId.set(String(trailer.id || "").toUpperCase(), trailer);
    if (Number.isFinite(trailer.number)) {
      if (!sourcesByNumber.has(trailer.number)) sourcesByNumber.set(trailer.number, []);
      sourcesByNumber.get(trailer.number).push(trailer);
      const existing = byNumber.get(trailer.number);
      const currentIsCanonical = /^AIS\d+$/i.test(String(trailer.id || ""));
      const existingIsCanonical = /^AIS\d+$/i.test(String(existing?.id || ""));
      if (!existing || (currentIsCanonical && !existingIsCanonical)) {
        byNumber.set(trailer.number, trailer);
      }
    }
  });

  const canonicalNumbers = new Set([
    ...SLOT_NUMBER_SET,
    ...sourcesByNumber.keys(),
  ]);
  const canonical = Array.from(canonicalNumbers)
    .sort((a, b) => a - b)
    .map((slotNumber) => {
      const canonicalId = `AIS${slotNumber}`;
      const fromCanonicalId = byId.get(canonicalId.toUpperCase()) || null;
      const fromNumber = byNumber.get(slotNumber) || null;
      const source = fromCanonicalId || fromNumber || null;
      const numberSources = sourcesByNumber.get(slotNumber) || [];
      const mondaySource =
        [source, ...numberSources].find((entry) =>
          String(entry?.mondayBoardId || "").trim()
        ) || null;

      return {
        id: canonicalId,
        sourceId: source?.id || canonicalId,
        persistId: source?.persistId || source?.id || canonicalId,
        existsInDb: Boolean(source),
        number: slotNumber,
        name: source?.name || canonicalId,
        mapAcronym: source?.mapAcronym || "",
        mondayBoardId: source?.mondayBoardId || mondaySource?.mondayBoardId || "",
        mondayBoardName:
          source?.mondayBoardName || mondaySource?.mondayBoardName || "",
        mondayFolderId:
          source?.mondayFolderId || mondaySource?.mondayFolderId || "",
        mondayFolderName:
          source?.mondayFolderName || mondaySource?.mondayFolderName || "",
        locationFromId: source?.locationFromId || "",
        locationFromName: source?.locationFromName || "",
        locationCurrentId: source?.locationCurrentId || "",
        locationCurrentName: source?.locationCurrentName || "",
        locationCurrentClientLocation: source?.locationCurrentClientLocation || "",
        locationCurrentArrivalDate: source?.locationCurrentArrivalDate || "",
        locationCurrentDepartureDate: source?.locationCurrentDepartureDate || "",
        locationCurrentLatitude: source?.locationCurrentLatitude ?? null,
        locationCurrentLongitude: source?.locationCurrentLongitude ?? null,
        locationNextId: source?.locationNextId || "",
        locationNextName: source?.locationNextName || "",
        locationNextClientLocation: source?.locationNextClientLocation || "",
        locationStatus: source?.locationStatus || "",
        inTransit: source?.inTransit === true,
        transitDepartureDate: source?.transitDepartureDate || "",
        transitExpectedArrivalDate: source?.transitExpectedArrivalDate || "",
        contractLength: source?.contractLength || "",
        locationHistory: source?.locationHistory || [],
        model: source?.model || "",
        vin: source?.vin || "",
        associatedMachineId: source?.associatedMachineId || "",
        lfSlot: source ? source.lfSlot : slotNumber,
        lfOnMap: source ? source.lfOnMap : true,
        lfSlotExplicit: source ? source.lfSlotExplicit : false,
        yardPlacementConfigured: source
          ? source.yardPlacementConfigured
          : false,
        updatedAt: source?.updatedAt || null,
      };
    });

  const representedSourceIds = new Set(
    canonical
      .filter((trailer) => trailer.existsInDb)
      .map((trailer) => String(trailer.sourceId || trailer.id).toUpperCase())
  );
  const extraTrailers = rawTrailers.filter((trailer) => {
    const id = String(trailer.id || "").toUpperCase();
    if (!id || representedSourceIds.has(id)) return false;
    if (
      Number.isFinite(trailer.number) &&
      canonicalNumbers.has(trailer.number)
    ) {
      return false;
    }
    return true;
  });

  return [...canonical, ...extraTrailers];
}

export default function TrailerMapModal({ show = false, onHide = () => {} }) {
  const router = useRouter();
  const mapSurfaceRef = useRef(null);
  const positionedSlotsRef = useRef([]);
  const dragCleanupRef = useRef(null);
  const slotSwapCleanupRef = useRef(null);
  const suppressNextSlotClickRef = useRef(false);
  const mondayBoardDragRef = useRef(null);
  const mondaySyncAlertedRef = useRef(false);
  const layoutSeedAttemptedRef = useRef(false);
  const layoutLockedRef = useRef(true);
  const layoutHydratedRef = useRef(false);
  const [activeMapViewKey, setActiveMapViewKey] = useState(
    DEFAULT_YARD_VIEW_KEY,
  );
  const [trailers, setTrailers] = useState([]);
  const [heliumSystemsByTrailerId, setHeliumSystemsByTrailerId] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [showList, setShowList] = useState(false);
  const [showMondayBoards, setShowMondayBoards] = useState(false);
  const [mondayBoards, setMondayBoards] = useState([]);
  const [mondayBoardFolders, setMondayBoardFolders] = useState([]);
  const [collapsedMondayFolders, setCollapsedMondayFolders] = useState({});
  const [hoveredTrailerKey, setHoveredTrailerKey] = useState(null);
  const [activeDropSlot, setActiveDropSlot] = useState(null);
  const [isMondayBoardDragging, setIsMondayBoardDragging] = useState(false);
  const [mondayBoardsLoading, setMondayBoardsLoading] = useState(false);
  const [mondayBoardsError, setMondayBoardsError] = useState("");
  const [mondayConnectionError, setMondayConnectionError] = useState("");
  const [showAddTrailerModal, setShowAddTrailerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lfOnly, setLfOnly] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [selectedYardTrailer, setSelectedYardTrailer] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [isEditingTrailerName, setIsEditingTrailerName] = useState(false);
  const [trailerNameDraft, setTrailerNameDraft] = useState("");
  const [isSavingTrailerName, setIsSavingTrailerName] = useState(false);
  const [trailerNameError, setTrailerNameError] = useState("");
  const [trailerNameSuccess, setTrailerNameSuccess] = useState("");
  const [activeTrailerParts, setActiveTrailerParts] = useState([]);
  const [activeTrailerPartsLoading, setActiveTrailerPartsLoading] = useState(false);
  const [activeTrailerPartsError, setActiveTrailerPartsError] = useState("");
  const [activePartsDragIndex, setActivePartsDragIndex] = useState(null);
  const [activePartsDragOverIndex, setActivePartsDragOverIndex] = useState(null);
  const [locationForm, setLocationForm] = useState({
    currentClientId: "",
    currentName: "",
    currentClientLocation: "",
    nextClientId: "",
    nextName: "",
    nextClientLocation: "",
    currentArrivalDate: "",
    currentDepartureDate: "",
    transitDepartureDate: "",
    transitExpectedArrivalDate: "",
    transitArrivalDate: getTodayDateInputValue(),
    history: [],
  });
  const [currentClientSearch, setCurrentClientSearch] = useState("");
  const [nextClientSearch, setNextClientSearch] = useState("");
  const [historyClientSearches, setHistoryClientSearches] = useState({});
  const [activeClientPicker, setActiveClientPicker] = useState(null);
  const [locationSaveError, setLocationSaveError] = useState("");
  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [movingTrailer, setMovingTrailer] = useState(null);
  const [moveError, setMoveError] = useState("");
  const [isApplyingMove, setIsApplyingMove] = useState(false);
  const [newTrailerNumber, setNewTrailerNumber] = useState("");
  const [newTrailerName, setNewTrailerName] = useState("");
  const [newTrailerLocationFromId, setNewTrailerLocationFromId] = useState("");
  const [newTrailerLocationCurrentId, setNewTrailerLocationCurrentId] =
    useState(SOCAL_CLIENT_ID);
  const [newTrailerLocationNextId, setNewTrailerLocationNextId] = useState("");
  const [newTrailerModel, setNewTrailerModel] = useState("");
  const [newTrailerVin, setNewTrailerVin] = useState("");
  const [newTrailerAssociatedMachineId, setNewTrailerAssociatedMachineId] =
    useState("");
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingCreateOptions, setIsLoadingCreateOptions] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);
  const [activeTrailerMachine, setActiveTrailerMachine] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [layoutLocked, setLayoutLocked] = useState(true);
  const [savedLayoutOverrides, setSavedLayoutOverrides] = useState({});
  const [draftLayoutOverrides, setDraftLayoutOverrides] = useState({});
  const [unlockBaselineOverrides, setUnlockBaselineOverrides] = useState({});
  const [selectedLayoutKey, setSelectedLayoutKey] = useState(null);
  const [rotateStep, setRotateStep] = useState(ROTATE_STEP_DEGREES);
  const [lockedSwapDrag, setLockedSwapDrag] = useState(null);
  const [isSavingLayout, setIsSavingLayout] = useState(false);
  const activeMapView =
    TRAILER_MAP_VIEW_BY_KEY[activeMapViewKey] ||
    TRAILER_MAP_VIEW_BY_KEY[DEFAULT_YARD_VIEW_KEY];
  const activeYardView =
    activeMapView.type === "yard"
      ? activeMapView
      : TRAILER_MAP_VIEW_BY_KEY[DEFAULT_YARD_VIEW_KEY];
  const activeYardKey = activeYardView.key;

  useEffect(() => {
    layoutLockedRef.current = layoutLocked;
  }, [layoutLocked]);

  useEffect(() => {
    layoutHydratedRef.current = true;
  }, []);

  const resetNewTrailerForm = useCallback(() => {
    setNewTrailerNumber("");
    setNewTrailerName("");
    setNewTrailerLocationFromId("");
    setNewTrailerLocationCurrentId(SOCAL_CLIENT_ID);
    setNewTrailerLocationNextId("");
    setNewTrailerModel("");
    setNewTrailerVin("");
    setNewTrailerAssociatedMachineId("");
    setCreateError("");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!layoutHydratedRef.current) return;
    try {
      const storageKey = getYardStorageKey(
        LAYOUT_STORAGE_KEY,
        activeYardKey,
      );
      const backupKey = getYardStorageKey(
        LAYOUT_STORAGE_BACKUP_KEY,
        activeYardKey,
      );
      const previous = window.localStorage.getItem(storageKey);
      if (previous) {
        window.localStorage.setItem(backupKey, previous);
      }
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          layoutVersion: LAYOUT_OVERRIDES_VERSION,
          layoutOverrides: savedLayoutOverrides || {},
        })
      );
    } catch (error) {
      // ignore storage write failures
    }
  }, [activeYardKey, savedLayoutOverrides]);

  useEffect(() => {
    if (!show) return undefined;

    setIsLoading(true);
    setLoadError("");
    const unsubscribe = firebase
      .firestore()
      .collection("Trailers")
      .onSnapshot(
        (snapshot) => {
          const layoutDoc = snapshot.docs.find(
            (doc) => doc.id === TRAILER_LAYOUT_DOC_ID
          );
          const remoteData = layoutDoc?.data() || {};
          const yardLayout = remoteData.yardLayouts?.[activeYardKey] || null;
          const hasValidYardVersion =
            Number(yardLayout?.layoutVersion) === LAYOUT_OVERRIDES_VERSION;
          const hasValidRemoteVersion =
            hasValidYardVersion ||
            (activeYardKey === DEFAULT_YARD_VIEW_KEY &&
              Number(remoteData.layoutVersion) === LAYOUT_OVERRIDES_VERSION);
          const remoteOverrides = hasValidRemoteVersion
            ? cloneOverrides(
                hasValidYardVersion
                  ? yardLayout.layoutOverrides || {}
                  : remoteData.layoutOverrides || {},
              )
            : {};
          if (hasValidRemoteVersion) {
            layoutSeedAttemptedRef.current = true;
            setSavedLayoutOverrides(remoteOverrides);
            if (layoutLockedRef.current) {
              setDraftLayoutOverrides(remoteOverrides);
            }
          } else {
            setSavedLayoutOverrides({});
            if (layoutLockedRef.current) {
              setDraftLayoutOverrides({});
            }
          }

          const trailerDocs = snapshot.docs.filter(isTrailerRecordSnapshot);
          const normalized = trailerDocs.map((doc) =>
            normalizeTrailerDoc(doc, activeYardKey),
          );
          const canonical = buildCanonicalTrailers(normalized);
          setTrailers(canonical);
          setIsLoading(false);
        },
        (error) => {
          console.error("Failed to load trailers", error);
          setLoadError("Failed to load trailers.");
          setIsLoading(false);
        }
      );

    return () => unsubscribe();
  }, [activeYardKey, show]);

  useEffect(() => {
    if (!show) return undefined;
    let cancelled = false;

    const loadHelium = async () => {
      try {
        const index = await loadTrailerHeliumIndex(firebase);
        if (!cancelled) setHeliumSystemsByTrailerId(index);
      } catch (error) {
        console.error("Failed to load trailer helium telemetry", error);
      }
    };

    loadHelium();
    const timer = window.setInterval(loadHelium, HELIUM_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [show]);

  useEffect(() => {
    if (!show) {
      setShowList(false);
      setShowMondayBoards(false);
      setActiveMapViewKey(DEFAULT_YARD_VIEW_KEY);
      setMondayBoardsError("");
      setMondayConnectionError("");
      mondaySyncAlertedRef.current = false;
      setCollapsedMondayFolders({});
      setHoveredTrailerKey(null);
      mondayBoardDragRef.current = null;
      setIsMondayBoardDragging(false);
      setShowAddTrailerModal(false);
      setSearchTerm("");
      setHeliumSystemsByTrailerId({});
      setLfOnly(false);
      setActiveTrailer(null);
      setSelectedYardTrailer(null);
      setActiveSlot(null);
      setIsEditingTrailerName(false);
      setTrailerNameDraft("");
      setIsSavingTrailerName(false);
      setTrailerNameError("");
      setTrailerNameSuccess("");
      setActiveTrailerParts([]);
      setActiveTrailerPartsLoading(false);
      setActiveTrailerPartsError("");
      setActivePartsDragIndex(null);
      setActivePartsDragOverIndex(null);
      setLocationForm({
        currentClientId: "",
        currentName: "",
        currentClientLocation: "",
        nextClientId: "",
        nextName: "",
        nextClientLocation: "",
        currentArrivalDate: "",
        currentDepartureDate: "",
        transitDepartureDate: "",
        transitExpectedArrivalDate: "",
        transitArrivalDate: getTodayDateInputValue(),
        history: [],
      });
      setCurrentClientSearch("");
      setNextClientSearch("");
      setHistoryClientSearches({});
      setActiveClientPicker(null);
      setLocationSaveError("");
      setIsSavingLocation(false);
      setActionBusy(false);
      setMovingTrailer(null);
      setMoveError("");
      setCreateError("");
      setDeleteError("");
      setLayoutLocked(true);
      setSelectedLayoutKey(null);
      setRotateStep(ROTATE_STEP_DEGREES);
      setLockedSwapDrag(null);
      resetNewTrailerForm();
      if (typeof dragCleanupRef.current === "function") {
        dragCleanupRef.current();
      }
      if (typeof slotSwapCleanupRef.current === "function") {
        slotSwapCleanupRef.current();
      }
    }
  }, [resetNewTrailerForm, show]);

  useEffect(() => {
    if (!show) return undefined;

    let cancelled = false;
    const loadMondayBoards = async () => {
      setMondayBoardsLoading(true);
      setMondayBoardsError("");
      setMondayConnectionError("");
      try {
        const payload = await fetchMondayTrailerBoards(firebase);
        if (cancelled) return;
        setMondayBoards(payload.boards);
        setMondayBoardFolders(payload.folders);
        syncMondayTrailerBoardsToFirebase(firebase, payload.folders).catch(
          (error) => {
            console.error("Failed to sync Monday boards to Firebase:", error);
          }
        );
      } catch (error) {
        if (!cancelled) {
          const message = error?.message || MONDAY_TRAILER_CONNECTION_MESSAGE;
          setMondayBoardsError(message);
          setMondayConnectionError(MONDAY_TRAILER_CONNECTION_MESSAGE);
          if (
            typeof window !== "undefined" &&
            !mondaySyncAlertedRef.current
          ) {
            mondaySyncAlertedRef.current = true;
            window.alert(MONDAY_TRAILER_CONNECTION_MESSAGE);
          }
        }
      } finally {
        if (!cancelled) setMondayBoardsLoading(false);
      }
    };

    loadMondayBoards();
    return () => {
      cancelled = true;
    };
  }, [show]);

  const toggleMondayFolder = useCallback((folderId) => {
    setCollapsedMondayFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (typeof dragCleanupRef.current === "function") {
        dragCleanupRef.current();
      }
      if (typeof slotSwapCleanupRef.current === "function") {
        slotSwapCleanupRef.current();
      }
    };
  }, []);

  useEffect(() => {
    if (!showAddTrailerModal) return undefined;

    let cancelled = false;
    const loadCreateOptions = async () => {
      setIsLoadingCreateOptions(true);
      try {
        const db = firebase.firestore();
        const [clientDoc, clientsData] = await Promise.all([
          db.collection("Client").doc(TRAILER_CLIENT_ID).get(),
          fetchClients(),
        ]);

        const machineRefs = Array.isArray(clientDoc.data()?.machines)
          ? clientDoc.data().machines
          : [];
        const machineDocs = await Promise.all(
          machineRefs.map((machineRef) => resolveMachineDoc(db, machineRef))
        );
        const uniqueMachines = [];
        const seenMachineIds = new Set();
        machineDocs.forEach((machine) => {
          if (!machine?.id) return;
          if (seenMachineIds.has(machine.id)) return;
          seenMachineIds.add(machine.id);
          uniqueMachines.push(machine);
        });
        uniqueMachines.sort((a, b) => {
          const nameA = String(a.name || "").toLowerCase();
          const nameB = String(b.name || "").toLowerCase();
          if (nameA !== nameB) return nameA.localeCompare(nameB);
          return String(a.id || "").localeCompare(String(b.id || ""));
        });

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

        if (!cancelled) {
          setMachineOptions(uniqueMachines);
          setClientOptions(normalizedClients);
        }
      } catch (error) {
        console.error("Failed to load add trailer options", error);
        if (!cancelled) {
          setCreateError("Failed to load client and machine options.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCreateOptions(false);
        }
      }
    };

    loadCreateOptions();
    return () => {
      cancelled = true;
    };
  }, [showAddTrailerModal]);

  useEffect(() => {
    if (!activeTrailer) return;
    setTrailerNameDraft(getTrailerDisplayName(activeTrailer));
    setIsEditingTrailerName(false);
    setTrailerNameError("");
    setTrailerNameSuccess("");
    const history = sortLocationHistory(activeTrailer.locationHistory || []);
    setLocationForm({
      currentClientId:
        activeTrailer.currentClientId || activeTrailer.locationCurrentId || "",
      currentName: activeTrailer.locationCurrentName || "",
      currentClientLocation:
        activeTrailer.locationCurrentClientLocation || "",
      nextClientId: activeTrailer.nextClientId || activeTrailer.locationNextId || "",
      nextName: activeTrailer.locationNextName || "",
      nextClientLocation: activeTrailer.locationNextClientLocation || "",
      currentArrivalDate: activeTrailer.locationCurrentArrivalDate || "",
      currentDepartureDate: activeTrailer.locationCurrentDepartureDate || "",
      transitDepartureDate:
        activeTrailer.transitDepartureDate || getTodayDateInputValue(),
      transitExpectedArrivalDate:
        activeTrailer.transitExpectedArrivalDate || "",
      transitArrivalDate: getTodayDateInputValue(),
      history,
    });
    setCurrentClientSearch(activeTrailer.locationCurrentName || "");
    setNextClientSearch(activeTrailer.locationNextName || "");
    setHistoryClientSearches(
      history.reduce((acc, entry, index) => {
        acc[index] = entry.clientName || "";
        return acc;
      }, {})
    );
    setActiveClientPicker(null);
    setLocationSaveError("");
  }, [activeTrailer?.id]);

  useEffect(() => {
    if (!activeTrailer || clientOptions.length > 0) return undefined;

    let cancelled = false;
    const loadClientsForLocation = async () => {
      try {
        const clientsData = await fetchClients();
        if (cancelled) return;
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
        setClientOptions(normalizedClients);
      } catch (error) {
        console.error("Failed to load trailer location clients", error);
        if (!cancelled) {
          setLocationSaveError("Failed to load clients for locations.");
        }
      }
    };

    loadClientsForLocation();
    return () => {
      cancelled = true;
    };
  }, [activeTrailer, clientOptions.length]);

  useEffect(() => {
    if (!activeTrailer || !clientOptions.length) return;
    const currentClientId =
      activeTrailer.currentClientId || activeTrailer.locationCurrentId || "";
    const currentName = activeTrailer.locationCurrentName || "";
    const nextClientId =
      activeTrailer.nextClientId || activeTrailer.locationNextId || "";
    const nextName = activeTrailer.locationNextName || "";
    const current = resolveClientRecord(
      clientOptions,
      currentClientId,
      currentName
    );
    const next = resolveClientRecord(clientOptions, nextClientId, nextName);
    const history = sortLocationHistory(activeTrailer.locationHistory || []).map(
      (entry) => {
        const client = resolveClientRecord(
          clientOptions,
          entry.clientId,
          entry.clientName
        );
        return {
          ...entry,
          clientId: client?.id || entry.clientId || "",
          clientName: client?.name || entry.clientName || "",
          clientLocation:
            getClientLocationText(client) || entry.clientLocation || "",
          clientNameSnapshot:
            entry.clientNameSnapshot || entry.clientName || "",
          clientLocationSnapshot:
            entry.clientLocationSnapshot || entry.clientLocation || "",
        };
      }
    );

    setLocationForm({
      currentClientId: current?.id || currentClientId,
      currentName: current?.name || currentName,
      currentClientLocation:
        getClientLocationText(current) ||
        activeTrailer.locationCurrentClientLocation ||
        "",
      nextClientId: next?.id || nextClientId,
      nextName: next?.name || nextName,
      nextClientLocation:
        getClientLocationText(next) ||
        activeTrailer.locationNextClientLocation ||
        "",
      currentArrivalDate: activeTrailer.locationCurrentArrivalDate || "",
      currentDepartureDate: activeTrailer.locationCurrentDepartureDate || "",
      transitDepartureDate:
        activeTrailer.transitDepartureDate || getTodayDateInputValue(),
      transitExpectedArrivalDate:
        activeTrailer.transitExpectedArrivalDate || "",
      transitArrivalDate: getTodayDateInputValue(),
      history,
    });
    setCurrentClientSearch(current?.name || currentName);
    setNextClientSearch(next?.name || nextName);
    setHistoryClientSearches(
      history.reduce((acc, entry, index) => {
        acc[index] = entry.clientName || "";
        return acc;
      }, {})
    );
  }, [activeTrailer?.id, clientOptions]);

  useEffect(() => {
    const associatedMachineId = String(activeTrailer?.associatedMachineId || "").trim();
    if (!activeTrailer || !associatedMachineId) {
      setActiveTrailerMachine(null);
      setActiveTrailerParts([]);
      setActiveTrailerPartsLoading(false);
      setActiveTrailerPartsError("");
      setActivePartsDragIndex(null);
      setActivePartsDragOverIndex(null);
      return undefined;
    }

    let cancelled = false;
    const cachedMachine =
      machineOptions.find((machine) => machine.id === associatedMachineId) || null;
    if (cachedMachine) {
      setActiveTrailerMachine(cachedMachine);
    } else {
      setActiveTrailerMachine(null);
      firebase
        .firestore()
        .collection("Machine")
        .doc(associatedMachineId)
        .get()
        .then((doc) => {
          if (cancelled) return;
          setActiveTrailerMachine(doc.exists ? { id: doc.id, ...doc.data() } : null);
        })
        .catch((error) => {
          console.error("Failed to load associated machine name", error);
          if (!cancelled) setActiveTrailerMachine(null);
        });
    }

    const loadActiveTrailerParts = async () => {
      setActiveTrailerPartsLoading(true);
      setActiveTrailerPartsError("");
      setActivePartsDragIndex(null);
      setActivePartsDragOverIndex(null);
      try {
        const parts = await fetchAssociatedPartsForMachine(associatedMachineId);
        if (!cancelled) {
          setActiveTrailerParts(parts);
        }
      } catch (error) {
        console.error("Failed to load associated parts for trailer modal", error);
        if (!cancelled) {
          setActiveTrailerParts([]);
          setActiveTrailerPartsError("Failed to load associated machine items.");
        }
      } finally {
        if (!cancelled) {
          setActiveTrailerPartsLoading(false);
        }
      }
    };

    loadActiveTrailerParts();
    return () => {
      cancelled = true;
    };
  }, [activeTrailer?.associatedMachineId, activeTrailer?.id, machineOptions]);

  const activeMondayFolders = useMemo(() => {
    const folders = mondayBoardFolders.length
      ? mondayBoardFolders
      : [{ id: "boards", name: "Boards", boards: mondayBoards }];
    const matchingFolders = folders.filter((folder) =>
      folderMatchesView(folder, activeMapView)
    );
    if (activeMapView.type !== "national") return matchingFolders;

    const transitBoards = trailers
      .filter(isTrailerInTransit)
      .map((trailer) => ({
        id: String(trailer.mondayBoardId || trailer.id || "").trim(),
        name: getTrailerDisplayName(trailer),
        folderId: "transit",
        folderName: "In Transit",
      }))
      .filter((board) => board.id && board.name);
    if (!transitBoards.length) return matchingFolders;

    const transitBoardIds = new Set(transitBoards.map((board) => board.id));
    return [
      ...matchingFolders.map((folder) => ({
        ...folder,
        boards: (folder.boards || []).filter(
          (board) => !transitBoardIds.has(String(board?.id || "").trim())
        ),
      })),
      {
        id: "transit",
        name: "In Transit",
        boards: transitBoards,
      },
    ];
  }, [
    activeMapView,
    mondayBoardFolders,
    mondayBoards,
    trailers,
  ]);

  const activeYardIdentityIndex = useMemo(() => {
    const boardIds = new Set();
    const documentIds = new Set();
    const trailerNumbers = new Set();

    activeMondayFolders.forEach((folder) => {
      (folder.boards || []).forEach((board) => {
        const boardId = String(board?.id || "").trim();
        if (!boardId) return;
        boardIds.add(boardId);

        const documentId = buildTrailerDocIdFromMondayBoardName(
          board?.name,
          boardId,
        );
        if (documentId) documentIds.add(documentId.toUpperCase());

        const trailerNumber = getAisTrailerNumber(board?.name);
        if (Number.isFinite(trailerNumber)) trailerNumbers.add(trailerNumber);
      });
    });

    return { boardIds, documentIds, trailerNumbers };
  }, [activeMondayFolders]);

  const knownMondayBoardIds = useMemo(
    () =>
      new Set(
        (mondayBoardFolders.length
          ? mondayBoardFolders.flatMap((folder) => folder.boards || [])
          : mondayBoards
        )
          .map((board) => String(board.id || "").trim())
          .filter(Boolean),
      ),
    [mondayBoardFolders, mondayBoards],
  );

  const onsiteBoardIds = useMemo(() => {
    const folders = mondayBoardFolders.filter((folder) =>
      folderMatchesView(folder, TRAILER_MAP_VIEW_BY_KEY.usMap),
    );
    return new Set(
      folders.flatMap((folder) =>
        (folder.boards || []).map((board) => String(board.id || "").trim()),
      ),
    );
  }, [mondayBoardFolders]);

  const activeYardTrailers = useMemo(() => {
    if (mondayBoardsLoading || mondayBoardsError) return [];

    return attachTrailerHelium(trailers, heliumSystemsByTrailerId).filter(
      (trailer) => {
        if (!trailer.existsInDb || isTrailerInTransit(trailer)) return false;

        const boardId = String(trailer.mondayBoardId || "").trim();
        if (boardId && activeYardIdentityIndex.boardIds.has(boardId)) return true;

        const matchesDocumentId = [
          trailer.id,
          trailer.persistId,
          trailer.sourceId,
        ]
          .map((value) => String(value || "").trim().toUpperCase())
          .some((id) => id && activeYardIdentityIndex.documentIds.has(id));
        if (matchesDocumentId) return true;

        return (
          Number.isFinite(trailer.number) &&
          activeYardIdentityIndex.trailerNumbers.has(trailer.number)
        );
      },
    );
  }, [
    activeYardIdentityIndex,
    heliumSystemsByTrailerId,
    mondayBoardsError,
    mondayBoardsLoading,
    trailers,
  ]);

  const onsiteTrailers = useMemo(
    () =>
      attachTrailerHelium(trailers, heliumSystemsByTrailerId).filter((trailer) => {
        if (isTrailerInTransit(trailer)) return true;
        if (String(trailer.locationStatus || "").toLowerCase() === "onsite") {
          return true;
        }
        const boardId = String(trailer.mondayBoardId || "").trim();
        const folderId = String(trailer.mondayFolderId || "").trim();
        const folderName = normalizeFolderName(trailer.mondayFolderName);
        if (boardId && onsiteBoardIds.has(boardId)) return true;
        if (boardId && knownMondayBoardIds.has(boardId)) return false;
        return (
          folderId === ONSITE_FOLDER_ID ||
          TRAILER_MAP_VIEW_BY_KEY.usMap.mondayFolderNames.includes(folderName)
        );
      }),
    [heliumSystemsByTrailerId, knownMondayBoardIds, onsiteBoardIds, trailers],
  );

  const highlightedOnsiteTrailerId = useMemo(() => {
    if (!hoveredTrailerKey) return "";
    return (
      onsiteTrailers.find(
        (trailer) => buildTrailerHoverKey(trailer) === hoveredTrailerKey,
      )?.id || ""
    );
  }, [hoveredTrailerKey, onsiteTrailers]);

  const mapViewCounts = useMemo(() => {
    return Object.fromEntries(
      TRAILER_MAP_VIEWS.map((view) => {
        const matchingFolders = mondayBoardFolders.filter((folder) =>
          folderMatchesView(folder, view),
        );
        const matchingBoardIds = new Set(
          matchingFolders.flatMap((folder) =>
            (folder.boards || [])
              .map((board) => String(board.id || "").trim())
              .filter(Boolean),
          ),
        );
        const matchingTrailers = trailers.filter((trailer) => {
          if (view.type === "yard" && isTrailerInTransit(trailer)) return false;
          if (view.type === "national" && isTrailerInTransit(trailer)) return true;
          if (
            view.type === "national" &&
            String(trailer.locationStatus || "").toLowerCase() === "onsite"
          ) {
            return true;
          }
          const boardId = String(trailer.mondayBoardId || "").trim();
          const folderId = String(trailer.mondayFolderId || "").trim();
          const folderName = normalizeFolderName(trailer.mondayFolderName);
          return (
            (boardId && matchingBoardIds.has(boardId)) ||
            view.mondayFolderIds.includes(folderId) ||
            view.mondayFolderNames.includes(folderName)
          );
        });
        return [
          view.key,
          view.type === "national"
            ? matchingTrailers.length
            : matchingBoardIds.size || matchingTrailers.length,
        ];
      }),
    );
  }, [mondayBoardFolders, trailers]);

  const activeLayoutOverrides = layoutLocked
    ? savedLayoutOverrides
    : draftLayoutOverrides;

  const positionedSlots = useMemo(
    () =>
      activeYardKey === DEFAULT_YARD_VIEW_KEY
        ? buildPositionedTrailerSlots(activeLayoutOverrides)
        : buildSimpleYardRowSlots(
            activeYardTrailers,
            activeLayoutOverrides,
            activeYardKey,
          ),
    [activeLayoutOverrides, activeYardKey, activeYardTrailers],
  );

  const slotAssignments = useMemo(() => {
    const assignment = {};
    const usableSlots = positionedSlots
      .map((slot) => slot.slot)
      .filter((slot) => Number.isFinite(slot));
    const usableSlotSet = new Set(usableSlots);
    const ordered = [...activeYardTrailers].sort((a, b) => {
      const explicitDifference =
        Number(Boolean(b.lfSlotExplicit)) - Number(Boolean(a.lfSlotExplicit));
      return explicitDifference || toMillis(b.updatedAt) - toMillis(a.updatedAt);
    });
    ordered.forEach((trailer) => {
      if (!trailer.existsInDb) return;
      if (!trailer.lfOnMap) return;
      const slot = normalizePersistedSlot(trailer.lfSlot);
      if (slot == null) return;
      if (!usableSlotSet.has(slot)) return;
      if (!assignment[slot]) {
        assignment[slot] = trailer;
      }
    });

    return assignment;
  }, [activeYardTrailers, positionedSlots]);

  const trailerByNumber = useMemo(() => {
    const map = {};
    trailers.forEach((trailer) => {
      if (!Number.isFinite(trailer.number)) return;
      if (!map[trailer.number]) {
        map[trailer.number] = trailer;
      }
    });
    return map;
  }, [trailers]);

  const trailerByMondayBoardId = useMemo(() => {
    const map = {};
    trailers.forEach((trailer) => {
      if (trailer.mondayBoardId) map[trailer.mondayBoardId] = trailer;
    });
    return map;
  }, [trailers]);

  const listTrailers = useMemo(() => {
    const query = String(searchTerm || "").trim().toLowerCase();
    const numberQuery = query.replace(/\D+/g, "");
    return trailers.filter((trailer) => {
      if (lfOnly && !trailer.lfOnMap) return false;
      if (!query) return true;
      const idMatch = trailer.id.toLowerCase().includes(query);
      const nameMatch = getTrailerDisplayName(trailer)
        .toLowerCase()
        .includes(query);
      const numberMatch =
        numberQuery.length > 0 &&
        String(trailer.number == null ? "" : trailer.number).includes(numberQuery);
      return idMatch || nameMatch || numberMatch;
    });
  }, [lfOnly, searchTerm, trailers]);

  useEffect(() => {
    positionedSlotsRef.current = positionedSlots;
  }, [positionedSlots]);

  const selectedLayoutSlot = useMemo(() => {
    if (!selectedLayoutKey) return null;
    return positionedSlots.find((slot) => slot.key === selectedLayoutKey) || null;
  }, [positionedSlots, selectedLayoutKey]);

  const startLayoutDrag = (event, layoutKey, slot) => {
    if (layoutLocked || !show) return;
    const mapSurface = mapSurfaceRef.current;
    if (!mapSurface) return;

    setSelectedLayoutKey(layoutKey);
    event.preventDefault();
    event.stopPropagation();

    const rect = mapSurface.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const origin = draftLayoutOverrides[layoutKey] || { x: slot.x, y: slot.y, r: slot.r };
    const startClientX = event.clientX;
    const startClientY = event.clientY;

    const handleMove = (moveEvent) => {
      const dxPercent = ((moveEvent.clientX - startClientX) / rect.width) * 100;
      const dyPercent = ((moveEvent.clientY - startClientY) / rect.height) * 100;
      const nextX = Math.max(0, Math.min(100 - slot.w, origin.x + dxPercent));
      const nextY = Math.max(0, Math.min(100 - slot.h, origin.y + dyPercent));
      setDraftLayoutOverrides((prev) => {
        const current = prev[layoutKey] || {};
        return {
          ...prev,
          [layoutKey]: {
            ...current,
            slot: Number.isFinite(current.slot) ? current.slot : slot.slot,
            w: Number.isFinite(current.w) ? current.w : slot.w,
            h: Number.isFinite(current.h) ? current.h : slot.h,
            custom: current.custom === true || slot.custom === true,
            x: Number(nextX.toFixed(2)),
            y: Number(nextY.toFixed(2)),
            r: Number.isFinite(origin.r) ? origin.r : slot.r,
          },
        };
      });
    };

    const cleanup = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", cleanup);
      dragCleanupRef.current = null;
    };

    dragCleanupRef.current = cleanup;
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", cleanup);
  };

  const persistLayoutOverrides = useCallback(async (overrides, source = "manual-save") => {
    const committed = cloneOverrides(overrides);
    const yardLayoutPayload = {
      yardLayouts: {
        [activeYardKey]: {
          layoutVersion: LAYOUT_OVERRIDES_VERSION,
          layoutOverrides: committed,
        },
      },
    };
    setIsSavingLayout(true);
    try {
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(TRAILER_LAYOUT_DOC_ID)
        .set(
          {
            ...yardLayoutPayload,
            ...(activeYardKey === DEFAULT_YARD_VIEW_KEY
              ? {
                  layoutVersion: LAYOUT_OVERRIDES_VERSION,
                  layoutOverrides: committed,
                }
              : {}),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy:
              firebase.auth().currentUser?.email ||
              firebase.auth().currentUser?.uid ||
              "unknown",
            source,
          },
          { merge: true }
        );
      return committed;
    } finally {
      setIsSavingLayout(false);
    }
  }, [activeYardKey]);

  const handleMapViewChange = useCallback(
    async (nextViewKey) => {
      if (nextViewKey === activeMapViewKey) return;
      if (typeof dragCleanupRef.current === "function") {
        dragCleanupRef.current();
      }
      if (typeof slotSwapCleanupRef.current === "function") {
        slotSwapCleanupRef.current();
      }
      if (!layoutLocked) {
        const committed = cloneOverrides(draftLayoutOverrides);
        setSavedLayoutOverrides(committed);
        setLayoutLocked(true);
        persistLayoutOverrides(committed, "view-switch").catch((error) => {
          console.error("Failed to save yard layout before switching", error);
          setMoveError("The yard layout could not be saved.");
        });
      }
      setSelectedLayoutKey(null);
      setLockedSwapDrag(null);
      setActiveDropSlot(null);
      setMovingTrailer(null);
      setActiveTrailer(null);
      setSelectedYardTrailer(null);
      setActiveSlot(null);
      setShowMondayBoards(false);
      setMoveError("");
      setActiveMapViewKey(nextViewKey);
    },
    [
      activeMapViewKey,
      draftLayoutOverrides,
      layoutLocked,
      persistLayoutOverrides,
    ],
  );

  const handleLayoutLockToggle = (event) => {
    const unlock = Boolean(event?.target?.checked);
    if (unlock) {
      const snapshot = cloneOverrides(savedLayoutOverrides);
      setUnlockBaselineOverrides(snapshot);
      setDraftLayoutOverrides(snapshot);
      setSelectedLayoutKey(null);
      setLayoutLocked(false);
      return;
    }

    if (typeof dragCleanupRef.current === "function") {
      dragCleanupRef.current();
    }
    const committed = cloneOverrides(draftLayoutOverrides);
    setSavedLayoutOverrides(committed);
    setLayoutLocked(true);
    setSelectedLayoutKey(null);
    persistLayoutOverrides(committed, "lock-toggle").catch((error) => {
      console.error("Failed to save global trailer layout", error);
      setMoveError("Layout save failed. Please lock again to retry.");
    });
  };

  const handleLayoutReset = () => {
    if (layoutLocked) return;
    setDraftLayoutOverrides(cloneOverrides(unlockBaselineOverrides));
  };

  const rotateSelectedLayoutItem = (deltaDegrees) => {
    if (layoutLocked) return;
    if (!selectedLayoutKey) return;
    setDraftLayoutOverrides((prev) => {
      const next = { ...prev };
      const baseSlot =
        selectedLayoutSlot ||
        LF_MAP_SLOTS.find((slot) => slot.key === selectedLayoutKey) ||
        LF_MAP_PLACEHOLDERS.find((slot) => slot.key === selectedLayoutKey);
      if (!baseSlot) return next;
      const key = selectedLayoutKey;
      const current = next[key] || {};
      next[key] = {
        ...current,
        x: Number.isFinite(current.x) ? current.x : baseSlot.x,
        y: Number.isFinite(current.y) ? current.y : baseSlot.y,
        r: Number(
          (
            (Number.isFinite(current.r) ? current.r : baseSlot.r) + deltaDegrees
          ).toFixed(2)
        ),
      };
      return next;
    });
  };

  const clearTrailerFromSlot = useCallback(
    async (slotNumber) => {
      if (!slotNumber || isApplyingMove) return;
      const trailer = slotAssignments[slotNumber] || null;
      if (!trailer?.existsInDb) return;
      let previousTrailers = null;
      const trailerIds = new Set(
        [trailer.id, trailer.persistId, trailer.sourceId]
          .map((value) => String(value || "").trim().toUpperCase())
          .filter(Boolean)
      );

      setIsApplyingMove(true);
      setMoveError("");
      setTrailers((prev) => {
        previousTrailers = prev;
        return prev.map((entry) => {
          const entryIds = [
            entry.id,
            entry.persistId,
            entry.sourceId,
          ].map((value) => String(value || "").trim().toUpperCase());
          const isSameTrailer = entryIds.some((id) => trailerIds.has(id));
          const isSameSlot =
            normalizePersistedSlot(entry.lfSlot) === slotNumber &&
            entry.lfOnMap !== false;
          if (!isSameTrailer && !isSameSlot) return entry;
          return {
            ...entry,
            lfOnMap: false,
            lfSlot: null,
            lfSlotExplicit: true,
            yardPlacementConfigured: true,
          };
        });
      });
      setActiveTrailer((current) =>
        current && trailerIds.has(String(current.id || "").trim().toUpperCase())
          ? null
          : current
      );
      setActiveSlot((current) => (current === slotNumber ? null : current));
      try {
        await firebase
          .firestore()
          .collection("Trailers")
          .doc(trailer.persistId || trailer.id)
          .set(
            {
              ...buildYardPlacementPayload(activeYardKey, false, null),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      } catch (error) {
        console.error("Failed to clear trailer from slot", error);
        if (previousTrailers) setTrailers(previousTrailers);
        setMoveError("Could not clear trailer from slot. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
    },
    [activeYardKey, isApplyingMove, slotAssignments]
  );

  const handleClearSelectedSlotTrailer = async () => {
    if (layoutLocked || !selectedLayoutSlot) return;
    await clearTrailerFromSlot(selectedLayoutSlot.slot);
  };

  const handleDeleteSelectedSlot = async () => {
    if (layoutLocked || !selectedLayoutSlot) return;
    const slotKey = selectedLayoutSlot.key || `slot-${selectedLayoutSlot.slot}`;
    await clearTrailerFromSlot(selectedLayoutSlot.slot);
    setDraftLayoutOverrides((prev) => ({
      ...prev,
      [slotKey]: {
        ...(prev[slotKey] || {}),
        slot: selectedLayoutSlot.slot,
        x: selectedLayoutSlot.x,
        y: selectedLayoutSlot.y,
        w: selectedLayoutSlot.w,
        h: selectedLayoutSlot.h,
        r: selectedLayoutSlot.r,
        custom: Boolean(selectedLayoutSlot.custom),
        deleted: true,
      },
    }));
    setSelectedLayoutKey(null);
  };

  const handleCreateLayoutSlot = () => {
    if (layoutLocked) return;
    const usedSlots = new Set([
      ...LF_MAP_SLOTS.map((slot) => slot.slot),
      ...positionedSlots.map((slot) => slot.slot),
      ...trailers
        .map((trailer) => normalizePersistedSlot(trailer.lfSlot))
        .filter((slot) => slot != null),
    ]);
    let slotNumber = 1;
    while (usedSlots.has(slotNumber)) slotNumber += 1;

    const slotKey = `slot-custom-${slotNumber}-${Date.now()}`;
    const newSlot = {
      slot: slotNumber,
      x: 4,
      y: 78,
      w: SLOT_RECT.w,
      h: SLOT_RECT.h,
      r: 0,
      custom: true,
    };

    setDraftLayoutOverrides((prev) => ({
      ...prev,
      [slotKey]: newSlot,
    }));
    setSelectedLayoutKey(slotKey);
  };

  const handleLayoutItemClick = (layoutKey, slotNumber = null) => {
    if (suppressNextSlotClickRef.current) {
      suppressNextSlotClickRef.current = false;
      return;
    }
    if (!layoutLocked) {
      setSelectedLayoutKey(layoutKey);
      return;
    }
    if (slotNumber != null) {
      handleSlotClick(slotNumber);
    }
  };

  const moveLockedSlotAssignment = useCallback(
    async (sourceSlot, targetSlot) => {
      if (!layoutLocked) return;
      if (!sourceSlot || !targetSlot || sourceSlot === targetSlot) return;

      const sourceTrailer = slotAssignments[sourceSlot] || null;
      const targetTrailer = slotAssignments[targetSlot] || null;
      if (!sourceTrailer) return;

      setIsApplyingMove(true);
      setMoveError("");
      try {
        const db = firebase.firestore();
        const batch = db.batch();
        const sourceRef = db
          .collection("Trailers")
          .doc(sourceTrailer.persistId || sourceTrailer.id);

        batch.set(
          sourceRef,
          {
            ...buildYardPlacementPayload(activeYardKey, true, targetSlot),
            ...getYardLocationPayload(activeYardView, sourceTrailer),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        if (targetTrailer) {
          const targetRef = db
            .collection("Trailers")
            .doc(targetTrailer.persistId || targetTrailer.id);
          batch.set(
            targetRef,
            {
              ...buildYardPlacementPayload(activeYardKey, true, sourceSlot),
              ...getYardLocationPayload(activeYardView, targetTrailer),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        }

        await batch.commit();
      } catch (error) {
        console.error("Failed to move trailer slot", error);
        setMoveError("Could not move trailer. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
    },
    [activeYardKey, activeYardView, layoutLocked, slotAssignments]
  );

  const startLockedSlotSwapDrag = (event, slotNumber) => {
    if (!layoutLocked) return;
    if (!show || isApplyingMove || movingTrailer) return;
    const mapSurface = mapSurfaceRef.current;
    if (!mapSurface) return;
    if (!slotNumber) return;
    if (event.button !== 0 || event.isPrimary === false) return;
    const sourceTrailer = slotAssignments[slotNumber] || null;
    if (!sourceTrailer) return;

    event.preventDefault();
    event.stopPropagation();

    const pointerId = event.pointerId;
    const pointerTarget = event.currentTarget;
    if (
      Number.isFinite(pointerId) &&
      typeof pointerTarget?.setPointerCapture === "function"
    ) {
      try {
        pointerTarget.setPointerCapture(pointerId);
      } catch (error) {
        // Window-level pointer listeners still provide a safe fallback.
      }
    }

    const startX = event.clientX;
    const startY = event.clientY;
    let lastX = startX;
    let lastY = startY;
    let didDrag = false;
    const thresholdPx = 4;
    setLockedSwapDrag({
      sourceSlot: slotNumber,
      trailerId: sourceTrailer.id || `AIS${slotNumber}`,
      x: startX,
      y: startY,
      isDragging: false,
    });

    const findSlotAtClientPoint = (clientX, clientY) => {
      const rect = mapSurface.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const xPct = ((clientX - rect.left) / rect.width) * 100;
      const yPct = ((clientY - rect.top) / rect.height) * 100;
      const hit = positionedSlotsRef.current.find((slot) => {
        return (
          xPct >= slot.x &&
          xPct <= slot.x + slot.w &&
          yPct >= slot.y &&
          yPct <= slot.y + slot.h
        );
      });
      return hit?.slot || null;
    };

    const isPointOutsideMap = (clientX, clientY) => {
      const rect = mapSurface.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      return (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      );
    };

    const findNearestSlotAtClientPoint = (clientX, clientY) => {
      const rect = mapSurface.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const xPct = ((clientX - rect.left) / rect.width) * 100;
      const yPct = ((clientY - rect.top) / rect.height) * 100;

      let best = null;
      let bestDistance = Number.POSITIVE_INFINITY;
      positionedSlotsRef.current.forEach((slot) => {
        const cx = slot.x + slot.w / 2;
        const cy = slot.y + slot.h / 2;
        const distance = Math.hypot(cx - xPct, cy - yPct);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = slot.slot;
        }
      });
      return best;
    };

    const findSlotFromElement = (clientX, clientY) => {
      const element =
        typeof document !== "undefined"
          ? document.elementFromPoint(clientX, clientY)
          : null;
      const slotEl =
        element && typeof element.closest === "function"
          ? element.closest("[data-slot-number]")
          : null;
      const slotAttr = slotEl?.getAttribute?.("data-slot-number");
      const parsed = Number(slotAttr);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const onMove = (moveEvent) => {
      if (
        Number.isFinite(pointerId) &&
        Number.isFinite(moveEvent.pointerId) &&
        moveEvent.pointerId !== pointerId
      ) {
        return;
      }
      lastX = moveEvent.clientX;
      lastY = moveEvent.clientY;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const dragStarted = Math.hypot(dx, dy) >= thresholdPx;
      if (dragStarted) {
        didDrag = true;
      }
      setLockedSwapDrag((prev) => {
        if (!prev) return prev;
        const nextIsDragging = prev.isDragging || dragStarted;
        return {
          ...prev,
          x: moveEvent.clientX,
          y: moveEvent.clientY,
          isDragging: nextIsDragging,
        };
      });
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointercancel", onCancel, true);
      window.removeEventListener("blur", onWindowBlur);
      if (
        Number.isFinite(pointerId) &&
        typeof pointerTarget?.hasPointerCapture === "function" &&
        pointerTarget.hasPointerCapture(pointerId)
      ) {
        try {
          pointerTarget.releasePointerCapture(pointerId);
        } catch (error) {
          // The browser may already have released capture after pointerup.
        }
      }
      slotSwapCleanupRef.current = null;
      setLockedSwapDrag(null);
    };

    const onUp = async (upEvent) => {
      if (
        Number.isFinite(pointerId) &&
        Number.isFinite(upEvent.pointerId) &&
        upEvent.pointerId !== pointerId
      ) {
        return;
      }
      lastX = upEvent.clientX;
      lastY = upEvent.clientY;
      cleanup();
      if (!didDrag) return;
      suppressNextSlotClickRef.current = true;
      if (isPointOutsideMap(upEvent.clientX, upEvent.clientY)) {
        await clearTrailerFromSlot(slotNumber);
        return;
      }
      const targetSlot =
        findSlotFromElement(upEvent.clientX, upEvent.clientY) ||
        findSlotAtClientPoint(upEvent.clientX, upEvent.clientY) ||
        findNearestSlotAtClientPoint(upEvent.clientX, upEvent.clientY);
      if (!targetSlot || targetSlot === slotNumber) return;
      await moveLockedSlotAssignment(slotNumber, targetSlot);
    };

    const onCancel = () => {
      cleanup();
    };

    const onWindowBlur = async () => {
      const shouldClear = didDrag && isPointOutsideMap(lastX, lastY);
      cleanup();
      if (!shouldClear) return;
      suppressNextSlotClickRef.current = true;
      await clearTrailerFromSlot(slotNumber);
    };

    slotSwapCleanupRef.current = cleanup;
    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("pointercancel", onCancel, true);
    window.addEventListener("blur", onWindowBlur);
  };

  const openTrailerPage = useCallback(
    (trailerId) => {
      if (!trailerId) return;
      const returnTo = encodeURIComponent(RETURN_TO_MAIN_SEARCH);
      onHide();
      router.push(`/NewSearch/Trailers/${trailerId}?returnTo=${returnTo}`);
    },
    [onHide, router]
  );

  const openMondayTrailerModal = useCallback(
    async (board, folder) => {
      if (!board?.id) return;
      const docId = buildTrailerDocIdFromMondayBoardName(board.name, board.id);
      const boardNumber = getAisTrailerNumber(board.name);
      const existing =
        trailerByMondayBoardId[board.id] ||
        trailers.find((trailer) => trailer.id === docId) ||
        (Number.isFinite(boardNumber) ? trailerByNumber[boardNumber] : null) ||
        null;

      if (existing) {
        setActiveTrailer(existing);
        setActiveSlot(existing.lfSlot || null);
        return;
      }

      const fallbackTrailer = {
        id: docId || `monday-${board.id}`,
        sourceId: docId || `monday-${board.id}`,
        persistId: docId || `monday-${board.id}`,
        existsInDb: false,
        number: getAisTrailerNumber(board.name),
        name: board.name,
        mapAcronym: "",
        mondayBoardId: board.id,
        mondayBoardName: board.name,
        mondayFolderId: folder?.id || "",
        mondayFolderName: folder?.name || "",
        locationFromId: "",
        locationFromName: "",
        locationCurrentId: activeYardView.locationCurrentId || SOCAL_CLIENT_ID,
        locationCurrentName:
          activeYardView.locationCurrentName || SOCAL_LOCATION_NAME,
        model: "",
        vin: "",
        associatedMachineId: "",
        lfSlot: null,
        lfOnMap: false,
        updatedAt: null,
      };
      setActiveTrailer(fallbackTrailer);
      setActiveSlot(null);
    },
    [activeYardView, trailerByMondayBoardId, trailerByNumber, trailers]
  );

  const getMondayTrailerForBoard = useCallback(
    (board) => {
      if (!board?.id) return null;
      const docId = buildTrailerDocIdFromMondayBoardName(board.name, board.id);
      const boardNumber = getAisTrailerNumber(board.name);
      return (
        trailerByMondayBoardId[board.id] ||
        trailers.find((trailer) => trailer.id === docId) ||
        (Number.isFinite(boardNumber) ? trailerByNumber[boardNumber] : null) ||
        null
      );
    },
    [trailerByMondayBoardId, trailerByNumber, trailers]
  );

  const assignMondayBoardToSlot = useCallback(
    async (board, folder, slotNumber) => {
      if (!layoutLocked) return;
      if (!board?.id || !slotNumber || isApplyingMove || movingTrailer) return;

      const docId = buildTrailerDocIdFromMondayBoardName(board.name, board.id);
      if (!docId) return;

      const existing = getMondayTrailerForBoard(board);
      const sourceSlot = normalizePersistedSlot(existing?.lfSlot);
      const destinationTrailer = slotAssignments[slotNumber] || null;
      const sameTrailerAtDestination =
        destinationTrailer &&
        (destinationTrailer.id === docId ||
          destinationTrailer.persistId === docId ||
          destinationTrailer.mondayBoardId === board.id);
      const existingMapAcronym = sanitizeTrailerMapAcronym(
        (destinationTrailer && sameTrailerAtDestination
          ? destinationTrailer
          : existing
        )?.mapAcronym
      );

      if (sameTrailerAtDestination) {
        if (!hasAisTrailerNumber(board.name) && !existingMapAcronym) {
          const mapAcronym = promptForTrailerMapAcronym(board.name);
          if (!mapAcronym) return;
          const trailerIds = new Set(
            [
              destinationTrailer.id,
              destinationTrailer.persistId,
              destinationTrailer.sourceId,
              docId,
            ]
              .map((value) => String(value || "").trim().toUpperCase())
              .filter(Boolean)
          );

          setIsApplyingMove(true);
          setMoveError("");
          try {
            await firebase
              .firestore()
              .collection("Trailers")
              .doc(destinationTrailer.persistId || destinationTrailer.id || docId)
              .set(
                {
                  mapAcronym,
                  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
            setTrailers((prev) =>
              prev.map((trailer) => {
                const isMatch = [
                  trailer.id,
                  trailer.persistId,
                  trailer.sourceId,
                ]
                  .map((value) => String(value || "").trim().toUpperCase())
                  .some((id) => trailerIds.has(id));
                return isMatch ? { ...trailer, mapAcronym } : trailer;
              })
            );
            setActiveTrailer((current) => {
              const currentId = String(current?.id || "").trim().toUpperCase();
              return currentId && trailerIds.has(currentId)
                ? { ...current, mapAcronym }
                : current;
            });
          } catch (error) {
            console.error("Failed to save trailer map acronym", error);
            setMoveError("Could not save map acronym. Please try again.");
          } finally {
            setIsApplyingMove(false);
          }
        }
        return;
      }

      const needsMapAcronym =
        !hasAisTrailerNumber(board.name) && !existingMapAcronym;
      const mapAcronym = needsMapAcronym
        ? promptForTrailerMapAcronym(board.name)
        : existingMapAcronym;
      if (needsMapAcronym && !mapAcronym) return;

      let previousTrailers = null;
      setIsApplyingMove(true);
      setMoveError("");
      try {
        const db = firebase.firestore();
        const batch = db.batch();
        const movingRef = db.collection("Trailers").doc(existing?.persistId || docId);
        const movingNumber = getAisTrailerNumber(board.name);
        const movingPersistId = existing?.persistId || docId;
        const movingIds = new Set(
          [existing?.id, existing?.persistId, existing?.sourceId, docId]
            .map((value) => String(value || "").trim().toUpperCase())
            .filter(Boolean)
        );
        const destinationIds = new Set(
          destinationTrailer
            ? [
                destinationTrailer.id,
                destinationTrailer.persistId,
                destinationTrailer.sourceId,
              ]
                .map((value) => String(value || "").trim().toUpperCase())
                .filter(Boolean)
            : []
        );
        const optimisticTrailer = {
          ...(existing || {}),
          id: existing?.id || docId,
          sourceId: existing?.sourceId || docId,
          persistId: movingPersistId,
          existsInDb: true,
          number: Number.isFinite(movingNumber)
            ? movingNumber
            : existing?.number || null,
          name: existing?.name || board.name || docId,
          mapAcronym,
          mondayBoardId: board.id,
          mondayBoardName: board.name,
          mondayFolderId: folder?.id || existing?.mondayFolderId || "",
          mondayFolderName: folder?.name || existing?.mondayFolderName || "",
          ...getYardLocationPayload(activeYardView, existing || {}),
          lfOnMap: true,
          lfSlot: slotNumber,
          lfSlotExplicit: true,
        };

        setTrailers((prev) => {
          previousTrailers = prev;
          let didPlaceMovingTrailer = false;
          const next = prev.map((trailer) => {
            const trailerIds = [
              trailer.id,
              trailer.persistId,
              trailer.sourceId,
            ].map((value) => String(value || "").trim().toUpperCase());
            const isMovingTrailer =
              trailerIds.some((id) => movingIds.has(id)) ||
              (Number.isFinite(movingNumber) && trailer.number === movingNumber);
            if (isMovingTrailer) {
              didPlaceMovingTrailer = true;
              return {
                ...trailer,
                ...optimisticTrailer,
              };
            }

            const isDestinationTrailer =
              trailerIds.some((id) => destinationIds.has(id)) ||
              normalizePersistedSlot(trailer.lfSlot) === slotNumber;
            if (!isDestinationTrailer) return trailer;

            if (sourceSlot != null) {
              return {
                ...trailer,
                lfOnMap: true,
                lfSlot: sourceSlot,
                lfSlotExplicit: true,
              };
            }
            return {
              ...trailer,
              lfOnMap: false,
              lfSlot: null,
              lfSlotExplicit: true,
            };
          });
          return didPlaceMovingTrailer ? next : [...next, optimisticTrailer];
        });

        batch.set(
          movingRef,
          {
            name: existing?.name || board.name || docId,
            mapAcronym,
            number: Number.isFinite(movingNumber) ? movingNumber : existing?.number || null,
            mondayBoardId: board.id,
            mondayBoardName: board.name,
            mondayFolderId: folder?.id || existing?.mondayFolderId || "",
            mondayFolderName: folder?.name || existing?.mondayFolderName || "",
            source: existing?.source || "monday",
            ...buildYardPlacementPayload(activeYardKey, true, slotNumber),
            ...getYardLocationPayload(activeYardView, existing || {}),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        if (destinationTrailer) {
          const destinationRef = db
            .collection("Trailers")
            .doc(destinationTrailer.persistId || destinationTrailer.id);
          if (sourceSlot != null) {
            batch.set(
              destinationRef,
              {
                ...buildYardPlacementPayload(
                  activeYardKey,
                  true,
                  sourceSlot,
                ),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } else {
            batch.set(
              destinationRef,
              {
                ...buildYardPlacementPayload(activeYardKey, false, null),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          }
        }

        await batch.commit();
      } catch (error) {
        console.error("Failed to assign Monday trailer to slot", error);
        if (previousTrailers) setTrailers(previousTrailers);
        setMoveError("Could not place trailer. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
    },
    [
      activeYardKey,
      activeYardView,
      getMondayTrailerForBoard,
      isApplyingMove,
      layoutLocked,
      movingTrailer,
      slotAssignments,
    ]
  );

  const handleMondayBoardDragStart = (board, folder) => (event) => {
    if (!layoutLocked || isApplyingMove || movingTrailer) {
      event.preventDefault();
      return;
    }
    const boardHoverKey = buildMondayBoardHoverKey(board);
    const payload = {
      type: "monday-trailer-board",
      board,
      folder: folder ? { id: folder.id || "", name: folder.name || "" } : null,
    };
    mondayBoardDragRef.current = payload;
    setIsMondayBoardDragging(true);
    setHoveredTrailerKey(boardHoverKey);
    event.dataTransfer.effectAllowed = "move";
    const serializedPayload = JSON.stringify(payload);
    event.dataTransfer.setData(MONDAY_TRAILER_DRAG_TYPE, serializedPayload);
    event.dataTransfer.setData("application/json", serializedPayload);
    event.dataTransfer.setData("text/plain", serializedPayload);
  };

  const handleMondayBoardDragEnd = () => {
    setHoveredTrailerKey(null);
    setIsMondayBoardDragging(false);
    setActiveDropSlot(null);
    mondayBoardDragRef.current = null;
  };

  const readMondayBoardDragPayload = (event) => {
    if (mondayBoardDragRef.current?.board?.id) {
      return mondayBoardDragRef.current;
    }

    const dataTransfer = event?.dataTransfer;
    if (!dataTransfer) return null;
    const dataTypes = [
      MONDAY_TRAILER_DRAG_TYPE,
      "application/json",
      "text/plain",
    ];

    for (const dataType of dataTypes) {
      try {
        const raw = dataTransfer.getData(dataType);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed?.type === "monday-trailer-board" && parsed.board?.id) {
          return parsed;
        }
      } catch (error) {
        // Keep trying the other drag data formats.
      }
    }

    return null;
  };

  const findSlotAtDragPoint = (clientX, clientY) => {
    const mapSurface = mapSurfaceRef.current;
    if (!mapSurface) return null;
    const rect = mapSurface.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;
    const hit = positionedSlotsRef.current.find((slot) => {
      return (
        xPct >= slot.x &&
        xPct <= slot.x + slot.w &&
        yPct >= slot.y &&
        yPct <= slot.y + slot.h
      );
    });
    return hit?.slot || null;
  };

  const handleTrailerSlotDragOver = (slotNumber) => (event) => {
    if (!layoutLocked || isApplyingMove || movingTrailer) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    setActiveDropSlot(slotNumber);
  };

  const handleTrailerSlotDrop = (slotNumber) => async (event) => {
    if (!layoutLocked) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextSlotClickRef.current = true;
    setHoveredTrailerKey(null);
    setIsMondayBoardDragging(false);
    setActiveDropSlot(null);

    const payload = readMondayBoardDragPayload(event);
    if (payload?.type !== "monday-trailer-board" || !payload.board?.id) return;
    await assignMondayBoardToSlot(payload.board, payload.folder, slotNumber);
  };

  const handleMapDragOver = (event) => {
    if (!layoutLocked || isApplyingMove || movingTrailer) return;
    if (!mondayBoardDragRef.current?.board?.id) return;
    const targetSlot = findSlotAtDragPoint(event.clientX, event.clientY);
    if (!targetSlot) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setActiveDropSlot(targetSlot);
  };

  const handleMapDrop = async (event) => {
    if (!layoutLocked) return;
    const targetSlot = findSlotAtDragPoint(event.clientX, event.clientY);
    if (!targetSlot) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextSlotClickRef.current = true;
    setHoveredTrailerKey(null);
    setIsMondayBoardDragging(false);
    setActiveDropSlot(null);

    const payload = readMondayBoardDragPayload(event);
    if (payload?.type !== "monday-trailer-board" || !payload.board?.id) return;
    await assignMondayBoardToSlot(payload.board, payload.folder, targetSlot);
  };

  const clearMoveState = () => {
    setMovingTrailer(null);
    setMoveError("");
  };

  const closeActiveTrailerModal = () => {
    if (actionBusy) return;
    setActiveTrailer(null);
    setActiveSlot(null);
    setIsEditingTrailerName(false);
    setTrailerNameDraft("");
    setIsSavingTrailerName(false);
    setTrailerNameError("");
    setTrailerNameSuccess("");
    setActiveTrailerParts([]);
    setActiveTrailerPartsError("");
    setActiveTrailerPartsLoading(false);
    setActivePartsDragIndex(null);
    setActivePartsDragOverIndex(null);
    setLocationSaveError("");
    setIsSavingLocation(false);
  };

  const resolveClientForLocationForm = (clientId) =>
    clientOptions.find((client) => client.id === clientId) || null;

  const filterLocationClients = (searchValue) => {
    const query = String(searchValue || "").trim().toLowerCase();
    const source = clientOptions || [];
    if (!query) return source.slice(0, 60);
    return source
      .filter((client) => {
        const name = String(client?.name || "").toLowerCase();
        const location = getClientLocationText(client).toLowerCase();
        return name.includes(query) || location.includes(query);
      })
      .slice(0, 60);
  };

  const applyRenamedMondayBoardToState = useCallback((boardId, nextName) => {
    if (!boardId) return;
    setMondayBoards((prev) =>
      prev.map((board) =>
        board.id === boardId ? { ...board, name: nextName } : board
      )
    );
    setMondayBoardFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        boards: (folder.boards || []).map((board) =>
          board.id === boardId ? { ...board, name: nextName } : board
        ),
      }))
    );
  }, []);

  const handleSaveTrailerName = async () => {
    if (!activeTrailer?.id) return;
    const nextName = String(trailerNameDraft || "").trim();
    if (!nextName) {
      setTrailerNameError("Enter a trailer name.");
      return;
    }

    const currentName = getTrailerDisplayName(activeTrailer);
    if (nextName === currentName) {
      setIsEditingTrailerName(false);
      setTrailerNameError("");
      return;
    }

    const mondayBoardId = String(activeTrailer.mondayBoardId || "").trim();
    if (!activeTrailer.existsInDb && !mondayBoardId) {
      setTrailerNameError("Save the trailer before editing its name.");
      return;
    }

    setIsSavingTrailerName(true);
    setTrailerNameError("");
    setTrailerNameSuccess("");
    try {
      if (mondayBoardId) {
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

      const nextNumber = extractTrailerNumber(nextName);
      const db = firebase.firestore();
      const trailerRef = db
        .collection("Trailers")
        .doc(activeTrailer.persistId || activeTrailer.id);
      const updatePayload = {
        name: nextName,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      if (mondayBoardId) {
        updatePayload.mondayBoardId = mondayBoardId;
        updatePayload.mondayBoardName = nextName;
        updatePayload.source = activeTrailer.source || "monday";
      }
      if (Number.isFinite(nextNumber)) {
        updatePayload.number = nextNumber;
      }
      await trailerRef.set(updatePayload, { merge: true });

      const updatedTrailer = {
        ...activeTrailer,
        name: nextName,
        mondayBoardName: mondayBoardId ? nextName : activeTrailer.mondayBoardName,
        number: Number.isFinite(nextNumber) ? nextNumber : activeTrailer.number,
        existsInDb: true,
      };
      setActiveTrailer(updatedTrailer);
      setTrailers((prev) => {
        let didUpdate = false;
        const next = prev.map((trailer) => {
          const isMatch =
            trailer.id === activeTrailer.id ||
            trailer.persistId === activeTrailer.persistId;
          if (!isMatch) return trailer;
          didUpdate = true;
          return { ...trailer, ...updatedTrailer };
        });
        return didUpdate ? next : [...next, updatedTrailer];
      });
      applyRenamedMondayBoardToState(mondayBoardId, nextName);
      setIsEditingTrailerName(false);
      setTrailerNameSuccess("Trailer name saved.");
    } catch (error) {
      console.error("Failed to save trailer name", error);
      setTrailerNameError(error?.message || "Could not save trailer name.");
    } finally {
      setIsSavingTrailerName(false);
    }
  };

  const handleCurrentLocationClientSelect = (client) => {
    if (!client?.id) return;
    setLocationForm((prev) => ({
      ...prev,
      currentClientId: client.id,
      currentName: client.name || "",
      currentClientLocation: getClientLocationText(client),
    }));
    setCurrentClientSearch(client.name || "");
    setActiveClientPicker(null);
  };

  const handleNextLocationClientSelect = (client) => {
    if (!client?.id) return;
    setLocationForm((prev) => ({
      ...prev,
      nextClientId: client.id,
      nextName: client.name || "",
      nextClientLocation: getClientLocationText(client),
    }));
    setNextClientSearch(client.name || "");
    setActiveClientPicker(null);
  };

  const handleHistoryLocationClientSelect = (index, client) => {
    if (!client?.id) return;
    setHistoryClientSearches((prev) => ({
      ...prev,
      [index]: client.name || "",
    }));
    handleLocationHistoryChange(index, "clientId", client.id);
    setActiveClientPicker(null);
  };

  const handleLocationHistoryChange = (index, field, value) => {
    setLocationForm((prev) => {
      const history = [...prev.history];
      const current = history[index] || {};
      const nextEntry = {
        ...current,
        [field]: value,
        provenance: manualTrailerProvenance(
          firebase.auth().currentUser,
          "Previous trailer location edited in Magmo"
        ),
      };
      if (field === "clientId") {
        const client = resolveClientForLocationForm(value);
        nextEntry.clientName = client?.name || "";
        nextEntry.clientLocation = getClientLocationText(client);
        nextEntry.clientNameSnapshot = client?.name || "";
        nextEntry.clientLocationSnapshot = getClientLocationText(client);
      }
      history[index] = nextEntry;
      return { ...prev, history };
    });
  };

  const handleAddLocationHistory = () => {
    setLocationForm((prev) => ({
      ...prev,
      history: [
        ...prev.history,
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
      ],
    }));
    setHistoryClientSearches((prev) => ({
      ...prev,
      [Object.keys(prev).length]: "",
    }));
  };

  const handleRemoveLocationHistory = (index) => {
    setLocationForm((prev) => ({
      ...prev,
      history: prev.history.filter((_, entryIndex) => entryIndex !== index),
    }));
    setHistoryClientSearches((prev) => {
      const next = {};
      Object.entries(prev).forEach(([key, value]) => {
        const numericKey = Number(key);
        if (numericKey < index) next[numericKey] = value;
        if (numericKey > index) next[numericKey - 1] = value;
      });
      return next;
    });
  };

  const handleSaveTrailerLocation = async () => {
    if (!activeTrailer?.id || !activeTrailer.existsInDb) {
      setLocationSaveError("Save the trailer before editing locations.");
      return;
    }

    const currentClient = resolveClientForLocationForm(locationForm.currentClientId);
    const nextClient = resolveClientForLocationForm(locationForm.nextClientId);
    if (!currentClient) {
      setLocationSaveError(
        "Select the current stay from the Client DB before saving."
      );
      return;
    }
    if (locationForm.nextClientId && !nextClient) {
      setLocationSaveError("Select a valid destination from the Client DB.");
      return;
    }
    const unlinkedHistoryEntry = (locationForm.history || []).find(
      (entry) =>
        (entry.clientName ||
          entry.clientLocation ||
          entry.arrivalDate ||
          entry.departureDate) &&
        !resolveClientForLocationForm(entry.clientId)
    );
    if (unlinkedHistoryEntry) {
      setLocationSaveError(
        "Link every previous location to a Client DB record before saving the timeline."
      );
      return;
    }
    const currentClientName =
      String(currentClient?.name || locationForm.currentName || currentClientSearch).trim() ||
      activeTrailer.locationCurrentName ||
      "Unknown";
    const currentClientLocation = String(
      getClientLocationText(currentClient) ||
        locationForm.currentClientLocation ||
        activeTrailer.locationCurrentClientLocation ||
        "Unknown"
    ).trim();
    const nextClientName = String(
      nextClient?.name || locationForm.nextName || nextClientSearch || ""
    ).trim();
    const nextClientLocation = String(
      getClientLocationText(nextClient) || locationForm.nextClientLocation || ""
    ).trim();
    const cleanHistory = sortLocationHistory(
      locationForm.history
        .map((entry) => {
          const client = resolveClientForLocationForm(entry.clientId);
          return {
            clientId: String(entry.clientId || "").trim(),
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

    setIsSavingLocation(true);
    setLocationSaveError("");
    try {
      const currentProvenance = manualTrailerProvenance(
        firebase.auth().currentUser,
        "Current trailer location edited in Magmo"
      );
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(activeTrailer.persistId || activeTrailer.id)
        .set(
          {
            locationCurrentId: locationForm.currentClientId || "",
            currentClientId: locationForm.currentClientId || "",
            currentClient: firebase
              .firestore()
              .collection("Client")
              .doc(locationForm.currentClientId),
            locationCurrentName: currentClientName,
            locationCurrentClientLocation: currentClientLocation,
            locationCurrentArrivalDate: locationForm.currentArrivalDate || "",
            locationCurrentDepartureDate: locationForm.currentDepartureDate || "",
            locationCurrentProvenance: currentProvenance,
            locationNextId: locationForm.nextClientId || "",
            nextClientId: locationForm.nextClientId || "",
            nextClient: locationForm.nextClientId
              ? firebase
                  .firestore()
                  .collection("Client")
                  .doc(locationForm.nextClientId)
              : null,
            locationNextName: nextClientName,
            locationNextClientLocation: nextClientLocation,
            locationNext: nextClientName,
            locationCurrent: currentClientName,
            location: currentClientName,
            locationStatus: isTrailerInTransit(activeTrailer)
              ? "transit"
              : activeTrailer.locationStatus || "",
            inTransit: isTrailerInTransit(activeTrailer),
            transitDepartureDate: isTrailerInTransit(activeTrailer)
              ? locationForm.transitDepartureDate || ""
              : "",
            transitExpectedArrivalDate: isTrailerInTransit(activeTrailer)
              ? locationForm.transitExpectedArrivalDate || ""
              : "",
            locationHistory: cleanHistory,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      setLocationForm((prev) => ({
        ...prev,
        currentName: currentClientName,
        currentClientLocation,
        nextName: nextClientName,
        nextClientLocation,
        history: cleanHistory,
      }));
      setActiveTrailer((prev) =>
        prev
          ? {
              ...prev,
              locationCurrentId: locationForm.currentClientId || "",
              locationCurrentName: currentClientName,
              locationCurrentClientLocation: currentClientLocation,
              locationCurrentArrivalDate: locationForm.currentArrivalDate || "",
              locationCurrentDepartureDate:
                locationForm.currentDepartureDate || "",
              locationCurrentProvenance: currentProvenance,
              locationNextId: locationForm.nextClientId || "",
              locationNextName: nextClientName,
              locationNextClientLocation: nextClientLocation,
              transitDepartureDate: isTrailerInTransit(prev)
                ? locationForm.transitDepartureDate || ""
                : "",
              transitExpectedArrivalDate: isTrailerInTransit(prev)
                ? locationForm.transitExpectedArrivalDate || ""
                : "",
              locationHistory: cleanHistory,
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to save trailer location", error);
      setLocationSaveError("Could not save trailer location.");
    } finally {
      setIsSavingLocation(false);
    }
  };

  const handleStartTrailerTransit = async () => {
    if (!activeTrailer?.id || !activeTrailer.existsInDb) {
      setLocationSaveError("Save the trailer before starting transit.");
      return;
    }

    const nextClientId = String(locationForm.nextClientId || "").trim();
    const requestedNextName = String(
      locationForm.nextName || nextClientSearch || ""
    ).trim();
    if (!nextClientId) {
      setLocationSaveError(
        "Select the destination from the Client DB before starting transit."
      );
      return;
    }

    const currentClientId = String(locationForm.currentClientId || "").trim();
    const currentClient = resolveClientForLocationForm(currentClientId);
    const nextClient = resolveClientForLocationForm(nextClientId);
    if (!currentClient || !nextClient) {
      setLocationSaveError(
        !currentClient
          ? "Link the current stay to a Client DB record before starting transit."
          : "Select a valid destination from the Client DB."
      );
      return;
    }
    const currentClientName =
      String(
        currentClient?.name ||
          locationForm.currentName ||
          currentClientSearch ||
          activeTrailer.locationCurrentName ||
          "Unknown"
      ).trim();
    const nextClientName = String(
      nextClient?.name || requestedNextName || "Unknown"
    ).trim();
    const currentClientLocation =
      getClientLocationText(currentClient) ||
      locationForm.currentClientLocation ||
      activeTrailer.locationCurrentClientLocation ||
      "Unknown";
    const nextClientLocation =
      getClientLocationText(nextClient) ||
      locationForm.nextClientLocation ||
      "Unknown";
    const transitDepartureDate =
      String(locationForm.transitDepartureDate || "").trim() ||
      getTodayDateInputValue();
    const transitExpectedArrivalDate = String(
      locationForm.transitExpectedArrivalDate || ""
    ).trim();

    setIsSavingLocation(true);
    setLocationSaveError("");
    try {
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(activeTrailer.persistId || activeTrailer.id)
        .set(
          {
            locationFromId: currentClientId,
            locationFromName: currentClientName,
            locationFrom: currentClientName,
            locationCurrentId: currentClientId,
            currentClientId,
            currentClient: firebase
              .firestore()
              .collection("Client")
              .doc(currentClientId),
            locationCurrentName: currentClientName,
            locationCurrentClientLocation: currentClientLocation,
            locationCurrentArrivalDate: locationForm.currentArrivalDate || "",
            locationCurrentDepartureDate: transitDepartureDate,
            locationNextId: nextClientId,
            nextClientId,
            nextClient: firebase
              .firestore()
              .collection("Client")
              .doc(nextClientId),
            locationNextName: nextClientName,
            locationNextClientLocation: nextClientLocation,
            locationNext: nextClientName,
            locationCurrent: currentClientName,
            location: currentClientName,
            locationStatus: "transit",
            inTransit: true,
            transitDepartureDate,
            transitExpectedArrivalDate,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      setLocationForm((prev) => ({
        ...prev,
        currentClientId,
        currentName: currentClientName,
        currentClientLocation,
        nextClientId,
        nextName: nextClientName,
        nextClientLocation,
        currentDepartureDate: transitDepartureDate,
        transitDepartureDate,
        transitExpectedArrivalDate,
      }));
      setCurrentClientSearch(currentClientName);
      setNextClientSearch(nextClientName);
      setActiveTrailer((prev) =>
        prev
          ? {
              ...prev,
              locationFromId: currentClientId,
              locationFromName: currentClientName,
              locationCurrentId: currentClientId,
              locationCurrentName: currentClientName,
              locationCurrentClientLocation: currentClientLocation,
              locationCurrentDepartureDate: transitDepartureDate,
              locationNextId: nextClientId,
              locationNextName: nextClientName,
              locationNextClientLocation: nextClientLocation,
              locationStatus: "transit",
              inTransit: true,
              transitDepartureDate,
              transitExpectedArrivalDate,
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to start trailer transit", error);
      setLocationSaveError("Could not start trailer transit.");
    } finally {
      setIsSavingLocation(false);
    }
  };

  const handleMarkTrailerArrived = async () => {
    if (!activeTrailer?.id || !activeTrailer.existsInDb) {
      setLocationSaveError("Save the trailer before marking it arrived.");
      return;
    }
    if (!isTrailerInTransit(activeTrailer)) {
      setLocationSaveError("This trailer is not currently marked in transit.");
      return;
    }

    const currentClientId = String(locationForm.currentClientId || "").trim();
    const nextClientId = String(locationForm.nextClientId || "").trim();
    const currentClient = resolveClientForLocationForm(currentClientId);
    const nextClient = resolveClientForLocationForm(nextClientId);
    if (!currentClient || !nextClient) {
      setLocationSaveError(
        "Both the origin and destination must be linked to Client DB records before recording arrival."
      );
      return;
    }
    const currentClientName = String(
      currentClient?.name ||
        locationForm.currentName ||
        currentClientSearch ||
        activeTrailer.locationCurrentName ||
        "Unknown"
    ).trim();
    const nextClientName = String(
      nextClient?.name || locationForm.nextName || nextClientSearch || "Unknown"
    ).trim();
    const currentClientLocation = String(
      getClientLocationText(currentClient) ||
        locationForm.currentClientLocation ||
        activeTrailer.locationCurrentClientLocation ||
        "Unknown"
    ).trim();
    const nextClientLocation = String(
      getClientLocationText(nextClient) ||
        locationForm.nextClientLocation ||
        "Unknown"
    ).trim();
    const transitDepartureDate =
      String(
        locationForm.transitDepartureDate ||
          activeTrailer.transitDepartureDate ||
          locationForm.currentDepartureDate ||
          ""
      ).trim() || getTodayDateInputValue();
    const arrivalDate =
      String(locationForm.transitArrivalDate || "").trim() ||
      getTodayDateInputValue();
    const currentHistoryEntry = {
      clientId: currentClientId,
      client: firebase.firestore().collection("Client").doc(currentClientId),
      clientName: currentClientName,
      clientLocation: currentClientLocation,
      clientNameSnapshot: currentClientName,
      clientLocationSnapshot: currentClientLocation,
      arrivalDate: String(locationForm.currentArrivalDate || "").trim(),
      departureDate: transitDepartureDate,
      provenance: manualTrailerProvenance(
        firebase.auth().currentUser,
        "Trailer arrival recorded manually in Magmo"
      ),
    };
    const currentHistoryKey = [
      currentHistoryEntry.clientId,
      currentHistoryEntry.clientName.toLowerCase(),
      currentHistoryEntry.arrivalDate,
    ].join("|");
    const cleanExistingHistory = locationForm.history
      .map((entry) => {
        const client = resolveClientForLocationForm(entry.clientId);
        return {
          clientId: String(entry.clientId || "").trim(),
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
      .filter((entry) => {
        const hasValue =
          entry.clientId ||
          entry.clientName ||
          entry.clientLocation ||
          entry.arrivalDate ||
          entry.departureDate;
        const entryKey = [
          entry.clientId,
          entry.clientName.toLowerCase(),
          entry.arrivalDate,
        ].join("|");
        return hasValue && entryKey !== currentHistoryKey;
      });
    const nextHistory = sortLocationHistory([
      currentHistoryEntry,
      ...cleanExistingHistory,
    ]);

    setIsSavingLocation(true);
    setLocationSaveError("");
    try {
      const arrivalProvenance = manualTrailerProvenance(
        firebase.auth().currentUser,
        "Trailer arrival recorded manually in Magmo"
      );
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(activeTrailer.persistId || activeTrailer.id)
        .set(
          {
            locationFromId: currentClientId,
            locationFromName: currentClientName,
            locationFrom: currentClientName,
            locationCurrentId: nextClientId,
            currentClientId: nextClientId,
            currentClient: firebase
              .firestore()
              .collection("Client")
              .doc(nextClientId),
            locationCurrentName: nextClientName,
            locationCurrentClientLocation: nextClientLocation,
            locationCurrentArrivalDate: arrivalDate,
            locationCurrentDepartureDate: "",
            locationCurrentProvenance: arrivalProvenance,
            locationNextId: "",
            nextClientId: "",
            nextClient: null,
            locationNextName: "",
            locationNextClientLocation: "",
            locationNext: "",
            locationCurrent: nextClientName,
            location: nextClientName,
            locationStatus: "onsite",
            inTransit: false,
            transitDepartureDate: "",
            transitExpectedArrivalDate: "",
            locationHistory: nextHistory,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      setLocationForm((prev) => ({
        ...prev,
        currentClientId: nextClientId,
        currentName: nextClientName,
        currentClientLocation: nextClientLocation,
        currentArrivalDate: arrivalDate,
        currentDepartureDate: "",
        nextClientId: "",
        nextName: "",
        nextClientLocation: "",
        transitDepartureDate: "",
        transitExpectedArrivalDate: "",
        transitArrivalDate: getTodayDateInputValue(),
        history: nextHistory,
      }));
      setCurrentClientSearch(nextClientName);
      setNextClientSearch("");
      setHistoryClientSearches(
        nextHistory.reduce((acc, entry, index) => {
          acc[index] = entry.clientName || "";
          return acc;
        }, {})
      );
      setActiveTrailer((prev) =>
        prev
          ? {
              ...prev,
              locationFromId: currentClientId,
              locationFromName: currentClientName,
              locationCurrentId: nextClientId,
              locationCurrentName: nextClientName,
              locationCurrentClientLocation: nextClientLocation,
              locationCurrentArrivalDate: arrivalDate,
              locationCurrentDepartureDate: "",
              locationCurrentProvenance: arrivalProvenance,
              locationNextId: "",
              locationNextName: "",
              locationNextClientLocation: "",
              locationStatus: "onsite",
              inTransit: false,
              transitDepartureDate: "",
              transitExpectedArrivalDate: "",
              locationHistory: nextHistory,
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to mark trailer arrived", error);
      setLocationSaveError("Could not mark the trailer arrived.");
    } finally {
      setIsSavingLocation(false);
    }
  };

  const handleSelectAssociatedPartFromModal = useCallback(
    (itemId) => {
      if (!itemId) return;
      setActiveTrailer(null);
      setActiveSlot(null);
      onHide();
      router.push(`/NewSearch/item/${itemId}`);
    },
    [onHide, router]
  );

  const handleActivePartDragStart = (index) => (event) => {
    if (event.target.closest("button")) {
      event.preventDefault();
      return;
    }
    setActivePartsDragIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "text/plain",
      activeTrailerParts[index]?.id || String(index)
    );
  };

  const handleActivePartDragOver = (index) => (event) => {
    event.preventDefault();
    if (activePartsDragOverIndex !== index) setActivePartsDragOverIndex(index);
    event.dataTransfer.dropEffect = "move";
  };

  const handleActivePartDrop = (index) => (event) => {
    event.preventDefault();
    if (activePartsDragIndex == null || activePartsDragIndex === index) {
      setActivePartsDragIndex(null);
      setActivePartsDragOverIndex(null);
      return;
    }
    setActiveTrailerParts((prev) => {
      const next = [...prev];
      const [moved] = next.splice(activePartsDragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setActivePartsDragIndex(null);
    setActivePartsDragOverIndex(null);
  };

  const handleActivePartDragEnd = () => {
    setActivePartsDragIndex(null);
    setActivePartsDragOverIndex(null);
  };

  const handleSlotClick = async (slotNumber) => {
    if (!layoutLocked) return;
    if (movingTrailer) {
      const movingTrailerId = movingTrailer.trailerId;
      const movingSourceSlot = movingTrailer.sourceSlot;
      const destinationTrailer = slotAssignments[slotNumber] || null;
      const effectiveDestination =
        destinationTrailer?.id === movingTrailerId ? null : destinationTrailer;
      if (!movingTrailerId) return;

      setIsApplyingMove(true);
      setMoveError("");
      try {
        const db = firebase.firestore();
        const batch = db.batch();
        const movingRef = db
          .collection("Trailers")
          .doc(movingTrailer.persistId || movingTrailerId);
        batch.set(
          movingRef,
          {
            ...buildYardPlacementPayload(activeYardKey, true, slotNumber),
            ...getYardLocationPayload(activeYardView, movingTrailer),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        if (effectiveDestination) {
          const destinationRef = db
            .collection("Trailers")
            .doc(effectiveDestination.persistId || effectiveDestination.id);
          const restoreSlot = normalizePersistedSlot(movingSourceSlot);
          if (restoreSlot != null) {
            batch.set(
              destinationRef,
              {
                ...buildYardPlacementPayload(
                  activeYardKey,
                  true,
                  restoreSlot,
                ),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } else {
            batch.set(
              destinationRef,
              {
                ...buildYardPlacementPayload(activeYardKey, false, null),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          }
        }

        await batch.commit();
        clearMoveState();
      } catch (error) {
        console.error("Failed to move trailer", error);
        setMoveError("Could not move trailer. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
      return;
    }

    const trailer = slotAssignments[slotNumber] || null;
    if (!trailer) return;
    setSelectedYardTrailer(trailer);
    setMoveError("");
    setDeleteError("");
  };

  const handleStartMove = async () => {
    if (!activeTrailer || !activeSlot) return;
    setActionBusy(true);
    setMoveError("");
    try {
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(activeTrailer.persistId || activeTrailer.id)
        .set(
          {
            ...buildYardPlacementPayload(activeYardKey, false, null),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      setMovingTrailer({
        trailerId: activeTrailer.id,
        persistId: activeTrailer.persistId || activeTrailer.id,
        sourceSlot: activeSlot,
        trailerName: activeTrailer.id,
      });
      setActiveTrailer(null);
      setActiveSlot(null);
    } catch (error) {
      console.error("Failed to start trailer move", error);
      setMoveError("Could not start move mode.");
    } finally {
      setActionBusy(false);
    }
  };

  const handleCreateTrailer = async (event) => {
    event.preventDefault();
    setCreateError("");
    const trailerNumber = Number(newTrailerNumber);
    if (!Number.isFinite(trailerNumber) || trailerNumber <= 0) {
      setCreateError("Enter a valid trailer number.");
      return;
    }

    const trailerId = `AIS${trailerNumber}`;
    const exists = trailers.some(
      (trailer) => trailer.id === trailerId && trailer.existsInDb
    );
    if (exists) {
      setCreateError(`${trailerId} already exists.`);
      return;
    }

    const defaultSlot = SLOT_NUMBER_SET.has(trailerNumber) && !slotAssignments[trailerNumber]
      ? trailerNumber
      : null;
    const locationFromId = String(newTrailerLocationFromId || "").trim();
    const locationCurrentId =
      String(newTrailerLocationCurrentId || "").trim() || SOCAL_CLIENT_ID;
    const locationNextId = String(newTrailerLocationNextId || "").trim();
    const fromClient = clientOptions.find((client) => client.id === locationFromId);
    const currentClient = clientOptions.find(
      (client) => client.id === locationCurrentId
    );
    const nextClient = clientOptions.find((client) => client.id === locationNextId);
    const locationFromName = String(fromClient?.name || "").trim();
    const locationCurrentName =
      String(currentClient?.name || "").trim() || SOCAL_LOCATION_NAME;
    const locationNextName = String(nextClient?.name || "").trim();
    const associatedMachineId = String(newTrailerAssociatedMachineId || "").trim();

    setIsCreating(true);
    try {
      const db = firebase.firestore();
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(trailerId)
        .set({
          name: String(newTrailerName || "").trim() || trailerId,
          locationFromId,
          locationFromName,
          locationFrom: locationFromName,
          locationCurrentName,
          locationCurrentId,
          currentClientId: locationCurrentId,
          currentClient: db.collection("Client").doc(locationCurrentId),
          locationCurrentClientLocation: getClientLocationText(currentClient),
          locationCurrent: locationCurrentName,
          location: locationCurrentName,
          locationNextId,
          nextClientId: locationNextId,
          nextClient: locationNextId
            ? db.collection("Client").doc(locationNextId)
            : null,
          locationNextName,
          locationNext: locationNextName,
          locationNextClientLocation: getClientLocationText(nextClient),
          model: String(newTrailerModel || "").trim(),
          vin: String(newTrailerVin || "").trim(),
          associatedMachineId,
          associatedMachine: associatedMachineId
            ? db.collection("Machine").doc(associatedMachineId)
            : null,
          ...buildYardPlacementPayload(
            activeYardKey,
            defaultSlot != null,
            defaultSlot,
          ),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

      resetNewTrailerForm();
      setShowAddTrailerModal(false);
    } catch (error) {
      console.error("Failed to create trailer", error);
      setCreateError("Could not create trailer.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTrailer = async (trailer) => {
    if (!trailer?.id) return;
    if (!trailer.existsInDb) {
      setDeleteError(`${trailer.id} is not yet in the database.`);
      return;
    }
    const confirmed = window.confirm(
      `Delete trailer ${trailer.id}? This permanently removes it from the database.`
    );
    if (!confirmed) return;

    setDeleteError("");
    try {
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(trailer.persistId || trailer.id)
        .delete();
      if (activeTrailer?.id === trailer.id) {
        setActiveTrailer(null);
        setActiveSlot(null);
      }
      if (movingTrailer?.trailerId === trailer.id) {
        clearMoveState();
      }
    } catch (error) {
      console.error("Failed to delete trailer", error);
      setDeleteError(`Could not delete ${trailer.id}.`);
    }
  };

  const hasActiveAssociatedMachine = Boolean(
    String(activeTrailer?.associatedMachineId || "").trim()
  );
  const associatedPartsRows = !hasActiveAssociatedMachine
    ? [
        <tr key="no-machine">
          <td colSpan={6} className={styles.assocEmptyState}>
            No associated machine selected.
          </td>
        </tr>,
      ]
    : activeTrailerPartsLoading
    ? [
        <tr key="parts-loading">
          <td colSpan={6} className={styles.assocEmptyState}>
            Loading associated parts...
          </td>
        </tr>,
      ]
    : activeTrailerPartsError
    ? [
        <tr key="parts-error">
          <td colSpan={6} className={styles.assocEmptyState}>
            {activeTrailerPartsError}
          </td>
        </tr>,
      ]
    : activeTrailerParts.length === 0
    ? [
        <tr key="parts-empty">
          <td colSpan={6} className={styles.assocEmptyState}>
            No associated parts found.
          </td>
        </tr>,
      ]
    : activeTrailerParts.map((part, index) => (
        <tr
          key={part.id || `part-${index}`}
          draggable
          onDragStart={handleActivePartDragStart(index)}
          onDragOver={handleActivePartDragOver(index)}
          onDrop={handleActivePartDrop(index)}
          onDragEnd={handleActivePartDragEnd}
          className={`${styles.assocDraggableRow} ${
            activePartsDragIndex === index ? styles.assocDragging : ""
          } ${
            activePartsDragOverIndex === index && activePartsDragIndex !== index
              ? styles.assocDropTarget
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
              onClick={() => handleSelectAssociatedPartFromModal(part.id)}
            >
              Select
            </Button>
          </td>
        </tr>
      ));

  const trailerListRows =
    listTrailers.length === 0
      ? [
          <tr key="list-empty">
            <td colSpan={6} className={styles.emptyRow}>
              No trailers found.
            </td>
          </tr>,
        ]
      : listTrailers.map((trailer) => (
          <tr key={trailer.id}>
            <td>
              <div>{getTrailerDisplayName(trailer)}</div>
              <small className={styles.infoText}>{trailer.id}</small>
            </td>
            <td>{getTrailerLocationFrom(trailer)}</td>
            <td>{getTrailerLocationCurrent(trailer)}</td>
            <td>{getTrailerLocationNext(trailer)}</td>
            <td className={styles.viewCol}>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => openTrailerPage(trailer.persistId || trailer.id)}
              >
                View
              </Button>
            </td>
            <td className={styles.deleteCol}>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => handleDeleteTrailer(trailer)}
              >
                x
              </Button>
            </td>
          </tr>
        ));

  return (
    <>
      <Modal show={show} onHide={onHide} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{activeMapView.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <nav className={styles.viewTabs} aria-label="Trailer map views">
            {TRAILER_MAP_VIEWS.map((view) => {
              const isActive = view.key === activeMapViewKey;
              return (
                <button
                  key={view.key}
                  type="button"
                  className={`${styles.viewTab} ${
                    isActive ? styles.viewTabActive : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleMapViewChange(view.key)}
                >
                  <span className={styles.viewTabLabel}>{view.label}</span>
                  <span className={styles.viewTabCount}>
                    {mapViewCounts[view.key] || 0}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className={styles.toolbar}>
            <Button
              variant="outline-primary"
              onClick={() => setShowMondayBoards((value) => !value)}
              aria-label={`Toggle ${activeMapView.label} trailer menu`}
              className={styles.menuButton}
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </Button>
            <div className={styles.toolbarActions}>
              <div className={styles.mapTitleWrap}>
                <div className={styles.mapTitle}>{activeMapView.label}</div>
                <div className={styles.mapSubtitle}>
                  {activeMapView.type === "national"
                    ? `${mapViewCounts[activeMapView.key] || 0} active trailers currently on site`
                    : `${mapViewCounts[activeMapView.key] || 0} trailers in the matching Monday group`}
                </div>
              </div>
            </div>
          </div>

          {isLoading && <div className={styles.infoText}>Loading trailers...</div>}
          {loadError && <Alert variant="danger">{loadError}</Alert>}
          {mondayConnectionError && (
            <Alert
              variant="warning"
              dismissible
              onClose={() => setMondayConnectionError("")}
            >
              {mondayConnectionError}
            </Alert>
          )}
          {moveError && <Alert variant="warning">{moveError}</Alert>}

          {activeMapView.type === "yard" && movingTrailer && (
            <Alert variant="info" className={styles.moveBanner}>
              Moving <strong>{movingTrailer.trailerName}</strong>. Click a slot to place
              it. If destination is occupied, trailers will swap.
              <Button
                size="sm"
                variant="outline-secondary"
                className={styles.cancelMoveButton}
                onClick={clearMoveState}
                disabled={isApplyingMove}
              >
                Cancel Move
              </Button>
            </Alert>
          )}

          <div className={styles.mapContent}>
            {showMondayBoards && (
              <aside className={styles.boardsPanel}>
                <div className={styles.boardsHeader}>
                  <span>
                    {activeMapView.type === "national"
                      ? "On-site trailers"
                      : `${activeMapView.shortLabel} Monday group`}
                  </span>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setShowMondayBoards(false)}
                    aria-label="Close Monday trailer menu"
                  >
                    x
                  </Button>
                </div>
                <div className={styles.boardsList}>
                  {mondayBoardsLoading ? (
                    <div className={styles.boardsState}>Loading trailers...</div>
                  ) : mondayBoardsError ? (
                    <div className={styles.boardsError}>{mondayBoardsError}</div>
                  ) : activeMondayFolders.length === 0 ? (
                    <div className={styles.boardsState}>
                      No matching Monday group found.
                    </div>
                  ) : (
                    activeMondayFolders.map((folder) => (
                      <div key={folder.id || folder.name} className={styles.folderGroup}>
                        <button
                          type="button"
                          className={styles.folderToggle}
                          onClick={() => toggleMondayFolder(folder.id || folder.name)}
                          aria-expanded={
                            !collapsedMondayFolders[folder.id || folder.name]
                          }
                        >
                          <span className={styles.folderCaret}>
                            {collapsedMondayFolders[folder.id || folder.name]
                              ? "\u25b8"
                              : "\u25be"}
                          </span>
                          <span className={styles.folderName}>{folder.name}</span>
                        </button>
                        {!collapsedMondayFolders[folder.id || folder.name] && (
                          <div className={styles.folderBoards}>
                            {(folder.boards || []).length === 0 ? (
                              <div className={styles.emptyFolder}>No trailers</div>
                            ) : (
                              (folder.boards || []).map((board) => {
                                const boardHoverKey = buildMondayBoardHoverKey(board);
                                const isLinkedHover =
                                  hoveredTrailerKey != null &&
                                  boardHoverKey === hoveredTrailerKey;

                                return (
                                  <button
                                    key={board.id}
                                    type="button"
                                    draggable={
                                      activeMapView.type === "yard" &&
                                      layoutLocked &&
                                      !isApplyingMove &&
                                      !movingTrailer
                                    }
                                    className={`${styles.boardItem} ${
                                      isLinkedHover ? styles.boardItemHighlighted : ""
                                    }`}
                                    onClick={() => openMondayTrailerModal(board, folder)}
                                    onDragStart={
                                      activeMapView.type === "yard"
                                        ? handleMondayBoardDragStart(board, folder)
                                        : undefined
                                    }
                                    onDragEnd={handleMondayBoardDragEnd}
                                    onMouseEnter={() =>
                                      setHoveredTrailerKey(boardHoverKey)
                                    }
                                    onMouseLeave={() => setHoveredTrailerKey(null)}
                                    onFocus={() =>
                                      setHoveredTrailerKey(boardHoverKey)
                                    }
                                    onBlur={() => setHoveredTrailerKey(null)}
                                  >
                                    {board.name}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </aside>
            )}

            {activeMapView.type === "national" ? (
              <div className={styles.nationalContent}>
                <TrailerUsMap
                  trailers={onsiteTrailers}
                  highlightedTrailerId={highlightedOnsiteTrailerId}
                  onOpenTrailer={openTrailerPage}
                  onTrailerHoverChange={(trailer) =>
                    setHoveredTrailerKey(buildTrailerHoverKey(trailer))
                  }
                />
              </div>
            ) : (
            <div
              className={`${styles.mapFrame} ${
                lockedSwapDrag?.isDragging ? styles.lockedSwapDragging : ""
              }`}
            >
              <div
                className={`${styles.mapSurface} ${
                  activeYardKey === DEFAULT_YARD_VIEW_KEY
                    ? ""
                    : styles.simpleYardSurface
                }`}
                ref={mapSurfaceRef}
                onDragOver={handleMapDragOver}
                onDrop={handleMapDrop}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveDropSlot(null);
                  }
                }}
              >
              {activeYardKey === DEFAULT_YARD_VIEW_KEY && (
                <TrailerYardWarehouse classes={styles} />
              )}
              {positionedSlots.map((slot) => {
                const trailer = slotAssignments[slot.slot] || null;

                const trailerHoverKey = buildTrailerHoverKey(trailer);
                const isLinkedHover =
                  hoveredTrailerKey != null &&
                  trailerHoverKey === hoveredTrailerKey;
                return (
                  <button
                    key={slot.key || slot.slot}
                    type="button"
                    data-slot-number={slot.slot}
                    className={`${styles.slotButton} ${
                      trailer ? styles.slotOccupied : styles.slotEmpty
                    } ${
                      !layoutLocked ? styles.layoutEditable : ""
                    } ${
                      !layoutLocked && selectedLayoutKey === (slot.key || `slot-${slot.slot}`)
                        ? styles.selectedLayoutItem
                        : ""
                    } ${
                      lockedSwapDrag?.isDragging &&
                      lockedSwapDrag.sourceSlot === slot.slot
                        ? styles.draggingSlot
                        : ""
                    } ${
                      activeDropSlot === slot.slot ? styles.slotDropTarget : ""
                    } ${isLinkedHover ? styles.slotHoverLinked : ""
                    }`}
                    style={{
                      left: `${slot.x}%`,
                      top: `${slot.y}%`,
                      width: `${slot.w}%`,
                      height: `${slot.h}%`,
                      transform: `rotate(${slot.r}deg)`,
                    }}
                    onClick={() =>
                      handleLayoutItemClick(slot.key || `slot-${slot.slot}`, slot.slot)
                    }
                    disabled={isApplyingMove}
                    title={
                      trailer
                        ? `${trailer.id} | From: ${getTrailerLocationFrom(
                            trailer
                          )} | Current: ${getTrailerLocationCurrent(trailer)}`
                        : "Empty parking bay"
                    }
                    onPointerDown={(event) => {
                      if (layoutLocked) {
                        startLockedSlotSwapDrag(event, slot.slot);
                        return;
                      }
                      startLayoutDrag(event, slot.key || `slot-${slot.slot}`, slot);
                    }}
                    onMouseEnter={() => setHoveredTrailerKey(trailerHoverKey)}
                    onMouseLeave={() => setHoveredTrailerKey(null)}
                    onFocus={() => setHoveredTrailerKey(trailerHoverKey)}
                    onBlur={() => setHoveredTrailerKey(null)}
                    onDragOver={handleTrailerSlotDragOver(slot.slot)}
                    onDrop={handleTrailerSlotDrop(slot.slot)}
                  >
                    {trailer?.heliumTelemetry && (
                      <span
                        className={styles.heliumBadge}
                        style={{
                          transform: `rotate(${getUprightLabelRotation(slot.r)}deg)`,
                        }}
                        aria-label="Helium telemetry available"
                      >
                        He
                      </span>
                    )}
                    <span
                      className={styles.slotNumber}
                      style={{
                        transform: `rotate(${getUprightLabelRotation(slot.r)}deg)`,
                      }}
                    >
                      {trailer
                        ? getTrailerDisplayNumber(trailer, slot.slot)
                        : ""}
                    </span>
                  </button>
                );
              })}
              </div>
              <TrailerMapSummary
                trailer={selectedYardTrailer}
                eyebrow={`${activeMapView.shortLabel} trailer`}
                compact
                onClose={() => setSelectedYardTrailer(null)}
                onMoreDetails={openTrailerPage}
              />
              {lockedSwapDrag?.isDragging && (
                <div
                  className={styles.dragGhost}
                  style={{
                    left: `${lockedSwapDrag.x + 12}px`,
                    top: `${lockedSwapDrag.y + 12}px`,
                  }}
                >
                  {lockedSwapDrag.trailerId}
                </div>
              )}
              <div className={styles.layoutToggle}>
                <Form.Check
                  type="switch"
                  id={`layout-lock-toggle-${activeYardKey}`}
                  checked={!layoutLocked}
                  onChange={handleLayoutLockToggle}
                  disabled={isSavingLayout}
                  label={
                    isSavingLayout ? (
                      <span className={styles.savingLabel}>
                        <span className={styles.savingSpinner} aria-hidden="true" />
                        Saving...
                      </span>
                    ) : layoutLocked ? (
                      "Locked"
                    ) : (
                      "Unlocked"
                    )
                  }
                />
              </div>
              {!layoutLocked && (
                <div className={styles.layoutControls}>
                  <Form.Control
                    as="select"
                    size="sm"
                    className={styles.rotateStepSelect}
                    value={rotateStep}
                    onChange={(event) =>
                      setRotateStep(Number(event.target.value) || ROTATE_STEP_DEGREES)
                    }
                  >
                    {ROTATE_STEP_OPTIONS.map((step) => (
                      <option key={step} value={step}>
                        Step {step}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => rotateSelectedLayoutItem(-rotateStep)}
                    disabled={!selectedLayoutKey}
                  >
                    Rotate -{rotateStep}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => rotateSelectedLayoutItem(rotateStep)}
                    disabled={!selectedLayoutKey}
                  >
                    Rotate +{rotateStep}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={handleCreateLayoutSlot}
                  >
                    Create
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={handleClearSelectedSlotTrailer}
                    disabled={
                      !selectedLayoutSlot ||
                      !slotAssignments[selectedLayoutSlot.slot] ||
                      !slotAssignments[selectedLayoutSlot.slot]?.existsInDb ||
                      isApplyingMove
                    }
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={handleDeleteSelectedSlot}
                    disabled={!selectedLayoutSlot || isApplyingMove}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={handleLayoutReset}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={Boolean(activeTrailer)}
        onHide={closeActiveTrailerModal}
        size="xl"
        centered
      >
        <Modal.Header closeButton={!actionBusy}>
          <Modal.Title>Trailer {getTrailerDisplayName(activeTrailer)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.nameEditorCard}>
            <div className={styles.nameEditorHeader}>
              <div>
                <div className={styles.nameEditorLabel}>Name</div>
                {!isEditingTrailerName && (
                  <div className={styles.nameEditorValue}>
                    {getTrailerDisplayName(activeTrailer) || "-"}
                  </div>
                )}
              </div>
              {!isEditingTrailerName && (
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => {
                    setTrailerNameDraft(getTrailerDisplayName(activeTrailer));
                    setTrailerNameError("");
                    setTrailerNameSuccess("");
                    setIsEditingTrailerName(true);
                  }}
                  disabled={isSavingTrailerName || actionBusy}
                >
                  Edit Name
                </Button>
              )}
            </div>
            {isEditingTrailerName && (
              <div className={styles.nameEditorForm}>
                <Form.Control
                  value={trailerNameDraft}
                  onChange={(event) => {
                    setTrailerNameDraft(event.target.value);
                    setTrailerNameError("");
                    setTrailerNameSuccess("");
                  }}
                  placeholder="Trailer name"
                  disabled={isSavingTrailerName}
                />
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveTrailerName}
                  disabled={isSavingTrailerName}
                >
                  {isSavingTrailerName ? "Saving..." : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => {
                    setTrailerNameDraft(getTrailerDisplayName(activeTrailer));
                    setIsEditingTrailerName(false);
                    setTrailerNameError("");
                  }}
                  disabled={isSavingTrailerName}
                >
                  Cancel
                </Button>
              </div>
            )}
            {trailerNameError && (
              <div className={styles.inlineError}>{trailerNameError}</div>
            )}
            {trailerNameSuccess && (
              <div className={styles.inlineSuccess}>{trailerNameSuccess}</div>
            )}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Trailer ID:</strong> {activeTrailer?.id || "-"}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Location From:</strong> {getTrailerLocationFrom(activeTrailer)}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Location Current:</strong> {getTrailerLocationCurrent(activeTrailer)}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Next Location:</strong> {getTrailerLocationNext(activeTrailer)}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Associated Machine:</strong>{" "}
            {String(activeTrailerMachine?.name || "").trim() ||
              String(activeTrailer?.associatedMachineId || "").trim() ||
              "-"}
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationHeader}>
              <div>
                <div className={styles.locationTitle}>Location timeline</div>
                <div className={styles.locationSubtext}>
                  Every stop links to the Client DB, so names and addresses stay
                  synchronized across Magmo.
                </div>
              </div>
              <div className={styles.locationHeaderActions}>
                {isTrailerInTransit(activeTrailer) ? (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={handleMarkTrailerArrived}
                    disabled={isSavingLocation || !activeTrailer?.existsInDb}
                  >
                    {isSavingLocation ? "Updating..." : "Mark Arrived"}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={handleStartTrailerTransit}
                    disabled={
                      isSavingLocation ||
                      !activeTrailer?.existsInDb ||
                      !locationForm.nextClientId
                    }
                  >
                    {isSavingLocation ? "Starting..." : "Start Transit"}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveTrailerLocation}
                  disabled={isSavingLocation || !activeTrailer?.existsInDb}
                >
                  {isSavingLocation ? "Saving..." : "Save timeline"}
                </Button>
              </div>
            </div>
            {locationSaveError && (
              <Alert variant="warning" className={styles.locationAlert}>
                {locationSaveError}
              </Alert>
            )}
            {isTrailerInTransit(activeTrailer) && (
              <div className={styles.transitStatusCard}>
                <div className={styles.transitStatusIcon} aria-hidden="true">
                  &rarr;
                </div>
                <div className={styles.transitStatusCopy}>
                  <strong>In transit</strong>
                  <span>
                    {locationForm.currentName || "Unknown origin"} to{" "}
                    {locationForm.nextName || "Unknown destination"}
                  </span>
                </div>
                <Form.Group controlId="trailer-transit-arrival-date">
                  <Form.Label>Actual arrival date</Form.Label>
                  <Form.Control
                    type="date"
                    value={locationForm.transitArrivalDate || ""}
                    onChange={(event) =>
                      setLocationForm((prev) => ({
                        ...prev,
                        transitArrivalDate: event.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </div>
            )}
            <div className={styles.locationGrid}>
              <div className={styles.locationGroupHeading}>
                <span>Current stay</span>
                <TrailerProvenanceBadge
                  provenance={activeTrailer?.locationCurrentProvenance}
                />
              </div>
              <Form.Group controlId="trailer-current-location-client">
                <Form.Label>Location / client</Form.Label>
                <div className={styles.clientPicker}>
                  <Form.Control
                    type="text"
                    placeholder="Search and select a Client DB record"
                    value={currentClientSearch}
                    onFocus={() => setActiveClientPicker("current")}
                    onChange={(event) => {
                      const value = event.target.value;
                      setCurrentClientSearch(value);
                      setActiveClientPicker("current");
                      setLocationForm((prev) => ({
                        ...prev,
                        currentClientId: "",
                        currentName: value,
                      }));
                    }}
                    onBlur={() =>
                      window.setTimeout(() => setActiveClientPicker(null), 120)
                    }
                  />
                  {activeClientPicker === "current" && (
                    <div className={styles.clientPickerMenu}>
                      {filterLocationClients(currentClientSearch).length === 0 ? (
                        <div className={styles.clientPickerEmpty}>No clients found</div>
                      ) : (
                        filterLocationClients(currentClientSearch).map((client) => (
                          <button
                            key={client.id}
                            type="button"
                            className={styles.clientPickerOption}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleCurrentLocationClientSelect(client)}
                          >
                            <span>{client.name}</span>
                            <small>{getClientLocationText(client) || "No location"}</small>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </Form.Group>
              <Form.Group controlId="trailer-current-location-address">
                <Form.Label>Client DB address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unknown"
                  value={locationForm.currentClientLocation || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="trailer-current-arrival-date">
                <Form.Label>Arrival date</Form.Label>
                <Form.Control
                  type="date"
                  value={locationForm.currentArrivalDate}
                  onChange={(event) => {
                    const value = event.target.value;
                    setLocationForm((prev) => ({
                      ...prev,
                      currentArrivalDate: value,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group controlId="trailer-current-departure-date">
                <Form.Label>Planned departure</Form.Label>
                <Form.Control
                  type="date"
                  value={locationForm.currentDepartureDate}
                  onChange={(event) => {
                    const value = event.target.value;
                    setLocationForm((prev) => ({
                      ...prev,
                      currentDepartureDate: value,
                    }));
                  }}
                />
              </Form.Group>
              <div className={styles.locationGroupHeading}>Move trailer</div>
              <Form.Group controlId="trailer-next-location-client">
                <Form.Label>Destination / client</Form.Label>
                <div className={styles.clientPicker}>
                  <Form.Control
                    type="text"
                    placeholder="Search and select a Client DB record"
                    value={nextClientSearch}
                    onFocus={() => setActiveClientPicker("next")}
                    onChange={(event) => {
                      const value = event.target.value;
                      setNextClientSearch(value);
                      setActiveClientPicker("next");
                      setLocationForm((prev) => ({
                        ...prev,
                        nextClientId: "",
                        nextName: value,
                      }));
                    }}
                    onBlur={() =>
                      window.setTimeout(() => setActiveClientPicker(null), 120)
                    }
                  />
                  {activeClientPicker === "next" && (
                    <div className={styles.clientPickerMenu}>
                      {filterLocationClients(nextClientSearch).length === 0 ? (
                        <div className={styles.clientPickerEmpty}>
                          No clients found
                        </div>
                      ) : (
                        filterLocationClients(nextClientSearch).map((client) => (
                          <button
                            key={client.id}
                            type="button"
                            className={styles.clientPickerOption}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleNextLocationClientSelect(client)}
                          >
                            <span>{client.name}</span>
                            <small>
                              {getClientLocationText(client) || "No location"}
                            </small>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </Form.Group>
              <Form.Group controlId="trailer-next-location-address">
                <Form.Label>Destination Client DB address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unknown"
                  value={locationForm.nextClientLocation || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="trailer-transit-departure-date">
                <Form.Label>Transit departure date</Form.Label>
                <Form.Control
                  type="date"
                  value={locationForm.transitDepartureDate || ""}
                  onChange={(event) =>
                    setLocationForm((prev) => ({
                      ...prev,
                      transitDepartureDate: event.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="trailer-transit-expected-arrival-date">
                <Form.Label>Expected arrival date</Form.Label>
                <Form.Control
                  type="date"
                  value={locationForm.transitExpectedArrivalDate || ""}
                  onChange={(event) =>
                    setLocationForm((prev) => ({
                      ...prev,
                      transitExpectedArrivalDate: event.target.value,
                    }))
                  }
                />
              </Form.Group>
            </div>

            <div className={styles.locationHistoryHeader}>
              <span>
                Previous locations ({locationForm.history.length})
              </span>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={handleAddLocationHistory}
              >
                Add previous location
              </Button>
            </div>
            <div className={styles.locationHistoryList}>
              {locationForm.history.length === 0 ? (
                <div className={styles.locationEmpty}>
                  No previous locations recorded. Add one whenever you need to
                  correct or complete the timeline.
                </div>
              ) : (
                locationForm.history.map((entry, index) => {
                  return (
                    <div
                      key={`history-${index}`}
                      className={styles.locationHistoryItem}
                    >
                      <Form.Group controlId={`trailer-history-client-${index}`}>
                        <Form.Label className={styles.locationLabelWithBadge}>
                          <span>Location / client</span>
                          <TrailerProvenanceBadge provenance={entry.provenance} />
                        </Form.Label>
                        <div className={styles.clientPicker}>
                          <Form.Control
                            type="text"
                            placeholder="Search and select a Client DB record"
                            value={historyClientSearches[index] ?? entry.clientName ?? ""}
                            onFocus={() => setActiveClientPicker(`history-${index}`)}
                            onChange={(event) => {
                              const value = event.target.value;
                              setHistoryClientSearches((prev) => ({
                                ...prev,
                                [index]: value,
                              }));
                              setActiveClientPicker(`history-${index}`);
                              handleLocationHistoryChange(index, "clientId", "");
                              handleLocationHistoryChange(index, "clientName", value);
                            }}
                            onBlur={() =>
                              window.setTimeout(() => setActiveClientPicker(null), 120)
                            }
                          />
                          {activeClientPicker === `history-${index}` && (
                            <div className={styles.clientPickerMenu}>
                              {filterLocationClients(
                                historyClientSearches[index] ?? entry.clientName ?? ""
                              ).length === 0 ? (
                                <div className={styles.clientPickerEmpty}>
                                  No clients found
                                </div>
                              ) : (
                                filterLocationClients(
                                  historyClientSearches[index] ?? entry.clientName ?? ""
                                ).map((client) => (
                                  <button
                                    key={client.id}
                                    type="button"
                                    className={styles.clientPickerOption}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() =>
                                      handleHistoryLocationClientSelect(index, client)
                                    }
                                  >
                                    <span>{client.name}</span>
                                    <small>
                                      {getClientLocationText(client) || "No location"}
                                    </small>
                                  </button>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      </Form.Group>
                      <Form.Group
                        controlId={`trailer-history-location-${index}`}
                      >
                        <Form.Label>Client DB address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Unknown"
                          value={entry.clientLocation || ""}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group controlId={`trailer-history-arrival-${index}`}>
                        <Form.Label>Arrival</Form.Label>
                        <Form.Control
                          type="date"
                          value={entry.arrivalDate || ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            handleLocationHistoryChange(index, "arrivalDate", value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId={`trailer-history-departure-${index}`}>
                        <Form.Label>Departure</Form.Label>
                        <Form.Control
                          type="date"
                          value={entry.departureDate || ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            handleLocationHistoryChange(index, "departureDate", value);
                          }}
                        />
                      </Form.Group>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleRemoveLocationHistory(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className={styles.assocTableCard}>
            <div className={styles.assocTableHeader}>
              Associated Parts
              <span className={styles.assocTableHint}>Click + hold to move</span>
            </div>
            <div className={styles.assocTableWrap}>
              <Table striped bordered hover size="sm" className={styles.assocTable}>
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
                <tbody>{associatedPartsRows}</tbody>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() =>
              openTrailerPage(activeTrailer?.persistId || activeTrailer?.id)
            }
            disabled={actionBusy}
          >
            View
          </Button>
          <Button variant="warning" onClick={handleStartMove} disabled={actionBusy}>
            {actionBusy ? "Moving..." : "Move"}
          </Button>
          <Button
            variant="secondary"
            onClick={closeActiveTrailerModal}
            disabled={actionBusy}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showList}
        onHide={() => {
          setShowList(false);
          setShowAddTrailerModal(false);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Trailer List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}

          <div className={styles.listTools}>
            <InputGroup>
              <InputGroup.Text>Search</InputGroup.Text>
              <Form.Control
                value={searchTerm}
                placeholder="Trailer number or ID"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </InputGroup>
            <Form.Check
              type="switch"
              id="lf-only-toggle"
              label="LF trailers"
              checked={lfOnly}
              onChange={(event) => setLfOnly(event.target.checked)}
            />
          </div>

          <div className={styles.tableWrap}>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>Trailer</th>
                  <th>Location From</th>
                  <th>Location Current</th>
                  <th>Next Location</th>
                  <th className={styles.viewCol}>View</th>
                  <th className={styles.deleteCol}>Delete</th>
                </tr>
              </thead>
              <tbody>{trailerListRows}</tbody>
            </Table>
          </div>
          <div className={styles.listFooterActions}>
            <Button
              variant="primary"
              onClick={() => {
                resetNewTrailerForm();
                setShowAddTrailerModal(true);
              }}
            >
              Add Trailer
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddTrailerModal}
        onHide={() => {
          setShowAddTrailerModal(false);
          resetNewTrailerForm();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTrailer} className={styles.createForm}>
            <div className={styles.createGrid}>
              <Form.Group controlId="create-trailer-number">
                <Form.Label>Trailer Number</Form.Label>
                <Form.Control
                  value={newTrailerNumber}
                  onChange={(event) => setNewTrailerNumber(event.target.value)}
                  placeholder="Number (e.g. 25)"
                  type="number"
                  min="1"
                />
              </Form.Group>

              <Form.Group controlId="create-trailer-name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={newTrailerName}
                  onChange={(event) => setNewTrailerName(event.target.value)}
                  placeholder="Trailer name (default: AIS#)"
                />
              </Form.Group>

              <Form.Group controlId="create-trailer-location-from">
                <Form.Label>Location From</Form.Label>
                <Form.Control
                  as="select"
                  value={newTrailerLocationFromId}
                  onChange={(event) => setNewTrailerLocationFromId(event.target.value)}
                  disabled={isLoadingCreateOptions}
                >
                  <option value="">None selected</option>
                  {clientOptions.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name || client.id}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="create-trailer-location-current">
                <Form.Label>Location Current</Form.Label>
                <Form.Control
                  as="select"
                  value={newTrailerLocationCurrentId || SOCAL_CLIENT_ID}
                  onChange={(event) =>
                    setNewTrailerLocationCurrentId(event.target.value)
                  }
                  disabled={isLoadingCreateOptions}
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

              <Form.Group controlId="create-trailer-location-next">
                <Form.Label>Next Location</Form.Label>
                <Form.Control
                  as="select"
                  value={newTrailerLocationNextId}
                  onChange={(event) =>
                    setNewTrailerLocationNextId(event.target.value)
                  }
                  disabled={isLoadingCreateOptions}
                >
                  <option value="">None selected</option>
                  {clientOptions.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name || client.id}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="create-trailer-model">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  value={newTrailerModel}
                  onChange={(event) => setNewTrailerModel(event.target.value)}
                  placeholder="Model"
                />
              </Form.Group>

              <Form.Group controlId="create-trailer-vin">
                <Form.Label>VIN</Form.Label>
                <Form.Control
                  value={newTrailerVin}
                  onChange={(event) => setNewTrailerVin(event.target.value)}
                  placeholder="VIN"
                />
              </Form.Group>

              <Form.Group controlId="create-trailer-associated-machine">
                <Form.Label>Associated Machine</Form.Label>
                <Form.Control
                  as="select"
                  value={newTrailerAssociatedMachineId}
                  onChange={(event) =>
                    setNewTrailerAssociatedMachineId(event.target.value)
                  }
                  disabled={isLoadingCreateOptions}
                >
                  <option value="">None selected</option>
                  {machineOptions.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.id} - {machine.name || "Unnamed Machine"}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div className={styles.createActions}>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
              {isLoadingCreateOptions && (
                <span className={styles.infoText}>Loading options...</span>
              )}
              {createError && <span className={styles.inlineError}>{createError}</span>}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
