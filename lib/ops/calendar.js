import {
  inferOpsWorkMode,
  listOpsCalendarSource,
  listOpsAssigneeOptions,
} from "./workOrders";
import {
  listOpsTimeEntriesForRange,
  listOpsTimeEntriesForWorkOrder,
} from "./timeTracking";
import calendarSessionEvidence from "./calendarSessionEvidence.cjs";

const {
  buildOnsiteSessionDetails,
  compareSlackTimestamps,
  hasImmediateDepartureStatement,
  isAuthoredOnsiteContext,
  isEvidenceCaughtUp,
  resolveAuthoredRetrospectiveArrival,
  shouldRenderTimedAssignmentHistory,
  shouldCloseAuthoredOnsiteSession,
  splitOnsiteSessionRows,
} = calendarSessionEvidence;

export const OPS_CALENDAR_TIME_ZONE =
  process.env.OPS_TIME_ZONE || "America/Los_Angeles";
export const OPS_HOURS_CALCULATION_VERSION = "2026-08-26.1";

const WORK_SIGNAL =
  /\b(?:work(?:ed|ing)?|check(?:ed|ing)?|test(?:ed|ing)?|qa|fix(?:ed|ing)?|repair(?:ed|ing)?|replac(?:e|ed|ing)|install(?:ed|ing)?|upgrad(?:e|ed|ing)|troubleshoot(?:ed|ing)?|diagnos(?:e|ed|ing)|resolv(?:e|ed|ing)|restor(?:e|ed|ing)|reboot(?:ed|ing)?|connect(?:ed|ing)?|calibrat(?:e|ed|ing))\b/i;
const REMOTE_ACTIVITY_SIGNAL =
  /\b(?:remote(?:ly)?|teamviewer|anydesk|screen\s*share|shared\s+(?:my\s+)?screen|vpn|ssh|vnc|rdp|putty|log(?:ged|ging)?\s+(?:in|into))\b/i;
const TECHNICAL_ACTIVITY_SIGNAL =
  /\b(?:errors?|diagnostics?|connection|comms?|certificate|cert|reboot(?:ed|ing)?|power|status|failing|failure|online|offline|responding|voltage|pressure|fuses?)\b/i;
const ONSITE_TRAVEL_SIGNAL =
  /\b(?:eta|on\s+(?:my|the)\s+way|heading\s+(?:to|over|there)|en\s+route|driving\s+to|dispatch(?:ed|ing)?\s+to)\b/i;
const ONSITE_ARRIVAL_SIGNAL =
  /\b(?:(?:i|we)(?:\s+have|'ve)?\s+arriv(?:ed|ing)|have\s+arrived\s+(?:back\s+)?(?:on[-\s]?site|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner))|arriv(?:ed|ing)\s+(?:back\s+)?(?:on[-\s]?site|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner))|(?:tech|engineer|fse)\s+(?:has\s+)?arriv(?:ed|ing)|(?:i(?:'m|\s+am)|we(?:'re|\s+are)|currently)\s+(?:on[-\s]?site|in[-\s]?person)|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner))\b/i;
const ONSITE_PHYSICAL_SIGNAL =
  /\b(?:physical(?:ly)?|at\s+the\s+(?:scanner|machine|system)|opened\s+(?:the\s+)?(?:gantry|cabinet|system)|replac(?:ed|ing)|install(?:ed|ing)|swapp?(?:ed|ing)|connect(?:ed|ing)\s+(?:the\s+)?(?:cable|board|chassis|tube|detector)|upgrad(?:ed|ing)\s+(?:the\s+)?(?:scanner|machine|system)|perform(?:ed|ing)\s+(?:a\s+)?(?:final\s+)?qa)\b/i;
const ONSITE_END_SIGNAL =
  /\b(?:leav(?:e|ing)|left\s+(?:the\s+)?site|heading\s+(?:out|back|home)|depart(?:ed|ing)|wrapped\s+up|finished\s+(?:on[-\s]?site|at\s+(?:the\s+)?site)|final\s+qa\s+(?:is\s+)?(?:done|complete|passed)|test\s+scan\s+(?:ok|passed|complete|done))\b/i;
const FIRST_PERSON_WORK =
  /\b(?:i|we)(?:'m|'re|\s+am|\s+are|\s+will|'ll)?\s+(?:work|check|test|fix|repair|replace|install|troubleshoot|diagnose|deliver|drive|head|go|call|handle|take|look|log)/i;
const SCHEDULE_SIGNAL =
  /\b(?:schedul(?:e|ed|ing)|appointment|visit|eta|arriv(?:e|al|ing)|tomorrow|today|next\s+(?:sun|mon|tue|wed|thu|fri|sat)|this\s+(?:sun|mon|tue|wed|thu|fri|sat)|at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i;
const ATTRIBUTED_ONSITE_ACTION =
  "(?:eta|on\\s+(?:my|the)\\s+way|heading\\s+(?:to|back|out)|en\\s+route|arriv(?:ed|ing)|on[-\\s]?site|at\\s+(?:the\\s+)?(?:site|scanner|machine|system)|replac(?:ed|ing)|install(?:ed|ing)|swapp?(?:ed|ing)|opened\\s+(?:the\\s+)?(?:gantry|cabinet|system)|upgrad(?:ed|ing)|perform(?:ed|ing)\\s+(?:a\\s+)?(?:final\\s+)?qa|leav(?:e|ing)|depart(?:ed|ing))";

const WEEKDAYS = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tues: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thur: 4,
  thurs: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};
const MONTHS = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

function clean(value, limit = 1000) {
  return String(value || "").trim().slice(0, limit);
}

function parseTimestamp(value) {
  const slackSeconds = Number(value);
  if (Number.isFinite(slackSeconds) && slackSeconds > 1000000000) {
    return new Date(slackSeconds * 1000);
  }
  const parsed = new Date(value || "");
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function zonedParts(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: OPS_CALENDAR_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const result = {};
  parts.forEach((part) => {
    if (part.type !== "literal") result[part.type] = Number(part.value);
  });
  return { year: result.year, month: result.month, day: result.day };
}

function dateKey(parts) {
  return [parts.year, parts.month, parts.day]
    .map((part, index) => String(part).padStart(index ? 2 : 4, "0"))
    .join("-");
}

function partsFromKey(key) {
  const [year, month, day] = String(key).split("-").map(Number);
  return { year, month, day };
}

function addCalendarDays(parts, amount) {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + amount));
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function validCalendarDate(parts) {
  const test = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  return (
    test.getUTCFullYear() === parts.year &&
    test.getUTCMonth() + 1 === parts.month &&
    test.getUTCDate() === parts.day
  );
}

function zoneOffsetMinutes(parts) {
  const sample = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12));
  const zoneName = new Intl.DateTimeFormat("en-US", {
    timeZone: OPS_CALENDAR_TIME_ZONE,
    timeZoneName: "longOffset",
  })
    .formatToParts(sample)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = String(zoneName || "").match(/GMT([+-])(\d{2}):?(\d{2})?/i);
  if (!match) return 0;
  const magnitude = Number(match[2]) * 60 + Number(match[3] || 0);
  return match[1] === "-" ? -magnitude : magnitude;
}

function zonedDate(parts, hour = 0, minute = 0) {
  const offset = zoneOffsetMinutes(parts);
  return new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute) -
      offset * 60000
  );
}

function parseClock(text) {
  const normalized = clean(text, 6000).toLowerCase().replace(/a\.m\./g, "am").replace(/p\.m\./g, "pm");
  const match =
    normalized.match(
      /\b(?:at|around|by)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/
    ) || normalized.match(/\b(\d{1,2})(?::(\d{2}))\s*(am|pm)\b/);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3];
  if (minute > 59 || hour > (meridiem ? 12 : 23)) return null;
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  return { hour, minute };
}

function parseScheduledDate(text, sourceDate) {
  const normalized = clean(text, 6000).toLowerCase();
  if (!SCHEDULE_SIGNAL.test(normalized) && !/\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/.test(normalized)) {
    return null;
  }
  const source = zonedParts(sourceDate);
  let target = null;
  let explicitDate = false;
  const numeric = normalized.match(
    /\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/
  );
  if (numeric) {
    let year = numeric[3] ? Number(numeric[3]) : source.year;
    if (year < 100) year += 2000;
    target = { year, month: Number(numeric[1]), day: Number(numeric[2]) };
    explicitDate = true;
  }
  if (!target) {
    const named = normalized.match(
      /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sept|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(\d{4}))?\b/
    );
    if (named) {
      target = {
        year: Number(named[3] || source.year),
        month: MONTHS[named[1]],
        day: Number(named[2]),
      };
      explicitDate = true;
    }
  }
  if (!target && /\btomorrow\b/.test(normalized)) {
    target = addCalendarDays(source, 1);
  }
  if (!target && /\btoday\b/.test(normalized)) target = source;
  if (!target) {
    const weekday = normalized.match(
      /\b(?:(next|this)\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)\b/
    );
    if (weekday) {
      const currentWeekday = new Date(
        Date.UTC(source.year, source.month - 1, source.day)
      ).getUTCDay();
      let distance = (WEEKDAYS[weekday[2]] - currentWeekday + 7) % 7;
      if (weekday[1] === "next") distance = distance === 0 ? 7 : distance;
      target = addCalendarDays(source, distance);
    }
  }
  if (!target || !validCalendarDate(target)) return null;
  if (!numeric?.[3] && !explicitDate) {
    target.year = target.year || source.year;
  }
  const clock = parseClock(normalized);
  const start = zonedDate(target, clock?.hour ?? 9, clock?.minute ?? 0);
  return {
    start,
    end: new Date(start.getTime() + 60 * 60000),
    allDay: !clock,
  };
}

function summarizeMessage(value) {
  const text = clean(value, 6000)
    .replace(/<([^>|]+)\|([^>]+)>/g, "$2")
    .replace(/<https?:\/\/[^>]+>/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 240 ? text.slice(0, 237).trimEnd() + "..." : text;
}

function uniquePeople(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .filter((person) => {
      const key = clean(person?.id || person?.name, 120).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((person) => ({ id: clean(person.id, 80), name: clean(person.name, 100) }))
    .filter((person) => person.name && !/^U[A-Z0-9]{6,}$/i.test(person.name));
}

function personIdentityKeys(person) {
  return [person?.id, person?.name]
    .map((value) => clean(value, 120).toLowerCase())
    .filter(Boolean);
}

function onsiteContextFor(contexts, person, at) {
  const context = personIdentityKeys(person)
    .map((key) => contexts.get(key))
    .find(Boolean);
  if (!context) return null;
  const elapsed = at.getTime() - context.lastEvidenceAt.getTime();
  return elapsed >= 0 && elapsed <= 18 * 3600000 ? context : null;
}

function rememberOnsiteContext(contexts, person, at, day) {
  const existing = onsiteContextFor(contexts, person, at);
  const context = existing || { day, keys: new Set() };
  context.lastEvidenceAt = at;
  personIdentityKeys(person).forEach((key) => {
    context.keys.add(key);
    contexts.set(key, context);
  });
  return context;
}

function clearOnsiteContext(contexts, context) {
  context?.keys?.forEach((key) => {
    if (contexts.get(key) === context) contexts.delete(key);
  });
}

function escapePattern(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function peopleNamedNearOnsiteEvidence(message) {
  const text = clean(message.text, 6000);
  const roster = uniquePeople([
    ...listOpsAssigneeOptions(),
    ...(message.candidates || []),
  ]);
  const firstNameCounts = new Map();
  roster.forEach((person) => {
    const first = clean(person.name, 100).split(/\s+/)[0]?.toLowerCase();
    if (first?.length >= 4) firstNameCounts.set(first, (firstNameCounts.get(first) || 0) + 1);
  });
  return roster.filter((person) => {
    const fullName = clean(person.name, 100);
    if (!fullName) return false;
    const firstName = fullName.split(/\s+/)[0];
    const aliases = [fullName];
    if (
      firstName?.length >= 4 &&
      firstNameCounts.get(firstName.toLowerCase()) === 1
    ) {
      aliases.push(firstName);
      if (firstName.length > 4) aliases.push(firstName.slice(0, 4));
    }
    return aliases.some((alias) => {
      const namePattern = `(?:@\\s*)?\\b${escapePattern(alias).replace(/\\\s+/g, "\\s+")}\\b`;
      return new RegExp(
        `(?:${namePattern})[\\s\\S]{0,90}${ATTRIBUTED_ONSITE_ACTION}|${ATTRIBUTED_ONSITE_ACTION}[\\s\\S]{0,90}(?:${namePattern})`,
        "i"
      ).test(text);
    });
  });
}

function peopleForMessage(workOrder, message, historyMatch, evidence) {
  if (evidence?.kind === "remote" && historyMatch?.assignees?.length) {
    return uniquePeople(historyMatch.assignees);
  }
  const assigned = uniquePeople([
    ...(workOrder.assignees || []),
    ...(workOrder.bluefolderAssignees || []),
  ]);
  const assignedKeys = new Set(
    assigned.flatMap((person) =>
      [person.id, person.name]
        .filter(Boolean)
        .map((value) => value.toLowerCase())
    )
  );
  const candidates = uniquePeople(message.candidates || []);
  if (message.legacyDefaultDuration) {
    return uniquePeople(
      candidates.length
        ? candidates
        : message.sender?.name && message.sender.name !== "Unknown"
        ? [message.sender]
        : workOrder.assignees || []
    );
  }
  if (evidence?.kind === "in_person") {
    const namedPeople = peopleNamedNearOnsiteEvidence(message);
    if (namedPeople.length) return namedPeople;
  }
  const sender = message.sender;
  const senderIsAssigned = [sender?.id, sender?.name]
    .filter(Boolean)
    .some((value) => assignedKeys.has(value.toLowerCase()));
  const senderExplicitlyDescribesOwnWork =
    FIRST_PERSON_WORK.test(message.text) ||
    /\b(?:i|we|i['â€™]?m|we['â€™]?re|my|our)\b[\s\S]{0,70}(?:eta|arriv(?:ed|ing)|on[-\s]?site|at\s+(?:the\s+)?(?:site|scanner|machine|system)|replac(?:ed|ing)|install(?:ed|ing)|swapp?(?:ed|ing)|opened|upgrad(?:ed|ing)|qa|leav(?:e|ing)|heading\s+(?:to|back|out)|depart(?:ed|ing))\b/i.test(
      message.text
    );
  if (
    (sender?.id || sender?.name) &&
    (senderExplicitlyDescribesOwnWork ||
      (senderIsAssigned &&
        (REMOTE_ACTIVITY_SIGNAL.test(message.text) ||
          ONSITE_TRAVEL_SIGNAL.test(message.text) ||
          ONSITE_ARRIVAL_SIGNAL.test(message.text) ||
          ONSITE_PHYSICAL_SIGNAL.test(message.text) ||
          ONSITE_END_SIGNAL.test(message.text) ||
          TECHNICAL_ACTIVITY_SIGNAL.test(message.text))))
  ) {
    return uniquePeople([sender]);
  }
  return [];
}

function estimatedArrival(text, sourceDate) {
  const normalized = clean(text, 4000).toLowerCase();
  const minutesMatch = normalized.match(
    /\beta\b.{0,15}?(\d{1,3})\s*(?:min|mins|minute|minutes)\b/
  );
  if (minutesMatch) {
    return new Date(sourceDate.getTime() + Number(minutesMatch[1]) * 60000);
  }
  const hoursMatch = normalized.match(
    /\beta\b.{0,15}?(\d+(?:\.\d+)?)\s*(?:hr|hrs|hour|hours)\b/
  );
  if (hoursMatch) {
    return new Date(sourceDate.getTime() + Number(hoursMatch[1]) * 3600000);
  }
  const etaClock = normalized.match(
    /\beta\b.{0,12}?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/
  );
  if (etaClock) {
    const parts = zonedParts(sourceDate);
    let hour = Number(etaClock[1]);
    const minute = Number(etaClock[2] || 0);
    if (etaClock[3] === "pm" && hour < 12) hour += 12;
    if (etaClock[3] === "am" && hour === 12) hour = 0;
    const result = zonedDate(parts, hour, minute);
    if (result < sourceDate) return new Date(result.getTime() + 86400000);
    return result;
  }
  return null;
}

function calendarEvidence(message, sourceDate) {
  const text = clean(message.text, 6000);
  const explicitMode = ["remote", "in_person", "mixed"].includes(message.workMode)
    ? message.workMode
    : inferOpsWorkMode(text);
  const remote =
    explicitMode === "remote" ||
    (REMOTE_ACTIVITY_SIGNAL.test(text) && WORK_SIGNAL.test(text));
  const traveling = ONSITE_TRAVEL_SIGNAL.test(text);
  const arrived = ONSITE_ARRIVAL_SIGNAL.test(text);
  const physical =
    arrived ||
    ONSITE_PHYSICAL_SIGNAL.test(text);
  if (remote && !arrived && !ONSITE_PHYSICAL_SIGNAL.test(text)) {
    return { kind: "remote", phase: "working" };
  }
  if (traveling) {
    return {
      kind: "in_person",
      phase: "traveling",
      estimatedArrival: estimatedArrival(text, sourceDate),
    };
  }
  if (physical) {
    return {
      kind: "in_person",
      phase: arrived ? "arrived" : "working",
      effectiveArrival: arrived
        ? resolveAuthoredRetrospectiveArrival(
            text,
            sourceDate,
            OPS_CALENDAR_TIME_ZONE
          )
        : null,
    };
  }
  if (message.legacyDefaultDuration) {
    return { kind: "in_person", phase: "legacy_unknown", legacyDefault: true };
  }
  return null;
}

function addSessionEvidence(
  groups,
  workOrder,
  message,
  sourceDate,
  people,
  evidence,
  sessionDay = null
) {
  people.forEach((person) => {
    const personKey = clean(person.id || person.name, 120);
    if (!personKey) return;
    const day = sessionDay || dateKey(zonedParts(sourceDate));
    const key = [workOrder.id, day, personKey, evidence.kind].join("::");
    if (!groups.has(key)) {
      groups.set(key, {
        workOrder,
        person,
        kind: evidence.kind,
        day,
        rows: [],
      });
    }
    groups.get(key).rows.push({
      at: sourceDate,
      phase: evidence.phase,
      estimatedArrival: evidence.estimatedArrival || null,
      effectiveArrival: evidence.effectiveArrival || null,
      legacyDefault: Boolean(evidence.legacyDefault),
      message,
    });
  });
}

function onsiteEvidenceDay(evidence, sourceDate) {
  const effectiveArrival = evidence?.effectiveArrival;
  return dateKey(
    zonedParts(
      effectiveArrival instanceof Date && !Number.isNaN(effectiveArrival.getTime())
        ? effectiveArrival
        : sourceDate
    )
  );
}

function buildConversationSessions(groups) {
  const events = [];
  groups.forEach((group, key) => {
    const rows = group.rows.sort((left, right) => left.at - right.at);
    const base = baseEvent(group.workOrder);
    const person = group.person;
    const summary = rows
      .map((row) => summarizeMessage(row.message.text))
      .filter(Boolean)
      .join(" ")
      .slice(0, 420);
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "-");

    if (group.kind === "remote") {
      const start = rows[0].at;
      const last = rows[rows.length - 1].at;
      const hasBoundedSpan =
        rows.length > 1 &&
        last.getTime() - start.getTime() >= 5 * 60000 &&
        last.getTime() - start.getTime() <= 12 * 3600000;
      events.push({
        ...base,
        id: `remote-${safeKey}`,
        title: `#${group.workOrder.number} ${group.workOrder.subject}`,
        start: start.toISOString(),
        end: new Date(
          hasBoundedSpan ? last.getTime() : start.getTime() + 5 * 60000
        ).toISOString(),
        allDay: false,
        unknownDuration: !hasBoundedSpan,
        people: uniquePeople([person]),
        mode: "remote",
        source: "activity",
        summary,
        messageCount: rows.length,
        inferenceReason: hasBoundedSpan
          ? "Remote work is bounded by multiple Slack updates."
          : "Slack confirms remote work, but not its duration.",
      });
      return;
    }

    const sessions = splitOnsiteSessionRows(rows);
    sessions.forEach((session, index) => {
      const sessionSummary = session.rows
        .map((row) => summarizeMessage(row.message.text))
        .filter(Boolean)
        .join(" ")
        .slice(0, 420);
      const containsLegacyDefault = session.rows.some(
        (row) => row.legacyDefault
      );
      const estimatedStart = session.rows.some(
        (row) =>
          row.phase === "traveling" &&
          row.estimatedArrival &&
          session.start?.getTime() === row.estimatedArrival.getTime()
      );
      if (!session.marker) return;
      events.push({
        ...base,
        id: `onsite-${safeKey}${sessions.length > 1 ? `-${index + 1}` : ""}`,
        title: `#${group.workOrder.number} ${group.workOrder.subject}`,
        start: session.marker.toISOString(),
        end: new Date(
          session.bounded
            ? session.end.getTime()
            : session.marker.getTime() + 5 * 60000
        ).toISOString(),
        allDay: false,
        unknownDuration: !session.bounded,
        people: uniquePeople([person]),
        mode: "in_person",
        source: session.bounded ? "activity" : "onsite_unknown",
        summary: sessionSummary,
        messageCount: session.rows.length,
        inferenceReason: session.bounded
          ? estimatedStart
            ? "Estimated arrival and the final onsite/departure update bound this session."
            : "Onsite arrival/work and departure updates bound this session."
          : containsLegacyDefault
          ? "This was a legacy automatic 45-minute estimate. The thread does not establish reliable start and end times, so its duration is unknown."
          : "Slack confirms physical onsite work, but does not establish both start and end times.",
      });
    });
  });
  return events;
}

function collectHoursSessionEvidence(workOrder, rawMessages, cutoff) {
  const groups = new Map();
  const historyBySlackTs = new Map(
    (workOrder.assignmentHistory || [])
      .filter((entry) => entry.triggerSlackTs)
      .map((entry) => [String(entry.triggerSlackTs), entry])
  );
  const onsiteContexts = new Map();
  const messages = (Array.isArray(rawMessages) ? rawMessages : [])
    .filter((message) => {
      const at = parseTimestamp(message.slackTs);
      return at && at <= cutoff;
    })
    .sort(
      (left, right) =>
        parseTimestamp(left.slackTs).getTime() -
        parseTimestamp(right.slackTs).getTime()
    );

  messages.forEach((message) => {
    const sourceDate = parseTimestamp(message.slackTs);
    if (!sourceDate) return;
    const historyMatch = historyBySlackTs.get(String(message.slackTs));
    const senderContext = onsiteContextFor(
      onsiteContexts,
      message.sender,
      sourceDate
    );
    let evidence = null;
    let people = [];
    if (
      shouldCloseAuthoredOnsiteSession(
        message.text,
        Boolean(senderContext)
      )
    ) {
      evidence = { kind: "in_person", phase: "ended" };
      people = uniquePeople([message.sender]);
    } else if (hasImmediateDepartureStatement(message.text)) {
      people = peopleNamedNearOnsiteEvidence(message).filter((person) =>
        onsiteContextFor(onsiteContexts, person, sourceDate)
      );
      if (people.length) evidence = { kind: "in_person", phase: "ended" };
    }
    if (!evidence) {
      evidence = calendarEvidence(message, sourceDate);
      people = peopleForMessage(workOrder, message, historyMatch, evidence);
      if (
        evidence?.kind === "in_person" &&
        ["traveling", "arrived", "working"].includes(evidence.phase) &&
        !evidence.legacyDefault
      ) {
        if (isAuthoredOnsiteContext(message.text, evidence.phase)) {
          people = uniquePeople([message.sender]);
        } else {
          const safeNamedStatement =
            !/\?/.test(message.text) &&
            !/\b(?:tomorrow|next\s+(?:week|day|mon|tue|wed|thu|fri|sat|sun))\b/i.test(
              message.text
            ) &&
            !(
              evidence.phase === "traveling" &&
              /\b(?:driver|courier|package|shipment|delivery|tracking|fedex|ups|part|parts)\b/i.test(
                message.text
              )
            );
          people = safeNamedStatement
            ? peopleNamedNearOnsiteEvidence(message)
            : [];
        }
      }
    }
    if (
      !evidence ||
      evidence.kind !== "in_person" ||
      evidence.legacyDefault ||
      !people.length
    ) {
      return;
    }
    if (["traveling", "arrived", "working"].includes(evidence.phase)) {
      people.forEach((person) => {
        const context = rememberOnsiteContext(
          onsiteContexts,
          person,
          sourceDate,
          onsiteEvidenceDay(evidence, sourceDate)
        );
        addSessionEvidence(
          groups,
          workOrder,
          message,
          sourceDate,
          [person],
          evidence,
          context.day
        );
      });
      return;
    }
    if (evidence.phase === "ended") {
      people.forEach((person) => {
        const context = onsiteContextFor(onsiteContexts, person, sourceDate);
        if (!context) return;
        addSessionEvidence(
          groups,
          workOrder,
          message,
          sourceDate,
          [person],
          evidence,
          context.day
        );
        clearOnsiteContext(onsiteContexts, context);
      });
    }
  });
  return groups;
}

function personKey(person) {
  return clean(person?.id || person?.name, 180).toLowerCase();
}

function slackHoursSessions(groups, cutoff) {
  const result = [];
  groups.forEach((group, groupKey) => {
    splitOnsiteSessionRows(group.rows).forEach((session, index) => {
      const details = buildOnsiteSessionDetails(session.rows, { cutoff });
      if (!details.confirmedPhysical) return;
      result.push({
        id: `magmo-${groupKey.replace(/[^a-zA-Z0-9_-]/g, "-")}-${index + 1}`,
        person: group.person,
        day: group.day,
        source: "magmo_ai",
        official: false,
        ...details,
      });
    });
  });
  return result;
}

function closestManualTravelEntry(travelEntries, workEntry, usedTravelIds) {
  const person = personKey(workEntry.person);
  const workStartMs = Date.parse(workEntry.startedAt || "");
  if (!person || !Number.isFinite(workStartMs)) return null;
  return travelEntries
    .filter((entry) => {
      if (usedTravelIds.has(entry.id) || personKey(entry.person) !== person) {
        return false;
      }
      const travelStartMs = Date.parse(entry.startedAt || "");
      const travelEndMs = Date.parse(entry.endedAt || "");
      const arrivalMs = Number.isFinite(travelEndMs) ? travelEndMs : workStartMs;
      return (
        Number.isFinite(travelStartMs) &&
        travelStartMs <= workStartMs &&
        arrivalMs <= workStartMs + 10 * 60000 &&
        workStartMs - travelStartMs <= 18 * 3600000
      );
    })
    .sort(
      (left, right) =>
        Date.parse(right.startedAt || "") - Date.parse(left.startedAt || "")
    )[0] || null;
}

function manualHoursSessions(entries, cutoff) {
  const cutoffMs = cutoff.getTime();
  const travelEntries = entries.filter((entry) => entry.timeType === "travel");
  const workEntries = entries.filter((entry) => entry.timeType !== "travel");
  const usedTravelIds = new Set();
  const sessions = workEntries.map((entry) => {
    const startMs = Date.parse(entry.startedAt || "");
    const recordedEndMs = Date.parse(entry.endedAt || "");
    const endMs = Number.isFinite(recordedEndMs) && recordedEndMs <= cutoffMs
      ? recordedEndMs
      : NaN;
    const elapsedMs = cutoffMs - startMs;
    const validClosed =
      Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs;
    const stale =
      Number.isFinite(startMs) && !validClosed && elapsedMs > 18 * 3600000;
    const status = validClosed
      ? "determined"
      : Number.isFinite(startMs) && elapsedMs >= 0 && !stale
      ? "ongoing"
      : "undetermined";
    const travelEntry = closestManualTravelEntry(
      travelEntries,
      entry,
      usedTravelIds
    );
    if (travelEntry) usedTravelIds.add(travelEntry.id);
    const travelStartMs = Date.parse(travelEntry?.startedAt || "");
    const travelEndMs = Date.parse(travelEntry?.endedAt || "");
    const travelArrivalMs = Number.isFinite(travelEndMs)
      ? Math.min(travelEndMs, startMs)
      : startMs;
    return {
      id: `official-${entry.id}`,
      person: entry.person,
      day: Number.isFinite(startMs)
        ? dateKey(zonedParts(new Date(startMs)))
        : "",
      source: "official_manual_clock",
      official: true,
      status,
      reason: validClosed
        ? "The official Magmo work clock establishes arrival and departure."
        : stale
        ? "The open official work clock exceeds 18 hours and needs review before hours are reported."
        : "The official work clock is still open; elapsed service time is provisional.",
      confirmedPhysical: true,
      travel: {
        startedAt: Number.isFinite(travelStartMs)
          ? new Date(travelStartMs).toISOString()
          : "",
        arrivalAt: Number.isFinite(travelArrivalMs)
          ? new Date(travelArrivalMs).toISOString()
          : "",
        durationMinutes:
          Number.isFinite(travelStartMs) &&
          Number.isFinite(travelArrivalMs) &&
          travelArrivalMs >= travelStartMs
            ? Math.floor((travelArrivalMs - travelStartMs) / 60000)
            : null,
        basis: travelEntry ? "official_travel_clock" : "undetermined",
      },
      arrival: {
        at: Number.isFinite(startMs) ? new Date(startMs).toISOString() : "",
        basis: "official_work_clock_in",
      },
      service: {
        startedAt: Number.isFinite(startMs) ? new Date(startMs).toISOString() : "",
        endedAt: validClosed ? new Date(endMs).toISOString() : "",
        durationMinutes: validClosed
          ? Math.floor((endMs - startMs) / 60000)
          : null,
        serviceMinutesSoFar:
          status === "ongoing" ? Math.floor(elapsedMs / 60000) : null,
        provisional: status === "ongoing",
      },
      departure: {
        at: validClosed ? new Date(endMs).toISOString() : "",
        basis: validClosed ? "official_work_clock_out" : "undetermined",
      },
      evidence: [
        {
          phase: "official_work_clock",
          at: Number.isFinite(startMs) ? new Date(startMs).toISOString() : "",
          timeEntryId: entry.id,
          status: entry.status,
        },
        ...(travelEntry
          ? [
              {
                phase: "official_travel_clock",
                at: new Date(travelStartMs).toISOString(),
                timeEntryId: travelEntry.id,
                status: travelEntry.status,
              },
            ]
          : []),
      ],
    };
  });

  travelEntries
    .filter((entry) => !usedTravelIds.has(entry.id))
    .forEach((entry) => {
      const startMs = Date.parse(entry.startedAt || "");
      const endMs = Date.parse(entry.endedAt || "");
      if (!Number.isFinite(startMs)) return;
      sessions.push({
        id: `official-travel-${entry.id}`,
        person: entry.person,
        day: dateKey(zonedParts(new Date(startMs))),
        source: "official_manual_travel",
        official: true,
        status: "undetermined",
        reason: "Official travel is recorded, but an arrival/work start and departure do not establish service hours.",
        confirmedPhysical: true,
        travel: {
          startedAt: new Date(startMs).toISOString(),
          arrivalAt:
            Number.isFinite(endMs) && endMs <= cutoffMs
              ? new Date(endMs).toISOString()
              : "",
          durationMinutes:
            Number.isFinite(endMs) && endMs > startMs && endMs <= cutoffMs
              ? Math.floor((endMs - startMs) / 60000)
              : null,
          basis: "official_travel_clock",
        },
        arrival: { at: "", basis: "undetermined" },
        service: {
          startedAt: "",
          endedAt: "",
          durationMinutes: null,
          serviceMinutesSoFar: null,
          provisional: false,
        },
        departure: { at: "", basis: "undetermined" },
        evidence: [
          {
            phase: "official_travel_clock",
            at: new Date(startMs).toISOString(),
            timeEntryId: entry.id,
            status: entry.status,
          },
        ],
      });
    });
  return sessions;
}

function sessionSortTime(session) {
  return Date.parse(
    session.travel?.startedAt ||
      session.arrival?.at ||
      session.service?.startedAt ||
      session.evidence?.[0]?.at ||
      ""
  );
}

function sessionTimeWindow(session, cutoff) {
  const evidenceTimes = (session.evidence || [])
    .map((entry) => Date.parse(entry.at || ""))
    .filter(Number.isFinite);
  const starts = [
    Date.parse(session.travel?.startedAt || ""),
    Date.parse(session.arrival?.at || ""),
    Date.parse(session.service?.startedAt || ""),
    ...evidenceTimes,
  ].filter(Number.isFinite);
  const ends = [
    Date.parse(session.departure?.at || ""),
    Date.parse(session.service?.endedAt || ""),
    ...evidenceTimes,
  ].filter(Number.isFinite);
  if (!starts.length) return null;
  const startMs = Math.min(...starts);
  const endMs = ends.length
    ? Math.max(startMs, ...ends)
    : session.status === "ongoing"
    ? cutoff.getTime()
    : startMs;
  return { startMs, endMs };
}

function overlapsOfficialSession(inferred, official, cutoff) {
  if (personKey(inferred.person) !== personKey(official.person)) return false;
  const inferredWindow = sessionTimeWindow(inferred, cutoff);
  const officialWindow = sessionTimeWindow(official, cutoff);
  if (!inferredWindow || !officialWindow) return false;
  const marginMs = 10 * 60000;
  return (
    inferredWindow.startMs <= officialWindow.endMs + marginMs &&
    inferredWindow.endMs >= officialWindow.startMs - marginMs
  );
}

export async function getOpsWorkOrderHoursContext({
  workOrderId,
  throughSlackTs,
  evidenceThroughSlackTs = "",
}) {
  const cutoff = parseTimestamp(throughSlackTs);
  if (!cutoff) throw new Error("A valid Slack command timestamp is required.");
  const [
    { workOrders, messagesByWorkOrder, messageMetadataByWorkOrder },
    manualEntries,
  ] = await Promise.all([
    listOpsCalendarSource({ workOrderId }),
    listOpsTimeEntriesForWorkOrder({
      workOrderId,
      throughIso: cutoff.toISOString(),
    }),
  ]);
  const workOrder = workOrders.find((entry) => entry.id === workOrderId);
  if (!workOrder) {
    throw new Error(`Ops work order ${workOrderId} does not exist.`);
  }
  const availableMessages = (messagesByWorkOrder[workOrder.id] || []).filter(
    (message) => {
      const at = parseTimestamp(message.slackTs);
      return at && at <= cutoff;
    }
  );
  const analyzedThroughSlackTs = availableMessages.reduce(
    (latest, message) =>
      !latest || compareSlackTimestamps(message.slackTs, latest) > 0
        ? message.slackTs
        : latest,
    ""
  );
  const groups = collectHoursSessionEvidence(
    workOrder,
    availableMessages,
    cutoff
  );
  const officialSessions = manualHoursSessions(manualEntries, cutoff);
  const officialWorkSessions = officialSessions.filter(
    (session) => session.source === "official_manual_clock"
  );
  const inferredSessions = slackHoursSessions(groups, cutoff).filter(
    (session) =>
      !officialWorkSessions.some((official) =>
        overlapsOfficialSession(session, official, cutoff)
      )
  );
  const byPerson = new Map();
  [...officialSessions, ...inferredSessions].forEach((session) => {
    const key = personKey(session.person);
    if (!key || !session.confirmedPhysical) return;
    if (!byPerson.has(key)) {
      byPerson.set(key, {
        person: session.person,
        confirmations: new Set(),
        sessions: [],
      });
    }
    const engineer = byPerson.get(key);
    engineer.confirmations.add(
      session.official ? "official_manual_clock" : "magmo_ai_in_person"
    );
    engineer.sessions.push(session);
  });
  const engineers = [...byPerson.values()]
    .map((engineer) => ({
      person: engineer.person,
      confirmations: [...engineer.confirmations],
      sessions: engineer.sessions.sort(
        (left, right) => sessionSortTime(left) - sessionSortTime(right)
      ),
    }))
    .sort((left, right) => left.person.name.localeCompare(right.person.name));
  const sessions = engineers.flatMap((engineer) => engineer.sessions);
  return {
    workOrder: {
      id: workOrder.id,
      number: workOrder.number,
      subject: workOrder.subject,
      customer: workOrder.customer,
      workflowStatus: workOrder.workflowStatus,
    },
    throughSlackTs: clean(throughSlackTs, 80),
    evidenceThroughSlackTs: clean(evidenceThroughSlackTs, 80),
    analyzedThroughSlackTs: clean(analyzedThroughSlackTs, 80),
    evidenceCaughtUp: isEvidenceCaughtUp(
      analyzedThroughSlackTs,
      evidenceThroughSlackTs
    ),
    asOf: cutoff.toISOString(),
    calculationVersion: OPS_HOURS_CALCULATION_VERSION,
    timeZone: OPS_CALENDAR_TIME_ZONE,
    readOnly: true,
    officialClockAuthoritative: true,
    dataCompleteness: {
      messageEvidenceTruncated: Boolean(
        messageMetadataByWorkOrder?.[workOrder.id]?.truncated
      ),
      requiresManualReview: Boolean(
        messageMetadataByWorkOrder?.[workOrder.id]?.truncated
      ),
      includedMessageCount: availableMessages.length,
    },
    engineers,
    summary: {
      confirmedEngineerCount: engineers.length,
      determinedSessionCount: sessions.filter(
        (session) => session.status === "determined"
      ).length,
      ongoingSessionCount: sessions.filter(
        (session) => session.status === "ongoing"
      ).length,
      undeterminedSessionCount: sessions.filter(
        (session) => session.status === "undetermined"
      ).length,
    },
  };
}

function baseEvent(workOrder) {
  return {
    workOrderId: workOrder.id,
    number: workOrder.number,
    subject: workOrder.subject,
    customer: workOrder.customer,
    workflowStatus: workOrder.workflowStatus,
    priorityTier: workOrder.priorityTier,
    slackPermalink: workOrder.slackPermalink,
    bluefolderUrl: workOrder.bluefolderUrl,
    assignees: uniquePeople(workOrder.assignees || []),
    participants: uniquePeople(workOrder.participants || []),
    bluefolderAssignees: uniquePeople(workOrder.bluefolderAssignees || []),
    assignmentSummary: clean(workOrder.assignmentSummary, 1200),
    participationSummary: clean(workOrder.participationSummary, 1200),
  };
}

function eventInRange(event, startMs, endMs) {
  const start = Date.parse(event.start || "");
  const end = Date.parse(event.end || event.start || "");
  return Number.isFinite(start) && Number.isFinite(end) && start < endMs && end >= startMs;
}

function finalSummary(workOrder) {
  const updates = workOrder.opsUpdates || [];
  return updates[updates.length - 1]?.summary || workOrder.assignmentSummary || "Work order completed.";
}

function mergeOverlappingCalendarEvents(events) {
  const passthrough = events.filter(
    (event) =>
      event.allDay ||
      event.unknownDuration ||
      ["manual_clock", "manual_travel", "calendar_correction"].includes(
        event.source
      )
  );
  const buckets = new Map();
  events
    .filter(
      (event) =>
        !event.allDay &&
        !event.unknownDuration &&
        !["manual_clock", "manual_travel", "calendar_correction"].includes(
          event.source
        )
    )
    .forEach((event) => {
      const sourceGroup = ["completed", "service_complete", "scheduled"].includes(event.source)
        ? event.source
        : ["manual_clock", "manual_travel"].includes(event.source)
          ? event.source
        : "work";
      const key = [
        event.workOrderId,
        dateKey(zonedParts(new Date(event.start))),
        event.mode || "unspecified",
        sourceGroup,
        uniquePeople(event.people || [])
          .map((person) => person.id || person.name)
          .sort()
          .join("|"),
      ].join("::");
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(event);
    });

  buckets.forEach((bucket) => {
    const ordered = bucket.sort(
      (left, right) => Date.parse(left.start) - Date.parse(right.start)
    );
    let current = null;
    ordered.forEach((event) => {
      const eventStart = Date.parse(event.start);
      const eventEnd = Date.parse(event.end);
      if (current && eventStart <= Date.parse(current.end) + 10 * 60000) {
        const assignmentAndActivity =
          (current.source === "assignment" && event.source === "activity") ||
          (current.source === "activity" && event.source === "assignment");
        if (assignmentAndActivity) {
          const activity =
            current.source === "activity" ? current : event;
          current = {
            ...activity,
            id: `${current.id}+${event.id}`,
            people: uniquePeople([
              ...(current.people || []),
              ...(event.people || []),
            ]),
            messageCount:
              Number(current.messageCount || 1) +
              Number(event.messageCount || 1),
          };
          return;
        }
        current.start = new Date(
          Math.min(Date.parse(current.start), eventStart)
        ).toISOString();
        current.end = new Date(
          Math.max(Date.parse(current.end), eventEnd)
        ).toISOString();
        current.people = uniquePeople([
          ...(current.people || []),
          ...(event.people || []),
        ]);
        current.messageCount =
          Number(current.messageCount || 1) + Number(event.messageCount || 1);
        if (
          current.source === "assignment" &&
          event.source !== "assignment"
        ) {
          current.source = event.source;
          current.summary = event.summary || current.summary;
        }
        current.id = `${current.id}+${event.id}`;
        return;
      }
      if (current) passthrough.push(current);
      current = { ...event, people: uniquePeople(event.people || []) };
    });
    if (current) passthrough.push(current);
  });
  return passthrough.sort(
    (left, right) => Date.parse(left.start) - Date.parse(right.start)
  );
}

function applyCalendarCorrections(events, correctedSourceEventIds) {
  return events.flatMap((event) => {
    if (event.isCalendarCorrection) return [event];
    if (correctedSourceEventIds.has(event.id)) return [];
    const prefix = `${event.id}::person:`;
    const correctedPeople = new Set(
      [...correctedSourceEventIds]
        .filter((sourceId) => sourceId.startsWith(prefix))
        .map((sourceId) => sourceId.slice(prefix.length))
        .filter(Boolean)
    );
    if (!correctedPeople.size) return [event];
    const people = (event.people || []).filter(
      (person) =>
        !correctedPeople.has(clean(person.id || person.name, 180))
    );
    return people.length ? [{ ...event, people }] : [];
  });
}

function buildOnSiteHours(events) {
  const minutesForIntervals = (intervals) => {
    const ordered = intervals
      .map((interval) => ({ ...interval }))
      .sort((left, right) => left.startMs - right.startMs);
    const merged = [];
    ordered.forEach((interval) => {
      const current = merged[merged.length - 1];
      if (current && interval.startMs <= current.endMs) {
        current.endMs = Math.max(current.endMs, interval.endMs);
      } else {
        merged.push(interval);
      }
    });
    return Math.round(
      merged.reduce(
        (total, interval) => total + (interval.endMs - interval.startMs),
        0
      ) / 60000
    );
  };
  const segments = [];
  const unknownRecords = [];
  events
    .filter(
      (event) =>
        !event.allDay &&
        ["activity", "manual_clock", "calendar_correction"].includes(event.source) &&
        ["in_person", "mixed"].includes(event.mode)
    )
    .forEach((event) => {
      const startMs = Date.parse(event.start || "");
      const endMs = Date.parse(event.end || "");
      if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
        return;
      }
      uniquePeople(event.people || []).forEach((person) => {
        const personKey = clean(person.id || person.name, 120);
        if (!personKey) return;
        let cursor = startMs;
        while (cursor < endMs) {
          const dayParts = zonedParts(new Date(cursor));
          const day = dateKey(dayParts);
          const nextDayMs = zonedDate(addCalendarDays(dayParts, 1), 0, 0).getTime();
          const segmentEnd = Math.min(endMs, nextDayMs);
          segments.push({
            date: day,
            person,
            personKey,
            workOrderId: clean(event.workOrderId, 180),
            workOrderNumber: clean(event.number, 120),
            source: event.source,
            startMs: cursor,
            endMs: segmentEnd,
          });
          cursor = segmentEnd;
        }
      });
    });

  events
    .filter(
      (event) =>
        event.unknownDuration &&
        event.mode === "in_person" &&
        event.source === "onsite_unknown"
    )
    .forEach((event) => {
      uniquePeople(event.people || []).forEach((person) => {
        unknownRecords.push({
          date: dateKey(zonedParts(new Date(event.start))),
          person,
          minutes: 0,
          hours: null,
          workOrderNumbers: [clean(event.number, 120)].filter(Boolean),
          workOrderHours: [
            {
              workOrderId: clean(event.workOrderId, 180),
              workOrderNumber: clean(event.number, 120),
              minutes: 0,
              unknown: true,
            },
          ],
          manual: false,
          inferred: true,
          unknown: true,
          sourceEventId: event.id,
          workOrderId: event.workOrderId,
          inferenceReason: event.inferenceReason || "",
        });
      });
    });

  const manualKeys = new Set(
    segments
      .filter((segment) =>
        ["manual_clock", "calendar_correction"].includes(segment.source)
      )
      .map(
        (segment) =>
          `${segment.date}::${segment.personKey}::${segment.workOrderId}`
      )
  );
  const intervalsByPersonAndDay = new Map();
  segments.forEach((segment) => {
      const priorityKey =
        `${segment.date}::${segment.personKey}::${segment.workOrderId}`;
      if (
        segment.source === "activity" &&
        manualKeys.has(priorityKey)
      ) {
        return;
      }
      const key = `${segment.date}::${segment.personKey}`;
      if (!intervalsByPersonAndDay.has(key)) {
        intervalsByPersonAndDay.set(key, {
          date: segment.date,
          person: segment.person,
          intervals: [],
          workOrderNumbers: new Set(),
          sources: new Set(),
          workOrderIntervals: new Map(),
        });
      }
      const record = intervalsByPersonAndDay.get(key);
      record.intervals.push({
        startMs: segment.startMs,
        endMs: segment.endMs,
      });
      record.workOrderNumbers.add(segment.workOrderNumber);
      record.sources.add(segment.source);
      const workOrderKey = segment.workOrderId || segment.workOrderNumber;
      if (!record.workOrderIntervals.has(workOrderKey)) {
        record.workOrderIntervals.set(workOrderKey, {
          workOrderId: segment.workOrderId,
          workOrderNumber: segment.workOrderNumber,
          intervals: [],
        });
      }
      record.workOrderIntervals.get(workOrderKey).intervals.push({
        startMs: segment.startMs,
        endMs: segment.endMs,
      });
    });

  const knownRecords = [...intervalsByPersonAndDay.values()]
    .map((record) => {
      const minutes = minutesForIntervals(record.intervals);
      const workOrderHours = [...record.workOrderIntervals.values()]
        .map((workOrder) => ({
          workOrderId: workOrder.workOrderId,
          workOrderNumber: workOrder.workOrderNumber,
          minutes: minutesForIntervals(workOrder.intervals),
          unknown: false,
        }))
        .filter((workOrder) => workOrder.minutes > 0)
        .sort((left, right) =>
          left.workOrderNumber.localeCompare(right.workOrderNumber, undefined, {
            numeric: true,
          })
        );
      return {
        date: record.date,
        person: record.person,
        minutes,
        hours: Number((minutes / 60).toFixed(2)),
        workOrderNumbers: [...record.workOrderNumbers].filter(Boolean).sort(),
        workOrderHours,
        manual:
          record.sources.has("manual_clock") ||
          record.sources.has("calendar_correction"),
        corrected: record.sources.has("calendar_correction"),
        inferred:
          !record.sources.has("manual_clock") &&
          !record.sources.has("calendar_correction"),
      };
    })
    .filter((record) => record.minutes > 0)
    .sort(
      (left, right) =>
        left.date.localeCompare(right.date) ||
        left.person.name.localeCompare(right.person.name)
    );
  return knownRecords
    .concat(unknownRecords)
    .sort(
      (left, right) =>
        left.date.localeCompare(right.date) ||
        left.person.name.localeCompare(right.person.name)
    );
}

function comparisonMinutes(intervals) {
  const merged = [];
  [...intervals]
    .sort((left, right) => left.startMs - right.startMs)
    .forEach((interval) => {
      const current = merged[merged.length - 1];
      if (current && interval.startMs <= current.endMs) {
        current.endMs = Math.max(current.endMs, interval.endMs);
      } else {
        merged.push({ ...interval });
      }
    });
  return Math.round(
    merged.reduce(
      (total, interval) => total + interval.endMs - interval.startMs,
      0
    ) / 60000
  );
}

function buildClockEstimateComparisons(events) {
  const groups = new Map();
  events
    .filter(
      (event) =>
        !event.allDay &&
        [
          "activity",
          "onsite_unknown",
          "manual_clock",
          "calendar_correction",
        ].includes(event.source) &&
        ["in_person", "mixed"].includes(event.mode)
    )
    .forEach((event) => {
      const startMs = Date.parse(event.start || "");
      const endMs = Date.parse(event.end || "");
      if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
        return;
      }
      uniquePeople(event.people || []).forEach((person) => {
        const personKey = clean(person.id || person.name, 120);
        if (!personKey) return;
        let cursor = startMs;
        while (cursor < endMs) {
          const dayParts = zonedParts(new Date(cursor));
          const date = dateKey(dayParts);
          const segmentEnd = Math.min(
            endMs,
            zonedDate(addCalendarDays(dayParts, 1), 0, 0).getTime()
          );
          const key = [
            date,
            personKey,
            clean(event.workOrderId, 180),
          ].join("::");
          if (!groups.has(key)) {
            groups.set(key, {
              date,
              person,
              workOrderId: clean(event.workOrderId, 180),
              workOrderNumber: clean(event.number, 120),
              workOrderSubject: clean(event.subject, 500),
              estimatedIntervals: [],
              clockedIntervals: [],
              estimateUnknown: false,
            });
          }
          const group = groups.get(key);
          if (["manual_clock", "calendar_correction"].includes(event.source)) {
            group.clockedIntervals.push({ startMs: cursor, endMs: segmentEnd });
          } else if (event.unknownDuration) {
            group.estimateUnknown = true;
          } else {
            group.estimatedIntervals.push({ startMs: cursor, endMs: segmentEnd });
          }
          cursor = segmentEnd;
        }
      });
    });

  return [...groups.values()]
    .filter((group) => group.clockedIntervals.length)
    .map((group) => {
      const clockedMinutes = comparisonMinutes(group.clockedIntervals);
      const hasEstimate = group.estimatedIntervals.length > 0;
      const estimatedMinutes = hasEstimate
        ? comparisonMinutes(group.estimatedIntervals)
        : null;
      return {
        date: group.date,
        person: group.person,
        workOrderId: group.workOrderId,
        workOrderNumber: group.workOrderNumber,
        workOrderSubject: group.workOrderSubject,
        clockedMinutes,
        estimatedMinutes,
        estimateUnknown: !hasEstimate && group.estimateUnknown,
        differenceMinutes:
          estimatedMinutes == null ? null : clockedMinutes - estimatedMinutes,
      };
    })
    .sort(
      (left, right) =>
        left.date.localeCompare(right.date) ||
        left.person.name.localeCompare(right.person.name) ||
        left.workOrderNumber.localeCompare(right.workOrderNumber, undefined, {
          numeric: true,
        })
    );
}

export async function listOpsCalendarEvents({ startIso, endIso }) {
  const startMs = Date.parse(startIso);
  const endMs = Date.parse(endIso);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    throw new Error("A valid calendar date range is required.");
  }
  if (endMs - startMs > 120 * 86400000) {
    throw new Error("Calendar ranges are limited to 120 days.");
  }

  const [{ workOrders, messagesByWorkOrder }, manualEntries] = await Promise.all([
    listOpsCalendarSource(),
    listOpsTimeEntriesForRange({ startIso, endIso }),
  ]);
  const events = [];
  const sessionEvidence = new Map();
  const today = zonedParts(new Date());
  const todayKey = dateKey(today);

  for (const workOrder of workOrders) {
    const base = baseEvent(workOrder);
    const history = workOrder.assignmentHistory || [];
    const messages = [...(messagesByWorkOrder[workOrder.id] || [])].sort(
      (left, right) =>
        (parseTimestamp(left.slackTs)?.getTime() || Number.MAX_SAFE_INTEGER) -
        (parseTimestamp(right.slackTs)?.getTime() || Number.MAX_SAFE_INTEGER)
    );
    const historyBySlackTs = new Map(
      history
        .filter((entry) => entry.triggerSlackTs)
        .map((entry) => [String(entry.triggerSlackTs), entry])
    );
    const remoteContextPeople = new Set();
    const onsiteContexts = new Map();

    (workOrder.assignees || [])
      .filter((person) => /^\d{4}-\d{2}-\d{2}$/.test(clean(person.scheduledDate, 20)))
      .forEach((person, index) => {
        const scheduledParts = partsFromKey(person.scheduledDate);
        if (!validCalendarDate(scheduledParts)) return;
        const scheduledStart = zonedDate(scheduledParts, 0, 0);
        events.push({
          ...base,
          id: `manual-schedule-${workOrder.id}-${person.id || index}-${person.scheduledDate}`,
          title: `#${workOrder.number} ${workOrder.subject}`,
          start: scheduledStart.toISOString(),
          end: zonedDate(addCalendarDays(scheduledParts, 1), 0, 0).toISOString(),
          allDay: true,
          people: uniquePeople([person]),
          mode: person.workMode === "remote" ? "remote" : "in_person",
          source: "scheduled_manual",
          summary: `Assignment scheduled in Magmo for ${person.scheduledDate}.`,
        });
      });

    history.forEach((entry, index) => {
      if (!shouldRenderTimedAssignmentHistory(entry)) return;
      const includeInitialEngineer =
        entry.source === "initial" && (workOrder.bluefolderAssignees || []).length;
      if (entry.source === "initial" && !includeInitialEngineer) return;
      const start = parseTimestamp(entry.triggerSlackTs);
      if (!start) return;
      events.push({
        ...base,
        id: `assignment-${workOrder.id}-${entry.id || index}`,
        title: `#${workOrder.number} ${workOrder.subject}`,
        start: start.toISOString(),
        end: new Date(start.getTime() + 45 * 60000).toISOString(),
        allDay: false,
        people: uniquePeople(entry.assignees || workOrder.assignees),
        mode: inferOpsWorkMode(entry.triggerMessage, entry.reason, workOrder.workMode),
        source: includeInitialEngineer ? "bluefolder" : "assignment",
        summary: summarizeMessage(entry.triggerMessage || entry.reason),
      });
    });

    messages.forEach((message) => {
      const sourceDate = parseTimestamp(message.slackTs);
      if (!sourceDate) return;
      const historyMatch = historyBySlackTs.get(String(message.slackTs));
      const senderContext = onsiteContextFor(
        onsiteContexts,
        message.sender,
        sourceDate
      );
      let evidence = null;
      let people = [];
      if (
        shouldCloseAuthoredOnsiteSession(
          message.text,
          Boolean(senderContext)
        )
      ) {
        evidence = { kind: "in_person", phase: "ended" };
        people = uniquePeople([message.sender]);
      } else if (hasImmediateDepartureStatement(message.text)) {
        people = peopleNamedNearOnsiteEvidence(message).filter((person) =>
          onsiteContextFor(onsiteContexts, person, sourceDate)
        );
        if (people.length) {
          evidence = { kind: "in_person", phase: "ended" };
        }
      }
      if (!evidence) {
        evidence = calendarEvidence(message, sourceDate);
        people = peopleForMessage(workOrder, message, historyMatch, evidence);
        if (
          evidence?.kind === "in_person" &&
          ["traveling", "arrived", "working"].includes(evidence.phase) &&
          !evidence.legacyDefault
        ) {
          if (isAuthoredOnsiteContext(message.text, evidence.phase)) {
            people = uniquePeople([message.sender]);
          } else {
            const safeNamedStatement =
              !/\?/.test(message.text) &&
              !/\b(?:tomorrow|next\s+(?:week|day|mon|tue|wed|thu|fri|sat|sun))\b/i.test(
                message.text
              ) &&
              !(
                evidence.phase === "traveling" &&
                /\b(?:driver|courier|package|shipment|delivery|tracking|fedex|ups|part|parts)\b/i.test(
                  message.text
                )
              );
            people = safeNamedStatement
              ? peopleNamedNearOnsiteEvidence(message)
              : [];
          }
        }
      }
      const mode = ["remote", "in_person", "mixed"].includes(message.workMode)
        ? message.workMode
        : inferOpsWorkMode(message.text);
      const scheduled = parseScheduledDate(message.text, sourceDate);
      if (scheduled) {
        events.push({
          ...base,
          id: `scheduled-${workOrder.id}-${message.id}`,
          title: `#${workOrder.number} ${workOrder.subject}`,
          start: scheduled.start.toISOString(),
          end: scheduled.end.toISOString(),
          allDay: scheduled.allDay,
          people,
          mode,
          source: "scheduled",
          summary: summarizeMessage(message.text),
        });
      }
      if (
        !evidence &&
        TECHNICAL_ACTIVITY_SIGNAL.test(message.text)
      ) {
        const remotePeople = peopleForMessage(workOrder, message, null, {
          kind: "remote",
          phase: "working",
        });
        if (remotePeople.some((person) =>
          remoteContextPeople.has(clean(person.id || person.name, 120))
        )) {
          evidence = { kind: "remote", phase: "working" };
          people = remotePeople;
        }
      }
      if (!evidence || !people.length) return;
      if (evidence.kind === "remote") {
        people.forEach((person) =>
          remoteContextPeople.add(clean(person.id || person.name, 120))
        );
      }
      if (
        evidence.kind === "in_person" &&
        ["traveling", "arrived", "working"].includes(evidence.phase)
      ) {
        people.forEach((person) => {
          const context = rememberOnsiteContext(
            onsiteContexts,
            person,
            sourceDate,
            onsiteEvidenceDay(evidence, sourceDate)
          );
          addSessionEvidence(
            sessionEvidence,
            workOrder,
            message,
            sourceDate,
            [person],
            evidence,
            context.day
          );
        });
        return;
      }
      if (evidence.kind === "in_person" && evidence.phase === "ended") {
        people.forEach((person) => {
          const context = onsiteContextFor(onsiteContexts, person, sourceDate);
          if (!context) return;
          addSessionEvidence(
            sessionEvidence,
            workOrder,
            message,
            sourceDate,
            [person],
            evidence,
            context.day
          );
          clearOnsiteContext(onsiteContexts, context);
        });
        return;
      }
      addSessionEvidence(
        sessionEvidence,
        workOrder,
        message,
        sourceDate,
        people,
        evidence
      );
    });

    if (workOrder.serviceCompletedAt) {
      const serviceCompleted = parseTimestamp(workOrder.serviceCompletedAt);
      if (serviceCompleted) {
        events.push({
          ...base,
          id: `service-complete-${workOrder.id}`,
          title: `#${workOrder.number} ${workOrder.subject}`,
          start: serviceCompleted.toISOString(),
          end: new Date(serviceCompleted.getTime() + 30 * 60000).toISOString(),
          allDay: false,
          people: uniquePeople(workOrder.assignees || []),
          mode: workOrder.workMode || "unspecified",
          source: "service_complete",
          summary: "Field service marked complete; final closeout remains pending.",
        });
      }
    }

    if (workOrder.completedAt) {
      const completed = parseTimestamp(workOrder.completedAt);
      if (completed) {
        events.push({
          ...base,
          id: `completed-${workOrder.id}`,
          title: `#${workOrder.number} ${workOrder.subject}`,
          start: completed.toISOString(),
          end: new Date(completed.getTime() + 30 * 60000).toISOString(),
          allDay: false,
          people: uniquePeople(workOrder.assignees || []),
          mode: workOrder.workMode || "unspecified",
          source: "completed",
          summary: finalSummary(workOrder),
        });
      }
    }

    if (
      workOrder.status === "active" &&
      ["unassigned", "active", "remote"].includes(workOrder.workflowStatus)
    ) {
      const dayStart = zonedDate(today, 0, 0);
      const dayEnd = zonedDate(addCalendarDays(today, 1), 0, 0);
      const hasTodayEvent = events.some(
        (event) =>
          event.workOrderId === workOrder.id &&
          dateKey(zonedParts(new Date(event.start))) === todayKey
      );
      if (!hasTodayEvent) {
        events.push({
          ...base,
          id: `current-${workOrder.id}-${todayKey}`,
          title: `#${workOrder.number} ${workOrder.subject}`,
          start: dayStart.toISOString(),
          end: dayEnd.toISOString(),
          allDay: true,
          people:
            workOrder.workflowStatus === "unassigned"
              ? []
              : uniquePeople(workOrder.assignees || []),
          mode:
            workOrder.workflowStatus === "remote"
              ? "remote"
              : workOrder.workMode || "unspecified",
          source: "current",
          summary:
            workOrder.workflowStatus === "unassigned"
              ? "Awaiting an active dispatch assignment."
              : workOrder.workflowStatus === "remote"
              ? workOrder.remoteWorkReason ||
                "Active remote troubleshooting is underway."
              : workOrder.assignmentSummary || "Current dispatch responsibility.",
        });
      }
    }
  }

  const workOrdersById = new Map(
    workOrders.map((workOrder) => [workOrder.id, workOrder])
  );
  const correctedSourceEventIds = new Set(
    manualEntries
      .filter((entry) => entry.source === "calendar_correction")
      .map((entry) => clean(entry.sourceEventId, 500))
      .filter(Boolean)
  );
  manualEntries.forEach((entry) => {
    const workOrder = workOrdersById.get(entry.workOrderId);
    const start = parseTimestamp(entry.startedAt);
    const rawEnd = parseTimestamp(entry.endedAt) || new Date(Math.min(Date.now(), endMs));
    if (!start || rawEnd <= start) return;
    const base = workOrder
      ? baseEvent(workOrder)
      : {
          workOrderId: entry.workOrderId,
          number: entry.workOrderNumber,
          subject: entry.workOrderSubject,
          customer: "",
          workflowStatus: "active",
          priorityTier: "",
          slackPermalink: "",
          bluefolderUrl: "",
        };
    events.push({
      ...base,
      id: `${entry.source === "calendar_correction" ? "calendar-correction" : entry.timeType === "travel" ? "manual-travel" : "manual-clock"}-${entry.id}`,
      timeEntryId: entry.id,
      timeEntryStatus: entry.status,
      isOvertime: Boolean(entry.isOvertime),
      title: `#${entry.workOrderNumber} ${entry.workOrderSubject}`,
      start: start.toISOString(),
      end: rawEnd.toISOString(),
      allDay: false,
      people: uniquePeople([entry.person]),
      mode: "in_person",
      source:
        entry.timeType === "travel"
          ? "manual_travel"
          : entry.source === "calendar_correction"
            ? "calendar_correction"
            : "manual_clock",
      isCalendarCorrection: entry.source === "calendar_correction",
      summary:
        entry.status === "open"
          ? `Manual ${entry.timeType === "travel" ? "travel" : "work"} clock is currently running in Ops-General.`
            : `Manual ${entry.timeType === "travel" ? "travel" : "work"} time recorded in Ops-General.`,
    });
  });

  events.push(...buildConversationSessions(sessionEvidence));
  const rangedEvents = applyCalendarCorrections(
    mergeOverlappingCalendarEvents(
    events.filter((event) => eventInRange(event, startMs, endMs))
    ),
    correctedSourceEventIds
  );
  const people = uniquePeople([
    ...listOpsAssigneeOptions(),
    ...rangedEvents.flatMap((event) => event.people || []),
  ]).sort((left, right) => left.name.localeCompare(right.name));
  const onSiteHours = buildOnSiteHours(rangedEvents);
  const travelHours = buildOnSiteHours(
    rangedEvents
      .filter((event) => event.source === "manual_travel")
      .map((event) => ({ ...event, source: "manual_clock" }))
  );
  const hourComparisons = buildClockEstimateComparisons(rangedEvents);
  return {
    events: rangedEvents,
    people,
    workOrders: workOrders.map((workOrder) => ({
      id: workOrder.id,
      number: workOrder.number,
      subject: workOrder.subject,
      workflowStatus: workOrder.workflowStatus,
    })),
    onSiteHours,
    travelHours,
    hourComparisons,
    timeZone: OPS_CALENDAR_TIME_ZONE,
  };
}
