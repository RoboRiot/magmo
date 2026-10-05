const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { installSyntheticWorkOrderApi, scenarios, runDecisionScenario } = require("./helpers/work-order-add-decision-scenarios.cjs");
let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright"); } catch {}
const sha = value => crypto.createHash("sha256").update(value).digest("hex");

test("exact compiled work-order decision module has complete styles and safe single-popup delivery", {
  skip: (!process.env.WORK_ORDER_COMPILED_NEXT_ROOT || !playwright) && "Set WORK_ORDER_COMPILED_NEXT_ROOT and PLAYWRIGHT_MODULE_PATH for the actual deployment candidate.",
  timeout: 120000,
}, async t => {
  const root = path.resolve(process.env.WORK_ORDER_COMPILED_NEXT_ROOT);
  const manifest = JSON.parse(fs.readFileSync(path.join(root,"build-manifest.json")));
  const assets = [...new Set([...manifest.pages["/_app"],...manifest.pages["/NewSearch/mainSearch"]])];
  const pageAsset = assets.find(asset=>/\/pages\/NewSearch\/mainSearch-[^/]+\.js$/.test(asset));
  const runtimeAsset = assets.find(asset=>/\/webpack-[^/]+\.js$/.test(asset));
  assert.ok(pageAsset && runtimeAsset);
  const pageCode = fs.readFileSync(path.join(root,pageAsset),"utf8");
  const registry = new Map();
  for(const asset of assets.filter(asset=>asset.endsWith(".js")&&asset!==runtimeAsset)){
    const context = {self:{webpackChunk_N_E:[]}};
    vm.runInNewContext(fs.readFileSync(path.join(root,asset),"utf8"),context,{filename:asset,timeout:5000});
    for(const [,modules] of context.self.webpackChunk_N_E)for(const [id,factory]of Object.entries(modules))registry.set(Number(id),factory);
  }
  const componentEntry = [...registry].find(([,factory])=>factory.toString().includes('work-order-add-final-check-title')&&factory.toString().includes('Save and send to Slack'));
  assert.ok(componentEntry,"compiled decision component is missing");
  const [componentModuleId,componentFactory] = componentEntry;
  const factoryCode = componentFactory.toString();
  const cssEntry = [...registry].find(([,factory])=>factory.toString().includes('WorkOrderAddModal_dialog__')&&factory.toString().includes('e.exports='));
  assert.ok(cssEntry,"compiled WorkOrderAddModal CSS module is missing");
  const [cssModuleId,cssFactory] = cssEntry;
  const cssModule = {exports:{}};
  cssFactory(cssModule);
  const cssImport = factoryCode.match(new RegExp('([\\w$]+)=([\\w$]+)\\('+cssModuleId+'\\),([\\w$]+)=\\2\\.n\\(\\1\\)'));
  assert.ok(cssImport,"cannot identify compiled component CSS binding");
  const cssBinding = cssImport[3].replace(/[$]/g,'\\$');
  const referencedCssKeys = [...new Set([...factoryCode.matchAll(new RegExp(cssBinding+'\\(\\)\\.([\\w$]+)','g'))].map(match=>match[1]))].sort();
  const missingCssKeys = referencedCssKeys.filter(key=>!Object.hasOwn(cssModule.exports,key));
  assert.deepEqual(missingCssKeys,[],"every referenced component CSS key must be exported; CSS assets alone are insufficient");
  const loadedCss = assets.filter(asset=>asset.endsWith('.css')).map(asset=>fs.readFileSync(path.join(root,asset),'utf8')).join('\n');
  const selectorsMissing = referencedCssKeys.filter(key=>!loadedCss.includes('.'+cssModule.exports[key]));
  assert.deepEqual(selectorsMissing,[],"every mapped class must exist in the loaded route CSS");
  for(const key of ['promptDialog','promptContent','promptBody','promptFooter','slackItems','slackItem']) assert.ok(referencedCssKeys.includes(key),key);
  const componentName = factoryCode.match(/function ([\w$]+)\(\{show:[\w$]+=!1,onHide:[\w$]+=\(\)=>\{\},onConfirmed:/)?.[1];
  assert.ok(componentName,"cannot identify compiled modal function");
  const exportMatch = factoryCode.match(/([\w$]+)\.d\(([\w$]+),\{default:\(\)=>([\w$]+)\}\)/);
  assert.ok(exportMatch,"cannot identify page export");
  const replacement = `${exportMatch[1]}.d(${exportMatch[2]},{default:()=>${exportMatch[3]},__decisionModal:()=>${componentName}})`;
  assert.equal(pageCode.split(exportMatch[0]).length,2,"page export instrumentation must be unambiguous");
  const instrumentedPage = pageCode.replace(exportMatch[0],replacement);
  const runtimeCode = fs.readFileSync(path.join(root,runtimeAsset),'utf8');
  const closure = runtimeCode.lastIndexOf('})();');
  assert.ok(closure>0);
  const instrumentedRuntime = runtimeCode.slice(0,closure)+';self.__decision_require=d;d.c=s;'+runtimeCode.slice(closure);
  let server,browser;
  const results=[];
  const screenshotDirectory=process.env.WORK_ORDER_COMPILED_UI_SCREENSHOTS
    ? path.resolve(process.env.WORK_ORDER_COMPILED_UI_SCREENSHOTS)
    : process.env.WORK_ORDER_COMPILED_UI_RECEIPT
      ? path.join(path.dirname(path.resolve(process.env.WORK_ORDER_COMPILED_UI_RECEIPT)),"compiled-ui-screenshots")
      : null;
  if(screenshotDirectory)fs.mkdirSync(screenshotDirectory,{recursive:true});
  try{
    server=http.createServer((req,res)=>{
      const url=new URL(req.url,'http://127.0.0.1');
      if(url.pathname==='/'){
        res.setHeader('Content-Type','text/html; charset=utf-8');
        return res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div></body></html>');
      }
      const relative=decodeURIComponent(url.pathname.replace(/^\/_next\//,''));
      const file=path.resolve(root,relative);
      if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.statusCode=404;return res.end();}
      res.setHeader('Content-Type',relative.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8');
      res.end(relative===runtimeAsset?instrumentedRuntime:relative===pageAsset?instrumentedPage:fs.readFileSync(file));
    });
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    const origin='http://127.0.0.1:'+server.address().port;
    browser=await playwright.chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
    for(const scenario of scenarios){
      await t.test(scenario.name,async()=>{
        const context=await browser.newContext({viewport:{width:scenario.width||1280,height:scenario.height||900},reducedMotion:scenario.motion||'no-preference'});
        const errors=[],external=[];
        await context.route('**/*',route=>{
          if(route.request().url().startsWith(origin))return route.continue();
          external.push(route.request().url());return route.abort();
        });
        const page=await context.newPage();
        page.setDefaultTimeout(8000);
        page.on('pageerror',error=>errors.push(error.message));
        try{
          await page.goto(origin);
          for(const asset of assets.filter(asset=>asset.endsWith('.css'))){
            const css=fs.readFileSync(path.join(root,asset),'utf8').replace(/^\uFEFF?\s*@import\s+url\([^)]*\);/,'');
            await page.addStyleTag({content:css});
          }
          await page.evaluate(installSyntheticWorkOrderApi);
          for(const asset of assets.filter(asset=>asset.endsWith('.js')&&asset!==pageAsset))await page.addScriptTag({url:origin+'/_next/'+asset});
          await page.evaluate(()=>{
            const r=window.__decision_require;
            r.m[9306]=module=>{module.exports={A:{auth:()=>({currentUser:{getIdToken:async()=>'synthetic-compiled-token'}})}}};
            delete r.c[9306];
          });
          await page.addScriptTag({url:origin+'/_next/'+pageAsset});
          await page.evaluate(componentModuleId=>{
            const r=window.__decision_require,React=r(14232),Component=r(componentModuleId).__decisionModal;
            function Parent(){
              const[show,setShow]=React.useState(true),[epoch,setEpoch]=React.useState(0);
              return React.createElement('main',null,React.createElement('span',null,'Synthetic inventory parent '+epoch),React.createElement(Component,{show,onHide:()=>setShow(false),onConfirmed:result=>{window.__workOrderHarness.confirmed=result;setEpoch(value=>value+1)}}));
            }
            r(24279).createRoot(document.getElementById('root')).render(React.createElement(Parent));
          },componentModuleId);
          const result=await runDecisionScenario(page,{
            ...scenario,
            ...(screenshotDirectory?{screenshotPath:path.join(screenshotDirectory,scenario.name+'-initial.png')}:{})
          });
          assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
          results.push(result);
        }finally{await context.close();}
      });
    }
    if(process.env.WORK_ORDER_COMPILED_UI_RECEIPT){
      assert.equal(results.length,scenarios.length,"cannot write PASS receipt for failed subtests");
      fs.writeFileSync(path.resolve(process.env.WORK_ORDER_COMPILED_UI_RECEIPT),JSON.stringify({
        checkedAt:new Date().toISOString(),result:'PASS',productionRequests:0,productionWrites:0,
        pageAsset,pageSHA256:sha(pageCode),componentModuleId,componentFactorySHA256:sha(factoryCode),
        cssModuleId,cssFactorySHA256:sha(cssFactory.toString()),referencedCssKeys,missingCssKeys,selectorsMissing,
        assetHashes:Object.fromEntries(assets.map(asset=>[asset,sha(fs.readFileSync(path.join(root,asset)))])),results,
      },null,2)+'\n');
    }
  }finally{if(browser)await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
});
