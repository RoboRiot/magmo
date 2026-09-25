# Work-order fresh-site proof release — 2026-09-25

This is the scoped source, deployment, data-recovery, verification, and
rollback record for the second phase of the 2026-09-25 work-order destination
recovery. It succeeds, but does not replace, the immutable phase-one record at
commit `45c0fb44ddc19372fa765f33e87ee5249e000e4b`. It is not a claim that every
legacy work order has been linked, and it is not a complete rebuild of the
production website.

## Outcome

- The importer can now obtain fresh BlueFolder customer-location evidence when
  a work order has stable customer and location IDs but the matching Magmo
  parent Client has a stale nested-location cache. The lookup runs outside the
  Firestore transaction and the verified proof is passed only through an
  internal option; request payloads cannot inject it.
- The final transaction rechecks that the work order is still active and
  unlinked, its source IDs have not changed, no manual asset appeared, the
  exact customer root remains unique and active, and no physical-site or alias
  collision exists. Only then may it create one deterministic non-primary
  Client and link the work order. Parent Client metadata is never rewritten.
- Eight reviewed work orders were linked to five exact non-primary sites. Four
  deterministic Client documents were created (`AIS12854`, `AIS26295`,
  `AIS50904`, and `AIS56092`); the already-created exact site `AIS83192` was
  reused. Exactly 264 pre-existing Client documents were preserved byte for
  byte.
- Work orders `10486` and `10676` had no selected equipment and are ready as
  site-only inventory destinations. The other six retain their exact stored
  equipment selections and intentionally remain blocked until a machine can be
  linked from reliable evidence. No machine or trailer was guessed.
- Cumulatively, phase one and phase two repaired 43 recent site links: 37 are
  ready inventory destinations and six are intentionally blocked on missing
  machine links. The current bounded review still contains 46 missing-client
  orders and 101 client-linked orders without a safe machine link. Those 147
  unresolved relationships still require separate review; six of the
  machine-unmapped orders received verified site links in this phase.

The defect was stale directory evidence. The earlier importer could safely
materialize a nested site only when that site was already present in cached
Magmo Client metadata. BlueFolder could return the exact non-primary site while
the cache omitted it, leaving the work order unresolved indefinitely. The new
path performs a bounded, authenticated, exact-ID lookup and fails closed on
timeouts, malformed or oversized responses, redirects, rate limits, inactive
or contradictory customer flags, primary/unknown location flags, incomplete
addresses, duplicate roots, physical duplicates, aliases, or concurrent
association changes. A lookup failure preserves ordinary work-order metadata
intake but performs no Client or association write and remains retryable.

## Website deployment

The source-only deployment started from the exact active phase-one archive for
revision `nextserverwest-00060-tod`, source generation
`1790366275981207`, SHA-256
`7dbdf5a70f5f4c1e94e1549f191adcef6b1234d4270e4f7d4e10ec6b468db99e`.
It changed exactly three archive entries:

- added `machine-link/blueFolderCustomerLookup.cjs` from reviewed source SHA-256
  `3977545bf88b79db793f6f9fdf0fb56dda8a47db9ef2259ae2363737c3f401d3`;
- updated `machine-link/workOrderSiteLink.cjs` from reviewed source SHA-256
  `b60431f15c74d038611f9a6903b9676cc1e4cd14262965203ec7814e25f1230f`;
- updated `.next/server/chunks/8806.js` to SHA-256
  `218a069f424806c8bc455a671de85595f0aa69f2158bc103a29446f9659510fa`.

All 483 archive entries were byte-verified. Runtime configuration, the build
ID, existing machine-link guard, and unrelated files were preserved. The
deployed artifact SHA-256 is
`075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77`.
It is active as `nextserverwest-00061-rej`, source generation
`1790369259300423`, with the unchanged configuration hash
`de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.
The included source snapshots explain and test the overlay; this Git record is
not a byte-equivalent full production build.

The warehouse listener was not changed in this phase. It remains the verified
`2026.09.25-bluefolder-destination-retry.1` source deployed in phase one, with
its state and workers preserved.

## Data safety and verification

The same complete Firestore-only backup taken before phase one protects this
phase: 187,443 documents across 1,015 collection paths and 1,797,326,062
bytes. Its data SHA-256 is
`661c286a5fd2ab183f4ec89afcd85f7fe8da67aa47dbebf6e6394db69be4374e`
and manifest SHA-256 is
`5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc`.

The recovery was an `existingOnly` metadata import. Equipment fields were
omitted from every request so the six stored selections could not be replaced
or cleared. The eight calls ran exactly once; there was no automatic retry,
daemon-state write, Slack write, BlueFolder write, inventory-item write, or
parent-cache write.

On the first transaction that creates a new site for a work order with selected
equipment, the response can transiently report `work_order_client_missing`
because equipment resolution reads the not-yet-committed Client. Exact compiled
tests proved that the same transaction has already committed the correct Client
and work-order link, and a durable read reports
`bluefolder_equipment_not_mapped`. The guarded runner accepted that response
only for planned first creations with selected equipment. In this run the
allowlist and observed set were exactly `10480`, `10516`, and `10648`; the
exception did not apply to site-only or reused-site records, and no second
import was sent.

Independent post-apply verification proved:

- all eight immediate before/after work-order images changed only allowlisted
  association and import-bookkeeping fields;
- all stored equipment fields were byte-identical, and workflow, asset, and
  history fields were untouched by the bounded writes;
- all 264 pre-existing Client documents were byte-identical and the four new
  Clients exactly matched the reviewed BlueFolder proof;
- live work orders, the five leaf Clients, and four parent Clients matched the
  protected after-images;
- six inventory destinations reject movement with a missing-machine error and
  two resolve as site-only destinations;
- the full backup contains all eight work-order preimages with the same reviewed
  equipment selections.

Verification totals include 115 focused source tests, 105 exact compiled
artifact/postcondition tests, 18 bounded-recovery guard tests, and one offline
Python remote-guard test. Live deployment and health verification passed.

Normal operations continued between the full backup and these checks. Later
BlueFolder, Slack shipping-history, message, calendar, and analysis updates
were separately attributed on several phase-one work orders. This release does
not claim those entire documents remained unchanged since the backup and must
not roll back that legitimate activity. The strict immediate preimages prove
the bounded repairs did not cause those changes. The four reviewed parent
Clients, item `AIS23663`, its existing WorkOrderAddHistory entry, and its
inventory operation still match their protected backup evidence; the
`10659`/`10677` destination chains remain intact.

## Rollback boundaries

Website rollback is source-only. It must use the externally retained exact
phase-one archive at
`C:\Users\mack2\Desktop\code\tmp\work-order-fresh-site-proof-20260925\source.zip`
with SHA-256
`7dbdf5a70f5f4c1e94e1549f191adcef6b1234d4270e4f7d4e10ec6b468db99e`.
Run the frozen `rollback.cjs` in that external directory first without
`--apply`, then with `--apply` only after explicit authorization; use
`--status` to verify the operation. It refuses a later unexpected deployment,
restores the exact `nextserverwest-00060-tod` source, preserves runtime
configuration, and does not touch Firestore. The archive is intentionally not
stored in Git, so rebuilding this branch is not a valid website rollback.

No listener rollback is needed because phase two did not change the listener.
There is no automatic database rollback. Any future reversal must be a new,
reviewed field-level repair from the protected preimages while preserving
concurrent legitimate changes; do not restore the full database merely to
reverse these links.

Raw database records, preimages, full backups, BlueFolder XML, production ZIPs,
compiled chunks, credentials, environment files, listener state, logs, and
locks are excluded from Git. The included JSON files are sanitized receipts and
bounded summaries.
