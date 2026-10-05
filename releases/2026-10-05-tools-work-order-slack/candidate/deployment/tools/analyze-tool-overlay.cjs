const path=require('path'),fs=require('fs');
const T=require('../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs');
const base=path.join(__dirname,'source/.next'),oracle=path.join(__dirname,'compiler-workspace-v1/compiler-output');
const route='/NewSearch/Tools/[id]';
const bg=T.graph(base,route),fg=T.graph(oracle,route);
const bm=JSON.parse(T.read(path.join(base,'build-manifest.json'))),fm=JSON.parse(T.read(path.join(oracle,'build-manifest.json')));
const oldPage=bm.pages[route].find(f=>f.includes('/pages/'));
const newPage=fm.pages[route].find(f=>f.includes('/pages/'));
const oldFactories=T.factories(T.read(path.join(base,oldPage)));
const oldEntry=oldFactories.find(f=>f.source.includes('Tool submitted to Slack successfully.'));
const freshEntry=T.factories(T.read(path.join(oracle,newPage))).find(f=>f.source.includes('Tool Label Sent'));
const signature=s=>T.canonical(T.remap(s,new Map([...T.requiredIds(s)].map(id=>[id,0]))));
console.log(JSON.stringify({oldPage,newPage,oldEntry:oldEntry.id,freshEntry:freshEntry.id,oldHeader:oldEntry.source.slice(0,1400),freshHeader:freshEntry.source.slice(0,1400)},null,2));
for(const id of T.requiredIds(freshEntry.source)){
  const f=fg.get(id);const expected=signature(f);const matches=[...bg].filter(([old,s])=>Math.abs(s.length-f.length)<60).filter(([old,s])=>signature(s)===expected).map(([old])=>old);
  console.log(JSON.stringify({id,matches,size:f?.length,start:f?.slice(0,420)}));
}
