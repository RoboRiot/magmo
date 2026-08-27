const HELIUM_REFRESH_MS = 60_000;
const STALE_AFTER_MS = 35 * 60_000;

function normalizeTrailerId(value) {
  const match = String(value || "").match(/AIS\s*[-_]?\s*(\d+)/i);
  return match ? `AIS${Number(match[1])}` : "";
}

function toTimestamp(value) {
  const timestamp = new Date(value || 0).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function finiteMetric(metrics, ...keys) {
  for (const key of keys) {
    const value = Number(metrics?.[key]);
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function formatNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return "Unknown";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function getHeliumSystemTrailerId(system) {
  const explicitCandidates = [
    system?.trailerId,
    system?.associatedTrailerId,
    system?.metadata?.trailerId,
    system?.trailer?.id,
  ];
  for (const candidate of explicitCandidates) {
    const trailerId = normalizeTrailerId(candidate);
    if (trailerId) return trailerId;
  }
  return normalizeTrailerId(system?.displayName) || normalizeTrailerId(system?.id);
}

export function hasHeliumMetrics(system) {
  const metrics = system?.metrics || system?.mirror?.metrics || {};
  return [
    "helium_level1",
    "helium_level2",
    "HeLvl",
    "magnet_psi",
    "HePress",
    "coldhead_temperature",
    "ColdheadRuO",
  ].some((key) => Number.isFinite(Number(metrics?.[key])));
}

export function indexTrailerHeliumSystems(systems = []) {
  return (Array.isArray(systems) ? systems : []).reduce((index, system) => {
    const trailerId = getHeliumSystemTrailerId(system);
    if (!trailerId || !hasHeliumMetrics(system)) return index;
    const existing = index[trailerId];
    const candidateTime = toTimestamp(
      system?.lastCollectedAt || system?.lastReceivedAt,
    );
    const existingTime = toTimestamp(
      existing?.lastCollectedAt || existing?.lastReceivedAt,
    );
    if (!existing || candidateTime >= existingTime) index[trailerId] = system;
    return index;
  }, {});
}

export async function loadTrailerHeliumIndex(firebaseInstance) {
  const token = await firebaseInstance.auth().currentUser?.getIdToken();
  const response = await fetch("/api/magmonitor/data?range=1h&history=false", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || "Helium telemetry could not be loaded.");
  }
  return indexTrailerHeliumSystems(payload?.systems || []);
}

export function attachTrailerHelium(trailers = [], heliumIndex = {}) {
  return trailers.map((trailer) => {
    const trailerId =
      normalizeTrailerId(trailer?.id) ||
      normalizeTrailerId(trailer?.name) ||
      normalizeTrailerId(trailer?.mondayBoardName);
    return {
      ...trailer,
      heliumTelemetry: trailerId ? heliumIndex?.[trailerId] || null : null,
    };
  });
}

export function getTrailerHeliumSnapshot(trailerOrSystem) {
  const system = trailerOrSystem?.heliumTelemetry || trailerOrSystem;
  if (!system || !hasHeliumMetrics(system)) return null;

  const metrics = system.metrics || system?.mirror?.metrics || {};
  const heliumLevel1 = finiteMetric(metrics, "helium_level1", "HeLvl");
  const heliumLevel2 = finiteMetric(metrics, "helium_level2");
  const magnetPsi = finiteMetric(metrics, "magnet_psi", "HePress");
  const coldhead = finiteMetric(
    metrics,
    "coldhead_temperature",
    "ColdheadRuO",
  );
  const shield = finiteMetric(metrics, "shield_temperature", "Shield");
  const magnetPower = finiteMetric(metrics, "magnet_power");
  const collectedAt = system.lastCollectedAt || system.lastReceivedAt || null;
  const collectedTimestamp = toTimestamp(collectedAt);
  const isStale =
    typeof system.stale === "boolean"
      ? system.stale
      : !collectedTimestamp || Date.now() - collectedTimestamp > STALE_AFTER_MS;

  const heliumValues = [heliumLevel1, heliumLevel2].filter(Number.isFinite);
  const heliumDisplay = heliumValues.length
    ? `${heliumValues.map((value) => formatNumber(value, 1)).join(" / ")} %`
    : "Unknown";

  return {
    systemId: String(system.id || "").trim(),
    systemName: String(system.displayName || system.id || "Magmonitor").trim(),
    manufacturer: String(system.manufacturer || "").trim(),
    collectedAt,
    isStale,
    heliumDisplay,
    magnetPsiDisplay:
      magnetPsi == null ? "Unknown" : `${formatNumber(magnetPsi, 2)} psi`,
    coldheadDisplay:
      coldhead == null ? "Unknown" : `${formatNumber(coldhead, 1)} K`,
    shieldDisplay:
      shield == null ? "Unknown" : `${formatNumber(shield, 1)} K`,
    magnetPowerDisplay:
      magnetPower == null ? "Unknown" : `${formatNumber(magnetPower, 3)} W`,
    compressorDisplay:
      typeof metrics.compressor === "boolean"
        ? metrics.compressor
          ? "On"
          : "Off"
        : "Unknown",
  };
}

export function formatHeliumReadingTime(value) {
  const timestamp = toTimestamp(value);
  if (!timestamp) return "Unknown";
  return new Date(timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export { HELIUM_REFRESH_MS };
