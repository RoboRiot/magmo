"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const {client,getFunction,configHash,sha256}=require('./cloud-common.cjs');
const here=path.join(__dirname,'rebased-77'),file=name=>path.join(here,name);
const expected={revision:'nextserverwest-00077-puh',generation:'1791218790974241',archiveSHA256:'6c8768b805303aab52528f3cf4279626deca2f4223b027c0aeaffb0a025f83c0',configHash:'de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc'};
const relative='.next/server/pages/NewSearch/Tools/[id].html';
const oldSrc='/_next/static/chunks/pages/NewSearch/Tools/%5Bid%5D-a6548fb02b36b5cb.js',newSrc='/_next/static/chunks/pages/NewSearch/Tools/%5Bid%5D-8337b6b88e2472d0.js';
const toolAsset='.next/static/chunks/pages/NewSearch/Tools/[id]-8337b6b88e2472d0.js',toolAssetSHA256='8337b6b88e2472d01ce71cde2fb2d87f3c1ef1b84474be67b906c584c8696e90';
function check(fn){assert.equal(fn.state,'ACTIVE');assert.equal(fn.serviceConfig.revision,expected.revision);assert.equal(String(fn.buildConfig.source.storageSource.generation),expected.generation);assert.equal(configHash(fn),expected.configHash);assert.equal(fn.buildConfig.runtime,'nodejs22');assert.equal(fn.buildConfig.entryPoint,'nextServerWest');}
const walk=directory=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{assert(entry.isDirectory()||entry.isFile(),'No special files');const full=path.join(directory,entry.name);return entry.isDirectory()?walk(full):[full];});
const inventory=directory=>walk(directory).map(full=>({path:path.relative(directory,full).replaceAll('\\','/'),bytes:fs.statSync(full).size,sha256:sha256(fs.readFileSync(full))})).sort((a,b)=>a.path.localeCompare(b.path));
function save(name,value){fs.writeFileSync(file(name),Buffer.isBuffer(value)||typeof value==='string'?value:JSON.stringify(value,null,2)+'\n',{flag:'wx'});}
function namesOf(archive){const names=cp.execFileSync('tar',['-tf',archive],{encoding:'utf8',windowsHide:true}).trim().split(/\r?\n/).filter(Boolean);assert(names.every(name=>!path.isAbsolute(name)&&!name.includes('\\')&&!name.split('/').includes('..')),'Unsafe archive member');return names;}
(async()=>{
 assert(!fs.existsSync(here),'Preserve existing snapshot');
 const before=await getFunction();check(before);const source=before.buildConfig.source.storageSource;
 const {data}=await client.request({url:`https://storage.googleapis.com/storage/v1/b/${source.bucket}/o/${encodeURIComponent(source.object)}`,params:{alt:'media',generation:source.generation},responseType:'arraybuffer',timeout:60000});
 const archive=Buffer.from(data);assert.equal(sha256(archive),expected.archiveSHA256);
 const after=await getFunction();check(after);assert.equal(after.updateTime,before.updateTime);assert.deepEqual(after.buildConfig.source,before.buildConfig.source);
 fs.mkdirSync(here);save('source.zip',archive);const originalNames=namesOf(file('source.zip'));
 fs.mkdirSync(file('source'));cp.execFileSync('tar',['-xf',file('source.zip'),'-C',file('source')],{stdio:'pipe',windowsHide:true});
 const originals=inventory(file('source'));assert.equal(originals.length,575);assert.deepEqual(originals.map(f=>f.path).sort(),originalNames.filter(n=>!n.endsWith('/')).map(n=>n.replace(/^\.\//,'')).sort());
 assert(originals.every(({path:name})=>!/(^|\/)(?:\.env(?:\.|$)|private|node_modules|cache|.*firebase-adminsdk.*)(?:$|\/)/i.test(name)),'Excluded source path');
 const buildId=fs.readFileSync(file('source/.next/BUILD_ID'),'utf8').trim();
 const baseline={capturedAt:new Date().toISOString(),functionName:before.name,state:before.state,revision:before.serviceConfig.revision,updateTime:before.updateTime,source:before.buildConfig.source,configHash:configHash(before),archiveFile:'source.zip',archiveSHA256:sha256(archive),archiveBytes:archive.length,runtime:before.buildConfig.runtime,entryPoint:before.buildConfig.entryPoint,region:'us-west2',buildId,files:originals.length,sourceAndConfigurationStableDuringCapture:true,productionMutations:0,databaseWrites:0,slackPosts:0,rollbackRevision:expected.revision};
 save('baseline.json',baseline);save('baseline-files.json',originals);
 const html=fs.readFileSync(file('source/'+relative),'utf8');assert.equal(html.split(oldSrc).length-1,1);assert(!html.includes(newSrc));
 const fixed=html.replace(oldSrc,newSrc);assert.equal(fixed.replace(newSrc,oldSrc),html);assert.equal(Buffer.byteLength(fixed),Buffer.byteLength(html));
 fs.cpSync(file('source'),file('candidate'),{recursive:true,errorOnExist:true});fs.writeFileSync(file('candidate/'+relative),fixed);
 const files=inventory(file('candidate'));assert.equal(files.length,575);assert.deepEqual(files.map(e=>e.path),originals.map(e=>e.path));const oldMap=new Map(originals.map(e=>[e.path,e.sha256]));
 const changed=files.filter(e=>oldMap.get(e.path)!==e.sha256).map(e=>e.path);assert.deepEqual(changed,[relative]);
 assert.equal(sha256(fs.readFileSync(file('candidate/'+toolAsset))),toolAssetSHA256);
 const mf=JSON.parse(fs.readFileSync(file('candidate/.next/build-manifest.json'),'utf8'));assert(mf.pages['/NewSearch/Tools/[id]'].includes(toolAsset.replace('.next/','')));assert(!mf.pages['/NewSearch/Tools/[id]'].some(v=>v.includes('a6548fb02b36b5cb')));
 const activeManifest=fs.readFileSync(file('candidate/.next/static/'+buildId+'/_buildManifest.js'),'utf8');assert(activeManifest.includes('[id]-8337b6b88e2472d0.js'));assert(!activeManifest.includes('a6548fb02b36b5cb'));
 const scripts=[...fixed.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(m=>({encoded:m[1],decoded:decodeURIComponent(m[1])}));assert(scripts.some(s=>s.encoded===newSrc&&s.decoded==='/_next/'+toolAsset.replace('.next/','')));assert(!scripts.some(s=>s.decoded.includes('a6548fb02b36b5cb')));
 for(const script of scripts.filter(s=>s.decoded.startsWith('/_next/')))assert(fs.existsSync(file('candidate/.next/'+script.decoded.slice('/_next/'.length))),script.decoded);
 assert.equal(fs.readFileSync(file('candidate/.next/BUILD_ID'),'utf8').trim(),buildId);
 save('candidate-files.json',files);save('zip-files.txt',files.map(e=>e.path).join('\n')+'\n');
 cp.execFileSync('tar',['-a','-cf',file('artifact.zip'),'-C',file('candidate'),'-T',file('zip-files.txt')],{stdio:'pipe',windowsHide:true});const names=namesOf(file('artifact.zip'));assert.deepEqual(names.sort(),files.map(e=>e.path).sort());
 fs.mkdirSync(file('package-verification'));cp.execFileSync('tar',['-xf',file('artifact.zip'),'-C',file('package-verification')],{stdio:'pipe',windowsHide:true});assert.deepEqual(inventory(file('package-verification')),files);
 const finalLive=await getFunction();check(finalLive);assert.equal(finalLive.updateTime,before.updateTime);assert.deepEqual(finalLive.buildConfig.source,before.buildConfig.source);
 const report={result:'PASS',createdAt:new Date().toISOString(),candidateDir:'candidate',baselineRevision:baseline.revision,baselineUpdateTime:baseline.updateTime,baselineSource:baseline.source,rollbackArchive:'source.zip',originalArtifactSHA256:baseline.archiveSHA256,artifactSHA256:sha256(fs.readFileSync(file('artifact.zip'))),archiveBytes:fs.statSync(file('artifact.zip')).size,files:files.length,changed:1,changedFiles:changed,html:{path:relative,beforeSHA256:sha256(html),afterSHA256:sha256(fixed),oldSrc,newSrc,occurrencesChanged:1,exactInverseProven:true,sameByteCount:true},buildId,configHash:baseline.configHash,toolAssetSHA256,allJavaScriptPreserved:true,allStaticAssetsPreserved:true,allOtherFilesPreserved:true,allOps77ContentPreserved:true,compiledToolLogicUnchanged:true,runtimeConfigurationPreserved:true,rawAndEncodedReferencesVerified:true,toolHtmlScripts:scripts,noDeletedFiles:true,noAddedFiles:true,extractedBytesMatch:true,liveStableThroughPackaging:true,productionMutations:0,databaseWrites:0,slackPosts:0,printJobs:0};
 save('package-report.json',report);console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(JSON.stringify({error:'read_only_rebased77_packaging_failed',status:error?.response?.status||null,detail:error instanceof assert.AssertionError?error.message:undefined}));process.exitCode=1;});
