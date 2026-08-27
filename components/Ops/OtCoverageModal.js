import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import firebase from "../../context/Firebase";
import styles from "./OtCoverageModal.module.css";

function dateKey(date) {
  return format(date, "yyyy-MM-dd");
}

async function coverageRequest(path, options = {}) {
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
  if (!response.ok) throw new Error(body.error || "OT coverage could not be reached.");
  return body;
}

function initials(name) {
  return String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function personHue(person) {
  return Array.from(String(person?.id || person?.name || "Magmo")).reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) % 360,
    164
  );
}

export default function OtCoverageModal({ open, onClose }) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDates, setSelectedDates] = useState(() => [dateKey(new Date())]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [people, setPeople] = useState([]);
  const [coverage, setCoverage] = useState([]);
  const [draftIds, setDraftIds] = useState([]);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const range = useMemo(
    () => ({
      start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
    }),
    [month]
  );
  const days = useMemo(
    () => eachDayOfInterval({ start: range.start, end: range.end }),
    [range]
  );
  const coverageByDate = useMemo(
    () => new Map(coverage.map((entry) => [entry.date, entry])),
    [coverage]
  );
  const primaryDate = selectedDates[0] || dateKey(new Date());
  const selectedRecord = coverageByDate.get(primaryDate);
  const filteredPeople = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? people.filter((person) => person.name?.toLowerCase().includes(query))
      : people;
  }, [people, search]);

  const loadCoverage = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        start: dateKey(range.start),
        end: dateKey(range.end),
      });
      const data = await coverageRequest(`/api/ops/ot-coverage?${params}`);
      setPeople(data.people || []);
      const startKey = dateKey(range.start);
      const endKey = dateKey(range.end);
      setCoverage((current) => [
        ...current.filter((entry) => entry.date < startKey || entry.date > endKey),
        ...(data.coverage || []),
      ]);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [range.end, range.start]);

  useEffect(() => {
    if (!open) return undefined;
    setMonth(startOfMonth(new Date()));
    setSelectedDates([dateKey(new Date())]);
    setMultiSelect(false);
    setSearch("");
    setMessage("");
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) loadCoverage();
  }, [loadCoverage, open]);

  useEffect(() => {
    setDraftIds((selectedRecord?.assignees || []).map((person) => person.id));
    setNote(selectedRecord?.note || "");
    setSearch("");
  }, [primaryDate, selectedRecord]);

  if (!open) return null;

  const selectDay = (day) => {
    const key = dateKey(day);
    if (!multiSelect) {
      setSelectedDates([key]);
      if (!isSameMonth(day, month)) setMonth(startOfMonth(day));
      return;
    }
    setSelectedDates((current) => {
      if (!current.includes(key)) {
        if (current.length >= 63) {
          setError("You can update up to 63 days at one time.");
          return current;
        }
        setError("");
        return [...current, key];
      }
      return current.length > 1 ? current.filter((value) => value !== key) : current;
    });
  };
  const togglePerson = (id) => {
    setDraftIds((current) =>
      current.includes(id)
        ? current.filter((personId) => personId !== id)
        : [...current, id]
    );
  };
  const save = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = await coverageRequest("/api/ops/ot-coverage", {
        method: "PUT",
        body: JSON.stringify({ dates: selectedDates, assigneeIds: draftIds, note }),
      });
      setCoverage((current) => {
        const selectedSet = new Set(selectedDates);
        const withoutDates = current.filter((entry) => !selectedSet.has(entry.date));
        return data.removed ? withoutDates : [...withoutDates, ...(data.coverage || [])];
      });
      setMessage(
        data.removed
          ? `OT coverage cleared for ${selectedDates.length} ${selectedDates.length === 1 ? "day" : "days"}.`
          : `OT coverage saved for ${selectedDates.length} ${selectedDates.length === 1 ? "day" : "days"}.`
      );
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ot-coverage-heading"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.heading}>
          <div className={styles.headingIcon} aria-hidden="true">OT</div>
          <div>
            <span>AFTER-HOURS DISPATCH</span>
            <h2 id="ot-coverage-heading">OT coverage</h2>
            <p>Designate the engineers covering after-hours support by day.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close OT coverage">&times;</button>
        </header>

        <div className={styles.content}>
          <div className={styles.calendarPane}>
            <div className={styles.monthToolbar}>
              <button type="button" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))} aria-label="Previous month">&#8249;</button>
              <div><span>COVERAGE CALENDAR</span><h3>{format(month, "MMMM yyyy")}</h3></div>
              <button type="button" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))} aria-label="Next month">&#8250;</button>
              <button className={styles.todayButton} type="button" onClick={() => { const today = new Date(); setMonth(startOfMonth(today)); setSelectedDates([dateKey(today)]); }}>Today</button>
              <button
                className={styles.multiSelectButton}
                type="button"
                data-active={multiSelect}
                onClick={() => {
                  setMultiSelect((current) => !current);
                  setMessage("");
                }}
              >
                {multiSelect ? "Selecting multiple" : "Select multiple"}
              </button>
            </div>
            <div className={styles.weekdays}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}
            </div>
            <div className={styles.monthGrid} aria-busy={loading}>
              {days.map((day) => {
                const key = dateKey(day);
                const entry = coverageByDate.get(key);
                const assigned = entry?.assignees || [];
                return (
                  <button
                    type="button"
                    key={key}
                    className={styles.day}
                    data-outside={!isSameMonth(day, month)}
                    data-selected={selectedDates.includes(key)}
                    data-today={isSameDay(day, new Date())}
                    onClick={() => selectDay(day)}
                  >
                    <strong>{format(day, "d")}</strong>
                    <div>
                      {assigned.slice(0, 2).map((person) => (
                        <span key={person.id} style={{ "--person-hue": personHue(person) }}>
                          <i>{initials(person.name)}</i>{person.name}
                        </span>
                      ))}
                      {assigned.length > 2 ? <small>+{assigned.length - 2} more</small> : null}
                      {!assigned.length ? <em>No coverage</em> : null}
                    </div>
                  </button>
                );
              })}
              {loading ? <div className={styles.loading}>Loading OT coverage…</div> : null}
            </div>
          </div>

          <aside className={styles.editor}>
            <div className={styles.editorDate}>
              <span>{selectedDates.length === 1 ? format(new Date(`${primaryDate}T12:00:00`), "EEEE") : "BATCH COVERAGE"}</span>
              <h3>{selectedDates.length === 1 ? format(new Date(`${primaryDate}T12:00:00`), "MMMM d, yyyy") : `${selectedDates.length} days selected`}</h3>
              <p>
                {selectedDates.length > 1
                  ? "The same coverage will be applied to every selected day."
                  : draftIds.length
                    ? `${draftIds.length} engineer${draftIds.length === 1 ? "" : "s"} selected`
                    : "No engineer selected"}
              </p>
              {selectedDates.length > 1 ? (
                <div className={styles.selectedDates}>
                  {selectedDates.map((date) => (
                    <button key={date} type="button" onClick={() => setSelectedDates((current) => current.length > 1 ? current.filter((value) => value !== date) : current)}>
                      {format(new Date(`${date}T12:00:00`), "MMM d")} <span>&times;</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <label className={styles.searchLabel}>
              <span>Find an engineer</span>
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search names…" />
            </label>
            <div className={styles.peopleList}>
              {filteredPeople.map((person) => (
                <label key={person.id}>
                  <input type="checkbox" checked={draftIds.includes(person.id)} onChange={() => togglePerson(person.id)} />
                  <i style={{ "--person-hue": personHue(person) }}>{initials(person.name)}</i>
                  <span>{person.name}</span>
                </label>
              ))}
              {!filteredPeople.length ? <p>No matching engineers.</p> : null}
            </div>
            <label className={styles.noteLabel}>
              <span>Coverage note <small>optional</small></span>
              <textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={500} rows={3} placeholder="Handoff details, coverage hours, or exceptions…" />
            </label>
            {selectedDates.length === 1 && selectedRecord?.updatedBy ? (
              <p className={styles.audit}>Last updated by {selectedRecord.updatedBy}</p>
            ) : null}
            {error ? <p className={styles.error}>{error}</p> : null}
            {message ? <p className={styles.success}>{message}</p> : null}
            <div className={styles.actions}>
              <button type="button" onClick={() => { setDraftIds([]); setNote(""); }} disabled={saving}>Clear</button>
              <button type="button" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save coverage"}</button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
