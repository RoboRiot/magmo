import { OpenAI } from "openai";

const VALID_PRIORITY_TIERS = new Set([
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
const VALID_WORKFLOW_STAGES = new Set([
  "unassigned",
  "active",
  "remote",
  "scheduled",
  "on_hold",
  "inactive",
]);

function validPriorityTier(value) {
  const tier = clean(value, 60).toLowerCase();
  return VALID_PRIORITY_TIERS.has(tier) || GENERATED_PRIORITY_PATTERN.test(tier)
    ? tier
    : "";
}

function priorityLabel(tier, value = "") {
  if (PRIORITY_LABELS[tier]) return PRIORITY_LABELS[tier];
  return (
    clean(value, 80).replace(/\s*\(Generated\)\s*$/i, "") ||
    tier
      .replace(/^generated_/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
  );
}

function clean(value, maxLength = 700) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function inferDeterministicRemoteWork(currentActive, rawText) {
  const text = clean(rawText, 4000).toLowerCase();
  if (!text) {
    return {
      changed: false,
      active: Boolean(currentActive),
      explicitEnd: false,
      reason: "",
      confidence: 0,
      workMode: currentActive ? "remote" : "unspecified",
    };
  }
  const explicitEnd =
    /\bremote\s+(?:session|work|support|troubleshooting)\s+(?:ended|complete|completed|done|stopped|closed)\b/i.test(
      text
    ) ||
    /\b(?:couldn['’]?t|could not|can['’]?t|cannot|unable to)\b.{0,55}\bremote(?:ly)?\b/i.test(
      text
    ) ||
    /\bremote(?:ly)?\b.{0,55}\b(?:couldn['’]?t|could not|can['’]?t|cannot|unable to)\b/i.test(
      text
    ) ||
    /\b(?:work|service|remote support)\s+(?:is\s+)?not required\b/i.test(text) ||
    /\bno\s+(?:remote\s+)?work\s+(?:is\s+)?required\b/i.test(text) ||
    /\bremote\s+(?:work|support|access)\s+(?:is\s+)?no longer (?:needed|required)\b/i.test(
      text
    ) ||
    /\b(?:on[-\s]?site only|cannot install remotely|can['’]?t install remotely)\b/i.test(
      text
    );
  const onsiteTransition =
    /\b(?:send(?:ing)?|dispatch(?:ing|ed)?|schedule(?:d|ing)?).{0,60}\b(?:tech(?:nician)?|engineer)\b.{0,60}\bon[-\s]?site\b/i.test(
      text
    ) ||
    /\b(?:tech(?:nician)?|engineer)\b.{0,60}\bon[-\s]?site\b/i.test(text) ||
    /\b(?:needs?|requires?)\s+(?:an?\s+)?on[-\s]?site\b/i.test(text);
  if (explicitEnd) {
    return {
      changed: Boolean(currentActive),
      active: false,
      explicitEnd: true,
      reason:
        "The latest Slack message explicitly says remote work ended, was unavailable, or is no longer required.",
      confidence: 0.99,
      workMode: onsiteTransition ? "in_person" : "unspecified",
    };
  }

  const remoteMarker =
    /\b(?:remote(?:ly)?|remote\s+(?:session|connection|access|support)|teamviewer|anydesk|vpn|ssh|screen\s*share|vnc|rdp|putty)\b/i.test(
      text
    );
  const activeWork =
    /\b(?:check|checking|checked|work|working|troubleshoot|troubleshooting|diagnose|diagnosing|diagnostics?|test|testing|fix|fixing|repair|repairing|reboot|rebooting|reload|reloading|configure|configuring|connect|connecting|connected|log(?:ged|ging)?\s+in|look(?:ing)?\s+into|attempt|attempting|review|reviewing|access|accessing|investigate|investigating|update|updating|install|installing|verify|verifying)\b/i.test(
      text
    );
  const directRemoteRequest =
    /\b(?:can|could|will|would)\s+you\b.{0,80}\b(?:check|fix|look|work|test|review|connect|access|troubleshoot|diagnose)\b.{0,80}\bremote(?:ly)?\b/i.test(
      text
    ) ||
    /\b(?:check|fix|look|work|test|review|connect|access|troubleshoot|diagnose)\b.{0,80}\bremote(?:ly)?\b/i.test(
      text
    );
  const liveRemoteSession =
    /\b(?:logged|logging)\s+in\b/i.test(text) ||
    /\b(?:vnc|teamviewer|anydesk|rdp|ssh|putty)\b.{0,40}\b(?:working|connected|open|running|up)\b/i.test(
      text
    );
  const futureRemotePlan =
    /\b(?:tomorrow|next\s+(?:week|month)|later|before\s+(?:the\s+)?(?:appointment|visit)|scheduled\s+for)\b/i.test(
      text
    ) &&
    /\b(?:need(?:s)?\s+to|plan(?:ning)?\s+to|schedule(?:d)?\s+to|will|going\s+to)\b.{0,100}\bremote(?:ly|\s+access)?\b/i.test(
      text
    ) &&
    !liveRemoteSession &&
    !/\b(?:now|currently|right\s+now)\b/i.test(text);
  if (
    !futureRemotePlan &&
    ((remoteMarker && activeWork) || directRemoteRequest || liveRemoteSession)
  ) {
    return {
      changed: !currentActive,
      active: true,
      explicitEnd: false,
      reason:
        "The Slack message starts or confirms active remote troubleshooting.",
      confidence: 0.99,
      workMode: "remote",
    };
  }
  return {
    changed: false,
    active: Boolean(currentActive),
    explicitEnd: false,
    reason: "",
    confidence: 0,
    workMode: currentActive ? "remote" : "unspecified",
  };
}

function uniqueCandidates(candidates = []) {
  const seen = new Set();
  return candidates.reduce((result, candidate) => {
    const name = clean(candidate?.name || candidate, 100);
    const id = clean(candidate?.id, 80);
    const email = clean(candidate?.email, 320).toLowerCase();
    const requestedMode = clean(candidate?.workMode || candidate?.mode, 30).toLowerCase();
    const workMode = ["remote", "physical"].includes(requestedMode)
      ? requestedMode
      : "";
    const key = name.toLowerCase();
    const synthetic =
      /^(?:magmo(?:[-_]|$)|USLACKBOT$)/i.test(id) ||
      /^(?:magmo(?:\s+(?:recovery|ai|bot|audit))?|slack(?:bot)?)$/i.test(name);
    if (name && !synthetic && !seen.has(key) && result.length < 30) {
      seen.add(key);
      result.push({
        id,
        name,
        ...(email ? { email } : {}),
        ...(workMode ? { workMode } : {}),
      });
    }
    return result;
  }, []);
}

function personReferencedInText(candidate = {}, rawText = "") {
  const text = String(rawText || "").toLowerCase();
  const id = clean(candidate.id, 80).toLowerCase();
  const name = clean(candidate.name, 100).toLowerCase();
  if (id && text.includes(id)) return true;
  if (name && text.includes(name)) return true;
  const parts = name.split(/\s+/).filter((part) => part.length >= 3);
  return parts.length >= 2 && parts.every((part) => text.includes(part));
}

function candidateEvidenceScope(candidate = {}, rawText = "") {
  const source = String(rawText || "");
  const lower = source.toLowerCase();
  const needles = [
    clean(candidate.id, 80).toLowerCase(),
    clean(candidate.name, 100).toLowerCase(),
  ].filter((value) => value.length >= 3);
  const windows = [];
  const candidateName = clean(candidate.name, 100).toLowerCase();
  // Recovery transcripts preserve the Slack author as "timestamp | Name: text".
  // Keep an author's complete line so first-person evidence near the end of a
  // longer update is not cut off by the small mention window below.
  source.split(/\r?\n/).forEach((line) => {
    if (
      candidateName &&
      new RegExp(`(?:^|\\|)\\s*${escapedPattern(candidateName)}\\s*:`, "i").test(
        line
      )
    ) {
      windows.push(line.slice(0, 1200));
    }
  });
  needles.forEach((needle) => {
    let index = lower.indexOf(needle);
    while (index >= 0 && windows.length < 12) {
      const lineStart = source.lastIndexOf("\n", index);
      const lineEnd = source.indexOf("\n", index);
      windows.push(
        source.slice(
          Math.max(lineStart < 0 ? 0 : lineStart + 1, index - 120),
          Math.min(
            lineEnd < 0 ? source.length : lineEnd,
            index + needle.length + 480
          )
        )
      );
      index = lower.indexOf(needle, index + needle.length);
    }
  });
  return windows.join(" ").slice(0, 6000);
}

function escapedPattern(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function candidateMatchesSender(candidate = {}, sender = {}) {
  sender = sender || {};
  const candidateId = clean(candidate.id, 80).toLowerCase();
  const senderId = clean(sender.id, 80).toLowerCase();
  const candidateName = clean(candidate.name, 100).toLowerCase();
  const senderName = clean(sender.name, 100).toLowerCase();
  return Boolean(
    (candidateId && senderId && candidateId === senderId) ||
      (candidateName && senderName && candidateName === senderName)
  );
}

function etaQuestionForEvidence(value = "") {
  const text = String(value || "");
  return (
    (/\beta\b/i.test(text) && text.includes("?")) ||
    /\b(?:what(?:'s|\s+is)|when\s+(?:are|will)|any\s+update\s+on)\b.{0,50}\b(?:your|their|the)?\s*eta\b|\b(?:what(?:'s|\s+is))\s+your\s+eta\b/i.test(
      text
    )
  );
}

function logisticsEtaForEvidence(value = "") {
  const text = String(value || "");
  return (
    /\b(?:courier|uber|lyft|driver|delivery|package|shipment|freight)\b.{0,80}\beta\b|\beta\b.{0,80}\b(?:courier|uber|lyft|driver|delivery|package|shipment|freight)\b/i.test(
      text
    ) &&
    !/\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|my|our)\b.{0,80}\b(?:eta|on\s+the\s+way|en\s+route|heading|travel(?:ing|led)?)\b/i.test(
      text
    )
  );
}

function affirmativeEtaForEvidence(value = "") {
  const text = String(value || "");
  return (
    !etaQuestionForEvidence(text) &&
    !logisticsEtaForEvidence(text) &&
    (/\b(?:my\s+)?eta(?:\s+(?:to|for)\s+(?:the\s+)?(?:site|customer|facility|hospital|clinic))?\s*(?:is|:|-|=)?\s*(?:about|approximately|approx\.?|around)?\s*(?:\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?|\d{1,3}\s*(?:m|min|mins|minutes|h|hr|hrs|hours))\b/i.test(
      text
    ) ||
      /\b(?:i(?:'m|\s+am)?|we(?:'re|\s+are)?)\s+(?:about\s+)?\d{1,3}\s*(?:m|min|mins|minutes|h|hr|hrs|hours)\s+(?:away|out)\b/i.test(
        text
      ))
  );
}

function authoredCandidateEvidenceScope(value = "") {
  return String(value || "")
    .slice(0, 6000)
    .split(/(?:\r?\n)+|(?<=[.!?;])\s+/)
    .map((statement) => clean(statement, 1200))
    .filter(Boolean)
    .filter((statement) => {
      if (affirmativeEtaForEvidence(statement)) return true;
      if (
        /\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|i(?:'ve|\s+have)|we(?:'ve|\s+have)|i|we)\b.{0,35}\b(?:on\s+(?:my|our)\s+way|en\s+route|heading\s+(?:to|over)|travel(?:ing|led)?\s+to|at\s+(?:the\s+)?site|arriv(?:e|ed|ing)|work(?:ing|ed)?\s+remotely|connect(?:ed|ing)?\s+remotely|log(?:ged|ging)\s+in|install(?:ed|ing)?|replac(?:ed|ing)?|repair(?:ed|ing)?|test(?:ed|ing)?|upgrad(?:ed|ing)?|perform(?:ed|ing)?\s+(?:a\s+)?(?:final\s+)?qa|brought|return(?:ed|ing)?|pick(?:ed|ing)\s+up|drop(?:ped|ping)\s+off)\b/i.test(
          statement
        ) &&
        !/\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|i|we)\s+(?:am\s+|are\s+)?dispatch(?:ing|ed)?\b/i.test(
          statement
        )
      ) {
        return true;
      }
      if (
        /\b(?:i|we)\b.{0,25}\b(?:t(?:ake|ook|aken|aking)\s+over|handle|finish|complete)\b.{0,60}\b(?:remote|remotely|troubleshoot|diagnos|repair|work)\w*\b/i.test(
          statement
        )
      ) {
        return true;
      }
      // A terse field update may omit "I", but it must begin with the work
      // action. A sentence beginning with somebody else's name describes that
      // person and cannot be treated as work by the message author.
      return /^(?:at\s+(?:the\s+)?site\b|on[-\s]?site\b|arriv(?:ed|ing)?\b|en\s+route\b|heading\s+(?:to|over)\b|on\s+(?:my|our)\s+way\b|install(?:ed|ing)?\b|replac(?:ed|ing)?\b|repair(?:ed|ing)?\b|test(?:ed|ing)?\b|upgrad(?:ed|ing)?\b|work(?:ing|ed)?\s+remotely\b|connect(?:ed|ing)?\s+remotely\b|log(?:ged|ging)\s+in\b|old\s+(?:one|part|unit)\s+(?:is\s+)?removed\b|new\s+(?:amp|part|unit|board|supply)\s+(?:is\s+)?in\b|q\.?a\.?(?:\s+has)?\s+passed\b|covers?\s+(?:are\s+)?back\s+on\b|finished\b|brought\b|return(?:ed|ing)?\b|pick(?:ed|ing)\s+up\b|drop(?:ped|ping)\s+off\b)/i.test(
        statement
      );
    })
    .join(" ");
}

function senderNamesOwnResponsibility(candidate = {}, value = "") {
  const name = clean(candidate.name, 100);
  if (!name) return false;
  const person = escapedPattern(name);
  return new RegExp(
    `^\\s*@?${person}\\s+(?:t(?:ake|ook|aken|aking)\\s+over|arriv(?:e|ed|ing)|install(?:ed|ing)?|replac(?:ed|ing)?|repair(?:ed|ing)?|test(?:ed|ing)?|work(?:ed|ing)?|connect(?:ed|ing)?|log(?:ged|ging)\\s+in|troubleshoot(?:ed|ing)?)\\b`,
    "i"
  ).test(String(value || ""));
}

export function responsibilityModeForCandidate(candidate = {}, message = {}) {
  const text = String(message?.text || "");
  if (!text.trim()) return "";
  const senderIsCandidate = candidateMatchesSender(candidate, message.sender);
  const referenced = personReferencedInText(candidate, text);
  if (!referenced && !senderIsCandidate) return "";
  const authoredScope = senderIsCandidate
    ? authoredCandidateEvidenceScope(text)
    : "";
  const evidenceScope = senderIsCandidate
    ? authoredScope ||
      (senderNamesOwnResponsibility(candidate, text)
        ? candidateEvidenceScope(candidate, text)
        : "")
    : candidateEvidenceScope(candidate, text);
  if (!evidenceScope.trim()) return "";

  const remoteWork =
    /\b(?:remote(?:ly)?|teamviewer|anydesk|vnc|rdp|ssh|vpn|screen\s*share|logged?\s+in)\b.{0,120}\b(?:work|working|worked|check|checking|checked|troubleshoot|diagnos|test|fix|repair|connect|access|investigat|configur|install|updat)/i.test(evidenceScope) ||
    /\b(?:work|working|worked|check|checking|checked|troubleshoot|diagnos|test|fix|repair|connect|access|investigat|configur|install|updat)\w*\b.{0,120}\bremote(?:ly)?\b/i.test(evidenceScope);
  const affirmativeEta = affirmativeEtaForEvidence(evidenceScope);
  const logisticsOnly =
    /\b(?:package|courier|uber|shipment|delivery)\b.{0,80}\bon\s+the\s+way\b/i.test(
      evidenceScope
    ) &&
    !/\b(?:i(?:'m|\s+am)|we(?:'re|\s+are)|he\s+is|she\s+is|they\s+are)\s+on\s+the\s+way\b/i.test(
      evidenceScope
    );
  const explicitPhysicalContext =
    /\b(?:dispatch(?:ed|ing)?|on[-\s]?site|onsite|arriv(?:e|ed|ing)|heading\s+(?:to|over)|travel(?:ing|led)?\s+to|at\s+(?:the\s+)?(?:site|scanner|machine|system)|perform(?:ed|ing)?\s+(?:a\s+)?(?:final\s+)?qa)\b/i.test(
      evidenceScope
    ) ||
    (!logisticsOnly &&
      /\b(?:i(?:'m|\s+am)|we(?:'re|\s+are))\s+on\s+the\s+way\b|\bon\s+(?:my|our)\s+way\b/i.test(
        evidenceScope
      ));
  const physicalHandsOn =
    !remoteWork &&
    /\b(?:install(?:ed|ing)?|replac(?:ed|ing)?|repair(?:ed|ing)?)\b/i.test(
      evidenceScope
    );
  const physicalWork =
    explicitPhysicalContext ||
    physicalHandsOn ||
    affirmativeEta ||
    /\b(?:brought|bringing|took|taking|transported|transporting|returning|returned|picked\s+up|dropp(?:ed|ing)\s+off)\b.{0,140}\b(?:part|board|chassis|tube|core|equipment|system)\b.{0,100}\b(?:back|ais|warehouse|site|customer|hospital|clinic)\b/i.test(
      evidenceScope
    ) ||
    /\b(?:part|board|chassis|tube|core|equipment|system)\b.{0,100}\b(?:brought|bringing|took|taking|transported|transporting|returning|returned|picked\s+up|dropp(?:ed|ing)\s+off)\b.{0,100}\b(?:back|ais|warehouse|site|customer|hospital|clinic)\b/i.test(
      evidenceScope
    );
  if (physicalWork) return "physical";
  if (remoteWork) return "remote";
  return "";
}

function hasAffirmativeResponsibilityEvidence(candidate = {}, message = {}) {
  return Boolean(responsibilityModeForCandidate(candidate, message));
}

function lineSenderIsCandidate(line, candidate) {
  const name = clean(candidate?.name, 100);
  return Boolean(
    name &&
      new RegExp(`(?:^|\\|)\\s*${escapedPattern(name)}\\s*:`, "i").test(line)
  );
}

export function explicitTakeoverCandidates(message = {}, candidates = []) {
  const lines = String(message?.text || "").split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  let latest = [];
  for (const line of lines) {
    const matches = uniqueCandidates(candidates).filter((candidate) => {
      const identifiers = [candidate.name, candidate.id]
        .map((value) => clean(value, 100))
        .filter((value) => value.length >= 3);
      const namedTakeover = identifiers.some((identifier) => {
        const person = escapedPattern(identifier);
        return new RegExp(
          `(?:${person}.{0,90}\\b(?:t(?:ake|ook|aken|aking)\\s+over|(?:will|is\\s+going\\s+to|can|is)\\s+(?:handle|finish|complete|do)\\s+(?:the\\s+)?(?:rest|remaining\\s+work|work|it)|has\\s+it\\s+from\\s+here)\\b|\\b(?:hand(?:ed|ing)?\\s+(?:the\\s+)?(?:work|case|task)?\\s*(?:off|over)\\s+to)\\s+${person}\\b)`,
          "i"
        ).test(line);
      });
      const senderTakeover =
        (candidateMatchesSender(candidate, message.sender) ||
          lineSenderIsCandidate(line, candidate)) &&
        /\b(?:i(?:'ll|\s+will|\s+can|\s+am)?\s+)?(?:t(?:ake|ook|aken|aking)\s+over|(?:handle|finish|complete|do)\s+(?:the\s+)?(?:rest|remaining\s+work)|have\s+it\s+from\s+here)\b/i.test(
          line
        );
      return namedTakeover || senderTakeover;
    });
    if (matches.length) latest = matches;
  }
  return latest;
}

export function endedRemoteResponsibilityCandidates(
  message = {},
  currentAssignees = []
) {
  const text = String(message?.text || "");
  if (!text.trim()) return [];
  const reconnecting =
    /\b(?:reconnect(?:ed|ing)?|logging\s+back\s+in|trying\s+to\s+reconnect|connection\s+(?:is\s+)?back)\b/i.test(
      text
    );
  if (reconnecting) return [];
  return uniqueCandidates(currentAssignees).filter((candidate) => {
    const authoredLines = text
      .split(/\r?\n/)
      .filter(
        (line) =>
          candidateMatchesSender(candidate, message.sender) ||
          lineSenderIsCandidate(line, candidate)
      );
    return authoredLines.some((line) =>
      /\b(?:i\s+(?:lost|dropped)\s+(?:the\s+)?connection|i\s+(?:was|got)\s+disconnected|i(?:'m|\s+am)\s+no\s+longer\s+connected|i\s+hand(?:ed|ing)?\s+(?:it|this|the\s+(?:work|case|task))\s+off)\b/i.test(
        line
      )
    );
  });
}

function candidatesMatch(left = [], right = []) {
  const names = (value) =>
    uniqueCandidates(value)
      .map((entry) => entry.name.toLowerCase())
      .sort();
  return JSON.stringify(names(left)) === JSON.stringify(names(right));
}

function candidateResponsibilitiesMatch(left = [], right = []) {
  const details = (value) =>
    uniqueCandidates(value)
      .map((entry) =>
        `${entry.name.toLowerCase()}::${entry.workMode || ""}`
      )
      .sort();
  return JSON.stringify(details(left)) === JSON.stringify(details(right));
}

export function reconcileResponsibilityState({
  currentAssignees = [],
  protectedAssignees = [],
  currentParticipants = [],
  requestedAssignees = [],
  requestedParticipants = [],
  candidates = [],
  message = {},
  useRequestedAssignees = false,
  useRequestedParticipants = false,
} = {}) {
  const current = uniqueCandidates(currentAssignees);
  const protectedPeople = uniqueCandidates(protectedAssignees).map((person) => ({
    ...person,
    workMode: "physical",
  }));
  const protectedNames = new Set(
    protectedPeople.map((person) => person.name.toLowerCase())
  );
  const evidencePeople = uniqueCandidates(candidates)
    .map((candidate) => {
      const workMode = responsibilityModeForCandidate(candidate, message);
      return workMode ? { ...candidate, workMode } : null;
    })
    .filter(Boolean);
  let assignees = uniqueCandidates([
    ...protectedPeople,
    ...(useRequestedAssignees ? requestedAssignees : current),
    ...evidencePeople,
  ]);

  const takeoverPeople = explicitTakeoverCandidates(message, candidates)
    .map((person) => {
      const workMode = responsibilityModeForCandidate(person, message);
      return workMode ? { ...person, workMode } : null;
    })
    .filter(Boolean);
  const takeoverNames = new Set(
    takeoverPeople.map((person) => person.name.toLowerCase())
  );
  const endedPeople = endedRemoteResponsibilityCandidates(message, current).filter(
    (person) => !protectedNames.has(person.name.toLowerCase())
  );
  const endedNames = new Set(
    endedPeople.map((person) => person.name.toLowerCase())
  );
  const removedByTakeover = [...endedPeople];
  if (endedNames.size) {
    assignees = assignees.filter(
      (person) => !endedNames.has(person.name.toLowerCase())
    );
  }
  if (takeoverNames.size) {
    for (const person of current) {
      const name = person.name.toLowerCase();
      if (!protectedNames.has(name) && !takeoverNames.has(name)) {
        if (!endedNames.has(name)) removedByTakeover.push(person);
      }
    }
    assignees = uniqueCandidates([
      ...protectedPeople,
      ...assignees.filter((person) =>
        takeoverNames.has(person.name.toLowerCase())
      ),
      ...takeoverPeople.map((person) => ({
        ...person,
        workMode: person.workMode,
      })),
    ]);
  }

  const assigneeNames = new Set(
    assignees.map((person) => person.name.toLowerCase())
  );
  const participants = uniqueCandidates([
    ...(useRequestedParticipants ? requestedParticipants : currentParticipants),
    ...removedByTakeover,
  ]).filter((person) => !assigneeNames.has(person.name.toLowerCase()));

  return {
    assignees,
    participants,
    evidencePeople,
    takeoverPeople,
    endedPeople,
    removedByTakeover,
    deterministicAssignmentChanged: !candidateResponsibilitiesMatch(
      current,
      assignees
    ),
    deterministicParticipationChanged: !candidatesMatch(
      currentParticipants,
      participants
    ),
  };
}

function extractResponseText(response) {
  if (response?.output_text) return response.output_text.trim();
  return (response?.output || [])
    .flatMap((output) => output?.content || [])
    .map((content) => content?.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

function memoryContext(companyMemory = []) {
  const lines = (Array.isArray(companyMemory) ? companyMemory : [])
    .slice(0, 5)
    .map((memory, index) => {
      const details = [
        memory.priorityTier ? `category=${memory.priorityTier}` : "",
        memory.rejectedPriorityTier
          ? `rejected_category=${memory.rejectedPriorityTier}`
          : "",
        memory.assigneeNames?.length
          ? `people=${memory.assigneeNames.join(", ")}`
          : "",
      ]
        .filter(Boolean)
        .join("; ");
      const prefix = memory.polarity === "negative" ? "AVOID: " : "CONFIRMED: ";
      return `${index + 1}. ${prefix}${clean(memory.summary, 500)}${details ? ` (${details})` : ""}`;
    });
  return lines.length
    ? lines.join("\n")
    : "No relevant saved company examples were found.";
}

export async function inferWorkOrderAssignment({
  workOrder,
  message = {},
  companyMemory = [],
  priorityOnly = false,
}) {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const recoveryMode = Boolean(message.recoveryMode);
  const protectedAssignees = uniqueCandidates(workOrder.bluefolderAssignees);
  const currentAssignees = uniqueCandidates(workOrder.assignees);
  const currentParticipants = uniqueCandidates(workOrder.participants);
  const candidates = uniqueCandidates([
    ...currentAssignees,
    ...currentParticipants,
    ...(message.candidates || []),
    ...(recoveryMode ? [] : [message.sender]),
  ]);
  const candidateByName = new Map(
    candidates.map((candidate) => [candidate.name.toLowerCase(), candidate])
  );
  const currentPriorityTier = validPriorityTier(workOrder.priorityTier) || "needs_scheduled";
  const currentPriorityLabel = priorityLabel(
    currentPriorityTier,
    workOrder.priorityLabel
  );
  const currentPriorityGenerated =
    Boolean(workOrder.priorityGenerated) ||
    GENERATED_PRIORITY_PATTERN.test(currentPriorityTier);
  const currentPriorityOrder = Number.isFinite(Number(workOrder.priorityOrder))
    ? Math.max(0, Math.min(3, Number(workOrder.priorityOrder)))
    : VALID_PRIORITY_TIERS.has(currentPriorityTier)
    ? ["hard_down", "in_progress", "needs_scheduled", "anytime"].indexOf(
        currentPriorityTier
      )
    : 2;
  const rejectedTiers = new Set(
    (Array.isArray(workOrder.rejectedPriorityTiers)
      ? workOrder.rejectedPriorityTiers
      : []
    )
      .map(validPriorityTier)
      .filter(Boolean)
  );
  const currentRemoteWorkActive = Boolean(workOrder.remoteWorkActive);
  const currentWorkflowStatus = VALID_WORKFLOW_STAGES.has(
    clean(workOrder.workflowStatus, 40).toLowerCase()
  )
    ? clean(workOrder.workflowStatus, 40).toLowerCase()
    : "unassigned";
  const deterministicRemote = inferDeterministicRemoteWork(
    currentRemoteWorkActive,
    message.text
  );
  const currentWorkMode = ["remote", "in_person", "mixed", "unspecified"].includes(
    clean(workOrder.workMode, 40).toLowerCase()
  )
    ? clean(workOrder.workMode, 40).toLowerCase()
    : "unspecified";
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: Number(process.env.OPS_OPENAI_TIMEOUT_MS || 30000),
  });
  const response = await client.responses.create({
    model: process.env.OPS_ASSIGNMENT_MODEL || "gpt-5-nano",
    store: false,
    input: [
      {
        role: "system",
        content:
          (recoveryMode
            ? "Audit the supplied complete Slack work-order thread and reconstruct its people, urgency, remote-work, and circulation state. Consider evidence throughout the entire thread, including older messages; do not treat the final administrative message as stronger than earlier direct work evidence. "
            : "Update a field-service work order from its current state and one new Slack message. ") +
          "Assignment means a person is actually performing work on the order: hands-on remote diagnosis, testing, software changes, or a live remote session; or physical/on-site work, travel to site, installation, repair, delivery, or direct field dispatch. An explicit assignment, acceptance, handoff, ETA, arrival, or clear statement that someone is doing that work can change assignment. Interpret first-person commitments as the sender. Advice, suggestions, coordination, answering questions, sharing information, reviewing a message, or being notified are participation, not assignment. " +
          "Current assignees mean the people who still have operational responsibility now, not everyone who ever touched the work order. If one remote helper starts troubleshooting but another person explicitly takes over, handles the remaining work, or completes it alone, remove the earlier helper from current assignees unless the thread clearly says both remain active. Likewise, when a remote helper says they lost connection, were disconnected, or handed the work off without saying they are reconnecting, their current responsibility ended. Preserve that earlier real work in assignment history and, when needed to keep the contribution visible after a takeover or disconnect, in participation as a previous contributor. " +
          "Treat person-specific field evidence as physical assignment even when that person is not BlueFolder Assigned To: their own affirmative ETA, their arrival or onsite statement, first-person physical repairs/testing/installation, or their statement that they transported or brought parts or cores back from the site. An ETA question, a courier/package ETA, photographs alone, or another person's physical actions are not evidence that the message author was onsite. " +
          "Participation means a person made a meaningful contribution such as technical advice, coordination, useful status, or troubleshooting guidance but did not actually perform remote or physical work. For example, Julie discussing useful work-order information is participation unless the thread separately shows Julie doing hands-on remote or physical work. Merely being mentioned or notified is neither assignment nor participation. Keep assignment and participation mutually exclusive; if a participant begins actual work, move them to assignment. Multiple assignees and participants are allowed, but use only supplied candidate names. " +
          "Only the engineer shown in BlueFolder's Assigned To field is a protected physical dispatch assignment. BlueFolder Related To people, service managers, account managers, copied recipients, Yao's notification lists, and administrative oversight are not assignments. They become participation only when they author useful advice, coordination, or information, and become assignment only with affirmative remote or physical work evidence. A name appearing in a mass mention is never evidence by itself. Never return a bot, Magmo, Magmo recovery, or a raw Slack ID as a person. " +
          (recoveryMode
            ? "Use the complete thread to identify every person who actually performed remote or physical work and every authored contributor who only participated. "
            : "The newest Slack message is the strongest category evidence; compact prior context and saved examples only provide continuity or explain company language. ") +
          "For urgency, choose hard_down only when equipment or the customer operation is currently stopped or unusable; in_progress (displayed as ASAP) when active work needs prompt attention; needs_scheduled (displayed as Soon) when the next meaningful step is arranging a date, visit, technician, part, or delivery; and anytime when the work is genuinely non-urgent. Prefer these four priority levels. Only when none fits a distinct reusable state, create a concise 2-4 word generated_lowercase_slug category, mark it generated, and assign urgency order 0-3. Never reuse a rejected category. Do not mark completed from conversation text because only !done completes an order. " +
          "Separately determine whether someone is actively working the issue remotely right now. Remote means current hands-on remote troubleshooting, diagnosis, testing, software work, or a live remote session. A request to add remote access, a future remote plan, or merely mentioning the word remote is not active remote work. Preserve the current remote state unless the newest evidence clearly starts or ends remote work. " +
          "Also classify the circulation stage independently from urgency. Use active only for physical/dispatch work being handled now or today; remote only for active remote work; scheduled when an explicit date tomorrow or later is established; on_hold when progress cannot continue because the team is waiting for a part, customer, approval, access, information, or another concrete dependency; inactive only when Magmo already marked it inactive after seven days, never merely from one quiet message; and unassigned when nobody is doing remote or physical work and no later schedule or hold is established. In Dispatch Control, remote is shown inside Active alongside Hybrid and In-person: workMode remote means remote-only support, mixed means Hybrid support, and in_person means physical support. Keep an existing scheduled or on_hold stage unless the newest message clearly changes it. Return scheduledFor as YYYY-MM-DD only when the conversation establishes that exact date, otherwise an empty string. " +
          "Update priorityContext as a short factual statement of the current operational situation. Saved company examples are advisory and never stronger than current evidence. An AVOID assignment example records a prior false-positive assignment; use its explanation to avoid repeating that mistake and never treat its listed person as a suggested owner. Return observable reasons, not private chain-of-thought.",
      },
      {
        role: "user",
        content:
          `Mode: ${priorityOnly ? "initial category classification; do not change assignment" : recoveryMode ? "complete Slack thread recovery audit" : "incremental Slack update"}\n` +
          `Work order: #${clean(workOrder.number, 100)} ${clean(workOrder.subject, 400)}\n` +
          `Customer: ${clean(workOrder.customer, 220) || "Unknown"}\n` +
          `Description: ${clean(workOrder.description, 1200) || "Not supplied"}\n` +
          `Current assignees: ${currentAssignees.map((entry) => entry.name).join(", ") || "Unassigned"}\n` +
          `Protected BlueFolder Assigned To engineers: ${protectedAssignees.map((entry) => entry.name).join(", ") || "None"}\n` +
          `Prior assignment summary: ${clean(workOrder.assignmentSummary, 500) || "None"}\n` +
          `Current participants: ${currentParticipants.map((entry) => entry.name).join(", ") || "None"}\n` +
          `Prior participation summary: ${clean(workOrder.participationSummary, 500) || "None"}\n` +
          `Allowed candidate names: ${candidates.map((entry) => entry.name).join(", ") || "None"}\n` +
          `Current operational category: ${currentPriorityTier} (${currentPriorityLabel})\n` +
          `Current category is generated: ${currentPriorityGenerated}\n` +
          `Current operational situation: ${clean(workOrder.priorityContext || workOrder.priorityReason, 900) || "Not established yet"}\n` +
          `Current remote work active: ${currentRemoteWorkActive}\n` +
          `Current work mode: ${currentWorkMode}\n` +
          `Current circulation stage: ${currentWorkflowStatus}\n` +
          `Rejected categories: ${[...rejectedTiers].join(", ") || "None"}\n` +
          `${recoveryMode ? "Recovery evidence" : "New message sender"}: ${recoveryMode ? "Complete human-authored Slack thread below" : clean(message.sender?.name, 100) || "None"}\n` +
          `${recoveryMode ? "Slack thread" : "New message"}: ${recoveryMode ? String(message.text || "").slice(0, 24000) : clean(message.text, 2400) || "No Slack message yet"}\n` +
          `Relevant saved company examples:\n${memoryContext(companyMemory)}`,
      },
    ],
    max_output_tokens: Math.max(
      560,
      Number(process.env.OPS_ASSIGNMENT_MAX_OUTPUT_TOKENS || 560)
    ),
    reasoning: {
      effort: process.env.OPS_ASSIGNMENT_REASONING_EFFORT || "minimal",
    },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "ops_state_update",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            changed: { type: "boolean" },
            assigneeNames: {
              type: "array",
              items: { type: "string" },
              maxItems: 12,
            },
            summary: { type: "string" },
            reason: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            participationChanged: { type: "boolean" },
            participantNames: {
              type: "array",
              items: { type: "string" },
              maxItems: 12,
            },
            participationSummary: { type: "string" },
            participationReason: { type: "string" },
            participationConfidence: {
              type: "number",
              minimum: 0,
              maximum: 1,
            },
            priorityChanged: { type: "boolean" },
            priorityTier: {
              type: "string",
              maxLength: 60,
            },
            priorityLabel: { type: "string", maxLength: 80 },
            priorityGenerated: { type: "boolean" },
            priorityOrder: { type: "integer", minimum: 0, maximum: 3 },
            priorityReason: { type: "string" },
            priorityContext: { type: "string" },
            priorityConfidence: { type: "number", minimum: 0, maximum: 1 },
            workMode: {
              type: "string",
              enum: ["remote", "in_person", "mixed", "unspecified"],
            },
            remoteWorkActive: { type: "boolean" },
            remoteStateChanged: { type: "boolean" },
            remoteWorkReason: { type: "string" },
            remoteWorkConfidence: {
              type: "number",
              minimum: 0,
              maximum: 1,
            },
            workflowChanged: { type: "boolean" },
            workflowStatus: {
              type: "string",
              enum: [
                "unassigned",
                "active",
                "remote",
                "scheduled",
                "on_hold",
                "inactive",
              ],
            },
            workflowReason: { type: "string" },
            workflowConfidence: {
              type: "number",
              minimum: 0,
              maximum: 1,
            },
            scheduledFor: { type: "string", maxLength: 20 },
          },
          required: [
            "changed",
            "assigneeNames",
            "summary",
            "reason",
            "confidence",
            "participationChanged",
            "participantNames",
            "participationSummary",
            "participationReason",
            "participationConfidence",
            "priorityChanged",
            "priorityTier",
            "priorityLabel",
            "priorityGenerated",
            "priorityOrder",
            "priorityReason",
            "priorityContext",
            "priorityConfidence",
            "workMode",
            "remoteWorkActive",
            "remoteStateChanged",
            "remoteWorkReason",
            "remoteWorkConfidence",
            "workflowChanged",
            "workflowStatus",
            "workflowReason",
            "workflowConfidence",
            "scheduledFor",
          ],
        },
      },
    },
  });

  const output = JSON.parse(extractResponseText(response));
  const requested = Array.isArray(output.assigneeNames)
    ? output.assigneeNames
        .map((name) => candidateByName.get(clean(name, 100).toLowerCase()))
        .filter(Boolean)
    : [];
  const assignmentConfidence = Number(output.confidence || 0);
  const currentNames = new Set(
    currentAssignees.map((entry) => entry.name.toLowerCase())
  );
  const protectedNames = new Set(
    protectedAssignees.map((entry) => entry.name.toLowerCase())
  );
  const requestedWorkModeForPeople = clean(output.workMode, 40).toLowerCase();
  const validRequested = [];
  const rejectedRequested = [];
  requested.forEach((candidate) => {
    const key = candidate.name.toLowerCase();
    const existing = currentNames.has(key) || protectedNames.has(key);
    if (
      existing ||
      hasAffirmativeResponsibilityEvidence(candidate, message)
    ) {
      const evidenceMode = responsibilityModeForCandidate(candidate, message);
      const mode = protectedNames.has(key)
        ? "physical"
        : candidate.workMode ||
          evidenceMode ||
          (requestedWorkModeForPeople === "remote"
            ? "remote"
            : requestedWorkModeForPeople === "in_person"
              ? "physical"
              : "");
      validRequested.push({
        ...candidate,
        ...(mode ? { workMode: mode } : {}),
      });
    } else {
      rejectedRequested.push(candidate);
    }
  });
  // If the model proposed even one unsupported new owner, preserve existing
  // owners instead of accidentally replacing them while dropping that proposal.
  const defensibleRequested = rejectedRequested.length
    ? uniqueCandidates([...currentAssignees, ...validRequested])
    : uniqueCandidates(validRequested);
  const modelAssignmentAccepted =
    !priorityOnly &&
    Boolean(output.changed) &&
    assignmentConfidence >=
      Number(process.env.OPS_ASSIGNMENT_MIN_CONFIDENCE || 0.76);
  const requestedParticipants = Array.isArray(output.participantNames)
    ? output.participantNames
        .map((name) => candidateByName.get(clean(name, 100).toLowerCase()))
        .filter(Boolean)
    : [];
  const reconciledResponsibility = reconcileResponsibilityState({
    currentAssignees,
    protectedAssignees,
    currentParticipants,
    requestedAssignees: defensibleRequested,
    requestedParticipants,
    candidates: priorityOnly ? [] : candidates,
    message,
    useRequestedAssignees: modelAssignmentAccepted,
    useRequestedParticipants:
      !priorityOnly && Boolean(output.participationChanged),
  });
  const assignmentChanged =
    !priorityOnly && reconciledResponsibility.deterministicAssignmentChanged;
  const assignees = assignmentChanged
    ? reconciledResponsibility.assignees
    : currentAssignees;
  const participants = reconciledResponsibility.participants;
  const participationChanged =
    !priorityOnly &&
    reconciledResponsibility.deterministicParticipationChanged;
  const effectiveAssignmentConfidence =
    reconciledResponsibility.evidencePeople.length ||
    reconciledResponsibility.takeoverPeople.length ||
    reconciledResponsibility.endedPeople.length
      ? Math.max(assignmentConfidence, 0.98)
      : assignmentConfidence;
  const deterministicAssignmentReason = reconciledResponsibility.takeoverPeople.length
    ? `${reconciledResponsibility.takeoverPeople
        .map((entry) => entry.name)
        .join(", ")} explicitly took over the remaining work; prior workers remain recorded in assignment history or participation.`
    : reconciledResponsibility.endedPeople.length
      ? `${reconciledResponsibility.endedPeople
          .map((entry) => entry.name)
          .join(", ")} reported that their remote connection or responsibility ended; the prior contribution remains recorded.`
    : reconciledResponsibility.evidencePeople.length
      ? `Direct Slack evidence confirms ${reconciledResponsibility.evidencePeople
          .map((entry) => `${entry.name} (${entry.workMode})`)
          .join(", ")}.`
      : "";
  let requestedTier = validPriorityTier(output.priorityTier) || currentPriorityTier;
  let requestedGenerated = GENERATED_PRIORITY_PATTERN.test(requestedTier);
  let requestedLabel = priorityLabel(requestedTier, output.priorityLabel);
  let requestedOrder = Number.isFinite(Number(output.priorityOrder))
    ? Math.max(0, Math.min(3, Number(output.priorityOrder)))
    : currentPriorityOrder;
  if (rejectedTiers.has(requestedTier)) {
    requestedTier = currentPriorityTier;
    requestedGenerated = currentPriorityGenerated;
    requestedLabel = currentPriorityLabel;
    requestedOrder = currentPriorityOrder;
  }
  const priorityConfidence = Number(output.priorityConfidence || 0);
  const priorityChanged =
    Boolean(output.priorityChanged) &&
    requestedTier !== currentPriorityTier &&
    priorityConfidence >= Number(process.env.OPS_PRIORITY_MIN_CONFIDENCE || 0.72) &&
    (!requestedGenerated || priorityConfidence >= 0.82);
  let remoteWorkConfidence = Number(output.remoteWorkConfidence || 0);
  let remoteStateChanged =
    (Boolean(output.remoteStateChanged) || priorityOnly) &&
    Boolean(output.remoteWorkActive) !== currentRemoteWorkActive &&
    remoteWorkConfidence >=
      Number(process.env.OPS_REMOTE_MIN_CONFIDENCE || 0.72);
  let remoteWorkActive = remoteStateChanged
    ? Boolean(output.remoteWorkActive)
    : currentRemoteWorkActive;
  let remoteWorkReason = clean(output.remoteWorkReason, 700);
  let deterministicWorkMode = "";
  if (deterministicRemote.changed) {
    remoteStateChanged = true;
    remoteWorkActive = deterministicRemote.active;
    remoteWorkConfidence = deterministicRemote.confidence;
    remoteWorkReason = deterministicRemote.reason;
    deterministicWorkMode = deterministicRemote.workMode;
  } else if (
    currentRemoteWorkActive &&
    remoteStateChanged &&
    !remoteWorkActive &&
    !deterministicRemote.explicitEnd
  ) {
    remoteStateChanged = false;
    remoteWorkActive = true;
    remoteWorkConfidence = Math.max(remoteWorkConfidence, 0.99);
    remoteWorkReason =
      clean(workOrder.remoteWorkReason, 700) ||
      "Remote work remains active because no Slack message explicitly ended it.";
  }
  const requestedWorkMode = clean(output.workMode, 40).toLowerCase();
  const workMode = remoteStateChanged
    ? deterministicWorkMode ||
      (["remote", "in_person", "mixed", "unspecified"].includes(
        requestedWorkMode
      )
      ? requestedWorkMode
      : remoteWorkActive
      ? "remote"
      : "unspecified")
    : currentWorkMode;
  const workflowConfidence = Number(output.workflowConfidence || 0);
  const outputWorkflowStatus = VALID_WORKFLOW_STAGES.has(
    clean(output.workflowStatus, 40).toLowerCase()
  )
    ? clean(output.workflowStatus, 40).toLowerCase()
    : currentWorkflowStatus;
  const deterministicWorkflowStatus = remoteWorkActive
    ? "remote"
    : outputWorkflowStatus;
  const workflowChanged =
    (Boolean(output.workflowChanged) ||
      (deterministicRemote.changed && deterministicWorkflowStatus === "remote")) &&
    deterministicWorkflowStatus !== currentWorkflowStatus &&
    Math.max(workflowConfidence, deterministicRemote.confidence || 0) >=
      Number(process.env.OPS_WORKFLOW_MIN_CONFIDENCE || 0.76);
  const scheduledFor = /^\d{4}-\d{2}-\d{2}$/.test(
    clean(output.scheduledFor, 20)
  )
    ? clean(output.scheduledFor, 20)
    : "";

  return {
    changed: assignmentChanged,
    assignees,
    summary: clean(
      (reconciledResponsibility.takeoverPeople.length ||
      reconciledResponsibility.evidencePeople.length ||
      reconciledResponsibility.endedPeople.length
        ? assignees.length
          ? `Currently assigned to ${assignees
              .map((entry) => entry.name)
              .join(", ")}.`
          : "Currently unassigned."
        : output.summary) ||
        (assignees.length
          ? `Currently assigned to ${assignees.map((entry) => entry.name).join(", ")}.`
          : "Currently unassigned."),
      700
    ),
    reason: clean(
      deterministicAssignmentReason ||
        output.reason ||
        (assignmentChanged
          ? "The latest Slack message explicitly changed who is responsible."
          : "The latest Slack message did not clearly change responsibility."),
      700
    ),
    confidence: effectiveAssignmentConfidence,
    participationChanged,
    participants,
    participationSummary: clean(
      (reconciledResponsibility.removedByTakeover.length
        ? `Previous contributors: ${participants
            .map((entry) => entry.name)
            .join(", ")}.`
        : output.participationSummary) ||
        (participants.length
          ? `Participating: ${participants.map((entry) => entry.name).join(", ")}.`
          : "No current participants."),
      700
    ),
    participationReason: clean(
      (reconciledResponsibility.removedByTakeover.length
        ? "A later explicit takeover ended the prior worker's current responsibility while preserving the earlier contribution."
        : output.participationReason) ||
        (participationChanged
          ? "The latest Slack message changed who contributed without taking remote or physical responsibility."
          : "The latest Slack message did not change participation."),
      700
    ),
    participationConfidence: reconciledResponsibility.removedByTakeover.length
      ? Math.max(Number(output.participationConfidence || 0), 0.98)
      : Number(output.participationConfidence || 0),
    priorityChanged,
    priorityTier: priorityChanged ? requestedTier : currentPriorityTier,
    priorityLabel: priorityChanged ? requestedLabel : currentPriorityLabel,
    priorityGenerated: priorityChanged
      ? requestedGenerated
      : currentPriorityGenerated,
    priorityOrder: priorityChanged ? requestedOrder : currentPriorityOrder,
    priorityReason: clean(
      output.priorityReason ||
        (priorityChanged
          ? "The latest work-order evidence changed the operational category."
          : "The latest evidence did not justify a category change."),
      700
    ),
    priorityContext: clean(
      output.priorityContext || workOrder.priorityContext || output.priorityReason,
      900
    ),
    priorityConfidence,
    workMode,
    remoteWorkActive,
    remoteStateChanged,
    remoteWorkReason: clean(
      remoteWorkReason ||
        (remoteWorkActive
          ? "The conversation indicates active remote work."
          : "The latest message does not establish active remote work."),
      700
    ),
    remoteWorkConfidence,
    workflowChanged,
    workflowStatus: workflowChanged
      ? deterministicWorkflowStatus
      : currentWorkflowStatus,
    workflowReason: clean(
      output.workflowReason ||
        (workflowChanged
          ? "The newest Slack evidence changed the circulation stage."
          : "The newest Slack evidence did not justify a circulation-stage change."),
      700
    ),
    workflowConfidence: Math.max(
      workflowConfidence,
      deterministicRemote.confidence || 0
    ),
    scheduledFor: workflowChanged && deterministicWorkflowStatus === "scheduled"
      ? scheduledFor
      : clean(workOrder.scheduledFor, 20),
    memoryIds: (Array.isArray(companyMemory) ? companyMemory : [])
      .map((memory) => clean(memory.id, 180))
      .filter(Boolean)
      .slice(0, 5),
    usage: {
      inputTokens: Number(response?.usage?.input_tokens || 0),
      outputTokens: Number(response?.usage?.output_tokens || 0),
    },
  };
}
