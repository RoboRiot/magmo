"use strict";
// Executes actual composed route, Admin initialization, authentication, index
// builder and photo-index factories. All SDKs and the approval service boundary
// are synthetic; no credentials, network, external models or live writes exist.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const release = path.resolve(process.env.MAGMO_COMPILED_RELEASE_ROOT
  || path.join(__dirname, "../tmp/analyze-fix-20261102/release"));
const overlay = process.env.ITEM_VISION_COMPILED_INDEX_OVERLAY || "api-overlay-v4";
assert.match(overlay, /^api-overlay(?:-v\d+)?$/);
const explicitlyRequested = Boolean(process.env.MAGMO_COMPILED_RELEASE_ROOT ||
  process.env.ITEM_VISION_COMPILED_INDEX_OVERLAY || process.env.ITEM_VISION_COMPILED_INDEX_RECEIPT);
if (!explicitlyRequested && !fs.existsSync(path.join(release, overlay)) && !fs.existsSync(path.join(release, "source"))) {
  test("compiled Magmo indexing API release fixtures", { skip: "The local compiled release fixtures are absent." }, () => {});
} else {
  registerCompiledTests();
}

function registerCompiledTests() {
const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const artifactEvidence = [];
const observations = [];
const originalBytes = Buffer.from("synthetic original inventory photograph");
const originalHash = sha(originalBytes);

function factories(text) {
  const result = new Map();
  traverse(parser.parse(text), { ObjectProperty(p) {
    if (p.node.key.type !== "NumericLiteral" || !p.get("value").isFunction()) return;
    assert.ok(!result.has(p.node.key.value));
    result.set(p.node.key.value, text.slice(p.node.value.start, p.node.value.end));
  } });
  return result;
}
const artifacts = new Map();
for (const [name, id] of [["sync-index", 31328], ["change-requests", 8845]]) {
  const relative = `.next/server/pages/api/items/${name}.js`;
  const code = fs.readFileSync(path.join(release, overlay, relative), "utf8");
  const baseline = factories(fs.readFileSync(path.join(release, "source", relative), "utf8"));
  const current = factories(code);
  for (const dependency of [12031, 73847, ...(name === "change-requests" ? [56650, 40408] : [])]) {
    assert.equal(current.get(dependency), baseline.get(dependency), `preserve deployed dependency ${dependency}`);
  }
  artifacts.set(name, { current, id });
  artifactEvidence.push({ file: relative, fileSHA256: sha(code), routeFactoryId: id,
    routeFactorySHA256: sha(current.get(id)), preservedDeployedFactories: [12031, 73847,
      ...(name === "change-requests" ? [56650, 40408] : [])].map((factoryId) => ({ factoryId, sha256: sha(current.get(factoryId)) })) });
}

async function fixture(routeName, options = {}) {
  const calls = { verifyToken: [], firestore: [], storage: [], indexWrites: [], approval: [], bucketNames: [], logs: [] };
  const source = { name: "Synthetic pump", pn: ["TEST-PN"], photoStoragePrefixes: ["Parts/approved-fixture/"] };
  const records = { Test: options.missing ? {} : { AIS42: source },
    ArchivedItemIds: options.archived ? { AIS42: { archived: true } } : {},
    ItemVisionIndex: { AIS42: { name: "Stale synthetic pump", photoSha256: ["a".repeat(64)] } } };
  const snapshot = (ref, inTransaction = false) => ({ id: ref.id,
    exists: Object.hasOwn(records[ref.collection], ref.id),
    updateTime: { seconds: inTransaction && options.conflict && ref.collection === "Test" ? 2 : 1, nanoseconds: 0 },
    data: () => records[ref.collection][ref.id] });
  const db = {
    collection(collection) {
      assert.ok(Object.hasOwn(records, collection), `unexpected collection ${collection}`);
      return { doc(id) {
        assert.equal(id, "AIS42");
        const ref = { collection, id, path: `${collection}/${id}`, async get() {
          calls.firestore.push({ operation: "get", collection, id });
          if (options.readFailure) throw Object.assign(new Error("synthetic read unavailable"), { code: 14 });
          return snapshot(ref);
        } };
        return ref;
      } };
    },
    async runTransaction(visit) {
      return visit({ get: async (ref) => { calls.firestore.push({ operation: "transaction-get", collection: ref.collection }); return snapshot(ref, true); },
        set(ref, value) { assert.equal(ref.collection, "ItemVisionIndex", "inventory writes prohibited in fixture"); calls.indexWrites.push({ path: ref.path, value }); },
        delete() { assert.fail("unexpected index deletion"); },
      });
    },
  };
  function storageFile(name, generation) {
    assert.equal(name, "Parts/approved-fixture/original.jpg");
    const metadata = { generation: "7", size: originalBytes.length, crc32c: "synthetic-crc" };
    return { name, metadata,
      async getMetadata() { calls.storage.push({ operation: "metadata", name }); return [metadata]; },
      async download(input) {
        assert.equal(String(generation), "7", "download must be pinned to the verified generation");
        assert.equal(input.validation, "crc32c");
        calls.storage.push({ operation: "download", name }); return [originalBytes];
      },
    };
  }
  const bucket = { file: (name, opts) => storageFile(name, opts?.generation),
    async getFiles(input) {
      calls.storage.push({ operation: "list", prefix: input.prefix });
      assert.equal(input.autoPaginate, false);
      assert.ok(input.maxResults <= 100);
      if (options.storageFailure) throw Object.assign(new Error("synthetic storage unavailable"), { code: 503 });
      return [input.prefix === "Parts/approved-fixture/" ? [storageFile("Parts/approved-fixture/original.jpg")] : [], null];
    },
  };
  class ItemChangeRequestError extends Error {
    constructor() { super("Synthetic approval denied"); this.code = "approval_denied"; this.status = 403; }
  }
  const service = { ItemChangeRequestError,
    async reviewItemChangeRequest(input) {
      calls.approval.push(input);
      assert.equal(input.db, db);
      assert.equal(input.actor.uid, "synthetic-user");
      assert.deepEqual(input.buildSearchFields({ name: "Synthetic" }, "AIS42"), {
        nameLower: "synthetic", nameTokens: ["synthetic-name-token"], generalSearchTokens: ["synthetic-general-token"], workOrderTokens: ["synthetic-wo-token"],
      });
      if (options.reviewFailure) throw new ItemChangeRequestError();
      return { ok: true, request: { status: input.input.action === "approve" ? "approved" : "rejected", itemId: "AIS42" } };
    },
    listItemChangeRequests: async () => ({ requests: [] }),
    submitItemChangeRequest: async () => assert.fail("unexpected submit"),
  };
  // Execute the deployed Admin/auth factories, injecting only SDK exports.
  // A synthetic process object prevents reading this machine's environment.
  const mocks = {
    29021: { readFileSync: () => assert.fail("credential file access forbidden") },
    9801: { getApps: () => [{}], initializeApp: () => assert.fail("unexpected SDK initialization"), cert: () => assert.fail("credential creation forbidden") },
    35567: { getDatabaseWithUrl: (url) => { assert.equal(url, "https://fixture.invalid/database"); return {}; } },
    7879: { getFirestore: () => { if (options.adminUnavailable) throw new Error("synthetic Admin unavailable"); return db; } },
    24803: { getStorage: () => ({ bucket: (name) => { calls.bucketNames.push(name); assert.equal(name, "synthetic-photo-bucket"); return bucket; } }) },
    14276: { getAuth: () => ({ verifyIdToken: async (token, checkRevoked) => {
      calls.verifyToken.push({ token, checkRevoked });
      if (token !== "synthetic-valid-token") throw new Error("synthetic bad token");
      return { uid: "synthetic-user" };
    } }) },
    56650: service,
    40408: { SJ: () => ["synthetic-name-token"], jO: () => ["synthetic-general-token"], sv: () => ["synthetic-wo-token"] },
  };
  const selected = artifacts.get(routeName);
  const modules = new Map(); const owners = new WeakMap();
  const logger = Object.fromEntries(["error", "warn", "info"].map((level) => [level, (...args) => calls.logs.push({ level, code: args[1]?.code })]));
  function webpackRequire(id) {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (modules.has(id)) return modules.get(id).exports;
    assert.ok(selected.current.has(id), `unexpected compiled dependency ${id}`);
    const module = { exports: {} }; modules.set(id, module); owners.set(module.exports, module);
    const factory = new Function("require", "process", "console", `return (${selected.current.get(id)});`)(
      (name) => { assert.equal(name, "node:crypto"); return crypto; },
      { env: { NODE_ENV: "production", FIREBASE_ADMIN_PROJECT_ID: "synthetic-project",
        FIREBASE_STORAGE_BUCKET: "synthetic-photo-bucket", FIREBASE_DATABASE_URL: "https://fixture.invalid/database" } }, logger);
    factory(module, module.exports, webpackRequire);
    return module.exports;
  }
  webpackRequire.r = (exports) => Object.defineProperty(exports, "__esModule", { value: true });
  webpackRequire.d = (exports, getters) => Object.entries(getters).forEach(([name, get]) => Object.defineProperty(exports, name, { enumerable: true, get }));
  webpackRequire.n = (value) => { const getter = () => value?.__esModule ? value.default : value; webpackRequire.d(getter, { a: getter }); return getter; };
  webpackRequire.a = (module, body) => {
    module.ready = new Promise((resolve, reject) => {
      const dependencies = (values) => {
        const waiting = values.map((value) => owners.get(value)?.ready).filter(Boolean);
        return waiting.length ? Promise.all(waiting).then(() => () => values) : values;
      };
      Promise.resolve(body(dependencies, (error) => error ? reject(error) : resolve())).catch(reject);
    });
  };
  const route = webpackRequire(selected.id); await modules.get(selected.id).ready;
  if (!options.adminUnavailable) {
    const deployedAdmin = webpackRequire(12031);
    assert.equal(deployedAdmin.adminDb, db);
    assert.equal(deployedAdmin.adminBucket, bucket);
  }
  return { calls, async run({ method = "POST", token = "synthetic-valid-token", action = "approve", body = {} } = {}) {
    const result = { headers: {} };
    const res = { headersSent: false, writableEnded: false,
      setHeader(key, value) { result.headers[key] = value; }, status(code) { result.status = code; return this; },
      json(value) { result.body = value; this.headersSent = true; return this; },
    };
    await route.default({ method, headers: token ? { authorization: `Bearer ${token}` } : {},
      body: { itemId: "AIS42", action, ...body }, query: {} }, res);
    return result;
  } };
}

function check(name, run) {
  test(name, async () => {
    try { await run(); observations.push({ name, status: "PASS" }); }
    catch (error) { observations.push({ name, status: "FAIL", error: error.message }); throw error; }
  });
}

for (const route of ["sync-index", "change-requests"]) {
  check(`compiled ${route} enforces deployed missing/invalid bearer-token checks before catalog/service work`, async () => {
    for (const token of ["", "synthetic-invalid-token"]) {
      const f = await fixture(route); const result = await f.run({ token });
      assert.equal(result.status, 401); assert.equal(f.calls.firestore.length, 0); assert.equal(f.calls.approval.length, 0);
      assert.equal(f.calls.storage.length, 0); assert.equal(f.calls.indexWrites.length, 0);
      if (token) assert.equal(f.calls.verifyToken[0].checkRevoked, true);
    }
  });
}

check("compiled sync-index hashes originals through deployed Admin bucket and writes only the v2 index", async () => {
  const f = await fixture("sync-index"); const result = await f.run();
  assert.equal(result.status, 200); assert.equal(result.body.ok, true);
  assert.equal(result.body.indexVersion, 2); assert.equal(result.body.photoIndex.complete, true);
  assert.equal(result.body.photoIndex.files, undefined); assert.equal(result.body.photoIndex.failures, undefined);
  assert.deepEqual(f.calls.bucketNames, ["synthetic-photo-bucket"]);
  assert.equal(f.calls.verifyToken[0].checkRevoked, true);
  assert.equal(f.calls.indexWrites.length, 1);
  assert.deepEqual(f.calls.indexWrites[0].value.photoSha256, [originalHash]);
  assert.equal(f.calls.indexWrites[0].value.photoFingerprintFiles[0].generation, "7");
  assert.equal(f.calls.indexWrites[0].value.name, "Synthetic pump");
});

check("compiled sync-index reports partial Storage failure with retryable saved state and retained hashes", async () => {
  const f = await fixture("sync-index", { storageFailure: true }); const result = await f.run();
  assert.equal(result.status, 503); assert.equal(result.body.ok, false); assert.equal(result.body.indexUpdated, true);
  assert.equal(result.body.retryable, true); assert.equal(result.body.photoIndex.complete, false);
  assert.deepEqual(f.calls.indexWrites[0].value.photoSha256, ["a".repeat(64)]);
  assert.equal(result.body.photoIndex.files, undefined); assert.equal(result.body.photoIndex.failures, undefined);
});

check("compiled sync-index refuses changed source versions before its index transaction writes", async () => {
  const f = await fixture("sync-index", { conflict: true }); const result = await f.run();
  assert.equal(result.status, 409); assert.equal(result.body.code, "index_source_changed");
  assert.equal(result.body.retryable, true); assert.equal(f.calls.indexWrites.length, 0);
});

for (const state of ["missing", "archived"]) {
  check(`compiled sync-index refuses ${state} inventory before photo reads`, async () => {
    const f = await fixture("sync-index", { [state]: true }); const result = await f.run();
    assert.equal(result.status, 404); assert.equal(result.body.code, "item_not_found");
    assert.equal(result.body.retryable, false); assert.equal(f.calls.indexWrites.length, 0); assert.equal(f.calls.storage.length, 0);
  });
}

check("compiled sync-index fails closed when deployed Admin initialization cannot provide a database", async () => {
  const f = await fixture("sync-index", { adminUnavailable: true }); const result = await f.run();
  assert.equal(result.status, 503); assert.equal(f.calls.indexWrites.length, 0); assert.equal(f.calls.firestore.length, 0);
});

check("compiled approval follows one committed service review with the actual v2 photo refresh", async () => {
  const f = await fixture("change-requests"); const result = await f.run();
  assert.equal(result.status, 200); assert.equal(result.body.request.status, "approved");
  assert.equal(result.body.visionIndex.ok, true); assert.equal(result.body.warning, undefined);
  assert.equal(f.calls.approval.length, 1); assert.equal(f.calls.indexWrites.length, 1);
  assert.deepEqual(f.calls.indexWrites[0].value.photoSha256, [originalHash]);
  assert.equal(result.headers["Cache-Control"], "no-store");
});

for (const failure of ["readFailure", "storageFailure", "conflict"]) {
  check(`compiled approval preserves committed success and reports ${failure} as index-pending`, async () => {
    const f = await fixture("change-requests", { [failure]: true }); const result = await f.run();
    assert.equal(result.status, 200); assert.equal(result.body.ok, true); assert.equal(result.body.request.status, "approved");
    assert.equal(result.body.visionIndex.ok, false); assert.equal(result.body.visionIndex.retryable, true);
    assert.match(result.body.warning, /approved and saved/); assert.equal(f.calls.approval.length, 1);
    assert.equal(f.calls.indexWrites.length, failure === "storageFailure" ? 1 : 0);
  });
}

check("compiled rejection and denied approval never run the indexing follow-up", async () => {
  const rejected = await fixture("change-requests"); const result = await rejected.run({ action: "reject" });
  assert.equal(result.status, 200); assert.equal(result.body.request.status, "rejected");
  assert.equal(result.body.visionIndex, undefined); assert.equal(rejected.calls.firestore.length, 0);
  const denied = await fixture("change-requests", { reviewFailure: true }); const failure = await denied.run();
  assert.equal(failure.status, 403); assert.equal(failure.body.code, "approval_denied");
  assert.equal(denied.calls.firestore.length, 0); assert.equal(denied.calls.storage.length, 0);
});

test.after(() => {
  const receipt = { createdAt: new Date().toISOString(), mode: "OFFLINE_COMPILED_API_WITH_SYNTHETIC_SDKS",
    overlay, artifacts: artifactEvidence, observations,
    status: observations.length === 13 && observations.every((entry) => entry.status === "PASS") ? "PASS" : "FAIL",
    actualDeployedModulesExecuted: [12031, 73847], actualComposedRoutesExecuted: [31328, 8845],
    actualEmbeddedHelpersExecuted: ["ItemVisionIndex v2 builder", "visionPhotoIndex", "private storage boundary"],
    mockedBoundaries: ["firebase-admin SDK transports", "approval service review", "existing search-token exports"],
    testedAdminWiring: "Deployed Admin module exports the synthetic getFirestore instance and synthetic configured Storage bucket to composed handlers",
    externalCalls: 0, liveWrites: 0, credentialsRead: false,
    limitation: "This is executable local fixture evidence, not production authentication, Firebase availability, or signed-in live UI proof." };
  if (process.env.ITEM_VISION_COMPILED_INDEX_RECEIPT) {
    const target = path.resolve(process.env.ITEM_VISION_COMPILED_INDEX_RECEIPT);
    assert.equal(path.dirname(target), release, "receipt must stay in this release workspace");
    fs.writeFileSync(target, JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
  }
});
}
