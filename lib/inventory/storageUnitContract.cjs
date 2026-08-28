"use strict";

const STORAGE_UNIT_LABEL_TEMPLATE = "storage-unit-v1";
const STORAGE_UNIT_BARCODE_FORMAT = "CODE128";
const STORAGE_UNIT_ROUTE_PREFIX = "/NewSearch/inventory/storage";
const STORAGE_UNIT_ID_PATTERN = /^([BP])[\s_-]*(\d+)$/i;

function clean(value, maxLength = 200) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function parseStorageUnitId(value, { allowZero = false } = {}) {
  const candidate = clean(value, 40);
  const match = candidate.match(STORAGE_UNIT_ID_PATTERN);
  if (!match) return null;

  const numericValue = Number(match[2]);
  if (!Number.isSafeInteger(numericValue) || numericValue < 0) return null;
  if (!allowZero && numericValue === 0) return null;

  const prefix = match[1].toUpperCase();
  return {
    id: `${prefix}${numericValue}`,
    prefix,
    type: prefix === "B" ? "bin" : "pallet",
    number: numericValue,
    displayNumber: String(numericValue),
    canCreateOrPrint: numericValue > 0,
  };
}

function normalizeStorageUnitId(value, options) {
  return parseStorageUnitId(value, options)?.id || "";
}

function isReservedStorageUnitId(value) {
  return Boolean(parseStorageUnitId(value, { allowZero: true }));
}

function buildStorageUnitRoute(value) {
  const unit = parseStorageUnitId(value, { allowZero: true });
  return unit
    ? `${STORAGE_UNIT_ROUTE_PREFIX}/${encodeURIComponent(unit.id)}`
    : "";
}

function isEmptyScannerResult(value) {
  const normalized = clean(value, 200).toLowerCase();
  return (
    !normalized ||
    normalized === "not found" ||
    normalized === "not%20found" ||
    normalized === "no result"
  );
}

function resolveScanDestination(value) {
  const scannedValue = clean(value, 500);
  if (isEmptyScannerResult(scannedValue)) return null;

  const storageUnit = parseStorageUnitId(scannedValue, { allowZero: true });
  if (storageUnit) {
    return {
      kind: "storage-unit",
      id: storageUnit.id,
      storageUnit,
      destination: buildStorageUnitRoute(storageUnit.id),
    };
  }

  return {
    kind: "item",
    id: scannedValue,
    storageUnit: null,
    destination: `/NewSearch/item/${encodeURIComponent(scannedValue)}`,
  };
}

function buildStorageUnitLabelPayload(value) {
  const unit = parseStorageUnitId(value, { allowZero: false });
  if (!unit) {
    const error = new TypeError(
      "unitId must be a positive bin or pallet ID such as B47 or P65."
    );
    error.code = "invalid_storage_unit_id";
    throw error;
  }

  return {
    template: STORAGE_UNIT_LABEL_TEMPLATE,
    label_type: "storage_unit",
    storage_unit_type: unit.type,
    unit_id: unit.id,
    display_number: unit.displayNumber,
    local_sn: unit.id,
    qr_value: unit.id,
    barcode_value: unit.id,
    barcode_format: STORAGE_UNIT_BARCODE_FORMAT,
  };
}

module.exports = {
  STORAGE_UNIT_BARCODE_FORMAT,
  STORAGE_UNIT_ID_PATTERN,
  STORAGE_UNIT_LABEL_TEMPLATE,
  STORAGE_UNIT_ROUTE_PREFIX,
  buildStorageUnitLabelPayload,
  buildStorageUnitRoute,
  isEmptyScannerResult,
  isReservedStorageUnitId,
  normalizeStorageUnitId,
  parseStorageUnitId,
  resolveScanDestination,
};
