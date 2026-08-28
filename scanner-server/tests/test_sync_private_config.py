from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from sync_private_config import sync_private_config


class SyncPrivateConfigTests(unittest.TestCase):
    def test_copies_only_bridge_token_and_preserves_scanner_selection(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "magmo.env"
            target = root / "scanner.env"
            source.write_text(
                "STORAGE_SCAN_BRIDGE_TOKEN=" + "a" * 43 + "\nOTHER_SECRET=do-not-copy\n",
                encoding="utf-8",
            )
            target.write_text(
                "SCANNER_DEVICE_MATCH='exact:\\\\?\\HID#VID_1234&PID_5678'\n",
                encoding="utf-8",
            )

            hid, serial = sync_private_config(source, target)
            rendered = target.read_text(encoding="utf-8")
            self.assertTrue(hid)
            self.assertFalse(serial)
            self.assertIn("STORAGE_SCAN_BRIDGE_TOKEN=" + "a" * 43, rendered)
            self.assertIn("SCANNER_DEVICE_MATCH=", rendered)
            self.assertIn("SCANNER_IDLE_FLUSH_MS=180", rendered)
            self.assertNotIn("OTHER_SECRET", rendered)

    def test_rejects_missing_or_short_bridge_token_without_writing(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "magmo.env"
            target = root / "scanner.env"
            source.write_text("STORAGE_SCAN_BRIDGE_TOKEN=short\n", encoding="utf-8")
            with self.assertRaises(ValueError):
                sync_private_config(source, target)
            self.assertFalse(target.exists())


if __name__ == "__main__":
    unittest.main()
