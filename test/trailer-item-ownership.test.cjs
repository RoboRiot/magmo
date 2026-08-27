const test = require("node:test");
const assert = require("node:assert/strict");

const { groupTrailerRecords } = require("../lib/ops/trailerMigration.cjs");
const {
  buildTrailerOwnershipIndexes,
  explicitTrailerTextEvidence,
  planItemTrailerOwnership,
} = require("../lib/ops/trailerItemOwnership.cjs");

function indexes() {
  return buildTrailerOwnershipIndexes(
    groupTrailerRecords([
      {
        id: "AIS14",
        name: "AIS14 - HDxt",
        associatedMachineId: "M14",
        currentClientId: "C14",
      },
      { id: "legacy trailer 14", mondayBoardName: "AIS 14" },
      { id: "AIS20", name: "AIS20", associatedMachineId: "M20" },
    ])
  );
}

test("recognizes From and For Trailer AIS[number] as branch ownership", () => {
  const evidence = explicitTrailerTextEvidence({
    notes: "From Trailer AIS14; replacement is for Trailer AIS20.",
  });
  assert.deepEqual(
    evidence.map(({ branch, number }) => ({ branch, number })),
    [
      { branch: "from", number: 14 },
      { branch: "current", number: 20 },
    ]
  );
});

test("recognizes common Trailer 46 wording while preserving direction", () => {
  const evidence = explicitTrailerTextEvidence({
    name: "Part from SimonMed Northwest Trailer 46 and replacement for Trailer 20",
  });
  assert.deepEqual(
    evidence.map(({ branch, number }) => ({ branch, number })),
    [
      { branch: "from", number: 46 },
      { branch: "current", number: 20 },
    ]
  );
});

test("uses the closest direction before a trailer mention", () => {
  const evidence = explicitTrailerTextEvidence({
    name: "Computer for VCT GOC (from Trailer 47)",
  });
  assert.deepEqual(
    evidence.map(({ branch, number }) => ({ branch, number })),
    [{ branch: "from", number: 47 }]
  );
});

test("trailer-owned branch preserves client and stores trailer plus machine", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM1",
    currentRecord: {
      name: "Coil for Trailer AIS14",
      ClientCurrent: { path: "Client/C14" },
    },
    originalRecord: { name: "Coil for Trailer AIS14" },
    ...indexes(),
  });
  assert.equal(plan.status, "change");
  assert.deepEqual(plan.patch.setReferences, {
    TrailerCurrent: "Trailers/AIS14",
    MachineCurrent: "Machine/M14",
  });
  assert.deepEqual(plan.patch.setValues, { trailerCurrentId: "AIS14" });
  assert.deepEqual(plan.patch.deleteFields, []);
});

test("preserves an existing legacy system machine while adding trailer ownership", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM-LEGACY",
    currentRecord: {
      name: "Coil for Trailer AIS14",
      ClientCurrent: { path: "Client/C14" },
      MachineCurrent: { path: "Machine/OLDER-SYSTEM" },
    },
    originalRecord: {},
    ...indexes(),
  });
  assert.equal(plan.patch.setReferences.TrailerCurrent, "Trailers/AIS14");
  assert.equal(plan.patch.setReferences.MachineCurrent, undefined);
});

test("existing client is retained on the non-trailer branch", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM2",
    currentRecord: {
      name: "Part from Trailer AIS14",
      ClientFrom: { path: "Client/C14" },
      ClientCurrent: { path: "Client/WAREHOUSE" },
    },
    originalRecord: { name: "Part from Trailer AIS14" },
    ...indexes(),
  });
  assert.deepEqual(plan.patch.deleteFields, []);
});

test("conflicting text and stored trailer evidence is held for review", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM3",
    currentRecord: {
      name: "Part for Trailer AIS20",
      TrailerCurrent: { path: "Trailers/AIS14" },
    },
    originalRecord: {},
    ...indexes(),
  });
  assert.equal(plan.status, "review");
  assert.deepEqual(plan.patch.setReferences, {});
});

test("unique trailer machine is sufficient ownership evidence", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM4",
    currentRecord: {
      ClientFrom: { path: "Client/C14" },
      MachineFrom: { path: "Machine/M14" },
    },
    originalRecord: {},
    ...indexes(),
  });
  assert.equal(plan.status, "change");
  assert.equal(plan.patch.setValues.trailerFromId, "AIS14");
  assert.deepEqual(plan.patch.deleteFields, []);
});

test("generic trailer mention is review-only when no branch is stated", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM5",
    currentRecord: { name: "Trailer AIS14 Upgrade Kit from Lathrop" },
    originalRecord: {},
    ...indexes(),
  });
  assert.equal(plan.status, "review");
  assert.deepEqual(plan.patch.setReferences, {});
});

test("directionless duplicate text does not create an opposite-branch conflict", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM6",
    currentRecord: {
      name: "Part from Trailer 14",
      notes: "Trailer 14",
    },
    originalRecord: {},
    ...indexes(),
  });
  assert.equal(plan.status, "change");
  assert.equal(plan.branches.find((branch) => branch.branch === "current").status, "none");
});

test("legacy AIS TRAILERS client without a trailer identity is held for review", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM7",
    currentRecord: { ClientCurrent: { path: "Client/AIS62854" } },
    originalRecord: {},
    ...indexes(),
  });
  assert.equal(plan.status, "review");
  assert.match(
    plan.branches.find((branch) => branch.branch === "current").reviewReasons[0],
    /no evidence identifying which trailer/
  );
});

test("reviewed item override resolves otherwise conflicting evidence", () => {
  const plan = planItemTrailerOwnership({
    id: "ITEM8",
    currentRecord: {
      name: "Part from Trailer 14",
      descriptions: [{ description: "Part from Trailer 20" }],
      ClientFrom: { path: "Client/AIS62854" },
    },
    originalRecord: {},
    reviewedOverrides: {
      ITEM8: {
        from: {
          trailerId: "AIS14",
          machineId: "REVIEWED-M14",
          reason: "latest record wins",
        },
      },
    },
    ...indexes(),
  });
  assert.equal(plan.status, "change");
  assert.equal(plan.patch.setValues.trailerFromId, "AIS14");
  assert.equal(plan.patch.setReferences.MachineFrom, "Machine/REVIEWED-M14");
});
