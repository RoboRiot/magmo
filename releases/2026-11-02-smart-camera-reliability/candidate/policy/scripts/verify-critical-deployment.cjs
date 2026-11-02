"use strict";

// Evidence gate, not a replacement for actually exercising the signed-in UI.
// See docs/CRITICAL_DEPLOYMENT_POLICY.md before preparing a receipt.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ROUTES = ["/NewSearch/mainSearch", "/Ops", "/Ops-General"];
const ORIGINS = { production: "https://magmo.cloud", test: "https://magmo-test.web.app" };
const OMIT_DIRECTORIES = new Set(["cache", "dev", "diagnostics", "types"]);
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const ensure = (value, message) => { if (!value) throw new Error(message); };

// Next embeds BUILD_ID inside the data-route regexes as well as BUILD_ID itself.
// Renaming only the latter can leave full-page loads healthy while Link/router
// navigation requests /_next/data/<new-id>/...json and receives a 404.
function hasLiteralRegexPrefix(source, expected) {
  if (typeof source !== "string" || source[0] !== "^") return false;
  const special = new Set("\\^$.*+?()[]{}|".split(""));
  let position = 1;
  for (const character of expected) {
    let actual = source[position++];
    if (actual === "\\") {
      actual = source[position++];
      // Accept Next's literal escaping (including hyphens), never regex classes
      // or an unescaped wildcard that happens to match the current build ID.
      if (!special.has(actual) && actual !== "-" && actual !== "/") return false;
    } else if (special.has(actual)) return false;
    if (actual !== character) return false;
  }
  return true;
}

function validateDataRouteBuildId(buildRoot, suppliedBuildId) {
  const buildId = suppliedBuildId ?? fs.readFileSync(path.join(buildRoot, "BUILD_ID"), "utf8").trim();
  ensure(typeof buildId === "string" && buildId.length > 0 && !/[\\/\r\n]/.test(buildId), "BUILD_ID must be a nonempty path segment.");
  const manifestPath = path.join(buildRoot, "routes-manifest.json");
  ensure(fs.existsSync(manifestPath), "routes-manifest.json is required to verify BUILD_ID/data-route consistency.");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  ensure(Array.isArray(manifest.dataRoutes), "routes-manifest.json must contain a dataRoutes array.");
  for (const route of manifest.dataRoutes) {
    ensure(route && typeof route.page === "string" && route.page.startsWith("/"), "Each data route must identify its page.");
    for (const field of ["dataRouteRegex", ...(Object.hasOwn(route, "namedDataRouteRegex") ? ["namedDataRouteRegex"] : [])]) {
      const expression = route[field];
      ensure(hasLiteralRegexPrefix(expression, `/_next/data/${buildId}/`),
        `${route.page}: ${field} does not use the exact BUILD_ID ${buildId}; data navigation would be inconsistent.`);
      try { new RegExp(expression); }
      catch { throw new Error(`${route.page}: ${field} is not a valid data-route regular expression.`); }
    }
  }
  return { buildId, dataRouteCount: manifest.dataRoutes.length };
}

function fingerprint(buildRoot) {
  const root = path.resolve(buildRoot);
  const files = [];
  function visit(directory, relative = "") {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const name = relative ? `${relative}/${entry.name}` : entry.name;
      ensure(!entry.isSymbolicLink(), `Build symlinks are not allowed: ${name}`);
      if (entry.isDirectory()) {
        if (!relative && OMIT_DIRECTORIES.has(entry.name)) continue;
        visit(path.join(directory, entry.name), name);
      } else if (entry.isFile()) {
        files.push([name, sha256(fs.readFileSync(path.join(directory, entry.name)))]);
      }
    }
  }
  visit(root);
  files.sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0);
  const buildId = fs.readFileSync(path.join(root, "BUILD_ID"), "utf8").trim();
  ensure(buildId, "BUILD_ID must not be blank.");
  validateDataRouteBuildId(root, buildId);
  return { buildId, buildSha256: sha256(files.map(([name, hash]) => `${name}\0${hash}\n`).join("")), fileCount: files.length };
}

function validDigest(value) { return typeof value === "string" && /^[a-f0-9]{64}$/.test(value); }

function validateReceipt(receipt, options) {
  const { phase, environment, buildRoot, receiptDirectory, now = Date.now() } = options;
  ensure(["preflight", "postflight"].includes(phase), "Phase must be preflight or postflight.");
  ensure(Object.hasOwn(ORIGINS, environment), "Environment must be production or test.");
  ensure(receipt && receipt.schemaVersion === 1, "Critical UI receipt schemaVersion must be 1.");
  ensure(receipt.phase === phase && receipt.environment === environment, "Receipt phase/environment mismatch.");
  const build = fingerprint(buildRoot);
  ensure(receipt.buildId === build.buildId, "Receipt BUILD_ID does not match the exact candidate.");
  ensure(receipt.buildSha256 === build.buildSha256, "Receipt build digest does not match the exact candidate.");
  const verified = Date.parse(receipt.verifiedAt);
  const maximumAge = (phase === "preflight" ? 24 : 2) * 60 * 60 * 1000;
  ensure(Number.isFinite(verified) && verified <= now + 60000 && now - verified <= maximumAge,
    "Receipt is stale, future-dated, or has no valid verifiedAt timestamp.");
  ensure(typeof receipt.verifier === "string" && receipt.verifier.trim().length >= 3, "Identify the browser verifier.");
  const allowedModes = phase === "preflight"
    ? ["authenticated-browser", "full-page-authenticated-state-mocks"]
    : ["authenticated-browser"];
  ensure(allowedModes.includes(receipt.verificationMode), "Postflight requires a real authenticated browser; preflight mocks must be explicitly labeled.");
  const origin = new URL(receipt.origin);
  ensure(origin.origin === receipt.origin && ["http:", "https:"].includes(origin.protocol), "origin must be an HTTP(S) origin without a path.");
  if (phase === "postflight") ensure(receipt.origin === ORIGINS[environment], "Postflight must verify the actual deployed origin.");
  ensure(Array.isArray(receipt.pages) && receipt.pages.length === ROUTES.length, "All three critical full pages must be verified exactly once.");
  const buildManifest = JSON.parse(fs.readFileSync(path.join(buildRoot, "build-manifest.json"), "utf8"));
  const checked = new Set();
  for (const page of receipt.pages) {
    ensure(ROUTES.includes(page.path) && !checked.has(page.path), "Unknown or duplicate critical route.");
    checked.add(page.path);
    ensure(page.observedBuildId === build.buildId, `${page.path}: browser did not observe the candidate BUILD_ID.`);
    ensure(page.authenticated === true && page.dataLoaded === true && page.interactionPassed === true,
      `${page.path}: signed-in content, loaded data, and a read-only interaction are all required.`);
    ensure(page.fullPage === true, `${page.path}: an isolated component or HTTP response is not full-page verification.`);
    ensure(Array.isArray(page.pageErrors) && page.pageErrors.length === 0, `${page.path}: browser page errors block deployment.`);
    ensure(Array.isArray(page.consoleErrors) && page.consoleErrors.length === 0, `${page.path}: browser console errors must be investigated before release.`);
    ensure(typeof page.details === "string" && page.details.trim().length >= 20, `${page.path}: describe the data and read-only interaction actually observed.`);
    const observed = new URL(page.observedUrl);
    ensure(observed.origin === receipt.origin && observed.pathname.replace(/\/$/, "") === page.path,
      `${page.path}: observed URL is a different page or a login redirect.`);
    ensure(Array.isArray(page.evidence) && page.evidence.length > 0, `${page.path}: save screenshot or browser-log evidence.`);
    for (const evidence of page.evidence) {
      ensure(typeof evidence.path === "string" && validDigest(evidence.sha256), `${page.path}: evidence path/hash required.`);
      const evidencePath = path.resolve(receiptDirectory, evidence.path);
      ensure(fs.statSync(evidencePath).isFile() && sha256(fs.readFileSync(evidencePath)) === evidence.sha256,
        `${page.path}: saved evidence does not match its digest.`);
    }
    ensure(Array.isArray(page.assets) && page.assets.some(asset => /\.js$/.test(asset.path)), `${page.path}: record a loaded JavaScript asset and its SHA-256.`);
    const routeEntries = (buildManifest.pages?.[page.path] || []).filter(asset =>
      /^static\/chunks\/pages\/(?!_app(?:-|\.))/.test(asset) && asset.endsWith(".js"));
    ensure(routeEntries.length > 0 && routeEntries.every(entry => page.assets.some(asset => asset.path === `/_next/${entry}`)),
      `${page.path}: include the route's own compiled page JavaScript, not only common framework assets.`);
    for (const asset of page.assets) {
      ensure(typeof asset.path === "string" && /^\/_next\/static\/[A-Za-z0-9_./%[\]-]+$/.test(asset.path) && validDigest(asset.sha256), `${page.path}: invalid asset evidence.`);
      const relative = decodeURIComponent(asset.path.slice("/_next/".length));
      const assetFile = path.resolve(buildRoot, relative);
      const relativeFile = path.relative(path.resolve(buildRoot), assetFile);
      ensure(relativeFile && !relativeFile.startsWith("..") && !path.isAbsolute(relativeFile), "Asset must stay inside the candidate build.");
      ensure(sha256(fs.readFileSync(assetFile)) === asset.sha256, `${page.path}: asset is not from the verified candidate.`);
    }
  }
  return { ...build, phase, environment, verificationMode: receipt.verificationMode, routes: [...checked] };
}

async function verifyLiveIdentity(receipt, fetcher = fetch) {
  for (const page of receipt.pages) {
    const response = await fetcher(`${receipt.origin}${page.path}`, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(30000) });
    ensure(response.ok, `${page.path}: deployed page returned HTTP ${response.status}.`);
    const html = await response.text();
    const data = html.match(/<script\b[^>]*\bid=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
    ensure(data && JSON.parse(data[1]).buildId === receipt.buildId, `${page.path}: live build identity changed or cannot be established.`);
    for (const asset of page.assets) {
      const assetResponse = await fetcher(`${receipt.origin}${asset.path}`, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(30000) });
      ensure(assetResponse.ok && sha256(Buffer.from(await assetResponse.arrayBuffer())) === asset.sha256,
        `${page.path}: deployed asset does not match the verified candidate.`);
    }
  }
}

async function main(args) {
  const command = args.shift();
  const values = {};
  while (args.length) {
    const key = args.shift();
    ensure(key?.startsWith("--") && args.length, "Arguments must be --name value pairs.");
    values[key.slice(2)] = args.shift();
  }
  const buildRoot = values["build-root"] || path.resolve(__dirname, "../functions/.next");
  if (command === "fingerprint") {
    console.log(JSON.stringify(fingerprint(buildRoot), null, 2));
    return;
  }
  ensure(command === "verify", "Use fingerprint or verify. See docs/CRITICAL_DEPLOYMENT_POLICY.md.");
  const receiptPath = values.receipt || process.env.MAGMO_CRITICAL_PREFLIGHT_RECEIPT;
  ensure(receiptPath, "DEPLOYMENT BLOCKED: provide authenticated critical-UI evidence. See docs/CRITICAL_DEPLOYMENT_POLICY.md.");
  const phase = values.phase || "preflight";
  const environment = values.environment || process.env.MAGMO_DEPLOY_ENVIRONMENT;
  const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  const result = validateReceipt(receipt, { phase, environment, buildRoot, receiptDirectory: path.dirname(path.resolve(receiptPath)) });
  if (phase === "postflight") await verifyLiveIdentity(receipt);
  console.log(JSON.stringify({ criticalUiGate: "passed", ...result }, null, 2));
}

module.exports = { ROUTES, fingerprint, validateDataRouteBuildId, validateReceipt, verifyLiveIdentity, sha256 };
if (require.main === module) main(process.argv.slice(2)).catch(error => {
  console.error(`[AIS CRITICAL DEPLOYMENT GATE] ${error.message}`);
  process.exitCode = 1;
});
