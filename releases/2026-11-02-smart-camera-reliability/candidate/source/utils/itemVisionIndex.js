export const ITEM_VISION_INDEX_COLLECTION = "ItemVisionIndex";
export const ITEM_VISION_INDEX_VERSION = 2;

const MAX_SEARCH_TOKENS = 300;
const MAX_DESCRIPTION_CHARS = 700;

export function normalizePhotoSha256(value) {
  return [...new Set((Array.isArray(value) ? value : [value])
    .filter((entry) => typeof entry === "string")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => /^[a-f0-9]{64}$/.test(entry)))];
}

// A saved item's additional prefixes include retained rename folders and
// approved request photos. Never accept arbitrary URLs or broad Parts/ scans.
export function normalizePhotoStoragePrefixes(item = {}, itemId = "") {
  const values = [itemId ? `Parts/${itemId}/` : "", item.photoStoragePrefix,
    ...(Array.isArray(item.photoStoragePrefixes) ? item.photoStoragePrefixes : [])];
  return [...new Set(values.filter((value) => typeof value === "string").map((value) => {
    const match = value.trim().match(/^Parts\/([^/\\\u0000-\u001f\u007f]+)\/?$/);
    return match && ![".", ".."].includes(match[1]) ? `Parts/${match[1]}/` : "";
  }).filter(Boolean))];
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined || value === "") return [];
  return [value];
}

function cleanStringArray(value) {
  const seen = new Set();
  const values = [];
  toArray(value).forEach((entry) => {
    const cleaned = String(entry || "").trim();
    const key = cleaned.toLowerCase();
    if (!cleaned || cleaned.toLowerCase() === "n/a" || seen.has(key)) return;
    seen.add(key);
    values.push(cleaned);
  });
  return values;
}

export function normalizeVisionSearchText(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizePartNumberKey(value) {
  return normalizeVisionSearchText(value).replace(/\s+/g, "");
}

function getMachineField(item, lowerName, upperName) {
  return (
    item?.TheMachine?.[lowerName] ||
    item?.TheMachine?.[upperName] ||
    item?.machineData?.[lowerName] ||
    item?.machineData?.[upperName] ||
    item?.currentMachineData?.[lowerName] ||
    item?.currentMachineData?.[upperName] ||
    item?.[lowerName] ||
    item?.[upperName] ||
    ""
  );
}

function getDescriptionSnippet(item) {
  const values = [];
  cleanStringArray(item?.description || item?.desc).forEach((value) =>
    values.push(value)
  );
  toArray(item?.descriptions).forEach((entry) => {
    const value = String(entry?.description || entry || "").trim();
    if (value) values.push(value);
  });
  return values.join(" | ").slice(0, MAX_DESCRIPTION_CHARS);
}

function addSearchValue(tokenSet, value) {
  const normalized = normalizeVisionSearchText(value);
  if (!normalized) return;

  const words = normalized.split(" ").filter(Boolean);
  words.forEach((word) => {
    if (word.length >= 2) tokenSet.add(word);
  });

  for (let index = 0; index < words.length - 1; index += 1) {
    tokenSet.add(`${words[index]} ${words[index + 1]}`);
  }

  if (normalized.length >= 2 && normalized.length <= 100) {
    tokenSet.add(normalized);
  }
  const compact = normalized.replace(/\s+/g, "");
  if (compact.length >= 2 && compact.length <= 100) tokenSet.add(compact);
}

export function buildVisionSearchTokens(item = {}, documentId = "") {
  const tokens = new Set();
  const descriptionSnippet = getDescriptionSnippet(item);
  const values = [
    item?.name,
    documentId,
    item?.localSN,
    item?.local_sn,
    item?.aisNumber,
    getMachineField(item, "oem", "OEM"),
    getMachineField(item, "modality", "Modality"),
    getMachineField(item, "model", "Model"),
    descriptionSnippet,
  ];

  cleanStringArray(item?.pn || item?.partNumbers || item?.productNumber).forEach(
    (value) => values.push(value)
  );
  cleanStringArray(item?.visionSearchTerms).forEach((value) => values.push(value));
  values.forEach((value) => addSearchValue(tokens, value));
  return Array.from(tokens).slice(0, MAX_SEARCH_TOKENS);
}

export function buildItemVisionIndexRecord(
  item = {},
  documentId = "",
  options = {}
) {
  const sourceItemId = String(documentId || item?.id || "").trim();
  const partNumbers = cleanStringArray(
    item?.pn || item?.partNumbers || item?.productNumber
  );
  const oem = cleanStringArray(getMachineField(item, "oem", "OEM"));
  const modality = cleanStringArray(
    getMachineField(item, "modality", "Modality")
  );
  const model = cleanStringArray(getMachineField(item, "model", "Model"));
  const photoStoragePrefixes = normalizePhotoStoragePrefixes(item, sourceItemId);

  return {
    sourceItemId,
    name: String(item?.name || "").trim(),
    partNumbers,
    partNumberKeys: Array.from(
      new Set(partNumbers.map(normalizePartNumberKey).filter(Boolean))
    ),
    oem,
    modality,
    model,
    descriptionSnippet: getDescriptionSnippet(item),
    searchTokens: buildVisionSearchTokens(item, sourceItemId),
    photoStoragePrefix: photoStoragePrefixes[0] || "",
    photoStoragePrefixes,
    // Only a server Storage refresh may populate fingerprints. Inventory
    // metadata and client-supplied hashes are not evidence of saved photos.
    photoSha256: normalizePhotoSha256(options.photoSha256),
    version: ITEM_VISION_INDEX_VERSION,
    updatedAt: options.updatedAt || new Date().toISOString(),
  };
}

export function normalizeVisionIndexCandidate(candidate = {}) {
  const sourceItemId = String(
    candidate.sourceItemId || candidate.id || ""
  ).trim();
  return {
    id: sourceItemId,
    name: String(candidate.name || "").trim(),
    partNumbers: cleanStringArray(candidate.partNumbers || candidate.pn),
    partNumberKeys: cleanStringArray(candidate.partNumberKeys),
    oem: cleanStringArray(
      candidate.oem || candidate?.TheMachine?.oem || candidate?.TheMachine?.OEM
    ),
    modality: cleanStringArray(
      candidate.modality ||
        candidate?.TheMachine?.modality ||
        candidate?.TheMachine?.Modality
    ),
    model: cleanStringArray(
      candidate.model ||
        candidate?.TheMachine?.model ||
        candidate?.TheMachine?.Model
    ),
    descriptionSnippet: String(candidate.descriptionSnippet || "").slice(
      0,
      MAX_DESCRIPTION_CHARS
    ),
    searchTokens: cleanStringArray(
      candidate.searchTokens || candidate.generalSearchTokens
    ),
    photoStoragePrefix: normalizePhotoStoragePrefixes(candidate, sourceItemId)[0] || "",
    photoStoragePrefixes: normalizePhotoStoragePrefixes(candidate, sourceItemId),
    photoSha256: normalizePhotoSha256(candidate.photoSha256),
  };
}
