"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const root = path.resolve(__dirname, "../.."), source = path.join(__dirname, "source");
const outputName = process.argv[2] || "scoped-source";
assert(/^scoped-source(?:-v\d+)?$/.test(outputName));
const out = path.join(__dirname, outputName);
const read = (file) => fs.readFileSync(file, "utf8"), sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const changes = new Map(), patchProofs = [];
const helperPath = 'require(process.cwd()+"/machine-link/workOrderMachineLink.cjs")';
function patchFile(relative, identify) {
  const code = changes.get(relative) || read(path.join(source, relative)), edits = identify(code, parser.parse(code));
  assert(edits.length, relative);
  let next = code;
  for (const edit of edits.sort((a, b) => b.start - a.start)) next = next.slice(0, edit.start) + edit.text + next.slice(edit.end);
  parser.parse(next);
  patchProofs.push({ path: relative, edits: edits.map((edit) => ({ before: code.slice(edit.start, edit.end), after: edit.text })) });
  changes.set(relative, next);
}
function findFactory(code, ast, id) {
  let node;
  traverse(ast, { ObjectProperty(p) { if (p.node.key.value === id) { assert(!node); node = p.node.value; } } });
  assert(node, `Missing module ${id}`);
  return node;
}
// Replace only the pure import contract, in every existing duplicate factory.
const contractFiles = [".next/server/chunks/8806.js", ".next/server/pages/api/cron/trailer-slack-monitor.js", ".next/server/pages/api/ops/health.js", ".next/server/pages/api/ops/openapi.js"];
for (const file of contractFiles) patchFile(file, (code, ast) => {
  const node = findFactory(code, ast, 44552);
  assert(code.slice(node.start, node.end).includes("buildBlueFolderImportPatch"));
  return [{ start: node.start, end: node.end, text: '(a)=>{a.exports=require(process.cwd()+"/machine-link/blueFolderImportContract.cjs")}' }];
});
// Extend the currently deployed contract AFTER its status-only-close extension.
patchFile(".next/server/chunks/6681.js", (code, ast) => {
  const node = findFactory(code, ast, 16681);
  assert(code.slice(node.start, node.end).includes('ops-bluefolder-status-contract-overlay.cjs').valueOf());
  return [{ start: node.body.end - 1, end: node.body.end - 1, text: ';a.exports=require(process.cwd()+"/machine-link/contract-overlay.cjs").extendContract(a.exports);' }];
});
// Keep all other work-order code unchanged, adding only machine resolution inside the import transaction.
patchFile(".next/server/chunks/8806.js", (code, ast) => {
  let target;
  traverse(ast, { FunctionDeclaration(p) { if (p.node.id.name === "ao" && code.slice(p.node.start, p.node.end).includes("BlueFolder service-request ID is required.")) { assert(!target); target = p; } } });
  assert(target);
  let plan, update, existing, nextDeclaration, clientPayloadAssignment, replay;
  target.traverse({ VariableDeclaration(p) {
    if (p.node.declarations.some((declaration) => declaration.id.name === "m" && code.slice(declaration.start, declaration.end) === "m=bi(i,k)")) plan = p.node;
    if (p.node.declarations.some((declaration) => declaration.id.name === "p" && code.slice(declaration.start, declaration.end) === "p={...m.patch}")) update = p.node;
    for (let index = 0; index < p.node.declarations.length; index++) {
      const declaration = p.node.declarations[index];
      if (declaration.id.name === "i" && code.slice(declaration.start, declaration.end) === "i=h.exists&&h.data()||{}") {
        existing = declaration; nextDeclaration = p.node.declarations[index + 1];
      }
    }
  }, SequenceExpression(p) {
    const text = code.slice(p.node.start, p.node.end);
    if (text.startsWith("l=a4(j,") && text.includes("Object.assign(k,{clientId:l.clientId")) clientPayloadAssignment = p.node;
  }, IfStatement(p) {
    if (code.slice(p.node.test.start, p.node.test.end) === "!n&&m.idempotentReplay&&!o.applied") replay = p.node.test;
  } });
  assert(plan && update && existing && nextDeclaration && clientPayloadAssignment && replay);
  assert.equal(code.slice(existing.end, nextDeclaration.start), ",");
  return [
    { start: existing.end, end: nextDeclaration.start, text: ';if(i.deletedAt||(a.existingOnly===true&&!h.exists)){const error=new Error(i.deletedAt?"The work order was deleted; BlueFolder metadata cannot restore it.":"The work order no longer exists; metadata refresh cannot create it.");error.code=i.deletedAt?"work_order_deleted":"work_order_not_found";error.statusCode=i.deletedAt?409:404;throw error;}let ' },
    { start: clientPayloadAssignment.start, end: clientPayloadAssignment.end, text: code.slice(clientPayloadAssignment.expressions[0].start, clientPayloadAssignment.expressions[0].end) },
    { start: plan.end, end: plan.end, text: `let resolvedMachinePatch={};const effectiveWorkOrder={...i,...m.patch,...l},machineLinkHelpers=${helperPath};if(!E(effectiveWorkOrder.machineId)&&!E(effectiveWorkOrder.trailerId)&&machineLinkHelpers.hasSelectedBlueFolderEquipment(effectiveWorkOrder)){const resolvedMachine=await machineLinkHelpers.resolveWorkOrderMachineLinkInTransaction(g,f,effectiveWorkOrder,E(effectiveWorkOrder.clientId));resolvedMachinePatch=machineLinkHelpers.buildWorkOrderMachineLinkPatch(resolvedMachine,{linkedAtIso:d});}` },
    { start: replay.start, end: replay.end, text: code.slice(replay.start, replay.end) + "&&!l.clientId&&!resolvedMachinePatch.machineId" },
    { start: update.end, end: update.end, text: 'if(resolvedMachinePatch.machineId&&!E(i.machineId)){Object.assign(p,resolvedMachinePatch);}' },
  ];
});
patchFile(".next/server/chunks/4354.js", (code, ast) => {
  let target, insertion;
  traverse(ast, { FunctionDeclaration(p) { if (p.node.id.name === "C" && code.slice(p.node.start, p.node.end).includes("work_order_machine_client_mismatch")) target = p; } });
  assert(target);
  target.traverse({ VariableDeclaration(p) { if (code.slice(p.node.start, p.node.end) === "let v=null;") insertion = p.node.start; } });
  assert(Number.isInteger(insertion));
  return [{ start: insertion, end: insertion, text: `if(${helperPath}.workOrderMachineLinkNeedsReview(k)){r("work_order_machine_needs_review","The equipment selected in BlueFolder changed after this work order's machine was linked. Review the machine link before moving inventory; no items were changed.",409);}if(!m&&${helperPath}.hasSelectedBlueFolderEquipment(k)){r("work_order_machine_not_linked","The equipment selected in BlueFolder is not linked to a Magmo machine yet. Link the work order machine before moving inventory; no items were changed.",409);}` }];
});
patchFile(".next/server/chunks/428.js", (code, ast) => {
  let insertion;
  traverse(ast, { ExpressionStatement(p) { const text = code.slice(p.node.start, p.node.end); if (text.startsWith('(!k.exists||k.data()?.deletedAt)') && text.includes('"work_order_destination_missing"') && text.includes('k.data()?.clientId')) { assert(!insertion); insertion = p.node.end; } } });
  assert(Number.isInteger(insertion));
  return [{ start: insertion, end: insertion, text: `const workOrderData=k.data()||{};if(${helperPath}.workOrderMachineLinkNeedsReview(workOrderData)){h(409,"work_order_machine_needs_review","The equipment selected in BlueFolder changed after this work order's machine was linked. Review the machine link before scanning inventory.");}if(!i(workOrderData.machineId,180)&&!i(workOrderData.trailerId,180)&&${helperPath}.hasSelectedBlueFolderEquipment(workOrderData)){h(409,"work_order_machine_not_linked","The equipment selected in BlueFolder is not linked to a Magmo machine yet. Link the work order machine before scanning inventory.");}` }];
});
patchFile(".next/server/pages/api/items/work-order-add/options.js", (code, ast) => {
  let target, insertion, linked;
  traverse(ast, { FunctionDeclaration(p) { if (p.node.id.name === "j" && code.slice(p.node.start, p.node.end).includes("destinationLinked")) target = p; } });
  assert(target);
  target.traverse({ ReturnStatement(p) { if (p.node.argument?.type === "ObjectExpression") insertion = p.node.start; }, ObjectProperty(p) { if (p.node.key.name === "destinationLinked") linked = p.node; } });
  assert(Number.isInteger(insertion) && linked);
  return [
    { start: insertion, end: insertion, text: `const destinationIssue=!d?"Destination not linked":${helperPath}.workOrderMachineLinkNeedsReview(b)?"Machine link needs review":!g&&!h&&${helperPath}.hasSelectedBlueFolderEquipment(b)?"Machine not linked":"";` },
    { start: linked.start, end: linked.end, text: "destinationLinked:!destinationIssue,destinationIssue" },
  ];
});
patchFile(".next/server/chunks/8806.js", (code, ast) => {
  let target, machineRef;
  traverse(ast, { FunctionDeclaration(p) { if (p.node.id.name === "aj" && code.slice(p.node.start, p.node.end).includes("connectionsUpdatedBy")) target = p; } });
  assert(target);
  target.traverse({ ObjectProperty(p) { if (p.node.key.name === "machineRef") { assert(!machineRef); machineRef = p.node; } } });
  assert(machineRef);
  return [{ start: machineRef.end, end: machineRef.end, text: ',machineLinkSource:"manual",machineLinkEquipmentIds:[]' }];
});
// New immutable client bundle; existing open tabs retain their old asset paths.
const manifest = JSON.parse(read(path.join(source, ".next/build-manifest.json")));
const oldAsset = manifest.pages["/NewSearch/mainSearch"].find((value) => /pages\/NewSearch\/mainSearch-/.test(value));
assert.equal(oldAsset, "static/chunks/pages/NewSearch/mainSearch-bac7249c2f16ebb5.js");
const uiCode = read(path.join(source, ".next", oldAsset));
let uiTarget;
traverse(parser.parse(uiCode), { StringLiteral(p) { if (p.node.value === "Destination not linked") { assert(!uiTarget); uiTarget = p.parentPath.node; } } });
assert.equal(uiCode.slice(uiTarget.start, uiTarget.end), 'c?s:"Destination not linked"');
const uiFresh = uiCode.slice(0, uiTarget.start) + 'c?s:tf(t?.destinationIssue)||"Destination not linked"' + uiCode.slice(uiTarget.end);
parser.parse(uiFresh);
const newAsset = "static/chunks/pages/NewSearch/mainSearch-" + sha(uiFresh).slice(0, 16) + ".js";
changes.set(".next/" + newAsset, uiFresh);
const oldName = path.basename(oldAsset), newName = path.basename(newAsset);
const oldBuildId = read(path.join(source, ".next/BUILD_ID")).trim(), newBuildId = "wo-machine-link-" + sha(uiFresh).slice(0, 16);
for (const file of walk(path.join(source, ".next"))) {
  if (!/\.(js|json|html)$/.test(file) || file === path.join(source, ".next", oldAsset)) continue;
  const relative = path.relative(source, file).replaceAll("\\", "/");
  if (/^\.next\/static\/[^/]+\/_/.test(relative)) continue;
  const content = changes.get(relative) || read(file);
  if (content.includes(oldName) || content.includes(oldBuildId)) {
    const fresh = content.split(oldName).join(newName).split(oldBuildId).join(newBuildId);
    assert.equal(fresh.split(newName).join(oldName).split(newBuildId).join(oldBuildId), content);
    changes.set(relative, fresh);
  }
}
changes.set(".next/BUILD_ID", newBuildId);
for (const file of walk(path.join(source, ".next/static", oldBuildId))) {
  const relative = path.relative(path.join(source, ".next/static", oldBuildId), file).replaceAll("\\", "/");
  changes.set(".next/static/" + newBuildId + "/" + relative, read(file).split(oldName).join(newName).split(oldBuildId).join(newBuildId));
}
const pureFiles = ["workOrderMachineLink.cjs", "workOrderClientLink.cjs", "clientDirectory.cjs", "trailerClientLinks.cjs", "blueFolderImportContract.cjs"];
for (const file of pureFiles) changes.set("machine-link/" + file, read(path.join(root, "lib/ops", file)));
changes.set("machine-link/contract-overlay.cjs", read(path.join(__dirname, "contract-overlay.cjs")));
const local = require(path.join(root, "lib/ops/ingestContract.cjs"));
const importProperties = local.buildOpenApiSpec().components.schemas.WorkOrderImportedRequest.properties;
const properties = importProperties.blueFolder.properties;
changes.set("machine-link/equipment-schema.json", JSON.stringify({ equipment: { equipmentIds: properties.equipmentIds, equipmentNames: properties.equipmentNames }, existingOnly: importProperties.existingOnly, capability: local.runtimeCapabilities({}).bluefolderEquipmentLink }, null, 2));
const sourceInputs = [...pureFiles.map((file) => "lib/ops/" + file), "lib/ops/workOrders.js", "lib/ops/ingestContract.cjs", "lib/inventory/workOrderAddService.cjs", "lib/inventory/workOrderScannerCapture.cjs", "lib/inventory/workOrderAddOptions.js", "components/WorkOrderAddModal.js", "tmp/work-order-machine-link-20260924/contract-overlay.cjs"];
for (const [name, code] of changes) if (/\.(js|cjs)$/.test(name)) parser.parse(code, { sourceType: "unambiguous" });
assert(!fs.existsSync(out), "Never overwrite candidate");
fs.cpSync(source, out, { recursive: true });
for (const [name, code] of changes) { fs.mkdirSync(path.dirname(path.join(out, name)), { recursive: true }); fs.writeFileSync(path.join(out, name), code); }
for (const file of walk(source)) { const relative = path.relative(source, file).replaceAll("\\", "/"); if (!changes.has(relative)) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(path.join(out, relative))), relative); }
const report = { composedAt: new Date().toISOString(), sourceDirectory: outputName, artifactFile: "artifact.zip", oldAsset, newAsset, oldBuildId, newBuildId, immutableAssetsPreserved: true,
  sourceHashes: Object.fromEntries(sourceInputs.map((name) => [name, sha(fs.readFileSync(path.join(root, name)))])),
  entries: [...changes].map(([name, code]) => ({ path: name, before: fs.existsSync(path.join(source, name)) ? sha(fs.readFileSync(path.join(source, name))) : null, after: sha(code) })),
  unrelatedFilesPreserved: true, scope: "BlueFolder selected-equipment machine linking during work-order import; fail-safe scan/movement guards and explanatory option label; preserve all existing features and data" };
fs.writeFileSync(path.join(__dirname, "composition-report.json"), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(__dirname, "patch-proofs.json"), JSON.stringify(patchProofs, null, 2));
console.log(JSON.stringify(report, null, 2));
