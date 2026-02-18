export function buildLocalLocObject(loc) {
  const o = {};
  if (loc?.region) o.region = loc.region;
  if (loc?.section?.letter && loc?.section?.number) o.section = loc.section;
  if (loc?.bin !== undefined && loc?.bin !== "") o.bin = loc.bin;
  if (loc?.pallet !== undefined && loc?.pallet !== "") o.pallet = loc.pallet;
  return o;
}

export function formatLoc(loc) {
  if (!loc) return "";
  const parts = [];
  if (loc.region) parts.push(loc.region);
  if (loc.section?.letter && loc.section?.number) {
    parts.push(`${loc.section.letter}${loc.section.number}`);
  }
  if (loc.bin) parts.push(`B${loc.bin}`);
  if (loc.pallet) parts.push(`P${loc.pallet}`);
  return parts.join("–");
}

function isValidField(value) {
  if (typeof value !== "string") return Boolean(value);
  const trimmed = value.trim();
  return trimmed !== "" && trimmed !== "N/A";
}

export function getPriorityMachineField(
  field,
  theMachine,
  currentMachine,
  fromMachine
) {
  if (theMachine && isValidField(theMachine[field])) return theMachine[field];
  if (currentMachine && isValidField(currentMachine[field]))
    return currentMachine[field];
  if (fromMachine && isValidField(fromMachine[field])) return fromMachine[field];
  return "";
}

export function updateMachineFields(theMachine, currentMachine, fromMachine) {
  const pick = (primary, fallback) =>
    getPriorityMachineField(primary, theMachine, currentMachine, fromMachine) ||
    getPriorityMachineField(fallback, theMachine, currentMachine, fromMachine);

  return {
    oem: pick("OEM", "oem"),
    modality: pick("Modality", "modality"),
    model: pick("Model", "model"),
  };
}

export function buildNameTokens(name) {
  if (!name || typeof name !== "string") return [];
  const lower = name.toLowerCase().trim();
  if (!lower) return [];
  const tokens = lower.split(/[^a-z0-9]+/).filter(Boolean);
  // include the full phrase so exact multi-word searches can match
  tokens.push(lower);
  return Array.from(new Set(tokens));
}
