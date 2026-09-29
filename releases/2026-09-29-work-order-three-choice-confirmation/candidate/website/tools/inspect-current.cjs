"use strict";

const assert = require("node:assert/strict");
const {
  getFunction,
  configHash,
} = require("../../work-order-link-coverage-20260929/deployment/cloud-common.cjs");

(async () => {
  const fn = await getFunction();
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  const source = fn.buildConfig.source?.storageSource;
  assert(source?.bucket && source?.object && source?.generation);
  console.log(JSON.stringify({
    checkedAt: new Date().toISOString(),
    name: fn.name,
    state: fn.state,
    revision: fn.serviceConfig?.revision,
    updateTime: fn.updateTime,
    source: {
      bucket: source.bucket,
      object: source.object,
      generation: source.generation,
    },
    runtime: fn.buildConfig.runtime,
    entryPoint: fn.buildConfig.entryPoint,
    timeoutSeconds: fn.serviceConfig?.timeoutSeconds,
    configHash: configHash(fn),
  }, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({
    error: "current_function_read_failed",
    code: error?.code || null,
    status: error?.response?.status || null,
  }));
  process.exitCode = 1;
});
