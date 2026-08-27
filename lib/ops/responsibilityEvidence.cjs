"use strict";

const TERMINAL_STAGES = new Set(["service_complete", "done", "closed"]);
const MANUAL_ASSIGNMENT_SOURCES = new Set([
  "manual",
  "manual_assignment",
  "admin",
  "admin_correction",
  "service_request",
]);

function clean(value, limit = 2600) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function email(value) {
  return clean(value, 320).toLowerCase();
}

function personMatchesIdentity(person = {}, identity = {}) {
  const personId = clean(person.id, 80).toLowerCase();
  const slackId = clean(identity.id || identity.slackUserId, 80).toLowerCase();
  const personEmail = email(person.email);
  const identityEmail = email(identity.email);
  return Boolean(
    (personId && slackId && personId === slackId) ||
      (personEmail && identityEmail && personEmail === identityEmail)
  );
}

function normalizedMode(person = {}) {
  const mode = clean(person.workMode || person.mode, 30).toLowerCase();
  return mode === "remote" || mode === "physical" ? mode : "";
}

function booleanFlag(value) {
  if (typeof value === "boolean") return value;
  return ["1", "true", "yes"].includes(clean(value, 20).toLowerCase());
}

function calendarDateKey(value, timeZone = "America/Los_Angeles") {
  const raw = clean(value, 100);
  if (!raw) return "";
  // A timezone-free BlueFolder value is a local service-calendar time. Keep its
  // written calendar date instead of allowing a UTC server to shift it backward.
  const isoLocal = raw.match(/^(\d{4})-(\d{2})-(\d{2})(?!.*(?:z|[+-]\d{2}:?\d{2})\s*$)/i);
  if (isoLocal) return `${isoLocal[1]}-${isoLocal[2]}-${isoLocal[3]}`;
  const usLocal = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (usLocal) {
    return `${usLocal[3]}-${String(usLocal[1]).padStart(2, "0")}-${String(
      usLocal[2]
    ).padStart(2, "0")}`;
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(parsed);
  const part = (type) => parts.find((entry) => entry.type === type)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function currentBluefolderDispatchPeople(
  workOrder = {},
  { now = new Date(), timeZone = "America/Los_Angeles" } = {}
) {
  const today = calendarDateKey(now, timeZone);
  if (!today) return [];
  return (Array.isArray(workOrder.bluefolderAssignments)
    ? workOrder.bluefolderAssignments
    : []
  )
    .filter((assignment) => {
      if (booleanFlag(assignment?.isComplete)) return false;
      const effectiveRaw = clean(
        assignment?.endDate || assignment?.startDate,
        100
      );
      // BlueFolder supports undated dispatches; an incomplete undated record is
      // current. A malformed dated record is not safe enough to grant access.
      if (!effectiveRaw) return true;
      const effectiveDate = calendarDateKey(effectiveRaw, timeZone);
      return Boolean(effectiveDate && effectiveDate >= today);
    })
    .flatMap((assignment) =>
      Array.isArray(assignment?.assignees) ? assignment.assignees : []
    );
}

function identityNeedles(identity = {}) {
  const slackId = clean(identity.id || identity.slackUserId, 80).toLowerCase();
  const name = clean(identity.name, 120).toLowerCase();
  return [...new Set([slackId, slackId ? `<@${slackId}>` : "", name])].filter(
    (value) => value.length >= 3
  );
}

function referencePositions(value, identity = {}) {
  const text = String(value || "").toLowerCase();
  const positions = [];
  for (const needle of identityNeedles(identity)) {
    let index = text.indexOf(needle);
    while (index >= 0 && positions.length < 20) {
      positions.push({ index, length: needle.length });
      index = text.indexOf(needle, index + needle.length);
    }
  }
  return positions;
}

const RESPONSIBILITY_ACTION_PATTERN =
  /\b(?:remote(?:ly)?|teamviewer|anydesk|vnc|rdp|ssh|vpn|screen\s*share|log(?:ged|ging)\s+in|work(?:ing|ed)?|check(?:ing|ed)?|troubleshoot(?:ing|ed)?|diagnos\w*|test(?:ing|ed)?|fix(?:ing|ed)?|repair(?:ing|ed)?|connect(?:ing|ed)?|access(?:ing|ed)?|investigat\w*|configur\w*|install(?:ing|ed)?|updat\w*|dispatch(?:ing|ed)?|on[-\s]?site|arriv\w*|eta|en\s+route|on\s+the\s+way|heading|travel\w*|replac\w*|deliver\w*|upgrad\w*|qa)\b/gi;

function statementHasNearestActionForIdentity(statement, identity, people = []) {
  const targetReferences = referencePositions(statement, identity);
  if (!targetReferences.length) return false;
  const otherReferences = people
    .filter((person) => !personMatchesIdentity(person, identity))
    .flatMap((person) => referencePositions(statement, person));
  const actions = [...String(statement || "").matchAll(RESPONSIBILITY_ACTION_PATTERN)];
  if (!actions.length) return false;
  return actions.some((action) => {
    const actionIndex = Number(action.index || 0);
    const targetDistance = Math.min(
      ...targetReferences.map((reference) =>
        Math.abs(actionIndex - (reference.index + reference.length))
      )
    );
    const otherDistance = otherReferences.length
      ? Math.min(
          ...otherReferences.map((reference) =>
            Math.abs(actionIndex - (reference.index + reference.length))
          )
        )
      : Number.POSITIVE_INFINITY;
    return targetDistance <= 100 && targetDistance < otherDistance;
  });
}

function authoredResponsibilityScope(value) {
  const source = String(value || "").slice(0, 2600);
  return source
    .split(/(?:\r?\n)+|(?<=[.!?;])\s+/)
    .map((statement) => clean(statement, 800))
    .filter(Boolean)
    .filter((statement) => {
      if (hasAffirmativeEtaEvidence(statement)) return true;
      if (
        /\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|i(?:'ve|\s+have)|we(?:'ve|\s+have)|i|we)\b.{0,30}\b(?:on\s+(?:my|our)\s+way|en\s+route|heading\s+(?:to|over)|travel(?:ing|led)?\s+to|at\s+(?:the\s+)?site|arriv(?:e|ed|ing)|work(?:ing|ed)?\s+remotely|connect(?:ed|ing)?\s+remotely|log(?:ged|ging)\s+in|install(?:ed|ing)?|replac(?:ed|ing)?|repair(?:ed|ing)?|test(?:ed|ing)?|upgrad(?:ed|ing)?|perform(?:ed|ing)?\s+(?:a\s+)?(?:final\s+)?qa|brought|return(?:ed|ing)?|pick(?:ed|ing)\s+up|drop(?:ped|ping)\s+off)\b/i.test(
          statement
        ) &&
        !/\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|i|we)\s+(?:am\s+|are\s+)?dispatch(?:ing|ed)?\b/i.test(
          statement
        )
      ) {
        return true;
      }
      // Terse field updates commonly omit "I". Accept them only when the
      // sentence begins with the action, so a dispatcher repeating another
      // engineer's name/action cannot inherit that engineer's responsibility.
      return /^(?:at\s+(?:the\s+)?site\b|on[-\s]?site\b|arriv(?:ed|ing)?\b|en\s+route\b|heading\s+(?:to|over)\b|on\s+(?:my|our)\s+way\b|install(?:ed|ing)?\b|replac(?:ed|ing)?\b|repair(?:ed|ing)?\b|test(?:ed|ing)?\b|upgrad(?:ed|ing)?\b|work(?:ing|ed)?\s+remotely\b|connect(?:ed|ing)?\s+remotely\b|log(?:ged|ging)\s+in\b|old\s+(?:one|part|unit)\s+(?:is\s+)?removed\b|new\s+(?:amp|part|unit|board|supply)\s+(?:is\s+)?in\b|q\.?a\.?(?:\s+has)?\s+passed\b|covers?\s+(?:are\s+)?back\s+on\b|finished\b|brought\b|return(?:ed|ing)?\b|pick(?:ed|ing)\s+up\b|drop(?:ped|ping)\s+off\b)/i.test(
        statement
      );
    })
    .join(" ");
}

function evidenceScopeForIdentity(entry = {}, identity = {}) {
  // Use the source Slack message, not the AI-written reason. The reason is useful
  // for display, but it must not be allowed to manufacture responsibility proof.
  const source = String(entry.triggerMessage || "").slice(0, 2600);
  if (!source.trim()) return "";
  const sender = clean(entry.triggerSender, 120).toLowerCase();
  const identityName = clean(identity.name, 120).toLowerCase();
  if (sender && identityName && sender === identityName) {
    return authoredResponsibilityScope(source);
  }

  const people = [
    ...(Array.isArray(entry.assignees) ? entry.assignees : []),
    ...(Array.isArray(entry.previousAssignees) ? entry.previousAssignees : []),
  ];
  return source
    .split(/(?:\r?\n)+|(?<=[.!?;])\s+/)
    .filter((statement) =>
      statementHasNearestActionForIdentity(statement, identity, people)
    )
    .map((statement) => clean(statement, 800))
    .filter(Boolean)
    .join(" ");
}

function hasRemoteWorkEvidence(value) {
  const text = clean(value, 2600);
  return (
    /\b(?:remote(?:ly)?|teamviewer|anydesk|vnc|rdp|ssh|vpn|screen\s*share|log(?:ged|ging)\s+in)\b.{0,120}\b(?:work|working|worked|check|checking|checked|troubleshoot|diagnos|test|fix|repair|connect|access|investigat|configur|install|updat)/i.test(
      text
    ) ||
    /\b(?:work|working|worked|check|checking|checked|troubleshoot|diagnos|test|fix|repair|connect|access|investigat|configur|install|updat)\w*\b.{0,120}\bremote(?:ly)?\b/i.test(
      text
    )
  );
}

function hasAffirmativeEtaEvidence(value) {
  const text = clean(value, 2600);
  if (!text) return false;
  const nonAuthoredLogisticsEta =
    /\b(?:courier|uber|lyft|driver|delivery|package|shipment|freight)\b.{0,80}\beta\b|\beta\b.{0,80}\b(?:courier|uber|lyft|driver|delivery|package|shipment|freight)\b/i.test(
      text
    ) &&
    !/\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|my|our)\b.{0,80}\b(?:eta|on\s+the\s+way|en\s+route|heading|travel(?:ing|led)?)\b/i.test(
      text
    );
  if (nonAuthoredLogisticsEta) return false;
  if (
    (/\beta\b/i.test(text) && text.includes("?")) ||
    /\b(?:what(?:'s|\s+is)|when\s+(?:are|will)|any\s+update\s+on)\b.{0,60}\b(?:your|their|the)?\s*eta\b|\b(?:what(?:'s|\s+is))\s+your\s+eta\b/i.test(
      text
    )
  ) {
    return false;
  }
  return /\b(?:my\s+)?eta(?:\s+(?:to|for)\s+(?:the\s+)?(?:site|customer|facility|hospital|clinic))?\s*(?:is|:|-|=)?\s*(?:about|approximately|approx\.?|around)?\s*(?:\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?|\d{1,3}\s*(?:m|min|mins|minutes|h|hr|hrs|hours))\b/i.test(
    text
  );
}

function hasPhysicalWorkEvidence(value) {
  const text = clean(value, 2600);
  return (
    /\b(?:on[-\s]?site|onsite|arriv(?:e|ed|ing)\s+(?:at|on)|en\s+route|heading\s+(?:to|over)|travel(?:ing|led)?\s+to)\b/i.test(
      text
    ) ||
    /\b(?:i(?:'m|\s+am)|we(?:'re|\s+are))\s+on\s+the\s+way\b|\bon\s+(?:my|our)\s+way\b/i.test(
      text
    ) ||
    hasAffirmativeEtaEvidence(text) ||
    /\b(?:work(?:ing|ed)?|repair(?:ing|ed)?|test(?:ing|ed)?|install(?:ing|ed)?|replac(?:ing|ed)?)\s+(?:on|at)\s+(?:the\s+)?(?:scanner|machine|system|site)\b/i.test(
      text
    ) ||
    /\b(?:deliver(?:ed|ing)?|dispatch(?:ed|ing)?)\b.{0,80}\b(?:to|at)\s+(?:the\s+)?(?:site|customer|facility|hospital|clinic)\b/i.test(
      text
    ) ||
    /\bupgrad(?:ed|ing)?\s+(?:the\s+)?(?:scanner|machine|system)\b/i.test(
      text
    ) ||
    /\bperform(?:ed|ing)?\s+(?:a\s+)?(?:final\s+)?qa\b/i.test(text)
    ||
    /\b(?:brought|bringing|took|taking|transported|transporting|returning|returned|picked\s+up|dropp(?:ed|ing)\s+off)\b.{0,140}\b(?:part|board|chassis|tube|core|equipment|system)\b.{0,100}\b(?:back|ais|warehouse|site|customer|hospital|clinic)\b/i.test(
      text
    )
  );
}

function escapedPattern(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasExplicitTravelEvidenceForIdentity(value, identity = {}) {
  const text = clean(value, 2600);
  return identityNeedles(identity).some((needle) => {
    const person = escapedPattern(needle);
    return new RegExp(
      `${person}.{0,80}\\b(?:is|was|will\\s+be)\\s+(?:on\\s+the\\s+way|en\\s+route|heading\\s+(?:to|over)|travel(?:ing|led)?\\s+to)\\b|${person}.{0,80}\\beta\\s*(?:is|:|-)?\\s*(?:about|approximately|approx\\.?|around)?\\s*\\d{1,3}\\s*(?:m|min|mins|minutes|h|hr|hrs|hours)?\\b`,
      "i"
    ).test(text);
  });
}

function terminalStage(workOrder = {}) {
  const stage = clean(
    workOrder.workflowStatus || workOrder.workflowStage,
    60
  )
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return TERMINAL_STAGES.has(stage) || stage === "complete" || stage === "completed";
}

function responsibilityEvidenceForUser(
  workOrder = {},
  identity = {},
  { hasRecordedTime = false, now = new Date() } = {}
) {
  // Ops-General never presents terminal work as a current assignment, even if
  // old assignee arrays or clocks remain for historical reporting.
  if (terminalStage(workOrder)) return null;

  if (hasRecordedTime) {
    return {
      kind: "physical",
      source: "manual_clock",
      label: "Recorded field time",
    };
  }

  const bluefolderDispatch = currentBluefolderDispatchPeople(workOrder, {
    now,
  }).find((person) => personMatchesIdentity(person, identity));
  if (bluefolderDispatch) {
    return {
      kind: "physical",
      source: "bluefolder_dispatch",
      label: "BlueFolder dispatch",
    };
  }

  const currentAssignee = (workOrder.assignees || []).find((person) =>
    personMatchesIdentity(person, identity)
  );
  if (!currentAssignee) return null;

  const history = Array.isArray(workOrder.assignmentHistory)
    ? [...workOrder.assignmentHistory].reverse()
    : [];
  for (const entry of history) {
    const assignedPerson = (entry.assignees || []).find((person) =>
      personMatchesIdentity(person, identity)
    );
    if (!assignedPerson) continue;

    const source = clean(entry.source, 40).toLowerCase();
    const explicitMode = normalizedMode(assignedPerson) || normalizedMode(currentAssignee);
    if (MANUAL_ASSIGNMENT_SOURCES.has(source) && explicitMode) {
      return {
        kind: explicitMode,
        source: `assignment_${source}`,
        label:
          explicitMode === "remote"
            ? "Manually confirmed remote"
            : "Manually confirmed field work",
      };
    }

    const evidenceScope = evidenceScopeForIdentity(entry, identity);
    const remote = hasRemoteWorkEvidence(evidenceScope);
    const physical =
      hasPhysicalWorkEvidence(evidenceScope) ||
      hasExplicitTravelEvidenceForIdentity(evidenceScope, identity);
    if (!remote && !physical) continue;

    const kind = remote && !physical ? "remote" : "physical";
    return {
      kind,
      source: `assignment_${source || "history"}`,
      label:
        kind === "remote"
          ? "Slack-confirmed remote work"
          : "Slack-confirmed field work",
    };
  }

  // A stale assignee row or workMode label is not proof by itself. This is what
  // prevents Related To/oversight/mass-mention false positives from surfacing.
  return null;
}

module.exports = {
  calendarDateKey,
  currentBluefolderDispatchPeople,
  hasAffirmativeEtaEvidence,
  hasPhysicalWorkEvidence,
  hasRemoteWorkEvidence,
  personMatchesIdentity,
  responsibilityEvidenceForUser,
  terminalStage,
};
