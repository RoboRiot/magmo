"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const path=require("node:path");
const {pathToFileURL}=require("node:url");
const modulePromise=import(pathToFileURL(path.join(__dirname,"../scripts/repair-work-order-10659-trailer-link-2026-09-24.mjs")).href);
const EQUIPMENT="EC91B7DD-18D1-487C-B4E6-9F43EA837248";
function fixture(){
 const machine={name:"Trailer AIS20 - HDxt 23x",Model:"Current local model",client:{path:"Client/AIS78594"},trailerId:"AIS20"};
 return {wo:{clientId:"AIS78594",clientRef:{path:"Client/AIS78594"},bluefolderServiceRequestId:"10659",bluefolderCustomerId:"34579389",bluefolderLocationId:"35057812",workflowStatus:"unassigned",assignmentHistory:[{keep:"history"}]},machine,trailer:{name:"AIS20 - HDxt 23x",associatedMachine:{path:"Machine/AIS82553"},currentClient:{path:"Client/AIS78594"},locationHistory:[{keep:"placement"}]},client:{bluefolderCustomerId:"34579389",bluefolderLocationId:"35057812"},blueFolder:{id:"10659",equipmentIds:[EQUIPMENT],equipmentNames:["Mobile #20 older model label"],customerId:"34579389",customerLocationId:"35057812"},machines:[{id:"AIS82553",data:machine}]};
}
test("reviewed Trailer20 validation is non-mutating and permits the documented older BF model label",async()=>{
 const {validateReviewedRecords}=await modulePromise,input=fixture(),before=structuredClone(input);
 validateReviewedRecords(input);assert.deepEqual(input,before);
});
test("reviewed repair rejects different work order, equipment selection, customer, or site",async()=>{
 const {validateReviewedRecords}=await modulePromise;
 for(const [field,value]of [["id","10660"],["equipmentIds",["OTHER"]],["equipmentIds",[EQUIPMENT,"OTHER"]],["customerId","other"],["customerLocationId","other"]]){
  const input=fixture();input.blueFolder[field]=value;assert.throws(()=>validateReviewedRecords(input),field);
 }
 for(const field of ["clientId","bluefolderServiceRequestId","bluefolderCustomerId","bluefolderLocationId"]){const input=fixture();input.wo[field]="other";assert.throws(()=>validateReviewedRecords(input),field);}
});
test("reviewed repair refuses to overwrite existing conflicting machine or trailer links",async()=>{
 const {validateReviewedRecords}=await modulePromise;
 for(const [field,value]of [["machineId","OTHER"],["machineRef",{path:"Machine/OTHER"}],["trailerId","OTHER"],["trailerRef",{path:"Trailers/OTHER"}],["clientRef",{path:"Client/OTHER"}]]){
  const input=fixture();input.wo[field]=value;assert.throws(()=>validateReviewedRecords(input),field);
 }
});
test("reviewed repair rejects wrong collection and nested relationship paths",async()=>{
 const {validateReviewedRecords}=await modulePromise;
 for(const [field,value]of [["machineRef",{path:"Trailers/AIS82553"}],["trailerRef",{path:"Machine/AIS20"}],["clientRef",{path:"Machine/AIS78594"}],["machineRef",{path:"Machine/AIS82553/History/a"}]]){
  const input=fixture();input.wo[field]=value;assert.throws(()=>validateReviewedRecords(input),field);
 }
});
test("reviewed repair accepts existing exact asset links without changing their metadata",async()=>{
 const {validateReviewedRecords}=await modulePromise,input=fixture();
 Object.assign(input.wo,{machineId:"AIS82553",machineRef:{path:"Machine/AIS82553"},trailerId:"AIS20",trailerRef:{path:"Trailers/AIS20"},bluefolderEquipmentIds:[EQUIPMENT.toLowerCase()]});
 input.machine.bluefolderEquipmentId=EQUIPMENT.toLowerCase();const before=structuredClone(input);
 validateReviewedRecords(input);assert.deepEqual(input,before);
});
test("reviewed repair rejects archived/deleted targets and changed local names",async()=>{
 const {validateReviewedRecords}=await modulePromise;
 for(const target of ["wo","machine","trailer","client"])for(const flag of ["deleted","deletedAt","archived","archivedAt"]){const input=fixture();input[target][flag]=true;assert.throws(()=>validateReviewedRecords(input),`${target}.${flag}`);}
 for(const target of ["machine","trailer"]){const input=fixture();input[target].name="Manually renamed";assert.throws(()=>validateReviewedRecords(input));}
});
test("reviewed repair rejects conflicting or duplicate equipment IDs including archived mixed-case claims",async()=>{
 const {validateReviewedRecords}=await modulePromise;
 for(const field of ["bluefolderEquipmentId","blueFolderEquipmentId"]){
  const conflict=fixture();conflict.machine[field]="OTHER";assert.throws(()=>validateReviewedRecords(conflict));
  for(const archived of [false,true]){const duplicate=fixture();duplicate.machines.push({id:"ANOTHER-MACHINE",data:{[field]:EQUIPMENT.toLowerCase(),archived}});assert.throws(()=>validateReviewedRecords(duplicate));}
 }
});
