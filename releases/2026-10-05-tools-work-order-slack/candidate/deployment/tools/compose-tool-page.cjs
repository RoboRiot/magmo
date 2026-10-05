"use strict";
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),vm=require('vm');
const T=require('../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs');
const base=path.join(__dirname,'source/.next'),oracle=path.join(__dirname,'compiler-workspace-v1/compiler-output'),route='/NewSearch/Tools/[id]';
const bg=T.graph(base,route),fg=T.graph(oracle,route);
const bm=JSON.parse(T.read(path.join(base,'build-manifest.json')));
const oldPage=bm.pages[route].find(f=>f.includes('/pages/')),old=T.read(path.join(base,oldPage));
const oldId=53915,newId=16589,helperId=98100520;
const signature=s=>T.canonical(T.remap(s,new Map([...T.requiredIds(s)].map(id=>[id,0]))));
const map=new Map([[83011,37876],[97323,14232],[22190,50072],[44140,14873],[51653,74742],[78158,31394],[61772,44837],[66048,99431],[80290,94513],[38784,97923],[25508,39520],[60427,88504],[2996,89099],[10374,9306],[43991,59601],[12475,52321],[61014,23316],[92957,18447],[32918,81224],[5832,39982],[15061,44595],[99553,26617],[48922,helperId]]);
assert(fg.get(newId).includes('Tool Label Sent'));assert(bg.get(oldId).includes('Tool submitted to Slack successfully.'));
assert(fg.get(48922).includes('selectToolWorkOrderIndex'));assert.equal(T.requiredIds(fg.get(48922)).size,0);
const proof=[];
for(const [fresh,active]of map){
  if([48922,12475,92957].includes(fresh))continue;
  assert.equal(signature(fg.get(fresh)),signature(bg.get(active)),`Unrelated dependency changed ${fresh}->${active}`);
  // Wrapper bodies all look identical after remapping. Prove their actual
  // required implementation also matches, not merely the wrapper shape.
  if([83011,97323,2996].includes(fresh)){
    const fi=[...T.requiredIds(fg.get(fresh))][0],bi=[...T.requiredIds(bg.get(active))][0];
    assert.equal(signature(fg.get(fi)),signature(bg.get(bi)),`Wrapper implementation mismatch ${fresh}`);
  }
  proof.push({fresh,active,unchangedSemanticSignature:true});
}
const helperRefs={
  53826:require('../../../lib/items/itemHistory.cjs'),39346:require('../../../lib/items/itemIdentity.cjs'),
  95834:{getEntityRoleIds:()=>[],getStoredClientId:()=>''},58256:{getEntityRoleIds:()=>[],getStoredClientId:()=>''},24110:{},
};
function loadFactory(factory,extra={}){
  const module={exports:{}};const req=id=>extra[id]||helperRefs[id]||{};
  req.d=(target,getters)=>Object.entries(getters).forEach(([key,get])=>Object.defineProperty(target,key,{get}));req.n=value=>()=>value;req.r=()=>{};
  vm.runInNewContext('('+factory+')') (module,module.exports,req);return module.exports;
}
const oldShared=loadFactory(bg.get(18447)),freshShared=loadFactory(fg.get(92957));
for(const name of ['od','SJ','sv'])assert.equal(typeof oldShared[name],typeof freshShared[name]);
const cases=[['od',['Digital Multimeter (Fluke)']],['od',['Siemens Élite-CT 123']],['SJ',[[{workOrder:'10698',date:'2026-10-05'},{workOrder:'00123',date:''}]]],['SJ',[[]]],['sv',[{OEM:'Fluke',Modality:'Service',Model:'87V'},{oem:'Other'},{OEM:'Third'}]],['sv',[{}, {oem:'Fluke',modality:['MRI','CT'],model:'Kit'},{}]]];
for(const [name,args]of cases)assert.equal(JSON.stringify(oldShared[name](...args)),JSON.stringify(freshShared[name](...args)),`Preserved helper export ${name} changed`);
async function main(){
 const docs=[{id:'c1',data:()=>({name:'Lake Forest',city:'Lake Forest'})},{id:'c2',data:()=>({name:'Lathrop'})}];
 const calls=[];const query={get:async()=>({docs}),orderBy(...args){calls.push(args);return this;},where(...args){calls.push(args);return this;}};
 const firebase={A:{firestore:()=>({collection:name=>{calls.push(name);return query;}})}};
 const older=loadFactory(bg.get(52321),{9306:firebase}),newer=loadFactory(fg.get(12475),{10374:firebase});
 const before=await older.$3(),beforeCalls=JSON.parse(JSON.stringify(calls));calls.length=0;
 const after=await newer.$3();assert.equal(JSON.stringify(before),JSON.stringify(after));assert.deepEqual(calls,beforeCalls);
 // All baseline browser files, not only this route, must be free of helper ID.
 for(const file of T.walk(path.join(base,'static')).filter(f=>f.endsWith('.js')))assert(!T.factories(T.read(file)).some(f=>f.id===helperId),'Global module ID collision');
 const replacement=T.remap(fg.get(newId),map,true),helpers=new Map([[helperId,fg.get(48922)]]);
 const code=T.inject(T.patchFactories(old,{[oldId]:replacement}),helpers);
 const final=new Map(T.factories(code).map(f=>[f.id,f.source]));
 for(const factory of T.factories(old))if(factory.id!==oldId)assert.equal(final.get(factory.id),factory.source,`Unrelated factory ${factory.id} changed`);
 const registry=new Map([...bg,...final]);for(const id of [oldId,helperId])for(const dependency of T.requiredIds(registry.get(id)))assert(registry.has(dependency),`Missing dependency ${dependency}`);
 const newPage=oldPage.replace(/-[^.]+\.js$/,`-${T.sha(code).slice(0,16)}.js`),out=path.join(__dirname,'tool-page-overlay/.next',newPage);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,code,{flag:'wx'});
 const sourceHashes=Object.fromEntries(['pages/NewSearch/Tools/[id]/index.js','lib/inventory/toolWorkOrderSelection.cjs'].map(file=>[file,T.sha(fs.readFileSync(path.join(__dirname,'../../..',file)))]));
 const report={createdAt:new Date().toISOString(),baselineRevision:JSON.parse(T.read(path.join(__dirname,'baseline.json'))).revision,sourceDirectory:'tool-page-overlay',overlayDirectory:'tool-page-overlay',sourceHashes,route,oldPage,newPage,changedFactoryId:oldId,oracleFactoryId:newId,newHelperId:helperId,newHelperIds:[helperId],imports:Object.fromEntries(map),dependencyProof:proof,preservedHelperExportRegressionCases:cases.length+1,oldPageSHA256:T.sha(old),newPageSHA256:T.sha(code),oldFactorySHA256:T.sha(bg.get(oldId)),newFactorySHA256:T.sha(replacement),helperSHA256:T.sha(fg.get(48922)),cssUnchanged:true,unrelatedFactoriesPreserved:true,dependencyClosure:true,globalHelperIdUnique:true,compilerInputReceiptSHA256:T.sha(fs.readFileSync(path.join(__dirname,'compiler-inputs-v1.json'))),productionMutations:0};
 fs.writeFileSync(path.join(__dirname,'tool-page-overlay-report.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(report,null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
