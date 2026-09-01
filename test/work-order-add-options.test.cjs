const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

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

const optionsLib = loadProjectModule("lib/inventory/workOrderAddOptions.js");

function workOrderDocument(id, data) {
  return { id, data: () => ({ ...data }) };
}

function responseRecorder() {
  const result = { status: null, body: null, headers: {} };
  const response = {
    headersSent: false,
    writableEnded: false,
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
      this.writableEnded = true;
      return this;
    },
  };
  return { result, response };
}

async function invoke(handler, request) {
  const { result, response } = responseRecorder();
  await handler(request, response);
  return result;
}

test("work-order options expose only minimal display and destination fields", () => {
  const serialized = optionsLib.serializeWorkOrderAddOption(
    workOrderDocument("10428", {
      workOrderId: "10428",
      number: "10428",
      subject: "MRI gantry correction",
      workflowStatus: "On Hold",
      clientId: "AIS500",
      clientName: "SimonMed Northwest",
      clientLocation: "8530 W Sunset Rd",
      machineId: "AIS-M1",
      machineName: "GE MRI",
      trailerId: "AIS40",
      trailerName: "Trailer 40",
      updatedAt: { seconds: 1_787_800_000 },
      slackChannel: "C07SECRET",
      slackThreadTs: "178.123",
      slackPermalink: "https://slack.example/secret",
      bluefolderUrl: "https://bluefolder.example/secret",
      assignees: [{ id: "U123", name: "Engineer" }],
    })
  );

  assert.deepEqual(Object.keys(serialized), [
    "id",
    "workOrderId",
    "number",
    "subject",
    "workflowStatus",
    "clientId",
    "clientName",
    "clientLocation",
    "machineId",
    "machineName",
    "trailerId",
    "trailerName",
    "destinationType",
    "destinationLinked",
    "updatedAt",
  ]);
  assert.equal(serialized.workflowStatus, "on_hold");
  assert.equal(serialized.destinationType, "trailer");
  assert.equal(serialized.destinationLinked, true);
  assert.equal("slackChannel" in serialized, false);
  assert.equal("bluefolderUrl" in serialized, false);
  assert.equal("assignees" in serialized, false);
});

test("destination type follows linked trailer, machine, site, then unlinked", () => {
  const option = (id, data) =>
    optionsLib.serializeWorkOrderAddOption(workOrderDocument(id, data));
  assert.equal(
    option("1", { clientId: "C1", machineId: "M1", trailerId: "T1" })
      .destinationType,
    "trailer"
  );
  assert.equal(
    option("2", { clientId: "C1", machineId: "M1" }).destinationType,
    "machine"
  );
  assert.equal(option("3", { clientId: "C1" }).destinationType, "site");
  assert.equal(option("4", { machineId: "M1" }).destinationType, "unlinked");
});

test("search prioritizes exact and prefix work-order numbers before text matches", () => {
  const options = [
    {
      id: "1042",
      workOrderId: "1042",
      number: "1042",
      subject: "Different issue",
      clientName: "",
      updatedAt: "2026-08-01T00:00:00.000Z",
    },
    {
      id: "10428",
      workOrderId: "10428",
      number: "10428",
      subject: "Older exact result",
      clientName: "",
      updatedAt: "2026-07-01T00:00:00.000Z",
    },
    {
      id: "90000",
      workOrderId: "90000",
      number: "90000",
      subject: "Follow up for work order 10428",
      clientName: "",
      updatedAt: "2026-08-28T00:00:00.000Z",
    },
  ];

  const exact = optionsLib.searchWorkOrderAddOptions(options, "WO #10428", 10);
  assert.equal(exact[0].id, "10428");
  const prefix = optionsLib.searchWorkOrderAddOptions(options, "104", 10);
  assert.deepEqual(
    prefix.slice(0, 2).map((entry) => entry.id),
    ["1042", "10428"]
  );
});

test("search matches work-order subject and destination labels", () => {
  const options = [
    {
      id: "10430",
      workOrderId: "10430",
      number: "10430",
      subject: "Gradient cooling alarm",
      clientName: "SimonMed Northwest",
      machineName: "GE MRI",
      trailerName: "Trailer 40",
      updatedAt: "",
    },
    {
      id: "10431",
      workOrderId: "10431",
      number: "10431",
      subject: "Table motion error",
      clientName: "Prohealth DTLA",
      machineName: "3T MR2",
      trailerName: "",
      updatedAt: "",
    },
  ];
  assert.equal(
    optionsLib.searchWorkOrderAddOptions(options, "gradient", 10)[0].id,
    "10430"
  );
  assert.equal(
    optionsLib.searchWorkOrderAddOptions(options, "northwest", 10)[0].id,
    "10430"
  );
  assert.equal(
    optionsLib.searchWorkOrderAddOptions(options, "3t", 10)[0].id,
    "10431"
  );
});

test("direct Firestore listing excludes deleted records and reports a safe cap", async () => {
  const calls = [];
  const documents = [
    workOrderDocument("10428", {
      number: "10428",
      subject: "Visible",
      clientId: "C1",
    }),
    workOrderDocument("10427", {
      number: "10427",
      subject: "Deleted",
      deletedAt: { seconds: 1 },
    }),
    workOrderDocument("10426", { number: "10426", subject: "Cap sentinel" }),
  ];
  const db = {
    collection(name) {
      calls.push(["collection", name]);
      return {
        async get() {
          calls.push(["get"]);
          return { docs: documents };
        },
      };
    },
  };

  const result = await optionsLib.listWorkOrderAddOptions({
    db,
    maxRecords: 2,
  });
  assert.deepEqual(calls, [
    ["collection", "OpsWorkOrders"],
    ["get"],
  ]);
  assert.equal(result.truncated, true);
  assert.equal(result.availableCount, 1);
  assert.deepEqual(result.options.map((entry) => entry.id), ["10428"]);
});

test("an unfiltered listing honors its response limit without changing available count", async () => {
  const documents = [
    workOrderDocument("10428", { number: "10428", updatedAt: "2026-08-28" }),
    workOrderDocument("10427", { number: "10427", updatedAt: "2026-08-27" }),
  ];
  const db = {
    collection() {
      return {
        get: async () => ({ docs: documents }),
      };
    },
  };
  const result = await optionsLib.listWorkOrderAddOptions({
    db,
    resultLimit: 1,
  });
  assert.equal(result.availableCount, 2);
  assert.deepEqual(result.options.map((entry) => entry.id), ["10428"]);
});

test("duplicate business work orders prefer a linked destination and then the newest record", async () => {
  const documents = [
    workOrderDocument("recovered-old", {
      number: "WO #10456",
      subject: "Older linked copy",
      clientId: "C-OLD",
      updatedAt: "2026-08-20T00:00:00.000Z",
    }),
    workOrderDocument("recovered-unlinked", {
      number: "10456",
      subject: "Newer but unlinked copy",
      updatedAt: "2026-09-01T12:00:00.000Z",
    }),
    workOrderDocument("canonical-new", {
      number: "#10456",
      subject: "Newest linked copy",
      clientId: "C-NEW",
      updatedAt: "2026-08-31T12:00:00.000Z",
    }),
  ];
  const db = {
    collection() {
      return { get: async () => ({ docs: documents }) };
    },
  };

  const result = await optionsLib.listWorkOrderAddOptions({ db });
  assert.equal(result.availableCount, 1);
  assert.equal(result.count, 1);
  assert.equal(result.options[0].id, "canonical-new");
  assert.equal(result.options[0].clientId, "C-NEW");
});

function loadOptionsRoute({
  adminDb = { kind: "ops-db" },
  authUser = { uid: "user-1" },
  result = {
    options: [{ id: "10428" }],
    count: 1,
    availableCount: 1,
    truncated: false,
    maxRecords: 1000,
  },
} = {}) {
  const calls = [];
  const route = loadProjectModule("pages/api/items/work-order-add/options.js", {
    "../../../../context/FirebaseAdmin": { adminDb },
    "../../../../lib/inventory/workOrderAddOptions": {
      MAX_WORK_ORDER_ADD_SEARCH_RESULTS: 50,
      listWorkOrderAddOptions: async (options) => {
        calls.push(options);
        return result;
      },
    },
    "../../../../lib/inventory/storageUnitScanApi": {
      requireStorageScanUser: async () => authUser,
      setStorageScanResponseHeaders: (response) => {
        response.setHeader("Cache-Control", "private, no-store, max-age=0");
      },
    },
  });
  return { handler: route.default, calls };
}

test("options route is GET-only, no-store, authenticated, and delegates a clean query", async () => {
  const { handler, calls } = loadOptionsRoute();
  const method = await invoke(handler, { method: "POST", query: {} });
  assert.equal(method.status, 405);
  assert.equal(method.headers.allow, "GET");
  assert.equal(calls.length, 0);

  const response = await invoke(handler, {
    method: "GET",
    query: { q: "  WO   #10428  ", limit: "500" },
  });
  assert.equal(response.status, 200);
  assert.match(response.headers["cache-control"], /no-store/);
  assert.equal(response.body.ok, true);
  assert.equal(response.body.query, "WO #10428");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].db.kind, "ops-db");
  assert.equal(calls[0].query, "WO #10428");
  assert.equal(calls[0].resultLimit, 50);
});

test("options route rejects invalid limits and unavailable auth or database", async () => {
  const invalidRoute = loadOptionsRoute();
  const invalid = await invoke(invalidRoute.handler, {
    method: "GET",
    query: { limit: "all" },
  });
  assert.equal(invalid.status, 400);
  assert.equal(invalid.body.code, "invalid_limit");
  assert.equal(invalidRoute.calls.length, 0);

  const authRoute = loadOptionsRoute({ authUser: null });
  const auth = await invoke(authRoute.handler, { method: "GET", query: {} });
  assert.equal(auth.status, null);
  assert.equal(authRoute.calls.length, 0);

  const dbRoute = loadOptionsRoute({ adminDb: null });
  const unavailable = await invoke(dbRoute.handler, {
    method: "GET",
    query: {},
  });
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.body.code, "work_order_options_unavailable");
  assert.equal(dbRoute.calls.length, 0);
});

test("options route has no Ops lifecycle or Slack dependency", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "pages/api/items/work-order-add/options.js"),
    "utf8"
  );
  assert.doesNotMatch(source, /listOpsWorkOrders|moveOpsWorkOrder|SlackClient|slack\/|readOpsThread/);
  assert.match(source, /listWorkOrderAddOptions/);
  assert.match(source, /requireStorageScanUser/);
});
