"use strict";

const {
  compareTestInvariants,
  computeTestInvariant,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  sha256Value,
  stableStringify,
} = require("./storageUnitMigration.cjs");

const STORAGE_UNIT_COLLECTION = "StorageUnits";
const TEST_COLLECTION = "Test";
const SERIAL_PLAN_FORMAT = "magmo-storage-unit-serial-alias-plan";
const SERIAL_PREIMAGE_FORMAT = "magmo-storage-unit-serial-alias-preimage";
const SERIAL_MIGRATION_FORMAT_VERSION = 1;
const SERIAL_DIGITS = 5;
const MAX_STORAGE_UNIT_NUMBER = 10 ** SERIAL_DIGITS - 1;
const MUTATED_FIELDS = Object.freeze(["serialCode", "scannerAliases"]);
const ITEM_SCAN_FIELDS = Object.freeze([
  "documentId",
  "localSN",
  "local_sn",
  "sku",
  "aisNumber",
]);

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function parseCanonicalStorageUnitId(value) {
  const match = clean(value, 40).match(/^([BP])(\d+)$/);
  if (!match) return null;
  const number = Number(match[2]);
  if (
    !Number.isSafeInteger(number) ||
    number < 1 ||
    number > MAX_STORAGE_UNIT_NUMBER ||
    String(number) !== match[2]
  ) {
    return null;
  }
  const prefix = match[1];
  return {
    id: `${prefix}${number}`,
    prefix,
    kind: prefix === "B" ? "bin" : "pallet",
    number,
  };
}

function buildStorageUnitSerialCode(value) {
  const parsed = parseCanonicalStorageUnitId(value);
  if (!parsed) {
    const error = new TypeError(
      "Storage unit document IDs must be canonical B/P IDs between 1 and 99999."
    );
    error.code = "invalid_storage_unit_document_id";
    throw error;
  }
  return `AIS-${parsed.prefix}${String(parsed.number).padStart(SERIAL_DIGITS, "0")}`;
}

function uniqueAliases(values) {
  const seen = new Set();
  const aliases = [];
  for (const value of values) {
    const alias = clean(value, 200);
    const key = alias.toUpperCase();
    if (!alias || seen.has(key)) continue;
    seen.add(key);
    aliases.push(alias);
  }
  return aliases;
}

function buildSerialPatch(unitId, data = {}) {
  const serialCode = buildStorageUnitSerialCode(unitId);
  const existingAliases = Array.isArray(data.scannerAliases)
    ? data.scannerAliases
    : [];
  return {
    serialCode,
    scannerAliases: uniqueAliases([unitId, serialCode, ...existingAliases]),
  };
}

function storageUnitIdentityErrors(id, data = {}) {
  const errors = [];
  const parsed = parseCanonicalStorageUnitId(id);
  if (!parsed) return [`${id || "(missing)"}: invalid canonical document ID`];
  if (clean(data.code, 40) !== id) errors.push(`${id}: code does not match document ID`);
  const storedKind = clean(data.kind || data.type, 20).toLowerCase();
  if (storedKind !== parsed.kind) errors.push(`${id}: kind does not match document ID`);
  if (!Number.isSafeInteger(data.number) || data.number !== parsed.number) {
    errors.push(`${id}: number does not match document ID`);
  }
  return errors;
}

function withoutMutatedFields(data = {}) {
  const copy = { ...(data || {}) };
  for (const field of MUTATED_FIELDS) delete copy[field];
  return copy;
}

function serialPlanHashPayload(plan = {}) {
  const { planHash, ...payload } = plan || {};
  return payload;
}

function computeSerialPlanHash(plan = {}) {
  return sha256Value(serialPlanHashPayload(plan));
}

function expectedIdsFromDirectory(directory = {}) {
  const binCount = Number(directory.Bin);
  const palletCount = Number(directory.Pallet);
  if (!Number.isSafeInteger(binCount) || binCount < 0 || binCount > MAX_STORAGE_UNIT_NUMBER) {
    throw new Error(`Warehouse/directory Bin must be between 0 and ${MAX_STORAGE_UNIT_NUMBER}.`);
  }
  if (
    !Number.isSafeInteger(palletCount) ||
    palletCount < 0 ||
    palletCount > MAX_STORAGE_UNIT_NUMBER
  ) {
    throw new Error(
      `Warehouse/directory Pallet must be between 0 and ${MAX_STORAGE_UNIT_NUMBER}.`
    );
  }
  return {
    binCount,
    palletCount,
    ids: [
      ...Array.from({ length: binCount }, (_, index) => `B${index + 1}`),
      ...Array.from({ length: palletCount }, (_, index) => `P${index + 1}`),
    ],
  };
}

function itemScanIdentityValues(record = {}) {
  const data = record.data || {};
  const candidates = [record.id];
  for (const field of ITEM_SCAN_FIELDS.slice(1)) {
    const raw = data[field];
    if (Array.isArray(raw)) candidates.push(...raw);
    else candidates.push(raw);
  }
  return uniqueAliases(candidates).map((value) => value.toUpperCase());
}

function findItemIdentityCollisions(items = [], serialByUnitId = new Map()) {
  const unitBySerial = new Map(
    Array.from(serialByUnitId, ([unitId, serialCode]) => [
      clean(serialCode, 200).toUpperCase(),
      unitId,
    ])
  );
  const collisions = [];
  for (const item of items) {
    const data = item.data || {};
    const candidates = [
      ["documentId", item.id],
      ...ITEM_SCAN_FIELDS.slice(1).flatMap((field) => {
        const raw = data[field];
        return (Array.isArray(raw) ? raw : [raw]).map((value) => [field, value]);
      }),
    ];
    for (const [field, value] of candidates) {
      const alias = clean(value, 200).toUpperCase();
      const unitId = unitBySerial.get(alias);
      if (unitId) {
        collisions.push({
          alias,
          unitId,
          itemId: clean(item.id, 300),
          field,
        });
      }
    }
  }
  return collisions.sort((left, right) =>
    `${left.alias}|${left.itemId}|${left.field}`.localeCompare(
      `${right.alias}|${right.itemId}|${right.field}`,
      "en",
      { numeric: true }
    )
  );
}

function buildStorageUnitSerialPlan({
  sourceProject,
  backup,
  warehouseDirectory,
  warehouseDirectoryUpdateTime = "",
  storageUnits = [],
  items = [],
  expectedCount,
} = {}) {
  const project = clean(sourceProject, 300);
  if (!project) throw new Error("sourceProject is required.");
  if (backup?.verified !== true || !/^[a-f0-9]{64}$/i.test(clean(backup?.sha256, 100))) {
    throw new Error("A completed, verified backup receipt is required.");
  }
  if (!Number.isFinite(Date.parse(clean(backup?.createdAt, 100)))) {
    throw new Error("Backup createdAt is invalid.");
  }
  if (!Number.isSafeInteger(expectedCount) || expectedCount < 1) {
    throw new Error("expectedCount must be a positive integer.");
  }

  const directory = expectedIdsFromDirectory(warehouseDirectory || {});
  if (directory.ids.length !== expectedCount) {
    throw new Error(
      `Warehouse/directory declares ${directory.ids.length} units, not expectedCount=${expectedCount}.`
    );
  }
  if (storageUnits.length !== expectedCount) {
    throw new Error(
      `Backup contains ${storageUnits.length} root StorageUnits documents, not ${expectedCount}.`
    );
  }

  const byId = new Map();
  for (const record of storageUnits) {
    const id = clean(record.id, 300);
    if (byId.has(id)) throw new Error(`Duplicate ${STORAGE_UNIT_COLLECTION}/${id}.`);
    const errors = storageUnitIdentityErrors(id, record.data || {});
    if (errors.length) throw new Error(errors.join("; "));
    byId.set(id, record);
  }
  const actualIds = Array.from(byId.keys()).sort((left, right) =>
    left.localeCompare(right, "en", { numeric: true })
  );
  const expectedIds = [...directory.ids].sort((left, right) =>
    left.localeCompare(right, "en", { numeric: true })
  );
  if (stableStringify(actualIds) !== stableStringify(expectedIds)) {
    throw new Error("StorageUnits IDs are not exactly B1..Bin and P1..Pallet from Warehouse/directory.");
  }

  const serialByUnitId = new Map(
    directory.ids.map((id) => [id, buildStorageUnitSerialCode(id)])
  );
  const serialValues = Array.from(serialByUnitId.values());
  if (new Set(serialValues).size !== serialValues.length) {
    throw new Error("Generated storage-unit serial codes are not unique.");
  }
  const collisions = findItemIdentityCollisions(items, serialByUnitId);
  if (collisions.length) {
    throw new Error(
      `Generated storage-unit serials collide with ${collisions.length} Test item identities: ` +
        collisions
          .slice(0, 10)
          .map((entry) => `${entry.alias}:${entry.itemId}.${entry.field}`)
          .join(", ")
    );
  }

  const units = directory.ids.map((id) => {
    const record = byId.get(id);
    const beforeData = record.data || {};
    const patch = buildSerialPatch(id, beforeData);
    const afterData = { ...beforeData, ...patch };
    const beforeFingerprint = documentFingerprint(beforeData);
    const afterFingerprint = documentFingerprint(afterData);
    const preservedFingerprint = documentFingerprint(withoutMutatedFields(beforeData));
    if (preservedFingerprint !== documentFingerprint(withoutMutatedFields(afterData))) {
      throw new Error(`${id}: planner changed a protected field.`);
    }
    return {
      id,
      path: `${STORAGE_UNIT_COLLECTION}/${id}`,
      kind: parseCanonicalStorageUnitId(id).kind,
      number: parseCanonicalStorageUnitId(id).number,
      beforeUpdateTime: clean(record.updateTime, 100),
      beforeFingerprint,
      afterFingerprint,
      preservedFingerprint,
      operation: beforeFingerprint === afterFingerprint ? "noop" : "update",
      patch,
    };
  });
  const testInvariant = computeTestInvariant(items);
  const plan = {
    format: SERIAL_PLAN_FORMAT,
    formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
    readOnly: true,
    createdAt: clean(backup.createdAt, 100),
    sourceProject: project,
    targetCollection: STORAGE_UNIT_COLLECTION,
    mutationAllowlist: [...MUTATED_FIELDS],
    backup: {
      createdAt: clean(backup.createdAt, 100),
      documentCount: backup.documentCount,
      bytes: backup.bytes,
      sha256: clean(backup.sha256, 100).toLowerCase(),
      verified: true,
    },
    warehouseDirectory: {
      path: "Warehouse/directory",
      updateTime: clean(warehouseDirectoryUpdateTime, 100),
      fingerprint: documentFingerprint(warehouseDirectory || {}),
      binCount: directory.binCount,
      palletCount: directory.palletCount,
    },
    expectedUnitCount: expectedCount,
    expectedWriteCount: units.filter((unit) => unit.operation === "update").length,
    itemIdentityCollisionCount: 0,
    testInvariant,
    units,
  };
  plan.planHash = computeSerialPlanHash(plan);
  return plan;
}

function validateStorageUnitSerialPlan(
  plan,
  { sourceProject = "", backupSha256 = "", planHash = "", expectedCount } = {}
) {
  const errors = [];
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) {
    return { valid: false, errors: ["plan must be an object"], unitCount: 0 };
  }
  if (plan.format !== SERIAL_PLAN_FORMAT) errors.push("plan format mismatch");
  if (plan.formatVersion !== SERIAL_MIGRATION_FORMAT_VERSION) {
    errors.push("plan formatVersion mismatch");
  }
  if (plan.readOnly !== true) errors.push("plan must be marked readOnly");
  if (plan.sourceProject !== sourceProject) errors.push("plan project mismatch");
  if (plan.targetCollection !== STORAGE_UNIT_COLLECTION) errors.push("target collection mismatch");
  if (stableStringify(plan.mutationAllowlist) !== stableStringify(MUTATED_FIELDS)) {
    errors.push("mutation allowlist mismatch");
  }
  if (plan.backup?.verified !== true) errors.push("plan backup is not verified");
  if (plan.backup?.sha256 !== clean(backupSha256, 100).toLowerCase()) {
    errors.push("plan backup hash mismatch");
  }
  if (!Number.isSafeInteger(expectedCount) || plan.expectedUnitCount !== expectedCount) {
    errors.push("expected storage unit count mismatch");
  }
  if (plan.itemIdentityCollisionCount !== 0) errors.push("item identity collisions are present");
  const directory = (() => {
    try {
      return expectedIdsFromDirectory({
        Bin: plan.warehouseDirectory?.binCount,
        Pallet: plan.warehouseDirectory?.palletCount,
      });
    } catch (error) {
      errors.push(error.message);
      return { ids: [] };
    }
  })();
  const units = Array.isArray(plan.units) ? plan.units : [];
  if (units.length !== expectedCount) errors.push("plan unit count mismatch");
  if (stableStringify(units.map((unit) => unit.id)) !== stableStringify(directory.ids)) {
    errors.push("plan unit IDs/order do not match Warehouse/directory");
  }
  const serials = new Set();
  for (const unit of units) {
    const parsed = parseCanonicalStorageUnitId(unit.id);
    if (!parsed) {
      errors.push(`${unit.id}: invalid unit ID`);
      continue;
    }
    const expectedSerial = buildStorageUnitSerialCode(unit.id);
    if (unit.path !== `${STORAGE_UNIT_COLLECTION}/${unit.id}`) {
      errors.push(`${unit.id}: path mismatch`);
    }
    if (unit.kind !== parsed.kind || unit.number !== parsed.number) {
      errors.push(`${unit.id}: identity metadata mismatch`);
    }
    if (unit.patch?.serialCode !== expectedSerial) {
      errors.push(`${unit.id}: serialCode patch mismatch`);
    }
    if (
      stableStringify(Object.keys(unit.patch || {}).sort()) !==
      stableStringify([...MUTATED_FIELDS].sort())
    ) {
      errors.push(`${unit.id}: patch contains fields outside the mutation allowlist`);
    }
    const aliases = Array.isArray(unit.patch?.scannerAliases)
      ? unit.patch.scannerAliases
      : [];
    if (aliases[0] !== unit.id || aliases[1] !== expectedSerial) {
      errors.push(`${unit.id}: required scanner aliases are missing or reordered`);
    }
    if (new Set(aliases.map((value) => clean(value, 200).toUpperCase())).size !== aliases.length) {
      errors.push(`${unit.id}: scanner aliases are duplicated`);
    }
    if (serials.has(expectedSerial)) errors.push(`${unit.id}: duplicate serialCode`);
    serials.add(expectedSerial);
    for (const field of [
      "beforeFingerprint",
      "afterFingerprint",
      "preservedFingerprint",
    ]) {
      if (!/^[a-f0-9]{64}$/i.test(clean(unit[field], 100))) {
        errors.push(`${unit.id}: ${field} is invalid`);
      }
    }
    if (!["noop", "update"].includes(unit.operation)) {
      errors.push(`${unit.id}: operation is invalid`);
    }
    if (unit.operation === "noop" && unit.beforeFingerprint !== unit.afterFingerprint) {
      errors.push(`${unit.id}: noop fingerprints differ`);
    }
    if (unit.operation === "update" && unit.beforeFingerprint === unit.afterFingerprint) {
      errors.push(`${unit.id}: update fingerprints are equal`);
    }
  }
  const writes = units.filter((unit) => unit.operation === "update").length;
  if (plan.expectedWriteCount !== writes) errors.push("expected write count mismatch");
  if (!Number.isSafeInteger(plan.testInvariant?.count)) errors.push("Test invariant is missing");
  for (const field of ["aggregateDocumentFingerprint", "aggregateMembershipFingerprint"]) {
    if (!/^[a-f0-9]{64}$/i.test(clean(plan.testInvariant?.[field], 100))) {
      errors.push(`Test invariant ${field} is invalid`);
    }
  }
  const calculatedHash = computeSerialPlanHash(plan);
  if (calculatedHash !== plan.planHash || calculatedHash !== clean(planHash, 100).toLowerCase()) {
    errors.push("plan hash mismatch");
  }
  return { valid: errors.length === 0, errors, unitCount: units.length };
}

function classifySerialState(planUnit, { exists, data } = {}) {
  if (!exists) return "conflict";
  const fingerprint = documentFingerprint(data || {});
  const before = fingerprint === planUnit.beforeFingerprint;
  const after = fingerprint === planUnit.afterFingerprint;
  if (before && after) return "both";
  if (before) return "before";
  if (after) return "after";
  return "conflict";
}

function validateStorageUnitSerialPreimage({
  preimage,
  plan,
  sourceProject = plan?.sourceProject || "",
  planHash = plan?.planHash || "",
  backupSha256 = plan?.backup?.sha256 || "",
  runId = preimage?.runId || "",
  expectedCount = plan?.expectedUnitCount,
} = {}) {
  const errors = [];
  if (!preimage || typeof preimage !== "object" || Array.isArray(preimage)) {
    return { valid: false, errors: ["preimage must be an object"], unitCount: 0 };
  }
  if (preimage.format !== SERIAL_PREIMAGE_FORMAT) errors.push("preimage format mismatch");
  if (preimage.formatVersion !== SERIAL_MIGRATION_FORMAT_VERSION) {
    errors.push("preimage formatVersion mismatch");
  }
  if (preimage.sourceProject !== sourceProject) errors.push("preimage project mismatch");
  if (preimage.targetCollection !== STORAGE_UNIT_COLLECTION) errors.push("preimage target mismatch");
  if (stableStringify(preimage.mutationAllowlist) !== stableStringify(MUTATED_FIELDS)) {
    errors.push("preimage mutation allowlist mismatch");
  }
  if (preimage.runId !== runId) errors.push("preimage runId mismatch");
  if (preimage.planHash !== planHash) errors.push("preimage plan hash mismatch");
  if (preimage.backupSha256 !== backupSha256) errors.push("preimage backup hash mismatch");
  if (preimage.targetCount !== expectedCount) errors.push("preimage target count mismatch");
  if (preimage.firestoreWritesPerformed !== false || preimage.testWritesPerformed !== 0) {
    errors.push("preimage must attest zero Firestore/Test writes");
  }
  if (compareTestInvariants(plan.testInvariant, preimage.testInvariant).length) {
    errors.push("preimage Test invariant mismatch");
  }
  const units = Array.isArray(preimage.units) ? preimage.units : [];
  if (units.length !== expectedCount) errors.push("preimage unit count mismatch");
  const byId = new Map(units.map((unit) => [unit.id, unit]));
  if (byId.size !== units.length) errors.push("preimage contains duplicate unit IDs");
  for (const planUnit of plan.units || []) {
    const unit = byId.get(planUnit.id);
    if (!unit) {
      errors.push(`${planUnit.id}: preimage is missing`);
      continue;
    }
    if (unit.path !== planUnit.path) errors.push(`${planUnit.id}: preimage path mismatch`);
    if (unit.exists !== true) errors.push(`${planUnit.id}: preimage document must exist`);
    if (unit.updateTime !== planUnit.beforeUpdateTime) {
      errors.push(`${planUnit.id}: preimage updateTime mismatch`);
    }
    if (unit.beforeFingerprint !== planUnit.beforeFingerprint) {
      errors.push(`${planUnit.id}: preimage before fingerprint mismatch`);
    }
    if (unit.expectedAfterFingerprint !== planUnit.afterFingerprint) {
      errors.push(`${planUnit.id}: preimage after fingerprint mismatch`);
    }
    if (!unit.data || typeof unit.data !== "object" || Array.isArray(unit.data)) {
      errors.push(`${planUnit.id}: preimage data must be a map`);
    } else if (documentFingerprint(unit.data) !== unit.beforeFingerprint) {
      errors.push(`${planUnit.id}: preimage data fingerprint mismatch`);
    }
  }
  return { valid: errors.length === 0, errors, unitCount: units.length };
}

module.exports = {
  ITEM_SCAN_FIELDS,
  MAX_STORAGE_UNIT_NUMBER,
  MUTATED_FIELDS,
  SERIAL_DIGITS,
  SERIAL_MIGRATION_FORMAT_VERSION,
  SERIAL_PLAN_FORMAT,
  SERIAL_PREIMAGE_FORMAT,
  STORAGE_UNIT_COLLECTION,
  TEST_COLLECTION,
  buildSerialPatch,
  buildStorageUnitSerialCode,
  buildStorageUnitSerialPlan,
  classifySerialState,
  clean,
  compareTestInvariants,
  computeSerialPlanHash,
  computeTestInvariant,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  expectedIdsFromDirectory,
  findItemIdentityCollisions,
  itemScanIdentityValues,
  parseCanonicalStorageUnitId,
  serialPlanHashPayload,
  stableStringify,
  storageUnitIdentityErrors,
  validateStorageUnitSerialPlan,
  validateStorageUnitSerialPreimage,
  withoutMutatedFields,
};
