import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import firebase from "../../context/Firebase";
import OtCoverageModal from "../../components/Ops/OtCoverageModal";
import styles from "../../styles/OpsCalendar.module.css";
import LoggedIn from "../LoggedIn";
import { USER_ROLES } from "../../utils/authAccess";

const VIEW_LABELS = { day: "Day", week: "Week", month: "Month" };
const MODE_LABELS = {
  remote: "Remote",
  in_person: "In person",
  mixed: "Remote + in person",
  unspecified: "Location not specified",
};
const SOURCE_LABELS = {
  manual_clock: "Manual Ops-General clock",
  manual_travel: "Manual travel clock",
  calendar_correction: "Admin-corrected onsite time",
  onsite_unknown: "Onsite work with unknown hours",
  scheduled: "Scheduled from Slack",
  scheduled_manual: "Scheduled by Ops admin",
  activity: "Work recorded in Slack",
  assignment: "Assignment changed",
  bluefolder: "BlueFolder engineer",
  service_complete: "Service complete",
  completed: "Done",
  current: "Current responsibility",
};
const HOUR_HEIGHT = 72;
const DAY_HOUR_HEIGHT = 112;
const DAY_EVENT_MIN_HEIGHT = 64;

function Icon({ name, size = 18 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    print: (
      <>
        <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="7" />
      </>
    ),
    otCoverage: (
      <>
        <path d="M12 3a7 7 0 1 0 7 7 8 8 0 0 1-7-7Z" />
        <path d="M17.5 3.5v3M16 5h3" />
      </>
    ),
    refresh: <path d="M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    workOrder: (
      <>
        <path d="M9 5h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="M3 9h4M3 15h4M11 10h6M11 14h6" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    external: (
      <>
        <path d="M14 5h5v5M11 13l8-8M19 13v6H5V5h6" />
      </>
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
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
  if (!response.ok) throw new Error(body.error || "The calendar could not be reached.");
  return body;
}

function eventHue(event) {
  const identity = event.people?.[0]?.id || event.people?.[0]?.name || event.workOrderId;
  return Array.from(String(identity || "Magmo")).reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) % 360,
    164
  );
}

function eventStyle(event) {
  return { "--event-hue": eventHue(event) };
}

function eventPeople(event) {
  return event.people?.length
    ? event.people.map((person) => person.name).join(", ")
    : "Unassigned";
}

function peopleNames(people, emptyLabel = "None") {
  return people?.length
    ? people.map((person) => person.name).filter(Boolean).join(", ")
    : emptyLabel;
}

function personIdentity(person) {
  return person?.id || person?.name || "";
}

function workOrderIdentity(value) {
  return String(value?.workOrderId || value?.number || value?.workOrderNumber || "");
}

function eventTime(event) {
  if (event.unknownDuration) return "Time unknown";
  if (event.allDay) return "All day";
  const start = new Date(event.start);
  const end = new Date(event.end);
  return `${format(start, "h:mm a")}–${format(end, "h:mm a")}`;
}

function modeLabel(mode) {
  return MODE_LABELS[mode] || MODE_LABELS.unspecified;
}

function formatHours(minutes) {
  const value = Number(minutes || 0);
  if (!value) return "0h";
  const hours = Math.floor(value / 60);
  const remainder = value % 60;
  return hours && remainder
    ? `${hours}h ${remainder}m`
    : hours
    ? `${hours}h`
    : `${remainder}m`;
}

function localDateTimeValue(value) {
  const parsed = new Date(value || "");
  if (Number.isNaN(parsed.getTime())) return "";
  const offset = parsed.getTimezoneOffset() * 60000;
  return new Date(parsed.getTime() - offset).toISOString().slice(0, 16);
}

function eventDuration(event) {
  if (event.unknownDuration) return "Unknown";
  if (event.allDay) return "All day";
  const minutes = Math.max(
    0,
    Math.round((Date.parse(event.end || "") - Date.parse(event.start || "")) / 60000)
  );
  return formatHours(minutes);
}

function eventTitle(event) {
  const suffix = event.mode === "remote" ? " (remote)" : event.mode === "in_person" ? " (in person)" : "";
  return `WO #${event.number}${suffix}`;
}

function isOvertimeEvent(event) {
  return Boolean(event?.isOvertime ?? event?.overtime);
}

function notificationKind(notification = {}) {
  const value = String(notification.kind || notification.type || notification.requestType || "")
    .trim()
    .toLowerCase();
  return value.includes("assignment") || value.includes("dispute")
    ? "assignment_dispute"
    : "time_edit";
}

function notificationTimeRange(startValue, endValue) {
  const start = new Date(startValue || "");
  const end = new Date(endValue || "");
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "Not provided";
  const sameDay = isSameDay(start, end);
  return `${format(start, "MMM d, h:mm a")}–${format(end, sameDay ? "h:mm a" : "MMM d, h:mm a")}`;
}

function briefActivity(event) {
  const evidence = `${event.summary || ""} ${event.subject || ""}`
    .replace(/\s+/g, " ")
    .trim();
  if (event.source === "completed") return "Work completed";
  if (event.source === "service_complete") return "Field service complete";
  if (event.source === "scheduled_manual") return "Scheduled assignment";
  if (event.source === "manual_clock") return "Manual on-site time";
  if (event.source === "manual_travel") return "Travel time";
  if (event.source === "current") {
    return event.people?.length ? "Current responsibility" : "Awaiting assignment";
  }
  if (/\b(?:ship|shipped|shipping|deliver|delivery|courier|uber|pick\s*up)\b/i.test(evidence)) {
    return "Parts delivery / shipping";
  }
  if (/\b(?:install|installation|setup)\b/i.test(evidence)) {
    return "Equipment installation";
  }
  if (/\b(?:repair|replace|replacement|swap|fix|fixed)\b/i.test(evidence)) {
    return "Repair / replacement";
  }
  if (/\b(?:test|check|troubleshoot|diagnos|log(?:ged|ging)?\s+in|connection|error|issue|down|offline|not\s+working)\b/i.test(evidence)) {
    return event.mode === "remote" ? "Remote troubleshooting" : "Troubleshooting / testing";
  }
  if (/\b(?:schedule|scheduled|scheduling|appointment|eta|coordinate|coordination)\b/i.test(evidence)) {
    return "Scheduling / coordination";
  }
  if (event.source === "assignment" || event.source === "bluefolder") {
    return "Responsibility assigned";
  }
  if (event.mode === "remote") return "Remote support";
  if (event.mode === "in_person") return "On-site work";
  const fallback = String(event.summary || "Work-order activity")
    .replace(/^work order\s*#?\d+\s*/i, "")
    .split(/[.!?\n]/)[0]
    .trim();
  return fallback.length > 56 ? `${fallback.slice(0, 53).trimEnd()}...` : fallback;
}

function EventCard({
  event,
  compact = false,
  timeline = false,
  narrow = false,
  showOwner = false,
  positionStyle,
  onSelect,
}) {
  return (
    <button
      className={[
        styles.eventCard,
        compact ? styles.compactEvent : "",
        timeline ? styles.timelineEvent : "",
        narrow ? styles.narrowEvent : "",
      ].join(" ")}
      data-mode={event.mode || "unspecified"}
      data-overtime={isOvertimeEvent(event) ? "true" : "false"}
      style={{ ...eventStyle(event), ...(positionStyle || {}) }}
      type="button"
      onClick={(clickEvent) => {
        clickEvent.stopPropagation();
        onSelect(event);
      }}
      title={`${eventTitle(event)} — ${briefActivity(event)} — ${eventPeople(event)}`}
    >
      <span className={styles.eventTime}>
        {eventTime(event)}
        {isOvertimeEvent(event) ? <b className={styles.otBadge}>OT</b> : null}
      </span>
      <strong>{eventTitle(event)}</strong>
      <span className={styles.eventActivity}>{briefActivity(event)}</span>
      {!compact || showOwner ? (
        <>
          <span className={styles.eventOwner}>{eventPeople(event)}</span>
          {!timeline && !compact ? (
            <span className={styles.eventMode}>{modeLabel(event.mode)}</span>
          ) : null}
        </>
      ) : null}
    </button>
  );
}

function eventsForDay(events, day) {
  const start = startOfDay(day).getTime();
  const end = endOfDay(day).getTime();
  return events
    .filter((event) => Date.parse(event.start) <= end && Date.parse(event.end) > start)
    .sort((left, right) => {
      if (left.allDay !== right.allDay) return left.allDay ? -1 : 1;
      return Date.parse(left.start) - Date.parse(right.start);
    });
}

function timelineBounds(events) {
  const timed = events.filter((event) => !event.allDay && !event.unknownDuration);
  if (!timed.length) return { startHour: 6, endHour: 20 };
  const earliest = Math.min(
    ...timed.map((event) => {
      const date = new Date(event.start);
      return date.getHours() + date.getMinutes() / 60;
    })
  );
  const latest = Math.max(
    ...timed.map((event) => {
      const date = new Date(event.end);
      return date.getHours() + date.getMinutes() / 60;
    })
  );
  return {
    startHour: Math.max(0, Math.min(7, Math.floor(earliest))),
    endHour: Math.min(24, Math.max(18, Math.ceil(latest))),
  };
}

function peopleForEvents(events) {
  const seen = new Set();
  return events.flatMap((event) => event.people || []).filter((person) => {
    const identity = person.id || person.name;
    if (!identity || seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}

function WeekHourCard({ events, hourStart, hourEnd, onSelect, onOpenDay }) {
  const people = peopleForEvents(events);
  const modes = [...new Set(events.map((event) => event.mode).filter(Boolean))];
  const displayEvent = {
    ...events[0],
    people,
    mode: modes.length === 1 ? modes[0] : "mixed",
    isOvertime: events.some(isOvertimeEvent),
  };
  const visibleStart = new Date(
    Math.max(hourStart.getTime(), Math.min(...events.map((event) => Date.parse(event.start))))
  );
  const visibleEnd = new Date(
    Math.min(hourEnd.getTime(), Math.max(...events.map((event) => Date.parse(event.end))))
  );
  const workOrders = [...new Set(events.map((event) => `#${event.number}`))];
  const isSingle = workOrders.length === 1;
  const title = isSingle ? eventTitle(displayEvent) : `${workOrders.length} active work orders`;
  const activity = isSingle
    ? briefActivity(events[0])
    : `${workOrders.slice(0, 3).join(" · ")}${workOrders.length > 3 ? ` +${workOrders.length - 3}` : ""}`;

  return (
    <button
      className={[styles.eventCard, styles.weekHourCard].join(" ")}
      data-mode={displayEvent.mode || "unspecified"}
      data-overtime={isOvertimeEvent(displayEvent) ? "true" : "false"}
      style={eventStyle(displayEvent)}
      type="button"
      onClick={(clickEvent) => {
        clickEvent.stopPropagation();
        if (isSingle) onSelect(events[0]);
        else onOpenDay();
      }}
      title={`${format(visibleStart, "h:mm a")}–${format(visibleEnd, "h:mm a")} — ${title} — ${eventPeople(displayEvent)}`}
    >
      <span className={styles.eventTime}>
        {format(visibleStart, "h:mm a")}–{format(visibleEnd, "h:mm a")}
      </span>
      {isOvertimeEvent(displayEvent) ? <b className={styles.otBadge}>OT</b> : null}
      <strong>{title}</strong>
      <span className={styles.eventActivity}>{activity}</span>
      <span className={styles.eventOwner}>{eventPeople(displayEvent)}</span>
    </button>
  );
}

function WeekTimedDayColumn({ day, events, startHour, endHour, onSelect, onOpenDay }) {
  const timedEvents = events.filter(
    (event) => !event.allDay && !event.unknownDuration
  );
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const showNow =
    isSameDay(day, now) &&
    nowMinutes >= startHour * 60 &&
    nowMinutes <= endHour * 60;

  return (
    <div
      className={[
        styles.timedDayColumn,
        styles.weekTimedDay,
        isSameDay(day, now) ? styles.timedToday : "",
      ].join(" ")}
      style={{ height: (endHour - startHour) * HOUR_HEIGHT }}
    >
      {Array.from({ length: endHour - startHour }, (_, index) => startHour + index).map((hour) => {
        const hourStart = new Date(day);
        hourStart.setHours(hour, 0, 0, 0);
        const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);
        const activeEvents = timedEvents.filter(
          (event) => Date.parse(event.start) < hourEnd.getTime() && Date.parse(event.end) > hourStart.getTime()
        );
        if (!activeEvents.length) return null;
        return (
          <div
            className={styles.weekHourSlot}
            key={hourStart.toISOString()}
            style={{ top: (hour - startHour) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
          >
            <WeekHourCard
              events={activeEvents}
              hourStart={hourStart}
              hourEnd={hourEnd}
              onSelect={onSelect}
              onOpenDay={onOpenDay}
            />
          </div>
        );
      })}
      {showNow ? (
        <span
          className={styles.currentTimeLine}
          style={{ top: ((nowMinutes - startHour * 60) / 60) * HOUR_HEIGHT }}
        />
      ) : null}
      {!timedEvents.length ? <span className={styles.noTimedWork}>No timed work</span> : null}
    </div>
  );
}

function layoutTimedEvents(
  events,
  day,
  startHour,
  endHour,
  hourHeight = HOUR_HEIGHT,
  minimumHeight = 46
) {
  const dayStart = startOfDay(day).getTime();
  const gridStart = startHour * 60;
  const gridEnd = endHour * 60;
  const intervals = events
    .filter((event) => !event.allDay && !event.unknownDuration)
    .map((event) => ({
      event,
      start: Math.max(
        gridStart,
        (Math.max(Date.parse(event.start), dayStart) - dayStart) / 60000
      ),
      end: Math.min(
        gridEnd,
        (Math.min(Date.parse(event.end), endOfDay(day).getTime()) - dayStart) /
          60000
      ),
    }))
    .filter((item) => item.end > item.start)
    .sort((left, right) => left.start - right.start || left.end - right.end);

  const groups = [];
  let current = [];
  let groupEnd = -1;
  intervals.forEach((item) => {
    if (current.length && item.start >= groupEnd) {
      groups.push(current);
      current = [];
      groupEnd = -1;
    }
    current.push(item);
    groupEnd = Math.max(groupEnd, item.end);
  });
  if (current.length) groups.push(current);

  return groups.flatMap((group) => {
    const laneEnds = [];
    const assigned = group.map((item) => {
      let lane = laneEnds.findIndex((laneEnd) => laneEnd <= item.start);
      if (lane < 0) lane = laneEnds.length;
      laneEnds[lane] = item.end;
      return { ...item, lane };
    });
    const laneCount = Math.max(1, laneEnds.length);
    return assigned.map((item) => ({
      ...item,
      laneCount,
      top: ((item.start - gridStart) / 60) * hourHeight,
      height: Math.max(
        minimumHeight,
        ((item.end - item.start) / 60) * hourHeight
      ),
      left: (item.lane / laneCount) * 100,
      width: 100 / laneCount,
    }));
  });
}

function TimeAxis({ startHour, endHour, hourHeight = HOUR_HEIGHT }) {
  return (
    <div
      className={styles.timeAxis}
      style={{ height: (endHour - startHour) * hourHeight }}
      aria-hidden="true"
    >
      {Array.from(
        { length: endHour - startHour + 1 },
        (_, index) => startHour + index
      ).map((hour) => (
        <span
          key={hour}
          style={{ top: (hour - startHour) * hourHeight }}
        >
          {format(new Date(2026, 0, 1, hour % 24), "h a")}
        </span>
      ))}
    </div>
  );
}

function TimedDayColumn({
  day,
  events,
  startHour,
  endHour,
  onSelect,
  single,
  hourHeight = HOUR_HEIGHT,
}) {
  const positioned = layoutTimedEvents(
    events,
    day,
    startHour,
    endHour,
    hourHeight,
    single ? DAY_EVENT_MIN_HEIGHT : 46
  );
  const gridHeight = (endHour - startHour) * hourHeight;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const showNow =
    isSameDay(day, now) &&
    nowMinutes >= startHour * 60 &&
    nowMinutes <= endHour * 60;
  return (
    <div
      className={[
        styles.timedDayColumn,
        single ? styles.singleTimedDay : "",
        isSameDay(day, now) ? styles.timedToday : "",
      ].join(" ")}
      style={{ height: gridHeight, "--hour-height": `${hourHeight}px` }}
    >
      {positioned.map((item) => (
        <EventCard
          key={item.event.id}
          event={item.event}
          timeline
          narrow={item.laneCount > 7 || item.height < DAY_EVENT_MIN_HEIGHT + 4}
          positionStyle={{
            top: item.top,
            height: item.height,
            "--event-left": `${item.left}%`,
            "--event-width": `${item.width}%`,
          }}
          onSelect={onSelect}
        />
      ))}
      {showNow ? (
        <span
          className={styles.currentTimeLine}
          style={{
            top: ((nowMinutes - startHour * 60) / 60) * hourHeight,
          }}
        />
      ) : null}
      {!positioned.length ? (
        <span className={styles.noTimedWork}>No timed work</span>
      ) : null}
    </div>
  );
}

function AllDayLane({ events, onSelect, onOpenDay, limit }) {
  const visible = Number.isFinite(limit) ? events.slice(0, limit) : events;
  return (
    <div className={styles.allDayLane}>
      {visible.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          compact
          showOwner
          onSelect={onSelect}
        />
      ))}
      {events.length > visible.length ? (
        <button
          className={styles.moreAllDay}
          type="button"
          onClick={onOpenDay}
        >
          +{events.length - visible.length} more all-day
        </button>
      ) : null}
      {!events.length ? <span className={styles.noAllDay}>None</span> : null}
    </div>
  );
}

function UnknownLane({ events, onSelect }) {
  return (
    <div className={[styles.allDayLane, styles.unknownLane].join(" ")}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          compact
          showOwner
          onSelect={onSelect}
        />
      ))}
      {!events.length ? <span className={styles.noAllDay}>None</span> : null}
    </div>
  );
}

function LaneToggleLabel({ label, expanded, count, onToggle }) {
  return (
    <button
      className={styles.laneToggleLabel}
      type="button"
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <span>{label}</span>
      {count ? <b>{count}</b> : null}
      <span className={expanded ? styles.laneChevronOpen : ""}>
        <Icon name="chevron" size={13} />
      </span>
    </button>
  );
}

function CollapsedLane({ count }) {
  return (
    <div className={styles.collapsedLane}>
      {count ? <strong>{count}</strong> : <span>—</span>}
    </div>
  );
}

function MonthView({ anchor, events, onSelect, onOpenDay }) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 }),
  });
  return (
    <div className={styles.monthGrid}>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <div className={styles.weekdayHeader} key={day}>{day}</div>
      ))}
      {days.map((day) => {
        const dayEvents = eventsForDay(events, day);
        return (
          <div
            className={[
              styles.monthDay,
              !isSameMonth(day, anchor) ? styles.outsideMonth : "",
              isSameDay(day, new Date()) ? styles.today : "",
            ].join(" ")}
            key={day.toISOString()}
            onDoubleClick={() => onOpenDay(day)}
          >
            <button className={styles.dayNumber} type="button" onClick={() => onOpenDay(day)}>
              <span>{format(day, "d")}</span>
              {isSameDay(day, new Date()) ? <small>Today</small> : null}
            </button>
            <div className={styles.monthEvents}>
              {dayEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} compact onSelect={onSelect} />
              ))}
              {dayEvents.length > 3 ? (
                <button className={styles.moreEvents} type="button" onClick={() => onOpenDay(day)}>
                  +{dayEvents.length - 3} more
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeekView({ anchor, events, onSelect, onOpenDay }) {
  const [unknownExpanded, setUnknownExpanded] = useState(false);
  const [allDayExpanded, setAllDayExpanded] = useState(false);
  const start = startOfWeek(anchor, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
  const bounds = timelineBounds(events);
  const unknownByDay = days.map((day) =>
    eventsForDay(events, day).filter((event) => event.unknownDuration)
  );
  const allDayByDay = days.map((day) =>
    eventsForDay(events, day).filter((event) => event.allDay)
  );
  const unknownCount = unknownByDay.reduce((total, dayEvents) => total + dayEvents.length, 0);
  const allDayCount = allDayByDay.reduce((total, dayEvents) => total + dayEvents.length, 0);
  return (
    <div className={styles.weekScroller}>
      <div className={styles.weekSchedule}>
        <div className={styles.weekHeaderRow}>
          <div className={styles.timeCorner}>PST</div>
          {days.map((day) => (
            <button
              className={[
                styles.weekDayHeader,
                isSameDay(day, new Date()) ? styles.weekToday : "",
              ].join(" ")}
              key={day.toISOString()}
              type="button"
              onClick={() => onOpenDay(day)}
            >
              <span>{format(day, "EEE")}</span>
              <strong>{format(day, "d")}</strong>
            </button>
          ))}
        </div>
        <div className={[styles.weekAllDayRow, styles.weekUnknownRow, !unknownExpanded ? styles.collapsedLaneRow : ""].join(" ")}>
          <LaneToggleLabel label="Unknown" expanded={unknownExpanded} count={unknownCount} onToggle={() => setUnknownExpanded((current) => !current)} />
          {unknownByDay.map((dayEvents, index) =>
            unknownExpanded ? (
              <UnknownLane key={days[index].toISOString()} events={dayEvents} onSelect={onSelect} />
            ) : (
              <CollapsedLane key={days[index].toISOString()} count={dayEvents.length} />
            )
          )}
        </div>
        <div className={[styles.weekAllDayRow, !unknownExpanded ? styles.afterCollapsedUnknown : "", !allDayExpanded ? styles.collapsedLaneRow : ""].join(" ")}>
          <LaneToggleLabel label="All day" expanded={allDayExpanded} count={allDayCount} onToggle={() => setAllDayExpanded((current) => !current)} />
          {allDayByDay.map((allDayEvents, index) =>
            allDayExpanded ? (
              <AllDayLane
                key={days[index].toISOString()}
                events={allDayEvents}
                limit={2}
                onSelect={onSelect}
                onOpenDay={() => onOpenDay(days[index])}
              />
            ) : (
              <CollapsedLane key={days[index].toISOString()} count={allDayEvents.length} />
            )
          )}
        </div>
        <div className={styles.weekTimelineRow}>
          <TimeAxis {...bounds} />
          <div className={styles.weekTimelineDays}>
            {days.map((day) => (
              <TimedDayColumn
                key={day.toISOString()}
                day={day}
                events={eventsForDay(events, day)}
                {...bounds}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayView({ anchor, events, onSelect }) {
  const [unknownExpanded, setUnknownExpanded] = useState(false);
  const [allDayExpanded, setAllDayExpanded] = useState(false);
  const dayEvents = eventsForDay(events, anchor);
  const unknownEvents = dayEvents.filter((event) => event.unknownDuration);
  const allDayEvents = dayEvents.filter((event) => event.allDay);
  const bounds = timelineBounds(dayEvents);
  return (
    <div className={styles.dayView}>
      <header className={styles.dayHeading}>
        <div>
          <span>{format(anchor, "EEEE")}</span>
          <strong>{format(anchor, "d")}</strong>
        </div>
        <div>
          <h3>{format(anchor, "MMMM yyyy")}</h3>
          <p>{dayEvents.length} {dayEvents.length === 1 ? "calendar entry" : "calendar entries"}</p>
        </div>
      </header>
      <div className={styles.singleDaySchedule}>
        <div className={[styles.singleAllDayRow, styles.singleUnknownRow, !unknownExpanded ? styles.collapsedLaneRow : ""].join(" ")}>
          <LaneToggleLabel label="Unknown" expanded={unknownExpanded} count={unknownEvents.length} onToggle={() => setUnknownExpanded((current) => !current)} />
          {unknownExpanded ? <UnknownLane events={unknownEvents} onSelect={onSelect} /> : <CollapsedLane count={unknownEvents.length} />}
        </div>
        <div className={[styles.singleAllDayRow, !unknownExpanded ? styles.afterCollapsedUnknown : "", !allDayExpanded ? styles.collapsedLaneRow : ""].join(" ")}>
          <LaneToggleLabel label="All day" expanded={allDayExpanded} count={allDayEvents.length} onToggle={() => setAllDayExpanded((current) => !current)} />
          {allDayExpanded ? <AllDayLane events={allDayEvents} onSelect={onSelect} /> : <CollapsedLane count={allDayEvents.length} />}
        </div>
        <div className={styles.singleTimelineRow}>
          <TimeAxis {...bounds} hourHeight={DAY_HOUR_HEIGHT} />
          <TimedDayColumn
            day={anchor}
            events={dayEvents}
            {...bounds}
            single
            hourHeight={DAY_HOUR_HEIGHT}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}

function EventDetails({
  event,
  onClose,
  onCalendarChanged,
  canModifyHours = false,
  canManageOvertime = false,
  canSplitHours = false,
}) {
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [correctionNote, setCorrectionNote] = useState("");
  const [feedbackVote, setFeedbackVote] = useState("");
  const [feedbackReason, setFeedbackReason] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState("");
  const [isOvertime, setIsOvertime] = useState(false);
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitValue, setSplitValue] = useState("");
  const [overtimePart, setOvertimePart] = useState("after");
  const [splitNote, setSplitNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const editableClock =
      event?.timeEntryId &&
      event?.timeEntryStatus === "closed" &&
      ["manual_clock", "manual_travel"].includes(event?.source);
    const editableTimed = event && !event.allDay && !event.unknownDuration;
    setStartValue(editableClock || editableTimed ? localDateTimeValue(event.start) : "");
    setEndValue(editableClock || editableTimed ? localDateTimeValue(event.end) : "");
    setCorrectionNote("");
    setFeedbackVote("");
    setFeedbackReason("");
    setSelectedPersonId(personIdentity(event?.people?.[0]));
    setIsOvertime(isOvertimeEvent(event));
    setSplitOpen(false);
    const startMs = Date.parse(event?.start || "");
    const endMs = Date.parse(event?.end || "");
    setSplitValue(
      Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs
        ? localDateTimeValue(new Date(startMs + (endMs - startMs) / 2))
        : ""
    );
    setOvertimePart("after");
    setSplitNote("");
    setMessage("");
  }, [event?.id]);

  useEffect(() => {
    if (!event) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (keyEvent) => {
      if (keyEvent.key === "Escape") onClose?.();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;
  const person =
    event.people?.find(
      (candidate) => personIdentity(candidate) === selectedPersonId
    ) || event.people?.[0] || {};
  const editingClock = Boolean(
    canModifyHours &&
      event.timeEntryId &&
      event.timeEntryStatus === "closed" &&
      ["manual_clock", "manual_travel"].includes(event.source)
  );
  const resolvingUnknown = Boolean(
    canModifyHours && event.unknownDuration && event.mode === "in_person"
  );
  const correctingEvent = Boolean(
    canModifyHours &&
      !editingClock &&
      !event.allDay &&
      !event.unknownDuration &&
      event.people?.length
  );
  const managedTimeEntry = Boolean(
    event.timeEntryId &&
      event.timeEntryStatus === "closed" &&
      ["manual_clock", "manual_travel", "calendar_correction"].includes(event.source)
  );
  const canSetEventOvertime = Boolean(canManageOvertime && managedTimeEntry);
  const canSplitEvent = Boolean(canSplitHours && managedTimeEntry);
  const saveHours = async () => {
    setSaving(true);
    setMessage("");
    try {
      if (!startValue || !endValue) {
        throw new Error("Choose both the arrival and departure time.");
      }
      await opsRequest("/api/ops/calendar", {
        method: "PATCH",
        body: JSON.stringify({
          action: editingClock
            ? "edit_clock"
            : resolvingUnknown
              ? "resolve_unknown"
              : "correct_event",
          sourceEventId:
            editingClock
              ? event.id
              : `${event.id}::person:${personIdentity(person)}`,
          workOrderId: event.workOrderId,
          timeEntryId: event.timeEntryId,
          person,
          startIso: new Date(startValue).toISOString(),
          endIso: new Date(endValue).toISOString(),
          timeType: event.source === "manual_travel" ? "travel" : "work",
          isOvertime,
          notes: correctionNote,
        }),
      });
      setMessage(
        editingClock
          ? "Official clock-in/out hours updated."
          : "Hours saved. The calendar will use this corrected session."
      );
      await onCalendarChanged?.();
    } catch (requestError) {
      setMessage(requestError.message);
    } finally {
      setSaving(false);
    }
  };
  const saveOvertime = async () => {
    setSaving(true);
    setMessage("");
    try {
      await opsRequest("/api/ops/calendar", {
        method: "PATCH",
        body: JSON.stringify({
          action: "set_overtime",
          workOrderId: event.workOrderId,
          sourceEventId: event.id,
          timeEntryId: event.timeEntryId,
          isOvertime,
          notes: correctionNote,
        }),
      });
      await onCalendarChanged?.();
    } catch (requestError) {
      setMessage(requestError.message);
    } finally {
      setSaving(false);
    }
  };
  const splitTimeBlock = async () => {
    setSaving(true);
    setMessage("");
    try {
      const split = new Date(splitValue || "");
      const start = new Date(event.start || "");
      const end = new Date(event.end || "");
      if (
        Number.isNaN(split.getTime()) ||
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime()) ||
        split <= start ||
        split >= end
      ) {
        throw new Error("Choose a split point inside this time block.");
      }
      await opsRequest("/api/ops/calendar", {
        method: "PATCH",
        body: JSON.stringify({
          action: "split_time_block",
          workOrderId: event.workOrderId,
          sourceEventId: event.id,
          timeEntryId: event.timeEntryId,
          splitIso: split.toISOString(),
          overtimePart,
          notes: splitNote,
        }),
      });
      await onCalendarChanged?.();
    } catch (requestError) {
      setMessage(requestError.message);
    } finally {
      setSaving(false);
    }
  };
  const saveFeedback = async (vote) => {
    if (vote === "down" && !feedbackReason.trim()) {
      setFeedbackVote("down");
      setMessage("Tell the AI what evidence it should have checked.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await opsRequest("/api/ops/calendar", {
        method: "PATCH",
        body: JSON.stringify({
          action: "feedback",
          sourceEventId: event.id,
          workOrderId: event.workOrderId,
          person,
          vote,
          reason: feedbackReason,
          inferenceReason: event.inferenceReason,
        }),
      });
      setFeedbackVote(vote);
      setMessage("Feedback saved to Ops learning memory.");
    } catch (requestError) {
      setMessage(requestError.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className={styles.modalBackdrop} onMouseDown={onClose}>
    <aside
      className={styles.detailPanel}
      style={eventStyle(event)}
      role="dialog"
      aria-modal="true"
      aria-label={`Work order ${event.number} calendar details`}
      onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}
    >
      <div className={styles.detailTop}>
        <div>
          <span>{SOURCE_LABELS[event.source] || "Work order activity"}</span>
          <h3>{eventTitle(event)}{isOvertimeEvent(event) ? <b className={styles.detailOtBadge}>OT</b> : null}</h3>
          <p>{event.subject || "Work-order activity"}{event.customer ? ` · ${event.customer}` : ""}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close details"><Icon name="close" size={18} /></button>
      </div>
      <div className={styles.detailFacts}>
        <div><span>When</span><strong>{format(new Date(event.start), "EEEE, MMM d · ")}{eventTime(event)}</strong></div>
        <div><span>Duration</span><strong>{eventDuration(event)}</strong></div>
        <div><span>Work mode</span><strong>{modeLabel(event.mode)}</strong></div>
        <div><span>Record source</span><strong>{SOURCE_LABELS[event.source] || "Work order activity"}</strong></div>
        <div><span>Pay classification</span><strong>{isOvertimeEvent(event) ? "Overtime" : "Regular time"}</strong></div>
      </div>
      <div className={styles.detailPeopleGrid}>
        <div>
          <span>People in this time segment</span>
          <strong>{eventPeople(event)}</strong>
        </div>
        <div>
          <span>Current assignment</span>
          <strong>{peopleNames(event.assignees, "Unassigned")}</strong>
          {event.assignmentSummary ? <small>{event.assignmentSummary}</small> : null}
        </div>
        <div>
          <span>Participation</span>
          <strong>{peopleNames(event.participants)}</strong>
          {event.participationSummary ? <small>{event.participationSummary}</small> : null}
        </div>
      </div>
      {event.bluefolderAssignees?.length ? (
        <p className={styles.protectedAssignment}>
          <strong>Protected BlueFolder assignment:</strong> {peopleNames(event.bluefolderAssignees)}
        </p>
      ) : null}
      <div className={styles.activityHeading}><span>Activity</span><strong>{briefActivity(event)}</strong></div>
      <p className={styles.detailSummary}>{event.summary || "No conversation note was recorded for this entry."}</p>
      {event.inferenceReason ? (
        <p className={styles.inferenceReason}>
          <strong>Why the AI placed this:</strong> {event.inferenceReason}
        </p>
      ) : null}
      {editingClock || resolvingUnknown || correctingEvent ? (
        <div className={styles.unknownEditor}>
          <div>
            <span>{editingClock ? "EDIT OFFICIAL CLOCK" : resolvingUnknown ? "CONFIRM ONSITE HOURS" : "EDIT TIME BLOCK"}</span>
            <strong>
              {editingClock
                ? "Correct the clock-in and clock-out time"
                : resolvingUnknown
                  ? "Set the engineer's arrival and departure"
                  : "Change this block's start and end time"}
            </strong>
          </div>
          <div className={styles.unknownFields}>
            {event.people?.length > 1 && !editingClock ? (
              <label className={styles.personCorrectionField}>
                Engineer
                <select value={personIdentity(person)} onChange={(changeEvent) => setSelectedPersonId(changeEvent.target.value)}>
                  {event.people.map((candidate) => (
                    <option key={personIdentity(candidate)} value={personIdentity(candidate)}>{candidate.name}</option>
                  ))}
                </select>
              </label>
            ) : null}
            <label>
              Arrived
              <input
                type="datetime-local"
                value={startValue}
                onChange={(changeEvent) => setStartValue(changeEvent.target.value)}
              />
            </label>
            <label>
              Departed
              <input
                type="datetime-local"
                value={endValue}
                onChange={(changeEvent) => setEndValue(changeEvent.target.value)}
              />
            </label>
          </div>
          <label className={styles.correctionNote}>
            Optional note
            <textarea
              value={correctionNote}
              onChange={(changeEvent) => setCorrectionNote(changeEvent.target.value)}
              placeholder={correctingEvent ? "Why are you changing this block?" : "What evidence confirmed these hours?"}
              rows={2}
            />
          </label>
          <label className={styles.editorCheckbox}>
            <input type="checkbox" checked={isOvertime} onChange={(changeEvent) => setIsOvertime(changeEvent.target.checked)} />
            Mark this entire block as overtime
          </label>
          <button type="button" onClick={saveHours} disabled={saving}>
            {editingClock ? "Update clocked hours" : correctingEvent ? "Update time block" : "Save corrected hours"}
          </button>
        </div>
      ) : null}
      {canSetEventOvertime || canSplitEvent ? (
        <div className={styles.timeClassificationEditor}>
          <div className={styles.timeClassificationHeading}>
            <div>
              <span>TIME CLASSIFICATION</span>
              <strong>Regular time, overtime, and split blocks</strong>
            </div>
            {canSetEventOvertime ? (
              <label className={styles.otSwitch}>
                <input type="checkbox" checked={isOvertime} onChange={(changeEvent) => setIsOvertime(changeEvent.target.checked)} />
                <span>OT</span>
              </label>
            ) : null}
          </div>
          {canSetEventOvertime ? (
            <div className={styles.timeClassificationActions}>
              <button type="button" onClick={saveOvertime} disabled={saving}>
                {isOvertime ? "Save as overtime" : "Save as regular time"}
              </button>
              {canSplitEvent ? (
                <button type="button" onClick={() => setSplitOpen((current) => !current)} disabled={saving}>
                  {splitOpen ? "Cancel split" : "Split block"}
                </button>
              ) : null}
            </div>
          ) : null}
          {splitOpen && canSplitEvent ? (
            <div className={styles.splitEditor}>
              <label>
                Split at
                <input type="datetime-local" value={splitValue} onChange={(changeEvent) => setSplitValue(changeEvent.target.value)} />
              </label>
              <label>
                Overtime section
                <select value={overtimePart} onChange={(changeEvent) => setOvertimePart(changeEvent.target.value)}>
                  <option value="after">After the split</option>
                  <option value="before">Before the split</option>
                  <option value="both">Both sections</option>
                  <option value="neither">Neither section</option>
                </select>
              </label>
              <label className={styles.splitNoteField}>
                Optional note
                <textarea rows={2} value={splitNote} onChange={(changeEvent) => setSplitNote(changeEvent.target.value)} placeholder="Why is this block being split?" />
              </label>
              <button type="button" onClick={splitTimeBlock} disabled={saving || !splitValue}>
                Split and save
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {["activity", "onsite_unknown"].includes(event.source) ? (
        <div className={styles.aiFeedback}>
          <div>
            <span>AI DECISION FEEDBACK</span>
            <strong>Was this placement and work mode correct?</strong>
          </div>
          <div className={styles.feedbackButtons}>
            <button
              type="button"
              data-active={feedbackVote === "up"}
              onClick={() => saveFeedback("up")}
              disabled={saving}
              aria-label="Correct"
            >
              👍
            </button>
            <button
              type="button"
              data-active={feedbackVote === "neutral"}
              onClick={() => saveFeedback("neutral")}
              disabled={saving}
              aria-label="Unsure"
            >
              ➖
            </button>
            <button
              type="button"
              data-active={feedbackVote === "down"}
              onClick={() => setFeedbackVote("down")}
              disabled={saving}
              aria-label="Incorrect"
            >
              👎
            </button>
          </div>
          {feedbackVote === "down" ? (
            <div className={styles.feedbackCorrection}>
              <textarea
                value={feedbackReason}
                onChange={(changeEvent) => setFeedbackReason(changeEvent.target.value)}
                placeholder="Why was this wrong, and where or how should it be recorded instead?"
                rows={3}
              />
              <button type="button" onClick={() => saveFeedback("down")} disabled={saving}>
                Save correction feedback
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {message ? <p className={styles.detailMessage}>{message}</p> : null}
      <div className={styles.detailLinks}>
        {event.slackPermalink ? <a href={event.slackPermalink} target="_blank" rel="noreferrer">Slack thread <Icon name="external" size={14} /></a> : null}
        {event.bluefolderUrl ? <a href={event.bluefolderUrl} target="_blank" rel="noreferrer">BlueFolder <Icon name="external" size={14} /></a> : null}
      </div>
    </aside>
    </div>
  );
}

function AdminTimeBlockModal({
  open,
  onClose,
  people,
  workOrders,
  anchor,
  onSaved,
}) {
  const [personId, setPersonId] = useState("");
  const [workOrderId, setWorkOrderId] = useState("");
  const [personSearch, setPersonSearch] = useState("");
  const [workOrderSearch, setWorkOrderSearch] = useState("");
  const [personMenuOpen, setPersonMenuOpen] = useState(false);
  const [workOrderMenuOpen, setWorkOrderMenuOpen] = useState(false);
  const [timeType, setTimeType] = useState("work");
  const [isOvertime, setIsOvertime] = useState(false);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const start = new Date(anchor || new Date());
    start.setHours(9, 0, 0, 0);
    const end = new Date(start);
    end.setHours(10, 0, 0, 0);
    setPersonId("");
    setWorkOrderId("");
    setPersonSearch("");
    setWorkOrderSearch("");
    setPersonMenuOpen(false);
    setWorkOrderMenuOpen(false);
    setTimeType("work");
    setIsOvertime(false);
    setStartValue(localDateTimeValue(start));
    setEndValue(localDateTimeValue(end));
    setNotes("");
    setMessage("");
  }, [anchor, open, people, workOrders]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const filteredPeople = useMemo(() => {
    const query = personSearch.trim().toLowerCase();
    return people
      .filter((person) => {
        if (!query) return true;
        return [person.name, person.email, person.id]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .slice(0, 40);
  }, [people, personSearch]);
  const filteredWorkOrders = useMemo(() => {
    const query = workOrderSearch.trim().toLowerCase().replace(/^#/, "");
    return workOrders
      .filter((workOrder) => {
        if (!query) return true;
        return `${workOrder.number || ""} ${workOrder.subject || ""}`
          .toLowerCase()
          .includes(query);
      })
      .slice(0, 40);
  }, [workOrderSearch, workOrders]);

  if (!open) return null;
  const selectedPerson = people.find(
    (person) => personIdentity(person) === personId
  );
  const selectedWorkOrder = workOrders.find(
    (workOrder) => workOrder.id === workOrderId
  );
  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      if (!selectedPerson || !selectedWorkOrder || !startValue || !endValue) {
        throw new Error("Choose an engineer, work order, start, and end time.");
      }
      await opsRequest("/api/ops/calendar", {
        method: "PATCH",
        body: JSON.stringify({
          action: "add_time_block",
          workOrderId: selectedWorkOrder.id,
          person: selectedPerson,
          startIso: new Date(startValue).toISOString(),
          endIso: new Date(endValue).toISOString(),
          timeType,
          isOvertime,
          notes,
        }),
      });
      await onSaved?.();
      onClose?.();
    } catch (requestError) {
      setMessage(requestError.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className={styles.modalBackdrop} onMouseDown={onClose}>
      <aside className={[styles.detailPanel, styles.addTimePanel].join(" ")} role="dialog" aria-modal="true" aria-label="Add engineer time block" onMouseDown={(event) => event.stopPropagation()}>
        <div className={styles.detailTop}>
          <div>
            <span>MASTER ADMIN</span>
            <h3>Add a time block</h3>
            <p>Create an official work or travel record for an engineer.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        </div>
        <div className={styles.addTimeForm}>
          <label>
            Engineer
            <div className={styles.searchPicker}>
              <input
                type="search"
                value={personSearch}
                placeholder="Search by name or email..."
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={personMenuOpen}
                aria-controls="add-time-person-options"
                onFocus={(event) => {
                  setPersonMenuOpen(true);
                  event.target.select();
                }}
                onBlur={() => setPersonMenuOpen(false)}
                onChange={(event) => {
                  setPersonSearch(event.target.value);
                  setPersonId("");
                  setPersonMenuOpen(true);
                }}
              />
              {personMenuOpen ? (
                <div className={styles.searchPickerMenu} id="add-time-person-options" role="listbox">
                  {filteredPeople.map((person) => {
                    const id = personIdentity(person);
                    return (
                      <button
                        key={id}
                        type="button"
                        role="option"
                        aria-selected={personId === id}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          setPersonId(id);
                          setPersonSearch(person.name || person.email || id);
                          setPersonMenuOpen(false);
                        }}
                      >
                        <strong>{person.name || "Unnamed engineer"}</strong>
                        {person.email ? <span>{person.email}</span> : null}
                      </button>
                    );
                  })}
                  {!filteredPeople.length ? <p>No matching engineers</p> : null}
                </div>
              ) : null}
            </div>
          </label>
          <label>
            Work order
            <div className={styles.searchPicker}>
              <input
                type="search"
                value={workOrderSearch}
                placeholder="Search by number or title..."
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={workOrderMenuOpen}
                aria-controls="add-time-work-order-options"
                onFocus={(event) => {
                  setWorkOrderMenuOpen(true);
                  event.target.select();
                }}
                onBlur={() => setWorkOrderMenuOpen(false)}
                onChange={(event) => {
                  setWorkOrderSearch(event.target.value);
                  setWorkOrderId("");
                  setWorkOrderMenuOpen(true);
                }}
              />
              {workOrderMenuOpen ? (
                <div className={styles.searchPickerMenu} id="add-time-work-order-options" role="listbox">
                  {filteredWorkOrders.map((workOrder) => (
                    <button
                      key={workOrder.id}
                      type="button"
                      role="option"
                      aria-selected={workOrderId === workOrder.id}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setWorkOrderId(workOrder.id);
                        setWorkOrderSearch(`WO #${workOrder.number} - ${workOrder.subject}`);
                        setWorkOrderMenuOpen(false);
                      }}
                    >
                      <strong>WO #{workOrder.number}</strong>
                      <span>{workOrder.subject}</span>
                    </button>
                  ))}
                  {!filteredWorkOrders.length ? <p>No matching work orders</p> : null}
                </div>
              ) : null}
            </div>
          </label>
          <label>
            Time type
            <select value={timeType} onChange={(event) => setTimeType(event.target.value)}>
              <option value="work">Work / on site</option>
              <option value="travel">Travel</option>
            </select>
          </label>
          <label>
            Start
            <input type="datetime-local" value={startValue} onChange={(event) => setStartValue(event.target.value)} />
          </label>
          <label>
            End
            <input type="datetime-local" value={endValue} onChange={(event) => setEndValue(event.target.value)} />
          </label>
          <label className={styles.addTimeCheckbox}>
            <input type="checkbox" checked={isOvertime} onChange={(event) => setIsOvertime(event.target.checked)} />
            <span>Mark this block as overtime</span>
          </label>
          <label className={styles.addTimeNotes}>
            Optional note
            <textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Why was this time added?" />
          </label>
        </div>
        {message ? <p className={styles.detailMessage}>{message}</p> : null}
        <div className={styles.addTimeActions}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={save} disabled={saving || !personId || !workOrderId}>{saving ? "Saving..." : "Add time block"}</button>
        </div>
      </aside>
    </div>
  );
}

function CalendarNotifications({ notifications = [], onReview, busyId = "", message = "" }) {
  const pending = notifications.filter(
    (notification) => String(notification.status || "pending").toLowerCase() === "pending"
  );
  const [expanded, setExpanded] = useState(Boolean(pending.length));
  const [decisionNotes, setDecisionNotes] = useState({});

  useEffect(() => {
    if (pending.length) setExpanded(true);
  }, [pending.length]);

  return (
    <section className={styles.notificationsPanel} data-expanded={expanded ? "true" : "false"}>
      <button className={styles.notificationsHeading} type="button" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded}>
        <span className={styles.notificationsIcon}><Icon name="bell" size={18} /></span>
        <span>
          <small>ADMIN REVIEW</small>
          <strong>Notifications</strong>
        </span>
        <b>{pending.length}</b>
        <i className={expanded ? styles.notificationChevronOpen : ""}><Icon name="chevron" size={16} /></i>
      </button>
      {expanded ? (
        <div className={styles.notificationsBody}>
          {!pending.length ? (
            <p className={styles.notificationsEmpty}>No requests need your review.</p>
          ) : (
            pending.map((notification) => {
              const kind = notificationKind(notification);
              const notificationId = notification.notificationId || notification.id;
              const current = notification.current || notification.original || {};
              const requested = notification.requested || notification.requestedChanges || {};
              const requester = notification.requester || {};
              const requesterName = notification.requesterName || requester.name || notification.userName || "Magmo user";
              const number = notification.workOrderNumber || notification.workOrder?.number || notification.number || "—";
              const subject = notification.workOrderSubject || notification.workOrder?.subject || notification.subject || "Work order";
              const reason = notification.reason || requested.reason || notification.requestReason || notification.summary || "No reason was provided.";
              const note = decisionNotes[notificationId] || "";
              return (
                <article className={styles.notificationCard} key={notificationId} data-kind={kind}>
                  <div className={styles.notificationIdentity}>
                    <span>{kind === "assignment_dispute" ? "ASSIGNMENT DISPUTE" : "HOURS EDIT"}</span>
                    <strong>{requesterName} · WO #{number}</strong>
                    <small>{subject}</small>
                  </div>
                  {kind === "time_edit" ? (
                    <div className={styles.notificationComparison}>
                      <div>
                        <span>Recorded</span>
                        <strong>{notificationTimeRange(current.startIso || notification.currentStartIso, current.endIso || notification.currentEndIso)}</strong>
                        <small>{current.timeType === "travel" ? "Travel" : "Work"}</small>
                      </div>
                      <i><Icon name="chevron" size={15} /></i>
                      <div>
                        <span>Requested</span>
                        <strong>{notificationTimeRange(requested.startIso || notification.requestedStartIso, requested.endIso || notification.requestedEndIso)}</strong>
                        <small>{requested.timeType === "travel" ? "Travel" : "Work"}</small>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.notificationDispute}>
                      <span>The user says this work order was not assigned to them.</span>
                      <strong>{notification.assigneeName || requesterName}</strong>
                    </div>
                  )}
                  <p>{reason}</p>
                  <label className={styles.notificationNote}>
                    Decision note (optional)
                    <input
                      type="text"
                      value={note}
                      onChange={(event) => setDecisionNotes((currentNotes) => ({ ...currentNotes, [notificationId]: event.target.value }))}
                      placeholder="Add context for the Slack message..."
                    />
                  </label>
                  <div className={styles.notificationActions}>
                    <button type="button" disabled={busyId === notificationId} onClick={() => onReview?.(notification, "denied", note)}>Deny</button>
                    <button type="button" disabled={busyId === notificationId} onClick={() => onReview?.(notification, "approved", note)}>
                      {busyId === notificationId ? "Saving..." : "Approve"}
                    </button>
                  </div>
                </article>
              );
            })
          )}
          {message ? <p className={styles.notificationMessage}>{message}</p> : null}
        </div>
      ) : null}
    </section>
  );
}

function HoursSummary({ records, kind = "work" }) {
  const [collapsed, setCollapsed] = useState(kind === "travel");
  const storageKey = `ops-calendar-${kind}-hours-collapsed`;
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      setCollapsed(stored == null ? kind === "travel" : stored === "1");
    } catch {}
  }, [kind, storageKey]);
  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {}
      return next;
    });
  };
  const days = useMemo(() => {
    const grouped = new Map();
    records.forEach((record) => {
      if (!grouped.has(record.date)) grouped.set(record.date, []);
      grouped.get(record.date).push(record);
    });
    return [...grouped.entries()].sort(([left], [right]) =>
      left.localeCompare(right)
    );
  }, [records]);
  if (!days.length) return null;
  return (
    <section className={styles.hoursPanel}>
      <div className={styles.hoursHeading}>
        <div>
          <span>{kind === "travel" ? "TRAVEL COVERAGE" : "IN-PERSON COVERAGE"}</span>
          <h3>{kind === "travel" ? "Engineer travel hours" : "Engineer work hours on site"}</h3>
        </div>
        <div className={styles.hoursHeadingActions}>
          <p>{kind === "travel" ? "Travel is tracked separately from hands-on work." : "Manual clocks take priority; Slack only supplies hours when onsite boundaries are clear."}</p>
          <button type="button" onClick={toggleCollapsed}>
            {collapsed ? "Maximize" : "Minimize"}
          </button>
        </div>
      </div>
      {!collapsed ? <div className={styles.hoursDays}>
        {days.map(([date, entries]) => (
          <article key={date}>
            <header>
              <div>
                <span>{format(new Date(`${date}T12:00:00`), "EEE")}</span>
                <strong>{format(new Date(`${date}T12:00:00`), "MMM d")}</strong>
              </div>
              <b>
                {formatHours(
                  entries.reduce((total, entry) => total + entry.minutes, 0)
                )}
                {entries.some((entry) => entry.unknown) ? " + unknown" : ""}
              </b>
            </header>
            <div>
              {entries.map((entry) => (
                <div
                  className={styles.engineerHoursRow}
                  key={`${date}-${entry.person.id || entry.person.name}`}
                >
                  <span
                    className={styles.personDot}
                    style={{ "--person-hue": eventHue({ people: [entry.person] }) }}
                  />
                  <strong>{entry.person.name}</strong>
                  <span>{entry.unknown ? "Unknown time" : formatHours(entry.minutes)}</span>
                  <small>
                    {entry.workOrderNumbers.length
                      ? `WO ${entry.workOrderNumbers.join(", ")}`
                      : "On-site activity"}
                    {" · "}
                    {entry.corrected
                      ? "Admin corrected"
                      : entry.manual
                      ? "Manual clock"
                      : entry.unknown
                      ? "Confirmed onsite"
                      : "Slack evidence"}
                  </small>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div> : null}
    </section>
  );
}

function filterHourRecords(records, selectedPeople, selectedWorkOrders) {
  const peopleSet = new Set(selectedPeople);
  const workOrderSet = new Set(selectedWorkOrders);
  return records
    .filter((entry) => !peopleSet.size || peopleSet.has(personIdentity(entry.person)))
    .map((entry) => {
      if (!workOrderSet.size) return entry;
      const matchingWorkOrders = (entry.workOrderHours || []).filter(
        (workOrder) =>
          workOrderSet.has(String(workOrder.workOrderId || "")) ||
          workOrderSet.has(String(workOrder.workOrderNumber || ""))
      );
      if (!matchingWorkOrders.length) {
        const legacyMatch =
          workOrderSet.has(String(entry.workOrderId || "")) ||
          (entry.workOrderNumbers || []).some((number) =>
            workOrderSet.has(String(number))
          );
        return legacyMatch ? entry : null;
      }
      const minutes = matchingWorkOrders.reduce(
        (total, workOrder) => total + Number(workOrder.minutes || 0),
        0
      );
      return {
        ...entry,
        minutes,
        hours: Number((minutes / 60).toFixed(2)),
        unknown: matchingWorkOrders.some((workOrder) => workOrder.unknown),
        workOrderNumbers: matchingWorkOrders
          .map((workOrder) => workOrder.workOrderNumber)
          .filter(Boolean),
        workOrderHours: matchingWorkOrders,
      };
    })
    .filter((entry) => entry && (entry.unknown || Number(entry.minutes || 0) > 0));
}

function CalendarContent() {
  const [view, setView] = useState("week");
  const [anchor, setAnchor] = useState(() => new Date());
  const [events, setEvents] = useState([]);
  const [people, setPeople] = useState([]);
  const [calendarWorkOrders, setCalendarWorkOrders] = useState([]);
  const [onSiteHours, setOnSiteHours] = useState([]);
  const [travelHours, setTravelHours] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [canModifyHours, setCanModifyHours] = useState(false);
  const [canManageOvertime, setCanManageOvertime] = useState(false);
  const [canSplitHours, setCanSplitHours] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedWorkOrders, setSelectedWorkOrders] = useState([]);
  const [selectedModes, setSelectedModes] = useState(["in_person"]);
  const [peopleSearch, setPeopleSearch] = useState("");
  const [workOrderSearch, setWorkOrderSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [notificationBusyId, setNotificationBusyId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [otCoverageOpen, setOtCoverageOpen] = useState(false);
  const [addTimeOpen, setAddTimeOpen] = useState(false);

  const range = useMemo(() => {
    if (view === "day") return { start: startOfDay(anchor), end: endOfDay(anchor) };
    if (view === "week") return {
      start: startOfWeek(anchor, { weekStartsOn: 1 }),
      end: endOfWeek(anchor, { weekStartsOn: 1 }),
    };
    return {
      start: startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 }),
    };
  }, [anchor, view]);

  const loadCalendar = useCallback(async () => {
    setRefreshing(true);
    try {
      const query = new URLSearchParams({ start: range.start.toISOString(), end: range.end.toISOString() });
      const data = await opsRequest(`/api/ops/calendar?${query}`);
      setEvents(data.events || []);
      setPeople(data.people || []);
      setCalendarWorkOrders(data.workOrders || []);
      setOnSiteHours(data.onSiteHours || []);
      setTravelHours(data.travelHours || []);
      setNotifications(data.notifications || []);
      setCanModifyHours(Boolean(data.canModifyHours));
      setCanManageOvertime(Boolean(data.canManageOvertime));
      setCanSplitHours(Boolean(data.canSplitHours));
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [range.end, range.start]);

  useEffect(() => { loadCalendar(); }, [loadCalendar, refreshKey]);

  const workOrders = useMemo(() => {
    const options = new Map();
    calendarWorkOrders.forEach((workOrder) => {
      const id = String(workOrder.id || "");
      if (!id || !workOrder.number) return;
      options.set(id, {
        id,
        number: String(workOrder.number),
        subject: workOrder.subject || "Work order",
      });
    });
    events.forEach((event) => {
      const id = workOrderIdentity(event);
      if (!id || !event.number) return;
      if (!options.has(id)) {
        options.set(id, {
          id,
          number: String(event.number),
          subject: event.subject || "Work order",
        });
      }
    });
    return [...options.values()].sort((left, right) =>
      left.number.localeCompare(right.number, undefined, { numeric: true })
    );
  }, [calendarWorkOrders, events]);
  const filteredPeopleOptions = useMemo(() => {
    const query = peopleSearch.trim().toLowerCase();
    return query
      ? people.filter((person) => person.name?.toLowerCase().includes(query))
      : people;
  }, [people, peopleSearch]);
  const filteredWorkOrderOptions = useMemo(() => {
    const query = workOrderSearch.trim().toLowerCase().replace(/^#/, "");
    return query
      ? workOrders.filter(
          (workOrder) =>
            workOrder.number.toLowerCase().includes(query) ||
            workOrder.subject.toLowerCase().includes(query)
        )
      : workOrders;
  }, [workOrderSearch, workOrders]);
  const filteredEvents = useMemo(() => {
    const peopleSet = new Set(selectedPeople);
    const workOrderSet = new Set(selectedWorkOrders);
    const showsInPerson = selectedModes.includes("in_person");
    const showsRemote = selectedModes.includes("remote");
    return events.filter((event) => {
      const matchesPeople =
        !peopleSet.size ||
        (event.people || []).some((person) => peopleSet.has(personIdentity(person)));
      const matchesWorkOrder =
        !workOrderSet.size || workOrderSet.has(workOrderIdentity(event));
      const mode = event.mode || "unspecified";
      const matchesMode =
        showsInPerson && showsRemote
          ? true
          : showsRemote
            ? mode === "remote"
            : mode === "in_person";
      return matchesPeople && matchesWorkOrder && matchesMode;
    });
  }, [events, selectedModes, selectedPeople, selectedWorkOrders]);
  const filteredOnSiteHours = useMemo(() => {
    if (!selectedModes.includes("in_person")) return [];
    return filterHourRecords(onSiteHours, selectedPeople, selectedWorkOrders);
  }, [onSiteHours, selectedModes, selectedPeople, selectedWorkOrders]);
  const filteredTravelHours = useMemo(
    () => selectedModes.includes("in_person")
      ? filterHourRecords(travelHours, selectedPeople, selectedWorkOrders)
      : [],
    [travelHours, selectedModes, selectedPeople, selectedWorkOrders]
  );

  const title = view === "day"
    ? format(anchor, "MMMM d, yyyy")
    : view === "week"
    ? `${format(range.start, "MMM d")} – ${format(range.end, "MMM d, yyyy")}`
    : format(anchor, "MMMM yyyy");
  const peopleFilterLabel = selectedPeople.length
    ? `${selectedPeople.length} ${selectedPeople.length === 1 ? "person" : "people"}`
    : "Everyone";
  const workOrderFilterLabel = selectedWorkOrders.length
    ? `${selectedWorkOrders.length} ${selectedWorkOrders.length === 1 ? "work order" : "work orders"}`
    : "All work orders";
  const reportFilterLabel = `${peopleFilterLabel} · ${workOrderFilterLabel}`;
  const modeFilterLabel = selectedModes.length === 2
    ? "In person + remote"
    : selectedModes[0] === "remote"
      ? "Remote only"
      : "In person only";
  const printFilterLabel = `${reportFilterLabel} / ${modeFilterLabel}`;
  const visiblePeople = new Set(filteredEvents.flatMap((event) => (event.people || []).map((person) => person.id || person.name))).size;
  const remoteCount = filteredEvents.filter((event) => ["remote", "mixed"].includes(event.mode)).length;
  const onSiteMinutes = filteredOnSiteHours.reduce(
    (total, entry) => total + Number(entry.minutes || 0),
    0
  );

  const move = (amount) => setAnchor((date) =>
    view === "day" ? addDays(date, amount) : view === "week" ? addWeeks(date, amount) : addMonths(date, amount)
  );
  const openDay = (day) => { setAnchor(day); setView("day"); };
  const togglePerson = (personId) => setSelectedPeople((current) =>
    current.includes(personId) ? current.filter((id) => id !== personId) : [...current, personId]
  );
  const toggleWorkOrder = (workOrderId) => setSelectedWorkOrders((current) =>
    current.includes(workOrderId)
      ? current.filter((id) => id !== workOrderId)
      : [...current, workOrderId]
  );
  const toggleMode = (mode) => setSelectedModes((current) => {
    if (current.includes(mode)) {
      return current.length === 1 ? current : current.filter((value) => value !== mode);
    }
    return [...current, mode];
  });
  const reviewNotification = async (notification, decision, decisionNote = "") => {
    const notificationId = notification.notificationId || notification.id;
    const notificationType = notification.notificationType || notification.type;
    setNotificationBusyId(notificationId);
    setNotificationMessage("");
    try {
      const result = await opsRequest("/api/ops/calendar", {
        method: "PATCH",
        body: JSON.stringify({
          action: "review_notification",
          notificationId,
          notificationType,
          requestId: notification.id,
          workOrderId: notification.workOrder?.id || notification.workOrderId,
          disputeId: notificationType === "assignment_dispute" ? notification.id : undefined,
          decision,
          decisionNote,
        }),
      });
      setNotificationMessage(
        result.slackDm?.sent === false
          ? `Request ${decision === "approved" ? "approved" : "denied"}, but the Slack DM could not be delivered.`
          : decision === "approved"
            ? "Request approved and the user was notified."
            : "Request denied and the user was notified."
      );
      await loadCalendar();
    } catch (requestError) {
      setNotificationMessage(requestError.message);
    } finally {
      setNotificationBusyId("");
    }
  };

  return (
    <div className={styles.page}>
      <Head><title>Operations Calendar | Magmo</title></Head>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandBlock}>
            <Link href="/Ops" className={styles.backLink} aria-label="Back to Ops"><Icon name="back" size={18} /></Link>
            <div className={styles.brandMark}><Icon name="calendar" size={20} /></div>
            <div><span>MAGMO OPERATIONS</span><h1>Dispatch calendar</h1></div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.coverageButton} type="button" onClick={() => setOtCoverageOpen(true)}><Icon name="otCoverage" size={17} />OT coverage</button>
            <button className={styles.printButton} type="button" onClick={() => window.print()}><Icon name="print" size={17} />Print report</button>
            <button className={styles.refreshButton} type="button" onClick={() => setRefreshKey((value) => value + 1)} disabled={refreshing}>
              <span className={refreshing ? styles.spinning : ""}><Icon name="refresh" size={17} /></span>Refresh
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <div><span className={styles.overline}>TEAM COVERAGE</span><h2>Operations calendar</h2><p>See scheduled work, recorded activity, assignment changes, and completion across the team.</p></div>
          <div className={styles.insights}>
            <div><strong>{filteredEvents.length}</strong><span>Entries</span></div>
            <div><strong>{visiblePeople}</strong><span>People</span></div>
            <div><strong>{remoteCount}</strong><span>Remote</span></div>
            <div><strong>{formatHours(onSiteMinutes)}</strong><span>On site</span></div>
          </div>
        </section>

        <CalendarNotifications
          notifications={notifications}
          onReview={reviewNotification}
          busyId={notificationBusyId}
          message={notificationMessage}
        />

        <HoursSummary records={filteredOnSiteHours} kind="work" />
        <HoursSummary records={filteredTravelHours} kind="travel" />

        <section className={styles.calendarShell}>
          <div className={styles.toolbar}>
            <div className={styles.dateNavigation}>
              <button type="button" onClick={() => move(-1)} aria-label={`Previous ${view}`}><span className={styles.reverseChevron}><Icon name="chevron" size={18} /></span></button>
              <button className={styles.todayButton} type="button" onClick={() => setAnchor(new Date())}>Today</button>
              <button type="button" onClick={() => move(1)} aria-label={`Next ${view}`}><Icon name="chevron" size={18} /></button>
              <h3>{title}</h3>
            </div>
            <div className={styles.toolbarControls}>
              <div className={styles.modeFilter} role="group" aria-label="Work location filter">
                <button
                  type="button"
                  data-active={selectedModes.includes("in_person") ? "true" : "false"}
                  aria-pressed={selectedModes.includes("in_person")}
                  onClick={() => toggleMode("in_person")}
                >
                  <i className={styles.inPersonKey} />In person
                </button>
                <button
                  type="button"
                  data-active={selectedModes.includes("remote") ? "true" : "false"}
                  aria-pressed={selectedModes.includes("remote")}
                  onClick={() => toggleMode("remote")}
                >
                  <i className={styles.remoteKey} />Remote
                </button>
              </div>
              {canModifyHours ? (
                <button className={styles.addTimeButton} type="button" onClick={() => setAddTimeOpen(true)}>
                  <Icon name="plus" size={16} />Add time
                </button>
              ) : null}
              <details className={styles.peopleFilter}>
                <summary><Icon name="users" size={17} /><span>{peopleFilterLabel}</span><Icon name="chevron" size={14} /></summary>
                <div className={styles.filterMenu}>
                  <div className={styles.filterHeading}><strong>Filter by person</strong><button type="button" onClick={() => setSelectedPeople([])}>Everyone</button></div>
                  <input
                    className={styles.filterSearch}
                    type="search"
                    value={peopleSearch}
                    onChange={(changeEvent) => setPeopleSearch(changeEvent.target.value)}
                    placeholder="Search engineers..."
                    aria-label="Search engineers"
                  />
                  <div className={styles.personOptions}>
                    {filteredPeopleOptions.map((person) => {
                      const id = personIdentity(person);
                      return <label key={id}><input type="checkbox" checked={selectedPeople.includes(id)} onChange={() => togglePerson(id)} /><span className={styles.personDot} style={{ "--person-hue": eventHue({ people: [person] }) }} /><span>{person.name}</span></label>;
                    })}
                    {!filteredPeopleOptions.length ? <p className={styles.emptyFilter}>No matching people</p> : null}
                  </div>
                </div>
              </details>
              <details className={[styles.peopleFilter, styles.workOrderFilter].join(" ")}>
                <summary><Icon name="workOrder" size={17} /><span>{workOrderFilterLabel}</span><Icon name="chevron" size={14} /></summary>
                <div className={styles.filterMenu}>
                  <div className={styles.filterHeading}><strong>Filter by work order</strong><button type="button" onClick={() => setSelectedWorkOrders([])}>All work orders</button></div>
                  <input
                    className={styles.filterSearch}
                    type="search"
                    value={workOrderSearch}
                    onChange={(changeEvent) => setWorkOrderSearch(changeEvent.target.value)}
                    placeholder="Search number or title..."
                    aria-label="Search work orders"
                  />
                  <div className={[styles.personOptions, styles.workOrderOptions].join(" ")}>
                    {filteredWorkOrderOptions.map((workOrder) => (
                      <label key={workOrder.id}>
                        <input type="checkbox" checked={selectedWorkOrders.includes(workOrder.id)} onChange={() => toggleWorkOrder(workOrder.id)} />
                        <strong>#{workOrder.number}</strong>
                        <span>{workOrder.subject}</span>
                      </label>
                    ))}
                    {!filteredWorkOrderOptions.length ? <p className={styles.emptyFilter}>No matching work orders</p> : null}
                  </div>
                </div>
              </details>
              <div className={styles.viewSwitch} role="tablist" aria-label="Calendar view">
                {Object.entries(VIEW_LABELS).map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={view === id} className={view === id ? styles.activeView : ""} onClick={() => setView(id)}>{label}</button>)}
              </div>
            </div>
          </div>
          {selectedPeople.length || selectedWorkOrders.length || selectedModes.length !== 1 || selectedModes[0] !== "in_person" ? (
            <div className={styles.activeFilterBar}>
              <span>Showing the intersection of</span>
              <strong>{peopleFilterLabel}</strong>
              <i>and</i>
              <strong>{workOrderFilterLabel}</strong>
              <i>for</i>
              <strong>{modeFilterLabel}</strong>
              <button type="button" onClick={() => { setSelectedPeople([]); setSelectedWorkOrders([]); setSelectedModes(["in_person"]); }}>Reset filters</button>
            </div>
          ) : null}

          <div className={styles.legend}>
            <span><i className={styles.remoteKey} />Remote</span>
            <span><i className={styles.inPersonKey} />In person</span>
            <span><i className={styles.mixedKey} />Mixed</span>
            <span><i className={styles.unspecifiedKey} />Not specified</span>
            <small>
              {view === "week"
                ? "Busy hours are grouped for readability · open a group for exact work-order times"
                : "Color identifies the assigned person · manual clocks are shown alongside Slack activity"}
            </small>
          </div>
          {error ? <div className={styles.errorBanner}>{error}</div> : null}
          {loading ? <div className={styles.loading}><span /><p>Building the operations calendar…</p></div> : (
            <>
              {view === "month" ? <MonthView anchor={anchor} events={filteredEvents} onSelect={setSelectedEvent} onOpenDay={openDay} /> : null}
              {view === "week" ? <WeekView anchor={anchor} events={filteredEvents} onSelect={setSelectedEvent} onOpenDay={openDay} /> : null}
              {view === "day" ? <DayView anchor={anchor} events={filteredEvents} onSelect={setSelectedEvent} /> : null}
            </>
          )}
        </section>

        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onCalendarChanged={async () => {
            await loadCalendar();
            setSelectedEvent(null);
          }}
          canModifyHours={canModifyHours}
          canManageOvertime={canManageOvertime}
          canSplitHours={canSplitHours}
        />
        <AdminTimeBlockModal
          open={addTimeOpen}
          onClose={() => setAddTimeOpen(false)}
          people={people}
          workOrders={workOrders}
          anchor={anchor}
          onSaved={loadCalendar}
        />

        <section className={styles.printReport}>
          <div className={styles.printHeading}><div><span>MAGMO OPERATIONS</span><h1>{VIEW_LABELS[view]} dispatch report</h1><p>{title}</p></div><div><strong>{printFilterLabel}</strong><span>Printed {format(new Date(), "MMM d, yyyy · h:mm a")}</span></div></div>
          <div className={styles.printSummary}><span>{filteredEvents.length} entries</span><span>{visiblePeople} people</span><span>{remoteCount} remote</span><span>{formatHours(onSiteMinutes)} on site</span></div>
          {filteredOnSiteHours.length ? (
            <>
              <h2>Engineer on-site hours</h2>
              <table>
                <thead><tr><th>Date</th><th>Engineer</th><th>Hours</th><th>Work orders</th></tr></thead>
                <tbody>
                  {filteredOnSiteHours.map((entry) => (
                    <tr key={`${entry.date}-${entry.person.id || entry.person.name}`}>
                      <td>{format(new Date(`${entry.date}T12:00:00`), "EEE, MMM d")}</td>
                      <td>{entry.person.name}</td>
                      <td><strong>{entry.unknown ? "Unknown" : formatHours(entry.minutes)}</strong></td>
                      <td>{entry.workOrderNumbers.map((number) => `WO #${number}`).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2>Dispatch timeline</h2>
            </>
          ) : null}
          {filteredTravelHours.length ? (
            <>
              <h2>Engineer travel hours</h2>
              <table>
                <thead><tr><th>Date</th><th>Engineer</th><th>Hours</th><th>Work orders</th></tr></thead>
                <tbody>
                  {filteredTravelHours.map((entry) => (
                    <tr key={`travel-${entry.date}-${entry.person.id || entry.person.name}`}>
                      <td>{format(new Date(`${entry.date}T12:00:00`), "EEE, MMM d")}</td>
                      <td>{entry.person.name}</td>
                      <td><strong>{formatHours(entry.minutes)}</strong></td>
                      <td>{entry.workOrderNumbers.map((number) => `WO #${number}`).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
          <table><thead><tr><th>Date & time</th><th>Work order</th><th>Assigned</th><th>Mode</th><th>Activity</th></tr></thead><tbody>
            {filteredEvents.map((event) => <tr key={event.id}><td>{format(new Date(event.start), "EEE, MMM d")}<br /><span>{eventTime(event)}</span></td><td><strong>WO #{event.number}</strong></td><td>{eventPeople(event)}</td><td>{modeLabel(event.mode)}</td><td>{briefActivity(event)}</td></tr>)}
          </tbody></table>
          {!filteredEvents.length ? <p className={styles.noPrintRows}>No calendar entries match the selected people and work orders.</p> : null}
        </section>
      </main>
      <OtCoverageModal open={otCoverageOpen} onClose={() => setOtCoverageOpen(false)} />
    </div>
  );
}

export default function OpsCalendarPage() {
  return <LoggedIn requiredRole={USER_ROLES.ADMIN}><CalendarContent /></LoggedIn>;
}
