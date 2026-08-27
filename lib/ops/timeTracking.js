import { createHash } from "crypto";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
import { defaultOpsOversightManagers } from "./workOrders";
const {
  responsibilityEvidenceForUser,
} = require("./responsibilityEvidence.cjs");

export const OPS_TIME_ENTRY_COLLECTION = "OpsTimeEntries";
export const OPS_OPEN_CLOCK_COLLECTION = "OpsOpenClocks";
export const OPS_CLOCK_APPROVAL_COLLECTION = "OpsClockOutApprovals";
export const OPS_TIME_EDIT_REQUEST_COLLECTION = "OpsTimeEditRequests";

export const OPS_LF_WAREHOUSE = {
  type: "warehouse",
  label: "LF warehouse",
  address: "25742 Atlantic Ocean Dr, Lake Forest, CA 92630",
};

const SLACK_IDENTITY_CACHE_MS = 30 * 60 * 1000;
const slackIdentityCache = new Map();

function requireDb() {
  if (!adminDb) throw new Error("Firebase Admin is not available.");
  return adminDb;
}

function clean(value, limit = 1000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function normalizeEmail(value) {
  return clean(value, 320).toLowerCase();
}

function normalizeLookup(value) {
  return clean(value, 500)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function locationValue(value) {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number") {
    return clean(value, 500);
  }
  if (Array.isArray(value)) {
    return value.map(locationValue).filter(Boolean).join(", ").slice(0, 500);
  }
  if (typeof value === "object") {
    if (value.formatted || value.formattedAddress) {
      return clean(value.formatted || value.formattedAddress, 500);
    }
    const ordered = [
      value.streetAddress,
      value.addressLine1,
      value.address1,
      value.street,
      value.addressStreet,
      value.line1,
      value.addressLine2,
      value.address2,
      value.line2,
      value.city,
      value.addressCity,
      value.state,
      value.addressState,
      value.region,
      value.postalCode,
      value.addressPostalCode,
      value.zip,
      value.zipCode,
      value.country,
      value.addressCountry,
      value.formatted,
    ]
      .map(locationValue)
      .filter(Boolean);
    return [...new Set(ordered)].join(", ").slice(0, 500);
  }
  return "";
}

function clientAddress(data = {}) {
  const structured = [
    data.streetAddress,
    data.addressLine1,
    data.address1,
    data.street,
    data.addressLine2,
    data.address2,
    data.city,
    data.state,
    data.region,
    data.postalCode,
    data.zip,
    data.zipCode,
    data.country,
  ]
    .map(locationValue)
    .filter(Boolean);
  if (structured.length) return [...new Set(structured)].join(", ").slice(0, 500);
  return locationValue(
    data.address ||
      data.bluefolderPrimaryLocation ||
      data.location ||
      data.serviceLocation
  );
}

function clientOption(snapshot) {
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    label: clean(
      data.name || data.clientName || data.companyName || snapshot.id,
      220
    ),
    address: clientAddress(data),
  };
}

async function listTravelSites(db) {
  const snapshot = await db.collection("Client").limit(750).get();
  return snapshot.docs
    .map(clientOption)
    .filter((site) => site.label)
    .sort((left, right) => left.label.localeCompare(right.label));
}

function findWorkOrderSite(workOrder = {}, sites = []) {
  const directId = clean(workOrder.clientId, 180);
  if (directId) {
    const direct = sites.find((site) => site.id === directId);
    if (direct) return direct;
  }
  const candidates = [
    workOrder.clientName,
    workOrder.customer,
  ]
    .map(normalizeLookup)
    .filter(Boolean);
  const matches = sites.filter((site) =>
    candidates.includes(normalizeLookup(site.label))
  );
  return matches.length === 1 ? matches[0] : null;
}

function secondsFromGoogleDuration(value) {
  const match = String(value || "").trim().match(/^(\d+(?:\.\d+)?)s$/);
  return match ? Math.max(0, Math.round(Number(match[1]))) : 0;
}

async function calculateTravelRoute(originAddress, destinationAddress) {
  const origin = clean(originAddress, 500);
  const destination = clean(destinationAddress, 500);
  if (!origin || !destination) {
    return {
      available: false,
      reason: "The origin or client destination address is missing.",
    };
  }
  const apiKey = clean(
    process.env.GOOGLE_MAPS_ROUTES_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
    500
  );
  if (!apiKey) {
    return {
      available: false,
      reason: "Automatic routing is not configured.",
    };
  }
  try {
    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
        },
        body: JSON.stringify({
          origin: { address: origin },
          destination: { address: destination },
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE",
          computeAlternativeRoutes: false,
          languageCode: "en-US",
          units: "IMPERIAL",
        }),
      }
    );
    const data = await response.json().catch(() => ({}));
    const durationSeconds = secondsFromGoogleDuration(data?.routes?.[0]?.duration);
    if (!response.ok || !durationSeconds) {
      return {
        available: false,
        reason: "Google Maps could not calculate this route.",
      };
    }
    return {
      available: true,
      provider: "google_routes",
      minutes: Math.max(1, Math.ceil(durationSeconds / 60)),
      distanceMeters: Math.max(0, Number(data.routes[0].distanceMeters || 0)),
    };
  } catch {
    return {
      available: false,
      reason: "The routing service is temporarily unavailable.",
    };
  }
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}

function validTimeRange(startIso, endIso, errorLabel = "time entry") {
  const start = new Date(startIso || "");
  const end = new Date(endIso || "");
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end <= start
  ) {
    throw new Error(`Choose a valid start and end time for the ${errorLabel}.`);
  }
  if (end.getTime() - start.getTime() > 24 * 3600000) {
    throw new Error("A time entry cannot exceed 24 hours.");
  }
  return { start, end };
}

function sameInstant(left, right) {
  const leftMs = Date.parse(left || "");
  const rightMs = Date.parse(right || "");
  return Number.isFinite(leftMs) && Number.isFinite(rightMs) && leftMs === rightMs;
}

function slackDisplayName(user = {}, fallbackEmail = "") {
  const profile = user.profile || {};
  return clean(
    profile.display_name ||
      profile.real_name ||
      user.real_name ||
      user.name ||
      normalizeEmail(fallbackEmail).split("@")[0],
    120
  );
}

export async function lookupSlackUserByEmail(rawEmail) {
  const email = normalizeEmail(rawEmail);
  if (!email) {
    return {
      matched: false,
      id: "",
      name: "",
      email: "",
      reason: "No login email was available for Slack matching.",
    };
  }

  const cached = slackIdentityCache.get(email);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const token = clean(process.env.SLACK_BOT_TOKEN, 500);
  if (!token) {
    return {
      matched: false,
      id: "",
      name: email.split("@")[0],
      email,
      reason: "Slack email matching is not configured.",
    };
  }

  let value;
  try {
    const url = new URL("https://slack.com/api/users.lookupByEmail");
    url.searchParams.set("email", email);
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.ok || !data?.user?.id) {
      const code = clean(data?.error, 80);
      value = {
        matched: false,
        id: "",
        name: email.split("@")[0],
        email,
        reason:
          code === "users_not_found"
            ? "No active Slack account uses this login email."
            : code === "missing_scope"
              ? "The Slack app needs the users:read.email permission."
              : "Slack email matching is temporarily unavailable.",
      };
    } else {
      value = {
        matched: true,
        id: clean(data.user.id, 80),
        name: slackDisplayName(data.user, email),
        email: normalizeEmail(data.user.profile?.email || email),
        avatar: clean(
          data.user.profile?.image_72 || data.user.profile?.image_48,
          1000
        ),
        reason: "",
      };
    }
  } catch {
    value = {
      matched: false,
      id: "",
      name: email.split("@")[0],
      email,
      reason: "Slack email matching is temporarily unavailable.",
    };
  }

  slackIdentityCache.set(email, {
    expiresAt: Date.now() + SLACK_IDENTITY_CACHE_MS,
    value,
  });
  return value;
}

export function workOrderIsAssignedToUser(workOrder = {}, identity = {}) {
  const slackId = clean(identity.id, 80).toLowerCase();
  const email = normalizeEmail(identity.email);
  return (workOrder.assignees || []).some((assignee) => {
    const assigneeId = clean(assignee?.id, 80).toLowerCase();
    const assigneeEmail = normalizeEmail(assignee?.email);
    return Boolean(
      (slackId && assigneeId === slackId) ||
        (email && assigneeEmail === email)
    );
  });
}

/**
 * Returns only affirmative remote/physical responsibility evidence for a current
 * assignee. Merely appearing in the assignee array is intentionally not enough:
 * older AI records may contain notification-list or administrative false positives.
 */
export function workOrderResponsibilityEvidenceForUser(
  workOrder = {},
  identity = {},
  { hasRecordedTime = false } = {}
) {
  return responsibilityEvidenceForUser(workOrder, identity, {
    hasRecordedTime,
  });
}

export function workOrderWasParticipatedInByUser(
  workOrder = {},
  identity = {}
) {
  const slackId = clean(identity.id, 80).toLowerCase();
  const email = normalizeEmail(identity.email);
  return (workOrder.participants || []).some((participant) => {
    const participantId = clean(participant?.id, 80).toLowerCase();
    const participantEmail = normalizeEmail(participant?.email);
    return Boolean(
      (slackId && participantId === slackId) ||
        (email && participantEmail === email)
    );
  });
}

function serializeTimeEntry(snapshot) {
  const data =
    snapshot && typeof snapshot.data === "function"
      ? snapshot.data() || {}
      : snapshot?.data || {};
  const id = snapshot?.id || clean(data.id, 180);
  const startedAt = timestampToIso(data.startedAt) || clean(data.startedAtIso, 80);
  const endedAt = timestampToIso(data.endedAt) || clean(data.endedAtIso, 80);
  return {
    id,
    workOrderId: clean(data.workOrderId, 180),
    workOrderNumber: clean(data.workOrderNumber, 120),
    workOrderSubject: clean(data.workOrderSubject, 500),
    userUid: clean(data.userUid, 180),
    userEmail: normalizeEmail(data.userEmail),
    person: {
      id: clean(data.slackUserId || data.userUid, 180),
      name: clean(data.userName || data.userEmail, 120),
    },
    slackUserId: clean(data.slackUserId, 80),
    sourceEventId: clean(data.sourceEventId, 500),
    source:
      clean(data.source, 60) === "calendar_correction"
        ? "calendar_correction"
        : "manual_clock",
    mode: "in_person",
    timeType: clean(data.timeType, 20) === "travel" ? "travel" : "work",
    status: ["closed", "pending_approval"].includes(data.status)
      ? data.status
      : "open",
    startedAt,
    endedAt,
    durationMinutes: Math.max(0, Number(data.durationMinutes || 0)),
    clockOutRequestedAt:
      timestampToIso(data.clockOutRequestedAt) ||
      clean(data.clockOutRequestedAtIso, 80),
    approvalId: clean(data.approvalId, 180),
    approvedByName: clean(data.approvedByName, 120),
    approvalStatus: clean(data.approvalStatus, 40),
    isOvertime: Boolean(data.isOvertime),
    travel:
      data.travel && typeof data.travel === "object"
        ? {
            originType: clean(data.travel.originType, 30),
            originLabel: clean(data.travel.originLabel, 220),
            originAddress: clean(data.travel.originAddress, 500),
            originClientId: clean(data.travel.originClientId, 180),
            destinationLabel: clean(data.travel.destinationLabel, 220),
            destinationAddress: clean(data.travel.destinationAddress, 500),
            destinationClientId: clean(data.travel.destinationClientId, 180),
            etaMinutes: Math.max(0, Number(data.travel.etaMinutes || 0)),
            estimatedArrivalAtIso: clean(
              data.travel.estimatedArrivalAtIso,
              80
            ),
            routeProvider: clean(data.travel.routeProvider, 60),
            manualEta: Boolean(data.travel.manualEta),
          }
        : null,
    slackStartNotification:
      data.slackStartNotification &&
      typeof data.slackStartNotification === "object"
        ? {
            status: clean(data.slackStartNotification.status, 30),
            messageTs: clean(data.slackStartNotification.messageTs, 120),
            error: clean(data.slackStartNotification.error, 500),
          }
        : null,
    correctionNotes: clean(data.correctionNotes || data.hourEditNotes, 1200),
    splitRootId: clean(data.splitRootId, 180),
    splitFromEntryId: clean(data.splitFromEntryId, 180),
  };
}

function serializeTimeEditRequest(snapshot) {
  const data =
    snapshot && typeof snapshot.data === "function"
      ? snapshot.data() || {}
      : snapshot?.data || {};
  return {
    id: snapshot?.id || clean(data.id, 180),
    type: "time_edit",
    status: ["pending", "approved", "denied", "blocked"].includes(data.status)
      ? data.status
      : "pending",
    requesterUid: clean(data.requesterUid || data.requester?.uid, 180),
    requester: {
      uid: clean(data.requester?.uid || data.requesterUid, 180),
      email: normalizeEmail(data.requester?.email || data.requesterEmail),
      name: clean(data.requester?.name || data.requesterName, 120),
      slackUserId: clean(
        data.requester?.slackUserId || data.requesterSlackUserId,
        80
      ),
    },
    workOrder: {
      id: clean(data.workOrder?.id || data.workOrderId, 180),
      number: clean(data.workOrder?.number || data.workOrderNumber, 120),
      subject: clean(data.workOrder?.subject || data.workOrderSubject, 500),
    },
    timeEntryId: clean(data.timeEntryId, 180),
    entryId: clean(data.timeEntryId, 180),
    requested: {
      startIso: clean(data.requested?.startIso, 80),
      endIso: clean(data.requested?.endIso, 80),
      timeType:
        clean(data.requested?.timeType, 20) === "travel" ? "travel" : "work",
      reason: clean(data.requested?.reason, 1200),
    },
    original: {
      startIso: clean(data.original?.startIso, 80),
      endIso: clean(data.original?.endIso, 80),
      durationMinutes: Math.max(0, Number(data.original?.durationMinutes || 0)),
      timeType:
        clean(data.original?.timeType, 20) === "travel" ? "travel" : "work",
      isOvertime: Boolean(data.original?.isOvertime),
    },
    revision: Math.max(1, Number(data.revision || 1)),
    createdAtIso: timestampToIso(data.createdAt) || clean(data.createdAtIso, 80),
    updatedAtIso: timestampToIso(data.updatedAt) || clean(data.updatedAtIso, 80),
    decision:
      data.decision && typeof data.decision === "object"
        ? {
            approved: Boolean(data.decision.approved),
            status: clean(data.decision.status, 40),
            note: clean(data.decision.note, 1200),
            byUid: clean(data.decision.byUid, 180),
            byEmail: normalizeEmail(data.decision.byEmail),
            byName: clean(data.decision.byName, 120),
            decidedAtIso: clean(data.decision.decidedAtIso, 80),
          }
        : null,
    slackDm:
      data.slackDm && typeof data.slackDm === "object"
        ? {
            status: clean(data.slackDm.status, 40),
            ts: clean(data.slackDm.ts, 80),
            error: clean(data.slackDm.error, 500),
            attemptedAtIso: clean(data.slackDm.attemptedAtIso, 80),
          }
        : null,
  };
}

export async function saveOpsCalendarCorrection({
  sourceEventId,
  workOrderId,
  workOrderNumber,
  workOrderSubject,
  person = {},
  startIso,
  endIso,
  timeType = "work",
  notes = "",
  changedBy = "",
  isOvertime = false,
}) {
  const { start, end } = validTimeRange(startIso, endIso, "onsite session");
  const normalizedWorkOrderId = clean(workOrderId, 180);
  const personId = clean(person.id || person.name, 180);
  if (!normalizedWorkOrderId || !personId) {
    throw new Error("The work order and engineer are required.");
  }
  const correctionKey = [
    clean(sourceEventId, 500),
    normalizedWorkOrderId,
    personId,
  ].join("::");
  const correctionId = `calendar-${createHash("sha256")
    .update(correctionKey)
    .digest("hex")
    .slice(0, 32)}`;
  const now = Timestamp.now();
  await requireDb()
    .collection(OPS_TIME_ENTRY_COLLECTION)
    .doc(correctionId)
    .set(
      {
        workOrderId: normalizedWorkOrderId,
        workOrderNumber: clean(workOrderNumber, 120),
        workOrderSubject: clean(workOrderSubject, 500),
        userUid: `calendar:${personId}`,
        userEmail: "",
        userName: clean(person.name || personId, 120),
        slackUserId: clean(person.id, 80),
        source: "calendar_correction",
        sourceEventId: clean(sourceEventId, 500),
        mode: "in_person",
        timeType: clean(timeType, 20).toLowerCase() === "travel" ? "travel" : "work",
        status: "closed",
        startedAt: Timestamp.fromDate(start),
        startedAtIso: start.toISOString(),
        endedAt: Timestamp.fromDate(end),
        endedAtIso: end.toISOString(),
        durationMinutes: Math.max(
          1,
          Math.round((end.getTime() - start.getTime()) / 60000)
        ),
        isOvertime: Boolean(isOvertime),
        correctionNotes: clean(notes, 1200),
        changedBy: clean(changedBy, 180),
        updatedAt: now,
        createdAt: now,
      },
      { merge: true }
    );
  return serializeTimeEntry(
    await requireDb()
      .collection(OPS_TIME_ENTRY_COLLECTION)
      .doc(correctionId)
      .get()
  );
}

export async function updateOpsTimeEntryHours({
  entryId,
  startIso,
  endIso,
  notes = "",
  changedBy = "",
  isOvertime,
}) {
  const { start, end } = validTimeRange(startIso, endIso, "clock session");
  const ref = timeEntryRef(entryId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error("That clock record no longer exists.");
    const current = snapshot.data() || {};
    if (clean(current.source, 60) !== "manual_clock") {
      throw new Error("Only an Ops-General clock record can be edited here.");
    }
    if (clean(current.status, 40) !== "closed") {
      throw new Error("Clock out before changing the recorded hours.");
    }
    const history = Array.isArray(current.hourEditHistory)
      ? current.hourEditHistory.slice(-49)
      : [];
    history.push({
      previousStartedAtIso:
        timestampToIso(current.startedAt) || clean(current.startedAtIso, 80),
      previousEndedAtIso:
        timestampToIso(current.endedAt) || clean(current.endedAtIso, 80),
      previousDurationMinutes: Number(current.durationMinutes || 0),
      previousTimeType:
        clean(current.timeType, 20) === "travel" ? "travel" : "work",
      previousIsOvertime: Boolean(current.isOvertime),
      changedBy: clean(changedBy, 180),
      notes: clean(notes, 1200),
      changedAtIso: new Date().toISOString(),
    });
    const now = Timestamp.now();
    transaction.update(ref, {
      startedAt: Timestamp.fromDate(start),
      startedAtIso: start.toISOString(),
      endedAt: Timestamp.fromDate(end),
      endedAtIso: end.toISOString(),
      durationMinutes: Math.max(
        1,
        Math.round((end.getTime() - start.getTime()) / 60000)
      ),
      hourEditHistory: history,
      hourEditNotes: clean(notes, 1200),
      hoursEditedBy: clean(changedBy, 180),
      hoursEditedAt: now,
      ...(typeof isOvertime === "boolean"
        ? { isOvertime }
        : {}),
      updatedAt: now,
    });
  });
  return serializeTimeEntry(await ref.get());
}

function timeEntryRef(entryId) {
  const normalized = clean(entryId, 180);
  if (!normalized || normalized.includes("/")) {
    throw new Error("A valid time entry is required.");
  }
  return requireDb().collection(OPS_TIME_ENTRY_COLLECTION).doc(normalized);
}

function timeEditRequestRef(requestId) {
  const normalized = clean(requestId, 180);
  if (!normalized || normalized.includes("/")) {
    throw new Error("A valid time-edit request is required.");
  }
  return requireDb().collection(OPS_TIME_EDIT_REQUEST_COLLECTION).doc(normalized);
}

export async function requestOpsTimeEntryEdit({
  userUid,
  userEmail,
  userName,
  slackUserId = "",
  entryId,
  startIso,
  endIso,
  timeType = "work",
  reason = "",
}) {
  const uid = clean(userUid, 180);
  const email = normalizeEmail(userEmail);
  if (!uid || !email) throw new Error("An authenticated user is required.");
  const normalizedEntryId = clean(entryId, 180);
  const requestedReason = clean(reason, 1200);
  if (!requestedReason) throw new Error("Explain why the recorded hours should change.");
  const { start, end } = validTimeRange(startIso, endIso, "requested edit");
  const entryRef = timeEntryRef(normalizedEntryId);
  const requestRef = timeEditRequestRef(normalizedEntryId);
  const now = Timestamp.now();
  const nowIso = now.toDate().toISOString();

  await requireDb().runTransaction(async (transaction) => {
    const [entrySnapshot, requestSnapshot] = await Promise.all([
      transaction.get(entryRef),
      transaction.get(requestRef),
    ]);
    if (!entrySnapshot.exists) throw new Error("That clock record no longer exists.");
    const entry = entrySnapshot.data() || {};
    if (clean(entry.userUid, 180) !== uid) {
      throw new Error("You can only request changes to your own recorded hours.");
    }
    if (clean(entry.source, 60) !== "manual_clock") {
      throw new Error("Only an Ops-General clock record can be changed by request.");
    }
    if (clean(entry.status, 40) !== "closed") {
      throw new Error("Clock out before requesting a change to the recorded hours.");
    }
    const currentRequest = requestSnapshot.exists
      ? requestSnapshot.data() || {}
      : {};
    if (
      requestSnapshot.exists &&
      clean(currentRequest.requesterUid || currentRequest.requester?.uid, 180) !== uid
    ) {
      throw new Error("That time entry already has a request from another user.");
    }
    if (requestSnapshot.exists && clean(currentRequest.status, 40) === "pending") {
      throw new Error("An edit request is already pending for that time entry.");
    }
    const decisionHistory = Array.isArray(currentRequest.decisionHistory)
      ? currentRequest.decisionHistory.slice(-24)
      : [];
    if (currentRequest.decision) {
      decisionHistory.push(currentRequest.decision);
    }
    const entryStartedAt =
      timestampToIso(entry.startedAt) || clean(entry.startedAtIso, 80);
    const entryEndedAt =
      timestampToIso(entry.endedAt) || clean(entry.endedAtIso, 80);
    transaction.set(
      requestRef,
      {
        type: "time_edit",
        status: "pending",
        requesterUid: uid,
        requester: {
          uid,
          email,
          name: clean(userName || email.split("@")[0], 120),
          slackUserId: clean(slackUserId, 80),
        },
        workOrder: {
          id: clean(entry.workOrderId, 180),
          number: clean(entry.workOrderNumber, 120),
          subject: clean(entry.workOrderSubject, 500),
        },
        timeEntryId: normalizedEntryId,
        requested: {
          startIso: start.toISOString(),
          endIso: end.toISOString(),
          timeType:
            clean(timeType, 20).toLowerCase() === "travel"
              ? "travel"
              : "work",
          reason: requestedReason,
        },
        original: {
          startIso: entryStartedAt,
          endIso: entryEndedAt,
          durationMinutes: Math.max(0, Number(entry.durationMinutes || 0)),
          timeType:
            clean(entry.timeType, 20) === "travel" ? "travel" : "work",
          isOvertime: Boolean(entry.isOvertime),
        },
        revision: Math.max(0, Number(currentRequest.revision || 0)) + 1,
        decision: null,
        decisionHistory,
        slackDm: null,
        createdAt: requestSnapshot.exists
          ? currentRequest.createdAt || now
          : now,
        createdAtIso: requestSnapshot.exists
          ? clean(currentRequest.createdAtIso, 80) || nowIso
          : nowIso,
        updatedAt: now,
        updatedAtIso: nowIso,
      },
      { merge: false }
    );
  });
  return serializeTimeEditRequest(await requestRef.get());
}

export async function listOpsTimeEditRequestsForUser(userUid) {
  const uid = clean(userUid, 180);
  if (!uid) return [];
  const snapshot = await requireDb()
    .collection(OPS_TIME_EDIT_REQUEST_COLLECTION)
    .where("requesterUid", "==", uid)
    .limit(100)
    .get();
  return snapshot.docs
    .map(serializeTimeEditRequest)
    .sort(
      (left, right) =>
        Date.parse(right.updatedAtIso || 0) - Date.parse(left.updatedAtIso || 0)
    );
}

export async function listPendingOpsTimeEditRequests() {
  const snapshot = await requireDb()
    .collection(OPS_TIME_EDIT_REQUEST_COLLECTION)
    .where("status", "==", "pending")
    .limit(200)
    .get();
  return snapshot.docs
    .map(serializeTimeEditRequest)
    .sort(
      (left, right) =>
        Date.parse(left.createdAtIso || 0) - Date.parse(right.createdAtIso || 0)
    );
}

export async function reviewOpsTimeEditRequest({
  requestId,
  approved,
  decidedByUid = "",
  decidedByEmail = "",
  decidedByName = "",
  note = "",
}) {
  const requestRef = timeEditRequestRef(requestId);
  let entryId = "";
  let idempotent = false;
  await requireDb().runTransaction(async (transaction) => {
    const requestSnapshot = await transaction.get(requestRef);
    if (!requestSnapshot.exists) throw new Error("That time-edit request no longer exists.");
    const request = requestSnapshot.data() || {};
    if (clean(request.status, 40) !== "pending") {
      idempotent = true;
      entryId = clean(request.timeEntryId, 180);
      return;
    }
    entryId = clean(request.timeEntryId, 180);
    const entryRef = timeEntryRef(entryId);
    const entrySnapshot = await transaction.get(entryRef);
    if (!entrySnapshot.exists) throw new Error("The clock record no longer exists.");
    const entry = entrySnapshot.data() || {};
    const now = Timestamp.now();
    const nowIso = now.toDate().toISOString();
    const currentStart =
      timestampToIso(entry.startedAt) || clean(entry.startedAtIso, 80);
    const currentEnd = timestampToIso(entry.endedAt) || clean(entry.endedAtIso, 80);
    const stale =
      !sameInstant(currentStart, request.original?.startIso) ||
      !sameInstant(currentEnd, request.original?.endIso) ||
      clean(entry.status, 40) !== "closed" ||
      clean(entry.source, 60) !== "manual_clock" ||
      clean(entry.userUid, 180) !==
        clean(request.requesterUid || request.requester?.uid, 180);
    const decisionStatus = !approved
      ? "denied"
      : stale
        ? "blocked"
        : "approved";
    const decisionNote = stale
      ? "The recorded time changed after this request was submitted. Review the current entry and submit a new request."
      : clean(note, 1200);
    const decision = {
      approved: decisionStatus === "approved",
      status: decisionStatus,
      note: decisionNote,
      byUid: clean(decidedByUid, 180),
      byEmail: normalizeEmail(decidedByEmail),
      byName: clean(decidedByName || decidedByEmail, 120),
      decidedAtIso: nowIso,
    };
    if (decisionStatus === "approved") {
      const { start, end } = validTimeRange(
        request.requested?.startIso,
        request.requested?.endIso,
        "requested edit"
      );
      const history = Array.isArray(entry.hourEditHistory)
        ? entry.hourEditHistory.slice(-49)
        : [];
      history.push({
        previousStartedAtIso: currentStart,
        previousEndedAtIso: currentEnd,
        previousDurationMinutes: Number(entry.durationMinutes || 0),
        previousTimeType:
          clean(entry.timeType, 20) === "travel" ? "travel" : "work",
        previousIsOvertime: Boolean(entry.isOvertime),
        changedBy: normalizeEmail(decidedByEmail) || clean(decidedByUid, 180),
        notes: `Approved employee request: ${clean(request.requested?.reason, 1200)}`,
        requestId: requestRef.id,
        changedAtIso: nowIso,
      });
      transaction.update(entryRef, {
        startedAt: Timestamp.fromDate(start),
        startedAtIso: start.toISOString(),
        endedAt: Timestamp.fromDate(end),
        endedAtIso: end.toISOString(),
        durationMinutes: Math.max(
          1,
          Math.round((end.getTime() - start.getTime()) / 60000)
        ),
        timeType:
          clean(request.requested?.timeType, 20) === "travel"
            ? "travel"
            : "work",
        hourEditHistory: history,
        hourEditNotes: clean(request.requested?.reason, 1200),
        hoursEditedBy: normalizeEmail(decidedByEmail) || clean(decidedByUid, 180),
        hoursEditedAt: now,
        updatedAt: now,
      });
    }
    transaction.set(
      requestRef,
      {
        status: decisionStatus,
        decision,
        updatedAt: now,
        updatedAtIso: nowIso,
      },
      { merge: true }
    );
  });
  return {
    request: serializeTimeEditRequest(await requestRef.get()),
    entry: entryId ? serializeTimeEntry(await timeEntryRef(entryId).get()) : null,
    idempotent,
  };
}

export async function recordOpsTimeEditRequestSlackDelivery({
  requestId,
  status,
  ts = "",
  error = "",
}) {
  const ref = timeEditRequestRef(requestId);
  await ref.set(
    {
      slackDm: {
        status: clean(status, 40),
        ts: clean(ts, 80),
        error: clean(error, 500),
        attemptedAtIso: new Date().toISOString(),
      },
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
}

export async function setOpsTimeEntryOvertime({
  entryId,
  isOvertime,
  changedBy = "Magmo admin",
  notes = "",
}) {
  const ref = timeEntryRef(entryId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error("That time entry no longer exists.");
    const current = snapshot.data() || {};
    if (clean(current.status, 40) !== "closed") {
      throw new Error("Clock out before changing overtime status.");
    }
    const history = Array.isArray(current.overtimeHistory)
      ? current.overtimeHistory.slice(-49)
      : [];
    history.push({
      previousIsOvertime: Boolean(current.isOvertime),
      isOvertime: Boolean(isOvertime),
      changedBy: clean(changedBy, 180),
      notes: clean(notes, 1200),
      changedAtIso: new Date().toISOString(),
    });
    transaction.update(ref, {
      isOvertime: Boolean(isOvertime),
      overtimeHistory: history,
      overtimeUpdatedBy: clean(changedBy, 180),
      overtimeUpdatedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  });
  return serializeTimeEntry(await ref.get());
}

function overtimeSplitFlags(value, currentValue) {
  const normalized = clean(value, 30).toLowerCase();
  if (["before", "first"].includes(normalized)) return [true, false];
  if (["after", "second"].includes(normalized)) return [false, true];
  if (normalized === "both") return [true, true];
  if (["none", "neither"].includes(normalized)) return [false, false];
  return [Boolean(currentValue), Boolean(currentValue)];
}

export async function splitOpsTimeEntryBlock({
  entryId,
  splitIso,
  overtimePart = "",
  changedBy = "Magmo owner",
  notes = "",
}) {
  const originalRef = timeEntryRef(entryId);
  const requestedSplit = new Date(splitIso || "");
  if (Number.isNaN(requestedSplit.getTime())) {
    throw new Error("Choose a valid split time inside the recorded block.");
  }
  const secondId = `split-${createHash("sha256")
    .update(`${originalRef.id}::${requestedSplit.toISOString()}`)
    .digest("hex")
    .slice(0, 32)}`;
  const secondRef = requireDb()
    .collection(OPS_TIME_ENTRY_COLLECTION)
    .doc(secondId);
  await requireDb().runTransaction(async (transaction) => {
    const [snapshot, existingSecond] = await Promise.all([
      transaction.get(originalRef),
      transaction.get(secondRef),
    ]);
    if (!snapshot.exists) throw new Error("That time entry no longer exists.");
    const current = snapshot.data() || {};
    const source = clean(current.source, 60);
    if (clean(current.status, 40) !== "closed") {
      throw new Error("Clock out before splitting a time block.");
    }
    if (!['manual_clock', 'calendar_correction'].includes(source)) {
      throw new Error("Only a recorded Magmo time block can be split.");
    }
    const startedAtIso =
      timestampToIso(current.startedAt) || clean(current.startedAtIso, 80);
    const endedAtIso =
      timestampToIso(current.endedAt) || clean(current.endedAtIso, 80);
    const start = new Date(startedAtIso);
    const end = new Date(endedAtIso);
    const split = requestedSplit;
    if (existingSecond.exists) {
      const existing = existingSecond.data() || {};
      const existingStart =
        timestampToIso(existing.startedAt) || clean(existing.startedAtIso, 80);
      if (
        sameInstant(existingStart, split.toISOString()) &&
        sameInstant(endedAtIso, split.toISOString())
      ) {
        return;
      }
      throw new Error("That split time conflicts with an existing time block.");
    }
    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      Number.isNaN(split.getTime()) ||
      split <= start ||
      split >= end
    ) {
      throw new Error("Choose a split time inside the recorded block.");
    }
    const [firstOvertime, secondOvertime] = overtimeSplitFlags(
      overtimePart,
      current.isOvertime
    );
    const now = Timestamp.now();
    const nowIso = now.toDate().toISOString();
    const rootId = clean(current.splitRootId, 180) || originalRef.id;
    const splitHistory = Array.isArray(current.splitHistory)
      ? current.splitHistory.slice(-49)
      : [];
    splitHistory.push({
      secondEntryId: secondRef.id,
      previousStartedAtIso: startedAtIso,
      previousEndedAtIso: endedAtIso,
      splitAtIso: split.toISOString(),
      overtimePart: clean(overtimePart, 30),
      changedBy: clean(changedBy, 180),
      notes: clean(notes, 1200),
      changedAtIso: nowIso,
    });
    transaction.update(originalRef, {
      endedAt: Timestamp.fromDate(split),
      endedAtIso: split.toISOString(),
      durationMinutes: Math.max(
        1,
        Math.round((split.getTime() - start.getTime()) / 60000)
      ),
      isOvertime: firstOvertime,
      splitRootId: rootId,
      splitChildren: Array.from(
        new Set([
          ...(Array.isArray(current.splitChildren) ? current.splitChildren : []),
          secondRef.id,
        ])
      ).slice(-50),
      splitHistory,
      updatedAt: now,
    });
    transaction.set(secondRef, {
      ...current,
      startedAt: Timestamp.fromDate(split),
      startedAtIso: split.toISOString(),
      endedAt: Timestamp.fromDate(end),
      endedAtIso: end.toISOString(),
      durationMinutes: Math.max(
        1,
        Math.round((end.getTime() - split.getTime()) / 60000)
      ),
      isOvertime: secondOvertime,
      splitRootId: rootId,
      splitFromEntryId: originalRef.id,
      splitNotes: clean(notes, 1200),
      splitChildren: [],
      splitHistory: [],
      createdAt: now,
      updatedAt: now,
    });
  });
  return {
    first: serializeTimeEntry(await originalRef.get()),
    second: serializeTimeEntry(await secondRef.get()),
  };
}

export async function getOpenClockForUser(userUid) {
  const clocks = await listOpenClocksForUser(userUid);
  return clocks[0] || null;
}

export async function listOpenClocksForUser(userUid) {
  const uid = clean(userUid, 180);
  if (!uid) return [];
  const collection = requireDb().collection(OPS_OPEN_CLOCK_COLLECTION);
  const [openSnapshot, legacySnapshot] = await Promise.all([
    collection.where("userUid", "==", uid).limit(100).get(),
    collection.doc(uid).get(),
  ]);
  const entryIds = new Set(
    openSnapshot.docs.map((document) => clean(document.data()?.entryId, 180))
  );
  if (legacySnapshot.exists) {
    entryIds.add(clean(legacySnapshot.data()?.entryId, 180));
  }
  const validIds = [...entryIds].filter(Boolean);
  if (!validIds.length) return [];
  const snapshots = await requireDb().getAll(...validIds.map(timeEntryRef));
  return snapshots
    .filter((snapshot) => snapshot.exists)
    .map(serializeTimeEntry)
    .filter((entry) => ["open", "pending_approval"].includes(entry.status))
    .sort((left, right) => Date.parse(left.startedAt) - Date.parse(right.startedAt));
}

export async function listRecentUserTimeEntries(userUid, limit = 20) {
  const uid = clean(userUid, 180);
  if (!uid) return [];
  const snapshot = await requireDb()
    .collection(OPS_TIME_ENTRY_COLLECTION)
    .where("userUid", "==", uid)
    .limit(Math.max(20, Math.min(100, Number(limit || 20) * 4)))
    .get();
  return snapshot.docs
    .map(serializeTimeEntry)
    .sort(
      (left, right) =>
        Date.parse(right.startedAt || 0) - Date.parse(left.startedAt || 0)
    )
    .slice(0, Math.max(1, Math.min(50, Number(limit || 20))));
}

export async function listUserTimeEntriesForRange({
  userUid,
  slackUserId = "",
  userEmail = "",
  startIso,
  endIso,
}) {
  const uid = clean(userUid, 180);
  const slackId = clean(slackUserId, 80);
  const email = normalizeEmail(userEmail);
  const startMs = Date.parse(startIso || "");
  const endMs = Date.parse(endIso || "");
  if (!uid) return [];
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    throw new Error("Choose a valid work week.");
  }
  if (endMs - startMs > 15 * 86400000) {
    throw new Error("Clock history is limited to two weeks at a time.");
  }
  const collection = requireDb().collection(OPS_TIME_ENTRY_COLLECTION);
  const snapshots = await Promise.all([
    collection.where("userUid", "==", uid).limit(1000).get(),
    slackId
      ? collection.where("slackUserId", "==", slackId).limit(1000).get()
      : Promise.resolve({ docs: [] }),
    email
      ? collection.where("userEmail", "==", email).limit(1000).get()
      : Promise.resolve({ docs: [] }),
  ]);
  const documents = new Map();
  snapshots.forEach((snapshot) =>
    snapshot.docs.forEach((document) => documents.set(document.id, document))
  );
  return [...documents.values()]
    .map(serializeTimeEntry)
    .filter((entry) => {
      const entryStart = Date.parse(entry.startedAt || "");
      const entryEnd = entry.endedAt
        ? Date.parse(entry.endedAt)
        : Date.now();
      return (
        Number.isFinite(entryStart) &&
        Number.isFinite(entryEnd) &&
        entryStart < endMs &&
        entryEnd >= startMs
      );
    })
    .sort(
      (left, right) =>
        Date.parse(right.startedAt || 0) - Date.parse(left.startedAt || 0)
    );
}

async function travelWorkOrder(db, workOrderId) {
  const normalized = clean(workOrderId, 180);
  if (!normalized || normalized.includes("/")) {
    throw new Error("A valid work order is required.");
  }
  const snapshot = await db.collection("OpsWorkOrders").doc(normalized).get();
  if (!snapshot.exists) throw new Error("This work order no longer exists.");
  return { id: snapshot.id, ...(snapshot.data() || {}) };
}

async function inferPreviousTravelSite({ db, userUid, targetWorkOrderId, sites }) {
  const uid = clean(userUid, 180);
  if (!uid) return null;
  const [openClocks, recentSnapshot] = await Promise.all([
    listOpenClocksForUser(uid),
    db
      .collection(OPS_TIME_ENTRY_COLLECTION)
      .where("userUid", "==", uid)
      .limit(100)
      .get(),
  ]);
  const nowMs = Date.now();
  const candidates = [
    ...openClocks
      .filter(
        (entry) =>
          entry.workOrderId !== targetWorkOrderId
      )
      .map((entry) => ({
        entry,
        siteId:
          entry.timeType === "travel"
            ? clean(entry.travel?.destinationClientId, 180)
            : "",
        evidence:
          entry.timeType === "travel"
            ? "Your current travel clock was heading to this site."
            : "An in-person work clock is still open there.",
        atMs: Date.parse(entry.startedAt || ""),
        confidence: "high",
      })),
    ...recentSnapshot.docs
      .map(serializeTimeEntry)
      .filter(
        (entry) =>
          entry.status === "closed" &&
          entry.workOrderId !== targetWorkOrderId
      )
      .map((entry) => ({
        entry,
        siteId:
          entry.timeType === "travel"
            ? clean(entry.travel?.destinationClientId, 180)
            : "",
        evidence:
          entry.timeType === "travel"
            ? "Your latest completed travel clock ended at this site."
            : "Your latest completed in-person work clock was there.",
        atMs: Date.parse(entry.endedAt || entry.startedAt || ""),
        confidence: "high",
      })),
  ]
    .filter(
      (candidate) =>
        Number.isFinite(candidate.atMs) &&
        nowMs - candidate.atMs >= 0 &&
        nowMs - candidate.atMs <= 12 * 3600000
    )
    .sort((left, right) => right.atMs - left.atMs);

  for (const candidate of candidates) {
    const directSite = candidate.siteId
      ? sites.find((site) => site.id === candidate.siteId)
      : null;
    if (directSite) {
      return {
        ...directSite,
        workOrderId: candidate.entry.workOrderId,
        workOrderNumber: clean(candidate.entry.workOrderNumber, 120),
        evidence: candidate.evidence,
        confidence: candidate.confidence,
      };
    }
    const previous = await travelWorkOrder(db, candidate.entry.workOrderId).catch(
      () => null
    );
    if (!previous) continue;
    const site = findWorkOrderSite(previous, sites);
    if (!site) continue;
    return {
      ...site,
      workOrderId: candidate.entry.workOrderId,
      workOrderNumber: clean(
        previous.number || previous.workOrderId || candidate.entry.workOrderNumber,
        120
      ),
      evidence: candidate.evidence,
      confidence: candidate.confidence,
    };
  }
  return null;
}

export async function prepareOpsTravelStart({ userUid, workOrderId }) {
  const db = requireDb();
  const target = await travelWorkOrder(db, workOrderId);
  const sites = await listTravelSites(db);
  const destination = findWorkOrderSite(target, sites) || {
    id: clean(target.clientId, 180),
    label: clean(target.clientName || target.customer, 220),
    address: clean(target.clientAddress || target.customerAddress, 500),
  };
  const inferredOrigin = await inferPreviousTravelSite({
    db,
    userUid,
    targetWorkOrderId: target.id,
    sites,
  });
  return {
    workOrder: {
      id: target.id,
      number: clean(target.number || target.workOrderId || target.id, 120),
      subject: clean(target.subject || "Untitled work order", 500),
    },
    destination,
    inferredOrigin,
    warehouse: OPS_LF_WAREHOUSE,
    siteOptions: sites.map((site) => ({
      id: site.id,
      label: site.label,
      address: site.address,
    })),
  };
}

async function resolveTravelDetails({
  db,
  workOrder,
  origin = {},
  manualEtaMinutes,
}) {
  const sites = await listTravelSites(db);
  const destination = findWorkOrderSite(workOrder, sites) || {
    id: clean(workOrder.clientId, 180),
    label: clean(workOrder.clientName || workOrder.customer, 220),
    address: clean(workOrder.clientAddress || workOrder.customerAddress, 500),
  };
  const originType = clean(origin.type, 30).toLowerCase();
  let resolvedOrigin;
  if (originType === "warehouse") {
    resolvedOrigin = OPS_LF_WAREHOUSE;
  } else if (originType === "home") {
    const zip = clean(origin.zip, 12);
    if (!/^\d{5}(?:-\d{4})?$/.test(zip)) {
      throw new Error("Enter a valid home ZIP code before starting travel.");
    }
    resolvedOrigin = {
      type: "home",
      label: `Home (${zip})`,
      address: zip,
    };
  } else if (originType === "site") {
    const clientId = clean(origin.clientId, 180);
    resolvedOrigin = sites.find((site) => site.id === clientId) || null;
    if (!resolvedOrigin) {
      throw new Error("Choose a valid site before starting travel.");
    }
    resolvedOrigin = { ...resolvedOrigin, type: "site" };
  } else {
    throw new Error("Choose whether you are leaving a site, the LF warehouse, or home.");
  }

  if (
    resolvedOrigin.id &&
    destination.id &&
    resolvedOrigin.id === destination.id
  ) {
    throw new Error("The travel origin and destination cannot be the same site.");
  }
  const manualMinutes = Math.round(Number(manualEtaMinutes || 0));
  const route = await calculateTravelRoute(
    resolvedOrigin.address,
    destination.address
  );
  const etaMinutes = route.available
    ? route.minutes
    : manualMinutes >= 1 && manualMinutes <= 720
      ? manualMinutes
      : 0;
  if (!etaMinutes) {
    const error = new Error(
      `${route.reason || "Automatic routing is unavailable"} Enter a manual ETA to continue.`
    );
    error.code = "TRAVEL_ETA_REQUIRED";
    error.travel = {
      origin: resolvedOrigin,
      destination,
      reason: route.reason || "Automatic routing is unavailable.",
    };
    throw error;
  }
  const estimatedArrivalAtIso = new Date(
    Date.now() + etaMinutes * 60000
  ).toISOString();
  return {
    originType,
    originLabel: clean(resolvedOrigin.label, 220),
    originAddress: clean(resolvedOrigin.address, 500),
    originClientId: clean(resolvedOrigin.id, 180),
    destinationLabel: clean(destination.label || workOrder.customer, 220),
    destinationAddress: clean(destination.address, 500),
    destinationClientId: clean(destination.id, 180),
    etaMinutes,
    estimatedArrivalAtIso,
    routeProvider: route.available ? route.provider : "manual",
    routeDistanceMeters: route.available
      ? Math.max(0, Number(route.distanceMeters || 0))
      : 0,
    manualEta: !route.available,
  };
}

export async function clockInToWorkOrder({
  userUid,
  userEmail,
  userName,
  slackUserId = "",
  workOrderId,
  timeType = "work",
  travelOrigin = null,
  manualEtaMinutes = 0,
}) {
  const uid = clean(userUid, 180);
  const email = normalizeEmail(userEmail);
  const normalizedWorkOrderId = clean(workOrderId, 180);
  if (!uid || !email) throw new Error("An authenticated user is required.");
  if (!normalizedWorkOrderId || normalizedWorkOrderId.includes("/")) {
    throw new Error("A valid work order is required.");
  }

  const db = requireDb();
  const normalizedTimeType = clean(timeType, 20).toLowerCase() === "travel"
    ? "travel"
    : "work";
  const travelWorkOrderData =
    normalizedTimeType === "travel"
      ? await travelWorkOrder(db, normalizedWorkOrderId)
      : null;
  const travelDetails =
    normalizedTimeType === "travel"
      ? await resolveTravelDetails({
          db,
          workOrder: travelWorkOrderData,
          origin: travelOrigin || {},
          manualEtaMinutes,
        })
      : null;
  const openId = `${uid}__${createHash("sha256")
    .update(`${normalizedWorkOrderId}::${normalizedTimeType}`)
    .digest("hex")
    .slice(0, 24)}`;
  const openRef = db.collection(OPS_OPEN_CLOCK_COLLECTION).doc(openId);
  const entryRef = db.collection(OPS_TIME_ENTRY_COLLECTION).doc();
  const workOrderRef = db.collection("OpsWorkOrders").doc(normalizedWorkOrderId);
  const now = Timestamp.now();
  const nowIso = now.toDate().toISOString();

  await db.runTransaction(async (transaction) => {
    const [openSnapshot, workOrderSnapshot] = await Promise.all([
      transaction.get(openRef),
      transaction.get(workOrderRef),
    ]);
    if (openSnapshot.exists) {
      throw new Error("That clock is already running for this work order.");
    }
    if (!workOrderSnapshot.exists) {
      throw new Error("This work order no longer exists.");
    }
    const workOrder = workOrderSnapshot.data() || {};
    const workflowStatus = clean(
      workOrder.workflowStatus || workOrder.workflowStage,
      60
    ).toLowerCase();
    const activeStatus = ["active", "open", "processing"].includes(
      clean(workOrder.status || "active", 60).toLowerCase()
    );
    if (
      !activeStatus ||
      ["service_complete", "done", "completed"].includes(workflowStatus)
    ) {
      throw new Error("Only work orders currently in circulation can be clocked.");
    }

    const entry = {
      workOrderId: normalizedWorkOrderId,
      workOrderNumber: clean(
        workOrder.number || workOrder.workOrderId || normalizedWorkOrderId,
        120
      ),
      workOrderSubject: clean(
        workOrder.subject || "Untitled work order",
        500
      ),
      userUid: uid,
      userEmail: email,
      userName: clean(userName || email.split("@")[0], 120),
      slackUserId: clean(slackUserId, 80),
      source: "manual_clock",
      mode: "in_person",
      timeType: normalizedTimeType,
      isOvertime: false,
      ...(travelDetails ? { travel: travelDetails } : {}),
      slackStartNotification: {
        status: "pending",
        messageTs: "",
        error: "",
      },
      status: "open",
      startedAt: now,
      startedAtIso: nowIso,
      endedAt: null,
      endedAtIso: "",
      durationMinutes: 0,
      createdAt: now,
      updatedAt: now,
    };
    transaction.set(entryRef, entry);
    transaction.set(openRef, {
      entryId: entryRef.id,
      userUid: uid,
      workOrderId: normalizedWorkOrderId,
      timeType: normalizedTimeType,
      startedAt: now,
      startedAtIso: nowIso,
      updatedAt: now,
    });
  });

  const created = await entryRef.get();
  return serializeTimeEntry(created);
}

export async function recordOpsClockStartSlackDelivery({
  entryId,
  status,
  messageTs = "",
  error = "",
}) {
  const normalizedEntryId = clean(entryId, 180);
  if (!normalizedEntryId) throw new Error("A valid clock entry is required.");
  const normalizedStatus = ["posted", "failed", "pending"].includes(status)
    ? status
    : "failed";
  const entryRef = timeEntryRef(normalizedEntryId);
  const snapshot = await entryRef.get();
  if (!snapshot.exists) throw new Error("That clock session no longer exists.");
  const existing = snapshot.data()?.slackStartNotification || {};
  if (clean(existing.status, 30) === "posted") {
    return serializeTimeEntry(snapshot);
  }
  await entryRef.set(
    {
      slackStartNotification: {
        status: normalizedStatus,
        messageTs: clean(messageTs, 120),
        error: clean(error, 500),
        attemptedAtIso: new Date().toISOString(),
      },
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
  return serializeTimeEntry(await entryRef.get());
}

export async function requestClockOutOfWorkOrder({ userUid, entryId }) {
  const uid = clean(userUid, 180);
  if (!uid) throw new Error("An authenticated user is required.");
  const db = requireDb();
  const normalizedEntryId = clean(entryId, 180);
  if (!normalizedEntryId) throw new Error("Choose the clock session to end.");
  const entryRef = timeEntryRef(normalizedEntryId);
  const approvalRef = db.collection(OPS_CLOCK_APPROVAL_COLLECTION).doc(normalizedEntryId);
  let approval = null;
  await db.runTransaction(async (transaction) => {
    const entrySnapshot = await transaction.get(entryRef);
    if (!entrySnapshot.exists) throw new Error("That clock session no longer exists.");
    const data = entrySnapshot.data() || {};
    if (clean(data.userUid, 180) !== uid) {
      throw new Error("You can only request clock-out for your own session.");
    }
    if (data.status === "closed") throw new Error("That clock session is already closed.");
    if (data.status === "pending_approval") {
      approval = { id: normalizedEntryId, ...(data || {}), duplicate: true };
      return;
    }
    const workOrderRef = db.collection("OpsWorkOrders").doc(clean(data.workOrderId, 180));
    const workOrderSnapshot = await transaction.get(workOrderRef);
    if (!workOrderSnapshot.exists) throw new Error("This work order no longer exists.");
    const workOrder = workOrderSnapshot.data() || {};
    const managers = defaultOpsOversightManagers(workOrder.oversightManagers)
      .map((manager) => ({
        id: clean(manager?.id, 80),
        name: clean(manager?.name, 120),
        email: normalizeEmail(manager?.email),
      }))
      .filter((manager) => manager.id && manager.name);
    if (!managers.length) {
      throw new Error("An oversight manager must be selected before clock-out can be requested.");
    }
    const now = Timestamp.now();
    const nowIso = now.toDate().toISOString();
    const requesterSlackUserId = clean(data.slackUserId, 80);
    const requesterEmail = normalizeEmail(data.userEmail);
    const approvalData = {
      entryId: normalizedEntryId,
      workOrderId: clean(data.workOrderId, 180),
      workOrderNumber: clean(data.workOrderNumber, 120),
      workOrderSubject: clean(data.workOrderSubject, 500),
      requesterUid: uid,
      requesterName: clean(data.userName || data.userEmail, 120),
      requesterEmail: normalizeEmail(data.userEmail),
      managerIds: managers.map((manager) => manager.id),
      managers,
      status: "pending",
      requestedAt: now,
      requestedAtIso: nowIso,
      createdAt: now,
      updatedAt: now,
    };
    if (
      managers.some(
        (manager) =>
          (requesterSlackUserId && manager.id === requesterSlackUserId) ||
          (requesterEmail && manager.email === requesterEmail)
      )
    ) {
      const startedAt =
        data.startedAt?.toDate?.() || new Date(data.startedAtIso || "");
      const durationMinutes = Number.isNaN(startedAt.getTime())
        ? 0
        : Math.max(
            1,
            Math.round((now.toDate().getTime() - startedAt.getTime()) / 60000)
          );
      transaction.update(entryRef, {
        status: "closed",
        approvalStatus: "self_approved",
        approvedByName: clean(data.userName || data.userEmail, 120),
        approvedBySlackUserId:
          requesterSlackUserId ||
          managers.find((manager) => manager.email === requesterEmail)?.id ||
          "",
        clockOutRequestedAt: now,
        clockOutRequestedAtIso: nowIso,
        endedAt: now,
        endedAtIso: nowIso,
        durationMinutes,
        updatedAt: now,
      });
      transaction.set(
        approvalRef,
        {
          ...approvalData,
          status: "approved",
          selfApproved: true,
          decidedAt: now,
          decidedAtIso: nowIso,
          decidedBySlackUserId:
            requesterSlackUserId ||
            managers.find((manager) => manager.email === requesterEmail)?.id ||
            "",
          decidedByName: clean(data.userName || data.userEmail, 120),
        },
        { merge: true }
      );
      const openId = `${uid}__${createHash("sha256")
        .update(
          `${clean(data.workOrderId, 180)}::${
            clean(data.timeType, 20) === "travel" ? "travel" : "work"
          }`
        )
        .digest("hex")
        .slice(0, 24)}`;
      transaction.delete(db.collection(OPS_OPEN_CLOCK_COLLECTION).doc(openId));
      approval = {
        id: approvalRef.id,
        ...approvalData,
        status: "approved",
        selfApproved: true,
      };
      return;
    }
    transaction.update(entryRef, {
      status: "pending_approval",
      approvalStatus: "pending",
      approvalId: approvalRef.id,
      clockOutRequestedAt: now,
      clockOutRequestedAtIso: nowIso,
      updatedAt: now,
    });
    transaction.set(approvalRef, approvalData, { merge: true });
    approval = { id: approvalRef.id, ...approvalData };
  });
  return approval;
}

export async function listClockOutApprovalsForManager(slackUserId) {
  const managerId = clean(slackUserId, 80);
  if (!managerId) return [];
  const snapshot = await requireDb()
    .collection(OPS_CLOCK_APPROVAL_COLLECTION)
    .where("managerIds", "array-contains", managerId)
    .limit(100)
    .get();
  return snapshot.docs
    .map((document) => ({
      id: document.id,
      ...(document.data() || {}),
      requestedAtIso:
        timestampToIso(document.data()?.requestedAt) ||
        clean(document.data()?.requestedAtIso, 80),
    }))
    .filter((request) => request.status === "pending")
    .sort((left, right) => Date.parse(left.requestedAtIso) - Date.parse(right.requestedAtIso));
}

export async function approveClockOutRequest({
  approvalId,
  managerSlackUserId,
  managerName,
  approved,
}) {
  const id = clean(approvalId, 180);
  const managerId = clean(managerSlackUserId, 80);
  if (!id || !managerId) throw new Error("A valid clock-out approval is required.");
  const db = requireDb();
  const approvalRef = db.collection(OPS_CLOCK_APPROVAL_COLLECTION).doc(id);
  let entryId = "";
  await db.runTransaction(async (transaction) => {
    const approvalSnapshot = await transaction.get(approvalRef);
    if (!approvalSnapshot.exists) throw new Error("That approval request no longer exists.");
    const request = approvalSnapshot.data() || {};
    if (!(request.managerIds || []).includes(managerId)) {
      throw new Error("You are not an oversight manager for this work order.");
    }
    if (request.status !== "pending") return;
    entryId = clean(request.entryId, 180);
    const entryRef = timeEntryRef(entryId);
    const entrySnapshot = await transaction.get(entryRef);
    if (!entrySnapshot.exists) throw new Error("The clock session no longer exists.");
    const entry = entrySnapshot.data() || {};
    const now = Timestamp.now();
    const decision = approved ? "approved" : "rejected";
    transaction.set(approvalRef, {
      status: decision,
      decidedAt: now,
      decidedAtIso: now.toDate().toISOString(),
      decidedBySlackUserId: managerId,
      decidedByName: clean(managerName, 120),
      updatedAt: now,
    }, { merge: true });
    if (!approved) {
      transaction.update(entryRef, {
        status: "open",
        approvalStatus: "rejected",
        approvedByName: clean(managerName, 120),
        updatedAt: now,
      });
      return;
    }
    const startedAt = entry.startedAt?.toDate?.() || new Date(entry.startedAtIso || "");
    const requestedEnd = request.requestedAt?.toDate?.() || new Date(request.requestedAtIso || "");
    const durationMinutes =
      Number.isNaN(startedAt.getTime()) || Number.isNaN(requestedEnd.getTime())
        ? 0
        : Math.max(1, Math.round((requestedEnd.getTime() - startedAt.getTime()) / 60000));
    transaction.update(entryRef, {
      status: "closed",
      approvalStatus: "approved",
      approvedByName: clean(managerName, 120),
      approvedBySlackUserId: managerId,
      endedAt: request.requestedAt || now,
      endedAtIso: request.requestedAtIso || now.toDate().toISOString(),
      durationMinutes,
      updatedAt: now,
    });
    const openId = `${clean(entry.userUid, 180)}__${createHash("sha256")
      .update(`${clean(entry.workOrderId, 180)}::${clean(entry.timeType, 20) === "travel" ? "travel" : "work"}`)
      .digest("hex")
      .slice(0, 24)}`;
    transaction.delete(db.collection(OPS_OPEN_CLOCK_COLLECTION).doc(openId));
  });
  return entryId ? serializeTimeEntry(await timeEntryRef(entryId).get()) : null;
}

export async function clockOutOfWorkOrder({ userUid, entryId }) {
  return requestClockOutOfWorkOrder({ userUid, entryId });
}

export async function listOpsTimeEntriesForRange({ startIso, endIso }) {
  const startMs = Date.parse(startIso);
  const endMs = Date.parse(endIso);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    throw new Error("A valid time-entry range is required.");
  }
  const snapshot = await requireDb()
    .collection(OPS_TIME_ENTRY_COLLECTION)
    .where("startedAtIso", "<", new Date(endMs).toISOString())
    .orderBy("startedAtIso", "desc")
    .limit(2000)
    .get();
  const nowMs = Date.now();
  return snapshot.docs
    .map(serializeTimeEntry)
    .filter((entry) => {
      const entryStart = Date.parse(entry.startedAt || "");
      const entryEnd = entry.endedAt
        ? Date.parse(entry.endedAt)
        : Math.min(nowMs, endMs);
      return (
        Number.isFinite(entryStart) &&
        Number.isFinite(entryEnd) &&
        entryStart < endMs &&
        entryEnd > startMs
      );
    });
}

export async function listOpsTimeEntriesForWorkOrder({
  workOrderId,
  throughIso = "",
}) {
  const normalizedWorkOrderId = clean(workOrderId, 180);
  if (!normalizedWorkOrderId) {
    throw new Error("A valid work order ID is required.");
  }
  const cutoffMs = throughIso ? Date.parse(throughIso) : Date.now();
  if (!Number.isFinite(cutoffMs)) {
    throw new Error("A valid work-order time cutoff is required.");
  }
  const snapshot = await requireDb()
    .collection(OPS_TIME_ENTRY_COLLECTION)
    .where("workOrderId", "==", normalizedWorkOrderId)
    .limit(500)
    .get();
  return snapshot.docs
    .map(serializeTimeEntry)
    .filter((entry) => {
      const startedAtMs = Date.parse(entry.startedAt || "");
      return Number.isFinite(startedAtMs) && startedAtMs <= cutoffMs;
    })
    .sort(
      (left, right) =>
        Date.parse(left.startedAt || "") - Date.parse(right.startedAt || "")
    );
}
