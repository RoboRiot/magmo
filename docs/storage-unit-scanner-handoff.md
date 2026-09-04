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
| `STORAGE_SCAN_BRIDGE_TOKEN` | At least 32 characters. Shared only by Magmo and the warehouse bridge; used as the Bearer credential on start/drain/stop and dedicated storage-label print requests. This is not the callback token. |
| `STORAGE_SCAN_CALLBACK_BASE_URL` | Public Magmo origin, with no path; HTTPS is required in production. Canonical value: `https://magmo.cloud`. |
| `STORAGE_SCAN_START_URL` | Optional exact bridge start URL. Example: `https://scanner.example/storage-scan/start`. Required when an explicitly enabled test/staging environment is used. |
| `STORAGE_SCAN_STOP_URL` | Optional exact bridge stop URL. Example: `https://scanner.example/storage-scan/stop`. Required when an explicitly enabled test/staging environment is used. |
| `STORAGE_SCAN_DRAIN_URL` | Optional exact storage drain URL. Otherwise derived beside the stop route. |
| `PRINT_STORAGE_LABEL_PROXY_URL` | Optional exact public `https://…/print-storage-label` URL. Otherwise derived from `NGROK_BASE_URL`. |
| `PRINT_STORAGE_LABEL_LOCAL_URL` | Development-only dedicated print URL; defaults to `http://127.0.0.1:5000/print-storage-label`. |
| `NGROK_BASE_URL` | Existing production bridge base. When exact URLs are absent, Magmo derives the storage/work-order start, drain, stop, and storage-label print paths. Never inherited by test/staging scanner controls. |
| `STORAGE_SCAN_LOCAL_BASE_URL` | Development-only loopback base. Defaults to `http://127.0.0.1:5000`; it is never tried in production. |
| `STORAGE_SCAN_SESSION_TTL_SECONDS` | Optional session TTL; clamped to 60–900 seconds, default 300. |
| `WORK_ORDER_SCAN_TTL_SECONDS` | Optional Work Order capture TTL; clamped to 60–900 seconds, default 300. |
| `OPS_ENVIRONMENT` | `test`, `testing`, or `staging` forces isolated exact start/drain/stop URLs and a bridge token; shared `NGROK_BASE_URL` is ignored. |

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
        "status": "received",
        "kind": null,
        "itemId": null,
        "message": "Scan received and queued for lookup."
      }
    ]
  },
  "events": ["same event objects as session.events"]
}
```

Only allow-listed metadata is serialized. In particular, responses never expose
`callbackTokenHash`, a callback token, `STORAGE_SCAN_BRIDGE_TOKEN`, or internal
bridge session identifiers. Resolved event snapshots are deterministic previews;
confirm must re-read and revalidate canonical records transactionally.

Callback ingestion intentionally performs no inventory lookup. It stores the
frame quickly so a burst of scanner input is not held behind Firestore reads.
The owning browser resolves new events through a bounded queue of three
concurrent lookups:

`POST /api/storage-units/scan-sessions/{sessionId}/events/{eventId}/resolve`

The body must be `{}`. This owner-only endpoint resolves the canonical item or
bin, stores the deterministic preview on the event, and is idempotent for an
already-resolved event. Only resolved, valid rows can be confirmed.

### Drain before confirm

`POST /api/storage-units/scan-sessions/{sessionId}/drain`

```json
{ "reason": "confirmed" }
```

Before confirmation, Magmo repeatedly calls drain until the bridge returns
`drained=true`. Each call stops that session from accepting another frame while
allowing its already-buffered callbacks to finish. Magmo polls once more,
finishes the bounded resolution queue, then builds the final event-ID list from
fresh state. A timeout or unresolved row leaves inventory unchanged.

For a short upgrade window, Magmo recognizes a bridge response of HTTP 404 with
`scanner_drain_unsupported` and performs three final compatibility polls. That
fallback cannot guarantee burst completeness. Rapid scanning is not considered
operational until the remote bridge exposes drain and returns `drained=true`.

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

### Drain Work Order capture

`POST /api/items/work-order-add/scan-sessions/{sessionId}/drain`

```json
{ "workOrderId": "10490", "reason": "confirmed" }
```

Before saving, Magmo calls this endpoint until the bridge reports
`drained=true`, polls the session one final time, and waits for its bounded
lookup queue to finish. The bridge stops accepting new frames as soon as drain
begins but keeps pending callbacks alive. Only after that handoff does Magmo
stop the lease and submit the fresh staged list. A drain timeout saves nothing.
The temporary 404 compatibility behavior described above also applies here and
is not sufficient to certify rapid Work Order scanning.

### Stop Work Order capture

`POST /api/items/work-order-add/scan-sessions/{sessionId}/stop`

```json
{ "workOrderId": "10490", "reason": "cancelled" }
```

`reason` is `confirmed`, `cancelled`, `expired`, or `failed`. For confirmation,
drain first and stop after the queue is empty and Magmo has its final staged
list. Stop immediately on explicit cancel, work-order change, hide/unmount, or
terminal failure. Stop is idempotent; the local TTL is the fail-safe for browser
shutdown or lost cleanup requests. A valid stop or local expiry releases the
lease so the next idle scan can open its canonical Magmo page.

## Warehouse bridge API

The public bridge must reject start, drain, stop, and dedicated storage-label
print requests unless this header matches its locally configured
`STORAGE_SCAN_BRIDGE_TOKEN` using a timing-safe comparison:

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

### Drain signal

`POST /storage-scan/drain`

```json
{
  "schemaVersion": 1,
  "sessionId": "2cY7Hm_Iw0O-bVnE4mZ9jW7q",
  "unitId": "P65",
  "reason": "confirmed"
}
```

A valid drain is idempotent, changes the matching active session to a
no-new-frames state immediately, and accelerates any scheduled retries. It does
not release the scanner lease. The response includes `draining`, `drained`, and
`pendingEventCount`; Magmo polls this route until the count reaches zero.

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

`POST /work-order-scan/drain` accepts the same body as stop. It pauses new Work
Order frames, keeps queued callbacks and retries alive, and returns the same
`draining`, `drained`, and `pendingEventCount` fields as storage drain. Drain
does not enable idle page opening; only the matching stop or expiry does that.

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

## Dedicated bin and pallet label API

`POST /print-storage-label`

This is separate from the legacy item-label route and never accepts or prompts
for a user-entered name. Magmo authenticates the user, reads the storage unit
and its current contents from Firestore, then sends an exact `storage-unit-v2`
payload to this bridge route with the private bridge Bearer token. For example:

```json
{
  "template": "storage-unit-v2",
  "label_type": "storage_unit",
  "storage_unit_type": "bin",
  "unit_id": "B47",
  "display_number": "47",
  "local_sn": "AIS-B00047",
  "serial_id": "AIS-B00047",
  "qr_value": "https://magmo.cloud/NewSearch/inventory/storage/B47",
  "barcode_value": "AIS-B00047",
  "barcode_format": "CODE128",
  "items": [
    {
      "item_id": "AIS17704",
      "name": "Pellet",
      "barcode_value": "AIS17704",
      "ais_number": "AIS17704"
    }
  ],
  "bins": []
}
```

The route prints 4×6 portrait ZPL at 203 dpi (`^PW820`, `^LL1180`). Bin labels
use `BIN N`, current item names and their serial barcodes/AIS numbers. Pallet
labels use the largest practical `P[number]` heading and a grid of current
`B[number]` members. Both formats end with the exact `AIS-B#####` or
`AIS-P#####` Code 128 value and a QR linking directly to the Magmo storage-unit
page. Contents paginate rather than being omitted. The route returns page and
content counts; print failures return HTTP 502 and must not report success.

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

HTTP 429, HTTP 5xx, and network/timeout failures are retried by the bridge with
the same event identity. Validation, authentication, closed-session, and other
terminal 4xx responses are not retried indefinitely.

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

This workstation also contains a reference/staging copy under:

- `C:\Users\mack2\Desktop\magmo-api\warehouse_scanner`
- Combined port-5000 process:
  `C:\Users\mack2\Desktop\magmo-api\print_bluefolder_combo.py`

Before that local reference copy was changed, its prior scanner files were
backed up at:

`C:\Users\mack2\Desktop\code\outputs\scanner-backups\2026-08-27_21-05-09-warehouse-scanner`

Treat `scanner-server` as canonical. The copy above is not the remote warehouse
server and does not prove that the physical scanner process has been updated.
Create a dated backup on the warehouse server, synchronize the canonical
package there, test it, and restart that server deliberately. Do not develop
solely against an unversioned operational copy.

Only `STORAGE_SCAN_BRIDGE_TOKEN` was authorized for secret transfer. Preserve
the warehouse server's existing private token value and all unrelated server
configuration; never copy `.env.local`, Firebase credentials, or other secrets.
No claim is made here that the remote service, its ngrok tunnel, or its physical
scanner has been updated or verified.

The canonical implementation provides these safeguards:

1. HID input is accepted only from an exact learned device identity, or from an
   explicitly configured serial port. Fast human typing is not used as a device
   identification heuristic.
2. Authenticated start/drain/stop routes share the one existing port-5000 Flask
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

## Straight-text handoff for Codex on the warehouse server

Paste the following request into Codex running on the physical scanner server.
It is intentionally self-contained and does not include a secret:

```text
Update the existing Magmo warehouse scanner/printer service from the canonical
scanner-server package in the Magmo repository. First make a dated, recoverable
backup of the current warehouse_scanner package, combined Flask entry point,
private scanner.env, and service/startup configuration. Do not delete or replace
the backup, and do not expose any credential in commands or output.

Preserve all existing server configuration. STORAGE_SCAN_BRIDGE_TOKEN is the
only secret authorized for this integration; retain its existing value if it is
already present, and do not copy or change any unrelated secret.

Synchronize the version-controlled Python source from
scanner-server/warehouse_scanner, including storage_scan_bridge.py,
storage_label_print.py, device_input.py, and warehouse_scanner.py. Explicitly
exclude scanner.env, logs, caches, and generated files so the private remote
configuration is preserved byte-for-byte. Keep one Flask/Waitress process on
the existing port 5000. Do not run the old global keyboard listener or a second
Flask development server.
Install/update the dependencies from scanner-server/requirements.txt in the
same Python environment used by the service.

In the combined Flask entry point, keep the existing item print route and
print_label function. Reuse the embedded scanner runtime already constructed on
the existing app; do not call build_embedded_runtime or register scanner routes
a second time. Insert storage-label registration after print_label is defined
and before Waitress starts serving. Import register_storage_label_routes from
warehouse_scanner.storage_label_print and call it exactly once, using the actual
existing runtime variable (the reference combo server calls it
STORAGE_SCAN_RUNTIME):

register_storage_label_routes(
    app,
    authorize=STORAGE_SCAN_RUNTIME.bridge.authorize,
    printer=print_label,
)

Make print_label return a truthy result after a successful spool and raise its
exception (or return False) when printing fails; it must not swallow a failed
print and report success. The new /print-storage-label route must stay separate
from the legacy route and must not require or prompt for a name.

Run all scanner-server Python tests. Then restart the one combined service and
the fixed-domain ngrok tunnel. Verify authenticated storage/work-order start,
drain, and stop routes plus /print-storage-label. Confirm drain blocks new frames
but finishes queued callbacks. Scan at least ten disposable test codes quickly
into a bin and a Work Order and verify every code arrives exactly once with no
omissions and without browser tabs. Verify fast normal keyboard typing never opens Magmo; an idle read from the
calibrated scanner should open exactly one canonical item/bin/pallet page.
Finally print one populated bin and one pallet and verify the content, exact
AIS-B#####/AIS-P##### barcode, phone QR destination, pagination, and no name
prompt. If any check fails, restore the dated backup and report the exact failing
check without exposing credentials.
```

## Required one-time warehouse-PC calibration and restart

Complete these steps on the Windows PC that is physically connected to the
warehouse scanner. Do not perform calibration on a different PC and do not copy
a device identity from another keyboard or scanner. Device learning is required
only when the remote exact-device binding is missing or the scanner/interface
has changed; preserve a known-good existing binding during a routine code update.

1. Make sure the scanner is connected. Stop any old standalone
   `warehouse_scanner.py` global-hook process. The legacy listener and any
   separate global scan-to-page opener must never run in parallel with the
   combined server; the unified bridge owns idle page opening.
2. Open PowerShell in the active warehouse scanner service directory. Use the
   real path configured on that server, not a path copied from another PC:

   ```powershell
   cd <active warehouse scanner service directory>
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
4. Copy only the emitted `SCANNER_DEVICE_MATCH=...` line into the private file
   identified by that service's `WAREHOUSE_SCANNER_ENV_FILE` setting.

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
above. The canonical code and local reference copy are present, but that does
not prove the physical scanner-to-public-callback path. Until verification is
complete, Magmo must continue to treat scanner-unavailable/bridge failures as a
safe failure and make no inventory change. `STORAGE_SCAN_ENABLED=false` remains
the emergency Magmo-side kill switch.
