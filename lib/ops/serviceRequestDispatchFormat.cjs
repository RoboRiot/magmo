"use strict";

const GENERIC_CONTEXT_TOKENS = new Set([
  "and",
  "center",
  "clinic",
  "ct",
  "diagnostic",
  "healthcare",
  "hospital",
  "imaging",
  "medical",
  "mobile",
  "mri",
  "pet",
  "system",
  "the",
  "trailer",
]);

function clean(value, maxLength = 220) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function comparableTokens(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter(
      (token) =>
        token.length > 2 &&
        !GENERIC_CONTEXT_TOKENS.has(token) &&
        !/^[a-z]{2}$/.test(token)
    );
}

function trailerNumber(...values) {
  for (const value of values) {
    const match = clean(value).match(/\btrailer\s*(?:#\s*|ais\s*)?(\d{1,3})\b/i);
    if (match) return String(Number(match[1]));
  }
  return "";
}

function dispatchClientLabel(clientName) {
  const original = clean(clientName);
  if (!/^simon\s*med\b/i.test(original)) return original;

  return clean(
    original
      .replace(/^simon\s*med(?:\s+imaging)?\b/i, "Simonmed")
      .replace(/\s*[-,]\s*/g, " ")
      .replace(/\s+\b(?:AZ|CA|CO|FL|GA|NV|TX|UT|WA)\b$/i, "")
  );
}

function normalizedDelimiterTitle(issueTitle) {
  return clean(issueTitle).replace(/\s+[–—]\s+/, " - ");
}

function alreadyHasDispatchContext({ issueTitle, clientName, machineName, trailerName }) {
  const title = normalizedDelimiterTitle(issueTitle);
  const separatorIndex = title.indexOf(" - ");
  if (separatorIndex <= 0 || separatorIndex >= title.length - 3) return false;

  const prefix = title.slice(0, separatorIndex);
  const number = trailerNumber(trailerName, machineName, clientName);
  if (
    number &&
    new RegExp(`\\btrailer\\s*(?:#\\s*|ais\\s*)?${number}\\b`, "i").test(prefix)
  ) {
    return true;
  }

  const prefixTokens = new Set(comparableTokens(prefix));
  const contextTokens = new Set([
    ...comparableTokens(dispatchClientLabel(clientName)),
    ...comparableTokens(machineName),
    ...comparableTokens(trailerName),
  ]);
  return [...contextTokens].some((token) => prefixTokens.has(token));
}

function buildServiceRequestDispatchSubject({
  issueTitle,
  clientName,
  machineName = "",
  trailerName = "",
} = {}) {
  const title = normalizedDelimiterTitle(issueTitle) || "Service request";
  if (
    alreadyHasDispatchContext({
      issueTitle: title,
      clientName,
      machineName,
      trailerName,
    })
  ) {
    return title;
  }

  const clientLabel = dispatchClientLabel(clientName);
  const number = trailerNumber(trailerName, machineName, clientName);
  const context = clean(
    [clientLabel, number ? `Trailer#${number}` : ""].filter(Boolean).join(" ") ||
      trailerName ||
      machineName ||
      "Service request"
  );
  return clean(`${context} - ${title}`, 300);
}

module.exports = {
  alreadyHasDispatchContext,
  buildServiceRequestDispatchSubject,
  dispatchClientLabel,
  trailerNumber,
};
