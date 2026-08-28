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

class StoragePlacementError extends Error {
  constructor(code, message, statusCode = 400) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

class StorageScanError extends Error {
  constructor(code, message, statusCode = 400) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

function internalUser(overrides = {}) {
  return {
    uid: "owner-1",
    email: "owner@advancedimagingparts.com",
    email_verified: true,
    role: "user",
    ...overrides,
  };
}

function loadRoute({
  authUser = internalUser(),
  confirmationResult,
  confirmationError,
  stopResult = { delivered: true },
  stopError = null,
} = {}) {
  const calls = { confirmations: [], stops: [], statusWrites: [] };
  const adminDb = { name: "fake-admin-db" };
  const confirmStorageUnitPlacement = async (options) => {
    calls.confirmations.push(options);
    if (confirmationError) throw confirmationError;
    return (
      confirmationResult || {
        ok: true,
        status: "confirmed",
        sessionId: options.sessionId,
        unitId: "B47",
        unitType: "bin",
        newlyConfirmed: true,
        alreadyConfirmed: false,
        placedItemCount: 1,
        placedBinCount: 0,
      }
    );
  };
  const signalStorageScanStop = async (options) => {
    calls.stops.push(options);
    if (stopError) throw stopError;
    return stopResult;
  };
  const requireStorageScanUser = async (_request, response) => {
    if (!authUser) {
      response.status(401).json({ error: "Authentication is required." });
      return null;
    }
    if (!String(authUser.email || "").endsWith("@advancedimagingparts.com")) {
      response.status(403).json({ error: "A verified AIS account is required." });
      return null;
    }
    return authUser;
  };
  const route = loadProjectModule(
    "pages/api/storage-units/scan-sessions/[id]/confirm.js",
    {
      "firebase-admin/firestore": { FieldValue: { delete: () => ({ delete: true }) } },
      "../../../../../context/FirebaseAdmin": { adminDb },
      "../../../../../utils/authAccess": {
        USER_ROLES: { VIEWER: "viewer" },
        canAccessMagmo: (_email, user) => user?.magmoAccessRevoked !== true,
        getEffectiveRole: (_email, user) => user?.role || "user",
        isAllowedEmailDomain: (email) =>
          String(email).endsWith("@advancedimagingparts.com"),
      },
      "../../../../../lib/inventory/storageUnitScanApi": {
        requireStorageScanUser,
        setStorageScanResponseHeaders: (response) => {
          response.setHeader("Cache-Control", "private, no-store, max-age=0");
          response.setHeader("Pragma", "no-cache");
        },
      },
      "../../../../../lib/inventory/storageUnitPlacement.cjs": {
        StoragePlacementError,
        confirmStorageUnitPlacement,
      },
      "../../../../../lib/inventory/storageUnitScanSessions.cjs": {
        StorageScanError,
        signalStorageScanStop,
        storageScanSessionRef: (_db, sessionId) => ({
          set: async (value, options) => {
            calls.statusWrites.push({ sessionId, value, options });
          },
        }),
      },
    }
  );
  return { handler: route.default, calls, adminDb };
}

const SESSION_ID = "abcdefghijklmnopqrstuvwx";

test("confirm route uses the shared [id] tree and rejects non-POST requests", async () => {
  assert.equal(
    fs.existsSync(
      path.join(
        __dirname,
        "..",
        "pages/api/storage-units/scan-sessions/[sessionId]/confirm.js"
      )
    ),
    false
  );
  const { handler, calls } = loadRoute();
  const result = await invoke(handler, {
    method: "GET",
    query: { id: SESSION_ID },
  });
  assert.equal(result.status, 405);
  assert.equal(result.headers.allow, "POST");
  assert.equal(calls.confirmations.length, 0);
});

test("confirm route requires an internal owner-capable, non-viewer account", async () => {
  for (const [authUser, expectedStatus] of [
    [null, 401],
    [internalUser({ role: "viewer" }), 403],
    [internalUser({ email: "external@example.com" }), 403],
    [internalUser({ magmoAccessRevoked: true }), 403],
  ]) {
    const { handler, calls } = loadRoute({ authUser });
    const result = await invoke(handler, {
      method: "POST",
      query: { id: SESSION_ID },
      body: { eventIds: ["scanner-1:1"] },
    });
    assert.equal(result.status, expectedStatus);
    assert.equal(calls.confirmations.length, 0);
  }
});

test("confirm accepts only selected event IDs and forwards authenticated ownership", async () => {
  const { handler, calls, adminDb } = loadRoute();
  const rejected = await invoke(handler, {
    method: "POST",
    query: { id: SESSION_ID },
    body: {
      eventIds: ["scanner-1:1"],
      itemIds: ["AIS17704"],
      rawCodes: ["AIS17704"],
    },
  });
  assert.equal(rejected.status, 400);
  assert.equal(calls.confirmations.length, 0);

  const accepted = await invoke(handler, {
    method: "POST",
    query: { id: SESSION_ID },
    body: { eventIds: ["scanner-1:1", "scanner-1:2"] },
  });
  assert.equal(accepted.status, 200);
  assert.equal(accepted.body.status, "confirmed");
  assert.equal(accepted.body.bridgeStopDelivered, true);
  assert.match(accepted.headers["cache-control"], /no-store/);
  assert.equal(calls.confirmations.length, 1);
  assert.equal(calls.confirmations[0].db, adminDb);
  assert.equal(calls.confirmations[0].sessionId, SESSION_ID);
  assert.equal(calls.confirmations[0].authUser.uid, "owner-1");
  assert.deepEqual(calls.confirmations[0].eventIds, ["scanner-1:1", "scanner-1:2"]);
  assert.equal(calls.stops.length, 1);
  assert.deepEqual(calls.stops[0], {
    sessionId: SESSION_ID,
    unitId: "B47",
    reason: "confirmed",
  });
  assert.equal(calls.statusWrites.length, 1);
  assert.equal(calls.statusWrites[0].sessionId, SESSION_ID);
  assert.equal(calls.statusWrites[0].value.bridgeStopStatus, "delivered");
});

test("idempotent confirmation retries still send scanner stop", async () => {
  const { handler, calls } = loadRoute({
    confirmationResult: {
      ok: true,
      status: "confirmed",
      sessionId: SESSION_ID,
      unitId: "P65",
      unitType: "pallet",
      newlyConfirmed: false,
      alreadyConfirmed: true,
      placedItemCount: 2,
      placedBinCount: 1,
    },
  });
  const result = await invoke(handler, {
    method: "POST",
    query: { id: SESSION_ID },
    body: { eventIds: ["scanner-2:1"] },
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.alreadyConfirmed, true);
  assert.equal(calls.stops.length, 1);
  assert.equal(calls.stops[0].unitId, "P65");
});

test("bridge failure never rolls back an already committed placement", async () => {
  const { handler, calls } = loadRoute({ stopError: new Error("bridge offline") });
  const result = await invoke(handler, {
    method: "POST",
    query: { id: SESSION_ID },
    body: { eventIds: ["scanner-1:1"] },
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.status, "confirmed");
  assert.equal(result.body.bridgeStopDelivered, false);
  assert.equal(calls.statusWrites.length, 1);
  assert.equal(calls.statusWrites[0].value.bridgeStopStatus, "failed");
});

test("known confirmation errors preserve their safe status and code", async () => {
  const { handler } = loadRoute({
    confirmationError: new StoragePlacementError(
      "conflicting_staged_membership",
      "An item is staged twice.",
      409
    ),
  });
  const result = await invoke(handler, {
    method: "POST",
    query: { id: SESSION_ID },
    body: { eventIds: ["scanner-1:1"] },
  });
  assert.equal(result.status, 409);
  assert.deepEqual(result.body, {
    error: "An item is staged twice.",
    code: "conflicting_staged_membership",
  });
});
