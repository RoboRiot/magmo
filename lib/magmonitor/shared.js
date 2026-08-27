export const MAGMONITOR_SCHEMA_VERSION = 2;

export const MANUFACTURERS = {
  SIEMENS: "Siemens",
  GE: "GE",
};

export const MAX_CHART_SYSTEMS = 8;
export const MAGMONITOR_STALE_AFTER_MS = 75 * 60 * 1000;

export const METRIC_DEFINITIONS = {
  [MANUFACTURERS.SIEMENS]: [
    {
      key: "helium_level1",
      label: "Helium level 1",
      shortLabel: "He level 1",
      unit: "%",
      decimals: 1,
      attentionBelow: 65,
      criticalBelow: 50,
    },
    {
      key: "helium_level2",
      label: "Helium level 2",
      shortLabel: "He level 2",
      unit: "%",
      decimals: 1,
      attentionBelow: 65,
      criticalBelow: 50,
    },
    {
      key: "magnet_psi",
      label: "Magnet pressure",
      shortLabel: "Magnet PSI",
      unit: "psi",
      decimals: 2,
      attentionAbove: 15.4,
      criticalAbove: 20,
    },
    {
      key: "coldhead_temperature",
      label: "Coldhead temperature",
      shortLabel: "Coldhead",
      unit: "K",
      decimals: 2,
    },
    {
      key: "shield_temperature",
      label: "Shield temperature",
      shortLabel: "Shield",
      unit: "K",
      decimals: 2,
      attentionAbove: 45,
    },
    {
      key: "magnet_power",
      label: "Magnet power",
      shortLabel: "Power",
      unit: "W",
      decimals: 2,
      attentionBelow: 0.2,
    },
    {
      key: "compressor",
      label: "Compressor",
      shortLabel: "Compressor",
      unit: "",
      kind: "boolean",
    },
  ],
  [MANUFACTURERS.GE]: [
    {
      key: "HeLvl",
      label: "Helium level",
      shortLabel: "He level",
      unit: "%",
      decimals: 1,
      attentionBelow: 65,
      criticalBelow: 50,
    },
    {
      key: "HePress",
      label: "Helium pressure",
      shortLabel: "He pressure",
      unit: "psi",
      decimals: 2,
      attentionAbove: 15.4,
      criticalAbove: 20,
    },
    {
      key: "Shield",
      label: "Shield temperature",
      shortLabel: "Shield",
      unit: "K",
      decimals: 2,
      attentionAbove: 45,
    },
    {
      key: "ColdheadRuO",
      label: "Coldhead RuO",
      shortLabel: "Coldhead RuO",
      unit: "K",
      decimals: 2,
    },
    {
      key: "ReconRuO",
      label: "Recon RuO",
      shortLabel: "Recon RuO",
      unit: "K",
      decimals: 2,
    },
    {
      key: "ReconSi410",
      label: "Recon Si410",
      shortLabel: "Recon Si410",
      unit: "K",
      decimals: 2,
    },
    {
      key: "HDC",
      label: "HDC",
      shortLabel: "HDC",
      unit: "%",
      decimals: 0,
    },
    {
      key: "H20_Flow",
      label: "Water flow",
      shortLabel: "Water flow",
      unit: "l/min",
      decimals: 1,
    },
    {
      key: "H20_Temp",
      label: "Water temperature",
      shortLabel: "Water temp",
      unit: "°C",
      decimals: 1,
    },
    {
      key: "ReconDelta",
      label: "Recon delta",
      shortLabel: "Recon delta",
      unit: "K",
      decimals: 2,
    },
  ],
};

const METRIC_ALIASES = {
  H2O_Flow: "H20_Flow",
  H2O_Temp: "H20_Temp",
  water_flow: "H20_Flow",
  water_temperature: "H20_Temp",
};

export function normalizeManufacturer(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "siemens") return MANUFACTURERS.SIEMENS;
  if (normalized === "ge" || normalized === "general electric") {
    return MANUFACTURERS.GE;
  }
  return "";
}

export function cleanSystemName(value) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

export function allowedMetricKeys(manufacturer) {
  return new Set(
    (METRIC_DEFINITIONS[manufacturer] || []).map((definition) => definition.key)
  );
}

export function normalizeMetrics(rawMetrics, manufacturer) {
  if (!rawMetrics || typeof rawMetrics !== "object" || Array.isArray(rawMetrics)) {
    return {};
  }

  const allowed = allowedMetricKeys(manufacturer);
  const normalized = {};

  Object.entries(rawMetrics).forEach(([rawKey, rawValue]) => {
    const key = METRIC_ALIASES[rawKey] || rawKey;
    if (!allowed.has(key)) return;

    if (key === "compressor") {
      if (typeof rawValue === "boolean") normalized[key] = rawValue;
      return;
    }

    const numberValue =
      typeof rawValue === "number" ? rawValue : Number(String(rawValue).trim());
    if (Number.isFinite(numberValue)) normalized[key] = numberValue;
  });

  return normalized;
}

export function metricDefinition(manufacturer, metricKey) {
  return (METRIC_DEFINITIONS[manufacturer] || []).find(
    (definition) => definition.key === metricKey
  );
}

export function metricState(definition, rawValue) {
  if (!definition || definition.kind === "boolean") return "normal";
  const value = Number(rawValue);
  if (!Number.isFinite(value)) return "unknown";

  if (
    (Number.isFinite(definition.criticalBelow) &&
      value < definition.criticalBelow) ||
    (Number.isFinite(definition.criticalAbove) &&
      value > definition.criticalAbove)
  ) {
    return "critical";
  }
  if (
    (Number.isFinite(definition.attentionBelow) &&
      value < definition.attentionBelow) ||
    (Number.isFinite(definition.attentionAbove) &&
      value > definition.attentionAbove)
  ) {
    return "attention";
  }
  return "normal";
}

export function formatMetric(definition, rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === "") return "—";
  if (definition?.kind === "boolean") return rawValue ? "On" : "Off";

  const value = Number(rawValue);
  if (!Number.isFinite(value)) return "—";
  const decimals = Number.isInteger(definition?.decimals)
    ? definition.decimals
    : 2;
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return definition?.unit ? `${formatted} ${definition.unit}` : formatted;
}

export function parseRange(value) {
  const ranges = {
    "1h": { label: "1 hour", milliseconds: 60 * 60 * 1000 },
    "6h": { label: "6 hours", milliseconds: 6 * 60 * 60 * 1000 },
    "12h": { label: "12 hours", milliseconds: 12 * 60 * 60 * 1000 },
    "24h": { label: "24 hours", milliseconds: 24 * 60 * 60 * 1000 },
    "7d": { label: "7 days", milliseconds: 7 * 24 * 60 * 60 * 1000 },
  };
  return ranges[value] ? { key: value, ...ranges[value] } : { key: "12h", ...ranges["12h"] };
}

export function isSystemStale(lastCollectedAt, now = Date.now()) {
  const timestamp = new Date(lastCollectedAt || 0).getTime();
  return !Number.isFinite(timestamp) || now - timestamp > MAGMONITOR_STALE_AFTER_MS;
}
