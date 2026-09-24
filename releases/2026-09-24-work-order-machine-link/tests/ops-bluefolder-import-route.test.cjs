"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");
const {
  PROTECTED_DISPATCH_FIELDS,
} = require("../lib/ops/blueFolderImportContract.cjs");
const { buildResourceChange } = require("../lib/ops/ingestContract.cjs");

function loadProjectModule(relativePath, mocks = {}) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transformed = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => {
    if (Object.prototype.hasOwnProperty.call(mocks, request)) return mocks[request];
    return require(
      request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request
    );
  };
  new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transformed
  )(localRequire, module, module.exports, filename, path.dirname(filename));
  return module.exports;
}

function responseRecorder() {
  const result = { status: null, body: null, headers: {} };
  return {
    result,
    response: {
      headersSent: false,
      setHeader(name, value) {
        result.headers[String(name).toLowerCase()] = String(value);
      },
      status(value) {
        result.status = value;
        return this;
      },
      json(value) {
        result.body = value;
        this.headersSent = true;
        return this;
      },
    },
  };
}

function loadImportRoute({ before, after, created = false, idempotentReplay = false } = {}) {
  const calls = {
    importPayloads: [],
    slackLookups: 0,
    createdIngests: 0,
    coordinateWrites: 0,
  };
  const route = loadProjectModule("pages/api/ops/ingest.js", {
    "../../../lib/ai/inferWorkOrderAssignment": {
      inferWorkOrderAssignment: async () => {
        throw new Error("Assignment inference must not run for a BlueFolder import.");
      },
    },
    "../../../lib/ops/ingestCreatedWorkOrder": {
      ingestCreatedWorkOrder: async () => {
        calls.createdIngests += 1;
        throw new Error("The Slack-backed creation path must not run.");
      },
    },
    "../../../lib/ops/companyMemory": {
      getRelevantOpsCompanyMemory: async () => {
        throw new Error("Company-memory analysis must not run for an import.");
      },
    },
    "../../../lib/ops/commandLedger": {
      runIdempotentOpsCommand: async () => {
        throw new Error("Slack command processing must not run for an import.");
      },
    },
    "../../../lib/ops/calendar": {
      getOpsWorkOrderHoursContext: async () => {
        throw new Error("Hours command processing must not run for an import.");
      },
    },
    "../../../lib/ops/trailers": {
      applyTrailerMovementCommand: async () => {
        throw new Error("Trailer command processing must not run for an import.");
      },
      getTrailerCommandContext: async () => {
        throw new Error("Trailer command context must not run for an import.");
      },
    },
    "../../../lib/ops/workOrders": {
      completeOpsWorkOrder: async () => {
        throw new Error("Completion must not run for an import.");
      },
      getOpsCommandContext: async () => {
        throw new Error("Slack command context must not run for an import.");
      },
      getOpsWorkOrderById: async () => {
        throw new Error("The route must use the repository import result directly.");
      },
      importOpsBlueFolderWorkOrder: async (payload) => {
        calls.importPayloads.push(payload);
        return {
          before,
          after,
          created,
          idempotentReplay,
          serviceRequestId: "10468",
        };
      },
      markOpsMessageAnalysisFailed: async () => {
        throw new Error("Message analysis must not run for an import.");
      },
      recordOpsMessage: async () => {
        throw new Error("Slack message recording must not run for an import.");
      },
      resetOpsAssignmentAnalysis: async () => {
        throw new Error("Assignment reset must not run for an import.");
      },
      saveOpsCommandReport: async () => {
        throw new Error("Slack command reports must not run for an import.");
      },
      saveOpsAssignmentAnalysis: async () => {
        throw new Error("Assignment analysis must not run for an import.");
      },
      saveOpsSlackCoordinates: async () => {
        calls.coordinateWrites += 1;
        throw new Error("Slack coordinates must not be saved for an import.");
      },
      serviceCompleteOpsWorkOrder: async () => {
        throw new Error("Service completion must not run for an import.");
      },
    },
    "../../../lib/slack/readOpsThread": {
      findOpsDispatchWorkOrderThread: async () => {
        calls.slackLookups += 1;
        throw new Error("Slack must not be queried for a BlueFolder import.");
      },
    },
  });
  return { handler: route.default, calls };
}

async function invoke(handler, body) {
  const previousSecret = process.env.OPS_INGEST_SECRET;
  const previousWriteEnabled = process.env.OPS_INGEST_WRITE_ENABLED;
  process.env.OPS_INGEST_SECRET = "test-import-secret";
  process.env.OPS_INGEST_WRITE_ENABLED = "true";
  try {
    const { result, response } = responseRecorder();
    await handler(
      {
        method: "POST",
        headers: { "x-ops-ingest-secret": "test-import-secret" },
        body,
      },
      response
    );
    return result;
  } finally {
    if (previousSecret === undefined) delete process.env.OPS_INGEST_SECRET;
    else process.env.OPS_INGEST_SECRET = previousSecret;
    if (previousWriteEnabled === undefined) {
      delete process.env.OPS_INGEST_WRITE_ENABLED;
    } else {
      process.env.OPS_INGEST_WRITE_ENABLED = previousWriteEnabled;
    }
  }
}

test("work_order.imported uses only the Slack-free repository path and returns its authoritative change", async () => {
  const receipt = {
    workOrderId: "10468",
    dispatchStatus: "posted",
    slackChannel: "C07EPLKV9JT",
    slackThreadTs: "1782847034.191739",
  };
  const before = {
    id: "10468",
    workOrderId: "10468",
    subject: "Original BlueFolder subject",
    dispatchReceipt: receipt,
  };
  const after = {
    ...before,
    subject: "Updated BlueFolder subject",
    dispatchReceipt: receipt,
  };
  const { handler, calls } = loadImportRoute({ before, after });

  const result = await invoke(handler, {
    eventType: "work_order.imported",
    blueFolder: { serviceRequestId: "10468" },
    subject: "Updated BlueFolder subject",
  });

  assert.equal(result.status, 200);
  assert.equal(result.headers["cache-control"], "no-store");
  assert.equal(result.body.ok, true);
  assert.equal(result.body.eventType, "work_order.imported");
  assert.equal(result.body.created, false);
  assert.equal(result.body.idempotentReplay, false);
  assert.deepEqual(result.body.idempotencyKey, {
    blueFolderServiceRequestId: "10468",
  });
  assert.deepEqual(result.body.before, before);
  assert.deepEqual(result.body.after, after);
  assert.deepEqual(result.body.workOrder, after);
  assert.deepEqual(result.body.appliedChanges, {
    subject: {
      before: "Original BlueFolder subject",
      after: "Updated BlueFolder subject",
    },
  });
  assert.deepEqual(result.body.changes, [
    {
      resourceType: "work_order",
      resourceId: "10468",
      before,
      after,
      appliedChanges: result.body.appliedChanges,
    },
  ]);
  assert.deepEqual(result.body.after.dispatchReceipt, receipt);

  assert.equal(calls.importPayloads.length, 1);
  assert.equal(calls.importPayloads[0].workOrderId, "10468");
  assert.deepEqual(calls.importPayloads[0].blueFolder, {
    serviceRequestId: "10468",
  });
  assert.equal(calls.slackLookups, 0);
  assert.equal(calls.createdIngests, 0);
  assert.equal(calls.coordinateWrites, 0);
});

function assertNoReceiptChanges(result) {
  for (const field of PROTECTED_DISPATCH_FIELDS) {
    assert.equal(field in result.body.appliedChanges, false, field);
    assert.equal(field in result.body.changes[0].appliedChanges, false, field);
  }
}

test("a first Slack-free import does not claim blank serialized receipt defaults as applied changes", async () => {
  const after = {
    id: "10468",
    workOrderId: "10468",
    number: "10468",
    bluefolderServiceRequestId: "10468",
    subject: "New BlueFolder work order",
    slackChannel: "",
    slackThreadTs: "",
    slackPermalink: "",
    dispatchStatus: "",
    dispatchedAt: "",
    dispatchedBy: "",
    dispatchReceipt: null,
  };
  // This is the original bug: the generic diff treats null -> "" as a change.
  assert.ok("slackChannel" in buildResourceChange("work_order", "10468", null, after).appliedChanges);
  const { handler, calls } = loadImportRoute({ before: null, after, created: true });
  const result = await invoke(handler, {
    eventType: "work_order.imported",
    blueFolder: { serviceRequestId: "10468" },
    number: "10468",
    subject: after.subject,
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.created, true);
  assert.equal(result.body.idempotentReplay, false);
  assert.equal(result.body.before, null);
  assert.deepEqual(result.body.after, after);
  assert.deepEqual(result.body.appliedChanges.number, { before: null, after: "10468" });
  assertNoReceiptChanges(result);
  assert.equal(calls.slackLookups + calls.createdIngests + calls.coordinateWrites, 0);
});

test("an idempotent import replay retains the authoritative receipt and acknowledges no new changes", async () => {
  const after = {
    id: "10468",
    workOrderId: "10468",
    number: "10468",
    bluefolderServiceRequestId: "10468",
    slackChannel: "C07EPLKV9JT",
    slackThreadTs: "1782847034.191739",
    slackPermalink: "https://example.slack.com/archives/C07EPLKV9JT/p1782847034191739",
    dispatchReceipt: { slackChannel: "C07EPLKV9JT", slackThreadTs: "1782847034.191739" },
  };
  const { handler, calls } = loadImportRoute({ before: after, after, idempotentReplay: true });
  const result = await invoke(handler, {
    eventType: "work_order.imported",
    blueFolder: { serviceRequestId: "10468" },
    number: "10468",
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.created, false);
  assert.equal(result.body.idempotentReplay, true);
  assert.deepEqual(result.body.appliedChanges, {});
  assert.deepEqual(result.body.before, after);
  assert.deepEqual(result.body.after, after);
  assertNoReceiptChanges(result);
  assert.equal(calls.slackLookups + calls.createdIngests + calls.coordinateWrites, 0);
});

test("a receipt saved concurrently by Magmo remains visible but is not attributed to BlueFolder import", async () => {
  const before = {
    id: "10468",
    workOrderId: "10468",
    subject: "Original subject",
    slackChannel: "",
    slackThreadTs: "",
    slackPermalink: "",
    dispatchReceipt: null,
  };
  const after = {
    ...before,
    subject: "Imported updated subject",
    slackChannel: "C07EPLKV9JT",
    slackThreadTs: "1782847034.191739",
    slackPermalink: "https://example.slack.com/archives/C07EPLKV9JT/p1782847034191739",
    dispatchStatus: "posted",
    dispatchedBy: "Magmo Generate",
    dispatchedAt: "2026-09-16T12:00:00.000Z",
    dispatchReceipt: { slackChannel: "C07EPLKV9JT", slackThreadTs: "1782847034.191739" },
  };
  const { handler, calls } = loadImportRoute({ before, after });
  const result = await invoke(handler, {
    eventType: "work_order.imported",
    blueFolder: { serviceRequestId: "10468" },
    subject: after.subject,
  });
  assert.equal(result.status, 200);
  assert.deepEqual(result.body.before, before);
  assert.deepEqual(result.body.after, after);
  assert.deepEqual(result.body.appliedChanges, {
    subject: { before: before.subject, after: after.subject },
  });
  assertNoReceiptChanges(result);
  assert.equal(calls.slackLookups + calls.createdIngests + calls.coordinateWrites, 0);
  // Other event types must still report actual receipt changes normally.
  assert.ok("dispatchReceipt" in buildResourceChange("work_order", "10468", before, after).appliedChanges);
});
