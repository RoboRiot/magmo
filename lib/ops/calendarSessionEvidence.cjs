"use strict";

const MAX_ONSITE_SESSION_MS = 18 * 60 * 60 * 1000;
const RETROSPECTIVE_ARRIVAL_FUTURE_TOLERANCE_MS = 5 * 60 * 1000;

function cleanText(value) {
  return String(value || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function zonedDateParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const result = {};
  for (const part of parts) {
    if (part.type !== "literal") result[part.type] = Number(part.value);
  }
  return result;
}

function timeZoneOffsetMs(date, timeZone) {
  const parts = zonedDateParts(date, timeZone);
  // Intl exposes whole-second wall-clock parts. Compare them with a matching
  // whole-second instant so Slack's fractional timestamp does not leak into
  // the time-zone offset and shift a stated arrival by a few milliseconds.
  const wholeSecondInstant = Math.floor(date.getTime() / 1000) * 1000;
  return (
    Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second
    ) - wholeSecondInstant
  );
}

function localClockDate(parts, hour, minute, timeZone) {
  const desiredUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    hour,
    minute,
    0,
    0
  );
  let result = new Date(desiredUtc);
  // Two passes handle normal offsets and the uncommon case where the first
  // guess lands on the opposite side of a daylight-saving transition.
  for (let pass = 0; pass < 2; pass += 1) {
    result = new Date(desiredUtc - timeZoneOffsetMs(result, timeZone));
  }
  return result;
}

function previousCalendarDay(parts) {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day - 1));
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

const AUTHORED_RETROSPECTIVE_ARRIVAL_PATTERNS = [
  /\b(?:i|we)(?:\s+have|'ve)?\s+(?:just\s+|already\s+)?arrived(?:\s+(?:on[-\s]?site|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner)|here))?\s+(?:at|around)\s+(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)\b/i,
  /\b(?:i|we)(?:'m|'re|\s+am|\s+are|\s+have\s+been|'ve\s+been)?\s+(?:on[-\s]?site|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner)|here)\s+since\s+(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)\b/i,
  /\b(?:i|we)\s+(?:got|made\s+it)\s+(?:to\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner)|on[-\s]?site|here)\s+(?:at|around)\s+(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)\b/i,
];

const RETROSPECTIVE_ARRIVAL_REJECTION =
  /\?|\b(?:not|never|didn['’]?t|haven['’]?t|hasn['’]?t|won['’]?t|will|going\s+to|plan(?:ning)?\s+to|expect(?:ed|ing)?\s+to)\s+[^.!?]{0,30}\barriv/i;

function resolveAuthoredRetrospectiveArrival(
  text,
  postedAt,
  timeZone = "America/Los_Angeles"
) {
  const value = cleanText(text);
  const posted = asDate(postedAt);
  if (!value || !posted || RETROSPECTIVE_ARRIVAL_REJECTION.test(value)) {
    return null;
  }
  const match = AUTHORED_RETROSPECTIVE_ARRIVAL_PATTERNS
    .map((pattern) => value.match(pattern))
    .find(Boolean);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = String(match[3] || "").toLowerCase().replace(/\./g, "");
  if (!Number.isInteger(hour) || hour < 1 || hour > 12 || minute > 59) {
    return null;
  }
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;

  let localDay = zonedDateParts(posted, timeZone);
  let effective = localClockDate(localDay, hour, minute, timeZone);
  if (
    effective.getTime() >
    posted.getTime() + RETROSPECTIVE_ARRIVAL_FUTURE_TOLERANCE_MS
  ) {
    localDay = previousCalendarDay(localDay);
    effective = localClockDate(localDay, hour, minute, timeZone);
  }
  const ageMs = posted.getTime() - effective.getTime();
  if (ageMs < -RETROSPECTIVE_ARRIVAL_FUTURE_TOLERANCE_MS) return null;
  if (ageMs > MAX_ONSITE_SESSION_MS) return null;
  return effective;
}

function departureSegments(value) {
  return String(value || "")
    .replace(/[\u2018\u2019]/g, "'")
    .split(/[\r\n]+|[;,]+|(?<=[.!?])\s+/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const DEPARTURE_ACTIONS = [
  /\b(?:heading|headed)\s+(?:out|home|off|back\s+to\s+(?:the\s+)?(?:office|shop|warehouse|home))\b/i,
  /\b(?:going|about)\s+to\s+(?:head\s+out|leave(?:\s+(?:the\s+)?site)?|depart|take\s+off)\b/i,
  /\b(?:gonna\s+(?:head\s+out|leave|take\s+off)|going\s+home\s+(?:right\s+)?now)\b/i,
  /\bon\s+(?:my|our)\s+way\s+out\b/i,
  /\b(?:taking|took)\s+off\b/i,
  /\b(?:clocking|clocked)\s+out\b/i,
  /\b(?:departing|departed)\b/i,
  /\bleaving\b(?=\s*(?:(?:right\s+)?now|(?:the\s+)?(?:site|facility|customer|hospital|office|location)|for\s+(?:home|the\s+day))?\s*[.!]?$)/i,
  /\b(?:just\s+)?left\b(?=\s*(?:(?:the\s+)?(?:site|facility|customer|hospital|office|location))?\s*[.!]?$)/i,
  /\b(?:done|finished(?:\s+up)?)\s+(?:here|on[-\s]?site|at\s+(?:the\s+)?site)\b/i,
  /\b(?:all\s+)?(?:wrapped|wrapping)\s+up\b(?=\s*(?:(?:and|then)\s+)?(?:leaving|heading\s+out|$))/i,
  /\bpacked\s+up\b(?=\s*(?:(?:and|then)\s+)?(?:leaving|heading\s+out|$))/i,
  /\b(?:all\s+done(?:\s+here)?|out\s+of\s+here|off[-\s]?site\s+now)\b\s*[.!]?$/i,
  /\bcalling\s+it\s+a\s+day(?:\s+here|\s+on[-\s]?site)?\b\s*[.!]?$/i,
  /\b(?:i|we)(?:'m|'re|\s+am|\s+are|\s+will|'ll)?\s+(?:leave|head\s+out|take\s+off)\s+(?:right\s+)?now\b/i,
];

const QUESTION_OR_PERMISSION =
  /\b(?:can|could|may|should|would|do|did|am|are|is)\s+(?:i|we|he|she|they|you)\b[\s\S]{0,45}\b(?:leave|head\s+out|depart|take\s+off)\b|\b(?:clear|okay|ok|good|safe|ready|allowed|permission)\s+to\s+(?:leave|head\s+out|depart|go)\b/i;
const NEGATED_DEPARTURE =
  /\b(?:not|never)\s+(?:(?:going|about)\s+to\s+)?(?:leave|leaving|head(?:ing)?\s+out|depart(?:ing)?|take|taking\s+off)\b|\b(?:won't|wouldn't|can't|cannot|couldn't|shouldn't|didn't|haven't|hasn't|isn't|aren't)\b[\s\S]{0,30}\b(?:leave|left|leaving|head(?:ed|ing)?\s+out|depart(?:ed|ing)?|take|taking|took\s+off)\b/i;
const FUTURE_DEPARTURE =
  /\b(?:tomorrow|later|tonight|next\s+(?:week|shift|day|mon|tue|wed|thu|fri|sat|sun)|in\s+\d+\s*(?:min|mins|minutes?|hr|hrs|hours?)|at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)|after|once|when)\b/i;
const IMMEDIATE_CUE = /\b(?:now|right\s+now|just|already|currently)\b/i;
const SELF_REFERENCE = /\b(?:i|we|i'm|we're|i\s+am|we\s+are|my|our)\b/i;
const THIRD_PARTY_SUBJECT =
  /\b(?:(?:he|she|they|you)|(?:the\s+)?(?:tech(?:nician)?|engineer|electrician|fse|driver|courier|customer|vendor|package|shipment|delivery|part|parts|tube|board|trailer|truck|vehicle|item|fedex|ups))\b(?:\s+(?:is|are|has|have|just|already|will))?[\s\S]{0,22}\b(?:leave|leaving|left|head(?:ed|ing)?\s+out|going\s+home|gonna\s+head\s+out|depart(?:ed|ing)?|take|taking|took\s+off)\b/i;
const PROPER_NAME_SUBJECT =
  /\b[A-Z][a-z][A-Za-z'-]*(?:\s+[A-Z][a-z][A-Za-z'-]*)?\s+(?:(?:is|has|just|already|will)\s+)?(?:leaving|left|heading\s+out|headed\s+out|going\s+home|gonna\s+head\s+out|departing|departed|taking\s+off|took\s+off)\b/;

function segmentHasDeparture(segment) {
  return DEPARTURE_ACTIONS.some((pattern) => pattern.test(segment));
}

function segmentIsImmediateStatement(segment) {
  if (!segmentHasDeparture(segment)) return false;
  if (NEGATED_DEPARTURE.test(segment) || QUESTION_OR_PERMISSION.test(segment)) {
    return false;
  }
  if (/\?\s*$/.test(segment) && !SELF_REFERENCE.test(segment)) return false;
  if (FUTURE_DEPARTURE.test(segment) && !IMMEDIATE_CUE.test(segment)) return false;
  return true;
}

function hasImmediateDepartureStatement(text) {
  return departureSegments(text).some(segmentIsImmediateStatement);
}

function isImmediateAuthoredDeparture(text) {
  return departureSegments(text).some((segment) => {
    if (!segmentIsImmediateStatement(segment)) return false;
    if (THIRD_PARTY_SUBJECT.test(segment) || PROPER_NAME_SUBJECT.test(segment)) {
      return false;
    }
    return true;
  });
}

function shouldCloseAuthoredOnsiteSession(text, hasPriorOnsiteEvidence) {
  return Boolean(hasPriorOnsiteEvidence) && isImmediateAuthoredDeparture(text);
}

const CONTEXT_QUESTION =
  /\?|\b(?:what(?:'s|\s+is)|any|whose|do\s+we\s+have|can\s+you\s+give)\b[\s\S]{0,25}\beta\b/i;
const LOGISTICS_CONTEXT =
  /\b(?:driver|courier|package|shipment|delivery|tracking|fedex|ups|part|parts)\b/i;
const FUTURE_CONTEXT =
  /\b(?:tomorrow|next\s+(?:week|day|mon|tue|wed|thu|fri|sat|sun))\b/i;
const THIRD_PARTY_ONSITE_SUBJECT =
  /\b(?:(?:he|she|they|you|his|her|their)|(?:the\s+)?(?:tech(?:nician)?|engineer|electrician|fse|driver|courier|customer|vendor|package|shipment|delivery|part|parts|fedex|ups))\b(?:\s+(?:is|are|has|have|just|already|will|was|were))?[\s\S]{0,24}\b(?:eta|arriv(?:ed|ing)|on[-\s]?site|heading\s+(?:to|over|there)|(?:going|about)\s+to\s+(?:head|go|drive)\s+(?:to|over|there)|en\s+route|driving\s+to|replac(?:ed|ing)|install(?:ed|ing)|swapp?(?:ed|ing))\b/i;
const PROPER_NAME_ONSITE_SUBJECT =
  /\b[A-Z][a-z][A-Za-z'-]*(?:\s+[A-Z][a-z][A-Za-z'-]*)?(?:'s)?\s+(?:[Ee][Tt][Aa]\b|(?:(?:is|has|just|already|will|was)\s+)?(?:(?:going|about)\s+to\s+(?:head|go|drive)\s+(?:to|over|there)|arrived|arriving|on[-\s]?site|heading\s+(?:to|over)|en\s+route|replaced|replacing|installed|installing|swapped|swapping)\b)/;
const SELF_ONSITE_ACTION =
  /\b(?:(?:my|our)\s+eta\b|(?:i|we)(?:(?:'m|'re|\s+am|\s+are)\s+(?:currently\s+|just\s+|already\s+)?(?:on\s+(?:my|our)\s+way|heading\s+(?:to|over|there)|en\s+route|driving\s+to|arriving|on[-\s]?site|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner)|opening|replacing|installing|swapping|connecting|upgrading|performing)|(?:'ve|\s+have)?\s+(?:just\s+|already\s+)?(?:arrived|opened|replaced|installed|swapped|connected|upgraded|performed)\b))/i;
const SELF_TRAVEL_INTENT =
  /\b(?:i|we)(?:'m|'re|\s+am|\s+are|\s+will|'ll)?\s+(?:(?:going|about|planning)\s+to\s+)?(?:head(?:ing)?|go(?:ing)?|drive|driving)\s+(?:to|over|there)\b/i;
const UNATTRIBUTED_ETA_STATEMENT = /\beta\b/i;
const TERSE_ONSITE_ACTION =
  /^(?:eta\b|on\s+(?:my|our)\s+way\b|heading\s+(?:to|over|there)\b|en\s+route\b|driving\s+to\b|dispatch(?:ed|ing)?\s+to\b|arriv(?:ed|ing)\b|on[-\s]?site\b|at\s+(?:the\s+)?(?:site|customer|hospital|facility|office|machine|scanner)\b|opened\b|replac(?:ed|ing)\b|install(?:ed|ing)\b|swapp?(?:ed|ing)\b|connect(?:ed|ing)\b|upgrad(?:ed|ing)\b|perform(?:ed|ing)\b)/i;

function isAuthoredOnsiteContext(text, phase) {
  const value = cleanText(text);
  if (!value || !["traveling", "arrived", "working"].includes(phase)) {
    return false;
  }
  if (CONTEXT_QUESTION.test(value) || FUTURE_CONTEXT.test(value)) return false;
  if (phase === "traveling" && LOGISTICS_CONTEXT.test(value)) return false;
  if (
    THIRD_PARTY_ONSITE_SUBJECT.test(value) ||
    PROPER_NAME_ONSITE_SUBJECT.test(value)
  ) {
    return false;
  }
  if (phase === "traveling") {
    // Engineers commonly write a short ETA after a sentence such as "I'm
    // going to head over". Once questions, logistics, and third-party subjects
    // have been excluded above, that ETA belongs to the message author.
    return (
      SELF_ONSITE_ACTION.test(value) ||
      SELF_TRAVEL_INTENT.test(value) ||
      TERSE_ONSITE_ACTION.test(value) ||
      UNATTRIBUTED_ETA_STATEMENT.test(value)
    );
  }
  if (phase === "arrived") {
    return SELF_ONSITE_ACTION.test(value) || TERSE_ONSITE_ACTION.test(value);
  }
  // Passive summaries such as "the board was replaced" do not prove that the
  // message author performed the work. Require either first-person ownership
  // or the terse action-first field updates engineers commonly send onsite.
  return SELF_ONSITE_ACTION.test(value) || TERSE_ONSITE_ACTION.test(value);
}

function asDate(value) {
  const date = value instanceof Date ? value : new Date(value || "");
  return Number.isNaN(date.getTime()) ? null : date;
}

function slackTimestampNanoseconds(value) {
  const match = String(value || "").trim().match(/^(\d{8,})(?:\.(\d{1,9}))?$/);
  if (!match) return null;
  return BigInt(match[1]) * 1_000_000_000n +
    BigInt(String(match[2] || "").padEnd(9, "0"));
}

function compareSlackTimestamps(left, right) {
  const leftValue = slackTimestampNanoseconds(left);
  const rightValue = slackTimestampNanoseconds(right);
  if (leftValue === null || rightValue === null) return 0;
  return leftValue < rightValue ? -1 : leftValue > rightValue ? 1 : 0;
}

function isEvidenceCaughtUp(analyzedThroughSlackTs, evidenceThroughSlackTs) {
  const expected = String(evidenceThroughSlackTs || "").trim();
  if (!expected) return true;
  const analyzed = String(analyzedThroughSlackTs || "").trim();
  if (!analyzed) return false;
  return compareSlackTimestamps(analyzed, expected) >= 0;
}

function shouldRenderTimedAssignmentHistory(entry) {
  const source = cleanText(entry?.source).toLowerCase();
  if (!source) return true;
  // These rows document an administrative replay/correction. They are useful
  // in assignment history, but they are not evidence that anyone worked for a
  // fixed period beginning at the reconciliation timestamp.
  return !new Set([
    "dispatch_backlog_correction",
    "historical_inactivity_repair",
  ]).has(source);
}

function buildOnsiteSessionBounds(rows) {
  const ordered = (Array.isArray(rows) ? rows : [])
    .map((row) => ({ ...row, at: asDate(row?.at) }))
    .filter((row) => row.at)
    .sort((left, right) => left.at - right.at);
  const travel = ordered.find((row) => row.phase === "traveling");
  // Physical-work wording confirms that the author was an onsite worker, but
  // it does not tell us when that work began. A duration may start only from
  // an authored arrival or a parseable ETA estimate.
  const firstPresence = ordered.find((row) => row.phase === "arrived");
  const firstPresenceAt =
    asDate(firstPresence?.effectiveArrival) || firstPresence?.at || null;
  const end = ordered.find(
    (row) =>
      row.phase === "ended" &&
      (!firstPresenceAt || row.at >= firstPresenceAt) &&
      (!travel || row.at >= travel.at)
  );
  const estimatedArrival = asDate(travel?.estimatedArrival);
  const start =
    firstPresenceAt ||
    (estimatedArrival && (!end || estimatedArrival < end.at)
      ? estimatedArrival
      : null);
  const marker = start || estimatedArrival || travel?.at || ordered[0]?.at || null;
  const bounded = Boolean(
    start &&
      end &&
      end.at > start &&
      end.at.getTime() - start.getTime() <= MAX_ONSITE_SESSION_MS
  );
  return { start, end: end?.at || null, marker, bounded };
}

function evidenceForRow(row) {
  const message = row?.message || {};
  const at = asDate(row?.at);
  const effectiveArrival = asDate(row?.effectiveArrival);
  return {
    phase: cleanText(row?.phase),
    at: at ? at.toISOString() : "",
    effectiveAt: effectiveArrival ? effectiveArrival.toISOString() : "",
    messageId: cleanText(message.id),
    slackTs: cleanText(message.slackTs),
    text: cleanText(message.text).slice(0, 700),
  };
}

function buildOnsiteSessionDetails(rows, options = {}) {
  const cutoff = asDate(options.cutoff) || new Date();
  const ordered = (Array.isArray(rows) ? rows : [])
    .map((row) => ({ ...row, at: asDate(row?.at) }))
    .filter((row) => row.at && row.at <= cutoff)
    .sort((left, right) => left.at - right.at);
  const bounds = buildOnsiteSessionBounds(ordered);
  const travelRows = ordered.filter((row) => row.phase === "traveling");
  const travelStart = travelRows[0]?.at || null;
  const explicitArrival = ordered.find((row) => row.phase === "arrived") || null;
  const estimatedArrivalRow = [...travelRows]
    .reverse()
    .find((row) => {
      const estimate = asDate(row.estimatedArrival);
      return estimate && estimate >= row.at && estimate <= cutoff;
    });
  const estimatedArrival = asDate(estimatedArrivalRow?.estimatedArrival);
  const retrospectiveArrival = asDate(explicitArrival?.effectiveArrival);
  const arrival = retrospectiveArrival || explicitArrival?.at || estimatedArrival || null;
  const departureRow = ordered.find(
    (row) =>
      row.phase === "ended" &&
      (!arrival || row.at >= arrival) &&
      (!travelStart || row.at >= travelStart)
  );
  const departure = departureRow?.at || null;
  const elapsedMs = arrival ? cutoff.getTime() - arrival.getTime() : 0;
  const durationMs = arrival && departure
    ? departure.getTime() - arrival.getTime()
    : 0;
  const stale = Boolean(
    arrival &&
      ((departure && durationMs > MAX_ONSITE_SESSION_MS) ||
        (!departure && elapsedMs > MAX_ONSITE_SESSION_MS))
  );
  let status = "undetermined";
  let reason = "Physical onsite work is confirmed, but no authored arrival or parseable ETA establishes the start time.";
  if (arrival && departure && durationMs > 0 && !stale) {
    status = "determined";
    reason = "Arrival and departure evidence establish the onsite service interval.";
  } else if (arrival && !departure && elapsedMs >= 0 && !stale) {
    status = "ongoing";
    reason = "Arrival is established, but the engineer has not provided a departure update yet.";
  } else if (stale) {
    reason = "The open or inferred onsite interval exceeds 18 hours and is treated as stale rather than inventing hours.";
  } else if (arrival && departure) {
    reason = "The departure does not establish a valid interval after the arrival.";
  }

  const travelDurationMs = travelStart && arrival
    ? arrival.getTime() - travelStart.getTime()
    : 0;
  return {
    status,
    reason,
    confirmedPhysical: ordered.some((row) =>
      ["traveling", "arrived", "working"].includes(row.phase)
    ),
    travel: {
      startedAt: travelStart ? travelStart.toISOString() : "",
      arrivalAt: arrival ? arrival.toISOString() : "",
      durationMinutes:
        travelStart &&
        arrival &&
        travelDurationMs >= 0 &&
        travelDurationMs <= MAX_ONSITE_SESSION_MS
          ? Math.floor(travelDurationMs / 60000)
          : null,
      basis: travelStart ? "authored_travel_or_eta" : "undetermined",
    },
    arrival: {
      at: arrival ? arrival.toISOString() : "",
      reportedAt: explicitArrival?.at ? explicitArrival.at.toISOString() : "",
      basis: retrospectiveArrival
        ? "authored_retrospective_arrival"
        : explicitArrival
        ? "authored_arrival"
        : estimatedArrival
        ? "authored_eta_estimate"
        : "undetermined",
    },
    service: {
      startedAt: arrival ? arrival.toISOString() : "",
      endedAt: status === "determined" && departure ? departure.toISOString() : "",
      durationMinutes:
        status === "determined" ? Math.floor(durationMs / 60000) : null,
      serviceMinutesSoFar:
        status === "ongoing" ? Math.floor(elapsedMs / 60000) : null,
      provisional: status === "ongoing",
    },
    departure: {
      at: departure ? departure.toISOString() : "",
      basis: departure ? "authored_departure" : "undetermined",
    },
    bounds: {
      start: bounds.start ? bounds.start.toISOString() : "",
      end: bounds.end ? bounds.end.toISOString() : "",
      bounded: bounds.bounded,
    },
    evidence: ordered.map(evidenceForRow),
  };
}

function splitOnsiteSessionRows(rows) {
  const ordered = (Array.isArray(rows) ? rows : [])
    .filter((row) => asDate(row?.at))
    .sort((left, right) => asDate(left.at) - asDate(right.at));
  const sessions = [];
  let current = [];
  ordered.forEach((row) => {
    if (row.phase === "ended") {
      if (!current.length) return;
      current.push(row);
      sessions.push(current);
      current = [];
      return;
    }
    current.push(row);
  });
  if (current.length) sessions.push(current);
  return sessions.map((sessionRows) => ({
    rows: sessionRows,
    ...buildOnsiteSessionBounds(sessionRows),
  }));
}

module.exports = {
  MAX_ONSITE_SESSION_MS,
  buildOnsiteSessionBounds,
  buildOnsiteSessionDetails,
  compareSlackTimestamps,
  hasImmediateDepartureStatement,
  isAuthoredOnsiteContext,
  isImmediateAuthoredDeparture,
  resolveAuthoredRetrospectiveArrival,
  isEvidenceCaughtUp,
  shouldCloseAuthoredOnsiteSession,
  shouldRenderTimedAssignmentHistory,
  splitOnsiteSessionRows,
};
