"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const parser=require("@babel/parser"),traverse=require("@babel/traverse").default;
const T=require("../../ot-collapse-20260928/factory-tools.cjs");
function remap(source,mapping,requireAll=false){
 const ast=parser.parse(`(${source})`),fn=ast.program.body[0].expression,param=fn.params[2],edits=[];
 if(!param)return source;
 traverse(ast,{CallExpression(p){if(p.node.callee.type!=="Identifier"||p.node.callee.name!==param.name||p.scope.getBinding(param.name)?.identifier!==param||p.node.arguments[0]?.type!=="NumericLiteral")return;
  const a=p.node.arguments[0];if(requireAll)assert(mapping.has(a.value),`Unreviewed dependency ${a.value}`);if(mapping.has(a.value))edits.push({start:a.start-1,end:a.end-1,value:String(mapping.get(a.value))});
 }});
 for(const e of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,e.start)+e.value+source.slice(e.end);return source;
}
function inject(source,additions){
 const existing=new Set(T.factories(source).map(f=>f.id));assert([...additions.keys()].every(id=>!existing.has(id)),"Factory collision");
 const end=T.factories(source)[0].objectEnd;const result=source.slice(0,end-1)+[...additions].map(([id,s])=>`,${id}:${s}`).join("")+source.slice(end-1);parser.parse(result);return result;
}
function graph(root,route){
 const manifest=JSON.parse(T.read(path.join(root,"build-manifest.json"))),out=new Map();
 for(const file of [...new Set([...manifest.pages[route],...manifest.pages["/_app"]])].filter(f=>f.endsWith(".js")))for(const f of T.factories(T.read(path.join(root,file)))){if(out.has(f.id))assert.equal(out.get(f.id),f.source,`Conflicting factory ${f.id}`);out.set(f.id,f.source);}
 return out;
}
function replaceOnce(code,oldValue,newValue){assert.equal(code.split(oldValue).length-1,1,`Expected unique string ${oldValue}`);return code.replace(oldValue,newValue);}
module.exports={...T,remap,inject,graph,replaceOnce};
