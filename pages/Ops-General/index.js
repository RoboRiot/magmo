import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import firebase from "../../context/Firebase";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "../../styles/OpsGeneral.module.css";
import LoggedIn from "../LoggedIn";

function Icon({ name, size = 18 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    refresh: <path d="M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    external: (
      <>
        <path d="M14 5h5v5M11 13l8-8M19 13v6H5V5h6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

async function opsRequest(options = {}) {
  const { query = "", ...requestOptions } = options;
  const token = await firebase.auth().currentUser?.getIdToken();
  const response = await fetch(`/api/ops/general${query ? `?${query}` : ""}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(requestOptions.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "Ops-General could not be reached.");
  }
  return body;
}

function elapsedLabel(startedAt, endedAt = "") {
  const start = Date.parse(startedAt || "");
  const end = Date.parse(endedAt || "") || Date.now();
  if (!Number.isFinite(start)) return "0m";
  const minutes = Math.max(0, Math.floor((end - start) / 60000));
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return hours ? `${hours}h ${String(remainder).padStart(2, "0")}m` : `${minutes}m`;
}

function minutesLabel(value) {
  const minutes = Math.max(0, Math.round(Number(value || 0)));
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours && remainder) return `${hours}h ${remainder}m`;
  if (hours) return `${hours}h`;
  return `${remainder}m`;
}

function exactTime(value) {
  const timestamp = Date.parse(value || "");
  if (!Number.isFinite(timestamp)) return "Time unavailable";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function dateTimeLocalValue(value) {
  const parsed = new Date(value || "");
  if (Number.isNaN(parsed.getTime())) return "";
  const offset = parsed.getTimezoneOffset() * 60000;
  return new Date(parsed.getTime() - offset).toISOString().slice(0, 16);
}

function initials(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ownerNames(workOrder) {
  return (workOrder.assignees || [])
    .map((assignee) => assignee.name)
    .filter(Boolean)
    .join(", ") || "Unassigned";
}

function participantNames(workOrder) {
  return (workOrder.participants || [])
    .map((participant) => participant.name)
    .filter(Boolean)
    .join(", ") || "No participation recorded";
}

function modeLabel(mode) {
  if (mode === "remote") return "Remote";
  if (mode === "in_person") return "In person";
  if (mode === "mixed") return "Remote + in person";
  return "Location not set";
}

function workOrderMatchesQuery(workOrder, query) {
  const needle = String(query || "").trim().toLowerCase().replace(/^#/, "");
  if (!needle) return true;
  return [
    workOrder.number,
    workOrder.subject,
    workOrder.customer,
    ownerNames(workOrder),
    participantNames(workOrder),
  ]
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

function editRequestStatusLabel(status) {
  if (status === "approved") return "Edit approved";
  if (status === "denied" || status === "rejected") return "Edit denied";
  if (status === "blocked") return "Please request again";
  if (status === "pending") return "Edit pending";
  return "";
}

function WorkOrderCard({
  workOrder,
  compact = false,
  openClocks = [],
  busy,
  onClockIn,
  onReportMismatch,
  assignmentDispute,
  canRemoveImmediately = false,
}) {
  const workClock = openClocks.find(
    (clock) => clock.workOrderId === workOrder.id && clock.timeType !== "travel"
  );
  const travelClock = openClocks.find(
    (clock) => clock.workOrderId === workOrder.id && clock.timeType === "travel"
  );
  const correctionPending =
    assignmentDispute?.status === "pending" && !canRemoveImmediately;
  const owner = ownerNames(workOrder);
  return (
    <article
      className={[styles.workOrderCard, compact ? styles.compactCard : ""].join(
        " "
      )}
    >
      <div className={styles.cardIdentity}>
        <div className={styles.cardIdentityTop}>
          <div className={styles.orderNumber}>WO #{workOrder.number}</div>
          {onReportMismatch ? (
            <button
              type="button"
              className={styles.notMineButton}
              disabled={busy || correctionPending}
              onClick={() => onReportMismatch(workOrder)}
              title={
                correctionPending
                  ? "Your assignment correction is pending"
                  : canRemoveImmediately
                    ? "Remove this incorrect assignment"
                    : "Report that this work order was not assigned to you"
              }
              aria-label={
                correctionPending
                  ? `Assignment correction pending for work order ${workOrder.number}`
                  : canRemoveImmediately
                    ? `Remove work order ${workOrder.number} from Assigned to you`
                    : `Report that work order ${workOrder.number} is not assigned to me`
              }
            >
              <Icon name="close" size={13} />
              <span>
                {correctionPending
                  ? "Reported"
                  : canRemoveImmediately
                    ? "Remove"
                    : "Not mine"}
              </span>
            </button>
          ) : null}
        </div>
        <h3>{workOrder.subject}</h3>
        <p>{workOrder.customer || "Customer not listed"}</p>
      </div>
      <div className={styles.cardFacts}>
        <span data-tone={workOrder.workflowStatus}>
          {workOrder.workflowStageLabel || "Active"}
        </span>
        <span>{workOrder.priorityLabel || "Needs to be scheduled"}</span>
        <span data-mode={workOrder.responsibilityEvidence?.kind || workOrder.workMode}>
          {workOrder.responsibilityEvidence?.label || modeLabel(workOrder.workMode)}
        </span>
      </div>
      <div className={styles.ownerRow}>
        <i>{initials(owner)}</i>
        <div>
          <span>Dispatch owner</span>
          <strong>{owner}</strong>
        </div>
      </div>
      <div className={styles.cardActions}>
        <div className={styles.sourceLinks}>
          {workOrder.slackPermalink ? (
            <a href={workOrder.slackPermalink} target="_blank" rel="noreferrer">
              Slack <Icon name="external" size={13} />
            </a>
          ) : null}
          {workOrder.bluefolderUrl ? (
            <a href={workOrder.bluefolderUrl} target="_blank" rel="noreferrer">
              BlueFolder <Icon name="external" size={13} />
            </a>
          ) : null}
        </div>
        <div className={styles.clockButtons}>
          <button
            type="button"
            className={workClock ? styles.clockedButton : styles.clockInButton}
            disabled={busy || Boolean(workClock)}
            onClick={() => onClockIn(workOrder, "work")}
          >
            <Icon name={workClock ? "check" : "clock"} size={16} />
            {workClock ? "Work running" : "Start work"}
          </button>
          <button
            type="button"
            className={travelClock ? styles.clockedButton : styles.clockInButton}
            disabled={busy || Boolean(travelClock)}
            onClick={() => onClockIn(workOrder, "travel")}
          >
            <Icon name={travelClock ? "check" : "clock"} size={16} />
            {travelClock ? "Travel running" : "Start travel"}
          </button>
        </div>
      </div>
    </article>
  );
}

function OpsGeneralContent() {
  const [assigned, setAssigned] = useState([]);
  const [participated, setParticipated] = useState([]);
  const [other, setOther] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [openClocks, setOpenClocks] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);
  const [timeEditRequests, setTimeEditRequests] = useState([]);
  const [assignmentDisputes, setAssignmentDisputes] = useState([]);
  const [historyAnchor, setHistoryAnchor] = useState(() => new Date());
  const [query, setQuery] = useState("");
  const [assignedQuery, setAssignedQuery] = useState("");
  const [assignmentCorrectionTarget, setAssignmentCorrectionTarget] = useState(null);
  const [assignmentCorrectionReason, setAssignmentCorrectionReason] = useState("");
  const [assignmentCorrectionMessage, setAssignmentCorrectionMessage] = useState("");
  const [travelTarget, setTravelTarget] = useState(null);
  const [travelPlan, setTravelPlan] = useState(null);
  const [travelInferenceChoice, setTravelInferenceChoice] = useState("");
  const [travelOriginType, setTravelOriginType] = useState("");
  const [travelSiteId, setTravelSiteId] = useState("");
  const [travelSiteQuery, setTravelSiteQuery] = useState("");
  const [travelHomeZip, setTravelHomeZip] = useState("");
  const [travelManualEta, setTravelManualEta] = useState("");
  const [travelMessage, setTravelMessage] = useState("");
  const [editRequestEntry, setEditRequestEntry] = useState(null);
  const [editStartValue, setEditStartValue] = useState("");
  const [editEndValue, setEditEndValue] = useState("");
  const [editTimeType, setEditTimeType] = useState("work");
  const [editReason, setEditReason] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [, setTimerTick] = useState(0);

  const historyRange = useMemo(() => {
    const start = startOfWeek(historyAnchor, { weekStartsOn: 1 });
    const end = addWeeks(start, 1);
    return { start, end };
  }, [historyAnchor]);

  const applyPayload = useCallback((data) => {
    setAssigned(data.assigned || []);
    setParticipated(data.participated || []);
    setOther(data.other || []);
    setCurrentUser(data.currentUser || null);
    setOpenClocks(data.openClocks || (data.openClock ? [data.openClock] : []));
    setApprovalRequests(data.approvalRequests || []);
    setRecentEntries(data.recentEntries || []);
    setTimeEditRequests(data.timeEditRequests || []);
    setAssignmentDisputes(data.assignmentDisputes || []);
  }, []);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setRefreshing(true);
    try {
      const query = new URLSearchParams({
        historyStart: historyRange.start.toISOString(),
        historyEnd: historyRange.end.toISOString(),
      });
      const data = await opsRequest({
        method: "GET",
        query: query.toString(),
      });
      applyPayload(data);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [applyPayload, historyRange.end, historyRange.start]);

  useEffect(() => {
    load();
    const poll = setInterval(() => load(true), 30000);
    return () => clearInterval(poll);
  }, [load]);

  useEffect(() => {
    if (!openClocks.length) return undefined;
    const timer = setInterval(() => setTimerTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [openClocks.length]);

  useEffect(() => {
    if (!editRequestEntry) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !editSubmitting) {
        setEditRequestEntry(null);
        setEditMessage("");
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editRequestEntry, editSubmitting]);

  useEffect(() => {
    if (!assignmentCorrectionTarget) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAssignmentCorrectionTarget(null);
        setAssignmentCorrectionReason("");
        setAssignmentCorrectionMessage("");
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [assignmentCorrectionTarget]);

  useEffect(() => {
    if (!travelTarget) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !busy) {
        setTravelTarget(null);
        setTravelPlan(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [travelTarget, busy]);

  const runClockAction = async (action, details = {}) => {
    setBusy(true);
    try {
      const data = await opsRequest({
        method: "PATCH",
        body: JSON.stringify({
          action,
          ...details,
          historyStart: historyRange.start.toISOString(),
          historyEnd: historyRange.end.toISOString(),
        }),
      });
      applyPayload(data);
      setError(data.warning || "");
      return data;
    } catch (requestError) {
      setError(requestError.message);
      return null;
    } finally {
      setBusy(false);
    }
  };

  const closeTravelStart = () => {
    if (busy) return;
    setTravelTarget(null);
    setTravelPlan(null);
    setTravelMessage("");
  };

  const beginClockIn = async (workOrder, timeType) => {
    if (timeType !== "travel") {
      await runClockAction("clock_in", {
        workOrderId: workOrder.id,
        timeType: "work",
      });
      return;
    }
    setBusy(true);
    setTravelMessage("");
    try {
      const data = await opsRequest({
        method: "PATCH",
        body: JSON.stringify({
          action: "prepare_travel",
          workOrderId: workOrder.id,
        }),
      });
      setTravelTarget(workOrder);
      setTravelPlan(data.travel || null);
      setTravelInferenceChoice("");
      setTravelOriginType("");
      setTravelSiteId("");
      setTravelSiteQuery("");
      setTravelHomeZip("");
      setTravelManualEta("");
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const submitTravelStart = async (event) => {
    event.preventDefault();
    let originType = travelOriginType;
    let clientId = travelSiteId;
    if (travelPlan?.inferredOrigin && travelInferenceChoice === "yes") {
      originType = "site";
      clientId = travelPlan.inferredOrigin.id;
    }
    if (!originType) {
      setTravelMessage("Choose where you are traveling from.");
      return;
    }
    if (originType === "site" && !clientId) {
      setTravelMessage("Choose the site you are leaving.");
      return;
    }
    if (
      originType === "home" &&
      !/^\d{5}(?:-\d{4})?$/.test(travelHomeZip.trim())
    ) {
      setTravelMessage("Enter a valid home ZIP code.");
      return;
    }
    setBusy(true);
    setTravelMessage("");
    try {
      const data = await opsRequest({
        method: "PATCH",
        body: JSON.stringify({
          action: "clock_in",
          workOrderId: travelTarget.id,
          timeType: "travel",
          travelOrigin: {
            type: originType,
            clientId: originType === "site" ? clientId : "",
            zip: originType === "home" ? travelHomeZip.trim() : "",
          },
          manualEtaMinutes: travelManualEta
            ? Number(travelManualEta)
            : 0,
          historyStart: historyRange.start.toISOString(),
          historyEnd: historyRange.end.toISOString(),
        }),
      });
      applyPayload(data);
      setTravelTarget(null);
      setTravelPlan(null);
      setError(data.warning || "");
    } catch (requestError) {
      setTravelMessage(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const filteredTravelSites = useMemo(() => {
    const needle = travelSiteQuery.trim().toLowerCase();
    return (travelPlan?.siteOptions || [])
      .filter((site) => {
        if (!needle) return true;
        return `${site.label} ${site.address}`.toLowerCase().includes(needle);
      })
      .slice(0, 80);
  }, [travelPlan, travelSiteQuery]);

  const reportAssignmentMismatch = (workOrder) => {
    setAssignmentCorrectionTarget(workOrder);
    setAssignmentCorrectionReason("");
    setAssignmentCorrectionMessage("");
  };

  const closeAssignmentCorrection = () => {
    if (busy) return;
    setAssignmentCorrectionTarget(null);
    setAssignmentCorrectionReason("");
    setAssignmentCorrectionMessage("");
  };

  const submitAssignmentCorrection = async (event) => {
    event.preventDefault();
    const reason = assignmentCorrectionReason.trim();
    if (reason.length < 8) {
      setAssignmentCorrectionMessage(
        "Explain what Magmo misunderstood so the assignment AI can learn from it."
      );
      return;
    }
    setBusy(true);
    setAssignmentCorrectionMessage("");
    try {
      const data = await opsRequest({
        method: "PATCH",
        body: JSON.stringify({
          action: currentUser?.canRemoveAssignmentImmediately
            ? "remove_self_assignment"
            : "report_assignment_mismatch",
          workOrderId: assignmentCorrectionTarget.id,
          reason,
          historyStart: historyRange.start.toISOString(),
          historyEnd: historyRange.end.toISOString(),
        }),
      });
      applyPayload(data);
      setAssignmentCorrectionTarget(null);
      setAssignmentCorrectionReason("");
      setError("");
    } catch (requestError) {
      setAssignmentCorrectionMessage(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const openTimeEditRequest = (entry) => {
    setEditRequestEntry(entry);
    setEditStartValue(dateTimeLocalValue(entry.startedAt));
    setEditEndValue(dateTimeLocalValue(entry.endedAt));
    setEditTimeType(entry.timeType === "travel" ? "travel" : "work");
    setEditReason("");
    setEditMessage("");
  };

  const closeTimeEditRequest = () => {
    if (editSubmitting) return;
    setEditRequestEntry(null);
    setEditMessage("");
  };

  const submitTimeEditRequest = async (event) => {
    event.preventDefault();
    const start = new Date(editStartValue || "");
    const end = new Date(editEndValue || "");
    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end <= start
    ) {
      setEditMessage("Choose a valid start and end time.");
      return;
    }
    if (!editReason.trim()) {
      setEditMessage("Briefly explain why the recorded hours need to change.");
      return;
    }
    setEditSubmitting(true);
    setEditMessage("");
    try {
      const data = await opsRequest({
        method: "PATCH",
        body: JSON.stringify({
          action: "request_time_edit",
          entryId: editRequestEntry.id,
          startIso: start.toISOString(),
          endIso: end.toISOString(),
          timeType: editTimeType,
          reason: editReason.trim(),
          historyStart: historyRange.start.toISOString(),
          historyEnd: historyRange.end.toISOString(),
        }),
      });
      if (Object.prototype.hasOwnProperty.call(data, "assigned")) {
        applyPayload(data);
      } else {
        await load(true);
      }
      setEditRequestEntry(null);
      setError("");
    } catch (requestError) {
      setEditMessage(requestError.message);
    } finally {
      setEditSubmitting(false);
    }
  };

  const filteredAssigned = useMemo(
    () => assigned.filter((workOrder) => workOrderMatchesQuery(workOrder, assignedQuery)),
    [assigned, assignedQuery]
  );

  const filteredOther = useMemo(() => {
    return other.filter((workOrder) => workOrderMatchesQuery(workOrder, query));
  }, [other, query]);

  const pendingAssignmentDisputes = useMemo(() => {
    const byWorkOrder = new Map();
    assignmentDisputes
      .filter((dispute) => dispute?.workOrderId && dispute?.status === "pending")
      .forEach((dispute) => byWorkOrder.set(dispute.workOrderId, dispute));
    return byWorkOrder;
  }, [assignmentDisputes]);

  const latestTimeEditRequestByEntry = useMemo(() => {
    const byEntry = new Map();
    timeEditRequests.forEach((request) => {
      if (!request?.entryId) return;
      const previous = byEntry.get(request.entryId);
      const requestTime = Date.parse(
        request.requestedAtIso || request.createdAtIso || request.updatedAtIso || 0
      );
      const previousTime = Date.parse(
        previous?.requestedAtIso ||
          previous?.createdAtIso ||
          previous?.updatedAtIso ||
          0
      );
      if (!previous || requestTime >= previousTime) {
        byEntry.set(request.entryId, request);
      }
    });
    return byEntry;
  }, [timeEditRequests]);

  const closedHistoryEntries = useMemo(
    () =>
      recentEntries
        .filter((entry) => entry.status === "closed")
        .sort(
          (left, right) =>
            Date.parse(right.startedAt || 0) - Date.parse(left.startedAt || 0)
        ),
    [recentEntries]
  );
  const historyTotals = useMemo(
    () =>
      closedHistoryEntries.reduce(
        (totals, entry) => {
          const minutes = Math.max(0, Number(entry.durationMinutes || 0));
          totals.total += minutes;
          totals[entry.timeType === "travel" ? "travel" : "work"] += minutes;
          return totals;
        },
        { total: 0, work: 0, travel: 0 }
      ),
    [closedHistoryEntries]
  );
  const historyDays = useMemo(() => {
    const grouped = new Map();
    closedHistoryEntries.forEach((entry) => {
      const started = new Date(entry.startedAt || "");
      if (Number.isNaN(started.getTime())) return;
      const key = format(started, "yyyy-MM-dd");
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(entry);
    });
    return [...grouped.entries()].sort(([left], [right]) =>
      right.localeCompare(left)
    );
  }, [closedHistoryEntries]);

  const myHoursSection = (
    <section className={[styles.recentSection, styles.topHoursSection].join(" ")}>
      <div className={[styles.sectionHeading, styles.historyHeading].join(" ")}>
        <div>
          <span>YOUR HISTORY</span>
          <h2>My hours</h2>
          <p>Official work and travel clocks for the selected work week.</p>
        </div>
        <div className={styles.weekPicker}>
          <button
            type="button"
            aria-label="Previous work week"
            onClick={() => setHistoryAnchor((date) => addWeeks(date, -1))}
          >
            <span className={styles.historyBackArrow}>
              <Icon name="arrow" size={16} />
            </span>
          </button>
          <label>
            <span>Week of</span>
            <input
              type="date"
              value={format(historyRange.start, "yyyy-MM-dd")}
              onChange={(event) => {
                const selected = new Date(`${event.target.value}T12:00:00`);
                if (!Number.isNaN(selected.getTime())) setHistoryAnchor(selected);
              }}
            />
          </label>
          <button
            type="button"
            aria-label="Next work week"
            onClick={() => setHistoryAnchor((date) => addWeeks(date, 1))}
          >
            <Icon name="arrow" size={16} />
          </button>
          <button
            type="button"
            className={styles.thisWeekButton}
            onClick={() => setHistoryAnchor(new Date())}
          >
            This week
          </button>
        </div>
      </div>
      <div className={styles.historyWeekLabel}>
        <strong>
          {format(historyRange.start, "MMM d")} -{" "}
          {format(
            endOfWeek(historyRange.start, { weekStartsOn: 1 }),
            "MMM d, yyyy"
          )}
        </strong>
        <span>
          {closedHistoryEntries.length} completed{" "}
          {closedHistoryEntries.length === 1 ? "session" : "sessions"}
        </span>
      </div>
      <div className={styles.historyTotals}>
        <article>
          <span>Total</span>
          <strong>{minutesLabel(historyTotals.total)}</strong>
        </article>
        <article>
          <span>Work</span>
          <strong>{minutesLabel(historyTotals.work)}</strong>
        </article>
        <article>
          <span>Travel</span>
          <strong>{minutesLabel(historyTotals.travel)}</strong>
        </article>
      </div>
      <div className={styles.historyDays}>
        {historyDays.map(([date, entries]) => (
          <article className={styles.historyDay} key={date}>
            <header>
              <div>
                <span>{format(new Date(`${date}T12:00:00`), "EEE")}</span>
                <strong>{format(new Date(`${date}T12:00:00`), "MMM d")}</strong>
              </div>
              <b>
                {minutesLabel(
                  entries.reduce(
                    (total, entry) => total + Number(entry.durationMinutes || 0),
                    0
                  )
                )}
              </b>
            </header>
            <div className={styles.historyList}>
              {entries.map((entry) => {
                const editRequest = latestTimeEditRequestByEntry.get(entry.id);
                const editStatus = editRequestStatusLabel(editRequest?.status);
                return (
                  <div className={styles.historyEntry} key={entry.id}>
                    <i>
                      <Icon
                        name={entry.timeType === "travel" ? "arrow" : "check"}
                        size={14}
                      />
                    </i>
                    <div>
                      <strong>WO #{entry.workOrderNumber}</strong>
                      <span>{entry.workOrderSubject}</span>
                      <small>
                        {format(new Date(entry.startedAt), "h:mm a")} -{" "}
                        {format(new Date(entry.endedAt), "h:mm a")}
                      </small>
                    </div>
                    <em>{entry.timeType === "travel" ? "Travel" : "Work"}</em>
                    <b>{minutesLabel(entry.durationMinutes)}</b>
                    <aside className={styles.historyEntryActions}>
                      {editStatus ? (
                        <span data-status={editRequest.status}>{editStatus}</span>
                      ) : null}
                      <button
                        type="button"
                        disabled={editRequest?.status === "pending"}
                        onClick={() => openTimeEditRequest(entry)}
                      >
                        <Icon name="edit" size={13} />
                        {editRequest?.status === "pending"
                          ? "Request pending"
                          : editRequest
                            ? "Request another edit"
                            : "Request edit"}
                      </button>
                    </aside>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
        {!historyDays.length ? (
          <p className={styles.noHistory}>
            No completed clock sessions in this work week.
          </p>
        ) : null}
      </div>
      <div className={styles.legacyHistoryList}>
        {recentEntries
          .filter((entry) => entry.status === "closed")
          .slice(0, 8)
          .map((entry) => (
            <article key={entry.id}>
              <i>
                <Icon name="check" size={15} />
              </i>
              <div>
                <strong>WO #{entry.workOrderNumber}</strong>
                <span>{entry.workOrderSubject}</span>
              </div>
              <small>{exactTime(entry.startedAt)}</small>
              <b>
                {entry.timeType === "travel" ? "Travel · " : "Work · "}
                {elapsedLabel(entry.startedAt, entry.endedAt)}
              </b>
            </article>
          ))}
        {!recentEntries.some((entry) => entry.status === "closed") ? (
          <p className={styles.noHistory}>Completed clock sessions will appear here.</p>
        ) : null}
      </div>
    </section>
  );

  return (
    <div className={styles.page}>
      <Head>
        <title>Ops-General | Magmo</title>
      </Head>
      <ThemeToggle />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <Link
              href="/Warehousedb/WarehouseSelect"
              className={styles.backButton}
              aria-label="Back to Warehouse DB"
            >
              <Icon name="back" size={18} />
            </Link>
            <div className={styles.brandMark}>
              <Icon name="briefcase" size={20} />
            </div>
            <div>
              <span>MAGMO OPERATIONS</span>
              <h1>Ops-General</h1>
            </div>
          </div>
          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => load()}
            disabled={refreshing}
          >
            <span className={refreshing ? styles.spinning : ""}>
              <Icon name="refresh" size={16} />
            </span>
            Refresh
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <div>
            <span className={styles.overline}>YOUR FIELD WORK</span>
            <h2>Clock time where the work happens.</h2>
            <p>
              Manual clock sessions are the official on-site record. If no
              manual session exists, the admin calendar continues using Slack
              activity as its fallback.
            </p>
          </div>
          <div className={styles.userCard}>
            {currentUser?.slack?.avatar ? (
              <img src={currentUser.slack.avatar} alt="" />
            ) : (
              <i>{initials(currentUser?.name || currentUser?.email)}</i>
            )}
            <div>
              <span>Signed in as</span>
              <strong>{currentUser?.name || "Magmo user"}</strong>
              <small>{currentUser?.email || ""}</small>
            </div>
            <b data-matched={currentUser?.slack?.matched ? "true" : "false"}>
              {currentUser?.slack?.matched ? "Slack matched" : "Email match pending"}
            </b>
          </div>
        </section>

        {error ? <div className={styles.errorBanner}>{error}</div> : null}
        {currentUser?.slack?.reason ? (
          <div className={styles.identityNotice}>
            <Icon name="clock" size={16} />
            <span>{currentUser.slack.reason} You can still find and clock into any work order below.</span>
          </div>
        ) : null}

        {myHoursSection}

        {approvalRequests.length ? (
          <section className={styles.approvalQueue}>
            <div>
              <span>OVERSIGHT APPROVALS</span>
              <h3>Clock-out requests waiting for you</h3>
            </div>
            {approvalRequests.map((request) => (
              <article key={request.id}>
                <div>
                  <strong>{request.requesterName} · WO #{request.workOrderNumber}</strong>
                  <span>{request.workOrderSubject}</span>
                  <small>Requested {exactTime(request.requestedAtIso)}</small>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => runClockAction("reject_clock_out", { approvalId: request.id })}
                  >
                    Keep clock open
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => runClockAction("approve_clock_out", { approvalId: request.id })}
                  >
                    Approve clock out
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {openClocks.length ? (
          <section className={styles.activeClockList}>
            {openClocks.map((openClock) => (
              <article className={styles.activeClock} key={openClock.id}>
                <div className={styles.pulseMark}>
                  <span />
                  <Icon name="clock" size={22} />
                </div>
                <div className={styles.activeClockCopy}>
                  <span>
                    {openClock.timeType === "travel" ? "TRAVEL" : "WORK"} CLOCK {openClock.status === "pending_approval" ? "AWAITING APPROVAL" : "RUNNING"}
                  </span>
                  <h3>WO #{openClock.workOrderNumber}</h3>
                  <p>{openClock.workOrderSubject}</p>
                  <small>Started {exactTime(openClock.startedAt)}</small>
                  {openClock.slackStartNotification?.status === "failed" ? (
                    <button
                      type="button"
                      className={styles.retrySlackNotice}
                      disabled={busy}
                      onClick={() =>
                        runClockAction("retry_clock_start_notification", {
                          entryId: openClock.id,
                        })
                      }
                    >
                      Retry Slack notice
                    </button>
                  ) : null}
                </div>
                <strong>{elapsedLabel(openClock.startedAt, openClock.clockOutRequestedAt)}</strong>
                <button
                  type="button"
                  onClick={() => runClockAction("clock_out", { entryId: openClock.id })}
                  disabled={busy || openClock.status === "pending_approval"}
                >
                  {openClock.status === "pending_approval"
                    ? "Approval pending"
                    : busy
                      ? "Sending..."
                      : openClock.canSelfApproveClockOut
                        ? "Clock out"
                        : "Request clock out"}
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className={styles.noActiveClock}>
            <Icon name="clock" size={20} />
            <div>
              <strong>No clock is running</strong>
              <span>Choose a work order when you arrive on site.</span>
            </div>
          </section>
        )}

        <section className={styles.assignedSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span>PRIMARY VIEW</span>
              <h2>Assigned to you</h2>
              <p>
                Only confirmed BlueFolder dispatch, physical work, or hands-on
                remote responsibility appears here.
              </p>
            </div>
            <b>{assignedQuery.trim() ? filteredAssigned.length : assigned.length}</b>
          </div>
          {assigned.length ? (
            <label className={[styles.searchBox, styles.assignedSearch].join(" ")}>
              <Icon name="search" size={17} />
              <input
                type="search"
                value={assignedQuery}
                onChange={(event) => setAssignedQuery(event.target.value)}
                placeholder="Search your work orders, customers, or owners"
                aria-label="Search work orders assigned to you"
              />
            </label>
          ) : null}
          {loading ? (
            <div className={styles.loadingGrid}>
              <span />
              <span />
            </div>
          ) : filteredAssigned.length ? (
            <div className={styles.assignedGrid}>
              {filteredAssigned.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  openClocks={openClocks}
                  busy={busy}
                  assignmentDispute={pendingAssignmentDisputes.get(workOrder.id)}
                  canRemoveImmediately={Boolean(
                    currentUser?.canRemoveAssignmentImmediately
                  )}
                  onReportMismatch={reportAssignmentMismatch}
                  onClockIn={(target, timeType) =>
                    beginClockIn(target, timeType)
                  }
                />
              ))}
            </div>
          ) : assigned.length ? (
            <p className={styles.noResults}>No assigned work orders match that search.</p>
          ) : (
            <div className={styles.emptyAssigned}>
              <Icon name="check" size={22} />
              <div>
                <strong>No circulating work orders are assigned to you.</strong>
                <span>
                  Check the searchable team queue below if an assignment is
                  missing.
                </span>
              </div>
            </div>
          )}
        </section>

        <section className={styles.assignedSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span>YOUR CONTRIBUTIONS</span>
              <h2>Participated in</h2>
              <p>
                Advice, coordination, or useful information without remote or
                physical work.
              </p>
            </div>
            <b>{participated.length}</b>
          </div>
          {loading ? (
            <div className={styles.loadingGrid}>
              <span />
              <span />
            </div>
          ) : participated.length ? (
            <div className={styles.assignedGrid}>
              {participated.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  openClocks={openClocks}
                  busy={busy}
                  onClockIn={(target, timeType) =>
                    beginClockIn(target, timeType)
                  }
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyAssigned}>
              <Icon name="check" size={22} />
              <div>
                <strong>No participation-only work orders yet.</strong>
                <span>Advice-only contributions will appear here.</span>
              </div>
            </div>
          )}
        </section>

        <details className={styles.teamQueue}>
          <summary>
            <div>
              <span>TEAM QUEUE</span>
              <strong>Other work orders in circulation</strong>
              <small>Expand to search unassigned or differently assigned work.</small>
            </div>
            <b>{other.length}</b>
            <Icon name="arrow" size={18} />
          </summary>
          <div className={styles.teamQueueBody}>
            <label className={styles.searchBox}>
              <Icon name="search" size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search work order, customer, or owner"
                aria-label="Search other work orders"
              />
            </label>
            <div className={styles.otherGrid}>
              {filteredOther.map((workOrder) => (
                <WorkOrderCard
                  compact
                  key={workOrder.id}
                  workOrder={workOrder}
                  openClocks={openClocks}
                  busy={busy}
                  onClockIn={(target, timeType) =>
                    beginClockIn(target, timeType)
                  }
                />
              ))}
              {!filteredOther.length ? (
                <p className={styles.noResults}>No work orders match that search.</p>
              ) : null}
            </div>
          </div>
        </details>

      </main>

      {travelTarget ? (
        <div
          className={styles.editRequestBackdrop}
          role="presentation"
          onMouseDown={closeTravelStart}
        >
          <form
            className={[styles.editRequestModal, styles.travelStartModal].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-labelledby="travel-start-title"
            onSubmit={submitTravelStart}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>TRAVEL ORIGIN</span>
                <h2 id="travel-start-title">Where are you leaving from?</h2>
              </div>
              <button
                type="button"
                onClick={closeTravelStart}
                disabled={busy}
                aria-label="Close travel start"
              >
                <Icon name="close" size={18} />
              </button>
            </header>

            <div className={styles.editRequestContext}>
              <div>
                <span>DESTINATION</span>
                <strong>WO #{travelTarget.number}</strong>
              </div>
              <p>{travelPlan?.destination?.label || travelTarget.customer}</p>
              <small>
                {travelPlan?.destination?.address ||
                  "No synced client address is available. Enter a manual ETA below."}
              </small>
            </div>

            {travelPlan?.inferredOrigin && !travelInferenceChoice ? (
              <div className={styles.inferredOrigin}>
                <span>MAGMO FOUND YOUR PREVIOUS SITE</span>
                <strong>
                  Are you traveling from {travelPlan.inferredOrigin.label}?
                </strong>
                <p>
                  {travelPlan.inferredOrigin.evidence} WO #
                  {travelPlan.inferredOrigin.workOrderNumber}
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setTravelInferenceChoice("yes")}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravelInferenceChoice("no")}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTravelInferenceChoice("wrong");
                      setTravelOriginType("site");
                    }}
                  >
                    Wrong site
                  </button>
                </div>
              </div>
            ) : null}

            {travelPlan?.inferredOrigin && travelInferenceChoice === "yes" ? (
              <div className={styles.selectedOrigin}>
                <div>
                  <span>LEAVING FROM</span>
                  <strong>{travelPlan.inferredOrigin.label}</strong>
                  <small>{travelPlan.inferredOrigin.address}</small>
                </div>
                <button
                  type="button"
                  onClick={() => setTravelInferenceChoice("")}
                >
                  Change
                </button>
              </div>
            ) : null}

            {!travelPlan?.inferredOrigin || ["no", "wrong"].includes(travelInferenceChoice) ? (
              <div className={styles.travelOriginFields}>
                <fieldset>
                  <legend>Traveling from</legend>
                  {["site", "warehouse", "home"].map((type) => (
                    <label key={type}>
                      <input
                        type="radio"
                        name="travel-origin"
                        value={type}
                        checked={travelOriginType === type}
                        onChange={() => setTravelOriginType(type)}
                      />
                      <span>
                        {type === "site"
                          ? "Site"
                          : type === "warehouse"
                            ? "LF warehouse"
                            : "Home"}
                      </span>
                    </label>
                  ))}
                </fieldset>

                {travelOriginType === "site" ? (
                  <div className={styles.travelSitePicker}>
                    <label>
                      <span>Find the site you are leaving</span>
                      <input
                        type="search"
                        value={travelSiteQuery}
                        onChange={(event) => setTravelSiteQuery(event.target.value)}
                        placeholder="Search client or address"
                      />
                    </label>
                    <select
                      size={Math.min(6, Math.max(2, filteredTravelSites.length))}
                      value={travelSiteId}
                      onChange={(event) => setTravelSiteId(event.target.value)}
                    >
                      {filteredTravelSites.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.label}{site.address ? ` — ${site.address}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {travelOriginType === "warehouse" ? (
                  <p className={styles.originAddress}>
                    {travelPlan?.warehouse?.address}
                  </p>
                ) : null}

                {travelOriginType === "home" ? (
                  <label className={styles.homeZipField}>
                    <span>Home ZIP code</span>
                    <input
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={10}
                      value={travelHomeZip}
                      onChange={(event) => setTravelHomeZip(event.target.value)}
                      placeholder="92630"
                    />
                    <small>Only the ZIP code is saved and used for routing.</small>
                  </label>
                ) : null}
              </div>
            ) : null}

            <label className={styles.manualEtaField}>
              <span>Manual ETA in minutes (fallback)</span>
              <input
                type="number"
                min="1"
                max="720"
                step="1"
                value={travelManualEta}
                onChange={(event) => setTravelManualEta(event.target.value)}
                placeholder="Only needed when automatic routing is unavailable"
              />
              <small>
                Magmo uses Google Routes when configured. It never invents an
                ETA; enter your estimate if routing or an address is unavailable.
              </small>
            </label>

            {travelMessage ? (
              <p className={styles.editRequestError} role="alert">
                {travelMessage}
              </p>
            ) : null}

            <footer>
              <button type="button" onClick={closeTravelStart} disabled={busy}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  busy ||
                  (Boolean(travelPlan?.inferredOrigin) && !travelInferenceChoice)
                }
              >
                {busy ? "Starting travel..." : "Begin travel"}
              </button>
            </footer>
          </form>
        </div>
      ) : null}

      {assignmentCorrectionTarget ? (
        <div
          className={styles.editRequestBackdrop}
          role="presentation"
          onMouseDown={closeAssignmentCorrection}
        >
          <form
            className={styles.editRequestModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-correction-title"
            onSubmit={submitAssignmentCorrection}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>ASSIGNMENT CORRECTION</span>
                <h2 id="assignment-correction-title">
                  {currentUser?.canRemoveAssignmentImmediately
                    ? "Remove from Assigned to you"
                    : "Report an incorrect assignment"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeAssignmentCorrection}
                disabled={busy}
                aria-label="Close assignment correction"
              >
                <Icon name="close" size={18} />
              </button>
            </header>

            <div className={styles.editRequestContext}>
              <div>
                <span>WORK ORDER</span>
                <strong>WO #{assignmentCorrectionTarget.number}</strong>
              </div>
              <p>{assignmentCorrectionTarget.subject}</p>
              <small>
                Assignment means you performed physical/on-site work or hands-on
                remote work. Advice or coordination alone is participation.
              </small>
            </div>

            <div className={styles.editRequestFields}>
              <label className={styles.editReasonField}>
                <span>Why was this not your assignment?</span>
                <textarea
                  autoFocus
                  required
                  rows={5}
                  minLength={8}
                  maxLength={1200}
                  value={assignmentCorrectionReason}
                  onChange={(event) =>
                    setAssignmentCorrectionReason(event.target.value)
                  }
                  placeholder="Example: I only answered a scheduling question. I was not onsite and did not troubleshoot remotely."
                />
                <small className={styles.correctionLearningNote}>
                  Your explanation is saved with the decision so Magmo can avoid
                  the same assignment mistake.
                </small>
              </label>
            </div>

            {assignmentCorrectionMessage ? (
              <p className={styles.editRequestError} role="alert">
                {assignmentCorrectionMessage}
              </p>
            ) : null}

            <footer>
              <button
                type="button"
                onClick={closeAssignmentCorrection}
                disabled={busy}
              >
                Cancel
              </button>
              <button type="submit" disabled={busy}>
                {busy
                  ? "Saving correction..."
                  : currentUser?.canRemoveAssignmentImmediately
                    ? "Remove assignment"
                    : "Send for review"}
              </button>
            </footer>
          </form>
        </div>
      ) : null}

      {editRequestEntry ? (
        <div
          className={styles.editRequestBackdrop}
          role="presentation"
          onMouseDown={closeTimeEditRequest}
        >
          <form
            className={styles.editRequestModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="time-edit-title"
            onSubmit={submitTimeEditRequest}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>HOURS CORRECTION</span>
                <h2 id="time-edit-title">Request an edit</h2>
              </div>
              <button
                type="button"
                onClick={closeTimeEditRequest}
                disabled={editSubmitting}
                aria-label="Close edit request"
              >
                <Icon name="close" size={18} />
              </button>
            </header>

            <div className={styles.editRequestContext}>
              <div>
                <span>WORK ORDER</span>
                <strong>WO #{editRequestEntry.workOrderNumber}</strong>
              </div>
              <p>{editRequestEntry.workOrderSubject}</p>
              <small>
                Currently recorded as {exactTime(editRequestEntry.startedAt)} to{" "}
                {exactTime(editRequestEntry.endedAt)}.
              </small>
            </div>

            <div className={styles.editRequestFields}>
              <label>
                <span>Requested start</span>
                <input
                  type="datetime-local"
                  required
                  value={editStartValue}
                  onChange={(event) => setEditStartValue(event.target.value)}
                />
              </label>
              <label>
                <span>Requested end</span>
                <input
                  type="datetime-local"
                  required
                  value={editEndValue}
                  onChange={(event) => setEditEndValue(event.target.value)}
                />
              </label>
              <label>
                <span>Time type</span>
                <select
                  value={editTimeType}
                  onChange={(event) => setEditTimeType(event.target.value)}
                >
                  <option value="work">Work</option>
                  <option value="travel">Travel</option>
                </select>
              </label>
              <label className={styles.editReasonField}>
                <span>What needs to be corrected?</span>
                <textarea
                  required
                  rows={4}
                  maxLength={1200}
                  value={editReason}
                  onChange={(event) => setEditReason(event.target.value)}
                  placeholder="Briefly explain the requested change so it can be reviewed."
                />
              </label>
            </div>

            {editMessage ? (
              <p className={styles.editRequestError} role="alert">
                {editMessage}
              </p>
            ) : null}

            <footer>
              <button
                type="button"
                onClick={closeTimeEditRequest}
                disabled={editSubmitting}
              >
                Cancel
              </button>
              <button type="submit" disabled={editSubmitting}>
                {editSubmitting ? "Sending request..." : "Send for approval"}
              </button>
            </footer>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default function OpsGeneralPage() {
  return (
    <LoggedIn>
      <OpsGeneralContent />
    </LoggedIn>
  );
}
