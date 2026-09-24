const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");
const callbackRateLimit = require("../lib/inventory/scanCallbackRateLimit.cjs");

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
  const response = {
    headersSent: false,
    writableEnded: false,
    setHeader(name, value) {
      result.headers[String(name).toLowerCase()] = String(value);
    },
    status(value) {
      result.status = value;
      return this;
    },
    json(value) {
      result.body = value;
      this.headersSent = true;
      this.writableEnded = true;
      return this;
    },
  };
  return { result, response };
}

async function invoke(handler, request) {
  const { result, response } = responseRecorder();
  await handler(request, response);
  return result;
}

function apiMocks(authUser = { uid: "owner-1", email: "owner@advancedimagingparts.com" }) {
  return {
    requireStorageScanUser: async () => authUser,
    setStorageScanResponseHeaders: (response) => {
      response.setHeader("Cache-Control", "private, no-store");
    },
    sendStorageScanError: (response, error) =>
      response.status(error.statusCode || 500).json({
        ok: false,
        code: error.code || "internal_error",
        error: error.message,
      }),
    hasOnlyBodyKeys: (body, allowedKeys) => {
      if (!body || typeof body !== "object" || Array.isArray(body)) return false;
      const allowed = new Set(allowedKeys);
      return Object.keys(body).every((key) => allowed.has(key));
    },
  };
}

const fakeDb = { kind: "fake-admin-db" };
const sessionId = "work_order_capture_1234567890";
const workOrderId = "work-order-47";

test("start route passes the Admin database and authenticated creator to capture", async () => {
  const calls = [];
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/index.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        startWorkOrderScannerCapture: async (options) => {
          calls.push(options);
          return { id: options.sessionId, status: "active", events: [] };
        },
      },
    }
  ).default;

  const wrongMethod = await invoke(route, { method: "GET", body: {} });
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.headers.allow, "POST");

  const extraField = await invoke(route, {
    method: "POST",
    body: { sessionId, workOrderId, callbackUrl: "https://attacker.example" },
  });
  assert.equal(extraField.status, 400);
  assert.equal(calls.length, 0);

  const started = await invoke(route, {
    method: "POST",
    body: { sessionId, workOrderId },
  });
  assert.equal(started.status, 201);
  assert.equal(started.body.session.status, "active");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].db, fakeDb);
  assert.equal(calls[0].authUser.uid, "owner-1");
  assert.equal(calls[0].sessionId, sessionId);
  assert.equal(calls[0].workOrderId, workOrderId);
});

test("start route fails closed when the Admin database is unavailable", async () => {
  let captureCalls = 0;
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/index.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: null },
      "../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        startWorkOrderScannerCapture: async () => {
          captureCalls += 1;
        },
      },
    }
  ).default;
  const result = await invoke(route, {
    method: "POST",
    body: { sessionId, workOrderId },
  });
  assert.equal(result.status, 503);
  assert.equal(result.body.code, "scanner_unavailable");
  assert.equal(captureCalls, 0);
});

test("status route uses authenticated creator context and returns staged events", async () => {
  const calls = [];
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/index.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        getWorkOrderScannerCapture: async (options) => {
          calls.push(options);
          return {
            id: options.sessionId,
            status: "active",
            events: [{ eventId: "scanner-1:47", code: "AIS17704" }],
          };
        },
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "GET",
    query: { id: sessionId },
  });
  assert.equal(result.status, 200);
  assert.equal(calls[0].db, fakeDb);
  assert.equal(calls[0].authUser.uid, "owner-1");
  assert.equal(calls[0].sessionId, sessionId);
  assert.deepEqual(result.body.events, [
    { eventId: "scanner-1:47", code: "AIS17704" },
  ]);
});

test("stop route passes owner context and reports an unacknowledged bridge stop as 502", async () => {
  const calls = [];
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/stop.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        stopWorkOrderScannerCapture: async (options) => {
          calls.push(options);
          return {
            delivered: false,
            code: "scanner_bridge_unavailable",
            session: { id: options.sessionId, status: "cancelled" },
          };
        },
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "POST",
    query: { id: sessionId },
    body: { workOrderId, reason: "cancelled" },
  });
  assert.equal(result.status, 502);
  assert.equal(result.body.ok, false);
  assert.equal(result.body.code, "scanner_stop_failed");
  assert.equal(result.body.committed, true);
  assert.equal(result.body.session.status, "cancelled");
  assert.equal(result.body.stop.session.status, "cancelled");
  assert.equal(calls[0].db, fakeDb);
  assert.equal(calls[0].authUser.uid, "owner-1");
  assert.equal(calls[0].sessionId, sessionId);
  assert.equal(calls[0].workOrderId, workOrderId);
  assert.equal(calls[0].reason, "cancelled");
});

test("stop route preserves a known stale-stop 409 while returning committed session state", async () => {
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/stop.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        stopWorkOrderScannerCapture: async (options) => ({
          delivered: false,
          status: 409,
          code: "scanner_bridge_rejected",
          committed: true,
          reason: options.reason,
          session: { id: options.sessionId, status: "cancelled" },
        }),
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "POST",
    query: { id: sessionId },
    body: { workOrderId, reason: "cancelled" },
  });
  assert.equal(result.status, 409);
  assert.equal(result.body.ok, false);
  assert.equal(result.body.committed, true);
  assert.equal(result.body.session.status, "cancelled");
  assert.equal(result.body.stop.status, 409);
  assert.equal(result.body.stop.committed, true);
});

test("stop route preserves a known bridge 503 while returning committed session state", async () => {
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/stop.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        stopWorkOrderScannerCapture: async (options) => ({
          delivered: false,
          status: 503,
          code: "scanner_bridge_unavailable",
          committed: true,
          reason: options.reason,
          session: { id: options.sessionId, status: "cancelled" },
        }),
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "POST",
    query: { id: sessionId },
    body: { workOrderId, reason: "cancelled" },
  });
  assert.equal(result.status, 503);
  assert.equal(result.body.ok, false);
  assert.equal(result.body.committed, true);
  assert.equal(result.body.session.status, "cancelled");
  assert.equal(result.body.stop.status, 503);
});

test("callback rejects missing or malformed bearer credentials before ingestion", async () => {
  let ingestCalls = 0;
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/events.js",
    {
      // A malformed callback must remain a 401 even when the server database
      // is unavailable, proving the credential gate runs first.
      "../../../../../../context/FirebaseAdmin": { adminDb: null },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        ingestWorkOrderScanEvent: async () => {
          ingestCalls += 1;
          throw new Error("must not ingest");
        },
      },
    }
  ).default;

  for (const authorization of [undefined, "Basic abc", "Bearer too-short"]) {
    const result = await invoke(route, {
      method: "POST",
      headers: authorization ? { authorization } : {},
      query: { id: sessionId },
      body: { eventId: "scanner-1:47", code: "AIS17704" },
    });
    assert.equal(result.status, 401);
    assert.equal(result.body.code, "invalid_callback_token");
  }
  assert.equal(ingestCalls, 0);
});

test("callback passes only a valid per-session bearer and preserves event idempotency status", async () => {
  const calls = [];
  let duplicate = false;
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/events.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        ingestWorkOrderScanEvent: async (options) => {
          calls.push(options);
          return {
            duplicate,
            event: { eventId: "scanner-1:47", code: "AIS17704" },
          };
        },
      },
    }
  ).default;
  const request = {
    method: "POST",
    headers: { authorization: `Bearer ${"a".repeat(43)}` },
    query: { id: sessionId },
    body: { eventId: "scanner-1:47", code: "AIS17704" },
  };

  const created = await invoke(route, request);
  assert.equal(created.status, 202);
  duplicate = true;
  const replayed = await invoke(route, request);
  assert.equal(replayed.status, 200);
  assert.equal(replayed.body.duplicate, true);
  assert.equal(calls[0].db, fakeDb);
  assert.equal(calls[0].sessionId, sessionId);
  assert.equal(calls[0].callbackToken, "a".repeat(43));
  assert.deepEqual(calls[0].body, request.body);
});

test("callback throttles syntactically valid random capabilities before database ingestion", async () => {
  let ingestCalls = 0;
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/events.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        ingestWorkOrderScanEvent: async () => {
          ingestCalls += 1;
          return {
            duplicate: false,
            event: { eventId: `scanner:${ingestCalls}`, code: "AIS17704" },
          };
        },
      },
    }
  ).default;
  const request = {
    method: "POST",
    headers: {
      authorization: `Bearer ${"z".repeat(43)}`,
      "x-forwarded-for": "203.0.113.47",
    },
    query: { id: "callback_rate_session_1234567890" },
    body: { eventId: "scanner:rate", code: "AIS17704" },
  };

  for (let index = 0; index < callbackRateLimit.PER_SOURCE_LIMIT; index += 1) {
    const accepted = await invoke(route, request);
    assert.equal(accepted.status, 202);
  }
  const limited = await invoke(route, request);
  assert.equal(limited.status, 429);
  assert.equal(limited.body.code, "callback_rate_limited");
  assert.match(limited.headers["retry-after"], /^\d+$/);
  assert.equal(ingestCalls, callbackRateLimit.PER_SOURCE_LIMIT);
});

test("work-order drain route authenticates the owner and forwards its exact target", async () => {
  const getCalls = [];
  const drainCalls = [];
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/drain.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        getWorkOrderScannerCapture: async (options) => {
          getCalls.push(options);
          return { sessionId, workOrderId };
        },
        signalWorkOrderScannerDrain: async (options) => {
          drainCalls.push(options);
          return { delivered: true, drained: true, pending: 0 };
        },
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "POST",
    query: { id: sessionId },
    body: { workOrderId, reason: "confirmed" },
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.drain.drained, true);
  assert.equal(getCalls[0].db, fakeDb);
  assert.equal(getCalls[0].authUser.uid, "owner-1");
  assert.equal(getCalls[0].sessionId, sessionId);
  assert.deepEqual(drainCalls[0], {
    sessionId,
    workOrderId,
    reason: "confirmed",
  });
});

test("work-order drain route rejects a mismatched target before signaling the bridge", async () => {
  let drainCalls = 0;
  const route = loadProjectModule(
    "pages/api/items/work-order-add/scan-sessions/[id]/drain.js",
    {
      "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
      "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
        getWorkOrderScannerCapture: async () => ({
          sessionId,
          workOrderId: "different-work-order",
        }),
        signalWorkOrderScannerDrain: async () => {
          drainCalls += 1;
        },
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "POST",
    query: { id: sessionId },
    body: { workOrderId, reason: "confirmed" },
  });
  assert.equal(result.status, 409);
  assert.equal(result.body.code, "session_target_conflict");
  assert.equal(drainCalls, 0);
});

test("work-order drain route distinguishes unsupported and failed bridge delivery", async () => {
  const run = async (drain) => {
    const route = loadProjectModule(
      "pages/api/items/work-order-add/scan-sessions/[id]/drain.js",
      {
        "../../../../../../context/FirebaseAdmin": { adminDb: fakeDb },
        "../../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
        "../../../../../../lib/inventory/workOrderScannerCapture.cjs": {
          getWorkOrderScannerCapture: async () => ({ sessionId, workOrderId }),
          signalWorkOrderScannerDrain: async () => drain,
        },
      }
    ).default;
    return invoke(route, {
      method: "POST",
      query: { id: sessionId },
      body: { workOrderId, reason: "confirmed" },
    });
  };

  const unsupported = await run({
    delivered: false,
    attempts: [{ status: 404 }, { status: 404 }],
  });
  assert.equal(unsupported.status, 404);
  assert.equal(unsupported.body.code, "scanner_drain_unsupported");

  const failed = await run({
    delivered: false,
    attempts: [{ status: 404 }, { status: 503 }],
  });
  assert.equal(failed.status, 502);
  assert.equal(failed.body.code, "scanner_drain_failed");
});
