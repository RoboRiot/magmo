const assert = require("node:assert/strict");
const test = require("node:test");

const capture = require("../lib/inventory/workOrderScannerCapture.cjs");
const scanSessions = require("../lib/inventory/storageUnitScanSessions.cjs");

const SESSION_ID = "work_order_capture_1234567890";
const BRIDGE_TOKEN = "t".repeat(43);
const STARTED_AT = Date.parse("2026-09-01T17:00:00.000Z");
const ENV = {
  NODE_ENV: "production",
  OPS_ENVIRONMENT: "testing",
  STORAGE_SCAN_ENABLED: "true",
  STORAGE_SCAN_BRIDGE_TOKEN: BRIDGE_TOKEN,
  STORAGE_SCAN_START_URL: "https://bridge.example/storage-scan/start",
  STORAGE_SCAN_STOP_URL: "https://bridge.example/storage-scan/stop",
  STORAGE_SCAN_CALLBACK_BASE_URL: "https://magmo.example",
  WORK_ORDER_SCAN_TTL_SECONDS: "180",
};

function clone(value) {
  if (value === undefined) return undefined;
  return structuredClone(value);
}

class FakeSnapshot {
  constructor(reference, value) {
    this.ref = reference;
    this.id = reference.id;
    this.exists = value !== undefined;
    this._value = value;
  }
  data() {
    return clone(this._value);
  }
}

class FakeQuery {
  constructor(db, collectionPath, orderField = "", limitValue = Infinity) {
    this.db = db;
    this.collectionPath = collectionPath;
    this.orderField = orderField;
    this.limitValue = limitValue;
  }
  orderBy(field) {
    return new FakeQuery(this.db, this.collectionPath, field, this.limitValue);
  }
  limit(value) {
    return new FakeQuery(this.db, this.collectionPath, this.orderField, value);
  }
  async get() {
    const prefix = `${this.collectionPath}/`;
    const docs = Array.from(this.db.records.entries())
      .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes("/"))
      .map(([path, value]) => new FakeSnapshot(new FakeReference(this.db, path), value));
    if (this.orderField) {
      docs.sort(
        (left, right) =>
          scanSessions.timestampToMillis(left.data()?.[this.orderField]) -
          scanSessions.timestampToMillis(right.data()?.[this.orderField])
      );
    }
    return { docs: docs.slice(0, this.limitValue), size: docs.length };
  }
}

class FakeCollection extends FakeQuery {
  constructor(db, path) {
    super(db, path);
    this.path = path;
  }
  doc(id) {
    return new FakeReference(this.db, `${this.path}/${id}`);
  }
}

class FakeReference {
  constructor(db, path) {
    this.db = db;
    this.path = path;
    this.id = path.split("/").at(-1);
  }
  collection(name) {
    return new FakeCollection(this.db, `${this.path}/${name}`);
  }
  async get() {
    return new FakeSnapshot(this, this.db.records.get(this.path));
  }
  async set(value, options = {}) {
    this.db.write(this.path, value, options);
  }
}

class FakeDb {
  constructor(seed = {}) {
    this.records = new Map(Object.entries(seed).map(([path, value]) => [path, clone(value)]));
    this.collectionCalls = 0;
  }
  collection(name) {
    this.collectionCalls += 1;
    return new FakeCollection(this, name);
  }
  write(path, value, options = {}) {
    const previous = this.records.get(path);
    const next = options.merge && previous
      ? { ...clone(previous), ...clone(value) }
      : clone(value);
    this.records.set(path, next);
  }
  async runTransaction(callback) {
    const transaction = {
      get: (reference) => reference.get(),
      set: (reference, value, options) => this.write(reference.path, value, options),
    };
    return callback(transaction);
  }
}

function bridgeResponse(status, payload = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(payload),
  };
}

function seededDb(extra = {}) {
  return new FakeDb({
    "OpsWorkOrders/WO-10490": { clientId: "Client/client-1", workOrderNumber: "10490" },
    ...extra,
  });
}

test("work-order bridge relays callback-backed start and exact stop contracts", async () => {
  const calls = [];
  const expiresAt = new Date(STARTED_AT + 180_000);
  const fetchImpl = async (url, options) => {
    calls.push({ url, options, body: JSON.parse(options.body) });
    return bridgeResponse(calls.length === 1 ? 201 : 200, {
      bridgeSessionId: "warehouse-reader:session-1",
      expiresAt: expiresAt.toISOString(),
    });
  };

  const started = await capture.signalWorkOrderScannerStart({
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    callbackUrl: `https://magmo.example/api/items/work-order-add/scan-sessions/${SESSION_ID}/events`,
    callbackToken: "c".repeat(43),
    expiresAt,
    fetchImpl,
    env: ENV,
  });
  const stopped = await capture.signalWorkOrderScannerStop({
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    reason: "confirmed",
    fetchImpl,
    env: ENV,
  });

  assert.equal(calls[0].url, "https://bridge.example/work-order-scan/start");
  assert.equal(calls[1].url, "https://bridge.example/work-order-scan/stop");
  assert.equal(calls[0].options.headers.Authorization, `Bearer ${BRIDGE_TOKEN}`);
  assert.equal(calls[1].options.headers.Authorization, `Bearer ${BRIDGE_TOKEN}`);
  assert.equal(calls[0].options.redirect, "error");
  assert.equal(calls[1].options.redirect, "error");
  assert.deepEqual(calls[0].body, {
    schemaVersion: 1,
    sessionId: SESSION_ID,
    target: { type: "work-order-add", workOrderId: "WO-10490" },
    callback: {
      url: `https://magmo.example/api/items/work-order-add/scan-sessions/${SESSION_ID}/events`,
      bearerToken: "c".repeat(43),
      expiresAt: expiresAt.toISOString(),
    },
  });
  assert.deepEqual(calls[1].body, {
    schemaVersion: 1,
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    reason: "confirmed",
  });
  assert.equal(started.delivered, true);
  assert.equal(stopped.delivered, true);
});

test("persistent Work Order session receives idempotent callbacks and releases scanner lease", async () => {
  const db = seededDb();
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return bridgeResponse(url.endsWith("/start") ? 201 : 200, {
      bridgeSessionId: "warehouse-reader:session-1",
    });
  };
  const authUser = { uid: "user-1", email: "USER@example.com" };

  const session = await capture.startWorkOrderScannerCapture({
    db,
    authUser,
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    nowMs: STARTED_AT,
    fetchImpl,
    env: ENV,
  });
  assert.equal(session.status, "active");
  assert.equal(session.captureMode, "remote-callback");
  assert.equal(session.expiresAt, "2026-09-01T17:03:00.000Z");
  assert.deepEqual(session.events, []);
  const callback = calls[0].body.callback;
  assert.equal(callback.url, `https://magmo.example/api/items/work-order-add/scan-sessions/${SESSION_ID}/events`);
  assert.match(callback.bearerToken, /^[A-Za-z0-9_-]{43,128}$/);
  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.callbackToken, undefined);
  assert.match(stored.callbackTokenHash, /^[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(stored).includes(callback.bearerToken), false);
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, SESSION_ID);
  assert.equal(db.records.get("StorageUnitScanControls/default").activeTargetType, "work-order-add");

  const first = await capture.ingestWorkOrderScanEvent({
    db,
    sessionId: SESSION_ID,
    callbackToken: callback.bearerToken,
    body: {
      eventId: "warehouse-reader:000001",
      code: "AIS17704",
      scannedAt: "2026-09-01T17:00:05.000Z",
    },
    nowMs: STARTED_AT + 5_000,
  });
  const duplicate = await capture.ingestWorkOrderScanEvent({
    db,
    sessionId: SESSION_ID,
    callbackToken: callback.bearerToken,
    body: {
      eventId: "warehouse-reader:000001",
      code: "AIS17704",
      scannedAt: "2026-09-01T17:00:05.000Z",
    },
    nowMs: STARTED_AT + 6_000,
  });
  assert.equal(first.duplicate, false);
  assert.equal(duplicate.duplicate, true);

  const refreshed = await capture.getWorkOrderScannerCapture({
    db,
    authUser,
    sessionId: SESSION_ID,
    nowMs: STARTED_AT + 7_000,
    fetchImpl,
    env: ENV,
  });
  assert.equal(refreshed.eventCount, 1);
  assert.deepEqual(refreshed.events.map((event) => event.code), ["AIS17704"]);
  await assert.rejects(
    capture.getWorkOrderScannerCapture({
      db,
      authUser: { uid: "other-user" },
      sessionId: SESSION_ID,
      nowMs: STARTED_AT + 7_000,
      fetchImpl,
      env: ENV,
    }),
    (error) => error.code === "session_not_found" && error.statusCode === 404
  );

  const stopped = await capture.stopWorkOrderScannerCapture({
    db,
    authUser,
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    reason: "confirmed",
    nowMs: STARTED_AT + 8_000,
    fetchImpl,
    env: ENV,
  });
  assert.equal(stopped.delivered, true);
  assert.equal(stopped.session.status, "confirmed");
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
  assert.equal(db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`).status, "confirmed");
});

test("callback authentication fails before Firestore lookup and hides nonexistent sessions", async () => {
  let collectionCalls = 0;
  const noLookupDb = {
    collection() {
      collectionCalls += 1;
      throw new Error("Firestore must not be queried without a callback credential.");
    },
  };
  await assert.rejects(
    capture.ingestWorkOrderScanEvent({
      db: noLookupDb,
      sessionId: SESSION_ID,
      callbackToken: "",
      body: { eventId: "scanner:1", code: "AIS17704" },
      nowMs: STARTED_AT,
    }),
    (error) => error.code === "invalid_callback_token" && error.statusCode === 401
  );
  assert.equal(collectionCalls, 0);

  await assert.rejects(
    capture.ingestWorkOrderScanEvent({
      db: new FakeDb(),
      sessionId: SESSION_ID,
      callbackToken: "c".repeat(43),
      body: { eventId: "scanner:1", code: "AIS17704" },
      nowMs: STARTED_AT,
    }),
    (error) => error.code === "invalid_callback_token" && error.statusCode === 401
  );
});

test("start validates destination, preserves scanner busy, and fails closed with released lease", async () => {
  let fetchCalls = 0;
  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db: seededDb(),
      authUser: { uid: "user-1" },
      sessionId: "short",
      workOrderId: "bad/id",
      fetchImpl: async () => {
        fetchCalls += 1;
      },
      env: ENV,
    }),
    (error) => error.code === "invalid_request" && error.statusCode === 400
  );
  assert.equal(fetchCalls, 0);

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db: new FakeDb({ "OpsWorkOrders/WO-10490": { workOrderNumber: "10490" } }),
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl: async () => bridgeResponse(201),
      env: ENV,
    }),
    (error) => error.code === "work_order_destination_missing" && error.statusCode === 409
  );

  const busyDb = seededDb({
    "StorageUnitScanControls/default": {
      activeSessionId: "other_scan_session_1234567890",
      expiresAt: new Date(STARTED_AT + 60_000),
    },
  });
  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db: busyDb,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl: async () => bridgeResponse(201),
      env: ENV,
    }),
    (error) => error.code === "scanner_busy" && error.statusCode === 409
  );

  const rejectedDb = seededDb();
  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db: rejectedDb,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl: async (url) => bridgeResponse(url.endsWith("/start") ? 409 : 200),
      env: ENV,
    }),
    (error) => error.code === "scanner_busy" && error.statusCode === 409
  );
  assert.equal(rejectedDb.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`).status, "failed");
  assert.equal(rejectedDb.records.get("StorageUnitScanControls/default").activeSessionId, null);
});

test("status polling expires the session, stops the bridge, and releases idle-page listener", async () => {
  const db = seededDb();
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return bridgeResponse(url.endsWith("/start") ? 201 : 200);
  };
  const authUser = { uid: "user-1" };
  await capture.startWorkOrderScannerCapture({
    db,
    authUser,
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    nowMs: STARTED_AT,
    fetchImpl,
    env: ENV,
  });
  const expired = await capture.getWorkOrderScannerCapture({
    db,
    authUser,
    sessionId: SESSION_ID,
    nowMs: STARTED_AT + 180_001,
    fetchImpl,
    env: ENV,
  });
  assert.equal(expired.status, "expired");
  assert.equal(expired.bridgeStopStatus, "delivered");
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
  assert.deepEqual(calls.at(-1).body, {
    schemaVersion: 1,
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    reason: "expired",
  });
});

test("activation failure always stops the exact bridge session and retries failed cleanup", async () => {
  const db = seededDb();
  const baseRunTransaction = db.runTransaction.bind(db);
  const sequence = [];
  let transactionCalls = 0;
  db.runTransaction = async (callback) => {
    transactionCalls += 1;
    sequence.push(`transaction-${transactionCalls}`);
    if (transactionCalls === 2) {
      throw new Error("activation transaction unavailable");
    }
    if (transactionCalls === 3) {
      throw new Error("first cleanup transaction unavailable");
    }
    return baseRunTransaction(callback);
  };
  const bridgeCalls = [];
  const fetchImpl = async (url, options) => {
    const body = JSON.parse(options.body);
    bridgeCalls.push({ url, body });
    sequence.push(url.endsWith("/start") ? "bridge-start" : "bridge-stop");
    return bridgeResponse(url.endsWith("/start") ? 201 : 200, {
      bridgeSessionId: "warehouse-reader:activation-failure",
    });
  };

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl,
      env: ENV,
    }),
    /activation transaction unavailable/
  );

  assert.deepEqual(
    bridgeCalls.map((call) => call.url.split("/").at(-1)),
    ["start", "stop"]
  );
  assert.deepEqual(bridgeCalls[1].body, {
    schemaVersion: 1,
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    reason: "failed",
  });
  assert.ok(
    sequence.indexOf("bridge-stop") < sequence.indexOf("transaction-4"),
    "the exact stop must still run before retrying failed Firestore cleanup"
  );
  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.status, "failed");
  assert.equal(stored.bridgeStopStatus, "delivered");
  assert.equal(stored.bridgeCompensationStatus, "delivered");
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
});

test("stop recording terminalizes a start when both earlier cleanup transactions fail", async () => {
  const db = seededDb();
  const baseRunTransaction = db.runTransaction.bind(db);
  let transactionCalls = 0;
  db.runTransaction = async (callback) => {
    transactionCalls += 1;
    if ([2, 3, 4].includes(transactionCalls)) {
      throw new Error(
        transactionCalls === 2
          ? "activation unavailable"
          : "cleanup unavailable"
      );
    }
    return baseRunTransaction(callback);
  };
  const bridgeCalls = [];
  const fetchImpl = async (url, options) => {
    bridgeCalls.push({ url, body: JSON.parse(options.body) });
    return bridgeResponse(url.endsWith("/start") ? 201 : 200, {
      bridgeSessionId: "warehouse-reader:double-cleanup-failure",
    });
  };

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl,
      env: ENV,
    }),
    /activation unavailable/
  );

  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.status, "failed");
  assert.equal(stored.bridgeStopStatus, "delivered");
  assert.equal(stored.bridgeCompensationStatus, "delivered");
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
  assert.deepEqual(
    bridgeCalls.map((call) => call.url.split("/").at(-1)),
    ["start", "stop"]
  );

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT + 1_000,
      fetchImpl,
      env: ENV,
    }),
    (error) => error.code === "session_id_conflict" && error.statusCode === 409
  );
  assert.equal(bridgeCalls.length, 2, "a failed session must not restart capture");
});

test("late start after an earlier stop records failed compensation without downgrading delivered", async () => {
  const db = seededDb();
  const fetchImpl = async (url) => {
    if (url.endsWith("/start")) {
      const sessionPath = `WorkOrderAddScanSessions/${SESSION_ID}`;
      db.write(
        sessionPath,
        {
          ...db.records.get(sessionPath),
          status: "cancelled",
          completedAt: new Date(STARTED_AT + 1_000),
          updatedAt: new Date(STARTED_AT + 1_000),
          bridgeStopStatus: "delivered",
          bridgeStoppedAt: new Date(STARTED_AT + 1_000),
        },
        { merge: false }
      );
      db.write(
        "StorageUnitScanControls/default",
        {
          activeSessionId: null,
          activeUnitId: null,
          activeTargetType: null,
          activeWorkOrderId: null,
          status: "idle",
          expiresAt: null,
          updatedAt: new Date(STARTED_AT + 1_000),
        },
        { merge: false }
      );
      return bridgeResponse(201, {
        bridgeSessionId: "warehouse-reader:late-start",
      });
    }
    return bridgeResponse(503);
  };

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl,
      env: ENV,
    }),
    (error) =>
      error.code === "scanner_bridge_rejected" && error.statusCode === 502
  );

  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.status, "cancelled");
  assert.equal(stored.bridgeStopStatus, "delivered");
  assert.equal(stored.bridgeCompensationStatus, "failed");
});

test("late failed compensation cannot downgrade delivered compensation or timestamps", async () => {
  const db = seededDb();
  const priorCompensationAt = new Date("2035-01-01T00:00:00.000Z");
  const fetchImpl = async (url) => {
    if (url.endsWith("/start")) {
      db.write(
        `WorkOrderAddScanSessions/${SESSION_ID}`,
        {
          ...db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`),
          status: "cancelled",
          completedAt: new Date(STARTED_AT + 1_000),
          updatedAt: priorCompensationAt,
          bridgeStopStatus: "delivered",
          bridgeStoppedAt: new Date(STARTED_AT + 1_000),
          bridgeCompensationStatus: "delivered",
          bridgeCompensationAt: priorCompensationAt,
        },
        { merge: false }
      );
      db.write(
        "StorageUnitScanControls/default",
        {
          activeSessionId: null,
          activeUnitId: null,
          activeTargetType: null,
          activeWorkOrderId: null,
          status: "idle",
          expiresAt: null,
          updatedAt: new Date(STARTED_AT + 1_000),
        },
        { merge: false }
      );
      return bridgeResponse(201, {
        bridgeSessionId: "warehouse-reader:late-start",
      });
    }
    return bridgeResponse(503);
  };

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl,
      env: ENV,
    }),
    (error) =>
      error.code === "scanner_bridge_rejected" && error.statusCode === 502
  );

  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.bridgeStopStatus, "delivered");
  assert.equal(stored.bridgeCompensationStatus, "delivered");
  assert.equal(
    scanSessions.timestampToMillis(stored.bridgeCompensationAt),
    priorCompensationAt.getTime()
  );
  assert.equal(
    scanSessions.timestampToMillis(stored.updatedAt),
    priorCompensationAt.getTime()
  );
});

test("activation uses the final Firestore retry result instead of leaked attempt state", async () => {
  const db = seededDb();
  const baseRunTransaction = db.runTransaction.bind(db);
  let transactionCalls = 0;
  let firstAttemptResult = null;
  db.runTransaction = async (callback) => {
    transactionCalls += 1;
    if (transactionCalls !== 2) return baseRunTransaction(callback);

    const stagedTransaction = {
      get: (reference) => reference.get(),
      set: () => {},
    };
    firstAttemptResult = await callback(stagedTransaction);
    const sessionPath = `WorkOrderAddScanSessions/${SESSION_ID}`;
    db.write(
      sessionPath,
      {
        ...db.records.get(sessionPath),
        status: "cancelled",
        completedAt: new Date(STARTED_AT + 1_000),
        updatedAt: new Date(STARTED_AT + 1_000),
        bridgeStopStatus: "pending",
      },
      { merge: false }
    );
    db.write(
      "StorageUnitScanControls/default",
      {
        activeSessionId: null,
        activeUnitId: null,
        activeTargetType: null,
        activeWorkOrderId: null,
        status: "idle",
        expiresAt: null,
      },
      { merge: false }
    );
    return baseRunTransaction(callback);
  };
  const fetchImpl = async (url) =>
    bridgeResponse(url.endsWith("/start") ? 201 : 200, {
      bridgeSessionId: "warehouse-reader:retry-race",
    });

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT,
      fetchImpl,
      env: ENV,
    }),
    (error) => error.code === "session_cancelled" && error.statusCode === 409
  );

  assert.equal(firstAttemptResult.activated, true);
  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.status, "cancelled");
  assert.equal(stored.bridgeCompensationStatus, "delivered");
});

test("an idempotent active retry revalidates a concurrent cancellation before responding", async () => {
  const db = seededDb({
    [`WorkOrderAddScanSessions/${SESSION_ID}`]: {
      schemaVersion: 1,
      workOrderId: "WO-10490",
      status: "active",
      createdBy: { uid: "user-1", email: "user@example.com" },
      createdAt: new Date(STARTED_AT),
      updatedAt: new Date(STARTED_AT + 1_000),
      expiresAt: new Date(STARTED_AT + 180_000),
      completedAt: null,
      callbackTokenHash: scanSessions.hashCallbackToken("o".repeat(43)),
      callbackTokenVersion: 1,
      eventCount: 0,
      bridgeStartStatus: "delivered",
      bridgeStopStatus: "not_requested",
    },
    "StorageUnitScanControls/default": {
      activeSessionId: SESSION_ID,
      activeUnitId: null,
      activeTargetType: "work-order-add",
      activeWorkOrderId: "WO-10490",
      status: "active",
      expiresAt: new Date(STARTED_AT + 180_000),
      updatedAt: new Date(STARTED_AT + 1_000),
    },
  });
  const baseRunTransaction = db.runTransaction.bind(db);
  let transactionCalls = 0;
  db.runTransaction = async (callback) => {
    transactionCalls += 1;
    const result = await baseRunTransaction(callback);
    if (transactionCalls === 1) {
      const cancelledAt = new Date(STARTED_AT + 2_000);
      db.write(
        `WorkOrderAddScanSessions/${SESSION_ID}`,
        {
          status: "cancelled",
          completedAt: cancelledAt,
          updatedAt: cancelledAt,
          bridgeStopStatus: "delivered",
          bridgeStoppedAt: cancelledAt,
        },
        { merge: true }
      );
      db.write(
        "StorageUnitScanControls/default",
        {
          activeSessionId: null,
          activeUnitId: null,
          activeTargetType: null,
          activeWorkOrderId: null,
          status: "idle",
          expiresAt: null,
          updatedAt: cancelledAt,
        },
        { merge: false }
      );
    }
    return result;
  };
  let bridgeCalls = 0;

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT + 1_500,
      fetchImpl: async () => {
        bridgeCalls += 1;
        return bridgeResponse(200);
      },
      env: ENV,
    }),
    (error) => error.code === "session_cancelled" && error.statusCode === 409
  );

  assert.equal(transactionCalls, 2);
  assert.equal(bridgeCalls, 0);
  assert.equal(
    db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`).status,
    "cancelled"
  );
});

test("a stale starting-session retry fails safe, releases its lock, and requires a new ID", async () => {
  const staleAt = STARTED_AT;
  const db = seededDb({
    [`WorkOrderAddScanSessions/${SESSION_ID}`]: {
      schemaVersion: 1,
      workOrderId: "WO-10490",
      status: "starting",
      createdBy: { uid: "user-1", email: "user@example.com" },
      createdAt: new Date(staleAt),
      updatedAt: new Date(staleAt),
      expiresAt: new Date(staleAt + 180_000),
      completedAt: null,
      callbackTokenHash: scanSessions.hashCallbackToken("o".repeat(43)),
      callbackTokenVersion: 1,
      eventCount: 0,
      bridgeStartStatus: "pending",
      bridgeStopStatus: "not_requested",
    },
    "StorageUnitScanControls/default": {
      activeSessionId: SESSION_ID,
      activeUnitId: null,
      activeTargetType: "work-order-add",
      activeWorkOrderId: "WO-10490",
      status: "starting",
      expiresAt: new Date(staleAt + 180_000),
      updatedAt: new Date(staleAt),
    },
  });
  const bridgeCalls = [];
  const fetchImpl = async (url, options) => {
    bridgeCalls.push({ url, body: JSON.parse(options.body) });
    return bridgeResponse(200);
  };

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: staleAt + capture.WORK_ORDER_START_STALE_AFTER_MS + 1,
      fetchImpl,
      env: ENV,
    }),
    (error) => error.code === "session_failed" && error.statusCode === 409
  );

  assert.equal(bridgeCalls.length, 1);
  assert.equal(bridgeCalls[0].url.endsWith("/stop"), true);
  assert.equal(bridgeCalls[0].body.reason, "failed");
  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.status, "failed");
  assert.equal(stored.bridgeCompensationStatus, "delivered");
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
});

test("an immediate starting-session retry fails safe because its callback token is unrecoverable", async () => {
  const db = seededDb({
    [`WorkOrderAddScanSessions/${SESSION_ID}`]: {
      schemaVersion: 1,
      workOrderId: "WO-10490",
      status: "starting",
      createdBy: { uid: "user-1", email: "user@example.com" },
      createdAt: new Date(STARTED_AT),
      updatedAt: new Date(STARTED_AT),
      expiresAt: new Date(STARTED_AT + 180_000),
      completedAt: null,
      callbackTokenHash: scanSessions.hashCallbackToken("o".repeat(43)),
      callbackTokenVersion: 1,
      eventCount: 0,
      bridgeStartStatus: "pending",
      bridgeStopStatus: "not_requested",
    },
    "StorageUnitScanControls/default": {
      activeSessionId: SESSION_ID,
      activeUnitId: null,
      activeTargetType: "work-order-add",
      activeWorkOrderId: "WO-10490",
      status: "starting",
      expiresAt: new Date(STARTED_AT + 180_000),
      updatedAt: new Date(STARTED_AT),
    },
  });
  let bridgeCalls = 0;

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT + 1_000,
      fetchImpl: async () => {
        bridgeCalls += 1;
        return bridgeResponse(200);
      },
      env: ENV,
    }),
    (error) => error.code === "session_failed" && error.statusCode === 409
  );

  assert.equal(bridgeCalls, 1);
  assert.equal(
    db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`).status,
    "failed"
  );
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
});

test("an active retry without the shared lock is stopped instead of returned as a ghost", async () => {
  const db = seededDb({
    [`WorkOrderAddScanSessions/${SESSION_ID}`]: {
      schemaVersion: 1,
      workOrderId: "WO-10490",
      status: "active",
      createdBy: { uid: "user-1", email: "user@example.com" },
      createdAt: new Date(STARTED_AT),
      updatedAt: new Date(STARTED_AT + 1_000),
      expiresAt: new Date(STARTED_AT + 180_000),
      completedAt: null,
      callbackTokenHash: scanSessions.hashCallbackToken("o".repeat(43)),
      callbackTokenVersion: 1,
      eventCount: 0,
      bridgeStartStatus: "delivered",
      bridgeStopStatus: "not_requested",
    },
    "StorageUnitScanControls/default": {
      activeSessionId: null,
      activeTargetType: null,
      activeWorkOrderId: null,
      status: "idle",
      expiresAt: null,
    },
  });
  const bridgeCalls = [];
  const fetchImpl = async (url, options) => {
    bridgeCalls.push({ url, body: JSON.parse(options.body) });
    return bridgeResponse(200);
  };

  await assert.rejects(
    capture.startWorkOrderScannerCapture({
      db,
      authUser: { uid: "user-1" },
      sessionId: SESSION_ID,
      workOrderId: "WO-10490",
      nowMs: STARTED_AT + 2_000,
      fetchImpl,
      env: ENV,
    }),
    (error) =>
      error.code === "scanner_session_orphaned" && error.statusCode === 409
  );

  assert.equal(bridgeCalls.length, 1);
  assert.equal(bridgeCalls[0].url.endsWith("/stop"), true);
  assert.equal(db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`).status, "failed");
});

test("an active retry rejects a matching but idle or expired scanner control", async () => {
  for (const control of [
    {
      status: "idle",
      expiresAt: new Date(STARTED_AT + 180_000),
    },
    {
      status: "starting",
      expiresAt: new Date(STARTED_AT + 180_000),
    },
    {
      status: "active",
      expiresAt: new Date(STARTED_AT - 1),
    },
  ]) {
    const db = seededDb({
      [`WorkOrderAddScanSessions/${SESSION_ID}`]: {
        schemaVersion: 1,
        workOrderId: "WO-10490",
        status: "active",
        createdBy: { uid: "user-1", email: "user@example.com" },
        createdAt: new Date(STARTED_AT),
        updatedAt: new Date(STARTED_AT + 1_000),
        expiresAt: new Date(STARTED_AT + 180_000),
        completedAt: null,
        callbackTokenHash: scanSessions.hashCallbackToken("o".repeat(43)),
        callbackTokenVersion: 1,
        eventCount: 0,
        bridgeStartStatus: "delivered",
        bridgeStopStatus: "not_requested",
      },
      "StorageUnitScanControls/default": {
        activeSessionId: SESSION_ID,
        activeUnitId: null,
        activeTargetType: "work-order-add",
        activeWorkOrderId: "WO-10490",
        status: control.status,
        expiresAt: control.expiresAt,
      },
    });
    let bridgeCalls = 0;

    await assert.rejects(
      capture.startWorkOrderScannerCapture({
        db,
        authUser: { uid: "user-1" },
        sessionId: SESSION_ID,
        workOrderId: "WO-10490",
        nowMs: STARTED_AT + 2_000,
        fetchImpl: async () => {
          bridgeCalls += 1;
          return bridgeResponse(200);
        },
        env: ENV,
      }),
      (error) =>
        error.code === "scanner_session_orphaned" && error.statusCode === 409
    );

    assert.equal(bridgeCalls, 1);
    assert.equal(
      db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`).status,
      "failed"
    );
    assert.equal(
      db.records.get("StorageUnitScanControls/default").activeSessionId,
      null
    );
  }
});

test("a failed repeated stop cannot downgrade an already delivered bridge stop", async () => {
  const deliveredAt = new Date(STARTED_AT + 1_000);
  const db = seededDb({
    [`WorkOrderAddScanSessions/${SESSION_ID}`]: {
      schemaVersion: 1,
      workOrderId: "WO-10490",
      status: "cancelled",
      createdBy: { uid: "user-1", email: "user@example.com" },
      createdAt: new Date(STARTED_AT),
      updatedAt: deliveredAt,
      expiresAt: new Date(STARTED_AT + 180_000),
      completedAt: deliveredAt,
      eventCount: 0,
      bridgeStartStatus: "delivered",
      bridgeStopStatus: "delivered",
      bridgeStoppedAt: deliveredAt,
    },
    "StorageUnitScanControls/default": {
      activeSessionId: null,
      activeTargetType: null,
      activeWorkOrderId: null,
      status: "idle",
    },
  });

  const stopped = await capture.stopWorkOrderScannerCapture({
    db,
    authUser: { uid: "user-1" },
    sessionId: SESSION_ID,
    workOrderId: "WO-10490",
    reason: "cancelled",
    nowMs: STARTED_AT + 2_000,
    fetchImpl: async () => bridgeResponse(503),
    env: ENV,
  });

  assert.equal(stopped.delivered, true);
  assert.equal(stopped.attemptDelivered, false);
  assert.equal(stopped.attemptStatus, 503);
  assert.equal(stopped.status, 503);
  assert.equal(stopped.committed, true);
  assert.equal(stopped.session.bridgeStopStatus, "delivered");
  const stored = db.records.get(`WorkOrderAddScanSessions/${SESSION_ID}`);
  assert.equal(stored.bridgeStopStatus, "delivered");
  assert.equal(
    scanSessions.timestampToMillis(stored.bridgeStoppedAt),
    deliveredAt.getTime()
  );
});
