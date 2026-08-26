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

function hasLocationValue(value) {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
}

export function formatBinPallet(loc) {
  if (!loc) return "";
  const parts = [];
  if (hasLocationValue(loc.bin)) parts.push("B" + loc.bin);
  if (hasLocationValue(loc.pallet)) parts.push("P" + loc.pallet);
  return parts.join(" / ");
}

export function formatWarehousePosition(loc) {
  if (!loc) return "";
  const parts = [];
  if (loc.region) parts.push(loc.region);
  if (loc.section?.letter && hasLocationValue(loc.section?.number)) {
    parts.push(loc.section.letter + loc.section.number);
  }
  return parts.join(" - ");
}

function isValidField(value) {
  if (Array.isArray(value)) {
    return value.some((entry) => {
      const trimmed = String(entry || "").trim();
      return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
    });
  }
  if (typeof value !== "string") return Boolean(value);
  const trimmed = value.trim();
  return trimmed !== "" && trimmed.toLowerCase() !== "n/a";
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
  const lower = normalizePartSearchText(name);
  if (!lower) return [];
  const tokens = new Set([lower]);
  lower.split(/[^a-z0-9]+/).filter(Boolean).forEach((word) => {
    tokens.add(word);
    for (let length = 1; length <= word.length; length += 1) {
      tokens.add(word.slice(0, length));
    }
    for (let start = 0; start < word.length; start += 1) {
      for (let end = start + 2; end <= word.length; end += 1) {
        tokens.add(word.slice(start, end));
        if (tokens.size >= 1000) return;
      }
      if (tokens.size >= 1000) return;
    }
  });
  return Array.from(tokens).slice(0, 1000);
}

export function normalizePartSearchText(value) {
  if (value == null) return "";
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function flattenSearchValues(value, output) {
  if (value == null) return;
  if (Array.isArray(value)) {
    value.forEach((entry) => flattenSearchValues(entry, output));
    return;
  }
  if (typeof value === "string" || typeof value === "number") {
    const normalized = normalizePartSearchText(value);
    if (normalized) output.push(normalized);
  }
}

function addCompactSearchValues(values) {
  const compactValues = values
    .map((value) => value.replace(/\s+/g, ""))
    .filter((value) => value.length > 1);
  compactValues.forEach((value) => {
    if (!values.includes(value)) values.push(value);
  });
}

export function getPartSearchGroups(item = {}, documentId = "") {
  const descriptions = [];
  flattenSearchValues(item.desc, descriptions);
  flattenSearchValues(item.description, descriptions);
  flattenSearchValues(
    (Array.isArray(item.descriptions) ? item.descriptions : []).map(
      (entry) => entry?.description
    ),
    descriptions
  );

  const workOrders = [];
  flattenSearchValues(
    (Array.isArray(item.workOrders) ? item.workOrders : []).map(
      (entry) => entry?.workOrder ?? entry
    ),
    workOrders
  );
  flattenSearchValues(item.wo, workOrders);
  flattenSearchValues(item.workOrder, workOrders);
  addCompactSearchValues(workOrders);

  const productNumbers = [];
  flattenSearchValues(item.pn, productNumbers);
  flattenSearchValues(item.productNumber, productNumbers);
  addCompactSearchValues(productNumbers);

  const serialNumbers = [];
  flattenSearchValues(item.sn, serialNumbers);
  flattenSearchValues(item.serialNumber, serialNumbers);
  addCompactSearchValues(serialNumbers);

  const sku = [];
  flattenSearchValues(documentId || item.id, sku);
  flattenSearchValues(item.localSN, sku);
  flattenSearchValues(item.local_sn, sku);
  flattenSearchValues(item.sku, sku);
  addCompactSearchValues(sku);

  const other = [];
  [
    item.status,
    item.poNumber,
    item.trackingNumber,
    item.DOM,
    item.localLocFrom,
    item.localLocCurrent,
    item.TheMachine?.OEM,
    item.TheMachine?.oem,
    item.TheMachine?.Modality,
    item.TheMachine?.modality,
    item.TheMachine?.Model,
    item.TheMachine?.model,
    item.machineData?.OEM,
    item.machineData?.Modality,
    item.machineData?.Model,
    item.currentMachineData?.OEM,
    item.currentMachineData?.Modality,
    item.currentMachineData?.Model,
  ].forEach((value) => flattenSearchValues(value, other));
  (Array.isArray(item.selectionHistory) ? item.selectionHistory : []).forEach((entry) => {
    [
      entry?.fromClientName,
      entry?.currentClientName,
      entry?.fromMachineName,
      entry?.currentMachineName,
    ].forEach((value) => flattenSearchValues(value, other));
  });

  return {
    name: [normalizePartSearchText(item.name)].filter(Boolean),
    descriptions,
    workOrders,
    productNumbers,
    serialNumbers,
    sku,
    other,
  };
}

function buildPrefixTokens(values, output, maxTokens) {
  values.forEach((value) => {
    value.split(" ").filter(Boolean).forEach((word) => {
      output.add(word);
      for (let length = 1; length <= word.length; length += 1) {
        output.add(word.slice(0, length));
        if (output.size >= maxTokens) return;
      }
    });
  });
}

export function buildGeneralSearchTokens(item = {}, documentId = "") {
  const groups = getPartSearchGroups(item, documentId);
  const tokens = new Set();
  Object.values(groups).forEach((values) =>
    buildPrefixTokens(values, tokens, 1500)
  );
  buildNameTokens(item.name).forEach((token) => tokens.add(token));
  return Array.from(tokens).slice(0, 1500);
}

export function getPartSearchScore(item = {}, query = "") {
  const terms = normalizePartSearchText(query).split(" ").filter(Boolean);
  if (!terms.length) return 0;

  const groups = getPartSearchGroups(item, item.id);
  const weightedGroups = [
    [groups.name, 100],
    [groups.sku, 90],
    [groups.productNumbers, 80],
    [groups.serialNumbers, 80],
    [groups.workOrders, 65],
    [groups.descriptions, 50],
    [groups.other, 25],
  ];

  let score = 0;
  for (const term of terms) {
    let bestTermScore = 0;
    weightedGroups.forEach(([values, weight]) => {
      values.forEach((value) => {
        if (value === term) {
          bestTermScore = Math.max(bestTermScore, weight + 30);
        } else if (value.startsWith(term)) {
          bestTermScore = Math.max(bestTermScore, weight + 15);
        } else if (value.includes(term)) {
          bestTermScore = Math.max(bestTermScore, weight);
        }
      });
    });
    if (bestTermScore === 0) return 0;
    score += bestTermScore;
  }

  const normalizedQuery = terms.join(" ");
  if (groups.name.some((value) => value === normalizedQuery)) score += 75;
  if (groups.name.some((value) => value.startsWith(normalizedQuery))) score += 35;
  return score;
}

export function itemMatchesGeneralSearch(item = {}, query = "") {
  return getPartSearchScore(item, query) > 0;
}

export function normalizeWorkOrderValue(value) {
  if (value == null) return "";
  return String(value).toLowerCase().trim().replace(/\s+/g, " ");
}

export function buildWorkOrderTokens(workOrders) {
  const tokens = new Set();

  const addTokensForValue = (value) => {
    const normalized = normalizeWorkOrderValue(value);
    if (!normalized) return;

    tokens.add(normalized);

    const compact = normalized.replace(/[^a-z0-9]+/g, "");
    if (compact) {
      tokens.add(compact);
      const digitRuns = compact.match(/\d+/g) || [];
      digitRuns.forEach((entry) => tokens.add(entry));
    }

    normalized
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .forEach((entry) => tokens.add(entry));
  };

  if (Array.isArray(workOrders)) {
    workOrders.forEach((entry) => addTokensForValue(entry?.workOrder ?? entry));
  } else if (workOrders && typeof workOrders === "object") {
    if (Array.isArray(workOrders.workOrders)) {
      workOrders.workOrders.forEach((entry) =>
        addTokensForValue(entry?.workOrder ?? entry)
      );
    }
    addTokensForValue(workOrders.wo);
    addTokensForValue(workOrders.workOrder);
  } else {
    addTokensForValue(workOrders);
  }

  const out = Array.from(tokens);
  if (out.length <= 200) return out;

  // Keep larger, more specific tokens when capped.
  out.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    return a.localeCompare(b);
  });
  return out.slice(0, 200);
}

export function normalizeItemAisValue(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "";

  const aisMatch = trimmed.match(/^AIS[\s_-]*(\d+)$/i);
  if (aisMatch) return `AIS${aisMatch[1]}`;

  return trimmed;
}

export function getItemAisLookupValues(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return [];

  const values = new Set([trimmed]);
  const normalized = normalizeItemAisValue(trimmed);
  if (normalized) values.add(normalized);

  const aisMatch = trimmed.match(/^AIS[\s_-]*(\d+)$/i);
  if (aisMatch) {
    values.add(`AIS${aisMatch[1]}`);
    values.add(`ais${aisMatch[1]}`);
    values.add(`AIS ${aisMatch[1]}`);
    values.add(`AIS-${aisMatch[1]}`);
    values.add(`AIS_${aisMatch[1]}`);
  }

  return Array.from(values).filter(Boolean);
}

export async function findExistingItemByAis(db, value, options = {}) {
  const values = getItemAisLookupValues(value);
  if (!db || values.length === 0) return null;

  const ignoredDocIds = new Set(
    [options.ignoreDocId].filter(Boolean).map((entry) => String(entry))
  );
  const collection = db.collection("Test");

  for (const docId of values) {
    const docSnap = await collection.doc(docId).get();
    if (docSnap.exists && !ignoredDocIds.has(docSnap.id)) {
      return { id: docSnap.id, field: "id", value: docId };
    }
  }

  for (const field of ["localSN", "local_sn", "aisNumber"]) {
    for (const lookupValue of values) {
      const snap = await collection
        .where(field, "==", lookupValue)
        .limit(10)
        .get();
      let match = null;
      snap.forEach((docSnap) => {
        if (!match && !ignoredDocIds.has(docSnap.id)) {
          match = { id: docSnap.id, field, value: lookupValue };
        }
      });
      if (match) return match;
    }
  }

  return null;
}

function toEntryMillis(value) {
  if (!value) return null;
  if (typeof value.toMillis === "function") {
    const millis = value.toMillis();
    return Number.isFinite(millis) ? millis : null;
  }
  if (typeof value.toDate === "function") {
    const millis = value.toDate().getTime();
    return Number.isFinite(millis) ? millis : null;
  }
  if (typeof value.seconds === "number") {
    return value.seconds * 1000;
  }
  const millis = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(millis) ? millis : null;
}

export function getMostRecentDatedEntryIndex(entries = []) {
  if (!Array.isArray(entries) || entries.length === 0) return -1;

  let newestIndex = 0;
  let newestMillis = toEntryMillis(entries[0]?.date);

  for (let index = 1; index < entries.length; index += 1) {
    const entryMillis = toEntryMillis(entries[index]?.date);
    if (
      (entryMillis != null && newestMillis == null) ||
      (entryMillis != null &&
        newestMillis != null &&
        entryMillis >= newestMillis) ||
      (entryMillis == null && newestMillis == null)
    ) {
      newestIndex = index;
      newestMillis = entryMillis;
    }
  }

  return newestIndex;
}

export function getMostRecentDatedEntry(entries = [], fallback = null) {
  const index = getMostRecentDatedEntryIndex(entries);
  return index >= 0 ? entries[index] : fallback;
}

export function getItemCreatedDate(item = {}) {
  return (
    item.dateCreated ||
    item.createdAt ||
    item.created_at ||
    item.date ||
    ""
  );
}
