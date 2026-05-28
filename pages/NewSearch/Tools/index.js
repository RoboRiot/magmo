import React, { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, FormControl, Spinner, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import firebase from "../../../context/Firebase";
import LoggedIn from "../../LoggedIn";
import styles from "./ToolDetail.module.css";

function toMillis(value) {
  if (!value) return 0;
  if (typeof value?.toDate === "function") return value.toDate().getTime();
  if (value?.seconds) return value.seconds * 1000;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDate(value) {
  const millis = toMillis(value);
  if (!millis) return "";
  return new Date(millis).toLocaleDateString();
}

function newestWorkOrder(workOrders = []) {
  if (!Array.isArray(workOrders) || !workOrders.length) return "";
  return [...workOrders]
    .filter((entry) => entry?.workOrder)
    .sort((a, b) => toMillis(b?.date) - toMillis(a?.date))[0]?.workOrder || "";
}

function normalizeSystems(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return String(value || "");
}

function formatMachineFields(tool) {
  const oem = normalizeSystems(tool.oem ?? tool.OEM);
  const modality = normalizeSystems(tool.modality ?? tool.Modality ?? tool.systems ?? tool.system);
  const model = normalizeSystems(tool.model ?? tool.Model);
  return [oem, modality, model].filter(Boolean).join(" / ");
}

export default function ToolsPage() {
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const loadTools = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const snap = await firebase.firestore().collection("Tool").get();
        const loaded = snap.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() || {}) }))
          .sort((a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt));
        if (!cancelled) setTools(loaded);
      } catch (error) {
        console.error("Failed to load tools", error);
        if (!cancelled) setLoadError("Failed to load tools.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadTools();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTools = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return tools;
    return tools.filter((tool) => {
      const haystack = [
        tool.id,
        tool.name,
        formatMachineFields(tool),
        tool.description,
        tool.locationCurrentName,
        tool.currentClientName,
        newestWorkOrder(tool.workOrders),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [search, tools]);

  return (
    <LoggedIn>
      <div className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.listHeader}>
            <div>
              <h1 className={styles.title}>Tools</h1>
              <div className={styles.subtitle}>
                Tool records built from inventory items.
              </div>
            </div>
            <div className={styles.inlineActions}>
              <Button onClick={() => router.push("/NewSearch/Tools/new")}>
                Add Tool
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => router.push("/NewSearch/mainSearch")}
              >
                Back
              </Button>
            </div>
          </div>

          <section className={styles.card}>
            {loadError && <Alert variant="danger">{loadError}</Alert>}
            <div className={styles.searchRow}>
              <FormControl
                className={styles.searchInput}
                placeholder="Search tools"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            {isLoading ? (
              <div className={styles.loadingRow}>
                <Spinner animation="border" size="sm" />
                <span>Loading tools...</span>
              </div>
            ) : (
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <span>{filteredTools.length} tools</span>
                </div>
                <div className={styles.tableWrap}>
                  <Table striped bordered hover size="sm" className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>OEM / Modality / Model</th>
                        <th>Current</th>
                        <th>Work Order</th>
                        <th>Items</th>
                        <th>Updated</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTools.length === 0 && (
                        <tr>
                          <td colSpan={8} className={styles.emptyState}>
                            No tools found.
                          </td>
                        </tr>
                      )}
                      {filteredTools.map((tool) => (
                        <tr
                          key={tool.id}
                          className="clickable-row"
                          onClick={() => router.push(`/NewSearch/Tools/${tool.id}`)}
                        >
                          <td>{tool.id}</td>
                          <td>{tool.name || "Unnamed Tool"}</td>
                          <td>{formatMachineFields(tool) || "-"}</td>
                          <td>
                            {tool.currentClientName ||
                              tool.locationCurrentName ||
                              tool.localLocCurrent ||
                              "-"}
                          </td>
                          <td>{newestWorkOrder(tool.workOrders) || "-"}</td>
                          <td>{tool.componentItemIds?.length || 0}</td>
                          <td>{formatDate(tool.updatedAt) || "-"}</td>
                          <td>
                            <Button
                              size="sm"
                              onClick={(event) => {
                                event.stopPropagation();
                                router.push(`/NewSearch/Tools/${tool.id}`);
                              }}
                            >
                              Open
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </LoggedIn>
  );
}
