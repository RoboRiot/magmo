const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

let playwright;
try {
  playwright = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
} catch (error) {
  throw new Error(
    "Playwright is required. Set PLAYWRIGHT_MODULE_PATH to the reviewed runtime package.",
    { cause: error }
  );
}

const here = __dirname;
const baselineRoot = path.join(here, "source", ".next");
const candidateRoot = path.join(here, "scoped-source", ".next");
const compositionPath = path.join(here, "composition-report.json");
const receiptPath = path.join(here, "compiled-ui-verification.json");
const composition = JSON.parse(fs.readFileSync(compositionPath, "utf8"));
const buildManifest = JSON.parse(
  fs.readFileSync(path.join(candidateRoot, "build-manifest.json"), "utf8")
);
const routeAssets = buildManifest.pages?.["/NewSearch/mainSearch"] || [];
const appAssets = buildManifest.pages?.["/_app"] || [];
const clientAssets = [...new Set([...appAssets, ...routeAssets])];

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function clientRegistryFromCode(code, filename) {
  const context = { self: { webpackChunk_N_E: [] } };
  vm.runInNewContext(code, context, { filename, timeout: 5000 });
  return new Map(
    context.self.webpackChunk_N_E.flatMap(([, modules]) =>
      Object.entries(modules || {}).map(([id, factory]) => [Number(id), factory])
    )
  );
}

function clientRegistry(filePath) {
  return clientRegistryFromCode(fs.readFileSync(filePath, "utf8"), filePath);
}

function instrumentRuntime(code) {
  const marker = "})();";
  const index = code.lastIndexOf(marker);
  assert.notEqual(index, -1, "webpack runtime closure was not found");
  return `${code.slice(0, index)};self.__webpack_test_require=d;d.c=s;${code.slice(index)}`;
}

function instrumentPage(code) {
  const marker = "r.d(t,{default:()=>tZ})";
  const occurrences = code.split(marker).length - 1;
  assert.equal(occurrences, 1, "compiled WorkOrderAddModal export marker drifted");
  return code.replace(
    marker,
    "r.d(t,{default:()=>tZ,__compiledWorkOrderAddModal:()=>tI})"
  );
}

function targetImports(factoryBody) {
  const values = new Set();
  const pattern = /(?:var |,)(?:[A-Za-z_$][\w$]*)=r\((\d+)\)/g;
  for (const match of factoryBody.matchAll(pattern)) values.add(Number(match[1]));
  return [...values].sort((left, right) => left - right);
}

function collectRouteRegistry() {
  const registry = new Map();
  for (const asset of clientAssets.filter(
    (value) => value.endsWith(".js") && !value.includes("/webpack-")
  )) {
    const filePath = path.join(candidateRoot, ...asset.split("/"));
    const modules = clientRegistry(filePath);
    for (const [id, factory] of modules) registry.set(id, factory);
  }
  return registry;
}

function contentType(filePath) {
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  return "application/octet-stream";
}

const activePagePath = path.join(
  baselineRoot,
  ...composition.activePage.split("/")
);
const candidatePagePath = path.join(
  candidateRoot,
  ...composition.newPage.split("/")
);
const runtimeAsset = clientAssets.find((value) =>
  /static\/chunks\/webpack-[^/]+\.js$/.test(value)
);
assert.ok(runtimeAsset, "main-search route has no webpack runtime asset");
const runtimePath = path.join(candidateRoot, ...runtimeAsset.split("/"));
const activePageCode = fs.readFileSync(activePagePath, "utf8");
const candidatePageCode = fs.readFileSync(candidatePagePath, "utf8");
const activeRegistry = clientRegistryFromCode(activePageCode, activePagePath);
const candidateRegistry = clientRegistryFromCode(candidatePageCode, candidatePagePath);
const activeIds = [...activeRegistry.keys()].sort((left, right) => left - right);
const candidateIds = [...candidateRegistry.keys()].sort((left, right) => left - right);
assert.deepEqual(candidateIds, activeIds, "candidate page module registry drifted");
assert.ok(candidateRegistry.has(60992), "compiled page target module 60992 is missing");
assert.ok(candidateRegistry.has(21704), "explicit active control module 21704 is missing");

const activeHashes = new Map(
  [...activeRegistry].map(([id, factory]) => [id, sha256(factory.toString())])
);
const candidateHashes = new Map(
  [...candidateRegistry].map(([id, factory]) => [id, sha256(factory.toString())])
);
for (const id of activeIds) {
  if (id === 60992) assert.notEqual(candidateHashes.get(id), activeHashes.get(id));
  else assert.equal(candidateHashes.get(id), activeHashes.get(id), `client module ${id} drifted`);
}

const targetFactoryBody = candidateRegistry.get(60992).toString();
const directImportIds = targetImports(targetFactoryBody);
const routeRegistry = collectRouteRegistry();
const missingImportIds = directImportIds.filter((id) => !routeRegistry.has(id));
assert.deepEqual(missingImportIds, [], "compiled target imports unavailable modules");
for (const requiredId of [14232, 14873, 24279, 39520, 60992]) {
  assert.ok(routeRegistry.has(requiredId), `required compiled UI module ${requiredId} is absent`);
}

const instrumentedRuntime = instrumentRuntime(fs.readFileSync(runtimePath, "utf8"));
const instrumentedPage = instrumentPage(candidatePageCode);
const newCssAsset = composition.newCss;
assert.ok(routeAssets.includes(newCssAsset), "new WorkOrderAddModal CSS is not in the route manifest");
const newCssPath = path.join(candidateRoot, ...newCssAsset.split("/"));
const cssAssetsWithExternalImports = clientAssets
  .filter((value) => value.endsWith(".css"))
  .filter((asset) =>
    fs.readFileSync(path.join(candidateRoot, ...asset.split("/")), "utf8")
      .includes("@import url(\"https://")
  );
const harnessCssAssets = clientAssets.filter((value) => value.endsWith(".css"));
assert.ok(harnessCssAssets.includes(newCssAsset), "target CSS is unavailable to the harness");

test("composed module 60992 preserves registry/imports and executes the save-then-Slack flow", {
  timeout: 120000,
}, async () => {
  let server;
  let browser;
  const externalRequests = [];
  try {
    server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url, "http://127.0.0.1");
      if (requestUrl.pathname === "/") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(
          '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div></body></html>'
        );
        return;
      }
      if (!requestUrl.pathname.startsWith("/_next/")) {
        response.statusCode = 404;
        response.end("not found");
        return;
      }
      const relative = decodeURIComponent(requestUrl.pathname.slice("/_next/".length));
      const filePath = path.resolve(candidateRoot, ...relative.split("/"));
      const allowedRoot = `${path.resolve(candidateRoot)}${path.sep}`;
      if (!filePath.startsWith(allowedRoot) || !fs.existsSync(filePath)) {
        response.statusCode = 404;
        response.end("not found");
        return;
      }
      response.setHeader("Content-Type", contentType(filePath));
      if (relative === runtimeAsset) response.end(instrumentedRuntime);
      else if (relative === composition.newPage) response.end(instrumentedPage);
      else response.end(fs.readFileSync(filePath));
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;

    browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.route("**/*", (route) => {
      if (route.request().url().startsWith(origin)) return route.continue();
      externalRequests.push(route.request().url());
      return route.abort();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(origin);

    for (const cssAsset of harnessCssAssets) {
      try {
        if (cssAssetsWithExternalImports.includes(cssAsset)) {
          const originalCss = fs.readFileSync(
            path.join(candidateRoot, ...cssAsset.split("/")),
            "utf8"
          );
          const localHarnessCss = originalCss.replace(
            /^\uFEFF?\s*@import\s+url\([^)]*\);/,
            ""
          );
          assert.notEqual(localHarnessCss, originalCss, `${cssAsset} external import was not isolated`);
          assert.ok(!localHarnessCss.includes("@import url(\"https://"));
          await page.addStyleTag({ content: localHarnessCss });
        } else {
          await page.addStyleTag({ url: `${origin}/_next/${cssAsset}` });
        }
      } catch (error) {
        throw new Error(
          `compiled UI CSS failed to load: ${cssAsset}: ${error?.message || error}`,
          { cause: error }
        );
      }
    }
    await page.evaluate(() => {
      const calls = [];
      const slackAttempts = Object.create(null);
      let slackInFlight = 0;
      let maximumSlackConcurrency = 0;
      const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
      const response = (payload, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      window.__compiledHarness = {
        calls,
        slackAttempts,
        get maximumSlackConcurrency() {
          return maximumSlackConcurrency;
        },
      };
      window.fetch = async (requestPath, options = {}) => {
        const url = String(requestPath);
        const body = options.body ? JSON.parse(options.body) : null;
        calls.push({ url, method: options.method || "GET", body });
        if (url.startsWith("/api/items/work-order-add/options")) {
          return response({
            ok: true,
            workOrders: [{
              id: "synthetic-warehouse-work-order",
              number: "99999",
              subject: "Synthetic warehouse verification",
              clientName: "NorCal Warehouse - Lathrop",
              machineName: "interior NorCal",
              destinationLinked: true,
              destinationKind: "machine",
              warehouseInteriorDefault: true,
              workOrderClientId: "synthetic-source-client",
            }],
          });
        }
        if (url === "/api/items/work-order-add/resolve") {
          return response({
            ok: true,
            resolution: {
              status: "ready",
              kind: "bin",
              canonicalId: "AIS-B00047",
              membershipFingerprint: "synthetic-bin-47-membership",
              itemIds: ["AIS10001", "AIS10002", "AIS10003"],
              preview: {
                id: "AIS-B00047",
                name: "Bin 47",
                itemCount: 3,
                currentLocation: "NorCal Warehouse - Lathrop",
                items: [
                  { id: "AIS10001", name: "Synthetic item one" },
                  { id: "AIS10002", name: "Synthetic item two" },
                  { id: "AIS10003", name: "Synthetic item three" },
                ],
              },
            },
          });
        }
        if (url === "/api/items/work-order-add/confirm") {
          return response({
            ok: true,
            result: {
              ok: true,
              operationId: body.operationId,
              movementMode: body.movementMode,
              itemCount: 3,
              workOrder: { number: "99999" },
              items: [
                { id: "AIS10001", name: "Synthetic item one" },
                { id: "AIS10002", name: "Synthetic item two" },
                { id: "AIS10003", name: "Synthetic item three" },
              ],
            },
          });
        }
        if (url === "/api/items/work-order-add/slack") {
          slackAttempts[body.itemId] = (slackAttempts[body.itemId] || 0) + 1;
          slackInFlight += 1;
          maximumSlackConcurrency = Math.max(maximumSlackConcurrency, slackInFlight);
          await wait(35);
          slackInFlight -= 1;
          if (body.itemId === "AIS10002" && slackAttempts[body.itemId] === 1) {
            return response({
              ok: true,
              result: { itemId: body.itemId, status: "failed", message: "Synthetic rejection." },
            });
          }
          if (body.itemId === "AIS10003" && slackAttempts[body.itemId] === 1) {
            return response({
              ok: true,
              result: { itemId: body.itemId, status: "future_status", message: "Synthetic unknown." },
            });
          }
          return response({
            ok: true,
            result: { itemId: body.itemId, status: "sent", message: "Synthetic sent." },
          });
        }
        return response({ ok: false, error: `Unexpected synthetic request: ${url}` }, 500);
      };
    });

    for (const asset of clientAssets.filter(
      (value) => value.endsWith(".js") && value !== composition.newPage
    )) {
      await page.addScriptTag({ url: `${origin}/_next/${asset}` });
    }
    await page.evaluate(() => {
      const webpackRequire = window.__webpack_test_require;
      if (!webpackRequire?.m) throw new Error("instrumented webpack runtime is unavailable");
      webpackRequire.m[9306] = (module) => {
        module.exports = {
          A: {
            auth: () => ({
              currentUser: { getIdToken: async () => "compiled-ui-test-token" },
            }),
          },
        };
      };
      if (webpackRequire.c) delete webpackRequire.c[9306];
    });
    await page.addScriptTag({ url: `${origin}/_next/${composition.newPage}` });
    const runtimeChecks = await page.evaluate(() => {
      const webpackRequire = window.__webpack_test_require;
      const React = webpackRequire(14232);
      const ReactDomClient = webpackRequire(24279);
      const ButtonModule = webpackRequire(14873);
      const ModalModule = webpackRequire(39520);
      const target = webpackRequire(60992);
      const Component = target.__compiledWorkOrderAddModal;
      if (typeof Component !== "function") throw new Error("compiled modal export is unavailable");
      const createRoot = ReactDomClient.createRoot || ReactDomClient.default?.createRoot;
      if (typeof createRoot !== "function") throw new Error("compiled ReactDOM createRoot is unavailable");
      window.__compiledHarness.root = createRoot(document.getElementById("root"));
      window.__compiledHarness.root.render(
        React.createElement(Component, {
          show: true,
          onHide: () => {
            window.__compiledHarness.hideCount =
              (window.__compiledHarness.hideCount || 0) + 1;
          },
          onConfirmed: (result) => {
            window.__compiledHarness.confirmed = result;
          },
        })
      );
      return {
        react: typeof React.createElement === "function",
        reactDom: typeof createRoot === "function",
        reactBootstrapButton: typeof ButtonModule.A === "function" || typeof ButtonModule.A === "object",
        reactBootstrapModal: Boolean(ModalModule.A?.Header && ModalModule.A?.Body && ModalModule.A?.Footer),
      };
    });
    assert.deepEqual(runtimeChecks, {
      react: true,
      reactDom: true,
      reactBootstrapButton: true,
      reactBootstrapModal: true,
    });

    const workOrderSearch = page.getByRole("combobox", { name: "Work order" });
    await workOrderSearch.waitFor();
    await workOrderSearch.fill("99999");
    await page.getByRole("option", { name: /WO #99999/ }).click();
    await page.getByText("NorCal Warehouse - Lathrop", { exact: true }).waitFor();
    await page.locator('input[value="current_at_work_order"]').check();
    await page.getByLabel("Manual barcode input").fill("B47");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await page.getByText("Bin 47", { exact: true }).waitFor();

    await page.getByRole("button", { name: "Confirm list" }).click();
    const saveDialog = page.getByRole("dialog", {
      name: "Is this list ready to be saved?",
    });
    await saveDialog.waitFor();
    assert.equal(
      await page.getByRole("button", { name: "Confirm list" }).isDisabled(),
      true,
      "save popup must block the background action"
    );
    assert.equal(
      await page.evaluate(() =>
        window.__compiledHarness.calls.filter(
          (entry) => entry.url === "/api/items/work-order-add/slack"
        ).length
      ),
      0,
      "Slack must not run before save or opt-in"
    );

    await saveDialog.getByRole("button", { name: "Yes, save changes" }).click();
    const slackDialog = page.getByRole("dialog", { name: "Send saved items to Slack?" });
    await slackDialog.waitFor();
    assert.match(await slackDialog.textContent(), /3 changed items · shipping/i);
    await slackDialog.getByRole("button", { name: "No, don’t send" }).click();
    await slackDialog.waitFor({ state: "hidden" });
    assert.equal(
      await page.evaluate(() =>
        window.__compiledHarness.calls.filter(
          (entry) => entry.url === "/api/items/work-order-add/slack"
        ).length
      ),
      0,
      "No must send zero Slack requests"
    );

    await page.getByRole("button", { name: "Review Slack delivery" }).click();
    await slackDialog.waitFor();
    await page.evaluate(() => {
      const button = [...document.querySelectorAll("button")].find(
        (candidate) => candidate.textContent.trim() === "Yes, send all to Slack"
      );
      button.click();
      button.click();
    });
    await slackDialog.getByText(/1 sent · 1 failed · 1 need a status check/).waitFor();
    let calls = await page.evaluate(() => window.__compiledHarness.calls);
    const slackCalls = calls.filter(
      (entry) => entry.url === "/api/items/work-order-add/slack"
    );
    assert.deepEqual(
      slackCalls.map((entry) => entry.body.itemId),
      ["AIS10001", "AIS10002", "AIS10003"],
      "compiled UI must send the canonical saved manifest once and sequentially"
    );
    slackCalls.forEach((entry) =>
      assert.deepEqual(Object.keys(entry.body).sort(), ["itemId", "operationId"])
    );
    assert.equal(
      await page.evaluate(() => window.__compiledHarness.maximumSlackConcurrency),
      1,
      "Slack requests must be sequential"
    );

    await slackDialog.getByRole("button", { name: "Retry failed (1)" }).click();
    await slackDialog.getByText(/2 sent · 1 need a status check/).waitFor();
    await slackDialog.getByRole("button", { name: "Check status (1)" }).click();
    await slackDialog.getByText("3 sent", { exact: true }).waitFor();
    calls = await page.evaluate(() => window.__compiledHarness.calls);
    const finalSlackCalls = calls.filter(
      (entry) => entry.url === "/api/items/work-order-add/slack"
    );
    assert.deepEqual(
      finalSlackCalls.slice(3).map((entry) => entry.body.itemId),
      ["AIS10002", "AIS10003"],
      "failed retry and unknown-status check must target only their own items"
    );
    assert.equal(
      calls.filter((entry) => entry.url === "/api/items/work-order-add/confirm").length,
      1,
      "Slack actions must never confirm inventory a second time"
    );
    assert.equal(
      calls.filter((entry) => entry.url.includes("/scan-sessions")).length,
      0,
      "compiled test keeps scanner capture stopped"
    );
    assert.deepEqual(pageErrors, []);
    assert.deepEqual(externalRequests, []);
    await context.close();

    const receipt = {
      checkedAt: new Date().toISOString(),
      result: "PASS",
      readOnlyArtifactInspection: true,
      productionNetworkRequests: 0,
      liveInventoryWrites: 0,
      liveSlackPosts: 0,
      baselineRevision: composition.baselineRevision,
      baselineArchiveSHA256: composition.baselineArchiveSHA256,
      candidateBuildId: composition.newBuildId,
      candidatePage: {
        path: composition.newPage,
        sha256: sha256(candidatePageCode),
        targetModuleId: 60992,
        targetFactorySHA256: candidateHashes.get(60992),
        moduleCount: candidateIds.length,
        unrelatedModulesPreserved: true,
        controlModule21704SHA256: candidateHashes.get(21704),
      },
      candidateCss: {
        path: newCssAsset,
        sha256: sha256(fs.readFileSync(newCssPath)),
        frozenSourceSHA256:
          composition.frozenInputs["components/WorkOrderAddModal.module.css"],
        harnessLoadedAssets: harnessCssAssets,
        externalImportAssetsLoadedWithOnlyRemoteFontImportRemoved:
          cssAssetsWithExternalImports,
      },
      compiledImports: {
        directImportIds,
        missingImportIds,
        actualReactModuleId: 14232,
        actualReactDomModuleId: 24279,
        actualReactBootstrapModuleIds: [14873, 39520],
        firebaseModule9306StubbedOnlyInsideLocalHarness: true,
      },
      interaction: {
        syntheticWorkOrder: true,
        warehousePreviewRendered: true,
        savePopupBlockedBackground: true,
        slackRequestsBeforeOptIn: 0,
        noChoiceSlackRequests: 0,
        yesChoiceCanonicalItemIds: ["AIS10001", "AIS10002", "AIS10003"],
        maximumSlackConcurrency: 1,
        duplicateYesPrevented: true,
        retryFailedOnly: true,
        unknownStatusCheckedOnly: true,
        inventoryConfirmCalls: 1,
        scannerSessionCalls: 0,
      },
    };
    fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise((resolve) => server.close(resolve));
  }
});
