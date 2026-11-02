"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const F=require('../../ot-collapse-20260928/factory-tools.cjs');
const here=__dirname,root=path.resolve(here,'../../..'),file=n=>path.join(here,n),read=p=>fs.readFileSync(p,'utf8');
const composition=JSON.parse(read(file('composition.json'))),compositionSHA256=F.sha(read(file('composition.json')));
const tree=d=>Object.fromEntries(F.walk(d).map(p=>[F.slash(path.relative(d,p)),F.sha(fs.readFileSync(p))]));
assert.deepEqual(tree(file('candidate')),composition.hashes);
for(const overlay of composition.overlays){
 const receiptPath=file(overlay.name+'/receipt.json'),receipt=JSON.parse(read(receiptPath));
 assert.equal(F.sha(read(receiptPath)),overlay.receiptSHA256);
 for(const change of receipt.changes){
  const before=read(file('source/'+change.file)),after=read(file(overlay.name+'/'+change.file));
  assert.equal(F.sha(before),change.oldSHA256);assert.equal(F.sha(after),change.newSHA256);
  assert.equal(F.sha(F.getFactory(after,change.moduleId)),change.newFactorySHA256);
  let restoredBundle=F.patchFactories(after,{[change.moduleId]:F.getFactory(before,change.moduleId)});
  if(!F.factories(before).some(f=>f.id===27779)&&F.factories(after).some(f=>f.id===27779)){
   assert(overlay.name==='api-overlay-v4','Only API overlays add the existing storage boundary');
   const boundary=F.getFactory(read(file('source/.next/server/pages/api/items/analyze.js')),27779);
   assert.equal(F.getFactory(after,27779),boundary,'Storage boundary must be the exact deployed factory');
   const added=`,27779:${boundary}`;assert.equal(restoredBundle.split(added).length,2);
   restoredBundle=restoredBundle.replace(added,'');
  }
  assert(restoredBundle===before,'Only the reviewed factory and exact deployed storage-boundary dependency may change: '+change.file);
  if(change.edits){
   let restored=F.getFactory(after,change.moduleId),delta=0;
   for(const edit of [...change.edits].sort((a,b)=>a.start-b.start)){
    const position=edit.start+delta;
    assert.equal(restored.slice(position,position+edit.text.length),edit.text);
    restored=restored.slice(0,position)+edit.original+restored.slice(position+edit.text.length);
    // Each restoration removes the prior edit delta; remaining positions are original offsets.
   }
   assert.equal(restored,F.getFactory(before,change.moduleId),'Inverse patch must restore original factory');
  }
 }
}
fs.writeFileSync(file('scope-verification.json'),JSON.stringify({result:'PASS',verifiedAt:new Date().toISOString(),compositionSHA256,checked:'Exact candidate hashes; overlay input receipts; unrelated factories byte-identical; inverse localized edits; baseline assets/runtime preserved by composition and package gates'},null,2)+'\n');
const tests=['item-analyze-reliability','item-vision-photo-index','item-analysis-ui-safety','item-save-navigation','item-vision-index-routes','item-vision-index-repair','item-vision-approval-notice','item-analysis-compiled-ui','item-vision-compiled-index-api'].map(n=>'test/'+n+'.test.cjs');
const run=cp.spawnSync(process.execPath,['--test',...tests],{cwd:root,env:{...process.env,ITEM_VISION_COMPILED_ANALYZE_FILE:file('candidate/.next/server/pages/api/items/analyze.js')},encoding:'utf8',windowsHide:true,timeout:180000,maxBuffer:8*1024*1024});
fs.writeFileSync(file('compiled-behavior.tap'),run.stdout+'\n'+run.stderr);
assert.equal(run.status,0,'Regression suite failed; inspect compiled-behavior.tap');
assert.match(run.stdout,/# fail 0/);
fs.writeFileSync(file('compiled-behavior.json'),JSON.stringify({result:'PASS',verifiedAt:new Date().toISOString(),compositionSHA256,tests,mode:'Explicit synthetic API/auth/Storage/React fixtures; actual compiled API and UI factory execution, plus source-helper regressions',tapSHA256:F.sha(read(file('compiled-behavior.tap'))),summary:run.stdout.split('\n').filter(l=>/^# (tests|pass|fail|cancelled|skipped)/.test(l))},null,2)+'\n');
console.log(read(file('compiled-behavior.json')));
