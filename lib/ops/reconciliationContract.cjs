"use strict";

const {
  latestRecoveryCommand,
} = require("./recoveryState.cjs");

const ACTIVE_STAGES = new Set([
  "unassigned",
  "active",
  "remote",
  "scheduled",
  "on_hold",
  "inactive",
]);
const TERMINAL_STAGES = new Set(["service_complete", "done", "closed"]);
const ALL_STAGES = new Set([...ACTIVE_STAGES, ...TERMINAL_STAGES]);
const STANDARD_PRIORITY_TIERS = new Set([
  "hard_down",
  "in_progress",
  "needs_scheduled",
  "anytime",
]);
const GENERATED_PRIORITY_PATTERN = /^generated_[a-z0-9]+(?:_[a-z0-9]+){0,4}$/;
const PRIORITY_LABELS = {
  hard_down: "Hard down",
  in_progress: "ASAP",
  needs_scheduled: "Soon",
  anytime: "Anytime",
};
const MANUAL_ASSIGNMENT_SOURCES = new Set([
  "manual",
  "manual_assignment",
  "admin",
  "admin_correction",
  "assignment_dispute",
  "self_assignment_correction",
  "service_request",
]);
const MANUAL_PARTICIPATION_SOURCES = new Set([
  "manual",
  "manual_participation",
  "admin",
  "admin_correction",
]);
const MANUAL_STAGE_SOURCES = new Set([
  "manual_stage_move",
  "manual_assignment",
  "assignment_dispute",
  "admin_correction",
]);
const MANUAL_PRIORITY_SOURCES = new Set([
  "manual",
  "admin",
  "admin_feedback",
]);

function clean(value, maxLength = 1200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeStage(value) {
  const stage = clean(value, 60).toLowerCase().replace(/[\s-]+/g, "_");
  if (["processing", "open", "in_progress"].includes(stage)) return "active";
  if (["complete", "completed"].includes(stage)) return "done";
  return ALL_STAGES.has(stage) ? stage : "";
}

function normalizePriorityTier(value) {
  const tier = clean(value, 60).toLowerCase();
  return STANDARD_PRIORITY_TIERS.has(tier) || GENERATED_PRIORITY_PATTERN.test(tier)
    ? tier
    : "";
}

function priorityLabel(tier, supplied = "") {
  if (PRIORITY_LABELS[tier]) return PRIORITY_LABELS[tier];
  return (
    clean(supplied, 80).replace(/\s*\(Generated\)\s*$/i, "") ||
    tier
      .replace(/^generated_/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
  );
}

function personKey(person = {}) {
  const id = clean(person.id, 120).toLowerCase();
  const email = clean(person.email, 320).toLowerCase();
  const name = clean(person.name || person, 180)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return id || email || name;
}

function normalizePeople(value = []) {
  const result = [];
  const byName = new Map();
  const byIdentity = new Map();
  for (const raw of Array.isArray(value) ? value : []) {
    const name = clean(raw?.name || raw, 180);
    const id = clean(raw?.id, 120);
    const email = clean(raw?.email, 320).toLowerCase();
    const requestedMode = clean(raw?.workMode || raw?.mode, 30).toLowerCase();
    const workMode = ["remote", "physical"].includes(requestedMode)
      ? requestedMode
      : "";
    const scheduledDate = /^\d{4}-\d{2}-\d{2}$/.test(
      clean(raw?.scheduledDate, 20)
    )
      ? clean(raw.scheduledDate, 20)
      : "";
    if (!name || /^(?:magmo|slack bot)$/i.test(name)) continue;
    const normalizedName = name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const identity = id.toLowerCase() || email;
    const identityIndex = identity ? byIdentity.get(identity) : undefined;
    const existingIndex = Number.isInteger(identityIndex)
      ? identityIndex
      : byName.get(normalizedName);
    const entry = {
      id,
      name,
      ...(email ? { email } : {}),
      ...(workMode ? { workMode } : {}),
      ...(scheduledDate ? { scheduledDate } : {}),
    };
    if (Number.isInteger(existingIndex)) {
      result[existingIndex] = {
        ...result[existingIndex],
        ...entry,
        id: entry.id || result[existingIndex].id,
        email: entry.email || result[existingIndex].email,
        workMode: entry.workMode || result[existingIndex].workMode,
        scheduledDate: entry.scheduledDate || result[existingIndex].scheduledDate,
      };
      continue;
    }
    const index = result.length;
    result.push(entry);
    byName.set(normalizedName, index);
    if (identity) byIdentity.set(identity, index);
  }
  return result.slice(0, 30);
}

function peopleMatch(left = [], right = []) {
  const keys = (people) =>
    normalizePeople(people)
      .map((person) => `${personKey(person)}::${person.workMode || ""}`)
      .sort();
  return JSON.stringify(keys(left)) === JSON.stringify(keys(right));
}

function personMatches(left = {}, right = {}) {
  const leftId = clean(left.id || left.slackUserId, 120).toLowerCase();
  const rightId = clean(right.id || right.slackUserId, 120).toLowerCase();
  const leftEmail = clean(left.email, 320).toLowerCase();
  const rightEmail = clean(right.email, 320).toLowerCase();
  const leftName = clean(left.name, 180).toLowerCase();
  const rightName = clean(right.name, 180).toLowerCase();
  return Boolean(
    (leftId && rightId && leftId === rightId) ||
      (leftEmail && rightEmail && leftEmail === rightEmail) ||
      (leftName && rightName && leftName === rightName)
  );
}

function mergePeople(...groups) {
  return normalizePeople(groups.flatMap((group) => (Array.isArray(group) ? group : [])));
}

function withoutPeople(people, removed) {
  const excluded = normalizePeople(removed);
  return normalizePeople(people).filter(
    (person) => !excluded.some((candidate) => personMatches(person, candidate))
  );
}

function latestHistoryState(history, sources, field) {
  const entries = Array.isArray(history) ? [...history].reverse() : [];
  const entry = entries.find((candidate) =>
    sources.has(clean(candidate?.source, 60).toLowerCase())
  );
  return normalizePeople(entry?.[field]);
}

function excludedPeople(current = {}) {
  return (Array.isArray(current.assignmentExclusions)
    ? current.assignmentExclusions
    : []
  ).map((entry) => ({
    id: clean(entry?.slackUserId || entry?.id, 120),
    email: clean(entry?.email, 320).toLowerCase(),
    name: clean(entry?.name, 180),
  }));
}

function currentStage(current = {}) {
  const stored = normalizeStage(current.workflowStatus || current.workflowStage);
  const status = clean(current.status, 40).toLowerCase();
  if (status === "closed") return "closed";
  if (status && !["active", "open", "processing"].includes(status)) {
    return stored === "closed" ? "closed" : "done";
  }
  return stored || "unassigned";
}

function latestHumanSlackTs(messages = []) {
  return (Array.isArray(messages) ? messages : []).reduce((latest, message) => {
    if (message?.botMessage) return latest;
    const value = Number(message?.slackTs || 0);
    return Number.isFinite(value) ? Math.max(latest, value) : latest;
  }, 0);
}

function hasManualStageLock(current = {}) {
  const stage = currentStage(current);
  const reviewed = current.aiWorkflowDecision;
  if (
    reviewed?.reviewed &&
    normalizeStage(reviewed.correctedStage) === stage
  ) {
    return true;
  }
  const latestTransition = Array.isArray(current.workflowStageHistory)
    ? current.workflowStageHistory[current.workflowStageHistory.length - 1]
    : null;
  return MANUAL_STAGE_SOURCES.has(
    clean(latestTransition?.source, 60).toLowerCase()
  );
}

function hasManualPriorityLock(current = {}) {
  const source = clean(current.prioritySource, 60).toLowerCase();
  const vote = clean(current.priorityFeedback?.vote, 20).toLowerCase();
  if (MANUAL_PRIORITY_SOURCES.has(source) || current.priorityManualOverrideAt) {
    return true;
  }
  if (vote === "up") return true;
  if (vote === "down" && normalizePriorityTier(current.priorityFeedback?.correctedTier)) {
    return true;
  }
  const latest = Array.isArray(current.priorityHistory)
    ? current.priorityHistory[current.priorityHistory.length - 1]
    : null;
  return MANUAL_PRIORITY_SOURCES.has(clean(latest?.source, 60).toLowerCase());
}

function resolveWorkflow({
  current = {},
  threadMessages = [],
  bluefolderAssignees = [],
  analysis = {},
  nowMs = Date.now(),
} = {}) {
  const before = currentStage(current);
  const command = latestRecoveryCommand(threadMessages);
  const bluefolderStage = normalizeStage(
    current.bluefolderWorkflowStatus || current.bluefolderStatus
  );
  const manualLocked = hasManualStageLock(current);

  // Closed is the final Magmo archival state and never regresses during a read-only
  // conversation reconciliation. A human can explicitly reopen it in the UI.
  if (before === "closed") {
    return { stage: "closed", source: "preserved_closed", command, manualLocked };
  }
  // The latest human terminal command is the authoritative Slack lifecycle state.
  if (command) {
    return {
      stage: command.workflowStatus,
      source: "slack_terminal_command",
      command,
      manualLocked,
    };
  }
  // A prior terminal state must not be reopened by an inference-only backfill.
  if (TERMINAL_STAGES.has(before)) {
    return { stage: before, source: "preserved_terminal", command: null, manualLocked };
  }
  // Explicit admin placement is stronger than inferred circulation state.
  if (manualLocked) {
    return { stage: before, source: "manual_override", command: null, manualLocked };
  }
  if (TERMINAL_STAGES.has(bluefolderStage)) {
    return {
      stage: bluefolderStage,
      source: "bluefolder_status",
      command: null,
      manualLocked,
    };
  }
  // The exact current BlueFolder Assigned To field is an active physical dispatch.
  if (normalizePeople(bluefolderAssignees).length) {
    return {
      stage: "active",
      source: "bluefolder_dispatch",
      command: null,
      manualLocked,
    };
  }
  const requested = normalizeStage(analysis.workflowStatus);
  const workflowConfidence = Number(analysis.workflowConfidence || 0);
  const validScheduledDate = /^\d{4}-\d{2}-\d{2}$/.test(
    clean(analysis.scheduledFor, 20)
  );
  if (
    Boolean(analysis.workflowChanged) &&
    ACTIVE_STAGES.has(requested) &&
    workflowConfidence >= 0.76 &&
    (requested !== "scheduled" || validScheduledDate)
  ) {
    return { stage: requested, source: "full_thread_ai", command: null, manualLocked };
  }
  if (
    Boolean(analysis.remoteWorkActive) &&
    Number(analysis.remoteWorkConfidence || 0) >= 0.72
  ) {
    return { stage: "remote", source: "remote_evidence", command: null, manualLocked };
  }
  const latestTs = latestHumanSlackTs(threadMessages);
  if (latestTs && latestTs * 1000 <= nowMs - 7 * 86400000) {
    return { stage: "inactive", source: "seven_day_inactivity", command: null, manualLocked };
  }
  return { stage: before, source: "preserved_current", command: null, manualLocked };
}

function resolvePriority(current = {}, analysis = {}) {
  const currentTier = normalizePriorityTier(current.priorityTier) || "needs_scheduled";
  const requestedTier = normalizePriorityTier(analysis.priorityTier);
  const rejected = new Set(
    (Array.isArray(current.rejectedPriorityTiers)
      ? current.rejectedPriorityTiers
      : []
    )
      .map(normalizePriorityTier)
      .filter(Boolean)
  );
  const locked = hasManualPriorityLock(current);
  const confidence = Number(analysis.priorityConfidence || 0);
  const generated = GENERATED_PRIORITY_PATTERN.test(requestedTier);
  const accepted = Boolean(
    !locked &&
      analysis.priorityChanged &&
      requestedTier &&
      !rejected.has(requestedTier) &&
      confidence >= 0.72 &&
      (!generated || confidence >= 0.82)
  );
  const tier = accepted ? requestedTier : currentTier;
  return {
    tier,
    label: accepted
      ? priorityLabel(tier, analysis.priorityLabel)
      : priorityLabel(tier, current.priorityLabel),
    generated: accepted ? generated : Boolean(current.priorityGenerated) || GENERATED_PRIORITY_PATTERN.test(tier),
    order: accepted
      ? Math.max(0, Math.min(3, Number(analysis.priorityOrder || 0)))
      : Number.isFinite(Number(current.priorityOrder))
        ? Number(current.priorityOrder)
        : STANDARD_PRIORITY_TIERS.has(tier)
          ? ["hard_down", "in_progress", "needs_scheduled", "anytime"].indexOf(tier)
          : 2,
    confidence: accepted ? confidence : Number(current.priorityConfidence || 0),
    reason: accepted
      ? clean(analysis.priorityReason, 700)
      : clean(current.priorityReason, 700),
    context: accepted
      ? clean(analysis.priorityContext || analysis.priorityReason, 900)
      : clean(current.priorityContext, 900),
    source: accepted ? "dispatch_backlog_reconciliation" : clean(current.prioritySource, 60),
    accepted,
    locked,
  };
}

function resolvePeople(current = {}, bluefolderAssignees = [], analysis = {}) {
  const currentAssignees = normalizePeople(current.assignees);
  const currentParticipants = normalizePeople(current.participants);
  const knownPeople = mergePeople(
    currentAssignees,
    currentParticipants,
    analysis.assignees,
    analysis.participants
  );
  const protectedBluefolder = normalizePeople(bluefolderAssignees).map((person) => {
    const known = knownPeople.find((candidate) => personMatches(candidate, person));
    return {
      ...person,
      ...(known?.id ? { id: known.id } : {}),
      ...(known?.email ? { email: known.email } : {}),
      workMode: "physical",
    };
  });
  const manualAssignees = latestHistoryState(
    current.assignmentHistory,
    MANUAL_ASSIGNMENT_SOURCES,
    "assignees"
  );
  const manualParticipants = latestHistoryState(
    current.participationHistory,
    MANUAL_PARTICIPATION_SOURCES,
    "participants"
  );
  const assignmentAccepted =
    Array.isArray(analysis.assignees) && Number(analysis.confidence || 0) >= 0.76;
  const participationAccepted =
    Array.isArray(analysis.participants) &&
    Number(analysis.participationConfidence || 0) >= 0.72;
  const inferredAssignees = assignmentAccepted
    ? normalizePeople(analysis.assignees)
    : currentAssignees;
  const exclusions = excludedPeople(current);
  // BlueFolder dispatch wins over a stale local exclusion. The UI already blocks
  // creating exclusions for a currently protected BlueFolder engineer.
  const filteredInferred = withoutPeople(inferredAssignees, exclusions);
  const filteredManual = withoutPeople(manualAssignees, exclusions);
  // Put BlueFolder last so its physical dispatch mode wins if the AI also
  // returned the same engineer under a Slack identity.
  const assignees = mergePeople(filteredManual, filteredInferred, protectedBluefolder);
  const inferredParticipants = participationAccepted
    ? normalizePeople(analysis.participants)
    : currentParticipants;
  const participants = withoutPeople(
    mergePeople(manualParticipants, inferredParticipants),
    assignees
  );
  return {
    assignees,
    participants,
    protectedBluefolder,
    manualAssignees: filteredManual,
    manualParticipants,
    assignmentAccepted,
    participationAccepted,
  };
}

function modeFromPeople(people, fallback = "unspecified") {
  const modes = new Set(normalizePeople(people).map((person) => person.workMode));
  if (modes.has("physical") && modes.has("remote")) return "mixed";
  if (modes.has("physical")) return "in_person";
  if (modes.has("remote")) return "remote";
  return ["remote", "in_person", "mixed", "unspecified"].includes(fallback)
    ? fallback
    : "unspecified";
}

function buildOpsReconciliationPlan({
  current = {},
  threadMessages = [],
  bluefolderAssignees = [],
  analysis = {},
  nowMs = Date.now(),
} = {}) {
  const beforeStage = currentStage(current);
  const workflow = resolveWorkflow({
    current,
    threadMessages,
    bluefolderAssignees,
    analysis,
    nowMs,
  });
  const people = resolvePeople(current, bluefolderAssignees, analysis);
  const priority = resolvePriority(current, analysis);
  const remoteAccepted =
    Boolean(analysis.remoteStateChanged) &&
    Number(analysis.remoteWorkConfidence || 0) >= 0.72;
  const remoteWorkActive = TERMINAL_STAGES.has(workflow.stage)
    ? false
    : remoteAccepted
      ? Boolean(analysis.remoteWorkActive)
      : Boolean(current.remoteWorkActive);
  const requestedMode = clean(analysis.workMode, 40).toLowerCase();
  const workMode = modeFromPeople(
    people.assignees,
    remoteAccepted
      ? requestedMode || (remoteWorkActive ? "remote" : "unspecified")
      : clean(current.workMode, 40).toLowerCase() || "unspecified"
  );
  const latestTs = latestHumanSlackTs(threadMessages);
  const assignmentChanged = !peopleMatch(current.assignees, people.assignees);
  const participationChanged = !peopleMatch(
    current.participants,
    people.participants
  );
  const workflowChanged = workflow.stage !== beforeStage;

  const patch = {
    bluefolderAssignees: people.protectedBluefolder,
    assignees: people.assignees,
    participants: people.participants,
    assignmentSummary: people.assignees.length
      ? `Currently assigned to ${people.assignees.map((person) => person.name).join(", ")}.`
      : "No remote or physical worker is assigned.",
    assignmentDecisionReason: assignmentChanged
      ? clean(analysis.reason, 700) || "Full dispatch thread responsibility reconciliation."
      : clean(current.assignmentDecisionReason, 700),
    assignmentConfidence: assignmentChanged
      ? Number(analysis.confidence || 0)
      : Number(current.assignmentConfidence || 0),
    participationSummary: people.participants.length
      ? `Participating: ${people.participants.map((person) => person.name).join(", ")}.`
      : "No current participants.",
    participationDecisionReason: participationChanged
      ? clean(analysis.participationReason, 700) || "Full dispatch thread participation reconciliation."
      : clean(current.participationDecisionReason, 700),
    participationConfidence: participationChanged
      ? Number(analysis.participationConfidence || 0)
      : Number(current.participationConfidence || 0),
    workflowStatus: workflow.stage,
    status:
      workflow.stage === "closed"
        ? "closed"
        : workflow.stage === "done"
          ? "completed"
          : "active",
    priorityTier: priority.tier,
    priorityLabel: priority.label,
    priorityGenerated: priority.generated,
    priorityOrder: priority.order,
    priorityReason: priority.reason,
    priorityContext: priority.context,
    priorityConfidence: priority.confidence,
    prioritySource: priority.source,
    remoteWorkActive,
    remoteWorkReason: remoteAccepted
      ? clean(analysis.remoteWorkReason, 700)
      : clean(current.remoteWorkReason, 700),
    remoteWorkConfidence: remoteAccepted
      ? Number(analysis.remoteWorkConfidence || 0)
      : Number(current.remoteWorkConfidence || 0),
    workMode,
    ...(workflow.stage === "scheduled" && /^\d{4}-\d{2}-\d{2}$/.test(clean(analysis.scheduledFor, 20))
      ? { scheduledFor: clean(analysis.scheduledFor, 20) }
      : {}),
    reconciliationContractVersion: 1,
    reconciliationSource: "slack_dispatch_full_thread",
    reconciliationThroughSlackTs: latestTs ? String(latestTs) : "",
  };

  const evidenceTs = latestTs ? String(latestTs) : "";
  const history = {
    ...(assignmentChanged
      ? {
          assignment: {
            source: "dispatch_backlog_reconciliation",
            previousAssignees: normalizePeople(current.assignees),
            assignees: people.assignees,
            reason: patch.assignmentDecisionReason,
            triggerMessage: "Full Slack #dispatch thread reconciliation.",
            triggerSender: "Magmo reconciliation",
            triggerSlackTs: evidenceTs,
            confidence: patch.assignmentConfidence,
          },
        }
      : {}),
    ...(participationChanged
      ? {
          participation: {
            source: "dispatch_backlog_reconciliation",
            previousParticipants: normalizePeople(current.participants),
            participants: people.participants,
            reason: patch.participationDecisionReason,
            triggerMessage: "Full Slack #dispatch thread reconciliation.",
            triggerSender: "Magmo reconciliation",
            triggerSlackTs: evidenceTs,
            confidence: patch.participationConfidence,
          },
        }
      : {}),
    ...(priority.accepted && priority.tier !== normalizePriorityTier(current.priorityTier)
      ? {
          priority: {
            source: "dispatch_backlog_reconciliation",
            previousTier: normalizePriorityTier(current.priorityTier) || "needs_scheduled",
            priorityTier: priority.tier,
            priorityLabel: priority.label,
            priorityGenerated: priority.generated,
            reason: priority.reason,
            triggerMessage: "Full Slack #dispatch thread reconciliation.",
            triggerSender: "Magmo reconciliation",
            triggerSlackTs: evidenceTs,
            confidence: priority.confidence,
          },
        }
      : {}),
    ...(workflowChanged
      ? {
          workflow: {
            source: "dispatch_backlog_reconciliation",
            previousStage: beforeStage,
            workflowStatus: workflow.stage,
            reason:
              workflow.source === "slack_terminal_command"
                ? `The latest terminal command is ${workflow.command.command}.`
                : clean(analysis.workflowReason, 700) || workflow.source,
            triggerSlackTs:
              workflow.command?.slackTs || evidenceTs,
          },
        }
      : {}),
  };

  return {
    patch,
    history,
    decisions: {
      workflowSource: workflow.source,
      terminalCommand: workflow.command?.command || "",
      manualStagePreserved: workflow.source === "manual_override",
      manualPriorityPreserved: priority.locked,
      manualAssigneeCount: people.manualAssignees.length,
      manualParticipantCount: people.manualParticipants.length,
      bluefolderDispatchCount: people.protectedBluefolder.length,
      assignmentChanged,
      participationChanged,
      priorityChanged: Boolean(history.priority),
      workflowChanged,
    },
  };
}

function classifyReconciliationCandidate({
  workOrderId,
  hasDispatchThread,
  existsInMagmo,
  allowedMissingIds = [],
} = {}) {
  const id = clean(workOrderId, 120);
  if (!id) return { action: "skip_invalid_id", workOrderId: id };
  if (!hasDispatchThread) {
    return { action: "skip_no_dispatch_thread", workOrderId: id };
  }
  if (existsInMagmo) return { action: "update", workOrderId: id };
  const allowlist = new Set(
    (Array.isArray(allowedMissingIds) ? allowedMissingIds : [...allowedMissingIds])
      .map((value) => clean(value, 120))
      .filter(Boolean)
  );
  return allowlist.has(id)
    ? { action: "create", workOrderId: id }
    : { action: "skip_not_allowlisted", workOrderId: id };
}

module.exports = {
  buildOpsReconciliationPlan,
  classifyReconciliationCandidate,
  hasManualPriorityLock,
  hasManualStageLock,
  normalizePeople,
  normalizePriorityTier,
  normalizeStage,
  resolveWorkflow,
};
