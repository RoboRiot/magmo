"use strict";
const { randomUUID } = require("node:crypto");
const { FieldValue } = require("firebase-admin/firestore");
const { planWorkOrderLinkHealthInTransaction, applyWorkOrderLinkHealthWrites } = require("./workOrderLinkHealth.cjs");
const STATE_PATH = "OpsWorkOrderLinkConfiguration/sweep";

async function recheckWorkOrderLink({ db, workOrderId, nowIso = new Date().toISOString(), source = "coverage_sweep" }) {
  return db.runTransaction(async tx => {
    const ref = db.collection("OpsWorkOrders").doc(workOrderId);
    const snapshot = await tx.get(ref);
    if (!snapshot.exists) return { skipped: true, workOrderId };
    const plan = await planWorkOrderLinkHealthInTransaction({ transaction: tx, db, workOrderId,
      workOrder: snapshot.data(), nowIso, source, resolveMissing: true });
    const associationChanged = ["clientId", "machineId", "trailerId"].some(key => key in plan.workOrderPatch);
    const healthChanged = snapshot.data()?.linkHealth?.fingerprint !== plan.health.fingerprint;
    if (Object.keys(plan.workOrderPatch).length) tx.set(ref, { ...plan.workOrderPatch,
      ...(associationChanged || healthChanged ? { updatedAt: FieldValue.serverTimestamp() } : {}) }, { merge: true });
    applyWorkOrderLinkHealthWrites(tx, plan);
    return { workOrderId, health: plan.health, alertEventId: plan.alertEventId,
      associationChanged };
  });
}

// Persistent, leased round-robin coverage is independent of the scanner/listener
// cache. Failed source reads still receive a local integrity check; failures are
// recorded and retried next round, never mistaken for an empty BF selection.
async function sweepWorkOrderLinks({ db, refreshSource, now = Date.now, limit = 50,
  sourceLimit = 20, maxDurationMs = 140000, wait = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
  const stateRef = db.doc(STATE_PATH), claim = randomUUID(), started = now();
  const acquired = await db.runTransaction(async tx => {
    const state = (await tx.get(stateRef)).data() || {};
    if (Number(state.leaseUntilMs || 0) > started) return null;
    tx.set(stateRef, { claim, leaseUntilMs: started + maxDurationMs + 120000, startedAtIso: new Date(started).toISOString() }, { merge: true });
    return state;
  });
  if (!acquired) return { skipped: true, reason: "sweep_in_progress" };
  const maximum = Math.max(1, Math.min(100, Number(limit) || 50));
  const sourceMaximum = Math.max(0, Math.min(30, Number(sourceLimit) || 0));
  const result = { checked: 0, refreshed: 0, linked: 0, issues: 0, failures: 0, sourceFailures: 0, alertEventIds: [], completedRound: false };
  let cursor = acquired.cursor || "", sourceCursor = acquired.sourceCursor || "";
  const failures = [];
  try {
    // Always inspect persisted associations before the slower external refresh.
    // A stalled/outage-prone BlueFolder source must not consume every run's
    // budget before the live Magmo integrity backstop gets a chance to advance.
    let query = db.collection("OpsWorkOrders").orderBy("__name__").limit(maximum);
    if (cursor) query = query.startAfter(cursor);
    const docs = (await query.get()).docs;
    let processed = 0;
    for (const doc of docs) {
      if (now() - started >= maxDurationMs) break;
      try {
        const checked = await recheckWorkOrderLink({ db, workOrderId: doc.id, nowIso: new Date(now()).toISOString() });
        result.checked++; result.linked += Number(checked.associationChanged || false);
        result.issues += Number(!checked.skipped && !["resolved", "manual", "not_selected", "deleted"].includes(checked.health?.status));
        if (checked.alertEventId) result.alertEventIds.push(checked.alertEventId);
      } catch (error) { result.failures++; failures.push({ workOrderId: doc.id, kind: "health", code: String(error.code || "health_check_failed").slice(0, 100) }); }
      cursor = doc.id; processed++;
    }
    result.completedRound = processed === docs.length && docs.length < maximum;
    if (result.completedRound) cursor = "";
    // Source refresh has a separate cursor so smaller source batches and failed
    // reads do not repeatedly consume the same beginning of each health batch.
    if (refreshSource && sourceMaximum && now() - started < maxDurationMs) {
      let sourceQuery = db.collection("OpsWorkOrders").orderBy("__name__").limit(sourceMaximum);
      if (sourceCursor) sourceQuery = sourceQuery.startAfter(sourceCursor);
      const sourceDocs = (await sourceQuery.get()).docs;
      let sourceProcessed = 0;
      for (const doc of sourceDocs) {
        if (now() - started >= maxDurationMs) break;
        const value = doc.data();
        if (!value.deleted && !value.deletedAt && !value.isDeleted && /^\d{3,12}$/.test(value.bluefolderServiceRequestId || doc.id)) {
          try { await refreshSource(doc.id, value); result.refreshed++; }
          catch (error) { result.sourceFailures++; failures.push({ workOrderId: doc.id, kind: "source", code: String(error.code || "source_read_failed").slice(0, 100) }); }
          const remaining = maxDurationMs - (now() - started);
          if (remaining > 0) await wait(Math.min(1600, remaining));
        }
        sourceCursor = doc.id; sourceProcessed++;
      }
      if (sourceProcessed === sourceDocs.length && sourceDocs.length < sourceMaximum) sourceCursor = "";
    }
    return result;
  } finally {
    await db.runTransaction(async tx => {
      const current = (await tx.get(stateRef)).data();
      if (current?.claim !== claim) return;
      tx.set(stateRef, { leaseUntilMs: 0, cursor, sourceCursor, finishedAtIso: new Date(now()).toISOString(),
        ...(result.completedRound ? { lastCompletedRoundAtIso: new Date(now()).toISOString() } : {}),
        lastResult: result, lastFailures: failures.slice(0, 100) }, { merge: true });
    });
  }
}
module.exports = { STATE_PATH, recheckWorkOrderLink, sweepWorkOrderLinks };
