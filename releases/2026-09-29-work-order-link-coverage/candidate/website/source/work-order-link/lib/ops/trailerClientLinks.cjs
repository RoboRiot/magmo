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
    record.bluefolderFormattedAddress ||
      record.blueFolderFormattedAddress ||
      record.location ||
      record.local ||
      record.address ||
      record.city ||
      record.Location
  );
}

function dateValue(value) {
  if (!value) return "";
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString().slice(0, 10);
  }
  const candidate = clean(value, 20);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate)) return "";
  const parsed = new Date(`${candidate}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== candidate
    ? ""
    : candidate;
}

function currentClientName(trailer = {}, previousClient = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return clean(
    record.locationCurrentName ||
      record.currentClientName ||
      (typeof record.locationCurrent === "string"
        ? record.locationCurrent
        : "") ||
      (typeof record.location === "string" ? record.location : "") ||
      clientName(previousClient),
    220
  );
}

function currentClientLocation(trailer = {}, previousClient = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return clean(
    record.locationCurrentClientLocation ||
      record.currentClientLocation ||
      clientLocation(previousClient),
    500
  );
}

function buildTrailerMoveTransition({
  trailer = {},
  trailerId = "",
  previousClient = {},
  targetClient = {},
  targetClientId = "",
  targetClientRef = null,
  movementDate = "",
  changedAtIso = "",
  actor = {},
  auditId = "",
  evidence = "Trailer moved manually in Magmo",
} = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  const normalizedMovementDate = dateValue(movementDate);
  if (!normalizedMovementDate || clean(movementDate, 20) !== normalizedMovementDate) {
    const error = new Error("A valid movement date in YYYY-MM-DD format is required.");
    error.code = "trailer-client/movement-date-required";
    throw error;
  }

  const previousClientId = trailerClientId(record);
  const normalizedTargetClientId = clean(
    targetClientId || referenceId(targetClientRef) || targetClient?.id,
    180
  );
  if (!normalizedTargetClientId) {
    const error = new Error("A target client is required to move a trailer.");
    error.code = "trailer-client/target-required";
    throw error;
  }
  if (previousClientId && previousClientId === normalizedTargetClientId) {
    const error = new Error("The trailer is already at the selected client.");
    error.code = "trailer-client/same-target";
    throw error;
  }

  const normalizedTrailerId = clean(
    trailerId || record.id || record.name,
    180
  );
  const previousName = currentClientName(record, previousClient);
  const previousLocation = currentClientLocation(record, previousClient);
  const targetName = clientName(targetClient, normalizedTargetClientId);
  const targetLocation = clientLocation(targetClient);
  const previousArrivalDate = dateValue(
    record.locationCurrentArrivalDate || record.currentLocationArrivalDate
  );
  const previousClientRef =
    record.currentClient || previousClient?.ref || previousClient?.reference || null;
  const normalizedChangedAtIso =
    clean(changedAtIso, 80) || `${normalizedMovementDate}T00:00:00.000Z`;
  const actorId = clean(actor?.uid || actor?.id || actor?.actorId, 180);
  const actorName = clean(
    actor?.name || actor?.actorName || actor?.email || actorId || "Manual",
    220
  );
  const normalizedAuditId =
    clean(auditId, 180) ||
    [
      "manual-trailer-move",
      normalizedTrailerId || "unknown",
      previousClientId || "unlinked",
      normalizedTargetClientId,
      normalizedMovementDate,
    ].join(":");
  const normalizedEvidence =
    clean(evidence, 700) || "Trailer moved manually in Magmo";
  const provenance = {
    sourceType: "manual",
    label: "Manual",
    actorId,
    actorName,
    changedAtIso: normalizedChangedAtIso,
    evidence: normalizedEvidence,
    auditId: normalizedAuditId,
  };

  const archivedLocation = {
    clientId: previousClientId,
    client: previousClientRef,
    clientName: previousName,
    clientLocation: previousLocation,
    clientNameSnapshot: previousName,
    clientLocationSnapshot: previousLocation,
    arrivalDate: previousArrivalDate,
    departureDate: normalizedMovementDate,
    provenance,
  };
  const existingLocationHistory = (Array.isArray(record.locationHistory)
    ? record.locationHistory
    : []
  ).map((entry) => ({ ...(entry || {}) }));
  const alreadyArchived = existingLocationHistory.some((entry) => {
    const entryClientId =
      referenceId(entry?.client) || clean(entry?.clientId, 180);
    return (
      entryClientId === previousClientId &&
      dateValue(entry?.arrivalDate) === previousArrivalDate &&
      dateValue(entry?.departureDate) === normalizedMovementDate
    );
  });
  const hasPreviousStay = Boolean(
    previousClientId || previousName || previousLocation || previousArrivalDate
  );
  const locationHistory = alreadyArchived || !hasPreviousStay
    ? existingLocationHistory
    : [...existingLocationHistory, archivedLocation];

  const before = {
    currentClientId: previousClientId,
    currentClientName: previousName,
    currentClientLocation: previousLocation,
    currentArrivalDate: previousArrivalDate,
    currentDepartureDate: dateValue(record.locationCurrentDepartureDate),
    nextClientId: clean(record.nextClientId || record.locationNextId, 180),
    locationStatus: clean(record.locationStatus, 80),
  };
  const after = {
    currentClientId: normalizedTargetClientId,
    currentClientName: targetName,
    currentClientLocation: targetLocation,
    currentArrivalDate: normalizedMovementDate,
    currentDepartureDate: "",
    nextClientId: "",
    locationStatus: "onsite",
  };
  const movementAudit = {
    id: normalizedAuditId,
    movementType: "arrived",
    trailerId: normalizedTrailerId,
    fromClientId: previousClientId,
    fromClientName: previousName,
    fromLocation: previousLocation,
    toClientId: normalizedTargetClientId,
    toClientName: targetName,
    toLocation: targetLocation,
    departureDate: normalizedMovementDate,
    arrivalDate: normalizedMovementDate,
    evidence: normalizedEvidence,
    person: { id: actorId, name: actorName },
    changedBy: actorName,
    provenance,
    dates: {
      departureDate: normalizedMovementDate,
      arrivalDate: normalizedMovementDate,
      appliedAtIso: normalizedChangedAtIso,
    },
    before,
    after,
    changedAtIso: normalizedChangedAtIso,
  };
  const existingMovementHistory = (Array.isArray(record.trailerMovementHistory)
    ? record.trailerMovementHistory
    : []
  ).map((entry) => ({ ...(entry || {}) }));
  const priorAudit = existingMovementHistory.find(
    (entry) => clean(entry?.id, 180) === normalizedAuditId
  );
  const trailerMovementHistory = priorAudit
    ? existingMovementHistory
    : [...existingMovementHistory, movementAudit];

  const patch = {
    locationFromId: previousClientId,
    locationFromName: previousName,
    locationFrom: previousName,
    locationFromClientLocation: previousLocation,
    locationCurrentId: normalizedTargetClientId,
    currentClientId: normalizedTargetClientId,
    currentClient: targetClientRef,
    locationCurrentName: targetName,
    currentClientName: targetName,
    locationCurrent: targetName,
    location: targetName,
    locationCurrentClientLocation: targetLocation,
    currentClientLocation: targetLocation,
    locationCurrentArrivalDate: normalizedMovementDate,
    locationCurrentDepartureDate: "",
    locationCurrentProvenance: provenance,
    locationNextId: "",
    nextClientId: "",
    nextClient: null,
    locationNextName: "",
    locationNext: "",
    locationNextClientLocation: "",
    locationNextArrivalDate: "",
    locationNextDepartureDate: "",
    locationNextPlannedArrivalDate: "",
    locationNextPlannedDepartureDate: "",
    locationHistory,
    inTransit: false,
    locationStatus: "onsite",
    transitStatus: "",
    trailerTransitStatus: "",
    trailerTransit: null,
    transitDepartureDate: "",
    transitExpectedArrivalDate: "",
    movementStatus: "onsite",
    currentStatus: "onsite",
    trailerMovementHistory,
    trailerMovementLatest: priorAudit || movementAudit,
  };

  return {
    previousClientId,
    targetClientId: normalizedTargetClientId,
    archivedLocation,
    provenance,
    movementAudit: priorAudit || movementAudit,
    patch,
    nextTrailer: { ...record, ...patch },
  };
}

function trailerClientId(trailer = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return (
    referenceId(record.currentClient) ||
    clean(
      record.currentClientId ||
        record.locationCurrentId,
      180
    ) ||
    referenceId(record.client) ||
    clean(record.clientId, 180)
  );
}

function trailerMachineId(trailer = {}) {
  const record = trailer && typeof trailer === "object" ? trailer : {};
  return (
    referenceId(record.associatedMachine) ||
    clean(
      record.associatedMachineId || record.currentMachineId,
      180
    ) ||
    referenceId(record.machine) ||
    clean(record.machineId, 180)
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
  const clientId = referenceId(selectedClientId) || clean(selectedClientId, 180);
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
  trailers = [],
} = {}) {
  const normalizedClientId = referenceId(clientId) || clean(clientId, 180);
  const trailer = autoTrailerForClient(trailers, normalizedClientId);
  return {
    clientId: normalizedClientId,
    trailerId: trailer
      ? referenceId(trailer.canonicalId || trailer.id) || clean(trailer.id, 180)
      : "",
    machineId: trailer ? trailerMachineId(trailer) : "",
  };
}

function connectionSelectionForTrailer({ trailerId, trailers = [] } = {}) {
  const normalizedTrailerId = referenceId(trailerId) || clean(trailerId, 180);
  const trailer = trailers.find(
    (candidate) =>
      [
        candidate?.canonicalId,
        candidate?.id,
        candidate?.sourceId,
        ...(Array.isArray(candidate?.sourceIds) ? candidate.sourceIds : []),
      ]
        .map((value) => referenceId(value) || clean(value, 180))
        .filter(Boolean)
        .includes(normalizedTrailerId)
  );
  if (!trailer) {
    return { clientId: "", trailerId: "", machineId: "" };
  }
  return {
    clientId: trailerClientId(trailer),
    trailerId:
      referenceId(trailer.canonicalId || trailer.id) || normalizedTrailerId,
    machineId: trailerMachineId(trailer),
  };
}

module.exports = {
  autoTrailerForClient,
  buildTrailerMoveTransition,
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
