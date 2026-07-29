#!/usr/bin/env python3
"""
BlueFolder -> Slack dispatch listener

What it does:
- Polls BlueFolder for newly created work orders
- Posts a parent message into a Slack channel
- Adds fixed mentions in the thread starter message
- Fetches a Slack permalink for that message
- Writes the Slack thread link back into BlueFolder's "Link to Slack Thread" field
- Persists a local state file so the same work order is not posted twice
- Writes each new work order directly to Firebase for Magmo's Ops board
- Polls only the Slack threads created for those work orders
- Sends each new human message to Magmo for incremental assignment tracking
- Stops tracking and removes the Firebase chat log when !done is sent

Important:
This script is intentionally written so the BlueFolder-specific pieces are easy to
adjust in one place. I do not have your exact BlueFolder API schema in the uploaded
files, so the Slack side is complete, while the BlueFolder list/update methods are
written to handle common REST patterns and are the main spots you may need to tweak.

Environment variables:
  BLUEFOLDER_BASE_URL=https://app.bluefolder.com/api/2.0
  BLUEFOLDER_API_TOKEN=xxxxxxxx
  BLUEFOLDER_WORK_ORDERS_PATH=/serviceRequests/list.aspx
  BLUEFOLDER_LIST_STATUS=open
  BLUEFOLDER_WORK_ORDER_DETAIL_PATH=/serviceRequests/get.aspx?serviceRequestId={id}
  BLUEFOLDER_WORK_ORDER_URL_TEMPLATE=https://advancedimaging.bluefolder.com/service/sr.aspx?srid={id}
  BLUEFOLDER_LINK_FIELD_LABEL=Link to Slack Thread

  SLACK_BOT_TOKEN=xoxb-...
  SLACK_CHANNEL_ID=C0123456789
  SLACK_CHANNEL_NAME=dispatch
  SLACK_USER_IDS=UAAAAAAA,UBBBBBBB,UCCCCCCC,UDDDDDDD
  SLACK_MENTION_TEXT=@Julie Tang @Sean Wang @Wilson Wang @Alex Wu
  SLACK_USER_NAME_MAP=UAAAAAAA=Julie Tang,UBBBBBBB=Sean Wang
  REQUIRE_CLICKABLE_MENTIONS=true

  OPS_TRACK_ASSIGNMENTS=true
  OPS_TESTING_CHANNEL_ID=C0123456789
  OPS_CONVERSATION_CHANNEL_ID=C0123456789
  OPS_THREAD_LOOKUP_WINDOW_SECONDS=3600
  OPS_THREAD_LOOKUP_RETRY_SECONDS=30
  OPS_PARENT_SCAN_SECONDS=300
  OPS_REPORT_COMMANDS_MANAGED_BY_DONE_LISTENER=true
  FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH=C:/path/to/service-account.json
  FIREBASE_PROJECT_ID=magmo-ac10c
  OPENAI_API_KEY=sk-...
  OPS_ASSIGNMENT_MODEL=gpt-5-nano
  OPS_MESSAGE_POLL_SECONDS=8

Optional:
  POLL_SECONDS=60
  STATE_FILE=./bluefolder_slack_state.json
  SLACK_POST_LOG_FILE=./slack_post_log.jsonl
  LOG_LEVEL=INFO
  BLUEFOLDER_TIMEOUT=30
  DRY_RUN=false
  BASELINE_ON_STARTUP=true
  ENABLE_BLUEFOLDER=true
  TEST_SINGLE_SLACK_SEND=false
  TEST_WORK_ORDER_NUMBER=9769
  TEST_WORK_ORDER_SUBJECT=DUMMY TEST
  TEST_WORK_ORDER_URL=https://app.bluefolder.com/workOrder/9769
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple
from xml.etree import ElementTree as ET
from xml.sax.saxutils import escape as xml_escape

import requests
from slack_part_references import SlackPartReferenceResolver
try:
    import firebase_admin
    from firebase_admin import credentials as firebase_credentials
    from firebase_admin import firestore
except ImportError:  # pragma: no cover
    firebase_admin = None
    firebase_credentials = None
    firestore = None
try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    load_dotenv = None


if load_dotenv:
    # Keep explicit process variables highest priority, then discover the common
    # Magmo and legacy listener env files so this script works from any cwd.
    script_dir = Path(__file__).resolve().parent
    project_dir = script_dir.parent
    legacy_dir = Path.home() / "Desktop" / "magmo-api" / "bluefolder-slack-api"
    env_candidates = (
        script_dir / ".env.local",
        script_dir / ".env",
        project_dir / ".env.local",
        project_dir / ".env",
        legacy_dir / ".env.local",
        legacy_dir / ".env",
    )
    for env_path in env_candidates:
        if env_path.is_file():
            load_dotenv(dotenv_path=env_path, override=False)


def getenv_bool(name: str, default: bool = False) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "y", "on"}


BLUEFOLDER_SERVICE_REQUESTS_LIST_PATH = "/serviceRequests/list.aspx"


def normalize_bluefolder_list_path(value: str) -> str:
    """Translate the retired local work-order alias to BlueFolder's documented endpoint."""
    path = str(value or "").strip() or BLUEFOLDER_SERVICE_REQUESTS_LIST_PATH
    if re.search(r"/workOrders/list\.aspx(?:[?#].*)?$", path, re.IGNORECASE):
        return BLUEFOLDER_SERVICE_REQUESTS_LIST_PATH
    return path


def is_placeholder_secret(value: str) -> bool:
    normalized = str(value or "").strip().lower()
    if not normalized:
        return True
    placeholders = {
        "your_bluefolder_api_token",
        "your_bluefolder_api_key",
        "xoxb-your-bot-token",
        "c0123456789",
        "u_julie,u_sean,u_wilson,u_alex",
    }
    return normalized in placeholders or normalized.startswith("your_")


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def parse_dt(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    value = value.strip()
    if not value:
        return None
    try:
        if value.endswith("Z"):
            value = value[:-1] + "+00:00"
        return datetime.fromisoformat(value)
    except Exception:
        return None


@dataclass
class Settings:
    bluefolder_base_url: str = os.getenv("BLUEFOLDER_BASE_URL", "https://app.bluefolder.com/api/2.0").rstrip("/")
    bluefolder_api_key: str = os.getenv("BLUEFOLDER_API_KEY", "")
    bluefolder_api_token: str = os.getenv("BLUEFOLDER_API_TOKEN", "")
    bluefolder_work_orders_path: str = os.getenv(
        "BLUEFOLDER_WORK_ORDERS_PATH", BLUEFOLDER_SERVICE_REQUESTS_LIST_PATH
    )
    bluefolder_work_order_detail_path: str = os.getenv("BLUEFOLDER_WORK_ORDER_DETAIL_PATH", "/serviceRequests/get.aspx?serviceRequestId={id}")
    bluefolder_list_status: str = os.getenv("BLUEFOLDER_LIST_STATUS", "open").strip()
    bluefolder_work_order_url_template: str = os.getenv(
        "BLUEFOLDER_WORK_ORDER_URL_TEMPLATE",
        "https://advancedimaging.bluefolder.com/service/sr.aspx?srid={id}",
    ).strip()
    bluefolder_link_field_label: str = os.getenv("BLUEFOLDER_LINK_FIELD_LABEL", "Link to Slack Thread")
    bluefolder_timeout: int = int(os.getenv("BLUEFOLDER_TIMEOUT", "30"))

    slack_bot_token: str = os.getenv("SLACK_BOT_TOKEN", "")
    slack_channel_id: str = os.getenv("SLACK_CHANNEL_ID", "")
    slack_channel_name: str = os.getenv("SLACK_CHANNEL_NAME", "dispatch").lstrip("#").strip()
    slack_user_ids: List[str] = field(
        default_factory=lambda: [
            part.strip() for part in os.getenv("SLACK_USER_IDS", "").split(",") if part.strip()
        ]
    )
    slack_mention_text: str = os.getenv("SLACK_MENTION_TEXT", "").strip()
    slack_user_name_map: str = os.getenv("SLACK_USER_NAME_MAP", "").strip()
    require_clickable_mentions: bool = getenv_bool("REQUIRE_CLICKABLE_MENTIONS", True)

    ops_track_assignments: bool = getenv_bool("OPS_TRACK_ASSIGNMENTS", True)
    ops_testing_channel_id: str = (
        os.getenv("OPS_TESTING_CHANNEL_ID")
        or os.getenv("SLACK_TESTING_CHANNEL_ID")
        or os.getenv("SLACK_CHANNEL_ID")
        or ""
    ).strip()
    ops_conversation_channel_id: str = os.getenv(
        "OPS_CONVERSATION_CHANNEL_ID", ""
    ).strip()
    ops_thread_lookup_window_seconds: int = int(
        os.getenv("OPS_THREAD_LOOKUP_WINDOW_SECONDS", "3600")
    )
    ops_thread_lookup_retry_seconds: int = int(
        os.getenv("OPS_THREAD_LOOKUP_RETRY_SECONDS", "30")
    )
    ops_parent_scan_seconds: int = int(
        os.getenv("OPS_PARENT_SCAN_SECONDS", "300")
    )
    ops_report_commands_managed_by_done_listener: bool = getenv_bool(
        "OPS_REPORT_COMMANDS_MANAGED_BY_DONE_LISTENER", True
    )
    firebase_service_account_path: str = (
        os.getenv("FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH")
        or os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")
        or os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        or ""
    ).strip()
    firebase_project_id: str = (
        os.getenv("FIREBASE_ADMIN_PROJECT_ID")
        or os.getenv("FIREBASE_PROJECT_ID")
        or "magmo-ac10c"
    ).strip()
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "").strip()
    ops_assignment_model: str = os.getenv("OPS_ASSIGNMENT_MODEL", "gpt-5-nano").strip()
    ops_assignment_max_output_tokens: int = int(
        os.getenv("OPS_ASSIGNMENT_MAX_OUTPUT_TOKENS", "340")
    )
    ops_assignment_reasoning_effort: str = os.getenv(
        "OPS_ASSIGNMENT_REASONING_EFFORT", "minimal"
    ).strip()
    ops_summary_model: str = os.getenv("OPS_SUMMARY_MODEL", "gpt-5-nano").strip()
    ops_summary_max_output_tokens: int = int(
        os.getenv("OPS_SUMMARY_MAX_OUTPUT_TOKENS", "700")
    )
    ops_summary_reasoning_effort: str = os.getenv(
        "OPS_SUMMARY_REASONING_EFFORT", "minimal"
    ).strip()
    ops_message_poll_seconds: float = float(os.getenv("OPS_MESSAGE_POLL_SECONDS", "8"))
    ops_thread_scan_batch: int = int(os.getenv("OPS_THREAD_SCAN_BATCH", "1"))
    ops_priority_review_batch_size: int = int(
        os.getenv("OPS_PRIORITY_REVIEW_BATCH_SIZE", "2")
    )
    ops_request_timeout: int = int(os.getenv("OPS_REQUEST_TIMEOUT", "40"))

    poll_seconds: int = int(os.getenv("POLL_SECONDS", "60"))
    state_file: Path = Path(os.getenv("STATE_FILE", "./bluefolder_slack_state.json"))
    listener_lock_file: Path = Path(os.getenv("LISTENER_LOCK_FILE", "./bluefolder_slack_listener_v2.lock"))
    slack_post_log_file: Path = Path(os.getenv("SLACK_POST_LOG_FILE", "./slack_post_log.jsonl"))
    log_level: str = os.getenv("LOG_LEVEL", "INFO").upper()
    dry_run: bool = getenv_bool("DRY_RUN", False)
    baseline_on_startup: bool = getenv_bool("BASELINE_ON_STARTUP", True)
    enable_bluefolder: bool = getenv_bool("ENABLE_BLUEFOLDER", True)
    test_single_slack_send: bool = getenv_bool("TEST_SINGLE_SLACK_SEND", False)
    test_work_order_number: str = os.getenv("TEST_WORK_ORDER_NUMBER", "9769").strip()
    test_work_order_subject: str = os.getenv("TEST_WORK_ORDER_SUBJECT", "DUMMY TEST").strip()
    test_work_order_url: str = os.getenv("TEST_WORK_ORDER_URL", "https://app.bluefolder.com/workOrder/9769").strip()

    def __post_init__(self) -> None:
        # Keep backward compatibility with earlier env naming.
        if not self.bluefolder_api_token and self.bluefolder_api_key:
            self.bluefolder_api_token = self.bluefolder_api_key
        # Older Magmo env files used an endpoint that never existed in BlueFolder.
        # Normalize it before any network request so a stale env file cannot revive
        # the high-volume 404 loop.
        self.bluefolder_work_orders_path = normalize_bluefolder_list_path(
            self.bluefolder_work_orders_path
        )

    def validate(self) -> None:
        missing = []
        if not self.bluefolder_base_url:
            missing.append("BLUEFOLDER_BASE_URL")
        if self.enable_bluefolder and not self.test_single_slack_send and is_placeholder_secret(self.bluefolder_api_token):
            missing.append("BLUEFOLDER_API_TOKEN")
        # For real sends or one-shot Slack test, require Slack credentials.
        if self.test_single_slack_send or not self.dry_run:
            if is_placeholder_secret(self.slack_bot_token):
                missing.append("SLACK_BOT_TOKEN")
            has_channel_id = not is_placeholder_secret(self.slack_channel_id)
            has_channel_name = bool((self.slack_channel_name or "").strip())
            if not has_channel_id and not has_channel_name:
                missing.append("SLACK_CHANNEL_ID or SLACK_CHANNEL_NAME")
            if not self.slack_user_ids and not self.slack_mention_text:
                missing.append("SLACK_USER_IDS or SLACK_MENTION_TEXT")
        if not self.dry_run and not self.test_single_slack_send and not self.baseline_on_startup:
            missing.append("BASELINE_ON_STARTUP=true (required when DRY_RUN=false)")
        if self.ops_track_assignments:
            if firebase_admin is None or firestore is None:
                missing.append("firebase-admin Python package")
            if not self.firebase_service_account_path:
                missing.append("FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH")
            if is_placeholder_secret(self.openai_api_key):
                missing.append("OPENAI_API_KEY")
        if missing:
            raise RuntimeError(f"Missing required environment variables: {', '.join(missing)}")


class StateStore:
    def __init__(self, path: Path):
        self.path = path
        self.data: Dict[str, Any] = {
            "processed_work_order_ids": {},
            "last_seen_created_at": None,
            "updated_at": None,
        }
        self.load()
        self.data.setdefault("ops_thread_state", {})
        self.data.setdefault("ops_thread_scan_index", 0)

    def load(self) -> None:
        if not self.path.exists():
            return
        try:
            self.data = json.loads(self.path.read_text(encoding="utf-8"))
        except Exception as exc:
            logging.warning("Failed to load state file %s: %s", self.path, exc)

    def save(self) -> None:
        self.data["updated_at"] = utc_now_iso()
        self.path.write_text(json.dumps(self.data, indent=2, sort_keys=True), encoding="utf-8")

    def is_processed(self, work_order_id: str) -> bool:
        return str(work_order_id) in self.data.get("processed_work_order_ids", {})

    def mark_processed(self, work_order_id: str, payload: Dict[str, Any]) -> None:
        self.data.setdefault("processed_work_order_ids", {})[str(work_order_id)] = payload

    def get_last_seen_created_at(self) -> Optional[str]:
        return self.data.get("last_seen_created_at")

    def set_last_seen_created_at(self, created_at: Optional[str]) -> None:
        if created_at:
            self.data["last_seen_created_at"] = created_at


class BlueFolderClient:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.session = requests.Session()
        self._user_names_by_id: Dict[str, str] = {}
        self._users_loaded_at = 0.0
        self.session.headers.update({"Accept": "application/json"})
        self.basic_auth: Optional[Tuple[str, str]] = None
        if settings.bluefolder_api_token:
            # Matches existing Magmo BlueFolder calls.
            self.basic_auth = (settings.bluefolder_api_token, "x")
        elif settings.bluefolder_api_key:
            # Fallback for bearer/key-based integrations.
            self.session.headers.update({
                "Authorization": f"Bearer {settings.bluefolder_api_key}",
                "X-API-Key": settings.bluefolder_api_key,
            })

    def _url(self, path: str) -> str:
        if path.startswith("http://") or path.startswith("https://"):
            return path
        return f"{self.settings.bluefolder_base_url}{path}"

    def _request(self, method: str, path: str, **kwargs: Any) -> requests.Response:
        url = self._url(path)
        if self.basic_auth and "auth" not in kwargs:
            kwargs["auth"] = self.basic_auth
        resp = self.session.request(
            method=method,
            url=url,
            timeout=self.settings.bluefolder_timeout,
            **kwargs,
        )
        resp.raise_for_status()
        return resp

    def list_recent_work_orders(self) -> List[Dict[str, Any]]:
        """Retrieve work orders without probing undocumented BlueFolder endpoints."""
        path = self.settings.bluefolder_work_orders_path
        if ".aspx" in path.lower():
            status_filter = (
                f"<status>{xml_escape(self.settings.bluefolder_list_status)}</status>"
                if self.settings.bluefolder_list_status
                else ""
            )
            body = (
                "<request><serviceRequestList><listType>full</listType>"
                f"{status_filter}"
                "</serviceRequestList></request>"
            )
            resp = self._request(
                "POST",
                path,
                data=body.encode("utf-8"),
                headers={
                    "Content-Type": "text/xml",
                    "Accept": "text/xml, application/xml, application/json",
                },
            )
            api_error = self._payload_error_message(resp)
            if api_error:
                raise RuntimeError(
                    f"BlueFolder list returned an API error on {path}: {api_error}"
                )
            return self._extract_collection(resp)
        else:
            candidates = [
                {
                    "page_size": 100,
                    "sort": "created_at desc",
                },
                {
                    "per_page": 100,
                    "sort": "created_at desc",
                },
                {
                    "limit": 100,
                    "sort": "created_at desc",
                },
                {},
            ]

        last_error: Optional[Exception] = None
        last_api_error: Optional[str] = None
        for params in candidates:
            try:
                resp = self._request("GET", path, params=params)
                items = self._extract_collection(resp)
                api_error = self._payload_error_message(resp)
                if api_error:
                    last_api_error = f"params={params}: {api_error}"
                    logging.warning("BlueFolder list API error with %s: %s", params, api_error)
                if isinstance(items, list):
                    return items
            except Exception as exc:
                last_error = exc
                logging.debug("BlueFolder list attempt failed with params=%s error=%s", params, exc)
                continue

        if last_api_error:
            raise RuntimeError(f"BlueFolder list returned an API error: {last_api_error}")
        if last_error:
            raise last_error
        return []

    def get_work_order(self, work_order_id: str) -> Dict[str, Any]:
        path = self.settings.bluefolder_work_order_detail_path.format(id=work_order_id)
        resp = self._request("GET", path)
        payload = self._parse_payload(resp)
        if isinstance(payload, dict):
            for key in ("work_order", "data", "item", "serviceRequest", "service_request", "workOrder"):
                if isinstance(payload.get(key), dict):
                    return payload[key]
            return payload
        raise RuntimeError(f"Unexpected BlueFolder detail payload for work order {work_order_id}")

    def user_names_by_id(self, force_refresh: bool = False) -> Dict[str, str]:
        cache_seconds = max(60, int(os.getenv("BLUEFOLDER_USER_CACHE_SECONDS", "3600")))
        if (
            self._user_names_by_id
            and not force_refresh
            and time.monotonic() - self._users_loaded_at < cache_seconds
        ):
            return dict(self._user_names_by_id)

        body = "<request><userList><listType>full</listType></userList></request>"
        response = self._request(
            "POST",
            "/users/list.aspx",
            data=body.encode("utf-8"),
            headers={"Content-Type": "text/xml", "Accept": "text/xml, application/xml"},
        )
        root = ET.fromstring(response.text)
        names: Dict[str, str] = {}
        for user_node in root.findall(".//user"):
            fields = {
                child.tag: (child.text or "").strip()
                for child in list(user_node)
                if child.tag and not list(child)
            }
            user_id = str(fields.get("userId") or "").strip()
            display_name = str(
                fields.get("displayName")
                or fields.get("fullName")
                or " ".join(
                    part
                    for part in [fields.get("firstName"), fields.get("lastName")]
                    if part
                )
                or fields.get("userName")
                or ""
            ).strip()
            if user_id and display_name:
                names[user_id] = display_name
        if not names:
            raise RuntimeError("BlueFolder users/list.aspx returned no users.")
        self._user_names_by_id = names
        self._users_loaded_at = time.monotonic()
        return dict(names)

    def assigned_users(self, item: Dict[str, Any]) -> List[Dict[str, str]]:
        user_ids = extract_bluefolder_assignee_user_ids(item)
        if not user_ids:
            return []
        try:
            names = self.user_names_by_id()
        except Exception as exc:
            logging.warning("Could not resolve BlueFolder assignee names: %s", exc)
            names = {}
        return [
            {
                "id": f"bluefolder:{user_id}",
                "name": names.get(user_id) or f"BlueFolder user {user_id}",
            }
            for user_id in user_ids
        ]

    def update_slack_link(self, work_order_id: str, slack_url: str) -> None:
        """Write the Slack link using API operations supported by the configured mode."""
        if self._is_xml_mode():
            try:
                self._edit_custom_field_with_link(work_order_id, slack_url)
            except Exception as exc:
                logging.warning(
                    "BlueFolder custom-field write-back failed for work order %s; "
                    "falling back to a private comment: %s",
                    work_order_id,
                    exc,
                )
                self._add_comment_with_link(work_order_id, slack_url)
            return

        # JSON-mode compatibility for non-BlueFolder API implementations. The
        # BlueFolder API 2.0 path above never PATCHes or PUTs get.aspx.
        detail = self.get_work_order(work_order_id)
        label = self.settings.bluefolder_link_field_label

        update_payloads = []

        additional_information = detail.get("additional_information")
        if isinstance(additional_information, list):
            patched = []
            found = False
            for entry in additional_information:
                if not isinstance(entry, dict):
                    patched.append(entry)
                    continue
                entry_label = str(entry.get("label") or entry.get("name") or "").strip()
                if entry_label == label:
                    next_entry = dict(entry)
                    if "value" in next_entry:
                        next_entry["value"] = slack_url
                    else:
                        next_entry["text"] = slack_url
                    patched.append(next_entry)
                    found = True
                else:
                    patched.append(entry)
            if not found:
                patched.append({"label": label, "value": slack_url})
            update_payloads.append({"additional_information": patched})

        custom_fields = detail.get("custom_fields")
        if isinstance(custom_fields, list):
            patched = []
            found = False
            for entry in custom_fields:
                if not isinstance(entry, dict):
                    patched.append(entry)
                    continue
                entry_label = str(entry.get("label") or entry.get("name") or "").strip()
                if entry_label == label:
                    next_entry = dict(entry)
                    if "value" in next_entry:
                        next_entry["value"] = slack_url
                    else:
                        next_entry["text"] = slack_url
                    patched.append(next_entry)
                    found = True
                else:
                    patched.append(entry)
            if not found:
                patched.append({"label": label, "value": slack_url})
            update_payloads.append({"custom_fields": patched})

        if not update_payloads:
            update_payloads = [
                {"additional_information": [{"label": label, "value": slack_url}]},
                {"custom_fields": [{"label": label, "value": slack_url}]},
            ]

        path = self.settings.bluefolder_work_order_detail_path.format(id=work_order_id)
        last_error: Optional[Exception] = None
        for payload in update_payloads:
            for method in ("PATCH", "PUT"):
                try:
                    self._request(method, path, json=payload)
                    logging.info("Updated BlueFolder work order %s with Slack link", work_order_id)
                    return
                except Exception as exc:
                    last_error = exc
                    logging.debug(
                        "BlueFolder update failed. work_order_id=%s method=%s payload=%s error=%s",
                        work_order_id,
                        method,
                        payload,
                        exc,
                    )
                    continue

        if last_error:
            raise last_error

    @staticmethod
    def _extract_collection(payload_or_resp: Any) -> List[Dict[str, Any]]:
        if isinstance(payload_or_resp, requests.Response):
            payload = BlueFolderClient._parse_payload(payload_or_resp)
        else:
            payload = payload_or_resp

        if isinstance(payload, list):
            return [item for item in payload if isinstance(item, dict)]

        if not isinstance(payload, dict):
            return []

        for key in ("work_orders", "items", "data", "results"):
            value = payload.get(key)
            if isinstance(value, list):
                return [item for item in value if isinstance(item, dict)]

        return []

    def _is_xml_mode(self) -> bool:
        base = self.settings.bluefolder_base_url.lower()
        list_path = self.settings.bluefolder_work_orders_path.lower()
        return ".aspx" in list_path or "/api/2.0" in base

    def _edit_custom_field_with_link(
        self, work_order_id: str, slack_url: str
    ) -> None:
        work_order_id_safe = xml_escape(str(work_order_id))
        label = xml_escape(
            self.settings.bluefolder_link_field_label,
            {'"': "&quot;", "'": "&apos;"},
        )
        value = xml_escape(str(slack_url))
        payload = f"""
<request>
  <serviceRequestEdit>
    <serviceRequestId>{work_order_id_safe}</serviceRequestId>
    <customFields>
      <customField name="{label}">{value}</customField>
    </customFields>
  </serviceRequestEdit>
</request>
""".strip()
        resp = self._request(
            "POST",
            "/serviceRequests/edit.aspx",
            data=payload.encode("utf-8"),
            headers={
                "Content-Type": "text/xml",
                "Accept": "text/xml, application/xml, application/json",
            },
        )
        if not self._payload_status_ok(resp):
            error = self._payload_error_message(resp) or "unknown API response"
            raise RuntimeError(f"BlueFolder serviceRequests/edit.aspx failed: {error}")
        logging.info(
            "Updated BlueFolder work order %s custom field %s",
            work_order_id,
            self.settings.bluefolder_link_field_label,
        )

    def _add_comment_with_link(self, work_order_id: str, slack_url: str) -> None:
        comment = xml_escape(f"Slack thread: {slack_url}")
        work_order_id_safe = xml_escape(str(work_order_id))
        payload_variants = [
            f"""
<request>
  <serviceRequestAddComment>
    <serviceRequestId>{work_order_id_safe}</serviceRequestId>
    <comment>{comment}</comment>
    <commentIsPublic>false</commentIsPublic>
  </serviceRequestAddComment>
</request>
""".strip(),
            f"""
<request>
  <serviceRequestAddComment>
    <serviceRequestId>{work_order_id_safe}</serviceRequestId>
    <comment>{comment}</comment>
  </serviceRequestAddComment>
</request>
""".strip(),
        ]
        endpoints = [
            "/serviceRequests/addComment.aspx",
            "/serviceRequests/addNote.aspx",
        ]

        last_error: Optional[Exception] = None
        for endpoint in endpoints:
            for payload in payload_variants:
                try:
                    resp = self._request(
                        "POST",
                        endpoint,
                        data=payload.encode("utf-8"),
                        headers={"Content-Type": "text/xml", "Accept": "text/xml, application/xml, application/json"},
                    )
                    if self._payload_status_ok(resp):
                        logging.info("Updated BlueFolder work order %s with Slack link comment", work_order_id)
                        return
                except Exception as exc:
                    last_error = exc
                    logging.debug(
                        "BlueFolder add comment failed. endpoint=%s work_order_id=%s error=%s",
                        endpoint,
                        work_order_id,
                        exc,
                    )

        if last_error:
            raise last_error
        raise RuntimeError("BlueFolder comment write-back failed")

    @staticmethod
    def _payload_status_ok(resp: requests.Response) -> bool:
        payload = BlueFolderClient._parse_payload(resp)
        if isinstance(payload, dict):
            status = str(payload.get("status") or "").strip().lower()
            if status:
                return status == "ok"
        return True

    @staticmethod
    def _payload_error_message(resp: requests.Response) -> Optional[str]:
        payload = BlueFolderClient._parse_payload(resp)
        if not isinstance(payload, dict):
            return None
        status = str(payload.get("status") or "").strip().lower()
        if not status or status == "ok":
            return None
        for key in ("error", "message", "details", "detail", "description"):
            value = payload.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()
        return f"status={status}"

    @staticmethod
    def _parse_payload(resp: requests.Response) -> Any:
        content_type = (resp.headers.get("Content-Type") or "").lower()

        if "json" in content_type:
            return resp.json()

        text = (resp.text or "").strip()
        if not text:
            return {}

        # Try JSON first for loosely typed responses.
        try:
            return resp.json()
        except Exception:
            pass

        # Fallback: parse XML and normalize to dict/list shape.
        try:
            root = ET.fromstring(text)
        except Exception:
            return {"raw": text}

        payload: Dict[str, Any] = {}
        if root.attrib:
            payload.update(root.attrib)

        # Detect list responses, commonly under serviceRequests/serviceRequest or workOrders/workOrder.
        service_requests = []
        nodes = list(root.findall(".//serviceRequest")) + list(root.findall(".//workOrder"))
        for node in nodes:
            item: Dict[str, Any] = {}
            # Some BlueFolder list responses encode fields as attributes.
            for attr_key, attr_value in node.attrib.items():
                if attr_key:
                    item[attr_key] = (attr_value or "").strip()
            for child in list(node):
                if not child.tag:
                    continue
                if child.tag == "assignments" and list(child):
                    assignments: List[Dict[str, Any]] = []
                    for assignment_node in child.findall("./assignment"):
                        assignment: Dict[str, Any] = {}
                        for field in list(assignment_node):
                            if not field.tag:
                                continue
                            if list(field):
                                assignment[field.tag] = [
                                    (nested.text or "").strip()
                                    for nested in list(field)
                                    if (nested.text or "").strip()
                                ]
                            else:
                                assignment[field.tag] = (field.text or "").strip()
                        assignments.append(assignment)
                    item[child.tag] = assignments
                else:
                    item[child.tag] = (child.text or "").strip()
            # Normalize legacy workOrder fields into service-request-like keys.
            if "workOrderId" in item and "serviceRequestId" not in item:
                item["serviceRequestId"] = item["workOrderId"]
            if "workOrderNo" in item and "serviceRequestNo" not in item:
                item["serviceRequestNo"] = item["workOrderNo"]
            if item:
                service_requests.append(item)
        if service_requests:
            payload["work_orders"] = service_requests
            return payload

        # Generic dict extraction for detail responses.
        for child in list(root):
            tag = child.tag
            if not tag:
                continue
            if list(child):
                nested: Dict[str, str] = {}
                for grandchild in list(child):
                    if grandchild.tag:
                        nested[grandchild.tag] = (grandchild.text or "").strip()
                payload[tag] = nested or (child.text or "").strip()
            else:
                payload[tag] = (child.text or "").strip()

        return payload


class FirebaseOpsClient:
    """Direct Firebase/Firestore client for Magmo's Ops board."""

    COLLECTION = "OpsWorkOrders"
    SERVICE_REQUEST_COLLECTION = "ServiceRequests"
    CLIENT_COLLECTION = "Client"
    MEMORY_COLLECTION = "OpsCompanyMemory"
    MESSAGE_COLLECTION = "messages"
    ACTIVE_STATUSES = {"active", "open", "processing"}
    PRIORITY_TIERS = {"hard_down", "in_progress", "needs_scheduled", "anytime"}
    GENERATED_PRIORITY_PATTERN = re.compile(
        r"^generated_[a-z0-9]+(?:_[a-z0-9]+){0,4}$"
    )
    PRIORITY_LABELS = {
        "hard_down": "Hard down",
        "in_progress": "In progress",
        "needs_scheduled": "Needs to be scheduled",
        "anytime": "Anytime",
    }
    PRIORITY_ORDER = {
        "hard_down": 0,
        "in_progress": 1,
        "needs_scheduled": 2,
        "anytime": 3,
    }
    MAX_ASSIGNMENT_HISTORY = 100
    MAX_PRIORITY_HISTORY = 100
    MAX_WORKFLOW_STAGE_HISTORY = 100
    CURRENT_PRIORITY_INFERENCE_VERSION = 2
    CURRENT_REMOTE_INFERENCE_VERSION = 1
    WORKFLOW_STAGES = {
        "unassigned",
        "active",
        "remote",
        "service_complete",
        "done",
    }

    def __init__(self, settings: Settings):
        self.settings = settings
        self.priority_review_complete = False
        self.remote_review_complete = False
        self.user_names_by_id: Dict[str, str] = {
            "U07F4G8NP2P": "Yao N",
            "U07EY4TF21L": "Stanley Wu",
            "U0B3CSLG126": "Joshua Yoon",
            "U07FH9RLMNV": "Stan Redd",
        }
        for raw_pair in settings.slack_user_name_map.split(","):
            user_id, separator, name = raw_pair.strip().partition("=")
            if separator and user_id.strip() and name.strip():
                self.user_names_by_id[user_id.strip()] = name.strip()
        alias_candidates: Dict[str, set[str]] = {}
        for user_id, name in self.user_names_by_id.items():
            for alias in {name, name.split()[0] if name.split() else ""}:
                key = self._name_key(alias)
                if key:
                    alias_candidates.setdefault(key, set()).add(user_id)
        self.user_ids_by_alias = {
            alias: next(iter(user_ids))
            for alias, user_ids in alias_candidates.items()
            if len(user_ids) == 1
        }
        if firebase_admin is None or firebase_credentials is None or firestore is None:
            raise RuntimeError(
                "firebase-admin is required. Install it with: py -m pip install firebase-admin"
            )

        raw_path = os.path.expandvars(settings.firebase_service_account_path).strip().strip('"')
        credential_path = Path(raw_path).expanduser()
        if not credential_path.is_absolute():
            project_candidate = Path(__file__).resolve().parent.parent / credential_path
            credential_path = (
                project_candidate if project_candidate.is_file() else credential_path.resolve()
            )
        if not credential_path.is_file():
            raise RuntimeError(
                "Firebase service-account file was not found at "
                f"{credential_path}. Check FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH."
            )

        app_name = "magmo-ops-listener"
        try:
            app = firebase_admin.get_app(app_name)
        except ValueError:
            credential = firebase_credentials.Certificate(str(credential_path))
            app = firebase_admin.initialize_app(
                credential,
                {"projectId": settings.firebase_project_id},
                name=app_name,
            )

        self.db = firestore.client(app=app)
        self.openai_session = requests.Session()
        self.openai_session.headers.update(
            {
                "Authorization": f"Bearer {settings.openai_api_key}",
                "Content-Type": "application/json",
                "User-Agent": "magmo-bluefolder-ops-listener/2.0",
            }
        )

        self._company_memory_cache: List[Tuple[str, Dict[str, Any]]] = []
        self._company_memory_cache_loaded_at = 0.0
        self._client_match_cache: List[Tuple[str, Dict[str, Any]]] = []
        self._client_match_cache_loaded_at = 0.0

    @staticmethod
    def _clean(value: Any, max_length: int = 500) -> str:
        return str(value or "").strip()[:max_length]

    @staticmethod
    def _name_key(value: Any) -> str:
        return re.sub(r"[^a-z0-9]+", " ", str(value or "").lower()).strip()

    def _normalize_assignees(self, value: Any) -> List[Dict[str, str]]:
        result: List[Dict[str, str]] = []
        indexes_by_name: Dict[str, int] = {}
        seen_ids = set()
        for entry in value if isinstance(value, list) else []:
            if isinstance(entry, dict):
                name = self._clean(entry.get("name"), 100)
                user_id = self._clean(entry.get("id"), 80)
            else:
                name = self._clean(entry, 100)
                user_id = ""
            normalized_name = self._name_key(name)
            name_parts = normalized_name.split()
            shortened_name_id = (
                self.user_ids_by_alias.get(name_parts[0], "")
                if len(name_parts) == 2 and len(name_parts[1]) <= 2
                else ""
            )
            canonical_id = (
                user_id
                if user_id in self.user_names_by_id
                else self.user_ids_by_alias.get(normalized_name, "")
                or shortened_name_id
            )
            if canonical_id:
                user_id = canonical_id
                name = self.user_names_by_id.get(canonical_id, name)
            if re.fullmatch(r"U[A-Z0-9]{6,}", name, re.IGNORECASE) and not canonical_id:
                continue
            name_key = self._name_key(name)
            id_key = user_id.lower()
            if not name or not name_key:
                continue
            existing_index = indexes_by_name.get(name_key)
            if existing_index is not None:
                existing_id = result[existing_index].get("id", "")
                new_is_slack = bool(re.fullmatch(r"U[A-Z0-9]+", user_id))
                existing_is_slack = bool(re.fullmatch(r"U[A-Z0-9]+", existing_id))
                if new_is_slack and not existing_is_slack:
                    if existing_id:
                        seen_ids.discard(existing_id.lower())
                    result[existing_index] = {"id": user_id, "name": name}
                    seen_ids.add(id_key)
                continue
            if id_key and id_key in seen_ids:
                continue
            indexes_by_name[name_key] = len(result)
            if id_key:
                seen_ids.add(id_key)
            result.append({"id": user_id, "name": name})
            if len(result) >= 12:
                break
        return result

    def _merge_assignees(self, *values: Any) -> List[Dict[str, str]]:
        combined: List[Any] = []
        for value in values:
            if isinstance(value, list):
                combined.extend(value)
        return self._normalize_assignees(combined)

    def _without_assignees(self, value: Any, removed: Any) -> List[Dict[str, str]]:
        removed_assignees = self._normalize_assignees(removed)
        removed_names = {self._name_key(entry.get("name")) for entry in removed_assignees}
        removed_ids = {
            self._clean(entry.get("id"), 80).lower()
            for entry in removed_assignees
            if self._clean(entry.get("id"), 80)
        }
        return self._normalize_assignees(
            [
                entry
                for entry in self._normalize_assignees(value)
                if self._name_key(entry.get("name")) not in removed_names
                and self._clean(entry.get("id"), 80).lower() not in removed_ids
            ]
        )

    def _assignees_match(self, left: Any, right: Any) -> bool:
        def keys(value: Any) -> List[str]:
            return sorted(
                self._name_key(entry.get("name"))
                or self._clean(entry.get("id"), 80).lower()
                for entry in self._normalize_assignees(value)
            )

        return keys(left) == keys(right)

    def _assignment_summary(self, assignees: Any) -> str:
        names = [entry["name"] for entry in self._normalize_assignees(assignees)]
        return (
            "Currently assigned to " + ", ".join(names) + "."
            if names
            else "Currently unassigned."
        )

    def _initial_assignment(
        self, changed_at_iso: str, bluefolder_assignees: Any = None
    ) -> Dict[str, Any]:
        protected = self._normalize_assignees(bluefolder_assignees)
        assignees = self._merge_assignees(
            protected,
            [{"id": "U07F4G8NP2P", "name": "Yao N"}],
        )
        protected_names = ", ".join(entry["name"] for entry in protected)
        reason = (
            f"BlueFolder assigned {protected_names}; Yao remains the initial dispatch coordinator."
            if protected_names
            else "New work orders start with Yao until responsibility changes in Slack."
        )
        return {
            "id": "initial-assignment",
            "source": "initial",
            "previousAssignees": [],
            "assignees": assignees,
            "reason": reason,
            "triggerMessage": "",
            "triggerSender": "Magmo",
            "triggerSlackTs": "",
            "confidence": 1,
            "changedAtIso": self._clean(changed_at_iso, 80),
        }

    @classmethod
    def _message_id(cls, value: Any) -> str:
        return re.sub(r"[^A-Za-z0-9_.-]", "_", cls._clean(value, 180))

    @staticmethod
    def _timestamp_to_iso(value: Any) -> str:
        if isinstance(value, datetime):
            return value.isoformat()
        if isinstance(value, str):
            return value
        return ""

    @classmethod
    def _normalize_subject(cls, value: Any, number: Any = "") -> str:
        subject = cls._clean(value, 1200)
        subject = re.sub(
            r"\[?\*{0,2}([^()[\]]+?)\*{0,2}\]?\(https?://[^)]+\)",
            r"\1",
            subject,
        )
        subject = re.sub(r"<https?://[^>|]+\|([^>]+)>", r"\1", subject)
        subject = re.sub(r"<https?://[^>]+>", "", subject)
        subject = re.sub(r"[*_`]+", "", subject)
        subject = re.sub(r"\s+", " ", subject).strip()
        work_order_number = re.escape(cls._clean(number, 120))
        if work_order_number:
            subject = re.sub(
                rf"^(?:work\s*order|wo|service\s*request|sr)?\s*#?\s*{work_order_number}\s*(?:[-:|]\s*)?",
                "",
                subject,
                flags=re.IGNORECASE,
            ).strip()
        return cls._clean(subject or "Untitled work order", 500)

    @classmethod
    def _workflow_stage_value(cls, value: Any) -> str:
        stage = re.sub(r"[\s-]+", "_", cls._clean(value, 60).lower())
        if stage in {"in_progress", "processing", "open"}:
            return "active"
        if stage in {"completed", "complete", "closed"}:
            return "done"
        return stage if stage in cls.WORKFLOW_STAGES else ""

    @classmethod
    def _workflow_stage(cls, current: Dict[str, Any]) -> str:
        if cls._clean(current.get("status"), 40).lower() not in cls.ACTIVE_STATUSES:
            return "done"
        stored = cls._workflow_stage_value(
            current.get("workflowStatus") or current.get("workflowStage")
        )
        if stored in {"service_complete", "done"}:
            return stored
        bluefolder_assignees = current.get("bluefolderAssignees")
        if isinstance(bluefolder_assignees, list) and any(
            isinstance(entry, dict)
            and (
                cls._clean(entry.get("id"), 120)
                or cls._clean(entry.get("name"), 120)
            )
            for entry in bluefolder_assignees
        ):
            return "active"
        if bool(current.get("remoteWorkActive")):
            return "remote"
        return "unassigned"

    @classmethod
    def _workflow_stage_started_iso(
        cls, current: Dict[str, Any], stage: str
    ) -> str:
        return (
            cls._timestamp_to_iso(current.get("workflowStageStartedAt"))
            or cls._clean(current.get("workflowStageStartedAtIso"), 80)
            or (
                cls._timestamp_to_iso(current.get("completedAt"))
                if stage == "done"
                else ""
            )
            or cls._timestamp_to_iso(current.get("createdAt"))
            or cls._clean(current.get("createdAtIso"), 80)
            or utc_now_iso()
        )

    @classmethod
    def _workflow_transition_update(
        cls,
        current: Dict[str, Any],
        next_stage: str,
        *,
        changed_by: str,
        source: str,
        reason: str,
        now_iso: str = "",
    ) -> Dict[str, Any]:
        next_stage = cls._workflow_stage_value(next_stage)
        if not next_stage:
            raise RuntimeError("A valid Ops workflow stage is required.")
        current_stage = cls._workflow_stage(current)
        if current_stage == next_stage:
            return {}
        now_iso = now_iso or utc_now_iso()
        entered_at_iso = cls._workflow_stage_started_iso(current, current_stage)
        try:
            entered = datetime.fromisoformat(entered_at_iso.replace("Z", "+00:00"))
            exited = datetime.fromisoformat(now_iso.replace("Z", "+00:00"))
            duration_ms = max(0, int((exited - entered).total_seconds() * 1000))
        except (TypeError, ValueError):
            duration_ms = 0
        history = (
            list(current.get("workflowStageHistory") or [])
            if isinstance(current.get("workflowStageHistory"), list)
            else []
        )
        history.append(
            {
                "id": f"{current_stage}-{int(time.time() * 1000)}",
                "stage": current_stage,
                "enteredAtIso": entered_at_iso,
                "exitedAtIso": now_iso,
                "durationMs": duration_ms,
                "source": cls._clean(source, 80),
                "changedBy": cls._clean(changed_by, 180),
                "reason": cls._clean(reason, 500),
            }
        )
        return {
            "workflowStatus": next_stage,
            "workflowStageStartedAt": firestore.SERVER_TIMESTAMP,
            "workflowStageStartedAtIso": now_iso,
            "workflowStageHistory": history[-cls.MAX_WORKFLOW_STAGE_HISTORY :],
        }

    @classmethod
    def _priority_tier(cls, value: Any) -> str:
        tier = cls._clean(value, 60).lower()
        return (
            tier
            if tier in cls.PRIORITY_TIERS
            or cls.GENERATED_PRIORITY_PATTERN.fullmatch(tier)
            else "needs_scheduled"
        )

    @classmethod
    def _priority_generated(cls, tier: Any) -> bool:
        return bool(
            cls.GENERATED_PRIORITY_PATTERN.fullmatch(cls._priority_tier(tier))
        )

    @classmethod
    def _priority_label(cls, tier: Any, value: Any = "") -> str:
        normalized = cls._priority_tier(tier)
        if normalized in cls.PRIORITY_LABELS:
            return cls.PRIORITY_LABELS[normalized]
        supplied = re.sub(
            r"\s*\(Generated\)\s*$",
            "",
            cls._clean(value, 80),
            flags=re.IGNORECASE,
        ).strip()
        if supplied:
            return supplied
        return normalized.removeprefix("generated_").replace("_", " ").title()

    @classmethod
    def _priority_order(cls, tier: Any, value: Any = None) -> int:
        normalized = cls._priority_tier(tier)
        if normalized in cls.PRIORITY_ORDER:
            return cls.PRIORITY_ORDER[normalized]
        try:
            return max(0, min(3, int(value)))
        except (TypeError, ValueError):
            return 2

    @staticmethod
    def _memory_tokens(value: Any) -> List[str]:
        stop_words = {
            "the", "and", "for", "from", "with", "that", "this", "work", "order",
            "was", "were", "are", "has", "have", "into", "when", "then",
        }
        return list(
            dict.fromkeys(
                token
                for token in re.sub(
                    r"[^a-z0-9]+", " ", str(value or "").lower()
                ).split()
                if len(token) > 2 and token not in stop_words
            )
        )[:80]

    def _relevant_company_memory(
        self, work_order: Dict[str, Any], message_text: str = ""
    ) -> List[Dict[str, Any]]:
        query_tokens = set(
            self._memory_tokens(
                " ".join(
                    [
                        str(work_order.get("subject") or ""),
                        str(work_order.get("customer") or ""),
                        str(work_order.get("description") or ""),
                        str(message_text or ""),
                    ]
                )
            )
        )
        if not query_tokens:
            return []
        memories: List[Dict[str, Any]] = []
        if (
            not self._company_memory_cache
            or time.time() - self._company_memory_cache_loaded_at > 120
        ):
            self._company_memory_cache = [
                (document.id, document.to_dict() or {})
                for document in self.db.collection(
                    self.MEMORY_COLLECTION
                ).limit(250).stream()
            ]
            self._company_memory_cache_loaded_at = time.time()
        for memory_id, data in self._company_memory_cache:
            if str(data.get("status") or "active").lower() != "active":
                continue
            raw_keywords = (
                " ".join(data.get("keywords") or [])
                if isinstance(data.get("keywords"), list)
                else str(data.get("keywords") or "")
            )
            memory_tokens = set(
                self._memory_tokens(
                    " ".join(
                        [
                            raw_keywords,
                            str(data.get("summary") or ""),
                            str(data.get("sourceSubject") or ""),
                        ]
                    )
                )
            )
            overlap = sum(
                2 if len(token) >= 7 else 1
                for token in memory_tokens
                if token in query_tokens
            )
            customer = self._clean(work_order.get("customer"), 220).lower()
            memory_customer = self._clean(data.get("sourceCustomer"), 220).lower()
            score = overlap + (4 if customer and customer == memory_customer else 0)
            if score <= 0:
                continue
            memories.append(
                {
                    "id": memory_id,
                    "kind": self._clean(data.get("kind"), 60),
                    "summary": self._clean(data.get("summary"), 600),
                    "assigneeNames": [
                        self._clean(name, 100)
                        for name in data.get("assigneeNames") or []
                        if self._clean(name, 100)
                    ][:8],
                    "priorityTier": self._clean(data.get("priorityTier"), 40),
                    "rejectedPriorityTier": self._clean(
                        data.get("rejectedPriorityTier"), 60
                    ),
                    "polarity": (
                        "negative"
                        if self._clean(data.get("polarity"), 20).lower()
                        == "negative"
                        else "positive"
                    ),
                    "confidence": float(data.get("confidence") or 0),
                    "score": score,
                }
            )
        memories.sort(
            key=lambda item: (item["score"], item["confidence"]), reverse=True
        )
        return memories[:5]

    def _memory_context(self, memories: List[Dict[str, Any]]) -> str:
        if not memories:
            return "No relevant saved company examples were found."
        lines = []
        for index, memory in enumerate(memories[:5], start=1):
            details = []
            if memory.get("priorityTier"):
                details.append(f"category={memory['priorityTier']}")
            if memory.get("rejectedPriorityTier"):
                details.append(
                    f"rejected_category={memory['rejectedPriorityTier']}"
                )
            if memory.get("assigneeNames"):
                details.append("people=" + ", ".join(memory["assigneeNames"]))
            suffix = f" ({'; '.join(details)})" if details else ""
            prefix = (
                "AVOID: " if memory.get("polarity") == "negative" else "CONFIRMED: "
            )
            lines.append(f"{index}. {prefix}{memory.get('summary')}{suffix}")
        return "\n".join(lines)

    def _rule_priority_update(
        self, current_tier: str, text: str
    ) -> Dict[str, Any]:
        normalized = str(text or "").lower()
        hard_down = re.search(
            r"\b(?:hard\s*down|system\s+down|machine\s+down|scanner\s+down|"
            r"(?:system|machine|scanner|equipment|unit|ct|mri|ac|liftgate)"
            r"\s+(?:is\s+)?down|offline|unusable|not\s+operational|"
            r"(?:cannot|can't|unable\s+to)\s+(?:scan|boot|connect)|"
            r"(?:is\s+)?not\s+booting|no\s+connection|"
            r"(?:scanning|operation|service)\s+(?:is\s+)?(?:stopped|halted))\b",
            normalized,
            re.IGNORECASE,
        )
        restored = re.search(
            r"\b(?:back\s+up|operational|restored|resolved|running\s+again)\b",
            normalized,
            re.IGNORECASE,
        )
        scheduled = re.search(
            r"\b(?:schedul(?:e|ed|ing)|appointment|availability|eta|dispatch|"
            r"send\s+(?:a\s+)?tech|visit|delivery|parts?\s+(?:needed|ordered|arriv|ship))\b",
            normalized,
            re.IGNORECASE,
        )
        active = re.search(
            r"\b(?:working\s+on|in\s+progress|en\s+route|on\s+the\s+way|"
            r"at\s+the\s+site|troubleshoot|testing|repairing|replacing|installing|"
            r"delivering|coordinating)\b",
            normalized,
            re.IGNORECASE,
        )
        low_urgency = re.search(
            r"\b(?:no\s+rush|not\s+urgent|whenever|when\s+you\s+have\s+time|"
            r"can\s+wait|next\s+pm|monitor(?:ing)?|follow\s+up\s+later)\b",
            normalized,
            re.IGNORECASE,
        )
        requested = current_tier
        reason = "The latest evidence did not justify an operational-category change."
        confidence = 0.98
        if restored and (hard_down or active or current_tier == "hard_down"):
            requested = "in_progress"
            reason = "The message states that operation was restored while follow-up work remains active."
            confidence = 0.90
        elif hard_down:
            requested = "hard_down"
            reason = "The message states that the equipment or operation is down or unusable."
            confidence = 0.97
        elif current_tier != "hard_down" and active:
            requested = "in_progress"
            reason = "The message describes active travel, troubleshooting, repair, testing, delivery, or coordination."
            confidence = 0.90
        elif current_tier != "hard_down" and scheduled:
            requested = "needs_scheduled"
            reason = "The next meaningful step is scheduling a visit, technician, part, or delivery."
            confidence = 0.88
        elif current_tier != "hard_down" and low_urgency:
            requested = "anytime"
            reason = "The message explicitly says the work is non-urgent or can wait."
            confidence = 0.91
        return {
            "priorityChanged": requested != current_tier,
            "priorityTier": requested,
            "priorityReason": reason,
            "priorityConfidence": confidence,
        }

    @staticmethod
    def _rule_remote_work_update(
        current_active: bool, text: str
    ) -> Dict[str, Any]:
        normalized = re.sub(r"\s+", " ", str(text or "").lower()).strip()
        remote_ended = re.search(
            r"\b(?:remote\s+(?:session|work|troubleshooting)\s+"
            r"(?:ended|complete|completed|stopped)|"
            r"(?:could(?:n['’]?t| not)|unable\s+to)\s+"
            r"(?:fix|resolve|complete).{0,35}remote|"
            r"needs?\s+(?:an?\s+)?on[-\s]?site|"
            r"sending\s+(?:an?\s+)?tech(?:nician)?|"
            r"dispatch(?:ing|ed)\s+(?:an?\s+)?tech(?:nician)?)\b",
            normalized,
            re.IGNORECASE,
        )
        remote_marker = re.search(
            r"\b(?:remote(?:ly)?|remote\s+(?:session|connection|access)|"
            r"teamviewer|anydesk|vpn|ssh|screen\s*share)\b",
            normalized,
            re.IGNORECASE,
        )
        active_work = re.search(
            r"\b(?:working|checking|troubleshooting|diagnosing|testing|"
            r"fixing|repairing|rebooting|reloading|configuring|"
            r"connected|connecting|logged\s+in|logging\s+in|"
            r"looking\s+into|on\s+it)\b",
            normalized,
            re.IGNORECASE,
        )
        explicitly_logged_in = re.search(
            r"\b(?:logged|logging|connected|connecting)\s+"
            r"(?:in\s+)?(?:to\s+the\s+system\s+)?remote(?:ly)?\b",
            normalized,
            re.IGNORECASE,
        )
        if remote_ended:
            next_active = False
            reason = (
                "The latest Slack message says remote work ended or the next "
                "step requires an on-site technician."
            )
            confidence = 0.94
            work_mode = (
                "in_person"
                if re.search(r"\bon[-\s]?site|dispatch|send(?:ing)?\s+.*tech\b", normalized)
                else "unspecified"
            )
        elif (remote_marker and active_work) or explicitly_logged_in:
            next_active = True
            reason = (
                "The latest Slack message shows someone actively troubleshooting "
                "or working through a remote connection."
            )
            confidence = 0.96
            work_mode = "remote"
        else:
            next_active = current_active
            reason = (
                "The latest message does not clearly start or end active remote work."
            )
            confidence = 0.98
            work_mode = "remote" if current_active else "unspecified"
        return {
            "remoteStateChanged": next_active != current_active,
            "remoteWorkActive": next_active,
            "remoteWorkReason": reason,
            "remoteWorkConfidence": confidence,
            "workMode": work_mode,
        }

    def _save_company_lessons(
        self,
        work_order: Dict[str, Any],
        lessons: Any,
        *,
        source: str,
        source_id: str,
    ) -> List[str]:
        if not isinstance(lessons, list):
            return []
        valid_kinds = {
            "assignment_pattern",
            "priority_pattern",
            "workflow_pattern",
        }
        normalized_lessons: List[Dict[str, Any]] = []
        for lesson in lessons[:3]:
            if not isinstance(lesson, dict):
                continue
            summary = self._clean(lesson.get("summary"), 600)
            if not summary:
                continue
            kind = self._clean(lesson.get("kind"), 60)
            if kind not in valid_kinds:
                kind = "workflow_pattern"
            priority_tier = self._clean(lesson.get("priorityTier"), 60).lower()
            if priority_tier == "none" or (
                priority_tier not in self.PRIORITY_TIERS
                and not self.GENERATED_PRIORITY_PATTERN.fullmatch(priority_tier)
            ):
                priority_tier = ""
            raw_keywords = (
                " ".join(lesson.get("keywords") or [])
                if isinstance(lesson.get("keywords"), list)
                else ""
            )
            normalized_lessons.append(
                {
                    "kind": kind,
                    "summary": summary,
                    "keywords": self._memory_tokens(
                        " ".join(
                            [
                                raw_keywords,
                                str(work_order.get("subject") or ""),
                                str(work_order.get("customer") or ""),
                            ]
                        )
                    )[:18],
                    "assigneeNames": [
                        self._clean(name, 100)
                        for name in lesson.get("assigneeNames") or []
                        if self._clean(name, 100)
                    ][:8],
                    "priorityTier": priority_tier,
                    "confidence": max(
                        0.0, min(1.0, float(lesson.get("confidence") or 0))
                    ),
                }
            )
        if not normalized_lessons:
            return []
        batch = self.db.batch()
        ids = []
        safe_source_id = re.sub(r"[^A-Za-z0-9_.-]", "_", source_id)[:180]
        for index, lesson in enumerate(normalized_lessons, start=1):
            memory_id = f"{safe_source_id}-{index}"
            ids.append(memory_id)
            memory_ref = self.db.collection(self.MEMORY_COLLECTION).document(memory_id)
            batch.set(
                memory_ref,
                {
                    **lesson,
                    "status": "active",
                    "source": self._clean(source, 60),
                    "sourceId": self._clean(source_id, 180),
                    "sourceWorkOrderId": self._clean(
                        work_order.get("workOrderId")
                        or work_order.get("id")
                        or work_order.get("number"),
                        180,
                    ),
                    "sourceWorkOrderNumber": self._clean(
                        work_order.get("number"), 120
                    ),
                    "sourceSubject": self._clean(work_order.get("subject"), 500),
                    "sourceCustomer": self._clean(work_order.get("customer"), 220),
                    "createdAt": firestore.SERVER_TIMESTAMP,
                    "updatedAt": firestore.SERVER_TIMESTAMP,
                },
                merge=True,
            )
        batch.commit()
        self._company_memory_cache = []
        self._company_memory_cache_loaded_at = 0.0
        return ids

    def _work_order_ref(self, work_order_id: str):
        normalized = self._clean(work_order_id, 180)
        if not normalized or "/" in normalized:
            raise RuntimeError("A valid work order ID is required.")
        return self.db.collection(self.COLLECTION).document(normalized)

    def _serialize_work_order(self, work_order_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        status = str(data.get("status") or "").lower()
        return {
            "id": work_order_id,
            "workOrderId": data.get("workOrderId") or work_order_id,
            "number": self._clean(data.get("number") or work_order_id, 120),
            "subject": self._normalize_subject(
                data.get("subject") or "Untitled work order",
                data.get("number") or work_order_id,
            ),
            "description": self._clean(data.get("description"), 1800),
            "customer": self._clean(data.get("customer"), 220),
            "priorityTier": self._priority_tier(data.get("priorityTier")),
            "priorityLabel": self._priority_label(
                data.get("priorityTier"), data.get("priorityLabel")
            ),
            "priorityGenerated": bool(data.get("priorityGenerated"))
            or self._priority_generated(data.get("priorityTier")),
            "priorityOrder": self._priority_order(
                data.get("priorityTier"), data.get("priorityOrder")
            ),
            "priorityReason": self._clean(data.get("priorityReason"), 700),
            "priorityContext": self._clean(data.get("priorityContext"), 900),
            "priorityConfidence": float(data.get("priorityConfidence") or 0),
            "priorityInferenceVersion": int(data.get("priorityInferenceVersion") or 0),
            "rejectedPriorityTiers": [
                self._priority_tier(tier)
                for tier in data.get("rejectedPriorityTiers") or []
            ][:12],
            "assignees": self._normalize_assignees(data.get("assignees")),
            "bluefolderAssignees": self._normalize_assignees(
                data.get("bluefolderAssignees")
            ),
            "remoteWorkActive": bool(data.get("remoteWorkActive")),
            "remoteWorkReason": self._clean(data.get("remoteWorkReason"), 700),
            "remoteWorkConfidence": float(
                data.get("remoteWorkConfidence") or 0
            ),
            "remoteInferenceVersion": int(
                data.get("remoteInferenceVersion") or 0
            ),
            "workMode": self._clean(data.get("workMode"), 40).lower()
            or "unspecified",
            "assignmentSummary": self._clean(data.get("assignmentSummary"), 700),
            "assignmentDecisionReason": self._clean(
                data.get("assignmentDecisionReason"), 700
            ),
            "status": "active" if status in self.ACTIVE_STATUSES else "completed",
            "workflowStatus": self._workflow_stage(data),
        }

    def _save_initial_priority_analysis(
        self,
        work_order_id: str,
        analysis: Dict[str, Any],
        *,
        include_remote: bool = False,
    ) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        snapshot = ref.get()
        if not snapshot.exists:
            raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
        current = snapshot.to_dict() or {}
        previous_tier = self._priority_tier(current.get("priorityTier"))
        requested_tier = self._priority_tier(analysis.get("priorityTier"))
        confidence = float(analysis.get("priorityConfidence") or 0)
        changed = (
            requested_tier != previous_tier
            and confidence >= 0.72
        )
        next_tier = requested_tier if changed else previous_tier
        next_label = self._priority_label(
            next_tier,
            analysis.get("priorityLabel")
            if changed
            else current.get("priorityLabel"),
        )
        next_generated = (
            bool(analysis.get("priorityGenerated"))
            or self._priority_generated(next_tier)
            if changed
            else bool(current.get("priorityGenerated"))
            or self._priority_generated(next_tier)
        )
        next_order = self._priority_order(
            next_tier,
            analysis.get("priorityOrder")
            if changed
            else current.get("priorityOrder"),
        )
        reason = self._clean(analysis.get("priorityReason"), 700)
        remote_confidence = float(analysis.get("remoteWorkConfidence") or 0)
        remote_change_accepted = include_remote and (
            (
                bool(analysis.get("remoteStateChanged"))
                or "remoteWorkActive" not in current
            )
            and remote_confidence >= 0.72
        )
        next_remote_active = (
            bool(analysis.get("remoteWorkActive"))
            if remote_change_accepted
            else bool(current.get("remoteWorkActive"))
        )
        requested_work_mode = self._clean(
            analysis.get("workMode"), 40
        ).lower()
        next_work_mode = (
            requested_work_mode
            if remote_change_accepted
            and requested_work_mode
            in {"remote", "in_person", "mixed", "unspecified"}
            else (
                self._clean(current.get("workMode"), 40).lower()
                or ("remote" if next_remote_active else "unspecified")
            )
        )
        current_stage = self._workflow_stage(current)
        desired_stage = (
            "active"
            if self._normalize_assignees(current.get("bluefolderAssignees"))
            else ("remote" if next_remote_active else "unassigned")
        )
        workflow_update = (
            {}
            if not include_remote
            or current_stage in {"service_complete", "done"}
            else self._workflow_transition_update(
                current,
                desired_stage,
                changed_by="Magmo AI",
                source="remote_inference",
                reason=(
                    self._clean(analysis.get("remoteWorkReason"), 500)
                    or (
                        "Slack indicates active remote work."
                        if next_remote_active
                        else "No active remote work is currently established."
                    )
                ),
            )
        )
        history = list(current.get("priorityHistory") or [])
        history.append(
            {
                "id": f"initial-ai-{int(time.time() * 1000)}",
                "source": "ai_initial",
                "previousTier": previous_tier,
                "priorityTier": next_tier,
                "reason": reason,
                "triggerMessage": "",
                "triggerSender": "Magmo AI",
                "triggerSlackTs": "",
                "confidence": confidence,
                "memoryIds": list(analysis.get("memoryIds") or [])[:5],
                "changedAtIso": utc_now_iso(),
            }
        )
        usage = analysis.get("usage") or {}
        ref.set(
            {
                "priorityTier": next_tier,
                "priorityLabel": next_label,
                "priorityGenerated": next_generated,
                "priorityOrder": next_order,
                "priorityReason": reason,
                "priorityContext": self._clean(
                    analysis.get("priorityContext"), 900
                ),
                "priorityConfidence": confidence,
                "prioritySource": "ai_initial",
                "priorityHistory": history[-self.MAX_PRIORITY_HISTORY :],
                "priorityInferenceVersion": self.CURRENT_PRIORITY_INFERENCE_VERSION,
                **(
                    {
                        "remoteWorkActive": next_remote_active,
                        "remoteWorkReason": self._clean(
                            analysis.get("remoteWorkReason"), 700
                        ),
                        "remoteWorkConfidence": remote_confidence,
                        "remoteInferenceVersion": self.CURRENT_REMOTE_INFERENCE_VERSION,
                        "workMode": next_work_mode,
                        **workflow_update,
                    }
                    if include_remote
                    else {}
                ),
                "priorityUpdatedAt": firestore.SERVER_TIMESTAMP,
                "analysisInputTokens": firestore.Increment(
                    int(usage.get("inputTokens") or 0)
                ),
                "analysisOutputTokens": firestore.Increment(
                    int(usage.get("outputTokens") or 0)
                ),
                "updatedAt": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )
        current.update(
            {
                "priorityTier": next_tier,
                "priorityLabel": next_label,
                "priorityGenerated": next_generated,
                "priorityOrder": next_order,
                "priorityReason": reason,
                "priorityContext": self._clean(
                    analysis.get("priorityContext"), 900
                ),
                "priorityConfidence": confidence,
                "priorityInferenceVersion": self.CURRENT_PRIORITY_INFERENCE_VERSION,
                **(
                    {
                        "remoteWorkActive": next_remote_active,
                        "remoteWorkReason": self._clean(
                            analysis.get("remoteWorkReason"), 700
                        ),
                        "remoteWorkConfidence": remote_confidence,
                        "remoteInferenceVersion": self.CURRENT_REMOTE_INFERENCE_VERSION,
                        "workMode": next_work_mode,
                        **workflow_update,
                    }
                    if include_remote
                    else {}
                ),
            }
        )
        return self._serialize_work_order(work_order_id, current)

    def create_work_order(self, work_order_id: str, record: Dict[str, Any]) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        now_iso = utc_now_iso()
        transaction = self.db.transaction()

        @firestore.transactional
        def upsert(txn):
            snapshot = ref.get(transaction=txn)
            existing = snapshot.to_dict() or {} if snapshot.exists else {}
            has_bluefolder_assignment_data = (
                "bluefolder_assignees" in record or "bluefolderAssignees" in record
            )
            existing_bluefolder = self._normalize_assignees(
                existing.get("bluefolderAssignees")
            )
            incoming_bluefolder = self._normalize_assignees(
                record.get("bluefolder_assignees")
                if "bluefolder_assignees" in record
                else record.get("bluefolderAssignees")
            )
            bluefolder_assignees = (
                incoming_bluefolder
                if has_bluefolder_assignment_data
                else existing_bluefolder
            )
            update: Dict[str, Any] = {
                "workOrderId": str(work_order_id),
                "number": self._clean(record.get("number") or work_order_id, 120),
                "subject": self._normalize_subject(
                    record.get("subject") or "Untitled work order",
                    record.get("number") or work_order_id,
                ),
                "description": self._clean(record.get("description"), 1800),
                "customer": self._clean(record.get("customer"), 220),
                "bluefolderUrl": self._clean(record.get("bluefolder_url"), 1200),
                "slackPermalink": self._clean(record.get("slack_permalink"), 1200),
                "slackChannel": self._clean(record.get("slack_channel"), 120),
                "slackThreadTs": self._clean(record.get("slack_ts"), 120),
                "createdAtIso": self._clean(record.get("created_at"), 80),
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
            if has_bluefolder_assignment_data:
                update.update(
                    {
                        "bluefolderAssignees": bluefolder_assignees,
                        "bluefolderAssignmentSyncedAt": firestore.SERVER_TIMESTAMP,
                        "bluefolderAssignmentSyncedAtIso": now_iso,
                    }
                )
            is_completed = (
                snapshot.exists
                and str(existing.get("status") or "active").lower()
                not in self.ACTIVE_STATUSES
            )
            if not is_completed:
                update["lastActivityAtIso"] = now_iso
                update["lastActivityAt"] = firestore.SERVER_TIMESTAMP

            if not snapshot.exists:
                initial_assignees = self._merge_assignees(
                    bluefolder_assignees,
                    [{"id": "U07F4G8NP2P", "name": "Yao N"}],
                )
                protected_names = ", ".join(
                    entry["name"] for entry in bluefolder_assignees
                )
                update.update(
                    {
                        "status": "active",
                        "workflowStatus": (
                            "active" if bluefolder_assignees else "unassigned"
                        ),
                        "workflowStageStartedAt": firestore.SERVER_TIMESTAMP,
                        "workflowStageStartedAtIso": now_iso,
                        "workflowStageHistory": [],
                        "priorityTier": "needs_scheduled",
                        "priorityLabel": "Needs to be scheduled",
                        "priorityGenerated": False,
                        "priorityOrder": 2,
                        "priorityReason": "Awaiting initial AI operational-category review.",
                        "priorityContext": "",
                        "priorityConfidence": 0,
                        "prioritySource": "initial",
                        "priorityHistory": [],
                        "priorityInferenceVersion": 0,
                        "remoteWorkActive": False,
                        "remoteWorkReason": "",
                        "remoteWorkConfidence": 0,
                        "remoteInferenceVersion": 0,
                        "workMode": "unspecified",
                        "priorityRank": int(time.time() * 1000),
                        "assignees": initial_assignees,
                        "assignmentSummary": self._assignment_summary(initial_assignees),
                        "assignmentDecisionReason": (
                            f"BlueFolder assigned {protected_names}; these engineers remain assigned while Slack adds helpers."
                            if protected_names
                            else "New work orders start with Yao until responsibility changes in Slack."
                        ),
                        "assignmentHistory": [
                            self._initial_assignment(now_iso, bluefolder_assignees)
                        ],
                        "messageCount": 0,
                        "analysisInputTokens": 0,
                        "analysisOutputTokens": 0,
                        "createdAt": firestore.SERVER_TIMESTAMP,
                    }
                )
            else:
                previous_assignees = self._normalize_assignees(existing.get("assignees"))
                helpers = self._without_assignees(
                    previous_assignees, existing_bluefolder
                )
                next_assignees = self._merge_assignees(
                    bluefolder_assignees, helpers
                )
                if not next_assignees:
                    next_assignees = [{"id": "U07F4G8NP2P", "name": "Yao N"}]
                created_iso = (
                    self._timestamp_to_iso(existing.get("createdAt"))
                    or self._clean(existing.get("createdAtIso"), 80)
                    or now_iso
                )
                history = (
                    list(existing.get("assignmentHistory") or [])
                    if isinstance(existing.get("assignmentHistory"), list)
                    else [self._initial_assignment(created_iso, existing_bluefolder)]
                )
                bluefolder_changed = has_bluefolder_assignment_data and not self._assignees_match(
                    existing_bluefolder, bluefolder_assignees
                )
                assignment_changed = not self._assignees_match(
                    previous_assignees, next_assignees
                )
                if assignment_changed:
                    protected_names = ", ".join(
                        entry["name"] for entry in bluefolder_assignees
                    ) or "none"
                    reason = (
                        f"BlueFolder assignment synced. Protected engineers: {protected_names}. "
                        "Slack and manually selected helpers were preserved."
                    )
                    history.append(
                        {
                            "id": f"bluefolder-{int(time.time() * 1000)}",
                            "source": "bluefolder",
                            "previousAssignees": previous_assignees,
                            "assignees": next_assignees,
                            "reason": reason,
                            "triggerMessage": "",
                            "triggerSender": "BlueFolder",
                            "triggerSlackTs": "",
                            "confidence": 1,
                            "changedAtIso": now_iso,
                        }
                    )
                    assignment_update = {
                            "assignees": next_assignees,
                            "assignmentSummary": self._assignment_summary(next_assignees),
                            "assignmentDecisionReason": reason,
                            "assignmentConfidence": 1,
                            "assignmentHistory": history[-self.MAX_ASSIGNMENT_HISTORY :],
                            "assignmentUpdatedAt": firestore.SERVER_TIMESTAMP,
                    }
                    update.update(assignment_update)
                elif not isinstance(existing.get("assignmentHistory"), list):
                    update["assignmentHistory"] = history
                if bluefolder_changed and not assignment_changed:
                    update["assignmentDecisionReason"] = (
                        "BlueFolder engineer protection was refreshed; the visible owner list did not change."
                    )
                if (
                    not is_completed
                    and has_bluefolder_assignment_data
                    and self._workflow_stage(existing)
                    not in {"service_complete", "done"}
                ):
                    next_stage = (
                        "active"
                        if bluefolder_assignees
                        else (
                            "remote"
                            if bool(existing.get("remoteWorkActive"))
                            else "unassigned"
                        )
                    )
                    current_stage = self._workflow_stage(existing)
                    if current_stage != next_stage:
                        update.update(
                            self._workflow_transition_update(
                                existing,
                                next_stage,
                                changed_by="BlueFolder",
                                source="bluefolder_assignment",
                                reason=(
                                    "BlueFolder has an assigned engineer."
                                    if bluefolder_assignees
                                    else "BlueFolder no longer has an assigned engineer."
                                ),
                                now_iso=now_iso,
                            )
                        )

            txn.set(ref, update, merge=True)
            merged = dict(existing)
            merged.update(update)
            return self._serialize_work_order(str(work_order_id), merged)

        work_order = upsert(transaction)
        if (
            int(work_order.get("priorityInferenceVersion") or 0)
            < self.CURRENT_PRIORITY_INFERENCE_VERSION
        ):
            try:
                analysis = self._infer_assignment(
                    work_order,
                    {
                        "sender": {},
                        "text": "",
                        "candidates": [],
                        "slackTs": "",
                    },
                    priority_only=True,
                )
                work_order = self._save_initial_priority_analysis(
                    str(work_order_id), analysis
                )
            except Exception as exc:
                logging.warning(
                    "Initial Ops category inference failed for work order %s; "
                    "the default category remains and will retry: %s",
                    work_order_id,
                    exc,
                )
        return {"ok": True, "workOrder": work_order}

    @staticmethod
    def _should_analyze_assignment(text: str) -> bool:
        normalized = str(text or "").strip().lower()
        if not normalized:
            return False
        signals = [
            r"\b(assign(?:ed|ment)?|take|taking|handle|handling|own|owner|responsib(?:le|ility)|cover|pick(?:ing)?\s+(?:this|it)\s+up|i['’]?ll|i\s+will|i\s+can|can\s+you|could\s+you|please\s+(?:take|handle|cover)|pass(?:ing)?\s+(?:this|it)\s+to|hand(?:ing)?\s*(?:this|it)?\s*off|on\s+it|working\s+on|looking\s+into|checking\s+on|heading\s+(?:to|out)|en\s+route|at\s+(?:the\s+)?site|send(?:ing)?\s+\w+|dispatch(?:ing|ed)?)\b",
            r"\b(?:i\s+am|i['’]?m|we\s+are|we['’]?re)\s+(?:moving|checking|testing|replacing|repairing|rebooting|swapping|bringing|taking|driving|heading|working|handling|grabbing)\b",
            r"\b(?:i\s+am\s+|i['’]?m\s+)?(?:going|gonna|imma)\s+to\s+(?:go|grab|bring|check|test|replace|repair|handle|take|head)\b",
            r"\b(?:hard\s*down|system\s+down|machine\s+down|scanner\s+down|offline|unusable|not\s+operational|cannot\s+scan|no\s+connection)\b",
            r"\b(?:schedul(?:e|ed|ing)|appointment|availability|eta|dispatch|send\s+(?:a\s+)?tech|visit|delivery|parts?\s+(?:needed|ordered|arriv|ship))\b",
            r"\b(?:working\s+on|in\s+progress|en\s+route|on\s+the\s+way|at\s+the\s+site|troubleshoot|testing|repairing|replacing|installing|delivering|coordinating)\b",
            r"\b(?:remote(?:ly)?|remote\s+(?:session|connection|access)|teamviewer|anydesk|vpn|ssh|screen\s*share|logged\s+in|logging\s+in)\b",
            r"\b(?:back\s+up|operational|restored|resolved|running\s+again)\b",
            r"\b(?:no\s+rush|not\s+urgent|whenever|when\s+you\s+have\s+time|can\s+wait|next\s+pm|monitor(?:ing)?|follow\s+up\s+later)\b",
            r"\b(?:waiting\s+on|pending|approval|quote|purchase\s+order|vendor|customer\s+(?:reply|response|confirmation)|blocked)\b",
        ]
        return any(re.search(signal, normalized, re.IGNORECASE) for signal in signals)

    @staticmethod
    def _openai_output_text(response: Dict[str, Any]) -> str:
        if response.get("output_text"):
            return str(response["output_text"]).strip()
        parts: List[str] = []
        for output in response.get("output") or []:
            for content in output.get("content") or []:
                text = content.get("text")
                if text:
                    parts.append(str(text))
        return "\n".join(parts).strip()

    def _explicit_assignment_targets(
        self,
        current_assignees: List[Dict[str, str]],
        candidates: List[Dict[str, str]],
        message: Dict[str, Any],
    ) -> List[Dict[str, str]]:
        text = str(message.get("text") or "")
        match = re.search(
            r"\b(?:(?:also\s+)?assign(?:ed|ing)?"
            r"(?:\s+(?:this|it|the\s+(?:task|work\s*order)))?\s+to|"
            r"(?:owner|owners|assignee|assignees)\s*[:=])\s*(?P<targets>.+)",
            text,
            re.IGNORECASE,
        )
        if not match:
            return []

        target_text = match.group("targets")
        targets: List[Dict[str, str]] = []
        for candidate in candidates:
            name = self._clean(candidate.get("name"), 100)
            if not name:
                continue
            if re.search(
                rf"(?<![\w])@?{re.escape(name)}(?![\w])",
                target_text,
                re.IGNORECASE,
            ):
                targets.append(candidate)

        if not targets:
            return []

        prefix = text[: match.start()].lower()
        matched_instruction = text[match.start() : match.end()].lower()
        additive = (
            "also" in prefix
            or "also" in matched_instruction
            or re.search(r"\badd\b", prefix)
        )
        return self._normalize_assignees(
            (current_assignees if additive else []) + targets
        )

    def _requested_assignment_targets(
        self,
        candidates: List[Dict[str, str]],
        message: Dict[str, Any],
    ) -> List[Dict[str, str]]:
        text = str(message.get("text") or "")
        if not re.search(
            r"\b(?:can|could|would|will)\s+you\b|\bplease\b|\bneed\s+you\s+to\b",
            text,
            re.IGNORECASE,
        ):
            return []
        sender_id = self._clean((message.get("sender") or {}).get("id"), 80)
        targets = []
        for candidate in candidates:
            candidate_id = self._clean(candidate.get("id"), 80)
            name = self._clean(candidate.get("name"), 100)
            if not name or (sender_id and candidate_id == sender_id):
                continue
            if re.search(
                rf"(?<![\w])@{re.escape(name)}(?![\w])",
                text,
                re.IGNORECASE,
            ):
                targets.append(candidate)
        return self._normalize_assignees(targets)

    def _infer_assignment(
        self,
        work_order: Dict[str, Any],
        message: Dict[str, Any],
        priority_only: bool = False,
    ) -> Dict[str, Any]:
        protected_assignees = self._normalize_assignees(
            work_order.get("bluefolderAssignees")
        )
        current_assignees = self._merge_assignees(
            protected_assignees, work_order.get("assignees")
        )
        candidates = self._normalize_assignees(
            current_assignees
            + list(message.get("candidates") or [])
            + [message.get("sender") or {}]
        )
        candidate_by_name = {
            candidate["name"].lower(): candidate for candidate in candidates
        }
        current_tier = self._priority_tier(work_order.get("priorityTier"))
        current_label = self._priority_label(
            current_tier, work_order.get("priorityLabel")
        )
        current_generated = bool(work_order.get("priorityGenerated")) or self._priority_generated(
            current_tier
        )
        current_order = self._priority_order(
            current_tier, work_order.get("priorityOrder")
        )
        rejected_tiers = {
            self._priority_tier(tier)
            for tier in work_order.get("rejectedPriorityTiers") or []
        }
        message_text = str(message.get("text") or "")
        priority_evidence = message_text
        if priority_only:
            priority_evidence = " ".join(
                part
                for part in [
                    str(work_order.get("subject") or ""),
                    str(work_order.get("description") or ""),
                    str(work_order.get("priorityContext") or ""),
                ]
                if part.strip()
            )
        rule_priority = self._rule_priority_update(
            current_tier, priority_evidence
        )
        current_remote_active = bool(work_order.get("remoteWorkActive"))
        current_work_mode = self._clean(
            work_order.get("workMode"), 40
        ).lower()
        if current_work_mode not in {
            "remote",
            "in_person",
            "mixed",
            "unspecified",
        }:
            current_work_mode = "unspecified"
        rule_remote = self._rule_remote_work_update(
            current_remote_active,
            str(message.get("remoteRuleText") or message_text),
        )
        memories = self._relevant_company_memory(work_order, message_text)
        memory_ids = [memory["id"] for memory in memories]

        def deterministic_result(
            assignees: List[Dict[str, str]],
            reason: str,
            confidence: float,
        ) -> Dict[str, Any]:
            result = {
                "changed": not self._assignees_match(
                    current_assignees, assignees
                ),
                "assignees": assignees,
                "summary": self._assignment_summary(assignees),
                "reason": reason,
                "confidence": confidence,
                "usage": {"inputTokens": 0, "outputTokens": 0},
                "memoryIds": memory_ids,
            }
            result.update(rule_priority)
            result.update(rule_remote)
            result.update(
                {
                    "priorityLabel": self._priority_label(
                        result.get("priorityTier"), current_label
                    ),
                    "priorityGenerated": self._priority_generated(
                        result.get("priorityTier")
                    ),
                    "priorityOrder": self._priority_order(
                        result.get("priorityTier"), current_order
                    ),
                    "priorityContext": self._clean(
                        message_text or work_order.get("priorityContext"), 900
                    ),
                }
            )
            return result

        if not priority_only:
            explicit_targets = self._explicit_assignment_targets(
                current_assignees, candidates, message
            )
            explicit_targets = (
                self._merge_assignees(protected_assignees, explicit_targets)
                if explicit_targets
                else []
            )
            if explicit_targets:
                target_names = ", ".join(
                    entry["name"] for entry in explicit_targets
                )
                return deterministic_result(
                    explicit_targets,
                    "The Slack message explicitly assigns the work order to "
                    f"{target_names}.",
                    0.99,
                )

            requested_targets = self._requested_assignment_targets(
                candidates, message
            )
            requested_targets = (
                self._merge_assignees(protected_assignees, requested_targets)
                if requested_targets
                else []
            )
            if requested_targets:
                target_names = ", ".join(
                    entry["name"] for entry in requested_targets
                )
                return deterministic_result(
                    requested_targets,
                    f"The Slack message directly asks {target_names} to handle the work.",
                    0.96,
                )

            is_general_request = re.search(
                r"\b(?:can|could|would|will)\s+you\b|\bplease\b|\bneed\s+someone\b",
                message_text,
                re.IGNORECASE,
            )
            first_person_commitment = re.search(
                r"\b(?:i\s+am|i['’]?m|i['’]?ll|i\s+will|we\s+are|we['’]?re)\b",
                message_text,
                re.IGNORECASE,
            )
            if is_general_request and not first_person_commitment:
                return deterministic_result(
                    current_assignees,
                    "The message is a general request and does not identify a new owner.",
                    0.98,
                )

        compact = lambda value, length: re.sub(
            r"\s+", " ", str(value or "")
        ).strip()[:length]
        payload = {
            "model": self.settings.ops_assignment_model,
            "store": False,
            "input": [
                {
                    "role": "system",
                    "content": (
                        "Update a field-service work order from its current state and one "
                        "new Slack message. For assignment, change responsibility only for "
                        "an explicit assignment, acceptance, handoff, removal, or clear "
                        "statement that someone is now handling the task. Interpret "
                        "first-person commitments as the sender. Technical advisers, people "
                        "merely notified, question askers, and status reporters are not owners "
                        "unless they accept responsibility. BlueFolder-protected engineers "
                        "must remain assigned. Multiple owners are allowed, but use only "
                        "supplied candidate names. The newest Slack message is the strongest "
                        "category evidence; the compact prior situation and saved examples only "
                        "provide continuity or explain company language. For operational category, choose hard_down "
                        "only when equipment or customer operation is currently stopped or "
                        "unusable; needs_scheduled when the next meaningful step is arranging "
                        "a date, visit, technician, part, or delivery; and in_progress when "
                        "active troubleshooting, travel, repair, testing, delivery, or "
                        "coordination is underway without a current hard-down condition. "
                        "Choose anytime when the work is genuinely non-urgent and can be handled "
                        "without a schedule or current active response. Prefer these four standard "
                        "categories. Only if none fits a distinct, reusable operational state, create "
                        "a concise 2-4 word category using a generated_lowercase_slug tier, mark it "
                        "generated, and place it at urgency order 0-3. Never reuse a rejected category. "
                        "Do not mark completed because "
                        "only !done completes an order. Hard_down stays hard_down until clear "
                        "evidence says operation was restored or the classification was wrong. "
                        "Separately decide whether someone is actively working the issue remotely "
                        "right now. Remote work means current hands-on remote troubleshooting, "
                        "diagnosis, testing, software work, or a live remote session. A request "
                        "to add remote access, a future remote plan, or merely mentioning remote "
                        "is not active remote work. Preserve the current remote state unless the "
                        "newest evidence clearly starts or ends remote work. "
                        "Saved company examples are advisory and never stronger than current "
                        "evidence. Update priorityContext as a short factual statement of the current "
                        "operational situation so later messages do not require rereading the thread. "
                        "If a field did not change, retain its current value. Give "
                        "short observable reasons, not private chain-of-thought."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        "Mode: "
                        + (
                            "initial category classification; do not change assignment"
                            if priority_only
                            else "incremental Slack update"
                        )
                        + "\n"
                        f"Work order: #{compact(work_order.get('number'), 100)} "
                        f"{compact(work_order.get('subject'), 400)}\n"
                        f"Customer: {compact(work_order.get('customer'), 220) or 'Unknown'}\n"
                        f"Description: {compact(work_order.get('description'), 1200) or 'Not supplied'}\n"
                        "Current assignees: "
                        f"{', '.join(x['name'] for x in current_assignees) or 'Unassigned'}\n"
                        "BlueFolder-protected assignees: "
                        f"{', '.join(x['name'] for x in protected_assignees) or 'None'}\n"
                        "Allowed candidate names: "
                        f"{', '.join(x['name'] for x in candidates) or 'None'}\n"
                        f"Current operational category: {current_tier} ({current_label})\n"
                        f"Current category is generated: {str(current_generated).lower()}\n"
                        f"Current operational situation: {compact(work_order.get('priorityContext'), 900) or compact(work_order.get('priorityReason'), 700) or 'Not established yet'}\n"
                        f"Current remote work active: {str(current_remote_active).lower()}\n"
                        f"Current work mode: {current_work_mode}\n"
                        "Rejected categories: "
                        f"{', '.join(sorted(rejected_tiers)) or 'None'}\n"
                        f"New message sender: {compact((message.get('sender') or {}).get('name'), 100) or 'None'}\n"
                        f"New message: {compact(message_text, 2400) or 'No Slack message yet'}\n"
                        "Relevant saved company examples:\n"
                        f"{self._memory_context(memories)}"
                    ),
                },
            ],
            "max_output_tokens": max(
                440, self.settings.ops_assignment_max_output_tokens
            ),
            "reasoning": {
                "effort": self.settings.ops_assignment_reasoning_effort
            },
            "text": {
                "verbosity": "low",
                "format": {
                    "type": "json_schema",
                    "name": "ops_state_update",
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "additionalProperties": False,
                        "properties": {
                            "changed": {"type": "boolean"},
                            "assigneeNames": {
                                "type": "array",
                                "items": {"type": "string"},
                                "maxItems": 12,
                            },
                            "summary": {"type": "string"},
                            "reason": {"type": "string"},
                            "confidence": {
                                "type": "number",
                                "minimum": 0,
                                "maximum": 1,
                            },
                            "priorityChanged": {"type": "boolean"},
                            "priorityTier": {
                                "type": "string",
                                "maxLength": 60,
                            },
                            "priorityLabel": {"type": "string", "maxLength": 80},
                            "priorityGenerated": {"type": "boolean"},
                            "priorityOrder": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 3,
                            },
                            "priorityReason": {"type": "string"},
                            "priorityContext": {"type": "string"},
                            "priorityConfidence": {
                                "type": "number",
                                "minimum": 0,
                                "maximum": 1,
                            },
                            "workMode": {
                                "type": "string",
                                "enum": [
                                    "remote",
                                    "in_person",
                                    "mixed",
                                    "unspecified",
                                ],
                            },
                            "remoteWorkActive": {"type": "boolean"},
                            "remoteStateChanged": {"type": "boolean"},
                            "remoteWorkReason": {"type": "string"},
                            "remoteWorkConfidence": {
                                "type": "number",
                                "minimum": 0,
                                "maximum": 1,
                            },
                        },
                        "required": [
                            "changed",
                            "assigneeNames",
                            "summary",
                            "reason",
                            "confidence",
                            "priorityChanged",
                            "priorityTier",
                            "priorityLabel",
                            "priorityGenerated",
                            "priorityOrder",
                            "priorityReason",
                            "priorityContext",
                            "priorityConfidence",
                            "workMode",
                            "remoteWorkActive",
                            "remoteStateChanged",
                            "remoteWorkReason",
                            "remoteWorkConfidence",
                        ],
                    },
                },
            },
        }
        response = self.openai_session.post(
            "https://api.openai.com/v1/responses",
            json=payload,
            timeout=self.settings.ops_request_timeout,
        )
        if not response.ok:
            raise RuntimeError(
                f"OpenAI Ops state analysis returned HTTP {response.status_code}: "
                f"{(response.text or '')[:500]}"
            )
        response_data = response.json()
        output = json.loads(self._openai_output_text(response_data))
        requested = [
            candidate_by_name[name]
            for raw_name in output.get("assigneeNames") or []
            if (name := compact(raw_name, 100).lower()) in candidate_by_name
        ]
        assignment_changed = bool(output.get("changed")) and not priority_only
        assignees = (
            self._merge_assignees(protected_assignees, requested)
            if assignment_changed
            else current_assignees
        )
        requested_tier = self._priority_tier(output.get("priorityTier"))
        requested_generated = self._priority_generated(requested_tier)
        requested_label = self._priority_label(
            requested_tier, output.get("priorityLabel")
        )
        requested_order = self._priority_order(
            requested_tier, output.get("priorityOrder")
        )
        priority_confidence = float(output.get("priorityConfidence") or 0)
        if requested_tier in rejected_tiers:
            requested_tier = current_tier
            requested_label = current_label
            requested_generated = current_generated
            requested_order = current_order
        priority_changed = (
            bool(output.get("priorityChanged"))
            and requested_tier != current_tier
            and priority_confidence >= 0.72
            and (not requested_generated or priority_confidence >= 0.82)
        )
        priority_result = {
            "priorityChanged": priority_changed,
            "priorityTier": requested_tier if priority_changed else current_tier,
            "priorityLabel": requested_label if priority_changed else current_label,
            "priorityGenerated": requested_generated if priority_changed else current_generated,
            "priorityOrder": requested_order if priority_changed else current_order,
            "priorityReason": compact(
                output.get("priorityReason")
                or "The latest evidence did not justify an operational-category change.",
                700,
            ),
            "priorityContext": compact(
                output.get("priorityContext")
                or work_order.get("priorityContext")
                or output.get("priorityReason"),
                900,
            ),
            "priorityConfidence": priority_confidence,
        }
        if rule_priority.get("priorityChanged"):
            rule_tier = self._priority_tier(rule_priority.get("priorityTier"))
            if rule_tier not in rejected_tiers:
                priority_result.update(rule_priority)
                priority_result.update(
                    {
                        "priorityLabel": self._priority_label(rule_tier),
                        "priorityGenerated": False,
                        "priorityOrder": self._priority_order(rule_tier),
                    }
                )
        remote_confidence = float(output.get("remoteWorkConfidence") or 0)
        requested_remote_active = bool(output.get("remoteWorkActive"))
        remote_changed = (
            (bool(output.get("remoteStateChanged")) or priority_only)
            and requested_remote_active != current_remote_active
            and remote_confidence >= 0.72
        )
        requested_work_mode = compact(output.get("workMode"), 40).lower()
        if requested_work_mode not in {
            "remote",
            "in_person",
            "mixed",
            "unspecified",
        }:
            requested_work_mode = (
                "remote" if requested_remote_active else "unspecified"
            )
        remote_result = {
            "remoteStateChanged": remote_changed,
            "remoteWorkActive": (
                requested_remote_active
                if remote_changed
                else current_remote_active
            ),
            "remoteWorkReason": compact(
                output.get("remoteWorkReason")
                or (
                    "The conversation indicates active remote work."
                    if current_remote_active
                    else "The latest message does not establish active remote work."
                ),
                700,
            ),
            "remoteWorkConfidence": remote_confidence,
            "workMode": (
                requested_work_mode if remote_changed else current_work_mode
            ),
        }
        if rule_remote.get("remoteStateChanged"):
            remote_result.update(rule_remote)
        usage = response_data.get("usage") or {}
        return {
            "changed": assignment_changed,
            "assignees": assignees,
            "summary": (
                self._assignment_summary(assignees)
                if assignment_changed
                else compact(
                    output.get("summary")
                    or self._assignment_summary(assignees),
                    700,
                )
            ),
            "reason": compact(
                output.get("reason")
                or (
                    "The latest Slack message explicitly changed who is responsible."
                    if assignment_changed
                    else "The latest Slack message did not clearly change responsibility."
                ),
                700,
            ),
            "confidence": float(output.get("confidence") or 0),
            **priority_result,
            **remote_result,
            "memoryIds": memory_ids,
            "usage": {
                "inputTokens": int(usage.get("input_tokens") or 0),
                "outputTokens": int(usage.get("output_tokens") or 0),
            },
        }
    def _save_assignment_analysis(
        self,
        work_order_id: str,
        raw_message_id: str,
        analysis: Dict[str, Any],
        message: Dict[str, Any],
    ) -> Dict[str, bool]:
        ref = self._work_order_ref(work_order_id)
        msg_ref = ref.collection(self.MESSAGE_COLLECTION).document(
            self._message_id(raw_message_id)
        )
        transaction = self.db.transaction()

        @firestore.transactional
        def save(txn):
            snapshot = ref.get(transaction=txn)
            if not snapshot.exists:
                raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
            current = snapshot.to_dict() or {}
            protected_assignees = self._normalize_assignees(
                current.get("bluefolderAssignees")
            )
            previous_assignees = self._normalize_assignees(
                current.get("assignees")
            )
            protected_previous = self._merge_assignees(
                protected_assignees, previous_assignees
            )
            next_assignees = self._merge_assignees(
                protected_assignees, analysis.get("assignees")
            )
            protection_repair = not self._assignees_match(
                previous_assignees, protected_previous
            )
            assignment_changed = (
                bool(analysis.get("changed")) or protection_repair
            ) and not self._assignees_match(previous_assignees, next_assignees)
            decision_reason = self._clean(analysis.get("reason"), 700)
            remote_confidence = float(
                analysis.get("remoteWorkConfidence") or 0
            )
            remote_change_accepted = (
                bool(analysis.get("remoteStateChanged"))
                and remote_confidence >= 0.72
            )
            next_remote_active = (
                bool(analysis.get("remoteWorkActive"))
                if remote_change_accepted
                else bool(current.get("remoteWorkActive"))
            )
            requested_work_mode = self._clean(
                analysis.get("workMode"), 40
            ).lower()
            if requested_work_mode not in {
                "remote",
                "in_person",
                "mixed",
                "unspecified",
            }:
                requested_work_mode = (
                    "remote" if next_remote_active else "unspecified"
                )
            next_work_mode = (
                requested_work_mode
                if remote_change_accepted
                else (
                    self._clean(current.get("workMode"), 40).lower()
                    or ("remote" if next_remote_active else "unspecified")
                )
            )
            current_stage = self._workflow_stage(current)
            desired_stage = (
                "active"
                if protected_assignees
                else ("remote" if next_remote_active else "unassigned")
            )
            workflow_update = (
                {}
                if current_stage in {"service_complete", "done"}
                else self._workflow_transition_update(
                    current,
                    desired_stage,
                    changed_by=self._clean(
                        (message.get("sender") or {}).get("name"), 100
                    )
                    or "Magmo AI",
                    source="remote_inference",
                    reason=(
                        self._clean(analysis.get("remoteWorkReason"), 500)
                        or (
                            "Slack indicates active remote work."
                            if next_remote_active
                            else "No active remote work is currently established."
                        )
                    ),
                    now_iso=utc_now_iso(),
                )
            )
            update: Dict[str, Any] = {
                "assignees": (
                    next_assignees if assignment_changed else protected_previous
                ),
                "assignmentSummary": (
                    self._assignment_summary(next_assignees)
                    if assignment_changed
                    else self._clean(analysis.get("summary"), 700)
                ),
                "assignmentDecisionReason": decision_reason,
                "assignmentConfidence": float(analysis.get("confidence") or 0),
                "priorityContext": self._clean(
                    analysis.get("priorityContext")
                    or current.get("priorityContext"),
                    900,
                ),
                "remoteWorkActive": next_remote_active,
                "remoteWorkReason": self._clean(
                    analysis.get("remoteWorkReason")
                    or current.get("remoteWorkReason"),
                    700,
                ),
                "remoteWorkConfidence": remote_confidence,
                "remoteInferenceVersion": self.CURRENT_REMOTE_INFERENCE_VERSION,
                "workMode": next_work_mode,
                **workflow_update,
                "analysisInputTokens": firestore.Increment(
                    int((analysis.get("usage") or {}).get("inputTokens") or 0)
                ),
                "analysisOutputTokens": firestore.Increment(
                    int((analysis.get("usage") or {}).get("outputTokens") or 0)
                ),
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
            now_iso = utc_now_iso()
            if assignment_changed:
                history = list(current.get("assignmentHistory") or [])
                history.append(
                    {
                        "id": self._message_id(raw_message_id),
                        "source": "ai",
                        "previousAssignees": previous_assignees,
                        "assignees": next_assignees,
                        "reason": decision_reason,
                        "triggerMessage": self._clean(message.get("text"), 1000),
                        "triggerSender": self._clean(
                            (message.get("sender") or {}).get("name"), 100
                        ),
                        "triggerSlackTs": self._clean(
                            message.get("slackTs"), 180
                        ),
                        "confidence": float(analysis.get("confidence") or 0),
                        "changedAtIso": now_iso,
                    }
                )
                update["assignmentHistory"] = history[
                    -self.MAX_ASSIGNMENT_HISTORY :
                ]
                update["assignmentUpdatedAt"] = firestore.SERVER_TIMESTAMP
            previous_tier = self._priority_tier(current.get("priorityTier"))
            requested_tier = self._priority_tier(analysis.get("priorityTier"))
            priority_confidence = float(
                analysis.get("priorityConfidence") or 0
            )
            priority_changed = (
                str(current.get("status") or "").lower() in self.ACTIVE_STATUSES
                and bool(analysis.get("priorityChanged"))
                and requested_tier != previous_tier
                and priority_confidence >= 0.72
            )
            priority_reason = self._clean(
                analysis.get("priorityReason"), 700
            )
            if priority_changed:
                priority_history = list(current.get("priorityHistory") or [])
                priority_history.append(
                    {
                        "id": self._message_id(raw_message_id),
                        "source": "ai",
                        "previousTier": previous_tier,
                        "priorityTier": requested_tier,
                        "reason": priority_reason,
                        "triggerMessage": self._clean(message.get("text"), 1000),
                        "triggerSender": self._clean(
                            (message.get("sender") or {}).get("name"), 100
                        ),
                        "triggerSlackTs": self._clean(
                            message.get("slackTs"), 180
                        ),
                        "confidence": priority_confidence,
                        "memoryIds": list(analysis.get("memoryIds") or [])[:5],
                        "changedAtIso": now_iso,
                    }
                )
                update.update(
                    {
                        "priorityTier": requested_tier,
                        "priorityLabel": self._priority_label(
                            requested_tier, analysis.get("priorityLabel")
                        ),
                        "priorityGenerated": bool(
                            analysis.get("priorityGenerated")
                        )
                        or self._priority_generated(requested_tier),
                        "priorityOrder": self._priority_order(
                            requested_tier, analysis.get("priorityOrder")
                        ),
                        "priorityReason": priority_reason,
                        "priorityConfidence": priority_confidence,
                        "prioritySource": "ai",
                        "priorityHistory": priority_history[
                            -self.MAX_PRIORITY_HISTORY :
                        ],
                        "priorityUpdatedAt": firestore.SERVER_TIMESTAMP,
                        "priorityRank": int(time.time() * 1000),
                    }
                )
            txn.set(ref, update, merge=True)
            txn.set(
                msg_ref,
                {
                    "analysisStatus": "completed",
                    "analysisChangedAssignment": assignment_changed,
                    "analysisReason": decision_reason,
                    "analysisConfidence": float(
                        analysis.get("confidence") or 0
                    ),
                    "analysisChangedPriority": priority_changed,
                    "analysisPriorityTier": (
                        requested_tier if priority_changed else previous_tier
                    ),
                    "analysisPriorityReason": priority_reason,
                    "analysisPriorityConfidence": priority_confidence,
                    "analysisChangedRemoteWork": remote_change_accepted,
                    "analysisRemoteWorkActive": next_remote_active,
                    "analysisRemoteWorkReason": self._clean(
                        analysis.get("remoteWorkReason"), 700
                    ),
                    "analysisRemoteWorkConfidence": remote_confidence,
                    "analysisMemoryIds": list(
                        analysis.get("memoryIds") or []
                    )[:5],
                    "analyzedAt": firestore.SERVER_TIMESTAMP,
                },
                merge=True,
            )
            return {
                "changed": assignment_changed,
                "priorityChanged": priority_changed,
                "remoteChanged": remote_change_accepted,
                "remoteWorkActive": next_remote_active,
            }

        return save(transaction)

    def _save_feedback_reclassification(
        self, work_order_id: str, analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        transaction = self.db.transaction()

        @firestore.transactional
        def save(txn):
            snapshot = ref.get(transaction=txn)
            if not snapshot.exists:
                raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
            current = snapshot.to_dict() or {}
            current_tier = self._priority_tier(current.get("priorityTier"))
            requested_tier = self._priority_tier(analysis.get("priorityTier"))
            rejected = {
                self._priority_tier(tier)
                for tier in current.get("rejectedPriorityTiers") or []
            }
            confidence = float(analysis.get("priorityConfidence") or 0)
            changed = (
                requested_tier != current_tier
                and requested_tier not in rejected
                and confidence >= 0.65
                and (
                    not self._priority_generated(requested_tier)
                    or confidence >= 0.82
                )
            )
            next_tier = requested_tier if changed else current_tier
            next_label = self._priority_label(
                next_tier,
                analysis.get("priorityLabel")
                if changed
                else current.get("priorityLabel"),
            )
            next_generated = (
                bool(analysis.get("priorityGenerated"))
                or self._priority_generated(next_tier)
                if changed
                else bool(current.get("priorityGenerated"))
                or self._priority_generated(next_tier)
            )
            next_order = self._priority_order(
                next_tier,
                analysis.get("priorityOrder")
                if changed
                else current.get("priorityOrder"),
            )
            priority_reason = self._clean(
                analysis.get("priorityReason")
                or "The feedback correction was reviewed against the current operational context.",
                700,
            )
            update: Dict[str, Any] = {
                "priorityTier": next_tier,
                "priorityLabel": next_label,
                "priorityGenerated": next_generated,
                "priorityOrder": next_order,
                "priorityReason": priority_reason,
                "priorityContext": self._clean(
                    analysis.get("priorityContext")
                    or current.get("priorityContext"),
                    900,
                ),
                "priorityConfidence": confidence,
                "prioritySource": "ai_feedback",
                "priorityInferenceVersion": self.CURRENT_PRIORITY_INFERENCE_VERSION,
                "priorityReclassificationRequested": False,
                "priorityFeedback": firestore.DELETE_FIELD,
                "priorityReclassificationCompletedAt": firestore.SERVER_TIMESTAMP,
                "priorityReclassificationError": firestore.DELETE_FIELD,
                "priorityReclassificationNextRetryAtMs": firestore.DELETE_FIELD,
                "priorityUpdatedAt": firestore.SERVER_TIMESTAMP,
                "priorityRank": int(time.time() * 1000),
                "analysisInputTokens": firestore.Increment(
                    int((analysis.get("usage") or {}).get("inputTokens") or 0)
                ),
                "analysisOutputTokens": firestore.Increment(
                    int((analysis.get("usage") or {}).get("outputTokens") or 0)
                ),
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
            if changed:
                history = list(current.get("priorityHistory") or [])
                history.append(
                    {
                        "id": f"feedback-ai-{int(time.time() * 1000)}",
                        "source": "ai_feedback",
                        "previousTier": current_tier,
                        "priorityTier": next_tier,
                        "priorityLabel": next_label,
                        "priorityGenerated": next_generated,
                        "reason": priority_reason,
                        "triggerMessage": "",
                        "triggerSender": "Magmo AI",
                        "triggerSlackTs": "",
                        "confidence": confidence,
                        "memoryIds": list(analysis.get("memoryIds") or [])[:5],
                        "changedAtIso": utc_now_iso(),
                    }
                )
                update["priorityHistory"] = history[-self.MAX_PRIORITY_HISTORY :]
            txn.set(ref, update, merge=True)
            merged = dict(current)
            merged.update(update)
            return self._serialize_work_order(work_order_id, merged)

        return save(transaction)

    def process_pending_category_feedback(self, limit: int = 6) -> int:
        processed = 0
        now_ms = int(time.time() * 1000)
        pending = (
            self.db.collection(self.COLLECTION)
            .where("priorityReclassificationRequested", "==", True)
            .limit(max(1, min(25, int(limit))))
            .stream()
        )
        for snapshot in pending:
            data = snapshot.to_dict() or {}
            if str(data.get("status") or "").lower() not in self.ACTIVE_STATUSES:
                snapshot.reference.set(
                    {"priorityReclassificationRequested": False}, merge=True
                )
                continue
            if int(data.get("priorityReclassificationNextRetryAtMs") or 0) > now_ms:
                continue
            work_order = self._serialize_work_order(snapshot.id, data)
            try:
                analysis = self._infer_assignment(
                    work_order,
                    {"sender": {}, "text": "", "candidates": [], "slackTs": ""},
                    priority_only=True,
                )
                self._save_feedback_reclassification(snapshot.id, analysis)
                processed += 1
            except Exception as exc:
                attempts = int(data.get("priorityReclassificationAttempts") or 0) + 1
                snapshot.reference.set(
                    {
                        "priorityReclassificationAttempts": attempts,
                        "priorityReclassificationError": self._clean(exc, 600),
                        "priorityReclassificationNextRetryAtMs": now_ms
                        + min(15 * 60 * 1000, 60 * 1000 * attempts),
                        "updatedAt": firestore.SERVER_TIMESTAMP,
                    },
                    merge=True,
                )
                logging.warning(
                    "Ops category feedback reclassification failed for %s: %s",
                    snapshot.id,
                    exc,
                )
        return processed

    @staticmethod
    def _flatten_client_location(value: Any) -> str:
        if isinstance(value, str):
            return re.sub(r"\s+", " ", value).strip()[:600]
        if isinstance(value, list):
            return ", ".join(
                part
                for item in value
                if (part := FirebaseOpsClient._flatten_client_location(item))
            )[:600]
        if isinstance(value, dict):
            return ", ".join(
                part
                for item in value.values()
                if (part := FirebaseOpsClient._flatten_client_location(item))
            )[:600]
        return str(value or "").strip()[:600]

    def _client_match_records(self) -> List[Tuple[str, Dict[str, Any]]]:
        if (
            self._client_match_cache
            and time.monotonic() - self._client_match_cache_loaded_at < 300
        ):
            return list(self._client_match_cache)
        records: List[Tuple[str, Dict[str, Any]]] = []
        for snapshot in self.db.collection(self.CLIENT_COLLECTION).limit(500).stream():
            data = snapshot.to_dict() or {}
            name = self._clean(
                data.get("name")
                or data.get("clientName")
                or data.get("companyName"),
                220,
            )
            if not name:
                continue
            records.append(
                (
                    snapshot.id,
                    {
                        "name": name,
                        "location": self._flatten_client_location(
                            data.get("location") or data.get("address")
                        ),
                    },
                )
            )
        self._client_match_cache = records
        self._client_match_cache_loaded_at = time.monotonic()
        return list(records)

    def _client_match_candidates(
        self, company_name: str, request_location: str, limit: int = 8
    ) -> List[Dict[str, Any]]:
        requested_name = self._name_key(company_name)
        requested_location = self._name_key(request_location)
        candidates: List[Dict[str, Any]] = []
        for client_id, client in self._client_match_records():
            client_name = self._name_key(client.get("name"))
            client_location = self._name_key(client.get("location"))
            if not client_name:
                continue
            name_score = SequenceMatcher(None, requested_name, client_name).ratio()
            if requested_name and (
                requested_name in client_name or client_name in requested_name
            ):
                name_score = max(name_score, 0.9)
            location_score = (
                SequenceMatcher(
                    None, requested_location[:300], client_location[:300]
                ).ratio()
                if requested_location and client_location
                else 0.0
            )
            score = name_score * 0.78 + location_score * 0.22
            if score < 0.24:
                continue
            candidates.append(
                {
                    "id": client_id,
                    "name": client.get("name") or "",
                    "location": client.get("location") or "",
                    "shortlistScore": round(score, 4),
                }
            )
        return sorted(
            candidates,
            key=lambda candidate: candidate["shortlistScore"],
            reverse=True,
        )[: max(1, min(12, int(limit)))]

    def _infer_service_request_client(
        self, request_id: str, request: Dict[str, Any], candidates: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        if not candidates:
            return {
                "clientId": "",
                "confidence": 0,
                "reason": "No Client DB records were similar enough to shortlist.",
                "usage": {"inputTokens": 0, "outputTokens": 0},
            }
        payload = {
            "model": self.settings.ops_assignment_model,
            "store": False,
            "input": [
                {
                    "role": "system",
                    "content": (
                        "Match one website service request to an existing internal client. "
                        "Choose only from the supplied candidate IDs. Company name and equipment "
                        "address are the deciding evidence. Select an ID only when the evidence is "
                        "strong enough for a human to confirm; otherwise return an empty clientId. "
                        "Never invent or merge clients. Give a short observable reason."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Request ID: {request_id}\n"
                        f"Submitted company: {self._clean(request.get('companyName'), 220)}\n"
                        f"Equipment address: {self._clean(request.get('locationText'), 700)}\n"
                        "Allowed Client DB candidates:\n"
                        + json.dumps(candidates, ensure_ascii=False)
                    ),
                },
            ],
            "max_output_tokens": 260,
            "reasoning": {
                "effort": self.settings.ops_assignment_reasoning_effort
            },
            "text": {
                "verbosity": "low",
                "format": {
                    "type": "json_schema",
                    "name": "service_request_client_match",
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "additionalProperties": False,
                        "properties": {
                            "clientId": {"type": "string"},
                            "confidence": {
                                "type": "number",
                                "minimum": 0,
                                "maximum": 1,
                            },
                            "reason": {"type": "string"},
                        },
                        "required": ["clientId", "confidence", "reason"],
                    },
                },
            },
        }
        response = self.openai_session.post(
            "https://api.openai.com/v1/responses",
            json=payload,
            timeout=self.settings.ops_request_timeout,
        )
        if not response.ok:
            raise RuntimeError(
                f"OpenAI client matching returned HTTP {response.status_code}: "
                f"{(response.text or '')[:500]}"
            )
        response_data = response.json()
        output = json.loads(self._openai_output_text(response_data))
        allowed = {candidate["id"]: candidate for candidate in candidates}
        client_id = self._clean(output.get("clientId"), 180)
        confidence = float(output.get("confidence") or 0)
        if client_id not in allowed or confidence < 0.55:
            client_id = ""
        usage = response_data.get("usage") or {}
        return {
            "clientId": client_id,
            "confidence": confidence,
            "reason": self._clean(output.get("reason"), 500),
            "usage": {
                "inputTokens": int(usage.get("input_tokens") or 0),
                "outputTokens": int(usage.get("output_tokens") or 0),
            },
        }

    def process_pending_service_request_matches(self, limit: int = 3) -> int:
        processed = 0
        now_ms = int(time.time() * 1000)
        pending = (
            self.db.collection(self.SERVICE_REQUEST_COLLECTION)
            .where("clientMatchStatus", "==", "pending")
            .limit(max(1, min(12, int(limit))))
            .stream()
        )
        clients_by_id = dict(self._client_match_records())
        for snapshot in pending:
            request = snapshot.to_dict() or {}
            if str(request.get("status") or "pending").lower() not in {
                "pending",
                "accepted_pending_sync",
            }:
                continue
            if int(request.get("clientMatchNextRetryAtMs") or 0) > now_ms:
                continue
            try:
                candidates = self._client_match_candidates(
                    self._clean(request.get("companyName"), 220),
                    self._clean(request.get("locationText"), 700),
                )
                analysis = self._infer_service_request_client(
                    snapshot.id, request, candidates
                )
                client_id = analysis.get("clientId") or ""
                client = clients_by_id.get(client_id) if client_id else None
                suggested = (
                    {
                        "id": client_id,
                        "name": client.get("name") or "",
                        "location": client.get("location") or "",
                        "confidence": float(analysis.get("confidence") or 0),
                        "reason": self._clean(analysis.get("reason"), 500),
                        "matchedBy": "ops_ai",
                    }
                    if client
                    else None
                )
                snapshot.reference.set(
                    {
                        "suggestedClient": suggested,
                        "clientMatchStatus": "matched" if suggested else "no_match",
                        "clientMatchAttempts": int(
                            request.get("clientMatchAttempts") or 0
                        )
                        + 1,
                        "clientMatchError": firestore.DELETE_FIELD,
                        "clientMatchNextRetryAtMs": firestore.DELETE_FIELD,
                        "clientMatchedAt": firestore.SERVER_TIMESTAMP,
                        "clientMatchInputTokens": firestore.Increment(
                            int((analysis.get("usage") or {}).get("inputTokens") or 0)
                        ),
                        "clientMatchOutputTokens": firestore.Increment(
                            int((analysis.get("usage") or {}).get("outputTokens") or 0)
                        ),
                        "updatedAt": firestore.SERVER_TIMESTAMP,
                    },
                    merge=True,
                )
                processed += 1
            except Exception as exc:
                attempts = int(request.get("clientMatchAttempts") or 0) + 1
                snapshot.reference.set(
                    {
                        "clientMatchAttempts": attempts,
                        "clientMatchError": self._clean(exc, 600),
                        "clientMatchNextRetryAtMs": now_ms
                        + min(15 * 60 * 1000, 60 * 1000 * attempts),
                        "updatedAt": firestore.SERVER_TIMESTAMP,
                    },
                    merge=True,
                )
                logging.warning(
                    "Ops client matching failed for service request %s: %s",
                    snapshot.id,
                    exc,
                )
        return processed

    def active_intake_thread_records(self) -> List[Tuple[str, Dict[str, Any]]]:
        records: List[Tuple[str, Dict[str, Any]]] = []
        for snapshot in self.db.collection(self.COLLECTION).limit(500).stream():
            data = snapshot.to_dict() or {}
            if str(data.get("status") or "").lower() not in self.ACTIVE_STATUSES:
                continue
            if not self._clean(data.get("intakeServiceRequestId"), 180):
                continue
            channel = self._clean(data.get("slackChannel"), 120)
            thread_ts = self._clean(data.get("slackThreadTs"), 120)
            if not channel or not thread_ts:
                continue
            records.append(
                (
                    snapshot.id,
                    {
                        "number": self._clean(
                            data.get("number") or snapshot.id, 120
                        ),
                        "subject": self._clean(data.get("subject"), 1200),
                        "description": self._clean(data.get("description"), 1800),
                        "customer": self._clean(data.get("customer"), 220),
                        "created_at": self._clean(data.get("createdAtIso"), 80),
                        "bluefolder_url": self._clean(
                            data.get("bluefolderUrl"), 1200
                        ),
                        "slack_channel": channel,
                        "slack_ts": thread_ts,
                        "slack_permalink": self._clean(
                            data.get("slackPermalink"), 1200
                        ),
                        "bluefolder_assignees": self._normalize_assignees(
                            data.get("bluefolderAssignees")
                        ),
                        "ops_created_at": utc_now_iso(),
                        "website_intake": True,
                    },
                )
            )
        return records

    def process_pending_priority_inference(self, limit: int = 2) -> int:
        """Revisit active records classified by an older inference version.

        This is deliberately a small background batch so an upgrade does not
        create a burst of OpenAI requests. New work orders are still classified
        immediately by create_work_order().
        """
        if self.priority_review_complete:
            return 0

        stale = []
        for snapshot in (
            self.db.collection(self.COLLECTION).limit(500).stream()
        ):
            data = snapshot.to_dict() or {}
            if str(data.get("status") or "").lower() not in self.ACTIVE_STATUSES:
                continue
            if self._workflow_stage(data) in {"service_complete", "done"}:
                continue
            if (
                int(data.get("priorityInferenceVersion") or 0)
                >= self.CURRENT_PRIORITY_INFERENCE_VERSION
            ):
                continue
            source = self._clean(data.get("prioritySource"), 40).lower()
            if source not in {"", "initial", "ai_initial"}:
                continue
            stale.append(snapshot)

        if not stale:
            self.priority_review_complete = True
            return 0

        processed = 0
        for snapshot in stale[: max(1, min(10, int(limit)))]:
            data = snapshot.to_dict() or {}
            work_order = self._serialize_work_order(snapshot.id, data)
            try:
                analysis = self._infer_assignment(
                    work_order,
                    {"sender": {}, "text": "", "candidates": [], "slackTs": ""},
                    priority_only=True,
                )
                self._save_initial_priority_analysis(snapshot.id, analysis)
                processed += 1
            except Exception as exc:
                logging.warning(
                    "Ops category upgrade review failed for %s; it will retry: %s",
                    snapshot.id,
                    exc,
                )
        return processed

    def process_pending_remote_inference(self, limit: int = 2) -> int:
        """Bootstrap the Remote tab from the saved Slack conversation."""
        if self.remote_review_complete:
            return 0

        stale = []
        for snapshot in (
            self.db.collection(self.COLLECTION).limit(500).stream()
        ):
            data = snapshot.to_dict() or {}
            if str(data.get("status") or "").lower() not in self.ACTIVE_STATUSES:
                continue
            if self._workflow_stage(data) in {"service_complete", "done"}:
                continue
            if self._normalize_assignees(data.get("bluefolderAssignees")):
                continue
            if (
                int(data.get("remoteInferenceVersion") or 0)
                >= self.CURRENT_REMOTE_INFERENCE_VERSION
            ):
                continue
            stale.append(snapshot)

        if not stale:
            self.remote_review_complete = True
            return 0

        processed = 0
        for snapshot in stale[: max(1, min(10, int(limit)))]:
            data = snapshot.to_dict() or {}
            messages = list(
                snapshot.reference.collection(self.MESSAGE_COLLECTION)
                .limit(100)
                .stream()
            )
            message_rows = []
            for message_snapshot in messages:
                message = message_snapshot.to_dict() or {}
                text = self._clean(message.get("text"), 1000)
                if not text:
                    continue
                sender = self._clean(
                    (message.get("sender") or {}).get("name"), 100
                )
                message_rows.append(
                    (
                        self._clean(message.get("slackTs"), 180),
                        f"{sender or 'Unknown'}: {text}",
                    )
                )
            message_rows.sort(
                key=lambda entry: (
                    float(entry[0])
                    if re.fullmatch(r"\d+(?:\.\d+)?", entry[0])
                    else 0
                )
            )
            conversation = "\n".join(
                row for _, row in message_rows[-12:]
            )[-6000:]
            if not conversation:
                snapshot.reference.set(
                    {
                        "remoteWorkActive": False,
                        "remoteWorkReason": (
                            "No saved Slack conversation establishes active remote work."
                        ),
                        "remoteWorkConfidence": 1,
                        "remoteInferenceVersion": self.CURRENT_REMOTE_INFERENCE_VERSION,
                        "workMode": "unspecified",
                        "workflowStatus": "unassigned",
                        "updatedAt": firestore.SERVER_TIMESTAMP,
                    },
                    merge=True,
                )
                processed += 1
                continue
            work_order = self._serialize_work_order(snapshot.id, data)
            try:
                analysis = self._infer_assignment(
                    work_order,
                    {
                        "sender": {},
                        "text": "Recent Slack conversation:\n" + conversation,
                        "remoteRuleText": message_rows[-1][1],
                        "candidates": work_order.get("assignees") or [],
                        "slackTs": "",
                    },
                    priority_only=True,
                )
                self._save_initial_priority_analysis(
                    snapshot.id,
                    analysis,
                    include_remote=True,
                )
                processed += 1
            except Exception as exc:
                logging.warning(
                    "Ops remote-work review failed for %s; it will retry: %s",
                    snapshot.id,
                    exc,
                )
        return processed

    def _mark_analysis_failed(
        self, work_order_id: str, raw_message_id: str, error: Exception
    ) -> None:
        self._work_order_ref(work_order_id).collection(
            self.MESSAGE_COLLECTION
        ).document(self._message_id(raw_message_id)).set(
            {
                "analysisStatus": "error",
                "analysisError": self._clean(error, 600),
                "analysisFailedAt": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )

    def post_message(
        self,
        *,
        work_order_id: str,
        channel: str,
        thread_ts: str,
        message: Dict[str, Any],
        sender_name: str,
        text: str,
        candidates: List[Dict[str, str]],
    ) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        slack_ts = self._clean(message.get("ts"), 180)
        msg_id = self._message_id(slack_ts)
        if not msg_id:
            raise RuntimeError("A valid Slack timestamp is required.")
        msg_ref = ref.collection(self.MESSAGE_COLLECTION).document(msg_id)
        normalized_candidates = self._normalize_assignees(candidates)
        needs_analysis = self._should_analyze_assignment(text)
        now_ms = int(time.time() * 1000)
        transaction = self.db.transaction()

        @firestore.transactional
        def record(txn):
            work_order_snapshot = ref.get(transaction=txn)
            message_snapshot = msg_ref.get(transaction=txn)
            if not work_order_snapshot.exists:
                raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
            current = work_order_snapshot.to_dict() or {}
            if str(current.get("status") or "").lower() not in self.ACTIVE_STATUSES:
                return {"accepted": False, "reason": "completed"}

            if message_snapshot.exists:
                existing_message = message_snapshot.to_dict() or {}
                retryable = existing_message.get("analysisStatus") == "error" or (
                    existing_message.get("analysisStatus") == "analyzing"
                    and now_ms - int(existing_message.get("analysisStartedAtMs") or 0)
                    > 120000
                )
                if not retryable or not needs_analysis:
                    return {"accepted": False, "reason": "duplicate"}

            sender = self._normalize_assignees(
                [
                    {
                        "id": self._clean(message.get("user"), 80),
                        "name": sender_name or self._clean(message.get("user"), 80),
                    }
                ]
            )
            sender_record = sender[0] if sender else {"id": "", "name": "Unknown"}
            txn.set(
                msg_ref,
                {
                    "slackTs": slack_ts,
                    "sender": sender_record,
                    "text": self._clean(text, 6000),
                    "candidates": normalized_candidates,
                    "receivedAt": firestore.SERVER_TIMESTAMP,
                    "analysisStatus": "analyzing" if needs_analysis else "not_needed",
                    "analysisStartedAtMs": now_ms if needs_analysis else 0,
                },
                merge=True,
            )
            work_order_update: Dict[str, Any] = {
                "slackChannel": self._clean(channel, 120),
                "slackThreadTs": self._clean(thread_ts, 120),
                "lastActivityAt": firestore.SERVER_TIMESTAMP,
                "lastActivityAtIso": utc_now_iso(),
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
            if not message_snapshot.exists:
                work_order_update["messageCount"] = firestore.Increment(1)
            txn.set(ref, work_order_update, merge=True)
            return {
                "accepted": True,
                "needsAnalysis": needs_analysis,
                "workOrder": self._serialize_work_order(str(work_order_id), current),
                "message": {
                    "id": msg_id,
                    "slackTs": slack_ts,
                    "sender": sender_record,
                    "text": self._clean(text, 6000),
                    "candidates": normalized_candidates,
                },
            }

        recorded = record(transaction)
        if not recorded.get("accepted") or not recorded.get("needsAnalysis"):
            return {
                "ok": True,
                "accepted": bool(recorded.get("accepted")),
                "analyzed": False,
                "reason": recorded.get("reason") or "no_assignment_or_priority_signal",
            }

        try:
            analysis = self._infer_assignment(
                recorded["workOrder"], recorded["message"]
            )
            saved = self._save_assignment_analysis(
                work_order_id,
                recorded["message"]["id"],
                analysis,
                recorded["message"],
            )
            return {
                "ok": True,
                "accepted": True,
                "analyzed": True,
                "changed": bool(saved.get("changed")),
                "priorityChanged": bool(saved.get("priorityChanged")),
                "priorityTier": analysis.get("priorityTier") or "",
                "assignees": analysis.get("assignees") or [],
                "reason": analysis.get("reason") or "",
                "priorityReason": analysis.get("priorityReason") or "",
            }
        except Exception as exc:
            try:
                self._mark_analysis_failed(work_order_id, msg_id, exc)
            except Exception:
                pass
            raise

    def _load_message_log(self, ref) -> List[Dict[str, Any]]:
        messages: List[Dict[str, Any]] = []
        for document in ref.collection(self.MESSAGE_COLLECTION).stream():
            data = document.to_dict() or {}
            slack_ts = self._clean(data.get("slackTs") or document.id, 180)
            sender = data.get("sender") if isinstance(data.get("sender"), dict) else {}
            messages.append(
                {
                    "slackTs": slack_ts,
                    "sender": {
                        "id": self._clean(sender.get("id"), 80),
                        "name": self._clean(sender.get("name"), 100) or "Unknown",
                    },
                    "text": self._clean(data.get("text"), 6000),
                }
            )

        def sort_key(entry: Dict[str, Any]) -> float:
            try:
                return float(str(entry.get("slackTs") or "0"))
            except (TypeError, ValueError):
                return 0.0

        messages.sort(key=sort_key)
        return messages

    def _generate_final_summary(
        self, work_order: Dict[str, Any], messages: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        transcript_lines: List[str] = []
        for message in messages[-160:]:
            sender = message.get("sender") or {}
            sender_name = self._clean(sender.get("name"), 100) or "Unknown"
            text = re.sub(
                r"\s+", " ", self._clean(message.get("text"), 900)
            ).strip()
            transcript_lines.append(
                f"[{self._clean(message.get('slackTs'), 40)}] {sender_name}: {text}"
            )
        transcript = "\n".join(transcript_lines)[-30000:]
        owners = ", ".join(
            entry["name"]
            for entry in self._normalize_assignees(work_order.get("assignees"))
        ) or "Unassigned"
        payload = {
            "model": self.settings.ops_summary_model,
            "store": False,
            "input": [
                {
                    "role": "system",
                    "content": (
                        "Write a final work-order closeout summary for finance and operations. "
                        "Return one compact paragraph of no more than 90 words. State the issue, "
                        "meaningful work or coordination completed, and the latest known outcome. "
                        "Use past tense. Omit generic next steps, deep technical detail, filler, "
                        "and phrases such as no new messages. Never invent costs, dates, "
                        "commitments, or outcomes. Never expose internal field names or codes. "
                        "Also extract at most three compact, reusable company-operating lessons "
                        "supported by the conversation. Lessons may describe assignment, operational "
                        "category, or workflow patterns that help with a similar future order. "
                        "Generalize away customer-specific details and never evaluate employee "
                        "performance. Return an empty companyLessons array when nothing is reusable."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Work order: #{self._clean(work_order.get('number'), 100)} "
                        f"{self._clean(work_order.get('subject'), 400)}\n"
                        f"Final owners: {owners}\n"
                        f"Slack conversation:\n{transcript}"
                    ),
                },
            ],
            "max_output_tokens": self.settings.ops_summary_max_output_tokens,
            "reasoning": {"effort": self.settings.ops_summary_reasoning_effort},
            "text": {
                "verbosity": "low",
                "format": {
                    "type": "json_schema",
                    "name": "ops_final_summary",
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "additionalProperties": False,
                        "properties": {
                            "headline": {"type": "string"},
                            "statusLine": {"type": "string"},
                            "summary": {"type": "string"},
                            "companyLessons": {
                                "type": "array",
                                "maxItems": 3,
                                "items": {
                                    "type": "object",
                                    "additionalProperties": False,
                                    "properties": {
                                        "kind": {
                                            "type": "string",
                                            "enum": [
                                                "assignment_pattern",
                                                "priority_pattern",
                                                "workflow_pattern",
                                            ],
                                        },
                                        "summary": {"type": "string"},
                                        "keywords": {
                                            "type": "array",
                                            "maxItems": 12,
                                            "items": {"type": "string"},
                                        },
                                        "assigneeNames": {
                                            "type": "array",
                                            "maxItems": 8,
                                            "items": {"type": "string"},
                                        },
                                        "priorityTier": {
                                            "type": "string",
                                            "enum": [
                                                "hard_down",
                                                "in_progress",
                                                "needs_scheduled",
                                                "anytime",
                                                "none",
                                            ],
                                        },
                                        "confidence": {
                                            "type": "number",
                                            "minimum": 0,
                                            "maximum": 1,
                                        },
                                    },
                                    "required": [
                                        "kind",
                                        "summary",
                                        "keywords",
                                        "assigneeNames",
                                        "priorityTier",
                                        "confidence",
                                    ],
                                },
                            },
                        },
                        "required": [
                            "headline",
                            "statusLine",
                            "summary",
                            "companyLessons",
                        ],
                    },
                },
            },
        }
        response = self.openai_session.post(
            "https://api.openai.com/v1/responses",
            json=payload,
            timeout=self.settings.ops_request_timeout,
        )
        if not response.ok:
            raise RuntimeError(
                f"OpenAI final summary returned HTTP {response.status_code}: "
                f"{(response.text or '')[:500]}"
            )
        response_data = response.json()
        output = json.loads(self._openai_output_text(response_data))
        summary = re.sub(
            r"\s+", " ", self._clean(output.get("summary"), 1800)
        ).strip()
        if not summary:
            raise RuntimeError("OpenAI returned an empty final work-order summary.")
        usage = response_data.get("usage") or {}
        return {
            "headline": self._clean(
                output.get("headline") or "Final work order summary", 220
            ),
            "statusLine": self._clean(
                output.get("statusLine") or f"Complete | Owner: {owners}", 300
            ),
            "summary": summary,
            "companyLessons": output.get("companyLessons") or [],
            "usage": {
                "inputTokens": int(usage.get("input_tokens") or 0),
                "outputTokens": int(usage.get("output_tokens") or 0),
            },
        }
    def _delete_message_log(self, ref) -> int:
        deleted = 0
        while True:
            documents = list(ref.collection(self.MESSAGE_COLLECTION).limit(400).stream())
            if not documents:
                break
            batch = self.db.batch()
            for document in documents:
                batch.delete(document.reference)
            batch.commit()
            deleted += len(documents)
        return deleted

    def reset_assignment_analysis(self, work_order_id: str) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        snapshot = ref.get()
        if not snapshot.exists:
            raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
        current = snapshot.to_dict() or {}
        created_at_iso = (
            self._timestamp_to_iso(current.get("createdAt"))
            or self._clean(current.get("createdAtIso"), 80)
            or utc_now_iso()
        )
        protected_assignees = self._normalize_assignees(
            current.get("bluefolderAssignees")
        )
        initial_assignees = self._merge_assignees(
            protected_assignees,
            [{"id": "U07F4G8NP2P", "name": "Yao N"}],
        )
        deleted_messages = self._delete_message_log(ref)
        next_stage = "active" if protected_assignees else "unassigned"
        workflow_update = self._workflow_transition_update(
            current,
            next_stage,
            changed_by="Magmo reset",
            source="reset",
            reason="Assignment analysis was reset.",
        )
        ref.set(
            {
                "assignees": initial_assignees,
                "assignmentSummary": self._assignment_summary(initial_assignees),
                "assignmentDecisionReason": (
                    "BlueFolder engineers remain protected; Slack helper analysis was reset."
                    if protected_assignees
                    else "New work orders start with Yao until responsibility changes in Slack."
                ),
                "assignmentConfidence": 1,
                "assignmentHistory": [
                    self._initial_assignment(created_at_iso, protected_assignees)
                ],
                "workflowStatus": next_stage,
                **workflow_update,
                "remoteWorkActive": False,
                "remoteWorkReason": "",
                "remoteWorkConfidence": 0,
                "remoteInferenceVersion": 0,
                "workMode": "unspecified",
                "assignmentUpdatedAt": firestore.DELETE_FIELD,
                "messageCount": 0,
                "analysisInputTokens": 0,
                "analysisOutputTokens": 0,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )
        return {"deletedMessages": deleted_messages}

    def service_complete_work_order(
        self, work_order_id: str, sender_name: str
    ) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        snapshot = ref.get()
        if not snapshot.exists:
            raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
        current = snapshot.to_dict() or {}
        if self._workflow_stage(current) == "done":
            return {"ok": True, "serviceComplete": False, "alreadyDone": True}
        workflow_update = self._workflow_transition_update(
            current,
            "service_complete",
            changed_by=f"{sender_name} via Slack !complete",
            source="service_complete",
            reason="Field service was marked complete with !complete.",
        )
        update: Dict[str, Any] = {
            **workflow_update,
            "status": "active",
            "serviceCompletedBy": self._clean(
                f"{sender_name} via Slack !complete", 180
            ),
            "assignmentSummary": (
                "Service complete — awaiting final reporting and closeout."
            ),
            "updatedAt": firestore.SERVER_TIMESTAMP,
        }
        if not self._timestamp_to_iso(current.get("serviceCompletedAt")):
            update["serviceCompletedAt"] = firestore.SERVER_TIMESTAMP
        ref.set(update, merge=True)
        return {"ok": True, "serviceComplete": True}

    def complete_work_order(
        self, work_order_id: str, sender_name: str
    ) -> Dict[str, Any]:
        ref = self._work_order_ref(work_order_id)
        snapshot = ref.get()
        if not snapshot.exists:
            raise RuntimeError(f"Ops work order {work_order_id} does not exist.")
        current = snapshot.to_dict() or {}
        messages = self._load_message_log(ref)
        latest = current.get("opsUpdateLatest")
        has_saved_final = (
            isinstance(latest, dict)
            and bool(latest.get("finalSummary"))
            and bool(self._clean(latest.get("summary"), 1800))
            and int(latest.get("sourceMessageCount") or 0) > 0
        )
        if messages:
            generated = self._generate_final_summary(current, messages)
            now_iso = utc_now_iso()
            through_slack_ts = self._clean(messages[-1].get("slackTs"), 180)
            entry = {
                "id": f"final-{int(time.time() * 1000)}",
                "headline": generated["headline"],
                "statusLine": generated["statusLine"],
                "summary": generated["summary"],
                "generatedAtIso": now_iso,
                "throughSlackTs": through_slack_ts,
                "sourceMessageCount": len(messages),
                "recoveredFromSlack": False,
                "finalSummary": True,
            }
            usage = generated.get("usage") or {}
            self._save_company_lessons(
                current,
                generated.get("companyLessons") or [],
                source="completion",
                source_id=f"completion-{work_order_id}",
            )
            ref.set(
                {
                    "opsUpdateLatest": entry,
                    "opsUpdateHistory": [entry],
                    "summaryLastSlackTs": through_slack_ts,
                    "summaryInputTokens": int(
                        current.get("summaryInputTokens") or 0
                    ) + int(usage.get("inputTokens") or 0),
                    "summaryOutputTokens": int(
                        current.get("summaryOutputTokens") or 0
                    ) + int(usage.get("outputTokens") or 0),
                    "updatedAt": firestore.SERVER_TIMESTAMP,
                },
                merge=True,
            )
        elif not has_saved_final:
            raise RuntimeError(
                "The Slack conversation has not been recorded yet, so the final "
                "summary was not created and the chat log was preserved."
            )

        workflow_update = self._workflow_transition_update(
            current,
            "done",
            changed_by=f"{sender_name} via Slack !done",
            source="done",
            reason="The work order was closed with !done.",
        )
        completion_update: Dict[str, Any] = {
                **workflow_update,
                "status": "completed",
                "completedBy": self._clean(
                    f"{sender_name} via Slack !done", 180
                ),
                "trackingStoppedAt": firestore.SERVER_TIMESTAMP,
                "assignmentSummary": "Done — final summary saved.",
                "updatedAt": firestore.SERVER_TIMESTAMP,
        }
        if not self._timestamp_to_iso(current.get("completedAt")):
            completion_update["completedAt"] = firestore.SERVER_TIMESTAMP
        ref.set(completion_update, merge=True)
        deleted_messages = self._delete_message_log(ref)
        ref.set(
            {
                "messageCount": 0,
                "chatLogDeletedAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )
        return {
            "ok": True,
            "completed": True,
            "deletedMessages": deleted_messages,
            "finalSummarySaved": True,
        }

class SlackClient:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {settings.slack_bot_token}",
            "Content-Type": "application/json; charset=utf-8",
        })
        self._resolved_channel_id: Optional[str] = None
        self._user_lookup_loaded = False
        self._user_lookup: Dict[str, str] = {}
        self._user_names_by_id: Dict[str, str] = {}
        self._user_aliases_by_id: Dict[str, List[str]] = {}
        self._part_reference_resolver = SlackPartReferenceResolver(
            self._slack_list_item_info,
            warn=logging.warning,
        )
        for raw_pair in settings.slack_user_name_map.split(","):
            user_id, separator, name = raw_pair.strip().partition("=")
            user_id = user_id.strip()
            name = name.strip()
            if separator and user_id and name:
                self._user_names_by_id[user_id] = name
                self._user_aliases_by_id[user_id] = [name]

    def _post_raw(self, method: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        url = f"https://slack.com/api/{method}"
        resp = self.session.post(url, json=payload, timeout=30)
        resp.raise_for_status()
        return resp.json()

    def _post(self, method: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        data = self._post_raw(method, payload)
        if not data.get("ok"):
            raise RuntimeError(f"Slack API {method} failed: {data}")
        return data

    def _get(self, method: str, params: Dict[str, Any]) -> Dict[str, Any]:
        url = f"https://slack.com/api/{method}"
        resp = self.session.get(url, params=params, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if not data.get("ok"):
            raise RuntimeError(f"Slack API {method} failed: {data}")
        return data

    def _slack_list_item_info(
        self, list_id: str, record_id: str
    ) -> Dict[str, Any]:
        return self._post(
            "slackLists.items.info",
            {"list_id": list_id, "id": record_id},
        )

    def expand_part_references(
        self, text: str, message: Optional[Dict[str, Any]] = None
    ) -> str:
        return self._part_reference_resolver.expand(text, message)

    def _post_message_with_join_retry(self, channel_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        data = self._post_raw("chat.postMessage", payload)
        if data.get("ok"):
            return data

        if data.get("error") == "not_in_channel":
            # Try to join automatically when possible, then retry once.
            if isinstance(channel_id, str) and channel_id and not channel_id.startswith("#"):
                join_resp = self._post_raw("conversations.join", {"channel": channel_id})
                if join_resp.get("ok"):
                    data = self._post_raw("chat.postMessage", payload)
                elif join_resp.get("error") == "missing_scope":
                    raise RuntimeError(
                        "Slack bot is not in channel and token lacks conversations.join scope. "
                        "Invite the bot to #dispatch, then retry."
                    )
            if not data.get("ok"):
                raise RuntimeError(
                    "Slack bot is not in the target channel. Invite the bot to #dispatch and retry."
                )

        if not data.get("ok"):
            raise RuntimeError(f"Slack API chat.postMessage failed: {data}")
        return data

    def _resolve_channel_id(self) -> str:
        if self._resolved_channel_id:
            return self._resolved_channel_id

        if self.settings.slack_channel_id and not is_placeholder_secret(self.settings.slack_channel_id):
            self._resolved_channel_id = self.settings.slack_channel_id
            return self._resolved_channel_id

        target_name = (self.settings.slack_channel_name or "").strip().lstrip("#").lower()
        if not target_name:
            raise RuntimeError("No Slack channel configured. Set SLACK_CHANNEL_ID or SLACK_CHANNEL_NAME.")

        # First try to resolve channel ID via conversations.list when scopes allow it.
        try:
            cursor: Optional[str] = None
            while True:
                payload: Dict[str, Any] = {
                    "types": "public_channel,private_channel",
                    "limit": 1000,
                    "exclude_archived": True,
                }
                if cursor:
                    payload["cursor"] = cursor
                data = self._get("conversations.list", payload)
                for channel in data.get("channels", []):
                    if str(channel.get("name") or "").strip().lower() == target_name:
                        channel_id = str(channel.get("id") or "").strip()
                        if channel_id:
                            self._resolved_channel_id = channel_id
                            logging.info(
                                "Resolved Slack channel '#%s' to id %s",
                                self.settings.slack_channel_name,
                                channel_id,
                            )
                            return channel_id
                cursor = data.get("response_metadata", {}).get("next_cursor") or None
                if not cursor:
                    break
        except Exception as exc:
            # Bot may not have channels:read/groups:read; fall back to name-target posting.
            logging.warning(
                "Unable to resolve channel id via conversations.list (%s). Falling back to channel name '#%s'.",
                exc,
                target_name,
            )

        # Fallback: use channel name directly. This works in many workspaces when the bot is already in-channel.
        self._resolved_channel_id = f"#{target_name}"
        return self._resolved_channel_id

    @staticmethod
    def _normalize_name(value: str) -> str:
        return re.sub(r"\s+", " ", str(value or "").strip()).lower()

    @staticmethod
    def _extract_names_from_mention_text(mention_text: str) -> List[str]:
        """
        Parses strings like "@Julie Tang @Sean Wang @Wilson Wang @Alex Wu"
        into ["Julie Tang", "Sean Wang", "Wilson Wang", "Alex Wu"].
        """
        if not mention_text:
            return []
        names: List[str] = []
        for match in re.finditer(r"@([^@]+?)(?=\s*@|$)", mention_text):
            name = match.group(1).strip()
            if name:
                names.append(name)
        return names

    def _load_user_lookup(self) -> Dict[str, str]:
        if self._user_lookup_loaded:
            return self._user_lookup

        self._user_lookup_loaded = True
        lookup: Dict[str, str] = {
            self._normalize_name(name): user_id
            for user_id, name in self._user_names_by_id.items()
            if self._normalize_name(name)
        }
        cursor: Optional[str] = None

        try:
            while True:
                payload: Dict[str, Any] = {"limit": 200}
                if cursor:
                    payload["cursor"] = cursor
                data = self._get("users.list", payload)
                for member in data.get("members", []):
                    user_id = str(member.get("id") or "").strip()
                    if not user_id:
                        continue

                    profile = member.get("profile") or {}
                    candidates = [
                        str(member.get("real_name") or "").strip(),
                        str(member.get("name") or "").strip(),
                        str(profile.get("real_name") or "").strip(),
                        str(profile.get("display_name") or "").strip(),
                        str(profile.get("display_name_normalized") or "").strip(),
                        str(profile.get("real_name_normalized") or "").strip(),
                    ]
                    first_name = str(profile.get("first_name") or "").strip()
                    last_name = str(profile.get("last_name") or "").strip()
                    full_name = " ".join(part for part in [first_name, last_name] if part).strip()
                    if full_name:
                        candidates.append(full_name)

                    preferred_name = (
                        str(profile.get("display_name") or "").strip()
                        or str(profile.get("real_name") or "").strip()
                        or str(member.get("real_name") or "").strip()
                        or str(member.get("name") or "").strip()
                        or user_id
                    )
                    aliases = []
                    for candidate in candidates:
                        cleaned_candidate = re.sub(r"\s+", " ", candidate).strip()
                        if cleaned_candidate and cleaned_candidate not in aliases:
                            aliases.append(cleaned_candidate)
                    self._user_names_by_id[user_id] = preferred_name
                    self._user_aliases_by_id[user_id] = aliases

                    for candidate in candidates:
                        normalized = self._normalize_name(candidate)
                        if normalized and normalized not in lookup:
                            lookup[normalized] = user_id

                cursor = data.get("response_metadata", {}).get("next_cursor") or None
                if not cursor:
                    break
        except Exception as exc:
            logging.warning(
                "Could not resolve Slack names via users.list (%s). "
                "For clickable @mentions, set SLACK_USER_IDS directly or grant users:read.",
                exc,
            )
            self._user_lookup = lookup
            return self._user_lookup

        self._user_lookup = lookup
        return self._user_lookup

    def _resolve_mention_user_ids(self, mention_user_ids: List[str], mention_text: str) -> List[str]:
        cleaned_ids: List[str] = []
        seen = set()
        for user_id in mention_user_ids or []:
            normalized = str(user_id or "").strip()
            if not normalized:
                continue
            if normalized not in seen:
                cleaned_ids.append(normalized)
                seen.add(normalized)
        if cleaned_ids:
            return cleaned_ids

        names = self._extract_names_from_mention_text(mention_text)
        if not names:
            return []

        lookup = self._load_user_lookup()
        resolved: List[str] = []
        unresolved: List[str] = []
        for name in names:
            user_id = lookup.get(self._normalize_name(name))
            if user_id:
                if user_id not in seen:
                    resolved.append(user_id)
                    seen.add(user_id)
            else:
                unresolved.append(name)

        if unresolved:
            logging.warning(
                "Could not resolve Slack user IDs for: %s",
                ", ".join(unresolved),
            )
        return resolved

    def post_dispatch_message(
        self,
        title_text: str,
        bluefolder_url: str,
        work_order_number: str,
        mention_user_ids: List[str],
        mention_text: str = "",
    ) -> Tuple[str, str]:
        channel_id = self._resolve_channel_id()
        title_link = f"<{bluefolder_url}|{title_text}>"
        resolved_mention_ids = self._resolve_mention_user_ids(mention_user_ids, mention_text)
        mentions = " ".join(f"<@{user_id}>" for user_id in resolved_mention_ids).strip()
        if not mentions and mention_text.strip():
            if self.settings.require_clickable_mentions:
                raise RuntimeError(
                    "Could not create clickable Slack @mentions from names. "
                    "Set SLACK_USER_IDS with real member IDs (U...) or grant users:read scope "
                    "and reinstall the app."
                )
            logging.warning(
                "Using plain-text mention fallback. This will not create clickable @mentions."
            )
            mentions = mention_text.strip()

        parent_message = "\n".join(
            part for part in [
                f"#{work_order_number}",
                title_link,
            ] if part.strip()
        )

        parent_payload = {
            "channel": channel_id,
            "text": parent_message,
            "mrkdwn": True,
            "unfurl_links": False,
            "unfurl_media": False,
        }
        data = self._post_message_with_join_retry(channel_id, parent_payload)
        response_channel = str(data.get("channel") or "").strip()
        response_ts = str(data.get("ts") or data.get("message", {}).get("ts") or "").strip()

        if not response_channel and isinstance(channel_id, str) and channel_id and not channel_id.startswith("#"):
            response_channel = channel_id

        if not response_ts:
            logging.warning("Slack post succeeded but response did not include ts. Raw response: %s", data)
            return response_channel, response_ts

        # Match existing dispatch pattern: mentions are a reply in-thread.
        if mentions:
            thread_payload = {
                "channel": response_channel or channel_id,
                "text": mentions,
                "thread_ts": response_ts,
                "mrkdwn": True,
                "unfurl_links": False,
                "unfurl_media": False,
            }
            self._post_message_with_join_retry(channel_id, thread_payload)

        return response_channel, response_ts

    def thread_parent(self, channel: str, thread_ts: str) -> Dict[str, Any]:
        data = self._get(
            "conversations.replies",
            {"channel": channel, "ts": thread_ts, "limit": 1},
        )
        messages = data.get("messages") or []
        if not messages:
            raise RuntimeError(
                f"Slack thread parent was not found for {channel}:{thread_ts}"
            )
        return messages[0]

    def thread_replies(
        self, channel: str, thread_ts: str, oldest: str = ""
    ) -> List[Dict[str, Any]]:
        messages: List[Dict[str, Any]] = []
        cursor: Optional[str] = None
        while True:
            payload: Dict[str, Any] = {
                "channel": channel,
                "ts": thread_ts,
                "limit": 200,
            }
            if oldest:
                payload["oldest"] = oldest
                payload["inclusive"] = False
            if cursor:
                payload["cursor"] = cursor
            data = self._get("conversations.replies", payload)
            messages.extend(data.get("messages", []))
            cursor = data.get("response_metadata", {}).get("next_cursor") or None
            if not cursor:
                return messages

    def channel_history(
        self,
        channel: str,
        *,
        oldest: str = "",
        latest: str = "",
    ) -> List[Dict[str, Any]]:
        messages: List[Dict[str, Any]] = []
        cursor: Optional[str] = None
        while True:
            params: Dict[str, Any] = {"channel": channel, "limit": 200}
            if oldest:
                params["oldest"] = oldest
                params["inclusive"] = True
            if latest:
                params["latest"] = latest
                params["inclusive"] = True
            if cursor:
                params["cursor"] = cursor
            data = self._get("conversations.history", params)
            messages.extend(data.get("messages", []))
            cursor = data.get("response_metadata", {}).get("next_cursor") or None
            if not cursor:
                return messages

    def find_work_order_thread(
        self,
        channel: str,
        work_order_id: str,
        *,
        near_ts: str = "",
        window_seconds: int = 3600,
    ) -> Optional[Dict[str, Any]]:
        if not channel or not work_order_id:
            return None
        try:
            near_value = float(str(near_ts or "0"))
        except (TypeError, ValueError):
            near_value = 0.0
        window = max(60, int(window_seconds or 3600))
        oldest = str(max(0.0, near_value - window)) if near_value else ""
        latest = str(near_value + window) if near_value else ""
        messages = self.channel_history(channel, oldest=oldest, latest=latest)
        pattern = re.compile(
            rf"(?m)^\s*#\s*{re.escape(str(work_order_id))}\b",
            re.IGNORECASE,
        )
        matches = [
            message
            for message in messages
            if pattern.search(str(message.get("text") or ""))
            and str(message.get("ts") or "").strip()
        ]
        if not matches:
            return None
        if near_value:
            matches.sort(
                key=lambda message: abs(
                    slack_ts_number(message.get("ts")) - near_value
                )
            )
        return matches[0]

    def user_name(self, user_id: str, fallback: str = "") -> str:
        self._load_user_lookup()
        return (
            self._user_names_by_id.get(str(user_id or "").strip())
            or str(fallback or "").strip()
            or str(user_id or "").strip()
            or "Unknown"
        )

    def expand_user_mentions(self, text: str) -> str:
        self._load_user_lookup()

        def replace_mention(match: re.Match[str]) -> str:
            user_id = match.group(1)
            return f"@{self.user_name(user_id, user_id)}"

        return re.sub(r"<@([A-Z0-9]+)>", replace_mention, str(text or ""))

    def assignment_candidates(
        self, text: str, sender_id: str
    ) -> List[Dict[str, str]]:
        self._load_user_lookup()
        candidate_ids: List[str] = []
        seen = set()

        def add(user_id: str) -> None:
            normalized = str(user_id or "").strip()
            if normalized and normalized not in seen and len(candidate_ids) < 30:
                candidate_ids.append(normalized)
                seen.add(normalized)

        add(sender_id)
        for user_id in re.findall(r"<@([A-Z0-9]+)>", str(text or "")):
            add(user_id)

        lowered = re.sub(r"\s+", " ", str(text or "")).lower()
        for user_id, aliases in self._user_aliases_by_id.items():
            if any(
                len(alias.strip()) >= 3 and alias.strip().lower() in lowered
                for alias in aliases
            ):
                add(user_id)

        return [
            {"id": user_id, "name": self.user_name(user_id, user_id)}
            for user_id in candidate_ids
        ]

    def get_permalink(self, channel: str, ts: str) -> str:
        if not channel or not ts:
            raise RuntimeError("Cannot fetch Slack permalink: missing channel or message ts from post response.")
        data = self._get("chat.getPermalink", {
            "channel": channel,
            "message_ts": ts,
        })
        return data["permalink"]


def safe_get(d: Dict[str, Any], *keys: str, default: str = "") -> str:
    # Fast path for exact key matches.
    for key in keys:
        if key in d and d[key] not in (None, ""):
            return str(d[key]).strip()

    # Fallback for APIs that vary key casing (e.g. serviceRequestID vs serviceRequestId).
    lowered = {str(k).lower(): v for k, v in d.items()}
    for key in keys:
        match = lowered.get(key.lower())
        if match not in (None, ""):
            return str(match).strip()

    return default


def extract_bluefolder_assignee_user_ids(item: Dict[str, Any]) -> List[str]:
    assignments = item.get("assignments")
    if not isinstance(assignments, list):
        assignments = [assignments] if isinstance(assignments, dict) else []
    user_ids: List[str] = []
    seen = set()
    for assignment in assignments:
        if not isinstance(assignment, dict):
            continue
        if str(assignment.get("isComplete") or "0").strip().lower() in {
            "1",
            "true",
            "yes",
        }:
            continue
        raw_ids = assignment.get("assigneeUserIds")
        values = raw_ids if isinstance(raw_ids, list) else [raw_ids]
        for value in values:
            for user_id in re.findall(r"\d+", str(value or "")):
                if user_id not in seen:
                    seen.add(user_id)
                    user_ids.append(user_id)
    return user_ids


def extract_work_order_fields(item: Dict[str, Any], settings: Settings) -> Dict[str, Any]:
    work_order_id = safe_get(
        item,
        "id",
        "work_order_id",
        "uid",
        "workOrderId",
        "serviceRequestId",
        "serviceRequestID",
        "service_request_id",
        "workOrder",
    )
    number = safe_get(
        item,
        "number",
        "work_order_number",
        "display_id",
        "workOrderNo",
        "serviceRequestNumber",
        "serviceRequestNo",
        "serviceRequestNum",
        "service_request_number",
    )
    subject = safe_get(item, "subject", "name", "title", "summary", "problemDescription", "description", "equipment")
    description = safe_get(
        item,
        "detailedDescription",
        "detailed_description",
        "problemDescription",
        "description",
        "serviceDescription",
        "notes",
    )
    created_at = safe_get(item, "created_at", "created", "date_created", "dateCreated", "dateAdded")
    customer = safe_get(item, "customer_name", "customer", "account_name")

    app_base = settings.bluefolder_base_url.rstrip("/")
    for suffix in ("/api/2.0", "/api/2", "/api"):
        if app_base.lower().endswith(suffix):
            app_base = app_base[:-len(suffix)]
            break

    fallback_link = f"{app_base}/workOrder/{work_order_id}"
    try:
        fallback_link = settings.bluefolder_work_order_url_template.format(
            id=work_order_id,
            number=number or work_order_id,
        )
    except Exception:
        # Keep legacy fallback if template formatting is invalid.
        pass

    link = safe_get(
        item,
        "url",
        "link",
        "html_url",
        "public_url",
        default=fallback_link,
    )

    if not subject:
        subject = f"BlueFolder Work Order {number or work_order_id}"

    return {
        "id": work_order_id,
        "number": number or work_order_id,
        "subject": subject,
        "description": description,
        "created_at": created_at,
        "customer": customer,
        "link": link,
        "bluefolder_assignee_user_ids": extract_bluefolder_assignee_user_ids(item),
    }


def build_slack_title(fields: Dict[str, str]) -> str:
    return f"{fields['subject']}"


def sort_by_created_at_desc(items: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    def key_func(item: Dict[str, Any]) -> datetime:
        dt = parse_dt(safe_get(item, "created_at", "created", "date_created", "dateTimeCreated", "dateCreated"))
        return dt or datetime(1970, 1, 1, tzinfo=timezone.utc)

    return sorted(items, key=key_func, reverse=True)


def nested_value_by_key(value: Any, wanted_key: str) -> str:
    if isinstance(value, dict):
        for key, child in value.items():
            if str(key).lower() == wanted_key.lower():
                if isinstance(child, (str, int, float)):
                    return str(child).strip()
                if isinstance(child, dict):
                    scalar = child.get("text") or child.get("_")
                    if scalar:
                        return str(scalar).strip()
            nested = nested_value_by_key(child, wanted_key)
            if nested:
                return nested
    elif isinstance(value, list):
        for child in value:
            nested = nested_value_by_key(child, wanted_key)
            if nested:
                return nested
    return ""


def existing_slack_permalink(value: Any) -> str:
    if isinstance(value, str):
        match = re.search(r"https://[^\s<>\"']*slack\.com/[^\s<>\"']+", value)
        return match.group(0).rstrip(".,)") if match else ""
    if isinstance(value, dict):
        label = str(value.get("name") or value.get("label") or "").strip().lower()
        if "slack" in label:
            for key in ("value", "text", "_"):
                candidate = existing_slack_permalink(value.get(key))
                if candidate:
                    return candidate
        for child in value.values():
            candidate = existing_slack_permalink(child)
            if candidate:
                return candidate
    elif isinstance(value, list):
        for child in value:
            candidate = existing_slack_permalink(child)
            if candidate:
                return candidate
    return ""


def slack_thread_from_permalink(permalink: str) -> Tuple[str, str]:
    match = re.search(r"/archives/([^/]+)/p(\d{7,})", str(permalink or ""))
    if not match:
        return "", ""
    channel = match.group(1)
    digits = match.group(2)
    if len(digits) <= 6:
        return "", ""
    return channel, f"{digits[:-6]}.{digits[-6:]}"


def filter_new_items(items: List[Dict[str, Any]], state: StateStore) -> List[Dict[str, Any]]:
    candidates = []
    last_seen = parse_dt(state.get_last_seen_created_at())

    for item in items:
        fields = extract_work_order_fields(item, SETTINGS)
        work_order_id = fields["id"]
        if not work_order_id:
            continue
        if state.is_processed(work_order_id):
            continue

        created_at = parse_dt(fields["created_at"])
        external_id = nested_value_by_key(item, "externalId")
        is_website_intake = external_id.startswith("AIS-WEB-")
        if last_seen and created_at and created_at < last_seen and not is_website_intake:
            continue

        candidates.append(item)

    return sorted(
        candidates,
        key=lambda x: parse_dt(
            safe_get(x, "created_at", "created", "date_created", "dateTimeCreated", "dateCreated")
        )
        or datetime(1970, 1, 1, tzinfo=timezone.utc),
    )


def ops_work_order_records(
    settings: Settings, state: StateStore
) -> List[Tuple[str, Dict[str, Any]]]:
    records: List[Tuple[str, Dict[str, Any]]] = []
    for work_order_id, raw_record in state.data.get(
        "processed_work_order_ids", {}
    ).items():
        record = raw_record if isinstance(raw_record, dict) else {}
        channel = str(record.get("slack_channel") or "").strip()
        thread_ts = str(record.get("slack_ts") or "").strip()
        if (
            record.get("baseline")
            or record.get("ops_completed_at")
            or not channel
            or not thread_ts
            or thread_ts == "0.000000"
        ):
            continue
        if settings.ops_testing_channel_id and channel != settings.ops_testing_channel_id:
            continue
        records.append((str(work_order_id), record))
    return sorted(
        records,
        key=lambda item: str(item[1].get("processed_at") or ""),
        reverse=True,
    )


def sync_work_order_to_ops(
    state: StateStore,
    ops: FirebaseOpsClient,
    work_order_id: str,
    record: Dict[str, Any],
) -> bool:
    if record.get("ops_created_at") or record.get("ops_completed_at"):
        return True
    try:
        ops.create_work_order(work_order_id, record)
        record["ops_created_at"] = utc_now_iso()
        record.pop("ops_sync_error", None)
        state.save()
        logging.info("Added work order %s to the Magmo Ops queue", work_order_id)
        return True
    except Exception as exc:
        record["ops_sync_error"] = str(exc)[:600]
        logging.warning(
            "Magmo Ops create sync failed for work order %s; it will retry: %s",
            work_order_id,
            exc,
        )
        state.save()
        return False


def sync_pending_work_orders(
    settings: Settings, state: StateStore, ops: FirebaseOpsClient
) -> None:
    for work_order_id, record in ops_work_order_records(settings, state):
        if not record.get("ops_created_at"):
            sync_work_order_to_ops(state, ops, work_order_id, record)


def hydrate_intake_threads_from_ops(
    state: StateStore, ops: FirebaseOpsClient
) -> int:
    hydrated = 0
    for work_order_id, incoming in ops.active_intake_thread_records():
        existing = state.data.setdefault("processed_work_order_ids", {}).get(
            work_order_id
        )
        record = existing if isinstance(existing, dict) else {}
        if (
            str(record.get("slack_channel") or "") == incoming["slack_channel"]
            and str(record.get("slack_ts") or "") == incoming["slack_ts"]
        ):
            continue
        record.update(incoming)
        record["processed_at"] = record.get("processed_at") or utc_now_iso()
        state.mark_processed(work_order_id, record)
        hydrated += 1
    if hydrated:
        state.save()
    return hydrated


def sync_bluefolder_assignment_updates(
    settings: Settings,
    work_orders: List[Dict[str, Any]],
    state: StateStore,
    bluefolder: BlueFolderClient,
    ops: FirebaseOpsClient,
) -> int:
    items_by_id: Dict[str, Dict[str, Any]] = {}
    for item in work_orders:
        fields = extract_work_order_fields(item, settings)
        for key in {str(fields.get("id") or ""), str(fields.get("number") or "")}:
            if key:
                items_by_id[key] = item

    updated_count = 0
    state_changed = False
    processed_records = state.data.get("processed_work_order_ids", {})
    for work_order_id, raw_record in processed_records.items():
        record = raw_record if isinstance(raw_record, dict) else {}
        if record.get("baseline"):
            continue
        item = items_by_id.get(str(work_order_id)) or items_by_id.get(
            str(record.get("number") or "")
        )
        if not item:
            continue
        assignees = bluefolder.assigned_users(item)
        signature = json.dumps(assignees, sort_keys=True, ensure_ascii=True)
        previous_signature = json.dumps(
            record.get("bluefolder_assignees") or [],
            sort_keys=True,
            ensure_ascii=True,
        )
        if signature == previous_signature and "bluefolder_assignees" in record:
            continue
        record["bluefolder_assignees"] = assignees
        record["bluefolder_assignment_synced_at"] = utc_now_iso()
        try:
            ops.create_work_order(str(work_order_id), record)
            record.pop("bluefolder_assignment_sync_error", None)
            updated_count += 1
            logging.info(
                "Synced BlueFolder engineer assignment for work order %s: %s",
                work_order_id,
                ", ".join(entry["name"] for entry in assignees) or "none",
            )
        except Exception as exc:
            record["bluefolder_assignment_sync_error"] = str(exc)[:600]
            logging.warning(
                "BlueFolder assignment sync failed for work order %s; it will retry: %s",
                work_order_id,
                exc,
            )
        state_changed = True
    if state_changed:
        state.save()
    return updated_count


def resolve_ops_conversation_thread(
    settings: Settings,
    state: StateStore,
    slack: SlackClient,
    ops: FirebaseOpsClient,
    work_order_id: str,
    record: Dict[str, Any],
) -> Tuple[str, str]:
    original_channel = str(record.get("slack_channel") or "").strip()
    original_ts = str(record.get("slack_ts") or "").strip()
    target_channel = str(settings.ops_conversation_channel_id or "").strip()
    if not target_channel or target_channel == original_channel:
        return original_channel, original_ts

    linked_channel = str(record.get("ops_conversation_channel") or "").strip()
    linked_ts = str(record.get("ops_conversation_ts") or "").strip()
    if linked_channel == target_channel and linked_ts:
        return linked_channel, linked_ts

    last_attempt = parse_dt(record.get("ops_thread_lookup_attempted_at"))
    if last_attempt:
        elapsed = (datetime.now(timezone.utc) - last_attempt).total_seconds()
        if elapsed < max(5, settings.ops_thread_lookup_retry_seconds):
            return original_channel, original_ts

    record["ops_thread_lookup_attempted_at"] = utc_now_iso()
    match = slack.find_work_order_thread(
        target_channel,
        work_order_id,
        near_ts=original_ts,
        window_seconds=settings.ops_thread_lookup_window_seconds,
    )
    if not match:
        return original_channel, original_ts

    conversation_ts = str(match.get("ts") or "").strip()
    permalink = ""
    try:
        permalink = slack.get_permalink(target_channel, conversation_ts)
    except Exception as exc:
        logging.warning(
            "Found the dispatch thread for work order %s but could not fetch its permalink: %s",
            work_order_id,
            exc,
        )

    linked_record = dict(record)
    linked_record["slack_channel"] = target_channel
    linked_record["slack_ts"] = conversation_ts
    if permalink:
        linked_record["slack_permalink"] = permalink
    ops.create_work_order(work_order_id, linked_record)
    record["ops_conversation_channel"] = target_channel
    record["ops_conversation_ts"] = conversation_ts
    record["ops_conversation_permalink"] = permalink
    record["ops_conversation_linked_at"] = utc_now_iso()
    state.save()
    logging.info(
        "Linked Ops work order %s to conversation thread %s:%s",
        work_order_id,
        target_channel,
        conversation_ts,
    )
    return target_channel, conversation_ts


def slack_ts_number(value: Any) -> float:
    try:
        return float(str(value or "0"))
    except (TypeError, ValueError):
        return 0.0


def sync_ops_slack_message(
    slack: SlackClient,
    ops: FirebaseOpsClient,
    work_order_id: str,
    record: Dict[str, Any],
    channel: str,
    root_ts: str,
    message: Dict[str, Any],
    *,
    event_ts: str = "",
) -> str:
    if message.get("bot_id") or message.get("subtype"):
        return "skipped"

    raw_text = str(message.get("text") or "").strip()
    if not raw_text:
        return "skipped"

    sender_id = str(message.get("user") or "").strip()
    sender_name = slack.user_name(
        sender_id,
        str(message.get("username") or "").strip(),
    )
    command = raw_text.lower()
    if (
        ops.settings.ops_report_commands_managed_by_done_listener
        and command in {"!complete", "!done", "!parts"}
    ):
        record["ops_report_command_seen_at"] = utc_now_iso()
        record["ops_report_command"] = command
        if command == "!complete":
            record["ops_service_completed_at"] = utc_now_iso()
            record["ops_service_completed_by"] = sender_name
        elif command == "!done":
            # The command is authoritative. Stop this listener's thread scan;
            # the report listener owns the final summary, Firebase transition,
            # and temporary-message cleanup.
            record["ops_completed_at"] = utc_now_iso()
            record["ops_completed_by"] = sender_name
        logging.info(
            "Delegated %s for work order %s to the done-report listener",
            command,
            work_order_id,
        )
        return "report_command_delegated"
    if command == "!complete":
        ops.service_complete_work_order(work_order_id, sender_name)
        record["ops_service_completed_at"] = utc_now_iso()
        record["ops_service_completed_by"] = sender_name
        logging.info(
            "Moved Ops work order %s to Service complete; Slack tracking remains active",
            work_order_id,
        )
        return "service_complete"
    if command == "!done":
        ops.complete_work_order(work_order_id, sender_name)
        record["ops_completed_at"] = utc_now_iso()
        record["ops_completed_by"] = sender_name
        logging.info(
            "Stopped Ops tracking and cleared chat log for work order %s",
            work_order_id,
        )
        return "completed"

    event_message = dict(message)
    if event_ts:
        event_message["ts"] = event_ts
    candidates = slack.assignment_candidates(raw_text, sender_id)
    expanded_text = slack.expand_user_mentions(raw_text)
    expanded_text = slack.expand_part_references(expanded_text, message)
    ops.post_message(
        work_order_id=work_order_id,
        channel=channel,
        thread_ts=root_ts,
        message=event_message,
        sender_name=sender_name,
        text=expanded_text,
        candidates=candidates,
    )
    return "synced"


def scan_ops_threads(
    settings: Settings,
    state: StateStore,
    slack: SlackClient,
    ops: FirebaseOpsClient,
) -> int:
    records = ops_work_order_records(settings, state)
    if not records:
        return 0

    batch_size = max(1, settings.ops_thread_scan_batch)
    start = int(state.data.get("ops_thread_scan_index") or 0) % len(records)
    batch = [
        records[(start + offset) % len(records)]
        for offset in range(min(batch_size, len(records)))
    ]
    state.data["ops_thread_scan_index"] = (
        start + min(batch_size, len(records))
    ) % len(records)
    thread_states = state.data.setdefault("ops_thread_state", {})
    sent_count = 0

    for work_order_id, record in batch:
        if not sync_work_order_to_ops(state, ops, work_order_id, record):
            continue

        try:
            channel, root_ts = resolve_ops_conversation_thread(
                settings,
                state,
                slack,
                ops,
                work_order_id,
                record,
            )
        except Exception as exc:
            logging.warning(
                "Conversation-thread lookup failed for work order %s; it will retry: %s",
                work_order_id,
                exc,
            )
            continue
        state_key = f"{channel}:{root_ts}"
        thread_state = thread_states.setdefault(
            state_key,
            {
                "last_message_ts": root_ts,
                "work_order_id": work_order_id,
            },
        )
        last_message_ts = str(thread_state.get("last_message_ts") or root_ts)

        try:
            last_parent_check = float(thread_state.get("parent_checked_at") or 0)
        except (TypeError, ValueError):
            last_parent_check = 0.0
        parent_due = (
            not thread_state.get("parent_signature")
            or time.time() - last_parent_check
            >= max(5, settings.ops_parent_scan_seconds)
        )
        if parent_due:
            try:
                parent_message = slack.thread_parent(channel, root_ts)
                edited_ts = str(
                    (parent_message.get("edited") or {}).get("ts") or ""
                ).strip()
                signature_data = {
                    "user": parent_message.get("user") or "",
                    "text": parent_message.get("text") or "",
                    "editedTs": edited_ts,
                    "subtype": parent_message.get("subtype") or "",
                }
                parent_signature = hashlib.sha256(
                    json.dumps(
                        signature_data,
                        sort_keys=True,
                        ensure_ascii=False,
                    ).encode("utf-8")
                ).hexdigest()
                if parent_signature != thread_state.get("parent_signature"):
                    outcome = sync_ops_slack_message(
                        slack,
                        ops,
                        work_order_id,
                        record,
                        channel,
                        root_ts,
                        parent_message,
                        event_ts=edited_ts or root_ts,
                    )
                    thread_state["parent_signature"] = parent_signature
                    thread_state["parent_last_event_ts"] = edited_ts or root_ts
                    thread_state["last_activity_at"] = utc_now_iso()
                    if outcome in {"synced", "service_complete", "completed"}:
                        sent_count += 1
                    if outcome == "completed":
                        thread_state["completed_at"] = utc_now_iso()
                        thread_state["parent_checked_at"] = time.time()
                        state.save()
                        continue
                thread_state["parent_checked_at"] = time.time()
            except Exception as exc:
                logging.warning(
                    "Slack parent-message sync failed for work order %s; "
                    "it will retry: %s",
                    work_order_id,
                    exc,
                )
                state.save()
                continue

        try:
            replies = slack.thread_replies(
                channel,
                root_ts,
                oldest=last_message_ts,
            )
        except Exception as exc:
            logging.warning(
                "Slack thread scan failed for work order %s; it will retry: %s",
                work_order_id,
                exc,
            )
            state.save()
            continue

        new_messages = sorted(
            (
                message
                for message in replies
                if slack_ts_number(message.get("ts"))
                > slack_ts_number(last_message_ts)
            ),
            key=lambda message: slack_ts_number(message.get("ts")),
        )

        for message in new_messages:
            message_ts = str(message.get("ts") or "").strip()
            if not message_ts:
                continue
            try:
                outcome = sync_ops_slack_message(
                    slack,
                    ops,
                    work_order_id,
                    record,
                    channel,
                    root_ts,
                    message,
                )
                thread_state["last_message_ts"] = message_ts
                thread_state["last_activity_at"] = utc_now_iso()
                if outcome in {"synced", "service_complete", "completed"}:
                    sent_count += 1
                if outcome == "completed":
                    thread_state["completed_at"] = utc_now_iso()
                    break
            except Exception as exc:
                logging.warning(
                    "Firebase Ops message sync failed for work order %s at %s; "
                    "the message will retry: %s",
                    work_order_id,
                    message_ts,
                    exc,
                )
                break

        state.save()

    return sent_count


def configure_logging(level: str) -> None:
    logging.basicConfig(
        level=getattr(logging, level, logging.INFO),
        format="%(asctime)s | %(levelname)s | %(message)s",
    )


RUNTIME_BASELINE_DONE = False


def append_slack_post_log(
    settings: Settings,
    *,
    channel: str,
    ts: str,
    work_order_number: str,
    title: str,
    source: str,
) -> None:
    if not channel or not ts:
        return
    record = {
        "type": "posted",
        "channel": channel,
        "ts": ts,
        "work_order_number": work_order_number,
        "title": title,
        "source": source,
        "logged_at": utc_now_iso(),
    }
    path = settings.slack_post_log_file
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(record, ensure_ascii=True) + "\n")
    except Exception as exc:
        logging.warning("Failed writing Slack post log %s: %s", path, exc)


def send_single_slack_test(settings: Settings, slack: SlackClient) -> Tuple[str, str, str]:
    title = settings.test_work_order_subject or "DUMMY TEST"
    work_order_number = settings.test_work_order_number or "9769"
    work_order_url = settings.test_work_order_url or "https://app.bluefolder.com/workOrder/9769"
    channel, ts = slack.post_dispatch_message(
        title_text=title,
        bluefolder_url=work_order_url,
        work_order_number=work_order_number,
        mention_user_ids=settings.slack_user_ids,
        mention_text=settings.slack_mention_text,
    )
    append_slack_post_log(
        settings,
        channel=channel,
        ts=ts,
        work_order_number=work_order_number,
        title=title,
        source="test_single_slack_send",
    )
    permalink = ""
    try:
        permalink = slack.get_permalink(channel, ts)
    except Exception as exc:
        logging.warning(
            "Slack test message posted, but permalink lookup failed: %s | channel=%s ts=%s",
            exc,
            channel,
            ts,
        )
    return channel, ts, permalink


def process_once(
    settings: Settings,
    state: StateStore,
    bluefolder: BlueFolderClient,
    slack: SlackClient,
    ops: Optional[FirebaseOpsClient] = None,
) -> int:
    global RUNTIME_BASELINE_DONE
    work_orders = bluefolder.list_recent_work_orders()
    logging.info("%s work orders found", len(work_orders))
    work_orders = sort_by_created_at_desc(work_orders)
    if ops and not settings.dry_run:
        sync_bluefolder_assignment_updates(settings, work_orders, state, bluefolder, ops)

    # Establish a startup baseline once per process so we only react to
    # work orders created after this listener starts.
    if (settings.baseline_on_startup or not settings.dry_run) and not RUNTIME_BASELINE_DONE:
        newest_created_at: Optional[str] = None
        baseline_count = 0
        for item in work_orders:
            fields = extract_work_order_fields(item, settings)
            work_order_id = fields["id"]
            if work_order_id and not state.is_processed(work_order_id):
                state.mark_processed(
                    work_order_id,
                    {"baseline": True, "captured_at": utc_now_iso()},
                )
                baseline_count += 1

            current_dt = parse_dt(fields["created_at"])
            newest_dt = parse_dt(newest_created_at)
            if current_dt and (not newest_dt or current_dt > newest_dt):
                newest_created_at = fields["created_at"]

        if newest_created_at:
            state.set_last_seen_created_at(newest_created_at)
        state.save()
        RUNTIME_BASELINE_DONE = True
        logging.info(
            "Startup baseline captured for %s existing work orders. Waiting for newly created work orders.",
            baseline_count,
        )
        return 0

    new_items = filter_new_items(work_orders, state)

    if not new_items:
        return 0

    processed_count = 0
    newest_created_at: Optional[str] = state.get_last_seen_created_at()

    for item in new_items:
        fields = extract_work_order_fields(item, settings)
        work_order_id = fields["id"]
        work_order_number = fields["number"]
        title = build_slack_title(fields)
        bluefolder_link = fields["link"]
        bluefolder_assignees = bluefolder.assigned_users(item)
        external_id = nested_value_by_key(item, "externalId")
        permalink = existing_slack_permalink(item)
        if external_id.startswith("AIS-WEB-") and not permalink:
            try:
                detail = bluefolder.get_work_order(work_order_id)
                permalink = existing_slack_permalink(detail)
            except Exception as exc:
                logging.debug(
                    "Website intake %s is waiting for its Magmo-created Slack link: %s",
                    work_order_id,
                    exc,
                )
            if not permalink:
                logging.info(
                    "Deferring website intake work order %s until Magmo acceptance finishes its testing Slack thread.",
                    work_order_id,
                )
                continue

        logging.info(
            "New work order detected | id=%s number=%s subject=%s",
            work_order_id,
            work_order_number,
            title,
        )

        adopted_channel, adopted_ts = slack_thread_from_permalink(permalink)
        if permalink and adopted_channel and adopted_ts:
            channel = adopted_channel
            ts = adopted_ts
            logging.info(
                "Adopted existing Slack thread for work order %s | channel=%s ts=%s",
                work_order_id,
                channel,
                ts,
            )
        elif settings.dry_run:
            mentions = " ".join(f"<@{user_id}>" for user_id in settings.slack_user_ids).strip()
            if not mentions and settings.slack_mention_text.strip():
                mentions = settings.slack_mention_text.strip()
            parent_preview = "\n".join(
                part
                for part in [
                    f"#{work_order_number}",
                    f"<{bluefolder_link}|{title}>",
                ]
                if part.strip()
            )
            logging.info(
                "[DRY RUN] New work order preview | id=%s number=%s subject=%s url=%s",
                work_order_id,
                work_order_number,
                title,
                bluefolder_link,
            )
            logging.info("[DRY RUN] Slack parent message preview:\n%s", parent_preview)
            if mentions:
                logging.info("[DRY RUN] Slack thread reply preview:\n%s", mentions)
            logging.info("[DRY RUN] Would post Slack message for work order %s", work_order_id)
            permalink = "https://slack.com/app_redirect?channel=dry-run"
            channel = settings.slack_channel_id
            ts = "0.000000"
        else:
            channel, ts = slack.post_dispatch_message(
                title_text=title,
                bluefolder_url=bluefolder_link,
                work_order_number=work_order_number,
                mention_user_ids=settings.slack_user_ids,
                mention_text=settings.slack_mention_text,
            )
            append_slack_post_log(
                settings,
                channel=channel,
                ts=ts,
                work_order_number=work_order_number,
                title=title,
                source="listener",
            )
            permalink = ""
            try:
                permalink = slack.get_permalink(channel, ts)
            except Exception as exc:
                logging.warning(
                    "Slack message posted, but permalink lookup failed: %s | channel=%s ts=%s",
                    exc,
                    channel,
                    ts,
                )
            try:
                if permalink:
                    bluefolder.update_slack_link(work_order_id, permalink)
            except Exception as exc:
                logging.warning(
                    "Failed to write Slack link back to BlueFolder for work order %s: %s",
                    work_order_id,
                    exc,
                )

        created_at = fields["created_at"]
        processed_payload = {
            "number": work_order_number,
            "subject": title,
            "description": fields.get("description") or "",
            "customer": fields.get("customer") or "",
            "created_at": created_at,
            "bluefolder_url": bluefolder_link,
            "slack_channel": channel,
            "slack_ts": ts,
            "slack_permalink": permalink,
            "bluefolder_assignees": bluefolder_assignees,
            "bluefolder_assignment_synced_at": utc_now_iso(),
            "processed_at": utc_now_iso(),
        }
        state.mark_processed(work_order_id, processed_payload)

        current_dt = parse_dt(created_at)
        newest_dt = parse_dt(newest_created_at)
        if current_dt and (not newest_dt or current_dt > newest_dt):
            newest_created_at = created_at

        processed_count += 1
        state.save()
        if ops and not settings.dry_run and channel and ts:
            sync_work_order_to_ops(
                state,
                ops,
                work_order_id,
                processed_payload,
            )

    if newest_created_at:
        state.set_last_seen_created_at(newest_created_at)
        state.save()

    return processed_count


LISTENER_LOCK_HANDLE = None


def acquire_single_instance_lock(lock_path: Path) -> Path:
    global LISTENER_LOCK_HANDLE
    resolved = lock_path.expanduser()
    if not resolved.is_absolute():
        resolved = Path(__file__).resolve().parent / resolved
    resolved.parent.mkdir(parents=True, exist_ok=True)
    handle = open(resolved, "a+b")
    if handle.tell() == 0:
        handle.write(b"0")
        handle.flush()
    handle.seek(0)
    try:
        if os.name == "nt":
            import msvcrt

            msvcrt.locking(handle.fileno(), msvcrt.LK_NBLCK, 1)
        else:
            import fcntl

            fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
    except (OSError, IOError) as exc:
        handle.close()
        raise RuntimeError(
            "Another bluefolder_slack_listener_v2.py instance is already running."
        ) from exc
    LISTENER_LOCK_HANDLE = handle
    return resolved


def main() -> int:
    settings = SETTINGS
    configure_logging(settings.log_level)
    settings.validate()
    lock_path = acquire_single_instance_lock(settings.listener_lock_file)
    logging.info("Single listener lock acquired: %s", lock_path)

    if settings.test_single_slack_send:
        slack = SlackClient(settings)
        logging.info("TEST_SINGLE_SLACK_SEND enabled. Sending one Slack test message and exiting.")
        channel, ts, permalink = send_single_slack_test(settings, slack)
        if settings.ops_track_assignments:
            ops = FirebaseOpsClient(settings)
            ops.create_work_order(
                settings.test_work_order_number,
                {
                    "number": settings.test_work_order_number,
                    "subject": settings.test_work_order_subject,
                    "customer": "",
                    "created_at": utc_now_iso(),
                    "bluefolder_url": settings.test_work_order_url,
                    "slack_channel": channel,
                    "slack_ts": ts,
                    "slack_permalink": permalink,
                },
            )
            logging.info(
                "Added test work order %s to the Magmo Ops queue",
                settings.test_work_order_number,
            )
        logging.info(
            "Slack test sent successfully | channel=%s ts=%s permalink=%s",
            channel,
            ts,
            permalink,
        )
        return 0

    if not settings.enable_bluefolder:
        logging.info("ENABLE_BLUEFOLDER is false and TEST_SINGLE_SLACK_SEND is false. Nothing to do.")
        return 0

    state = StateStore(settings.state_file)
    bluefolder = BlueFolderClient(settings)
    slack = SlackClient(settings)
    ops = FirebaseOpsClient(settings) if settings.ops_track_assignments else None

    logging.info("Starting BlueFolder -> Slack listener")
    logging.info("BlueFolder polling every %s seconds", settings.poll_seconds)
    logging.info(
        "BlueFolder list endpoint: %s (status=%s)",
        settings.bluefolder_work_orders_path,
        settings.bluefolder_list_status or "all",
    )
    logging.info("State file: %s", settings.state_file)
    if ops:
        logging.info(
            "Ops tracking enabled via direct Firestore; source channel=%s conversation channel=%s poll=%ss",
            settings.ops_testing_channel_id or settings.slack_channel_name,
            settings.ops_conversation_channel_id
            or settings.ops_testing_channel_id
            or settings.slack_channel_name,
            settings.ops_message_poll_seconds,
        )

    next_bluefolder_poll = 0.0
    while True:
        try:
            now = time.monotonic()
            if now >= next_bluefolder_poll:
                next_bluefolder_poll = now + max(1, settings.poll_seconds)
                processed = process_once(
                    settings,
                    state,
                    bluefolder,
                    slack,
                    ops,
                )
                if processed:
                    logging.info("Processed %s new work order(s)", processed)

            if ops:
                matched_requests = ops.process_pending_service_request_matches()
                if matched_requests:
                    logging.info(
                        "Matched %s website service request(s) to Client DB candidates",
                        matched_requests,
                    )
                hydrated_threads = hydrate_intake_threads_from_ops(state, ops)
                if hydrated_threads:
                    logging.info(
                        "Connected %s accepted website intake Slack thread(s) to the Python analyzer",
                        hydrated_threads,
                    )
                sync_pending_work_orders(settings, state, ops)
                reclassified = ops.process_pending_category_feedback()
                if reclassified:
                    logging.info(
                        "Reclassified %s Ops work order(s) from category feedback",
                        reclassified,
                    )
                reviewed = ops.process_pending_priority_inference(
                    settings.ops_priority_review_batch_size
                )
                if reviewed:
                    logging.info(
                        "Re-reviewed %s Ops work order category/categories with inference version %s",
                        reviewed,
                        ops.CURRENT_PRIORITY_INFERENCE_VERSION,
                    )
                remote_reviewed = ops.process_pending_remote_inference(
                    settings.ops_priority_review_batch_size
                )
                if remote_reviewed:
                    logging.info(
                        "Reviewed %s Ops work order(s) for active remote work",
                        remote_reviewed,
                    )
                synced_messages = scan_ops_threads(
                    settings,
                    state,
                    slack,
                    ops,
                )
                if synced_messages:
                    logging.info(
                        "Synced %s new Slack Ops event(s)",
                        synced_messages,
                    )
        except KeyboardInterrupt:
            logging.info("Stopped by user")
            return 0
        except Exception as exc:
            logging.exception("Listener loop error: %s", exc)

        time.sleep(
            max(
                0.5,
                settings.ops_message_poll_seconds
                if ops
                else float(settings.poll_seconds),
            )
        )


SETTINGS = Settings()

if __name__ == "__main__":
    sys.exit(main())
