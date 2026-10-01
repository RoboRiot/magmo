const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const here = __dirname, root = path.resolve(here, "../../..");
const hash = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const rulesFile = path.join(here, "firestore-scoped-v2.rules");
const rulesSHA256 = hash(rulesFile);
assert.equal(rulesSHA256, "ea0411223d929c3e2147ff156a67b90ef79e4764e6a8615954cec84e6a055337");
const helperSHA256 = hash(path.join(root, "utils/warehouseAssociations.js"));
assert.equal(helperSHA256, "d3d94aa3b4b12eb16ac445876810c481664af3c680d351f776269f0917122667");
const logPath = path.join(here, "firestore-scoped-emulator.log");
const logBytes = fs.readFileSync(logPath);
const log = logBytes[0] === 0xff && logBytes[1] === 0xfe ? logBytes.toString("utf16le") : logBytes.toString("utf8");
assert.match(log, /# tests 17\r?\n/);
assert.match(log, /# pass 17\r?\n/);
assert.match(log, /# fail 0\r?\n/);
assert.match(log, /# skipped 0\r?\n/);
assert.match(log, /Script exited successfully \(code 0\)/);
assert.match(log, /demo project ID "demo-magmo-archive"/);
const jdkZip = path.resolve(here, "../portable-jdk/temurin21.zip");
const jdkSHA256 = hash(jdkZip);
assert.equal(jdkSHA256, "f9d6e191ab098c0d416e7d588a24420a8621cd2f4720dab2459b8b7b2d2d8b4e");
const report = {
  recordedAt: new Date().toISOString(), status: "passed", rulesFile: "firestore-scoped-v2.rules", rulesSHA256,
  testFile: "test/firestore-item-archive.emulator.test.cjs",
  testSHA256: hash(path.join(root, "test/firestore-item-archive.emulator.test.cjs")),
  transactionalHelperSHA256: helperSHA256,
  passed: 17, failed: 0, skipped: 0, logFile: "firestore-scoped-emulator.log", logSHA256: hash(logPath),
  project: "demo-magmo-archive", firestoreHost: "127.0.0.1:8189",
  config: "emulator-scoped.json", configSHA256: hash(path.join(here, "emulator-scoped.json")),
  portableJdk: { version: "21.0.12.1+1", distribution: "Eclipse Temurin", zipSHA256: jdkSHA256,
    source: "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.12.1%2B1/OpenJDK21U-jdk_x64_windows_hotspot_21.0.12.1_1.zip",
    officialChecksum: "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.12.1%2B1/OpenJDK21U-jdk_x64_windows_hotspot_21.0.12.1_1.zip.sha256.txt",
    systemInstalled: false },
  coverage: ["numeric/case/separator/tab/outer-space stale-client denial", "new aliases must match document identity",
    "existing numeric and lowercase owners block canonical creation", "retired numeric identities cannot be reused",
    "legacy ordinary updates preserve data", "both numeric/canonical batch orders fail atomically",
    "actual concurrent creation has exactly one canonical winner", "existing target cannot be overwritten",
    "historical numeric rename retirement preserved", "archive/rename authorization and eight-alias access-budget regressions"],
  productionDatabaseWrites: 0, productionStorageWrites: 0, productionSlackPosts: 0,
};
fs.writeFileSync(path.join(here, "rules-verification.json"), JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify(report, null, 2));
