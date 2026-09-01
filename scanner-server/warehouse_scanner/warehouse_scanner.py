#!/usr/bin/env python3
"""Safe entry point for the warehouse scanner bridge.

Normal service startup refuses to capture input unless exactly one explicit
HID match or serial port is configured.  Device discovery and learning are
separate modes that never construct the HTTP bridge or a browser opener.
"""

from __future__ import annotations

import argparse
import os
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping, MutableMapping, Sequence


DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 5000


def _uses_keyboard_wedge_input(environ: Mapping[str, str]) -> bool:
    """Return true only for the explicit Raw Input/HID configuration.

    Serial scanners do not type into a focused browser field, so they cannot
    safely use the callback-free Work Order Add capture lease.
    """

    device_match = str(environ.get("SCANNER_DEVICE_MATCH") or "").strip()
    serial_port = str(environ.get("SCANNER_SERIAL_PORT") or "").strip()
    return bool(device_match and not serial_port)


@dataclass
class ScannerRuntime:
    """Own the scanner input and bridge for exactly one Flask process."""

    app: Any
    bridge: Any
    scanner_input: Any | None
    strict_start: bool = True
    started: bool = False
    closed: bool = False

    def start(self) -> bool:
        if self.closed:
            raise RuntimeError("Scanner runtime is already closed.")
        if self.started:
            return True
        self.bridge.set_scanner_ready(False)
        if self.scanner_input is None:
            if self.strict_start:
                raise RuntimeError("No scanner input is configured.")
            return False
        try:
            self.scanner_input.start()
        except Exception:
            # A backend can fail after partially acquiring its device.  Make a
            # best-effort release, keep the bridge unavailable, and either
            # preserve the embedding print server or fail the strict CLI.
            try:
                self.scanner_input.stop(timeout=5.0)
            except Exception:
                pass
            if self.strict_start:
                raise
            return False
        self.started = True
        self.bridge.set_scanner_ready(True)
        return True

    def close(self) -> None:
        if self.closed:
            return
        self.closed = True
        try:
            # Stop accepting sessions and scrub any active capability before
            # releasing the physical input source.
            self.bridge.set_scanner_ready(False)
            if self.started and self.scanner_input is not None:
                self.scanner_input.stop(timeout=5.0)
        finally:
            self.started = False
            self.bridge.close()


def build_runtime(
    app: Any | None = None,
    *,
    environ: Mapping[str, str] | None = None,
    browser_opener: Any | None = None,
) -> ScannerRuntime:
    """Attach the storage-scan bridge to one Flask application.

    This function validates both private bridge settings and the explicit
    physical-device selection before registering routes.  It never starts a
    second Flask process.  Call ``runtime.start()`` once during application
    startup and ``runtime.close()`` during shutdown.
    """

    from flask import Flask

    from .device_input import create_scanner_input
    from .storage_scan_bridge import (
        BridgeSettings,
        StorageScanBridge,
        register_storage_scan_routes,
    )

    selected_env = os.environ if environ is None else environ
    settings = BridgeSettings.from_env(selected_env)
    bridge_kwargs: dict[str, Any] = {}
    if browser_opener is not None:
        bridge_kwargs["browser_opener"] = browser_opener
    bridge = StorageScanBridge(
        settings,
        scanner_ready=False,
        work_order_wedge_enabled=_uses_keyboard_wedge_input(selected_env),
        **bridge_kwargs,
    )

    try:
        scanner_input = create_scanner_input(
            bridge.handle_scan_frame,
            env=selected_env,
        )
        flask_app = app if app is not None else Flask("warehouse_scanner")
        register_storage_scan_routes(flask_app, bridge)
    except Exception:
        bridge.close()
        raise

    return ScannerRuntime(
        app=flask_app,
        bridge=bridge,
        scanner_input=scanner_input,
        strict_start=True,
    )


def build_embedded_runtime(
    app: Any,
    *,
    environ: Mapping[str, str] | None = None,
    browser_opener: Any | None = None,
) -> ScannerRuntime:
    """Register bridge routes without taking down an existing print server.

    Missing or invalid scanner-device selection leaves the bridge registered in
    an unavailable state. Authenticated start requests then receive a sanitized
    HTTP 503 instead of a misleading 404, while unrelated print routes remain
    usable. Bridge-token/configuration errors still fail startup because the
    control routes cannot be exposed safely without their credential.
    """

    from .device_input import ScannerInputConfigurationError, create_scanner_input
    from .storage_scan_bridge import (
        BridgeSettings,
        StorageScanBridge,
        register_storage_scan_routes,
    )

    selected_env = os.environ if environ is None else environ
    settings = BridgeSettings.from_env(selected_env)
    bridge_kwargs: dict[str, Any] = {}
    if browser_opener is not None:
        bridge_kwargs["browser_opener"] = browser_opener
    bridge = StorageScanBridge(
        settings,
        scanner_ready=False,
        work_order_wedge_enabled=_uses_keyboard_wedge_input(selected_env),
        **bridge_kwargs,
    )
    scanner_input: Any | None = None

    try:
        try:
            scanner_input = create_scanner_input(
                bridge.handle_scan_frame,
                env=selected_env,
            )
        except ScannerInputConfigurationError:
            # The authenticated routes are still useful as an explicit,
            # observable unavailable state for Magmo and operators.
            scanner_input = None
        register_storage_scan_routes(app, bridge)
    except Exception:
        bridge.close()
        raise

    return ScannerRuntime(
        app=app,
        bridge=bridge,
        scanner_input=scanner_input,
        strict_start=False,
    )


def _load_private_env(path_value: str | None, environ: MutableMapping[str, str]) -> None:
    if not path_value:
        return
    env_path = Path(path_value).expanduser().resolve()
    if not env_path.is_file():
        raise ValueError("The requested private environment file does not exist.")

    from dotenv import dotenv_values

    values = dotenv_values(env_path)
    for key, value in values.items():
        if not key or value is None:
            continue
        # An injected service environment wins over the private file.
        environ.setdefault(key, value)


def _run_list_devices() -> int:
    # Discovery imports only device code.  It cannot open a browser or call
    # Magmo because no bridge is constructed in this mode.
    from .device_input import format_device_candidates

    rendered = format_device_candidates()
    print(rendered if rendered else "No supported scanner interfaces were found.")
    return 0


def _read_calibration_code(argument_value: str | None) -> str:
    value = (argument_value or "").strip()
    if not value:
        if not sys.stdin.isatty():
            raise ValueError(
                "Provide the exact known label value after --learn-device in non-interactive mode."
            )
        value = input("Exact value printed on the calibration label: ").strip()
    if not value or len(value) > 180:
        raise ValueError("Calibration code must contain 1-180 characters.")
    if any(ord(character) < 32 or ord(character) == 127 for character in value):
        raise ValueError("Calibration code may not contain control characters.")
    return value


def _run_learn_device(
    expected_code: str | None,
    *,
    repetitions: int,
    timeout_seconds: float,
) -> int:
    # Learning is intentionally isolated from StorageScanBridge.  The helper
    # accepts only the exact known value, twice from the same physical device,
    # so arbitrary fast typing cannot become a learned scanner.
    from .device_input import learn_scanner_device

    code = _read_calibration_code(expected_code)
    print("Learning mode is local-only. Browser opening and network callbacks are OFF.")
    print(
        f"Scan the known label exactly {repetitions} times from the same scanner "
        f"within {timeout_seconds:g} seconds."
    )
    candidate = learn_scanner_device(
        code,
        repetitions=repetitions,
        timeout_seconds=timeout_seconds,
    )
    suggested_match = getattr(candidate, "suggested_match", None)
    if not suggested_match:
        raise RuntimeError("Calibration completed without an exact device match.")

    print("\nCalibration succeeded. Add this line to the scanner's private environment:")
    print(f"SCANNER_DEVICE_MATCH={suggested_match}")
    print("Do not also configure SCANNER_SERIAL_PORT.")
    return 0


def _run_server(args: argparse.Namespace, environ: MutableMapping[str, str]) -> int:
    _load_private_env(args.env_file, environ)
    runtime = build_runtime(environ=environ)
    try:
        runtime.start()
        from waitress import serve

        print(f"Warehouse scanner bridge listening on http://{args.host}:{args.port}")
        print("Input source: explicit device configuration (fail-closed mode)")
        serve(
            runtime.app,
            host=args.host,
            port=args.port,
            threads=args.threads,
            clear_untrusted_proxy_headers=True,
        )
    finally:
        runtime.close()
    return 0


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Warehouse scanner device listener and Magmo session bridge"
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--list-devices",
        action="store_true",
        help="List supported HID and serial interfaces, then exit.",
    )
    mode.add_argument(
        "--learn-device",
        nargs="?",
        const="",
        metavar="KNOWN_LABEL_VALUE",
        help=(
            "Safely learn the scanner HID path by scanning a known label twice. "
            "Prompts for the value when omitted."
        ),
    )
    parser.add_argument(
        "--learn-repetitions",
        type=int,
        default=2,
        help="Required matching calibration scans (default: 2; minimum: 2).",
    )
    parser.add_argument(
        "--learn-timeout",
        type=float,
        default=30.0,
        help="Calibration timeout in seconds (default: 30; range: 10-120).",
    )
    parser.add_argument(
        "--env-file",
        help="Explicit private dotenv file for normal service mode only.",
    )
    parser.add_argument(
        "--host",
        default=DEFAULT_HOST,
        help=f"Waitress bind host (default: {DEFAULT_HOST}).",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=DEFAULT_PORT,
        help=f"Waitress bind port (default: {DEFAULT_PORT}).",
    )
    parser.add_argument(
        "--threads",
        type=int,
        default=4,
        help="Waitress worker threads (default: 4; range: 2-16).",
    )
    args = parser.parse_args(argv)
    if args.learn_repetitions < 2 or args.learn_repetitions > 5:
        parser.error("--learn-repetitions must be between 2 and 5")
    if args.learn_timeout < 10 or args.learn_timeout > 120:
        parser.error("--learn-timeout must be between 10 and 120 seconds")
    if args.port < 1 or args.port > 65535:
        parser.error("--port must be between 1 and 65535")
    if args.threads < 2 or args.threads > 16:
        parser.error("--threads must be between 2 and 16")
    return args


def main(
    argv: Sequence[str] | None = None,
    *,
    environ: MutableMapping[str, str] | None = None,
) -> int:
    args = parse_args(argv)
    selected_env = os.environ if environ is None else environ
    try:
        if args.list_devices:
            return _run_list_devices()
        if args.learn_device is not None:
            return _run_learn_device(
                args.learn_device,
                repetitions=args.learn_repetitions,
                timeout_seconds=args.learn_timeout,
            )
        return _run_server(args, selected_env)
    except KeyboardInterrupt:
        print("\nStopped.", file=sys.stderr)
        return 130
    except Exception as exc:
        # Configuration and device errors intentionally fail closed.  Avoid
        # echoing exception text because private tokens and callback URLs must
        # never appear in service logs.
        print(
            f"Warehouse scanner startup refused ({type(exc).__name__}). "
            "Check the private environment and device calibration.",
            file=sys.stderr,
        )
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
