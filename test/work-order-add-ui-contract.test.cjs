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
