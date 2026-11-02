# Smart Camera reliability — 2026-11-02

Magmo published build `smart-camera-reliability-ed8af4ad1980c779` as revision `nextserverwest-00100-guf`. The archive SHA-256 is `19baa03470ad8e14664f0bfb20d658cd78441232123161569a2f6412fb7b861b`. The critical deployment validator recorded `VERIFIED` at 20:50 UTC on November 2 after real signed-in checks of Main List, Ops Admin and Ops General. All three loaded data and passed read-only interactions with zero captured browser errors.

Live Analyze matched an original catalog photo to its existing item with no name or part-number hint. Both comparison photos appeared. Applying the result filled the name and part number in an unsaved form and left the serial blank. Independent final database readback found 4,251 active items and 4,251 matching indexes, confirmed 317 orphan index deletions, and found zero discrepancies.

The checkpoint branch is `codex/smart-camera-reliability-20261102`, created from `e40ae499`. Only this dated release directory may change in the checkpoint checkout. The root application source and previous release records remain unchanged.

## Intended scope

- Analyze checks hashes of the submitted original photos and the two supported approved-photo representations before using a model. A deterministic match requires a current Storage object generation, an active inventory record without an archive reservation, coverage of every submitted photo, and an unambiguous matching record.
- Text retrieval merges the compact index with direct indexed inventory queries. Current inventory metadata replaces stale index metadata. Query failures are reported as failures rather than an ordinary no-match.
- Weak, invalid, conflicting, and unsupported model comparisons cannot fill fields. Photo changes and superseded requests invalidate earlier results. The comparison modal uses the submitted photo snapshot and validated current catalog photo folders.
- Item saves finish photo uploads before refreshing the Smart Camera index. A saved item with unfinished photos or indexing has a visible retry path using the same inventory ID and storage paths.
- Approved item changes refresh the index and report a partial indexing result without undoing or repeating the approved inventory change.
- The version-checked repair updated `ItemVisionIndex`. The checkpoint records aggregate readback counts and verification hashes.

## Source and artifact provenance

`checkpoint-manifest.json` is the explicit allowlist of source, tests, policy, and composition tools. `source-provenance.json` records all copied paths, sizes, hashes, and their origins. The snapshots contain the final source for the composed API, NewItem, existing-item editor, and approval notice changes. All 12 inputs used by final composition were checked against their recorded hashes.

The production baseline was revision `nextserverwest-00099-nal`, build `item-save-navigation-b6cb4b71af63cae0`. The release overlaid selected compiled functions and preserved unrelated production code and old assets. The composition and package receipts identify the exact changed portions and published artifact.

The sanitized receipts in `candidate/receipts` record package identity, live and local checks, and rollback identity. Complete archives, sensitive data and raw operational evidence remain outside Git.

## Verification

Source and composed API tests use synthetic authentication, Firebase, Storage, and model fixtures. They verify the reported weak-match/index failures without live database mutations or external model calls. Compiled UI fixtures exercise the actual selected callbacks and rendered modal expressions. These are local preflight evidence only.

The preflight receipt records synthetic full-page checks of the exact candidate. The separate postflight receipt records the live critical pages, assets, interactions and evidence hashes. The final regression receipt records 112 passing tests with zero skipped, including two test-only changes that support checkouts without local release fixtures. Run `node verify-checkpoint.cjs` from this directory to verify all 47 copied file hashes.

## Rollback and publication state

The exact production baseline archive is retained outside Git. Its hash and source generation are recorded in `candidate/receipts/baseline-rollback-identity.json`; the final candidate identity is recorded in the package receipt summary. Do not treat the older root checkout application or a historical release folder as this release's rollback artifact. A later production deployment requires a fresh baseline review and the critical policy gates before rollback.

The Git history identifies the published checkpoint commit. The deployment journal hash and postflight summary identify the production release independently.
