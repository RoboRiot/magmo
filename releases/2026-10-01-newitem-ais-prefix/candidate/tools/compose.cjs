"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const babel=require("@babel/core"),parser=require("@babel/parser"),traverse=require("@babel/traverse").default,generate=require("@babel/generator").default,b=require("@babel/types");
const T=require("../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs");
const here=__dirname,root=path.resolve(here,"../../.."),source=path.join(here,"source"),out=path.join(here,"scoped-source"),json=n=>JSON.parse(T.read(path.join(here,n)));
const baseline=json("baseline.json"),sourcePath="pages/NewSearch/AddItem/NewItem.js",sourceCode=T.read(path.join(root,sourcePath)),sourceSHA256=T.sha(sourceCode);
assert.equal(sourceSHA256,"c55ae61ffa570b89c39b901108a653bf90f973b0404c4b7e058d018fe517f614");
assert(!fs.existsSync(out),"Candidate already exists");assert.equal(T.sha(fs.readFileSync(path.join(here,"source.zip"))),baseline.archiveSHA256);
const manifest=json("source/.next/build-manifest.json"),route="/NewSearch/AddItem/NewItem",oldPage=manifest.pages[route].find(f=>f.includes("/pages/")),oldAsset=T.read(path.join(source,".next",oldPage)),oldFactory=T.getFactory(oldAsset,19967);
// Compile only the selected JSX control. The production page body and imports are not rebuilt.
const sourceAST=parser.parse(sourceCode,{sourceType:"module",plugins:["jsx"]});let sourceNodes=[];
traverse(sourceAST,{JSXElement(p){if(p.node.openingElement.attributes.some(a=>a.name?.name==="controlId"&&a.value?.value==="localSN"))sourceNodes.push(p.node);}});
assert.equal(sourceNodes.length,1);const jsx=sourceCode.slice(sourceNodes[0].start,sourceNodes[0].end);
const transformed=babel.transformSync(`const __localSN = ${jsx};`,{babelrc:false,configFile:false,presets:[[require("next/dist/compiled/babel/bundle").presetReact().default,{runtime:"automatic",development:false}]]}).code;
const ast=parser.parse(transformed,{sourceType:"module"});const imports=new Map();
for(const n of ast.program.body.filter(n=>n.type==="ImportDeclaration")){assert.equal(n.source.value,"react/jsx-runtime");for(const s of n.specifiers)imports.set(s.local.name,s.imported.name);}
ast.program.body=ast.program.body.filter(n=>n.type!=="ImportDeclaration");
traverse(ast,{ReferencedIdentifier(p){const n=p.node.name;if(imports.has(n))p.replaceWith(b.sequenceExpression([b.numericLiteral(0),b.memberExpression(b.identifier("i"),b.identifier(imports.get(n)))]));
 else if(n==="Form")p.replaceWith(b.memberExpression(b.identifier("o"),b.identifier("A")));
 else if(n==="InputGroup")p.replaceWith(b.memberExpression(b.identifier("m"),b.identifier("A")));
 else if(n==="items")p.replaceWith(b.identifier("y"));else if(n==="setItems")p.replaceWith(b.identifier("x"));}});
const newBlock=generate(ast.program.body[0].declarations[0].init,{compact:true,comments:false}).code;
const factoryAST=parser.parse(`(${oldFactory})`);let oldNodes=[];
traverse(factoryAST,{ObjectProperty(p){if(p.node.key?.name==="controlId"&&p.node.value?.value==="localSN"){assert(p.parentPath.parentPath.isCallExpression());oldNodes.push(p.parentPath.parentPath.node);}}});
assert.equal(oldNodes.length,1);const oldBlock=oldFactory.slice(oldNodes[0].start-1,oldNodes[0].end-1);
assert.equal(oldBlock,'(0,i.jsxs)(o.A.Group,{controlId:"localSN",children:[(0,i.jsx)(o.A.Label,{children:"Local SN"}),(0,i.jsx)(o.A.Control,{type:"text",placeholder:"Enter Local SN",value:y.localSN||"",onChange:na("localSN")})]})');
// Verify the existing aliases against actual imports instead of assigning module IDs by assumption.
for(const importText of ["i=t(37876)","o=t(44837)","m=t(58048)"])assert(oldFactory.includes(importText),`Unexpected JSX import ${importText}`);
assert(oldFactory.includes("[y,x]=(0,n.useState)"),"Unexpected item state bindings");
const newFactory=T.replaceOnce(oldFactory,oldBlock,newBlock);assert.equal(T.replaceOnce(newFactory,newBlock,oldBlock),oldFactory);
assert.deepEqual([...T.requiredIds(newFactory)].sort(),[...T.requiredIds(oldFactory)].sort());
const newAsset=T.patchFactories(oldAsset,{19967:newFactory});assert.equal(T.patchFactories(newAsset,{19967:oldFactory}),oldAsset);
const newPage=oldPage.replace(/-[^.]+\.js$/,`-${T.sha(newAsset).slice(0,16)}.js`),buildId=`newitem-ais-prefix-${T.sha(newAsset).slice(0,16)}`;
const substitutions=[[path.basename(oldPage),path.basename(newPage)],[baseline.buildId,buildId]],changes=new Map([[`.next/${newPage}`,Buffer.from(newAsset)]]),metadataChanges=[];
function replace(old){let next=old;for(const[a,c]of substitutions)next=next.split(a).join(c);let undo=next;for(const[a,c]of[...substitutions].reverse())undo=undo.split(c).join(a);assert.equal(undo,old);return next;}
for(const file of T.walk(path.join(source,".next"))){const rel=T.slash(path.relative(source,file));if(rel.startsWith(".next/static/")||!(/\.(?:js|json|html)$/.test(rel)))continue;const old=T.read(file),next=replace(old);if(old===next)continue;changes.set(rel,Buffer.from(next));metadataChanges.push(rel);}
changes.set(".next/BUILD_ID",Buffer.from(buildId));
const oldBuild=path.join(source,".next/static",baseline.buildId);for(const f of T.walk(oldBuild))changes.set(`.next/static/${buildId}/${T.slash(path.relative(oldBuild,f))}`,Buffer.from(replace(T.read(f))));
fs.cpSync(source,out,{recursive:true});for(const[rel,bytes]of changes){const dest=path.join(out,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);}
const before=new Map(json("baseline-files.json").map(x=>[x.path,x.sha256])),files=T.walk(out).map(f=>({path:T.slash(path.relative(out,f)),sha256:T.sha(fs.readFileSync(f)),bytes:fs.statSync(f).size})).sort((a,c)=>a.path.localeCompare(c.path)),after=new Map(files.map(x=>[x.path,x.sha256]));
assert([...before.keys()].every(p=>after.has(p)));for(const[p,h]of before)if(!changes.has(p)||p.startsWith(".next/static/"))assert.equal(after.get(p),h,`Unexpected change ${p}`);
for(const p of ["index.js","package.json","package-lock.json",".next/server/pages-manifest.json"])assert.equal(after.get(p),before.get(p));
const candidateManifest=JSON.parse(T.read(path.join(out,".next/build-manifest.json")));assert(candidateManifest.pages[route].includes(newPage));
for(const assets of Object.values(candidateManifest.pages))for(const asset of assets)assert(fs.existsSync(path.join(out,".next",asset)),`Missing asset ${asset}`);
const graph=T.graph(path.join(out,".next"),route);for(const id of T.requiredIds(newFactory))assert(graph.has(id),`Missing dependency ${id}`);
const modified=[...before].filter(([p,h])=>after.get(p)!==h).map(([p])=>p).sort(),added=[...after.keys()].filter(p=>!before.has(p)).sort();
const report={result:"PASS",composedAt:new Date().toISOString(),baselineArchiveSHA256:baseline.archiveSHA256,baselineRevision:baseline.revision,baselineUpdateTime:baseline.updateTime,baselineSource:baseline.source,configHash:baseline.configHash,candidateDir:"scoped-source",buildId,oldBuildId:baseline.buildId,sourcePath,sourceSHA256,route,changedFactoryIds:[19967],oldPage,newPage,oldAssetSHA256:T.sha(oldAsset),newAssetSHA256:T.sha(newAsset),oldFactorySHA256:T.sha(oldFactory),newFactorySHA256:T.sha(newFactory),oldBlock,newBlock,sourceJSX:jsx,substitutions,metadataChanges,modified,added,files:files.length,noDeletedFiles:true,unrelatedFilesPreserved:true,allOldStaticAssetsPreserved:true,runtimeConfigChanged:false,serverLogicChanged:false,rulesChanged:false,databaseWrites:0,newDependencies:[],byteExactInverseVerified:true,qaPending:true};
fs.writeFileSync(path.join(here,"composition-report.json"),JSON.stringify(report,null,2)+"\n",{flag:"wx"});
fs.writeFileSync(path.join(here,"candidate-files.json"),JSON.stringify(files,null,2)+"\n",{flag:"wx"});
console.log(JSON.stringify({candidate:out,buildId,modified,added,files:files.length,qaPending:true},null,2));
