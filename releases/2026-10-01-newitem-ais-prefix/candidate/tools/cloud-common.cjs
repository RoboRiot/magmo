"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { client, request } = require("../../ops-reliability-20260922/cloud.cjs");

const CF = "https://cloudfunctions.googleapis.com/v2/";
const parent = "projects/magmo-ac10c/locations/us-west2";
const functionName = `${parent}/functions/nextServerWest`;
const file = (name) => path.join(__dirname, name);
const json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value)
  ? value.map(stable)
  : value && typeof value === "object"
    ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]))
    : value;

function configHash(fn) {
  const service = structuredClone(fn.serviceConfig);
  const build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha256(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
async function getFunction() { return request(CF + functionName); }
async function archiveHash(fn) {
  const source = fn.buildConfig.source.storageSource;
  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${source.bucket}/o/${encodeURIComponent(source.object)}`,
    params: { alt: "media", generation: source.generation },
    responseType: "arraybuffer",
    timeout: 60_000,
  });
  return sha256(Buffer.from(data));
}
function checkBaseline(fn, baseline) {
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.serviceConfig.revision, baseline.revision);
  assert.equal(fn.updateTime, baseline.updateTime);
  assert.deepEqual(fn.buildConfig.source, baseline.source);
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  assert.equal(configHash(fn), baseline.configHash);
}
function writeReceipt(name, value, create = false) {
  fs.writeFileSync(file(name), `${JSON.stringify(value, null, 2)}\n`, create ? { flag: "wx" } : undefined);
}

module.exports = { fs, path, assert, client, request, CF, parent, functionName, file, json, sha256, configHash, getFunction, archiveHash, checkBaseline, writeReceipt };
