"use strict";

const { createHash, randomUUID } = require("node:crypto");
const contract = require("./workOrderAddContract.cjs");
const { DEFAULT_DISPATCH_CHANNEL_ID, normalizedSlackTimestamp, parseRootSlackPermalink,
  buildDispatchReceipt } = require("../ops/dispatchReceipt.cjs");

const THREAD_LEASE_MS = 2 * 60 * 1000;
const OPERATION_COLLECTION = "InventoryWorkOrderAddOperations";
const clean = (value, length = 500) => String(value ?? "").trim().slice(0, length);
const present = (value) => value !== undefined && value !== null && value !== "";
const waitDefault = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
function fail(code, message, statusCode = 409) {
  const error = new Error(message); Object.assign(error, { code, statusCode }); throw error;
}
function strictId(value, pattern, code) {
  if (typeof value !== "string" || !pattern.test(value)) fail(code, "The saved Slack movement identity is invalid.");
  return value;
}
function validateRequest(operation, receipt, authUser, operationId, itemId) {
  if (operation?.createdBy?.uid !== authUser.uid) fail("operation_owner_required", "Only the user who confirmed this list can send it to Slack.", 403);
  const result = operation.result;
  if (operation.type !== "work_order_add_movement" || result?.ok !== true || result.operationId !== operationId ||
      !result.completedAt || !Array.isArray(result.items) || result.items.length !== result.itemCount ||
      !result.items.some((item) => item.id === itemId) || operation.movementMode !== result.movementMode) {
    fail("confirmed_item_required", "The item is not in a successfully saved work-order list.");
  }
  const mode = contract.normalizeMovementMode(operation.movementMode);
  const listKey = mode === "from_work_order" ? "receiving" : "shipping";
  if (receipt?.status !== "sent" || receipt.operationId !== operationId || receipt.itemId !== itemId ||
      receipt.requestedBy !== authUser.uid || receipt.listKey !== listKey) {
    fail("slack_list_receipt_required", "The saved Slack list row must finish before its work-order link is sent.");
  }
  return listKey;
}

function selectedWorkOrder(operation) {
  const workOrder = operation.result.workOrder || {};
  const id = strictId(operation.workOrderId, /^[A-Za-z0-9][A-Za-z0-9_-]{0,179}$/, "work_order_identity_missing");
  const number = clean(workOrder.number, 80);
  if (workOrder.id !== id || !/^\d{3,12}$/.test(number) || (present(workOrder.workOrderId) && workOrder.workOrderId !== id)) {
    fail("work_order_identity_mismatch", "The confirmed work-order identity is inconsistent.");
  }
  return { id, number };
}

function canonicalThread(workOrder, selected, env = process.env) {
  if (!workOrder || workOrder.deleted || workOrder.isDeleted || workOrder.deletedAt ||
      clean(workOrder.status).toLowerCase() === "deleted") {
    fail("work_order_unavailable", "The work order is no longer available for Slack linking.");
  }
  for (const value of [workOrder.number, workOrder.blueFolder?.serviceRequestId, workOrder.bluefolderServiceRequestId]) {
    if (present(value) && clean(value) !== selected.number) fail("work_order_identity_mismatch", "The work-order number changed; review its Slack link before retrying.");
  }
  if (present(workOrder.workOrderId) && clean(workOrder.workOrderId) !== selected.id) fail("work_order_identity_mismatch", "The work-order identity conflicts with its saved record.");
  if (workOrder.slackEvidenceEligible === false || workOrder.dispatchConversationReview?.status === "manual_review_required") {
    fail("work_order_thread_review_required", "The work-order Slack thread needs review. Its list item was saved, but no chat link was posted.");
  }
  const expectedChannel = clean(env.OPS_DISPATCH_CHANNEL_ID || env.OPS_CONVERSATION_CHANNEL_ID || DEFAULT_DISPATCH_CHANNEL_ID, 80);
  const testing = new Set(["C07F6V10PRS", ...[env.OPS_TESTING_CHANNEL_ID, env.SLACK_TESTING_CHANNEL_ID].flatMap((value) => clean(value).split(",").map((part) => part.trim()))]);
  const channel = clean(workOrder.slackChannel, 80), threadTs = clean(workOrder.slackThreadTs, 80);
  if (!/^C[A-Z0-9]+$/.test(expectedChannel) || testing.has(expectedChannel) || channel !== expectedChannel ||
      !/^\d{8,}\.\d{6}$/.test(threadTs)) {
    fail("work_order_thread_missing", "The work order has no verified Dispatch thread. Its list item was saved; link the thread, then retry.");
  }
  const matchCoordinates = (value) => {
    if (value.channel !== channel || normalizedSlackTimestamp(value.threadTs) !== normalizedSlackTimestamp(threadTs)) {
      fail("work_order_thread_conflict", "The saved work-order Slack coordinates disagree. No chat link was posted.");
    }
  };
  if (present(workOrder.slackPermalink)) matchCoordinates(parseRootSlackPermalink(workOrder.slackPermalink));
  if (present(workOrder.dispatchReceipt)) {
    const receipt = workOrder.dispatchReceipt;
    if (receipt.workOrderId !== selected.number || receipt.dispatchStatus !== "posted") fail("work_order_thread_conflict", "The work-order Dispatch receipt does not match this work order.");
    const checked = buildDispatchReceipt({ ...receipt, expectedChannelId: expectedChannel });
    matchCoordinates({ channel: checked.slackChannel, threadTs: checked.slackThreadTs });
  }
  const reviewed = workOrder.dispatchConversationReview?.canonicalCoordinates;
  if (reviewed) {
    matchCoordinates({ channel: reviewed.channel, threadTs: reviewed.threadTs });
    if (present(reviewed.permalink)) matchCoordinates(parseRootSlackPermalink(reviewed.permalink));
  }
  return { workOrderId: selected.id, workOrderNumber: selected.number, channel, threadTs };
}

async function resolveThread(tx, db, operation, env) {
  const selected = selectedWorkOrder(operation);
  const snapshot = await tx.get(db.collection("OpsWorkOrders").doc(selected.id));
  const target = canonicalThread(snapshot.exists ? snapshot.data() : null, selected, env);
  // A primary thread must not also be claimed by another order, including an
  // older receipt or a separately approved supplemental link. Never choose a
  // supplemental thread or search by a human-written title.
  for (const field of ["slackThreadTs", "dispatchReceipt.slackThreadTs"]) {
    const matches = await tx.get(db.collection("OpsWorkOrders").where(field, "==", target.threadTs));
    for (const doc of matches.docs) {
      const data = doc.data();
      const channel = field === "slackThreadTs" ? data.slackChannel : data.dispatchReceipt?.slackChannel;
      if (channel === target.channel && doc.id !== selected.id) fail("work_order_thread_conflict", "Another work order also claims this Slack thread. No chat link was posted.");
    }
  }
  const linkId = createHash("sha256").update(`${target.channel}:${target.threadTs}`).digest("hex");
  const link = await tx.get(db.collection("OpsSlackThreadLinks").doc(linkId));
  if (link.exists && link.data()?.active === true && link.data()?.workOrderId !== selected.id) {
    fail("work_order_thread_conflict", "Another work order owns this Slack thread link. No chat link was posted.");
  }
  return target;
}

function verifyRoot(root, target) {
  if (!root || root.ts !== target.threadTs || (root.thread_ts && root.thread_ts !== root.ts) || root.subtype === "message_deleted") {
    fail("work_order_root_missing", "The exact work-order parent message is unavailable. No chat link was posted.");
  }
  const firstLine = String(root.text || "").replace(/^\uFEFF/, "").split(/\r?\n/, 1)[0].trim();
  const firstLineNumber = firstLine.match(/^\*?#(\d+)(?=$|[\s*])/u)?.[1] || null;
  const blueFolderNumbers = [];
  for (const raw of firstLine.match(/https?:\/\/[^\s<>|]+/g) || []) {
    try {
      const url = new URL(raw.replace(/&amp;/g, "&"));
      if (url.hostname === "bluefolder.com" || url.hostname.endsWith(".bluefolder.com")) {
        const srid = url.searchParams.get("srid");
        if (srid) blueFolderNumbers.push(srid);
      }
    } catch { /* Not a valid BlueFolder work-order link. */ }
  }
  if ((firstLineNumber !== null && firstLineNumber !== target.workOrderNumber) ||
      blueFolderNumbers.some((number) => number !== target.workOrderNumber) ||
      !(firstLineNumber === target.workOrderNumber || blueFolderNumbers.includes(target.workOrderNumber))) {
    fail("work_order_root_identity_mismatch", "The recorded Slack thread does not identify this exact work order. No chat link was posted.");
  }
}

function buildThreadMessage({ target, row, payload, operationId, itemId, listKey }) {
  strictId(row?.listId, /^F[A-Z0-9]{1,40}$/, "slack_list_identity_invalid");
  strictId(row?.rowId, /^Rec[A-Za-z0-9]{1,60}$/, "slack_row_identity_invalid");
  if (payload?.local_sn !== itemId || clean(payload?.work_order) !== target.workOrderNumber || payload?.listKey !== listKey) {
    fail("slack_payload_identity_mismatch", "The saved list row does not match this item and work order.");
  }
  const title = clean(payload.title, 300) || itemId;
  const prefix = listKey === "receiving" ? "Receiving: " : "Shipping: ";
  const digest = createHash("sha256").update(JSON.stringify([operationId, itemId, row.listId, row.rowId])).digest("hex");
  const clientMsgId = `${digest.slice(0, 8)}-${digest.slice(8, 12)}-4${digest.slice(13, 16)}-8${digest.slice(17, 20)}-${digest.slice(20, 32)}`;
  // Official native list-record links avoid guessing undocumented URL query
  // parameters: https://docs.slack.dev/reference/block-kit/block-elements/list-record-element/
  // chat.postMessage thread_ts/reply_broadcast/unfurl flags are documented at
  // https://docs.slack.dev/reference/methods/chat.postMessage/ .
  return {
    channel: target.channel, thread_ts: target.threadTs, reply_broadcast: false,
    text: `${prefix}${title}`, mrkdwn: false, parse: "none", link_names: false,
    unfurl_links: false, unfurl_media: false, unfurl_app_links: false, client_msg_id: clientMsgId,
    blocks: [{ type: "rich_text", elements: [{ type: "rich_text_section", elements: [
      { type: "text", text: prefix },
      { type: "list_record", file_id: row.listId, record_id: row.rowId, text: title },
    ] }] }],
  };
}

const DEFINITIVE_REJECTIONS = new Set([
  "not_authed", "invalid_auth", "account_inactive", "token_revoked", "token_expired", "missing_scope",
  "not_allowed_token_type", "no_permission", "access_denied", "channel_not_found", "not_in_channel",
  "is_archived", "thread_not_found", "cannot_reply_to_message", "message_not_found", "ratelimited", "rate_limited",
  "invalid_arguments", "invalid_arg_name", "invalid_blocks", "invalid_blocks_format", "invalid_metadata_format",
  "restricted_action", "restricted_action_read_only_channel", "ekm_access_denied", "app_access_restricted",
  "msg_too_long", "no_text", "invalid_thread_ts",
]);
function publicThread(value, extra = {}) {
  return { status: value.status, threadStatus: value.status, message: value.message || "",
    warnings: value.status === "sent" ? [] : [value.message || "The list item is saved, but its work-order chat link is not complete."], ...extra };
}

async function sendConfirmedItemThreadLink({ db, receiptRef, operationId, itemId, authUser,
  now = () => Date.now(), fetchImpl = globalThis.fetch, env = process.env, wait = waitDefault }) {
  if (!authUser?.uid) fail("auth_required", "Authentication is required.", 401);
  if (!db?.runTransaction) fail("database_unavailable", "The database is unavailable.", 503);
  operationId = contract.normalizeOperationId(operationId);
  strictId(itemId, /^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$/, "invalid_item_id");
  const operationRef = db.collection(OPERATION_COLLECTION).doc(operationId);
  const expectedReceipt = operationRef.collection("SlackItems").doc(itemId);
  if (receiptRef && receiptRef.path !== expectedReceipt.path) fail("slack_receipt_mismatch", "The Slack receipt path is invalid.");
  receiptRef = expectedReceipt;
  const claim = randomUUID();
  const acquired = await db.runTransaction(async (tx) => {
    const operationSnapshot = await tx.get(operationRef);
    const receiptSnapshot = await tx.get(receiptRef);
    const operation = operationSnapshot.exists ? operationSnapshot.data() : null;
    const receipt = receiptSnapshot.exists ? receiptSnapshot.data() : null;
    const listKey = validateRequest(operation, receipt, authUser, operationId, itemId);
    if (receipt.threadLinkRequested !== true) return { result: publicThread({ status: "sent", message: "Sent to Slack." }, { threadStatus: "not_requested", skipped: true, alreadySent: true }) };
    const current = receipt.threadLink || {};
    if (current.status === "sent") return { result: publicThread(current, { alreadySent: true }) };
    if (current.status === "uncertain") return { result: publicThread(current) };
    if (current.status === "sending" && current.leaseUntil > now()) return { result: publicThread(current) };
    if (current.postStarted) {
      const uncertain = { ...current, status: "uncertain", leaseUntil: 0,
        message: "The list item is saved. Slack may already have its chat link; automatic reposting is blocked to avoid duplicates." };
      tx.set(receiptRef, { threadLink: uncertain }, { merge: true });
      return { result: publicThread(uncertain) };
    }
    const threadLink = { ...current, status: "sending", claim, leaseUntil: now() + THREAD_LEASE_MS,
      updatedAt: new Date(now()), attempts: Number(current.attempts || 0) + 1,
      message: "The list item is saved; its work-order chat link is being sent.", errorCode: "" };
    tx.set(receiptRef, { threadLink }, { merge: true });
    return { operation, receipt, listKey };
  });
  if (acquired.result) return acquired.result;
  const checkpoint = async (patch, verify = false) => db.runTransaction(async (tx) => {
    const snapshot = await tx.get(receiptRef);
    const receipt = snapshot.data();
    const current = receipt?.threadLink || {};
    if (current.status === "sent") return current;
    if (current.claim !== claim || receipt.status !== "sent" || receipt.threadLinkRequested !== true) fail("slack_thread_claim_lost", "Another send owns this thread link.");
    if (verify) {
      const latestOperation = (await tx.get(operationRef)).data();
      validateRequest(latestOperation, receipt, authUser, operationId, itemId);
      if (JSON.stringify(receipt.row) !== JSON.stringify(acquired.receipt.row) || JSON.stringify(receipt.payload) !== JSON.stringify(acquired.receipt.payload)) {
        fail("slack_list_receipt_changed", "The saved Slack row changed during this send; no chat link was posted.");
      }
      const target = await resolveThread(tx, db, latestOperation, env);
      if (JSON.stringify(target) !== JSON.stringify(patch.target)) fail("work_order_thread_changed", "The work-order thread changed during this send. Retry after reviewing its link.");
    }
    const next = { ...current, ...patch, updatedAt: new Date(now()) };
    tx.set(receiptRef, { threadLink: next }, { merge: true });
    return next;
  });
  let accepted = null;
  const token = clean(env.SLACK_BOT_TOKEN, 2000).replace(/\s+#.*$/, "").trim();
  async function api(method, body) {
    const readOnly = method === "conversations.replies";
    const response = await fetchImpl(`https://slack.com/api/${method}${readOnly ? `?${new URLSearchParams(body)}` : ""}`, {
      method: readOnly ? "GET" : "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json; charset=utf-8" },
      ...(!readOnly ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(20000),
    });
    if (response.status === 429) {
      const retryAfter = Number(response.headers?.get?.("retry-after"));
      return { ok: false, error: "ratelimited", retryAfterSeconds: Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(Math.ceil(retryAfter), 86400) : 1 };
    }
    if (!response.ok) fail("slack_transport_error", "Slack did not return a successful HTTP response.", 502);
    const data = await response.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) fail("slack_response_invalid", "Slack returned an invalid response.", 502);
    return data;
  }
  try {
    if (!token || token === "xoxb-your-bot-token") fail("slack_not_configured", "The Slack bot is not configured. The list item remains saved.", 503);
    const target = await db.runTransaction((tx) => resolveThread(tx, db, acquired.operation, env));
    const message = buildThreadMessage({ target, row: acquired.receipt.row, payload: acquired.receipt.payload,
      operationId, itemId, listKey: acquired.listKey });
    const rootResponse = await api("conversations.replies", { channel: target.channel, ts: target.threadTs, limit: 1 });
    if (rootResponse.ok !== true) fail(clean(rootResponse.error) || "slack_root_read_failed", `The exact work-order Slack thread could not be verified. The list item is saved; retry its chat link.${rootResponse.retryAfterSeconds ? ` Wait at least ${rootResponse.retryAfterSeconds} seconds before retrying.` : ""}`);
    verifyRoot(rootResponse.messages?.find((message) => message.ts === target.threadTs), target);
    // Sequential bulk sends stay below Slack's roughly one-message/second per
    // channel limit. Concurrent batches still safely surface a 429 for retry.
    await wait(1050);
    const postClaim = await checkpoint({ postStarted: true, target, clientMsgId: message.client_msg_id }, true);
    // The worker may have paused before this checkpoint while another worker
    // claimed an expired lease and completed. A completed marker is a return,
    // never permission for this stale worker to send a second message.
    if (postClaim.status === "sent") return publicThread(postClaim, { alreadySent: true });
    const posted = await api("chat.postMessage", message);
    if (posted.ok !== true) {
      if (DEFINITIVE_REJECTIONS.has(posted.error)) await checkpoint({ postStarted: false });
      fail(clean(posted.error) || "slack_post_failed", `Slack could not finish the work-order chat link.${posted.retryAfterSeconds ? ` Wait at least ${posted.retryAfterSeconds} seconds before retrying.` : ""}`);
    }
    if (posted.channel !== target.channel || !/^\d{8,}\.\d{6}$/.test(posted.ts || "") || posted.ts === target.threadTs ||
        posted.message?.thread_ts !== target.threadTs || (present(posted.message?.ts) && posted.message.ts !== posted.ts)) {
      fail("slack_post_identity_mismatch", "Slack did not confirm the expected thread reply.");
    }
    accepted = { channel: posted.channel, threadTs: target.threadTs, messageTs: posted.ts };
    const sent = await checkpoint({ status: "sent", postStarted: false, leaseUntil: 0, ...accepted,
      completedAt: new Date(now()), message: "Sent to the Slack list and linked in the work-order chat.", errorCode: "" });
    return publicThread(sent);
  } catch (error) {
    const durable = await db.runTransaction(async (tx) => {
      const snapshot = await tx.get(receiptRef);
      const current = snapshot.data()?.threadLink || {};
      if (current.status === "sent") return current;
      if (current.claim !== claim) return current;
      const uncertain = current.postStarted === true;
      const next = { ...current, status: uncertain ? "uncertain" : "failed", leaseUntil: 0,
        ...(accepted || {}), updatedAt: new Date(now()), errorCode: clean(error.code || "slack_thread_failed", 100),
        message: uncertain
          ? "The list item is saved. Slack may already have its chat link; automatic reposting is blocked to avoid duplicates."
          : `The list item is saved, but its work-order chat link was not posted. ${clean(error.message, 350)}` };
      tx.set(receiptRef, { threadLink: next }, { merge: true });
      return next;
    });
    return publicThread(durable);
  }
}

module.exports = { THREAD_LEASE_MS, buildThreadMessage, canonicalThread, resolveThread, verifyRoot,
  sendConfirmedItemThreadLink };
