"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const { createRequire } = require("node:module");
const projectRoot = path.resolve(__dirname, "..");

function packageVersion(entry, name) {
  let dir = path.dirname(entry);
  while (dir !== path.dirname(dir)) {
    const file = path.join(dir, "package.json");
    if (fs.existsSync(file)) {
      const json = JSON.parse(fs.readFileSync(file, "utf8"));
      if (json.name === name) return json.version;
    }
    dir = path.dirname(dir);
  }
  throw new Error(`Could not resolve package version: ${name}`);
}

async function probe(packageRoot) {
  // No real authentication material is supplied. The actual installed SDK
  // must refresh its Compute token from our loopback metadata server.
  const http = require("node:http");
  const https = require("node:https");
  const calls = [];
  let forbiddenNetworkAttempts = 0;
  const token = "SYNTHETIC_NOT_A_REAL_CREDENTIAL";
  const originals = new Map();
  for (const transport of [http, https]) {
    for (const method of ["request", "get"]) {
      const original = transport[method];
      originals.set(`${transport === http ? "http" : "https"}.${method}`, original);
      transport[method] = function (...args) {
        const first = args[0];
        const host = typeof first === "string" || first instanceof URL
          ? new URL(first).hostname : first?.hostname || first?.host || "";
        if (!/^127\.0\.0\.1(?::\d+)?$/.test(host)) {
          forbiddenNetworkAttempts++;
          throw new Error("This credential-free test forbids all non-loopback network traffic.");
        }
        return original.apply(this, args);
      };
    }
  }
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, ...args) => {
    if (new URL(typeof input === "string" || input instanceof URL ? input : input.url).hostname !== "127.0.0.1") {
      forbiddenNetworkAttempts++;
      throw new Error("This credential-free test forbids all non-loopback fetch requests.");
    }
    return originalFetch(input, ...args);
  };
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    calls.push({ path: url.pathname, prefix: url.searchParams.get("prefix"), method: req.method });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Metadata-Flavor", "Google");
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: "Read-only test: unexpected write." }));
      return;
    }
    if (url.pathname === "/computeMetadata/v1/instance/service-accounts/default/token") {
      res.end(JSON.stringify({ access_token: token, expires_in: 3600, token_type: "Bearer" }));
    } else if (req.headers.authorization !== `Bearer ${token}`) {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: "Synthetic metadata credential was not forwarded." }));
    } else if (url.pathname === "/storage/v1/b/synthetic-bucket/o") {
      res.end(JSON.stringify({ items: ["a.jpg", "b.jpg"].map(name => ({ name: `Parts/AIS23629/${name}` })) }));
    } else if (/^\/storage\/v1\/b\/synthetic-bucket\/o\/Parts%2FAIS23629%2F[ab]\.jpg$/i.test(url.pathname)) {
      res.end(JSON.stringify({ name: decodeURIComponent(url.pathname.split("/").at(-1)), metadata: { firebaseStorageDownloadTokens: "synthetic-photo-token" } }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Unexpected local SDK request." }));
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    process.env.GCE_METADATA_HOST = `127.0.0.1:${server.address().port}`;
    process.env.METADATA_SERVER_DETECTION = "assume-present";
    process.env.GCLOUD_PROJECT = "synthetic";
    const packageRequire = createRequire(path.join(packageRoot, "package.json"));
    const storageEntry = packageRequire.resolve("@google-cloud/storage");
    const storageRequire = createRequire(storageEntry);
    const authEntry = storageRequire.resolve("google-auth-library");
    const authRequire = createRequire(authEntry);
    const metadataEntry = authRequire.resolve("gcp-metadata");
    const metadataRequire = createRequire(metadataEntry);
    const versions = {
      storage: packageVersion(storageEntry, "@google-cloud/storage"),
      auth: packageVersion(authEntry, "google-auth-library"),
      metadata: packageVersion(metadataEntry, "gcp-metadata"),
      metadataTransport: packageVersion(metadataRequire.resolve("gaxios"), "gaxios"),
    };
    const { Storage } = packageRequire("@google-cloud/storage");
    const storage = new Storage({ projectId: "synthetic",
      apiEndpoint: `http://127.0.0.1:${server.address().port}`, useAuthWithCustomEndpoint: true,
      retryOptions: { autoRetry: false } });
    const service = require("../lib/inventory/workOrderAddSlack.cjs");
    const item = { name: "Synthetic tube", pn: ["PN"], sn: ["SN"] };
    const urls = await service.loadItemPhotoUrls(storage.bucket("synthetic-bucket"), "AIS23629", item);
    assert.equal((await storage.authClient.getClient()).constructor.name, "Compute", "The real SDK must select its Compute ADC path, not injected OAuth credentials.");
    assert.equal(urls.length, 2);
    assert(urls.every(url => url.startsWith("https://firebasestorage.googleapis.com/v0/b/synthetic-bucket/o/Parts%2FAIS23629%2F")));
    const payload = service.buildSlackPayload({ item, itemId: "AIS23629", operation: { result: { workOrder: { number: "10673" } } }, listKey: "shipping", email: "synthetic@example.test", photoUrls: urls });
    assert.equal(payload.photoUrls.length, 2);
    assert.equal(payload.local_sn, "AIS23629");
    assert.equal(payload.work_order, "10673");
    assert.deepEqual(calls.map(call => call.method), ["GET", "GET", "GET", "GET"]);
    assert.equal(calls[0].path, "/computeMetadata/v1/instance/service-accounts/default/token");
    assert.equal(calls[1].prefix, "Parts/AIS23629/");
    assert.equal(forbiddenNetworkAttempts, 0);
    return { ok: true, versions, photoCount: urls.length, metadataRequests: 1, storageRequests: 3, forbiddenNetworkAttempts, realCredentialsUsed: false, productionWrites: 0 };
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    globalThis.fetch = originalFetch;
    for (const transport of [http, https]) for (const method of ["request", "get"])
      transport[method] = originals.get(`${transport === http ? "http" : "https"}.${method}`);
  }
}

if (process.argv[2] === "--probe") {
  probe(path.resolve(process.argv[3])).then(report => console.log(JSON.stringify(report))).catch(error => {
    // No arbitrary request/response objects or credentials are emitted.
    console.error(JSON.stringify({ ok: false, name: error.name, code: error.code || null, message: String(error.message).slice(0, 500) }));
    process.exitCode = 1;
  });
} else {
  const test = require("node:test");
  const roots = process.env.STORAGE_ADC_CANDIDATE_ROOT
    ? [["isolated candidate", path.resolve(process.env.STORAGE_ADC_CANDIDATE_ROOT)]]
    : [["application", projectRoot], ["Functions runtime", path.join(projectRoot, "functions")]];
  for (const [label, root] of roots) test(`${label}: actual Storage SDK Compute ADC prepares two item photos with no live credentials`, () => {
    const env = {};
    for (const key of ["SystemRoot", "WINDIR", "PATH", "PATHEXT", "TEMP", "TMP"]) if (process.env[key]) env[key] = process.env[key];
    const child = spawnSync(process.execPath, [__filename, "--probe", root], { env, encoding: "utf8", timeout: 15000, windowsHide: true });
    assert.equal(child.status, 0, `Storage authentication/preparation failed: ${child.stderr || child.error?.message || child.stdout}`);
    const result = JSON.parse(child.stdout.trim());
    assert.equal(result.ok, true);
    assert.equal(result.photoCount, 2);
    assert.equal(result.forbiddenNetworkAttempts, 0);
    assert.equal(result.realCredentialsUsed, false);
    assert.equal(result.productionWrites, 0);
  });
}
