"use strict";

const crypto = require("crypto");

const IMPORT_TEXT_FIELDS = Object.freeze([
  ["number", "number", 120],
  ["subject", "subject", 500],
  ["description", "description", 1800],
  ["customer", "customer", 220],
  ["bluefolderUrl", "bluefolderUrl", 1200],
  ["createdAt", "createdAtIso", 80],
  ["bluefolderStatus", "bluefolderStatus", 120],
  ["bluefolderBillingStatus", "bluefolderBillingStatus", 120],
  ["bluefolderDateTimeClosed", "bluefolderDateTimeClosed", 80],
  ["bluefolderWorkflowStatus", "bluefolderWorkflowStatus", 80],
  ["clientId", "clientId", 180],
  ["clientName", "clientName", 220],
  ["clientLocation", "clientLocation", 500],
  ["machineId", "machineId", 180],
  ["machineName", "machineName", 220],
  ["trailerId", "trailerId", 180],
  ["trailerName", "trailerName", 220],
]);

const ASSOCIATION_FIELDS = Object.freeze({
  client: Object.freeze(["clientId", "clientName", "clientLocation"]),
  machine: Object.freeze(["machineId", "machineName"]),
  trailer: Object.freeze(["trailerId", "trailerName"]),
});

const BLUE_FOLDER_STORED_IDENTITY_FIELDS = Object.freeze([
  ["customerId", "bluefolderCustomerId", 100],
  ["customerName", "bluefolderCustomerName", 220],
  ["customerLocationId", "bluefolderLocationId", 100],
  ["customerLocationName", "bluefolderLocationName", 220],
  ["addressStreet", "bluefolderAddressStreet", 250],
  ["addressCity", "bluefolderAddressCity", 100],
  ["addressState", "bluefolderAddressState", 100],
  ["addressPostalCode", "bluefolderAddressPostalCode", 30],
  ["addressCountry", "bluefolderAddressCountry", 100],
]);

const PROTECTED_DISPATCH_FIELDS = Object.freeze([
  "slackChannel",
  "slackThreadTs",
  "slackPermalink",
  "slackTs",
  "commandTs",
  "dispatchReceipt",
  "dispatchStatus",
  "dispatchedAt",
  "dispatchedBy",
]);

const IMPORT_TOP_LEVEL_FIELDS = Object.freeze([
  "eventType",
  "workOrderId",
  "blueFolder",
  "existingOnly",
  ...IMPORT_TEXT_FIELDS.map(([inputField]) => inputField),
  "bluefolderAssignees",
]);
const BLUE_FOLDER_IDENTITY_FIELDS = Object.freeze([
  "serviceRequestId",
  "equipmentIds",
  "equipmentNames",
  ...BLUE_FOLDER_STORED_IDENTITY_FIELDS.map(([field]) => field),
]);
const IMPORT_PERSON_FIELDS = Object.freeze(["id", "name", "email"]);
const MAGMO_WORKFLOW_STAGES = new Set([
  "unassigned",
  "active",
  "remote",
  "scheduled",
  "on_hold",
  "inactive",
  "service_complete",
  "done",
  "closed",
]);
const TERMINAL_WORKFLOW_RANK = Object.freeze({
  service_complete: 1,
  done: 2,
  closed: 3,
});
const MANUAL_WORKFLOW_SOURCES = new Set([
  "manual_stage_move",
  "manual_assignment",
  "assignment_dispute",
  "admin_correction",
]);

function cleanText(value, maxLength = 500) {
  if (value === undefined || value === null) return "";
  return String(value).trim().slice(0, maxLength);
}

function hasOwn(value, key) {
  return Boolean(
    value && Object.prototype.hasOwnProperty.call(value, key)
  );
}

function normalizeWorkflowStage(value) {
  const stage = cleanText(value, 80)
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (["processing", "open", "in_progress"].includes(stage)) return "active";
  if (["complete", "completed"].includes(stage)) return "done";
  return MAGMO_WORKFLOW_STAGES.has(stage) ? stage : "";
}

function blueFolderWorkflowStage(value, dateTimeClosed = "") {
  const status = cleanText(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  if (cleanText(dateTimeClosed, 80) || status === "closed") return "closed";
  if (["complete ready for bill", "completed ready for bill"].includes(status)) {
    return "done";
  }
  if (
    [
      "work complete",
      "complete pending return",
      "completed pending return",
    ].includes(status)
  ) {
    return "service_complete";
  }
  if (["postponed", "on hold", "hold"].includes(status)) return "on_hold";
  if (["assigned", "in progress", "in process"].includes(status)) {
    return "active";
  }
  if (["new", "open"].includes(status)) return "unassigned";
  return "";
}

function initialBlueFolderWorkflowStage({
  bluefolderWorkflowStatus = "",
  bluefolderStatus = "",
  bluefolderDateTimeClosed = "",
  hasAssignees = false,
} = {}) {
  return (
    normalizeWorkflowStage(bluefolderWorkflowStatus) ||
    blueFolderWorkflowStage(bluefolderStatus, bluefolderDateTimeClosed) ||
    (hasAssignees ? "active" : "unassigned")
  );
}

function hasManualWorkflowLock(existing = {}) {
  if (existing.workflowManualOverrideAt) return true;
  const review = existing.aiWorkflowReview;
  if (
    review &&
    typeof review === "object" &&
    cleanText(review.status, 40).toLowerCase() === "reviewed" &&
    normalizeWorkflowStage(review.correctedStage) ===
      normalizeWorkflowStage(existing.workflowStatus || existing.workflowStage)
  ) {
    return true;
  }
  const history = Array.isArray(existing.workflowStageHistory)
    ? existing.workflowStageHistory
    : [];
  const latest = history[history.length - 1];
  return MANUAL_WORKFLOW_SOURCES.has(
    cleanText(latest?.source, 60).toLowerCase()
  );
}

function effectiveExistingWorkflowStage(existing = {}) {
  const stored = normalizeWorkflowStage(
    existing.workflowStatus || existing.workflowStage
  );
  if (TERMINAL_WORKFLOW_RANK[stored]) return stored;
  const topLevelStatus = cleanText(existing.status, 40).toLowerCase();
  if (topLevelStatus === "closed") return "closed";
  if (["complete", "completed", "done"].includes(topLevelStatus)) {
    return "done";
  }
  return stored;
}

function buildBlueFolderLifecycleCorrection(existing = {}, payload = {}) {
  if (cleanText(existing.bluefolderImportSource, 80).toLowerCase() !== "bluefolder") {
    return { patch: {}, targetStage: "", applied: false };
  }
  if (hasManualWorkflowLock(existing)) {
    return { patch: {}, targetStage: "", applied: false };
  }
  const targetStage =
    normalizeWorkflowStage(payload.bluefolderWorkflowStatus) ||
    blueFolderWorkflowStage(
      hasOwn(payload, "bluefolderStatus")
        ? payload.bluefolderStatus
        : existing.bluefolderStatus,
      hasOwn(payload, "bluefolderDateTimeClosed")
        ? payload.bluefolderDateTimeClosed
        : existing.bluefolderDateTimeClosed
    );
  const targetRank = TERMINAL_WORKFLOW_RANK[targetStage] || 0;
  if (!targetRank) {
    return { patch: {}, targetStage: "", applied: false };
  }

  const currentStage = effectiveExistingWorkflowStage(existing);
  const currentRank = TERMINAL_WORKFLOW_RANK[currentStage] || 0;
  if (currentRank > targetRank) {
    return { patch: {}, targetStage, applied: false };
  }

  const desiredStatus = targetStage === "service_complete" ? "active" : "completed";
  const patch = {};
  const storedStage = normalizeWorkflowStage(
    existing.workflowStatus || existing.workflowStage
  );
  if (currentRank < targetRank || storedStage !== targetStage) {
    patch.workflowStatus = targetStage;
  }
  if (cleanText(existing.status, 40).toLowerCase() !== desiredStatus) {
    patch.status = desiredStatus;
  }
  return {
    patch,
    targetStage,
    applied: Object.keys(patch).length > 0,
  };
}

function normalizePerson(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const id = cleanText(value.id || value.userId || value.slackUserId, 180);
  const name = cleanText(value.name || value.displayName || value.realName, 180);
  const email = cleanText(value.email, 240).toLowerCase();
  if (!id && !name && !email) return null;
  return {
    ...(id ? { id } : {}),
    ...(name ? { name } : {}),
    ...(email ? { email } : {}),
  };
}

function normalizePeople(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map(normalizePerson)
    .filter(Boolean)
    .filter((person) => {
      const key = cleanText(
        person.id || person.email || person.name,
        240
      ).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((left, right) =>
      cleanText(left.id || left.email || left.name, 240).localeCompare(
        cleanText(right.id || right.email || right.name, 240)
      )
    )
    .slice(0, 50);
}

function equal(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function forbiddenDispatchFields(payload = {}) {
  const protectedNames = new Set(
    PROTECTED_DISPATCH_FIELDS.map((field) => field.toLowerCase()).concat([
      "threadts",
      "commandts",
    ])
  );
  const present = [];
  const visit = (value, path = "") => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach((entry, index) => visit(entry, `${path}[${index}]`));
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      const fieldPath = path ? `${path}.${key}` : key;
      const normalizedKey = key.toLowerCase();
      if (
        protectedNames.has(normalizedKey) ||
        normalizedKey.includes("slack") ||
        normalizedKey.startsWith("dispatch") ||
        (normalizedKey === "channel" && path === "source")
      ) {
        present.push(fieldPath);
      }
      visit(child, fieldPath);
    }
  };
  visit(payload);
  return [...new Set(present)];
}

function unsupportedImportFields(payload = {}) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const unsupported = [];
  const allowedTopLevel = new Set(IMPORT_TOP_LEVEL_FIELDS);
  for (const field of Object.keys(payload)) {
    if (!allowedTopLevel.has(field)) unsupported.push(field);
  }

  const blueFolder = payload.blueFolder;
  if (blueFolder && typeof blueFolder === "object" && !Array.isArray(blueFolder)) {
    const allowedIdentity = new Set(BLUE_FOLDER_IDENTITY_FIELDS);
    for (const field of Object.keys(blueFolder)) {
      if (!allowedIdentity.has(field)) unsupported.push(`blueFolder.${field}`);
    }
  }

  if (Array.isArray(payload.bluefolderAssignees)) {
    const allowedPerson = new Set(IMPORT_PERSON_FIELDS);
    payload.bluefolderAssignees.forEach((person, index) => {
      if (!person || typeof person !== "object" || Array.isArray(person)) return;
      for (const field of Object.keys(person)) {
        if (!allowedPerson.has(field)) {
          unsupported.push(`bluefolderAssignees[${index}].${field}`);
        }
      }
    });
  }
  return [...new Set(unsupported)];
}

function validateEquipmentIdentity(blueFolder = {}) {
  for (const field of ["equipmentIds", "equipmentNames"]) {
    if (!hasOwn(blueFolder, field)) continue;
    const value = blueFolder[field];
    if (!Array.isArray(value) || value.length > 50 || value.some((entry) =>
      typeof entry !== "string" || entry.length > 220)) {
      const error = new Error(`blueFolder.${field} must be an array of at most 50 strings (220 characters each).`);
      error.code = "bluefolder_equipment_identity_invalid";
      throw error;
    }
  }
}

function buildBlueFolderImportPatch(existing = {}, payload = {}) {
  const blueFolder =
    payload.blueFolder &&
    typeof payload.blueFolder === "object" &&
    !Array.isArray(payload.blueFolder)
      ? payload.blueFolder
      : {};
  const serviceRequestId = cleanText(blueFolder.serviceRequestId, 180);
  if (!serviceRequestId) {
    throw new Error("A BlueFolder service-request ID is required.");
  }
  const existingIdentity = cleanText(existing.bluefolderServiceRequestId, 180);
  if (hasOwn(payload, "existingOnly") && typeof payload.existingOnly !== "boolean") {
    const error = new Error("existingOnly must be a boolean.");
    error.code = "bluefolder_import_existing_only_invalid";
    throw error;
  }
  if (existingIdentity && existingIdentity !== serviceRequestId) {
    const error = new Error(
      `BlueFolder service-request identity cannot change from ${existingIdentity} to ${serviceRequestId}.`
    );
    error.code = "bluefolder_identity_conflict";
    throw error;
  }
  const forbidden = forbiddenDispatchFields(payload);
  if (forbidden.length) {
    const error = new Error(
      `Slack or Dispatch receipt fields are not accepted by work_order.imported: ${forbidden.join(", ")}.`
    );
    error.code = "bluefolder_import_contains_slack_receipt";
    throw error;
  }
  const unsupported = unsupportedImportFields(payload);
  if (unsupported.length) {
    const error = new Error(
      `Unsupported work_order.imported fields: ${unsupported.join(", ")}.`
    );
    error.code = "bluefolder_import_unsupported_fields";
    error.fields = unsupported;
    throw error;
  }

  const desired = {
    workOrderId: serviceRequestId,
    bluefolderServiceRequestId: serviceRequestId,
    bluefolderImportSource: "bluefolder",
  };
  validateEquipmentIdentity(blueFolder);
  for (const field of ["equipmentIds", "equipmentNames"]) {
    if (hasOwn(blueFolder, field)) {
      desired[`bluefolder${field[0].toUpperCase()}${field.slice(1)}`] =
        [...new Set(blueFolder[field].map((entry) => cleanText(entry, 220)).filter(Boolean))].sort();
    }
  }
  for (const [inputField, storedField, maxLength] of BLUE_FOLDER_STORED_IDENTITY_FIELDS) {
    if (!hasOwn(blueFolder, inputField)) continue;
    desired[storedField] = cleanText(blueFolder[inputField], maxLength);
  }

  const associationAllowed = new Map();
  for (const [association, fields] of Object.entries(ASSOCIATION_FIELDS)) {
    const idField = fields[0];
    const existingId = cleanText(existing[idField], 180);
    const incomingId = cleanText(payload[idField], 180);
    associationAllowed.set(
      association,
      !existingId || (Boolean(incomingId) && incomingId === existingId)
    );
  }
  for (const [inputField, storedField, maxLength] of IMPORT_TEXT_FIELDS) {
    if (!hasOwn(payload, inputField)) continue;
    const association = Object.entries(ASSOCIATION_FIELDS).find(([, fields]) =>
      fields.includes(inputField)
    )?.[0];
    if (association && !associationAllowed.get(association)) continue;
    desired[storedField] = cleanText(payload[inputField], maxLength);
  }
  if (hasOwn(payload, "bluefolderAssignees")) {
    desired.bluefolderAssignees = normalizePeople(payload.bluefolderAssignees);
  }

  const fingerprint = crypto
    .createHash("sha256")
    .update(JSON.stringify(desired))
    .digest("hex");
  if (cleanText(existing.bluefolderImportFingerprint, 80) === fingerprint) {
    return {
      serviceRequestId,
      fingerprint,
      patch: {},
      changedFields: [],
      idempotentReplay: true,
    };
  }
  desired.bluefolderImportFingerprint = fingerprint;

  const patch = {};
  for (const [key, value] of Object.entries(desired)) {
    if (!equal(existing[key], value)) patch[key] = value;
  }
  return {
    serviceRequestId,
    fingerprint,
    patch,
    changedFields: Object.keys(patch),
    idempotentReplay: Object.keys(patch).length === 0,
  };
}

module.exports = {
  ASSOCIATION_FIELDS,
  BLUE_FOLDER_IDENTITY_FIELDS,
  BLUE_FOLDER_STORED_IDENTITY_FIELDS,
  IMPORT_TEXT_FIELDS,
  IMPORT_TOP_LEVEL_FIELDS,
  PROTECTED_DISPATCH_FIELDS,
  blueFolderWorkflowStage,
  buildBlueFolderLifecycleCorrection,
  buildBlueFolderImportPatch,
  forbiddenDispatchFields,
  initialBlueFolderWorkflowStage,
  normalizePeople,
  unsupportedImportFields,
  validateEquipmentIdentity,
};
