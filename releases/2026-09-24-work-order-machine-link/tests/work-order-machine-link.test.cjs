"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const { resolveWorkOrderMachineLink: resolve, hasSelectedBlueFolderEquipment,
  buildWorkOrderMachineLinkPatch, workOrderMachineLinkNeedsReview,
  resolveWorkOrderMachineLinkInTransaction } = require("../lib/ops/workOrderMachineLink.cjs");
const { buildBlueFolderImportPatch } = require("../lib/ops/blueFolderImportContract.cjs");
const { validateIngestRequest } = require("../lib/ops/ingestContract.cjs");
const clientData = { bluefolderCustomerId: "customer1", bluefolderLocationId: "location1" };
const opts = { clientId: "C1", clientData };
const identity = { bluefolderCustomerId: "customer1", bluefolderLocationId: "location1",
  bluefolderEquipmentIds: ["equipment1"], bluefolderEquipmentNames: ["AQ64 CT"] };
const machine = { id: "M1", data: { name: "AQ64 CT", client: { path: "Client/C1" } } };

test("BlueFolder selected equipment resolves the unique exact machine at its verified site", () => {
  const result = resolve([machine], identity, opts);
  assert.equal(result.match.id, "M1");
  assert.equal(result.reason, "bluefolder_equipment_exact_name_at_client");
  assert.equal(buildWorkOrderMachineLinkPatch(result).machineId, "M1");
});
test("canonical equipment ID survives a display-name difference", () => {
  const result = resolve([{ ...machine, data: { ...machine.data, name: "Scanner", bluefolderEquipmentId: "equipment1" } }], identity, opts);
  assert.equal(result.reason, "bluefolder_equipment_id");
});
test("never guesses between selected equipment or duplicate local names", () => {
  assert.equal(resolve([machine], { ...identity, bluefolderEquipmentIds: ["equipment1", "equipment2"] }, opts).match, null);
  assert.equal(resolve([machine, { ...machine, id: "M2" }], identity, opts).match, null);
});
test("never uses a title, fuzzy model, other site, unverified site, or conflicting mapping", () => {
  for (const row of [
    { ...machine, data: { ...machine.data, name: "AQ64" } },
    { ...machine, data: { ...machine.data, client: { path: "Client/C2" } } },
    { ...machine, data: { ...machine.data, bluefolderEquipmentId: "equipment2" } },
    { ...machine, data: { ...machine.data, clientId: "C2" } },
  ]) assert.equal(resolve([row], identity, opts).match, null);
  assert.equal(resolve([machine], { ...identity, bluefolderLocationId: "wrong" }, opts).match, null);
  assert.equal(resolve([machine], { subject: "AQ64 CT", bluefolderEquipmentIds: ["equipment1"] }, opts).match, null);
});
test("an exact equipment mapped to a different site prevents name fallback", () => {
  const other = { id: "M2", data: { clientId: "C2", bluefolderEquipmentId: "equipment1" } };
  assert.equal(resolve([machine, other], identity, opts).reason, "bluefolder_equipment_client_mismatch");
});
test("duplicate exact IDs and conflicting ID aliases are not guessed", () => {
  const mapped = { ...machine, data: { ...machine.data, bluefolderEquipmentId: "equipment1" } };
  assert.equal(resolve([mapped, { ...mapped, id: "M2" }], identity, opts).match, null);
  assert.equal(resolve([{ ...mapped, data: { ...mapped.data, blueFolderEquipmentId: "different" } }], identity, opts).match, null);
});
test("equipment identity is persisted without losing multi-equipment or legacy missing-field distinction", () => {
  const payload = { blueFolder: { serviceRequestId: "10664", equipmentIds: ["eq2", "eq1", "eq1"], equipmentNames: ["One", "Two"] } };
  const first = buildBlueFolderImportPatch({}, payload);
  assert.deepEqual(first.patch.bluefolderEquipmentIds, ["eq1", "eq2"]);
  assert.equal(hasSelectedBlueFolderEquipment(first.patch), true);
  assert.equal(buildBlueFolderImportPatch(first.patch, { blueFolder: { serviceRequestId: "10664" } }).patch.bluefolderEquipmentIds, undefined);
  assert.deepEqual(buildBlueFolderImportPatch(first.patch, { blueFolder: { serviceRequestId: "10664", equipmentIds: [], equipmentNames: [] } }).patch.bluefolderEquipmentIds, []);
  assert.equal(buildBlueFolderImportPatch(first.patch, payload).idempotentReplay, true);
});
test("malformed selected equipment is rejected rather than coerced into a match", () => {
  for (const equipmentIds of ["eq1", [null], [{}], Array(51).fill("eq1")]) {
    assert.throws(() => buildBlueFolderImportPatch({}, { blueFolder: { serviceRequestId: "1", equipmentIds } }), /must be an array/);
    assert.throws(() => validateIngestRequest({ eventType: "work_order.imported", blueFolder: { serviceRequestId: "1", equipmentIds } }), (error) => error.code === "bluefolder_equipment_identity_invalid");
  }
});
test("an equipment refresh never replaces an existing manual machine", () => {
  const result = buildBlueFolderImportPatch({ machineId: "manual", machineName: "Manual" }, {
    blueFolder: { serviceRequestId: "10664", equipmentIds: ["equipment1"], equipmentNames: ["AQ64 CT"] },
    machineId: "M1", machineName: "AQ64 CT",
  });
  assert.equal(result.patch.machineId, undefined);
  assert.equal(result.patch.machineName, undefined);
});

test("an unavailable canonical identity blocks reassignment to another same-name machine", () => {
  for (const flag of [{deletedAt:"2026-09-24"},{archivedAt:"2026-09-24"},{deleted:true},{archived:true}]) {
    const unavailable={id:"old-machine",data:{...machine.data,bluefolderEquipmentId:"equipment1",...flag}};
    const result=resolve([machine,unavailable],identity,opts);
    assert.equal(result.match,null);
    assert.equal(result.reason,"bluefolder_equipment_machine_unavailable");
    assert.equal(resolve([{...machine,data:{...machine.data,...flag}}],identity,opts).match,null);
  }
});

test("duplicate equipment claims remain ambiguous even when one machine is archived", () => {
  const mapped={...machine,data:{...machine.data,bluefolderEquipmentId:"equipment1"}};
  const duplicate={id:"archived-machine",data:{...mapped.data,archived:true}};
  assert.equal(resolve([mapped,duplicate],identity,opts).reason,"bluefolder_equipment_duplicate_mapping");
});

test("automatic links retain their equipment evidence and require review when it changes or is removed", () => {
  const resolved=resolve([machine],identity,opts);
  const patch=buildWorkOrderMachineLinkPatch(resolved);
  assert.deepEqual(patch.machineLinkEquipmentIds,["equipment1"]);
  const linked={...identity,...patch};
  assert.equal(workOrderMachineLinkNeedsReview(linked),false);
  assert.equal(workOrderMachineLinkNeedsReview({...linked,bluefolderEquipmentIds:["equipment2"]}),true);
  assert.equal(workOrderMachineLinkNeedsReview({...linked,bluefolderEquipmentIds:[]}),true);
  assert.equal(workOrderMachineLinkNeedsReview({...linked,bluefolderEquipmentIds:["equipment1","equipment2"]}),true);
  assert.equal(workOrderMachineLinkNeedsReview({...linked,bluefolderEquipmentNames:["Renamed equipment"]}),false);
});

test("manual machine connections are preserved without an automatic-equipment stamp", () => {
  assert.equal(workOrderMachineLinkNeedsReview({...identity,machineId:"manual-machine"}),false);
  assert.equal(workOrderMachineLinkNeedsReview({...identity,machineId:"manual-machine",machineLinkEquipmentIds:[]}),false);
});

test("equipment evidence comparison normalizes GUID case, duplicates, and ordering", () => {
  const first="2C24CED2-EADE-4942-9D52-808A6FD39E91",second="FC8B1213-BB9E-4862-BB9C-12496600C747";
  assert.equal(workOrderMachineLinkNeedsReview({machineLinkEquipmentIds:[first,second],bluefolderEquipmentIds:[second.toLowerCase(),first.toLowerCase(),first]}),false);
});

test("transactional resolution finds lowercase global ID conflicts before scoped name fallback", async () => {
  const id="2C24CED2-EADE-4942-9D52-808A6FD39E91";
  const rows=[machine,{id:"other-site-machine",data:{clientId:"C2",bluefolderEquipmentId:id.toLowerCase()}}];
  const queried=[];
  const db={collection(name){return {doc(docId){return {path:`${name}/${docId}`,id:docId};},where(field,operator,value){return {collection:name,field,operator,value,limit(){return this;}};}};}};
  const tx={async get(target){
    if(target.path==="Client/C1")return {exists:true,data:()=>clientData};
    if(target.field){
      queried.push(target);
      return {docs:rows.filter(row=>{
        const got=row.data[target.field];
        return typeof target.value==="object"?got?.path===target.value.path:got===target.value;
      }).map(row=>({id:row.id,data:()=>row.data,ref:{path:"Machine/"+row.id}}))};
    }
    return {exists:false};
  }};
  const result=await resolveWorkOrderMachineLinkInTransaction(tx,db,{...identity,bluefolderEquipmentIds:[id]},"C1");
  assert.equal(result.reason,"bluefolder_equipment_client_mismatch");
  assert.equal(result.match,null);
  assert.ok(queried.some(q=>q.field==="bluefolderEquipmentId"&&q.value===id));
  assert.ok(queried.some(q=>q.field==="bluefolderEquipmentId"&&q.value===id.toLowerCase()));
});
