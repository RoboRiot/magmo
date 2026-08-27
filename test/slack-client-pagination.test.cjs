const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

function loadProjectModule(relativePath, mocks = {}) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transformed = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => {
    if (Object.prototype.hasOwnProperty.call(mocks, request)) {
      return mocks[request];
    }
    return require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request);
  };
  const execute = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transformed
  );
  execute(localRequire, module, module.exports, filename, path.dirname(filename));
  return module.exports;
}

test("conversationsHistory keeps its original one-page array contract", async () => {
  const { SlackClient } = loadProjectModule("lib/slack/client.js");
  const client = new SlackClient({ slackBotToken: "xoxb-test" });
  const calls = [];
  client.api = async (method, payload) => {
    calls.push({ method, payload });
    return {
      messages: [{ ts: "3.0" }],
      response_metadata: { next_cursor: "next-page" },
    };
  };

  assert.deepEqual(await client.conversationsHistory("C123", { limit: 50 }), [
    { ts: "3.0" },
  ]);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, "conversations.history");
  assert.equal(calls[0].payload.cursor, undefined);
});

test("conversationsHistoryAll follows every Slack cursor", async () => {
  const { SlackClient } = loadProjectModule("lib/slack/client.js");
  const client = new SlackClient({ slackBotToken: "xoxb-test" });
  const cursors = [];
  client.api = async (_method, payload) => {
    cursors.push(payload.cursor || "");
    if (!payload.cursor) {
      return {
        messages: [{ ts: "3.0" }, { ts: "2.0" }],
        response_metadata: { next_cursor: "page-2" },
      };
    }
    return {
      messages: [{ ts: "1.0" }],
      response_metadata: { next_cursor: "" },
    };
  };

  const messages = await client.conversationsHistoryAll("C123", {
    limit: 200,
    oldest: "100.0",
  });
  assert.deepEqual(messages.map((message) => message.ts), ["3.0", "2.0", "1.0"]);
  assert.deepEqual(cursors, ["", "page-2"]);
});

test("conversationsHistoryAll fails closed on a repeated cursor", async () => {
  const { SlackClient } = loadProjectModule("lib/slack/client.js");
  const client = new SlackClient({ slackBotToken: "xoxb-test" });
  client.api = async () => ({
    messages: [],
    response_metadata: { next_cursor: "same-cursor" },
  });

  await assert.rejects(
    client.conversationsHistoryAll("C123", { maxPages: 5 }),
    /repeated pagination cursor/i
  );
});

test("work-order client_msg_id is attached only to the Slack parent", async () => {
  const { postWorkOrderToSlack } = loadProjectModule(
    "lib/slack/postWorkOrder.js",
    { "./client": { createSlackClient: () => null } }
  );
  const posts = [];
  const slack = {
    settings: { requireClickableMentions: true },
    resolveChannelId: async () => "C123",
    resolveMentionUserIds: async (ids) => ids,
    postMessageWithJoinRetry: async (_channelId, payload) => {
      posts.push(payload);
      return posts.length === 1 ? { channel: "C123", ts: "123.456" } : { ok: true };
    },
    getPermalink: async () => "https://example.slack.com/archives/C123/p123456",
  };

  const result = await postWorkOrderToSlack({
    settings: {
      slackUserIds: ["U123"],
      slackMentionText: "",
    },
    slack,
    workOrderNumber: "10429",
    subject: "Scanner issue",
    description: "Error details",
    clientMsgId: "magmo-request-fixed-id",
  });

  assert.equal(posts.length, 3);
  assert.equal(posts[0].client_msg_id, "magmo-request-fixed-id");
  assert.equal(result.clientMsgId, "magmo-request-fixed-id");
  assert.equal(posts[0].text, "#10429\n*Scanner issue*");
  assert.equal(posts[1].client_msg_id, undefined);
  assert.equal(posts[2].client_msg_id, undefined);
});

test("a generated BlueFolder URL makes the Slack work-order title clickable", () => {
  const { buildWorkOrderSlackParentMessage } = loadProjectModule(
    "lib/slack/postWorkOrder.js",
    { "./client": { createSlackClient: () => null } }
  );

  assert.equal(
    buildWorkOrderSlackParentMessage({
      workOrderNumber: "10434",
      bluefolderUrl:
        "https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10434",
      subject: "Prohealth West Hills MRI1 - grainy images",
    }),
    "#10434\n<https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10434|Prohealth West Hills MRI1 - grainy images>"
  );
});
