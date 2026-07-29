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
import styles from "../../styles/Ops.module.css";
import LoggedIn from "../LoggedIn";
import { USER_ROLES } from "../../utils/authAccess";
import ServiceRequestsPanel from "../../components/Ops/ServiceRequestsPanel";

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
    thumbUp: <path d="M7 10v10H4V10h3Zm3 10V9l4-6 2 1v5h4l-1 11h-9Z" />,
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
  in_progress: "Active",
  service_complete: "Service complete",
  done: "Done",
  completed: "Done",
};

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
    label: "In progress",
    level: "Active",
    description: "Work is actively being handled",
  },
  {
    id: "needs_scheduled",
    label: "Needs to be scheduled",
    level: "Medium",
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

function groupActiveQueue(items, tiers = buildPriorityTierConfig(items)) {
  return tiers.flatMap((tier) =>
    items.filter(
      (item) => (item.priorityTier || "needs_scheduled") === tier.id
    )
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

function EmptyState({ stage, searching }) {
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
    service_complete: {
      title: "Nothing is service complete",
      detail: "Work orders move here when !complete is used in Slack.",
    },
    done: {
      title: "Nothing is done yet",
      detail:
        "Finalized work orders remain here after !done saves the closeout and removes the temporary chat log.",
    },
  }[stage] || {};
  return (
    <div className={styles.empty}>
      <div className={styles.emptyMark}>
        <Icon name={stage === "done" ? "check" : "spark"} size={26} />
      </div>
      <h2>{searching ? "No matching work orders" : copy.title}</h2>
      <p>
        {searching
          ? "Try a different work-order number, title, customer, or assignee."
          : copy.detail}
      </p>
    </div>
  );
}

function Assignees({ assignees }) {
  if (!assignees?.length) {
    return (
      <div className={styles.unassigned}>
        <span className={styles.unassignedDot} />
        Unassigned
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
          <span>{assignee.name}</span>
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
          {["unassigned", "active", "remote", "service_complete", "done"]
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
            <strong>Assign dispatch owners</strong>
            <span>
              {bluefolderAssignees.length
                ? "BlueFolder keeps " +
                  assignmentNames(bluefolderAssignees) +
                  " assigned; select any additional helpers"
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
function OpsUpdateHistory({ history = [], open, onToggle }) {
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
      {history.length ? (
        <div className={styles.historyTimeline}>
          {[...history].reverse().map((entry, index) => (
            <div
              className={[styles.historyEvent, styles.updateEvent].join(" ")}
              key={entry.id || entry.generatedAtIso || "ops-update-" + index}
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
          ))}
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

function PartMovements({ history = [] }) {
  return (
    <details
      className={[styles.historyPanel, styles.partMovementsPanel].join(" ")}
      draggable={false}
    >
      <summary>
        <span>
          <Icon name="package" size={16} /> Part movements
        </span>
        <span className={styles.historyCount}>{history.length}</span>
      </summary>
      {history.length ? (
        <div className={styles.partMovementsBody}>
          {[...history].reverse().map((entry, index) => (
            <div
              className={styles.partMovementEntry}
              key={entry.id || entry.generatedAtIso || `parts-${index}`}
            >
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
                    <li
                      key={`${movement.partName}-${movement.movement}-${movementIndex}`}
                    >
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
          ))}
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

function WorkOrderCard({
  workOrder,
  index,
  count,
  completed,
  priorityEnabled,
  editable,
  dragging,
  dragTarget,
  busy,
  onDragStart,
  onDragEnter,
  onDrop,
  onDragEnd,
  onMove,
  onComplete,
  onServiceComplete,
  onGenerateUpdate,
  onTierChange,
  onCategoryFeedback,
  tierOptions,
  onAssign,
  onDelete,
  assigneeOptions,
}) {
  const [updatesOpen, setUpdatesOpen] = useState(
    Boolean(workOrder.opsUpdates?.length)
  );

  const generateUpdate = async () => {
    await onGenerateUpdate();
    setUpdatesOpen(true);
  };
  const workModeLabel =
    workOrder.workMode === "remote"
      ? "remote"
      : workOrder.workMode === "in_person"
      ? "in person"
      : workOrder.workMode === "mixed"
      ? "remote + in person"
      : "";

  return (
    <article
      className={[
        styles.workOrder,
        dragging ? styles.dragging : "",
        dragTarget ? styles.dragTarget : "",
        completed ? styles.completedCard : "",
      ].join(" ")}
      draggable={priorityEnabled && !busy}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={(event) => {
        if (priorityEnabled) event.preventDefault();
      }}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
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
      <div className={styles.priorityRail}>
        {priorityEnabled ? (
          <>
            <button
              className={styles.dragHandle}
              type="button"
              aria-label={`Drag priority ${index + 1}`}
              title="Drag to reprioritize"
            >
              <Icon name="grip" size={22} />
            </button>
            <span className={styles.priorityNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.mobileMoves}>
              <button
                type="button"
                disabled={index === 0 || busy}
                onClick={() => onMove(-1)}
                aria-label="Move up"
              >
                <Icon name="arrow" size={16} />
              </button>
              <button
                type="button"
                disabled={index === count - 1 || busy}
                onClick={() => onMove(1)}
                aria-label="Move down"
              >
                <span className={styles.downArrow}>
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            </div>
          </>
        ) : (
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
                ["service_complete", "done"].includes(workOrder.workflowStatus)
                  ? "check"
                  : "spark"
              }
              size={20}
            />
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <div>
            <div className={styles.eyebrow}>
              <span>WO #{workOrder.number}</span>
              {workOrder.customer ? <span>{workOrder.customer}</span> : null}
              <StatusBadge status={workOrder.workflowStatus} />
            </div>
            <h2>
              {workOrder.subject}
              {workModeLabel ? (
                <span
                  className={styles.workModeTitle}
                  data-mode={workOrder.workMode}
                >
                  ({workModeLabel})
                </span>
              ) : null}
            </h2>
          </div>
          <div className={styles.cardMeta}>
            {priorityEnabled ? (
              <label className={styles.tierPicker}>
                <span>Priority tier</span>
                <select
                  value={workOrder.priorityTier || "needs_scheduled"}
                  disabled={busy}
                  onChange={(event) => onTierChange(event.target.value)}
                >
                  {tierOptions.map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.label}{tier.generated ? " (Generated)" : ""} ({tier.level})
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <span className={styles.activity}>
              {completed ? "Completed " : "Updated "}
              {formatRelativeTime(
                completed ? workOrder.completedAt : workOrder.lastActivityAt
              )}
            </span>
          </div>
        </div>

        {workOrder.priorityReason ? (
          <div className={styles.categoryDecision}>
            <div className={styles.categoryDecisionTop}>
              <span className={styles.categoryName}>
                {workOrder.priorityLabel ||
                  generatedTierLabel(workOrder.priorityTier, "")}
                {workOrder.priorityGenerated ? " (Generated)" : ""}
              </span>
              {priorityEnabled ? (
                <div className={styles.categoryFeedback} aria-label="Category feedback">
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

        <div className={styles.assignmentRow}>
          <div>
            <span className={styles.label}>Dispatch owner</span>
            {!editable ? (
              <Assignees assignees={workOrder.assignees} />
            ) : (
              <AssigneeEditor
                assignees={workOrder.assignees}
                bluefolderAssignees={workOrder.bluefolderAssignees}
                options={assigneeOptions}
                disabled={busy}
                onSave={onAssign}
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
        <WorkflowStageHistory workOrder={workOrder} />
        <OpsUpdateHistory
          history={workOrder.opsUpdates}
          open={updatesOpen}
          onToggle={setUpdatesOpen}
        />
        <PartMovements history={workOrder.partMovements} />

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
          </div>
        </div>
      </div>
    </article>
  );
}

function OpsPageContent() {
  const [unassigned, setUnassigned] = useState([]);
  const [active, setActive] = useState([]);
  const [remote, setRemote] = useState([]);
  const [serviceComplete, setServiceComplete] = useState([]);
  const [done, setDone] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [tab, setTab] = useState("active");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [dragId, setDragId] = useState("");
  const [dragTargetId, setDragTargetId] = useState("");
  const [collapsedTiers, setCollapsedTiers] = useState({});
  const dragRef = useRef("");
  const categoryTiers = useMemo(
    () => buildPriorityTierConfig(active),
    [active]
  );

  const loadWorkOrders = useCallback(async (quiet = false) => {
    if (!quiet) setRefreshing(true);
    try {
      const data = await opsRequest("/api/ops/work-orders");
      if (!dragRef.current) setActive(data.active || []);
      setUnassigned(data.unassigned || []);
      setRemote(data.remote || []);
      setServiceComplete(data.serviceComplete || []);
      setDone(data.done || data.completed || []);
      setAssigneeOptions(data.assigneeOptions || []);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWorkOrders();
    const timer = setInterval(() => loadWorkOrders(true), 15000);
    return () => clearInterval(timer);
  }, [loadWorkOrders]);

  const persistOrder = async (next) => {
    const normalized = groupActiveQueue(next, buildPriorityTierConfig(next));
    setActive(normalized);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "reorder",
          orderedIds: normalized.map((workOrder) => workOrder.id),
          tierById: Object.fromEntries(
            normalized.map((workOrder) => [
              workOrder.id,
              workOrder.priorityTier || "needs_scheduled",
            ])
          ),
        }),
      });
      setError("");
    } catch (requestError) {
      setError(`${requestError.message} The queue has been refreshed.`);
      await loadWorkOrders(true);
    }
  };

  const moveWorkOrder = (sourceId, targetId, targetTier) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const next = [...active];
    const sourceIndex = next.findIndex((item) => item.id === sourceId);
    if (sourceIndex < 0) return;
    const [moved] = next.splice(sourceIndex, 1);
    moved.priorityTier =
      targetTier ||
      next.find((item) => item.id === targetId)?.priorityTier ||
      moved.priorityTier ||
      "needs_scheduled";
    const targetConfig = categoryTiers.find(
      (tier) => tier.id === moved.priorityTier
    );
    moved.priorityLabel = targetConfig?.label || moved.priorityLabel;
    moved.priorityGenerated = Boolean(targetConfig?.generated);
    moved.priorityOrder = targetConfig?.order ?? moved.priorityOrder;
    const targetIndex = next.findIndex((item) => item.id === targetId);
    if (targetIndex < 0) return;
    next.splice(targetIndex, 0, moved);
    persistOrder(next);
  };

  const moveToTier = (workOrderId, priorityTier) => {
    const next = [...active];
    const sourceIndex = next.findIndex((item) => item.id === workOrderId);
    if (sourceIndex < 0) return;
    const [moved] = next.splice(sourceIndex, 1);
    moved.priorityTier = priorityTier;
    const targetConfig = categoryTiers.find((tier) => tier.id === priorityTier);
    moved.priorityLabel = targetConfig?.label || moved.priorityLabel;
    moved.priorityGenerated = Boolean(targetConfig?.generated);
    moved.priorityOrder = targetConfig?.order ?? moved.priorityOrder;
    next.push(moved);
    persistOrder(next);
  };

  const moveByOffset = (workOrderId, offset) => {
    const index = active.findIndex((item) => item.id === workOrderId);
    const targetIndex = index + offset;
    if (index < 0 || targetIndex < 0 || targetIndex >= active.length) return;
    moveWorkOrder(
      workOrderId,
      active[targetIndex].id,
      active[targetIndex].priorityTier
    );
  };

  const toggleTier = (priorityTier) => {
    setCollapsedTiers((current) => ({
      ...current,
      [priorityTier]: !current[priorityTier],
    }));
  };

  const completeWorkOrder = async (workOrder) => {
    const confirmed = window.confirm(
      `Move work order #${workOrder.number} to Done? A final summary will be saved before the temporary Slack chat log is deleted.`
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
      await opsRequest("/api/ops/work-orders", {
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

  const submitCategoryFeedback = async (workOrder, vote) => {
    setBusyId(workOrder.id);
    try {
      await opsRequest("/api/ops/work-orders", {
        method: "PATCH",
        body: JSON.stringify({
          action: "category_feedback",
          workOrderId: workOrder.id,
          vote,
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

  const source = {
    requests: [],
    unassigned,
    active,
    remote,
    service_complete: serviceComplete,
    done,
  }[tab] || active;
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return source;
    return source.filter((workOrder) =>
      [
        workOrder.number,
        workOrder.subject,
        workOrder.customer,
        ...(workOrder.assignees || []).map((assignee) => assignee.name),
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, source]);

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
              Drag a work order higher to raise its priority. Ownership updates
              automatically from the matching Slack conversation.
            </p>
          </div>
          <div className={styles.metricStrip}>
            <div>
              <strong>{unassigned.length}</strong>
              <span>Unassigned</span>
            </div>
            <div>
              <strong>{active.length}</strong>
              <span>Active</span>
            </div>
            <div>
              <strong>{remote.length}</strong>
              <span>Remote</span>
            </div>
            <div>
              <strong>{serviceComplete.length}</strong>
              <span>Service complete</span>
            </div>
            <div>
              <strong>{done.length}</strong>
              <span>Done</span>
            </div>
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
                onClick={() => setTab("requests")}
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
                Unassigned <span>{unassigned.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "active"}
                className={tab === "active" ? styles.activeTab : ""}
                onClick={() => setTab("active")}
              >
                Active <span>{active.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "remote"}
                className={tab === "remote" ? styles.activeTab : ""}
                onClick={() => setTab("remote")}
              >
                Remote <span>{remote.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "service_complete"}
                className={tab === "service_complete" ? styles.activeTab : ""}
                onClick={() => setTab("service_complete")}
              >
                Service complete <span>{serviceComplete.length}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "done"}
                className={tab === "done" ? styles.activeTab : ""}
                onClick={() => setTab("done")}
              >
                Done <span>{done.length}</span>
              </button>
            </div>
            {tab !== "requests" ? (
              <label className={styles.search}>
                <Icon name="search" size={17} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the queue"
                  aria-label="Search work orders"
                />
              </label>
            ) : null}
          </div>

          {error ? <div className={styles.errorBanner}>{error}</div> : null}
          {tab === "active" && active.length ? (
            <div className={styles.priorityHint}>
              <span>HIGHEST PRIORITY</span>
              <div />
              <span>LOWEST PRIORITY</span>
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
              tab === "active" ? (
                <div className={styles.tierList}>
                  {categoryTiers.map((tier) => {
                    const tierOrders = filtered.filter(
                      (workOrder) =>
                        (workOrder.priorityTier || "needs_scheduled") === tier.id
                    );
                    const collapsed = Boolean(collapsedTiers[tier.id]);
                    return (
                      <section
                        className={styles.tierSection}
                        data-tier={tier.id}
                        data-collapsed={collapsed ? "true" : "false"}
                        key={tier.id}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                          if (event.target.closest("article")) return;
                          event.preventDefault();
                          const sourceId =
                            dragRef.current ||
                            event.dataTransfer.getData("text/plain");
                          moveToTier(sourceId, tier.id);
                          dragRef.current = "";
                          setDragId("");
                          setDragTargetId("");
                        }}
                      >
                        <button
                          type="button"
                          className={styles.tierHeader}
                          aria-expanded={!collapsed}
                          aria-controls={`ops-tier-${tier.id}`}
                          onClick={() => toggleTier(tier.id)}
                        >
                          <div>
                            <span className={styles.tierIndicator} />
                            <div>
                              <h3>{tier.label}</h3>
                              {tier.generated ? (
                                <span className={styles.generatedLabel}>(Generated)</span>
                              ) : null}
                              <p>{tier.description}</p>
                            </div>
                          </div>
                          <div className={styles.tierStats}>
                            <div>
                              <strong>{tier.level}</strong>
                              <span>
                                {tierOrders.length}{" "}
                                {tierOrders.length === 1 ? "order" : "orders"}
                              </span>
                            </div>
                            <span
                              className={`${styles.tierChevron} ${
                                collapsed ? styles.tierChevronCollapsed : ""
                              }`}
                            >
                              <Icon name="arrow" size={16} />
                            </span>
                          </div>
                        </button>
                        {!collapsed ? (
                        <div
                          className={styles.tierDropZone}
                          id={`ops-tier-${tier.id}`}
                        >
                          {tierOrders.length ? (
                            tierOrders.map((workOrder) => {
                              const globalIndex = active.findIndex(
                                (item) => item.id === workOrder.id
                              );
                              return (
                                <WorkOrderCard
                                  key={workOrder.id}
                                  workOrder={workOrder}
                                  index={globalIndex}
                                  count={active.length}
                                  completed={false}
                                  priorityEnabled
                                  editable
                                  busy={busyId === workOrder.id}
                                  dragging={dragId === workOrder.id}
                                  dragTarget={
                                    dragTargetId === workOrder.id &&
                                    dragId !== workOrder.id
                                  }
                                  onDragStart={(event) => {
                                    dragRef.current = workOrder.id;
                                    setDragId(workOrder.id);
                                    event.dataTransfer.effectAllowed = "move";
                                    event.dataTransfer.setData(
                                      "text/plain",
                                      workOrder.id
                                    );
                                  }}
                                  onDragEnter={() =>
                                    setDragTargetId(workOrder.id)
                                  }
                                  onDrop={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    moveWorkOrder(
                                      dragRef.current ||
                                        event.dataTransfer.getData("text/plain"),
                                      workOrder.id,
                                      tier.id
                                    );
                                    dragRef.current = "";
                                    setDragId("");
                                    setDragTargetId("");
                                  }}
                                  onDragEnd={() => {
                                    dragRef.current = "";
                                    setDragId("");
                                    setDragTargetId("");
                                  }}
                                  onMove={(offset) =>
                                    moveByOffset(workOrder.id, offset)
                                  }
                                  onTierChange={(priorityTier) =>
                                    moveToTier(workOrder.id, priorityTier)
                                  }
                                  tierOptions={categoryTiers}
                                  onCategoryFeedback={(vote) =>
                                    submitCategoryFeedback(workOrder, vote)
                                  }
                                  onGenerateUpdate={() =>
                                    generateWorkOrderUpdate(workOrder)
                                  }
                                  onComplete={() =>
                                    completeWorkOrder(workOrder)
                                  }
                                  onServiceComplete={() =>
                                    serviceCompleteWorkOrder(workOrder)
                                  }
                                  assigneeOptions={assigneeOptions}
                                  onAssign={(assigneeIds) =>
                                    saveWorkOrderAssignment(
                                      workOrder,
                                      assigneeIds
                                    )
                                  }
                                  onDelete={() => deleteWorkOrder(workOrder)}
                                />
                              );
                            })
                          ) : (
                            <div className={styles.tierEmpty}>
                              Drop a work order here
                            </div>
                          )}
                        </div>
                        ) : null}
                      </section>
                    );
                  })}
                </div>
              ) : (
                filtered.map((workOrder, index) => (
                  <WorkOrderCard
                    key={workOrder.id}
                    workOrder={workOrder}
                    index={index}
                    count={filtered.length}
                    completed={tab === "done"}
                    priorityEnabled={false}
                    editable={tab !== "done"}
                    busy={busyId === workOrder.id}
                    dragging={false}
                    dragTarget={false}
                    onDragStart={() => {}}
                    onDragEnter={() => {}}
                    onDrop={() => {}}
                    onDragEnd={() => {}}
                    onMove={() => {}}
                    onTierChange={() => {}}
                    tierOptions={categoryTiers}
                    onCategoryFeedback={() => {}}
                    onGenerateUpdate={() =>
                      generateWorkOrderUpdate(workOrder)
                    }
                    onComplete={() => completeWorkOrder(workOrder)}
                    onServiceComplete={() =>
                      serviceCompleteWorkOrder(workOrder)
                    }
                    assigneeOptions={assigneeOptions}
                    onAssign={(assigneeIds) =>
                      saveWorkOrderAssignment(workOrder, assigneeIds)
                    }
                    onDelete={() => deleteWorkOrder(workOrder)}
                  />
                ))
              )
            ) : (
              <EmptyState
                stage={tab}
                searching={Boolean(query.trim())}
              />
            )}
          </div>
          )}
        </section>
      </main>
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
