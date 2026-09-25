"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const { resolveWorkOrderMachineLink: resolve, hasSelectedBlueFolderEquipment,
  buildWorkOrderMachineLinkPatch, workOrderMachineLinkNeedsReview, workOrderEquipmentLinkStatus,
  resolveWorkOrderTrailerLink,
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
test("a unique structured model resolves Espree at the exact reviewed site without fuzzy name matching", () => {
  const selected = { bluefolderCustomerId: "customer1", bluefolderLocationId: "location1",
    bluefolderEquipmentIds: ["09859C69-CD50-4277-BB40-60A696300768"], bluefolderEquipmentNames: ["Espree"] };
  const espree = { id: "AIS32820", data: { name: "Siemens espree MR", Model: "Espree",
    OEM: "Siemens", Modality: "MRI", client: { path: "Client/C1" } } };
  const result = resolve([espree, { id: "M2", data: { name: "Other scanner", Model: "Aera",
    OEM: "Siemens", Modality: "MRI", clientId: "C1" } }], selected, opts);
  assert.equal(result.match.id, "AIS32820");
  assert.equal(result.reason, "bluefolder_equipment_exact_model_at_client");
});
test("structured model normalization removes only recognized edge identity tokens", () => {
  const selected = { ...identity, bluefolderEquipmentNames: ["Siemens MRI Espree"] };
  const espree = { ...machine, data: { ...machine.data, name: "Scanner one", Model: "Espree MR",
    OEM: "Siemens", Modality: "MRI" } };
  assert.equal(resolve([espree], selected, opts).reason, "bluefolder_equipment_exact_model_at_client");
  const variant = { ...espree, data: { ...espree.data, name: "Scanner two", Model: "MR750", OEM: "GE" } };
  assert.equal(resolve([variant], { ...identity, bluefolderEquipmentNames: ["GE MR750W MRI"] }, opts).match, null);
  assert.equal(resolve([{ ...variant, data: { ...variant.data, Model: "MR750W" } }],
    { ...identity, bluefolderEquipmentNames: ["GE MR750W MRI"] }, opts).reason,
  "bluefolder_equipment_exact_model_at_client");
});
test("structured model fallback fails closed on duplicate models and identity conflicts", () => {
  const selected = { ...identity, bluefolderEquipmentNames: ["Siemens Espree MRI"] };
  const base = { ...machine, data: { ...machine.data, name: "Scanner one", Model: "Espree",
    OEM: "Siemens", Modality: "MRI" } };
  assert.equal(resolve([base, { ...base, id: "M2", data: { ...base.data, name: "Scanner two" } }], selected, opts).reason,
    "bluefolder_equipment_model_ambiguous");
  for (const data of [
    { ...base.data, Model: "GE Espree" },
    { ...base.data, Model: "CT Espree MRI" },
    { ...base.data, model: "Aera" },
    { ...base.data, OEM: "GE" },
    { ...base.data, Modality: "CT" },
    { ...base.data, Model: { text: "Espree" } },
  ]) assert.equal(resolve([{ ...base, data }], selected, opts).match, null);
});
test("exact duplicate names remain ambiguous even when one record has malformed structured identity", () => {
  const good = { ...machine, data: { ...machine.data, Model: "AQ64", Modality: "CT" } };
  const malformed = { ...good, id: "M2", data: { ...good.data, Model: "AQ64", model: "Aquilion" } };
  const result = resolve([good, malformed], identity, opts);
  assert.equal(result.match, null);
  assert.equal(result.reason, "bluefolder_equipment_name_ambiguous");
  const onlyMalformed = resolve([malformed, { id: "M3", data: { ...machine.data, name: "Other",
    Model: "AQ64", Modality: "CT" } }], identity, opts);
  assert.equal(onlyMalformed.match, null);
  assert.equal(onlyMalformed.reason, "bluefolder_equipment_machine_identity_conflict");
});
test("structured model fallback rejects an inactive or malformed client", () => {
  const selected = { ...identity, bluefolderEquipmentNames: ["Espree"] };
  const espree = { ...machine, data: { ...machine.data, name: "Scanner", Model: "Espree" } };
  assert.equal(resolve([espree], selected, { clientId: "C1", clientData: { ...clientData, archived: true } }).reason,
    "bluefolder_equipment_client_unavailable");
  assert.equal(resolve([espree], selected, { clientId: "C1", clientData: [] }).reason,
    "bluefolder_equipment_client_malformed");
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

test("equipment link status is authoritative and keeps unresolved site work retryable", () => {
  assert.deepEqual(workOrderEquipmentLinkStatus({}),
    { equipmentLinkStatus: "site_unresolved", equipmentLinkIssue: "work_order_client_missing" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ clientId: "C1" }),
    { equipmentLinkStatus: "not_selected", equipmentLinkIssue: "" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ ...identity }),
    { equipmentLinkStatus: "site_unresolved", equipmentLinkIssue: "work_order_client_missing" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ ...identity, clientId: "C1" }, { unresolvedReason: "bluefolder_equipment_model_ambiguous" }),
    { equipmentLinkStatus: "unresolved", equipmentLinkIssue: "bluefolder_equipment_model_ambiguous" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ ...identity, clientId: "C1", machineId: "manual" }),
    { equipmentLinkStatus: "manual", equipmentLinkIssue: "" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ ...identity, clientId: "C1", machineId: "M1", machineLinkEquipmentIds: ["equipment1"] }),
    { equipmentLinkStatus: "resolved", equipmentLinkIssue: "" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ ...identity, bluefolderEquipmentIds: [], machineLinkEquipmentIds: ["equipment1"], machineId: "M1" }),
    { equipmentLinkStatus: "needs_review", equipmentLinkIssue: "bluefolder_equipment_selection_changed" });
  assert.deepEqual(workOrderEquipmentLinkStatus({ ...identity, clientId: "C1", machineLinkEquipmentIds: ["equipment1"] }),
    { equipmentLinkStatus: "needs_review", equipmentLinkIssue: "automatic_machine_link_missing" });
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

const trailer = { id: "AIS20", ref: { path: "Trailers/AIS20", id: "AIS20" }, data: {
  name: "Trailer 20", associatedMachine: { path: "Machine/M1", id: "M1" }, currentClient: { path: "Client/C1", id: "C1" },
} };
function trailerResolution(machineData = machine.data, trailers = [trailer]) {
  return resolveWorkOrderTrailerLink(trailers, resolve([{ ...machine, data: machineData }], identity, opts), opts);
}
test("a selected machine carries its uniquely verified trailer into the work-order patch", () => {
  for (const declaration of [{}, { trailerId: "AIS20" }, { trailer: { path: "Trailers/AIS20", id: "AIS20" } }, { trailerId: "/Trailers/AIS20", trailer: "Trailers/AIS20" }]) {
    const result = trailerResolution({ ...machine.data, ...declaration });
    assert.equal(result.match.id, "M1"); assert.equal(result.trailer.id, "AIS20");
    const patch = buildWorkOrderMachineLinkPatch(result);
    assert.equal(patch.machineId, "M1"); assert.equal(patch.trailerId, "AIS20");
    assert.equal(patch.trailerName, "Trailer 20"); assert.equal(patch.trailerRef.path, "Trailers/AIS20");
    assert.deepEqual(patch.machineLinkEquipmentIds, ["equipment1"]);
  }
});
test("a genuinely standalone scanner remains machine-only without name-based trailer inference", () => {
  const result = trailerResolution({ ...machine.data, name: "AQ64 CT" }, []);
  assert.equal(result.match.id, "M1"); assert.equal(result.trailer, null);
  assert.equal(buildWorkOrderMachineLinkPatch(result).trailerId, undefined);
  assert.equal(trailerResolution(machine.data, [{ ...trailer, data: { ...trailer.data, associatedMachine: "Machine/MOTHER" } }]).trailer, null);
});
test("machine trailer declarations fail closed for wrong types, contradictory aliases, or missing trailer records", () => {
  for (const declaration of [
    { trailerId: "AIS20", trailer: "Trailers/AIS21" }, { trailer: "Machine/AIS20" },
    { trailer: { path: "Trailers/AIS20", id: "AIS21" } }, { trailerId: ["AIS20"] },
    { trailer: { path: "Trailers/AIS20/History/H1" } },
  ]) {
    const result = trailerResolution({ ...machine.data, ...declaration });
    assert.equal(result.match, null); assert.equal(result.reason, "bluefolder_trailer_identity_conflict");
    assert.deepEqual(buildWorkOrderMachineLinkPatch(result), {});
  }
  const result = trailerResolution({ ...machine.data, trailerId: "AIS20" }, []);
  assert.equal(result.reason, "bluefolder_trailer_missing"); assert.equal(result.match, null);
  assert.deepEqual(buildWorkOrderMachineLinkPatch(resolve([{ ...machine, data: { ...machine.data, trailerId: "AIS20" } }], identity, opts)), {}, "pure machine match cannot silently drop a declared trailer");
});
test("trailer machine aliases must identify the same typed live machine", () => {
  for (const data of [
    { ...trailer.data, machineId: "M2" }, { ...trailer.data, machineId: "Trailers/M1" },
    { ...trailer.data, currentMachineId: "Machine/M2" }, { ...trailer.data, associatedMachine: null },
    { ...trailer.data, associatedMachine: { path: "Machine/M1", id: "M2" } },
  ]) {
    const result = trailerResolution({ ...machine.data, trailerId: "AIS20" }, [{ ...trailer, data }]);
    assert.equal(result.reason, "bluefolder_trailer_machine_mismatch"); assert.equal(result.match, null);
  }
  for (const field of ["associatedMachine", "associatedMachineId", "machine", "machineId", "currentMachineId"]) {
    const result = trailerResolution(machine.data, [{ ...trailer, data: { currentClientId: "C1", [field]: "/Machine/M1" } }]);
    assert.equal(result.trailer.id, "AIS20");
  }
});
test("trailer client aliases must agree and match the selected site", () => {
  for (const data of [
    { ...trailer.data, currentClientId: "C2" }, { ...trailer.data, clientId: "C2" },
    { ...trailer.data, locationCurrentId: "Machine/C1" }, { ...trailer.data, currentClient: "Client/C2" },
    { ...trailer.data, currentClient: null }, { ...trailer.data, currentClient: ["C1"] },
  ]) {
    const result = trailerResolution(machine.data, [{ ...trailer, data }]);
    assert.equal(result.reason, "bluefolder_trailer_client_mismatch"); assert.equal(result.match, null);
  }
});
test("duplicate trailer claims, even archived ones, never become a machine-only match", () => {
  for (const otherData of [trailer.data, { ...trailer.data, archived: true }, { ...trailer.data, currentClientId: "C2" }]) {
    const result = trailerResolution(machine.data, [trailer, { id: "AIS21", data: otherData }]);
    assert.equal(result.reason, "bluefolder_trailer_duplicate_mapping"); assert.equal(result.match, null);
  }
  for (const flag of [{ deletedAt: "2026-09-24" }, { archivedAt: "2026-09-24" }, { deleted: true }, { archived: true }]) {
    const result = trailerResolution(machine.data, [{ ...trailer, data: { ...trailer.data, ...flag } }]);
    assert.equal(result.reason, "bluefolder_trailer_unavailable"); assert.equal(result.match, null);
  }
});
test("machine client relationships never accept IDs from another collection", () => {
  for (const data of [{ ...machine.data, client: "Machine/C1" }, { ...machine.data, clientId: "Trailers/C1" }]) {
    assert.equal(resolve([{ ...machine, data }], identity, opts).match, null);
  }
});
