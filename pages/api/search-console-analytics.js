import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../utils/apiAuth";
import {
  canAccessWebsiteAnalysis,
  isAllowedEmailDomain,
} from "../../utils/authAccess";
import {
  describeSearchConsoleError,
  getSearchConsoleSettings,
  inspectSearchConsoleUrl,
  normalizeSearchConsoleUrl,
  querySearchAnalytics,
} from "../../utils/searchConsole";

const ALLOWED_DAYS = [7, 30, 90];
const EVENT_SAMPLE_LIMIT = 5000;
const INDEX_CACHE_MS = 24 * 60 * 60 * 1000;
const DEFAULT_TRACKED_PATHS = [
  ["/services/mri-service", "MRI service"],
  ["/services/ct-service", "CT service"],
  ["/services/pet-ct-service", "PET/CT service"],
  ["/trailers/mobile-mri-trailer-rental", "Mobile MRI trailers"],
  ["/trailers/mobile-ct-trailer-rental", "Mobile CT trailers"],
  ["/trailers/mobile-pet-ct-trailer-rental", "Mobile PET/CT trailers"],
];

const KEYWORD_GROUPS = [
  {
    id: "mri_trailers",
    label: "MRI trailer searches",
    matches: (query) =>
      /(\bmri\b|magnetic resonance)/.test(query) &&
      /(trailer|mobile|rental|rent|lease|temporary|interim)/.test(query),
  },
  {
    id: "ct_trailers",
    label: "CT trailer searches",
    matches: (query) =>
      /(\bct\b|computed tomography)/.test(query) &&
      /(trailer|mobile|rental|rent|lease|temporary|interim)/.test(query),
  },
  {
    id: "pet_ct_trailers",
    label: "PET/CT trailer searches",
    matches: (query) =>
      /(pet[\s/-]?ct|\bpet\b|positron emission)/.test(query) &&
      /(trailer|mobile|rental|rent|lease|temporary|interim)/.test(query),
  },
  {
    id: "oem_models",
    label: "OEM and model searches",
    matches: (query) =>
      /(\bge\b|ge healthcare|siemens|philips|toshiba|canon medical|signa|magnetom|optima|discovery|somatom|biograph|aquilion|brilliance|ingenuity|vereos|gemini)/.test(
        query
      ),
  },
  {
    id: "part_numbers",
    label: "Part-number searches",
    matches: (query) =>
      /\d/.test(query) &&
      /[a-z0-9][a-z0-9 ._/-]{3,}[a-z0-9]/.test(query) &&
      !/(trailer|rental|lease|service)/.test(query),
  },
];

const numberValue = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const clean = (value, maxLength = 200) =>
  String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const ptToday = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const shiftDate = (value, days) => {
  const date = new Date(`${value}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const reportRange = (days) => {
  const endDate = shiftDate(ptToday(), -1);
  const startDate = shiftDate(endDate, -(days - 1));
  const previousEndDate = shiftDate(startDate, -1);
  const previousStartDate = shiftDate(previousEndDate, -(days - 1));
  return { days, startDate, endDate, previousStartDate, previousEndDate };
};

const metricsFromRow = (row = {}) => ({
  clicks: numberValue(row.clicks),
  impressions: numberValue(row.impressions),
  ctr: numberValue(row.ctr) * 100,
  position: numberValue(row.position),
});

const percentChange = (current, previous) => {
  const before = numberValue(previous);
  if (!before) return null;
  return ((numberValue(current) - before) / before) * 100;
};

const metricComparison = (current, previous) => ({
  clicksChange: percentChange(current.clicks, previous.clicks),
  impressionsChange: percentChange(current.impressions, previous.impressions),
  ctrChange: current.ctr - previous.ctr,
  positionChange:
    current.position && previous.position ? previous.position - current.position : null,
});

const keyForRow = (row) => (row.keys || []).join("\u0001");

const combineRows = (currentRows = [], previousRows = [], keys = []) => {
  const previous = new Map(previousRows.map((row) => [keyForRow(row), row]));
  return currentRows.map((row) => {
    const currentMetrics = metricsFromRow(row);
    const previousMetrics = metricsFromRow(previous.get(keyForRow(row)));
    return {
      ...Object.fromEntries(keys.map((key, index) => [key, row.keys?.[index] || ""])),
      ...currentMetrics,
      previous: previousMetrics,
      change: metricComparison(currentMetrics, previousMetrics),
    };
  });
};

const emptyGroup = (definition) => ({
  id: definition.id,
  label: definition.label,
  clicks: 0,
  impressions: 0,
  weightedPosition: 0,
  queryCount: 0,
});

const groupedKeywords = (currentRows = [], previousRows = []) => {
  const aggregate = (rows) => {
    const groups = new Map(KEYWORD_GROUPS.map((definition) => [definition.id, emptyGroup(definition)]));
    rows.forEach((row) => {
      const query = String(row.keys?.[0] || "").toLowerCase();
      const metrics = metricsFromRow(row);
      KEYWORD_GROUPS.forEach((definition) => {
        if (!definition.matches(query)) return;
        const group = groups.get(definition.id);
        group.clicks += metrics.clicks;
        group.impressions += metrics.impressions;
        group.weightedPosition += metrics.position * metrics.impressions;
        group.queryCount += 1;
      });
    });
    return groups;
  };

  const current = aggregate(currentRows);
  const previous = aggregate(previousRows);
  return KEYWORD_GROUPS.map((definition) => {
    const group = current.get(definition.id);
    const prior = previous.get(definition.id);
    const currentMetrics = {
      clicks: group.clicks,
      impressions: group.impressions,
      ctr: group.impressions ? (group.clicks / group.impressions) * 100 : 0,
      position: group.impressions ? group.weightedPosition / group.impressions : 0,
    };
    const previousMetrics = {
      clicks: prior.clicks,
      impressions: prior.impressions,
      ctr: prior.impressions ? (prior.clicks / prior.impressions) * 100 : 0,
      position: prior.impressions ? prior.weightedPosition / prior.impressions : 0,
    };
    return {
      id: group.id,
      label: group.label,
      queryCount: group.queryCount,
      ...currentMetrics,
      previous: previousMetrics,
      change: metricComparison(currentMetrics, previousMetrics),
    };
  });
};

const pageCategory = (url) => {
  if (url.includes("/products/")) return "Product";
  if (url.includes("/trailers/")) return "Trailer";
  if (url.includes("/services/")) return "Service";
  if (url.endsWith("/parts") || url.includes("/parts?")) return "Catalog";
  return "Page";
};

const idForUrl = (url) => crypto.createHash("sha256").update(url).digest("hex").slice(0, 32);

const loadTrackedPages = async (settings) => {
  const defaults = DEFAULT_TRACKED_PATHS.map(([path, label]) => ({
    id: `default-${idForUrl(path)}`,
    url: normalizeSearchConsoleUrl(path, settings.publicOrigin),
    label,
    locked: true,
  }));
  if (!adminDb) return defaults;

  const snapshot = await adminDb.collection("SearchConsoleTrackedPages").limit(50).get();
  const custom = snapshot.docs
    .map((document) => ({ id: document.id, ...document.data(), locked: false }))
    .filter((item) => item.url);
  const seen = new Set();
  return [...defaults, ...custom].filter((item) => {
    const key = normalizeSearchConsoleUrl(item.url, settings.publicOrigin);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    item.url = key;
    return true;
  });
};

const indexResult = (data = {}, cached = false) => ({
  verdict: data.verdict || "VERDICT_UNSPECIFIED",
  indexed: data.verdict === "PASS",
  coverageState: data.coverageState || "Status unavailable",
  robotsTxtState: data.robotsTxtState || "",
  indexingState: data.indexingState || "",
  pageFetchState: data.pageFetchState || "",
  lastCrawlTime: data.lastCrawlTime || null,
  googleCanonical: data.googleCanonical || "",
  userCanonical: data.userCanonical || "",
  cached,
});

const inspectTrackedPages = async (trackedPages) => {
  if (!adminDb) return trackedPages.map((page) => ({ ...page, index: null }));

  return Promise.all(
    trackedPages.slice(0, 25).map(async (page) => {
      const reference = adminDb.collection("SearchConsoleIndexStatus").doc(idForUrl(page.url));
      const snapshot = await reference.get();
      const cached = snapshot.data();
      const inspectedAt = cached?.inspectedAt?.toMillis?.() || 0;
      if (cached?.result && Date.now() - inspectedAt < INDEX_CACHE_MS) {
        return { ...page, index: indexResult(cached.result, true) };
      }

      try {
        const result = await inspectSearchConsoleUrl(page.url);
        await reference.set(
          {
            url: page.url,
            result,
            inspectedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        return { ...page, index: indexResult(result, false) };
      } catch (error) {
        const detail = describeSearchConsoleError(error);
        return {
          ...page,
          index: {
            indexed: null,
            verdict: "UNAVAILABLE",
            coverageState: detail.reason,
          },
        };
      }
    })
  );
};

const leadMetrics = async (range, searchClicks) => {
  if (!adminDb) {
    return { allLeads: 0, organicLeads: 0, conversionRate: 0, sampled: false };
  }
  const [dailySnapshot, eventSnapshot] = await Promise.all([
    adminDb
      .collection("WebsiteAnalyticsDaily")
      .where("date", ">=", range.startDate)
      .orderBy("date", "asc")
      .get(),
    adminDb
      .collection("WebsiteAnalyticsEvents")
      .where("date", ">=", range.startDate)
      .orderBy("date", "desc")
      .limit(EVENT_SAMPLE_LIMIT)
      .get(),
  ]);

  const allLeads = dailySnapshot.docs.reduce(
    (sum, document) => sum + numberValue(document.data()?.totals?.form_submit),
    0
  );
  const organicLeads = eventSnapshot.docs.reduce((sum, document) => {
    const data = document.data();
    if (data.eventType !== "form_submit") return sum;
    const source = String(data.properties?.acquisition_source || "").toLowerCase();
    const referrer = String(data.referrerHost || "").toLowerCase();
    return source === "google_organic" || /(^|\.)google\./.test(referrer) ? sum + 1 : sum;
  }, 0);

  return {
    allLeads,
    organicLeads,
    conversionRate: searchClicks ? (organicLeads / searchClicks) * 100 : 0,
    sampled: eventSnapshot.size === EVENT_SAMPLE_LIMIT,
  };
};

const setupResponse = async (res, settings, trackedPages, error) => {
  const detail = error ? describeSearchConsoleError(error) : null;
  res.status(200).json({
    status: "setup_required",
    connection: {
      siteUrl: settings.siteUrl,
      publicOrigin: settings.publicOrigin,
      serviceAccountEmail: settings.clientEmail,
      reason: detail?.reason || settings.error || "Search Console access is not configured.",
    },
    trackedPages,
  });
};

const authorize = async (req, res) => {
  const decodedToken = await requireFirebaseAuth(req, res);
  if (!decodedToken) {
    if (!res.headersSent) res.status(401).json({ error: "Authentication required." });
    return null;
  }
  if (!canAccessWebsiteAnalysis(decodedToken.email, decodedToken)) {
    res.status(403).json({ error: "Admin access is required." });
    return null;
  }
  return decodedToken;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");

  if (!["GET", "POST", "DELETE"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST, DELETE");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const decodedToken = await authorize(req, res);
  if (!decodedToken) return;
  const settings = await getSearchConsoleSettings();
  const trackedPages = await loadTrackedPages(settings);

  if (req.method === "POST" || req.method === "DELETE") {
    if (!isAllowedEmailDomain(decodedToken.email)) {
      res.status(403).json({ error: "Only AIS staff can change tracked pages." });
      return;
    }
    if (!adminDb) {
      res.status(503).json({ error: "Tracked-page storage is not configured." });
      return;
    }

    const url = normalizeSearchConsoleUrl(req.body?.url, settings.publicOrigin);
    if (!url) {
      res.status(400).json({ error: "Enter a valid Advanced Imaging Parts URL." });
      return;
    }
    const reference = adminDb.collection("SearchConsoleTrackedPages").doc(idForUrl(url));

    if (req.method === "DELETE") {
      await reference.delete();
      res.status(200).json({ ok: true });
      return;
    }

    const customCount = await adminDb.collection("SearchConsoleTrackedPages").count().get();
    if (numberValue(customCount.data().count) >= 50) {
      res.status(409).json({ error: "The tracked-page limit has been reached." });
      return;
    }
    await reference.set(
      {
        url,
        label: clean(req.body?.label, 100) || pageCategory(url),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    res.status(200).json({ ok: true, url });
    return;
  }

  if (!settings.configured) {
    await setupResponse(res, settings, trackedPages);
    return;
  }

  try {
    const requestedDays = Number(req.query.days);
    const days = ALLOWED_DAYS.includes(requestedDays) ? requestedDays : 30;
    const range = reportRange(days);
    const [
      currentSummaryResponse,
      previousSummaryResponse,
      dailyResponse,
      currentPagesResponse,
      previousPagesResponse,
      currentQueriesResponse,
      previousQueriesResponse,
      pageQueriesResponse,
    ] = await Promise.all([
      querySearchAnalytics(range),
      querySearchAnalytics({
        startDate: range.previousStartDate,
        endDate: range.previousEndDate,
      }),
      querySearchAnalytics({ ...range, dimensions: ["date"], rowLimit: 500 }),
      querySearchAnalytics({ ...range, dimensions: ["page"] }),
      querySearchAnalytics({
        startDate: range.previousStartDate,
        endDate: range.previousEndDate,
        dimensions: ["page"],
      }),
      querySearchAnalytics({ ...range, dimensions: ["query"] }),
      querySearchAnalytics({
        startDate: range.previousStartDate,
        endDate: range.previousEndDate,
        dimensions: ["query"],
      }),
      querySearchAnalytics({ ...range, dimensions: ["page", "query"] }),
    ]);

    const currentSummary = metricsFromRow(currentSummaryResponse.rows?.[0]);
    const previousSummary = metricsFromRow(previousSummaryResponse.rows?.[0]);
    const pages = combineRows(
      currentPagesResponse.rows,
      previousPagesResponse.rows,
      ["url"]
    )
      .map((page) => ({ ...page, category: pageCategory(page.url) }))
      .sort((left, right) => right.impressions - left.impressions);
    const queries = combineRows(
      currentQueriesResponse.rows,
      previousQueriesResponse.rows,
      ["query"]
    ).sort((left, right) => right.impressions - left.impressions);
    const pageQueries = combineRows(pageQueriesResponse.rows, [], ["url", "query"])
      .sort((left, right) => right.impressions - left.impressions)
      .slice(0, 2000);
    const indexedTrackedPages = await inspectTrackedPages(trackedPages);
    const pageMetrics = new Map(
      pages.map((page) => [normalizeSearchConsoleUrl(page.url, settings.publicOrigin), page])
    );
    const tracked = indexedTrackedPages.map((page) => ({
      ...page,
      metrics: pageMetrics.get(page.url) || {
        clicks: 0,
        impressions: 0,
        ctr: 0,
        position: 0,
        previous: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
        change: {
          clicksChange: null,
          impressionsChange: null,
          ctrChange: 0,
          positionChange: null,
        },
      },
    }));
    const leads = await leadMetrics(range, currentSummary.clicks);
    const opportunities = queries
      .filter(
        (query) =>
          query.impressions >= 3 && query.position >= 4 && query.position <= 40 && query.ctr < 8
      )
      .sort((left, right) => right.impressions - left.impressions)
      .slice(0, 25);
    const changedPages = pages
      .filter(
        (page) =>
          page.impressions >= 3 && Number.isFinite(page.change.positionChange)
      )
      .sort((left, right) => right.change.positionChange - left.change.positionChange);

    res.status(200).json({
      status: "connected",
      connection: {
        siteUrl: settings.siteUrl,
        publicOrigin: settings.publicOrigin,
        serviceAccountEmail: settings.clientEmail,
      },
      range,
      summary: {
        ...currentSummary,
        previous: previousSummary,
        change: metricComparison(currentSummary, previousSummary),
        visiblePages: pages.length,
        trackedIndexed: tracked.filter((page) => page.index?.indexed === true).length,
        trackedKnown: tracked.filter((page) => page.index?.indexed !== null).length,
      },
      leads,
      daily: (dailyResponse.rows || []).map((row) => ({
        date: row.keys?.[0] || "",
        ...metricsFromRow(row),
      })),
      trackedPages: tracked,
      keywordGroups: groupedKeywords(
        currentQueriesResponse.rows,
        previousQueriesResponse.rows
      ),
      opportunities,
      pages: pages.slice(0, 250),
      queries: queries.slice(0, 250),
      pageQueries,
      movers: {
        gains: changedPages.slice(0, 10),
        declines: [...changedPages].reverse().slice(0, 10),
      },
      limits: {
        pageRows: currentPagesResponse.rows?.length || 0,
        queryRows: currentQueriesResponse.rows?.length || 0,
        pageQueryRows: pageQueriesResponse.rows?.length || 0,
        leadEventsSampled: leads.sampled,
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Search Console analytics failed:", describeSearchConsoleError(error));
    await setupResponse(res, settings, trackedPages, error);
  }
}
