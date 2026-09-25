"use strict";
// Stages source/tests/tooling only. Does not install or restart a service.
const cp = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const candidateSha = "7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c";
const remote = "C:/Users/Owner/Desktop/warehouse/.warehouse_runtime/deployments/work-order-site-only-retry-20260925";
const digest = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
if(digest(path.join(__dirname,"listener/bluefolder_slack_listener_v2.py")) !== candidateSha) throw Error("Candidate changed after review");
function run(tool,args,options={}) {
  const result=cp.spawnSync(tool,args,{encoding:"utf8",timeout:60000,maxBuffer:2*1024*1024,...options});
  if(result.error||result.status!==0) throw Error(`${tool} failed (${result.status}): ${result.stderr?.slice(-2000)||result.error?.code}`);
  return result.stdout;
}
run("ssh",["-o","ConnectTimeout=10","magmo-server",'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{input:`from pathlib import Path\np=Path(${JSON.stringify(remote)})\np.mkdir(parents=True,exist_ok=True)\n(p/'listener').mkdir(exist_ok=True)\nprint('staging_directory_ready')\n`});
const files = ["bluefolder_slack_listener_v2.py","slack_part_references.py","test_bluefolder_site_only_retry.py","test_bluefolder_equipment_retry.py","test_bluefolder_equipment_link.py","test_bluefolder_destination_link.py","test_bluefolder_close_status.py","test_split_dispatch_ownership.py","test_bluefolder_listener.py","test_confirmed_tombstones.py","test_dispatch_root_formatting_20260921.py"];
run("scp",[...files.map(name=>path.join(__dirname,"listener",name)),`magmo-server:${remote}/listener/`]);
run("scp",[...["install-listener.ps1","verify-listener.ps1","rollback-listener.ps1"].map(name=>path.join(__dirname,name)),`magmo-server:${remote}/`]);
const preflight=run("ssh",["-o","ConnectTimeout=10","magmo-server",`powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File ${remote}/install-listener.ps1`],{timeout:60000});
fs.writeFileSync(path.join(__dirname,"listener-staging-preflight.txt"),preflight);
console.log(preflight);
