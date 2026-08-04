import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";

const TRAILER_COLLECTION = "Trailers";
const CLIENT_COLLECTION = "Client";
const COMMAND_COLLECTION = "TrailerCommandEvents";
const MOVEMENT_TYPES = new Set(["moved", "departed", "arrived"]);
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
    toClientId: normalizeId(value.toClientId),
    toClientName: cleanText(value.toClientName, 180),
    departureDate: dateValue(value.departureDate),
    commandTs: cleanText(value.commandTs, 80),
  };
}

function serializeTrailer(snapshot) {
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    name: cleanText(data.name || data.mondayBoardName || snapshot.id, 180),
    number: cleanText(data.number, 100),
    model: cleanText(data.model, 180),
    vin: cleanText(data.vin, 180),
    currentClientId: normalizeId(data.locationCurrentId),
    currentClientName: cleanText(
      data.locationCurrentName || data.locationCurrent || data.location,
      180
    ),
    currentClientLocation: cleanText(data.locationCurrentClientLocation, 300),
    currentArrivalDate: dateValue(data.locationCurrentArrivalDate),
    currentDepartureDate: dateValue(data.locationCurrentDepartureDate),
    transitStatus: cleanText(data.trailerTransitStatus, 40),
    transit: serializeTransit(data.trailerTransit),
  };
}

function normalizeLocationHistory(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry) => ({
      clientId: normalizeId(entry?.clientId),
      clientName: cleanText(entry?.clientName, 180),
      clientLocation: cleanText(entry?.clientLocation, 300),
      arrivalDate: dateValue(entry?.arrivalDate),
      departureDate: dateValue(entry?.departureDate),
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
  const identity = [
    cleanText(source.channel, 180),
    cleanText(source.threadTs, 180),
    cleanText(commandTs, 80),
  ].join(":");
  return crypto.createHash("sha256").update(identity).digest("hex");
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
        movementType: cleanText(raw?.movementType, 30).toLowerCase(),
        fromClientId: normalizeId(raw?.fromClientId),
        toClientId: normalizeId(raw?.toClientId),
        departureDate: dateValue(raw?.departureDate),
        arrivalDate: dateValue(raw?.arrivalDate),
        confidence: Math.max(0, Math.min(1, Number(raw?.confidence || 0))),
        evidence: cleanText(raw?.evidence, 700),
      };
      let reason = "";
      if (!proposal.trailerId) reason = "missing trailer ID";
      else if (seen.has(proposal.trailerId)) reason = "duplicate trailer update";
      else if (!MOVEMENT_TYPES.has(proposal.movementType)) reason = "invalid movement type";
      else if (proposal.confidence < threshold) reason = "confidence below threshold";
      else if (!proposal.evidence) reason = "missing audit evidence";
      else if (["moved", "arrived"].includes(proposal.movementType) && !proposal.toClientId) {
        reason = "arrival destination was not resolved";
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
  analysis = {},
  sourceMessageCount = 0,
  source = {},
}) {
  const normalizedCommandTs = cleanText(commandTs, 80);
  if (!normalizedCommandTs) throw new Error("A Slack command timestamp is required.");
  const normalizedSource = {
    channel: cleanText(source?.channel, 180),
    threadTs: cleanText(source?.threadTs, 180),
  };
  if (!normalizedSource.channel || !normalizedSource.threadTs) {
    throw new Error("The Slack channel and thread timestamp are required.");
  }

  const db = requireDb();
  const eventId = commandDocumentId(normalizedCommandTs, normalizedSource);
  const eventRef = db.collection(COMMAND_COLLECTION).doc(eventId);
  const normalized = normalizeProposals(analysis);
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
    const rejections = [...normalized.rejections];

    normalized.proposals.forEach((proposal, index) => {
      const snapshot = trailerSnapshots[index];
      if (!snapshot?.exists) {
        rejections.push({ trailerId: proposal.trailerId, reason: "trailer does not exist" });
        return;
      }
      if (proposal.fromClientId && !clientById.has(proposal.fromClientId)) {
        rejections.push({ trailerId: proposal.trailerId, reason: "origin client does not exist" });
        return;
      }
      if (proposal.toClientId && !clientById.has(proposal.toClientId)) {
        rejections.push({ trailerId: proposal.trailerId, reason: "destination client does not exist" });
        return;
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
      const fromId = proposal.fromClientId || existingTransit.fromClientId || currentId;
      if (proposal.fromClientId && currentId && proposal.fromClientId !== currentId) {
        rejections.push({
          trailerId: proposal.trailerId,
          reason: "proposed origin does not match Magmo's current location",
        });
        return;
      }
      if (
        proposal.movementType === "arrived" &&
        existingTransit.toClientId &&
        proposal.toClientId !== existingTransit.toClientId
      ) {
        rejections.push({
          trailerId: proposal.trailerId,
          reason: "arrival destination does not match the in-transit destination",
        });
        return;
      }
      if (
        proposal.movementType === "moved" &&
        currentId &&
        currentId === proposal.toClientId
      ) {
        rejections.push({
          trailerId: proposal.trailerId,
          reason: "trailer is already at the proposed destination",
        });
        return;
      }

      const fromClient = clientById.get(fromId) || {
        id: fromId,
        name: currentName,
        location: currentLocation,
      };
      const toClient = clientById.get(proposal.toClientId) || null;
      const departureDate = proposal.departureDate || currentDeparture;
      const arrivalDate = proposal.arrivalDate;
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
        changedBy: cleanText(changedBy, 180),
        source: normalizedSource,
        changedAtIso: new Date().toISOString(),
      };
      const history = normalizeMovementHistory(current.trailerMovementHistory);
      history.push(movementAudit);
      const update = {
        trailerMovementHistory: history.slice(-MAX_MOVEMENT_HISTORY),
        trailerMovementLatest: movementAudit,
        trailerCommandInputTokens: FieldValue.increment(
          Math.max(0, Number(analysis?.usage?.inputTokens || 0))
        ),
        trailerCommandOutputTokens: FieldValue.increment(
          Math.max(0, Number(analysis?.usage?.outputTokens || 0))
        ),
        updatedAt: FieldValue.serverTimestamp(),
      };

      let status = "arrived";
      if (proposal.movementType === "departed") {
        status = "in_transit";
        Object.assign(update, {
          locationCurrentDepartureDate: departureDate,
          trailerTransitStatus: "in_transit",
          trailerTransit: {
            fromClientId: fromId,
            fromClientName: cleanText(fromClient?.name, 180),
            fromClientLocation: cleanText(fromClient?.location, 300),
            toClientId: proposal.toClientId,
            toClientName: cleanText(toClient?.name, 180),
            toClientLocation: cleanText(toClient?.location, 300),
            departureDate,
            commandTs: normalizedCommandTs,
            evidence: proposal.evidence,
          },
        });
      } else {
        const locationHistory = normalizeLocationHistory(current.locationHistory);
        if (currentId && currentId !== proposal.toClientId) {
          locationHistory.push({
            clientId: currentId,
            clientName: currentName,
            clientLocation: currentLocation,
            arrivalDate: currentArrival,
            departureDate,
          });
        }
        Object.assign(update, {
          locationFromId: fromId,
          locationFromName: cleanText(fromClient?.name, 180),
          locationCurrentId: proposal.toClientId,
          locationCurrentName: cleanText(toClient?.name, 180),
          locationCurrentClientLocation: cleanText(toClient?.location, 300),
          locationCurrentArrivalDate:
            arrivalDate || (currentId === proposal.toClientId ? currentArrival : ""),
          locationCurrentDepartureDate: "",
          locationCurrent: cleanText(toClient?.name, 180),
          location: cleanText(toClient?.name, 180),
          locationHistory,
          trailerTransitStatus: "arrived",
          trailerTransit: FieldValue.delete(),
        });
      }

      transaction.set(snapshot.ref, update, { merge: true });
      changes.push({
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
        status,
      });
    });

    const noChangeReason = changes.length
      ? ""
      : cleanText(analysis?.noChangeReason, 700) ||
        cleanText(rejections[0]?.reason, 700) ||
        "No validated trailer movement was available to apply.";
    const result = {
      changes,
      changedCount: changes.length,
      noChangeReason,
      rejections,
      idempotentReplay: false,
    };
    transaction.set(eventRef, {
      commandTs: normalizedCommandTs,
      changedBy: cleanText(changedBy, 180),
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

