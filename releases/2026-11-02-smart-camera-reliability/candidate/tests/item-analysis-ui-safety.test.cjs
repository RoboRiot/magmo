"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const babel = require("@babel/core");
const parser = require("@babel/parser");
const { requestItemVisionIndexSync, completeSavedItemIndex } = require("../utils/itemVisionIndexClient.cjs");

function loadPhotoHelpers() {
  const filename = path.resolve(__dirname, "../utils/itemImageAnalysis.js");
  const source = babel.transformSync(fs.readFileSync(filename, "utf8"), { filename, babelrc: false, configFile: false, plugins: ["@babel/plugin-transform-modules-commonjs"] }).code;
  const module = { exports: {} };
  class ImageFixture {
    naturalWidth = 3000;
    naturalHeight = 2000;
    set src(value) { queueMicrotask(() => this.onload()); }
  }
  const document = { createElement() { return { getContext: () => ({ drawImage() {} }), toDataURL(type, quality) { return `data:image/jpeg;base64,${Buffer.from(quality === 0.82 ? "resized" : `approved:${this.width}:${quality}`).toString("base64")}`; } }; } };
  new Function("module", "exports", "globalThis", "Image", "URL", "document", source)(module, module.exports, { crypto: crypto.webcrypto }, ImageFixture, { createObjectURL: () => "blob:fixture", revokeObjectURL() {} }, document);
  return module.exports;
}
const helpers = loadPhotoHelpers();
const pageSource = fs.readFileSync(path.resolve(__dirname, "../pages/NewSearch/AddItem/NewItem.js"), "utf8");
const pageAst = parser.parse(pageSource, { sourceType: "module", plugins: ["jsx"] });
const component = pageAst.program.body.find((node) => node.type === "ExportDefaultDeclaration").declaration;
function realPageFunction(name, bindings) {
  const declaration = component.body.body.flatMap((node) => node.type === "VariableDeclaration" ? node.declarations : []).find((node) => node.id?.name === name);
  assert.ok(declaration, `${name} exists in the real page`);
  return new Function(...Object.keys(bindings), `return (${pageSource.slice(declaration.init.start, declaration.init.end)});`)(...Object.values(bindings));
}
const file = (text) => new Blob([text], { type: "image/png" });
const applicable = { id: "AIS42", canApply: true, isLikelySameItem: true, confidence: 0.91, name: "Correct coil", partNumbers: ["PN42"], oem: ["GE"], modality: ["MRI"], model: [] };

test("matching fingerprints are the original bytes, not resized JPEGs, and only cover submitted photos", async () => {
  const originals = [file("original one"), file("original two"), file("original three"), file("ignored fifth")];
  let ignoredRead = false;
  originals[3].arrayBuffer = async () => { ignoredRead = true; throw new Error("Must not read fifth photo"); };
  const result = await helpers.preparePhotosForMatching([
    null, { url: "blob:invalid-without-file" }, { file: originals[0] },
    { url: "https://example.invalid/photo.jpg" }, { file: originals[1] }, { file: originals[2] }, { file: originals[3] },
  ]);
  assert.equal(result.images.length, 4);
  assert.equal(result.images[0], "data:image/jpeg;base64,cmVzaXplZA==");
  assert.equal(result.images[1], "https://example.invalid/photo.jpg");
  assert.deepEqual(result.photoSha256, ["original one", "original two", "original three"].map((value) => crypto.createHash("sha256").update(value).digest("hex")));
  assert.equal(result.photoHashGroups.length, result.images.length);
  assert.deepEqual(result.photoHashGroups[1], []);
  assert.deepEqual(result.photoHashGroups[0], ["original one", "approved:1600:0.8", "approved:1280:0.72"].map((value) => crypto.createHash("sha256").update(value).digest("hex")));
  assert.equal(ignoredRead, false);
});

test("identical originals hash once per File and duplicate fingerprints are collapsed", async () => {
  const original = file("same original");
  const read = original.arrayBuffer.bind(original);
  let reads = 0;
  original.arrayBuffer = () => { reads += 1; return read(); };
  const result = await helpers.preparePhotosForMatching([{ file: original }, { file: original }]);
  assert.equal(result.images.length, 2);
  assert.equal(result.photoSha256.length, 1);
  assert.equal(result.photoHashGroups.length, 2);
  assert.deepEqual(result.photoHashGroups[0], result.photoHashGroups[1]);
  assert.equal(result.photoHashGroups[0].length, 3);
  assert.equal(reads, 1);
});

test("a cancelled preparation never submits a partially hashed photo set", async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(helpers.preparePhotosForMatching([{ file: file("photo") }], { signal: controller.signal }), { name: "AbortError" });
});

test("new requests, replacement photos, reordering and cancellation invalidate old analysis", () => {
  const session = helpers.createPhotoAnalysisSession();
  const photos = [{ file: file("one") }, { file: file("two") }];
  const first = session.begin(photos);
  assert.equal(session.isCurrent(first, [...photos]), true);
  assert.equal(session.isCurrent(first, [...photos].reverse()), false);
  assert.equal(session.isCurrent(first, [{ ...photos[0] }, photos[1]]), false);
  const second = session.begin(photos);
  assert.equal(first.controller.signal.aborted, true);
  assert.equal(session.isCurrent(first, photos), false);
  assert.equal(session.isCurrent(second, photos), true);
  session.invalidate();
  assert.equal(session.isCurrent(second, photos), false);
});

test("an 8% candidate, old server contract, false likely flag, invalid score and stale result cannot apply", () => {
  const cases = [
    { ...applicable, confidence: 0.08 }, { ...applicable, canApply: undefined },
    { ...applicable, isLikelySameItem: false }, { ...applicable, confidence: NaN },
    { ...applicable, confidence: 75 }, { ...applicable, confidence: "0.99" }, applicable,
  ];
  for (const [index, match] of cases.entries()) {
    const photos = [{ file: file("photo") }];
    const session = helpers.createPhotoAnalysisSession();
    const request = session.begin(photos);
    if (index === cases.length - 1) session.invalidate();
    let changes = 0;
    const apply = realPageFunction("applyAnalysisMatch", {
      analysisResult: { match }, isAnalysisMatchApplicable: helpers.isAnalysisMatchApplicable,
      analysisSessionRef: { current: session }, analysisRequestRef: { current: request }, latestPhotosRef: { current: photos },
      setShowAnalysisModal() {}, setItems: () => { changes += 1; }, setSelectedOems: () => { changes += 1; },
      setSelectedModalities: () => { changes += 1; }, setSelectedModels: () => { changes += 1; },
      uniqueSelection: (values) => [...new Set(values)], normalizeSelection: (values) => values || [],
    });
    apply();
    assert.equal(changes, 0, `unsafe case ${index} left fields unchanged`);
  }
});

test("a valid reviewed match fills descriptive fields without copying item identity", () => {
  const photos = [{ file: file("photo") }];
  const session = helpers.createPhotoAnalysisSession();
  const request = session.begin(photos);
  let item = { name: "Typed name", pn: [], sn: ["KEEP-SERIAL"], localSN: "AIS99" };
  const apply = realPageFunction("applyAnalysisMatch", {
    analysisResult: { match: { ...applicable, localSN: "AIS42", sn: ["DO-NOT-COPY"] } }, isAnalysisMatchApplicable: helpers.isAnalysisMatchApplicable,
    analysisSessionRef: { current: session }, analysisRequestRef: { current: request }, latestPhotosRef: { current: photos },
    setShowAnalysisModal() {}, setItems: (update) => { item = update(item); }, setSelectedOems() {}, setSelectedModalities() {}, setSelectedModels() {},
    uniqueSelection: (values) => [...new Set(values)], normalizeSelection: (values) => values || [],
  });
  apply();
  assert.equal(item.name, applicable.name);
  assert.deepEqual(item.pn, ["PN42"]);
  assert.equal(item.localSN, "AIS99");
  assert.deepEqual(item.sn, ["KEEP-SERIAL"]);
});

test("a response for changed photos is discarded even before the photo-change effect aborts it", async () => {
  const photos = [{ file: file("photo"), url: "blob:photo" }];
  const latestPhotosRef = { current: photos };
  const session = helpers.createPhotoAnalysisSession();
  let release;
  const received = new Promise((resolve) => { release = resolve; });
  let fetchStarted;
  const started = new Promise((resolve) => { fetchStarted = resolve; });
  const results = [];
  const shown = [];
  const analyze = realPageFunction("handleAnalyzePhotos", {
    photos, analyzingPhotos: false, analysisSessionRef: { current: session }, analysisRequestRef: { current: null }, latestPhotosRef,
    isMountedRef: { current: true }, setAnalyzingPhotos() {}, setAnalysisResult: (result) => results.push(result), setAnalysisError() {}, setAnalysisSubmittedPreview() {}, setShowAnalysisModal: (value) => shown.push(value),
    preparePhotosForMatching: async () => ({ images: ["data:image/jpeg;base64,AAAA"], photoSha256: ["a".repeat(64)] }),
    firebase: { auth: () => ({ currentUser: { getIdToken: async () => "fixture-token" } }) },
    fetch: async (_, options) => { const payload = JSON.parse(options.body); assert.equal(payload.hints.name, "Typed coil"); assert.deepEqual(payload.hints.partNumbers, ["PN42"]); assert.equal(payload.hints.localSN, undefined); fetchStarted(); return received; },
    items: { name: "Typed coil", pn: ["PN42"], localSN: "AIS99" }, selectedOems: [], selectedModalities: [], selectedModels: [],
    uniqueSelection: (values) => [...new Set(values)], normalizeSelection: (values) => values || [], console,
  });
  const running = analyze();
  await started;
  latestPhotosRef.current = [...photos, { file: file("new") }];
  release({ ok: true, json: async () => ({ match: applicable }) });
  await running;
  assert.deepEqual(results, [null]);
  assert.deepEqual(shown, []);
});

test("the saved item index waits for photo completion and a retry does not repeat an inventory save", async () => {
  const events = [];
  let release;
  const uploaded = new Promise((resolve) => { release = resolve; });
  let attempts = 0;
  const operation = {
    itemId: "AIS99", uploadPhotos: async () => { events.push("photos"); await uploaded; },
    syncIndex: async () => { events.push("index"); if (++attempts === 1) throw new Error("Photo index unavailable"); },
  };
  const pending = completeSavedItemIndex(operation);
  assert.deepEqual(events, ["photos"]);
  release();
  const first = await pending;
  assert.equal(first.complete, false);
  assert.equal(first.itemId, "AIS99");
  assert.equal(first.stage, "index");
  const retry = await completeSavedItemIndex(operation);
  assert.equal(retry.complete, true);
  assert.equal(retry.itemId, first.itemId);
  assert.deepEqual(events, ["photos", "index", "photos", "index"]);
});

test("photo upload failure is a partial saved state and never indexes incomplete uploads", async () => {
  let indexCalls = 0;
  const result = await completeSavedItemIndex({ itemId: "AIS99", uploadPhotos: async () => { throw new Error("Storage unavailable"); }, syncIndex: async () => { indexCalls += 1; } });
  assert.equal(result.complete, false);
  assert.equal(result.stage, "photos");
  assert.equal(result.retryable, true);
  assert.match(result.message, /AIS99 is saved/);
  assert.equal(indexCalls, 0);
});

test("the real upload retry preserves originals and reuses paths without reuploading completed photos", async () => {
  const first = file("first original");
  const second = file("second original");
  const latestPhotosRef = { current: [{ file: first, category: "item" }, { file: second, category: "label" }] };
  const puts = [];
  let generatedNames = 0;
  let failed = false;
  const uploadsRef = { current: 0 };
  const upload = realPageFunction("uploadPhotos", {
    photoActionRef: { current: null }, photoUploadsRef: uploadsRef, latestPhotosRef,
    setPhotos: (photos) => { latestPhotosRef.current = photos; },
    normalizeItemPhotoCategory: (category) => category,
    createItemPhotoStorageName: (category) => `${category}__fixture-${++generatedNames}.png`,
    firebase: { storage: () => ({ ref: () => ({ child: (storagePath) => ({
      put: async (original) => { puts.push({ storagePath, original }); if (original === second && !failed) { failed = true; throw new Error("Storage disconnected"); } },
      getDownloadURL: async () => `https://storage.invalid/${storagePath}`,
    }) }) }) },
  });
  await assert.rejects(upload("AIS99"), /Storage disconnected/);
  assert.equal(uploadsRef.current, 0);
  assert.equal(latestPhotosRef.current[0].file, null);
  assert.equal(latestPhotosRef.current[1].file, second);
  assert.equal(latestPhotosRef.current[1].storageItemId, "AIS99");
  const result = await upload("AIS99");
  assert.equal(generatedNames, 2);
  assert.equal(puts.length, 3);
  assert.equal(puts[0].original, first);
  assert.equal(puts[1].original, second);
  assert.equal(puts[2].original, second);
  assert.equal(puts[1].storagePath, puts[2].storagePath);
  assert.ok(latestPhotosRef.current.every((photo) => photo.file === null && photo.storageItemId === "AIS99"));
  assert.equal(result.length, 2);
});

test("sync errors, malformed success and incomplete photo indexes remain retryable saved states", async () => {
  for (const payload of [{ ok: false, error: "Some photos could not be indexed", retryable: true }, { ok: true }, { ok: true, photoIndex: { complete: false } }]) {
    await assert.rejects(requestItemVisionIndexSync({ itemId: "AIS99", fetchImpl: async () => ({ ok: true, json: async () => payload }) }), (error) => error.stage === "index" && error.retryable === true);
  }
  await assert.rejects(requestItemVisionIndexSync({ itemId: "AIS99", fetchImpl: async () => ({ ok: false, json: async () => ({ retryable: false, error: "Item no longer exists" }) }) }), (error) => error.retryable === false);
});

test("sync sends only the committed identity and aborts its network request on timeout", async () => {
  let signal;
  await assert.rejects(requestItemVisionIndexSync({ itemId: "AIS99", previousItemId: "AIS98", user: { getIdToken: async () => "fixture-token" }, timeoutMs: 10, fetchImpl: async (_, options) => {
    signal = options.signal;
    assert.deepEqual(JSON.parse(options.body), { itemId: "AIS99", previousItemId: "AIS98" });
    assert.equal(options.headers.Authorization, "Bearer fixture-token");
    return new Promise(() => {});
  } }), /index update timed out/);
  assert.equal(signal.aborted, true);
});

test("a confirmed complete photo index is returned as success", async () => {
  const payload = { ok: true, itemId: "AIS99", indexVersion: 2, photoIndex: { complete: true, photoCount: 3, hashedCount: 3 } };
  assert.deepEqual(await requestItemVisionIndexSync({ itemId: "AIS99", fetchImpl: async () => ({ ok: true, json: async () => payload }) }), payload);
});
