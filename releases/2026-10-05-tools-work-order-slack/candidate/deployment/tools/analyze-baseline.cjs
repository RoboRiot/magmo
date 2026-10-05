"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, base = path.join(here, "source/.next");
const baseline = JSON.parse(T.read(path.join(here, "baseline.json")));
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
const pages = JSON.parse(T.read(path.join(base, "server/pages-manifest.json")));
const index = T.index(path.join(base, "server"));
const markers = {
  workOrderAddService: "The canonical SoCal Interior identifiers are unavailable",
  workOrderAddContract: "buildWorkOrderMovementPlan",
  workOrderAddSlack: "slack_row_checkpoint_missing",
  workOrderAddSlackThread: "slack_thread_claim_lost",
  addToSlackList: "SLACK_LIST_TOOLS_TITLE_COL",
  storageUnitPlacement: "No inventory item matches this exact SKU.",
  storageUnitContract: "storage-unit-v2",
  itemLocationContract: "extractBranchAssociation",
  itemHistory: "mergeItemHistoryForCommit",
  storageUnitScanApi: "requireStorageScanUser",
  trailerClientLinks: "trailerClientId",
};
const apis = ["/api/items/work-order-add/resolve", "/api/items/work-order-add/confirm", "/api/items/work-order-add/slack", "/api/slack/add-to-list", "/api/storage-units/print-label"];
const routes = apis.map(route => {
  if (!pages[route]) return { route, deployed: false };
  const file = `server/${pages[route]}`, source = T.read(path.join(base, file));
  const chunks = T.loaderChunks(source).map(id => `server/chunks/${id}.js`);
  return { route, deployed: true, file, chunks,
    modules: [file, ...chunks].flatMap(file => T.factories(T.read(path.join(base, file))).map(factory => ({
      id: factory.id, file, sha256: T.sha(factory.source), bytes: factory.source.length,
      requiredIds: [...T.requiredIds(factory.source)],
      markers: Object.entries(markers).filter(([, marker]) => factory.source.includes(marker)).map(([name]) => name),
    }))) };
});
const matched = [];
for (const [id, copies] of index) {
  for (const factory of copies) {
    const labels = Object.entries(markers).filter(([, marker]) => factory.source.includes(marker)).map(([name]) => name);
    if (labels.length) matched.push({ id, file: factory.file, sha256: T.sha(factory.source), requiredIds: [...T.requiredIds(factory.source)], markers: labels });
  }
}
const result = { checkedAt: new Date().toISOString(), baselineRevision: baseline.revision,
  baselineArchiveSHA256: baseline.archiveSHA256, routes, matched, productionMutations: 0 };
fs.writeFileSync(path.join(here, "baseline-topology.json"), JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify({ baselineRevision: baseline.revision, routes: routes.map(({ route, file, chunks }) => ({ route, file, chunks })), matched }, null, 2));
