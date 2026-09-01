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

class WorkOrderAddError extends Error {
  constructor(code, message, statusCode = 400, details) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
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

function internalUser() {
  return {
    uid: "user-1",
    email: "user@advancedimagingparts.com",
    email_verified: true,
  };
}

function routeMocks({ authUser = internalUser(), confirmError, resolveError } = {}) {
  const calls = { confirm: [], resolve: [] };
  const adminDb = { id: "db" };
  const service = {
    WorkOrderAddError,
    previewWorkOrderAddScan: async (input) => {
      calls.resolve.push(input);
      if (resolveError) throw resolveError;
      return {
        status: "ready",
        kind: "item",
        canonicalId: "AIS123",
        preview: { id: "AIS123", itemCount: 1 },
      };
    },
    confirmWorkOrderAdd: async (input) => {
      calls.confirm.push(input);
      if (confirmError) throw confirmError;
      return {
        ok: true,
        operationId: input.operationId,
        workOrder: { id: input.workOrderId, number: "10490" },
        itemCount: 1,
      };
    },
  };
  const api = {
    hasOnlyBodyKeys(body, allowedKeys) {
      if (!body || typeof body !== "object" || Array.isArray(body)) return false;
      const allowed = new Set(allowedKeys);
      return Object.keys(body).every((key) => allowed.has(key));
    },
    requireStorageScanUser: async (_request, response) => {
      if (!authUser) {
        response.status(401).json({ ok: false, error: "Authentication required." });
        return null;
      }
      return authUser;
    },
    setStorageScanResponseHeaders(response) {
      response.setHeader("Cache-Control", "private, no-store, max-age=0");
    },
  };
  return { calls, adminDb, service, api };
}

function loadResolveRoute(options = {}) {
  const mocks = routeMocks(options);
  const route = loadProjectModule("pages/api/items/work-order-add/resolve.js", {
    "../../../../context/FirebaseAdmin": { adminDb: mocks.adminDb },
    "../../../../lib/inventory/storageUnitScanApi": mocks.api,
    "../../../../lib/inventory/workOrderAddService.cjs": mocks.service,
  });
  return { handler: route.default, ...mocks };
}

function loadConfirmRoute(options = {}) {
  const mocks = routeMocks(options);
  const route = loadProjectModule("pages/api/items/work-order-add/confirm.js", {
    "../../../../context/FirebaseAdmin": { adminDb: mocks.adminDb },
    "../../../../lib/inventory/storageUnitScanApi": mocks.api,
    "../../../../lib/inventory/workOrderAddService.cjs": mocks.service,
  });
  return { handler: route.default, ...mocks };
}

test("scan resolution is internal-only, no-store, and accepts only one code", async () => {
  const { handler, calls, adminDb } = loadResolveRoute();
  const rejected = await invoke(handler, {
    method: "POST",
    body: { code: "AIS123", itemId: "AIS999" },
  });
  assert.equal(rejected.status, 400);
  assert.equal(calls.resolve.length, 0);

  const accepted = await invoke(handler, {
    method: "POST",
    body: { code: "AIS123" },
  });
  assert.equal(accepted.status, 200);
  assert.equal(accepted.body.ok, true);
  assert.match(accepted.headers["cache-control"], /no-store/);
  assert.deepEqual(calls.resolve, [{ db: adminDb, rawCode: "AIS123" }]);
});

test("confirmation forwards only authenticated staged intent to the server service", async () => {
  const { handler, calls, adminDb } = loadConfirmRoute();
  const body = {
    operationId: "abcdefghijklmnopqrstuvwx",
    workOrderId: "10490",
    scans: ["AIS123", "B7", "P2"],
    expectedMembership: [
      { code: "AIS123", fingerprint: "a".repeat(64) },
      { code: "B7", fingerprint: "b".repeat(64) },
      { code: "P2", fingerprint: "c".repeat(64) },
    ],
    movementMode: "current_at_work_order",
  };
  const response = await invoke(handler, { method: "POST", body });
  assert.equal(response.status, 200);
  assert.equal(response.body.result.itemCount, 1);
  assert.equal(calls.confirm.length, 1);
  assert.equal(calls.confirm[0].db, adminDb);
  assert.equal(calls.confirm[0].authUser.uid, "user-1");
  assert.deepEqual(calls.confirm[0].scans, body.scans);
  assert.deepEqual(calls.confirm[0].expectedMembership, body.expectedMembership);
  assert.equal(calls.confirm[0].movementMode, "current_at_work_order");
});

test("confirmation requires one exact movement mode before calling the mutation service", async () => {
  for (const movementMode of [undefined, "keep_origin", "FROM_WORK_ORDER"]) {
    const { handler, calls } = loadConfirmRoute();
    const response = await invoke(handler, {
      method: "POST",
      body: {
        operationId: "abcdefghijklmnopqrstuvwx",
        workOrderId: "10490",
        scans: ["AIS123"],
        expectedMembership: [
          { code: "AIS123", fingerprint: "a".repeat(64) },
        ],
        ...(movementMode === undefined ? {} : { movementMode }),
      },
    });
    assert.equal(response.status, 400);
    assert.equal(response.body.code, "invalid_movement_mode");
    assert.equal(calls.confirm.length, 0);
  }
});

test("confirmation does not trust client actor, destination, or item fields", async () => {
  const { handler, calls } = loadConfirmRoute();
  for (const extra of ["actor", "itemIds", "destination", "from", "current"]) {
    const response = await invoke(handler, {
      method: "POST",
      body: {
        operationId: "abcdefghijklmnopqrstuvwx",
        workOrderId: "10490",
        scans: ["AIS123"],
        [extra]: {},
      },
    });
    assert.equal(response.status, 400);
  }
  assert.equal(calls.confirm.length, 0);
});

test("non-SoCal review details are returned without performing a partial move", async () => {
  const error = new WorkOrderAddError(
    "non_socal_confirmation_required",
    "Some items are not currently recorded at SoCal Lake Forest.",
    409,
    { count: 1, items: [{ id: "AIS123", currentLocation: "Other site" }] }
  );
  const { handler } = loadConfirmRoute({ confirmError: error });
  const response = await invoke(handler, {
    method: "POST",
    body: {
      operationId: "abcdefghijklmnopqrstuvwx",
      workOrderId: "10490",
      scans: ["AIS123"],
      movementMode: "from_work_order",
    },
  });
  assert.equal(response.status, 409);
  assert.equal(response.body.code, "non_socal_confirmation_required");
  assert.equal(response.body.details.items[0].id, "AIS123");
});

test("both routes reject unauthenticated users before inventory access", async () => {
  for (const loader of [loadResolveRoute, loadConfirmRoute]) {
    const { handler, calls } = loader({ authUser: null });
    const response = await invoke(handler, {
      method: "POST",
      body: loader === loadResolveRoute
        ? { code: "AIS123" }
        : {
            operationId: "abcdefghijklmnopqrstuvwx",
            workOrderId: "10490",
            scans: ["AIS123"],
          },
    });
    assert.equal(response.status, 401);
    assert.equal(calls.resolve.length + calls.confirm.length, 0);
  }
});
