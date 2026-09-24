"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");
(async () => {
  const url = "https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest";
  const fn = await request(url);
  assert.equal(fn.state, "ACTIVE");
  const storage = fn.buildConfig.source.storageSource;
  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`,
    params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000,
  });
  const latest = await request(url);
  assert.equal(latest.updateTime, fn.updateTime, "Production changed during snapshot");
  assert.deepEqual(latest.buildConfig.source, fn.buildConfig.source);
  const bytes = Buffer.from(data);
  assert(!fs.existsSync(path.join(__dirname, "source.zip")), "Never overwrite baseline");
  fs.writeFileSync(path.join(__dirname, "source.zip"), bytes);
  const baseline = { checkedAt: new Date().toISOString(), revision: fn.serviceConfig.revision, updateTime: fn.updateTime,
    source: fn.buildConfig.source, archiveSHA256: crypto.createHash("sha256").update(bytes).digest("hex"),
    runtime: fn.buildConfig.runtime, entryPoint: fn.buildConfig.entryPoint };
  fs.writeFileSync(path.join(__dirname, "baseline.json"), JSON.stringify(baseline, null, 2));
  console.log(JSON.stringify(baseline, null, 2));
})().catch((error) => { console.error(JSON.stringify({ error: "snapshot_failed", status: error.response?.status || null })); process.exitCode = 1; });
