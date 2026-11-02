# AIS CRITICAL: NO MAGMO RELEASE WITHOUT MAIN LIST + OPS ADMIN + OPS GENERAL

Effective October 16, 2026, at the owner's explicit request. These three surfaces
are critical to AIS operations. This policy overrides older deployment examples
and applies even when a change appears unrelated to inventory or Ops.

| Surface | Required full-page route | Minimum read-only check |
| --- | --- | --- |
| Main List | `/NewSearch/mainSearch` | Real inventory rows load; search/filter and open an item preview; descriptions/locations render without a crash. |
| Ops Admin | `/Ops` | Authorized admin content/work orders load; open a work order/tab or use a filter and return. |
| Ops General | `/Ops-General` | Authorized general content/work orders load; open a work order/tab or use a filter and return. |

## Non-negotiable release requirements

1. Save the live baseline/revision, exact rollback artifact, and intended scope.
   Preserve production-only changes, runtime configuration, security rules, and
   unrelated dirty-worktree changes. Do not replace a targeted hotfix with a
   broad deploy. Rollbacks must preserve security/data compatibility.
2. Exercise all three **full pages of the exact compiled candidate** before any
   publication. A full-page harness may use clearly labeled authenticated-state
   and data mocks for preflight, but must execute production pages/shared app
   components and data-loaded interactions. Isolated components are supplemental.
3. Publish only the tested artifact and authorized services. Do not rebuild,
   change its bytes, or silently switch candidates after validation.
4. In a real, authorized signed-in browser on the deployed origin, load all three
   pages with real data and perform the checks above. Capture console/page errors,
   observed BUILD_ID, loaded route asset hashes, screenshots/browser logs, time,
   and verifier. Test fresh navigation/reload, not only cached old bundles.
5. Validate postflight against the deployed build. No "complete" or "successful"
   handoff until all checks pass. An inaccessible/failing page or missing real
   data leaves the release unverified/failed: investigate immediately or perform
   the authorized safe rollback.

**Not sufficient:** HTTP 200; login/redirect screens; HTML/asset downloads; API
health alone; compilation; unit tests; isolated components; mock authentication
after deployment; screenshots from an older build.

Never submit, save, dispatch, approve, post, send notifications, or modify real
inventory/work orders merely to test availability. **BlueFolder and Slack remain
read-only; this policy does not authorize changing them.**

## Fail-closed, cross-platform evidence validator

`scripts/verify-critical-deployment.cjs` runs with Node on Windows/Linux/macOS.
It validates a saved browser-verification attestation and evidence integrity;
it does **not** invent or perform the signed-in browser checks. The verifier is
responsible for truthful observation. Never manufacture a passing receipt.
Keep receipts/screenshots/logs **outside** the candidate `.next`.

```text
node scripts/verify-critical-deployment.cjs fingerprint --build-root PATH_TO_CANDIDATE/.next
node scripts/verify-critical-deployment.cjs verify --build-root PATH_TO_CANDIDATE/.next --phase preflight --environment production --receipt PATH_TO_PREFLIGHT.json
node scripts/verify-critical-deployment.cjs verify --build-root PATH_TO_CANDIDATE/.next --phase postflight --environment production --receipt PATH_TO_POSTFLIGHT.json
```

The fingerprint hashes sorted relative paths and each regular file's SHA-256;
only top-level cache/dev/diagnostics/types are omitted. Any runtime-byte/BUILD_ID
change invalidates proof. Preflight expires after 24 hours; postflight after 2.
Postflight also fetches public page BUILD_IDs and cited assets from the live
origin. These network checks **supplement**, not replace, signed-in evidence.

Receipt schema (placeholders deliberately do not constitute passing proof):

```json
{
  "schemaVersion": 1,
  "phase": "postflight",
  "environment": "production",
  "buildId": "OBSERVED_BUILD_ID",
  "buildSha256": "SHA256_FROM_FINGERPRINT_COMMAND",
  "origin": "https://magmo.cloud",
  "verifiedAt": "ACTUAL_ISO_UTC_TIME",
  "verificationMode": "authenticated-browser",
  "verifier": "NAME_OR_AGENT_AND_AUTHORIZED_SESSION",
  "pages": [
    {
      "path": "/NewSearch/mainSearch",
      "observedUrl": "https://magmo.cloud/NewSearch/mainSearch",
      "observedBuildId": "OBSERVED_BUILD_ID",
      "fullPage": true,
      "authenticated": true,
      "dataLoaded": true,
      "interactionPassed": true,
      "pageErrors": [],
      "consoleErrors": [],
      "details": "Describe actual loaded data and read-only interaction, not a generic claim.",
      "evidence": [{ "path": "saved-browser-evidence.json", "sha256": "ACTUAL_EVIDENCE_SHA256" }],
      "assets": [{ "path": "/_next/static/chunks/pages/ACTUAL_ROUTE.js", "sha256": "ACTUAL_LOADED_ASSET_SHA256" }]
    }
  ]
}
```

Include exactly one entry for **each** route. Evidence paths are absolute or
relative to the receipt; every file must exist and match its digest. Include
browser error observations, not only screenshots. Zero page/console errors are
required; investigate errors rather than deleting them from a receipt.
Asset evidence must include that route's own compiled page JavaScript from
`build-manifest.json`; a shared framework/runtime bundle alone is rejected.
Preflight alone may use `full-page-authenticated-state-mocks` and a local origin;
describe all mocks. Production postflight uses `https://magmo.cloud`; test uses
`https://magmo-test.web.app`.

## Windows / npm canonical deployment

```powershell
# Build/package only; nothing published.
.\deploy.ps1 -PrepareOnly
# Exercise exact functions/.next full pages and save preflight.
.\deploy.ps1 -DeployPrepared -PreflightReceipt PATH_TO_PREFLIGHT.json
# Publication deliberately exits as verification-pending, not successful.
# Exercise real signed-in live pages, save postflight, then complete:
.\deploy.ps1 -VerifyDeployed -PostflightReceipt PATH_TO_POSTFLIGHT.json
```

Use `testdeploy.ps1` for test; npm forwards parameters after `--`.
`-DeployPrepared` avoids rebuilding/rewriting the prepared environment. Default
invocation builds but blocks publication without matching proof. `-DryRun` does
not publish but still needs preflight when reaching Firebase hooks. **Do not
republish to resolve postflight-pending; use `-VerifyDeployed`.**

Existing broad scripts also select rules/indexes/database and production
schedules. Review and authorize that entire scope before use. Do not use them
instead of a scoped source-only hotfix when workspace/production have diverged.

## Firebase CLI / Linux / macOS / CI

Functions and both Hosting targets in `firebase.json` have predeploy gates.
Before a specifically scoped Firebase deployment, set
`MAGMO_CRITICAL_PREFLIGHT_RECEIPT` to the receipt's absolute path and
`MAGMO_DEPLOY_ENVIRONMENT` to `production` or `test`. Hooks verify
`functions/.next`, not another local build. Review exact targets; never use an
unscoped `firebase deploy`.

Linux/macOS/CI use the same validator before publication and after actual live
browser verification. Keep non-secret evidence with the release. There is no
checked-in CI release workflow or maintained `deploy.sh`; do not assume either
provides protection. Do not store credentials, cookies, or session tokens in
receipts/screenshots.

## Manual Cloud Functions / Cloud Run patches / console / rollback

Custom source-only patches, alternate Firebase configs, rules-only deployments,
and cloud console actions can bypass repository Firebase hooks. They are
**still subject to all three full-page checks**. Explicitly call the validator
with the candidate `.next` before the write and again with live postflight.
Keep source/configuration hashes and baseline so published and verified bytes
are the same. Emergency repairs do not waive the gate.

If credentials/session availability prevent live checks, state the limitation
and obtain help; do not label the release complete. Repeatedly reloading a broken
production page is not a rollback plan.

## Coverage and limitations

The policy is prominent in root `AGENTS.md`, `README.md`, `DEPLOYMENT_GUIDE.md`,
and `.github/copilot-instructions.md`; Windows/npm and Firebase Functions/Hosting
paths call the validator. Carry it into other Magmo checkouts/deployment hosts.
Local files cannot enforce remote console/IAM actions, independent repositories,
or uninspected external CI. Review those before claiming organization-wide
enforcement. Do not change unrelated global AI settings or post to Slack/BlueFolder.

Deployment-scope instructions were also installed and read back on October 16,
2026, in the local Codex `C:/Users/mack2/.codex/AGENTS.md` and remote
`magmo-server:C:/Users/Owner/.codex/AGENTS.md`. Those global instructions apply
only to Magmo work. The remote host has the instruction note; its application
checkout/deployment scripts were not located or changed, so remote executable
gate coverage remains unverified. No Slack or BlueFolder note was posted.
