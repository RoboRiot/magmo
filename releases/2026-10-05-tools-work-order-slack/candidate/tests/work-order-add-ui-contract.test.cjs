const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

function loadProjectModule(relativePath) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transformed = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transformed
  )(require, module, module.exports, filename, path.dirname(filename));
  return module.exports;
}

const uiContract = loadProjectModule(
  "lib/inventory/workOrderAddUiContract.js"
);

test("movement descriptions show the exact From and Current branches", () => {
  const workOrder = {
    clientName: "Prohealth - Torrance",
    machineName: "MRI 1",
  };

  assert.deepEqual(
    uiContract.describeWorkOrderAddMovement(
      uiContract.MOVEMENT_FROM_WORK_ORDER,
      workOrder
    ),
    {
      from: "Prohealth - Torrance · MRI 1",
      current: "SoCal Warehouse Interior",
      shortLabel: "From work order",
    }
  );
  assert.deepEqual(
    uiContract.describeWorkOrderAddMovement(
      uiContract.MOVEMENT_CURRENT_AT_WORK_ORDER,
      workOrder
    ),
    {
      from: "SoCal Warehouse Interior",
      current: "Prohealth - Torrance · MRI 1",
      shortLabel: "Current at work order",
    }
  );
});

test("confirmation payload requires and retains the selected movement mode", () => {
  const input = {
    operationId: "operation-1",
    workOrderId: "10456",
    scans: ["AIS17704"],
    expectedMembership: [{ code: "AIS17704", fingerprint: "abc" }],
    movementMode: "Current-at-work-order",
    originChoice: "keep_origin",
  };
  const payload = uiContract.buildWorkOrderAddConfirmationPayload(input);

  assert.deepEqual(payload, {
    operationId: "operation-1",
    workOrderId: "10456",
    scans: ["AIS17704"],
    expectedMembership: [{ code: "AIS17704", fingerprint: "abc" }],
    movementMode: uiContract.MOVEMENT_CURRENT_AT_WORK_ORDER,
  });
  assert.equal(Object.hasOwn(payload, "originChoice"), false);
});

test("confirmation payload rejects a missing or unknown movement mode", () => {
  for (const movementMode of ["", "keep_origin", "sideways"]) {
    assert.throws(
      () =>
        uiContract.buildWorkOrderAddConfirmationPayload({
          operationId: "operation-1",
          workOrderId: "10456",
          scans: ["AIS17704"],
          expectedMembership: [],
          movementMode,
        }),
      /Choose whether the inventory is from or current at the work order/
    );
  }
});

test("movement selection locks as soon as inventory is resolving or staged", () => {
  assert.equal(uiContract.isWorkOrderAddMovementModeLocked(), false);
  assert.equal(
    uiContract.isWorkOrderAddMovementModeLocked({ resolvingCount: 1 }),
    true
  );
  assert.equal(
    uiContract.isWorkOrderAddMovementModeLocked({ rowCount: 1 }),
    true
  );
  assert.equal(
    uiContract.isWorkOrderAddMovementModeLocked({ editingLocked: true }),
    true
  );
});

test("destination label fails closed to a clear work-order label", () => {
  assert.equal(
    uiContract.workOrderDestinationLabel({ clientLocation: "23456 Hawthorne Blvd" }),
    "23456 Hawthorne Blvd"
  );
  assert.equal(
    uiContract.workOrderDestinationLabel({}),
    "Work-order destination"
  );
});

test("Slack movement labels preserve the shipping and receiving semantics", () => {
  assert.equal(
    uiContract.workOrderAddSlackMovementKind(
      uiContract.MOVEMENT_CURRENT_AT_WORK_ORDER
    ),
    uiContract.WORK_ORDER_ADD_SLACK_SHIPPING
  );
  assert.equal(
    uiContract.workOrderAddSlackMovementKind(
      uiContract.MOVEMENT_FROM_WORK_ORDER
    ),
    uiContract.WORK_ORDER_ADD_SLACK_RECEIVING
  );
  assert.equal(uiContract.workOrderAddSlackMovementKind("sideways"), "");
});

test("Slack item payload contains only the saved operation and result item ID", () => {
  assert.deepEqual(
    uiContract.buildWorkOrderAddSlackItemPayload({
      operationId: " operation-1 ",
      itemId: " AIS17704 ",
      movementMode: uiContract.MOVEMENT_CURRENT_AT_WORK_ORDER,
      direction: "shipping",
      message: "not trusted",
    }),
    { operationId: "operation-1", itemId: "AIS17704" }
  );
  assert.throws(
    () => uiContract.buildWorkOrderAddSlackItemPayload({ itemId: "AIS17704" }),
    /operation is required/
  );
  assert.throws(
    () => uiContract.buildWorkOrderAddSlackItemPayload({ operationId: "operation-1" }),
    /inventory item is required/
  );
});

test("Slack transport errors require a status check instead of a blind retry", () => {
  for (const status of [0, 408, 429, 500, 503]) {
    assert.equal(uiContract.workOrderAddSlackErrorStatus({ status }), "uncertain");
  }
  for (const status of [400, 401, 403, 404, 409, 422]) {
    assert.equal(uiContract.workOrderAddSlackErrorStatus({ status }), "failed");
  }
});

test("one decision popup records consent and sends Slack only after a successful save", () => {
  const source = fs.readFileSync(path.join(__dirname, "../components/WorkOrderAddModal.js"), "utf8");
  const submitStart = source.indexOf("const submitConfirmation");
  const submitEnd = source.indexOf("const mergeSlackOutcome", submitStart);
  const submitSource = source.slice(submitStart, submitEnd);
  const slackStart = source.indexOf("const sendSlackItems");
  const slackEnd = source.indexOf("const dismissConfirmation", slackStart);
  const slackSource = source.slice(slackStart, slackEnd);
  assert.ok(submitStart >= 0 && submitEnd > submitStart);
  assert.match(submitSource, /\/api\/items\/work-order-add\/confirm/);
  assert.match(submitSource, /confirmationActiveRef\.current = true/);
  assert.match(submitSource, /if \(sendToSlack\) await sendSlackItems\("all", savedConfirmation\)/);
  assert.ok(submitSource.indexOf('setPhase("success")') < submitSource.indexOf('await sendSlackItems'));
  assert.doesNotMatch(submitSource, /setReadyPrompt\(false\)/, "the same popup must stay mounted through save");
  assert.match(source, /show=\{show && readyPrompt\}/);
  for (const label of ["Save this inventory list?", "Save only", "Save and send to Slack"]) assert.ok(source.includes(label));
  assert.doesNotMatch(source, /onExited=|slackPromptPending|slackPromptOpen|Yes, send all to Slack/);
  assert.equal((source.match(/aria-labelledby="work-order-add-final-check-title"/g) || []).length, 1);
  assert.match(slackSource, /if \(!savedOperationId \|\| !savedItems\.length\)/);
  assert.match(slackSource, /for \(const item of targets\)/);
  assert.match(slackSource, /\/api\/items\/work-order-add\/slack/);
  assert.match(slackSource, /timeoutMs:\s*240000/);
  assert.match(slackSource, /itemId: item\.id/);
  assert.doesNotMatch(slackSource, /Promise\.all/);
});

test("review popup admits active relay scans without unlocking manual edits", () => {
  const source = fs.readFileSync(path.join(__dirname, "../components/WorkOrderAddModal.js"), "utf8");
  assert.match(source, /const acceptingScannerReview\s*=\s*fromScannerServer && readyPrompt && !busy && !submittedMovementMode && phase !== "success"/);
  assert.match(source, /editingLocked && !finishingScannerQueue && !acceptingScannerReview/);
  assert.match(source, /scannerQueueStats\.outstanding > 0/);
});

test("Slack result handling separates failed retries from uncertain status checks", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "../components/WorkOrderAddModal.js"),
    "utf8"
  );
  assert.match(source, /mode === "failed"/);
  assert.match(source, /mode === "check"/);
  assert.match(source, /\["sending", "uncertain"\]\.includes\(status\)/);
  assert.match(source, /Retry failed \(\{slackFailedCount\}\)/);
  assert.match(source, /Check status \(\{slackCheckCount\}\)/);
  assert.match(source, /slackSendActiveRef\.current/);
});

test("work-order choices show the server's specific destination issue without enabling selection", () => {
  const source = fs.readFileSync(path.join(__dirname, "../components/WorkOrderAddModal.js"), "utf8");
  assert.match(source, /cleanText\(workOrder\?\.destinationIssue\)\s*\|\|\s*"Destination not linked"/);
  assert.match(source, /disabled=\{!destinationLinked\}/);
  assert.match(source, /if \(workOrder\?\.destinationLinked === false\) return;/);
});
