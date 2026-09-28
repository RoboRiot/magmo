This is the scoped source, verification, deployment, data-correction, and
rollback record for the 2026-09-25 Work Order Add warehouse-default and
optional Slack-delivery release. It succeeds the immutable prior release at
commit `b1fce73a912f9320c8cff5d54cf45a248d41f094`. It is not a complete source
tree, a production database export, or a byte-equivalent rebuild of the
website.

## Outcome

- Warehouse work orders without selected or explicit equipment resolve to the
  established inventory Interior by exact IDs. Lake Forest sources `AIS17182`
  and `AIS94688` resolve to Client `AIS17182` / Machine `AIS42516`; Lathrop
  sources `AIS25097` and `AIS89914` resolve to Client `AIS25097` / Machine
  `AIS12954`. BlueFolder source identity remains in movement provenance.
- Preview and confirmation use the same mapping, and confirmation rereads the
  live Client/Machine relationship. An explicit machine/trailer, selected
  BlueFolder equipment, a deleted record, malformed typed reference, ownership
  conflict, or source-identity drift prevents the default instead of guessing.
- **Confirm list** now opens a final review popup. Inventory is saved only after
  **Yes, save changes**; scanner input is drained and stopped first.
- A separate popup appears only after a successful save and asks whether to
  send every changed item to Slack. No/close sends nothing and never repeats or
  reverses inventory confirmation. Yes sends the server-confirmed item manifest
  sequentially: `current_at_work_order` uses Shipping and `from_work_order`
  uses Receiving.
- Server-only per-item receipts, leases, and row checkpoints prevent duplicate
  Slack creation. Explicit failures can be retried without resaving inventory;
  uncertain/in-flight results require a status check and are never recreated
  blindly. The client supplies only `operationId` and `itemId`; the server
  reconstructs and validates the operation, item, movement, list, and actor.
- The optional Slack request alone has a 240-second client timeout to cover the
  bounded photo workflow; existing scanner and save request timeouts remain 30
  seconds. The final desktop/mobile/dark browser harness passed, including a
  high-contrast dark-mode close control.

The reviewed work-order `10658` also received one bounded metadata correction
after a fresh BlueFolder read showed its authoritative source site had changed
to Lathrop. Ten allowlisted association/bookkeeping fields now point to source
Client `AIS89914`; Work Order Add resolves that source to the canonical Lathrop
inventory Client `AIS25097` and Interior Machine `AIS12954`. Four Client/Machine
control documents were unchanged, and there were no item or item-history
writes. This is not a merge of warehouse Client records and is not a claim that
other historical work-order metadata was rewritten.

## Safety and verification

Before production changes, a complete Firestore-only backup captured 187,637
documents across 1,023 collection paths (1,797,824,111 bytes). Its data SHA-256
is `a13848f036432e573a5454345149bef7d9d6bd15cbbb88931991044ba95ec068`
and manifest SHA-256 is
`7a985e323e116c337ad3ce6e7aa5c08c91031eb9b5aebc1b8a57aae7b8c9b367`.
Storage and Authentication were not included or modified.

Read-only live checks proved all four warehouse-source mappings against six
actual Client/Machine documents and synthetic, non-persisted work orders. A
separate check proved the corrected `10658` source resolves to the canonical
Lathrop inventory endpoint while an unrelated selected-equipment control stays
blocked. Firestore rules inspection proved operation subcollections remain
server-only.

The focused source/route/service/UI/scanner/rules/repair suite passed 141 of
141 tests. The real Playwright interaction harness passed one of one with
mocked authentication, scanner, inventory, and Slack responses and no external
network access. It covers save-popup isolation, zero Slack calls before opt-in,
No/close, sequential canonical expansion, duplicate-click suppression,
failed-only retry, uncertain status checks, responsive desktop/mobile layout,
and dark mode. Deployment verification must not create inventory movements or
post to live Slack.

The exact compiled artifact passed 21 of 21 backend/dependency tests and was
independently byte-audited as 490 files: 483 baseline files retained, seven
additions, no deletions, 127 pre-existing static assets unchanged, and 60 of 66
modified files limited to reversible build metadata. A separate compiled UI
gate executed the actual module `60992` with React and React-Bootstrap. Its
intra-factory scope proof showed that all 75 statements before and all 18
statements after the Work Order Add region preserve AST shape, literals,
property names, and identifier-reference topology; the host main-search export
retains all 2,514 identifier relationships. Only the modal binding crosses the
reviewed region boundary.

## Website deployment

The exact starting point is active revision `nextserverwest-00061-rej`, source
generation `1790369259300423`, archive SHA-256
`075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77`,
and runtime-configuration SHA-256
`de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.
The nine reviewed source snapshots and their hashes are recorded in
`candidate/website/receipts/frozen-inputs.json`.

The production workspace also contains reviewed overlays and unrelated local
changes, so the deploy is an exact, guarded overlay on the retained 00061
archive. An isolated build is only a compiler oracle. Composition must prove
that only reviewed client factories/CSS, warehouse server factories, the new
Slack route/shared sender, and necessary reversible manifests/assets differ;
all other baseline files must remain byte-identical. The final composition,
package, deployment, and live-verification receipts are included beside the
guarded tools. This Git record preserves reviewed source and provenance; it is
not a full source rebuild equivalent.

One guarded source-only apply deployed artifact SHA-256
`6f935144fd33c757f85f3083025b4be3a8564a45f69465fd7137dddca0124378`.
Production is ACTIVE at revision `nextserverwest-00062-zaf`, source generation
`1790375521464078`, build ID `wo-warehouse-slack-b13cffa6e1541257`, with the
captured runtime-configuration hash unchanged. Both the deployment owner and an
independent read-only verifier confirmed the exact live page/CSS hashes and the
new route method/auth rejection gates (`405`/`401`). The deployment owner also
confirmed health 200 and the legacy Slack method gate. Verification made no
authenticated application request and performed no database, Slack, or
BlueFolder write. No real Slack acceptance post was sent.

## Interrupted record resumed September 28

The September 25 deployment completed before a helper-agent authentication
failure interrupted the Git commit/tag/push. Resuming the record did not
redeploy the website or repeat any data correction. A fresh September 28
read-only check confirmed the same ACTIVE revision, exact live archive,
unchanged configuration, page/CSS hashes, health 200, and all five anonymous
method/authentication gates. The original 187,637-document Firestore backup
was revalidated locally with its original byte count and SHA-256 intact.
See `candidate/website/receipts/live-recheck-20260928.json` for the new check;
the September 25 receipts remain unchanged.

## Rollback boundaries

Website rollback is source/config only. The exact external 00061 archive is
retained at
`C:\Users\mack2\Desktop\code\tmp\work-order-warehouse-slack-20260925\deployment\source.zip`
with SHA-256
`075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77`.
Run the frozen `rollback.cjs` without `--apply`, obtain explicit authorization,
then use `--apply` and poll with `rollback.cjs --status`, which verifies the
exact baseline archive and captured configuration. Follow with baseline-specific
public health/page checks. Do not run this release's candidate `verify-live.cjs`
after rollback: it intentionally requires revision 00062, the new archive, and
the new assets, so it must fail against restored 00061. The rollback guard must
refuse a later unreviewed deployment. The archive is intentionally excluded
from Git, so rebuilding this branch is not a valid production rollback.

There is no automatic database rollback. Reversing the `10658` association
would require a separately reviewed field-level repair from protected
preimages while preserving later legitimate activity; do not restore the full
database merely to reverse this release. Slack receipts and inventory history
are durable audit records and must not be deleted as a code rollback shortcut.

Raw database documents, preimages, full backups, BlueFolder XML/responses,
production ZIPs, compiled chunks, credentials, environment files, build logs,
scanner/listener runtime state, and unrelated dirty-workspace files are
excluded. Included JSON files are bounded, sanitized receipts or hash-only
inventories.
