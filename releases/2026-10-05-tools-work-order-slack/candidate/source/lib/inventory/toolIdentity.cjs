"use strict";

const TOOL_COLLECTION = "Tool";
const TOOL_PUBLIC_ORIGIN = "https://magmo.cloud";
const TOOL_ROUTE_PREFIX = "/NewSearch/Tools";

function normalizeToolId(value) {
  if (typeof value !== "string") return "";
  if (/[\u0000-\u001f\u007f]/.test(value)) return "";
  const text = value.trim();
  if (text.length > 80 || /[\u0000-\u001f\u007f]/.test(text)) return "";
  const match = /^AIS[ _-]*T[ _-]*(\d{1,5})$/i.exec(text);
  if (!match) return "";
  const number = Number(match[1]);
  return number > 0 && number <= 99999 ? `AIS_T${String(number).padStart(5, "0")}` : "";
}

function parseToolScanCode(value) {
  if (typeof value !== "string") return "";
  const direct = normalizeToolId(value);
  if (direct) return direct;
  if (value.length > 500 || /[\u0000-\u001f\u007f]/.test(value)) return "";
  try {
    const url = new URL(value.trim());
    if (url.origin !== TOOL_PUBLIC_ORIGIN || url.username || url.password || url.search || url.hash) return "";
    const match = /^\/NewSearch\/Tools\/([^/]+)\/?$/.exec(url.pathname);
    return match ? normalizeToolId(decodeURIComponent(match[1])) : "";
  } catch {
    return "";
  }
}

function getToolLookupValues(value) {
  const id = normalizeToolId(value);
  if (!id) return [];
  const digits = id.slice(5);
  return [...new Set([id, String(value).trim(), id.toLowerCase(), `AIS-T${digits}`, `AIS T${digits}`, `AIST${digits}`])];
}

function buildToolRoute(value) {
  const id = normalizeToolId(value);
  return id ? `${TOOL_ROUTE_PREFIX}/${encodeURIComponent(id)}` : "";
}

module.exports = { TOOL_COLLECTION, TOOL_PUBLIC_ORIGIN, TOOL_ROUTE_PREFIX, normalizeToolId, parseToolScanCode, getToolLookupValues, buildToolRoute };
