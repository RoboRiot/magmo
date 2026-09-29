"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const root = path.resolve(here, "../../..");
const file = (name) => path.join(here, name);
const scope = JSON.parse(fs.readFileSync(file("scope.json"), "utf8"));
const baseline = JSON.parse(fs.readFileSync(file("baseline.json"), "utf8"));
assert(!fs.existsSync(file("frozen-inputs.json")), "Do not overwrite frozen inputs.");
assert.equal(baseline.revision, "nextserverwest-00070-liw");
assert.equal(T.sha(fs.readFileSync(file("source.zip"))), baseline.archiveSHA256);

const paths = [...scope.inputs, ...scope.unchangedControls, ...scope.compilerInputs];
const hashes = Object.fromEntries(paths.map((relative) => [
  relative,
  T.sha(fs.readFileSync(path.join(root, relative))),
]));
for (const [relative, expected] of Object.entries(scope.expectedHashes)) {
  assert.equal(hashes[relative], expected, `Reviewed input drifted: ${relative}`);
}

const frozen = {
  frozenAt: new Date().toISOString(),
  baselineRevision: baseline.revision,
  baselineUpdateTime: baseline.updateTime,
  baselineGeneration: baseline.source.storageSource.generation,
  baselineArchiveSHA256: baseline.archiveSHA256,
  baselineConfigSHA256: baseline.configHash,
  scopeSHA256: T.sha(fs.readFileSync(file("scope.json"))),
  hashes,
  authorization: "isolated compiler and local artifact preparation only; no deployment",
};
fs.writeFileSync(file("frozen-inputs.json"), `${JSON.stringify(frozen, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify(frozen, null, 2));
