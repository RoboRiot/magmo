const test = require("node:test");
const assert = require("node:assert/strict");
const {
  groupTrailerRecords,
  machineIdFromRecord,
  machineTrailerIndex,
  strictClientDuplicateGroups,
  trailerIdFromRecord,
} = require("../lib/ops/trailerMigration.cjs");

test("deduplicates canonical and legacy trailer documents by AIS number and Monday board", () => {
  const groups = groupTrailerRecords([
    { id: "AIS16", name: "AIS16", mondayBoardId: "board-16", associatedMachineId: "M16" },
    { id: "board-16", mondayBoardId: "board-16", mondayBoardName: "16MR" },
    { id: "legacy-16", name: "AIS 16 - old" },
    { id: "AIS17", number: 17 },
    { id: "layout_meta" },
  ]);
  assert.equal(groups.length, 2);
  assert.equal(groups[0].canonicalId, "AIS16");
  assert.deepEqual(groups[0].sourceIds.sort(), ["AIS16", "board-16", "legacy-16"]);
  assert.deepEqual(machineTrailerIndex(groups).get("M16"), ["AIS16"]);
});

test("refuses to canonicalize a group with contradictory AIS numbers", () => {
  const [group] = groupTrailerRecords([
    { id: "AIS1", mondayBoardId: "shared" },
    { id: "AIS2", mondayBoardId: "shared" },
  ]);
  assert.equal(group.conflict, true);
  assert.equal(group.canonicalId, "");
  assert.deepEqual(group.conflictingNumbers, [1, 2]);
});

test("reads current and historical trailer-machine references", () => {
  assert.equal(machineIdFromRecord({ CurrentMachine: { id: "M2" } }), "M2");
  assert.equal(machineIdFromRecord({ MachineFrom: "Machine/M1" }, "from"), "M1");
  assert.equal(trailerIdFromRecord({ TrailerCurrent: { path: "Trailers/AIS2" } }), "AIS2");
  assert.equal(trailerIdFromRecord({ trailerFromId: "AIS1" }, "from"), "AIS1");
});

test("only proposes strict client duplicates", () => {
  const groups = strictClientDuplicateGroups([
    { id: "A", data: { name: "Example", local: "1 Main St" } },
    { id: "B", data: { name: "example", location: "1 Main St." } },
    { id: "C", data: { name: "Example", location: "2 Main St" } },
    { id: "D", data: { bluefolderLocationId: "L1" } },
    { id: "E", data: { blueFolderLocationId: "L1" } },
  ]);
  assert.equal(groups.length, 2);
  assert.deepEqual(groups.map((group) => group.clientIds), [["A", "B"], ["D", "E"]]);
});
