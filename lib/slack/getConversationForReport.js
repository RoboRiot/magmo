import { findWorkOrderBySlackThread } from "../state/bluefolderSlackState";

function isWorkOrderParentMessage(message) {
  return /^#[^\n]+\n<[^>|]+\|[^>]+>/m.test(String(message?.text || ""));
}

function normalizeMessage(message) {
  return {
    user: message.user || message.username || message.bot_id || "unknown",
    ts: message.ts || "",
    text: String(message.text || "").trim(),
    subtype: message.subtype || "",
  };
}

export async function getConversationForReport({ slack, event }) {
  const channel = event.channel;
  let rootTs = event.thread_ts || "";
  let source = "thread";

  if (!rootTs || rootTs === event.ts) {
    source = "channel_history";
    const history = await slack.conversationsHistory(channel, {
      latest: event.ts,
      inclusive: false,
      limit: 20,
    });
    const parent = history.find(isWorkOrderParentMessage);
    if (parent?.ts) {
      rootTs = parent.ts;
      source = "nearest_work_order_parent";
    } else {
      rootTs = event.ts;
    }
  }

  let messages = [];
  try {
    messages = await slack.conversationsReplies(channel, rootTs, 200);
  } catch {
    messages = await slack.conversationsHistory(channel, {
      latest: event.ts,
      inclusive: true,
      limit: 30,
    });
  }

  const workOrder = await findWorkOrderBySlackThread(channel, rootTs).catch(
    () => null
  );

  return {
    channel,
    rootTs,
    source,
    workOrder,
    messages: messages.map(normalizeMessage).filter((message) => message.text),
  };
}
