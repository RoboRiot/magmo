import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
const {
  OpsHttpError,
  classifyOpsError,
  commandEventId,
} = require("./ingestContract.cjs");

const COLLECTION = "OpsCommandEvents";
const PROCESSING_LEASE_MS = 5 * 60 * 1000;

function requireDb() {
  if (!adminDb) {
    throw new OpsHttpError(
      503,
      "firestore_unavailable",
      "Firebase Admin Firestore is not initialized.",
      { retryable: true }
    );
  }
  return adminDb;
}
function cleanText(value, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

function normalizedPerson(actor = {}) {
  return {
    id: cleanText(actor.id, 180),
    name: cleanText(actor.name, 180),
  };
}

export async function runIdempotentOpsCommand({
  eventType,
  identity,
  actor,
  evidence = "",
  operation,
}) {
  const db = requireDb();
  const auditId = commandEventId(eventType, identity);
  const eventRef = db.collection(COLLECTION).doc(auditId);
  const nowIso = new Date().toISOString();

  const reservation = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(eventRef);
    const current = snapshot.exists ? snapshot.data() || {} : {};
    if (current.status === "completed" && current.result) {
      return { replay: true, result: current.result };
    }
    if (current.status === "processing") {
      const startedAtMs = Date.parse(cleanText(current.startedAtIso, 40));
      if (Number.isFinite(startedAtMs) && Date.now() - startedAtMs < PROCESSING_LEASE_MS) {
        throw new OpsHttpError(
          409,
          "command_in_progress",
          "This Slack command is already being processed.",
          { retryable: true, action: "Wait briefly and retry the same command." }
        );
      }
    }
    transaction.set(
      eventRef,
      {
        eventType,
        identity,
        sourceCommand: cleanText(identity.command, 1000),
        person: normalizedPerson(actor),
        evidence: cleanText(evidence, 2000),
        status: "processing",
        attempts: FieldValue.increment(1),
        startedAtIso: nowIso,
        startedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { replay: false };
  });

  if (reservation.replay) {
    return { ...reservation.result, idempotentReplay: true, auditId };
  }

  try {
    const result = await operation();
    const savedResult = { ...result, idempotentReplay: false, auditId };
    await eventRef.set(
      {
        status: "completed",
        result: savedResult,
        appliedChanges: result?.changes || [],
        completedAtIso: new Date().toISOString(),
        completedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return savedResult;
  } catch (error) {
    const classified = classifyOpsError(error);
    await eventRef
      .set(
        {
          status: classified.status >= 500 ? "failed" : "rejected",
          error: {
            code: classified.code,
            message: classified.message,
            retryable: classified.retryable,
            action: classified.action,
          },
          failedAtIso: new Date().toISOString(),
          failedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .catch(() => {});
    throw error;
  }
}
