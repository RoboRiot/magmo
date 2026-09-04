const assert = require("node:assert/strict");
const test = require("node:test");

const scanSessions = require("../lib/inventory/storageUnitScanSessions.cjs");

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
      docs.sort((left, right) => {
        const leftValue = left.data()?.[this.orderField];
        const rightValue = right.data()?.[this.orderField];
        return scanSessions.timestampToMillis(leftValue) - scanSessions.timestampToMillis(rightValue);
      });
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
    this.writes = [];
  }
  collection(name) {
    return new FakeCollection(this, name);
  }
  write(path, value, options = {}) {
    const previous = this.records.get(path);
    const next = options.merge && previous
      ? { ...clone(previous), ...clone(value) }
      : clone(value);
    this.records.set(path, next);
    this.writes.push(path);
  }
  async runTransaction(callback) {
    const transaction = {
      get: (reference) => reference.get(),
      set: (reference, value, options) => this.write(reference.path, value, options),
    };
    return callback(transaction);
  }
}

function devEnv(overrides = {}) {
  return {
    NODE_ENV: "development",
    STORAGE_SCAN_ENABLED: "true",
    STORAGE_SCAN_START_URL: "http://127.0.0.1:5000/storage-scan/start",
    STORAGE_SCAN_STOP_URL: "http://127.0.0.1:5000/storage-scan/stop",
    STORAGE_SCAN_CALLBACK_BASE_URL: "http://127.0.0.1:3000",
    ...overrides,
  };
}

function jsonResponse(status, body = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body),
  };
}

test("session and event IDs are strict before they can become Firestore paths", () => {
  const credentials = scanSessions.generateSessionCredentials();
  assert.match(credentials.sessionId, scanSessions.SESSION_ID_PATTERN);
  assert.match(credentials.callbackTokenHash, /^[a-f0-9]{64}$/);
  for (const value of ["", "short", "../session", "a/b", "a\\b", "x".repeat(81)]) {
    assert.equal(scanSessions.cleanSessionId(value), "", value);
  }
  for (const value of ["", "../event", "a/b", "a\\b", ".starts-with-dot"]) {
    assert.equal(scanSessions.cleanEventId(value), "", value);
  }
  assert.equal(scanSessions.cleanEventId("scanner-1:000047"), "scanner-1:000047");
});

test("callback tokens are random, stored as hashes, and compared safely", () => {
  const first = scanSessions.generateSessionCredentials();
  const second = scanSessions.generateSessionCredentials();
  assert.notEqual(first.callbackToken, second.callbackToken);
  assert.equal(
    scanSessions.callbackTokenMatches(first.callbackToken, first.callbackTokenHash),
    true
  );
  assert.equal(
    scanSessions.callbackTokenMatches(second.callbackToken, first.callbackTokenHash),
    false
  );
  assert.equal(scanSessions.cleanCallbackToken(first.callbackToken), first.callbackToken);
  assert.equal(scanSessions.cleanCallbackToken("short"), "");
});

test("callback authentication fails before lookup and hides nonexistent sessions", async () => {
  let collectionCalls = 0;
  const noLookupDb = {
    collection() {
      collectionCalls += 1;
      throw new Error("Firestore must not be queried without a callback credential.");
    },
  };
  const baseRequest = {
    db: noLookupDb,
    sessionId: scanSessions.generateSessionCredentials().sessionId,
    callbackToken: "",
    body: { eventId: "scanner-1:47", code: "AIS17704" },
    resolveStorageScanCode: async () => ({ status: "resolved" }),
    nowMs: Date.parse("2026-08-27T18:01:00.000Z"),
  };
  await assert.rejects(
    scanSessions.ingestStorageScanEvent(baseRequest),
    (error) => error.code === "invalid_callback_token" && error.statusCode === 401
  );
  assert.equal(collectionCalls, 0);

  const missingDb = new FakeDb();
  await assert.rejects(
    scanSessions.ingestStorageScanEvent({
      ...baseRequest,
      db: missingDb,
      callbackToken: scanSessions.generateSessionCredentials().callbackToken,
    }),
    (error) => error.code === "invalid_callback_token" && error.statusCode === 401
  );
});

test("public bridge controls fail closed without enablement, HTTPS, and a long secret", () => {
  assert.throws(
    () => scanSessions.getBridgeConfiguration("start", {}),
    (error) => error.code === "scanner_disabled"
  );
  assert.throws(
    () =>
      scanSessions.getBridgeConfiguration("start", {
        NODE_ENV: "production",
        STORAGE_SCAN_ENABLED: "true",
        STORAGE_SCAN_START_URL: "http://scanner.example/start",
      }),
    (error) => error.code === "scanner_configuration_invalid"
  );
  assert.throws(
    () =>
      scanSessions.getBridgeConfiguration("start", {
        NODE_ENV: "production",
        STORAGE_SCAN_ENABLED: "true",
        STORAGE_SCAN_START_URL: "https://scanner.example/start",
      }),
    (error) => error.code === "scanner_bridge_auth_missing"
  );
  const secure = scanSessions.getBridgeConfiguration("start", {
    NODE_ENV: "production",
    STORAGE_SCAN_ENABLED: "true",
    STORAGE_SCAN_START_URL: "https://scanner.example/start",
    STORAGE_SCAN_BRIDGE_TOKEN: "s".repeat(32),
  });
  assert.deepEqual(secure.candidates, ["https://scanner.example/start"]);
});

test("isolated test/staging environments never inherit NGROK_BASE_URL", () => {
  assert.throws(
    () =>
      scanSessions.getBridgeConfiguration("start", {
        NODE_ENV: "production",
        OPS_ENVIRONMENT: "staging",
        STORAGE_SCAN_ENABLED: "true",
        NGROK_BASE_URL: "https://production-scanner.example",
        STORAGE_SCAN_BRIDGE_TOKEN: "s".repeat(32),
      }),
    (error) => error.code === "scanner_test_configuration_invalid"
  );
  const config = scanSessions.getBridgeConfiguration("stop", {
    NODE_ENV: "production",
    OPS_ENVIRONMENT: "test",
    STORAGE_SCAN_ENABLED: "true",
    NGROK_BASE_URL: "https://production-scanner.example",
    STORAGE_SCAN_START_URL: "https://test-scanner.example/start",
    STORAGE_SCAN_STOP_URL: "https://test-scanner.example/stop",
    STORAGE_SCAN_BRIDGE_TOKEN: "t".repeat(32),
  });
  assert.deepEqual(config.candidates, ["https://test-scanner.example/stop"]);
});

test("start stores only the callback hash and sends the raw capability only to the bridge", async () => {
  const db = new FakeDb({
    "StorageUnits/B47": { code: "B47", kind: "bin", number: 47 },
  });
  const bridgeRequests = [];
  const session = await scanSessions.startStorageScanSession({
    db,
    authUser: {
      uid: "user-1",
      email: "user@advancedimagingparts.com",
    },
    rawUnitId: "B47",
    nowMs: Date.parse("2026-08-27T18:00:00.000Z"),
    env: devEnv(),
    fetchImpl: async (url, options) => {
      bridgeRequests.push({ url, options });
      return jsonResponse(200, { bridgeSessionId: "scanner-local-1" });
    },
  });

  assert.equal(session.status, "active");
  assert.equal(session.unitId, "B47");
  assert.equal("callbackToken" in session, false);
  assert.equal("callbackTokenHash" in session, false);
  assert.equal(bridgeRequests.length, 1);
  assert.equal(bridgeRequests[0].options.redirect, "error");
  const bridgePayload = JSON.parse(bridgeRequests[0].options.body);
  assert.match(bridgePayload.callback.bearerToken, scanSessions.SESSION_ID_PATTERN);
  assert.equal(
    bridgePayload.callback.url,
    `http://127.0.0.1:3000/api/storage-units/scan-sessions/${session.id}/events`
  );
  const stored = db.records.get(`StorageUnitScanSessions/${session.id}`);
  assert.equal(stored.callbackToken, undefined);
  assert.match(stored.callbackTokenHash, /^[a-f0-9]{64}$/);
  assert.equal(
    scanSessions.callbackTokenMatches(
      bridgePayload.callback.bearerToken,
      stored.callbackTokenHash
    ),
    true
  );
  assert.deepEqual(
    Array.from(new Set(db.writes.map((path) => path.split("/")[0]))).sort(),
    ["StorageUnitScanControls", "StorageUnitScanSessions"]
  );
});

test("event ingest stays fast, then owner resolution is read-only and idempotent", async () => {
  const credentials = scanSessions.generateSessionCredentials();
  const sessionPath = `StorageUnitScanSessions/${credentials.sessionId}`;
  const db = new FakeDb({
    [sessionPath]: {
      unitId: "P65",
      status: "active",
      callbackTokenHash: credentials.callbackTokenHash,
      expiresAt: new Date("2026-08-27T18:05:00.000Z"),
      eventCount: 0,
      createdBy: { uid: "owner-1", email: "owner@example.com" },
    },
  });
  let resolverCalls = 0;
  const resolveStorageScanCode = async (_db, code, options) => {
    resolverCalls += 1;
    assert.equal(options.targetUnitId, "P65");
    return {
      status: "resolved",
      kind: "item",
      code,
      canonicalCode: "AIS17704",
      itemId: "AIS17704",
      preview: {
        id: "AIS17704",
        localSN: "AIS17704",
        name: "Pellet",
        pn: ["PN-1"],
        sn: ["SN-1"],
      },
      message: "Item ready to stage.",
    };
  };
  const request = {
    db,
    sessionId: credentials.sessionId,
    callbackToken: credentials.callbackToken,
    body: { eventId: "scanner-1:47", code: "AIS17704" },
    nowMs: Date.parse("2026-08-27T18:01:00.000Z"),
  };
  const first = await scanSessions.ingestStorageScanEvent(request);
  const duplicate = await scanSessions.ingestStorageScanEvent(request);
  assert.equal(first.duplicate, false);
  assert.equal(duplicate.duplicate, true);
  assert.equal(first.event.status, "received");
  assert.equal(first.event.itemId, null);
  assert.equal(resolverCalls, 0);

  const resolved = await scanSessions.resolveStorageScanEvent({
    db,
    authUser: { uid: "owner-1", email: "owner@example.com" },
    sessionId: credentials.sessionId,
    eventId: "scanner-1:47",
    resolveStorageScanCode,
    nowMs: Date.parse("2026-08-27T18:01:01.000Z"),
  });
  const resolvedAgain = await scanSessions.resolveStorageScanEvent({
    db,
    authUser: { uid: "owner-1", email: "owner@example.com" },
    sessionId: credentials.sessionId,
    eventId: "scanner-1:47",
    resolveStorageScanCode,
    nowMs: Date.parse("2026-08-27T18:01:02.000Z"),
  });
  assert.equal(resolved.duplicate, false);
  assert.equal(resolved.event.itemId, "AIS17704");
  assert.deepEqual(resolved.event.preview.pn, ["PN-1"]);
  assert.equal(resolvedAgain.duplicate, true);
  assert.equal(db.records.get(sessionPath).eventCount, 1);
  assert.equal(
    Array.from(db.records.keys()).filter((path) => path.includes("/Events/")).length,
    1
  );
  assert.equal(resolverCalls, 1);
  assert.equal(db.writes.some((path) => path.startsWith("Test/")), false);
  assert.equal(db.writes.some((path) => path.startsWith("StorageUnits/")), false);

  await assert.rejects(
    scanSessions.ingestStorageScanEvent({
      ...request,
      callbackToken: scanSessions.generateSessionCredentials().callbackToken,
    }),
    (error) => error.code === "invalid_callback_token" && error.statusCode === 401
  );
  await assert.rejects(
    scanSessions.ingestStorageScanEvent({
      ...request,
      body: { eventId: "scanner-1:47", code: "AIS99999" },
    }),
    (error) => error.code === "event_id_conflict" && error.statusCode === 409
  );
});

test("status is creator-only and never serializes callback or bridge secrets", async () => {
  const credentials = scanSessions.generateSessionCredentials();
  const db = new FakeDb({
    [`StorageUnitScanSessions/${credentials.sessionId}`]: {
      unitId: "B47",
      status: "active",
      createdBy: { uid: "owner-1", email: "owner@advancedimagingparts.com" },
      createdAt: new Date("2026-08-27T18:00:00.000Z"),
      updatedAt: new Date("2026-08-27T18:00:00.000Z"),
      expiresAt: new Date("2026-08-27T18:05:00.000Z"),
      callbackTokenHash: credentials.callbackTokenHash,
      bridgeSessionId: "private-bridge-id",
      eventCount: 0,
    },
  });
  const session = await scanSessions.getStorageScanSession({
    db,
    authUser: { uid: "owner-1" },
    sessionId: credentials.sessionId,
    nowMs: Date.parse("2026-08-27T18:01:00.000Z"),
    env: devEnv(),
  });
  const serialized = JSON.stringify(session);
  assert.equal(serialized.includes(credentials.callbackTokenHash), false);
  assert.equal(serialized.includes("private-bridge-id"), false);
  await assert.rejects(
    scanSessions.getStorageScanSession({
      db,
      authUser: { uid: "other-user" },
      sessionId: credentials.sessionId,
      nowMs: Date.parse("2026-08-27T18:01:00.000Z"),
      env: devEnv(),
    }),
    (error) => error.code === "session_not_found" && error.statusCode === 404
  );
});

test("cancel commits terminal state, releases the lock, and explicitly signals stop", async () => {
  const credentials = scanSessions.generateSessionCredentials();
  const db = new FakeDb({
    [`StorageUnitScanSessions/${credentials.sessionId}`]: {
      unitId: "P65",
      status: "active",
      createdBy: { uid: "owner-1" },
      expiresAt: new Date("2026-08-27T18:05:00.000Z"),
      eventCount: 0,
    },
    "StorageUnitScanControls/default": {
      activeSessionId: credentials.sessionId,
      activeUnitId: "P65",
      status: "active",
      expiresAt: new Date("2026-08-27T18:05:00.000Z"),
    },
  });
  const bridgeRequests = [];
  const result = await scanSessions.cancelStorageScanSession({
    db,
    authUser: { uid: "owner-1" },
    sessionId: credentials.sessionId,
    nowMs: Date.parse("2026-08-27T18:01:00.000Z"),
    env: devEnv(),
    fetchImpl: async (url, options) => {
      bridgeRequests.push({ url, options });
      return jsonResponse(200, { ok: true });
    },
  });
  assert.equal(result.session.status, "cancelled");
  assert.equal(result.stopDelivered, true);
  assert.equal(bridgeRequests.length, 1);
  assert.equal(
    JSON.parse(bridgeRequests[0].options.body).reason,
    "cancelled"
  );
  assert.equal(db.records.get("StorageUnitScanControls/default").status, "idle");
  assert.equal(db.records.get("StorageUnitScanControls/default").activeSessionId, null);
  assert.equal(db.writes.some((path) => path.startsWith("Test/")), false);
  assert.equal(db.writes.some((path) => path.startsWith("StorageUnits/")), false);
});

test("a late terminal transition cannot release a newer session's scanner lock", async () => {
  const older = scanSessions.generateSessionCredentials().sessionId;
  const newer = scanSessions.generateSessionCredentials().sessionId;
  const db = new FakeDb({
    "StorageUnitScanControls/default": {
      activeSessionId: newer,
      activeUnitId: "B48",
      status: "active",
      expiresAt: new Date("2026-08-27T18:10:00.000Z"),
    },
  });
  const controlRef = scanSessions.storageScanControlRef(db);
  await db.runTransaction(async (transaction) => {
    const controlSnapshot = await transaction.get(controlRef);
    const released = scanSessions.releaseStorageScanControl(
      transaction,
      db,
      older,
      new Date("2026-08-27T18:02:00.000Z"),
      controlSnapshot
    );
    assert.equal(released, false);
  });
  assert.equal(
    db.records.get("StorageUnitScanControls/default").activeSessionId,
    newer
  );
  assert.equal(db.writes.length, 0);
});
