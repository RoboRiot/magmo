import crypto from "crypto";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb, adminRealtimeDb } from "../../../context/FirebaseAdmin";
import {
  hasValidIngestKey,
  MAGMONITOR_SYSTEMS_COLLECTION,
  makeSystemId,
} from "../../../lib/magmonitor/server";
import {
  cleanSystemName,
  MANUFACTURERS,
  normalizeManufacturer,
} from "../../../lib/magmonitor/shared";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { getEffectiveRole, isAdminRole } from "../../../utils/authAccess";

const {
  clearCommand,
  controlWritesAllowed,
  legacyUpgradePayload,
  publishCommand,
} = require("../../../lib/magmonitor/eventControlContract.cjs");

const COMMAND_TTL_MS = 5 * 60 * 1000;

function cleanText(value, limit) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function isActiveCommand(control) {
  if (!control || control.status !== "pending") return false;
  if (!control.expiresAt) return true;
  const expiresAt = control.expiresAt?.toDate?.() || new Date(control.expiresAt);
  return Number.isFinite(expiresAt.getTime()) && expiresAt.getTime() > Date.now();
}

function controlRef(systemId) {
  return adminDb.collection(MAGMONITOR_SYSTEMS_COLLECTION).doc(systemId);
}

async function requireAdmin(req, res) {
  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return null;
  if (!user?.uid) {
    res.status(401).json({ error: "Authentication required." });
    return null;
  }
  const role = getEffectiveRole(user.email, user);
  if (!isAdminRole(role)) {
    res.status(403).json({ error: "Remote monitor control is available to Admin users only." });
    return null;
  }
  return { ...user, role };
}

async function requestCommand(req, res) {
  const user = await requireAdmin(req, res);
  if (!user || res.headersSent) return;
  if (!controlWritesAllowed(process.env)) {
    return res.status(403).json({
      error: "Remote commands are disabled in this read-only environment.",
    });
  }

  const systemId = cleanText(req.body?.systemId, 120);
  const action = cleanText(req.body?.action, 12).toLowerCase();
  if (!/^[a-z0-9-]{5,120}$/i.test(systemId)) {
    return res.status(400).json({ error: "A valid system is required." });
  }
  if (action !== "start" && action !== "stop") {
    return res.status(400).json({ error: "Action must be start or stop." });
  }

  const reference = controlRef(systemId);
  const now = new Date();
  const commandId = crypto.randomBytes(18).toString("hex");
  const control = {
    commandId,
    action,
    status: "pending",
    message: "Waiting for the local MAGMO control service.",
    requestedAt: Timestamp.fromDate(now),
    expiresAt: Timestamp.fromDate(new Date(now.getTime() + COMMAND_TTL_MS)),
    completedAt: null,
    requestedBy: {
      uid: cleanText(user.uid, 128),
      email: cleanText(user.email, 180).toLowerCase(),
    },
  };

  let queuedInFirestore = false;
  try {
    await adminDb.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(reference);
      if (!snapshot.exists) {
        const error = new Error("This system is no longer available.");
        error.statusCode = 404;
        throw error;
      }
      const data = snapshot.data() || {};
      if (normalizeManufacturer(data.manufacturer) !== MANUFACTURERS.SIEMENS) {
        const error = new Error("Remote control is currently supported for Siemens systems only.");
        error.statusCode = 400;
        throw error;
      }
      if (isActiveCommand(data.control)) {
        const error = new Error("A remote command is already waiting for this system.");
        error.statusCode = 409;
        throw error;
      }
      transaction.set(reference, { control }, { merge: true });
    });
    queuedInFirestore = true;
    await publishCommand(adminRealtimeDb, systemId, control);

    res.setHeader("Cache-Control", "private, no-store");
    return res.status(202).json({
      ok: true,
      control: {
        commandId,
        action,
        status: "pending",
        message: control.message,
        requestedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + COMMAND_TTL_MS).toISOString(),
      },
    });
  } catch (error) {
    if (queuedInFirestore) {
      try {
        await adminDb.runTransaction(async (transaction) => {
          const snapshot = await transaction.get(reference);
          if (snapshot.data()?.control?.commandId !== commandId) return;
          transaction.update(reference, {
            "control.status": "failed",
            "control.message": "The command could not be published to the device stream.",
            "control.completedAt": Timestamp.now(),
          });
        });
      } catch (compensationError) {
        console.error(
          "[Magmonitor][control publish compensation]",
          compensationError?.message
        );
      }
    }
    const status = Number(error?.statusCode) || 500;
    if (status >= 500) console.error("[Magmonitor][control request]", error?.message);
    return res.status(status).json({
      error: status >= 500 ? "The remote command could not be queued." : error.message,
    });
  }
}

async function pollCommand(req, res) {
  if (!hasValidIngestKey(req)) {
    return res.status(401).json({ error: "Invalid control-agent credentials." });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(426).json(legacyUpgradePayload());
}

async function acknowledgeCommand(req, res) {
  if (!hasValidIngestKey(req)) {
    return res.status(401).json({ error: "Invalid control-agent credentials." });
  }

  const manufacturer = normalizeManufacturer(req.body?.manufacturer);
  const systemName = cleanSystemName(req.body?.systemName);
  const commandId = cleanText(req.body?.commandId, 80);
  const status = cleanText(req.body?.status, 20).toLowerCase();
  const message = cleanText(req.body?.message, 240);
  const agentVersion = cleanText(req.body?.agentVersion, 40);
  const serviceStatus = cleanText(req.body?.serviceStatus, 20).toLowerCase();
  if (manufacturer !== MANUFACTURERS.SIEMENS || !systemName || !commandId) {
    return res.status(400).json({ error: "Command identity is incomplete." });
  }
  if (status !== "completed" && status !== "failed") {
    return res.status(400).json({ error: "Command status must be completed or failed." });
  }
  if (serviceStatus !== "running" && serviceStatus !== "stopped") {
    return res.status(400).json({ error: "A valid local service status is required." });
  }

  const reference = controlRef(makeSystemId(manufacturer, systemName));
  try {
    await adminDb.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(reference);
      const control = snapshot.data()?.control;
      if (!snapshot.exists || control?.commandId !== commandId) {
        const error = new Error("This command is no longer current.");
        error.statusCode = 409;
        throw error;
      }
      const now = Timestamp.now();
      transaction.update(reference, {
        "control.status": status,
        "control.message": message || (status === "completed" ? "Command completed." : "Command failed."),
        "control.completedAt": now,
        controlAgentLastSeenAt: now,
        controlAgentVersion: agentVersion,
        lastReceivedAt: now,
        lastMirrorAt: now,
        "mirror.serviceStatus": serviceStatus,
        "mirror.portStatus": serviceStatus === "stopped" ? "released" : "checking",
        "mirror.detail":
          serviceStatus === "stopped"
            ? "Monitor is stopped and COM1 is released for troubleshooting."
            : "Monitor was started remotely and is waiting for the next Siemens reading.",
      });
    });
    await clearCommand(
      adminRealtimeDb,
      makeSystemId(manufacturer, systemName),
      commandId
    );
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ ok: true });
  } catch (error) {
    const responseStatus = Number(error?.statusCode) || 500;
    if (responseStatus >= 500) console.error("[Magmonitor][control ack]", error?.message);
    return res.status(responseStatus).json({
      error: responseStatus >= 500 ? "The command result could not be stored." : error.message,
    });
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") return pollCommand(req, res);
  if (!adminRealtimeDb) {
    return res.status(503).json({ error: "Magmonitor control is unavailable." });
  }
  if (!adminDb) {
    return res.status(503).json({ error: "Magmonitor control is unavailable." });
  }
  if (req.method === "POST") return requestCommand(req, res);
  if (req.method === "PATCH") return acknowledgeCommand(req, res);

  res.setHeader("Allow", "GET, POST, PATCH");
  return res.status(405).json({ error: "Method not allowed." });
}
