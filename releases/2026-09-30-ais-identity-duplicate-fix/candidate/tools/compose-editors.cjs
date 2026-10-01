"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const T=require("./factory-utils.cjs"),here=__dirname,root=path.resolve(here,"../../.."),base=path.join(here,"source/.next");
const version=process.argv[2]||"v5",inputs=JSON.parse(T.read(path.join(here,`compiler-inputs-${version}.json`)));
assert(fs.existsSync(path.join(here,`compiler-success-${version}.json`)));
const oracle=path.join(here,inputs.workspace,"compiler-output"),bm=JSON.parse(T.read(path.join(base,"build-manifest.json")));
const bg=T.graph(base,"/NewSearch/AddItem/NewItem"),fresh=T.graph(oracle,"/NewSearch/AddItem/NewItem");
const privateMap=new Map([[39346,93900000],[24110,93900001],[26341,93900002],[92957,93900003],[74932,93900004],[12475,93900005],[53826,93900006]]);
const fullMap=new Map([...privateMap,[58256,95834],[97323,14232],[10374,9306]]);
for(const [frozenId,marker]of [[39346,"normalizeItemAisValue"],[24110,"buildItemAisSearchQueries"],[26341,"getItemPhotoStoragePrefixes"],[92957,"resolveItemSaveIdentity"],[74932,"target-exists"],[12475,"mergeItemIdentitySnapshots"],[53826,"currentWorkOrder"]])assert(fresh.get(frozenId)?.includes(marker),`Unexpected compiler helper ${frozenId}`);
const signature=s=>T.canonical(T.remap(s,new Map([...T.requiredIds(s)].map(id=>[id,0]))));
for(const [newId,oldId]of [[58256,95834],[97323,14232],[10374,9306]])assert.equal(signature(fresh.get(newId)),signature(bg.get(oldId)),`External dependency changed ${newId} -> ${oldId}`);
assert.equal(T.canonical(fresh.get(53826)),T.canonical(bg.get(93200004)),"Unchanged history helper diverged");
const helpers=new Map([...privateMap].map(([newId,privateId])=>[privateId,T.remap(fresh.get(newId),fullMap,true)]));
const helperReport={createdAt:new Date().toISOString(),compilerVersion:version,inputReceiptSHA256:T.sha(fs.readFileSync(path.join(here,`compiler-inputs-${version}.json`))),moduleMap:Object.fromEntries(privateMap),externalMap:{58256:95834,97323:14232,10374:9306},sources:Object.fromEntries(helpers),hashes:Object.fromEntries([...helpers].map(([id,s])=>[id,T.sha(s)])),productionMutations:0};
fs.writeFileSync(path.join(here,"client-helper-factories-v2.json"),JSON.stringify(helperReport,null,2)+"\n",{flag:"wx"});
const pageReports=[];
for(const [route,id,req,edits]of [
 ["/NewSearch/AddItem/NewItem",19967,"t",[
  ['y.localSN&&""!==y.localSN.trim()?y.localSN.trim():Y','__resolveAis(y.localSN,Y)'],
  ['y.localSN&&""!==y.localSN.trim()?y.localSN.trim():""','__resolveAis(y.localSN)'],
  ['Y&&await ec(c,Y)','Y&&await ec(c,Y,{exactOnly:!0})'],
  ['let{id:o}=e.query,c=A.A.firestore()','let c=A.A.firestore()'],
  ['t9||t7.current||o||null','t9||t7.current||null']]],
 ["/NewSearch/item/[id]",40705,"t",[
  ['eB.localSN&&""!==eB.localSN.trim()?eB.localSN.trim():er','__resolveAis(eB.localSN,er)'],
  ['eB.localSN&&""!==eB.localSN.trim()?eB.localSN.trim():""','__resolveAis(eB.localSN)'],
  ['er&&await ef(g,er)','er&&await ef(g,er,{exactOnly:!0})']]]
]){
 const oldPage=bm.pages[route].find(file=>file.includes("/pages/")),old=T.read(path.join(base,oldPage)),original=T.getFactory(old,id);
 assert(original.startsWith(`(e,r,${req})=>{`)||original.startsWith(`(e,t,${req})=>{`)||new RegExp(`^\\([^)]*,${req}\\)=>`).test(original));
 const header=`const{resolveItemSaveIdentity:__resolveAis}=${req}(93900000);`;
 let next=T.replaceOnce(original,'"use strict";','"use strict";'+header);
 for(const [before,after]of edits)next=T.replaceOnce(next,before,after);
 let undo=next;for(const [before,after]of [...edits].reverse())undo=T.replaceOnce(undo,after,before);undo=T.replaceOnce(undo,header,"");assert.equal(undo,original,"Editor byte edits must reverse exactly");
 // IDs are verified from the ACTIVE route graph, not prior composition maps:
 // 93200003 is PhotoTabs and 93200007 is HistoryModal; neither may be remapped.
 const actualGraph=T.graph(base,route);
 assert(actualGraph.get(93200001)?.includes('target-exists'),"Expected live warehouse transaction helper");
 assert(actualGraph.get(32087)?.includes('getItemPhotoStoragePrefixes'),"Expected live item operation controller");
 assert(actualGraph.get(93200003)?.includes('Item pictures'),"Expected preserved live PhotoTabs component");
 assert(actualGraph.get(93200007)?.includes('buildItemHistoryRows'),"Expected preserved live HistoryModal component");
 const imports=new Map([[93200000,93900003],[93200001,93900004],[32087,93900002],[52321,93900005]]);
 next=T.remap(next,imports);let code=T.inject(T.patchFactories(old,{[id]:next}),helpers);
 const final=new Map(T.factories(code).map(f=>[f.id,f.source]));for(const f of T.factories(old))if(f.id!==id)assert.equal(final.get(f.id),f.source,`Unrelated editor factory ${f.id} changed`);
 const newPage=oldPage.replace(/-[^.]+\.js$/,`-${T.sha(code).slice(0,16)}.js`),target=path.join(here,"editor-overlay-v2/.next",newPage);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,code,{flag:"wx"});
 pageReports.push({route,oldPage,newPage,changedFactoryId:id,originalFactorySHA256:T.sha(original),afterFactorySHA256:T.sha(next),oldPageSHA256:T.sha(old),newPageSHA256:T.sha(code),reversiblePageBodyEdits:true,editPairs:edits,imports:Object.fromEntries(imports),newHelperIds:[...helpers.keys()],unrelatedFactoriesPreserved:true});
}
const report={createdAt:new Date().toISOString(),baselineRevision:JSON.parse(T.read(path.join(here,"baseline.json"))).revision,sourceDirectory:"editor-overlay-v2",compilerVersion:version,pages:pageReports,helpersReceiptSHA256:T.sha(fs.readFileSync(path.join(here,"client-helper-factories-v2.json"))),cssUnchanged:true,serverRenderUnchanged:true,rejectedPredecessor:"editor-overlay-report.json",productionMutations:0};
fs.writeFileSync(path.join(here,"editor-overlay-report-v2.json"),JSON.stringify(report,null,2)+"\n",{flag:"wx"});console.log(JSON.stringify(report,null,2));
