"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { loadEnvConfig } = require("@next/env");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const root = path.resolve(here, "../../..");
const workspace = path.join(here, "build-workspace");
const output = path.join(workspace, ".next-oracle");
const frozen = JSON.parse(fs.readFileSync(path.join(here, "frozen-inputs.json"), "utf8"));
assert(fs.existsSync(workspace), "Prepare the isolated workspace first.");
assert(!fs.existsSync(output), "Preserve the existing compiler oracle for review.");
for (const [relative, expected] of Object.entries(frozen.hashes)) {
  assert.equal(T.sha(fs.readFileSync(path.join(workspace, relative))), expected, `Isolated frozen input drifted: ${relative}`);
}

const before = { ...process.env };
loadEnvConfig(root, false, { info() {}, error() {} });
const browserKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
assert(browserKey, "The public Firebase browser key is unavailable.");
const allowed = [
  "ALLUSERSPROFILE", "APPDATA", "ComSpec", "HOMEDRIVE", "HOMEPATH", "LOCALAPPDATA",
  "NUMBER_OF_PROCESSORS", "OS", "Path", "PATHEXT", "PROCESSOR_ARCHITECTURE",
  "ProgramData", "ProgramFiles", "ProgramFiles(x86)", "SystemDrive", "SystemRoot", "TEMP",
  "TMP", "USERDOMAIN", "USERNAME", "USERPROFILE", "windir",
];
const env = Object.fromEntries(allowed.filter((key) => before[key] != null).map((key) => [key, before[key]]));
Object.assign(env, {
  NEXT_PUBLIC_FIREBASE_API_KEY: browserKey,
  NEXT_DIST_DIR: ".next-oracle",
  NEXT_TELEMETRY_DISABLED: "1",
  __NEXT_PROCESSED_ENV: "true",
});
const cli = path.join(root, "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [cli, "build", "--webpack"], {
  cwd: workspace,
  env,
  encoding: "utf8",
  stdio: "inherit",
  windowsHide: true,
});
if (result.error) throw result.error;
assert.equal(result.status, 0, `Next compiler exited ${result.status}`);
for (const [relative, expected] of Object.entries(frozen.hashes)) {
  assert.equal(T.sha(fs.readFileSync(path.join(workspace, relative))), expected, `Compiler changed frozen input: ${relative}`);
}
console.log(JSON.stringify({ compilerOnly: true, isolated: true, output, productionWrites: 0 }));
