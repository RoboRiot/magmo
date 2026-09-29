"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const root = path.resolve(here, "../../..");
const out = path.join(here, "build-workspace");
const frozen = JSON.parse(fs.readFileSync(path.join(here, "frozen-inputs.json"), "utf8"));
const directories = ["app", "components", "context", "lib", "pages", "public", "styles", "utils"];
const topFiles = ["next.config.js", "package.json", "package-lock.json"];
const functionFiles = fs.readdirSync(path.join(root, "functions"))
  .filter((name) => /\.(?:cjs|json)$/.test(name))
  .map((name) => path.join("functions", name));
const forbidden = /(^|\/)(?:\.env(?:\.|$)|.*(?:credential|service[-_]?account|firebase-adminsdk).*)(?:$|\/)/i;

assert(!fs.existsSync(out), "Preserve the existing isolated workspace for review.");
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), frozen.baselineArchiveSHA256);
for (const [relative, expected] of Object.entries(frozen.hashes)) {
  assert.equal(T.sha(fs.readFileSync(path.join(root, relative))), expected, `Frozen input drifted: ${relative}`);
}

const inventory = [];
function copy(relative) {
  const from = path.join(root, relative);
  const to = path.join(out, relative);
  const stat = fs.lstatSync(from);
  assert(!stat.isSymbolicLink(), `Symlink input is not allowed: ${relative}`);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const name of fs.readdirSync(from)) copy(path.join(relative, name));
    return;
  }
  assert(stat.isFile());
  const normalized = relative.replaceAll("\\", "/");
  assert(!forbidden.test(normalized), `Forbidden build input: ${normalized}`);
  const bytes = fs.readFileSync(from);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, bytes);
  inventory.push({ path: normalized, sha256: T.sha(bytes), bytes: bytes.length });
}

fs.mkdirSync(out, { recursive: true });
for (const relative of [...directories, ...topFiles, ...functionFiles]) copy(relative);
inventory.sort((a, b) => a.path.localeCompare(b.path));
for (const [relative, expected] of Object.entries(frozen.hashes)) {
  const copied = inventory.find((item) => item.path === relative.replaceAll("\\", "/"));
  assert(copied);
  assert.equal(copied.sha256, expected);
}
const report = {
  preparedAt: new Date().toISOString(),
  workspace: "build-workspace",
  files: inventory.length,
  inputs: inventory,
  forbiddenInputs: [],
};
fs.writeFileSync(path.join(here, "isolated-build-inputs.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ prepared: true, files: inventory.length, workspace: out }));
