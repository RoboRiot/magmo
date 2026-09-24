const test=require('node:test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const modulePromise=import(pathToFileURL(path.join(__dirname,'../scripts/repair-reviewed-work-order-machine-links-2026-09-24.mjs')).href);
function fixture(){
 const branch={schemaVersion:2,associationType:'site',clientId:'AIS50849',clientNameSnapshot:'Ramin Ashtiani',machineId:'',machineNameSnapshot:'',trailerId:'',trailerNameSnapshot:'',effectiveAt:'2026-09-24T16:28:18.736Z',effectiveAtSource:'work-order-add',resolutionSource:'magmo-work-order'};
 const itemData={name:'Existing inventory',sn:'KEEP-123',pn:'KEEP-PN',photos:['preserved.jpg'],ClientCurrent:{$ref:'Client/AIS50849'},clientCurrentId:'AIS50849',associationCurrent:branch,currentAssociationType:'site',associationFrom:{associationType:'machine',clientId:'AIS17182',machineId:'AIS42516'},MachineFrom:{$ref:'Machine/AIS42516'},workOrders:[{workOrder:'10364',date:'2026-08-07'},{workOrder:'10664',date:'2026-09-24'}],movementDate:'2026-09-24',movementDateType:'departure',departure_date:'2026-09-24',arrival_date:'',newLocalFrom:{pallet:56},newLocalCurrent:{},selectionHistory:[{important:'keep selection history'}],saveHistory:[{important:'keep save history'}],other:{nested:['keep']} };
 const originalAudit={workOrderId:'10664',movementMode:'current_at_work_order',operationId:'d9b82454-b138-4a35-a360-fc0c352ba026',afterConfiguration:{associationCurrent:structuredClone(branch)}};
 return {itemId:'AIS36635',itemData,originalAudit,mapping:{machineId:'AIS21467',machineName:'AQ64 CT',clientId:'AIS50849'},nowIso:'2026-09-24T18:00:00.000Z',machineRef:{$ref:'Machine/AIS21467'}};
}
test('narrow repair preserves all unrelated fields, movement dates, previous histories and work orders',async()=>{
 const {buildItemMachineRepair}=await modulePromise;const input=fixture();const before=structuredClone(input);const {patch,audit}=buildItemMachineRepair(input);const next={...input.itemData,...patch};
 assert.deepEqual(input,before,'builder must not mutate its inputs');
 assert.equal(next.associationCurrent.machineId,'AIS21467');assert.equal(next.associationCurrent.associationType,'machine');assert.equal(next.MachineCurrent.$ref,'Machine/AIS21467');assert.equal(next.machineCurrentId,'AIS21467');
 assert.equal(next.associationCurrent.effectiveAt,before.itemData.associationCurrent.effectiveAt,'correction must not invent a new physical movement date');
 for(const k of ['sn','pn','photos','associationFrom','MachineFrom','workOrders','movementDate','movementDateType','departure_date','arrival_date','newLocalFrom','newLocalCurrent','other'])assert.deepEqual(next[k],before.itemData[k],k);
 assert.deepEqual(next.selectionHistory.slice(0,1),before.itemData.selectionHistory);assert.equal(next.selectionHistory.length,3);assert.deepEqual(next.saveHistory.slice(0,1),before.itemData.saveHistory);assert.equal(next.saveHistory.length,2);
 assert.equal(audit.beforeConfiguration.associationCurrent.associationType,'site');assert.equal(audit.afterConfiguration.associationCurrent.machineId,'AIS21467');assert.equal(audit.workOrderAssignmentAdded,false);assert.equal(audit.originalOperationId,input.originalAudit.operationId);
 assert.equal(next.selectionHistory.at(-1).currentMachineId,'AIS21467');assert.equal(next.selectionHistory.at(-2).currentMachineId,'');
});
test('refuses to overwrite a manually selected machine',async()=>{
 const {buildItemMachineRepair}=await modulePromise;const input=fixture();input.itemData.MachineCurrent={$ref:'Machine/MANUAL'};assert.throws(()=>buildItemMachineRepair(input),/later machine/);
});
test('refuses a changed association even when still site-only',async()=>{
 const {buildItemMachineRepair}=await modulePromise;const input=fixture();input.itemData.associationCurrent.effectiveAt='2026-09-24T17:00:00Z';assert.throws(()=>buildItemMachineRepair(input),/changed since/);
});
test('refuses conflicting client aliases and malformed histories',async()=>{
 const {buildItemMachineRepair}=await modulePromise;const changedClient=fixture();changedClient.itemData.clientCurrentId='OTHER';assert.throws(()=>buildItemMachineRepair(changedClient),/client fields disagree/);
 for(const key of ['selectionHistory','saveHistory','workOrders']){const input=fixture();input.itemData[key]={malformed:true};assert.throws(()=>buildItemMachineRepair(input),/Malformed/);}
});
test('refuses different item, work-order receipt, or removed work-order assignment',async()=>{
 const {buildItemMachineRepair}=await modulePromise;let input=fixture();input.itemId='AIS21032';assert.throws(()=>buildItemMachineRepair(input),/outside fixed/);
 input=fixture();input.originalAudit.workOrderId='OTHER';assert.throws(()=>buildItemMachineRepair(input),/receipt mismatch/);
 input=fixture();input.itemData.workOrders=[];assert.throws(()=>buildItemMachineRepair(input),/no longer assigned/);
});
