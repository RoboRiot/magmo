// Credential-free regression of the actual NewItem page. Reuse only the
// Sept30 infrastructure/fixture harness; append UI and save-path scenarios.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const previousHarness = path.join(root, 'tmp/ais-duplicate-newitem-browser-20260930.cjs');
const sourceFile = path.join(root, 'pages/NewSearch/AddItem/NewItem.js');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
let harness = fs.readFileSync(previousHarness, 'utf8');
function replaceOnce(before, after) {
  assert.equal(harness.split(before).length, 2, `Expected one adaptation anchor: ${before.slice(0, 70)}`);
  harness = harness.replace(before, after);
}
replaceOnce("const root = path.resolve(__dirname, '..');", `const root = ${JSON.stringify(root)};`);
replaceOnce("const out = path.join(__dirname, 'ais-duplicate-newitem-browser-' + (candidate ? 'artifact' : 'source'));", "const out = path.join(__dirname, candidate ? 'artifact' : 'source');");
replaceOnce("require('./ot-collapse-20260928/factory-tools.cjs')", `require(${JSON.stringify(path.join(root, 'tmp/ot-collapse-20260928/factory-tools.cjs'))})`);
replaceOnce("query:scenario==='query-id'?{id:'AIS33551'}:{}", "query:scenario==='query-id'?{id:'AIS33551'}:scenario==='prefill'?{localSN:'AIS0033552'}:{}");

const uiScenarios = String.raw`
    await draft('duplicate','');
    const input=page.getByLabel('Local SN',{exact:true});
    assert.equal(await page.locator('#new-item-local-sn-prefix').textContent(),'AIS');
    assert.equal(await page.locator('#new-item-local-sn-prefix').evaluate(el=>el.tagName),'SPAN');
    assert.equal(await input.getAttribute('inputmode'),'numeric');
    assert.equal(await input.getAttribute('pattern'),'[0-9]*');
    assert.equal(await input.inputValue(),'');
    await input.pressSequentially('33552');
    assert.equal(await input.inputValue(),'33552');
    checks.push('fixed AIS prefix remains outside editable digits input; bare typing works');
    for(const raw of ['AIS33552','ais33552',' AIS-33552 ','aIs _33552']) {
      await input.fill(raw);
      assert.equal(await input.inputValue(),'33552',raw);
    }
    checks.push('pasted uppercase/lowercase/separated AIS forms display only number without doubled prefix');
    await input.fill('AIS0033552');
    assert.equal(await input.inputValue(),'0033552');
    for(const raw of ['AIS-B00047','AIS-P00065','foo33552','AIS335x52','33 552','33.552','AIS-AIS33552','-33552']) {
      await input.fill(raw);
      assert.equal(await input.inputValue(),'0033552',raw);
    }
    checks.push('leading zeros preserved; invalid unrelated/storage-unit IDs rejected without alternate conversion');
    await input.clear();assert.equal(await input.inputValue(),'');
    await input.fill('AIS');assert.equal(await input.inputValue(),'');
    checks.push('clear or prefix-only input stays blank rather than AIS-only state');
    await page.goto(origin+'?scenario=prefill');
    await page.getByLabel('Local SN',{exact:true}).waitFor();
    await page.waitForTimeout(100);
    assert.equal(await page.getByLabel('Local SN',{exact:true}).inputValue(),'0033552');
    checks.push('canonical route prefill displays digits once and preserves leading zeros');
    await page.screenshot({path:path.join(out,'fixed-prefix.png')});
`;
replaceOnce("    for (const [scenario,id,button]", uiScenarios + "\n    for (const [scenario,id,button]");

const extraSaves = String.raw`
    for(const [raw, expected] of [['AIS33553','AIS33553'],[' ais-33554 ','AIS33554'],['AIS0033552','AIS0033552'],['','']]) {
      await draft('duplicate',raw);
      if(raw==='') {
        await page.getByLabel('Local SN',{exact:true}).fill('33556');
        await page.getByLabel('Local SN',{exact:true}).clear();
      }
      await page.getByRole('button',{name:'Save',exact:true}).click();
      await page.getByText('Item has been saved successfully.',{exact:true}).waitFor();
      const saved=await page.evaluate(()=>({docs:window.qa.docs,writes:window.qa.writes,calls:window.qa.calls}));
      const created=saved.writes.filter(w=>w.path.startsWith('Test/'));
      assert.equal(created.length,1);
      const actual=created[0].path.slice(5);
      if(expected) assert.equal(actual,expected);else assert.match(actual,/^AIS\d{5}$/);
      assert.equal(saved.docs['Test/AIS33551'].name,'Original Gantry');
      assert.equal(saved.docs['Test/AIS'],undefined);
      assert.equal(saved.docs['Test/'+actual].localSN,actual);
      assert.equal(saved.docs['Test/'+actual].local_sn,actual);
      assert.ok(saved.calls.some(c=>c.url==='/api/items/sync-index'&&c.body.itemId===actual));
      await page.getByRole('button',{name:'Ok',exact:true}).last().click();
      assert.deepEqual(await page.evaluate(()=>window.qa.navigation),['/NewSearch/item/'+actual]);
      checks.push((expected||'clear then auto-generate')+': one canonical item, matching aliases/index/navigation, original intact');
    }
`;
replaceOnce("    assert.deepEqual(errors,[]);", extraSaves + "\n    assert.deepEqual(errors,[]);");
replaceOnce("run().catch(e=>{console.error(e);process.exitCode=1;});", "return run();");

async function main() {
  const sourceSHA256 = hash(fs.readFileSync(sourceFile));
  await new Function('require','__dirname','process',harness)(require,__dirname,process);
  const artifactMode=process.argv.includes('--artifact');
  const out=path.join(__dirname,artifactMode?'artifact':'source');
  const receiptFile=path.join(out,'verification.json');
  const receipt=JSON.parse(fs.readFileSync(receiptFile,'utf8'));
  if(artifactMode) {
    assert.equal(hash(fs.readFileSync(path.join(receipt.candidate,'build-manifest.json'))),receipt.artifactInputs.manifestSHA256);
    for(const asset of receipt.artifactInputs.assets) assert.equal(hash(fs.readFileSync(path.join(receipt.candidate,asset.path))),asset.sha256);
  } else assert.equal(hash(fs.readFileSync(sourceFile)),sourceSHA256,'Source changed during browser verification');
  const binding={ok:true,createdAt:new Date().toISOString(),mode:receipt.mode,candidate:receipt.candidate,artifactInputs:receipt.artifactInputs,sourceFile,sourceSHA256,previousHarnessSHA256:hash(fs.readFileSync(previousHarness)),harnessSHA256:hash(fs.readFileSync(__filename)),adaptedHarnessSHA256:hash(harness),verificationSHA256:hash(fs.readFileSync(receiptFile)),checks:receipt.checks,inputsStableDuringRun:true,loopbackOnly:true,noProductionWrites:true};
  fs.writeFileSync(path.join(out,'binding-verification.json'),JSON.stringify(binding,null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
