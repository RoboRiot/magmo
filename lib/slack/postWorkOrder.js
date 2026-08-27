import { createSlackClient } from "./client";

export function buildWorkOrderSlackParentMessage({ workOrderNumber, bluefolderUrl, subject }) {
  const title = bluefolderUrl
    ? `<${bluefolderUrl}|${subject}>`
    : `*${String(subject || "Service request").trim()}*`;
  return [`#${workOrderNumber}`, title]
    .filter((part) => String(part || "").trim())
    .join("\n");
}

export async function buildMentionText(slack, mentionUserIds = [], mentionText = "") {
  const configuredIds = await slack.resolveMentionUserIds(mentionUserIds, "");
  const namedIds = mentionText
    ? await slack.resolveMentionUserIds([], mentionText)
    : [];
  const resolvedIds = Array.from(new Set([...configuredIds, ...namedIds]));
  const mentions = resolvedIds.map((userId) => `<@${userId}>`).join(" ").trim();
  if (mentions) return mentions;
  if (mentionText && slack.settings.requireClickableMentions) {
    throw new Error(
      "Could not create clickable Slack @mentions from names. Set SLACK_USER_IDS with real member IDs or grant users:read."
    );
  }
  return String(mentionText || "").trim();
}

export async function postWorkOrderToSlack({
  settings,
  slack = createSlackClient(settings),
  subject,
  description,
  bluefolderUrl,
  workOrderNumber,
  clientMsgId = "",
}) {
  const channelId = await slack.resolveChannelId();
  const normalizedClientMsgId = String(clientMsgId || "").trim().slice(0, 255);
  const parentMessage = buildWorkOrderSlackParentMessage({
    workOrderNumber,
    bluefolderUrl,
    subject,
  });
  const parent = await slack.postMessageWithJoinRetry(channelId, {
    channel: channelId,
    text: parentMessage,
    mrkdwn: true,
    unfurl_links: false,
    unfurl_media: false,
    ...(normalizedClientMsgId ? { client_msg_id: normalizedClientMsgId } : {}),
  });

  const channel = String(parent.channel || channelId).trim();
  const ts = String(parent.ts || parent.message?.ts || "").trim();
  const mentions = await buildMentionText(
    slack,
    settings.slackUserIds,
    settings.slackMentionText
  );

  // Preserve the Python listener behavior: the work-order parent message is
  // followed by the fixed mentions as a reply in the new thread.
  if (mentions && ts) {
    await slack.postMessageWithJoinRetry(channelId, {
      channel,
      text: mentions,
      thread_ts: ts,
      mrkdwn: true,
      unfurl_links: false,
      unfurl_media: false,
    });
  }

  const descriptionText = String(description || "").trim();
  if (descriptionText && ts) {
    await slack.postMessageWithJoinRetry(channelId, {
      channel,
      text: descriptionText,
      thread_ts: ts,
      mrkdwn: true,
      unfurl_links: false,
      unfurl_media: false,
    });
  }

  let permalink = "";
  if (ts) {
    try {
      permalink = await slack.getPermalink(channel, ts);
    } catch (error) {
      // Return the root coordinates so an idempotent caller can recover the
      // existing root. MAGMO Dispatch separately requires the canonical
      // permalink before it records the request as accepted.
      console.warn("[Ops][Slack][permalink]", error?.message || error);
    }
  }
  return {
    channel,
    ts,
    permalink,
    parentMessage,
    clientMsgId: normalizedClientMsgId,
    mentions,
    description: descriptionText,
  };
}

export async function sendSingleSlackTest(settings) {
  return postWorkOrderToSlack({
    settings,
    subject: settings.testWorkOrderSubject || "DUMMY TEST",
    bluefolderUrl:
      settings.testWorkOrderUrl || "https://app.bluefolder.com/workOrder/9769",
    workOrderNumber: settings.testWorkOrderNumber || "9769",
  });
}
