"use strict";
const { spawnSync } = require("node:child_process");
const { fs, path, assert, file, json, sha256, writeReceipt } = require("./cloud-common.cjs");
const root = path.resolve(__dirname, "../../..");
const run = spawnSync(process.execPath, ["--test", file("test-compiled-services.cjs")], { encoding: "utf8", windowsHide: true });
fs.writeFileSync(file("compiled-services.tap"), run.stdout + run.stderr);
assert.equal(run.status, 0, run.stdout + run.stderr);
assert.match(run.stdout, /# fail 0\r?\n/); assert.match(run.stdout, /# skipped 0\r?\n/);
const passed = Number(run.stdout.match(/# pass (\d+)\r?\n/)?.[1]); assert(passed >= 125);
const report = json("server-overlay-report-v2.json");
for (const entry of report.files) {
  assert.equal(sha256(fs.readFileSync(file(`${report.overlayDirectory}/${entry.path}`))), entry.afterSHA256);
  // pages-manifest also contains the final BUILD_ID/asset metadata updates;
  // the executable server factory files must be exactly the reviewed overlay.
  if (entry.path.endsWith(".js")) assert.equal(sha256(fs.readFileSync(file(`scoped-source/${entry.path}`))), entry.afterSHA256);
}
writeReceipt("compiled-services-verification.json", { result: "PASS", verifiedAt: new Date().toISOString(), passed, failed: 0, skipped: 0,
  actualCandidateFactories: true, candidateDirectory: "scoped-source", exactHttpSharedSenderFactoryId: 1572,
  overlayReportSHA256: sha256(fs.readFileSync(file("server-overlay-report-v2.json"))),
  overlayFiles: report.files.map((entry) => ({ path: entry.path, sha256: entry.afterSHA256 })),
  serviceFactoryIds: [93100031, 93100057, 93100062, 93100061, 94500002, 1572],
  tests: ["tool-slack-identity.test.cjs", "work-order-add-service.test.cjs", "work-order-add-contract.test.cjs", "work-order-add-slack.test.cjs", "work-order-add-slack-thread.test.cjs"]
    .map((name) => ({ path: `test/${name}`, sha256: sha256(fs.readFileSync(path.join(root, "test", name))) })),
  loaderSHA256: sha256(fs.readFileSync(file("compiled-server-loader.cjs"))),
  harnessSHA256: sha256(fs.readFileSync(file("test-compiled-services.cjs"))),
  logSHA256: sha256(fs.readFileSync(file("compiled-services.tap"))), productionMutations: 0 });
console.log(JSON.stringify({ result: "PASS", passed, actualCandidateFactories: true, productionMutations: 0 }));
