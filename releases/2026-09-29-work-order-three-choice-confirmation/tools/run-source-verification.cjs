"use strict";
// Local synthetic tests only. No live credentials are passed to child processes.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");
const record = path.resolve(__dirname, ".."), root = path.resolve(record, "../../../..");
const deployment = path.join(root, "tmp/work-order-save-slack-confirmation-20260929/deployment");
const receipt = path.join(deployment, "source-verification.json");
assert(!fs.existsSync(receipt), "Preserve the existing source verification receipt");
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const frozen = JSON.parse(fs.readFileSync(path.join(deployment, "frozen-inputs.json"), "utf8"));
const verifyFrozen = () => {
  for (const [relative, expected] of Object.entries(frozen.hashes)) assert.equal(hash(fs.readFileSync(path.join(root, relative))), expected, `Frozen input changed: ${relative}`);
};
verifyFrozen();
const allowed = ["ALLUSERSPROFILE", "APPDATA", "ComSpec", "HOMEDRIVE", "HOMEPATH", "LOCALAPPDATA", "NUMBER_OF_PROCESSORS", "OS", "Path", "PATHEXT", "PROCESSOR_ARCHITECTURE", "ProgramData", "ProgramFiles", "ProgramFiles(x86)", "SystemDrive", "SystemRoot", "TEMP", "TMP", "USERDOMAIN", "USERNAME", "USERPROFILE", "windir"];
const env = Object.fromEntries(allowed.filter((key) => process.env[key] != null).map((key) => [key, process.env[key]]));
env.PLAYWRIGHT_MODULE_PATH = "C:/Users/mack2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright";
assert(fs.existsSync(env.PLAYWRIGHT_MODULE_PATH));
const suites = [
  { name: "source-browser-and-ui-contract", args: ["--test", "test/work-order-add-slack-ui.browser.test.cjs", "test/work-order-add-ui-contract.test.cjs"] },
  { name: "backend-scanner-and-movement-regressions", args: ["--test", "--test-reporter=dot", "test/fast-scan-drain-ui.test.cjs", "test/work-order-add-service.test.cjs", "test/work-order-add-route.test.cjs", "test/work-order-scanner-capture.test.cjs", "test/work-order-scanner-routes.test.cjs", "test/work-order-add-contract.test.cjs", "test/work-order-add-options.test.cjs", "test/work-order-add-slack.test.cjs", "test/work-order-add-slack-thread.test.cjs", "test/work-order-add-slack-route.test.cjs"] },
];
const results = [];
for (const suite of suites) {
  const started = Date.now();
  const response = spawnSync(process.execPath, suite.args, { cwd: root, env, encoding: "utf8", windowsHide: true, timeout: 180000 });
  process.stdout.write(response.stdout || "");
  process.stderr.write(response.stderr || "");
  if (response.error) throw response.error;
  const summary = Object.fromEntries([...(response.stdout || "").matchAll(/^# (tests|pass|fail|skipped) (\d+)$/gm)].map((match) => [match[1], Number(match[2])]));
  results.push({ name: suite.name, exitCode: response.status, durationMs: Date.now() - started, args: suite.args, ...summary,
    stdoutSHA256: hash(response.stdout || ""), stderrSHA256: hash(response.stderr || "") });
  assert.equal(response.status, 0, `${suite.name} failed`);
  if (summary.skipped != null) assert.equal(summary.skipped, 0, "Skipped tests are not a passing browser gate");
}
verifyFrozen();
const testPaths = [...new Set(suites.flatMap((suite) => suite.args.filter((arg) => arg.startsWith("test/"))))];
const value = { checkedAt: new Date().toISOString(), result: "PASS", suites: results,
  frozenProductionAndControlHashes: frozen.hashes,
  testHashes: Object.fromEntries(testPaths.map((relative) => [relative, hash(fs.readFileSync(path.join(root, relative)))])),
  testsUseSyntheticData: true, liveCredentialsPassedToTests: false, productionRequests: 0, databaseWrites: 0, slackPosts: 0 };
fs.writeFileSync(receipt, JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify({ result: "PASS", receipt, suites: results.map(({ name, exitCode, tests, pass, fail, skipped }) => ({ name, exitCode, tests, pass, fail, skipped })) }, null, 2));
