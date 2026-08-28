# Storage-unit scanner session handoff

This document is the HTTP and security contract between Magmo and the single
warehouse scanner process. The browser never receives either scanner secret.
Scans are staged only; `Test` and `StorageUnits` are not changed until the user
confirms through the separate placement endpoint.

## Required environment

Server-only variables:

| Variable | Requirement |
| --- | --- |
| `STORAGE_SCAN_ENABLED` | Must be exactly `true` to start or signal scanner sessions. This Magmo production release sets it to `true`; use `false` only as the emergency kill switch. |
| `STORAGE_SCAN_BRIDGE_TOKEN` | At least 32 characters. Shared only by Magmo and the warehouse bridge; used as the Bearer credential on start/stop. This is not the callback token. |
| `STORAGE_SCAN_CALLBACK_BASE_URL` | Public Magmo origin, with no path; HTTPS is required in production. Canonical value: `https://magmo.cloud`. |
| `STORAGE_SCAN_START_URL` | Optional exact bridge start URL. Example: `https://scanner.example/storage-scan/start`. Required when an explicitly enabled test/staging environment is used. |
| `STORAGE_SCAN_STOP_URL` | Optional exact bridge stop URL. Example: `https://scanner.example/storage-scan/stop`. Required when an explicitly enabled test/staging environment is used. |
| `NGROK_BASE_URL` | Existing production bridge base. When exact URLs are absent, Magmo derives `/storage-scan/start` and `/storage-scan/stop`. Never inherited by test/staging scanner controls. |
| `STORAGE_SCAN_LOCAL_BASE_URL` | Development-only loopback base. Defaults to `http://127.0.0.1:5000`; it is never tried in production. |
| `STORAGE_SCAN_SESSION_TTL_SECONDS` | Optional session TTL; clamped to 60–900 seconds, default 300. |
| `OPS_ENVIRONMENT` | `test`, `testing`, or `staging` forces isolated exact start/stop URLs and a bridge token; shared `NGROK_BASE_URL` is ignored. |

Do not put either token in a URL, browser response, Firestore client-readable
document, or log. Production/test deploy configuration must keep all
`STORAGE_SCAN_*` values isolated. Firestore client rules must deny direct reads
and writes for both `StorageUnitScanSessions` and `StorageUnitScanControls`,
including exclusions in any overlapping catch-all rule.

The production bridge token has already been generated under
`STORAGE_SCAN_BRIDGE_TOKEN` in the ignored local file
`C:\Users\mack2\Desktop\code\.env.local`. Configure the warehouse scanner
service with that exact value through its own private environment. Never commit
the value, paste it into this document, or print it in bridge/Magmo logs.

## Browser-to-Magmo API

All browser calls require `Authorization: Bearer <Firebase ID token>`. The token
must represent a verified, non-revoked `@advancedimagingparts.com` user. Status,
cancel, and confirm are restricted to the session's creator UID. Responses set
`Cache-Control: no-store`.

### Start

`POST /api/storage-units/scan-sessions`

```json
{ "unitId": "P65" }
```

No other request keys are accepted. The storage unit must already exist. Magmo
acquires the singleton scanner lease, creates a 60–900 second session, and then
signals the bridge. Only one unexpired session can own the scanner.

```json
{
  "ok": true,
  "session": {
    "id": "2cY7Hm_Iw0O-bVnE4mZ9jW7q",
    "sessionId": "2cY7Hm_Iw0O-bVnE4mZ9jW7q",
    "status": "active",
    "unitId": "P65",
    "unitType": "pallet",
    "unitNumber": 65,
    "expiresAt": "2026-08-27T18:05:00.000Z",
    "eventCount": 0,
    "pollAfterMs": 1500,
    "events": []
  },
  "events": []
}
```

Success is HTTP 201. Typical failures are 400 invalid unit, 401/403 auth, 404
missing unit, 409 scanner busy, 502 bridge failure, or 503 disabled/misconfigured.

### Poll status

`GET /api/storage-units/scan-sessions/{sessionId}`

```json
{
  "ok": true,
  "session": {
    "sessionId": "2cY7Hm_Iw0O-bVnE4mZ9jW7q",
    "status": "active",
    "unitId": "P65",
    "expiresAt": "2026-08-27T18:05:00.000Z",
    "eventCount": 1,
    "pollAfterMs": 1500,
    "events": [
      {
        "eventId": "warehouse-reader-1:000047",
        "code": "AIS17704",
        "scannedAt": "2026-08-27T18:01:12.000Z",
        "receivedAt": "2026-08-27T18:01:12.181Z",
        "status": "resolved",
        "kind": "item",
        "itemId": "AIS17704",
        "message": "Item ready to stage."
      }
    ]
  },
  "events": ["same event objects as session.events"]
}
```

Only allow-listed metadata is serialized. In particular, responses never expose
`callbackTokenHash`, a callback token, `STORAGE_SCAN_BRIDGE_TOKEN`, or internal
bridge session identifiers. Event snapshots are deterministic previews; confirm
must re-read and revalidate canonical records transactionally.

### Cancel

`POST /api/storage-units/scan-sessions/{sessionId}/cancel`

```json
{}
```

Cancellation commits `status=cancelled`, releases the lease only if the lease is
still owned by this session, and sends an explicit bridge stop. It is idempotent.
HTTP 200 means stop was acknowledged. HTTP 502 with a `cancelled` session means
the server-side cancellation committed but the physical bridge did not
acknowledge stop; retrying cancel sends stop again.

### Confirm

`POST /api/storage-units/scan-sessions/{sessionId}/confirm`

```json
{ "eventIds": ["warehouse-reader-1:000047"] }
```

The confirmation implementation owns all inventory mutation. It must re-read
the selected event documents, re-resolve each canonical item/bin in the same
transaction, apply placement history, set `status=confirmed`, and conditionally
release the scanner lease. After the transaction commits, it calls the exported
stop helper:

```js
const {
  signalStorageScanStop,
} = require("../lib/inventory/storageUnitScanSessions.cjs");

await signalStorageScanStop({
  sessionId,
  unitId,
  reason: "confirmed",
});
```

A stop failure must be reported and remain retryable, but must not roll back an
already committed placement transaction.

## Warehouse bridge API

The public bridge must reject start/stop unless this header matches its locally
configured `STORAGE_SCAN_BRIDGE_TOKEN` using a timing-safe comparison:

```http
Authorization: Bearer <STORAGE_SCAN_BRIDGE_TOKEN>
Content-Type: application/json
```

### Start signal

`POST /storage-scan/start`

```json
{
  "schemaVersion": 1,
  "sessionId": "2cY7Hm_Iw0O-bVnE4mZ9jW7q",
  "target": { "unitId": "P65", "type": "pallet", "number": 65 },
  "callback": {
    "url": "https://magmo.cloud/api/storage-units/scan-sessions/2cY7Hm_Iw0O-bVnE4mZ9jW7q/events",
    "bearerToken": "one-time-per-session-capability",
    "expiresAt": "2026-08-27T18:05:00.000Z"
  }
}
```

The bridge may return:

```json
{ "ok": true, "sessionId": "local-scanner-session-42" }
```

Start must be idempotent for the same Magmo `sessionId`. If another session owns
the one global keyboard/scanner hook, return HTTP 409 without changing it. Never
log the body because it contains the callback capability.

### Stop signal

`POST /storage-scan/stop`

```json
{
  "schemaVersion": 1,
  "sessionId": "2cY7Hm_Iw0O-bVnE4mZ9jW7q",
  "unitId": "P65",
  "reason": "cancelled"
}
```

`reason` is `cancelled`, `confirmed`, `expired`, or `failed`. Stop must be
idempotent when the same session is already stopped. A late stop for session A
must never stop a newer active session B; return HTTP 409 and leave B running.

## Bridge-to-Magmo event callback

The bridge posts every completed scan to the callback URL supplied by start:

```http
POST /api/storage-units/scan-sessions/{sessionId}/events
Authorization: Bearer <per-session callback bearerToken>
Content-Type: application/json
```

```json
{
  "eventId": "warehouse-reader-1:000047",
  "code": "AIS17704",
  "scannedAt": "2026-08-27T18:01:12.000Z"
}
```

Only those three keys are accepted. Session IDs match
`[A-Za-z0-9_-]{20,80}`. Event IDs match
`[A-Za-z0-9][A-Za-z0-9._:-]{0,127}`. Codes are at most 180 characters and may
not contain control characters, `/`, or `\\`. `scannedAt` is optional; when
provided it must be within the preceding 24 hours or next five minutes.

- HTTP 202: newly staged event.
- HTTP 200 with `duplicate=true`: identical retry of an existing `eventId`.
- HTTP 409: same `eventId` reused for different data, session closed, or event cap reached.
- HTTP 410: token/session TTL expired.
- HTTP 401: wrong callback capability.

Retries must retain exactly the same `eventId` and `code`. Magmo hashes the
event ID for its Firestore document path and transactionally stores it once.
The per-session bearer is stored only as SHA-256 in Firestore and is verified
with a timing-safe comparison on every callback.

## Warehouse process requirements

The existing `warehouse_scanner.py` is a continuous global keyboard hook that
opens URLs and has no session API. Do not run it alongside the session-aware
bridge. The replacement process must be the only owner of the keyboard/scanner
hook and must:

1. Start capture only after an authenticated start signal.
2. Disable arbitrary URL launching while a Scan In session is active.
3. Enforce the session expiry locally and clear the callback token on stop.
4. Cap scan length/rate and avoid logging raw codes or callback bodies.
5. Generate stable, unique event IDs and retry callbacks with the same ID.
6. Reject a second session while one is active.
7. Apply stop only when `sessionId` matches the active session.
8. Run without Firebase Admin credentials or service-account key files.

The warehouse bridge is not implemented by the Magmo API routes. The Magmo
route is enabled in this release so it will work as soon as the session-aware
warehouse endpoints are installed; until then, the legacy bridge will reject
the new paths and Magmo will fail safely. Do not expose `/storage-scan/start` or
`/storage-scan/stop` publicly until their Bearer validation, single-session
locking, and callback handling are installed. `STORAGE_SCAN_ENABLED=false` is
the emergency server-side kill switch.
