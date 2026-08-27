"use strict";

const ENTITY_ROLE_FIELDS = Object.freeze({
  client: Object.freeze({
    collection: "Client",
    from: Object.freeze({
      canonicalReferences: Object.freeze(["ClientFrom"]),
      canonicalIds: Object.freeze(["clientFromId"]),
      legacyReferences: Object.freeze(["fromClient", "clientFrom", "Client"]),
      legacyIds: Object.freeze(["fromClientId"]),
    }),
    current: Object.freeze({
      canonicalReferences: Object.freeze(["ClientCurrent"]),
      canonicalIds: Object.freeze(["clientCurrentId"]),
      legacyReferences: Object.freeze([
        "currentClient",
        "clientCurrent",
        "CurrentClient",
      ]),
      legacyIds: Object.freeze(["currentClientId"]),
    }),
  }),
  machine: Object.freeze({
    collection: "Machine",
    from: Object.freeze({
      canonicalReferences: Object.freeze(["MachineFrom"]),
      canonicalIds: Object.freeze(["machineFromId"]),
      legacyReferences: Object.freeze(["Machine", "fromMachine"]),
      legacyIds: Object.freeze(["fromMachineId", "machineId"]),
    }),
    current: Object.freeze({
      canonicalReferences: Object.freeze(["MachineCurrent"]),
      canonicalIds: Object.freeze(["machineCurrentId"]),
      legacyReferences: Object.freeze(["CurrentMachine", "currentMachine"]),
      legacyIds: Object.freeze(["currentMachineId"]),
    }),
  }),
  trailer: Object.freeze({
    collection: "Trailers",
    from: Object.freeze({
      canonicalReferences: Object.freeze(["TrailerFrom"]),
      canonicalIds: Object.freeze(["trailerFromId"]),
      legacyReferences: Object.freeze(["fromTrailer", "trailerFrom"]),
      legacyIds: Object.freeze(["fromTrailerId"]),
    }),
    current: Object.freeze({
      canonicalReferences: Object.freeze(["TrailerCurrent"]),
      canonicalIds: Object.freeze(["trailerCurrentId"]),
      legacyReferences: Object.freeze(["currentTrailer", "trailerCurrent"]),
      legacyIds: Object.freeze(["currentTrailerId"]),
    }),
  }),
});

function clean(value) {
  return String(value == null ? "" : value).trim();
}

function normalizeEntityType(entityType) {
  const normalized = clean(entityType).toLowerCase();
  return ENTITY_ROLE_FIELDS[normalized] ? normalized : "";
}

function normalizeRole(role) {
  return clean(role).toLowerCase() === "from" ? "from" : "current";
}

function referenceId(value) {
  if (!value) return "";

  if (typeof value === "string") {
    const segments = value.split("/").filter(Boolean);
    return clean(segments[segments.length - 1] || value);
  }

  if (value.id) return clean(value.id);
  if (typeof value.path === "string") return referenceId(value.path);

  const serializedSegments =
    value?._path?.segments ||
    value?._key?.path?.segments ||
    value?._delegate?._key?.path?.segments;
  if (Array.isArray(serializedSegments) && serializedSegments.length) {
    return clean(serializedSegments[serializedSegments.length - 1]);
  }

  return "";
}

function getEntityRoleConfig(entityType, role) {
  const normalizedEntityType = normalizeEntityType(entityType);
  if (!normalizedEntityType) return null;
  const normalizedRole = normalizeRole(role);
  const entity = ENTITY_ROLE_FIELDS[normalizedEntityType];
  const roleFields = entity[normalizedRole];
  return {
    entityType: normalizedEntityType,
    role: normalizedRole,
    collection: entity.collection,
    associationMap:
      normalizedRole === "from" ? "associationFrom" : "associationCurrent",
    associationIdField: `${normalizedEntityType}Id`,
    canonicalReferences: [...roleFields.canonicalReferences],
    canonicalIds: [...roleFields.canonicalIds],
    legacyReferences: [...roleFields.legacyReferences],
    legacyIds: [...roleFields.legacyIds],
    references: [
      ...roleFields.canonicalReferences,
      ...roleFields.legacyReferences,
    ],
    ids: [...roleFields.canonicalIds, ...roleFields.legacyIds],
  };
}

function firstEntityRoleValue(record = {}, entityType, role) {
  const config = getEntityRoleConfig(entityType, role);
  if (!config) return null;

  for (const fields of [config.canonicalReferences, config.canonicalIds]) {
    for (const field of fields) {
      if (referenceId(record?.[field])) return record[field];
    }
  }

  const mappedValue =
    record?.[config.associationMap]?.[config.associationIdField];
  if (referenceId(mappedValue)) return mappedValue;

  for (const fields of [config.legacyReferences, config.legacyIds]) {
    for (const field of fields) {
      if (referenceId(record?.[field])) return record[field];
    }
  }
  return null;
}

function getEntityRoleIds(record = {}, entityType, role) {
  const id = referenceId(firstEntityRoleValue(record, entityType, role));
  return id ? [id] : [];
}

function getStoredClientId(record = {}, role) {
  return referenceId(firstEntityRoleValue(record, "client", role));
}

function matchesEntityRole(record, entityType, entityId, role) {
  const resolvedEntityId = referenceId(entityId);
  if (!resolvedEntityId) return false;
  return getEntityRoleIds(record, entityType, role).includes(resolvedEntityId);
}

function snapshotMachineId(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return "";
  return referenceId(
    snapshot.id ||
      snapshot.machineId ||
      snapshot.machineRef ||
      snapshot.machine ||
      snapshot.Machine
  );
}

function selectRoleMachineSnapshot(record = {}, role) {
  const normalizedRole = normalizeRole(role);
  const roleMachineId = referenceId(
    firstEntityRoleValue(record, "machine", normalizedRole)
  );
  const roleSpecificCandidates =
    normalizedRole === "from"
      ? [record.machineData, record.theMachineData]
      : [
          record.currentMachineData,
          record.machineCurrentData,
          record.TheCurrentMachine,
        ];

  for (const candidate of roleSpecificCandidates) {
    if (!candidate || typeof candidate !== "object") continue;
    const candidateId = snapshotMachineId(candidate);
    if (!roleMachineId || !candidateId || candidateId === roleMachineId) {
      return candidate;
    }
  }

  const genericCandidate = record.TheMachine;
  if (!genericCandidate || typeof genericCandidate !== "object") return null;
  const genericCandidateId = snapshotMachineId(genericCandidate);
  if (roleMachineId) {
    return genericCandidateId === roleMachineId ? genericCandidate : null;
  }
  return normalizedRole === "from" ? genericCandidate : null;
}

function uniqueReferenceCandidates(candidates = [], excludedIds = []) {
  const excluded = new Set(Array.from(excludedIds || [], referenceId).filter(Boolean));
  const seen = new Set();
  const unique = [];

  for (const candidate of Array.isArray(candidates) ? candidates : []) {
    const id = referenceId(candidate);
    if (!id || excluded.has(id) || seen.has(id)) continue;
    seen.add(id);
    unique.push(candidate);
  }
  return unique;
}

async function mapSettledWithConcurrency(items = [], limit = 12, worker) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return [];
  if (typeof worker !== "function") {
    throw new TypeError("mapSettledWithConcurrency requires a worker function");
  }

  const concurrency = Math.max(
    1,
    Math.min(list.length, Number.isFinite(limit) ? Math.floor(limit) : 1)
  );
  const results = new Array(list.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < list.length) {
      const index = nextIndex;
      nextIndex += 1;
      try {
        results[index] = {
          status: "fulfilled",
          value: await worker(list[index], index),
        };
      } catch (reason) {
        results[index] = { status: "rejected", reason };
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, runWorker));
  return results;
}

function assertAuthoritativeQueriesComplete(results = []) {
  const settledResults = Array.isArray(results) ? results : [];
  const failed = settledResults.filter((result) => result?.status === "rejected");
  if (!failed.length) return;

  const error = new Error(
    `Could not load a complete associated-parts list: ${failed.length} of ${settledResults.length} authoritative queries failed.`
  );
  error.cause = failed[0].reason;
  throw error;
}

function displayValue(value) {
  if (Array.isArray(value)) {
    return value.filter((entry) => entry != null && entry !== "").join(", ");
  }
  return value ?? "";
}

function candidateRecord(candidate) {
  if (!candidate) return null;

  if (typeof candidate.data === "function") {
    if (candidate.exists === false) return null;
    return { id: clean(candidate.id), ...(candidate.data() || {}) };
  }

  const data =
    candidate && typeof candidate.data === "object" ? candidate.data : candidate;
  const id = referenceId(candidate.id || candidate.ref || data?.id);
  if (!id) return null;
  return { ...(data || {}), id };
}

function normalizeAssociatedPart(candidate) {
  const record = candidateRecord(candidate);
  if (!record) return null;

  return {
    ...record,
    id: referenceId(record.id),
    name: clean(record.name || record.itemName),
    pn: displayValue(record.pn ?? record.partNumber),
    sn: displayValue(record.sn ?? record.serialNumber),
    date:
      record.date ||
      record.arrival_date ||
      record.arrivalDate ||
      record.arrival ||
      "",
  };
}

function compareAssociatedParts(left, right) {
  const nameComparison = clean(left?.name || left?.itemName).localeCompare(
    clean(right?.name || right?.itemName),
    "en",
    { numeric: true, sensitivity: "base" }
  );
  if (nameComparison) return nameComparison;
  return clean(left?.id).localeCompare(clean(right?.id), "en", {
    numeric: true,
    sensitivity: "base",
  });
}

function groupAssociatedParts(candidates = [], entityType, entityId) {
  const groups = { from: new Map(), current: new Map() };

  (Array.isArray(candidates) ? candidates : []).forEach((candidate) => {
    const part = normalizeAssociatedPart(candidate);
    if (!part?.id) return;

    for (const role of ["from", "current"]) {
      if (!matchesEntityRole(part, entityType, entityId, role)) continue;
      if (!groups[role].has(part.id)) groups[role].set(part.id, part);
    }
  });

  return {
    from: Array.from(groups.from.values()).sort(compareAssociatedParts),
    current: Array.from(groups.current.values()).sort(compareAssociatedParts),
  };
}

module.exports = {
  ENTITY_ROLE_FIELDS,
  candidateRecord,
  compareAssociatedParts,
  firstEntityRoleValue,
  getEntityRoleConfig,
  getEntityRoleIds,
  getStoredClientId,
  groupAssociatedParts,
  matchesEntityRole,
  normalizeAssociatedPart,
  normalizeEntityType,
  normalizeRole,
  referenceId,
  selectRoleMachineSnapshot,
  uniqueReferenceCandidates,
  mapSettledWithConcurrency,
  assertAuthoritativeQueriesComplete,
};
