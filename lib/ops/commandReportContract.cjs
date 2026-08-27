"use strict";

const COMMAND_REPORT_TYPES = new Set([
  "service_complete",
  "final",
  "parts",
]);

function normalizeOpsCommandReportType(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return COMMAND_REPORT_TYPES.has(normalized) ? normalized : "parts";
}

function fallbackPartSummary(reportType) {
  if (reportType === "service_complete") {
    return "Service is complete; parts return remains pending before final closeout.";
  }
  if (reportType === "final") {
    return "Parts return obligations were complete or not applicable at final closeout.";
  }
  return "";
}

function applyOpsCommandReportScope(report = {}, value) {
  const reportType = normalizeOpsCommandReportType(value);
  const scoped = { ...report };
  if (reportType === "parts") {
    scoped.slackReport = "";
    scoped.opsHeadline = "";
    scoped.opsStatusLine = "";
    scoped.opsSummary = "";
    scoped.companyLessons = [];
    return scoped;
  }
  if (!String(scoped.partSummary || "").trim()) {
    scoped.partSummary = fallbackPartSummary(reportType);
  }
  return scoped;
}

function messagesAfterOpsUpdate(messages, previousUpdate, value) {
  const candidates = Array.isArray(messages) ? messages : [];
  const reportType = normalizeOpsCommandReportType(value);
  if (reportType === "parts" || !previousUpdate?.summary) return candidates;
  const cursor = Number(previousUpdate?.throughSlackTs);
  if (!Number.isFinite(cursor) || cursor <= 0) return candidates;
  return candidates.filter((message) => {
    const slackTs = Number(message?.slackTs);
    return Number.isFinite(slackTs) && slackTs > cursor;
  });
}

module.exports = {
  applyOpsCommandReportScope,
  messagesAfterOpsUpdate,
  normalizeOpsCommandReportType,
};
