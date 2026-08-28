"""Secure session bridge between Magmo and the warehouse scanner.

The bridge deliberately owns no Firebase credentials and performs no inventory
mutation.  It accepts authenticated start/stop signals, routes physical scans to
the per-session Magmo callback while a session is active, and opens only
allow-listed Magmo pages while idle.

All dependencies that cause side effects are injectable.  In particular, tests
can replace the HTTP callback sender, browser opener, clock, sleeper, and expiry
scheduler without touching the network, browser, or scanner hardware.
"""

from __future__ import annotations

import hmac
import json
import os
import re
import threading
import urllib.error
import urllib.parse
import urllib.request
import uuid
import webbrowser
from collections.abc import Callable, Mapping
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from typing import Any, Protocol

from flask import Blueprint, Flask, Response, jsonify, request
from werkzeug.exceptions import BadRequest


SCHEMA_VERSION = 1
SESSION_ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]{20,80}$")
EVENT_ID_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$")
CALLBACK_TOKEN_PATTERN = re.compile(r"^[A-Za-z0-9_-]{40,120}$")
STORAGE_UNIT_PATTERN = re.compile(r"^([BP])[\s_-]*(\d+)$", re.IGNORECASE)
BEARER_PATTERN = re.compile(r"^Bearer\s+([^\s]+)$", re.IGNORECASE)
CONTROL_CHARACTER_PATTERN = re.compile(r"[\x00-\x1f\x7f]")

MAX_REQUEST_BYTES = 16_384
MAX_SCAN_CHARACTERS = 180
MAX_SCAN_UTF8_BYTES = 360
MAX_SESSION_EVENTS = 250
MAX_SESSION_TTL_SECONDS = 900
CALLBACK_ROUTE_PREFIX = "/api/storage-units/scan-sessions/"
CALLBACK_ROUTE_SUFFIX = "/events"
DEFAULT_MAGMO_ORIGIN = "https://magmo.cloud"
DEFAULT_CALLBACK_ATTEMPTS = 3
DEFAULT_CALLBACK_TIMEOUT_SECONDS = 8.0
DEFAULT_RETRY_DELAYS_SECONDS = (0.0, 0.25, 0.75)
TERMINAL_CALLBACK_STATUSES = frozenset({400, 401, 403, 404, 409, 410, 413, 422})


class BridgeError(Exception):
    """Expected, sanitized bridge error suitable for an HTTP response."""

    def __init__(self, status_code: int, code: str, message: str) -> None:
        super().__init__(message)
        self.status_code = int(status_code)
        self.code = str(code)
        self.message = str(message)


class CallbackTransportError(Exception):
    """Sanitized marker for a callback transport failure."""


class CallbackSender(Protocol):
    def __call__(
        self,
        url: str,
        bearer_token: str,
        payload: Mapping[str, Any],
        *,
        timeout_seconds: float,
    ) -> Any: ...


def _raise(status_code: int, code: str, message: str) -> None:
    raise BridgeError(status_code, code, message)


def _clean_environment_value(value: Any, *, max_length: int = 1_000) -> str:
    text = str(value if value is not None else "").strip()
    if len(text) > max_length or CONTROL_CHARACTER_PATTERN.search(text):
        return ""
    return text


def _validate_secret(value: Any, *, minimum: int, maximum: int) -> bytes:
    text = str(value if value is not None else "")
    if (
        len(text) < minimum
        or len(text) > maximum
        or any(character.isspace() for character in text)
        or CONTROL_CHARACTER_PATTERN.search(text)
    ):
        _raise(503, "bridge_configuration_invalid", "The scanner bridge credential is not configured securely.")
    return text.encode("utf-8")


def _normalized_https_origin(value: Any) -> str:
    text = _clean_environment_value(value, max_length=500)
    if not text:
        return ""
    try:
        parsed = urllib.parse.urlsplit(text)
        port = parsed.port
    except (TypeError, ValueError):
        return ""
    if (
        parsed.scheme.lower() != "https"
        or not parsed.hostname
        or parsed.username
        or parsed.password
        or parsed.query
        or parsed.fragment
        or parsed.path not in ("", "/")
        or port not in (None, 443)
    ):
        return ""
    host = parsed.hostname.lower()
    return f"https://{host}"


def _split_origins(value: Any) -> tuple[str, ...]:
    raw = _clean_environment_value(value, max_length=4_000)
    candidates = re.split(r"[;,]", raw) if raw else [DEFAULT_MAGMO_ORIGIN]
    origins: list[str] = []
    for candidate in candidates:
        origin = _normalized_https_origin(candidate)
        if not origin:
            _raise(503, "bridge_configuration_invalid", "A callback origin is invalid.")
        if origin not in origins:
            origins.append(origin)
    if not origins:
        _raise(503, "bridge_configuration_invalid", "At least one callback origin is required.")
    return tuple(origins)


def _parse_positive_int(value: Any, *, default: int, minimum: int, maximum: int) -> int:
    if value in (None, ""):
        return default
    try:
        parsed = int(str(value), 10)
    except (TypeError, ValueError):
        _raise(503, "bridge_configuration_invalid", "A numeric scanner bridge setting is invalid.")
    if parsed < minimum or parsed > maximum:
        _raise(503, "bridge_configuration_invalid", "A numeric scanner bridge setting is out of range.")
    return parsed


def _parse_positive_float(value: Any, *, default: float, minimum: float, maximum: float) -> float:
    if value in (None, ""):
        return default
    try:
        parsed = float(str(value))
    except (TypeError, ValueError):
        _raise(503, "bridge_configuration_invalid", "A numeric scanner bridge setting is invalid.")
    if not minimum <= parsed <= maximum:
        _raise(503, "bridge_configuration_invalid", "A numeric scanner bridge setting is out of range.")
    return parsed


@dataclass(frozen=True, repr=False)
class BridgeSettings:
    """Validated service settings.  ``repr`` is disabled to protect secrets."""

    bridge_token: bytes = field(repr=False)
    allowed_callback_origins: tuple[str, ...]
    browser_base_origin: str
    callback_timeout_seconds: float = DEFAULT_CALLBACK_TIMEOUT_SECONDS
    callback_attempts: int = DEFAULT_CALLBACK_ATTEMPTS
    max_request_bytes: int = MAX_REQUEST_BYTES

    @classmethod
    def from_env(cls, environ: Mapping[str, Any] | None = None) -> "BridgeSettings":
        source = os.environ if environ is None else environ
        bridge_token = _validate_secret(
            source.get("STORAGE_SCAN_BRIDGE_TOKEN"), minimum=32, maximum=512
        )
        allowed_origins = _split_origins(source.get("STORAGE_SCAN_ALLOWED_CALLBACK_ORIGINS"))
        browser_origin = _normalized_https_origin(
            source.get("STORAGE_SCAN_BROWSER_BASE_URL", DEFAULT_MAGMO_ORIGIN)
        )
        if not browser_origin or browser_origin not in allowed_origins:
            _raise(
                503,
                "bridge_configuration_invalid",
                "The browser origin must be one of the allowed Magmo callback origins.",
            )
        timeout = _parse_positive_float(
            source.get("STORAGE_SCAN_CALLBACK_TIMEOUT_SECONDS"),
            default=DEFAULT_CALLBACK_TIMEOUT_SECONDS,
            minimum=1.0,
            maximum=30.0,
        )
        attempts = _parse_positive_int(
            source.get("STORAGE_SCAN_CALLBACK_ATTEMPTS"),
            default=DEFAULT_CALLBACK_ATTEMPTS,
            minimum=1,
            maximum=6,
        )
        request_bytes = _parse_positive_int(
            source.get("STORAGE_SCAN_MAX_REQUEST_BYTES"),
            default=MAX_REQUEST_BYTES,
            minimum=1_024,
            maximum=65_536,
        )
        return cls(
            bridge_token=bridge_token,
            allowed_callback_origins=allowed_origins,
            browser_base_origin=browser_origin,
            callback_timeout_seconds=timeout,
            callback_attempts=attempts,
            max_request_bytes=request_bytes,
        )


class _SecretBuffer:
    """Mutable in-memory secret so terminal session cleanup can overwrite it."""

    __slots__ = ("_value", "_scrubbed")

    def __init__(self, value: str) -> None:
        self._value = bytearray(value.encode("utf-8"))
        self._scrubbed = False

    @property
    def scrubbed(self) -> bool:
        return self._scrubbed

    def reveal(self) -> str:
        if self._scrubbed:
            return ""
        return bytes(self._value).decode("utf-8")

    def matches(self, candidate: str) -> bool:
        if self._scrubbed:
            return False
        return hmac.compare_digest(bytes(self._value), candidate.encode("utf-8"))

    def scrub(self) -> None:
        for index in range(len(self._value)):
            self._value[index] = 0
        self._scrubbed = True

    def __repr__(self) -> str:
        return "<session-secret scrubbed>" if self._scrubbed else "<session-secret redacted>"


@dataclass(frozen=True)
class TargetUnit:
    unit_id: str
    unit_type: str
    number: int


@dataclass(frozen=True, repr=False)
class StartRequest:
    session_id: str
    target: TargetUnit
    callback_url: str
    callback_token: str = field(repr=False)
    expires_at: datetime


@dataclass(frozen=True)
class StopRequest:
    session_id: str
    unit_id: str
    reason: str


@dataclass(repr=False)
class _PendingEvent:
    event_id: str
    code: str
    scanned_at: str
    attempts: int = 0

    def payload(self) -> dict[str, str]:
        return {
            "eventId": self.event_id,
            "code": self.code,
            "scannedAt": self.scanned_at,
        }

    def scrub(self) -> None:
        self.code = ""
        self.scanned_at = ""


@dataclass(repr=False)
class _ActiveSession:
    session_id: str
    bridge_session_id: str
    target: TargetUnit
    callback_url: str
    callback_token: _SecretBuffer = field(repr=False)
    expires_at: datetime
    cancel_expiry: Callable[[], None] | None = field(default=None, repr=False)
    pending_events: dict[str, _PendingEvent] = field(default_factory=dict, repr=False)
    events_created: int = 0


@dataclass(frozen=True)
class CallbackHttpResponse:
    status_code: int


@dataclass(frozen=True)
class ScanDispatchResult:
    mode: str
    accepted: bool
    delivered: bool = False
    event_id: str | None = None
    attempts: int = 0
    http_status: int | None = None
    destination: str | None = None
    error_code: str | None = None


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _default_schedule_expiry(delay_seconds: float, callback: Callable[[], None]) -> Callable[[], None]:
    timer = threading.Timer(max(0.0, delay_seconds), callback)
    timer.daemon = True
    timer.start()
    return timer.cancel


def _default_browser_opener(url: str) -> bool:
    return bool(webbrowser.open(url, new=2))


def _default_worker_launcher(target: Callable[[], None]) -> threading.Thread:
    worker = threading.Thread(target=target, name="storage-scan-callback", daemon=True)
    worker.start()
    return worker


def _default_callback_sender(
    url: str,
    bearer_token: str,
    payload: Mapping[str, Any],
    *,
    timeout_seconds: float,
) -> CallbackHttpResponse:
    body = json.dumps(dict(payload), separators=(",", ":"), ensure_ascii=True).encode("utf-8")
    outbound = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {bearer_token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "magmo-warehouse-scanner/1",
        },
    )
    try:
        with urllib.request.urlopen(outbound, timeout=timeout_seconds) as response:
            return CallbackHttpResponse(status_code=int(response.status))
    except urllib.error.HTTPError as error:
        # Do not read or include the response body; it may reflect submitted data.
        return CallbackHttpResponse(status_code=int(error.code))
    except Exception as error:
        # Preserve no URL, header, payload, or exception text in the raised marker.
        raise CallbackTransportError("The Magmo callback could not be delivered.") from error


def _ensure_exact_keys(value: Any, expected: set[str], *, code: str, message: str) -> dict[str, Any]:
    if not isinstance(value, dict) or set(value) != expected:
        _raise(400, code, message)
    return value


def _parse_schema_version(value: Any) -> None:
    if isinstance(value, bool) or not isinstance(value, int) or value != SCHEMA_VERSION:
        _raise(400, "invalid_schema_version", "The scanner request schema version is invalid.")


def _parse_session_id(value: Any) -> str:
    candidate = str(value if value is not None else "").strip()
    if not SESSION_ID_PATTERN.fullmatch(candidate):
        _raise(400, "invalid_session_id", "A valid scanner session ID is required.")
    return candidate


def _parse_storage_unit(value: Any) -> TargetUnit:
    data = _ensure_exact_keys(
        value,
        {"unitId", "type", "number"},
        code="invalid_target",
        message="The storage scan target is invalid.",
    )
    raw_id = str(data.get("unitId") if data.get("unitId") is not None else "").strip()
    match = STORAGE_UNIT_PATTERN.fullmatch(raw_id)
    if not match:
        _raise(400, "invalid_target", "The storage scan target is invalid.")
    number = int(match.group(2), 10)
    if number <= 0:
        _raise(400, "invalid_target", "The storage scan target is invalid.")
    prefix = match.group(1).upper()
    canonical_id = f"{prefix}{number}"
    expected_type = "bin" if prefix == "B" else "pallet"
    supplied_type = str(data.get("type") if data.get("type") is not None else "").strip().lower()
    supplied_number = data.get("number")
    if (
        supplied_type != expected_type
        or isinstance(supplied_number, bool)
        or not isinstance(supplied_number, int)
        or supplied_number != number
        or raw_id != canonical_id
    ):
        _raise(400, "invalid_target", "The storage scan target is inconsistent.")
    return TargetUnit(unit_id=canonical_id, unit_type=expected_type, number=number)


def _parse_expiry(value: Any, now: datetime) -> datetime:
    candidate = str(value if value is not None else "").strip()
    if not candidate or len(candidate) > 64:
        _raise(400, "invalid_expiry", "The scanner session expiry is invalid.")
    normalized = f"{candidate[:-1]}+00:00" if candidate.endswith(("Z", "z")) else candidate
    try:
        parsed = datetime.fromisoformat(normalized)
    except ValueError:
        _raise(400, "invalid_expiry", "The scanner session expiry is invalid.")
    if parsed.tzinfo is None:
        _raise(400, "invalid_expiry", "The scanner session expiry must include a timezone.")
    expiry = parsed.astimezone(timezone.utc)
    remaining = (expiry - now).total_seconds()
    if remaining <= 0 or remaining > MAX_SESSION_TTL_SECONDS:
        _raise(400, "invalid_expiry", "The scanner session expiry is outside the allowed window.")
    return expiry


def _origin_from_split(parsed: urllib.parse.SplitResult) -> str:
    try:
        port = parsed.port
    except ValueError:
        return ""
    if parsed.scheme.lower() != "https" or not parsed.hostname or port not in (None, 443):
        return ""
    return f"https://{parsed.hostname.lower()}"


def _validate_callback_url(
    value: Any,
    *,
    session_id: str,
    allowed_origins: tuple[str, ...],
) -> str:
    candidate = str(value if value is not None else "").strip()
    if not candidate or len(candidate) > 1_500 or CONTROL_CHARACTER_PATTERN.search(candidate):
        _raise(400, "invalid_callback", "The Magmo callback URL is invalid.")
    try:
        parsed = urllib.parse.urlsplit(candidate)
    except ValueError:
        _raise(400, "invalid_callback", "The Magmo callback URL is invalid.")
    expected_path = f"{CALLBACK_ROUTE_PREFIX}{session_id}{CALLBACK_ROUTE_SUFFIX}"
    if (
        parsed.username
        or parsed.password
        or parsed.query
        or parsed.fragment
        or _origin_from_split(parsed) not in allowed_origins
        or parsed.path != expected_path
    ):
        _raise(400, "invalid_callback", "The Magmo callback URL is not allowed.")
    return candidate


def _parse_start_request(
    payload: Any,
    *,
    now: datetime,
    allowed_origins: tuple[str, ...],
) -> StartRequest:
    data = _ensure_exact_keys(
        payload,
        {"schemaVersion", "sessionId", "target", "callback"},
        code="invalid_start_request",
        message="The scanner start request is invalid.",
    )
    _parse_schema_version(data.get("schemaVersion"))
    session_id = _parse_session_id(data.get("sessionId"))
    target = _parse_storage_unit(data.get("target"))
    callback = _ensure_exact_keys(
        data.get("callback"),
        {"url", "bearerToken", "expiresAt"},
        code="invalid_callback",
        message="The Magmo callback configuration is invalid.",
    )
    token = str(callback.get("bearerToken") if callback.get("bearerToken") is not None else "").strip()
    if not CALLBACK_TOKEN_PATTERN.fullmatch(token):
        _raise(400, "invalid_callback", "The Magmo callback credential is invalid.")
    callback_url = _validate_callback_url(
        callback.get("url"), session_id=session_id, allowed_origins=allowed_origins
    )
    expires_at = _parse_expiry(callback.get("expiresAt"), now)
    return StartRequest(
        session_id=session_id,
        target=target,
        callback_url=callback_url,
        callback_token=token,
        expires_at=expires_at,
    )


def _parse_stop_request(payload: Any) -> StopRequest:
    data = _ensure_exact_keys(
        payload,
        {"schemaVersion", "sessionId", "unitId", "reason"},
        code="invalid_stop_request",
        message="The scanner stop request is invalid.",
    )
    _parse_schema_version(data.get("schemaVersion"))
    session_id = _parse_session_id(data.get("sessionId"))
    raw_unit = str(data.get("unitId") if data.get("unitId") is not None else "").strip()
    unit_match = STORAGE_UNIT_PATTERN.fullmatch(raw_unit)
    if not unit_match or int(unit_match.group(2), 10) <= 0:
        _raise(400, "invalid_stop_request", "The scanner stop target is invalid.")
    unit_id = f"{unit_match.group(1).upper()}{int(unit_match.group(2), 10)}"
    if raw_unit != unit_id:
        _raise(400, "invalid_stop_request", "The scanner stop target is invalid.")
    reason = str(data.get("reason") if data.get("reason") is not None else "").strip().lower()
    if reason not in {"cancelled", "confirmed", "expired", "failed"}:
        _raise(400, "invalid_stop_request", "The scanner stop reason is invalid.")
    return StopRequest(session_id=session_id, unit_id=unit_id, reason=reason)


def _normalize_scan_code(raw_value: Any) -> str:
    value = str(raw_value if raw_value is not None else "").strip()
    if not value or len(value) > 2_048 or CONTROL_CHARACTER_PATTERN.search(value):
        return ""
    if value.lower().startswith(("http://", "https://")):
        try:
            parsed = urllib.parse.urlsplit(value)
        except ValueError:
            return ""
        if (
            _origin_from_split(parsed) != DEFAULT_MAGMO_ORIGIN
            or parsed.username
            or parsed.password
            or parsed.query
            or parsed.fragment
        ):
            return ""
        segments = [segment for segment in parsed.path.split("/") if segment]
        item_prefix = ["NewSearch", "item"]
        storage_prefix = ["NewSearch", "inventory", "storage"]
        if segments[:2] == item_prefix and len(segments) == 3:
            value = urllib.parse.unquote(segments[2])
        elif segments[:3] == storage_prefix and len(segments) == 4:
            value = urllib.parse.unquote(segments[3])
        else:
            return ""
    value = value.strip()
    if (
        not value
        or len(value) > MAX_SCAN_CHARACTERS
        or len(value.encode("utf-8")) > MAX_SCAN_UTF8_BYTES
        or CONTROL_CHARACTER_PATTERN.search(value)
        or "/" in value
        or "\\" in value
    ):
        return ""
    return value


def _canonical_storage_unit_id(value: str) -> str:
    match = STORAGE_UNIT_PATTERN.fullmatch(value)
    if not match:
        return ""
    number = int(match.group(2), 10)
    if number <= 0:
        return ""
    return f"{match.group(1).upper()}{number}"


def _format_scan_time(value: Any, now: datetime) -> str:
    if value is None:
        parsed = now
    elif isinstance(value, datetime):
        parsed = value
    else:
        candidate = str(value).strip()
        normalized = f"{candidate[:-1]}+00:00" if candidate.endswith(("Z", "z")) else candidate
        try:
            parsed = datetime.fromisoformat(normalized)
        except (TypeError, ValueError):
            return ""
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    parsed = parsed.astimezone(timezone.utc)
    if parsed < now - timedelta(hours=24) or parsed > now + timedelta(minutes=5):
        return ""
    return parsed.isoformat(timespec="milliseconds").replace("+00:00", "Z")


def _response_status(value: Any) -> int:
    if isinstance(value, bool):
        return 0
    if isinstance(value, int):
        return value
    try:
        return int(value.status_code)
    except (AttributeError, TypeError, ValueError):
        return 0


class StorageScanBridge:
    """Thread-safe, single-session scanner state machine."""

    def __init__(
        self,
        settings: BridgeSettings,
        *,
        callback_sender: CallbackSender | None = None,
        browser_opener: Callable[[str], bool] | None = None,
        clock: Callable[[], datetime] | None = None,
        event_id_factory: Callable[[], str] | None = None,
        sleeper: Callable[[float], None] | None = None,
        schedule_expiry: Callable[[float, Callable[[], None]], Callable[[], None]] | None = None,
        worker_launcher: Callable[[Callable[[], None]], Any] | None = None,
        scanner_ready: bool = False,
    ) -> None:
        if not isinstance(settings, BridgeSettings):
            raise TypeError("settings must be a BridgeSettings instance")
        self.settings = settings
        self._callback_sender = callback_sender or _default_callback_sender
        self._browser_opener = browser_opener or _default_browser_opener
        self._clock = clock or _utc_now
        self._event_id_factory = event_id_factory or (lambda: uuid.uuid4().hex)
        self._sleeper = sleeper or __import__("time").sleep
        self._schedule_expiry = schedule_expiry or _default_schedule_expiry
        self._worker_launcher = worker_launcher or _default_worker_launcher
        self._lock = threading.RLock()
        self._active: _ActiveSession | None = None
        self._delivery_worker: Any = None
        self._delivery_worker_running = False
        self._scanner_ready = bool(scanner_ready)
        self._closed = False

    def _now(self) -> datetime:
        value = self._clock()
        if not isinstance(value, datetime):
            raise TypeError("clock must return datetime")
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)
        return value.astimezone(timezone.utc)

    def authorize(self, authorization_header: Any) -> None:
        header = str(authorization_header if authorization_header is not None else "").strip()
        match = BEARER_PATTERN.fullmatch(header)
        candidate = match.group(1).encode("utf-8") if match else b""
        if not candidate or not hmac.compare_digest(candidate, self.settings.bridge_token):
            _raise(401, "invalid_bridge_token", "The scanner bridge credential is invalid.")

    @property
    def scanner_ready(self) -> bool:
        with self._lock:
            return bool(not self._closed and self._scanner_ready)

    def set_scanner_ready(self, ready: bool) -> None:
        """Set physical-listener readiness without exposing hardware details.

        A listener failure immediately terminates and scrubs an active session.
        The authenticated stop route remains available and idempotent, allowing
        Magmo to finish its own cleanup even while hardware is unavailable.
        """

        with self._lock:
            if self._closed:
                self._scanner_ready = False
                return
            self._scanner_ready = bool(ready)
            if not self._scanner_ready:
                self._clear_active_locked()

    def _clear_active_locked(self) -> _ActiveSession | None:
        active = self._active
        self._active = None
        if active is None:
            return None
        if active.cancel_expiry is not None:
            try:
                active.cancel_expiry()
            except Exception:
                pass
            active.cancel_expiry = None
        active.callback_token.scrub()
        for pending in active.pending_events.values():
            pending.scrub()
        active.pending_events.clear()
        return active

    def _expire_locked(self, now: datetime) -> bool:
        if self._active is None or self._active.expires_at > now:
            return False
        self._clear_active_locked()
        return True

    def _expire_if_current(self, session_id: str, bridge_session_id: str) -> None:
        with self._lock:
            active = self._active
            if (
                active is None
                or active.session_id != session_id
                or active.bridge_session_id != bridge_session_id
            ):
                return
            if active.expires_at <= self._now():
                self._clear_active_locked()

    @staticmethod
    def _same_start(active: _ActiveSession, incoming: StartRequest) -> bool:
        return (
            active.session_id == incoming.session_id
            and active.target == incoming.target
            and active.callback_url == incoming.callback_url
            and active.expires_at == incoming.expires_at
            and active.callback_token.matches(incoming.callback_token)
        )

    def start_session(self, payload: Any) -> tuple[dict[str, Any], bool]:
        now = self._now()
        with self._lock:
            if self._closed:
                _raise(503, "bridge_closed", "The scanner bridge is shutting down.")
            if not self._scanner_ready:
                _raise(
                    503,
                    "scanner_input_unavailable",
                    "The physical warehouse scanner is unavailable.",
                )
        incoming = _parse_start_request(
            payload, now=now, allowed_origins=self.settings.allowed_callback_origins
        )
        with self._lock:
            if self._closed:
                _raise(503, "bridge_closed", "The scanner bridge is shutting down.")
            if not self._scanner_ready:
                _raise(
                    503,
                    "scanner_input_unavailable",
                    "The physical warehouse scanner is unavailable.",
                )
            self._expire_locked(now)
            if self._active is not None:
                if self._same_start(self._active, incoming):
                    return self._public_start_response(self._active, idempotent=True), False
                if self._active.session_id == incoming.session_id:
                    _raise(409, "session_id_conflict", "This scanner session ID is already active with different settings.")
                _raise(409, "scanner_busy", "The warehouse scanner is already assigned to another session.")

            bridge_session_id = f"warehouse-reader:{uuid.uuid4().hex}"
            active = _ActiveSession(
                session_id=incoming.session_id,
                bridge_session_id=bridge_session_id,
                target=incoming.target,
                callback_url=incoming.callback_url,
                callback_token=_SecretBuffer(incoming.callback_token),
                expires_at=incoming.expires_at,
            )
            self._active = active
            delay = max(0.0, (active.expires_at - now).total_seconds())
            try:
                active.cancel_expiry = self._schedule_expiry(
                    delay,
                    lambda: self._expire_if_current(active.session_id, active.bridge_session_id),
                )
            except Exception:
                self._clear_active_locked()
                _raise(503, "expiry_scheduler_unavailable", "The scanner session could not be scheduled safely.")
            return self._public_start_response(active, idempotent=False), True

    @staticmethod
    def _public_start_response(active: _ActiveSession, *, idempotent: bool) -> dict[str, Any]:
        return {
            "ok": True,
            "sessionId": active.bridge_session_id,
            "bridgeSessionId": active.bridge_session_id,
            "magmoSessionId": active.session_id,
            "unitId": active.target.unit_id,
            "expiresAt": active.expires_at.isoformat(timespec="milliseconds").replace("+00:00", "Z"),
            "idempotent": idempotent,
        }

    def stop_session(self, payload: Any) -> dict[str, Any]:
        incoming = _parse_stop_request(payload)
        with self._lock:
            if self._closed:
                return {"ok": True, "stopped": True, "alreadyStopped": True}
            self._expire_locked(self._now())
            active = self._active
            if active is None:
                return {
                    "ok": True,
                    "stopped": True,
                    "alreadyStopped": True,
                    "magmoSessionId": incoming.session_id,
                }
            if active.session_id != incoming.session_id:
                _raise(409, "stale_stop", "This stop signal does not own the active scanner session.")
            if active.target.unit_id != incoming.unit_id:
                _raise(409, "session_target_conflict", "This stop signal does not match the active target.")
            bridge_session_id = active.bridge_session_id
            self._clear_active_locked()
            return {
                "ok": True,
                "stopped": True,
                "alreadyStopped": False,
                "sessionId": bridge_session_id,
                "bridgeSessionId": bridge_session_id,
                "magmoSessionId": incoming.session_id,
                "reason": incoming.reason,
            }

    def _next_event_id(self) -> str:
        suffix = str(self._event_id_factory()).strip()
        candidate = f"warehouse-reader:{suffix}"
        if not EVENT_ID_PATTERN.fullmatch(candidate):
            raise RuntimeError("event_id_factory returned an invalid value")
        return candidate

    def _idle_destination(self, code: str) -> str:
        storage_unit_id = _canonical_storage_unit_id(code)
        if storage_unit_id:
            path = f"/NewSearch/inventory/storage/{urllib.parse.quote(storage_unit_id, safe='')}"
        else:
            path = f"/NewSearch/item/{urllib.parse.quote(code, safe='')}"
        return f"{self.settings.browser_base_origin}{path}"

    def _route_scan(
        self,
        raw_code: Any,
        scanned_at: Any = None,
        *,
        asynchronous_callback: bool,
    ) -> ScanDispatchResult:
        code = _normalize_scan_code(raw_code)
        if not code:
            return ScanDispatchResult(mode="rejected", accepted=False, error_code="invalid_scan_code")
        now = self._now()
        scan_time = _format_scan_time(scanned_at, now)
        if not scan_time:
            return ScanDispatchResult(mode="rejected", accepted=False, error_code="invalid_scan_time")

        with self._lock:
            if self._closed:
                return ScanDispatchResult(mode="rejected", accepted=False, error_code="bridge_closed")
            if not self._scanner_ready:
                return ScanDispatchResult(
                    mode="rejected",
                    accepted=False,
                    error_code="scanner_input_unavailable",
                )
            self._expire_locked(now)
            active = self._active
            if active is None:
                destination = self._idle_destination(code)
            else:
                if active.events_created >= MAX_SESSION_EVENTS:
                    self._clear_active_locked()
                    return ScanDispatchResult(
                        mode="callback", accepted=False, error_code="session_event_limit"
                    )
                event_id = self._next_event_id()
                while event_id in active.pending_events:
                    event_id = self._next_event_id()
                active.events_created += 1
                active.pending_events[event_id] = _PendingEvent(
                    event_id=event_id,
                    code=code,
                    scanned_at=scan_time,
                )
                destination = ""

        if destination:
            try:
                opened = bool(self._browser_opener(destination))
            except Exception:
                opened = False
            return ScanDispatchResult(
                mode="browser",
                accepted=True,
                delivered=opened,
                destination=destination,
                error_code=None if opened else "browser_open_failed",
            )

        # This branch is intentionally callback-only. Delivery failure must
        # never fall through to browser navigation. Physical-device callbacks
        # enqueue work so HTTP retry delays never block the input message loop.
        if asynchronous_callback:
            self._ensure_delivery_worker()
            return ScanDispatchResult(
                mode="callback",
                accepted=True,
                delivered=False,
                event_id=event_id,
                attempts=0,
                error_code="callback_queued",
            )
        return self._deliver_pending_event(event_id)

    def route_scan(self, raw_code: Any, scanned_at: Any = None) -> ScanDispatchResult:
        """Route a scan and synchronously attempt callback delivery.

        Runtime device readers should call :meth:`handle_scan_frame`, whose
        callback delivery path is asynchronous. This synchronous entry point is
        useful for explicit local operations and deterministic tests.
        """

        return self._route_scan(
            raw_code,
            scanned_at,
            asynchronous_callback=False,
        )

    def handle_scan_frame(self, frame: Any) -> ScanDispatchResult:
        """Adapter for ``device_input.ScanFrame`` without importing that module."""

        return self._route_scan(
            getattr(frame, "code", None),
            scanned_at=getattr(frame, "received_at", None),
            asynchronous_callback=True,
        )

    def _ensure_delivery_worker(self) -> None:
        with self._lock:
            if self._closed or self._delivery_worker_running:
                return
            active = self._active
            if active is None or not active.pending_events:
                return
            self._delivery_worker_running = True
            try:
                self._delivery_worker = self._worker_launcher(self._delivery_worker_loop)
            except Exception:
                self._delivery_worker_running = False
                self._delivery_worker = None

    def _delivery_worker_loop(self) -> None:
        try:
            with self._lock:
                self._expire_locked(self._now())
                active = self._active
                event_ids = tuple(active.pending_events) if active is not None else ()
            for event_id in event_ids:
                result = self._deliver_pending_event(event_id)
                if result.error_code in {"callback_rejected", "session_closed"}:
                    return
        finally:
            should_restart = False
            with self._lock:
                self._delivery_worker_running = False
                self._delivery_worker = None
                active = self._active
                should_restart = bool(
                    not self._closed
                    and active is not None
                    and active.pending_events
                    and any(event.attempts == 0 for event in active.pending_events.values())
                )
            # A frame may have arrived while this worker was exiting. Restart
            # only when every remaining event is new; exhausted events wait for
            # an explicit retry rather than causing an offline busy loop.
            if should_restart:
                self._ensure_delivery_worker()

    def _callback_snapshot(
        self, event_id: str
    ) -> tuple[str, str, str, dict[str, str], int] | None:
        with self._lock:
            self._expire_locked(self._now())
            active = self._active
            if active is None:
                return None
            pending = active.pending_events.get(event_id)
            if pending is None:
                return None
            token = active.callback_token.reveal()
            if not token:
                return None
            pending.attempts += 1
            return (
                active.session_id,
                active.callback_url,
                token,
                pending.payload(),
                pending.attempts,
            )

    def _complete_event(self, session_id: str, event_id: str) -> None:
        with self._lock:
            active = self._active
            if active is None or active.session_id != session_id:
                return
            pending = active.pending_events.pop(event_id, None)
            if pending is not None:
                pending.scrub()

    def _terminate_from_callback(self, session_id: str) -> None:
        with self._lock:
            if self._active is not None and self._active.session_id == session_id:
                self._clear_active_locked()

    def _deliver_pending_event(self, event_id: str) -> ScanDispatchResult:
        last_status: int | None = None
        delivered_attempts = 0
        for attempt_index in range(self.settings.callback_attempts):
            snapshot = self._callback_snapshot(event_id)
            if snapshot is None:
                return ScanDispatchResult(
                    mode="callback",
                    accepted=False,
                    delivered=False,
                    event_id=event_id,
                    attempts=delivered_attempts,
                    http_status=last_status,
                    error_code="session_closed",
                )
            session_id, callback_url, callback_token, payload, total_attempts = snapshot
            delivered_attempts += 1
            try:
                response = self._callback_sender(
                    callback_url,
                    callback_token,
                    payload,
                    timeout_seconds=self.settings.callback_timeout_seconds,
                )
                status = _response_status(response)
            except Exception:
                status = 0
            finally:
                callback_token = ""
            last_status = status or None
            if status in (200, 202):
                self._complete_event(session_id, event_id)
                return ScanDispatchResult(
                    mode="callback",
                    accepted=True,
                    delivered=True,
                    event_id=event_id,
                    attempts=delivered_attempts,
                    http_status=status,
                )
            if status in TERMINAL_CALLBACK_STATUSES or 400 <= status < 500 and status != 429:
                self._terminate_from_callback(session_id)
                return ScanDispatchResult(
                    mode="callback",
                    accepted=False,
                    delivered=False,
                    event_id=event_id,
                    attempts=delivered_attempts,
                    http_status=status or None,
                    error_code="callback_rejected",
                )
            if attempt_index + 1 < self.settings.callback_attempts:
                delay_index = min(attempt_index + 1, len(DEFAULT_RETRY_DELAYS_SECONDS) - 1)
                delay = DEFAULT_RETRY_DELAYS_SECONDS[delay_index]
                if delay > 0:
                    self._sleeper(delay)

        return ScanDispatchResult(
            mode="callback",
            accepted=True,
            delivered=False,
            event_id=event_id,
            attempts=delivered_attempts,
            http_status=last_status,
            error_code="callback_retry_pending",
        )

    def retry_pending_events(self) -> tuple[ScanDispatchResult, ...]:
        with self._lock:
            self._expire_locked(self._now())
            if self._delivery_worker_running:
                return ()
            active = self._active
            event_ids = tuple(active.pending_events) if active is not None else ()
        return tuple(self._deliver_pending_event(event_id) for event_id in event_ids)

    def status_snapshot(self) -> dict[str, Any]:
        with self._lock:
            self._expire_locked(self._now())
            active = self._active
            if active is None:
                return {"active": False, "pendingEventCount": 0}
            return {
                "active": True,
                "magmoSessionId": active.session_id,
                "unitId": active.target.unit_id,
                "expiresAt": active.expires_at.isoformat(timespec="milliseconds").replace("+00:00", "Z"),
                "pendingEventCount": len(active.pending_events),
            }

    def close(self) -> None:
        with self._lock:
            self._closed = True
            self._scanner_ready = False
            self._clear_active_locked()


def _read_json_request(max_bytes: int) -> Any:
    if request.content_length is not None and request.content_length > max_bytes:
        _raise(413, "request_too_large", "The scanner bridge request is too large.")
    if request.mimetype != "application/json":
        _raise(415, "json_required", "The scanner bridge requires an application/json request.")
    try:
        payload = request.get_json(force=False, silent=False)
    except BadRequest:
        _raise(400, "invalid_json", "The scanner bridge request contains invalid JSON.")
    if not isinstance(payload, dict):
        _raise(400, "invalid_request", "The scanner bridge request must be a JSON object.")
    return payload


def register_storage_scan_routes(
    app: Flask,
    bridge: StorageScanBridge,
    url_prefix: str = "",
) -> StorageScanBridge:
    """Register authenticated scanner control routes on an existing Flask app."""

    if not isinstance(bridge, StorageScanBridge):
        raise TypeError("bridge must be a StorageScanBridge instance")
    prefix = str(url_prefix or "").rstrip("/")
    blueprint = Blueprint(f"storage_scan_bridge_{id(bridge):x}", __name__)

    @blueprint.after_request
    def _secure_response(response: Response) -> Response:
        response.headers["Cache-Control"] = "no-store, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response

    @blueprint.errorhandler(BridgeError)
    def _expected_error(error: BridgeError) -> tuple[Response, int]:
        return jsonify({"ok": False, "code": error.code, "error": error.message}), error.status_code

    @blueprint.route("/storage-scan/start", methods=["POST"], strict_slashes=True)
    def _start() -> tuple[Response, int]:
        bridge.authorize(request.headers.get("Authorization"))
        payload = _read_json_request(bridge.settings.max_request_bytes)
        response_payload, created = bridge.start_session(payload)
        return jsonify(response_payload), 201 if created else 200

    @blueprint.route("/storage-scan/stop", methods=["POST"], strict_slashes=True)
    def _stop() -> tuple[Response, int]:
        bridge.authorize(request.headers.get("Authorization"))
        payload = _read_json_request(bridge.settings.max_request_bytes)
        return jsonify(bridge.stop_session(payload)), 200

    app.register_blueprint(blueprint, url_prefix=prefix)
    return bridge


__all__ = [
    "BridgeError",
    "BridgeSettings",
    "CallbackHttpResponse",
    "CallbackTransportError",
    "ScanDispatchResult",
    "StorageScanBridge",
    "register_storage_scan_routes",
]
