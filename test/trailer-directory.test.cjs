const test = require("node:test");
const assert = require("node:assert/strict");
const {
  serializeTrailerDirectory,
} = require("../lib/ops/trailerDirectory.cjs");

test("builds a canonical trailer directory with live client names and addresses", () => {
  const rows = serializeTrailerDirectory(
    [
      {
        id: "AIS14",
        name: "AIS14 - HDxt",
        currentClientId: "C1",
        associatedMachineId: "M14",
      },
      { id: "legacy-14", mondayBoardName: "AIS 14", mondayBoardId: "B14" },
      { id: "layout_meta" },
    ],
    [{ id: "C1", name: "SimonMed", local: "Las Vegas, NV" }]
  );
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "AIS14");
  assert.equal(rows[0].currentClientName, "SimonMed");
  assert.equal(rows[0].currentClientAddress, "Las Vegas, NV");
  assert.equal(rows[0].associatedMachineId, "M14");
  assert.equal(rows[0].needsReview, true);
});

test("keeps an unlinked legacy label separate from live Client DB fields", () => {
  const [row] = serializeTrailerDirectory([
    {
      id: "AIS1",
      locationCurrentName: "Old typed client",
      locationCurrentClientLocation: "Old typed address",
    },
  ]);
  assert.equal(row.currentClientId, "");
  assert.equal(row.currentClientName, "");
  assert.equal(row.currentClientAddress, "");
  assert.equal(row.legacyClientName, "Old typed client");
  assert.equal(row.legacyClientAddress, "Old typed address");
});
