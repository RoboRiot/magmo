import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminBucket, adminDb } from "../../context/FirebaseAdmin";
import {
  createBlueFolderClient,
  extractWorkOrderFields,
  getBlueFolderSlackSettings,
} from "../bluefolder/client";
import { createSlackClient, getSlackSettings } from "../slack/client";
import {
  buildMentionText,
  buildWorkOrderSlackParentMessage,
  postWorkOrderToSlack,
} from "../slack/postWorkOrder";
import { ingestCreatedWorkOrder } from "./ingestCreatedWorkOrder";
import {
  reviewServiceRequestClientSuggestion,
  suggestServiceRequestClient,
} from "./serviceRequestClientSuggestion";
import {
  defaultOpsOversightManagers,
  listOpsAssigneeOptions,
  OPS_WORK_ORDER_COLLECTION,
} from "./workOrders";
const {
  resolveOpsDispatchChannelSettings,
  slackDuplicateVerificationMessage,
} = require("./serviceRequestSlackConfig.cjs");
const {
  deterministicSlackClientMessageId,
  dispatchRootForNumber,
  generatedBlueFolderWorkOrderUrl,
  isMatchingGeneratedDispatchRoot,
  reserveDispatchWorkOrderNumber,
} = require("./dispatchWorkOrderNumber.cjs");
const {
  buildDispatchReceipt,
  hasCompleteDispatchReceipt,
} = require("./dispatchReceipt.cjs");
const {
  hasOverseerApproval,
  normalizeOverseerApprovals,
  requireOverseerApproval,
  setOwnOverseerApproval,
} = require("./serviceRequestApproval.cjs");
const {
  buildServiceRequestDispatchSubject,
} = require("./serviceRequestDispatchFormat.cjs");
const {
  clientLocation,
  referenceId,
  trailerClientId,
  trailerMachineId,
  trailerName,
} = require("./trailerClientLinks.cjs");

const COLLECTION = "ServiceRequests";
const DISPATCH_CORE_MENTION_USER_IDS = [
  "U07FT78HRSL", // Julie Tang
  "U07F432F875", // Sean Wang
  "U07F4D8B2GJ", // Wilson Wang
  "U07EY0U7KUN", // Alex Wu
];
const DUPLICATE_TERMINAL_STAGES = new Set(["done", "closed"]);
const ACTIVE_REQUEST_STATUSES = new Set([
  "pending",
  "accepting",
]);
const URGENCY_LABELS = {
  hard_down: "Hard down",
  asap: "ASAP",
  soon: "Soon",
  anytime: "Anytime",
};
const GENERATED_FILE_LIMIT = 12;
const GENERATED_FILE_SIZE_LIMIT = 250 * 1024 * 1024;
const GENERATED_TOTAL_FILE_SIZE_LIMIT = 500 * 1024 * 1024;
const DISPATCH_HISTORY_PAGE_LIMIT = 200;
const DISPATCH_HISTORY_MAX_PAGES = 100;

function requireServices() {
  if (!adminDb || !adminBucket) {
    throw new Error("Firebase Admin services are not initialized.");
  }
  return { db: adminDb, bucket: adminBucket };
}

function clean(value, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function hasCreatedWorkOrder(data = {}) {
  return Boolean(
    clean(data.blueFolder?.serviceRequestId, 180) ||
      clean(data.magmo?.workOrderId, 180) ||
      (clean(data.slack?.channel, 120) && clean(data.slack?.ts, 120)) ||
      (clean(data.blueFolder?.slack?.channel, 120) &&
        clean(data.blueFolder?.slack?.ts, 120))
  );
}

function hasCompletedAcceptance(data = {}) {
  const dispatchChannelId = clean(
    process.env.OPS_DISPATCH_CHANNEL_ID ||
      process.env.OPS_CONVERSATION_CHANNEL_ID,
    120
  );
  return Boolean(
    clean(data.magmo?.workOrderId, 180) &&
      dispatchChannelId &&
      hasCompleteDispatchReceipt(data, dispatchChannelId)
  );
}

function uniqueAssigneeIds(value) {
  return Array.from(
    new Set(
      (Array.isArray(value) ? value : [])
        .map((entry) => clean(entry, 80))
        .filter(Boolean)
    )
  );
}

function resolveOversightSelection({
  options,
  oversightManagerIds,
  fallbackAssignment = {},
  rejectUnknown = false,
}) {
  const allowedIds = new Set(options.map((option) => option.id));
  const submittedIds = uniqueAssigneeIds(
    Array.isArray(oversightManagerIds)
      ? oversightManagerIds
      : fallbackAssignment?.oversightManagerIds
  );
  const unknownIds = submittedIds.filter((id) => !allowedIds.has(id));
  if (rejectUnknown && unknownIds.length) {
    throw new Error("One selected oversight manager is not available in Ops.");
  }
  const ids = submittedIds.filter((id) => allowedIds.has(id));
  const byId = new Map(options.map((option) => [option.id, option]));
  const oversightManagers = defaultOpsOversightManagers(
    ids.map((id) => byId.get(id)).filter(Boolean)
  );
  return {
    oversightManagerIds: oversightManagers.map((manager) => manager.id),
    oversightManagers,
  };
}

function resolveAssignmentSelection({
  options,
  remoteAssigneeIds,
  dispatchAssigneeIds,
  assigneeIds,
  assignmentMode,
  fallbackAssignment = {},
  rejectUnknown = false,
}) {
  const splitProvided =
    Array.isArray(remoteAssigneeIds) || Array.isArray(dispatchAssigneeIds);
  const fallbackHasSplit =
    Array.isArray(fallbackAssignment?.remoteAssigneeIds) ||
    Array.isArray(fallbackAssignment?.dispatchAssigneeIds);
  const legacyIds = Array.isArray(assigneeIds)
    ? assigneeIds
    : Array.isArray(fallbackAssignment?.assigneeIds)
    ? fallbackAssignment.assigneeIds
    : [];
  const legacyMode = clean(
    assignmentMode || fallbackAssignment?.mode,
    30
  ).toLowerCase();
  const rawRemoteIds = splitProvided
    ? remoteAssigneeIds
    : fallbackHasSplit
    ? fallbackAssignment.remoteAssigneeIds
    : legacyMode === "remote"
    ? legacyIds
    : [];
  const rawDispatchIds = splitProvided
    ? dispatchAssigneeIds
    : fallbackHasSplit
    ? fallbackAssignment.dispatchAssigneeIds
    : legacyMode !== "remote"
    ? legacyIds
    : [];
  const allowedIds = new Set(options.map((option) => option.id));
  const submittedRemoteIds = uniqueAssigneeIds(rawRemoteIds);
  const submittedDispatchIds = uniqueAssigneeIds(rawDispatchIds);
  const unknownIds = [...submittedRemoteIds, ...submittedDispatchIds].filter(
    (id) => !allowedIds.has(id)
  );
  if (rejectUnknown && unknownIds.length) {
    throw new Error("One selected assignee is not available in Ops.");
  }
  const normalizedRemoteIds = submittedRemoteIds.filter((id) =>
    allowedIds.has(id)
  );
  const normalizedDispatchIds = submittedDispatchIds.filter((id) =>
    allowedIds.has(id)
  );
  const selectedIds = Array.from(
    new Set([...normalizedRemoteIds, ...normalizedDispatchIds])
  );
  const byId = new Map(options.map((option) => [option.id, option]));
  const remoteAssignees = normalizedRemoteIds
    .map((id) => byId.get(id))
    .filter(Boolean);
  const dispatchAssignees = normalizedDispatchIds
    .map((id) => byId.get(id))
    .filter(Boolean);
  const selectedAssignees = selectedIds
    .map((id) => byId.get(id))
    .filter(Boolean);
  const mode =
    normalizedRemoteIds.length && normalizedDispatchIds.length
      ? "mixed"
      : normalizedRemoteIds.length
      ? "remote"
      : normalizedDispatchIds.length
      ? "dispatch"
      : "unassigned";
  return {
    mode,
    remoteAssigneeIds: normalizedRemoteIds,
    dispatchAssigneeIds: normalizedDispatchIds,
    assigneeIds: selectedIds,
    remoteAssignees,
    dispatchAssignees,
    assignees: selectedAssignees,
  };
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return "";
}

function normalizeName(value) {
  return clean(value, 200)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const DUPLICATE_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "for",
  "in",
  "is",
  "of",
  "on",
  "the",
  "to",
  "work",
  "order",
  "service",
  "request",
]);

function duplicateTokens(value) {
  return new Set(
    normalizeName(value)
      .split(/\s+/)
      .filter((token) => token.length > 1 && !DUPLICATE_STOP_WORDS.has(token))
  );
}

export function duplicateWorkOrderTitleMatch(left, right) {
  const normalizedLeft = normalizeName(left);
  const normalizedRight = normalizeName(right);
  if (!normalizedLeft || !normalizedRight) return false;
  if (normalizedLeft === normalizedRight) return true;
  if (
    Math.min(normalizedLeft.length, normalizedRight.length) >= 12 &&
    (normalizedLeft.includes(normalizedRight) ||
      normalizedRight.includes(normalizedLeft))
  ) {
    return true;
  }
  const leftTokens = duplicateTokens(normalizedLeft);
  const rightTokens = duplicateTokens(normalizedRight);
  if (!leftTokens.size || !rightTokens.size) return false;
  const overlap = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return overlap >= 2 && overlap / Math.min(leftTokens.size, rightTokens.size) >= 0.8;
}

function slackParentSubject(text) {
  const lines = clean(text, 3000)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const titleLine = lines.find((line) => !/^#(?:OPS[-\w]+|\d+)\b/i.test(line));
  if (!titleLine) return "";
  const linked = titleLine.match(/<[^|>]+\|([^>]+)>/);
  return clean((linked?.[1] || titleLine).replace(/^\*+|\*+$/g, ""), 500);
}

function slackParentNumber(text) {
  return clean(text, 1000).match(/^#([^\s\n]+)/m)?.[1] || "";
}

async function readDispatchRootHistory(
  slack,
  channel,
  {
    maxPages = DISPATCH_HISTORY_MAX_PAGES,
    requireComplete = true,
  } = {}
) {
  if (!requireComplete) {
    return slack.conversationsHistory(channel, {
      limit: DISPATCH_HISTORY_PAGE_LIMIT,
    });
  }
  return slack.conversationsHistoryAll(channel, {
    limit: DISPATCH_HISTORY_PAGE_LIMIT,
    maxPages,
  });
}

async function recoverAllocatedSlackRoot({
  slack,
  channel,
  messages,
  workOrderNumber,
  subject,
  bluefolderUrl,
}) {
  const root = dispatchRootForNumber(messages, workOrderNumber);
  if (!root) return null;
  if (
    !isMatchingGeneratedDispatchRoot(
      root,
      workOrderNumber,
      subject,
      bluefolderUrl
    )
  ) {
    return { collision: true, root };
  }
  const ts = clean(root.ts, 120);
  let permalink = "";
  if (ts) {
    try {
      permalink = await slack.getPermalink(channel, ts);
    } catch (error) {
      console.warn("[Ops][Slack][allocated-root-permalink]", error?.message || error);
    }
  }
  return {
    collision: false,
    slackState: {
      channel,
      ts,
      permalink,
      parentMessage: clean(root.text, 3000),
      recoveredFromDispatchHistory: true,
    },
  };
}

async function canonicalDispatchReceipt({
  slack,
  slackState,
  workOrderNumber,
  subject,
  bluefolderUrl,
  dispatchChannelId,
  dispatchedAt,
  dispatchedBy,
}) {
  const channel = clean(slackState?.channel, 120);
  const ts = clean(slackState?.ts, 120);
  if (!channel || !ts) {
    throw new Error("Slack did not return a #dispatch root.");
  }

  let parentMessage = clean(slackState?.parentMessage, 3000);
  if (
    !isMatchingGeneratedDispatchRoot(
      { text: parentMessage },
      workOrderNumber,
      subject,
      bluefolderUrl
    )
  ) {
    const messages = await slack.conversationsReplies(channel, ts, 200);
    const root = messages.find(
      (message) => clean(message?.ts, 120) === ts && !message?.thread_ts
    );
    if (
      !root ||
      !isMatchingGeneratedDispatchRoot(
        root,
        workOrderNumber,
        subject,
        bluefolderUrl
      )
    ) {
      const error = new Error(
        `Slack #dispatch root #${workOrderNumber} does not contain the exact matching work-order number, title, and BlueFolder srid URL.`
      );
      error.code = "dispatch_root_mismatch";
      throw error;
    }
    parentMessage = clean(root.text, 3000);
  }

  let permalink = clean(slackState?.permalink, 1200);
  if (!permalink) {
    permalink = clean(await slack.getPermalink(channel, ts), 1200);
  }
  const receipt = buildDispatchReceipt({
    workOrderId: workOrderNumber,
    slackChannel: channel,
    slackThreadTs: ts,
    slackPermalink: permalink,
    dispatchedAt,
    dispatchedBy,
    expectedChannelId: dispatchChannelId,
  });
  return {
    receipt,
    slackState: {
      ...slackState,
      channel: receipt.slackChannel,
      ts: receipt.slackThreadTs,
      permalink: receipt.slackPermalink,
      parentMessage,
    },
  };
}

async function repairPreservedResetSlackThread({
  slack,
  channel,
  reset,
  workOrderNumber,
  subject,
  bluefolderUrl,
  description,
  mentionUserIds,
}) {
  const resetChannel = clean(reset?.previousSlackChannel, 120);
  const threadTs = clean(reset?.previousSlackThreadTs, 120);
  if (
    reset?.slackThreadPreserved !== true ||
    resetChannel !== channel ||
    !threadTs ||
    clean(reset?.workOrderNumber, 80) !== clean(workOrderNumber, 80)
  ) {
    return null;
  }

  const messages = await slack.conversationsReplies(channel, threadTs, 200);
  const root = messages.find((message) => clean(message.ts, 120) === threadTs);
  if (!root || slackParentNumber(root.text) !== clean(workOrderNumber, 80)) {
    return null;
  }

  const parentMessage = buildWorkOrderSlackParentMessage({
    workOrderNumber,
    bluefolderUrl,
    subject,
  });
  await slack.api("chat.update", {
    channel,
    ts: threadTs,
    text: parentMessage,
    mrkdwn: true,
    unfurl_links: false,
    unfurl_media: false,
  });

  const mentions = await buildMentionText(slack, mentionUserIds, "");
  const mentionTs = clean(reset?.previousSlackMentionTs, 120);
  if (mentionTs && mentions) {
    await slack.api("chat.update", {
      channel,
      ts: mentionTs,
      text: mentions,
      mrkdwn: true,
      unfurl_links: false,
      unfurl_media: false,
    });
  }

  const cleanDescription = clean(description, 3000);
  const descriptionTs = clean(reset?.previousSlackDescriptionTs, 120);
  if (descriptionTs && cleanDescription) {
    await slack.api("chat.update", {
      channel,
      ts: descriptionTs,
      text: cleanDescription,
      mrkdwn: true,
      unfurl_links: false,
      unfurl_media: false,
    });
  }

  let permalink = clean(reset?.previousSlackPermalink, 1200);
  if (!permalink) {
    try {
      permalink = await slack.getPermalink(channel, threadTs);
    } catch (error) {
      console.warn("[Ops][Slack][preserved-root-permalink]", error?.message || error);
    }
  }
  return {
    channel,
    ts: threadTs,
    permalink,
    parentMessage,
    mentions,
    description: cleanDescription,
    repairedPreservedThread: true,
  };
}

function duplicateErrorMessage(duplicate) {
  const identifier = duplicate.number ? ` ${duplicate.number}` : "";
  const status = duplicate.status ? ` (${duplicate.status})` : "";
  return (
    `Cannot create this work order because${identifier}${status} already covers ` +
    `"${duplicate.subject}" for this client or machine. Open the existing work order instead of creating a duplicate.`
  );
}

function throwDuplicateWorkOrder(duplicate) {
  const error = new Error(duplicateErrorMessage(duplicate));
  error.code = "duplicate_work_order";
  error.duplicate = duplicate;
  throw error;
}

function rawWorkflowStatus(data = {}) {
  return clean(data.workflowStatus || data.status || "active", 40).toLowerCase();
}

async function findGeneratedWorkOrderDuplicate({
  db,
  client,
  machine,
  issueTitle,
  excludeRequestId = "",
  excludeWorkOrderNumber = "",
  includeSlack = true,
}) {
  const [requestSnapshot, workOrderSnapshot] = await Promise.all([
    db.collection(COLLECTION).limit(500).get(),
    db.collection(OPS_WORK_ORDER_COLLECTION).limit(500).get(),
  ]);
  const allWorkOrders = workOrderSnapshot.docs
    .map((snapshot) => ({ id: snapshot.id, data: snapshot.data() || {} }))
    .filter(({ data }) => !data.deletedAt);
  const openWorkOrders = allWorkOrders
    .filter(
      ({ data }) =>
        !DUPLICATE_TERMINAL_STAGES.has(rawWorkflowStatus(data))
    );
  const workOrderById = new Map(openWorkOrders.map((entry) => [entry.id, entry]));
  const workOrderByNumber = new Map(
    allWorkOrders.map((entry) => [clean(entry.data.number || entry.id, 120), entry])
  );

  for (const entry of openWorkOrders) {
    const data = entry.data;
    const sameMachine =
      clean(data.machineId, 180) && clean(data.machineId, 180) === machine.id;
    const sameClient =
      clean(data.clientId, 180) && clean(data.clientId, 180) === client.id;
    if (
      (sameMachine || sameClient) &&
      duplicateWorkOrderTitleMatch(data.subject, issueTitle)
    ) {
      return {
        source: "Magmo Ops",
        number: clean(data.number || entry.id, 120),
        subject: clean(data.subject, 500),
        status: rawWorkflowStatus(data).replaceAll("_", " "),
      };
    }
  }

  for (const snapshot of requestSnapshot.docs) {
    if (snapshot.id === excludeRequestId) continue;
    const data = snapshot.data() || {};
    const status = clean(data.status || "pending", 40).toLowerCase();
    if (["archived", "denied"].includes(status)) continue;
    if (status === "accepted") {
      const linkedId = clean(data.magmo?.workOrderId, 180);
      if (linkedId && !workOrderById.has(linkedId)) continue;
    }
    const sameRequestMachine = clean(data.machineId, 180) === machine.id;
    const sameRequestClient =
      clean(data.confirmedClient?.id, 180) === client.id ||
      (normalizeName(data.companyName) &&
        normalizeName(data.companyName) === normalizeName(client.name));
    if (
      (sameRequestMachine || sameRequestClient) &&
      duplicateWorkOrderTitleMatch(data.issueTitle, issueTitle)
    ) {
      return {
        source: "service request",
        number: clean(data.requestNumber || snapshot.id, 120),
        subject: clean(data.issueTitle, 500),
        status: status.replaceAll("_", " "),
      };
    }
  }

  if (!includeSlack) return null;
  let duplicateCheckChannelId = "";
  try {
    const settings = getSlackSettings();
    const dispatchChannel = resolveOpsDispatchChannelSettings(process.env);
    duplicateCheckChannelId = dispatchChannel.channelId;
    const dispatchSettings = {
      ...settings,
      slackChannelId: dispatchChannel.channelId,
      slackChannelName: dispatchChannel.channelName,
    };
    const slack = createSlackClient(dispatchSettings);
    const channel = await slack.resolveChannelId();
    const parents = await slack.conversationsHistory(channel, { limit: 200 });
    const clientKey = normalizeName(client.name);
    for (const message of parents) {
      const subject = slackParentSubject(message.text);
      if (!subject || !duplicateWorkOrderTitleMatch(subject, issueTitle)) continue;
      const subjectKey = normalizeName(subject);
      if (clientKey && !subjectKey.includes(clientKey)) continue;
      const number = slackParentNumber(message.text);
      if (
        number &&
        clean(number, 120).toLowerCase() ===
          clean(excludeWorkOrderNumber, 120).toLowerCase()
      ) {
        continue;
      }
      const knownWorkOrder = workOrderByNumber.get(number);
      if (
        knownWorkOrder &&
        DUPLICATE_TERMINAL_STAGES.has(rawWorkflowStatus(knownWorkOrder.data))
      ) {
        continue;
      }
      return {
        source: "Slack #dispatch",
        number: number ? `#${number}` : "",
        subject,
        status: knownWorkOrder
          ? rawWorkflowStatus(knownWorkOrder.data).replaceAll("_", " ")
          : "already posted in #dispatch",
      };
    }
  } catch (error) {
    console.error("[Ops][duplicate-check][slack]", error?.message || error);
    throw new Error(
      slackDuplicateVerificationMessage(error, duplicateCheckChannelId)
    );
  }
  return null;
}

function scalar(value) {
  if (Array.isArray(value)) return scalar(value[0]);
  if (value && typeof value === "object") {
    return clean(value.text ?? value._ ?? "", 500);
  }
  return clean(value, 500);
}

function getRefId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return value.split("/").filter(Boolean).pop() || "";
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

function machineLabel(machine = {}) {
  return [
    machine.name || machine.id,
    machine.oem,
    machine.modality,
    machine.model,
  ]
    .filter(Boolean)
    .join(" - ");
}

function serializeClient(snapshot) {
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    name: clean(data.name || data.clientName || data.companyName, 220),
    location: clientLocation(data),
    bluefolderCustomerId: clean(
      data.bluefolderCustomerId || data.blueFolderCustomerId,
      80
    ),
  };
}

function serializeTrailer(snapshot) {
  const data = snapshot.data() || {};
  const clientId = trailerClientId(data);
  const machineId = trailerMachineId(data);
  return {
    id: snapshot.id,
    name: trailerName({ id: snapshot.id, ...data }),
    clientId,
    clientName: clean(
      data.locationCurrentName || data.locationCurrent || data.location,
      220
    ),
    clientLocation: clean(data.locationCurrentClientLocation, 500),
    machineId,
    model: clean(data.model, 160),
    vin: clean(data.vin, 160),
  };
}

function serializeMachine(snapshot, clientMachineIds = new Map()) {
  const data = snapshot.data() || {};
  const clientIds = new Set(clientMachineIds.get(snapshot.id) || []);
  const directClientId = getRefId(data.client || data.Client);
  if (directClientId) clientIds.add(directClientId);
  const machine = {
    id: snapshot.id,
    name: clean(data.name || snapshot.id, 220),
    oem: clean(data.OEM || data.oem || data.manufacturer, 100),
    modality: clean(data.Modality || data.modality, 100),
    model: clean(data.Model || data.model, 160),
    location: locationText(data.local || data.location),
    clientIds: Array.from(clientIds),
  };
  return { ...machine, label: machineLabel(machine) };
}

function serializeRequest(snapshot, includeFiles = false) {
  const data = snapshot.data() || {};
  const overseerApprovals = normalizeOverseerApprovals(
    data.overseerApprovals
  );
  const referenceImages = (Array.isArray(data.files) ? data.files : []).filter(
    (file) =>
      clean(file?.purpose || "reference", 30) !== "analysis" &&
      clean(file?.contentType, 100).toLowerCase().startsWith("image/") &&
      clean(file?.downloadUrl || file?.url, 2000)
  );
  const result = {
    id: snapshot.id,
    requestNumber: clean(data.requestNumber || snapshot.id, 80),
    allocatedWorkOrderNumber: clean(data.allocatedWorkOrderNumber, 80),
    status: clean(data.status || "pending", 40),
    companyName: clean(data.companyName, 220),
    requestedServiceDate: clean(data.requestedServiceDate, 20),
    locationText: clean(data.locationText, 800),
    streetAddress: clean(data.streetAddress, 160),
    addressLine2: clean(data.addressLine2, 120),
    city: clean(data.city, 80),
    region: clean(data.region, 80),
    postalCode: clean(data.postalCode, 20),
    country: clean(data.country, 80),
    urgency: clean(data.urgency, 40),
    urgencyLabel: URGENCY_LABELS[data.urgency] || clean(data.urgency, 40),
    manufacturer: clean(data.manufacturer, 100),
    modality: clean(data.modality, 100),
    systemModel: clean(data.systemModel, 160),
    equipmentOperational: clean(data.equipmentOperational, 60),
    operationalImpact: clean(data.operationalImpact, 80),
    remoteAccess: clean(data.remoteAccess, 60),
    requestedTiming: clean(data.requestedTiming, 240),
    firstName: clean(data.firstName, 60),
    lastName: clean(data.lastName, 60),
    contactName: clean(
      data.contactName || `${data.firstName || ""} ${data.lastName || ""}`,
      140
    ),
    phone: clean(data.phone, 40),
    email: clean(data.email, 160),
    purchaseOrderNumber: clean(data.purchaseOrderNumber, 60),
    issueTitle: clean(data.issueTitle, 120),
    description: clean(data.description, 5000),
    source: clean(data.source || "ais_website", 60),
    machineId: clean(data.machineId, 180),
    machine:
      data.machine && typeof data.machine === "object" ? data.machine : null,
    trailerId: clean(data.trailerId, 180),
    trailer:
      data.trailer && typeof data.trailer === "object" ? data.trailer : null,
    requestedAssignment:
      data.requestedAssignment &&
      typeof data.requestedAssignment === "object"
        ? data.requestedAssignment
        : null,
    clientMatchStatus: clean(data.clientMatchStatus || "pending", 40),
    suggestedClient:
      data.suggestedClient && typeof data.suggestedClient === "object"
        ? data.suggestedClient
        : null,
    suggestedMachine:
      data.suggestedMachine && typeof data.suggestedMachine === "object"
        ? data.suggestedMachine
        : null,
    clientMatchReview:
      data.clientMatchReview && typeof data.clientMatchReview === "object"
        ? data.clientMatchReview
        : null,
    clientMatchError: clean(data.clientMatchError, 500),
    confirmedClient:
      data.confirmedClient && typeof data.confirmedClient === "object"
        ? data.confirmedClient
        : null,
    blueFolder:
      data.blueFolder && typeof data.blueFolder === "object"
        ? data.blueFolder
        : null,
    slack:
      data.slack && typeof data.slack === "object" ? data.slack : null,
    dispatchReceipt:
      data.dispatchReceipt && typeof data.dispatchReceipt === "object"
        ? data.dispatchReceipt
        : null,
    dispatchStatus: clean(data.dispatchStatus, 40),
    slackChannel: clean(data.slackChannel, 120),
    slackThreadTs: clean(data.slackThreadTs, 120),
    slackPermalink: clean(data.slackPermalink, 1200),
    dispatchedAt: clean(data.dispatchedAt, 80),
    dispatchedBy: clean(data.dispatchedBy, 180),
    magmo: data.magmo && typeof data.magmo === "object" ? data.magmo : null,
    processing:
      data.processing && typeof data.processing === "object"
        ? data.processing
        : null,
    overseerApprovals,
    overseerApprovalCount: overseerApprovals.length,
    hasOverseerApproval: overseerApprovals.length > 0,
    fileCount: Array.isArray(data.files) ? data.files.length : 0,
    referenceImageCount: referenceImages.length,
    thumbnails: referenceImages.slice(0, 4).map((file) => ({
      name: clean(file?.name, 140),
      url: clean(
        file?.thumbnailDownloadUrl || file?.downloadUrl || file?.url,
        2000
      ),
    })),
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
    acceptedAt: timestampToIso(data.acceptedAt),
    archivedAt: timestampToIso(data.archivedAt),
  };
  if (includeFiles) {
    result.files = (Array.isArray(data.files) ? data.files : []).map(
      (file, index) => ({
        index,
        name: clean(file?.name, 140),
        contentType: clean(file?.contentType, 100),
        size: Number(file?.size || 0),
        storagePath: clean(file?.storagePath, 500),
        downloadUrl: clean(file?.downloadUrl || file?.url, 2000),
        thumbnailStoragePath: clean(file?.thumbnailStoragePath, 500),
        thumbnailDownloadUrl: clean(file?.thumbnailDownloadUrl, 2000),
        purpose: clean(file?.purpose || "reference", 30),
        blueFolderAttachmentId: clean(file?.blueFolderAttachmentId, 200),
        blueFolderSkippedReason: clean(file?.blueFolderSkippedReason, 200),
        slackFileId: clean(file?.slackFileId, 120),
      })
    );
  }
  return result;
}

export async function listServiceRequests({
  view = "requests",
  since = "",
  includeCatalog = true,
} = {}) {
  const { db } = requireServices();
  const normalizedView = ["accepted", "archived"].includes(view)
    ? view
    : "requests";
  const requestedAt = Timestamp.now();
  const sinceDate = since ? new Date(since) : null;
  const incremental = Boolean(
    sinceDate && Number.isFinite(sinceDate.getTime())
  );
  let requestQuery = db.collection(COLLECTION);
  if (incremental) {
    requestQuery = requestQuery
      .where("updatedAt", ">", Timestamp.fromDate(sinceDate))
      .where("updatedAt", "<=", requestedAt)
      .orderBy("updatedAt", "asc");
  }
  const requestSnapshot = await requestQuery.limit(400).get();

  // A request is no longer awaiting approval once any downstream work-order
  // record exists. Reconcile older partial-acceptance records into Accepted so
  // they cannot reappear in Requests or be confused with manual archives.
  const reconciledIds = new Set();
  const reconciledAtIso = new Date().toISOString();
  const reconcileBatch = db.batch();
  requestSnapshot.docs.forEach((snapshot) => {
    const data = snapshot.data() || {};
    const wasAutomaticallyArchived =
      data.status === "archived" &&
      /magmo.*request reconciliation/i.test(clean(data.archivedBy, 180));
    if (
      data.status !== "accepted" &&
      data.status !== "denied" &&
      (data.status !== "archived" || wasAutomaticallyArchived) &&
      hasCompletedAcceptance(data)
    ) {
      reconciledIds.add(snapshot.id);
      reconcileBatch.set(
        snapshot.ref,
        {
          status: "accepted",
          acceptedAt: data.acceptedAt || FieldValue.serverTimestamp(),
          acceptedBy:
            clean(data.acceptedBy, 180) || "Magmo request reconciliation",
          archivedAt: FieldValue.delete(),
          archivedBy: FieldValue.delete(),
          archiveReason: FieldValue.delete(),
          previousRequestStatus: clean(data.status || "pending", 40),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  });
  if (reconciledIds.size) await reconcileBatch.commit();

  const changedRequests = requestSnapshot.docs
    .map((snapshot) => {
      const request = serializeRequest(snapshot);
      return reconciledIds.has(snapshot.id)
        ? {
            ...request,
            status: "accepted",
            acceptedAt: request.acceptedAt || reconciledAtIso,
            archivedAt: "",
          }
        : request;
    })
    .sort((left, right) => Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0));
  const requests = incremental
    ? changedRequests
    : changedRequests.filter((request) => {
        if (normalizedView === "accepted") return request.status === "accepted";
        if (normalizedView === "archived") return request.status === "archived";
        return ACTIVE_REQUEST_STATUSES.has(request.status);
      });
  const hasMore = incremental && requestSnapshot.size === 400;
  const lastDocument = requestSnapshot.docs[requestSnapshot.docs.length - 1];
  const result = {
    ...(incremental ? { changes: requests } : { requests }),
    incremental,
    hasMore,
    cursor:
      hasMore && lastDocument
        ? timestampToIso(lastDocument.data()?.updatedAt)
        : requestedAt.toDate().toISOString(),
    assigneeOptions: listOpsAssigneeOptions(),
    defaultOversightManagerIds: defaultOpsOversightManagers().map(
      (manager) => manager.id
    ),
  };
  if (!includeCatalog) return result;

  const [clientSnapshot, machineSnapshot, trailerSnapshot] = await Promise.all([
    db.collection("Client").limit(500).get(),
    db.collection("Machine").limit(1000).get(),
    db.collection("Trailers").limit(500).get(),
  ]);
  const clients = clientSnapshot.docs
    .map(serializeClient)
    .filter((client) => client.name)
    .sort((left, right) => left.name.localeCompare(right.name));
  const clientMachineIds = new Map();
  clientSnapshot.docs.forEach((snapshot) => {
    const machineRefs = Array.isArray(snapshot.data()?.machines)
      ? snapshot.data().machines
      : [];
    machineRefs.map(getRefId).filter(Boolean).forEach((machineId) => {
      if (!clientMachineIds.has(machineId)) clientMachineIds.set(machineId, new Set());
      clientMachineIds.get(machineId).add(snapshot.id);
    });
  });
  const machines = machineSnapshot.docs
    .map((snapshot) => serializeMachine(snapshot, clientMachineIds))
    .filter((machine) => machine.name)
    .sort((left, right) => left.label.localeCompare(right.label));
  const clientsById = new Map(clients.map((client) => [client.id, client]));
  const trailers = trailerSnapshot.docs
    .filter((snapshot) => snapshot.id !== "layout_meta")
    .map(serializeTrailer)
    .map((trailer) => {
      const client = clientsById.get(trailer.clientId);
      return {
        ...trailer,
        clientName: client?.name || trailer.clientName,
        clientLocation: client?.location || trailer.clientLocation,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
  return { ...result, clients, machines, trailers };
}

export async function getServiceRequestDetail(requestId) {
  const { db, bucket } = requireServices();
  const snapshot = await db.collection(COLLECTION).doc(clean(requestId, 180)).get();
  if (!snapshot.exists) throw new Error("Service request does not exist.");
  const request = serializeRequest(snapshot, true);
  request.files = await Promise.all(
    request.files.map(async (file) => {
      if (file.downloadUrl) return { ...file, url: file.downloadUrl };
      if (!file.storagePath) return file;
      const [url] = await bucket.file(file.storagePath).getSignedUrl({
        action: "read",
        expires: Date.now() + 15 * 60_000,
      });
      return { ...file, url };
    })
  );
  return request;
}

async function getClient(clientId) {
  const { db } = requireServices();
  const snapshot = await db.collection("Client").doc(clean(clientId, 180)).get();
  if (!snapshot.exists) throw new Error("Select a valid client from the Client DB.");
  const client = serializeClient(snapshot);
  if (!client.name) throw new Error("The selected Client DB record has no name.");
  return client;
}

async function getMachineForClient(machineId, clientId) {
  const { db } = requireServices();
  const normalizedMachineId = clean(machineId, 180);
  const normalizedClientId = clean(clientId, 180);
  if (!normalizedMachineId) {
    throw new Error("Select a machine from the Magmo machine list.");
  }
  if (!normalizedClientId) {
    throw new Error("Select a client from the Client DB first.");
  }
  const [machineSnapshot, clientSnapshot] = await Promise.all([
    db.collection("Machine").doc(normalizedMachineId).get(),
    db.collection("Client").doc(normalizedClientId).get(),
  ]);
  if (!machineSnapshot.exists) {
    throw new Error("Select a valid machine from the Magmo machine list.");
  }
  if (!clientSnapshot.exists) {
    throw new Error("Select a valid client from the Client DB.");
  }
  const machineData = machineSnapshot.data() || {};
  const directClientId = getRefId(machineData.client || machineData.Client);
  const clientMachineIds = new Set(
    (Array.isArray(clientSnapshot.data()?.machines)
      ? clientSnapshot.data().machines
      : []
    )
      .map(getRefId)
      .filter(Boolean)
  );
  if (
    directClientId !== normalizedClientId &&
    !clientMachineIds.has(normalizedMachineId)
  ) {
    throw new Error("The selected machine is not assigned to that client.");
  }
  const lookup = new Map([[normalizedMachineId, new Set([normalizedClientId])]]);
  return serializeMachine(machineSnapshot, lookup);
}

async function getTrailerForClient(trailerId, clientId, machineId = "") {
  const { db } = requireServices();
  const normalizedTrailerId = clean(trailerId, 180);
  if (!normalizedTrailerId) return null;
  const snapshot = await db.collection("Trailers").doc(normalizedTrailerId).get();
  if (!snapshot.exists || snapshot.id === "layout_meta") {
    throw new Error("Select a valid trailer from the Magmo trailer list.");
  }
  const trailer = serializeTrailer(snapshot);
  if (!trailer.clientId) {
    throw new Error(
      "The selected trailer is not linked to a Client DB record yet. Link it in Trailer Setup first."
    );
  }
  if (trailer.clientId !== clean(clientId, 180)) {
    throw new Error("The selected trailer is not assigned to that client.");
  }
  if (
    trailer.machineId &&
    clean(machineId, 180) &&
    trailer.machineId !== clean(machineId, 180)
  ) {
    throw new Error(
      "The selected machine does not match the machine attached to that trailer."
    );
  }
  return trailer;
}

export async function checkGeneratedServiceRequestDuplicate({
  clientId,
  machineId,
  issueTitle,
  excludeRequestId = "",
}) {
  const { db } = requireServices();
  const client = await getClient(clientId);
  const machine = await getMachineForClient(machineId, client.id);
  const title = clean(issueTitle, 120);
  if (!title) throw new Error("Add an issue title before checking for duplicates.");
  const duplicate = await findGeneratedWorkOrderDuplicate({
    db,
    client,
    machine,
    issueTitle: title,
    excludeRequestId: clean(excludeRequestId, 180),
  });
  if (duplicate) throwDuplicateWorkOrder(duplicate);
  return { duplicate: false };
}

function normalizeGeneratedFilePurpose(value) {
  return String(value || "").toLowerCase() === "analysis"
    ? "analysis"
    : "reference";
}

function validateGeneratedDownloadUrl({
  downloadUrl,
  storagePath,
  bucketName,
}) {
  const value = clean(downloadUrl, 2000);
  if (!value) return "";
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("One attachment has an invalid Firebase download URL.");
  }
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== "firebasestorage.googleapis.com"
  ) {
    throw new Error("One attachment has an invalid Firebase download URL.");
  }
  const expectedPath = `/v0/b/${bucketName}/o/${encodeURIComponent(
    storagePath
  )}`;
  if (
    parsed.pathname !== expectedPath ||
    parsed.searchParams.get("alt") !== "media" ||
    !parsed.searchParams.get("token")
  ) {
    throw new Error("One attachment download URL does not match its upload.");
  }
  return parsed.toString();
}

async function verifyGeneratedFiles({ requestId, files }) {
  const { bucket } = requireServices();
  const submitted = Array.isArray(files) ? files.slice(0, GENERATED_FILE_LIMIT) : [];
  if ((Array.isArray(files) ? files.length : 0) > GENERATED_FILE_LIMIT) {
    throw new Error(`Attach no more than ${GENERATED_FILE_LIMIT} files.`);
  }
  const requiredPrefix = `ServiceRequests/${requestId}/`;
  let totalSize = 0;
  const verified = [];
  for (const file of submitted) {
    const storagePath = clean(file?.storagePath, 500);
    if (!storagePath.startsWith(requiredPrefix)) {
      throw new Error("One uploaded file does not belong to this request.");
    }
    const downloadUrl = validateGeneratedDownloadUrl({
      downloadUrl: file?.downloadUrl,
      storagePath,
      bucketName: bucket.name,
    });
    const thumbnailStoragePath = clean(file?.thumbnailStoragePath, 500);
    let thumbnailDownloadUrl = "";
    if (thumbnailStoragePath) {
      if (!thumbnailStoragePath.startsWith(`${requiredPrefix}thumbnails/`)) {
        throw new Error("One attachment thumbnail does not belong to this request.");
      }
      thumbnailDownloadUrl = validateGeneratedDownloadUrl({
        downloadUrl: file?.thumbnailDownloadUrl,
        storagePath: thumbnailStoragePath,
        bucketName: bucket.name,
      });
    }
    let metadata = null;
    if (!downloadUrl) {
      [metadata] = await bucket.file(storagePath).getMetadata();
    }
    const size = Number(metadata?.size || file?.size || 0);
    const contentType = clean(
      metadata?.contentType || file?.contentType,
      100
    ).toLowerCase();
    if (
      !contentType.startsWith("image/") &&
      !contentType.startsWith("video/") &&
      contentType !== "application/pdf"
    ) {
      throw new Error("Attachments must be an image, video, or PDF.");
    }
    if (!Number.isFinite(size) || size <= 0 || size > GENERATED_FILE_SIZE_LIMIT) {
      throw new Error("One attachment is empty or exceeds the 250 MB limit.");
    }
    totalSize += size;
    if (totalSize > GENERATED_TOTAL_FILE_SIZE_LIMIT) {
      throw new Error("The combined attachments exceed the 500 MB limit.");
    }
    verified.push({
      name: clean(file?.name || metadata?.name?.split("/").pop(), 140),
      contentType,
      size,
      storagePath,
      downloadUrl,
      thumbnailStoragePath,
      thumbnailDownloadUrl,
      purpose: normalizeGeneratedFilePurpose(file?.purpose),
      uploadedAtIso: new Date().toISOString(),
    });
  }
  return verified;
}

async function downloadRequestFile(file, bucket) {
  if (file?.downloadUrl) {
    const response = await fetch(file.downloadUrl);
    if (!response.ok) {
      throw new Error(
        `Could not download ${clean(file?.name || "an attachment", 140)} from Firebase Storage.`
      );
    }
    return Buffer.from(await response.arrayBuffer());
  }
  const [content] = await bucket.file(file.storagePath).download();
  return content;
}

export async function createGeneratedServiceRequest({
  requestId,
  clientId,
  machineId,
  trailerId,
  assignmentMode,
  assigneeIds = [],
  remoteAssigneeIds,
  dispatchAssigneeIds,
  oversightManagerIds,
  urgency,
  issueTitle,
  description,
  files = [],
  createdBy,
}) {
  const { db } = requireServices();
  const normalizedRequestId = clean(requestId, 180);
  if (!/^[A-Za-z0-9_-]{12,180}$/.test(normalizedRequestId)) {
    throw new Error("A valid generated request ID is required.");
  }
  const client = await getClient(clientId);
  const machine = await getMachineForClient(machineId, client.id);
  const trailer = await getTrailerForClient(trailerId, client.id, machine.id);
  const normalizedUrgency = clean(urgency, 40).toLowerCase();
  if (!URGENCY_LABELS[normalizedUrgency]) {
    throw new Error("Select Hard down, ASAP, Soon, or Anytime.");
  }
  const title = clean(issueTitle, 120);
  const detail = clean(description, 5000);
  if (!title) throw new Error("Add an issue title before creating the request.");
  if (!detail) throw new Error("Add a short issue description.");

  const options = listOpsAssigneeOptions();
  const selectedAssignment = resolveAssignmentSelection({
    options,
    remoteAssigneeIds,
    dispatchAssigneeIds,
    assigneeIds,
    assignmentMode,
    rejectUnknown: true,
  });
  const selectedOversight = resolveOversightSelection({
    options,
    oversightManagerIds,
    rejectUnknown: true,
  });
  const duplicate = await findGeneratedWorkOrderDuplicate({
    db,
    client,
    machine,
    issueTitle: title,
  });
  if (duplicate) throwDuplicateWorkOrder(duplicate);
  const verifiedFiles = await verifyGeneratedFiles({
    requestId: normalizedRequestId,
    files,
  });
  const ref = db.collection(COLLECTION).doc(normalizedRequestId);
  const now = new Date();
  const dateCode = now.toISOString().slice(0, 10).replaceAll("-", "");
  const requestNumber = `OPS-${dateCode}-${normalizedRequestId
    .slice(0, 6)
    .toUpperCase()}`;
  const contactEmail = clean(createdBy, 180);
  const machineSummary = {
    id: machine.id,
    name: machine.name,
    label: machine.label,
    oem: machine.oem,
    modality: machine.modality,
    model: machine.model,
    location: machine.location,
  };
  const trailerSummary = trailer
    ? {
        id: trailer.id,
        name: trailer.name,
        clientId: trailer.clientId,
        clientName: client.name,
        clientLocation: client.location,
        machineId: trailer.machineId,
        model: trailer.model,
        vin: trailer.vin,
      }
    : null;
  const requestedAssignment = {
    ...selectedAssignment,
    ...selectedOversight,
    requestedBy: contactEmail,
    requestedAtIso: now.toISOString(),
  };

  await ref.create({
    requestNumber,
    status: "pending",
    source: "magmo_ops",
    companyName: client.name,
    requestedServiceDate: now.toISOString().slice(0, 10),
    locationText: machine.location || client.location,
    urgency: normalizedUrgency,
    manufacturer: machine.oem,
    modality: machine.modality,
    systemModel: [machine.name, machine.model].filter(Boolean).join(" - "),
    equipmentOperational:
      normalizedUrgency === "hard_down" ? "no_cannot_scan" : "unknown",
    operationalImpact:
      normalizedUrgency === "hard_down" ? "scanning_stopped" : "",
    remoteAccess: selectedAssignment.remoteAssigneeIds.length ? "yes" : "unknown",
    requestedTiming: `${URGENCY_LABELS[normalizedUrgency]} · ${
      selectedAssignment.mode === "mixed"
        ? "Remote support + dispatch / in person"
        : selectedAssignment.mode === "remote"
        ? "Remote support"
        : selectedAssignment.mode === "dispatch"
        ? "Dispatch / in person"
        : "Assignment pending"
    }`,
    contactName: contactEmail || "Magmo admin",
    email: contactEmail,
    purchaseOrderNumber: "",
    issueTitle: title,
    description: detail,
    machineId: machine.id,
    machine: machineSummary,
    trailerId: trailer?.id || "",
    trailer: trailerSummary,
    requestedAssignment,
    clientMatchStatus: "confirmed",
    confirmedClient: {
      id: client.id,
      name: client.name,
      location: client.location,
      confirmedBy: contactEmail,
      confirmedAtIso: now.toISOString(),
    },
    files: verifiedFiles,
    createdBy: contactEmail,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return serializeRequest(await ref.get(), false);
}

export async function confirmServiceRequestClient({
  requestId,
  clientId,
  machineId,
  changedBy,
}) {
  const { db } = requireServices();
  const client = await getClient(clientId);
  const machine = await getMachineForClient(machineId, client.id);
  const confirmedMachine = {
    id: machine.id,
    name: machine.name,
    label: machine.label,
    oem: machine.oem,
    modality: machine.modality,
    model: machine.model,
    location: machine.location,
  };
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error("Service request does not exist.");
    const data = snapshot.data() || {};
    if (data.status === "accepted" || hasCreatedWorkOrder(data)) {
      throw new Error("This request has already been added as a work order.");
    }
    if (["archived", "denied"].includes(data.status)) {
      throw new Error(`A ${data.status} request cannot be changed.`);
    }
    if (data.status === "accepting") {
      throw new Error("This request is currently being added and cannot be changed.");
    }
    const hadConfirmedSelection = Boolean(
      clean(data.confirmedClient?.id, 180) ||
        clean(data.machineId, 180) ||
        normalizeOverseerApprovals(data.overseerApprovals).length
    );
    const selectionChanged =
      hadConfirmedSelection &&
      (clean(data.confirmedClient?.id, 180) !== client.id ||
        clean(data.machineId, 180) !== machine.id);
    transaction.set(
      ref,
      {
        confirmedClient: {
          id: client.id,
          name: client.name,
          location: client.location,
          confirmedBy: clean(changedBy, 180),
          confirmedAtIso: new Date().toISOString(),
        },
        machineId: machine.id,
        machine: confirmedMachine,
        clientMatchStatus: "confirmed",
        ...(selectionChanged
          ? {
              overseerApprovals: [],
              overseerApprovalCount: 0,
              overseerApprovalUpdatedAt: FieldValue.serverTimestamp(),
            }
          : {}),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return {
    client,
    machine: confirmedMachine,
    request: serializeRequest(await ref.get(), false),
  };
}

export async function suggestServiceRequestClientMatch({
  requestId,
  changedBy,
  force = false,
}) {
  const { db } = requireServices();
  const result = await suggestServiceRequestClient({
    db,
    requestId,
    changedBy,
    force,
  });
  return {
    ...result,
    request: await getServiceRequestDetail(requestId),
  };
}

export async function reviewServiceRequestClientMatch({
  requestId,
  decision,
  suggestedClientId,
  selectedClientId,
  reason,
  changedBy,
}) {
  const { db } = requireServices();
  const result = await reviewServiceRequestClientSuggestion({
    db,
    requestId,
    decision,
    suggestedClientId,
    selectedClientId,
    reason,
    changedBy,
  });
  return {
    ...result,
    request: await getServiceRequestDetail(requestId),
  };
}

export async function archiveServiceRequest({ requestId, changedBy }) {
  const { db } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("Service request does not exist.");
  if (snapshot.data()?.status === "denied") {
    throw new Error("A denied request cannot be archived.");
  }
  await ref.set(
    {
      status: "archived",
      archivedAt: FieldValue.serverTimestamp(),
      archivedBy: clean(changedBy, 180),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return { requestId: ref.id };
}

export async function denyServiceRequest({ requestId, changedBy }) {
  const { db, bucket } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("Service request does not exist.");
  const data = snapshot.data() || {};
  if (data.status === "accepted" || hasCreatedWorkOrder(data)) {
    throw new Error("This request already created a work order and cannot be denied.");
  }
  const paths = (Array.isArray(data.files) ? data.files : [])
    .flatMap((file) => [
      clean(file?.storagePath, 500),
      clean(file?.thumbnailStoragePath, 500),
    ])
    .filter(Boolean);
  await Promise.all(
    paths.map((path) => bucket.file(path).delete({ ignoreNotFound: true }))
  );
  await ref.set(
    {
      status: "denied",
      files: [],
      deniedAt: FieldValue.serverTimestamp(),
      deniedBy: clean(changedBy, 180),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return { requestId: ref.id, deletedAttachmentCount: paths.length };
}

export async function setServiceRequestOverseerApproval({
  requestId,
  approved,
  approver,
}) {
  const { db } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error("Service request does not exist.");
    const data = snapshot.data() || {};
    if (data.status === "accepted" || hasCreatedWorkOrder(data)) {
      throw new Error("This request has already been added as a work order.");
    }
    if (["archived", "denied"].includes(data.status)) {
      throw new Error(`A ${data.status} request cannot be approved.`);
    }
    if (data.status === "accepting") {
      throw new Error(
        "This request is currently being added and its approval cannot be changed."
      );
    }
    if (approved === true && !clean(data.confirmedClient?.id, 180)) {
      throw new Error(
        "Confirm the matching Client DB record before providing overseer approval."
      );
    }
    if (approved === true && !clean(data.machineId, 180)) {
      throw new Error(
        "Confirm the matching machine record before providing overseer approval."
      );
    }
    const nextApprovals = setOwnOverseerApproval(
      data.overseerApprovals,
      approver,
      approved === true
    );
    transaction.set(
      ref,
      {
        overseerApprovals: nextApprovals,
        overseerApprovalCount: nextApprovals.length,
        overseerApprovalUpdatedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return serializeRequest(await ref.get(), true);
}

function detailedDescription(request, client) {
  const sourceLabel =
    request.source === "magmo_ops"
      ? "Magmo Ops Generated Service Request"
      : "AIS Website Service Request";
  const assignment = request.requestedAssignment || {};
  const requestedAssigneeNames = Array.isArray(assignment.assignees)
    ? assignment.assignees.map((entry) => clean(entry?.name, 120)).filter(Boolean)
    : [];
  const remoteAssigneeNames = Array.isArray(assignment.remoteAssignees)
    ? assignment.remoteAssignees
        .map((entry) => clean(entry?.name, 120))
        .filter(Boolean)
    : assignment.mode === "remote"
    ? requestedAssigneeNames
    : [];
  const dispatchAssigneeNames = Array.isArray(assignment.dispatchAssignees)
    ? assignment.dispatchAssignees
        .map((entry) => clean(entry?.name, 120))
        .filter(Boolean)
    : assignment.mode !== "remote"
    ? requestedAssigneeNames
    : [];
  const lines = [
    `${sourceLabel}: ${request.requestNumber}`,
    `Confirmed Magmo client: ${client.name} (${client.id})`,
    `Submitted company: ${request.companyName}`,
    `Equipment location: ${request.locationText}`,
    `Requested service date: ${request.requestedServiceDate}`,
    `Urgency: ${request.urgencyLabel}`,
    "",
    `Equipment: ${request.manufacturer} ${request.modality}${
      request.systemModel ? ` — ${request.systemModel}` : ""
    }`,
    request.machine?.label ? `Magmo machine: ${request.machine.label}` : "",
    `Operational: ${request.equipmentOperational}`,
    `Operational impact: ${request.operationalImpact}`,
    `Remote access: ${request.remoteAccess}`,
    false && assignment.mode
      ? `Requested assignment: ${
          assignment.mode === "remote" ? "Remote" : "Dispatch / in person"
        }${
          requestedAssigneeNames.length
            ? ` — ${requestedAssigneeNames.join(", ")}`
            : ""
        }`
      : "",
    remoteAssigneeNames.length
      ? `Remote support: ${remoteAssigneeNames.join(", ")}`
      : "",
    dispatchAssigneeNames.length
      ? `Dispatch / in person: ${dispatchAssigneeNames.join(", ")}`
      : "",
    request.requestedTiming
      ? `Requested timing / access notes: ${request.requestedTiming}`
      : "",
    "",
    `Contact: ${request.contactName}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email}`,
    request.purchaseOrderNumber
      ? `Purchase order: ${request.purchaseOrderNumber}`
      : "",
    "",
    `Issue: ${request.issueTitle}`,
    request.description,
  ];
  return lines.filter((line, index) => line || lines[index - 1] !== "").join("\n");
}

function blueFolderUserName(user) {
  return (
    scalar(user.fullName) ||
    scalar(user.displayName) ||
    [scalar(user.firstName), scalar(user.lastName)].filter(Boolean).join(" ") ||
    scalar(user.userName)
  );
}

async function acquireAcceptance(ref, acceptedBy, selectedClientId = "") {
  const { db } = requireServices();
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error("Service request does not exist.");
    const data = snapshot.data() || {};
    if (data.status === "accepted") return { alreadyAccepted: true, data };
    if (hasCompletedAcceptance(data)) {
      transaction.set(
        ref,
        {
          status: "accepted",
          acceptedAt: data.acceptedAt || FieldValue.serverTimestamp(),
          acceptedBy:
            clean(data.acceptedBy, 180) || "Magmo request reconciliation",
          previousRequestStatus: clean(data.status || "pending", 40),
          processing: null,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      return { alreadyAccepted: true, data };
    }
    if (["archived", "denied"].includes(data.status)) {
      throw new Error(`A ${data.status} request cannot be accepted.`);
    }
    requireOverseerApproval(data.overseerApprovals);
    const approvedClientId = clean(data.confirmedClient?.id, 180);
    if (!approvedClientId) {
      throw new Error("Confirm the matching Client DB record before adding this request.");
    }
    if (!clean(data.machineId, 180)) {
      throw new Error("Confirm the matching machine record before adding this request.");
    }
    if (
      clean(selectedClientId, 180) &&
      clean(selectedClientId, 180) !== approvedClientId
    ) {
      throw new Error(
        "The selected client changed after overseer approval. Confirm the client and approve the request again."
      );
    }
    const startedAtMs = Number(data.processing?.acceptStartedAtMs || 0);
    if (data.status === "accepting" && Date.now() - startedAtMs < 120_000) {
      throw new Error("This request is already being accepted. Refresh in a moment.");
    }
    transaction.set(
      ref,
      {
        status: "accepting",
        processing: {
          stage: "slack_dispatch",
          acceptStartedAtMs: Date.now(),
          acceptedBy: clean(acceptedBy, 180),
          error: "",
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { alreadyAccepted: false, data };
  });
}

export async function acceptServiceRequest({
  requestId,
  clientId,
  assigneeIds,
  assignmentMode,
  remoteAssigneeIds,
  dispatchAssigneeIds,
  oversightManagerIds,
  acceptedBy,
}) {
  const { db, bucket } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const lock = await acquireAcceptance(ref, acceptedBy, clientId);
  if (lock.alreadyAccepted) return serializeRequest(await ref.get(), true);

  try {
    let snapshot = await ref.get();
    let data = snapshot.data() || {};
    const request = serializeRequest(snapshot, true);
    const selectedClientId = clean(clientId || request.confirmedClient?.id, 180);
    if (!selectedClientId) {
      throw new Error("Confirm the matching Client DB record before accepting.");
    }
    const client = await getClient(selectedClientId);

    const options = listOpsAssigneeOptions();
    const selectedAssignment = resolveAssignmentSelection({
      options,
      remoteAssigneeIds,
      dispatchAssigneeIds,
      assigneeIds,
      assignmentMode,
      fallbackAssignment: request.requestedAssignment || {},
    });
    const selectedOversight = resolveOversightSelection({
      options,
      oversightManagerIds,
      fallbackAssignment: request.requestedAssignment || {},
    });
    const acceptedAssignment = {
      ...selectedAssignment,
      ...selectedOversight,
      requestedBy: clean(
        request.requestedAssignment?.requestedBy || acceptedBy,
        180
      ),
      requestedAtIso:
        clean(request.requestedAssignment?.requestedAtIso, 80) ||
        new Date().toISOString(),
      acceptedBy: clean(acceptedBy, 180),
      acceptedAtIso: new Date().toISOString(),
    };

    let machine = null;
    if (request.machineId) {
      machine = await getMachineForClient(request.machineId, client.id);
    }
    const trailer = await getTrailerForClient(
      request.trailerId,
      client.id,
      machine?.id || request.machineId
    );
    const dispatchSubject = buildServiceRequestDispatchSubject({
      issueTitle: request.issueTitle,
      clientName: client.name,
      machineName: machine?.name || request.machine?.name,
      trailerName: trailer?.name || request.trailer?.name,
    });
    if (machine) {
      const duplicate = await findGeneratedWorkOrderDuplicate({
        db,
        client,
        machine,
        issueTitle: dispatchSubject,
        excludeRequestId: ref.id,
        excludeWorkOrderNumber:
          request.allocatedWorkOrderNumber || request.requestNumber,
      });
      if (duplicate) throwDuplicateWorkOrder(duplicate);
    }

    const baseSlackSettings = getSlackSettings();
    const dispatchChannel = resolveOpsDispatchChannelSettings(process.env);
    const dispatchChannelId = dispatchChannel.channelId;
    const dispatchChannelName = dispatchChannel.channelName;
    const slackSettings = {
      ...baseSlackSettings,
      slackChannelId: dispatchChannelId,
      slackChannelName: dispatchChannelName,
      slackUserIds: Array.from(
        new Set([
          ...DISPATCH_CORE_MENTION_USER_IDS,
          ...baseSlackSettings.slackUserIds,
          ...selectedAssignment.assigneeIds,
          ...selectedOversight.oversightManagerIds,
        ])
      ),
      slackMentionText: "",
    };
    const slack = createSlackClient(slackSettings);
    let slackState =
      data.slack && typeof data.slack === "object"
        ? { ...data.slack }
        : data.blueFolder?.slack && typeof data.blueFolder.slack === "object"
        ? { ...data.blueFolder.slack }
        : {};
    let workOrderNumber = clean(
      request.allocatedWorkOrderNumber || request.requestNumber,
      80
    );

    if (
      (!slackState.channel || !slackState.ts) &&
      data.lastWorkOrderReset?.slackThreadPreserved === true &&
      /^\d+$/.test(workOrderNumber)
    ) {
      const preservedChannel = await slack.resolveChannelId();
      slackState =
        (await repairPreservedResetSlackThread({
          slack,
          channel: preservedChannel,
          reset: data.lastWorkOrderReset,
          workOrderNumber,
          subject: dispatchSubject,
          bluefolderUrl: generatedBlueFolderWorkOrderUrl(workOrderNumber),
          description: request.description,
          mentionUserIds: slackSettings.slackUserIds,
        })) || {};
    }

    if (!slackState.channel || !slackState.ts) {
      const channel = await slack.resolveChannelId();
      let dispatchHistory = await readDispatchRootHistory(slack, channel);
      const existingAllocation = clean(request.allocatedWorkOrderNumber, 80);
      if (existingAllocation) {
        const recovered = await recoverAllocatedSlackRoot({
          slack,
          channel,
          messages: dispatchHistory,
          workOrderNumber: existingAllocation,
          subject: dispatchSubject,
          bluefolderUrl: generatedBlueFolderWorkOrderUrl(existingAllocation),
        });
        if (recovered && !recovered.collision) {
          workOrderNumber = existingAllocation;
          slackState = recovered.slackState;
        }
      }

      for (
        let attempt = 0;
        (!slackState.channel || !slackState.ts) && attempt < 3;
        attempt += 1
      ) {
        workOrderNumber = await reserveDispatchWorkOrderNumber({
          db,
          requestRef: ref,
          slackMessages: dispatchHistory,
          serverTimestamp: () => FieldValue.serverTimestamp(),
        });
        request.allocatedWorkOrderNumber = workOrderNumber;

        // Close the practical race between the history scan and Slack post.
        // A newly occupied number is reallocated; our own prior post is
        // recovered instead of creating a duplicate root.
        const newestRoots = await readDispatchRootHistory(slack, channel, {
          maxPages: 1,
          requireComplete: false,
        });
        const verification = await recoverAllocatedSlackRoot({
          slack,
          channel,
          messages: newestRoots,
          workOrderNumber,
          subject: dispatchSubject,
          bluefolderUrl: generatedBlueFolderWorkOrderUrl(workOrderNumber),
        });
        if (verification && !verification.collision) {
          slackState = verification.slackState;
          break;
        }
        if (verification?.collision) {
          dispatchHistory = [...newestRoots, ...dispatchHistory];
          continue;
        }

        slackState = await postWorkOrderToSlack({
          settings: slackSettings,
          slack,
          subject: dispatchSubject,
          description: request.description,
          bluefolderUrl: generatedBlueFolderWorkOrderUrl(workOrderNumber),
          workOrderNumber,
          clientMsgId: deterministicSlackClientMessageId(
            `magmo-service-request:${ref.id}:${workOrderNumber}:${Number(
              data.slackDispatchGeneration || 0
            )}`
          ),
        });
      }
      if (!slackState.channel || !slackState.ts) {
        throw new Error(
          "The next Slack #dispatch work-order number changed repeatedly. Refresh and try again."
        );
      }
      await ref.set(
        {
          allocatedWorkOrderNumber: workOrderNumber,
          dispatchSubject,
          slack: slackState,
          processing: {
            stage: "slack_attachments",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
    if (!slackState.channel || !slackState.ts) {
      throw new Error("Slack did not return a #dispatch thread.");
    }

    const bluefolderUrl = generatedBlueFolderWorkOrderUrl(workOrderNumber);
    const dispatchedAt =
      clean(data.dispatchReceipt?.dispatchedAt || data.dispatchedAt, 80) ||
      new Date().toISOString();
    const canonicalDispatch = await canonicalDispatchReceipt({
      slack,
      slackState,
      workOrderNumber,
      subject: dispatchSubject,
      bluefolderUrl,
      dispatchChannelId,
      dispatchedAt,
      dispatchedBy: clean(
        data.dispatchReceipt?.dispatchedBy || data.dispatchedBy || acceptedBy,
        180
      ),
    });
    slackState = canonicalDispatch.slackState;
    const dispatchReceipt = canonicalDispatch.receipt;

    await ref.set(
      {
        allocatedWorkOrderNumber: workOrderNumber,
        dispatchSubject,
        slack: slackState,
        dispatchReceipt,
        dispatchStatus: dispatchReceipt.dispatchStatus,
        slackChannel: dispatchReceipt.slackChannel,
        slackThreadTs: dispatchReceipt.slackThreadTs,
        slackPermalink: dispatchReceipt.slackPermalink,
        dispatchedAt: dispatchReceipt.dispatchedAt,
        dispatchedBy: dispatchReceipt.dispatchedBy,
        processing: {
          stage: "magmo_ingest",
          acceptStartedAtMs: Date.now(),
          acceptedBy: clean(acceptedBy, 180),
          error: "",
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    const ingested = await ingestCreatedWorkOrder({
      workOrderId: workOrderNumber,
      number: workOrderNumber,
      subject: dispatchSubject,
      description: request.description,
      customer: client.name,
      bluefolderUrl,
      slackPermalink: slackState.permalink,
      slackChannel: slackState.channel,
      slackThreadTs: slackState.ts,
      dispatchReceipt,
      dispatchStatus: dispatchReceipt.dispatchStatus,
      dispatchedAt: dispatchReceipt.dispatchedAt,
      dispatchedBy: dispatchReceipt.dispatchedBy,
      createdAt: request.createdAt || new Date().toISOString(),
      intakeServiceRequestId: ref.id,
      clientId: client.id,
      clientName: client.name,
      clientLocation: client.location,
      machineId: machine?.id || request.machineId,
      machineName: machine?.name || request.machine?.name,
      trailerId: trailer?.id || request.trailerId,
      trailerName: trailer?.name || request.trailer?.name,
      assignees: selectedAssignment.assignees,
      remoteAssignees: selectedAssignment.remoteAssignees,
      dispatchAssignees: selectedAssignment.dispatchAssignees,
      oversightManagers: selectedOversight.oversightManagers,
      assignmentMode: selectedAssignment.mode,
      priorityTier:
        {
          hard_down: "hard_down",
          asap: "in_progress",
          soon: "needs_scheduled",
          anytime: "anytime",
        }[request.urgency] || "needs_scheduled",
    });
    const magmoState = {
      workOrderId: ingested.workOrder.id || workOrderNumber,
      workflowStatus: ingested.workOrder.workflowStatus,
      priorityAnalyzed: Boolean(ingested.priorityAnalyzed),
      syncedAtIso: new Date().toISOString(),
    };
    await ref.set(
      {
        magmo: magmoState,
        allocatedWorkOrderNumber: workOrderNumber,
        requestedAssignment: acceptedAssignment,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    snapshot = await ref.get();
    data = snapshot.data() || {};
    const files = Array.isArray(data.files) ? [...data.files] : [];
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index] || {};
      if (file.purpose === "analysis" || file.slackFileId || !file.storagePath) {
        continue;
      }
      const content = await downloadRequestFile(file, bucket);
      const uploaded = await slack.uploadFile({
        channel: slackState.channel,
        threadTs: slackState.ts,
        content,
        fileName: clean(file.name, 140),
        title: clean(file.name, 140),
        contentType: clean(file.contentType, 100),
      });
      files[index] = {
        ...file,
        slackFileId: uploaded.id,
        slackUploadedAtIso: new Date().toISOString(),
      };
      await ref.set(
        {
          files,
          slack: slackState,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    await ref.set(
      {
        status: "accepted",
        confirmedClient: {
          id: client.id,
          name: client.name,
          location: client.location,
          confirmedBy: clean(acceptedBy, 180),
          confirmedAtIso: new Date().toISOString(),
        },
        requestedAssignment: acceptedAssignment,
        slack: slackState,
        magmo: magmoState,
        dispatchSubject,
        files,
        processing: null,
        acceptedAt: FieldValue.serverTimestamp(),
        acceptedBy: clean(acceptedBy, 180),
        previousRequestStatus: "accepting",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return serializeRequest(await ref.get(), true);
  } catch (error) {
    const current = await ref.get();
    const data = current.data() || {};
    const workOrderCreated = Boolean(clean(data.magmo?.workOrderId, 180));
    const hasSlackThread = Boolean(data.slack?.ts || data.blueFolder?.slack?.ts);
    const hasCanonicalPermalink = Boolean(
      clean(data.dispatchReceipt?.slackPermalink || data.slackPermalink, 1200)
    );
    const dispatchReceiptComplete = hasCompleteDispatchReceipt(
      data,
      clean(
        process.env.OPS_DISPATCH_CHANNEL_ID ||
          process.env.OPS_CONVERSATION_CHANNEL_ID,
        120
      )
    );
    const acceptanceComplete = workOrderCreated && dispatchReceiptComplete;
    const retryStage = !hasSlackThread
      ? "retry_slack"
      : !hasCanonicalPermalink
      ? "retry_slack_permalink"
      : !dispatchReceiptComplete
      ? "retry_dispatch_receipt"
      : !workOrderCreated
      ? "retry_magmo_ingest"
      : "slack_attachments_warning";
    await ref.set(
      {
        status: acceptanceComplete ? "accepted" : "pending",
        ...(acceptanceComplete
          ? {
              acceptedAt: data.acceptedAt || FieldValue.serverTimestamp(),
              acceptedBy:
                clean(data.acceptedBy, 180) ||
                "Magmo automatic request reconciliation",
              previousRequestStatus: "accepting",
            }
          : {}),
        processing: {
          ...(data.processing || {}),
          stage: retryStage,
          error: clean(error?.message || error, 800),
          failedAtIso: new Date().toISOString(),
          acceptStartedAtMs: 0,
          acceptedBy: clean(acceptedBy, 180),
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    throw error;
  }
}

async function legacyAcceptServiceRequestWithBlueFolder({
  requestId,
  clientId,
  assigneeIds,
  assignmentMode,
  remoteAssigneeIds,
  dispatchAssigneeIds,
  acceptedBy,
}) {
  throw new Error(
    "Disabled legacy BlueFolder path: generated service requests use the direct #dispatch workflow."
  );
  const { db, bucket } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const lock = await acquireAcceptance(ref, acceptedBy);
  if (lock.alreadyAccepted) {
    return serializeRequest(await ref.get(), true);
  }

  try {
    let snapshot = await ref.get();
    let data = snapshot.data() || {};
    const request = serializeRequest(snapshot, true);
    const selectedClientId = clean(clientId || request.confirmedClient?.id, 180);
    if (!selectedClientId) {
      throw new Error("Confirm the matching Client DB record before accepting.");
    }
    const client = await getClient(selectedClientId);
    await confirmServiceRequestClient({
      requestId: ref.id,
      clientId: client.id,
      machineId: request.machineId || request.machine?.id,
      changedBy: acceptedBy,
    });

    const options = listOpsAssigneeOptions();
    const selectedAssignment = resolveAssignmentSelection({
      options,
      remoteAssigneeIds,
      dispatchAssigneeIds,
      assigneeIds,
      assignmentMode,
      fallbackAssignment: request.requestedAssignment || {},
    });
    const selectedIds = selectedAssignment.assigneeIds;
    const selectedAssignees = selectedAssignment.assignees;
    const selectedRemoteAssignees = selectedAssignment.remoteAssignees;
    const selectedDispatchAssignees = selectedAssignment.dispatchAssignees;
    const normalizedAssignmentMode = selectedAssignment.mode;
    const acceptedAssignment = {
      ...selectedAssignment,
      requestedBy: clean(
        request.requestedAssignment?.requestedBy || acceptedBy,
        180
      ),
      requestedAtIso:
        clean(request.requestedAssignment?.requestedAtIso, 80) ||
        new Date().toISOString(),
      acceptedBy: clean(acceptedBy, 180),
      acceptedAtIso: new Date().toISOString(),
    };
    const requestForAcceptance = {
      ...request,
      requestedAssignment: acceptedAssignment,
      remoteAccess: selectedRemoteAssignees.length
        ? "yes"
        : request.remoteAccess,
    };
    const blueFolder = createBlueFolderClient(getBlueFolderSlackSettings());
    const externalId = `AIS-WEB-${ref.id}`;
    let blueFolderState =
      data.blueFolder && typeof data.blueFolder === "object"
        ? { ...data.blueFolder }
        : {};
    let serviceRequestId = clean(blueFolderState.serviceRequestId, 80);
    let workOrderNumber = clean(blueFolderState.number, 80);

    if (!serviceRequestId) {
      const recovered = await blueFolder
        .getWorkOrderByExternalId(externalId)
        .catch(() => null);
      if (recovered) {
        serviceRequestId = scalar(
          recovered.serviceRequestId || recovered.serviceRequestID
        );
        workOrderNumber = scalar(
          recovered.serviceRequestNo ||
            recovered.serviceRequestNumber ||
            serviceRequestId
        );
      }
    }

    if (!serviceRequestId) {
      let blueFolderCustomerId = client.bluefolderCustomerId;
      if (!blueFolderCustomerId) {
        const customers = await blueFolder.listCustomers();
        const match = customers.find(
          (customer) =>
            normalizeName(scalar(customer.customerName || customer.name)) ===
            normalizeName(client.name)
        );
        blueFolderCustomerId = scalar(match?.customerId || match?.id);
      }
      const created = await blueFolder.createServiceRequest({
        customerId: blueFolderCustomerId,
        description: request.issueTitle,
        detailedDescription: detailedDescription(requestForAcceptance, client),
        externalId,
        priority: request.urgencyLabel,
        purchaseOrderNo: request.purchaseOrderNumber,
        sourceId: request.requestNumber,
      });
      serviceRequestId = created.serviceRequestId;
      workOrderNumber = serviceRequestId;
      const detail = await blueFolder.getWorkOrder(serviceRequestId).catch(() => null);
      if (detail) {
        const fields = extractWorkOrderFields(
          detail,
          getBlueFolderSlackSettings()
        );
        workOrderNumber = fields.number || serviceRequestId;
      }
      blueFolderState = {
        ...blueFolderState,
        serviceRequestId,
        number: workOrderNumber,
        externalId,
        customerId: blueFolderCustomerId || null,
        createdAtIso: new Date().toISOString(),
      };
      await ref.set(
        {
          blueFolder: blueFolderState,
          processing: {
            ...data.processing,
            stage: "assignment",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    let blueFolderAssignees = Array.isArray(blueFolderState.assignees)
      ? blueFolderState.assignees
      : [];
    if (
      selectedDispatchAssignees.length &&
      !blueFolderState.assignmentCompleted
    ) {
      const users = await blueFolder.listUsers();
      const usersByName = new Map(
        users
          .map((user) => [
            normalizeName(blueFolderUserName(user)),
            {
              id: scalar(user.userId || user.id),
              name: blueFolderUserName(user),
            },
          ])
          .filter(([name, user]) => name && user.id)
      );
      blueFolderAssignees = selectedDispatchAssignees
        .map((assignee) => usersByName.get(normalizeName(assignee.name)))
        .filter(Boolean);
      if (blueFolderAssignees.length) {
        await blueFolder.addAssignment(
          serviceRequestId,
          blueFolderAssignees.map((assignee) => assignee.id),
          `Assigned while accepting ${request.requestNumber} in Magmo Ops`
        );
      }
      blueFolderState = {
        ...blueFolderState,
        assignmentCompleted: true,
        assignmentMode: normalizedAssignmentMode,
        assignees: blueFolderAssignees,
        unmappedAssigneeNames: selectedDispatchAssignees
          .filter(
            (selected) =>
              !blueFolderAssignees.some(
                (mapped) =>
                  normalizeName(mapped.name) === normalizeName(selected.name)
              )
          )
          .map((assignee) => assignee.name),
      };
      await ref.set(
        {
          blueFolder: blueFolderState,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    } else if (!blueFolderState.assignmentCompleted) {
      blueFolderState = {
        ...blueFolderState,
        assignmentCompleted: true,
        assignmentMode: normalizedAssignmentMode,
        assignees: [],
        unmappedAssigneeNames: [],
      };
      await ref.set(
        {
          blueFolder: blueFolderState,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    snapshot = await ref.get();
    data = snapshot.data() || {};
    const files = Array.isArray(data.files) ? [...data.files] : [];
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index] || {};
      if (
        file.blueFolderAttachmentId ||
        file.blueFolderSkippedReason ||
        !file.storagePath
      ) {
        continue;
      }
      if (String(file.contentType || "").toLowerCase().startsWith("video/")) {
        files[index] = {
          ...file,
          blueFolderSkippedReason:
            "Video retained in Magmo and attached to the Slack work-order thread.",
        };
        await ref.set(
          {
            files,
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        continue;
      }
      const content = await downloadRequestFile(file, bucket);
      const uploaded = await blueFolder.addAttachment({
        serviceRequestId,
        content,
        fileName: clean(file.name, 140),
        contentType: clean(file.contentType, 100),
      });
      files[index] = {
        ...file,
        blueFolderAttachmentId: uploaded.attachmentToken,
      };
      await ref.set(
        {
          files,
          processing: {
            ...data.processing,
            stage: "slack",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    const testingChannelId = clean(
      process.env.OPS_TESTING_CHANNEL_ID ||
        process.env.SLACK_TESTING_CHANNEL_ID,
      120
    );
    if (!testingChannelId) {
      throw new Error(
        "OPS_TESTING_CHANNEL_ID is required; this intake will not post to the production dispatch channel."
      );
    }
    const baseSlackSettings = getSlackSettings();
    const slackSettings = {
      ...baseSlackSettings,
      slackChannelId: testingChannelId,
      slackChannelName: "",
      slackUserIds: Array.from(
        new Set([
          ...DISPATCH_CORE_MENTION_USER_IDS,
          ...baseSlackSettings.slackUserIds,
          ...selectedIds,
        ])
      ),
    };
    const slack = createSlackClient(slackSettings);
    let slackState =
      data.blueFolder?.slack && typeof data.blueFolder.slack === "object"
        ? data.blueFolder.slack
        : blueFolderState.slack || {};
    if (!slackState.permalink) {
      slackState = await postWorkOrderToSlack({
        settings: slackSettings,
        slack,
        subject: request.issueTitle,
        description: request.description,
        bluefolderUrl: getBlueFolderSlackSettings()
          .bluefolderWorkOrderUrlTemplate.replaceAll(
            "{id}",
            encodeURIComponent(serviceRequestId)
          )
          .replaceAll("{number}", encodeURIComponent(workOrderNumber)),
        workOrderNumber,
      });
      blueFolderState = { ...blueFolderState, slack: slackState };
      await ref.set(
        {
          blueFolder: blueFolderState,
          processing: {
            ...data.processing,
            stage: "magmo",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      if (slackState.permalink) {
        await blueFolder
          .updateSlackLink(serviceRequestId, slackState.permalink)
          .catch((error) => {
            console.warn("[Ops][service-request][bluefolder-link]", error?.message);
          });
      }
    }
    if (!slackState.channel || !slackState.ts) {
      throw new Error("Slack did not return a work-order thread for attachments.");
    }
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index] || {};
      if (
        file.purpose === "analysis" ||
        file.slackFileId ||
        !file.storagePath
      ) {
        continue;
      }
      const content = await downloadRequestFile(file, bucket);
      const uploaded = await slack.uploadFile({
        channel: slackState.channel,
        threadTs: slackState.ts,
        content,
        fileName: clean(file.name, 140),
        title: clean(file.name, 140),
        contentType: clean(file.contentType, 100),
      });
      files[index] = {
        ...file,
        slackFileId: uploaded.id,
        slackUploadedAtIso: new Date().toISOString(),
      };
      await ref.set(
        {
          files,
          processing: {
            ...data.processing,
            stage: "magmo",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    const bluefolderUrl = getBlueFolderSlackSettings()
      .bluefolderWorkOrderUrlTemplate.replaceAll(
        "{id}",
        encodeURIComponent(serviceRequestId)
      )
      .replaceAll("{number}", encodeURIComponent(workOrderNumber));
    const { workOrder, priorityAnalyzed } = await ingestCreatedWorkOrder({
      eventType: "work_order.created",
      workOrderId: serviceRequestId,
      number: workOrderNumber,
      subject: request.issueTitle,
      description: detailedDescription(requestForAcceptance, client),
      customer: client.name,
      bluefolderUrl,
      slackPermalink: slackState.permalink,
      slackChannel: slackState.channel,
      slackThreadTs: slackState.ts,
      createdAt: new Date().toISOString(),
      intakeServiceRequestId: ref.id,
      clientId: client.id,
      clientName: client.name,
      machineId: request.machineId || request.machine?.id,
      machineName: request.machine?.name || request.machine?.label,
      assignees: selectedAssignees,
      remoteAssignees: selectedRemoteAssignees,
      bluefolderAssignees,
      assignmentMode: normalizedAssignmentMode,
    });

    await ref.set(
      {
        status: "accepted",
        confirmedClient: {
          id: client.id,
          name: client.name,
          location: client.location,
          confirmedBy: clean(acceptedBy, 180),
          confirmedAtIso: new Date().toISOString(),
        },
        blueFolder: { ...blueFolderState, serviceRequestId, number: workOrderNumber },
        requestedAssignment: acceptedAssignment,
        magmo: {
          workOrderId: workOrder.id,
          workflowStatus: workOrder.workflowStatus,
          priorityAnalyzed,
          syncedAtIso: new Date().toISOString(),
        },
        processing: null,
        acceptedAt: FieldValue.serverTimestamp(),
        acceptedBy: clean(acceptedBy, 180),
        previousRequestStatus: "accepting",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return serializeRequest(await ref.get(), true);
  } catch (error) {
    const current = await ref.get();
    const data = current.data() || {};
    const workOrderCreated = hasCreatedWorkOrder(data);
    const hasBlueFolderWorkOrder = Boolean(data.blueFolder?.serviceRequestId);
    await ref.set(
      {
        status: workOrderCreated ? "accepted" : "pending",
        ...(workOrderCreated
          ? {
              acceptedAt: data.acceptedAt || FieldValue.serverTimestamp(),
              acceptedBy:
                clean(data.acceptedBy, 180) ||
                "Magmo automatic request reconciliation",
              previousRequestStatus: "accepting",
            }
          : {}),
        processing: {
          ...(data.processing || {}),
          stage: hasBlueFolderWorkOrder ? "sync_warning" : "retry_bluefolder",
          error: clean(error?.message || error, 800),
          failedAtIso: new Date().toISOString(),
          acceptStartedAtMs: 0,
          acceptedBy: clean(acceptedBy, 180),
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    throw error;
  }
}
