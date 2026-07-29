import https from "https";

const FALLBACK_NAMES = new Map([
  ["U07F4G8NP2P", "Yao N"],
  ["U07EY4TF21L", "Stanley Wu"],
  ["U0B3CSLG126", "Joshua Yoon"],
  ["U07FH9RLMNV", "Stan Redd"],
]);

function clean(value, maxLength = 6000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function identityMap() {
  const names = new Map(FALLBACK_NAMES);
  for (const rawPair of String(process.env.SLACK_USER_NAME_MAP || "").split(",")) {
    const separator = rawPair.indexOf("=");
    if (separator < 1) continue;
    const id = clean(rawPair.slice(0, separator), 80);
    const name = clean(rawPair.slice(separator + 1), 100);
    if (id && name) names.set(id, name);
  }
  return names;
}

function slackCoordinates(workOrder) {
  let channel = clean(workOrder?.slackChannel, 120);
  let threadTs = clean(workOrder?.slackThreadTs, 120);
  try {
    const permalink = new URL(workOrder?.slackPermalink || "");
    if (!channel) {
      channel = permalink.pathname.match(/\/archives\/(C[A-Z0-9]+)/)?.[1] || "";
    }
    if (!threadTs) threadTs = permalink.searchParams.get("thread_ts") || "";
    if (!threadTs) {
      const compactTs = permalink.pathname.match(/\/p(\d{10})(\d{6})/) || [];
      if (compactTs[1] && compactTs[2]) threadTs = compactTs[1] + "." + compactTs[2];
    }
  } catch (_) {
    // Stored channel/thread fields remain the primary source.
  }
  return { channel, threadTs };
}

function slackGet(method, params) {
  const token = clean(process.env.SLACK_BOT_TOKEN, 500);
  if (!token) throw new Error("Missing SLACK_BOT_TOKEN");
  const query = new URLSearchParams(params).toString();
  return new Promise((resolve, reject) => {
    const request = https.request(
      "https://slack.com/api/" + method + "?" + query,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        timeout: 30000,
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode === 429) {
            return reject(
              new Error(
                "Slack is rate limited; retry after " +
                  (response.headers["retry-after"] || "30") +
                  " seconds."
              )
            );
          }
          if ((response.statusCode || 500) >= 400) {
            return reject(new Error("Slack returned HTTP " + response.statusCode + "."));
          }
          try {
            const data = JSON.parse(body);
            if (!data.ok) {
              throw new Error(
                "Slack " + method + " failed: " + (data.error || "unknown error")
              );
            }
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      }
    );
    request.on("timeout", () =>
      request.destroy(new Error("Slack request timed out."))
    );
    request.on("error", reject);
    request.end();
  });
}

function readableSlackText(value, names) {
  return clean(value, 6000)
    .replace(/<@([A-Z0-9]+)>/g, (_, id) => "@" + (names.get(id) || id))
    .replace(/<([^>|]+)\|([^>]+)>/g, "$2")
    .replace(/<([^>]+)>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function readOpsSlackThread(workOrder) {
  const { channel, threadTs } = slackCoordinates(workOrder);
  if (!channel || !threadTs) {
    throw new Error("This work order does not have a recoverable Slack thread link.");
  }
  const names = identityMap();
  const messages = [];
  let cursor = "";
  for (let page = 0; page < 5; page += 1) {
    const data = await slackGet("conversations.replies", {
      channel,
      ts: threadTs,
      limit: "200",
      ...(cursor ? { cursor } : {}),
    });
    for (const message of data.messages || []) {
      const userId = clean(message.user, 80);
      const senderName =
        names.get(userId) ||
        clean(
          message.user_profile?.real_name || message.user_profile?.display_name,
          100
        ) ||
        clean(message.username || message.bot_profile?.name, 100) ||
        userId ||
        "Slack";
      const text = readableSlackText(message.text, names);
      if (!message.ts || !text) continue;
      messages.push({
        id: clean(message.ts, 180).replace(/[^A-Za-z0-9_.-]/g, "_"),
        slackTs: clean(message.ts, 180),
        sender: { id: userId, name: senderName },
        text,
      });
    }
    cursor = clean(data.response_metadata?.next_cursor, 500);
    if (!cursor) break;
  }
  messages.sort((left, right) => Number(left.slackTs) - Number(right.slackTs));
  return {
    messages,
    sourceMessageCount: messages.length,
    throughSlackTs: messages.length
      ? messages[messages.length - 1].slackTs
      : threadTs,
  };
}
