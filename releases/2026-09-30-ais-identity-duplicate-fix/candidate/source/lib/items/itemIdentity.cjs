// AIS identity is textual: preserve leading zeros used by existing inventory.
// Bare digits are the same identity as the AIS-prefixed barcode, not a new SKU.
function normalizeItemAisValue(value) {
  const trimmed = String(value ?? "").trim();
  const match = trimmed.match(/^(?:AIS[\s_-]*)?(\d+)$/i);
  return match ? `AIS${match[1]}` : trimmed;
}

function getItemAisLookupValues(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return [];
  const normalized = normalizeItemAisValue(trimmed);
  const values = new Set([trimmed, normalized]);
  const match = normalized.match(/^AIS(\d+)$/);
  if (match) {
    const digits = match[1];
    values.add(digits);
    for (const prefix of ["AIS", "ais"]) {
      for (const separator of ["", " ", "-", "_"]) values.add(`${prefix}${separator}${digits}`);
    }
  }
  return [...values];
}

// Do not silently move historical documents just because their saved spelling
// is noncanonical. Only a genuinely different requested identity is a rename.
function resolveItemSaveIdentity(value, previousId = "") {
  const previous = String(previousId ?? "").trim();
  const requested = String(value ?? "").trim() || previous;
  if (previous && normalizeItemAisValue(previous) === normalizeItemAisValue(requested)) return previous;
  return normalizeItemAisValue(requested);
}

module.exports = { normalizeItemAisValue, getItemAisLookupValues, resolveItemSaveIdentity };
