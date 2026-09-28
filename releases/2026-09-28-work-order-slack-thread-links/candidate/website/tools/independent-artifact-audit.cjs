"use strict";
// Independent in-memory ZIP + AST/byte audit. Does not import compose/factory tools,
// execute the candidate, contact the network, or modify either artifact tree.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), zlib = require("node:zlib");
const assert = require("node:assert/strict");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const here = __dirname, baselineRoot = path.join(here, "source"), candidateRoot = path.join(here, "scoped-source");
const sha = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const reportBytes = fs.readFileSync(path.join(here, "composition-report.json"));
const report = JSON.parse(reportBytes), baseline = JSON.parse(fs.readFileSync(path.join(here, "baseline.json")));
function tree(root) {
  const entries = new Map();
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      assert(!entry.isSymbolicLink(), "No symbolic links in artifact");
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else { assert(entry.isFile()); entries.set(path.relative(root, absolute).replaceAll("\\", "/"), fs.readFileSync(absolute)); }
    }
  }
  visit(root); return entries;
}
function zipEntries(bytes) {
  let end = -1;
  for (let position = bytes.length - 22; position >= Math.max(0, bytes.length - 65557); position--) {
    if (bytes.readUInt32LE(position) === 0x06054b50) { end = position; break; }
  }
  assert(end >= 0, "ZIP end record absent");
  assert.equal(bytes.readUInt16LE(end + 4), 0); assert.equal(bytes.readUInt16LE(end + 6), 0);
  const count = bytes.readUInt16LE(end + 10); assert(count > 0 && count < 65535);
  let offset = bytes.readUInt32LE(end + 16);
  const entries = new Map();
  for (let index = 0; index < count; index++) {
    assert.equal(bytes.readUInt32LE(offset), 0x02014b50);
    const flags = bytes.readUInt16LE(offset + 8), method = bytes.readUInt16LE(offset + 10);
    assert.equal(flags & 1, 0, "Encrypted ZIP entry unexpected");
    const compressed = bytes.readUInt32LE(offset + 20), size = bytes.readUInt32LE(offset + 24);
    const nameLength = bytes.readUInt16LE(offset + 28), extraLength = bytes.readUInt16LE(offset + 30), commentLength = bytes.readUInt16LE(offset + 32);
    const local = bytes.readUInt32LE(offset + 42);
    const name = bytes.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    assert(!name.includes("\\") && !path.isAbsolute(name) && !name.split("/").includes(".."), "Unsafe ZIP path");
    offset += 46 + nameLength + extraLength + commentLength;
    if (name.endsWith("/")) continue;
    assert(!entries.has(name), "Duplicate ZIP entry");
    assert.equal(bytes.readUInt32LE(local), 0x04034b50);
    const dataStart = local + 30 + bytes.readUInt16LE(local + 26) + bytes.readUInt16LE(local + 28);
    const encoded = bytes.subarray(dataStart, dataStart + compressed);
    const decoded = method === 0 ? encoded : method === 8 ? zlib.inflateRawSync(encoded) : assert.fail(`Unsupported ZIP method ${method}`);
    assert.equal(decoded.length, size);
    entries.set(name, decoded);
  }
  assert.equal(offset, bytes.readUInt32LE(end + 16) + bytes.readUInt32LE(end + 12));
  return entries;
}
function registry(code, mode) {
  const ast = parser.parse(code), objects = [];
  traverse(ast, { ObjectExpression(nodePath) {
    const node = nodePath.node;
    if (mode === "api") {
      const parent = nodePath.parent;
      if (parent.type !== "AssignmentExpression" || parent.left.type !== "MemberExpression" ||
          parent.left.object.type !== "Identifier" || parent.left.property.name !== "modules") return;
    } else if (!node.properties.some(prop => prop.type === "ObjectProperty" && prop.key.type === "NumericLiteral" && prop.key.value === 60992)) return;
    objects.push(node);
  } });
  assert.equal(objects.length, 1, "Exactly one module registry expected");
  const object = objects[0], modules = new Map();
  for (const property of object.properties) {
    assert.equal(property.type, "ObjectProperty"); assert.equal(property.key.type, "NumericLiteral");
    assert(["FunctionExpression", "ArrowFunctionExpression"].includes(property.value.type));
    assert(!modules.has(property.key.value));
    modules.set(property.key.value, code.slice(property.value.start, property.value.end));
  }
  return { modules, wrapper: code.slice(0, object.start) + "<REGISTRY>" + code.slice(object.end) };
}
function proveFactories(beforeCode, afterCode, mode, replaced, added) {
  const before = registry(beforeCode, mode), after = registry(afterCode, mode);
  assert.equal(after.wrapper, before.wrapper, "Loader/wrapper bytes outside registry changed");
  assert.deepEqual([...after.modules.keys()].filter(id => !added.includes(id)), [...before.modules.keys()]);
  assert.deepEqual([...after.modules.keys()].filter(id => !before.modules.has(id)).sort((a, b) => a - b), [...added].sort((a, b) => a - b));
  for (const [id, body] of before.modules) {
    if (replaced.includes(id)) assert.notEqual(after.modules.get(id), body, `Factory ${id} not changed`);
    else assert.equal(after.modules.get(id), body, `Unrelated factory ${id} changed`);
  }
  return { beforeCount: before.modules.size, afterCount: after.modules.size, replaced, added,
    preserved: [...before.modules.keys()].filter(id => !replaced.includes(id)),
    wrapperSHA256: sha(before.wrapper), hashes: Object.fromEntries([...after.modules].map(([id, body]) => [id, sha(body)])), before, after };
}

assert.equal(baseline.revision, "nextserverwest-00064-miz");
const archive = fs.readFileSync(path.join(here, "source.zip"));
assert.equal(sha(archive), "cbbfd0dc99d439b1110a25fc36cc455bed84771400feebbca9c2af8622b744f8");
assert.equal(sha(archive), baseline.archiveSHA256);
const zipped = zipEntries(archive), oldFiles = tree(baselineRoot), newFiles = tree(candidateRoot);
assert.deepEqual([...oldFiles.keys()].sort(), [...zipped.keys()].sort(), "Extracted baseline file set drifted from archive");
for (const [name, bytes] of zipped) assert(bytes.equals(oldFiles.get(name)), `Extracted baseline ${name} differs from actual ZIP`);
const removed = [...oldFiles.keys()].filter(name => !newFiles.has(name)); assert.deepEqual(removed, []);
const added = [...newFiles.keys()].filter(name => !oldFiles.has(name)).sort();
const changed = [...oldFiles.keys()].filter(name => !oldFiles.get(name).equals(newFiles.get(name))).sort();
const expectedAdded = [`.next/${report.newPage}`, `.next/static/${report.newBuildId}/_buildManifest.js`, `.next/static/${report.newBuildId}/_ssgManifest.js`].sort();
assert.deepEqual(added, expectedAdded); assert.deepEqual(added, report.added);
assert.deepEqual(changed, report.modified);
const apiPath = ".next/server/pages/api/items/work-order-add/slack.js";
const metadata = changed.filter(name => name !== apiPath);
assert.equal(metadata.length, 60); assert.deepEqual(metadata, report.metadataChanges);
assert.deepEqual(report.substitutions, [[path.basename(report.activePage), path.basename(report.newPage)], [baseline.buildId, report.newBuildId]]);
for (const name of metadata) {
  let expected = oldFiles.get(name).toString("utf8");
  for (const [before, after] of report.substitutions) expected = expected.split(before).join(after);
  assert.equal(newFiles.get(name).toString("utf8"), expected, `Metadata ${name} changed beyond approved literal substitutions`);
  let reversed = newFiles.get(name).toString("utf8");
  for (const [before, after] of [...report.substitutions].reverse()) reversed = reversed.split(after).join(before);
  assert.equal(reversed, oldFiles.get(name).toString("utf8"), `Metadata ${name} is not byte-reversible`);
}
const oldStatic = [...oldFiles.keys()].filter(name => name.startsWith(".next/static/"));
const sharedChunks = [...oldFiles.keys()].filter(name => name.startsWith(".next/server/chunks/"));
const otRoutes = [...oldFiles.keys()].filter(name => /(?:\/api\/ops\/(?:ot-|engineer-notifications)|\/pages\/Ops-General-|\/api\/cron\/magmonitor-alerts)/.test(name));
for (const name of [...oldStatic, ...sharedChunks, ...otRoutes]) assert(newFiles.get(name).equals(oldFiles.get(name)), `Preserved control ${name} changed`);
assert(newFiles.get(".next/server/pages/api/slack/add-to-list.js").equals(oldFiles.get(".next/server/pages/api/slack/add-to-list.js")));
for (const file of ["_buildManifest.js", "_ssgManifest.js"]) {
  let expected = oldFiles.get(`.next/static/${baseline.buildId}/${file}`).toString("utf8");
  for (const [before, after] of report.substitutions) expected = expected.split(before).join(after);
  assert.equal(newFiles.get(`.next/static/${report.newBuildId}/${file}`).toString("utf8"), expected);
}
const api = proveFactories(oldFiles.get(apiPath).toString(), newFiles.get(apiPath).toString(), "api", [10985, 99397], [97306, 92765]);
const ui = proveFactories(oldFiles.get(`.next/${report.activePage}`).toString(), newFiles.get(`.next/${report.newPage}`).toString(), "ui", [60992], []);
assert.equal(sha(newFiles.get(`.next/${report.newPage}`)), report.pageSHA256);
const oracleApi = registry(fs.readFileSync(path.join(here, "fresh-next-root/server/pages/api/items/work-order-add/slack.js"), "utf8"), "api");
for (const id of [10985, 99397, 97306, 92765]) assert.equal(api.after.modules.get(id), oracleApi.modules.get(id), `Changed factory ${id} differs from compiled oracle`);
const oldDispatch = registry(oldFiles.get(".next/server/pages/api/ops/service-requests.js").toString(), "api");
assert.equal(api.after.modules.get(92765), oldDispatch.modules.get(92765), "Embedded dispatch helper not exact previously active bytes");
const freshManifest = JSON.parse(fs.readFileSync(path.join(here, "fresh-next-root/build-manifest.json")));
const freshPage = freshManifest.pages["/NewSearch/mainSearch"].find(name => /pages\/NewSearch\/mainSearch-[^.]+\.js$/.test(name));
const oracleUi = registry(fs.readFileSync(path.join(here, "fresh-next-root", freshPage), "utf8"), "ui");
assert.equal(ui.after.modules.get(60992), oracleUi.modules.get(60992));
const forbidden = [...newFiles.keys()].filter(name => /(^|\/)(?:\.env(?:\.|$)|.*(?:service[-_]?account|firebase-adminsdk|credentials?\.(?:json|pem|key)).*)(?:$|\/)/i.test(name));
assert.deepEqual(forbidden, []);
const allChanged = Buffer.concat([...added, ...changed].map(name => newFiles.get(name)));
for (const value of ["fresh-next-root", "build-workspace", "C:\\Users\\mack2"]) assert(!allChanged.includes(Buffer.from(value)), `Build workspace path leaked: ${value}`);
const compact = ({ before, after, ...value }) => value;
const receipt = {
  checkedAt: new Date().toISOString(), result: "PASS", independentOfComposeHelpers: true,
  baselineRevision: baseline.revision, baselineArchiveSHA256: sha(archive), baselineArchiveEntriesMatchedByteForByte: zipped.size,
  compositionReportSHA256: sha(reportBytes), composeToolSHA256: sha(fs.readFileSync(path.join(here, "compose.cjs"))),
  beforeFiles: oldFiles.size, afterFiles: newFiles.size, deletedFiles: removed, addedFiles: added,
  modifiedFiles: changed.length, exactReversibleMetadataChanges: metadata.length,
  oldImmutableStaticFilesPreserved: oldStatic.length, sharedServerChunksPreserved: sharedChunks.length,
  preservedOtControls: otRoutes, originalSingleItemSlackSenderByteIdentical: true,
  apiRegistry: compact(api), uiRegistry: compact(ui), changedFactoriesMatchCompilerOracle: true,
  newDispatchHelperMatchesExistingActiveCopy: true,
  composeAlgorithmReview: { result: "PASS", blockers: [], notes: [
    "Copies captured baseline only; does not copy fresh compiler tree",
    "Exact registry replacements and additive helpers preserve route wrapper and loader bytes",
    "Immutable static assets remain; three candidate static assets added",
    "Metadata changes are literal reversible filename/build-ID substitutions, independently verified",
    "Intra-factory UI scope remains separately covered by AST topology proof"
  ] },
  forbiddenCredentialFilenames: forbidden, networkRequests: 0, databaseWrites: 0, slackPosts: 0,
  artifactTreeWrites: 0
};
fs.writeFileSync(path.join(here, "independent-artifact-review.json"), JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify(receipt, null, 2));
