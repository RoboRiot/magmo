"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const active = path.join(here, "source", ".next");
const oracle = path.join(here, "build-workspace", ".next-oracle");
const route = "/NewSearch/mainSearch";
const manifest = (root) => JSON.parse(fs.readFileSync(path.join(root, "build-manifest.json"), "utf8"));
const pageAsset = (root, value) => value.pages[route].find((file) => /pages\/NewSearch\/mainSearch-[^.]+\.js$/.test(file));
const activeManifest = manifest(active);
const oracleManifest = manifest(oracle);
const activePage = pageAsset(active, activeManifest);
const oraclePage = pageAsset(oracle, oracleManifest);
assert(activePage && oraclePage);
const activeCode = T.read(path.join(active, activePage));
const oracleCode = T.read(path.join(oracle, oraclePage));

function mapping(factory) {
  const values = {};
  traverse(parser.parse(`(${factory})`), {
    ObjectProperty(p) {
      const key = p.node.key?.value ?? p.node.key?.name;
      const value = p.node.value?.value;
      if (typeof key === "string" && typeof value === "string") values[key] = value;
    },
  });
  return values;
}

function cssAsset(root, value) {
  const assets = [...new Set([...(value.pages["/_app"] || []), ...(value.pages[route] || [])])]
    .filter((file) => file.endsWith(".css"));
  const target = assets.find((file) => T.read(path.join(root, file)).includes(".WorkOrderAddModal_"));
  assert(target);
  return { target, assets, text: T.read(path.join(root, target)) };
}

const activeComponent = T.getFactory(activeCode, 60992);
const oracleComponentEntries = T.factories(oracleCode).filter(({ source }) =>
  source.includes("/api/items/work-order-add/confirm") && source.includes("Your session is not ready")
);
assert.equal(oracleComponentEntries.length, 1, "Oracle WorkOrder component factory is ambiguous or missing.");
const oracleComponentEntry = oracleComponentEntries[0];
const oracleComponent = oracleComponentEntry.source;
const activeMappingFactory = T.getFactory(activeCode, 21704);
const oracleMappingEntries = T.factories(oracleCode).filter(({ source }) =>
  source.includes("WorkOrderAddModal_promptDialog") && source.includes("WorkOrderAddModal_workOrderOption")
);
assert.equal(oracleMappingEntries.length, 1, "Oracle WorkOrder CSS mapping is ambiguous or missing.");
const oracleMappingEntry = oracleMappingEntries[0];
const oracleMappingFactory = oracleMappingEntry.source;
const activeMapping = mapping(activeMappingFactory);
const oracleMapping = mapping(oracleMappingFactory);
const activeCss = cssAsset(active, activeManifest);
const oracleCss = cssAsset(oracle, oracleManifest);
const selectorMissing = Object.entries(oracleMapping)
  .filter(([, className]) => !oracleCss.text.includes(`.${className}`))
  .map(([key]) => key);
assert.deepEqual(selectorMissing, []);
const activeRequired = [...T.requiredIds(activeComponent)];
const oracleRequired = [...T.requiredIds(oracleComponent)];
assert(activeRequired.includes(98092901), "ACTIVE item-status binding is missing.");
assert(activeRequired.includes(21704));

const report = {
  checkedAt: new Date().toISOString(),
  active: {
    page: activePage,
    pageSHA256: T.sha(activeCode),
    componentFactorySHA256: T.sha(activeComponent),
    cssMappingFactorySHA256: T.sha(activeMappingFactory),
    cssMappingKeys: Object.keys(activeMapping).sort(),
    css: { path: activeCss.target, sha256: T.sha(activeCss.text), bytes: Buffer.byteLength(activeCss.text) },
  },
  oracle: {
    page: oraclePage,
    pageSHA256: T.sha(oracleCode),
    componentFactorySHA256: T.sha(oracleComponent),
    cssMappingFactorySHA256: T.sha(oracleMappingFactory),
    cssMappingKeys: Object.keys(oracleMapping).sort(),
    css: { path: oracleCss.target, sha256: T.sha(oracleCss.text), bytes: Buffer.byteLength(oracleCss.text) },
  },
  moduleIds: { component: 60992, cssMapping: 21704, itemStatusPartTable: 98092901 },
  oracleModuleIds: { component: oracleComponentEntry.id, cssMapping: oracleMappingEntry.id },
  activeRequiredIds: activeRequired,
  oracleRequiredIds: oracleRequired,
  cssMappingSelectorsComplete: true,
  cssByteIdentical: activeCss.text === oracleCss.text,
  newMappingKeys: Object.keys(oracleMapping).filter((key) => !activeMapping[key]).sort(),
  productionWrites: 0,
};
fs.writeFileSync(path.join(here, "oracle-analysis.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify(report, null, 2));
