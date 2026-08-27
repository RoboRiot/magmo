import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
import { saveManualOpsMemory, saveOpsCompanyLessons } from "./companyMemory";
import { simplifyOpsPartName } from "./parts";
import commandResponsibilityContract from "./commandResponsibilityContract.cjs";
import dispatchEvidencePolicy from "./dispatchEvidencePolicy.cjs";
import calendarSessionEvidence from "./calendarSessionEvidence.cjs";
import senderIdentityContract from "./senderIdentity.cjs";
const {
  clientLocation,
  clientName,
  referenceId,
  trailerClientId,
  trailerMachineId,
  trailerName,
} = require("./trailerClientLinks.cjs");

const {
  commandResponsibilityId,
  normalizeTerminalResponsibility,
} = commandResponsibilityContract;
const {
  buildDispatchEvidenceResolutionPatch,
  evaluateDispatchEvidence,
} = dispatchEvidencePolicy;
const { hasImmediateDepartureStatement } = calendarSessionEvidence;
const { isClosedMessageIngestionBoundary } = require("./messageLifecycle.cjs");
const { resolveSlackSenderIdentity, scalarText: identityScalarText } =
  senderIdentityContract;

export const OPS_WORK_ORDER_COLLECTION = "OpsWorkOrders";

const MESSAGE_SUBCOLLECTION = "messages";
const CALENDAR_SUBCOLLECTION = "calendarEvents";
const ACTIVE_STATUSES = new Set(["active", "open", "processing"]);
const MAX_ASSIGNMENT_HISTORY = 100;
const MAX_PARTICIPATION_HISTORY = 100;
const MAX_PRIORITY_HISTORY = 100;
const MAX_UPDATE_HISTORY = 30;
const MAX_PART_MOVEMENT_HISTORY = 20;
const MAX_WORKFLOW_STAGE_HISTORY = 100;
const MAX_INVENTORY_MOVEMENT_HISTORY = 120;
const MAX_ASSIGNMENT_DISPUTES = 50;
const WORKFLOW_STAGES = new Set([
  "unassigned",
  "active",
  "remote",
  "scheduled",
  "on_hold",
  "inactive",
  "service_complete",
  "done",
  "closed",
]);
const WORKFLOW_STAGE_LABELS = {
  unassigned: "Unassigned",
  active: "Active",
  remote: "Remote",
  scheduled: "Scheduled",
  on_hold: "On hold",
  inactive: "Inactive",
  service_complete: "Service complete",
  done: "Done",
  closed: "Closed",
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
  in_progress: "ASAP",
  needs_scheduled: "Soon",
  anytime: "Anytime",
};
const INITIAL_OWNER = { id: "U07F4G8NP2P", name: "Yao N" };
export const DEFAULT_OPS_OVERSIGHT_MANAGER = Object.freeze({
  id: String(
    process.env.OPS_DEFAULT_OVERSIGHT_SLACK_ID || "U07FH9NKCSD"
  ).trim(),
  name: String(
    process.env.OPS_DEFAULT_OVERSIGHT_NAME || "Igor Savchenko"
  ).trim(),
  email: String(
    process.env.OPS_DEFAULT_OVERSIGHT_EMAIL ||
      "isavchenko@advancedimagingparts.com"
  )
    .trim()
    .toLowerCase(),
});

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
    [DEFAULT_OPS_OVERSIGHT_MANAGER.id, DEFAULT_OPS_OVERSIGHT_MANAGER.name],
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
  if (stage === "completed" || stage === "complete") {
    return "done";
  }
  return WORKFLOW_STAGES.has(stage) ? stage : "";
}

function normalizeWorkflowStage(data = {}, assignmentHistory = []) {
  const stored = normalizeWorkflowStageValue(
    data.workflowStatus || data.workflowStage
  );
  const isActive = ACTIVE_STATUSES.has(String(data.status || "").toLowerCase());
  if (!isActive) return stored === "closed" ? "closed" : "done";
  if (
    [
      "scheduled",
      "on_hold",
      "inactive",
      "service_complete",
      "done",
      "closed",
    ].includes(stored)
  ) {
    return stored;
  }
  if (
    stored === "active" &&
    normalizeWorkflowStageValue(data.bluefolderWorkflowStatus) === "active"
  ) {
    return "active";
  }
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
    (stage === "closed" ? timestampToIso(data.closedAt) : "") ||
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
    const entryObject =
      entry && typeof entry === "object" && !Array.isArray(entry) ? entry : null;
    let name = identityScalarText(
      entryObject
        ? entryObject.name || entryObject.displayName || entryObject.display_name
        : entry,
      100
    );
    let id = identityScalarText(
      entryObject?.id || entryObject?.slackUserId || entryObject?.userId,
      80
    );
    const workMode = ["remote", "physical"].includes(
      cleanText(entry?.workMode || entry?.mode, 30).toLowerCase()
    )
      ? cleanText(entry?.workMode || entry?.mode, 30).toLowerCase()
      : "";
    const scheduledDate = /^\d{4}-\d{2}-\d{2}$/.test(
      cleanText(entry?.scheduledDate, 20)
    )
      ? cleanText(entry?.scheduledDate, 20)
      : "";
    const email = cleanText(entry?.email, 320).toLowerCase();
    const normalizedName = normalizeNameKey(name);
    const nameParts = normalizedName.split(/\s+/).filter(Boolean);
    const shortenedNameId =
      nameParts.length === 2 && nameParts[1].length <= 2
        ? SLACK_IDENTITIES.byAlias.get(nameParts[0])
        : "";
    const authoritativeSlackId = /^[UW][A-Z0-9]{6,}$/i.test(id)
      ? id.toUpperCase()
      : "";
    const canonicalId = authoritativeSlackId
      ? authoritativeSlackId
      : SLACK_IDENTITIES.byAlias.get(normalizedName) || shortenedNameId;
    if (canonicalId) {
      id = canonicalId;
      name = SLACK_IDENTITIES.byId.get(canonicalId) || name;
    }
    if (/^[UW][A-Z0-9]{6,}$/i.test(name) && !canonicalId) continue;
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
        assignees[index] = {
          id,
          name,
          ...(workMode ? { workMode } : {}),
          ...(scheduledDate ? { scheduledDate } : {}),
          ...(email ? { email } : {}),
        };
        seenIds.add(idKey);
      }
      continue;
    }
    if (idKey && seenIds.has(idKey)) continue;
    indexesByName.set(nameKey, assignees.length);
    if (idKey) seenIds.add(idKey);
    assignees.push({
      id,
      name,
      ...(workMode ? { workMode } : {}),
      ...(scheduledDate ? { scheduledDate } : {}),
      ...(email ? { email } : {}),
    });
  }
  return assignees.slice(0, 12);
}

function normalizeBlueFolderAssignments(value) {
  return (Array.isArray(value) ? value : [])
    .map((assignment) => ({
      assignmentId: cleanText(assignment?.assignmentId, 120),
      assignees: normalizeAssignees(assignment?.assignees),
      type: cleanText(assignment?.type, 60),
      startDate: cleanText(assignment?.startDate, 100),
      endDate: cleanText(assignment?.endDate, 100),
      allDayEvent: Boolean(assignment?.allDayEvent),
      isComplete: Boolean(assignment?.isComplete),
      assignmentComment: cleanText(assignment?.assignmentComment, 500),
      // This is useful diagnostic state from the listener. Ops-General
      // independently rechecks the dates before using the row as evidence.
      isCurrent: Boolean(assignment?.isCurrent),
    }))
    .filter((assignment) => assignment.assignees.length)
    .slice(0, 50);
}

export function defaultOpsOversightManagers(value) {
  const selected = normalizeAssignees(value);
  return selected.length
    ? selected.map((manager) =>
        manager.id === DEFAULT_OPS_OVERSIGHT_MANAGER.id
          ? {
              ...manager,
              email:
                manager.email || DEFAULT_OPS_OVERSIGHT_MANAGER.email,
            }
          : manager
      )
    : normalizeAssignees([DEFAULT_OPS_OVERSIGHT_MANAGER]);
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

function normalizeSupportModesReceived(...values) {
  const modes = new Set();
  const add = (value) => {
    if (Array.isArray(value)) {
      value.forEach(add);
      return;
    }
    const mode = cleanText(value, 40).toLowerCase();
    if (mode === "remote") modes.add("remote");
    if (["physical", "in_person", "in-person"].includes(mode)) {
      modes.add("in_person");
    }
    if (["mixed", "hybrid"].includes(mode)) {
      modes.add("remote");
      modes.add("in_person");
    }
  };
  values.forEach(add);
  return ["remote", "in_person"].filter((mode) => modes.has(mode));
}

function supportModeReceivedForWorkOrder(data, workMode, workflowStatus) {
  const reconciliationPhases = [
    data.responsibilityReconciliationLatest,
    ...(Array.isArray(data.responsibilityReconciliationHistory)
      ? data.responsibilityReconciliationHistory
      : []),
  ].flatMap((entry) =>
    Array.isArray(entry?.phases)
      ? entry.phases.map((phase) => phase?.workMode)
      : []
  );
  const modes = normalizeSupportModesReceived(
    data.supportModesReceived,
    reconciliationPhases,
    workMode,
    workflowStatus === "remote" ? "remote" : ""
  );
  if (modes.length > 1) return "hybrid";
  return modes[0] || "";
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

function normalizedUpdateText(entry = {}) {
  return [entry.headline, entry.statusLine, entry.summary]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function materiallyDifferentUpdate(left = {}, right = {}) {
  const leftText = normalizedUpdateText(left);
  const rightText = normalizedUpdateText(right);
  if (!leftText || !rightText) return leftText !== rightText;
  if (leftText === rightText) return false;
  const leftTokens = new Set(leftText.split(" ").filter((token) => token.length > 2));
  const rightTokens = new Set(rightText.split(" ").filter((token) => token.length > 2));
  if (!leftTokens.size || !rightTokens.size) return true;
  let overlap = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) overlap += 1;
  });
  const similarity = overlap / Math.max(leftTokens.size, rightTokens.size);
  return similarity < 0.82;
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

function normalizeInventoryMovements(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => {
      const direction = cleanText(entry?.direction, 30).toLowerCase();
      if (!['shipping', 'receiving'].includes(direction)) return null;
      const itemId = cleanText(entry?.itemId, 180);
      const partName = simplifyOpsPartName(entry?.partName || entry?.title) ||
        itemId ||
        'Inventory item';
      return {
        id: cleanText(entry?.id || `inventory-${index}`, 180),
        direction,
        itemId,
        partName,
        pnSn: cleanText(entry?.pnSn, 300),
        tracking: cleanText(entry?.tracking, 180),
        description: cleanText(entry?.description, 500),
        recordedBy: cleanText(entry?.recordedBy, 180),
        recordedAtIso:
          timestampToIso(entry?.recordedAt) ||
          cleanText(entry?.recordedAtIso, 80),
        itemUrl: cleanText(
          entry?.itemUrl ||
            (itemId ? `/NewSearch/item/${encodeURIComponent(itemId)}` : ''),
          600
        ),
        pairId: cleanText(entry?.pairId, 180),
        pairedMovementId: cleanText(entry?.pairedMovementId, 180),
        swapPairId: cleanText(entry?.swapPairId, 180),
        swappedMovementId: cleanText(entry?.swappedMovementId, 180),
        replacementForItemId: cleanText(entry?.replacementForItemId, 180),
        coreForItemId: cleanText(entry?.coreForItemId, 180),
        disposition: ["outbound", "returned", "used", "core", "unknown"].includes(
          cleanText(entry?.disposition, 30).toLowerCase()
        )
          ? cleanText(entry?.disposition, 30).toLowerCase()
          : direction === "receiving"
            ? "returned"
            : "outbound",
      };
    })
    .filter(Boolean)
    .slice(-MAX_INVENTORY_MOVEMENT_HISTORY);
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

function normalizeParticipationHistory(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => ({
      id: cleanText(entry?.id || `participation-${index}`, 180),
      source: cleanText(entry?.source || "ai", 40),
      previousParticipants: normalizeAssignees(entry?.previousParticipants),
      participants: normalizeAssignees(entry?.participants),
      reason: cleanText(entry?.reason, 700),
      triggerMessage: cleanText(entry?.triggerMessage, 1000),
      triggerSender: cleanText(entry?.triggerSender, 100),
      triggerSlackTs: cleanText(entry?.triggerSlackTs, 180),
      confidence: Number(entry?.confidence || 0),
      changedAtIso: cleanText(entry?.changedAtIso, 80),
    }))
    .slice(-MAX_PARTICIPATION_HISTORY);
}

function normalizeAssignmentDisputes(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => ({
      id: cleanText(entry?.id || `assignment-dispute-${index}`, 180),
      type: "assignment_dispute",
      status: ["pending", "approved", "denied", "blocked"].includes(
        cleanText(entry?.status, 40)
      )
        ? cleanText(entry.status, 40)
        : "pending",
      requester: {
        uid: cleanText(entry?.requester?.uid, 180),
        email: cleanText(entry?.requester?.email, 320).toLowerCase(),
        name: cleanText(entry?.requester?.name, 120),
        slackUserId: cleanText(entry?.requester?.slackUserId, 80),
      },
      reason: cleanText(entry?.reason, 1200),
      createdAtIso: cleanText(entry?.createdAtIso, 80),
      updatedAtIso: cleanText(entry?.updatedAtIso, 80),
      revision: Math.max(1, Number(entry?.revision || 1)),
      protectedByBlueFolder: Boolean(entry?.protectedByBlueFolder),
      applied: Boolean(entry?.applied),
      decision:
        entry?.decision && typeof entry.decision === "object"
          ? {
              approved: Boolean(entry.decision.approved),
              status: cleanText(entry.decision.status, 40),
              note: cleanText(entry.decision.note, 1200),
              byUid: cleanText(entry.decision.byUid, 180),
              byEmail: cleanText(entry.decision.byEmail, 320).toLowerCase(),
              byName: cleanText(entry.decision.byName, 120),
              decidedAtIso: cleanText(entry.decision.decidedAtIso, 80),
            }
          : null,
      decisionHistory: Array.isArray(entry?.decisionHistory)
        ? entry.decisionHistory.slice(-25)
        : [],
      slackDm:
        entry?.slackDm && typeof entry.slackDm === "object"
          ? {
              status: cleanText(entry.slackDm.status, 40),
              ts: cleanText(entry.slackDm.ts, 80),
              error: cleanText(entry.slackDm.error, 500),
              attemptedAtIso: cleanText(entry.slackDm.attemptedAtIso, 80),
            }
          : null,
    }))
    .filter((entry) => entry.id && entry.requester.uid)
    .slice(-MAX_ASSIGNMENT_DISPUTES);
}

function normalizeAssignmentExclusions(value) {
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => ({
      id: cleanText(entry?.id || `assignment-exclusion-${index}`, 180),
      uid: cleanText(entry?.uid, 180),
      email: cleanText(entry?.email, 320).toLowerCase(),
      slackUserId: cleanText(entry?.slackUserId, 80),
      name: cleanText(entry?.name, 120),
      reason: cleanText(entry?.reason, 1200),
      source: cleanText(entry?.source || "self_correction", 60),
      createdAtIso: cleanText(entry?.createdAtIso, 80),
    }))
    .filter((entry) => entry.id && (entry.slackUserId || entry.email))
    .slice(-50);
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

function peopleDetailsMatch(left, right) {
  const keys = (value) =>
    normalizeAssignees(value)
      .map((entry) =>
        [
          entry.id.toLowerCase() || normalizeNameKey(entry.name),
          entry.workMode || "",
          entry.scheduledDate || "",
        ].join("::")
      )
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
      ? "BlueFolder engineers are assigned to perform physical work; Slack can add confirmed remote or physical workers."
      : "No remote or physical worker has been assigned yet.",
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
  const assignmentExclusions = normalizeAssignmentExclusions(
    data.assignmentExclusions
  );
  const assignees = normalizeAssignees(data.assignees).filter(
    (person) =>
      !assignmentExclusions.some((exclusion) =>
        opsPersonMatchesIdentity(person, exclusion)
      )
  );
  const assignmentHistory = normalizeAssignmentHistory(data.assignmentHistory);
  const participants = withoutAssignees(
    normalizeAssignees(data.participants),
    assignees
  );
  const participationHistory = normalizeParticipationHistory(
    data.participationHistory
  );
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
  const inventoryMovements = normalizeInventoryMovements(
    data.inventoryMovementsHistory
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
  const supportModesReceived = normalizeSupportModesReceived(
    data.supportModesReceived,
    workMode
  );
  const supportModeReceived = supportModeReceivedForWorkOrder(
    data,
    workMode,
    workflowStatus
  );
  const configuredOversightManagers = normalizeAssignees(
    data.oversightManagers
  );
  const oversightManagers = defaultOpsOversightManagers(
    configuredOversightManagers
  );
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
    bluefolderStatus: cleanText(data.bluefolderStatus, 120),
    bluefolderBillingStatus: cleanText(data.bluefolderBillingStatus, 120),
    bluefolderDateTimeClosed: cleanText(data.bluefolderDateTimeClosed, 80),
    bluefolderWorkflowStatus: normalizeWorkflowStageValue(
      data.bluefolderWorkflowStatus
    ),
    slackPermalink: cleanText(data.slackPermalink, 1200),
    slackChannel: cleanText(data.slackChannel, 120),
    slackThreadTs: cleanText(data.slackThreadTs, 120),
    dispatchStatus: cleanText(data.dispatchStatus, 40),
    dispatchedAt: timestampToIso(data.dispatchedAt),
    dispatchedBy: cleanText(data.dispatchedBy, 180),
    dispatchReceipt:
      data.dispatchReceipt && typeof data.dispatchReceipt === "object"
        ? {
            workOrderId: cleanText(data.dispatchReceipt.workOrderId, 180),
            dispatchStatus: cleanText(
              data.dispatchReceipt.dispatchStatus,
              40
            ),
            slackChannel: cleanText(data.dispatchReceipt.slackChannel, 120),
            slackThreadTs: cleanText(data.dispatchReceipt.slackThreadTs, 120),
            slackPermalink: cleanText(
              data.dispatchReceipt.slackPermalink,
              1200
            ),
            dispatchedAt: timestampToIso(data.dispatchReceipt.dispatchedAt),
            dispatchedBy: cleanText(data.dispatchReceipt.dispatchedBy, 180),
          }
        : null,
    slackEvidencePolicy: cleanText(data.slackEvidencePolicy, 80),
    slackEvidenceEligible:
      data.slackEvidenceEligible === false
        ? false
        : data.slackEvidenceEligible === true
          ? true
          : null,
    dispatchConversationReview:
      data.dispatchConversationReview &&
      typeof data.dispatchConversationReview === "object"
        ? {
            status: cleanText(data.dispatchConversationReview.status, 80),
            reasonCode: cleanText(
              data.dispatchConversationReview.reasonCode,
              120
            ),
            reviewed: Boolean(data.dispatchConversationReview.reviewed),
            workOrderId: cleanText(
              data.dispatchConversationReview.workOrderId,
              180
            ),
            auditReport: cleanText(
              data.dispatchConversationReview.auditReport,
              500
            ),
            auditedAtIso: cleanText(
              data.dispatchConversationReview.auditedAtIso,
              80
            ),
            resolvedAtIso: cleanText(
              data.dispatchConversationReview.resolvedAtIso,
              80
            ),
            resolutionSource: cleanText(
              data.dispatchConversationReview.resolutionSource,
              120
            ),
            note: cleanText(data.dispatchConversationReview.note, 1000),
            preservedCoordinates:
              data.dispatchConversationReview.preservedCoordinates &&
              typeof data.dispatchConversationReview.preservedCoordinates ===
                "object"
                ? {
                    channel: cleanText(
                      data.dispatchConversationReview.preservedCoordinates
                        .channel,
                      120
                    ),
                    threadTs: cleanText(
                      data.dispatchConversationReview.preservedCoordinates
                        .threadTs,
                      120
                    ),
                    permalink: cleanText(
                      data.dispatchConversationReview.preservedCoordinates
                        .permalink,
                      1200
                    ),
                  }
                : null,
            canonicalCoordinates:
              data.dispatchConversationReview.canonicalCoordinates &&
              typeof data.dispatchConversationReview.canonicalCoordinates ===
                "object"
                ? {
                    channel: cleanText(
                      data.dispatchConversationReview.canonicalCoordinates
                        .channel,
                      120
                    ),
                    threadTs: cleanText(
                      data.dispatchConversationReview.canonicalCoordinates
                        .threadTs,
                      120
                    ),
                    permalink: cleanText(
                      data.dispatchConversationReview.canonicalCoordinates
                        .permalink,
                      1200
                    ),
                  }
                : null,
          }
        : null,
    status: isActive ? "active" : "completed",
    workflowStatus,
    workflowStageLabel: WORKFLOW_STAGE_LABELS[workflowStatus],
    workflowStageStartedAt,
    workflowStageElapsedMs: Number.isFinite(workflowStageStartedMs)
      ? Math.max(0, Date.now() - workflowStageStartedMs)
      : 0,
    workflowStageHistory,
    summaryMissing: Boolean(data.summaryMissing),
    summaryWarning:
      data.summaryWarning && typeof data.summaryWarning === "object"
        ? {
            message: cleanText(data.summaryWarning.message, 700),
            workflowStatus: normalizeWorkflowStageValue(
              data.summaryWarning.workflowStatus
            ),
            bluefolderStatus: cleanText(
              data.summaryWarning.bluefolderStatus,
              120
            ),
            expectedCommand: cleanText(
              data.summaryWarning.expectedCommand,
              40
            ),
            commandFound: Boolean(data.summaryWarning.commandFound),
            commandTs: cleanText(data.summaryWarning.commandTs, 80),
            detectedAtIso: cleanText(
              data.summaryWarning.detectedAtIso,
              80
            ),
          }
        : null,
    aiWorkflowDecision:
      data.aiWorkflowDecision && typeof data.aiWorkflowDecision === "object"
        ? {
            source: cleanText(data.aiWorkflowDecision.source, 60),
            previousStage: normalizeWorkflowStageValue(
              data.aiWorkflowDecision.previousStage
            ),
            workflowStatus: normalizeWorkflowStageValue(
              data.aiWorkflowDecision.workflowStatus
            ),
            reason: cleanText(data.aiWorkflowDecision.reason, 700),
            confidence: Number(data.aiWorkflowDecision.confidence || 0),
            evidenceSlackTs: cleanText(
              data.aiWorkflowDecision.evidenceSlackTs,
              180
            ),
            decidedAtIso: cleanText(data.aiWorkflowDecision.decidedAtIso, 80),
            reviewed: Boolean(data.aiWorkflowDecision.reviewed),
            reviewedAtIso: cleanText(
              data.aiWorkflowDecision.reviewedAtIso,
              80
            ),
            reviewedBy: cleanText(data.aiWorkflowDecision.reviewedBy, 180),
            correctedStage: normalizeWorkflowStageValue(
              data.aiWorkflowDecision.correctedStage
            ),
            feedbackReason: cleanText(
              data.aiWorkflowDecision.feedbackReason,
              700
            ),
          }
        : null,
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
    participants,
    oversightManagers,
    oversightSummary:
      (configuredOversightManagers.length
        ? cleanText(data.oversightSummary, 700)
        : "") ||
      `Clock-out oversight: ${oversightManagers
        .map((manager) => manager.name)
        .join(", ")}.`,
    bluefolderAssignees: normalizeAssignees(data.bluefolderAssignees),
    bluefolderAssignments: normalizeBlueFolderAssignments(
      data.bluefolderAssignments
    ),
    remoteWorkActive: Boolean(data.remoteWorkActive),
    remoteWorkReason: cleanText(data.remoteWorkReason, 700),
    remoteWorkConfidence: Number(data.remoteWorkConfidence || 0),
    remoteInferenceVersion: Number(data.remoteInferenceVersion || 0),
    assignmentSummary: cleanText(data.assignmentSummary, 700),
    assignmentDecisionReason: cleanText(data.assignmentDecisionReason, 700),
    assignmentHistory,
    assignmentDisputes: normalizeAssignmentDisputes(data.assignmentDisputes),
    assignmentExclusions,
    participationSummary: cleanText(data.participationSummary, 700),
    participationDecisionReason: cleanText(
      data.participationDecisionReason,
      700
    ),
    participationHistory,
    opsUpdates,
    partMovements,
    inventoryMovements,
    partsReturnStatus: cleanText(data.partsReturnStatus, 40),
    workMode,
    supportModesReceived,
    supportModeReceived,
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
    closedAt: timestampToIso(data.closedAt),
    closedBy: cleanText(data.closedBy, 180),
    scheduledFor: cleanText(data.scheduledFor, 20),
    scheduledReason: cleanText(data.scheduledReason, 700),
    holdReason: cleanText(data.holdReason, 700),
    inactiveReason: cleanText(data.inactiveReason, 700),
    intakeServiceRequestId: cleanText(data.intakeServiceRequestId, 180),
    clientId: cleanText(data.clientId, 180),
    clientName: cleanText(data.clientName, 220),
    machineId: cleanText(data.machineId, 180),
    machineName: cleanText(data.machineName, 220),
    trailerId: cleanText(data.trailerId, 180),
    trailerName: cleanText(data.trailerName, 220),
    clientLocation: cleanText(data.clientLocation, 500),
    updatedAt: timestampToIso(data.updatedAt),
    deleted: Boolean(data.deletedAt),
  };
}

export async function getOpsWorkOrderById(workOrderId) {
  const snapshot = await workOrderRef(workOrderId).get();
  if (!snapshot.exists) {
    throw new Error(`Ops work order ${workOrderId} does not exist.`);
  }
  return serializeWorkOrder(snapshot);
}

export async function listOpsConnectionOptions() {
  const db = requireDb();
  const [clientSnapshot, machineSnapshot, trailerSnapshot] = await Promise.all([
    db.collection("Client").limit(1000).get(),
    db.collection("Machine").limit(2000).get(),
    db.collection("Trailers").limit(500).get(),
  ]);
  const clients = clientSnapshot.docs
    .map((snapshot) => {
      const data = snapshot.data() || {};
      return {
        id: snapshot.id,
        name: clientName(data, snapshot.id),
        location: clientLocation(data),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
  const clientIdsByMachine = new Map();
  clientSnapshot.docs.forEach((snapshot) => {
    (Array.isArray(snapshot.data()?.machines) ? snapshot.data().machines : [])
      .map(referenceId)
      .filter(Boolean)
      .forEach((machineId) => {
        if (!clientIdsByMachine.has(machineId)) {
          clientIdsByMachine.set(machineId, new Set());
        }
        clientIdsByMachine.get(machineId).add(snapshot.id);
      });
  });
  const machines = machineSnapshot.docs
    .map((snapshot) => {
      const data = snapshot.data() || {};
      const clientIds = new Set(clientIdsByMachine.get(snapshot.id) || []);
      const directClientId = referenceId(data.client || data.Client);
      if (directClientId) clientIds.add(directClientId);
      return {
        id: snapshot.id,
        name: cleanText(data.name || snapshot.id, 220),
        oem: cleanText(data.OEM || data.oem || data.manufacturer, 100),
        modality: cleanText(data.Modality || data.modality, 100),
        model: cleanText(data.Model || data.model, 160),
        clientIds: Array.from(clientIds),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
  const clientById = new Map(clients.map((client) => [client.id, client]));
  const trailers = trailerSnapshot.docs
    .filter((snapshot) => snapshot.id !== "layout_meta")
    .map((snapshot) => {
      const data = snapshot.data() || {};
      const clientId = trailerClientId(data);
      const client = clientById.get(clientId);
      return {
        id: snapshot.id,
        name: trailerName({ id: snapshot.id, ...data }),
        clientId,
        clientName:
          client?.name ||
          cleanText(data.locationCurrentName || data.locationCurrent, 220),
        clientLocation:
          client?.location || cleanText(data.locationCurrentClientLocation, 500),
        machineId: trailerMachineId(data),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
  return { clients, machines, trailers };
}

export async function updateOpsConnections({
  workOrderId,
  clientId,
  machineId = "",
  trailerId = "",
  changedBy = "Magmo admin",
}) {
  const db = requireDb();
  const normalizedClientId = normalizeId(clientId);
  if (!normalizedClientId) {
    throw new Error("Select a Client DB record for this work order.");
  }
  const normalizedMachineId = normalizeId(machineId);
  const normalizedTrailerId = normalizeId(trailerId);
  const [clientSnapshot, machineSnapshot, trailerSnapshot] = await Promise.all([
    db.collection("Client").doc(normalizedClientId).get(),
    normalizedMachineId
      ? db.collection("Machine").doc(normalizedMachineId).get()
      : Promise.resolve(null),
    normalizedTrailerId
      ? db.collection("Trailers").doc(normalizedTrailerId).get()
      : Promise.resolve(null),
  ]);
  if (!clientSnapshot.exists) throw new Error("Select a valid Client DB record.");
  const clientData = clientSnapshot.data() || {};
  const clientMachineIds = new Set(
    (Array.isArray(clientData.machines) ? clientData.machines : [])
      .map(referenceId)
      .filter(Boolean)
  );
  if (normalizedMachineId) {
    if (!machineSnapshot?.exists) throw new Error("Select a valid machine record.");
    const directClientId = referenceId(
      machineSnapshot.data()?.client || machineSnapshot.data()?.Client
    );
    if (
      directClientId !== normalizedClientId &&
      !clientMachineIds.has(normalizedMachineId)
    ) {
      throw new Error("The selected machine is not linked to that client.");
    }
  }
  let trailerData = null;
  if (normalizedTrailerId) {
    if (!trailerSnapshot?.exists || trailerSnapshot.id === "layout_meta") {
      throw new Error("Select a valid trailer record.");
    }
    trailerData = trailerSnapshot.data() || {};
    if (trailerClientId(trailerData) !== normalizedClientId) {
      throw new Error("The selected trailer is not linked to that client.");
    }
    const attachedMachineId = trailerMachineId(trailerData);
    if (
      attachedMachineId &&
      normalizedMachineId &&
      attachedMachineId !== normalizedMachineId
    ) {
      throw new Error(
        "The selected machine does not match the machine attached to that trailer."
      );
    }
  }
  const update = {
    clientId: normalizedClientId,
    clientName: clientName(clientData, clientSnapshot.id),
    clientLocation: clientLocation(clientData),
    clientRef: clientSnapshot.ref,
    machineId: normalizedMachineId,
    machineName: machineSnapshot?.exists
      ? cleanText(machineSnapshot.data()?.name || machineSnapshot.id, 220)
      : "",
    machineRef: machineSnapshot?.exists ? machineSnapshot.ref : null,
    trailerId: normalizedTrailerId,
    trailerName: normalizedTrailerId
      ? trailerName({ id: trailerSnapshot.id, ...trailerData })
      : "",
    trailerRef: normalizedTrailerId ? trailerSnapshot.ref : null,
    connectionsUpdatedBy: cleanText(changedBy, 180),
    connectionsUpdatedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  const ref = workOrderRef(workOrderId);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("This Ops work order does not exist.");
  await ref.set(update, { merge: true });
  return serializeWorkOrder(await ref.get());
}

function opsLocalDateKey(value = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: process.env.OPS_TIME_ZONE || "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function listOpsWorkOrders({ since = "" } = {}) {
  const requestedAt = Timestamp.now();
  const sinceDate = since ? new Date(since) : null;
  if (sinceDate && Number.isFinite(sinceDate.getTime())) {
    const snapshot = await requireDb()
      .collection(OPS_WORK_ORDER_COLLECTION)
      .where("updatedAt", ">", Timestamp.fromDate(sinceDate))
      .where("updatedAt", "<=", requestedAt)
      .orderBy("updatedAt", "asc")
      .limit(500)
      .get();
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    const hasMore = snapshot.size === 500;
    return {
      incremental: true,
      changes: snapshot.docs.map((document) => {
        if (document.data()?.deletedAt) {
          return {
            id: document.id,
            deleted: true,
            updatedAt: timestampToIso(document.data()?.updatedAt),
          };
        }
        return serializeWorkOrder(document);
      }),
      cursor:
        hasMore && lastDocument
          ? timestampToIso(lastDocument.data()?.updatedAt)
          : requestedAt.toDate().toISOString(),
      hasMore,
    };
  }
  let snapshot = await requireDb()
    .collection(OPS_WORK_ORDER_COLLECTION)
    .limit(500)
    .get();
  const todayKey = opsLocalDateKey();
  const dueDocuments = snapshot.docs.filter((document) => {
    const data = document.data() || {};
    if (data.deletedAt) return false;
    return (
      normalizeWorkflowStage(
        data,
        normalizeAssignmentHistory(data.assignmentHistory)
      ) === "scheduled" &&
      /^\d{4}-\d{2}-\d{2}$/.test(cleanText(data.scheduledFor, 20)) &&
      cleanText(data.scheduledFor, 20) <= todayKey
    );
  });
  if (dueDocuments.length) {
    const batch = requireDb().batch();
    dueDocuments.forEach((document) => {
      const data = document.data() || {};
      const nextStage = normalizeAssignees(data.bluefolderAssignees).length
        ? "active"
        : Boolean(data.remoteWorkActive)
          ? "remote"
          : "unassigned";
      batch.set(
        document.ref,
        {
          ...buildWorkflowTransitionUpdate(data, nextStage, {
            changedBy: "Magmo automation",
            source: "schedule_due",
            reason: `The scheduled date ${cleanText(data.scheduledFor, 20)} has arrived.`,
          }),
          scheduledFor: FieldValue.delete(),
          scheduledReason: FieldValue.delete(),
          lastActivityAt: FieldValue.serverTimestamp(),
          lastActivityAtIso: new Date().toISOString(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });
    await batch.commit();
    snapshot = await requireDb()
      .collection(OPS_WORK_ORDER_COLLECTION)
      .limit(500)
      .get();
  }
  const now = Date.now();
  const inactiveCutoff = now - 7 * 24 * 60 * 60 * 1000;
  const staleDocuments = snapshot.docs.filter((document) => {
    const data = document.data() || {};
    if (data.deletedAt) return false;
    const stage = normalizeWorkflowStage(
      data,
      normalizeAssignmentHistory(data.assignmentHistory)
    );
    if (!["unassigned", "active", "remote"].includes(stage)) return false;
    const lastActivity = Date.parse(
      timestampToIso(data.lastActivityAt) ||
        cleanText(data.lastActivityAtIso, 80) ||
        timestampToIso(data.createdAt) ||
        cleanText(data.createdAtIso, 80)
    );
    return Number.isFinite(lastActivity) && lastActivity <= inactiveCutoff;
  });
  if (staleDocuments.length) {
    const batch = requireDb().batch();
    const nowIso = new Date(now).toISOString();
    staleDocuments.forEach((document) => {
      const data = document.data() || {};
      batch.set(
        document.ref,
        {
          ...buildWorkflowTransitionUpdate(data, "inactive", {
            changedBy: "Magmo automation",
            source: "inactivity",
            reason: "No recorded activity for seven days.",
            nowIso,
          }),
          inactiveReason: "No recorded activity for seven days.",
          inactiveAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });
    await batch.commit();
    snapshot = await requireDb()
      .collection(OPS_WORK_ORDER_COLLECTION)
      .limit(500)
      .get();
  }
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
  const scheduled = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "scheduled")
    .sort(
      (a, b) =>
        Date.parse(a.scheduledFor || "9999-12-31") -
          Date.parse(b.scheduledFor || "9999-12-31") ||
        activeSort(a, b)
    );
  const onHold = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "on_hold")
    .sort(activeSort);
  const inactive = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "inactive")
    .sort(
      (a, b) =>
        Date.parse(b.lastActivityAt || 0) - Date.parse(a.lastActivityAt || 0)
    );
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
  const closed = workOrders
    .filter((workOrder) => workOrder.workflowStatus === "closed")
    .sort(
      (a, b) =>
        Date.parse(b.closedAt || b.lastActivityAt || 0) -
        Date.parse(a.closedAt || a.lastActivityAt || 0)
    )
    .slice(0, 150);
  return {
    unassigned,
    active,
    remote,
    scheduled,
    onHold,
    inactive,
    serviceComplete,
    done,
    closed,
    // Keep the previous response field during rollout for older clients.
    completed: done,
    cursor: requestedAt.toDate().toISOString(),
    incremental: false,
  };
}

export async function listOpsCalendarSource({ workOrderId: requestedWorkOrderId = "" } = {}) {
  const normalizedWorkOrderId = normalizeId(requestedWorkOrderId);
  const documents = normalizedWorkOrderId
    ? [await workOrderRef(normalizedWorkOrderId).get()].filter(
        (document) => document.exists
      )
    : (
        await requireDb()
          .collection(OPS_WORK_ORDER_COLLECTION)
          .limit(500)
          .get()
      ).docs;
  const workOrders = documents
    .filter((document) => !document.data()?.deletedAt)
    .map(serializeWorkOrder);
  const messageDocuments = documents.filter((document) => {
    const data = document.data() || {};
    return (
      !data.deletedAt &&
      ACTIVE_STATUSES.has(String(data.status || "").toLowerCase()) ||
      (!data.deletedAt && Number(data.messageCount || 0) > 0)
    );
  });
  const messageGroups = await Promise.all(
    messageDocuments.map(async (document) => {
      let query = document.ref.collection(MESSAGE_SUBCOLLECTION);
      if (normalizedWorkOrderId) query = query.orderBy("slackTs", "desc");
      const messages = await query.limit(normalizedWorkOrderId ? 501 : 500).get();
      const selectedDocuments = normalizedWorkOrderId
        ? messages.docs.slice(0, 500)
        : messages.docs;
      return [
        document.id,
        selectedDocuments
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
              workMode: cleanText(data.workMode, 40),
              legacyDefaultDuration: Boolean(data.legacyDefaultDuration),
            };
          })
          .filter((message) => message.slackTs && message.text)
          .sort((left, right) => Number(left.slackTs) - Number(right.slackTs)),
        { truncated: normalizedWorkOrderId && messages.docs.length > 500 },
      ];
    })
  );
  const calendarDocuments = documents.filter((document) => {
    const data = document.data() || {};
    return !data.deletedAt && Number(data.calendarEntryCount || 0) > 0;
  });
  const retainedGroups = await Promise.all(
    calendarDocuments.map(async (document) => {
      let query = document.ref.collection(CALENDAR_SUBCOLLECTION);
      if (normalizedWorkOrderId) query = query.orderBy("slackTs", "desc");
      const retained = await query.limit(normalizedWorkOrderId ? 501 : 500).get();
      const selectedDocuments = normalizedWorkOrderId
        ? retained.docs.slice(0, 500)
        : retained.docs;
      return [
        document.id,
        selectedDocuments
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
              workMode: cleanText(data.workMode, 40),
              legacyDefaultDuration: Boolean(data.legacyDefaultDuration),
            };
          })
          .filter((message) => message.slackTs && message.text),
        { truncated: normalizedWorkOrderId && retained.docs.length > 500 },
      ];
    })
  );
  const messagesByWorkOrder = Object.fromEntries(
    messageGroups.map(([workOrderId, messages]) => [workOrderId, messages])
  );
  const messageMetadataByWorkOrder = Object.fromEntries(
    messageGroups.map(([workOrderId, messages, metadata]) => [
      workOrderId,
      {
        truncated: Boolean(metadata?.truncated),
        includedCount: messages.length,
      },
    ])
  );
  retainedGroups.forEach(([workOrderId, retained, retainedMetadata]) => {
    const existing = messagesByWorkOrder[workOrderId] || [];
    const existingIds = new Set(existing.map((message) => message.id));
    let combined = existing
      .concat(retained.filter((message) => !existingIds.has(message.id)))
      .sort((left, right) => Number(left.slackTs) - Number(right.slackTs));
    const combinedTruncated = normalizedWorkOrderId && combined.length > 500;
    if (combinedTruncated) combined = combined.slice(-500);
    messagesByWorkOrder[workOrderId] = combined;
    messageMetadataByWorkOrder[workOrderId] = {
      truncated: Boolean(
        messageMetadataByWorkOrder[workOrderId]?.truncated ||
          retainedMetadata?.truncated ||
          combinedTruncated
      ),
      includedCount: combined.length,
    };
  });
  return {
    workOrders,
    messagesByWorkOrder,
    messageMetadataByWorkOrder,
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
      createdAtIso: cleanText(payload.createdAt, 80),
      lastActivityAtIso: nowIso,
      lastActivityAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    // Repeated BlueFolder polling must not erase an already-canonical Slack
    // thread when an older worker omits one or more Slack fields.
    if (cleanText(payload.slackPermalink, 1200)) {
      update.slackPermalink = cleanText(payload.slackPermalink, 1200);
    }
    if (cleanText(payload.slackChannel, 120)) {
      update.slackChannel = cleanText(payload.slackChannel, 120);
    }
    if (cleanText(payload.slackThreadTs, 120)) {
      update.slackThreadTs = cleanText(payload.slackThreadTs, 120);
    }
    if (payload.dispatchReceipt && typeof payload.dispatchReceipt === "object") {
      update.dispatchReceipt = {
        workOrderId: cleanText(payload.dispatchReceipt.workOrderId, 180),
        dispatchStatus: cleanText(payload.dispatchReceipt.dispatchStatus, 40),
        slackChannel: cleanText(payload.dispatchReceipt.slackChannel, 120),
        slackThreadTs: cleanText(payload.dispatchReceipt.slackThreadTs, 120),
        slackPermalink: cleanText(payload.dispatchReceipt.slackPermalink, 1200),
        dispatchedAt: cleanText(payload.dispatchReceipt.dispatchedAt, 80),
        dispatchedBy: cleanText(payload.dispatchReceipt.dispatchedBy, 180),
      };
    }
    if (payload.dispatchStatus != null) {
      update.dispatchStatus = cleanText(payload.dispatchStatus, 40);
    }
    if (payload.dispatchedAt != null) {
      update.dispatchedAt = cleanText(payload.dispatchedAt, 80);
    }
    if (payload.dispatchedBy != null) {
      update.dispatchedBy = cleanText(payload.dispatchedBy, 180);
    }
    if (update.slackChannel && update.slackThreadTs) {
      Object.assign(
        update,
        buildDispatchEvidenceResolutionPatch({
          workOrder: existing,
          slackChannel: update.slackChannel,
          slackThreadTs: update.slackThreadTs,
          slackPermalink: update.slackPermalink || existing.slackPermalink || "",
          resolvedAtIso: nowIso,
        })
      );
    }
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
    if (payload.clientLocation != null) {
      update.clientLocation = cleanText(payload.clientLocation, 500);
    }
    if (payload.machineId != null) {
      update.machineId = cleanText(payload.machineId, 180);
    }
    if (payload.machineName != null) {
      update.machineName = cleanText(payload.machineName, 220);
    }
    if (payload.trailerId != null) {
      update.trailerId = cleanText(payload.trailerId, 180);
    }
    if (payload.trailerName != null) {
      update.trailerName = cleanText(payload.trailerName, 220);
    }
    if (!snapshot.exists || existing.deletedAt) {
      const bluefolderAssignees = normalizeAssignees(
        payload.bluefolderAssignees
      );
      const acceptedAssignees = normalizeAssignees(payload.assignees);
      const acceptedRemoteAssignees = normalizeAssignees(
        payload.remoteAssignees
      );
      const acceptedDispatchAssignees = normalizeAssignees(
        payload.dispatchAssignees
      );
      const acceptedOversightManagers = defaultOpsOversightManagers(
        payload.oversightManagers
      );
      const assignmentMode = cleanText(
        payload.assignmentMode,
        30
      ).toLowerCase();
      const remoteRequested =
        (assignmentMode === "remote" || assignmentMode === "mixed") &&
        (acceptedRemoteAssignees.length > 0 ||
          (assignmentMode === "remote" && acceptedAssignees.length > 0));
      const initialAssignees = acceptedAssignees.length
        ? mergeAssignees(bluefolderAssignees, acceptedAssignees)
        : bluefolderAssignees.length
        ? bluefolderAssignees
        : [];
      const startsAssigned =
        bluefolderAssignees.length > 0 || acceptedDispatchAssignees.length > 0;
      Object.assign(update, {
        deletedAt: FieldValue.delete(),
        deletedBy: FieldValue.delete(),
        status: "active",
        workflowStatus: bluefolderAssignees.length
          ? "active"
          : remoteRequested
          ? "remote"
          : startsAssigned
          ? "active"
          : "unassigned",
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
        remoteWorkActive: remoteRequested,
        remoteWorkReason: remoteRequested
          ? "Remote ownership was selected while approving the service request."
          : "",
        remoteWorkConfidence: remoteRequested ? 1 : 0,
        remoteInferenceVersion: remoteRequested ? 1 : 0,
        priorityRank: Date.now(),
        assignees: initialAssignees,
        bluefolderAssignees,
        oversightManagers: acceptedOversightManagers,
        oversightSummary: acceptedOversightManagers.length
          ? `Manager oversight: ${acceptedOversightManagers
              .map((entry) => entry.name)
              .join(", ")}.`
          : "No oversight manager selected.",
        assignmentSummary:
          remoteRequested && bluefolderAssignees.length
            ? `Accepted with dispatch and remote support by ${initialAssignees
                .map((entry) => entry.name)
                .join(", ")}.`
            : remoteRequested
          ? `Accepted for remote support by ${initialAssignees
              .map((entry) => entry.name)
              .join(", ")}.`
          : startsAssigned
          ? `Accepted and assigned to ${initialAssignees
              .map((entry) => entry.name)
              .join(", ")}.`
          : "No remote or physical worker is assigned yet.",
        assignmentDecisionReason:
          remoteRequested && bluefolderAssignees.length
            ? "Remote support and BlueFolder dispatch assignments were confirmed while accepting the service request."
            : remoteRequested
            ? "Remote ownership was confirmed while accepting the service request; no BlueFolder dispatch assignment was created."
            : startsAssigned
            ? "Assignment was confirmed while accepting the website service request."
            : "Assignment begins only when someone is confirmed for remote or physical work.",
        assignmentHistory: [initialAssignmentEntry(initialAssignees, nowIso)],
        participants: [],
        participationSummary: "No participation recorded yet.",
        participationDecisionReason: "",
        participationHistory: [],
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

export async function saveOpsSlackCoordinates(
  workOrderId,
  { slackChannel = "", slackThreadTs = "", slackPermalink } = {}
) {
  const normalizedWorkOrderId = normalizeId(workOrderId);
  const channel = cleanText(slackChannel, 120);
  const threadTs = cleanText(slackThreadTs, 120);
  if (!normalizedWorkOrderId || !channel || !threadTs) {
    throw new Error(
      "A valid work order ID and canonical Slack channel/thread are required."
    );
  }
  const ref = workOrderRef(normalizedWorkOrderId);
  const snapshot = await ref.get();
  if (!snapshot.exists || snapshot.data()?.deletedAt) {
    throw new Error(`Ops work order ${normalizedWorkOrderId} does not exist.`);
  }
  const update = {
    slackChannel: channel,
    slackThreadTs: threadTs,
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (slackPermalink !== undefined && cleanText(slackPermalink, 1200)) {
    update.slackPermalink = cleanText(slackPermalink, 1200);
  }
  Object.assign(
    update,
    buildDispatchEvidenceResolutionPatch({
      workOrder: snapshot.data() || {},
      slackChannel: channel,
      slackThreadTs: threadTs,
      slackPermalink:
        update.slackPermalink || snapshot.data()?.slackPermalink || "",
    })
  );
  await ref.set(update, { merge: true });
  return serializeWorkOrder(await ref.get());
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

export async function recordOpsInventoryMovement({
  workOrderNumber,
  direction,
  itemId,
  partName,
  pnSn = "",
  tracking = "",
  description = "",
  recordedBy = "",
  sourceId = "",
}) {
  const number = cleanText(workOrderNumber, 180).match(/\d{3,12}/)?.[0] || "";
  const normalizedDirection = cleanText(direction, 30).toLowerCase();
  if (!number || !["shipping", "receiving"].includes(normalizedDirection)) {
    return { attached: false, reason: "missing_work_order" };
  }
  const ref = workOrderRef(number);
  const normalizedItemId = cleanText(itemId, 180);
  const movementId = messageId(
    sourceId ||
      `${normalizedDirection}-${normalizedItemId || simplifyOpsPartName(partName)}-${Date.now()}`
  );
  const recordedAtIso = new Date().toISOString();
  let attached = false;
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) return;
    const current = snapshot.data() || {};
    const history = normalizeInventoryMovements(current.inventoryMovementsHistory);
    if (history.some((entry) => entry.id === movementId)) {
      attached = true;
      return;
    }
    const partKey = normalizedItemId || normalizeNameKey(partName);
    const pairedShipping = normalizedDirection === "receiving"
      ? [...history].reverse().find(
          (entry) =>
            entry.direction === "shipping" &&
            !entry.pairedMovementId &&
            (entry.itemId || normalizeNameKey(entry.partName)) === partKey
        )
      : null;
    const pairId = pairedShipping
      ? messageId(`pair-${pairedShipping.id}-${movementId}`)
      : "";
    if (pairedShipping) {
      pairedShipping.pairId = pairId;
      pairedShipping.pairedMovementId = movementId;
    }
    history.push({
      id: movementId,
      direction: normalizedDirection,
      itemId: normalizedItemId,
      partName:
        simplifyOpsPartName(partName) || normalizedItemId || "Inventory item",
      pnSn: cleanText(pnSn, 300),
      tracking: cleanText(tracking, 180),
      description: cleanText(description, 500),
      recordedBy: cleanText(recordedBy, 180),
      recordedAtIso,
      itemUrl: normalizedItemId
        ? `/NewSearch/item/${encodeURIComponent(normalizedItemId)}`
        : "",
      pairId,
      pairedMovementId: pairedShipping?.id || "",
      disposition: normalizedDirection === "receiving" ? "returned" : "outbound",
    });
    transaction.set(
      ref,
      {
        inventoryMovementsHistory: history.slice(
          -MAX_INVENTORY_MOVEMENT_HISTORY
        ),
        inventoryMovementsUpdatedAt: FieldValue.serverTimestamp(),
        lastActivityAt: FieldValue.serverTimestamp(),
        lastActivityAtIso: recordedAtIso,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    attached = true;
  });
  return {
    attached,
    reason: attached ? "attached" : "work_order_not_found",
    workOrderNumber: number,
    movementId,
  };
}

export async function updateOpsInventoryMovement({
  workOrderId,
  movementId,
  disposition,
  swapMovementId,
  updateSwapLink = false,
  changedBy = "Magmo admin",
}) {
  const normalizedDisposition = cleanText(disposition, 30).toLowerCase();
  if (!["returned", "used", "core", "unknown", "outbound"].includes(normalizedDisposition)) {
    throw new Error("Choose returned, used, core, or unknown.");
  }
  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error(`Ops work order ${workOrderId} does not exist.`);
    const history = normalizeInventoryMovements(snapshot.data()?.inventoryMovementsHistory);
    const target = history.find((entry) => entry.id === cleanText(movementId, 180));
    if (!target) throw new Error("That inventory movement no longer exists.");
    target.disposition = normalizedDisposition;
    target.dispositionChangedBy = cleanText(changedBy, 180);
    target.dispositionChangedAtIso = new Date().toISOString();
    if (updateSwapLink) {
      const requestedPeerId = cleanText(swapMovementId, 180);
      const clearSwap = (entry) => {
        if (!entry) return;
        entry.swapPairId = "";
        entry.swappedMovementId = "";
      };
      const clearExistingPeer = (entry) => {
        const existingPeer = history.find(
          (candidate) => candidate.id === entry?.swappedMovementId
        );
        if (existingPeer?.swappedMovementId === entry?.id) clearSwap(existingPeer);
        clearSwap(entry);
      };
      const clearUnusedReturnPair = (entry) => {
        const existingPeer = history.find(
          (candidate) => candidate.id === entry?.pairedMovementId
        );
        if (existingPeer?.pairedMovementId === entry?.id) {
          existingPeer.pairId = "";
          existingPeer.pairedMovementId = "";
        }
        entry.pairId = "";
        entry.pairedMovementId = "";
      };

      clearExistingPeer(target);
      if (requestedPeerId) {
        const peer = history.find((entry) => entry.id === requestedPeerId);
        if (!peer) throw new Error("That replacement/core movement no longer exists.");
        if (peer.id === target.id || peer.direction === target.direction) {
          throw new Error("A replacement must link one shipped item to one received core.");
        }
        clearExistingPeer(peer);
        const shipped = target.direction === "shipping" ? target : peer;
        const core = target.direction === "receiving" ? target : peer;
        // A manual swap decision intentionally supersedes any previous
        // shipment-return pairing for either endpoint.
        clearUnusedReturnPair(shipped);
        clearUnusedReturnPair(core);
        const swapPairId = messageId(`swap-${shipped.id}-${core.id}`);
        shipped.disposition = "used";
        core.disposition = "core";
        shipped.swapPairId = swapPairId;
        shipped.swappedMovementId = core.id;
        core.swapPairId = swapPairId;
        core.swappedMovementId = shipped.id;
        shipped.dispositionChangedBy = cleanText(changedBy, 180);
        core.dispositionChangedBy = cleanText(changedBy, 180);
        shipped.dispositionChangedAtIso = new Date().toISOString();
        core.dispositionChangedAtIso = shipped.dispositionChangedAtIso;
      }
    }
    transaction.set(ref, {
      inventoryMovementsHistory: history,
      inventoryMovementsUpdatedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  });
  return serializeWorkOrder(await ref.get());
}

export async function moveOpsWorkOrderStage({
  workOrderId,
  targetStage,
  scheduledFor = "",
  reason = "",
  changedBy = "Magmo admin",
}) {
  const normalizedStage = normalizeWorkflowStageValue(targetStage);
  const movableStages = new Set([
    "unassigned",
    "active",
    "remote",
    "scheduled",
    "on_hold",
    "inactive",
  ]);
  if (!movableStages.has(normalizedStage)) {
    throw new Error("Choose Unassigned, Remote, Active, Scheduled, On hold, or Inactive.");
  }
  const normalizedDate = cleanText(scheduledFor, 20);
  if (normalizedStage === "scheduled") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
      throw new Error("Choose the date this work order is scheduled for.");
    }
    const todayKey = opsLocalDateKey();
    if (normalizedDate <= todayKey) {
      throw new Error("Scheduled work must be set for tomorrow or a later date.");
    }
  }
  const normalizedReason = cleanText(reason, 700);
  if (normalizedStage === "on_hold" && !normalizedReason) {
    throw new Error("Add the specific reason this work order is on hold.");
  }

  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    if (["service_complete", "done", "closed"].includes(currentStage)) {
      throw new Error("Reopen this work order before moving it within active circulation.");
    }
    const transitionReason =
      normalizedReason ||
      (normalizedStage === "scheduled"
        ? `Scheduled for ${normalizedDate}.`
        : `Moved to ${WORKFLOW_STAGE_LABELS[normalizedStage]}.`);
    const update = {
      ...buildWorkflowTransitionUpdate(current, normalizedStage, {
        changedBy,
        source: "manual_stage_move",
        reason: transitionReason,
      }),
      status: "active",
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (["unassigned", "active", "remote"].includes(normalizedStage)) {
      update.lastActivityAt = FieldValue.serverTimestamp();
      update.lastActivityAtIso = new Date().toISOString();
    }
    if (normalizedStage === "scheduled") {
      update.scheduledFor = normalizedDate;
      update.scheduledReason = transitionReason;
    } else {
      update.scheduledFor = FieldValue.delete();
      update.scheduledReason = FieldValue.delete();
    }
    if (normalizedStage === "on_hold") {
      update.holdReason = normalizedReason;
      update.holdStartedAt = FieldValue.serverTimestamp();
    } else {
      update.holdReason = FieldValue.delete();
      update.holdStartedAt = FieldValue.delete();
    }
    if (normalizedStage === "inactive") {
      update.inactiveReason = normalizedReason || "Moved to Inactive manually.";
      update.inactiveAt = FieldValue.serverTimestamp();
    } else {
      update.inactiveReason = FieldValue.delete();
      update.inactiveAt = FieldValue.delete();
    }
    transaction.set(ref, update, { merge: true });
  });
  return serializeWorkOrder(await ref.get());
}

export async function recoverOpsWorkOrderRecord(
  payload = {},
  recoveredBy = "Magmo master admin"
) {
  const workOrderId = normalizeId(payload.workOrderId || payload.number);
  if (!workOrderId) throw new Error("A valid work order number is required.");
  await upsertOpsWorkOrder({ ...payload, workOrderId, number: payload.number || workOrderId });
  const ref = workOrderRef(workOrderId);
  const nowIso = new Date().toISOString();
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error(`Ops work order ${workOrderId} does not exist.`);
    const current = snapshot.data() || {};
    const recoveredBlueFolderAssignees = normalizeAssignees(
      payload.bluefolderAssignees
    );
    const bluefolderAssignees = recoveredBlueFolderAssignees.length
      ? recoveredBlueFolderAssignees
      : normalizeAssignees(current.bluefolderAssignees);
    const assignees = bluefolderAssignees;
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    const requestedStage =
      normalizeWorkflowStageValue(payload.recoveredWorkflowStatus) ||
      (bluefolderAssignees.length ? "active" : "unassigned");
    const hasTerminalCommand = ["!done", "!complete"].includes(
      cleanText(payload.recoveryCommand, 40).toLowerCase()
    );
    const nextStage =
      ["service_complete", "done", "closed"].includes(currentStage) &&
      !hasTerminalCommand
        ? currentStage
        : requestedStage;
    const recoveryReason =
      cleanText(payload.recoveryReason, 700) ||
      "Recovered from the complete Slack dispatch thread for AI review.";
    const commandIso = cleanText(payload.recoveryCommandTs, 180)
      ? new Date(Number(payload.recoveryCommandTs) * 1000).toISOString()
      : "";
    const commandDate = commandIso ? new Date(commandIso) : null;
    const lastActivityIso = cleanText(payload.lastActivityAtIso, 80);
    const lastActivityDate = lastActivityIso ? new Date(lastActivityIso) : null;
    const commandSender = normalizeAssignees([
      payload.recoveryCommandSender,
    ])[0];
    const workflowUpdate = buildWorkflowTransitionUpdate(current, nextStage, {
      changedBy: recoveredBy,
      source: "manual_recovery",
      reason: recoveryReason,
      nowIso: commandIso || nowIso,
    });
    const assignmentHistory = [
      initialAssignmentEntry(
        assignees,
        timestampToIso(current.createdAt) || current.createdAtIso || nowIso
      ),
    ];
    const terminalFields =
      nextStage === "done"
        ? {
            completedAt:
              commandDate && !Number.isNaN(commandDate.getTime())
                ? Timestamp.fromDate(commandDate)
                : current.completedAt || FieldValue.serverTimestamp(),
            completedBy: cleanText(
              commandSender?.name || payload.recoveryCommandSender?.name || "Slack !done",
              180
            ),
            trackingStoppedAt: FieldValue.delete(),
          }
        : nextStage === "service_complete"
        ? {
            serviceCompletedAt:
              commandDate && !Number.isNaN(commandDate.getTime())
                ? Timestamp.fromDate(commandDate)
                : current.serviceCompletedAt || FieldValue.serverTimestamp(),
            serviceCompletedBy: cleanText(
              commandSender?.name ||
                payload.recoveryCommandSender?.name ||
                "Slack !complete",
              180
            ),
          }
        : {};
    transaction.set(
      ref,
      {
        ...workflowUpdate,
        status:
          nextStage === "done"
            ? "completed"
            : nextStage === "closed"
            ? "closed"
            : "active",
        workflowStatus: nextStage,
        bluefolderAssignees,
        assignees,
        assignmentSummary: assignees.length
          ? `BlueFolder dispatch assignment: ${assignees
              .map((entry) => entry.name)
              .join(", ")}. Slack recovery is checking for additional remote or physical workers.`
          : "No BlueFolder dispatch engineer is currently assigned; Slack recovery is checking the thread.",
        assignmentDecisionReason: recoveryReason,
        assignmentConfidence: Number(payload.recoveryConfidence || 0),
        assignmentHistory,
        participants: [],
        participationSummary: "No participation classified yet.",
        participationDecisionReason: "Full-thread recovery analysis is pending.",
        participationHistory: [],
        remoteWorkActive: false,
        remoteWorkReason: "",
        remoteWorkConfidence: 0,
        workMode: "unspecified",
        ...terminalFields,
        deletedAt: FieldValue.delete(),
        deletedBy: FieldValue.delete(),
        ...(nextStage !== "done" && nextStage !== "closed"
          ? {
              completedAt: FieldValue.delete(),
              completedBy: FieldValue.delete(),
              trackingStoppedAt: FieldValue.delete(),
            }
          : {}),
        ...(nextStage !== "service_complete"
          ? {
              serviceCompletedAt: FieldValue.delete(),
              serviceCompletedBy: FieldValue.delete(),
            }
          : {}),
        ...(nextStage !== "closed"
          ? {
              closedAt: FieldValue.delete(),
              closedBy: FieldValue.delete(),
              chatLogDeletedAt: FieldValue.delete(),
            }
          : {}),
        ...(lastActivityDate && !Number.isNaN(lastActivityDate.getTime())
          ? {
              lastActivityAt: Timestamp.fromDate(lastActivityDate),
              lastActivityAtIso,
            }
          : {}),
        aiWorkflowDecision: {
          source: "recovery",
          previousStage: currentStage,
          workflowStatus: nextStage,
          reason: recoveryReason,
          confidence: Number(payload.recoveryConfidence || 0),
          evidenceSlackTs: cleanText(payload.recoveryCommandTs, 180),
          decidedAtIso: nowIso,
          reviewed: false,
        },
        recoveredAt: FieldValue.serverTimestamp(),
        recoveredAtIso: nowIso,
        recoveredFromSlack: true,
        recoveredBy: cleanText(recoveredBy, 180),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return serializeWorkOrder(await ref.get());
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
  workflowChanged,
  workflowStatus,
  workflowReason,
  workflowConfidence,
  scheduledFor,
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
    const requestedWorkflowStage = normalizeWorkflowStageValue(workflowStatus);
    const workflowDecisionConfidence = Number(workflowConfidence || 0);
    const requestedScheduledFor = cleanText(scheduledFor, 20);
    const validScheduledFor = /^\d{4}-\d{2}-\d{2}$/.test(requestedScheduledFor);
    const workflowChangeAccepted =
      !terminalPeopleLocked &&
      Boolean(workflowChanged) &&
      requestedWorkflowStage &&
      !["service_complete", "done", "closed"].includes(requestedWorkflowStage) &&
      requestedWorkflowStage !== currentStage &&
      workflowDecisionConfidence >= Number(process.env.OPS_WORKFLOW_MIN_CONFIDENCE || 0.76) &&
      (requestedWorkflowStage !== "scheduled" || validScheduledFor);
    const desiredStage = workflowChangeAccepted
      ? requestedWorkflowStage
      : includeRemote
        ? normalizeAssignees(current.bluefolderAssignees).length
          ? "active"
          : nextRemoteActive
            ? "remote"
            : "unassigned"
        : currentStage;
    const workflowUpdate =
      ["service_complete", "done", "closed"].includes(currentStage)
      ? {}
      : buildWorkflowTransitionUpdate(current, desiredStage, {
          changedBy: "Magmo AI",
          source: workflowChangeAccepted ? "workflow_inference" : "remote_inference",
          reason:
            cleanText(workflowChangeAccepted ? workflowReason : remoteWorkReason, 500) ||
            (nextRemoteActive
              ? "Slack indicates active remote work."
              : "The latest evidence changed the circulation stage."),
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
        ...(workflowChangeAccepted
          ? {
              workflowDecisionReason: cleanText(workflowReason, 700),
              workflowDecisionConfidence,
              ...(desiredStage === "scheduled"
                ? {
                    scheduledFor: requestedScheduledFor,
                    scheduledReason: cleanText(workflowReason, 700),
                  }
                : {}),
              ...(desiredStage === "on_hold"
                ? {
                    holdReason: cleanText(workflowReason, 700),
                    holdStartedAt: FieldValue.serverTimestamp(),
                  }
                : {}),
            }
          : {}),
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
    /\b(?:check|checking|work|working|troubleshoot|troubleshooting|diagnose|diagnosing|test|testing|fix|fixing|repair|repairing|reboot|rebooting|reload|reloading|connect|connected|logged\s+in|review|reviewing|attempt|attempting)\b.{0,80}\bremote(?:ly)?\b|\b(?:teamviewer|anydesk|remote\s+(?:session|connection|access|support)|vpn|ssh|vnc|rdp|putty)\b/i,
    /\b(?:remote\s+(?:session|work|support|troubleshooting)\s+(?:ended|complete|completed|done|stopped|closed)|(?:couldn['’]?t|could\s+not|can['’]?t|cannot|unable\s+to).{0,55}remote(?:ly)?|(?:work|service|remote\s+support)\s+(?:is\s+)?not\s+required|no\s+(?:remote\s+)?work\s+(?:is\s+)?required|on-?site\s+only|cannot\s+install\s+remotely)\b/i,
    /\b(?:hard\s*down|system\s+down|machine\s+down|scanner\s+down|offline|unusable|not\s+operational|cannot\s+scan|no\s+connection)\b/i,
    /\b(?:schedul(?:e|ed|ing)|appointment|availability|eta|dispatch|send\s+(?:a\s+)?tech|on-?site|visit|delivery|parts?\s+(?:needed|ordered|arriv|ship))\b/i,
    /\b(?:working\s+on|in\s+progress|en\s+route|on\s+the\s+way|at\s+the\s+site|troubleshoot|testing|repairing|replacing|installing|delivering|coordinating)\b/i,
    /\b(?:working|checking|troubleshooting|diagnosing|testing|fixing|repairing|rebooting|reloading|connected|logged\s+in)\s+(?:on\s+it\s+)?remote(?:ly)?\b|\b(?:teamviewer|anydesk|remote\s+(?:session|connection|access)|vpn|ssh)\b/i,
    /\b(?:remote\s+(?:session|work)\s+(?:ended|complete|stopped)|could(?:n['â€™]?t| not)\s+(?:fix|resolve).{0,30}remote|needs?\s+(?:an?\s+)?on-?site|sending\s+(?:an?\s+)?tech)\b/i,
    /\b(?:back\s+up|operational|restored|resolved|running\s+again)\b/i,
    /\b(?:no\s+rush|not\s+urgent|whenever|when\s+you\s+have\s+time|can\s+wait|next\s+pm|monitor(?:ing)?|follow\s+up\s+later)\b/i,
    /\b(?:waiting\s+(?:on|for)|on\s+hold|pending|approval|quote|purchase\s+order|vendor|customer\s+(?:reply|response|confirmation)|blocked)\b/i,
    /\b(?:suggest|recommend|advice|advise|try|likely|possibly|might\s+be|could\s+be|looks\s+like|log(?:s)?\s+(?:show|indicate)|error\s+(?:shows|indicates)|coordinate|coordinating|confirmed\s+with|spoke\s+with|called\s+the\s+customer)\b/i,
  ];
  return prioritySignals.some((signal) => signal.test(normalized));
}

function shouldRetainOpsCalendarMessage(text) {
  const normalized = cleanText(text, 6000).toLowerCase();
  if (!normalized) return false;
  if (hasImmediateDepartureStatement(text)) return true;
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
  const recoveredSnapshot = Boolean(payload.recoveredSnapshot);
  const needsAnalysis = !recoveredSnapshot && shouldAnalyzeOpsMessage(text);
  const retainForCalendar = shouldRetainOpsCalendarMessage(text);
  const calendarRef = ref.collection(CALENDAR_SUBCOLLECTION).doc(id);
  const resolvedSender = resolveSlackSenderIdentity(payload);
  const sender = normalizeAssignees(resolvedSender ? [resolvedSender] : [])[0] || {
    id: "",
    name: "Unknown",
  };
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
    const currentStage = normalizeWorkflowStage(
      workOrder,
      normalizeAssignmentHistory(workOrder.assignmentHistory)
    );
    if (isClosedMessageIngestionBoundary(currentStage)) {
      return { accepted: false, reason: "closed" };
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
        analysisStatus: recoveredSnapshot
          ? "completed"
          : needsAnalysis
          ? "analyzing"
          : "not_needed",
        analysisStartedAtMs: needsAnalysis ? now : 0,
        ...(recoveredSnapshot
          ? {
              analysisReason:
                "Analyzed once as part of a full-thread Magmo recovery.",
              recoveredFromSlack: true,
            }
          : {}),
      },
      { merge: true }
    );
    if (retainForCalendar) {
      transaction.set(calendarRef, calendarEntry, { merge: true });
    }
    const activityStage = normalizeAssignees(workOrder.bluefolderAssignees).length
      ? "active"
      : Boolean(workOrder.remoteWorkActive)
        ? "remote"
        : "unassigned";
    const activityTransition =
      !recoveredSnapshot && currentStage === "inactive"
        ? buildWorkflowTransitionUpdate(workOrder, activityStage, {
            changedBy: sender.name || "Slack",
            source: "new_activity",
            reason: "A new Slack message resumed activity on the work order.",
          })
        : {};
    transaction.set(
      ref,
      {
        ...activityTransition,
        ...(!recoveredSnapshot
          ? {
              lastActivityAt: FieldValue.serverTimestamp(),
              lastActivityAtIso: new Date().toISOString(),
            }
          : {}),
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
  participants,
  participationChanged,
  participationSummary,
  participationReason,
  participationConfidence,
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
  workflowChanged,
  workflowStatus,
  workflowReason,
  workflowConfidence,
  scheduledFor,
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
    const existingAssignmentHistory = normalizeAssignmentHistory(
      current.assignmentHistory
    );
    const currentWorkflowStage = normalizeWorkflowStage(
      current,
      existingAssignmentHistory
    );
    const terminalPeopleLocked = ["service_complete", "done", "closed"].includes(
      currentWorkflowStage
    );
    const protectedAssignees = normalizeAssignees(current.bluefolderAssignees);
    const previousAssignees = normalizeAssignees(current.assignees);
    const protectedPrevious = mergeAssignees(
      protectedAssignees,
      previousAssignees
    );
    const nextAssignees = terminalPeopleLocked
      ? previousAssignees
      : mergeAssignees(protectedAssignees, assignees);
    const protectionRepair =
      !terminalPeopleLocked &&
      !assigneesMatch(previousAssignees, protectedPrevious);
    const assignmentChanged =
      !terminalPeopleLocked &&
      (Boolean(changed) || protectionRepair) &&
      !peopleDetailsMatch(previousAssignees, nextAssignees);
    const decisionReason = cleanText(reason, 700);
    const nowIso = new Date().toISOString();
    const assignmentHistory = existingAssignmentHistory;
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
    const previousParticipants = withoutAssignees(
      normalizeAssignees(current.participants),
      nextAssignees
    );
    const nextParticipants = withoutAssignees(
      normalizeAssignees(participants),
      nextAssignees
    );
    const participantChanged =
      !terminalPeopleLocked &&
      Boolean(participationChanged) &&
      !assigneesMatch(previousParticipants, nextParticipants);
    const participationHistory = normalizeParticipationHistory(
      current.participationHistory
    );
    if (participantChanged) {
      participationHistory.push({
        id: messageId(rawMessageId),
        source: "ai",
        previousParticipants,
        participants: nextParticipants,
        reason: cleanText(participationReason, 700),
        triggerMessage: cleanText(triggerMessage, 1000),
        triggerSender: cleanText(triggerSender, 100),
        triggerSlackTs: cleanText(triggerSlackTs, 180),
        confidence: Number(participationConfidence || 0),
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
    const remoteConfidence = Number(remoteWorkConfidence || 0);
    const remoteChangeAccepted =
      !terminalPeopleLocked &&
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
    const requestedWorkflowStage = normalizeWorkflowStageValue(workflowStatus);
    const workflowDecisionConfidence = Number(workflowConfidence || 0);
    const requestedScheduledFor = cleanText(scheduledFor, 20);
    const validScheduledFor = /^\d{4}-\d{2}-\d{2}$/.test(requestedScheduledFor);
    const workflowChangeAccepted =
      !terminalPeopleLocked &&
      Boolean(workflowChanged) &&
      requestedWorkflowStage &&
      !["service_complete", "done", "closed"].includes(
        requestedWorkflowStage
      ) &&
      requestedWorkflowStage !== currentWorkflowStage &&
      workflowDecisionConfidence >=
        Number(process.env.OPS_WORKFLOW_MIN_CONFIDENCE || 0.76) &&
      (requestedWorkflowStage !== "scheduled" || validScheduledFor);
    const desiredWorkflowStage = workflowChangeAccepted
      ? requestedWorkflowStage
      : remoteChangeAccepted
        ? protectedAssignees.length
          ? "active"
          : nextRemoteActive
            ? "remote"
            : "unassigned"
        : currentWorkflowStage;
    const workflowUpdate = ["service_complete", "done", "closed"].includes(
      currentWorkflowStage
    )
      ? {}
      : buildWorkflowTransitionUpdate(current, desiredWorkflowStage, {
          changedBy: triggerSender || "Magmo AI",
          source: workflowChangeAccepted
            ? "workflow_inference"
            : "remote_inference",
          reason:
            cleanText(
              workflowChangeAccepted ? workflowReason : remoteWorkReason,
              500
            ) ||
            (nextRemoteActive
              ? "Slack indicates active remote work."
              : "The latest Slack evidence changed the circulation stage."),
          nowIso,
        });
    const workflowFields = workflowChangeAccepted
      ? {
          workflowDecisionReason: cleanText(workflowReason, 700),
          workflowDecisionConfidence,
          ...(desiredWorkflowStage === "scheduled"
            ? {
                scheduledFor: requestedScheduledFor,
                scheduledReason: cleanText(workflowReason, 700),
              }
            : {
                scheduledFor: FieldValue.delete(),
                scheduledReason: FieldValue.delete(),
              }),
          ...(desiredWorkflowStage === "on_hold"
            ? {
                holdReason: cleanText(workflowReason, 700),
                holdStartedAt: FieldValue.serverTimestamp(),
              }
            : {
                holdReason: FieldValue.delete(),
                holdStartedAt: FieldValue.delete(),
              }),
          ...(desiredWorkflowStage === "inactive"
            ? {
                inactiveReason: cleanText(workflowReason, 700),
                inactiveAt: FieldValue.serverTimestamp(),
              }
            : {
                inactiveReason: FieldValue.delete(),
                inactiveAt: FieldValue.delete(),
              }),
        }
      : {};
    const nextSupportModesReceived = normalizeSupportModesReceived(
      current.supportModesReceived,
      current.workMode,
      assignmentChanged
        ? normalizeAssignees(assignees).map((person) => person.workMode)
        : [],
      remoteChangeAccepted || workflowChangeAccepted ? requestedWorkMode : ""
    );

    transaction.set(
      ref,
      {
        assignees: terminalPeopleLocked
          ? previousAssignees
          : assignmentChanged
            ? nextAssignees
            : protectedPrevious,
        assignmentSummary: terminalPeopleLocked
          ? cleanText(current.assignmentSummary, 700)
          : assignmentChanged
            ? "Currently assigned to " +
              nextAssignees.map((entry) => entry.name).join(", ") +
              "."
            : cleanText(summary, 700),
        assignmentDecisionReason: terminalPeopleLocked
          ? cleanText(current.assignmentDecisionReason, 700)
          : decisionReason,
        assignmentConfidence: terminalPeopleLocked
          ? Number(current.assignmentConfidence || 0)
          : Number(confidence || 0),
        participants: terminalPeopleLocked
          ? normalizeAssignees(current.participants)
          : participantChanged
            ? nextParticipants
            : previousParticipants,
        participationSummary: terminalPeopleLocked
          ? cleanText(current.participationSummary, 700)
          : participantChanged
            ? nextParticipants.length
              ? "Participating: " +
                nextParticipants.map((entry) => entry.name).join(", ") +
                "."
              : "No current participants."
            : cleanText(
                participationSummary || current.participationSummary,
                700
              ),
        participationDecisionReason: terminalPeopleLocked
          ? cleanText(current.participationDecisionReason, 700)
          : cleanText(participationReason, 700),
        participationConfidence: terminalPeopleLocked
          ? Number(current.participationConfidence || 0)
          : Number(participationConfidence || 0),
        priorityContext: cleanText(
          priorityContext || current.priorityContext,
          900
        ),
        remoteWorkActive: terminalPeopleLocked
          ? Boolean(current.remoteWorkActive)
          : nextRemoteActive,
        remoteWorkReason: cleanText(
          terminalPeopleLocked
            ? current.remoteWorkReason
            : remoteWorkReason || current.remoteWorkReason,
          700
        ),
        remoteWorkConfidence: terminalPeopleLocked
          ? Number(current.remoteWorkConfidence || 0)
          : remoteConfidence,
        remoteInferenceVersion: terminalPeopleLocked
          ? Number(current.remoteInferenceVersion || 0)
          : 1,
        workMode: terminalPeopleLocked
          ? cleanText(current.workMode, 40).toLowerCase() || "unspecified"
          : nextWorkMode,
        supportModesReceived: terminalPeopleLocked
          ? normalizeSupportModesReceived(
              current.supportModesReceived,
              current.workMode
            )
          : nextSupportModesReceived,
        ...workflowUpdate,
        ...workflowFields,
        ...(workflowChangeAccepted
          ? {
              aiWorkflowDecision: {
                source: "ai",
                previousStage: currentWorkflowStage,
                workflowStatus: desiredWorkflowStage,
                reason: cleanText(workflowReason, 700),
                confidence: workflowDecisionConfidence,
                evidenceSlackTs: cleanText(triggerSlackTs, 180),
                decidedAtIso: nowIso,
                reviewed: false,
              },
            }
          : {}),
        ...(assignmentChanged
          ? {
              assignmentHistory: assignmentHistory.slice(-MAX_ASSIGNMENT_HISTORY),
              assignmentUpdatedAt: FieldValue.serverTimestamp(),
            }
          : {}),
        ...(participantChanged
          ? {
              participationHistory: participationHistory.slice(
                -MAX_PARTICIPATION_HISTORY
              ),
              participationUpdatedAt: FieldValue.serverTimestamp(),
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
        analysisChangedParticipation: participantChanged,
        analysisParticipationReason: cleanText(participationReason, 700),
        analysisParticipationConfidence: Number(
          participationConfidence || 0
        ),
        analysisChangedPriority: categoryChanged,
        analysisPriorityTier: categoryChanged ? requestedTier : previousTier,
        analysisPriorityReason: categoryReason,
        analysisPriorityConfidence: categoryConfidence,
        analysisChangedRemoteWork: remoteChangeAccepted,
        analysisRemoteWorkActive: nextRemoteActive,
        analysisRemoteWorkReason: cleanText(remoteWorkReason, 700),
        analysisRemoteWorkConfidence: remoteConfidence,
        analysisChangedWorkflow: workflowChangeAccepted,
        analysisWorkflowStatus: desiredWorkflowStage,
        analysisWorkflowReason: cleanText(workflowReason, 700),
        analysisWorkflowConfidence: workflowDecisionConfidence,
        analysisMemoryIds: memoryIds.slice(0, 5),
        analyzedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return {
      changed: assignmentChanged,
      participationChanged: participantChanged,
      priorityChanged: categoryChanged,
      remoteChanged: remoteChangeAccepted,
      remoteWorkActive: nextRemoteActive,
      workflowChanged: workflowChangeAccepted,
      workflowStatus: desiredWorkflowStage,
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

async function retainMessageLogForCalendar(ref) {
  const snapshot = await ref.collection(MESSAGE_SUBCOLLECTION).get();
  const rows = snapshot.docs.filter((document) =>
    shouldRetainOpsCalendarMessage(document.data()?.text)
  );
  for (let offset = 0; offset < rows.length; offset += 400) {
    const batch = requireDb().batch();
    rows.slice(offset, offset + 400).forEach((document) => {
      const data = document.data() || {};
      const sender = normalizeAssignees([data.sender])[0] || {
        id: "",
        name: "Unknown",
      };
      batch.set(
        ref.collection(CALENDAR_SUBCOLLECTION).doc(document.id),
        {
          slackTs: cleanText(data.slackTs || document.id, 180),
          sender,
          candidates: normalizeAssignees(data.candidates),
          text: cleanText(data.text, 700),
          workMode: cleanText(data.workMode, 40) || inferOpsWorkMode(data.text),
          recordedAt: data.receivedAt || FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });
    await batch.commit();
  }
  return (await ref.collection(CALENDAR_SUBCOLLECTION).get()).size;
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
        summaryMissing: false,
        summaryWarning: FieldValue.delete(),
        completedBy: cleanText(completedBy, 180),
        ...(timestampToIso(current.completedAt)
          ? {}
          : { completedAt: FieldValue.serverTimestamp() }),
        trackingStoppedAt: FieldValue.delete(),
        partsReturnStatus:
          cleanText(current.partsReturnStatus, 40) === "none"
            ? "not_applicable"
            : "complete",
        assignmentSummary:
          cleanText(
            current.responsibilityReconciliationLatest?.summary,
            700
          ) || "Done — final summary saved.",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return false;
  });
  if (alreadyCompleted) {
    return { deletedMessages: 0, idempotentReplay: true };
  }
  return { deletedMessages: 0, idempotentReplay: false };
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
        summaryMissing: false,
        summaryWarning: FieldValue.delete(),
        serviceCompletedBy: cleanText(completedBy, 180),
        ...(timestampToIso(current.serviceCompletedAt)
          ? {}
          : { serviceCompletedAt: FieldValue.serverTimestamp() }),
        assignmentSummary:
          cleanText(
            current.responsibilityReconciliationLatest?.summary,
            700
          ) || "Service complete — awaiting final reporting and closeout.",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return serializeWorkOrder(await ref.get());
}

export async function closeOpsWorkOrder(
  workOrderId,
  closedBy = "Magmo admin"
) {
  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    if (currentStage === "closed") return;
    const workflowUpdate = buildWorkflowTransitionUpdate(current, "closed", {
      changedBy: closedBy,
      source: "closed",
      reason: "The work order was archived in the Closed stage from Magmo Ops.",
    });
    transaction.set(
      ref,
      {
        ...workflowUpdate,
        status: "closed",
        closedBy: cleanText(closedBy, 180),
        closedAt: FieldValue.serverTimestamp(),
        trackingStoppedAt: FieldValue.serverTimestamp(),
        assignmentSummary: "Closed — retained for operational history.",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  const retainedCalendarEntries = await retainMessageLogForCalendar(ref);
  const deletedMessages = await deleteMessageLog(ref);
  await ref.set(
    {
      messageCount: 0,
      calendarEntryCount: retainedCalendarEntries,
      chatLogDeletedAt: FieldValue.serverTimestamp(),
      chatLogDeletedReason: "closed",
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return {
    ...serializeWorkOrder(await ref.get()),
    deletedMessages,
    retainedCalendarEntries,
  };
}

export async function reopenOpsWorkOrder(
  workOrderId,
  reopenedBy = "Magmo admin",
  requestedStage = "active",
  { scheduledFor = "", reason = "" } = {}
) {
  const ref = workOrderRef(workOrderId);
  const nowIso = new Date().toISOString();
  const normalizedRequestedStage = normalizeWorkflowStageValue(requestedStage);
  const allowedStages = new Set([
    "unassigned",
    "remote",
    "active",
    "scheduled",
    "on_hold",
    "inactive",
  ]);
  const normalizedDate = cleanText(scheduledFor, 20);
  const normalizedReason = cleanText(reason, 700);
  if (normalizedRequestedStage === "scheduled") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
      throw new Error("Choose the date this work order is scheduled for.");
    }
    if (normalizedDate <= opsLocalDateKey()) {
      throw new Error("Scheduled work must be set for tomorrow or a later date.");
    }
  }
  if (normalizedRequestedStage === "on_hold" && !normalizedReason) {
    throw new Error("Add the specific reason this work order is on hold.");
  }
  let transition = { from: "", to: "" };
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    if (!['service_complete', 'done', 'closed'].includes(currentStage)) {
      throw new Error("Only service-complete, done, or closed work orders can be reopened.");
    }
    const nextStage = allowedStages.has(normalizedRequestedStage)
      ? normalizedRequestedStage
      : normalizeAssignees(current.bluefolderAssignees).length
        ? "active"
        : Boolean(current.remoteWorkActive)
          ? "remote"
          : "unassigned";
    const transitionReason =
      normalizedReason ||
      (nextStage === "scheduled"
        ? `Scheduled for ${normalizedDate}.`
        : `${WORKFLOW_STAGE_LABELS[currentStage]} was reopened to ${WORKFLOW_STAGE_LABELS[nextStage]}.`);
    const workflowUpdate = buildWorkflowTransitionUpdate(current, nextStage, {
      changedBy: reopenedBy,
      source: "reopen",
      reason: transitionReason,
      nowIso,
    });
    const stageFields = {
      scheduledFor:
        nextStage === "scheduled" ? normalizedDate : FieldValue.delete(),
      scheduledReason:
        nextStage === "scheduled" ? transitionReason : FieldValue.delete(),
      holdReason:
        nextStage === "on_hold" ? normalizedReason : FieldValue.delete(),
      holdStartedAt:
        nextStage === "on_hold"
          ? FieldValue.serverTimestamp()
          : FieldValue.delete(),
      inactiveReason:
        nextStage === "inactive"
          ? normalizedReason || "Moved to Inactive manually."
          : FieldValue.delete(),
      inactiveAt:
        nextStage === "inactive"
          ? FieldValue.serverTimestamp()
          : FieldValue.delete(),
    };
    transaction.set(
      ref,
      {
        ...workflowUpdate,
        ...stageFields,
        status: "active",
        reopenedAt: FieldValue.serverTimestamp(),
        reopenedAtIso: nowIso,
        reopenedBy: cleanText(reopenedBy, 180),
        completedAt: FieldValue.delete(),
        completedBy: FieldValue.delete(),
        serviceCompletedAt: FieldValue.delete(),
        serviceCompletedBy: FieldValue.delete(),
        closedAt: FieldValue.delete(),
        closedBy: FieldValue.delete(),
        trackingStoppedAt: FieldValue.delete(),
        assignmentSummary: `Reopened to ${WORKFLOW_STAGE_LABELS[nextStage]}.`,
        ...(["unassigned", "active", "remote"].includes(nextStage)
          ? {
              lastActivityAt: FieldValue.serverTimestamp(),
              lastActivityAtIso: nowIso,
            }
          : {}),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    transition = { from: currentStage, to: nextStage };
  });
  return { workOrder: serializeWorkOrder(await ref.get()), transition };
}

export async function resetOpsAssignmentAnalysis(workOrderId) {
  const ref = workOrderRef(workOrderId);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    throw new Error(`Ops work order ${workOrderId} does not exist.`);
  }
  const current = snapshot.data() || {};
  const protectedAssignees = normalizeAssignees(current.bluefolderAssignees);
  const initialAssignees = protectedAssignees;
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
        ? "BlueFolder engineers remain protected; Slack assignment and participation analysis was reset."
        : "No remote or physical worker is assigned after the analysis reset.",
      assignmentConfidence: 1,
      assignmentHistory: [initialAssignmentEntry(initialAssignees, createdAtIso)],
      participants: [],
      participationSummary: "No participation recorded yet.",
      participationDecisionReason: "Participation analysis was reset.",
      participationHistory: [],
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
  const slackEvidence = evaluateDispatchEvidence(workOrder, process.env);
  if (!slackEvidence.eligible) {
    const error = new Error(slackEvidence.message);
    error.code = slackEvidence.code;
    throw error;
  }
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
    const latest = history[history.length - 1];
    if (
      latest &&
      !replaceHistory &&
      !finalSummary &&
      !materiallyDifferentUpdate(latest, entry)
    ) {
      transaction.set(
        ref,
        {
          summaryLastSlackTs: cleanText(throughSlackTs, 180),
          summaryInputTokens: FieldValue.increment(Number(usage?.inputTokens || 0)),
          summaryOutputTokens: FieldValue.increment(Number(usage?.outputTokens || 0)),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      return { ...latest, noMaterialChange: true };
    }
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
    responsibilityReconciliation: normalizeTerminalResponsibility(
      report?.responsibilityReconciliation,
      normalizedType
    ),
    usage: {
      inputTokens: Math.max(0, Number(report?.usage?.inputTokens || 0)),
      outputTokens: Math.max(0, Number(report?.usage?.outputTokens || 0)),
    },
    reportType: normalizedType,
  };
}

function normalizeCommandResponsibility(value, reportType) {
  const confidence = Math.max(0, Math.min(1, Number(value?.confidence || 0)));
  if (
    !["service_complete", "final"].includes(reportType) ||
    !value ||
    typeof value !== "object"
  ) {
    return { apply: false, confidence: 0, phases: [], participants: [], finalAssignees: [] };
  }
  const phaseKeys = new Set();
  const phases = (Array.isArray(value.phases) ? value.phases : [])
    .map((phase) => {
      const slackUserId = cleanText(phase?.slackUserId, 80);
      const name = cleanText(phase?.name, 100);
      const workMode = cleanText(phase?.workMode, 30).toLowerCase();
      const phaseName = cleanText(phase?.phase, 30).toLowerCase();
      const phaseConfidence = Math.max(
        0,
        Math.min(1, Number(phase?.confidence || 0))
      );
      const key = [slackUserId, workMode, phaseName].join("::");
      if (
        !/^U[A-Z0-9]{6,}$/i.test(slackUserId) ||
        !name ||
        !["remote", "physical"].includes(workMode) ||
        !["initial", "active", "final"].includes(phaseName) ||
        phaseConfidence < 0.8 ||
        phaseKeys.has(key)
      ) {
        return null;
      }
      phaseKeys.add(key);
      return {
        slackUserId,
        name,
        workMode,
        phase: phaseName,
        evidenceType: cleanText(phase?.evidenceType, 60),
        evidence: cleanText(phase?.evidence, 500),
        evidenceSlackTs: cleanText(phase?.evidenceSlackTs, 80),
        confidence: phaseConfidence,
      };
    })
    .filter(Boolean)
    .slice(0, 12);
  const phaseByFinalId = new Map(
    phases
      .filter((phase) => phase.phase === "final")
      .map((phase) => [phase.slackUserId, phase])
  );
  const finalAssignees = normalizeAssignees(value.finalAssignees).filter(
    (person) =>
      /^U[A-Z0-9]{6,}$/i.test(person.id) &&
      phaseByFinalId.has(person.id) &&
      phaseByFinalId.get(person.id).name === person.name
  );
  const workerIds = new Set(phases.map((phase) => phase.slackUserId));
  const participants = normalizeAssignees(value.participants).filter(
    (person) => /^U[A-Z0-9]{6,}$/i.test(person.id) && !workerIds.has(person.id)
  );
  return {
    apply: Boolean(value.apply && confidence >= 0.84 && finalAssignees.length),
    confidence,
    summary: cleanText(value.summary, 700),
    decisionReason: cleanText(value.decisionReason, 700),
    phases,
    participants,
    finalAssignees,
  };
}

function buildCommandResponsibilityUpdate(
  current,
  reconciliation,
  reportType,
  safeTs,
  commandTs,
  generatedAtIso
) {
  if (!reconciliation?.apply) return {};
  const exclusions = normalizeAssignmentExclusions(current.assignmentExclusions);
  const finalAssignees = normalizeAssignees(
    reconciliation.finalAssignees
  ).filter(
    (person) =>
      !exclusions.some((exclusion) => opsPersonMatchesIdentity(person, exclusion))
  );
  if (!finalAssignees.length) return {};
  const workerIds = new Set(
    reconciliation.phases.map((phase) => phase.slackUserId)
  );
  const previousAssignees = normalizeAssignees(current.assignees);
  const previousParticipants = normalizeAssignees(current.participants);
  const participants = withoutAssignees(
    normalizeAssignees([
      ...previousParticipants,
      ...reconciliation.participants,
    ]).filter((person) => !workerIds.has(person.id)),
    finalAssignees
  );
  const id = commandResponsibilityId(reportType, safeTs);
  const reason =
    reconciliation.decisionReason ||
    reconciliation.summary ||
    "Full Slack thread reconciled at terminalization.";
  const assignmentHistory = normalizeAssignmentHistory(
    current.assignmentHistory
  ).filter((entry) => entry.id !== id);
  assignmentHistory.push({
    id,
    source: "command_reconciliation",
    previousAssignees,
    assignees: finalAssignees,
    reason,
    triggerMessage: "Full Slack thread reconciled when the terminal command was processed.",
    triggerSender: "Magmo done report",
    triggerSlackTs: commandTs,
    confidence: reconciliation.confidence,
    changedAtIso: generatedAtIso,
  });
  const participationHistory = normalizeParticipationHistory(
    current.participationHistory
  ).filter((entry) => entry.id !== `participation-${id}`);
  if (participants.length) {
    participationHistory.push({
      id: `participation-${id}`,
      source: "command_reconciliation",
      previousParticipants,
      participants,
      reason: "Advice or coordination was kept separate from hands-on responsibility.",
      triggerMessage: "Full Slack thread terminal reconciliation.",
      triggerSender: "Magmo done report",
      triggerSlackTs: commandTs,
      confidence: reconciliation.confidence,
      changedAtIso: generatedAtIso,
    });
  }
  const reconciliationEntry = {
    id,
    reportType,
    throughSlackTs: commandTs,
    summary: reconciliation.summary,
    decisionReason: reason,
    confidence: reconciliation.confidence,
    phases: reconciliation.phases,
    finalAssignees,
    participants: reconciliation.participants,
    generatedAtIso,
  };
  const reconciliationHistory = (Array.isArray(
    current.responsibilityReconciliationHistory
  )
    ? current.responsibilityReconciliationHistory
    : []
  ).filter((entry) => entry?.id !== id);
  reconciliationHistory.push(reconciliationEntry);
  const modes = new Set(finalAssignees.map((person) => person.workMode));
  const workMode =
    modes.size > 1 ? "mixed" : modes.has("physical") ? "in_person" : "remote";
  const supportModesReceived = normalizeSupportModesReceived(
    current.supportModesReceived,
    reconciliation.phases.map((phase) => phase.workMode),
    workMode
  );
  return {
    assignees: finalAssignees,
    participants,
    assignmentSummary:
      reconciliation.summary ||
      `Final hands-on responsibility: ${finalAssignees
        .map((person) => person.name)
        .join(", ")}.`,
    assignmentDecisionReason: reason,
    assignmentConfidence: reconciliation.confidence,
    assignmentHistory: assignmentHistory.slice(-MAX_ASSIGNMENT_HISTORY),
    participationHistory: participationHistory.slice(-MAX_PARTICIPATION_HISTORY),
    workMode,
    supportModesReceived,
    responsibilityReconciliationLatest: reconciliationEntry,
    responsibilityReconciliationHistory: reconciliationHistory.slice(-25),
    responsibilityReconciledAt: FieldValue.serverTimestamp(),
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
    workOrderId: workOrder.workOrderId,
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
    assignees: workOrder.assignees.slice(0, 12),
    participants: workOrder.participants.slice(0, 12),
    bluefolderAssignees: workOrder.bluefolderAssignees.slice(0, 12),
    dispatchStatus: workOrder.dispatchStatus,
    slackChannel: workOrder.slackChannel,
    slackThreadTs: workOrder.slackThreadTs,
    slackPermalink: workOrder.slackPermalink,
    dispatchedAt: workOrder.dispatchedAt,
    dispatchedBy: workOrder.dispatchedBy,
    latestOpsSummary: cleanText(latestUpdate?.summary, 900),
    latestPartsSummary: cleanText(latestParts?.summary, 700),
    summaryLastSlackTs: cleanText(
      latestUpdate?.throughSlackTs || snapshot.data()?.summaryLastSlackTs,
      80
    ),
    partsLastSlackTs: cleanText(latestParts?.throughSlackTs, 80),
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
    const responsibilityUpdate = buildCommandResponsibilityUpdate(
      current,
      normalizedReport.responsibilityReconciliation,
      normalizedType,
      safeTs,
      cleanCommandTs,
      generatedAtIso
    );
    const partEntry = {
      id: "parts-" + normalizedType + "-" + safeTs,
      summary: commandPartSummary(normalizedReport, normalizedType),
      state: normalizedReport.partsState,
      movements: normalizedReport.partMovements,
      outstanding: normalizedReport.partsOutstanding,
      reportType: normalizedType,
      generatedAtIso,
      throughSlackTs: cleanCommandTs,
      sourceMessageCount: messageCount,
    };
    const existingPartHistory = normalizePartMovements(
      current.partMovementsHistory,
      current.partMovementsLatest
    );
    const duplicatePartEntry = existingPartHistory.find(
      (entry) => entry.id === partEntry.id
    );
    if (duplicatePartEntry) {
      if (Object.keys(responsibilityUpdate).length) {
        transaction.set(ref, responsibilityUpdate, { merge: true });
      }
      return {
        workOrder: serializeWorkOrder(snapshot),
        reportEntry: null,
        partEntry: duplicatePartEntry,
        duplicate: true,
      };
    }
    const partHistory = existingPartHistory.filter(
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
      ...responsibilityUpdate,
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
      duplicate: false,
    };
  });

  let memoryIds = [];
  if (
    !result.duplicate &&
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
    partEntry: result.partEntry,
    reportEntry: result.reportEntry,
    duplicate: Boolean(result.duplicate),
    idempotentReplay: Boolean(result.duplicate),
    memoryIds,
  };
}

export function listOpsAssigneeOptions() {
  return Array.from(SLACK_IDENTITIES.byId.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function reviewOpsWorkflowDecision({
  workOrderId,
  correctedStage = "",
  feedbackReason = "",
  reviewedBy = "Magmo admin",
} = {}) {
  const ref = workOrderRef(workOrderId);
  const nowIso = new Date().toISOString();
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const decision =
      current.aiWorkflowDecision && typeof current.aiWorkflowDecision === "object"
        ? current.aiWorkflowDecision
        : {};
    const currentStage = normalizeWorkflowStage(
      current,
      normalizeAssignmentHistory(current.assignmentHistory)
    );
    const normalizedCorrection =
      normalizeWorkflowStageValue(correctedStage) || currentStage;
    transaction.set(
      ref,
      {
        aiWorkflowDecision: {
          ...decision,
          workflowStatus:
            normalizeWorkflowStageValue(decision.workflowStatus) || currentStage,
          reviewed: true,
          reviewedAtIso: nowIso,
          reviewedBy: cleanText(reviewedBy, 180),
          correctedStage: normalizedCorrection,
          feedbackReason: cleanText(feedbackReason, 700),
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  return serializeWorkOrder(await ref.get());
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
  const requestedAssignees = selectedAssignees;
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
    const nextStage = ["service_complete", "done", "closed"].includes(currentStage)
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
        participants: withoutAssignees(current.participants, nextAssignees),
        assignmentSummary: nextAssignees.length
          ? "Manually assigned to " + ownerNames + "."
          : "No remote or physical worker is assigned.",
        assignmentDecisionReason: reason,
        assignmentConfidence: 1,
        assignmentHistory: history.slice(-MAX_ASSIGNMENT_HISTORY),
        assignmentUpdatedAt: FieldValue.serverTimestamp(),
        supportModesReceived: normalizeSupportModesReceived(
          current.supportModesReceived,
          requested.map((person) => person.workMode)
        ),
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

export async function updateOpsPeople({
  workOrderId,
  role = "assignment",
  people = [],
  changedBy = "Magmo user",
}) {
  const normalizedRole = cleanText(role, 40).toLowerCase();
  if (!["assignment", "participation", "oversight"].includes(normalizedRole)) {
    throw new Error("Choose assignment, participation, or oversight.");
  }
  const requested = normalizeAssignees(
    (Array.isArray(people) ? people : [])
      .map((person) => {
        const id = normalizeId(person?.id);
        if (!id || !SLACK_IDENTITIES.byId.has(id)) return null;
        return {
          id,
          name: SLACK_IDENTITIES.byId.get(id),
          workMode: person?.workMode,
          scheduledDate: person?.scheduledDate,
        };
      })
      .filter(Boolean)
  );
  const requestedForRole =
    normalizedRole === "oversight"
      ? defaultOpsOversightManagers(requested)
      : requested;
  const ref = workOrderRef(workOrderId);
  let changed = false;
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) {
      throw new Error("Ops work order " + workOrderId + " does not exist.");
    }
    const current = snapshot.data() || {};
    const nowIso = new Date().toISOString();
    if (normalizedRole === "assignment") {
      const protectedAssignees = normalizeAssignees(current.bluefolderAssignees).map(
        (entry) => ({ ...entry, workMode: entry.workMode || "physical" })
      );
      const next = mergeAssignees(protectedAssignees, requested);
      const previous = normalizeAssignees(current.assignees);
      if (peopleDetailsMatch(previous, next)) return;
      changed = true;
      const reason = `Assignment updated manually in Magmo by ${cleanText(changedBy, 180)}.`;
      const history = normalizeAssignmentHistory(current.assignmentHistory);
      history.push({
        id: "manual-" + Date.now(),
        source: "manual",
        previousAssignees: previous,
        assignees: next,
        reason,
        triggerMessage: "",
        triggerSender: cleanText(changedBy, 100),
        triggerSlackTs: "",
        confidence: 1,
        changedAtIso: nowIso,
      });
      const currentStage = normalizeWorkflowStage(current, history);
      const remoteOnly = next.length > 0 && next.every((person) => person.workMode === "remote");
      const requestedStage = protectedAssignees.length
        ? "active"
        : remoteOnly
          ? "remote"
          : next.length
            ? "active"
            : "unassigned";
      const nextStage = ["service_complete", "done", "closed"].includes(currentStage)
        ? currentStage
        : requestedStage;
      transaction.set(ref, {
        assignees: next,
        participants: withoutAssignees(current.participants, next),
        assignmentSummary: next.length
          ? "Manually assigned to " + next.map((entry) => entry.name).join(", ") + "."
          : "No remote or physical worker is assigned.",
        assignmentDecisionReason: reason,
        assignmentConfidence: 1,
        assignmentHistory: history.slice(-MAX_ASSIGNMENT_HISTORY),
        assignmentUpdatedAt: FieldValue.serverTimestamp(),
        workflowStatus: nextStage,
        ...buildWorkflowTransitionUpdate(current, nextStage, {
          changedBy,
          source: "manual_assignment",
          reason,
          nowIso,
        }),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      return;
    }

    if (normalizedRole === "participation") {
      const next = withoutAssignees(requested, current.assignees);
      const previous = normalizeAssignees(current.participants);
      if (peopleDetailsMatch(previous, next)) return;
      changed = true;
      const reason = `Participation updated manually in Magmo by ${cleanText(changedBy, 180)}.`;
      const history = normalizeParticipationHistory(current.participationHistory);
      history.push({
        id: "manual-participation-" + Date.now(),
        source: "manual",
        previousParticipants: previous,
        participants: next,
        reason,
        triggerMessage: "",
        triggerSender: cleanText(changedBy, 100),
        triggerSlackTs: "",
        confidence: 1,
        changedAtIso: nowIso,
      });
      transaction.set(ref, {
        participants: next,
        participationSummary: next.length
          ? "Participation recorded for " + next.map((entry) => entry.name).join(", ") + "."
          : "No participation recorded yet.",
        participationDecisionReason: reason,
        participationHistory: history.slice(-MAX_PARTICIPATION_HISTORY),
        participationUpdatedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      return;
    }

    const previous = defaultOpsOversightManagers(current.oversightManagers);
    const nextOversightManagers = requestedForRole;
    if (peopleDetailsMatch(previous, nextOversightManagers)) return;
    changed = true;
    transaction.set(ref, {
      oversightManagers: nextOversightManagers,
      oversightSummary:
        "Clock-out oversight: " +
        nextOversightManagers.map((entry) => entry.name).join(", ") +
        ".",
      oversightUpdatedBy: cleanText(changedBy, 180),
      oversightUpdatedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  });

  const workOrder = serializeWorkOrder(await ref.get());
  if (changed) {
    await saveManualOpsMemory({
      workOrder,
      kind: `manual_${normalizedRole}_example`,
      summary:
        `An Ops admin confirmed ${normalizedRole} for this work order: ` +
        (requestedForRole.map((entry) => {
          const schedule = entry.scheduledDate ? ` on ${entry.scheduledDate}` : "";
          const mode = entry.workMode ? ` (${entry.workMode})` : "";
          return `${entry.name}${mode}${schedule}`;
        }).join(", ") || "none") + ".",
      assigneeNames: requestedForRole.map((entry) => entry.name),
      changedBy,
      sourceId: `manual-${normalizedRole}-${workOrder.id}-${Date.now()}`,
    }).catch((error) => {
      console.warn(`[Ops][memory][manual-${normalizedRole}]`, error?.message);
    });
  }
  return workOrder;
}

function opsPersonMatchesIdentity(person = {}, identity = {}) {
  const personId = cleanText(person.id, 80).toLowerCase();
  const slackUserId = cleanText(identity.slackUserId || identity.id, 80).toLowerCase();
  const personEmail = cleanText(person.email, 320).toLowerCase();
  const email = cleanText(identity.email, 320).toLowerCase();
  return Boolean(
    (personId && slackUserId && personId === slackUserId) ||
      (personEmail && email && personEmail === email)
  );
}

export async function reportOpsAssignmentDispute({
  workOrderId,
  requester = {},
  reason = "",
}) {
  const normalizedReason = cleanText(reason, 1200);
  if (normalizedReason.length < 8) {
    throw new Error("Explain why this work order was not your remote or physical assignment.");
  }
  const ref = workOrderRef(workOrderId);
  let disputeId = "";
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const identity = {
      uid: cleanText(requester.uid, 180),
      email: cleanText(requester.email, 320).toLowerCase(),
      name: cleanText(requester.name, 120),
      slackUserId: cleanText(requester.slackUserId, 80),
    };
    if (!identity.uid || !identity.email) {
      throw new Error("An authenticated requester is required.");
    }
    if (!normalizeAssignees(current.assignees).some((person) =>
      opsPersonMatchesIdentity(person, identity)
    )) {
      throw new Error("This work order is not currently assigned to you.");
    }
    const disputes = normalizeAssignmentDisputes(current.assignmentDisputes);
    const existingIndex = disputes.findIndex(
      (entry) => entry.requester.uid === identity.uid
    );
    const existing = existingIndex >= 0 ? disputes[existingIndex] : null;
    if (existing?.status === "pending") {
      disputeId = existing.id;
      return;
    }
    disputeId = existing?.id || `assignment-dispute-${messageId(identity.uid)}`;
    const nowIso = new Date().toISOString();
    const decisionHistory = existing?.decisionHistory
      ? existing.decisionHistory.slice(-24)
      : [];
    if (existing?.decision) decisionHistory.push(existing.decision);
    const next = {
      id: disputeId,
      type: "assignment_dispute",
      status: "pending",
      requester: identity,
      reason: normalizedReason,
      createdAtIso: existing?.createdAtIso || nowIso,
      updatedAtIso: nowIso,
      revision: Math.max(0, Number(existing?.revision || 0)) + 1,
      protectedByBlueFolder: normalizeAssignees(current.bluefolderAssignees).some(
        (person) => opsPersonMatchesIdentity(person, identity)
      ),
      applied: false,
      decision: null,
      decisionHistory,
      slackDm: null,
    };
    if (existingIndex >= 0) disputes[existingIndex] = next;
    else disputes.push(next);
    transaction.set(
      ref,
      {
        assignmentDisputes: disputes.slice(-MAX_ASSIGNMENT_DISPUTES),
        assignmentDisputePending: true,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  const workOrder = serializeWorkOrder(await ref.get());
  return {
    workOrder,
    dispute: workOrder.assignmentDisputes.find((entry) => entry.id === disputeId),
  };
}

export async function removeOpsSelfAssignment({
  workOrderId,
  requester = {},
  reason = "",
}) {
  const normalizedReason = cleanText(reason, 1200);
  if (normalizedReason.length < 8) {
    throw new Error("Explain why this work order was not your remote or physical assignment.");
  }
  const identity = {
    uid: cleanText(requester.uid, 180),
    email: cleanText(requester.email, 320).toLowerCase(),
    name: cleanText(requester.name, 120),
    slackUserId: cleanText(requester.slackUserId, 80),
  };
  if (!identity.uid || !identity.email || !identity.slackUserId) {
    throw new Error("Your Magmo login must match Slack before removing an assignment.");
  }

  const ref = workOrderRef(workOrderId);
  const nowIso = new Date().toISOString();
  const exclusionId = `assignment-exclusion-${messageId(
    identity.slackUserId || identity.email
  )}`;
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const previousAssignees = normalizeAssignees(current.assignees);
    const requesterPerson = previousAssignees.find((person) =>
      opsPersonMatchesIdentity(person, identity)
    );
    if (!requesterPerson) {
      throw new Error("This work order is not currently assigned to you.");
    }
    if (
      normalizeAssignees(current.bluefolderAssignees).some((person) =>
        opsPersonMatchesIdentity(person, identity)
      )
    ) {
      throw new Error(
        "This is the dispatched engineer in BlueFolder. Correct the Assigned To record in BlueFolder first so Magmo stays aligned with the dispatch source of truth."
      );
    }
    const nextAssignees = withoutAssignees(previousAssignees, [requesterPerson]);
    const history = normalizeAssignmentHistory(current.assignmentHistory);
    history.push({
      id: `self-assignment-correction-${Date.now()}`,
      source: "self_assignment_correction",
      previousAssignees,
      assignees: nextAssignees,
      reason: normalizedReason,
      triggerMessage: normalizedReason,
      triggerSender: identity.name,
      triggerSlackTs: "",
      confidence: 1,
      changedAtIso: nowIso,
    });

    const exclusions = normalizeAssignmentExclusions(current.assignmentExclusions);
    const existingExclusion = exclusions.findIndex(
      (entry) => entry.id === exclusionId || opsPersonMatchesIdentity(entry, identity)
    );
    const exclusion = {
      id: exclusionId,
      ...identity,
      reason: normalizedReason,
      source: "master_self_correction",
      createdAtIso: nowIso,
    };
    if (existingExclusion >= 0) exclusions[existingExclusion] = exclusion;
    else exclusions.push(exclusion);

    const disputes = normalizeAssignmentDisputes(current.assignmentDisputes);
    const disputeId = `assignment-dispute-${messageId(identity.uid)}`;
    const disputeIndex = disputes.findIndex((entry) => entry.id === disputeId);
    const previousDispute = disputeIndex >= 0 ? disputes[disputeIndex] : null;
    const decision = {
      approved: true,
      status: "approved",
      note: "Master admin removed their own incorrect assignment.",
      byUid: identity.uid,
      byEmail: identity.email,
      byName: identity.name,
      decidedAtIso: nowIso,
    };
    const dispute = {
      id: disputeId,
      type: "assignment_dispute",
      status: "approved",
      requester: identity,
      reason: normalizedReason,
      createdAtIso: previousDispute?.createdAtIso || nowIso,
      updatedAtIso: nowIso,
      revision: Math.max(0, Number(previousDispute?.revision || 0)) + 1,
      protectedByBlueFolder: normalizeAssignees(current.bluefolderAssignees).some(
        (person) => opsPersonMatchesIdentity(person, identity)
      ),
      applied: true,
      decision,
      decisionHistory: previousDispute?.decision
        ? [...(previousDispute.decisionHistory || []), previousDispute.decision].slice(-25)
        : previousDispute?.decisionHistory || [],
      slackDm: null,
    };
    if (disputeIndex >= 0) disputes[disputeIndex] = dispute;
    else disputes.push(dispute);

    const reasonText = `Assignment removed by ${identity.name || identity.email}: ${normalizedReason}`;
    const currentStage = normalizeWorkflowStage(current, history);
    const nextStage = ["unassigned", "active", "remote"].includes(currentStage)
      ? nextAssignees.length
        ? nextAssignees.every((person) => person.workMode === "remote")
          ? "remote"
          : "active"
        : "unassigned"
      : currentStage;
    transaction.set(
      ref,
      {
        assignees: nextAssignees,
        assignmentExclusions: exclusions.slice(-50),
        assignmentSummary: nextAssignees.length
          ? `Assigned to ${nextAssignees.map((entry) => entry.name).join(", ")}.`
          : "No remote or physical worker is assigned.",
        assignmentDecisionReason: reasonText,
        assignmentConfidence: 1,
        assignmentHistory: history.slice(-MAX_ASSIGNMENT_HISTORY),
        assignmentDisputes: disputes.slice(-MAX_ASSIGNMENT_DISPUTES),
        assignmentDisputePending: disputes.some((entry) => entry.status === "pending"),
        assignmentUpdatedAt: FieldValue.serverTimestamp(),
        ...(nextStage !== currentStage
          ? buildWorkflowTransitionUpdate(current, nextStage, {
              changedBy: identity.email,
              source: "self_assignment_correction",
              reason: reasonText,
              nowIso,
            })
          : {}),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });

  const workOrder = serializeWorkOrder(await ref.get());
  await saveManualOpsMemory({
    workOrder,
    kind: "manual_assignment_example",
    summary: `${identity.name || identity.email} was incorrectly classified as a remote or physical worker. Correction: ${normalizedReason}`,
    assigneeNames: [identity.name || identity.email],
    polarity: "negative",
    changedBy: identity.email,
    sourceId: `self-assignment-correction-${workOrder.id}-${exclusionId}`,
  }).catch((error) => {
    console.warn("[Ops][memory][self-assignment-correction]", error?.message);
  });
  return workOrder;
}

export async function listPendingOpsAssignmentDisputes() {
  const snapshot = await requireDb()
    .collection(OPS_WORK_ORDER_COLLECTION)
    .limit(500)
    .get();
  return snapshot.docs
    .filter((document) => !document.data()?.deletedAt)
    .flatMap((document) => {
      const workOrder = serializeWorkOrder(document);
      return workOrder.assignmentDisputes
        .filter((entry) => entry.status === "pending")
        .map((entry) => ({
          ...entry,
          workOrder: {
            id: workOrder.id,
            number: workOrder.number,
            subject: workOrder.subject,
          },
        }));
    })
    .sort(
      (left, right) =>
        Date.parse(left.createdAtIso || 0) - Date.parse(right.createdAtIso || 0)
    );
}

export async function reviewOpsAssignmentDispute({
  workOrderId,
  disputeId,
  approved,
  decidedBy = {},
  note = "",
}) {
  const ref = workOrderRef(workOrderId);
  let idempotent = false;
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || snapshot.data()?.deletedAt) {
      throw new Error(`Ops work order ${workOrderId} does not exist.`);
    }
    const current = snapshot.data() || {};
    const disputes = normalizeAssignmentDisputes(current.assignmentDisputes);
    const index = disputes.findIndex((entry) => entry.id === cleanText(disputeId, 180));
    if (index < 0) throw new Error("That assignment review no longer exists.");
    const dispute = disputes[index];
    if (dispute.status !== "pending") {
      idempotent = true;
      return;
    }
    const previousAssignees = normalizeAssignees(current.assignees);
    const protectedByBlueFolder = normalizeAssignees(current.bluefolderAssignees).some(
      (person) => opsPersonMatchesIdentity(person, dispute.requester)
    );
    const requesterPerson = previousAssignees.find((person) =>
      opsPersonMatchesIdentity(person, dispute.requester)
    );
    const nextAssignees = approved && requesterPerson && !protectedByBlueFolder
      ? withoutAssignees(previousAssignees, [requesterPerson])
      : previousAssignees;
    const applied = approved && nextAssignees.length !== previousAssignees.length;
    const nowIso = new Date().toISOString();
    const decisionNote = protectedByBlueFolder && approved
      ? `${cleanText(note, 900)} BlueFolder still lists this engineer as dispatched, so its protected assignment was retained.`.trim()
      : cleanText(note, 1200);
    const decision = {
      approved: Boolean(approved),
      status: approved ? "approved" : "denied",
      note: decisionNote,
      byUid: cleanText(decidedBy.uid, 180),
      byEmail: cleanText(decidedBy.email, 320).toLowerCase(),
      byName: cleanText(decidedBy.name || decidedBy.email, 120),
      decidedAtIso: nowIso,
    };
    disputes[index] = {
      ...dispute,
      status: approved ? "approved" : "denied",
      protectedByBlueFolder,
      applied,
      decision,
      updatedAtIso: nowIso,
    };
    const update = {
      assignmentDisputes: disputes,
      assignmentDisputePending: disputes.some((entry) => entry.status === "pending"),
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (applied) {
      const reasonText = `Assignment mismatch approved by ${decision.byName || "Magmo owner"}.`;
      const history = normalizeAssignmentHistory(current.assignmentHistory);
      history.push({
        id: `assignment-dispute-${Date.now()}`,
        source: "assignment_dispute",
        previousAssignees,
        assignees: nextAssignees,
        reason: reasonText,
        triggerMessage: dispute.reason,
        triggerSender: dispute.requester.name,
        triggerSlackTs: "",
        confidence: 1,
        changedAtIso: nowIso,
      });
      Object.assign(update, {
        assignees: nextAssignees,
        participants: withoutAssignees(current.participants, nextAssignees),
        assignmentSummary: nextAssignees.length
          ? `Assigned to ${nextAssignees.map((entry) => entry.name).join(", ")}.`
          : "No remote or physical worker is assigned.",
        assignmentDecisionReason: reasonText,
        assignmentConfidence: 1,
        assignmentHistory: history.slice(-MAX_ASSIGNMENT_HISTORY),
        assignmentUpdatedAt: FieldValue.serverTimestamp(),
      });
      const currentStage = normalizeWorkflowStage(current, history);
      if (["unassigned", "active", "remote"].includes(currentStage)) {
        const remoteOnly =
          nextAssignees.length > 0 &&
          nextAssignees.every((person) => person.workMode === "remote");
        const nextStage = nextAssignees.length
          ? remoteOnly
            ? "remote"
            : "active"
          : "unassigned";
        Object.assign(
          update,
          buildWorkflowTransitionUpdate(current, nextStage, {
            changedBy: decision.byEmail || decision.byUid,
            source: "assignment_dispute",
            reason: reasonText,
            nowIso,
          })
        );
      }
    }
    transaction.set(ref, update, { merge: true });
  });
  const workOrder = serializeWorkOrder(await ref.get());
  const reviewedDispute = workOrder.assignmentDisputes.find(
    (entry) => entry.id === cleanText(disputeId, 180)
  );
  if (!idempotent && reviewedDispute?.status === "approved") {
    await saveManualOpsMemory({
      workOrder,
      kind: "manual_assignment_example",
      summary:
        `${reviewedDispute.requester.name || reviewedDispute.requester.email} was incorrectly classified as a remote or physical worker. ` +
        `Correction: ${reviewedDispute.reason}`,
      assigneeNames: [
        reviewedDispute.requester.name || reviewedDispute.requester.email,
      ],
      polarity: "negative",
      changedBy:
        cleanText(decidedBy.email, 320).toLowerCase() ||
        cleanText(decidedBy.name, 120),
      sourceId: `assignment-dispute-${workOrder.id}-${reviewedDispute.id}-${reviewedDispute.revision}`,
    }).catch((error) => {
      console.warn("[Ops][memory][assignment-dispute]", error?.message);
    });
  }
  return {
    workOrder,
    dispute: reviewedDispute,
    idempotent,
  };
}

export async function recordOpsAssignmentDisputeSlackDelivery({
  workOrderId,
  disputeId,
  status,
  ts = "",
  error = "",
}) {
  const ref = workOrderRef(workOrderId);
  await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) return;
    const disputes = normalizeAssignmentDisputes(snapshot.data()?.assignmentDisputes);
    const index = disputes.findIndex((entry) => entry.id === cleanText(disputeId, 180));
    if (index < 0) return;
    disputes[index] = {
      ...disputes[index],
      slackDm: {
        status: cleanText(status, 40),
        ts: cleanText(ts, 80),
        error: cleanText(error, 500),
        attemptedAtIso: new Date().toISOString(),
      },
    };
    transaction.set(ref, { assignmentDisputes: disputes }, { merge: true });
  });
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
  reason = "",
  correctedTier = "",
  changedBy = "Magmo admin",
}) {
  const normalizedVote = cleanText(vote, 20).toLowerCase();
  if (!new Set(["up", "neutral", "down"]).has(normalizedVote)) {
    throw new Error("Choose thumbs up, unsure, or thumbs down.");
  }
  const normalizedReason = cleanText(reason, 1200);
  if (normalizedVote === "down" && !normalizedReason) {
    throw new Error("Explain why the category is incorrect.");
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
    reason: normalizedReason,
    correctedTier: PRIORITY_TIERS.has(cleanText(correctedTier, 60))
      ? cleanText(correctedTier, 60)
      : "",
    changedBy: cleanText(changedBy, 180),
    createdAt: FieldValue.serverTimestamp(),
  };

  if (normalizedVote === "up" || normalizedVote === "neutral") {
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
    if (normalizedVote === "neutral") {
      return { vote: normalizedVote, affectedIds: [workOrder.id], workOrders: [workOrder] };
    }
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
  const fallbackTier = feedbackRecord.correctedTier || feedbackFallbackTier(rejectedTier);
  const affectedIds = [];
  activeDocuments.forEach((snapshot, index) => {
    const data = snapshot.data() || {};
    const previousTier = normalizePriorityTier(data.priorityTier);
    const history = normalizePriorityHistory(data.priorityHistory);
    const reason =
      `${rejectedLabel} was rejected by ${cleanText(changedBy, 180)}. ` +
      `${normalizedReason} ` +
      (feedbackRecord.correctedTier
        ? `It was corrected to ${normalizePriorityLabel(fallbackTier)}.`
        : "The work order was moved temporarily and queued for AI reclassification.");
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
        prioritySource: feedbackRecord.correctedTier
          ? "admin_feedback"
          : "feedback_pending",
        priorityHistory: history.slice(-MAX_PRIORITY_HISTORY),
        priorityFeedback: feedbackRecord,
        priorityFeedbackHistory: feedbackHistory,
        priorityReclassificationRequested: !feedbackRecord.correctedTier,
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
      `An Ops admin rejected ${rejectedLabel} for this operational situation. ` +
      `${normalizedReason}` +
      (feedbackRecord.correctedTier
        ? ` The correct category was ${normalizePriorityLabel(fallbackTier)}.`
        : ""),
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
