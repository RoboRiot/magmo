"use strict";
const assert=require("node:assert/strict"),g=require("./nested-site-recovery-guards.cjs");
const ids=a=>[...new Set((a||[]).map(v=>String(v).trim().toUpperCase()))].sort(),names=a=>[...(a||[])].sort();
const populated=v=>v!==undefined&&v!==null&&!(typeof v==="string"&&!v.trim());
function assertApiReceipt(receipt,revision){
 assert.equal(receipt.state,"ACTIVE");assert.equal(receipt.revision,revision);assert(/^nextserverwest-\d+-[a-z0-9]+$/.test(revision));assert.notEqual(revision,"nextserverwest-00060-tod");assert.equal(receipt.originalRevision,"nextserverwest-00060-tod","Unexpected fresh-proof API baseline");assert.equal(receipt.unrelatedConfigurationPreserved,true);assert.equal(receipt.configHash,"de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc");assert(/^[a-f0-9]{64}$/.test(receipt.artifactSHA256));const source=receipt.deployedSource?.storageSource;assert.equal(source?.bucket,"gcf-v2-sources-177857525147-us-west2");assert.equal(source?.object,"nextServerWest/function-source.zip");assert(/^\d+$/.test(source?.generation||""));assert.notEqual(source.generation,"1790366275981207","Fresh-proof source required");return receipt;
}
function assertImportResult(result,target,pendingClientOrderIds=[]){
 assert.equal(result.created,false);const after=result.after;assert(after);assert.equal(after.clientId,target.expectedClientId);for(const k of["machineId","machineRef","trailerId","trailerRef"])assert(!populated(after[k]),"Unexpected imported asset:"+k);assert.equal(after.equipmentLinkStatus,target.expectedStatus);
 const transient=after.equipmentLinkIssue==="work_order_client_missing"&&target.expectedStatus==="unresolved"&&target.equipmentIds.length>0&&pendingClientOrderIds.includes(target.id);
 assert(transient||after.equipmentLinkIssue===target.expectedIssue,"Unexpected import resolution issue:"+target.id);return{transientPendingClientAck:transient};
}
function assertOrder(doc,target){
 const d=g.decodeDoc(doc);assert.equal(g.id(doc),target.id);assert.equal(String(populated(d.number)?d.number:target.id),target.id);for(const k of["workOrderId","bluefolderServiceRequestId"])if(populated(d[k]))assert.equal(String(d[k]),target.id);
 const created=Date.parse(d.createdAtIso||d.createdAt||"");assert(Number.isFinite(created)&&created>=Date.parse("2026-08-26T07:00:00Z")&&created<=Date.now());assert(!d.deletedAt&&!d.archivedAt&&!d.deleted&&!d.archived);
 for(const k of["machineId","machineRef","machineName","trailerId","trailerRef","trailerName"])assert(!populated(d[k]),"Existing asset must be preserved:"+k);
 if(populated(d.clientId))assert.equal(d.clientId,target.expectedClientId,"Different existing client");if(populated(d.clientRef))assert.equal(doc.fields.clientRef.referenceValue,doc.name.replace(/\/OpsWorkOrders\/[^/]+$/,"/Client/"+target.expectedClientId),"Exact typed Client ref required");
 for(const[k,v]of[["bluefolderCustomerId",target.customerId],["bluefolderLocationId",target.locationId]])if(populated(d[k]))assert.equal(d[k],v);
 assert.deepEqual(ids(d.bluefolderEquipmentIds),ids(target.equipmentIds),"Stored selected IDs differ/missing");assert.deepEqual(names(d.bluefolderEquipmentNames),names(target.equipmentNames),"Stored selected names differ/missing");
 return d;
}
function equipmentless(doc){const clone=structuredClone(doc);delete clone.fields.bluefolderEquipmentIds;delete clone.fields.bluefolderEquipmentNames;if(clone.fields.blueFolder?.mapValue?.fields){delete clone.fields.blueFolder.mapValue.fields.equipmentIds;delete clone.fields.blueFolder.mapValue.fields.equipmentNames;}return clone;}
function verifyOrder(before,after,target){assertOrder(before,target);assertOrder(after,target);for(const k of["bluefolderEquipmentIds","bluefolderEquipmentNames","blueFolder"])assert.equal(g.sha(before.fields[k]??null),g.sha(after.fields[k]??null),"Selection fields must remain byte-identical");const verified=g.verifyOrder(equipmentless(before),equipmentless(after),target);return{...verified,selectedEquipmentPreserved:true,expectedEquipmentStatus:target.expectedStatus};}
function restValue(v){if(v===null)return{nullValue:null};if(typeof v==="string")return{stringValue:v};if(typeof v==="boolean")return{booleanValue:v};if(Array.isArray(v))return{arrayValue:{values:v.map(restValue)}};if(v&&typeof v==="object")return{mapValue:{fields:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,restValue(x)]))}};throw Error("Unsupported proof type");}
async function planClients(documents,proof,records){
 const simulated=structuredClone(documents),parents=new Map();
 for(const site of proof.sites){
  assert.equal(site.location.isPrimary,false);assert.equal(site.location.bluefolderLocationId,site.locationId);assert(site.location.name&&site.location.addressStreet&&site.location.city);
  const parent=simulated.find(d=>g.id(d)===site.parentClientId);assert(parent,"Reviewed parent missing");const pd=g.decodeDoc(parent);assert.equal(pd.bluefolderCustomerId,site.customerId);assert(!pd.bluefolderInactive&&!pd.deletedAt&&!pd.archivedAt);parents.set(site.parentClientId,true);
  const roots=documents.filter(d=>{const p=g.decodeDoc(d);return(p.bluefolderCustomerId||p.blueFolderCustomerId)===site.customerId&&!p.bluefolderParentClientId&&!p.deletedAt&&!p.archivedAt&&!p.bluefolderInactive;});assert.equal(roots.length,1,"Duplicate exact customer roots");assert.equal(g.id(roots[0]),site.parentClientId);
  const old=Array.isArray(pd.bluefolderLocations)?pd.bluefolderLocations:[],existing=old.filter(l=>l.bluefolderLocationId===site.locationId);assert(existing.length<=1);if(existing.length)assert.deepEqual(g.stable(existing[0]),g.stable(site.location),"Existing cache proof conflicts");else parent.fields.bluefolderLocations=restValue([...old,site.location]);
 }
 assert.equal(parents.size,4);
 return await g.planSites(simulated,proof.targets,records);
}
function assertLeaf(doc,site){
 assert(doc,"Expected reviewed leaf missing");const d=g.decodeDoc(doc);assert.equal(g.id(doc),site.expectedClientId);assert.equal(d.bluefolderCustomerId,site.customerId);assert.equal(d.bluefolderLocationId,site.locationId);assert.equal(d.bluefolderParentClientId,site.parentClientId);assert.equal(d.name,site.location.name);assert.equal(d.bluefolderSiteSource,"verified_nested_location");assert.deepEqual(d.bluefolderLocationAliasKeys,[site.customerId+":"+site.locationId]);assert.deepEqual(d.machines,[]);assert(!d.deletedAt&&!d.archivedAt&&!d.deleted&&!d.archived&&!d.bluefolderInactive);
 assert.deepEqual(g.stable(d.bluefolderLocations),g.stable([site.location]));assert.equal(d.address?.street,site.location.addressStreet);assert.equal(d.address?.city,site.location.city);assert.equal(d.address?.state,site.location.state);assert.equal(d.address?.postalCode,site.location.postalCode);assert.equal(d.address?.country,site.location.country);assert.equal(d.location,site.location.formattedAddress);
}
async function verifyInventoryDestinations(orders,clients,targets){
 const {resolveWorkOrderDestination}=require("../../lib/inventory/workOrderAddService.cjs");
 const documents=new Map([...orders,...clients].map(d=>[d.name.split("/documents/")[1],d]));
 const db={collection:name=>{assert(["OpsWorkOrders","Client"].includes(name),"Unexpected asset/inventory read");return{doc:id=>({id,path:name+"/"+id})};}};
 const transaction={get:async ref=>{const d=documents.get(ref.path);return{id:ref.id,exists:Boolean(d),data:()=>g.decodeDoc(d)};}};
 const results=[];
 for(const target of targets){
  if(target.equipmentIds.length){await assert.rejects(resolveWorkOrderDestination(transaction,db,target.id,new Date().toISOString()),error=>error.code==="work_order_machine_not_linked");results.push({workOrderId:target.id,inventoryDestination:"blocked_missing_machine",expected:true});}
  else{const resolved=await resolveWorkOrderDestination(transaction,db,target.id,new Date().toISOString());assert.equal(resolved.association.clientId,target.expectedClientId);assert.equal(resolved.association.associationType,"site");assert(!resolved.association.machineId&&!resolved.association.trailerId);results.push({workOrderId:target.id,inventoryDestination:"site_ready",expected:true});}
 }
 return results;
}
module.exports={assertApiReceipt,assertImportResult,assertOrder,verifyOrder,planClients,assertLeaf,verifyInventoryDestinations,ids,names};
