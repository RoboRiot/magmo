import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import firebase from "../../context/Firebase";
import opsStyles from "../../styles/Ops.module.css";
import {
  createImageThumbnail,
  preparePhotosForAnalysis,
} from "../../utils/itemImageAnalysis";
import { useSingleTabPolling } from "../../utils/useSingleTabPolling";
import requestStyles from "./ServiceRequestsPanel.module.css";
import { SystemNotesPreview } from "./ClientSystemNotesModal";
const {
  connectionSelectionForClient,
  connectionSelectionForTrailer,
  trailersForClient,
} = require("../../lib/ops/trailerClientLinks.cjs");

const styles = { ...opsStyles, ...requestStyles };
const REPORT_STATUS_OPTIONS = [
  {
    value: "hard_down",
    label: "Hard down",
    note: "System unusable or scanning stopped",
  },
  {
    value: "asap",
    label: "ASAP",
    note: "Service is needed as quickly as possible",
  },
  {
    value: "soon",
    label: "Soon",
    note: "Schedule this in the near term",
  },
  {
    value: "anytime",
    label: "Anytime",
    note: "Service can happen when convenient",
  },
];
const EMPTY_GENERATOR = {
  clientId: "",
  machineId: "",
  trailerId: "",
  urgency: "soon",
  remoteAssigneeIds: [],
  dispatchAssigneeIds: [],
  oversightManagerIds: [],
  issueTitle: "",
  description: "",
};

function optionalAssigneeIds(value) {
  return Array.from(
    new Set(
      (Array.isArray(value) ? value : [])
        .map((id) => String(id || "").trim())
        .filter(Boolean)
    )
  );
}

async function requestApi(path, options = {}) {
  const token = await firebase.auth().currentUser?.getIdToken();
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "The Requests queue could not be reached.");
  }
  return body;
}

function formatDate(value, includeTime = false) {
  const date = new Date(value || "");
  if (Number.isNaN(date.getTime())) return value || "Date unavailable";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(date);
}

function displayValue(value) {
  const text = String(value || "").replaceAll("_", " ").trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "Not provided";
}

function requestBelongsToView(request, view) {
  if (view === "accepted") return request?.status === "accepted";
  if (view === "archived") return request?.status === "archived";
  return ["pending", "accepting"].includes(request?.status);
}

function suggestionConfidence(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return "Not supplied";
  const percentage = parsed <= 1 ? parsed * 100 : parsed;
  return `${Math.max(0, Math.min(100, Math.round(percentage)))}%`;
}

function suggestedMachineLabel(request) {
  const suggestion = request?.suggestedClient || {};
  const machine =
    request?.suggestedMachine ||
    suggestion.suggestedMachine ||
    suggestion.machine ||
    null;
  if (typeof machine === "string") return machine;
  if (machine && typeof machine === "object") {
    return (
      machine.label ||
      machine.name ||
      [machine.oem, machine.modality, machine.model].filter(Boolean).join(" · ")
    );
  }
  return suggestion.machineLabel || suggestion.machineName || "No machine suggested";
}

function suggestedAddress(request) {
  const suggestion = request?.suggestedClient || {};
  return (
    suggestion.address ||
    suggestion.matchedAddress ||
    suggestion.location ||
    request?.suggestedAddress ||
    "No matching address was returned"
  );
}

function fileKey(file) {
  return [file?.name, file?.size, file?.lastModified].join(":");
}

function selectAnalysisImages(analysisFiles, referenceFiles, maxImages = 4) {
  const analysis = (analysisFiles || [])
    .filter((file) => String(file?.type || "").startsWith("image/"))
    .map((file) => ({ file, source: "analysis" }));
  const attachments = (referenceFiles || [])
    .filter((file) => String(file?.type || "").startsWith("image/"))
    .map((file) => ({ file, source: "attachment" }));
  const selected = [];
  const known = new Set();
  const add = (entry) => {
    if (!entry || selected.length >= maxImages || known.has(fileKey(entry.file))) {
      return;
    }
    selected.push(entry);
    known.add(fileKey(entry.file));
  };

  if (analysis.length && attachments.length) {
    add(analysis[0]);
    add(attachments[0]);
  }
  [...analysis, ...attachments].forEach(add);
  return selected;
}

function safeStorageName(value) {
  return (
    String(value || "attachment")
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 120) || "attachment"
  );
}

function formatFileSize(value) {
  const bytes = Number(value || 0);
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function FilePreview({ file }) {
  const isImage = String(file.contentType || "").startsWith("image/");
  const isVideo = String(file.contentType || "").startsWith("video/");
  return (
    <a
      className={styles.requestFile}
      href={file.url}
      target="_blank"
      rel="noreferrer"
    >
      {isImage ? (
        <img src={file.url} alt={file.name || "Request attachment"} />
      ) : isVideo ? (
        <video src={file.url} controls preload="metadata" />
      ) : (
        <span>{file.contentType === "application/pdf" ? "PDF" : "FILE"}</span>
      )}
      <div>
        <strong>{file.name}</strong>
        <small>
          {file.purpose === "analysis" ? "Analyzed evidence · " : ""}
          {formatFileSize(file.size)}
        </small>
      </div>
    </a>
  );
}

function SelectedFile({ file, purpose, onRemove, disabled = false }) {
  const isVideo = String(file?.type || "").startsWith("video/");
  return (
    <div className={styles.generatorFile}>
      <span>{isVideo ? "VIDEO" : purpose === "analysis" ? "AI" : "FILE"}</span>
      <div>
        <strong>{file.name}</strong>
        <small>{formatFileSize(file.size)}</small>
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label={`Remove ${file.name}`}
      >
        ×
      </button>
    </div>
  );
}

function AnalysisFeedback({ note, status = "missing" }) {
  if (!note) return null;
  return (
    <span className={styles.analysisFieldFeedback} data-status={status}>
      <i aria-hidden="true">{status === "found" ? "✓" : "—"}</i>
      {note}
    </span>
  );
}

function SiteCandidateChooser({
  candidates,
  selectedId,
  onSelect,
  disabled = false,
}) {
  if (!Array.isArray(candidates) || candidates.length < 2) return null;
  return (
    <div className={styles.analysisSiteChooser}>
      <div>
        <span>MULTIPLE POSSIBLE SITES</span>
        <strong>
          {selectedId
            ? "Site selected — change it here if needed"
            : "Choose where this work order belongs"}
        </strong>
        <p>
          {selectedId
            ? "The work order will use the highlighted site."
            : "The supplied information matches more than one Magmo client record. Nothing will be attached until you choose."}
        </p>
      </div>
      <div className={styles.analysisSiteOptions}>
        {candidates.map((candidate) => (
          <button
            type="button"
            key={candidate.id}
            disabled={disabled}
            data-selected={selectedId === candidate.id ? "true" : "false"}
            onClick={() => onSelect(candidate.id)}
          >
            <span>
              <strong>{candidate.name}</strong>
              <b>
                {Math.round(Number(candidate.confidence || 0) * 100)}% match
              </b>
            </span>
            <small>{candidate.location || "Location not recorded"}</small>
            <span className={styles.analysisSiteEvidence}>
              {candidate.evidence}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function assigneeInitials(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function RecordSearchField({
  label,
  kind,
  note,
  options,
  value,
  onChange,
  disabled = false,
  placeholder,
  emptyMessage,
  feedback,
  feedbackStatus,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = useMemo(
    () => options.find((option) => option.id === value) || null,
    [options, value]
  );
  const matches = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return options
      .filter((option) => option.id !== value)
      .map((option) => {
        const primary = String(option.name || option.label || option.id || "");
        const secondary =
          kind === "client"
            ? String(option.location || "")
            : kind === "trailer"
            ? [option.clientName, option.clientLocation, option.model]
                .filter(Boolean)
                .join(" · ")
            : [
                option.oem,
                option.modality,
                option.model,
                option.location,
              ]
                .filter(Boolean)
                .join(" · ");
        const normalizedPrimary = primary.toLowerCase();
        const haystack = `${normalizedPrimary} ${secondary.toLowerCase()}`;
        const words = haystack.split(/\s+/);
        const score = !needle
          ? 3
          : normalizedPrimary.startsWith(needle)
          ? 0
          : words.some((word) => word.startsWith(needle))
          ? 1
          : haystack.includes(needle)
          ? 2
          : 9;
        return { ...option, primary, secondary, score };
      })
      .filter((option) => option.score < 9)
      .sort(
        (left, right) =>
          left.score - right.score ||
          left.primary.localeCompare(right.primary)
      )
      .slice(0, 8);
  }, [kind, options, search, value]);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setSearch("");
    }
  }, [disabled]);

  const choose = (id) => {
    onChange(id);
    setSearch("");
    setActiveIndex(0);
    setOpen(false);
  };

  const clear = () => {
    onChange("");
    setSearch("");
    setActiveIndex(0);
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        matches.length ? (current + 1) % matches.length : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        matches.length ? (current - 1 + matches.length) % matches.length : 0
      );
    } else if (event.key === "Enter" && open && matches.length) {
      event.preventDefault();
      choose(matches[Math.min(activeIndex, matches.length - 1)].id);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const selectedSecondary = selected
    ? kind === "client"
      ? selected.location
      : kind === "trailer"
      ? [selected.clientName, selected.clientLocation, selected.model]
          .filter(Boolean)
          .join(" · ")
      : [selected.oem, selected.modality, selected.model, selected.location]
          .filter(Boolean)
          .join(" · ")
    : "";

  return (
    <div
      className={styles.generatorRecordField}
      data-kind={kind}
      data-disabled={disabled ? "true" : "false"}
    >
      <div className={styles.generatorRecordLabel}>
        <span>{label}</span>
        <small>{note}</small>
      </div>
      <div
        className={styles.generatorRecordControl}
        data-open={open ? "true" : "false"}
      >
        {selected ? (
          <div className={styles.generatorRecordSelection}>
            <i aria-hidden="true">
              {kind === "client" ? "C" : kind === "trailer" ? "T" : "M"}
            </i>
            <span>
              <strong>{selected.name || selected.label}</strong>
              <small>
                {selectedSecondary ||
                  (kind === "client"
                    ? "Client record"
                    : kind === "trailer"
                    ? "Trailer record"
                    : "Machine record")}
              </small>
            </span>
            <button
              type="button"
              onClick={clear}
              disabled={disabled}
              aria-label={`Clear selected ${label.toLowerCase()}`}
            >
              ×
            </button>
          </div>
        ) : null}
        <input
          value={search}
          disabled={disabled}
          onChange={(event) => {
            setSearch(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={
            disabled
              ? "Select a client first"
              : selected
              ? `Search to change ${label.toLowerCase()}…`
              : placeholder
          }
          aria-label={`Search ${label.toLowerCase()} records`}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        {open && !disabled ? (
          <div className={styles.generatorRecordSuggestions} role="listbox">
            {matches.length ? (
              matches.map((option, index) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  data-active={index === activeIndex ? "true" : "false"}
                  key={option.id}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option.id)}
                >
                  <i aria-hidden="true">
                    {kind === "client" ? "C" : kind === "trailer" ? "T" : "M"}
                  </i>
                  <span>
                    <strong>{option.primary}</strong>
                    <small>
                      {option.secondary ||
                        (kind === "client"
                          ? "Client record"
                          : kind === "trailer"
                          ? "Trailer record"
                          : "Machine record")}
                    </small>
                  </span>
                  <b aria-hidden="true">Select</b>
                </button>
              ))
            ) : (
              <p>{emptyMessage}</p>
            )}
          </div>
        ) : null}
      </div>
      <AnalysisFeedback note={feedback} status={feedbackStatus} />
    </div>
  );
}

function ClientSuggestionReview({
  request,
  clients,
  review,
  busy = false,
  onAccept,
  onDeny,
  onCancelDeny,
  onChangeClient,
  onChangeReason,
  onSubmitDeny,
}) {
  const suggestion = request?.suggestedClient;
  if (!suggestion || request?.confirmedClient) return null;
  const reason = suggestion.reason || suggestion.evidence || "No explanation was returned.";
  const denying = review?.mode === "deny";

  return (
    <section className={styles.clientSuggestion} aria-label="Magmo client suggestion">
      <div className={styles.suggestionTopline}>
        <span className={styles.suggestionBadge}>(Magmo suggestion)</span>
        <span className={styles.suggestionConfidence}>
          {suggestionConfidence(suggestion.confidence)} confidence
        </span>
      </div>
      <div className={styles.suggestionHeadline}>
        <span aria-hidden="true">M</span>
        <div>
          <small>Suggested Client DB record</small>
          <strong>{suggestion.name || "Unnamed client record"}</strong>
        </div>
      </div>
      <div className={styles.suggestionDetails}>
        <div>
          <span>Machine</span>
          <strong>{suggestedMachineLabel(request)}</strong>
        </div>
        <div>
          <span>Matched address</span>
          <strong>{suggestedAddress(request)}</strong>
        </div>
        <div className={styles.suggestionReason}>
          <span>Why Magmo suggested it</span>
          <p>{reason}</p>
        </div>
      </div>

      {denying ? (
        <div className={styles.suggestionCorrection}>
          <div>
            <span>CORRECT THE MATCH</span>
            <strong>Help Magmo learn from this decision</strong>
            <p>
              Choose the right client when you know it, and briefly explain what
              evidence Magmo should use next time.
            </p>
          </div>
          <RecordSearchField
            label="Correct Client DB record"
            kind="client"
            note="Optional, but the most useful feedback"
            options={clients}
            value={review?.selectedClientId || ""}
            onChange={onChangeClient}
            disabled={busy}
            placeholder="Search clients by name or address…"
            emptyMessage="No matching client records"
          />
          <label className={styles.suggestionReasonInput}>
            Why was this suggestion wrong?
            <textarea
              rows={2}
              maxLength={500}
              value={review?.reason || ""}
              disabled={busy}
              onChange={(event) => onChangeReason(event.target.value)}
              placeholder="Example: This address belongs to the SimonMed Northwest trailer, not the Las Vegas client record."
            />
            <small>{String(review?.reason || "").length}/500</small>
          </label>
          <div className={styles.suggestionCorrectionActions}>
            <button type="button" onClick={onCancelDeny} disabled={busy}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.suggestionSubmitCorrection}
              onClick={onSubmitDeny}
              disabled={busy || !String(review?.reason || "").trim()}
            >
              {busy ? "Saving feedback…" : "Save correction"}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.suggestionActions}>
          <p>Review this match before it is attached to the request.</p>
          <div>
            <button
              type="button"
              className={styles.suggestionDeny}
              onClick={onDeny}
              disabled={busy}
            >
              Deny
            </button>
            <button
              type="button"
              className={styles.suggestionAccept}
              onClick={onAccept}
              disabled={busy}
            >
              {busy ? "Saving…" : "Accept suggestion"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function AssigneeSearchField({
  label,
  note,
  options,
  selectedIds,
  onChange,
  tone,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedSet = useMemo(
    () => new Set(Array.isArray(selectedIds) ? selectedIds : []),
    [selectedIds]
  );
  const selected = useMemo(
    () => options.filter((option) => selectedSet.has(option.id)),
    [options, selectedSet]
  );
  const matches = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return options
      .filter((option) => !selectedSet.has(option.id))
      .map((option) => {
        const name = String(option.name || "").toLowerCase();
        const words = name.split(/\s+/);
        const score = !needle
          ? 3
          : name.startsWith(needle)
          ? 0
          : words.some((word) => word.startsWith(needle))
          ? 1
          : name.includes(needle)
          ? 2
          : 9;
        return { ...option, score };
      })
      .filter((option) => option.score < 9)
      .sort(
        (left, right) =>
          left.score - right.score || left.name.localeCompare(right.name)
      )
      .slice(0, 8);
  }, [options, search, selectedSet]);

  const add = (id) => {
    if (!id || selectedSet.has(id)) return;
    onChange([...(Array.isArray(selectedIds) ? selectedIds : []), id]);
    setSearch("");
    setActiveIndex(0);
    setOpen(true);
  };

  const remove = (id) => {
    onChange((Array.isArray(selectedIds) ? selectedIds : []).filter(
      (selectedId) => selectedId !== id
    ));
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        matches.length ? (current + 1) % matches.length : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        matches.length ? (current - 1 + matches.length) % matches.length : 0
      );
    } else if (event.key === "Enter" && open && matches.length) {
      event.preventDefault();
      add(matches[Math.min(activeIndex, matches.length - 1)].id);
    } else if (event.key === "Backspace" && !search && selected.length) {
      remove(selected[selected.length - 1].id);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={styles.assigneeSearchField} data-tone={tone}>
      <div className={styles.assigneeSearchHeading}>
        <div>
          <span>
            {tone === "remote"
              ? "REMOTE"
              : tone === "oversight"
              ? "OVERSIGHT"
              : "DISPATCH"}
          </span>
          <strong>{label}</strong>
        </div>
        <small>{note}</small>
      </div>
      <div
        className={styles.assigneeSearchControl}
        data-open={open ? "true" : "false"}
      >
        {selected.map((assignee) => (
          <span className={styles.assigneeChip} key={assignee.id}>
            <i aria-hidden="true">{assigneeInitials(assignee.name)}</i>
            {assignee.name}
            <button
              type="button"
              onClick={() => remove(assignee.id)}
              aria-label={`Remove ${assignee.name} from ${label}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={selected.length ? "Add another person…" : "Search a name…"}
          aria-label={`Search ${label}`}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        {open ? (
          <div className={styles.assigneeSuggestions} role="listbox">
            {matches.length ? (
              matches.map((assignee, index) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  data-active={index === activeIndex ? "true" : "false"}
                  key={assignee.id}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => add(assignee.id)}
                >
                  <i aria-hidden="true">{assigneeInitials(assignee.name)}</i>
                  <span>
                    <strong>{assignee.name}</strong>
                    <small>Slack team member</small>
                  </span>
                  <b aria-hidden="true">+</b>
                </button>
              ))
            ) : (
              <p>No matching people</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DetailRow({ label, value, wide = false }) {
  return (
    <div className={wide ? styles.requestDetailWide : ""}>
      <span>{label}</span>
      <strong>{value || "Not provided"}</strong>
    </div>
  );
}

function requestApprovals(request) {
  return Array.isArray(request?.overseerApprovals)
    ? request.overseerApprovals.filter((approval) => approval && typeof approval === "object")
    : [];
}

function approvalName(approval) {
  const name = String(approval?.name || "").trim();
  if (name) return name;
  const email = String(approval?.email || "").trim();
  if (email) return email.split("@")[0];
  return "Manager";
}

function approvalNames(request) {
  return Array.from(new Set(requestApprovals(request).map(approvalName)));
}

function formatApproverList(names) {
  if (!names.length) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function hasOverseerApproval(request) {
  return Boolean(
    request?.hasOverseerApproval ||
      Number(request?.overseerApprovalCount || 0) > 0 ||
      requestApprovals(request).length
  );
}

function selectionIsConfirmedForApproval(
  request,
  selectedClientId = "",
  selectedMachineId = ""
) {
  const confirmedClientId = String(request?.confirmedClient?.id || "").trim();
  const confirmedMachineId = String(request?.machineId || "").trim();
  const selectedClient = String(selectedClientId || "").trim();
  const selectedMachine = String(selectedMachineId || "").trim();
  return Boolean(
    confirmedClientId &&
      confirmedMachineId &&
      (!selectedClient || selectedClient === confirmedClientId) &&
      (!selectedMachine || selectedMachine === confirmedMachineId)
  );
}

function viewerApprovedRequest(request, viewer) {
  const viewerId = String(viewer?.id || "").trim();
  const viewerEmail = String(viewer?.email || "").trim().toLowerCase();
  return requestApprovals(request).some((approval) => {
    const approverId = String(approval?.approverId || "").trim();
    const approverEmail = String(approval?.email || "").trim().toLowerCase();
    return Boolean(
      (viewerId && approverId === viewerId) ||
        (viewerEmail && approverEmail === viewerEmail)
    );
  });
}

function OverseerApprovalGate({
  request,
  viewer,
  busy = false,
  onChange,
  compact = false,
  clientReady = true,
}) {
  const approved = hasOverseerApproval(request);
  const ownApproval = viewerApprovedRequest(request, viewer);
  const names = approvalNames(request);
  const summary = approved
    ? `${formatApproverList(names) || "A manager"} approved this work order.`
    : clientReady
    ? "Manager approval is required before this request can be added."
    : "Confirm the Client DB and machine match before manager approval.";

  return (
    <div
      className={[
        styles.overseerApprovalGate,
        compact ? styles.overseerApprovalGateCompact : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-approved={approved ? "true" : "false"}
      aria-live="polite"
    >
      <div className={styles.overseerApprovalStatus}>
        <span className={styles.overseerApprovalIcon} aria-hidden="true">
          {approved ? "✓" : "🔒"}
        </span>
        <div>
          <span>OVERSEER APPROVAL</span>
          <strong>{summary}</strong>
          {!compact ? (
            <small>
              {approved
                ? "The request is ready for anyone to add to Dispatch."
                : !clientReady
                ? "Approval stays locked until the client and machine records are confirmed."
                : "Sean, Stan, Igor, or another admin can approve it."}
            </small>
          ) : null}
        </div>
      </div>
      {viewer?.canApproveOverseer ? (
        <button
          type="button"
          className={ownApproval ? styles.overseerApprovalUndo : ""}
          onClick={() => onChange?.(!ownApproval)}
          disabled={busy || !clientReady}
          aria-pressed={ownApproval}
        >
          {busy
            ? "Saving…"
            : !clientReady
            ? "Confirm client & machine first"
            : ownApproval
            ? "Remove my approval"
            : "Approve as overseer"}
        </button>
      ) : null}
    </div>
  );
}

export default function ServiceRequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const [machines, setMachines] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [defaultOversightManagerIds, setDefaultOversightManagerIds] = useState(
    []
  );
  const [viewer, setViewer] = useState(null);
  const [requestView, setRequestView] = useState("requests");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [busyAction, setBusyAction] = useState("");
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [clientChoices, setClientChoices] = useState({});
  const [machineChoices, setMachineChoices] = useState({});
  const [suggestionReviews, setSuggestionReviews] = useState({});
  const [detailRemoteAssigneeIds, setDetailRemoteAssigneeIds] = useState([]);
  const [detailDispatchAssigneeIds, setDetailDispatchAssigneeIds] = useState([]);
  const [detailOversightManagerIds, setDetailOversightManagerIds] = useState([]);
  const [query, setQuery] = useState("");
  const [generatorOpen, setGeneratorOpen] = useState(false);
  const [generatorMode, setGeneratorMode] = useState("generate");
  const [generatorForm, setGeneratorForm] = useState(EMPTY_GENERATOR);
  const [analysisFiles, setAnalysisFiles] = useState([]);
  const [referenceFiles, setReferenceFiles] = useState([]);
  const [analysisBusy, setAnalysisBusy] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatorBusy, setGeneratorBusy] = useState(false);
  const [generatorProgress, setGeneratorProgress] = useState("");
  const [generatorError, setGeneratorError] = useState("");
  const suggestionAttemptsRef = useRef(new Set());
  const requestCursorsRef = useRef({});
  const requestIndexesRef = useRef({});
  const catalogLoadedRef = useRef(false);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      let fetchMore = true;
      let page = 0;
      let cursor = quiet ? requestCursorsRef.current[requestView] || "" : "";
      let nextRequests = [];
      while (fetchMore && page < 5) {
        const params = new URLSearchParams({ view: requestView });
        if (cursor) params.set("since", cursor);
        if (!catalogLoadedRef.current && page === 0) {
          params.set("includeCatalog", "1");
        }
        const data = await requestApi(`/api/ops/service-requests?${params}`);
        let index = requestIndexesRef.current[requestView];
        if (data.incremental && index) {
          (data.changes || []).forEach((request) => {
            if (!request?.id) return;
            if (requestBelongsToView(request, requestView)) {
              index.set(request.id, request);
            } else {
              index.delete(request.id);
            }
          });
        } else {
          index = new Map(
            (data.requests || [])
              .filter((request) => request?.id)
              .map((request) => [request.id, request])
          );
          requestIndexesRef.current[requestView] = index;
        }
        nextRequests = Array.from(index.values()).sort(
          (left, right) =>
            Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0)
        );
        requestCursorsRef.current[requestView] =
          data.cursor || requestCursorsRef.current[requestView] || "";
        cursor = requestCursorsRef.current[requestView];
        fetchMore = Boolean(data.hasMore);
        page += 1;
        if (Array.isArray(data.clients)) {
          setClients(data.clients);
          setMachines(data.machines || []);
          setTrailers(data.trailers || []);
          catalogLoadedRef.current = true;
        }
        setAssignees(data.assigneeOptions || []);
        setDefaultOversightManagerIds(data.defaultOversightManagerIds || []);
        setViewer(data.viewer || null);
      }
      setRequests(nextRequests);
      setDetail((current) => {
        if (!current) return current;
        const refreshed = nextRequests.find((request) => request.id === current.id);
        return refreshed ? { ...current, ...refreshed } : current;
      });
      setError("");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [requestView]);

  useSingleTabPolling({
    intervalMs: 60_000,
    leaseKey: `ops-service-requests-${requestView}-v2`,
    poll: load,
  });

  useEffect(() => {
    if (requestView !== "requests") return;
    const pending = requests
      .filter(
        (request) =>
          request.clientMatchStatus === "pending" &&
          !request.confirmedClient &&
          !request.suggestedClient &&
          !suggestionAttemptsRef.current.has(request.id)
      )
      .slice(0, 5);
    if (!pending.length) return;
    pending.forEach((request) => suggestionAttemptsRef.current.add(request.id));
    let cancelled = false;
    Promise.allSettled(
      pending.map((request) =>
        requestApi("/api/ops/service-requests", {
          method: "PATCH",
          body: JSON.stringify({
            action: "suggest_client",
            requestId: request.id,
          }),
        })
      )
    ).then(() => {
      if (!cancelled) load(true);
    });
    return () => {
      cancelled = true;
    };
  }, [load, requestView, requests]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setDetail(null);
        if (!generatorBusy) setGeneratorOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const generatorMachines = useMemo(
    () =>
      machines.filter((machine) =>
        (machine.clientIds || []).includes(generatorForm.clientId)
      ),
    [generatorForm.clientId, machines]
  );
  const generatorTrailers = useMemo(
    () => trailersForClient(trailers, generatorForm.clientId),
    [generatorForm.clientId, trailers]
  );
  const generatorClient = useMemo(
    () => clients.find((client) => client.id === generatorForm.clientId) || null,
    [clients, generatorForm.clientId]
  );
  const analysisInputImages = useMemo(
    () => selectAnalysisImages(analysisFiles, referenceFiles),
    [analysisFiles, referenceFiles]
  );
  const hasAnalysisText = Boolean(
    generatorForm.issueTitle.trim() || generatorForm.description.trim()
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return requests;
    return requests.filter((request) =>
      [
        request.requestNumber,
        request.companyName,
        request.issueTitle,
        request.locationText,
        request.urgencyLabel,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, requests]);

  const choiceFor = (request) =>
    Object.prototype.hasOwnProperty.call(clientChoices, request.id)
      ? clientChoices[request.id]
      : request.confirmedClient?.id || "";

  const machinesForClient = (clientId) =>
    clientId
      ? machines.filter((machine) =>
          (machine.clientIds || []).includes(clientId)
        )
      : [];

  const machineChoiceFor = (request) => {
    const clientId = choiceFor(request);
    if (!clientId) return "";
    const candidateId = Object.prototype.hasOwnProperty.call(
      machineChoices,
      request.id
    )
      ? machineChoices[request.id]
      : request.machineId || request.suggestedMachine?.id || "";
    return machines.some(
      (machine) =>
        machine.id === candidateId &&
        (machine.clientIds || []).includes(clientId)
    )
      ? candidateId
      : "";
  };

  const setChoice = (request, clientId) => {
    const requestId = request.id;
    setClientChoices((current) => ({ ...current, [requestId]: clientId }));
    setMachineChoices((current) => {
      const currentMachineId = Object.prototype.hasOwnProperty.call(
        current,
        requestId
      )
        ? current[requestId]
        : request.machineId || request.suggestedMachine?.id || "";
      const machineStillBelongs = machines.some(
        (machine) =>
          machine.id === currentMachineId &&
          (machine.clientIds || []).includes(clientId)
      );
      return {
        ...current,
        [requestId]: machineStillBelongs ? currentMachineId : "",
      };
    });
  };

  const setMachineChoice = (requestId, machineId) => {
    setMachineChoices((current) => ({ ...current, [requestId]: machineId }));
  };

  const reviewFor = (requestId) =>
    suggestionReviews[requestId] || {
      mode: "",
      selectedClientId: "",
      reason: "",
    };

  const updateSuggestionReview = (requestId, patch) => {
    setSuggestionReviews((current) => ({
      ...current,
      [requestId]: {
        mode: "",
        selectedClientId: "",
        reason: "",
        ...(current[requestId] || {}),
        ...patch,
      },
    }));
  };

  const openGenerator = (mode = "generate") => {
    setRequestView("requests");
    setGeneratorMode(mode === "request" ? "request" : "generate");
    setGeneratorForm({
      ...EMPTY_GENERATOR,
      oversightManagerIds: [...defaultOversightManagerIds],
    });
    setAnalysisFiles([]);
    setReferenceFiles([]);
    setAnalysisResult(null);
    setGeneratorError("");
    setGeneratorProgress("");
    setGeneratorOpen(true);
  };

  const updateGenerator = (field, value) => {
    setGeneratorForm((current) => {
      if (field === "clientId") {
        const connection = connectionSelectionForClient({
          clientId: value,
          trailers,
          currentTrailerId: current.trailerId,
        });
        const machineBelongsToClient = machines.some(
          (machine) =>
            machine.id === connection.machineId &&
            (machine.clientIds || []).includes(connection.clientId)
        );
        return {
          ...current,
          clientId: connection.clientId,
          trailerId: connection.trailerId,
          machineId: machineBelongsToClient ? connection.machineId : "",
        };
      }
      if (field === "trailerId") {
        if (!value) return { ...current, trailerId: "" };
        const connection = connectionSelectionForTrailer({
          trailerId: value,
          trailers,
        });
        const machineBelongsToClient = machines.some(
          (machine) =>
            machine.id === connection.machineId &&
            (machine.clientIds || []).includes(connection.clientId)
        );
        return {
          ...current,
          clientId: connection.clientId,
          trailerId: connection.trailerId,
          machineId: machineBelongsToClient ? connection.machineId : "",
        };
      }
      return { ...current, [field]: value };
    });
    if (["clientId", "machineId", "trailerId"].includes(field)) {
      setAnalysisResult(null);
    } else if (["issueTitle", "description"].includes(field)) {
      setAnalysisResult((current) =>
        current
          ? {
              ...current,
              [field]: "",
              feedback: { ...(current.feedback || {}), [field]: "" },
            }
          : null
      );
    }
  };

  const addAnalysisFiles = (selected) => {
    const images = Array.from(selected || []).filter((file) =>
      String(file.type || "").startsWith("image/")
    );
    setAnalysisFiles((current) => {
      const known = new Set(current.map(fileKey));
      const next = [...current];
      images.forEach((file) => {
        if (!known.has(fileKey(file)) && next.length < 4) {
          next.push(file);
          known.add(fileKey(file));
        }
      });
      return next;
    });
    setAnalysisResult(null);
    setGeneratorError(
      images.length !== Array.from(selected || []).length
        ? "Only image files can be placed in Analyze images."
        : ""
    );
  };

  const addReferenceFiles = (selected) => {
    const accepted = Array.from(selected || []).filter((file) => {
      const type = String(file.type || "").toLowerCase();
      return (
        type.startsWith("image/") ||
        type.startsWith("video/") ||
        type === "application/pdf"
      );
    });
    setReferenceFiles((current) => {
      const known = new Set(current.map(fileKey));
      const next = [...current];
      accepted.forEach((file) => {
        if (!known.has(fileKey(file)) && next.length < 12) {
          next.push(file);
          known.add(fileKey(file));
        }
      });
      return next;
    });
    setAnalysisResult(null);
    setGeneratorError(
      accepted.length !== Array.from(selected || []).length
        ? "Reference attachments must be an image, video, or PDF."
        : ""
    );
  };

  const analyzeSelectedImages = async () => {
    if (!hasAnalysisText && !analysisInputImages.length) {
      setGeneratorError("Add issue text or at least one image before analyzing.");
      return;
    }
    setAnalysisBusy(true);
    setGeneratorError("");
    try {
      const preparedImages = await preparePhotosForAnalysis(
        analysisInputImages.map(({ file }) => ({ file })),
        { maxImages: 4, maxDimension: 1600, jpegQuality: 0.82 }
      );
      const images = preparedImages.map((dataUrl, index) => ({
        dataUrl,
        name: analysisInputImages[index]?.file?.name || "",
        source: analysisInputImages[index]?.source || "analysis",
      }));
      const data = await requestApi("/api/ops/service-request-analysis", {
        method: "POST",
        body: JSON.stringify({
          clientId: generatorForm.clientId,
          machineId: generatorForm.machineId,
          issueTitle: generatorForm.issueTitle,
          description: generatorForm.description,
          images,
        }),
      });
      const result = data.analysis || {};
      const siteCandidates = (Array.isArray(result.siteCandidates)
        ? result.siteCandidates
        : []
      ).filter((candidate) =>
        clients.some((client) => client.id === candidate.id)
      );
      const siteDecisionRequired = siteCandidates.length > 1;
      const suggestedClient = siteDecisionRequired
        ? null
        : clients.find((client) => client.id === result.clientId);
      const currentClient = clients.find(
        (client) => client.id === generatorForm.clientId
      );
      const nextClientId = generatorForm.clientId || suggestedClient?.id || "";
      const suggestedMachine = machines.find(
        (machine) =>
          machine.id === result.machineId &&
          (!nextClientId || (machine.clientIds || []).includes(nextClientId))
      );
      const currentMachine = machines.find(
        (machine) => machine.id === generatorForm.machineId
      );
      const nextMachineId =
        generatorForm.machineId ||
        (!siteDecisionRequired && nextClientId ? suggestedMachine?.id : "") ||
        "";
      const feedback = { ...(result.feedback || {}) };
      if (
        currentClient &&
        suggestedClient &&
        currentClient.id !== suggestedClient.id
      ) {
        feedback.client = `AI suggested ${suggestedClient.name}, but kept your selected client ${currentClient.name}.`;
      }
      if (
        currentMachine &&
        suggestedMachine &&
        currentMachine.id !== suggestedMachine.id
      ) {
        feedback.machine = `AI suggested ${suggestedMachine.name}, but kept your selected machine ${currentMachine.name}.`;
      } else if (
        result.machineId &&
        !suggestedMachine &&
        generatorForm.clientId
      ) {
        feedback.machine = `The possible machine was not linked to ${
          currentClient?.name || "the selected client"
        }, so it was not filled.`;
      }
      setGeneratorForm((current) => {
        const connection = connectionSelectionForClient({
          clientId: nextClientId,
          trailers,
          currentTrailerId: current.trailerId,
          currentMachineId: nextMachineId,
        });
        return {
          ...current,
          clientId: nextClientId,
          trailerId: connection.trailerId,
          machineId: connection.machineId || nextMachineId,
          issueTitle: result.issueTitle || current.issueTitle,
          description: result.description || current.description,
        };
      });
      setAnalysisResult({
        ...result,
        siteCandidates,
        siteDecisionRequired,
        selectedSiteId: "",
        feedback,
        appliedClientId: siteDecisionRequired ? "" : suggestedClient?.id || "",
        appliedMachineId: siteDecisionRequired ? "" : suggestedMachine?.id || "",
      });
    } catch (analysisError) {
      setGeneratorError(analysisError.message);
    } finally {
      setAnalysisBusy(false);
    }
  };

  const chooseAnalyzedSite = (siteId) => {
    const candidate = analysisResult?.siteCandidates?.find(
      (site) => site.id === siteId
    );
    if (!candidate) return;
    const matchedMachine = machines.find(
      (machine) =>
        machine.id === analysisResult?.machineId &&
        (machine.clientIds || []).includes(siteId)
    );
    setGeneratorForm((current) => {
      const connection = connectionSelectionForClient({
        clientId: siteId,
        trailers,
        currentTrailerId: current.trailerId,
        currentMachineId: matchedMachine?.id || "",
      });
      return {
        ...current,
        clientId: siteId,
        trailerId: connection.trailerId,
        machineId: connection.machineId || matchedMachine?.id || "",
      };
    });
    setAnalysisResult((current) => ({
      ...current,
      clientId: siteId,
      selectedSiteId: siteId,
      siteDecisionRequired: false,
      appliedClientId: siteId,
      appliedMachineId: matchedMachine?.id || "",
      feedback: {
        ...(current?.feedback || {}),
        client: `You selected ${candidate.name} for this work order.`,
        machine: matchedMachine
          ? `Matched ${matchedMachine.name} and attached it to the selected site.`
          : current?.machineId
          ? "The possible machine is not linked to the selected site; choose a machine manually."
          : current?.feedback?.machine,
      },
    }));
    setGeneratorError("");
  };

  const createGeneratedRequest = async () => {
    if (analysisResult?.siteDecisionRequired) {
      setGeneratorError(
        "Choose which possible site this work order belongs to before creating it."
      );
      return;
    }
    if (!generatorForm.clientId || !generatorForm.machineId) {
      setGeneratorError("Select both a client and one of that client's machines.");
      return;
    }
    if (!generatorForm.issueTitle.trim() || !generatorForm.description.trim()) {
      setGeneratorError("Add an issue title and a short description.");
      return;
    }
    // Work can be generated before responsibility is known. Always submit the
    // two worker selections as arrays (including empty arrays) so adding
    // does not fall back to a legacy/default assignment.
    const remoteAssigneeIds = optionalAssigneeIds(
      generatorForm.remoteAssigneeIds
    );
    const dispatchAssigneeIds = optionalAssigneeIds(
      generatorForm.dispatchAssigneeIds
    );
    try {
      await requestApi("/api/ops/service-requests", {
        method: "PATCH",
        body: JSON.stringify({
          action: "check_duplicate",
          clientId: generatorForm.clientId,
          machineId: generatorForm.machineId,
          issueTitle: generatorForm.issueTitle,
        }),
      });
    } catch (duplicateError) {
      setGeneratorError(duplicateError.message);
      return;
    }
    if (
      generatorMode === "generate" &&
      !window.confirm(
        "Post this work order to #dispatch now? Julie, Sean, Wilson, Alex, the selected workers, and the selected oversight managers will be notified."
      )
    ) {
      setGeneratorError(
        "The work order was not created because posting to #dispatch was not confirmed."
      );
      return;
    }
    const analysisKeys = new Set(analysisFiles.map(fileKey));
    const uploads = [
      ...analysisFiles.map((file) => ({ file, purpose: "analysis" })),
      ...referenceFiles
        .filter((file) => !analysisKeys.has(fileKey(file)))
        .map((file) => ({ file, purpose: "reference" })),
    ];
    if (uploads.length > 12) {
      setGeneratorError("Attach no more than 12 files total.");
      return;
    }
    const tooLarge = uploads.find(
      ({ file }) => Number(file.size || 0) > 250 * 1024 * 1024
    );
    const totalSize = uploads.reduce(
      (sum, { file }) => sum + Number(file.size || 0),
      0
    );
    if (tooLarge || totalSize > 500 * 1024 * 1024) {
      setGeneratorError(
        tooLarge
          ? `${tooLarge.file.name} exceeds the 250 MB file limit.`
          : "The combined attachments exceed the 500 MB limit."
      );
      return;
    }

    setGeneratorBusy(true);
    setGeneratorError("");
    const requestId = firebase
      .firestore()
      .collection("ServiceRequests")
      .doc().id;
    const uploadedRefs = [];
    let requestCreated = false;
    try {
      const fileRecords = [];
      for (let index = 0; index < uploads.length; index += 1) {
        const { file, purpose } = uploads[index];
        setGeneratorProgress(
          `Uploading ${index + 1} of ${uploads.length}: ${file.name}`
        );
        const storagePath = `ServiceRequests/${requestId}/${String(
          index + 1
        ).padStart(2, "0")}-${Date.now()}-${safeStorageName(file.name)}`;
        const storageRef = firebase.storage().ref(storagePath);
        await storageRef.put(file, {
          contentType: file.type,
          cacheControl: "public,max-age=31536000,immutable",
          customMetadata: {
            source: "magmo_ops",
            purpose,
            requestId,
          },
        });
        const downloadUrl = await storageRef.getDownloadURL();
        uploadedRefs.push(storageRef);
        let thumbnailStoragePath = "";
        let thumbnailDownloadUrl = "";
        if (
          purpose === "reference" &&
          String(file.type || "").startsWith("image/")
        ) {
          try {
            const thumbnail = await createImageThumbnail(file);
            if (thumbnail) {
              thumbnailStoragePath = `ServiceRequests/${requestId}/thumbnails/${String(
                index + 1
              ).padStart(2, "0")}-${Date.now()}.webp`;
              const thumbnailRef = firebase.storage().ref(thumbnailStoragePath);
              await thumbnailRef.put(thumbnail, {
                contentType: thumbnail.type || "image/webp",
                cacheControl: "public,max-age=31536000,immutable",
                customMetadata: {
                  source: "magmo_ops",
                  purpose: "thumbnail",
                  requestId,
                },
              });
              thumbnailDownloadUrl = await thumbnailRef.getDownloadURL();
              uploadedRefs.push(thumbnailRef);
            }
          } catch (thumbnailError) {
            console.warn("[Ops][service-request thumbnail]", thumbnailError);
          }
        }
        fileRecords.push({
          name: file.name,
          contentType: file.type,
          size: file.size,
          storagePath,
          downloadUrl,
          thumbnailStoragePath,
          thumbnailDownloadUrl,
          purpose,
        });
      }
      setGeneratorProgress(
        generatorMode === "generate"
          ? "Creating and dispatching the work order…"
          : "Adding the request to the approval queue…"
      );
      await requestApi("/api/ops/service-requests", {
        method: "POST",
        body: JSON.stringify({
          requestId,
          ...generatorForm,
          remoteAssigneeIds,
          dispatchAssigneeIds,
          files: fileRecords,
        }),
      });
      requestCreated = true;
      if (generatorMode === "generate") {
        setGeneratorProgress("Recording your overseer approval…");
        await requestApi("/api/ops/service-requests", {
          method: "PATCH",
          body: JSON.stringify({
            action: "approve_overseer",
            requestId,
            approved: true,
          }),
        });
        setGeneratorProgress("Posting the work order to Slack #dispatch…");
        await requestApi("/api/ops/service-requests", {
          method: "PATCH",
          body: JSON.stringify({
            action: "accept",
            requestId,
            clientId: generatorForm.clientId,
            remoteAssigneeIds,
            dispatchAssigneeIds,
            oversightManagerIds: generatorForm.oversightManagerIds,
          }),
        });
      }
      setGeneratorOpen(false);
      setGeneratorForm({
        ...EMPTY_GENERATOR,
        oversightManagerIds: [...defaultOversightManagerIds],
      });
      setAnalysisFiles([]);
      setReferenceFiles([]);
      setAnalysisResult(null);
      setGeneratorProgress("");
      await load(true);
    } catch (createError) {
      if (!requestCreated) {
        await Promise.all(
          uploadedRefs.map((storageRef) =>
            storageRef.delete().catch(() => undefined)
          )
        );
      }
      setGeneratorError(
        requestCreated
          ? `The request was saved, but immediate work-order creation needs a retry: ${createError.message}`
          : createError.message
      );
      setGeneratorProgress("");
      if (requestCreated) await load(true);
    } finally {
      setGeneratorBusy(false);
    }
  };

  const openDetail = async (request) => {
    setDetailLoading(true);
    setError("");
    try {
      const data = await requestApi(
        `/api/ops/service-requests?id=${encodeURIComponent(request.id)}`
      );
      setDetail(data.request);
      setChoice(data.request, choiceFor(data.request));
      setMachineChoice(data.request.id, machineChoiceFor(data.request));
      const assignment = data.request.requestedAssignment || {};
      const legacyIds = Array.isArray(assignment.assigneeIds)
        ? assignment.assigneeIds
        : [];
      setDetailRemoteAssigneeIds(
        Array.isArray(assignment.remoteAssigneeIds)
          ? assignment.remoteAssigneeIds
          : assignment.mode === "remote"
          ? legacyIds
          : []
      );
      setDetailDispatchAssigneeIds(
        Array.isArray(assignment.dispatchAssigneeIds)
          ? assignment.dispatchAssigneeIds
          : assignment.mode !== "remote"
          ? legacyIds
          : []
      );
      setDetailOversightManagerIds(
        Array.isArray(assignment.oversightManagerIds)
          && assignment.oversightManagerIds.length
          ? assignment.oversightManagerIds
          : defaultOversightManagerIds
      );
    } catch (detailError) {
      setError(detailError.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const runAction = async (request, action, body = {}) => {
    setBusyId(request.id);
    setBusyAction(action);
    setError("");
    try {
      const data = await requestApi("/api/ops/service-requests", {
        method: "PATCH",
        body: JSON.stringify({
          action,
          requestId: request.id,
          ...body,
        }),
      });
      await load(true);
      if (action === "confirm_client") {
        const next = data.request || {
          ...request,
          confirmedClient: data.client,
          machineId: data.machine?.id || request.machineId,
          machine: data.machine || request.machine,
        };
        setRequests((current) =>
          current.map((item) =>
            item.id === request.id ? { ...item, ...next } : item
          )
        );
        if (detail?.id === request.id) {
          setDetail((current) => (current ? { ...current, ...next } : current));
        }
      } else {
        setDetail(null);
      }
      return data;
    } catch (actionError) {
      setError(actionError.message);
      throw actionError;
    } finally {
      setBusyId("");
      setBusyAction("");
    }
  };

  const changeOverseerApproval = async (request, approved) => {
    setBusyId(request.id);
    setBusyAction("approve_overseer");
    setError("");
    try {
      const data = await requestApi("/api/ops/service-requests", {
        method: "PATCH",
        body: JSON.stringify({
          action: "approve_overseer",
          requestId: request.id,
          approved,
        }),
      });
      const updatedRequest = data.request || request;
      setRequests((current) =>
        current.map((item) =>
          item.id === request.id ? { ...item, ...updatedRequest } : item
        )
      );
      if (detail?.id === request.id) {
        setDetail((current) =>
          current ? { ...current, ...updatedRequest } : current
        );
      }
      await load(true);
    } catch (approvalError) {
      setError(approvalError.message);
    } finally {
      setBusyId("");
      setBusyAction("");
    }
  };

  const confirmClientAndMachine = async (request) => {
    const clientId = choiceFor(request);
    const machineId = machineChoiceFor(request);
    if (!clientId) {
      setError("Select a Client DB record before confirming the match.");
      return;
    }
    if (!machineId) {
      setError("Select one of that client's machines before confirming the match.");
      return;
    }
    await runAction(request, "confirm_client", { clientId, machineId }).catch(
      () => {}
    );
  };

  const reviewClientSuggestion = async (request, decision) => {
    const suggestion = request?.suggestedClient;
    if (!suggestion?.id) {
      setError("This request no longer has a client suggestion to review.");
      return;
    }
    const review = reviewFor(request.id);
    const isDeny = decision === "deny";
    const reason = String(review.reason || "").trim();
    if (isDeny && !reason) {
      setError("Briefly explain why the suggestion is incorrect.");
      return;
    }

    setBusyId(request.id);
    setBusyAction("review_client_suggestion");
    setError("");
    try {
      const data = await requestApi("/api/ops/service-requests", {
        method: "PATCH",
        body: JSON.stringify({
          action: "review_client_suggestion",
          requestId: request.id,
          decision: isDeny ? "deny" : "accept",
          suggestedClientId: suggestion.id,
          ...(isDeny && review.selectedClientId
            ? { selectedClientId: review.selectedClientId }
            : {}),
          ...(reason ? { reason } : {}),
        }),
      });
      const confirmedClient =
        data.client || data.request?.confirmedClient || null;
      if (confirmedClient?.id) setChoice(request, confirmedClient.id);
      else if (isDeny && review.selectedClientId) {
        setChoice(request, review.selectedClientId);
      }
      setSuggestionReviews((current) => {
        const next = { ...current };
        delete next[request.id];
        return next;
      });
      if (detail?.id === request.id) {
        if (data.request) {
          setDetail(data.request);
        } else {
          setDetail((current) =>
            current
              ? {
                  ...current,
                  ...(confirmedClient ? { confirmedClient } : {}),
                  ...(isDeny ? { suggestedClient: null } : {}),
                }
              : current
          );
        }
      }
      await load(true);
    } catch (reviewError) {
      setError(reviewError.message);
    } finally {
      setBusyId("");
      setBusyAction("");
    }
  };

  const retryClientSuggestion = async (request) => {
    setBusyId(request.id);
    setBusyAction("suggest_client");
    setError("");
    try {
      await requestApi("/api/ops/service-requests", {
        method: "PATCH",
        body: JSON.stringify({
          action: "suggest_client",
          requestId: request.id,
        }),
      });
      suggestionAttemptsRef.current.add(request.id);
      await load(true);
    } catch (retryError) {
      setError(retryError.message);
    } finally {
      setBusyId("");
      setBusyAction("");
    }
  };

  const assignmentFor = (request, useDetailSelection = false) => {
    if (useDetailSelection && detail?.id === request.id) {
      return {
        remoteAssigneeIds: detailRemoteAssigneeIds,
        dispatchAssigneeIds: detailDispatchAssigneeIds,
        oversightManagerIds: detailOversightManagerIds,
      };
    }
    const assignment = request.requestedAssignment || {};
    const legacyIds = Array.isArray(assignment.assigneeIds)
      ? assignment.assigneeIds
      : [];
    return {
      remoteAssigneeIds: Array.isArray(assignment.remoteAssigneeIds)
        ? assignment.remoteAssigneeIds
        : assignment.mode === "remote"
        ? legacyIds
        : [],
      dispatchAssigneeIds: Array.isArray(assignment.dispatchAssigneeIds)
        ? assignment.dispatchAssigneeIds
        : ["dispatch", "mixed"].includes(assignment.mode)
        ? legacyIds
        : [],
      oversightManagerIds: Array.isArray(assignment.oversightManagerIds)
        && assignment.oversightManagerIds.length
        ? assignment.oversightManagerIds
        : defaultOversightManagerIds,
    };
  };

  const accept = async (request, useDetailSelection = false) => {
    const clientId = choiceFor(request);
    const machineId = machineChoiceFor(request);
    if (
      !selectionIsConfirmedForApproval(request, clientId, machineId)
    ) {
      setError(
        "Confirm the selected Client DB and machine records before adding the work order."
      );
      return;
    }
    const assignment = assignmentFor(request, useDetailSelection);
    await runAction(request, "accept", {
      clientId,
      ...assignment,
    }).catch(() => {});
  };

  const archive = async (request) => {
    if (!window.confirm(`Archive ${request.requestNumber}?`)) return;
    await runAction(request, "archive").catch(() => {});
  };

  const deny = async (request) => {
    if (
      !window.confirm(
        `Deny and remove ${request.requestNumber}? Its uploaded files will be deleted.`
      )
    ) {
      return;
    }
    await runAction(request, "deny").catch(() => {});
  };

  const renderClientSuggestion = (request) => {
    const review = reviewFor(request.id);
    return (
      <ClientSuggestionReview
        request={request}
        clients={clients}
        review={review}
        busy={busyId === request.id}
        onAccept={() => reviewClientSuggestion(request, "accept")}
        onDeny={() =>
          updateSuggestionReview(request.id, {
            mode: "deny",
            selectedClientId: "",
            reason: "",
          })
        }
        onCancelDeny={() =>
          updateSuggestionReview(request.id, {
            mode: "",
            selectedClientId: "",
            reason: "",
          })
        }
        onChangeClient={(selectedClientId) =>
          updateSuggestionReview(request.id, { selectedClientId })
        }
        onChangeReason={(reason) =>
          updateSuggestionReview(request.id, { reason })
        }
        onSubmitDeny={() => reviewClientSuggestion(request, "deny")}
      />
    );
  };

  return (
    <div className={styles.requestsPanel}>
      <div className={styles.requestsToolbar}>
        <div>
          <span>Website intake</span>
          <h2>
            {requestView === "accepted"
              ? "Accepted requests"
              : requestView === "archived"
              ? "Archived requests"
              : "Service requests"}
          </h2>
          <p>
            Review customer details, record manager approval, then add the
            request to Slack #dispatch.
          </p>
        </div>
        <div className={styles.requestsToolbarActions}>
          <button
            type="button"
            className={styles.generateRequestButton}
            onClick={() => openGenerator("generate")}
          >
            <span aria-hidden="true">＋</span>
            Generate
          </button>
          <button
            type="button"
            className={styles.queueRequestButton}
            onClick={() => openGenerator("request")}
          >
            Request
          </button>
          <label className={styles.requestSearch}>
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search requests"
              aria-label="Search service requests"
            />
          </label>
          <div className={styles.requestViewTabs} role="tablist" aria-label="Request history view">
            {[
              ["requests", "Requests"],
              ["accepted", "Accepted"],
              ["archived", "Archive"],
            ].map(([value, label]) => (
              <button
                type="button"
                role="tab"
                aria-selected={requestView === value}
                className={requestView === value ? styles.archiveActive : ""}
                onClick={() => {
                  setRequestView(value);
                  setQuery("");
                  setDetail(null);
                }}
                key={value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? <div className={styles.errorBanner}>{error}</div> : null}

      <div className={styles.requestList}>
        {loading ? (
          [0, 1, 2].map((item) => (
            <div className={styles.requestSkeleton} key={item} />
          ))
        ) : filtered.length ? (
          filtered.map((request) => (
            <article className={styles.requestCard} key={request.id}>
              <button
                type="button"
                className={styles.requestCardTop}
                onClick={() => openDetail(request)}
                disabled={detailLoading}
                aria-label={`Open ${request.requestNumber} details`}
              >
                <div>
                  <div className={styles.requestEyebrow}>
                    <span>{request.requestNumber}</span>
                    <span>{formatDate(request.createdAt, true)}</span>
                    {request.source === "magmo_ops" ? (
                      <span className={styles.internalRequest}>
                        Generated in Ops
                      </span>
                    ) : null}
                    {request.status === "accepted_pending_sync" &&
                    request.slack?.channel &&
                    request.slack?.ts ? (
                      <span className={styles.syncWarning}>Needs sync retry</span>
                    ) : null}
                  </div>
                  <h3>{request.companyName}</h3>
                  <p>{request.issueTitle}</p>
                </div>
                <span
                  className={styles.requestUrgency}
                  data-urgency={request.urgency}
                >
                  {request.urgencyLabel}
                </span>
              </button>

              <div className={styles.requestBrief}>
                <div>
                  <span>Equipment location</span>
                  <strong>{request.locationText}</strong>
                </div>
                <div>
                  <span>Requested date</span>
                  <strong>{formatDate(request.requestedServiceDate)}</strong>
                </div>
                <div>
                  <span>Equipment</span>
                  <strong>
                    {request.machine?.label ||
                      [request.manufacturer, request.modality]
                        .filter(Boolean)
                        .join(" · ")}
                  </strong>
                </div>
                <div>
                  <span>Attachments</span>
                  <strong>{request.fileCount || 0}</strong>
                </div>
              </div>

              {request.thumbnails?.length ? (
                <div className={styles.requestThumbnails}>
                  {request.thumbnails.map((thumbnail, index) => (
                    <button
                      type="button"
                      key={`${thumbnail.url}-${index}`}
                      onClick={() => openDetail(request)}
                      aria-label={`Open attachment ${index + 1} for ${
                        request.requestNumber
                      }`}
                    >
                      <img
                        src={thumbnail.url}
                        alt={thumbnail.name || "Request attachment"}
                        loading="lazy"
                      />
                    </button>
                  ))}
                  {request.referenceImageCount > request.thumbnails.length ? (
                    <span>
                      +{request.referenceImageCount - request.thumbnails.length}
                    </span>
                  ) : null}
                </div>
              ) : null}

              {requestView === "requests" ? (
                request.suggestedClient && !request.confirmedClient ? (
                  renderClientSuggestion(request)
                ) : (
                  <div className={styles.clientMatch}>
                    <div>
                      <span className={styles.aiLabel}>OPS AI CLIENT MATCH</span>
                      {request.confirmedClient ? (
                        <>
                          <strong className={styles.confirmedMatch}>
                            Confirmed: {request.confirmedClient.name}
                          </strong>
                          <small>
                            {request.confirmedClient.location}
                            {request.machine?.label
                              ? ` · Machine: ${request.machine.label}`
                              : ""}
                          </small>
                        </>
                      ) : request.clientMatchError ? (
                        <>
                          <strong>Magmo could not finish this match.</strong>
                          <small>{request.clientMatchError}</small>
                        </>
                      ) : request.clientMatchStatus === "pending" ? (
                        <>
                          <strong>Matching against the Client DB…</strong>
                          <small>
                            Magmo is checking the company, equipment address,
                            and machine records.
                          </small>
                        </>
                      ) : (
                        <>
                          <strong>No confident match — select the client.</strong>
                          <small>
                            A manual selection is required before this request
                            can be added.
                          </small>
                        </>
                      )}
                    </div>
                    <div className={styles.clientConfirmControls}>
                      {request.clientMatchError ||
                      request.clientMatchStatus === "no_match" ? (
                        <button
                          type="button"
                          className={styles.clientRetryButton}
                          disabled={busyId === request.id}
                          onClick={() => retryClientSuggestion(request)}
                        >
                          {busyId === request.id
                            ? "Checking…"
                            : "Try Magmo again"}
                        </button>
                      ) : null}
                      <div className={styles.requestRecordSelectors}>
                        <RecordSearchField
                          label="Client DB record"
                          kind="client"
                          note="Search by client name or address"
                          options={clients}
                          value={choiceFor(request)}
                          onChange={(clientId) => setChoice(request, clientId)}
                          disabled={busyId === request.id}
                          placeholder="Search clients…"
                          emptyMessage="No matching client records"
                        />
                        <RecordSearchField
                          label="Machine"
                          kind="machine"
                          note={
                            choiceFor(request)
                              ? "Only machines linked to this client"
                              : "Select a client first"
                          }
                          options={machinesForClient(choiceFor(request))}
                          value={machineChoiceFor(request)}
                          onChange={(machineId) =>
                            setMachineChoice(request.id, machineId)
                          }
                          disabled={busyId === request.id || !choiceFor(request)}
                          placeholder="Search this client's machines…"
                          emptyMessage="No linked machines match this search"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={
                          busyId === request.id ||
                          !choiceFor(request) ||
                          !machineChoiceFor(request) ||
                          selectionIsConfirmedForApproval(
                            request,
                            choiceFor(request),
                            machineChoiceFor(request)
                          )
                        }
                        onClick={() => confirmClientAndMachine(request)}
                      >
                        {selectionIsConfirmedForApproval(
                          request,
                          choiceFor(request),
                          machineChoiceFor(request)
                        )
                          ? "Client & machine confirmed"
                          : "Confirm client & machine"}
                      </button>
                    </div>
                  </div>
                )
              ) : null}

              {requestView === "requests" ? (
                <OverseerApprovalGate
                  request={request}
                  viewer={viewer}
                  compact
                  clientReady={selectionIsConfirmedForApproval(
                    request,
                    choiceFor(request),
                    machineChoiceFor(request)
                  )}
                  busy={
                    busyId === request.id && busyAction === "approve_overseer"
                  }
                  onChange={(approved) =>
                    changeOverseerApproval(request, approved)
                  }
                />
              ) : null}

              <div className={styles.requestActions}>
                <button
                  type="button"
                  className={styles.requestDetailButton}
                  onClick={() => openDetail(request)}
                  disabled={detailLoading}
                >
                  {detailLoading ? "Loading…" : "Details"}
                </button>
                {requestView === "requests" ? (
                  <>
                    <button
                      type="button"
                      className={styles.requestAcceptButton}
                      onClick={() => accept(request)}
                      disabled={
                        busyId === request.id ||
                        !selectionIsConfirmedForApproval(
                          request,
                          choiceFor(request),
                          machineChoiceFor(request)
                        ) ||
                        !hasOverseerApproval(request)
                      }
                      title={
                        !selectionIsConfirmedForApproval(
                          request,
                          choiceFor(request),
                          machineChoiceFor(request)
                        )
                          ? "Confirm the Client DB and machine records before adding this work order."
                          : !hasOverseerApproval(request)
                          ? "An admin must approve this request before it can be added."
                          : "Add this work order and post it to Slack #dispatch."
                      }
                    >
                      {busyId === request.id && busyAction === "accept"
                        ? "Adding…"
                        : request.status === "accepted_pending_sync" &&
                          request.slack?.channel &&
                          request.slack?.ts
                        ? "Retry Add"
                        : hasOverseerApproval(request)
                        ? "Add work order"
                        : "Approval required"}
                    </button>
                    <button
                      type="button"
                      onClick={() => archive(request)}
                      disabled={busyId === request.id}
                    >
                      Archive
                    </button>
                    <button
                      type="button"
                      className={styles.requestDenyButton}
                      onClick={() => deny(request)}
                      disabled={busyId === request.id}
                    >
                      Deny
                    </button>
                  </>
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <div className={styles.requestsEmpty}>
            <span>✓</span>
            <h3>
              {requestView === "accepted"
                ? "No accepted requests"
                : requestView === "archived"
                ? "No archived requests"
                : "The intake queue is clear"}
            </h3>
            <p>
              {query
                ? "No requests match this search."
                : requestView === "accepted"
                ? "Requests will appear here after their work orders are created."
                : requestView === "archived"
                ? "Manually archived requests will be stored here."
                : "New website service requests will appear here automatically."}
            </p>
          </div>
        )}
      </div>

      {generatorOpen ? (
        <div
          className={styles.requestModalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.currentTarget === event.target &&
              !generatorBusy &&
              !analysisBusy
            ) {
              setGeneratorOpen(false);
            }
          }}
        >
          <section
            className={[styles.requestModal, styles.generatorModal].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-labelledby="generate-request-title"
          >
            <div className={styles.requestModalHeader}>
              <div>
                <span>
                  {generatorMode === "generate"
                    ? "IMMEDIATE WORK ORDER"
                    : "INTERNAL SERVICE REQUEST"}
                </span>
                <h2 id="generate-request-title">
                  {generatorMode === "generate"
                    ? "Generate work order"
                    : "Request work order"}
                </h2>
                <p>
                  {generatorMode === "generate"
                    ? "Build the work order and post it immediately to Slack #dispatch."
                    : "Build a request from Magmo records and send it to the approval queue."}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close request generator"
                disabled={generatorBusy || analysisBusy}
                onClick={() => setGeneratorOpen(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.requestModalBody}>
              <div className={styles.generatorQueueNotice}>
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>
                    {generatorMode === "generate"
                      ? "Creates immediately"
                      : "Approval remains required"}
                  </strong>
                  <p>
                    {generatorMode === "generate"
                      ? "No separate review step is required. You can still inspect the saved details from the request list."
                      : "This creates a pending request only. An admin must approve it before anyone can add it to Slack #dispatch."}
                  </p>
                </div>
              </div>

              {generatorError ? (
                <div className={styles.requestProcessingError}>
                  <strong>Check the request</strong>
                  <span>{generatorError}</span>
                </div>
              ) : null}

              <section className={styles.generatorSection}>
                <div className={styles.generatorSectionHeading}>
                  <span>01</span>
                  <div>
                    <h3>Client and machine</h3>
                    <p>
                      Choose records manually, or let the analyzer match them
                      from the issue text and images.
                    </p>
                  </div>
                </div>
                <div className={styles.generatorGrid}>
                  <RecordSearchField
                    label="Client"
                    kind="client"
                    note={`${clients.length} client records · Search by name or location`}
                    options={clients}
                    value={generatorForm.clientId}
                    onChange={(id) => updateGenerator("clientId", id)}
                    disabled={generatorBusy || analysisBusy}
                    placeholder="Search clients…"
                    emptyMessage="No matching clients"
                    feedback={analysisResult?.feedback?.client}
                    feedbackStatus={
                      analysisResult?.appliedClientId ? "found" : "missing"
                    }
                  />
                  <RecordSearchField
                    label="Trailer"
                    kind="trailer"
                    note={
                      generatorClient
                        ? generatorTrailers.length === 1
                          ? `Auto-linked to ${generatorClient.name}`
                          : `${generatorTrailers.length} currently linked to ${generatorClient.name}`
                        : "Selecting a trailer also selects its client"
                    }
                    options={generatorForm.clientId ? generatorTrailers : trailers}
                    value={generatorForm.trailerId}
                    onChange={(id) => updateGenerator("trailerId", id)}
                    disabled={generatorBusy || analysisBusy}
                    placeholder="Search trailers…"
                    emptyMessage={
                      generatorForm.clientId
                        ? "No current trailer is linked to this client"
                        : "No linked trailers found"
                    }
                  />
                  <RecordSearchField
                    label="Machine"
                    kind="machine"
                    note={
                      generatorClient
                        ? `${generatorMachines.length} linked to ${generatorClient.name}`
                        : "Choose a client to load its machines"
                    }
                    options={generatorMachines}
                    value={generatorForm.machineId}
                    onChange={(id) => updateGenerator("machineId", id)}
                    disabled={
                      !generatorForm.clientId || generatorBusy || analysisBusy
                    }
                    placeholder="Search this client's machines…"
                    emptyMessage={
                      generatorMachines.length
                        ? "No matching machines for this client"
                        : "No machines are linked to this client"
                    }
                    feedback={analysisResult?.feedback?.machine}
                    feedbackStatus={
                      analysisResult?.appliedMachineId ? "found" : "missing"
                    }
                  />
                </div>
                <SiteCandidateChooser
                  candidates={analysisResult?.siteCandidates}
                  selectedId={analysisResult?.selectedSiteId}
                  onSelect={chooseAnalyzedSite}
                  disabled={analysisBusy || generatorBusy}
                />
                {generatorForm.clientId ? (
                  <SystemNotesPreview
                    clientId={generatorForm.clientId}
                    machineId={generatorForm.machineId}
                    title={generatorForm.machineId ? "Selected system history" : "Selected client history"}
                  />
                ) : null}
              </section>

              <section className={styles.generatorSection}>
                <div className={styles.generatorSectionHeading}>
                  <span>02</span>
                  <div>
                    <h3>Report status</h3>
                    <p>Uses the same four choices as the AIS intake form.</p>
                  </div>
                </div>
                <div className={styles.generatorStatusOptions}>
                  {REPORT_STATUS_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      data-selected={generatorForm.urgency === option.value}
                      data-status={option.value}
                    >
                      <input
                        type="radio"
                        name="generated-request-status"
                        value={option.value}
                        checked={generatorForm.urgency === option.value}
                        onChange={() =>
                          updateGenerator("urgency", option.value)
                        }
                      />
                      <strong>{option.label}</strong>
                      <small>{option.note}</small>
                    </label>
                  ))}
                </div>
              </section>

              <section className={styles.generatorSection}>
                <div className={styles.generatorSectionHeading}>
                  <span>03</span>
                  <div>
                    <h3>Ownership</h3>
                    <p>
                      Optional. Add remote support, field dispatch, or both, or
                      leave this blank so ownership can be assigned later.
                    </p>
                  </div>
                </div>
                <div className={styles.assignmentSearchGrid}>
                  <AssigneeSearchField
                    label="Remote support (optional)"
                    note="Leave blank to assign remote responsibility later."
                    tone="remote"
                    options={assignees}
                    selectedIds={generatorForm.remoteAssigneeIds}
                    onChange={(ids) =>
                      updateGenerator("remoteAssigneeIds", ids)
                    }
                  />
                  <AssigneeSearchField
                    label="Field dispatch (optional)"
                    note="Leave blank when nobody has been dispatched yet."
                    tone="dispatch"
                    options={assignees}
                    selectedIds={generatorForm.dispatchAssigneeIds}
                    onChange={(ids) =>
                      updateGenerator("dispatchAssigneeIds", ids)
                    }
                  />
                  <AssigneeSearchField
                    label="Manager oversight"
                    note="Adds the selected oversight managers to the dispatch post."
                    tone="oversight"
                    options={assignees}
                    selectedIds={generatorForm.oversightManagerIds}
                    onChange={(ids) =>
                      updateGenerator("oversightManagerIds", ids)
                    }
                  />
                </div>
              </section>

              <section className={styles.generatorSection}>
                <div className={styles.generatorSectionHeading}>
                  <span>04</span>
                  <div>
                    <h3>Issue</h3>
                    <p>
                      Enter the text you have, then let AI refine it while also
                      using any supplied images. Everything remains editable.
                    </p>
                  </div>
                </div>
                <div className={styles.generatorIssueFields}>
                  <label>
                    Issue title
                    <input
                      value={generatorForm.issueTitle}
                      maxLength={120}
                      disabled={generatorBusy || analysisBusy}
                      onChange={(event) =>
                        updateGenerator("issueTitle", event.target.value)
                      }
                      placeholder="Client or machine — short symptom"
                    />
                    <AnalysisFeedback
                      note={analysisResult?.feedback?.issueTitle}
                      status={analysisResult?.issueTitle ? "found" : "missing"}
                    />
                    <small>{generatorForm.issueTitle.length}/120</small>
                  </label>
                  <label>
                    Description
                    <textarea
                      value={generatorForm.description}
                      maxLength={5000}
                      rows={5}
                      disabled={generatorBusy || analysisBusy}
                      onChange={(event) =>
                        updateGenerator("description", event.target.value)
                      }
                      placeholder="Briefly explain what is happening and the current operational impact."
                    />
                    <AnalysisFeedback
                      note={analysisResult?.feedback?.description}
                      status={analysisResult?.description ? "found" : "missing"}
                    />
                  </label>
                </div>
              </section>

              <section className={styles.generatorSection}>
                <div className={styles.generatorSectionHeading}>
                  <span>05</span>
                  <div>
                    <h3>Images and supporting files</h3>
                    <p>
                      AI uses the typed issue plus eligible images from both
                      columns. Reference attachments are also posted to Slack.
                    </p>
                  </div>
                </div>
                <div className={styles.generatorUploadColumns}>
                  <div className={styles.generatorUploadPanel}>
                    <div>
                      <span className={styles.aiLabel}>AI ANALYSIS</span>
                      <h4>Analyze text and images</h4>
                      <p>
                        Matches client and machine records, connects the current
                        trailer when there is one clear match, then drafts the
                        issue. Dedicated analysis images are not posted to Slack.
                      </p>
                    </div>
                    <label className={styles.generatorDropzone}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={analysisBusy || generatorBusy}
                        onChange={(event) => {
                          addAnalysisFiles(event.target.files);
                          event.target.value = "";
                        }}
                      />
                      <strong>Choose images to analyze</strong>
                      <small>PNG, JPG, WEBP, GIF, or phone photos</small>
                    </label>
                    {analysisFiles.length ? (
                      <div className={styles.generatorFiles}>
                        {analysisFiles.map((file) => (
                          <SelectedFile
                            file={file}
                            purpose="analysis"
                            key={fileKey(file)}
                            disabled={analysisBusy || generatorBusy}
                            onRemove={() => {
                              setAnalysisFiles((current) =>
                                current.filter(
                                  (entry) => fileKey(entry) !== fileKey(file)
                                )
                              );
                              setAnalysisResult(null);
                            }}
                          />
                        ))}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className={styles.analyzeImagesButton}
                      disabled={
                        analysisBusy ||
                        generatorBusy ||
                        (!hasAnalysisText && !analysisInputImages.length)
                      }
                      onClick={analyzeSelectedImages}
                    >
                      {analysisBusy
                        ? "Analyzing text and images…"
                        : "Analyze text and images"}
                    </button>
                    {analysisResult ? (
                      <div className={styles.analysisResult}>
                        <strong>
                          Draft ready ·{" "}
                          {Math.round(
                            Number(analysisResult.confidence || 0) * 100
                          )}
                          % confidence
                        </strong>
                        <span>
                          {analysisResult.needsReview
                            ? "Review the field notes before creating."
                            : `${analysisResult.analyzedImageCount || 0} image${
                                Number(analysisResult.analyzedImageCount || 0) === 1
                                  ? ""
                                  : "s"
                              } checked; supported fields were filled above.`}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className={styles.generatorUploadPanel}>
                    <div>
                      <span>REFERENCE ATTACHMENTS</span>
                      <h4>Attach to the work order</h4>
                      <p>
                        Images are also considered during AI analysis. PDFs and
                        videos stay as supporting evidence for the Slack thread.
                      </p>
                    </div>
                    <label className={styles.generatorDropzone}>
                      <input
                        type="file"
                        accept="image/*,video/*,application/pdf"
                        multiple
                        disabled={analysisBusy || generatorBusy}
                        onChange={(event) => {
                          addReferenceFiles(event.target.files);
                          event.target.value = "";
                        }}
                      />
                      <strong>Choose reference files</strong>
                      <small>Images, PDF, or video · 250 MB per file</small>
                    </label>
                    {referenceFiles.length ? (
                      <div className={styles.generatorFiles}>
                        {referenceFiles.map((file) => (
                          <SelectedFile
                            file={file}
                            purpose="reference"
                            key={fileKey(file)}
                            disabled={analysisBusy || generatorBusy}
                            onRemove={() => {
                              setReferenceFiles((current) =>
                                current.filter(
                                  (entry) => fileKey(entry) !== fileKey(file)
                                )
                              );
                              setAnalysisResult(null);
                            }}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className={styles.generatorFooter}>
                <div>
                  <strong>
                    {analysisFiles.length + referenceFiles.length} file
                    {analysisFiles.length + referenceFiles.length === 1
                      ? ""
                      : "s"}{" "}
                    selected
                  </strong>
                  <span>
                    {generatorProgress ||
                      (analysisResult?.siteDecisionRequired
                        ? "Choose one of the possible sites above to continue."
                        : generatorMode === "generate"
                        ? "The work order will be created immediately."
                        : "The request will appear at the top of this approval queue.")}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={
                    generatorBusy ||
                    analysisBusy ||
                    analysisResult?.siteDecisionRequired
                  }
                  onClick={createGeneratedRequest}
                >
                  {analysisResult?.siteDecisionRequired
                    ? "Choose a site above"
                    : generatorBusy
                    ? generatorMode === "generate"
                      ? "Creating work order…"
                      : "Creating request…"
                    : generatorMode === "generate"
                    ? "Generate work order"
                    : "Request approval"}
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {detail ? (
        <div
          className={styles.requestModalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setDetail(null);
          }}
        >
          <section
            className={styles.requestModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-detail-title"
          >
            <div className={styles.requestModalHeader}>
              <div>
                <span>{detail.requestNumber}</span>
                <h2 id="request-detail-title">{detail.issueTitle}</h2>
                <p>
                  {detail.companyName} · {formatDate(detail.createdAt, true)}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close request details"
                onClick={() => setDetail(null)}
              >
                ×
              </button>
            </div>

            <div className={styles.requestModalBody}>
              {detail.processing?.error ? (
                <div className={styles.requestProcessingError}>
                  <strong>Adding the work order needs a retry</strong>
                  <span>{detail.processing.error}</span>
                </div>
              ) : null}

              <section className={styles.requestDetailSection}>
                <h3>Company &amp; equipment location</h3>
                <div className={styles.requestDetailGrid}>
                  <DetailRow label="Company" value={detail.companyName} />
                  <DetailRow
                    label="Request source"
                    value={
                      detail.source === "magmo_ops"
                        ? "Generated in Magmo Ops"
                        : "AIS website intake"
                    }
                  />
                  <DetailRow
                    label="Requested service date"
                    value={formatDate(detail.requestedServiceDate)}
                  />
                  <DetailRow
                    label="Equipment address"
                    value={detail.locationText}
                    wide
                  />
                </div>
              </section>

              <section className={styles.requestDetailSection}>
                <h3>Equipment &amp; operational impact</h3>
                <div className={styles.requestDetailGrid}>
                  <DetailRow label="Urgency" value={detail.urgencyLabel} />
                  <DetailRow label="Manufacturer" value={detail.manufacturer} />
                  <DetailRow label="Modality" value={detail.modality} />
                  <DetailRow label="System / model" value={detail.systemModel} />
                  {detail.machine?.label ? (
                    <DetailRow
                      label="Magmo machine"
                      value={detail.machine.label}
                      wide
                    />
                  ) : null}
                  {detail.trailer?.name ? (
                    <DetailRow
                      label="Magmo trailer"
                      value={`${detail.trailer.name}${
                        detail.trailer.clientName
                          ? ` — ${detail.trailer.clientName}`
                          : ""
                      }`}
                      wide
                    />
                  ) : null}
                  <DetailRow
                    label="Equipment operational"
                    value={displayValue(detail.equipmentOperational)}
                  />
                  <DetailRow
                    label="Operational impact"
                    value={displayValue(detail.operationalImpact)}
                  />
                  <DetailRow
                    label="Remote access"
                    value={displayValue(detail.remoteAccess)}
                  />
                  <DetailRow
                    label="Timing / access notes"
                    value={detail.requestedTiming}
                  />
                </div>
              </section>

              <section className={styles.requestDetailSection}>
                <h3>Contact</h3>
                <div className={styles.requestDetailGrid}>
                  <DetailRow label="Name" value={detail.contactName} />
                  <DetailRow label="Phone" value={detail.phone} />
                  <DetailRow label="Email" value={detail.email} />
                  <DetailRow
                    label="Purchase order"
                    value={detail.purchaseOrderNumber}
                  />
                </div>
              </section>

              <section className={styles.requestDetailSection}>
                <h3>Issue description</h3>
                <p className={styles.requestDescription}>{detail.description}</p>
              </section>

              {choiceFor(detail) ? (
                <SystemNotesPreview
                  clientId={choiceFor(detail)}
                  machineId={machineChoiceFor(detail)}
                  title="Notes to review before adding"
                />
              ) : null}

              {detail.files?.length ? (
                <section className={styles.requestDetailSection}>
                  <h3>Pictures &amp; attachments</h3>
                  <div className={styles.requestFiles}>
                    {detail.files.map((file) => (
                      <FilePreview file={file} key={`${file.index}-${file.name}`} />
                    ))}
                  </div>
                </section>
              ) : null}

              {requestView === "requests" &&
              detail.suggestedClient &&
              !detail.confirmedClient
                ? renderClientSuggestion(detail)
                : null}

              {requestView === "requests" ? (
                <section
                  className={[
                    styles.requestDetailSection,
                    styles.requestAcceptance,
                  ].join(" ")}
                >
                  <div>
                    <span>ADD TO DISPATCH</span>
                    <h3>Client and responsibility</h3>
                    <p>
                      Optionally add remote support, field dispatch, or both.
                      Leave both blank to create an unassigned work order.
                    </p>
                  </div>
                  <div className={styles.requestDetailRecordSelectors}>
                    <div className={styles.requestRecordSelectors}>
                      <RecordSearchField
                        label="Client DB record"
                        kind="client"
                        note="Search by client name or address"
                        options={clients}
                        value={choiceFor(detail)}
                        onChange={(clientId) => setChoice(detail, clientId)}
                        disabled={busyId === detail.id}
                        placeholder="Search clients…"
                        emptyMessage="No matching client records"
                      />
                      <RecordSearchField
                        label="Machine"
                        kind="machine"
                        note={
                          choiceFor(detail)
                            ? "Only machines linked to this client"
                            : "Select a client first"
                        }
                        options={machinesForClient(choiceFor(detail))}
                        value={machineChoiceFor(detail)}
                        onChange={(machineId) =>
                          setMachineChoice(detail.id, machineId)
                        }
                        disabled={busyId === detail.id || !choiceFor(detail)}
                        placeholder="Search this client's machines…"
                        emptyMessage="No linked machines match this search"
                      />
                    </div>
                    <button
                      type="button"
                      className={styles.confirmRecordsButton}
                      disabled={
                        busyId === detail.id ||
                        !choiceFor(detail) ||
                        !machineChoiceFor(detail) ||
                        selectionIsConfirmedForApproval(
                          detail,
                          choiceFor(detail),
                          machineChoiceFor(detail)
                        )
                      }
                      onClick={() => confirmClientAndMachine(detail)}
                    >
                      {selectionIsConfirmedForApproval(
                        detail,
                        choiceFor(detail),
                        machineChoiceFor(detail)
                      )
                        ? "Client & machine confirmed"
                        : "Confirm client & machine"}
                    </button>
                  </div>
                  <OverseerApprovalGate
                    request={detail}
                    viewer={viewer}
                    clientReady={selectionIsConfirmedForApproval(
                      detail,
                      choiceFor(detail),
                      machineChoiceFor(detail)
                    )}
                    busy={
                      busyId === detail.id &&
                      busyAction === "approve_overseer"
                    }
                    onChange={(approved) =>
                      changeOverseerApproval(detail, approved)
                    }
                  />
                  <div className={styles.assignmentSearchGrid}>
                    <AssigneeSearchField
                      label="Remote support"
                      note="Adds the intended remote engineers to the dispatch post."
                      tone="remote"
                      options={assignees}
                      selectedIds={detailRemoteAssigneeIds}
                      onChange={setDetailRemoteAssigneeIds}
                    />
                    <AssigneeSearchField
                      label="Field dispatch"
                      note="Adds the intended field engineers to the dispatch post."
                      tone="dispatch"
                      options={assignees}
                      selectedIds={detailDispatchAssigneeIds}
                      onChange={setDetailDispatchAssigneeIds}
                    />
                    <AssigneeSearchField
                      label="Manager oversight"
                      note="Adds the selected oversight managers to the dispatch post."
                      tone="oversight"
                      options={assignees}
                      selectedIds={detailOversightManagerIds}
                      onChange={setDetailOversightManagerIds}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.modalAcceptButton}
                    disabled={
                      busyId === detail.id ||
                      !selectionIsConfirmedForApproval(
                        detail,
                        choiceFor(detail),
                        machineChoiceFor(detail)
                      ) ||
                      !hasOverseerApproval(detail)
                    }
                    onClick={() => accept(detail, true)}
                    title={
                      !selectionIsConfirmedForApproval(
                        detail,
                        choiceFor(detail),
                        machineChoiceFor(detail)
                      )
                        ? "Confirm the Client DB and machine records before adding this work order."
                        : !hasOverseerApproval(detail)
                        ? "An admin must approve this request before it can be added."
                        : "Add this work order and post it to Slack #dispatch."
                    }
                  >
                    {busyId === detail.id && busyAction === "accept"
                      ? "Adding to #dispatch…"
                      : !hasOverseerApproval(detail)
                      ? "Overseer approval required"
                      : detailRemoteAssigneeIds.length &&
                        detailDispatchAssigneeIds.length
                      ? "Add combined work order"
                      : detailRemoteAssigneeIds.length
                      ? "Add remote work order"
                      : detailDispatchAssigneeIds.length
                      ? "Add dispatch work order"
                      : "Add unassigned work order"}
                  </button>
                </section>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
