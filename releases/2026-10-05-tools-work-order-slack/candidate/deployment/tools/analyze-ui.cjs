"use strict";
const fs=require('node:fs'),path=require('node:path'),parser=require('@babel/parser');
const T=require('../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs');
const here=__dirname;
const roots=[['baseline','source/.next'],['oracle','compiler-workspace-v1/compiler-output']];
const reports=[];
for(const [label,relative] of roots){
 const root=path.join(here,relative),mf=path.join(root,'build-manifest.json');if(!fs.existsSync(mf))continue;
 const manifest=JSON.parse(T.read(mf));
 for(const route of ['/NewSearch/mainSearch','/NewSearch/inventory/inventoryManage','/NewSearch/Tools/[id]']){
  const graph=T.graph(root,route);
  for(const[id,factory]of graph){
   if(!factory.includes('work-order-add-final-check-title')&&!factory.includes('"tools"')&&!factory.includes('TOOL_PREFIX'))continue;
   if(!factory.includes('work-order-add-final-check-title')&&!factory.includes('componentItems'))continue;
   const ast=parser.parse('('+factory+')'); const statements=ast.program.body[0].expression.body.body;
   reports.push({label,route,id,requiredIds:[...T.requiredIds(factory)],statements:statements.map((n,index)=>{
    const code=factory.slice(n.start-1,n.end-1);
    return {index,type:n.type,name:n.id?.name||'',size:code.length,excerpt:code.slice(0,180),markers:[...code.matchAll(/"([^"\n]{6,80})"/g)].slice(0,4).map(m=>m[1])};
   })});
  }
 }
}
fs.writeFileSync(path.join(here,'ui-topology.json'),JSON.stringify(reports,null,2));
console.log(JSON.stringify(reports.map(({label,route,id,requiredIds,statements})=>({label,route,id,requiredIds,statements:statements.length,modal:statements.filter(s=>s.markers.some(m=>m.includes('Scan'))||s.excerpt.includes('function')).map(s=>({index:s.index,name:s.name,size:s.size,markers:s.markers}))})),null,2));
