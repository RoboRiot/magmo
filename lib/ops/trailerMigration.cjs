function clean(value, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return clean(value.split("/").filter(Boolean).pop(), 180);
  }
  if (typeof value === "object") {
    return clean(
      value.id ||
        value._path?.segments?.[value._path.segments.length - 1] ||
        value.path?.split("/").filter(Boolean).pop(),
      180
    );
  }
  return "";
}

function normalizeText(value) {
  return clean(value, 1000)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function trailerNumber(value) {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  const text = clean(value, 300);
  const explicit = text.match(/\bAIS\s*[-_#]?\s*(\d+)\b/i);
  if (explicit) return Number(explicit[1]);
  if (/^\d{1,3}$/.test(text)) return Number(text);
  return null;
}

function recordTrailerNumbers(record = {}) {
  return Array.from(
    new Set(
      [record.id, record.number, record.name, record.mondayBoardName]
        .map(trailerNumber)
        .filter((value) => Number.isInteger(value) && value > 0)
    )
  );
}

function trailerIdentifiers(record = {}) {
  const identifiers = new Set();
  recordTrailerNumbers(record).forEach((number) =>
    identifiers.add(`number:${number}`)
  );
  const mondayBoardId = clean(record.mondayBoardId, 180);
  if (mondayBoardId) identifiers.add(`monday:${mondayBoardId}`);
  const id = clean(record.id, 180).toLowerCase();
  if (id) identifiers.add(`document:${id}`);
  return [...identifiers];
}

class DisjointSet {
  constructor(size) {
    this.parents = Array.from({ length: size }, (_, index) => index);
  }

  find(index) {
    if (this.parents[index] !== index) {
      this.parents[index] = this.find(this.parents[index]);
    }
    return this.parents[index];
  }

  union(left, right) {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (leftRoot !== rightRoot) this.parents[rightRoot] = leftRoot;
  }
}

function recordCompleteness(record = {}) {
  return [
    record.name,
    record.number,
    record.model,
    record.vin,
    record.mondayBoardId,
    record.mondayFolderId,
    record.currentClientId,
    record.locationCurrentId,
    record.associatedMachineId,
    record.locationHistory?.length,
  ].filter(Boolean).length;
}

function groupTrailerRecords(records = []) {
  const trailers = (Array.isArray(records) ? records : []).filter(
    (record) => clean(record?.id) && clean(record?.id) !== "layout_meta"
  );
  const sets = new DisjointSet(trailers.length);
  const identifierOwner = new Map();

  trailers.forEach((record, index) => {
    trailerIdentifiers(record).forEach((identifier) => {
      if (identifierOwner.has(identifier)) {
        sets.union(index, identifierOwner.get(identifier));
      } else {
        identifierOwner.set(identifier, index);
      }
    });
  });

  const grouped = new Map();
  trailers.forEach((record, index) => {
    const root = sets.find(index);
    if (!grouped.has(root)) grouped.set(root, []);
    grouped.get(root).push(record);
  });

  return [...grouped.values()]
    .map((sources) => {
      const numbers = Array.from(
        new Set(sources.flatMap(recordTrailerNumbers))
      ).sort((left, right) => left - right);
      const conflict = numbers.length > 1;
      const number = numbers.length === 1 ? numbers[0] : null;
      const expectedCanonicalId = number ? `AIS${number}` : "";
      const sortedSources = [...sources].sort((left, right) => {
        const leftCanonical =
          expectedCanonicalId &&
          clean(left.id).toLowerCase() === expectedCanonicalId.toLowerCase();
        const rightCanonical =
          expectedCanonicalId &&
          clean(right.id).toLowerCase() === expectedCanonicalId.toLowerCase();
        if (leftCanonical !== rightCanonical) return leftCanonical ? -1 : 1;
        return recordCompleteness(right) - recordCompleteness(left);
      });
      const primary = sortedSources[0];
      const canonicalId = conflict
        ? ""
        : expectedCanonicalId || clean(primary?.id, 180);
      return {
        canonicalId,
        number,
        conflict,
        conflictingNumbers: numbers,
        primary,
        sources: sortedSources,
        sourceIds: sortedSources.map((record) => clean(record.id, 180)),
        legacySourceIds: sortedSources
          .map((record) => clean(record.id, 180))
          .filter((id) => id !== canonicalId),
      };
    })
    .sort((left, right) => {
      if (left.number != null && right.number != null) {
        return left.number - right.number;
      }
      if (left.number != null) return -1;
      if (right.number != null) return 1;
      return left.canonicalId.localeCompare(right.canonicalId, "en", {
        numeric: true,
      });
    });
}

function clientIdFromRecord(record = {}, branch = "current") {
  const current = branch === "current";
  const refFields = current
    ? ["ClientCurrent", "currentClient", "clientCurrent"]
    : ["ClientFrom", "fromClient", "clientFrom", "Client"];
  const idFields = current
    ? ["currentClientId", "clientCurrentId"]
    : ["fromClientId", "clientFromId"];
  for (const field of refFields) {
    const id = referenceId(record[field]);
    if (id) return id;
  }
  for (const field of idFields) {
    const id = clean(record[field], 180);
    if (id) return id;
  }
  return "";
}

function machineIdFromRecord(record = {}, branch = "current") {
  const current = branch === "current";
  const fields = current
    ? ["MachineCurrent", "CurrentMachine", "currentMachine", "Machine"]
    : ["MachineFrom", "Machine", "fromMachine"];
  const idFields = current
    ? ["currentMachineId", "machineCurrentId", "machineId"]
    : ["fromMachineId", "machineFromId", "machineId"];
  for (const field of fields) {
    const id = referenceId(record[field]);
    if (id) return id;
  }
  for (const field of idFields) {
    const id = clean(record[field], 180);
    if (id) return id;
  }
  return "";
}

function trailerIdFromRecord(record = {}, branch = "current") {
  const current = branch === "current";
  const fields = current
    ? ["TrailerCurrent", "currentTrailer", "trailerCurrent"]
    : ["TrailerFrom", "fromTrailer", "trailerFrom"];
  const idFields = current
    ? ["trailerCurrentId", "currentTrailerId"]
    : ["trailerFromId", "fromTrailerId"];
  for (const field of fields) {
    const id = referenceId(record[field]);
    if (id) return id;
  }
  for (const field of idFields) {
    const id = clean(record[field], 180);
    if (id) return id;
  }
  return "";
}

function machineTrailerIndex(groups = []) {
  const index = new Map();
  groups.forEach((group) => {
    if (!group?.canonicalId || group.conflict) return;
    const machineIds = new Set();
    group.sources.forEach((record) => {
      const machineId =
        referenceId(record.associatedMachine) ||
        clean(record.associatedMachineId, 180);
      if (machineId) machineIds.add(machineId);
    });
    machineIds.forEach((machineId) => {
      if (!index.has(machineId)) index.set(machineId, new Set());
      index.get(machineId).add(group.canonicalId);
    });
  });
  return new Map(
    [...index.entries()].map(([machineId, ids]) => [machineId, [...ids]])
  );
}

function sourceTrailerIndex(groups = []) {
  const index = new Map();
  groups.forEach((group) => {
    if (!group?.canonicalId || group.conflict) return;
    group.sourceIds.forEach((sourceId) => index.set(sourceId, group.canonicalId));
  });
  return index;
}

function strictClientDuplicateGroups(clients = []) {
  const candidates = new Map();
  const add = (key, client) => {
    if (!key) return;
    if (!candidates.has(key)) candidates.set(key, []);
    candidates.get(key).push(client);
  };
  (Array.isArray(clients) ? clients : []).forEach((client) => {
    const data = client?.data || client || {};
    const bluefolderLocationId = clean(
      data.bluefolderLocationId || data.blueFolderLocationId,
      180
    );
    if (bluefolderLocationId) {
      add(`bluefolder-location:${bluefolderLocationId}`, client);
      return;
    }
    const name = normalizeText(data.name || data.Name || data.clientName);
    const address = normalizeText(
      data.bluefolderFormattedAddress ||
        data.blueFolderFormattedAddress ||
        data.location ||
        data.local ||
        data.address
    );
    if (name && address) add(`exact-name-address:${name}|${address}`, client);
  });
  return [...candidates.entries()]
    .filter(([, entries]) => entries.length > 1)
    .map(([reason, entries]) => ({
      reason,
      clientIds: entries.map((entry) => clean(entry.id, 180)).sort(),
      clients: entries,
    }));
}

module.exports = {
  clean,
  clientIdFromRecord,
  groupTrailerRecords,
  machineIdFromRecord,
  machineTrailerIndex,
  normalizeText,
  recordTrailerNumbers,
  referenceId,
  sourceTrailerIndex,
  strictClientDuplicateGroups,
  trailerIdFromRecord,
  trailerNumber,
};
