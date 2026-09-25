"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const parser = require("@babel/parser");
const root = path.resolve(__dirname, "../.."), source = path.join(__dirname, "source");
const outputName = process.argv[2] || "scoped-source"; assert(/^scoped-source(?:-v\d+)?$/.test(outputName));
const out = path.join(__dirname, outputName), helper = "machine-link/workOrderMachineLink.cjs", chunk = ".next/server/chunks/8806.js";
const reviewedHelper = "lib/ops/workOrderMachineLink.cjs", reviewedWorkOrders = "lib/ops/workOrders.js";
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const replaceOnce = (value, before, after, label) => { assert.equal(value.split(before).length, 2, `${label} anchor must occur exactly once`); return value.replace(before, after); };

assert(!fs.existsSync(out), "Never overwrite a candidate");
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, "baseline.json"), "utf8"));
assert.equal(baseline.revision, "nextserverwest-00059-vak"); assert.equal(baseline.runtime, "nodejs22"); assert.equal(baseline.entryPoint, "nextServerWest");
assert.equal(sha(fs.readFileSync(path.join(__dirname, "source.zip"))), baseline.archiveSHA256);
const code = fs.readFileSync(path.join(source, chunk), "utf8");
assert.equal(sha(code), "432b417ddb8e2c75e720137f4e8775feaa462dc7f56b201a75e474ad3ebebf54");
assert.equal(sha(fs.readFileSync(path.join(source, helper))), "c877bd3da2888a27cf48cf46d7d8b503515315d721d4156249477ab9252ca94d");
assert.equal(sha(fs.readFileSync(path.join(root, reviewedHelper))), "f8664402bfecd7ebb828fb44729c748671c86aa6aa31a090154a731f26463382");
assert.equal(sha(fs.readFileSync(path.join(root, reviewedWorkOrders))), "936e128c2d1dbb93eabd50002748909c37757bc7fbef306123e55a24b2357971");

const oldGuard = 'l={};let siteCreation=null;if(!E(i.clientId)){const siteLink=await require(process.cwd()+"/machine-link/workOrderSiteLink.cjs").resolveWorkOrderSiteLinkInTransaction(g,f,k,{linkedAtIso:d});l=siteLink.patch;siteCreation=siteLink.creation;}let m=bi(i,k),n=!h.exists,o=n?{patch:{},targetStage:"",applied:!1}:bh(i,a);let resolvedMachine=null,resolvedMachinePatch={};const effectiveWorkOrder={...i,...m.patch,...l},machineLinkHelpers=require(process.cwd()+"/machine-link/workOrderMachineLink.cjs");if(!E(effectiveWorkOrder.machineId)&&!E(effectiveWorkOrder.trailerId)&&machineLinkHelpers.hasSelectedBlueFolderEquipment(effectiveWorkOrder))';
const newGuard = 'l={};let siteCreation=null,clientLinkResolutionReason="",protectedExistingAsset=!1;if(!E(i.clientId)){const siteLink=await require(process.cwd()+"/machine-link/workOrderSiteLink.cjs").resolveWorkOrderSiteLinkInTransaction(g,f,k,{linkedAtIso:d});l=siteLink.patch;siteCreation=siteLink.creation;if(l.clientId){const assetSiteGuard=await require(process.cwd()+"/machine-link/workOrderMachineLink.cjs").validateExistingWorkOrderAssetSiteInTransaction(g,f,i,l,{clientData:siteCreation?.data});protectedExistingAsset=assetSiteGuard.hasExistingAsset;if(!assetSiteGuard.allowed){clientLinkResolutionReason=assetSiteGuard.reason;l={};siteCreation=null;}}}let m=bi(i,k),n=!h.exists,o=n?{patch:{},targetStage:"",applied:!1}:bh(i,a);let resolvedMachine=null,resolvedMachinePatch={};const effectiveWorkOrder={...i,...m.patch,...l},machineLinkHelpers=require(process.cwd()+"/machine-link/workOrderMachineLink.cjs");if(!protectedExistingAsset&&!E(effectiveWorkOrder.machineId)&&!E(effectiveWorkOrder.trailerId)&&machineLinkHelpers.hasSelectedBlueFolderEquipment(effectiveWorkOrder))';
const oldReplay = 'machineLinkHelpers.workOrderEquipmentLinkStatus({...effectiveWorkOrder,...resolvedMachinePatch},{unresolvedReason:resolvedMachine?.reason||""})';
const newReplay = 'machineLinkHelpers.workOrderEquipmentLinkStatus({...effectiveWorkOrder,...resolvedMachinePatch},{unresolvedReason:clientLinkResolutionReason||resolvedMachine?.reason||""})';
const oldCompletion = 'equipmentLinkResolutionReason:resolvedMachine?.reason||""';
const newCompletion = 'equipmentLinkResolutionReason:clientLinkResolutionReason||resolvedMachine?.reason||""';
let patched = replaceOnce(code, oldGuard, newGuard, "existing asset/site guard");
patched = replaceOnce(patched, oldReplay, newReplay, "guard response issue");
patched = replaceOnce(patched, oldCompletion, newCompletion, "guard post-write issue");
parser.parse(patched);
assert.equal(patched.replace(newGuard, oldGuard).replace(newReplay, oldReplay).replace(newCompletion, oldCompletion), code, "Only reviewed importer substitutions may differ");

fs.cpSync(source, out, { recursive: true, force: false, errorOnExist: true });
fs.copyFileSync(path.join(root, reviewedHelper), path.join(out, helper)); fs.writeFileSync(path.join(out, chunk), patched);
for (const file of walk(source)) { const relative = path.relative(source, file).replaceAll("\\", "/"); if (![helper, chunk].includes(relative)) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(path.join(out, relative))), relative); }
assert.equal(walk(out).length, walk(source).length);
assert.equal(fs.readFileSync(path.join(out, ".next/BUILD_ID"), "utf8"), "wo-machine-link-31372590b5701129");
assert.equal(sha(fs.readFileSync(path.join(out, "machine-link/workOrderSiteLink.cjs"))), "e62fda7488b4f7a5d60c67fd474f771e7b95b369863c2b5ff4f963ce12933f1f");
const entries = [helper, chunk].map((relative) => ({ path: relative, before: sha(fs.readFileSync(path.join(source, relative))), after: sha(fs.readFileSync(path.join(out, relative))) }));
const report = { preparedAt: new Date().toISOString(), scope: "Reject cross-site client healing when a work order retains an existing typed asset", sourceDirectory: outputName,
  baselineRevision: baseline.revision, baselineSource: baseline.source, unrelatedFilesPreserved: true, entries,
  sourceHashes: { [reviewedHelper]: sha(fs.readFileSync(path.join(root, reviewedHelper))), [reviewedWorkOrders]: sha(fs.readFileSync(path.join(root, reviewedWorkOrders))),
    "test/work-order-machine-link.test.cjs": sha(fs.readFileSync(path.join(root, "test/work-order-machine-link.test.cjs"))), "test/work-order-machine-import.test.cjs": sha(fs.readFileSync(path.join(root, "test/work-order-machine-import.test.cjs"))) },
  overlay: { oldGuard, newGuard, oldReplay, newReplay, oldCompletion, newCompletion }, unchangedBuildId: fs.readFileSync(path.join(out, ".next/BUILD_ID"), "utf8"),
  preservedSiteHelperSHA256: sha(fs.readFileSync(path.join(out, "machine-link/workOrderSiteLink.cjs"))), fileCount: walk(out).length };
fs.writeFileSync(path.join(__dirname, "composition-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, overlay: { reverseVerified: true } }, null, 2));
