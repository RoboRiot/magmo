"""Pure AST-isolated regressions; never imports/runs the listener or contacts services."""
import ast
import pathlib
import re
import sys
import typing
import unittest
import urllib.parse

SOURCE = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(__file__).with_name("bluefolder_slack_listener_v2.py")
if len(sys.argv) > 1:
    del sys.argv[1]
TREE = ast.parse(SOURCE.read_text(encoding="utf-8-sig"))
ROOT = next(node for node in TREE.body if isinstance(node, ast.FunctionDef) and node.name == "is_exact_work_order_root")
SLACK = next(node for node in TREE.body if isinstance(node, ast.ClassDef) and node.name == "SlackClient")
LOOKUP = next(node for node in SLACK.body if isinstance(node, ast.FunctionDef) and node.name == "find_work_order_thread")
NS = {**vars(typing), "re": re, "urllib": urllib, "slack_ts_number": lambda value: float(value or 0),
      "PRODUCTION_DISPATCH_CHANNEL_ID": "C07EPLKV9JT"}
exec(compile(ast.Module(body=[ROOT, LOOKUP], type_ignores=[]), str(SOURCE), "exec"), NS)
validate = NS["is_exact_work_order_root"]
lookup = NS["find_work_order_thread"]
HAS_SERVICE_ID = "service_request_id" in {arg.arg for arg in ROOT.args.args}
LOOKUP_HAS_SERVICE_ID = "service_request_id" in {arg.arg for arg in LOOKUP.args.kwonlyargs}


def root(header="#10283", srid="10283", ts="1784659592.447039", **extra):
    return {"ts": ts, "thread_ts": ts,
            "text": header + "\n*<https://advancedimaging.bluefolder.com/service/sr.aspx?srid=" + srid + "|Knee Coil Replacement>*", **extra}


class RootFormattingTests(unittest.TestCase):
    def accepted(self, message, number="10283", service_id=None):
        return validate(message, number, service_id or number) if HAS_SERVICE_ID else validate(message, number)

    def test_real_10283_bold_digits(self):
        self.assertTrue(self.accepted(root("#*10283*")))

    def test_real_10296_bold_header(self):
        self.assertTrue(self.accepted(root("*#10296*", "10296", "1784764752.996099"), "10296"))

    def test_plain_and_indented_headers(self):
        for header in ["#10283", "  #10283", "*#10283*", "# *10283*", "\n#10283"]:
            with self.subTest(header=header):
                self.assertTrue(self.accepted(root(header)))

    def test_numeric_identity_is_exact(self):
        for header in ["#102830", "#*102830*", "*#102830*", "#10283x", "#*10283x*", "#*10*283"]:
            with self.subTest(header=header):
                self.assertFalse(self.accepted(root(header)))

    def test_wrong_bluefolder_id_rejected_even_with_matching_header(self):
        self.assertFalse(self.accepted(root("#*10283*", "10296")))

    def test_matching_url_without_numeric_header_is_insufficient(self):
        self.assertFalse(self.accepted(root("Knee Coil Replacement")))

    def test_reply_cannot_be_adopted(self):
        self.assertFalse(self.accepted(root("#*10283*", thread_ts="1700000000.000001")))

    def test_invalid_timestamp_rejected(self):
        self.assertFalse(self.accepted(root("#*10283*", ts="not-a-timestamp")))

    def test_explicit_bluefolder_service_identity_preserved(self):
        if not HAS_SERVICE_ID:
            self.skipTest("Older local listener uses the same number/service identity")
        self.assertTrue(self.accepted(root("#*10283*", "999999"), service_id="999999"))
        self.assertFalse(self.accepted(root("#*10283*", "10283"), service_id="999999"))

    def lookup(self, messages, channel="C07EPLKV9JT", number="10283"):
        class ReadOnlySlack:
            def cached_full_channel_history(self, _channel):
                return messages
            def channel_history(self, _channel, **_kwargs):
                return messages
        options = {"service_request_id": number} if LOOKUP_HAS_SERVICE_ID else {}
        return lookup(ReadOnlySlack(), channel, number, **options)

    def test_discovery_adopts_unique_formatted_root(self):
        message = root("#*10283*")
        self.assertEqual(self.lookup([message]), message)

    def test_discovery_rejects_testing_and_other_channels(self):
        if not LOOKUP_HAS_SERVICE_ID:
            self.skipTest("Older local listener validates channel in the caller")
        for channel in ["C07F6V10PRS", "COTHER", ""]:
            with self.subTest(channel=channel):
                self.assertIsNone(self.lookup([root("#*10283*")], channel=channel))

    def test_discovery_refuses_ambiguous_duplicate_roots(self):
        self.assertIsNone(self.lookup([root("#*10283*"), root("*#10283*", ts="1784659600.000001")]))


if __name__ == "__main__":
    unittest.main()
