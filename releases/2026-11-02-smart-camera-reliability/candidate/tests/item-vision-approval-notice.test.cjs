"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const parser = require("@babel/parser");

function parsed(relative) {
  const source = fs.readFileSync(path.resolve(__dirname, "..", relative), "utf8");
  return { source, ast: parser.parse(source, { sourceType: "module", plugins: ["jsx"] }) };
}
function find(node, predicate) {
  if (!node || typeof node !== "object") return;
  if (predicate(node)) return node;
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) { for (const child of value) { const found = find(child, predicate); if (found) return found; } }
    else if (value && typeof value === "object") { const found = find(value, predicate); if (found) return found; }
  }
}

test("the review callback forwards saved/index-pending results without approving twice", async () => {
  const { source, ast } = parsed("components/ItemChangeReview.js");
  const node = find(ast, (entry) => entry.type === "VariableDeclarator" && entry.id?.name === "review").init;
  const apiResult = { ok: true, warning: "Saved; indexing pending", visionIndex: { ok: false, itemId: "AIS1" } };
  let writes = 0; let delivered;
  // setError("") clears stale errors and must not affect the flow.
  const run = new Function("busy", "setBusy", "setError", "changes", "included", "values", "request", "note", "itemChangeRequestApi", "onReviewed",
    `return (${source.slice(node.start, node.end)});`)("", () => {}, (error) => { if (error) throw new Error(error); }, [], {}, {}, { requestId: "request1" }, "",
    async () => { writes++; return apiResult; }, async (...args) => { delivered = args; });
  await run("approve");
  assert.equal(writes, 1);
  assert.deepEqual(delivered, ["approve", apiResult]);
});

test("notification notice preserves approval success while warning about indexing", async () => {
  const { source, ast } = parsed("pages/notifications.js");
  const node = find(ast, (entry) => entry.type === "JSXAttribute" && entry.name?.name === "onReviewed").value.expression;
  let notice; let selected; let reloads = 0;
  const handler = new Function("setNotice", "setSelected", "load", `return (${source.slice(node.start, node.end)});`)(
    (value) => { notice = value; }, (value) => { selected = value; }, async () => { reloads++; });
  await handler("approve", { warning: "Approved and saved; Smart Camera pending", visionIndex: { ok: false, itemId: "AIS123" } });
  assert.deepEqual(notice, { text: "Approved and saved; Smart Camera pending", warning: true, itemId: "AIS123" });
  assert.equal(selected, ""); assert.equal(reloads, 1);
  await handler("approve", { visionIndex: { ok: true, itemId: "AIS123" } });
  assert.equal(notice.warning, false); assert.equal(notice.itemId, "");
  assert.match(notice.text, /Approved changes/);
  await handler("reject", {});
  assert.match(notice.text, /not changed/);
});
