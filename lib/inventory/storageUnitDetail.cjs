const STORAGE_UNIT_COLLECTION = "StorageUnits";
const STORAGE_UNIT_PHOTO_ROOT = "StorageUnits";
const MAX_STORAGE_NAME_LENGTH = 512;
const storageUnitContract = require("./storageUnitContract.cjs");

const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function normalizeStorageUnitId(value) {
  return storageUnitContract.normalizeStorageUnitId(value);
}

function storageUnitType(unitIdValue) {
  return storageUnitContract.parseStorageUnitId(unitIdValue)?.type || "";
}

function storageUnitNumber(unitIdValue) {
  return storageUnitContract.parseStorageUnitId(unitIdValue)?.number ?? null;
}

function getMembershipEqualityValues(unitIdValue) {
  const number = storageUnitNumber(unitIdValue);
  return number == null ? [] : [number, String(number)];
}

function normalizeStorageName(value) {
  const name = clean(value, MAX_STORAGE_NAME_LENGTH);
  if (
    !name ||
    name === "." ||
    name === ".." ||
    /[\\/\0]/.test(name)
  ) {
    return "";
  }
  return name;
}

function buildStorageUnitPhotoPath(unitIdValue, storageNameValue) {
  const unitId = normalizeStorageUnitId(unitIdValue);
  const storageName = normalizeStorageName(storageNameValue);
  if (!unitId || !storageName) return "";
  return `${STORAGE_UNIT_PHOTO_ROOT}/${unitId}/${storageName}`;
}

function parseSection(section) {
  if (typeof section === "string") {
    const match = clean(section, 100).match(/^([A-Za-z]+)\s*[- ]?\s*(.*)$/);
    return {
      letter: clean(match?.[1], 20).toUpperCase(),
      number: clean(match?.[2], 30),
    };
  }
  return {
    letter: clean(section?.letter, 20).toUpperCase(),
    number: clean(section?.number, 30),
  };
}

function normalizeWarehouseLocation(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      region: "",
      section: { letter: "", number: "" },
      complete: false,
      key: "",
      label: "Unknown",
    };
  }
  const region = clean(value.region, 50).toUpperCase();
  const section = parseSection(
    value.section || {
      letter: value.sectionLetter || value.row,
      number: value.sectionNumber || value.col,
    }
  );
  const complete = Boolean(region && section.letter && section.number);
  const key = complete ? `${region}|${section.letter}|${section.number}` : "";
  return {
    region,
    section,
    complete,
    key,
    label: complete ? `${region} - ${section.letter}${section.number}` : "Unknown",
  };
}

function unwrapLocationCandidate(candidate) {
  if (!candidate || typeof candidate !== "object") return {};
  return (
    candidate.warehouseLocation ||
    candidate.location ||
    candidate.currentLocation ||
    candidate.newLocalCurrent ||
    candidate
  );
}

function configuredLocationCandidates(unitData = {}) {
  const migration = unitData?.migration || {};
  const arrays = [
    unitData.locationCandidates,
    unitData.observedLocationCandidates,
    migration.locationCandidates,
    migration.observedLocationCandidates,
  ];
  return arrays.flatMap((value) => (Array.isArray(value) ? value : []));
}

function canonicalLocationCandidates(unitData = {}) {
  return [
    unitData.warehouseLocation,
    unitData.location,
    unitData.currentLocation,
    {
      region: unitData.region,
      section: unitData.section,
    },
  ];
}

function uniqueCompleteLocations(values = []) {
  const locations = new Map();
  values.forEach((value) => {
    const normalized = normalizeWarehouseLocation(unwrapLocationCandidate(value));
    if (normalized.complete && !locations.has(normalized.key)) {
      locations.set(normalized.key, normalized);
    }
  });
  return Array.from(locations.values()).sort((left, right) =>
    naturalCollator.compare(left.label, right.label)
  );
}

function getStorageLocationSummary(unitData = {}, itemRecords = []) {
  const canonical = uniqueCompleteLocations(
    canonicalLocationCandidates(unitData)
  )[0] || null;
  const observed = (Array.isArray(itemRecords) ? itemRecords : []).map(
    (item) => item?.newLocalCurrent || {}
  );
  const candidates = uniqueCompleteLocations([
    ...canonicalLocationCandidates(unitData),
    ...configuredLocationCandidates(unitData),
    ...observed,
  ]);
  const storedStatus = clean(unitData.locationStatus, 40).toLowerCase();
  const reviewReasons = Array.isArray(unitData.reviewReasons)
    ? unitData.reviewReasons.map((reason) => clean(reason, 100).toLowerCase())
    : [];
  const explicitlyReviewable =
    unitData.locationReviewRequired === true ||
    storedStatus === "review_required" ||
    storedStatus === "conflict" ||
    reviewReasons.includes("conflicting_warehouse_locations") ||
    (unitData.reviewRequired === true && !storedStatus && !reviewReasons.length);

  if (explicitlyReviewable || candidates.length > 1) {
    return {
      status: "review_required",
      location: null,
      recordedLocation: canonical,
      candidates,
    };
  }
  if (candidates.length === 1) {
    return {
      status: canonical ? "confirmed" : "observed",
      location: candidates[0],
      recordedLocation: canonical,
      candidates,
    };
  }
  return {
    status: "unknown",
    location: null,
    recordedLocation: canonical,
    candidates: [],
  };
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "number" || typeof value === "bigint") {
    return clean(value, 100);
  }
  if (typeof value === "string") {
    const pieces = value.split("/").filter(Boolean);
    return clean(pieces[pieces.length - 1] || value, 100);
  }
  if (value.id) return clean(value.id, 100);
  if (value.path) {
    const pieces = clean(value.path, 500).split("/").filter(Boolean);
    return clean(pieces[pieces.length - 1], 100);
  }
  return "";
}

function normalizePalletId(value) {
  if (value && typeof value === "object") {
    const nested =
      value.parentPalletId ||
      value.palletId ||
      value.code ||
      value.serialCode;
    if (nested) return normalizePalletId(nested);
  }
  const reference = referenceId(value);
  if (!reference || reference === "0") return "";
  const parsed = storageUnitContract.parseStorageUnitId(reference);
  if (parsed) return parsed.type === "pallet" ? parsed.id : "";
  return normalizeStorageUnitId(`P${reference}`);
}

function getParentPalletSummary(unitData = {}, itemRecords = []) {
  const configured = normalizePalletId(
    unitData.parentPalletId ||
      unitData.parentPallet ||
      unitData.palletId ||
      unitData.pallet
  );
  const candidates = new Set();
  if (configured) candidates.add(configured);
  [
    unitData.parentCandidates,
    unitData?.migration?.parentCandidates,
  ].forEach((values) => {
    if (!Array.isArray(values)) return;
    values.forEach((value) => {
      const palletId = normalizePalletId(value);
      if (palletId) candidates.add(palletId);
    });
  });
  (Array.isArray(itemRecords) ? itemRecords : []).forEach((item) => {
    const palletId = normalizePalletId(item?.newLocalCurrent?.pallet);
    if (palletId) candidates.add(palletId);
  });
  const ids = Array.from(candidates).sort((left, right) =>
    naturalCollator.compare(left, right)
  );
  const storedStatus = clean(unitData.parentStatus, 40).toLowerCase();
  const reviewRequired =
    unitData.parentReviewRequired === true ||
    storedStatus === "review_required" ||
    storedStatus === "conflict" ||
    ids.length > 1;
  return {
    status: reviewRequired ? "review_required" : ids.length ? "confirmed" : "none",
    parentPalletId: !reviewRequired && ids.length === 1 ? ids[0] : "",
    configuredParentPalletId: configured,
    candidates: ids,
  };
}

function normalizeBinId(value) {
  const text = clean(value, 100);
  if (!text || text === "0") return "";
  return normalizeStorageUnitId(/^b/i.test(text) ? text : `B${text}`);
}

function groupPalletContents(itemRecords = []) {
  const allItems = Array.isArray(itemRecords) ? [...itemRecords] : [];
  const groups = new Map();
  const directItems = [];
  allItems.forEach((item) => {
    const binId = normalizeBinId(item?.newLocalCurrent?.bin);
    if (!binId) {
      directItems.push(item);
      return;
    }
    if (!groups.has(binId)) groups.set(binId, []);
    groups.get(binId).push(item);
  });
  const bins = Array.from(groups.entries())
    .map(([id, items]) => ({ id, items }))
    .sort((left, right) => naturalCollator.compare(left.id, right.id));
  return { bins, directItems, allItems };
}

function mergeCurrentAndLegacyMembershipRecords({
  currentRecords = [],
  legacyLowerRecords = [],
  legacyUpperRecords = [],
  membershipField,
} = {}) {
  const field = membershipField === "pallet" ? "pallet" : "bin";
  const records = new Map();

  (Array.isArray(currentRecords) ? currentRecords : []).forEach((record) => {
    if (record?.id) records.set(record.id, record);
  });

  (Array.isArray(legacyLowerRecords) ? legacyLowerRecords : []).forEach(
    (record) => {
      if (!record?.id || record?.newLocalCurrent?.[field] != null) return;
      if (!records.has(record.id)) records.set(record.id, record);
    }
  );

  (Array.isArray(legacyUpperRecords) ? legacyUpperRecords : []).forEach(
    (record) => {
      if (
        !record?.id ||
        record?.newLocalCurrent?.[field] != null ||
        record?.[field] != null
      ) {
        return;
      }
      if (!records.has(record.id)) records.set(record.id, record);
    }
  );

  return Array.from(records.values());
}

module.exports = {
  MAX_STORAGE_NAME_LENGTH,
  STORAGE_UNIT_COLLECTION,
  STORAGE_UNIT_PHOTO_ROOT,
  buildStorageUnitPhotoPath,
  getMembershipEqualityValues,
  getParentPalletSummary,
  getStorageLocationSummary,
  groupPalletContents,
  mergeCurrentAndLegacyMembershipRecords,
  normalizeStorageName,
  normalizeStorageUnitId,
  normalizeWarehouseLocation,
  storageUnitNumber,
  storageUnitType,
  uniqueCompleteLocations,
};
