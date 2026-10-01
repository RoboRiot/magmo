"use strict";
// Local isolated compiler oracle only: no deployment, credentials, or database calls.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../..");
const version = process.argv[2] || "v1";
assert(/^v[1-9][0-9]*$/.test(version));
const workspace = path.join(here, `compiler-workspace-${version}`);
const inputReceipt = path.join(here, `compiler-inputs-${version}.json`);
const baseline = JSON.parse(T.read(path.join(here, "baseline.json")));
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
assert(!fs.existsSync(workspace), "Never overwrite compiler workspace; choose a new version");
assert(!fs.existsSync(inputReceipt), "Never overwrite compiler input receipt");

const browserKeys = new Set();
for (const file of T.walk(path.join(here, "source/.next/static/chunks")).filter(file => file.endsWith(".js"))) {
  const text = T.read(file);
  for (const match of text.matchAll(/apiKey:"(AIza[\w-]+)",authDomain:/g)) {
    if (text.slice(match.index, match.index + 500).includes("magmo-ac10c.firebaseapp.com")) browserKeys.add(match[1]);
  }
}
assert.equal(browserKeys.size, 1, "Expected one public production Firebase browser configuration");
const dirs = ["app", "components", "context", "lib", "pages", "styles", "utils"];
const functionSources = fs.readdirSync(path.join(root, "functions"), {withFileTypes:true}).filter(entry=>entry.isFile() && /\.(?:cjs|js)$/.test(entry.name)).map(entry=>path.join(root,"functions",entry.name));
const sources = dirs.flatMap(dir => T.walk(path.join(root, dir))).concat(functionSources, ["next.config.js", "package.json", "package-lock.json"].map(file => path.join(root, file)));
const inputs = sources.map(file => ({ path: T.slash(path.relative(root, file)), sha256: T.sha(fs.readFileSync(file)) })).sort((a,b) => a.path.localeCompare(b.path));
assert(inputs.every(({path: relative}) => !/(^|\/)(?:\.env(?:\.|$)|.*(?:firebase-adminsdk|service[-_]?account|credentials?\.(?:json|pem|key)).*)(?:$|\/)/i.test(relative)));
fs.mkdirSync(workspace);
for (const input of inputs) {
  const target = path.join(workspace, input.path);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.copyFileSync(path.join(root, input.path), target);
  assert.equal(T.sha(fs.readFileSync(target)), input.sha256, `Source changed during snapshot: ${input.path}`);
}
for (const input of inputs) assert.equal(T.sha(fs.readFileSync(path.join(root, input.path))), input.sha256, `Source changed during snapshot: ${input.path}`);
// Dependencies are already installed and unchanged. A junction avoids copying or
// modifying packages and lets this independent source snapshot resolve them.
fs.symlinkSync(path.join(root, "node_modules"), path.join(workspace, "node_modules"), "junction");
fs.writeFileSync(inputReceipt, JSON.stringify({ startedAt: new Date().toISOString(), baselineRevision: baseline.revision, workspace: path.basename(workspace), output: "compiler-output", inputs, sourceSnapshotStable: true, privateEnvironmentLoaded: false, productionMutations: 0 }, null, 2) + "\n", {flag:"wx"});
const allowed = ["ALLUSERSPROFILE","APPDATA","ComSpec","HOMEDRIVE","HOMEPATH","LOCALAPPDATA","NUMBER_OF_PROCESSORS","OS","Path","PATHEXT","PROCESSOR_ARCHITECTURE","ProgramData","ProgramFiles","ProgramFiles(x86)","SystemDrive","SystemRoot","TEMP","TMP","USERDOMAIN","USERNAME","USERPROFILE","windir"];
const env = Object.fromEntries(allowed.filter(key => process.env[key] != null).map(key => [key, process.env[key]]));
Object.assign(env, { NEXT_PUBLIC_FIREBASE_API_KEY: [...browserKeys][0], NEXT_PUBLIC_SHOW_SLACK_BUTTONS: "true", NEXT_DIST_DIR: "compiler-output", NEXT_TELEMETRY_DISABLED: "1", __NEXT_PROCESSED_ENV: "true" });
const compiled = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], { cwd: workspace, env, encoding: "utf8", stdio: "inherit", windowsHide: true });
if (compiled.error) throw compiled.error;
assert.equal(compiled.status, 0, `Next compiler exited ${compiled.status}`);
for (const input of inputs) assert.equal(T.sha(fs.readFileSync(path.join(workspace, input.path))), input.sha256, `Compiler mutated source: ${input.path}`);
const result = { completedAt: new Date().toISOString(), baselineRevision: baseline.revision, workspace: path.basename(workspace), output: "compiler-output", inputReceiptSHA256: T.sha(fs.readFileSync(inputReceipt)), sourceSnapshotStable: true, productionMutations: 0 };
fs.writeFileSync(path.join(here, `compiler-success-${version}.json`), JSON.stringify(result, null, 2) + "\n", {flag:"wx"});
console.log(JSON.stringify(result));
