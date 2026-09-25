"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const test = require("node:test");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const root = path.resolve(__dirname, "../..");
const report = require("./composition-report.json");
const source = path.join(__dirname, "source");
const out = path.join(__dirname, report.sourceDirectory);
const read = (file) => fs.readFileSync(file, "utf8");
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const plain = (value) => JSON.parse(JSON.stringify(value));
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);

function factory(directory, file, id) {
  const code = read(path.join(directory, file));
  let node;
  traverse(parser.parse(code), {
    ObjectProperty(candidate) {
      if (candidate.node.key.value === id) {
        assert(!node, `Ambiguous module ${id}`);
        node = candidate.node.value;
      }
    },
  });
  assert(node, `Module ${id}`);
  return code.slice(node.start, node.end);
}

function evaluate(text, dependencies, directory = out) {
  const module = { exports: {} };
  const requireModule = (id) => {
    assert(Object.hasOwn(dependencies, id), `Missing dependency ${id}`);
    return dependencies[id];
  };
  requireModule.d = (exports, getters) => {
    for (const [key, value] of Object.entries(getters)) {
      Object.defineProperty(exports, key, { get: value, enumerable: true });
    }
  };
  requireModule.n = (value) => () => value;
  requireModule.a = (loadedModule, callback) => callback((values) => values, (error) => { if (error) throw error; });
  const callable = new Function("require", "process", "Buffer", `return (${text});`)(
    require, { env: {}, cwd: () => directory }, Buffer
  );
  callable(module, module.exports, requireModule);
  return module.exports;
}

const ops = (name) => require(path.join(root, "lib/ops", `${name}.cjs`));
const packaged = (name) => require(path.join(out, "machine-link", `${name}.cjs`));
function loadContract(directory) {
  const importContract = evaluate(factory(directory, ".next/server/pages/api/ops/health.js", 44552), { 55511: crypto }, directory);
  return evaluate(factory(directory, ".next/server/chunks/6681.js", 16681), {
    55511: crypto,
    96784: ops("senderIdentity"),
    44552: importContract,
  }, directory);
}
const deployedContract = loadContract(out);

test("candidate differs from the fresh production snapshot in exactly helper and importer chunk", () => {
  assert.deepEqual(report.entries.map((entry) => entry.path), [
    "machine-link/workOrderMachineLink.cjs",
    ".next/server/chunks/8806.js",
  ]);
  const declared = new Map(report.entries.map((entry) => [entry.path, entry]));
  const beforeFiles = walk(source);
  const afterFiles = walk(out);
  assert.equal(afterFiles.length, beforeFiles.length);
  for (const file of beforeFiles) {
    const relative = path.relative(source, file).replaceAll("\\", "/");
    const next = path.join(out, relative);
    assert(fs.existsSync(next), relative);
    if (!declared.has(relative)) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(next)), relative);
    else {
      assert.equal(sha(fs.readFileSync(file)), declared.get(relative).before, relative);
      assert.equal(sha(fs.readFileSync(next)), declared.get(relative).after, relative);
    }
  }
  const overlay = report.overlay;
  const candidate = read(path.join(out, ".next/server/chunks/8806.js"));
  assert.equal(candidate.replace(overlay.newResolution, overlay.oldResolution)
    .replace(overlay.newReplay, overlay.oldReplay)
    .replace(overlay.newCompletion, overlay.oldCompletion),
  read(path.join(source, ".next/server/chunks/8806.js")));
  assert.equal(read(path.join(out, ".next/BUILD_ID")), report.unchangedBuildId);
});

test("packaged helper is the frozen reviewed source and nested-site release remains exact", () => {
  assert.equal(sha(fs.readFileSync(path.join(out, report.entries[0].path))),
    report.sourceHashes["lib/ops/workOrderMachineLink.cjs"]);
  assert.equal(sha(fs.readFileSync(path.join(out, "machine-link/workOrderSiteLink.cjs"))),
    report.preservedSiteHelperSHA256);
  assert.equal(report.preservedSiteHelperSHA256,
    "e62fda7488b4f7a5d60c67fd474f771e7b95b369863c2b5ff4f963ce12933f1f");
});

test("existing API capability gate remains byte-semantically unchanged", () => {
  const before = loadContract(source);
  assert.deepEqual(plain(deployedContract.runtimeCapabilities({})), plain(before.runtimeCapabilities({})));
  const capability = plain(deployedContract.runtimeCapabilities({})).bluefolderEquipmentLink;
  assert.deepEqual(capability, {
    version: "2026-09-24.1",
    equipmentIds: true,
    equipmentNames: true,
    existingOnly: true,
    preservesManualAssets: true,
    rejectsUnresolvedInventoryMachine: true,
  });
});

test("candidate contains no source-upload credential or environment files", () => {
  const forbidden = /(^|\/)(?:\.env(?:\..*)?|.*service-account.*\.json|.*credential.*\.json)$/i;
  for (const file of walk(out)) {
    const relative = path.relative(out, file).replaceAll("\\", "/");
    assert(!forbidden.test(relative), relative);
  }
});

// Run the complete matcher regression suite against the exact packaged helper.
{
  const filename = path.join(root, "test/work-order-machine-link.test.cjs");
  const replacements = {
    "../lib/ops/workOrderMachineLink.cjs": packaged("workOrderMachineLink"),
    "../lib/ops/blueFolderImportContract.cjs": packaged("blueFolderImportContract"),
    "../lib/ops/ingestContract.cjs": deployedContract,
  };
  new Function("require", "__dirname", "__filename", read(filename))(
    (request) => replacements[request] || require(request.startsWith(".")
      ? path.resolve(path.dirname(filename), request) : request),
    path.dirname(filename),
    filename
  );
}

function compiledWorkOrders(localRequire) {
  return evaluate(factory(out, ".next/server/chunks/8806.js", 78806), {
    7879: localRequire("firebase-admin/firestore"),
    52771: localRequire("../../context/FirebaseAdmin"),
    19298: {},
    96096: {},
    20574: ops("commandResponsibilityContract"),
    63378: ops("dispatchEvidencePolicy"),
    45516: ops("calendarSessionEvidence"),
    96784: ops("senderIdentity"),
    44552: packaged("blueFolderImportContract"),
    9413: ops("slackWatermark"),
    78320: ops("summaryProvenance"),
    78673: ops("remoteWorkEvidence"),
    63897: ops("messageRevision"),
    65282: packaged("trailerClientLinks"),
    75175: packaged("workOrderClientLink"),
    85033: packaged("clientDirectory"),
    19490: ops("messageLifecycle"),
  });
}

// Run the real import integration suite against module 78806 from the candidate,
// not against a source-level reimplementation.
{
  const filename = path.join(root, "test/work-order-machine-import.test.cjs");
  const original = read(filename);
  const marker = 'new Function("require", "module", "exports", code)';
  assert.equal(original.split(marker).length, 2);
  const modified = original.replace(marker,
    '((require, module) => { module.exports = { importOpsBlueFolderWorkOrder: compiledWorkOrders(require).JZ }; })');
  new Function("require", "__dirname", "compiledWorkOrders", modified)(
    require, path.dirname(filename), compiledWorkOrders
  );
}

test("reviewed local sources and tests remain frozen after composition", () => {
  for (const [relative, expected] of Object.entries(report.sourceHashes)) {
    assert.equal(sha(fs.readFileSync(path.join(root, relative))), expected, relative);
  }
});
