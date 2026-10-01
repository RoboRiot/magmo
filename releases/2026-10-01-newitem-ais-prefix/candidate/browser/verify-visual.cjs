const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const input = path.join(__dirname, 'artifact');
const output = path.join(__dirname, 'visual');
const bindingPath = path.join(input, 'binding-verification.json');
const binding = JSON.parse(fs.readFileSync(bindingPath, 'utf8'));
assert.equal(binding.mode, 'artifact');
assert.equal(binding.ok, true);
function verifyInputs() {
  assert.equal(hash(fs.readFileSync(path.join(binding.candidate, 'build-manifest.json'))), binding.artifactInputs.manifestSHA256);
  for (const asset of binding.artifactInputs.assets) assert.equal(hash(fs.readFileSync(path.join(binding.candidate, asset.path))), asset.sha256);
}
verifyInputs();
const css = binding.artifactInputs.assets.filter(a => a.path.endsWith('.css')).map(a => fs.readFileSync(path.join(binding.candidate,a.path),'utf8')).join('\n');
fs.mkdirSync(output,{recursive:true});
async function run() {
  const server = http.createServer((request,response) => {
    if (request.url === '/styles.css') { response.setHeader('Content-Type','text/css'); return response.end(css); }
    for (const file of ['candidate-factories.js','bundle.js']) if (request.url === '/'+file) {
      response.setHeader('Content-Type','text/javascript'); return response.end(fs.readFileSync(path.join(input,file)));
    }
    response.setHeader('Content-Type','text/html');
    response.end('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><div id="root"></div><script src="/candidate-factories.js"></script><script src="/bundle.js"></script>');
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin='http://127.0.0.1:'+server.address().port;
  const pw=require(process.env.PLAYWRIGHT_MODULE_PATH||'C:/Users/mack2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  const browser=await pw.chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const errors=[],measurements=[];
  try {
    const page=await browser.newPage({viewport:{width:390,height:900}});
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
    await page.goto(origin+'?scenario=prefill');
    const control=page.getByLabel('Local SN',{exact:true});
    await control.waitFor();
    for (const [theme,width] of [['light',390],['dark',390],['dark',1280]]) {
      await page.setViewportSize({width,height:900});
      await page.evaluate(value=>document.documentElement.dataset.theme=value,theme);
      await control.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const measurement=await control.evaluate(element=>{
        const prefix=document.getElementById('new-item-local-sn-prefix');
        const rect=element.getBoundingClientRect(),p=prefix.getBoundingClientRect(),group=element.parentElement.getBoundingClientRect();
        return {viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,input:{x:rect.x,right:rect.right,width:rect.width,y:rect.y},prefix:{x:p.x,right:p.right,y:p.y,text:prefix.textContent},group:{x:group.x,right:group.right},color:getComputedStyle(element).color,background:getComputedStyle(element).backgroundColor,value:element.value};
      });
      assert.equal(measurement.pageWidth<=width,true,'Page fits viewport');
      assert.equal(measurement.group.x>=0&&measurement.group.right<=width,true,'Prefix and field fit viewport');
      assert.equal(measurement.prefix.right<=measurement.input.x+1,true,'Prefix does not overlap field');
      assert.equal(Math.abs(measurement.prefix.y-measurement.input.y)<1,true,'Prefix and field share one row');
      assert.equal(measurement.prefix.text,'AIS');assert.equal(measurement.value,'0033552');
      assert.ok(measurement.input.width>0,'Editable numeric field remains visible');
      measurements.push({theme,...measurement});
      await page.screenshot({path:path.join(output,`prefix-${width}-${theme}.png`)});
    }
    assert.notEqual(measurements[0].background,measurements[1].background,'Real dark theme changes input styling');
    assert.deepEqual(errors,[]);
    assert.equal(await page.evaluate(()=>window.qa.writes.length),0);
    verifyInputs();
    const receipt={ok:true,createdAt:new Date().toISOString(),mode:'artifact',candidate:binding.candidate,artifactInputs:binding.artifactInputs,parentBindingSHA256:hash(fs.readFileSync(bindingPath)),runtimeHashes:['candidate-factories.js','bundle.js'].map(file=>({file,sha256:hash(fs.readFileSync(path.join(input,file)))})),measurements,errors,loopbackOnly:true,noProductionWrites:true};
    fs.writeFileSync(path.join(output,'verification.json'),JSON.stringify(receipt,null,2));
    console.log(JSON.stringify({ok:true,checks:measurements.length,output}));
  } finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(error=>{console.error(error);process.exitCode=1;});
