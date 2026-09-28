"use strict";
// This private distDir is a compiler oracle only, NEVER the deployment tree.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process"), { loadEnvConfig } = require("@next/env");
const here = __dirname, root = path.resolve(here, "../../.."), output = path.join(here, "fresh-next-root"), sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const frozen = JSON.parse(fs.readFileSync(path.join(here, "frozen-inputs.json"), "utf8"));
function verify() {
  assert.equal(sha256(fs.readFileSync(path.join(here, "source.zip"))), frozen.baselineArchiveSHA256);
  for (const [relative, hash] of Object.entries({ ...frozen.inputs, ...frozen.controls, ...frozen.dependencies, ...frozen.compilerInputs })) assert.equal(sha256(fs.readFileSync(path.join(root, relative))), hash, `Frozen source changed: ${relative}`);
}
verify();
assert(!fs.existsSync(output), "Preserve an existing compiler oracle.");
const before = { ...process.env };
loadEnvConfig(root, false, { info() {}, error() {} });
const browserKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
assert(browserKey, "Public Firebase browser key is unavailable.");
const keys = ["ALLUSERSPROFILE", "APPDATA", "ComSpec", "HOMEDRIVE", "HOMEPATH", "LOCALAPPDATA", "NUMBER_OF_PROCESSORS", "OS", "Path", "PATHEXT", "PROCESSOR_ARCHITECTURE", "ProgramData", "ProgramFiles", "ProgramFiles(x86)", "SystemDrive", "SystemRoot", "TEMP", "TMP", "USERDOMAIN", "USERNAME", "USERPROFILE", "windir"];
const env = Object.fromEntries(keys.filter((key) => before[key] != null).map((key) => [key, before[key]]));
Object.assign(env, { NEXT_PUBLIC_FIREBASE_API_KEY: browserKey, NEXT_DIST_DIR: "tmp/work-order-slack-thread-link-20260928/deployment/fresh-next-root", NEXT_TELEMETRY_DISABLED: "1", __NEXT_PROCESSED_ENV: "true" });
const result = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], { cwd: root, env, encoding: "utf8", stdio: "inherit", windowsHide: true });
if (result.error) throw result.error;
if (result.status !== 0) process.exitCode = result.status || 1;
else { verify(); console.log(JSON.stringify({ compilerOnly: true, sourceHashesPreserved: true, rootBuildUntouched: true, output })); }
