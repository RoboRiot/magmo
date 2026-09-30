"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { sha256 } = require("../../work-order-save-slack-confirmation-20260929/deployment/cloud-common.cjs");
const here = __dirname;
const root = path.resolve(here, "../../..");
const npmCli = path.join(path.dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");
const read = (name) => JSON.parse(fs.readFileSync(name, "utf8"));
const report = { checkedAt: new Date().toISOString(), productionMutations: 0, locks: {}, audits: {} };
for (const [name, before, after] of [
  ["production", path.join(here, "source"), path.join(here, "scoped-source")],
  ["root", path.join(here, "../prechange/root"), root],
  ["functions", path.join(here, "../prechange/functions"), path.join(root, "functions")],
]) {
  const oldPackage = read(name === "production" ? path.join(before, "package.json") : `${before}-package.json`);
  const oldLock = read(name === "production" ? path.join(before, "package-lock.json") : `${before}-package-lock.json`);
  const newPackage = read(path.join(after, "package.json"));
  const newLock = read(path.join(after, "package-lock.json"));
  const expectedPackage = structuredClone(oldPackage);
  delete expectedPackage.overrides["@google-cloud/storage"].gaxios;
  expectedPackage.overrides["@google-cloud/storage"]["gaxios@6.7.1"] = { uuid: "11.1.1" };
  assert.deepEqual(newPackage, expectedPackage, `${name}: unrelated package changes`);
  const changed = Object.keys(oldLock.packages).filter((key) => newLock.packages[key] && JSON.stringify(oldLock.packages[key]) !== JSON.stringify(newLock.packages[key]));
  const added = Object.keys(newLock.packages).filter((key) => !oldLock.packages[key]);
  const removed = Object.keys(oldLock.packages).filter((key) => !newLock.packages[key]);
  report.locks[name] = {
    packageSHA256: sha256(fs.readFileSync(path.join(after, "package.json"))),
    lockSHA256: sha256(fs.readFileSync(path.join(after, "package-lock.json"))),
    changed: changed.map((key) => ({ path: key, from: oldLock.packages[key].version, to: newLock.packages[key].version })),
    added: added.map((key) => ({ path: key, version: newLock.packages[key].version })),
    removed: removed.map((key) => ({ path: key, version: oldLock.packages[key].version })),
  };
}
for (const [name, cwd] of [["baseline", path.join(here, "source")], ["candidate", path.join(here, "scoped-source")]]) {
  const result = spawnSync(process.execPath, [npmCli, "audit", "--omit=dev", "--json", "--ignore-scripts"], { cwd, encoding: "utf8", timeout: 120000, windowsHide: true });
  assert(!result.error, result.error?.message);
  assert([0, 1].includes(result.status), `Audit ${name} exited ${result.status}`);
  const parsed = JSON.parse(result.stdout);
  assert(parsed.metadata?.vulnerabilities, `Audit ${name} missing metadata`);
  fs.writeFileSync(path.join(here, `npm-audit-${name}.json`), `${JSON.stringify(parsed, null, 2)}\n`);
  report.audits[name] = { totals: parsed.metadata.vulnerabilities, vulnerabilities: Object.fromEntries(Object.entries(parsed.vulnerabilities || {}).map(([pkg, v]) => [pkg, {severity:v.severity, via:v.via.map((x) => typeof x === "string" ? x : { title: x.title, url: x.url, range: x.range, severity: x.severity }), nodes:v.nodes, fixAvailable:v.fixAvailable}])) };
}
fs.writeFileSync(path.join(here, "dependency-review.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
