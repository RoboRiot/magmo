"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const T = require("../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs");
const here = __dirname;
function loadFactories() {
  const sources = [path.join(here, "scoped-source/.next/server/chunks/93100.js"),
    path.join(here, "scoped-source/.next/server/chunks/1572.js")];
  const factories = new Map();
  for (const name of sources) for (const factory of T.factories(fs.readFileSync(name, "utf8"))) factories.set(factory.id, factory.source);
  return factories;
}
function createLoader({ db = null, fetchImpl = async () => { throw new Error("Network forbidden during compiled tests"); }, authUser = { uid: "staff", email: "staff@example.test" } } = {}) {
  const factories = loadFactories(), cache = new Map();
  const native = (name) => {
    if (["crypto", "node:crypto"].includes(name)) return require("node:crypto");
    if (["path", "node:path"].includes(name)) return require("node:path");
    if (["fs", "node:fs", "node:fs/promises"].includes(name)) return new Proxy({}, { get(_object, property) {
      return () => assert.fail(`Unexpected filesystem access from compiled service: ${name}.${String(property)}`);
    } });
    if (["child_process", "node:child_process"].includes(name)) return { spawnSync() { assert.fail("Subprocesses forbidden from compiled service"); } };
    if (name.endsWith("/machine-link/workOrderMachineLink.cjs")) return require(path.join(here, "scoped-source/machine-link/workOrderMachineLink.cjs"));
    assert.fail(`Unexpected compiled native import ${name}`);
  };
  const req = (id) => {
    if (id === 81067) return { requireFirebaseAuth: async () => authUser };
    if (id === 52771) return { adminDb: db };
    if (id === 78806) return { recordOpsInventoryMovement: async () => ({ attached: true }) };
    if (cache.has(id)) return cache.get(id).exports;
    assert(factories.has(id), `Unexpected compiled module ${id}`);
    const mod = { exports: {} }; cache.set(id, mod);
    const factory = new Function("require", "process", "globalThis", "fetch", `return (${factories.get(id)});`)(native,
      { env: process.env, cwd: () => path.join(here, "scoped-source") }, { fetch: fetchImpl }, fetchImpl);
    factory(mod, mod.exports, req); return mod.exports;
  };
  req.d = (exports, definitions) => { for (const [name, getter] of Object.entries(definitions)) Object.defineProperty(exports, name, { get: getter, enumerable: true }); };
  req.r = (exports) => Object.defineProperty(exports, "__esModule", { value: true });
  req.n = (value) => () => value?.__esModule ? value.default : value;
  req.e = async (id) => { assert([1067, 2771, 8806].includes(id), `Unexpected async compiled chunk ${id}`); };
  return req;
}
const sourceIds = {
  "../lib/slack/toolListIdentity.cjs": 94500002,
  "../lib/inventory/toolIdentity.cjs": 94500000,
  "../lib/inventory/workOrderAddSlack.cjs": 93100062,
  "../lib/inventory/workOrderAddSlackThread.cjs": 93100061,
  "../lib/inventory/workOrderAddSlackTargets.cjs": 94500001,
  "../lib/inventory/workOrderAddService.cjs": 93100031,
  "../lib/inventory/workOrderAddContract.cjs": 93100057,
};
module.exports = { createLoader, sourceIds };
