"use strict";

const { randomUUID } = require("node:crypto");
const contract = require("./workOrderAddContract.cjs");
const { getItemPhotoStoragePrefixes } = require("../items/itemEditorOperations.cjs");
const { getCurrentWorkOrder } = require("../items/itemHistory.cjs");
const threadLinks = require("./workOrderAddSlackThread.cjs");
const { confirmedSlackTarget, slackListForTarget } = require("./workOrderAddSlackTargets.cjs");

const OPERATION_COLLECTION = "InventoryWorkOrderAddOperations";
const LEASE_MS = 10 * 60 * 1000;
const clean = (value, length = 500) => String(value ?? "").trim().slice(0, length);
const DELIVERY_STAGES = new Set([
  "photo_loading", "payload_build", "payload_checkpoint", "slack_list_delivery", "completion_checkpoint",
]);
// Do not accept arbitrary error strings as diagnostic codes: SDK errors can
// contain signed photo URLs, user input, or credentials even in their `code`.
const SAFE_ERROR_CODES = new Set([
  "storage_unavailable", "too_many_photo_folders", "photo_url_unavailable", "photo_download_failed",
  "storage_permission_denied", "storage_object_not_found", "storage_retry_limit_exceeded", "storage_auth_metadata_incompatible",
  "invalid_auth", "not_authed", "account_inactive", "token_revoked", "missing_scope",
  "not_allowed", "access_denied", "permission_denied", "list_not_found", "not_in_list",
  "ratelimited", "rate_limited", "restricted_action", "invalid_arguments", "invalid_arg_name",
  "invalid_array_arg", "invalid_json", "invalid_form_data", "invalid_post_type",
  "missing_SLACK_BOT_TOKEN", "missing_SLACK_LIST_SHIPPING_ID", "missing_SLACK_LIST_RECEIVING_ID",
  "missing_SLACK_LIST_TOOLS_ID", "tool_slack_lookup_failed", "tool_slack_lookup_incomplete",
  "tool_slack_send_in_progress", "tool_slack_creation_uncertain", "tool_slack_claim_lost",
  "tool_slack_row_missing", "tool_slack_send_failed", "tool_moved_since_confirmation", "tool_not_found", "tool_identity_required",
  "missing_title_column_env", "slack_list_changed", "slack_claim_lost", "slack_row_checkpoint_missing",
  "create_failed", "update_failed", "fatal_error", "internal_error", "unknown_error", "exception",
  "get_upload_url_failed", "upload_post_failed", "complete_failed",
  "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "ENOTFOUND", "EAI_AGAIN", "EPIPE",
  "UND_ERR_CONNECT_TIMEOUT", "UND_ERR_HEADERS_TIMEOUT", "UND_ERR_SOCKET",
  "type_error", "timeout_error", "abort_error", "slack_send_failed",
  ...[...DELIVERY_STAGES].map((stage) => `${stage}_failed`),
  ...[400, 401, 403, 404, 408, 409, 429, 500, 502, 503, 504].map((status) => `http_${status}`),
  "grpc_cancelled", "grpc_unknown", "grpc_deadline_exceeded", "grpc_not_found",
  "grpc_permission_denied", "grpc_resource_exhausted", "grpc_unavailable", "grpc_unauthenticated",
]);
const SAFE_ERROR_NAMES = new Set(["Error", "TypeError", "RangeError", "SyntaxError", "ReferenceError", "TimeoutError", "AbortError", "WorkOrderSlackError", "ApiError"]);

function safeErrorCode(value) {
  if (typeof value === "string" && SAFE_ERROR_CODES.has(value)) return value;
  const aliases = {
    "storage/unauthorized": "storage_permission_denied",
    "storage/object-not-found": "storage_object_not_found",
    "storage/retry-limit-exceeded": "storage_retry_limit_exceeded",
  };
  if (typeof value === "string" && Object.hasOwn(aliases, value)) return aliases[value];
  if (typeof value === "number") {
    if (SAFE_ERROR_CODES.has(`http_${value}`)) return `http_${value}`;
    return ({ 1: "grpc_cancelled", 2: "grpc_unknown", 4: "grpc_deadline_exceeded", 5: "grpc_not_found",
      7: "grpc_permission_denied", 8: "grpc_resource_exhausted", 14: "grpc_unavailable", 16: "grpc_unauthenticated" })[value] || "";
  }
  return "";
}

function deliveryDiagnostic(error, response, stage) {
  const errorStage = DELIVERY_STAGES.has(stage) ? stage : "slack_list_delivery";
  const errorName = SAFE_ERROR_NAMES.has(error?.name) ? error.name : "Error";
  const nameCode = { TypeError: "type_error", TimeoutError: "timeout_error", AbortError: "abort_error" }[errorName];
  // Known metadata-client incompatibility; classify this exact SDK message
  // without copying its text or any other exception details into diagnostics.
  const metadataCode = errorStage === "photo_loading" && [
    "Invalid response from metadata service: incorrect Metadata-Flavor header. Expected 'Google', got no header",
    "Invalid response from metadata service: incorrect Metadata-Flavor header. Expected Google, got no header",
  ].includes(error?.message)
    ? "storage_auth_metadata_incompatible" : "";
  return {
    errorStage,
    errorName,
    errorCode: metadataCode || safeErrorCode(error?.code) || safeErrorCode(error?.cause?.code) ||
      safeErrorCode(response?.error) || safeErrorCode(error?.statusCode) || safeErrorCode(error?.status) ||
      nameCode || `${errorStage}_failed`,
  };
}

function failedDeliveryMessage({ errorCode, errorStage }, row) {
  const toolIssue = {
    tool_slack_lookup_failed: "Magmo could not check whether this tool is already on Slack. No duplicate was added. Please retry the Slack check.",
    tool_slack_lookup_incomplete: "Magmo could not finish checking the Slack tools list. No duplicate was added. An administrator should check the list's access and columns.",
    tool_slack_send_in_progress: "This tool is already being checked or sent to Slack by another request. Please wait, then retry the Slack check.",
    tool_slack_creation_uncertain: "A previous tool send may already be on Slack. Automatic creation is blocked to avoid duplicates; check Slack or ask an administrator to review it.",
    tool_slack_claim_lost: "Another request now owns this tool's Slack send. No duplicate was added. Please retry the Slack check.",
    tool_slack_row_missing: "The tool's Slack row could not be confirmed. Check Slack before retrying; no automatic duplicate will be created.",
    tool_slack_send_failed: "The tool's Slack send could not finish. Retry will check for an existing row before attempting anything new.",
    tool_moved_since_confirmation: "This tool moved or its work order changed after confirmation. Review its current state before sending it to Slack.",
    tool_not_found: "The saved tool is no longer available. Review its Magmo record before sending it to Slack.",
    tool_identity_required: "The saved tool ID is missing or inconsistent. Review its Magmo record before sending it to Slack.",
  }[errorCode];
  if (toolIssue) return `${toolIssue} Your inventory is already saved and will not be saved again.`;
  const issue = errorCode === "storage_auth_metadata_incompatible"
    ? "Magmo's server could not authenticate to photo storage. An administrator needs to repair the server's storage connection before retrying."
    : errorStage === "photo_loading"
    ? "Magmo could not read this item's saved photos."
    : errorStage === "payload_build"
    ? "Magmo could not prepare this item's saved details for Slack."
    : errorStage === "payload_checkpoint" || errorStage === "completion_checkpoint"
    ? "Magmo could not confirm the Slack delivery checkpoint."
    : ["invalid_auth", "not_authed", "account_inactive", "token_revoked", "missing_SLACK_BOT_TOKEN"].includes(errorCode)
    ? "Magmo's Slack connection needs administrator attention before retrying."
    : ["missing_scope", "access_denied", "permission_denied", "not_allowed", "list_not_found", "not_in_list", "restricted_action"].includes(errorCode)
    ? "Magmo could not access the Slack list. An administrator needs to check the app's list access."
    : ["missing_SLACK_LIST_SHIPPING_ID", "missing_SLACK_LIST_RECEIVING_ID", "missing_SLACK_LIST_TOOLS_ID", "missing_title_column_env", "slack_list_changed"].includes(errorCode)
    ? "The Slack list configuration needs administrator attention before retrying."
    : ["ratelimited", "rate_limited", "http_429"].includes(errorCode)
    ? "Slack temporarily limited this send. Wait briefly before retrying."
    : "Slack could not finish this item. Retry sending; contact an administrator if it fails again.";
  return `${issue} ${row
    ? "The Slack row already exists; retry will resume it without creating another row."
    : "No Slack row was created; retry will attempt the send."} Your inventory is already saved and will not be saved again.`;
}

class WorkOrderSlackError extends Error {
  constructor(code, message, statusCode = 409) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
const fail = (code, message, status) => { throw new WorkOrderSlackError(code, message, status); };

function validatedItemId(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$/.test(value)) {
    fail("invalid_item_id", "A valid confirmed item ID is required.", 400);
  }
  return value;
}

function validateOperation(operation, uid, itemId, operationId) {
  if (operation?.createdBy?.uid !== uid) {
    fail("operation_owner_required", "Only the user who confirmed this list can send it to Slack.", 403);
  }
  const result = operation.result;
  if (operation.type !== "work_order_add_movement" || result?.ok !== true ||
      result.operationId !== operationId || !result.completedAt ||
      !Array.isArray(result.items) || result.items.length !== result.itemCount) {
    fail("confirmed_item_required", "This item is not in the successfully saved list.");
  }
  const mode = contract.normalizeMovementMode(operation.movementMode);
  if (mode !== result.movementMode) fail("operation_mismatch", "The saved movement direction is inconsistent.");
  return slackListForTarget(confirmedSlackTarget(result, itemId), mode);
}

function validateSavedItem(item, audit, operation, itemId) {
  if (!item || item.deleted || item.deletedAt || !audit ||
      audit.operationId !== operation.result.operationId || audit.itemId !== itemId ||
      audit.movementMode !== operation.movementMode ||
      audit.workOrder?.number !== operation.result.workOrder?.number) {
    fail("saved_item_required", "The saved item and its movement history could not be verified.");
  }
  for (const branch of ["From", "Current"]) {
    const expected = audit.afterConfiguration?.[`association${branch}`];
    const actual = item[`association${branch}`];
    if (!expected || !actual || ["clientId", "machineId", "trailerId", "associationType"]
      .some((field) => clean(expected[field]) !== clean(actual[field]))) {
      fail("item_moved_since_confirmation", "This item moved again after confirmation. Review it before sending to Slack.");
    }
  }
  if (item.movementDate !== audit.movementDate ||
      contract.normalizeWorkOrderNumber(getCurrentWorkOrder(item).workOrder) !==
        contract.normalizeWorkOrderNumber(operation.result.workOrder.number)) {
    fail("item_moved_since_confirmation", "This item's saved movement changed. Review it before sending to Slack.");
  }
  const latestMovement = (Array.isArray(item.selectionHistory) ? item.selectionHistory : [])
    .filter((entry) => entry?.action === "work_order_add" && entry?.operationId).at(-1);
  if (latestMovement?.operationId !== operation.result.operationId) {
    fail("item_moved_since_confirmation", "A later inventory movement superseded this confirmation. Review the item before sending to Slack.");
  }
}

function latestDescription(item) {
  const entries = Array.isArray(item.descriptions) ? item.descriptions : [];
  const valid = entries.map((entry, index) => ({ entry, index, at: Date.parse(entry?.date) || 0 }))
    .sort((a, b) => b.at - a.at || a.index - b.index);
  return clean(valid[0]?.entry?.description || item.description, 12000);
}

function buildSlackPayload({ item, itemId, operation, listKey, email, photoUrls = [] }) {
  const first = (value) => clean(Array.isArray(value) ? value[0] : value, 500);
  const pn = first(item.pn), sn = first(item.sn);
  const name = clean(Array.isArray(item.name) ? item.name.join(", ") : item.name, 300) || itemId;
  return {
    listKey,
    title: `${name} (${itemId})`,
    pn_sn: [pn && `PN: ${pn}`, sn && `SN: ${sn}`].filter(Boolean).join("  "),
    work_order: clean(operation.result.workOrder.number, 80),
    local_sn: itemId,
    tracking: clean(item.trackingNumber ?? item.tracking),
    description: latestDescription(item),
    submittedByEmail: clean(email, 180),
    photoUrls,
    shipping_date: clean(item.departure_date, 30),
    received_date: clean(item.arrival_date, 30),
    departure_date: clean(item.departure_date, 30),
    arrival_date: clean(item.arrival_date, 30),
  };
}

async function loadItemPhotoUrls(bucket, itemId, item) {
  if (!bucket) fail("storage_unavailable", "Item photos could not be read. Nothing was sent to Slack.", 503);
  const files = new Map();
  // Same current/prior storage folders as the item page. Never accept URLs or
  // storage paths from the HTTP request. No token/metadata changes are made.
  const prefixes = getItemPhotoStoragePrefixes(itemId, item.photoStoragePrefixes);
  if (prefixes.length > 25) fail("too_many_photo_folders", "This item has too many photo folders to send safely.");
  for (const prefix of prefixes) {
    const [listed] = await bucket.getFiles({ prefix, delimiter: "/", maxResults: 11, autoPaginate: false });
    for (const file of listed) if (!file.name.endsWith("/")) files.set(file.name, file);
  }
  const urls = [];
  // One extra URL allows the shared sender to disclose its existing 10-photo
  // limit instead of silently reporting that every image was attached.
  for (const file of [...files.values()].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 11)) {
    const [metadata] = await file.getMetadata();
    const token = clean(metadata.metadata?.firebaseStorageDownloadTokens, 2000).split(",")[0];
    if (!token) fail("photo_url_unavailable", "An item photo has no download URL. Nothing was sent to Slack.");
    urls.push(`https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket.name)}/o/${encodeURIComponent(file.name)}?alt=media&token=${encodeURIComponent(token)}`);
  }
  return urls;
}

function publicReceipt(itemId, data, extra = {}) {
  const diagnostic = data.status === "failed" || data.status === "uncertain" ? {
    ...(safeErrorCode(data.errorCode) ? { errorCode: safeErrorCode(data.errorCode) } : {}),
    ...(DELIVERY_STAGES.has(data.errorStage) ? { errorStage: data.errorStage } : {}),
    ...(SAFE_ERROR_NAMES.has(data.errorName) ? { errorName: data.errorName } : {}),
  } : {};
  return {
    itemId,
    status: data.status,
    listKey: data.listKey,
    message: data.message || "",
    warnings: data.warnings || [],
    ...(data.alreadyExists ? { alreadyExists: true } : {}),
    ...diagnostic,
    ...extra,
  };
}

function definitiveCreateRejection(code) {
  return /^(invalid_|missing_|not_authed$|account_inactive$|token_revoked$|not_allowed|access_denied$|permission_denied$|list_not_found$|not_in_list$|ratelimited$|rate_limited$|restricted_action)/.test(clean(code));
}

async function sendConfirmedItemToSlackList({ db, bucket, authUser, operationId, itemId,
  sendItem, loadPhotos = loadItemPhotoUrls, now = () => Date.now(),
  logError = (diagnostic) => console.error("[WorkOrderAdd][SlackDelivery]", diagnostic) }) {
  if (!authUser?.uid) fail("auth_required", "Authentication is required.", 401);
  if (!db) fail("database_unavailable", "The inventory database is unavailable.", 503);
  operationId = contract.normalizeOperationId(operationId);
  itemId = validatedItemId(itemId);
  const operationRef = db.collection(OPERATION_COLLECTION).doc(operationId);
  const receiptRef = operationRef.collection("SlackItems").doc(itemId);
  const claim = randomUUID();
  const acquired = await db.runTransaction(async (tx) => {
    const operationSnapshot = await tx.get(operationRef);
    if (!operationSnapshot.exists) fail("confirmed_operation_required", "Save the work-order list before sending it to Slack.");
    const operation = operationSnapshot.data();
    const listKey = validateOperation(operation, authUser.uid, itemId, operationId);
    const target = confirmedSlackTarget(operation.result, itemId);
    const receiptSnapshot = await tx.get(receiptRef);
    const receipt = receiptSnapshot.data() || {};
    if (receipt.status === "sent") return { result: publicReceipt(itemId, receipt, { alreadySent: true }) };
    // The tool sender has its own global create-intent checkpoint and may
    // safely reconcile an uncertain create by reading Slack's exact tool ID.
    if (receipt.status === "uncertain" && target.kind !== "tool") return { result: publicReceipt(itemId, receipt) };
    if (receipt.status === "sending" && receipt.leaseUntil > now()) {
      return { result: publicReceipt(itemId, receipt, { message: "This item is already being sent. Check its status shortly." }) };
    }
    if (receipt.createStarted && !receipt.row && target.kind !== "tool") {
      const uncertain = { status: "uncertain", listKey, message: "Slack may have created this row. Check Slack before another send; automatic retry is blocked to avoid duplicates." };
      tx.set(receiptRef, { ...uncertain, updatedAt: new Date(now()) }, { merge: true });
      return { result: publicReceipt(itemId, uncertain) };
    }
    const container = target.kind === "bin" || target.kind === "pallet";
    let item = null;
    // A resumed existing Slack row uses its original saved payload, so a later
    // inventory edit cannot silently alter this already-started movement.
    for (const memberId of target.itemIds) {
      const memberRef = db.collection(target.kind === "tool" ? "Tool" : "Test").doc(memberId);
      const itemSnapshot = await tx.get(memberRef);
      const auditSnapshot = await tx.get(memberRef.collection("WorkOrderAddHistory").doc(operationId));
      const member = itemSnapshot.exists ? itemSnapshot.data() : null;
      if (!receipt.row) validateSavedItem(member, auditSnapshot.exists ? auditSnapshot.data() : null, operation, memberId);
      if (!container) item = member;
    }
    if (container) item = { name: target.name, description: target.description };
    tx.set(receiptRef, {
      schemaVersion: 1, status: "sending", claim, leaseUntil: now() + LEASE_MS,
      // Only a newly opted-in send participates in thread linking. Existing
      // receipts, including historical retries, never back-post old list rows.
      ...(!receiptSnapshot.exists ? { threadLinkRequested: true } : {}),
      listKey, operationId, itemId, requestedBy: authUser.uid,
      attempts: Number(receipt.attempts || 0) + 1,
      updatedAt: new Date(now()), message: "",
    }, { merge: true });
    return { item, operation, listKey, receipt, target };
  });
  if (acquired.result) return acquired.result;
  const checkpoint = async (patch) => db.runTransaction(async (tx) => {
    const snapshot = await tx.get(receiptRef);
    const current = snapshot.data();
    if (current?.claim !== claim) fail("slack_claim_lost", "Another send owns this item; no new Slack row will be created.");
    // A transport failure after the completed receipt committed must never
    // downgrade it to failed and invite another delivery pass.
    if (current.status === "sent") return current;
    tx.set(receiptRef, { ...patch, updatedAt: new Date(now()) }, { merge: true });
    return { ...current, ...patch };
  });
  let row = acquired.receipt.row || null;
  let createStarted = false;
  let response;
  let stage = "photo_loading";
  const reportFailure = (diagnostic) => {
    // Logging is deliberately metadata-only and must not disrupt receipt safety.
    try { logError({ operationId, itemId, ...diagnostic, rowExists: Boolean(row), createStarted }); } catch {}
  };
  try {
    let payload = acquired.receipt.payload;
    if (!payload) {
      const photoUrls = acquired.target.kind === "item" ? await loadPhotos(bucket, itemId, acquired.item) :
        acquired.target.kind === "tool" && Array.isArray(acquired.item?.photoUrls)
          ? acquired.item.photoUrls.filter((url) => typeof url === "string") : [];
      stage = "payload_build";
      payload = buildSlackPayload({ ...acquired, itemId, email: authUser.email, photoUrls });
      if (acquired.target.kind === "tool") payload.toolId = itemId;
      stage = "payload_checkpoint";
      await checkpoint({ payload });
    }
    stage = "slack_list_delivery";
    response = await sendItem(payload, {
      authUser,
      db,
      ...(acquired.target.kind === "tool" ? { confirmedToolPayload: payload, confirmedToolOperationId: operationId } : {}),
      resumeRow: row,
      beforeCreate: async () => {
        await checkpoint({ createStarted: true });
        createStarted = true;
      },
      onCreateRejected: async (code) => {
        if (definitiveCreateRejection(code)) {
          await checkpoint({ createStarted: false });
          createStarted = false;
        }
      },
      onRowCreated: async (createdRow) => {
        row = createdRow;
        await checkpoint({ row, createStarted: false });
        createStarted = false;
      },
    });
    if (!response?.ok) throw new Error("Slack list delivery failed.");
    if (!row?.rowId || !row?.listId) fail("slack_row_checkpoint_missing", "Slack row checkpoint is missing.");
    const done = { status: "sent", listKey: acquired.listKey,
      warnings: Array.isArray(response.warnings) ? response.warnings : [],
      message: response.alreadyExists ? clean(response.message, 500) || `Tool ${itemId} is already on Slack; no duplicate was added.` : "Sent to Slack.",
      alreadyExists: response.alreadyExists === true,
      ...(response.alreadyExists ? { threadLinkRequested: false } : {}),
      leaseUntil: 0, completedAt: new Date(now()), row };
    stage = "completion_checkpoint";
    await checkpoint(done);
    return publicReceipt(itemId, done);
  } catch (error) {
    const uncertain = createStarted && !row;
    const diagnostic = deliveryDiagnostic(error, response, stage);
    reportFailure(diagnostic);
    const failed = {
      status: uncertain ? "uncertain" : "failed", listKey: acquired.listKey,
      leaseUntil: 0,
      message: uncertain
        ? "Slack may have created this row. Check Slack before another send; automatic retry is blocked to avoid duplicates."
        : failedDeliveryMessage(diagnostic, row),
      ...diagnostic,
    };
    // If receipt storage itself failed, leave the lease/checkpoint in place;
    // its durable createStarted marker prevents an unsafe blind recreation.
    try {
      const durable = await checkpoint(failed);
      return publicReceipt(itemId, durable);
    } catch (checkpointError) {
      reportFailure(deliveryDiagnostic(checkpointError, null, "completion_checkpoint"));
      throw checkpointError;
    }
  }
}

async function sendConfirmedItemToSlack(options) {
  const result = await sendConfirmedItemToSlackList(options);
  if (result.status !== "sent") return result;
  if (result.alreadyExists) return { ...result, threadStatus: "not_requested", listStatus: "sent" };
  const { db, authUser, itemId, now = () => Date.now(), fetchImpl,
    sendThreadLink = threadLinks.sendConfirmedItemThreadLink } = options;
  const operationId = contract.normalizeOperationId(options.operationId);
  const receiptRef = db.collection(OPERATION_COLLECTION).doc(operationId)
    .collection("SlackItems").doc(itemId);
  try {
    const linked = await sendThreadLink({ db, receiptRef, operationId, itemId, authUser, now, fetchImpl });
    return {
      ...result, ...linked, itemId, listKey: result.listKey, listStatus: "sent",
      alreadySent: result.alreadySent === true && linked.alreadySent === true,
      warnings: [...new Set([...(result.warnings || []), ...(linked.warnings || [])])],
    };
  } catch {
    // The list receipt remains complete even if the separate link checkpoint
    // fails. A retry reaches only the link phase, never list or inventory writes.
    return { ...result, status: "uncertain", listStatus: "sent", threadStatus: "uncertain",
      alreadySent: false,
      message: "The Slack list item is saved, but its work-order thread link could not be confirmed. Check status before trying again." };
  }
}

module.exports = {
  WorkOrderSlackError, LEASE_MS, buildSlackPayload, definitiveCreateRejection,
  loadItemPhotoUrls, sendConfirmedItemToSlack, validateOperation, validateSavedItem,
};
