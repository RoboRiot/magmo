"use strict";
// Explicit, gated invocation. Only root's reviewed production deployment may run this.
const cp = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const [, , action, appRevision] = process.argv;
if(action!=="--apply" || !/^nextserverwest-\d+-[a-z0-9]+$/.test(appRevision||"")) {
  throw Error("Usage after production app verification and root GO: node deploy-listener.cjs --apply nextserverwest-REVISION");
}
const manifestPath=path.resolve(__dirname,"../../outputs/firestore-backups/2026-09-25-work-order-equipment-retry-predeploy/manifest.json");
const bytes=fs.readFileSync(manifestPath);
const manifest=JSON.parse(bytes);
if(manifest.status!=="complete" || !manifest.verification?.checksumRecomputed || !manifest.verification?.documentCountRecounted) throw Error("Verified complete backup required");
const sha=crypto.createHash("sha256").update(bytes).digest("hex");
if(sha!=="0896c1b886048f30e4dd602798151526bf852ca4371886d88ce989a1aaa9498a") throw Error("Backup manifest changed after review");
const remote="C:/Users/Owner/Desktop/warehouse/.warehouse_runtime/deployments/work-order-equipment-retry-20260925";
const result=cp.spawnSync("ssh",["-o","ConnectTimeout=10","magmo-server",`powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File ${remote}/install-listener.ps1 -Apply -VerifiedFirestoreBackupManifestSha ${sha} -VerifiedAppRevision ${appRevision}`],{encoding:"utf8",timeout:120000,maxBuffer:2*1024*1024});
fs.writeFileSync(path.join(__dirname,"listener-deployment-output.txt"),result.stdout||"");
fs.writeFileSync(path.join(__dirname,"listener-deployment-tests.txt"),result.stderr||"");
if(result.error||result.status!==0){console.error(JSON.stringify({error:"listener_install_failed_inspect_before_retry",status:result.status,code:result.error?.code,detail:result.stderr?.slice(-1600)}));process.exitCode=1;}
else { const receipt=JSON.parse(result.stdout); fs.writeFileSync(path.join(__dirname,"listener-deployment-receipt.json"),JSON.stringify(receipt,null,2)+"\n"); console.log(JSON.stringify(receipt,null,2)); }
