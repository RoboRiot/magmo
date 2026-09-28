"use strict";
// Reuses the reviewed AST/reference-topology implementation from the preceding
// release, pinned by hash, while proving this release's smaller intended region.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const here = __dirname, root = path.resolve(here, "../../.."), sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const priorPath = path.join(root, "tmp/work-order-warehouse-slack-20260925/deployment/test-compiled-ui-scope.cjs");
const prior = fs.readFileSync(priorPath, "utf8");
assert.equal(sha256(prior), "24572c27e3753b75dad533adc18996354a1896229205bca84da5f71d11122e9a");
const boundary = prior.indexOf("const compositionPath = path.join(__dirname");
assert(boundary > 0);
const utility = new Function("require", "__dirname", prior.slice(0, boundary) + "\nreturn {readRegistry,parseFactory,generated,asProgram,structuralProof,removedExternalReferences};")(createRequire(priorPath), path.dirname(priorPath));
const compositionBytes = fs.readFileSync(path.join(here, "composition-report.json")), composition = JSON.parse(compositionBytes);
const activeFactory = utility.readRegistry(path.join(here, "source"), composition.activePage)["60992"];
const candidateFactory = utility.readRegistry(path.join(here, "scoped-source"), composition.newPage)["60992"];
assert.equal(typeof activeFactory, "function"); assert.equal(typeof candidateFactory, "function");
const active = utility.parseFactory(activeFactory), candidate = utility.parseFactory(candidateFactory);
const start = 75;
assert.equal(active.requestIndex - 1, start, "Expected prior saved-item normalizer boundary.");
assert(candidate.requestIndex >= active.requestIndex);
const prefix = utility.structuralProof(utility.asProgram(active.statements.slice(0, start)), utility.asProgram(candidate.statements.slice(0, start)), "pre-WorkOrder module statements");
const beforeSuffix = active.statements.slice(active.modalIndex + 1), afterSuffix = candidate.statements.slice(candidate.modalIndex + 1);
assert.equal(beforeSuffix.length, 18); assert.equal(afterSuffix.length, beforeSuffix.length);
const suffix = beforeSuffix.map((node, index) => utility.structuralProof(node, afterSuffix[index], `post-WorkOrder statement ${index}`));
const optionRenderer = utility.structuralProof(active.statements[active.requestIndex + 1], candidate.statements[candidate.requestIndex + 1], "work-order option renderer");
const stagedRowRenderer = utility.structuralProof(active.statements[active.requestIndex + 2], candidate.statements[candidate.requestIndex + 2], "staged row renderer");
const requestHelper = utility.structuralProof(active.statements[active.requestIndex], candidate.statements[candidate.requestIndex], "authenticated request helper");
const externalBefore = utility.removedExternalReferences(active, start), externalAfter = utility.removedExternalReferences(candidate, start);
for (const external of [externalBefore, externalAfter]) {
  assert.equal(Object.values(external).filter((count) => count !== 0).length, 1);
  assert.equal(Object.values(external).find((count) => count !== 0), 1);
}
const candidateRegion = utility.generated(candidate.statements.slice(start, candidate.modalIndex + 1));
assert(candidateRegion.includes("/api/items/work-order-add/slack"));
assert(candidateRegion.includes("threadStatus"));
assert(!utility.generated(candidate.statements.slice(0, start)).includes("threadStatus"));
assert(!utility.generated(candidate.statements.slice(candidate.modalIndex + 1)).includes("threadStatus"));
const receipt = { checkedAt: new Date().toISOString(), status: "PASS", productionWrites: false, compositionReportSHA256: sha256(compositionBytes), baselineRevision: composition.baselineRevision, activeFactorySHA256: sha256(activeFactory.toString()), candidateFactorySHA256: sha256(candidateFactory.toString()), boundaries: { start, activeModal: active.modalIndex, candidateModal: candidate.modalIndex }, unchangedHostProof: { structurallyEquivalentPrefixStatementCount: start, structurallyEquivalentSuffixStatementCount: suffix.length, prefix, suffixShapeSHA256: sha256(JSON.stringify(suffix)), defaultExport: suffix.at(-1), optionRenderer, stagedRowRenderer, requestHelper, onlyChangedRegionBindingUsedByHost: "WorkOrderAddModal", externalBefore, externalAfter }, intendedRegionProof: { threadLinkOnlyInsideModalRegion: true, slackRequestOnlyInsideModalRegion: true }, priorProofToolSHA256: sha256(prior) };
if (process.argv.includes("--write-receipt")) fs.writeFileSync(path.join(here, "compiled-ui-scope-verification.json"), JSON.stringify(receipt, null, 2) + "\n");
console.log(JSON.stringify(receipt, null, 2));
