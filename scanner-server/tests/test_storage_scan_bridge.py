from __future__ import annotations

import contextlib
import copy
import io
import json
import sys
import threading
import time
import unittest
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace


SCANNER_SERVER_ROOT = Path(__file__).resolve().parents[1]
if str(SCANNER_SERVER_ROOT) not in sys.path:
    sys.path.insert(0, str(SCANNER_SERVER_ROOT))

from flask import Flask

from warehouse_scanner.storage_scan_bridge import (
    BridgeError,
    BridgeSettings,
    CallbackHttpResponse,
    CallbackTransportError,
    StorageScanBridge,
    register_storage_scan_routes,
)


BRIDGE_TOKEN = "b" * 43
CALLBACK_TOKEN = "c" * 43
SESSION_A = "A" * 24
SESSION_B = "B" * 24


class FakeClock:
    def __init__(self) -> None:
        self.value = datetime(2026, 8, 27, 18, 0, 0, tzinfo=timezone.utc)

    def __call__(self) -> datetime:
        return self.value

    def advance(self, **kwargs: float) -> None:
        self.value += timedelta(**kwargs)


class FakeScheduler:
    def __init__(self) -> None:
        self.entries: list[dict[str, object]] = []

    def __call__(self, delay: float, callback):
        entry = {"delay": delay, "callback": callback, "cancelled": False}
        self.entries.append(entry)

        def cancel() -> None:
            entry["cancelled"] = True

        return cancel


class ScriptedSender:
    def __init__(self, outcomes=None) -> None:
        self.outcomes = list(outcomes or [])
        self.calls: list[dict[str, object]] = []

    def __call__(self, url, bearer_token, payload, *, timeout_seconds):
        self.calls.append(
            {
                "url": url,
                "bearer_token": bearer_token,
                "payload": copy.deepcopy(dict(payload)),
                "timeout_seconds": timeout_seconds,
            }
        )
        outcome = self.outcomes.pop(0) if self.outcomes else 202
        if isinstance(outcome, BaseException):
            raise outcome
        return CallbackHttpResponse(status_code=int(outcome))


class BlockingSender:
    def __init__(self) -> None:
        self.entered = threading.Event()
        self.release = threading.Event()
        self.completed = threading.Event()
        self.calls: list[dict[str, object]] = []

    def __call__(self, url, bearer_token, payload, *, timeout_seconds):
        self.calls.append(
            {
                "url": url,
                "bearer_token": bearer_token,
                "payload": copy.deepcopy(dict(payload)),
                "timeout_seconds": timeout_seconds,
            }
        )
        self.entered.set()
        self.release.wait(timeout=2.0)
        self.completed.set()
        return CallbackHttpResponse(status_code=202)


def bridge_settings(*, attempts: int = 3, request_bytes: int = 16_384) -> BridgeSettings:
    return BridgeSettings.from_env(
        {
            "STORAGE_SCAN_BRIDGE_TOKEN": BRIDGE_TOKEN,
            "STORAGE_SCAN_ALLOWED_CALLBACK_ORIGINS": "https://magmo.cloud",
            "STORAGE_SCAN_BROWSER_BASE_URL": "https://magmo.cloud",
            "STORAGE_SCAN_CALLBACK_ATTEMPTS": str(attempts),
            "STORAGE_SCAN_MAX_REQUEST_BYTES": str(request_bytes),
        }
    )


def start_payload(
    clock: FakeClock,
    *,
    session_id: str = SESSION_A,
    unit_id: str = "B47",
    unit_type: str = "bin",
    unit_number: int = 47,
    callback_token: str = CALLBACK_TOKEN,
    callback_origin: str = "https://magmo.cloud",
    callback_session_id: str | None = None,
    expires_delta: timedelta = timedelta(minutes=5),
) -> dict:
    callback_id = callback_session_id or session_id
    return {
        "schemaVersion": 1,
        "sessionId": session_id,
        "target": {"unitId": unit_id, "type": unit_type, "number": unit_number},
        "callback": {
            "url": (
                f"{callback_origin}/api/storage-units/scan-sessions/"
                f"{callback_id}/events"
            ),
            "bearerToken": callback_token,
            "expiresAt": (clock() + expires_delta)
            .isoformat(timespec="milliseconds")
            .replace("+00:00", "Z"),
        },
    }


def stop_payload(
    *, session_id: str = SESSION_A, unit_id: str = "B47", reason: str = "cancelled"
) -> dict:
    return {
        "schemaVersion": 1,
        "sessionId": session_id,
        "unitId": unit_id,
        "reason": reason,
    }


def auth_headers() -> dict[str, str]:
    return {"Authorization": f"Bearer {BRIDGE_TOKEN}"}


@dataclass
class BridgeFixture:
    bridge: StorageScanBridge
    sender: ScriptedSender
    browser_calls: list[str]
    sleeps: list[float]
    scheduler: FakeScheduler


class StorageScanBridgeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.clock = FakeClock()

    def make_bridge(self, *, outcomes=None, attempts: int = 3) -> BridgeFixture:
        sender = ScriptedSender(outcomes)
        browser_calls: list[str] = []
        sleeps: list[float] = []
        scheduler = FakeScheduler()
        bridge = StorageScanBridge(
            bridge_settings(attempts=attempts),
            callback_sender=sender,
            browser_opener=lambda url: browser_calls.append(url) is None,
            clock=self.clock,
            event_id_factory=lambda: "fixed-event-0001",
            sleeper=sleeps.append,
            schedule_expiry=scheduler,
            scanner_ready=True,
        )
        return BridgeFixture(bridge, sender, browser_calls, sleeps, scheduler)

    def make_client(self, fixture: BridgeFixture):
        app = Flask(__name__)
        app.config.update(TESTING=True)
        register_storage_scan_routes(app, fixture.bridge)
        return app.test_client()

    def test_settings_fail_closed_and_repr_never_contains_secret(self) -> None:
        with self.assertRaises(BridgeError):
            BridgeSettings.from_env({})
        with self.assertRaises(BridgeError):
            BridgeSettings.from_env({"STORAGE_SCAN_BRIDGE_TOKEN": "short"})
        with self.assertRaises(BridgeError):
            BridgeSettings.from_env(
                {
                    "STORAGE_SCAN_BRIDGE_TOKEN": BRIDGE_TOKEN,
                    "STORAGE_SCAN_ALLOWED_CALLBACK_ORIGINS": "http://magmo.cloud",
                }
            )

        settings = bridge_settings()
        self.assertNotIn(BRIDGE_TOKEN, repr(settings))
        self.assertEqual(settings.allowed_callback_origins, ("https://magmo.cloud",))

    def test_routes_authenticate_before_parsing_or_using_the_body(self) -> None:
        fixture = self.make_bridge()
        client = self.make_client(fixture)
        with contextlib.redirect_stdout(io.StringIO()) as stdout, contextlib.redirect_stderr(
            io.StringIO()
        ) as stderr:
            missing = client.post(
                "/storage-scan/start",
                data="not json and contains a pretend secret",
                content_type="text/plain",
            )
            wrong = client.post(
                "/storage-scan/start",
                data="{",
                content_type="application/json",
                headers={"Authorization": "Bearer wrong"},
            )
        self.assertEqual(missing.status_code, 401)
        self.assertEqual(wrong.status_code, 401)
        self.assertEqual(fixture.bridge.status_snapshot()["active"], False)
        combined = stdout.getvalue() + stderr.getvalue() + missing.get_data(as_text=True)
        self.assertNotIn(BRIDGE_TOKEN, combined)
        self.assertNotIn(CALLBACK_TOKEN, combined)
        self.assertRegex(missing.headers["Cache-Control"], r"no-store")

    def test_registered_start_route_returns_503_until_physical_input_is_ready(self) -> None:
        sender = ScriptedSender()
        bridge = StorageScanBridge(
            bridge_settings(),
            callback_sender=sender,
            browser_opener=lambda _url: True,
            clock=self.clock,
            event_id_factory=lambda: "readiness-event-0001",
            sleeper=lambda _delay: None,
            schedule_expiry=FakeScheduler(),
        )
        app = Flask(f"{__name__}.readiness")
        app.config.update(TESTING=True)
        register_storage_scan_routes(app, bridge)
        client = app.test_client()
        payload = start_payload(self.clock)

        unavailable = client.post(
            "/storage-scan/start", json=payload, headers=auth_headers()
        )
        self.assertEqual(unavailable.status_code, 503)
        self.assertEqual(unavailable.json["code"], "scanner_input_unavailable")
        self.assertFalse(bridge.scanner_ready)
        self.assertFalse(bridge.status_snapshot()["active"])
        self.assertNotIn(CALLBACK_TOKEN, unavailable.get_data(as_text=True))

        bridge.set_scanner_ready(True)
        started = client.post("/storage-scan/start", json=payload, headers=auth_headers())
        self.assertEqual(started.status_code, 201)
        self.assertTrue(bridge.scanner_ready)
        secret = bridge._active.callback_token

        bridge.set_scanner_ready(False)
        self.assertFalse(bridge.scanner_ready)
        self.assertFalse(bridge.status_snapshot()["active"])
        self.assertTrue(secret.scrubbed)
        stopped = client.post(
            "/storage-scan/stop", json=stop_payload(), headers=auth_headers()
        )
        self.assertEqual(stopped.status_code, 200)
        self.assertTrue(stopped.json["alreadyStopped"])

    def test_start_route_rejects_non_json_malformed_json_and_large_body(self) -> None:
        fixture = self.make_bridge()
        client = self.make_client(fixture)
        plain = client.post(
            "/storage-scan/start", data="{}", content_type="text/plain", headers=auth_headers()
        )
        malformed = client.post(
            "/storage-scan/start", data="{", content_type="application/json", headers=auth_headers()
        )
        large = client.post(
            "/storage-scan/start",
            data=json.dumps({"padding": "x" * 17_000}),
            content_type="application/json",
            headers=auth_headers(),
        )
        self.assertEqual(plain.status_code, 415)
        self.assertEqual(malformed.status_code, 400)
        self.assertEqual(large.status_code, 413)

    def test_start_validation_is_exact_and_callback_is_allowlisted(self) -> None:
        fixture = self.make_bridge()
        bad_extra = start_payload(self.clock)
        bad_extra["unexpected"] = True
        bad_target = start_payload(self.clock)
        bad_target["target"]["type"] = "pallet"
        bad_origin = start_payload(self.clock, callback_origin="https://attacker.example")
        bad_path = start_payload(self.clock, callback_session_id=SESSION_B)
        bad_expiry = start_payload(self.clock, expires_delta=timedelta(seconds=901))
        no_timezone = start_payload(self.clock)
        no_timezone["callback"]["expiresAt"] = "2026-08-27T18:05:00"

        for payload, expected_code in (
            (bad_extra, "invalid_start_request"),
            (bad_target, "invalid_target"),
            (bad_origin, "invalid_callback"),
            (bad_path, "invalid_callback"),
            (bad_expiry, "invalid_expiry"),
            (no_timezone, "invalid_expiry"),
        ):
            with self.subTest(expected_code=expected_code):
                with self.assertRaises(BridgeError) as raised:
                    fixture.bridge.start_session(payload)
                self.assertEqual(raised.exception.code, expected_code)
        self.assertFalse(fixture.bridge.status_snapshot()["active"])

    def test_start_is_idempotent_and_rejects_conflicts_and_busy_scanner(self) -> None:
        fixture = self.make_bridge()
        client = self.make_client(fixture)
        payload = start_payload(self.clock)
        first = client.post("/storage-scan/start", json=payload, headers=auth_headers())
        duplicate = client.post("/storage-scan/start", json=payload, headers=auth_headers())
        changed = start_payload(self.clock, callback_token="d" * 43)
        conflict = client.post("/storage-scan/start", json=changed, headers=auth_headers())
        busy = client.post(
            "/storage-scan/start",
            json=start_payload(
                self.clock,
                session_id=SESSION_B,
                unit_id="P65",
                unit_type="pallet",
                unit_number=65,
            ),
            headers=auth_headers(),
        )

        self.assertEqual(first.status_code, 201)
        self.assertEqual(duplicate.status_code, 200)
        self.assertEqual(first.json["bridgeSessionId"], duplicate.json["bridgeSessionId"])
        self.assertFalse(first.json["idempotent"])
        self.assertTrue(duplicate.json["idempotent"])
        self.assertEqual(conflict.status_code, 409)
        self.assertEqual(conflict.json["code"], "session_id_conflict")
        self.assertEqual(busy.status_code, 409)
        self.assertEqual(busy.json["code"], "scanner_busy")
        serialized = first.get_data(as_text=True) + duplicate.get_data(as_text=True)
        self.assertNotIn(BRIDGE_TOKEN, serialized)
        self.assertNotIn(CALLBACK_TOKEN, serialized)
        self.assertEqual(len(fixture.scheduler.entries), 1)

    def test_stop_is_idempotent_and_stale_stop_cannot_kill_newer_session(self) -> None:
        fixture = self.make_bridge()
        fixture.bridge.start_session(start_payload(self.clock))
        stopped = fixture.bridge.stop_session(stop_payload())
        self.assertTrue(stopped["stopped"])
        self.assertFalse(stopped["alreadyStopped"])

        fixture.bridge.start_session(
            start_payload(
                self.clock,
                session_id=SESSION_B,
                unit_id="P65",
                unit_type="pallet",
                unit_number=65,
            )
        )
        with self.assertRaises(BridgeError) as stale:
            fixture.bridge.stop_session(stop_payload())
        self.assertEqual(stale.exception.code, "stale_stop")
        self.assertEqual(fixture.bridge.status_snapshot()["magmoSessionId"], SESSION_B)

        stopped_b = fixture.bridge.stop_session(
            stop_payload(session_id=SESSION_B, unit_id="P65", reason="confirmed")
        )
        repeated_b = fixture.bridge.stop_session(
            stop_payload(session_id=SESSION_B, unit_id="P65", reason="confirmed")
        )
        self.assertFalse(stopped_b["alreadyStopped"])
        self.assertTrue(repeated_b["alreadyStopped"])

    def test_target_mismatch_does_not_stop_owned_session(self) -> None:
        fixture = self.make_bridge()
        fixture.bridge.start_session(start_payload(self.clock))
        with self.assertRaises(BridgeError) as raised:
            fixture.bridge.stop_session(stop_payload(unit_id="B48"))
        self.assertEqual(raised.exception.code, "session_target_conflict")
        self.assertTrue(fixture.bridge.status_snapshot()["active"])

    def test_expiry_scrubs_session_capability_and_pending_scan_data(self) -> None:
        fixture = self.make_bridge(outcomes=[500], attempts=1)
        fixture.bridge.start_session(start_payload(self.clock, expires_delta=timedelta(seconds=60)))
        result = fixture.bridge.route_scan("AIS17704")
        self.assertEqual(result.error_code, "callback_retry_pending")
        active = fixture.bridge._active
        self.assertIsNotNone(active)
        secret = active.callback_token
        pending = next(iter(active.pending_events.values()))
        self.clock.advance(seconds=61)

        self.assertEqual(fixture.bridge.status_snapshot(), {"active": False, "pendingEventCount": 0})
        self.assertTrue(secret.scrubbed)
        self.assertEqual(set(secret._value), {0})
        self.assertEqual(pending.code, "")
        self.assertEqual(pending.scanned_at, "")

    def test_idle_scans_open_only_canonical_allowlisted_magmo_pages(self) -> None:
        fixture = self.make_bridge()
        storage = fixture.bridge.route_scan("B_047")
        item = fixture.bridge.route_scan("AIS 17704")
        qr = fixture.bridge.route_scan("https://magmo.cloud/NewSearch/item/AIS%2017705")
        attacker = fixture.bridge.route_scan("https://attacker.example/AIS17704")
        arbitrary_magmo = fixture.bridge.route_scan("https://magmo.cloud/admin")

        self.assertEqual(storage.mode, "browser")
        self.assertEqual(
            storage.destination,
            "https://magmo.cloud/NewSearch/inventory/storage/B47",
        )
        self.assertEqual(item.destination, "https://magmo.cloud/NewSearch/item/AIS%2017704")
        self.assertEqual(qr.destination, "https://magmo.cloud/NewSearch/item/AIS%2017705")
        self.assertFalse(attacker.accepted)
        self.assertFalse(arbitrary_magmo.accepted)
        self.assertEqual(len(fixture.browser_calls), 3)
        self.assertTrue(all(url.startswith("https://magmo.cloud/NewSearch/") for url in fixture.browser_calls))

    def test_active_scan_callbacks_only_and_never_opens_browser(self) -> None:
        fixture = self.make_bridge(outcomes=[202])
        fixture.bridge.start_session(start_payload(self.clock))
        result = fixture.bridge.route_scan("AIS17704")

        self.assertEqual(result.mode, "callback")
        self.assertTrue(result.accepted)
        self.assertTrue(result.delivered)
        self.assertEqual(result.event_id, "warehouse-reader:fixed-event-0001")
        self.assertEqual(fixture.browser_calls, [])
        self.assertEqual(len(fixture.sender.calls), 1)
        call = fixture.sender.calls[0]
        self.assertEqual(call["bearer_token"], CALLBACK_TOKEN)
        self.assertEqual(call["payload"]["code"], "AIS17704")
        self.assertEqual(call["payload"]["eventId"], result.event_id)
        self.assertEqual(fixture.bridge.status_snapshot()["pendingEventCount"], 0)

    def test_retries_reuse_exact_event_id_code_and_timestamp(self) -> None:
        fixture = self.make_bridge(
            outcomes=[CallbackTransportError("offline"), 500, 202], attempts=3
        )
        fixture.bridge.start_session(start_payload(self.clock))
        result = fixture.bridge.route_scan("AIS17704")

        self.assertTrue(result.delivered)
        self.assertEqual(result.attempts, 3)
        self.assertEqual(fixture.sleeps, [0.25, 0.75])
        payloads = [call["payload"] for call in fixture.sender.calls]
        self.assertEqual(len(payloads), 3)
        self.assertEqual(payloads[0], payloads[1])
        self.assertEqual(payloads[1], payloads[2])
        self.assertEqual(
            {payload["eventId"] for payload in payloads},
            {"warehouse-reader:fixed-event-0001"},
        )
        self.assertEqual(fixture.browser_calls, [])

    def test_exhausted_retry_stays_pending_and_later_retry_keeps_identity(self) -> None:
        fixture = self.make_bridge(outcomes=[500, 500], attempts=2)
        fixture.bridge.start_session(start_payload(self.clock))
        first = fixture.bridge.route_scan("AIS17704")
        self.assertFalse(first.delivered)
        self.assertEqual(first.error_code, "callback_retry_pending")
        self.assertEqual(fixture.bridge.status_snapshot()["pendingEventCount"], 1)

        fixture.sender.outcomes.append(200)
        retried = fixture.bridge.retry_pending_events()
        self.assertEqual(len(retried), 1)
        self.assertTrue(retried[0].delivered)
        event_ids = [call["payload"]["eventId"] for call in fixture.sender.calls]
        self.assertEqual(event_ids, [first.event_id, first.event_id, first.event_id])
        self.assertEqual(fixture.bridge.status_snapshot()["pendingEventCount"], 0)

    def test_terminal_callback_responses_close_and_scrub_session(self) -> None:
        for status in (400, 401, 409, 410):
            with self.subTest(status=status):
                fixture = self.make_bridge(outcomes=[status], attempts=3)
                fixture.bridge.start_session(start_payload(self.clock))
                secret = fixture.bridge._active.callback_token
                result = fixture.bridge.route_scan("AIS17704")
                self.assertEqual(result.error_code, "callback_rejected")
                self.assertEqual(result.attempts, 1)
                self.assertFalse(fixture.bridge.status_snapshot()["active"])
                self.assertTrue(secret.scrubbed)
                self.assertEqual(fixture.browser_calls, [])

    def test_callback_failure_never_falls_back_to_browser(self) -> None:
        fixture = self.make_bridge(outcomes=[500, 500], attempts=2)
        fixture.bridge.start_session(start_payload(self.clock))
        result = fixture.bridge.route_scan("AIS17704")
        self.assertTrue(result.accepted)
        self.assertFalse(result.delivered)
        self.assertEqual(result.mode, "callback")
        self.assertEqual(fixture.browser_calls, [])

    def test_handle_scan_frame_enqueues_without_blocking_device_input(self) -> None:
        sender = BlockingSender()
        browser_calls: list[str] = []
        bridge = StorageScanBridge(
            bridge_settings(),
            callback_sender=sender,
            browser_opener=lambda url: browser_calls.append(url) is None,
            clock=self.clock,
            event_id_factory=lambda: "async-event-0001",
            sleeper=lambda _delay: None,
            schedule_expiry=FakeScheduler(),
            scanner_ready=True,
        )
        bridge.start_session(start_payload(self.clock))
        frame = SimpleNamespace(
            code="P65",
            source="serial",
            device_id="COM3",
            received_at=self.clock(),
        )
        started = time.monotonic()
        result = bridge.handle_scan_frame(frame)
        elapsed = time.monotonic() - started

        self.assertLess(elapsed, 0.5)
        self.assertEqual(result.error_code, "callback_queued")
        self.assertFalse(result.delivered)
        self.assertTrue(sender.entered.wait(timeout=1.0))
        self.assertEqual(browser_calls, [])
        self.assertEqual(sender.calls[0]["payload"]["code"], "P65")
        self.assertEqual(
            sender.calls[0]["url"],
            f"https://magmo.cloud/api/storage-units/scan-sessions/{SESSION_A}/events",
        )

        sender.release.set()
        self.assertTrue(sender.completed.wait(timeout=1.0))
        deadline = time.monotonic() + 1.0
        while bridge.status_snapshot()["pendingEventCount"] and time.monotonic() < deadline:
            time.sleep(0.005)
        self.assertEqual(bridge.status_snapshot()["pendingEventCount"], 0)

    def test_invalid_scan_or_time_is_rejected_without_side_effects(self) -> None:
        fixture = self.make_bridge()
        invalid_values = ("", "https://example.com/a", "has/slash", "x\x00y", "x" * 181)
        for value in invalid_values:
            with self.subTest(value=value[:20]):
                self.assertFalse(fixture.bridge.route_scan(value).accepted)
        old = fixture.bridge.route_scan("AIS17704", self.clock() - timedelta(hours=25))
        future = fixture.bridge.route_scan("AIS17704", self.clock() + timedelta(minutes=6))
        self.assertFalse(old.accepted)
        self.assertFalse(future.accepted)
        self.assertEqual(fixture.browser_calls, [])
        self.assertEqual(fixture.sender.calls, [])

    def test_close_scrubs_active_state_and_rejects_future_scans_and_starts(self) -> None:
        fixture = self.make_bridge(outcomes=[500], attempts=1)
        fixture.bridge.start_session(start_payload(self.clock))
        fixture.bridge.route_scan("AIS17704")
        secret = fixture.bridge._active.callback_token
        fixture.bridge.close()
        self.assertTrue(secret.scrubbed)
        self.assertFalse(fixture.bridge.status_snapshot()["active"])
        self.assertEqual(fixture.bridge.route_scan("AIS17705").error_code, "bridge_closed")
        with self.assertRaises(BridgeError) as raised:
            fixture.bridge.start_session(start_payload(self.clock))
        self.assertEqual(raised.exception.code, "bridge_closed")


if __name__ == "__main__":
    unittest.main()
