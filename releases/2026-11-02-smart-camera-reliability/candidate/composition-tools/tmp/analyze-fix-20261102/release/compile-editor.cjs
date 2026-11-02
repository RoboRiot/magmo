"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const P=require('@babel/parser'),T=require('@babel/traverse').default,G=require('@babel/generator').default;
const babel=require('@babel/core'),F=require('../../ot-collapse-20260928/factory-tools.cjs');
const outputName=process.argv[2]||'editor-overlay';assert(/^[a-z0-9-]+$/.test(outputName));
const here=__dirname,root=path.resolve(here,'../../..'),base=path.join(here,'source'),out=path.join(here,outputName);
const inputs={},source=name=>{const s=fs.readFileSync(path.join(root,name),'utf8');inputs[name]=F.sha(s);return s;};
const s=source('pages/NewSearch/item/[id]/index.js'),helper=source('utils/itemVisionIndexClient.cjs');
const ast=P.parse(s,{sourceType:'module',plugins:['jsx']}),component=ast.program.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name==='DisplayItemInner');
const stateStart=component.body.body.find(n=>n.type==='VariableDeclaration'&&n.declarations[0].id.elements?.[0]?.name==='savedVisionIndexWarning');
const fn=component.body.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name==='retrySavedItemAssets');assert(stateStart&&fn);
const sourceDecl=name=>{const value=component.body.body.flatMap(n=>n.type==='VariableDeclaration'?n.declarations:[]).find(n=>n.id.name===name);assert(value,name);return value;};
let modal;
T(ast,{JSXElement(p){const n=p.node.openingElement;if(n.name.name==='Modal'&&n.attributes.some(v=>v.name?.name==='show'&&v.value?.expression?.name==='showSaveModal')){assert(!modal);modal=p.node;}}});assert(modal);
const jsxCompiled=babel.transformSync('const __modal='+s.slice(modal.start,modal.end),{babelrc:false,configFile:false,presets:[[require('next/dist/compiled/babel/bundle').presetReact().default,{runtime:'automatic',development:false}]]}).code;
const jsxAst=P.parse(jsxCompiled,{sourceType:'module'}),jsxNode=jsxAst.program.body.find(n=>n.type==='VariableDeclaration').declarations[0].init;
function mapped(code,mapping){const a=P.parse(code,{sourceType:'module'});const globals=new Set(['console','String','Error','undefined','Boolean','URL']);T(a,{ReferencedIdentifier(p){if(p.scope.hasBinding(p.node.name)||globals.has(p.node.name))return;assert(Object.hasOwn(mapping,p.node.name),'Unmapped editor dependency '+p.node.name);p.replaceWith(P.parseExpression(mapping[p.node.name]));p.skip();}});return G(a,{compact:true,comments:false}).code;}
function expr(code,mapping){return G(P.parse(mapped('const __value=('+code+');',mapping)).program.body[0].declarations[0].init,{compact:true,comments:false}).code;}
const manifest=JSON.parse(fs.readFileSync(path.join(base,'.next/build-manifest.json'),'utf8'));
const client=manifest.pages['/NewSearch/item/[id]'].find(n=>n.startsWith('static/chunks/pages/'));
const targets=[
 {file:'.next/server/pages/NewSearch/item/[id].js',id:16859,component:'ag',react:'f',jsx:'e',firebase:'k.A',modal:'g.aF',button:'g.$n',report:'b',docId:'ak',oldId:'x',show:'n',open:'(()=>bX(!0))();',photos:'bu',setPhotos:'bv',upload:'eT',photoUrls:'c',operation:'Z',router:'d',redirect:'m',close:'d9',showModal:'bW',setShowModal:'bX',category:'bw',captured:'cG',setCaptured:'cH',closeCamera:'eZ',photoModule:'G',pending:'ah'},
 {file:'.next/'+client,id:57784,component:'eL',react:'n',jsx:'i',firebase:'j.A',modal:'a.A',button:'l.A',report:'r',docId:'eo',oldId:'H',show:'u',open:'(()=>tr(!0))();',photos:'rR',setPhotos:'rD',upload:'an',photoUrls:'t',operation:'eD',router:'x',redirect:'d',close:'nS',showModal:'te',setShowModal:'tr',category:'rB',captured:'tY',setCaptured:'tJ',closeCamera:'ad',photoModule:'q',pending:'eB'},
];
assert(!fs.existsSync(out));fs.mkdirSync(out);
const changes=[];
for(const target of targets){
 const original=fs.readFileSync(path.join(base,target.file),'utf8'),factory=F.getFactory(original,target.id),wrapped='('+factory+')',a=P.parse(wrapped);
 let comp,finish,modalCall,photosStatement,uploadStatement;const declarations=new Map(),calls=[],ifs=[],assignments=[],returns=[];
 const text=n=>wrapped.slice(n.start,n.end),prop=(node,key)=>node.arguments[1]?.properties?.find(p=>p.key?.name===key);
 T(a,{FunctionDeclaration(p){if(p.node.id.name===target.component)comp=p.node;},VariableDeclarator(p){if(p.node.id.type==='Identifier')declarations.set(p.node.id.name,p.node);if(p.node.id.type==='ArrayPattern'&&p.node.id.elements[0]?.name===target.photos)photosStatement=p.parentPath.node;if(p.node.init?.type==='AwaitExpression'&&p.node.init.argument.callee?.name===target.upload)uploadStatement=p.parentPath.node;},IfStatement(p){ifs.push(p.node);},AssignmentExpression(p){assignments.push(p.node);},ReturnStatement(p){returns.push(p.node);},ExpressionStatement(p){if(p.node.expression.callee?.name===target.report&&p.node.expression.arguments?.[0]?.value==='Finishing save…'){assert(!finish);finish=p.node;}},CallExpression(p){calls.push(p.node);if(prop(p.node,'show')?.value?.name===target.showModal){assert(!modalCall);modalCall=p.node;}}});assert(comp&&finish&&modalCall&&photosStatement&&uploadStatement);
 const mapping={useState:'(0,'+target.react+'.useState)',useRef:'(0,'+target.react+'.useRef)',firebase:target.firebase,requestItemVisionIndexSync:'__mVisionClient.requestItemVisionIndexSync',Modal:target.modal,Button:target.button,_jsx:'(0,'+target.jsx+'.jsx)',_jsxs:'(0,'+target.jsx+'.jsxs)',savedItemNavigationHref:'__magmoSavedItemNavigationHref',setSavedItemNavigationHref:'__magmoSetSavedItemNavigationHref',navigateToSavedItem:'__magmoNavigateToSavedItem',photos:target.photos,setPhotos:target.setPhotos,uploadPhotos:target.upload,itemOperationRef:target.operation,router:target.router,id:target.oldId,setShowSaveModal:target.setShowModal,showSaveModal:target.showModal,handleCloseSaveModal:target.close,normalizeItemPhotoCategory:'(0,'+target.photoModule+'.l4)',createItemPhotoStorageName:'(0,'+target.photoModule+'.Yz)',capturedPhoto:target.captured,setCapturedPhoto:target.setCaptured,activePhotoCategory:target.category,handleCloseCameraModal:target.closeCamera,handleShowSaveModal:'(()=>'+target.setShowModal+'(!0))',...Object.fromEntries(['savedVisionIndexWarning','savedVisionIndexBusy','updateSavedItemIndex','finishSavedItemAssets','retrySavedItemAssets','savedAssetPhotosRef','savedAssetRecoveryRef'].map(n=>[n,n]))};
 const states=mapped(s.slice(stateStart.start,fn.end).replace('savedAssetPhotosRef.current = photos;',''),mapping);
 const modalText=mapped('const __modal='+G(jsxNode).code,mapping);
 const modalReplacement=G(P.parse(modalText).program.body[0].declarations[0].init,{compact:true,comments:false}).code;
 const showText=`if(${target.show}){${target.open}}`;assert.equal(factory.split(showText).length,2);
 const navigationIf=ifs.find(n=>n.start>finish.start&&text(n.test)===target.redirect&&text(n).includes('__magmoNavigateToSavedItem'));assert(navigationIf);
 const savedReturn=returns.find(n=>n.argument?.type==='ObjectExpression'&&n.argument.properties.some(p=>p.key?.name==='docId'&&p.value.name===target.docId)&&n.argument.properties.some(p=>p.key?.name==='photoUrls'&&p.value.name===target.photoUrls));assert(savedReturn);
 const slackGuards=ifs.filter(n=>/^![a-zA-Z]+\?\.docId$/.test(text(n.test)));assert.equal(slackGuards.length,1);const slackGuard=slackGuards[0],savedResultName=slackGuard.test.argument.object.name;
 const edits=[
  {start:comp.start-1,end:comp.start-1,text:`const __mVisionClient=(function(){const module={exports:{}};const exports=module.exports;${helper}\nreturn module.exports;})();`,label:'index-client-helper'},
  {start:comp.body.start,end:comp.body.start,text:states,label:'index-state-and-retry'},
  {start:photosStatement.end-1,end:photosStatement.end-1,text:`savedAssetPhotosRef.current=${target.photos};`,label:'current-photo-snapshot'},
  {start:uploadStatement.start-1,end:uploadStatement.end-1,text:`savedAssetRecoveryRef.current={itemId:${target.docId},previousItemId:${target.oldId},redirect:${target.redirect}};const __mSavedAssets=await finishSavedItemAssets(${target.docId},${target.oldId},${target.report});const ${target.photoUrls}=__mSavedAssets.photoUrls;const __mVisionReady=__mSavedAssets.indexReady;`,label:'post-commit-photo-index-recovery'},
  {start:navigationIf.test.start-1,end:navigationIf.test.end-1,text:`${target.redirect}&&__mSavedAssets.photosComplete`,label:'keep-pending-originals-before-rename'},
  {start:savedReturn.argument.start,end:savedReturn.argument.start,text:'photosComplete:__mSavedAssets.photosComplete,',label:'saved-photo-completion-contract'},
  {start:slackGuard.test.start-1,end:slackGuard.test.end-1,text:`!${savedResultName}?.docId||${savedResultName}.photosComplete===false`,label:'retain-downstream-stop-on-upload-failure'},
  {start:factory.indexOf(showText),end:factory.indexOf(showText)+showText.length,text:`if(${target.show}||!__mVisionReady){${target.open}}`,label:'saved-warning-dialog'},
  {start:modalCall.start-1,end:modalCall.end-1,text:modalReplacement,label:'index-warning-retry-ui'},
 ].sort((a,b)=>a.start-b.start);
 for(const[local,name]of[[target.upload,'uploadPhotos'],[target.close,'handleCloseSaveModal']]){const old=declarations.get(local),fresh=sourceDecl(name);assert(old&&fresh);edits.push({start:old.init.start-1,end:old.init.end-1,text:expr(s.slice(fresh.init.start,fresh.init.end),mapping),label:name});}
 const input=calls.find(n=>n.arguments[0]?.value==='input'&&prop(n,'type')?.value?.value==='file'&&prop(n,'onChange'));assert(input);const selected=sourceDecl('handleFilesSelected');edits.push({start:prop(input,'onChange').value.start-1,end:prop(input,'onChange').value.end-1,text:expr(s.slice(selected.init.start,selected.init.end),mapping),label:'serialize-photo-selection'});
 const camera=calls.find(n=>prop(n,'onClick')&&text(prop(n,'onClick').value).includes('file:'+target.captured)&&text(prop(n,'onClick').value).includes('URL.createObjectURL'));assert(camera);const captured=sourceDecl('savePhoto');edits.push({start:prop(camera,'onClick').value.start-1,end:prop(camera,'onClick').value.end-1,text:expr(s.slice(captured.init.start,captured.init.end),mapping),label:'serialize-camera-selection'});
 if(target.id===57784){const reset=assignments.find(n=>text(n)==='en.current=e');assert(reset);edits.push({start:reset.start-1,end:reset.end-1,text:'(en.current=e,savedAssetRecoveryRef.current=null,setSavedVisionIndexWarning(null))',label:'reset-recovery-for-new-route'});}
 const row=calls.find(n=>prop(n,'className')&&text(prop(n,'className').value).includes('photoActionsRow'));assert(row);let banner;T(ast,{JSXExpressionContainer(p){if(p.node.expression.type==='LogicalExpression'&&s.slice(p.node.start,p.node.end).includes('Review saved item status'))banner=p.node.expression;}});assert(banner);const bannerJs=babel.transformSync('const __banner='+s.slice(banner.start,banner.end),{babelrc:false,configFile:false,presets:[[require('next/dist/compiled/babel/bundle').presetReact().default,{runtime:'automatic',development:false}]]}).code;const bannerNode=P.parse(bannerJs,{sourceType:'module'}).program.body.find(n=>n.type==='VariableDeclaration').declarations[0].init;let rowText=text(row);const disable=calls.filter(n=>n.start>row.start&&n.end<row.end&&prop(n,'onClick')&&((text(prop(n,'children')?.value||n).includes('"Take "'))||(text(prop(n,'children')?.value||n).includes('"Browse "'))));assert.equal(disable.length,2);for(const n of disable.sort((a,b)=>b.start-a.start)){const at=n.arguments[1].start-row.start+1;rowText=rowText.slice(0,at)+'disabled:'+target.pending+','+rowText.slice(at);}edits.push({start:row.start-1,end:row.end-1,text:`(0,${target.jsx}.jsxs)(${target.jsx}.Fragment,{children:[${expr(G(bannerNode).code,mapping)},${rowText}]})`,label:'visible-pending-assets-and-input-lock'});
 edits.sort((a,b)=>a.start-b.start);
 for(let i=1;i<edits.length;i++)assert(edits[i-1].end<=edits[i].start);
 for(const e of edits)e.original=factory.slice(e.start,e.end);
 let patched=factory;for(const e of [...edits].reverse())patched=patched.slice(0,e.start)+e.text+patched.slice(e.end);P.parseExpression(patched);
 let delta=0;const inverse=edits.map(e=>{const start=e.start+delta;delta+=e.text.length-(e.end-e.start);return{start,end:start+e.text.length,text:e.original};});let reverted=patched;for(const e of inverse.reverse())reverted=reverted.slice(0,e.start)+e.text+reverted.slice(e.end);assert.equal(reverted,factory);
 const updated=F.patchFactories(original,{[target.id]:patched});for(const f of F.factories(original))if(f.id!==target.id)assert.equal(F.getFactory(updated,f.id),f.source);
 const dest=path.join(out,target.file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,updated,{flag:'wx'});
 changes.push({file:target.file,moduleId:target.id,oldSHA256:F.sha(original),newSHA256:F.sha(updated),oldFactorySHA256:F.sha(factory),newFactorySHA256:F.sha(patched),edits,inverseExact:true});
}
fs.writeFileSync(path.join(out,'receipt.json'),JSON.stringify({inputs,changes,externalWrites:0},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({compiled:changes.map(c=>c.file),externalWrites:0}));
