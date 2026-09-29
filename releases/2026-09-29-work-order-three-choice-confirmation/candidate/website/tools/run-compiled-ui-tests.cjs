"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");

const here = __dirname;
const root = path.resolve(here, "../../..");
const nextRoot = path.join(here, "scoped-source-v3", ".next");
const receipt = path.join(here, "compiled-ui-verification-v3.json");
const playwright = "C:/Users/mack2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright";
assert(fs.existsSync(nextRoot));
assert(fs.existsSync(playwright));
assert(!fs.existsSync(receipt), "Preserve the existing compiled UI receipt.");
const allowed = [
  "ALLUSERSPROFILE", "APPDATA", "ComSpec", "HOMEDRIVE", "HOMEPATH", "LOCALAPPDATA",
  "NUMBER_OF_PROCESSORS", "OS", "Path", "PATHEXT", "PROCESSOR_ARCHITECTURE",
  "ProgramData", "ProgramFiles", "ProgramFiles(x86)", "SystemDrive", "SystemRoot", "TEMP",
  "TMP", "USERDOMAIN", "USERNAME", "USERPROFILE", "windir",
];
const env = Object.fromEntries(allowed.filter((key) => process.env[key] != null).map((key) => [key, process.env[key]]));
Object.assign(env, {
  WORK_ORDER_COMPILED_NEXT_ROOT: nextRoot,
  WORK_ORDER_COMPILED_UI_RECEIPT: receipt,
  PLAYWRIGHT_MODULE_PATH: playwright,
});
const result = spawnSync(process.execPath, ["--test", path.join(root, "test", "work-order-add-compiled-ui.browser.test.cjs")], {
  cwd: root,
  env,
  encoding: "utf8",
  windowsHide: true,
});
process.stdout.write(result.stdout || "");
process.stderr.write(result.stderr || "");
if (result.error) throw result.error;
assert.equal(result.status, 0);
const value = JSON.parse(fs.readFileSync(receipt, "utf8"));
assert.equal(value.result, "PASS");
assert.equal(value.productionRequests, 0);
assert.equal(value.productionWrites, 0);
console.log(JSON.stringify({ status: "PASS", receipt, scenarios: value.results.length, pageSHA256: value.pageSHA256 }));
