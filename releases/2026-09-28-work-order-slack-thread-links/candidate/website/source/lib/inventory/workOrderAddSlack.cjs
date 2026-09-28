"use strict";

const { randomUUID } = require("node:crypto");
const contract = require("./workOrderAddContract.cjs");
const { getItemPhotoStoragePrefixes } = require("../items/itemEditorOperations.cjs");
const threadLinks = require("./workOrderAddSlackThread.cjs");

const OPERATION_COLLECTION = "InventoryWorkOrderAddOperations";
const LEASE_MS = 10 * 60 * 1000;
const clean = (value, length = 500) => String(value ?? "").trim().slice(0, length);

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
      !Array.isArray(result.items) || result.items.length !== result.itemCount ||
      !result.items.some((item) => item.id === itemId)) {
    fail("confirmed_item_required", "This item is not in the successfully saved list.");
  }
  const mode = contract.normalizeMovementMode(operation.movementMode);
  if (mode !== result.movementMode) fail("operation_mismatch", "The saved movement direction is inconsistent.");
  return mode === "from_work_order" ? "receiving" : "shipping";
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
      !Array.isArray(item.workOrders) || !item.workOrders.some((entry) =>
        clean(entry?.workOrder) === clean(operation.result.workOrder.number))) {
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
  return {
    itemId,
    status: data.status,
    listKey: data.listKey,
    message: data.message || "",
    warnings: data.warnings || [],
    ...extra,
  };
}

function definitiveCreateRejection(code) {
  return /^(invalid_|missing_|not_authed$|account_inactive$|token_revoked$|not_allowed|access_denied$|permission_denied$|list_not_found$|not_in_list$|ratelimited$|rate_limited$|restricted_action)/.test(clean(code));
}

async function sendConfirmedItemToSlackList({ db, bucket, authUser, operationId, itemId,
  sendItem, loadPhotos = loadItemPhotoUrls, now = () => Date.now() }) {
  if (!authUser?.uid) fail("auth_required", "Authentication is required.", 401);
  if (!db) fail("database_unavailable", "The inventory database is unavailable.", 503);
  operationId = contract.normalizeOperationId(operationId);
  itemId = validatedItemId(itemId);
  const operationRef = db.collection(OPERATION_COLLECTION).doc(operationId);
  const receiptRef = operationRef.collection("SlackItems").doc(itemId);
  const itemRef = db.collection("Test").doc(itemId);
  const claim = randomUUID();
  const acquired = await db.runTransaction(async (tx) => {
    const operationSnapshot = await tx.get(operationRef);
    if (!operationSnapshot.exists) fail("confirmed_operation_required", "Save the work-order list before sending it to Slack.");
    const operation = operationSnapshot.data();
    const listKey = validateOperation(operation, authUser.uid, itemId, operationId);
    const receiptSnapshot = await tx.get(receiptRef);
    const receipt = receiptSnapshot.data() || {};
    if (receipt.status === "sent") return { result: publicReceipt(itemId, receipt, { alreadySent: true }) };
    if (receipt.status === "uncertain") return { result: publicReceipt(itemId, receipt) };
    if (receipt.status === "sending" && receipt.leaseUntil > now()) {
      return { result: publicReceipt(itemId, receipt, { message: "This item is already being sent. Check its status shortly." }) };
    }
    if (receipt.createStarted && !receipt.row) {
      const uncertain = { status: "uncertain", listKey, message: "Slack may have created this row. Check Slack before another send; automatic retry is blocked to avoid duplicates." };
      tx.set(receiptRef, { ...uncertain, updatedAt: new Date(now()) }, { merge: true });
      return { result: publicReceipt(itemId, uncertain) };
    }
    const itemSnapshot = await tx.get(itemRef);
    const auditSnapshot = await tx.get(itemRef.collection("WorkOrderAddHistory").doc(operationId));
    const item = itemSnapshot.exists ? itemSnapshot.data() : null;
    // A resumed existing Slack row uses its original saved payload, so a later
    // inventory edit cannot silently alter this already-started movement.
    if (!receipt.row) validateSavedItem(item, auditSnapshot.exists ? auditSnapshot.data() : null, operation, itemId);
    tx.set(receiptRef, {
      schemaVersion: 1, status: "sending", claim, leaseUntil: now() + LEASE_MS,
      // Only a newly opted-in send participates in thread linking. Existing
      // receipts, including historical retries, never back-post old list rows.
      ...(!receiptSnapshot.exists ? { threadLinkRequested: true } : {}),
      listKey, operationId, itemId, requestedBy: authUser.uid,
      attempts: Number(receipt.attempts || 0) + 1,
      updatedAt: new Date(now()), message: "",
    }, { merge: true });
    return { item, operation, listKey, receipt };
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
  try {
    let payload = acquired.receipt.payload;
    if (!payload) {
      const photoUrls = await loadPhotos(bucket, itemId, acquired.item);
      payload = buildSlackPayload({ ...acquired, itemId, email: authUser.email, photoUrls });
      await checkpoint({ payload });
    }
    response = await sendItem(payload, {
      authUser,
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
    if (!response?.ok) throw new Error(clean(response?.error, 100) || "Slack send failed.");
    if (!row?.rowId || !row?.listId) throw new Error("Slack row checkpoint is missing.");
    const done = { status: "sent", listKey: acquired.listKey,
      warnings: Array.isArray(response.warnings) ? response.warnings : [],
      message: "Sent to Slack.", leaseUntil: 0, completedAt: new Date(now()), row };
    await checkpoint(done);
    return publicReceipt(itemId, done);
  } catch (error) {
    const uncertain = createStarted && !row;
    const failed = {
      status: uncertain ? "uncertain" : "failed", listKey: acquired.listKey,
      leaseUntil: 0,
      message: uncertain
        ? "Slack may have created this row. Check Slack before another send; automatic retry is blocked to avoid duplicates."
        : "Slack could not finish this item. Retry will resume its saved row without saving inventory again.",
      errorCode: clean(error?.code || response?.error || "slack_send_failed", 100),
    };
    // If receipt storage itself failed, leave the lease/checkpoint in place;
    // its durable createStarted marker prevents an unsafe blind recreation.
    const durable = await checkpoint(failed);
    return publicReceipt(itemId, durable);
  }
}

async function sendConfirmedItemToSlack(options) {
  const result = await sendConfirmedItemToSlackList(options);
  if (result.status !== "sent") return result;
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
