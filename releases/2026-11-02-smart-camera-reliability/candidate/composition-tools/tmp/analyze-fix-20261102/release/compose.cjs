"use strict";
// Compose only reviewed feature modules over the live rollback artifact.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const F=require('../../ot-collapse-20260928/factory-tools.cjs');
const {buildDataRoute}=require('next/dist/server/lib/router-utils/build-data-route');
const here=__dirname,root=path.resolve(here,'../../..'),file=n=>path.join(here,n),read=p=>fs.readFileSync(p,'utf8'),json=n=>JSON.parse(read(file(n)));
const baseline=json('baseline.json'),before=json('baseline-files.json').hashes;
const tree=d=>Object.fromEntries(F.walk(d).map(p=>[F.slash(path.relative(d,p)),F.sha(fs.readFileSync(p))]));
assert.deepEqual(tree(file('source')),before);assert.equal(F.sha(fs.readFileSync(file('source.zip'))),baseline.archiveSHA256);
const inputs={},overlays=[],changes=new Map(),assetChanges=[];
for(const name of ['api-overlay-v4','editor-overlay-v4','newitem-overlay-v2','approval-ui-overlay']){
 const receipt=json(name+'/receipt.json');
 for(const[p,hash]of Object.entries(receipt.inputs||{})){assert.equal(F.sha(fs.readFileSync(path.join(root,p))),hash,'Source changed since compilation: '+p);if(inputs[p])assert.equal(inputs[p],hash);inputs[p]=hash;}
 for(const change of receipt.changes){
  assert.equal(before[change.file],change.oldSHA256,'Overlay base mismatch: '+change.file);
  assert(!changes.has(change.file),'Overlapping overlays: '+change.file);
  const bytes=fs.readFileSync(file(name+'/'+change.file));assert.equal(F.sha(bytes),change.newSHA256);
  changes.set(change.file,bytes);
 }
 overlays.push({name,receiptSHA256:F.sha(read(file(name+'/receipt.json')))});
}
// Keep every existing static asset byte-for-byte. Publish a new content-named
// asset for changed page JavaScript and update only its references.
for(const[name,bytes]of [...changes])if(name.startsWith('.next/static/')){
 assert(name.includes('/chunks/pages/')&&/\.js$/.test(name),'Review non-page shared runtime changes separately');
 const next=name.replace(/-[^.]+\.js$/,'-'+F.sha(bytes).slice(0,16)+'.js');assert.notEqual(next,name);assert(!before[next]);
 changes.delete(name);changes.set(next,bytes);assetChanges.push({old:name.slice(6),next:next.slice(6),sha256:F.sha(bytes)});
}
const buildId='smart-camera-reliability-'+F.sha([...changes].map(([n,b])=>n+':'+F.sha(b)).sort().join('\n')).slice(0,16);
const replacements=[[baseline.buildId,buildId],...assetChanges.flatMap(c=>[[c.old,c.next],[path.posix.basename(c.old),path.posix.basename(c.next)]])];
function substitute(s){for(const[a,b]of replacements)s=s.split(a).join(b);return s;}
for(const name of Object.keys(before).filter(n=>n.startsWith('.next/')&&!n.startsWith('.next/static/')&&/\.(js|json|html)$/.test(n))){
 if(name==='.next/routes-manifest.json')continue;
 const original=(changes.get(name)||fs.readFileSync(file('source/'+name))).toString('utf8'),next=substitute(original);if(next!==original)changes.set(name,Buffer.from(next));
}
const routes=json('source/.next/routes-manifest.json');routes.dataRoutes=routes.dataRoutes.map(r=>({...r,...buildDataRoute(r.page,buildId)}));
changes.set('.next/routes-manifest.json',Buffer.from(JSON.stringify(routes,null,2)+'\n'));changes.set('.next/BUILD_ID',Buffer.from(buildId));
for(const p of F.walk(file('source/.next/static/'+baseline.buildId))){const rel=F.slash(path.relative(file('source/.next/static/'+baseline.buildId),p));changes.set('.next/static/'+buildId+'/'+rel,Buffer.from(substitute(read(p))));}
const out=file('candidate');assert(!fs.existsSync(out),'Preserve existing candidate');fs.cpSync(file('source'),out,{recursive:true,errorOnExist:true,force:false});
for(const[name,bytes]of changes){const target=path.join(out,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);}
const after=tree(out),modified=Object.keys(before).filter(n=>before[n]!==after[n]).sort(),added=Object.keys(after).filter(n=>!Object.hasOwn(before,n)).sort();
for(const[name,hash]of Object.entries(before)){assert(after[name],'Baseline file removed');if(!changes.has(name)||name.startsWith('.next/static/')||!name.startsWith('.next/'))assert.equal(after[name],hash,'Unrelated bytes changed: '+name);}
const manifest=JSON.parse(read(path.join(out,'.next/build-manifest.json')));for(const files of Object.values(manifest.pages))for(const asset of files)assert(fs.existsSync(path.join(out,'.next',asset)),'Missing asset '+asset);
for(const item of assetChanges)assert(Object.values(manifest.pages).some(a=>a.includes(item.next)),'Changed asset missing manifest');
const result={createdAt:new Date().toISOString(),candidateDir:'candidate',baselineRevision:baseline.revision,baselineArchiveSHA256:baseline.archiveSHA256,baselineConfigHash:baseline.configHash,buildId,oldBuildId:baseline.buildId,inputs,overlays,assetChanges,replacements,modified,added,deleted:[],hashes:after,noDeletedFiles:true,unrelatedFilesPreserved:true,allOldStaticAssetsPreserved:true,runtimeConfigChanged:false,productionDependenciesPreserved:true,externalWrites:0};
fs.writeFileSync(file('composition.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({...result,hashes:undefined},null,2));
