import { adminDb } from "../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../utils/apiAuth";
import { canAccessWebsiteAnalysis } from "../../utils/authAccess";

const FORM_TYPES = [
  "part_request",
  "service_request",
  "trailer_request",
  "contact_form",
];
const EVENT_SAMPLE_LIMIT = 5000;
const PART_SEARCH_AGGREGATE_LIMIT = 10000;

const numberValue = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const dateString = (date) => date.toISOString().slice(0, 10);

const addCounts = (target, source = {}) => {
  Object.entries(source || {}).forEach(([key, value]) => {
    target[key] = numberValue(target[key]) + numberValue(value);
  });
};

const increment = (map, key) => {
  const value = String(key || "").trim() || "unknown";
  map.set(value, (map.get(value) || 0) + 1);
};

const ranked = (map, limit = 8) =>
  Array.from(map.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));

const normalizeSearchTerm = (value) =>
  String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);

const addPartSearch = (map, value = {}) => {
  const normalized = normalizeSearchTerm(value.searchTerm || value.searchTermNormalized);
  if (normalized.length < 2) return;
  const current = map.get(normalized) || {
    searchTerm: String(value.searchTerm || normalized).trim().slice(0, 100),
    searchTermNormalized: normalized,
    searchKind:
      value.searchKind === "part_number" || (!value.searchKind && /\d/.test(normalized))
        ? "part_number"
        : "keyword",
    count: 0,
    zeroResultCount: 0,
    resultTotal: 0,
    oem: "",
    modality: "",
    model: "",
    lastSeen: "",
  };
  const incomingCount = Math.max(1, numberValue(value.count));
  current.count += incomingCount;
  current.zeroResultCount += Math.max(0, numberValue(value.zeroResultCount));
  current.resultTotal += Math.max(0, numberValue(value.resultTotal));
  current.searchKind =
    value.searchKind === "part_number" ? "part_number" : current.searchKind;
  current.oem = String(value.oem || current.oem || "").slice(0, 40);
  current.modality = String(value.modality || current.modality || "").slice(0, 40);
  current.model = String(value.model || current.model || "").slice(0, 80);
  current.lastSeen =
    String(value.lastSeen || value.date || "") > current.lastSeen
      ? String(value.lastSeen || value.date || "")
      : current.lastSeen;
  map.set(normalized, current);
};

const serializeTimestamp = (value) => {
  if (value?.toDate) return value.toDate().toISOString();
  return null;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!adminDb) {
    res.status(503).json({ error: "Analytics storage is not configured." });
    return;
  }

  const decodedToken = await requireFirebaseAuth(req, res);
  if (!decodedToken) {
    if (!res.headersSent) res.status(401).json({ error: "Authentication required." });
    return;
  }
  if (!canAccessWebsiteAnalysis(decodedToken.email, decodedToken)) {
    res.status(403).json({ error: "Admin access is required." });
    return;
  }

  try {
    const requestedDays = Number(req.query.days);
    const days = [7, 30, 90].includes(requestedDays) ? requestedDays : 30;
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    start.setUTCDate(start.getUTCDate() - (days - 1));
    const startDate = dateString(start);

    const [dailySnapshot, eventSnapshot, partSearchSnapshot] = await Promise.all([
      adminDb
        .collection("WebsiteAnalyticsDaily")
        .where("date", ">=", startDate)
        .orderBy("date", "asc")
        .get(),
      adminDb
        .collection("WebsiteAnalyticsEvents")
        .where("date", ">=", startDate)
        .orderBy("date", "desc")
        .limit(EVENT_SAMPLE_LIMIT)
        .get(),
      adminDb
        .collection("WebsitePartSearchDaily")
        .where("date", ">=", startDate)
        .orderBy("date", "asc")
        .limit(PART_SEARCH_AGGREGATE_LIMIT)
        .get(),
    ]);

    const totals = {};
    const forms = Object.fromEntries(
      FORM_TYPES.map((formType) => [
        formType,
        { form_open: 0, form_start: 0, form_submit: 0, form_error: 0 },
      ])
    );
    const daily = dailySnapshot.docs.map((document) => {
      const data = document.data();
      addCounts(totals, data.totals);
      FORM_TYPES.forEach((formType) => addCounts(forms[formType], data.forms?.[formType]));
      return {
        date: data.date || document.id,
        events: numberValue(data.totalEvents),
        pageViews: numberValue(data.totals?.page_view),
        clicks: numberValue(data.totals?.click),
        searches: numberValue(data.totals?.search),
        formsSubmitted: numberValue(data.totals?.form_submit),
      };
    });

    const pages = new Map();
    const clicks = new Map();
    const referrers = new Map();
    const devices = new Map();
    const browsers = new Map();
    const countries = new Map();
    const visitors = new Set();
    const recent = [];
    const partSearches = new Map();

    partSearchSnapshot.docs.forEach((document) => {
      const data = document.data();
      addPartSearch(partSearches, {
        ...data,
        lastSeen: data.date || "",
      });
    });

    eventSnapshot.docs.forEach((document) => {
      const data = document.data();
      if (data.eventType === "page_view" || data.eventType === "product_view") {
        increment(pages, data.path);
      }
      if (data.eventType === "click") {
        increment(clicks, data.properties?.label || data.properties?.target || data.path);
      }
      increment(referrers, data.referrerHost);
      increment(devices, data.device);
      increment(browsers, data.browser);
      increment(countries, data.country);
      if (data.visitorHash) visitors.add(data.visitorHash);
      if (
        data.eventType === "search" &&
        data.aggregateVersion !== 1 &&
        data.properties?.search_location === "parts_catalog"
      ) {
        const resultCount = Math.max(0, numberValue(data.properties?.result_count));
        addPartSearch(partSearches, {
          searchTerm: data.properties?.search_term,
          searchKind: data.properties?.search_kind,
          count: 1,
          zeroResultCount: data.properties?.result_count !== undefined && resultCount === 0 ? 1 : 0,
          resultTotal: resultCount,
          oem: data.properties?.oem,
          modality: data.properties?.modality,
          model: data.properties?.model,
          lastSeen: data.date || "",
        });
      }

      if (recent.length < 40) {
        recent.push({
          id: document.id,
          eventType: data.eventType || "unknown",
          formType: data.formType || "",
          path: data.path || "/",
          label: data.properties?.label || data.properties?.search_term || "",
          device: data.device || "unknown",
          browser: data.browser || "unknown",
          country: data.country || "unknown",
          createdAt: serializeTimestamp(data.createdAt),
        });
      }
    });

    const opened = numberValue(totals.form_open);
    const started = numberValue(totals.form_start);
    const submitted = numberValue(totals.form_submit);
    const conversionBase = started || opened;
    const rankedPartSearches = Array.from(partSearches.values())
      .sort(
        (left, right) =>
          right.count - left.count ||
          right.lastSeen.localeCompare(left.lastSeen) ||
          left.searchTerm.localeCompare(right.searchTerm)
      )
      .slice(0, 100)
      .map((item, index) => ({
        rank: index + 1,
        ...item,
        averageResults: item.count ? item.resultTotal / item.count : 0,
        zeroResultRate: item.count ? (item.zeroResultCount / item.count) * 100 : 0,
      }));

    res.status(200).json({
      range: { days, startDate, endDate: dateString(new Date()) },
      totals: {
        events: daily.reduce((sum, item) => sum + item.events, 0),
        pageViews: numberValue(totals.page_view),
        clicks: numberValue(totals.click),
        searches: numberValue(totals.search),
        productViews: numberValue(totals.product_view),
        formOpened: opened,
        formStarted: started,
        formSubmitted: submitted,
        formErrors: numberValue(totals.form_error),
        conversionRate: conversionBase ? (submitted / conversionBase) * 100 : 0,
        observedVisitors: visitors.size,
      },
      forms,
      daily,
      top: {
        pages: ranked(pages),
        clicks: ranked(clicks),
        referrers: ranked(referrers),
        devices: ranked(devices, 5),
        browsers: ranked(browsers, 5),
        countries: ranked(countries, 8),
      },
      partSearches: rankedPartSearches,
      partSearchSummary: {
        terms: partSearches.size,
        searches: Array.from(partSearches.values()).reduce(
          (sum, item) => sum + item.count,
          0
        ),
        zeroResultSearches: Array.from(partSearches.values()).reduce(
          (sum, item) => sum + item.zeroResultCount,
          0
        ),
        exactDailyDocuments: partSearchSnapshot.size,
        legacySampled: eventSnapshot.size === EVENT_SAMPLE_LIMIT,
      },
      recent,
      sample: {
        eventsRead: eventSnapshot.size,
        limited: eventSnapshot.size === EVENT_SAMPLE_LIMIT,
      },
    });
  } catch (error) {
    console.error("Website analytics report failed:", error);
    res.status(500).json({
      error: "Website analytics could not be loaded.",
    });
  }
}
