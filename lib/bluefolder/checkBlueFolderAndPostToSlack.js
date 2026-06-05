import {
  createBlueFolderClient,
  extractWorkOrderFields,
  getBlueFolderSlackSettings,
  parseDate,
  sortByCreatedAtDesc,
  validateBlueFolderSlackSettings,
} from "./client";
import { createSlackClient } from "../slack/client";
import { postWorkOrderToSlack, sendSingleSlackTest } from "../slack/postWorkOrder";
import {
  claimWorkOrder,
  ensureBaselineCaptured,
  getLastSeenCreatedAt,
  isWorkOrderProcessed,
  markWorkOrderFailed,
  markWorkOrderProcessed,
  setLastSeenCreatedAt,
} from "../state/bluefolderSlackState";

function buildDryRunPreview(settings, fields) {
  const mentions =
    settings.slackUserIds.map((userId) => `<@${userId}>`).join(" ").trim() ||
    settings.slackMentionText;
  return {
    channel: settings.slackChannelId || `#${settings.slackChannelName || "dispatch"}`,
    ts: "0.000000",
    permalink: "https://slack.com/app_redirect?channel=dry-run",
    parentMessage: [`#${fields.number}`, `<${fields.link}|${fields.subject}>`].join("\n"),
    mentions,
  };
}

async function filterNewWorkOrders(items, settings) {
  const lastSeenCreatedAt = await getLastSeenCreatedAt();
  const lastSeenDate = parseDate(lastSeenCreatedAt);
  const candidates = [];

  for (const item of items) {
    const fields = extractWorkOrderFields(item, settings);
    if (!fields.id) continue;
    if (await isWorkOrderProcessed(fields.id)) continue;

    const createdAt = parseDate(fields.created_at);
    if (lastSeenDate && createdAt && createdAt < lastSeenDate) continue;
    candidates.push({ raw: item, fields });
  }

  return candidates.sort((a, b) => {
    const aDate = parseDate(a.fields.created_at);
    const bDate = parseDate(b.fields.created_at);
    return (aDate?.getTime() || 0) - (bDate?.getTime() || 0);
  });
}

export async function checkBlueFolderAndPostToSlack(options = {}) {
  const settings = {
    ...getBlueFolderSlackSettings(),
    ...(options.settings || {}),
  };

  if (options.testSlack || settings.testSingleSlackSend) {
    validateBlueFolderSlackSettings(settings, { slackOnly: true });
    const result = await sendSingleSlackTest(settings);
    return { ok: true, mode: "test_single_slack_send", result };
  }

  if (!settings.enableBlueFolder) {
    return {
      ok: true,
      mode: "disabled",
      processedCount: 0,
      message: "ENABLE_BLUEFOLDER is false.",
    };
  }

  validateBlueFolderSlackSettings(settings);

  const bluefolder = createBlueFolderClient(settings);
  const slack = createSlackClient(settings);
  const workOrders = sortByCreatedAtDesc(await bluefolder.listRecentWorkOrders());
  const extractedForBaseline = workOrders.map((item) =>
    extractWorkOrderFields(item, settings)
  );

  if (settings.baselineOnStartup) {
    const baseline = await ensureBaselineCaptured(extractedForBaseline);
    if (baseline.captured) {
      return {
        ok: true,
        mode: "baseline",
        processedCount: 0,
        baselineCount: baseline.baselineCount,
        newestCreatedAt: baseline.newestCreatedAt || null,
      };
    }
  }

  const newItems = await filterNewWorkOrders(workOrders, settings);
  let processedCount = 0;
  let newestCreatedAt = await getLastSeenCreatedAt();
  const processed = [];
  const errors = [];

  for (const { fields } of newItems) {
    const claimed = await claimWorkOrder(fields.id, {
      number: fields.number,
      subject: fields.subject,
      created_at: fields.created_at,
      bluefolder_url: fields.link,
    });
    if (!claimed) continue;

    try {
      const slackResult = settings.dryRun
        ? buildDryRunPreview(settings, fields)
        : await postWorkOrderToSlack({
            settings,
            slack,
            subject: fields.subject,
            bluefolderUrl: fields.link,
            workOrderNumber: fields.number,
          });

      if (!settings.dryRun && slackResult.permalink) {
        try {
          await bluefolder.updateSlackLink(fields.id, slackResult.permalink);
        } catch (error) {
          errors.push({
            workOrderId: fields.id,
            type: "bluefolder_writeback_failed",
            message: String(error?.message || error),
          });
        }
      }

      await markWorkOrderProcessed(fields.id, {
        number: fields.number,
        subject: fields.subject,
        created_at: fields.created_at,
        bluefolder_url: fields.link,
        slack_channel: slackResult.channel,
        slack_ts: slackResult.ts,
        slack_permalink: slackResult.permalink,
        dry_run: settings.dryRun,
        processed_at: new Date().toISOString(),
      });

      const currentDate = parseDate(fields.created_at);
      const newestDate = parseDate(newestCreatedAt);
      if (currentDate && (!newestDate || currentDate > newestDate)) {
        newestCreatedAt = fields.created_at;
      }

      processedCount += 1;
      processed.push({
        workOrderId: fields.id,
        number: fields.number,
        subject: fields.subject,
        slackChannel: slackResult.channel,
        slackTs: slackResult.ts,
        slackPermalink: slackResult.permalink,
        dryRun: settings.dryRun,
      });
    } catch (error) {
      await markWorkOrderFailed(fields.id, error);
      errors.push({
        workOrderId: fields.id,
        type: "processing_failed",
        message: String(error?.message || error),
      });
    }
  }

  if (newestCreatedAt) await setLastSeenCreatedAt(newestCreatedAt);

  return {
    ok: errors.length === 0,
    mode: settings.dryRun ? "dry_run" : "processed",
    foundCount: workOrders.length,
    newCount: newItems.length,
    processedCount,
    processed,
    errors,
  };
}
