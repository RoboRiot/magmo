"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { factories, requiredIds, loaderChunks } = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, source = path.join(here, "source"), previous = path.resolve(here, "../../work-order-warehouse-slack-20260925/deployment/scoped-source");
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const inventories = (base) => new Map(walk(base).map((file) => [path.relative(base, file).replaceAll("\\", "/"), sha256(fs.readFileSync(file))]));
const current = inventories(source), prior = inventories(previous);
const changed = [...prior].filter(([file, hash]) => current.get(file) !== hash).map(([file]) => file), added = [...current.keys()].filter((file) => !prior.has(file));
assert([...prior.keys()].every((file) => current.has(file)));
function registry(relative) {
  const code = fs.readFileSync(path.join(source, relative), "utf8");
  return { relative, sha256: sha256(code), loaderChunks: loaderChunks(code), modules: factories(code).map(({ id, source: factory }) => ({ id, sha256: sha256(factory), bytes: Buffer.byteLength(factory), requires: [...requiredIds(factory)], excerpts: ["sendConfirmedItemToSlack", "sendSlackListItem", "WorkOrderSlackError", "lease"].filter((value) => factory.includes(value)) })) };
}
const routes = [".next/server/pages/api/items/work-order-add/slack.js", ".next/server/pages/api/slack/add-to-list.js", ".next/server/chunks/1572.js"];
const report = { checkedAt: new Date().toISOString(), currentFiles: current.size, previousFiles: prior.size, added, changed, oldFilesPreserved: true, workOrderSlackUnchanged: routes.every((file) => current.get(file) === prior.get(file)), routes: routes.map(registry) };
fs.writeFileSync(path.join(here, "baseline-analysis.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
