"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const T=require("./factory-utils.cjs"),here=__dirname,root=path.resolve(here,"../../.."),source=path.join(here,"source"),out=path.join(here,"scoped-source-v2");
const json=name=>JSON.parse(T.read(path.join(here,name))),baseline=json("baseline.json"),editors=json("editor-overlay-report-v2.json"),search=json("search-overlay-report.json"),shipment=json("shipment-overlay-report.json"),helperReport=json("client-helper-factories-v2.json");
assert(!fs.existsSync(out),"Candidate already exists");assert.equal(T.sha(fs.readFileSync(path.join(here,"source.zip"))),baseline.archiveSHA256);
const helpers=new Map(Object.entries(helperReport.sources).map(([id,s])=>[Number(id),s]));
const changes=new Map(),reasons=new Map(),routes=[...editors.pages];
function add(relative,bytes,reason){assert(!changes.has(relative),`Overlay collision ${relative}`);changes.set(relative,Buffer.from(bytes));reasons.set(relative,reason);}
for(const dir of ["editor-overlay-v2","shipment-overlay"])for(const file of T.walk(path.join(here,dir)))add(T.slash(path.relative(path.join(here,dir),file)),fs.readFileSync(file),dir);
for(const entry of search.files){
 const code=T.read(path.join(here,"search-overlay",entry.afterAsset));assert.equal(T.sha(code),entry.afterSHA256);
 const existing=T.getFactory(code,entry.moduleId),patched=T.remap(existing,new Map([[52321,93900005]]));
 let next=T.inject(T.patchFactories(code,{[entry.moduleId]:patched}),helpers);
 const oldPage=entry.beforeAsset.replace(/^\.next\//,""),newPage=oldPage.replace(/-[^.]+\.js$/,`-${T.sha(next).slice(0,16)}.js`);
 add(`.next/${newPage}`,next,"Reversible search predicate/query edits, scoped identity/fetch helper closure");
 routes.push({route:entry.route,oldPage,newPage,changedFactoryId:entry.moduleId,newPageSHA256:T.sha(next),originalFactorySHA256:entry.beforeFactorySHA256,afterFactorySHA256:T.sha(patched),newHelperIds:[...helpers.keys()],unrelatedFactoriesPreserved:true});
}
const overlayDigest=T.sha(Buffer.concat([...changes].sort(([a],[b])=>a.localeCompare(b)).flatMap(([name,bytes])=>[Buffer.from(name+"\n"),bytes]))),buildId=`ais-identity-${overlayDigest.slice(0,16)}`;
const substitutions=[...routes.map(({oldPage,newPage})=>[path.basename(oldPage),path.basename(newPage)]),[baseline.buildId,buildId]];
function replace(old){let next=old;for(const[a,b]of substitutions)next=next.split(a).join(b);let undo=next;for(const[a,b]of[...substitutions].reverse())undo=undo.split(b).join(a);assert.equal(undo,old,"Metadata replacement not reversible");return next;}
const metadataChanges=[];
for(const file of T.walk(path.join(source,".next"))){const relative=T.slash(path.relative(source,file));if(relative.startsWith(".next/static/")||!(/\.(?:js|json|html)$/.test(relative)))continue;
 const old=(changes.get(relative)||fs.readFileSync(file)).toString("utf8"),next=replace(old);if(old===next)continue;
 changes.set(relative,Buffer.from(next));reasons.set(relative,`${reasons.get(relative)||"baseline"}; reversible asset/build identity metadata`);metadataChanges.push(relative);
}
add(".next/BUILD_ID",buildId,"Fresh immutable build identity");
const oldBuild=path.join(source,".next/static",baseline.buildId);for(const file of T.walk(oldBuild))add(`.next/static/${buildId}/${T.slash(path.relative(oldBuild,file))}`,replace(T.read(file)),"New immutable build manifests; original preserved");
fs.cpSync(source,out,{recursive:true});for(const[relative,bytes]of changes){const dest=path.join(out,relative);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);}
const before=new Map(json("baseline-files.json").map(({path,sha256})=>[path,sha256])),after=new Map(T.walk(out).map(file=>[T.slash(path.relative(out,file)),T.sha(fs.readFileSync(file))]));
assert([...before.keys()].every(name=>after.has(name)));for(const[name,hash]of before)if(!changes.has(name))assert.equal(after.get(name),hash,`Unrelated file changed ${name}`);
for(const[name,hash]of before)if(name.startsWith(".next/static/"))assert.equal(after.get(name),hash,`Immutable baseline static asset changed ${name}`);
for(const name of ["package.json","package-lock.json","index.js"])assert.equal(after.get(name),before.get(name),`Runtime package/config changed ${name}`);
const manifest=JSON.parse(T.read(path.join(out,".next/build-manifest.json")));
for(const entry of routes){assert(manifest.pages[entry.route].includes(entry.newPage));assert(!manifest.pages[entry.route].includes(entry.oldPage));
 const graph=T.graph(path.join(out,".next"),entry.route);
 for(const id of [entry.changedFactoryId,...helpers.keys()]){assert(graph.has(id));for(const dependency of T.requiredIds(graph.get(id)))assert(graph.has(dependency),`Unresolved module ${dependency} on ${entry.route}`);}
}
for(const assets of Object.values(manifest.pages))for(const asset of assets)assert(fs.existsSync(path.join(out,".next",asset)),`Missing build asset ${asset}`);
assert.equal(T.read(path.join(out,".next/server/pages-manifest.json")),T.read(path.join(source,".next/server/pages-manifest.json")),"No page/API route map changes allowed");
const modified=[...before].filter(([name,hash])=>after.get(name)!==hash).map(([name])=>name).sort(),added=[...after.keys()].filter(name=>!before.has(name)).sort();
const inputs=json("compiler-inputs-v5.json");const targeted=["lib/items/itemIdentity.cjs","lib/items/itemIdentitySearch.cjs","lib/items/itemEditorOperations.cjs","lib/inventory/shipmentSystemService.cjs","pages/NewSearch/AddItem/NewItem.js","pages/NewSearch/item/[id]/index.js","pages/NewSearch/mainSearch.js","pages/NewSearch/inventory/inventoryManage.js","utils/itemFormShared.js","utils/warehouseAssociations.js","utils/fetchAssociations.js"];
const frozenHashes=Object.fromEntries(targeted.map(name=>{const i=inputs.inputs.find(i=>i.path===name);assert(i);assert.equal(T.sha(fs.readFileSync(path.join(root,name))),i.sha256,`Source drift ${name}`);return[name,i.sha256];}));
const report={composedAt:new Date().toISOString(),baselineArchiveSHA256:baseline.archiveSHA256,baselineRevision:baseline.revision,baselineUpdateTime:baseline.updateTime,baselineSource:baseline.source,configHash:baseline.configHash,candidateDir:"scoped-source-v2",buildId,oldBuildId:baseline.buildId,overlayDigest,routes,modified,added,metadataChanges,substitutions,changeReasons:Object.fromEntries(reasons),frozenHashes,changedFactoryIds:[19967,40705,60992,83757,51585],newClientHelperIds:[...helpers.keys()],newServerHelperIds:[93900000],runtimeConfigChanged:false,noDeletedFiles:true,unrelatedFilesPreserved:true,allOldStaticAssetsPreserved:true,productionPackageGraphPreserved:true,slackAndHistoryServerFactoriesUnchanged:true,serverRenderLogicUnchanged:true,files:after.size,productionMutations:0,qaPending:true,rejectedPredecessor:"composition-report.json"};
fs.writeFileSync(path.join(here,"composition-report-v2.json"),JSON.stringify(report,null,2)+"\n",{flag:"wx"});
fs.writeFileSync(path.join(here,"candidate-files-v2.json"),JSON.stringify([...after].sort(([a],[b])=>a.localeCompare(b)).map(([name,sha256])=>({path:name,sha256,bytes:fs.statSync(path.join(out,name)).size})),null,2)+"\n",{flag:"wx"});
console.log(JSON.stringify({candidate:out,buildId,modified,added,files:after.size,productionMutations:0,qaPending:true},null,2));
