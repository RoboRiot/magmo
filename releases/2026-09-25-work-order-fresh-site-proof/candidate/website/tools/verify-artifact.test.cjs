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
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]);

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

function evaluate(text, dependencies, directory = out, runtimeRequire = require) {
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
  requireModule.a = (loaded, callback) => callback(
    (values) => values,
    (error) => { if (error) throw error; }
  );
  const callable = new Function(
    "require",
    "process",
    "Buffer",
    `return (${text});`
  )(runtimeRequire, { env: {}, cwd: () => directory }, Buffer);
  callable(module, module.exports, requireModule);
  return module.exports;
}

const ops = (name) => require(path.join(root, "lib/ops", `${name}.cjs`));
const packaged = (name) => require(path.join(out, "machine-link", `${name}.cjs`));

function loadContract(directory) {
  const importContract = evaluate(
    factory(directory, ".next/server/pages/api/ops/health.js", 44552),
    { 55511: crypto },
    directory
  );
  return evaluate(
    factory(directory, ".next/server/chunks/6681.js", 16681),
    {
      55511: crypto,
      96784: ops("senderIdentity"),
      44552: importContract,
    },
    directory
  );
}

const deployedContract = loadContract(out);

test("candidate differs from active 00060 in exactly the reviewed three-file overlay", () => {
  assert.deepEqual(report.entries.map((entry) => entry.path), [
    "machine-link/blueFolderCustomerLookup.cjs",
    "machine-link/workOrderSiteLink.cjs",
    ".next/server/chunks/8806.js",
  ]);
  const declared = new Map(report.entries.map((entry) => [entry.path, entry]));
  const beforeFiles = walk(source);
  const afterFiles = walk(out);
  assert.equal(afterFiles.length, beforeFiles.length + 1);
  for (const file of beforeFiles) {
    const relative = path.relative(source, file).replaceAll("\\", "/");
    const next = path.join(out, relative);
    assert(fs.existsSync(next), relative);
    if (!declared.has(relative)) {
      assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(next)), relative);
    } else {
      assert.equal(sha(fs.readFileSync(file)), declared.get(relative).before, relative);
      assert.equal(sha(fs.readFileSync(next)), declared.get(relative).after, relative);
    }
  }
  assert.equal(report.entries[0].before, null);
  assert(!fs.existsSync(path.join(source, report.entries[0].path)));
  let reversed = read(path.join(out, ".next/server/chunks/8806.js"));
  reversed = reversed
    .replace(report.overlay.newStart, report.overlay.oldStart)
    .replace(report.overlay.newGuard, report.overlay.oldGuard);
  assert.equal(reversed, read(path.join(source, ".next/server/chunks/8806.js")));
  assert.equal(read(path.join(out, ".next/BUILD_ID")), report.unchangedBuildId);
});

test("packaged helpers are exact reviewed sources and the 00060 machine guard is preserved", () => {
  assert.equal(
    sha(fs.readFileSync(path.join(out, "machine-link/blueFolderCustomerLookup.cjs"))),
    report.sourceHashes["lib/ops/blueFolderCustomerLookup.cjs"]
  );
  assert.equal(
    sha(fs.readFileSync(path.join(out, "machine-link/workOrderSiteLink.cjs"))),
    report.sourceHashes["lib/ops/workOrderSiteLink.cjs"]
  );
  assert.equal(
    sha(fs.readFileSync(path.join(out, "machine-link/workOrderMachineLink.cjs"))),
    report.preservedMachineHelperSHA256
  );
  assert.equal(
    report.preservedMachineHelperSHA256,
    "f8664402bfecd7ebb828fb44729c748671c86aa6aa31a090154a731f26463382"
  );
});

test("existing API capability remains unchanged", () => {
  const before = loadContract(source);
  assert.deepEqual(
    plain(deployedContract.runtimeCapabilities({})),
    plain(before.runtimeCapabilities({}))
  );
  assert.deepEqual(
    plain(deployedContract.runtimeCapabilities({})).bluefolderEquipmentLink,
    {
      version: "2026-09-24.1",
      equipmentIds: true,
      equipmentNames: true,
      existingOnly: true,
      preservesManualAssets: true,
      rejectsUnresolvedInventoryMachine: true,
    }
  );
});

test("candidate contains no source-upload credential or environment files", () => {
  const forbidden = /(^|\/)(?:\.env(?:\..*)?|.*service-account.*\.json|.*credential.*\.json)$/i;
  for (const file of walk(out)) {
    assert(!forbidden.test(path.relative(out, file).replaceAll("\\", "/")));
  }
});

function runTestFile(filename, replacements = {}) {
  new Function("require", "__dirname", "__filename", read(filename))(
    (request) => replacements[request] || require(
      request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request
    ),
    path.dirname(filename),
    filename
  );
}

runTestFile(path.join(root, "test/bluefolder-customer-lookup.test.cjs"), {
  "../lib/ops/blueFolderCustomerLookup.cjs": packaged("blueFolderCustomerLookup"),
});
runTestFile(path.join(root, "test/work-order-nested-site-link.test.cjs"), {
  "../lib/ops/workOrderSiteLink.cjs": packaged("workOrderSiteLink"),
});
runTestFile(path.join(root, "test/work-order-machine-link.test.cjs"), {
  "../lib/ops/workOrderMachineLink.cjs": packaged("workOrderMachineLink"),
  "../lib/ops/blueFolderImportContract.cjs": packaged("blueFolderImportContract"),
  "../lib/ops/ingestContract.cjs": deployedContract,
});

function compiledWorkOrders(localRequire, lookupOverride) {
  const runtimeRequire = (request) => {
    const normalized = String(request).replaceAll("\\", "/");
    if (normalized.endsWith("/machine-link/blueFolderCustomerLookup.cjs")) {
      return lookupOverride || packaged("blueFolderCustomerLookup");
    }
    return require(request);
  };
  return evaluate(
    factory(out, ".next/server/chunks/8806.js", 78806),
    {
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
    },
    out,
    runtimeRequire
  );
}

{
  const filename = path.join(root, "test/work-order-machine-import.test.cjs");
  const original = read(filename);
  const marker = 'new Function("require", "module", "exports", code)';
  assert.equal(original.split(marker).length, 2);
  const modified = original.replace(
    marker,
    '((require, module) => { module.exports = { importOpsBlueFolderWorkOrder: compiledWorkOrders(require, mocks["./blueFolderCustomerLookup.cjs"]).JZ }; })'
  );
  new Function("require", "__dirname", "compiledWorkOrders", modified)(
    require,
    path.dirname(filename),
    compiledWorkOrders
  );
}

test("reviewed local sources and tests remain frozen", () => {
  for (const [relative, expected] of Object.entries(report.sourceHashes)) {
    assert.equal(sha(fs.readFileSync(path.join(root, relative))), expected, relative);
  }
});
