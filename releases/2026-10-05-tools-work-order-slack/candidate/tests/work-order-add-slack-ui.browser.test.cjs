const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { installSyntheticWorkOrderApi, scenarios, runDecisionScenario } = require("./helpers/work-order-add-decision-scenarios.cjs");
let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright"); } catch {}
const root = path.resolve(__dirname, "..");
const screenshots = path.join(root, "tmp", "work-order-single-decision-ui-20260929");

async function makeHarness(directory) {
  const loader = path.join(directory, "jsx-loader.cjs");
  const entry = path.join(directory, "entry.js");
  const styleStub = path.join(directory, "styles.cjs");
  const firebaseStub = path.join(directory, "firebase.cjs");
  const dynamicStub = path.join(directory, "dynamic.cjs");
  fs.writeFileSync(loader, [
    "const babel = require(" + JSON.stringify(require.resolve("@babel/core")) + ");",
    "module.exports = function(source) {",
    "return babel.transformSync(source, {filename:this.resourcePath,babelrc:false,configFile:false,",
    "presets:[require(" + JSON.stringify(require.resolve("next/babel")) + ")],envName:'test'}).code;};"
  ].join("\n"));
  fs.writeFileSync(styleStub, "const styles=new Proxy({},{get:(_target,property)=>String(property)});module.exports={__esModule:true,default:styles};");
  fs.writeFileSync(firebaseStub, "module.exports={auth:()=>({currentUser:{getIdToken:async()=>'browser-test-token'}})};");
  fs.writeFileSync(dynamicStub, "const React=require('react');module.exports=()=>()=>React.createElement('div',{'data-camera-stub':'true'});");
  fs.writeFileSync(entry, [
    "const React=require('react');const {createRoot}=require('react-dom/client');",
    "const Component=require(" + JSON.stringify(path.join(root,"components/WorkOrderAddModal.js")) + ").default;",
    "(" + installSyntheticWorkOrderApi.toString() + ")();",
    "function Harness(){const[show,setShow]=React.useState(true);const[epoch,setEpoch]=React.useState(0);",
    "return React.createElement('main',null,React.createElement('span',null,'Synthetic inventory parent epoch '+epoch),",
    "React.createElement(Component,{show,onHide:()=>setShow(false),onConfirmed:result=>{window.__workOrderHarness.confirmed=result;setEpoch(value=>value+1)}}));}",
    "createRoot(document.getElementById('root')).render(React.createElement(Harness));"
  ].join("\n"));
  const { webpack } = require("next/dist/compiled/webpack/webpack");
  await new Promise((resolve,reject)=>{
    const compiler=webpack({
      mode:"development",devtool:false,context:root,entry,
      output:{path:directory,filename:"bundle.js"},
      resolve:{modules:[path.join(root,"node_modules"),"node_modules"]},
      module:{rules:[{test:/(?:WorkOrderAddModal|workOrderAddUiContract)\.js$/,use:loader}]},
      plugins:[
        new webpack.NormalModuleReplacementPlugin(/WorkOrderAddModal\.module\.css$/,styleStub),
        new webpack.NormalModuleReplacementPlugin(/\.\.\/context\/Firebase$/,firebaseStub),
        new webpack.NormalModuleReplacementPlugin(/^next\/dynamic$/,dynamicStub),
        new webpack.NormalModuleReplacementPlugin(/^react-qr-barcode-scanner$/,dynamicStub)
      ]
    });
    compiler.run((error,stats)=>compiler.close(closeError=>{
      if(error||closeError||stats?.hasErrors()) reject(error||closeError||new Error(stats.toString({all:false,errors:true})));
      else resolve();
    }));
  });
}

test("one confirmation decision safely saves only or saves then delivers to Slack",{
  skip:!playwright&&"Set PLAYWRIGHT_MODULE_PATH to run real browser verification.",timeout:120000
},async t=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),"magmo-work-order-decision-browser-"));
  let server,browser;
  try{
    await makeHarness(directory);
    const bundle=fs.readFileSync(path.join(directory,"bundle.js"));
    const bootstrap=fs.readFileSync(path.join(root,"node_modules/bootstrap/dist/css/bootstrap.min.css"));
    const css=fs.readFileSync(path.join(root,"components/WorkOrderAddModal.module.css"),"utf8").replace(/:global\(([^)]+)\)/g,"$1");
    server=http.createServer((req,res)=>{
      if(req.url==="/bundle.js"){res.setHeader("Content-Type","text/javascript; charset=utf-8");return res.end(bundle);}
      if(req.url==="/bootstrap.css"){res.setHeader("Content-Type","text/css; charset=utf-8");return res.end(bootstrap);}
      if(req.url==="/component.css"){res.setHeader("Content-Type","text/css; charset=utf-8");return res.end(css);}
      res.setHeader("Content-Type","text/html; charset=utf-8");
      res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/bootstrap.css"><link rel="stylesheet" href="/component.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>');
    });
    await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
    const origin="http://127.0.0.1:"+server.address().port;
    browser=await playwright.chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
    fs.mkdirSync(screenshots,{recursive:true});
    for(const scenario of scenarios){
      await t.test(scenario.name,async()=>{
        const context=await browser.newContext({viewport:{width:scenario.width||1280,height:scenario.height||900},reducedMotion:scenario.motion||"no-preference"});
        const errors=[],external=[];
        await context.route("**/*",route=>{
          if(route.request().url().startsWith(origin)) return route.continue();
          external.push(route.request().url());return route.abort();
        });
        const page=await context.newPage();
        page.setDefaultTimeout(8000);
        page.on("pageerror",error=>errors.push(error.message));
        try{
          await page.goto(origin);
          await runDecisionScenario(page,{...scenario,screenshotPath:path.join(screenshots,scenario.name+"-initial.png")});
          await page.screenshot({path:path.join(screenshots,scenario.name+".png")});
          assert.deepEqual(errors,[]);
          assert.deepEqual(external,[],"browser tests must not reach production");
        }finally{await context.close();}
      });
    }
  }finally{
    if(browser)await browser.close();
    if(server)await new Promise(resolve=>server.close(resolve));
    const resolved=path.resolve(directory);
    if(path.dirname(resolved)===path.resolve(os.tmpdir())&&path.basename(resolved).startsWith("magmo-work-order-decision-browser-"))fs.rmSync(resolved,{recursive:true,force:true});
  }
});
