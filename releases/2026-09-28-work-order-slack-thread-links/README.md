# Work Order Add: Slack work-order thread links

This is a scoped source and verification record for the September 28, 2026
extension to optional Work Order Add Slack delivery. It follows the Git record
at `a223d6f579cc865392d933082ba4aabb602f0583` but uses the newer, actually active
production revision `nextserverwest-00064-miz` as its deployment baseline.
Intervening production changes, including the Ops overtime display release,
must be preserved. This record is **not** a complete source tree, a full website
rebuild, a database backup, or a byte-equivalent rollback artifact.

## Behavior

Only after inventory confirmation succeeds and the user opts into **Send saved
items to Slack**, each newly sent item finishes its existing Shipping or
Receiving list row, then posts a clickable native Slack list-record link into
the selected work order's existing Dispatch thread. The link references the
actual saved list ID and row ID. No picture files, image blocks, message
attachments, link/media unfurls, or top-level channel broadcasts are included
in the thread message. Existing photos in the list entry remain unchanged.

The work-order thread is resolved from the exact server-side confirmed work
order, not the browser or a guessed title. Canonical coordinates, optional
Dispatch receipts, review state, duplicate ownership, and the live parent
message's numeric work-order identity must agree. Missing or conflicting
thread evidence produces a visible link failure without losing the saved
inventory changes or the Slack list entry. BlueFolder is not modified.

The completed list receipt remains `sent`. A separate nested `threadLink`
receipt manages delivery, leases, durable posting intent, and the returned
message identity. Known failures can retry only the link. Unknown outcomes
never blindly repost; an expired stale worker also cannot post after another
worker finishes. Historical receipts without `threadLinkRequested` are not
back-posted during status checks or retries. The UI distinguishes list success
from link success and explicitly describes thread linking in the opt-in popup.

## Verification and data boundaries

The new helper's 16 tests cover both movement directions, native link payloads,
missing/conflicting mappings, exact root identity, unchanged inventory,
concurrent requests, rate limits, retry behavior, unknown outcomes, lost
checkpoint responses, and stale-lease races. The combined helper, existing
list service, and route suite passed 40 tests with no failures or skips. The
broader source regression suite passed 157 tests and its browser interaction
test passed. The exact compiled candidate separately passed 38 backend tests,
one actual compiled-browser interaction test, and the intra-factory UI scope
proof. Tests use mocked responses and make no external Slack or database writes.

An independent read-only check verified that work orders 10691, 10677, 10659,
and 10658 resolve to their exact existing Slack parent messages. It also
confirmed the screenshot's native `list_record` reference format and that the
current bot has the necessary chat/history scopes. Git evidence omits the
actual message text and raw Slack responses. No real Slack posting acceptance
test, inventory movement, database migration, historical backfill, Storage
mutation, or Authentication mutation is performed by this verification.

Only four changed production sources and the unchanged pure Dispatch-receipt
dependency are snapshotted here. The existing inventory confirmation,
warehouse default mappings, standalone Shipping/Receiving buttons, and their
shared Slack-list sender are controls, not changes in this release. The
source and control hashes are in `candidate/website/receipts/frozen-inputs.json`.

## Deployment status

One guarded source-only deployment completed successfully. Production is
ACTIVE at `nextserverwest-00065-cav`, source generation `1790635179814978`,
with its runtime configuration unchanged. The deployment's source archive
was downloaded again and verified against the approved artifact hash. Live
verification passed on September 28 at 22:43:51 UTC: public health, main-search
HTML/build identity, exact JavaScript and CSS hashes, and anonymous method/auth
rejection gates. Verification made no authenticated application requests or
database/Slack writes. The rollback dry run passed; no rollback was applied.

The deployed ZIP has SHA-256
`3c75cafd95f44e95f9cc0adb7bfd20305d2e5c7bd58c603fb81774a6da9d3807`
and build ID `wo-slack-thread-a9f57ab17f63440a`. Independent byte checks verified
507 files, zero deletions, all 139 old immutable static assets, all 44 shared
server chunks, and the unchanged standalone Slack-list sender. Sixty of the
61 modified baseline files contain only reversible build metadata changes.
The modal's surrounding host code was independently checked for preserved
structure and identifier relationships.

The retained baseline is `nextserverwest-00064-miz`, source generation
`1790621211196205`, archive SHA-256
`cbbfd0dc99d439b1110a25fc36cc455bed84771400feebbca9c2af8622b744f8`,
and runtime-configuration SHA-256
`de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.
The intended deployment is a guarded, source-only overlay on this exact
archive. An isolated build is only a compiler input: unrelated production
routes, assets, factories, and runtime configuration must remain intact.

## Rollback boundaries

The byte-exact external baseline archive is retained at
`C:\Users\mack2\Desktop\code\tmp\work-order-slack-thread-link-20260928\deployment\source.zip`
with the baseline SHA-256 above. It is intentionally excluded from Git.
Rebuilding this branch is not a valid production rollback. The snapshotted
tools are review/provenance copies, not a portable deployment installation;
the guarded deployment directory and its credential-loading runtime layout
are required for execution.

Run the frozen `rollback.cjs` without `--apply` for a read-only preflight.
A rollback requires separately authorized,
hash-bound approval and `--apply`; monitor it with `rollback.cjs --status`.
The guard must refuse to overwrite a later deployment. Verify the restored
baseline archive and configuration plus baseline-specific public health/page
checks. Do not run this release's candidate-specific live verifier against
restored 00064.

Code rollback does not delete Slack messages, remove saved list rows, erase
delivery receipts, or revert inventory/history. No database restore is part of
this release, and existing historical receipts must be preserved.

Raw database documents, production ZIPs, full backups, credentials, environment
files, raw Slack payloads, compiled chunks, runtime state, and unrelated local
changes are excluded. JSON evidence is limited to bounded sanitized outcomes,
deployment identity, and hash inventories.
