const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const parser = require("@babel/parser");
const { navigateToSavedItem } = require("../lib/items/itemEditorOperations.cjs");

// Execute the real page's post-commit statements, with local state and router
// fixtures only. No Firebase calls, live records, or network requests are used.
const source = fs.readFileSync(path.join(__dirname, "../pages/NewSearch/item/[id]/index.js"), "utf8");
const ast = parser.parse(source, { sourceType: "module", plugins: ["jsx"] });
const component = ast.program.body.find((node) => node.type === "FunctionDeclaration" && node.id.name === "DisplayItemInner");
const save = component.body.body.find((node) => node.type === "FunctionDeclaration" && node.id.name === "saveItem");
const saveTry = save.body.body.find((node) => node.type === "TryStatement" && node.block.body.some((statement) =>
  statement.type === "ExpressionStatement" && statement.expression.callee?.name === "reportProgress" && statement.expression.arguments[0]?.value === "Finishing save…"
));
const statements = saveTry.block.body;
const first = statements.find((node) => node.type === "ExpressionStatement" && node.expression.callee?.name === "reportProgress" && node.expression.arguments[0]?.value === "Finishing save…");
const last = statements.at(-1);
assert.equal(last.type, "ReturnStatement");
const postCommitSource = source.slice(first.start, last.end);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

async function completeSave({ savedId = "AIS35983", redirect = true, showSaved = true, visionIndexReady = true, push } = {}) {
  const observed = { navigations: [], confirmations: 0, warnings: [], progress: [] };
  const originalItemBaselineRef = { current: {} };
  const bindings = {
    reportProgress: (value) => observed.progress.push(value),
    console: { log() {}, warn: (...args) => observed.warnings.push(args) },
    setSavedName: (name) => { observed.savedName = name; },
    items: { name: "AQ 64 Console" },
    originalItemBaselineRef,
    formattedItems: { name: "AQ 64 Console", status: "Good" },
    docId: savedId,
    redirect,
    navigateToSavedItem,
    router: { async push(href) { observed.navigations.push(href); return push ? push(href) : true; } },
    id: "AIS35983",
    setSavedItemNavigationHref: (href) => { observed.recoveryHref = href; },
    showSaved,
    visionIndexReady,
    savedAssets: { photosComplete: true },
    handleShowSaveModal: () => { observed.confirmations += 1; },
    photoUrls: ["local-fixture-photo"],
    committedAudit: { selectionHistory: [{ saved: true }], saveHistory: [{ saved: true }] },
  };
  const run = new AsyncFunction(...Object.keys(bindings), postCommitSource);
  observed.result = await run(...Object.values(bindings));
  observed.baseline = originalItemBaselineRef.current;
  return observed;
}

test("the real post-save flow keeps the same item page and shows its saved confirmation", async () => {
  const observed = await completeSave({ push: () => { throw new Error("Route-data 404"); } });
  assert.deepEqual(observed.navigations, []);
  assert.equal(observed.confirmations, 1);
  assert.equal(observed.recoveryHref, "");
  assert.equal(observed.result.docId, "AIS35983");
  assert.equal(observed.baseline.localSN, "AIS35983");
  assert.equal(observed.savedName, "AQ 64 Console");
});

test("the real post-save flow still navigates after an item ID changes", async () => {
  const observed = await completeSave({ savedId: "AIS35984" });
  assert.deepEqual(observed.navigations, ["/NewSearch/item/AIS35984"]);
  assert.equal(observed.confirmations, 1);
  assert.equal(observed.result.docId, "AIS35984");
});

test("a failed rename navigation returns the committed result and a saved-item recovery link", async () => {
  const observed = await completeSave({
    savedId: "AIS35984",
    push: () => { throw new Error("Failed to load static props"); },
  });
  assert.equal(observed.confirmations, 1);
  assert.equal(observed.recoveryHref, "/NewSearch/item/AIS35984");
  assert.equal(observed.warnings.length, 1);
  assert.equal(observed.result.docId, "AIS35984");
  assert.deepEqual(observed.result.photoUrls, ["local-fixture-photo"]);
  assert.deepEqual(observed.result.saveHistory, [{ saved: true }]);
});

test("save-and-print can continue to suppress navigation and the saved dialog", async () => {
  const observed = await completeSave({ savedId: "AIS35984", redirect: false, showSaved: false });
  assert.deepEqual(observed.navigations, []);
  assert.equal(observed.confirmations, 0);
  assert.equal(observed.result.docId, "AIS35984");
});

test("index failure keeps the committed save and opens its warning even when confirmation was suppressed", async () => {
  const observed = await completeSave({ redirect: false, showSaved: false, visionIndexReady: false });
  assert.equal(observed.confirmations, 1);
  assert.equal(observed.result.docId, "AIS35983");
  assert.deepEqual(observed.navigations, []);
  assert.deepEqual(observed.result.saveHistory, [{ saved: true }]);
});
