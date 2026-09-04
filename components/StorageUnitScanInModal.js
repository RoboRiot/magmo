import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Badge, Button, Modal, Spinner } from "react-bootstrap";
import Link from "next/link";
import firebase from "../context/Firebase";
import storageUnitDetail from "../lib/inventory/storageUnitDetail.cjs";
import scanInLib from "../lib/inventory/storageUnitScanIn.cjs";
import scanQueueLib from "../lib/inventory/scanResolutionQueue.cjs";
import styles from "./StorageUnitScanInModal.module.css";

const {
  STORAGE_UNIT_COLLECTION,
  getMembershipEqualityValues,
  mergeCurrentAndLegacyMembershipRecords,
  normalizeStorageUnitId,
  storageUnitType,
} = storageUnitDetail;
const {
  classifyScannedCode,
  createStorageUnitScanInClient,
  getConfirmableEventIds,
  markRepeatedResolvedTargets,
  normalizeSessionSnapshot,
  validateResolvedRowForTarget,
} = scanInLib;
const { createScanResolutionQueue } = scanQueueLib;

const TERMINAL_EXPIRED_HTTP_STATUSES = new Set([404, 410]);
const STORAGE_DRAIN_DEADLINE_MS = 30000;
const STORAGE_DRAIN_POLL_MS = 150;
const LEGACY_DRAIN_SETTLE_POLLS = 3;

function waitFor(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function drainIsUnsupported(error) {
  return (
    Number(error?.status) === 404 &&
    String(error?.code || "").toLowerCase() === "scanner_drain_unsupported"
  );
}

function drainErrorIsTransient(error) {
  const status = Number(error?.status) || 0;
  return !status || status === 408 || status === 429 || status >= 500;
}

function cancellationWasCommitted(error) {
  const status = String(error?.payload?.session?.status || "").toLowerCase();
  return ["cancelled", "canceled", "closed", "expired"].includes(status);
}

function displayValue(value) {
  if (Array.isArray(value)) {
    const values = value.map((entry) => String(entry ?? "").trim()).filter(Boolean);
    return values.length ? values.join(", ") : "-";
  }
  const text = String(value ?? "").trim();
  return text || "-";
}

function mapItemPreviewDocument(document) {
  const data = document.data() || {};
  return {
    id: document.id,
    ...data,
    nameDisplay: displayValue(data.name),
    pnDisplay: displayValue(data.pn),
    snDisplay: displayValue(data.sn),
    localSNDisplay: displayValue(data.localSN || data.local_sn || document.id),
    hidden: data.visible === false,
    newLocalCurrent:
      data.newLocalCurrent && typeof data.newLocalCurrent === "object"
        ? data.newLocalCurrent
        : {},
  };
}

function currentLocationLabel(item) {
  const current = item?.newLocalCurrent || {};
  const region = String(current.region || "").trim();
  const letter = String(current.section?.letter || "").trim();
  const number = String(current.section?.number ?? "").trim();
  const container = [
    current.pallet != null && String(current.pallet).trim()
      ? `P${String(current.pallet).trim()}`
      : "",
    current.bin != null && String(current.bin).trim()
      ? `B${String(current.bin).trim()}`
      : "",
  ].filter(Boolean);
  const warehouse = region && letter && number ? `${region} - ${letter}${number}` : "";
  return [warehouse, ...container].filter(Boolean).join(" / ") || "Not recorded";
}

async function loadCurrentBinContents(db, binId) {
  const values = getMembershipEqualityValues(binId);
  const [current, legacyLower, legacyUpper] = await Promise.all([
    db.collection("Test").where("newLocalCurrent.bin", "in", values).get(),
    db.collection("Test").where("bin", "in", values).get(),
    db.collection("Test").where("Bin", "in", values).get(),
  ]);
  return mergeCurrentAndLegacyMembershipRecords({
    currentRecords: current.docs.map(mapItemPreviewDocument),
    legacyLowerRecords: legacyLower.docs.map(mapItemPreviewDocument),
    legacyUpperRecords: legacyUpper.docs.map(mapItemPreviewDocument),
    membershipField: "bin",
  }).sort((left, right) =>
    String(left.nameDisplay).localeCompare(String(right.nameDisplay), undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
}

async function resolveScanEvent(event, targetType, client, sessionId) {
  if (!event.eventId) {
    return {
      ...event,
      status: "error",
      kind: "invalid",
      message: "This scan did not include an event ID and cannot be confirmed.",
    };
  }
  if (!event.code) {
    return {
      ...event,
      status: "error",
      kind: "invalid",
      message: "The scanner returned an empty or unsafe code.",
    };
  }
  const payload = await client.resolve(sessionId, event.eventId);
  const serverEvent = payload?.event || {};
  const resolution = serverEvent.resolution || serverEvent;
  const resolutionStatus = String(resolution.status || "").toLowerCase();
  if (["unknown", "ambiguous", "invalid"].includes(resolutionStatus)) {
    return {
      ...event,
      status: resolutionStatus === "invalid" ? "error" : resolutionStatus,
      kind: resolution.kind || classifyScannedCode(event.code).kind,
      canonicalId:
        resolution.itemId ||
        resolution.storageUnitId ||
        resolution.canonicalCode ||
        "",
      message:
        resolution.message ||
        (resolutionStatus === "unknown"
          ? "No inventory record matched this scan."
          : resolutionStatus === "ambiguous"
            ? "This scan matched more than one record."
            : "The scanner reported an error for this event."),
    };
  }
  if (resolutionStatus !== "resolved") {
    return {
      ...event,
      status: "error",
      kind: "invalid",
      message: "The scanner returned an incomplete resolution.",
    };
  }
  if (resolution.kind === "pallet") {
    return {
      ...event,
      status: "not_allowed",
      kind: "pallet",
      canonicalId: resolution.storageUnitId || resolution.canonicalCode,
      message: "A pallet cannot be scanned into another storage unit.",
    };
  }

  const db = firebase.firestore();
  if (resolution.kind === "bin") {
    const binId = normalizeStorageUnitId(
      resolution.storageUnitId || resolution.canonicalCode
    );
    const validation = validateResolvedRowForTarget(
      { status: "ready", kind: "bin" },
      targetType
    );
    if (!validation.allowed) {
      return {
        ...event,
        status: "not_allowed",
        kind: "bin",
        canonicalId: binId,
        message: validation.reason,
      };
    }
    const [binDocument, contents] = await Promise.all([
      db.collection(STORAGE_UNIT_COLLECTION).doc(binId).get(),
      loadCurrentBinContents(db, binId),
    ]);
    if (!binDocument.exists) {
      return {
        ...event,
        status: "unknown",
        kind: "bin",
        canonicalId: binId,
        message: `No bin record exists for ${binId}.`,
      };
    }
    const binData = binDocument.data() || {};
    return {
      ...event,
      status: "ready",
      kind: "bin",
      canonicalId: binId,
      preview: {
        id: binId,
        name: displayValue(binData.name || `Bin ${binData.displayNumber || ""}`),
        contents,
      },
      message: "",
    };
  }

  const itemId = String(resolution.itemId || resolution.canonicalCode || "").trim();
  if (!itemId || /[\/\\\u0000-\u001f\u007f]/.test(itemId)) {
    return {
      ...event,
      status: "error",
      kind: "item",
      message: "The resolved item ID is unsafe or incomplete.",
    };
  }
  const itemDocument = await db.collection("Test").doc(itemId).get();
  if (!itemDocument.exists) {
    return {
      ...event,
      status: "unknown",
      kind: "item",
      canonicalId: itemId,
      message: `No inventory item exists for ${itemId}.`,
    };
  }
  return {
    ...event,
    status: "ready",
    kind: "item",
    canonicalId: itemId,
    preview: mapItemPreviewDocument(itemDocument),
    message: "",
  };
}

function statusBadge(row) {
  if (row.status === "ready") {
    return <Badge bg={row.kind === "bin" ? "info" : "success"}>{row.kind}</Badge>;
  }
  if (row.status === "queued") return <Badge bg="secondary">queued</Badge>;
  if (row.status === "resolving") return <Badge bg="secondary">checking</Badge>;
  if (row.status === "unknown") return <Badge bg="warning">unknown</Badge>;
  if (row.status === "ambiguous") return <Badge bg="warning">ambiguous</Badge>;
  if (row.status === "duplicate") return <Badge bg="warning">duplicate</Badge>;
  if (row.status === "not_allowed") return <Badge bg="danger">not allowed</Badge>;
  return <Badge bg="danger">error</Badge>;
}

function StagedScanRow({ row, unitId, disabled, onRemove }) {
  return (
    <li className={`${styles.scanRow} ${row.status !== "ready" ? styles.problemRow : ""}`}>
      <div className={styles.scanRowHeader}>
        <div className={styles.scanIdentity}>
          {statusBadge(row)}
          <strong>{row.canonicalId || row.code || "Unreadable scan"}</strong>
          {row.status === "duplicate" && row.code && (
            <span>Raw scan: {row.code}</span>
          )}
          {row.scannedAt && (
            <span>{new Date(row.scannedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
          )}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline-danger"
          onClick={() => onRemove(row.rowKey)}
          disabled={disabled}
          aria-label={`Remove ${row.canonicalId || row.code || "scan"} from staged scans`}
        >
          Remove
        </Button>
      </div>

      {row.status === "resolving" && (
        <div className={styles.resolving} role="status">
          <Spinner animation="border" size="sm" /> Checking inventory record...
        </div>
      )}
      {row.message && <p className={styles.rowMessage}>{row.message}</p>}

      {row.status === "ready" && row.kind === "item" && row.preview && (
        <div className={styles.itemPreview}>
          <div>
            <span>Name</span>
            <strong>{row.preview.nameDisplay}</strong>
          </div>
          <div>
            <span>PN / SN</span>
            <strong>{row.preview.pnDisplay} / {row.preview.snDisplay}</strong>
          </div>
          <div>
            <span>Current location</span>
            <strong>{currentLocationLabel(row.preview)}</strong>
          </div>
          <Link href={`/NewSearch/item/${encodeURIComponent(row.preview.id)}`}>
            Open item
          </Link>
          {row.preview.hidden && <Badge bg="secondary">Hidden item</Badge>}
        </div>
      )}

      {row.status === "ready" && row.kind === "bin" && row.preview && (
        <div className={styles.binPreview}>
          <div className={styles.binPreviewHeading}>
            <div>
              <span>Bin preview</span>
              <strong>{row.preview.id}</strong>
            </div>
            <span>
              {row.preview.contents.length} current item
              {row.preview.contents.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className={styles.binContents}>
            {row.preview.contents.map((item) => (
              <div key={item.id} className={styles.binContentItem}>
                <div>
                  <strong>{item.nameDisplay}</strong>
                  <span>{item.localSNDisplay}</span>
                </div>
                {item.hidden && <Badge bg="secondary">Hidden</Badge>}
              </div>
            ))}
            {!row.preview.contents.length && (
              <div className={styles.emptyBin}>This bin currently has no items.</div>
            )}
          </div>
          <Link href={`/NewSearch/inventory/storage/${row.preview.id}`}>
            Open bin details
          </Link>
        </div>
      )}
      {row.status === "ready" && (
        <span className={styles.destinationHint}>Ready to place in {unitId}</span>
      )}
    </li>
  );
}

export default function StorageUnitScanInModal({
  show = false,
  unitId,
  unitType,
  onHide = () => {},
  onConfirmed = () => {},
}) {
  const canonicalUnitId = normalizeStorageUnitId(unitId);
  const canonicalUnitType = storageUnitType(canonicalUnitId) || unitType;
  const [rows, setRows] = useState([]);
  const [phase, setPhase] = useState("idle");
  const [message, setMessage] = useState("");
  const [sessionMeta, setSessionMeta] = useState(null);
  const [sessionEpoch, setSessionEpoch] = useState(0);
  const [resolutionStats, setResolutionStats] = useState({
    queued: 0,
    active: 0,
    retrying: 0,
    outstanding: 0,
  });
  const runRef = useRef(null);
  const rowsRef = useRef([]);
  const pollNowRef = useRef(null);
  const excludedEventIdsRef = useRef(new Set());
  const seenRowKeysRef = useRef(new Set());
  const confirmingRef = useRef(false);

  const client = useMemo(
    () =>
      createStorageUnitScanInClient({
        fetchImpl: (...args) => fetch(...args),
        getIdToken: async () => firebase.auth().currentUser?.getIdToken(),
      }),
    []
  );

  useEffect(() => {
    if (!show || !canonicalUnitId) return undefined;

    const run = {
      stopped: false,
      sessionId: "",
      timer: null,
      confirmed: false,
      cancelSent: false,
      pollPromise: null,
      draining: false,
      drainComplete: false,
      drainSupported: true,
    };
    runRef.current = run;
    excludedEventIdsRef.current = new Set();
    seenRowKeysRef.current = new Set();
    confirmingRef.current = false;
    rowsRef.current = [];
    setRows([]);
    setMessage("");
    setSessionMeta(null);
    setResolutionStats({ queued: 0, active: 0, retrying: 0, outstanding: 0 });
    setPhase("starting");

    const updateRunRows = (updater) => {
      const nextRows = updater(rowsRef.current);
      rowsRef.current = nextRows;
      setRows(nextRows);
      return nextRows;
    };

    const resolutionQueue = createScanResolutionQueue({
      concurrency: 3,
      keyOf: (event) => event.eventId,
      worker: (event) =>
        resolveScanEvent(event, canonicalUnitType, client, run.sessionId),
      onStarted: (event, meta) => {
        if (run.stopped || excludedEventIdsRef.current.has(event.eventId)) return;
        updateRunRows((current) =>
          current.map((row) =>
            row.rowKey === event.rowKey
              ? {
                  ...row,
                  status: "resolving",
                  message:
                    meta.attempt > 1
                      ? `Retrying inventory lookup (${meta.attempt})...`
                      : "Checking inventory record...",
                }
              : row
          )
        );
      },
      onSucceeded: (event, resolved) => {
        if (run.stopped || excludedEventIdsRef.current.has(event.eventId)) return;
        updateRunRows((current) =>
          current.map((row) => (row.rowKey === event.rowKey ? resolved : row))
        );
      },
      onFailed: (event, error) => {
        if (run.stopped || excludedEventIdsRef.current.has(event.eventId)) return;
        updateRunRows((current) =>
          current.map((row) =>
            row.rowKey === event.rowKey
              ? {
                  ...row,
                  status: "error",
                  message:
                    error?.message || "This scan could not be resolved after retries.",
                }
              : row
          )
        );
      },
      onStats: (stats) => {
        if (!run.stopped) setResolutionStats(stats);
      },
    });
    run.resolutionQueue = resolutionQueue;

    const cancelRun = async () => {
      if (!run.sessionId || run.confirmed || run.cancelSent) return;
      run.cancelSent = true;
      try {
        await client.cancel(run.sessionId);
      } catch (error) {
        if (!TERMINAL_EXPIRED_HTTP_STATUSES.has(error?.status)) {
          console.warn("Scan In session cleanup failed", error);
        }
      }
    };

    const schedulePoll = (delay) => {
      if (run.stopped || run.draining) return;
      clearTimeout(run.timer);
      run.timer = setTimeout(() => {
        void poll();
      }, delay);
    };

    const ingestEvents = (events) => {
      events.forEach((event) => {
        if (
          run.stopped ||
          excludedEventIdsRef.current.has(event.eventId || event.rowKey) ||
          seenRowKeysRef.current.has(event.rowKey)
        ) {
          return;
        }
        const staged = {
          ...event,
          status: "queued",
          message: "Queued for inventory lookup.",
        };
        seenRowKeysRef.current.add(event.rowKey);
        updateRunRows((current) => [...current, staged]);
        if (!resolutionQueue.enqueue(event)) {
          seenRowKeysRef.current.delete(event.rowKey);
          updateRunRows((current) =>
            current.filter((row) => row.rowKey !== event.rowKey)
          );
        }
      });
    };

    const poll = ({ propagateErrors = false } = {}) => {
      if (run.stopped || !run.sessionId) return Promise.resolve(null);
      if (run.pollPromise) {
        return propagateErrors
          ? run.pollPromise
          : run.pollPromise.catch(() => null);
      }
      const pollPromise = (async () => {
        try {
          const snapshot = normalizeSessionSnapshot(await client.read(run.sessionId));
          if (run.stopped) return null;
          setSessionMeta(snapshot);
          ingestEvents(snapshot.events);
          if (snapshot.status === "expired") {
            run.stopped = true;
            setPhase("expired");
            setMessage("This scanner session expired. Start a new session to keep scanning.");
            return snapshot;
          }
          if (["cancelled", "canceled", "closed"].includes(snapshot.status)) {
            run.stopped = true;
            setPhase("expired");
            setMessage("This scanner session is no longer active.");
            return snapshot;
          }
          if (snapshot.status === "error") {
            run.stopped = true;
            setPhase("session_error");
            setMessage("The scanner session reported an error. You can start a new one.");
            return snapshot;
          }
          if (!run.draining) {
            setPhase("active");
            setMessage("");
          }
          schedulePoll(snapshot.pollAfterMs);
          return snapshot;
        } catch (error) {
          if (run.stopped) return null;
          if (TERMINAL_EXPIRED_HTTP_STATUSES.has(error?.status)) {
            run.stopped = true;
            setPhase("expired");
            setMessage("This scanner session expired or could not be found.");
          } else if (!run.draining) {
            setPhase("poll_error");
            setMessage(error?.message || "Scans could not be refreshed.");
            schedulePoll(1500);
          }
          throw error;
        }
      })();
      const wrappedPollPromise = pollPromise.finally(() => {
        if (run.pollPromise === wrappedPollPromise) {
          run.pollPromise = null;
        }
      });
      run.pollPromise = wrappedPollPromise;
      return propagateErrors
        ? wrappedPollPromise
        : wrappedPollPromise.catch(() => null);
    };

    pollNowRef.current = poll;

    const start = async () => {
      try {
        const snapshot = normalizeSessionSnapshot(await client.start(canonicalUnitId));
        if (!snapshot.sessionId) {
          throw new Error("The scanner service did not return a session ID.");
        }
        run.sessionId = snapshot.sessionId;
        if (run.stopped) {
          await cancelRun();
          return;
        }
        setSessionMeta(snapshot);
        if (snapshot.status === "expired") {
          run.stopped = true;
          setPhase("expired");
          setMessage("The scanner session expired before it became active.");
          return;
        }
        setPhase("active");
        schedulePoll(snapshot.pollAfterMs);
      } catch (error) {
        if (run.stopped) return;
        setPhase("start_error");
        setMessage(error?.message || "The scanner session could not be started.");
      }
    };

    start();
    return () => {
      run.stopped = true;
      clearTimeout(run.timer);
      resolutionQueue.close();
      pollNowRef.current = null;
      cancelRun();
    };
  }, [canonicalUnitId, canonicalUnitType, client, sessionEpoch, show]);

  const removeRow = (rowKey) => {
    const removedRow = rowsRef.current.find((row) => row.rowKey === rowKey);
    excludedEventIdsRef.current.add(removedRow?.eventId || rowKey);
    const nextRows = rowsRef.current.filter((row) => row.rowKey !== rowKey);
    rowsRef.current = nextRows;
    setRows(nextRows);
  };

  const retry = () => {
    if (phase === "poll_error" && pollNowRef.current) {
      setPhase("active");
      setMessage("");
      pollNowRef.current();
      return;
    }
    setSessionEpoch((value) => value + 1);
  };

  const closeAndCancel = async () => {
    if (confirmingRef.current || phase === "cancelling") return;
    const run = runRef.current;
    if (!run?.sessionId) {
      if (run) run.stopped = true;
      onHide();
      return;
    }
    setPhase("cancelling");
    setMessage("");
    run.stopped = true;
    clearTimeout(run.timer);
    run.resolutionQueue?.close();
    try {
      await client.cancel(run.sessionId);
      run.cancelSent = true;
      onHide();
    } catch (error) {
      if (
        TERMINAL_EXPIRED_HTTP_STATUSES.has(error?.status) ||
        cancellationWasCommitted(error)
      ) {
        run.cancelSent = true;
        onHide();
        return;
      }
      run.stopped = false;
      setPhase("cancel_error");
      setMessage(error?.message || "The session could not be stopped. Retry before closing.");
    }
  };

  const effectiveRows = markRepeatedResolvedTargets(rows);
  const eventIds = getConfirmableEventIds(effectiveRows, canonicalUnitType);
  const hasProblemRows = effectiveRows.some((row) => row.status !== "ready");
  const canConfirm =
    ["active", "drained"].includes(phase) &&
    effectiveRows.length > 0 &&
    eventIds.length === effectiveRows.length &&
    !hasProblemRows &&
    resolutionStats.outstanding === 0 &&
    !confirmingRef.current;

  const confirmPlacement = async () => {
    if (!canConfirm || confirmingRef.current) return;
    const run = runRef.current;
    if (!run?.sessionId) return;
    confirmingRef.current = true;
    run.draining = true;
    clearTimeout(run.timer);
    setPhase("draining");
    setMessage("Finishing scanner deliveries before saving...");
    try {
      if (!run.drainComplete && run.drainSupported !== false) {
        const deadline = Date.now() + STORAGE_DRAIN_DEADLINE_MS;
        let drainAttempts = 0;
        while (!run.drainComplete) {
          drainAttempts += 1;
          let payload;
          try {
            payload = await client.drain(run.sessionId, "confirmed");
          } catch (error) {
            if (drainIsUnsupported(error)) {
              run.drainSupported = false;
              break;
            }
            if (drainErrorIsTransient(error) && Date.now() < deadline) {
              await waitFor(STORAGE_DRAIN_POLL_MS);
              continue;
            }
            throw error;
          }

          await pollNowRef.current?.({ propagateErrors: true });
          await run.resolutionQueue?.whenIdle();
          const drain = payload?.drain || payload || {};
          if (drain.drained === true) {
            run.drainComplete = true;
            break;
          }
          if (Date.now() >= deadline) {
            const error = new Error(
              "The scanner is still delivering recent scans. Nothing was saved; try Confirm again."
            );
            error.status = 408;
            throw error;
          }
          const pending = Math.max(0, Number(drain.pendingEventCount) || 0);
          setMessage(
            pending
              ? `Finishing ${pending} scanner deliver${pending === 1 ? "y" : "ies"} before saving...`
              : `Finishing scanner deliveries before saving (check ${drainAttempts})...`
          );
          await waitFor(STORAGE_DRAIN_POLL_MS);
        }
      }

      if (!run.drainComplete) {
        setMessage(
          "The scanner server is using compatibility mode. Checking recent scans before saving..."
        );
        for (let index = 0; index < LEGACY_DRAIN_SETTLE_POLLS; index += 1) {
          await pollNowRef.current?.({ propagateErrors: true });
          await run.resolutionQueue?.whenIdle();
          if (index + 1 < LEGACY_DRAIN_SETTLE_POLLS) {
            await waitFor(300);
          }
        }
      }

      await pollNowRef.current?.({ propagateErrors: true });
      await run.resolutionQueue?.whenIdle();

      const freshRows = markRepeatedResolvedTargets(rowsRef.current);
      const freshEventIds = getConfirmableEventIds(
        freshRows,
        canonicalUnitType
      );
      const hasFreshProblems = freshRows.some((row) => row.status !== "ready");
      if (
        !freshRows.length ||
        hasFreshProblems ||
        freshEventIds.length !== freshRows.length
      ) {
        confirmingRef.current = false;
        run.draining = run.drainComplete;
        setPhase(run.drainComplete ? "drained" : "active");
        setMessage(
          "Recent scans finished loading. Remove or resolve the highlighted scans before confirming."
        );
        if (!run.drainComplete) pollNowRef.current?.();
        return;
      }

      run.stopped = true;
      setPhase("confirming");
      setMessage("Saving placement...");
      const result = await client.confirm(run.sessionId, freshEventIds);
      run.confirmed = true;
      run.cancelSent = true;
      run.resolutionQueue?.close();
      setPhase("confirmed");
      await onConfirmed(result);
      onHide();
    } catch (error) {
      confirmingRef.current = false;
      if (TERMINAL_EXPIRED_HTTP_STATUSES.has(error?.status)) {
        run.stopped = true;
        run.resolutionQueue?.close();
        setPhase("expired");
        setMessage("This session expired before placement could be confirmed.");
        return;
      }
      run.stopped = false;
      run.draining = run.drainComplete;
      setPhase(run.drainComplete ? "drained" : "active");
      setMessage(error?.message || "Placement was not saved. Review and try again.");
      if (!run.drainComplete) pollNowRef.current?.();
    }
  };

  const restartable = ["expired", "session_error", "start_error"].includes(phase);
  const busy = ["cancelling", "draining", "confirming", "starting"].includes(phase);
  const sessionStatusText =
    phase === "starting"
      ? "Starting scanner session..."
      : phase === "active"
        ? "Scanner session active"
        : phase === "draining"
          ? "Finishing recent scanner deliveries..."
          : phase === "drained"
            ? "Scanner deliveries finished — review staged scans"
        : phase === "confirming"
          ? "Saving placement..."
          : phase === "cancelling"
            ? "Stopping scanner session..."
            : "Scanner session needs attention";

  return (
    <Modal
      show={show}
      onHide={closeAndCancel}
      centered
      size="lg"
      backdrop={busy ? "static" : true}
      keyboard={!busy}
      className={styles.modal}
      dialogClassName={styles.dialog}
      aria-labelledby="storage-scan-in-title"
      aria-describedby="storage-scan-in-description"
    >
      <Modal.Header closeButton={!busy} className={styles.header}>
        <div>
          <Modal.Title id="storage-scan-in-title">Scan into {canonicalUnitId}</Modal.Title>
          <p id="storage-scan-in-description">
            {canonicalUnitType === "pallet"
              ? "Stage inventory items or bins. Nothing moves until Confirm."
              : "Stage inventory items. Nothing moves until Confirm."}
          </p>
        </div>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <div className={styles.sessionBar} role="status" aria-live="polite">
          <span className={`${styles.sessionDot} ${phase === "active" ? styles.activeDot : ""}`} />
          <strong>{sessionStatusText}</strong>
          {sessionMeta?.expiresAt && phase === "active" && (
            <span>Expires {new Date(sessionMeta.expiresAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
          )}
        </div>

        {message && (
          <Alert
            variant={phase === "expired" ? "warning" : "danger"}
            className={styles.workflowAlert}
          >
            <span>{message}</span>
            {phase === "poll_error" && (
              <Button size="sm" variant="outline-danger" onClick={retry}>
                Retry polling
              </Button>
            )}
            {restartable && (
              <Button size="sm" variant="outline-dark" onClick={retry}>
                Start new session
              </Button>
            )}
            {phase === "cancel_error" && (
              <Button size="sm" variant="outline-danger" onClick={closeAndCancel}>
                Retry cancel
              </Button>
            )}
          </Alert>
        )}

        <section className={styles.stagedSection} aria-labelledby="staged-scans-title">
          <div className={styles.stagedHeading}>
            <div>
              <h3 id="staged-scans-title">Staged scans</h3>
              <p>Use the connected scanner. New scans appear here automatically.</p>
            </div>
            <Badge bg="secondary" pill>{effectiveRows.length}</Badge>
          </div>

          {!effectiveRows.length ? (
            <div className={styles.emptyState} role="status">
              {phase === "starting" ? (
                <><Spinner animation="border" size="sm" /> Connecting to scanner...</>
              ) : (
                <>
                  <span className={styles.scanGlyph} aria-hidden="true">⌁</span>
                  <strong>No staged scans yet</strong>
                  <span>Scan an item{canonicalUnitType === "pallet" ? " or bin" : ""} to begin.</span>
                </>
              )}
            </div>
          ) : (
            <ul className={styles.scanList}>
              {effectiveRows.map((row) => (
                <StagedScanRow
                  key={row.rowKey}
                  row={row}
                  unitId={canonicalUnitId}
                  disabled={busy}
                  onRemove={removeRow}
                />
              ))}
            </ul>
          )}
        </section>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <div className={styles.confirmHint} aria-live="polite">
          {resolutionStats.outstanding > 0
            ? `${resolutionStats.outstanding} scan${resolutionStats.outstanding === 1 ? " is" : "s are"} queued or loading. You can keep scanning.`
            : hasProblemRows
            ? "Remove or resolve highlighted scans before confirming."
            : effectiveRows.length
              ? `${effectiveRows.length} staged ${effectiveRows.length === 1 ? "entry" : "entries"} ready.`
              : "Scan at least one entry to confirm."}
        </div>
        <div className={styles.footerActions}>
          <Button
            variant="outline-secondary"
            onClick={closeAndCancel}
            disabled={phase === "confirming" || phase === "cancelling"}
          >
            {phase === "cancelling" ? "Stopping..." : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={confirmPlacement}
            disabled={!canConfirm}
          >
            {phase === "confirming" ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
