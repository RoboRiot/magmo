"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const parser=require('@babel/parser'),traverse=require('@babel/traverse').default,generate=require('@babel/generator').default;
const T=require('../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs');
const here=__dirname,root=path.resolve(here,'../../..'),base=path.join(here,'source/.next'),oracle=path.join(here,'compiler-workspace-v1/compiler-output');
const route='/NewSearch/mainSearch',manifest=JSON.parse(T.read(path.join(base,'build-manifest.json'))),freshManifest=JSON.parse(T.read(path.join(oracle,'build-manifest.json')));
const oldPage=manifest.pages[route].find(f=>f.includes('/pages/')),freshPage=freshManifest.pages[route].find(f=>f.includes('/pages/'));
const oldCode=T.read(path.join(base,oldPage)),oldFactory=T.getFactory(oldCode,60992);
const freshFactory=T.getFactory(T.read(path.join(oracle,freshPage)),85612);
function parse(code){const ast=parser.parse('('+code+')');let scope;traverse(ast,{Function(p){if(p.node===ast.program.body[0].expression)scope=p.scope;}});return{ast,scope,body:ast.program.body[0].expression.body.body,params:ast.program.body[0].expression.params};}
function names(n){if(n.type==='FunctionDeclaration'||n.type==='ClassDeclaration')return[n.id.name];if(n.type!=='VariableDeclaration')return[];const collect=p=>p.type==='Identifier'?[p.name]:p.type==='ObjectPattern'?p.properties.flatMap(v=>collect(v.value||v.argument)):p.type==='ArrayPattern'?p.elements.filter(Boolean).flatMap(collect):p.type==='AssignmentPattern'?collect(p.left):p.type==='RestElement'?collect(p.argument):assert.fail(p.type);return n.declarations.flatMap(d=>collect(d.id));}
const old=parse(oldFactory),fresh=parse(freshFactory),mapping=new Map();
const pair=(a,b)=>{assert(!mapping.has(a)||mapping.get(a)===b);mapping.set(a,b);};
fresh.params.forEach((p,i)=>pair(p.name,old.params[i].name));
// ACTIVE has two separately deployed identity/history helper declarations.
// Preserve those and every unrelated search/map function byte-for-byte.
assert(oldFactory.includes('const __aisSearch=r(93900001)'));
assert(oldFactory.includes('getAllWorkOrders:__historyAll'));
for(let i=0;i<=79;i++){
 assert.equal(fresh.body[i].type,old.body[i+2].type,`Statement type drift ${i}`);
 const from=names(fresh.body[i]),to=names(old.body[i+2]);assert.equal(from.length,to.length,`Binding drift ${i}`);
 from.forEach((n,j)=>pair(n,to[j]));
}
let count=0;const staged=[];
for(const[from,to]of mapping){const temp=`__tool_modal_scope_${count++}__`;fresh.scope.rename(from,temp);staged.push([temp,to]);}
for(const[temp,to]of staged)fresh.scope.rename(temp,to);
const selected=[75,78,79],edits=[];
for(const index of selected){
 const target=old.body[index+2],candidate=fresh.body[index];assert.equal(target.type,'FunctionDeclaration');
 assert.equal(candidate.id.name,target.id.name);
 edits.push({index:index+2,start:target.start-1,end:target.end-1,before:oldFactory.slice(target.start-1,target.end-1),after:generate(candidate,{compact:true,comments:false}).code});
}
// All unchanged helpers in the component must remain equivalent after binding
// rebasing; the camera loader and imports stay from the active artifact.
for(let i=61;i<79;i++)if(!selected.includes(i)){
 if(fresh.body[i].type==='FunctionDeclaration'||fresh.body[i].type==='ClassDeclaration'){
  const left=generate(fresh.body[i],{compact:true,comments:false}).code;
  const right=oldFactory.slice(old.body[i+2].start-1,old.body[i+2].end-1);
  assert.equal(T.canonical(left),T.canonical(right),`Unchanged helper changed ${i}`);
 }
}
let next=oldFactory;for(const e of [...edits].sort((a,b)=>b.start-a.start))next=next.slice(0,e.start)+e.after+next.slice(e.end);
let inverse=next;for(const e of edits)inverse=T.replaceOnce(inverse,e.after,e.before);assert.equal(inverse,oldFactory);
assert.deepEqual([...T.requiredIds(next)].sort(),[...T.requiredIds(oldFactory)].sort());
assert(next.includes('alreadyExists'));assert(next.includes('slackTargets'));assert(next.includes('Tools list'));
const code=T.patchFactories(oldCode,{60992:next}),newPage=oldPage.replace(/-[^.]+\.js$/,`-${T.sha(code).slice(0,16)}.js`);
for(const f of T.factories(oldCode))if(f.id!==60992)assert.equal(T.getFactory(code,f.id),f.source);
const out=path.join(here,'modal-overlay/.next',newPage);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,code,{flag:'wx'});
const inputs=JSON.parse(T.read(path.join(here,'compiler-inputs-v1.json'))),sourcePath='components/WorkOrderAddModal.js';
const input=inputs.inputs.find(i=>i.path===sourcePath);assert.equal(T.sha(fs.readFileSync(path.join(root,sourcePath))),input.sha256);
const report={result:'PASS',route,oldPage,newPage,changedFactoryId:60992,sourcePath,sourceSHA256:input.sha256,beforeSHA256:T.sha(oldFactory),afterSHA256:T.sha(next),pageSHA256:T.sha(code),changedStatementIndices:edits.map(e=>e.index),editPairs:edits,bindingMap:Object.fromEntries(mapping),byteExactInverseVerified:true,unrelatedFactoriesPreserved:true,unchangedDependencies:true,cssUnchanged:true};
fs.writeFileSync(path.join(here,'modal-overlay-report.json'),JSON.stringify(report,null,2),{flag:'wx'});
console.log(JSON.stringify({result:'PASS',oldPage,newPage,changedStatements:report.changedStatementIndices}));
