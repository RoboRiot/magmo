import React, { useEffect, useMemo, useState } from "react";
import firebase from "../../context/Firebase";
import styles from "./ClientSystemNotesModal.module.css";

async function notesRequest(path, options = {}) {
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
  if (!response.ok) throw new Error(body.error || "Client system notes could not be reached.");
  return body;
}
function formatDate(value) {
  const parsed = Date.parse(value || "");
  if (!Number.isFinite(parsed)) return "Date unavailable";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(parsed));
}

function statusLabel(value) {
  return String(value || "unassigned")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function NoteList({ notes, empty }) {
  if (!notes.length) return <p className={styles.empty}>{empty}</p>;
  return (
    <div className={styles.noteList}>
      {notes.map((note) => (
        <article key={note.id} className={styles.noteCard}>
          <div>
            <time>{formatDate(note.createdAt)}</time>
            <span>WO #{note.workOrderNumber}</span>
          </div>
          <p>{note.text}</p>
          <small>{note.createdBy || (note.source === "slack" ? "Slack" : "Magmo")}</small>
        </article>
      ))}
    </div>
  );
}

export function SystemNotesPreview({ clientId, machineId, title = "Client & system notes" }) {
  const [state, setState] = useState({ loading: false, error: "", notes: [] });
  useEffect(() => {
    if (!clientId) {
      setState({ loading: false, error: "", notes: [] });
      return undefined;
    }
    let cancelled = false;
    setState((current) => ({ ...current, loading: true, error: "" }));
    const params = new URLSearchParams({ clientId });
    if (machineId) params.set("machineId", machineId);
    notesRequest(`/api/ops/system-notes?${params}`)
      .then((data) => {
        if (!cancelled) setState({ loading: false, error: "", notes: data.notes || [] });
      })
      .catch((error) => {
        if (!cancelled) setState({ loading: false, error: error.message, notes: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [clientId, machineId]);
  return (
    <section className={styles.preview}>
      <div className={styles.previewHeading}>
        <div><span>REFERENCE</span><h4>{title}</h4></div>
        <b>{state.notes.length}</b>
      </div>
      {state.loading ? <p className={styles.empty}>Loading notes…</p> : null}
      {state.error ? <p className={styles.previewError}>{state.error}</p> : null}
      {!state.loading && !state.error ? (
        <NoteList notes={state.notes.slice(0, 6)} empty="No prior notes are linked to this selection." />
      ) : null}
    </section>
  );
}

export default function ClientSystemNotesModal({ open, onClose, initialWorkOrder = null }) {
  const [catalog, setCatalog] = useState({ clients: [], machines: [], notes: [], workOrders: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedMachineId, setSelectedMachineId] = useState("");
  const [scopeType, setScopeType] = useState("machine");
  const [workOrderId, setWorkOrderId] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await notesRequest("/api/ops/system-notes");
      const next = {
        clients: data.clients || [],
        machines: data.machines || [],
        notes: data.notes || [],
        workOrders: data.workOrders || [],
      };
      setCatalog(next);
      const linked = initialWorkOrder
        ? next.workOrders.find((entry) => entry.id === initialWorkOrder.id) || initialWorkOrder
        : null;
      const nextClientId = linked?.clientId || "";
      const nextMachineId = linked?.machineId || "";
      setSelectedClientId((current) => current || nextClientId || next.clients[0]?.id || "");
      setSelectedMachineId((current) => current || nextMachineId);
      setScopeType(nextMachineId ? "machine" : "client");
      setWorkOrderId(linked?.id || "");
      setError("");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    setSelectedClientId("");
    setSelectedMachineId("");
    setText("");
    load();
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, initialWorkOrder?.id]);

  const clients = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return !needle
      ? catalog.clients
      : catalog.clients.filter((client) =>
          `${client.name} ${client.location}`.toLowerCase().includes(needle)
        );
  }, [catalog.clients, query]);
  const selectedClient = catalog.clients.find((client) => client.id === selectedClientId);
  const machines = catalog.machines.filter((machine) => machine.clientIds.includes(selectedClientId));
  const selectedMachine = machines.find((machine) => machine.id === selectedMachineId);
  const clientNotes = catalog.notes.filter(
    (note) => note.clientId === selectedClientId && note.scopeType === "client"
  );
  const machineNotes = catalog.notes.filter(
    (note) => note.machineId === selectedMachineId && note.scopeType === "machine"
  );
  const clientWorkOrders = catalog.workOrders.filter(
    (workOrder) => workOrder.clientId === selectedClientId
  );
  const machineWorkOrders = clientWorkOrders.filter(
    (workOrder) => workOrder.machineId === selectedMachineId
  );
  const noteWorkOrders = scopeType === "machine" && selectedMachineId
    ? machineWorkOrders
    : clientWorkOrders;

  useEffect(() => {
    if (!selectedClientId) return;
    if (selectedMachineId && !machines.some((machine) => machine.id === selectedMachineId)) {
      setSelectedMachineId("");
      setScopeType("client");
    }
  }, [selectedClientId]);

  useEffect(() => {
    if (workOrderId && !noteWorkOrders.some((entry) => entry.id === workOrderId)) {
      setWorkOrderId(noteWorkOrders[0]?.id || "");
    } else if (!workOrderId && noteWorkOrders.length) {
      setWorkOrderId(noteWorkOrders[0].id);
    }
  }, [scopeType, selectedClientId, selectedMachineId, noteWorkOrders.length]);

  if (!open) return null;

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      await notesRequest("/api/ops/system-notes", {
        method: "POST",
        body: JSON.stringify({
          workOrderId,
          text,
          scopeType,
          clientId: selectedClientId,
          machineId: scopeType === "machine" ? selectedMachineId : "",
        }),
      });
      setText("");
      await load();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !saving) onClose();
    }}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-label="Client system notes">
        <header>
          <div><span>OPERATIONS KNOWLEDGE</span><h2>Client system notes</h2><p>Service history that stays connected to the client, machine, and work order.</p></div>
          <button type="button" onClick={onClose} disabled={saving} aria-label="Close">×</button>
        </header>
        {error ? <div className={styles.error}>{error}</div> : null}
        <div className={styles.layout}>
          <aside className={styles.clientPane}>
            <label><span>Find a client</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or location…" /></label>
            <div className={styles.clientList}>
              {loading ? <p className={styles.empty}>Loading clients…</p> : clients.map((client) => (
                <button key={client.id} type="button" data-active={client.id === selectedClientId} onClick={() => { setSelectedClientId(client.id); setSelectedMachineId(""); setScopeType("client"); }}>
                  <i>{client.name.slice(0, 1).toUpperCase()}</i><span><strong>{client.name}</strong><small>{client.location || "No location listed"}</small></span>
                </button>
              ))}
            </div>
          </aside>
          <main className={styles.detailPane}>
            {selectedClient ? (
              <>
                <div className={styles.clientHeading}><div><span>CLIENT</span><h3>{selectedClient.name}</h3><p>{selectedClient.location || "Location not listed"}</p></div><b>{clientWorkOrders.length} work orders</b></div>
                <section className={styles.section}>
                  <div className={styles.sectionHeading}><h4>Client notes</h4><span>{clientNotes.length}</span></div>
                  <NoteList notes={clientNotes} empty="No client-level notes yet." />
                </section>
                <section className={styles.section}>
                  <div className={styles.sectionHeading}><h4>Systems</h4><span>{machines.length}</span></div>
                  <div className={styles.machineGrid}>
                    {machines.map((machine) => (
                      <button key={machine.id} type="button" data-active={machine.id === selectedMachineId} onClick={() => { setSelectedMachineId(machine.id); setScopeType("machine"); }}>
                        <span>SYSTEM</span><strong>{machine.name}</strong><small>{machine.label}</small>
                      </button>
                    ))}
                    {!machines.length ? <p className={styles.empty}>No machines are linked to this client.</p> : null}
                  </div>
                </section>
                {selectedMachine ? (
                  <section className={styles.machineDetail}>
                    <div className={styles.sectionHeading}><div><span>MACHINE HISTORY</span><h4>{selectedMachine.name}</h4></div><span>{machineWorkOrders.length} work orders</span></div>
                    <div className={styles.workOrderList}>
                      {machineWorkOrders.map((workOrder) => (
                        <article key={workOrder.id}><div><strong>WO #{workOrder.number}</strong><span data-status={workOrder.workflowStatus}>{statusLabel(workOrder.workflowStatus)}</span></div><p>{workOrder.subject || "Untitled work order"}</p></article>
                      ))}
                      {!machineWorkOrders.length ? <p className={styles.empty}>No Ops work orders are linked to this machine yet.</p> : null}
                    </div>
                    <div className={styles.sectionHeading}><h4>Machine notes</h4><span>{machineNotes.length}</span></div>
                    <NoteList notes={machineNotes} empty="No machine-level notes yet." />
                  </section>
                ) : null}
              </>
            ) : <p className={styles.empty}>Choose a client to view its service history.</p>}
          </main>
          <aside className={styles.composePane}>
            <span className={styles.composeKicker}>NEW NOTE</span><h3>Record service knowledge</h3><p>Every note keeps its work-order source and date.</p>
            <label><span>Note level</span><select value={scopeType} onChange={(event) => setScopeType(event.target.value)}><option value="client">Client</option><option value="machine" disabled={!selectedMachineId}>Machine</option></select></label>
            <label><span>Associated work order</span><select value={workOrderId} onChange={(event) => setWorkOrderId(event.target.value)}><option value="">Select a work order</option>{noteWorkOrders.map((workOrder) => <option key={workOrder.id} value={workOrder.id}>#{workOrder.number} — {workOrder.subject}</option>)}</select></label>
            <label><span>Note</span><textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Write the durable client or system detail…" rows={7} /></label>
            <button className={styles.saveButton} type="button" onClick={save} disabled={saving || !text.trim() || !workOrderId || !selectedClientId || (scopeType === "machine" && !selectedMachineId)}>{saving ? "Saving…" : "Save note"}</button>
          </aside>
        </div>
      </section>
    </div>
  );
}
