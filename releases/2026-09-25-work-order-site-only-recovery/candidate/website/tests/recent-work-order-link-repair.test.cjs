const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const loaded=import('../scripts/repair-recent-work-order-links-2026-09-25.mjs');
const EQ='09859C69-CD50-4277-BB40-60A696300768';
function fixture(){return{
 target:{id:'10658',clientId:'AIS94688',machineId:'',trailerId:'',customerId:'34579389',locationId:'39226291',equipmentIds:[]},
 wo:{workOrderId:'10658',bluefolderServiceRequestId:'10658',createdAtIso:'2026-09-22T22:35:51.627Z',subject:'Keep subject',workflowStatus:'complete',history:[{preserve:true}],slackThreadTs:'123.456'},
 bf:{id:'10658',number:'10658',customerId:'34579389',customerLocationId:'39226291',customer:'AIS',customerLocationName:'AIS - Lake Forest',equipmentIds:[],equipmentNames:[]},
 clients:[{id:'AIS94688',ref:{path:'Client/AIS94688'},data:{name:'AIS - Lake Forest',bluefolderCustomerId:'34579389',bluefolderLocationId:'39226291',bluefolderLocationAliasKeys:['34579389:39226291']}}],
 machines:[],trailers:[],nowIso:'2026-09-25T20:00:00Z'
};}
test('review is fixed to this repair and date range with unique bounded explicit targets',async()=>{
 const m=await loaded;const review={repairId:m.REPAIR_ID,cutoff:m.CUTOFF,targets:[fixture().target]};m.validateReview(review);
 assert.throws(()=>m.validateReview({...review,repairId:'other'}));assert.throws(()=>m.validateReview({...review,cutoff:'2020-01-01'}));
 assert.throws(()=>m.validateReview({...review,targets:[...review.targets,...review.targets]}));assert.throws(()=>m.validateReview({...review,targets:[]}));
});
test('10658 site-only plan sets exact client but neither equipment selection nor item/history/workflow',async()=>{
 const m=await loaded,input=fixture(),before=structuredClone(input),patch=m.planReviewedLink(input);
 assert.equal(patch.clientId,'AIS94688');assert.equal(patch.clientLinkMatchReason,'bluefolder_location_alias');
 assert(!Object.hasOwn(patch,'bluefolderEquipmentIds'));assert(!Object.hasOwn(patch,'machineId'));assert(!Object.hasOwn(patch,'trailerId'));
 for(const key of ['subject','history','workflowStatus','slackThreadTs','items','assignees'])assert(!Object.hasOwn(patch,key));
 assert.deepEqual(input,before);assert.equal(patch.recentLinksRepairId,m.REPAIR_ID);
 assert(Object.keys(patch).every(key=>m.ALLOWED_PATCH_KEYS.includes(key)));
});
test('review rejects changed live BF identity, selection, date, or deleted work order',async()=>{
 const m=await loaded;
 for(const mutate of [x=>x.bf.id='other',x=>x.bf.number='other',x=>x.wo.number='10659',x=>x.bf.customerId='other',x=>x.bf.customerLocationId='other',x=>x.bf.equipmentIds=[EQ],x=>x.wo.createdAtIso='2026-08-01',x=>x.wo.createdAtIso='2030-01-01',x=>x.wo.createdAtIso='invalid',x=>x.wo.deletedAt='today',x=>x.wo.archived=true]){const input=fixture();mutate(input);assert.throws(()=>m.planReviewedLink(input));}
});
test('existing manual assets, conflicting clients/references and changed source identity remain untouched',async()=>{
 const m=await loaded;
 for(const[field,value]of [['machineId','AIS1'],['machineId',false],['machineId',0],['machineRef',{path:'Machine/AIS1'}],['trailerId','AIS20'],['trailerRef',{path:'Trailers/AIS20'}],['clientId','AIS2'],['clientRef',{path:'Machine/AIS94688'}],['bluefolderCustomerId','other'],['bluefolderLocationId','other'],['bluefolderEquipmentIds',[EQ]]]){
  const input=fixture();input.wo[field]=value;const before=structuredClone(input);assert.throws(()=>m.planReviewedLink(input));assert.deepEqual(input,before);
 }
});
test('site matching requires unique active identity, never name-only or new client creation',async()=>{
 const m=await loaded;
 for(const mutate of [x=>x.clients=[],x=>{x.clients[0].data={name:'AIS - Lake Forest'}},x=>x.clients[0].data.archived=true,x=>x.clients.push({...x.clients[0],id:'AIS12345'}),x=>{delete x.clients[0].data.bluefolderLocationAliasKeys;x.clients[0].data.bluefolderCustomerId='other';}]){const input=fixture();mutate(input);assert.throws(()=>m.planReviewedLink(input));}
});
test('reviewed selected equipment produces machine stamp and rejects conflicting or duplicate mapping',async()=>{
 const m=await loaded,input=fixture();input.target.machineId='AIS32820';input.target.equipmentIds=[EQ];input.bf.equipmentIds=[EQ];input.bf.equipmentNames=['Espree'];
 input.machines=[{id:'AIS32820',ref:{path:'Machine/AIS32820'},data:{name:'Siemens espree MR',client:{path:'Client/AIS94688'},bluefolderEquipmentId:EQ}}];
 const patch=m.planReviewedLink(input);assert.equal(patch.machineId,'AIS32820');assert.deepEqual(patch.machineLinkEquipmentIds,[EQ]);assert.deepEqual(patch.bluefolderEquipmentIds,[EQ]);
 assert(Object.keys(patch).every(key=>m.ALLOWED_PATCH_KEYS.includes(key)));
 const wrong=structuredClone(input);wrong.machines[0].data.client={path:'Client/AIS2'};assert.throws(()=>m.planReviewedLink(wrong));
 const duplicate=structuredClone(input);duplicate.machines.push({...duplicate.machines[0],id:'AIS33333'});assert.throws(()=>m.planReviewedLink(duplicate));
});
test('existing correct client is retained while only its missing selected equipment is added',async()=>{
 const m=await loaded,input=fixture();input.wo.clientId='AIS94688';input.wo.clientRef={path:'Client/AIS94688'};
 input.target.machineId='AIS32820';input.target.equipmentIds=[EQ];input.bf.equipmentIds=[EQ];input.bf.equipmentNames=['Espree'];
 input.machines=[{id:'AIS32820',data:{name:'Espree',clientId:'AIS94688',bluefolderEquipmentId:EQ}}];
 const patch=m.planReviewedLink(input);assert(!Object.hasOwn(patch,'clientId'));assert(!Object.hasOwn(patch,'clientRef'));assert.equal(patch.machineId,'AIS32820');
});
test('repair writes are confined to work orders and its new receipt; backup and exact preimages required',()=>{
 const source=fs.readFileSync(path.join(__dirname,'../scripts/repair-recent-work-order-links-2026-09-25.mjs'),'utf8');
 assert.match(source,/verifyBackupManifest\(manifestPath\)/);assert.match(source,/Changed after preimage/);assert.match(source,/Unexpected post-repair change/);
 assert.match(source,/tx\.update\(db\.doc\(`OpsWorkOrders\//);assert.match(source,/inventoryItemsModified:0/);assert.match(source,/directoryDocumentsModified:0/);
 assert.doesNotMatch(source,/db\.collection\(['"]Test['"]\)/);assert.doesNotMatch(source,/(?:update|set|create|delete)\(db\.doc\([`'"](?:Test|Client|Machine|Trailers)\//);
});
