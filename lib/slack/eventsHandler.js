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

export function buildSlackHelpText() {
  return [
    "*MAGMO commands*",
    "Use the work-order commands inside the corresponding Slack work-order thread.",
    "",
    "• `-help` — Show this command list.",
    "• `!daily` — Post a short update for the current Pacific-time day.",
    "• `!complete` — Post the service report and move the work order to Service complete while parts return remains pending.",
    "• `!parts` — Post and save a concise parts-movement summary without changing the work-order status.",
    "• `!notes <note>` — Save a client/system note to the linked work order.",
    "• `!done` — Post the final closeout, mark the work order done, preserve its summaries, and clear the temporary chat log.",
    "",
    "Service completion uses `!complete`; `!service` is not currently an active command.",
  ].join("\n");
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
  const isHumanMessage =
    event.type === "message" && !event.bot_id && !event.subtype;
  const isDirectHelp =
    isHumanMessage &&
    event.channel_type === "im" &&
    text.toLowerCase() === "-help";

  if (isDirectHelp) {
    const firstSeen = await recordSlackEventOnce(payload.event_id);
    if (!firstSeen) {
      return { status: 200, body: { ok: true, duplicate: true } };
    }

    const slack = createSlackClient();
    await slack.postDirectMessage({
      userId: event.user,
      text: buildSlackHelpText(),
      metadata: {
        event_type: "magmo_command_help",
        event_payload: { request_ts: String(event.ts || "") },
      },
    });

    return {
      status: 200,
      body: { ok: true, posted: true, command: "-help" },
    };
  }

  if (
    !isHumanMessage ||
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
