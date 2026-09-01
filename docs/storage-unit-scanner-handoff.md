# Warehouse scanner session handoff

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
| `WORK_ORDER_SCAN_TTL_SECONDS` | Optional Work Order capture TTL; clamped to 60–900 seconds, default 300. |
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

## Work Order Add callback-capture API

Work Order Add uses the same server-owned scanner lease and remote callback
model as storage Scan In. It creates short-lived scan-event documents and the
browser polls the authenticated session status for its staged list. It does not
depend on keyboard-wedge input reaching a focused browser field, so the same
flow supports an exact learned HID device or an explicitly configured
serial/COM scanner. Browser calls require the same verified internal Firebase
Bearer authentication and return `Cache-Control: no-store`.

The browser creates one high-entropy session ID matching
`[A-Za-z0-9_-]{20,80}` and reuses it for retries.

### Start Work Order capture

`POST /api/items/work-order-add/scan-sessions`

```json
{ "sessionId": "work_order_capture_2cY7Hm_Iw0O", "workOrderId": "10490" }
```

No other keys are accepted. Success is HTTP 201 and returns the authoritative
expiry and callback capture mode:

```json
{
  "ok": true,
  "session": {
    "id": "work_order_capture_2cY7Hm_Iw0O",
    "sessionId": "work_order_capture_2cY7Hm_Iw0O",
    "workOrderId": "10490",
    "status": "active",
    "captureMode": "remote-callback",
    "expiresAt": "2026-09-01T17:03:00.000Z",
    "eventCount": 0,
    "pollAfterMs": 1000,
    "bridgeStartStatus": "delivered",
    "bridgeStopStatus": "not_requested",
    "events": []
  }
}
```

Acquire only after a work order and movement direction are selected. A retry
uses the same session ID and work order. Magmo retains the original callback
capability and expiry for an existing active session; the bridge accepts only
an otherwise exact idempotent retry and does not extend the original lease.

### Poll Work Order capture

`GET /api/items/work-order-add/scan-sessions/{sessionId}`

The response has the same public session shape as start and includes completed
events in scan order:

```json
{
  "ok": true,
  "session": {
    "sessionId": "work_order_capture_2cY7Hm_Iw0O",
    "workOrderId": "10490",
    "status": "active",
    "captureMode": "remote-callback",
    "eventCount": 1,
    "pollAfterMs": 1000,
    "events": [
      {
        "eventId": "warehouse-reader-1:000047",
        "code": "AIS17704",
        "scannedAt": "2026-09-01T17:01:12.000Z",
        "receivedAt": "2026-09-01T17:01:12.181Z"
      }
    ]
  },
  "events": ["same event objects as session.events"]
}
```

The browser uses these callback-backed events to populate the Work Order scan
list. The callback token hash and all bridge credentials remain server-only.

### Stop Work Order capture

`POST /api/items/work-order-add/scan-sessions/{sessionId}/stop`

```json
{ "workOrderId": "10490", "reason": "cancelled" }
```

`reason` is `confirmed`, `cancelled`, `expired`, or `failed`. Stop before the
first confirm request, and on explicit cancel, work-order change, hide/unmount,
or terminal failure. Stop is idempotent; the local TTL is the fail-safe for
browser shutdown or lost cleanup requests. A valid stop or local expiry releases
the lease so the next idle scan can open its canonical Magmo page.

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

Start is idempotent only when the Magmo `sessionId`, target, callback URL,
callback capability, and expiry all match the active lease. Reusing the session
ID with different settings, or starting while another session owns the one
global scanner input, returns HTTP 409 without changing the active lease. Never
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

### Work Order capture signals

`POST /work-order-scan/start`

```json
{
  "schemaVersion": 1,
  "sessionId": "work_order_capture_2cY7Hm_Iw0O",
  "target": { "type": "work-order-add", "workOrderId": "10490" },
  "callback": {
    "url": "https://magmo.cloud/api/items/work-order-add/scan-sessions/work_order_capture_2cY7Hm_Iw0O/events",
    "bearerToken": "one-time-per-session-capability",
    "expiresAt": "2026-09-01T17:03:00.000Z"
  }
}
```

`POST /work-order-scan/stop`

```json
{
  "schemaVersion": 1,
  "sessionId": "work_order_capture_2cY7Hm_Iw0O",
  "workOrderId": "10490",
  "reason": "cancelled"
}
```

These routes use the same bridge Bearer credential and the same single active
lease as storage sessions. Start requires the exact callback object shown above;
top-level expiry or missing callback credentials are rejected. The bridge
allow-lists the Magmo origin and the exact Work Order callback path for the
session ID before retaining the capability in memory.

While a Work Order lease is active, every completed frame from the configured
HID or serial/COM scanner is delivered to the Work Order callback. No active
frame reaches the idle page opener, including when callback delivery fails and
is waiting for retry. Expiry and valid stop scrub the capability, release the
lease, and restore idle page opening.

## Bridge-to-Magmo event callback

The bridge posts every completed scan to the callback URL supplied by start.
The only accepted callback route families are:

```http
POST /api/storage-units/scan-sessions/{sessionId}/events
POST /api/items/work-order-add/scan-sessions/{sessionId}/events
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

Retries must retain exactly the same `eventId`, `code`, and `scannedAt`. Magmo
hashes the event ID for its Firestore document path and transactionally stores
it once in the matching storage or Work Order session. The per-session bearer
is stored only as SHA-256 in Firestore and is verified with a timing-safe
comparison on every callback.

## Current warehouse-server implementation

The session-aware bridge is implemented. Its canonical, version-controlled
source is:

- `C:\Users\mack2\Desktop\code\scanner-server`
- Package: `C:\Users\mack2\Desktop\code\scanner-server\warehouse_scanner`
- Offline tests: `C:\Users\mack2\Desktop\code\scanner-server\tests`
- Operator runbook: `C:\Users\mack2\Desktop\code\scanner-server\README.md`

An operational copy has been installed under:

- `C:\Users\mack2\Desktop\magmo-api\warehouse_scanner`
- Combined port-5000 process:
  `C:\Users\mack2\Desktop\magmo-api\print_bluefolder_combo.py`

Before that external installation was changed, the prior scanner files were
backed up at:

`C:\Users\mack2\Desktop\code\outputs\scanner-backups\2026-08-27_21-05-09-warehouse-scanner`

Treat `scanner-server` as canonical. Make and test future changes there first,
create a dated backup, and then deliberately synchronize the operational copy.
Do not develop solely against the unversioned external copy.

The external `warehouse_scanner\scanner.env` has now been created with the
explicitly authorized `STORAGE_SCAN_BRIDGE_TOKEN` transfer and the non-secret
idle-flush setting. Source/target equality and minimum token length were verified
without printing the value, and no unrelated secret was copied. This PC does not
currently expose a safely identifiable physical barcode scanner, so no
`SCANNER_DEVICE_MATCH` was guessed or added. The combined bridge remains
unavailable for Scan In until calibration is performed on the actual warehouse
scanner PC.

The installed implementation provides these safeguards:

1. HID input is accepted only from an exact learned device identity, or from an
   explicitly configured serial port. Fast human typing is not used as a device
   identification heuristic.
2. Authenticated start/stop routes share the one existing port-5000 Flask
   process. When scanner input is unavailable, authenticated starts fail safely
   with HTTP 503 rather than silently falling through to a route-level 404.
3. While any storage or Work Order capture session is active, physical scans are
   sent only to that session's allow-listed callback. They never open a browser,
   including when callback delivery fails and is being retried.
4. While no capture session is active, physical scanner input may open only
   canonical Magmo item, bin, or pallet pages. Arbitrary scanned URLs are not
   opened.
5. Session expiry, singleton ownership, idempotent event IDs and retries, stale
   stop rejection, input limits, and in-memory capability scrubbing are enforced
   locally.
6. The scanner process uses no Firebase Admin credential or service-account key.
7. Work Order Add uses the same exclusive lease and remote event queue. Both an
   exact learned HID scanner and an explicitly selected serial/COM scanner send
   every completed frame to the Work Order callback; neither relies on browser
   keystrokes.

## Required one-time warehouse-PC calibration and restart

Complete these steps on the Windows PC that is physically connected to the
warehouse scanner. Do not perform calibration on a different PC and do not copy
a device identity from another keyboard or scanner.

1. Make sure the scanner is connected. Stop any old standalone
   `warehouse_scanner.py` global-hook process. The legacy listener and any
   separate global scan-to-page opener must never run in parallel with the
   combined server; the unified bridge owns idle page opening.
2. Open PowerShell in the installed server directory:

   ```powershell
   cd C:\Users\mack2\Desktop\magmo-api
   ```

3. Choose a physical barcode or QR label whose exact decoded value is known,
   then start local-only learning:

   ```powershell
   py -3.14 -m warehouse_scanner.warehouse_scanner --learn-device
   ```

   Enter the known label value at the prompt and scan that same label twice with
   the warehouse scanner. Learning does not open Magmo or send network traffic.
   It rejects a single sample, mismatched values, and the same expected value
   arriving from different input devices.
4. Copy only the emitted `SCANNER_DEVICE_MATCH=...` line into this private file:

   `C:\Users\mack2\Desktop\magmo-api\warehouse_scanner\scanner.env`

   Keep the private bridge-token line intact once it has been installed. Do not
   paste either line into documentation, chat, source control, screenshots, or
   service logs. Do not add both a HID match and `SCANNER_SERIAL_PORT`.
5. Restart the one combined `print_bluefolder_combo.py` process so it loads the
   calibrated device, and restart the fixed-domain ngrok tunnel to that same
   port-5000 process. Stop ngrok before stopping the app; start the app and
   confirm local readiness before starting ngrok again. Do not launch the old
   standalone global keyboard listener afterward.
6. Verify that fast typing on the ordinary keyboard opens nothing. Verify one
   idle scanner read opens exactly one canonical Magmo page. Then open a bin or
   pallet Scan In modal and verify that scanner reads appear only in its staged
   list and do not open browser windows. Open Work Order Add, enable scanner
   capture, and verify each read appears once in its staged list with no page
   opening. Stop or let a controlled session expire, then verify the next idle
   scanner read resumes opening its one canonical page. Cancel the first
   controlled test before performing a separate known-item confirmation test.

The public scanner endpoint remains operationally **unverified** until the
actual warehouse PC has completed exact-device learning, saved the emitted
match, restarted the combined process and ngrok, and passed the controlled tests
above. The code and local installation are present, but that does not by itself
prove the physical scanner-to-public-callback path. Until verification is
complete, Magmo must continue to treat scanner-unavailable/bridge failures as a
safe failure and make no inventory change. `STORAGE_SCAN_ENABLED=false` remains
the emergency Magmo-side kill switch.
