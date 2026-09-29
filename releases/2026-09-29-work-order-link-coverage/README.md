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

## Status and release gates

This is a **prepared pre-deployment record**. It does not yet claim that the
candidate has been approved, deployed, or verified. No tag or commit was
created by the preparation step. Candidate archive, approved hashes,
verification receipts and final deployment identity will be added only after
their respective checks finish. The portable rollback tool has been prepared
and tested offline; it cannot operate until the candidate deployment receipt
is present.

The intended release overlays only reviewed work-order linkage, source
revalidation, and owner-only alert code on the exact current baseline. It
must retain unrelated code, static assets, runtime settings, and item status
changes. Existing historical link incidents must be suppressed before the
new periodic sweep runs; recipient configuration is verified separately and
is never committed here.

Planned rollback tags are
`codex/pre-work-order-link-coverage-20260929` and
`codex/deployed-work-order-link-coverage-20260929`. These names are plans,
not a statement that the tags exist.

## Rollback boundaries

A website rollback must restore only the hash-verified 00066 source archive,
and refuse to overwrite any subsequent release. Never rebuild this directory
or an older repository commit as a substitute. The deployed release receipt
and a separately reviewed, hash-bound approval are required before applying
a rollback; a dry run must precede it.

`tools/rollback-release.cjs` is the portable source-only rollback entry point.
It requires an operator-provided, short-lived Google OAuth access token through
`GOOGLE_OAUTH_ACCESS_TOKEN`; do not put that token in a file or Git. With no
arguments the tool only reads and verifies the active release. `--apply`
requires a local ignored `rollback-local-approval.json` with the exact
deployed revision, baseline archive hash, rollback tool hash, and explicit
`restoreData: false` and `restoreRules: false`. A submission creates an ignored
local journal before the source PATCH. Once journaled, use `--status` only;
never blindly retry a potentially accepted submission. The journal blocks
duplicate apply, and current revision, source object, archive and configuration
must all match the recorded deployed build before it can restore 00066.

Source rollback does not restore or delete Firestore data, undo inventory
history, change Slack messages, remove alert receipts, modify Authentication,
or revert runtime configuration. In particular, the published Firestore rules
that protect `OpsWorkOrderLink.*` private collections must remain protected
even if website code is rolled back. The server listener has its own dated
backup, state-preserving deployment, and rollback boundary.
