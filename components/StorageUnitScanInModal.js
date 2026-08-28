import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Badge, Button, Modal, Spinner } from "react-bootstrap";
import Link from "next/link";
import firebase from "../context/Firebase";
import storageUnitDetail from "../lib/inventory/storageUnitDetail.cjs";
import scanInLib from "../lib/inventory/storageUnitScanIn.cjs";
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

const TERMINAL_EXPIRED_HTTP_STATUSES = new Set([404, 410]);

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

async function resolveScanEvent(event, targetType) {
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
  if (["unknown", "ambiguous", "error"].includes(event.status)) {
    return {
      ...event,
      kind: classifyScannedCode(event.code).kind,
      message:
        event.message ||
        (event.status === "unknown"
          ? "No inventory record matched this scan."
          : event.status === "ambiguous"
            ? "This scan matched more than one record."
            : "The scanner reported an error for this event."),
    };
  }

  const classification = classifyScannedCode(event.code);
  if (classification.kind === "invalid") {
    return {
      ...event,
      status: "error",
      kind: "invalid",
      message: "This is not a valid item, bin, or pallet code.",
    };
  }
  if (classification.kind === "pallet") {
    return {
      ...event,
      status: "not_allowed",
      kind: "pallet",
      canonicalId: classification.canonicalId,
      message: "A pallet cannot be scanned into another storage unit.",
    };
  }

  const db = firebase.firestore();
  if (classification.kind === "bin") {
    const binId = classification.canonicalId;
    const [binDocument, collidingItemDocument] = await Promise.all([
      db.collection(STORAGE_UNIT_COLLECTION).doc(binId).get(),
      db.collection("Test").doc(binId).get(),
    ]);
    if (binDocument.exists && collidingItemDocument.exists) {
      return {
        ...event,
        status: "ambiguous",
        kind: "bin",
        canonicalId: binId,
        message: `${binId} matches both a bin and a legacy item record. Remove it and review the duplicate ID.`,
      };
    }
    if (!binDocument.exists) {
      return {
        ...event,
        status: collidingItemDocument.exists ? "ambiguous" : "unknown",
        kind: "bin",
        canonicalId: binId,
        message: collidingItemDocument.exists
          ? `${binId} is reserved as a bin code but currently resolves only to an item.`
          : `No bin record exists for ${binId}.`,
      };
    }
    const binData = binDocument.data() || {};
    if (storageUnitType(binDocument.id) !== "bin") {
      return {
        ...event,
        status: "error",
        kind: "bin",
        canonicalId: binId,
        message: `${binId} is not a canonical bin record.`,
      };
    }
    const contents = await loadCurrentBinContents(db, binId);
    const resolved = {
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
    const validation = validateResolvedRowForTarget(resolved, targetType);
    return validation.allowed
      ? resolved
      : { ...resolved, status: "not_allowed", message: validation.reason };
  }

  const itemId = String(
    event.raw?.itemId || event.raw?.entityId || classification.canonicalId
  ).trim();
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
  const runRef = useRef(null);
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
      polling: false,
    };
    runRef.current = run;
    excludedEventIdsRef.current = new Set();
    seenRowKeysRef.current = new Set();
    confirmingRef.current = false;
    setRows([]);
    setMessage("");
    setSessionMeta(null);
    setPhase("starting");

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
      if (run.stopped) return;
      clearTimeout(run.timer);
      run.timer = setTimeout(() => poll(run), delay);
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
        seenRowKeysRef.current.add(event.rowKey);
        const staged = { ...event, status: event.status === "received" ? "resolving" : event.status };
        setRows((current) => [...current, staged]);
        resolveScanEvent(event, canonicalUnitType)
          .then((resolved) => {
            if (
              run.stopped ||
              excludedEventIdsRef.current.has(event.eventId || event.rowKey)
            ) {
              return;
            }
            setRows((current) =>
              current.map((row) => (row.rowKey === event.rowKey ? resolved : row))
            );
          })
          .catch((error) => {
            console.error("Scan In preview resolution failed", error);
            if (
              run.stopped ||
              excludedEventIdsRef.current.has(event.eventId || event.rowKey)
            ) {
              return;
            }
            setRows((current) =>
              current.map((row) =>
                row.rowKey === event.rowKey
                  ? {
                      ...row,
                      status: "error",
                      message: error?.message || "This scan could not be resolved.",
                    }
                  : row
              )
            );
          });
      });
    };

    const poll = async () => {
      if (run.stopped || run.polling || !run.sessionId) return;
      run.polling = true;
      try {
        const snapshot = normalizeSessionSnapshot(await client.read(run.sessionId));
        if (run.stopped) return;
        setSessionMeta(snapshot);
        ingestEvents(snapshot.events);
        if (snapshot.status === "expired") {
          run.stopped = true;
          setPhase("expired");
          setMessage("This scanner session expired. Start a new session to keep scanning.");
          return;
        }
        if (["cancelled", "canceled", "closed"].includes(snapshot.status)) {
          run.stopped = true;
          setPhase("expired");
          setMessage("This scanner session is no longer active.");
          return;
        }
        if (snapshot.status === "error") {
          run.stopped = true;
          setPhase("session_error");
          setMessage("The scanner session reported an error. You can start a new one.");
          return;
        }
        setPhase("active");
        setMessage("");
        schedulePoll(snapshot.pollAfterMs);
      } catch (error) {
        if (run.stopped) return;
        if (TERMINAL_EXPIRED_HTTP_STATUSES.has(error?.status)) {
          run.stopped = true;
          setPhase("expired");
          setMessage("This scanner session expired or could not be found.");
        } else {
          setPhase("poll_error");
          setMessage(error?.message || "Scans could not be refreshed.");
        }
      } finally {
        run.polling = false;
      }
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
      pollNowRef.current = null;
      cancelRun();
    };
  }, [canonicalUnitId, canonicalUnitType, client, sessionEpoch, show]);

  const removeRow = (rowKey) => {
    const removedRow = rows.find((row) => row.rowKey === rowKey);
    excludedEventIdsRef.current.add(removedRow?.eventId || rowKey);
    setRows((current) => current.filter((row) => row.rowKey !== rowKey));
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
    phase === "active" &&
    effectiveRows.length > 0 &&
    eventIds.length === effectiveRows.length &&
    !hasProblemRows &&
    !confirmingRef.current;

  const confirmPlacement = async () => {
    if (!canConfirm || confirmingRef.current) return;
    const run = runRef.current;
    if (!run?.sessionId) return;
    confirmingRef.current = true;
    run.stopped = true;
    clearTimeout(run.timer);
    setPhase("confirming");
    setMessage("");
    try {
      const result = await client.confirm(run.sessionId, eventIds);
      run.confirmed = true;
      run.cancelSent = true;
      setPhase("confirmed");
      await onConfirmed(result);
      onHide();
    } catch (error) {
      confirmingRef.current = false;
      if (TERMINAL_EXPIRED_HTTP_STATUSES.has(error?.status)) {
        setPhase("expired");
        setMessage("This session expired before placement could be confirmed.");
        return;
      }
      run.stopped = false;
      setPhase("active");
      setMessage(error?.message || "Placement was not saved. Review and try again.");
      pollNowRef.current?.();
    }
  };

  const restartable = ["expired", "session_error", "start_error"].includes(phase);
  const busy = ["cancelling", "confirming", "starting"].includes(phase);
  const sessionStatusText =
    phase === "starting"
      ? "Starting scanner session..."
      : phase === "active"
        ? "Scanner session active"
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
          {hasProblemRows
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
