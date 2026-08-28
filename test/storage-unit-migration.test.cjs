"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const {
  BIN_COUNT,
  PALLET_COUNT,
  STORAGE_UNIT_COLLECTION,
  STORAGE_UNIT_COUNT,
  buildStorageUnitPlan,
  classifyStorageUnitState,
  compareTestInvariants,
  computeStorageUnitPlanHash,
  computeTestInvariant,
  documentFingerprint,
  expectedStorageUnitIds,
  validateStorageUnitPlan,
  validateStorageUnitPreimage,
} = require("../lib/inventory/storageUnitMigration.cjs");

const BACKUP_SHA = "a".repeat(64);
const SNAPSHOT_AT = "2026-08-28T01:36:48.350Z";

function sampleItems() {
  return [
    {
      id: "I1",
      updateTime: "2026-08-28T00:00:01.000Z",
      data: {
        name: "sentinel-one",
        arbitraryRawField: { preserve: [true, 1, "one"] },
        newLocalCurrent: {
          bin: 65,
          pallet: "65",
          region: "f",
          section: { letter: "e", number: 14 },
        },
      },
    },
    {
      id: "I2",
      updateTime: "2026-08-28T00:00:02.000Z",
      data: {
        name: "sentinel-two",
        newLocalCurrent: {
          bin: "B65",
          pallet: 65,
          region: "F",
          section: "E-14",
        },
        newLocalFrom: { bin: "65", pallet: "65" },
      },
    },
    {
      id: "I3",
      updateTime: "2026-08-28T00:00:03.000Z",
      data: {
        newLocalCurrent: {
          bin: 90,
          pallet: 45,
          region: "F",
          section: { letter: "C", number: 15 },
        },
      },
    },
    {
      id: "I4",
      updateTime: "2026-08-28T00:00:04.000Z",
      data: {
        newLocalCurrent: {
          bin: "90",
          pallet: "54",
          region: "F",
          section: { letter: "C", number: "15" },
        },
      },
    },
    {
      id: "I5",
      updateTime: "2026-08-28T00:00:05.000Z",
      data: {
        newLocalCurrent: {
          pallet: 64,
          region: "F",
          section: { letter: "E", number: 14 },
        },
      },
    },
    {
      id: "I6",
      updateTime: "2026-08-28T00:00:06.000Z",
      data: {
        newLocalCurrent: {
          pallet: "64",
          region: "F",
          section: { letter: "E", number: 13 },
        },
      },
    },
    {
      id: "I7",
      updateTime: "2026-08-28T00:00:07.000Z",
      data: {
        newLocalCurrent: {
          bin: 76,
          pallet: 0,
          region: "B",
          section: { letter: "D", number: 5 },
        },
      },
    },
    {
      id: "I8",
      updateTime: "2026-08-28T00:00:08.000Z",
      data: {
        // Legacy fallback is current containment and must remain discoverable.
        bin: "47",
        pallet: "12",
        region: "A",
        section: { letter: "A", number: 1 },
      },
    },
  ];
}

function buildPlan(overrides = {}) {
  return buildStorageUnitPlan({
    sourceProject: "magmo-ac10c",
    backup: {
      createdAt: SNAPSHOT_AT,
      documentCount: 999,
      bytes: 123456,
      sha256: BACKUP_SHA,
      verified: true,
    },
    warehouseDirectory: { Bin: BIN_COUNT, Pallet: PALLET_COUNT },
    warehouseDirectoryUpdateTime: "2026-08-27T17:29:52.103Z",
    items: overrides.items || sampleItems(),
    existingUnits: overrides.existingUnits || [],
  });
}

function unit(plan, id) {
  const result = plan.units.find((entry) => entry.id === id);
  assert.ok(result, `${id} exists`);
  return result;
}

test("targets exactly B1..B119 and P1..P102, including empty units, while excluding P0", () => {
  const ids = expectedStorageUnitIds();
  assert.equal(ids.length, 221);
  assert.deepEqual(ids.slice(0, 3), ["B1", "B2", "B3"]);
  assert.deepEqual(ids.slice(116, 121), ["B117", "B118", "B119", "P1", "P2"]);
  assert.deepEqual(ids.slice(-3), ["P100", "P101", "P102"]);
  assert.ok(!ids.includes("P0"));

  const plan = buildPlan();
  assert.equal(plan.expectedUnitCount, STORAGE_UNIT_COUNT);
  assert.equal(plan.units.length, STORAGE_UNIT_COUNT);
  assert.equal(plan.summary.binCount, BIN_COUNT);
  assert.equal(plan.summary.palletCount, PALLET_COUNT);
  assert.equal(unit(plan, "B119").desiredData.locationStatus, "unknown");
  assert.equal(unit(plan, "B119").desiredData.evidence.currentItemCount, 0);
  assert.equal(unit(plan, "P102").desiredData.evidence.currentItemCount, 0);
});

test("creates canonical UI fields and derives only unambiguous location/parent consensus", () => {
  const plan = buildPlan();
  const b65 = unit(plan, "B65").desiredData;
  assert.deepEqual(
    {
      code: b65.code,
      kind: b65.kind,
      number: b65.number,
      displayNumber: b65.displayNumber,
      name: b65.name,
      active: b65.active,
      photoStoragePrefix: b65.photoStoragePrefix,
    },
    {
      code: "B65",
      kind: "bin",
      number: 65,
      displayNumber: "65",
      name: "Bin 65",
      active: true,
      photoStoragePrefix: "StorageUnits/B65",
    }
  );
  assert.deepEqual(b65.warehouseLocation, {
    region: "F",
    section: { letter: "E", number: "14" },
  });
  assert.equal(b65.locationStatus, "confirmed");
  assert.equal(b65.parentPalletId, "P65");
  assert.equal(b65.parentStatus, "confirmed");
  assert.equal(b65.evidence.currentItemCount, 2);
  assert.equal(b65.evidence.historicalItemCount, 1);

  const b90 = unit(plan, "B90").desiredData;
  assert.deepEqual(b90.warehouseLocation, {
    region: "F",
    section: { letter: "C", number: "15" },
  });
  assert.equal(b90.parentPalletId, null);
  assert.equal(b90.parentStatus, "review_required");
  assert.deepEqual(
    b90.parentCandidates.map((candidate) => candidate.parentPalletId),
    ["P45", "P54"]
  );
  assert.ok(b90.reviewReasons.includes("conflicting_parent_pallets"));

  const p64 = unit(plan, "P64").desiredData;
  assert.equal(p64.warehouseLocation, null);
  assert.equal(p64.locationStatus, "review_required");
  assert.equal(p64.locationCandidates.length, 2);
  assert.ok(p64.reviewReasons.includes("conflicting_warehouse_locations"));
});

test("retains legacy-only current membership evidence and records P0 without creating it", () => {
  const plan = buildPlan();
  assert.equal(unit(plan, "B47").desiredData.evidence.currentItemCount, 1);
  assert.equal(unit(plan, "P12").desiredData.evidence.currentItemCount, 1);
  assert.equal(unit(plan, "B76").desiredData.parentPalletId, null);
  assert.equal(unit(plan, "B76").desiredData.evidence.excludedParentPalletZeroCount, 1);
  assert.ok(unit(plan, "B76").desiredData.reviewReasons.includes("excluded_parent_pallet_zero"));
  assert.equal(plan.summary.excludedPalletZeroReferenceCount, 1);
  assert.ok(plan.anomalies.some((entry) => entry.itemId === "I7" && entry.raw === "0"));
  assert.ok(!plan.units.some((entry) => entry.id === "P0"));
});

test("planning is deterministic and never mutates or embeds raw Test documents as writes", () => {
  const items = sampleItems();
  const before = structuredClone(items);
  const first = buildPlan({ items });
  const second = buildPlan({ items: structuredClone(items) });
  assert.deepEqual(items, before);
  assert.deepEqual(first, second);
  assert.equal(first.planHash, computeStorageUnitPlanHash(first));
  assert.equal(first.createdAt, SNAPSHOT_AT);
  assert.ok(first.units.every((entry) => entry.path.startsWith(`${STORAGE_UNIT_COLLECTION}/`)));
  assert.ok(first.units.every((entry) => entry.desiredData.migration.testDocumentsWritten === 0));
  assert.ok(!JSON.stringify(first.units).includes("arbitraryRawField"));
});

test("Test invariants detect count, membership, location, arbitrary-field, and update-time changes", () => {
  const records = sampleItems();
  const expected = computeTestInvariant(records);
  assert.deepEqual(compareTestInvariants(expected, computeTestInvariant(records)), []);

  const membershipChanged = structuredClone(records);
  membershipChanged[0].data.newLocalCurrent.bin = 66;
  assert.ok(compareTestInvariants(expected, computeTestInvariant(membershipChanged)).length > 0);

  const arbitraryChanged = structuredClone(records);
  arbitraryChanged[0].data.arbitraryRawField.preserve[1] = 2;
  assert.ok(compareTestInvariants(expected, computeTestInvariant(arbitraryChanged)).length > 0);

  const updateTimeChanged = structuredClone(records);
  updateTimeChanged[0].updateTime = "2026-08-28T00:00:09.000Z";
  assert.ok(compareTestInvariants(expected, computeTestInvariant(updateTimeChanged)).length > 0);

  assert.ok(compareTestInvariants(expected, computeTestInvariant(records.slice(1))).length > 0);
});

test("plan validator rejects tampering and enforces canonical collection/identity fields", () => {
  const plan = buildPlan();
  const valid = validateStorageUnitPlan(plan, {
    sourceProject: "magmo-ac10c",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    expectedCount: STORAGE_UNIT_COUNT,
  });
  assert.equal(valid.valid, true, valid.errors.join("; "));

  const tampered = structuredClone(plan);
  unit(tampered, "B65").desiredData.number = 66;
  const invalid = validateStorageUnitPlan(tampered, {
    sourceProject: "magmo-ac10c",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    expectedCount: STORAGE_UNIT_COUNT,
  });
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join(" "), /identity|fingerprint|hash/i);
});

test("preimage binds every unit to exact backup before state and supports create/delete or replace/restore", () => {
  const existingData = {
    code: "B1",
    oldField: { mustReturnExactly: true },
  };
  const plan = buildPlan({
    existingUnits: [
      {
        id: "B1",
        updateTime: "2026-08-27T12:00:00.000Z",
        data: existingData,
      },
    ],
  });
  assert.equal(unit(plan, "B1").operation, "replace");
  assert.equal(unit(plan, "B2").operation, "create");

  const preimage = {
    format: "magmo-storage-unit-migration-preimage",
    formatVersion: 1,
    createdAt: "2026-08-28T02:00:00.000Z",
    sourceProject: "magmo-ac10c",
    targetCollection: "StorageUnits",
    runId: "storage-test",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    targetCount: STORAGE_UNIT_COUNT,
    preparationMode: "live-read-only-preflight",
    firestoreWritesPerformed: false,
    testWritesPerformed: 0,
    testInvariant: plan.testInvariant,
    units: plan.units.map((entry) => ({
      id: entry.id,
      path: entry.path,
      exists: entry.beforeExists,
      updateTime: entry.beforeUpdateTime,
      beforeFingerprint: entry.beforeFingerprint,
      expectedAfterFingerprint: entry.desiredFingerprint,
      data: entry.beforeExists ? structuredClone(existingData) : null,
    })),
  };
  const valid = validateStorageUnitPreimage({
    preimage,
    plan,
    sourceProject: "magmo-ac10c",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    runId: "storage-test",
    expectedCount: STORAGE_UNIT_COUNT,
  });
  assert.equal(valid.valid, true, valid.errors.join("; "));

  assert.equal(
    classifyStorageUnitState(unit(plan, "B1"), { exists: true, data: existingData }),
    "before"
  );
  assert.equal(
    classifyStorageUnitState(unit(plan, "B1"), {
      exists: true,
      data: unit(plan, "B1").desiredData,
    }),
    "after"
  );
  assert.equal(classifyStorageUnitState(unit(plan, "B2"), { exists: false, data: null }), "before");
  assert.equal(
    classifyStorageUnitState(unit(plan, "B2"), {
      exists: true,
      data: unit(plan, "B2").desiredData,
    }),
    "after"
  );

  const tampered = structuredClone(preimage);
  tampered.units[0].data.oldField.mustReturnExactly = false;
  const invalid = validateStorageUnitPreimage({
    preimage: tampered,
    plan,
    sourceProject: "magmo-ac10c",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    runId: "storage-test",
    expectedCount: STORAGE_UNIT_COUNT,
  });
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join(" "), /fingerprint/i);
});

test("scripts expose safe help without credentials and contain no Test write target", () => {
  const repoRoot = path.resolve(__dirname, "..");
  for (const script of [
    "plan-storage-unit-migration.mjs",
    "apply-storage-unit-migration.mjs",
    "restore-storage-unit-migration.mjs",
  ]) {
    const result = spawnSync(process.execPath, [path.join(repoRoot, "scripts", script), "--help"], {
      cwd: repoRoot,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, `${script}: ${result.stderr}`);
    assert.match(result.stdout, /StorageUnits|storage-unit/i);
  }

  for (const script of [
    "apply-storage-unit-migration.mjs",
    "restore-storage-unit-migration.mjs",
  ]) {
    const source = fs.readFileSync(path.join(repoRoot, "scripts", script), "utf8");
    assert.doesNotMatch(source, /collection\(["']Test["']\)\.doc\s*\(/);
    assert.doesNotMatch(source, /transaction\.(?:set|update|delete)\([^\n]*Test/);
    assert.match(source, /testWritesPerformed:\s*0/);
  }
});

test("document fingerprints are stable across object key ordering", () => {
  assert.equal(
    documentFingerprint({ b: 2, a: { y: 2, x: 1 } }),
    documentFingerprint({ a: { x: 1, y: 2 }, b: 2 })
  );
});
