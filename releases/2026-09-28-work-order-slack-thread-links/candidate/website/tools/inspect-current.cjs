"use strict";
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { client, request } = require("../../ops-reliability-20260922/cloud.cjs");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object"
  ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig), build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha256(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
(async () => {
  const url = "https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest";
  const fn = await request(url);
  assert.equal(fn.state, "ACTIVE");
  const storage = fn.buildConfig.source.storageSource;
  const { data } = await client.request({ url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`, params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000 });
  const after = await request(url);
  assert.equal(after.updateTime, fn.updateTime);
  assert.deepEqual(after.buildConfig.source, fn.buildConfig.source);
  assert.equal(configHash(after), configHash(fn));
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), revision: fn.serviceConfig.revision, updateTime: fn.updateTime, source: fn.buildConfig.source, runtime: fn.buildConfig.runtime, entryPoint: fn.buildConfig.entryPoint, configHash: configHash(fn), archiveSHA256: sha256(Buffer.from(data)), archiveBytes: Buffer.from(data).length, mutations: 0 }, null, 2));
})().catch((error) => { console.error(JSON.stringify({ error: "read_only_inspection_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined })); process.exitCode = 1; });
