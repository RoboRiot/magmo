import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { itemChangeRequestApi } from "../utils/itemChangeRequestClient";
import ItemChangeReview from "../components/ItemChangeReview";
import styles from "../styles/ItemNotifications.module.css";

export default function Notifications() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("pending");
  const [cursor, setCursor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const loadGeneration = useRef(0);
  const focusRequestId = typeof router.query.request === "string" ? router.query.request : "";
  const load = useCallback(async (nextCursor = "", includeFocused = true) => {
    const generation = ++loadGeneration.current;
    setLoading(true); setError("");
    try {
      const query = new URLSearchParams({ limit: "50", status, ...(nextCursor ? { cursor: nextCursor } : {}) });
      const result = await itemChangeRequestApi(null, `?${query}`);
      if (!nextCursor && includeFocused && focusRequestId && !(result.requests || []).some((request) => (request.id || request.requestId) === focusRequestId)) {
        const focused = await itemChangeRequestApi(null, `?requestId=${encodeURIComponent(focusRequestId)}`);
        result.requests = [...(focused.requests || []), ...(result.requests || [])];
      }
      if (generation !== loadGeneration.current) return;
      setCanReview(Boolean(result.canReview)); setPendingCount(result.pendingCount || 0);
      setRequests((old) => nextCursor ? [...old, ...(result.requests || [])] : result.requests || []);
      setCursor(result.nextCursor || "");
    } catch (err) { if (generation === loadGeneration.current) setError(err.message); }
    finally { if (generation === loadGeneration.current) setLoading(false); }
  }, [status, focusRequestId]);
  useEffect(() => { if (authUser?.uid) load(); return () => { loadGeneration.current += 1; }; }, [authUser?.uid, load]);
  useEffect(() => { if (typeof router.query.request === "string") setSelected(router.query.request); }, [router.query.request]);
  const active = requests.find((request) => (request.id || request.requestId) === selected);
  return <main className={styles.page}>
    <header className={styles.header}><div><Link href="/NewSearch/mainSearch" className={styles.back}>← Inventory</Link><h1>Notifications</h1><p>{canReview ? "Review Field item requests before they change inventory." : "Track your submitted item changes and review results."}</p></div><Button variant="outline-primary" onClick={() => load()} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</Button></header>
    {router.query.submitted === "1" && <Alert variant="success">Request submitted. The item stays unchanged until approval.</Alert>}
    {notice && <Alert variant={notice.warning ? "warning" : "success"} dismissible onClose={() => setNotice("")}>{notice.text}{notice.itemId && <>{" "}<Link href={`/NewSearch/item/${encodeURIComponent(notice.itemId)}`}>Open saved item</Link></>}</Alert>}
    {error && <Alert variant="danger">{error}</Alert>}
    <nav className={styles.tabs} aria-label="Notification filters"><Button variant={status === "pending" ? "primary" : "outline-secondary"} onClick={() => { setStatus("pending"); setSelected(""); }}>Pending {pendingCount > 0 && `(${pendingCount})`}</Button><Button variant={status === "all" ? "primary" : "outline-secondary"} onClick={() => { setStatus("all"); setSelected(""); }}>All requests</Button></nav>
    <div className={styles.workspace}><aside className={styles.inbox} aria-label="Item requests">{!requests.length && !loading && <div className={styles.empty}>No {status === "pending" ? "pending " : ""}item requests.</div>}{requests.map((request) => <button key={request.id || request.requestId} type="button" className={`${styles.requestCard} ${(request.id || request.requestId) === selected ? styles.selected : ""}`} onClick={() => setSelected(request.id || request.requestId)}><span className={styles.cardTop}><strong>{request.itemName || request.itemId}</strong><span className={styles.status}>{request.status}</span></span><span>{request.itemId} · {request.kind === "create" ? "New item" : `${request.changes?.length || 0} changes`}</span><span className={styles.hint}>{request.requesterEmail}</span><span className={styles.hint}>{request.createdAt ? new Date(request.createdAt).toLocaleString() : ""}</span></button>)}{loading && <div className={styles.empty}><Spinner size="sm" className="me-2" />Loading requests…</div>}{cursor && <Button variant="link" disabled={loading} onClick={() => load(cursor)}>Load more requests</Button>}</aside><div>{active ? <ItemChangeReview key={active.id || active.requestId} request={active} canReview={canReview} onReviewed={async (action, result) => { setNotice({ text: result?.warning || (action === "approve" ? "Approved changes have been applied to Magmo." : "Request rejected. The item was not changed."), warning: Boolean(result?.warning), itemId: result?.visionIndex?.ok === false ? result.visionIndex.itemId : "" }); setSelected(""); await load(); }} /> : <section className={styles.emptyReview}><h2>Select a notification</h2><p>You’ll see only the proposed changes, with current and requested values side by side.</p></section>}</div></div>
  </main>;
}
