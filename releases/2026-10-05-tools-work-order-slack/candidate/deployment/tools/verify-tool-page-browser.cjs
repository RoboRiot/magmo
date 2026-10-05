const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const T=require('../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs');
const playwright=require('C:/Users/mack2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.join(__dirname,'scoped-source/.next');
const manifest=JSON.parse(T.read(path.join(root,'build-manifest.json'))),route='/NewSearch/Tools/[id]';
const assets=[...new Set([...manifest.pages['/_app'],...manifest.pages[route]])];
const pageAsset=assets.find(f=>f.includes('/pages/NewSearch/Tools/'));
const runtimeAsset=assets.find(f=>/\/webpack-[^/]+\.js$/.test(f));
const runtime=T.read(path.join(root,runtimeAsset)),end=runtime.lastIndexOf('})();');assert(end>0);
const instrumented=runtime.slice(0,end)+';self.__tool_require=d;d.c=s;'+runtime.slice(end);
const hashes=Object.fromEntries(assets.map(f=>[f,T.sha(fs.readFileSync(path.join(root,f)))]));
const results=[];
function installFixture(){
  const isNew=location.search.includes('new=1');
  const qa=window.toolQA={writes:[],calls:[],printFail:false,alreadyExists:true,tool:{name:'Digital Multimeter Kit',description:'Synthetic QA tool',workOrders:[{workOrder:'100',date:'2026-01-01'},{workOrder:'200',date:'2026-09-01'}],currentWorkOrder:'100',selectionHistory:[],photoUrls:[],componentItems:[],componentItemIds:[]}};
  const query={where(){return this;},orderBy(){return this;},limit(){return this;},get:async()=>({docs:[],empty:true,size:0,forEach(){}})};
  const doc=p=>({path:p,id:p.split('/').at(-1),get:async()=>({id:p.split('/').at(-1),exists:p==='Tool/AIS_T00047',data:()=>p==='Tool/AIS_T00047'?qa.tool:{}}),set:async(value)=>{qa.writes.push({path:p,value});},update:async(value)=>{qa.writes.push({path:p,value});}});
  const db={collection:name=>({...query,doc:id=>doc(name+'/'+id)}),doc};
  const storageRef=()=>({child:()=>storageRef(),listAll:async()=>({items:[],prefixes:[]})});
  const firebase={firestore:()=>db,auth:()=>({currentUser:{email:'synthetic@example.test',getIdToken:async()=>'synthetic-token'}}),storage:()=>({ref:storageRef})};
  firebase.firestore.FieldValue={serverTimestamp:()=>({syntheticTimestamp:true}),delete:()=>({syntheticDelete:true})};
  const router={isReady:true,query:{id:isNew?'new':'AIS_T00047'},push:()=>{},replace:()=>{},events:{on(){},off(){}}};
  window.toolMocks={firebase,router};
  window.fetch=async(url,options={})=>{
    const body=JSON.parse(options.body||'{}');qa.calls.push({url,body,headers:options.headers});
    if(url==='/api/print/tool-label')return new Response(JSON.stringify(qa.printFail?{ok:false,error:'Synthetic printer unavailable'}:{ok:true,status:'printed'}),{status:qa.printFail?502:200});
    if(url==='/api/slack/add-to-list')return new Response(JSON.stringify({ok:true,alreadyExists:qa.alreadyExists,message:'Tool AIS_T00047 is already on Slack; no duplicate was added.'}),{status:200});
    throw Error('Unexpected mocked request '+url);
  };
}
async function main(){
  const server=http.createServer((req,res)=>{
    const url=new URL(req.url,'http://127.0.0.1');
    if(url.pathname==='/'){res.setHeader('Content-Type','text/html');return res.end('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div>');}
    const relative=decodeURIComponent(url.pathname.replace(/^\/_next\//,'')),file=path.resolve(root,relative);
    if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.statusCode=404;return res.end();}
    res.setHeader('Content-Type',relative.endsWith('.css')?'text/css':'text/javascript');res.end(relative===runtimeAsset?instrumented:fs.readFileSync(file));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port;
  const browser=await playwright.chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try{
    const context=await browser.newContext({viewport:{width:1280,height:1000},reducedMotion:'reduce'}),external=[],errors=[];
    await context.route('**/*',r=>{if(r.request().url().startsWith(origin))return r.continue();external.push(r.request().url());return r.abort();});
    const page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
    async function mount(query=''){
      await page.goto(origin+query);await page.evaluate(installFixture);
      for(const asset of assets.filter(f=>f.endsWith('.css')))await page.addStyleTag({content:T.read(path.join(root,asset)).replace(/@import\s+url\([^)]*\)\s*;/g,'')});
      for(const asset of assets.filter(f=>f.endsWith('.js')&&f!==pageAsset))await page.addScriptTag({url:origin+'/_next/'+asset});
      await page.evaluate(()=>{
        const r=window.__tool_require,m=window.toolMocks;
        r.m[9306]=module=>{module.exports={A:m.firebase};};r.m[89099]=module=>{module.exports={useRouter:()=>m.router};};r.m[59601]=module=>{module.exports={default:({children})=>children};};
        for(const id of [9306,89099,59601])delete r.c[id];
      });
      await page.addScriptTag({url:origin+'/_next/'+pageAsset});
      await page.evaluate(()=>{const r=window.__tool_require,React=r(14232);r(24279).createRoot(document.getElementById('root')).render(React.createElement(r(53915).default));});
      await page.getByRole('button',{name:'Print Label',exact:true}).waitFor();assert.deepEqual(errors,[]);
    }
    await mount();
    assert.equal(await page.getByLabel('Work Order',{exact:true}).inputValue(),'100');results.push('Persisted currentWorkOrder wins over a newer historical date');
    const print=page.getByRole('button',{name:'Print Label',exact:true});assert.equal(await print.isEnabled(),true);
    await print.click();await page.getByRole('dialog').getByText('Tool Label Sent',{exact:true}).waitFor();
    let qa=await page.evaluate(()=>window.toolQA);let printCalls=qa.calls.filter(call=>call.url==='/api/print/tool-label');assert.equal(qa.writes.length,0);assert.equal(printCalls.length,1);assert.deepEqual(printCalls[0].body,{toolId:'AIS_T00047'});assert.equal(printCalls[0].headers.Authorization,'Bearer synthetic-token');
    results.push('Saved tool prints one authenticated ID-only request without any DB save');
    await page.waitForFunction(()=>[...document.querySelectorAll('[role="dialog"]')].some(e=>Number(getComputedStyle(e).opacity)===1));
    await page.screenshot({path:path.join(__dirname,'compiled-tool-print-success.png')});
    await page.getByRole('dialog').getByRole('button',{name:'Close',exact:true}).last().click();
    await page.evaluate(()=>window.toolQA.printFail=true);await print.click();await page.getByText('Synthetic printer unavailable',{exact:true}).waitFor();
    qa=await page.evaluate(()=>window.toolQA);assert.equal(qa.calls.filter(call=>call.url==='/api/print/tool-label').length,2);assert.equal(qa.writes.length,0);results.push('Printer failure stays visible with no automatic retry or item mutation');
    await page.getByRole('dialog').getByRole('button',{name:'Close',exact:true}).last().click();
    await page.getByRole('button',{name:'Slack',exact:true}).click();await page.getByRole('dialog').getByText('Already on Slack',{exact:true}).waitFor();
    qa=await page.evaluate(()=>window.toolQA);const slack=qa.calls.find(call=>call.url==='/api/slack/add-to-list');assert.equal(slack.body.toolId,'AIS_T00047');assert.equal(slack.body.listKey,'tools');assert.equal(slack.body.work_order,'100');
    assert.equal(await page.getByText('Submitted To Slack',{exact:true}).count(),0);assert.equal(await page.getByText('Tool AIS_T00047 is already on Slack; no duplicate was added.',{exact:true}).count()>=1,true);results.push('Tool Slack uses exact ID and shows Already on Slack instead of false new submission');
    const saved=qa.writes.find(write=>write.value.currentWorkOrder);assert.equal(saved.value.currentWorkOrder,'100');results.push('Explicit current work order persists on tool save');
    await page.waitForFunction(()=>[...document.querySelectorAll('[role="dialog"]')].some(e=>Number(getComputedStyle(e).opacity)===1));
    await page.screenshot({path:path.join(__dirname,'compiled-tool-slack-existing.png')});
    await mount('?new=1');assert.equal(await page.getByRole('button',{name:'Print Label',exact:true}).isDisabled(),true);qa=await page.evaluate(()=>window.toolQA);assert.deepEqual(qa.calls.filter(call=>call.url==='/api/print/tool-label'),[]);assert.deepEqual(qa.writes,[]);results.push('Unsaved tool cannot print');
    assert.deepEqual(errors,[]);assert.deepEqual(external,[]);await context.close();
    assert.deepEqual(Object.fromEntries(assets.map(f=>[f,T.sha(fs.readFileSync(path.join(root,f)))])),hashes);
    const receipt={result:'PASS',checkedAt:new Date().toISOString(),pageAsset,pageSHA256:hashes[pageAsset],factoryId:53915,newHelperId:98100520,assetHashes:hashes,results,errors,externalRequests:0,productionRequests:0,productionWrites:0,network:'loopback-only; Firestore/auth/router/LoggedIn/network mocked'};
    fs.writeFileSync(path.join(__dirname,'compiled-tool-page-verification.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
