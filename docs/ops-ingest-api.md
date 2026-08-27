# Magmo Ops ingest API

The authenticated Ops ingest endpoint is `POST /api/ops/ingest`. Its machine-readable OpenAPI 3.1 contract is published at `/api/ops/openapi`; safe runtime capabilities are published at `/api/ops/health`.

## Authentication and isolation

Clients send the credential in `x-ops-ingest-secret`. Credentials belong in an approved secret store and must never appear in source, logs, screenshots, error responses, or test fixtures.

Staging must use a separate Firebase project, a staging-only deploy identity, a staging-only ingest credential, and a non-production Firestore database. The staging environment is additionally forced into `read_only` mode. A staging credential therefore cannot be used against production and cannot write even if it is accidentally sent to staging.

GitHub environments named `staging` and `production` hold the protected deployment values. Configure required reviewers on `production`. The deployment workflow uses short-lived Workload Identity Federation rather than committed service-account keys.

## Command identity and audit history

Every Slack command write includes:

- `source.channel`
- `source.threadTs`
- `commandTs`
- `source.command`
- `actor.id` and/or `actor.name`
- evidence supporting each proposed change

The event type plus the three Slack identity fields form the idempotency key. A replay returns the original saved result with `idempotentReplay: true`. Trailer changes and work-order command events retain the source command, person, evidence, dates, complete before/after state, and exact applied field changes.

Trailer movement requests are atomic. The API validates every trailer and client document inside one Firestore transaction; if any proposal is missing, conflicting, ambiguous, or below the confidence threshold, none of the proposals are written.

## Dispatch receipt

`work_order.command_context` exposes the durable MAGMO Dispatch receipt:

```json
{
  "workOrderId": "10455",
  "dispatchStatus": "posted",
  "slackChannel": "C07EPLKV9JT",
  "slackThreadTs": "1787344750.841629",
  "slackPermalink": "https://advancedimaging.slack.com/archives/C07EPLKV9JT/p1787344750841629",
  "dispatchedAt": "2026-08-21T20:00:00.000Z",
  "dispatchedBy": "manager@example.com"
}
```

For a MAGMO-generated request, this receipt is the durable signal to the Python
server that MAGMO already created the Dispatch root. The root must be in
`C07EPLKV9JT`, begin with the numeric work-order ID, and link to the matching
BlueFolder `srid`. Testing-channel, reply, malformed, and mismatched receipts
fail closed. Neither MAGMO nor the Python server writes dispatch metadata back
to BlueFolder.

Work orders created directly in BlueFolder are a separate path. The standalone
Python BlueFolder listener may create their Dispatch root, after which MAGMO
tracks the Slack root through Ops ingest. The disabled MAGMO web cron must not
race that listener.

## Status handling

- `400`: malformed, invalid, ambiguous, conflicting, or unsupported input. Do not retry unchanged.
- `401`: bad or missing ingest credential.
- `403`: writes are disabled in the selected environment.
- `404`: the referenced Magmo work order, trailer, or client does not exist.
- `409`: the same Slack command is still processing; retry the identical command after a short wait.
- `500`: an unexpected server failure only; retry with the same idempotency key.
- `503`: service configuration or Firestore is temporarily unavailable.

The approximately twenty historical `!done` commands that previously returned 500 were requests for work-order documents no longer present in Magmo. They now receive `work_order_not_found` with the corrective action: sync or recreate the named work order, then retry the original Slack command unchanged.

## Release process

Pull requests run contract tests and a production build. After approval and merge, dispatch **Deploy Ops integration** to staging. The job deploys with writes disabled and verifies the live health and OpenAPI endpoints. Dispatch the same workflow to the protected production environment only after staging verification succeeds.

The deployment verification never calls a write endpoint and never prints a credential.
