"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");

const root = path.resolve(__dirname, "../..");
const source = path.join(__dirname, "source");
const outputName = process.argv[2] || "scoped-source";
assert(/^scoped-source(?:-v\d+)?$/.test(outputName));
const out = path.join(__dirname, outputName);
const chunk = ".next/server/chunks/8806.js";
const siteHelper = "machine-link/workOrderSiteLink.cjs";
const lookupHelper = "machine-link/blueFolderCustomerLookup.cjs";
const reviewed = Object.freeze({
  lookup: "lib/ops/blueFolderCustomerLookup.cjs",
  site: "lib/ops/workOrderSiteLink.cjs",
  workOrders: "lib/ops/workOrders.js",
});
const expectedSourceHashes = Object.freeze({
  [reviewed.lookup]: "3977545bf88b79db793f6f9fdf0fb56dda8a47db9ef2259ae2363737c3f401d3",
  [reviewed.site]: "b60431f15c74d038611f9a6903b9676cc1e4cd14262965203ec7814e25f1230f",
  [reviewed.workOrders]: "cbd172cdb05fb59dbdd583fd0c9a2649924595a1c0c18376652fda938304244a",
  "test/bluefolder-customer-lookup.test.cjs": "90dea8765eeea5ab16d8d6d92d2d2d3182b420e2766bf1373dc731325b834d4c",
  "test/work-order-nested-site-link.test.cjs": "593c8502220cf41a9eea35dadb7977e1f7fd0d570a9c74932c1e9dbcdf05c458",
  "test/work-order-machine-import.test.cjs": "0d7b30ee4808335982499cb2873736d7cf5603932e1c4f3a717f9b440d6c46d0",
});
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]);
const replaceOnce = (value, before, after, label) => {
  assert.equal(value.split(before).length, 2, `${label} anchor must occur exactly once`);
  return value.replace(before, after);
};

assert(!fs.existsSync(out), "Never overwrite a candidate");
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, "baseline.json"), "utf8"));
assert.equal(baseline.revision, "nextserverwest-00060-tod");
assert.equal(baseline.runtime, "nodejs22");
assert.equal(baseline.entryPoint, "nextServerWest");
assert.equal(baseline.region, "us-west2");
assert.equal(sha(fs.readFileSync(path.join(__dirname, "source.zip"))), baseline.archiveSHA256);
for (const [relative, expected] of Object.entries(expectedSourceHashes)) {
  assert.equal(sha(fs.readFileSync(path.join(root, relative))), expected, relative);
}

const code = fs.readFileSync(path.join(source, chunk), "utf8");
assert.equal(sha(code), "cf22d28f299e7dbcc0b2ac6c858afa2f6a06e934436a6ea42a27332d4cbb8b4a");
assert.equal(sha(fs.readFileSync(path.join(source, siteHelper))), "e62fda7488b4f7a5d60c67fd474f771e7b95b369863c2b5ff4f963ce12933f1f");
assert.equal(sha(fs.readFileSync(path.join(source, "machine-link/workOrderMachineLink.cjs"))), "f8664402bfecd7ebb828fb44729c748671c86aa6aa31a090154a731f26463382");
assert(!fs.existsSync(path.join(source, lookupHelper)));
assert.equal(JSON.parse(fs.readFileSync(path.join(source, "package.json"), "utf8")).dependencies.xml2js, "^0.6.2");

const oldStart = 'async function ao(a={}){let b=E(a?.blueFolder?.serviceRequestId||a.workOrderId);if(!b)throw Error("A valid BlueFolder service-request ID is required.");let c=af(b),d=new Date().toISOString(),f=B(),g=await f.runTransaction(async g=>{let h=await g.get(c),i=h.exists&&h.data()||{};if(i.deletedAt||(a.existingOnly===true&&!h.exists)){const error=new Error(i.deletedAt?"The work order was deleted; BlueFolder metadata cannot restore it.":"The work order no longer exists; metadata refresh cannot create it.");error.code=i.deletedAt?"work_order_deleted":"work_order_not_found";error.statusCode=i.deletedAt?409:404;throw error;}let j=h.exists?ag(h):null,k={...a,blueFolder:{...a.blueFolder&&"object"==typeof a.blueFolder&&!Array.isArray(a.blueFolder)?a.blueFolder:{},serviceRequestId:b}},l={};';
const newStart = 'async function ao(a={}){let b=E(a?.blueFolder?.serviceRequestId||a.workOrderId);if(!b)throw Error("A valid BlueFolder service-request ID is required.");let c=af(b),d=new Date().toISOString(),f=B(),freshImportPayload={...a,blueFolder:{...a.blueFolder&&"object"==typeof a.blueFolder&&!Array.isArray(a.blueFolder)?a.blueFolder:{},serviceRequestId:b}},freshCustomerProof=null,freshSiteLookupIssue="",freshSiteEligibility=await f.runTransaction(async transaction=>{let snapshot=await transaction.get(c),existing=snapshot.exists&&snapshot.data()||{};if(existing.deletedAt)return{eligible:!1,reason:"work_order_deleted"};if(a.existingOnly===true&&!snapshot.exists)return{eligible:!1,reason:"work_order_not_found"};bi(existing,freshImportPayload);return require(process.cwd()+"/machine-link/workOrderSiteLink.cjs").assessFreshSiteLookupInTransaction(transaction,f,existing,freshImportPayload)});if(freshSiteEligibility.eligible){let lookup;try{lookup=await require(process.cwd()+"/machine-link/blueFolderCustomerLookup.cjs").getVerifiedBlueFolderLocation(freshSiteEligibility.identity.customerId,freshSiteEligibility.identity.customerLocationId)}catch{lookup={ok:!1,reason:"bluefolder_customer_lookup_unavailable"}}lookup?.ok&&lookup.proof?freshCustomerProof=lookup.proof:freshSiteLookupIssue=C(lookup?.reason||"bluefolder_customer_lookup_unavailable",120)}let g=await f.runTransaction(async g=>{let h=await g.get(c),i=h.exists&&h.data()||{};if(i.deletedAt||(a.existingOnly===true&&!h.exists)){const error=new Error(i.deletedAt?"The work order was deleted; BlueFolder metadata cannot restore it.":"The work order no longer exists; metadata refresh cannot create it.");error.code=i.deletedAt?"work_order_deleted":"work_order_not_found";error.statusCode=i.deletedAt?409:404;throw error;}let j=h.exists?ag(h):null,k=freshImportPayload,l={};';

const oldGuard = 'l={};let siteCreation=null,clientLinkResolutionReason="",protectedExistingAsset=!1;if(!E(i.clientId)){const siteLink=await require(process.cwd()+"/machine-link/workOrderSiteLink.cjs").resolveWorkOrderSiteLinkInTransaction(g,f,k,{linkedAtIso:d});l=siteLink.patch;siteCreation=siteLink.creation;if(l.clientId){const assetSiteGuard=await require(process.cwd()+"/machine-link/workOrderMachineLink.cjs").validateExistingWorkOrderAssetSiteInTransaction(g,f,i,l,{clientData:siteCreation?.data});protectedExistingAsset=assetSiteGuard.hasExistingAsset;if(!assetSiteGuard.allowed){clientLinkResolutionReason=assetSiteGuard.reason;l={};siteCreation=null;}}}let m=bi(i,k)';
const newGuard = 'l={};let siteCreation=null,clientLinkResolutionReason="",protectedExistingAsset=!1;if(!E(i.clientId)){const siteLinkHelpers=require(process.cwd()+"/machine-link/workOrderSiteLink.cjs"),finalFreshPreconditions=freshCustomerProof?siteLinkHelpers.freshSiteLookupPreconditions(i,k):null,siteLink=await siteLinkHelpers.resolveWorkOrderSiteLinkInTransaction(g,f,k,{linkedAtIso:d,freshCustomerProof:finalFreshPreconditions?.eligible?freshCustomerProof:null});l=siteLink.patch;siteCreation=siteLink.creation;if(!l.clientId&&(freshCustomerProof||freshSiteLookupIssue)){clientLinkResolutionReason=("bluefolder_nested_site_not_verified"===siteLink.reason?freshSiteLookupIssue:"")||(!finalFreshPreconditions?.eligible&&finalFreshPreconditions?.reason)||siteLink.reason}if(l.clientId){const assetSiteGuard=await require(process.cwd()+"/machine-link/workOrderMachineLink.cjs").validateExistingWorkOrderAssetSiteInTransaction(g,f,i,l,{clientData:siteCreation?.data});protectedExistingAsset=assetSiteGuard.hasExistingAsset;if(!assetSiteGuard.allowed){clientLinkResolutionReason=assetSiteGuard.reason;l={};siteCreation=null;}}}let m=bi(i,k)';

let patched = replaceOnce(code, oldStart, newStart, "fresh-site preflight");
patched = replaceOnce(patched, oldGuard, newGuard, "fresh-site final transaction");
parser.parse(patched);
assert.equal(patched.replace(newStart, oldStart).replace(newGuard, oldGuard), code,
  "Only reviewed importer substitutions may differ");

fs.cpSync(source, out, { recursive: true, force: false, errorOnExist: true });
fs.copyFileSync(path.join(root, reviewed.lookup), path.join(out, lookupHelper));
fs.copyFileSync(path.join(root, reviewed.site), path.join(out, siteHelper));
fs.writeFileSync(path.join(out, chunk), patched);

const changed = new Set([lookupHelper, siteHelper, chunk]);
for (const file of walk(source)) {
  const relative = path.relative(source, file).replaceAll("\\", "/");
  if (!changed.has(relative)) {
    assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(path.join(out, relative))), relative);
  }
}
assert.equal(walk(out).length, walk(source).length + 1);
assert.equal(fs.readFileSync(path.join(out, ".next/BUILD_ID"), "utf8"), "wo-machine-link-31372590b5701129");
const entries = [lookupHelper, siteHelper, chunk].map((relative) => ({
  path: relative,
  before: fs.existsSync(path.join(source, relative))
    ? sha(fs.readFileSync(path.join(source, relative)))
    : null,
  after: sha(fs.readFileSync(path.join(out, relative))),
}));
const report = {
  preparedAt: new Date().toISOString(),
  scope: "Resolve newly added verified nonprimary BlueFolder locations without mutating cached parent Clients",
  sourceDirectory: outputName,
  baselineRevision: baseline.revision,
  baselineSource: baseline.source,
  baselineArchiveSHA256: baseline.archiveSHA256,
  baselineConfigHash: baseline.configHash,
  unrelatedFilesPreserved: true,
  entries,
  sourceHashes: expectedSourceHashes,
  overlay: { oldStart, newStart, oldGuard, newGuard },
  unchangedBuildId: fs.readFileSync(path.join(out, ".next/BUILD_ID"), "utf8"),
  preservedMachineHelperSHA256: sha(fs.readFileSync(path.join(out, "machine-link/workOrderMachineLink.cjs"))),
  fileCount: walk(out).length,
};
fs.writeFileSync(path.join(__dirname, "composition-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, overlay: { reverseVerified: true } }, null, 2));
