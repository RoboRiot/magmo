"use strict";
// Compile only the selected API and its new private helpers into the captured
// production module. Existing auth, SDK, OEM lookup and all other modules stay.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const babel=require('@babel/core'),P=require('@babel/parser'),T=require('@babel/traverse').default;
const F=require('../../ot-collapse-20260928/factory-tools.cjs');
const outputName=process.argv[2]||'api-overlay';assert(/^[a-z0-9-]+$/.test(outputName));
const here=__dirname,root=path.resolve(here,'../../..'),out=path.join(here,outputName);
const inputs={};
function source(name){const text=fs.readFileSync(path.join(root,name),'utf8');inputs[name]=F.sha(text);return text;}
function cjs(text){return babel.transformSync(text,{babelrc:false,configFile:false,plugins:[require.resolve('@babel/plugin-transform-modules-commonjs')],compact:false,comments:true}).code;}
function localModule(text,dependencies={}){
 const allowed=new Set(Object.keys(dependencies));
 T(P.parse(text,{sourceType:'unambiguous'}),{CallExpression(p){if(p.node.callee.name==='require'){assert.equal(p.node.arguments[0].type,'StringLiteral');assert(allowed.has(p.node.arguments[0].value),'Unexpected new dependency: '+p.node.arguments[0].value);}}});
 const mapping='{'+Object.entries(dependencies).map(([key,value])=>JSON.stringify(key)+':'+value).join(',')+'}';
 return `(function(){const module={exports:{}};const exports=module.exports;const deps=${mapping};const require=name=>{if(!Object.prototype.hasOwnProperty.call(deps,name))throw Error('Unmapped compiled dependency');return deps[name];};${text}\nreturn module.exports;})()`;
}
const prefixSource=source('lib/items/itemEditorOperations.cjs');
const prefixNode=P.parse(prefixSource).program.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name==='getItemPhotoStoragePrefixes');assert(prefixNode);
const prefixFunction=prefixSource.slice(prefixNode.start,prefixNode.end);
const photo=localModule(source('lib/items/visionPhotoIndex.cjs'),{
 'node:crypto':"__nativeRequire('node:crypto')",'../../utils/askMagmoPrivateBoundary.cjs':'__boundary',
 './itemEditorOperations.cjs':'{getItemPhotoStoragePrefixes:'+prefixFunction+'}',
});
const index=localModule(cjs(source('utils/itemVisionIndex.js')));
assert(!fs.existsSync(out),'Preserve previous compiler output');fs.mkdirSync(out);
const changes=[];
for(const [name,id] of [['analyze',37922],['sync-index',31328],['change-requests',8845]]){
 const rel=`.next/server/pages/api/items/${name}.js`,original=fs.readFileSync(path.join(here,'source',rel),'utf8');
 const old=F.getFactory(original,id);
 const usesOem=name==='analyze';
 const approval=name==='change-requests',hasConfig=name!=='sync-index';
 const deps={
  '../../../context/FirebaseAdmin':'__admin','../../../utils/apiAuth':'__auth',
  '../../../utils/itemVisionIndex':'__index','../../../lib/items/visionPhotoIndex.cjs':'__photos',
  ...(usesOem?{'openai':'__openai','firebase-admin/storage':'__storage','../../../utils/askMagmoPrivateBoundary.cjs':'__boundary','../../../lib/ai/oemItemLookup':'{resolveOfficialOemDomains:__oem.E,lookupOfficialOemItem:__oem.s}'}:{}),
  ...(approval?{'../../../lib/items/itemChangeRequests.cjs':'__service','../../../utils/itemFormShared':'{buildNameTokens:__fields.SJ,buildGeneralSearchTokens:__fields.jO,buildWorkOrderTokens:__fields.sv}'}:{}),
 };
 const code=cjs(source(`pages/api/items/${name}.js`));
 const selected=localModule(code,deps);
 const replacement=`(module,exports,__w)=>{__w.a(module,async(__deps,__done)=>{try{__w.r(exports);const __nativeRequire=require;let __admin=__w(12031),__auth=__w(73847)${usesOem?',__openai=__w(87984),__storage=__w(24803)':''};let __pending=__deps([__admin,__auth${usesOem?',__openai,__storage':''}]);[__admin,__auth${usesOem?',__openai,__storage':''}]=__pending.then?(await __pending)():__pending;const __boundary=__w(27779)${usesOem?',__oem=__w(58736)':''}${approval?',__service=__w(56650),__fields=__w(40408)':''};const __photos=${photo};const __index=${index};const __selected=${selected};__w.d(exports,{default:()=>__selected.default${hasConfig?',config:()=>__selected.config':''}});__done();}catch(error){__done(error);}});}`;
 P.parseExpression(replacement);
 // sync-index previously did not import the storage boundary module. Copy the
 // exact already-deployed boundary factory when adding this one dependency.
 let base=original;
 if(!F.factories(base).some(f=>f.id===27779)){
  const boundary=F.getFactory(fs.readFileSync(path.join(here,'source/.next/server/pages/api/items/analyze.js'),'utf8'),27779);
  const n=F.factories(base).find(f=>f.id===id);base=base.slice(0,n.objectEnd-1)+`,27779:${boundary}`+base.slice(n.objectEnd-1);
 }
 const updated=F.patchFactories(base,{[id]:replacement});
 for(const factory of F.factories(original))if(factory.id!==id)assert.equal(F.getFactory(updated,factory.id),factory.source,'Unrelated module changed');
 const target=path.join(out,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,updated,{flag:'wx'});
 changes.push({file:rel,moduleId:id,oldSHA256:F.sha(original),newSHA256:F.sha(updated),oldFactorySHA256:F.sha(old),newFactorySHA256:F.sha(replacement),unrelatedFactoriesPreserved:true});
}
fs.writeFileSync(path.join(out,'receipt.json'),JSON.stringify({compiler:'Babel module transform, exact production module substitution',inputs,changes,externalWrites:0},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({compiled:changes.map(c=>c.file),sourceFiles:Object.keys(inputs),externalWrites:0}));
