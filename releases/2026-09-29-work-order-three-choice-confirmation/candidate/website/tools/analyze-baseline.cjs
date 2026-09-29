"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const source = path.join(here, "source");
const next = path.join(source, ".next");
const baseline = JSON.parse(fs.readFileSync(path.join(here, "baseline.json"), "utf8"));
assert.equal(baseline.revision, "nextserverwest-00070-liw");
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);

const manifest = JSON.parse(fs.readFileSync(path.join(next, "build-manifest.json"), "utf8"));
const route = "/NewSearch/mainSearch";
const assets = [...new Set([...(manifest.pages["/_app"] || []), ...(manifest.pages[route] || [])])];
const page = assets.find((file) => /static\/chunks\/pages\/NewSearch\/mainSearch-[^.]+\.js$/.test(file));
assert(page, "mainSearch page asset is missing");
const pageCode = fs.readFileSync(path.join(next, page), "utf8");
const componentFactory = T.getFactory(pageCode, 60992);
const mappingFactory = T.getFactory(pageCode, 21704);

function objectLiteralPairs(factory) {
  const pairs = [];
  const ast = parser.parse(`(${factory})`);
  traverse(ast, {
    ObjectProperty(p) {
      const key = p.node.key?.value ?? p.node.key?.name;
      const value = p.node.value?.value;
      if (typeof key === "string" && typeof value === "string") pairs.push([key, value]);
    },
  });
  return Object.fromEntries(pairs);
}

const mapping = objectLiteralPairs(mappingFactory);
const cssAssets = assets.filter((file) => file.endsWith(".css"));
const targetCss = cssAssets.find((file) => fs.readFileSync(path.join(next, file), "utf8").includes(".WorkOrderAddModal_"));
assert(targetCss, "WorkOrderAddModal CSS asset is missing");
const cssText = fs.readFileSync(path.join(next, targetCss), "utf8");
const expectedKeys = [
  "reviewSlackButton", "promptDialog", "promptContent", "promptHeader", "promptBody",
  "promptLead", "promptNote", "promptFooter", "slackPromptSummary", "slackProgress",
  "slackItems", "slackItem", "slackItemIdentity", "slackItemMessage", "slackWarnings",
  "slackResultSummary",
];
const missingMappingKeys = expectedKeys.filter((key) => !mapping[key]);
const missingSelectors = expectedKeys.filter((key) => !cssText.includes(`.WorkOrderAddModal_${key}__`));

const report = {
  checkedAt: new Date().toISOString(),
  revision: baseline.revision,
  generation: baseline.source.storageSource.generation,
  archiveSHA256: baseline.archiveSHA256,
  buildId: fs.readFileSync(path.join(next, "BUILD_ID"), "utf8").trim(),
  route,
  assets,
  page,
  pageSHA256: T.sha(pageCode),
  component: {
    id: 60992,
    sha256: T.sha(componentFactory),
    bytes: Buffer.byteLength(componentFactory),
    requiredIds: [...T.requiredIds(componentFactory)],
  },
  cssMapping: {
    id: 21704,
    sha256: T.sha(mappingFactory),
    bytes: Buffer.byteLength(mappingFactory),
    keys: Object.keys(mapping).sort(),
    missingExpectedKeys: missingMappingKeys,
  },
  css: {
    path: targetCss,
    sha256: T.sha(cssText),
    bytes: Buffer.byteLength(cssText),
    missingExpectedSelectors: missingSelectors,
  },
  defectReproduced: missingMappingKeys.length > 0 && missingSelectors.length === 0,
  productionWrites: 0,
};
assert.equal(report.defectReproduced, true);
fs.writeFileSync(path.join(here, "topology.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify(report, null, 2));
