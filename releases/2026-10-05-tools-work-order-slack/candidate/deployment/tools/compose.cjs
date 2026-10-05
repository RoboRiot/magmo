"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const T=require('../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs');
const here=__dirname,root=path.resolve(here,'../../..'),source=path.join(here,'source'),out=path.join(here,'scoped-source');
const json=n=>JSON.parse(T.read(path.join(here,n)));
const baseline=json('baseline.json'),server=json('server-overlay-report-v2.json'),modal=json('modal-overlay-report.json'),tool=json('tool-page-overlay-report.json');
assert(!fs.existsSync(out));assert.equal(T.sha(fs.readFileSync(path.join(here,'source.zip'))),baseline.archiveSHA256);
const frozenHashes={...server.sourceHashes,...tool.sourceHashes,[modal.sourcePath]:modal.sourceSHA256};
for(const[p,h]of Object.entries(frozenHashes))assert.equal(T.sha(fs.readFileSync(path.join(root,p))),h,`Source drift ${p}`);
const changes=new Map(),reasons=new Map();
for(const dir of [server.overlayDirectory,'modal-overlay',tool.overlayDirectory||'tool-page-overlay']){
 for(const file of T.walk(path.join(here,dir))){const rel=T.slash(path.relative(path.join(here,dir),file));assert(!changes.has(rel),`Overlay collision ${rel}`);changes.set(rel,fs.readFileSync(file));reasons.set(rel,dir);}
}
const routes=[modal,tool].map(r=>({route:r.route,oldPage:r.oldPage,newPage:r.newPage}));
for(const r of routes){assert(changes.has('.next/'+r.newPage));assert(fs.existsSync(path.join(source,'.next',r.oldPage)));}
const digest=T.sha(Buffer.concat([...changes].sort(([a],[b])=>a.localeCompare(b)).flatMap(([p,b])=>[Buffer.from(p+'\n'),b]))),buildId='tools-work-order-'+digest.slice(0,16);
const substitutions=[...routes.map(r=>[path.basename(r.oldPage),path.basename(r.newPage)]),[baseline.buildId,buildId]];
function replace(old){let next=old;for(const[a,b]of substitutions)next=next.split(a).join(b);let undo=next;for(const[a,b]of [...substitutions].reverse())undo=undo.split(b).join(a);assert.equal(undo,old);return next;}
for(const f of T.walk(path.join(source,'.next'))){const rel=T.slash(path.relative(source,f));if(rel.startsWith('.next/static/')||!/\.(js|json|html)$/.test(rel))continue;const old=(changes.get(rel)||fs.readFileSync(f)).toString('utf8'),next=replace(old);if(old!==next){changes.set(rel,Buffer.from(next));reasons.set(rel,(reasons.get(rel)||'baseline')+'; reversible build/asset metadata');}}
changes.set('.next/BUILD_ID',Buffer.from(buildId));reasons.set('.next/BUILD_ID','Fresh immutable build identity');
const oldBuild=path.join(source,'.next/static',baseline.buildId);for(const f of T.walk(oldBuild)){const rel='.next/static/'+buildId+'/'+T.slash(path.relative(oldBuild,f));changes.set(rel,Buffer.from(replace(T.read(f))));reasons.set(rel,'New build manifests; old retained');}
fs.cpSync(source,out,{recursive:true});for(const[p,b]of changes){const f=path.join(out,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,b);}
const before=new Map(json('baseline-files.json').map(f=>[f.path,f.sha256])),files=T.walk(out).map(f=>({path:T.slash(path.relative(out,f)),sha256:T.sha(fs.readFileSync(f)),bytes:fs.statSync(f).size})).sort((a,b)=>a.path.localeCompare(b.path)),after=new Map(files.map(f=>[f.path,f.sha256]));
assert([...before.keys()].every(p=>after.has(p)));for(const[p,h]of before)if(!changes.has(p)||p.startsWith('.next/static/'))assert.equal(after.get(p),h,`Unrelated/immutable file changed ${p}`);
for(const p of ['package.json','package-lock.json','index.js'])assert.equal(after.get(p),before.get(p));
const mf=JSON.parse(T.read(path.join(out,'.next/build-manifest.json')));for(const assets of Object.values(mf.pages))for(const asset of assets)assert(fs.existsSync(path.join(out,'.next',asset)),asset);
for(const route of routes){assert(mf.pages[route.route].includes(route.newPage));assert(!mf.pages[route.route].includes(route.oldPage));}
const pages=JSON.parse(T.read(path.join(out,'.next/server/pages-manifest.json')));assert.equal(pages['/api/print/tool-label'],'pages/api/print/tool-label.js');for(const[p,f]of Object.entries(json('source/.next/server/pages-manifest.json')))assert.equal(pages[p],f);
const modified=[...before].filter(([p,h])=>after.get(p)!==h).map(([p])=>p).sort(),added=files.filter(f=>!before.has(f.path)).map(f=>f.path).sort();
const report={result:'PASS',composedAt:new Date().toISOString(),baselineRevision:baseline.revision,baselineArchiveSHA256:baseline.archiveSHA256,configHash:baseline.configHash,candidateDir:'scoped-source',buildId,oldBuildId:baseline.buildId,routes,modified,added,files:files.length,frozenHashes,substitutions,changeReasons:Object.fromEntries(reasons),serverOverlayReportSHA256:T.sha(fs.readFileSync(path.join(here,'server-overlay-report-v2.json'))),modalOverlayReportSHA256:T.sha(fs.readFileSync(path.join(here,'modal-overlay-report.json'))),toolOverlayReportSHA256:T.sha(fs.readFileSync(path.join(here,'tool-page-overlay-report.json'))),noDeletedFiles:true,unrelatedFilesPreserved:true,allOldStaticAssetsPreserved:true,runtimeConfigChanged:false,productionPackageGraphPreserved:true,newDependencies:[],databaseWrites:0,slackPosts:0};
fs.writeFileSync(path.join(here,'composition-report.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});fs.writeFileSync(path.join(here,'candidate-files.json'),JSON.stringify(files,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({result:'PASS',buildId,files:files.length,modified,added}));
