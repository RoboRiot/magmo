import crypto from "crypto";

function envValue(value) {
  return String(value || "").replace(/\s+#.*$/, "").trim();
}

function isPlaceholderSecret(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return !normalized || normalized === "xoxb-your-bot-token";
}

function normalizeName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function extractNamesFromMentionText(mentionText) {
  const names = [];
  const regex = /@([^@]+?)(?=\s*@|$)/g;
  let match;
  while ((match = regex.exec(mentionText || ""))) {
    const name = match[1].trim();
    if (name) names.push(name);
  }
  return names;
}

export function getSlackSettings() {
  return {
    slackBotToken: envValue(process.env.SLACK_BOT_TOKEN),
    slackChannelId: envValue(process.env.SLACK_CHANNEL_ID),
    slackChannelName: envValue(process.env.SLACK_CHANNEL_NAME || "dispatch")
      .replace(/^#/, "")
      .trim(),
    slackUserIds: envValue(process.env.SLACK_USER_IDS)
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
    slackMentionText: envValue(process.env.SLACK_MENTION_TEXT),
    requireClickableMentions:
      envValue(process.env.REQUIRE_CLICKABLE_MENTIONS || "true").toLowerCase() !==
      "false",
  };
}

export function verifySlackRequest(rawBody, headers = {}) {
  const signingSecret = envValue(process.env.SLACK_SIGNING_SECRET);
  if (!signingSecret) return true;

  const timestamp = String(headers["x-slack-request-timestamp"] || "");
  const signature = String(headers["x-slack-signature"] || "");
  if (!timestamp || !signature) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 60 * 5) return false;

  const base = `v0:${timestamp}:${rawBody}`;
  const expected = `v0=${crypto
    .createHmac("sha256", signingSecret)
    .update(base)
    .digest("hex")}`;

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export class SlackClient {
  constructor(settings = getSlackSettings()) {
    this.settings = settings;
    this.resolvedChannelId = "";
    this.userLookup = null;
  }

  requireToken() {
    if (isPlaceholderSecret(this.settings.slackBotToken)) {
      throw new Error("Missing SLACK_BOT_TOKEN");
    }
    return this.settings.slackBotToken;
  }

  async api(method, payload = {}) {
    const response = await fetch(`https://slack.com/api/${method}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.requireToken()}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      throw new Error(`Slack API ${method} failed: ${JSON.stringify(data)}`);
    }
    return data;
  }

  async apiRaw(method, payload = {}) {
    const response = await fetch(`https://slack.com/api/${method}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.requireToken()}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  }

  async apiForm(method, payload = {}) {
    const body = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value == null || value === "") return;
      body.set(key, String(value));
    });
    const response = await fetch(`https://slack.com/api/${method}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.requireToken()}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body,
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      throw new Error(`Slack API ${method} failed: ${JSON.stringify(data)}`);
    }
    return data;
  }

  async postMessageWithJoinRetry(channelId, payload) {
    let data = await this.apiRaw("chat.postMessage", payload);
    if (data?.ok) return data;

    if (data?.error === "not_in_channel" && channelId && !channelId.startsWith("#")) {
      const joined = await this.apiRaw("conversations.join", { channel: channelId });
      if (joined?.ok) data = await this.apiRaw("chat.postMessage", payload);
      if (!joined?.ok && joined?.error === "missing_scope") {
        throw new Error(
          "Slack bot is not in the target channel and lacks conversations.join scope. Invite the bot, then retry."
        );
      }
    }

    if (!data?.ok) {
      throw new Error(`Slack API chat.postMessage failed: ${JSON.stringify(data)}`);
    }
    return data;
  }

  async resolveChannelId() {
    if (this.resolvedChannelId) return this.resolvedChannelId;
    if (this.settings.slackChannelId) {
      this.resolvedChannelId = this.settings.slackChannelId;
      return this.resolvedChannelId;
    }

    const targetName = String(this.settings.slackChannelName || "")
      .replace(/^#/, "")
      .trim()
      .toLowerCase();
    if (!targetName) {
      throw new Error("No Slack channel configured. Set SLACK_CHANNEL_ID or SLACK_CHANNEL_NAME.");
    }

    try {
      let cursor = "";
      do {
        const data = await this.api("conversations.list", {
          types: "public_channel,private_channel",
          limit: 1000,
          exclude_archived: true,
          ...(cursor ? { cursor } : {}),
        });
        const match = (data.channels || []).find(
          (channel) => String(channel.name || "").trim().toLowerCase() === targetName
        );
        if (match?.id) {
          this.resolvedChannelId = match.id;
          return this.resolvedChannelId;
        }
        cursor = data.response_metadata?.next_cursor || "";
      } while (cursor);
    } catch {
      // Some bot tokens lack channel read scopes; Slack can still post by name
      // when the bot is already a channel member.
    }

    this.resolvedChannelId = `#${targetName}`;
    return this.resolvedChannelId;
  }

  async loadUserLookup() {
    if (this.userLookup) return this.userLookup;
    const lookup = {};
    try {
      let cursor = "";
      do {
        const data = await this.api("users.list", {
          limit: 200,
          ...(cursor ? { cursor } : {}),
        });
        for (const member of data.members || []) {
          const userId = String(member.id || "").trim();
          if (!userId) continue;
          const profile = member.profile || {};
          const candidates = [
            member.real_name,
            member.name,
            profile.real_name,
            profile.display_name,
            profile.display_name_normalized,
            profile.real_name_normalized,
            [profile.first_name, profile.last_name].filter(Boolean).join(" "),
          ];
          candidates.forEach((candidate) => {
            const normalized = normalizeName(candidate);
            if (normalized && !lookup[normalized]) lookup[normalized] = userId;
          });
        }
        cursor = data.response_metadata?.next_cursor || "";
      } while (cursor);
    } catch {
      this.userLookup = {};
      return this.userLookup;
    }
    this.userLookup = lookup;
    return lookup;
  }

  async resolveMentionUserIds(mentionUserIds = [], mentionText = "") {
    const seen = new Set();
    const cleaned = [];
    mentionUserIds.forEach((userId) => {
      const normalized = String(userId || "").trim();
      if (normalized && !seen.has(normalized)) {
        cleaned.push(normalized);
        seen.add(normalized);
      }
    });
    if (cleaned.length) return cleaned;

    const names = extractNamesFromMentionText(mentionText);
    if (!names.length) return [];
    const lookup = await this.loadUserLookup();
    return names
      .map((name) => lookup[normalizeName(name)])
      .filter((userId) => {
        if (!userId || seen.has(userId)) return false;
        seen.add(userId);
        return true;
      });
  }

  async getPermalink(channel, ts) {
    const data = await this.apiForm("chat.getPermalink", {
      channel,
      message_ts: ts,
    });
    return data.permalink || "";
  }

  async conversationsReplies(channel, ts, limit = 200) {
    const data = await this.api("conversations.replies", {
      channel,
      ts,
      limit,
    });
    return data.messages || [];
  }

  async conversationsHistoryPage(channel, options = {}) {
    const data = await this.api("conversations.history", {
      channel,
      limit: options.limit || 20,
      ...(options.latest ? { latest: options.latest } : {}),
      ...(options.oldest ? { oldest: options.oldest } : {}),
      ...(options.inclusive != null ? { inclusive: options.inclusive } : {}),
      ...(options.cursor ? { cursor: options.cursor } : {}),
    });
    return {
      messages: data.messages || [],
      nextCursor: String(data.response_metadata?.next_cursor || "").trim(),
    };
  }

  // Preserve the original one-page array API for existing callers. Consumers
  // that need a complete channel scan (for example, work-order numbering)
  // should call conversationsHistoryAll instead.
  async conversationsHistory(channel, options = {}) {
    const page = await this.conversationsHistoryPage(channel, options);
    return page.messages;
  }

  async conversationsHistoryAll(channel, options = {}) {
    const messages = [];
    const seenCursors = new Set();
    const requestedMaxPages = Number(options.maxPages);
    const maxPages =
      Number.isFinite(requestedMaxPages) && requestedMaxPages > 0
        ? Math.max(1, Math.floor(requestedMaxPages))
        : 1000;
    let cursor = String(options.cursor || "").trim();

    for (let pageNumber = 0; pageNumber < maxPages; pageNumber += 1) {
      if (cursor) {
        if (seenCursors.has(cursor)) {
          throw new Error(
            "Slack conversations.history returned a repeated pagination cursor."
          );
        }
        seenCursors.add(cursor);
      }
      const page = await this.conversationsHistoryPage(channel, {
        ...options,
        limit: options.limit || 200,
        ...(cursor ? { cursor } : {}),
      });
      messages.push(...page.messages);
      cursor = page.nextCursor;
      if (!cursor) return messages;
    }

    throw new Error(
      `Slack conversations.history exceeded the ${maxPages}-page safety limit.`
    );
  }

  async postReport({ channel, threadTs, text, metadata, clientMsgId = "" }) {
    return this.postMessageWithJoinRetry(channel, {
      channel,
      text,
      thread_ts: threadTs,
      mrkdwn: true,
      unfurl_links: false,
      unfurl_media: false,
      ...(metadata ? { metadata } : {}),
      ...(clientMsgId ? { client_msg_id: clientMsgId } : {}),
    });
  }

  async postDirectMessage({ userId, text, metadata }) {
    const channel = String(userId || "").trim();
    if (!/^U[A-Z0-9]+$/i.test(channel)) {
      throw new Error("A valid Slack user ID is required for a direct message.");
    }
    return this.api("chat.postMessage", {
      channel,
      text: String(text || "").trim(),
      mrkdwn: true,
      unfurl_links: false,
      unfurl_media: false,
      ...(metadata ? { metadata } : {}),
    });
  }

  async uploadFile({
    channel,
    threadTs,
    content,
    fileName,
    title,
    contentType,
  }) {
    const bytes = Buffer.isBuffer(content) ? content : Buffer.from(content || []);
    if (!bytes.length) throw new Error("Cannot upload an empty Slack file.");
    const safeName =
      String(fileName || "attachment")
        .replace(/[\\/]+/g, "-")
        .trim()
        .slice(0, 180) || "attachment";
    const upload = await this.apiForm("files.getUploadURLExternal", {
      filename: safeName,
      length: bytes.length,
    });
    const posted = await fetch(upload.upload_url, {
      method: "POST",
      headers: {
        "Content-Type": contentType || "application/octet-stream",
      },
      body: bytes,
    });
    if (!posted.ok) {
      throw new Error(
        `Slack file upload failed with HTTP ${posted.status}.`
      );
    }
    const completed = await this.apiForm("files.completeUploadExternal", {
      files: JSON.stringify([
        {
          id: upload.file_id,
          title: String(title || safeName).trim().slice(0, 180),
        },
      ]),
      channel_id: channel,
      thread_ts: threadTs,
    });
    return {
      id: String(completed.files?.[0]?.id || upload.file_id || "").trim(),
      name: safeName,
    };
  }
}

export function createSlackClient(settings) {
  return new SlackClient(settings);
}
