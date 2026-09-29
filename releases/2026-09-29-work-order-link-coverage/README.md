# BlueFolder work-order link coverage — release record

This directory is an archive-backed deployment record, not a complete source
checkout suitable for rebuilding the website. Its starting Git commit
`2ff2e5d5313a01e6d80dd995b6a26b34e05b3281` records an earlier release and is
**not** equivalent to the production baseline below. In particular, later
item-status changes in production must not be lost by rebuilding that commit.

## Exact pre-change website baseline

- Active revision captured: `nextserverwest-00066-xuc`.
- Source generation: `1790694686826425`.
- Build ID: `item-status-52cd8da14a55bec2`.
- Exact source archive: `baseline/source-00066.zip` (511 files).
- Archive SHA-256: `7716c30cc40da7247478218065cc4153e94939c773100876ab1a5015cda6162a`.
- Runtime/configuration SHA-256: `de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.

`baseline/baseline.json` identifies the captured production object and
`baseline/baseline-files.json` records every extracted file hash. The exact
archive, not the surrounding repository tree, is the code rollback authority.
It is a website source/build artifact, not a database backup or runtime
configuration export. No environment files, credentials, private database
snapshots, owner-alert configuration, or repair audit documents are included.

## Audited coverage and data boundaries

All **613 imported work orders at the audited cutoff** were examined:
**407 verified and 206 held for review**. This does not mean every work order
was automatically fixed. The reported 313 machine-link and 91 site-link
counts overlap; do not add them as unique work orders. Ambiguous identities
were held for review, not guessed.

No inventory item or item-history records were changed. The 206 historical
held cases remain in the private ledger with initial alerts suppressed to
avoid flooding the owner with old incidents. Genuine new post-cutoff link
incidents are eligible for owner-only alerts. Owner identity/configuration,
private incidents and repair documents are excluded from this Git record.
Data backups and detailed repair audit receipts are retained separately.

## Deployment sequence and verification

The reviewed linkage/source-revalidation/owner-alert overlay was deployed as
`nextserverwest-00067-loh`. Its exact archive and historical receipts are in
`candidate/website/`: 487 source tests, 86 actual-compiled tests, independent
byte review and read-only live verification passed.

Two separate Calendar deployments then produced `00068-tek` and `00069-geb`;
the latter corrected the Calendar API loader. Both changes are preserved in
the one-file incident-deduplication hotfix. Its exact pre-hotfix baseline is
`hotfix/baseline/source-00069.zip`, SHA-256
`250c33036d94e3d1aa5c549cfec7b6451b0ec8dcd64782ddef1ef75e10e1b36d`.

The hotfix is ACTIVE as **`nextserverwest-00070-liw`**. Exact archive SHA-256:
`e4201b19e44328e633c7f0c11f5bba377c5488a3d4ef57f881d921bdd843329e`.
Only `work-order-link/lib/ops/workOrderLinkHealth.cjs` changed:
536 other files and all 150 static assets remain byte-identical to 00069.
The helper prevents reason-only refinements of suppressed historical
incidents from becoming new alerts. Helper SHA-256:
`7584758c729e51b9d24b3b10d69089798d5609406e4ad60136b037dbc0c0af95`.
494 source tests and 93 actual-compiled tests passed, together with
independent/root byte review. Live verification at 18:57:12 UTC confirmed the
exact source/configuration, main inventory page, all 18 referenced assets and
authentication/method guards. Source-only rollback dry run passed for 00069.
Receipts are under `hotfix/candidate/website/receipts/`.

Owner delivery was paused during correction. Twelve historical duplicate
incidents were reconciled before delivery was re-enabled and verified at
18:58:36 UTC; previously sent messages were retained. This cleanup did not
change inventory items or history. Detailed identity/configuration and queue
verification receipts remain private and are excluded from Git.
An initial attempt uploaded an archive
but saw transient `UNKNOWN` at the post-upload guard and aborted before
journal creation or source PATCH. A fresh read confirmed unchanged 00069
before the single journaled submission. Upload alone was not a deployment.

Git checkpoint names are `codex/pre-work-order-link-coverage-20260929` for the
exact original baseline and `codex/deployed-work-order-link-coverage-20260929`
for this verified release record. The release branch is
`codex/work-order-link-coverage-20260929`.

## Listener deployment and recovery

Listener version `2026.09.29-bluefolder-link-coverage.1` expires successful
acknowledgements after six hours and retries legacy acknowledgements rather
than treating them as permanent linkage proof. Eight scoped AST/behavior
tests passed. Source and checkpoint received a dated remote backup; the
checkpoint was never replaced and all prior work-order keys were retained.

The initial restart exited when its SSH job ended. A narrow recovery launched
the same unchanged listener source outside that job with a hidden, detached
manager. A separate SSH session subsequently verified the new version,
healthy running state and successful polling. Other services were not
restarted. `candidate/listener/` retains initial publication, actual recovery
and live-verification receipts plus the updated future launcher. No server
checkpoint/config data is committed.

## Rollback boundaries

For the final hotfix use `hotfix/tools/rollback-release.cjs`, restoring the
exact **00069** archive and preserving both Calendar changes. **Pause owner
delivery before rollback**: the pre-deduplication helper can revive historical
alerts. The separately reviewed approval requires `ownerDeliveryPaused: true`.

The older root `tools/rollback-release.cjs` is historical 00067-to-00066
recovery only; its revision guard refuses later Calendar/hotfix releases.
Never bypass it or rebuild an older Git checkout as a substitute. Both tools
require a hash-bound approval and dry run before applying.

Both portable tools require an operator-provided, short-lived OAuth token through
`GOOGLE_OAUTH_ACCESS_TOKEN`; do not put that token in a file or Git. With no
arguments the tool only reads and verifies the active release. `--apply`
requires a local ignored `rollback-local-approval.json` with the exact
deployed revision, baseline archive hash, rollback tool hash, and explicit
`restoreData: false` and `restoreRules: false`. A submission creates an ignored
local journal before the source PATCH. Once journaled, use `--status` only;
never blindly retry a potentially accepted submission. The journal blocks
duplicate apply, and current revision, source object, archive and configuration
must match the recorded deployed build before restoring its baseline archive.

Source rollback does not restore or delete Firestore data, undo inventory
history, change Slack messages, remove alert receipts, modify Authentication,
or revert runtime configuration. In particular, the published Firestore rules
that protect `OpsWorkOrderLink.*` private collections must remain protected
even if website code is rolled back. The server listener has its own dated
backup, state-preserving deployment, and rollback boundary.
