import Head from "next/head";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import firebase from "../../context/Firebase";
import { useAuth } from "../../context/AuthUserContext";
import styles from "../../styles/Ops.module.css";
import LoggedIn from "../LoggedIn";
import { USER_ROLES } from "../../utils/authAccess";
import { useSingleTabPolling } from "../../utils/useSingleTabPolling";
import ServiceRequestsPanel from "../../components/Ops/ServiceRequestsPanel";
import ClientSystemNotesModal from "../../components/Ops/ClientSystemNotesModal";
const {
  bestOpsSearchTab,
  buildOpsSearchResultKey,
} = require("../../lib/ops/searchTabs.cjs");
const {
  buildInventoryConnectionPlan,
} = require("../../lib/ops/inventoryConnections.cjs");
const { splitLatestSnapshot } = require("../../lib/ops/snapshotHistory.cjs");
const {
  sortActiveWorkOrders,
  supportModeForWorkOrder,
} = require("../../lib/ops/dispatchQueue.cjs");
const {
  connectionSelectionForClient,
  connectionSelectionForTrailer,
  trailersForClient,
} = require("../../lib/ops/trailerClientLinks.cjs");

function Icon({ name, size = 18 }) {
  const paths = {
    grip: (
      <>
        <circle cx="8" cy="7" r="1.5" />
        <circle cx="16" cy="7" r="1.5" />
        <circle cx="8" cy="12" r="1.5" />
        <circle cx="16" cy="12" r="1.5" />
        <circle cx="8" cy="17" r="1.5" />
        <circle cx="16" cy="17" r="1.5" />
      </>
    ),
    refresh: (
      <path d="M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6" />
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="m8 14 4-4 4 4" />,
    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="m11 13 8-8" />
        <path d="M19 13v6H5V5h6" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m6 14 .8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14Z" />
      </>
    ),
    back: <path d="m15 18-6-6 6-6" />,
    history: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    package: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7M12 11v10" />
      </>
    ),
    notes: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    thumbUp: <path d="M7 10v10H4V10h3Zm3 10V9l4-6 2 1v5h4l-1 11h-9Z" />,
    neutral: <path d="M6 12h12" />,
    thumbDown: <path d="M7 14V4H4v10h3Zm3-10v11l4 6 2-1v-5h4L19 4h-9Z" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "grip" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function formatRelativeTime(value) {
  const timestamp = Date.parse(value || "");
  if (!Number.isFinite(timestamp)) return "No activity yet";
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

function formatExactTime(value) {
  const timestamp = Date.parse(value || "");
  if (!Number.isFinite(timestamp)) return "Time unavailable";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

const WORKFLOW_LABELS = {
  unassigned: "Unassigned",
  active: "Active",
  remote: "Remote",
  scheduled: "Scheduled",
  on_hold: "On hold",
  inactive: "Inactive",
  in_progress: "Active",
  service_complete: "Service complete",
  done: "Done",
  completed: "Done",
  closed: "Closed",
};

const WORKFLOW_STAGE_OPTIONS = [
  ["unassigned", "Unassigned"],
  ["remote", "Remote"],
  ["active", "Active"],
  ["scheduled", "Scheduled"],
  ["on_hold", "On hold"],
  ["inactive", "Inactive"],
  ["service_complete", "Service complete"],
  ["done", "Done"],
  ["closed", "Closed"],
];

function formatStageDuration(milliseconds) {
  const totalMinutes = Math.max(0, Math.floor(Number(milliseconds || 0) / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days) return `${days}d ${hours}h`;
  if (hours) return `${hours}h ${minutes}m`;
  return `${Math.max(1, minutes)}m`;
}

function assignmentNames(assignees) {
  return (assignees || []).map((entry) => entry.name).filter(Boolean).join(", ") || "Unassigned";
}

function initials(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function avatarTone(name) {
  const tones = ["violet", "blue", "teal", "amber", "rose"];
  const hash = Array.from(String(name || "")).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );
  return tones[hash % tones.length];
}

const PRIORITY_TIER_CONFIG = [
  {
    id: "hard_down",
    label: "Hard down",
    level: "High",
    description: "System down or immediate operational impact",
  },
  {
    id: "in_progress",
    label: "ASAP",
    level: "Urgent",
    description: "Prompt attention is needed while work remains active",
  },
  {
    id: "needs_scheduled",
    label: "Soon",
    level: "Planned",
    description: "Coordinate a date, technician, parts, or delivery",
  },
  {
    id: "anytime",
    label: "Anytime",
    level: "Low",
    description: "No immediate deadline or operational interruption",
  },
];
function generatedTierLabel(tier, label) {
  const base = String(label || "").replace(/\s*\(Generated\)\s*$/i, "").trim();
  if (base) return base;
  return String(tier || "")
    .replace(/^generated_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildPriorityTierConfig(items = []) {
  const generated = new Map();
  items.forEach((item) => {
    const tier = String(item.priorityTier || "");
    const isGenerated = tier.startsWith("generated_");
    if (!isGenerated || generated.has(tier)) return;
    const order = Number.isFinite(Number(item.priorityOrder))
      ? Math.max(0, Math.min(3, Number(item.priorityOrder)))
      : 2;
    generated.set(tier, {
      id: tier,
      label: generatedTierLabel(tier, item.priorityLabel),
      level: "Generated",
      description: "AI-created category learned from operational context",
      generated: true,
      order,
    });
  });
  return [
    ...PRIORITY_TIER_CONFIG.map((tier, order) => ({ ...tier, order })),
    ...generated.values(),
  ].sort(
    (left, right) =>
      left.order - right.order ||
      Number(Boolean(left.generated)) - Number(Boolean(right.generated)) ||
      left.label.localeCompare(right.label)
  );
}

function StatusBadge({ status }) {
  const normalized = WORKFLOW_LABELS[status] ? status : "unassigned";
  return (
    <span
      className={[
        styles.statusBadge,
        styles["status_" + normalized],
      ].join(" ")}
    >
      <i />
      {WORKFLOW_LABELS[normalized]}
    </span>
  );
}

async function opsRequest(path, options = {}) {
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
    throw new Error(body.error || "Ops could not be reached.");
  }
  return body;
}

function EmptyState({ stage, searching, supportMode = "" }) {
  const copy = {
    unassigned: {
      title: "No unassigned work orders",
      detail: "New work orders waiting for an active owner will appear here.",
    },
    active: {
      title: "The active queue is clear",
      detail: "Assigned work orders currently being handled will appear here.",
    },
    remote: {
      title: "No active remote work",
      detail:
        "Unassigned BlueFolder work moves here when Slack shows someone actively working remotely.",
    },
    scheduled: {
      title: "No scheduled work orders",
      detail: "Work planned for tomorrow or later will appear here.",
    },
    on_hold: {
      title: "Nothing is on hold",
      detail: "Orders waiting on a part, customer, approval, or other dependency will appear here.",
    },
    inactive: {
      title: "No inactive work orders",
      detail: "Orders with seven days of no recorded activity will appear here.",
    },
    service_complete: {
      title: "Nothing is service complete",
      detail: "Work orders move here when !complete is used in Slack.",
    },
    done: {
      title: "Nothing is done yet",
      detail:
        "Finalized work orders remain here after !done saves the closeout. Temporary chat logs are retained until Closed.",
    },
    closed: {
      title: "No closed work orders",
      detail: "Archived work orders will remain available here for reference.",
    },
  }[stage] || {};
  const activeSupportCopy = {
    remote: {
      title: "No remote work is active",
      detail: "Work orders being troubleshot remotely will appear here.",
    },
    hybrid: {
      title: "No hybrid work is active",
      detail: "Work orders receiving both remote and in-person support will appear here.",
    },
    in_person: {
      title: "No in-person work is active",
      detail: "Work orders being handled on-site today will appear here.",
    },
  }[supportMode];
  const visibleCopy = stage === "active" && activeSupportCopy
    ? activeSupportCopy
    : copy;
  return (
    <div className={styles.empty}>
      <div className={styles.emptyMark}>
        <Icon name={["done", "closed"].includes(stage) ? "check" : "spark"} size={26} />
      </div>
      <h2>{searching ? "No matching work orders" : visibleCopy.title}</h2>
      <p>
        {searching
          ? "Try a different work-order number, title, customer, or assignee."
          : visibleCopy.detail}
      </p>
    </div>
  );
}

function Assignees({ assignees, emptyLabel = "Unassigned" }) {
  if (!assignees?.length) {
    return (
      <div className={styles.unassigned}>
        <span className={styles.unassignedDot} />
        {emptyLabel}
      </div>
    );
  }
  return (
    <div className={styles.assigneeList}>
      {assignees.map((assignee) => (
        <div className={styles.assignee} key={assignee.id || assignee.name}>
          <span
            className={`${styles.avatar} ${styles[avatarTone(assignee.name)]}`}
          >
            {initials(assignee.name)}
          </span>
          <span>
            {assignee.name}
            {assignee.workMode ? (
              <small>{assignee.workMode === "physical" ? "Physical" : "Remote"}</small>
            ) : null}
            {assignee.scheduledDate ? <small>{assignee.scheduledDate}</small> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

function AssignmentHistory({ history = [] }) {
  if (!history.length) return null;
  return (
    <details className={styles.historyPanel} draggable={false}>
      <summary>
        <span>
          <Icon name="history" size={16} /> Assignment history
        </span>
        <span className={styles.historyCount}>{history.length}</span>
      </summary>
      <div className={styles.historyTimeline}>
        {[...history].reverse().map((entry, index) => (
          <div className={styles.historyEvent} key={entry.id || `${entry.changedAtIso}-${index}`}>
            <span className={styles.timelineDot} />
            <div>
              <div className={styles.historyMeta}>
                <strong>
                  {entry.source === "initial"
                    ? "Initial owner"
                    : entry.source === "bluefolder"
                    ? "BlueFolder assignment"
                    : entry.source === "manual"
                    ? "Manual assignment change"
                    : "AI assignment change"}
                </strong>
                <span>{formatExactTime(entry.changedAtIso)}</span>
              </div>
              <p className={styles.historyChange}>
                <span>{assignmentNames(entry.previousAssignees)}</span>
                <span className={styles.historyArrow}>→</span>
                <strong>{assignmentNames(entry.assignees)}</strong>
              </p>
              {entry.reason ? (
                <p className={styles.historyReason}>
                  <span>Why:</span> {entry.reason}
                </p>
              ) : null}
              {entry.triggerMessage ? (
                <blockquote className={styles.triggerMessage}>
                  “{entry.triggerMessage}”
                  {entry.triggerSender ? <cite>— {entry.triggerSender}</cite> : null}
                </blockquote>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

function ParticipationHistory({ history = [] }) {
  if (!history.length) return null;
  return (
    <details className={styles.historyPanel} draggable={false}>
      <summary>
        <span>
          <Icon name="history" size={16} /> Participation history
        </span>
        <span className={styles.historyCount}>{history.length}</span>
      </summary>
      <div className={styles.historyTimeline}>
        {[...history].reverse().map((entry, index) => (
          <div
            className={styles.historyEvent}
            key={entry.id || `${entry.changedAtIso}-${index}`}
          >
            <span className={styles.timelineDot} />
            <div>
              <div className={styles.historyMeta}>
                <strong>AI participation change</strong>
                <span>{formatExactTime(entry.changedAtIso)}</span>
              </div>
              <p className={styles.historyChange}>
                <span>{assignmentNames(entry.previousParticipants)}</span>
                <span className={styles.historyArrow}>→</span>
                <strong>{assignmentNames(entry.participants)}</strong>
              </p>
              {entry.reason ? (
                <p className={styles.historyReason}>
                  <span>Why:</span> {entry.reason}
                </p>
              ) : null}
              {entry.triggerMessage ? (
                <blockquote className={styles.triggerMessage}>
                  “{entry.triggerMessage}”
                  {entry.triggerSender ? (
                    <cite>— {entry.triggerSender}</cite>
                  ) : null}
                </blockquote>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

function WorkflowStageHistory({ workOrder }) {
  const history = workOrder.workflowStageHistory || [];
  const currentStage = workOrder.workflowStatus || "unassigned";
  const currentDuration = Number(workOrder.workflowStageElapsedMs || 0);
  const totals = history.reduce((result, entry) => {
    result[entry.stage] = Number(result[entry.stage] || 0) +
      Number(entry.durationMs || 0);
    return result;
  }, { [currentStage]: currentDuration });
  const timeline = [
    ...history,
    {
      id: "current-stage",
      stage: currentStage,
      enteredAtIso: workOrder.workflowStageStartedAt,
      durationMs: currentDuration,
      current: true,
    },
  ];
  return (
    <details className={[styles.historyPanel, styles.stageHistoryPanel].join(" ")} draggable={false}>
      <summary>
        <span>
          <Icon name="calendar" size={16} /> Stage timing
        </span>
        <span className={styles.stageCurrentDuration}>
          {formatStageDuration(currentDuration)} in {WORKFLOW_LABELS[currentStage]}
        </span>
      </summary>
      <div className={styles.stageHistoryBody}>
        <div className={styles.stageTotals}>
          {["unassigned", "active", "remote", "service_complete", "done", "closed"]
            .filter((stage) => Number(totals[stage] || 0) > 0 || stage === currentStage)
            .map((stage) => (
              <div key={stage}>
                <span>{WORKFLOW_LABELS[stage]}</span>
                <strong>{formatStageDuration(totals[stage] || 0)}</strong>
              </div>
            ))}
        </div>
        <div className={styles.stageTimeline}>
          {[...timeline].reverse().map((entry) => (
            <div className={styles.stageEvent} key={entry.id}>
              <span className={styles.timelineDot} />
              <div>
                <strong>
                  {WORKFLOW_LABELS[entry.stage] || entry.stage}
                  {entry.current ? " · Current" : ""}
                </strong>
                <span>{formatStageDuration(entry.durationMs)}</span>
                <small>
                  {formatExactTime(entry.enteredAtIso)}
                  {entry.exitedAtIso
                    ? ` → ${formatExactTime(entry.exitedAtIso)}`
                    : " → now"}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

function AssigneeEditor({
  assignees = [],
  bluefolderAssignees = [],
  options = [],
  disabled,
  onSave,
}) {
  const [open, setOpen] = useState(false);
  const selectableIds = useMemo(
    () => new Set(options.map((entry) => entry.id).filter(Boolean)),
    [options]
  );
  const protectedIds = useMemo(
    () =>
      new Set(
        bluefolderAssignees.map((entry) => entry.id).filter(Boolean)
      ),
    [bluefolderAssignees]
  );
  const selectedFromAssignees = () =>
    new Set(
      assignees
        .map((entry) => entry.id)
        .filter((id) => id && selectableIds.has(id))
    );
  const [selected, setSelected] = useState(selectedFromAssignees);

  useEffect(() => {
    if (!open) setSelected(selectedFromAssignees());
  }, [assignees, open, selectableIds]);

  const toggle = (id) => {
    if (protectedIds.has(id)) return;
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const save = async () => {
    await onSave(Array.from(selected));
    setOpen(false);
  };

  return (
    <div className={styles.ownerEditor}>
      <div className={styles.ownerLabelRow}>
        <Assignees assignees={assignees} />
        <button
          className={styles.editOwnersButton}
          type="button"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
        >
          Change
        </button>
      </div>
      {open ? (
        <div className={styles.ownerPicker}>
          <div className={styles.ownerPickerHeader}>
            <strong>Assign remote or physical workers</strong>
            <span>
              {bluefolderAssignees.length
                ? "BlueFolder keeps " +
                  assignmentNames(bluefolderAssignees) +
                  " assigned; select any additional workers"
                : "Select one or more people"}
            </span>
          </div>
          <div className={styles.ownerOptions}>
            {options.map((option) => (
              <label className={styles.ownerOption} key={option.id}>
                <input
                  type="checkbox"
                  checked={selected.has(option.id)}
                  disabled={protectedIds.has(option.id)}
                  onChange={() => toggle(option.id)}
                />
                <span
                  className={[
                    styles.avatar,
                    styles[avatarTone(option.name)],
                  ].join(" ")}
                >
                  {initials(option.name)}
                </span>
                <span>
                  {option.name}
                  {protectedIds.has(option.id) ? " · BlueFolder" : ""}
                </span>
              </label>
            ))}
          </div>
          {![...selected].some((id) => !protectedIds.has(id)) ? (
            <p className={styles.ownerResetNote}>
              Leaving everyone unchecked resets Slack helpers to Yao
              {bluefolderAssignees.length
                ? "; BlueFolder engineers will remain assigned."
                : "."}
            </p>
          ) : null}
          <div className={styles.ownerPickerActions}>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" disabled={disabled} onClick={save}>
              Save owners
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
function PeopleEditor({
  people = [],
  bluefolderAssignees = [],
  options = [],
  role = "assignment",
  allowMode = false,
  allowSchedule = false,
  disabled,
  onSave,
}) {
  const [open, setOpen] = useState(false);
  const protectedIds = useMemo(
    () => new Set(bluefolderAssignees.map((entry) => entry.id).filter(Boolean)),
    [bluefolderAssignees]
  );
  const initialSelection = useCallback(
    () =>
      new Map(
        people
          .filter((entry) => entry?.id)
          .map((entry) => [
            entry.id,
            {
              id: entry.id,
              workMode: entry.workMode || (allowMode ? "physical" : ""),
              scheduledDate: entry.scheduledDate || "",
            },
          ])
      ),
    [allowMode, people]
  );
  const [selected, setSelected] = useState(initialSelection);

  useEffect(() => {
    if (!open) setSelected(initialSelection());
  }, [initialSelection, open]);

  const toggle = (id) => {
    if (protectedIds.has(id)) return;
    setSelected((current) => {
      const next = new Map(current);
      if (next.has(id)) next.delete(id);
      else next.set(id, { id, workMode: allowMode ? "physical" : "", scheduledDate: "" });
      return next;
    });
  };
  const updatePerson = (id, patch) => {
    setSelected((current) => {
      const next = new Map(current);
      next.set(id, { ...(next.get(id) || { id }), ...patch });
      return next;
    });
  };
  const save = async () => {
    await onSave(Array.from(selected.values()));
    setOpen(false);
  };
  const title =
    role === "assignment"
      ? "Assignment"
      : role === "participation"
        ? "Participation"
        : "Manager oversight";

  return (
    <div className={styles.ownerEditor}>
      <div className={styles.ownerLabelRow}>
        <Assignees
          assignees={people}
          emptyLabel={role === "oversight" ? "No oversight manager" : "Unassigned"}
        />
        <button
          className={styles.editOwnersButton}
          type="button"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
        >
          Change
        </button>
      </div>
      {open ? (
        <div className={styles.ownerPicker}>
          <div className={styles.ownerPickerHeader}>
            <strong>Edit {title.toLowerCase()}</strong>
            <span>Select one or more Slack people. Changes teach the Ops AI.</span>
          </div>
          <div className={styles.ownerOptions}>
            {options.map((option) => {
              const selectedPerson = selected.get(option.id);
              return (
                <div className={styles.ownerOption} key={option.id}>
                  <input
                    type="checkbox"
                    checked={selected.has(option.id)}
                    disabled={protectedIds.has(option.id)}
                    onChange={() => toggle(option.id)}
                  />
                  <span className={[styles.avatar, styles[avatarTone(option.name)]].join(" ")}>
                    {initials(option.name)}
                  </span>
                  <span>
                    {option.name}
                    {protectedIds.has(option.id) ? " · BlueFolder" : ""}
                  </span>
                  {selectedPerson && allowMode ? (
                    <select
                      aria-label={`Work mode for ${option.name}`}
                      value={selectedPerson.workMode || "physical"}
                      disabled={protectedIds.has(option.id)}
                      onChange={(event) => updatePerson(option.id, { workMode: event.target.value })}
                    >
                      <option value="physical">Physical</option>
                      <option value="remote">Remote</option>
                    </select>
                  ) : null}
                  {selectedPerson && allowSchedule ? (
                    <input
                      type="date"
                      aria-label={`Scheduled day for ${option.name}`}
                      value={selectedPerson.scheduledDate || ""}
                      onChange={(event) => updatePerson(option.id, { scheduledDate: event.target.value })}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className={styles.ownerPickerActions}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="button" disabled={disabled} onClick={save}>Save {title.toLowerCase()}</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
function OpsUpdateEntry({ entry, entryKey }) {
  return (
    <div
      className={[styles.historyEvent, styles.updateEvent].join(" ")}
      key={entryKey}
    >
      <span className={styles.timelineDot} />
      <div>
        <div className={styles.historyMeta}>
          <strong>{entry.headline || "Work order update"}</strong>
          <span>{formatExactTime(entry.generatedAtIso)}</span>
        </div>
        {entry.statusLine ? (
          <p className={styles.updateStatus}>{entry.statusLine}</p>
        ) : null}
        <div className={styles.updateSummaryCard}>
          <p>{entry.summary || "A summary is not available yet."}</p>
        </div>
        {entry.sourceMessageCount ? (
          <p className={styles.updateCoverage}>
            Summarized from {entry.sourceMessageCount} Slack messages
          </p>
        ) : null}
      </div>
    </div>
  );
}

function SnapshotHistoryToggle({ count, open, onToggle }) {
  if (!count) return null;
  return (
    <button
      type="button"
      className={styles.snapshotHistoryToggle}
      aria-expanded={open}
      onClick={() => onToggle(!open)}
    >
      <span>
        <Icon name="history" size={15} /> History
      </span>
      <span className={styles.snapshotHistoryCount}>{count}</span>
      <span
        className={styles.snapshotHistoryChevron}
        data-open={open ? "true" : "false"}
      >
        <Icon name="arrow" size={14} />
      </span>
    </button>
  );
}

function OpsUpdateHistory({ history = [], open, onToggle }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const { latest, history: olderEntries } = splitLatestSnapshot(history);
  return (
    <details
      className={[styles.historyPanel, styles.updatePanel].join(" ")}
      draggable={false}
      open={open}
      onToggle={(event) => onToggle(event.currentTarget.open)}
    >
      <summary>
        <span>
          <Icon name="spark" size={16} /> Finance &amp; operations update
        </span>
        <span className={styles.historyCount}>{history.length}</span>
      </summary>
      {latest ? (
        <div className={styles.historyTimeline}>
          <OpsUpdateEntry
            entry={latest}
            entryKey={latest.id || latest.generatedAtIso || "ops-update-latest"}
          />
          <SnapshotHistoryToggle
            count={olderEntries.length}
            open={historyOpen}
            onToggle={setHistoryOpen}
          />
          {historyOpen ? (
            <div className={styles.snapshotHistoryEntries}>
              {olderEntries.map((entry, index) => (
                <OpsUpdateEntry
                  entry={entry}
                  entryKey={entry.id || entry.generatedAtIso || `ops-update-${index}`}
                  key={entry.id || entry.generatedAtIso || `ops-update-${index}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className={styles.noUpdate}>
          Select Update to create a concise status brief from the conversation.
        </p>
      )}
    </details>
  );
}

const PART_MOVEMENT_LABELS = {
  ordered: "Ordered",
  incoming: "Coming in",
  received: "Received",
  to_site: "Taken to site",
  installed: "Installed",
  removed: "Removed",
  outgoing: "Sent out",
  returned: "Returned",
  unknown: "Movement noted",
};

function PartMovementEntry({ entry, entryKey }) {
  return (
    <div className={styles.partMovementEntry} key={entryKey}>
      <div className={styles.partMovementHeading}>
        <strong>
          {entry.reportType === "final"
            ? "Final parts status"
            : entry.reportType === "service_complete"
            ? "At service completion"
            : "Parts update"}
        </strong>
        <span>{formatExactTime(entry.generatedAtIso)}</span>
      </div>
      <p>{entry.summary}</p>
      {entry.movements?.length ? (
        <ul className={styles.partMovementList}>
          {entry.movements.map((movement, movementIndex) => (
            <li key={`${movement.partName}-${movement.movement}-${movementIndex}`}>
              <span>
                {PART_MOVEMENT_LABELS[movement.movement] ||
                  PART_MOVEMENT_LABELS.unknown}
              </span>
              <strong>{movement.partName}</strong>
              {movement.status ? <em>{movement.status}</em> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {entry.outstanding?.length ? (
        <p className={styles.partsOutstanding}>
          <strong>Still open:</strong> {entry.outstanding.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

function PartMovements({ history = [], open, onToggle }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const { latest, history: olderEntries } = splitLatestSnapshot(history);
  return (
    <details
      className={[styles.historyPanel, styles.partMovementsPanel].join(" ")}
      draggable={false}
      open={open}
      onToggle={(event) => onToggle(event.currentTarget.open)}
    >
      <summary>
        <span>
          <Icon name="package" size={16} /> Part movements
        </span>
        <span className={styles.historyCount}>{history.length}</span>
      </summary>
      {latest ? (
        <div className={styles.partMovementsBody}>
          <PartMovementEntry
            entry={latest}
            entryKey={latest.id || latest.generatedAtIso || "parts-latest"}
          />
          <SnapshotHistoryToggle
            count={olderEntries.length}
            open={historyOpen}
            onToggle={setHistoryOpen}
          />
          {historyOpen ? (
            <div className={styles.snapshotHistoryEntries}>
              {olderEntries.map((entry, index) => (
                <PartMovementEntry
                  entry={entry}
                  entryKey={entry.id || entry.generatedAtIso || `parts-${index}`}
                  key={entry.id || entry.generatedAtIso || `parts-${index}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className={styles.noUpdate}>
          Send !parts in the Slack work-order thread for a concise movement
          summary.
        </p>
      )}
    </details>
  );
}

function InventoryMovements({ movements = [] }) {
  const shipping = movements.filter((entry) => entry.direction === "shipping");
  const receiving = movements.filter((entry) => entry.direction === "receiving");
  const renderGroup = (label, entries) => (
    <div className={styles.inventoryMovementGroup}>
      <div className={styles.inventoryMovementGroupHeading}>
        <strong>{label}</strong>
        <span>{entries.length}</span>
      </div>
      {entries.length ? (
        <div className={styles.inventoryMovementGrid}>
          {[...entries].reverse().map((entry) => (
            <Link
              href={entry.itemUrl || `/NewSearch/item/${encodeURIComponent(entry.itemId)}`}
              className={styles.inventoryMovementCard}
              key={entry.id}
              draggable="false"
            >
              <span className={styles.inventoryMovementIcon}>
                <Icon name="package" size={15} />
              </span>
              <span>
                <strong>{entry.partName}</strong>
                <small>
                  {[entry.itemId, entry.pnSn].filter(Boolean).join(" · ") ||
                    "Open item details"}
                </small>
              </span>
              <time>{formatExactTime(entry.recordedAtIso)}</time>
              <Icon name="external" size={13} />
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.inventoryMovementEmpty}>No {label.toLowerCase()} recorded.</p>
      )}
    </div>
  );
  return (
    <details
      className={[styles.historyPanel, styles.inventoryMovementsPanel].join(" ")}
      draggable={false}
    >
      <summary>
        <span>
          <Icon name="package" size={16} /> Shipping & receiving
        </span>
        <span className={styles.historyCount}>{movements.length}</span>
      </summary>
      <div className={styles.inventoryMovementsBody}>
        {renderGroup("Shipping", shipping)}
        {renderGroup("Receiving", receiving)}
      </div>
    </details>
  );
}

function InventoryMovementsV2({ movements = [], disabled, onUpdateMovement }) {
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [itemPreview, setItemPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const connectionPlan = useMemo(
    () => buildInventoryConnectionPlan(movements),
    [movements]
  );
  const openPreview = async (entry) => {
    setSelectedMovement(entry);
    setItemPreview(null);
    if (!entry.itemId) return;
    setPreviewLoading(true);
    try {
      const snapshot = await firebase.firestore().collection("Test").doc(entry.itemId).get();
      setItemPreview(snapshot.exists ? { id: snapshot.id, ...(snapshot.data() || {}) } : null);
    } finally {
      setPreviewLoading(false);
    }
  };
  const renderGroup = (label, entries) => {
    return (
      <div className={styles.inventoryMovementGroup}>
        <div className={styles.inventoryMovementGroupHeading}>
          <strong>{label}</strong><span>{entries.length}</span>
        </div>
        {entries.length ? (
          <div className={styles.inventoryMovementGrid}>
            {[...entries].reverse().map((entry) => (
              <button type="button" className={styles.inventoryMovementCard} key={entry.id} onClick={() => openPreview(entry)}>
                <span className={styles.inventoryMovementIcon}><Icon name="package" size={15} /></span>
                <span>
                  <strong>{entry.partName}</strong>
                  <small>{[entry.itemId, entry.pnSn].filter(Boolean).join(" · ") || "Open item details"}</small>
                  <em>{entry.disposition || "No linked return recorded"}</em>
                </span>
                <time>{formatExactTime(entry.recordedAtIso)}</time>
                <Icon name="external" size={13} />
              </button>
            ))}
          </div>
        ) : <p className={styles.inventoryMovementEmpty}>No {label.toLowerCase()} recorded.</p>}
      </div>
    );
  };
  const renderConnectionEndpoint = (entry, label, variant = "return") => (
    <button
      type="button"
      className={[
        styles.inventoryConnectionEndpoint,
        variant === "swap" ? styles.inventorySwapEndpoint : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => openPreview(entry)}
      aria-label={`Open ${label.toLowerCase()} record for ${entry.partName}`}
    >
      <span className={styles.inventoryConnectionEndpointLabel}>{label}</span>
      <span className={styles.inventoryMovementIcon} aria-hidden="true">
        <Icon name="package" size={15} />
      </span>
      <span className={styles.inventoryConnectionEndpointCopy}>
        <strong>{entry.partName}</strong>
        <small>
          {[entry.itemId, entry.pnSn].filter(Boolean).join(" · ") ||
            "Inventory record"}
        </small>
      </span>
      <time>{formatExactTime(entry.recordedAtIso)}</time>
    </button>
  );
  const selectedConnection = selectedMovement
    ? connectionPlan.connectionByMovementId.get(String(selectedMovement.id))
    : null;
  const selectedConnectionPeer = selectedConnection
    ? selectedConnection.type === "swap"
      ? String(selectedConnection.installed.id) === String(selectedMovement.id)
        ? selectedConnection.core
        : selectedConnection.installed
      : String(selectedConnection.shipping.id) === String(selectedMovement.id)
        ? selectedConnection.receiving
        : selectedConnection.shipping
    : null;
  const selectedSwapMovementId =
    selectedConnection?.type === "swap" ? selectedConnectionPeer?.id || "" : "";
  const swapCandidates = selectedMovement
    ? movements.filter(
        (entry) =>
          entry?.id &&
          entry.id !== selectedMovement.id &&
          entry.direction !== selectedMovement.direction
      )
    : [];
  const hasConnections = Boolean(
    connectionPlan.swapConnections.length + connectionPlan.returnConnections.length
  );
  return (
    <>
      <details className={[styles.historyPanel, styles.inventoryMovementsPanel].join(" ")} draggable={false}>
        <summary><span><Icon name="package" size={16} /> Shipping &amp; receiving</span><span className={styles.historyCount}>{movements.length}</span></summary>
        <div className={styles.inventoryMovementsBody}>
          {connectionPlan.swapConnections.length ? (
            <section
              className={[
                styles.inventoryConnections,
                styles.inventorySwapConnections,
              ].join(" ")}
              aria-label="Installed replacement parts linked to returned cores"
            >
              <div className={styles.inventoryConnectionsHeading}>
                <div>
                  <strong>Installed part &amp; core return</strong>
                  <small>
                    Replacement/core pairs use a recorded swap link or one exact,
                    unambiguous part number.
                  </small>
                </div>
                <span>{connectionPlan.swapConnections.length}</span>
              </div>
              <div className={styles.inventoryConnectionList}>
                {connectionPlan.swapConnections.map((connection) => (
                  <div
                    className={[
                      styles.inventoryConnectionRow,
                      styles.inventorySwapConnectionRow,
                    ].join(" ")}
                    key={connection.id}
                  >
                    {renderConnectionEndpoint(
                      connection.installed,
                      "Installed / used",
                      "swap"
                    )}
                    <div
                      className={[
                        styles.inventoryConnectionBridge,
                        styles.inventorySwapBridge,
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <span className={styles.inventoryConnectionBridgeLine}>→</span>
                      <small>
                        {connection.source === "recorded_swap"
                          ? "Recorded swap"
                          : connection.source === "inventory_cross_reference"
                            ? "Inventory cross-link"
                            : "Exact part number"}
                      </small>
                    </div>
                    {renderConnectionEndpoint(
                      connection.core,
                      "Core / bad part",
                      "swap"
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          {connectionPlan.returnConnections.length ? (
            <section
              className={styles.inventoryConnections}
              aria-label="Shipments linked to the same unused item returned"
            >
              <div className={styles.inventoryConnectionsHeading}>
                <div>
                  <strong>Shipment returned / unused</strong>
                  <small>
                    These links track the same inventory item coming back; they are
                    separate from installed-part and core swaps.
                  </small>
                </div>
                <span>{connectionPlan.returnConnections.length}</span>
              </div>
              <div className={styles.inventoryConnectionList}>
                {connectionPlan.returnConnections.map((connection) => (
                  <div className={styles.inventoryConnectionRow} key={connection.id}>
                    {renderConnectionEndpoint(connection.shipping, "Shipped")}
                    <div className={styles.inventoryConnectionBridge} aria-hidden="true">
                      <span className={styles.inventoryConnectionBridgeLine}>→</span>
                      <small>
                        {connection.source === "recorded_pair"
                          ? "Recorded return"
                          : "Same inventory ID"}
                      </small>
                    </div>
                    {renderConnectionEndpoint(connection.receiving, "Received")}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          {renderGroup(
            hasConnections ? "Other shipping" : "Shipping",
            connectionPlan.unlinkedShipping
          )}
          {renderGroup(
            hasConnections ? "Other receiving" : "Receiving",
            connectionPlan.unlinkedReceiving
          )}
        </div>
      </details>
      {selectedMovement ? (
        <div className={styles.previewBackdrop} role="presentation" onMouseDown={() => setSelectedMovement(null)}>
          <section className={styles.itemPreviewModal} role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div><span>INVENTORY PREVIEW</span><h3>{itemPreview?.name || selectedMovement.partName}</h3></div>
              <button type="button" aria-label="Close preview" onClick={() => setSelectedMovement(null)}><Icon name="close" size={17} /></button>
            </header>
            {previewLoading ? <p>Loading item details…</p> : (
              <div className={styles.itemPreviewGrid}>
                <div><span>Item ID</span><strong>{selectedMovement.itemId || "Not linked"}</strong></div>
                <div><span>Part number</span><strong>{itemPreview?.pn || selectedMovement.pnSn || "—"}</strong></div>
                <div><span>Serial number</span><strong>{itemPreview?.sn || "—"}</strong></div>
                <div><span>Movement</span><strong>{selectedMovement.direction}</strong></div>
                <div>
                  <span>Connection</span>
                  <strong>
                    {selectedConnection?.type === "swap"
                      ? `Installed/core swap: ${selectedConnectionPeer?.partName || "Linked inventory item"}`
                      : selectedConnectionPeer
                      ? `${selectedConnection.source === "recorded_pair" ? "Recorded link" : "Exact item ID"}: ${selectedConnectionPeer.partName}${selectedConnectionPeer.itemId ? ` · ${selectedConnectionPeer.itemId}` : ""}`
                      : "No verified matching return/shipment yet"}
                  </strong>
                </div>
                <label><span>Item outcome</span><select value={selectedMovement.disposition || "unknown"} disabled={disabled} onChange={async (event) => { await onUpdateMovement(selectedMovement.id, event.target.value); setSelectedMovement((current) => ({ ...current, disposition: event.target.value })); }}><option value="outbound">Outbound</option><option value="returned">Returned</option><option value="used">Used</option><option value="core">Core</option><option value="unknown">Unknown</option></select></label>
                <label className={styles.inventorySwapPicker}>
                  <span>Installed / core link</span>
                  <select
                    value={selectedSwapMovementId}
                    disabled={disabled}
                    onChange={async (event) => {
                      await onUpdateMovement(
                        selectedMovement.id,
                        selectedMovement.disposition ||
                          (selectedMovement.direction === "shipping"
                            ? "outbound"
                            : "returned"),
                        {
                          updateSwapLink: true,
                          swapMovementId: event.target.value,
                        }
                      );
                      setSelectedMovement(null);
                    }}
                  >
                    <option value="">No installed/core link</option>
                    {swapCandidates.map((entry) => (
                      <option value={entry.id} key={entry.id}>
                        {entry.direction === "shipping" ? "Used: " : "Core: "}
                        {entry.partName}
                        {entry.pnSn ? ` · ${entry.pnSn}` : ""}
                      </option>
                    ))}
                  </select>
                  <small>
                    Selecting a pair records an explicit swap and marks the shipped
                    item Used and the received item Core.
                  </small>
                </label>
              </div>
            )}
            <footer><button type="button" onClick={() => setSelectedMovement(null)}>Close</button>{selectedMovement.itemId ? <Link href={`/NewSearch/item/${encodeURIComponent(selectedMovement.itemId)}`}>Edit item</Link> : null}</footer>
          </section>
        </div>
      ) : null}
    </>
  );
}

function WorkOrderConnections({
  workOrder,
  options = {},
  disabled = false,
  onSave,
}) {
  const clients = options.clients || [];
  const machines = options.machines || [];
  const trailers = options.trailers || [];
  const [draft, setDraft] = useState({
    clientId: workOrder.clientId || "",
    machineId: workOrder.machineId || "",
    trailerId: workOrder.trailerId || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft({
      clientId: workOrder.clientId || "",
      machineId: workOrder.machineId || "",
      trailerId: workOrder.trailerId || "",
    });
  }, [workOrder.clientId, workOrder.machineId, workOrder.trailerId]);

  const clientMachines = machines.filter((machine) =>
    (machine.clientIds || []).includes(draft.clientId)
  );
  const clientTrailers = trailersForClient(trailers, draft.clientId);
  const dirty =
    draft.clientId !== (workOrder.clientId || "") ||
    draft.machineId !== (workOrder.machineId || "") ||
    draft.trailerId !== (workOrder.trailerId || "");

  const selectClient = (clientId) => {
    const connection = connectionSelectionForClient({
      clientId,
      trailers,
      currentTrailerId: draft.trailerId,
    });
    const machineBelongs = machines.some(
      (machine) =>
        machine.id === connection.machineId &&
        (machine.clientIds || []).includes(connection.clientId)
    );
    setDraft({
      clientId: connection.clientId,
      trailerId: connection.trailerId,
      machineId: machineBelongs ? connection.machineId : "",
    });
  };

  const selectTrailer = (trailerId) => {
    if (!trailerId) {
      setDraft((current) => ({ ...current, trailerId: "" }));
      return;
    }
    const connection = connectionSelectionForTrailer({ trailerId, trailers });
    setDraft(connection);
  };

  const save = async () => {
    if (!draft.clientId || !dirty || saving) return;
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  };

  return (
    <details className={styles.connectionPanel} draggable={false}>
      <summary>
        <span>Client, trailer, and machine</span>
        <strong>
          {[workOrder.clientName, workOrder.trailerName, workOrder.machineName]
            .filter(Boolean)
            .join(" · ") || "Not connected"}
        </strong>
      </summary>
      <div className={styles.connectionEditor}>
        <label>
          <span>Client DB record</span>
          <select
            value={draft.clientId}
            disabled={disabled || saving}
            onChange={(event) => selectClient(event.target.value)}
          >
            <option value="">Select client</option>
            {clients.map((client) => (
              <option value={client.id} key={client.id}>
                {client.name}{client.location ? ` — ${client.location}` : ""}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Trailer</span>
          <select
            value={draft.trailerId}
            disabled={disabled || saving || !draft.clientId}
            onChange={(event) => selectTrailer(event.target.value)}
          >
            <option value="">
              {clientTrailers.length > 1
                ? "Choose one of this client's trailers"
                : "No trailer selected"}
            </option>
            {clientTrailers.map((trailer) => (
              <option value={trailer.id} key={trailer.id}>
                {trailer.name}
              </option>
            ))}
          </select>
          <small>
            {draft.clientId && clientTrailers.length === 1
              ? "Automatically connected because this client has one current trailer."
              : draft.clientId && clientTrailers.length > 1
              ? "Multiple trailers are at this client; choose the correct one."
              : "Selecting a trailer automatically selects its linked client."}
          </small>
        </label>
        <label>
          <span>Machine</span>
          <select
            value={draft.machineId}
            disabled={disabled || saving || !draft.clientId}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                machineId: event.target.value,
              }))
            }
          >
            <option value="">No machine selected</option>
            {clientMachines.map((machine) => (
              <option value={machine.id} key={machine.id}>
                {machine.name}
                {[machine.oem, machine.modality, machine.model].filter(Boolean)
                  .length
                  ? ` — ${[machine.oem, machine.modality, machine.model]
                      .filter(Boolean)
                      .join(" · ")}`
                  : ""}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={disabled || saving || !dirty || !draft.clientId}
          onClick={save}
        >
          {saving ? "Saving…" : "Save connections"}
        </button>
      </div>
    </details>
  );
}

function WorkOrderCard({
  workOrder,
  completed,
  priorityEditable,
  showCategoryFeedback,
  showSupportModeBadge,
  editable,
  busy,
  onComplete,
  onServiceComplete,
  onGenerateUpdate,
  onGenerateParts,
  onTierChange,
  onCategoryFeedback,
  tierOptions,
  onAssign,
  onPeopleChange,
  onUpdateInventoryMovement,
  onDelete,
  onClose,
  onReopen,
  onMoveStage,
  onReviewWorkflow,
  onOpenNotes,
  canDelete,
  assigneeOptions,
  connectionOptions,
  onConnectionsChange,
}) {
  const [updatesOpen, setUpdatesOpen] = useState(
    Boolean(workOrder.opsUpdates?.length)
  );
  const [partsOpen, setPartsOpen] = useState(
    Boolean(workOrder.partMovements?.length)
  );
  const [peopleTab, setPeopleTab] = useState("assignment");

  const generateUpdate = async () => {
    await onGenerateUpdate();
    setUpdatesOpen(true);
  };
  const generateParts = async () => {
    await onGenerateParts();
    setPartsOpen(true);
  };
  const supportMode = supportModeForWorkOrder(workOrder);
  const supportModeLabel = {
    remote: "Remote",
    hybrid: "Hybrid",
    in_person: "In-person",
  }[supportMode] || "";
  const workflowDecision = workOrder.aiWorkflowDecision;
  const workflowDecisionNeedsReview = Boolean(
    workflowDecision && !workflowDecision.reviewed
  );

  return (
    <article
      className={[
        styles.workOrder,
        completed ? styles.completedCard : "",
      ].join(" ")}
    >
      {workOrder.summaryMissing ? (
        <span
          className={styles.missingSummaryMark}
          role="img"
          aria-label={
            workOrder.summaryWarning?.message ||
            "This work order reached a completed stage without a saved summary."
          }
          title={
            workOrder.summaryWarning?.message ||
            "Moved here without a saved Slack command summary."
          }
        />
      ) : null}
      {canDelete ? (
        <button
          type="button"
          className={styles.deleteWorkOrder}
          aria-label={`Delete work order ${workOrder.number}`}
          title="Delete work order"
          disabled={busy}
          onClick={onDelete}
        >
          <Icon name="close" size={15} />
        </button>
      ) : null}
      <div className={styles.priorityRail}>
        <span
          className={[
            styles.completeMark,
            workOrder.workflowStatus === "unassigned"
              ? styles.unassignedMark
              : workOrder.workflowStatus === "remote"
              ? styles.remoteMark
              : "",
          ].join(" ")}
        >
          <Icon
            name={
              ["service_complete", "done", "closed"].includes(workOrder.workflowStatus)
                ? "check"
                : "spark"
            }
            size={20}
          />
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <div>
            <div className={styles.eyebrow}>
              <span>WO #{workOrder.number}</span>
              {workOrder.customer ? <span>{workOrder.customer}</span> : null}
              <StatusBadge status={workOrder.workflowStatus} />
            </div>
            <h2>{workOrder.subject}</h2>
          </div>
          <div className={styles.cardMeta}>
            <div className={styles.cardIndicators}>
              <label
                className={styles.priorityIndicator}
                data-tier={workOrder.priorityTier || "needs_scheduled"}
                title="Change priority"
              >
                <span className={styles.srOnly}>Priority</span>
                <select
                  value={workOrder.priorityTier || "needs_scheduled"}
                  disabled={busy || !priorityEditable}
                  onChange={(event) => onTierChange(event.target.value)}
                >
                  {tierOptions.map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.label}{tier.generated ? " (Generated)" : ""}
                    </option>
                  ))}
                </select>
              </label>
              {showSupportModeBadge && supportModeLabel ? (
                <span
                  className={styles.supportModeBadge}
                  data-mode={supportMode}
                >
                  {supportModeLabel}
                </span>
              ) : null}
            </div>
            <span className={styles.activity}>
              {completed ? "Completed " : "Updated "}
              {formatRelativeTime(
                completed ? workOrder.completedAt : workOrder.lastActivityAt
              )}
            </span>
          </div>
        </div>

        {workflowDecisionNeedsReview ? (
          <section className={styles.workflowDecisionReview}>
            <div className={styles.workflowDecisionCopy}>
              <span className={styles.workflowDecisionIcon}>
                <Icon name="spark" size={16} />
              </span>
              <div>
                <strong>Magmo chose to move this work order</strong>
                <span>
                  {workflowDecision.previousStage
                    ? `${WORKFLOW_LABELS[workflowDecision.previousStage] || workflowDecision.previousStage} to `
                    : "Placed in "}
                  {WORKFLOW_LABELS[workOrder.workflowStatus] || workOrder.workflowStatus}.
                </span>
                {workflowDecision.reason ? <p>{workflowDecision.reason}</p> : null}
              </div>
            </div>
            <div className={styles.workflowDecisionActions}>
              <button
                type="button"
                disabled={busy}
                onClick={() => onReviewWorkflow(workOrder.workflowStatus)}
              >
                Keep here
              </button>
              <label>
                <span className={styles.srOnly}>Correct Magmo workflow decision</span>
                <select
                  value=""
                  disabled={busy}
                  onChange={(event) => {
                    const target = event.target.value;
                    event.target.value = "";
                    if (target) onReviewWorkflow(target);
                  }}
                >
                  <option value="">Move somewhere else…</option>
                  {WORKFLOW_STAGE_OPTIONS.filter(
                    ([stage]) => stage !== workOrder.workflowStatus
                  ).map(([stage, label]) => (
                    <option key={stage} value={stage}>{label}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        ) : null}

        {workOrder.priorityReason ? (
          <div className={styles.categoryDecision}>
            <div className={styles.categoryDecisionTop}>
              <span className={styles.categoryName}>
                {workOrder.priorityLabel ||
                  generatedTierLabel(workOrder.priorityTier, "")}
                {workOrder.priorityGenerated ? " (Generated)" : ""}
              </span>
              {showCategoryFeedback ? (
                <div className={styles.categoryFeedback} aria-label="Category feedback">
                  <button
                    type="button"
                    disabled={busy || workOrder.priorityReclassificationRequested}
                    aria-label="Unsure about this category"
                    aria-pressed={workOrder.priorityFeedback?.vote === "neutral"}
                    title="Mark this AI decision as uncertain"
                    onClick={() => onCategoryFeedback("neutral")}
                  >
                    <Icon name="neutral" size={15} />
                  </button>
                  <button
                    type="button"
                    disabled={busy || workOrder.priorityReclassificationRequested}
                    aria-label="Category is correct"
                    aria-pressed={workOrder.priorityFeedback?.vote === "up"}
                    title="Keep this category and teach Magmo it is correct"
                    onClick={() => onCategoryFeedback("up")}
                  >
                    <Icon name="thumbUp" size={15} />
                  </button>
                  <button
                    type="button"
                    disabled={busy || workOrder.priorityReclassificationRequested}
                    aria-label="Category is incorrect"
                    aria-pressed={workOrder.priorityFeedback?.vote === "down"}
                    title="Reject this category and reclassify the work order"
                    onClick={() => onCategoryFeedback("down")}
                  >
                    <Icon name="thumbDown" size={15} />
                  </button>
                </div>
              ) : null}
            </div>
            <p className={[styles.assignmentSummary, styles.prioritySummary].join(" ")}>
              <Icon name="spark" size={15} />
              <span>{workOrder.priorityReason}</span>
            </p>
            {workOrder.priorityReclassificationRequested ? (
              <span className={styles.reclassifying}>Reclassifying from your feedback…</span>
            ) : null}
          </div>
        ) : null}

        {workOrder.workflowStatus === "scheduled" ? (
          <div className={styles.workflowNotice} data-stage="scheduled">
            <Icon name="calendar" size={16} />
            <div><strong>Scheduled for {workOrder.scheduledFor || "a future date"}</strong>{workOrder.scheduledReason ? <span>{workOrder.scheduledReason}</span> : null}</div>
          </div>
        ) : workOrder.workflowStatus === "on_hold" ? (
          <div className={styles.workflowNotice} data-stage="on_hold">
            <Icon name="history" size={16} />
            <div><strong>Waiting before work can continue</strong><span>{workOrder.holdReason || "No hold reason was recorded."}</span></div>
          </div>
        ) : workOrder.workflowStatus === "inactive" ? (
          <div className={styles.workflowNotice} data-stage="inactive">
            <Icon name="history" size={16} />
            <div><strong>Inactive</strong><span>{workOrder.inactiveReason || "No recorded activity for seven days."}</span></div>
          </div>
        ) : null}

        <WorkOrderConnections
          workOrder={workOrder}
          options={connectionOptions}
          disabled={busy || !editable}
          onSave={onConnectionsChange}
        />

        <section className={styles.peoplePanel}>
          <div className={styles.peopleTabs} role="tablist" aria-label="People">
            <button
              type="button"
              role="tab"
              aria-selected={peopleTab === "assignment"}
              onClick={() => setPeopleTab("assignment")}
            >
              Assignment <span>{workOrder.assignees?.length || 0}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={peopleTab === "participation"}
              onClick={() => setPeopleTab("participation")}
            >
              Participation <span>{workOrder.participants?.length || 0}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={peopleTab === "oversight"}
              onClick={() => setPeopleTab("oversight")}
            >
              Oversight <span>{workOrder.oversightManagers?.length || 0}</span>
            </button>
          </div>

          {peopleTab === "assignment" ? (
            <div role="tabpanel">
              <div className={styles.assignmentRow}>
                <div>
                  <span className={styles.label}>
                    Remote or physical workers
                  </span>
                  {!editable ? (
                    <Assignees assignees={workOrder.assignees} />
                  ) : (
                    <PeopleEditor
                      people={workOrder.assignees}
                      bluefolderAssignees={workOrder.bluefolderAssignees}
                      options={assigneeOptions}
                      role="assignment"
                      allowMode
                      allowSchedule
                      disabled={busy}
                      onSave={(people) => onPeopleChange("assignment", people)}
                    />
                  )}
                </div>
                {workOrder.assignmentSummary ? (
                  <p className={styles.assignmentSummary}>
                    <Icon name="spark" size={15} />
                    <span>{workOrder.assignmentSummary}</span>
                  </p>
                ) : null}
              </div>
              <AssignmentHistory history={workOrder.assignmentHistory} />
            </div>
          ) : peopleTab === "participation" ? (
            <div role="tabpanel">
              <div className={styles.assignmentRow}>
                <div>
                  <span className={styles.label}>
                    Advice and coordination contributors
                  </span>
                  {editable ? (
                    <PeopleEditor
                      people={workOrder.participants}
                      options={assigneeOptions}
                      role="participation"
                      disabled={busy}
                      onSave={(people) => onPeopleChange("participation", people)}
                    />
                  ) : (
                    <Assignees assignees={workOrder.participants} emptyLabel="No participation recorded" />
                  )}
                </div>
                {workOrder.participationSummary ? (
                  <p className={styles.assignmentSummary}>
                    <Icon name="spark" size={15} />
                    <span>{workOrder.participationSummary}</span>
                  </p>
                ) : null}
              </div>
              <ParticipationHistory history={workOrder.participationHistory} />
            </div>
          ) : (
            <div role="tabpanel">
              <div className={styles.assignmentRow}>
                <div>
                  <span className={styles.label}>Clock-out approval managers</span>
                  {editable ? (
                    <PeopleEditor
                      people={workOrder.oversightManagers || []}
                      options={assigneeOptions}
                      role="oversight"
                      disabled={busy}
                      onSave={(people) => onPeopleChange("oversight", people)}
                    />
                  ) : (
                    <Assignees assignees={workOrder.oversightManagers || []} emptyLabel="No oversight manager" />
                  )}
                </div>
                <p className={styles.assignmentSummary}>
                  <Icon name="spark" size={15} />
                  <span>{workOrder.oversightSummary || "Select a manager who must approve engineer clock-out requests."}</span>
                </p>
              </div>
            </div>
          )}
        </section>

        <WorkflowStageHistory workOrder={workOrder} />
        <OpsUpdateHistory
          history={workOrder.opsUpdates}
          open={updatesOpen}
          onToggle={setUpdatesOpen}
        />
        <PartMovements
          history={workOrder.partMovements}
          open={partsOpen}
          onToggle={setPartsOpen}
        />
        <InventoryMovementsV2
          movements={workOrder.inventoryMovements || []}
          disabled={busy}
          onUpdateMovement={onUpdateInventoryMovement}
        />

        <div className={styles.cardFooter}>
          <div className={styles.links}>
            {workOrder.slackPermalink ? (
              <a
                href={workOrder.slackPermalink}
                target="_blank"
                rel="noreferrer"
                draggable="false"
              >
                Slack thread <Icon name="external" size={14} />
              </a>
            ) : null}
            {workOrder.bluefolderUrl ? (
              <a
                href={workOrder.bluefolderUrl}
                target="_blank"
                rel="noreferrer"
                draggable="false"
              >
                BlueFolder <Icon name="external" size={14} />
              </a>
            ) : null}
          </div>
          <div className={styles.footerActions}>
            <button
              className={styles.updateButton}
              type="button"
              disabled={busy}
              onClick={generateUpdate}
            >
              <Icon name="spark" size={16} />
              {busy ? "Updating..." : "Update"}
            </button>
            <button
              className={styles.updateButton}
              type="button"
              disabled={busy}
              onClick={generateParts}
              title="Create a concise parts summary in Magmo only"
            >
              <Icon name="package" size={16} />
              {busy ? "Generating..." : "Parts"}
            </button>
            <button
              className={styles.updateButton}
              type="button"
              disabled={busy}
              onClick={onOpenNotes}
              title="View or add client and machine notes"
            >
              <Icon name="notes" size={16} />
              Notes
            </button>
            {!completed && !["service_complete", "done", "closed"].includes(workOrder.workflowStatus) ? (
              <label className={styles.stageMovePicker}>
                <span className={styles.srOnly}>Move work order</span>
                <select
                  value=""
                  disabled={busy}
                  onChange={(event) => {
                    const target = event.target.value;
                    event.target.value = "";
                    if (target) onMoveStage(target);
                  }}
                >
                  <option value="">Move to…</option>
                  {[
                    ["unassigned", "Unassigned"],
                    ["remote", "Remote"],
                    ["active", "Active"],
                    ["scheduled", "Scheduled"],
                    ["on_hold", "On hold"],
                    ["inactive", "Inactive"],
                  ].filter(([stage]) => stage !== workOrder.workflowStatus).map(([stage, label]) => (
                    <option key={stage} value={stage}>{label}</option>
                  ))}
                </select>
              </label>
            ) : null}
            {!completed ? (
              <>
                {workOrder.workflowStatus !== "service_complete" ? (
                  <button
                    className={styles.serviceCompleteButton}
                    type="button"
                    disabled={busy}
                    onClick={onServiceComplete}
                  >
                    <Icon name="check" size={16} />
                    Mark service complete
                  </button>
                ) : null}
              <button
                className={styles.doneButton}
                type="button"
                disabled={busy}
                onClick={onComplete}
              >
                <Icon name="check" size={16} />
                Mark done
              </button>
              </>
            ) : null}
            {workOrder.workflowStatus !== "closed" ? (
              <button
                className={styles.closeButton}
                type="button"
                disabled={busy}
                onClick={onClose}
              >
                <Icon name="check" size={16} />
                Move to closed
              </button>
            ) : null}
            {["service_complete", "done", "closed"].includes(workOrder.workflowStatus) ? (
              <button
                className={styles.reopenButton}
                type="button"
                disabled={busy}
                onClick={onReopen}
              >
                <Icon name="refresh" size={16} />
                Reopen
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function OpsPageContent() {
  const { authUser, loading: authLoading } = useAuth();
  const [unassigned, setUnassigned] = useState([]);
  const [active, setActive] = useState([]);
  const [remote, setRemote] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [onHold, setOnHold] = useState([]);
  const [inactive, setInactive] = useState([]);
  const [serviceComplete, setServiceComplete] = useState([]);
  const [done, setDone] = useState([]);
  const [closed, setClosed] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [connectionOptions, setConnectionOptions] = useState({
    clients: [],
    machines: [],
    trailers: [],
  });
  const [tab, setTab] = useState("active");
  const [activeSupportMode, setActiveSupportMode] = useState("remote");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesWorkOrder, setNotesWorkOrder] = useState(null);
  const workOrderCursorRef = useRef("");
  const workOrderIndexRef = useRef(new Map());
  const workOrderRequestRef = useRef(null);
  const lastAutoSelectedSearchKeyRef = useRef("");
  const priorityTierSource = useMemo(
    () => [
      ...unassigned,
      ...remote,
      ...active,
      ...scheduled,
      ...onHold,
      ...inactive,
      ...serviceComplete,
      ...done,
      ...closed,
    ],
    [active, closed, done, inactive, onHold, remote, scheduled, serviceComplete, unassigned]
  );
  const categoryTiers = useMemo(
    () => buildPriorityTierConfig(priorityTierSource),
    [priorityTierSource]
  );
  const activeQueue = useMemo(
    () => sortActiveWorkOrders([...remote, ...active], categoryTiers),
    [active, categoryTiers, remote]
  );

  const publishWorkOrders = useCallback(() => {
    const groups = {
      unassigned: [],
      active: [],
      remote: [],
      scheduled: [],
      on_hold: [],
      inactive: [],
      service_complete: [],
      done: [],
      closed: [],
    };
    workOrderIndexRef.current.forEach((workOrder) => {
      const stage = groups[workOrder.workflowStatus]
        ? workOrder.workflowStatus
        : "unassigned";
      groups[stage].push(workOrder);
    });
    const queueSort = (left, right) =>
      Number(left.priorityOrder || 0) - Number(right.priorityOrder || 0) ||
      Number(left.priorityRank || 0) - Number(right.priorityRank || 0) ||
      Date.parse(left.createdAt || 0) - Date.parse(right.createdAt || 0);
    ["unassigned", "active", "remote", "on_hold"].forEach((stage) =>
      groups[stage].sort(queueSort)
    );
    groups.scheduled.sort(
      (left, right) =>
        Date.parse(left.scheduledFor || "9999-12-31") -
          Date.parse(right.scheduledFor || "9999-12-31") ||
        queueSort(left, right)
    );
    groups.inactive.sort(
      (left, right) =>
        Date.parse(right.lastActivityAt || 0) -
        Date.parse(left.lastActivityAt || 0)
    );
    groups.service_complete.sort(
      (left, right) =>
        Date.parse(right.serviceCompletedAt || right.lastActivityAt || 0) -
        Date.parse(left.serviceCompletedAt || left.lastActivityAt || 0)
    );
    groups.done.sort(
      (left, right) =>
        Date.parse(right.completedAt || right.lastActivityAt || 0) -
        Date.parse(left.completedAt || left.lastActivityAt || 0)
    );
    groups.closed.sort(
      (left, right) =>
        Date.parse(right.closedAt || right.lastActivityAt || 0) -
        Date.parse(left.closedAt || left.lastActivityAt || 0)
    );
    setUnassigned(groups.unassigned);
    setActive(groups.active);
    setRemote(groups.remote);
    setScheduled(groups.scheduled);
    setOnHold(groups.on_hold);
    setInactive(groups.inactive);
    setServiceComplete(groups.service_complete);
    setDone(groups.done.slice(0, 150));
    setClosed(groups.closed.slice(0, 150));
  }, []);

  const loadWorkOrders = useCallback(async (quiet = false) => {
    if (workOrderRequestRef.current) return workOrderRequestRef.current;
    if (!quiet) setRefreshing(true);
    const request = (async () => {
      try {
        let fetchMore = true;
        let incrementalCursor = quiet ? workOrderCursorRef.current : "";
        let page = 0;
        while (fetchMore && page < 5) {
          const params = new URLSearchParams({
            includeConnections: !quiet && page === 0 ? "1" : "0",
          });
          if (incrementalCursor) params.set("since", incrementalCursor);
          const data = await opsRequest(`/api/ops/work-orders?${params}`);
          if (data.incremental) {
            (data.changes || []).forEach((workOrder) => {
              if (!workOrder?.id) return;
              if (workOrder.deleted) workOrderIndexRef.current.delete(workOrder.id);
              else workOrderIndexRef.current.set(workOrder.id, workOrder);
            });
          } else {
            const all = [
              ...(data.unassigned || []),
              ...(data.active || []),
              ...(data.remote || []),
              ...(data.scheduled || []),
              ...(data.onHold || []),
              ...(data.inactive || []),
              ...(data.serviceComplete || []),
              ...(data.done || data.completed || []),
              ...(data.closed || []),
            ];
            workOrderIndexRef.current = new Map(
              all.filter((item) => item?.id).map((item) => [item.id, item])
            );
          }
          publishWorkOrders();
          workOrderCursorRef.current = data.cursor || workOrderCursorRef.current;
          incrementalCursor = workOrderCursorRef.current;
          fetchMore = Boolean(data.hasMore);
          page += 1;
          if (Array.isArray(data.assigneeOptions)) {
            setAssigneeOptions(data.assigneeOptions);
          }
          if (data.connectionOptions) setConnectionOptions(data.connectionOptions);
        }
        setError("");
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
        workOrderRequestRef.current = null;
      }
    })();
    workOrderRequestRef.current = request;
    return request;
  }, [publishWorkOrders]);

  useSingleTabPolling({
    enabled: !authLoading && Boolean(authUser?.uid),
    intervalMs: 60_000,
    leaseKey: "ops-work-orders-v2",
    poll: loadWorkOrders,
  });

  const changePriorityTier = async (workOrder, priorityTier) => {
    if (!workOrder?.id || !priorityTier) return;
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "reorder",
          orderedIds: [workOrder.id],
          tierById: { [workOrder.id]: priorityTier },
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const completeWorkOrder = async (workOrder) => {
    const confirmed = window.confirm(
      `Move work order #${workOrder.number} to Done? A final summary will be saved, and the temporary Slack chat log will be retained until the work order is Closed.`
    );
    if (!confirmed) return;
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "complete",
          workOrderId: workOrder.id,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const generateWorkOrderUpdate = async (workOrder) => {
    setBusyId(workOrder.id);
    try {
      const result = await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "generate_update",
          workOrderId: workOrder.id,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setBusyId("");
    }
  };

  const saveWorkOrderAssignment = async (workOrder, assigneeIds) => {
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "assign",
          workOrderId: workOrder.id,
          assigneeIds,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setBusyId("");
    }
  };

  const saveWorkOrderConnections = async (workOrder, connections) => {
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "update_connections",
          workOrderId: workOrder.id,
          clientId: connections.clientId,
          machineId: connections.machineId,
          trailerId: connections.trailerId,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setBusyId("");
    }
  };

  const saveWorkOrderPeople = async (workOrder, role, people) => {
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "update_people",
          workOrderId: workOrder.id,
          role,
          people,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setBusyId("");
    }
  };

  const moveWorkOrderStage = async (workOrder, targetStage) => {
    const currentStage = workOrder.workflowStatus || "unassigned";
    const terminalStages = ["service_complete", "done", "closed"];
    const targetIsTerminal = terminalStages.includes(targetStage);
    const currentIsTerminal = terminalStages.includes(currentStage);
    let scheduledFor = "";
    let reason = "";
    if (targetStage === "scheduled") {
      scheduledFor = window.prompt(
        `Schedule work order #${workOrder.number} for which date? Use YYYY-MM-DD.`,
        ""
      )?.trim();
      if (!scheduledFor) return;
      reason = window.prompt(
        "Optional scheduling note (technician, visit window, or dependency):",
        ""
      )?.trim() || "";
    } else if (targetStage === "on_hold") {
      reason = window.prompt(
        "What specific part, customer response, approval, access, or other dependency is this work order waiting for?",
        ""
      )?.trim();
      if (!reason) return;
    } else if (targetStage === "inactive") {
      reason = window.prompt(
        "Optional reason for moving this work order to Inactive:",
        ""
      )?.trim() || "";
    }
    if (targetIsTerminal && targetStage !== currentStage) {
      const confirmed = window.confirm(
        `Move work order #${workOrder.number} to ${WORKFLOW_LABELS[targetStage]}?`
      );
      if (!confirmed) return;
    }
    const hasPendingAiDecision = Boolean(
      workOrder.aiWorkflowDecision && !workOrder.aiWorkflowDecision.reviewed
    );
    let feedbackReason = "";
    if (hasPendingAiDecision && targetStage !== currentStage) {
      feedbackReason = window.prompt(
        "Optional: briefly tell Magmo why this work order belongs in the selected section.",
        ""
      )?.trim() || "";
    }
    setBusyId(workOrder.id);
    try {
      let result = { workOrder };
      if (targetStage !== currentStage) {
        if (!targetIsTerminal) {
          result = await opsRequest("/api/ops/work-orders", {
            method: "PATCH",
            body: JSON.stringify({
              action: currentIsTerminal ? "reopen" : "move_stage",
              workOrderId: workOrder.id,
              targetStage,
              scheduledFor,
              reason,
            }),
          });
        } else {
          if (
            currentIsTerminal &&
            !(
              (currentStage === "service_complete" && targetStage === "done") ||
              targetStage === "closed"
            )
          ) {
            await opsRequest("/api/ops/work-orders", {
              method: "PATCH",
              body: JSON.stringify({
                action: "reopen",
                workOrderId: workOrder.id,
                targetStage: "active",
              }),
            });
          }
          const action =
            targetStage === "service_complete"
              ? "service_complete"
              : targetStage === "done"
              ? "complete"
              : "close";
          result = await opsRequest("/api/ops/work-orders", {
            method: "PATCH",
            body: JSON.stringify({ action, workOrderId: workOrder.id }),
          });
        }
      }
      if (hasPendingAiDecision) {
        await opsRequest("/api/ops/work-orders", {
          method: "PATCH",
          body: JSON.stringify({
            action: "review_workflow_decision",
            workOrderId: workOrder.id,
            correctedStage: targetStage,
            feedbackReason,
          }),
        });
      }
      await loadWorkOrders(true);
      setTab(result.workOrder?.workflowStatus || targetStage);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const openSystemNotes = (workOrder = null) => {
    setNotesWorkOrder(workOrder);
    setNotesOpen(true);
  };

  const generateWorkOrderParts = async (workOrder) => {
    setBusyId(workOrder.id);
    try {
      const result = await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "generate_parts",
          workOrderId: workOrder.id,
        }),
      });
      await loadWorkOrders(true);
      setError("");
      if (result.noMaterialChange || result.reused) {
        window.alert("No new operational information was found. The previous update was kept.");
      }
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setBusyId("");
    }
  };

  const updateInventoryMovement = async (
    workOrder,
    movementId,
    disposition,
    options = {}
  ) => {
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "update_inventory_movement",
          workOrderId: workOrder.id,
          movementId,
          disposition,
          ...(options.updateSwapLink
            ? {
                updateSwapLink: true,
                swapMovementId: options.swapMovementId || "",
              }
            : {}),
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setBusyId("");
    }
  };

  const deleteWorkOrder = async (workOrder) => {
    const confirmed = window.confirm(
      `Delete work order #${workOrder.number} from Magmo Ops? This is recoverable in Firestore but it will disappear from all Ops tabs.`
    );
    if (!confirmed) return;
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "delete",
          workOrderId: workOrder.id,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const serviceCompleteWorkOrder = async (workOrder) => {
    const confirmed = window.confirm(
      `Mark field service complete for work order #${workOrder.number}? Slack tracking will continue until !done is used.`
    );
    if (!confirmed) return;
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "service_complete",
          workOrderId: workOrder.id,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const closeWorkOrder = async (workOrder) => {
    const confirmed = window.confirm(
      `Move work order #${workOrder.number} to Closed? It will remain searchable and visible in the Closed tab.`
    );
    if (!confirmed) return;
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "close",
          workOrderId: workOrder.id,
        }),
      });
      await loadWorkOrders(true);
      setTab("closed");
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const reopenWorkOrder = async (workOrder) => {
    const confirmed = window.confirm(
      `Reopen work order #${workOrder.number} and move it back into active circulation? A notice will be added to its Slack thread.`
    );
    if (!confirmed) return;
    setBusyId(workOrder.id);
    try {
      const result = await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "reopen",
          workOrderId: workOrder.id,
          targetStage: "active",
        }),
      });
      await loadWorkOrders(true);
      setTab(result.workOrder?.workflowStatus || "active");
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const recoverWorkOrder = async () => {
    const workOrderNumber = window.prompt(
      "Enter the work order number to recover from Slack dispatch:",
      ""
    )?.trim();
    if (!workOrderNumber) return;
    if (!/^#?\d{3,12}$/.test(workOrderNumber)) {
      setError("Enter a valid numeric work order number.");
      return;
    }
    setBusyId("recover");
    try {
      const result = await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "recover",
          workOrderNumber: workOrderNumber.replace(/^#/, ""),
        }),
      });
      await loadWorkOrders(true);
      setQuery(String(result.workOrder?.number || workOrderNumber).replace(/^#/, ""));
      setTab(result.workflowStatus || "active");
      setError("");
      const warning = result.warnings?.length
        ? `\n\n${result.warnings.join(" ")}`
        : "";
      window.alert(
        `Work order #${result.workOrder?.number || workOrderNumber} was recovered to ${
          result.workflowStageLabel || result.workflowStatus || "Ops"
        } from ${result.sourceMessageCount || 0} Slack messages.${warning}`
      );
    } catch (requestError) {
      setError(requestError.message);
      window.alert(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const submitCategoryFeedback = async (workOrder, vote) => {
    let reason = "";
    let correctedTier = "";
    if (vote === "down") {
      reason = window.prompt(
        "Briefly explain why this category is wrong and what evidence the AI should have used:",
        ""
      )?.trim();
      if (!reason) return;
      const correction = window.prompt(
        "Where should this work order go instead? Enter Hard down, ASAP, Soon, or Anytime:",
        "ASAP"
      );
      if (correction === null) return;
      const normalized = correction.trim().toLowerCase().replace(/[^a-z]+/g, "_");
      correctedTier = {
        hard_down: "hard_down",
        asap: "in_progress",
        in_progress: "in_progress",
        soon: "needs_scheduled",
        needs_to_be_scheduled: "needs_scheduled",
        needs_scheduled: "needs_scheduled",
        anytime: "anytime",
      }[normalized] || "";
      if (!correctedTier) {
        setError("Choose Hard down, ASAP, Soon, or Anytime.");
        return;
      }
    }
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "category_feedback",
          workOrderId: workOrder.id,
          vote,
          reason,
          correctedTier,
        }),
      });
      await loadWorkOrders(true);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyId("");
    }
  };

  const workOrdersByTab = useMemo(
    () => ({
      unassigned,
      active: activeQueue,
      scheduled,
      on_hold: onHold,
      inactive,
      service_complete: serviceComplete,
      done,
      closed,
    }),
    [activeQueue, closed, done, inactive, onHold, scheduled, serviceComplete, unassigned]
  );
  const filteredByTab = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const numberNeedle = needle
      .replace(/^work\s*order\s*/i, "")
      .replace(/^wo\s*/i, "")
      .replace(/^#\s*/, "")
      .trim();
    return Object.fromEntries(
      Object.entries(workOrdersByTab).map(([stage, workOrders]) => [
        stage,
        !needle
          ? workOrders
          : workOrders.filter((workOrder) => {
              const haystack = [
                workOrder.number,
                workOrder.subject,
                workOrder.customer,
                ...(workOrder.assignees || []).map((assignee) => assignee.name),
                ...(workOrder.participants || []).map(
                  (participant) => participant.name
                ),
              ]
                .join(" ")
                .toLowerCase();
              return (
                haystack.includes(needle) ||
                (numberNeedle &&
                  String(workOrder.number || "")
                    .toLowerCase()
                    .includes(numberNeedle))
              );
            }),
      ])
    );
  }, [query, workOrdersByTab]);
  const tabCounts = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(filteredByTab).map(([stage, workOrders]) => [
          stage,
          workOrders.length,
        ])
      ),
    [filteredByTab]
  );
  const activeSupportCounts = useMemo(() => {
    const counts = { remote: 0, hybrid: 0, in_person: 0 };
    (filteredByTab.active || []).forEach((workOrder) => {
      const mode = supportModeForWorkOrder(workOrder);
      if (mode && Object.hasOwn(counts, mode)) counts[mode] += 1;
    });
    return counts;
  }, [filteredByTab]);
  const searchResultKey = useMemo(
    () => buildOpsSearchResultKey(query, filteredByTab),
    [filteredByTab, query]
  );
  useEffect(() => {
    if (!searchResultKey) {
      lastAutoSelectedSearchKeyRef.current = "";
      return;
    }
    if (lastAutoSelectedSearchKeyRef.current === searchResultKey) return;
    lastAutoSelectedSearchKeyRef.current = searchResultKey;
    const bestTab = bestOpsSearchTab(tabCounts);
    if (bestTab) {
      setTab(bestTab);
      if (bestTab === "active" && filteredByTab.active?.length) {
        const matchingMode = supportModeForWorkOrder(filteredByTab.active[0]);
        if (matchingMode) setActiveSupportMode(matchingMode);
      }
    }
  }, [filteredByTab, searchResultKey, tabCounts]);
  const source = tab === "requests" ? [] : workOrdersByTab[tab] || activeQueue;
  const filteredForStage = query.trim()
    ? filteredByTab[tab] || []
    : source;
  const filtered = tab === "active"
    ? filteredForStage.filter(
        (workOrder) => supportModeForWorkOrder(workOrder) === activeSupportMode
      )
    : filteredForStage;

  return (
    <div className={styles.page}>
      <Head>
        <title>Ops | Magmo</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandBlock}>
            <Link
              href="/Warehousedb/WarehouseSelect"
              className={styles.backLink}
              aria-label="Back to Warehouse DB">

              <Icon name="back" size={18} />

            </Link>
            <div className={styles.brandMark}>
              <span />
              <span />
              <span />
            </div>
            <div>
              <div className={styles.kicker}>MAGMO OPERATIONS</div>
              <h1>Work order queue</h1>
            </div>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.liveStatus}>
              <span />
              Slack sync active
            </div>
            <button
              type="button"
              className={styles.calendarButton}
              onClick={() => openSystemNotes()}
            >
              <Icon name="notes" size={17} />
              Client system notes
            </button>
            <Link href="/Ops/calendar" className={styles.calendarButton}>
              <Icon name="calendar" size={17} />
              Calendar
            </Link>
            <button
              className={styles.refreshButton}
              type="button"
              onClick={() => loadWorkOrders()}
              disabled={refreshing}
            >
              <span className={refreshing ? styles.spinning : ""}>
                <Icon name="refresh" size={17} />
              </span>
              Refresh
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <div>
            <h2>Dispatch control</h2>
            <p>
              Priority sets each queue position automatically. Within a priority,
              the work order with the newest Slack message appears first.
            </p>
          </div>
        </section>

        <section className={styles.queuePanel}>
          <div className={styles.toolbar}>
            <div className={styles.tabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "requests"}
                className={tab === "requests" ? styles.activeTab : ""}
                onClick={() => {
                  setQuery("");
                  setTab("requests");
                }}
              >
                Requests
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "unassigned"}
                className={tab === "unassigned" ? styles.activeTab : ""}
                onClick={() => setTab("unassigned")}
              >
                Unassigned <span>{tabCounts.unassigned}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "active"}
                className={tab === "active" ? styles.activeTab : ""}
                onClick={() => setTab("active")}
              >
                Active <span>{tabCounts.active}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "scheduled"}
                className={tab === "scheduled" ? styles.activeTab : ""}
                onClick={() => setTab("scheduled")}
              >
                Scheduled <span>{tabCounts.scheduled}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "on_hold"}
                className={tab === "on_hold" ? styles.activeTab : ""}
                onClick={() => setTab("on_hold")}
              >
                On hold <span>{tabCounts.on_hold}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "inactive"}
                className={tab === "inactive" ? styles.activeTab : ""}
                onClick={() => setTab("inactive")}
              >
                Inactive <span>{tabCounts.inactive}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "service_complete"}
                className={tab === "service_complete" ? styles.activeTab : ""}
                onClick={() => setTab("service_complete")}
              >
                Service complete <span>{tabCounts.service_complete}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "done"}
                className={tab === "done" ? styles.activeTab : ""}
                onClick={() => setTab("done")}
              >
                Done <span>{tabCounts.done}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "closed"}
                className={tab === "closed" ? styles.activeTab : ""}
                onClick={() => setTab("closed")}
              >
                Closed <span>{tabCounts.closed}</span>
              </button>
            </div>
            {tab !== "requests" ? (
              <div className={styles.searchActions}>
                {authUser?.isMasterAdmin ? (
                  <button
                    type="button"
                    className={styles.recoverButton}
                    disabled={busyId === "recover"}
                    onClick={recoverWorkOrder}
                  >
                    <Icon name="refresh" size={15} />
                    {busyId === "recover" ? "Recovering…" : "Recover"}
                  </button>
                ) : null}
                <label className={styles.search}>
                  <Icon name="search" size={17} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search every tab"
                    aria-label="Search work orders"
                  />
                </label>
              </div>
            ) : null}
          </div>

          {error ? <div className={styles.errorBanner}>{error}</div> : null}
          {tab === "active" ? (
            <div className={styles.activeSupportBar}>
              <div
                className={styles.supportTabs}
                role="tablist"
                aria-label="Active support type"
              >
                {[
                  ["remote", "Remote"],
                  ["hybrid", "Hybrid"],
                  ["in_person", "In-person"],
                ].map(([mode, label]) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSupportMode === mode}
                    className={
                      activeSupportMode === mode ? styles.activeSupportTab : ""
                    }
                    onClick={() => setActiveSupportMode(mode)}
                    key={mode}
                  >
                    {label} <span>{activeSupportCounts[mode]}</span>
                  </button>
                ))}
              </div>
              <p>Hard down first, then ASAP, Soon, and Anytime · newest Slack activity first within each priority</p>
            </div>
          ) : null}

          {tab === "requests" ? (
            <ServiceRequestsPanel />
          ) : (
          <div className={styles.queue}>
            {loading ? (
              [0, 1, 2].map((item) => (
                <div className={styles.skeleton} key={item}>
                  <span />
                  <div>
                    <i />
                    <b />
                    <i />
                  </div>
                </div>
              ))
            ) : filtered.length ? (
              filtered.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  completed={["done", "closed"].includes(tab)}
                  priorityEditable
                  showCategoryFeedback={tab === "active"}
                  showSupportModeBadge={[
                    "on_hold",
                    "service_complete",
                    "done",
                  ].includes(tab)}
                  editable
                  busy={busyId === workOrder.id}
                  onTierChange={(priorityTier) =>
                    changePriorityTier(workOrder, priorityTier)
                  }
                  tierOptions={categoryTiers}
                  onCategoryFeedback={(vote) =>
                    submitCategoryFeedback(workOrder, vote)
                  }
                  onGenerateUpdate={() =>
                    generateWorkOrderUpdate(workOrder)
                  }
                  onGenerateParts={() =>
                    generateWorkOrderParts(workOrder)
                  }
                  onComplete={() => completeWorkOrder(workOrder)}
                  onServiceComplete={() =>
                    serviceCompleteWorkOrder(workOrder)
                  }
                  assigneeOptions={assigneeOptions}
                  connectionOptions={connectionOptions}
                  onAssign={(assigneeIds) =>
                    saveWorkOrderAssignment(workOrder, assigneeIds)
                  }
                  onPeopleChange={(role, people) =>
                    saveWorkOrderPeople(workOrder, role, people)
                  }
                  onConnectionsChange={(connections) =>
                    saveWorkOrderConnections(workOrder, connections)
                  }
                  onUpdateInventoryMovement={(movementId, disposition) =>
                    updateInventoryMovement(workOrder, movementId, disposition)
                  }
                  onDelete={() => deleteWorkOrder(workOrder)}
                  onClose={() => closeWorkOrder(workOrder)}
                  onReopen={() => reopenWorkOrder(workOrder)}
                  onMoveStage={(targetStage) =>
                    moveWorkOrderStage(workOrder, targetStage)
                  }
                  onReviewWorkflow={(targetStage) =>
                    moveWorkOrderStage(workOrder, targetStage)
                  }
                  onOpenNotes={() => openSystemNotes(workOrder)}
                  canDelete={Boolean(authUser?.isMasterAdmin)}
                />
              ))
            ) : (
              <EmptyState
                stage={tab}
                searching={Boolean(query.trim())}
                supportMode={tab === "active" ? activeSupportMode : ""}
              />
            )}
          </div>
          )}
        </section>
      </main>
      <ClientSystemNotesModal
        open={notesOpen}
        initialWorkOrder={notesWorkOrder}
        onClose={() => {
          setNotesOpen(false);
          setNotesWorkOrder(null);
        }}
      />
    </div>
  );
}

export default function OpsPage() {
  return (
    <LoggedIn requiredRole={USER_ROLES.ADMIN}>
      <OpsPageContent />
    </LoggedIn>
  );
}
