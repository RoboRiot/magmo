"use strict";

const storageUnitContract = require("./storageUnitContract.cjs");

const SOCAL_CLIENT_ID = "AIS17182";
const SOCAL_INTERIOR_MACHINE_ID = "AIS42516";
const ORIGIN_KEEP = "keep_origin";
const ORIGIN_STAGE_VIA_SOCAL = "stage_via_socal";
const MOVEMENT_FROM_WORK_ORDER = "from_work_order";
const MOVEMENT_CURRENT_AT_WORK_ORDER = "current_at_work_order";
const HISTORY_LIMIT = 100;
const MAX_SCAN_CODES = 100;
const LEGACY_ASSOCIATION_FIELDS = Object.freeze([
  "Machine",
  "fromMachine",
  "fromMachineId",
  "machineId",
  "fromClient",
  "clientFrom",
  "Client",
  "fromClientId",
  "fromTrailer",
  "trailerFrom",
  "fromTrailerId",
  "CurrentMachine",
  "currentMachine",
  "currentMachineId",
  "currentClient",
  "clientCurrent",
  "CurrentClient",
  "currentClientId",
  "currentTrailer",
  "trailerCurrent",
  "currentTrailerId",
  "associationTypeFrom",
  "associationTypeCurrent",
]);

class WorkOrderAddContractError extends Error {
  constructor(code, message, details = undefined, statusCode = 400) {
    super(message);
    this.name = "WorkOrderAddContractError";
    this.code = code;
    this.statusCode = statusCode;
    if (details !== undefined) this.details = details;
  }
}

function fail(code, message, details) {
  throw new WorkOrderAddContractError(code, message, details);
}

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function normalizeOperationId(value) {
  const operationId = clean(value, 180);
  if (!operationId) {
    fail("operation_id_required", "A work-order-add operation ID is required.");
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$/.test(operationId)) {
    fail(
      "invalid_operation_id",
      "The work-order-add operation ID contains unsupported characters."
    );
  }
  return operationId;
}

function normalizeOriginChoice(value) {
  const normalized = clean(value, 80)
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (!normalized) return "";
  if (
    [
      ORIGIN_KEEP,
      "keep",
      "keep_as_is",
      "keep_current",
      "keep_recorded_origin",
    ].includes(normalized)
  ) {
    return ORIGIN_KEEP;
  }
  if (
    [
      ORIGIN_STAGE_VIA_SOCAL,
      "stage",
      "via_socal",
      "change_to_socal",
      "move_through_socal",
    ].includes(normalized)
  ) {
    return ORIGIN_STAGE_VIA_SOCAL;
  }
  fail(
    "invalid_origin_choice",
    `originChoice must be ${ORIGIN_KEEP} or ${ORIGIN_STAGE_VIA_SOCAL}.`
  );
}

function normalizeMovementMode(value) {
  const movementMode = clean(value, 80);
  if (
    movementMode === MOVEMENT_FROM_WORK_ORDER ||
    movementMode === MOVEMENT_CURRENT_AT_WORK_ORDER
  ) {
    return movementMode;
  }
  fail(
    "invalid_movement_mode",
    `movementMode must be ${MOVEMENT_FROM_WORK_ORDER} or ${MOVEMENT_CURRENT_AT_WORK_ORDER}.`
  );
}

function normalizeOneScanCode(value) {
  const candidate = clean(value, 200);
  if (!candidate) return "";
  if (["not found", "not%20found", "no result"].includes(candidate.toLowerCase())) {
    return "";
  }
  const containerId = storageUnitContract.normalizeStorageUnitId(candidate);
  if (containerId) return containerId;
  return candidate;
}

function normalizeScanCodes(values, maxCodes = MAX_SCAN_CODES) {
  const input = Array.isArray(values)
    ? values
    : typeof values === "string"
      ? values.split(/\r?\n/)
      : [];
  const limit = Math.max(
    1,
    Math.min(MAX_SCAN_CODES, Number(maxCodes) || MAX_SCAN_CODES)
  );
  if (input.length > limit) {
    fail(
      "too_many_scan_codes",
      `A work-order-add list can contain at most ${limit} scans.`,
      { limit }
    );
  }
  const seen = new Set();
  const result = [];
  for (const value of input) {
    const code = normalizeOneScanCode(value);
    if (!code) continue;
    const key = code.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(code);
  }
  return result;
}

function normalizeSearchText(value) {
  return clean(value, 1000).toLowerCase().replace(/\s+/g, " ");
}

function normalizeWorkOrderNumber(value) {
  return clean(value, 100)
    .replace(/^work\s*order\s*/i, "")
    .replace(/^wo\s*/i, "")
    .replace(/^#+\s*/, "")
    .trim();
}

function timestampText(value) {
  if (!value) return "";
  if (typeof value === "string") return clean(value, 100);
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value.toISOString();
  }
  if (typeof value.toDate === "function") {
    try {
      return timestampText(value.toDate());
    } catch {
      return "";
    }
  }
  if (typeof value.seconds === "number") {
    const millis = value.seconds * 1000 + Math.floor(Number(value.nanoseconds || 0) / 1e6);
    const date = new Date(millis);
    return Number.isFinite(date.getTime()) ? date.toISOString() : "";
  }
  return "";
}

function normalizeWorkOrderOption(value) {
  const source = typeof value === "string" || typeof value === "number"
    ? { number: value, id: value }
    : value && typeof value === "object"
      ? value
      : {};
  const blueFolderId =
    source.blueFolder && typeof source.blueFolder === "object"
      ? source.blueFolder.serviceRequestId
      : "";
  const number = normalizeWorkOrderNumber(
    source.number ||
      source.workOrder ||
      source.workOrderNumber ||
      source.serviceRequestId ||
      blueFolderId ||
      source.id
  );
  const id = clean(source.id || source.workOrderId || number, 180);
  if (!id || !number) return null;

  const option = {
    id,
    number,
    subject: clean(source.subject || source.title || source.name, 500),
    clientId: clean(source.clientId, 180),
    clientName: clean(source.clientName || source.customerName, 240),
    clientLocation: clean(source.clientLocation || source.location, 500),
    machineId: clean(source.machineId, 180),
    machineName: clean(source.machineName || source.equipmentName, 240),
    trailerId: clean(source.trailerId, 180),
    trailerName: clean(source.trailerName, 240),
    workflowStatus: clean(source.workflowStatus, 80),
    status: clean(source.status, 80),
    updatedAt: timestampText(source.updatedAt || source.createdAt),
    deleted: Boolean(source.deleted || source.deletedAt),
  };
  option.label = [`#${option.number}`, option.subject].filter(Boolean).join(" · ");
  option.searchText = normalizeSearchText(
    [
      option.id,
      option.number,
      option.subject,
      option.clientName,
      option.clientLocation,
      option.machineName,
      option.trailerName,
      option.workflowStatus,
      option.status,
    ]
      .filter(Boolean)
      .join(" ")
  );
  return option;
}

function numericWorkOrderValue(value) {
  const digits = normalizeWorkOrderNumber(value).match(/\d+/g);
  if (!digits?.length) return -1;
  const number = Number(digits.join(""));
  return Number.isSafeInteger(number) ? number : -1;
}

function workOrderSearchScore(option, query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return 1;
  const compact = normalized.replace(/[^a-z0-9]+/g, "");
  const number = normalizeSearchText(option.number);
  const id = normalizeSearchText(option.id);
  const compactNumber = number.replace(/[^a-z0-9]+/g, "");
  const compactId = id.replace(/[^a-z0-9]+/g, "");
  let score = 0;

  if (normalized === number || compact === compactNumber) score += 100000;
  else if (number.startsWith(normalized) || compactNumber.startsWith(compact)) score += 50000;
  else if (number.includes(normalized) || compactNumber.includes(compact)) score += 20000;

  if (normalized === id || compact === compactId) score += 80000;
  else if (id.startsWith(normalized) || compactId.startsWith(compact)) score += 35000;
  else if (id.includes(normalized) || compactId.includes(compact)) score += 15000;

  const weightedFields = [
    [option.subject, 7000],
    [option.clientName, 6000],
    [option.machineName, 5000],
    [option.trailerName, 4500],
    [option.clientLocation, 3500],
    [option.workflowStatus, 1200],
    [option.status, 1000],
  ];
  for (const [rawField, weight] of weightedFields) {
    const field = normalizeSearchText(rawField);
    if (!field) continue;
    if (field === normalized) score += weight * 4;
    else if (field.startsWith(normalized)) score += weight * 2;
    else if (field.includes(normalized)) score += weight;
  }

  const tokens = normalized.split(" ").filter(Boolean);
  const tokenMatches = tokens.filter((token) => option.searchText.includes(token)).length;
  if (tokens.length && tokenMatches === tokens.length) score += 9000 + tokens.length * 400;
  else score += tokenMatches * 200;
  return score;
}

function searchWorkOrderOptions(values, query = "", options = {}) {
  const limitInput = typeof options === "number" ? options : options?.limit;
  const limit = Math.max(1, Math.min(100, Number(limitInput) || 25));
  const deduped = new Map();
  for (const value of Array.isArray(values) ? values : []) {
    const option = normalizeWorkOrderOption(value);
    if (!option || option.deleted) continue;
    // Magmo can temporarily contain two documents for the same numbered work
    // order after recovery/reconciliation. The picker represents the business
    // work order, so its canonical number is the dedupe identity.
    const key = option.number.toLowerCase();
    if (!deduped.has(key)) deduped.set(key, option);
  }

  const normalizedQuery = normalizeSearchText(query);
  return Array.from(deduped.values())
    .map((option) => ({ option, score: workOrderSearchScore(option, normalizedQuery) }))
    .filter((entry) => !normalizedQuery || entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      const numberDifference =
        numericWorkOrderValue(right.option.number) -
        numericWorkOrderValue(left.option.number);
      if (numberDifference) return numberDifference;
      return left.option.label.localeCompare(right.option.label, "en", {
        numeric: true,
        sensitivity: "base",
      });
    })
    .slice(0, limit)
    .map(({ option, score }) => ({ ...option, matchScore: score }));
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    const parts = value.split("/").filter(Boolean);
    return clean(parts[parts.length - 1] || value, 180);
  }
  if (value.id) return clean(value.id, 180);
  if (value.path) return referenceId(value.path);
  return "";
}

function normalizeAssociationType(value, { machineId = "", trailerId = "" } = {}) {
  const type = clean(value, 40).toLowerCase();
  if (type) {
    if (!["site", "machine", "trailer"].includes(type)) {
      fail("invalid_association_type", "An association type must be site, machine, or trailer.");
    }
    return type;
  }
  if (trailerId) return "trailer";
  if (machineId) return "machine";
  return "site";
}

function buildAssociationSnapshot(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail("invalid_association", "An item association must be an object.");
  }
  const client = value.client && typeof value.client === "object" ? value.client : {};
  const machine = value.machine && typeof value.machine === "object" ? value.machine : {};
  const trailer = value.trailer && typeof value.trailer === "object" ? value.trailer : {};
  const clientId = referenceId(value.clientId || value.clientRef || client);
  const machineId = referenceId(value.machineId || value.machineRef || machine);
  const trailerId = referenceId(value.trailerId || value.trailerRef || trailer);
  const associationType = normalizeAssociationType(
    value.associationType || value.type,
    { machineId, trailerId }
  );
  if (!clientId) {
    fail("association_client_required", "An item association requires a client.");
  }
  if (associationType !== "site" && !machineId) {
    fail("association_machine_required", `${associationType} associations require a machine.`);
  }
  if (associationType === "trailer" && !trailerId) {
    fail("association_trailer_required", "Trailer associations require a trailer.");
  }

  return {
    schemaVersion: 2,
    associationType,
    clientId,
    clientNameSnapshot: clean(
      value.clientNameSnapshot || value.clientName || client.name,
      240
    ),
    clientLocationSnapshot: clean(
      value.clientLocationSnapshot ||
        value.clientLocation ||
        client.location ||
        client.local,
      500
    ),
    machineId: associationType === "site" ? "" : machineId,
    machineNameSnapshot:
      associationType === "site"
        ? ""
        : clean(value.machineNameSnapshot || value.machineName || machine.name, 240),
    trailerId: associationType === "trailer" ? trailerId : "",
    trailerNameSnapshot:
      associationType === "trailer"
        ? clean(value.trailerNameSnapshot || value.trailerName || trailer.name, 240)
        : "",
    effectiveAt: clean(value.effectiveAt, 100),
    effectiveAtSource: clean(value.effectiveAtSource || "work-order-add", 100),
    resolutionSource: clean(value.resolutionSource || "work-order-add", 100),
  };
}

function itemBranchAssociation(itemData, branch) {
  const current = branch === "current";
  const map = current ? itemData.associationCurrent : itemData.associationFrom;
  const source = map && typeof map === "object" ? map : {};
  const clientRef = current ? itemData.ClientCurrent : itemData.ClientFrom;
  const machineRef = current
    ? itemData.MachineCurrent || itemData.CurrentMachine
    : itemData.MachineFrom || itemData.Machine;
  const trailerRef = current ? itemData.TrailerCurrent : itemData.TrailerFrom;
  return buildAssociationSnapshot({
    ...source,
    associationType:
      (current ? itemData.currentAssociationType : itemData.fromAssociationType) ||
      source.associationType,
    clientId:
      source.clientId ||
      (current ? itemData.clientCurrentId : itemData.clientFromId) ||
      referenceId(clientRef),
    machineId:
      source.machineId ||
      (current ? itemData.machineCurrentId || itemData.currentMachineId : itemData.machineFromId) ||
      referenceId(machineRef),
    trailerId:
      source.trailerId ||
      (current ? itemData.trailerCurrentId : itemData.trailerFromId) ||
      referenceId(trailerRef),
  });
}

function lookupTrailerClientId(trailerClientById, trailerId) {
  if (!trailerClientById || !trailerId) return "";
  if (typeof trailerClientById === "function") {
    return referenceId(trailerClientById(trailerId));
  }
  if (trailerClientById instanceof Map) {
    return referenceId(trailerClientById.get(trailerId));
  }
  if (typeof trailerClientById === "object") {
    return referenceId(trailerClientById[trailerId]);
  }
  return "";
}

function isSocalAssociation(value, options = {}) {
  let association;
  try {
    association = buildAssociationSnapshot(value);
  } catch {
    return false;
  }
  const socalClientId = clean(options.socalClientId || SOCAL_CLIENT_ID, 180);
  const socalMachineId = clean(
    options.socalMachineId ||
      options.socalInteriorMachineId ||
      SOCAL_INTERIOR_MACHINE_ID,
    180
  );
  if (association.clientId === socalClientId) return true;
  if (association.machineId && association.machineId === socalMachineId) return true;

  const socalTrailerIds = options.socalTrailerIds instanceof Set
    ? options.socalTrailerIds
    : new Set(Array.isArray(options.socalTrailerIds) ? options.socalTrailerIds : []);
  if (association.trailerId && socalTrailerIds.has(association.trailerId)) return true;
  return Boolean(
    association.trailerId &&
      lookupTrailerClientId(options.trailerClientById, association.trailerId) === socalClientId
  );
}

function normalizeActor(value) {
  const actor = value && typeof value === "object" ? value : {};
  const uid = clean(actor.uid, 180);
  const email = clean(actor.email, 320).toLowerCase();
  const name = clean(
    actor.name || actor.displayName || actor.magmoName || email,
    180
  );
  if (!uid || !email) {
    fail(
      "actor_required",
      "An authenticated user with a UID and email is required for a work-order add."
    );
  }
  return { uid, email, name: name || email };
}

function normalizeIso(value) {
  const text = clean(value, 100);
  const date = text ? new Date(text) : new Date();
  if (!Number.isFinite(date.getTime())) {
    fail("invalid_timestamp", "The work-order-add timestamp is invalid.");
  }
  return date.toISOString();
}

function normalizeMovementDate(value, nowIso) {
  const date = clean(value, 100);
  return date || nowIso.slice(0, 10);
}

function cloneLocalLocation(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const next = {};
  if (value.region != null && value.region !== "") next.region = value.region;
  if (value.section && typeof value.section === "object") {
    const letter = clean(value.section.letter, 20);
    const number = value.section.number;
    if (letter && number !== "" && number != null) {
      next.section = { letter, number };
    }
  }
  if (value.bin != null && value.bin !== "") next.bin = value.bin;
  if (value.pallet != null && value.pallet !== "") next.pallet = value.pallet;
  return next;
}

function currentLocalLocation(itemData) {
  const current =
    itemData.newLocalCurrent && typeof itemData.newLocalCurrent === "object"
      ? itemData.newLocalCurrent
      : {};
  return cloneLocalLocation({
    region: current.region ?? itemData.region ?? itemData.Region ?? "",
    section: current.section ?? itemData.section ?? itemData.Section ?? null,
    bin: current.bin ?? itemData.bin ?? itemData.Bin ?? "",
    pallet: current.pallet ?? itemData.pallet ?? itemData.Pallet ?? "",
  });
}

function formatLocalLocation(value) {
  const parts = [];
  if (value?.region) parts.push(String(value.region));
  if (value?.section?.letter && value.section.number !== "" && value.section.number != null) {
    parts.push(`${value.section.letter}${value.section.number}`);
  }
  if (value?.bin !== "" && value?.bin != null) parts.push(`B${value.bin}`);
  if (value?.pallet !== "" && value?.pallet != null) parts.push(`P${value.pallet}`);
  return parts.join("–");
}

function historyAssociationFields(prefix, association) {
  return {
    [`${prefix}AssociationType`]: association.associationType,
    [`${prefix}ClientId`]: association.clientId,
    [`${prefix}ClientName`]: association.clientNameSnapshot,
    [`${prefix}MachineId`]: association.machineId,
    [`${prefix}MachineName`]: association.machineNameSnapshot,
    [`${prefix}TrailerId`]: association.trailerId,
    [`${prefix}TrailerName`]: association.trailerNameSnapshot,
  };
}

function buildHistoryEntry({
  from,
  current,
  fromLocalLocation,
  fromLocalLocationText,
  currentLocalLocation,
  currentLocalLocationText,
  workOrderNumber,
  movementDate,
  nowIso,
  actor,
  operationId,
  label,
  transitionKind,
  transitionIndex,
  transitionCount,
}) {
  return {
    ...historyAssociationFields("from", from),
    ...historyAssociationFields("current", current),
    fromLocalLocation: cloneLocalLocation(fromLocalLocation),
    fromLocalLocationText: clean(fromLocalLocationText, 500),
    currentLocalLocation: cloneLocalLocation(currentLocalLocation),
    currentLocalLocationText: clean(currentLocalLocationText, 500),
    workOrder: workOrderNumber,
    movementDateType: "departure",
    movementDate,
    arrivalDate: "",
    departureDate: movementDate,
    savedAt: nowIso,
    savedByEmail: actor.email,
    action: "work_order_add",
    label,
    operationId,
    actor: { ...actor },
    transitionKind,
    transitionIndex,
    transitionCount,
  };
}

function boundedAppend(existing, additions) {
  const safe = Array.isArray(existing) ? existing : [];
  return [...safe, ...additions];
}

function workOrderEntryKey(entry) {
  if (entry == null) return "";
  if (typeof entry === "string" || typeof entry === "number") {
    return normalizeWorkOrderNumber(entry).toLowerCase();
  }
  return normalizeWorkOrderNumber(
    entry.workOrder || entry.number || entry.workOrderNumber || entry.id
  ).toLowerCase();
}

function appendWorkOrder(existing, workOrder, date) {
  const selectedKey = workOrder.number.toLowerCase();
  const safeExisting = Array.isArray(existing) ? existing : [];
  if (safeExisting.some((entry) => workOrderEntryKey(entry) === selectedKey)) {
    return safeExisting;
  }
  return [...safeExisting, { workOrder: workOrder.number, date }];
}

function buildWorkOrderTokens(workOrders) {
  const tokens = new Set();
  const add = (value) => {
    const normalized = normalizeSearchText(value);
    if (!normalized) return;
    tokens.add(normalized);
    const compact = normalized.replace(/[^a-z0-9]+/g, "");
    if (compact) {
      tokens.add(compact);
      for (const digits of compact.match(/\d+/g) || []) tokens.add(digits);
    }
  };
  for (const entry of Array.isArray(workOrders) ? workOrders : []) {
    if (entry && typeof entry === "object") {
      add(entry.workOrder || entry.number || entry.id);
    } else {
      add(entry);
    }
  }
  return Array.from(tokens);
}

function uniqueMachineIds(values) {
  return Array.from(
    new Set((Array.isArray(values) ? values : []).map(referenceId).filter(Boolean))
  ).sort((left, right) => left.localeCompare(right, "en", { numeric: true }));
}

function previousMachineIdsFromItem(itemData) {
  const values = [
    itemData.associationFrom?.machineId,
    itemData.associationCurrent?.machineId,
    itemData.machineFromId,
    itemData.machineCurrentId,
    itemData.currentMachineId,
    itemData.MachineFrom,
    itemData.MachineCurrent,
    itemData.Machine,
    itemData.CurrentMachine,
    itemData.fromMachine,
    itemData.fromMachineId,
    itemData.machineId,
    itemData.currentMachine,
  ];
  return uniqueMachineIds(values);
}

function setAssociationBranch(nextItem, branch, association) {
  const from = branch === "from";
  const title = from ? "From" : "Current";
  const lower = from ? "from" : "current";
  nextItem[`association${title}`] = { ...association };
  nextItem[`${lower}AssociationType`] = association.associationType;
  nextItem[`client${title}Id`] = association.clientId;
  nextItem[`machine${title}Id`] = association.machineId;
  nextItem[`trailer${title}Id`] = association.trailerId;

  // A pure contract cannot construct Firestore DocumentReferences. Nulling the
  // old values prevents a stale reference from disagreeing with the canonical
  // IDs; the server mutation layer replaces these with authoritative refs.
  nextItem[`Client${title}`] = null;
  nextItem[`Machine${title}`] = null;
  nextItem[`Trailer${title}`] = null;
  if (from) nextItem.Machine = null;
  else nextItem.CurrentMachine = null;
}

function associationMatchesWorkOrder(destination, workOrder) {
  const checks = [
    ["client", workOrder.clientId, destination.clientId],
    ["machine", workOrder.machineId, destination.machineId],
    ["trailer", workOrder.trailerId, destination.trailerId],
  ];
  const mismatch = checks.find(([, expected, actual]) => expected && expected !== actual);
  if (mismatch) {
    fail(
      "work_order_destination_mismatch",
      `The destination ${mismatch[0]} does not match the selected work order.`,
      { expected: mismatch[1], actual: mismatch[2] }
    );
  }
}

function buildWorkOrderAddPlan({
  itemId,
  itemData,
  currentAssociation,
  destinationAssociation,
  socalAssociation,
  isCurrentSocal,
  originChoice,
  actor,
  workOrder,
  operationId,
  nowIso,
  date,
} = {}) {
  const normalizedItemId = clean(itemId, 180);
  if (!normalizedItemId || normalizedItemId.includes("/")) {
    fail("invalid_item_id", "A valid inventory item ID is required.");
  }
  if (!itemData || typeof itemData !== "object" || Array.isArray(itemData)) {
    fail("item_required", "The live inventory item data is required.");
  }
  if (itemData.deleted || itemData.deletedAt) {
    fail("item_deleted", "A deleted inventory item cannot be added to a work order.");
  }
  for (const field of ["selectionHistory", "saveHistory"]) {
    if (itemData[field] !== undefined && !Array.isArray(itemData[field])) {
      fail(
        "invalid_item_history",
        `The item's ${field} is malformed, so Magmo will not overwrite it.`
      );
    }
  }

  const normalizedOperationId = normalizeOperationId(operationId);
  const normalizedActor = normalizeActor(actor);
  const normalizedWorkOrder = normalizeWorkOrderOption(workOrder);
  if (!normalizedWorkOrder) {
    fail("work_order_required", "Select a valid Magmo work order.");
  }
  const normalizedNowIso = normalizeIso(nowIso);
  const movementDate = normalizeMovementDate(date, normalizedNowIso);
  const before = currentAssociation
    ? buildAssociationSnapshot(currentAssociation)
    : itemBranchAssociation(itemData, "current");
  const destination = buildAssociationSnapshot(destinationAssociation);
  associationMatchesWorkOrder(destination, normalizedWorkOrder);

  const detectedSocal = isSocalAssociation(before);
  const currentIsSocal = Boolean(isCurrentSocal) || detectedSocal;
  let normalizedOriginChoice = currentIsSocal ? "already_socal" : normalizeOriginChoice(originChoice);
  if (!currentIsSocal && !normalizedOriginChoice) {
    fail(
      "origin_choice_required",
      "Choose whether to preserve the recorded origin or stage the item through SoCal."
    );
  }

  let socal = null;
  if (normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL) {
    socal = buildAssociationSnapshot(socalAssociation);
    if (!isSocalAssociation(socal)) {
      fail(
        "invalid_socal_association",
        "The staging association must resolve to the SoCal warehouse."
      );
    }
  }

  const existingLocalCurrent = currentLocalLocation(itemData);
  const existingLocalCurrentText =
    clean(itemData.localLocCurrent, 500) || formatLocalLocation(existingLocalCurrent);
  const socalLocal = cloneLocalLocation(
    socalAssociation?.localLocation || socalAssociation?.newLocalCurrent
  );
  const socalLocalText =
    clean(socalAssociation?.localLocCurrent, 500) || formatLocalLocation(socalLocal);

  const label = `Work order add by ${normalizedActor.name}`;
  const transitionPairs = normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL
    ? [
        {
          kind: "stage_at_socal",
          from: before,
          current: socal,
          fromLocalLocation: existingLocalCurrent,
          fromLocalLocationText: existingLocalCurrentText,
          currentLocalLocation: socalLocal,
          currentLocalLocationText: socalLocalText,
        },
        {
          kind: "dispatch_to_work_order",
          from: socal,
          current: destination,
          fromLocalLocation: socalLocal,
          fromLocalLocationText: socalLocalText,
          currentLocalLocation: {},
          currentLocalLocationText: "",
        },
      ]
    : [
        {
          kind: "dispatch_to_work_order",
          from: before,
          current: destination,
          fromLocalLocation: existingLocalCurrent,
          fromLocalLocationText: existingLocalCurrentText,
          currentLocalLocation: {},
          currentLocalLocationText: "",
        },
      ];
  const historyEntries = transitionPairs.map((transition, index) =>
    buildHistoryEntry({
      from: transition.from,
      current: transition.current,
      fromLocalLocation: transition.fromLocalLocation,
      fromLocalLocationText: transition.fromLocalLocationText,
      currentLocalLocation: transition.currentLocalLocation,
      currentLocalLocationText: transition.currentLocalLocationText,
      workOrderNumber: normalizedWorkOrder.number,
      movementDate,
      nowIso: normalizedNowIso,
      actor: normalizedActor,
      operationId: normalizedOperationId,
      label,
      transitionKind: transition.kind,
      transitionIndex: index + 1,
      transitionCount: transitionPairs.length,
    })
  );
  const transitions = transitionPairs.map((transition, index) => ({
    kind: transition.kind,
    fromAssociation: { ...transition.from },
    currentAssociation: { ...transition.current },
    historyEntry: historyEntries[index],
  }));

  const finalFrom = normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL ? socal : before;
  const finalFromLocal = normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL
    ? socalLocal
    : existingLocalCurrent;
  const finalFromLocalText = normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL
    ? socalLocalText
    : existingLocalCurrentText;

  const nextWorkOrders = appendWorkOrder(
    itemData.workOrders,
    normalizedWorkOrder,
    movementDate
  );
  const saveEntry = {
    savedAt: normalizedNowIso,
    savedByEmail: normalizedActor.email,
    action: "work_order_add",
    label,
    workOrder: normalizedWorkOrder.number,
    operationId: normalizedOperationId,
    actor: { ...normalizedActor },
  };
  const nextWorkOrderTokens = buildWorkOrderTokens(nextWorkOrders);
  const nextGeneralSearchTokens = Array.from(
    new Set([
      ...nextWorkOrderTokens,
      ...(Array.isArray(itemData.generalSearchTokens)
        ? itemData.generalSearchTokens.map((value) => normalizeSearchText(value)).filter(Boolean)
        : []),
    ])
  ).slice(0, 1500);
  const nextItem = {
    ...itemData,
    associationSchemaVersion: 2,
    newLocalFrom: finalFromLocal,
    localLocFrom: finalFromLocalText,
    newLocalCurrent: {},
    localLocCurrent: "",
    region: "",
    Region: "",
    section: null,
    Section: null,
    bin: "",
    Bin: "",
    pallet: "",
    Pallet: "",
    movementDateType: "departure",
    movementDate,
    departure_date: movementDate,
    selectionHistory: boundedAppend(itemData.selectionHistory, historyEntries),
    saveHistory: boundedAppend(itemData.saveHistory, [saveEntry]),
    workOrders: nextWorkOrders,
    workOrderTokens: nextWorkOrderTokens,
    generalSearchTokens: nextGeneralSearchTokens,
    lastEdited: normalizedActor.email,
  };
  setAssociationBranch(nextItem, "from", finalFrom);
  setAssociationBranch(nextItem, "current", destination);

  const previousMachineIds = previousMachineIdsFromItem(itemData);
  const nextMachineIds = uniqueMachineIds([finalFrom.machineId, destination.machineId]);
  const audit = {
    schemaVersion: 1,
    type: "work-order-add",
    action: "work_order_add",
    label,
    operationId: normalizedOperationId,
    itemId: normalizedItemId,
    workOrder: {
      id: normalizedWorkOrder.id,
      number: normalizedWorkOrder.number,
      subject: normalizedWorkOrder.subject,
    },
    actor: { ...normalizedActor },
    occurredAt: normalizedNowIso,
    movementDate,
    originChoice: normalizedOriginChoice,
    currentWasSocal: currentIsSocal,
    beforeAssociation: { ...before },
    beforeLocalLocation: existingLocalCurrent,
    beforeLocalLocationText: existingLocalCurrentText,
    intermediateAssociation: socal ? { ...socal } : null,
    intermediateLocalLocation:
      normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL ? socalLocal : null,
    intermediateLocalLocationText:
      normalizedOriginChoice === ORIGIN_STAGE_VIA_SOCAL ? socalLocalText : "",
    afterAssociation: { ...destination },
    previousMachineIds,
    nextMachineIds,
    transitionCount: transitions.length,
  };

  return {
    itemId: normalizedItemId,
    nextItem,
    transitions,
    previousMachineIds,
    nextMachineIds,
    audit,
  };
}

function exactItemField(itemData, field) {
  return Object.prototype.hasOwnProperty.call(itemData, field)
    ? itemData[field]
    : null;
}

function snapshotPriorConfiguration(itemData) {
  const legacyAssociationFields = Object.fromEntries(
    LEGACY_ASSOCIATION_FIELDS.map((field) => [
      field,
      exactItemField(itemData, field),
    ])
  );
  return {
    ...legacyAssociationFields,
    associationFrom: exactItemField(itemData, "associationFrom"),
    associationCurrent: exactItemField(itemData, "associationCurrent"),
    fromAssociationType: exactItemField(itemData, "fromAssociationType"),
    currentAssociationType: exactItemField(itemData, "currentAssociationType"),
    clientFromId: exactItemField(itemData, "clientFromId"),
    machineFromId: exactItemField(itemData, "machineFromId"),
    trailerFromId: exactItemField(itemData, "trailerFromId"),
    clientCurrentId: exactItemField(itemData, "clientCurrentId"),
    machineCurrentId: exactItemField(itemData, "machineCurrentId"),
    trailerCurrentId: exactItemField(itemData, "trailerCurrentId"),
    ClientFrom: exactItemField(itemData, "ClientFrom"),
    MachineFrom: exactItemField(itemData, "MachineFrom"),
    TrailerFrom: exactItemField(itemData, "TrailerFrom"),
    ClientCurrent: exactItemField(itemData, "ClientCurrent"),
    MachineCurrent: exactItemField(itemData, "MachineCurrent"),
    TrailerCurrent: exactItemField(itemData, "TrailerCurrent"),
    newLocalFrom: exactItemField(itemData, "newLocalFrom"),
    localLocFrom: exactItemField(itemData, "localLocFrom"),
    newLocalCurrent: exactItemField(itemData, "newLocalCurrent"),
    localLocCurrent: exactItemField(itemData, "localLocCurrent"),
    region: exactItemField(itemData, "region"),
    Region: exactItemField(itemData, "Region"),
    section: exactItemField(itemData, "section"),
    Section: exactItemField(itemData, "Section"),
    bin: exactItemField(itemData, "bin"),
    Bin: exactItemField(itemData, "Bin"),
    pallet: exactItemField(itemData, "pallet"),
    Pallet: exactItemField(itemData, "Pallet"),
    workOrder: exactItemField(itemData, "workOrder"),
    workOrders: exactItemField(itemData, "workOrders"),
    movementDateType: exactItemField(itemData, "movementDateType"),
    movementDate: exactItemField(itemData, "movementDate"),
    arrivalDate: exactItemField(itemData, "arrivalDate"),
    departureDate: exactItemField(itemData, "departureDate"),
    arrival_date: exactItemField(itemData, "arrival_date"),
    departure_date: exactItemField(itemData, "departure_date"),
  };
}

function priorHistoryAssociationFields(prefix, configuration, branch) {
  const raw = configuration[`association${branch}`];
  const association = raw && typeof raw === "object" && !Array.isArray(raw)
    ? raw
    : {};
  const current = branch === "Current";
  const firstReferenceId = (...values) => {
    for (const value of values) {
      const id = referenceId(value);
      if (id) return id;
    }
    return "";
  };
  const legacyClientValues = current
    ? [
        configuration.currentClient,
        configuration.clientCurrent,
        configuration.CurrentClient,
        configuration.currentClientId,
      ]
    : [
        configuration.fromClient,
        configuration.clientFrom,
        configuration.Client,
        configuration.fromClientId,
      ];
  const legacyMachineValues = current
    ? [
        configuration.CurrentMachine,
        configuration.currentMachine,
        configuration.currentMachineId,
      ]
    : [
        configuration.Machine,
        configuration.fromMachine,
        configuration.fromMachineId,
        configuration.machineId,
      ];
  const legacyTrailerValues = current
    ? [
        configuration.currentTrailer,
        configuration.trailerCurrent,
        configuration.currentTrailerId,
      ]
    : [
        configuration.fromTrailer,
        configuration.trailerFrom,
        configuration.fromTrailerId,
      ];
  return {
    [`${prefix}AssociationType`]: clean(
      configuration[`${prefix}AssociationType`] ||
        configuration[`associationType${branch}`] ||
        association.associationType,
      40
    ),
    [`${prefix}ClientId`]: firstReferenceId(
      association.clientId ||
        configuration[`client${branch}Id`] ||
        configuration[`Client${branch}`],
      ...legacyClientValues
    ),
    [`${prefix}ClientName`]: clean(
      association.clientNameSnapshot || association.clientName,
      240
    ),
    [`${prefix}MachineId`]: firstReferenceId(
      association.machineId ||
        configuration[`machine${branch}Id`] ||
        configuration[`Machine${branch}`],
      ...legacyMachineValues
    ),
    [`${prefix}MachineName`]: clean(
      association.machineNameSnapshot || association.machineName,
      240
    ),
    [`${prefix}TrailerId`]: firstReferenceId(
      association.trailerId ||
        configuration[`trailer${branch}Id`] ||
        configuration[`Trailer${branch}`],
      ...legacyTrailerValues
    ),
    [`${prefix}TrailerName`]: clean(
      association.trailerNameSnapshot || association.trailerName,
      240
    ),
  };
}

function priorWorkOrderNumber(configuration) {
  const singularSource = configuration.workOrder;
  const singular = normalizeWorkOrderNumber(
    singularSource && typeof singularSource === "object"
      ? singularSource.workOrder ||
          singularSource.number ||
          singularSource.workOrderNumber ||
          singularSource.id
      : singularSource
  );
  if (singular) return singular;
  const entries = Array.isArray(configuration.workOrders)
    ? configuration.workOrders
    : [];
  if (!entries.length) return "";
  const latest = entries.reduce((selected, candidate) => {
    const selectedTime = Date.parse(selected?.date || "");
    const candidateTime = Date.parse(candidate?.date || "");
    return Number.isFinite(candidateTime) &&
      (!Number.isFinite(selectedTime) || candidateTime > selectedTime)
      ? candidate
      : selected;
  }, entries[0]);
  return normalizeWorkOrderNumber(
    latest && typeof latest === "object"
      ? latest.workOrder || latest.number || latest.workOrderNumber || latest.id
      : latest
  );
}

function buildWorkOrderMovementPlan({
  itemId,
  itemData,
  destinationAssociation,
  socalAssociation,
  movementMode,
  actor,
  workOrder,
  operationId,
  nowIso,
  date,
} = {}) {
  const normalizedItemId = clean(itemId, 180);
  if (!normalizedItemId || normalizedItemId.includes("/")) {
    fail("invalid_item_id", "A valid inventory item ID is required.");
  }
  if (!itemData || typeof itemData !== "object" || Array.isArray(itemData)) {
    fail("item_required", "The live inventory item data is required.");
  }
  if (itemData.deleted || itemData.deletedAt) {
    fail("item_deleted", "A deleted inventory item cannot be added to a work order.");
  }
  for (const field of ["selectionHistory", "saveHistory", "workOrders"]) {
    if (itemData[field] !== undefined && !Array.isArray(itemData[field])) {
      fail(
        field === "workOrders" ? "invalid_work_orders" : "invalid_item_history",
        `The item's ${field} is malformed, so Magmo will not overwrite it.`
      );
    }
  }

  const normalizedMovementMode = normalizeMovementMode(movementMode);
  const normalizedOperationId = normalizeOperationId(operationId);
  const normalizedActor = normalizeActor(actor);
  const normalizedWorkOrder = normalizeWorkOrderOption(workOrder);
  if (!normalizedWorkOrder) {
    fail("work_order_required", "Select a valid Magmo work order.");
  }
  const normalizedNowIso = normalizeIso(nowIso);
  const movementDate = normalizeMovementDate(date, normalizedNowIso);
  const destination = buildAssociationSnapshot(destinationAssociation);
  associationMatchesWorkOrder(destination, normalizedWorkOrder);
  const socal = buildAssociationSnapshot(socalAssociation);
  if (
    socal.associationType !== "machine" ||
    socal.clientId !== SOCAL_CLIENT_ID ||
    socal.machineId !== SOCAL_INTERIOR_MACHINE_ID ||
    socal.trailerId
  ) {
    fail(
      "invalid_socal_interior_association",
      "The SoCal endpoint must be the canonical Lake Forest Interior machine."
    );
  }

  const beforeConfiguration = snapshotPriorConfiguration(itemData);
  const fromAssociation =
    normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER ? destination : socal;
  const currentAssociation =
    normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER ? socal : destination;
  const priorCurrentLocal = currentLocalLocation(itemData);
  const priorCurrentLocalText =
    clean(itemData.localLocCurrent, 500) || formatLocalLocation(priorCurrentLocal);
  const resultingFromLocal =
    normalizedMovementMode === MOVEMENT_CURRENT_AT_WORK_ORDER
      ? priorCurrentLocal
      : {};
  const resultingFromLocalText =
    normalizedMovementMode === MOVEMENT_CURRENT_AT_WORK_ORDER
      ? priorCurrentLocalText
      : "";
  const afterConfiguration = {
    associationFrom: { ...fromAssociation },
    associationCurrent: { ...currentAssociation },
    newLocalFrom: resultingFromLocal,
    localLocFrom: resultingFromLocalText,
    newLocalCurrent: {},
    localLocCurrent: "",
  };
  const label = `Work order add by ${normalizedActor.name}`;
  const priorHistoryEntry = {
    schemaVersion: 1,
    historyType: "prior_configuration_snapshot",
    action: "work_order_add",
    label,
    operationId: normalizedOperationId,
    workOrder: priorWorkOrderNumber(beforeConfiguration),
    movementMode: normalizedMovementMode,
    savedAt: normalizedNowIso,
    savedByEmail: normalizedActor.email,
    actor: { ...normalizedActor },
    transitionKind: "prior_configuration",
    transitionIndex: 0,
    transitionCount: 1,
    movementDateType: clean(beforeConfiguration.movementDateType, 40),
    movementDate: clean(beforeConfiguration.movementDate, 100),
    arrivalDate: clean(
      beforeConfiguration.arrivalDate || beforeConfiguration.arrival_date,
      100
    ),
    departureDate: clean(
      beforeConfiguration.departureDate || beforeConfiguration.departure_date,
      100
    ),
    ...priorHistoryAssociationFields("from", beforeConfiguration, "From"),
    ...priorHistoryAssociationFields("current", beforeConfiguration, "Current"),
    fromLocalLocation:
      beforeConfiguration.newLocalFrom &&
      typeof beforeConfiguration.newLocalFrom === "object" &&
      !Array.isArray(beforeConfiguration.newLocalFrom)
        ? beforeConfiguration.newLocalFrom
        : {},
    fromLocalLocationText: clean(beforeConfiguration.localLocFrom, 500),
    currentLocalLocation: priorCurrentLocal,
    currentLocalLocationText: priorCurrentLocalText,
    beforeConfiguration,
  };
  const resultHistoryEntry = {
    ...buildHistoryEntry({
      from: fromAssociation,
      current: currentAssociation,
      fromLocalLocation: resultingFromLocal,
      fromLocalLocationText: resultingFromLocalText,
      currentLocalLocation: {},
      currentLocalLocationText: "",
      workOrderNumber: normalizedWorkOrder.number,
      movementDate,
      nowIso: normalizedNowIso,
      actor: normalizedActor,
      operationId: normalizedOperationId,
      label,
      transitionKind:
        normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER
          ? "work_order_to_socal"
          : "socal_to_work_order",
      transitionIndex: 1,
      transitionCount: 1,
    }),
    schemaVersion: 1,
    historyType: "resulting_configuration",
    movementMode: normalizedMovementMode,
    movementDateType:
      normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER
        ? "arrival"
        : "departure",
    arrivalDate:
      normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER ? movementDate : "",
    departureDate:
      normalizedMovementMode === MOVEMENT_CURRENT_AT_WORK_ORDER
        ? movementDate
        : "",
    beforeConfiguration,
    afterConfiguration,
  };

  const selectedWorkOrderKey = normalizedWorkOrder.number.toLowerCase();
  const workOrderAlreadyAttached = (itemData.workOrders || []).some(
    (entry) => workOrderEntryKey(entry) === selectedWorkOrderKey
  );
  const nextWorkOrders = appendWorkOrder(
    itemData.workOrders,
    normalizedWorkOrder,
    movementDate
  );
  const nextWorkOrderTokens = buildWorkOrderTokens(nextWorkOrders);
  const nextGeneralSearchTokens = Array.from(
    new Set([
      ...nextWorkOrderTokens,
      ...(Array.isArray(itemData.generalSearchTokens)
        ? itemData.generalSearchTokens
            .map((value) => normalizeSearchText(value))
            .filter(Boolean)
        : []),
    ])
  ).slice(0, 1500);
  const saveEntry = {
    savedAt: normalizedNowIso,
    savedByEmail: normalizedActor.email,
    action: "work_order_add",
    label,
    workOrder: normalizedWorkOrder.number,
    operationId: normalizedOperationId,
    movementMode: normalizedMovementMode,
    actor: { ...normalizedActor },
    beforeConfiguration,
    afterConfiguration,
    workOrderAssignmentAdded: !workOrderAlreadyAttached,
    workOrderAssignmentDate: workOrderAlreadyAttached ? null : movementDate,
  };
  const nextItem = {
    ...itemData,
    associationSchemaVersion: 2,
    newLocalFrom: resultingFromLocal,
    localLocFrom: resultingFromLocalText,
    newLocalCurrent: {},
    localLocCurrent: "",
    region: "",
    Region: "",
    section: null,
    Section: null,
    bin: "",
    Bin: "",
    pallet: "",
    Pallet: "",
    movementDateType:
      normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER
        ? "arrival"
        : "departure",
    movementDate,
    arrival_date:
      normalizedMovementMode === MOVEMENT_FROM_WORK_ORDER ? movementDate : "",
    departure_date:
      normalizedMovementMode === MOVEMENT_CURRENT_AT_WORK_ORDER
        ? movementDate
        : "",
    selectionHistory: boundedAppend(itemData.selectionHistory, [
      priorHistoryEntry,
      resultHistoryEntry,
    ]),
    saveHistory: boundedAppend(itemData.saveHistory, [saveEntry]),
    workOrders: nextWorkOrders,
    workOrderTokens: nextWorkOrderTokens,
    generalSearchTokens: nextGeneralSearchTokens,
    lastEdited: normalizedActor.email,
  };
  setAssociationBranch(nextItem, "from", fromAssociation);
  setAssociationBranch(nextItem, "current", currentAssociation);

  const previousMachineIds = previousMachineIdsFromItem(itemData);
  const nextMachineIds = uniqueMachineIds([
    fromAssociation.machineId,
    currentAssociation.machineId,
  ]);
  const audit = {
    schemaVersion: 2,
    type: "work-order-add-movement",
    action: "work_order_add",
    label,
    operationId: normalizedOperationId,
    itemId: normalizedItemId,
    workOrder: {
      id: normalizedWorkOrder.id,
      number: normalizedWorkOrder.number,
      subject: normalizedWorkOrder.subject,
    },
    actor: { ...normalizedActor },
    occurredAt: normalizedNowIso,
    movementDate,
    movementMode: normalizedMovementMode,
    beforeConfiguration,
    afterConfiguration,
    previousMachineIds,
    nextMachineIds,
    transitionCount: 1,
    selectionHistoryEntriesAdded: 2,
    workOrderAssignmentAdded: !workOrderAlreadyAttached,
    workOrderAssignmentDate: workOrderAlreadyAttached ? null : movementDate,
  };

  return {
    itemId: normalizedItemId,
    nextItem,
    transitions: [
      {
        kind: resultHistoryEntry.transitionKind,
        fromAssociation: { ...fromAssociation },
        currentAssociation: { ...currentAssociation },
        historyEntry: resultHistoryEntry,
      },
    ],
    previousMachineIds,
    nextMachineIds,
    workOrderAssignmentAdded: !workOrderAlreadyAttached,
    audit,
  };
}

function associatedPartId(value) {
  return referenceId(value);
}

function canonicalizeAssociatedPartsForItem({
  associatedParts,
  previousPartId = null,
  partId,
  partRef,
  includePart,
} = {}) {
  const normalizedPartId = clean(partId, 180);
  const normalizedPreviousPartId = clean(previousPartId, 180);
  if (!normalizedPartId || normalizedPartId.includes("/")) {
    fail("invalid_item_id", "A valid inventory item ID is required.");
  }
  if (includePart && !partRef) {
    fail("item_reference_required", "A canonical item reference is required for a machine backlink.");
  }
  if (associatedParts !== undefined && !Array.isArray(associatedParts)) {
    fail("invalid_associated_parts", "Machine associatedParts must be an array.");
  }
  const replacedIds = new Set([normalizedPartId]);
  if (normalizedPreviousPartId) replacedIds.add(normalizedPreviousPartId);
  const next = (Array.isArray(associatedParts) ? associatedParts : []).filter(
    (entry) => !replacedIds.has(associatedPartId(entry))
  );
  if (includePart) next.push(partRef);
  return next;
}

module.exports = {
  LEGACY_ASSOCIATION_FIELDS,
  HISTORY_LIMIT,
  MAX_SCAN_CODES,
  ORIGIN_KEEP,
  ORIGIN_STAGE_VIA_SOCAL,
  MOVEMENT_CURRENT_AT_WORK_ORDER,
  MOVEMENT_FROM_WORK_ORDER,
  SOCAL_CLIENT_ID,
  SOCAL_INTERIOR_MACHINE_ID,
  WorkOrderAddContractError,
  buildAssociationSnapshot,
  buildWorkOrderAddPlan,
  buildWorkOrderMovementPlan,
  buildWorkOrderTokens,
  canonicalizeAssociatedPartsForItem,
  clean,
  isSocalAssociation,
  normalizeOperationId,
  normalizeMovementMode,
  normalizeOriginChoice,
  normalizeScanCodes,
  normalizeWorkOrderOption,
  searchWorkOrderOptions,
};
