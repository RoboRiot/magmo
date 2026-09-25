# Work-order site-only recovery release — 2026-09-25

This is the scoped source, deployment, data-repair, verification, and rollback
record for the recent BlueFolder work-order destination recovery. It is not a
claim that every legacy work order has been linked, and it is not a complete
rebuild of the production website.

## Outcome

- Work order `10658` now resolves to the existing Magmo client `AIS94688`
  (`AIS - Lake Forest`). BlueFolder selected no equipment, so it correctly has
  no machine or trailer link. Its missing `clientRef` is not a blocker:
  work-order search and inventory movement resolve the canonical `clientId`
  and fetch that Client document; typed references are checked when present.
- Sixteen reviewed recent work orders were connected to existing Clients by a
  transactionally guarded, association-only repair. Nineteen more reviewed
  work orders were recovered through the deployed metadata-only API path; that
  path created exactly fourteen deterministic nested-site Client documents and
  reused them for five additional work orders.
- All 35 repaired work orders now have their reviewed client IDs and retain no
  machine or trailer assignment because BlueFolder supplied no equipment for
  them. No inventory item, item history, work-order workflow, Slack evidence,
  assignment, or calendar data was changed.
- The website is active at `nextserverwest-00060-tod`, and the warehouse
  listener is running `2026.09.25-bluefolder-destination-retry.1`.

The defect was in the listener's bounded recovery lane. It admitted records
only when equipment metadata was present, so a work order with stable
BlueFolder customer and location IDs but omitted equipment fields could retain
a missing client indefinitely. The listener now admits exact customer/site
identity without turning omitted equipment into an explicit empty selection.
Names and titles remain insufficient evidence.

The website adds a separate safety guard. If a missing-client work order
already retains a typed manual machine, trailer, or client reference, a newly
resolved site is accepted only when the live asset relationships agree. A
conflict remains explicitly unresolved; the import does not overwrite the
manual asset or create a partial cross-site destination.

## Bounded remaining review

This release deliberately repaired only the 35 work orders supported by exact
BlueFolder identity and current Magmo directory evidence. The final bounded
review left 149 records unchanged: 95 already had a client association but no
safe asset link, and 54 had no safe client association. Those records need
separate evidence or review; this release does not guess from names, models,
titles, or addresses.

## Website deployment

The source-only website deployment started from the exact verified archive for
revision `nextserverwest-00059-vak`, source generation
`1790360606589691`, SHA-256
`f12adcb6fa2a4abcbd7c3de24671dcdeae9bb48924b452450026188d1b7d9427`.
It overlaid only:

- `machine-link/workOrderMachineLink.cjs`, from
  `c877bd3da2888a27cf48cf46d7d8b503515315d721d4156249477ab9252ca94d`
  to `f8664402bfecd7ebb828fb44729c748671c86aa6aa31a090154a731f26463382`;
- `.next/server/chunks/8806.js`, from
  `432b417ddb8e2c75e720137f4e8775feaa462dc7f56b201a75e474ad3ebebf54`
  to `cf22d28f299e7dbcc0b2ac6c858afa2f6a06e934436a6ea42a27332d4cbb8b4a`.

All 482 archive entries, runtime configuration, nested-site helper, and build
ID `wo-machine-link-31372590b5701129` were otherwise preserved. The deployed
artifact SHA-256 is
`7dbdf5a70f5f4c1e94e1549f191adcef6b1234d4270e4f7d4e10ec6b468db99e`.
The complete current source snapshots are included for explanation and tests,
but this Git record is not a byte-equivalent full production build.

## Data safety and verification

The dated Firestore-only backup completed at
`2026-09-25T19:51:01.336Z`: 187,443 documents across 1,015 collection paths,
1,797,326,062 bytes. Its data SHA-256 is
`661c286a5fd2ab183f4ec89afcd85f7fe8da67aa47dbebf6e6394db69be4374e`
and manifest SHA-256 is
`5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc`.

Independent post-apply verification proved:

- all 16 direct-repair work orders equal their exact preimages plus their
  allowlisted association patches;
- all 19 metadata-recovery work orders changed only allowlisted destination,
  BlueFolder identity, and import-bookkeeping fields;
- exactly 14 reviewed nested-site Clients were created;
- every one of the 243 Client documents present before the 19-record recovery
  was preserved exactly, including all 240 Client documents captured by the
  full backup;
- controls `10658`, `10659`, `10677`, item `AIS23663`, that item's
  WorkOrderAddHistory record, and its inventory operation retained their
  protected data.

Three normal nested-site Clients (`AIS21602`, `AIS66964`, and `AIS89329`) were
created concurrently at 19:36 while the long collection-by-collection backup
was still running and after its Client collection had been scanned. They were
already present before this bounded recovery and were preserved exactly; they
were not counted among its 14 creations.

Verification totals were 149 source and repair regression tests, 63 exact
compiled-artifact tests across all 482 ZIP entries, six bounded-recovery guard
tests, and 117 listener tests locally and in server staging. Live checks
confirmed the exact website archive, revision, health endpoint, reviewed
work-order destinations, listener source/version, fresh heartbeat and poll,
582 preserved checkpoints, and unchanged command-worker PIDs. The authenticated
browser scanner route was not invoked; destination verification used the live
artifact plus read-only Firestore and helper checks.

## Rollback boundaries

Website rollback is source-only. It must use the externally retained full
revision-00059 archive at
`C:\Users\mack2\Desktop\code\tmp\work-order-existing-asset-site-guard-20260925\source.zip`
with SHA-256
`f12adcb6fa2a4abcbd7c3de24671dcdeae9bb48924b452450026188d1b7d9427`.
Run the guarded `rollback.cjs` in that external frozen directory first without
`--apply`, then with `--apply` only after explicit authorization; use
`--status` to verify the submitted operation. It restores the exact 00059
source while preserving runtime configuration and does not touch Firestore.
The archive is intentionally absent from Git, so rebuilding this branch is not
a valid website rollback.

Listener rollback is also source-only. On the warehouse server, first run
`rollback-listener.ps1 -BackupPath
C:\Users\Owner\Desktop\warehouse\.warehouse_runtime\deployments\work-order-site-only-retry-20260925\backup-20260925T200300Z`
without `-Apply`; after explicit authorization add `-Apply`. The guard restores
only the exact baseline source SHA
`d9f9fa8c6ef543a9d5062f3a8c2a3cafd043644519aea4b9354d2989e07a148f`,
restarts the managed listener, and verifies fresh health and non-regressing
checkpoints. It does not restore listener state, environment files, unrelated
workers, or the database.

There is no automatic database rollback. Any future reversal must be a new,
reviewed field-level repair from the verified preimages while preserving
concurrent changes. Do not restore the full database merely to reverse these
associations.

Raw database records, preimages, full backups, production ZIPs, compiled
chunks, credentials, environment files, listener state, logs, and locks are
excluded from Git. The included JSON files are sanitized receipts and bounded
review summaries.
