const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

const contract = require("../lib/magmonitor/eventControlContract.cjs");

function loadProjectModule(relativePath, mocks = {}) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transformed = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => {
    if (Object.prototype.hasOwnProperty.call(mocks, request)) return mocks[request];
    return require(
      request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request
    );
  };
  new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transformed
  )(localRequire, module, module.exports, filename, path.dirname(filename));
  return module.exports;
}

function responseRecorder() {
  const result = { status: null, body: null, headers: {} };
  return {
    result,
    response: {
      headersSent: false,
      setHeader(name, value) {
        result.headers[String(name).toLowerCase()] = String(value);
      },
      status(value) {
        result.status = value;
        return this;
      },
      json(value) {
        result.body = value;
        return this;
      },
    },
  };
}

function createRealtimeDatabase() {
  const values = new Map();
  const queues = new Map();
  return {
    values,
    ref(referencePath) {
      return {
        async set(value) {
          values.set(referencePath, structuredClone(value));
        },
        async transaction(update) {
          const previous = queues.get(referencePath) || Promise.resolve();
          const current = previous.then(() => {
            const before = values.has(referencePath)
              ? structuredClone(values.get(referencePath))
              : null;
            const after = update(before);
            if (after === undefined) return { committed: false };
            if (after === null) values.delete(referencePath);
            else values.set(referencePath, structuredClone(after));
            return { committed: true };
          });
          queues.set(referencePath, current.catch(() => {}));
          return current;
        },
      };
    },
  };
}

function fakeTimestamp(date = new Date()) {
  return {
    toDate: () => new Date(date),
  };
}

test("published commands use the scoped protocol-2 RTDB envelope", async () => {
  const database = createRealtimeDatabase();
  const requestedAt = new Date("2026-08-25T12:00:00.000Z");
  const expiresAt = new Date("2026-08-25T12:05:00.000Z");
  const command = await contract.publishCommand(database, "siemens--alpha-12345", {
    commandId: "command-1",
    action: "stop",
    requestedAt,
    expiresAt,
  });
  assert.deepEqual(command, {
    commandId: "command-1",
    action: "stop",
    issuedAtMs: requestedAt.getTime(),
    expiresAtMs: expiresAt.getTime(),
    protocolVersion: 2,
  });
  assert.deepEqual(
    database.values.get("magmonitor/commands/siemens--alpha-12345"),
    command
  );
});

test("ack clearing is compare-and-delete and cannot remove a newer command", async () => {
  const database = createRealtimeDatabase();
  const referencePath = "magmonitor/commands/siemens--alpha-12345";
  database.values.set(referencePath, { commandId: "new-command" });
  assert.equal(
    await contract.clearCommand(database, "siemens--alpha-12345", "old-command"),
    false
  );
  assert.equal(database.values.get(referencePath).commandId, "new-command");
  assert.equal(
    await contract.clearCommand(database, "siemens--alpha-12345", "new-command"),
    true
  );
  assert.equal(database.values.has(referencePath), false);
});

test("ingest throttle accepts the 29-minute tolerance boundary exactly", () => {
  assert.equal(contract.ingestMinIntervalMs(1), 30 * 60 * 1000);
  assert.equal(contract.DEFAULT_INGEST_EARLY_ARRIVAL_TOLERANCE_MS, 60 * 1000);
  const acceptedAtMs = Date.parse("2026-08-25T12:00:00.000Z");
  const justBeforeTolerance = contract.throttleDecision(
    { acceptedAtMs },
    acceptedAtMs + 29 * 60 * 1000 - 1,
    30 * 60 * 1000
  );
  const atToleranceBoundary = contract.throttleDecision(
    { acceptedAtMs },
    acceptedAtMs + 29 * 60 * 1000,
    30 * 60 * 1000
  );
  const atNominalBoundary = contract.throttleDecision(
    { acceptedAtMs },
    acceptedAtMs + 30 * 60 * 1000,
    30 * 60 * 1000
  );

  assert.deepEqual(justBeforeTolerance, {
    accepted: false,
    retryAfterMs: 1,
    nextAllowedAtMs: acceptedAtMs + 29 * 60 * 1000,
  });
  assert.deepEqual(atToleranceBoundary, {
    accepted: true,
    retryAfterMs: 0,
    nextAllowedAtMs: acceptedAtMs + 58 * 60 * 1000,
  });
  assert.equal(atNominalBoundary.accepted, true);
});

test("ingest throttle rejects arrivals well before the tolerance window", () => {
  const acceptedAtMs = Date.parse("2026-08-25T12:00:00.000Z");
  assert.deepEqual(
    contract.throttleDecision(
      { acceptedAtMs },
      acceptedAtMs + 15 * 60 * 1000,
      30 * 60 * 1000
    ),
    {
      accepted: false,
      retryAfterMs: 14 * 60 * 1000,
      nextAllowedAtMs: acceptedAtMs + 29 * 60 * 1000,
    }
  );
});

test("ingest transaction and cache timestamps use the same tolerance boundary", async () => {
  const database = createRealtimeDatabase();
  const nowMs = Date.parse("2026-08-25T12:00:00.000Z");
  const first = await contract.claimIngestWindow(database, {
    systemId: "siemens--alpha-12345",
    requestId: "request-1",
    nowMs,
    intervalMs: 60 * 1000,
  });
  assert.equal(first.accepted, true);
  assert.equal(first.nextAllowedAtMs, nowMs + 29 * 60 * 1000);
  assert.equal(
    database.values.get("magmonitor/ingestThrottle/siemens--alpha-12345").nextAllowedAtMs,
    first.nextAllowedAtMs
  );

  const tooEarly = await contract.claimIngestWindow(database, {
    systemId: "siemens--alpha-12345",
    requestId: "request-2",
    nowMs: nowMs + 15 * 60 * 1000,
    intervalMs: 60 * 1000,
  });
  assert.equal(tooEarly.accepted, false);
  assert.equal(tooEarly.retryAfterMs, 14 * 60 * 1000);
  assert.equal(tooEarly.nextAllowedAtMs, first.nextAllowedAtMs);

  const tolerated = await contract.claimIngestWindow(database, {
    systemId: "siemens--alpha-12345",
    requestId: "request-3",
    nowMs: nowMs + 29 * 60 * 1000,
    intervalMs: 60 * 1000,
  });
  assert.equal(tolerated.accepted, true);
  assert.equal(tolerated.nextAllowedAtMs, nowMs + 58 * 60 * 1000);
  assert.equal(
    database.values.get("magmonitor/ingestThrottle/siemens--alpha-12345").nextAllowedAtMs,
    tolerated.nextAllowedAtMs
  );
});

test("ingest throttle remains scoped independently per system", async () => {
  const database = createRealtimeDatabase();
  const nowMs = Date.parse("2026-08-25T12:00:00.000Z");
  await contract.claimIngestWindow(database, {
    systemId: "siemens--alpha-12345",
    requestId: "request-1",
    nowMs,
  });
  const alphaTooEarly = await contract.claimIngestWindow(database, {
    systemId: "siemens--alpha-12345",
    requestId: "request-2",
    nowMs: nowMs + 60 * 1000,
  });
  const otherSystem = await contract.claimIngestWindow(database, {
    systemId: "siemens--beta-67890",
    requestId: "request-3",
    nowMs: nowMs + 60 * 1000,
  });

  assert.equal(alphaTooEarly.accepted, false);
  assert.equal(otherSystem.accepted, true);
});

test("failed ingest reservations can only release their own throttle slot", async () => {
  const database = createRealtimeDatabase();
  const systemId = "siemens--alpha-12345";
  await contract.claimIngestWindow(database, {
    systemId,
    requestId: "request-1",
    nowMs: Date.now(),
  });
  assert.equal(
    await contract.releaseIngestWindow(database, { systemId, requestId: "wrong" }),
    false
  );
  assert.equal(
    await contract.releaseIngestWindow(database, { systemId, requestId: "request-1" }),
    true
  );
});

test("device claims and RTDB rules scope a session to exactly one command node", () => {
  const expiresAtSeconds = Math.floor(Date.now() / 1000) + 3600;
  const identity = contract.deviceSessionIdentity(
    "siemens--alpha-12345",
    expiresAtSeconds
  );
  assert.match(identity.uid, /^magmonitor-device-[a-f0-9]{32}$/);
  assert.deepEqual(identity.claims, {
    magmonitorDevice: true,
    magmonitorSystemId: "siemens--alpha-12345",
    magmonitorSessionExpiresAt: expiresAtSeconds,
  });
  const rules = fs.readFileSync(path.join(__dirname, "..", "database.rules.json"), "utf8");
  assert.match(rules, /auth\.token\.magmonitorSystemId == \$systemId/);
  assert.match(rules, /magmonitorSessionExpiresAt \* 1000 > now/);
  assert.match(rules, /"\.write": false/);
});

test("dashboard freshness tolerates 30-minute telemetry and refreshes slowly", () => {
  const shared = loadProjectModule("lib/magmonitor/shared.js");
  const now = Date.parse("2026-08-25T12:00:00.000Z");
  assert.equal(
    shared.isSystemStale(new Date(now - 74 * 60 * 1000).toISOString(), now),
    false
  );
  assert.equal(
    shared.isSystemStale(new Date(now - 76 * 60 * 1000).toISOString(), now),
    true
  );
  const dashboardSource = fs.readFileSync(
    path.join(__dirname, "..", "pages", "Magmonitor", "index.js"),
    "utf8"
  );
  assert.match(dashboardSource, /FLEET_REFRESH_MS = 15 \* 60 \* 1000/);
  assert.match(dashboardSource, /SYSTEM_REFRESH_MS = 5 \* 60 \* 1000/);
  assert.doesNotMatch(dashboardSource, /controlAgentAge\s*<\s*45\s*\*\s*1000/);
});

test("legacy GET returns 426 without touching Firestore or RTDB", async () => {
  let databaseCalls = 0;
  const throwingDatabase = new Proxy(
    {},
    {
      get() {
        databaseCalls += 1;
        throw new Error("legacy GET must not access a database");
      },
    }
  );
  const route = loadProjectModule("pages/api/magmonitor/control.js", {
    crypto: require("node:crypto"),
    "firebase-admin/firestore": { Timestamp: { now: fakeTimestamp, fromDate: fakeTimestamp } },
    "../../../context/FirebaseAdmin": {
      adminDb: throwingDatabase,
      adminRealtimeDb: throwingDatabase,
    },
    "../../../lib/magmonitor/server": {
      hasValidIngestKey: () => true,
      MAGMONITOR_SYSTEMS_COLLECTION: "MagmonitorSystems",
      makeSystemId: () => "siemens--alpha-12345",
    },
    "../../../lib/magmonitor/shared": {
      cleanSystemName: (value) => String(value || ""),
      MANUFACTURERS: { SIEMENS: "Siemens" },
      normalizeManufacturer: () => "Siemens",
    },
    "../../../utils/apiAuth": { requireFirebaseAuth: async () => null },
    "../../../utils/authAccess": { getEffectiveRole: () => "admin", isAdminRole: () => true },
  });
  const { result, response } = responseRecorder();
  await route.default({ method: "GET", headers: {} }, response);
  assert.equal(result.status, 426);
  assert.equal(result.body.eventDriven, true);
  assert.equal(result.body.deviceSessionEndpoint, "/api/magmonitor/device-session");
  assert.equal(databaseCalls, 0);
});

test("read-only staging rejects command POST before Firestore or RTDB mutation", async () => {
  const previousEnvironment = process.env.OPS_ENVIRONMENT;
  process.env.OPS_ENVIRONMENT = "staging";
  let databaseCalls = 0;
  const throwingDatabase = new Proxy(
    {},
    {
      get() {
        databaseCalls += 1;
        throw new Error("staging command must not access a database");
      },
    }
  );
  try {
    const route = loadProjectModule("pages/api/magmonitor/control.js", {
      crypto: require("node:crypto"),
      "firebase-admin/firestore": { Timestamp: { now: fakeTimestamp, fromDate: fakeTimestamp } },
      "../../../context/FirebaseAdmin": {
        adminDb: throwingDatabase,
        adminRealtimeDb: throwingDatabase,
      },
      "../../../lib/magmonitor/server": {
        hasValidIngestKey: () => true,
        MAGMONITOR_SYSTEMS_COLLECTION: "MagmonitorSystems",
        makeSystemId: () => "siemens--alpha-12345",
      },
      "../../../lib/magmonitor/shared": {
        cleanSystemName: (value) => String(value || ""),
        MANUFACTURERS: { SIEMENS: "Siemens" },
        normalizeManufacturer: () => "Siemens",
      },
      "../../../utils/apiAuth": {
        requireFirebaseAuth: async () => ({ uid: "admin-1", email: "admin@example.com" }),
      },
      "../../../utils/authAccess": {
        getEffectiveRole: () => "admin",
        isAdminRole: () => true,
      },
    });
    const { result, response } = responseRecorder();
    await route.default(
      { method: "POST", headers: {}, body: { systemId: "siemens--alpha-12345", action: "stop" } },
      response
    );
    assert.equal(result.status, 403);
    assert.equal(databaseCalls, 0);
  } finally {
    if (previousEnvironment === undefined) delete process.env.OPS_ENVIRONMENT;
    else process.env.OPS_ENVIRONMENT = previousEnvironment;
  }
});

test("mirror-only legacy ingest is ignored before RTDB or Firestore work", async () => {
  const previousKey = process.env.MAGMONITOR_INGEST_KEY;
  process.env.MAGMONITOR_INGEST_KEY = "x".repeat(32);
  let databaseCalls = 0;
  const throwingDatabase = new Proxy(
    {},
    {
      get() {
        databaseCalls += 1;
        throw new Error("mirror-only ingest must not access a database");
      },
    }
  );
  try {
    const route = loadProjectModule("pages/api/magmonitor/ingest.js", {
      crypto: require("node:crypto"),
      "../../../context/FirebaseAdmin": {
        adminDb: throwingDatabase,
        adminRealtimeDb: throwingDatabase,
      },
      "../../../lib/magmonitor/server": {
        hasValidIngestKey: () => true,
        parseReadingPayload: () => ({
          hasMetrics: false,
          systemId: "siemens--alpha-12345",
          collectedAt: new Date("2026-08-25T12:00:00.000Z"),
        }),
        storeReading: async () => {
          databaseCalls += 1;
          throw new Error("mirror-only ingest must not be stored");
        },
      },
    });
    const { result, response } = responseRecorder();
    await route.default({ method: "POST", headers: {}, body: {} }, response);
    assert.equal(result.status, 202);
    assert.equal(result.body.ignored, true);
    assert.equal(result.body.stored, false);
    assert.equal(databaseCalls, 0);
  } finally {
    if (previousKey === undefined) delete process.env.MAGMONITOR_INGEST_KEY;
    else process.env.MAGMONITOR_INGEST_KEY = previousKey;
  }
});

test("device session returns only a scoped authenticated stream URL", async () => {
  const previous = {
    key: process.env.MAGMONITOR_INGEST_KEY,
    apiKey: process.env.FIREBASE_WEB_API_KEY,
  };
  process.env.MAGMONITOR_INGEST_KEY = "x".repeat(32);
  process.env.FIREBASE_WEB_API_KEY = "public-web-api-key";
  let tokenRequest = null;
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    json: async () => ({ idToken: "scoped-id-token", expiresIn: "3600" }),
  });
  try {
    const route = loadProjectModule("pages/api/magmonitor/device-session.js", {
      "firebase-admin/app": { getApps: () => [{}] },
      "firebase-admin/auth": {
        getAuth: () => ({
          createCustomToken: async (uid, claims) => {
            tokenRequest = { uid, claims };
            return "custom-token";
          },
        }),
      },
      "../../../context/FirebaseAdmin": {
        adminRealtimeDb: { ref: () => { throw new Error("session must not mutate RTDB"); } },
        configuredDatabaseUrl: "https://magmo-ac10c-default-rtdb.firebaseio.com",
      },
      "../../../lib/magmonitor/server": {
        hasValidIngestKey: () => true,
        makeSystemId: () => "siemens--alpha-12345",
      },
      "../../../lib/magmonitor/shared": {
        cleanSystemName: (value) => String(value || "").trim(),
        MANUFACTURERS: { SIEMENS: "Siemens" },
        normalizeManufacturer: () => "Siemens",
      },
    });
    const { result, response } = responseRecorder();
    await route.default(
      {
        method: "POST",
        headers: { "x-magmonitor-key": "x".repeat(32) },
        body: {
          manufacturer: "Siemens",
          systemName: "Alpha",
          agentVersion: "2.0",
          serviceStatus: "running",
          lastCommandId: "previous-command",
        },
      },
      response
    );
    assert.equal(result.status, 200);
    assert.deepEqual(Object.keys(result.body).sort(), ["expiresAt", "ok", "streamUrl", "systemId"]);
    assert.match(result.body.streamUrl, /magmonitor\/commands\/siemens--alpha-12345\.json\?auth=scoped-id-token$/);
    assert.equal(result.body.streamUrl.includes("x".repeat(32)), false);
    assert.equal(tokenRequest.claims.magmonitorSystemId, "siemens--alpha-12345");
  } finally {
    global.fetch = originalFetch;
    if (previous.key === undefined) delete process.env.MAGMONITOR_INGEST_KEY;
    else process.env.MAGMONITOR_INGEST_KEY = previous.key;
    if (previous.apiKey === undefined) delete process.env.FIREBASE_WEB_API_KEY;
    else process.env.FIREBASE_WEB_API_KEY = previous.apiKey;
  }
});
