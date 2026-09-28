"use strict";
// Read-only verification. No authenticated application requests and no Slack,
// database, BlueFolder, inventory, rules, Hosting or configuration mutations.
const { fs, assert, file, json, sha256, configHash, getFunction, archiveHash, writeReceipt } = require("./cloud-common.cjs");
(async () => {
  const receipt = json("deployment-receipt.json"), report = json("composition-report.json"), baseline = json("baseline.json");
  assert.equal(receipt.state, "ACTIVE");
  const before = await getFunction(); assert.equal(before.state, "ACTIVE"); assert.equal(before.serviceConfig.revision, receipt.revision); assert.equal(before.updateTime, receipt.deployedUpdateTime); assert.deepEqual(before.buildConfig.source, receipt.deployedSource);
  assert.equal(configHash(before), baseline.configHash); assert.equal(await archiveHash(before), receipt.artifactSHA256);
  const checks = [];
  async function read(url, options = {}) { const response = await fetch(url, { ...options, cache: "no-store", signal: AbortSignal.timeout(30000) }); const data = Buffer.from(await response.arrayBuffer()); checks.push({ url, method: options.method || "GET", status: response.status }); return { response, data }; }
  const health = await read("https://magmo.cloud/api/ops/health"); assert.equal(health.response.status, 200);
  const page = await read("https://magmo.cloud/NewSearch/mainSearch"); assert.equal(page.response.status, 200); assert(page.data.toString().includes(report.newBuildId)); assert(page.data.toString().includes(report.newPage));
  const js = await read(`https://magmo.cloud/_next/${report.newPage}`); assert.equal(js.response.status, 200); assert.equal(sha256(js.data), report.pageSHA256);
  const css = await read(`https://magmo.cloud/_next/${report.newCss}`); assert.equal(css.response.status, 200); assert.equal(sha256(css.data), sha256(fs.readFileSync(file(`source/.next/${report.newCss}`))));
  for (const [route, method, status] of [["/api/items/work-order-add/slack", "GET", 405], ["/api/items/work-order-add/slack", "POST", 401], ["/api/slack/add-to-list", "GET", 405], ["/api/items/work-order-add/confirm", "GET", 405], ["/api/items/work-order-add/options", "POST", 405]]) {
    const result = await read("https://magmo.cloud" + route, method === "POST" ? { method, headers: { "Content-Type": "application/json" }, body: "{}" } : { method }); assert.equal(result.response.status, status, route);
  }
  const after = await getFunction(); assert.equal(after.updateTime, before.updateTime); assert.deepEqual(after.buildConfig.source, before.buildConfig.source); assert.equal(configHash(after), baseline.configHash);
  const result = { result: "PASS", checkedAt: new Date().toISOString(), revision: receipt.revision, source: receipt.deployedSource, buildId: report.newBuildId, artifactSHA256: receipt.artifactSHA256, configHash: baseline.configHash, pageSHA256: report.pageSHA256, cssSHA256: sha256(css.data), checks, authenticatedApplicationRequests: 0, databaseWrites: 0, liveSlackPosts: 0, configurationPreserved: true };
  writeReceipt("live-verification.json", result); console.log(JSON.stringify(result, null, 2));
})().catch((error) => { console.error(JSON.stringify({ error: "live_verification_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined })); process.exitCode = 1; });
