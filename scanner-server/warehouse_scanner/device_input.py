"""Device-specific barcode scanner input for the warehouse bridge.

This module deliberately does *not* use a global keyboard hook and does not
guess that fast typing is a scan.  A production listener must be configured
with exactly one explicit source:

* ``SCANNER_DEVICE_MATCH`` for a Windows Raw Input keyboard device; or
* ``SCANNER_SERIAL_PORT`` for a scanner configured as a serial/COM device.

Raw Input preserves the originating Windows device handle, which lets the
listener ignore the user's physical keyboard even when another application has
focus. Frames complete on a scanner suffix (Enter or Tab by default) or, for an
already allowlisted device only, a configurable idle framing timeout. Elapsed
typing time is never used to decide which device is a scanner.
"""

from __future__ import annotations

import codecs
import fnmatch
import os
import re
import sys
import threading
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Callable, Iterable, Mapping, Optional, Protocol, Sequence


DEFAULT_MAX_SCAN_LENGTH = 180
DEFAULT_SERIAL_BAUD = 9600
DEFAULT_TERMINATORS = ("\r", "\n", "\t")
DEFAULT_IDLE_FLUSH_SECONDS = 0.18


class ScannerInputError(RuntimeError):
    """Base error for scanner input configuration or runtime failures."""


class ScannerInputConfigurationError(ScannerInputError):
    """The scanner input source is missing, ambiguous, or unsafe."""


class ScannerInputUnavailableError(ScannerInputError):
    """The configured device backend is unavailable on this host."""


class ScannerCalibrationError(ScannerInputError):
    """A scanner device could not be identified safely during calibration."""


@dataclass(frozen=True)
class ScanFrame:
    """One terminated scan from a verified device."""

    code: str
    source: str
    device_id: str
    received_at: datetime


@dataclass(frozen=True)
class DeviceCandidate:
    """A device that can be shown by a local listing/calibration command."""

    source: str
    device_id: str
    description: str
    suggested_match: str


class ScannerInput(Protocol):
    """Small lifecycle contract used by the session bridge."""

    @property
    def running(self) -> bool: ...

    def start(self) -> None: ...

    def stop(self, timeout: float = 5.0) -> None: ...


ScanCallback = Callable[[ScanFrame], None]
ErrorCallback = Callable[[Exception], None]


def _parse_positive_int(raw: object, *, name: str, default: int) -> int:
    value = str(raw if raw is not None else default).strip()
    try:
        parsed = int(value)
    except (TypeError, ValueError) as exc:
        raise ScannerInputConfigurationError(f"{name} must be an integer") from exc
    if parsed <= 0:
        raise ScannerInputConfigurationError(f"{name} must be greater than zero")
    return parsed


def _parse_idle_flush_seconds(raw: object) -> Optional[float]:
    if raw is None or not str(raw).strip():
        return DEFAULT_IDLE_FLUSH_SECONDS
    try:
        milliseconds = float(str(raw).strip())
    except (TypeError, ValueError) as exc:
        raise ScannerInputConfigurationError(
            "SCANNER_IDLE_FLUSH_MS must be a number"
        ) from exc
    if milliseconds < 0 or milliseconds > 10_000:
        raise ScannerInputConfigurationError(
            "SCANNER_IDLE_FLUSH_MS must be between 0 and 10000"
        )
    return None if milliseconds == 0 else milliseconds / 1000.0


def _parse_terminators(raw: object) -> tuple[str, ...]:
    if raw is None or not str(raw).strip():
        return DEFAULT_TERMINATORS

    aliases = {
        "CR": "\r",
        "ENTER": "\r",
        "RETURN": "\r",
        "LF": "\n",
        "NEWLINE": "\n",
        "TAB": "\t",
    }
    result: list[str] = []
    for token in re.split(r"[,;]", str(raw)):
        normalized = token.strip().upper()
        if not normalized:
            continue
        value = aliases.get(normalized)
        if value is None:
            raise ScannerInputConfigurationError(
                "SCANNER_FRAME_TERMINATORS supports only ENTER/CR, LF, and TAB"
            )
        if value not in result:
            result.append(value)
    if not result:
        raise ScannerInputConfigurationError(
            "SCANNER_FRAME_TERMINATORS must contain at least one terminator"
        )
    return tuple(result)


def parse_device_match_patterns(raw: object) -> tuple[str, ...]:
    """Parse semicolon-delimited, explicit device matching expressions.

    ``exact:<path>`` performs a case-insensitive exact match. ``glob:<pattern>``
    supports shell wildcards. An unprefixed value is treated as an exact path.
    Match-all expressions are rejected for production capture.
    """

    if raw is None:
        return ()
    values = tuple(part.strip() for part in str(raw).split(";") if part.strip())
    for value in values:
        mode, _, expression = value.partition(":")
        if mode.casefold() in {"exact", "glob"}:
            candidate = expression.strip()
            if not candidate:
                raise ScannerInputConfigurationError(
                    "SCANNER_DEVICE_MATCH contains an empty expression"
                )
            if mode.casefold() == "glob":
                literal = re.sub(r"[*?]", "", candidate).strip()
                if len(literal) < 8:
                    raise ScannerInputConfigurationError(
                        "SCANNER_DEVICE_MATCH glob is too broad; use an exact path "
                        "or include a stable VID/PID and interface identifier"
                    )
        elif value in {"*", "?"}:
            raise ScannerInputConfigurationError(
                "SCANNER_DEVICE_MATCH may not match every keyboard"
            )
    return values


@dataclass(frozen=True)
class DeviceInputConfig:
    """Validated, fail-closed scanner input configuration."""

    device_match: tuple[str, ...] = ()
    serial_port: Optional[str] = None
    serial_baud: int = DEFAULT_SERIAL_BAUD
    max_scan_length: int = DEFAULT_MAX_SCAN_LENGTH
    terminators: tuple[str, ...] = DEFAULT_TERMINATORS
    idle_flush_seconds: Optional[float] = DEFAULT_IDLE_FLUSH_SECONDS

    @classmethod
    def from_env(
        cls, env: Optional[Mapping[str, object]] = None
    ) -> "DeviceInputConfig":
        source = os.environ if env is None else env
        matches = parse_device_match_patterns(source.get("SCANNER_DEVICE_MATCH"))
        serial_port = str(source.get("SCANNER_SERIAL_PORT") or "").strip() or None

        if bool(matches) == bool(serial_port):
            raise ScannerInputConfigurationError(
                "Configure exactly one scanner source: SCANNER_DEVICE_MATCH or "
                "SCANNER_SERIAL_PORT"
            )

        serial_baud = _parse_positive_int(
            source.get("SCANNER_SERIAL_BAUD"),
            name="SCANNER_SERIAL_BAUD",
            default=DEFAULT_SERIAL_BAUD,
        )
        if serial_baud > 4_000_000:
            raise ScannerInputConfigurationError(
                "SCANNER_SERIAL_BAUD is outside the supported range"
            )

        max_scan_length = _parse_positive_int(
            source.get("SCANNER_MAX_CODE_LENGTH"),
            name="SCANNER_MAX_CODE_LENGTH",
            default=DEFAULT_MAX_SCAN_LENGTH,
        )
        if max_scan_length > DEFAULT_MAX_SCAN_LENGTH:
            raise ScannerInputConfigurationError(
                f"SCANNER_MAX_CODE_LENGTH may not exceed {DEFAULT_MAX_SCAN_LENGTH}"
            )

        return cls(
            device_match=matches,
            serial_port=serial_port,
            serial_baud=serial_baud,
            max_scan_length=max_scan_length,
            terminators=_parse_terminators(source.get("SCANNER_FRAME_TERMINATORS")),
            idle_flush_seconds=_parse_idle_flush_seconds(
                source.get("SCANNER_IDLE_FLUSH_MS")
            ),
        )


class FrameAssembler:
    """Build suffix-terminated frames without any typing-speed heuristic."""

    def __init__(
        self,
        *,
        max_length: int = DEFAULT_MAX_SCAN_LENGTH,
        terminators: Sequence[str] = DEFAULT_TERMINATORS,
    ) -> None:
        if max_length <= 0:
            raise ValueError("max_length must be greater than zero")
        if not terminators or any(len(value) != 1 for value in terminators):
            raise ValueError("terminators must contain one-character values")
        self.max_length = max_length
        self.terminators = frozenset(terminators)
        self._buffer: list[str] = []
        self._discard_until_terminator = False
        self.overflow_count = 0
        self.invalid_control_count = 0

    @property
    def pending_length(self) -> int:
        return len(self._buffer)

    def clear(self) -> None:
        self._buffer.clear()
        self._discard_until_terminator = False

    def feed(self, text: str) -> tuple[str, ...]:
        frames: list[str] = []
        for char in text:
            if char in self.terminators:
                if not self._discard_until_terminator and self._buffer:
                    value = "".join(self._buffer).strip()
                    if value:
                        frames.append(value)
                self._buffer.clear()
                self._discard_until_terminator = False
                continue

            if self._discard_until_terminator:
                continue

            if char == "\b":
                if self._buffer:
                    self._buffer.pop()
                continue

            if char == "\x1b":
                self._buffer.clear()
                continue

            if ord(char) < 32 or ord(char) == 127:
                self.invalid_control_count += 1
                self._buffer.clear()
                self._discard_until_terminator = True
                continue

            if len(self._buffer) >= self.max_length:
                self.overflow_count += 1
                self._buffer.clear()
                self._discard_until_terminator = True
                continue

            self._buffer.append(char)
        return tuple(frames)

    def flush_pending(self) -> tuple[str, ...]:
        """Flush one pending frame after an allowlisted device becomes idle.

        The caller is responsible for applying this only after device identity
        has already been established. It is a framing fallback for scanners
        without a suffix, not a way to classify a keyboard by typing speed.
        """

        if self._discard_until_terminator:
            self.clear()
            return ()
        if not self._buffer:
            return ()
        value = "".join(self._buffer).strip()
        self._buffer.clear()
        return (value,) if value else ()


def device_path_matches(device_path: str, patterns: Iterable[str]) -> bool:
    """Return whether a Raw Input device path matches an explicit expression."""

    normalized_path = str(device_path).casefold()
    for raw_pattern in patterns:
        pattern = str(raw_pattern).strip()
        mode, separator, expression = pattern.partition(":")
        if separator and mode.casefold() in {"exact", "glob"}:
            candidate = expression.casefold()
            if mode.casefold() == "exact" and normalized_path == candidate:
                return True
            if mode.casefold() == "glob" and fnmatch.fnmatchcase(
                normalized_path, candidate
            ):
                return True
        elif normalized_path == pattern.casefold():
            return True
    return False


def suggest_device_match(device_path: str) -> str:
    """Return an exact expression safe to paste into SCANNER_DEVICE_MATCH."""

    value = str(device_path).strip()
    if not value:
        raise ValueError("device_path must not be empty")
    return f"exact:{value}"


def _notify_error(callback: Optional[ErrorCallback], error: Exception) -> None:
    if callback is not None:
        try:
            callback(error)
        except Exception:
            # An error-reporting callback must never terminate device capture.
            pass


class _CallbackMixin:
    def __init__(
        self,
        on_scan: ScanCallback,
        on_error: Optional[ErrorCallback],
    ) -> None:
        if not callable(on_scan):
            raise TypeError("on_scan must be callable")
        self._on_scan = on_scan
        self._on_error = on_error

    def _emit(self, frame: ScanFrame) -> None:
        try:
            self._on_scan(frame)
        except Exception as exc:
            _notify_error(self._on_error, exc)


class SerialScannerInput(_CallbackMixin):
    """Read terminated scanner frames from one explicitly configured COM port."""

    def __init__(
        self,
        on_scan: ScanCallback,
        *,
        port: str,
        baud: int = DEFAULT_SERIAL_BAUD,
        max_scan_length: int = DEFAULT_MAX_SCAN_LENGTH,
        terminators: Sequence[str] = DEFAULT_TERMINATORS,
        idle_flush_seconds: Optional[float] = DEFAULT_IDLE_FLUSH_SECONDS,
        on_error: Optional[ErrorCallback] = None,
        serial_factory=None,
    ) -> None:
        super().__init__(on_scan, on_error)
        if not str(port).strip():
            raise ScannerInputConfigurationError("A serial port must be explicit")
        self.port = str(port).strip()
        self.baud = int(baud)
        self._assembler = FrameAssembler(
            max_length=max_scan_length, terminators=terminators
        )
        self._idle_flush_seconds = idle_flush_seconds
        self._serial_factory = serial_factory
        self._stop_event = threading.Event()
        self._ready_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._start_error: Optional[Exception] = None

    @property
    def running(self) -> bool:
        return bool(self._thread and self._thread.is_alive())

    def _load_serial_factory(self):
        if self._serial_factory is not None:
            return self._serial_factory
        try:
            import serial  # type: ignore
        except Exception as exc:
            raise ScannerInputUnavailableError(
                "Serial capture requires the pyserial package"
            ) from exc
        return serial.Serial

    def start(self) -> None:
        if self.running:
            return
        self._stop_event.clear()
        self._ready_event.clear()
        self._start_error = None
        self._thread = threading.Thread(
            target=self._run,
            name="warehouse-scanner-serial",
            daemon=True,
        )
        self._thread.start()
        if not self._ready_event.wait(5.0):
            self.stop()
            raise ScannerInputUnavailableError(
                f"Timed out opening configured scanner port {self.port}"
            )
        if self._start_error is not None:
            error = self._start_error
            self.stop()
            raise ScannerInputUnavailableError(
                f"Could not open configured scanner port {self.port}"
            ) from error

    def stop(self, timeout: float = 5.0) -> None:
        self._stop_event.set()
        thread = self._thread
        if thread and thread is not threading.current_thread():
            thread.join(max(0.0, timeout))

    def _run(self) -> None:
        decoder = codecs.getincrementaldecoder("utf-8")("strict")
        last_input_at: Optional[float] = None
        try:
            serial_factory = self._load_serial_factory()
            serial_port = serial_factory(
                port=self.port,
                baudrate=self.baud,
                timeout=0.1,
                xonxoff=False,
                rtscts=False,
                dsrdtr=False,
            )
        except Exception as exc:
            self._start_error = exc
            self._ready_event.set()
            return

        self._ready_event.set()
        try:
            with serial_port as connection:
                while not self._stop_event.is_set():
                    waiting = max(0, int(getattr(connection, "in_waiting", 0) or 0))
                    raw = connection.read(waiting or 1)
                    if not raw:
                        if (
                            self._idle_flush_seconds is not None
                            and last_input_at is not None
                            and (time.monotonic() - last_input_at)
                            >= self._idle_flush_seconds
                        ):
                            for code in self._assembler.flush_pending():
                                self._emit(
                                    ScanFrame(
                                        code=code,
                                        source="serial",
                                        device_id=self.port,
                                        received_at=datetime.now(timezone.utc),
                                    )
                                )
                            last_input_at = None
                        continue
                    try:
                        decoded = decoder.decode(raw)
                    except UnicodeDecodeError as exc:
                        decoder.reset()
                        self._assembler.clear()
                        _notify_error(self._on_error, exc)
                        continue
                    last_input_at = time.monotonic()
                    for code in self._assembler.feed(decoded):
                        self._emit(
                            ScanFrame(
                                code=code,
                                source="serial",
                                device_id=self.port,
                                received_at=datetime.now(timezone.utc),
                            )
                        )
                        last_input_at = None
        except Exception as exc:
            if not self._stop_event.is_set():
                _notify_error(self._on_error, exc)
        finally:
            self._stop_event.set()


if sys.platform == "win32":
    import ctypes
    from ctypes import wintypes

    _LRESULT = ctypes.c_ssize_t
    _HMODULE = wintypes.HANDLE
    _HMENU = wintypes.HANDLE
    _ATOM = wintypes.WORD
    _user32 = ctypes.WinDLL("user32", use_last_error=True)
    _kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)

    _RIM_TYPEKEYBOARD = 1
    _RID_INPUT = 0x10000003
    _RIDI_DEVICENAME = 0x20000007
    _RIDEV_INPUTSINK = 0x00000100
    _RIDEV_DEVNOTIFY = 0x00002000
    _WM_INPUT = 0x00FF
    _WM_INPUT_DEVICE_CHANGE = 0x00FE
    _WM_CLOSE = 0x0010
    _WM_DESTROY = 0x0002
    _WM_TIMER = 0x0113
    _RI_KEY_BREAK = 0x0001
    _VK_BACK = 0x08
    _VK_TAB = 0x09
    _VK_RETURN = 0x0D
    _VK_SHIFT = 0x10
    _VK_CONTROL = 0x11
    _VK_MENU = 0x12
    _VK_CAPITAL = 0x14
    _VK_ESCAPE = 0x1B
    _VK_LSHIFT = 0xA0
    _VK_RSHIFT = 0xA1
    _VK_LCONTROL = 0xA2
    _VK_RCONTROL = 0xA3
    _VK_LMENU = 0xA4
    _VK_RMENU = 0xA5
    _HWND_MESSAGE = -3

    class _RAWINPUTDEVICELIST(ctypes.Structure):
        _fields_ = [("hDevice", wintypes.HANDLE), ("dwType", wintypes.DWORD)]

    class _RAWINPUTDEVICE(ctypes.Structure):
        _fields_ = [
            ("usUsagePage", wintypes.USHORT),
            ("usUsage", wintypes.USHORT),
            ("dwFlags", wintypes.DWORD),
            ("hwndTarget", wintypes.HWND),
        ]

    class _RAWINPUTHEADER(ctypes.Structure):
        _fields_ = [
            ("dwType", wintypes.DWORD),
            ("dwSize", wintypes.DWORD),
            ("hDevice", wintypes.HANDLE),
            ("wParam", wintypes.WPARAM),
        ]

    class _RAWKEYBOARD(ctypes.Structure):
        _fields_ = [
            ("MakeCode", wintypes.USHORT),
            ("Flags", wintypes.USHORT),
            ("Reserved", wintypes.USHORT),
            ("VKey", wintypes.USHORT),
            ("Message", wintypes.UINT),
            ("ExtraInformation", wintypes.ULONG),
        ]

    class _RAWMOUSE(ctypes.Structure):
        _fields_ = [("data", ctypes.c_byte * 24)]

    class _RAWHID(ctypes.Structure):
        _fields_ = [
            ("dwSizeHid", wintypes.DWORD),
            ("dwCount", wintypes.DWORD),
            ("bRawData", wintypes.BYTE * 1),
        ]

    class _RAWINPUTDATA(ctypes.Union):
        _fields_ = [
            ("mouse", _RAWMOUSE),
            ("keyboard", _RAWKEYBOARD),
            ("hid", _RAWHID),
        ]

    class _RAWINPUT(ctypes.Structure):
        _fields_ = [("header", _RAWINPUTHEADER), ("data", _RAWINPUTDATA)]

    _WNDPROC = ctypes.WINFUNCTYPE(
        _LRESULT,
        wintypes.HWND,
        wintypes.UINT,
        wintypes.WPARAM,
        wintypes.LPARAM,
    )

    class _WNDCLASSW(ctypes.Structure):
        _fields_ = [
            ("style", wintypes.UINT),
            ("lpfnWndProc", _WNDPROC),
            ("cbClsExtra", ctypes.c_int),
            ("cbWndExtra", ctypes.c_int),
            ("hInstance", wintypes.HINSTANCE),
            ("hIcon", wintypes.HICON),
            ("hCursor", wintypes.HCURSOR),
            ("hbrBackground", wintypes.HBRUSH),
            ("lpszMenuName", wintypes.LPCWSTR),
            ("lpszClassName", wintypes.LPCWSTR),
        ]

    # ctypes defaults function results to 32-bit c_int. Explicit signatures are
    # required here because HWND/HANDLE values are pointer-sized on 64-bit
    # Windows and truncation could route input to the wrong device/window.
    _kernel32.GetModuleHandleW.argtypes = [wintypes.LPCWSTR]
    _kernel32.GetModuleHandleW.restype = _HMODULE

    _user32.GetRawInputDeviceList.argtypes = [
        ctypes.POINTER(_RAWINPUTDEVICELIST),
        ctypes.POINTER(wintypes.UINT),
        wintypes.UINT,
    ]
    _user32.GetRawInputDeviceList.restype = wintypes.UINT
    _user32.GetRawInputDeviceInfoW.argtypes = [
        wintypes.HANDLE,
        wintypes.UINT,
        ctypes.c_void_p,
        ctypes.POINTER(wintypes.UINT),
    ]
    _user32.GetRawInputDeviceInfoW.restype = wintypes.UINT
    _user32.GetRawInputData.argtypes = [
        wintypes.HANDLE,
        wintypes.UINT,
        ctypes.c_void_p,
        ctypes.POINTER(wintypes.UINT),
        wintypes.UINT,
    ]
    _user32.GetRawInputData.restype = wintypes.UINT
    _user32.RegisterRawInputDevices.argtypes = [
        ctypes.POINTER(_RAWINPUTDEVICE),
        wintypes.UINT,
        wintypes.UINT,
    ]
    _user32.RegisterRawInputDevices.restype = wintypes.BOOL
    _user32.RegisterClassW.argtypes = [ctypes.POINTER(_WNDCLASSW)]
    _user32.RegisterClassW.restype = _ATOM
    _user32.CreateWindowExW.argtypes = [
        wintypes.DWORD,
        wintypes.LPCWSTR,
        wintypes.LPCWSTR,
        wintypes.DWORD,
        ctypes.c_int,
        ctypes.c_int,
        ctypes.c_int,
        ctypes.c_int,
        wintypes.HWND,
        _HMENU,
        wintypes.HINSTANCE,
        ctypes.c_void_p,
    ]
    _user32.CreateWindowExW.restype = wintypes.HWND
    _user32.DestroyWindow.argtypes = [wintypes.HWND]
    _user32.DestroyWindow.restype = wintypes.BOOL
    _user32.DefWindowProcW.argtypes = [
        wintypes.HWND,
        wintypes.UINT,
        wintypes.WPARAM,
        wintypes.LPARAM,
    ]
    _user32.DefWindowProcW.restype = _LRESULT
    _user32.PostMessageW.argtypes = [
        wintypes.HWND,
        wintypes.UINT,
        wintypes.WPARAM,
        wintypes.LPARAM,
    ]
    _user32.PostMessageW.restype = wintypes.BOOL
    _user32.PostQuitMessage.argtypes = [ctypes.c_int]
    _user32.PostQuitMessage.restype = None
    _user32.GetMessageW.argtypes = [
        ctypes.POINTER(wintypes.MSG),
        wintypes.HWND,
        wintypes.UINT,
        wintypes.UINT,
    ]
    _user32.GetMessageW.restype = wintypes.BOOL
    _user32.TranslateMessage.argtypes = [ctypes.POINTER(wintypes.MSG)]
    _user32.TranslateMessage.restype = wintypes.BOOL
    _user32.DispatchMessageW.argtypes = [ctypes.POINTER(wintypes.MSG)]
    _user32.DispatchMessageW.restype = _LRESULT
    _user32.SetTimer.argtypes = [
        wintypes.HWND,
        ctypes.c_size_t,
        wintypes.UINT,
        ctypes.c_void_p,
    ]
    _user32.SetTimer.restype = ctypes.c_size_t
    _user32.GetKeyboardLayout.argtypes = [wintypes.DWORD]
    _user32.GetKeyboardLayout.restype = ctypes.c_void_p
    _user32.ToUnicodeEx.argtypes = [
        wintypes.UINT,
        wintypes.UINT,
        ctypes.POINTER(ctypes.c_ubyte),
        wintypes.LPWSTR,
        ctypes.c_int,
        wintypes.UINT,
        ctypes.c_void_p,
    ]
    _user32.ToUnicodeEx.restype = ctypes.c_int


def _require_windows_raw_input() -> None:
    if sys.platform != "win32":
        raise ScannerInputUnavailableError(
            "Windows Raw Input capture is available only on Windows"
        )


def _raw_device_name(handle) -> str:
    _require_windows_raw_input()
    size = wintypes.UINT(0)
    result = _user32.GetRawInputDeviceInfoW(
        handle, _RIDI_DEVICENAME, None, ctypes.byref(size)
    )
    if result == 0xFFFFFFFF or size.value == 0:
        return ""
    buffer = ctypes.create_unicode_buffer(size.value + 1)
    result = _user32.GetRawInputDeviceInfoW(
        handle, _RIDI_DEVICENAME, buffer, ctypes.byref(size)
    )
    if result == 0xFFFFFFFF:
        return ""
    return buffer.value


def list_raw_input_devices() -> tuple[DeviceCandidate, ...]:
    """List Windows Raw Input keyboard devices without capturing any keys."""

    _require_windows_raw_input()
    count = wintypes.UINT(0)
    result = _user32.GetRawInputDeviceList(
        None, ctypes.byref(count), ctypes.sizeof(_RAWINPUTDEVICELIST)
    )
    if result == 0xFFFFFFFF:
        raise ScannerInputUnavailableError("GetRawInputDeviceList failed")
    if count.value == 0:
        return ()

    devices = (_RAWINPUTDEVICELIST * count.value)()
    result = _user32.GetRawInputDeviceList(
        devices, ctypes.byref(count), ctypes.sizeof(_RAWINPUTDEVICELIST)
    )
    if result == 0xFFFFFFFF:
        raise ScannerInputUnavailableError("GetRawInputDeviceList failed")

    candidates: list[DeviceCandidate] = []
    seen: set[str] = set()
    for index in range(min(int(result), count.value)):
        entry = devices[index]
        if entry.dwType != _RIM_TYPEKEYBOARD:
            continue
        path = _raw_device_name(entry.hDevice)
        normalized = path.casefold()
        if not path or normalized in seen:
            continue
        seen.add(normalized)
        candidates.append(
            DeviceCandidate(
                source="raw-input",
                device_id=path,
                description="Windows Raw Input keyboard device",
                suggested_match=suggest_device_match(path),
            )
        )
    return tuple(sorted(candidates, key=lambda item: item.device_id.casefold()))


def list_serial_devices() -> tuple[DeviceCandidate, ...]:
    """List serial ports when pyserial is available; never auto-select one."""

    try:
        from serial.tools import list_ports  # type: ignore
    except Exception:
        return ()

    candidates: list[DeviceCandidate] = []
    for port in list_ports.comports():
        device = str(getattr(port, "device", "") or "").strip()
        if not device:
            continue
        description = str(getattr(port, "description", "") or "Serial device")
        hwid = str(getattr(port, "hwid", "") or "").strip()
        if hwid:
            description = f"{description} ({hwid})"
        candidates.append(
            DeviceCandidate(
                source="serial",
                device_id=device,
                description=description,
                suggested_match=device,
            )
        )
    return tuple(sorted(candidates, key=lambda item: item.device_id.casefold()))


def list_input_devices() -> tuple[DeviceCandidate, ...]:
    """List local candidates for an operator; listing never enables capture."""

    raw: tuple[DeviceCandidate, ...] = ()
    if sys.platform == "win32":
        raw = list_raw_input_devices()
    return raw + list_serial_devices()


def format_device_candidates(
    candidates: Optional[Iterable[DeviceCandidate]] = None,
) -> str:
    """Render device candidates without reading or displaying scan data."""

    values = tuple(list_input_devices() if candidates is None else candidates)
    if not values:
        return "No scanner input candidates detected."
    lines: list[str] = []
    for item in values:
        lines.append(f"[{item.source}] {item.device_id}")
        lines.append(f"  {item.description}")
        if item.source == "raw-input":
            lines.append(f"  SCANNER_DEVICE_MATCH={item.suggested_match}")
        else:
            lines.append(f"  SCANNER_SERIAL_PORT={item.suggested_match}")
    return "\n".join(lines)


class _RawKeyTranslator:
    """Translate keys using modifier state from the same Raw Input device."""

    def __init__(self) -> None:
        self._pressed_modifiers: set[int] = set()
        self._caps_lock = False

    def translate(self, keyboard_data) -> Optional[str]:
        vkey = int(keyboard_data.VKey)
        is_break = bool(int(keyboard_data.Flags) & _RI_KEY_BREAK)
        modifier_keys = {
            _VK_SHIFT,
            _VK_LSHIFT,
            _VK_RSHIFT,
            _VK_CONTROL,
            _VK_LCONTROL,
            _VK_RCONTROL,
            _VK_MENU,
            _VK_LMENU,
            _VK_RMENU,
        }
        if vkey in modifier_keys:
            if is_break:
                self._pressed_modifiers.discard(vkey)
            else:
                self._pressed_modifiers.add(vkey)
            return None
        if is_break or vkey == 0xFF:
            return None
        if vkey == _VK_CAPITAL:
            self._caps_lock = not self._caps_lock
            return None
        if vkey == _VK_RETURN:
            return "\r"
        if vkey == _VK_TAB:
            return "\t"
        if vkey == _VK_BACK:
            return "\b"
        if vkey == _VK_ESCAPE:
            return "\x1b"

        key_state = (ctypes.c_ubyte * 256)()
        shift_down = any(
            key in self._pressed_modifiers
            for key in (_VK_SHIFT, _VK_LSHIFT, _VK_RSHIFT)
        )
        control_down = any(
            key in self._pressed_modifiers
            for key in (_VK_CONTROL, _VK_LCONTROL, _VK_RCONTROL)
        )
        alt_down = any(
            key in self._pressed_modifiers for key in (_VK_MENU, _VK_LMENU, _VK_RMENU)
        )
        if shift_down:
            key_state[_VK_SHIFT] = 0x80
        if control_down:
            key_state[_VK_CONTROL] = 0x80
        if alt_down:
            key_state[_VK_MENU] = 0x80
        if self._caps_lock:
            key_state[_VK_CAPITAL] = 0x01

        output = ctypes.create_unicode_buffer(8)
        layout = _user32.GetKeyboardLayout(0)
        translated = _user32.ToUnicodeEx(
            vkey,
            int(keyboard_data.MakeCode),
            key_state,
            output,
            len(output),
            0,
            layout,
        )
        if translated > 0:
            return output.value[:translated]
        if translated < 0:
            # Clear the dead-key state. Scanner identifiers should not rely on it.
            _user32.ToUnicodeEx(
                vkey,
                int(keyboard_data.MakeCode),
                key_state,
                output,
                len(output),
                0,
                layout,
            )
        return None


class RawInputScannerInput(_CallbackMixin):
    """Capture only a uniquely matched Windows Raw Input keyboard device."""

    def __init__(
        self,
        on_scan: ScanCallback,
        *,
        device_match: Sequence[str],
        max_scan_length: int = DEFAULT_MAX_SCAN_LENGTH,
        terminators: Sequence[str] = DEFAULT_TERMINATORS,
        idle_flush_seconds: Optional[float] = DEFAULT_IDLE_FLUSH_SECONDS,
        on_error: Optional[ErrorCallback] = None,
        _calibration_mode: bool = False,
    ) -> None:
        super().__init__(on_scan, on_error)
        self.device_match = tuple(device_match)
        if not self.device_match and not _calibration_mode:
            raise ScannerInputConfigurationError(
                "SCANNER_DEVICE_MATCH is required for Raw Input capture"
            )
        self._max_scan_length = max_scan_length
        self._terminators = tuple(terminators)
        self._idle_flush_seconds = idle_flush_seconds
        self._calibration_mode = _calibration_mode
        self._allowed_device_ids: set[str] = set()
        self._assemblers: dict[str, FrameAssembler] = {}
        self._translators: dict[str, _RawKeyTranslator] = {}
        self._device_cache: dict[int, str] = {}
        self._last_input_at: dict[str, float] = {}
        self._ready_event = threading.Event()
        self._stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._start_error: Optional[Exception] = None
        self._window_handle = None
        self._window_proc = None

    @property
    def running(self) -> bool:
        return bool(self._thread and self._thread.is_alive())

    def _preflight_devices(self) -> None:
        if self._calibration_mode:
            return
        matches = [
            item
            for item in list_raw_input_devices()
            if device_path_matches(item.device_id, self.device_match)
        ]
        if not matches:
            raise ScannerInputConfigurationError(
                "SCANNER_DEVICE_MATCH did not match a connected Raw Input keyboard"
            )
        if len(matches) != 1:
            raise ScannerInputConfigurationError(
                "SCANNER_DEVICE_MATCH matched more than one keyboard; calibrate an "
                "exact device path"
            )
        self._allowed_device_ids = {matches[0].device_id.casefold()}

    def start(self) -> None:
        _require_windows_raw_input()
        if self.running:
            return
        self._preflight_devices()
        self._ready_event.clear()
        self._stop_event.clear()
        self._start_error = None
        self._thread = threading.Thread(
            target=self._message_loop,
            name="warehouse-scanner-raw-input",
            daemon=True,
        )
        self._thread.start()
        if not self._ready_event.wait(5.0):
            self.stop()
            raise ScannerInputUnavailableError("Timed out starting Windows Raw Input")
        if self._start_error is not None:
            error = self._start_error
            self.stop()
            raise ScannerInputUnavailableError("Could not start Windows Raw Input") from error

    def stop(self, timeout: float = 5.0) -> None:
        self._stop_event.set()
        if sys.platform == "win32" and self._window_handle:
            _user32.PostMessageW(self._window_handle, _WM_CLOSE, 0, 0)
        thread = self._thread
        if thread and thread is not threading.current_thread():
            thread.join(max(0.0, timeout))

    def _device_id_for_handle(self, handle) -> str:
        cache_key = int(handle or 0)
        cached = self._device_cache.get(cache_key)
        if cached is not None:
            return cached
        value = _raw_device_name(handle)
        self._device_cache[cache_key] = value
        return value

    def _device_is_allowed(self, device_id: str) -> bool:
        if not device_id:
            return False
        if self._calibration_mode:
            return True
        return device_id.casefold() in self._allowed_device_ids and device_path_matches(
            device_id, self.device_match
        )

    def _handle_raw_input(self, lparam) -> None:
        size = wintypes.UINT(0)
        result = _user32.GetRawInputData(
            lparam,
            _RID_INPUT,
            None,
            ctypes.byref(size),
            ctypes.sizeof(_RAWINPUTHEADER),
        )
        if result == 0xFFFFFFFF or size.value < ctypes.sizeof(_RAWINPUTHEADER):
            return
        buffer = ctypes.create_string_buffer(size.value)
        result = _user32.GetRawInputData(
            lparam,
            _RID_INPUT,
            buffer,
            ctypes.byref(size),
            ctypes.sizeof(_RAWINPUTHEADER),
        )
        if result == 0xFFFFFFFF or int(result) != size.value:
            return
        raw = ctypes.cast(buffer, ctypes.POINTER(_RAWINPUT)).contents
        if raw.header.dwType != _RIM_TYPEKEYBOARD:
            return
        device_id = self._device_id_for_handle(raw.header.hDevice)
        if not self._device_is_allowed(device_id):
            return

        normalized_id = device_id.casefold()
        translator = self._translators.setdefault(normalized_id, _RawKeyTranslator())
        text = translator.translate(raw.data.keyboard)
        if not text:
            return
        assembler = self._assemblers.setdefault(
            normalized_id,
            FrameAssembler(
                max_length=self._max_scan_length,
                terminators=self._terminators,
            ),
        )
        for code in assembler.feed(text):
            self._emit(
                ScanFrame(
                    code=code,
                    source="raw-input",
                    device_id=device_id,
                    received_at=datetime.now(timezone.utc),
                )
            )
        if assembler.pending_length:
            self._last_input_at[normalized_id] = time.monotonic()
        else:
            self._last_input_at.pop(normalized_id, None)

    def _flush_idle_devices(self) -> None:
        if self._idle_flush_seconds is None:
            return
        now = time.monotonic()
        ready = [
            device_id
            for device_id, last_input in self._last_input_at.items()
            if now - last_input >= self._idle_flush_seconds
        ]
        for normalized_id in ready:
            self._last_input_at.pop(normalized_id, None)
            assembler = self._assemblers.get(normalized_id)
            if assembler is None:
                continue
            original_device_id = next(
                (
                    value
                    for value in self._device_cache.values()
                    if value.casefold() == normalized_id
                ),
                normalized_id,
            )
            for code in assembler.flush_pending():
                self._emit(
                    ScanFrame(
                        code=code,
                        source="raw-input",
                        device_id=original_device_id,
                        received_at=datetime.now(timezone.utc),
                    )
                )

    def _message_loop(self) -> None:
        try:
            instance = _kernel32.GetModuleHandleW(None)
            class_name = f"MagmoScannerRawInput_{os.getpid()}_{threading.get_ident()}"

            def window_proc(hwnd, message, wparam, lparam):
                if message == _WM_INPUT:
                    self._handle_raw_input(lparam)
                    return 0
                if message == _WM_INPUT_DEVICE_CHANGE:
                    self._device_cache.pop(int(lparam or 0), None)
                    return 0
                if message == _WM_TIMER:
                    self._flush_idle_devices()
                    return 0
                if message == _WM_CLOSE:
                    _user32.DestroyWindow(hwnd)
                    return 0
                if message == _WM_DESTROY:
                    _user32.PostQuitMessage(0)
                    return 0
                return _user32.DefWindowProcW(hwnd, message, wparam, lparam)

            self._window_proc = _WNDPROC(window_proc)
            window_class = _WNDCLASSW()
            window_class.lpfnWndProc = self._window_proc
            window_class.hInstance = instance
            window_class.lpszClassName = class_name
            atom = _user32.RegisterClassW(ctypes.byref(window_class))
            if not atom:
                raise ctypes.WinError(ctypes.get_last_error())

            self._window_handle = _user32.CreateWindowExW(
                0,
                class_name,
                class_name,
                0,
                0,
                0,
                0,
                0,
                wintypes.HWND(_HWND_MESSAGE),
                None,
                instance,
                None,
            )
            if not self._window_handle:
                raise ctypes.WinError(ctypes.get_last_error())

            device = _RAWINPUTDEVICE(
                usUsagePage=0x01,
                usUsage=0x06,
                dwFlags=_RIDEV_INPUTSINK | _RIDEV_DEVNOTIFY,
                hwndTarget=self._window_handle,
            )
            if not _user32.RegisterRawInputDevices(
                ctypes.byref(device), 1, ctypes.sizeof(_RAWINPUTDEVICE)
            ):
                raise ctypes.WinError(ctypes.get_last_error())

            if self._idle_flush_seconds is not None:
                timer_interval_ms = max(
                    10,
                    min(100, int(self._idle_flush_seconds * 1000 / 3) or 10),
                )
                if not _user32.SetTimer(
                    self._window_handle, 1, timer_interval_ms, None
                ):
                    raise ctypes.WinError(ctypes.get_last_error())

            self._ready_event.set()
            message = wintypes.MSG()
            while not self._stop_event.is_set():
                result = _user32.GetMessageW(ctypes.byref(message), None, 0, 0)
                if result == -1:
                    raise ctypes.WinError(ctypes.get_last_error())
                if result == 0:
                    break
                _user32.TranslateMessage(ctypes.byref(message))
                _user32.DispatchMessageW(ctypes.byref(message))
        except Exception as exc:
            if not self._ready_event.is_set():
                self._start_error = exc
                self._ready_event.set()
            elif not self._stop_event.is_set():
                _notify_error(self._on_error, exc)
        finally:
            self._stop_event.set()
            self._window_handle = None


class DeviceCalibration:
    """Require repeated, exact frames from one device before selecting it."""

    def __init__(self, expected_code: str, *, repetitions: int = 2) -> None:
        value = str(expected_code).strip()
        if not value:
            raise ValueError("expected_code must not be empty")
        if repetitions < 2:
            raise ValueError("repetitions must be at least two")
        self.expected_code = value
        self.repetitions = repetitions
        self._counts: dict[str, tuple[str, int]] = {}

    def observe(self, frame: ScanFrame) -> Optional[DeviceCandidate]:
        if frame.source != "raw-input" or frame.code != self.expected_code:
            return None
        normalized = frame.device_id.casefold()
        if self._counts and normalized not in self._counts:
            raise ScannerCalibrationError(
                "The expected calibration code was observed from more than one "
                "keyboard device; calibration was not saved"
            )
        original, count = self._counts.get(normalized, (frame.device_id, 0))
        count += 1
        self._counts[normalized] = (original, count)
        if count < self.repetitions:
            return None
        return DeviceCandidate(
            source="raw-input",
            device_id=original,
            description="Calibrated Windows Raw Input scanner",
            suggested_match=suggest_device_match(original),
        )


def learn_scanner_device(
    expected_code: str,
    *,
    repetitions: int = 2,
    timeout_seconds: float = 30.0,
) -> DeviceCandidate:
    """Identify the device that scans one known label repeatedly.

    This is an explicit operator calibration mode. It temporarily observes all
    Raw Input keyboards but performs no browser launch, filesystem write, or
    network request. Production capture remains fail closed and cannot use a
    match-all pattern.
    """

    if timeout_seconds <= 0:
        raise ValueError("timeout_seconds must be greater than zero")
    tracker = DeviceCalibration(expected_code, repetitions=repetitions)
    completed = threading.Event()
    result: list[DeviceCandidate] = []
    errors: list[ScannerCalibrationError] = []

    def on_scan(frame: ScanFrame) -> None:
        try:
            candidate = tracker.observe(frame)
        except ScannerCalibrationError as exc:
            errors.append(exc)
            completed.set()
            return
        if candidate is not None and not result:
            result.append(candidate)
            completed.set()

    capture = RawInputScannerInput(
        on_scan,
        device_match=(),
        idle_flush_seconds=DEFAULT_IDLE_FLUSH_SECONDS,
        _calibration_mode=True,
    )
    capture.start()
    try:
        if not completed.wait(timeout_seconds):
            raise ScannerCalibrationError(
                "Calibration timed out before the expected label was scanned "
                f"{repetitions} times from one device"
            )
        if errors:
            raise errors[0]
        return result[0]
    finally:
        capture.stop()


def create_scanner_input(
    on_scan: ScanCallback,
    *,
    env: Optional[Mapping[str, object]] = None,
    on_error: Optional[ErrorCallback] = None,
) -> ScannerInput:
    """Build the one explicitly configured scanner input backend."""

    config = DeviceInputConfig.from_env(env)
    if config.serial_port:
        return SerialScannerInput(
            on_scan,
            port=config.serial_port,
            baud=config.serial_baud,
            max_scan_length=config.max_scan_length,
            terminators=config.terminators,
            idle_flush_seconds=config.idle_flush_seconds,
            on_error=on_error,
        )
    return RawInputScannerInput(
        on_scan,
        device_match=config.device_match,
        max_scan_length=config.max_scan_length,
        terminators=config.terminators,
        idle_flush_seconds=config.idle_flush_seconds,
        on_error=on_error,
    )


__all__ = [
    "DEFAULT_MAX_SCAN_LENGTH",
    "DEFAULT_IDLE_FLUSH_SECONDS",
    "DEFAULT_SERIAL_BAUD",
    "DEFAULT_TERMINATORS",
    "DeviceCalibration",
    "DeviceCandidate",
    "DeviceInputConfig",
    "FrameAssembler",
    "RawInputScannerInput",
    "ScanFrame",
    "ScannerCalibrationError",
    "ScannerInput",
    "ScannerInputConfigurationError",
    "ScannerInputError",
    "ScannerInputUnavailableError",
    "SerialScannerInput",
    "create_scanner_input",
    "device_path_matches",
    "format_device_candidates",
    "learn_scanner_device",
    "list_input_devices",
    "list_raw_input_devices",
    "list_serial_devices",
    "parse_device_match_patterns",
    "suggest_device_match",
]
