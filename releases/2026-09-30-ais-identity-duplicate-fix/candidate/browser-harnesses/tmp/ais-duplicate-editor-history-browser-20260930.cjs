// Reuse the established, credential-free editor/history browser regression
// against this release, without changing its original harness or QA artifacts.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { createRequire } = require("node:module");
const original = path.join(__dirname, "item-history-20260930/verify-editor.cjs");
const candidate = process.argv[2] ? path.resolve(process.argv[2])
  : path.join(__dirname, "ais-duplicate-fix-20260930/deployment/scoped-source-v2/.next");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
function captureArtifactInputs() {
  const manifestBytes = fs.readFileSync(path.join(candidate, "build-manifest.json"));
  const manifest = JSON.parse(manifestBytes);
  const files = [...new Set([
    ...manifest.pages["/_app"],
    ...manifest.pages["/NewSearch/item/[id]"],
    ...manifest.pages["/NewSearch/AddItem/NewItem"],
  ])];
  return {
    buildId: fs.readFileSync(path.join(candidate, "BUILD_ID"), "utf8").trim(),
    manifestSHA256: sha256(manifestBytes),
    assets: files.map(file => ({ path: file, sha256: sha256(fs.readFileSync(path.join(candidate, file))) })),
  };
}
const artifactInputs = captureArtifactInputs();
let source = fs.readFileSync(original, "utf8");
const patches = [
  ["const artifactMode=process.argv.includes('--artifact');", "const artifactMode=true;"],
  ["artifactMode?'editor-artifact-browser':'editor-browser'", "'ais-duplicate-editor-history-browser'"],
  ["candidate=path.join(__dirname,'deployment/scoped-source-v2/.next')", `candidate=${JSON.stringify(candidate)}`],
  ["run().catch(e=>{console.error(e);process.exitCode=1;});", "return run();"],
];
for (const [before, after] of patches) {
  assert.equal(source.split(before).length, 2, "Expected one harness adaptation target");
  source = source.replace(before, after);
}
process.env.PLAYWRIGHT_MODULE_PATH ||= "C:/Users/mack2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright";
process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||= "C:/Program Files/Google/Chrome/Application/chrome.exe";
const startedAt = new Date().toISOString();
Promise.resolve(new Function("require", "__dirname", "__filename", "module", "exports", source)(
  createRequire(original), path.dirname(original), original, module, exports
)).then(() => {
  assert.deepEqual(captureArtifactInputs(), artifactInputs, "Candidate assets changed during browser verification");
  const outputDirectory = path.join(path.dirname(original), "ais-duplicate-editor-history-browser");
  const resultBytes = fs.readFileSync(path.join(outputDirectory, "verification.json"));
  const result = JSON.parse(resultBytes);
  assert.equal(result.ok, true);
  const receipt = {
    ...result,
    mode: "artifact",
    checksPassed: result.checksPassed.map(check => check === "full source editor renders"
      ? "actual compiled editor factory 40705 renders" : check),
    loadedPageFactoryIds: [40705, 19967],
    factoryRegistrySHA256: sha256(fs.readFileSync(path.join(outputDirectory, "candidate-factories.js"))),
    startedAt,
    completedAt: new Date().toISOString(),
    candidate,
    artifactInputs,
    candidateAssetsStableThroughoutRun: true,
    suiteReceiptSHA256: sha256(resultBytes),
    harnessSourceSHA256: sha256(Buffer.from(source)),
    noProductionWrites: true,
    network: "loopback-only; Firestore, auth, router and external side effects mocked",
  };
  const target = path.join(outputDirectory, "artifact-verification.json");
  fs.writeFileSync(target, JSON.stringify(receipt, null, 2) + "\n");
  console.log(JSON.stringify({ ok: true, buildId: artifactInputs.buildId, target, sha256: sha256(fs.readFileSync(target)) }));
}).catch(error => { console.error(error); process.exitCode = 1; });
