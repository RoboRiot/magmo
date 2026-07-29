import { useCallback, useEffect, useMemo, useState } from "react";
import firebase from "../../context/Firebase";
import opsStyles from "../../styles/Ops.module.css";
import requestStyles from "./ServiceRequestsPanel.module.css";

const styles = { ...opsStyles, ...requestStyles };

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

function FilePreview({ file }) {
  const isImage = String(file.contentType || "").startsWith("image/");
  return (
    <a
      className={styles.requestFile}
      href={file.url}
      target="_blank"
      rel="noreferrer"
    >
      {isImage ? (
        <img src={file.url} alt={file.name || "Request attachment"} />
      ) : (
        <span>{file.contentType === "application/pdf" ? "PDF" : "FILE"}</span>
      )}
      <div>
        <strong>{file.name}</strong>
        <small>{(Number(file.size || 0) / (1024 * 1024)).toFixed(1)} MB</small>
      </div>
    </a>
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

export default function ServiceRequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [archived, setArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [clientChoices, setClientChoices] = useState({});
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [query, setQuery] = useState("");

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const data = await requestApi(
        `/api/ops/service-requests${archived ? "?archived=1" : ""}`
      );
      setRequests(data.requests || []);
      setClients(data.clients || []);
      setAssignees(data.assigneeOptions || []);
      setError("");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [archived]);

  useEffect(() => {
    load();
    const timer = setInterval(() => load(true), 15000);
    return () => clearInterval(timer);
  }, [load]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setDetail(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
    clientChoices[request.id] ||
    request.confirmedClient?.id ||
    request.suggestedClient?.id ||
    "";

  const setChoice = (requestId, clientId) => {
    setClientChoices((current) => ({ ...current, [requestId]: clientId }));
  };

  const openDetail = async (request) => {
    setDetailLoading(true);
    setError("");
    try {
      const data = await requestApi(
        `/api/ops/service-requests?id=${encodeURIComponent(request.id)}`
      );
      setDetail(data.request);
      setChoice(data.request.id, choiceFor(data.request));
      setSelectedAssignees([]);
    } catch (detailError) {
      setError(detailError.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const runAction = async (request, action, body = {}) => {
    setBusyId(request.id);
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
        const next = { ...request, confirmedClient: data.client };
        if (detail?.id === request.id) setDetail((current) => ({ ...current, ...next }));
      } else {
        setDetail(null);
      }
      return data;
    } catch (actionError) {
      setError(actionError.message);
      throw actionError;
    } finally {
      setBusyId("");
    }
  };

  const confirmClient = async (request) => {
    const clientId = choiceFor(request);
    if (!clientId) {
      setError("Select a Client DB record before confirming the match.");
      return;
    }
    await runAction(request, "confirm_client", { clientId }).catch(() => {});
  };

  const accept = async (request) => {
    const clientId = choiceFor(request);
    if (!clientId) {
      setError("Confirm or select a Client DB record before accepting.");
      return;
    }
    await runAction(request, "accept", {
      clientId,
      assigneeIds: selectedAssignees,
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

  return (
    <div className={styles.requestsPanel}>
      <div className={styles.requestsToolbar}>
        <div>
          <span>Website intake</span>
          <h2>{archived ? "Archived requests" : "Service requests"}</h2>
          <p>
            Review customer details, confirm the Client DB match, and create a
            BlueFolder work order when accepted.
          </p>
        </div>
        <div className={styles.requestsToolbarActions}>
          <label className={styles.requestSearch}>
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search requests"
              aria-label="Search service requests"
            />
          </label>
          <button
            type="button"
            className={archived ? styles.archiveActive : ""}
            onClick={() => {
              setArchived((current) => !current);
              setQuery("");
            }}
          >
            {archived ? "Back to requests" : "Archive"}
          </button>
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
              <div className={styles.requestCardTop}>
                <div>
                  <div className={styles.requestEyebrow}>
                    <span>{request.requestNumber}</span>
                    <span>{formatDate(request.createdAt, true)}</span>
                    {request.status === "accepted_pending_sync" ? (
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
              </div>

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
                    {[request.manufacturer, request.modality]
                      .filter(Boolean)
                      .join(" · ")}
                  </strong>
                </div>
                <div>
                  <span>Attachments</span>
                  <strong>{request.fileCount || 0}</strong>
                </div>
              </div>

              {!archived ? (
                <div className={styles.clientMatch}>
                  <div>
                    <span className={styles.aiLabel}>OPS AI CLIENT MATCH</span>
                    {request.confirmedClient ? (
                      <>
                        <strong className={styles.confirmedMatch}>
                          Confirmed: {request.confirmedClient.name}
                        </strong>
                        <small>{request.confirmedClient.location}</small>
                      </>
                    ) : request.suggestedClient ? (
                      <>
                        <strong>Is this the client? {request.suggestedClient.name}</strong>
                        <small>
                          {request.suggestedClient.reason} ·{" "}
                          {Math.round(
                            Number(request.suggestedClient.confidence || 0) * 100
                          )}
                          % confidence
                        </small>
                      </>
                    ) : request.clientMatchStatus === "pending" ? (
                      <strong>Matching against the Client DB…</strong>
                    ) : (
                      <strong>No confident match — select the client.</strong>
                    )}
                  </div>
                  {!request.confirmedClient ? (
                    <div className={styles.clientConfirmControls}>
                      <select
                        value={choiceFor(request)}
                        onChange={(event) =>
                          setChoice(request.id, event.target.value)
                        }
                        aria-label={`Client for ${request.requestNumber}`}
                      >
                        <option value="">Select Client DB record</option>
                        {clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                            {client.location ? ` — ${client.location}` : ""}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={busyId === request.id || !choiceFor(request)}
                        onClick={() => confirmClient(request)}
                      >
                        Confirm client
                      </button>
                    </div>
                  ) : null}
                </div>
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
                {!archived ? (
                  <>
                    <button
                      type="button"
                      className={styles.requestAcceptButton}
                      onClick={() => openDetail(request)}
                    >
                      {request.status === "accepted_pending_sync"
                        ? "Retry acceptance"
                        : "Accept"}
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
            <h3>{archived ? "No archived requests" : "The intake queue is clear"}</h3>
            <p>
              {query
                ? "No requests match this search."
                : archived
                ? "Archived requests will be stored here."
                : "New website service requests will appear here automatically."}
            </p>
          </div>
        )}
      </div>

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
                  <strong>Acceptance needs a retry</strong>
                  <span>{detail.processing.error}</span>
                </div>
              ) : null}

              <section className={styles.requestDetailSection}>
                <h3>Company &amp; equipment location</h3>
                <div className={styles.requestDetailGrid}>
                  <DetailRow label="Company" value={detail.companyName} />
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

              {!archived ? (
                <section
                  className={[
                    styles.requestDetailSection,
                    styles.requestAcceptance,
                  ].join(" ")}
                >
                  <div>
                    <span>FINAL ACCEPTANCE</span>
                    <h3>Client and dispatch assignment</h3>
                    <p>
                      A client is required. Assignment is optional; leave everyone
                      unchecked to place the work order in Unassigned.
                    </p>
                  </div>
                  <label>
                    Client DB record
                    <select
                      value={choiceFor(detail)}
                      onChange={(event) =>
                        setChoice(detail.id, event.target.value)
                      }
                    >
                      <option value="">Select a client</option>
                      {clients.map((client) => (
                        <option value={client.id} key={client.id}>
                          {client.name}
                          {client.location ? ` — ${client.location}` : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  <fieldset>
                    <legend>Assign to</legend>
                    <div className={styles.requestAssignees}>
                      {assignees.map((assignee) => (
                        <label key={assignee.id}>
                          <input
                            type="checkbox"
                            checked={selectedAssignees.includes(assignee.id)}
                            onChange={(event) =>
                              setSelectedAssignees((current) =>
                                event.target.checked
                                  ? [...current, assignee.id]
                                  : current.filter((id) => id !== assignee.id)
                              )
                            }
                          />
                          <span>{assignee.name}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    type="button"
                    className={styles.modalAcceptButton}
                    disabled={busyId === detail.id || !choiceFor(detail)}
                    onClick={() => accept(detail)}
                  >
                    {busyId === detail.id
                      ? "Creating work order…"
                      : selectedAssignees.length
                      ? "Accept & create active work order"
                      : "Accept & create unassigned work order"}
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
