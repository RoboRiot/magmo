#!/usr/bin/env python3
"""
Local Slack !done report listener.

Why this exists:
- Slack Events need a public HTTPS callback URL.
- This local worker works like the old BlueFolder listener: it only makes
  outbound requests from your machine to Slack/OpenAI, so no ngrok/proxy is
  required.

Usage:
  py scripts/slack_done_report_listener.py --channel C0123456789

Environment:
  SLACK_BOT_TOKEN=xoxb-...
  OPENAI_API_KEY=...
  SLACK_CHANNEL_ID=C0123456789        optional if --channel is provided
  SLACK_CHANNEL_NAME=dispatch         optional fallback if channel id is absent
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Optional


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_STATE_FILE = ROOT / "scripts" / "slack_done_report_state.json"


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def env_value(name: str, default: str = "") -> str:
    return str(os.getenv(name, default) or "").replace("\\n", "\n").strip()


def post_json(url: str, payload: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={**headers, "Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {exc.code} from {url}: {body[:500]}") from exc


class SlackClient:
    def __init__(self, token: str):
        self.token = token

    def api(self, method: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        data = post_json(
            f"https://slack.com/api/{method}",
            payload,
            {"Authorization": f"Bearer {self.token}"},
        )
        if not data.get("ok"):
            raise RuntimeError(f"Slack API {method} failed: {data}")
        return data

    def resolve_channel_id(self, channel_id: str, channel_name: str) -> str:
        if channel_id:
            return channel_id
        target = channel_name.strip().lstrip("#").lower()
        if not target:
            raise RuntimeError("Set SLACK_CHANNEL_ID, SLACK_CHANNEL_NAME, or pass --channel.")

        cursor = ""
        while True:
            data = self.api(
                "conversations.list",
                {
                    "types": "public_channel,private_channel",
                    "exclude_archived": True,
                    "limit": 1000,
                    **({"cursor": cursor} if cursor else {}),
                },
            )
            for channel in data.get("channels", []):
                if str(channel.get("name") or "").strip().lower() == target:
                    return str(channel.get("id") or "").strip()
            cursor = str((data.get("response_metadata") or {}).get("next_cursor") or "")
            if not cursor:
                break
        raise RuntimeError(f"Could not resolve Slack channel name #{target}. Use --channel C...")

    def history(
        self,
        channel: str,
        *,
        oldest: str = "",
        latest: str = "",
        inclusive: bool = False,
        limit: int = 50,
    ) -> List[Dict[str, Any]]:
        payload: Dict[str, Any] = {"channel": channel, "limit": limit}
        if oldest:
            payload["oldest"] = oldest
        if latest:
            payload["latest"] = latest
        if inclusive:
            payload["inclusive"] = True
        return list(self.api("conversations.history", payload).get("messages", []))

    def replies(self, channel: str, ts: str, limit: int = 200) -> List[Dict[str, Any]]:
        return list(
            self.api("conversations.replies", {"channel": channel, "ts": ts, "limit": limit}).get(
                "messages", []
            )
        )

    def post_message(self, channel: str, text: str, thread_ts: str) -> None:
        self.api(
            "chat.postMessage",
            {
                "channel": channel,
                "text": text,
                "thread_ts": thread_ts,
                "mrkdwn": True,
                "unfurl_links": False,
                "unfurl_media": False,
            },
        )


class OpenAIClient:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def generate_report(self, transcript: str, title: str) -> str:
        model = env_value("OPENAI_SERVICE_REPORT_MODEL", env_value("ASK_MAGMO_MODEL", "gpt-5.5"))
        payload: Dict[str, Any] = {
            "model": model,
            "store": False,
            "input": [
                {
                    "role": "system",
                    "content": (
                        "You write concise, professional field service reports for Advanced "
                        "Imaging Solutions. Use only the Slack transcript provided. Do not "
                        "invent parts, serial numbers, test results, times, or root causes. "
                        "If a detail is missing, omit it or state that it was not specified. "
                        "Return Slack-ready Markdown with sections for Service Report, Work "
                        "Performed, Findings, Resolution/Status, Parts/Materials, and Follow-Up."
                    ),
                },
                {
                    "role": "user",
                    "content": f"Context: {title or 'Slack conversation'}\n\nTranscript:\n{transcript}",
                },
            ],
            "max_output_tokens": int(env_value("OPENAI_SERVICE_REPORT_MAX_TOKENS", "1200")),
        }
        if model.lower().startswith("gpt-5"):
            payload["reasoning"] = {
                "effort": env_value("OPENAI_SERVICE_REPORT_REASONING_EFFORT", "low")
            }
            payload["text"] = {
                "verbosity": env_value("OPENAI_SERVICE_REPORT_VERBOSITY", "medium")
            }

        data = post_json(
            "https://api.openai.com/v1/responses",
            payload,
            {"Authorization": f"Bearer {self.api_key}"},
        )
        if data.get("output_text"):
            return str(data["output_text"]).strip()

        parts: List[str] = []
        for output in data.get("output", []):
            for content in output.get("content", []):
                text = content.get("text")
                if text:
                    parts.append(str(text))
        report = "\n".join(parts).strip()
        if not report:
            raise RuntimeError(f"OpenAI returned no report text: {str(data)[:500]}")
        return report


def load_state(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {"processed": {}, "started_ts": f"{time.time():.6f}"}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {"processed": {}, "started_ts": f"{time.time():.6f}"}


def save_state(path: Path, state: Dict[str, Any]) -> None:
    path.write_text(json.dumps(state, indent=2, sort_keys=True), encoding="utf-8")


def is_done_message(message: Dict[str, Any]) -> bool:
    if message.get("bot_id") or message.get("subtype"):
        return False
    return str(message.get("text") or "").strip().lower() == "!done"


def looks_like_work_order_parent(message: Dict[str, Any]) -> bool:
    text = str(message.get("text") or "")
    return bool(re.search(r"^#[^\n]+\n<[^>|]+\|[^>]+>", text, re.MULTILINE))


def find_parent_thread_ts(slack: SlackClient, channel: str, done_message: Dict[str, Any]) -> str:
    thread_ts = str(done_message.get("thread_ts") or "").strip()
    if thread_ts:
        return thread_ts

    done_ts = str(done_message.get("ts") or "").strip()
    nearby = slack.history(channel, latest=done_ts, inclusive=False, limit=20)
    for message in nearby:
        if looks_like_work_order_parent(message):
            return str(message.get("ts") or "").strip()
    return done_ts


def conversation_for_done(slack: SlackClient, channel: str, done_message: Dict[str, Any]) -> Dict[str, Any]:
    root_ts = find_parent_thread_ts(slack, channel, done_message)
    done_ts = str(done_message.get("ts") or "").strip()

    if root_ts and root_ts != done_ts:
        messages = slack.replies(channel, root_ts, limit=200)
        source = "thread"
    else:
        limit = int(env_value("SLACK_DONE_CHANNEL_HISTORY_LIMIT", "50"))
        messages = slack.history(channel, latest=done_ts, inclusive=False, limit=limit)
        messages = list(reversed(messages))
        source = "channel_history"

    return {"root_ts": root_ts or done_ts, "source": source, "messages": messages}


def clean_slack_text(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip()


def transcript_from_messages(messages: List[Dict[str, Any]]) -> str:
    rows = []
    for index, message in enumerate(messages, start=1):
        text = clean_slack_text(str(message.get("text") or ""))
        if not text:
            continue
        user = message.get("user") or message.get("username") or message.get("bot_id") or "unknown"
        rows.append(f"{index}. {user}: {text}")
    return "\n".join(rows)[-18000:]


def main() -> int:
    load_env_file(ROOT / ".env.local")
    load_env_file(ROOT / ".env")

    parser = argparse.ArgumentParser()
    parser.add_argument("--channel", default=env_value("SLACK_CHANNEL_ID"))
    parser.add_argument("--channel-name", default=env_value("SLACK_CHANNEL_NAME"))
    parser.add_argument("--poll-seconds", type=float, default=float(env_value("SLACK_DONE_POLL_SECONDS", "5")))
    parser.add_argument("--state-file", default=str(DEFAULT_STATE_FILE))
    args = parser.parse_args()

    slack_token = env_value("SLACK_BOT_TOKEN")
    openai_key = env_value("OPENAI_API_KEY")
    if not slack_token:
        raise RuntimeError("Missing SLACK_BOT_TOKEN.")
    if not openai_key:
        raise RuntimeError("Missing OPENAI_API_KEY.")

    slack = SlackClient(slack_token)
    openai = OpenAIClient(openai_key)
    channel = slack.resolve_channel_id(args.channel, args.channel_name)
    state_path = Path(args.state_file)
    state = load_state(state_path)
    oldest = str(state.get("started_ts") or f"{time.time():.6f}")
    processed = state.setdefault("processed", {})
    save_state(state_path, state)

    print(f"Listening for !done in Slack channel {channel}. Press Ctrl+C to stop.")
    print("No ngrok/proxy is needed because this worker only makes outbound requests.")

    while True:
        try:
            messages = slack.history(channel, oldest=oldest, inclusive=False, limit=30)
            newest_ts = oldest
            for message in reversed(messages):
                ts = str(message.get("ts") or "").strip()
                if ts and float(ts) > float(newest_ts):
                    newest_ts = ts
                if not ts or processed.get(ts) or not is_done_message(message):
                    continue

                print(f"!done detected at ts={ts}; generating report...")
                conversation = conversation_for_done(slack, channel, message)
                transcript = transcript_from_messages(conversation["messages"])
                title = f"Slack {conversation['source']} ending at {ts}"
                report = openai.generate_report(transcript, title)
                slack.post_message(channel, report, conversation["root_ts"])
                processed[ts] = {"reported_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
                save_state(state_path, state)
                print(f"Posted report for ts={ts}.")

            oldest = newest_ts
            state["started_ts"] = oldest
            save_state(state_path, state)
        except KeyboardInterrupt:
            print("\nStopped.")
            return 0
        except Exception as exc:
            print(f"Listener error: {exc}", file=sys.stderr)

        time.sleep(args.poll_seconds)


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("\nStopped.")
        raise SystemExit(130)
