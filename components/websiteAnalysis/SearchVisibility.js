import { useCallback, useEffect, useMemo, useState } from "react";
import { auth } from "../../context/Firebase";
import CollapsiblePanel from "./CollapsiblePanel";
import styles from "../../styles/WebsiteAnalysis.module.css";

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const count = (value) => compact.format(Number(value) || 0);
const percent = (value) => `${(Number(value) || 0).toFixed(1)}%`;
const position = (value) => Number(value) > 0 ? Number(value).toFixed(1) : "Not ranked";
const pathFromUrl = (value) => {
  try {
    const url = new URL(value);
    return `${url.pathname}${url.search}` || "/";
  } catch {
    return value || "/";
  }
};

function Delta({ value, suffix = "%" }) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return <span className={styles.deltaNeutral}>No comparison</span>;
  }
  const numeric = Number(value);
  const className = numeric > 0
    ? styles.deltaPositive
    : numeric < 0
      ? styles.deltaNegative
      : styles.deltaNeutral;
  return <span className={className}>{numeric > 0 ? "+" : ""}{numeric.toFixed(1)}{suffix}</span>;
}
function SearchMetric({ label, value, detail, change, changeSuffix = "%" }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{change !== undefined ? <Delta value={change} suffix={changeSuffix} /> : detail}</small>
    </div>
  );
}

function IndexBadge({ index }) {
  const modifier = !index || index.indexed === null
    ? styles.statusUnknown
    : index.indexed
      ? styles.statusGood
      : styles.statusWarning;
  const label = !index || index.indexed === null ? "Unknown" : index.indexed ? "Indexed" : "Not indexed";
  return <span className={`${styles.statusBadge} ${modifier}`}>{label}</span>;
}

function DataTable({ headings, children, empty, colSpan }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{children || <tr><td colSpan={colSpan} className={styles.emptyCell}>{empty}</td></tr>}</tbody>
      </table>
    </div>
  );
}

function SetupState({ connection, loading, onRefresh }) {
  return (
    <section className={styles.setupPanel}>
      <div className={styles.setupIntro}>
        <p className={styles.sectionEyebrow}>One-time connection</p>
        <h2>Connect Google Search Console</h2>
        <p>
          Magmo is ready to read rankings for the live Advanced Imaging Parts website. The
          connection is read-only and cannot change pages, settings, or Google search results.
        </p>
      </div>
      <div className={styles.setupSteps}>
        <div><strong>1</strong><span>Add or select the Domain property <b>advancedimagingparts.com</b>.</span></div>
        <div>
          <strong>2</strong>
          <span>Add this service account as a Search Console user:
            <code>{connection?.serviceAccountEmail || "Service account email unavailable"}</code>
          </span>
        </div>
        <div>
          <strong>3</strong>
          <span>Enable the Google Search Console API in its Google Cloud project, then refresh this report.</span>
        </div>
      </div>
      {connection?.reason ? <p className={styles.setupReason}>{connection.reason}</p> : null}
      <button type="button" className={styles.primaryButton} onClick={onRefresh} disabled={loading}>
        {loading ? "Checking connection..." : "Check connection"}
      </button>
    </section>
  );
}

export default function SearchVisibility({ authUser, days }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const authenticatedFetch = useCallback(async (input, options = {}) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Your session is still loading.");
    const token = await currentUser.getIdToken();
    return fetch(input, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  const refresh = useCallback(() => setRefreshKey((value) => value + 1), []);

  useEffect(() => {
    if (!authUser) return undefined;
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await authenticatedFetch(`/api/search-console-analytics?days=${days}`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Search visibility could not be loaded.");
        setReport(data);
        setSelectedUrl((current) => current || data.trackedPages?.[0]?.url || "");
      } catch (loadError) {
        if (loadError.name !== "AbortError") setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [authUser, authenticatedFetch, days, refreshKey]);

  const savePage = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await authenticatedFetch("/api/search-console-analytics", {
        method: "POST",
        body: JSON.stringify({ label, url }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The page could not be added.");
      setLabel("");
      setUrl("");
      setSelectedUrl(data.url || "");
      refresh();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const removePage = async (page) => {
    setSaving(true);
    setError("");
    try {
      const response = await authenticatedFetch("/api/search-console-analytics", {
        method: "DELETE",
        body: JSON.stringify({ url: page.url }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The page could not be removed.");
      if (selectedUrl === page.url) setSelectedUrl("");
      refresh();
    } catch (removeError) {
      setError(removeError.message);
    } finally {
      setSaving(false);
    }
  };

  const trendMaximum = useMemo(
    () => Math.max(1, ...(report?.daily || []).map((item) => item.impressions)),
    [report]
  );
  const selectedPage = (report?.trackedPages || []).find((item) => item.url === selectedUrl);
  const selectedQueries = (report?.pageQueries || [])
    .filter((item) => item.url === selectedUrl)
    .slice(0, 25);

  if (loading && !report) return <div className={styles.loading}>Loading Google search visibility...</div>;
  if (report?.status === "setup_required") {
    return (
      <>
        {error ? <div className={styles.error}>{error}</div> : null}
        <SetupState connection={report.connection} loading={loading} onRefresh={refresh} />
      </>
    );
  }
  if (!report || report.status !== "connected") {
    return <div className={styles.error}>{error || "Search visibility is unavailable."}</div>;
  }

  const summary = report.summary || {};
  const leads = report.leads || {};

  return (
    <>
      {error ? <div className={styles.error}>{error}</div> : null}
      <div className={styles.reportStatus}>
        <span>Google Search Console connected</span>
        <span>{report.range.startDate} to {report.range.endDate}</span>
        <button type="button" onClick={refresh} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</button>
      </div>

      <section className={styles.metrics} aria-label="Google search overview">
        <SearchMetric label="Google clicks" value={count(summary.clicks)} change={summary.change?.clicksChange} />
        <SearchMetric label="Impressions" value={count(summary.impressions)} change={summary.change?.impressionsChange} />
        <SearchMetric label="Average position" value={position(summary.position)} change={summary.change?.positionChange} changeSuffix="" />
        <SearchMetric label="Click rate" value={percent(summary.ctr)}
          detail={`${summary.change?.ctrChange >= 0 ? "+" : ""}${(summary.change?.ctrChange || 0).toFixed(1)} points`} />
        <SearchMetric label="Visible pages" value={count(summary.visiblePages)} detail="Pages shown by Google" />
        <SearchMetric label="Search-driven leads" value={count(leads.organicLeads)}
          detail={`${percent(leads.conversionRate)} of Google clicks`} />
      </section>

      <CollapsiblePanel
        title="Search visibility trend"
        description="Daily impressions with Google clicks above each bar."
        meta="Position is an average across recorded searches."
      >
        <div className={styles.searchTrend} role="img" aria-label="Daily Google search impressions">
          {(report.daily || []).map((item) => (
            <div className={styles.searchTrendDay} key={item.date}>
              <span>{count(item.clicks)} clicks</span>
              <div><i style={{ height: `${Math.max(3, (item.impressions / trendMaximum) * 100)}%` }} /></div>
              <time dateTime={item.date}>{item.date.slice(5)}</time>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel
        title="Priority search groups"
        description="Trailer, OEM, model, and part-number searches grouped around AIS priorities."
      >
        <DataTable headings={["Search group", "Queries", "Impressions", "Clicks", "CTR", "Position", "Movement"]}>
          {(report.keywordGroups || []).map((group) => (
            <tr key={group.id}>
              <td><strong>{group.label}</strong></td><td>{count(group.queryCount)}</td>
              <td>{count(group.impressions)}</td><td>{count(group.clicks)}</td>
              <td>{percent(group.ctr)}</td><td>{position(group.position)}</td>
              <td><Delta value={group.change?.positionChange} suffix="" /></td>
            </tr>
          ))}
        </DataTable>
      </CollapsiblePanel>

      <CollapsiblePanel
        title="Pages to track"
        description="Monitor indexing and performance for service, trailer, and individual part pages."
        meta={`${summary.trackedIndexed} of ${summary.trackedKnown} known pages indexed`}
      >
        <form className={styles.trackedForm} onSubmit={savePage}>
          <label><span>Page label</span>
            <input type="text" value={label} onChange={(event) => setLabel(event.target.value)}
              placeholder="Example: GE MRI part 5112668-2" maxLength={100} />
          </label>
          <label><span>Advanced Imaging Parts URL</span>
            <input type="url" value={url} onChange={(event) => setUrl(event.target.value)}
              placeholder="https://advancedimagingparts.com/products/..." required />
          </label>
          <button type="submit" className={styles.primaryButton} disabled={saving}>
            {saving ? "Saving..." : "Track page"}
          </button>
        </form>
        <DataTable headings={["Page", "Index status", "Impressions", "Clicks", "CTR", "Position", "Movement", "Action"]}>
          {(report.trackedPages || []).map((page) => (
            <tr className={selectedUrl === page.url ? styles.selectedRow : ""} key={page.id}>
              <td><button type="button" className={styles.pageSelect} onClick={() => setSelectedUrl(page.url)} title={page.url}>
                <strong>{page.label}</strong><span>{pathFromUrl(page.url)}</span>
              </button></td>
              <td title={page.index?.coverageState}><IndexBadge index={page.index} /></td>
              <td>{count(page.metrics?.impressions)}</td><td>{count(page.metrics?.clicks)}</td>
              <td>{percent(page.metrics?.ctr)}</td><td>{position(page.metrics?.position)}</td>
              <td><Delta value={page.metrics?.change?.positionChange} suffix="" /></td>
              <td>{page.locked ? <span className={styles.fixedLabel}>Core page</span> : (
                <button type="button" className={styles.textButton} onClick={() => removePage(page)} disabled={saving}>Remove</button>
              )}</td>
            </tr>
          ))}
        </DataTable>
      </CollapsiblePanel>

      {selectedPage ? (
        <CollapsiblePanel
          eyebrow="Selected page"
          title={selectedPage.label}
          description={pathFromUrl(selectedPage.url)}
          meta="Search terms that displayed this page"
        >
          <DataTable headings={["Google search", "Impressions", "Clicks", "CTR", "Position"]}
            empty="No query data for this page in the selected period." colSpan={5}>
            {selectedQueries.length ? selectedQueries.map((query) => (
              <tr key={`${query.url}-${query.query}`}>
                <td><strong>{query.query}</strong></td><td>{count(query.impressions)}</td>
                <td>{count(query.clicks)}</td><td>{percent(query.ctr)}</td><td>{position(query.position)}</td>
              </tr>
            )) : null}
          </DataTable>
        </CollapsiblePanel>
      ) : null}

      <CollapsiblePanel
        title="SEO opportunities"
        description="Searches at positions 4-40 with room to earn more clicks."
        meta={`${report.opportunities?.length || 0} opportunities`}
      >
        <DataTable headings={["Search query", "Impressions", "Clicks", "CTR", "Position"]}
          empty="Google has not reported enough opportunity data yet." colSpan={5}>
          {(report.opportunities || []).length ? report.opportunities.map((query) => (
            <tr key={query.query}><td><strong>{query.query}</strong></td><td>{count(query.impressions)}</td>
              <td>{count(query.clicks)}</td><td>{percent(query.ctr)}</td><td>{position(query.position)}</td></tr>
          )) : null}
        </DataTable>
      </CollapsiblePanel>

      <div className={styles.twoColumn}>
        {[["Pages gaining position", "Higher is better.", report.movers?.gains],
          ["Pages losing position", "Review these first.", report.movers?.declines]].map(([title, detail, pages]) => (
          <CollapsiblePanel title={title} description={detail} key={title}>
            <ol className={styles.moverList}>
              {(pages || []).length ? pages.map((page) => (
                <li key={page.url}><span title={page.url}>{pathFromUrl(page.url)}</span>
                  <Delta value={page.change?.positionChange} suffix="" /></li>
              )) : <li className={styles.empty}>No movement data yet.</li>}
            </ol>
          </CollapsiblePanel>
        ))}
      </div>

      <CollapsiblePanel
        title="Top Google searches"
        description="Queries producing the most impressions."
        meta={`Top 25 of ${count(report.limits?.queryRows)} reported`}
      >
        <DataTable headings={["Search query", "Impressions", "Clicks", "CTR", "Position", "Movement"]}>
          {(report.queries || []).slice(0, 25).map((query) => (
            <tr key={query.query}><td><strong>{query.query}</strong></td><td>{count(query.impressions)}</td>
              <td>{count(query.clicks)}</td><td>{percent(query.ctr)}</td><td>{position(query.position)}</td>
              <td><Delta value={query.change?.positionChange} suffix="" /></td></tr>
          ))}
        </DataTable>
      </CollapsiblePanel>
    </>
  );
}
