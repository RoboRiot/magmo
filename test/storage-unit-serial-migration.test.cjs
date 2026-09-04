"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { spawnSync } = require("node:child_process");

const {
  MUTATED_FIELDS,
  buildSerialPatch,
  buildStorageUnitSerialCode,
  buildStorageUnitSerialPlan,
  classifySerialState,
  computeSerialPlanHash,
  documentFingerprint,
  encodeFirestoreValue,
  stableStringify,
  validateStorageUnitSerialPlan,
  validateStorageUnitSerialPreimage,
  withoutMutatedFields,
} = require("../lib/inventory/storageUnitSerialMigration.cjs");

test("serial migration exports the journal comparison serializer", () => {
  assert.equal(stableStringify({ b: 2, a: 1 }), '{"a":1,"b":2}');
});

const BACKUP_SHA = "b".repeat(64);
const CREATED_AT = "2026-09-04T16:00:00.000Z";

function storageData(id, extras = {}) {
  const kind = id.startsWith("B") ? "bin" : "pallet";
  const number = Number(id.slice(1));
  return {
    schemaVersion: 1,
    code: id,
    serialCode: id,
    kind,
    number,
    displayNumber: String(number),
    name: `${kind === "bin" ? "Bin" : "Pallet"} ${number}`,
    warehouseLocation: {
      region: "F",
      section: { letter: "E", number: "14" },
    },
    parentPalletId: kind === "bin" ? "P1" : null,
    photoStoragePrefix: `StorageUnits/${id}`,
    ...extras,
  };
}

function records() {
  return ["B1", "B2", "P1"].map((id, index) => ({
    id,
    updateTime: `2026-09-04T16:00:0${index}.000Z`,
    data: storageData(id),
  }));
}

function items() {
  return [
    {
      id: "AIS17704",
      updateTime: "2026-09-04T16:01:00.000Z",
      data: {
        localSN: "AIS17704",
        name: "Pellet",
        newLocalCurrent: {
          bin: 1,
          pallet: 1,
          region: "F",
          section: { letter: "E", number: "14" },
        },
      },
    },
  ];
}

function buildPlan(overrides = {}) {
  return buildStorageUnitSerialPlan({
    sourceProject: "magmo-ac10c",
    backup: {
      createdAt: CREATED_AT,
      documentCount: 100,
      bytes: 12345,
      sha256: BACKUP_SHA,
      verified: true,
    },
    warehouseDirectory: { Bin: 2, Pallet: 1, Region: ["F"] },
    warehouseDirectoryUpdateTime: "2026-09-04T15:59:00.000Z",
    storageUnits: overrides.storageUnits || records(),
    items: overrides.items || items(),
    expectedCount: 3,
  });
}

test("five-digit bin and pallet serials preserve canonical aliases", () => {
  assert.equal(buildStorageUnitSerialCode("B65"), "AIS-B00065");
  assert.equal(buildStorageUnitSerialCode("P102"), "AIS-P00102");
  assert.deepEqual(
    buildSerialPatch("B65", {
      scannerAliases: ["legacy-bin-65", "b65", "AIS-B00065"],
    }),
    {
      serialCode: "AIS-B00065",
      scannerAliases: ["B65", "AIS-B00065", "legacy-bin-65"],
    }
  );
  for (const invalid of ["", "b65", "B0", "B00065", "P100000", "AIS-B00065"]) {
    assert.throws(() => buildStorageUnitSerialCode(invalid), /canonical|between/i, invalid);
  }
});

test("plan changes only serialCode/scannerAliases and fingerprints every protected field", () => {
  const source = records();
  const plan = buildPlan({ storageUnits: source });
  assert.equal(plan.expectedUnitCount, 3);
  assert.equal(plan.expectedWriteCount, 3);
  assert.deepEqual(plan.mutationAllowlist, [...MUTATED_FIELDS]);
  assert.equal(plan.itemIdentityCollisionCount, 0);
  assert.equal(plan.planHash, computeSerialPlanHash(plan));

  for (const unit of plan.units) {
    const before = source.find((entry) => entry.id === unit.id).data;
    const after = { ...before, ...unit.patch };
    assert.equal(
      documentFingerprint(withoutMutatedFields(before)),
      documentFingerprint(withoutMutatedFields(after))
    );
    assert.equal(unit.beforeFingerprint, documentFingerprint(before));
    assert.equal(unit.afterFingerprint, documentFingerprint(after));
    assert.deepEqual(Object.keys(unit.patch).sort(), [...MUTATED_FIELDS].sort());
    assert.equal(classifySerialState(unit, { exists: true, data: before }), "before");
    assert.equal(classifySerialState(unit, { exists: true, data: after }), "after");
  }

  const validation = validateStorageUnitSerialPlan(plan, {
    sourceProject: "magmo-ac10c",
    backupSha256: BACKUP_SHA,
    planHash: plan.planHash,
    expectedCount: 3,
  });
  assert.equal(validation.valid, true, validation.errors.join("; "));

  const overbroad = structuredClone(plan);
  overbroad.units[0].patch.warehouseLocation = {
    region: "X",
    section: { letter: "X", number: "99" },
  };
  overbroad.planHash = computeSerialPlanHash(overbroad);
  const rejected = validateStorageUnitSerialPlan(overbroad, {
    sourceProject: "magmo-ac10c",
    backupSha256: BACKUP_SHA,
    planHash: overbroad.planHash,
    expectedCount: 3,
  });
  assert.equal(rejected.valid, false);
  assert.match(rejected.errors.join(" "), /mutation allowlist/i);
});

test("plan refuses item identity collisions and noncontiguous storage records", () => {
  assert.throws(
    () =>
      buildPlan({
        items: [
          {
            id: "ordinary-item",
            updateTime: "2026-09-04T16:01:00.000Z",
            data: { localSN: "AIS-B00001" },
          },
        ],
      }),
    /collide/i
  );

  const missing = records().filter((entry) => entry.id !== "B2");
  assert.throws(() => buildPlan({ storageUnits: missing }), /contains 2|expectedCount/i);

  const mismatched = records();
  mismatched[0] = { ...mismatched[0], data: storageData("B1", { number: 2 }) };
  assert.throws(() => buildPlan({ storageUnits: mismatched }), /number does not match/i);
});

test("exact preimage validates and detects protected-data tampering", () => {
  const source = records();
  const plan = buildPlan({ storageUnits: source });
  const preimage = {
    format: "magmo-storage-unit-serial-alias-preimage",
    formatVersion: 1,
    createdAt: "2026-09-04T16:02:00.000Z",
    sourceProject: "magmo-ac10c",
    targetCollection: "StorageUnits",
    mutationAllowlist: [...MUTATED_FIELDS],
    runId: "storage-unit-serial-test",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    targetCount: 3,
    preparationMode: "live-read-only-preflight",
    firestoreWritesPerformed: false,
    testWritesPerformed: 0,
    testInvariant: plan.testInvariant,
    units: plan.units.map((unit) => {
      const record = source.find((entry) => entry.id === unit.id);
      return {
        id: unit.id,
        path: unit.path,
        exists: true,
        updateTime: record.updateTime,
        beforeFingerprint: unit.beforeFingerprint,
        expectedAfterFingerprint: unit.afterFingerprint,
        data: encodeFirestoreValue(record.data),
      };
    }),
  };
  const valid = validateStorageUnitSerialPreimage({
    preimage,
    plan,
    sourceProject: "magmo-ac10c",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    runId: "storage-unit-serial-test",
    expectedCount: 3,
  });
  assert.equal(valid.valid, true, valid.errors.join("; "));

  const tampered = structuredClone(preimage);
  tampered.units[0].data.warehouseLocation.section.number = "15";
  const invalid = validateStorageUnitSerialPreimage({
    preimage: tampered,
    plan,
    sourceProject: "magmo-ac10c",
    planHash: plan.planHash,
    backupSha256: BACKUP_SHA,
    runId: "storage-unit-serial-test",
    expectedCount: 3,
  });
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join(" "), /fingerprint/i);
});

test("CLI exposes guarded modes and contains no Test write target", () => {
  const repoRoot = path.resolve(__dirname, "..");
  const scriptPath = path.join(repoRoot, "scripts", "storage-unit-serial-migration.mjs");
  const result = spawnSync(process.execPath, [scriptPath, "--help"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /plan\|preimage\|apply\|verify\|restore/);
  assert.match(result.stdout, /APPLY_STORAGE_UNIT_SERIAL_ALIASES/);
  assert.match(result.stdout, /RESTORE_STORAGE_UNIT_SERIAL_ALIASES/);

  const source = fs.readFileSync(scriptPath, "utf8");
  assert.doesNotMatch(source, /collection\(["']Test["']\)\.doc\s*\(/);
  assert.doesNotMatch(source, /transaction\.(?:set|update|delete)\([^\n]*Test/);
  assert.match(source, /transaction\.update\(unitRef, unit\.patch\)/);
  assert.match(source, /MUTATED_FIELDS/);
  assert.match(source, /testWritesPerformed:\s*0/);
  assert.match(
    source,
    /RESTORABLE_SOURCE_JOURNAL_STATUSES\s*=\s*new Set\(\[\s*"applying",\s*"incomplete",\s*"complete",/s
  );
  assert.match(
    source,
    /assertMatchingSourceJournal\(sourceJournal, \{ requireRestorable: mode === "restore" \}\)/
  );
  assert.match(source, /data\.sourceProject !== expectedProject/);
  assert.match(source, /data\.targetCollection !== STORAGE_UNIT_COLLECTION/);
  assert.match(source, /data\.runId !== runId/);
  assert.match(source, /data\.planHash !== requestedPlanHash/);
  assert.match(source, /data\.backupSha256 !== requestedBackupHash/);
  assert.match(source, /data\.preimageSha256 !== requestedPreimageHash/);
  assert.match(source, /data\.expectedUnitCount !== expectedCount/);
});

test("future storage-unit creation persists public serial and both scanner aliases", () => {
  const source = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "pages",
      "NewSearch",
      "item",
      "[id]",
      "NewLocal.js"
    ),
    "utf8"
  );
  assert.match(source, /const serialCode = buildStorageUnitSerialId\(code\)/);
  assert.match(source, /serialCode,/);
  assert.match(source, /scannerAliases:\s*\[code, serialCode\]/);
});
