"use strict";
// Mock-only evaluator for the exact captured candidate factory and copied CJS graph.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const { read, factories, loaderChunks } = require("../../ot-collapse-20260928/factory-tools.cjs");
const cache = new Map();
function registryFor(out) {
  if (cache.has(out)) return cache.get(out);
  const result = new Map();
  const route = path.join(out, ".next/server/pages/api/ops/ingest.js"), routeCode = read(route);
  const files = [route, ...loaderChunks(routeCode).map(id => path.join(out, ".next/server/chunks/" + id + ".js"))];
  for (const file of files) for (const factory of factories(read(file))) result.set(factory.id, factory.source);
  cache.set(out, result); return result;
}
function compiledWorkOrders(out, localRequire) {
  const registry = registryFor(out), modules = new Map(), native = new Map(), pending = [];
  const processMock = { env: {}, cwd: () => out };
  const mockOps = new Set(["blueFolderCustomerLookup.cjs", "blueFolderEquipmentLookup.cjs", "workOrderSourceLookup.cjs", "workOrderLinkAlertDelivery.cjs"]);
  function requireNative(request, parent = path.join(out, "entry.cjs")) {
    if (request === "firebase-admin/firestore") return localRequire(request);
    if (request === "firebase-admin/auth") return { getAuth: () => ({ getUser: () => { throw Error("Unexpected Auth call"); } }) };
    if (request.startsWith("node:") || ["xml2js", "crypto"].includes(request)) return require(request);
    const resolved = path.isAbsolute(request) ? path.normalize(request) : path.resolve(path.dirname(parent), request);
    let file = resolved; if (!path.extname(file)) file += ".js";
    assert(file.startsWith(out + path.sep), "Native require escaped candidate: " + file);
    if (path.basename(parent) === "service.cjs" && file.includes(path.join("work-order-link", "lib", "ops")) && mockOps.has(path.basename(file))) return localRequire("./" + path.basename(file));
    // Proof provenance uses module-private WeakSets. The fixtures create proofs
    // through these exact packaged pure parsers, so validators must share them.
    if (["blueFolderCustomerLookup.cjs", "blueFolderEquipmentLookup.cjs"].includes(path.basename(file))) return require(file);
    if (native.has(file)) return native.get(file).exports;
    const mod = { exports: {} }; native.set(file, mod);
    new Function("require", "module", "exports", "process", "fetch", read(file))(dep => requireNative(dep, file), mod, mod.exports, processMock, () => { throw Error("Unexpected external network call"); });
    return mod.exports;
  }
  function load(id) {
    if (id === 7879) return localRequire("firebase-admin/firestore");
    if (id === 52771) return localRequire("../../context/FirebaseAdmin");
    if ([19298, 96096].includes(id)) return {};
    if (id === 55511) return require("node:crypto");
    if (id === 46566) return require("xml2js");
    if (modules.has(id)) return modules.get(id).exports;
    assert(registry.has(id), "Unknown compiled dependency " + id);
    const mod = { exports: {} }; modules.set(id, mod);
    const callable = new Function("require", "process", "Buffer", "fetch", `return (${registry.get(id)});`)(requireNative, processMock, Buffer, () => { throw Error("Unexpected external network call"); });
    callable(mod, mod.exports, load); return mod.exports;
  }
  load.d = (target, getters) => { for (const [key, get] of Object.entries(getters)) Object.defineProperty(target, key, { get, enumerable: true }); };
  load.n = value => () => value;
  load.a = (_module, callback) => { const ready = callback(values => values, error => { if (error) throw error; }); pending.push(ready); };
  const result = load(78806);
  const deferred = key => async (...args) => { await Promise.all(pending); return result[key](...args); };
  return { importOpsBlueFolderWorkOrder: deferred("JZ"), upsertOpsWorkOrder: deferred("PJ"), updateOpsConnections: deferred("pE"), getOpsWorkOrder: deferred("yU") };
}
module.exports = { compiledWorkOrders };
