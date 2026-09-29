# Work Order Add: one save-and-Slack confirmation popup

This is a scoped source, test, and verification record for the September 29,
2026 Work Order Add confirmation change. Its Git predecessor is
`ad75566457ffd0392cb2c7cefa9c776ff1a8b647`. The deployment baseline is the
actually active production revision `nextserverwest-00070-liw`, not a rebuild
of that Git predecessor. This record is **not** a complete application source
tree, database backup, deployable website, or byte-equivalent rollback archive.

## Behavior and scope

**Confirm list** opens one centered popup with **Cancel**, **Save only**, and
**Save and send to Slack**. Cancel returns to the staged list without saving.
Save only saves inventory and history without sending to Slack. Save and send
to Slack saves first, then sequentially sends each unique item in the server's
confirmed result. The same popup remains visible for saving and delivery
results; there is no second-popup animation callback controlling delivery.

The immediate sender receives the successful confirmation result directly,
including its saved operation ID and item membership. Synchronous guards stop
double clicks before React rerenders. Slack failures remain separate from
inventory confirmation; failed-only retries and uncertain-status checks reuse
the saved operation and existing server receipts rather than saving inventory
again. Late relay scans can finish while the confirmation popup is open, while
manual and camera edits remain locked. The existing scanner drain and stop
must finish before confirmation is sent.

Only `WorkOrderAddModal.js` and its CSS are changed production sources. The
unchanged UI contract is included as a control. The existing backend
Shipping/Receiving list sender and exact work-order thread linking are not
changed. No database migration, historical movement repair, Slack backfill,
scanner-server edit, or BlueFolder edit is part of this release. Thread links
still contain no uploaded pictures; existing list-entry behavior is preserved.

## Verification and deployment

The scoped v3 compiled candidate passed the browser verification, including
nine interaction scenarios plus its topology check. Independent AST and byte
checks confirm that only the intended modal function and its CSS-name mapping
change: all 200 backend/linkage files, all existing immutable static assets,
and the surrounding main-search code are preserved. The candidate has 537
baseline files plus three new static assets; 60 modified baseline files contain
only reversible build-ID/page-asset metadata substitutions. The existing CSS
bytes already include the popup styles; the corrected mapping exposes all 79
class names to the component.

One guarded source-only deployment completed successfully. Production is
ACTIVE at `nextserverwest-00071-zot`, source generation `1790723626923081`,
with build ID `wo-three-choice-cf82a97caaee43f0`. The deployed archive's SHA-256 is
`cd45fc1b6184406a6e41b9db1989c2b7a5bbbd8c70d544aef3ce05e426060017`.
Read-only live verification passed September 29 at 23:18:01 UTC, checking the
actual deployed archive, unchanged runtime configuration, public health, page
identity, every required static asset, and anonymous method/authentication
rejections. The rollback preflight passed at 23:18:07 UTC; no rollback was
applied. Deployment and verification made no inventory writes or test Slack
posts. Existing browser tabs must reload to receive the new page asset.

A fresh local source/browser suite passed all 22 checks with no skips, and the
requested backend/scanner/movement regression command exited successfully.
Its frozen input and test hashes, exit codes, and output hashes are recorded
in `candidate/website/receipts/source-verification.json`.

Tests use synthetic inventory and mocked API responses. Source and browser
checks cover Cancel, Save only, Save and send to Slack, delayed confirmation,
duplicate clicks, failed saves, partial Slack failure, retries, and scanner
draining. Production verification must not create inventory movements or
send test Slack messages. Raw request logs, customer records, Slack message
payloads, signed image URLs, secrets, and environment files are excluded.

## Baseline and rollback boundaries

The retained pre-change production baseline is `nextserverwest-00070-liw`,
source generation `1790707920911481`, captured September 29, 2026. Its archive
SHA-256 is
`e4201b19e44328e633c7f0c11f5bba377c5488a3d4ef57f881d921bdd843329e`
and its runtime-configuration SHA-256 is
`de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.
The archive is retained outside this record at
`C:\Users\mack2\Desktop\code\tmp\work-order-save-slack-confirmation-20260929\deployment\source.zip`.
It is not copied into this scoped source snapshot.

Deployment must preserve the exact current Calendar, work-order linkage,
backend API, scanner, and unrelated production code. A local application
build is a compiler input only; it is not an approved replacement for the
entire deployed source. Rebuilding this Git branch is not a production
rollback. Any rollback requires separately authorized, hash-bound execution
and a guard against overwriting later releases. A code rollback does not
erase inventory history, Slack list rows/messages, or delivery receipts.

For a read-only rollback readiness check, run `node rollback.cjs` from the
retained deployment directory above. Applying a rollback requires a separately
authorized `rollback-approval.json` bound to the deployed revision, baseline
archive hash, rollback tool hash, and shared tool hash, followed by
`node rollback.cjs --apply`. An already-journaled rollback must be monitored
with `node rollback.cjs --status`, never submitted again. After rollback,
verify the restored archive/configuration and baseline-specific health/page
checks; the new-build live verifier intentionally requires revision 00071.

The tools here are local provenance copies, not a portable deployment
installation. `tools/refresh-record.cjs` performs allowlisted byte-exact local
snapshots only; `tools/verify-record.cjs` checks the manifest and obvious secret
patterns. Neither commits, pushes, deploys, or accesses production services.
