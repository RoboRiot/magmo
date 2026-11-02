"use strict";
// Offline release regression: executes the exact composed production callbacks
// and JSX expressions with explicitly synthetic auth, Storage, and React fixtures.
// No network or live database is used.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const crypto = require("node:crypto");
const P = require("@babel/parser");
const T = require("@babel/traverse").default;
const base = process.env.MAGMO_COMPILED_RELEASE_ROOT
  ? path.resolve(process.env.MAGMO_COMPILED_RELEASE_ROOT)
  : path.resolve(__dirname, "../tmp/analyze-fix-20261102/release");
const newItemOverlay = process.env.MAGMO_NEWITEM_OVERLAY || "newitem-overlay-v2";
const editorOverlay = process.env.MAGMO_EDITOR_OVERLAY || "editor-overlay-v4";
const explicitlyRequested = Boolean(process.env.MAGMO_COMPILED_RELEASE_ROOT || process.env.MAGMO_NEWITEM_OVERLAY || process.env.MAGMO_EDITOR_OVERLAY);
const receiptsPresent = [newItemOverlay, editorOverlay].every((name) => fs.existsSync(path.join(base, name, "receipt.json")));
if (!receiptsPresent) {
  assert.equal(explicitlyRequested, false, `Explicit compiled UI fixture is missing under ${base}`);
  test("compiled Magmo UI release fixtures", { skip: "Local compiled release fixtures are not present; source regression tests remain available." }, () => {});
} else {
const F = {
  sha: (value) => crypto.createHash("sha256").update(value).digest("hex"),
  getFactory(code, id) {
    let found;
    T(P.parse(code), { ObjectProperty(p) {
      if (Number(p.node.key.value) === id && ["ArrowFunctionExpression", "FunctionExpression"].includes(p.node.value.type)) {
        assert.equal(found, undefined, `Ambiguous compiled factory ${id}`);
        found = code.slice(p.node.value.start, p.node.value.end);
      }
    } });
    assert.ok(found, `Compiled factory ${id} is missing`);
    return found;
  },
};
const receipt = JSON.parse(fs.readFileSync(path.join(base, newItemOverlay, "receipt.json")));
const change = receipt.changes[0];
const factory = F.getFactory(fs.readFileSync(path.join(base, newItemOverlay, change.file), "utf8"), change.moduleId);
assert.equal(F.sha(factory), change.newFactorySHA256);
const source = `(${factory})`;
const ast = P.parse(source);
const declarations = new Map();
const calls = [];
const functions = [];
T(ast, { VariableDeclarator(p) { if (p.node.id.type === "Identifier") declarations.set(p.node.id.name, p.node); }, CallExpression(p) { calls.push(p.node); }, FunctionDeclaration(p) { functions.push(p.node); } });
const text = (node) => source.slice(node.start, node.end);
function evaluate(node, bindings = {}) { return new Function(...Object.keys(bindings), `return (${text(node)});`)(...Object.values(bindings)); }
const prop = (node, key) => node.arguments?.[1]?.properties?.find((value) => value.key?.name === key);
function callback(name, bindings) { const declaration = declarations.get(name); assert.ok(declaration, `compiled callback ${name}`); return evaluate(declaration.init, bindings); }
function findModal(show) { const modal = calls.find((node) => prop(node, "show")?.value?.name === show); assert.ok(modal, `compiled modal ${show}`); return modal; }
const imageHelpers = callback("__mVisionImages", {});
const indexClient = callback("__mVisionClient", {});
const strong = { id: "AIS42", name: "Correct coil", canApply: true, isLikelySameItem: true, confidence: 0.92, partNumbers: ["PN42"], oem: ["GE"], modality: ["MRI"], model: [], reasons: [] };
function elements(tree, predicate, output = []) {
  if (Array.isArray(tree)) tree.forEach((entry) => elements(entry, predicate, output));
  else if (tree && typeof tree === "object") { if (predicate(tree)) output.push(tree); elements(tree.props?.children, predicate, output); }
  return output;
}
function treeText(tree) {
  if (Array.isArray(tree)) return tree.map(treeText).join(" ");
  if (tree && typeof tree === "object") return treeText(tree.props?.children);
  return tree == null || typeof tree === "boolean" ? "" : String(tree);
}
const jsx = (type, props) => ({ type, props: props || {} });
const Modal = Object.assign(function Modal() {}, { Header: "Header", Title: "Title", Body: "Body", Footer: "Footer" });
const ui = { i: { jsx, jsxs: jsx, Fragment: "Fragment" }, a: { A: Modal }, l: { A: "Button" }, c: { A: "Spinner" }, eC: "OemEvidence", ea: () => new Proxy({}, { get: (_, name) => String(name) }) };

test("compiled helper bytes match frozen inputs and original APIs remain isolated", () => {
  for (const [name, hash] of Object.entries(receipt.inputs)) assert.equal(F.sha(fs.readFileSync(path.resolve(__dirname, "..", name))), hash, name);
  assert.equal(typeof imageHelpers.preparePhotosForAnalysis, "function");
  assert.equal(typeof imageHelpers.preparePhotosForMatching, "function");
  assert.equal(typeof imageHelpers.createPhotoAnalysisSession, "function");
  assert.equal(typeof indexClient.requestItemVisionIndexSync, "function");
  assert.equal(receipt.staticServerShellUnchanged, true);
});

test("compiled state initializes after photos and match declarations; weak and stale matches disable apply", () => {
  const component = functions.find((node) => node.id.name === "eI");
  assert.ok(declarations.get("latestPhotosRef").start > component.body.body[0].end);
  const photos = [{}];
  const session = imageHelpers.createPhotoAnalysisSession();
  const request = session.begin(photos);
  const baseBindings = { __mVisionImages: imageHelpers, analysisSessionRef: { current: session }, analysisRequestRef: { current: request }, rl: photos };
  assert.equal(callback("analysisCanApply", { ...baseBindings, tU: { match: strong } }), true);
  assert.equal(callback("analysisCanApply", { ...baseBindings, tU: { match: { ...strong, confidence: 0.08 } } }), false);
  assert.equal(callback("analysisCanApply", { ...baseBindings, tU: { match: strong }, rl: [{}] }), false);
});

test("compiled modal hides weak candidate data and fill button; errors and no-match differ", () => {
  const bindings = { ...ui, tV: true, tW() {}, analysisError: "", analysisCanApply: false, tU: { match: { ...strong, confidence: 0.08 } }, applyAnalysisMatch() {}, analysisSubmittedPreview: "snapshot", tJ: false, tG: "" };
  const weak = evaluate(findModal("tV"), bindings);
  assert.match(treeText(weak), /No confident catalog match/);
  assert.doesNotMatch(treeText(weak), /Correct coil|8%|Yes, fill item fields/);
  assert.equal(elements(weak, (node) => node.type === "Button" && treeText(node).includes("fill item fields")).length, 0);
  const failed = evaluate(findModal("tV"), { ...bindings, tU: null, analysisError: "Smart Camera is busy" });
  assert.match(treeText(failed), /Analysis could not finish/);
  assert.match(treeText(failed), /Smart Camera is busy/);
  assert.match(treeText(failed), /Your fields have not changed/);
});

test("compiled strong modal shows submitted snapshot and correct fill handler; exact photo is not an AI percentage", () => {
  const apply = () => {};
  const bindings = { ...ui, tV: true, tW() {}, analysisError: "", analysisCanApply: true, tU: { match: strong }, applyAnalysisMatch: apply, analysisSubmittedPreview: "data:image/jpeg;base64,SNAPSHOT", tJ: false, tG: "https://fixture.invalid/catalog.jpg" };
  const modal = evaluate(findModal("tV"), bindings);
  assert.equal(elements(modal, (node) => node.type === "img")[0].props.src, bindings.analysisSubmittedPreview);
  assert.equal(elements(modal, (node) => node.type === "Button" && treeText(node).includes("fill item fields"))[0].props.onClick, apply);
  const exact = evaluate(findModal("tV"), { ...bindings, tU: { match: { ...strong, matchType: "exact_photo", confidence: 1 } } });
  assert.match(treeText(exact), /Same photo/);
  assert.doesNotMatch(treeText(exact), /100%/);
});

test("compiled catalog preview falls back to a retained Parts folder and rejects private or malformed paths", async () => {
  const effect = calls.find((node) => text(node.callee).includes("useEffect") && text(node).includes("Could not load comparison photo:"));
  assert.ok(effect);
  const listed = [], previews = [];
  let finished;
  const done = new Promise((resolve) => { finished = resolve; });
  const preview = evaluate(effect.arguments[0], {
    tU: { match: { ...strong, photoStoragePrefix: "Parts/AIS42/", photoStoragePrefixes: ["ItemChangeRequests/private/", "Parts/../", "Parts/%2e%2e/", "Parts/AIS41/", "Parts/AIS41/"] } }, tV: true,
    __mVisionImages: imageHelpers, tK: (url) => previews.push(url), tY: (loading) => { if (!loading) finished(); },
    A: { A: { storage: () => ({ ref: () => ({ child: (prefix) => ({ list: async (options) => {
      assert.equal(options.maxResults, 20); listed.push(prefix);
      return { items: prefix === "Parts/AIS41/" ? [
        { name: "bad.jpg", fullPath: "ItemChangeRequests/private/bad.jpg", getDownloadURL: async () => { throw new Error("must not use private item"); } },
        { name: "item__one.jpg", fullPath: "Parts/AIS41/item__one.jpg", getDownloadURL: async () => "https://fixture.invalid/retained-photo" },
      ] : [] };
    } }) }) }) } }, console,
  });
  preview();
  await done;
  assert.deepEqual(listed, ["Parts/AIS42/", "Parts/AIS41/"]);
  assert.deepEqual(previews, ["", "https://fixture.invalid/retained-photo"]);
});

test("compiled preview cancellation prevents a late catalog image from replacing the current result", async () => {
  const effect = calls.find((node) => text(node.callee).includes("useEffect") && text(node).includes("Could not load comparison photo:"));
  let release, downloadCalls = 0;
  const pending = new Promise((resolve) => { release = resolve; });
  const previews = [];
  const cleanup = evaluate(effect.arguments[0], { tU: { match: strong }, tV: true, __mVisionImages: imageHelpers, tK: (url) => previews.push(url), tY() {},
    A: { A: { storage: () => ({ ref: () => ({ child: () => ({ list: async () => pending }) }) }) } }, console })();
  cleanup();
  release({ items: [{ name: "one.jpg", fullPath: "Parts/AIS42/one.jpg", getDownloadURL: async () => { downloadCalls += 1; return "late"; } }] });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(downloadCalls, 0);
  assert.deepEqual(previews, [""]);
});

test("compiled apply handler refuses weak/stale results and only fills safe descriptive fields", () => {
  for (const [match, stale] of [[{ ...strong, confidence: 0.08 }, false], [strong, true], [strong, false]]) {
    const photos = [{}];
    const session = imageHelpers.createPhotoAnalysisSession();
    const request = session.begin(photos);
    if (stale) session.invalidate();
    let item = { name: "Typed", pn: [], localSN: "AIS99", sn: ["KEEP"] };
    const apply = callback("applyAnalysisMatch", { __mVisionImages: imageHelpers, tU: { match }, analysisSessionRef: { current: session }, analysisRequestRef: { current: request }, latestPhotosRef: { current: photos }, tW() {}, ix: (value) => [...new Set(value)], ig: (value) => value || [], J: (fn) => { item = fn(item); }, eT() {}, ek() {}, eF() {} });
    apply();
    assert.equal(item.name, match.confidence >= 0.75 && !stale ? strong.name : "Typed");
    assert.equal(item.localSN, "AIS99");
    assert.deepEqual(item.sn, ["KEEP"]);
  }
});

test("compiled Analyze sends grouped fingerprints and entered PN/name; ignores obsolete response", async () => {
  const photos = [{ file: "synthetic file" }];
  const latestPhotosRef = { current: photos };
  const session = imageHelpers.createPhotoAnalysisSession();
  let resolveResponse;
  const pending = new Promise((resolve) => { resolveResponse = resolve; });
  let notifyFetch;
  const started = new Promise((resolve) => { notifyFetch = resolve; });
  const hashes = ["a".repeat(64), "b".repeat(64), "c".repeat(64)];
  const results = [], previews = [], modals = [], errors = [];
  const analyze = callback("iO", {
    rl: photos, tq: false, analysisSessionRef: { current: session }, analysisRequestRef: { current: null }, latestPhotosRef, im: { current: true },
    __mVisionImages: { ...imageHelpers, preparePhotosForMatching: async () => ({ images: ["submitted"], photoSha256: [hashes[0]], photoHashGroups: [hashes] }) },
    tH() {}, tz: (value) => results.push(value), setAnalysisError: (value) => errors.push(value), setAnalysisSubmittedPreview: (value) => previews.push(value), tW: (value) => modals.push(value),
    A: { A: { auth: () => ({ currentUser: { getIdToken: async () => "synthetic-token" } }) } }, K: { name: "Typed coil", pn: ["PN42"], localSN: "AIS99" }, ix: (value) => [...new Set(value)], ig: (value) => value || [], eN: ["GE"], eI: ["MRI"], eM: [],
    fetch: async (_, options) => { const body = JSON.parse(options.body); assert.deepEqual(body.photoHashGroups, [hashes]); assert.equal(body.hints.name, "Typed coil"); assert.deepEqual(body.hints.partNumbers, ["PN42"]); assert.equal(body.hints.localSN, undefined); notifyFetch(); return pending; }, console,
  });
  const operation = analyze();
  await started;
  latestPhotosRef.current = [{}];
  resolveResponse({ ok: true, json: async () => ({ match: strong }) });
  await operation;
  assert.deepEqual(results, [null]);
  assert.deepEqual(previews, [""]);
  assert.deepEqual(modals, []);
  assert.deepEqual(errors, [""]);
});

test("compiled upload partial retry keeps same paths and bytes; saved follow-up retries never commit inventory", async () => {
  const originals = [{ type: "image/png", fixture: "first" }, { type: "image/png", fixture: "second" }];
  const latestPhotosRef = { current: originals.map((original) => ({ file: original, category: "item" })) };
  const puts = [];
  let fail = true, paths = 0, indexAttempts = 0;
  const firebase = { auth: () => ({ currentUser: { getIdToken: async () => "fixture-token" } }), storage: () => ({ ref: () => ({ child: (storagePath) => ({ put: async (original) => { puts.push({ storagePath, original }); if (original === originals[1] && fail) { fail = false; throw new Error("Storage unavailable"); } }, getDownloadURL: async () => `https://fixture.invalid/${storagePath}` }) }) }) };
  const upload = callback("ni", { tD: { current: null }, tP: { current: 0 }, latestPhotosRef, A: { A: firebase }, rs: (value) => { latestPhotosRef.current = value; }, D: { l4: (value) => value, Yz: () => `fixture-${++paths}.png` } });
  const statuses = [];
  const refresh = callback("refreshSavedItemIndex", { ni: upload, A: { A: firebase }, im: { current: true }, setSavedIndexStatus: (value) => statuses.push(value), __mVisionClient: { completeSavedItemIndex: indexClient.completeSavedItemIndex, requestItemVisionIndexSync: async (args) => { assert.equal(args.itemId, "AIS99"); indexAttempts += 1; } } });
  const context = { itemId: "AIS99", previousItemId: "" };
  const first = await refresh(context);
  assert.equal(first.stage, "photos");
  assert.equal(first.complete, false);
  assert.equal(indexAttempts, 0);
  const retryActive = { current: false };
  const retry = callback("retrySavedItemIndex", { savedIndexRetryRef: { current: context }, savedIndexRetryActiveRef: retryActive, setSavedIndexRetryBusy() {}, refreshSavedItemIndex: refresh, im: { current: true } });
  await retry();
  assert.equal(statuses[1].complete, true);
  assert.equal(indexAttempts, 1);
  assert.equal(paths, 2);
  assert.equal(puts.length, 3);
  assert.equal(puts[1].storagePath, puts[2].storagePath);
  assert.equal(puts[0].original, originals[0]);
  assert.equal(puts[2].original, originals[1]);
  assert.equal(retryActive.current, false);
});

test("compiled saved modal explains partial success and preserves navigation only after photos finish", () => {
  const status = { itemId: "AIS99", complete: false, stage: "photos", retryable: true, message: "Item AIS99 is saved, but photos are pending." };
  const retry = () => {};
  const modal = evaluate(findModal("rM"), { ...ui, rM: true, iR() {}, savedIndexStatus: status, savedIndexRetryBusy: false, retrySavedItemIndex: retry });
  assert.match(treeText(modal), /Item saved — photo matching pending/);
  assert.match(treeText(modal), /does not create another item/);
  assert.equal(elements(modal, (node) => node.type === "Button" && treeText(node).includes("Retry photos"))[0].props.onClick, retry);
  const navigation = [], paths = [];
  const bindings = { savedIndexRetryActiveRef: { current: false }, rF() {}, savedIndexStatus: status, rO: (value) => paths.push(value), rE: "/NewSearch/item/AIS99", e: { push: (href) => navigation.push(href) } };
  callback("iR", bindings)();
  assert.deepEqual(navigation, []);
  callback("iR", { ...bindings, savedIndexStatus: { ...status, complete: true, stage: "complete" } })();
  assert.deepEqual(navigation, ["/NewSearch/item/AIS99"]);
});

test("compiled save awaits upload/index context before completing and removes silent index catch", () => {
  const save = text(functions.find((node) => node.id.name === "nl"));
  assert.match(save, /await\(async\(\)=>\{const indexContext=\{itemId:et,previousItemId:u&&u!==et\?u:""\};savedIndexRetryRef.current=indexContext;setSavedIndexStatus\(null\);await refreshSavedItemIndex\(indexContext\);\}\)\(\)/);
  assert.doesNotMatch(save, /Smart Camera index update failed:/);
  assert.ok(save.indexOf("await refreshSavedItemIndex(indexContext)") < save.indexOf('console.log("Item saved!")'));
});

const editorReceipt = JSON.parse(fs.readFileSync(path.join(base, editorOverlay, "receipt.json")));
for (const [index, editorChange] of editorReceipt.changes.entries()) {
  const kind = index === 0 ? "server" : "client";
  const editorFactory = F.getFactory(fs.readFileSync(path.join(base, editorOverlay, editorChange.file), "utf8"), editorChange.moduleId);
  assert.equal(F.sha(editorFactory), editorChange.newFactorySHA256);
  const editorSource = `(${editorFactory})`;
  const editorAst = P.parse(editorSource);
  const report = kind === "server" ? "b" : "r";
  let update, postSave, navigate, savedModal, finishAssets, retryAssets, upload;
  const editorText = (node) => editorSource.slice(node.start, node.end);
  T(editorAst, {
    FunctionDeclaration(p) {
      if (p.node.id.name === "updateSavedItemIndex") update = p.node;
      if (p.node.id.name === "__magmoNavigateToSavedItem") navigate = p.node;
      if (p.node.id.name === "finishSavedItemAssets") finishAssets = p.node;
      if (p.node.id.name === "retrySavedItemAssets") retryAssets = p.node;
    },
    VariableDeclarator(p) {
      if (p.node.id.name === (kind === "server" ? "eT" : "an")) upload = p.node.init;
      if (p.node.id.name === "__mSavedAssets") {
        const block = p.parentPath.parentPath.node;
        const last = block.body.at(-1);
        assert.equal(last.type, "ReturnStatement");
        const first = block.body[block.body.indexOf(p.parentPath.node) - 1];
        postSave = editorSource.slice(first.start, last.end);
      }
    },
    CallExpression(p) {
      const value = editorText(p.node);
      if (prop(p.node, "show")?.value?.name === (kind === "server" ? "bW" : "te") && value.includes("Retry Smart Camera update")) savedModal = p.node;
    },
  });
  assert.ok(update && postSave && navigate && savedModal && finishAssets && retryAssets && upload, `${kind} expected composed editor spans`);
  const run = (code, bindings) => new Function(...Object.keys(bindings), `return (${code});`)(...Object.values(bindings));

  test(`compiled ${kind} editor index retry keeps saved identity and reports a partial success`, async () => {
    let attempt = 0;
    const busy = [], warnings = [];
    const user = { getIdToken: async () => "synthetic-token" };
    const bindings = {
      setSavedVisionIndexBusy: (value) => busy.push(value), setSavedVisionIndexWarning: (value) => warnings.push(value),
      __mVisionClient: { requestItemVisionIndexSync: async (args) => { assert.equal(args.itemId, "AIS99"); assert.equal(args.previousItemId, "AIS98"); assert.equal(args.user, user); if (++attempt === 1) throw new Error("Index timeout"); } },
      [kind === "server" ? "k" : "j"]: { A: { auth: () => ({ currentUser: user }) } }, console: { warn() {} },
    };
    const updateIndex = run(editorText(update), bindings);
    assert.equal(await updateIndex("AIS99", "AIS98"), false);
    assert.equal(warnings[0].itemId, "AIS99");
    assert.match(warnings[0].message, /item and photos are saved/);
    assert.equal(await updateIndex("AIS99", "AIS98"), true);
    assert.equal(warnings[1], null);
    assert.deepEqual(busy, [true, false, true, false]);
  });

  test(`compiled ${kind} editor preserves same-ID save and rename navigation after index warning`, async () => {
    for (const [savedId, photosComplete] of [["AIS99", true], ["AIS100", true], ["AIS99", false], ["AIS100", false]]) {
      const navigations = [], progress = [];
      let confirmations = 0, recovery = "", savedName = "";
      const baseline = { current: {} };
      const router = { push: async (href) => { navigations.push(href); throw new Error("Synthetic route unavailable"); } };
      const common = {
        console: { log() {}, warn() {} }, finishSavedItemAssets: async (itemId, previousItemId) => { assert.equal(itemId, savedId); assert.equal(previousItemId, "AIS99"); return { photoUrls: ["photo"], photosComplete, indexReady: false }; }, savedAssetRecoveryRef: { current: null },
        __magmoNavigateToSavedItem: run(editorText(navigate), {}), __magmoSetSavedItemNavigationHref: (href) => { recovery = href; },
      };
      const data = { name: "Saved coil" }, formatted = { status: "Good" }, audit = { selectionHistory: [{ old: true }], saveHistory: [{ saved: true }] };
      const bindings = kind === "server" ? {
        ...common, b: (value) => progress.push(value), az: (value) => { savedName = value; }, ar: data, F: baseline, U: formatted,
        ak: savedId, m: true, d: router, x: "AIS99", n: false, bX: () => { confirmations += 1; }, a: audit,
      } : {
        ...common, r: (value) => progress.push(value), eG: (value) => { savedName = value; }, eq: data, Y: baseline, R: formatted,
        eo: savedId, d: true, x: router, H: "AIS99", u: false, tr: () => { confirmations += 1; }, e: audit,
      };
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const result = await new AsyncFunction(...Object.keys(bindings), postSave)(...Object.values(bindings));
      assert.equal(result.docId, savedId);
      assert.equal(result.photosComplete, photosComplete);
      assert.equal(savedName, "Saved coil");
      assert.equal(baseline.current.localSN, savedId);
      assert.equal(confirmations, 1, "Index warning opens saved dialog even when normal confirmation suppressed");
      assert.deepEqual(result.saveHistory, audit.saveHistory);
      assert.deepEqual(navigations, savedId === "AIS99" || !photosComplete ? [] : ["/NewSearch/item/AIS100"]);
      assert.equal(recovery, savedId === "AIS99" || !photosComplete ? "" : "/NewSearch/item/AIS100");
    }
  });

  test(`compiled ${kind} editor warning modal includes retry and retained navigation recovery`, () => {
    const bindings = {
      savedVisionIndexWarning: { itemId: "AIS99", previousItemId: "AIS98", message: "Your item and photos are saved. Index pending." }, savedVisionIndexBusy: false,
      retrySavedItemAssets() {}, __magmoSavedItemNavigationHref: "/NewSearch/item/AIS99",
      ...(kind === "server" ? { e: { jsx, jsxs: jsx }, g: { aF: Modal, $n: "Button" }, bW: true, d9() {} } : { i: { jsx, jsxs: jsx }, a: { A: Modal }, l: { A: "Button" }, te: true, nS() {} }),
    };
    const modal = run(editorText(savedModal), bindings);
    assert.match(treeText(modal), /Index pending/);
    assert.match(treeText(modal), /Retry Smart Camera update/);
    assert.match(treeText(modal), /new item address could not be opened automatically/);
    assert.equal(elements(modal, (node) => node.type === "a")[0].props.href, "/NewSearch/item/AIS99");
  });

  test(`compiled ${kind} editor retries partial photo uploads and index without another inventory save`, async () => {
    const original = [{ type: "image/png", name: "first" }, { type: "image/png", name: "second" }];
    const savedAssetPhotosRef = { current: original.map((file) => ({ file, category: "item" })) };
    const puts = [], warnings = [], navigation = [];
    let names = 0, failed = false, indexed = 0;
    const firebase = { storage: () => ({ ref: () => ({ child: (storagePath) => ({ put: async (file) => { puts.push({ storagePath, file }); if (file === original[1] && !failed) { failed = true; throw new Error("Storage unavailable"); } }, getDownloadURL: async () => `https://fixture.invalid/${storagePath}` }) }) }) };
    const uploadPhotos = run(editorText(upload), {
      savedAssetPhotosRef, [kind === "server" ? "k" : "j"]: { A: firebase }, [kind === "server" ? "bv" : "rD"]: (photos) => { savedAssetPhotosRef.current = photos; },
      [kind === "server" ? "G" : "q"]: { l4: (category) => category, Yz: () => `fixture-${++names}.png` },
    });
    const finish = run(editorText(finishAssets), { savedAssetPhotosRef, [kind === "server" ? "eT" : "an"]: uploadPhotos, setSavedVisionIndexWarning: (warning) => warnings.push(warning), updateSavedItemIndex: async () => { indexed += 1; return true; } });
    const first = await finish("AIS100", "AIS99");
    assert.equal(first.photosComplete, false);
    assert.equal(first.indexReady, false);
    assert.match(warnings[0].message, /Item AIS100 is saved/);
    assert.equal(indexed, 0);
    const retry = run(editorText(retryAssets), {
      savedAssetRecoveryRef: { current: { itemId: "AIS100", previousItemId: "AIS99", redirect: true } }, savedVisionIndexWarning: warnings[0],
      [kind === "server" ? "Z" : "eD"]: { current: { run: async (_, __, callback) => callback(() => {}) } }, setSavedVisionIndexBusy() {}, finishSavedItemAssets: finish,
      __magmoNavigateToSavedItem: run(editorText(navigate), {}), [kind === "server" ? "d" : "x"]: { push: async (href) => { navigation.push(href); return true; } },
      [kind === "server" ? "x" : "H"]: "AIS99", __magmoSetSavedItemNavigationHref() {}, [kind === "server" ? "bX" : "tr"]() {},
    });
    const result = await retry();
    assert.equal(result.photosComplete, true);
    assert.equal(result.indexReady, true);
    assert.equal(indexed, 1);
    assert.equal(names, 2);
    assert.equal(puts.length, 3);
    assert.equal(puts[1].storagePath, puts[2].storagePath);
    assert.equal(puts[2].file, original[1]);
    assert.deepEqual(navigation, ["/NewSearch/item/AIS100"]);
  });

  test(`compiled ${kind} shipping and receiving stop after a partial photo save`, () => {
    let guard;
    T(editorAst, { IfStatement(p) { if (editorText(p.node.test).includes(".photosComplete===false") && editorText(p.node.test).includes("?.docId")) guard = p.node.test; } });
    assert.ok(guard);
    const name = guard.left.argument.object.name;
    assert.equal(run(editorText(guard), { [name]: { docId: "AIS99", photosComplete: false } }), true);
    assert.equal(run(editorText(guard), { [name]: { docId: "AIS99", photosComplete: true } }), false);
  });
}
}
