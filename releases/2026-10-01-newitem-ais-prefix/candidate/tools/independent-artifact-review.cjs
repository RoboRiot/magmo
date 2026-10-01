"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const T = require("../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs");
const here = __dirname, read = (name) => fs.readFileSync(path.join(here, name), "utf8"), json = (name) => JSON.parse(read(name));
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const report = json("composition-report.json"), reportHash = hash(read("composition-report.json")), baseline = json("baseline.json");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const map = (directory) => new Map(walk(directory).map((file) => [path.relative(directory, file).replaceAll("\\", "/"), hash(fs.readFileSync(file))]));
const beforeDir = path.join(here, "source"), candidateDir = path.join(here, report.candidateDir), before = map(beforeDir), after = map(candidateDir);
assert.equal(hash(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
assert.equal(baseline.revision, "nextserverwest-00074-gax"); assert.equal(baseline.archiveSHA256, "4163f16a210b8221dd371e7ccf120a4b5063e54adac7d4d83cc08edde447aff1");
for (const [name, entries, actual] of [["baseline", json("baseline-files.json"), before], ["candidate", json("candidate-files.json"), after]]) {
  assert.equal(entries.length, actual.size, name); for (const entry of entries) assert.equal(actual.get(entry.path), entry.sha256, entry.path);
}
assert([...before.keys()].every((name) => after.has(name)), "No deleted files");
const modified = [...before].filter(([name, sha]) => after.get(name) !== sha).map(([name]) => name).sort();
const added = [...after.keys()].filter((name) => !before.has(name)).sort();
assert.deepEqual(modified, [...report.modified].sort()); assert.deepEqual(added, [...report.added].sort());
assert.equal(added.length, 3); assert.equal(before.size, 555); assert.equal(after.size, 558);
for (const [name, sha] of before) if (name.startsWith(".next/static/")) assert.equal(after.get(name), sha, "All old assets preserved");
assert.deepEqual(report.changedFactoryIds, [19967]); assert.deepEqual(report.newDependencies, []);
assert(modified.every((name) => name === ".next/BUILD_ID" || report.metadataChanges.includes(name)));
for (const name of report.metadataChanges) {
  let expected = read(`source/${name}`);
  for (const [from, to] of report.substitutions) expected = expected.split(from).join(to);
  assert.equal(read(`${report.candidateDir}/${name}`), expected, `Metadata-only substitutions ${name}`);
  for (const [from, to] of [...report.substitutions].reverse()) expected = expected.split(to).join(from);
  assert.equal(expected, read(`source/${name}`), `Reversible metadata ${name}`);
}
assert.equal(read(`${report.candidateDir}/.next/BUILD_ID`), report.buildId);
for (const name of ["_buildManifest.js", "_ssgManifest.js"]) {
  let expected = read(`source/.next/static/${report.oldBuildId}/${name}`);
  for (const [from, to] of report.substitutions) expected = expected.split(from).join(to);
  assert.equal(read(`${report.candidateDir}/.next/static/${report.buildId}/${name}`), expected);
}
const oldAsset = read(`source/.next/${report.oldPage}`), newAsset = read(`${report.candidateDir}/.next/${report.newPage}`);
const oldFactory = T.getFactory(oldAsset, 19967), newFactory = T.getFactory(newAsset, 19967);
assert.equal(hash(oldAsset), report.oldAssetSHA256); assert.equal(hash(newAsset), report.newAssetSHA256);
assert.equal(T.replaceOnce(newFactory, report.newBlock, report.oldBlock), oldFactory);
assert.equal(T.patchFactories(newAsset, { 19967: oldFactory }), oldAsset, "Entire page byte-exact inverse, including all helpers and wrapper");
assert.deepEqual([...T.requiredIds(newFactory)].sort(), [...T.requiredIds(oldFactory)].sort());
const oldGraph = T.graph(path.join(beforeDir, ".next"), report.route), graph = T.graph(path.join(candidateDir, ".next"), report.route);
assert.equal(oldGraph.size, graph.size);
for (const [id, source] of oldGraph) if (id !== 19967) assert.equal(graph.get(id), source, `Dependency unchanged ${id}`);
for (const id of T.requiredIds(newFactory)) assert(graph.has(id), `Required factory exists ${id}`);
assert(oldFactory.includes("i=t(37876)") && oldFactory.includes("o=t(44837)") && oldFactory.includes("m=t(58048)") && oldFactory.includes("[y,x]=(0,n.useState)"));
const source = fs.readFileSync(path.resolve(here, "../../..", report.sourcePath), "utf8");
assert.equal(hash(source), report.sourceSHA256); assert(source.includes(report.sourceJSX));
assert.equal(json("independent-source-review.json").sourceSHA256, report.sourceSHA256);
const jsx = (type, props) => ({ type, props });
function render(state, setter) { return new Function("i", "o", "m", "y", "x", `return ${report.newBlock};`)({ jsx, jsxs: jsx }, { A: { Group: "Group", Label: "Label", Control: "Control", Text: "Help" } }, { A: { Text: "Prefix" } }, state, setter); }
const flatten = (element) => element && typeof element === "object" ? [element, ...[].concat(element.props?.children || []).flatMap(flatten)] : [];
const cases = [["33551", "AIS33551"], ["AIS33551", "AIS33551"], [" ais-_ 33551 ", "AIS33551"], ["00004", "AIS00004"], ["AIS00004", "AIS00004"], ["0", "AIS0"], ["", ""], ["AIS", ""], ["abc", "AIS12345"], ["33X551", "AIS12345"], ["33.551", "AIS12345"], ["33 551", "AIS12345"], ["-33551", "AIS12345"], ["AIS-B00004", "AIS12345"]];
for (const [input, expected] of cases) {
  let state = { localSN: "AIS12345", other: "preserved" };
  const elements = flatten(render(state, (fn) => { state = fn(state); })), inputElement = elements.find((el) => el.type === "Control"), prefix = elements.find((el) => el.type === "Prefix");
  assert.equal(prefix.props.children, "AIS"); assert.equal(inputElement.props.type, "text"); assert.equal(inputElement.props.inputMode, "numeric"); assert.equal(inputElement.props.value, "12345");
  inputElement.props.onChange({ target: { value: input } }); assert.equal(state.localSN, expected); assert.equal(state.other, "preserved");
  assert.equal(flatten(render(state, () => {})).find((el) => el.type === "Control").props.value, expected.replace(/^AIS/, ""));
}
for (const name of ["index.js", "package.json", "package-lock.json", ".next/server/pages-manifest.json"]) assert.equal(before.get(name), after.get(name));
assert.equal(hash(read("firestore-before.rules")), "ea0411223d929c3e2147ff156a67b90ef79e4764e6a8615954cec84e6a055337");
assert.equal(hash(read("composition-report.json")), reportHash);
console.log(JSON.stringify({ result: "PASS", reviewedAt: new Date().toISOString(), buildId: report.buildId, baselineRevision: baseline.revision, baselineArchiveSHA256: baseline.archiveSHA256, compositionReportSHA256: reportHash, candidateManifestSHA256: hash(read("candidate-files.json")), sourceSHA256: report.sourceSHA256, candidateFiles: after.size, addedFiles: added, changedFactoryIds: [19967], oldAssetsPreserved: true, entirePageByteExactInverse: true, metadataByteExactInverse: true, allDependenciesUnchanged: true, compiledInputChecks: cases.length, saveAndDuplicateHelpersUnchanged: true, serverLogicChanged: false, cssChanged: false, rulesChanged: false, packagesChanged: false, productionActions: 0 }, null, 2));
