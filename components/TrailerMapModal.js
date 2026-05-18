import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Button, Form, InputGroup, Table, Alert } from "react-bootstrap";
import firebase from "../context/Firebase";
import { fetchClients } from "../utils/fetchAssociations";
import {
  fetchAssociatedPartsForMachine,
  formatPartDate,
} from "../utils/fetchAssociatedPartsForMachine";
import styles from "./TrailerMapModal.module.css";

const RETURN_TO_MAIN_SEARCH = "/NewSearch/mainSearch?showTrailerMap=1";
const MONDAY_TRAILER_DRAG_TYPE = "application/x-ais-monday-trailer";
const LAYOUT_STORAGE_KEY = "trailerMapLayoutOverridesV2";
const LAYOUT_STORAGE_BACKUP_KEY = "trailerMapLayoutOverridesV2:backup";
const TRAILER_LAYOUT_DOC_ID = "layout_meta";
const LAYOUT_OVERRIDES_VERSION = 2;
const ROTATE_STEP_DEGREES = 45;
const ROTATE_STEP_OPTIONS = [45, 22.5];
const TRAILER_CLIENT_ID = "AIS62854";
const SOCAL_CLIENT_ID = "AIS17182";
const SOCAL_LOCATION_NAME = "socal";

const SLOT_RECT = { w: 8, h: 18 };

const LF_MAP_SLOTS_BASE = [
  // Canonical LF layout (matches the intended host layout)
  { slot: 9, x: 10, y: 2, r: -22.5 },
  { slot: 17, x: 20, y: 2, r: -22.5 },
  { slot: 6, x: 30, y: 2, r: -22.5 },
  { slot: 24, x: 40, y: 2, r: -22.5 },
  { slot: 73, x: 50, y: 2, r: -22.5 },
  { slot: 15, x: 60, y: 2 },
  { slot: 11, x: 69, y: 2 },
  { slot: 46, x: 69, y: 24 },
  { slot: 47, x: 79, y: 45 },
  { slot: 23, x: 88, y: 45 },
  { slot: 28, x: 88, y: 66 },
  { slot: 36, x: 2, y: 30 },
  { slot: 25, x: 2, y: 41 },
];

// Unnumbered placeholders from the hand-drawn layout.
const LF_MAP_PLACEHOLDERS_BASE = [
  { key: "p-a", x: 79, y: 2 },
  { key: "p-b", x: 79, y: 24 },
  { key: "p-c", x: 88, y: 24 },
];

function withUniformRect(entry) {
  return {
    ...entry,
    w: SLOT_RECT.w,
    h: SLOT_RECT.h,
    r: Number.isFinite(entry.r) ? entry.r : 0,
  };
}

const LF_MAP_SLOTS = LF_MAP_SLOTS_BASE.map(withUniformRect);
const LF_MAP_PLACEHOLDERS = LF_MAP_PLACEHOLDERS_BASE.map(withUniformRect);
const SLOT_NUMBER_SET = new Set(LF_MAP_SLOTS.map((slot) => slot.slot));

function cloneOverrides(overrides = {}) {
  const toFiniteNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };
  const cloned = {};
  Object.entries(overrides || {}).forEach(([key, value]) => {
    if (!value || typeof value !== "object") return;
    const next = {};
    const x = toFiniteNumber(value.x);
    const y = toFiniteNumber(value.y);
    const r = toFiniteNumber(value.r);
    const w = toFiniteNumber(value.w);
    const h = toFiniteNumber(value.h);
    const slot = toFiniteNumber(value.slot);
    if (x !== null) next.x = x;
    if (y !== null) next.y = y;
    if (r !== null) next.r = r;
    if (w !== null) next.w = w;
    if (h !== null) next.h = h;
    if (slot !== null) next.slot = slot;
    if (value.deleted === true) next.deleted = true;
    if (value.custom === true) next.custom = true;
    if (Object.keys(next).length > 0) {
      cloned[key] = next;
    }
  });
  return cloned;
}

function extractTrailerNumber(value) {
  if (!value) return null;
  const match = String(value).match(/(\d+)/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeSlot(value) {
  const slot = Number(value);
  if (!Number.isFinite(slot)) return null;
  if (!SLOT_NUMBER_SET.has(slot)) return null;
  return slot;
}

function normalizePersistedSlot(value) {
  const slot = Number(value);
  if (!Number.isFinite(slot) || slot <= 0) return null;
  return slot;
}

function isTrailerDocId(value) {
  return /^AIS\d+/i.test(String(value || "").trim());
}

function buildTrailerDocIdFromMondayBoardName(name, boardId = "") {
  const normalized = String(name || "")
    .trim()
    .replace(/[\/\\#?[\]]+/g, "-")
    .replace(/\s+/g, " ")
    .slice(0, 120);
  if (/^AIS\d+/i.test(normalized)) return normalized;
  return boardId ? `monday-${boardId}` : "";
}

function readLocalLayoutOverrides() {
  if (typeof window === "undefined") return {};
  const parseStoredOverrides = (raw) => {
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const version = Number(parsed.layoutVersion);
    const payload =
      parsed && typeof parsed === "object" && parsed.layoutOverrides
        ? parsed.layoutOverrides
        : null;
    if (version !== LAYOUT_OVERRIDES_VERSION) return {};
    if (!payload || typeof payload !== "object") return {};
    return cloneOverrides(payload);
  };
  try {
    const primary = parseStoredOverrides(
      window.localStorage.getItem(LAYOUT_STORAGE_KEY)
    );
    if (Object.keys(primary).length > 0) return primary;
  } catch (error) {
    // try backup
  }
  try {
    return parseStoredOverrides(window.localStorage.getItem(LAYOUT_STORAGE_BACKUP_KEY));
  } catch (error) {
    return {};
  }
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

function getClientLocationText(client) {
  return String(
    client?.location ||
      client?.local ||
      client?.address ||
      client?.city ||
      client?.Location ||
      ""
  ).trim();
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

function sortLocationHistory(entries = []) {
  return [...entries].sort((a, b) => {
    const aTime = new Date(a.arrivalDate || "").getTime() || 0;
    const bTime = new Date(b.arrivalDate || "").getTime() || 0;
    return bTime - aTime;
  });
}

function getTrailerDisplayNumber(trailer, fallbackSlotNumber) {
  if (trailer?.id) {
    const match = String(trailer.id).match(/(\d+)/);
    if (match) return match[1];
  }
  if (Number.isFinite(trailer?.number)) return String(trailer.number);
  return String(fallbackSlotNumber);
}

function normalizeTrailerDoc(docSnap) {
  const data = docSnap.data() || {};
  const number = extractTrailerNumber(data.mondayBoardName || data.name || docSnap.id);
  const explicitSlot = normalizePersistedSlot(data.lfSlot);
  const inferredSlot = normalizeSlot(number);
  const slot = explicitSlot ?? (data.lfOnMap === false ? null : inferredSlot);
  const lfOnMap = data.lfOnMap === false ? false : Number.isFinite(slot);

  const locationFromId = String(data.locationFromId || "").trim();
  const locationFromName = String(
    data.locationFromName || data.locationFrom || ""
  ).trim();
  const rawCurrentId = String(data.locationCurrentId || "").trim();
  const rawCurrentName = String(
    data.locationCurrentName || data.locationCurrent || data.location || ""
  ).trim();
  const locationCurrentId = rawCurrentId || SOCAL_CLIENT_ID;
  const locationCurrentName = rawCurrentName || SOCAL_LOCATION_NAME;
  const locationCurrentClientLocation = String(
    data.locationCurrentClientLocation || data.locationCurrentLocation || ""
  ).trim();
  const locationCurrentArrivalDate = toDateInputValue(
    data.locationCurrentArrivalDate || data.currentLocationArrivalDate
  );
  const locationCurrentDepartureDate = toDateInputValue(
    data.locationCurrentDepartureDate || data.currentLocationDepartureDate
  );
  const locationHistory = sortLocationHistory(
    Array.isArray(data.locationHistory)
      ? data.locationHistory.map((entry) => ({
          clientId: String(entry?.clientId || "").trim(),
          clientName: String(entry?.clientName || "").trim(),
          clientLocation: String(entry?.clientLocation || "").trim(),
          arrivalDate: toDateInputValue(entry?.arrivalDate),
          departureDate: toDateInputValue(entry?.departureDate),
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
    locationHistory,
    model: String(data.model || "").trim(),
    vin: String(data.vin || "").trim(),
    associatedMachineId:
      String(data.associatedMachineId || "").trim() ||
      getRefId(data.associatedMachine),
    lfSlot: slot,
    lfOnMap,
    updatedAt: data.updatedAt || data.createdAt || null,
  };
}

function buildCanonicalTrailers(rawTrailers = []) {
  const byId = new Map();
  const byNumber = new Map();

  rawTrailers.forEach((trailer) => {
    byId.set(String(trailer.id || "").toUpperCase(), trailer);
    if (Number.isFinite(trailer.number) && !byNumber.has(trailer.number)) {
      byNumber.set(trailer.number, trailer);
    }
  });

  const canonical = Array.from(SLOT_NUMBER_SET)
    .sort((a, b) => a - b)
    .map((slotNumber) => {
      const canonicalId = `AIS${slotNumber}`;
      const fromCanonicalId = byId.get(canonicalId.toUpperCase()) || null;
      const fromNumber = byNumber.get(slotNumber) || null;
      const source = fromCanonicalId || fromNumber || null;

      return {
        id: canonicalId,
        sourceId: source?.id || canonicalId,
        persistId: source?.id || canonicalId,
        existsInDb: Boolean(source),
        number: slotNumber,
        name: canonicalId,
        locationFromId: source?.locationFromId || "",
        locationFromName: source?.locationFromName || "",
        locationCurrentId: source?.locationCurrentId || SOCAL_CLIENT_ID,
        locationCurrentName: source?.locationCurrentName || SOCAL_LOCATION_NAME,
        locationCurrentClientLocation: source?.locationCurrentClientLocation || "",
        locationCurrentArrivalDate: source?.locationCurrentArrivalDate || "",
        locationCurrentDepartureDate: source?.locationCurrentDepartureDate || "",
        locationHistory: source?.locationHistory || [],
        model: source?.model || "",
        vin: source?.vin || "",
        associatedMachineId: source?.associatedMachineId || "",
        lfSlot: source ? source.lfSlot : slotNumber,
        lfOnMap: source ? source.lfOnMap : true,
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
    if (Number.isFinite(trailer.number) && SLOT_NUMBER_SET.has(trailer.number)) {
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
  const socalSyncDoneRef = useRef(false);
  const layoutSeedAttemptedRef = useRef(false);
  const layoutLockedRef = useRef(true);
  const layoutHydratedRef = useRef(false);
  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [showList, setShowList] = useState(false);
  const [showMondayBoards, setShowMondayBoards] = useState(false);
  const [mondayBoards, setMondayBoards] = useState([]);
  const [mondayBoardFolders, setMondayBoardFolders] = useState([]);
  const [collapsedMondayFolders, setCollapsedMondayFolders] = useState({});
  const [hoveredTrailerNumber, setHoveredTrailerNumber] = useState(null);
  const [mondayBoardsLoading, setMondayBoardsLoading] = useState(false);
  const [mondayBoardsError, setMondayBoardsError] = useState("");
  const [showAddTrailerModal, setShowAddTrailerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lfOnly, setLfOnly] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [activeTrailerParts, setActiveTrailerParts] = useState([]);
  const [activeTrailerPartsLoading, setActiveTrailerPartsLoading] = useState(false);
  const [activeTrailerPartsError, setActiveTrailerPartsError] = useState("");
  const [activePartsDragIndex, setActivePartsDragIndex] = useState(null);
  const [activePartsDragOverIndex, setActivePartsDragOverIndex] = useState(null);
  const [locationForm, setLocationForm] = useState({
    currentClientId: "",
    currentArrivalDate: "",
    currentDepartureDate: "",
    history: [],
  });
  const [currentClientSearch, setCurrentClientSearch] = useState("");
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
  const [newTrailerModel, setNewTrailerModel] = useState("");
  const [newTrailerVin, setNewTrailerVin] = useState("");
  const [newTrailerAssociatedMachineId, setNewTrailerAssociatedMachineId] =
    useState("");
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingCreateOptions, setIsLoadingCreateOptions] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);
  const [machineOptions, setMachineOptions] = useState([]);
  const [deleteError, setDeleteError] = useState("");
  const [layoutLocked, setLayoutLocked] = useState(true);
  const [savedLayoutOverrides, setSavedLayoutOverrides] = useState({});
  const [draftLayoutOverrides, setDraftLayoutOverrides] = useState({});
  const [unlockBaselineOverrides, setUnlockBaselineOverrides] = useState({});
  const [selectedLayoutKey, setSelectedLayoutKey] = useState(null);
  const [rotateStep, setRotateStep] = useState(ROTATE_STEP_DEGREES);
  const [lockedSwapDrag, setLockedSwapDrag] = useState(null);
  const [isSavingLayout, setIsSavingLayout] = useState(false);

  const syncMondayBoardsToFirebase = useCallback(async (folders = []) => {
    const db = firebase.firestore();
    const batch = db.batch();
    const now = firebase.firestore.FieldValue.serverTimestamp();
    let writes = 0;

    (folders || []).forEach((folder) => {
      (folder.boards || []).forEach((board) => {
        const docId = buildTrailerDocIdFromMondayBoardName(board.name, board.id);
        if (!docId) return;
        const number = extractTrailerNumber(board.name);
        batch.set(
          db.collection("Trailers").doc(docId),
          {
            name: board.name,
            mondayBoardId: board.id,
            mondayBoardName: board.name,
            mondayFolderId: folder.id || "",
            mondayFolderName: folder.name || "",
            number,
            source: "monday",
            updatedFromMondayAt: now,
            updatedAt: now,
          },
          { merge: true }
        );
        writes += 1;
      });
    });

    if (writes > 0) {
      await batch.commit();
    }
  }, []);

  useEffect(() => {
    layoutLockedRef.current = layoutLocked;
  }, [layoutLocked]);

  useEffect(() => {
    const localOverrides = readLocalLayoutOverrides();
    if (Object.keys(localOverrides).length > 0) {
      setSavedLayoutOverrides(localOverrides);
      setDraftLayoutOverrides(localOverrides);
    }
    layoutHydratedRef.current = true;
  }, []);

  const resetNewTrailerForm = useCallback(() => {
    setNewTrailerNumber("");
    setNewTrailerName("");
    setNewTrailerLocationFromId("");
    setNewTrailerLocationCurrentId(SOCAL_CLIENT_ID);
    setNewTrailerModel("");
    setNewTrailerVin("");
    setNewTrailerAssociatedMachineId("");
    setCreateError("");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!layoutHydratedRef.current) return;
    try {
      const previous = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (previous) {
        window.localStorage.setItem(LAYOUT_STORAGE_BACKUP_KEY, previous);
      }
      window.localStorage.setItem(
        LAYOUT_STORAGE_KEY,
        JSON.stringify({
          layoutVersion: LAYOUT_OVERRIDES_VERSION,
          layoutOverrides: savedLayoutOverrides || {},
        })
      );
    } catch (error) {
      // ignore storage write failures
    }
  }, [savedLayoutOverrides]);

  useEffect(() => {
    if (!show) return undefined;

    setIsLoading(true);
    setLoadError("");
    socalSyncDoneRef.current = false;
    const unsubscribe = firebase
      .firestore()
      .collection("Trailers")
      .onSnapshot(
        (snapshot) => {
          const layoutDoc = snapshot.docs.find(
            (doc) => doc.id === TRAILER_LAYOUT_DOC_ID
          );
          const remoteData = layoutDoc?.data() || {};
          const hasValidRemoteVersion =
            Number(remoteData.layoutVersion) === LAYOUT_OVERRIDES_VERSION;
          const remoteOverrides = hasValidRemoteVersion
            ? cloneOverrides(remoteData.layoutOverrides || {})
            : {};
          const hasRemoteOverrides = Object.keys(remoteOverrides).length > 0;
          if (hasRemoteOverrides) {
            layoutSeedAttemptedRef.current = true;
            setSavedLayoutOverrides(remoteOverrides);
            if (layoutLockedRef.current) {
              setDraftLayoutOverrides(remoteOverrides);
            }
          } else {
            const localOverrides = readLocalLayoutOverrides();
            if (Object.keys(localOverrides).length > 0) {
              setSavedLayoutOverrides(localOverrides);
              if (layoutLockedRef.current) {
                setDraftLayoutOverrides(localOverrides);
              }
            } else {
              setSavedLayoutOverrides({});
              if (layoutLockedRef.current) {
                setDraftLayoutOverrides({});
              }
            }
          }

          const trailerDocs = snapshot.docs.filter((doc) => isTrailerDocId(doc.id));
          const normalized = trailerDocs.map(normalizeTrailerDoc);
          const canonical = buildCanonicalTrailers(normalized);
          setTrailers(canonical);
          if (!socalSyncDoneRef.current) {
            socalSyncDoneRef.current = true;
            const docsToSync = trailerDocs.filter((doc) => {
              const data = doc.data() || {};
              const currentId = String(data.locationCurrentId || "").trim();
              const currentName = String(
                data.locationCurrentName || data.locationCurrent || data.location || ""
              )
                .trim()
                .toLowerCase();
              return (
                currentId !== SOCAL_CLIENT_ID ||
                currentName !== SOCAL_LOCATION_NAME
              );
            });

            if (docsToSync.length) {
              const db = firebase.firestore();
              const batch = db.batch();
              docsToSync.forEach((doc) => {
                batch.set(
                  db.collection("Trailers").doc(doc.id),
                  {
                    locationCurrentId: SOCAL_CLIENT_ID,
                    locationCurrentName: SOCAL_LOCATION_NAME,
                    locationCurrent: SOCAL_LOCATION_NAME,
                    location: SOCAL_LOCATION_NAME,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                  },
                  { merge: true }
                );
              });
              batch.commit().catch((error) => {
                console.error("Failed to sync trailer current location to SoCal", error);
              });
            }
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Failed to load trailers", error);
          setLoadError("Failed to load trailers.");
          setIsLoading(false);
        }
      );

    return () => unsubscribe();
  }, [show]);

  useEffect(() => {
    if (!show) {
      setShowList(false);
      setShowMondayBoards(false);
      setMondayBoardsError("");
      setCollapsedMondayFolders({});
      setHoveredTrailerNumber(null);
      mondayBoardDragRef.current = null;
      setShowAddTrailerModal(false);
      setSearchTerm("");
      setLfOnly(false);
      setActiveTrailer(null);
      setActiveSlot(null);
      setActiveTrailerParts([]);
      setActiveTrailerPartsLoading(false);
      setActiveTrailerPartsError("");
      setActivePartsDragIndex(null);
      setActivePartsDragOverIndex(null);
      setLocationForm({
        currentClientId: "",
        currentArrivalDate: "",
        currentDepartureDate: "",
        history: [],
      });
      setCurrentClientSearch("");
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
    if (!show || !showMondayBoards) return undefined;
    if (mondayBoards.length) return undefined;

    let cancelled = false;
    const loadMondayBoards = async () => {
      setMondayBoardsLoading(true);
      setMondayBoardsError("");
      try {
        const idToken = await firebase.auth().currentUser?.getIdToken();
        const response = await fetch(`/api/monday/trailer-boards?ts=${Date.now()}`, {
          cache: "no-store",
          headers: {
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload?.error || "Failed to load Monday boards.");
        }
        if (!cancelled) {
          setMondayBoards(Array.isArray(payload.boards) ? payload.boards : []);
          const folders = Array.isArray(payload.folders) ? payload.folders : [];
          setMondayBoardFolders(folders);
          syncMondayBoardsToFirebase(folders).catch((error) => {
            console.error("Failed to sync Monday boards to Firebase:", error);
          });
        }
      } catch (error) {
        if (!cancelled) {
          setMondayBoardsError(error?.message || "Failed to load Monday boards.");
        }
      } finally {
        if (!cancelled) setMondayBoardsLoading(false);
      }
    };

    loadMondayBoards();
    return () => {
      cancelled = true;
    };
  }, [show, showMondayBoards, syncMondayBoardsToFirebase]);

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
    const history = sortLocationHistory(activeTrailer.locationHistory || []);
    setLocationForm({
      currentClientId: activeTrailer.locationCurrentId || SOCAL_CLIENT_ID,
      currentArrivalDate: activeTrailer.locationCurrentArrivalDate || "",
      currentDepartureDate: activeTrailer.locationCurrentDepartureDate || "",
      history,
    });
    setCurrentClientSearch(activeTrailer.locationCurrentName || "");
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
    const associatedMachineId = String(activeTrailer?.associatedMachineId || "").trim();
    if (!activeTrailer || !associatedMachineId) {
      setActiveTrailerParts([]);
      setActiveTrailerPartsLoading(false);
      setActiveTrailerPartsError("");
      setActivePartsDragIndex(null);
      setActivePartsDragOverIndex(null);
      return undefined;
    }

    let cancelled = false;
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
  }, [activeTrailer?.associatedMachineId, activeTrailer?.id]);

  const slotAssignments = useMemo(() => {
    const assignment = {};
    const ordered = [...trailers].sort(
      (a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt)
    );
    ordered.forEach((trailer) => {
      if (!trailer.lfOnMap) return;
      const slot = normalizePersistedSlot(trailer.lfSlot);
      if (slot == null) return;
      if (!assignment[slot]) {
        assignment[slot] = trailer;
      }
    });
    return assignment;
  }, [trailers]);

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
      const numberMatch =
        numberQuery.length > 0 &&
        String(trailer.number == null ? "" : trailer.number).includes(numberQuery);
      return idMatch || numberMatch;
    });
  }, [lfOnly, searchTerm, trailers]);

  const activeLayoutOverrides = layoutLocked
    ? savedLayoutOverrides
    : draftLayoutOverrides;

  const positionedSlots = useMemo(() => {
    const baseSlots = LF_MAP_SLOTS.reduce((acc, slot) => {
      const key = `slot-${slot.slot}`;
      const override = activeLayoutOverrides[key] || {};
      if (override.deleted === true) return acc;
      acc.push({
        ...slot,
        key,
        x: Number.isFinite(override.x) ? override.x : slot.x,
        y: Number.isFinite(override.y) ? override.y : slot.y,
        w: Number.isFinite(override.w) ? override.w : slot.w,
        h: Number.isFinite(override.h) ? override.h : slot.h,
        r: Number.isFinite(override.r) ? override.r : slot.r,
        custom: false,
      });
      return acc;
    }, []);

    const customSlots = Object.entries(activeLayoutOverrides || {})
      .filter(([key, value]) => {
        return key.startsWith("slot-custom-") && value?.custom === true && value.deleted !== true;
      })
      .map(([key, value]) => ({
        key,
        slot: Number(value.slot),
        x: Number.isFinite(value.x) ? value.x : 4,
        y: Number.isFinite(value.y) ? value.y : 78,
        w: Number.isFinite(value.w) ? value.w : SLOT_RECT.w,
        h: Number.isFinite(value.h) ? value.h : SLOT_RECT.h,
        r: Number.isFinite(value.r) ? value.r : 0,
        custom: true,
      }))
      .filter((slot) => Number.isFinite(slot.slot));

    return [...baseSlots, ...customSlots];
  }, [activeLayoutOverrides]);

  useEffect(() => {
    positionedSlotsRef.current = positionedSlots;
  }, [positionedSlots]);

  const selectedLayoutSlot = useMemo(() => {
    if (!selectedLayoutKey) return null;
    return positionedSlots.find((slot) => slot.key === selectedLayoutKey) || null;
  }, [positionedSlots, selectedLayoutKey]);

  const positionedPlaceholders = useMemo(() => {
    return LF_MAP_PLACEHOLDERS.map((slot) => {
      const key = `placeholder-${slot.key}`;
      const override = activeLayoutOverrides[key];
      if (!override) return slot;
      return {
        ...slot,
        x: Number.isFinite(override.x) ? override.x : slot.x,
        y: Number.isFinite(override.y) ? override.y : slot.y,
        r: Number.isFinite(override.r) ? override.r : slot.r,
      };
    });
  }, [activeLayoutOverrides]);

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
    setIsSavingLayout(true);
    try {
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(TRAILER_LAYOUT_DOC_ID)
        .set(
          {
            layoutVersion: LAYOUT_OVERRIDES_VERSION,
            layoutOverrides: committed,
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
  }, []);

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
        LF_MAP_SLOTS.find((slot) => `slot-${slot.slot}` === selectedLayoutKey) ||
        LF_MAP_PLACEHOLDERS.find(
          (slot) => `placeholder-${slot.key}` === selectedLayoutKey
        );
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

      setIsApplyingMove(true);
      setMoveError("");
      try {
        await firebase
          .firestore()
          .collection("Trailers")
          .doc(trailer.persistId || trailer.id)
          .set(
            {
              lfOnMap: false,
              lfSlot: null,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      } catch (error) {
        console.error("Failed to clear trailer from slot", error);
        setMoveError("Could not clear trailer from slot. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
    },
    [isApplyingMove, slotAssignments]
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

  const swapLockedSlotAssignments = useCallback(
    async (sourceSlot, targetSlot) => {
      if (!layoutLocked) return;
      if (!sourceSlot || !targetSlot || sourceSlot === targetSlot) return;

      const sourceTrailer =
        slotAssignments[sourceSlot] || trailerByNumber[sourceSlot] || null;
      const targetTrailer =
        slotAssignments[targetSlot] || trailerByNumber[targetSlot] || null;
      if (!sourceTrailer || !targetTrailer) return;

      setIsApplyingMove(true);
      setMoveError("");
      try {
        const db = firebase.firestore();
        const batch = db.batch();
        const sourceRef = db.collection("Trailers").doc(sourceTrailer.id);
        const targetRef = db.collection("Trailers").doc(targetTrailer.id);

        batch.set(
          sourceRef,
          {
            name: sourceTrailer.id,
            lfOnMap: true,
            lfSlot: targetSlot,
            locationCurrentId: sourceTrailer.locationCurrentId || SOCAL_CLIENT_ID,
            locationCurrentName:
              sourceTrailer.locationCurrentName || SOCAL_LOCATION_NAME,
            locationCurrent:
              sourceTrailer.locationCurrentName || SOCAL_LOCATION_NAME,
            location: sourceTrailer.locationCurrentName || SOCAL_LOCATION_NAME,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        batch.set(
          targetRef,
          {
            name: targetTrailer.id,
            lfOnMap: true,
            lfSlot: sourceSlot,
            locationCurrentId: targetTrailer.locationCurrentId || SOCAL_CLIENT_ID,
            locationCurrentName:
              targetTrailer.locationCurrentName || SOCAL_LOCATION_NAME,
            locationCurrent:
              targetTrailer.locationCurrentName || SOCAL_LOCATION_NAME,
            location: targetTrailer.locationCurrentName || SOCAL_LOCATION_NAME,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        await batch.commit();
      } catch (error) {
        console.error("Failed to swap trailer slots", error);
        setMoveError("Could not swap trailers. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
    },
    [layoutLocked, slotAssignments, trailerByNumber]
  );

  const startLockedSlotSwapDrag = (event, slotNumber) => {
    if (!layoutLocked) return;
    if (!show || isApplyingMove || movingTrailer) return;
    const mapSurface = mapSurfaceRef.current;
    if (!mapSurface) return;
    if (!slotNumber) return;
    if (event.button !== 0) return;
    const sourceTrailer =
      slotAssignments[slotNumber] || trailerByNumber[slotNumber] || null;
    if (!sourceTrailer) return;

    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
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
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      slotSwapCleanupRef.current = null;
      setLockedSwapDrag(null);
    };

    const onUp = async (upEvent) => {
      cleanup();
      if (!didDrag) return;
      suppressNextSlotClickRef.current = true;
      const targetSlot =
        findSlotFromElement(upEvent.clientX, upEvent.clientY) ||
        findSlotAtClientPoint(upEvent.clientX, upEvent.clientY) ||
        findNearestSlotAtClientPoint(upEvent.clientX, upEvent.clientY);
      if (!targetSlot || targetSlot === slotNumber) return;
      await swapLockedSlotAssignments(slotNumber, targetSlot);
    };

    slotSwapCleanupRef.current = cleanup;
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
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
      const existing =
        trailerByMondayBoardId[board.id] ||
        trailers.find((trailer) => trailer.id === docId) ||
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
        number: extractTrailerNumber(board.name),
        name: board.name,
        mondayBoardId: board.id,
        mondayBoardName: board.name,
        mondayFolderId: folder?.id || "",
        mondayFolderName: folder?.name || "",
        locationFromId: "",
        locationFromName: "",
        locationCurrentId: SOCAL_CLIENT_ID,
        locationCurrentName: SOCAL_LOCATION_NAME,
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
    [trailerByMondayBoardId, trailers]
  );

  const getMondayTrailerForBoard = useCallback(
    (board) => {
      if (!board?.id) return null;
      const docId = buildTrailerDocIdFromMondayBoardName(board.name, board.id);
      return (
        trailerByMondayBoardId[board.id] ||
        trailers.find((trailer) => trailer.id === docId) ||
        null
      );
    },
    [trailerByMondayBoardId, trailers]
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

      if (sameTrailerAtDestination) return;

      setIsApplyingMove(true);
      setMoveError("");
      try {
        const db = firebase.firestore();
        const batch = db.batch();
        const movingRef = db.collection("Trailers").doc(existing?.persistId || docId);
        const movingNumber = extractTrailerNumber(board.name);

        batch.set(
          movingRef,
          {
            name: existing?.name || docId,
            number: Number.isFinite(movingNumber) ? movingNumber : existing?.number || null,
            mondayBoardId: board.id,
            mondayBoardName: board.name,
            mondayFolderId: folder?.id || existing?.mondayFolderId || "",
            mondayFolderName: folder?.name || existing?.mondayFolderName || "",
            source: existing?.source || "monday",
            lfOnMap: true,
            lfSlot: slotNumber,
            locationCurrentId: existing?.locationCurrentId || SOCAL_CLIENT_ID,
            locationCurrentName:
              existing?.locationCurrentName || SOCAL_LOCATION_NAME,
            locationCurrent:
              existing?.locationCurrentName || SOCAL_LOCATION_NAME,
            location:
              existing?.locationCurrentName || SOCAL_LOCATION_NAME,
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
                lfOnMap: true,
                lfSlot: sourceSlot,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } else {
            batch.set(
              destinationRef,
              {
                lfOnMap: false,
                lfSlot: null,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          }
        }

        await batch.commit();
      } catch (error) {
        console.error("Failed to assign Monday trailer to slot", error);
        setMoveError("Could not place trailer. Please try again.");
      } finally {
        setIsApplyingMove(false);
      }
    },
    [
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
    const boardTrailerNumber = extractTrailerNumber(board.name);
    const payload = {
      type: "monday-trailer-board",
      board,
      folder: folder ? { id: folder.id || "", name: folder.name || "" } : null,
    };
    mondayBoardDragRef.current = payload;
    setHoveredTrailerNumber(boardTrailerNumber);
    event.dataTransfer.effectAllowed = "move";
    const serializedPayload = JSON.stringify(payload);
    event.dataTransfer.setData(MONDAY_TRAILER_DRAG_TYPE, serializedPayload);
    event.dataTransfer.setData("application/json", serializedPayload);
    event.dataTransfer.setData("text/plain", serializedPayload);
  };

  const handleMondayBoardDragEnd = () => {
    setHoveredTrailerNumber(null);
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
    setHoveredTrailerNumber(slotNumber);
  };

  const handleTrailerSlotDrop = (slotNumber) => async (event) => {
    if (!layoutLocked) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextSlotClickRef.current = true;
    setHoveredTrailerNumber(null);

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
    setHoveredTrailerNumber(targetSlot);
  };

  const handleMapDrop = async (event) => {
    if (!layoutLocked) return;
    const targetSlot = findSlotAtDragPoint(event.clientX, event.clientY);
    if (!targetSlot) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextSlotClickRef.current = true;
    setHoveredTrailerNumber(null);

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

  const handleCurrentLocationClientSelect = (client) => {
    if (!client?.id) return;
    setLocationForm((prev) => ({
      ...prev,
      currentClientId: client.id,
    }));
    setCurrentClientSearch(client.name || "");
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
      const nextEntry = { ...current, [field]: value };
      if (field === "clientId") {
        const client = resolveClientForLocationForm(value);
        nextEntry.clientName = client?.name || "";
        nextEntry.clientLocation = getClientLocationText(client);
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
          arrivalDate: "",
          departureDate: "",
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
    const currentClientName =
      String(currentClient?.name || "").trim() || activeTrailer.locationCurrentName || "";
    const currentClientLocation = getClientLocationText(currentClient);
    const cleanHistory = sortLocationHistory(
      locationForm.history
        .map((entry) => {
          const client = resolveClientForLocationForm(entry.clientId);
          return {
            clientId: String(entry.clientId || "").trim(),
            clientName: String(client?.name || entry.clientName || "").trim(),
            clientLocation: String(
              getClientLocationText(client) || entry.clientLocation || ""
            ).trim(),
            arrivalDate: String(entry.arrivalDate || "").trim(),
            departureDate: String(entry.departureDate || "").trim(),
          };
        })
        .filter(
          (entry) => entry.clientId || entry.arrivalDate || entry.departureDate
        )
    );

    setIsSavingLocation(true);
    setLocationSaveError("");
    try {
      await firebase
        .firestore()
        .collection("Trailers")
        .doc(activeTrailer.persistId || activeTrailer.id)
        .set(
          {
            locationCurrentId: locationForm.currentClientId || "",
            locationCurrentName: currentClientName,
            locationCurrentClientLocation: currentClientLocation,
            locationCurrentArrivalDate: locationForm.currentArrivalDate || "",
            locationCurrentDepartureDate: locationForm.currentDepartureDate || "",
            locationCurrent: currentClientName,
            location: currentClientName,
            locationHistory: cleanHistory,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      setLocationForm((prev) => ({
        ...prev,
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
            lfOnMap: true,
            lfSlot: slotNumber,
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
                lfOnMap: true,
                lfSlot: restoreSlot,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } else {
            batch.set(
              destinationRef,
              {
                lfOnMap: false,
                lfSlot: null,
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

    const trailer = slotAssignments[slotNumber] || trailerByNumber[slotNumber] || null;
    if (!trailer) return;
    setActiveTrailer(trailer);
    setActiveSlot(slotNumber);
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
            lfOnMap: false,
            lfSlot: null,
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
    const fromClient = clientOptions.find((client) => client.id === locationFromId);
    const currentClient = clientOptions.find(
      (client) => client.id === locationCurrentId
    );
    const locationFromName = String(fromClient?.name || "").trim();
    const locationCurrentName =
      String(currentClient?.name || "").trim() || SOCAL_LOCATION_NAME;
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
          locationCurrent: locationCurrentName,
          location: locationCurrentName,
          model: String(newTrailerModel || "").trim(),
          vin: String(newTrailerVin || "").trim(),
          associatedMachineId,
          associatedMachine: associatedMachineId
            ? db.collection("Machine").doc(associatedMachineId)
            : null,
          lfOnMap: defaultSlot != null,
          lfSlot: defaultSlot,
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
            <td colSpan={5} className={styles.emptyRow}>
              No trailers found.
            </td>
          </tr>,
        ]
      : listTrailers.map((trailer) => (
          <tr key={trailer.id}>
            <td>{trailer.id}</td>
            <td>{getTrailerLocationFrom(trailer)}</td>
            <td>{getTrailerLocationCurrent(trailer)}</td>
            <td className={styles.viewCol}>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => openTrailerPage(trailer.id)}
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
          <Modal.Title>Trailer Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.toolbar}>
            <Button
              variant="outline-primary"
              onClick={() => setShowMondayBoards((value) => !value)}
              aria-label="Toggle Monday trailer menu"
              className={styles.menuButton}
            >
              <span aria-hidden="true">☰</span>
            </Button>
            <div className={styles.toolbarActions}>
              <div className={styles.mapTitleWrap}>
                <div className={styles.mapTitle}>Monday Boards</div>
              </div>
            </div>
          </div>

          {isLoading && <div className={styles.infoText}>Loading trailers...</div>}
          {loadError && <Alert variant="danger">{loadError}</Alert>}
          {moveError && <Alert variant="warning">{moveError}</Alert>}

          {movingTrailer && (
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
                  <span>Monday Boards</span>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setShowMondayBoards(false)}
                  >
                    x
                  </Button>
                </div>
                <div className={styles.boardsList}>
                  {mondayBoardsLoading ? (
                    <div className={styles.boardsState}>Loading boards...</div>
                  ) : mondayBoardsError ? (
                    <div className={styles.boardsError}>{mondayBoardsError}</div>
                  ) : mondayBoards.length === 0 ? (
                    <div className={styles.boardsState}>No boards found.</div>
                  ) : (
                    (mondayBoardFolders.length
                      ? mondayBoardFolders
                      : [{ id: "boards", name: "Boards", boards: mondayBoards }]
                    ).map((folder) => (
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
                              <div className={styles.emptyFolder}>No boards</div>
                            ) : (
                              (folder.boards || []).map((board) => {
                                const boardTrailerNumber = extractTrailerNumber(board.name);
                                const isLinkedHover =
                                  hoveredTrailerNumber != null &&
                                  boardTrailerNumber === hoveredTrailerNumber;

                                return (
                                  <button
                                    key={board.id}
                                    type="button"
                                    draggable={layoutLocked && !isApplyingMove && !movingTrailer}
                                    className={`${styles.boardItem} ${
                                      isLinkedHover ? styles.boardItemHighlighted : ""
                                    }`}
                                    onClick={() => openMondayTrailerModal(board, folder)}
                                    onDragStart={handleMondayBoardDragStart(board, folder)}
                                    onDragEnd={handleMondayBoardDragEnd}
                                    onMouseEnter={() =>
                                      setHoveredTrailerNumber(boardTrailerNumber)
                                    }
                                    onMouseLeave={() => setHoveredTrailerNumber(null)}
                                    onFocus={() =>
                                      setHoveredTrailerNumber(boardTrailerNumber)
                                    }
                                    onBlur={() => setHoveredTrailerNumber(null)}
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

            <div
              className={`${styles.mapFrame} ${
                lockedSwapDrag?.isDragging ? styles.lockedSwapDragging : ""
              }`}
            >
              <div
                className={styles.mapSurface}
                ref={mapSurfaceRef}
                onDragOver={handleMapDragOver}
                onDrop={handleMapDrop}
              >
              {positionedPlaceholders.map((slot) => (
                <div
                  key={slot.key}
                  className={`${styles.slotButton} ${styles.slotPlaceholder} ${
                    !layoutLocked ? styles.layoutEditable : ""
                  } ${
                    !layoutLocked && selectedLayoutKey === `placeholder-${slot.key}`
                      ? styles.selectedLayoutItem
                      : ""
                  }`}
                  style={{
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    width: `${slot.w}%`,
                    height: `${slot.h}%`,
                    transform: `rotate(${slot.r}deg)`,
                    pointerEvents: layoutLocked ? "none" : "auto",
                  }}
                  onClick={() =>
                    handleLayoutItemClick(`placeholder-${slot.key}`, null)
                  }
                  onMouseDown={(event) =>
                    startLayoutDrag(event, `placeholder-${slot.key}`, slot)
                  }
                />
              ))}
              {positionedSlots.map((slot) => {
                const trailer =
                  slotAssignments[slot.slot] || trailerByNumber[slot.slot] || null;
                const trailerNumber = Number.isFinite(trailer?.number)
                  ? trailer.number
                  : slot.slot;
                const isLinkedHover =
                  hoveredTrailerNumber != null &&
                  trailerNumber === hoveredTrailerNumber;
                return (
                  <button
                    key={slot.key || slot.slot}
                    type="button"
                    data-slot-number={slot.slot}
                    className={`${styles.slotButton} ${styles.slotEmpty} ${
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
                        : `Slot ${slot.slot}`
                    }
                    onMouseDown={(event) => {
                      if (layoutLocked) {
                        startLockedSlotSwapDrag(event, slot.slot);
                        return;
                      }
                      startLayoutDrag(event, slot.key || `slot-${slot.slot}`, slot);
                    }}
                    onMouseEnter={() => setHoveredTrailerNumber(trailerNumber)}
                    onMouseLeave={() => setHoveredTrailerNumber(null)}
                    onFocus={() => setHoveredTrailerNumber(trailerNumber)}
                    onBlur={() => setHoveredTrailerNumber(null)}
                    onDragOver={handleTrailerSlotDragOver(slot.slot)}
                    onDrop={handleTrailerSlotDrop(slot.slot)}
                  >
                    <span
                      className={styles.slotNumber}
                      style={{
                        transform: `rotate(${getUprightLabelRotation(slot.r)}deg)`,
                      }}
                    >
                      {trailer
                        ? getTrailerDisplayNumber(trailer, slot.slot)
                        : slot.custom
                        ? ""
                        : String(slot.slot)}
                    </span>
                  </button>
                );
              })}
              </div>
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
                  id="layout-lock-toggle"
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
          <Modal.Title>Trailer {activeTrailer?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.actionInfoRow}>
            <strong>Name:</strong> {activeTrailer?.id || "-"}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Location From:</strong> {getTrailerLocationFrom(activeTrailer)}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Location Current:</strong> {getTrailerLocationCurrent(activeTrailer)}
          </div>
          <div className={styles.actionInfoRow}>
            <strong>Associated Machine:</strong>{" "}
            {String(activeTrailer?.associatedMachineId || "").trim() || "-"}
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationHeader}>
              <div>
                <div className={styles.locationTitle}>Location</div>
                <div className={styles.locationSubtext}>
                  Track the current client location and previous stops.
                </div>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={handleSaveTrailerLocation}
                disabled={isSavingLocation || !activeTrailer?.existsInDb}
              >
                {isSavingLocation ? "Saving..." : "Save Location"}
              </Button>
            </div>
            {locationSaveError && (
              <Alert variant="warning" className={styles.locationAlert}>
                {locationSaveError}
              </Alert>
            )}
            <div className={styles.locationGrid}>
              <Form.Group controlId="trailer-current-location-client">
                <Form.Label>Current Client</Form.Label>
                <div className={styles.clientPicker}>
                  <Form.Control
                    type="text"
                    placeholder="Search clients"
                    value={currentClientSearch}
                    onFocus={() => setActiveClientPicker("current")}
                    onChange={(event) => {
                      const value = event.target.value;
                      setCurrentClientSearch(value);
                      setActiveClientPicker("current");
                      if (!value.trim()) {
                        setLocationForm((prev) => ({
                          ...prev,
                          currentClientId: "",
                        }));
                      }
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
              <div className={styles.locationDisplay}>
                <strong>Client Location:</strong>{" "}
                {getClientLocationText(
                  resolveClientForLocationForm(locationForm.currentClientId)
                ) ||
                  activeTrailer?.locationCurrentClientLocation ||
                  "-"}
              </div>
              <Form.Group controlId="trailer-current-arrival-date">
                <Form.Label>Arrival Date</Form.Label>
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
                <Form.Label>Departure Date</Form.Label>
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
            </div>

            <div className={styles.locationHistoryHeader}>
              <span>Past Locations</span>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={handleAddLocationHistory}
              >
                Add Previous
              </Button>
            </div>
            <div className={styles.locationHistoryList}>
              {locationForm.history.length === 0 ? (
                <div className={styles.locationEmpty}>No past locations yet.</div>
              ) : (
                locationForm.history.map((entry, index) => {
                  const selectedClient = resolveClientForLocationForm(entry.clientId);
                  return (
                    <div
                      key={`history-${index}`}
                      className={styles.locationHistoryItem}
                    >
                      <Form.Group controlId={`trailer-history-client-${index}`}>
                        <Form.Label>Client</Form.Label>
                        <div className={styles.clientPicker}>
                          <Form.Control
                            type="text"
                            placeholder="Search clients"
                            value={historyClientSearches[index] ?? entry.clientName ?? ""}
                            onFocus={() => setActiveClientPicker(`history-${index}`)}
                            onChange={(event) => {
                              const value = event.target.value;
                              setHistoryClientSearches((prev) => ({
                                ...prev,
                                [index]: value,
                              }));
                              setActiveClientPicker(`history-${index}`);
                              if (!value.trim()) {
                                handleLocationHistoryChange(index, "clientId", "");
                              }
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
                      <div className={styles.locationDisplay}>
                        <strong>Location:</strong>{" "}
                        {getClientLocationText(selectedClient) ||
                          entry.clientLocation ||
                          "-"}
                      </div>
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
            onClick={() => openTrailerPage(activeTrailer?.id)}
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
