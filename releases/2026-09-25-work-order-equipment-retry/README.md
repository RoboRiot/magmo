# Work-order equipment retry release — 2026-09-25

This is the scoped recovery and rollback record for the Prohealth Torrance
Espree link and future BlueFolder equipment-resolution retries. It is not a
claim that every legacy work order has been repaired, and it is not a clean
full-source reconstruction of the currently deployed website.

## Outcome

- Website revision `nextserverwest-00059-vak` is active. Work order `10677`
  reads as client `AIS79109`, machine `AIS32820`, and a resolved equipment
  destination when evaluated by the deployed helper. Work order `10659` still
  carries trailer `AIS20`.
- The warehouse BlueFolder listener is running
  `2026.09.25-bluefolder-equipment-retry.1`, source SHA-256
  `d9f9fa8c6ef543a9d5062f3a8c2a3cafd043644519aea4b9354d2989e07a148f`.
  It accepts metadata only after Magmo's authoritative response confirms the
  destination, and retries unresolved records with bounded backoff and a fair
  persistent cursor. A single explicit metadata-only, `existingOnly` request
  for `10677` passed against the deployed listener/client and live API: the
  authoritative response returned client `AIS79109`, machine `AIS32820`, and
  `equipmentLinkStatus: resolved`. Only four import bookkeeping timestamps and
  fingerprints changed; workflow, assets, history, and inventory movement were
  unchanged. The normal daemon's backlog-driven `10677` marker was still
  pending, so this record does not misstate that explicit smoke as a normal
  scheduler acknowledgement.
- The reviewed data repair linked machine `AIS32820` and work orders `9837`,
  `10456`, and `10677` to BlueFolder equipment
  `09859C69-CD50-4277-BB40-60A696300768`. No inventory item or inventory
  history document was changed.

The post-repair coverage audit still has 282 active unresolved work orders
across 117 selected equipment IDs. Those are legacy review cases with missing
or conflicting evidence, not a safe bulk-link queue. This release deliberately
does not guess their destinations.

## Website scope and the known source gap

The website deployment started from the exact verified production archive for
revision `nextserverwest-00058-mex`. It overlaid only
`machine-link/workOrderMachineLink.cjs` and compiled chunk `8806.js`, preserving
all 482 files, the runtime configuration, the nested-site helper, and build ID
`wo-machine-link-31372590b5701129`. The exact deployed artifact is
`f12adcb6fa2a4abcbd7c3de24671dcdeae9bb48924b452450026188d1b7d9427`.

`candidate/website/source/lib/ops/workOrders.js` is the complete current source
snapshot used to explain and test the overlay. The raw `workOrders.js` source
for revision 00058 was never retained; only its composition-time SHA-256
`70d8f9509ff5f3488a0ebc1f36273d025a1eeecfb9348f6502e31b7c208917e2`
exists. Do not treat this branch, the source snapshot, or the dirty root tree as
a byte-equivalent full rebuild of production. The compiled production overlay
and its receipts are authoritative.

## Data safety

The verified Firestore-only backup completed at
`2026-09-25T18:17:24.318Z`: 187,230 documents across 1,013 collection paths,
SHA-256 `20da9d404076d4cfa17f0e6a8743a29a235906ee9de221a22aca5ad758ef7495`.
The repair changed exactly four documents. Independent post-apply comparison
proved every changed document equals its preimage plus its allowlisted patch;
the Torrance client, item `AIS23663`, that item's WorkOrderAddHistory, and its
operation record retained identical data and update times. Controls `10659`
and `10664` also retained their prior destinations.

Raw database records, preimages, the 1.8 GB backup, credentials, listener state,
logs, locks, and production ZIPs are intentionally excluded from Git. The
sanitized facts are in `candidate/receipts/`.

## Rollback boundaries

Website rollback must use the externally retained full archive
`C:\Users\mack2\Desktop\code\tmp\work-order-equipment-link-20260925\source.zip`
with SHA-256
`1f3ef2ce160bf1ec0f8d391942799f85f4a266e64b7782453cf616ce27b69e87`.
Run the guarded website rollback tool first without `--apply`, then with
`--apply` only after explicit authorization, and verify the resulting revision.
Rebuilding this Git branch is not a valid website rollback.

Listener rollback is source-only. Use the dated server backup recorded in the
listener deployment receipt and the guarded rollback tool. It restores the
exact baseline source, restarts only the managed listener, and verifies a fresh
heartbeat and preserved checkpoints. It does not restore listener state,
environment files, other worker processes, or the database.

There is no automatic database rollback. If the four-document repair ever
needs reversal, perform a new reviewed field-level repair from the verified
preimages while preserving concurrent changes. Inventory and history were not
changed and must not be rolled back.

## Verification evidence

- 117 source, inventory, and repair tests passed.
- 47 exact compiled-artifact tests passed across all 482 ZIP entries.
- 95 listener module tests plus 12 AST formatting tests passed locally and in
  server staging.
- The website live check, all 12 listener runtime checks, the single explicit
  metadata-only `10677` smoke, and independent post-repair verification passed.

See `candidate-manifest.json` and the component receipts for exact identities,
hashes, and exclusions.
