"use strict";

// The real API, normalization and fingerprint verifier run against in-memory
// Firebase/Storage/OpenAI fixtures. No credentials, network, or live writes.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const babel = require("@babel/core");

function loadModule(relativePath, mocks = {}, logger = console) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const code = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    babelrc: false, configFile: false, filename,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => Object.hasOwn(mocks, request) ? mocks[request]
    : require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request);
  new Function("require", "module", "exports", "console", code)(localRequire, module, module.exports, logger);
  return module.exports;
}

async function loadCompiledRoute(filename, mocks, logger) {
  const code = fs.readFileSync(path.resolve(filename), "utf8");
  const factories = new Map();
  const traverse = require("@babel/traverse").default;
  traverse(babel.parseSync(code, { babelrc: false, configFile: false }), {
    ObjectProperty(p) {
      if (p.node.key.type !== "NumericLiteral" || !p.get("value").isFunction()) return;
      assert.ok(!factories.has(p.node.key.value), "compiled factory IDs must be unique");
      factories.set(p.node.key.value, code.slice(p.node.value.start, p.node.value.end));
    },
  });
  const modules = new Map();
  function webpackRequire(id) {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (modules.has(id)) return modules.get(id).exports;
    const module = { exports: {} }; modules.set(id, module);
    assert.ok(factories.has(id), `Missing compiled factory ${id}`);
    const factory = new Function("require", "console", `return (${factories.get(id)});`)(
      (name) => {
        assert.equal(name, "node:crypto", "compiled route must not load production SDKs");
        return require(name);
      }, logger);
    factory(module, module.exports, webpackRequire);
    return module.exports;
  }
  webpackRequire.r = (exports) => Object.defineProperty(exports, "__esModule", { value: true });
  webpackRequire.d = (exports, getters) => Object.entries(getters).forEach(([name, get]) =>
    Object.defineProperty(exports, name, { enumerable: true, get }));
  webpackRequire.n = (value) => { const getter = () => value?.__esModule ? value.default : value;
    webpackRequire.d(getter, { a: getter }); return getter; };
  webpackRequire.a = (module, body) => {
    module.ready = new Promise((resolve, reject) => {
      Promise.resolve(body((dependencies) => dependencies, (error) => error ? reject(error) : resolve()))
        .catch(reject);
    });
  };
  const exports = webpackRequire(37922);
  await modules.get(37922).ready;
  return exports;
}

const indexUtils = loadModule("utils/itemVisionIndex.js");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const image = "data:image/jpeg;base64,c3ludGhldGljLWltYWdl";
const observation = (patch = {}) => ({
  labelFound: true, confidence: 0.99, partNumbers: ["PUMP-52"], serialNumbers: [],
  manufacturerNames: ["GE"], modelNumbers: [], visibleText: ["PUMP-52"], searchTerms: ["pump"],
  itemNameGuess: "Water pump", itemType: "pump", oem: "GE", modality: "CT", model: "",
  visualDescription: "Round pump", distinguishingFeatures: [], ...patch,
});
function item(name = "Water pump", pn = ["PUMP-52"], patch = {}) {
  const result = { name, pn, TheMachine: { OEM: "GE", Modality: "CT", Model: "" }, ...patch };
  result.generalSearchTokens = indexUtils.buildVisionSearchTokens(result);
  result.nameTokens = indexUtils.normalizeVisionSearchText(result.name).split(" ");
  return result;
}
function indexRecord(id, source, patch = {}) {
  return { ...indexUtils.buildItemVisionIndexRecord(source, id), ...patch };
}
const originalBytes = Buffer.from("the exact original uploaded photo bytes");
function fingerprint(id, bytes = originalBytes, patch = {}) {
  return { path: `Parts/${id}/original.jpg`, generation: "7", size: bytes.length, sha256: hash(bytes), ...patch };
}
function indexedPhoto(id, source, files = [fingerprint(id)]) {
  return indexRecord(id, source, { photoSha256: files.map((entry) => entry.sha256), photoFingerprintFiles: files });
}

let fixtureSequence = 0;
function fixture({ items = {}, indexes = {}, tombstones = {}, objects = {}, observed = observation(),
  comparison, failQuery, failHydrate = false, metadataFailure, actor = { uid: `fixture-${++fixtureSequence}` } } = {}) {
  const calls = { queries: [], hydrated: [], storage: [], models: [], logs: [], writes: 0 };
  const records = { Test: items, ItemVisionIndex: indexes, ArchivedItemIds: tombstones };
  const snap = (collection, id) => ({ id, exists: Object.hasOwn(records[collection] || {}, id),
    data: () => records[collection]?.[id] });
  function query(collection, filter = null, limit = Infinity) {
    return {
      where(field, operator, value) { return query(collection, { field, operator, value }, limit); },
      limit(value) { return query(collection, filter, value); },
      doc(id) { return { collection, id }; },
      async get() {
        assert.ok(filter, "collection scans are forbidden");
        const request = { collection, ...filter, limit }; calls.queries.push(request);
        if (failQuery?.(request)) throw Object.assign(new Error("synthetic Firestore unavailable"), { code: 14 });
        const matches = (value) => filter.operator === "array-contains"
          ? Array.isArray(value) && value.includes(filter.value)
          : filter.operator === "array-contains-any"
          ? Array.isArray(value) && filter.value.some((entry) => value.includes(entry))
          : filter.operator === "==" ? value === filter.value : false;
        const docs = Object.entries(records[collection] || {}).filter(([, data]) => matches(data[filter.field]))
          .slice(0, limit).map(([id]) => snap(collection, id));
        return { docs };
      },
    };
  }
  const db = { collection: (name) => query(name), async getAll(...refs) {
    calls.hydrated.push(...refs);
    if (failHydrate) throw Object.assign(new Error("synthetic read failed"), { code: 14 });
    return refs.map((ref) => snap(ref.collection, ref.id));
  } };
  function file(name) {
    return { name,
      async getMetadata() {
        calls.storage.push({ operation: "metadata", name });
        if (metadataFailure) throw Object.assign(new Error("synthetic storage failure"), { code: metadataFailure });
        if (!objects[name]) throw Object.assign(new Error("synthetic missing"), { code: 404 });
        return [{ generation: objects[name].generation || "7", size: objects[name].bytes.length }];
      },
      async download() { calls.storage.push({ operation: "download", name }); return [objects[name].bytes]; },
    };
  }
  const bucket = { file, async getFiles({ prefix, maxResults }) {
    calls.storage.push({ operation: "list", prefix });
    return [Object.keys(objects).filter((name) => name.startsWith(prefix)).slice(0, maxResults).map(file)];
  } };
  class FakeOpenAI {
    constructor() { this.responses = { create: async (input) => {
      calls.models.push(input);
      const kind = input.text.format.name;
      return { output_text: JSON.stringify(kind === "item_photo_observation" ? observed : (comparison || {
        topMatchId: "AIS1", confidence: 0.95, isLikelySameItem: true, matchedPartNumber: "PUMP-52",
        reasons: ["Clear PN agreement"], warnings: [], rankedCandidateIds: ["AIS1"],
      })) };
    } }; }
  }
  const logger = Object.fromEntries(["info", "warn", "error"].map((level) => [level, (...args) => calls.logs.push({ level, args })]));
  const routeMocks = {
    openai: { OpenAI: FakeOpenAI },
    "firebase-admin/storage": { getStorage: () => ({ bucket: () => bucket }) },
    "../../../context/FirebaseAdmin": { adminDb: db },
    "../../../utils/apiAuth": { requireFirebaseAuth: async () => actor },
    "../../../utils/itemVisionIndex": indexUtils,
    "../../../lib/ai/oemItemLookup": { resolveOfficialOemDomains: () => [], lookupOfficialOemItem: async () => assert.fail("unexpected OEM call") },
  };
  const routeReady = process.env.ITEM_VISION_COMPILED_ANALYZE_FILE
    ? loadCompiledRoute(process.env.ITEM_VISION_COMPILED_ANALYZE_FILE, {
      87984: routeMocks.openai,
      24803: routeMocks["firebase-admin/storage"],
      12031: routeMocks["../../../context/FirebaseAdmin"],
      73847: routeMocks["../../../utils/apiAuth"],
      58736: { E: () => [], s: async () => assert.fail("unexpected OEM call") },
    }, logger)
    : Promise.resolve(loadModule("pages/api/items/analyze.js", routeMocks, logger));
  return { calls, async run(body = {}) {
    const result = {};
    const res = { setHeader() {}, status(code) { result.status = code; return this; }, json(value) { result.body = value; return this; } };
    const previousKey = process.env.OPENAI_API_KEY;
    process.env.OPENAI_API_KEY = "SYNTHETIC_TEST_NO_NETWORK";
    try { const route = await routeReady; await route.default({ method: "POST", body: { images: [image], ...body } }, res); }
    finally { if (previousKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = previousKey; }
    return result;
  } };
}

test("reusing the exact original photo selects the current active item before any model call", async () => {
  const current = item("Freshly edited pump name", ["PUMP-52"]);
  const f = fixture({ items: { AIS1: current }, indexes: { AIS1: indexedPhoto("AIS1", item("Stale name", ["OLD-PN"])) },
    objects: { "Parts/AIS1/original.jpg": { bytes: originalBytes } } });
  const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.status, 200);
  assert.equal(result.body.match.id, "AIS1");
  assert.equal(result.body.match.name, current.name);
  assert.deepEqual(result.body.match.partNumbers, ["PUMP-52"]);
  assert.equal(result.body.match.matchType, "exact_photo");
  assert.equal(result.body.match.canApply, true);
  assert.equal(result.body.match.confidence, 1);
  assert.equal(f.calls.models.length, 0);
  assert.equal(f.calls.storage.filter((call) => call.operation === "download").length, 0);
  assert.ok(f.calls.hydrated.some((ref) => ref.collection === "ArchivedItemIds"));
});

for (const profile of ["approved-1600-0.8", "approved-1280-0.72"]) {
  test(`${profile} representation is an exact match after current stored bytes are verified`, async () => {
    const source = item(); const storedBytes = Buffer.from(profile);
    const entry = fingerprint("AIS1", storedBytes);
    const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source, [entry]) },
      objects: { [entry.path]: { bytes: storedBytes } } });
    const result = await f.run({ photoSha256: [hash(originalBytes)],
      photoHashGroups: [[hash(originalBytes), hash(storedBytes)]] });
    assert.equal(result.status, 200);
    assert.equal(result.body.match.matchType, "exact_photo");
    assert.equal(f.calls.models.length, 0);
  });
}

test("a grouped exact match must cover every submitted photo group", async () => {
  const source = item();
  const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source) },
    objects: { "Parts/AIS1/original.jpg": { bytes: originalBytes } } });
  const result = await f.run({ images: [image, image], photoSha256: [hash(originalBytes), "b".repeat(64)],
    photoHashGroups: [[hash(originalBytes), "a".repeat(64)], ["b".repeat(64), "c".repeat(64)]] });
  assert.equal(result.body.match.matchType, "catalog_comparison");
  assert.equal(f.calls.models.length, 2);
});

test("a remote photo without fingerprints prevents deterministic subset matching", async () => {
  for (const groups of [undefined, [[hash(originalBytes)], []]]) {
    const source = item();
    const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source) },
      objects: { "Parts/AIS1/original.jpg": { bytes: originalBytes } } });
    const result = await f.run({ images: [image, "https://fixture.invalid/saved-photo.jpg"],
      photoSha256: [hash(originalBytes)], ...(groups ? { photoHashGroups: groups } : {}) });
    assert.equal(result.body.match.matchType, "catalog_comparison");
    assert.equal(f.calls.models.length, 2);
  }
});

test("malformed or inconsistent photo hash groups are rejected before any lookup", async () => {
  for (const photoHashGroups of ["bad", [], [[]], [["bad"]], [["A".repeat(64)]],
    [Array(4).fill(hash(originalBytes))], [[hash(originalBytes)], [hash(originalBytes)]], [["c".repeat(64)]]]) {
    const f = fixture(); const result = await f.run({ photoSha256: [hash(originalBytes)], photoHashGroups });
    assert.equal(result.status, 400);
    assert.equal(result.body.code, "invalid_photo_fingerprints");
    assert.equal(f.calls.queries.length, 0);
    assert.equal(f.calls.models.length, 0);
  }
});

test("the same original photo on multiple live items is ambiguous, never an arbitrary identity", async () => {
  const source = item();
  const f = fixture({ items: { AIS1: source, AIS2: source },
    indexes: { AIS1: indexedPhoto("AIS1", source), AIS2: indexedPhoto("AIS2", source) },
    objects: { "Parts/AIS1/original.jpg": { bytes: originalBytes }, "Parts/AIS2/original.jpg": { bytes: originalBytes } } });
  const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.body.match, null);
  assert.match(result.body.message, /more than one active item/);
  assert.equal(result.body.alternatives.length, 2);
  assert.equal(f.calls.models.length, 0);
});

test("a stale preserved hash whose object generation changed cannot claim an exact-photo match", async () => {
  const source = item();
  const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source) },
    objects: { "Parts/AIS1/original.jpg": { bytes: originalBytes, generation: "8" } } });
  const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.body.match.matchType, "catalog_comparison");
  assert.equal(f.calls.models.length, 2);
});

for (const state of ["orphan", "tombstone", "archived", "deletedAt"]) {
  test(`stale temp-42 index cannot be used when source is ${state}`, async () => {
    const source = item("Pump relay");
    const f = fixture({ items: state === "orphan" ? {} : { "temp-42": { ...source,
      ...(state === "archived" ? { isArchived: true } : {}), ...(state === "deletedAt" ? { deletedAt: "2026-11-01" } : {}) } },
      indexes: { "temp-42": indexedPhoto("temp-42", source) },
      tombstones: state === "tombstone" ? { "temp-42": { archiveId: "archive" } } : {},
      objects: { "Parts/temp-42/original.jpg": { bytes: originalBytes } },
    });
    const result = await f.run({ photoSha256: [hash(originalBytes)] });
    assert.equal(result.status, 200);
    assert.equal(result.body.match, null);
    assert.equal(result.body.alternatives.length, 0);
    assert.equal(f.calls.models.length, 1);
    assert.equal(f.calls.storage.length, 0);
  });
}

test("a weak indexed hit cannot suppress a newly saved source item without an index row", async () => {
  const correct = item(); const wrong = item("Relay K2 Back-up Connection", ["186852"]);
  const f = fixture({ items: { AIS1: correct, "temp-42": wrong }, indexes: { "temp-42": indexRecord("temp-42", wrong) } });
  const result = await f.run({ hints: { oem: ["GE"] } });
  assert.equal(result.body.match.id, "AIS1");
  assert.equal(result.body.match.canApply, true);
  assert.ok(f.calls.queries.some((query) => query.collection === "Test"));
  assert.ok(result.body.metrics.indexHits > 0);
  assert.ok(result.body.metrics.sourceHits > 0);
});

for (const failures of ["all", "index", "source", "hydrate"]) {
  test(`${failures} catalog failure is a retryable error, never successful no-match`, async () => {
    const source = item();
    const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexRecord("AIS1", source) },
      failQuery: ({ collection }) => failures === "all" || (failures === "index" && collection === "ItemVisionIndex") ||
        (failures === "source" && collection === "Test"), failHydrate: failures === "hydrate" });
    const result = await f.run();
    assert.equal(result.status, 503);
    assert.equal(result.body.code, "item_vision_catalog_query_failed");
    assert.match(result.body.error, /catalog could not be checked completely/);
    assert.equal(result.body.match, undefined);
    assert.ok(f.calls.logs.some((entry) => entry.level === "error"));
    assert.equal(f.calls.models.length, 1);
  });
}

test("an exact-photo query failure happens before AI and is not hidden by text search", async () => {
  const f = fixture({ failQuery: () => true });
  const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.status, 503);
  assert.equal(f.calls.models.length, 0);
});

for (const scenario of [
  { name: "8 percent confidence", confidence: 0.08, isLikelySameItem: false },
  { name: "weak but marked likely", confidence: 0.74, isLikelySameItem: true },
  { name: "high confidence marked not likely", confidence: 0.99, isLikelySameItem: false },
  { name: "empty ID", topMatchId: "" },
  { name: "unknown ID", topMatchId: "AIS999999" },
  { name: "non-boolean likely", isLikelySameItem: "true" },
  { name: "invented matched PN", matchedPartNumber: "NOT-THIS-PART" },
]) {
  test(`${scenario.name} cannot force the first candidate into an actionable match`, async () => {
    const source = item();
    const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexRecord("AIS1", source) }, comparison: {
      topMatchId: "AIS1", confidence: 0.99, isLikelySameItem: true, matchedPartNumber: "PUMP-52",
      rankedCandidateIds: ["AIS1"], reasons: [], warnings: [], ...scenario,
    } });
    const result = await f.run();
    assert.equal(result.status, 200);
    assert.equal(result.body.match, null);
    assert.ok(result.body.message);
    assert.ok(result.body.alternatives.every((candidate) => candidate.canApply !== true));
  });
}

test("a strongly read conflicting PN rejects even a model's high-confidence match", async () => {
  const source = item();
  const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexRecord("AIS1", source) },
    observed: observation({ partNumbers: ["DIFFERENT-77"] }),
    comparison: { topMatchId: "AIS1", confidence: 0.99, isLikelySameItem: true, matchedPartNumber: "PUMP-52", rankedCandidateIds: [] } });
  const result = await f.run({ hints: { oem: ["GE"] } });
  assert.equal(result.body.match, null);
  assert.match(result.body.message, /conflicts/);
});

test("exact saved photos do not overwrite a conflicting manually entered part number", async () => {
  const source = item();
  const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source) },
    objects: { "Parts/AIS1/original.jpg": { bytes: originalBytes } } });
  const result = await f.run({ photoSha256: [hash(originalBytes)], hints: { partNumbers: ["OTHER-99"] } });
  assert.equal(result.body.match, null);
  assert.match(result.body.message, /entered part number conflicts/);
  assert.equal(f.calls.models.length, 0);
});

test("candidate metadata and alternate photo prefixes come from current Test, not stale index fields", async () => {
  const current = item("Current water pump", ["PUMP-52"], { photoStoragePrefixes: ["Parts/retained-folder/"] });
  const f = fixture({ items: { AIS1: current }, indexes: { AIS1: indexRecord("AIS1", item("Stale relay", ["WRONG"]),
    { searchTokens: ["pump"], photoStoragePrefixes: ["Parts/stale-folder/"] }) },
    objects: { "Parts/retained-folder/photo.jpg": { bytes: originalBytes } } });
  const result = await f.run();
  assert.equal(result.body.match.name, "Current water pump");
  assert.deepEqual(result.body.match.partNumbers, ["PUMP-52"]);
  assert.deepEqual(result.body.match.photoStoragePrefixes, ["Parts/AIS1/", "Parts/retained-folder/"]);
  assert.ok(f.calls.storage.some((call) => call.operation === "download" && call.name === "Parts/retained-folder/photo.jpg"));
  assert.ok(!f.calls.storage.some((call) => call.prefix === "Parts/stale-folder/"));
});

test("exact-photo verification accepts a current retained prefix but rejects a removed prefix", async () => {
  const retained = "Parts/retained-folder/";
  const source = item("Pump", ["PUMP-52"], { photoStoragePrefixes: [retained] });
  const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source,
    [fingerprint("AIS1", originalBytes, { path: `${retained}photo.jpg` })]) },
    objects: { [`${retained}photo.jpg`]: { bytes: originalBytes } } });
  const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.body.match.matchType, "exact_photo");
  delete source.photoStoragePrefixes;
  const second = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(second.body.match.matchType, "catalog_comparison");
});

test("an unverified photo read cannot establish a unique exact identity", async () => {
  const source = item();
  const f = fixture({ items: { AIS1: source }, indexes: { AIS1: indexedPhoto("AIS1", source) }, metadataFailure: 503 });
  const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.status, 503);
  assert.equal(result.body.code, "item_vision_photo_verification_failed");
  assert.equal(f.calls.models.length, 0);
});

test("malformed and excess photo hashes are rejected before catalog/model access", async () => {
  for (const photoSha256 of ["not-an-array", ["no"], ["A".repeat(64)], [hash(originalBytes), "b".repeat(64)]]) {
    const f = fixture(); const result = await f.run({ photoSha256 });
    assert.equal(result.status, 400);
    assert.equal(result.body.code, "invalid_photo_fingerprints");
    assert.equal(f.calls.models.length, 0);
    assert.equal(f.calls.queries.length, 0);
  }
});

test("typed name and PN hints can retrieve an unindexed source without inventing AIS identity", async () => {
  const source = item("Unusual flux regulator", ["FLX-909"]);
  const f = fixture({ items: { AIS1: source }, observed: observation({ labelFound: false, confidence: 0.2,
    partNumbers: [], itemNameGuess: "unknown component", itemType: "component", searchTerms: [], oem: "", modality: "" }),
    comparison: { topMatchId: "AIS1", confidence: 0.94, isLikelySameItem: true, matchedPartNumber: "FLX-909", rankedCandidateIds: [] } });
  const result = await f.run({ hints: { name: "Unusual flux regulator", partNumbers: ["FLX-909"] } });
  assert.equal(result.body.match.id, "AIS1");
  assert.ok(f.calls.queries.some((query) => query.collection === "Test" && query.field === "pn" && query.value === "FLX-909"));
});

test("unauthenticated calls cannot query inventory or storage even outside production", async () => {
  const f = fixture({ actor: null }); const result = await f.run({ photoSha256: [hash(originalBytes)] });
  assert.equal(result.status, 401);
  assert.equal(f.calls.queries.length, 0);
  assert.equal(f.calls.storage.length, 0);
  assert.equal(f.calls.models.length, 0);
});
