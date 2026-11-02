import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import Link from "next/link";
import contract from "../lib/items/itemChangeRequestContract.cjs";
import { itemChangeRequestApi } from "../utils/itemChangeRequestClient";
import styles from "../styles/ItemNotifications.module.css";

const SUB_LABELS = { $ref: "Item ID", associationType: "Location type", clientId: "Client ID", machineId: "Machine ID", trailerId: "Trailer ID", clientNameSnapshot: "Client", clientLocationSnapshot: "Address", machineNameSnapshot: "Machine", trailerNameSnapshot: "Trailer", region: "Region", section: "Section", letter: "Letter", number: "Number", bin: "Bin", pallet: "Pallet", description: "Description", date: "Date", workOrder: "Work order", OEM: "OEM", Modality: "Modality", Model: "Model" };

function displayValue(value) {
  if (value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length)) return "Not set";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map(displayValue).join("\n");
  if (typeof value === "object") return Object.entries(value).filter(([, entry]) => entry !== "" && entry != null).map(([key, entry]) => `${SUB_LABELS[key] || key}: ${displayValue(entry)}`).join("\n") || "Not set";
  return String(value);
}

function ValueEditor({ value, onChange, label, field, disabled }) {
  const controlId = `review-${field.replace(/[^a-zA-Z0-9-]/g, "-")}`;
  if (typeof value === "boolean") return <Form.Check id={controlId} label={label} checked={value} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />;
  if (Array.isArray(value)) {
    if (value.every((entry) => typeof entry === "string")) return <Form.Control id={controlId} as="textarea" rows={Math.min(5, Math.max(2, value.length))} aria-label={`${label}, one value per line`} value={value.join("\n")} disabled={disabled} onChange={(event) => onChange(event.target.value.split("\n"))} />;
    return <div>{value.map((entry, index) => <fieldset key={index} className={styles.nested}><legend>{label} {index + 1}</legend><ValueEditor value={entry} label={label} field={`${field}-${index}`} disabled={disabled} onChange={(next) => onChange(value.map((old, n) => n === index ? next : old))} /><Button size="sm" variant="outline-secondary" className="mt-2" disabled={disabled} onClick={() => onChange(value.filter((_, n) => n !== index))}>Remove entry</Button></fieldset>)}</div>;
  }
  if (value && typeof value === "object") return <div className={styles.objectFields}>{Object.entries(value).map(([key, entry]) => <div key={key}><Form.Label htmlFor={`review-${`${field}-${key}`.replace(/[^a-zA-Z0-9-]/g, "-")}`}>{SUB_LABELS[key] || key}</Form.Label>{key.endsWith("Snapshot") ? <div className={styles.hint}>{displayValue(entry)} (verified again on approval)</div> : <ValueEditor value={entry} label={SUB_LABELS[key] || key} field={`${field}-${key}`} disabled={disabled} onChange={(next) => onChange({ ...value, [key]: next })} />}</div>)}</div>;
  if (field.endsWith("associationType") || field === "movementDateType") {
    const options = field === "movementDateType" ? ["arrival", "departure"] : ["site", "machine", "trailer"];
    return <Form.Select id={controlId} value={value || ""} aria-label={label} disabled={disabled} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</Form.Select>;
  }
  return <Form.Control id={controlId} as={field.includes("description") ? "textarea" : "input"} rows={field.includes("description") ? 3 : undefined} value={value ?? ""} aria-label={label} disabled={disabled} onChange={(event) => onChange(event.target.value)} />;
}

export default function ItemChangeReview({ request, canReview, onReviewed }) {
  const changes = request.changes || [];
  const [values, setValues] = useState(() => Object.fromEntries(changes.map((change) => [change.field, change.after])));
  const [included, setIncluded] = useState(() => Object.fromEntries(changes.map((change) => [change.field, true])));
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const editable = canReview && request.status === "pending";
  const review = async (action) => {
    if (busy) return;
    setBusy(action); setError("");
    try {
      const adjustments = Object.fromEntries(changes.map((change) => [change.field, included[change.field] ? values[change.field] : change.before]));
      const result = await itemChangeRequestApi({ action, requestId: request.requestId || request.id, ...(action === "approve" ? { adjustments } : {}), reviewNote: note });
      await onReviewed(action, result);
    } catch (err) { setError(err.message); } finally { setBusy(""); }
  };
  return <section className={styles.review} aria-label="Item change request review">
    <div className={styles.reviewHeader}><div><span className={styles.eyebrow}>{request.kind === "create" ? "New item request" : "Item change request"}</span><h2>{request.itemName || request.itemId}</h2><div className={styles.hint}>{request.itemId} · Requested by {request.requesterEmail || request.requesterUid}</div></div><span className={`${styles.status} ${styles[request.status] || ""}`}>{request.status}</span></div>
    {request.kind !== "create" && <Link href={`/NewSearch/item/${encodeURIComponent(request.itemId)}`} target="_blank">Open current item ↗</Link>}
    <p className="mt-3">{editable ? "Only requested changes are shown. Adjust the proposed values or uncheck changes you do not want to apply." : "Only the changes submitted in this request are shown."}</p>
    {error && <Alert variant="danger" role="alert">{error}</Alert>}
    <div className={styles.changeList}>{changes.map((change) => {
      const label = change.label || contract.FIELD_LABELS[change.field] || change.field;
      return <article key={change.field} className={styles.change}>
        <div className={styles.changeHeading}>{editable ? <Form.Check id={`include-${change.field}`} label={label} checked={included[change.field]} disabled={Boolean(busy)} onChange={(event) => setIncluded((old) => ({ ...old, [change.field]: event.target.checked }))} /> : <h3>{label}</h3>}</div>
        <div className={styles.comparison}><div className={styles.before}><div className={styles.valueLabel}>Current when submitted</div><div className={styles.readValue}>{displayValue(change.before)}</div></div><div className={styles.after}><div className={styles.valueLabel}>{editable ? "Proposed · editable" : "Requested"}</div>
          {change.field === "newPhotos" ? <div className={styles.photos}>{(change.after || []).map((photo) => <a href={photo.url} key={photo.path} target="_blank" rel="noreferrer"><img src={photo.url} alt={`Proposed ${photo.category} photo`} /><span>{photo.category}</span></a>)}</div> : editable && included[change.field] ? <ValueEditor value={values[change.field]} label={label} field={change.field} disabled={Boolean(busy)} onChange={(value) => setValues((old) => ({ ...old, [change.field]: value }))} /> : <div className={styles.readValue}>{displayValue(change.after)}</div>}
        </div></div>
      </article>;
    })}</div>
    {request.reviewNote && <Alert variant="secondary" className="mt-3">Reviewer note: {request.reviewNote}</Alert>}
    {request.status === "approved" && request.approvedChanges && <div className="mt-3"><h3>Applied changes</h3>{request.approvedChanges.map((change) => <div className={styles.applied} key={change.field}><strong>{contract.FIELD_LABELS[change.field] || change.field}</strong><div className={styles.readValue}>{displayValue(change.after)}</div></div>)}</div>}
    {editable && <div className={styles.reviewActions}><Form.Group controlId="review-note"><Form.Label>Review note (optional)</Form.Label><Form.Control as="textarea" rows={2} maxLength={2000} value={note} disabled={Boolean(busy)} onChange={(event) => setNote(event.target.value)} /></Form.Group><div className="d-flex flex-wrap gap-2 mt-3"><Button onClick={() => review("approve")} disabled={Boolean(busy) || !Object.values(included).some(Boolean)}>{busy === "approve" && <Spinner size="sm" className="me-2" />}Approve selected changes</Button><Button variant="outline-danger" onClick={() => review("reject")} disabled={Boolean(busy)}>{busy === "reject" && <Spinner size="sm" className="me-2" />}Reject request</Button></div><p className={`${styles.hint} mt-2 mb-0`}>Approval updates Magmo only. BlueFolder and Slack are not changed.</p></div>}
  </section>;
}
