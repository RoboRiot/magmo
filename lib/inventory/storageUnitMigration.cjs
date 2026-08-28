"use strict";

const crypto = require("node:crypto");
const {
  encodeFirestoreValue: encodeBackupFirestoreValue,
} = require("../firestoreBackupCodec.cjs");

const STORAGE_UNIT_COLLECTION = "StorageUnits";
const STORAGE_UNIT_SCHEMA_VERSION = 1;
const STORAGE_UNIT_PLAN_FORMAT = "magmo-storage-unit-migration-plan";
const STORAGE_UNIT_PREIMAGE_FORMAT = "magmo-storage-unit-migration-preimage";
const STORAGE_UNIT_FORMAT_VERSION = 1;
const BIN_COUNT = 119;
const PALLET_COUNT = 102;
const STORAGE_UNIT_COUNT = BIN_COUNT + PALLET_COUNT;

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, stableValue(value[key])])
  );
}

function stableStringify(value) {
  return JSON.stringify(stableValue(value));
}

function sha256Value(value) {
  return crypto.createHash("sha256").update(stableStringify(value)).digest("hex");
}

function encodeFirestoreValue(value) {
  return encodeBackupFirestoreValue(value);
}

function decodeFirestoreValue(value, { db, Timestamp, GeoPoint } = {}) {
  if (Array.isArray(value)) {
    return value.map((entry) => decodeFirestoreValue(entry, { db, Timestamp, GeoPoint }));
  }
  if (!value || typeof value !== "object") return value;
  if (value.__firestoreType === "reference") {
    if (!db) throw new Error("A Firestore db is required to decode references.");
    return db.doc(value.path);
  }
  if (["timestamp", "date"].includes(value.__firestoreType)) {
    if (
      value.__firestoreType === "timestamp" &&
      Timestamp &&
      typeof value.seconds === "number" &&
      typeof value.nanoseconds === "number"
    ) {
      return new Timestamp(value.seconds, value.nanoseconds);
    }
    const date = new Date(value.iso);
    if (Number.isNaN(date.getTime())) throw new Error(`Invalid timestamp ${value.iso}`);
    return Timestamp?.fromDate ? Timestamp.fromDate(date) : date;
  }
  if (value.__firestoreType === "geopoint") {
    return GeoPoint ? new GeoPoint(value.latitude, value.longitude) : value;
  }
  if (value.__firestoreType === "bytes") return Buffer.from(value.base64 || "", "base64");
  if (value.__firestoreType === "number") {
    if (value.value === "NaN") return Number.NaN;
    if (value.value === "Infinity") return Number.POSITIVE_INFINITY;
    if (value.value === "-Infinity") return Number.NEGATIVE_INFINITY;
    throw new Error(`Unsupported encoded number ${value.value}`);
  }
  if (value.__firestoreType === "undefined") return undefined;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [
      key,
      decodeFirestoreValue(nested, { db, Timestamp, GeoPoint }),
    ])
  );
}

function documentFingerprint(data) {
  return sha256Value(encodeFirestoreValue(data || {}));
}

function expectedStorageUnitIds() {
  return [
    ...Array.from({ length: BIN_COUNT }, (_, index) => `B${index + 1}`),
    ...Array.from({ length: PALLET_COUNT }, (_, index) => `P${index + 1}`),
  ];
}

function parseStorageUnitId(value, { allowZero = false } = {}) {
  const match = clean(value, 40).match(/^([BP])[\s_-]*(\d+)$/i);
  if (!match) return null;
  const number = Number(match[2]);
  if (!Number.isSafeInteger(number) || number < 0 || (!allowZero && number === 0)) {
    return null;
  }
  const prefix = match[1].toUpperCase();
  return {
    id: `${prefix}${number}`,
    prefix,
    kind: prefix === "B" ? "bin" : "pallet",
    number,
  };
}

function referenceLeaf(value) {
  if (value == null) return "";
  if (["number", "bigint", "string"].includes(typeof value)) return clean(value, 100);
  if (value.__firestoreType === "reference") {
    return clean(value.path, 500).split("/").filter(Boolean).pop() || "";
  }
  if (value.id != null) return clean(value.id, 100);
  if (value.path != null) {
    return clean(value.path, 500).split("/").filter(Boolean).pop() || "";
  }
  return "";
}

function normalizeStorageNumber(value, kind, { max } = {}) {
  const prefix = kind === "bin" ? "B" : kind === "pallet" ? "P" : "";
  if (!prefix) return null;
  const leaf = referenceLeaf(value);
  if (!leaf) return null;
  const match = leaf.match(new RegExp(`^(?:${prefix}[\\s_-]*)?(\\d+)$`, "i"));
  if (!match) return null;
  const number = Number(match[1]);
  if (!Number.isSafeInteger(number) || number <= 0) return null;
  if (Number.isSafeInteger(max) && number > max) return null;
  return number;
}

function parseSection(section) {
  if (typeof section === "string") {
    const match = clean(section, 100).match(/^([A-Za-z])\s*[- ]?\s*(\d+)$/);
    return match
      ? { letter: match[1].toUpperCase(), number: String(Number(match[2])) }
      : { letter: "", number: "" };
  }
  const letter = clean(section?.letter, 20).toUpperCase();
  const numberText = clean(section?.number, 30);
  return {
    letter: /^[A-Z]$/.test(letter) ? letter : "",
    number: /^\d+$/.test(numberText) ? String(Number(numberText)) : "",
  };
}

function normalizeWarehouseLocation(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const region = clean(value.region, 50).toUpperCase();
  const section = parseSection(
    value.section || {
      letter: value.sectionLetter || value.row,
      number: value.sectionNumber || value.col,
    }
  );
  if (!region || !section.letter || !section.number) return null;
  return { region, section };
}

function locationKey(location) {
  return location
    ? `${location.region}|${location.section.letter}|${location.section.number}`
    : "";
}

function locationFromKey(key) {
  const [region, letter, number] = clean(key, 200).split("|");
  return { region, section: { letter, number } };
}

function extractContainerEvidence(data = {}, branch = "current") {
  const localField = branch === "from" ? "newLocalFrom" : "newLocalCurrent";
  const local = data?.[localField] && typeof data[localField] === "object"
    ? data[localField]
    : {};
  const useLegacyFallback = branch === "current";
  const rawBin = local.bin ?? (useLegacyFallback ? data.bin ?? data.Bin : undefined);
  const rawPallet = local.pallet ?? (useLegacyFallback ? data.pallet ?? data.Pallet : undefined);
  const locationSource = Object.keys(local).length
    ? local
    : useLegacyFallback
      ? {
          region: data.region ?? data.Region,
          section: data.section ?? data.Section,
        }
      : {};
  return {
    rawBin,
    rawPallet,
    binNumber: normalizeStorageNumber(rawBin, "bin", { max: BIN_COUNT }),
    palletNumber: normalizeStorageNumber(rawPallet, "pallet", { max: PALLET_COUNT }),
    location: normalizeWarehouseLocation(locationSource),
    hasPartialLocation: Boolean(
      clean(locationSource?.region, 50) ||
        clean(locationSource?.section?.letter ?? locationSource?.section, 50) ||
        clean(locationSource?.section?.number, 50)
    ),
  };
}

function extractMembershipFingerprintData(data = {}) {
  const encoded = encodeFirestoreValue(data || {});
  return {
    newLocalCurrent: encoded.newLocalCurrent ?? null,
    newLocalFrom: encoded.newLocalFrom ?? null,
    bin: encoded.bin ?? null,
    pallet: encoded.pallet ?? null,
    region: encoded.region ?? null,
    section: encoded.section ?? null,
    Bin: encoded.Bin ?? null,
    Pallet: encoded.Pallet ?? null,
    Region: encoded.Region ?? null,
    Section: encoded.Section ?? null,
  };
}

function testDocumentEntry(record = {}) {
  const id = clean(record.id || referenceLeaf(record.path), 300);
  return {
    id,
    path: `Test/${id}`,
    updateTime: clean(record.updateTime, 100),
    documentFingerprint: documentFingerprint(record.data || {}),
    membershipFingerprint: sha256Value(extractMembershipFingerprintData(record.data || {})),
  };
}

function computeTestInvariant(records = []) {
  const documents = records
    .map(testDocumentEntry)
    .sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }));
  return {
    count: documents.length,
    idSetFingerprint: sha256Value(documents.map((entry) => entry.id)),
    aggregateDocumentFingerprint: sha256Value(
      documents.map(({ id, updateTime, documentFingerprint: fingerprint }) => ({
        id,
        updateTime,
        fingerprint,
      }))
    ),
    aggregateMembershipFingerprint: sha256Value(
      documents.map(({ id, membershipFingerprint: fingerprint }) => ({ id, fingerprint }))
    ),
    documents,
  };
}

function compareTestInvariants(expected = {}, actual = {}) {
  const errors = [];
  for (const field of [
    "count",
    "idSetFingerprint",
    "aggregateDocumentFingerprint",
    "aggregateMembershipFingerprint",
  ]) {
    if (actual?.[field] !== expected?.[field]) errors.push(`Test ${field} mismatch`);
  }
  const expectedDocuments = Array.isArray(expected?.documents) ? expected.documents : [];
  const actualDocuments = Array.isArray(actual?.documents) ? actual.documents : [];
  const expectedById = new Map(expectedDocuments.map((entry) => [entry.id, entry]));
  const actualById = new Map(actualDocuments.map((entry) => [entry.id, entry]));
  for (const [id, expectedEntry] of expectedById) {
    const actualEntry = actualById.get(id);
    if (!actualEntry) {
      errors.push(`Test/${id} is missing`);
      continue;
    }
    for (const field of ["path", "updateTime", "documentFingerprint", "membershipFingerprint"]) {
      if (actualEntry[field] !== expectedEntry[field]) errors.push(`Test/${id} ${field} mismatch`);
    }
  }
  for (const id of actualById.keys()) {
    if (!expectedById.has(id)) errors.push(`Test/${id} is outside the verified backup membership`);
  }
  return errors;
}

function createEvidenceAccumulator() {
  return {
    currentItemIds: new Set(),
    historicalItemIds: new Set(),
    locationCounts: new Map(),
    incompleteLocationItemIds: new Set(),
    parentCounts: new Map(),
    excludedParentPalletZeroItemIds: new Set(),
  };
}

function increment(map, key, amount = 1) {
  map.set(key, (map.get(key) || 0) + amount);
}

function hasRawValue(value) {
  return value !== null && value !== undefined && clean(referenceLeaf(value), 100) !== "";
}

function isPalletZero(value) {
  return /^P?[\s_-]*0$/i.test(referenceLeaf(value));
}

function createStorageUnitData({
  id,
  evidence,
  backupSha256,
  sourceSnapshotAt,
  warehouseDirectoryFingerprint,
}) {
  const parsed = parseStorageUnitId(id);
  if (!parsed) throw new Error(`Invalid storage unit ID ${id}`);
  const locationCandidates = Array.from(evidence.locationCounts.entries())
    .map(([key, itemCount]) => ({ warehouseLocation: locationFromKey(key), itemCount }))
    .sort((left, right) =>
      locationKey(left.warehouseLocation).localeCompare(
        locationKey(right.warehouseLocation),
        "en",
        { numeric: true }
      )
    );
  const parentCandidates = Array.from(evidence.parentCounts.entries())
    .map(([parentPalletId, itemCount]) => ({ parentPalletId, itemCount }))
    .sort((left, right) =>
      left.parentPalletId.localeCompare(right.parentPalletId, "en", { numeric: true })
    );
  const reviewReasons = [];
  if (locationCandidates.length > 1) reviewReasons.push("conflicting_warehouse_locations");
  if (evidence.incompleteLocationItemIds.size > 0) {
    reviewReasons.push("incomplete_warehouse_location_evidence");
  }
  if (parsed.kind === "bin" && parentCandidates.length > 1) {
    reviewReasons.push("conflicting_parent_pallets");
  }
  if (parsed.kind === "bin" && evidence.excludedParentPalletZeroItemIds.size > 0) {
    reviewReasons.push("excluded_parent_pallet_zero");
  }
  const warehouseLocation = locationCandidates.length === 1
    ? locationCandidates[0].warehouseLocation
    : null;
  const parentPalletId = parsed.kind === "bin" && parentCandidates.length === 1
    ? parentCandidates[0].parentPalletId
    : null;
  return {
    schemaVersion: STORAGE_UNIT_SCHEMA_VERSION,
    entityType: "storageUnit",
    code: id,
    serialCode: id,
    kind: parsed.kind,
    number: parsed.number,
    displayNumber: String(parsed.number),
    name: `${parsed.kind === "bin" ? "Bin" : "Pallet"} ${parsed.number}`,
    active: true,
    warehouseLocation,
    locationStatus: locationCandidates.length > 1
      ? "review_required"
      : warehouseLocation
        ? "confirmed"
        : "unknown",
    locationCandidates,
    parentPalletId,
    parentStatus: parsed.kind === "pallet"
      ? "not_applicable"
      : parentCandidates.length > 1
        ? "review_required"
        : parentPalletId
          ? "confirmed"
          : "none",
    parentCandidates: parsed.kind === "bin" ? parentCandidates : [],
    photoStoragePrefix: `${STORAGE_UNIT_COLLECTION}/${id}`,
    reviewRequired: reviewReasons.length > 0,
    reviewReasons,
    evidence: {
      currentItemCount: evidence.currentItemIds.size,
      historicalItemCount: evidence.historicalItemIds.size,
      completeLocationEvidenceCount: Array.from(evidence.locationCounts.values()).reduce(
        (sum, value) => sum + value,
        0
      ),
      incompleteLocationEvidenceCount: evidence.incompleteLocationItemIds.size,
      excludedParentPalletZeroCount: evidence.excludedParentPalletZeroItemIds.size,
    },
    migration: {
      source: "verified-firestore-backup",
      backupSha256,
      sourceSnapshotAt,
      warehouseDirectoryFingerprint,
      testDocumentsWritten: 0,
    },
  };
}

function buildStorageUnitPlan({
  sourceProject,
  backup,
  warehouseDirectory,
  warehouseDirectoryUpdateTime = "",
  items = [],
  existingUnits = [],
}) {
  if (warehouseDirectory?.Bin !== BIN_COUNT || warehouseDirectory?.Pallet !== PALLET_COUNT) {
    throw new Error(
      `Warehouse/directory must declare exactly Bin=${BIN_COUNT} and Pallet=${PALLET_COUNT}.`
    );
  }
  const backupSha256 = clean(backup?.sha256, 100);
  if (!/^[a-f0-9]{64}$/i.test(backupSha256)) throw new Error("Backup SHA-256 is invalid.");
  const sourceSnapshotAt = clean(backup?.createdAt, 100);
  if (!Number.isFinite(Date.parse(sourceSnapshotAt))) throw new Error("Backup createdAt is invalid.");

  const ids = expectedStorageUnitIds();
  const evidenceById = new Map(ids.map((id) => [id, createEvidenceAccumulator()]));
  const anomalies = [];
  for (const item of items) {
    const itemId = clean(item.id, 300);
    const current = extractContainerEvidence(item.data || {}, "current");
    const from = extractContainerEvidence(item.data || {}, "from");
    const currentBinId = current.binNumber ? `B${current.binNumber}` : "";
    const currentPalletId = current.palletNumber ? `P${current.palletNumber}` : "";
    const fromBinId = from.binNumber ? `B${from.binNumber}` : "";
    const fromPalletId = from.palletNumber ? `P${from.palletNumber}` : "";

    if (hasRawValue(current.rawBin) && !currentBinId) {
      anomalies.push({ itemId, branch: "current", field: "bin", raw: referenceLeaf(current.rawBin) });
    }
    if (hasRawValue(current.rawPallet) && !currentPalletId) {
      anomalies.push({ itemId, branch: "current", field: "pallet", raw: referenceLeaf(current.rawPallet) });
    }
    if (hasRawValue(from.rawBin) && !fromBinId) {
      anomalies.push({ itemId, branch: "from", field: "bin", raw: referenceLeaf(from.rawBin) });
    }
    if (hasRawValue(from.rawPallet) && !fromPalletId) {
      anomalies.push({ itemId, branch: "from", field: "pallet", raw: referenceLeaf(from.rawPallet) });
    }

    for (const unitId of [currentBinId, currentPalletId].filter(Boolean)) {
      const evidence = evidenceById.get(unitId);
      evidence.currentItemIds.add(itemId);
      if (current.location) increment(evidence.locationCounts, locationKey(current.location));
      else if (current.hasPartialLocation) evidence.incompleteLocationItemIds.add(itemId);
    }
    for (const unitId of [fromBinId, fromPalletId].filter(Boolean)) {
      evidenceById.get(unitId).historicalItemIds.add(itemId);
    }
    if (currentBinId) {
      const evidence = evidenceById.get(currentBinId);
      if (currentPalletId) increment(evidence.parentCounts, currentPalletId);
      if (isPalletZero(current.rawPallet)) {
        evidence.excludedParentPalletZeroItemIds.add(itemId);
      }
    }
  }

  const directoryFingerprint = documentFingerprint(warehouseDirectory || {});
  const existingById = new Map();
  const existingOutsideScope = [];
  for (const entry of existingUnits) {
    const parsed = parseStorageUnitId(entry.id, { allowZero: true });
    if (!parsed || !evidenceById.has(parsed.id)) {
      existingOutsideScope.push(clean(entry.id, 300));
      continue;
    }
    if (existingById.has(parsed.id)) throw new Error(`Duplicate ${STORAGE_UNIT_COLLECTION}/${parsed.id}.`);
    existingById.set(parsed.id, entry);
  }

  const units = ids.map((id) => {
    const existing = existingById.get(id);
    const desiredData = createStorageUnitData({
      id,
      evidence: evidenceById.get(id),
      backupSha256,
      sourceSnapshotAt,
      warehouseDirectoryFingerprint: directoryFingerprint,
    });
    const desiredFingerprint = documentFingerprint(desiredData);
    const beforeExists = Boolean(existing);
    const beforeFingerprint = beforeExists ? documentFingerprint(existing.data || {}) : "";
    return {
      id,
      path: `${STORAGE_UNIT_COLLECTION}/${id}`,
      kind: id.startsWith("B") ? "bin" : "pallet",
      operation: !beforeExists
        ? "create"
        : beforeFingerprint === desiredFingerprint
          ? "noop"
          : "replace",
      beforeExists,
      beforeUpdateTime: beforeExists ? clean(existing.updateTime, 100) : "",
      beforeFingerprint,
      desiredFingerprint,
      desiredData,
    };
  });
  const testInvariant = computeTestInvariant(items);
  const plan = {
    format: STORAGE_UNIT_PLAN_FORMAT,
    formatVersion: STORAGE_UNIT_FORMAT_VERSION,
    readOnly: true,
    createdAt: sourceSnapshotAt,
    sourceProject: clean(sourceProject, 300),
    targetCollection: STORAGE_UNIT_COLLECTION,
    backup: {
      createdAt: sourceSnapshotAt,
      documentCount: backup.documentCount,
      bytes: backup.bytes,
      sha256: backupSha256,
      verified: backup.verified === true,
    },
    warehouseDirectory: {
      path: "Warehouse/directory",
      updateTime: clean(warehouseDirectoryUpdateTime, 100),
      fingerprint: directoryFingerprint,
      binCount: BIN_COUNT,
      palletCount: PALLET_COUNT,
    },
    expectedUnitCount: STORAGE_UNIT_COUNT,
    expectedWriteCount: units.filter((unit) => unit.operation !== "noop").length,
    testInvariant,
    summary: {
      unitCount: STORAGE_UNIT_COUNT,
      binCount: BIN_COUNT,
      palletCount: PALLET_COUNT,
      createCount: units.filter((unit) => unit.operation === "create").length,
      replaceCount: units.filter((unit) => unit.operation === "replace").length,
      noopCount: units.filter((unit) => unit.operation === "noop").length,
      usedBinCount: units.filter(
        (unit) => unit.kind === "bin" && unit.desiredData.evidence.currentItemCount > 0
      ).length,
      usedPalletCount: units.filter(
        (unit) => unit.kind === "pallet" && unit.desiredData.evidence.currentItemCount > 0
      ).length,
      reviewRequiredCount: units.filter((unit) => unit.desiredData.reviewRequired).length,
      excludedPalletZeroReferenceCount: anomalies.filter(
        (entry) => entry.field === "pallet" && /^P?[\s_-]*0$/i.test(entry.raw)
      ).length,
      anomalyCount: anomalies.length,
      existingOutsideScopeCount: existingOutsideScope.length,
    },
    anomalies: anomalies.sort((left, right) =>
      `${left.itemId}|${left.branch}|${left.field}`.localeCompare(
        `${right.itemId}|${right.branch}|${right.field}`,
        "en",
        { numeric: true }
      )
    ),
    existingOutsideScope: existingOutsideScope.sort((left, right) =>
      left.localeCompare(right, "en", { numeric: true })
    ),
    units,
  };
  plan.planHash = computeStorageUnitPlanHash(plan);
  return plan;
}

function storageUnitPlanHashPayload(plan = {}) {
  return {
    format: plan.format,
    formatVersion: plan.formatVersion,
    readOnly: plan.readOnly,
    createdAt: plan.createdAt,
    sourceProject: plan.sourceProject,
    targetCollection: plan.targetCollection,
    backup: plan.backup,
    warehouseDirectory: plan.warehouseDirectory,
    expectedUnitCount: plan.expectedUnitCount,
    expectedWriteCount: plan.expectedWriteCount,
    testInvariant: plan.testInvariant,
    summary: plan.summary,
    anomalies: plan.anomalies,
    existingOutsideScope: plan.existingOutsideScope,
    units: plan.units,
  };
}

function computeStorageUnitPlanHash(plan) {
  return sha256Value(storageUnitPlanHashPayload(plan));
}

function validateTestInvariant(invariant, errors) {
  if (!invariant || typeof invariant !== "object" || Array.isArray(invariant)) {
    errors.push("testInvariant must be an object");
    return;
  }
  const documents = Array.isArray(invariant.documents) ? invariant.documents : [];
  if (documents.length !== invariant.count) errors.push("Test invariant count mismatch");
  const ids = documents.map((entry) => entry.id);
  if (new Set(ids).size !== ids.length) errors.push("Test invariant contains duplicate IDs");
  if (ids.some((id) => !id || id.includes("/"))) errors.push("Test invariant contains an unsafe ID");
  const recomputed = {
    count: documents.length,
    idSetFingerprint: sha256Value(documents.map((entry) => entry.id)),
    aggregateDocumentFingerprint: sha256Value(
      documents.map(({ id, updateTime, documentFingerprint: fingerprint }) => ({
        id,
        updateTime,
        fingerprint,
      }))
    ),
    aggregateMembershipFingerprint: sha256Value(
      documents.map(({ id, membershipFingerprint: fingerprint }) => ({ id, fingerprint }))
    ),
  };
  for (const field of Object.keys(recomputed)) {
    if (invariant[field] !== recomputed[field]) errors.push(`Test invariant ${field} is invalid`);
  }
  for (const entry of documents) {
    if (entry.path !== `Test/${entry.id}`) errors.push(`Test/${entry.id} invariant path mismatch`);
    if (!/^[a-f0-9]{64}$/i.test(entry.documentFingerprint || "")) {
      errors.push(`Test/${entry.id} document fingerprint is invalid`);
    }
    if (!/^[a-f0-9]{64}$/i.test(entry.membershipFingerprint || "")) {
      errors.push(`Test/${entry.id} membership fingerprint is invalid`);
    }
  }
}

function validateStorageUnitPlan(plan, { sourceProject = "", planHash = "", backupSha256 = "", expectedCount = STORAGE_UNIT_COUNT } = {}) {
  const errors = [];
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) {
    return { valid: false, errors: ["plan must be an object"], unitCount: 0 };
  }
  if (plan.format !== STORAGE_UNIT_PLAN_FORMAT) errors.push("plan format mismatch");
  if (plan.formatVersion !== STORAGE_UNIT_FORMAT_VERSION) errors.push("plan formatVersion mismatch");
  if (plan.readOnly !== true) errors.push("plan must be marked readOnly");
  if (plan.sourceProject !== sourceProject) errors.push("plan project mismatch");
  if (plan.targetCollection !== STORAGE_UNIT_COLLECTION) errors.push("target collection mismatch");
  if (plan.backup?.verified !== true) errors.push("plan backup is not verified");
  if (plan.backup?.sha256 !== backupSha256) errors.push("plan backup hash mismatch");
  if (plan.expectedUnitCount !== expectedCount || expectedCount !== STORAGE_UNIT_COUNT) {
    errors.push("expected storage unit count mismatch");
  }
  if (plan.warehouseDirectory?.binCount !== BIN_COUNT) errors.push("directory bin count mismatch");
  if (plan.warehouseDirectory?.palletCount !== PALLET_COUNT) errors.push("directory pallet count mismatch");
  validateTestInvariant(plan.testInvariant, errors);

  const units = Array.isArray(plan.units) ? plan.units : [];
  if (units.length !== STORAGE_UNIT_COUNT) errors.push("plan must contain exactly 221 units");
  const expectedIds = expectedStorageUnitIds();
  if (stableStringify(units.map((unit) => unit.id)) !== stableStringify(expectedIds)) {
    errors.push("plan unit IDs/order do not match B1..B119 then P1..P102");
  }
  for (const unit of units) {
    if (unit.id === "P0" || unit.path === `${STORAGE_UNIT_COLLECTION}/P0`) {
      errors.push("P0 must not be a migration target");
    }
    if (unit.path !== `${STORAGE_UNIT_COLLECTION}/${unit.id}`) {
      errors.push(`${unit.id}: path mismatch`);
    }
    const parsed = parseStorageUnitId(unit.id);
    if (!parsed || unit.kind !== parsed.kind) errors.push(`${unit.id}: kind mismatch`);
    if (!unit.desiredData || typeof unit.desiredData !== "object" || Array.isArray(unit.desiredData)) {
      errors.push(`${unit.id}: desiredData must be a map`);
      continue;
    }
    for (const field of [
      "code",
      "kind",
      "number",
      "displayNumber",
      "name",
      "active",
      "warehouseLocation",
      "locationStatus",
      "locationCandidates",
      "parentPalletId",
      "parentStatus",
      "parentCandidates",
      "photoStoragePrefix",
      "reviewRequired",
      "reviewReasons",
      "schemaVersion",
      "evidence",
      "migration",
    ]) {
      if (!Object.prototype.hasOwnProperty.call(unit.desiredData, field)) {
        errors.push(`${unit.id}: canonical field ${field} is missing`);
      }
    }
    if (
      unit.desiredData.code !== unit.id ||
      unit.desiredData.kind !== parsed?.kind ||
      unit.desiredData.number !== parsed?.number ||
      unit.desiredData.displayNumber !== String(parsed?.number)
    ) {
      errors.push(`${unit.id}: canonical identity fields mismatch`);
    }
    if (unit.desiredData.photoStoragePrefix !== `${STORAGE_UNIT_COLLECTION}/${unit.id}`) {
      errors.push(`${unit.id}: photoStoragePrefix mismatch`);
    }
    if (unit.desiredData.migration?.testDocumentsWritten !== 0) {
      errors.push(`${unit.id}: migration must attest zero Test document writes`);
    }
    if (
      unit.desiredData.parentPalletId === "P0" ||
      (unit.desiredData.parentCandidates || []).some(
        (candidate) => candidate?.parentPalletId === "P0"
      )
    ) {
      errors.push(`${unit.id}: P0 must not be selected or retained as a parent candidate`);
    }
    if (documentFingerprint(unit.desiredData) !== unit.desiredFingerprint) {
      errors.push(`${unit.id}: desired fingerprint mismatch`);
    }
    if (!unit.beforeExists && (unit.beforeFingerprint || unit.beforeUpdateTime)) {
      errors.push(`${unit.id}: nonexistent before state contains metadata`);
    }
    const expectedOperation = !unit.beforeExists
      ? "create"
      : unit.beforeFingerprint === unit.desiredFingerprint
        ? "noop"
        : "replace";
    if (unit.operation !== expectedOperation) errors.push(`${unit.id}: operation mismatch`);
  }
  const expectedWriteCount = units.filter((unit) => unit.operation !== "noop").length;
  if (plan.expectedWriteCount !== expectedWriteCount) errors.push("expectedWriteCount mismatch");
  const calculatedHash = computeStorageUnitPlanHash(plan);
  if (calculatedHash !== plan.planHash || calculatedHash !== planHash) {
    errors.push("plan hash mismatch");
  }
  return { valid: errors.length === 0, errors, unitCount: units.length };
}

function validateStorageUnitPreimage({
  preimage,
  plan,
  sourceProject = plan?.sourceProject || "",
  planHash = plan?.planHash || "",
  backupSha256 = plan?.backup?.sha256 || "",
  runId = preimage?.runId || "",
  expectedCount = STORAGE_UNIT_COUNT,
} = {}) {
  const errors = [];
  if (!preimage || typeof preimage !== "object" || Array.isArray(preimage)) {
    return { valid: false, errors: ["preimage must be an object"], unitCount: 0 };
  }
  if (preimage.format !== STORAGE_UNIT_PREIMAGE_FORMAT) errors.push("preimage format mismatch");
  if (preimage.formatVersion !== STORAGE_UNIT_FORMAT_VERSION) errors.push("preimage version mismatch");
  if (preimage.sourceProject !== sourceProject) errors.push("preimage project mismatch");
  if (preimage.planHash !== planHash) errors.push("preimage plan hash mismatch");
  if (preimage.backupSha256 !== backupSha256) errors.push("preimage backup hash mismatch");
  if (preimage.runId !== runId) errors.push("preimage run ID mismatch");
  if (preimage.targetCollection !== STORAGE_UNIT_COLLECTION) errors.push("preimage collection mismatch");
  if (preimage.targetCount !== expectedCount || expectedCount !== STORAGE_UNIT_COUNT) {
    errors.push("preimage target count mismatch");
  }
  if (preimage.preparationMode !== "live-read-only-preflight") {
    errors.push("preimage preparation mode mismatch");
  }
  if (preimage.firestoreWritesPerformed !== false) {
    errors.push("preimage does not attest zero Firestore writes");
  }
  if (preimage.testWritesPerformed !== 0) {
    errors.push("preimage does not attest zero Test writes");
  }
  if (!Number.isFinite(Date.parse(preimage.createdAt || ""))) errors.push("preimage createdAt is invalid");
  if (stableStringify(preimage.testInvariant) !== stableStringify(plan?.testInvariant)) {
    errors.push("preimage Test invariant does not match plan");
  }
  const units = Array.isArray(preimage.units) ? preimage.units : [];
  if (units.length !== STORAGE_UNIT_COUNT) errors.push("preimage must contain exactly 221 units");
  const byId = new Map();
  for (const unit of units) {
    if (!unit?.id || byId.has(unit.id)) errors.push(`preimage unit ${unit?.id || "(missing)"} is invalid/duplicated`);
    else byId.set(unit.id, unit);
  }
  for (const planUnit of plan?.units || []) {
    const unit = byId.get(planUnit.id);
    if (!unit) {
      errors.push(`${planUnit.id}: preimage is missing`);
      continue;
    }
    if (unit.path !== planUnit.path) errors.push(`${planUnit.id}: preimage path mismatch`);
    if (unit.exists !== planUnit.beforeExists) errors.push(`${planUnit.id}: preimage existence mismatch`);
    if (unit.updateTime !== planUnit.beforeUpdateTime) errors.push(`${planUnit.id}: preimage updateTime mismatch`);
    if (unit.beforeFingerprint !== planUnit.beforeFingerprint) {
      errors.push(`${planUnit.id}: preimage before fingerprint mismatch`);
    }
    if (unit.expectedAfterFingerprint !== planUnit.desiredFingerprint) {
      errors.push(`${planUnit.id}: preimage after fingerprint mismatch`);
    }
    if (unit.exists) {
      if (!unit.data || typeof unit.data !== "object" || Array.isArray(unit.data)) {
        errors.push(`${planUnit.id}: existing preimage data must be a map`);
      } else if (documentFingerprint(unit.data) !== unit.beforeFingerprint) {
        errors.push(`${planUnit.id}: preimage data fingerprint mismatch`);
      }
    } else if (unit.data !== null) {
      errors.push(`${planUnit.id}: nonexistent preimage data must be null`);
    }
  }
  for (const id of byId.keys()) {
    if (!(plan?.units || []).some((unit) => unit.id === id)) errors.push(`${id}: preimage is outside plan`);
  }
  return { valid: errors.length === 0, errors, unitCount: units.length };
}

function classifyStorageUnitState(planUnit, { exists, data } = {}) {
  const fingerprint = exists ? documentFingerprint(data || {}) : "";
  const before = exists === planUnit.beforeExists && fingerprint === planUnit.beforeFingerprint;
  const after = exists === true && fingerprint === planUnit.desiredFingerprint;
  if (before && after) return "both";
  if (before) return "before";
  if (after) return "after";
  return "conflict";
}

module.exports = {
  BIN_COUNT,
  PALLET_COUNT,
  STORAGE_UNIT_COLLECTION,
  STORAGE_UNIT_COUNT,
  STORAGE_UNIT_FORMAT_VERSION,
  STORAGE_UNIT_PLAN_FORMAT,
  STORAGE_UNIT_PREIMAGE_FORMAT,
  STORAGE_UNIT_SCHEMA_VERSION,
  buildStorageUnitPlan,
  classifyStorageUnitState,
  clean,
  compareTestInvariants,
  computeStorageUnitPlanHash,
  computeTestInvariant,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  expectedStorageUnitIds,
  extractContainerEvidence,
  extractMembershipFingerprintData,
  normalizeStorageNumber,
  normalizeWarehouseLocation,
  parseStorageUnitId,
  sha256Value,
  stableStringify,
  storageUnitPlanHashPayload,
  validateStorageUnitPlan,
  validateStorageUnitPreimage,
};
