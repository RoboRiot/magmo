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
import scanQueueLib from "../lib/inventory/scanResolutionQueue.cjs";
import styles from "./WorkOrderAddModal.module.css";

const { createScanResolutionQueue } = scanQueueLib;

const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

const WORK_ORDER_MENU_ID = "work-order-add-options";
const MAX_VISIBLE_WORK_ORDERS = 10;
const WORK_ORDER_DRAIN_DEADLINE_MS = 30000;
const WORK_ORDER_DRAIN_POLL_MS = 150;
const LEGACY_DRAIN_SETTLE_POLLS = 3;

function waitFor(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function drainIsUnsupported(error) {
  return (
    Number(error?.status) === 404 &&
    cleanText(error?.code).toLowerCase() === "scanner_drain_unsupported"
  );
}

function drainErrorIsTransient(error) {
  const status = Number(error?.status) || 0;
  return !status || status === 408 || status === 429 || status >= 500;
}

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
  const [scannerQueueStats, setScannerQueueStats] = useState({
    queued: 0,
    active: 0,
    retrying: 0,
    outstanding: 0,
  });
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
  const scannerResolutionQueueRef = useRef(null);
  const scannerMountedRef = useRef(true);
  const scannerShowRef = useRef(show);
  const stageCodeRef = useRef(null);
  scannerShowRef.current = show;

  const busy = phase === "submitting";
  const scannerCaptureBusy = ["starting", "draining", "stopping"].includes(
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

  const closeScannerResolutionQueue = useCallback(() => {
    scannerResolutionQueueRef.current?.close();
    scannerResolutionQueueRef.current = null;
    setScannerQueueStats({ queued: 0, active: 0, retrying: 0, outstanding: 0 });
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
    closeScannerResolutionQueue();
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
  }, [clearScannerPollTimer, closeScannerResolutionQueue]);

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
        scannerResolutionQueueRef.current?.close();
        scannerResolutionQueueRef.current = null;
        setScannerQueueStats({ queued: 0, active: 0, retrying: 0, outstanding: 0 });
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

  const ensureScannerResolutionQueue = useCallback((capture) => {
    if (scannerResolutionQueueRef.current) {
      return scannerResolutionQueueRef.current;
    }
    const queue = createScanResolutionQueue({
      concurrency: 3,
      keyOf: (event) => event.eventId,
      worker: async (event) => {
        const consumed = await stageCodeRef.current?.(event.code, {
          source: "scanner-server",
          eventId: event.eventId,
          retryTransient: true,
        });
        if (!consumed) {
          throw new WorkOrderAddRequestError(
            "This scan is waiting for the Work Order list to become ready.",
            { status: 503, code: "scan_not_consumed" }
          );
        }
        return true;
      },
      onFailed: (event, requestError) => {
        if (!sameScannerCapture(scannerCaptureRef.current, capture)) return;
        scannerCaptureRef.current = {
          ...scannerCaptureRef.current,
          resolutionFailure: {
            eventId: event.eventId,
            code: event.code,
            message:
              requestError?.message || "inventory lookup failed after retries",
          },
        };
        setScannerPollWarning(
          `${event.code} could not be loaded after retries: ${
            requestError?.message || "inventory lookup failed"
          }`
        );
      },
      onStats: (stats) => {
        if (sameScannerCapture(scannerCaptureRef.current, capture)) {
          setScannerQueueStats(stats);
        }
      },
    });
    scannerResolutionQueueRef.current = queue;
    return queue;
  }, []);

  const pollScannerCapture = useCallback(async (
    capture,
    {
      forceAfterCurrent = false,
      scheduleNext = true,
      propagateErrors = false,
    } = {}
  ) => {
    const currentAtStart = scannerCaptureRef.current;
    if (
      !capture?.sessionId ||
      !scannerMountedRef.current ||
      !scannerShowRef.current ||
      !sameScannerCapture(currentAtStart, capture)
    ) {
      return null;
    }
    if (currentAtStart?.pollPromise) {
      try {
        await currentAtStart.pollPromise;
      } catch {
        // The owner of the in-flight poll handles its UI state. A forced drain
        // refresh below starts one clean read after that owner has settled.
      }
      await waitFor(0);
      if (forceAfterCurrent) {
        return scannerPollNowRef.current?.(capture, {
          forceAfterCurrent: false,
          scheduleNext,
          propagateErrors,
        });
      }
      return null;
    }
    if (currentAtStart?.startPromise || currentAtStart?.stopPromise) {
      return null;
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
        return null;
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
        scannerResolutionQueueRef.current?.close();
        scannerResolutionQueueRef.current = null;
        setScannerQueueStats({ queued: 0, active: 0, retrying: 0, outstanding: 0 });
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
      const resolutionQueue = ensureScannerResolutionQueue(capture);
      for (const event of events) {
        const eventId = cleanText(event?.eventId, 300);
        const code = cleanText(event?.code, 200);
        if (!eventId || !code || scannerSeenEventIdsRef.current.has(eventId)) {
          continue;
        }
        if (resolutionQueue.enqueue({ eventId, code })) {
          scannerSeenEventIdsRef.current.add(eventId);
        }
      }

      if (
        sameScannerCapture(scannerCaptureRef.current, capture) &&
        !scannerCaptureRef.current?.stopPromise
      ) {
        setScannerCapturePhase(
          scannerCaptureRef.current?.draining ? "draining" : "active"
        );
        if (scheduleNext && !scannerCaptureRef.current?.draining) {
          scheduleScannerPoll(
            scannerCaptureRef.current,
            Number(session.pollAfterMs) || 1000
          );
        }
      }
      return session;
    } catch (requestError) {
      const currentCapture = scannerCaptureRef.current;
      const ownsPoll =
        sameScannerCapture(currentCapture, capture) &&
        currentCapture?.pollPromise === pollPromise;
      if (!ownsPoll) return null;
      scannerCaptureRef.current = {
        ...currentCapture,
        pollPromise: null,
      };
      if (currentCapture?.stopPromise) return null;
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
        if (propagateErrors) throw requestError;
        return null;
      }
      if (scannerMountedRef.current && scannerShowRef.current) {
        if (!scannerCaptureRef.current?.draining) {
          setScannerCapturePhase("poll_error");
          setScannerPollWarning(
            "The scanner relay is temporarily unreachable. Magmo will keep retrying without losing server scans."
          );
          if (scheduleNext) {
            scheduleScannerPoll(scannerCaptureRef.current, 2000);
          }
        }
      }
      if (propagateErrors) throw requestError;
      return null;
    }
  }, [clearScannerPollTimer, ensureScannerResolutionQueue, scheduleScannerPoll]);

  scannerPollNowRef.current = pollScannerCapture;

  const drainScannerCapture = useCallback(async (
    capture,
    reason = "confirmed"
  ) => {
    if (
      !capture?.sessionId ||
      !capture?.workOrderId ||
      !sameScannerCapture(scannerCaptureRef.current, capture)
    ) {
      return { drainComplete: false, supported: false };
    }

    clearScannerPollTimer();
    clearTimeout(scannerExpiryTimerRef.current);
    scannerExpiryTimerRef.current = null;
    scannerCaptureRef.current = {
      ...scannerCaptureRef.current,
      draining: true,
    };
    if (scannerMountedRef.current && scannerShowRef.current) {
      setScannerCapturePhase("draining");
      setScannerPollWarning("Finishing scanner deliveries before saving...");
    }

    const deadline = Date.now() + WORK_ORDER_DRAIN_DEADLINE_MS;
    let current = scannerCaptureRef.current;
    let drainComplete = current?.drainComplete === true;
    let supported = current?.drainSupported !== false;
    let drainAttempts = 0;

    while (!drainComplete && supported) {
      drainAttempts += 1;
      let payload;
      try {
        payload = await authenticatedRequest(
          `/api/items/work-order-add/scan-sessions/${encodeURIComponent(
            capture.sessionId
          )}/drain`,
          {
            method: "POST",
            body: {
              workOrderId: capture.workOrderId,
              reason,
            },
          }
        );
      } catch (requestError) {
        if (drainIsUnsupported(requestError)) {
          supported = false;
          break;
        }
        if (drainErrorIsTransient(requestError) && Date.now() < deadline) {
          await waitFor(WORK_ORDER_DRAIN_POLL_MS);
          continue;
        }
        throw requestError;
      }

      await pollScannerCapture(capture, {
        forceAfterCurrent: true,
        scheduleNext: false,
        propagateErrors: true,
      });
      await scannerResolutionQueueRef.current?.whenIdle();

      const drain = payload?.drain || payload || {};
      drainComplete = drain.drained === true;
      current = scannerCaptureRef.current;
      if (sameScannerCapture(current, capture)) {
        scannerCaptureRef.current = {
          ...current,
          drainComplete,
          drainSupported: true,
          draining: true,
        };
      }
      if (drainComplete) break;
      if (Date.now() >= deadline) {
        throw new WorkOrderAddRequestError(
          "The scanner is still delivering recent scans. Nothing was saved; try again.",
          { status: 408, code: "scanner_drain_timeout" }
        );
      }
      const pending = Math.max(0, Number(drain.pendingEventCount) || 0);
      if (scannerMountedRef.current && scannerShowRef.current) {
        setScannerPollWarning(
          pending
            ? `Finishing ${pending} scanner deliver${pending === 1 ? "y" : "ies"} before saving...`
            : `Finishing scanner deliveries before saving (check ${drainAttempts})...`
        );
      }
      await waitFor(WORK_ORDER_DRAIN_POLL_MS);
    }

    if (!drainComplete) {
      current = scannerCaptureRef.current;
      if (sameScannerCapture(current, capture)) {
        scannerCaptureRef.current = {
          ...current,
          drainSupported: false,
          draining: true,
        };
      }
      if (scannerMountedRef.current && scannerShowRef.current) {
        setScannerPollWarning(
          "The scanner server is using compatibility mode. Checking recent scans before saving..."
        );
      }
      for (let index = 0; index < LEGACY_DRAIN_SETTLE_POLLS; index += 1) {
        await pollScannerCapture(capture, {
          forceAfterCurrent: true,
          scheduleNext: false,
          propagateErrors: true,
        });
        await scannerResolutionQueueRef.current?.whenIdle();
        if (index + 1 < LEGACY_DRAIN_SETTLE_POLLS) await waitFor(300);
      }
    }

    await pollScannerCapture(capture, {
      forceAfterCurrent: true,
      scheduleNext: false,
      propagateErrors: true,
    });
    await scannerResolutionQueueRef.current?.whenIdle();

    current = scannerCaptureRef.current;
    if (!sameScannerCapture(current, capture)) {
      throw new WorkOrderAddRequestError(
        "The scanner session ended before its final scans could be reviewed.",
        { status: 409, code: "scanner_session_changed" }
      );
    }
    if (current?.resolutionFailure) {
      const failed = current.resolutionFailure;
      throw new WorkOrderAddRequestError(
        `${failed.code || "A scanner entry"} could not be loaded: ${
          failed.message || "inventory lookup failed"
        }. Release the relay and add that code manually before confirming.`,
        { status: 409, code: "scanner_resolution_failed" }
      );
    }
    scannerCaptureRef.current = {
      ...current,
      drainComplete,
      drainSupported: supported,
      draining: true,
    };
    return { drainComplete, supported };
  }, [clearScannerPollTimer, pollScannerCapture]);

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
      scannerResolutionQueueRef.current?.close();
      scannerResolutionQueueRef.current = null;
      setScannerQueueStats({ queued: 0, active: 0, retrying: 0, outstanding: 0 });
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

  const stageCode = useCallback(async (rawCode, options = {}) => {
    const code = cleanText(rawCode);
    const normalizedCode = code.toUpperCase();
    const fromScannerServer = options.source === "scanner-server";
    const finishingScannerQueue =
      fromScannerServer && scannerCaptureRef.current?.draining === true;
    const markScannerResolutionFailure = (failureMessage) => {
      const capture = scannerCaptureRef.current;
      if (!fromScannerServer || !capture?.sessionId) return;
      scannerCaptureRef.current = {
        ...capture,
        resolutionFailure: {
          eventId: cleanText(options.eventId),
          code,
          message: failureMessage,
        },
      };
    };
    if (
      !selectedWorkOrder ||
      !movementMode ||
      !code ||
      (editingLocked && !finishingScannerQueue) ||
      (scannerCaptureBusy && !finishingScannerQueue)
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
        const resolutionError = describeResolutionError(resolution);
        setError(resolutionError);
        markScannerResolutionFailure(resolutionError);
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
      const resolutionError =
        requestError?.message || "That scan could not be resolved.";
      setError(resolutionError);
      const status = Number(requestError?.status);
      if (
        options.retryTransient === true &&
        (!status || status === 408 || status === 429 || status >= 500)
      ) {
        throw requestError;
      }
      markScannerResolutionFailure(resolutionError);
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
      scannerQueueStats.outstanding > 0 ||
      busy
    ) return;
    const confirmationMovementMode = submittedMovementMode || movementMode;
    if (!submittedMovementMode) setSubmittedMovementMode(confirmationMovementMode);
    setPhase("submitting");
    setError("");
    setMessage("");
    const capture = scannerCaptureRef.current;
    if (capture) {
      try {
        await drainScannerCapture(capture, "confirmed");
      } catch (requestError) {
        setSubmittedMovementMode("");
        setReadyPrompt(false);
        setPhase("scanning");
        setScannerCapturePhase("drain_error");
        setError(
          requestError?.message ||
            "Recent scanner deliveries could not be finished. Nothing was saved."
        );
        return;
      }
      if (!(await stopScannerCapture("confirmed", { capture }))) {
        setSubmittedMovementMode("");
        setReadyPrompt(false);
        setPhase("scanning");
        return;
      }
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
    drainScannerCapture,
    scannerQueueStats.outstanding,
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
  const scannerRelayActive = ["active", "poll_error", "draining", "drain_error"].includes(
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
                    : scannerCapturePhase === "draining"
                      ? "Finishing recent scanner deliveries…"
                      : scannerCapturePhase === "drain_error"
                        ? "Scanner delivery queue needs attention"
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
                  if (["active", "poll_error", "drain_error", "stop_error"].includes(scannerCapturePhase)) {
                    void stopScannerCapture("cancelled");
                  } else {
                    void startScannerCapture();
                  }
                }}
              >
                {["starting", "draining", "stopping"].includes(scannerCapturePhase) ? (
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
            {resolvingCount || scannerQueueStats.outstanding ? (
              <span className={styles.resolving}><Spinner animation="border" size="sm" /> {scannerQueueStats.outstanding ? `${scannerQueueStats.outstanding} queued/loading` : "Checking scan…"}</span>
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
                disabled={busy || scannerCaptureBusy || resolvingCount > 0 || scannerQueueStats.outstanding > 0}
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
                scannerQueueStats.outstanding > 0 ||
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
