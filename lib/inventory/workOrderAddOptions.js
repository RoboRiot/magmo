export const WORK_ORDER_ADD_COLLECTION = "OpsWorkOrders";
export const MAX_WORK_ORDER_ADD_OPTIONS = 1000;
export const MAX_WORK_ORDER_ADD_SEARCH_RESULTS = 50;

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function documentId(value) {
  const normalized = clean(value, 180);
  return normalized && !/[\/\\\u0000-\u001f\u007f]/.test(normalized)
    ? normalized
    : "";
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value?.toDate === "function") {
    const date = value.toDate();
    return Number.isFinite(date?.getTime?.()) ? date.toISOString() : "";
  }
  if (Number.isFinite(Number(value?.seconds))) {
    return new Date(Number(value.seconds) * 1000).toISOString();
  }
  const parsed = Date.parse(String(value));
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : "";
}

function normalizeWorkflowStatus(data = {}) {
  return clean(
    data.workflowStatus || data.workflowStage || data.status || "unassigned",
    40
  )
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function normalizeSearchQuery(value) {
  return clean(value, 160).toLowerCase();
}

function normalizedNumberQuery(value) {
  return normalizeSearchQuery(value)
    .replace(/^work\s*order\s*/i, "")
    .replace(/^wo\s*/i, "")
    .replace(/^#\s*/, "")
    .trim();
}

function numericWorkOrderValue(value) {
  const normalized = clean(value, 180);
  return /^\d+$/.test(normalized) ? Number(normalized) : -1;
}

function compareWorkOrderOptions(left, right) {
  const leftUpdated = Date.parse(left.updatedAt || "") || 0;
  const rightUpdated = Date.parse(right.updatedAt || "") || 0;
  const leftNumber = numericWorkOrderValue(left.number);
  const rightNumber = numericWorkOrderValue(right.number);
  return (
    rightUpdated - leftUpdated ||
    rightNumber - leftNumber ||
    right.number.localeCompare(left.number, undefined, {
      numeric: true,
      sensitivity: "base",
    }) ||
    left.subject.localeCompare(right.subject, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
}

function canonicalWorkOrderNumberKey(value) {
  return clean(value, 180)
    .toLowerCase()
    .replace(/^work\s*order\s*/, "")
    .replace(/^wo\s*/, "")
    .replace(/^#\s*/, "")
    .replace(/\s+/g, "");
}

function compareDuplicatePreference(left, right) {
  return (
    Number(Boolean(right?.destinationLinked)) -
      Number(Boolean(left?.destinationLinked)) ||
    compareWorkOrderOptions(left, right) ||
    String(left?.id || "").localeCompare(String(right?.id || ""), undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
}

export function dedupeWorkOrderAddOptions(options) {
  const selected = new Map();
  for (const option of Array.isArray(options) ? options : []) {
    if (!option) continue;
    const key = canonicalWorkOrderNumberKey(option.number || option.workOrderId || option.id);
    if (!key) continue;
    const existing = selected.get(key);
    if (!existing || compareDuplicatePreference(option, existing) < 0) {
      selected.set(key, option);
    }
  }
  return Array.from(selected.values());
}

export function serializeWorkOrderAddOption(snapshot) {
  const data = snapshot?.data?.() || {};
  const id = documentId(snapshot?.id);
  if (!id || data.deletedAt) return null;

  const clientId = documentId(data.clientId);
  const machineId = documentId(data.machineId);
  const trailerId = documentId(data.trailerId);
  const clientName = clean(data.clientName || data.customer, 220);
  const destinationType = !clientId
    ? "unlinked"
    : trailerId
      ? "trailer"
      : machineId
        ? "machine"
        : "site";

  return {
    id,
    workOrderId: clean(data.workOrderId || id, 180),
    number: clean(data.number || data.workOrderId || id, 180),
    subject: clean(data.subject || data.description || "Untitled work order", 500),
    workflowStatus: normalizeWorkflowStatus(data),
    clientId,
    clientName,
    clientLocation: clean(data.clientLocation, 500),
    machineId,
    machineName: clean(data.machineName, 220),
    trailerId,
    trailerName: clean(data.trailerName, 220),
    destinationType,
    destinationLinked: Boolean(clientId),
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export function scoreWorkOrderAddOption(option, queryValue) {
  const query = normalizeSearchQuery(queryValue);
  if (!query) return 0;
  const numberQuery = normalizedNumberQuery(query);
  const number = normalizeSearchQuery(option?.number);
  const id = normalizeSearchQuery(option?.id);
  const workOrderId = normalizeSearchQuery(option?.workOrderId);
  if (
    numberQuery &&
    [number, id, workOrderId].some((value) => value === numberQuery)
  ) {
    return 0;
  }
  if (
    numberQuery &&
    [number, id, workOrderId].some((value) => value.startsWith(numberQuery))
  ) {
    return 1;
  }

  const subject = normalizeSearchQuery(option?.subject);
  const destination = [
    option?.clientName,
    option?.clientLocation,
    option?.machineName,
    option?.trailerName,
  ]
    .map(normalizeSearchQuery)
    .filter(Boolean)
    .join(" ");
  if (subject.startsWith(query)) return 2;

  const words = `${subject} ${destination}`.split(/\s+/).filter(Boolean);
  if (words.some((word) => word.startsWith(query))) return 3;

  const haystack = `${number} ${id} ${workOrderId} ${subject} ${destination}`;
  return haystack.includes(query) || (numberQuery && haystack.includes(numberQuery))
    ? 4
    : Number.POSITIVE_INFINITY;
}

export function searchWorkOrderAddOptions(
  options,
  queryValue,
  limit = MAX_WORK_ORDER_ADD_SEARCH_RESULTS
) {
  const safeLimit = Math.max(
    1,
    Math.min(MAX_WORK_ORDER_ADD_SEARCH_RESULTS, Number(limit) || 12)
  );
  const query = normalizeSearchQuery(queryValue);
  const values = (Array.isArray(options) ? options : []).filter(Boolean);
  if (!query) return [...values].sort(compareWorkOrderOptions).slice(0, safeLimit);

  return values
    .map((option) => ({ option, score: scoreWorkOrderAddOption(option, query) }))
    .filter((entry) => Number.isFinite(entry.score))
    .sort(
      (left, right) =>
        left.score - right.score ||
        compareWorkOrderOptions(left.option, right.option)
    )
    .slice(0, safeLimit)
    .map((entry) => entry.option);
}

export async function listWorkOrderAddOptions({
  db,
  query = "",
  resultLimit = MAX_WORK_ORDER_ADD_OPTIONS,
  maxRecords = Number.POSITIVE_INFINITY,
} = {}) {
  if (!db || typeof db.collection !== "function") {
    throw new TypeError("A Firestore database is required.");
  }
  const parsedMaxRecords = Number(maxRecords);
  const safeMaxRecords = Number.isFinite(parsedMaxRecords)
    ? Math.max(1, Math.floor(parsedMaxRecords))
    : Number.POSITIVE_INFINITY;
  const snapshot = await db.collection(WORK_ORDER_ADD_COLLECTION).get();
  const documents = Array.isArray(snapshot?.docs) ? snapshot.docs : [];
  const truncated = Number.isFinite(safeMaxRecords) && documents.length > safeMaxRecords;
  const allOptions = dedupeWorkOrderAddOptions(
    documents
      .slice(0, Number.isFinite(safeMaxRecords) ? safeMaxRecords : undefined)
      .map(serializeWorkOrderAddOption)
      .filter(Boolean)
  );
  const normalizedQuery = normalizeSearchQuery(query);
  const safeResultLimit = Math.max(
    1,
    Math.min(
      normalizedQuery
        ? MAX_WORK_ORDER_ADD_SEARCH_RESULTS
        : MAX_WORK_ORDER_ADD_OPTIONS,
      Number(resultLimit) || (normalizedQuery ? 12 : MAX_WORK_ORDER_ADD_OPTIONS)
    )
  );
  const options = normalizedQuery
    ? searchWorkOrderAddOptions(allOptions, normalizedQuery, safeResultLimit)
    : [...allOptions].sort(compareWorkOrderOptions).slice(0, safeResultLimit);

  return {
    options,
    count: options.length,
    availableCount: allOptions.length,
    truncated,
    maxRecords: Number.isFinite(safeMaxRecords) ? safeMaxRecords : null,
  };
}
