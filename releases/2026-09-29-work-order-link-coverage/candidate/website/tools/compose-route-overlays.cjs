"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), babel = require("@babel/core"), parser = require("@babel/parser");
const { sha, read, factories, getFactory, patchFactories, requiredIds, loaderChunks } = require("../../ot-collapse-20260928/factory-tools.cjs");
module.exports = function composeRoutes({ root, baseline, out, frozenFiles }) {
  const cronPath = ".next/server/pages/api/cron/magmonitor-alerts.js", cron = read(path.join(baseline, cronPath));
  const newRoute = "/api/ops/work-order-link-alerts", newRoutePath = ".next/server/pages" + newRoute + ".js";
  const registry = new Map();
  for (const route of [cronPath, ".next/server/pages/api/ops/ingest.js", ".next/server/pages/api/ops/engineer-notifications.js"]) {
    const code = read(path.join(baseline, route));
    for (const file of [route, ...loaderChunks(code).map(id => ".next/server/chunks/" + id + ".js")]) {
      for (const factory of factories(read(path.join(baseline, file)))) {
        const prior = registry.get(factory.id);
        if (prior) assert.equal(sha(prior.source), sha(factory.source), "Conflicting live module " + factory.id);
        else registry.set(factory.id, { ...factory, file });
      }
    }
  }
  function write(relative, text) { fs.mkdirSync(path.dirname(path.join(out, relative)), { recursive: true }); fs.writeFileSync(path.join(out, relative), text); }
  function container(relative) {
    const source = read(path.join(root, relative)); frozenFiles.set(relative, sha(source));
    const compiled = babel.transformSync(source, { babelrc: false, configFile: false, plugins: ["@babel/plugin-transform-modules-commonjs"] }).code;
    const output = `"use strict";\n// Exact reviewed source, CJS-compiled with dependency injection into live bindings.\nmodule.exports = function instantiate(dependencies) {\nconst loaded = { exports: {} };\nconst load = request => Object.prototype.hasOwnProperty.call(dependencies, request) ? dependencies[request] : require(request);\n(function(require, module, exports) {\n${compiled}\n})(load, loaded, loaded.exports);\nreturn loaded.exports;\n};\n`;
    parser.parse(output); write("work-order-link/" + relative, output); return output;
  }
  container("lib/ops/workOrderLinkServer.js"); container("pages/api/cron/magmonitor-alerts.js"); container("pages/api/ops/work-order-link-alerts.js");
  const cronFactory = `(module,exports,load)=>{load.a(module,async(handle,done)=>{try{
    let admin=load(52771),health=load(60028),notifications=load(75005),engineers=load(11055),orders=load(78806),auth=load(14276);
    let dependencies=handle([admin,health,notifications,engineers,orders,auth]);[admin,health,notifications,engineers,orders,auth]=dependencies.then?(await dependencies)():dependencies;
    const server=require(process.cwd()+"/work-order-link/lib/ops/workOrderLinkServer.js")({"firebase-admin/auth":auth,"../../context/FirebaseAdmin":admin,"../bluefolder/client":require(process.cwd()+"/work-order-link/lib/bluefolder/client.js"),"./workOrders":{importOpsBlueFolderWorkOrder:orders.JZ}});
    const userland=require(process.cwd()+"/work-order-link/pages/api/cron/magmonitor-alerts.js")({"crypto":load(55511),"../../../context/FirebaseAdmin":admin,"../../../lib/magmonitor/healthServer":{runMagmonitorHealthAlerts:health.Wi},"../../../lib/magmonitor/notifications":{deliverMagmonitorAlerts:notifications.A},"../../../lib/ops/engineerNotifications":{deliverEngineerNotifications:engineers.X},"../../../lib/ops/workOrderLinkServer":server,"../../../lib/magmonitor/notificationContract.cjs":load(13801)});
    load.r(exports);load.d(exports,{default:()=>userland.default});done();
  }catch(error){done(error)}})}`;
  parser.parseExpression(cronFactory);
  let nextCron = patchFactories(cron, { 29899: cronFactory });
  const originalChunks = loaderChunks(cron), newCronChunks = [...originalChunks, 8806];
  const oldLoader = "[" + originalChunks.join(",") + "]", newLoader = "[" + newCronChunks.join(",") + "]";
  assert.equal(nextCron.split(oldLoader).length, 2); nextCron = nextCron.replace(oldLoader, newLoader);
  const cronAvailable = new Set(factories(nextCron).map(f => f.id));
  for (const id of newCronChunks) for (const f of factories(read(path.join(out, ".next/server/chunks/" + id + ".js")))) cronAvailable.add(f.id);
  function missingClosure(initial, available) {
    const missing = new Map(), visited = new Set();
    function visit(id) {
      if (visited.has(id)) return; visited.add(id);
      const record = registry.get(id); assert(record, "Unavailable production dependency " + id);
      if (!available.has(id)) missing.set(id, record);
      for (const dependency of requiredIds(record.source)) visit(dependency);
    }
    for (const id of initial) visit(id); return missing;
  }
  const missing = missingClosure([78806], cronAvailable);
  const insertion = factories(nextCron).find(f => f.id === 29899).objectEnd - 1;
  const append = [...missing].map(([id, record]) => `${id}:${record.source}`).join(",");
  if (append) nextCron = nextCron.slice(0, insertion) + "," + append + nextCron.slice(insertion);
  parser.parse(nextCron); write(cronPath, nextCron);
  const entryId = 9009291, userlandId = 9009292, chunkId = 9009293;
  for (const id of [entryId, userlandId, chunkId]) assert(!registry.has(id), "New module ID collision");
  const entry = getFactory(cron, 6142).replaceAll("/api/cron/magmonitor-alerts", newRoute).replace("c(29899)", `c(${userlandId})`);
  const handler = `(module,exports,load)=>{load.a(module,async(handle,done)=>{try{
    let auth=load(14276),admin=load(52771),apiAuth=load(81067);let dependencies=handle([auth,admin,apiAuth]);[auth,admin,apiAuth]=dependencies.then?(await dependencies)():dependencies;
    const userland=require(process.cwd()+"/work-order-link/pages/api/ops/work-order-link-alerts.js")({"firebase-admin/auth":auth,"../../../context/FirebaseAdmin":admin,"../../../utils/apiAuth":apiAuth});
    load.r(exports);load.d(exports,{default:()=>userland.default,config:()=>userland.config});done();
  }catch(error){done(error)}})}`;
  parser.parseExpression(entry); parser.parseExpression(handler);
  const shared = new Set(factories(read(path.join(out, ".next/server/chunks/5030.js"))).map(f => f.id));
  const entryDependencies = [...requiredIds(entry)].filter(id => id !== userlandId), handlerDependencies = [...requiredIds(handler)];
  const routeModules = missingClosure([...entryDependencies, ...handlerDependencies], shared);
  const newCode = `(()=>{var a={id:${chunkId},ids:[${chunkId}],modules:{${entryId}:${entry},${userlandId}:${handler},${[...routeModules].map(([id, record]) => `${id}:${record.source}`).join(",")}}};var b=require("../../../webpack-api-runtime.js");b.C(a);var c=b.X(0,[5030],()=>b(b.s=${entryId}));module.exports=c})();`;
  parser.parse(newCode); write(newRoutePath, newCode);
  const pagesRelative = ".next/server/pages-manifest.json", pagesText = read(path.join(baseline, pagesRelative)), pages = JSON.parse(pagesText);
  assert(!pages[newRoute]); pages[newRoute] = "pages" + newRoute + ".js"; write(pagesRelative, JSON.stringify(pages));
  const routesRelative = ".next/routes-manifest.json", routesText = read(path.join(baseline, routesRelative)), routes = JSON.parse(routesText);
  assert(!routes.staticRoutes.some(route => route.page === newRoute));
  const expression = "^/api/ops/work\\-order\\-link\\-alerts(?:/)?$";
  routes.staticRoutes.push({ page: newRoute, regex: expression, routeKeys: {}, namedRegex: expression }); write(routesRelative, JSON.stringify(routes));
  return { cron: { path: cronPath, factory: 29899, previousFactorySHA256: sha(getFactory(cron, 29899)), candidateFactorySHA256: sha(cronFactory), chunks: newCronChunks, addedExactLiveFactories: [...missing].map(([id, record]) => ({ id, from: record.file, sha256: sha(record.source) })) }, newApi: { route: newRoute, path: newRoutePath, entryId, userlandId, chunkId, chunks: [5030], copiedFrameworkFactories: [...routeModules].map(([id, record]) => ({ id, from: record.file, sha256: sha(record.source) })) }, metadata: [pagesRelative, routesRelative], sourceWrapperCompiler: "@babel/plugin-transform-modules-commonjs", unchangedBuildId: read(path.join(out, ".next/BUILD_ID")).trim() };
};
