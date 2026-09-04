const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

function loadProjectModule(relativePath, mocks = {}) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs
    .readFileSync(filename, "utf8")
    .replace(/await import\((["'][^"']+["'])\)/g, "require($1)");
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
  const response = {
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
      this.writableEnded = true;
      return this;
    },
  };
  return { result, response };
}

const BIN_PAYLOAD = {
  template: "storage-unit-v2",
  label_type: "storage_unit",
  storage_unit_type: "bin",
  unit_id: "B47",
  display_number: "47",
  local_sn: "AIS-B00047",
  serial_id: "AIS-B00047",
  qr_value: "https://magmo.cloud/NewSearch/inventory/storage/B47",
  barcode_value: "AIS-B00047",
  barcode_format: "CODE128",
  items: [
    {
      item_id: "AIS17704",
      name: "Pellet",
      barcode_value: "SN-17704",
      ais_number: "AIS17704",
    },
  ],
  bins: [],
};

function withEnvironment(values, callback) {
  const previous = new Map();
  for (const [key, value] of Object.entries(values)) {
    previous.set(key, process.env[key]);
    if (value == null) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return callback();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function withEnvironmentAsync(values, callback) {
  const previous = new Map();
  for (const [key, value] of Object.entries(values)) {
    previous.set(key, process.env[key]);
    if (value == null) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return await callback();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function loadPrintRoute({
  authenticated = true,
  adminDb = { kind: "fake-db" },
  loadPayload = async () => BIN_PAYLOAD,
  token = "t".repeat(32),
} = {}) {
  const handler = withEnvironment(
    {
      PRINT_STORAGE_LABEL_PROXY_URL:
        "https://printer.example/print-storage-label",
      PRINT_STORAGE_LABEL_LOCAL_URL:
        "http://127.0.0.1:5000/print-storage-label",
      STORAGE_SCAN_BRIDGE_TOKEN: token,
      MAGMO_PUBLIC_ORIGIN: "https://magmo.cloud",
    },
    () =>
      loadProjectModule("pages/api/print/storage-label.js", {
        "../../../context/FirebaseAdmin": { adminDb },
        "../../../lib/inventory/storageUnitLabelData.cjs": {
          loadStorageUnitLabelPayload: loadPayload,
        },
        "../../../utils/apiAuth": {
          requireFirebaseAuth: async (_request, response) => {
            if (authenticated) return { uid: "user-1" };
            response.status(401).json({ ok: false, error: "Unauthorized" });
            return null;
          },
        },
      }).default
  );
  return (request, response) =>
    withEnvironmentAsync(
      {
        STORAGE_SCAN_BRIDGE_TOKEN: token,
        MAGMO_PUBLIC_ORIGIN: "https://magmo.cloud",
      },
      () => handler(request, response)
    );
}

function loadPreviewRoute({
  authenticated = true,
  adminDb = { kind: "fake-db" },
  loadPayload = async () => BIN_PAYLOAD,
  rendered,
} = {}) {
  const renderResult =
    rendered ||
    {
      payload: BIN_PAYLOAD,
      qrSvg: "<svg id=\"qr\"></svg>",
      barcodeSvg: "<svg id=\"unit-barcode\"></svg>",
      itemBarcodeSvgs: [
        { itemId: "AIS17704", svg: "<svg id=\"item-barcode\"></svg>" },
      ],
    };
  return loadProjectModule("pages/api/print/storage-label-preview.js", {
    "../../../context/FirebaseAdmin": { adminDb },
    "../../../lib/inventory/storageUnitLabel.cjs": {
      renderStorageUnitLabelSymbols: () => renderResult,
    },
    "../../../lib/inventory/storageUnitLabelData.cjs": {
      loadStorageUnitLabelPayload: loadPayload,
    },
    "../../../utils/apiAuth": {
      requireFirebaseAuth: async (_request, response) => {
        if (authenticated) return { uid: "user-1" };
        response.status(401).json({ ok: false, error: "Unauthorized" });
        return null;
      },
    },
  }).default;
}

async function invoke(handler, { body = {}, method = "POST", query = {} } = {}) {
  const { result, response } = responseRecorder();
  await handler({ method, body, query }, response);
  return result;
}

function jsonResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => (body == null ? "" : JSON.stringify(body)),
  };
}

function installFetch(t, implementation) {
  const originalFetch = global.fetch;
  global.fetch = implementation;
  t.after(() => {
    global.fetch = originalFetch;
  });
}

test("storage print route requires POST and authentication", async (t) => {
  let fetchCalls = 0;
  installFetch(t, async () => {
    fetchCalls += 1;
    return jsonResponse(200, { ok: true });
  });

  const methodResult = await invoke(loadPrintRoute(), {
    body: { unitId: "B47" },
    method: "GET",
  });
  assert.equal(methodResult.status, 405);
  assert.equal(methodResult.headers.allow, "POST");

  const authResult = await invoke(loadPrintRoute({ authenticated: false }), {
    body: { unitId: "B47" },
  });
  assert.equal(authResult.status, 401);
  assert.equal(fetchCalls, 0);
});

test("storage print route accepts only one valid unitId", async (t) => {
  let fetchCalls = 0;
  installFetch(t, async () => {
    fetchCalls += 1;
    return jsonResponse(200, { ok: true });
  });
  const handler = loadPrintRoute();

  for (const body of [
    null,
    {},
    { unitId: "B47", zpl: "^XA^JUS^XZ" },
    { id: "B47" },
    { unitId: "P0" },
    { unitId: "B0" },
    { unitId: "AIS17704" },
  ]) {
    const result = await invoke(handler, { body });
    assert.equal(result.status, 400, JSON.stringify(body));
  }
  assert.equal(fetchCalls, 0);
});

test("storage print route requires its bridge credential and database", async (t) => {
  installFetch(t, async () => jsonResponse(200, { ok: true }));

  const missingToken = await invoke(loadPrintRoute({ token: null }), {
    body: { unitId: "B47" },
  });
  assert.equal(missingToken.status, 503);
  assert.equal(missingToken.body.code, "printer_auth_missing");

  const missingDatabase = await invoke(loadPrintRoute({ adminDb: null }), {
    body: { unitId: "B47" },
  });
  assert.equal(missingDatabase.status, 503);
  assert.equal(missingDatabase.body.code, "database_unavailable");
});

test("storage print route derives contents server-side and authenticates the dedicated endpoint", async (t) => {
  const db = { kind: "inventory-db" };
  const loadCalls = [];
  const requests = [];
  installFetch(t, async (url, options) => {
    requests.push({ url, options });
    return jsonResponse(200, { ok: true, status: "printed" });
  });

  const result = await invoke(
    loadPrintRoute({
      adminDb: db,
      loadPayload: async (options) => {
        loadCalls.push(options);
        return BIN_PAYLOAD;
      },
    }),
    { body: { unitId: " AIS-B00047 " } }
  );

  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.deepEqual(loadCalls, [
    { db, unitId: "B47", publicOrigin: "https://magmo.cloud" },
  ]);
  assert.equal(requests.length, 1);
  assert.equal(
    requests[0].url,
    "https://printer.example/print-storage-label"
  );
  assert.equal(requests[0].options.method, "POST");
  assert.equal(requests[0].options.headers.Authorization, `Bearer ${"t".repeat(32)}`);
  assert.deepEqual(JSON.parse(requests[0].options.body), BIN_PAYLOAD);
});

test("storage print route falls back locally only when the remote route is missing", async (t) => {
  const urls = [];
  installFetch(t, async (url) => {
    urls.push(url);
    if (url === "https://printer.example/print-storage-label") {
      return jsonResponse(404, { error: "not found" });
    }
    return jsonResponse(200, { ok: true, status: "printed locally" });
  });

  const result = await invoke(loadPrintRoute(), { body: { unitId: "P65" } });
  assert.equal(result.status, 200);
  assert.deepEqual(urls, [
    "https://printer.example/print-storage-label",
    "http://127.0.0.1:5000/print-storage-label",
  ]);
  assert.deepEqual(result.body.attempts, [
    { url: "https://printer.example/print-storage-label", status: 404 },
    { url: "http://127.0.0.1:5000/print-storage-label", status: 200 },
  ]);
});

test("storage print route preserves payload errors and reports missing upstream routes", async (t) => {
  installFetch(t, async () => jsonResponse(404, { error: "not found" }));

  const missingUnit = await invoke(
    loadPrintRoute({
      loadPayload: async () => {
        const error = new Error("B47 does not have a storage-unit record.");
        error.code = "storage_unit_not_found";
        error.statusCode = 404;
        throw error;
      },
    }),
    { body: { unitId: "B47" } }
  );
  assert.equal(missingUnit.status, 404);
  assert.equal(missingUnit.body.code, "storage_unit_not_found");

  const noRoute = await invoke(loadPrintRoute(), { body: { unitId: "B47" } });
  assert.equal(noRoute.status, 404);
  assert.equal(noRoute.body.ok, false);
  assert.match(noRoute.body.error, /template was not found/i);
});

test("storage preview route returns server-derived bin contents and rendered symbols", async () => {
  const db = { kind: "inventory-db" };
  const loadCalls = [];
  const result = await invoke(
    loadPreviewRoute({
      adminDb: db,
      loadPayload: async (options) => {
        loadCalls.push(options);
        return BIN_PAYLOAD;
      },
    }),
    { method: "GET", query: { unitId: "B47" } }
  );

  assert.equal(result.status, 200);
  assert.equal(result.headers["cache-control"], "private, no-store");
  assert.deepEqual(loadCalls, [
    { db, unitId: "B47", publicOrigin: "https://magmo.cloud" },
  ]);
  assert.equal(result.body.unitId, "B47");
  assert.equal(result.body.serialId, "AIS-B00047");
  assert.equal(result.body.qrSvg, "<svg id=\"qr\"></svg>");
  assert.equal(result.body.barcodeSvg, "<svg id=\"unit-barcode\"></svg>");
  assert.equal(result.body.items[0].barcodeSvg, "<svg id=\"item-barcode\"></svg>");
  assert.deepEqual(result.body.bins, []);
});

test("storage preview route requires GET, authentication, and a database", async () => {
  const methodResult = await invoke(loadPreviewRoute(), {
    method: "POST",
    query: { unitId: "B47" },
  });
  assert.equal(methodResult.status, 405);
  assert.equal(methodResult.headers.allow, "GET");

  const authResult = await invoke(loadPreviewRoute({ authenticated: false }), {
    method: "GET",
    query: { unitId: "B47" },
  });
  assert.equal(authResult.status, 401);

  const databaseResult = await invoke(loadPreviewRoute({ adminDb: null }), {
    method: "GET",
    query: { unitId: "B47" },
  });
  assert.equal(databaseResult.status, 503);
});
