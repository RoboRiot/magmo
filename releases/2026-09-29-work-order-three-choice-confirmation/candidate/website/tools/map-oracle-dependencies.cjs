"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const activeRoot = path.join(here, "source", ".next", "static", "chunks");
const oracleRoot = path.join(here, "build-workspace", ".next-oracle", "static", "chunks");
const analysis = JSON.parse(fs.readFileSync(path.join(here, "oracle-analysis.json"), "utf8"));
const activePage = T.read(path.join(here, "source", ".next", analysis.active.page));
const oraclePage = T.read(path.join(here, "build-workspace", ".next-oracle", analysis.oracle.page));
const activeComponent = T.getFactory(activePage, 60992);
const oracleComponent = T.getFactory(oraclePage, analysis.oracleModuleIds.component);
const activeIndex = T.index(activeRoot);
const oracleIndex = T.index(oracleRoot);
const activeCanonical = new Map();
for (const [id, copies] of activeIndex) {
  const values = new Set(copies.map((copy) => T.canonical(copy.source)));
  assert.equal(values.size, 1, `ACTIVE module ${id} has incompatible copies.`);
  const canonical = [...values][0];
  const ids = activeCanonical.get(canonical) || [];
  ids.push(id);
  activeCanonical.set(canonical, ids);
}

const mappings = [];
for (const id of T.requiredIds(oracleComponent)) {
  if (id === analysis.oracleModuleIds.cssMapping) {
    mappings.push({ oracleId: id, activeId: 21704, reason: "reviewed CSS mapping replacement" });
    continue;
  }
  const copies = oracleIndex.get(id) || [];
  assert(copies.length > 0, `Oracle dependency ${id} is missing from emitted chunks.`);
  const values = new Set(copies.map((copy) => T.canonical(copy.source)));
  assert.equal(values.size, 1, `Oracle dependency ${id} has incompatible copies.`);
  const matches = activeCanonical.get([...values][0]) || [];
  mappings.push({
    oracleId: id,
    activeIds: matches,
    oracleFiles: copies.map((copy) => copy.file),
    reason: matches.length === 1 ? "canonical factory match" : matches.length ? "ambiguous canonical factory match" : "no canonical factory match",
  });
}
const unresolved = mappings.filter((entry) => entry.activeId == null && entry.activeIds?.length !== 1);
const resolved = Object.fromEntries(mappings.map((entry) => [
  entry.oracleId,
  entry.activeId ?? (entry.activeIds?.length === 1 ? entry.activeIds[0] : null),
]));
const report = {
  checkedAt: new Date().toISOString(),
  activeComponentSHA256: T.sha(activeComponent),
  oracleComponentSHA256: T.sha(oracleComponent),
  activeModules: activeIndex.size,
  oracleModules: oracleIndex.size,
  mappings,
  resolved,
  unresolved,
  productionWrites: 0,
};
fs.writeFileSync(path.join(here, "oracle-dependency-map.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ total: mappings.length, unresolved, resolved }, null, 2));
