"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const { createRequire } = require("node:module");

const candidate = path.join(__dirname, "scoped-source");
for (const key of Object.keys(process.env)) {
  if (/^(?:SLACK_|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS$)|(?:TOKEN|SECRET|PASSWORD|PRIVATE_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key)) {
    delete process.env[key];
  }
}
globalThis.fetch = async () => { throw new Error("Ambient network disabled."); };

function responseRecorder() {
  const result = { status: null, body: null };
  const response = {
    headersSent: false, writableEnded: false,
    status(value) { result.status = value; return this; },
    json(value) { result.body = value; this.headersSent = true; this.writableEnded = true; return this; },
  };
  return { result, response };
}

async function exposeRuntime(relative) {
  const filename = path.join(candidate, relative);
  const code = fs.readFileSync(filename, "utf8");
  assert.equal(code.split("module.exports=c").length, 2);
  const module = { exports: {} };
  new Function("require", "module", "exports", "__filename", "__dirname",
    code.replace("module.exports=c", "module.exports={loaded:c,runtime:b}"))(
    createRequire(filename), module, module.exports, filename, path.dirname(filename)
  );
  await module.exports.loaded;
  return module.exports.runtime;
}

test("compiled shipping sender loads only ACTIVE 8806 and dispatches through the expected Ops export", async () => {
  process.chdir(candidate);
  process.env.SLACK_BOT_TOKEN = "synthetic-test-token";
  process.env.SLACK_LIST_SHIPPING_ID = "LIST-SHIPPING";
  process.env.SLACK_LIST_SHIPPING_TITLE_COL = "COL-TITLE";
  process.env.SLACK_LIST_SHIPPING_WO_COL = "COL-WO";
  process.env.SLACK_LIST_SHIPPING_DESCRIPTION_COL = "COL-DESC";
  process.env.SLACK_LIST_SHIPPING_DATE_COL = "COL-DATE";

  const runtime = await exposeRuntime(".next/server/pages/api/slack/add-to-list.js");
  const loadedChunks = [];
  const opsCalls = [];
  const originalLoadChunk = runtime.e;
  runtime.e = async (chunkId) => {
    loadedChunks.push(chunkId);
    await originalLoadChunk(chunkId);
    if (chunkId === 8806) {
      runtime.m[78806] = (module) => {
        module.exports = {
          recordOpsInventoryMovement: async (input) => {
            opsCalls.push(input);
            return { attached: true, workOrderId: "10658" };
          },
        };
      };
    }
  };
  const sender = runtime(1572);
  assert.equal(typeof sender.sendSlackListItem, "function");
  const fetchCalls = [];
  const fetchImpl = async (url, options = {}) => {
    fetchCalls.push({ url: String(url), body: String(options.body || "") });
    const method = String(url).split("/").at(-1);
    const payload = method === "slackLists.items.create"
      ? { ok: true, item: { id: "ROW-1" } }
      : { ok: true };
    return { ok: true, status: 200, json: async () => payload };
  };
  const { result, response } = responseRecorder();
  await sender.sendSlackListItem({
    method: "POST",
    headers: {},
    body: {
      listKey: "shipping",
      title: "Motor (AIS123)",
      work_order: "10658",
      local_sn: "AIS123",
      description: "Saved description",
      shipping_date: "2026-09-25",
      photoUrls: [],
    },
  }, response, {
    authUser: { uid: "test-user", email: "test@advancedimagingparts.com" },
    fetchImpl,
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.deepEqual(loadedChunks, [1067, 8806]);
  assert.deepEqual(loadedChunks.filter((chunkId) => chunkId !== 1067), [8806]);
  assert.equal(opsCalls.length, 1);
  assert.equal(opsCalls[0].workOrderNumber, "10658");
  assert.equal(opsCalls[0].direction, "shipping");
  assert.equal(opsCalls[0].itemId, "AIS123");
  assert.equal(result.body.opsMovement.attached, true);
  assert(fetchCalls.length >= 1);
  assert(fetchCalls.every((call) => call.url.startsWith("https://slack.com/api/")));
  assert(!fs.existsSync(path.join(candidate, ".next/server/chunks/9449.js")));
  assert(!fs.existsSync(path.join(candidate, ".next/server/chunks/2341.js")));
  assert(fs.existsSync(path.join(candidate, ".next/server/chunks/1067.js")));
});
