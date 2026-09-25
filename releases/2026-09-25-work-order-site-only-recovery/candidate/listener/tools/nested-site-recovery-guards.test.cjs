"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const g=require("./nested-site-recovery-guards.cjs");
const t={id:"10658",customerId:"C1",locationId:"L1",expectedClientId:"AIS12345",parentClientId:"AIS10000"};
const doc=(key,fields)=>({name:"projects/test/databases/(default)/documents/"+key,fields});
const s=value=>({stringValue:value});
const before=()=>doc("OpsWorkOrders/10658",{number:s("10658"),createdAtIso:s("2026-09-01T00:00:00Z"),subject:s("unchanged"),workflowStatus:s("done"),bluefolderEquipmentIds:{arrayValue:{values:[]}}});
const record=()=>({service_request_id:"10658",number:"10658",existing_only:true,bluefolder_customer_id:"C1",bluefolder_location_id:"L1"});
test("metadata payload preserves equipment omission and rejects full imports",()=>{assert(!("equipmentIds"in g.payloadFromRecord(record(),t).blueFolder));assert.throws(()=>g.payloadFromRecord({...record(),bluefolder_equipment_ids:[]},t));assert.throws(()=>g.payloadFromRecord({...record(),subject:"not allowed"},t));});
test("preflight rejects manual assets, site rebinds, deleted orders and changed identity",()=>{g.assertSafeOrder(before(),t);for(const field of["machineId","machineRef","trailerId","trailerRef","machineName","clientId","clientRef"]){const d=before();d.fields[field]=s("manual");assert.throws(()=>g.assertSafeOrder(d,t));}const d=before();d.fields.deletedAt=s("2026-09-25");assert.throws(()=>g.assertSafeOrder(d,t));});
test("verification permits association/bookkeeping but not workflow/history/equipment changes",()=>{const a=before();a.fields.clientId=s(t.expectedClientId);a.fields.clientRef={referenceValue:"projects/test/databases/(default)/documents/Client/"+t.expectedClientId};a.fields.updatedAt={timestampValue:"2026-09-25T20:00:00Z"};assert(g.verifyOrder(before(),a,t).workflowAssetsHistoryPreserved);a.fields.workflowStatus=s("active");assert.throws(()=>g.verifyOrder(before(),a,t));});
test("client verification rejects overwrite, deletion or unrelated creation",()=>{const a=doc("Client/AIS1",{name:s("original")});assert(g.verifyClients([a],[a],new Map()).existingClientsUnchanged);assert.throws(()=>g.verifyClients([a],[],new Map()));assert.throws(()=>g.verifyClients([a],[doc("Client/AIS1",{name:s("changed")})],new Map()));assert.throws(()=>g.verifyClients([a],[a,doc("Client/AIS2",{})],new Map()));});
test("only recent records and correctly typed Client references can pass",()=>{const old=before();old.fields.createdAtIso=s("2025-09-01T00:00:00Z");assert.throws(()=>g.assertSafeOrder(old,t));const a=before();a.fields.clientId=s(t.expectedClientId);a.fields.clientRef=s(t.expectedClientId);assert.throws(()=>g.assertSafeOrder(a,t,{allowExpectedLinked:true}));a.fields.clientRef={referenceValue:"projects/test/databases/(default)/documents/Machine/"+t.expectedClientId};assert.throws(()=>g.assertSafeOrder(a,t,{allowExpectedLinked:true}));});
test("sequential memory planner creates repeated verified site once",async()=>{
 const {deterministicSiteClientId}=require("../../lib/ops/workOrderSiteLink.cjs");
 const expected=deterministicSiteClientId("C1","L1");
 const targets=[{...t,expectedClientId:expected},{...t,id:"10659",expectedClientId:expected}];
 const parent=doc("Client/AIS10000",{
  name:s("Parent"),bluefolderCustomerId:s("C1"),
  bluefolderLocations:{arrayValue:{values:[{mapValue:{fields:{
   bluefolderLocationId:s("L1"),name:s("Verified Site"),addressStreet:s("1 Main St"),city:s("City")
  }}}]}}
 });
 const planned=await g.planSites([parent],targets,[record(),{...record(),number:"10659",service_request_id:"10659"}]);
 assert.equal(planned.creations.size,1);
 assert.deepEqual(planned.plans.map(row=>row.createsClient),[true,false]);
});
