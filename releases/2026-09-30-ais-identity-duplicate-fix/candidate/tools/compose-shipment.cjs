"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../.."), relative = ".next/server/chunks/4895.js";
const source = T.read(path.join(here, "source", relative));
const baseline = JSON.parse(T.read(path.join(here, "baseline.json")));
const frozenInputs = JSON.parse(T.read(path.join(here, "compiler-inputs-v5.json")));
const helperId = 93900000;
for (const file of T.walk(path.join(here,"source/.next/server")).filter(file=>file.endsWith(".js"))) assert(!T.factories(T.read(file)).some(f=>f.id===helperId), "New helper ID collides");
function frozen(relativePath) {
  const input = frozenInputs.inputs.find(i=>i.path===relativePath); assert(input);
  const file = path.join(here, frozenInputs.workspace, relativePath), code = T.read(file);
  assert.equal(T.sha(code), input.sha256); return code;
}
function moduleFactory(code, mappings) {
  const ast = parser.parse(code), edits=[];
  traverse(ast,{CallExpression(p){if(p.node.callee.type!=="Identifier"||p.node.callee.name!=="require")return;
    assert(!p.scope.getBinding("require"),"Shadowed source require is unsupported");
    assert.equal(p.node.arguments.length,1);assert.equal(p.node.arguments[0].type,"StringLiteral");
    const name=p.node.arguments[0].value;assert(Object.hasOwn(mappings,name),`Unreviewed require ${name}`);
    edits.push({start:p.node.start,end:p.node.end,value:`__webpack_require__(${mappings[name]})`});
  }});
  for(const edit of edits.sort((a,b)=>b.start-a.start))code=code.slice(0,edit.start)+edit.value+code.slice(edit.end);
  const result=`function(module,exports,__webpack_require__){${code}\n}`;parser.parseExpression(result);return result;
}
const serviceSource=frozen("lib/inventory/shipmentSystemService.cjs"),identitySource=frozen("lib/items/itemIdentity.cjs");
const service=moduleFactory(serviceSource,{"node:crypto":77598,"./shipmentSystemContract.cjs":88898,"../items/itemIdentity.cjs":helperId});
const helper=moduleFactory(identitySource,{});
let next=T.patchFactories(source,{51585:service});
const end=T.factories(next)[0].objectEnd;next=next.slice(0,end-1)+`,${helperId}:${helper}`+next.slice(end-1);
parser.parse(next);
const before=T.factories(source),after=new Map(T.factories(next).map(f=>[f.id,f.source]));
for(const factory of before)if(factory.id!==51585)assert.equal(after.get(factory.id),factory.source,`Unrelated server factory ${factory.id} changed`);
assert.deepEqual(T.loaderChunks(next),T.loaderChunks(source));
const target=path.join(here,"shipment-overlay",relative);assert(!fs.existsSync(target));fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,next);
const report={createdAt:new Date().toISOString(),baselineRevision:baseline.revision,sourceDirectory:"shipment-overlay",file:relative,changedFactoryId:51585,addedFactoryIds:[helperId],beforeSHA256:T.sha(source),afterSHA256:T.sha(next),moduleSHA256:T.sha(service),identityModuleSHA256:T.sha(helper),sourceHashes:{"lib/inventory/shipmentSystemService.cjs":T.sha(serviceSource),"lib/items/itemIdentity.cjs":T.sha(identitySource)},unrelatedFactoriesPreserved:true,unchangedLoaderChunks:true,productionMutations:0};
fs.writeFileSync(path.join(here,"shipment-overlay-report.json"),JSON.stringify(report,null,2)+"\n",{flag:"wx"});console.log(JSON.stringify(report,null,2));
