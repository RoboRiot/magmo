import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
const {
  OpsHttpError,
  commandEventId,
  normalizeMovementType,
} = require("./ingestContract.cjs");

const TRAILER_COLLECTION = "Trailers";
const CLIENT_COLLECTION = "Client";
const COMMAND_COLLECTION = "TrailerCommandEvents";
const MAX_MOVEMENT_HISTORY = 50;

function requireDb() {
  if (!adminDb) {
    throw new Error("Firebase Admin Firestore is not initialized.");
  }
  return adminDb;
}

function cleanText(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

function normalizeId(value) {
  const id = cleanText(value, 180);
  return id && !id.includes("/") ? id : "";
}

function dateValue(value) {
  if (!value) return "";
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString().slice(0, 10);
  }
  const candidate = cleanText(value, 20);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate)) return "";
  const parsed = new Date(`${candidate}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== candidate
    ? ""
    : candidate;
}

function clientLocation(data = {}) {
  return cleanText(
    data.location || data.local || data.address || data.city || data.Location,
    300
  );
}

function normalizeProvenance(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const requestedType = cleanText(value.sourceType || value.type, 30).toLowerCase();
  const sourceType = ["ai", "manual"].includes(requestedType)
    ? requestedType
    : "legacy";
  return {
    sourceType,
    label: cleanText(
      value.label || (sourceType === "ai" ? "Magmo AI" : sourceType === "manual" ? "Manual" : "Legacy"),
      80
    ),
    actorId: cleanText(value.actorId, 180),
    actorName: cleanText(value.actorName || value.changedBy, 180),
    changedAtIso: cleanText(value.changedAtIso, 80),
    evidence: cleanText(value.evidence, 700),
    auditId: cleanText(value.auditId, 180),
    slackChannelId: cleanText(value.slackChannelId, 180),
    slackThreadTs: cleanText(value.slackThreadTs, 80),
    slackMessageTs: cleanText(value.slackMessageTs, 80),
  };
}

function serializeClient(snapshot) {
  const data = snapshot.data() || {};
  const name = cleanText(data.name || data.Name || snapshot.id, 180);
  const location = clientLocation(data);
  const aliases = Array.from(
    new Set(
      [
        name,
        cleanText(data.shortName, 120),
        cleanText(data.code, 120),
        cleanText(data.city, 120),
        cleanText(data.local, 120),
      ].filter(Boolean)
    )
  );
  return { id: snapshot.id, name, location, aliases };
}

function serializeTransit(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return {
    fromClientId: normalizeId(value.fromClientId),
    fromClientName: cleanText(value.fromClientName, 180),
    fromClientLocation: cleanText(value.fromClientLocation, 300),
    toClientId: normalizeId(value.toClientId),
    toClientName: cleanText(value.toClientName, 180),
    toClientLocation: cleanText(value.toClientLocation, 300),
    departureDate: dateValue(value.departureDate),
    commandTs: cleanText(value.commandTs, 80),
    evidence: cleanText(value.evidence, 700),
    provenance: normalizeProvenance(value.provenance),
  };
}

function serializeTrailer(snapshot) {
  return serializeTrailerData(snapshot.id, snapshot.data() || {});
}

function serializeTrailerData(id, data = {}) {
  return {
    id,
    name: cleanText(data.name || data.mondayBoardName || id, 180),
    number: cleanText(data.number, 100),
    model: cleanText(data.model, 180),
    vin: cleanText(data.vin, 180),
    currentClientId:
      normalizeId(data.currentClientId) ||
      normalizeId(data.locationCurrentId) ||
      normalizeId(data.currentClient?.id),
    currentClientName: cleanText(
      data.locationCurrentName || data.locationCurrent || data.location,
      180
    ),
    currentClientLocation: cleanText(data.locationCurrentClientLocation, 300),
    currentArrivalDate: dateValue(data.locationCurrentArrivalDate),
    currentDepartureDate: dateValue(data.locationCurrentDepartureDate),
    currentProvenance: normalizeProvenance(data.locationCurrentProvenance),
    nextClientId:
      normalizeId(data.nextClientId) ||
      normalizeId(data.locationNextId) ||
      normalizeId(data.nextClient?.id),
    nextClientName: cleanText(data.locationNextName || data.locationNext, 180),
    nextClientLocation: cleanText(data.locationNextClientLocation, 300),
    transitStatus: cleanText(
      data.trailerTransitStatus || data.locationStatus || (data.inTransit ? "in_transit" : ""),
      40
    ),
    transit: serializeTransit(
      data.trailerTransit ||
        (data.inTransit || cleanText(data.locationStatus, 40) === "transit"
          ? {
              fromClientId: data.locationCurrentId,
              fromClientName: data.locationCurrentName,
              fromClientLocation: data.locationCurrentClientLocation,
              toClientId: data.locationNextId,
              toClientName: data.locationNextName,
              toClientLocation: data.locationNextClientLocation,
              departureDate:
                data.transitDepartureDate || data.locationCurrentDepartureDate,
              evidence: "Manual Magmo transit state",
              provenance: data.trailerMovementLatest?.provenance,
            }
          : {})
    ),
  };
}

function normalizeLocationHistory(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry) => ({
      clientId: normalizeId(entry?.clientId),
      clientName: cleanText(entry?.clientName, 180),
      clientLocation: cleanText(entry?.clientLocation, 300),
      clientNameSnapshot: cleanText(
        entry?.clientNameSnapshot || entry?.clientName,
        180
      ),
      clientLocationSnapshot: cleanText(
        entry?.clientLocationSnapshot || entry?.clientLocation,
        300
      ),
      arrivalDate: dateValue(entry?.arrivalDate),
      departureDate: dateValue(entry?.departureDate),
      provenance: normalizeProvenance(entry?.provenance),
    }))
    .filter((entry) => entry.clientId || entry.clientName)
    .slice(-100);
}

function normalizeMovementHistory(value) {
  return (Array.isArray(value) ? value : [])
    .filter((entry) => entry && typeof entry === "object" && !Array.isArray(entry))
    .slice(-MAX_MOVEMENT_HISTORY);
}

function commandDocumentId(commandTs, source = {}) {
  return commandEventId("trailer.movement", {
    channel: cleanText(source.channel, 180),
    threadTs: cleanText(source.threadTs, 180),
    commandTs: cleanText(commandTs, 80),
  });
}

function normalizeProposals(analysis = {}) {
  const threshold = Math.max(
    0,
    Math.min(1, Number(process.env.TRAILER_COMMAND_MIN_CONFIDENCE || 0.78))
  );
  const proposals = [];
  const rejections = [];
  const seen = new Set();
  (Array.isArray(analysis.updates) ? analysis.updates : [])
    .slice(0, 5)
    .forEach((raw, index) => {
      const proposal = {
        trailerId: normalizeId(raw?.trailerId),
        movementType: normalizeMovementType(raw?.movementType),
        fromClientId: normalizeId(raw?.fromClientId),
        toClientId: normalizeId(raw?.toClientId),
        toClientName: cleanText(raw?.toClientName, 180),
        toClientLocation: cleanText(raw?.toClientLocation, 300),
        departureDate: dateValue(raw?.departureDate),
        arrivalDate: dateValue(raw?.arrivalDate),
        confidence: Math.max(0, Math.min(1, Number(raw?.confidence || 0))),
        evidence: cleanText(raw?.evidence, 700),
      };
      let reason = "";
      if (!proposal.trailerId) reason = "missing trailer ID";
      else if (seen.has(proposal.trailerId)) reason = "duplicate trailer update";
      else if (!proposal.movementType) reason = "invalid movement type";
      else if (proposal.confidence < threshold) reason = "confidence below threshold";
      else if (!proposal.evidence) reason = "missing audit evidence";
      else if (!proposal.toClientId && !proposal.toClientName) {
        reason = "destination was not resolved";
      }
      if (reason) {
        rejections.push({ index, trailerId: proposal.trailerId, reason });
      } else {
        proposals.push(proposal);
        seen.add(proposal.trailerId);
      }
    });
  return { proposals, rejections };
}

function changedFields(before, after) {
  const fields = {};
  Object.keys(after).forEach((key) => {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      fields[key] = { before: before[key] ?? null, after: after[key] ?? null };
    }
  });
  return fields;
}

export async function getTrailerCommandContext() {
  const db = requireDb();
  const [trailerSnapshot, clientSnapshot] = await Promise.all([
    db.collection(TRAILER_COLLECTION).limit(500).get(),
    db.collection(CLIENT_COLLECTION).limit(2000).get(),
  ]);
  const trailers = trailerSnapshot.docs
    .filter((snapshot) => snapshot.id !== "layout_meta")
    .map(serializeTrailer)
    .sort((left, right) => left.name.localeCompare(right.name));
  const clients = clientSnapshot.docs
    .map(serializeClient)
    .sort((left, right) => left.name.localeCompare(right.name));
  return { trailers, clients };
}

export async function applyTrailerMovementCommand({
  commandTs,
  changedBy = "Slack !trailer",
  actor = {},
  analysis = {},
  sourceMessageCount = 0,
  source = {},
}) {
  const normalizedCommandTs = cleanText(commandTs, 80);
  if (!normalizedCommandTs) throw new Error("A Slack command timestamp is required.");
  const normalizedSource = {
    channel: cleanText(source?.channel, 180),
    threadTs: cleanText(source?.threadTs, 180),
    commandTs: normalizedCommandTs,
    command: cleanText(source?.command || source?.commandText, 1000),
    channelName: cleanText(source?.channelName, 180),
    automation: cleanText(source?.automation, 120),
    sourceType: cleanText(source?.sourceType, 30).toLowerCase(),
  };
  if (!normalizedSource.channel || !normalizedSource.threadTs) {
    throw new Error("The Slack channel and thread timestamp are required.");
  }

  const db = requireDb();
  const eventId = commandDocumentId(normalizedCommandTs, normalizedSource);
  const eventRef = db.collection(COMMAND_COLLECTION).doc(eventId);
  const normalized = normalizeProposals(analysis);
  if (normalized.rejections.length) {
    throw new OpsHttpError(
      400,
      "invalid_trailer_movement",
      normalized.rejections.map((entry) => entry.reason).join("; "),
      { details: { rejections: normalized.rejections } }
    );
  }
  const normalizedActor = {
    id: cleanText(actor?.id, 180),
    name: cleanText(actor?.name || changedBy, 180),
  };
  const trailerRefs = normalized.proposals.map((proposal) =>
    db.collection(TRAILER_COLLECTION).doc(proposal.trailerId)
  );
  const requestedClientIds = Array.from(
    new Set(
      normalized.proposals
        .flatMap((proposal) => [proposal.fromClientId, proposal.toClientId])
        .filter(Boolean)
    )
  );
  const clientRefs = requestedClientIds.map((id) =>
    db.collection(CLIENT_COLLECTION).doc(id)
  );

  return db.runTransaction(async (transaction) => {
    const snapshots = await transaction.getAll(eventRef, ...trailerRefs, ...clientRefs);
    const eventSnapshot = snapshots[0];
    if (eventSnapshot.exists) {
      const saved = eventSnapshot.data()?.result || {};
      return { ...saved, idempotentReplay: true };
    }

    const trailerSnapshots = snapshots.slice(1, 1 + trailerRefs.length);
    const clientSnapshots = snapshots.slice(1 + trailerRefs.length);
    const clientById = new Map(
      clientSnapshots
        .filter((snapshot) => snapshot.exists)
        .map((snapshot) => [snapshot.id, serializeClient(snapshot)])
    );
    const changes = [];

    normalized.proposals.forEach((proposal, index) => {
      const snapshot = trailerSnapshots[index];
      if (!snapshot?.exists) {
        throw new OpsHttpError(
          404,
          "trailer_not_found",
          `Trailer ${proposal.trailerId} does not exist.`
        );
      }
      if (proposal.fromClientId && !clientById.has(proposal.fromClientId)) {
        throw new OpsHttpError(
          404,
          "client_not_found",
          `Origin client ${proposal.fromClientId} does not exist.`
        );
      }
      if (proposal.toClientId && !clientById.has(proposal.toClientId)) {
        throw new OpsHttpError(
          404,
          "client_not_found",
          `Destination client ${proposal.toClientId} does not exist.`
        );
      }

      const current = snapshot.data() || {};
      const currentId = normalizeId(current.locationCurrentId);
      const currentName = cleanText(
        current.locationCurrentName || current.locationCurrent || current.location,
        180
      );
      const currentLocation = cleanText(current.locationCurrentClientLocation, 300);
      const currentArrival = dateValue(current.locationCurrentArrivalDate);
      const currentDeparture = dateValue(current.locationCurrentDepartureDate);
      const existingTransit = serializeTransit(current.trailerTransit);
      if (!existingTransit.toClientId && normalizeId(current.locationNextId)) {
        Object.assign(existingTransit, {
          fromClientId: currentId,
          fromClientName: currentName,
          fromClientLocation: currentLocation,
          toClientId: normalizeId(current.locationNextId),
          toClientName: cleanText(current.locationNextName || current.locationNext, 180),
          toClientLocation: cleanText(current.locationNextClientLocation, 300),
          departureDate: dateValue(
            current.transitDepartureDate || current.locationCurrentDepartureDate
          ),
        });
      }
      const fromId = proposal.fromClientId || existingTransit.fromClientId || currentId;
      const typedDestinationName = cleanText(
        existingTransit.toClientName || current.locationNextName || current.locationNext,
        180
      );
      const typedDestinationLocation = cleanText(
        existingTransit.toClientLocation || current.locationNextClientLocation,
        300
      );
      if (!proposal.toClientId) {
        if (
          !typedDestinationName ||
          proposal.toClientName.toLowerCase() !== typedDestinationName.toLowerCase()
        ) {
          throw new OpsHttpError(
            400,
            "destination_mismatch",
            `Trailer ${proposal.trailerId}'s typed destination does not match Magmo's existing in-transit destination.`
          );
        }
        proposal.toClientName = typedDestinationName;
        proposal.toClientLocation = typedDestinationLocation;
      }
      if (proposal.fromClientId && currentId && proposal.fromClientId !== currentId) {
        throw new OpsHttpError(
          400,
          "origin_mismatch",
          `Trailer ${proposal.trailerId}'s proposed origin does not match Magmo's current location.`
        );
      }
      if (
        proposal.movementType === "arrived" &&
        existingTransit.toClientId &&
        proposal.toClientId !== existingTransit.toClientId
      ) {
        throw new OpsHttpError(
          400,
          "destination_mismatch",
          `Trailer ${proposal.trailerId}'s arrival destination does not match its in-transit destination.`
        );
      }
      if (
        proposal.movementType === "moved" &&
        currentId &&
        currentId === proposal.toClientId
      ) {
        throw new OpsHttpError(
          400,
          "already_at_destination",
          `Trailer ${proposal.trailerId} is already at the proposed destination.`
        );
      }

      const fromClient = clientById.get(fromId) || {
        id: fromId,
        name: currentName,
        location: currentLocation,
      };
      const toClient = clientById.get(proposal.toClientId) || {
        id: "",
        name: proposal.toClientName,
        location: proposal.toClientLocation,
      };
      const departureDate = proposal.departureDate || currentDeparture;
      const arrivalDate = proposal.arrivalDate;
      const before = serializeTrailerData(snapshot.id, current);
      let after;
      const update = {};
      const changedAtIso = new Date().toISOString();
      const sourceType =
        normalizedSource.sourceType === "ai" ||
        normalizedSource.automation === "twice_daily_trailer_monitor" ||
        normalizedActor.id === "magmo-ai-trailer-monitor"
          ? "ai"
          : "manual";
      const provenance = {
        sourceType,
        label: sourceType === "ai" ? "Magmo AI" : "Manual",
        actorId: normalizedActor.id,
        actorName: normalizedActor.name,
        changedAtIso,
        evidence: proposal.evidence,
        auditId: eventId,
        slackChannelId: normalizedSource.channel,
        slackThreadTs: normalizedSource.threadTs,
        slackMessageTs: normalizedCommandTs,
      };

      if (["departed", "in_transit"].includes(proposal.movementType)) {
        const transit = {
          fromClientId: fromId,
          fromClientName: cleanText(fromClient?.name, 180),
          fromClientLocation: cleanText(fromClient?.location, 300),
          toClientId: proposal.toClientId,
          toClientName: cleanText(toClient?.name, 180),
          toClientLocation: cleanText(toClient?.location, 300),
          departureDate,
          commandTs: normalizedCommandTs,
          evidence: proposal.evidence,
          provenance,
        };
        Object.assign(update, {
          locationCurrentDepartureDate: departureDate,
          locationNextId: proposal.toClientId,
          nextClientId: proposal.toClientId,
          nextClient: db.collection(CLIENT_COLLECTION).doc(proposal.toClientId),
          locationNextName: cleanText(toClient?.name, 180),
          locationNextClientLocation: cleanText(toClient?.location, 300),
          locationNext: cleanText(toClient?.name, 180),
          locationStatus: "transit",
          inTransit: true,
          transitDepartureDate: departureDate,
          trailerTransitStatus: proposal.movementType,
          trailerTransit: transit,
        });
        after = {
          ...before,
          currentDepartureDate: departureDate,
          nextClientId: proposal.toClientId,
          nextClientName: cleanText(toClient?.name, 180),
          nextClientLocation: cleanText(toClient?.location, 300),
          transitStatus: proposal.movementType,
          transit: serializeTransit(transit),
        };
      } else {
        const locationHistory = normalizeLocationHistory(current.locationHistory);
        if (currentId && currentId !== proposal.toClientId) {
          locationHistory.push({
            clientId: currentId,
            clientName: currentName,
            clientLocation: currentLocation,
            clientNameSnapshot: currentName,
            clientLocationSnapshot: currentLocation,
            arrivalDate: currentArrival,
            departureDate,
            provenance,
          });
        }
        Object.assign(update, {
          locationFromId: fromId,
          locationFromName: cleanText(fromClient?.name, 180),
          locationCurrentId: proposal.toClientId,
          currentClientId: proposal.toClientId,
          currentClient: db.collection(CLIENT_COLLECTION).doc(proposal.toClientId),
          locationCurrentName: cleanText(toClient?.name, 180),
          locationCurrentClientLocation: cleanText(toClient?.location, 300),
          locationCurrentArrivalDate:
            arrivalDate || (currentId === proposal.toClientId ? currentArrival : ""),
          locationCurrentDepartureDate: "",
          locationCurrentProvenance: provenance,
          locationNextId: "",
          nextClientId: "",
          nextClient: null,
          locationNextName: "",
          locationNextClientLocation: "",
          locationNext: "",
          locationStatus: "onsite",
          inTransit: false,
          transitDepartureDate: "",
          transitExpectedArrivalDate: "",
          locationCurrent: cleanText(toClient?.name, 180),
          location: cleanText(toClient?.name, 180),
          locationHistory,
          trailerTransitStatus: proposal.movementType,
          trailerTransit: FieldValue.delete(),
        });
        after = {
          ...before,
          currentClientId: proposal.toClientId,
          currentClientName: cleanText(toClient?.name, 180),
          currentClientLocation: cleanText(toClient?.location, 300),
          currentArrivalDate:
            arrivalDate || (currentId === proposal.toClientId ? currentArrival : ""),
          currentDepartureDate: "",
          currentProvenance: provenance,
          nextClientId: "",
          nextClientName: "",
          nextClientLocation: "",
          transitStatus: proposal.movementType,
          transit: {},
        };
      }

      const appliedChanges = changedFields(before, after);
      if (!Object.keys(appliedChanges).length) {
        throw new OpsHttpError(
          400,
          "no_trailer_change",
          `Trailer ${proposal.trailerId} already has the requested state.`
        );
      }
      const movementAudit = {
        id: eventId,
        commandTs: normalizedCommandTs,
        movementType: proposal.movementType,
        fromClientId: fromId,
        fromClientName: cleanText(fromClient?.name, 180),
        toClientId: proposal.toClientId,
        toClientName: cleanText(toClient?.name, 180),
        departureDate,
        arrivalDate,
        confidence: proposal.confidence,
        evidence: proposal.evidence,
        person: normalizedActor,
        changedBy: normalizedActor.name,
        provenance,
        source: normalizedSource,
        dates: { departureDate, arrivalDate, appliedAtIso: changedAtIso },
        before,
        after,
        appliedChanges,
        changedAtIso,
      };
      const history = normalizeMovementHistory(current.trailerMovementHistory);
      history.push(movementAudit);
      Object.assign(update, {
        trailerMovementHistory: history.slice(-MAX_MOVEMENT_HISTORY),
        trailerMovementLatest: movementAudit,
        trailerCommandInputTokens: FieldValue.increment(
          Math.max(0, Number(analysis?.usage?.inputTokens || 0))
        ),
        trailerCommandOutputTokens: FieldValue.increment(
          Math.max(0, Number(analysis?.usage?.outputTokens || 0))
        ),
        updatedAt: FieldValue.serverTimestamp(),
      });

      transaction.set(snapshot.ref, update, { merge: true });
      changes.push({
        resourceType: "trailer",
        trailerId: snapshot.id,
        trailerName: cleanText(current.name || current.mondayBoardName || snapshot.id, 180),
        trailerNumber: cleanText(current.number, 100),
        movementType: proposal.movementType,
        fromClientId: fromId,
        fromClientName: cleanText(fromClient?.name || currentName, 180),
        fromLocation: cleanText(fromClient?.location || currentLocation, 300),
        toClientId: proposal.toClientId,
        toClientName: cleanText(toClient?.name, 180),
        toLocation: cleanText(toClient?.location, 300),
        departureDate,
        arrivalDate,
        status: proposal.movementType,
        before,
        after,
        appliedChanges,
        auditId: eventId,
      });
    });

    const noChangeReason = changes.length
      ? ""
      : cleanText(analysis?.noChangeReason, 700) ||
        "No validated trailer movement was available to apply.";
    const result = {
      changes,
      changedCount: changes.length,
      noChangeReason,
      rejections: [],
      idempotentReplay: false,
      auditId: eventId,
    };
    transaction.set(eventRef, {
      commandTs: normalizedCommandTs,
      actor: normalizedActor,
      changedBy: normalizedActor.name,
      source: normalizedSource,
      sourceMessageCount: Math.max(0, Number(sourceMessageCount || 0)),
      analysisSummary: cleanText(analysis?.summary, 1000),
      result,
      createdAt: FieldValue.serverTimestamp(),
      createdAtIso: new Date().toISOString(),
    });
    return result;
  });
}
