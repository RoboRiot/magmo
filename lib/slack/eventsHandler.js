import { generateWorkOrderReport } from "../ai/generateWorkOrderReport";
import { createSlackClient, verifySlackRequest } from "./client";
import { getConversationForReport } from "./getConversationForReport";
import { recordSlackEventOnce } from "../state/bluefolderSlackState";

function headersToObject(headers = {}) {
  if (typeof headers.entries === "function") {
    return Object.fromEntries(headers.entries());
  }
  return headers;
}

export async function handleSlackEventsRequest({ rawBody, headers }) {
  const headerObject = headersToObject(headers);
  if (!verifySlackRequest(rawBody, headerObject)) {
    return {
      status: 401,
      body: { ok: false, error: "invalid_slack_signature" },
    };
  }

  const payload = JSON.parse(rawBody || "{}");
  if (payload.type === "url_verification") {
    return { status: 200, body: { challenge: payload.challenge } };
  }

  if (payload.type !== "event_callback") {
    return { status: 200, body: { ok: true, ignored: "not_event_callback" } };
  }

  const event = payload.event || {};
  const text = String(event.text || "").trim();
  if (
    event.type !== "message" ||
    event.bot_id ||
    event.subtype ||
    text.toLowerCase() !== "!done"
  ) {
    return { status: 200, body: { ok: true, ignored: true } };
  }

  const firstSeen = await recordSlackEventOnce(payload.event_id);
  if (!firstSeen) {
    return { status: 200, body: { ok: true, duplicate: true } };
  }

  const slack = createSlackClient();
  const conversation = await getConversationForReport({ slack, event });
  const report = await generateWorkOrderReport({ conversation });
  await slack.postReport({
    channel: conversation.channel,
    threadTs: conversation.rootTs || event.thread_ts || event.ts,
    text: report,
  });

  return {
    status: 200,
    body: {
      ok: true,
      posted: true,
      channel: conversation.channel,
      threadTs: conversation.rootTs,
      workOrderId: conversation.workOrder?.work_order_id || null,
    },
  };
}
