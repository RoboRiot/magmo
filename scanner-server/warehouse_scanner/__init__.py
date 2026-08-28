"""Warehouse scanner bridge package.

The package deliberately separates physical-device input from HTTP session
handling.  Applications normally create one :class:`StorageScanBridge`, feed
it with one scanner input, and register its routes on the existing port-5000
Flask application.
"""

from .device_input import (
    DeviceInputConfig,
    ScanFrame,
    create_scanner_input,
    format_device_candidates,
    learn_scanner_device,
    list_raw_input_devices,
    list_serial_devices,
    suggest_device_match,
)
from .storage_scan_bridge import (
    BridgeSettings,
    StorageScanBridge,
    register_storage_scan_routes,
)

__all__ = [
    "BridgeSettings",
    "DeviceInputConfig",
    "ScanFrame",
    "StorageScanBridge",
    "create_scanner_input",
    "format_device_candidates",
    "learn_scanner_device",
    "list_raw_input_devices",
    "list_serial_devices",
    "register_storage_scan_routes",
    "suggest_device_match",
]

__version__ = "1.0.0"
