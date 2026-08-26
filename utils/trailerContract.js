const DAY_MS = 86400000;

export const UNKNOWN_TRAILER_VALUE = "Unknown";

function parseDateOnly(value) {
  const match = String(value || "")
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}

function formatDays(days) {
  return `${days} ${days === 1 ? "day" : "days"}`;
}

function formatExplicitContractLength(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "";
  if (/^\d+(?:\.\d+)?$/.test(normalized)) {
    const amount = Number(normalized);
    return `${normalized} ${amount === 1 ? "day" : "days"}`;
  }
  return normalized;
}

function getTodayTimestamp(now) {
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

export function getTrailerContractSnapshot(trailer, now = new Date()) {
  const arrivalTimestamp = parseDateOnly(
    trailer?.locationCurrentArrivalDate ||
      trailer?.currentLocationArrivalDate,
  );
  const departureTimestamp = parseDateOnly(
    trailer?.locationCurrentDepartureDate ||
      trailer?.currentLocationDepartureDate,
  );
  const explicitLength = formatExplicitContractLength(
    trailer?.contractLength ||
      trailer?.contractDuration ||
      trailer?.duration ||
      trailer?.siteDuration,
  );

  const calculatedLength =
    arrivalTimestamp != null &&
    departureTimestamp != null &&
    departureTimestamp >= arrivalTimestamp
      ? formatDays(Math.round((departureTimestamp - arrivalTimestamp) / DAY_MS))
      : "";

  const daysRemaining =
    departureTimestamp == null
      ? UNKNOWN_TRAILER_VALUE
      : formatDays(
          Math.max(
            0,
            Math.ceil((departureTimestamp - getTodayTimestamp(now)) / DAY_MS),
          ),
        );

  return {
    arrivalDate:
      arrivalTimestamp == null
        ? UNKNOWN_TRAILER_VALUE
        : formatDate(arrivalTimestamp),
    departureDate:
      departureTimestamp == null
        ? UNKNOWN_TRAILER_VALUE
        : formatDate(departureTimestamp),
    daysRemaining,
    totalContractLength:
      calculatedLength || explicitLength || UNKNOWN_TRAILER_VALUE,
  };
}
