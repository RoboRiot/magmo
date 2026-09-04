"use strict";

const storageUnitContract = require("./storageUnitContract.cjs");
const storageUnitDetail = require("./storageUnitDetail.cjs");

const ITEM_COLLECTION = "Test";
const STORAGE_UNIT_COLLECTION = "StorageUnits";
const MAX_LABEL_ITEMS = 250;
// A two-dot Code 128 is the smallest reliably scannable module on the
// warehouse's 203-dpi Zebra. Twenty characters fit when the renderer expands
// the serial column; anything longer falls back to the authoritative item ID.
const MAX_ITEM_LABEL_CODE_CHARACTERS = 20;
const PRINTABLE_LABEL_CODE_PATTERN = /^[\x20-\x7e]+$/;

function clean(value, maxLength = 300) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function displayText(value, maxLength = 300) {
  const values = Array.isArray(value) ? value : [value];
  return clean(
    values.map((entry) => clean(entry, maxLength)).filter(Boolean).join(", "),
    maxLength
  );
}

function isPrintableLabelCode(value) {
  return (
    Boolean(value) &&
    value.length <= MAX_ITEM_LABEL_CODE_CHARACTERS &&
    PRINTABLE_LABEL_CODE_PATTERN.test(value)
  );
}

function mapItemSnapshot(snapshot) {
  const data = snapshot?.data?.() || {};
  return {
    ...data,
    // The Firestore document ID is the authoritative AIS identity. Do not let
    // an old embedded `id` field replace it on a printed label.
    id: clean(snapshot?.id, 180),
    newLocalCurrent:
      data.newLocalCurrent && typeof data.newLocalCurrent === "object"
        ? data.newLocalCurrent
        : {},
  };
}

function buildItemLabelEntry(item = {}) {
  const itemId = clean(item.id, 180);
  const preferredBarcode =
    displayText(item.localSN, 180) ||
    displayText(item.local_sn, 180) ||
    displayText(item.serialCode, 180) ||
    itemId;
  const barcodeValue = isPrintableLabelCode(preferredBarcode)
    ? preferredBarcode
    : isPrintableLabelCode(itemId)
    ? itemId
    : "";
  const aisNumber = /^AIS\d+$/i.test(itemId)
    ? itemId.toUpperCase()
    : barcodeValue;
  if (
    !isPrintableLabelCode(barcodeValue) ||
    !isPrintableLabelCode(aisNumber)
  ) {
    const error = new Error(
      `Item ${itemId || "(unknown)"} does not have a label code that fits the warehouse barcode.`
    );
    error.code = "storage_label_item_code_too_long";
    error.statusCode = 409;
    throw error;
  }
  return {
    item_id: itemId,
    name: displayText(item.name, 240) || "Unnamed item",
    barcode_value: barcodeValue,
    ais_number: aisNumber,
  };
}

function uniqueSortedStorageIds(values, expectedType) {
  const result = new Set();
  for (const value of values || []) {
    const unit = storageUnitContract.parseStorageUnitId(value);
    if (unit?.type === expectedType) result.add(unit.id);
  }
  return Array.from(result).sort((left, right) =>
    left.localeCompare(right, "en", { numeric: true, sensitivity: "base" })
  );
}

async function loadMembership(db, unit) {
  const equalityValues = storageUnitDetail.getMembershipEqualityValues(unit.id);
  const field = unit.type === "bin" ? "bin" : "pallet";
  const currentField = `newLocalCurrent.${field}`;
  const upperField = field === "bin" ? "Bin" : "Pallet";
  const collection = db.collection(ITEM_COLLECTION);
  const [current, legacyLower, legacyUpper] = await Promise.all([
    collection.where(currentField, "in", equalityValues).get(),
    collection.where(field, "in", equalityValues).get(),
    collection.where(upperField, "in", equalityValues).get(),
  ]);
  return storageUnitDetail.mergeCurrentAndLegacyMembershipRecords({
    currentRecords: current.docs.map(mapItemSnapshot),
    legacyLowerRecords: legacyLower.docs.map(mapItemSnapshot),
    legacyUpperRecords: legacyUpper.docs.map(mapItemSnapshot),
    membershipField: field,
  });
}

async function loadStorageUnitLabelPayload({
  db,
  unitId,
  publicOrigin = storageUnitContract.STORAGE_UNIT_PUBLIC_ORIGIN,
} = {}) {
  if (!db || typeof db.collection !== "function") {
    const error = new Error("The inventory database is unavailable.");
    error.code = "database_unavailable";
    error.statusCode = 503;
    throw error;
  }
  const unit = storageUnitContract.parseStorageUnitId(unitId);
  if (!unit) {
    const error = new TypeError(
      "unitId must be a positive bin or pallet ID such as B47 or P65."
    );
    error.code = "invalid_storage_unit_id";
    error.statusCode = 400;
    throw error;
  }

  const unitRef = db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id);
  const [unitSnapshot, itemRecords, linkedBinsSnapshot] = await Promise.all([
    unitRef.get(),
    loadMembership(db, unit),
    unit.type === "pallet"
      ? db
          .collection(STORAGE_UNIT_COLLECTION)
          .where("parentPalletId", "==", unit.id)
          .get()
      : Promise.resolve({ docs: [] }),
  ]);
  if (!unitSnapshot.exists) {
    const error = new Error(`${unit.id} does not have a storage-unit record.`);
    error.code = "storage_unit_not_found";
    error.statusCode = 404;
    throw error;
  }

  const base = storageUnitContract.buildStorageUnitLabelPayload(unit.id, {
    publicOrigin,
  });
  if (unit.type === "bin") {
    const items = itemRecords
      .map(buildItemLabelEntry)
      .sort(
        (left, right) =>
          left.name.localeCompare(right.name, "en", {
            numeric: true,
            sensitivity: "base",
          }) ||
          left.ais_number.localeCompare(right.ais_number, "en", {
            numeric: true,
            sensitivity: "base",
          })
      );
    if (items.length > MAX_LABEL_ITEMS) {
      const error = new Error(
        `${unit.id} has more than ${MAX_LABEL_ITEMS} current items and cannot be printed safely.`
      );
      error.code = "storage_label_too_many_items";
      error.statusCode = 409;
      throw error;
    }
    return { ...base, items, bins: [] };
  }

  const observedBins = storageUnitDetail
    .groupPalletContents(itemRecords)
    .bins.map((bin) => bin.id);
  const linkedBins = linkedBinsSnapshot.docs.map((snapshot) => snapshot.id);
  return {
    ...base,
    items: [],
    bins: uniqueSortedStorageIds([...linkedBins, ...observedBins], "bin").map(
      (id) => ({
        unit_id: id,
        display_id: id,
        serial_id: storageUnitContract.buildStorageUnitSerialId(id),
      })
    ),
  };
}

module.exports = {
  ITEM_COLLECTION,
  MAX_ITEM_LABEL_CODE_CHARACTERS,
  MAX_LABEL_ITEMS,
  STORAGE_UNIT_COLLECTION,
  buildItemLabelEntry,
  loadMembership,
  loadStorageUnitLabelPayload,
  mapItemSnapshot,
  uniqueSortedStorageIds,
};
