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

function loadRoute({ authenticated = true } = {}) {
  const previousProxy = process.env.PRINT_LABEL_PROXY_URL;
  const previousLocal = process.env.PRINT_LABEL_LOCAL_URL;
  process.env.PRINT_LABEL_PROXY_URL = "https://printer.example/print-label";
  process.env.PRINT_LABEL_LOCAL_URL = "http://127.0.0.1:5000/print-label";
  try {
    return loadProjectModule("pages/api/print/storage-label.js", {
      "../../../utils/apiAuth": {
        requireFirebaseAuth: async (_request, response) => {
          if (authenticated) return { uid: "user-1" };
          response.status(401).json({ ok: false, error: "Unauthorized" });
          return null;
        },
      },
    }).default;
  } finally {
    if (previousProxy === undefined) delete process.env.PRINT_LABEL_PROXY_URL;
    else process.env.PRINT_LABEL_PROXY_URL = previousProxy;
    if (previousLocal === undefined) delete process.env.PRINT_LABEL_LOCAL_URL;
    else process.env.PRINT_LABEL_LOCAL_URL = previousLocal;
  }
}

async function invoke(handler, body = {}, method = "POST") {
  const { result, response } = responseRecorder();
  await handler({ method, body }, response);
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

test("storage label route requires POST and authentication", async (t) => {
  let fetchCalls = 0;
  installFetch(t, async () => {
    fetchCalls += 1;
    return jsonResponse(200, { ok: true });
  });

  const methodResult = await invoke(loadRoute(), { unitId: "B47" }, "GET");
  assert.equal(methodResult.status, 405);
  assert.equal(methodResult.headers.allow, "POST");

  const authResult = await invoke(loadRoute({ authenticated: false }), {
    unitId: "B47",
  });
  assert.equal(authResult.status, 401);
  assert.equal(fetchCalls, 0);
});

test("storage label route accepts only a unitId and rejects zero IDs", async (t) => {
  let fetchCalls = 0;
  installFetch(t, async () => {
    fetchCalls += 1;
    return jsonResponse(200, { ok: true });
  });
  const handler = loadRoute();

  for (const body of [
    null,
    {},
    { unitId: "B47", zpl: "^XA^JUS^XZ" },
    { id: "B47" },
    { unitId: "P0" },
    { unitId: "B0" },
    { unitId: "AIS17704" },
  ]) {
    const result = await invoke(handler, body);
    assert.equal(result.status, 400, JSON.stringify(body));
  }
  assert.equal(fetchCalls, 0);
});

test("storage label route derives the complete upstream payload server-side", async (t) => {
  const requests = [];
  installFetch(t, async (url, options) => {
    requests.push({ url, options });
    return jsonResponse(200, { ok: true, status: "printed" });
  });

  const result = await invoke(loadRoute(), { unitId: " b-0047 " });
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://printer.example/print-label");
  assert.equal(requests[0].options.method, "POST");
  assert.deepEqual(JSON.parse(requests[0].options.body), {
    template: "storage-unit-v1",
    label_type: "storage_unit",
    storage_unit_type: "bin",
    unit_id: "B47",
    display_number: "47",
    local_sn: "B47",
    qr_value: "B47",
    barcode_value: "B47",
    barcode_format: "CODE128",
  });
});

test("storage label route falls back locally only when the proxy path is missing", async (t) => {
  const urls = [];
  installFetch(t, async (url) => {
    urls.push(url);
    if (url === "https://printer.example/print-label") {
      return jsonResponse(404, { error: "not found" });
    }
    return jsonResponse(200, { ok: true, status: "printed locally" });
  });

  const result = await invoke(loadRoute(), { unitId: "P65" });
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.deepEqual(urls, [
    "https://printer.example/print-label",
    "http://127.0.0.1:5000/print-label",
  ]);
  assert.deepEqual(result.body.attempts, [
    { url: "https://printer.example/print-label", status: 404 },
    { url: "http://127.0.0.1:5000/print-label", status: 200 },
  ]);
});

test("storage label route reports when no configured bridge has the template", async (t) => {
  installFetch(t, async () => jsonResponse(404, { error: "not found" }));
  const result = await invoke(loadRoute(), { unitId: "B47" });
  assert.equal(result.status, 404);
  assert.equal(result.body.ok, false);
  assert.match(result.body.error, /template was not found/i);
});
