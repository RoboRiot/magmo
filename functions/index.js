const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const next = require("next");
const { getApps, initializeApp } = require("firebase-admin/app");

// Admin via ADC (Application Default Credentials)
if (!getApps().length) {
  const projectId =
    process.env.GCLOUD_PROJECT ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    "magmo-ac10c";
  const databaseURL = String(
    process.env.FIREBASE_DATABASE_URL ||
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      `https://${projectId}-default-rtdb.firebaseio.com`
  ).replace(/\/+$/, "");
  initializeApp({
    projectId,
    databaseURL,
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
  });
}

const app = next({ dev: false, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();
const prepared = app.prepare(); // start preparing once at cold start

const runtimeOptions = {
  // Firestore is in Los Angeles (us-west2); keeping SSR/API compute beside it
  // avoids cross-region latency and transfer for Admin SDK traffic.
  region: "us-west2",
  memory: "2GiB",
  timeoutSeconds: 540,
  minInstances: 0,
  maxInstances: 10,
  concurrency: 40,
};

async function handleNextRequest(req, res) {
  try {
    await prepared; // ensure Next.js is ready
    return handle(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
}

// These functions are deployed independently so a test release cannot replace
// the production server that serves magmo.cloud.
exports.nextServerWest = onRequest(runtimeOptions, handleNextRequest);
exports.nextServerTestWest = onRequest(runtimeOptions, handleNextRequest);

exports.trailerSlackMonitorSchedule = onSchedule(
  {
    region: "us-central1",
    schedule: "0 7,17 * * *",
    timeZone: "America/Los_Angeles",
    memory: "512MiB",
    timeoutSeconds: 540,
    retryCount: 2,
  },
  async () => {
    const secret = String(
      process.env.TRAILER_MONITOR_SECRET ||
        process.env.OPS_INGEST_SECRET ||
        process.env.CRON_SECRET ||
        ""
    ).trim();
    if (!secret) {
      throw new Error("Trailer monitor scheduler is missing its shared secret.");
    }
    const endpoint = String(
      process.env.TRAILER_MONITOR_URL ||
        "https://magmo-ac10c.web.app/api/cron/trailer-slack-monitor"
    ).trim();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ops-ingest-secret": secret,
      },
      body: JSON.stringify({ trigger: "firebase-schedule" }),
      signal: AbortSignal.timeout(520000),
    });
    const body = await response.text();
    if (!response.ok) {
      throw new Error(
        `Trailer monitor endpoint returned HTTP ${response.status}: ${body.slice(0, 1200)}`
      );
    }
    console.log("[TrailerSlackMonitorSchedule]", body.slice(0, 4000));
  }
);
