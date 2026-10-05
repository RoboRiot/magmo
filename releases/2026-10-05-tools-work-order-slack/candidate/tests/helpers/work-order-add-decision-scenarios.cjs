const assert = require("node:assert/strict");

// Runs only inside an isolated browser whose outbound network is blocked.
function installSyntheticWorkOrderApi() {
  const calls = [], attempts = Object.create(null);
  const state = window.__workOrderHarness = {
    calls, attempts, config: {}, confirmCompleted: false,
    slackInFlight: 0, maxSlackConcurrency: 0,
  };
  const response = (payload, status = 200) => new Response(JSON.stringify(payload), {
    status, headers: { "Content-Type": "application/json" },
  });
  const items = [
    { id: "AIS10001", name: "Gradient amplifier" },
    { id: "AIS10002", name: "RF cable" },
    { id: "AIS10003", name: "Patient pad" },
  ];
  window.fetch = async (requestPath, options = {}) => {
    const url = String(requestPath), body = options.body ? JSON.parse(options.body) : null;
    calls.push({ url, body, method: options.method || "GET", afterConfirm: state.confirmCompleted });
    if (url.startsWith("/api/items/work-order-add/options")) return response({ ok: true, workOrders: [{
      id: "work-order-10456", number: "10456", subject: "Synthetic MRI cabinet service",
      clientName: "Synthetic client", machineName: "Synthetic MRI", destinationLinked: true,
      destinationKind: "machine", workflowStatus: "Open",
    }] });
    if (url === "/api/items/work-order-add/scan-sessions") return response({ ok: true, session: { status: "active", expiresAt: new Date(Date.now() + 300000).toISOString() } });
    if (url.includes("/scan-sessions/") && url.endsWith("/stop")) return response({ ok: true, stop: { delivered: true } });
    if (url.includes("/scan-sessions/")) return response({ ok: true, session: { status: "active", expiresAt: new Date(Date.now() + 300000).toISOString(), pollAfterMs: 250, events: state.emitLateScan ? [{ eventId: "synthetic-late-scan", code: "AIS10004" }] : [] } });
    if (url === "/api/items/work-order-add/resolve" && body.code === "AIS10004") {
      await new Promise(resolve => { state.releaseLateResolve = resolve; });
      return response({ ok: true, resolution: { status: "ready", kind: "item", canonicalId: "AIS10004", membershipFingerprint: "late-synthetic-item", itemIds: ["AIS10004"], preview: { id: "AIS10004", name: "Late scanner item" } } });
    }
    if (url === "/api/items/work-order-add/resolve" && state.config.toolScan) return response({ ok: true, resolution: {
      status: "ready", kind: "tool", canonicalId: "AIS_T00001", membershipFingerprint: "synthetic-tool",
      itemIds: ["AIS_T00001"], entityKeys: ["tool:AIS_T00001"],
      preview: { id: "AIS_T00001", name: "Calibration tester", itemCount: 1, items: [{ id: "AIS_T00001", kind: "tool" }] },
    } });
    if (url === "/api/items/work-order-add/resolve" && state.config.palletScan) return response({ ok: true, resolution: {
      status: "ready", kind: "pallet", canonicalId: "P65", membershipFingerprint: "synthetic-pallet",
      itemIds: items.map(item => item.id), preview: { id: "P65", name: "Pallet 65", itemCount: 3, items },
    } });
    if (url === "/api/items/work-order-add/resolve") return response({ ok: true, resolution: {
      status: "ready", kind: "bin", canonicalId: "AIS-B00047", membershipFingerprint: "synthetic-bin-membership",
      itemIds: items.map(item => item.id),
      preview: { id: "AIS-B00047", name: "Bin 47", itemCount: 3, items },
    } });
    if (url === "/api/items/work-order-add/confirm") {
      if (state.config.holdConfirm) await new Promise(resolve => { state.releaseConfirm = resolve; });
      if (state.config.failConfirm) return response({ ok: false, code: "synthetic_failure", error: "Synthetic save rejected; nothing saved." }, 400);
      state.confirmCompleted = true;
      const movedItems = state.config.toolScan ? [{ id: "AIS_T00001", kind: "tool", name: "Calibration tester" }] : items;
      const slackTargets = state.config.toolScan ? [{ id: "AIS_T00001", kind: "tool", name: "Calibration tester" }] :
        state.config.palletScan ? [{ id: "P65", kind: "pallet", name: "Pallet 65", description: "Pallet description" }] :
        [{ id: "B47", kind: "bin", name: "Bin 47", description: "Bin description" }];
      return response({ ok: true, result: {
        ok: true, operationId: state.config.missingOperationId ? "" : body.operationId, movementMode: body.movementMode,
        itemCount: movedItems.length, workOrder: { number: "10456" }, items: state.config.missingItems ? [] : movedItems,
        ...(state.config.rootTargets ? { slackTargets } : {}),
      } });
    }
    if (url === "/api/items/work-order-add/slack") {
      attempts[body.itemId] = (attempts[body.itemId] || 0) + 1;
      state.slackInFlight++;
      state.maxSlackConcurrency = Math.max(state.maxSlackConcurrency, state.slackInFlight);
      if (state.config.holdSlack) await new Promise(resolve => { state.releaseSlack = resolve; });
      await new Promise(resolve => setTimeout(resolve, 35));
      state.slackInFlight--;
      if (state.config.alreadyExists) return response({ ok: true, result: { itemId: body.itemId, status: "sent", alreadyExists: true,
        message: "Tool AIS_T00001 is already on Slack; no duplicate was added.", threadStatus: "not_requested" } });
      if (state.config.mixedSlack && attempts[body.itemId] === 1 && body.itemId !== "AIS10001") {
        const failed = body.itemId === "AIS10002";
        return response({ ok: true, result: { itemId: body.itemId, status: failed ? "failed" : "future_status", listStatus: "sent", threadStatus: failed ? "failed" : "uncertain", message: "Synthetic thread delivery result." } });
      }
      return response({ ok: true, result: { itemId: body.itemId, status: "sent", listStatus: "sent", threadStatus: "sent" } });
    }
    throw new Error("Unexpected synthetic endpoint: " + url);
  };
}

const callsOf = (calls, suffix) => calls.filter(call => call.url.endsWith(suffix));
const readCalls = page => page.evaluate(() => window.__workOrderHarness.calls);
const decisionDialog = page => page.locator('[role="dialog"][aria-labelledby="work-order-add-final-check-title"]');

async function stageReviewedBin(page, scenario) {
  await page.getByRole("combobox", { name: "Work order" }).fill("10456");
  await page.getByRole("option", { name: /WO #10456/ }).click();
  await page.locator('input[value="current_at_work_order"]').check();
  await page.getByLabel("Manual barcode input").fill(scenario?.config?.toolScan ? "AIS_T00001" : scenario?.config?.palletScan ? "P65" : "B47");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByText(scenario?.config?.toolScan ? "Calibration tester" : scenario?.config?.palletScan ? "Pallet 65" : "Bin 47", { exact: true }).waitFor();
  if (scenario?.config?.toolScan) await page.getByText("tool", { exact: true }).waitFor();
  if (scenario?.config?.lateScanner) {
    await page.getByRole("button", { name: "Enable scanner", exact: true }).click();
    await page.getByText("Scanner server relay active", { exact: true }).waitFor();
  }
  await page.getByRole("button", { name: "Confirm list", exact: true }).click();
  const dialog = decisionDialog(page);
  await dialog.waitFor();
  for (const name of ["Cancel", "Save only", "Save and send to Slack"]) {
    assert.equal(await dialog.getByRole("button", { name, exact: true }).isVisible(), true, name);
  }
  assert.equal(await page.getByRole("button", { name: "Confirm list", exact: true }).isDisabled(), true);
  assert.equal(callsOf(await readCalls(page), "/confirm").length, 0);
  assert.equal(callsOf(await readCalls(page), "/slack").length, 0);
  return dialog;
}

async function inspectDecisionGeometry(page, dialog) {
  await dialog.evaluate(el => new Promise(resolve => {
    const settle = () => getComputedStyle(el).opacity === "1" ? resolve() : requestAnimationFrame(settle);
    settle();
  }));
  // Bootstrap's opacity transition ends before the dialog translate transition.
  // Measure final layout, not its deliberately off-center entrance animation.
  await dialog.evaluate(async el => {
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await Promise.all(el.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
  });
  const result = await dialog.evaluate(el => {
    const content = el.querySelector(".modal-content"), rect = content.getBoundingClientRect();
    const center = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    const buttons = [...el.querySelectorAll("button")].map(button => {
      const box = button.getBoundingClientRect();
      return { name: button.textContent.trim(), x: box.x, y: box.y, width: box.width, height: box.height, centerHit: document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.closest("button") === button };
    });
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, viewportWidth: innerWidth, viewportHeight: innerHeight, centerHitInside: el.contains(center), contentClass: content.className, dialogClass: content.parentElement.className, buttons };
  });
  assert.equal(result.centerHitInside, true, "decision popup must be topmost and clickable");
  assert.ok(result.x >= 0 && result.x + result.width <= result.viewportWidth + 1, "popup fits viewport");
  assert.ok(Math.abs(result.x + result.width / 2 - result.viewportWidth / 2) < 2, "popup horizontally centered");
  if (result.height < result.viewportHeight - 32) assert.ok(Math.abs(result.y + result.height / 2 - result.viewportHeight / 2) < 3, "popup vertically centered");
  for (const button of result.buttons) {
    assert.ok(button.x >= 0 && button.x + button.width <= result.viewportWidth + 1 && button.y >= 0 && button.y + button.height <= result.viewportHeight + 1, `${button.name} must be fully within viewport`);
    assert.equal(button.centerHit, true, `${button.name} must be clickable and not clipped`);
  }
  if (result.viewportWidth >= 800) assert.ok(Math.abs(result.width - 640) < 2, `styled popup must be640px, got${result.width}`);
  assert.match(result.contentClass, /promptContent/);
  assert.match(result.dialogClass, /promptDialog/);
  return result;
}

async function assertPendingSave(page, dialog) {
  await page.waitForFunction(() => typeof window.__workOrderHarness.releaseConfirm === "function");
  assert.equal(await dialog.isVisible(), true, "popup stays visible while saving");
  for (const button of await dialog.getByRole("button").all()) {
    assert.equal(await button.isDisabled(), true, "pending popup controls must be locked");
  }
  assert.equal(callsOf(await readCalls(page), "/slack").length, 0, "Slack waits for successful save");
}

async function runDecisionScenario(page, scenario) {
  if (scenario.dark) await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
  await page.evaluate(config => Object.assign(window.__workOrderHarness.config, config), scenario.config || {});
  const dialog = await stageReviewedBin(page, scenario);
  const geometry = await inspectDecisionGeometry(page, dialog);
  if (scenario.screenshotPath) await page.screenshot({ path: scenario.screenshotPath });
  if (scenario.config?.lateScanner) {
    await page.evaluate(() => { window.__workOrderHarness.emitLateScan = true; });
    await page.waitForFunction(() => typeof window.__workOrderHarness.releaseLateResolve === "function");
    assert.equal(await dialog.getByRole("button", { name: "Save only", exact: true }).isDisabled(), true);
    assert.equal(await dialog.getByRole("button", { name: "Save and send to Slack", exact: true }).isDisabled(), true);
    await page.evaluate(() => window.__workOrderHarness.releaseLateResolve());
    await page.waitForFunction(() => [...document.querySelectorAll('[aria-labelledby="work-order-add-final-check-title"] button')].some(button => button.textContent.trim() === "Save only" && !button.disabled));
    assert.match(await dialog.textContent(), /attach 4 inventory items/);
    await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
    assert.equal(callsOf(await readCalls(page), "/confirm").length, 0);
    assert.equal(callsOf(await readCalls(page), "/slack").length, 0);
    return { name: scenario.name, geometry, confirm: 0, slack: 0, lateScanResolvedWhileReviewOpen: true };
  }
  if (scenario.name === "cancel" || scenario.choice === "cancel") {
    await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
    await dialog.waitFor({ state: "hidden" });
    assert.equal(callsOf(await readCalls(page), "/confirm").length, 0);
    assert.equal(callsOf(await readCalls(page), "/slack").length, 0);
    return { name: scenario.name, geometry, confirm: 0, slack: 0 };
  }
  const action = scenario.name === "save-only" ? "Save only" : "Save and send to Slack";
  await dialog.getByRole("button", { name: action, exact: true }).evaluate(button => { button.click(); button.click(); });
  if (scenario.config?.holdConfirm) {
    await assertPendingSave(page, dialog);
    await page.evaluate(() => window.__workOrderHarness.releaseConfirm());
  }
  if (scenario.config?.failConfirm) {
    await page.getByText("Synthetic save rejected; nothing saved.", { exact: true }).first().waitFor();
    assert.equal(callsOf(await readCalls(page), "/confirm").length, 1, "duplicate click cannot duplicate a save");
    assert.equal(callsOf(await readCalls(page), "/slack").length, 0, "failed save never sends Slack");
    return { name: scenario.name, geometry, confirm: 1, slack: 0 };
  }
  if (scenario.config?.missingOperationId || scenario.config?.missingItems) {
    await dialog.getByText(/Inventory was saved, but its Slack delivery details were incomplete/).waitFor();
    assert.equal(callsOf(await readCalls(page), "/confirm").length, 1);
    assert.equal(callsOf(await readCalls(page), "/slack").length, 0, "malformed saved manifest cannot trigger Slack");
    return { name: scenario.name, geometry, confirm: 1, slack: 0 };
  }
  if (scenario.name === "save-only") {
    await page.getByText("Inventory was added to the work order.", { exact: true }).waitFor();
    assert.equal(callsOf(await readCalls(page), "/confirm").length, 1);
    assert.equal(callsOf(await readCalls(page), "/slack").length, 0);
    assert.equal(await page.getByRole("dialog", { name: "Send saved items to Slack?" }).count(), 0, "no second consent popup");
    return { name: scenario.name, geometry, confirm: 1, slack: 0 };
  }
  if (scenario.config?.holdSlack) {
    await page.waitForFunction(() => typeof window.__workOrderHarness.releaseSlack === "function");
    assert.equal(await dialog.isVisible(), true, "same decision popup stays visible during Slack delivery");
    assert.equal(await dialog.getByRole("button", { name: "Close", exact: true }).isDisabled(), true, "pending delivery cannot close the popup");
    await page.evaluate(() => { window.__workOrderHarness.config.holdSlack = false; window.__workOrderHarness.releaseSlack(); });
  }
  const mixed = scenario.config?.mixedSlack;
  const expectedIds = scenario.config?.rootTargets ? [scenario.config.toolScan ? "AIS_T00001" : scenario.config.palletScan ? "P65" : "B47"] : ["AIS10001", "AIS10002", "AIS10003"];
  await page.getByText(mixed ? /1 sent · 1 failed · 1 need a status check/ : scenario.config?.alreadyExists ? "0 sent · 1 already on Slack" : `${expectedIds.length} sent`, { exact: !mixed }).waitFor();
  if (scenario.config?.alreadyExists) await dialog.getByText("Already on Slack", { exact: true }).waitFor();
  assert.equal(await dialog.isVisible(), true, "same popup shows saved/Slack result");
  assert.equal(await page.getByRole("dialog", { name: "Send saved items to Slack?" }).count(), 0, "no second consent popup");
  let calls = await readCalls(page);
  assert.deepEqual(callsOf(calls, "/slack").map(call => call.body.itemId), expectedIds);
  assert.ok(callsOf(calls, "/slack").every(call => call.afterConfirm), "all Slack requests follow successful save");
  assert.equal(await page.evaluate(() => window.__workOrderHarness.maxSlackConcurrency), 1);
  callsOf(calls, "/slack").forEach(call => assert.deepEqual(Object.keys(call.body).sort(), ["itemId", "operationId"]));
  if (mixed) {
    await page.getByRole("button", { name: "Retry failed (1)", exact: true }).click();
    await page.getByText(/2 sent · 1 need a status check/).waitFor();
    await page.getByRole("button", { name: "Check status (1)", exact: true }).click();
    await page.getByText("3 sent", { exact: true }).waitFor();
    calls = await readCalls(page);
    assert.deepEqual(callsOf(calls, "/slack").slice(3).map(call => call.body.itemId), ["AIS10002", "AIS10003"]);
  }
  assert.equal(callsOf(calls, "/confirm").length, 1, "Slack retry must not resave inventory/history");
  return { name: scenario.name, geometry, confirm: 1, slack: callsOf(calls, "/slack").length };
}

const scenarios = [
  { name: "bin-slack-summary", config: { rootTargets: true } },
  { name: "pallet-slack-summary", config: { rootTargets: true, palletScan: true } },
  { name: "new-tool-send", config: { rootTargets: true, toolScan: true } },
  { name: "existing-tool-skip", config: { rootTargets: true, toolScan: true, alreadyExists: true } },
  { name: "cancel" },
  { name: "save-only", config: { holdConfirm: true } },
  { name: "save-and-send", config: { holdConfirm: true, holdSlack: true, mixedSlack: true } },
  { name: "failed-save", config: { holdConfirm: true, failConfirm: true } },
  { name: "missing-saved-operation", config: { missingOperationId: true } },
  { name: "missing-saved-items", config: { missingItems: true } },
  { name: "late-relay-scan", config: { lateScanner: true } },
  { name: "desktop-dark", choice: "cancel", dark: true },
  { name: "mobile-reduced-motion", width: 390, height: 844, motion: "reduce", dark: true },
];

module.exports = { installSyntheticWorkOrderApi, scenarios, runDecisionScenario };
