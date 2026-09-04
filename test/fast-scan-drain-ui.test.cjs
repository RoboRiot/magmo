const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

function readComponent(name) {
  const filename = path.join(__dirname, "..", "components", name);
  const source = fs.readFileSync(filename, "utf8");
  babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    presets: ["next/babel"],
  });
  return source;
}

test("storage-unit confirmation drains, resolves, and then confirms fresh rows", () => {
  const source = readComponent("StorageUnitScanInModal.js");
  const drainIndex = source.indexOf('client.drain(run.sessionId, "confirmed")');
  const idleIndex = source.indexOf("run.resolutionQueue?.whenIdle()", drainIndex);
  const freshRowsIndex = source.indexOf(
    "markRepeatedResolvedTargets(rowsRef.current)",
    idleIndex
  );
  const confirmIndex = source.indexOf(
    "client.confirm(run.sessionId, freshEventIds)",
    freshRowsIndex
  );

  assert.ok(drainIndex >= 0, "storage confirmation must request a bridge drain");
  assert.ok(idleIndex > drainIndex, "storage confirmation must await queued lookups");
  assert.ok(freshRowsIndex > idleIndex, "storage confirmation must re-read staged rows");
  assert.ok(confirmIndex > freshRowsIndex, "storage confirmation must save last");
  assert.match(source, /scanner_drain_unsupported/);
  assert.match(source, /LEGACY_DRAIN_SETTLE_POLLS/);
});

test("work-order confirmation drains before stopping the scanner relay", () => {
  const source = readComponent("WorkOrderAddModal.js");
  const submitIndex = source.indexOf("const submitConfirmation");
  const drainIndex = source.indexOf(
    'await drainScannerCapture(capture, "confirmed")',
    submitIndex
  );
  const stopIndex = source.indexOf(
    'await stopScannerCapture("confirmed", { capture })',
    drainIndex
  );
  const saveIndex = source.indexOf(
    'authenticatedRequest("/api/items/work-order-add/confirm"',
    stopIndex
  );

  assert.ok(drainIndex > submitIndex, "work-order confirmation must drain first");
  assert.ok(stopIndex > drainIndex, "the relay must stop only after drain");
  assert.ok(saveIndex > stopIndex, "the work-order movement must save last");
  assert.match(source, /scannerResolutionQueueRef\.current\?\.whenIdle\(\)/);
  assert.match(source, /forceAfterCurrent: true/);
  assert.match(source, /scanner_drain_unsupported/);
  assert.match(source, /concurrency: 3/);
});
