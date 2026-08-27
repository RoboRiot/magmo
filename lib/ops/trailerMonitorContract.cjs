const TRAILER_CHANNEL_PATTERN = /^(?:ais[-_]?|mobile(?:mr|ct|pet)?[-_]?)?0*(\d{1,3})(?=[a-z_-]|$)/i;
const SLACK_LINK_PATTERN = /https:\/\/[^\s<>|)]+\.slack\.com\/archives\/(C[A-Z0-9]+)\/p(\d{10,})(?:[^\s<>)]*)/gi;

function trailerNumberFromChannel(channel = {}) {
  const candidates = [
    channel.name,
    channel.name_normalized,
    ...(Array.isArray(channel.previous_names) ? channel.previous_names : []),
  ];
  for (const candidate of candidates) {
    const match = String(candidate || "").trim().match(TRAILER_CHANNEL_PATTERN);
    if (match) return Number(match[1]);
  }
  return null;
}

function slackDigitsToTs(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length <= 10) return digits;
  return `${digits.slice(0, 10)}.${digits.slice(10)}`;
}

function extractSlackThreadLinks(value) {
  const text = String(value || "").replace(/&amp;/g, "&");
  const results = [];
  const seen = new Set();
  let match;
  SLACK_LINK_PATTERN.lastIndex = 0;
  while ((match = SLACK_LINK_PATTERN.exec(text))) {
    const channel = match[1];
    const url = match[0];
    const queryThread = url.match(/[?&]thread_ts=([0-9.]+)/i)?.[1] || "";
    const threadTs = queryThread || slackDigitsToTs(match[2]);
    const key = `${channel}:${threadTs}`;
    if (!channel || !threadTs || seen.has(key)) continue;
    seen.add(key);
    results.push({ channel, threadTs, url });
  }
  return results;
}

function hasTrailerMovementSignal(value) {
  const text = String(value || "").toLowerCase();
  if (!text.trim()) return false;
  return [
    /\b(?:arriv(?:e|ed|al|ing)|delivered|onsite|on[- ]site|at (?:the )?site|set ?up|hooked up|commission(?:ed|ing)?)\b/,
    /\b(?:depart(?:ed|ing|ure)|left|leaving|picked up|pickup|in transit|on the road|en route|heading to|moving to|relocat(?:e|ed|ing))\b/,
    /\b(?:eta|expected arrival|scheduled (?:to )?(?:leave|arrive)|will (?:leave|arrive|go to))\b/,
    /\bhas renamed the channel\b/,
  ].some((pattern) => pattern.test(text));
}

function dateFromSlackTs(value, timeZone = "America/Los_Angeles") {
  const seconds = Number.parseFloat(String(value || ""));
  if (!Number.isFinite(seconds)) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(seconds * 1000));
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return byType.year && byType.month && byType.day
    ? `${byType.year}-${byType.month}-${byType.day}`
    : "";
}

function buildTrailerByNumber(trailers = []) {
  const groups = new Map();
  (Array.isArray(trailers) ? trailers : []).forEach((trailer) => {
    const stored = Number(trailer?.number);
    const match = `${trailer?.id || ""} ${trailer?.name || ""}`.match(
      /\bAIS\s*0*(\d{1,3})\b/i
    );
    const number = Number.isFinite(stored) && stored > 0
      ? stored
      : match
        ? Number(match[1])
        : null;
    if (!Number.isFinite(number)) return;
    if (!groups.has(number)) groups.set(number, []);
    groups.get(number).push(trailer);
  });

  const selected = new Map();
  groups.forEach((candidates, number) => {
    const canonicalId = `AIS${number}`.toUpperCase();
    const ranked = [...candidates].sort((left, right) => {
      const score = (trailer) => {
        const id = String(trailer?.id || "").trim().toUpperCase();
        let value = id === canonicalId ? 1000 : 0;
        if (trailer?.currentClientId) value += 40;
        if (trailer?.currentArrivalDate) value += 15;
        if (trailer?.transitStatus) value += 10;
        if (trailer?.model) value += 5;
        return value;
      };
      return score(right) - score(left) ||
        String(left?.id || "").localeCompare(String(right?.id || ""));
    });
    selected.set(number, ranked[0]);
  });
  return selected;
}

module.exports = {
  buildTrailerByNumber,
  dateFromSlackTs,
  extractSlackThreadLinks,
  hasTrailerMovementSignal,
  slackDigitsToTs,
  trailerNumberFromChannel,
};
