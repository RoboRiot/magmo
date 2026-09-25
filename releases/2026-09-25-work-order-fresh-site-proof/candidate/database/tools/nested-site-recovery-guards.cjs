"use strict";
const assert=require("node:assert/strict"),crypto=require("node:crypto");
const {resolveWorkOrderSiteLinkInTransaction}=require("../../lib/ops/workOrderSiteLink.cjs");
const {BLUE_FOLDER_STORED_IDENTITY_FIELDS}=require("../../lib/ops/blueFolderImportContract.cjs");
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==="object"?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
const sha=v=>crypto.createHash("sha256").update(JSON.stringify(stable(v))).digest("hex");
function decode(v={}){if("nullValue"in v)return null;for(const k of ["stringValue","referenceValue","timestampValue","booleanValue","doubleValue"])if(k in v)return v[k];if("integerValue"in v)return Number(v.integerValue);if("arrayValue"in v)return(v.arrayValue.values||[]).map(decode);if("mapValue"in v)return Object.fromEntries(Object.entries(v.mapValue.fields||{}).map(([k,x])=>[k,decode(x)]));return v;}
const decodeDoc=doc=>Object.fromEntries(Object.entries(doc.fields||{}).map(([k,v])=>[k,decode(v)]));
const id=doc=>doc.name.split("/").at(-1);
const populated=value=>value!==undefined&&value!==null&&value!==""&&(!Array.isArray(value)||value.length>0);
function assertSafeOrder(doc,target,{allowExpectedLinked=false}={}){
 const data=decodeDoc(doc);assert.equal(id(doc),target.id);assert.equal(String(data.number||target.id),target.id);
 const created=Date.parse(data.createdAtIso||data.createdAt||"");assert(Number.isFinite(created)&&created>=Date.parse("2026-08-26T07:00:00.000Z")&&created<=Date.now(),"Work order outside reviewed recent range");
 for(const field of ["workOrderId","bluefolderServiceRequestId"])if(populated(data[field]))assert.equal(String(data[field]),target.id);
 assert(!data.deletedAt&&!data.archivedAt&&data.deleted!==true&&data.archived!==true,"Unavailable work order");
 for(const field of ["machineId","machineRef","machineName","trailerId","trailerRef","trailerName","bluefolderEquipmentIds","bluefolderEquipmentNames"])assert(!populated(data[field]),"Existing asset/equipment: "+field);
 for(const field of ["equipmentIds","equipmentNames"])assert(!populated(data.blueFolder?.[field]),"Nested existing equipment: "+field);
 if(populated(data.clientId))assert(allowExpectedLinked&&data.clientId===target.expectedClientId,"Existing client must not be rebound");
 if(populated(data.clientRef)){assert(allowExpectedLinked,"Existing client must not be rebound");assert.equal(doc.fields.clientRef.referenceValue,doc.name.replace(/\/OpsWorkOrders\/[^/]+$/,"/Client/"+target.expectedClientId),"Exact Client document reference required");}
 for(const [field,expected]of[["bluefolderCustomerId",target.customerId],["bluefolderLocationId",target.locationId]])if(populated(data[field]))assert.equal(String(data[field]),expected,"Stored BlueFolder identity changed");
 return data;
}
function payloadFromRecord(record,target){
 assert.equal(record.service_request_id,target.id);assert.equal(record.number,target.id);assert.equal(record.bluefolder_customer_id,target.customerId);assert.equal(record.bluefolder_location_id,target.locationId);assert.equal(record.existing_only,true);
 assert(!("bluefolder_equipment_ids"in record)&&!("bluefolder_equipment_names"in record),"Equipment omission required");
 const map={bluefolder_customer_id:"customerId",bluefolder_customer_name:"customerName",bluefolder_location_id:"customerLocationId",bluefolder_location_name:"customerLocationName",bluefolder_address_street:"addressStreet",bluefolder_address_city:"addressCity",bluefolder_address_state:"addressState",bluefolder_address_postal_code:"addressPostalCode",bluefolder_address_country:"addressCountry"};
 const allowed=new Set(["service_request_id","number","existing_only",...Object.keys(map)]);assert(Object.keys(record).every(k=>allowed.has(k)),"Unsafe import field");
 return{eventType:"work_order.imported",workOrderId:target.id,number:target.id,existingOnly:true,blueFolder:{serviceRequestId:target.id,...Object.fromEntries(Object.entries(map).filter(([k])=>record[k]).map(([k,v])=>[v,record[k]]))}};
}
function memoryDirectory(documents){
 const values=new Map(documents.map(doc=>[id(doc),decodeDoc(doc)]));
 function ref(key){return{kind:"doc",id:key,path:"Client/"+key};}
 function snap(key){return{id:key,ref:ref(key),exists:values.has(key),data:()=>values.get(key)};}
 function query(filters=[],bound=Infinity){return{kind:"query",filters,bound,where:(field,op,value)=>query([...filters,{field,op,value}],bound),limit:n=>query(filters,n),doc:ref};}
 const db={collection:name=>{assert.equal(name,"Client");return query();}};
 const transaction={get:async target=>target.kind==="doc"?snap(target.id):{docs:[...values.keys()].filter(key=>target.filters.every(f=>f.op==="=="?values.get(key)[f.field]===f.value:Array.isArray(values.get(key)[f.field])&&values.get(key)[f.field].includes(f.value))).slice(0,target.bound).map(snap)}};
 return{values,db,transaction};
}
async function planSites(documents,targets,records){
 const memory=memoryDirectory(documents),creations=new Map(),plans=[];
 for(const target of targets){const record=records.find(row=>row.service_request_id===target.id);assert(record,"Missing fresh source record");const payload=payloadFromRecord(record,target);
  const resolved=await resolveWorkOrderSiteLinkInTransaction(memory.transaction,memory.db,payload,{linkedAtIso:"reviewed-plan-time"});
  assert.equal(resolved.patch.clientId,target.expectedClientId,"Site helper no longer matches reviewed target: "+target.id+" ("+resolved.reason+")");
  if(resolved.creation){assert.equal(resolved.creation.ref.id,target.expectedClientId);assert.equal(resolved.creation.data.bluefolderParentClientId,target.parentClientId);assert(!memory.values.has(target.expectedClientId));creations.set(target.expectedClientId,resolved.creation.data);memory.values.set(target.expectedClientId,resolved.creation.data);}
  else{const current=memory.values.get(target.expectedClientId);assert(current);assert.equal(current.bluefolderCustomerId,target.customerId);assert.equal(current.bluefolderLocationId,target.locationId);assert.equal(current.bluefolderParentClientId,target.parentClientId);}
  plans.push({id:target.id,clientId:resolved.patch.clientId,reason:resolved.reason,createsClient:Boolean(resolved.creation)});
 }
 return{plans,creations};
}
const allowedOrderFields=new Set(["workOrderId","number","bluefolderServiceRequestId","bluefolderImportSource","bluefolderImportFingerprint","bluefolderImportUpdatedAt","bluefolderImportUpdatedAtIso","updatedAt","clientId","clientRef","clientName","clientLocation","clientLinkSource","clientLinkMatchReason","clientLinkedAtIso","connectionsUpdatedAt","connectionsUpdatedBy",...BLUE_FOLDER_STORED_IDENTITY_FIELDS.map(row=>row[1])]);
function verifyOrder(before,after,target){
 assertSafeOrder(after,target,{allowExpectedLinked:true});const data=decodeDoc(after);assert.equal(data.clientId,target.expectedClientId);assert.equal(String(data.clientRef||"").split("/").at(-1),target.expectedClientId);
 const changed=[...new Set([...Object.keys(before.fields),...Object.keys(after.fields)])].filter(k=>sha(before.fields[k]??null)!==sha(after.fields[k]??null));assert(changed.every(k=>allowedOrderFields.has(k)),"Unexpected work-order fields changed: "+changed.filter(k=>!allowedOrderFields.has(k)).join(","));
 return{workOrderId:target.id,clientId:data.clientId,changedFields:changed.sort(),workflowAssetsHistoryPreserved:true};
}
function verifyClients(before,after,creations){
 const beforeMap=new Map(before.map(doc=>[id(doc),doc])),afterMap=new Map(after.map(doc=>[id(doc),doc]));
 for(const[key,doc]of beforeMap){assert(afterMap.has(key),"Existing client removed");assert.equal(sha(doc.fields),sha(afterMap.get(key).fields),"Existing client modified: "+key);}
 const created=[...afterMap.keys()].filter(key=>!beforeMap.has(key)).sort();assert.deepEqual(created,[...creations.keys()].sort(),"Unexpected Client creation set");
 for(const key of created){const actual=decodeDoc(afterMap.get(key)),expected=creations.get(key);for(const field of["createdAt","bluefolderSiteCreatedAtIso"]){assert.equal(typeof actual[field],"string");assert(Number.isFinite(Date.parse(actual[field])));delete actual[field];}const planned={...expected};delete planned.createdAt;delete planned.bluefolderSiteCreatedAtIso;assert.deepEqual(stable(actual),stable(planned),"Created client differs from verified directory proof: "+key);}
 return{createdClientIds:created,existingClientsUnchanged:true,createdClientsMatchReviewedDirectoryProof:true};
}
module.exports={stable,sha,decodeDoc,id,assertSafeOrder,payloadFromRecord,planSites,verifyOrder,verifyClients};
