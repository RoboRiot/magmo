"use strict";

// Independent read-only post-release checks. Never authenticates as an app user,
// sends to Slack, confirms inventory, or mutates production configuration.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { request } = require("./ops-reliability-20260922/cloud.cjs");
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const stable = value => Array.isArray(value) ? value.map(stable) :
  value && typeof value === "object" ? Object.fromEntries(
    Object.keys(value).sort().map(key => [key, stable(value[key])])) : value;
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig);
  const build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
const [revision, buildId, pageSHA256, cssSHA256] = process.argv.slice(2);
assert(/^nextserverwest-\d{5}-[a-z0-9]+$/.test(revision || ""), "Reviewed revision required");
assert(/^[\w-]+$/.test(buildId || ""), "Reviewed build ID required");
assert(/^[a-f0-9]{64}$/.test(pageSHA256 || ""), "Reviewed page hash required");
assert(/^[a-f0-9]{64}$/.test(cssSHA256 || ""), "Reviewed CSS hash required");
const origin = "https://magmo.cloud";
const functionUrl = "https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest";
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname,
  "work-order-warehouse-slack-20260925/deployment/baseline.json"), "utf8"));
const get = async (relative, options = {}) => fetch(new URL(relative, origin), {
  ...options, redirect: "error", signal: AbortSignal.timeout(30000),
});

(async () => {
  const fn = await request(functionUrl);
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.serviceConfig.revision, revision);
  assert.equal(configHash(fn), baseline.configHash, "Runtime configuration changed");
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  const response = await get(`/NewSearch/mainSearch?warehouseSlackVerification=${Date.now()}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const data = JSON.parse(html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1] || "null");
  assert.equal(data?.buildId, buildId, "Public HTML serves another build");
  const scriptPaths = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]);
  const pagePath = scriptPaths.find(value => /\/pages\/NewSearch\/mainSearch-[^/]+\.js$/.test(value));
  assert(pagePath, "Main-search asset missing");
  const pageResponse = await get(pagePath);
  assert.equal(pageResponse.status, 200);
  const page = Buffer.from(await pageResponse.arrayBuffer());
  assert.equal(sha(page), pageSHA256, "Public page asset differs from reviewed bytes");
  for (const text of ["Send saved items to Slack?", "/api/items/work-order-add/slack", "Yes, save changes"])
    assert(page.includes(Buffer.from(text)), `Missing reviewed UI behavior: ${text}`);
  const cssPaths = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(match => match[1]);
  let matchedCssPath;
  for (const cssPath of [...new Set(cssPaths)]) {
    const css = await get(cssPath);
    assert.equal(css.status, 200);
    if (sha(Buffer.from(await css.arrayBuffer())) === cssSHA256) matchedCssPath = cssPath;
  }
  assert(matchedCssPath, "Reviewed popup CSS is not referenced/served");
  const checks = [];
  for (const [route, method, expected] of [
    ["/api/items/work-order-add/slack", "GET", 405],
    ["/api/items/work-order-add/slack", "POST", 401],
    ["/api/items/work-order-add/confirm", "GET", 405],
    ["/api/items/work-order-add/options", "GET", 401],
  ]) {
    const response = await get(route, method === "POST" ? {
      method, headers: { "Content-Type": "application/json" }, body: "{}",
    } : { method });
    assert.equal(response.status, expected, `${method} ${route}`);
    checks.push({ route, method, status: response.status, expected });
  }
  const finalFn = await request(functionUrl);
  assert.equal(finalFn.updateTime, fn.updateTime, "Production changed during verification");
  assert.equal(finalFn.serviceConfig.revision, revision);
  assert.equal(configHash(finalFn), baseline.configHash);
  const receipt = { checkedAt: new Date().toISOString(), readOnly: true, result: "PASS",
    revision, buildId, configHash: configHash(fn), configurationUnchanged: true,
    origin, pagePath, pageSHA256, cssPath: matchedCssPath, cssSHA256, checks,
    authenticatedAppRequests: 0, databaseWrites: 0, slackPosts: 0 };
  const output = path.join(__dirname, "warehouse-slack-release-independent-verification-20260925.json");
  fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + "\n");
  console.log(JSON.stringify(receipt, null, 2));
})().catch(error => {
  console.error(JSON.stringify({ result: "FAIL", status: error?.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : "Read-only check failed" }));
  process.exitCode = 1;
});
