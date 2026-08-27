const crypto = require("node:crypto");
const {
  encodeFirestoreValue: encodeBackupFirestoreValue,
} = require("../firestoreBackupCodec.cjs");

const LOCATION_SCHEMA_VERSION = 2;
const SYNTHETIC_TRAILER_CLIENT_ID = "AIS62854";
const ASSOCIATION_TYPES = Object.freeze(["site", "machine", "trailer"]);

const BRANCHES = Object.freeze({
  from: Object.freeze({
    label: "From",
    clientRef: "ClientFrom",
    clientId: "clientFromId",
    machineRef: "MachineFrom",
    machineId: "machineFromId",
    trailerRef: "TrailerFrom",
    trailerId: "trailerFromId",
    associationType: "fromAssociationType",
    legacyAssociationTypes: ["associationTypeFrom"],
    associationMap: "associationFrom",
    legacyMachineRefs: ["Machine", "fromMachine"],
    legacyMachineIds: ["fromMachineId", "machineId"],
    legacyClientRefs: ["fromClient", "clientFrom", "Client"],
    legacyClientIds: ["fromClientId"],
    legacyTrailerRefs: ["fromTrailer", "trailerFrom"],
    legacyTrailerIds: ["fromTrailerId"],
    historyPrefix: "from",
  }),
  current: Object.freeze({
    label: "Current",
    clientRef: "ClientCurrent",
    clientId: "clientCurrentId",
    machineRef: "MachineCurrent",
    machineId: "machineCurrentId",
    trailerRef: "TrailerCurrent",
    trailerId: "trailerCurrentId",
    associationType: "currentAssociationType",
    legacyAssociationTypes: ["associationTypeCurrent"],
    associationMap: "associationCurrent",
    legacyMachineRefs: ["CurrentMachine", "currentMachine"],
    legacyMachineIds: ["currentMachineId"],
    legacyClientRefs: ["currentClient", "clientCurrent", "CurrentClient"],
    legacyClientIds: ["currentClientId"],
    legacyTrailerRefs: ["currentTrailer", "trailerCurrent"],
    legacyTrailerIds: ["currentTrailerId"],
    historyPrefix: "current",
  }),
});

// These six branches were individually audited against the live records on
// 2026-08-26. The override is intentionally branch-scoped: it must corroborate
// the record and trailer timeline, and a conflict is review-only.
const AUTHORITATIVE_BRANCH_OVERRIDES = Object.freeze({
  AIS17704: Object.freeze({
    from: Object.freeze({
      associationType: "trailer",
      clientId: "AIS17182",
      trailerId: "AIS23",
      machineId: "AIS15216",
      effectiveAt: "2026-08-26",
      evidence: "selectionHistory[0].movementDate and savedAt 2026-08-26T17:16:01.336Z",
    }),
  }),
  AIS29317: Object.freeze({
    from: Object.freeze({
      associationType: "trailer",
      clientId: "AIS17182",
      trailerId: "AIS23",
      machineId: "AIS15216",
      effectiveAt: "2026-08-26",
      evidence: "selectionHistory[0].movementDate and savedAt 2026-08-26T17:08:16.886Z",
    }),
  }),
  AIS37398: Object.freeze({
    from: Object.freeze({
      associationType: "trailer",
      clientId: "AIS17182",
      trailerId: "AIS23",
      machineId: "AIS15216",
      effectiveAt: "2026-08-26",
      evidence: "selectionHistory[0].movementDate and savedAt 2026-08-26T17:18:37.623Z",
    }),
  }),
  AIS75587: Object.freeze({
    from: Object.freeze({
      associationType: "trailer",
      clientId: "AIS17182",
      trailerId: "AIS23",
      machineId: "AIS15216",
      effectiveAt: "2026-08-26",
      evidence: "selectionHistory[0].movementDate and savedAt 2026-08-26T16:50:26.765Z",
    }),
  }),
  AIS86861: Object.freeze({
    from: Object.freeze({
      associationType: "trailer",
      clientId: "AIS17182",
      trailerId: "AIS23",
      machineId: "AIS15216",
      effectiveAt: "2026-08-26",
      evidence: "selectionHistory[0].movementDate and savedAt 2026-08-26T17:14:01.341Z",
    }),
  }),
  AIS63114: Object.freeze({
    current: Object.freeze({
      associationType: "trailer",
      clientId: "AIS38562",
      trailerId: "AIS24",
      machineId: "AIS77830",
      effectiveAt: "2026-08-26",
      evidence: "selectionHistory[0].movementDate and savedAt 2026-08-26T18:07:46.902Z",
    }),
  }),
});

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function normalizeName(value) {
  return clean(value, 500).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getReferencePath(value) {
  if (!value) return "";
  if (typeof value === "string") {
    const trimmed = clean(value, 1000);
    return trimmed.includes("/") ? trimmed.replace(/^\/+|\/+$/g, "") : "";
  }
  if (value.__firestoreType === "reference") return clean(value.path, 1000);
  return clean(value.path, 1000);
}

function getReferenceId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    const pieces = value.split("/").filter(Boolean);
    return clean(pieces[pieces.length - 1] || value, 300);
  }
  if (value.id) return clean(value.id, 300);
  const path = getReferencePath(value);
  return clean(path.split("/").filter(Boolean).pop(), 300);
}

function firstId(record, fields) {
  for (const field of fields) {
    const id = getReferenceId(record?.[field]);
    if (id) return id;
  }
  return "";
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, stableValue(value[key])])
  );
}

function stableStringify(value) {
  return JSON.stringify(stableValue(value));
}

function sha256Value(value) {
  return crypto.createHash("sha256").update(stableStringify(value)).digest("hex");
}

function encodeFirestoreValue(value) {
  return encodeBackupFirestoreValue(value);
}

function decodeFirestoreValue(value, { db, Timestamp, GeoPoint } = {}) {
  if (Array.isArray(value)) {
    return value.map((entry) => decodeFirestoreValue(entry, { db, Timestamp, GeoPoint }));
  }
  if (!value || typeof value !== "object") return value;
  if (value.__firestoreType === "reference") {
    if (!db) throw new Error("A Firestore db is required to decode references.");
    return db.doc(value.path);
  }
  if (["timestamp", "date"].includes(value.__firestoreType)) {
    if (
      value.__firestoreType === "timestamp" &&
      Timestamp &&
      typeof value.seconds === "number" &&
      typeof value.nanoseconds === "number"
    ) {
      return new Timestamp(value.seconds, value.nanoseconds);
    }
    const date = new Date(value.iso);
    if (Number.isNaN(date.getTime())) throw new Error(`Invalid timestamp ${value.iso}`);
    return Timestamp?.fromDate ? Timestamp.fromDate(date) : date;
  }
  if (value.__firestoreType === "geopoint") {
    return GeoPoint ? new GeoPoint(value.latitude, value.longitude) : value;
  }
  if (value.__firestoreType === "bytes") return Buffer.from(value.base64 || "", "base64");
  if (value.__firestoreType === "number") {
    if (value.value === "NaN") return Number.NaN;
    if (value.value === "Infinity") return Number.POSITIVE_INFINITY;
    if (value.value === "-Infinity") return Number.NEGATIVE_INFINITY;
    throw new Error(`Unsupported encoded number ${value.value}`);
  }
  if (value.__firestoreType === "undefined") return undefined;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [
      key,
      decodeFirestoreValue(nested, { db, Timestamp, GeoPoint }),
    ])
  );
}

function documentFingerprint(record) {
  return sha256Value(encodeFirestoreValue(record || {}));
}

function normalizeTemporal(value) {
  if (!value) return null;
  if (value.__firestoreType && ["timestamp", "date"].includes(value.__firestoreType)) {
    return normalizeTemporal(value.iso);
  }
  if (typeof value?.toDate === "function") return normalizeTemporal(value.toDate());
  if (value instanceof Date) {
    const millis = value.getTime();
    return Number.isFinite(millis)
      ? { millis, iso: value.toISOString(), precision: "timestamp" }
      : null;
  }
  if (typeof value?.seconds === "number") {
    return normalizeTemporal(new Date(value.seconds * 1000 + (value.nanoseconds || 0) / 1e6));
  }
  const text = clean(value, 100);
  if (!text) return null;
  const dateOnly = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) {
    const millis = Date.parse(`${text}T00:00:00.000Z`);
    return Number.isFinite(millis) ? { millis, iso: text, precision: "date" } : null;
  }
  const millis = Date.parse(text);
  if (!Number.isFinite(millis)) return null;
  return { millis, iso: new Date(millis).toISOString(), precision: "timestamp" };
}

function branchDefinition(branch) {
  const definition = BRANCHES[branch];
  if (!definition) throw new Error(`Unsupported association branch: ${branch}`);
  return definition;
}

function extractBranchAssociation(record = {}, branch) {
  const fields = branchDefinition(branch);
  const associationMap = record?.[fields.associationMap] || {};
  const clientId = firstId(record, [
    fields.clientRef,
    fields.clientId,
    ...fields.legacyClientRefs,
    ...fields.legacyClientIds,
  ]) || clean(associationMap.clientId, 300);
  const machineId = firstId(record, [
    fields.machineRef,
    fields.machineId,
    ...fields.legacyMachineRefs,
    ...fields.legacyMachineIds,
  ]) || clean(associationMap.machineId, 300);
  const trailerId = firstId(record, [
    fields.trailerRef,
    fields.trailerId,
    ...fields.legacyTrailerRefs,
    ...fields.legacyTrailerIds,
  ]) || clean(associationMap.trailerId, 300);
  const storedType = clean(
    record?.[fields.associationType] ||
      fields.legacyAssociationTypes.map((field) => record?.[field]).find(Boolean) ||
      associationMap.associationType,
    30
  ).toLowerCase();
  const explicitAssociationType = ASSOCIATION_TYPES.includes(storedType)
    ? storedType
    : "";
  const associationType = explicitAssociationType
    ? explicitAssociationType
    : trailerId
      ? "trailer"
      : machineId
        ? "machine"
        : clientId
          ? "site"
          : "";
  return {
    associationType,
    explicitAssociationType,
    clientId,
    machineId,
    trailerId,
  };
}

function historyBranchAssociation(entry = {}, branch) {
  const prefix = branchDefinition(branch).historyPrefix;
  return {
    clientId: clean(entry[`${prefix}ClientId`], 300),
    clientName: clean(entry[`${prefix}ClientName`], 500),
    machineId: clean(entry[`${prefix}MachineId`], 300),
    machineName: clean(entry[`${prefix}MachineName`], 500),
    trailerId: clean(entry[`${prefix}TrailerId`], 300),
    trailerName: clean(entry[`${prefix}TrailerName`], 500),
  };
}

function itemEffectiveTimestampCandidates(record = {}, branch, metadata = {}, hints = {}) {
  const candidates = [];
  let order = 0;
  const add = (source, value, rank) => {
    const temporal = normalizeTemporal(value);
    if (!temporal) return;
    candidates.push({ source, rank, order: order++, ...temporal });
  };
  const history = Array.isArray(record.selectionHistory) ? record.selectionHistory : [];
  const matchingEntries = history
    .map((entry, index) => ({ entry, index, association: historyBranchAssociation(entry, branch) }))
    .filter(({ association }) => {
      const hasBranchValue = Object.values(association).some(Boolean);
      if (!hasBranchValue) return false;
      if (hints.trailerId && association.trailerId) return hints.trailerId === association.trailerId;
      if (hints.machineId && association.machineId) return hints.machineId === association.machineId;
      if (hints.clientId && association.clientId) return hints.clientId === association.clientId;
      return true;
    });
  if (branch === "current") matchingEntries.reverse();
  for (const { entry, index } of matchingEntries) {
    const type = entry.movementDateType === "departure" ? "departure" : "arrival";
    add(`selectionHistory[${index}].movementDate`, entry.movementDate, 120);
    add(`selectionHistory[${index}].${type}Date`, entry[`${type}Date`], 118);
    add(`selectionHistory[${index}].savedAt`, entry.savedAt, 95);
  }
  const movementType = record.movementDateType === "departure" ? "departure" : "arrival";
  add("item.movementDate", record.movementDate, 115);
  add(`item.${movementType}_date`, record[`${movementType}_date`], 112);
  add(`item.${movementType}Date`, record[`${movementType}Date`], 111);
  add("item.date", record.date, 100);
  const saveHistory = Array.isArray(record.saveHistory) ? record.saveHistory : [];
  const orderedSaveHistory = branch === "current" ? [...saveHistory].reverse() : saveHistory;
  orderedSaveHistory.forEach((entry, orderedIndex) => {
    const originalIndex =
      branch === "current" ? saveHistory.length - orderedIndex - 1 : orderedIndex;
    add(
      `saveHistory[${originalIndex}].savedAt`,
      entry?.savedAt || entry?.at || entry?.timestamp || entry?.date,
      90
    );
  });
  add("item.dateCreated", record.dateCreated, 85);
  add("item.createdAt", record.createdAt, 84);
  add("metadata.createTime", metadata.createTime, 80);
  add("item.updatedAt", record.updatedAt, 30);
  add("metadata.updateTime", metadata.updateTime, 20);
  return candidates.sort((left, right) => right.rank - left.rank || left.order - right.order);
}

function trailerClientId(record = {}) {
  return firstId(record, [
    "currentClient",
    "client",
    "currentClientId",
    "locationCurrentId",
    "clientId",
  ]);
}

function trailerMachineId(record = {}) {
  return firstId(record, [
    "associatedMachine",
    "machine",
    "associatedMachineId",
    "currentMachineId",
    "machineId",
  ]);
}

function canonicalTrailerNumber(value) {
  const match = clean(value, 500).match(/(?:^|\b)AIS\s*[-_ ]?(\d+)(?:\b|$)/i);
  return match ? `AIS${Number(match[1])}` : "";
}

function normalizeRecordMap(records) {
  if (records instanceof Map) return new Map(records);
  if (Array.isArray(records)) {
    return new Map(records.map((entry) => [clean(entry.id, 300), entry.data || entry]));
  }
  return new Map(Object.entries(records || {}));
}

function buildLocationIndexes({ trailers = [], machines = [], clients = [] } = {}) {
  const trailerMap = normalizeRecordMap(trailers);
  const machineMap = normalizeRecordMap(machines);
  const clientMap = normalizeRecordMap(clients);
  const trailersByMachine = new Map();
  for (const [trailerId, trailer] of trailerMap) {
    const machineId = trailerMachineId(trailer);
    if (!machineId) continue;
    const values = trailersByMachine.get(machineId) || [];
    values.push(trailerId);
    trailersByMachine.set(machineId, values.sort());
  }
  const clientsByName = new Map();
  for (const [clientId, client] of clientMap) {
    const key = normalizeName(client?.name || client?.clientName);
    if (!key) continue;
    const values = clientsByName.get(key) || [];
    values.push(clientId);
    clientsByName.set(key, values.sort());
  }
  return { trailerMap, machineMap, clientMap, trailersByMachine, clientsByName };
}

function buildTrailerLocationIntervals(trailer = {}) {
  const intervals = [];
  const add = (entry, source, isCurrent = false) => {
    const clientId = firstId(entry, ["client", "currentClient", "clientId", "currentClientId"]);
    const clientName = clean(
      entry.clientNameSnapshot ||
        entry.clientName ||
        entry.locationCurrentName ||
        entry.locationCurrent ||
        entry.location,
      500
    );
    const clientLocation = clean(
      entry.clientLocationSnapshot ||
        entry.clientLocation ||
        entry.locationCurrentClientLocation,
      1000
    );
    const arrival = normalizeTemporal(
      entry.arrivalDate || entry.locationCurrentArrivalDate || entry.currentArrivalDate
    );
    const departure = normalizeTemporal(
      entry.departureDate || entry.locationCurrentDepartureDate || entry.currentDepartureDate
    );
    if (!clientId && !clientName) return;
    intervals.push({
      source,
      clientId,
      clientName,
      clientLocation,
      arrivalDate: arrival?.iso || "",
      departureDate: departure?.iso || "",
      arrivalMillis: arrival?.millis ?? null,
      departureMillis: departure?.millis ?? null,
      isCurrent,
    });
  };
  const history = Array.isArray(trailer.locationHistory) ? trailer.locationHistory : [];
  history.forEach((entry, index) => add(entry || {}, `locationHistory[${index}]`, false));
  const movementHistory = Array.isArray(trailer.trailerMovementHistory)
    ? trailer.trailerMovementHistory
    : [];
  const currentId = trailerClientId(trailer);
  let currentArrival =
    trailer.locationCurrentArrivalDate || trailer.currentLocationArrivalDate || "";
  if (!currentArrival && currentId) {
    const matchingMovement = [...movementHistory]
      .reverse()
      .find((entry) => getReferenceId(entry?.toClientId) === currentId && entry?.arrivalDate);
    currentArrival = matchingMovement?.arrivalDate || matchingMovement?.dates?.arrivalDate || "";
  }
  add(
    {
      clientId: currentId,
      clientName:
        trailer.locationCurrentName || trailer.locationCurrent || trailer.location || "",
      clientLocation: trailer.locationCurrentClientLocation || "",
      arrivalDate: currentArrival,
      departureDate: trailer.locationCurrentDepartureDate || "",
    },
    "currentLocation",
    true
  );
  const deduped = new Map();
  for (const interval of intervals) {
    const key = [
      interval.clientId,
      normalizeName(interval.clientName),
      interval.arrivalDate,
      interval.departureDate,
    ].join("|");
    const existing = deduped.get(key);
    if (!existing || interval.isCurrent) deduped.set(key, interval);
  }
  return Array.from(deduped.values()).sort(
    (left, right) =>
      (left.arrivalMillis ?? Number.NEGATIVE_INFINITY) -
      (right.arrivalMillis ?? Number.NEGATIVE_INFINITY)
  );
}

function resolveHistoricalTrailerClient({ trailer, effective, indexes }) {
  if (!effective) {
    return { status: "review", reason: "no reliable item movement/save timestamp" };
  }
  const intervals = buildTrailerLocationIntervals(trailer);
  const matches = intervals.filter((interval) => {
    const startsBefore = interval.arrivalMillis == null || interval.arrivalMillis <= effective.millis;
    // Half-open interval: an item on the departure date belongs to the next
    // interval, never to both the prior and next location.
    const endsAfter = interval.departureMillis == null || effective.millis < interval.departureMillis;
    return startsBefore && endsAfter;
  });
  if (!matches.length) {
    return {
      status: "review",
      reason: `no trailer location interval contains ${effective.iso}`,
      intervals,
    };
  }
  const distinct = new Map(
    matches.map((entry) => [
      [entry.clientId, normalizeName(entry.clientName), entry.arrivalDate, entry.departureDate].join("|"),
      entry,
    ])
  );
  if (distinct.size !== 1) {
    return {
      status: "review",
      reason: `multiple trailer location intervals contain ${effective.iso}`,
      matches: Array.from(distinct.values()),
    };
  }
  const interval = Array.from(distinct.values())[0];
  if (interval.arrivalMillis == null) {
    return {
      status: "review",
      reason:
        `matching trailer location interval ${interval.source} has no arrival boundary; ` +
        "historical ownership cannot be proven",
      interval,
    };
  }
  let clientId = interval.clientId;
  let resolvedBy = clientId ? "interval-client-id" : "";
  if (!clientId && interval.clientName) {
    const namedMatches = indexes.clientsByName.get(normalizeName(interval.clientName)) || [];
    if (namedMatches.length === 1) {
      [clientId] = namedMatches;
      resolvedBy = "unique-client-name";
    } else if (namedMatches.length > 1) {
      return {
        status: "review",
        reason: `historical client name maps to multiple Client records: ${interval.clientName}`,
        interval,
        clientCandidates: namedMatches,
      };
    }
  }
  if (!clientId || !indexes.clientMap.has(clientId)) {
    return {
      status: "review",
      reason: clientId
        ? `historical Client/${clientId} does not exist`
        : `historical interval has no resolvable client ID: ${interval.clientName || "unnamed"}`,
      interval,
    };
  }
  const client = indexes.clientMap.get(clientId) || {};
  const confidence =
    resolvedBy === "interval-client-id" && interval.arrivalMillis != null
      ? "high"
      : "medium";
  return {
    status: "resolved",
    confidence,
    clientId,
    clientName: clean(interval.clientName || client.name, 500),
    clientLocation: clean(
      interval.clientLocation || client.location || client.local,
      1000
    ),
    resolvedBy,
    interval,
  };
}

function selectionHistorySnapshot(record, branch, hints = {}) {
  const history = Array.isArray(record.selectionHistory) ? record.selectionHistory : [];
  const indexes = Array.from({ length: history.length }, (_, index) => index);
  if (branch === "current") indexes.reverse();
  for (const index of indexes) {
    const association = historyBranchAssociation(history[index], branch);
    if (hints.trailerId && association.trailerId && hints.trailerId !== association.trailerId) {
      continue;
    }
    if (hints.machineId && association.machineId && hints.machineId !== association.machineId) {
      continue;
    }
    if (Object.values(association).some(Boolean)) return { ...association, index };
  }
  return null;
}

function inferTrailerForLegacyBranch({ record, branch, association, indexes, override }) {
  const evidence = [];
  const candidates = new Set();
  const add = (trailerId, source) => {
    const id = clean(trailerId, 300);
    if (!id) return;
    candidates.add(id);
    evidence.push({ source, trailerId: id });
  };
  add(association.trailerId, "stored-trailer");
  const history = selectionHistorySnapshot(record, branch, association);
  add(history?.trailerId, "selection-history-trailer");
  if (override) add(override.trailerId, "audited-authoritative-override");
  if (
    association.clientId === SYNTHETIC_TRAILER_CLIENT_ID ||
    override?.clientId === SYNTHETIC_TRAILER_CLIENT_ID
  ) {
    for (const trailerId of indexes.trailersByMachine.get(association.machineId) || []) {
      add(trailerId, "legacy-pseudo-client-machine-reverse-link");
    }
    const machine = indexes.machineMap.get(association.machineId) || {};
    const namedTrailerId = canonicalTrailerNumber(machine.name || history?.machineName);
    if (namedTrailerId && indexes.trailerMap.has(namedTrailerId)) {
      add(namedTrailerId, "legacy-pseudo-client-machine-name");
    }
  }
  if (candidates.size > 1) {
    return {
      status: "review",
      reason: `conflicting trailer evidence: ${Array.from(candidates).sort().join(", ")}`,
      evidence,
    };
  }
  const trailerId = Array.from(candidates)[0] || "";
  if (!trailerId) {
    return { status: "none", trailerId: "", evidence };
  }
  if (!indexes.trailerMap.has(trailerId)) {
    return {
      status: "review",
      reason: `Trailers/${trailerId} does not exist`,
      evidence,
    };
  }
  return { status: "resolved", trailerId, evidence };
}

function validateTrailerMachine({ trailerId, machineId, indexes, override }) {
  if (!machineId) {
    return { status: "review", reason: "trailer association has no machine" };
  }
  const machine = indexes.machineMap.get(machineId);
  if (!machine) {
    return { status: "review", reason: `Machine/${machineId} does not exist` };
  }
  if (override?.machineId === machineId && override?.trailerId === trailerId) {
    return { status: "resolved", confidence: "high", source: "audited-authoritative-override" };
  }
  const trailer = indexes.trailerMap.get(trailerId) || {};
  if (trailerMachineId(trailer) === machineId) {
    return { status: "resolved", confidence: "high", source: "trailer-associated-machine" };
  }
  if (getReferenceId(machine.trailerId) === trailerId) {
    return { status: "resolved", confidence: "high", source: "machine-trailer-id" };
  }
  const machineTrailerNumber = canonicalTrailerNumber(machine.name);
  if (machineTrailerNumber && machineTrailerNumber === canonicalTrailerNumber(trailerId)) {
    return {
      status: "review",
      reason:
        `Machine/${machineId} names ${machineTrailerNumber}, but it is not the trailer's current ` +
        "associated machine and no machine-link history proves the effective-date relationship",
    };
  }
  return {
    status: "review",
    reason: `Machine/${machineId} is not linked to Trailers/${trailerId}`,
  };
}

function valueEquals(left, right) {
  return stableStringify(encodeFirestoreValue(left)) === stableStringify(encodeFirestoreValue(right));
}

function setReferenceIfChanged(patch, record, field, collection, id) {
  const existingId = getReferenceId(record?.[field]);
  if (id) {
    if (existingId !== id || !getReferencePath(record?.[field])) {
      patch.setReferences[field] = `${collection}/${id}`;
    }
  } else if (record && Object.prototype.hasOwnProperty.call(record, field)) {
    patch.deleteFields.push(field);
  }
}

function setValueIfChanged(patch, record, field, value) {
  if (!valueEquals(record?.[field], value)) patch.setValues[field] = value;
}

function deleteIfPresent(patch, record, field) {
  if (Object.prototype.hasOwnProperty.call(record || {}, field)) patch.deleteFields.push(field);
}

function buildBranchPatch(record, branch, after) {
  const fields = branchDefinition(branch);
  const patch = { setReferences: {}, setValues: {}, deleteFields: [] };
  setReferenceIfChanged(patch, record, fields.clientRef, "Client", after.clientId);
  setReferenceIfChanged(patch, record, fields.machineRef, "Machine", after.machineId);
  setReferenceIfChanged(patch, record, fields.trailerRef, "Trailers", after.trailerId);
  if (after.clientId) setValueIfChanged(patch, record, fields.clientId, after.clientId);
  else deleteIfPresent(patch, record, fields.clientId);
  if (after.machineId) setValueIfChanged(patch, record, fields.machineId, after.machineId);
  else deleteIfPresent(patch, record, fields.machineId);
  if (after.trailerId) setValueIfChanged(patch, record, fields.trailerId, after.trailerId);
  else deleteIfPresent(patch, record, fields.trailerId);
  setValueIfChanged(patch, record, fields.associationType, after.associationType);
  setValueIfChanged(patch, record, fields.associationMap, after.snapshot);
  for (const field of fields.legacyAssociationTypes) deleteIfPresent(patch, record, field);
  for (const field of [
    ...fields.legacyMachineRefs,
    ...fields.legacyMachineIds,
    ...fields.legacyClientRefs,
    ...fields.legacyClientIds,
    ...fields.legacyTrailerRefs,
    ...fields.legacyTrailerIds,
  ]) {
    if (
      ![
        fields.clientRef,
        fields.clientId,
        fields.machineRef,
        fields.machineId,
        fields.trailerRef,
        fields.trailerId,
      ].includes(field)
    ) {
      deleteIfPresent(patch, record, field);
    }
  }
  patch.deleteFields = Array.from(new Set(patch.deleteFields)).sort();
  return patch;
}

function hasPatch(patch) {
  return Boolean(
    Object.keys(patch?.setReferences || {}).length ||
      Object.keys(patch?.setValues || {}).length ||
      (patch?.deleteFields || []).length
  );
}

function emptyPatch() {
  return { setReferences: {}, setValues: {}, deleteFields: [] };
}

function mergePatches(patches) {
  const result = emptyPatch();
  for (const patch of patches) {
    Object.assign(result.setReferences, patch.setReferences || {});
    Object.assign(result.setValues, patch.setValues || {});
    result.deleteFields.push(...(patch.deleteFields || []));
  }
  result.deleteFields = Array.from(new Set(result.deleteFields)).sort();
  return result;
}

function branchSnapshot({ associationType, clientId, machineId, trailerId, effective, names, evidence }) {
  return {
    schemaVersion: LOCATION_SCHEMA_VERSION,
    associationType,
    clientId,
    clientNameSnapshot: clean(names.clientName, 500),
    clientLocationSnapshot: clean(names.clientLocation, 1000),
    machineId,
    machineNameSnapshot: clean(names.machineName, 500),
    trailerId,
    trailerNameSnapshot: clean(names.trailerName, 500),
    effectiveAt: effective?.iso || "",
    effectiveAtSource: clean(effective?.source, 500),
    resolutionSource: clean(evidence, 1000),
  };
}

function resolveItemBranch({ itemId, record, branch, metadata, indexes }) {
  const before = extractBranchAssociation(record, branch);
  const override = AUTHORITATIVE_BRANCH_OVERRIDES[itemId]?.[branch] || null;
  const inferredTrailer = inferTrailerForLegacyBranch({
    record,
    branch,
    association: before,
    indexes,
    override,
  });
  if (inferredTrailer.status === "review") {
    return {
      branch,
      status: "review",
      before,
      reviewReasons: [inferredTrailer.reason],
      evidence: inferredTrailer.evidence,
      patch: emptyPatch(),
    };
  }
  let trailerId = inferredTrailer.trailerId || "";
  const associationType =
    override?.associationType ||
    before.explicitAssociationType ||
    (trailerId ? "trailer" : before.machineId ? "machine" : before.clientId ? "site" : "");
  if (!associationType) {
    return { branch, status: "none", before, after: null, evidence: [], patch: emptyPatch() };
  }
  const historySnapshot = selectionHistorySnapshot(record, branch, {
    trailerId,
    machineId: before.machineId || override?.machineId,
  });
  const timestampCandidates = itemEffectiveTimestampCandidates(record, branch, metadata, {
    trailerId,
    machineId: before.machineId || override?.machineId,
    clientId: before.clientId,
  });
  const effective = timestampCandidates[0] || normalizeTemporal(override?.effectiveAt);
  if (effective && !effective.source) effective.source = "audited-authoritative-effective-date";
  const reviewReasons = [];
  let clientId = before.clientId;
  let machineId = before.machineId;
  let confidence = "high";
  let resolutionEvidence = "stored-association";
  let historical = null;

  if (associationType === "trailer") {
    machineId = override?.machineId || machineId || historySnapshot?.machineId || "";
    const machineValidation = validateTrailerMachine({
      trailerId,
      machineId,
      indexes,
      override,
    });
    if (machineValidation.status !== "resolved") reviewReasons.push(machineValidation.reason);
    const trailer = indexes.trailerMap.get(trailerId);
    if (!trailer) reviewReasons.push(`Trailers/${trailerId} does not exist`);
    if (trailer) {
      historical = resolveHistoricalTrailerClient({ trailer, effective, indexes });
      if (historical.status !== "resolved") reviewReasons.push(historical.reason);
      else {
        clientId = historical.clientId;
        confidence = historical.confidence;
        resolutionEvidence = `${historical.resolvedBy}:${historical.interval.source}`;
      }
    }
    if (override) {
      if (override.trailerId !== trailerId) {
        reviewReasons.push(
          `audited trailer ${override.trailerId} conflicts with resolved trailer ${trailerId}`
        );
      }
      if (override.machineId !== machineId) {
        reviewReasons.push(
          `audited machine ${override.machineId} conflicts with resolved machine ${machineId}`
        );
      }
      if (historical?.status === "resolved" && override.clientId !== historical.clientId) {
        reviewReasons.push(
          `audited client ${override.clientId} conflicts with historical client ${historical.clientId}`
        );
      }
      resolutionEvidence = `audited-authoritative;${resolutionEvidence}`;
      confidence = "high";
    }
  } else if (associationType === "machine") {
    trailerId = "";
    if (!machineId || !indexes.machineMap.has(machineId)) {
      reviewReasons.push(machineId ? `Machine/${machineId} does not exist` : "machine association has no machine");
    }
    if (clientId === SYNTHETIC_TRAILER_CLIENT_ID) {
      reviewReasons.push("AIS TRAILERS is a retired pseudo-client and cannot be a machine/site client");
    }
    if (!clientId || !indexes.clientMap.has(clientId)) {
      reviewReasons.push(clientId ? `Client/${clientId} does not exist` : "machine association has no historical client");
    }
  } else if (associationType === "site") {
    trailerId = "";
    machineId = "";
    if (clientId === SYNTHETIC_TRAILER_CLIENT_ID) {
      reviewReasons.push("AIS TRAILERS is a retired pseudo-client and cannot be a site association");
    }
    if (!clientId || !indexes.clientMap.has(clientId)) {
      reviewReasons.push(clientId ? `Client/${clientId} does not exist` : "site association has no client");
    }
  }

  if (reviewReasons.length) {
    return {
      branch,
      status: "review",
      before,
      reviewReasons: Array.from(new Set(reviewReasons)),
      evidence: {
        authoritative: override,
        trailerEvidence: inferredTrailer.evidence,
        timestampCandidates,
        historical,
      },
      patch: emptyPatch(),
    };
  }

  const client = indexes.clientMap.get(clientId) || {};
  const machine = indexes.machineMap.get(machineId) || {};
  const trailer = indexes.trailerMap.get(trailerId) || {};
  const names = {
    clientName:
      historical?.clientName || historySnapshot?.clientName || client.name || client.clientName || "",
    clientLocation:
      historical?.clientLocation || client.location || client.local || client.clientLocation || "",
    machineName: historySnapshot?.machineName || machine.name || "",
    trailerName:
      historySnapshot?.trailerName || trailer.name || trailer.mondayBoardName || trailerId,
  };
  const snapshot = branchSnapshot({
    associationType,
    clientId,
    machineId,
    trailerId,
    effective,
    names,
    evidence: resolutionEvidence,
  });
  const after = { associationType, clientId, machineId, trailerId, ...names, snapshot };
  const patch = buildBranchPatch(record, branch, after);
  return {
    branch,
    status: hasPatch(patch) ? "change" : "correct",
    confidence,
    before,
    after,
    reviewReasons: [],
    evidence: {
      authoritative: override,
      trailerEvidence: inferredTrailer.evidence,
      selectedTimestamp: effective || null,
      timestampCandidates,
      historical,
    },
    patch,
  };
}

function applyAssociationPatchToEncodedRecord(record, patch) {
  const next = structuredClone(encodeFirestoreValue(record || {}));
  for (const [field, path] of Object.entries(patch?.setReferences || {})) {
    next[field] = { __firestoreType: "reference", path };
  }
  for (const [field, value] of Object.entries(patch?.setValues || {})) {
    next[field] = encodeFirestoreValue(value);
  }
  for (const field of patch?.deleteFields || []) delete next[field];
  return next;
}

function associatedMachineIds(record = {}) {
  return Array.from(
    new Set(
      ["from", "current"]
        .map((branch) => extractBranchAssociation(record, branch).machineId)
        .filter(Boolean)
    )
  ).sort();
}

function associatedPartIds(machine = {}) {
  return Array.from(
    new Set(
      (Array.isArray(machine.associatedParts) ? machine.associatedParts : [])
        .map(getReferenceId)
        .filter(Boolean)
    )
  ).sort();
}

function machineStructuralFingerprint(machine = {}) {
  const encoded = encodeFirestoreValue(machine || {});
  if (encoded && typeof encoded === "object") delete encoded.associatedParts;
  return sha256Value(encoded);
}

function applyMachineBacklinkPlanToEncodedMachine(beforeData, planItems, machineId) {
  const encoded = structuredClone(encodeFirestoreValue(beforeData || {}));
  const current = Array.isArray(encoded.associatedParts) ? encoded.associatedParts : [];
  const removeIds = new Set(
    (planItems || [])
      .filter((item) => item.machineBacklinks?.remove?.includes(machineId))
      .map((item) => item.id)
  );
  const addIds = new Set(
    (planItems || [])
      .filter((item) => item.machineBacklinks?.add?.includes(machineId))
      .map((item) => item.id)
  );
  const next = current.filter((value) => !removeIds.has(getReferenceId(value)));
  const present = new Set(next.map(getReferenceId));
  for (const itemId of Array.from(addIds).sort()) {
    if (!present.has(itemId)) {
      next.push({ __firestoreType: "reference", path: `Test/${itemId}` });
      present.add(itemId);
    }
  }
  encoded.associatedParts = next;
  return encoded;
}

function validateItemLocationPreimage({
  preimage,
  plan,
  sourceProject = plan?.sourceProject || "",
  planHash = plan?.planHash || "",
  backupSha256 = plan?.backup?.sha256 || "",
  runId = preimage?.runId || "",
  expectedCount,
} = {}) {
  const errors = [];
  const addError = (message) => errors.push(message);
  const changes = (plan?.items || []).filter((item) => item.status === "change");
  const machineConditions = plan?.machinePreconditions || [];
  const targetCount = expectedCount == null ? changes.length : expectedCount;

  if (!preimage || typeof preimage !== "object" || Array.isArray(preimage)) {
    return { valid: false, errors: ["preimage must be an object"], itemCount: 0, machineCount: 0 };
  }
  if (preimage.format !== "magmo-item-location-migration-preimage") {
    addError("preimage format mismatch");
  }
  if (preimage.formatVersion !== 1) addError("preimage formatVersion mismatch");
  if (preimage.sourceProject !== sourceProject) addError("preimage project mismatch");
  if (preimage.planHash !== planHash) addError("preimage plan hash mismatch");
  if (preimage.backupSha256 !== backupSha256) addError("preimage backup hash mismatch");
  if (preimage.runId !== runId) addError("preimage run ID mismatch");
  if (preimage.targetCount !== targetCount) addError("preimage target count mismatch");
  if (preimage.machineCount !== machineConditions.length) {
    addError("preimage machineCount mismatch");
  }
  if (preimage.preparationMode !== "live-read-only-preflight") {
    addError("preimage preparation mode mismatch");
  }
  if (preimage.firestoreWritesPerformed !== false) {
    addError("preimage does not attest that preparation performed zero Firestore writes");
  }
  if (!Number.isFinite(Date.parse(preimage.createdAt || ""))) {
    addError("preimage createdAt is invalid");
  }

  const items = Array.isArray(preimage.items) ? preimage.items : [];
  const machines = Array.isArray(preimage.machines) ? preimage.machines : [];
  if (!Array.isArray(preimage.items)) addError("preimage items must be an array");
  if (!Array.isArray(preimage.machines)) addError("preimage machines must be an array");
  if (items.length !== targetCount) addError("preimage item count mismatch");
  if (machines.length !== machineConditions.length) addError("preimage machine count mismatch");

  const itemById = new Map();
  for (const item of items) {
    if (!item?.id) {
      addError("preimage contains an item without an ID");
      continue;
    }
    if (itemById.has(item.id)) addError(`preimage item ${item.id} is duplicated`);
    else itemById.set(item.id, item);
  }
  for (const planItem of changes) {
    const item = itemById.get(planItem.id);
    if (!item) {
      addError(`preimage item ${planItem.id} is missing`);
      continue;
    }
    if (item.path !== `Test/${planItem.id}`) addError(`${planItem.id}: item path mismatch`);
    if (item.updateTime !== planItem.updateTime) addError(`${planItem.id}: item updateTime mismatch`);
    if (item.beforeFingerprint !== planItem.beforeDocumentFingerprint) {
      addError(`${planItem.id}: recorded before fingerprint mismatch`);
    }
    if (item.expectedAfterFingerprint !== planItem.afterDocumentFingerprint) {
      addError(`${planItem.id}: recorded after fingerprint mismatch`);
    }
    const itemDataIsMap = Boolean(
      item.data && typeof item.data === "object" && !Array.isArray(item.data)
    );
    if (!itemDataIsMap) {
      addError(`${planItem.id}: preimage item data must be a document map`);
      continue;
    }
    if (sha256Value(item.data) !== planItem.beforeDocumentFingerprint) {
      addError(`${planItem.id}: preimage data does not match its before fingerprint`);
    }
    const derivedAfter = applyAssociationPatchToEncodedRecord(item.data || {}, planItem.patch);
    if (sha256Value(derivedAfter) !== planItem.afterDocumentFingerprint) {
      addError(`${planItem.id}: plan patch does not derive the recorded after fingerprint`);
    }
  }
  for (const id of itemById.keys()) {
    if (!changes.some((item) => item.id === id)) addError(`preimage item ${id} is outside the plan`);
  }

  const machineById = new Map();
  for (const machine of machines) {
    if (!machine?.id) {
      addError("preimage contains a machine without an ID");
      continue;
    }
    if (machineById.has(machine.id)) addError(`preimage machine ${machine.id} is duplicated`);
    else machineById.set(machine.id, machine);
  }
  for (const condition of machineConditions) {
    const machine = machineById.get(condition.id);
    if (!machine) {
      addError(`preimage machine ${condition.id} is missing`);
      continue;
    }
    if (machine.path !== `Machine/${condition.id}`) {
      addError(`${condition.id}: machine path mismatch`);
    }
    if (machine.exists !== condition.exists) addError(`${condition.id}: machine existence mismatch`);
    if (machine.updateTime !== condition.updateTime) {
      addError(`${condition.id}: machine updateTime mismatch`);
    }
    const expectedBeforeFingerprint = condition.exists ? condition.documentFingerprint : "";
    if (machine.beforeFingerprint !== expectedBeforeFingerprint) {
      addError(`${condition.id}: recorded machine before fingerprint mismatch`);
    }
    if (!condition.exists) {
      if (machine.data !== null) addError(`${condition.id}: nonexistent machine preimage must have null data`);
      if (machine.expectedAfterFingerprint !== "") {
        addError(`${condition.id}: nonexistent machine must have an empty after fingerprint`);
      }
      continue;
    }
    if (!machine.data || typeof machine.data !== "object" || Array.isArray(machine.data)) {
      addError(`${condition.id}: preimage machine data must be a document map`);
      continue;
    }
    if (sha256Value(machine.data) !== condition.documentFingerprint) {
      addError(`${condition.id}: preimage machine data fingerprint mismatch`);
    }
    if (machineStructuralFingerprint(machine.data || {}) !== condition.structuralFingerprint) {
      addError(`${condition.id}: preimage machine structural fingerprint mismatch`);
    }
    const expectedAfter = applyMachineBacklinkPlanToEncodedMachine(
      machine.data || {},
      changes,
      condition.id
    );
    if (machine.expectedAfterFingerprint !== sha256Value(expectedAfter)) {
      addError(`${condition.id}: machine after fingerprint mismatch`);
    }
  }
  for (const id of machineById.keys()) {
    if (!machineConditions.some((machine) => machine.id === id)) {
      addError(`preimage machine ${id} is outside the plan`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    itemCount: items.length,
    machineCount: machines.length,
  };
}

function calculateMachineBacklinks(itemId, beforeRecord, afterRecord) {
  const beforeIds = new Set(associatedMachineIds(beforeRecord));
  const afterIds = new Set(associatedMachineIds(afterRecord));
  return {
    add: Array.from(afterIds).filter((id) => !beforeIds.has(id)).sort(),
    remove: Array.from(beforeIds).filter((id) => !afterIds.has(id)).sort(),
    unchanged: Array.from(afterIds).filter((id) => beforeIds.has(id)).sort(),
    itemId,
  };
}

function planItemLocation({ id, data = {}, updateTime = "", createTime = "", indexes }) {
  const encodedBefore = encodeFirestoreValue(data);
  const metadata = { updateTime, createTime };
  const branches = ["from", "current"].map((branch) =>
    resolveItemBranch({ itemId: id, record: data, branch, metadata, indexes })
  );
  const reviews = branches.filter((branch) => branch.status === "review");
  const changeBranches = branches.filter((branch) => branch.status === "change");
  const hasAssociation = branches.some((branch) => branch.status !== "none");
  const patch = reviews.length ? emptyPatch() : mergePatches(changeBranches.map((entry) => entry.patch));
  if (
    !reviews.length &&
    hasAssociation &&
    data.associationSchemaVersion !== LOCATION_SCHEMA_VERSION
  ) {
    patch.setValues.associationSchemaVersion = LOCATION_SCHEMA_VERSION;
  }
  const encodedAfter = applyAssociationPatchToEncodedRecord(encodedBefore, patch);
  const beforeDocumentFingerprint = sha256Value(encodedBefore);
  const afterDocumentFingerprint = sha256Value(encodedAfter);
  const machineBacklinks = calculateMachineBacklinks(id, encodedBefore, encodedAfter);
  const status = reviews.length
    ? "review"
    : hasPatch(patch)
      ? "change"
      : hasAssociation
        ? "correct"
        : "none";
  return {
    id,
    name: clean(data.name || data.itemName, 500),
    status,
    updateTime: clean(updateTime, 100),
    createTime: clean(createTime, 100),
    beforeDocumentFingerprint,
    afterDocumentFingerprint,
    beforeAssociations: Object.fromEntries(
      ["from", "current"].map((branch) => [branch, extractBranchAssociation(data, branch)])
    ),
    afterAssociations: Object.fromEntries(
      ["from", "current"].map((branch) => [
        branch,
        extractBranchAssociation(encodedAfter, branch),
      ])
    ),
    branches,
    patch,
    machineBacklinks,
  };
}

function planHashPayload(plan) {
  return {
    format: plan.format,
    formatVersion: plan.formatVersion,
    sourceProject: plan.sourceProject,
    backupSha256: plan.backup?.sha256 || "",
    requestedItemIds: plan.requestedItemIds || [],
    machinePreconditions: (plan.machinePreconditions || []).map((machine) => ({
      id: machine.id,
      exists: machine.exists,
      updateTime: machine.updateTime,
      documentFingerprint: machine.documentFingerprint,
      structuralFingerprint: machine.structuralFingerprint,
      associatedPartIds: machine.associatedPartIds,
    })),
    items: (plan.items || []).map((item) => ({
      id: item.id,
      status: item.status,
      updateTime: item.updateTime,
      beforeDocumentFingerprint: item.beforeDocumentFingerprint,
      afterDocumentFingerprint: item.afterDocumentFingerprint,
      patch: item.patch,
      machineBacklinks: item.machineBacklinks,
      reviewReasons: (item.branches || []).flatMap((branch) => branch.reviewReasons || []),
    })),
  };
}

function computePlanHash(plan) {
  return sha256Value(planHashPayload(plan));
}

function classifyDocumentState(planItem, record) {
  const fingerprint = documentFingerprint(record);
  if (fingerprint === planItem.beforeDocumentFingerprint) return "before";
  if (fingerprint === planItem.afterDocumentFingerprint) return "after";
  return "conflict";
}

module.exports = {
  ASSOCIATION_TYPES,
  AUTHORITATIVE_BRANCH_OVERRIDES,
  BRANCHES,
  LOCATION_SCHEMA_VERSION,
  SYNTHETIC_TRAILER_CLIENT_ID,
  applyMachineBacklinkPlanToEncodedMachine,
  applyAssociationPatchToEncodedRecord,
  associatedMachineIds,
  associatedPartIds,
  branchDefinition,
  buildLocationIndexes,
  buildTrailerLocationIntervals,
  calculateMachineBacklinks,
  canonicalTrailerNumber,
  classifyDocumentState,
  clean,
  computePlanHash,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  extractBranchAssociation,
  getReferenceId,
  getReferencePath,
  itemEffectiveTimestampCandidates,
  machineStructuralFingerprint,
  normalizeTemporal,
  planHashPayload,
  planItemLocation,
  resolveHistoricalTrailerClient,
  sha256Value,
  stableStringify,
  validateItemLocationPreimage,
};
