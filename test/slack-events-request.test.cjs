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
    return require(
      request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request
    );
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

test("Slack events route uses Firebase rawBody for URL verification", async () => {
  const challenge = "slack-challenge-123";
  const requestBody = JSON.stringify({ type: "url_verification", challenge });
  let receivedRawBody = "";
  const route = loadProjectModule("pages/api/slack/events.js", {
    "../../../lib/slack/eventsHandler": {
      handleSlackEventsRequest: async ({ rawBody }) => {
        receivedRawBody = rawBody;
        return {
          status: 200,
          body: { challenge: JSON.parse(rawBody).challenge },
        };
      },
    },
  });
  const req = {
    method: "POST",
    rawBody: Buffer.from(requestBody),
    async *[Symbol.asyncIterator]() {
      throw new Error("the consumed request stream must not be read");
    },
  };
  const result = { status: null, body: null };
  const res = {
    status(status) {
      result.status = status;
      return this;
    },
    json(body) {
      result.body = body;
      return this;
    },
  };

  await route.default(req, res);

  assert.equal(receivedRawBody, requestBody);
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { challenge });
});

test("Slack event handler echoes Slack's URL verification challenge", async () => {
  const { handleSlackEventsRequest } = loadProjectModule(
    "lib/slack/eventsHandler.js",
    {
      "./client": {
        verifySlackRequest: () => true,
        createSlackClient: () => {
          throw new Error("Slack client should not be created for URL verification");
        },
      },
      "../ai/generateWorkOrderReport": {},
      "./getConversationForReport": {},
      "../state/bluefolderSlackState": {},
    }
  );

  const result = await handleSlackEventsRequest({
    rawBody: JSON.stringify({
      type: "url_verification",
      challenge: "verified-challenge",
    }),
    headers: {},
  });

  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { challenge: "verified-challenge" });
});

test("a direct -help message returns every active MAGMO command", async () => {
  const posted = [];
  const { buildSlackHelpText, handleSlackEventsRequest } = loadProjectModule(
    "lib/slack/eventsHandler.js",
    {
      "./client": {
        verifySlackRequest: () => true,
        createSlackClient: () => ({
          postDirectMessage: async (message) => posted.push(message),
        }),
      },
      "../ai/generateWorkOrderReport": {
        generateWorkOrderReport: async () => {
          throw new Error("-help must not generate a work-order report");
        },
      },
      "./getConversationForReport": {
        getConversationForReport: async () => {
          throw new Error("-help must not load a work-order conversation");
        },
      },
      "../state/bluefolderSlackState": {
        recordSlackEventOnce: async () => true,
      },
    }
  );

  const result = await handleSlackEventsRequest({
    rawBody: JSON.stringify({
      type: "event_callback",
      event_id: "Ev-help-1",
      event: {
        type: "message",
        channel_type: "im",
        channel: "D123",
        user: "U123456",
        text: "-help",
        ts: "123.456",
      },
    }),
    headers: {},
  });

  assert.equal(result.status, 200);
  assert.deepEqual(result.body, {
    ok: true,
    posted: true,
    command: "-help",
  });
  assert.equal(posted.length, 1);
  assert.equal(posted[0].userId, "U123456");
  const helpText = buildSlackHelpText();
  for (const command of ["-help", "!daily", "!complete", "!parts", "!notes", "!done"]) {
    assert.match(helpText, new RegExp(command.replace(/[!\-]/g, "\\$&")));
  }
  assert.match(helpText, /!service.*not currently an active command/i);
});
