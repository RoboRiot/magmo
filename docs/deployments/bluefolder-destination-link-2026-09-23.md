# BlueFolder destination-link deployment — 2026-09-23

Production is running listener version
`2026.09.23-bluefolder-destination-link.1`, source SHA-256
`447AC477BA9D505F09333D13C1E3C0376DAF17C4E4B594054AD6324AE9AD9729`.

The listener now carries BlueFolder customer, customer-location, name, and
address identity through the Slack-free `work_order.imported` request. Magmo's
existing exact-ID resolver owns Client selection, preserves manual destinations,
and fails closed for missing or ambiguous identities.

Verification completed:

- 47 server listener and Dispatch-format tests passed.
- 31 Magmo import/link/migration tests passed.
- The complete pre-change Firestore backup contains 184,259 documents across
  969 collection paths and verified with SHA-256
  `3e076b8a14c57f0bc56550b50c30de6723b4d1b51b7649e8b2db84b33226de08`.
- 56 unlinked work orders were repaired through two hash-bound plans and exact
  preimages; zero Client documents were changed.
- All 56 now serialize as `destinationLinked: true` in Work Order Add.
- A final full live audit found zero remaining uniquely resolvable unlinked work
  orders. Records with no safe unique Client match remain untouched.
- Listener health, BlueFolder polling, all prior thread checkpoints, and the
  separate command-report worker were verified after deployment.

Rollback references:

- Baseline tag: `bluefolder-listener-prod-20260922`
- Release tag: `bluefolder-listener-destination-link-20260923`
- Baseline commit: `0d053d1`
- Release commit: `d958466`

The server deployment also retains its dated source/state snapshot. Only the
source should be restored during a listener rollback; runtime state, cursors,
and checkpoints must not be rewound. Database plans have separate hash-bound
preimages and passed restore preflight immediately after apply.
