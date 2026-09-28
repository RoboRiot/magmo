const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

let playwright;
try {
  playwright = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
} catch {}

const root = path.resolve(__dirname, "..");
const screenshotDirectory = path.join(
  root,
  "tmp",
  "work-order-add-slack-ui-20260925"
);

async function makeHarness(directory) {
  const loader = path.join(directory, "jsx-loader.cjs");
  const entry = path.join(directory, "entry.js");
  const styleStub = path.join(directory, "styles.cjs");
  const firebaseStub = path.join(directory, "firebase.cjs");
  const dynamicStub = path.join(directory, "dynamic.cjs");
  const cameraStub = path.join(directory, "camera.cjs");
  const component = path.join(root, "components", "WorkOrderAddModal.js");

  fs.writeFileSync(loader, `
    const babel = require(${JSON.stringify(require.resolve("@babel/core"))});
    module.exports = function(source) {
      return babel.transformSync(source, {
        filename: this.resourcePath,
        babelrc: false,
        configFile: false,
        presets: [require(${JSON.stringify(require.resolve("next/babel"))})],
        envName: "test"
      }).code;
    };
  `);
  fs.writeFileSync(
    styleStub,
    "const styles = new Proxy({}, { get: (_target, property) => String(property) }); module.exports = { __esModule: true, default: styles };"
  );
  fs.writeFileSync(
    firebaseStub,
    "module.exports = { auth: () => ({ currentUser: { getIdToken: async () => 'browser-test-token' } }) };"
  );
  fs.writeFileSync(
    dynamicStub,
    "const React = require('react'); module.exports = () => () => React.createElement('div', { 'data-camera-stub': 'true' });"
  );
  fs.writeFileSync(
    cameraStub,
    "const React = require('react'); module.exports = () => React.createElement('div', { 'data-camera-stub': 'true' });"
  );
  fs.writeFileSync(entry, `
    const React = require("react");
    const { createRoot } = require("react-dom/client");
    const WorkOrderAddModal = require(${JSON.stringify(component)}).default;

    const calls = [];
    const slackAttempts = Object.create(null);
    const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
    const response = (payload, status = 200) => new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" }
    });
    window.__workOrderHarness = { calls, slackAttempts };
    window.fetch = async (requestPath, options = {}) => {
      const url = String(requestPath);
      const body = options.body ? JSON.parse(options.body) : null;
      calls.push({ url, method: options.method || "GET", body });
      if (url.startsWith("/api/items/work-order-add/options")) {
        return response({ ok: true, workOrders: [{
          id: "work-order-10456",
          number: "10456",
          subject: "MRI cabinet service",
          clientName: "Prohealth Torrance",
          machineName: "Espree MRI",
          destinationLinked: true,
          workflowStatus: "Open"
        }] });
      }
      if (url === "/api/items/work-order-add/resolve") {
        return response({ ok: true, resolution: {
          status: "ready",
          kind: "bin",
          canonicalId: "AIS-B00047",
          membershipFingerprint: "bin-47-reviewed-membership",
          itemIds: ["AIS10001", "AIS10002", "AIS10003"],
          preview: {
            id: "AIS-B00047",
            name: "Bin 47",
            itemCount: 3,
            currentLocation: "SoCal Warehouse Interior",
            items: [
              { id: "AIS10001", name: "Gradient amplifier" },
              { id: "AIS10002", name: "RF cable" },
              { id: "AIS10003", name: "Patient pad" }
            ]
          }
        } });
      }
      if (url === "/api/items/work-order-add/confirm") {
        return response({ ok: true, result: {
          ok: true,
          operationId: body.operationId,
          movementMode: body.movementMode,
          itemCount: 3,
          workOrder: { number: "10456" },
          items: [
            { id: "AIS10001", name: "Gradient amplifier" },
            { id: "AIS10002", name: "RF cable" },
            { id: "AIS10003", name: "Patient pad" }
          ]
        } });
      }
      if (url === "/api/items/work-order-add/slack") {
        slackAttempts[body.itemId] = (slackAttempts[body.itemId] || 0) + 1;
        await wait(45);
        if (body.itemId === "AIS10002" && slackAttempts[body.itemId] === 1) {
          return response({ ok: true, result: {
            itemId: body.itemId,
            status: "failed",
            message: "Slack rejected this row before creation."
          } });
        }
        if (body.itemId === "AIS10003" && slackAttempts[body.itemId] === 1) {
          return response({ ok: true, result: {
            itemId: body.itemId,
            status: "future_status",
            message: "A newer server status needs verification."
          } });
        }
        return response({ ok: true, result: {
          itemId: body.itemId,
          status: "sent",
          message: "Sent to Slack."
        } });
      }
      return response({ ok: false, code: "unexpected_request", error: url }, 500);
    };

    function Harness() {
      return React.createElement(WorkOrderAddModal, {
        show: true,
        onHide: () => { window.__workOrderHarness.hideCount = (window.__workOrderHarness.hideCount || 0) + 1; },
        onConfirmed: result => { window.__workOrderHarness.confirmed = result; }
      });
    }
    createRoot(document.getElementById("root")).render(React.createElement(Harness));
  `);

  const { webpack } = require("next/dist/compiled/webpack/webpack");
  await new Promise((resolve, reject) => {
    const compiler = webpack({
      mode: "development",
      devtool: false,
      context: root,
      entry,
      output: { path: directory, filename: "bundle.js" },
      resolve: { modules: [path.join(root, "node_modules"), "node_modules"] },
      module: {
        rules: [{
          test: /(?:WorkOrderAddModal|workOrderAddUiContract)\.js$/,
          use: loader,
        }],
      },
      plugins: [
        new webpack.NormalModuleReplacementPlugin(
          /WorkOrderAddModal\.module\.css$/,
          styleStub
        ),
        new webpack.NormalModuleReplacementPlugin(
          /\.\.\/context\/Firebase$/,
          firebaseStub
        ),
        new webpack.NormalModuleReplacementPlugin(/^next\/dynamic$/, dynamicStub),
        new webpack.NormalModuleReplacementPlugin(
          /^react-qr-barcode-scanner$/,
          cameraStub
        ),
      ],
    });
    compiler.run((error, stats) =>
      compiler.close((closeError) => {
        if (error || closeError || stats?.hasErrors()) {
          reject(
            error ||
              closeError ||
              new Error(stats.toString({ all: false, errors: true }))
          );
        } else {
          resolve();
        }
      })
    );
  });
}

function slackCalls(calls) {
  return calls.filter(
    (entry) => entry.url === "/api/items/work-order-add/slack"
  );
}

async function stageReviewedBin(page) {
  const workOrderSearch = page.getByRole("combobox", { name: "Work order" });
  await workOrderSearch.fill("10456");
  await page.getByRole("option", { name: /WO #10456/ }).click();
  await page.locator('input[value="current_at_work_order"]').check();
  await page.getByLabel("Manual barcode input").fill("B47");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByText("Bin 47", { exact: true }).waitFor();
}

test("saved work-order items require a second opt-in before sequential Slack delivery", {
  skip:
    !playwright &&
    "Install Playwright or set PLAYWRIGHT_MODULE_PATH to run browser verification.",
  timeout: 120000,
}, async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "magmo-work-order-slack-browser-")
  );
  let server;
  let browser;
  try {
    await makeHarness(directory);
    const bundle = fs.readFileSync(path.join(directory, "bundle.js"));
    const bootstrap = fs.readFileSync(
      path.join(root, "node_modules", "bootstrap", "dist", "css", "bootstrap.min.css")
    );
    const componentCss = fs
      .readFileSync(
        path.join(root, "components", "WorkOrderAddModal.module.css"),
        "utf8"
      )
      .replace(/:global\(([^)]+)\)/g, "$1");
    server = http.createServer((req, res) => {
      if (req.url === "/bundle.js") {
        res.setHeader("Content-Type", "text/javascript; charset=utf-8");
        return res.end(bundle);
      }
      if (req.url === "/bootstrap.css") {
        res.setHeader("Content-Type", "text/css; charset=utf-8");
        return res.end(bootstrap);
      }
      if (req.url === "/component.css") {
        res.setHeader("Content-Type", "text/css; charset=utf-8");
        return res.end(componentCss);
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.end(
        '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/bootstrap.css"><link rel="stylesheet" href="/component.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>'
      );
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await playwright.chromium.launch({
      headless: true,
      ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
        ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
        : {}),
    });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    await context.route("**/*", (route) =>
      route.request().url().startsWith(origin) ? route.continue() : route.abort()
    );
    const page = await context.newPage();
    page.setDefaultTimeout(7000);
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(origin);
    await stageReviewedBin(page);

    await page.getByRole("button", { name: "Confirm list" }).click();
    const saveDialog = page.getByRole("dialog", {
      name: "Is this list ready to be saved?",
    });
    await saveDialog.waitFor();
    assert.equal(
      await page.getByRole("button", { name: "Confirm list" }).isDisabled(),
      true,
      "the save popup must disable the underlying action"
    );
    assert.equal(
      await page.evaluate(() =>
        window.__workOrderHarness.calls.filter(
          (entry) => entry.url === "/api/items/work-order-add/slack"
        ).length
      ),
      0
    );

    await saveDialog.getByRole("button", { name: "Yes, save changes" }).click();
    const slackDialog = page.getByRole("dialog", {
      name: "Send saved items to Slack?",
    });
    await slackDialog.waitFor();
    assert.match(await slackDialog.textContent(), /3 changed items · shipping/i);
    let calls = await page.evaluate(() => window.__workOrderHarness.calls);
    assert.equal(calls.filter((entry) => entry.url.endsWith("/confirm")).length, 1);
    assert.equal(slackCalls(calls).length, 0, "save must not post to Slack");

    fs.mkdirSync(screenshotDirectory, { recursive: true });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotDirectory, "desktop-slack-opt-in.png"),
      fullPage: false,
    });

    await slackDialog
      .getByRole("button", { name: "No, don’t send" })
      .click();
    await slackDialog.waitFor({ state: "hidden" });
    calls = await page.evaluate(() => window.__workOrderHarness.calls);
    assert.equal(slackCalls(calls).length, 0, "No must perform zero Slack calls");
    assert.equal(
      await page.getByText("Inventory was added to the work order.").isVisible(),
      true
    );

    await page.getByRole("button", { name: "Review Slack delivery" }).click();
    await slackDialog.waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotDirectory, "mobile-slack-opt-in.png"),
      fullPage: false,
    });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.evaluate(() => {
      document.documentElement.dataset.theme = "dark";
    });
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(screenshotDirectory, "desktop-dark-slack-opt-in.png"),
      fullPage: false,
    });

    await page.evaluate(() => {
      const button = [...document.querySelectorAll("button")].find(
        (candidate) => candidate.textContent.trim() === "Yes, send all to Slack"
      );
      button.click();
      button.click();
    });
    await slackDialog.getByText(/1 sent · 1 failed · 1 need a status check/).waitFor();
    calls = await page.evaluate(() => window.__workOrderHarness.calls);
    const firstSlackRound = slackCalls(calls);
    assert.deepEqual(
      firstSlackRound.map((entry) => entry.body.itemId),
      ["AIS10001", "AIS10002", "AIS10003"],
      "the saved canonical expansion must be sent once, sequentially"
    );
    firstSlackRound.forEach((entry) => {
      assert.deepEqual(Object.keys(entry.body).sort(), ["itemId", "operationId"]);
    });
    assert.equal(
      await slackDialog.getByText("Check status", { exact: true }).isVisible(),
      true,
      "an unknown status must require a check"
    );

    await slackDialog.getByRole("button", { name: "Retry failed (1)" }).click();
    await slackDialog.getByText(/2 sent · 1 need a status check/).waitFor();
    calls = await page.evaluate(() => window.__workOrderHarness.calls);
    assert.deepEqual(
      slackCalls(calls).slice(3).map((entry) => entry.body.itemId),
      ["AIS10002"],
      "retry must exclude sent and uncertain items"
    );

    await slackDialog.getByRole("button", { name: "Check status (1)" }).click();
    await slackDialog.getByText("3 sent", { exact: true }).waitFor();
    calls = await page.evaluate(() => window.__workOrderHarness.calls);
    assert.deepEqual(
      slackCalls(calls).slice(4).map((entry) => entry.body.itemId),
      ["AIS10003"],
      "status checks must exclude sent and retryable-failed items"
    );
    assert.equal(
      calls.filter((entry) => entry.url.endsWith("/confirm")).length,
      1,
      "Slack retries must never save the inventory movement again"
    );
    assert.deepEqual(pageErrors, []);
    await context.close();
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise((resolve) => server.close(resolve));
    const resolvedDirectory = path.resolve(directory);
    if (
      path.dirname(resolvedDirectory) === path.resolve(os.tmpdir()) &&
      path.basename(resolvedDirectory).startsWith(
        "magmo-work-order-slack-browser-"
      )
    ) {
      fs.rmSync(resolvedDirectory, { recursive: true, force: true });
    }
  }
});
