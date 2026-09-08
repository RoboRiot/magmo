from __future__ import annotations

import copy
import hmac
import io
import logging
import threading
import unittest
from datetime import datetime, timedelta, timezone
from unittest.mock import patch

import requests
from flask import Flask

from label_server.storage_scan_bridge import (
    RequestValidationError,
    SessionConflictError,
    StorageScanBridge,
    register_storage_scan_bridge,
)


BRIDGE_TOKEN = "bridge-test-token-0123456789-abcdef"
CALLBACK_TOKEN = "one-time.callback.token.for-tests"
SESSION_ONE = "session-0123456789abcdef"
SESSION_TWO = "session-fedcba9876543210"
NOW = datetime(2026, 8, 28, 12, 0, 0, tzinfo=timezone.utc)


class MutableClock:
    def __init__(self, value: datetime = NOW) -> None:
        self.value = value
        self._lock = threading.Lock()

    def __call__(self) -> datetime:
        with self._lock:
            return self.value

    def advance(self, seconds: float) -> None:
        with self._lock:
            self.value += timedelta(seconds=seconds)


class ManualTimer:
    def __init__(self, delay, callback, args) -> None:
        self.delay = delay
        self.callback = callback
        self.args = args
        self.daemon = False
        self.started = False
        self.cancelled = False

    def start(self) -> None:
        self.started = True

    def cancel(self) -> None:
        self.cancelled = True

    def fire(self) -> None:
        if not self.cancelled:
            self.callback(*self.args)


class ManualTimerFactory:
    def __init__(self) -> None:
        self.timers: list[ManualTimer] = []
        self._lock = threading.Lock()

    def __call__(self, delay, callback, args) -> ManualTimer:
        timer = ManualTimer(delay, callback, args)
        with self._lock:
            self.timers.append(timer)
        return timer


class DeferredExecutor:
    def __init__(self) -> None:
        self.tasks = []

    def submit(self, function, *args, **kwargs):
        self.tasks.append((function, args, kwargs))
        return object()

    def run_next(self) -> None:
        function, args, kwargs = self.tasks.pop(0)
        function(*args, **kwargs)

    def run_all(self) -> None:
        while self.tasks:
            self.run_next()


class FakeResponse:
    def __init__(self, status_code: int) -> None:
        self.status_code = status_code


class SequenceRequests:
    def __init__(self, actions=None) -> None:
        self.actions = list(actions or [])
        self.calls = []
        self._lock = threading.Lock()

    def post(self, url, **kwargs):
        with self._lock:
            self.calls.append((url, copy.deepcopy(kwargs)))
            if not self.actions:
                raise AssertionError("unexpected callback request")
            action = self.actions.pop(0)
        if isinstance(action, BaseException):
            raise action
        return FakeResponse(action)


class BlockingRequests:
    def __init__(self) -> None:
        self.entered = threading.Event()
        self.release = threading.Event()
        self.calls = []

    def post(self, url, **kwargs):
        self.calls.append((url, copy.deepcopy(kwargs)))
        self.entered.set()
        if not self.release.wait(2):
            raise TimeoutError("test callback was not released")
        return FakeResponse(204)


class FirstCallBlocksRequests:
    def __init__(self) -> None:
        self.first_entered = threading.Event()
        self.second_entered = threading.Event()
        self.release_first = threading.Event()
        self.calls = []
        self._lock = threading.Lock()

    def post(self, url, **kwargs):
        with self._lock:
            call_number = len(self.calls) + 1
            self.calls.append((url, copy.deepcopy(kwargs)))
        if call_number == 1:
            self.first_entered.set()
            if not self.release_first.wait(2):
                raise TimeoutError("test callback was not released")
        else:
            self.second_entered.set()
        return FakeResponse(204)


def start_payload(
    *,
    session_id: str = SESSION_ONE,
    unit_id: str = "B65",
    target_type: str = "bin",
    number: int = 65,
    callback_token: str = CALLBACK_TOKEN,
    expires_at: datetime | None = None,
):
    expiration = expires_at or (NOW + timedelta(minutes=10))
    return {
        "schemaVersion": 1,
        "sessionId": session_id,
        "target": {
            "unitId": unit_id,
            "type": target_type,
            "number": number,
        },
        "callback": {
            "url": (
                "https://magmo.cloud/api/storage-units/scan-sessions/"
                f"{session_id}/events"
            ),
            "bearerToken": callback_token,
            "expiresAt": expiration.isoformat().replace("+00:00", "Z"),
        },
    }


def stop_payload(
    *,
    session_id: str = SESSION_ONE,
    unit_id: str = "B65",
    reason: str = "cancelled",
):
    return {
        "schemaVersion": 1,
        "sessionId": session_id,
        "unitId": unit_id,
        "reason": reason,
    }


class StorageScanBridgeHttpTests(unittest.TestCase):
    def setUp(self) -> None:
        self.clock = MutableClock()
        self.timers = ManualTimerFactory()
        self.executor = DeferredExecutor()
        self.requests = SequenceRequests()
        self.app = Flask(__name__)
        self.app.config.update(TESTING=True)
        self.bridge = register_storage_scan_bridge(
            self.app,
            BRIDGE_TOKEN,
            clock=self.clock,
            timer_factory=self.timers,
            executor=self.executor,
            requests_client=self.requests,
        )
        self.client = self.app.test_client()
        self.auth = {"Authorization": f"Bearer {BRIDGE_TOKEN}"}

    def tearDown(self) -> None:
        self.bridge.close()

    def test_routes_are_post_only_and_unauthenticated_start_is_401_not_404(self):
        response = self.client.post("/storage-scan/start", json=start_payload())
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.headers["WWW-Authenticate"], "Bearer")
        self.assertEqual(self.client.get("/storage-scan/start").status_code, 405)

        rules = {
            (rule.rule, tuple(sorted(rule.methods - {"HEAD", "OPTIONS"})))
            for rule in self.app.url_map.iter_rules()
        }
        self.assertIn(("/storage-scan/start", ("POST",)), rules)
        self.assertIn(("/storage-scan/stop", ("POST",)), rules)

    def test_authorization_uses_compare_digest_even_when_header_is_absent(self):
        with patch(
            "label_server.storage_scan_bridge.hmac.compare_digest",
            wraps=hmac.compare_digest,
        ) as compare:
            missing = self.client.post("/storage-scan/start", json=start_payload())
            wrong = self.client.post(
                "/storage-scan/start",
                json=start_payload(),
                headers={"Authorization": "Bearer wrong"},
            )

        self.assertEqual(missing.status_code, 401)
        self.assertEqual(wrong.status_code, 401)
        self.assertEqual(compare.call_count, 2)

    def test_authentication_precedes_json_parsing(self):
        response = self.client.post(
            "/storage-scan/start",
            data="not-json",
            content_type="text/plain",
        )
        self.assertEqual(response.status_code, 401)

    def test_valid_start_and_exact_duplicate_are_idempotent(self):
        first = self.client.post(
            "/storage-scan/start", json=start_payload(), headers=self.auth
        )
        second = self.client.post(
            "/storage-scan/start", json=start_payload(), headers=self.auth
        )

        self.assertEqual(first.status_code, 200)
        self.assertEqual(first.get_json(), {"status": "started"})
        self.assertEqual(second.status_code, 200)
        self.assertEqual(second.get_json(), {"status": "active"})
        self.assertEqual(len(self.timers.timers), 1)

    def test_changed_same_session_and_other_active_session_conflict(self):
        self.assertEqual(
            self.client.post(
                "/storage-scan/start", json=start_payload(), headers=self.auth
            ).status_code,
            200,
        )
        changed = start_payload(callback_token="different.callback.token")
        other = start_payload(
            session_id=SESSION_TWO,
            unit_id="P12",
            target_type="pallet",
            number=12,
        )

        self.assertEqual(
            self.client.post(
                "/storage-scan/start", json=changed, headers=self.auth
            ).status_code,
            409,
        )
        self.assertEqual(
            self.client.post(
                "/storage-scan/start", json=other, headers=self.auth
            ).status_code,
            409,
        )

    def test_start_contract_rejects_non_exact_or_unsafe_data(self):
        cases = []

        extra = start_payload()
        extra["extra"] = True
        cases.append(extra)

        boolean_schema = start_payload()
        boolean_schema["schemaVersion"] = True
        cases.append(boolean_schema)

        short_session = start_payload()
        short_session["sessionId"] = "too-short"
        cases.append(short_session)

        unsupported_session_character = start_payload()
        unsupported_session_character["sessionId"] = "session.0123456789abcdef"
        unsupported_session_character["callback"]["url"] = (
            "https://magmo.cloud/api/storage-units/scan-sessions/"
            "session.0123456789abcdef/events"
        )
        cases.append(unsupported_session_character)

        mismatched_unit = start_payload()
        mismatched_unit["target"]["number"] = 64
        cases.append(mismatched_unit)

        mismatched_type = start_payload()
        mismatched_type["target"]["type"] = "pallet"
        cases.append(mismatched_type)

        callback_extra = start_payload()
        callback_extra["callback"]["extra"] = "no"
        cases.append(callback_extra)

        http_url = start_payload()
        http_url["callback"]["url"] = http_url["callback"]["url"].replace(
            "https://", "http://"
        )
        cases.append(http_url)

        subdomain = start_payload()
        subdomain["callback"]["url"] = subdomain["callback"]["url"].replace(
            "magmo.cloud", "scanner.magmo.cloud"
        )
        cases.append(subdomain)

        query = start_payload()
        query["callback"]["url"] += "?secret=1"
        cases.append(query)

        wrong_path_session = start_payload()
        wrong_path_session["callback"]["url"] = (
            "https://magmo.cloud/api/storage-units/scan-sessions/"
            f"{SESSION_TWO}/events"
        )
        cases.append(wrong_path_session)

        expired = start_payload(expires_at=NOW)
        cases.append(expired)

        token_with_space = start_payload(callback_token="not a bearer token")
        cases.append(token_with_space)

        for index, candidate in enumerate(cases):
            with self.subTest(case=index):
                response = self.client.post(
                    "/storage-scan/start", json=candidate, headers=self.auth
                )
                self.assertEqual(response.status_code, 400)
                self.assertFalse(self.bridge.has_active_session())

    def test_stop_is_idempotent_scrubs_credentials_and_blocks_resurrection(self):
        self.client.post("/storage-scan/start", json=start_payload(), headers=self.auth)
        active_reference = self.bridge._active
        first = self.client.post(
            "/storage-scan/stop", json=stop_payload(), headers=self.auth
        )
        duplicate = self.client.post(
            "/storage-scan/stop", json=stop_payload(), headers=self.auth
        )
        changed = self.client.post(
            "/storage-scan/stop",
            json=stop_payload(reason="completed"),
            headers=self.auth,
        )
        resurrection = self.client.post(
            "/storage-scan/start", json=start_payload(), headers=self.auth
        )

        self.assertEqual(first.status_code, 200)
        self.assertEqual(duplicate.status_code, 200)
        self.assertEqual(changed.status_code, 409)
        self.assertEqual(resurrection.status_code, 409)
        self.assertFalse(self.bridge.has_active_session())
        self.assertIsNotNone(active_reference)
        self.assertIsNone(active_reference.callback_url)
        self.assertIsNone(active_reference.callback_token)
        self.assertTrue(self.timers.timers[0].cancelled)

    def test_stale_duplicate_stop_never_stops_newer_session(self):
        self.client.post("/storage-scan/start", json=start_payload(), headers=self.auth)
        self.client.post("/storage-scan/stop", json=stop_payload(), headers=self.auth)

        second_start = start_payload(
            session_id=SESSION_TWO,
            unit_id="P12",
            target_type="pallet",
            number=12,
        )
        second_stop = stop_payload(
            session_id=SESSION_TWO,
            unit_id="P12",
            reason="completed",
        )
        self.assertEqual(
            self.client.post(
                "/storage-scan/start", json=second_start, headers=self.auth
            ).status_code,
            200,
        )
        stale = self.client.post(
            "/storage-scan/stop", json=stop_payload(), headers=self.auth
        )

        self.assertEqual(stale.status_code, 200)
        self.assertTrue(self.bridge.has_active_session())
        self.assertEqual(
            self.client.post(
                "/storage-scan/stop", json=second_stop, headers=self.auth
            ).status_code,
            200,
        )

    def test_wrong_or_unknown_stop_never_changes_active_session(self):
        self.client.post("/storage-scan/start", json=start_payload(), headers=self.auth)
        wrong_unit = self.client.post(
            "/storage-scan/stop",
            json=stop_payload(unit_id="B64"),
            headers=self.auth,
        )
        unknown = self.client.post(
            "/storage-scan/stop",
            json=stop_payload(session_id=SESSION_TWO),
            headers=self.auth,
        )
        self.assertEqual(wrong_unit.status_code, 409)
        self.assertEqual(unknown.status_code, 409)
        self.assertTrue(self.bridge.has_active_session())

    def test_stop_auth_and_unknown_idle_stop_statuses(self):
        self.assertEqual(
            self.client.post("/storage-scan/stop", json=stop_payload()).status_code,
            401,
        )
        self.assertEqual(
            self.client.post(
                "/storage-scan/stop", json=stop_payload(), headers=self.auth
            ).status_code,
            404,
        )


class StorageScanBridgeStateAndCallbackTests(unittest.TestCase):
    def setUp(self) -> None:
        self.clock = MutableClock()
        self.timers = ManualTimerFactory()
        self.executor = DeferredExecutor()
        self.requests = SequenceRequests()
        self.bridge = StorageScanBridge(
            BRIDGE_TOKEN,
            clock=self.clock,
            timer_factory=self.timers,
            executor=self.executor,
            requests_client=self.requests,
            event_id_factory=lambda: "event-0123456789abcdef",
        )

    def tearDown(self) -> None:
        self.bridge.close()

    def test_short_bridge_token_is_rejected(self):
        with self.assertRaises(ValueError):
            StorageScanBridge("short", executor=DeferredExecutor())
        with self.assertRaises(ValueError):
            StorageScanBridge("x" * 31 + " ", executor=DeferredExecutor())

    def test_idle_scan_is_false_and_active_scan_is_always_consumed(self):
        self.assertFalse(self.bridge.handle_scan("AIS17704"))
        self.bridge.start_session(start_payload())
        self.assertTrue(self.bridge.handle_scan("AIS17704\r\n"))
        self.assertTrue(self.bridge.handle_scan(""))
        self.assertTrue(self.bridge.handle_scan("bad\x00code"))
        self.assertEqual(len(self.executor.tasks), 1)

    def test_callback_contract_has_stable_event_and_delivery_controls(self):
        self.requests.actions = [204]
        self.bridge.start_session(start_payload())
        self.assertTrue(self.bridge.handle_scan("AIS17704\r"))
        self.executor.run_all()

        self.assertEqual(len(self.requests.calls), 1)
        url, kwargs = self.requests.calls[0]
        self.assertEqual(
            url,
            "https://magmo.cloud/api/storage-units/scan-sessions/"
            f"{SESSION_ONE}/events",
        )
        self.assertEqual(
            kwargs["json"],
            {
                "eventId": "event-0123456789abcdef",
                "code": "AIS17704",
                "scannedAt": "2026-08-28T12:00:00.000Z",
            },
        )
        self.assertEqual(
            kwargs["headers"]["Authorization"], f"Bearer {CALLBACK_TOKEN}"
        )
        self.assertEqual(kwargs["timeout"], 4.0)
        self.assertFalse(kwargs["allow_redirects"])

    def test_transient_network_and_5xx_retries_reuse_exact_payload_and_event_id(self):
        sleeps = []
        self.bridge._sleeper = sleeps.append
        self.requests.actions = [
            requests.ConnectionError("diagnostic must stay private"),
            503,
            202,
        ]
        self.bridge.start_session(start_payload())
        self.bridge.handle_scan("AIS17704")
        self.executor.run_all()

        self.assertEqual(len(self.requests.calls), 3)
        payloads = [call[1]["json"] for call in self.requests.calls]
        self.assertEqual(payloads[0], payloads[1])
        self.assertEqual(payloads[1], payloads[2])
        self.assertEqual(sleeps, [0.25, 0.5])
        for _url, kwargs in self.requests.calls:
            self.assertFalse(kwargs["allow_redirects"])
            self.assertEqual(kwargs["timeout"], 4.0)

    def test_nontransient_4xx_and_redirect_are_not_retried(self):
        for status in (400, 302):
            with self.subTest(status=status):
                local_requests = SequenceRequests([status])
                executor = DeferredExecutor()
                bridge = StorageScanBridge(
                    BRIDGE_TOKEN,
                    clock=self.clock,
                    timer_factory=ManualTimerFactory(),
                    executor=executor,
                    requests_client=local_requests,
                )
                try:
                    bridge.start_session(start_payload())
                    bridge.handle_scan("AIS17704")
                    executor.run_all()
                    self.assertEqual(len(local_requests.calls), 1)
                finally:
                    bridge.close()

    def test_stop_during_backoff_cancels_retry_and_scrubs_shared_credentials(self):
        self.requests.actions = [503, 204]
        self.bridge.start_session(start_payload())
        active_reference = self.bridge._active

        def stop_instead_of_sleep(_seconds):
            self.bridge.stop_session(stop_payload())

        self.bridge._sleeper = stop_instead_of_sleep
        self.bridge.handle_scan("AIS17704")
        self.executor.run_all()

        self.assertEqual(len(self.requests.calls), 1)
        self.assertFalse(self.bridge.has_active_session())
        self.assertIsNone(active_reference.callback_url)
        self.assertIsNone(active_reference.callback_token)

    def test_expiry_during_backoff_cancels_retry(self):
        self.requests.actions = [503, 204]
        expiration = NOW + timedelta(seconds=1)
        self.bridge.start_session(start_payload(expires_at=expiration))

        def expire_instead_of_sleep(_seconds):
            self.clock.advance(2)

        self.bridge._sleeper = expire_instead_of_sleep
        self.bridge.handle_scan("AIS17704")
        self.executor.run_all()

        self.assertEqual(len(self.requests.calls), 1)
        self.assertFalse(self.bridge.has_active_session())

    def test_expiry_timer_proactively_scrubs_and_tombstones_without_activity(self):
        expiration = NOW + timedelta(seconds=5)
        self.bridge.start_session(start_payload(expires_at=expiration))
        active_reference = self.bridge._active
        timer = self.timers.timers[-1]
        self.assertTrue(timer.started)
        self.assertEqual(timer.delay, 5.0)

        self.clock.advance(5)
        timer.fire()

        self.assertFalse(self.bridge.has_active_session())
        self.assertIsNone(active_reference.callback_url)
        self.assertIsNone(active_reference.callback_token)
        with self.assertRaises(SessionConflictError):
            self.bridge.start_session(start_payload(expires_at=expiration + timedelta(minutes=1)))

    def test_far_expiry_uses_safe_chunked_timers(self):
        expiration = NOW + timedelta(days=3650)
        self.bridge.start_session(start_payload(expires_at=expiration))
        first = self.timers.timers[-1]
        self.assertEqual(first.delay, 3600.0)

        self.clock.advance(3600)
        first.fire()
        second = self.timers.timers[-1]
        self.assertIsNot(first, second)
        self.assertEqual(second.delay, 3600.0)
        self.assertTrue(self.bridge.has_active_session())

    def test_callback_timeout_never_exceeds_remaining_expiration(self):
        self.requests.actions = [204]
        expiration = NOW + timedelta(milliseconds=250)
        self.bridge.start_session(start_payload(expires_at=expiration))
        self.bridge.handle_scan("AIS17704")
        self.executor.run_all()
        self.assertAlmostEqual(self.requests.calls[0][1]["timeout"], 0.25)

    def test_expired_session_can_accept_one_idempotent_stop_without_resurrection(self):
        expiration = NOW + timedelta(seconds=1)
        self.bridge.start_session(start_payload(expires_at=expiration))
        self.clock.advance(1)
        self.timers.timers[-1].fire()

        self.assertEqual(self.bridge.stop_session(stop_payload()), "stopped")
        self.assertEqual(self.bridge.stop_session(stop_payload()), "stopped")
        with self.assertRaises(SessionConflictError):
            self.bridge.stop_session(stop_payload(reason="completed"))

    def test_queued_event_has_no_callback_credentials_and_is_cancelled_by_stop(self):
        self.bridge.start_session(start_payload())
        self.bridge.handle_scan("AIS17704")
        _function, args, _kwargs = self.executor.tasks[0]
        queued_event = args[0]
        self.assertFalse(hasattr(queued_event, "callback_url"))
        self.assertFalse(hasattr(queued_event, "callback_token"))

        self.bridge.stop_session(stop_payload())
        self.executor.run_all()
        self.assertEqual(self.requests.calls, [])

    def test_logs_redact_code_callback_token_url_body_and_exception_message(self):
        stream = io.StringIO()
        logger = logging.getLogger(self.id())
        logger.handlers.clear()
        logger.propagate = False
        logger.setLevel(logging.DEBUG)
        handler = logging.StreamHandler(stream)
        logger.addHandler(handler)
        secret_exception = (
            "AIS17704 " + CALLBACK_TOKEN + " callback body must remain secret"
        )
        local_requests = SequenceRequests(
            [requests.ConnectionError(secret_exception), 204]
        )
        executor = DeferredExecutor()
        bridge = StorageScanBridge(
            BRIDGE_TOKEN,
            clock=self.clock,
            timer_factory=ManualTimerFactory(),
            executor=executor,
            requests_client=local_requests,
            sleeper=lambda _seconds: None,
            event_id_factory=lambda: "event-secret-body-field",
            logger=logger,
        )
        try:
            bridge.start_session(start_payload())
            bridge.handle_scan("AIS17704")
            executor.run_all()
        finally:
            bridge.close()
            logger.removeHandler(handler)

        logged = stream.getvalue()
        self.assertIn("ConnectionError", logged)
        self.assertNotIn("AIS17704", logged)
        self.assertNotIn(CALLBACK_TOKEN, logged)
        self.assertNotIn("magmo.cloud", logged)
        self.assertNotIn("callback body must remain secret", logged)
        self.assertNotIn("event-secret-body-field", logged)

    def test_concurrent_starts_allow_exactly_one_session(self):
        barrier = threading.Barrier(3)
        outcomes = []
        outcomes_lock = threading.Lock()
        first = start_payload()
        second = start_payload(
            session_id=SESSION_TWO,
            unit_id="P12",
            target_type="pallet",
            number=12,
        )

        def start(candidate):
            barrier.wait()
            try:
                result = self.bridge.start_session(candidate)
            except SessionConflictError:
                result = "conflict"
            with outcomes_lock:
                outcomes.append(result)

        threads = [
            threading.Thread(target=start, args=(first,)),
            threading.Thread(target=start, args=(second,)),
        ]
        for thread in threads:
            thread.start()
        barrier.wait()
        for thread in threads:
            thread.join(timeout=2)

        self.assertTrue(all(not thread.is_alive() for thread in threads))
        self.assertCountEqual(outcomes, ["started", "conflict"])
        self.assertTrue(self.bridge.has_active_session())

    def test_stop_waits_for_inflight_post_then_scrubs_credentials(self):
        blocking = BlockingRequests()
        bridge = StorageScanBridge(
            BRIDGE_TOKEN,
            clock=self.clock,
            timer_factory=ManualTimerFactory(),
            requests_client=blocking,
        )
        try:
            bridge.start_session(start_payload())
            active_reference = bridge._active
            bridge.handle_scan("AIS17704")
            self.assertTrue(blocking.entered.wait(1))

            outcomes = []
            stopper = threading.Thread(
                target=lambda: outcomes.append(bridge.stop_session(stop_payload()))
            )
            stopper.start()
            stopper.join(timeout=0.05)
            self.assertTrue(stopper.is_alive())
            self.assertFalse(bridge.has_active_session())
            self.assertIsNotNone(active_reference.callback_token)

            duplicate_stopper = threading.Thread(
                target=lambda: outcomes.append(bridge.stop_session(stop_payload()))
            )
            duplicate_stopper.start()
            duplicate_stopper.join(timeout=0.05)
            self.assertTrue(duplicate_stopper.is_alive())

            blocking.release.set()
            stopper.join(timeout=2)
            duplicate_stopper.join(timeout=2)
            self.assertFalse(stopper.is_alive())
            self.assertFalse(duplicate_stopper.is_alive())
            self.assertCountEqual(outcomes, ["stopped", "stopped"])
            self.assertIsNone(active_reference.callback_url)
            self.assertIsNone(active_reference.callback_token)
        finally:
            blocking.release.set()
            bridge.close()

    def test_blocked_event_does_not_prevent_next_event_delivery(self):
        blocking = FirstCallBlocksRequests()
        bridge = StorageScanBridge(
            BRIDGE_TOKEN,
            clock=self.clock,
            timer_factory=ManualTimerFactory(),
            requests_client=blocking,
        )
        try:
            bridge.start_session(start_payload())
            bridge.handle_scan("AIS17704")
            self.assertTrue(blocking.first_entered.wait(1))
            bridge.handle_scan("AIS17705")
            self.assertTrue(blocking.second_entered.wait(1))
        finally:
            blocking.release_first.set()
            bridge.close()

    def test_strict_direct_validation_does_not_echo_sensitive_values(self):
        candidate = start_payload()
        candidate["callback"]["url"] += "?bad=1"
        with self.assertRaisesRegex(RequestValidationError, "allowed Magmo endpoint") as raised:
            self.bridge.start_session(candidate)
        self.assertNotIn(CALLBACK_TOKEN, str(raised.exception))
        self.assertNotIn("?bad=1", str(raised.exception))


if __name__ == "__main__":
    unittest.main()

