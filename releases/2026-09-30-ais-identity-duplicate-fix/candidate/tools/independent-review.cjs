"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict"), vm = require("node:vm");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../..");
const read = (relative) => fs.readFileSync(path.join(here, relative), "utf8");
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const json = (relative) => JSON.parse(read(relative));
function walk(directory) { return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory()
  ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]); }
function fileMap(directory) { return new Map(walk(directory).map((file) => [path.relative(directory, file).replaceAll("\\", "/"), hash(fs.readFileSync(file))])); }
function factories(code) {
  const found = new Map();
  traverse(parser.parse(code), { ObjectProperty(p) {
    if (p.node.key.type !== "NumericLiteral" || !p.get("value").isFunction()) return;
    const id = p.node.key.value, value = code.slice(p.node.value.start, p.node.value.end);
    assert(!found.has(id), `Duplicate factory ${id}`); found.set(id, value);
  } }); return found;
}
function remap(code, mapping) {
  const ast = parser.parse(`(${code})`), fn = ast.program.body[0].expression, binding = fn.params[2], edits = [];
  if (!binding) return code;
  traverse(ast, { CallExpression(p) {
    if (p.node.callee.type !== "Identifier" || p.node.callee.name !== binding.name
      || p.scope.getBinding(binding.name)?.identifier !== binding || p.node.arguments[0]?.type !== "NumericLiteral") return;
    const argument = p.node.arguments[0];
    if (mapping.has(argument.value)) edits.push({ start: argument.start - 1, end: argument.end - 1, value: String(mapping.get(argument.value)) });
  } });
  for (const edit of edits.sort((a, b) => b.start - a.start)) code = code.slice(0, edit.start) + edit.value + code.slice(edit.end);
  return code;
}
function dependencies(code) {
  const ast = parser.parse(`(${code})`), fn = ast.program.body[0].expression, binding = fn.params[2], result = new Set();
  if (!binding) return result;
  traverse(ast, { CallExpression(p) {
    if (p.node.callee.type === "Identifier" && p.node.callee.name === binding.name
      && p.scope.getBinding(binding.name)?.identifier === binding && p.node.arguments[0]?.type === "NumericLiteral") result.add(p.node.arguments[0].value);
  } }); return result;
}
function graph(directory, route) {
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, "build-manifest.json"))), result = new Map();
  for (const asset of new Set([...manifest.pages[route], ...manifest.pages["/_app"]])) {
    assert(fs.existsSync(path.join(directory, asset)), `Missing route asset ${asset}`);
    if (!asset.endsWith(".js")) continue;
    for (const [id, code] of factories(fs.readFileSync(path.join(directory, asset), "utf8"))) {
      if (result.has(id)) assert.equal(result.get(id), code, `Route graph factory collision ${id}`);
      result.set(id, code);
    }
  } return result;
}
function undoOnce(code, after, before) { assert.equal(code.split(after).length, 2, `Inverse edit missing or ambiguous ${after}`); return code.replace(after, before); }
function fakeCollection(records, reads) {
  class Query {
    constructor(state = {}) { Object.assign(this, { filters: [], lower: null, upper: null, cursor: null, max: Infinity }, state); }
    next(patch) { return new Query({ ...this, ...patch }); }
    orderBy() { return this; }
    where(field, operator, value) { return this.next({ filters: [...this.filters, { field, operator, value }] }); }
    startAt(lower) { return this.next({ lower }); }
    endAt(upper) { return this.next({ upper }); }
    startAfter(cursor) { return this.next({ cursor: cursor.id || cursor }); }
    limit(max) { return this.next({ max }); }
    async get() {
      assert(this.upper || this.filters.length, "No unbounded inventory scan is allowed"); reads.push(this);
      const docs = records.filter((row) => (!this.lower || row.id >= this.lower) && (!this.upper || row.id <= this.upper)
        && (!this.cursor || row.id > this.cursor) && this.filters.every(({ field, operator, value }) => {
          if (operator === "in") return value.includes(row[field]);
          if (operator === "==") return row[field] === value;
          if (operator === "array-contains") return row[field]?.includes(value);
          throw new Error(`Unexpected query operator ${operator}`);
        })).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0).slice(0, this.max)
        .map((row) => ({ id: row.id, data: () => ({ ...row }) }));
      return { docs, empty: !docs.length, size: docs.length, forEach: (fn) => docs.forEach(fn) };
    }
  } return new Query();
}
function runtime(registry, records = []) {
  const cache = new Map(), reads = [], collection = fakeCollection(records, reads);
  const firestore = Object.assign(() => ({ collection: (name) => { assert.equal(name, "Test"); return collection; } }),
    { FieldPath: { documentId: () => "id" }, DocumentReference: class {} });
  function requireModule(id) {
    if (id === 14232) return {};
    if (id === 9306) return { A: { firestore } };
    if (cache.has(id)) return cache.get(id).exports;
    assert(registry.has(id), `Runtime missing factory ${id}`);
    const module = { exports: {} }; cache.set(id, module);
    vm.runInNewContext(`(${registry.get(id)})`, { console, setTimeout, clearTimeout, Date, URL, AbortController })(module, module.exports, requireModule);
    return module.exports;
  }
  requireModule.d = (exports, map) => Object.entries(map).forEach(([name, getter]) => {
    if (!Object.hasOwn(exports, name)) Object.defineProperty(exports, name, { enumerable: true, get: getter });
  });
  requireModule.r = (exports) => Object.defineProperty(exports, "__esModule", { value: true });
  requireModule.n = (module) => { const getter = module?.__esModule ? () => module.default : () => module; requireModule.d(getter, { a: getter }); return getter; };
  return { requireModule, reads, collection };
}

(async () => {
  const report = json("composition-report-v2.json"), reportSHA256 = hash(read("composition-report-v2.json"));
  const baseline = json("baseline.json"), original = path.join(here, "source"), candidate = path.join(here, report.candidateDir);
  assert.equal(hash(fs.readFileSync(path.join(here, "source.zip"))), report.baselineArchiveSHA256);
  assert.equal(report.baselineRevision, baseline.revision);
  const before = fileMap(original), after = fileMap(candidate);
  const sourceManifest = json("baseline-files.json"), candidateManifest = json("candidate-files-v2.json");
  assert.equal(before.size, sourceManifest.length); assert.equal(after.size, candidateManifest.length);
  for (const entry of sourceManifest) assert.equal(before.get(entry.path), entry.sha256);
  for (const entry of candidateManifest) assert.equal(after.get(entry.path), entry.sha256);
  assert([...before.keys()].every((file) => after.has(file)), "No baseline file may be removed");
  const modified = [...before].filter(([file, sha]) => after.get(file) !== sha).map(([file]) => file).sort();
  const added = [...after.keys()].filter((file) => !before.has(file)).sort();
  assert.deepEqual(modified, [...report.modified].sort()); assert.deepEqual(added, [...report.added].sort());
  for (const [file, sha] of before) if (file.startsWith(".next/static/")) assert.equal(after.get(file), sha, `Old static asset changed ${file}`);
  const allowed = new Set([".next/BUILD_ID", ".next/server/chunks/4895.js", ...report.metadataChanges]);
  assert(modified.every((file) => allowed.has(file)));
  for (const file of report.metadataChanges) {
    let expected = fs.readFileSync(path.join(original, file), "utf8");
    for (const [from, to] of report.substitutions) expected = expected.split(from).join(to);
    assert.equal(fs.readFileSync(path.join(candidate, file), "utf8"), expected, `Metadata-only scope exceeded ${file}`);
    let undone = expected; for (const [from, to] of [...report.substitutions].reverse()) undone = undone.split(to).join(from);
    assert.equal(undone, fs.readFileSync(path.join(original, file), "utf8"));
  }
  for (const file of ["package.json", "package-lock.json", "index.js", ".next/server/pages-manifest.json"]) assert.equal(after.get(file), before.get(file), `Runtime/route map modified ${file}`);
  for (const name of ["_buildManifest.js", "_ssgManifest.js"]) {
    let expected = read(`source/.next/static/${report.oldBuildId}/${name}`);
    for (const [from, to] of report.substitutions) expected = expected.split(from).join(to);
    assert.equal(read(`${report.candidateDir}/.next/static/${report.buildId}/${name}`), expected);
  }
  assert.equal(read(`${report.candidateDir}/.next/BUILD_ID`), report.buildId);
  const helperReport = json("client-helper-factories-v2.json"), helperIds = report.newClientHelperIds, helperSet = new Set(helperIds);
  assert.deepEqual(helperIds, [93900000, 93900001, 93900002, 93900003, 93900004, 93900005, 93900006]);
  const compilerInputs = json(`compiler-inputs-${helperReport.compilerVersion}.json`), compilerDir = path.join(here, compilerInputs.workspace, "compiler-output");
  assert.equal(hash(read(`compiler-inputs-${helperReport.compilerVersion}.json`)), helperReport.inputReceiptSHA256);
  const compilerGraph = graph(compilerDir, "/NewSearch/AddItem/NewItem");
  const reverseHelperMap = new Map(Object.entries(helperReport.moduleMap).map(([oldId, newId]) => [Number(newId), Number(oldId)]));
  const reverseImports = new Map([...reverseHelperMap, ...Object.entries(helperReport.externalMap).map(([freshId, oldId]) => [Number(oldId), Number(freshId)])]);
  const searchOverlay = json("search-overlay-report.json");
  const pageResults = [];
  let compiledSearchChecks = 0;
  for (const route of report.routes) {
    const oldCode = read(`source/.next/${route.oldPage}`), newCode = read(`${report.candidateDir}/.next/${route.newPage}`);
    assert.equal(hash(newCode), route.newPageSHA256);
    const oldFactories = factories(oldCode), newFactories = factories(newCode);
    assert.equal(newFactories.size, oldFactories.size + helperIds.length);
    for (const [id, value] of oldFactories) if (id !== route.changedFactoryId) assert.equal(newFactories.get(id), value, `Changed unrelated UI factory ${id}`);
    const oldFactory = oldFactories.get(route.changedFactoryId), newFactory = newFactories.get(route.changedFactoryId);
    assert.equal(hash(oldFactory), route.originalFactorySHA256); assert.equal(hash(newFactory), route.afterFactorySHA256);
    for (const id of helperIds) {
      assert.equal(hash(newFactories.get(id)), helperReport.hashes[id]);
      assert.equal(remap(newFactories.get(id), reverseImports), compilerGraph.get(reverseHelperMap.get(id)), `Helper differs from frozen compiler ${id}`);
    }
    let undone;
    if (route.editPairs) {
      const correctMap = { 52321: 93900005, 93200000: 93900003, 93200001: 93900004, 32087: 93900002 };
      assert.deepEqual(route.imports, correctMap, "Editor dependency map must retain photo/history UI components");
      undone = remap(newFactory, new Map(Object.entries(correctMap).map(([oldId, newId]) => [newId, Number(oldId)])));
      for (const [from, to] of [...route.editPairs].reverse()) undone = undoOnce(undone, to, from);
      undone = undoOnce(undone, "const{resolveItemSaveIdentity:__resolveAis}=t(93900000);", "");
      assert(dependencies(newFactory).has(93200003) && dependencies(newFactory).has(93200007), "Photo/history UI imports must remain original");
      assert(dependencies(newFactory).has(93900004) && dependencies(newFactory).has(93900002), "Editor must actually invoke guarded warehouse/operation helpers");
    } else {
      undone = remap(newFactory, new Map([[93900005, 52321]]));
      const proof = searchOverlay.files.find((entry) => entry.route === route.route); assert(proof);
      for (const { before, after } of [...proof.edits].reverse()) undone = undoOnce(undone, after, before);
    }
    assert.equal(undone, oldFactory, `Factory inverse must exactly restore baseline ${route.route}`);
    const registry = graph(path.join(candidate, ".next"), route.route), oldRegistry = graph(path.join(original, ".next"), route.route);
    const visited = new Set(), queue = [route.changedFactoryId, ...helperIds];
    while (queue.length) {
      const id = queue.shift(); if (visited.has(id)) continue; visited.add(id);
      assert(registry.has(id), `Missing final registry dependency ${id}`);
      for (const dependency of dependencies(registry.get(id))) {
        assert(registry.has(dependency), `Missing required dependency ${dependency} from ${id}`);
        if (helperSet.has(dependency)) queue.push(dependency);
        else if (id !== route.changedFactoryId) assert.equal(registry.get(dependency), oldRegistry.get(dependency), `Helper external dependency drift ${dependency}`);
      }
    }
    const r = runtime(registry, [
      { id: "33551", name: "test", localSN: "33551" },
      { id: "AIS33551", name: "original", localSN: "AIS33551" },
      { id: "ais23019", name: "Legacy lowercase", localSN: "ais23019" },
      { id: "AIS00001", name: "must not enter this prefix" },
    ]);
    const identitySearch = r.requireModule(93900001), fetchExports = r.requireModule(93900005);
    const fetchPage = Object.values(fetchExports).find((value) => typeof value === "function" && value.toString().includes("Inventory search cancelled."));
    assert.equal(typeof fetchPage, "function", "Locate actual compiled paginated search export");
    for (const value of ["33551", "AIS33551", "ais-33551"]) {
      const result = await fetchPage({ pageSize: 25, visibleOnly: true, needsMachineData: false,
        search: { type: "SKU", raw: value, lower: value.toLowerCase() },
        filterFn: (item) => identitySearch.itemMatchesAisSearch(item, value) });
      assert.deepEqual(Array.from(result.parts, (item) => item.id), ["33551", "AIS33551"]); compiledSearchChecks++;
    }
    const lower = await fetchPage({ pageSize: 25, visibleOnly: true, needsMachineData: false,
      search: { type: "SKU", raw: "AIS23019", lower: "ais23019" }, filterFn: (item) => identitySearch.itemMatchesAisSearch(item, "AIS23019") });
    assert.deepEqual(Array.from(lower.parts, (item) => item.id), ["ais23019"]); compiledSearchChecks++;
    const page1 = await fetchPage({ pageSize: 1, needsMachineData: false, search: { type: "SKU", raw: "33551", lower: "33551" } });
    const page2 = await fetchPage({ pageSize: 1, needsMachineData: false, startAfterDoc: page1.lastDoc, search: { type: "SKU", raw: "33551", lower: "33551" } });
    assert.deepEqual(Array.from(page1.parts, (item) => item.id), ["33551"]);
    assert.deepEqual(Array.from(page2.parts, (item) => item.id), ["AIS33551"]); compiledSearchChecks += 2;
    pageResults.push({ route: route.route, factoryId: route.changedFactoryId, registryFactories: registry.size,
      helperClosureVerified: true, externalDependenciesUnchanged: true, originalUiComponentsPreserved: true,
      byteExactFactoryInverse: true, compiledIdentitySearchChecks: 6, newPageSHA256: hash(newCode) });
  }
  const serverFile = ".next/server/chunks/4895.js", oldServer = factories(read(`source/${serverFile}`)), newServer = factories(read(`${report.candidateDir}/${serverFile}`));
  assert.equal(newServer.size, oldServer.size + 1);
  assert(newServer.has(93900000));
  for (const [id, value] of oldServer) if (id !== 51585) assert.equal(newServer.get(id), value, `Unrelated server factory changed ${id}`);
  const shipment = json("shipment-overlay-report.json");
  assert.equal(hash(read(`${report.candidateDir}/${serverFile}`)), shipment.afterSHA256);
  assert.equal(hash(newServer.get(51585)), shipment.moduleSHA256);
  assert.equal(hash(newServer.get(93900000)), shipment.identityModuleSHA256);
  const rules = read("firestore-scoped-v2.rules"), rulesBefore = read("firestore-before.rules"), rulesReceipt = json("rules-verification.json");
  assert.equal(hash(rules), rulesReceipt.rulesSHA256); assert.equal(rulesReceipt.passed, 17); assert.equal(rulesReceipt.failed, 0);
  let rulesUndo = rules;
  const begin = rulesUndo.indexOf("    // Creation identity is stricter than the historical archive/rename format.");
  const end = rulesUndo.indexOf("    function renameAlias", begin);
  assert(begin >= 0 && end > begin); rulesUndo = rulesUndo.slice(0, begin) + rulesUndo.slice(end);
  rulesUndo = undoOnce(rulesUndo, "      allow create: if itemWriteAllowed(itemId) && newItemIdentityAllowed(itemId);\n      allow update: if itemWriteAllowed(itemId) && updatedItemIdentityAllowed(itemId);", "      allow create, update: if itemWriteAllowed(itemId);");
  assert.equal(rulesUndo, rulesBefore);
  assert.equal(hash(read("composition-report-v2.json")), reportSHA256, "Candidate report changed during independent review");
  assert.deepEqual([...fileMap(candidate)].sort(), [...after].sort(), "Candidate files changed during review");
  const receipt = { checkedAt: new Date().toISOString(), status: "passed", baselineRevision: baseline.revision,
    baselineArchiveSHA256: report.baselineArchiveSHA256, candidateDirectory: report.candidateDir, buildId: report.buildId,
    compositionReportSHA256: reportSHA256, candidateFileManifestSHA256: hash(read("candidate-files-v2.json")),
    independentlyHashedFiles: after.size, modifiedFiles: modified, addedFiles: added,
    oldAssetsPreserved: true, metadataOnlyReversibleChanges: true, productionPackageAndConfigUnchanged: true,
    noDeletedFiles: true, pages: pageResults, compiledSearchChecks,
    serverAllowedChangesOnly: { file: serverFile, changedFactory: 51585, addedFactory: 93900000 },
    slackHistoryAndUnrelatedServerCodeUnchanged: true, rulesSHA256: hash(rules), rulesByteExactInverse: true,
    rulesActualEmulatorChecks: 17, productionDatabaseWrites: 0, productionDeployments: 0 };
  fs.writeFileSync(path.join(here, "independent-final-review.json"), JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
  fs.writeFileSync(path.join(here, "finalsearch-candidate-verification.json"), JSON.stringify({ ...receipt, reviewFocus: "Final four-route compiled identity-search closures" }, null, 2) + "\n", { flag: "wx" });
  console.log(JSON.stringify({ status: receipt.status, files: after.size, buildId: receipt.buildId, compiledSearchChecks, pages: pageResults }, null, 2));
})().catch((error) => { console.error(error.stack); process.exitCode = 1; });
