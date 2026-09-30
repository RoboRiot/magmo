"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname;
const root = path.resolve(here, "../../..");
const source = path.join(here, "source");
const candidate = path.join(here, "scoped-source");
const api = ".next/server/pages/api/items/work-order-add/slack.js";
const input = "lib/inventory/workOrderAddSlack.cjs";
const approvedSourceSHA256 = "d943a2fb7109ae359ae8b4a6f70ac58fd58352aef7f4d154c3d8ab015e985138";
const baseline = JSON.parse(T.read(path.join(here, "baseline.json")));
const baselineFiles = JSON.parse(T.read(path.join(here, "baseline-files.json")));
const oldCode = T.read(path.join(source, api));
const sourceCode = T.read(path.join(root, input));
assert.equal(T.sha(sourceCode), approvedSourceSHA256, "Unreviewed service source drift");
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
const map = {
  "node:crypto": 77598,
  "./workOrderAddContract.cjs": 92631,
  "../items/itemEditorOperations.cjs": 42311,
  "./workOrderAddSlackThread.cjs": 97306,
};
const oldFactory = T.getFactory(oldCode, 99397);
assert.deepEqual([...T.requiredIds(oldFactory)].sort((a,b)=>a-b), Object.values(map).sort((a,b)=>a-b));
assert(!sourceCode.includes("__webpack_require__"), "Unexpected source binding");
const ast = parser.parse(sourceCode, { sourceType: "script" });
const mapped = [];
traverse(ast, {
  CallExpression(p) {
    if (p.node.callee.type !== "Identifier" || p.node.callee.name !== "require") return;
    assert.equal(p.node.arguments.length, 1);
    const request = p.node.arguments[0];
    assert.equal(request.type, "StringLiteral");
    assert(Object.hasOwn(map, request.value), `Unapproved dependency ${request.value}`);
    mapped.push({ request: request.value, id: map[request.value] });
    p.node.callee.name = "__webpack_require__";
    p.node.arguments = [{ type: "NumericLiteral", value: map[request.value] }];
  },
});
assert.equal(mapped.length, 4);
const factory = `(module,exports,__webpack_require__)=>{${generate(ast, { compact: true, comments: false }).code}}`;
parser.parseExpression(factory);
const newCode = T.patchFactories(oldCode, { 99397: factory });
const oldFactories = new Map(T.factories(oldCode).map((f)=>[f.id,f.source]));
const newFactories = new Map(T.factories(newCode).map((f)=>[f.id,f.source]));
assert.deepEqual([...newFactories.keys()], [...oldFactories.keys()]);
for (const [id, value] of oldFactories) if (id !== 99397) assert.equal(newFactories.get(id), value);
assert.deepEqual(T.loaderChunks(newCode), T.loaderChunks(oldCode));
fs.writeFileSync(path.join(candidate, api), newCode);
const candidateFiles = baselineFiles.map((file) => {
  const bytes = fs.readFileSync(path.join(candidate, file.path));
  return { path: file.path, sha256: T.sha(bytes), bytes: bytes.length };
});
const modified = candidateFiles.filter((f)=>f.sha256!==baselineFiles.find((b)=>b.path===f.path).sha256).map((f)=>f.path).sort();
assert.deepEqual(modified, [api, "package-lock.json", "package.json"].sort());
const packageOld = JSON.parse(T.read(path.join(source, "package.json")));
const packageNew = JSON.parse(T.read(path.join(candidate, "package.json")));
delete packageOld.overrides["@google-cloud/storage"].gaxios;
packageOld.overrides["@google-cloud/storage"]["gaxios@6.7.1"] = { uuid: "11.1.1" };
assert.deepEqual(packageNew, packageOld);
const report = {
  composedAt: new Date().toISOString(), baselineRevision: baseline.revision,
  baselineArchiveSHA256: baseline.archiveSHA256, baselineConfigHash: baseline.configHash,
  sourceFile: input, sourceSHA256: approvedSourceSHA256, api,
  changedFactoryIds: [99397], mappedRequires: mapped, serviceFactorySHA256: T.sha(factory),
  oldServiceFactorySHA256: T.sha(oldFactory), apiSHA256: T.sha(newCode),
  sharedChunksUnchanged: true, unrelatedFactoriesPreserved: true,
  frontendAssetsUnchanged: true, buildIdUnchanged: true, allLinkageAndCalendarFilesPreserved: true,
  modified, added: [], removed: [], noDeletedFiles: true, unrelatedFilesPreserved: true,
  runtimeConfigChanged: false, files: candidateFiles.length,
  databaseWrites: 0, slackPosts: 0,
};
fs.writeFileSync(path.join(here, "candidate-files.json"), `${JSON.stringify(candidateFiles,null,2)}\n`);
fs.writeFileSync(path.join(here, "composition-report.json"), `${JSON.stringify(report,null,2)}\n`);
console.log(JSON.stringify(report,null,2));
