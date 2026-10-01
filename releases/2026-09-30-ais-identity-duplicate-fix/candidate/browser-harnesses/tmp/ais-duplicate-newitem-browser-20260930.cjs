// Credential-free browser regression: actual NewItem module + real identity and
// transaction helpers. Firestore, auth, router and external side effects are
// replaced only at infrastructure boundaries. Every network route is loopback.
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const root = path.resolve(__dirname, '..');
const artifactArg = process.argv.indexOf('--artifact');
const candidate = artifactArg >= 0 ? path.resolve(process.argv[artifactArg + 1]) : '';
const out = path.join(__dirname, 'ais-duplicate-newitem-browser-' + (candidate ? 'artifact' : 'source'));
fs.mkdirSync(out, { recursive: true });
const write = (name, value) => { const p = path.join(out, name); fs.writeFileSync(p, value); return p; };
const fixture = write('fixture.cjs', `
const params=new URLSearchParams(location.search),scenario=params.get('scenario')||'duplicate';
const original={name:'Original Gantry',localSN:'AIS33551',local_sn:'AIS33551',preserved:'unchanged',saveHistory:[{itemName:'Original Gantry',savedAt:'2025-01-01T00:00:00Z'}]};
const docs=scenario==='legacy'?{'Test/33551':{...original,localSN:'33551',local_sn:'33551'}}:scenario==='archive'?{'ArchivedItemIds/33551':{state:'archived'}}:{'Test/AIS33551':original};
const qa=window.qa={docs,writes:[],calls:[],reads:[],uploads:[],navigation:[],transactions:0};
function snap(r){return{id:r.id,ref:r,exists:Object.hasOwn(docs,r.path),data:()=>docs[r.path]};}
function ref(p){return{path:p,id:p.split('/').at(-1),get:async()=>{qa.reads.push(p);if(scenario==='offline'&&p.startsWith('Test/'))throw Error('Synthetic duplicate lookup unavailable');return snap(ref(p));},set:async v=>{qa.writes.push({path:p,value:v});docs[p]=v;},update:async v=>{qa.writes.push({path:p,value:v});Object.assign(docs[p],v);},isEqual:o=>o?.path===p,collection:n=>collection(p+'/'+n)};}
function collection(name,filters=[]){const q={doc:id=>ref(name+'/'+id),where:(f,op,v)=>collection(name,[...filters,{f,op,v}]),orderBy:()=>q,limit:()=>q,startAfter:()=>q,get:async()=>{const result=Object.keys(docs).filter(p=>p.startsWith(name+'/')&&p.split('/').length===name.split('/').length+1&&filters.every(f=>docs[p][f.f]===f.v)).map(p=>snap(ref(p)));return{docs:result,empty:!result.length,size:result.length,forEach:fn=>result.forEach(fn)};},onSnapshot:cb=>{q.get().then(cb);return()=>{};}};return q;}
const db={collection,doc:ref,runTransaction:async fn=>{qa.transactions++;const writes=[];const result=await fn({get:async r=>{qa.reads.push('transaction:'+r.path);return snap(r);},set:(r,v)=>writes.push({path:r.path,value:v}),update:(r,v)=>writes.push({path:r.path,value:v,merge:true}),delete:r=>writes.push({path:r.path,value:null})});for(const w of writes){qa.writes.push(w);if(w.value===null)delete docs[w.path];else docs[w.path]=w.merge?{...docs[w.path],...w.value}:w.value;}return result;}};
function storageRef(p=''){return{name:p.split('/').at(-1),fullPath:p,child:n=>storageRef(p+'/'+n),listAll:async()=>({items:[],prefixes:[]}),put:async()=>{qa.uploads.push(p);},getDownloadURL:async()=>'',getMetadata:async()=>({})};}
const firebase={firestore:()=>db,auth:()=>({currentUser:{email:'qa@example.com',getIdToken:async()=>'synthetic-token'}}),storage:()=>({ref:storageRef})};
firebase.firestore.FieldPath={documentId:()=>'__name__'};firebase.firestore.FieldValue={delete:()=>({__delete:true}),arrayUnion:(...v)=>v,arrayRemove:(...v)=>v};
const router={query:scenario==='query-id'?{id:'AIS33551'}:{},isReady:true,push:async p=>qa.navigation.push(p),replace:async p=>qa.navigation.push(p),events:{on(){},off(){}}};
window.fetch=async(url,options={})=>{const body=options.body?JSON.parse(options.body):{};qa.calls.push({url,body,method:options.method});return new Response(JSON.stringify({ok:true,entries:[],trailers:[]}),{status:200});};
module.exports={firebase,router};
`);
const stubs = {};
for (const [name, source] of Object.entries({
  firebase: `module.exports=require('./fixture.cjs').firebase;`,
  router: `module.exports={useRouter:()=>require('./fixture.cjs').router};`,
  auth: `module.exports={useAuth:()=>({authUser:{email:'qa@example.com',role:'admin',isAdmin:true},signOut(){}})};`,
  null: `function Empty(){return null;}module.exports={__esModule:true,default:Empty,LocationControls:Empty};`,
  logged: `module.exports=function Logged({children}){return children||null;};`,
  link: `const React=require('react');module.exports=function Link({children,href,...rest}){return React.createElement('a',{...rest,href},children);};`,
  dynamic: `module.exports=()=>()=>null;`,
  fetch: `module.exports={fetchClients:async()=>[],fetchMachinesForClient:async()=>[],formatDate:v=>String(v||'')};`,
  styles: `module.exports={__esModule:true,default:new Proxy({},{get:(_t,p)=>String(p)})};`,
  css: `module.exports=()=>'';`,
})) stubs[name] = write(name + '.cjs', source);
const loader = write('jsx-loader.cjs', `const babel=require(${JSON.stringify(require.resolve('@babel/core'))});module.exports=function(source){return babel.transformSync(source,{filename:this.resourcePath,babelrc:false,configFile:false,presets:[require(${JSON.stringify(require.resolve('next/babel'))})],plugins:[function(){return{visitor:{ExportNamedDeclaration(p){if(p.node.declaration?.id?.name==='getServerSideProps')p.remove();}}}}],envName:'test'}).code;};`);
let artifactCss = '', registry = '', artifactInputs = null;
if (candidate) {
  const T = require('./ot-collapse-20260928/factory-tools.cjs');
  const manifest = JSON.parse(T.read(path.join(candidate, 'build-manifest.json')));
  const files = [...new Set([...manifest.pages['/_app'], ...manifest.pages['/NewSearch/AddItem/NewItem']])];
  artifactInputs = {
    buildId: T.read(path.join(candidate, 'BUILD_ID')).trim(),
    manifestSHA256: sha256(fs.readFileSync(path.join(candidate, 'build-manifest.json'))),
    assets: files.map(file => ({ path: file, sha256: sha256(fs.readFileSync(path.join(candidate, file))) })),
  };
  const definitions = [];
  for (const file of files.filter(f => f.endsWith('.js'))) for (const mod of T.factories(T.read(path.join(candidate, file)))) definitions.push(mod.id + ':' + mod.source);
  registry = write('candidate-factories.js', 'window.candidateFactories={' + definitions.join(',') + '};');
  artifactCss = files.filter(f => f.endsWith('.css')).map(f => T.read(path.join(candidate, f))).join('\n');
}
const artifactEntry = `const fixture=require('./fixture.cjs'),React=require('react'),jsx=require('react/jsx-runtime'),{createRoot}=require('react-dom/client');
const Empty=()=>null,emptyModule=new Proxy({},{get:()=>Empty}),cache={},mocks={14232:React,37876:jsx,9306:{A:fixture.firebase},92557:{A:()=>({authUser:{email:'qa@example.com',role:'admin',isAdmin:true},signOut(){}})},89099:{useRouter:()=>fixture.router},59601:{default:({children})=>children},48230:({children,href,...rest})=>React.createElement('a',{...rest,href},children),18847:()=>Empty};
for(const id of [44595,40396,55607,11998,41531,39982,31981,79074,99450])mocks[id]=emptyModule;
function req(id){if(Object.hasOwn(mocks,id))return mocks[id];if(cache[id])return cache[id].exports;const f=window.candidateFactories[id];if(!f)throw Error('Missing factory '+id);const m=cache[id]={exports:{}};f(m,m.exports,req);return m.exports;}req.d=(e,d)=>Object.entries(d).forEach(([k,v])=>Object.defineProperty(e,k,{enumerable:true,get:v}));req.r=e=>Object.defineProperty(e,'__esModule',{value:true});req.n=e=>{const g=()=>e?.__esModule?e.default:e;req.d(g,{a:g});return g;};req.o=(o,k)=>Object.hasOwn(o,k);req.g=window;req.nmd=m=>m;req.hmd=m=>m;req.e=()=>Promise.resolve();
const NewItem=req(19967).default;createRoot(document.getElementById('root')).render(React.createElement(NewItem));`;
const entry = write('entry.js', candidate ? artifactEntry : `const fixture=require('./fixture.cjs'),React=require('react'),{createRoot}=require('react-dom/client'),NewItem=require(${JSON.stringify(path.join(root, 'pages/NewSearch/AddItem/NewItem.js'))}).default;createRoot(document.getElementById('root')).render(React.createElement(NewItem));`);

async function run() {
  const { webpack } = require('next/dist/compiled/webpack/webpack');
  await new Promise((resolve, reject) => {
    const compiler = webpack({ mode:'development',devtool:false,context:root,entry,output:{path:out,filename:'bundle.js'},resolve:{modules:[path.join(root,'node_modules'),'node_modules'],alias:{'next/router$':stubs.router,'next/link$':stubs.link,'next/dynamic$':stubs.dynamic}},module:{rules:[{test:/\.[cm]?js$/,exclude:/node_modules/,use:loader},{test:/\.css$/,use:stubs.css}]},plugins:[
      new webpack.DefinePlugin({'process.env':JSON.stringify({NODE_ENV:'test'})}),
      new webpack.NormalModuleReplacementPlugin(/\.module\.css$/,stubs.styles),new webpack.NormalModuleReplacementPlugin(/context[\\/]Firebase(?:\.js)?$/,stubs.firebase),new webpack.NormalModuleReplacementPlugin(/FirebaseAdmin$/,stubs.null),new webpack.NormalModuleReplacementPlugin(/AuthUserContext$/,stubs.auth),new webpack.NormalModuleReplacementPlugin(/(?:^|\/)LoggedIn$/,stubs.logged),new webpack.NormalModuleReplacementPlugin(/fetchAssociations$/,stubs.fetch),new webpack.NormalModuleReplacementPlugin(/(?:parentModal|ParentModal|InfoModal|MachineSelectionModal|MachineCreationModal|NewLocal|ShippingGroupField|TrailerAssociationPicker|ClientTrailerSelectionTabs|MultiSelectDropdown)$/,stubs.null),
    ] });
    compiler.run((e,stats)=>compiler.close(ce=>e||ce||stats.hasErrors()?reject(e||ce||Error(stats.toString({all:false,errors:true}))):resolve()));
  });
  const css = candidate ? artifactCss : fs.readFileSync(path.join(root,'node_modules/bootstrap/dist/css/bootstrap.min.css'),'utf8');
  const server=http.createServer((req,res)=>{
    if(req.url==='/candidate-factories.js'){res.setHeader('Content-Type','text/javascript');return res.end(registry?fs.readFileSync(registry):'');}
    if(req.url==='/bundle.js'){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync(path.join(out,'bundle.js')));}
    if(req.url==='/styles.css'){res.setHeader('Content-Type','text/css');return res.end(css);}
    res.setHeader('Content-Type','text/html');res.end('<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><div id="root"></div><script src="/candidate-factories.js"></script><script src="/bundle.js"></script>');
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin='http://127.0.0.1:'+server.address().port;
  const pw=require(process.env.PLAYWRIGHT_MODULE_PATH||'C:/Users/mack2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  const browser=await pw.chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const checks=[], errors=[];
  try {
    const page=await browser.newPage({viewport:{width:1280,height:960}});
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
    async function draft(scenario, id) {
      await page.goto(origin+'?scenario='+scenario);
      await page.getByLabel('Name',{exact:true}).fill('test');
      await page.getByPlaceholder('Enter description',{exact:true}).fill('Synthetic identity regression only');
      await page.getByLabel('Local SN',{exact:true}).fill(id);
      await page.waitForTimeout(100);
    }
    for (const [scenario,id,button] of [['duplicate','33551','Save'],['duplicate',' ais-33551 ','Save'],['duplicate','33551','Clone'],['query-id','33551','Save'],['legacy','AIS33551','Save'],['archive','33551','Save'],['offline','33551','Save']]) {
      await draft(scenario,id);
      const original=await page.evaluate(()=>JSON.stringify(window.qa.docs));
      await page.getByRole('button',{name:button,exact:true}).click();
      await page.getByText(scenario==='offline'?'Synthetic duplicate lookup unavailable':/There is already an item with AIS/).waitFor();
      const state=await page.evaluate(()=>({docs:JSON.stringify(window.qa.docs),writes:window.qa.writes,uploads:window.qa.uploads,calls:window.qa.calls,navigation:window.qa.navigation}));
      assert.equal(state.docs,original);assert.deepEqual(state.writes,[]);assert.deepEqual(state.uploads,[]);assert.deepEqual(state.navigation,[]);
      assert.equal(state.calls.some(c=>c.method==='POST'),false);
      assert.equal(await page.getByText('Item has been saved successfully.',{exact:true}).count(),0);
      checks.push(`${scenario} ${id.trim()} ${button}: blocked, no writes/side effects/false success`);
      if (scenario==='duplicate' && id==='33551' && button==='Save') {
        await page.waitForTimeout(350);
        await page.screenshot({path:path.join(out,'duplicate-blocked.png')});
      }
    }
    await draft('duplicate','33552');
    await page.getByRole('button',{name:'Save',exact:true}).click();
    await page.getByText('Item has been saved successfully.',{exact:true}).waitFor();
    const state=await page.evaluate(()=>({docs:window.qa.docs,writes:window.qa.writes,calls:window.qa.calls}));
    assert.equal(state.docs['Test/AIS33551'].name,'Original Gantry');assert.equal(state.docs['Test/33552'],undefined);
    assert.equal(state.docs['Test/AIS33552'].name,'test');assert.equal(state.docs['Test/AIS33552'].localSN,'AIS33552');assert.equal(state.docs['Test/AIS33552'].local_sn,'AIS33552');
    assert.equal(state.writes.filter(w=>w.path.startsWith('Test/')).length,1);
    assert.ok(state.calls.some(c=>c.url==='/api/items/sync-index'&&c.body.itemId==='AIS33552'));
    await page.waitForTimeout(350);
    await page.screenshot({path:path.join(out,'unique-canonical-saved.png')});
    await page.getByRole('button',{name:'Ok',exact:true}).last().click();
    assert.deepEqual(await page.evaluate(()=>window.qa.navigation),['/NewSearch/item/AIS33552']);
    checks.push('unique numeric ID: exactly one canonical save, canonical aliases/index/navigation, original intact');
    assert.deepEqual(errors,[]);
    write('verification.json',JSON.stringify({ok:true,createdAt:new Date().toISOString(),mode:candidate?'artifact':'source',candidate,artifactInputs,checks,errors,noProductionWrites:true},null,2));
    console.log(JSON.stringify({ok:true,mode:candidate?'artifact':'source',checks:checks.length,out}));
  } catch(e) {
    write('failure.json',JSON.stringify({message:e.message,stack:e.stack,errors,checks},null,2));throw e;
  } finally { await browser.close(); await new Promise(r=>server.close(r)); }
}
run().catch(e=>{console.error(e);process.exitCode=1;});
