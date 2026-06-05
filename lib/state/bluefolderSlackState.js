import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";

const STATE_COLLECTION = "BlueFolderSlackState";
const WORK_ORDER_COLLECTION = "BlueFolderSlackWorkOrders";
const THREAD_INDEX_COLLECTION = "BlueFolderSlackThreadIndex";
const SLACK_EVENT_COLLECTION = "BlueFolderSlackEvents";
const STATE_DOC_ID = "main";

function requireDb() {
  if (!adminDb) {
    throw new Error("Firebase Admin Firestore is not initialized.");
  }
  return adminDb;
}

function stateRef() {
  return requireDb().collection(STATE_COLLECTION).doc(STATE_DOC_ID);
}

function workOrderRef(workOrderId) {
  return requireDb().collection(WORK_ORDER_COLLECTION).doc(String(workOrderId));
}

function threadIndexId(channel, ts) {
  return `${String(channel || "").trim()}_${String(ts || "").trim()}`.replace(
    /[^A-Za-z0-9_.-]/g,
    "_"
  );
}

export async function getBlueFolderSlackState() {
  const snap = await stateRef().get();
  return snap.exists ? snap.data() || {} : {};
}

export async function getLastSeenCreatedAt() {
  const state = await getBlueFolderSlackState();
  return state.last_seen_created_at || null;
}

export async function setLastSeenCreatedAt(createdAt) {
  if (!createdAt) return;
  await stateRef().set(
    {
      last_seen_created_at: createdAt,
      updated_at: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

export async function isWorkOrderProcessed(workOrderId) {
  if (!workOrderId) return false;
  const snap = await workOrderRef(workOrderId).get();
  if (!snap.exists) return false;
  const status = String(snap.data()?.status || "").toLowerCase();
  return status !== "failed";
}

export async function claimWorkOrder(workOrderId, fields = {}) {
  const db = requireDb();
  return db.runTransaction(async (transaction) => {
    const ref = workOrderRef(workOrderId);
    const snap = await transaction.get(ref);
    if (snap.exists) {
      const status = String(snap.data()?.status || "").toLowerCase();
      if (status !== "failed") return false;
    }
    transaction.set(
      ref,
      {
        ...fields,
        work_order_id: String(workOrderId),
        status: "processing",
        claimed_at: new Date().toISOString(),
        claimedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  });
}

export async function markWorkOrderProcessed(workOrderId, payload) {
  const db = requireDb();
  const processedAt = new Date().toISOString();
  const ref = workOrderRef(workOrderId);
  const batch = db.batch();
  batch.set(
    ref,
    {
      ...payload,
      work_order_id: String(workOrderId),
      status: payload?.status || "processed",
      processed_at: payload?.processed_at || processedAt,
      processedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  if (payload?.slack_channel && payload?.slack_ts) {
    batch.set(
      db.collection(THREAD_INDEX_COLLECTION).doc(threadIndexId(payload.slack_channel, payload.slack_ts)),
      {
        work_order_id: String(workOrderId),
        slack_channel: payload.slack_channel,
        slack_ts: payload.slack_ts,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
  await batch.commit();
}

export async function markWorkOrderFailed(workOrderId, error) {
  await workOrderRef(workOrderId).set(
    {
      work_order_id: String(workOrderId),
      status: "failed",
      failed_at: new Date().toISOString(),
      error: String(error?.message || error).slice(0, 1000),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

export async function ensureBaselineCaptured(workOrders) {
  const db = requireDb();
  const state = await getBlueFolderSlackState();
  if (state.baseline_captured_at) {
    return { captured: false, baselineCount: 0 };
  }

  const nowIso = new Date().toISOString();
  let baselineCount = 0;
  let newestCreatedAt = null;
  const batches = [];
  let batch = db.batch();
  let ops = 0;

  const flushIfNeeded = () => {
    if (ops < 450) return;
    batches.push(batch.commit());
    batch = db.batch();
    ops = 0;
  };

  for (const fields of workOrders) {
    if (!fields?.id) continue;
    baselineCount += 1;
    batch.set(
      workOrderRef(fields.id),
      {
        work_order_id: String(fields.id),
        number: fields.number || fields.id,
        subject: fields.subject || "",
        created_at: fields.created_at || "",
        bluefolder_url: fields.link || "",
        baseline: true,
        status: "baseline",
        captured_at: nowIso,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    ops += 1;
    if (fields.created_at) {
      const current = new Date(fields.created_at);
      const newest = newestCreatedAt ? new Date(newestCreatedAt) : null;
      if (!Number.isNaN(current.getTime()) && (!newest || current > newest)) {
        newestCreatedAt = fields.created_at;
      }
    }
    flushIfNeeded();
  }

  batch.set(
    stateRef(),
    {
      baseline_captured_at: nowIso,
      last_seen_created_at: newestCreatedAt || null,
      updated_at: nowIso,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  batches.push(batch.commit());
  await Promise.all(batches);
  return { captured: true, baselineCount, newestCreatedAt };
}

export async function findWorkOrderBySlackThread(channel, ts) {
  if (!channel || !ts) return null;
  const db = requireDb();
  const indexSnap = await db
    .collection(THREAD_INDEX_COLLECTION)
    .doc(threadIndexId(channel, ts))
    .get();
  if (!indexSnap.exists) return null;

  const workOrderId = indexSnap.data()?.work_order_id;
  if (!workOrderId) return null;
  const workOrderSnap = await workOrderRef(workOrderId).get();
  return workOrderSnap.exists ? workOrderSnap.data() || null : null;
}

export async function recordSlackEventOnce(eventId) {
  if (!eventId || !adminDb) return true;
  const ref = adminDb.collection(SLACK_EVENT_COLLECTION).doc(String(eventId));
  return adminDb.runTransaction(async (transaction) => {
    const snap = await transaction.get(ref);
    if (snap.exists) return false;
    transaction.set(ref, {
      event_id: String(eventId),
      received_at: new Date().toISOString(),
      receivedAt: FieldValue.serverTimestamp(),
    });
    return true;
  });
}
