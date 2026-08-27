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

function locationText(value) {
  if (!value) return "";
  if (typeof value === "string") return clean(value, 500);
  if (Array.isArray(value)) {
    return value.map(locationText).filter(Boolean).join(", ").slice(0, 500);
  }
  if (typeof value === "object") {
    return Object.values(value)
      .map(locationText)
      .filter(Boolean)
      .join(", ")
      .slice(0, 500);
  }
  return clean(value, 500);
}

function clientName(client = {}, fallback = "") {
  const record = client && typeof client === "object" ? client : {};
  return clean(
    record.name || record.clientName || record.companyName || fallback,
    220
  );
}

function clientLocation(client = {}) {
  const record = client && typeof client === "object" ? client : {};
  return locationText(
    record.location ||
      record.local ||
      record.address ||
      record.city ||
      record.Location
  );
}

function trailerClientId(trailer = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return (
    referenceId(record.currentClient || record.client) ||
    clean(
      record.currentClientId ||
        record.locationCurrentId ||
        record.clientId,
      180
    )
  );
}

function trailerMachineId(trailer = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return (
    referenceId(record.associatedMachine || record.machine) ||
    clean(
      record.associatedMachineId || record.currentMachineId || record.machineId,
      180
    )
  );
}

function trailerName(trailer = {}, fallback = "") {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return clean(
    record.name || record.mondayBoardName || record.id || fallback,
    220
  );
}

function trailersForClient(trailers = [], selectedClientId = "") {
  const clientId = clean(selectedClientId, 180);
  if (!clientId) return [];
  return (Array.isArray(trailers) ? trailers : []).filter(
    (trailer) => trailerClientId(trailer) === clientId
  );
}

function autoTrailerForClient(trailers = [], selectedClientId = "") {
  const matches = trailersForClient(trailers, selectedClientId);
  return matches.length === 1 ? matches[0] : null;
}

function resolveClientRecord(clients = [], clientId = "", clientLabel = "") {
  const id = clean(clientId, 180);
  if (id) {
    const exactId = clients.find((client) => clean(client?.id, 180) === id);
    if (exactId) return exactId;
  }
  const name = clean(clientLabel, 220).toLowerCase();
  if (!name) return null;
  const matches = clients.filter(
    (client) => clientName(client).toLowerCase() === name
  );
  return matches.length === 1 ? matches[0] : null;
}

function connectionSelectionForClient({
  clientId,
  currentTrailerId = "",
  currentMachineId = "",
} = {}) {
  const normalizedClientId = clean(clientId, 180);
  // Client/site, trailer, and machine are independently editable item
  // snapshots. Selecting a client must not silently replace either asset.
  return {
    clientId: normalizedClientId,
    trailerId: clean(currentTrailerId, 180),
    machineId: clean(currentMachineId, 180),
  };
}

function connectionSelectionForTrailer({ trailerId, trailers = [] } = {}) {
  const normalizedTrailerId = clean(trailerId, 180);
  const trailer = trailers.find(
    (candidate) => clean(candidate?.id, 180) === normalizedTrailerId
  );
  if (!trailer) {
    return { clientId: "", trailerId: "", machineId: "" };
  }
  return {
    clientId: trailerClientId(trailer),
    trailerId: normalizedTrailerId,
    machineId: trailerMachineId(trailer),
  };
}

module.exports = {
  autoTrailerForClient,
  clientLocation,
  clientName,
  connectionSelectionForClient,
  connectionSelectionForTrailer,
  locationText,
  referenceId,
  resolveClientRecord,
  trailerClientId,
  trailerMachineId,
  trailerName,
  trailersForClient,
};
