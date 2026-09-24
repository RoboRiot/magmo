# Work-order trailer and machine linkage — 2026-09-24

This is a narrowly scoped follow-up to the same-day selected-machine release. When selected BlueFolder equipment resolves to a Magmo machine, the importer now also follows its verified trailer relationship. A work order receives the client, trailer, and machine together; Work Order Add already propagates all three to either the From or Current branch and preserves the previous item configuration in history.

The resolver uses typed `Machine.trailerId` / `Machine.trailer` declarations and exact reverse trailer-to-machine references. All nonempty relationship aliases must agree, the trailer must be live, and both machine and trailer must belong to the resolved client. Missing, duplicate, archived, cross-collection, or conflicting relationships fail closed without silently saving a machine-only destination. Standalone machines remain supported, and existing manual work-order asset selections are preserved. Trailer identity is never inferred from a model name or title.

## Exact deployment scope

The baseline is production revision `nextserverwest-00056-xum`, source generation `1790273787945297`, archive SHA-256 `b94cc8e088e28afe5af8c09421d2e63fca14898816a5c74b54041e3e362f5ce2`.

Only `machine-link/workOrderMachineLink.cjs` changes inside the deployed archive. The remaining 480 files, browser assets, build ID, API routes, inventory movement implementation, scanner bridge, label printing, BlueFolder listener, and existing CLOSED-status synchronization are unchanged. This is not a rebuild from the dirty development working tree or from an older GitHub branch.

The helper changes from SHA-256 `76807bc038a62aba5ed9145368c31daa7b89c2c9942d125f764c90b0ae6d869d` to `e4527fcc0747fe265da22f24fa00134c57e6ac37a456b77ca3b26ef5d00def76`. The reviewed 481-file candidate archive is `c9d419b251b2669fd255a2caadaf2fd2a9fabeb7fd7c13d266c8bbfde74f5c4e`. Its 78 executable artifact checks include the actual compiled importer, trailer matching, scanner safeguards, both inventory movement directions, and unchanged-file verification.

Production is verified ACTIVE on revision `nextserverwest-00057-lip`, source generation `1790276173369344`. The deployment completed at `2026-09-24T19:00:28.725Z`; read-only live verification passed at `2026-09-24T19:00:38.766Z`. The deployed archive checksum matches the reviewed candidate, and unrelated runtime configuration was preserved. See `receipts/deployment-receipt.json` and `receipts/live-verification.json`.

Live checks confirmed work order 10659 has the intended client/trailer/machine chain, work order 10664 retains its prior machine link, health and import schemas remain intact, CLOSED-status synchronization is unchanged, scanner routes still require authentication, and the browser build ID is unchanged. No synthetic production item movement, BlueFolder write, or Slack write was performed during verification.

## Reviewed work-order correction

Work order **10659** was linked to client **AIS78594** (Prohealth — North Hollywood), trailer **AIS20**, and machine **AIS82553**. The user confirmed the trailer identity. BlueFolder's equipment label contains the older **12X** name, while the local trailer and machine retain **HDxt 23x**. The repair persists the reviewed immutable equipment ID; it does not rename the machine, change its model, or relocate it.

The guarded transaction changed only the reviewed BlueFolder equipment mapping on `Machine/AIS82553` and the missing work-order destination fields on `OpsWorkOrders/10659`, plus an idempotent repair receipt. **Zero inventory items were modified.** The client and trailer records, local names/models/locations, work-order workflow, existing histories, and movement evidence were retained. An independent comparison checked four documents and 163 top-level fields with no unexpected changes.

Before that transaction, the complete same-day Firestore backup was verified, and fresh preimages were captured for both mutation targets plus the linked client/trailer records. The full backup completed at `2026-09-24T18:13:39.634Z`, covers 185,801 documents across 989 collection paths, and has data checksum `edfbe0c1de56457273185dd9b2d2080f0f05126223b0a2ebfe683185fd59c004`. Secured operational storage retains the full backup and fresh repair preimages; neither belongs in GitHub.

## Repository contents

- `source/` contains the exact allowlisted helper source, not a complete website checkout.
- `tests/` preserves matcher/import/movement tests and the seven-case reviewed repair validator suite.
- `scripts/` contains only the guarded, default-dry-run repair source. Its fixed identifier allowlist is code, not a data export.
- `tools/` contains source-only snapshot, composition, package, deployment, verification, and rollback tooling. These archival copies assume restoration to their original repository-relative locations in a compatible authenticated working checkout. Existing deployment credentials and the separately secured baseline archive are required; no credentials are included here.
- `baseline.json`, `composition-report.json`, and sanitized `receipts/` record deployment identity, hashes, counts, and verification outcomes without exporting database documents.

No raw database documents, preimages, planned patches, production archives, runtime state, environment files, or credentials are included.

## Rollback

The source-record baseline is commit `7dc544bb09a182bbe4783ad34c34f743b6d13ba2`, tagged `pre-work-order-trailer-link-20260924`. This tag preserves the preceding release record; it is not a standalone production build.

Application rollback must use the exact retained baseline archive and a guarded source-only Cloud Function update, preserving runtime configuration and verifying the deployed source checksum. Do not rebuild the older Git branch or reset the development working tree. This helper-only rollback needs no listener, scanner-server, or label-printing changes.

Database rollback is a separate reviewed operation. Use the dated preimages and receipt, compare for subsequent edits, and restore only the allowlisted fields if still appropriate. Do not roll back whole collections or erase later item history. Rolling back the application does not require undoing the correct, user-reviewed work-order mapping.
