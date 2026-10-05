"use strict";

const { normalizeToolId } = require("./toolIdentity.cjs");

function labelError(statusCode, code, message) {
  return Object.assign(new Error(message), { statusCode, code });
}

function labelText(value, maximum) {
  const values = Array.isArray(value) ? value : [value];
  return values
    .filter((entry) => typeof entry === "string" || typeof entry === "number")
    .map(String).join(", ").replace(/[\x00-\x1f\x7f]/g, " ")
    .replace(/\s+/g, " ").trim().slice(0, maximum);
}

async function loadToolLabelPayload({ db, toolId } = {}) {
  const canonicalId = normalizeToolId(toolId);
  if (!canonicalId) throw labelError(400, "invalid_tool_id", "Select a valid saved tool to print.");
  if (!db || typeof db.collection !== "function") {
    throw labelError(503, "database_unavailable", "The inventory database is unavailable.");
  }
  const snapshot = await db.collection("Tool").doc(canonicalId).get();
  if (!snapshot.exists) throw labelError(404, "tool_not_found", "This tool was not found. Save the tool before printing.");
  const tool = snapshot.data() || {};
  if (tool.archived === true || tool.isArchived === true || tool.deleted === true || tool.isDeleted === true || tool.deletedAt) {
    throw labelError(409, "tool_unavailable", "Archived or deleted tools cannot be printed.");
  }
  return {
    template: "tool-v1",
    label_type: "tool",
    tool_id: canonicalId,
    name: labelText(tool.name, 160) || canonicalId,
    description: labelText(tool.description, 600),
    oem: labelText(tool.oem || tool.OEM, 100),
    model: labelText(tool.model || tool.Model, 100),
    modality: labelText(tool.modality || tool.Modality, 100),
    barcode_value: canonicalId,
    barcode_format: "CODE128",
    qr_value: `https://magmo.cloud/NewSearch/Tools/${canonicalId}`,
  };
}

module.exports = { labelText, loadToolLabelPayload };
