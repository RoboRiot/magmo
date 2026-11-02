"use strict";
// Offline, exact-span composition into the captured deployed NewItem module.
// Unrelated source/worktree features and other deployed factories are preserved.
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const P=require("@babel/parser"),T=require("@babel/traverse").default,G=require("@babel/generator").default;
const babel=require("@babel/core"),F=require("../../ot-collapse-20260928/factory-tools.cjs");
const here=__dirname,root=path.resolve(here,"../../.."),base=path.join(here,"source");
const outputName=process.env.ITEM_VISION_NEWITEM_OVERLAY || "newitem-overlay";
assert(/^newitem-overlay(?:-v\d+)?$/.test(outputName),"Use a named local overlay directory");
const out=path.join(here,outputName);
const aliases=JSON.parse(fs.readFileSync(path.join(here,"newitem-aliases.json"),"utf8"));
const inputs={},source=name=>{const text=fs.readFileSync(path.join(root,name),"utf8");inputs[name]=F.sha(text);return text;};
const s=source("pages/NewSearch/AddItem/NewItem.js"),images=source("utils/itemImageAnalysis.js"),indexClient=source("utils/itemVisionIndexClient.cjs");
const sa=P.parse(s,{sourceType:"module",plugins:["jsx"]});
const sc=sa.program.body.find(n=>n.type==="ExportDefaultDeclaration").declaration;assert.equal(sc.id.name,"NewItem");
const sourceDecl=name=>{const d=sc.body.body.flatMap(n=>n.type==="VariableDeclaration"?n.declarations:[]).find(n=>n.id.name===name);assert(d,"Missing source "+name);return d;};
const sourceState=name=>{const d=sc.body.body.find(n=>n.type==="VariableDeclaration"&&n.declarations.some(d=>d.id.name===name||d.id.elements?.[0]?.name===name));assert(d,name);return d;};
const newNames=["analysisError","setAnalysisError","analysisSubmittedPreview","setAnalysisSubmittedPreview","analysisSessionRef","analysisRequestRef","latestPhotosRef","analysisCanApply","savedIndexStatus","setSavedIndexStatus","savedIndexRetryBusy","setSavedIndexRetryBusy","savedIndexRetryRef","savedIndexRetryActiveRef","refreshSavedItemIndex","retrySavedItemIndex","applyAnalysisMatch"];
const mapping={...aliases.globals,...Object.fromEntries(newNames.map(n=>[n,n])),
 preparePhotosForMatching:"__mVisionImages.preparePhotosForMatching",isAnalysisMatchApplicable:"__mVisionImages.isAnalysisMatchApplicable",createPhotoAnalysisSession:"__mVisionImages.createPhotoAnalysisSession",
 requestItemVisionIndexSync:"__mVisionClient.requestItemVisionIndexSync",completeSavedItemIndex:"__mVisionClient.completeSavedItemIndex"};
const globals=new Set(["console","String","Number","Error","Object","Array","JSON","Math","URL","Promise","File","Date","undefined","document","window","fetch","globalThis","AbortController","WeakMap","Map","Uint8Array","crypto","setTimeout","clearTimeout"]);
function mapped(code,extra={}){const a=P.parse(code,{sourceType:"module"});const map={...mapping,...extra};T(a,{ReferencedIdentifier(p){const name=p.node.name;if(p.scope.hasBinding(name)||globals.has(name))return;assert(Object.hasOwn(map,name),"Unmapped dependency "+name);p.replaceWith(P.parseExpression(map[name]));p.skip();}});return G(a,{compact:true,comments:false}).code;}
function expression(code,extra={}){const a=P.parse(mapped("const __value=("+code+");",extra));return G(a.program.body[0].declarations[0].init,{compact:true,comments:false}).code;}
function jsx(node){const code=babel.transformSync("const __value="+s.slice(node.start,node.end),{babelrc:false,configFile:false,presets:[[require("next/dist/compiled/babel/bundle").presetReact().default,{runtime:"automatic",development:false}]]}).code;const n=P.parse(code,{sourceType:"module"}).program.body.find(n=>n.type==="VariableDeclaration").declarations[0].init;return expression(G(n).code);}
function moduleBody(text,esm=false){if(esm)text=babel.transformSync(text,{babelrc:false,configFile:false,plugins:["@babel/plugin-transform-modules-commonjs"]}).code;assert(!/\brequire\(/.test(text));return `(function(){const module={exports:{}};const exports=module.exports;${text}\nreturn module.exports;})()`;}
const file=aliases.source.replace(/^source\//,""),original=fs.readFileSync(path.join(base,file),"utf8"),factory=F.getFactory(original,aliases.factoryId);assert.equal(F.sha(factory),aliases.factorySHA256);
const w="("+factory+")",a=P.parse(w);let component;const decls=new Map(),calls=[],functions=[],assignments=[],tries=[];
T(a,{FunctionDeclaration(p){functions.push(p.node);if(p.node.id.name===aliases.component)component=p.node;},VariableDeclarator(p){if(p.node.id.type==="Identifier")decls.set(p.node.id.name,p.node);},CallExpression(p){calls.push(p.node);},AssignmentExpression(p){assignments.push(p.node);},TryStatement(p){tries.push(p.node);}});assert(component);
const text=n=>w.slice(n.start,n.end),edits=[];
function edit(node,replacement,label){edits.push({start:node.start-1,end:node.end-1,text:replacement,label});}
function insert(position,replacement,label){edits.push({start:position,end:position,text:replacement,label});}
const prop=(call,name)=>call.arguments[1]?.properties?.find(p=>p.key?.name===name||p.key?.value===name);
const modal=name=>calls.find(c=>text(c.callee)==="0,i.jsxs"&&c.arguments[0]?.type==="MemberExpression"&&text(c.arguments[0])==="a.A"&&prop(c,"show")?.value?.name===name);
const sourceModal=name=>{let found;T(sa,{JSXElement(p){if(p.node.openingElement.name.name==="Modal"&&p.node.openingElement.attributes.some(v=>v.name?.name==="show"&&v.value?.expression?.name===name)){assert(!found);found=p.node;}}});assert(found,name);return found;};
const first=sourceState("analysisError"),last=sourceState("analysisCanApply");
const indexFirst=sourceState("savedIndexStatus"),indexLast=sourceState("savedIndexRetryActiveRef");
const newStateText=mapped(s.slice(first.start,last.end)+"\n"+s.slice(indexFirst.start,indexLast.end));
const photoEffect=sc.body.body.find(n=>n.type==="ExpressionStatement"&&s.slice(n.start,n.end).includes("analysisSessionRef.current.isCurrent")&&s.slice(n.start,n.end).includes("[photos]"));assert(photoEffect);
const helpers=["refreshSavedItemIndex","retrySavedItemIndex","applyAnalysisMatch"].map(name=>`const ${name}=${expression(s.slice(sourceDecl(name).init.start,sourceDecl(name).init.end))};`).join("");
insert(component.start-1,`const __mVisionImages=${moduleBody(images,true)};const __mVisionClient=${moduleBody(indexClient)};`,"isolated-photo-and-index-helpers");
insert(component.body.body[0].end-1,newStateText+mapped(s.slice(photoEffect.start,photoEffect.end))+helpers,"analysis-generation-and-index-retry-state");
for(const [local,sourceName] of [["iO","handleAnalyzePhotos"],["ni","uploadPhotos"],["iR","handleCloseSaveModal"]]){
 const target=decls.get(local);assert(target,local);edit(target.init,expression(s.slice(sourceDecl(sourceName).init.start,sourceDecl(sourceName).init.end)),sourceName);
}
const mount=sc.body.body.find(n=>n.type==="ExpressionStatement"&&s.slice(n.start,n.end).includes("isMountedRef.current = true"));assert(mount);
const oldMount=component.body.body[1];assert(text(oldMount).includes("im.current=!1"));edit(oldMount,mapped(s.slice(mount.start,mount.end)),"request-invalidation-on-unmount");
const resetEffect=calls.find(c=>text(c).startsWith("(0,n.useEffect)(")&&text(c).includes("e.query.cloneFrom"));assert(resetEffect);
const reset=assignments.filter(n=>n.start>resetEffect.start&&n.end<resetEffect.end&&text(n)==='is.current=""');assert.equal(reset.length,1);
edit(reset[0],'(is.current="",savedIndexRetryRef.current=null,setSavedIndexStatus(null))',"reset-index-state-on-new-item");
const preview=calls.find(c=>text(c).startsWith("(0,n.useEffect)(")&&text(c).includes("Could not load comparison photo:"));assert(preview);
const sourcePreview=sc.body.body.find(n=>n.type==="ExpressionStatement"&&s.slice(n.start,n.end).includes("Could not load comparison photo:"));assert(sourcePreview);
edit(preview,expression(s.slice(sourcePreview.expression.start,sourcePreview.expression.end)),"preview-actionable-results-from-current-allowed-prefixes");
const uploadInput=calls.find(c=>c.arguments[0]?.value==="input"&&prop(c,"type")?.value?.value==="file"&&prop(c,"onChange"));assert(uploadInput);
edit(prop(uploadInput,"onChange").value,expression(s.slice(sourceDecl("handleFilesSelected").init.start,sourceDecl("handleFilesSelected").init.end)),"block-photo-change-during-save-retry");
const cameraButton=calls.find(c=>prop(c,"onClick")&&text(prop(c,"onClick").value).includes("file:ta")&&text(prop(c,"onClick").value).includes("URL.createObjectURL(ta)"));assert(cameraButton);
edit(prop(cameraButton,"onClick").value,expression(s.slice(sourceDecl("savePhoto").init.start,sourceDecl("savePhoto").init.end)),"block-camera-change-during-save-retry");
const runSave=functions.find(f=>f.id.name==="nn");assert(runSave);insert(runSave.body.start,"if(savedIndexRetryActiveRef.current)return null;","serialize-save-and-index-retry");
const queueCall=calls.find(c=>c.callee.name==="ea"&&c.arguments[0]?.name==="et");assert(queueCall);
const queueAwait={start:queueCall.start-6,end:queueCall.end};assert.equal(text(queueAwait).slice(0,6),"await ");
// This await occurs in a comma sequence; an async IIFE preserves its context.
edit(queueAwait,`await(async()=>{const indexContext={itemId:et,previousItemId:u&&u!==et?u:""};savedIndexRetryRef.current=indexContext;setSavedIndexStatus(null);await refreshSavedItemIndex(indexContext);})()`,"await-photo-uploads-before-indexing");
const oldIndexTry=tries.filter(n=>text(n).includes('"/api/items/sync-index"')&&n.handler&&text(n.handler).includes('"Smart Camera index update failed:"'));assert.equal(oldIndexTry.length,1);edit(oldIndexTry[0],"","remove-swallowed-background-index-refresh");
const analysisModal=modal("tV"),saveModal=modal("rM");assert(analysisModal&&saveModal,"exact modal calls");
edit(analysisModal,jsx(sourceModal("showAnalysisModal")),"actionable-match-modal-and-snapshot-preview");
edit(saveModal,jsx(sourceModal("showSaveModal")),"committed-item-index-retry-modal");
const photoRow=calls.find(c=>prop(c,"className")&&text(prop(c,"className").value).includes("photoActionsRow"));assert(photoRow);
let banner;T(sa,{JSXExpressionContainer(p){const v=p.node.expression;if(v.type==="LogicalExpression"&&s.slice(v.start,v.end).startsWith("savedIndexStatus && !savedIndexStatus.complete")&&s.slice(v.start,v.end).includes("Review saved item status")){assert(!banner);banner=v;}}});assert(banner);
// Retain all existing row content; put the new status banner immediately before it.
edit(photoRow,`(0,i.jsxs)(i.Fragment,{children:[${jsx(banner)},${text(photoRow)}]})`,"visible-index-retry-status");
// Disabled props lie inside photoRow: fold these into that same replacement to
// keep patch spans non-overlapping and preserve every other row byte.
const rowEdit=edits.find(e=>e.label==="visible-index-retry-status");
const within=calls.filter(c=>c.start>photoRow.start&&c.end<photoRow.end&&prop(c,"onClick"));
const disable=[];
for(const call of within){const click=text(prop(call,"onClick").value);let value;
 if(click==="iO")value="!rl.length||tq||ic||savedIndexRetryBusy";
 else if(click.includes("rT(!0)")||click.includes("t7.current.click()"))value="ic||savedIndexRetryBusy";
 else continue;
 const property=prop(call,"disabled");
 if(property)disable.push({start:property.value.start-photoRow.start,end:property.value.end-photoRow.start,text:value});
 else disable.push({start:call.arguments[1].start-photoRow.start+1,end:call.arguments[1].start-photoRow.start+1,text:"disabled:"+value+","});
}
assert.equal(disable.length,3);let row=text(photoRow);for(const e of disable.sort((a,b)=>b.start-a.start))row=row.slice(0,e.start)+e.text+row.slice(e.end);
rowEdit.text=`(0,i.jsxs)(i.Fragment,{children:[${jsx(banner)},${row}]})`;
edits.sort((a,b)=>a.start-b.start);for(let k=1;k<edits.length;k++)assert(edits[k-1].end<=edits[k].start,"Overlapping "+edits[k-1].label+" / "+edits[k].label);
for(const e of edits)e.original=factory.slice(e.start,e.end);
let patched=factory;for(const e of [...edits].reverse())patched=patched.slice(0,e.start)+e.text+patched.slice(e.end);P.parseExpression(patched);
let delta=0;const inverse=edits.map(e=>{const start=e.start+delta;delta+=e.text.length-(e.end-e.start);return{start,end:start+e.text.length,text:e.original};});
let reverted=patched;for(const e of inverse.reverse())reverted=reverted.slice(0,e.start)+e.text+reverted.slice(e.end);assert.equal(reverted,factory,"Unrelated bytes changed");
const updated=F.patchFactories(original,{[aliases.factoryId]:patched});for(const entry of F.factories(original))if(entry.id!==aliases.factoryId)assert.equal(F.getFactory(updated,entry.id),entry.source);
for(const [name,hash]of Object.entries(inputs))assert.equal(F.sha(fs.readFileSync(path.join(root,name))),hash,"Source changed while composing");
assert(!fs.existsSync(out),"Preserve existing overlay");const target=path.join(out,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,updated,{flag:"wx"});
const receipt={inputs,changes:[{file,moduleId:aliases.factoryId,oldSHA256:F.sha(original),newSHA256:F.sha(updated),oldFactorySHA256:F.sha(factory),newFactorySHA256:F.sha(patched),edits,inverseExact:true,unrelatedFactoriesPreserved:true}],staticServerShellUnchanged:true,externalWrites:0};
fs.writeFileSync(path.join(out,"receipt.json"),JSON.stringify(receipt,null,2)+"\n",{flag:"wx"});console.log(JSON.stringify({compiled:file,selectedSpans:edits.length,externalWrites:0}));
