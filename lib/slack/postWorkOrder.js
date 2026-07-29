import { createSlackClient } from "./client";

export function buildWorkOrderSlackParentMessage({ workOrderNumber, bluefolderUrl, subject }) {
  return [`#${workOrderNumber}`, `<${bluefolderUrl}|${subject}>`]
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
  bluefolderUrl,
  workOrderNumber,
}) {
  const channelId = await slack.resolveChannelId();
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

  const permalink = ts ? await slack.getPermalink(channel, ts) : "";
  return { channel, ts, permalink, parentMessage, mentions };
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
