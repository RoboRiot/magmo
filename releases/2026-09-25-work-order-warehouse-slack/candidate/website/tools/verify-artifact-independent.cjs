"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const base = path.join(__dirname, "work-order-warehouse-slack-20260925/deployment");
const original = path.join(base, "source");
const candidate = path.join(base, "scoped-source");
const report = JSON.parse(fs.readFileSync(path.join(base, "composition-report.json"), "utf8"));
const slash = value => value.replace(/\\/g, "/");
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
function files(folder, top = folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(folder, entry.name);
    assert(!entry.isSymbolicLink(), "Unexpected symlink in artifact");
    return entry.isDirectory() ? files(absolute, top) : [slash(path.relative(top, absolute))];
  });
}
const bytes = (folder, relative) => fs.readFileSync(path.join(folder, relative));
const originals = files(original).sort();
const candidates = files(candidate).sort();
const beforeSet = new Set(originals), afterSet = new Set(candidates);
assert(originals.every(file => afterSet.has(file)), "Existing file was removed");
const added = candidates.filter(file => !beforeSet.has(file)).sort();
const modified = originals.filter(file => sha(bytes(original, file)) !== sha(bytes(candidate, file))).sort();
assert.deepEqual(added, [...report.added].sort(), "Unreported added file");
assert.deepEqual(modified, [...report.modified].sort(), "Unreported modified file");
const oldStatic = originals.filter(file => file.startsWith(".next/static/"));
for (const file of oldStatic) assert.equal(sha(bytes(candidate, file)), sha(bytes(original, file)), `Immutable old asset changed: ${file}`);
const implementation = new Set([
  ".next/server/chunks/4354.js",
  ".next/server/pages/api/items/work-order-add/options.js",
  ".next/server/pages/api/items/work-order-add/options.js.nft.json",
  ".next/server/pages/api/slack/add-to-list.js",
  ".next/server/pages/api/slack/add-to-list.js.nft.json",
  ".next/server/pages-manifest.json",
]);
const replacementPairs = [
  [path.posix.basename(report.activePage), path.posix.basename(report.newPage)],
  [path.posix.basename(report.activeCss), path.posix.basename(report.newCss)],
  [report.activeBuildId, report.newBuildId],
];
let metadataOnlyFiles = 0;
for (const file of modified) {
  if (implementation.has(file)) continue;
  assert(report.metadataChanges.includes(file), `Unallowlisted modification: ${file}`);
  let reversed = bytes(candidate, file).toString("utf8");
  for (const [before, after] of [...replacementPairs].reverse()) reversed = reversed.split(after).join(before);
  assert.equal(reversed, bytes(original, file).toString("utf8"), `Non-reference mutation: ${file}`);
  metadataOnlyFiles++;
}
const beforePages = JSON.parse(bytes(original, ".next/server/pages-manifest.json"));
const afterPages = JSON.parse(bytes(candidate, ".next/server/pages-manifest.json"));
assert.equal(afterPages["/api/items/work-order-add/slack"], "pages/api/items/work-order-add/slack.js");
delete afterPages["/api/items/work-order-add/slack"];
assert.deepEqual(afterPages, beforePages, "Unrelated page route changed");
assert.equal(bytes(candidate, ".next/BUILD_ID").toString().trim(), report.newBuildId);
const pageSHA256 = sha(bytes(candidate, `.next/${report.newPage}`));
const cssSHA256 = sha(bytes(candidate, `.next/${report.newCss}`));
assert(report.newPage.includes(pageSHA256.slice(0, 16)), "Page URL is not content addressed");
assert(report.newCss.includes(cssSHA256.slice(0, 16)), "CSS URL is not content addressed");
const verified = { checkedAt: new Date().toISOString(), result: "PASS", readOnly: true,
  baselineRevision: report.baselineRevision, buildId: report.newBuildId,
  baselineFiles: originals.length, candidateFiles: candidates.length,
  addedFiles: added.length, modifiedFiles: modified.length, metadataOnlyFiles,
  immutableOldAssetsPreserved: oldStatic.length, deletedFiles: 0,
  unrelatedRoutesPreserved: true, pageSHA256, cssSHA256,
  compositionReportSHA256: sha(fs.readFileSync(path.join(base, "composition-report.json"))),
  databaseWrites: 0, slackPosts: 0 };
fs.writeFileSync(path.join(__dirname, "warehouse-slack-artifact-independent-verification-20260925.json"), JSON.stringify(verified, null, 2) + "\n");
console.log(JSON.stringify(verified, null, 2));
