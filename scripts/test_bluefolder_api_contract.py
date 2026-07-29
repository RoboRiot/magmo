import importlib.util
import sys
import unittest
from pathlib import Path

import requests


SCRIPT_PATH = Path(__file__).with_name("bluefolder_slack_listener_v2.py")
sys.path.insert(0, str(SCRIPT_PATH.parent))
SPEC = importlib.util.spec_from_file_location("bluefolder_listener_contract", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def xml_response(status_code, body, url="https://app.bluefolder.com/api/2.0/test.aspx"):
    response = requests.Response()
    response.status_code = status_code
    response.url = url
    response.headers["Content-Type"] = "text/xml"
    response._content = body.encode("utf-8")
    return response


class RecordingSession:
    def __init__(self, responses):
        self.headers = {}
        self.responses = list(responses)
        self.calls = []

    def request(self, **kwargs):
        self.calls.append(kwargs)
        if not self.responses:
            raise AssertionError("Unexpected extra BlueFolder request")
        response = self.responses.pop(0)
        response.url = kwargs["url"]
        return response


class BlueFolderApiContractTests(unittest.TestCase):
    def make_client(self, responses, path="/serviceRequests/list.aspx"):
        settings = MODULE.Settings(
            bluefolder_work_orders_path=path,
            bluefolder_api_token="",
            bluefolder_api_key="",
        )
        client = MODULE.BlueFolderClient(settings)
        session = RecordingSession(responses)
        client.session = session
        return client, session

    def test_legacy_list_path_is_normalized_before_network_use(self):
        settings = MODULE.Settings(bluefolder_work_orders_path="/workOrders/list.aspx")
        self.assertEqual(
            settings.bluefolder_work_orders_path,
            "/serviceRequests/list.aspx",
        )

    def test_xml_list_uses_one_documented_request(self):
        response = xml_response(
            200,
            "<response status='ok'><serviceRequestList>"
            "<serviceRequest><serviceRequestId>10271</serviceRequestId>"
            "<serviceRequestNo>10271</serviceRequestNo></serviceRequest>"
            "</serviceRequestList></response>",
        )
        client, session = self.make_client([response], path="/workOrders/list.aspx")

        items = client.list_recent_work_orders()

        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["serviceRequestId"], "10271")
        self.assertEqual(len(session.calls), 1)
        call = session.calls[0]
        self.assertEqual(call["method"], "POST")
        self.assertTrue(call["url"].endswith("/serviceRequests/list.aspx"))
        self.assertIn(b"<serviceRequestList>", call["data"])
        self.assertIn(b"<status>open</status>", call["data"])

    def test_list_http_error_does_not_probe_fallback_endpoints(self):
        client, session = self.make_client(
            [xml_response(404, "<html>Not found</html>")]
        )

        with self.assertRaises(requests.HTTPError):
            client.list_recent_work_orders()

        self.assertEqual(len(session.calls), 1)
        self.assertTrue(
            session.calls[0]["url"].endswith("/serviceRequests/list.aspx")
        )

    def test_xml_writeback_uses_documented_edit_endpoint(self):
        client, session = self.make_client(
            [xml_response(200, "<response status='ok'></response>")]
        )

        client.update_slack_link("10271", "https://example.slack.com/thread")

        self.assertEqual(len(session.calls), 1)
        call = session.calls[0]
        self.assertEqual(call["method"], "POST")
        self.assertTrue(call["url"].endswith("/serviceRequests/edit.aspx"))
        self.assertNotIn(call["method"], {"PATCH", "PUT"})
        self.assertIn(b"Link to Slack Thread", call["data"])

    def test_xml_writeback_falls_back_to_comment_without_patching_get(self):
        client, session = self.make_client(
            [
                xml_response(500, "<response status='error'></response>"),
                xml_response(200, "<response status='ok'></response>"),
            ]
        )

        client.update_slack_link("10271", "https://example.slack.com/thread")

        self.assertEqual(len(session.calls), 2)
        self.assertTrue(
            session.calls[0]["url"].endswith("/serviceRequests/edit.aspx")
        )
        self.assertTrue(
            session.calls[1]["url"].endswith("/serviceRequests/addComment.aspx")
        )
        self.assertTrue(
            all(call["method"] not in {"PATCH", "PUT"} for call in session.calls)
        )
        self.assertTrue(
            all("/serviceRequests/get.aspx" not in call["url"] for call in session.calls)
        )

    def test_obvious_down_language_moves_default_category_to_hard_down(self):
        client = MODULE.FirebaseOpsClient.__new__(MODULE.FirebaseOpsClient)

        result = client._rule_priority_update(
            "needs_scheduled",
            "Kansas Heart Hospital trailer AC is down and scanning cannot continue.",
        )

        self.assertTrue(result["priorityChanged"])
        self.assertEqual(result["priorityTier"], "hard_down")
        self.assertGreaterEqual(result["priorityConfidence"], 0.9)

    def test_restored_language_downgrades_hard_down_to_in_progress(self):
        client = MODULE.FirebaseOpsClient.__new__(MODULE.FirebaseOpsClient)

        result = client._rule_priority_update(
            "hard_down",
            "The scanner was down but is restored and we are testing now.",
        )

        self.assertTrue(result["priorityChanged"])
        self.assertEqual(result["priorityTier"], "in_progress")

    def test_workflow_tab_uses_bluefolder_engineer_not_slack_history(self):
        slack_only = {
            "status": "active",
            "workflowStatus": "active",
            "bluefolderAssignees": [],
            "assignmentHistory": [{"source": "ai"}],
        }
        bluefolder_assigned = {
            "status": "active",
            "workflowStatus": "unassigned",
            "bluefolderAssignees": [{"id": "engineer-1", "name": "Julian Ortiz"}],
        }

        self.assertEqual(
            MODULE.FirebaseOpsClient._workflow_stage(slack_only),
            "unassigned",
        )
        self.assertEqual(
            MODULE.FirebaseOpsClient._workflow_stage(bluefolder_assigned),
            "active",
        )

    def test_remote_work_without_bluefolder_engineer_uses_remote_tab(self):
        remote_only = {
            "status": "active",
            "workflowStatus": "unassigned",
            "bluefolderAssignees": [],
            "remoteWorkActive": True,
        }

        self.assertEqual(
            MODULE.FirebaseOpsClient._workflow_stage(remote_only),
            "remote",
        )

    def test_active_remote_troubleshooting_starts_remote_work(self):
        result = MODULE.FirebaseOpsClient._rule_remote_work_update(
            False,
            "Stanley is logged in remotely and troubleshooting the scanner now.",
        )

        self.assertTrue(result["remoteStateChanged"])
        self.assertTrue(result["remoteWorkActive"])
        self.assertEqual(result["workMode"], "remote")

    def test_future_remote_access_does_not_start_remote_work(self):
        result = MODULE.FirebaseOpsClient._rule_remote_work_update(
            False,
            "We need to add remote access next week before the appointment.",
        )

        self.assertFalse(result["remoteStateChanged"])
        self.assertFalse(result["remoteWorkActive"])

    def test_on_site_dispatch_ends_remote_work(self):
        result = MODULE.FirebaseOpsClient._rule_remote_work_update(
            True,
            "Could not resolve this remotely, so we are sending a technician onsite.",
        )

        self.assertTrue(result["remoteStateChanged"])
        self.assertFalse(result["remoteWorkActive"])
        self.assertEqual(result["workMode"], "in_person")


if __name__ == "__main__":
    unittest.main()
