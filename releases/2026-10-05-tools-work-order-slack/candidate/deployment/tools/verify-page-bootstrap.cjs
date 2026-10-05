"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const candidate = path.resolve(process.argv[2] || path.join(__dirname, "scoped-source"));
const readJson = file => JSON.parse(fs.readFileSync(file, "utf8"));
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const reports = ["modal-overlay-report.json", "tool-page-overlay-report.json"].map(name => readJson(path.join(__dirname, name)));
const manifest = readJson(path.join(candidate, ".next/build-manifest.json"));
const cases = [];
for (const report of reports) {
  const htmlPath = path.join(candidate, ".next/server/pages", report.route + ".html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g)].map(match => decodeURIComponent(match[1].split(/[?#]/)[0]));
  const current = "/_next/" + report.newPage, prior = "/_next/" + report.oldPage;
  const routeDirectory = current.slice(0, current.lastIndexOf("/") + 1);
  const pages = scripts.filter(file => file.startsWith(routeDirectory));
  assert(scripts.includes(current), `HTML bootstrap still misses current page: ${report.route}: ${JSON.stringify(pages)}`);
  assert(!scripts.includes(prior), `HTML bootstrap retains old page: ${report.route}`);
  assert(manifest.pages[report.route].includes(report.newPage));
  assert(!manifest.pages[report.route].includes(report.oldPage));
  const filename = path.join(candidate, ".next", report.newPage);
  assert.equal(sha(fs.readFileSync(filename)), report.pageSHA256 || report.newPageSHA256);
  cases.push({ route: report.route, htmlSHA256: sha(html), pageAsset: report.newPage, pageSHA256: sha(fs.readFileSync(filename)), decodedBootstrapReferenceMatchesManifest: true });
}
const result = { result: "PASS", checkedAt: new Date().toISOString(), candidateDirectory: path.relative(__dirname, candidate).replaceAll("\\", "/"), cases, productionRequests: 0, productionWrites: 0 };
if (process.argv.includes("--receipt")) fs.writeFileSync(path.join(__dirname, "page-bootstrap-verification.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
