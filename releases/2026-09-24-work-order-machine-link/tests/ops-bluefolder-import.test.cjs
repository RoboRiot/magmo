"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  blueFolderWorkflowStage,
  buildBlueFolderLifecycleCorrection,
  buildBlueFolderImportPatch,
  initialBlueFolderWorkflowStage,
} = require("../lib/ops/blueFolderImportContract.cjs");

function importPayload(overrides = {}) {
  return {
    eventType: "work_order.imported",
    workOrderId: "10468",
    blueFolder: { serviceRequestId: "10468" },
    number: "10468",
    subject: "Scanner requires service",
    description: "BlueFolder issue details",
    customer: "Example Imaging",
    bluefolderAssignees: [
      { id: "U02ENGINEER", name: "Field Engineer" },
    ],
    ...overrides,
  };
}

test("a first BlueFolder import is keyed by the immutable service-request ID", () => {
  const result = buildBlueFolderImportPatch({}, importPayload());
  assert.equal(result.serviceRequestId, "10468");
  assert.equal(result.patch.workOrderId, "10468");
  assert.equal(result.patch.bluefolderServiceRequestId, "10468");
  assert.equal(result.patch.bluefolderImportSource, "bluefolder");
  assert.equal(result.patch.bluefolderImportFingerprint.length, 64);
  assert.equal(result.idempotentReplay, false);
});

test("raw BlueFolder lifecycle status places new imports in the normal Magmo stage", () => {
  assert.equal(
    initialBlueFolderWorkflowStage({
      bluefolderStatus: "Complete - Ready for Bill",
    }),
    "done"
  );
  assert.equal(
    initialBlueFolderWorkflowStage({ bluefolderStatus: "Closed" }),
    "closed"
  );
  assert.equal(
    initialBlueFolderWorkflowStage({
      bluefolderStatus: "Open",
      bluefolderDateTimeClosed: "2026-08-31T17:30:00Z",
    }),
    "closed"
  );
  assert.equal(blueFolderWorkflowStage("Work Complete"), "service_complete");
  assert.equal(blueFolderWorkflowStage("On Hold"), "on_hold");
  assert.equal(blueFolderWorkflowStage("Assigned"), "active");
});

test("explicit workflow stage and assignment fallback retain import precedence", () => {
  assert.equal(
    initialBlueFolderWorkflowStage({
      bluefolderWorkflowStatus: "service_complete",
      bluefolderStatus: "Closed",
    }),
    "service_complete"
  );
  assert.equal(
    initialBlueFolderWorkflowStage({
      bluefolderStatus: "Unexpected vendor status",
      hasAssignees: true,
    }),
    "active"
  );
  assert.equal(
    initialBlueFolderWorkflowStage({
      bluefolderStatus: "Unexpected vendor status",
    }),
    "unassigned"
  );
});

test("an otherwise identical import repairs a stale BlueFolder lifecycle once", () => {
  const payload = importPayload({
    bluefolderStatus: "Complete - Ready for Bill",
  });
  const first = buildBlueFolderImportPatch({}, payload);
  const stale = {
    ...first.patch,
    status: "active",
    workflowStatus: "unassigned",
  };
  const identicalImport = buildBlueFolderImportPatch(stale, payload);
  assert.equal(identicalImport.idempotentReplay, true);

  const correction = buildBlueFolderLifecycleCorrection(stale, payload);
  assert.deepEqual(correction.patch, {
    workflowStatus: "done",
    status: "completed",
  });
  assert.equal(correction.applied, true);

  const corrected = { ...stale, ...correction.patch };
  assert.equal(buildBlueFolderImportPatch(corrected, payload).idempotentReplay, true);
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(corrected, payload).patch,
    {}
  );
});

test("lifecycle correction is monotonic and uses the correct top-level status", () => {
  const imported = {
    bluefolderImportSource: "bluefolder",
    status: "active",
    workflowStatus: "active",
  };
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(imported, {
      bluefolderStatus: "Work Complete",
    }).patch,
    { workflowStatus: "service_complete" }
  );
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(
      { ...imported, status: "completed", workflowStatus: "service_complete" },
      { bluefolderStatus: "Work Complete" }
    ).patch,
    { status: "active" }
  );
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(
      { ...imported, workflowStatus: "service_complete" },
      { bluefolderStatus: "Complete - Ready for Bill" }
    ).patch,
    { workflowStatus: "done", status: "completed" }
  );
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(
      { ...imported, status: "completed", workflowStatus: "done" },
      { bluefolderStatus: "Work Complete" }
    ).patch,
    {}
  );
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(
      { ...imported, status: "completed", workflowStatus: "done" },
      { bluefolderStatus: "Closed" }
    ).patch,
    { workflowStatus: "closed" }
  );
});

test("lifecycle correction preserves receipts and manual workflow placement", () => {
  const existing = {
    bluefolderImportSource: "bluefolder",
    status: "active",
    workflowStatus: "active",
    slackChannel: "C07EPLKV9JT",
    slackThreadTs: "1782847034.191739",
    dispatchReceipt: { slackThreadTs: "1782847034.191739" },
    workflowStageHistory: [{ source: "manual_stage_move" }],
  };
  assert.deepEqual(
    buildBlueFolderLifecycleCorrection(existing, {
      bluefolderStatus: "Closed",
    }).patch,
    {}
  );

  const unlocked = {
    ...existing,
    workflowStageHistory: [],
  };
  const correction = buildBlueFolderLifecycleCorrection(unlocked, {
    bluefolderStatus: "Closed",
  });
  assert.deepEqual(correction.patch, {
    workflowStatus: "closed",
    status: "completed",
  });
  assert.equal("slackChannel" in correction.patch, false);
  assert.equal("slackThreadTs" in correction.patch, false);
  assert.equal("dispatchReceipt" in correction.patch, false);
});

test("an identical import replay is a no-op", () => {
  const payload = importPayload();
  const first = buildBlueFolderImportPatch({}, payload);
  const existing = { ...first.patch };
  const replay = buildBlueFolderImportPatch(existing, payload);
  assert.deepEqual(replay.patch, {});
  assert.deepEqual(replay.changedFields, []);
  assert.equal(replay.idempotentReplay, true);
});

test("payload fingerprint keeps replays idempotent after Magmo normalizes stored fields", () => {
  const payload = importPayload({
    bluefolderAssignees: [{ id: "U07FH9NKCSD", name: "Igor S" }],
  });
  const first = buildBlueFolderImportPatch({}, payload);
  const replay = buildBlueFolderImportPatch(
    {
      ...first.patch,
      bluefolderAssignees: [
        { id: "U07FH9NKCSD", name: "Igor Savchenko" },
      ],
    },
    payload
  );
  assert.equal(replay.idempotentReplay, true);
  assert.deepEqual(replay.patch, {});
});

test("an import update never includes or overwrites an existing Dispatch receipt", () => {
  const existing = {
    workOrderId: "10468",
    bluefolderServiceRequestId: "10468",
    bluefolderImportSource: "bluefolder",
    subject: "Old subject",
    slackChannel: "C07EPLKV9JT",
    slackThreadTs: "1782847034.191739",
    slackPermalink:
      "https://advancedimaging.slack.com/archives/C07EPLKV9JT/p1782847034191739",
    dispatchReceipt: {
      workOrderId: "10468",
      dispatchStatus: "posted",
      slackChannel: "C07EPLKV9JT",
      slackThreadTs: "1782847034.191739",
    },
  };
  const result = buildBlueFolderImportPatch(existing, {
    eventType: "work_order.imported",
    blueFolder: { serviceRequestId: "10468" },
    subject: "Updated subject",
  });
  assert.equal(result.patch.subject, "Updated subject");
  assert.equal("slackChannel" in result.patch, false);
  assert.equal("slackThreadTs" in result.patch, false);
  assert.equal("slackPermalink" in result.patch, false);
  assert.equal("dispatchReceipt" in result.patch, false);
});

test("BlueFolder customer and exact site identity are retained for deterministic linking", () => {
  const result = buildBlueFolderImportPatch(
    {},
    importPayload({
      blueFolder: {
        serviceRequestId: "10468",
        customerId: "34579369",
        customerName: "Prohealth Advanced Imaging",
        customerLocationId: "35203706",
        customerLocationName: "Prohealth - Torrance",
        addressStreet: "23456 Hawthorne Blvd, Ste 120",
        addressCity: "Torrance",
        addressState: "CA",
        addressPostalCode: "90505",
        addressCountry: "US",
      },
    })
  );
  assert.equal(result.patch.bluefolderCustomerId, "34579369");
  assert.equal(result.patch.bluefolderLocationId, "35203706");
  assert.equal(result.patch.bluefolderCustomerName, "Prohealth Advanced Imaging");
  assert.equal(result.patch.bluefolderLocationName, "Prohealth - Torrance");
  assert.equal(result.patch.bluefolderAddressPostalCode, "90505");
});

test("an import cannot rebind an existing manual destination", () => {
  const existing = {
    clientId: "AIS-MANUAL",
    clientName: "Verified manual client",
    clientLocation: "Verified address",
    machineId: "M-MANUAL",
    machineName: "Verified machine",
    trailerId: "AIS23",
    trailerName: "Verified trailer",
  };
  const result = buildBlueFolderImportPatch(
    existing,
    importPayload({
      clientId: "AIS-OTHER",
      clientName: "Wrong client",
      clientLocation: "Wrong address",
      machineId: "M-OTHER",
      machineName: "Wrong machine",
      trailerId: "AIS99",
      trailerName: "Wrong trailer",
    })
  );
  for (const field of [
    "clientId",
    "clientName",
    "clientLocation",
    "machineId",
    "machineName",
    "trailerId",
    "trailerName",
  ]) {
    assert.equal(field in result.patch, false, field);
  }
});

test("an import may refresh snapshots only when it repeats the existing destination ID", () => {
  const result = buildBlueFolderImportPatch(
    {
      clientId: "AIS79109",
      clientName: "Old name",
      clientLocation: "Old location",
    },
    importPayload({
      clientId: "AIS79109",
      clientName: "Prohealth - Torrance",
      clientLocation: "23456 Hawthorne Blvd, Torrance, CA 90505",
    })
  );
  assert.equal(result.patch.clientId, undefined);
  assert.equal(result.patch.clientName, "Prohealth - Torrance");
  assert.equal(
    result.patch.clientLocation,
    "23456 Hawthorne Blvd, Torrance, CA 90505"
  );
});

test("an import refresh cannot overwrite an existing terminal or manual Magmo stage", () => {
  for (const workflowStatus of ["closed", "done", "scheduled"]) {
    const result = buildBlueFolderImportPatch(
      {
        workOrderId: "10468",
        bluefolderServiceRequestId: "10468",
        workflowStatus,
      },
      {
        eventType: "work_order.imported",
        blueFolder: { serviceRequestId: "10468" },
        bluefolderStatus: "Assigned",
      }
    );
    assert.equal("workflowStatus" in result.patch, false, workflowStatus);
  }
});

test("the same Magmo ID cannot be rebound to another BlueFolder request", () => {
  assert.throws(
    () =>
      buildBlueFolderImportPatch(
        { bluefolderServiceRequestId: "10468" },
        {
          eventType: "work_order.imported",
          blueFolder: { serviceRequestId: "10469" },
        }
      ),
    (error) => error.code === "bluefolder_identity_conflict"
  );
});

test("Slack and Dispatch fields fail closed even in the pure merge layer", () => {
  for (const forbidden of [
    { slackChannel: "C07EPLKV9JT" },
    { slackThreadTs: "1782847034.191739" },
    { dispatchReceipt: {} },
    { source: { channel: "C07EPLKV9JT" } },
    { blueFolder: { serviceRequestId: "10468", slackChannel: "C07EPLKV9JT" } },
    { metadata: { slackPermalink: "https://example.slack.com/archives/C07" } },
    { bluefolderAssignees: [{ id: "person-1", slackUserId: "U02ENGINEER" }] },
  ]) {
    assert.throws(
      () => buildBlueFolderImportPatch({}, importPayload(forbidden)),
      (error) => error.code === "bluefolder_import_contains_slack_receipt"
    );
  }
});

test("unknown non-Slack fields fail closed instead of being silently ignored", () => {
  assert.throws(
    () => buildBlueFolderImportPatch({}, importPayload({ unexpectedValue: true })),
    (error) =>
      error.code === "bluefolder_import_unsupported_fields" &&
      error.fields.includes("unexpectedValue")
  );
});
