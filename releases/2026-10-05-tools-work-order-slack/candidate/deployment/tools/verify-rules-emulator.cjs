"use strict";
const { spawn } = require("node:child_process");
const { fs, path, assert, file, json, sha256, writeReceipt } = require("./cloud-common.cjs");
const root = path.resolve(__dirname, "../../..");
const cli = "C:/Users/mack2/AppData/Roaming/npm/node_modules/firebase-tools/lib/bin/firebase.js";
const java = path.join(root, ".tools/java21/jdk-21.0.12.1+1-jre");
assert(fs.existsSync(cli)); assert(fs.existsSync(path.join(java, "bin/java.exe")));
const plan = json("rules-plan.json");
assert.equal(sha256(fs.readFileSync(file("firestore-scoped.rules"))), plan.afterSHA256);
const command = "node --test test/firestore-item-archive.emulator.test.cjs test/tool-slack-rules.emulator.test.cjs";
const child = spawn(process.execPath, [cli, "emulators:exec", "--only", "firestore", "--project", "demo-magmo-archive", "--config", file("emulator-scoped.json"), command], {
  cwd: root, windowsHide: true, env: { ...process.env, JAVA_HOME: java, Path: `${path.join(java, "bin")};${process.env.Path || process.env.PATH}`,
    MAGMO_ARCHIVE_EMULATOR_TEST: "1", MAGMO_TOOL_SLACK_EMULATOR_TEST: "1", FIRESTORE_EMULATOR_HOST: "127.0.0.1:8189",
    GCLOUD_PROJECT: "demo-magmo-archive", GOOGLE_CLOUD_PROJECT: "demo-magmo-archive", METADATA_SERVER_DETECTION: "none" },
  stdio: ["ignore", "pipe", "pipe"],
});
let output = "";
child.stdout.on("data", (data) => { output += data; process.stdout.write(data); });
child.stderr.on("data", (data) => { output += data; process.stderr.write(data); });
child.on("exit", (code) => {
  fs.writeFileSync(file("firestore-scoped-emulator.log"), output);
  if (code !== 0) { process.exitCode = code || 1; return; }
  assert.match(output, /# fail 0\r?\n/); assert.match(output, /# skipped 0\r?\n/);
  assert.match(output, /Script exited successfully \(code 0\)/);
  const passed = Number(output.match(/# pass (\d+)\r?\n/)?.[1]); assert(passed >= 23);
  writeReceipt("rules-verification.json", { recordedAt: new Date().toISOString(), status: "passed", passed, failed: 0, skipped: 0,
    rulesSHA256: plan.afterSHA256, configSHA256: sha256(fs.readFileSync(file("emulator-scoped.json"))),
    logSHA256: sha256(Buffer.from(output)), project: "demo-magmo-archive", firestoreHost: "127.0.0.1:8189", productionDatabaseWrites: 0,
    tests: ["test/firestore-item-archive.emulator.test.cjs", "test/tool-slack-rules.emulator.test.cjs"].map((name) => ({ path: name, sha256: sha256(fs.readFileSync(path.join(root, name))) })) });
});
