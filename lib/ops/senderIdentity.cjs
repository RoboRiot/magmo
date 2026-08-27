"use strict";

const SLACK_USER_ID_PATTERN = /^[UW][A-Z0-9]{6,}$/i;
const OBJECT_PLACEHOLDER_PATTERN = /^(?:\[object\s+object\]|object\s+object)$/i;

function scalarText(value, maxLength = 180) {
  if (typeof value !== "string" && typeof value !== "number") return "";
  const text = String(value).trim().slice(0, maxLength);
  if (!text || OBJECT_PLACEHOLDER_PATTERN.test(text)) return "";
  return text;
}

function objectValue(value) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : null;
}

function firstScalar(values, maxLength) {
  for (const value of values) {
    const text = scalarText(value, maxLength);
    if (text) return text;
  }
  return "";
}

function nestedObjects(payload = {}) {
  return [
    objectValue(payload.sender),
    objectValue(payload.senderId),
    objectValue(payload.senderName),
    objectValue(payload.user),
  ].filter(Boolean);
}

function slackUserId(value) {
  const id = scalarText(value, 80);
  return SLACK_USER_ID_PATTERN.test(id) ? id.toUpperCase() : "";
}

function uniqueSlackUserIds(values) {
  return Array.from(
    new Set(values.map((value) => slackUserId(value)).filter(Boolean))
  );
}

/**
 * Flatten the sender shapes accepted from Slack listeners without ever
 * coercing an object to "[object Object]". A valid Slack ID is authoritative;
 * a human-readable name is optional because known IDs are canonicalized by
 * the Ops engineer directory at the call site.
 */
function resolveSlackSenderIdentity(payload = {}) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const nested = nestedObjects(payload);
  const ids = uniqueSlackUserIds(
    [
      payload.senderId,
      payload.userId,
      payload.slackUserId,
      payload.user,
      ...nested.flatMap((entry) => [
        entry.id,
        entry.user,
        entry.user_id,
        entry.userId,
        entry.slackUserId,
      ]),
    ]
  );

  // Never splice a name from one sender container onto another container's
  // ID. Slack's user ID is the attribution key, so conflicting IDs make the
  // entire payload unsafe to record as engineer evidence.
  if (ids.length !== 1) return null;
  const id = ids[0];

  const name = firstScalar(
    [
      payload.senderName,
      payload.userName,
      payload.username,
      ...nested.flatMap((entry) => [
        entry.name,
        entry.displayName,
        entry.display_name,
        entry.realName,
        entry.real_name,
        objectValue(entry.profile)?.display_name_normalized,
        objectValue(entry.profile)?.display_name,
        objectValue(entry.profile)?.real_name_normalized,
        objectValue(entry.profile)?.real_name,
      ]),
    ],
    100
  );

  return { id, name: name || id };
}

module.exports = {
  OBJECT_PLACEHOLDER_PATTERN,
  SLACK_USER_ID_PATTERN,
  resolveSlackSenderIdentity,
  scalarText,
  slackUserId,
};
