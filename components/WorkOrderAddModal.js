import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { Alert, Badge, Button, Modal, Spinner } from "react-bootstrap";
import firebase from "../context/Firebase";
import {
  MOVEMENT_CURRENT_AT_WORK_ORDER,
  MOVEMENT_FROM_WORK_ORDER,
  buildWorkOrderAddConfirmationPayload,
  describeWorkOrderAddMovement,
  isWorkOrderAddMovementModeLocked,
  workOrderDestinationLabel,
} from "../lib/inventory/workOrderAddUiContract";
import styles from "./WorkOrderAddModal.module.css";

const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

const WORK_ORDER_MENU_ID = "work-order-add-options";
const MAX_VISIBLE_WORK_ORDERS = 10;

class WorkOrderAddRequestError extends Error {
  constructor(message, { status = 0, code = "request_failed", payload = null } = {}) {
    super(message);
    this.name = "WorkOrderAddRequestError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

function cleanText(value) {
  return String(value == null ? "" : value).trim();
}

function normalizedSearch(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/^work\s*order\s*/, "")
    .replace(/^wo\s*/, "")
    .replace(/^#\s*/, "")
    .replace(/\s+/g, " ");
}

function createOperationId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `work-order-add-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createScannerSessionId() {
  if (globalThis.crypto?.randomUUID) {
    return `wo-scan-${globalThis.crypto.randomUUID()}`;
  }
  const random = Math.random().toString(36).slice(2, 14);
  return `wo-scan-${Date.now()}-${random}`;
}

function sameScannerCapture(left, right) {
  return Boolean(
    left?.sessionId &&
      right?.sessionId &&
      left.sessionId === right.sessionId &&
      left.generation === right.generation
  );
}

function workOrderId(workOrder) {
  return cleanText(
    workOrder?.id ||
      workOrder?.workOrderId ||
      workOrder?.number ||
      workOrder?.workOrderNumber
  );
}

function workOrderNumber(workOrder) {
  return cleanText(
    workOrder?.number ||
      workOrder?.workOrderNumber ||
      workOrder?.blueFolder?.serviceRequestId ||
      workOrder?.id
  ).replace(/^#/, "");
}

function workOrderSubject(workOrder) {
  return cleanText(
    workOrder?.subject || workOrder?.title || workOrder?.name || "Untitled work order"
  );
}

function workOrderCustomer(workOrder) {
  return cleanText(
    workOrder?.clientName ||
      workOrder?.customer ||
      workOrder?.customerName ||
      workOrder?.siteName
  );
}

function workOrderSearchText(workOrder) {
  return normalizedSearch(
    [
      workOrderNumber(workOrder),
      workOrderSubject(workOrder),
      workOrderCustomer(workOrder),
      workOrder?.machineName,
      workOrder?.trailerName,
      workOrder?.workflowStatus,
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function workOrderScore(workOrder, query) {
  const needle = normalizedSearch(query);
  if (!needle) return 1;
  const number = normalizedSearch(workOrderNumber(workOrder));
  const subject = normalizedSearch(workOrderSubject(workOrder));
  const customer = normalizedSearch(workOrderCustomer(workOrder));
  const haystack = workOrderSearchText(workOrder);
  if (number === needle) return 1000;
  if (number.startsWith(needle)) return 900;
  if (subject.startsWith(needle)) return 800;
  if (customer.startsWith(needle)) return 750;
  if (haystack.split(/\s+/).some((word) => word.startsWith(needle))) return 650;
  if (haystack.includes(needle)) return 500;
  const terms = needle.split(/\s+/).filter(Boolean);
  if (terms.length && terms.every((term) => haystack.includes(term))) return 350;
  return 0;
}

function workOrderLabel(workOrder) {
  const number = workOrderNumber(workOrder);
  const subject = workOrderSubject(workOrder);
  return `${number ? `#${number} · ` : ""}${subject}`;
}

function resolutionKind(resolution) {
  return cleanText(resolution?.kind || "item").toLowerCase() || "item";
}

function resolutionPreview(resolution) {
  return resolution?.preview && typeof resolution.preview === "object"
    ? resolution.preview
    : {};
}

function resolutionKey(resolution, fallbackCode) {
  const canonicalId = cleanText(
    resolution?.canonicalId || resolutionPreview(resolution)?.id || fallbackCode
  ).toUpperCase();
  return `${resolutionKind(resolution)}:${canonicalId}`;
}

function resolutionEntityKeys(resolution, fallbackCode) {
  const preview = resolutionPreview(resolution);
  const keys = new Set([resolutionKey(resolution, fallbackCode)]);
  if (Array.isArray(resolution?.itemIds)) {
    resolution.itemIds.forEach((itemIdValue) => {
      const itemId = cleanText(itemIdValue).toUpperCase();
      if (itemId) keys.add(`item:${itemId}`);
    });
  }
  if (Array.isArray(preview.items)) {
    preview.items.forEach((item) => {
      const itemId = cleanText(item?.id || item?.canonicalId || item).toUpperCase();
      if (itemId) keys.add(`item:${itemId}`);
    });
  }
  return [...keys];
}

function resolutionName(resolution, fallbackCode) {
  const preview = resolutionPreview(resolution);
  return cleanText(preview.name || preview.id || resolution?.canonicalId || fallbackCode);
}

function describeResolutionError(resolution) {
  const status = cleanText(resolution?.status).toLowerCase();
  if (status === "unknown") return "No Magmo inventory record matches that code.";
  if (status === "ambiguous") return "That code matches more than one record. Use its exact ID.";
  if (status === "invalid") return "That is not a valid item, bin, or pallet code.";
  return cleanText(resolution?.message) || "This code could not be added.";
}

async function authenticatedRequest(path, { method = "GET", body, signal } = {}) {
  const user = firebase.auth().currentUser;
  if (!user) {
    throw new WorkOrderAddRequestError("Your session is not ready. Sign in again and retry.", {
      status: 401,
      code: "not_authenticated",
    });
  }
  const token = await user.getIdToken();
  const controller = new AbortController();
  const forwardAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener?.("abort", forwardAbort, { once: true });
  const timeout = setTimeout(() => controller.abort(), 30000);
  let response;
  try {
    response = await fetch(path, {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch (requestError) {
    if (requestError?.name === "AbortError" && !signal?.aborted) {
      throw new WorkOrderAddRequestError(
        "Magmo took too long to confirm the result. Retry the same list safely; Magmo will not duplicate a completed movement.",
        { status: 408, code: "request_timeout" }
      );
    }
    throw requestError;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener?.("abort", forwardAbort);
  }
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.ok === false) {
    throw new WorkOrderAddRequestError(
      cleanText(payload?.error || payload?.message) ||
        `The request failed with status ${response.status}.`,
      {
        status: response.status,
        code: cleanText(payload?.code) || "request_failed",
        payload,
      }
    );
  }
  return payload || { ok: true };
}

function WorkOrderOption({ id, workOrder, active, onChoose }) {
  const number = workOrderNumber(workOrder);
  const customer = workOrderCustomer(workOrder);
  const subject = workOrderSubject(workOrder);
  const status = cleanText(workOrder?.workflowStatus || workOrder?.status);
  const destinationLinked = workOrder?.destinationLinked !== false;
  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={active}
      aria-disabled={!destinationLinked}
      disabled={!destinationLinked}
      className={`${styles.workOrderOption} ${active ? styles.workOrderOptionActive : ""} ${!destinationLinked ? styles.workOrderOptionDisabled : ""}`}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={() => onChoose(workOrder)}
    >
      <span className={styles.workOrderOptionTopline}>
        <strong>{number ? `WO #${number}` : "Work order"}</strong>
        <span>{destinationLinked ? status : "Destination not linked"}</span>
      </span>
      <span className={styles.workOrderOptionSubject}>{subject}</span>
      {customer ? <span className={styles.workOrderOptionCustomer}>{customer}</span> : null}
    </button>
  );
}

function StagedRow({ row, disabled, onRemove }) {
  const preview = resolutionPreview(row.resolution);
  const kind = resolutionKind(row.resolution);
  const itemCount = Number(preview.itemCount || 0);
  const contents = Array.isArray(preview.items) ? preview.items : [];
  return (
    <li className={styles.stagedRow}>
      <div className={styles.stagedRowHeading}>
        <div className={styles.stagedIdentity}>
          <Badge bg={kind === "item" ? "primary" : kind === "bin" ? "info" : "success"}>
            {kind}
          </Badge>
          <div>
            <strong>{resolutionName(row.resolution, row.code)}</strong>
            <span>{cleanText(row.resolution?.canonicalId) || row.code}</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.removeButton}
          aria-label={`Remove ${resolutionName(row.resolution, row.code)}`}
          disabled={disabled}
          onClick={() => onRemove(row.rowKey)}
        >
          ×
        </button>
      </div>
      <div className={styles.stagedMeta}>
        {preview.pn ? <span>PN: {preview.pn}</span> : null}
        {preview.sn ? <span>SN: {preview.sn}</span> : null}
        {preview.currentLocation ? <span>Current: {preview.currentLocation}</span> : null}
        {kind !== "item" ? (
          <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
        ) : null}
      </div>
      {contents.length ? (
        <div className={styles.contentsPreview}>
          <strong>Includes:</strong>{" "}
          {contents
            .slice(0, 5)
            .map((item) => cleanText(item?.name || item?.id || item))
            .filter(Boolean)
            .join(", ")}
          {contents.length > 5 ? ` +${contents.length - 5} more` : ""}
        </div>
      ) : null}
    </li>
  );
}

export default function WorkOrderAddModal({
  show = false,
  onHide = () => {},
  onConfirmed = () => {},
}) {
  const [workOrders, setWorkOrders] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState("");
  const [workOrderSearch, setWorkOrderSearch] = useState("");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [scanInput, setScanInput] = useState("");
  const [rows, setRows] = useState([]);
  const [resolvingCount, setResolvingCount] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [movementMode, setMovementMode] = useState("");
  const [submittedMovementMode, setSubmittedMovementMode] = useState("");
  const [readyPrompt, setReadyPrompt] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [result, setResult] = useState(null);
  const [operationId, setOperationId] = useState(() => createOperationId());
  const [scannerCapturePhase, setScannerCapturePhase] = useState("idle");
  const [scannerCaptureMeta, setScannerCaptureMeta] = useState(null);
  const [scannerPollWarning, setScannerPollWarning] = useState("");
  const rowsRef = useRef([]);
  const pendingCodesRef = useRef(new Set());
  const requestRunRef = useRef(0);
  const cameraLastCodeRef = useRef({ code: "", at: 0 });
  const scanInputRef = useRef(null);
  const scannerCaptureRef = useRef(null);
  const scannerExpiryTimerRef = useRef(null);
  const scannerPollTimerRef = useRef(null);
  const scannerPollNowRef = useRef(null);
  const scannerSeenEventIdsRef = useRef(new Set());
  const scannerLifecycleGenerationRef = useRef(0);
  const scannerMountedRef = useRef(true);
  const scannerShowRef = useRef(show);
  const stageCodeRef = useRef(null);
  scannerShowRef.current = show;

  const busy = phase === "submitting";
  const scannerCaptureBusy = ["starting", "stopping"].includes(
    scannerCapturePhase
  );
  const scannerTargetLocked = Boolean(scannerCaptureRef.current);
  const editingLocked =
    busy || readyPrompt || Boolean(submittedMovementMode) || phase === "success";

  const filteredWorkOrders = useMemo(() => {
    const query = normalizedSearch(workOrderSearch);
    return workOrders
      .map((workOrder, index) => ({
        workOrder,
        index,
        score: workOrderScore(workOrder, query),
      }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score || left.index - right.index)
      .slice(0, MAX_VISIBLE_WORK_ORDERS)
      .map((entry) => entry.workOrder);
  }, [workOrderSearch, workOrders]);

  const clearScannerPollTimer = useCallback(() => {
    clearTimeout(scannerPollTimerRef.current);
    scannerPollTimerRef.current = null;
  }, []);

  const resetWorkflow = useCallback(() => {
    requestRunRef.current += 1;
    rowsRef.current = [];
    pendingCodesRef.current.clear();
    cameraLastCodeRef.current = { code: "", at: 0 };
    setWorkOrderSearch("");
    setSelectedWorkOrder(null);
    setMenuOpen(false);
    setActiveOption(0);
    setScanInput("");
    setRows([]);
    setResolvingCount(0);
    setCameraOpen(false);
    setCameraFacing("environment");
    setMessage("");
    setError("");
    setMovementMode("");
    setSubmittedMovementMode("");
    setReadyPrompt(false);
    setPhase("idle");
    setResult(null);
    setOperationId(createOperationId());
    clearTimeout(scannerExpiryTimerRef.current);
    scannerExpiryTimerRef.current = null;
    clearScannerPollTimer();
    scannerSeenEventIdsRef.current = new Set();
    setScannerPollWarning("");
    setScannerCaptureMeta(null);
    const pendingCapture = scannerCaptureRef.current;
    if (pendingCapture) {
      setScannerCapturePhase(
        pendingCapture.stopPromise ? "stopping" : "stop_error"
      );
      if (!pendingCapture.stopPromise) {
        setError(
          "A previous scanner capture still needs to be released before a new one can start."
        );
      }
    } else {
      setScannerCapturePhase("idle");
    }
  }, [clearScannerPollTimer]);

  const loadOptions = useCallback(async (signal, query = "") => {
    setOptionsLoading(true);
    setOptionsError("");
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (cleanText(query)) params.set("q", cleanText(query));
      const payload = await authenticatedRequest(
        `/api/items/work-order-add/options?${params.toString()}`,
        { signal }
      );
      const choices = Array.isArray(payload?.workOrders)
        ? payload.workOrders
        : Array.isArray(payload?.options)
          ? payload.options
          : [];
      setWorkOrders(choices);
    } catch (requestError) {
      if (requestError?.name === "AbortError") return;
      setOptionsError(requestError?.message || "Work orders could not be loaded.");
    } finally {
      if (!signal?.aborted) setOptionsLoading(false);
    }
  }, []);

  const stopScannerCapture = useCallback(async (
    reason = "cancelled",
    { silent = false, capture: captureOverride = null } = {}
  ) => {
    const capture = captureOverride || scannerCaptureRef.current;
    if (!capture?.sessionId || !capture?.workOrderId) return true;
    if (capture.stopPromise) return capture.stopPromise;

    const captureIsCurrent = sameScannerCapture(
      scannerCaptureRef.current,
      capture
    );
    if (captureIsCurrent) {
      clearScannerPollTimer();
      if (scannerMountedRef.current && scannerShowRef.current) {
        setScannerPollWarning("");
      }
    }
    if (
      !silent &&
      captureIsCurrent &&
      scannerMountedRef.current &&
      scannerShowRef.current
    ) {
      setScannerCapturePhase("stopping");
    }
    let stopError = null;
    const stopPromise = authenticatedRequest(
      `/api/items/work-order-add/scan-sessions/${encodeURIComponent(
        capture.sessionId
      )}/stop`,
      {
        method: "POST",
        body: {
          workOrderId: capture.workOrderId,
          reason,
        },
      }
    )
      .then((payload) => payload?.stop?.delivered !== false)
      .catch((requestError) => {
        // A stale/not-found lease cannot be ours anymore, so it is already safe
        // to release the local lock. The bridge will never let this stop signal
        // interrupt another user's newer scan session.
        if ([404, 409, 410].includes(Number(requestError?.status))) return true;
        stopError = requestError;
        return false;
      });

    if (captureIsCurrent) {
      scannerCaptureRef.current = {
        ...scannerCaptureRef.current,
        stopPromise,
      };
    }
    const stopped = await stopPromise;
    const currentCapture = scannerCaptureRef.current;
    const ownsCurrentStop =
      sameScannerCapture(currentCapture, capture) &&
      currentCapture?.stopPromise === stopPromise;
    if (stopped) {
      if (ownsCurrentStop) {
        clearTimeout(scannerExpiryTimerRef.current);
        scannerExpiryTimerRef.current = null;
        clearScannerPollTimer();
        scannerCaptureRef.current = null;
      }
      if (
        ownsCurrentStop &&
        scannerMountedRef.current &&
        scannerShowRef.current
      ) {
        setScannerCaptureMeta(null);
        setScannerCapturePhase("idle");
      }
    } else if (ownsCurrentStop) {
      scannerCaptureRef.current = {
        ...currentCapture,
        stopPromise: null,
      };
      if (scannerMountedRef.current && scannerShowRef.current) {
        setScannerCapturePhase("stop_error");
        setError(
          stopError?.message ||
            "The scanner could not be released. Retry before leaving this window."
        );
      }
    }
    return stopped;
  }, [clearScannerPollTimer]);

  const scheduleScannerPoll = useCallback((capture, delayMs = 0) => {
    if (
      !capture?.sessionId ||
      !scannerMountedRef.current ||
      !scannerShowRef.current ||
      !sameScannerCapture(scannerCaptureRef.current, capture) ||
      scannerCaptureRef.current?.startPromise ||
      scannerCaptureRef.current?.stopPromise
    ) {
      return;
    }
    clearScannerPollTimer();
    const parsedDelay = Number(delayMs);
    const safeDelay = Number.isFinite(parsedDelay)
      ? Math.max(250, Math.min(5000, parsedDelay))
      : 1000;
    scannerPollTimerRef.current = setTimeout(() => {
      scannerPollTimerRef.current = null;
      void scannerPollNowRef.current?.(capture);
    }, delayMs <= 0 ? 0 : safeDelay);
  }, [clearScannerPollTimer]);

  const pollScannerCapture = useCallback(async (capture) => {
    const currentAtStart = scannerCaptureRef.current;
    if (
      !capture?.sessionId ||
      !scannerMountedRef.current ||
      !scannerShowRef.current ||
      !sameScannerCapture(currentAtStart, capture) ||
      currentAtStart?.startPromise ||
      currentAtStart?.stopPromise ||
      currentAtStart?.pollPromise
    ) {
      return;
    }

    const pollPromise = authenticatedRequest(
      `/api/items/work-order-add/scan-sessions/${encodeURIComponent(
        capture.sessionId
      )}`
    );
    scannerCaptureRef.current = {
      ...currentAtStart,
      pollPromise,
    };

    try {
      const payload = await pollPromise;
      let currentCapture = scannerCaptureRef.current;
      const ownsPoll =
        sameScannerCapture(currentCapture, capture) &&
        currentCapture?.pollPromise === pollPromise;
      if (
        !ownsPoll ||
        !scannerMountedRef.current ||
        !scannerShowRef.current ||
        currentCapture?.stopPromise
      ) {
        return;
      }

      const session = payload?.session || {};
      const status = cleanText(session.status).toLowerCase();
      currentCapture = {
        ...currentCapture,
        expiresAt: cleanText(session.expiresAt) || currentCapture.expiresAt,
        pollPromise: null,
      };
      scannerCaptureRef.current = currentCapture;
      setScannerCaptureMeta(session);
      setScannerPollWarning("");

      if (["expired", "cancelled", "canceled", "confirmed", "failed"].includes(status)) {
        clearTimeout(scannerExpiryTimerRef.current);
        scannerExpiryTimerRef.current = null;
        clearScannerPollTimer();
        scannerCaptureRef.current = null;
        setScannerCapturePhase(status === "failed" ? "start_error" : "expired");
        setMessage(
          status === "expired"
            ? "Scanner relay expired. Enable it again to continue receiving scans."
            : status === "failed"
              ? "The scanner server ended this relay. Enable it again after checking the scanner."
              : "Scanner relay ended. Enable it again to continue receiving scans."
        );
        return;
      }

      const events = Array.isArray(session.events) ? session.events : [];
      for (const event of events) {
        const eventId = cleanText(event?.eventId, 300);
        const code = cleanText(event?.code, 200);
        if (!eventId || !code || scannerSeenEventIdsRef.current.has(eventId)) {
          continue;
        }
        const consumed = await stageCodeRef.current?.(code, {
          source: "scanner-server",
          eventId,
        });
        if (consumed) scannerSeenEventIdsRef.current.add(eventId);
        if (
          !sameScannerCapture(scannerCaptureRef.current, capture) ||
          scannerCaptureRef.current?.stopPromise ||
          !scannerMountedRef.current ||
          !scannerShowRef.current
        ) {
          return;
        }
      }

      if (
        sameScannerCapture(scannerCaptureRef.current, capture) &&
        !scannerCaptureRef.current?.stopPromise
      ) {
        setScannerCapturePhase("active");
        scheduleScannerPoll(
          scannerCaptureRef.current,
          Number(session.pollAfterMs) || 1000
        );
      }
    } catch (requestError) {
      const currentCapture = scannerCaptureRef.current;
      const ownsPoll =
        sameScannerCapture(currentCapture, capture) &&
        currentCapture?.pollPromise === pollPromise;
      if (!ownsPoll) return;
      scannerCaptureRef.current = {
        ...currentCapture,
        pollPromise: null,
      };
      if (currentCapture?.stopPromise) return;
      const status = Number(requestError?.status);
      if ([404, 410].includes(status)) {
        clearTimeout(scannerExpiryTimerRef.current);
        scannerExpiryTimerRef.current = null;
        clearScannerPollTimer();
        scannerCaptureRef.current = null;
        setScannerCaptureMeta(null);
        setScannerCapturePhase("expired");
        setScannerPollWarning("");
        setMessage("Scanner relay expired or could not be found. Enable it again to continue.");
        return;
      }
      if (scannerMountedRef.current && scannerShowRef.current) {
        setScannerCapturePhase("poll_error");
        setScannerPollWarning(
          "The scanner relay is temporarily unreachable. Magmo will keep retrying without losing server scans."
        );
        scheduleScannerPoll(scannerCaptureRef.current, 2000);
      }
    }
  }, [clearScannerPollTimer, scheduleScannerPoll]);

  scannerPollNowRef.current = pollScannerCapture;

  const startScannerCapture = useCallback(async () => {
    const selectedId = workOrderId(selectedWorkOrder);
    if (!selectedId || !movementMode || scannerCaptureBusy) return;

    let capture = scannerCaptureRef.current;
    if (capture && capture.workOrderId !== selectedId) {
      setError("Stop the active scanner capture before changing work orders.");
      return;
    }
    if (capture?.startPromise || capture?.stopPromise) return;
    if (!capture) {
      capture = {
        sessionId: createScannerSessionId(),
        workOrderId: selectedId,
        generation: scannerLifecycleGenerationRef.current + 1,
        startPromise: null,
        stopPromise: null,
      };
      scannerLifecycleGenerationRef.current = capture.generation;
      scannerCaptureRef.current = capture;
      scannerSeenEventIdsRef.current = new Set();
    }

    const startPromise = authenticatedRequest(
      "/api/items/work-order-add/scan-sessions",
      {
        method: "POST",
        body: {
          sessionId: capture.sessionId,
          workOrderId: capture.workOrderId,
        },
      }
    );
    scannerCaptureRef.current = { ...capture, startPromise };
    if (scannerMountedRef.current && scannerShowRef.current) {
      clearScannerPollTimer();
      setScannerPollWarning("");
      setScanInput("");
      scanInputRef.current?.blur();
      setScannerCapturePhase("starting");
      setError("");
      setMessage("");
    }
    try {
      const payload = await startPromise;
      const session = payload?.session || {};
      const expiresAt = cleanText(session.expiresAt);
      const activeCapture = {
        sessionId: capture.sessionId,
        workOrderId: capture.workOrderId,
        generation: capture.generation,
        expiresAt,
        startPromise: null,
        stopPromise: null,
      };
      const currentCapture = scannerCaptureRef.current;
      const ownsCurrentStart =
        sameScannerCapture(currentCapture, capture) &&
        currentCapture?.startPromise === startPromise;
      const lifecycleIsCurrent =
        capture.generation === scannerLifecycleGenerationRef.current &&
        scannerMountedRef.current &&
        scannerShowRef.current;
      if (
        !ownsCurrentStart ||
        !lifecycleIsCurrent ||
        Boolean(currentCapture?.stopPromise)
      ) {
        // A hide, unmount, or overlapping stop invalidated this request while
        // it was in flight. Stop again after start succeeds so an early stale
        // stop response cannot leave the page-opening listener paused.
        await stopScannerCapture("cancelled", {
          silent: true,
          capture: activeCapture,
        });
        return;
      }
      scannerCaptureRef.current = activeCapture;
      setScannerCaptureMeta(session);
      setScannerCapturePhase("active");
      setMessage(
        "Scanner server relay is active. New scans will appear in this list automatically."
      );
      scheduleScannerPoll(activeCapture, 0);
    } catch (requestError) {
      const currentCapture = scannerCaptureRef.current;
      const ownsCurrentStart =
        sameScannerCapture(currentCapture, capture) &&
        currentCapture?.startPromise === startPromise;
      const lifecycleIsCurrent =
        capture.generation === scannerLifecycleGenerationRef.current &&
        scannerMountedRef.current &&
        scannerShowRef.current;
      const uncertainCapture = {
        ...capture,
        startPromise: null,
        stopPromise: null,
      };
      if (ownsCurrentStart) {
        scannerCaptureRef.current = {
          ...currentCapture,
          startPromise: null,
        };
      }
      if (!ownsCurrentStart || !lifecycleIsCurrent || currentCapture?.stopPromise) {
        // A timed-out/failed start can still have reached the bridge. Once an
        // invalidated request settles, send a fresh exact-session stop rather
        // than relying on a possibly earlier stop that raced ahead of start.
        await stopScannerCapture("failed", {
          silent: true,
          capture: uncertainCapture,
        });
        return;
      }
      const startStatus = Number(requestError?.status) || 0;
      const deterministicStartFailure =
        startStatus >= 400 &&
        startStatus < 500 &&
        startStatus !== 408 &&
        startStatus !== 429;
      if (deterministicStartFailure) {
        // The API either never reserved this ID or already compensated and
        // terminalized it. Drop the local lease so Retry Enable generates a
        // fresh session instead of replaying a permanently failed ID.
        scannerCaptureRef.current = null;
        scannerSeenEventIdsRef.current = new Set();
        setScannerCaptureMeta(null);
      }
      setScannerCapturePhase("start_error");
      setError(
        requestError?.message ||
          "The connected scanner could not enter Work Order capture mode."
      );
    }
  }, [
    clearScannerPollTimer,
    movementMode,
    scannerCaptureBusy,
    scheduleScannerPoll,
    selectedWorkOrder,
    stopScannerCapture,
  ]);

  useEffect(() => {
    scannerShowRef.current = show;
    if (!show) {
      scannerLifecycleGenerationRef.current += 1;
      setCameraOpen(false);
      clearTimeout(scannerExpiryTimerRef.current);
      scannerExpiryTimerRef.current = null;
      clearScannerPollTimer();
      if (scannerCaptureRef.current) {
        void stopScannerCapture("cancelled", { silent: true });
      }
      return undefined;
    }
    resetWorkflow();
    if (scannerCaptureRef.current) {
      void stopScannerCapture("cancelled");
    }
    return undefined;
  }, [clearScannerPollTimer, resetWorkflow, show, stopScannerCapture]);

  useEffect(() => {
    clearTimeout(scannerExpiryTimerRef.current);
    scannerExpiryTimerRef.current = null;
    if (
      !["active", "poll_error", "stop_error"].includes(scannerCapturePhase) ||
      !scannerCaptureMeta?.expiresAt ||
      scannerCaptureRef.current?.expiryStopAttempted
    ) {
      return undefined;
    }
    const sessionId = scannerCaptureRef.current?.sessionId;
    const expiresAtMs = Date.parse(scannerCaptureMeta.expiresAt);
    if (!sessionId || !Number.isFinite(expiresAtMs)) return undefined;
    const captureGeneration = scannerCaptureRef.current?.generation;
    scannerExpiryTimerRef.current = setTimeout(() => {
      const expiringCapture = scannerCaptureRef.current;
      if (
        expiringCapture?.sessionId !== sessionId ||
        expiringCapture?.generation !== captureGeneration
      ) {
        return;
      }
      const markedCapture = {
        ...expiringCapture,
        expiryStopAttempted: true,
      };
      scannerCaptureRef.current = markedCapture;
      scannerExpiryTimerRef.current = null;
      void (async () => {
        const stopped = await stopScannerCapture("expired", {
          capture: markedCapture,
        });
        if (
          stopped &&
          scannerMountedRef.current &&
          scannerShowRef.current &&
          !scannerCaptureRef.current
        ) {
          setScannerCapturePhase("expired");
          setScannerCaptureMeta(null);
          setMessage(
            "Scanner relay expired. Enable it again to continue receiving server scans."
          );
        }
      })();
    }, Math.max(0, expiresAtMs - Date.now() + 250));
    return () => {
      clearTimeout(scannerExpiryTimerRef.current);
      scannerExpiryTimerRef.current = null;
    };
  }, [scannerCaptureMeta?.expiresAt, scannerCapturePhase, stopScannerCapture]);

  useEffect(
    () => {
      scannerMountedRef.current = true;
      return () => {
        scannerMountedRef.current = false;
        scannerShowRef.current = false;
        scannerLifecycleGenerationRef.current += 1;
        clearTimeout(scannerExpiryTimerRef.current);
        scannerExpiryTimerRef.current = null;
        clearScannerPollTimer();
        if (scannerCaptureRef.current) {
          void stopScannerCapture("cancelled", {
            silent: true,
            capture: scannerCaptureRef.current,
          });
        }
      };
    },
    [clearScannerPollTimer, stopScannerCapture]
  );

  useEffect(() => {
    if (!show || selectedWorkOrder) return undefined;
    const controller = new AbortController();
    const timer = setTimeout(
      () => loadOptions(controller.signal, workOrderSearch),
      workOrderSearch ? 180 : 0
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [loadOptions, selectedWorkOrder, show, workOrderSearch]);

  useEffect(() => {
    setActiveOption(0);
  }, [workOrderSearch]);

  useEffect(() => {
    if (
      selectedWorkOrder &&
      movementMode &&
      show &&
      !busy &&
      !scannerTargetLocked
    ) {
      const timer = setTimeout(() => scanInputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [busy, movementMode, scannerCapturePhase, scannerTargetLocked, selectedWorkOrder, show]);

  const chooseWorkOrder = useCallback((workOrder) => {
    if (workOrder?.destinationLinked === false) return;
    requestRunRef.current += 1;
    pendingCodesRef.current.clear();
    scannerSeenEventIdsRef.current = new Set();
    setScannerPollWarning("");
    setSelectedWorkOrder(workOrder);
    setWorkOrderSearch(workOrderLabel(workOrder));
    setMenuOpen(false);
    setActiveOption(0);
    setRows([]);
    rowsRef.current = [];
    setResolvingCount(0);
    setMessage("");
    setError("");
    setMovementMode("");
    setSubmittedMovementMode("");
    setReadyPrompt(false);
    setResult(null);
    setPhase("scanning");
    setOperationId(createOperationId());
  }, []);

  const clearWorkOrder = useCallback(() => {
    if (editingLocked) return;
    requestRunRef.current += 1;
    pendingCodesRef.current.clear();
    scannerSeenEventIdsRef.current = new Set();
    setScannerPollWarning("");
    setSelectedWorkOrder(null);
    setWorkOrderSearch("");
    setRows([]);
    rowsRef.current = [];
    setResolvingCount(0);
    setCameraOpen(false);
    setMessage("Choose another work order, then scan its items.");
    setError("");
    setMovementMode("");
    setSubmittedMovementMode("");
    setReadyPrompt(false);
    setResult(null);
    setPhase("idle");
    setOperationId(createOperationId());
  }, [editingLocked]);

  const handleWorkOrderKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const wasOpen = menuOpen;
      setMenuOpen(true);
      setActiveOption((index) =>
        filteredWorkOrders.length
          ? wasOpen
            ? (index + 1) % filteredWorkOrders.length
            : 0
          : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const wasOpen = menuOpen;
      setMenuOpen(true);
      setActiveOption((index) =>
        filteredWorkOrders.length
          ? wasOpen
            ? (index - 1 + filteredWorkOrders.length) % filteredWorkOrders.length
            : filteredWorkOrders.length - 1
          : 0
      );
    } else if (event.key === "Enter" && menuOpen && filteredWorkOrders.length) {
      event.preventDefault();
      chooseWorkOrder(filteredWorkOrders[activeOption] || filteredWorkOrders[0]);
    } else if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  const stageCode = useCallback(async (rawCode) => {
    const code = cleanText(rawCode);
    const normalizedCode = code.toUpperCase();
    if (
      !selectedWorkOrder ||
      !movementMode ||
      !code ||
      editingLocked ||
      scannerCaptureBusy
    ) return false;
    setError("");
    setMessage("");
    if (
      pendingCodesRef.current.has(normalizedCode) ||
      rowsRef.current.some((row) => row.code.toUpperCase() === normalizedCode)
    ) {
      setMessage(`${code} is already in this list.`);
      return true;
    }
    pendingCodesRef.current.add(normalizedCode);
    setResolvingCount((count) => count + 1);
    const run = requestRunRef.current;
    try {
      const payload = await authenticatedRequest("/api/items/work-order-add/resolve", {
        method: "POST",
        body: { code },
      });
      if (run !== requestRunRef.current) return;
      const resolution = payload?.resolution || {};
      if (cleanText(resolution.status).toLowerCase() !== "ready") {
        setError(describeResolutionError(resolution));
        return true;
      }
      const canonicalKey = resolutionKey(resolution, code);
      const entityKeys = resolutionEntityKeys(resolution, code);
      const nextRow = {
        rowKey: `${canonicalKey}:${Date.now()}`,
        canonicalKey,
        entityKeys,
        code,
        resolution,
      };
      const duplicate = rowsRef.current.some((row) =>
        (row.entityKeys || [row.canonicalKey]).some((key) => entityKeys.includes(key))
      );
      if (duplicate) {
        setMessage(
          `${resolutionName(resolution, code)} or inventory inside it is already in this list.`
        );
        return true;
      }
      const nextRows = [...rowsRef.current, nextRow];
      rowsRef.current = nextRows;
      setRows(nextRows);
      setMessage(`${resolutionName(resolution, code)} added.`);
      return true;
    } catch (requestError) {
      if (run !== requestRunRef.current) return;
      setError(requestError?.message || "That scan could not be resolved.");
      const status = Number(requestError?.status);
      return Boolean(status && status !== 408 && status !== 429 && status < 500);
    } finally {
      pendingCodesRef.current.delete(normalizedCode);
      if (run === requestRunRef.current) {
        setResolvingCount((count) => Math.max(0, count - 1));
      }
    }
  }, [editingLocked, movementMode, scannerCaptureBusy, selectedWorkOrder]);

  stageCodeRef.current = stageCode;

  const removeRow = useCallback((rowKey) => {
    if (editingLocked) return;
    const nextRows = rowsRef.current.filter((row) => row.rowKey !== rowKey);
    rowsRef.current = nextRows;
    setRows(nextRows);
    setReadyPrompt(false);
    setMessage("Item removed from the staged list.");
    setError("");
  }, [editingLocked]);

  const handleManualScan = (event) => {
    event.preventDefault();
    const code = cleanText(scanInput);
    if (!code) return;
    // Clear before resolution returns so consecutive manual or camera entries
    // always start in an empty field, including when this code fails to resolve.
    setScanInput("");
    stageCode(code);
  };

  const handleCameraUpdate = (scanError, scanResult) => {
    if (
      scanError ||
      !scanResult ||
      !cameraOpen ||
      editingLocked ||
      scannerCaptureBusy
    ) return;
    const code = cleanText(
      typeof scanResult.getText === "function"
        ? scanResult.getText()
        : scanResult.text
    );
    if (!code) return;
    const now = Date.now();
    const last = cameraLastCodeRef.current;
    if (last.code === code && now - last.at < 1800) return;
    cameraLastCodeRef.current = { code, at: now };
    stageCode(code);
  };

  const submitConfirmation = useCallback(async () => {
    if (
      !selectedWorkOrder ||
      !movementMode ||
      !rowsRef.current.length ||
      pendingCodesRef.current.size ||
      busy
    ) return;
    const confirmationMovementMode = submittedMovementMode || movementMode;
    if (!submittedMovementMode) setSubmittedMovementMode(confirmationMovementMode);
    setPhase("submitting");
    setError("");
    setMessage("");
    if (
      scannerCaptureRef.current &&
      !(await stopScannerCapture("confirmed"))
    ) {
      setSubmittedMovementMode("");
      setReadyPrompt(false);
      setPhase("scanning");
      return;
    }
    try {
      const payload = await authenticatedRequest("/api/items/work-order-add/confirm", {
        method: "POST",
        body: buildWorkOrderAddConfirmationPayload({
          operationId,
          workOrderId: workOrderId(selectedWorkOrder),
          scans: rowsRef.current.map((row) => row.code),
          expectedMembership: rowsRef.current.map((row) => ({
            code: row.code,
            fingerprint: cleanText(row.resolution?.membershipFingerprint),
          })),
          movementMode: confirmationMovementMode,
        }),
      });
      setCameraOpen(false);
      setReadyPrompt(false);
      setResult(payload?.result || {});
      setPhase("success");
      try {
        onConfirmed(payload?.result || {});
      } catch (callbackError) {
        console.error("Work order add refresh callback failed", callbackError);
      }
    } catch (requestError) {
      setError(requestError?.message || "The items could not be sent to this work order.");
      const status = Number(requestError?.status) || 0;
      const ambiguousOutcome =
        status === 0 || status === 408 || status === 429 || status >= 500;
      if (!ambiguousOutcome) {
        setSubmittedMovementMode("");
        setReadyPrompt(false);
        setOperationId(createOperationId());

        if (requestError?.code === "staged_membership_changed") {
          const affectedCode = cleanText(requestError?.payload?.details?.code).toUpperCase();
          if (affectedCode) {
            const nextRows = rowsRef.current.filter(
              (row) =>
                ![
                  row.code,
                  row.resolution?.code,
                  row.resolution?.canonicalId,
                ]
                  .map((value) => cleanText(value).toUpperCase())
                  .includes(affectedCode)
            );
            if (nextRows.length !== rowsRef.current.length) {
              rowsRef.current = nextRows;
              setRows(nextRows);
              setMessage(
                `${affectedCode} was removed because its contents changed. Scan it again to review the current inventory.`
              );
            }
          }
        }
      }
      setPhase("scanning");
    }
  }, [
    busy,
    movementMode,
    onConfirmed,
    operationId,
    selectedWorkOrder,
    stopScannerCapture,
    submittedMovementMode,
  ]);

  const closeModal = async () => {
    if (busy || scannerCaptureBusy) return;
    if (
      scannerCaptureRef.current &&
      !(await stopScannerCapture("cancelled"))
    ) {
      return;
    }
    requestRunRef.current += 1;
    setCameraOpen(false);
    onHide();
  };

  const selectedNumber = selectedWorkOrder ? workOrderNumber(selectedWorkOrder) : "";
  const scannerRelayActive = ["active", "poll_error"].includes(
    scannerCapturePhase
  );
  const selectedDestination = selectedWorkOrder
    ? workOrderDestinationLabel(selectedWorkOrder)
    : "Work-order destination";
  const selectedMovement = describeWorkOrderAddMovement(
    movementMode,
    selectedWorkOrder || {}
  );
  const stagedItemCount = rows.reduce((total, row) => {
    const preview = resolutionPreview(row.resolution);
    if (resolutionKind(row.resolution) === "item") return total + 1;
    return total + Math.max(0, Number(preview.itemCount || 0));
  }, 0);

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="xl"
      centered
      scrollable
      backdrop={busy || scannerCaptureBusy ? "static" : true}
      keyboard={!busy && !scannerCaptureBusy}
      dialogClassName={styles.dialog}
      contentClassName={styles.modalContent}
      aria-labelledby="work-order-add-title"
    >
      <Modal.Header closeButton={!busy && !scannerCaptureBusy} className={styles.modalHeader}>
        <div>
          <span className={styles.eyebrow}>Inventory movement</span>
          <Modal.Title id="work-order-add-title">Work order add</Modal.Title>
          <p>Choose a Magmo work order, scan the inventory, then review before sending.</p>
        </div>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {optionsError ? (
          <Alert variant="danger" className={styles.alert}>
            <span>{optionsError}</span>
            <Button variant="outline-danger" size="sm" onClick={() => loadOptions(undefined, workOrderSearch)}>
              Retry
            </Button>
          </Alert>
        ) : null}
        {error ? <Alert variant="danger" className={styles.alert}>{error}</Alert> : null}
        {scannerPollWarning ? (
          <Alert variant="warning" className={styles.alert}>
            {scannerPollWarning}
          </Alert>
        ) : null}
        {message ? <Alert variant="info" className={styles.alert}>{message}</Alert> : null}

        <section className={styles.section} aria-labelledby="work-order-add-selection-title">
          <div className={styles.sectionHeading}>
            <span className={styles.step}>01</span>
            <div>
              <h3 id="work-order-add-selection-title">Choose the work order</h3>
              <p>Search by work-order number, customer, site, or title.</p>
            </div>
          </div>

          {selectedWorkOrder ? (
            <div className={styles.selectedWorkOrder}>
              <div>
                <span>{selectedNumber ? `WO #${selectedNumber}` : "Selected work order"}</span>
                <strong>{workOrderSubject(selectedWorkOrder)}</strong>
                {workOrderCustomer(selectedWorkOrder) ? (
                  <small>{workOrderCustomer(selectedWorkOrder)}</small>
                ) : null}
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={clearWorkOrder}
                disabled={editingLocked || scannerTargetLocked}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className={styles.comboboxWrap}>
              <label htmlFor="work-order-add-search">Work order</label>
              <div className={styles.combobox}>
                <span aria-hidden="true" className={styles.searchGlyph}>⌕</span>
                <input
                  id="work-order-add-search"
                  type="search"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={menuOpen}
                  aria-controls={WORK_ORDER_MENU_ID}
                  aria-activedescendant={
                    menuOpen && filteredWorkOrders[activeOption]
                      ? `work-order-add-option-${activeOption}`
                      : undefined
                  }
                  value={workOrderSearch}
                  placeholder={optionsLoading ? "Loading work orders…" : "Type a work-order number or name…"}
                  autoComplete="off"
                  disabled={Boolean(optionsError)}
                  onFocus={() => setMenuOpen(true)}
                  onBlur={() => setTimeout(() => setMenuOpen(false), 120)}
                  onChange={(event) => {
                    setWorkOrderSearch(event.target.value);
                    setMenuOpen(true);
                  }}
                  onKeyDown={handleWorkOrderKeyDown}
                />
                {optionsLoading ? <Spinner animation="border" size="sm" /> : null}
              </div>
              {menuOpen && !optionsLoading && !optionsError ? (
                <div id={WORK_ORDER_MENU_ID} role="listbox" className={styles.workOrderMenu}>
                  {filteredWorkOrders.length ? (
                    filteredWorkOrders.map((workOrder, index) => (
                      <WorkOrderOption
                        key={workOrderId(workOrder) || `${workOrderNumber(workOrder)}-${index}`}
                        id={`work-order-add-option-${index}`}
                        workOrder={workOrder}
                        active={index === activeOption}
                        onChoose={chooseWorkOrder}
                      />
                    ))
                  ) : (
                    <div className={styles.emptyOptions}>No matching work orders.</div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </section>

        <section
          className={`${styles.section} ${!selectedWorkOrder ? styles.sectionDisabled : ""}`}
          aria-labelledby="work-order-add-direction-title"
        >
          <div className={styles.sectionHeading}>
            <span className={styles.step}>02</span>
            <div>
              <h3 id="work-order-add-direction-title">Choose from or current</h3>
              <p>This required choice controls exactly how every scanned item is moved and saved in history.</p>
            </div>
          </div>

          {selectedWorkOrder ? (
            <fieldset
              className={styles.movementFieldset}
              disabled={isWorkOrderAddMovementModeLocked({
                editingLocked: editingLocked || scannerTargetLocked,
                rowCount: rows.length,
                resolvingCount,
              })}
            >
              <legend>Where are these items going?</legend>
              <div className={styles.movementChoices}>
                <label
                  className={`${styles.movementChoice} ${movementMode === MOVEMENT_FROM_WORK_ORDER ? styles.movementChoiceSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="work-order-add-movement-mode"
                    value={MOVEMENT_FROM_WORK_ORDER}
                    checked={movementMode === MOVEMENT_FROM_WORK_ORDER}
                    required
                    onChange={(event) => {
                      setMovementMode(event.target.value);
                      setMessage("");
                      setError("");
                    }}
                  />
                  <span className={styles.movementChoiceBody}>
                    <strong>From work order</strong>
                    <small>Use when inventory came back from the work-order site.</small>
                    <span className={styles.movementRoute}>
                      <span><b>From</b>{selectedDestination}</span>
                      <span aria-hidden="true">→</span>
                      <span><b>Current</b>SoCal Warehouse Interior</span>
                    </span>
                  </span>
                </label>

                <label
                  className={`${styles.movementChoice} ${movementMode === MOVEMENT_CURRENT_AT_WORK_ORDER ? styles.movementChoiceSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="work-order-add-movement-mode"
                    value={MOVEMENT_CURRENT_AT_WORK_ORDER}
                    checked={movementMode === MOVEMENT_CURRENT_AT_WORK_ORDER}
                    required
                    onChange={(event) => {
                      setMovementMode(event.target.value);
                      setMessage("");
                      setError("");
                    }}
                  />
                  <span className={styles.movementChoiceBody}>
                    <strong>Current at work order</strong>
                    <small>Use when inventory is being sent from the warehouse to the work-order site.</small>
                    <span className={styles.movementRoute}>
                      <span><b>From</b>SoCal Warehouse Interior</span>
                      <span aria-hidden="true">→</span>
                      <span><b>Current</b>{selectedDestination}</span>
                    </span>
                  </span>
                </label>
              </div>
              <p className={movementMode ? styles.movementSelectedSummary : styles.movementRequired}>
                {submittedMovementMode
                  ? `Direction locked after the confirmation attempt: From ${selectedMovement.from} → Current ${selectedMovement.current}. Retry this exact list or cancel and start again.`
                  : rows.length
                  ? `Direction locked for this list: From ${selectedMovement.from} → Current ${selectedMovement.current}. Remove all staged inventory to change it.`
                  : scannerTargetLocked
                    ? `Direction locked while scanner capture is assigned: From ${selectedMovement.from} → Current ${selectedMovement.current}. Stop the scanner to change it.`
                  : movementMode
                    ? `Selected: From ${selectedMovement.from} → Current ${selectedMovement.current}`
                  : "Select one direction before scanning inventory."}
              </p>
            </fieldset>
          ) : (
            <p className={styles.movementPlaceholder}>Choose a work order first so Magmo can show its destination.</p>
          )}
        </section>

        <section
          className={`${styles.section} ${!selectedWorkOrder || !movementMode ? styles.sectionDisabled : ""}`}
          aria-labelledby="work-order-add-scan-title"
        >
          <div className={styles.sectionHeading}>
            <span className={styles.step}>03</span>
            <div>
              <h3 id="work-order-add-scan-title">Build the item list</h3>
              <p>{movementMode ? "Scan an item, bin, or pallet. Nothing moves until final confirmation." : "Choose the movement direction above to activate scanning."}</p>
            </div>
          </div>

          <div
            className={`${styles.scannerCapturePanel} ${
              scannerRelayActive ? styles.scannerCaptureActive : ""
            }`}
          >
            <span
              className={`${styles.scannerCaptureDot} ${
                scannerRelayActive ? styles.scannerCaptureDotActive : ""
              }`}
              aria-hidden="true"
            />
            <div
              className={styles.scannerCaptureCopy}
              role="status"
              aria-live="polite"
            >
              <strong>
                {scannerCapturePhase === "active"
                  ? "Scanner server relay active"
                  : scannerCapturePhase === "poll_error"
                    ? "Scanner relay reconnecting"
                  : scannerCapturePhase === "starting"
                    ? "Connecting to scanner server…"
                    : scannerCapturePhase === "stopping"
                      ? "Stopping scanner relay…"
                      : scannerCapturePhase === "stop_error"
                        ? "Scanner relay release needs attention"
                        : scannerCapturePhase === "start_error"
                          ? "Scanner server did not connect"
                          : scannerCapturePhase === "expired"
                            ? "Scanner relay expired"
                            : "Scanner server relay is off"}
              </strong>
              <span>
                {scannerRelayActive
                  ? `Server scans appear here automatically and item-page opening is paused${
                      scannerCaptureMeta?.expiresAt
                        ? ` until ${new Date(scannerCaptureMeta.expiresAt).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}`
                        : ""
                    }. No browser field needs focus.`
                  : "Enable this to receive scans from the warehouse scanner server. Manual entry and the camera remain available while it is off."}
              </span>
            </div>
            <div className={styles.scannerCaptureActions}>
              <Button
                type="button"
                variant={scannerRelayActive ? "outline-danger" : "outline-success"}
                disabled={
                  scannerCaptureBusy ||
                  (!scannerRelayActive &&
                    scannerCapturePhase !== "stop_error" &&
                    (!selectedWorkOrder || !movementMode || editingLocked))
                }
                onClick={() => {
                  if (["active", "poll_error", "stop_error"].includes(scannerCapturePhase)) {
                    void stopScannerCapture("cancelled");
                  } else {
                    void startScannerCapture();
                  }
                }}
              >
                {scannerCapturePhase === "starting" || scannerCapturePhase === "stopping" ? (
                  <Spinner animation="border" size="sm" />
                ) : scannerRelayActive ? (
                  "Stop relay"
                ) : scannerCapturePhase === "stop_error" ? (
                  "Retry release"
                ) : scannerCapturePhase === "start_error" ? (
                  "Retry enable"
                ) : (
                  "Enable scanner"
                )}
              </Button>
              {scannerCapturePhase === "start_error" && scannerTargetLocked ? (
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={scannerCaptureBusy}
                  onClick={() => void stopScannerCapture("failed")}
                >
                  Release uncertain session
                </Button>
              ) : null}
            </div>
          </div>

          <form className={styles.scanForm} onSubmit={handleManualScan}>
            <label htmlFor="work-order-add-scan">Manual barcode input</label>
            <div className={styles.scanInputRow}>
              <input
                ref={scanInputRef}
                id="work-order-add-scan"
                value={scanInput}
                autoComplete="off"
                inputMode="text"
                readOnly={scannerTargetLocked}
                aria-readonly={scannerTargetLocked}
                placeholder={
                  scannerTargetLocked
                    ? "Server scans appear in the list automatically"
                    : "Type or scan an AIS, bin, or pallet ID"
                }
                disabled={
                  !selectedWorkOrder ||
                  !movementMode ||
                  editingLocked ||
                  scannerCaptureBusy
                }
                onChange={(event) => setScanInput(event.target.value)}
              />
              <Button
                type="submit"
                variant="success"
                disabled={
                  !selectedWorkOrder ||
                  !movementMode ||
                  !cleanText(scanInput) ||
                  editingLocked ||
                  scannerCaptureBusy ||
                  scannerTargetLocked
                }
              >
                {resolvingCount ? <Spinner animation="border" size="sm" /> : "Add"}
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disabled={
                  !selectedWorkOrder ||
                  !movementMode ||
                  editingLocked ||
                  scannerCaptureBusy
                }
                aria-expanded={cameraOpen}
                onClick={() => setCameraOpen((open) => !open)}
              >
                {cameraOpen ? "Close camera" : "Use camera"}
              </Button>
            </div>
          </form>

          {cameraOpen && selectedWorkOrder && movementMode ? (
            <div className={styles.cameraPanel}>
              <BarcodeScannerComponent
                width="100%"
                height={280}
                facingMode={cameraFacing}
                stopStream={!cameraOpen || !show}
                onUpdate={handleCameraUpdate}
              />
              <div className={styles.cameraActions}>
                <span>Hold the barcode inside the frame.</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() =>
                    setCameraFacing((facing) =>
                      facing === "environment" ? "user" : "environment"
                    )
                  }
                >
                  Switch camera
                </Button>
              </div>
            </div>
          ) : null}

          <div className={styles.stagedHeader}>
            <div>
              <strong>Staged inventory</strong>
              <span>
                {rows.length} {rows.length === 1 ? "scan" : "scans"}
                {stagedItemCount ? ` · ${stagedItemCount} inventory ${stagedItemCount === 1 ? "item" : "items"}` : ""}
              </span>
            </div>
            {resolvingCount ? (
              <span className={styles.resolving}><Spinner animation="border" size="sm" /> Checking scan…</span>
            ) : null}
          </div>

          {rows.length ? (
            <ul className={styles.stagedList}>
              {rows.map((row) => (
                <StagedRow key={row.rowKey} row={row} disabled={editingLocked} onRemove={removeRow} />
              ))}
            </ul>
          ) : (
            <div className={styles.emptyList}>
              <span aria-hidden="true">▦</span>
              <strong>No inventory has been staged.</strong>
              <small>{movementMode ? "Scan the first item, bin, or pallet." : "Select a work order and movement direction first."}</small>
            </div>
          )}
        </section>

        {readyPrompt ? (
          <section className={styles.confirmPanel} aria-live="polite">
            <div>
              <span className={styles.eyebrow}>Final check</span>
              <h3>Is the list ready to be sent?</h3>
              <p>
                This will attach {stagedItemCount || rows.length} inventory {stagedItemCount === 1 ? "item" : "items"} to {selectedNumber ? `work order #${selectedNumber}` : "the selected work order"}, record <strong>From: {selectedMovement.from}</strong> and <strong>Current: {selectedMovement.current}</strong>, and save each item&apos;s previous configuration in history.
              </p>
            </div>
            <div className={styles.confirmActions}>
              <Button
                variant="outline-secondary"
                onClick={() => setReadyPrompt(false)}
                disabled={busy || scannerCaptureBusy}
              >
                Not yet
              </Button>
              <Button
                variant="success"
                onClick={() => submitConfirmation()}
                disabled={busy || scannerCaptureBusy || resolvingCount > 0}
              >
                Yes, send the list
              </Button>
            </div>
          </section>
        ) : null}

        {phase === "success" ? (
          <section className={styles.successPanel} aria-live="polite">
            <span className={styles.successIcon} aria-hidden="true">✓</span>
            <div>
              <span className={styles.eyebrow}>Saved</span>
              <h3>Inventory was added to the work order.</h3>
              <p>
                {Number(result?.itemCount || stagedItemCount || rows.length)} inventory {Number(result?.itemCount || stagedItemCount || rows.length) === 1 ? "item was" : "items were"} updated from {selectedMovement.from} to {selectedMovement.current}. The movement and the user who performed it were saved in each item&apos;s history.
              </p>
              {result?.alreadyConfirmed ? <small>This confirmation was already applied; no duplicate history was created.</small> : null}
            </div>
          </section>
        ) : null}
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <div className={styles.footerSummary}>
          {selectedWorkOrder ? (
            <>
              <strong>{selectedNumber ? `WO #${selectedNumber}` : "Work order selected"}</strong>
              <span>{movementMode ? `${selectedMovement.shortLabel} · ` : "Direction required · "}{rows.length} staged {rows.length === 1 ? "scan" : "scans"}</span>
            </>
          ) : (
            <span>Choose a work order to begin.</span>
          )}
        </div>
        <div className={styles.footerButtons}>
          <Button
            variant="outline-secondary"
            onClick={closeModal}
            disabled={busy || scannerCaptureBusy}
          >
            {phase === "success" ? "Done" : "Cancel"}
          </Button>
          {phase !== "success" ? (
            <Button
              variant="success"
              disabled={
                !selectedWorkOrder ||
                !movementMode ||
                !rows.length ||
                resolvingCount > 0 ||
                busy ||
                scannerCaptureBusy
              }
              onClick={() => setReadyPrompt(true)}
            >
              {busy ? <><Spinner animation="border" size="sm" /> Sending…</> : "Confirm list"}
            </Button>
          ) : null}
        </div>
      </Modal.Footer>
    </Modal>
  );
}
