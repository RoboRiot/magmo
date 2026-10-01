const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const test = require("node:test");
const root = path.resolve(__dirname, "..");
let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright"); } catch {}

async function makeHarness(directory) {
  fs.mkdirSync(directory, { recursive: true });
  const loader = path.join(directory, "jsx-loader.cjs");
  const entry = path.join(directory, "entry.js");
  const styleStub = path.join(directory, "styles.cjs");
  const firebaseStub = path.join(directory, "firebase.cjs");
  fs.writeFileSync(loader, `const babel=require(${JSON.stringify(require.resolve("@babel/core"))});module.exports=function(source){return babel.transformSync(source,{filename:this.resourcePath,babelrc:false,configFile:false,presets:[require(${JSON.stringify(require.resolve("next/babel"))})],envName:'test'}).code;};`);
  fs.writeFileSync(styleStub, "module.exports={__esModule:true,default:new Proxy({},{get:(_t,p)=>String(p)})};");
  fs.writeFileSync(firebaseStub, "module.exports={auth:()=>({currentUser:{getIdToken:async()=>'synthetic-token'}})};");
  fs.writeFileSync(entry, `
    const React=require('react');const {createRoot}=require('react-dom/client');
    const Photos=require(${JSON.stringify(path.join(root, "components/ItemPhotoTabs.js"))}).default;
    const History=require(${JSON.stringify(path.join(root, "components/ItemHistoryModal.js"))}).default;
    window.__calls={archive:[],delete:[],fetch:[]};
    const picture='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="150"><rect width="180" height="150" fill="#72abc2"/><text x="30" y="80">Test picture</text></svg>');
    const savedAt='2026-09-30T17:00:00.000Z';
    const item={workOrders:[{workOrder:'OLD-101',date:'2020-01-01'},{workOrder:'NEW-202',date:'2026-09-30'}],saveHistory:[{savedAt,savedByEmail:'editor@example.com',itemName:'Coil'}],selectionHistory:[{savedAt,savedByEmail:'editor@example.com',workOrder:'NEW-202',fromClientName:'Former site',currentClientName:'Lake Forest',currentMachineName:'MRI'}]};
    window.fetch=async(url,options)=>{window.__calls.fetch.push({url,authorization:options?.headers?.Authorization});if(url.startsWith('/api/items/photo-history'))return new Response(JSON.stringify({ok:true,entries:[{id:'p1',sourceItemId:'AIS1',storageName:'item__photo.jpg',category:'item',archivedAt:'2026-09-30T18:00:00.000Z',linkedSavedAt:savedAt,linkedSavedByEmail:'editor@example.com',workOrder:'NEW-202'}]}),{status:200});return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="150"><rect width="180" height="150" fill="#72abc2"/></svg>',{headers:{'Content-Type':'image/svg+xml'}});};
    function Harness(){const[show,setShow]=React.useState(false);const[photos,setPhotos]=React.useState([{url:picture,storageName:'saved.jpg',category:'item'},{url:picture,file:{name:'new.jpg'},category:'item'}]);return React.createElement('main',{style:{maxWidth:720,padding:16,margin:'0 auto'}},
      React.createElement(Photos,{photos,activeCategory:'item',onCategoryChange:()=>{},onOpenPhoto:()=>{},onArchivePhoto:index=>window.__calls.archive.push(index),onRemovePhoto:index=>window.__calls.delete.push(index)}),
      React.createElement('button',{onClick:()=>setShow(true)},'History'),React.createElement(History,{show,onHide:()=>setShow(false),itemId:'AIS1',item}));}
    createRoot(document.getElementById('root')).render(React.createElement(Harness));`);
  const { webpack } = require("next/dist/compiled/webpack/webpack");
  await new Promise((resolve, reject) => {
    const compiler = webpack({ mode: "development", devtool: false, context: root, entry,
      output: { path: directory, filename: "bundle.js" }, resolve: { modules: [path.join(root, "node_modules"), "node_modules"] },
      module: { rules: [{ test: /(?:ItemPhotoTabs|ItemHistoryModal|itemPhotos)\.js$/, use: loader }] },
      plugins: [new webpack.NormalModuleReplacementPlugin(/\.module\.css$/, styleStub), new webpack.NormalModuleReplacementPlugin(/\.\.\/context\/Firebase$/, firebaseStub)] });
    compiler.run((error, stats) => compiler.close((closeError) => error || closeError || stats?.hasErrors() ? reject(error || closeError || new Error(stats.toString({ all: false, errors: true }))) : resolve()));
  });
}

test("mobile and desktop photo controls and combined history keep actions and records distinct", { skip: !playwright && "Playwright required", timeout: 120000 }, async () => {
  const directory = path.join(root, "tmp/item-history-20260930/browser");
  await makeHarness(directory);
  const bundle = fs.readFileSync(path.join(directory, "bundle.js"));
  const css = ["node_modules/bootstrap/dist/css/bootstrap.min.css", "components/ItemPhotoTabs.module.css", "components/ItemHistoryModal.module.css"].map((file) => fs.readFileSync(path.join(root, file), "utf8").replace(/:global\(([^)]+)\)/g, "$1")).join("\n");
  const server = http.createServer((req, res) => {
    if (req.url === "/bundle.js") { res.setHeader("Content-Type", "text/javascript"); return res.end(bundle); }
    if (req.url === "/style.css") { res.setHeader("Content-Type", "text/css"); return res.end(css); }
    res.setHeader("Content-Type", "text/html");
    res.end('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>');
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
    for (const width of [390, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.route("**/*", (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort());
      await page.goto(origin);
      await page.getByRole("button", { name: "Archive item photo 1", exact: true }).click();
      assert.equal(await page.getByRole("button", { name: "Archive item photo 2", exact: true }).isDisabled(), true);
      assert.deepEqual(await page.evaluate(() => window.__calls.archive), [0]);
      let confirmation = "";
      page.once("dialog", (dialog) => { confirmation = dialog.message(); dialog.dismiss(); });
      await page.getByRole("button", { name: "Delete image", exact: true }).first().click();
      assert.match(confirmation, /Permanently delete.*Archive/s);
      assert.deepEqual(await page.evaluate(() => window.__calls.delete), []);
      await page.screenshot({ path: path.join(directory, `photos-${width}.png`) });
      await page.getByRole("button", { name: "History", exact: true }).click();
      await page.getByRole("button", { name: "Pictures (1)" }).waitFor();
      assert.equal(await page.getByText("OLD-101", { exact: true }).count(), 1);
      await page.getByText("Location and movement details").click();
      assert.match(await page.getByRole("dialog").innerText(), /Former site/);
      assert.match(await page.getByRole("dialog").innerText(), /Lake Forest/);
      assert.match(await page.getByRole("dialog").innerText(), /1 recorded save/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: path.join(directory, `history-${width}.png`) });
      await page.getByRole("button", { name: "Pictures (1)" }).click();
      await page.getByRole("button", { name: "Enlarge archived item picture" }).waitFor();
      assert.equal(await page.evaluate(() => window.__calls.fetch.every((call) => call.authorization === "Bearer synthetic-token")), true);
      await page.getByRole("button", { name: "Enlarge archived item picture" }).click();
      await page.getByRole("button", { name: "Close enlarged picture" }).waitFor();
      await page.screenshot({ path: path.join(directory, `pictures-${width}.png`) });
      assert.deepEqual(errors, []);
      await context.close();
    }
  } finally { if (browser) await browser.close(); await new Promise((resolve) => server.close(resolve)); }
});
