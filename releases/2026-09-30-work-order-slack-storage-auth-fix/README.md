# Work Order Add: Slack photo-storage authentication repair

This is a scoped source, test, and provenance record for September 30, 2026.
The previous Git release record is `f5b394d9bea71c09657087d27088c13c43cd31d7`.
It is not a complete application tree, database backup, or deployable rollback
archive. Production composition starts from the actually deployed revision,
not from the dirty workspace or a full rebuild of this branch.

## Root cause and repair

Slack delivery loads the saved item's photo metadata before creating its Slack
list row. The production storage dependency chain used `google-auth-library`
9.15.1 and `gcp-metadata` 6.1.1 with a forced `gaxios` 7.2.0 override. The
metadata client expected a plain header object, but gaxios 7 returned a Headers
object. It rejected a valid metadata response and failed server authentication
before any Slack row could be created. Earlier application tests mocked photo
loading, so they did not exercise this real dependency incompatibility.

The storage-specific forced gaxios 7 override is removed, restoring its
compatible gaxios 6.7.1/node-fetch 2 chain. A narrow uuid 11.1.1 override retains
the existing security posture for that chain. Existing lockfile entries remain
unchanged; only nine required compatibility entries are added. Baseline and
candidate dependency audit totals remain equal; pre-existing unrelated audit
findings are not represented as resolved by this release.

The Slack service also preserves safe error code, type, and stage in receipts
and structured server diagnostics. The reproduced metadata error is classified
as `storage_auth_metadata_incompatible` at `photo_loading`. Error messages now
distinguish a send with no Slack row from a retry that resumes an existing row.
Raw exception text, stack traces, signed URLs, emails, payloads, and credentials
are excluded from these new diagnostics. Existing sender code outside the scoped
service is unchanged; this is not a whole-application logging audit.

## Scope and verification

Only three production files change: package metadata, its lockfile, and the
Work Order Add Slack API bundle. In the bundle only service factory 99397 changes.
Independent AST review proves the factory equals the reviewed source, and byte
comparison proves everything outside it is unchanged. All 540 production paths,
client assets, inventory-save logic, history behavior, scanner behavior, Calendar,
work-order linking, and runtime configuration are preserved.

The service/route/thread regression suite passes 49 checks, including uncertainty,
retry idempotency, no repeat inventory saves, missing photo/auth preparation,
specific stage capture, storage/checkpoint failures, and sensitive-error redaction.
The wider inventory/scanner regression suite passes 151 checks, and the exact
compiled service passes 44 checks. Three real-SDK graph checks cover root,
Functions, and isolated production-candidate dependencies.
Two additional deployment-gate tests verify the standard Firebase build verifier
runs both installed Storage graphs and fails closed before reporting deployable.
Its candidate override is cleared and execution is bounded to 45 seconds. The
narrow verifier patch is recorded separately from pre-existing unrelated ingest
verification edits; those edits remain intact. This future-deployment guard was
added after submission and does not change the approved runtime archive. Its
four-test rerun includes two already-counted ADC graph checks, not four new tests.
The real-SDK loopback metadata test reproduces the baseline failure and succeeds
with the candidate dependencies without real credentials, inventory writes, or
Slack posts. The exact candidate is checked independently of root node_modules.

There are 200 unique verified checks: 151 source regressions, 44 compiled checks,
three SDK graph checks, and two new deployment-gate checks. The separate 49-check
focused rerun is a subset, not an additional 49 checks.

One guarded source-only deployment completed September 30, 2026 at 18:42:05 UTC
(11:42 AM PDT). Production is ACTIVE at `nextserverwest-00072-wal`, source
generation `1790793436179980`. The deployed archive SHA-256 is
`698401991766587795dc9ac668e39c39b0bab326ce653680352c479f65a54b53`.
Read-only live verification passed at 18:42:18 UTC: exact archive and unchanged
runtime configuration, health, page identity, all 20 required static assets,
and anonymous method/authentication rejections. Rollback preflight passed at
18:42:17 UTC without applying a rollback. The build ID remains
`wo-three-choice-cf82a97caaee43f0` because no client assets change.

The rollout and verification made no inventory writes or real Slack posts.
The root agent's read-only post-deployment comparison at 18:43:02 UTC confirmed
the affected item's saved placement and its existing failed-delivery receipts
were unchanged; deployment did not resend or save the item again.
The real SDK tests use loopback metadata/photo services; a real successful Slack
delivery is not claimed by these checks. No historical Slack send is authorized
or performed by these record tools.

## Backup and rollback

The dated pre-change baseline is `nextserverwest-00071-zot`, source generation
`1790723626923081`, captured September 30, 2026. Its archive SHA-256 is
`cd45fc1b6184406a6e41b9db1989c2b7a5bbbd8c70d544aef3ce05e426060017`.
Its runtime-configuration SHA-256 is
`de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.
The complete source archive and private runtime configuration stay outside Git:

`C:\Users\mack2\Desktop\code\tmp\work-order-slack-preparation-fix-20260930\deployment\source.zip`

Only sanitized metadata and hashes appear here. No full database backup or data
migration is performed for this narrowly scoped service/dependency repair.
Code rollback must use the retained hash-bound archive with a current-revision
guard and explicit authorization, not a rebuild of this release-record branch.
It does not undo inventory history, Slack rows/messages, or delivery receipts.

The tools in this record are local provenance copies, not a portable deployment
installation. Refresh and verification are allowlisted, local-only operations;
they do not commit, push, deploy, or access production services.
