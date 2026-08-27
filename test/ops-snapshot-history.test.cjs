const test = require("node:test");
const assert = require("node:assert/strict");
const { splitLatestSnapshot } = require("../lib/ops/snapshotHistory.cjs");

test("shows only the newest appended snapshot by default", () => {
  const first = { id: "first" };
  const second = { id: "second" };
  const newest = { id: "newest" };

  assert.deepEqual(splitLatestSnapshot([first, second, newest]), {
    latest: newest,
    history: [second, first],
  });
});

test("handles empty and single-snapshot histories", () => {
  assert.deepEqual(splitLatestSnapshot(), { latest: null, history: [] });
  assert.deepEqual(splitLatestSnapshot([{ id: "only" }]), {
    latest: { id: "only" },
    history: [],
  });
});
