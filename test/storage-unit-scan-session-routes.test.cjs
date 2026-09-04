const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

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

function apiMocks(authUser = { uid: "user-1" }) {
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

test("start route authenticates, accepts only unitId, and returns no-store session data", async () => {
  const calls = [];
  const route = loadProjectModule("pages/api/storage-units/scan-sessions/index.js", {
    "../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
    "../../../../lib/inventory/storageUnitScanApi": apiMocks(),
    "../../../../lib/inventory/storageUnitScanSessions.cjs": {
      startStorageScanSession: async (options) => {
        calls.push(options);
        return {
          id: "abcdefghijklmnopqrstuvwx",
          sessionId: "abcdefghijklmnopqrstuvwx",
          status: "active",
          unitId: "B47",
          events: [],
        };
      },
    },
  }).default;

  const method = await invoke(route, { method: "GET", body: {} });
  assert.equal(method.status, 405);
  assert.equal(method.headers.allow, "POST");

  const extra = await invoke(route, {
    method: "POST",
    body: { unitId: "B47", callbackUrl: "https://attacker.example" },
  });
  assert.equal(extra.status, 400);
  assert.equal(calls.length, 0);

  const started = await invoke(route, { method: "POST", body: { unitId: "B47" } });
  assert.equal(started.status, 201);
  assert.equal(started.body.session.status, "active");
  assert.deepEqual(started.body.events, []);
  assert.match(started.headers["cache-control"], /no-store/);
  assert.equal(calls[0].rawUnitId, "B47");
  assert.equal(calls[0].authUser.uid, "user-1");
});

test("status route passes only the authenticated owner identity and path session ID", async () => {
  const calls = [];
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/index.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
      "../../../../../lib/inventory/storageUnitScanApi": apiMocks({ uid: "owner-1" }),
      "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        getStorageScanSession: async (options) => {
          calls.push(options);
          return {
            id: options.sessionId,
            status: "active",
            events: [{ eventId: "event-1", code: "AIS17704" }],
          };
        },
      },
    }
  ).default;
  const result = await invoke(route, {
    method: "GET",
    query: { id: "abcdefghijklmnopqrstuvwx" },
  });
  assert.equal(result.status, 200);
  assert.equal(calls[0].authUser.uid, "owner-1");
  assert.equal(calls[0].sessionId, "abcdefghijklmnopqrstuvwx");
  assert.deepEqual(result.body.events, [
    { eventId: "event-1", code: "AIS17704" },
  ]);
});

test("cancel reports a committed cancellation even when bridge stop is not acknowledged", async () => {
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/cancel.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
      "../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
      "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        cancelStorageScanSession: async () => ({
          session: { status: "cancelled", events: [] },
          stopDelivered: false,
        }),
      },
    }
  ).default;
  const rejectedBody = await invoke(route, {
    method: "POST",
    query: { id: "abcdefghijklmnopqrstuvwx" },
    body: { reason: "anything" },
  });
  assert.equal(rejectedBody.status, 400);

  const result = await invoke(route, {
    method: "POST",
    query: { id: "abcdefghijklmnopqrstuvwx" },
    body: {},
  });
  assert.equal(result.status, 502);
  assert.equal(result.body.ok, false);
  assert.equal(result.body.session.status, "cancelled");
  assert.equal(result.body.stop.delivered, false);
});

test("callback route uses only the per-session bearer and queues without resolving", async () => {
  const calls = [];
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/events.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
      "../../../../../lib/inventory/storageUnitScanApi": {
        setStorageScanResponseHeaders: (response) =>
          response.setHeader("Cache-Control", "no-store"),
        sendStorageScanError: (response, error) =>
          response.status(error.statusCode || 500).json({ error: error.message }),
      },
      "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        bearerTokenFromRequest: () => "per-session-secret",
        cleanCallbackToken: (value) => value,
        ingestStorageScanEvent: async (options) => {
          calls.push(options);
          return {
            duplicate: false,
            event: { eventId: "scanner-1:47", code: "AIS17704" },
          };
        },
      },
    }
  ).default;
  const result = await invoke(route, {
    method: "POST",
    headers: { authorization: "Bearer secret" },
    query: { id: "abcdefghijklmnopqrstuvwx" },
    body: { eventId: "scanner-1:47", code: "AIS17704" },
  });
  assert.equal(result.status, 202);
  assert.equal(calls[0].callbackToken, "per-session-secret");
  assert.equal(calls[0].sessionId, "abcdefghijklmnopqrstuvwx");
  assert.equal("resolveStorageScanCode" in calls[0], false);
});

test("callback route rejects a missing bearer before event ingestion", async () => {
  let ingestCalls = 0;
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/events.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
      "../../../../../lib/inventory/storageUnitScanApi": {
        setStorageScanResponseHeaders: (response) =>
          response.setHeader("Cache-Control", "no-store"),
        sendStorageScanError: (response, error) =>
          response.status(error.statusCode || 500).json({ error: error.message }),
      },
      "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        bearerTokenFromRequest: () => "",
        cleanCallbackToken: () => "",
        ingestStorageScanEvent: async () => {
          ingestCalls += 1;
          throw new Error("must not ingest");
        },
      },
      "../../../../../lib/inventory/storageUnitPlacement.cjs": {
        resolveStorageScanCode: async () => ({ status: "resolved" }),
      },
    }
  ).default;
  const result = await invoke(route, {
    method: "POST",
    headers: {},
    query: { id: "abcdefghijklmnopqrstuvwx" },
    body: { eventId: "scanner-1:47", code: "AIS17704" },
  });
  assert.equal(result.status, 401);
  assert.equal(result.body.code, "invalid_callback_token");
  assert.equal(ingestCalls, 0);
});

test("owner resolve route accepts only an empty body and returns idempotency state", async () => {
  const calls = [];
  const resolver = async () => ({ status: "resolved", kind: "item" });
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/events/[eventId]/resolve.js",
    {
      "../../../../../../../context/FirebaseAdmin": {
        adminDb: { kind: "fake-db" },
      },
      "../../../../../../../lib/inventory/storageUnitScanApi": apiMocks({
        uid: "owner-9",
      }),
      "../../../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        resolveStorageScanEvent: async (options) => {
          calls.push(options);
          return {
            duplicate: calls.length > 1,
            event: {
              eventId: "scanner-1:47",
              code: "AIS17704",
              status: "resolved",
            },
          };
        },
      },
      "../../../../../../../lib/inventory/storageUnitPlacement.cjs": {
        resolveStorageScanCode: resolver,
      },
    }
  ).default;

  const extra = await invoke(route, {
    method: "POST",
    query: { id: "abcdefghijklmnopqrstuvwx", eventId: "scanner-1:47" },
    body: { code: "forged" },
  });
  assert.equal(extra.status, 400);
  assert.equal(calls.length, 0);

  const request = {
    method: "POST",
    query: { id: "abcdefghijklmnopqrstuvwx", eventId: "scanner-1:47" },
    body: {},
  };
  const resolved = await invoke(route, request);
  const replayed = await invoke(route, request);
  assert.equal(resolved.status, 200);
  assert.equal(resolved.body.duplicate, false);
  assert.equal(replayed.status, 200);
  assert.equal(replayed.body.duplicate, true);
  assert.equal(calls[0].authUser.uid, "owner-9");
  assert.equal(calls[0].sessionId, "abcdefghijklmnopqrstuvwx");
  assert.equal(calls[0].eventId, "scanner-1:47");
  assert.equal(calls[0].resolveStorageScanCode, resolver);
});

test("storage drain route authenticates the owner and forwards the canonical session target", async () => {
  const getCalls = [];
  const drainCalls = [];
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/drain.js",
    {
      "../../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
      "../../../../../lib/inventory/storageUnitScanApi": apiMocks({ uid: "owner-2" }),
      "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        getStorageScanSession: async (options) => {
          getCalls.push(options);
          return {
            sessionId: "abcdefghijklmnopqrstuvwx",
            unitId: "B47",
          };
        },
        signalStorageScanDrain: async (options) => {
          drainCalls.push(options);
          return { delivered: true, drained: true, pending: 0 };
        },
      },
    }
  ).default;

  const result = await invoke(route, {
    method: "POST",
    query: { id: "abcdefghijklmnopqrstuvwx" },
    body: { reason: "confirmed" },
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.drain.drained, true);
  assert.equal(getCalls[0].authUser.uid, "owner-2");
  assert.equal(getCalls[0].sessionId, "abcdefghijklmnopqrstuvwx");
  assert.deepEqual(drainCalls[0], {
    sessionId: "abcdefghijklmnopqrstuvwx",
    unitId: "B47",
    reason: "confirmed",
  });
});

test("storage drain route distinguishes an unsupported bridge from delivery failure", async () => {
  const run = async (drain) => {
    const route = loadProjectModule(
      "pages/api/storage-units/scan-sessions/[id]/drain.js",
      {
        "../../../../../context/FirebaseAdmin": { adminDb: { kind: "fake-db" } },
        "../../../../../lib/inventory/storageUnitScanApi": apiMocks(),
        "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
          getStorageScanSession: async () => ({
            sessionId: "abcdefghijklmnopqrstuvwx",
            unitId: "B47",
          }),
          signalStorageScanDrain: async () => drain,
        },
      }
    ).default;
    return invoke(route, {
      method: "POST",
      query: { id: "abcdefghijklmnopqrstuvwx" },
      body: {},
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

test("shared browser auth requires verified, non-revoked internal AIS users", async () => {
  const loadAuth = (authUser, allowedDomain = true) =>
    loadProjectModule("lib/inventory/storageUnitScanApi.js", {
      "../../utils/apiAuth": { requireFirebaseAuth: async () => authUser },
      "../../utils/authAccess": {
        USER_ROLES: { VIEWER: "viewer" },
        getEffectiveRole: (_email, user) => user?.role || "user",
        isAllowedEmailDomain: () => allowedDomain,
      },
    });

  for (const [authUser, allowedDomain, expectedStatus] of [
    [null, false, 401],
    [{ uid: "u1", email_verified: false }, true, 403],
    [{ uid: "u1", email_verified: true, magmoAccessRevoked: true }, true, 403],
    [{ uid: "u1", email_verified: true }, false, 403],
    [{ uid: "u1", email_verified: true, role: "viewer" }, true, 403],
  ]) {
    const { result, response } = responseRecorder();
    const api = loadAuth(authUser, allowedDomain);
    const returned = await api.requireStorageScanUser({}, response);
    assert.equal(returned, null);
    assert.equal(result.status, expectedStatus);
  }

  const internal = {
    uid: "u1",
    email: "user@advancedimagingparts.com",
    email_verified: true,
  };
  const { response } = responseRecorder();
  const api = loadAuth(internal, true);
  assert.equal(await api.requireStorageScanUser({}, response), internal);
});

test("Firestore catch-all rules cannot reopen scanner session or lock documents", () => {
  const rules = fs.readFileSync(
    path.join(__dirname, "..", "firestore.rules"),
    "utf8"
  );
  assert.match(
    rules,
    /match \/StorageUnitScanSessions\/\{document=\*\*\}\s*\{\s*allow read, write: if false;/
  );
  assert.match(
    rules,
    /match \/StorageUnitScanControls\/\{document=\*\*\}\s*\{\s*allow read, write: if false;/
  );
  const catchAll = rules.match(/match \/\{collection\}\/\{document=\*\*\}[\s\S]*?\n\s*\}/)?.[0] || "";
  for (const collection of ["StorageUnitScanSessions", "StorageUnitScanControls"]) {
    const exclusions = catchAll.match(
      new RegExp(`collection != "${collection}"`, "g")
    ) || [];
    assert.equal(exclusions.length, 2, `${collection} must be excluded from read and write`);
  }
});

test("scanner-server handoff documents every route, credential, and stop contract", () => {
  const handoff = fs.readFileSync(
    path.join(__dirname, "..", "docs", "storage-unit-scanner-handoff.md"),
    "utf8"
  );
  for (const requiredText of [
    "POST /api/storage-units/scan-sessions",
    "GET /api/storage-units/scan-sessions/{sessionId}",
    "POST /api/storage-units/scan-sessions/{sessionId}/cancel",
    "POST /api/storage-units/scan-sessions/{sessionId}/confirm",
    "POST /api/storage-units/scan-sessions/{sessionId}/events",
    "POST /storage-scan/start",
    "POST /storage-scan/stop",
    "STORAGE_SCAN_BRIDGE_TOKEN",
    "STORAGE_SCAN_CALLBACK_BASE_URL",
    "STORAGE_SCAN_ENABLED=false",
    "must never stop a newer active session B",
  ]) {
    assert.equal(handoff.includes(requiredText), true, requiredText);
  }
  assert.equal(handoff.includes("serviceAccountKey.json"), false);
});
