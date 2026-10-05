const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..');
const hash=(value)=>crypto.createHash('sha256').update(value).digest('hex');
const baselineFile=path.join(root,'outputs/regular-label-qr-fix-20260908/print_bluefolder_combo.candidate.py');
const baseline=fs.readFileSync(baselineFile);
if(hash(baseline)!=='5f6b00d5297a729eaea3cf31f479cefffca72ace38cbfc4a6a5a158015200941') throw Error('Unexpected combo baseline');
const source=baseline.toString('utf8');
const newline=source.includes('\r\n')?'\r\n':'\n';
const importLine='from warehouse_scanner.storage_label_print import register_storage_label_routes';
const marker=['register_storage_label_routes(','    app,','    authorize=storage_scan_bridge.authorize,','    printer=print_label,',')'].join('\n');
if(source.split(importLine).length!==2||source.split(marker).length!==2)throw Error('Ambiguous registration');
const candidate=source.replace(importLine,importLine+newline+'from warehouse_scanner.tool_label_print import register_tool_label_routes').replace(marker,marker+newline+newline+marker.replace('register_storage_label_routes','register_tool_label_routes'));
const out=path.join(__dirname,'tool-server-candidate');
fs.mkdirSync(path.join(out,'label_server'),{recursive:true});
fs.writeFileSync(path.join(out,'label_server/print_bluefolder_combo.py'),candidate);
const inputs=[
  'scanner-server/warehouse_scanner/tool_label_print.py',
  'scanner-server/warehouse_scanner/storage_scan_bridge.py',
  'scanner-server/tests/test_tool_label_print.py',
  'scanner-server/tests/test_storage_scan_bridge.py',
];
for(const file of inputs){fs.mkdirSync(path.dirname(path.join(out,file)),{recursive:true});fs.copyFileSync(path.join(root,file),path.join(out,file));}
const manifest={createdAt:new Date().toISOString(),remoteRoot:'C:\\Users\\Owner\\Desktop\\warehouse',before:{'label_server/print_bluefolder_combo.py':hash(baseline),'scanner-server/warehouse_scanner/storage_scan_bridge.py':'75533f280bb38e35399a0659d5da5669312f93a281f39a6c1f5f51cbd48d4ee1'},preserve:{'scanner-server/warehouse_scanner/storage_label_print.py':'6f69d064c187e2d5932666985c69cade9809d6d6bd2e3cd59e99bdc5b12328f2','warehouse_service_manager.py':'da41cddb8693652a369c8ea7422b5f5c61feffa914c358482e2f9e08c6d8665a'},runtimeFiles:['label_server/print_bluefolder_combo.py',...inputs.slice(0,2)],files:{}};
for(const file of ['label_server/print_bluefolder_combo.py',...inputs])manifest.files[file]=hash(fs.readFileSync(path.join(out,file)));
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({out,manifest},null,2));
