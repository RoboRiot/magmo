"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");

const candidate = path.join(__dirname, "scoped-source");
for (const key of Object.keys(process.env)) {
  if (/^(?:SLACK_|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS$)|(?:TOKEN|SECRET|PASSWORD|PRIVATE_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key)) {
    delete process.env[key];
  }
}
globalThis.fetch = async () => { throw new Error("Network disabled."); };

test("options is a true cold-load with ACTIVE storage contract and production distDir", async () => {
  process.chdir(candidate);
  const relative = ".next/server/pages/api/items/work-order-add/options.js";
  const filename = path.join(candidate, relative);
  const code = fs.readFileSync(filename, "utf8");
  assert(code.includes("b.X(0,[5030,7581,4354]"));
  assert.equal((code.match(/distDir:\"\.next\"/g) || []).length, 1);
  assert(!code.includes("fresh-next-root"));
  const loaded = require(filename);
  const route = typeof loaded?.then === "function" ? await loaded : loaded;
  assert.equal(typeof route.default, "function");
  const result = { status: null, body: null };
  const response = {
    headersSent: false, writableEnded: false,
    setHeader() {},
    status(value) { result.status = value; return this; },
    json(value) { result.body = value; this.headersSent = true; this.writableEnded = true; return this; },
  };
  await route.default({ method: "POST", headers: {}, query: {} }, response);
  assert.equal(result.status, 405);
});
