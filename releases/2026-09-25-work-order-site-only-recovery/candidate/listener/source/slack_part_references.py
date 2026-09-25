"""Resolve Slack List record links into concise, human-readable part names."""

from __future__ import annotations

import html
import json
import re
from typing import Any, Callable, Dict, List, Optional, Tuple
from urllib.parse import parse_qs, unquote, urlparse


RECORD_ID_PATTERN = re.compile(r"\bRec[A-Za-z0-9]+\b")
MRKDWN_LINK_PATTERN = re.compile(
    r"<(?P<url>https?://[^|>\s]+)(?:\|(?P<label>[^>]*))?>"
)
PLAIN_URL_PATTERN = re.compile(r"""https?://[^\s<>"']+""")


def _compact(value: Any, limit: int = 240) -> str:
    text = html.unescape(str(value or ""))
    text = re.sub(r"[\t\r\n]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()[:limit]


def simplify_part_name(value: Any) -> str:
    """Remove purchasing/source details while keeping the recognizable part."""
    text = _compact(value)
    if not text:
        return ""

    text = re.sub(r"^<(?:https?://[^|>]+)\|([^>]+)>$", r"\1", text)
    text = re.sub(r"^\s*(?:part|item)\s*[:#-]\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(
        r"\s*\(\s*(?:P\.?\s*O\.?|purchase\s+order)\s*#?\s*[^)]*\)",
        "",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"\s*[-,;]?\s*(?:P\.?\s*O\.?|purchase\s+order)\s*#?\s*[A-Z0-9-]+\s*$",
        "",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"\s+(?:(?:ordered|purchased|sourced)\s+from|from|via)\s+"
        r"[^,;()]+$",
        "",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"\bhelium\s+compress\b",
        "helium compressor",
        text,
        flags=re.IGNORECASE,
    )
    return re.sub(r"\s+", " ", text).strip(" \t\r\n-–—,;:")[:180]


def _usable_name(value: Any) -> str:
    candidate = simplify_part_name(value)
    lowered = candidate.lower()
    if (
        len(candidate) < 3
        or candidate.startswith(("http://", "https://"))
        or RECORD_ID_PATTERN.fullmatch(candidate)
        or re.fullmatch(
            r"(?:[CFDTUW][A-Z0-9]{7,}|[A-Z]{2,}\d[A-Z0-9]{5,})",
            candidate,
        )
        or lowered in {
            "linked part",
            "open in slack",
            "view in slack",
            "view item",
            "list item",
        }
    ):
        return ""
    return candidate


def _flatten_text(value: Any, depth: int = 0) -> List[str]:
    if depth > 8 or value is None:
        return []
    if isinstance(value, str):
        cleaned = _compact(value)
        return [cleaned] if cleaned else []
    if isinstance(value, (int, float)):
        return [str(value)]
    if isinstance(value, list):
        result: List[str] = []
        for entry in value:
            result.extend(_flatten_text(entry, depth + 1))
        return result
    if not isinstance(value, dict):
        return []

    result: List[str] = []
    preferred_keys = (
        "text",
        "title",
        "name",
        "label",
        "value",
        "rich_text",
        "elements",
    )
    for key in preferred_keys:
        if key in value:
            result.extend(_flatten_text(value.get(key), depth + 1))
    return result


def _list_reference(url: str) -> Optional[Tuple[str, str]]:
    try:
        parsed = urlparse(html.unescape(str(url or "")).rstrip(".,);"))
    except Exception:
        return None
    segments = [
        unquote(segment)
        for segment in parsed.path.split("/")
        if unquote(segment)
    ]
    try:
        lists_index = [segment.lower() for segment in segments].index("lists")
    except ValueError:
        return None

    list_id = ""
    for segment in segments[lists_index + 1 :]:
        if re.fullmatch(r"F[A-Z0-9]{7,}", segment, re.IGNORECASE):
            list_id = segment
            break
    query = parse_qs(parsed.query)
    record_id = str(
        (query.get("record_id") or query.get("recordId") or query.get("id") or [""])[0]
    ).strip()
    if not record_id:
        match = re.search(r"(?:record_id|recordId)=([^&#]+)", parsed.query)
        record_id = unquote(match.group(1)) if match else ""
    if not list_id or not RECORD_ID_PATTERN.fullmatch(record_id):
        return None
    return list_id, record_id


def _item_name_from_info(payload: Any) -> str:
    if not isinstance(payload, dict):
        return ""
    item = (
        payload.get("item")
        or payload.get("record")
        or payload.get("slack_list_item")
        or {}
    )
    if not isinstance(item, dict):
        item = {}

    for key in ("title", "name"):
        direct_name = _usable_name(item.get(key))
        if direct_name:
            return direct_name

    fields = item.get("fields") or payload.get("fields") or []
    if not isinstance(fields, list):
        fields = []
    schema = (
        ((payload.get("list") or {}).get("list_metadata") or {}).get("schema")
        if isinstance(payload.get("list"), dict)
        else []
    ) or []
    primary_ids = {
        str(column.get("id") or column.get("column_id") or "")
        for column in schema
        if isinstance(column, dict) and column.get("is_primary_column")
    }

    def field_name(field: Dict[str, Any]) -> str:
        for key in ("rich_text", "text", "value", "title", "name"):
            for candidate in _flatten_text(field.get(key)):
                usable = _usable_name(candidate)
                if usable:
                    return usable
        return ""

    for field in fields:
        if not isinstance(field, dict):
            continue
        column_id = str(field.get("column_id") or field.get("id") or "")
        if column_id and column_id in primary_ids:
            candidate = field_name(field)
            if candidate:
                return candidate

    for field in fields:
        if not isinstance(field, dict):
            continue
        key = str(field.get("key") or field.get("column_name") or "").lower()
        if any(word in key for word in ("name", "title", "part", "item")):
            candidate = field_name(field)
            if candidate:
                return candidate

    for field in fields:
        if isinstance(field, dict):
            candidate = field_name(field)
            if candidate:
                return candidate
    return ""


class SlackPartReferenceResolver:
    """Resolve and cache Slack List item references without leaking record IDs."""

    def __init__(
        self,
        fetch_item_info: Callable[[str, str], Dict[str, Any]],
        warn: Optional[Callable[[str], None]] = None,
    ):
        self.fetch_item_info = fetch_item_info
        self.warn = warn
        self.cache: Dict[Tuple[str, str], str] = {}

    def _resolve(self, list_id: str, record_id: str, label: str = "") -> str:
        cache_key = (list_id, record_id)
        if cache_key in self.cache:
            return self.cache[cache_key]

        name = _usable_name(label)
        if not name:
            try:
                name = _item_name_from_info(
                    self.fetch_item_info(list_id, record_id)
                )
            except Exception as exc:
                if self.warn:
                    self.warn(
                        f"Could not resolve Slack List part {record_id}: {exc}"
                    )
        self.cache[cache_key] = name or "linked part"
        return self.cache[cache_key]

    @staticmethod
    def _payload_label(message: Any, record_id: str) -> str:
        if not isinstance(message, dict):
            return ""

        def visit(value: Any, depth: int = 0) -> str:
            if depth > 7:
                return ""
            if isinstance(value, list):
                for entry in value:
                    found = visit(entry, depth + 1)
                    if found:
                        return found
                return ""
            if not isinstance(value, dict):
                return ""
            try:
                contains_record = record_id in json.dumps(
                    value, ensure_ascii=False
                )
            except Exception:
                contains_record = False
            if contains_record:
                for key in ("title", "name", "label", "text", "value"):
                    for candidate in _flatten_text(value.get(key)):
                        usable = _usable_name(candidate)
                        if usable:
                            return usable
            for child in value.values():
                found = visit(child, depth + 1)
                if found:
                    return found
            return ""

        return visit(message)

    def expand(self, text: Any, message: Optional[Dict[str, Any]] = None) -> str:
        original = html.unescape(str(text or ""))
        payload_text = ""
        if isinstance(message, dict):
            try:
                payload_text = html.unescape(
                    json.dumps(message, ensure_ascii=False)
                )
            except Exception:
                payload_text = ""

        references: Dict[Tuple[str, str], str] = {}
        for match in MRKDWN_LINK_PATTERN.finditer(original):
            reference = _list_reference(match.group("url"))
            if reference:
                references[reference] = str(match.group("label") or "")
        for candidate_url in PLAIN_URL_PATTERN.findall(
            f"{original}\n{payload_text}"
        ):
            reference = _list_reference(candidate_url)
            if reference and reference not in references:
                references[reference] = ""

        resolved: Dict[Tuple[str, str], str] = {}
        for (list_id, record_id), label in references.items():
            payload_label = self._payload_label(message, record_id)
            resolved[(list_id, record_id)] = self._resolve(
                list_id,
                record_id,
                label or payload_label,
            )

        def replace_mrkdwn(match: re.Match[str]) -> str:
            reference = _list_reference(match.group("url"))
            if not reference:
                return match.group(0)
            return resolved.get(reference) or self._resolve(
                reference[0],
                reference[1],
                str(match.group("label") or ""),
            )

        expanded = MRKDWN_LINK_PATTERN.sub(replace_mrkdwn, original)

        def replace_url(match: re.Match[str]) -> str:
            reference = _list_reference(match.group(0))
            if not reference:
                return match.group(0)
            return resolved.get(reference) or self._resolve(
                reference[0], reference[1]
            )

        expanded = PLAIN_URL_PATTERN.sub(replace_url, expanded)
        names_by_record = {
            record_id: name
            for (_, record_id), name in resolved.items()
        }
        expanded = RECORD_ID_PATTERN.sub(
            lambda match: names_by_record.get(match.group(0), "linked part"),
            expanded,
        )
        expanded = re.sub(r"[ \t]+", " ", expanded)
        expanded = re.sub(r"\n{3,}", "\n\n", expanded)
        return expanded.strip()
