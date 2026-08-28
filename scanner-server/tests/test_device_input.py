from __future__ import annotations

import sys
import threading
import time
import unittest
from datetime import datetime, timezone
from pathlib import Path


SCANNER_SERVER_ROOT = Path(__file__).resolve().parents[1]
if str(SCANNER_SERVER_ROOT) not in sys.path:
    sys.path.insert(0, str(SCANNER_SERVER_ROOT))

from warehouse_scanner.device_input import (  # noqa: E402
    DEFAULT_IDLE_FLUSH_SECONDS,
    DeviceCalibration,
    DeviceCandidate,
    DeviceInputConfig,
    FrameAssembler,
    RawInputScannerInput,
    ScanFrame,
    ScannerCalibrationError,
    ScannerInputConfigurationError,
    SerialScannerInput,
    create_scanner_input,
    device_path_matches,
    format_device_candidates,
    parse_device_match_patterns,
    suggest_device_match,
)


class DeviceInputConfigTests(unittest.TestCase):
    def test_fails_closed_when_no_source_is_configured(self):
        with self.assertRaisesRegex(
            ScannerInputConfigurationError, "exactly one scanner source"
        ):
            DeviceInputConfig.from_env({})

    def test_fails_closed_when_both_sources_are_configured(self):
        with self.assertRaisesRegex(
            ScannerInputConfigurationError, "exactly one scanner source"
        ):
            DeviceInputConfig.from_env(
                {
                    "SCANNER_DEVICE_MATCH": "exact:device-a",
                    "SCANNER_SERIAL_PORT": "COM7",
                }
            )

    def test_raw_input_configuration_has_safe_defaults(self):
        config = DeviceInputConfig.from_env(
            {"SCANNER_DEVICE_MATCH": "exact:device-a;glob:*VID_1234&PID_5678*"}
        )
        self.assertEqual(
            config.device_match,
            ("exact:device-a", "glob:*VID_1234&PID_5678*"),
        )
        self.assertIsNone(config.serial_port)
        self.assertEqual(config.max_scan_length, 180)
        self.assertEqual(config.idle_flush_seconds, DEFAULT_IDLE_FLUSH_SECONDS)

    def test_serial_configuration_uses_explicit_port_and_can_disable_idle_flush(self):
        config = DeviceInputConfig.from_env(
            {
                "SCANNER_SERIAL_PORT": " COM9 ",
                "SCANNER_SERIAL_BAUD": "115200",
                "SCANNER_MAX_CODE_LENGTH": "128",
                "SCANNER_IDLE_FLUSH_MS": "0",
                "SCANNER_FRAME_TERMINATORS": "ENTER,TAB",
            }
        )
        self.assertEqual(config.serial_port, "COM9")
        self.assertEqual(config.serial_baud, 115200)
        self.assertEqual(config.max_scan_length, 128)
        self.assertIsNone(config.idle_flush_seconds)
        self.assertEqual(config.terminators, ("\r", "\t"))

    def test_rejects_match_all_and_overly_broad_globs(self):
        for value in ("*", "?", "glob:*", "glob:*HID*"):
            with self.subTest(value=value):
                with self.assertRaises(ScannerInputConfigurationError):
                    parse_device_match_patterns(value)

    def test_rejects_codes_longer_than_magmo_contract(self):
        with self.assertRaisesRegex(
            ScannerInputConfigurationError, "may not exceed 180"
        ):
            DeviceInputConfig.from_env(
                {
                    "SCANNER_SERIAL_PORT": "COM4",
                    "SCANNER_MAX_CODE_LENGTH": "181",
                }
            )

    def test_idle_flush_range_is_validated(self):
        for value in ("-1", "10001", "not-a-number"):
            with self.subTest(value=value):
                with self.assertRaises(ScannerInputConfigurationError):
                    DeviceInputConfig.from_env(
                        {
                            "SCANNER_SERIAL_PORT": "COM4",
                            "SCANNER_IDLE_FLUSH_MS": value,
                        }
                    )


class DeviceMatchingTests(unittest.TestCase):
    def setUp(self):
        self.path = r"\\?\HID#VID_1234&PID_ABCD&MI_00#7&ABC&0&0000"

    def test_exact_path_is_case_insensitive_and_question_mark_is_literal(self):
        suggested = suggest_device_match(self.path)
        self.assertEqual(suggested, f"exact:{self.path}")
        self.assertTrue(device_path_matches(self.path.lower(), (suggested,)))
        self.assertFalse(
            device_path_matches(self.path.replace("?", "X"), (suggested,))
        )

    def test_explicit_vid_pid_glob_matches(self):
        self.assertTrue(
            device_path_matches(
                self.path,
                ("glob:*VID_1234&PID_ABCD&MI_00*",),
            )
        )
        self.assertFalse(
            device_path_matches(
                self.path,
                ("glob:*VID_9999&PID_ABCD&MI_00*",),
            )
        )

    def test_unprefixed_values_are_exact_not_substring_matches(self):
        self.assertTrue(device_path_matches(self.path, (self.path,)))
        self.assertFalse(device_path_matches(self.path, ("VID_1234",)))


class FrameAssemblerTests(unittest.TestCase):
    def test_never_emits_unterminated_text_automatically(self):
        assembler = FrameAssembler()
        self.assertEqual(assembler.feed("AIS17704"), ())
        self.assertEqual(assembler.pending_length, 8)

    def test_enter_tab_and_crlf_terminate_once(self):
        assembler = FrameAssembler()
        self.assertEqual(assembler.feed("AIS17704\r\n"), ("AIS17704",))
        self.assertEqual(assembler.feed("B47\t"), ("B47",))

    def test_allowlisted_idle_fallback_is_an_explicit_flush(self):
        assembler = FrameAssembler()
        assembler.feed("P65")
        self.assertEqual(assembler.flush_pending(), ("P65",))
        self.assertEqual(assembler.flush_pending(), ())

    def test_backspace_and_escape_are_handled_without_emitting(self):
        assembler = FrameAssembler()
        self.assertEqual(assembler.feed("AIS1770X\b4\r"), ("AIS17704",))
        self.assertEqual(assembler.feed("wrong\x1bB47\r"), ("B47",))

    def test_overflow_discards_the_entire_frame_until_a_terminator(self):
        assembler = FrameAssembler(max_length=4)
        self.assertEqual(assembler.feed("ABCDE\r"), ())
        self.assertEqual(assembler.overflow_count, 1)
        self.assertEqual(assembler.feed("B47\r"), ("B47",))

    def test_invalid_control_discards_the_entire_frame(self):
        assembler = FrameAssembler()
        self.assertEqual(assembler.feed("AIS\x02BAD\r"), ())
        self.assertEqual(assembler.invalid_control_count, 1)
        self.assertEqual(assembler.feed("AIS17704\r"), ("AIS17704",))


class CalibrationTests(unittest.TestCase):
    def test_requires_repeated_exact_code_from_same_raw_device(self):
        tracker = DeviceCalibration("AIS17704", repetitions=2)
        now = datetime.now(timezone.utc)
        wrong_source = ScanFrame("AIS17704", "serial", "COM7", now)
        wrong_code = ScanFrame("AIS00000", "raw-input", "device-a", now)
        first = ScanFrame("AIS17704", "raw-input", "device-a", now)
        second = ScanFrame("AIS17704", "raw-input", "DEVICE-A", now)

        self.assertIsNone(tracker.observe(wrong_source))
        self.assertIsNone(tracker.observe(wrong_code))
        self.assertIsNone(tracker.observe(first))
        candidate = tracker.observe(second)
        self.assertIsInstance(candidate, DeviceCandidate)
        self.assertEqual(candidate.device_id, "device-a")
        self.assertEqual(candidate.suggested_match, "exact:device-a")

    def test_refuses_single_sample_calibration(self):
        with self.assertRaisesRegex(ValueError, "at least two"):
            DeviceCalibration("AIS17704", repetitions=1)

    def test_rejects_expected_code_observed_from_two_keyboards(self):
        tracker = DeviceCalibration("AIS17704", repetitions=2)
        now = datetime.now(timezone.utc)
        self.assertIsNone(
            tracker.observe(ScanFrame("AIS17704", "raw-input", "device-a", now))
        )
        with self.assertRaisesRegex(ScannerCalibrationError, "more than one"):
            tracker.observe(ScanFrame("AIS17704", "raw-input", "device-b", now))


class FactoryTests(unittest.TestCase):
    def test_factory_builds_raw_input_without_starting_hardware(self):
        capture = create_scanner_input(
            lambda _frame: None,
            env={"SCANNER_DEVICE_MATCH": "exact:device-a"},
        )
        self.assertIsInstance(capture, RawInputScannerInput)
        self.assertFalse(capture.running)

    def test_factory_builds_serial_without_auto_selecting_a_port(self):
        capture = create_scanner_input(
            lambda _frame: None,
            env={"SCANNER_SERIAL_PORT": "COM8"},
        )
        self.assertIsInstance(capture, SerialScannerInput)
        self.assertEqual(capture.port, "COM8")
        self.assertFalse(capture.running)

    def test_candidate_format_does_not_contain_scan_data(self):
        candidate = DeviceCandidate(
            source="raw-input",
            device_id="device-a",
            description="Scanner keyboard",
            suggested_match="exact:device-a",
        )
        rendered = format_device_candidates((candidate,))
        self.assertIn("SCANNER_DEVICE_MATCH=exact:device-a", rendered)
        self.assertNotIn("decoded", rendered.casefold())


class _FakeSerialConnection:
    def __init__(self, chunks):
        self._chunks = list(chunks)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    @property
    def in_waiting(self):
        return len(self._chunks[0]) if self._chunks else 0

    def read(self, _size):
        if self._chunks:
            return self._chunks.pop(0)
        time.sleep(0.005)
        return b""


class SerialInputTests(unittest.TestCase):
    def test_explicit_serial_device_emits_terminated_frame_metadata(self):
        frames = []
        received = threading.Event()

        def on_scan(frame):
            frames.append(frame)
            received.set()

        connection = _FakeSerialConnection([b"AIS17", b"704\r"])
        capture = SerialScannerInput(
            on_scan,
            port="COM8",
            serial_factory=lambda **_kwargs: connection,
        )
        capture.start()
        try:
            self.assertTrue(received.wait(1.0))
        finally:
            capture.stop()

        self.assertEqual(len(frames), 1)
        self.assertEqual(frames[0].code, "AIS17704")
        self.assertEqual(frames[0].source, "serial")
        self.assertEqual(frames[0].device_id, "COM8")
        self.assertIsNotNone(frames[0].received_at.tzinfo)

    def test_explicit_serial_device_can_idle_flush_without_a_suffix(self):
        frames = []
        received = threading.Event()

        def on_scan(frame):
            frames.append(frame)
            received.set()

        connection = _FakeSerialConnection([b"B47"])
        capture = SerialScannerInput(
            on_scan,
            port="COM8",
            idle_flush_seconds=0.01,
            serial_factory=lambda **_kwargs: connection,
        )
        capture.start()
        try:
            self.assertTrue(received.wait(1.0))
        finally:
            capture.stop()
        self.assertEqual([frame.code for frame in frames], ["B47"])


if __name__ == "__main__":
    unittest.main()
