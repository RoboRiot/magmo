# Deployment and verification record

This record contains operational checksums and aggregate results only. It does not include database records, credentials, listener runtime state, or repair preimages.

## Verified backup and data correction

- A full recursive Firestore backup completed at `2026-09-24T18:13:39.634Z` before the repair: **185,801 documents across 989 collection paths**.
- Backup JSONL SHA-256: `edfbe0c1de56457273185dd9b2d2080f0f05126223b0a2ebfe683185fd59c004`.
- The backup was reverified for completeness, checksum, byte count, and document count. It covers Firestore documents and subcollections, not Cloud Storage object contents or Firebase Authentication accounts; neither of those services was modified by this repair.
- The guarded correction committed at `2026-09-24T18:14:21.814Z`: 5 reviewed immutable equipment-ID mappings, 9 work-order machine links, and 2 previously scanned inventory-item machine associations.
- Independent verification at `2026-09-24T18:14:32.379Z` compared 26 documents and found **zero unexpected field differences**. Prior history prefixes, movement dates, work-order assignments, original operation receipts, and the separately protected manually corrected item were preserved. Both repaired items had exactly one canonical backlink on the destination machine.
- Repair plan SHA-256: `e2559a57c85d3f20de59f90edb943436be0483954d34aa908584ad01c5fbd1bc`. The plan, per-document preimages, and verification details remain outside Git in secured dated operational artifacts.

## Reviewed application artifacts

- Pre-release listener SHA-256: `2aa035388dc7ab025d3c0db75ba9e8471e8cf17716d897f356192c7b0a2b1019`.
- Candidate listener SHA-256: `81df567ea140cba4551b3b205c1cf9ac151df6cee24982b1275cec1a9426bccc`.
- Exact website artifact SHA-256: `b94cc8e088e28afe5af8c09421d2e63fca14898816a5c74b54041e3e362f5ce2`.
- Packaging gates verified 481 archive entries and 60 exact-artifact checks. Production source inputs and unrelated archive content were independently hash checked.
- The source baseline is commit `fbf28d0`, tagged locally as `rollback-work-order-machine-link-20260924`; the candidate source snapshot is commit `c4b5fa4`.

## Production completion

Both production updates are complete and independently verified.

- The website/API deployed at `2026-09-24T18:19:31.569Z` as revision `nextserverwest-00056-xum`, replacing `nextserverwest-00055-yom` with the exact reviewed artifact. Unrelated runtime/build configuration remained unchanged.
- Live verification at `2026-09-24T18:19:45.001Z` confirmed API version/capability `2026-09-24.1`, the extended equipment identity schema, the new browser asset and build identity, and the repaired destination's machine link. A deliberately malformed authenticated request was rejected before database access, and unauthenticated options/confirmation/scanner requests remained blocked. The prior status-only close synchronization capability remained intact.
- The warehouse listener was installed at `2026-09-24T18:20:20.2153981Z`; a fresh SSH verification at `2026-09-24T18:20:29.6107051Z` confirmed healthy version `2026.09.24-bluefolder-machine-link.1`, exact source SHA-256, and a current heartbeat. All 570 existing thread checkpoints were retained, runtime state was not overwritten, and unrelated command workers were unchanged.
- At that verification, 6 equipment metadata refreshes had completed with 0 pending equipment refreshes and 0 pending imports. The historical close baseline remained preserved.
- Verification totals: **207 source tests, 60 exact website-artifact checks, and 92 listener tests on the server**. No successful test inventory movement, Slack write, or BlueFolder write was used to probe production.

The sanitized evidence is recorded in `receipts/deployment-summary.json`, `receipts/website-deployment.json`, and `receipts/website-live-verification.json`. These receipts retain hashes, revisions, aggregate checks, and explicitly reviewed record identifiers, not exported database documents or listener runtime state.

The final release commit is tagged `deployed-work-order-machine-link-20260924`; `rollback-work-order-machine-link-20260924` retains the preceding listener baseline. Website and data rollback still require their separately retained dated operational artifacts as described in `README.md`.
