export const TRAILER_LAYOUT_DOC_ID = "layout_meta";
export const TRAILER_LAYOUT_VERSION = 2;
export const TRAILER_LAYOUT_STORAGE_KEY = "trailerMapLayoutOverridesV2";
export const TRAILER_LAYOUT_STORAGE_BACKUP_KEY =
  "trailerMapLayoutOverridesV2:backup";

export const TRAILER_SLOT_RECT = { w: 8, h: 18 };

export const TRAILER_YARD_WAREHOUSE = {
  left: 11,
  top: 67,
  width: 42,
  height: 30,
};

const BASE_SLOTS = [
  { slot: 9, x: 10, y: 2, r: -22.5 },
  { slot: 17, x: 20, y: 2, r: -22.5 },
  { slot: 6, x: 30, y: 2, r: -22.5 },
  { slot: 24, x: 40, y: 2, r: -22.5 },
  { slot: 73, x: 50, y: 2, r: -22.5 },
  { slot: 15, x: 60, y: 2, r: 0 },
  { slot: 11, x: 69, y: 2, r: 0 },
  { slot: 46, x: 69, y: 24, r: 0 },
  { slot: 47, x: 79, y: 45, r: 0 },
  { slot: 23, x: 88, y: 45, r: 0 },
  { slot: 28, x: 88, y: 66, r: 0 },
  { slot: 36, x: 2, y: 30, r: 0 },
  { slot: 25, x: 2, y: 41, r: 0 },
];

const PLACEHOLDER_SLOTS = [
  { key: "p-a", slot: 10001, x: 79, y: 2, r: 0 },
  { key: "p-b", slot: 10002, x: 79, y: 24, r: 0 },
  { key: "p-c", slot: 10003, x: 88, y: 24, r: 0 },
  { key: "dock-north", slot: 10004, x: 62, y: 61, r: 0 },
  { key: "dock-south", slot: 10005, x: 62, y: 81, r: 0 },
];

export const TRAILER_YARD_BASE_SLOTS = BASE_SLOTS.map((slot) => ({
  ...slot,
  ...TRAILER_SLOT_RECT,
  key: `slot-${slot.slot}`,
  custom: false,
}));

export const TRAILER_YARD_PLACEHOLDER_SLOTS = PLACEHOLDER_SLOTS.map((slot) => ({
  ...slot,
  ...TRAILER_SLOT_RECT,
  key: `placeholder-${slot.key}`,
  custom: true,
}));

export const TRAILER_YARD_CANONICAL_SLOT_NUMBERS = new Set(
  TRAILER_YARD_BASE_SLOTS.map((slot) => slot.slot)
);

export function extractTrailerNumber(value) {
  if (!value) return null;
  const aisMatch = String(value).match(/\bAIS\s*[-_]?\s*(\d+)\b/i);
  const match = aisMatch || String(value).match(/(\d+)/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolveTrailerNumber({
  id,
  number,
  mondayBoardName,
  name,
} = {}) {
  const storedNumber =
    number == null || number === "" ? null : Number(number);
  const idAisMatch = String(id || "").match(/\bAIS\s*[-_]?\s*(\d+)\b/i);
  const idAisNumber = idAisMatch ? Number(idAisMatch[1]) : null;
  return (
    (Number.isFinite(idAisNumber) ? idAisNumber : null) ||
    (Number.isFinite(storedNumber) && storedNumber > 0
      ? storedNumber
      : null) ||
    extractTrailerNumber(mondayBoardName) ||
    extractTrailerNumber(name)
  );
}

function toFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolveTrailerMapPlacement({
  lfSlot,
  lfOnMap,
  number,
} = {}) {
  const parsedSlot = toFiniteNumber(lfSlot);
  const explicitSlot =
    parsedSlot !== null && parsedSlot > 0 ? parsedSlot : null;
  const parsedNumber = toFiniteNumber(number);
  const inferredSlot =
    parsedNumber !== null &&
    TRAILER_YARD_CANONICAL_SLOT_NUMBERS.has(parsedNumber)
      ? parsedNumber
      : null;
  const slot = explicitSlot ?? (lfOnMap === false ? null : inferredSlot);

  return {
    lfSlot: slot,
    lfOnMap: lfOnMap === false ? false : Number.isFinite(slot),
    lfSlotExplicit: explicitSlot !== null,
  };
}

export function cloneTrailerLayoutOverrides(overrides = {}) {
  const cloned = {};
  Object.entries(overrides || {}).forEach(([key, value]) => {
    if (!value || typeof value !== "object") return;
    const next = {};
    const x = toFiniteNumber(value.x);
    const y = toFiniteNumber(value.y);
    const r = toFiniteNumber(value.r);
    const w = toFiniteNumber(value.w);
    const h = toFiniteNumber(value.h);
    const slot = toFiniteNumber(value.slot);
    if (x !== null) next.x = x;
    if (y !== null) next.y = y;
    if (r !== null) next.r = r;
    if (w !== null) next.w = w;
    if (h !== null) next.h = h;
    if (slot !== null) next.slot = slot;
    if (value.deleted === true) next.deleted = true;
    if (value.custom === true) next.custom = true;
    if (Object.keys(next).length > 0) cloned[key] = next;
  });
  return cloned;
}

function applyOverrides(slots, overrides) {
  return slots.reduce((positioned, slot) => {
    const override = overrides?.[slot.key] || {};
    if (override.deleted === true) return positioned;
    positioned.push({
      ...slot,
      x: Number.isFinite(override.x) ? override.x : slot.x,
      y: Number.isFinite(override.y) ? override.y : slot.y,
      w: Number.isFinite(override.w) ? override.w : slot.w,
      h: Number.isFinite(override.h) ? override.h : slot.h,
      r: Number.isFinite(override.r) ? override.r : slot.r,
      slot: Number.isFinite(override.slot) ? override.slot : slot.slot,
    });
    return positioned;
  }, []);
}

export function buildPositionedTrailerSlots(overrides = {}) {
  const normalizedOverrides = cloneTrailerLayoutOverrides(overrides);
  const customSlots = Object.entries(normalizedOverrides)
    .filter(
      ([key, value]) =>
        key.startsWith("slot-custom-") &&
        value?.custom === true &&
        value.deleted !== true
    )
    .map(([key, value]) => ({
      key,
      slot: Number(value.slot),
      x: Number.isFinite(value.x) ? value.x : 4,
      y: Number.isFinite(value.y) ? value.y : 78,
      w: Number.isFinite(value.w) ? value.w : TRAILER_SLOT_RECT.w,
      h: Number.isFinite(value.h) ? value.h : TRAILER_SLOT_RECT.h,
      r: Number.isFinite(value.r) ? value.r : 0,
      custom: true,
    }))
    .filter((slot) => Number.isFinite(slot.slot));

  return [
    ...applyOverrides(TRAILER_YARD_BASE_SLOTS, normalizedOverrides),
    ...applyOverrides(TRAILER_YARD_PLACEHOLDER_SLOTS, normalizedOverrides),
    ...customSlots,
  ];
}

export function getSavedTrailerLayoutOverrides(layoutData = {}) {
  if (Number(layoutData?.layoutVersion) !== TRAILER_LAYOUT_VERSION) return {};
  return cloneTrailerLayoutOverrides(layoutData?.layoutOverrides || {});
}
