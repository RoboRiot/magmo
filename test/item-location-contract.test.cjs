const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const fixture = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "fixtures", "item-location-six-records.json"),
    "utf8"
  )
);
const {
  AUTHORITATIVE_BRANCH_OVERRIDES,
  BRANCHES,
  applyAssociationPatchToEncodedRecord,
  applyMachineBacklinkPlanToEncodedMachine,
  buildLocationIndexes,
  buildTrailerLocationIntervals,
  calculateMachineBacklinks,
  classifyDocumentState,
  computePlanHash,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  extractBranchAssociation,
  itemEffectiveTimestampCandidates,
  machineStructuralFingerprint,
  planItemLocation,
  resolveHistoricalTrailerClient,
  sha256Value,
  validateItemLocationPreimage,
} = require("../lib/inventory/itemLocationContract.cjs");

test("migration reads the CurrentClient legacy client reference", () => {
  assert.ok(BRANCHES.current.legacyClientRefs.includes("CurrentClient"));
});

function fixtureIndexes(overrides = {}) {
  return buildLocationIndexes({
    clients: overrides.clients || fixture.clients,
    machines: overrides.machines || fixture.machines,
    trailers: overrides.trailers || fixture.trailers,
  });
}

function planFixtureItem(id, indexes = fixtureIndexes()) {
  const item = fixture.items.find((entry) => entry.id === id);
  assert.ok(item, `fixture ${id} exists`);
  return planItemLocation({ ...item, indexes });
}

test("contains the six audited branch overrides", () => {
  assert.deepEqual(Object.keys(AUTHORITATIVE_BRANCH_OVERRIDES).sort(), [
    "AIS17704",
    "AIS29317",
    "AIS37398",
    "AIS63114",
    "AIS75587",
    "AIS86861",
  ]);
});

test("resolves all five AIS23 From branches to the historical Lake Forest client", () => {
  for (const id of ["AIS17704", "AIS29317", "AIS37398", "AIS75587", "AIS86861"]) {
    const plan = planFixtureItem(id);
    assert.equal(plan.status, "change", id);
    const from = plan.branches.find((entry) => entry.branch === "from");
    assert.equal(from.status, "change", id);
    assert.equal(from.confidence, "high", id);
    assert.deepEqual(
      {
        associationType: from.after.associationType,
        clientId: from.after.clientId,
        trailerId: from.after.trailerId,
        machineId: from.after.machineId,
      },
      {
        associationType: "trailer",
        clientId: "AIS17182",
        trailerId: "AIS23",
        machineId: "AIS15216",
      },
      id
    );
    assert.equal(from.evidence.selectedTimestamp.source, "selectionHistory[0].movementDate");
    assert.equal(from.evidence.selectedTimestamp.iso, "2026-08-26");
    assert.equal(from.evidence.historical.interval.source, "currentLocation");
    assert.equal(from.evidence.historical.interval.arrivalDate, "2026-08-20");
    assert.equal(plan.patch.setReferences.ClientFrom, "Client/AIS17182");
    assert.equal(plan.patch.setReferences.TrailerFrom, "Trailers/AIS23");
    assert.equal(plan.patch.setValues.fromAssociationType, "trailer");
    assert.equal(plan.patch.setValues.associationSchemaVersion, 2);
  }
});

test("resolves AIS63114 Current to AIS24 at Reno on its 2026-08-26 movement date", () => {
  const plan = planFixtureItem("AIS63114");
  const current = plan.branches.find((entry) => entry.branch === "current");
  assert.equal(plan.status, "change");
  assert.equal(current.confidence, "high");
  assert.equal(current.after.associationType, "trailer");
  assert.equal(current.after.clientId, "AIS38562");
  assert.equal(current.after.trailerId, "AIS24");
  assert.equal(current.after.machineId, "AIS77830");
  assert.equal(current.evidence.selectedTimestamp.source, "selectionHistory[0].movementDate");
  assert.equal(current.evidence.historical.interval.arrivalDate, "2026-08-21");
  assert.equal(current.evidence.historical.interval.departureDate, "");
  assert.equal(plan.patch.setReferences.ClientCurrent, "Client/AIS38562");
  assert.equal(plan.patch.setReferences.TrailerCurrent, "Trailers/AIS24");
});

test("uses half-open trailer intervals at a same-day location boundary", () => {
  const indexes = fixtureIndexes();
  const trailer = indexes.trailerMap.get("AIS23");
  const intervals = buildTrailerLocationIntervals(trailer);
  const result = resolveHistoricalTrailerClient({
    trailer,
    effective: {
      millis: Date.parse("2026-08-20T00:00:00.000Z"),
      iso: "2026-08-20",
      precision: "date",
      source: "test",
    },
    indexes,
  });
  assert.equal(intervals.length, 2);
  assert.equal(result.status, "resolved");
  assert.equal(result.interval.source, "currentLocation");
  assert.equal(result.clientName, "SoCalWarehouse - Lake Forest");
});

test("holds overlapping historical intervals for review", () => {
  const trailers = structuredClone(fixture.trailers);
  const trailer = trailers.find((entry) => entry.id === "AIS23");
  trailer.locationHistory.push({
    clientId: "AIS38562",
    clientName: "Simonmed Imaging - Reno Eureka",
    arrivalDate: "2026-08-25",
    departureDate: "2026-08-27",
  });
  const indexes = fixtureIndexes({ trailers });
  const plan = planFixtureItem("AIS17704", indexes);
  const from = plan.branches.find((entry) => entry.branch === "from");
  assert.equal(plan.status, "review");
  assert.equal(from.status, "review");
  assert.match(from.reviewReasons.join(" "), /multiple trailer location intervals/);
  assert.deepEqual(plan.patch, { setReferences: {}, setValues: {}, deleteFields: [] });
});

test("holds an unbounded historical trailer location for review", () => {
  const trailers = structuredClone(fixture.trailers);
  const trailer = trailers.find((entry) => entry.id === "AIS23");
  trailer.locationHistory = [];
  trailer.locationCurrentArrivalDate = "";
  const indexes = fixtureIndexes({ trailers });
  const plan = planFixtureItem("AIS17704", indexes);
  const from = plan.branches.find((entry) => entry.branch === "from");
  assert.equal(from.status, "review");
  assert.match(from.reviewReasons.join(" "), /no arrival boundary/);
});

test("legacy AIS TRAILERS pseudo-client infers a unique trailer from its machine", () => {
  const indexes = fixtureIndexes();
  const plan = planItemLocation({
    id: "LEGACY-UNLISTED",
    updateTime: "2026-08-26T19:00:00.000Z",
    createTime: "2026-08-26T18:59:00.000Z",
    data: {
      name: "Unlisted PET accessory",
      ClientFrom: { path: "Client/AIS62854" },
      MachineFrom: { path: "Machine/AIS15216" },
      movementDate: "2026-08-26",
      selectionHistory: [
        {
          fromClientId: "AIS62854",
          fromMachineId: "AIS15216",
          fromMachineName: "Trailer AIS23 - GE PET",
          movementDate: "2026-08-26",
        },
      ],
    },
    indexes,
  });
  const from = plan.branches.find((entry) => entry.branch === "from");
  assert.equal(from.status, "change");
  assert.equal(from.after.trailerId, "AIS23");
  assert.equal(from.after.clientId, "AIS17182");
  assert.ok(
    from.evidence.trailerEvidence.some(
      (entry) => entry.source === "legacy-pseudo-client-machine-reverse-link"
    )
  );
});

test("movement date outranks later saves and document update times", () => {
  const candidates = itemEffectiveTimestampCandidates(
    {
      movementDate: "2025-04-10",
      updatedAt: "2026-08-26T20:00:00.000Z",
      saveHistory: [{ savedAt: "2026-08-26T19:00:00.000Z" }],
      selectionHistory: [
        {
          fromMachineId: "M1",
          movementDate: "2025-04-09",
          savedAt: "2026-08-26T18:00:00.000Z",
        },
      ],
    },
    "from",
    { updateTime: "2026-08-26T21:00:00.000Z" },
    { machineId: "M1" }
  );
  assert.equal(candidates[0].source, "selectionHistory[0].movementDate");
  assert.equal(candidates[0].iso, "2025-04-09");
});

test("From uses the first matching provenance event while Current uses the latest", () => {
  const record = {
    selectionHistory: [
      {
        fromMachineId: "ORIGIN",
        currentMachineId: "DEST",
        movementDate: "2026-01-01",
      },
      {
        fromMachineId: "ORIGIN",
        currentMachineId: "DEST",
        movementDate: "2026-02-01",
      },
    ],
  };
  const from = itemEffectiveTimestampCandidates(
    record,
    "from",
    {},
    { machineId: "ORIGIN" }
  );
  const current = itemEffectiveTimestampCandidates(
    record,
    "current",
    {},
    { machineId: "DEST" }
  );
  assert.equal(from[0].iso, "2026-01-01");
  assert.equal(current[0].iso, "2026-02-01");
});

test("patch changes associations without replacing nonassociation item fields", () => {
  const fixtureItem = fixture.items.find((entry) => entry.id === "AIS17704");
  const plan = planFixtureItem("AIS17704");
  const after = applyAssociationPatchToEncodedRecord(fixtureItem.data, plan.patch);
  assert.deepEqual(after.nonAssociationSentinel, { keep: true, value: 17704 });
  assert.equal(after.name, fixtureItem.data.name);
  assert.deepEqual(after.selectionHistory, fixtureItem.data.selectionHistory);
  assert.equal(extractBranchAssociation(after, "from").clientId, "AIS17182");
  assert.equal(classifyDocumentState(plan, fixtureItem.data), "before");
  assert.equal(classifyDocumentState(plan, after), "after");
});

test("machine backlink delta is inverse when an item changes machines", () => {
  const delta = calculateMachineBacklinks(
    "ITEM1",
    {
      MachineFrom: { path: "Machine/OLD" },
      MachineCurrent: { path: "Machine/SAME" },
    },
    {
      MachineFrom: { path: "Machine/NEW" },
      MachineCurrent: { path: "Machine/SAME" },
    }
  );
  assert.deepEqual(delta.remove, ["OLD"]);
  assert.deepEqual(delta.add, ["NEW"]);
  assert.deepEqual(delta.unchanged, ["SAME"]);
});

test("an explicit site association clears stale machine and trailer fields", () => {
  const indexes = fixtureIndexes();
  const plan = planItemLocation({
    id: "EXPLICIT-SITE",
    updateTime: "2026-08-26T22:00:00.000Z",
    data: {
      ClientCurrent: { path: "Client/AIS17182" },
      MachineCurrent: { path: "Machine/AIS42516" },
      TrailerCurrent: { path: "Trailers/AIS23" },
      trailerCurrentId: "AIS23",
      currentAssociationType: "site",
      movementDate: "2026-08-26",
    },
    indexes,
  });
  const current = plan.branches.find((entry) => entry.branch === "current");
  assert.equal(current.after.associationType, "site");
  assert.equal(current.after.clientId, "AIS17182");
  assert.equal(current.after.machineId, "");
  assert.equal(current.after.trailerId, "");
  assert.ok(plan.patch.deleteFields.includes("MachineCurrent"));
  assert.ok(plan.patch.deleteFields.includes("TrailerCurrent"));
  assert.ok(plan.patch.deleteFields.includes("trailerCurrentId"));
});

test("reads reversed legacy association type aliases but writes the UI canonical key", () => {
  const plan = planItemLocation({
    id: "LEGACY-TYPE-KEY",
    updateTime: "2026-08-26T22:00:00.000Z",
    data: {
      ClientFrom: { path: "Client/AIS17182" },
      associationTypeFrom: "site",
      associationSchemaVersion: 1,
      movementDate: "2026-08-26",
    },
    indexes: fixtureIndexes(),
  });
  assert.equal(plan.patch.setValues.fromAssociationType, "site");
  assert.equal(plan.patch.setValues.associationSchemaVersion, 2);
  assert.ok(plan.patch.deleteFields.includes("associationTypeFrom"));
});

test("plan hashing is deterministic and covers machine preconditions", () => {
  const base = {
    format: "magmo-item-location-migration-plan",
    formatVersion: 1,
    sourceProject: "project",
    backup: { sha256: "a".repeat(64) },
    requestedItemIds: ["ITEM1"],
    machinePreconditions: [
      {
        id: "M1",
        exists: true,
        updateTime: "2026-01-01T00:00:00.000Z",
        documentFingerprint: "before",
        structuralFingerprint: "structure",
        associatedPartIds: [],
      },
    ],
    items: [],
  };
  assert.equal(computePlanHash(base), computePlanHash(structuredClone(base)));
  const changed = structuredClone(base);
  changed.machinePreconditions[0].structuralFingerprint = "changed";
  assert.notEqual(computePlanHash(base), computePlanHash(changed));
});

test("backup-compatible codec preserves special Firestore numbers", () => {
  const encoded = encodeFirestoreValue({ nan: Number.NaN, pos: Infinity, neg: -Infinity });
  assert.deepEqual(encoded, {
    nan: { __firestoreType: "number", value: "NaN" },
    pos: { __firestoreType: "number", value: "Infinity" },
    neg: { __firestoreType: "number", value: "-Infinity" },
  });
  const decoded = decodeFirestoreValue(encoded);
  assert.equal(Number.isNaN(decoded.nan), true);
  assert.equal(decoded.pos, Infinity);
  assert.equal(decoded.neg, -Infinity);
});

test("prepared preimage contract binds item update times and inverse machine states", () => {
  const beforeItem = {
    name: "Synthetic part",
    MachineFrom: { __firestoreType: "reference", path: "Machine/OLD" },
    machineFromId: "OLD",
    fromAssociationType: "machine",
    associationSchemaVersion: 2,
    nonAssociationSentinel: { keep: true },
  };
  const patch = {
    setReferences: { MachineFrom: "Machine/NEW" },
    setValues: { machineFromId: "NEW" },
    deleteFields: [],
  };
  const afterItem = applyAssociationPatchToEncodedRecord(beforeItem, patch);
  const planItem = {
    id: "ITEM1",
    status: "change",
    updateTime: "2026-08-26T22:00:00.000Z",
    beforeDocumentFingerprint: documentFingerprint(beforeItem),
    afterDocumentFingerprint: documentFingerprint(afterItem),
    patch,
    machineBacklinks: { add: ["NEW"], remove: ["OLD"], unchanged: [], itemId: "ITEM1" },
    branches: [],
  };
  const machineData = {
    OLD: {
      name: "Old machine",
      associatedParts: [{ __firestoreType: "reference", path: "Test/ITEM1" }],
    },
    NEW: { name: "New machine", associatedParts: [] },
  };
  const machinePreconditions = ["NEW", "OLD"].map((id) => ({
    id,
    exists: true,
    updateTime: `2026-08-26T22:00:0${id === "NEW" ? 1 : 2}.000Z`,
    documentFingerprint: documentFingerprint(machineData[id]),
    structuralFingerprint: machineStructuralFingerprint(machineData[id]),
    associatedPartIds: id === "OLD" ? ["ITEM1"] : [],
  }));
  const plan = {
    format: "magmo-item-location-migration-plan",
    formatVersion: 1,
    readOnly: true,
    sourceProject: "fixture-project",
    backup: { sha256: "b".repeat(64) },
    requestedItemIds: ["ITEM1"],
    expectedApplyCount: 1,
    summary: { changeCount: 1, reviewRequiredCount: 0 },
    machinePreconditions,
    items: [planItem],
  };
  plan.planHash = computePlanHash(plan);
  const preimage = {
    format: "magmo-item-location-migration-preimage",
    formatVersion: 1,
    createdAt: "2026-08-26T22:30:00.000Z",
    sourceProject: "fixture-project",
    runId: "fixture-run",
    planHash: plan.planHash,
    backupSha256: plan.backup.sha256,
    targetCount: 1,
    machineCount: 2,
    preparationMode: "live-read-only-preflight",
    firestoreWritesPerformed: false,
    items: [
      {
        id: "ITEM1",
        path: "Test/ITEM1",
        updateTime: planItem.updateTime,
        beforeFingerprint: planItem.beforeDocumentFingerprint,
        expectedAfterFingerprint: planItem.afterDocumentFingerprint,
        data: encodeFirestoreValue(beforeItem),
      },
    ],
    machines: machinePreconditions.map((condition) => {
      const data = encodeFirestoreValue(machineData[condition.id]);
      const expectedAfter = applyMachineBacklinkPlanToEncodedMachine(
        data,
        [planItem],
        condition.id
      );
      return {
        id: condition.id,
        path: `Machine/${condition.id}`,
        exists: true,
        updateTime: condition.updateTime,
        beforeFingerprint: condition.documentFingerprint,
        expectedAfterFingerprint: sha256Value(expectedAfter),
        data,
      };
    }),
  };
  const valid = validateItemLocationPreimage({ preimage, plan, runId: "fixture-run" });
  assert.equal(valid.valid, true, valid.errors.join("; "));

  const tampered = structuredClone(preimage);
  tampered.items[0].updateTime = "2026-08-26T23:00:00.000Z";
  tampered.machines[0].data.name = "Changed after preparation";
  const invalid = validateItemLocationPreimage({
    preimage: tampered,
    plan,
    runId: "fixture-run",
  });
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join(" "), /item updateTime mismatch/);
  assert.match(invalid.errors.join(" "), /machine data fingerprint mismatch/);
});
