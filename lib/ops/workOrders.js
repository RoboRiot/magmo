import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
import { saveManualOpsMemory, saveOpsCompanyLessons } from "./companyMemory";

export const OPS_WORK_ORDER_COLLECTION = "OpsWorkOrders";

const MESSAGE_SUBCOLLECTION = "messages";
const CALENDAR_SUBCOLLECTION = "calendarEvents";
const ACTIVE_STATUSES = new Set(["active", "open", "processing"]);
const MAX_ASSIGNMENT_HISTORY = 100;
const MAX_PRIORITY_HISTORY = 100;
const MAX_UPDATE_HISTORY = 30;
const MAX_PART_MOVEMENT_HISTORY = 20;
const MAX_WORKFLOW_STAGE_HISTORY = 100;
const WORKFLOW_STAGES = new Set([
  "unassigned",
  "active",
  "remote",
  "service_complete",
  "done",
]);
const WORKFLOW_STAGE_LABELS = {
  unassigned: "Unassigned",
  active: "Active",
  remote: "Remote",
  service_complete: "Service complete",
  done: "Done",
};
const PRIORITY_TIERS = new Set([
  "hard_down",
  "in_progress",
  "needs_scheduled",
  "anytime",
]);
const GENERATED_PRIORITY_PATTERN = /^generated_[a-z0-9]+(?:_[a-z0-9]+){0,4}$/;
const PRIORITY_TIER_ORDER = {
  hard_down: 0,
  in_progress: 1,
  needs_scheduled: 2,
  anytime: 3,
};
const PRIORITY_TIER_LABELS = {
  hard_down: "Hard down",
  in_progress: "In progress",
  needs_scheduled: "Needs to be scheduled",
  anytime: "Anytime",
};
const INITIAL_OWNER = { id: "U07F4G8NP2P", name: "Yao N" };

const REMOTE_WORK_PATTERNS = [
  /\bremote(?:ly)?\b/i,
  /\b(?:vpn|teamviewer|anydesk|screen\s*share|ssh)\b/i,
  /\b(?:log(?:ged|ging)?|sign(?:ed|ing)?)\s+in\b/i,
  /\b(?:phone|video|zoom|teams)\s+call\b/i,
  /\bover\s+(?:the\s+)?phone\b/i,
];
const IN_PERSON_WORK_PATTERNS = [
  /\b(?:on[-\s]?site|in[-\s]?person)\b/i,
  /\b(?:arriv(?:e|ed|ing)|head(?:ed|ing)|driv(?:e|ing)|en\s+route)\b/i,
  /\bat\s+(?:the\s+)?(?:site|customer|hospital|facility|office|warehouse)\b/i,
  /\b(?:site\s+visit|field\s+visit|dispatch(?:ed|ing)?)\b/i,
  /\b(?:uber|courier|pick(?:ed|ing)?\s+up|deliver(?:ed|ing)?)\b/i,
];

export function inferOpsWorkMode(...values) {
  for (const rawValue of values.flat()) {
    const value = cleanText(rawValue, 4000);
    if (!value) continue;
    const remote = REMOTE_WORK_PATTERNS.some((pattern) => pattern.test(value));
    const inPerson = IN_PERSON_WORK_PATTERNS.some((pattern) =>
      pattern.test(value)
    );
    if (remote && inPerson) return "mixed";
    if (remote) return "remote";
    if (inPerson) return "in_person";
  }
  return "unspecified";
}

function normalizeNameKey(value) {
  return cleanText(value, 100)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function buildSlackIdentityMaps() {
  const byId = new Map([
    [INITIAL_OWNER.id, INITIAL_OWNER.name],
    ["U07EY4TF21L", "Stanley Wu"],
    ["U0B3CSLG126", "Joshua Yoon"],
    ["U07FH9RLMNV", "Stan Redd"],
  ]);
  for (const pair of String(process.env.SLACK_USER_NAME_MAP || "").split(",")) {
    const separator = pair.indexOf("=");
    if (separator < 1) continue;
    const id = cleanText(pair.slice(0, separator), 80);
    const name = cleanText(pair.slice(separator + 1), 100);
    if (id && name) byId.set(id, name);
  }
  const aliasCandidates = new Map();
  const addAlias = (alias, id) => {
    const key = normalizeNameKey(alias);
    if (!key) return;
    if (!aliasCandidates.has(key)) aliasCandidates.set(key, new Set());
    aliasCandidates.get(key).add(id);
  };
  byId.forEach((name, id) => {
    addAlias(name, id);
    addAlias(name.split(/\s+/)[0], id);
  });
  const byAlias = new Map();
  aliasCandidates.forEach((ids, alias) => {
    if (ids.size === 1) byAlias.set(alias, [...ids][0]);
  });
  return { byId, byAlias };
}

const SLACK_IDENTITIES = buildSlackIdentityMaps();

function requireDb() {
  if (!adminDb) {
    throw new Error("Firebase Admin Firestore is not initialized.");
  }
  return adminDb;
}

function cleanText(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

function normalizeWorkOrderSubject(value, number = "") {
  const escapedNumber = String(number || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let subject = cleanText(value, 1200)
    .replace(/\[?\*{0,2}([^()[\]]+?)\*{0,2}\]?\(https?:\/\/[^)]+\)/g, "$1")
    .replace(/<https?:\/\/[^>|]+\|([^>]+)>/g, "$1")
    .replace(/<https?:\/\/[^>]+>/g, "")
    .replace(/[*_`]+/g, "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  if (escapedNumber) {
    subject = subject.replace(
      new RegExp(
        `^(?:work\\s*order|wo|service\\s*request|sr)?\\s*#?\\s*${escapedNumber}\\s*(?:[-:|]\\s*)?`,
        "i"
      ),
      ""
    );
  }
  return cleanText(subject || "Untitled work order", 500);
}

function normalizeId(value) {
  const normalized = cleanText(value, 180);
  if (!normalized || normalized.includes("/")) return "";
  return normalized;
}

function messageId(value) {
  return cleanText(value, 180).replace(/[^A-Za-z0-9_.-]/g, "_");
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (typeof value === "string") return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}

function normalizeWorkflowStageValue(value) {
  const stage = cleanText(value, 60)
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (stage === "in_progress" || stage === "processing" || stage === "open") {
    return "active";
  }
  if (stage === "completed" || stage === "complete" || stage === "closed") {
    return "done";
  }
  return WORKFLOW_STAGES.has(stage) ? stage : "";
}

function normalizeWorkflowStage(data = {}, assignmentHistory = []) {
  const stored = normalizeWorkflowStageValue(
    data.workflowStatus || data.workflowStage
  );
  const isActive = ACTIVE_STATUSES.has(String(data.status || "").toLowerCase());
  if (!isActive) return "done";
  if (stored === "service_complete" || stored === "done") return stored;
  if (normalizeAssignees(data.bluefolderAssignees).length) return "active";
  return Boolean(data.remoteWorkActive) ? "remote" : "unassigned";
}

function normalizeWorkflowStageHistory(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => {
      const stage = normalizeWorkflowStageValue(entry?.stage);
      const enteredAtIso = timestampToIso(entry?.enteredAt) ||
        cleanText(entry?.enteredAtIso, 80);
      const exitedAtIso = timestampToIso(entry?.exitedAt) ||
        cleanText(entry?.exitedAtIso, 80);
      if (!stage || !enteredAtIso) return null;
      const calculatedDuration =
        enteredAtIso && exitedAtIso
          ? Math.max(0, Date.parse(exitedAtIso) - Date.parse(enteredAtIso))
          : 0;
      return {
        id: cleanText(entry?.id || `workflow-${index}`, 180),
        stage,
        label: WORKFLOW_STAGE_LABELS[stage],
        enteredAtIso,
        exitedAtIso,
        durationMs: Math.max(
          0,
          Number(entry?.durationMs || calculatedDuration || 0)
        ),
        source: cleanText(entry?.source, 80),
        changedBy: cleanText(entry?.changedBy, 180),
        reason: cleanText(entry?.reason, 500),
      };
    })
    .filter(Boolean)
    .slice(-MAX_WORKFLOW_STAGE_HISTORY);
}

function workflowStageStartIso(data = {}, stage = "") {
  return (
    timestampToIso(data.workflowStageStartedAt) ||
    cleanText(data.workflowStageStartedAtIso, 80) ||
    (stage === "done" ? timestampToIso(data.completedAt) : "") ||
    timestampToIso(data.createdAt) ||
    cleanText(data.createdAtIso, 80) ||
    new Date().toISOString()
  );
}

function buildWorkflowTransitionUpdate(
  data,
  nextStageValue,
  {
    changedBy = "Magmo",
    source = "system",
    reason = "",
    nowIso = new Date().toISOString(),
  } = {}
) {
  const history = normalizeAssignmentHistory(data.assignmentHistory);
  const currentStage = normalizeWorkflowStage(data, history);
  const nextStage = normalizeWorkflowStageValue(nextStageValue);
  if (!nextStage) throw new Error("A valid Ops workflow stage is required.");
  if (currentStage === nextStage) return {};
  const enteredAtIso = workflowStageStartIso(data, currentStage);
  const durationMs = Math.max(
    0,
    Date.parse(nowIso) - Date.parse(enteredAtIso)
  );
  const stageHistory = normalizeWorkflowStageHistory(
    data.workflowStageHistory
  );
  stageHistory.push({
    id: `${currentStage}-${Date.now()}`,
    stage: currentStage,
    enteredAtIso,
    exitedAtIso: nowIso,
    durationMs: Number.isFinite(durationMs) ? durationMs : 0,
    source: cleanText(source, 80),
    changedBy: cleanText(changedBy, 180),
    reason: cleanText(reason, 500),
  });
  return {
    workflowStatus: nextStage,
    workflowStageStartedAt: FieldValue.serverTimestamp(),
    workflowStageStartedAtIso: nowIso,
    workflowStageHistory: stageHistory.slice(-MAX_WORKFLOW_STAGE_HISTORY),
  };
}

function normalizeAssignees(value) {
  const assignees = [];
  const indexesByName = new Map();
  const seenIds = new Set();
  for (const entry of Array.isArray(value) ? value : []) {
    let name = cleanText(entry?.name || entry, 100);
    let id = cleanText(entry?.id, 80);
    const normalizedName = normalizeNameKey(name);
    const nameParts = normalizedName.split(/\s+/).filter(Boolean);
    const shortenedNameId =
      nameParts.length === 2 && nameParts[1].length <= 2
        ? SLACK_IDENTITIES.byAlias.get(nameParts[0])
        : "";
    const canonicalId =
      SLACK_IDENTITIES.byId.has(id)
        ? id
        : SLACK_IDENTITIES.byAlias.get(normalizedName) || shortenedNameId;
    if (canonicalId) {
      id = canonicalId;
      name = SLACK_IDENTITIES.byId.get(canonicalId) || name;
    }
    if (/^U[A-Z0-9]{6,}$/i.test(name) && !canonicalId) continue;
    const nameKey = normalizeNameKey(name);
    const idKey = id.toLowerCase();
    if (!name || !nameKey) continue;
    if (indexesByName.has(nameKey)) {
      const index = indexesByName.get(nameKey);
      const existingId = assignees[index]?.id || "";
      const incomingIsSlack = /^U[A-Z0-9]+$/.test(id);
      const existingIsSlack = /^U[A-Z0-9]+$/.test(existingId);
      if (incomingIsSlack && !existingIsSlack) {
        if (existingId) seenIds.delete(existingId.toLowerCase());
        assignees[index] = { id, name };
        seenIds.add(idKey);
      }
      continue;
    }
    if (idKey && seenIds.has(idKey)) continue;
    indexesByName.set(nameKey, assignees.length);
    if (idKey) seenIds.add(idKey);
    assignees.push({ id, name });
  }
  return assignees.slice(0, 12);
}

function mergeAssignees(...values) {
  return normalizeAssignees(values.flatMap((value) => (Array.isArray(value) ? value : [])));
}

function withoutAssignees(value, removed) {
  const removedAssignees = normalizeAssignees(removed);
  const removedNames = new Set(
    removedAssignees.map((entry) => normalizeNameKey(entry.name))
  );
  const removedIds = new Set(
    removedAssignees.map((entry) => entry.id.toLowerCase()).filter(Boolean)
  );
  return normalizeAssignees(value).filter(
    (entry) =>
      !removedNames.has(normalizeNameKey(entry.name)) &&
      !removedIds.has(entry.id.toLowerCase())
  );
}

function normalizePriorityTier(value) {
  const tier = cleanText(value, 60).toLowerCase();
  return PRIORITY_TIERS.has(tier) || GENERATED_PRIORITY_PATTERN.test(tier)
    ? tier
    : "needs_scheduled";
}

function isGeneratedPriorityTier(value) {
  return GENERATED_PRIORITY_PATTERN.test(normalizePriorityTier(value));
}

function normalizePriorityLabel(tier, value = "") {
  const normalizedTier = normalizePriorityTier(tier);
  if (PRIORITY_TIER_LABELS[normalizedTier]) {
    return PRIORITY_TIER_LABELS[normalizedTier];
  }
  const supplied = cleanText(value, 80).replace(/\s*\(Generated\)\s*$/i, "");
  if (supplied) return supplied;
  return normalizedTier
    .replace(/^generated_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function normalizePriorityOrder(tier, value) {
  const normalizedTier = normalizePriorityTier(tier);
  if (Number.isFinite(PRIORITY_TIER_ORDER[normalizedTier])) {
    return PRIORITY_TIER_ORDER[normalizedTier];
  }
  const supplied = Number(value);
  return Number.isFinite(supplied)
    ? Math.max(0, Math.min(3, supplied))
    : 2;
}

function normalizeOpsUpdates(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => {
      const progressItems = Array.isArray(entry?.progress)
        ? entry.progress
        : [];
      const businessItems = Array.isArray(entry?.businessNotes)
        ? entry.businessNotes
        : [];
      const legacySummary = (progressItems.length ? progressItems : businessItems)
        .slice(0, 4)
        .map((item) => cleanText(item, 350))
        .filter(Boolean)
        .join(" ");
      return {
      id: cleanText(entry?.id || "update-" + index, 180),
      headline: cleanText(entry?.headline, 300),
      statusLine: cleanText(entry?.statusLine, 500),
      summary: cleanText(entry?.summary || legacySummary, 900),
      legacyFormat: !cleanText(entry?.summary, 20),
      progress: (Array.isArray(entry?.progress) ? entry.progress : [])
        .map((item) => cleanText(item, 500))
        .filter(Boolean)
        .slice(0, 4),
      nextSteps: (Array.isArray(entry?.nextSteps) ? entry.nextSteps : [])
        .map((item) => cleanText(item, 500))
        .filter(Boolean)
        .slice(0, 4),
      blockers: (Array.isArray(entry?.blockers) ? entry.blockers : [])
        .map((item) => cleanText(item, 500))
        .filter(Boolean)
        .slice(0, 3),
      businessNotes: (Array.isArray(entry?.businessNotes) ? entry.businessNotes : [])
        .map((item) => cleanText(item, 500))
        .filter(Boolean)
        .slice(0, 4),
      generatedAtIso: cleanText(entry?.generatedAtIso, 80),
      throughSlackTs: cleanText(entry?.throughSlackTs, 180),
      sourceMessageCount: Number(entry?.sourceMessageCount || 0),
      recoveredFromSlack: Boolean(entry?.recoveredFromSlack),
      finalSummary: Boolean(entry?.finalSummary),
    };
    })
    .slice(-MAX_UPDATE_HISTORY);
}

function normalizePartMovements(value, latest = null) {
  const candidates = Array.isArray(value) ? [...value] : [];
  if (
    latest &&
    typeof latest === "object" &&
    !candidates.some((entry) => entry?.id && entry.id === latest.id)
  ) {
    candidates.push(latest);
  }
  return candidates
    .map((entry, index) => ({
      id: cleanText(entry?.id || `parts-${index}`, 180),
      summary: cleanText(entry?.summary, 700),
      state: ["none", "open", "returned", "unknown"].includes(
        cleanText(entry?.state, 40).toLowerCase()
      )
        ? cleanText(entry?.state, 40).toLowerCase()
        : "unknown",
      movements: (Array.isArray(entry?.movements) ? entry.movements : [])
        .map((movement) => ({
          partName: cleanText(movement?.partName, 180),
          movement: cleanText(movement?.movement || "unknown", 40),
          status: cleanText(movement?.status, 180),
        }))
        .filter((movement) => movement.partName)
        .slice(0, 8),
      outstanding: (Array.isArray(entry?.outstanding)
        ? entry.outstanding
        : []
      )
        .map((item) => cleanText(item, 180))
        .filter(Boolean)
        .slice(0, 8),
      reportType: cleanText(entry?.reportType, 40),
      generatedAtIso: cleanText(entry?.generatedAtIso, 80),
      throughSlackTs: cleanText(entry?.throughSlackTs, 180),
      sourceMessageCount: Number(entry?.sourceMessageCount || 0),
    }))
    .filter(
      (entry) =>
        entry.summary || entry.movements.length || entry.outstanding.length
    )
    .slice(-MAX_PART_MOVEMENT_HISTORY);
}

function normalizeAssignmentHistory(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => ({
      id: cleanText(entry?.id || `assignment-${index}`, 180),
      source: cleanText(entry?.source || "ai", 40),
      previousAssignees: normalizeAssignees(entry?.previousAssignees),
      assignees: normalizeAssignees(entry?.assignees),
      reason: cleanText(entry?.reason, 700),
      triggerMessage: cleanText(entry?.triggerMessage, 1000),
      triggerSender: cleanText(entry?.triggerSender, 100),
      triggerSlackTs: cleanText(entry?.triggerSlackTs, 180),
      confidence: Number(entry?.confidence || 0),
      changedAtIso: cleanText(entry?.changedAtIso, 80),
    }))
    .slice(-MAX_ASSIGNMENT_HISTORY);
}

function normalizePriorityHistory(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => ({
      id: cleanText(entry?.id || `priority-${index}`, 180),
      source: cleanText(entry?.source || "ai", 40),
      previousTier: normalizePriorityTier(entry?.previousTier),
      priorityTier: normalizePriorityTier(entry?.priorityTier),
      priorityLabel: normalizePriorityLabel(
        entry?.priorityTier,
        entry?.priorityLabel
      ),
      priorityGenerated:
        Boolean(entry?.priorityGenerated) ||
        isGeneratedPriorityTier(entry?.priorityTier),
      reason: cleanText(entry?.reason, 700),
      triggerMessage: cleanText(entry?.triggerMessage, 1000),
      triggerSender: cleanText(entry?.triggerSender, 100),
      triggerSlackTs: cleanText(entry?.triggerSlackTs, 180),
      confidence: Number(entry?.confidence || 0),
      memoryIds: (Array.isArray(entry?.memoryIds) ? entry.memoryIds : [])
        .map((id) => cleanText(id, 180))
        .filter(Boolean)
        .slice(0, 5),
      changedAtIso: cleanText(entry?.changedAtIso, 80),
    }))
    .slice(-MAX_PRIORITY_HISTORY);
}

function assigneesMatch(left, right) {
  const keys = (value) =>
    normalizeAssignees(value)
      .map((entry) => normalizeNameKey(entry.name) || entry.id.toLowerCase())
      .sort();
  return JSON.stringify(keys(left)) === JSON.stringify(keys(right));
}

function initialAssignmentEntry(assignees, changedAtIso) {
  const normalizedAssignees = normalizeAssignees(assignees);
  const hasProtectedEngineer = normalizedAssignees.some(
    (entry) => entry.id.startsWith("bluefolder:")
  );
  return {
    id: "initial-assignment",
    source: "initial",
    previousAssignees: [],
    assignees: normalizedAssignees,
    reason: hasProtectedEngineer
      ? "BlueFolder engineers remain assigned while Slack adds dispatch helpers."
      : "New work orders start with Yao until responsibility changes in Slack.",
    triggerMessage: "",
    triggerSender: "Magmo",
    triggerSlackTs: "",
    confidence: 1,
    changedAtIso: cleanText(changedAtIso, 80),
  };
}

function workOrderRef(workOrderId) {
  const normalized = normalizeId(workOrderId);
  if (!normalized) throw new Error("A valid work order ID is required.");
  return requireDb().collection(OPS_WORK_ORDER_COLLECTION).doc(normalized);
}

function serializeWorkOrder(snapshot) {
  const data = snapshot.data() || {};
  const isActive = ACTIVE_STATUSES.has(String(data.status || "").toLowerCase());
  const assignees = normalizeAssignees(data.assignees);
  const assignmentHistory = normalizeAssignmentHistory(data.assignmentHistory);
  const workflowStatus = normalizeWorkflowStage(data, assignmentHistory);
  const workflowStageStartedAt = workflowStageStartIso(data, workflowStatus);
  const workflowStageStartedMs = Date.parse(workflowStageStartedAt);
  const workflowStageHistory = normalizeWorkflowStageHistory(
    data.workflowStageHistory
  );
  const latestAssignment = assignmentHistory[assignmentHistory.length - 1];
  const priorityHistory = normalizePriorityHistory(data.priorityHistory);
  const latestPriority = priorityHistory[priorityHistory.length - 1];
  const opsUpdates = normalizeOpsUpdates(data.opsUpdateHistory);
  const latestUpdate = opsUpdates[opsUpdates.length - 1];
  const partMovements = normalizePartMovements(
    data.partMovementsHistory,
    data.partMovementsLatest
  );
  const storedWorkMode = cleanText(data.workMode, 40).toLowerCase();
  const inferredWorkMode = ["remote", "in_person", "mixed"].includes(storedWorkMode)
    ? storedWorkMode
    : inferOpsWorkMode(
        latestAssignment?.triggerMessage,
        latestAssignment?.reason,
        latestPriority?.triggerMessage,
        latestPriority?.reason,
        latestUpdate?.summary,
        latestUpdate?.statusLine,
        data.assignmentSummary,
        data.description,
        data.subject
      );
  const workMode =
    Boolean(data.remoteWorkActive) && inferredWorkMode === "unspecified"
      ? "remote"
      : inferredWorkMode;
  return {
    id: snapshot.id,
    workOrderId: data.workOrderId || snapshot.id,
    number: cleanText(data.number || snapshot.id, 120),
    subject: normalizeWorkOrderSubject(
      data.subject || "Untitled work order",
      data.number || snapshot.id
    ),
    description: cleanText(data.description, 1800),
    customer: cleanText(data.customer, 220),
    bluefolderUrl: cleanText(data.bluefolderUrl, 1200),
    slackPermalink: cleanText(data.slackPermalink, 1200),
    slackChannel: cleanText(data.slackChannel, 120),
    slackThreadTs: cleanText(data.slackThreadTs, 120),
    status: isActive ? "active" : "completed",
    workflowStatus,
    workflowStageLabel: WORKFLOW_STAGE_LABELS[workflowStatus],
    workflowStageStartedAt,
    workflowStageElapsedMs: Number.isFinite(workflowStageStartedMs)
      ? Math.max(0, Date.now() - workflowStageStartedMs)
      : 0,
    workflowStageHistory,
    priorityTier: normalizePriorityTier(data.priorityTier),
    priorityLabel: normalizePriorityLabel(data.priorityTier, data.priorityLabel),
    priorityGenerated:
      Boolean(data.priorityGenerated) || isGeneratedPriorityTier(data.priorityTier),
    priorityOrder: normalizePriorityOrder(data.priorityTier, data.priorityOrder),
    priorityReason: cleanText(data.priorityReason, 700),
    priorityContext: cleanText(data.priorityContext, 900),
    priorityConfidence: Number(data.priorityConfidence || 0),
    prioritySource: cleanText(data.prioritySource, 40),
    priorityHistory,
    priorityInferenceVersion: Number(data.priorityInferenceVersion || 0),
    priorityFeedback:
      data.priorityFeedback && typeof data.priorityFeedback === "object"
        ? {
            vote: cleanText(data.priorityFeedback.vote, 20),
            category: normalizePriorityTier(data.priorityFeedback.category),
            changedBy: cleanText(data.priorityFeedback.changedBy, 180),
            createdAt: timestampToIso(data.priorityFeedback.createdAt),
          }
        : null,
    priorityReclassificationRequested: Boolean(
      data.priorityReclassificationRequested
    ),
    priorityRank: Number.isFinite(Number(data.priorityRank))
      ? Number(data.priorityRank)
      : Number.MAX_SAFE_INTEGER,
    assignees,
    bluefolderAssignees: normalizeAssignees(data.bluefolderAssignees),
    remoteWorkActive: Boolean(data.remoteWorkActive),
    remoteWorkReason: cleanText(data.remoteWorkReason, 700),
    remoteWorkConfidence: Number(data.remoteWorkConfidence || 0),
    remoteInferenceVersion: Number(data.remoteInferenceVersion || 0),
    assignmentSummary: cleanText(data.assignmentSummary, 700),
    assignmentDecisionReason: cleanText(data.assignmentDecisionReason, 700),
    assignmentHistory,
    opsUpdates,
    partMovements,
    partsReturnStatus: cleanText(data.partsReturnStatus, 40),
    workMode,
    messageCount: Number(data.messageCount || 0),
    analysisInputTokens: Number(data.analysisInputTokens || 0),
    analysisOutputTokens: Number(data.analysisOutputTokens || 0),
    summaryInputTokens: Number(data.summaryInputTokens || 0),
    summaryOutputTokens: Number(data.summaryOutputTokens || 0),
    createdAt: timestampToIso(data.createdAt) || cleanText(data.createdAtIso, 80),
    lastActivityAt:
      timestampToIso(data.lastActivityAt) || cleanText(data.lastActivityAtIso, 80),
    completedAt: timestampToIso(data.completedAt),
    completedBy: cleanText(data.completedBy, 180),
    serviceCompletedAt: timestampToIso(data.serviceCompletedAt),
    serviceCompletedBy: cleanText(data.serviceCompletedBy, 180),
    intakeServiceRequestId: cleanText(data.intakeServiceRequestId, 180),
    clientId: cleanText(data.clientId, 180),
    clientName: cleanText(data.clientName, 220),
  };
}

export async function getOpsWorkOrderById(workOrderId) {
  const snapshot = await workOrderRef(workOrderId).get();
  if (!snapshot.exists) {
    throw new Error(`Ops work order ${workOrderId} does not exist.`);
  }
  return serializeWorkOrder(snapshot);
}

export async function listOpsWorkOrders() {
  const snapshot = await requireDb()
    .collection(OPS_WORK_ORDER_COLLECTION)
    .limit(500)
    .get();
  const workOrders = snapshot.docs
    .filter((document) => !document.data()?.deletedAt)
    .map(serializeWorkOrder);
  const activeSort = (a, b) =>
    a.priorityOrder - b.priorityOrder ||
    a.priorityRank - b.priorityRank ||
    Date.parse(a.createdAt || 0) - Date.parse(b.createdAt || 0);
  const unassigned = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "unassigned")
    .sort(activeSort);
  const active = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "active")
    .sort(activeSort);
  const remote = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "remote")
    .sort(activeSort);
  const serviceComplete = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "service_complete")
    .sort(
      (a, b) =>
        Date.parse(b.serviceCompletedAt || b.lastActivityAt || 0) -
        Date.parse(a.serviceCompletedAt || a.lastActivityAt || 0)
    );
  const done = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "done")
    .sort(
      (a, b) =>
        Date.parse(b.completedAt || b.lastActivityAt || 0) -
        Date.parse(a.completedAt || a.lastActivityAt || 0)
    )
    .slice(0, 150);
  return {
    unassigned,
    active,
    remote,
    serviceComplete,
    done,
    // Keep the previous response field during rollout for older clients.
    completed: done,
  };
}

export async function listOpsCalendarSource() {
  const snapshot = await requireDb()
    .collection(OPS_WORK_ORDER_COLLECTION)
    .limit(500)
    .get();
  const workOrders = snapshot.docs
    .filter((document) => !document.data()?.deletedAt)
    .map(serializeWorkOrder);
  const messageDocuments = snapshot.docs.filter((document) => {
    const data = document.data() || {};
    return (
      !data.deletedAt &&
      ACTIVE_STATUSES.has(String(data.status || "").toLowerCase()) ||
      (!data.deletedAt && Number(data.messageCount || 0) > 0)
    );
  });
  const messageGroups = await Promise.all(
    messageDocuments.map(async (document) => {
      const messages = await document.ref
        .collection(MESSAGE_SUBCOLLECTION)
        .limit(500)
        .get();
      return [
        document.id,
        messages.docs
          .map((messageDocument) => {
            const data = messageDocument.data() || {};
            return {
              id: messageDocument.id,
              slackTs: cleanText(data.slackTs, 180),
              sender:
                normalizeAssignees([data.sender])[0] || {
                  id: "",
                  name: "Unknown",
                },
              candidates: normalizeAssignees(data.candidates),
              text: cleanText(data.text, 6000),
            };
          })
          .filter((message) => message.slackTs && message.text)
          .sort((left, right) => Number(left.slackTs) - Number(right.slackTs)),
      ];
    })
  );
  const calendarDocuments = snapshot.docs.filter((document) => {
    const data = document.data() || {};
    return !data.deletedAt && Number(data.calendarEntryCount || 0) > 0;
  });
  const retainedGroups = await Promise.all(
    calendarDocuments.map(async (document) => {
      const retained = await document.ref
        .collection(CALENDAR_SUBCOLLECTION)
        .limit(500)
        .get();
      return [
        document.id,
        retained.docs
          .map((calendarDocument) => {
            const data = calendarDocument.data() || {};
            return {
              id: calendarDocument.id,
              slackTs: cleanText(data.slackTs, 180),
              sender:
                normalizeAssignees([data.sender])[0] || {
                  id: "",
                  name: "Unknown",
                },
              candidates: normalizeAssignees(data.candidates),
              text: cleanText(data.text, 700),
            };
          })
          .filter((message) => message.slackTs && message.text),
      ];
    })
  );
  const messagesByWorkOrder = Object.fromEntries(messageGroups);
  retainedGroups.forEach(([workOrderId, retained]) => {
    const existing = messagesByWorkOrder[workOrderId] || [];
    const existingIds = new Set(existing.map((message) => message.id));
    messagesByWorkOrder[workOrderId] = existing
      .concat(retained.filter((message) => !existingIds.has(message.id)))
      .sort((left, right) => Number(left.slackTs) - Number(right.slackTs));
  });
  return {
    workOrders,
    messagesByWorkOrder,
  };
}

export async function upsertOpsWorkOrder(payload = {}) {
  const workOrderId = normalizeId(payload.workOrderId || payload.id);
  if (!workOrderId) throw new Error("A valid work order ID is required.");
  const ref = workOrderRef(workOrderId);
  const nowIso = new Date().toISOString();

  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const existing = snapshot.exists ? snapshot.data() || {} : {};
    const isCompleted = !ACTIVE_STATUSES.has(
      String(existing.status || "active").toLowerCase()
    );
    const update = {
      workOrderId,
      number: cleanText(payload.number || workOrderId, 120),
      subject: normalizeWorkOrderSubject(
        payload.subject || "Untitled work order",
        payload.number || workOrderId
      ),
      description: cleanText(payload.description, 1800),
      customer: cleanText(payload.customer, 220),
      bluefolderUrl: cleanText(payload.bluefolderUrl, 1200),
      slackPermalink: cleanText(payload.slackPermalink, 1200),
      slackChannel: cleanText(payload.slackChannel, 120),
      slackThreadTs: cleanText(payload.slackThreadTs, 120),
      createdAtIso: cleanText(payload.createdAt, 80),
      lastActivityAtIso: nowIso,
      lastActivityAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (payload.intakeServiceRequestId != null) {
      update.intakeServiceRequestId = cleanText(
        payload.intakeServiceRequestId,
        180
      );
    }
    if (payload.clientId != null) {
      update.clientId = cleanText(payload.clientId, 180);
    }
    if (payload.clientName != null) {
      update.clientName = cleanText(payload.clientName, 220);
    }
    if (!snapshot.exists) {
      const bluefolderAssignees = normalizeAssignees(
        payload.bluefolderAssignees
      );
      const acceptedAssignees = normalizeAssignees(payload.assignees);
      const initialAssignees = acceptedAssignees.length
        ? mergeAssignees(bluefolderAssignees, acceptedAssignees)
        : bluefolderAssignees.length
        ? bluefolderAssignees
        : [INITIAL_OWNER];
      const startsAssigned = Boolean(
        acceptedAssignees.length || bluefolderAssignees.length
      );
      Object.assign(update, {
        status: "active",
        workflowStatus: startsAssigned ? "active" : "unassigned",
        workflowStageStartedAt: FieldValue.serverTimestamp(),
        workflowStageStartedAtIso: nowIso,
        workflowStageHistory: [],
        priorityTier: normalizePriorityTier(payload.priorityTier),
        priorityLabel: normalizePriorityLabel(payload.priorityTier),
        priorityGenerated: false,
        priorityOrder: normalizePriorityOrder(payload.priorityTier),
        priorityReason: "Awaiting initial AI operational-category review.",
        priorityContext: "",
        priorityConfidence: 0,
        prioritySource: "initial",
        priorityHistory: [],
        priorityInferenceVersion: 0,
        remoteWorkActive: false,
        remoteWorkReason: "",
        remoteWorkConfidence: 0,
        remoteInferenceVersion: 0,
        priorityRank: Date.now(),
        assignees: initialAssignees,
        bluefolderAssignees,
        assignmentSummary: startsAssigned
          ? `Accepted and assigned to ${initialAssignees
              .map((entry) => entry.name)
              .join(", ")}.`
          : "Initially assigned to Yao until ownership changes in Slack.",
        assignmentDecisionReason:
          startsAssigned
            ? "Assignment was confirmed while accepting the website service request."
            : "New work orders start with Yao until responsibility changes in Slack.",
        assignmentHistory: [initialAssignmentEntry(initialAssignees, nowIso)],
        messageCount: 0,
        analysisInputTokens: 0,
        analysisOutputTokens: 0,
        createdAt: FieldValue.serverTimestamp(),
      });
    } else {
      if (!Array.isArray(existing.assignmentHistory)) {
        update.assignmentHistory = [
          initialAssignmentEntry(
            normalizeAssignees(existing.assignees),
            timestampToIso(existing.createdAt) || existing.createdAtIso || nowIso
          ),
        ];
      }
      if (
        !PRIORITY_TIERS.has(String(existing.priorityTier || "").toLowerCase()) &&
        !GENERATED_PRIORITY_PATTERN.test(
          String(existing.priorityTier || "").toLowerCase()
        )
      ) {
        update.priorityTier = "needs_scheduled";
        update.priorityLabel = PRIORITY_TIER_LABELS.needs_scheduled;
        update.priorityGenerated = false;
        update.priorityOrder = PRIORITY_TIER_ORDER.needs_scheduled;
      }
      if (!cleanText(existing.workflowStatus, 40)) {
        update.workflowStatus = normalizeAssignees(
          existing.bluefolderAssignees
        ).length
          ? "active"
          : Boolean(existing.remoteWorkActive)
          ? "remote"
          : "unassigned";
      }
      if (
        !timestampToIso(existing.workflowStageStartedAt) &&
        !cleanText(existing.workflowStageStartedAtIso, 80)
      ) {
        update.workflowStageStartedAt = FieldValue.serverTimestamp();
        update.workflowStageStartedAtIso = nowIso;
      }
    }
    if (snapshot.exists && isCompleted) {
      delete update.lastActivityAtIso;
      delete update.lastActivityAt;
    }
    transaction.set(ref, update, { merge: true });
  });

  const snapshot = await ref.get();
  return serializeWorkOrder(snapshot);
}

export async function deleteOpsWorkOrder(
  workOrderId,
  deletedBy = "Magmo admin"
) {
  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error("Ops work order does not exist.");
    }
    transaction.set(
      ref,
      {
        status: "deleted",
        deletedAt: FieldValue.serverTimestamp(),
        deletedBy: cleanText(deletedBy, 180),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return { workOrderId: normalizeId(workOrderId), recoverable: true };
}

export async function saveOpsInitialPriorityAnalysis({
  workOrderId,
  priorityChanged,
  priorityTier,
  priorityLabel,
  priorityGenerated,
  priorityOrder,
  priorityReason,
  priorityContext,
  priorityConfidence,
  workMode,
  remoteWorkActive,
  remoteStateChanged,
  remoteWorkReason,
  remoteWorkConfidence,
  includeRemote = false,
  memoryIds = [],
  usage,
}) {
  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    if (!ACTIVE_STATUSES.has(String(current.status || "").toLowerCase())) return;
    const previousTier = normalizePriorityTier(current.priorityTier);
    const requestedTier = normalizePriorityTier(priorityTier);
    const confidence = Number(priorityConfidence || 0);
    const changed =
      Boolean(priorityChanged) &&
      requestedTier !== previousTier &&
      confidence >= Number(process.env.OPS_PRIORITY_MIN_CONFIDENCE || 0.72);
    const nextTier = changed ? requestedTier : previousTier;
    const nextLabel = normalizePriorityLabel(
      nextTier,
      changed ? priorityLabel : current.priorityLabel
    );
    const nextGenerated = changed
      ? Boolean(priorityGenerated) || isGeneratedPriorityTier(nextTier)
      : Boolean(current.priorityGenerated) || isGeneratedPriorityTier(nextTier);
    const nextOrder = normalizePriorityOrder(
      nextTier,
      changed ? priorityOrder : current.priorityOrder
    );
    const reason = cleanText(priorityReason, 700);
    const remoteConfidence = Number(remoteWorkConfidence || 0);
    const nextRemoteActive =
      includeRemote &&
      remoteConfidence >= Number(process.env.OPS_REMOTE_MIN_CONFIDENCE || 0.72)
        ? Boolean(remoteWorkActive)
        : Boolean(current.remoteWorkActive);
    const nextWorkMode = ["remote", "in_person", "mixed", "unspecified"].includes(
      cleanText(workMode, 40).toLowerCase()
    )
      ? cleanText(workMode, 40).toLowerCase()
      : nextRemoteActive
      ? "remote"
      : cleanText(current.workMode, 40).toLowerCase() || "unspecified";
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    const desiredStage = normalizeAssignees(current.bluefolderAssignees).length
      ? "active"
      : nextRemoteActive
      ? "remote"
      : "unassigned";
    const workflowUpdate =
      !includeRemote || ["service_complete", "done"].includes(currentStage)
      ? {}
      : buildWorkflowTransitionUpdate(current, desiredStage, {
          changedBy: "Magmo AI",
          source: "remote_inference",
          reason:
            cleanText(remoteWorkReason, 500) ||
            (nextRemoteActive
              ? "Slack indicates active remote work."
              : "No active remote work is currently established."),
        });
    const history = normalizePriorityHistory(current.priorityHistory);
    history.push({
      id: "initial-ai-" + Date.now(),
      source: "ai_initial",
      previousTier,
      priorityTier: nextTier,
      reason,
      triggerMessage: "",
      triggerSender: "Magmo AI",
      triggerSlackTs: "",
      confidence,
      memoryIds,
      changedAtIso: new Date().toISOString(),
    });
    transaction.set(
      ref,
      {
        priorityTier: nextTier,
        priorityLabel: nextLabel,
        priorityGenerated: nextGenerated,
        priorityOrder: nextOrder,
        priorityReason: reason,
        priorityContext: cleanText(priorityContext, 900),
        priorityConfidence: confidence,
        prioritySource: "ai_initial",
        priorityHistory: history.slice(-MAX_PRIORITY_HISTORY),
        priorityInferenceVersion: 1,
        ...(includeRemote
          ? {
              remoteWorkActive: nextRemoteActive,
              remoteWorkReason: cleanText(remoteWorkReason, 700),
              remoteWorkConfidence: remoteConfidence,
              remoteInferenceVersion: 1,
              workMode: nextWorkMode,
            }
          : {}),
        ...workflowUpdate,
        priorityUpdatedAt: FieldValue.serverTimestamp(),
        analysisInputTokens: FieldValue.increment(Number(usage?.inputTokens || 0)),
        analysisOutputTokens: FieldValue.increment(Number(usage?.outputTokens || 0)),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return serializeWorkOrder(await ref.get());
}

export function shouldAnalyzeAssignmentMessage(text) {
  const normalized = cleanText(text, 4000).toLowerCase();
  if (!normalized) return false;
  const assignmentSignals = [
    /\b(assign(?:ed|ment)?|take|taking|handle|handling|own|owner|responsib(?:le|ility)|cover|pick(?:ing)?\s+(?:this|it)\s+up|i['’]?ll|i\s+will|i\s+can|can\s+you|could\s+you|please\s+(?:take|handle|cover)|pass(?:ing)?\s+(?:this|it)\s+to|hand(?:ing)?\s*(?:this|it)?\s*off|on\s+it|working\s+on|looking\s+into|checking\s+on|heading\s+(?:to|out)|en\s+route|at\s+(?:the\s+)?site|send(?:ing)?\s+\w+|dispatch(?:ing|ed)?)\b/i,
    /\b(?:i\s+am|i['’]?m|we\s+are|we['’]?re)\s+(?:moving|checking|testing|replacing|repairing|rebooting|swapping|bringing|taking|driving|heading|working|handling|grabbing)\b/i,
    /\b(?:i\s+am\s+|i['’]?m\s+)?(?:going|gonna|imma)\s+to\s+(?:go|grab|bring|check|test|replace|repair|handle|take|head)\b/i,
  ];
  return assignmentSignals.some((signal) => signal.test(normalized));
}

export function shouldAnalyzeOpsMessage(text) {
  const normalized = cleanText(text, 4000).toLowerCase();
  if (!normalized) return false;
  if (shouldAnalyzeAssignmentMessage(normalized)) return true;
  const prioritySignals = [
    /\b(?:hard\s*down|system\s+down|machine\s+down|scanner\s+down|offline|unusable|not\s+operational|cannot\s+scan|no\s+connection)\b/i,
    /\b(?:schedul(?:e|ed|ing)|appointment|availability|eta|dispatch|send\s+(?:a\s+)?tech|on-?site|visit|delivery|parts?\s+(?:needed|ordered|arriv|ship))\b/i,
    /\b(?:working\s+on|in\s+progress|en\s+route|on\s+the\s+way|at\s+the\s+site|troubleshoot|testing|repairing|replacing|installing|delivering|coordinating)\b/i,
    /\b(?:working|checking|troubleshooting|diagnosing|testing|fixing|repairing|rebooting|reloading|connected|logged\s+in)\s+(?:on\s+it\s+)?remote(?:ly)?\b|\b(?:teamviewer|anydesk|remote\s+(?:session|connection|access)|vpn|ssh)\b/i,
    /\b(?:remote\s+(?:session|work)\s+(?:ended|complete|stopped)|could(?:n['â€™]?t| not)\s+(?:fix|resolve).{0,30}remote|needs?\s+(?:an?\s+)?on-?site|sending\s+(?:an?\s+)?tech)\b/i,
    /\b(?:back\s+up|operational|restored|resolved|running\s+again)\b/i,
    /\b(?:no\s+rush|not\s+urgent|whenever|when\s+you\s+have\s+time|can\s+wait|next\s+pm|monitor(?:ing)?|follow\s+up\s+later)\b/i,
    /\b(?:waiting\s+on|pending|approval|quote|purchase\s+order|vendor|customer\s+(?:reply|response|confirmation)|blocked)\b/i,
  ];
  return prioritySignals.some((signal) => signal.test(normalized));
}

function shouldRetainOpsCalendarMessage(text) {
  const normalized = cleanText(text, 6000).toLowerCase();
  if (!normalized) return false;
  if (shouldAnalyzeOpsMessage(normalized)) return true;
  return /\b(?:today|tomorrow|next\s+(?:sun|mon|tue|wed|thu|fri|sat)|this\s+(?:sun|mon|tue|wed|thu|fri|sat)|at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)|worked|fixed|tested|repaired|replaced|installed|delivered|arrived|remote(?:ly)?|on[-\s]?site|in[-\s]?person|logged\s+in|diagnosed|resolved|restored)\b/i.test(
    normalized
  );
}

export async function recordOpsMessage(payload = {}) {
  const workOrderId = normalizeId(payload.workOrderId);
  const slackTs = cleanText(payload.slackTs, 180);
  const id = messageId(slackTs);
  if (!workOrderId || !id) {
    throw new Error("A valid work order ID and Slack timestamp are required.");
  }
  const ref = workOrderRef(workOrderId);
  const msgRef = ref.collection(MESSAGE_SUBCOLLECTION).doc(id);
  const candidates = normalizeAssignees(payload.candidates);
  const text = cleanText(payload.text, 6000);
  const needsAnalysis = shouldAnalyzeOpsMessage(text);
  const retainForCalendar = shouldRetainOpsCalendarMessage(text);
  const calendarRef = ref.collection(CALENDAR_SUBCOLLECTION).doc(id);
  const sender = normalizeAssignees([
    { id: payload.senderId, name: payload.senderName || payload.senderId },
  ])[0] || { id: "", name: "Unknown" };
  const calendarEntry = {
    slackTs,
    sender,
    candidates,
    text: cleanText(text, 700),
    workMode: inferOpsWorkMode(text),
    recordedAt: FieldValue.serverTimestamp(),
  };
  const now = Date.now();

  return requireDb().runTransaction(async (transaction) => {
    const [workOrderSnapshot, messageSnapshot, calendarSnapshot] = await Promise.all([
      transaction.get(ref),
      transaction.get(msgRef),
      retainForCalendar ? transaction.get(calendarRef) : Promise.resolve(null),
    ]);
    if (!workOrderSnapshot.exists) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const workOrder = workOrderSnapshot.data() || {};
    if (!ACTIVE_STATUSES.has(String(workOrder.status || "").toLowerCase())) {
      return { accepted: false, reason: "completed" };
    }

    if (messageSnapshot.exists) {
      const existing = messageSnapshot.data() || {};
      const retryable =
        existing.analysisStatus === "error" ||
        (existing.analysisStatus === "analyzing" &&
          now - Number(existing.analysisStartedAtMs || 0) > 120000);
      if (!retryable || !needsAnalysis) {
        if (retainForCalendar && !calendarSnapshot?.exists) {
          transaction.set(calendarRef, calendarEntry, { merge: true });
          transaction.set(
            ref,
            {
              calendarEntryCount: FieldValue.increment(1),
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        }
        return { accepted: false, reason: "duplicate" };
      }
    }

    transaction.set(
      msgRef,
      {
        slackTs,
        sender,
        text,
        candidates,
        receivedAt: FieldValue.serverTimestamp(),
        analysisStatus: needsAnalysis ? "analyzing" : "not_needed",
        analysisStartedAtMs: needsAnalysis ? now : 0,
      },
      { merge: true }
    );
    if (retainForCalendar) {
      transaction.set(calendarRef, calendarEntry, { merge: true });
    }
    transaction.set(
      ref,
      {
        lastActivityAt: FieldValue.serverTimestamp(),
        lastActivityAtIso: new Date().toISOString(),
        updatedAt: FieldValue.serverTimestamp(),
        ...(messageSnapshot.exists ? {} : { messageCount: FieldValue.increment(1) }),
        ...(retainForCalendar && !calendarSnapshot?.exists
          ? { calendarEntryCount: FieldValue.increment(1) }
          : {}),
      },
      { merge: true }
    );

    return {
      accepted: true,
      needsAnalysis,
      workOrder: serializeWorkOrder(workOrderSnapshot),
      message: { id, slackTs, sender, text, candidates },
      calendarSaved: retainForCalendar,
    };
  });
}

export async function saveOpsAssignmentAnalysis({
  workOrderId,
  messageId: rawMessageId,
  assignees,
  changed,
  summary,
  reason,
  confidence,
  priorityChanged,
  priorityTier,
  priorityLabel,
  priorityGenerated,
  priorityOrder,
  priorityReason,
  priorityContext,
  priorityConfidence,
  workMode,
  remoteWorkActive,
  remoteStateChanged,
  remoteWorkReason,
  remoteWorkConfidence,
  memoryIds = [],
  usage,
  triggerMessage,
  triggerSender,
  triggerSlackTs,
}) {
  const ref = workOrderRef(workOrderId);
  const msgRef = ref
    .collection(MESSAGE_SUBCOLLECTION)
    .doc(messageId(rawMessageId));
  return requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const protectedAssignees = normalizeAssignees(current.bluefolderAssignees);
    const previousAssignees = normalizeAssignees(current.assignees);
    const protectedPrevious = mergeAssignees(
      protectedAssignees,
      previousAssignees
    );
    const nextAssignees = mergeAssignees(protectedAssignees, assignees);
    const protectionRepair = !assigneesMatch(
      previousAssignees,
      protectedPrevious
    );
    const assignmentChanged =
      (Boolean(changed) || protectionRepair) &&
      !assigneesMatch(previousAssignees, nextAssignees);
    const decisionReason = cleanText(reason, 700);
    const nowIso = new Date().toISOString();
    const assignmentHistory = normalizeAssignmentHistory(current.assignmentHistory);
    if (assignmentChanged) {
      assignmentHistory.push({
        id: messageId(rawMessageId),
        source: "ai",
        previousAssignees,
        assignees: nextAssignees,
        reason: decisionReason,
        triggerMessage: cleanText(triggerMessage, 1000),
        triggerSender: cleanText(triggerSender, 100),
        triggerSlackTs: cleanText(triggerSlackTs, 180),
        confidence: Number(confidence || 0),
        changedAtIso: nowIso,
      });
    }

    const previousTier = normalizePriorityTier(current.priorityTier);
    const requestedTier = normalizePriorityTier(priorityTier);
    const categoryConfidence = Number(priorityConfidence || 0);
    const categoryChanged =
      ACTIVE_STATUSES.has(String(current.status || "").toLowerCase()) &&
      Boolean(priorityChanged) &&
      requestedTier !== previousTier &&
      categoryConfidence >= Number(process.env.OPS_PRIORITY_MIN_CONFIDENCE || 0.72);
    const categoryReason = cleanText(priorityReason, 700);
    const priorityHistory = normalizePriorityHistory(current.priorityHistory);
    if (categoryChanged) {
      priorityHistory.push({
        id: messageId(rawMessageId),
        source: "ai",
        previousTier,
        priorityTier: requestedTier,
        reason: categoryReason,
        triggerMessage: cleanText(triggerMessage, 1000),
        triggerSender: cleanText(triggerSender, 100),
        triggerSlackTs: cleanText(triggerSlackTs, 180),
        confidence: categoryConfidence,
        memoryIds,
        changedAtIso: nowIso,
      });
    }
    const currentWorkflowStage = normalizeWorkflowStage(
      current,
      assignmentHistory
    );
    const remoteConfidence = Number(remoteWorkConfidence || 0);
    const remoteChangeAccepted =
      Boolean(remoteStateChanged) &&
      remoteConfidence >= Number(process.env.OPS_REMOTE_MIN_CONFIDENCE || 0.72);
    const nextRemoteActive = remoteChangeAccepted
      ? Boolean(remoteWorkActive)
      : Boolean(current.remoteWorkActive);
    const requestedWorkMode = cleanText(workMode, 40).toLowerCase();
    const nextWorkMode = remoteChangeAccepted
      ? ["remote", "in_person", "mixed", "unspecified"].includes(
          requestedWorkMode
        )
        ? requestedWorkMode
        : nextRemoteActive
        ? "remote"
        : "unspecified"
      : cleanText(current.workMode, 40).toLowerCase() || "unspecified";
    const desiredWorkflowStage = protectedAssignees.length
      ? "active"
      : nextRemoteActive
      ? "remote"
      : "unassigned";
    const workflowUpdate = ["service_complete", "done"].includes(
      currentWorkflowStage
    )
      ? {}
      : buildWorkflowTransitionUpdate(current, desiredWorkflowStage, {
          changedBy: triggerSender || "Magmo AI",
          source: "remote_inference",
          reason:
            cleanText(remoteWorkReason, 500) ||
            (nextRemoteActive
              ? "Slack indicates active remote work."
              : "No active remote work is currently established."),
          nowIso,
        });

    transaction.set(
      ref,
      {
        assignees: assignmentChanged ? nextAssignees : protectedPrevious,
        assignmentSummary: assignmentChanged
          ? "Currently assigned to " +
            nextAssignees.map((entry) => entry.name).join(", ") +
            "."
          : cleanText(summary, 700),
        assignmentDecisionReason: decisionReason,
        assignmentConfidence: Number(confidence || 0),
        priorityContext: cleanText(
          priorityContext || current.priorityContext,
          900
        ),
        remoteWorkActive: nextRemoteActive,
        remoteWorkReason: cleanText(
          remoteWorkReason || current.remoteWorkReason,
          700
        ),
        remoteWorkConfidence: remoteConfidence,
        remoteInferenceVersion: 1,
        workMode: nextWorkMode,
        ...workflowUpdate,
        ...(assignmentChanged
          ? {
              assignmentHistory: assignmentHistory.slice(-MAX_ASSIGNMENT_HISTORY),
              assignmentUpdatedAt: FieldValue.serverTimestamp(),
            }
          : {}),
        ...(categoryChanged
          ? {
              priorityTier: requestedTier,
              priorityLabel: normalizePriorityLabel(requestedTier, priorityLabel),
              priorityGenerated:
                Boolean(priorityGenerated) || isGeneratedPriorityTier(requestedTier),
              priorityOrder: normalizePriorityOrder(requestedTier, priorityOrder),
              priorityReason: categoryReason,
              priorityConfidence: categoryConfidence,
              prioritySource: "ai",
              priorityHistory: priorityHistory.slice(-MAX_PRIORITY_HISTORY),
              priorityUpdatedAt: FieldValue.serverTimestamp(),
              priorityRank: Date.now(),
            }
          : {}),
        analysisInputTokens: FieldValue.increment(Number(usage?.inputTokens || 0)),
        analysisOutputTokens: FieldValue.increment(Number(usage?.outputTokens || 0)),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    transaction.set(
      msgRef,
      {
        analysisStatus: "completed",
        analysisChangedAssignment: assignmentChanged,
        analysisReason: decisionReason,
        analysisConfidence: Number(confidence || 0),
        analysisChangedPriority: categoryChanged,
        analysisPriorityTier: categoryChanged ? requestedTier : previousTier,
        analysisPriorityReason: categoryReason,
        analysisPriorityConfidence: categoryConfidence,
        analysisChangedRemoteWork: remoteChangeAccepted,
        analysisRemoteWorkActive: nextRemoteActive,
        analysisRemoteWorkReason: cleanText(remoteWorkReason, 700),
        analysisRemoteWorkConfidence: remoteConfidence,
        analysisMemoryIds: memoryIds.slice(0, 5),
        analyzedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return {
      changed: assignmentChanged,
      priorityChanged: categoryChanged,
      remoteChanged: remoteChangeAccepted,
      remoteWorkActive: nextRemoteActive,
    };
  });
}
export async function markOpsMessageAnalysisFailed(workOrderId, rawMessageId, error) {
  await workOrderRef(workOrderId)
    .collection(MESSAGE_SUBCOLLECTION)
    .doc(messageId(rawMessageId))
    .set(
      {
        analysisStatus: "error",
        analysisError: cleanText(error?.message || error, 600),
        analysisFailedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
}

async function deleteMessageLog(ref) {
  let deleted = 0;
  while (true) {
    const snapshot = await ref.collection(MESSAGE_SUBCOLLECTION).limit(400).get();
    if (snapshot.empty) break;
    const batch = requireDb().batch();
    snapshot.docs.forEach((document) => batch.delete(document.ref));
    await batch.commit();
    deleted += snapshot.size;
  }
  return deleted;
}

export async function completeOpsWorkOrder(workOrderId, completedBy = "Slack !done") {
  const ref = workOrderRef(workOrderId);
  const alreadyCompleted = await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    if (
      cleanText(current.status, 40).toLowerCase() === "completed" ||
      normalizeWorkflowStage(
        current,
        normalizeAssignmentHistory(current.assignmentHistory)
      ) === "done"
    ) {
      return true;
    }
    const workflowUpdate = buildWorkflowTransitionUpdate(current, "done", {
      changedBy: completedBy,
      source: "done",
      reason: "The work order was closed with !done.",
    });
    transaction.set(
      ref,
      {
        ...workflowUpdate,
        status: "completed",
        completedBy: cleanText(completedBy, 180),
        ...(timestampToIso(current.completedAt)
          ? {}
          : { completedAt: FieldValue.serverTimestamp() }),
        trackingStoppedAt: FieldValue.serverTimestamp(),
        assignmentSummary: "Done — final summary saved.",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return false;
  });
  if (alreadyCompleted) {
    return { deletedMessages: 0, idempotentReplay: true };
  }
  const deletedMessages = await deleteMessageLog(ref);
  await ref.set(
    {
      messageCount: 0,
      chatLogDeletedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return { deletedMessages, idempotentReplay: false };
}

export async function serviceCompleteOpsWorkOrder(
  workOrderId,
  completedBy = "Slack !complete"
) {
  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    if (currentStage === "done") return;
    const workflowUpdate = buildWorkflowTransitionUpdate(
      current,
      "service_complete",
      {
        changedBy: completedBy,
        source: "service_complete",
        reason: "Field service was marked complete with !complete.",
      }
    );
    transaction.set(
      ref,
      {
        ...workflowUpdate,
        status: "active",
        serviceCompletedBy: cleanText(completedBy, 180),
        ...(timestampToIso(current.serviceCompletedAt)
          ? {}
          : { serviceCompletedAt: FieldValue.serverTimestamp() }),
        assignmentSummary:
          "Service complete — awaiting final reporting and closeout.",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return serializeWorkOrder(await ref.get());
}

export async function resetOpsAssignmentAnalysis(workOrderId) {
  const ref = workOrderRef(workOrderId);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    throw new Error(`Ops work order ${workOrderId} does not exist.`);
  }
  const current = snapshot.data() || {};
  const protectedAssignees = normalizeAssignees(current.bluefolderAssignees);
  const initialAssignees = mergeAssignees(protectedAssignees, [INITIAL_OWNER]);
  const createdAtIso =
    timestampToIso(current.createdAt) || current.createdAtIso || new Date().toISOString();
  const deletedMessages = await deleteMessageLog(ref);
  const nextStage = protectedAssignees.length ? "active" : "unassigned";
  const workflowUpdate = buildWorkflowTransitionUpdate(current, nextStage, {
    changedBy: "Magmo reset",
    source: "reset",
    reason: "Assignment analysis was reset.",
  });
  await ref.set(
    {
      assignees: initialAssignees,
      assignmentSummary:
        "Currently assigned to " +
        initialAssignees.map((entry) => entry.name).join(", ") +
        ".",
      assignmentDecisionReason: protectedAssignees.length
        ? "BlueFolder engineers remain protected; Slack helper analysis was reset."
        : "New work orders start with Yao until responsibility changes in Slack.",
      assignmentConfidence: 1,
      assignmentHistory: [initialAssignmentEntry(initialAssignees, createdAtIso)],
      workflowStatus: nextStage,
      ...workflowUpdate,
      remoteWorkActive: false,
      remoteWorkReason: "",
      remoteWorkConfidence: 0,
      remoteInferenceVersion: 0,
      workMode: "unspecified",
      assignmentUpdatedAt: FieldValue.delete(),
      messageCount: 0,
      analysisInputTokens: 0,
      analysisOutputTokens: 0,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return { deletedMessages };
}

export async function getOpsUpdateContext(
  workOrderId,
  { fullConversation = false } = {}
) {
  const ref = workOrderRef(workOrderId);
  const [snapshot, messageSnapshot] = await Promise.all([
    ref.get(),
    ref.collection(MESSAGE_SUBCOLLECTION).limit(500).get(),
  ]);
  if (!snapshot.exists) {
    throw new Error("Ops work order " + workOrderId + " does not exist.");
  }
  const data = snapshot.data() || {};
  const workOrder = serializeWorkOrder(snapshot);
  const updates = normalizeOpsUpdates(data.opsUpdateHistory);
  const previousUpdate =
    !fullConversation && updates.length ? updates[updates.length - 1] : null;
  const previousSlackTs = cleanText(
    previousUpdate?.throughSlackTs || data.summaryLastSlackTs,
    180
  );
  const messages = messageSnapshot.docs
    .map((document) => {
      const message = document.data() || {};
      return {
        id: document.id,
        slackTs: cleanText(message.slackTs, 180),
        sender:
          normalizeAssignees([message.sender])[0] || { id: "", name: "Unknown" },
        text: cleanText(message.text, 6000),
      };
    })
    .filter((message) => message.slackTs && message.text)
    .sort((left, right) => Number(left.slackTs) - Number(right.slackTs));
  const newMessages = previousSlackTs
    ? messages.filter((message) => Number(message.slackTs) > Number(previousSlackTs))
    : messages;
  return {
    workOrder,
    previousUpdate,
    messages: fullConversation ? messages : newMessages,
    allMessages: messages,
    sourceMessageCount: messages.length,
    throughSlackTs: messages.length
      ? messages[messages.length - 1].slackTs
      : previousSlackTs,
    hasNewMessages: newMessages.length > 0,
  };
}

export async function saveOpsWorkOrderUpdate({
  workOrderId,
  update,
  throughSlackTs,
  sourceMessageCount,
  usage,
  replaceHistory = false,
  recoveredFromSlack = false,
  finalSummary = false,
}) {
  const ref = workOrderRef(workOrderId);
  const generatedAtIso = new Date().toISOString();
  return requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error("Ops work order " + workOrderId + " does not exist.");
    }
    const current = snapshot.data() || {};
    const targetCursor = cleanText(throughSlackTs, 180);
    const history = replaceHistory
      ? []
      : normalizeOpsUpdates(current.opsUpdateHistory).filter(
          (existing) =>
            !targetCursor ||
            cleanText(existing.throughSlackTs, 180) !== targetCursor
        );
    const entry = normalizeOpsUpdates([
      {
        id: "update-" + Date.now(),
        ...update,
        generatedAtIso,
        throughSlackTs,
        sourceMessageCount,
        recoveredFromSlack,
        finalSummary,
      },
    ])[0];
    history.push(entry);
    transaction.set(
      ref,
      {
        opsUpdateLatest: entry,
        opsUpdateHistory: history.slice(-MAX_UPDATE_HISTORY),
        summaryLastSlackTs: cleanText(throughSlackTs, 180),
        summaryInputTokens: FieldValue.increment(
          Number(usage?.inputTokens || 0)
        ),
        summaryOutputTokens: FieldValue.increment(
          Number(usage?.outputTokens || 0)
        ),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return entry;
  });
}

function normalizeCommandReport(report = {}, reportType = "parts") {
  const normalizedType = ["service_complete", "final", "parts"].includes(
    cleanText(reportType, 40)
  )
    ? cleanText(reportType, 40)
    : "parts";
  const partState = cleanText(report?.partsState, 40).toLowerCase();
  return {
    slackReport: cleanText(report?.slackReport, 3000),
    opsHeadline: cleanText(report?.opsHeadline, 220),
    opsStatusLine: cleanText(report?.opsStatusLine, 300),
    opsSummary: cleanText(report?.opsSummary, 900),
    partSummary: cleanText(report?.partSummary, 700),
    partsState: ["none", "open", "returned", "unknown"].includes(partState)
      ? partState
      : "unknown",
    partMovements: (Array.isArray(report?.partMovements)
      ? report.partMovements
      : []
    )
      .map((movement) => ({
        partName: cleanText(movement?.partName, 180),
        movement: cleanText(movement?.movement || "unknown", 40),
        status: cleanText(movement?.status, 180),
      }))
      .filter((movement) => movement.partName)
      .slice(0, 8),
    partsOutstanding: (Array.isArray(report?.partsOutstanding)
      ? report.partsOutstanding
      : []
    )
      .map((item) => cleanText(item, 180))
      .filter(Boolean)
      .slice(0, 8),
    companyLessons: Array.isArray(report?.companyLessons)
      ? report.companyLessons.slice(0, 3)
      : [],
    usage: {
      inputTokens: Math.max(0, Number(report?.usage?.inputTokens || 0)),
      outputTokens: Math.max(0, Number(report?.usage?.outputTokens || 0)),
    },
    reportType: normalizedType,
  };
}

function commandPartSummary(report, reportType) {
  if (report.partSummary) return report.partSummary;
  if (reportType === "service_complete") {
    return "Service is complete; parts return remains pending before final closeout.";
  }
  if (reportType === "final") {
    return "Parts return obligations were complete or not applicable when !done was issued.";
  }
  return "No part movements were identified in this thread.";
}

export async function getOpsCommandContext(workOrderId) {
  const snapshot = await workOrderRef(workOrderId).get();
  if (!snapshot.exists) {
    throw new Error("Ops work order " + workOrderId + " does not exist.");
  }
  const workOrder = serializeWorkOrder(snapshot);
  const latestUpdate = workOrder.opsUpdates[workOrder.opsUpdates.length - 1];
  const latestParts =
    workOrder.partMovements[workOrder.partMovements.length - 1];
  return {
    number: workOrder.number,
    subject: workOrder.subject,
    customer: workOrder.customer,
    description: workOrder.description,
    workflowStatus: workOrder.workflowStatus,
    priorityTier: workOrder.priorityTier,
    priorityLabel: workOrder.priorityLabel,
    priorityContext: workOrder.priorityContext,
    priorityReason: workOrder.priorityReason,
    assigneeNames: workOrder.assignees
      .map((entry) => cleanText(entry?.name, 100))
      .filter(Boolean)
      .slice(0, 12),
    latestOpsSummary: cleanText(latestUpdate?.summary, 900),
    latestPartsSummary: cleanText(latestParts?.summary, 700),
  };
}

export async function saveOpsCommandReport({
  workOrderId,
  commandTs,
  reportType,
  report,
  sourceMessageCount = 0,
  completedBy = "",
}) {
  const normalizedType = cleanText(reportType, 40);
  if (!["service_complete", "final", "parts"].includes(normalizedType)) {
    throw new Error("Unsupported Ops command report type.");
  }
  const normalizedReport = normalizeCommandReport(report, normalizedType);
  if (
    ["service_complete", "final"].includes(normalizedType) &&
    !normalizedReport.opsSummary
  ) {
    throw new Error("The Ops command summary was empty.");
  }
  const cleanCommandTs =
    cleanText(commandTs, 80) || String(Date.now() / 1000);
  const generatedAtIso = new Date().toISOString();
  const messageCount = Math.max(0, Number(sourceMessageCount || 0));
  const ref = workOrderRef(workOrderId);

  const result = await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error("Ops work order " + workOrderId + " does not exist.");
    }
    const current = snapshot.data() || {};
    const safeTs = cleanCommandTs.replace(/[^0-9A-Za-z_-]/g, "-");
    const partEntry = {
      id: "parts-" + safeTs,
      summary: commandPartSummary(normalizedReport, normalizedType),
      state: normalizedReport.partsState,
      movements: normalizedReport.partMovements,
      outstanding: normalizedReport.partsOutstanding,
      reportType: normalizedType,
      generatedAtIso,
      throughSlackTs: cleanCommandTs,
      sourceMessageCount: messageCount,
    };
    const currentPartHistory = normalizePartMovements(
      current.partMovementsHistory,
      current.partMovementsLatest
    );
    const existingPartEntry = currentPartHistory.find(
      (entry) => entry.id === partEntry.id
    );
    const existingReportEntry = normalizeOpsUpdates(current.opsUpdateHistory).find(
      (entry) => entry.id === normalizedType + "-" + safeTs
    );
    if (
      existingPartEntry &&
      (normalizedType === "parts" || existingReportEntry)
    ) {
      return {
        workOrder: serializeWorkOrder(snapshot),
        reportEntry: existingReportEntry || null,
        partEntry: existingPartEntry,
        idempotentReplay: true,
      };
    }
    const partHistory = currentPartHistory.filter(
      (entry) => entry.id !== partEntry.id
    );
    partHistory.push(partEntry);

    const update = {
      partMovementsLatest: partEntry,
      partMovementsHistory: partHistory.slice(-MAX_PART_MOVEMENT_HISTORY),
      partsReturnStatus: partEntry.state,
      partMovementsUpdatedAt: FieldValue.serverTimestamp(),
      lastActivityAt: FieldValue.serverTimestamp(),
      lastActivityAtIso: generatedAtIso,
      updatedAt: FieldValue.serverTimestamp(),
    };

    let reportEntry = null;
    if (normalizedType !== "parts") {
      reportEntry = {
        id: normalizedType + "-" + safeTs,
        headline:
          normalizedReport.opsHeadline ||
          (normalizedType === "final"
            ? "Final work order summary"
            : "Service complete"),
        statusLine:
          normalizedReport.opsStatusLine ||
          (normalizedType === "final"
            ? "Done"
            : "Service complete — parts return pending"),
        summary: normalizedReport.opsSummary,
        reportType: normalizedType,
        generatedAtIso,
        throughSlackTs: cleanCommandTs,
        sourceMessageCount: Math.max(1, messageCount),
        recoveredFromSlack: false,
        finalSummary: normalizedType === "final",
      };
      const reportHistory = normalizeOpsUpdates(
        current.opsUpdateHistory
      ).filter((entry) => entry.id !== reportEntry.id);
      reportHistory.push(reportEntry);
      Object.assign(update, {
        opsUpdateLatest: reportEntry,
        opsUpdateHistory: reportHistory.slice(-MAX_UPDATE_HISTORY),
        summaryLastSlackTs: cleanCommandTs,
      });
    }

    const tokenPrefix =
      normalizedType === "parts"
        ? "partsReport"
        : normalizedType === "final"
        ? "doneReport"
        : "serviceReport";
    update[tokenPrefix + "InputTokens"] = FieldValue.increment(
      normalizedReport.usage.inputTokens
    );
    update[tokenPrefix + "OutputTokens"] = FieldValue.increment(
      normalizedReport.usage.outputTokens
    );
    transaction.set(ref, update, { merge: true });
    return {
      workOrder: serializeWorkOrder(snapshot),
      reportEntry,
      partEntry,
      idempotentReplay: false,
    };
  });

  let memoryIds = [];
  if (
    !result.idempotentReplay &&
    normalizedType === "final" &&
    normalizedReport.companyLessons.length
  ) {
    memoryIds = await saveOpsCompanyLessons({
      workOrder: result.workOrder,
      lessons: normalizedReport.companyLessons,
      source: "completion",
      sourceId: "completion-" + result.workOrder.number,
      approvedBy: cleanText(completedBy || "Slack !done", 180),
    });
  }
  return {
    reportSaved: Boolean(result.reportEntry),
    partMovementsSaved: true,
    movementCount: result.partEntry.movements.length,
    memoryIds,
    idempotentReplay: result.idempotentReplay,
  };
}

export function listOpsAssigneeOptions() {
  return Array.from(SLACK_IDENTITIES.byId.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function updateOpsAssignees(
  workOrderId,
  assigneeIds = [],
  changedBy = "Magmo user"
) {
  const selectedIds = Array.from(
    new Set((Array.isArray(assigneeIds) ? assigneeIds : []).map(normalizeId))
  ).filter((id) => SLACK_IDENTITIES.byId.has(id));
  const selectedAssignees = normalizeAssignees(
    selectedIds.map((id) => ({ id, name: SLACK_IDENTITIES.byId.get(id) }))
  );
  const requestedAssignees = selectedAssignees.length
    ? selectedAssignees
    : [INITIAL_OWNER];
  const ref = workOrderRef(workOrderId);
  const changed = await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error("Ops work order " + workOrderId + " does not exist.");
    }
    const current = snapshot.data() || {};
    const protectedAssignees = normalizeAssignees(current.bluefolderAssignees);
    const nextAssignees = mergeAssignees(
      protectedAssignees,
      requestedAssignees
    );
    const previousAssignees = normalizeAssignees(current.assignees);
    if (assigneesMatch(previousAssignees, nextAssignees)) return false;
    const conversationAssignees = withoutAssignees(
      nextAssignees,
      protectedAssignees
    );
    const isInitialOwnerOnly =
      conversationAssignees.length === 1 &&
      conversationAssignees[0].id === INITIAL_OWNER.id;
    const changedAtIso = new Date().toISOString();
    const ownerNames = nextAssignees.map((entry) => entry.name).join(", ");
    const reason =
      "Assignment updated manually in Magmo by " +
      cleanText(changedBy, 180) +
      (protectedAssignees.length
        ? "; BlueFolder engineers remained assigned."
        : ".");
    const history = normalizeAssignmentHistory(current.assignmentHistory);
    history.push({
      id: "manual-" + Date.now(),
      source: "manual",
      previousAssignees,
      assignees: nextAssignees,
      reason,
      triggerMessage: "",
      triggerSender: cleanText(changedBy, 100),
      triggerSlackTs: "",
      confidence: 1,
      changedAtIso,
    });
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    const requestedStage = protectedAssignees.length
      ? "active"
      : Boolean(current.remoteWorkActive)
      ? "remote"
      : "unassigned";
    const nextStage = ["service_complete", "done"].includes(currentStage)
      ? currentStage
      : requestedStage;
    const workflowUpdate = buildWorkflowTransitionUpdate(current, nextStage, {
      changedBy,
      source: "manual_assignment",
      reason,
      nowIso: changedAtIso,
    });
    transaction.set(
      ref,
      {
        assignees: nextAssignees,
        assignmentSummary: isInitialOwnerOnly
          ? "Reset to Yao and awaiting active assignment."
          : "Manually assigned to " + ownerNames + ".",
        assignmentDecisionReason: reason,
        assignmentConfidence: 1,
        assignmentHistory: history.slice(-MAX_ASSIGNMENT_HISTORY),
        assignmentUpdatedAt: FieldValue.serverTimestamp(),
        workflowStatus: nextStage,
        ...workflowUpdate,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  });
  const workOrder = serializeWorkOrder(await ref.get());
  if (changed) {
    const ownerNames = workOrder.assignees.map((entry) => entry.name);
    await saveManualOpsMemory({
      workOrder,
      kind: "manual_assignment_example",
      summary:
        "For a similar work order, an Ops admin confirmed the dispatch owners as " +
        ownerNames.join(", ") +
        ".",
      assigneeNames: ownerNames,
      changedBy,
      sourceId: `manual-assignment-${workOrder.id}-${Date.now()}`,
    }).catch((error) => {
      console.warn("[Ops][memory][manual-assignment]", error?.message);
    });
  }
  return workOrder;
}

export async function reorderOpsWorkOrders(
  orderedIds = [],
  tierById = {},
  changedBy = "Magmo admin"
) {
  const ids = Array.from(new Set(orderedIds.map(normalizeId).filter(Boolean)));
  if (!ids.length || ids.length > 500) {
    throw new Error("A valid ordered work-order list is required.");
  }
  const refs = ids.map(workOrderRef);
  const snapshots = await requireDb().getAll(...refs);
  const batch = requireDb().batch();
  const memoryExamples = [];
  const categoryMetaByTier = new Map();
  snapshots.forEach((snapshot) => {
    if (!snapshot.exists) return;
    const data = snapshot.data() || {};
    const priorityTier = normalizePriorityTier(data.priorityTier);
    if (!categoryMetaByTier.has(priorityTier)) {
      categoryMetaByTier.set(priorityTier, {
        label: normalizePriorityLabel(priorityTier, data.priorityLabel),
        order: normalizePriorityOrder(priorityTier, data.priorityOrder),
      });
    }
  });
  snapshots.forEach((snapshot, index) => {
    if (!snapshot.exists) return;
    const data = snapshot.data() || {};
    const status = String(data.status || "").toLowerCase();
    if (!ACTIVE_STATUSES.has(status)) return;
    const previousTier = normalizePriorityTier(data.priorityTier);
    const nextTier = normalizePriorityTier(tierById[snapshot.id] || data.priorityTier);
    const nextTierMeta = categoryMetaByTier.get(nextTier);
    const nextTierLabel = normalizePriorityLabel(
      nextTier,
      nextTierMeta?.label || data.priorityLabel
    );
    const nextTierOrder = normalizePriorityOrder(
      nextTier,
      nextTierMeta?.order ?? data.priorityOrder
    );
    const tierChanged = previousTier !== nextTier;
    const update = {
      priorityTier: nextTier,
      priorityLabel: nextTierLabel,
      priorityGenerated: isGeneratedPriorityTier(nextTier),
      priorityOrder: nextTierOrder,
      priorityRank: (index + 1) * 1000,
      priorityUpdatedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (tierChanged) {
      const reason =
        "Operational category changed manually in Magmo by " +
        cleanText(changedBy, 180) +
        ".";
      const history = normalizePriorityHistory(data.priorityHistory);
      history.push({
        id: "manual-tier-" + Date.now() + "-" + index,
        source: "manual",
        previousTier,
        priorityTier: nextTier,
        priorityLabel: nextTierLabel,
        priorityGenerated: isGeneratedPriorityTier(nextTier),
        reason,
        triggerMessage: "",
        triggerSender: cleanText(changedBy, 100),
        triggerSlackTs: "",
        confidence: 1,
        memoryIds: [],
        changedAtIso: new Date().toISOString(),
      });
      Object.assign(update, {
        priorityReason: reason,
        priorityConfidence: 1,
        prioritySource: "manual",
        priorityHistory: history.slice(-MAX_PRIORITY_HISTORY),
        priorityManualOverrideAt: FieldValue.serverTimestamp(),
        priorityInferenceVersion: 1,
      });
      memoryExamples.push({
        workOrder: {
          ...serializeWorkOrder(snapshot),
          priorityTier: nextTier,
        },
        kind: "manual_priority_example",
        summary:
          "For a similar work order, an Ops admin confirmed the operational category as " +
          nextTier.replace(/_/g, " ") +
          ".",
        priorityTier: nextTier,
        changedBy,
        sourceId: `manual-priority-${snapshot.id}-${Date.now()}-${index}`,
      });
    }
    batch.set(snapshot.ref, update, { merge: true });
  });
  await batch.commit();
  await Promise.all(
    memoryExamples.map((example) =>
      saveManualOpsMemory(example).catch((error) => {
        console.warn("[Ops][memory][manual-priority]", error?.message);
      })
    )
  );
  return ids;
}

function feedbackFallbackTier(rejectedTier) {
  if (rejectedTier === "hard_down") return "in_progress";
  if (rejectedTier === "in_progress") return "needs_scheduled";
  if (rejectedTier === "needs_scheduled") return "anytime";
  return "needs_scheduled";
}

export async function submitOpsCategoryFeedback({
  workOrderId,
  vote,
  changedBy = "Magmo admin",
}) {
  const normalizedVote = cleanText(vote, 20).toLowerCase();
  if (!new Set(["up", "down"]).has(normalizedVote)) {
    throw new Error("Category feedback must be thumbs up or thumbs down.");
  }
  const primaryRef = workOrderRef(workOrderId);
  const primarySnapshot = await primaryRef.get();
  if (!primarySnapshot.exists) {
    throw new Error(`Ops work order ${workOrderId} does not exist.`);
  }
  const primary = primarySnapshot.data() || {};
  const rejectedTier = normalizePriorityTier(primary.priorityTier);
  const rejectedLabel = normalizePriorityLabel(
    rejectedTier,
    primary.priorityLabel
  );
  const generated =
    Boolean(primary.priorityGenerated) || isGeneratedPriorityTier(rejectedTier);
  const feedbackRecord = {
    vote: normalizedVote,
    category: rejectedTier,
    categoryLabel: rejectedLabel,
    changedBy: cleanText(changedBy, 180),
    createdAt: FieldValue.serverTimestamp(),
  };

  if (normalizedVote === "up") {
    await primaryRef.set(
      {
        priorityFeedback: feedbackRecord,
        priorityFeedbackHistory: [
          ...(Array.isArray(primary.priorityFeedbackHistory)
            ? primary.priorityFeedbackHistory
            : []),
          {
            ...feedbackRecord,
            createdAtIso: new Date().toISOString(),
            createdAt: null,
          },
        ].slice(-50),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    const workOrder = serializeWorkOrder(await primaryRef.get());
    await saveManualOpsMemory({
      workOrder,
      kind: "manual_priority_example",
      summary:
        `An Ops admin confirmed ${rejectedLabel} as the correct category for this situation.`,
      priorityTier: rejectedTier,
      polarity: "positive",
      changedBy,
      sourceId: `category-up-${workOrder.id}-${Date.now()}`,
    }).catch((error) => {
      console.warn("[Ops][memory][category-up]", error?.message);
    });
    return { vote: normalizedVote, affectedIds: [workOrder.id], workOrders: [workOrder] };
  }

  const affectedSnapshot = generated
    ? await requireDb()
        .collection(OPS_WORK_ORDER_COLLECTION)
        .where("priorityTier", "==", rejectedTier)
        .limit(500)
        .get()
    : { docs: [primarySnapshot] };
  const activeDocuments = affectedSnapshot.docs.filter((snapshot) =>
    ACTIVE_STATUSES.has(String(snapshot.data()?.status || "").toLowerCase())
  );
  const batch = requireDb().batch();
  const fallbackTier = feedbackFallbackTier(rejectedTier);
  const affectedIds = [];
  activeDocuments.forEach((snapshot, index) => {
    const data = snapshot.data() || {};
    const previousTier = normalizePriorityTier(data.priorityTier);
    const history = normalizePriorityHistory(data.priorityHistory);
    const reason =
      `${rejectedLabel} was rejected by ${cleanText(changedBy, 180)}. ` +
      "The work order was moved temporarily and queued for AI reclassification.";
    history.push({
      id: `category-down-${Date.now()}-${index}`,
      source: "feedback",
      previousTier,
      priorityTier: fallbackTier,
      priorityLabel: normalizePriorityLabel(fallbackTier),
      priorityGenerated: false,
      reason,
      triggerMessage: "",
      triggerSender: cleanText(changedBy, 100),
      triggerSlackTs: "",
      confidence: 1,
      memoryIds: [],
      changedAtIso: new Date().toISOString(),
    });
    const feedbackHistory = [
      ...(Array.isArray(data.priorityFeedbackHistory)
        ? data.priorityFeedbackHistory
        : []),
      {
        vote: "down",
        category: rejectedTier,
        categoryLabel: rejectedLabel,
        changedBy: cleanText(changedBy, 180),
        createdAtIso: new Date().toISOString(),
      },
    ].slice(-50);
    affectedIds.push(snapshot.id);
    batch.set(
      snapshot.ref,
      {
        priorityTier: fallbackTier,
        priorityLabel: normalizePriorityLabel(fallbackTier),
        priorityGenerated: false,
        priorityOrder: normalizePriorityOrder(fallbackTier),
        priorityReason: reason,
        prioritySource: "feedback_pending",
        priorityHistory: history.slice(-MAX_PRIORITY_HISTORY),
        priorityFeedback: feedbackRecord,
        priorityFeedbackHistory: feedbackHistory,
        priorityReclassificationRequested: true,
        priorityReclassificationRequestedAt: FieldValue.serverTimestamp(),
        priorityReclassificationAttempts: 0,
        rejectedPriorityTiers: Array.from(
          new Set([
            ...(Array.isArray(data.rejectedPriorityTiers)
              ? data.rejectedPriorityTiers.map(normalizePriorityTier)
              : []),
            rejectedTier,
          ])
        ).slice(-12),
        priorityUpdatedAt: FieldValue.serverTimestamp(),
        priorityRank: Date.now() + index,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  await batch.commit();
  const workOrder = serializeWorkOrder(primarySnapshot);
  await saveManualOpsMemory({
    workOrder: { ...workOrder, priorityTier: rejectedTier, priorityLabel: rejectedLabel },
    kind: "manual_priority_example",
    summary:
      `An Ops admin rejected ${rejectedLabel} for this operational situation.`,
    rejectedPriorityTier: rejectedTier,
    polarity: "negative",
    changedBy,
    sourceId: `category-down-${workOrder.id}-${Date.now()}`,
  }).catch((error) => {
    console.warn("[Ops][memory][category-down]", error?.message);
  });
  const refreshed = affectedIds.length
    ? await requireDb().getAll(...affectedIds.map(workOrderRef))
    : [];
  return {
    vote: normalizedVote,
    affectedIds,
    removedGeneratedCategory: generated ? rejectedTier : "",
    workOrders: refreshed.filter((snapshot) => snapshot.exists).map(serializeWorkOrder),
  };
}
