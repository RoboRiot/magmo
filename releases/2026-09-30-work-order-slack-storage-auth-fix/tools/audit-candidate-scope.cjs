"use strict";
// Independent local AST/byte and dependency allowlist review. No production access.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const record = path.resolve(__dirname, "..");
const root = path.resolve(record, "../../../..");
const deployment = path.join(root, "tmp/work-order-slack-preparation-fix-20260930/deployment");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const read = file => fs.readFileSync(file, "utf8");
const json = file => JSON.parse(read(file));
const baseline = json(path.join(deployment, "baseline.json"));
const source = path.join(deployment, "source"), candidate = path.join(deployment, "scoped-source");
function inventory(directory, prefix = "") {
  const out = [];
  for (const entry of fs.readdirSync(path.join(directory, prefix), { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    assert(!entry.isSymbolicLink());
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) out.push(...inventory(directory, relative));
    else out.push({ path: relative, sha256: hash(fs.readFileSync(path.join(directory, relative))) });
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}
const before = inventory(source), after = inventory(candidate);
assert.deepEqual(after.map(f => f.path), before.map(f => f.path), "Candidate adds/removes unapproved production files");
const modified = after.filter((file, i) => file.sha256 !== before[i].sha256).map(f => f.path).sort();
const api = ".next/server/pages/api/items/work-order-add/slack.js";
assert.deepEqual(modified, [api, "package-lock.json", "package.json"].sort());
function factory(code) {
  const ast = parser.parse(code);
  const found = [];
  traverse(ast, { ObjectProperty(p) {
    if (p.node.key.type === "NumericLiteral" && p.node.key.value === 99397 &&
      ["ArrowFunctionExpression", "FunctionExpression"].includes(p.node.value.type)) found.push(p.node.value);
  } });
  assert.equal(found.length, 1);
  return found[0];
}
const oldCode = read(path.join(source, api)), newCode = read(path.join(candidate, api));
const oldFactory = factory(oldCode), newFactory = factory(newCode);
assert.equal(newCode, oldCode.slice(0, oldFactory.start) + newCode.slice(newFactory.start, newFactory.end) + oldCode.slice(oldFactory.end),
  "Bytes outside service factory 99397 changed");
const sourceFile = "lib/inventory/workOrderAddSlack.cjs";
const input = read(path.join(root, sourceFile));
assert.equal(hash(input), "d943a2fb7109ae359ae8b4a6f70ac58fd58352aef7f4d154c3d8ab015e985138");
const ast = parser.parse(input);
const requireMap = { "node:crypto": 77598, "./workOrderAddContract.cjs": 92631,
  "../items/itemEditorOperations.cjs": 42311, "./workOrderAddSlackThread.cjs": 97306 };
const mapped = [];
traverse(ast, { CallExpression(p) {
  if (p.node.callee.type !== "Identifier" || p.node.callee.name !== "require") return;
  const request = p.node.arguments[0];
  assert.equal(p.node.arguments.length, 1);
  assert.equal(request.type, "StringLiteral");
  assert(Object.hasOwn(requireMap, request.value));
  mapped.push(requireMap[request.value]);
  p.node.callee.name = "__webpack_require__";
  p.node.arguments = [{ type: "NumericLiteral", value: requireMap[request.value] }];
} });
assert.equal(mapped.length, 4);
assert.deepEqual(newFactory.params.map(p => p.name), ["module", "exports", "__webpack_require__"]);
const canonical = node => generate(node, { compact: true, comments: false }).code;
const factoryProgram = { ...ast.program, body: newFactory.body.body, directives: newFactory.body.directives };
assert.equal(canonical(factoryProgram), canonical(ast.program), "Compiled service differs from reviewed source");
const oldPackage = json(path.join(source, "package.json"));
const newPackage = json(path.join(candidate, "package.json"));
const expectedPackage = structuredClone(oldPackage);
delete expectedPackage.overrides["@google-cloud/storage"].gaxios;
expectedPackage.overrides["@google-cloud/storage"]["gaxios@6.7.1"] = { uuid: "11.1.1" };
assert.deepEqual(newPackage, expectedPackage);
const oldLock = json(path.join(source, "package-lock.json"));
const newLock = json(path.join(candidate, "package-lock.json"));
const { packages: oldEntries, ...oldMetadata } = oldLock;
const { packages: newEntries, ...newMetadata } = newLock;
assert.deepEqual(newMetadata, oldMetadata);
for (const [key, entry] of Object.entries(oldEntries)) assert.deepEqual(newEntries[key], entry, `Existing lock entry changed: ${key}`);
const added = Object.keys(newEntries).filter(key => !Object.hasOwn(oldEntries, key)).sort();
const expectedAdded = {
  "node_modules/@google-cloud/storage/node_modules/gaxios": "6.7.1",
  "node_modules/@google-cloud/storage/node_modules/node-fetch": "2.7.0",
  "node_modules/gtoken/node_modules/gaxios": "6.7.1",
  "node_modules/gtoken/node_modules/node-fetch": "2.7.0",
  "node_modules/is-stream": "2.0.1", "node_modules/tr46": "0.0.3",
  "node_modules/uuid": "11.1.1", "node_modules/webidl-conversions": "3.0.1",
  "node_modules/whatwg-url": "5.0.0",
};
assert.deepEqual(added, Object.keys(expectedAdded).sort());
for (const [key, version] of Object.entries(expectedAdded)) {
  assert.equal(newEntries[key].version, version);
  assert(newEntries[key].resolved.startsWith("https://registry.npmjs.org/"));
  assert(newEntries[key].integrity.startsWith("sha512-"));
}
const dependencyReview = json(path.join(deployment, "dependency-review.json"));
assert.deepEqual(dependencyReview.audits.candidate.totals, dependencyReview.audits.baseline.totals);
const report = {
  result: "PASS", checkedAt: new Date().toISOString(), reviewer: "slack_error_guardrails",
  baselineRevision: baseline.revision, baselineArchiveSHA256: baseline.archiveSHA256,
  baselineConfigHash: baseline.configHash, baselineFiles: before.length, candidateFiles: after.length,
  modified, added: [], removed: [], changedFactoryIds: [99397], sourceFile, sourceSHA256: hash(input),
  serviceFactorySHA256: hash(newCode.slice(newFactory.start, newFactory.end)), apiSHA256: hash(newCode),
  byteExactOutsideServiceFactory: true, reviewedSourceAstEquivalent: true, frontendAssetsUnchanged: true,
  inventorySaveCodeUnchanged: true, calendarAndLinkageFilesUnchanged: true,
  unchangedExistingLockEntries: Object.keys(oldEntries).length,
  dependencyAdditions: expectedAdded, additionalAuditFindings: 0,
  databaseWrites: 0, slackPosts: 0, productionMutations: 0,
};
fs.writeFileSync(path.join(deployment, "guardrails-scope-review.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
