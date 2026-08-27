import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import firebase from "../../context/Firebase";
import TrailerYardWarehouse from "../../components/TrailerYardWarehouse";
import {
  TRAILER_LAYOUT_DOC_ID as LAYOUT_DOC_ID,
  TRAILER_LAYOUT_VERSION,
  TRAILER_YARD_CANONICAL_SLOT_NUMBERS as SLOT_NUMBER_SET,
  buildPositionedTrailerSlots,
  extractTrailerNumber,
  getSavedTrailerLayoutOverrides,
  resolveTrailerMapPlacement,
  resolveTrailerNumber,
} from "../../utils/trailerYardLayout";
import {
  MONDAY_TRAILER_CONNECTION_MESSAGE,
  buildTrailerDocIdFromMondayBoardName,
  fetchMondayTrailerBoards,
  isTrailerRecordSnapshot,
  syncMondayTrailerBoardsToFirebase,
} from "../../utils/mondayTrailerSync";
import LoggedIn from "../LoggedIn";
import styles from "../../styles/TrailerDisplay.module.css";

const DISPLAY_SETTINGS_COLLECTION = "TrailerDisplaySettings";
const DISPLAY_SETTINGS_DOC_ID = "global";
const LAKE_FOREST_YARD_KEY = "lakeForest";
const LAKE_FOREST_FOLDER_IDS = new Set(["20099188"]);
const LAKE_FOREST_FOLDER_NAMES = new Set(["lakeforest"]);
const REFRESH_INTERVAL_MS = 60000;
const MIN_TASK_SCALE = 0.2;
const TASK_SCALE_EPSILON = 0.01;
const TASK_LAYOUT_GAP = 14;
const TASK_MIN_CARD_WIDTH = 340;

function toMillis(value) {
  if (!value) return 0;
  if (typeof value?.toMillis === "function") {
    try {
      return value.toMillis();
    } catch {
      return 0;
    }
  }
  if (typeof value?.seconds === "number") return value.seconds * 1000;
  const parsed = Date.parse(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toDateValue(value) {
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

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatClock(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function normalizeHistory(entries) {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) => ({
      clientId: String(entry?.clientId || "").trim(),
      clientName: String(entry?.clientName || "").trim(),
      clientLocation: String(entry?.clientLocation || "").trim(),
      arrivalDate: toDateValue(entry?.arrivalDate),
      departureDate: toDateValue(entry?.departureDate),
    }))
    .sort(
      (a, b) =>
        (Date.parse(b.arrivalDate) || 0) - (Date.parse(a.arrivalDate) || 0)
    );
}

function normalizeTrailer(doc) {
  const data = doc.data() || {};
  const number = resolveTrailerNumber({
    id: doc.id,
    number: data.number,
    mondayBoardName: data.mondayBoardName,
    name: data.name,
  });
  const yardPlacementConfigured = "lfOnMap" in data || "lfSlot" in data;
  const placement = resolveTrailerMapPlacement({
    lfSlot: data.lfSlot,
    lfOnMap: data.lfOnMap,
    number: yardPlacementConfigured ? number : null,
  });

  return {
    id: doc.id,
    sourceId: doc.id,
    persistId: doc.id,
    existsInDb: true,
    number,
    name:
      String(data.name || "").trim() ||
      String(data.mondayBoardName || "").trim() ||
      doc.id,
    mondayBoardId: String(data.mondayBoardId || "").trim(),
    mondayBoardName: String(data.mondayBoardName || "").trim(),
    mondayFolderId: String(data.mondayFolderId || "").trim(),
    mondayFolderName: String(data.mondayFolderName || "").trim(),
    mapAcronym: sanitizeTrailerMapAcronym(data.mapAcronym),
    lfSlot: placement.lfSlot,
    lfOnMap: placement.lfOnMap,
    lfSlotExplicit: placement.lfSlotExplicit,
    locationCurrentName: String(
      data.locationCurrentName ||
        data.locationCurrent ||
        data.location ||
        "SoCal"
    ).trim(),
    locationCurrentClientLocation: String(
      data.locationCurrentClientLocation ||
        data.locationCurrentLocation ||
        ""
    ).trim(),
    locationCurrentArrivalDate: toDateValue(
      data.locationCurrentArrivalDate || data.currentLocationArrivalDate
    ),
    locationCurrentDepartureDate: toDateValue(
      data.locationCurrentDepartureDate || data.currentLocationDepartureDate
    ),
    locationNextName: String(
      data.locationNextName || data.locationNext || ""
    ).trim(),
    locationNextClientLocation: String(
      data.locationNextClientLocation || data.locationNextLocation || ""
    ).trim(),
    locationHistory: normalizeHistory(data.locationHistory),
    updatedAt: data.updatedAt || data.createdAt || null,
  };
}

function buildCanonicalDisplayTrailers(rawTrailers = []) {
  const byId = new Map();
  const byNumber = new Map();
  const sourcesByNumber = new Map();

  rawTrailers.forEach((trailer) => {
    byId.set(String(trailer.id || "").toUpperCase(), trailer);
    if (Number.isFinite(trailer.number)) {
      if (!sourcesByNumber.has(trailer.number)) {
        sourcesByNumber.set(trailer.number, []);
      }
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
      const source =
        byId.get(canonicalId.toUpperCase()) || byNumber.get(slotNumber) || null;
      const mondaySource =
        [source, ...(sourcesByNumber.get(slotNumber) || [])].find((entry) =>
          String(entry?.mondayBoardId || "").trim()
        ) || null;

      return {
        id: canonicalId,
        sourceId: source?.id || canonicalId,
        persistId: source?.persistId || source?.id || canonicalId,
        existsInDb: Boolean(source),
        number: slotNumber,
        name: source?.name || canonicalId,
        mondayBoardId: source?.mondayBoardId || mondaySource?.mondayBoardId || "",
        mondayBoardName:
          source?.mondayBoardName || mondaySource?.mondayBoardName || "",
        mondayFolderId:
          source?.mondayFolderId || mondaySource?.mondayFolderId || "",
        mondayFolderName:
          source?.mondayFolderName || mondaySource?.mondayFolderName || "",
        mapAcronym: source?.mapAcronym || "",
        lfSlot: source ? source.lfSlot : slotNumber,
        lfOnMap: source ? source.lfOnMap : true,
        lfSlotExplicit: source ? source.lfSlotExplicit : false,
        locationCurrentName: source?.locationCurrentName || "SoCal",
        locationCurrentClientLocation:
          source?.locationCurrentClientLocation || "",
        locationCurrentArrivalDate: source?.locationCurrentArrivalDate || "",
        locationCurrentDepartureDate:
          source?.locationCurrentDepartureDate || "",
        locationNextName: source?.locationNextName || "",
        locationNextClientLocation: source?.locationNextClientLocation || "",
        locationHistory: source?.locationHistory || [],
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
    if (Number.isFinite(trailer.number) && canonicalNumbers.has(trailer.number)) {
      return false;
    }
    return true;
  });

  return [...canonical, ...extraTrailers];
}

function getInitials(value) {
  const words = String(value || "")
    .split(/[,&]|\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
  if (!words.length || value === "Unassigned") return "?";
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function getPreviousLocation(trailer) {
  return trailer?.locationHistory?.[0] || null;
}

function getTrailerLabel(trailer) {
  return (
    String(trailer?.mondayBoardName || "").trim() ||
    String(trailer?.name || "").trim() ||
    trailer?.id ||
    "Trailer"
  );
}

function getAisTrailerNumber(value) {
  const match = String(value || "").match(/\bAIS\s*[-_]?\s*(\d+)\b/i);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
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
  if (words.length === 1) {
    return sanitizeTrailerMapAcronym(words[0]).slice(0, 6);
  }
  return sanitizeTrailerMapAcronym(words.map((word) => word[0]).join(""));
}

function getTrailerMapLabel(trailer, fallbackSlotNumber) {
  const aisNumber =
    getAisTrailerNumber(trailer?.id) ||
    getAisTrailerNumber(trailer?.name) ||
    getAisTrailerNumber(trailer?.mondayBoardName);
  if (Number.isFinite(aisNumber)) return String(aisNumber);

  const storedAcronym = sanitizeTrailerMapAcronym(trailer?.mapAcronym);
  if (storedAcronym) return storedAcronym;

  return (
    buildTrailerMapAcronym(getTrailerLabel(trailer)) ||
    String(fallbackSlotNumber)
  );
}

function getTrailerIdentityKeys(trailer) {
  return Array.from(
    new Set(
      [trailer?.id, trailer?.sourceId, trailer?.persistId]
        .map((value) => String(value || "").trim())
        .filter(Boolean)
    )
  );
}

function getTrailerSelectionKey(trailer) {
  return getTrailerIdentityKeys(trailer)[0] || "";
}

function isTrailerSelected(trailer, selectedIds) {
  const selectedSet = new Set(selectedIds);
  return getTrailerIdentityKeys(trailer).some((id) => selectedSet.has(id));
}

function getTaskColumnWidth(tasks) {
  const longestTaskLength = tasks.reduce(
    (longest, task) =>
      Math.max(longest, String(task?.name || "").trim().length),
    0
  );
  return `${Math.max(12, Math.min(48, longestTaskLength + 2))}ch`;
}

function TaskBoard({ trailer, board, loading }) {
  const groups = board?.groups || [];
  const tasks = groups.flatMap((group) => group.tasks || []);
  const taskColumnWidth = getTaskColumnWidth(tasks);
  const counts = tasks.reduce(
    (summary, task) => {
      summary[task.statusTone] = (summary[task.statusTone] || 0) + 1;
      return summary;
    },
    { done: 0, working: 0, empty: 0 }
  );

  return (
    <section className={styles.taskBoard}>
      <header className={styles.taskBoardHeader}>
        <div>
          <div className={styles.taskEyebrow}>CURRENT TASKS</div>
          <h2>{board?.name || getTrailerLabel(trailer)}</h2>
        </div>
        <div className={styles.taskSummary}>
          <span className={styles.summaryDone}>{counts.done} done</span>
          <span className={styles.summaryWorking}>
            {counts.working} working
          </span>
          <span className={styles.summaryEmpty}>{counts.empty} open</span>
        </div>
      </header>

      {loading && !board ? (
        <div className={styles.boardMessage}>
          <span className={styles.spinner} />
          Loading Monday tasks
        </div>
      ) : groups.length === 0 ? (
        <div className={styles.boardMessage}>
          No active Service task groups to display.
        </div>
      ) : (
        <div className={styles.taskGroups}>
          {groups.map((group) => (
            <div className={styles.taskGroup} key={group.id || group.title}>
              <div className={styles.groupTitle}>
                <span />
                {group.title}
                <b>{group.tasks.length}</b>
              </div>
              <div
                className={styles.taskTable}
                style={{ "--task-column-width": taskColumnWidth }}
              >
                <div className={styles.taskTableHeader}>
                  <span>Task</span>
                  <span>Assigned</span>
                  <span>Status</span>
                </div>
                {group.tasks.map((task) => (
                  <div className={styles.taskRow} key={task.id}>
                    <div className={styles.taskName} title={task.name}>
                      {task.name}
                    </div>
                    <div
                      className={styles.assignee}
                      title={task.assignee}
                      aria-label={`Assigned to ${task.assignee}`}
                    >
                      <span className={styles.avatar}>
                        {getInitials(task.assignee)}
                      </span>
                      <span>{task.assignee}</span>
                    </div>
                    <div
                      className={`${styles.statusCell} ${
                        task.statusTone === "done"
                          ? styles.statusDone
                          : task.statusTone === "working"
                          ? styles.statusWorking
                          : styles.statusEmpty
                      }`}
                    >
                      {task.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function TrailerDisplay() {
  const router = useRouter();
  const taskViewportRef = useRef(null);
  const taskMeasureRef = useRef(null);
  const selectedIdsRef = useRef([]);
  const pendingSelectionWritesRef = useRef(0);
  const [trailers, setTrailers] = useState([]);
  const [layoutData, setLayoutData] = useState({});
  const [boardCatalog, setBoardCatalog] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionHydrated, setSelectionHydrated] = useState(false);
  const [selectionSaving, setSelectionSaving] = useState(false);
  const [selectionSaveError, setSelectionSaveError] = useState("");
  const [taskBoards, setTaskBoards] = useState({});
  const [trailersLoading, setTrailersLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [mondayConnectionError, setMondayConnectionError] = useState("");
  const [taskError, setTaskError] = useState("");
  const [clock, setClock] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [taskLayout, setTaskLayout] = useState({
    items: [],
    scale: 1,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(DISPLAY_SETTINGS_COLLECTION)
      .doc(DISPLAY_SETTINGS_DOC_ID)
      .onSnapshot(
        (snapshot) => {
          const remoteIds = snapshot.data()?.selectedTrailerIds;
          const normalizedIds = Array.isArray(remoteIds)
            ? Array.from(
                new Set(remoteIds.map((value) => String(value || "").trim()).filter(Boolean))
              )
            : [];
          selectedIdsRef.current = normalizedIds;
          setSelectedIds(normalizedIds);
          setSelectionHydrated(true);
          setSelectionSaveError("");
        },
        (error) => {
          console.error("Failed to load shared trailer display selection", error);
          setSelectionHydrated(true);
          setSelectionSaveError("Shared display selection is unavailable.");
        }
      );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    const handleFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      setTaskLayout((layout) => ({ ...layout, scale: 1 }));
    };
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Trailers")
      .onSnapshot(
        (snapshot) => {
          const layoutDoc = snapshot.docs.find(
            (doc) => doc.id === LAYOUT_DOC_ID
          );
          setLayoutData(layoutDoc?.data() || {});
          const normalized = snapshot.docs
            .filter(isTrailerRecordSnapshot)
            .map(normalizeTrailer);
          setTrailers(buildCanonicalDisplayTrailers(normalized));
          setTrailersLoading(false);
          setLoadError("");
        },
        (error) => {
          console.error("Failed to load trailer display data", error);
          setLoadError("Trailer data is unavailable.");
          setTrailersLoading(false);
        }
      );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadBoardCatalog = async () => {
      try {
        const payload = await fetchMondayTrailerBoards(firebase);
        if (cancelled) return;
        setBoardCatalog(payload.boards || []);
        setMondayConnectionError("");
        syncMondayTrailerBoardsToFirebase(firebase, payload.folders).catch(
          (error) => {
            console.error("Failed to sync Monday trailer boards", error);
          }
        );
      } catch (error) {
        console.warn("Trailer display board catalog unavailable", error);
        if (!cancelled) {
          setMondayConnectionError(MONDAY_TRAILER_CONNECTION_MESSAGE);
          if (typeof window !== "undefined") {
            window.alert(MONDAY_TRAILER_CONNECTION_MESSAGE);
          }
        }
      }
    };
    loadBoardCatalog();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayTrailers = useMemo(() => {
    const boardsById = new Map(
      boardCatalog.map((board) => [String(board.id), board])
    );
    const boardsByNumber = new Map();
    boardCatalog.forEach((board) => {
      const number = extractTrailerNumber(board.name);
      if (number != null && !boardsByNumber.has(number)) {
        boardsByNumber.set(number, board);
      }
    });
    return trailers.map((trailer) => {
      if (
        trailer.mondayBoardId &&
        boardsById.has(String(trailer.mondayBoardId))
      ) {
        return trailer;
      }
      const board = boardsByNumber.get(trailer.number);
      return board
        ? {
            ...trailer,
            mondayBoardId: board.id,
            mondayBoardName: board.name,
          }
        : trailer;
    });
  }, [boardCatalog, trailers]);

  const selectedTrailers = useMemo(() => {
    const byId = new Map();
    displayTrailers.forEach((trailer) => {
      getTrailerIdentityKeys(trailer).forEach((id) => byId.set(id, trailer));
    });
    return selectedIds
      .map((id, selectionIndex) => ({
        trailer: byId.get(id),
        selectionIndex,
      }))
      .filter((entry) => Boolean(entry.trailer))
      .sort((a, b) => {
        const aDeparture = Date.parse(
          a.trailer.locationCurrentDepartureDate || ""
        );
        const bDeparture = Date.parse(
          b.trailer.locationCurrentDepartureDate || ""
        );
        const aHasDeparture = Number.isFinite(aDeparture);
        const bHasDeparture = Number.isFinite(bDeparture);
        if (aHasDeparture && bHasDeparture) {
          return aDeparture - bDeparture || a.selectionIndex - b.selectionIndex;
        }
        if (aHasDeparture) return -1;
        if (bHasDeparture) return 1;
        return a.selectionIndex - b.selectionIndex;
      })
      .map((entry) => entry.trailer);
  }, [displayTrailers, selectedIds]);

  const taskFitSignature = useMemo(
    () =>
      selectedTrailers
        .map((trailer) => {
          const board = taskBoards[trailer.mondayBoardId];
          const rowCount = (board?.groups || []).reduce(
            (total, group) => total + (group.tasks || []).length,
            0
          );
          return `${trailer.id}:${board?.id || "loading"}:${rowCount}`;
        })
        .join("|"),
    [selectedTrailers, taskBoards]
  );

  const boardIds = useMemo(
    () =>
      Array.from(
        new Set(
          selectedTrailers
            .map((trailer) => trailer.mondayBoardId)
            .filter(Boolean)
        )
      ),
    [selectedTrailers]
  );

  const loadTasks = useCallback(async () => {
    if (!boardIds.length) {
      setTaskBoards({});
      setTaskError("");
      setTasksLoading(false);
      return;
    }

    setTasksLoading(true);
    setTaskError("");
    try {
      const idToken = await firebase.auth().currentUser?.getIdToken();
      const response = await fetch(
        `/api/monday/trailer-tasks?boardIds=${encodeURIComponent(
          boardIds.join(",")
        )}&ts=${Date.now()}`,
        {
          headers: {
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
        }
      );
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Failed to load trailer tasks.");
      }
      setTaskBoards(
        Object.fromEntries(
          (payload.boards || []).map((board) => [String(board.id), board])
        )
      );
    } catch (error) {
      console.error("Failed to load trailer tasks", error);
      setTaskError(error?.message || "Failed to load trailer tasks.");
    } finally {
      setTasksLoading(false);
    }
  }, [boardIds]);

  useEffect(() => {
    loadTasks();
    const timer = window.setInterval(loadTasks, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [loadTasks]);

  const calculateTaskLayout = useCallback(() => {
    const viewport = taskViewportRef.current;
    const measureRoot = taskMeasureRef.current;
    if (!viewport || !measureRoot || !selectedTrailers.length) {
      setTaskLayout({ items: [], scale: 1, width: 0, height: 0 });
      return;
    }

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    if (!viewportWidth || !viewportHeight) return;

    const measuredItems = selectedTrailers.map((trailer, index) => {
      const measureNode = measureRoot.querySelector(
        `[data-measure-index="${index}"]`
      );
      return {
        id: trailer.id,
        index,
        height: Math.max(1, Math.ceil(measureNode?.scrollHeight || 1)),
      };
    });

    const maxColumns = Math.max(
      1,
      Math.min(
        selectedTrailers.length,
        Math.floor(
          (viewportWidth + TASK_LAYOUT_GAP) /
            (TASK_MIN_CARD_WIDTH + TASK_LAYOUT_GAP)
        )
      )
    );
    const preferredColumns = Math.max(
      1,
      Math.min(
        maxColumns,
        selectedTrailers.length,
        Math.round(viewportWidth / 500) || 1
      )
    );

    const packItems = (columnCount, contentWidth, stretchToHeight = null) => {
      const cardWidth =
        (contentWidth - TASK_LAYOUT_GAP * (columnCount - 1)) / columnCount;
      const columns = Array.from({ length: columnCount }, () => ({
        height: 0,
        items: [],
      }));

      [...measuredItems]
        .sort((a, b) => b.height - a.height || a.index - b.index)
        .forEach((item) => {
          const targetColumn = columns.reduce(
            (best, column, columnIndex) =>
              column.height < columns[best].height ? columnIndex : best,
            0
          );
          const column = columns[targetColumn];
          column.height +=
            item.height + (column.items.length > 0 ? TASK_LAYOUT_GAP : 0);
          column.items.push(item);
        });

      const naturalHeight = Math.max(
        1,
        ...columns.map((column) => column.height)
      );
      const targetHeight = stretchToHeight || naturalHeight;
      const layoutItems = [];

      columns.forEach((column, columnIndex) => {
        const extraPerItem =
          stretchToHeight && column.items.length
            ? Math.max(0, stretchToHeight - column.height) /
              column.items.length
            : 0;
        let y = 0;

        column.items.forEach((item, itemIndex) => {
          const height = item.height + extraPerItem;
          layoutItems.push({
            id: item.id,
            x: columnIndex * (cardWidth + TASK_LAYOUT_GAP),
            y,
            width: cardWidth,
            height,
          });
          y +=
            height +
            (itemIndex < column.items.length - 1 ? TASK_LAYOUT_GAP : 0);
        });
      });

      return {
        items: layoutItems.sort((a, b) => {
          const aIndex =
            measuredItems.find((item) => item.id === a.id)?.index || 0;
          const bIndex =
            measuredItems.find((item) => item.id === b.id)?.index || 0;
          return aIndex - bIndex;
        }),
        naturalHeight,
        width: contentWidth,
        height: targetHeight,
      };
    };

    const totalMeasuredHeight = measuredItems.reduce(
      (total, item) => total + item.height,
      0
    );
    const candidates = Array.from({ length: maxColumns }, (_, index) => {
      const columnCount = index + 1;
      const packed = packItems(columnCount, viewportWidth);
      const scale =
        packed.naturalHeight > viewportHeight
          ? Math.max(MIN_TASK_SCALE, viewportHeight / packed.naturalHeight)
          : 1;
      const utilization =
        totalMeasuredHeight /
        (columnCount * Math.max(viewportHeight, packed.naturalHeight));
      const score =
        utilization -
        Math.abs(columnCount - preferredColumns) * 0.3 -
        (1 - scale) * 0.35;
      return { columnCount, score, packed };
    });

    const best = candidates.reduce((currentBest, candidate) =>
      candidate.score > currentBest.score ? candidate : currentBest
    );
    const needsScaleDown = best.packed.naturalHeight > viewportHeight;
    const scale = needsScaleDown
      ? Math.max(MIN_TASK_SCALE, viewportHeight / best.packed.naturalHeight)
      : 1;
    const contentWidth = viewportWidth / scale;
    const repacked = packItems(
      best.columnCount,
      contentWidth,
      needsScaleDown ? null : viewportHeight
    );
    const nextLayout = {
      items: repacked.items,
      scale,
      width: contentWidth,
      height: needsScaleDown ? repacked.naturalHeight : viewportHeight,
    };

    setTaskLayout((current) => {
      const sameLayout =
        Math.abs(current.width - nextLayout.width) < 1 &&
        Math.abs(current.height - nextLayout.height) < 1 &&
        Math.abs(current.scale - nextLayout.scale) < TASK_SCALE_EPSILON &&
        current.items.length === nextLayout.items.length &&
        current.items.every((item, index) => {
          const next = nextLayout.items[index];
          return (
            next &&
            item.id === next.id &&
            Math.abs(item.x - next.x) < 1 &&
            Math.abs(item.y - next.y) < 1 &&
            Math.abs(item.width - next.width) < 1 &&
            Math.abs(item.height - next.height) < 1
          );
        });
      return sameLayout ? current : nextLayout;
    });
  }, [selectedTrailers, taskFitSignature]);

  useEffect(() => {
    if (!selectedTrailers.length) {
      setTaskLayout({ items: [], scale: 1, width: 0, height: 0 });
      return undefined;
    }

    let frame = 0;
    let settleFrame = 0;
    let resizeObserver = null;

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settleFrame);
      frame = window.requestAnimationFrame(() => {
        calculateTaskLayout();
        settleFrame = window.requestAnimationFrame(calculateTaskLayout);
      });
    };

    scheduleMeasure();

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(scheduleMeasure);
      if (taskViewportRef.current) resizeObserver.observe(taskViewportRef.current);
      if (taskMeasureRef.current) resizeObserver.observe(taskMeasureRef.current);
    }

    const handleResize = () => {
      scheduleMeasure();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settleFrame);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [calculateTaskLayout, selectedTrailers.length, taskFitSignature]);

  const positionedSlots = useMemo(
    () => {
      const lakeForestLayout = layoutData?.yardLayouts?.[LAKE_FOREST_YARD_KEY];
      const layoutSource =
        Number(lakeForestLayout?.layoutVersion) === TRAILER_LAYOUT_VERSION
          ? lakeForestLayout
          : layoutData;
      return buildPositionedTrailerSlots(
        getSavedTrailerLayoutOverrides(layoutSource)
      );
    },
    [layoutData]
  );

  const lakeForestIdentityIndex = useMemo(() => {
    const boardIds = new Set();
    const documentIds = new Set();
    const trailerNumbers = new Set();

    boardCatalog.forEach((board) => {
      const folderId = String(board?.folderId || "").trim();
      const folderName = String(board?.folderName || "").trim().toLowerCase();
      if (
        !LAKE_FOREST_FOLDER_IDS.has(folderId) &&
        !LAKE_FOREST_FOLDER_NAMES.has(folderName)
      ) {
        return;
      }
      const boardId = String(board?.id || "").trim();
      if (!boardId) return;
      boardIds.add(boardId);
      const documentId = buildTrailerDocIdFromMondayBoardName(
        board?.name,
        boardId
      );
      if (documentId) documentIds.add(documentId.toUpperCase());
      const trailerNumber = extractTrailerNumber(board?.name);
      if (Number.isFinite(trailerNumber)) trailerNumbers.add(trailerNumber);
    });

    return { boardIds, documentIds, trailerNumbers };
  }, [boardCatalog]);

  const lakeForestTrailers = useMemo(
    () =>
      displayTrailers.filter((trailer) => {
        if (!trailer.existsInDb) return false;
        const folderId = String(trailer.mondayFolderId || "").trim();
        const folderName = String(trailer.mondayFolderName || "")
          .trim()
          .toLowerCase();
        if (
          LAKE_FOREST_FOLDER_IDS.has(folderId) ||
          LAKE_FOREST_FOLDER_NAMES.has(folderName)
        ) {
          return true;
        }
        const boardId = String(trailer.mondayBoardId || "").trim();
        if (boardId && lakeForestIdentityIndex.boardIds.has(boardId)) return true;
        const matchesDocumentId = getTrailerIdentityKeys(trailer).some((id) =>
          lakeForestIdentityIndex.documentIds.has(id.toUpperCase())
        );
        return (
          matchesDocumentId ||
          (Number.isFinite(trailer.number) &&
            lakeForestIdentityIndex.trailerNumbers.has(trailer.number))
        );
      }),
    [displayTrailers, lakeForestIdentityIndex]
  );

  const slotAssignments = useMemo(() => {
    const assignments = {};
    const validSlots = new Set(positionedSlots.map((slot) => slot.slot));
    [...lakeForestTrailers]
      .sort((a, b) => {
        const explicitDifference =
          Number(Boolean(b.lfSlotExplicit)) -
          Number(Boolean(a.lfSlotExplicit));
        return (
          explicitDifference || toMillis(b.updatedAt) - toMillis(a.updatedAt)
        );
      })
      .forEach((trailer) => {
        if (!trailer.existsInDb) return;
        if (trailer.lfOnMap !== true || !Number.isFinite(trailer.lfSlot)) return;
        if (!validSlots.has(trailer.lfSlot)) return;
        if (!assignments[trailer.lfSlot]) {
          assignments[trailer.lfSlot] = trailer;
        }
      });
    return assignments;
  }, [lakeForestTrailers, positionedSlots]);

  const saveSharedSelectedIds = useCallback(async (nextIds) => {
    const normalizedIds = Array.from(
      new Set(nextIds.map((value) => String(value || "").trim()).filter(Boolean))
    );
    const previousIds = selectedIdsRef.current;
    selectedIdsRef.current = normalizedIds;
    setSelectedIds(normalizedIds);
    setSelectionSaving(true);
    setSelectionSaveError("");
    try {
      await firebase
        .firestore()
        .collection(DISPLAY_SETTINGS_COLLECTION)
        .doc(DISPLAY_SETTINGS_DOC_ID)
        .set(
          {
            selectedTrailerIds: normalizedIds,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy:
              firebase.auth().currentUser?.email ||
              firebase.auth().currentUser?.uid ||
              "unknown",
          },
          { merge: true }
        );
    } catch (error) {
      console.error("Failed to save shared trailer display selection", error);
      selectedIdsRef.current = previousIds;
      setSelectedIds(previousIds);
      setSelectionSaveError("Could not update the shared display selection.");
    } finally {
      setSelectionSaving(false);
    }
  }, []);

  const toggleTrailer = async (trailer) => {
    if (!trailer?.mondayBoardId || !selectionHydrated) return;
    const identityKeys = getTrailerIdentityKeys(trailer);
    const selectionKey = getTrailerSelectionKey(trailer);
    const current = selectedIdsRef.current;
    const selected = identityKeys.some((id) => current.includes(id));
    const nextIds = selected
      ? current.filter((id) => !identityKeys.includes(id))
      : [...current, selectionKey];

    selectedIdsRef.current = nextIds;
    setSelectedIds(nextIds);
    pendingSelectionWritesRef.current += 1;
    setSelectionSaving(true);
    setSelectionSaveError("");

    try {
      const selectedTrailerIds = selected
        ? firebase.firestore.FieldValue.arrayRemove(...identityKeys)
        : firebase.firestore.FieldValue.arrayUnion(selectionKey);
      await firebase
        .firestore()
        .collection(DISPLAY_SETTINGS_COLLECTION)
        .doc(DISPLAY_SETTINGS_DOC_ID)
        .set(
          {
            selectedTrailerIds,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy:
              firebase.auth().currentUser?.email ||
              firebase.auth().currentUser?.uid ||
              "unknown",
          },
          { merge: true }
        );
    } catch (error) {
      console.error("Failed to update shared trailer display selection", error);
      const nextStateIsStillCurrent =
        selectedIdsRef.current.length === nextIds.length &&
        selectedIdsRef.current.every((id, index) => id === nextIds[index]);
      if (nextStateIsStillCurrent) {
        selectedIdsRef.current = current;
        setSelectedIds(current);
      }
      setSelectionSaveError("Could not update the shared display selection.");
    } finally {
      pendingSelectionWritesRef.current = Math.max(
        0,
        pendingSelectionWritesRef.current - 1
      );
      setSelectionSaving(pendingSelectionWritesRef.current > 0);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen request was blocked", error);
    }
  };

  return (
    <LoggedIn>
      <div className={styles.displayPage}>
        <main className={styles.dashboard}>
          <section className={styles.tasksPane}>
            {mondayConnectionError && (
              <div className={styles.errorBanner}>{mondayConnectionError}</div>
            )}
            {taskError && <div className={styles.errorBanner}>{taskError}</div>}

            {selectedTrailers.length === 0 ? (
              <div className={styles.emptySelection}>
                <div className={styles.emptySelectionIcon}>
                  <span />
                  <span />
                  <span />
                </div>
                <h2>Select trailers from the yard</h2>
                <p>
                  Each selected trailer adds its live Monday task board here.
                  Select it again to remove it.
                </p>
              </div>
            ) : (
              <div className={styles.taskFitViewport} ref={taskViewportRef}>
                <div className={styles.taskMeasureLayer} ref={taskMeasureRef}>
                  {selectedTrailers.map((trailer, index) => (
                    <div
                      className={styles.taskMeasureCard}
                      data-measure-index={index}
                      key={`measure-${trailer.id}`}
                    >
                      <TaskBoard
                        trailer={trailer}
                        board={taskBoards[trailer.mondayBoardId]}
                        loading={tasksLoading}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className={styles.taskBoardGrid}
                  style={{
                    width: `${taskLayout.width || 0}px`,
                    height: `${taskLayout.height || 0}px`,
                    transform: `scale(${taskLayout.scale || 1})`,
                    opacity: taskLayout.items.length ? 1 : 0,
                  }}
                >
                  {selectedTrailers.map((trailer) => {
                    const layoutItem = taskLayout.items.find(
                      (item) => item.id === trailer.id
                    );
                    return (
                      <div
                        className={styles.taskBoardFrame}
                        key={trailer.id}
                        style={{
                          left: `${layoutItem?.x || 0}px`,
                          top: `${layoutItem?.y || 0}px`,
                          width: `${layoutItem?.width || 1}px`,
                          height: `${layoutItem?.height || 1}px`,
                        }}
                      >
                        <TaskBoard
                          trailer={trailer}
                          board={taskBoards[trailer.mondayBoardId]}
                          loading={tasksLoading}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <aside className={styles.rightRail}>
            <section className={styles.yardPanel}>
              <div className={`${styles.panelHeading} ${styles.yardHeading}`}>
                <div>
                  <span>TRAILER DISPLAY - LAKE FOREST</span>
                  {selectedTrailers.length > 0 && (
                    <button
                      type="button"
                      className={styles.clearSelectionButton}
                      onClick={() => saveSharedSelectedIds([])}
                      disabled={!selectionHydrated || selectionSaving}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className={styles.yardToolbar}>
                  <div className={styles.selectionCount}>
                    {selectedTrailers.length} selected
                  </div>
                  <div className={styles.topStatus}>
                    <span className={styles.liveDot} />
                    Live
                    <b>{formatClock(clock)}</b>
                  </div>
                  <div className={styles.topActions}>
                    <button type="button" onClick={loadTasks} disabled={tasksLoading}>
                      {tasksLoading ? "Refreshing" : "Refresh"}
                    </button>
                    <button type="button" onClick={toggleFullscreen}>
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/Warehousedb/WarehouseSelect")}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.yardSurface}>
                <TrailerYardWarehouse classes={styles} />
                <div className={styles.compass}>
                  <b>N</b>
                  <span />
                </div>
                {positionedSlots.map((slot) => {
                  const trailer = slotAssignments[slot.slot] || null;
                  const selected = trailer
                    ? isTrailerSelected(trailer, selectedIds)
                    : false;
                  const selectable =
                    Boolean(trailer?.mondayBoardId) &&
                    selectionHydrated;
                  return (
                    <button
                      type="button"
                      key={slot.key}
                      className={`${styles.yardSlot} ${
                        trailer ? styles.yardSlotOccupied : styles.yardSlotEmpty
                      } ${selected ? styles.yardSlotSelected : ""} ${
                        trailer && !selectable ? styles.yardSlotUnavailable : ""
                      }`}
                      style={{
                        left: `${slot.x}%`,
                        top: `${slot.y}%`,
                        width: `${slot.w}%`,
                        height: `${slot.h}%`,
                        "--slot-rotation": `${slot.r || 0}deg`,
                        "--label-rotation": `${-(slot.r || 0)}deg`,
                      }}
                      onClick={() => toggleTrailer(trailer)}
                      disabled={!trailer || !selectable}
                      aria-pressed={selected}
                      title={
                        trailer
                          ? selectable
                            ? `${selected ? "Remove" : "Show"} ${getTrailerLabel(
                                trailer
                              )}`
                            : `${getTrailerLabel(trailer)} has no Monday board`
                          : `Empty slot ${slot.slot}`
                      }
                    >
                      {trailer ? (
                        <>
                          <span className={styles.trailerRoof}>
                            <i />
                            <i />
                          </span>
                          <span className={styles.trailerSide} />
                          <span className={styles.trailerRear} />
                          <span className={styles.trailerWheels}>
                            <i />
                            <i />
                          </span>
                          <strong>{getTrailerMapLabel(trailer, slot.slot)}</strong>
                          {selected && <em>LIVE</em>}
                        </>
                      ) : (
                        <span className={styles.emptyBayNumber} />
                      )}
                    </button>
                  );
                })}
                {trailersLoading && (
                  <div className={styles.yardLoading}>Loading yard...</div>
                )}
                {loadError && <div className={styles.yardError}>{loadError}</div>}
                {selectionSaveError && (
                  <div className={styles.yardError}>{selectionSaveError}</div>
                )}
              </div>
            </section>

            <section className={styles.detailsPanel}>
              {selectedTrailers.length === 0 ? (
                <div className={styles.detailsEmpty}>
                  Trailer ID, previous and next locations, and movement dates
                  appear here.
                </div>
              ) : (
                <div className={styles.detailsGrid}>
                  {selectedTrailers.map((trailer) => {
                    const previous = getPreviousLocation(trailer);
                    return (
                      <article className={styles.detailCard} key={trailer.id}>
                        <button
                          type="button"
                          className={styles.detailRemoveButton}
                          onClick={() => toggleTrailer(trailer)}
                          aria-label={`Remove ${trailer.id}`}
                        >
                          {"\u00d7"}
                        </button>
                        <h3>{trailer.id}</h3>
                        <div className={styles.datePair}>
                          <div>
                            <span>Arrival</span>
                            <b>
                              {formatDate(
                                trailer.locationCurrentArrivalDate
                              )}
                            </b>
                          </div>
                          <div>
                            <span>Departure</span>
                            <b>
                              {formatDate(
                                trailer.locationCurrentDepartureDate
                              )}
                            </b>
                          </div>
                        </div>
                        <div className={styles.detailLocation}>
                          <span>Previous location</span>
                          <strong>
                            {previous?.clientName || "No previous stop"}
                          </strong>
                          <small>
                            {previous?.clientLocation || "No address recorded"}
                          </small>
                        </div>
                        <div className={styles.detailLocation}>
                          <span>Next location</span>
                          <strong>
                            {trailer.locationNextName || "Not set"}
                          </strong>
                          <small>
                            {trailer.locationNextClientLocation ||
                              "No address recorded"}
                          </small>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </aside>
        </main>
      </div>
    </LoggedIn>
  );
}
