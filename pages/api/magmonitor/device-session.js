import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  adminRealtimeDb,
  configuredDatabaseUrl,
} from "../../../context/FirebaseAdmin";
import {
  hasValidIngestKey,
  makeSystemId,
} from "../../../lib/magmonitor/server";
import {
  cleanSystemName,
  MANUFACTURERS,
  normalizeManufacturer,
} from "../../../lib/magmonitor/shared";

const {
  commandPath,
  deviceSessionIdentity,
  deviceSessionTtlSeconds,
} = require("../../../lib/magmonitor/eventControlContract.cjs");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16kb",
    },
  },
};

function cleanText(value, limit) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function firebaseWebApiKey() {
  return String(
    process.env.FIREBASE_WEB_API_KEY ||
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      ""
  ).trim();
}

async function exchangeCustomToken(customToken) {
  const apiKey = firebaseWebApiKey();
  if (!apiKey) throw new Error("Firebase token exchange is not configured.");
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${encodeURIComponent(
      apiKey
    )}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: customToken, returnSecureToken: true }),
      signal: AbortSignal.timeout(15_000),
    }
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.idToken) {
    throw new Error("Firebase rejected the Magmonitor device session.");
  }
  return {
    idToken: payload.idToken,
    expiresInSeconds: Math.max(60, Number(payload.expiresIn) || 3600),
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!process.env.MAGMONITOR_INGEST_KEY) {
    return res.status(503).json({ error: "Magmonitor device sessions are not configured." });
  }
  if (!hasValidIngestKey(req)) {
    return res.status(401).json({ error: "Invalid control-agent credentials." });
  }
  if (!getApps().length || !adminRealtimeDb || !configuredDatabaseUrl) {
    return res.status(503).json({ error: "Magmonitor realtime control is unavailable." });
  }

  const manufacturer = normalizeManufacturer(req.body?.manufacturer);
  const systemName = cleanSystemName(req.body?.systemName);
  const agentVersion = cleanText(req.body?.agentVersion, 40);
  const serviceStatus = cleanText(req.body?.serviceStatus, 20).toLowerCase();
  const lastCommandId = cleanText(req.body?.lastCommandId, 80);
  if (manufacturer !== MANUFACTURERS.SIEMENS || !systemName) {
    return res.status(400).json({ error: "A Siemens system name is required." });
  }
  if (serviceStatus && serviceStatus !== "running" && serviceStatus !== "stopped") {
    return res.status(400).json({ error: "A valid local service status is required." });
  }
  // Normalize the optional fields even though session bootstrap deliberately
  // avoids a Firestore heartbeat write.
  void agentVersion;

  const systemId = makeSystemId(manufacturer, systemName);
  const issuedAtMs = Date.now();
  const sessionTtlSeconds = deviceSessionTtlSeconds(
    process.env.MAGMONITOR_DEVICE_SESSION_TTL_SECONDS
  );
  const sessionExpiresAtSeconds = Math.floor(issuedAtMs / 1000) + sessionTtlSeconds;
  const identity = deviceSessionIdentity(systemId, sessionExpiresAtSeconds);

  try {
    // lastCommandId is accepted for forward-compatible clients, but only the
    // authenticated PATCH acknowledgement may clear a command.
    void lastCommandId;
    const customToken = await getAuth().createCustomToken(identity.uid, identity.claims);
    const session = await exchangeCustomToken(customToken);
    const expiresAt = new Date(
      issuedAtMs + Math.min(sessionTtlSeconds, session.expiresInSeconds) * 1000
    ).toISOString();
    const streamUrl = `${configuredDatabaseUrl}/${commandPath(systemId)}.json?auth=${encodeURIComponent(
      session.idToken
    )}`;
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Referrer-Policy", "no-referrer");
    return res.status(200).json({ ok: true, systemId, streamUrl, expiresAt });
  } catch (error) {
    console.error("[Magmonitor][device session]", error?.message);
    return res.status(503).json({ error: "A Magmonitor device session could not be created." });
  }
}
