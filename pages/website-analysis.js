import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../context/Firebase";
import CollapsiblePanel from "../components/websiteAnalysis/CollapsiblePanel";
import SearchVisibility from "../components/websiteAnalysis/SearchVisibility";
import { useAuth } from "../context/AuthUserContext";
import { hasRequiredRole, USER_ROLES } from "../utils/authAccess";
import styles from "../styles/WebsiteAnalysis.module.css";

const RANGE_OPTIONS = [7, 30, 90];
const FORM_LABELS = {
  part_request: "Part requests",
  service_request: "Service requests",
  trailer_request: "Trailer inquiries",
  contact_form: "General contact",
};
const EVENT_LABELS = {
  page_view: "Page view",
  click: "Click",
  search: "Search",
  filter: "Filter",
  product_view: "Product view",
  product_select: "Product selected",
  form_open: "Form opened",
  form_start: "Form started",
  form_submit: "Form submitted",
  form_error: "Form error",
};

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatNumber = (value) => compactNumber.format(Number(value) || 0);
const formatPercent = (value) => `${(Number(value) || 0).toFixed(1)}%`;
const conversion = (values = {}) => {
  const base = Number(values.form_start) || Number(values.form_open) || 0;
  return base ? (Number(values.form_submit || 0) / base) * 100 : 0;
};
const partSearchHref = (item = {}) => {
  const params = new URLSearchParams();
  params.set(item.searchKind === "part_number" ? "pn" : "q", item.searchTerm || "");
  return `https://advancedimagingparts.com/parts?${params.toString()}`;
};

function Metric({ label, value, detail }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function RankedList({ title, items = [], empty = "No activity yet" }) {
  const maximum = Math.max(1, ...items.map((item) => item.count));
  return (
    <CollapsiblePanel title={title}>
      {items.length ? (
        <ol className={styles.rankedList}>
          {items.map((item) => (
            <li key={item.label}>
              <div className={styles.rankLabel}>
                <span title={item.label}>{item.label}</span>
                <strong>{formatNumber(item.count)}</strong>
              </div>
              <div className={styles.rankTrack}>
                <span style={{ width: `${Math.max(4, (item.count / maximum) * 100)}%` }} />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>{empty}</p>
      )}
    </CollapsiblePanel>
  );
}

export default function WebsiteAnalysis() {
  const router = useRouter();
  const { authUser, loading: authLoading } = useAuth();
  const [activeView, setActiveView] = useState("search");
  const [days, setDays] = useState(30);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const canViewWebsiteAnalysis = hasRequiredRole(authUser, USER_ROLES.ADMIN);

  useEffect(() => {
    if (!authLoading && !canViewWebsiteAnalysis) {
      router.replace("/dashboard");
    }
  }, [authLoading, canViewWebsiteAnalysis, router]);

  useEffect(() => {
    if (!canViewWebsiteAnalysis || activeView !== "activity") return undefined;
    const controller = new AbortController();

    const loadReport = async () => {
      setLoading(true);
      setError("");
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Your session is still loading.");
        const token = await currentUser.getIdToken();
        const response = await fetch(`/api/website-analytics?days=${days}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Website activity could not be loaded.");
        setReport(data);
      } catch (loadError) {
        if (loadError.name !== "AbortError") setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadReport();
    return () => controller.abort();
  }, [activeView, canViewWebsiteAnalysis, days]);

  const trendMaximum = useMemo(
    () => Math.max(1, ...(report?.daily || []).map((item) => item.pageViews)),
    [report]
  );
  const totals = report?.totals || {};

  if (authLoading || !canViewWebsiteAnalysis) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>Checking Admin access...</div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Website Analysis | Magmo</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => router.push("/dashboard")}
              title="Return to the Magmo main menu"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Magmo
            </button>
            <p className={styles.eyebrow}>Advanced Imaging Parts</p>
            <h1>Website Analysis</h1>
            <p>See catalog engagement, lead activity, and where visitors are finding value.</p>
          </div>
          <div className={styles.rangeControl} aria-label="Reporting period">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={days === option ? styles.activeRange : ""}
                onClick={() => setDays(option)}
                aria-pressed={days === option}
              >
                {option} days
              </button>
            ))}
          </div>
        </header>

        {error ? <div className={styles.error}>{error}</div> : null}
        <nav className={styles.reportTabs} aria-label="Website analysis views">
          <button
            type="button"
            className={activeView === "search" ? styles.activeReportTab : ""}
            onClick={() => setActiveView("search")}
            aria-pressed={activeView === "search"}
          >
            Search Visibility
          </button>
          <button
            type="button"
            className={activeView === "activity" ? styles.activeReportTab : ""}
            onClick={() => setActiveView("activity")}
            aria-pressed={activeView === "activity"}
          >
            Website Activity
          </button>
        </nav>

        {activeView === "search" ? (
          <SearchVisibility authUser={authUser} days={days} />
        ) : (
          <>

        {loading ? <div className={styles.loading}>Loading website activity...</div> : null}

        {!loading && report ? (
          <>
            <section className={styles.metrics} aria-label="Website overview">
              <Metric
                label="Page views"
                value={formatNumber(totals.pageViews)}
                detail={`Past ${days} days`}
              />
              <Metric
                label="Product views"
                value={formatNumber(totals.productViews)}
                detail="Catalog detail pages"
              />
              <Metric
                label="Searches"
                value={formatNumber(totals.searches)}
                detail="Parts catalog searches"
              />
              <Metric
                label="Tracked clicks"
                value={formatNumber(totals.clicks)}
                detail="Meaningful actions"
              />
              <Metric
                label="Forms submitted"
                value={formatNumber(totals.formSubmitted)}
                detail={`${formatNumber(totals.formStarted)} started`}
              />
              <Metric
                label="Lead conversion"
                value={formatPercent(totals.conversionRate)}
                detail="Submitted from opened or started"
              />
            </section>

            <CollapsiblePanel
              title="Top 100 part searches"
              description="What visitors type into the AIS parts catalog, ranked by search count."
              meta={
                <>
                  {formatNumber(report.partSearchSummary?.terms)} unique terms |{" "}
                  {formatNumber(report.partSearchSummary?.zeroResultSearches)} searches with no matches
                  {report.partSearchSummary?.legacySampled ? " | older activity is sampled" : ""}
                </>
              }
            >
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Search term</th>
                      <th>Type</th>
                      <th>Searches</th>
                      <th>Average matches</th>
                      <th>No results</th>
                      <th>Last searched</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(report.partSearches || []).length ? (
                      report.partSearches.map((item) => (
                        <tr key={item.searchTermNormalized}>
                          <td><strong>#{item.rank}</strong></td>
                          <td>
                            <a
                              className={styles.searchTermLink}
                              href={partSearchHref(item)}
                              target="_blank"
                              rel="noreferrer"
                              title={`Open ${item.searchTerm} in the AIS parts catalog`}
                            >
                              {item.searchTerm}
                            </a>
                          </td>
                          <td>
                            <span className={styles.searchKind}>
                              {item.searchKind === "part_number" ? "Part number" : "Keyword"}
                            </span>
                          </td>
                          <td>{formatNumber(item.count)}</td>
                          <td>{Number(item.averageResults || 0).toFixed(1)}</td>
                          <td className={item.zeroResultCount ? styles.zeroResults : ""}>
                            {formatNumber(item.zeroResultCount)}
                          </td>
                          <td>{item.lastSeen || "Not set"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className={styles.emptyCell}>
                          Part searches will appear here as visitors use the catalog.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel
              title="Traffic trend"
              description="Daily page views and completed inquiries."
              meta={`${report.range.startDate} to ${report.range.endDate}`}
            >
              <div className={styles.trend} role="img" aria-label="Daily page view trend">
                {report.daily.map((item) => (
                  <div className={styles.trendDay} key={item.date}>
                    <div className={styles.trendValue}>{formatNumber(item.pageViews)}</div>
                    <div className={styles.trendTrack}>
                      <span style={{ height: `${Math.max(3, (item.pageViews / trendMaximum) * 100)}%` }} />
                    </div>
                    <time dateTime={item.date}>{item.date.slice(5)}</time>
                  </div>
                ))}
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel
              title="Request funnel"
              description="Opened, started, and completed forms by customer need."
            >
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Request type</th>
                      <th>Opened</th>
                      <th>Started</th>
                      <th>Submitted</th>
                      <th>Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(FORM_LABELS).map(([formType, label]) => {
                      const values = report.forms[formType] || {};
                      return (
                        <tr key={formType}>
                          <td><strong>{label}</strong></td>
                          <td>{formatNumber(values.form_open)}</td>
                          <td>{formatNumber(values.form_start)}</td>
                          <td>{formatNumber(values.form_submit)}</td>
                          <td>{formatPercent(conversion(values))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CollapsiblePanel>

            <div className={styles.twoColumn}>
              <RankedList title="Top pages" items={report.top.pages} />
              <RankedList title="Top click targets" items={report.top.clicks} />
              <RankedList title="Traffic sources" items={report.top.referrers} />
              <RankedList title="Visitor devices" items={report.top.devices} />
            </div>

            <CollapsiblePanel
              title="Recent activity"
              description="Privacy-conscious event detail without names, emails, or raw IP addresses."
              meta={
                <>
                  {formatNumber(totals.observedVisitors)} observed visitors
                  {report.sample.limited ? " in recent sample" : ""}
                </>
              }
            >
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Page</th>
                      <th>Detail</th>
                      <th>Device</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.recent.map((event) => (
                      <tr key={event.id}>
                        <td><span className={styles.eventType}>{EVENT_LABELS[event.eventType] || event.eventType}</span></td>
                        <td title={event.path}>{event.path}</td>
                        <td>{event.formType ? FORM_LABELS[event.formType] : event.label || "Not set"}</td>
                        <td>{event.device} - {event.browser}</td>
                        <td>{event.createdAt ? new Date(event.createdAt).toLocaleString() : "Just now"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CollapsiblePanel>
          </>
        ) : null}
          </>
        )}
      </main>
    </>
  );
}
