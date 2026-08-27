"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  bestOpsSearchTab,
  buildOpsSearchResultKey,
} = require("../lib/ops/searchTabs.cjs");

test("search selects the tab with the most matches and keeps left-most ties", () => {
  assert.equal(
    bestOpsSearchTab({ unassigned: 1, remote: 3, active: 2 }),
    "remote"
  );
  assert.equal(
    bestOpsSearchTab({ unassigned: 2, remote: 2, active: 2 }),
    "unassigned"
  );
  assert.equal(bestOpsSearchTab({}), "");
});

test("search result key changes for a new query or matching result set", () => {
  const first = buildOpsSearchResultKey("  10310 ", {
    active: [{ id: "wo-a" }, { id: "wo-b" }],
  });
  const reordered = buildOpsSearchResultKey("10310", {
    active: [{ id: "wo-b" }, { id: "wo-a" }],
  });
  const changedResults = buildOpsSearchResultKey("10310", {
    active: [{ id: "wo-a" }, { id: "wo-c" }],
  });
  const changedQuery = buildOpsSearchResultKey("10311", {
    active: [{ id: "wo-a" }, { id: "wo-b" }],
  });

  assert.equal(first, reordered, "priority/order changes are not a new result set");
  assert.notEqual(first, changedResults);
  assert.notEqual(first, changedQuery);
  assert.equal(buildOpsSearchResultKey("", {}), "");
});
