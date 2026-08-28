const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
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
    if (Object.prototype.hasOwnProperty.call(mocks, request)) {
      return mocks[request];
    }
    return require(
      request.startsWith(".")
        ? path.resolve(path.dirname(filename), request)
        : request
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
        return this;
      },
    },
  };
}

function loadDeleteImageRoute({
  authUser = {
    uid: "user-1",
    email: "user@advancedimagingparts.com",
    email_verified: true,
  },
  accessAllowed = true,
  unitExists = true,
} = {}) {
  const calls = {
    collectionNames: [],
    unitIds: [],
    storagePaths: [],
    deleteOptions: [],
    deletes: 0,
  };
  const adminDb = {
    collection(collectionName) {
      calls.collectionNames.push(collectionName);
      return {
        doc(unitId) {
          calls.unitIds.push(unitId);
          return { get: async () => ({ exists: unitExists }) };
        },
      };
    },
  };
  const adminBucket = {
    file(storagePath) {
      calls.storagePaths.push(storagePath);
      return {
        delete: async (options) => {
          calls.deleteOptions.push(options);
          calls.deletes += 1;
        },
      };
    },
  };
  const route = loadProjectModule("pages/api/storage-units/delete-image.js", {
    "../../../context/FirebaseAdmin": { adminDb, adminBucket },
    "../../../utils/apiAuth": {
      requireFirebaseAuth: async () => authUser,
    },
    "../../../utils/authAccess": {
      canAccessMagmo: () => accessAllowed,
    },
  });
  return { handler: route.default, calls };
}

test("authenticated users delete only the exact canonical storage-unit image", async () => {
  const { handler, calls } = loadDeleteImageRoute();
  const { result, response } = responseRecorder();
  await handler(
    {
      method: "DELETE",
      body: { unitId: " b-0047 ", storageName: "171234-photo.jpg" },
    },
    response
  );
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, {
    ok: true,
    unitId: "B47",
    storageName: "171234-photo.jpg",
  });
  assert.deepEqual(calls.collectionNames, ["StorageUnits"]);
  assert.deepEqual(calls.unitIds, ["B47"]);
  assert.deepEqual(calls.storagePaths, ["StorageUnits/B47/171234-photo.jpg"]);
  assert.deepEqual(calls.deleteOptions, [{ ignoreNotFound: true }]);
  assert.equal(calls.deletes, 1);
});

test("storage-unit image deletion rejects traversal before database access", async () => {
  const { handler, calls } = loadDeleteImageRoute();
  const { result, response } = responseRecorder();
  await handler(
    {
      method: "DELETE",
      body: { unitId: "B47", storageName: "../P65/photo.jpg" },
    },
    response
  );
  assert.equal(result.status, 400);
  assert.deepEqual(calls.collectionNames, []);
  assert.deepEqual(calls.storagePaths, []);
  assert.equal(calls.deletes, 0);
});

test("storage-unit image deletion rejects zero and non-storage IDs", async () => {
  for (const unitId of ["P0", "AIS47", "../B47", "B47/other"]) {
    const { handler, calls } = loadDeleteImageRoute();
    const { result, response } = responseRecorder();
    await handler(
      {
        method: "DELETE",
        body: { unitId, storageName: "photo.jpg" },
      },
      response
    );
    assert.equal(result.status, 400);
    assert.deepEqual(calls.collectionNames, []);
    assert.equal(calls.deletes, 0);
  }
});

test("storage-unit image deletion rejects unapproved users before storage access", async () => {
  const { handler, calls } = loadDeleteImageRoute({ accessAllowed: false });
  const { result, response } = responseRecorder();
  await handler(
    {
      method: "DELETE",
      body: { unitId: "B47", storageName: "photo.jpg" },
    },
    response
  );
  assert.equal(result.status, 403);
  assert.deepEqual(calls.collectionNames, []);
  assert.equal(calls.deletes, 0);
});

test("storage-unit image deletion leaves storage untouched when the unit is missing", async () => {
  const { handler, calls } = loadDeleteImageRoute({ unitExists: false });
  const { result, response } = responseRecorder();
  await handler(
    {
      method: "DELETE",
      body: { unitId: "P65", storageName: "photo.jpg" },
    },
    response
  );
  assert.equal(result.status, 404);
  assert.deepEqual(calls.storagePaths, []);
  assert.equal(calls.deletes, 0);
});

test("storage-unit image deletion advertises DELETE for other methods", async () => {
  const { handler, calls } = loadDeleteImageRoute();
  const { result, response } = responseRecorder();
  await handler({ method: "POST", body: {} }, response);
  assert.equal(result.status, 405);
  assert.equal(result.headers.allow, "DELETE");
  assert.deepEqual(calls.collectionNames, []);
});
