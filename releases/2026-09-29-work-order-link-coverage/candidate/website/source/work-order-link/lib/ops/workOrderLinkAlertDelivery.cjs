"use strict";

const { randomUUID, createHash } = require("node:crypto");
const { linkRuntimeEnabled } = require("./workOrderLinkRuntime.cjs");
const CONFIG_PATH = "OpsWorkOrderLinkConfiguration/owner";
const OUTBOX = "OpsWorkOrderLinkAlertOutbox";
const INCIDENTS = "OpsWorkOrderLinkIncidents";
const clean = (value, max = 300) => typeof value === "string" ? value.trim().slice(0, max) : "";
const email = value => clean(value).toLowerCase();
const TERMINAL = new Set(["sent", "resolved", "superseded", "uncertain"]);
const REJECTED = new Set(["ratelimited", "rate_limited", "invalid_auth", "not_authed", "account_inactive",
  "token_revoked", "missing_scope", "channel_not_found", "user_not_found", "no_permission",
  "restricted_action", "not_allowed_token_type", "invalid_arguments", "msg_too_long", "no_text"]);

function configuredOwner(config) {
  return Boolean(config?.enabled === true && clean(config.uid, 128) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email(config.email)) &&
    /^U[A-Z0-9]+$/.test(config.slackUserId || "") && /^T[A-Z0-9]+$/.test(config.slackTeamId || ""));
}
function ownsInbox(config, user) {
  return Boolean(config?.enabled === true && user && user.uid === config.uid && user.emailVerified === true &&
    !user.disabled && user.customClaims?.magmoAccessRevoked !== true && email(user.email) === email(config.email));
}
function ownerFingerprint(config) {
  return createHash("sha256").update(JSON.stringify([config.uid, email(config.email), config.slackUserId, config.slackTeamId, config.enabled])).digest("hex");
}
function publicAlert(id, data = {}) {
  return { id, workOrderId: clean(data.workOrderId, 180), workOrderNumber: clean(String(data.number || data.workOrderId || ""), 80),
    subject: clean(data.subject, 300), reason: clean(data.issue, 180),
    createdAtIso: clean(data.createdAtIso, 40), resolvedAtIso: clean(data.resolvedAtIso, 40),
    deliveryStatus: clean(data.deliveryStatus, 80), readAtIso: clean(data.readAtIso, 40) };
}
function messageForAlert(id, data) {
  const value = publicAlert(id, data);
  return `Magmo work-order linking issue\nWO #${value.workOrderNumber}${value.subject ? ` — ${value.subject}` : ""}\n` +
    `The BlueFolder site/machine connection could not be verified. Reason: ${value.reason || "link_verification_required"}.\n` +
    "The existing record and inventory history have been preserved. Review this work order in Magmo: https://magmo.cloud/Ops\n" +
    `Alert reference: ${id}`;
}

// No dispatch-channel fallback, no group DM, no channel join. The single owner
// must be configured explicitly and verified against both Firebase and Slack.
// A lost POST acknowledgement is held for review rather than blindly reposted.
async function deliverWorkOrderLinkAlerts({ db, auth, env = process.env, now = Date.now,
  fetchImpl = globalThis.fetch, limit = 2, ids = [], maxDurationMs = 25000 } = {}) {
  if (!linkRuntimeEnabled(env, db?.projectId)) return { configured: false, disabled: true, sent: 0, pending: 0 };
  const started = now();
  const configRef = db.doc(CONFIG_PATH);
  const config = (await configRef.get()).data();
  if (!configuredOwner(config)) return { configured: false, sent: 0, pending: 0 };
  const token = clean(env.SLACK_BOT_TOKEN, 2000).replace(/\s+#.*$/, "").trim();
  if (!token || token === "xoxb-your-bot-token") return { configured: false, sent: 0, pending: 0 };
  const user = await auth.getUser(config.uid).catch(error => {
    if (error.code === "auth/user-not-found") return null;
    throw error;
  });
  if (!ownsInbox(config, user)) return { configured: false, sent: 0, pending: 0, reason: "owner_unavailable" };
  async function api(method, payload, readOnly = false) {
    const response = await fetchImpl(`https://slack.com/api/${method}${readOnly ? `?${new URLSearchParams(payload)}` : ""}`, {
      method: readOnly ? "GET" : "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json; charset=utf-8" },
      ...(readOnly ? {} : { body: JSON.stringify(payload) }), signal: AbortSignal.timeout(5000),
    });
    if (response.status === 429) return { ok: false, error: "ratelimited" };
    if (!response.ok) throw Object.assign(new Error("Slack transport failed"), { code: "slack_transport_failed" });
    const data = await response.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("slack_response_invalid");
    return data;
  }
  const identity = await api("users.info", { user: config.slackUserId }, true);
  const slackUser = identity.user;
  if (identity.ok !== true || slackUser?.id !== config.slackUserId || slackUser?.team_id !== config.slackTeamId ||
    slackUser?.deleted || slackUser?.is_bot || email(slackUser?.profile?.email) !== email(config.email)) {
    return { configured: false, sent: 0, pending: 0, reason: "slack_owner_not_verified" };
  }
  const maximum = Math.max(1, Math.min(20, Number(limit) || 2));
  const cursorRef = db.doc("OpsWorkOrderLinkConfiguration/delivery");
  let candidates;
  if (ids.length) candidates = await Promise.all([...new Set(ids)].slice(0, maximum).map(id => db.collection(OUTBOX).doc(id).get()));
  else {
    const cursor = (await cursorRef.get()).data()?.cursor || "";
    const base = db.collection(OUTBOX).where("needsDelivery", "==", true).orderBy("__name__").limit(100);
    candidates = (await (cursor ? base.startAfter(cursor) : base).get()).docs;
    if (!candidates.length && cursor) candidates = (await base.get()).docs;
  }
  let sent = 0, pending = 0, attempted = 0;
  for (const candidate of candidates) {
    if (attempted >= maximum || now() - started >= maxDurationMs) break;
    if (!candidate.exists) continue;
    // Advance even past backoff/blocked records so a poison alert cannot starve
    // later work orders. Scoped immediate sends do not alter the sweep cursor.
    if (!ids.length) await cursorRef.set({ cursor: candidate.id }, { merge: true });
    const ref = candidate.ref, claim = randomUUID(), fingerprint = ownerFingerprint(config);
    const acquired = await db.runTransaction(async tx => {
      const [snapshot, owner] = await Promise.all([tx.get(ref), tx.get(configRef)]);
      const data = snapshot.data();
      if (!data || data.needsDelivery !== true || !configuredOwner(owner.data()) || ownerFingerprint(owner.data()) !== fingerprint || TERMINAL.has(data.deliveryStatus) ||
        data.incidentStatus !== "open" || data.resolvedAtIso || data.recipientScope !== "owner_only" || Number(data.nextAttemptAtMs || 0) > now()) return null;
      if (data.deliveryStatus === "sending" && Number(data.leaseUntilMs || 0) > now()) return null;
      const incident = (await tx.get(db.collection(INCIDENTS).doc(data.workOrderId))).data();
      if (!incident || incident.status !== "open" || incident.currentEventId !== ref.id) {
        tx.set(ref, { deliveryStatus: "superseded", needsDelivery: false, leaseUntilMs: 0 }, { merge: true }); return null;
      }
      if (data.postStarted === true) {
        tx.set(ref, { deliveryStatus: "uncertain", needsDelivery: false, leaseUntilMs: 0 }, { merge: true }); return null;
      }
      tx.set(ref, { deliveryStatus: "sending", claim, leaseUntilMs: now() + 120000,
        ownerFingerprint: fingerprint, attempts: Number(data.attempts || 0) + 1 }, { merge: true });
      return data;
    });
    if (!acquired) continue;
    attempted++;
    let postStarted = false;
    async function checkpoint(patch, validate = false) {
      return db.runTransaction(async tx => {
        const [snapshot, owner] = await Promise.all([tx.get(ref), tx.get(configRef)]);
        const data = snapshot.data();
        if (data?.claim !== claim || data?.deliveryStatus !== "sending") return false;
        if (validate) {
          const incident = (await tx.get(db.collection(INCIDENTS).doc(acquired.workOrderId))).data();
          if (!configuredOwner(owner.data()) || ownerFingerprint(owner.data()) !== fingerprint || data.incidentStatus !== "open" || data.resolvedAtIso ||
            !incident || incident.status !== "open" || incident.currentEventId !== ref.id) return false;
        }
        tx.set(ref, patch, { merge: true }); return true;
      });
    }
    try {
      const currentUser = await auth.getUser(config.uid);
      if (!ownsInbox(config, currentUser)) throw Object.assign(new Error("Owner is no longer available"), { code: "owner_unavailable" });
      if (!await checkpoint({ postStarted: true }, true)) continue;
      postStarted = true;
      const result = await api("chat.postMessage", { channel: config.slackUserId, text: messageForAlert(ref.id, acquired),
        mrkdwn: false, parse: "none", link_names: false, unfurl_links: false, unfurl_media: false, unfurl_app_links: false });
      if (result.ok !== true) {
        if (REJECTED.has(result.error)) postStarted = false;
        throw Object.assign(new Error("Slack rejected the alert"), { code: clean(result.error, 100) || "slack_post_failed" });
      }
      if (!/^D[A-Z0-9]+$/.test(result.channel || "") || !/^\d{8,}\.\d{6}$/.test(result.ts || "")) throw new Error("slack_dm_ack_invalid");
      await checkpoint({ deliveryStatus: "sent", needsDelivery: false, postStarted: false, leaseUntilMs: 0, sentAtIso: new Date(now()).toISOString(),
        slackChannel: result.channel, slackMessageTs: result.ts, targetUid: config.uid, targetSlackUserId: config.slackUserId });
      sent++;
      if (attempted < maximum) await new Promise(resolve => setTimeout(resolve, 1050));
    } catch (error) {
      await checkpoint({ deliveryStatus: postStarted ? "uncertain" : "retry", needsDelivery: !postStarted, postStarted, leaseUntilMs: 0,
        nextAttemptAtMs: now() + 60000, lastErrorCode: clean(error.code, 100) || "alert_delivery_failed" });
      pending++;
    }
  }
  return { configured: true, sent, pending, attempted };
}

module.exports = { CONFIG_PATH, OUTBOX, INCIDENTS, configuredOwner, ownsInbox, publicAlert, messageForAlert, deliverWorkOrderLinkAlerts };
