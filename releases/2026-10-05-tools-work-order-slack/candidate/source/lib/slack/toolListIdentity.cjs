"use strict";

const { createHash, randomUUID } = require("node:crypto");
const { normalizeToolId } = require("../inventory/toolIdentity.cjs");
const { getCurrentWorkOrder } = require("../items/itemHistory.cjs");

const COLLECTION = "ToolSlackDeliveries";
const LEASE_MS = 5 * 60 * 1000;
const clean = (value) => String(value ?? "").trim();
class ToolSlackIdentityError extends Error {
  constructor(code, message, statusCode = 409) {
    super(message); this.name = "ToolSlackIdentityError";
    this.code = code; this.statusCode = statusCode;
  }
}
function fail(code, message, statusCode) { throw new ToolSlackIdentityError(code, message, statusCode); }

function toolIdFromRequest(body = {}) {
  // Compatibility with the old tool button is deliberately limited to its
  // exact terminal ID annotation; arbitrary title mentions are not identities.
  const terminal = clean(body.title).match(/\((AIS[_-]T\d+)\)\s*$/i)?.[1];
  const supplied = [body.toolId, body.local_sn, body.localSN].filter((value) => clean(value));
  const values = supplied.length ? supplied : [terminal];
  const ids = values.map((value) => normalizeToolId(value));
  if (!ids[0] || ids.some((id) => !id || id !== ids[0]) ||
      (terminal && normalizeToolId(terminal) !== ids[0])) {
    fail("tool_identity_required", "A valid, matching tool ID is required before sending to Slack.", 400);
  }
  return ids[0];
}

function textValue(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textValue).join("");
  if (value && typeof value === "object") {
    if (typeof value.text === "string") return value.text;
    return textValue(value.elements || []);
  }
  return "";
}
function fieldText(field) {
  if (typeof field?.text === "string") return field.text;
  if (Array.isArray(field?.rich_text)) return textValue(field.rich_text);
  const value = field?.value;
  if (typeof value !== "string") return "";
  try { return textValue(JSON.parse(value)) || value; } catch { return value; }
}
function rowMatchesTool(row, toolId, { titleColumnId = "", identityColumnId = "" } = {}) {
  // Match a whole namespace-qualified identifier, not a bare serial, name,
  // substring, or URL fragment. Normalize the tool namespace's five-digit ID.
  return (Array.isArray(row?.fields) ? row.fields : []).some((field) => {
    const text = fieldText(field);
    const key = clean(field.key).toLowerCase();
    const identity = identityColumnId && field.column_id === identityColumnId ||
      ["tool_id", "toolid", "local_sn", "localsn"].includes(key);
    if (identity && normalizeToolId(text) === toolId) return true;
    const title = titleColumnId ? field.column_id === titleColumnId : ["name", "title", "tool_name"].includes(key);
    if (!title) return false;
    return normalizeToolId(text) === toolId ||
      normalizeToolId(clean(text).match(/\((AIS[_-]T\d+)\)\s*$/i)?.[1]) === toolId;
  });
}

async function findExistingToolRow({ slackApi, listId, toolId, titleColumnId = "", identityColumnId = "", maxPages = 200 }) {
  // Slack lists have no server-side exact-ID filter and create has no
  // idempotency key. Exhaust both sets before permitting a new row.
  // https://docs.slack.dev/reference/methods/slackLists.items.list/
  for (const archived of [false, true]) {
    let cursor = "";
    const seen = new Set();
    for (let page = 0; page < maxPages; page += 1) {
      let result;
      try {
        result = await slackApi("slackLists.items.list", {
          list_id: listId, limit: 100, archived, include_list: true, ...(cursor ? { cursor } : {}),
        });
      } catch {
        fail("tool_slack_lookup_failed", "Magmo could not check whether this tool is already on Slack. Nothing new was added; please retry.", 503);
      }
      if (!result?.ok || !Array.isArray(result.items)) {
        fail("tool_slack_lookup_failed", "Magmo could not check whether this tool is already on Slack. Nothing new was added; please retry.", 503);
      }
      const schema = result.list?.list_metadata?.schema || [];
      if (!Array.isArray(schema) || schema.some((column) => !column || typeof column !== "object")) {
        fail("tool_slack_lookup_incomplete", "Slack returned an unreadable tools list schema. Nothing new was added.", 503);
      }
      const primary = schema.find((column) => column.is_primary_column);
      // A configured column can go stale after someone edits/recreates a list.
      // Slack's current schema wins; an unverified configured ID is not proof
      // that no existing tool matches.
      if (primary) {
        if (typeof primary.id !== "string" || !primary.id) fail("tool_slack_lookup_incomplete", "Slack returned an unreadable tools title column. Nothing new was added.", 503);
        titleColumnId = primary.id;
      } else if (schema.length && (!titleColumnId || !schema.some((column) => column.id === titleColumnId))) {
        fail("tool_slack_lookup_incomplete", "Magmo could not verify the Slack tools title column. Nothing new was added.", 503);
      }
      identityColumnId ||= schema.find((column) => /^(tool id|local sn)$/i.test(clean(column.name)))?.id || "";
      for (const item of result.items) {
        if (!item || typeof item.id !== "string" || !item.id.trim() || !Array.isArray(item.fields)) {
          fail("tool_slack_lookup_incomplete", "Slack returned an incomplete tools list row. Nothing new was added.", 503);
        }
        if (!primary) {
          const named = item.fields.find((field) => field && ["name", "title", "tool_name"].includes(clean(field.key).toLowerCase()) && field.column_id);
          if (named) titleColumnId = named.column_id;
        }
        const identifiable = item.fields.some((field) => field &&
          ((titleColumnId && field.column_id === titleColumnId) ||
            (identityColumnId && field.column_id === identityColumnId) ||
            ["name", "title", "tool_name", "tool_id", "toolid", "local_sn", "localsn"].includes(clean(field.key).toLowerCase())));
        if (!identifiable && item.fields.some((field) => clean(fieldText(field)))) {
          fail("tool_slack_lookup_incomplete", "Magmo could not check a Slack tool row's ID. Nothing new was added.", 503);
        }
      }
      const match = result.items.find((item) => rowMatchesTool(item, toolId, { titleColumnId, identityColumnId }));
      if (match) return { listId, rowId: match.id, archived };
      if (result.response_metadata != null && (typeof result.response_metadata !== "object" || Array.isArray(result.response_metadata))) {
        fail("tool_slack_lookup_incomplete", "Slack returned unreadable tools list pagination. Nothing new was added.", 503);
      }
      const cursorValue = result.response_metadata?.next_cursor;
      if (cursorValue != null && typeof cursorValue !== "string") {
        fail("tool_slack_lookup_incomplete", "Slack returned unreadable tools list pagination. Nothing new was added.", 503);
      }
      const next = clean(cursorValue);
      if (result.has_more === true && !next) {
        fail("tool_slack_lookup_incomplete", "Slack did not provide the rest of the tools list. Nothing new was added.", 503);
      }
      if (!next) break;
      if (seen.has(next) || page === maxPages - 1) {
        fail("tool_slack_lookup_incomplete", "Magmo could not finish checking the Slack tools list. Nothing new was added.", 503);
      }
      seen.add(next); cursor = next;
    }
  }
  return null;
}

function definitiveRejection(code) {
  return /^(invalid_|missing_|not_authed$|account_inactive$|token_revoked$|token_expired$|not_allowed|access_denied$|permission_denied$|list_not_found$|not_in_list$|ratelimited$|rate_limited$|restricted_action)/.test(clean(code));
}
function existingResult(toolId, row) {
  return { ok: true, alreadyExists: true, status: "already_exists", toolId,
    list_id: row.listId, item_id: row.rowId, archived: row.archived === true, warnings: [],
    message: `Tool ${toolId} is already on Slack${row.archived ? " (archived)" : ""}; no duplicate was added.` };
}

async function sendToolToSlackOnce({ db, authUser, body, listId, titleColumnId, identityColumnId, slackApi, sendItem,
  internal = {}, now = () => Date.now() }) {
  if (!authUser?.uid) fail("auth_required", "Authentication is required.", 401);
  if (!db?.runTransaction) fail("database_unavailable", "The database is unavailable. Nothing was sent to Slack.", 503);
  const toolId = toolIdFromRequest(body);
  if (!listId) fail("missing_SLACK_LIST_TOOLS_ID", "The Slack tools list is not configured.", 503);
  const digest = createHash("sha256").update(JSON.stringify([listId, toolId])).digest("hex");
  const receiptRef = db.collection(COLLECTION).doc(digest);
  const toolRef = db.collection("Tool").doc(toolId);
  const claim = randomUUID();
  const acquired = await db.runTransaction(async (tx) => {
    const toolSnapshot = await tx.get(toolRef);
    const priorSnapshot = await tx.get(receiptRef);
    const tool = toolSnapshot.exists ? toolSnapshot.data() : null;
    if (!tool || tool.deleted || tool.deletedAt || tool.archived || tool.isDeleted) {
      fail("tool_not_found", "Save an active tool in Magmo before sending it to Slack.", 404);
    }
    const prior = priorSnapshot.data() || {};
    if (prior.status === "sending" && prior.leaseUntil > now()) {
      fail("tool_slack_send_in_progress", `Tool ${toolId} is already being checked or sent to Slack. Please wait, then check again.`);
    }
    tx.set(receiptRef, { toolId, listId, claim, status: "sending", requestedBy: authUser.uid,
      leaseUntil: now() + LEASE_MS, updatedAt: new Date(now()),
      attempts: Number(prior.attempts || 0) + 1 }, { merge: true });
    return { tool, prior };
  });
  const checkpoint = async (patch) => db.runTransaction(async (tx) => {
    const snapshot = await tx.get(receiptRef);
    if (snapshot.data()?.claim !== claim) fail("tool_slack_claim_lost", "Another request owns this tool's Slack send. No new row will be created.");
    tx.set(receiptRef, { ...patch, updatedAt: new Date(now()) }, { merge: true });
  });
  let row = acquired.prior.row || null;
  let createStarted = acquired.prior.createStarted === true;
  let deliveryPending = acquired.prior.deliveryPending === true;
  try {
    const existing = await findExistingToolRow({ slackApi, listId, toolId, titleColumnId, identityColumnId });
    const resumePending = existing && !existing.archived &&
      (deliveryPending || createStarted) &&
      acquired.prior.payload && (!row || row.rowId === existing.rowId);
    if (existing && !resumePending) {
      await checkpoint({ status: "existing", row: existing, createStarted: false, deliveryPending: false, leaseUntil: 0 });
      // This checkpoint hook lets the confirmed-work-order caller refer to the
      // existing row without creating one or re-saving inventory.
      await internal.onRowCreated?.(existing);
      return existingResult(toolId, existing);
    }
    if (!existing && (row || createStarted || internal.resumeRow)) {
      fail("tool_slack_creation_uncertain", "A previous Slack send may already exist, but its row could not be verified. No duplicate will be created; an administrator must review it.");
    }
    if (resumePending) row = existing;
    const tool = acquired.tool;
    const confirmedPayload = internal.confirmedToolPayload;
    if (!resumePending && confirmedPayload) {
      const latest = (Array.isArray(tool.selectionHistory) ? tool.selectionHistory : [])
        .filter((entry) => entry?.action === "work_order_add" && entry?.operationId).at(-1);
      if (confirmedPayload.listKey !== "tools" || normalizeToolId(confirmedPayload.toolId) !== toolId ||
          normalizeToolId(confirmedPayload.local_sn) !== toolId || !clean(internal.confirmedToolOperationId) ||
          latest?.operationId !== internal.confirmedToolOperationId ||
          clean(confirmedPayload.work_order) !== clean(getCurrentWorkOrder(tool).workOrder)) {
        fail("tool_moved_since_confirmation", "This tool moved or its work order changed after confirmation. Review it before sending to Slack.");
      }
    }
    // Confirmed bulk sends use their immutable server-produced receipt payload.
    // HTTP body fields never enable this path. Existing-row retries always use
    // the original global checkpoint, not newer edits to a tool or work order.
    const payload = resumePending ? acquired.prior.payload : confirmedPayload || {
      listKey: "tools", toolId, local_sn: toolId,
      title: `${clean(tool.name) || toolId} (${toolId})`,
      description: clean(tool.description),
      work_order: clean(getCurrentWorkOrder(tool).workOrder),
      photoUrls: Array.isArray(tool.photoUrls) ? tool.photoUrls.filter((value) => typeof value === "string") : [],
    };
    await checkpoint({ payload, deliveryPending: true }); deliveryPending = true;
    const result = await sendItem(payload, {
      ...internal, authUser, resumeRow: row,
      beforeCreate: async () => {
        await checkpoint({ createStarted: true }); createStarted = true;
        await internal.beforeCreate?.();
      },
      onCreateRejected: async (code) => {
        if (definitiveRejection(code)) {
          await checkpoint({ createStarted: false }); createStarted = false;
        }
        await internal.onCreateRejected?.(code);
      },
      onRowCreated: async (createdRow) => {
        row = { listId: createdRow.listId, rowId: createdRow.rowId, archived: false };
        await checkpoint({ row, createStarted: false }); createStarted = false;
        await internal.onRowCreated?.(row);
      },
    });
    // A resumed row still needs its outer receipt checkpoint after an earlier
    // interrupted response, but must never invoke the create hook again.
    if (resumePending) await internal.onRowCreated?.(row);
    if (!result?.ok) {
      await checkpoint({ status: row ? "incomplete" : createStarted ? "uncertain" : "failed", leaseUntil: 0 });
      return result || { ok: false, error: "tool_slack_send_failed", message: "The tool could not be sent to Slack." };
    }
    if (!row?.rowId) fail("tool_slack_row_missing", "The Slack row could not be confirmed. Check Slack before trying again.");
    await checkpoint({ status: "sent", row, createStarted: false, deliveryPending: false, leaseUntil: 0, completedAt: new Date(now()) });
    return { ...result, toolId, alreadyExists: false };
  } catch (error) {
    // A persisted create intent survives process/network failures. Never clear
    // it merely because Slack's response could not be observed.
    const status = deliveryPending ? row ? "incomplete" : createStarted ? "uncertain" : "failed" :
      ["sent", "existing"].includes(acquired.prior.status) ? acquired.prior.status : "failed";
    try { await checkpoint({ status, leaseUntil: 0 }); } catch {}
    throw error;
  }
}

module.exports = { COLLECTION, LEASE_MS, ToolSlackIdentityError, toolIdFromRequest,
  rowMatchesTool, findExistingToolRow, sendToolToSlackOnce };
