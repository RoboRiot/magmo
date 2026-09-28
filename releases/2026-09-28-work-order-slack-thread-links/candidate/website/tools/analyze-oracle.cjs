"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const tools = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, fresh = path.join(here, "fresh-next-root"), active = path.join(here, "source/.next");
const relative = "server/pages/api/items/work-order-add/slack.js";
const freshCode = tools.read(path.join(fresh, relative)), activeCode = tools.read(path.join(active, relative));
const chunks = tools.loaderChunks(freshCode);
const registry = new Map();
for (const file of [relative, ...chunks.map((id) => `server/chunks/${id}.js`)]) {
  for (const factory of tools.factories(tools.read(path.join(fresh, file)))) {
    const copies = registry.get(factory.id) || [];
    copies.push({ file, source: factory.source }); registry.set(factory.id, copies);
  }
}
const selected = [];
for (const [id, copies] of registry) {
  const source = copies[0].source;
  if ([10985, 99397].includes(id) || source.includes("sendConfirmedItemThreadLink") || source.includes("buildDispatchReceipt")) selected.push({ id, files: copies.map((copy) => copy.file), sha256: tools.sha(source), bytes: source.length, requires: [...tools.requiredIds(source)], markers: ["sendConfirmedItemThreadLink", "buildDispatchReceipt", "parseRootSlackPermalink", "sendConfirmedItemToSlack"].filter((key) => source.includes(key)) });
}
const freshManifest = JSON.parse(tools.read(path.join(fresh, "build-manifest.json"))), activeManifest = JSON.parse(tools.read(path.join(active, "build-manifest.json")));
const getPage = (manifest) => manifest.pages["/NewSearch/mainSearch"].find((file) => /pages\/NewSearch\/mainSearch-[^.]+\.js$/.test(file));
const freshPage = getPage(freshManifest), activePage = getPage(activeManifest);
const freshUi = tools.getFactory(tools.read(path.join(fresh, freshPage)), 60992), activeUi = tools.getFactory(tools.read(path.join(active, activePage)), 60992);
const report = { checkedAt: new Date().toISOString(), freshLoaderChunks: chunks, activeLoaderChunks: tools.loaderChunks(activeCode), selected, ui: { activePage, freshPage, activeFactorySHA256: tools.sha(activeUi), freshFactorySHA256: tools.sha(freshUi), freshPrefix: freshUi.slice(0, 130), activeRequires: [...tools.requiredIds(activeUi)], freshRequires: [...tools.requiredIds(freshUi)] }, freshCss: freshManifest.pages["/NewSearch/mainSearch"].filter((file) => file.endsWith(".css")), activeCss: activeManifest.pages["/NewSearch/mainSearch"].filter((file) => file.endsWith(".css")) };
assert(selected.some((item) => item.id === 10985)); assert(selected.some((item) => item.id === 99397));
fs.writeFileSync(path.join(here, "oracle-analysis.json"), JSON.stringify(report, null, 2) + "\n"); console.log(JSON.stringify(report, null, 2));
