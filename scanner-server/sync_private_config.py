#!/usr/bin/env python3
"""Create the scanner's private env file without printing either credential."""

from __future__ import annotations

import argparse
import os
import re
import tempfile
from pathlib import Path

from dotenv import dotenv_values


TOKEN_PATTERN = re.compile(r"^[A-Za-z0-9_-]{32,512}$")
PRESERVED_SCANNER_KEYS = (
    "SCANNER_DEVICE_MATCH",
    "SCANNER_SERIAL_PORT",
    "SCANNER_SERIAL_BAUD",
    "SCANNER_MAX_CODE_LENGTH",
    "SCANNER_FRAME_TERMINATORS",
    "SCANNER_IDLE_FLUSH_MS",
)


def _quoted(value: str) -> str:
    if re.fullmatch(r"[A-Za-z0-9_.:/?&=+@-]+", value):
        return value
    if "'" in value or "\r" in value or "\n" in value:
        raise ValueError("A scanner setting contains unsupported characters.")
    return f"'{value}'"


def sync_private_config(source: Path, target: Path) -> tuple[bool, bool]:
    source_values = dotenv_values(source)
    token = str(source_values.get("STORAGE_SCAN_BRIDGE_TOKEN") or "").strip()
    if not TOKEN_PATTERN.fullmatch(token):
        raise ValueError("The Magmo bridge token is missing or invalid.")

    existing = dotenv_values(target) if target.is_file() else {}
    selected: dict[str, str] = {"STORAGE_SCAN_BRIDGE_TOKEN": token}
    for key in PRESERVED_SCANNER_KEYS:
        value = str(existing.get(key) or "").strip()
        if value:
            selected[key] = value
    selected.setdefault("SCANNER_IDLE_FLUSH_MS", "180")

    target.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# Private Magmo warehouse scanner configuration.",
        "# Never commit, paste, or log this file.",
    ]
    lines.extend(f"{key}={_quoted(value)}" for key, value in selected.items())
    content = "\n".join(lines) + "\n"

    descriptor, temporary_name = tempfile.mkstemp(
        prefix="scanner.env.", suffix=".tmp", dir=target.parent, text=True
    )
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        try:
            os.chmod(temporary_name, 0o600)
        except OSError:
            pass
        os.replace(temporary_name, target)
    finally:
        if os.path.exists(temporary_name):
            os.unlink(temporary_name)

    return bool(selected.get("SCANNER_DEVICE_MATCH")), bool(
        selected.get("SCANNER_SERIAL_PORT")
    )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Synchronize the private scanner bridge credential."
    )
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--target", type=Path, required=True)
    args = parser.parse_args()
    hid_configured, serial_configured = sync_private_config(
        args.source.resolve(), args.target.resolve()
    )
    print(f"Private scanner configuration synchronized: {args.target.resolve()}")
    print(
        "Physical scanner configured: "
        + ("yes" if hid_configured or serial_configured else "no; calibration required")
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
