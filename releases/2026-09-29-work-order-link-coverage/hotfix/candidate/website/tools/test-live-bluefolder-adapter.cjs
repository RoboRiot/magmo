"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),test=require("node:test");
const out=path.join(__dirname,process.env.WO_LINK_DRAFT||"candidate");
const createPayload=require(path.join(out,"work-order-link/lib/ops/workOrderSourceLinkPayload.cjs")).createSourceLinkPayload;
const createLookup=require(path.join(out,"work-order-link/lib/ops/workOrderSourceLookup.cjs")).createWorkOrderSourceLookup;
function fixture(xml=""){
  const calls=[],timeouts=[],env={BLUEFOLDER_API_TOKEN:"mock-test-token",BLUEFOLDER_BASE_URL:"https://invalid.example.invalid",BLUEFOLDER_WORK_ORDER_DETAIL_PATH:"https://invalid.example.invalid/unsafe"};
  const module={exports:{}};
  new Function("require","module","exports","process","fetch","setTimeout","clearTimeout",fs.readFileSync(path.join(out,"work-order-link/lib/bluefolder/client.js"),"utf8"))(require,module,module.exports,{env},async(url,options)=>{calls.push({url:String(url),method:options.method,body:options.body});return{ok:true,status:200,headers:{get:()=>"text/xml"},text:async()=>xml};},(_cb,ms)=>{timeouts.push(ms);return 1;},()=>{});
  return{api:module.exports,calls,timeouts,env};
}
const settings={bluefolderBaseUrl:"https://app.bluefolder.com/api/2.0",bluefolderWorkOrderUrlTemplate:"https://example.invalid/{id}"};
test("exact active BlueFolder factory exposes correct settings/extractor/client bindings",()=>{
  const{api}=fixture();assert.equal(typeof api.getBlueFolderSlackSettings,"function");assert.equal(typeof api.extractWorkOrderFields,"function");assert.equal(typeof api.BlueFolderClient.prototype.getWorkOrder,"function");assert.equal(typeof api.createBlueFolderClient(settings).getWorkOrder,"function");assert.equal(api.extractWorkOrderFields({serviceRequestId:"10698"},settings).id,"10698");
});
test("actual active extractor handles all direct and nested selected-equipment representations without losing omission",()=>{
  const {api}=fixture(),project=createPayload(api.extractWorkOrderFields);
  for(const fields of [{equipmentId:"E1"},{equipment_id:"E1"},{EquipmentID:"E1"},{equipmentToService:{equipmentItem:{equipmentId:"E1",equipName:"Scanner"}}},{EquipmentItems:[{equipmentID:"E1",name:"Scanner"}]},{equipmentItem:[{equipment_id:"E1",name:"Scanner"}]},{equipmentIds:["E1"]}]){
    let payload;try{payload=project("10698",{serviceRequestId:"10698",customerId:"C",locationId:"L",...fields},settings);}catch(error){error.message+=" "+JSON.stringify(fields);throw error;}assert.deepEqual(payload.blueFolder.equipmentIds,["E1"],JSON.stringify(fields));assert.equal(payload.blueFolder.customerLocationId,"L");
  }
  assert(!Object.hasOwn(project("10698",{serviceRequestId:"10698"},settings).blueFolder,"equipmentIds"));
  assert.deepEqual(project("10698",{serviceRequestId:"10698",equipmentToService:{}},settings).blueFolder.equipmentIds,[]);
  assert.throws(()=>project("10698",{serviceRequestId:"10698",equipmentToService:{unexpected:"value"}},settings),e=>e.code==="bluefolder_equipment_identity_invalid");
  assert.throws(()=>project("10698",{serviceRequestId:"10698",equipmentItem:[{id:"E1"}]},settings),e=>e.code==="bluefolder_equipment_identity_invalid");
  assert.throws(()=>project("10698",{serviceRequestId:"10699"},settings),e=>e.code==="bluefolder_identity_conflict");
});
const xml=(equipment,id="10698")=>`<?xml version="1.0"?><response status="ok"><serviceRequest><serviceRequestId>${id}</serviceRequestId><customerId>123</customerId><customerLocationId>456</customerLocationId><customerName>Verified customer</customerName>${equipment}</serviceRequest></response>`;
test("real deployed client parses XML detail and source lookup pins host/path/8-second deadline",async()=>{
  const f=fixture(xml("<equipmentToService><equipmentItem><equipmentId>E1</equipmentId><equipName>Scanner</equipName></equipmentItem></equipmentToService>"));
  const lookup=createLookup({env:f.env,loadClient:()=>f.api}),result=await lookup("10698");
  assert.equal(result.ok,true);assert.deepEqual(result.payload.blueFolder.equipmentIds,["E1"]);assert.deepEqual(result.payload.blueFolder.equipmentNames,["Scanner"]);assert.equal(result.payload.blueFolder.customerLocationId,"456");
  assert.deepEqual(f.timeouts,[8000]);assert.equal(f.calls.length,1);assert.equal(f.calls[0].url,"https://app.bluefolder.com/api/2.0/serviceRequests/get.aspx");assert.equal(f.calls[0].method,"POST");assert.match(f.calls[0].body,/<serviceRequestId>10698<\/serviceRequestId>/);
  await lookup("10698");assert.equal(f.calls.length,1,"30-second source-detail cache prevents duplicate calls");
});
test("real deployed XML parser distinguishes absent and explicitly empty source equipment",async()=>{
  for(const[element,present]of [["",false],["<equipmentToService></equipmentToService>",true]]){
    const f=fixture(xml(element)),result=await createLookup({env:f.env,loadClient:()=>f.api})("10698");assert.equal(result.ok,true);assert.equal(Object.hasOwn(result.payload.blueFolder,"equipmentIds"),present);if(present)assert.deepEqual(result.payload.blueFolder.equipmentIds,[]);
  }
});
test("real detail request rejects a response for another work order before hydration",async()=>{
  const f=fixture(xml("","10699")),result=await createLookup({env:f.env,loadClient:()=>f.api})("10698");assert.equal(result.ok,false);assert.equal(result.reason,"bluefolder_identity_conflict");
});
