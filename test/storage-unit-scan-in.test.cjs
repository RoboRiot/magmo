const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const scanIn = require("../lib/inventory/storageUnitScanIn.cjs");

const VALID_SESSION_ID = "session_12345678901234567890";

function jsonResponse(status, payload) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return payload;
    },
  };
}

test("scan-session identifiers and statuses are strict at the client boundary", () => {
  assert.equal(scanIn.cleanSessionId(VALID_SESSION_ID), VALID_SESSION_ID);
  assert.equal(scanIn.cleanSessionId("short"), "");
  assert.equal(scanIn.cleanSessionId("../session_12345678901234567890"), "");
  assert.equal(scanIn.cleanEventId("event:47-abc_1.2"), "event:47-abc_1.2");
  assert.equal(scanIn.cleanEventId("../event"), "");
  assert.equal(scanIn.normalizeSessionStatus("open"), "active");
  assert.equal(scanIn.normalizeSessionStatus("timed-out"), "expired");
  assert.equal(scanIn.normalizeSessionStatus("unexpected-server-value"), "error");
});

test("session payloads normalize without exposing or requiring callback secrets", () => {
  const snapshot = scanIn.normalizeSessionSnapshot({
    session: {
      id: VALID_SESSION_ID,
      status: "scanning",
      expiresAt: "2026-08-27T20:00:00.000Z",
      pollAfterMs: 25,
    },
    events: [
      { eventId: "event-1", code: " b-0047 ", scannedAt: "now" },
    ],
    callbackSecret: "must-not-be-used-by-the-browser",
  });
  assert.equal(snapshot.sessionId, VALID_SESSION_ID);
  assert.equal(snapshot.status, "active");
  assert.equal(snapshot.pollAfterMs, scanIn.MIN_POLL_AFTER_MS);
  assert.equal(snapshot.events[0].eventId, "event-1");
  assert.equal(snapshot.events[0].code, "b-0047");
  assert.equal(Object.hasOwn(snapshot, "callbackSecret"), false);
  assert.equal(
    scanIn.normalizeScanEvent({ eventId: "event-2", code: "bad", status: "invalid" }).status,
    "error"
  );
});

test("scans distinguish items, bins, pallets, and unsafe values", () => {
  assert.deepEqual(scanIn.classifyScannedCode("b-0047"), {
    code: "b-0047",
    kind: "bin",
    canonicalId: "B47",
  });
  assert.equal(scanIn.classifyScannedCode("AIS17704").kind, "item");
  assert.equal(scanIn.classifyScannedCode("P65").kind, "pallet");
  assert.equal(scanIn.classifyScannedCode("../B47").kind, "invalid");
  assert.equal(scanIn.classifyScannedCode("B0").kind, "invalid");
});

test("target rules allow pallet item/bin staging but bins accept items only", () => {
  const item = { eventId: "event-item", status: "ready", kind: "item" };
  const bin = { eventId: "event-bin", status: "ready", kind: "bin" };
  assert.equal(scanIn.validateResolvedRowForTarget(item, "bin").allowed, true);
  assert.equal(scanIn.validateResolvedRowForTarget(item, "pallet").allowed, true);
  assert.equal(scanIn.validateResolvedRowForTarget(bin, "pallet").allowed, true);
  assert.equal(scanIn.validateResolvedRowForTarget(bin, "bin").allowed, false);
  assert.deepEqual(scanIn.getConfirmableEventIds([], "pallet"), []);
  assert.deepEqual(
    scanIn.getConfirmableEventIds([item, bin], "pallet"),
    ["event-item", "event-bin"]
  );
  assert.deepEqual(scanIn.getConfirmableEventIds([item, bin], "bin"), []);
});

test("repeated resolved targets remain visible but only the earliest is confirmable", () => {
  const first = {
    eventId: "event-first",
    rowKey: "event-first",
    code: "AIS17704",
    canonicalId: "AIS17704",
    kind: "item",
    status: "ready",
  };
  const repeated = {
    ...first,
    eventId: "event-repeat",
    rowKey: "event-repeat",
  };
  const marked = scanIn.markRepeatedResolvedTargets([first, repeated]);
  assert.equal(marked.length, 2);
  assert.equal(marked[0].status, "ready");
  assert.equal(marked[1].status, "duplicate");
  assert.deepEqual(scanIn.getConfirmableEventIds(marked, "pallet"), []);
  assert.equal(scanIn.markRepeatedResolvedTargets([repeated])[0].status, "ready");
});

test("scan client uses the isolated authenticated start/read/cancel/confirm contract", async () => {
  const requests = [];
  const client = scanIn.createStorageUnitScanInClient({
    getIdToken: async () => "firebase-token",
    fetchImpl: async (url, options) => {
      requests.push({ url, options });
      return jsonResponse(200, { ok: true, sessionId: VALID_SESSION_ID });
    },
  });

  await client.start("b-0047");
  await client.read(VALID_SESSION_ID);
  await client.cancel(VALID_SESSION_ID);
  await client.confirm(VALID_SESSION_ID, ["event-1", "event-2", "event-1"]);

  assert.deepEqual(
    requests.map((request) => [request.url, request.options.method]),
    [
      ["/api/storage-units/scan-sessions", "POST"],
      [`/api/storage-units/scan-sessions/${VALID_SESSION_ID}`, "GET"],
      [`/api/storage-units/scan-sessions/${VALID_SESSION_ID}/cancel`, "POST"],
      [`/api/storage-units/scan-sessions/${VALID_SESSION_ID}/confirm`, "POST"],
    ]
  );
  requests.forEach((request) => {
    assert.equal(request.options.headers.Authorization, "Bearer firebase-token");
  });
  assert.deepEqual(JSON.parse(requests[0].options.body), { unitId: "B47" });
  assert.deepEqual(JSON.parse(requests[2].options.body), {});
  assert.deepEqual(JSON.parse(requests[3].options.body), {
    eventIds: ["event-1", "event-2"],
  });
});

test("invalid sessions and empty confirmation are rejected before fetch", async () => {
  let requestCount = 0;
  const client = scanIn.createStorageUnitScanInClient({
    getIdToken: async () => "firebase-token",
    fetchImpl: async () => {
      requestCount += 1;
      return jsonResponse(200, { ok: true });
    },
  });

  await assert.rejects(() => client.read("../unsafe"), /session ID is invalid/i);
  await assert.rejects(
    () => client.confirm(VALID_SESSION_ID, []),
    /at least one staged scan/i
  );
  assert.equal(requestCount, 0);
});

test("modal stages read-only previews and confirms immutable event IDs once", () => {
  const componentSource = fs.readFileSync(
    path.join(__dirname, "..", "components", "StorageUnitScanInModal.js"),
    "utf8"
  );
  const pageSource = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "pages",
      "NewSearch",
      "inventory",
      "storage",
      "[id].js"
    ),
    "utf8"
  );

  assert.match(componentSource, /setRows\(\[\]\)/);
  assert.match(componentSource, /excludedEventIdsRef/);
  assert.match(componentSource, /client\.confirm\(run\.sessionId, eventIds\)/);
  assert.match(componentSource, /confirmingRef\.current/);
  assert.doesNotMatch(componentSource, /\.set\s*\(/);
  assert.doesNotMatch(componentSource, /\.update\s*\(/);
  assert.match(pageSource, />\s*Scan In\s*</);
  assert.match(pageSource, /setContentRevision\(\(value\) => value \+ 1\)/);
});
