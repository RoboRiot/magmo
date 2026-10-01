"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const parser = require("@babel/parser"), vm = require("node:vm");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../..");
const manifest = JSON.parse(T.read(path.join(here, "source/.next/build-manifest.json")));
const baseline = JSON.parse(T.read(path.join(here, "baseline.json")));
const search = require(path.join(root, "lib/items/itemIdentitySearch.cjs"));
const frozen = {
  "lib/items/itemIdentitySearch.cjs": "968bcb4d310a4ff6348694809cc2ab1cb25dbb94ec4059c9b332cf53434a66be",
  "utils/fetchAssociations.js": "a6760906bb2c88f23a92934de54dd95759df2dbdbfed2ead8749c39348974cdc",
  "pages/NewSearch/mainSearch.js": "df0a221ef8be52eb2a0570dfe2f2ed4249d77abadbf3292f3632219f042fb992",
  "pages/NewSearch/inventory/inventoryManage.js": "a6f996263bc38d7ec2f9c6badd919e2cd143d040bae55db3f2de09d27509fa51",
};
for (const [relative, hash] of Object.entries(frozen)) assert.equal(T.sha(T.read(path.join(root, relative))), hash);
const mutations = [];
function edit(code, label, before, after) {
  assert.equal(code.split(before).length, 2, `Expected exactly one ${label}`);
  assert(!code.includes(after), `Replacement for ${label} already present`);
  mutations.push({ label, before, after });
  return code.replace(before, after);
}
function undo(code, edits) {
  for (const change of [...edits].reverse()) {
    assert.equal(code.split(change.after).length, 2, `Inverse ambiguous: ${change.label}`);
    code = code.replace(change.after, change.before);
  }
  return code;
}
const reports = [];
for (const [route, moduleId] of [["/NewSearch/mainSearch", 60992], ["/NewSearch/inventory/inventoryManage", 83757]]) {
  const asset = manifest.pages[route].find((name) => name.includes("/pages/"));
  const source = T.read(path.join(here, "source/.next", asset));
  const original = T.getFactory(source, moduleId);
  const marker = mutations.length;
  let factory = original;
  if (moduleId === 60992) {
    factory = edit(factory, "main-search helper import", '"use strict";', '"use strict";const __aisSearch=r(93900001);');
    factory = edit(factory, "main-search SKU identity predicate",
      'if("SKU"===a){let t=String(r).replace(/\\D/g,"");if(!t)return!0;let a=`ais${t}`;return[e?.id,e?.localSN,e?.local_sn].some(e=>String(e||"").toLowerCase().startsWith(a))}',
      'if("SKU"===a)return __aisSearch.itemMatchesAisSearch(e,r);');
  } else {
    factory = edit(factory, "inventory helper import", '"use strict";', '"use strict";const __aisSearch=t(93900001);');
    factory = edit(factory, "inventory canonical/legacy filter",
      'return!r||!!String(e.localSN||"").toLowerCase().includes(r)',
      'return!r||(__aisSearch.aisSearchPrefix(r)?__aisSearch.itemMatchesAisSearch(e,r):!!String(e.localSN||"").toLowerCase().includes(r))');
    factory = edit(factory, "inventory identity query plan",
      'let e=l.replace(/\\s+/g,"");if(/^(?:ais)?\\d+$/i.test(e)){let n=e.replace(/^ais/i,""),i=`AIS${n}`;return{query:t.orderBy(r).startAt(i).endAt(`${i}\\uf8ff`),label:"local-sn-document-prefix"}}',
      'if(__aisSearch.aisSearchPrefix(l))return{query:null,queries:__aisSearch.buildItemAisSearchQueries({collection:t,documentId:r,value:l}),label:"local-sn-canonical-and-legacy"};');
    factory = edit(factory, "inventory secondary alias filter",
      'if(!1===(e.data()||{}).visible||a.has(e.id))return;let t=q(e);Z(t,n)&&a.set(e.id,t)',
      'let __aisData=e.data()||{};if(!1===__aisData.visible||a.has(e.id))return;let t=q(e);Z({...t,local_sn:__aisData.local_sn,aisNumber:__aisData.aisNumber},n)&&a.set(e.id,t)');
    // Execute the actual compiled filter against the same identity spellings.
    const ast = parser.parseExpression(factory), functions = ast.body.body.filter((node) => node.type === "FunctionDeclaration");
    const names = new Set(["J", "Z"]);
    const code = functions.filter((node) => names.has(node.id.name)).map((node) => factory.slice(node.start, node.end)).join("\n");
    assert.equal(functions.filter((node) => names.has(node.id.name)).length, 2);
    const context = vm.createContext({ __aisSearch: search });
    vm.runInContext(code, context);
    for (const input of ["33551", "AIS33551", "ais-33551"]) {
      assert(context.Z({ id: "33551", name: "test", localSN: "33551" }, { localSN: input }));
      assert(context.Z({ id: "AIS33551", name: "original", localSN: "AIS33551" }, { localSN: input }));
      assert(!context.Z({ id: "AIS33552", localSN: "AIS33552" }, { localSN: input }));
    }
  }
  parser.parseExpression(factory);
  const edits = mutations.slice(marker);
  assert.equal(undo(factory, edits), original, "Byte-for-byte inverse must recover the exact production factory");
  const next = T.patchFactories(source, { [moduleId]: factory });
  const nextFactories = new Map(T.factories(next).map((entry) => [entry.id, entry.source]));
  for (const entry of T.factories(source)) if (entry.id !== moduleId) assert.equal(nextFactories.get(entry.id), entry.source);
  assert.equal(T.patchFactories(next, { [moduleId]: original }), source, "All bytes outside the target factory must remain unchanged");
  assert.deepEqual(T.loaderChunks(next), T.loaderChunks(source));
  const newAsset = asset.replace(/-[a-f0-9]+\.js$/, `-ais-identity-${T.sha(next).slice(0, 16)}.js`);
  assert.notEqual(newAsset, asset);
  const target = path.join(here, "search-overlay/.next", newAsset);
  assert(!fs.existsSync(target), "Do not overwrite an existing composition");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, next, { flag: "wx" });
  reports.push({ route, moduleId, beforeAsset: `.next/${asset}`, afterAsset: `.next/${newAsset}`,
    beforeSHA256: T.sha(source), afterSHA256: T.sha(next), beforeFactorySHA256: T.sha(original), afterFactorySHA256: T.sha(factory),
    requiredHelperIds: [93900001], existingFetchAssociationsId: 52321,
    pendingReleaseComposition: "Inject frozen helper closure including 93900001, remap 52321 to private fetch clone 93900005, rehash final asset.",
    byteExactInversePassed: true, outsideFactoryBytesUnchanged: true, unrelatedFactoriesUnchanged: true,
    unchangedLoaderChunks: true, edits });
}
const report = { createdAt: new Date().toISOString(), baselineRevision: baseline.revision, frozenSources: frozen,
  sourceDirectory: "search-overlay", files: reports, productionMutations: 0,
  tests: { sourceSearchChecks: 19, compiledInventoryPredicateAssertions: 9, inverseFactoryProofs: 2 } };
fs.writeFileSync(path.join(here, "search-overlay-report.json"), JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify({ files: reports.map(({ route, beforeAsset, afterAsset, afterSHA256 }) => ({ route, beforeAsset, afterAsset, afterSHA256 })), tests: report.tests }, null, 2));
