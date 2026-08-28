from __future__ import annotations

import contextlib
import io
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock


SCANNER_SERVER_ROOT = Path(__file__).resolve().parents[1]
if str(SCANNER_SERVER_ROOT) not in sys.path:
    sys.path.insert(0, str(SCANNER_SERVER_ROOT))

from warehouse_scanner.device_input import ScannerInputConfigurationError
from warehouse_scanner.warehouse_scanner import (
    ScannerRuntime,
    _run_learn_device,
    build_embedded_runtime,
    build_runtime,
    parse_args,
)


class _FakeScannerInput:
    def __init__(
        self,
        *,
        start_error: Exception | None = None,
        stop_error: Exception | None = None,
    ) -> None:
        self.start_calls = 0
        self.stop_calls = 0
        self.start_error = start_error
        self.stop_error = stop_error

    def start(self) -> None:
        self.start_calls += 1
        if self.start_error:
            raise self.start_error

    def stop(self, timeout: float = 5.0) -> None:
        self.stop_calls += 1
        if self.stop_error:
            raise self.stop_error


class _FakeBridge:
    def __init__(self) -> None:
        self.close_calls = 0
        self.ready_values: list[bool] = []

    def set_scanner_ready(self, ready: bool) -> None:
        self.ready_values.append(bool(ready))

    def close(self) -> None:
        self.close_calls += 1


class ScannerRuntimeTests(unittest.TestCase):
    def test_runtime_starts_and_closes_each_owner_once(self) -> None:
        scanner = _FakeScannerInput()
        bridge = _FakeBridge()
        runtime = ScannerRuntime(object(), bridge, scanner)

        runtime.start()
        runtime.start()
        runtime.close()
        runtime.close()

        self.assertEqual(scanner.start_calls, 1)
        self.assertEqual(scanner.stop_calls, 1)
        self.assertEqual(bridge.close_calls, 1)
        self.assertEqual(bridge.ready_values, [False, True, False])

    def test_runtime_closes_bridge_even_if_device_stop_fails(self) -> None:
        scanner = _FakeScannerInput(stop_error=RuntimeError("synthetic stop failure"))
        bridge = _FakeBridge()
        runtime = ScannerRuntime(object(), bridge, scanner)
        runtime.start()

        with self.assertRaises(RuntimeError):
            runtime.close()

        self.assertEqual(bridge.close_calls, 1)
        self.assertTrue(runtime.closed)

    def test_embedded_start_failure_keeps_bridge_unavailable(self) -> None:
        scanner = _FakeScannerInput(start_error=RuntimeError("synthetic start failure"))
        bridge = _FakeBridge()
        runtime = ScannerRuntime(
            object(),
            bridge,
            scanner,
            strict_start=False,
        )

        self.assertFalse(runtime.start())
        self.assertFalse(runtime.started)
        self.assertEqual(scanner.stop_calls, 1)
        self.assertEqual(bridge.ready_values, [False])
        runtime.close()
        self.assertEqual(bridge.close_calls, 1)

    def test_normal_runtime_fails_closed_without_device_configuration(self) -> None:
        environment = {"STORAGE_SCAN_BRIDGE_TOKEN": "x" * 43}
        with self.assertRaises(ScannerInputConfigurationError):
            build_runtime(
                environ=environment,
                browser_opener=lambda _url: self.fail("browser must not open"),
            )

    def test_build_runtime_registers_routes_on_supplied_app(self) -> None:
        from flask import Flask
        from warehouse_scanner import device_input

        environment = {
            "STORAGE_SCAN_BRIDGE_TOKEN": "x" * 43,
            "SCANNER_DEVICE_MATCH": "exact:\\\\?\\HID#VID_1234&PID_5678#scanner",
        }
        scanner = _FakeScannerInput()
        app = Flask("runtime-test")

        with mock.patch.object(device_input, "create_scanner_input", return_value=scanner):
            runtime = build_runtime(
                app,
                environ=environment,
                browser_opener=lambda _url: self.fail("browser must not open"),
            )

        response = app.test_client().post(
            "/storage-scan/start",
            json={},
        )
        self.assertEqual(response.status_code, 401)
        runtime.start()
        runtime.close()
        self.assertEqual(scanner.start_calls, 1)
        self.assertEqual(scanner.stop_calls, 1)

    def test_embedded_runtime_registers_safe_503_without_device_config(self) -> None:
        from flask import Flask

        token = "x" * 43
        app = Flask("embedded-runtime-test")
        runtime = build_embedded_runtime(
            app,
            environ={"STORAGE_SCAN_BRIDGE_TOKEN": token},
            browser_opener=lambda _url: self.fail("browser must not open"),
        )

        self.assertIsNone(runtime.scanner_input)
        self.assertFalse(runtime.start())
        response = app.test_client().post(
            "/storage-scan/start",
            headers={"Authorization": f"Bearer {token}"},
            json={},
        )
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.get_json()["code"], "scanner_input_unavailable")
        runtime.close()

    def test_learning_mode_never_constructs_bridge_or_browser(self) -> None:
        from warehouse_scanner import device_input, storage_scan_bridge

        candidate = SimpleNamespace(
            suggested_match="exact:\\\\?\\HID#VID_1234&PID_5678#scanner"
        )
        output = io.StringIO()
        with (
            mock.patch.object(
                device_input,
                "learn_scanner_device",
                return_value=candidate,
            ) as learn,
            mock.patch.object(storage_scan_bridge, "StorageScanBridge") as bridge_type,
            contextlib.redirect_stdout(output),
        ):
            result = _run_learn_device(
                "KNOWN-1234",
                repetitions=2,
                timeout_seconds=30,
            )

        self.assertEqual(result, 0)
        learn.assert_called_once_with(
            "KNOWN-1234",
            repetitions=2,
            timeout_seconds=30,
        )
        bridge_type.assert_not_called()
        self.assertIn("Browser opening and network callbacks are OFF", output.getvalue())

    def test_cli_modes_are_mutually_exclusive(self) -> None:
        with contextlib.redirect_stderr(io.StringIO()):
            with self.assertRaises(SystemExit):
                parse_args(["--list-devices", "--learn-device", "KNOWN-1234"])


if __name__ == "__main__":
    unittest.main()
