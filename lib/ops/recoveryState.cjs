const TERMINAL_COMMAND_PATTERN = /(?:^|\n)\s*!(done|complete)\b/i;
const BOT_ID_PATTERN = /^(?:magmo(?:[-_]|$)|USLACKBOT$)/i;
const BOT_NAME_PATTERN = /^(?:magmo(?:\s+(?:recovery|ai|bot|audit))?|slack(?:bot)?)$/i;

function clean(value, maxLength = 6000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function personKey(person) {
  const id = clean(person?.id, 120).toLowerCase();
  const name = clean(person?.name, 180).toLowerCase();
  return id || name;
}

function isBotLikePerson(person) {
  const id = clean(person?.id, 120);
  const name = clean(person?.name, 180);
  return !name || BOT_ID_PATTERN.test(id) || BOT_NAME_PATTERN.test(name);
}

function isHumanMessage(message) {
  return Boolean(message) && !message.botMessage && !isBotLikePerson(message.sender);
}

function uniquePeople(value = []) {
  const byKey = new Map();
  for (const raw of Array.isArray(value) ? value : []) {
    if (isBotLikePerson(raw)) continue;
    const id = clean(raw?.id, 120);
    const name = clean(raw?.name, 180);
    const key = personKey({ id, name });
    if (!key || /^U[A-Z0-9]+$/i.test(name)) continue;
    byKey.set(key, { id, name });
  }
  return [...byKey.values()];
}

function latestRecoveryCommand(messages = []) {
  let latest = null;
  for (const message of messages) {
    if (!isHumanMessage(message)) continue;
    const match = String(message.text || "").match(TERMINAL_COMMAND_PATTERN);
    if (!match) continue;
    const candidate = {
      command: `!${match[1].toLowerCase()}`,
      workflowStatus: match[1].toLowerCase() === "done" ? "done" : "service_complete",
      slackTs: clean(message.slackTs, 180),
      sender: message.sender || { id: "", name: "Slack" },
    };
    if (!latest || Number(candidate.slackTs || 0) >= Number(latest.slackTs || 0)) {
      latest = candidate;
    }
  }
  return latest;
}

function rootDispatchAssignees(rootMessage) {
  if (!rootMessage) return [];
  const text = clean(rootMessage.text, 6000);
  const match = text.match(/\bassign(?:ed)?\s+to\b([\s\S]*)/i);
  if (!match) return [];
  const assignmentClause = clean(match[1], 1200).toLowerCase();
  const senderKey = personKey(rootMessage.sender);
  return uniquePeople(rootMessage.candidates || []).filter((person) => {
    if (personKey(person) === senderKey) return false;
    const name = clean(person.name, 180).toLowerCase();
    return Boolean(name && assignmentClause.includes(name));
  });
}

function recoveryCandidates(messages = []) {
  const people = [];
  for (const message of messages) {
    if (!isHumanMessage(message)) continue;
    people.push(message.sender, ...(message.candidates || []));
  }
  return uniquePeople(people).slice(0, 40);
}

function messageLine(message) {
  const sender = clean(message?.sender?.name || "Slack", 100);
  const text = clean(message?.text, 700);
  return text ? `${message?.slackTs || "time unknown"} | ${sender}: ${text}` : "";
}

function compactLines(lines, maxLength) {
  const unique = [];
  const seen = new Set();
  for (const line of lines) {
    const value = String(line || "").trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    unique.push(value);
  }
  const joined = unique.join("\n");
  if (joined.length <= maxLength) return joined;

  const firstBudget = Math.floor(maxLength * 0.25);
  const middleBudget = Math.floor(maxLength * 0.3);
  const lastBudget = maxLength - firstBudget - middleBudget - 120;
  const first = joined.slice(0, firstBudget);
  const last = joined.slice(-lastBudget);
  const middleLines = unique.slice(1, -1);
  const sampled = [];
  const sampleCount = Math.max(1, Math.floor(middleBudget / 420));
  const step = Math.max(1, Math.floor(middleLines.length / sampleCount));
  for (let index = 0; index < middleLines.length && sampled.join("\n").length < middleBudget; index += step) {
    sampled.push(middleLines[index]);
  }
  return `${first}\n[representative middle-thread evidence]\n${sampled.join("\n").slice(0, middleBudget)}\n[latest thread evidence]\n${last}`.slice(0, maxLength);
}

function recoveryTranscript(messages = [], maxLength = 24000) {
  const humanMessages = messages.filter(isHumanMessage);
  const allLines = humanMessages.map(messageLine).filter(Boolean);
  if (!allLines.length) return "";
  const commandLines = humanMessages
    .filter((message) => TERMINAL_COMMAND_PATTERN.test(String(message.text || "")))
    .map(messageLine);
  const evidenceLines = humanMessages
    .filter((message) =>
      /\b(?:assign(?:ed)?\s+to|eta|en\s+route|heading\s+to|arriv(?:e|ed|ing)|on[-\s]?site|in[-\s]?person|remote(?:ly)?|teamviewer|anydesk|vpn|ssh|log(?:ged|ging)?\s+in|install(?:ed|ing)?|repair(?:ed|ing)?|replac(?:e|ed|ing)|test(?:ed|ing)?|troubleshoot(?:ed|ing)?|diagnos(?:e|ed|ing)|calibrat(?:e|ed|ing)|scan(?:ned|ning)?|deliver(?:ed|ing)?|completed?|finished|resolved|restored|waiting\s+(?:on|for)|on\s+hold|scheduled?)\b/i.test(
        String(message.text || "")
      )
    )
    .map(messageLine);
  const recentLines = allLines.slice(-80);
  return compactLines(
    ["Full Slack thread recovery evidence:", allLines[0], ...commandLines, ...evidenceLines, ...recentLines],
    maxLength
  );
}

function slackTsToIso(slackTs) {
  const milliseconds = Number(slackTs || 0) * 1000;
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return "";
  return new Date(milliseconds).toISOString();
}

function initialRecoveryStage({ messages = [], bluefolderAssignees = [], nowMs = Date.now() } = {}) {
  const command = latestRecoveryCommand(messages);
  if (command) {
    return {
      workflowStatus: command.workflowStatus,
      reason: `Recovered Slack thread contains ${command.command}.`,
      confidence: 1,
      command,
    };
  }
  const humanMessages = messages.filter(isHumanMessage);
  const latest = humanMessages[humanMessages.length - 1];
  const latestMs = Number(latest?.slackTs || 0) * 1000;
  if (Number.isFinite(latestMs) && latestMs > 0 && latestMs <= nowMs - 7 * 86400000) {
    return {
      workflowStatus: "inactive",
      reason: "Recovered thread has no recorded activity for seven days.",
      confidence: 1,
      command: null,
    };
  }
  return {
    workflowStatus: uniquePeople(bluefolderAssignees).length ? "active" : "unassigned",
    reason: uniquePeople(bluefolderAssignees).length
      ? "The current BlueFolder Assigned To field identifies a dispatched engineer."
      : "No current BlueFolder dispatch assignment or terminal Slack command was found.",
    confidence: 0.7,
    command: null,
  };
}

module.exports = {
  initialRecoveryStage,
  isBotLikePerson,
  isHumanMessage,
  latestRecoveryCommand,
  recoveryCandidates,
  recoveryTranscript,
  rootDispatchAssignees,
  slackTsToIso,
  uniquePeople,
};
