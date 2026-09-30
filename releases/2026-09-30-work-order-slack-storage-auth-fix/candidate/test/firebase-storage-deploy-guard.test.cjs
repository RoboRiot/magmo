"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const filename = path.resolve(__dirname, "../scripts/verify-firebase-build.js");
function run(storageStatus) {
  const calls = [], messages = [];
  const source = fs.readFileSync(filename, "utf8");
  const fakeRequire = (name) => {
    if (name === "fs") return {
      existsSync: value => String(value).endsWith("BUILD_ID"),
      readFileSync: () => "synthetic-build",
    };
    if (name === "path") return path;
    if (name === "child_process") return { spawnSync: (exe, args, options) => {
      calls.push({ exe, args, options });
      return { status: args.some(arg => String(arg).includes("storage-adc-compatibility.test.cjs")) ? storageStatus : 0 };
    } };
    throw new Error("Unexpected import");
  };
  fakeRequire.resolve = name => name;
  let exitCode = null;
  try {
    vm.runInNewContext(source, {
      require: fakeRequire, __dirname: path.dirname(filename),
      process: { execPath: "synthetic-node", env: { STORAGE_ADC_CANDIDATE_ROOT: "must-not-override-real-build" }, exit: code => { exitCode = code; throw new Error("STOP"); } },
      console: { log: text => messages.push(text), error: text => messages.push(text) },
    }, { filename });
  } catch(error) { if (error.message !== "STOP") throw error; }
  return { calls, messages, exitCode };
}

test("Firebase build checks installed Storage ADC graphs before declaring deployable", () => {
  const result = run(0);
  assert.equal(result.exitCode, null);
  assert.equal(result.calls.length, 2);
  assert.match(result.calls[0].args[0], /verify-magmonitor-ingest-build/);
  assert.equal(result.calls[1].args[0], "--test");
  assert.match(result.calls[1].args[1], /storage-adc-compatibility\.test\.cjs$/);
  assert.equal(result.calls[1].options.env.STORAGE_ADC_CANDIDATE_ROOT, "");
  assert(result.messages.some(message => /is deployable/.test(message)));
});

test("Firebase build refuses deployment when Storage cloud authentication fails", () => {
  const result = run(1);
  assert.equal(result.exitCode, 1);
  assert(result.messages.some(message => /Cloud Storage ADC compatibility regression failed/.test(message)));
  assert(!result.messages.some(message => /is deployable/.test(message)));
});
