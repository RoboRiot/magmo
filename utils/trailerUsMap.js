const CITY_COORDINATES = {
  "alhambra, ca": [-118.127, 34.095],
  "anaheim, ca": [-117.915, 33.836],
  "clovis, ca": [-119.703, 36.825],
  "columbia station, oh": [-81.934, 41.313],
  "davie, fl": [-80.233, 26.076],
  "duarte, ca": [-117.978, 34.139],
  "elko, nv": [-115.763, 40.833],
  "gallup, nm": [-108.743, 35.529],
  "greenport, ny": [-72.359, 41.103],
  "gridley, ca": [-121.694, 39.364],
  "harlingen, tx": [-97.696, 26.19],
  "king city, ca": [-121.126, 36.212],
  "lake forest, ca": [-117.689, 33.646],
  "las vegas, nv": [-115.14, 36.17],
  "lathrop, ca": [-121.276, 37.822],
  "long beach, ca": [-118.194, 33.77],
  "madera, ca": [-120.06, 36.961],
  "mariposa, ca": [-119.966, 37.485],
  "mesa, az": [-111.831, 33.415],
  "minden, nv": [-119.765, 38.954],
  "monterey park, ca": [-118.122, 34.063],
  "north hollywood, ca": [-118.378, 34.187],
  "oakdale, ca": [-120.847, 37.767],
  "panorama city, ca": [-118.449, 34.224],
  "potsdam, ny": [-74.981, 44.669],
  "prescott valley, az": [-112.315, 34.61],
  "reno, nv": [-119.814, 39.529],
  "stuart, va": [-80.265, 36.64],
  "tucson, az": [-110.974, 32.222],
  "tustin, ca": [-117.826, 33.746],
  "upland, ca": [-117.65, 34.097],
  "visalia, ca": [-119.292, 36.33],
  "webster, tx": [-95.118, 29.538],
  "wichita, ks": [-97.337, 37.687],
};

const LOCATION_ALIASES = {
  "tuscon, az": "tucson, az",
};

const STATE_CENTERS = {
  AL: [-86.902, 32.806],
  AK: [-152.404, 64.2],
  AZ: [-111.094, 34.049],
  AR: [-92.373, 34.97],
  CA: [-119.418, 36.778],
  CO: [-105.783, 39.55],
  CT: [-72.755, 41.603],
  DE: [-75.527, 38.91],
  FL: [-81.516, 27.665],
  GA: [-82.9, 32.166],
  HI: [-155.583, 19.897],
  ID: [-114.743, 44.068],
  IL: [-89.399, 40.634],
  IN: [-86.134, 40.267],
  IA: [-93.097, 41.878],
  KS: [-98.484, 39.011],
  KY: [-84.27, 37.839],
  LA: [-91.962, 30.984],
  ME: [-69.445, 45.254],
  MD: [-76.642, 39.046],
  MA: [-71.383, 42.407],
  MI: [-85.602, 44.315],
  MN: [-94.685, 46.73],
  MS: [-89.398, 32.355],
  MO: [-91.832, 37.964],
  MT: [-110.362, 46.88],
  NE: [-99.902, 41.493],
  NV: [-116.419, 38.802],
  NH: [-71.573, 43.194],
  NJ: [-74.406, 40.059],
  NM: [-105.87, 34.52],
  NY: [-75.499, 43.299],
  NC: [-79.019, 35.76],
  ND: [-101.003, 47.551],
  OH: [-82.908, 40.417],
  OK: [-97.093, 35.007],
  OR: [-120.555, 43.804],
  PA: [-77.195, 41.203],
  RI: [-71.477, 41.58],
  SC: [-80.899, 33.837],
  SD: [-99.902, 43.97],
  TN: [-86.58, 35.518],
  TX: [-99.902, 31.969],
  UT: [-111.094, 39.321],
  VT: [-72.577, 44.559],
  VA: [-78.657, 37.431],
  WA: [-120.74, 47.751],
  WV: [-80.455, 38.598],
  WI: [-89.617, 43.784],
  WY: [-107.29, 43.076],
};

function normalizeLocation(value) {
  return String(value || "")
    .replace(/\bmap\b/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .trim()
    .toLowerCase();
}

function extractStateCode(value) {
  const matches = String(value || "").toUpperCase().match(/\b[A-Z]{2}\b/g);
  if (!matches?.length) return "";
  return [...matches].reverse().find((code) => STATE_CENTERS[code]) || "";
}

function findCityCoordinates(value) {
  const normalized = normalizeLocation(value);
  if (!normalized) return null;
  const aliased = LOCATION_ALIASES[normalized] || normalized;
  if (CITY_COORDINATES[aliased]) return CITY_COORDINATES[aliased];

  const matchingKey = Object.keys(CITY_COORDINATES).find(
    (key) => aliased === key || aliased.includes(key),
  );
  return matchingKey ? CITY_COORDINATES[matchingKey] : null;
}

function resolveCoordinatesFromCandidates(candidates, latitude, longitude) {
  const storedLat = Number(latitude);
  const storedLng = Number(longitude);
  if (Number.isFinite(storedLat) && Number.isFinite(storedLng)) {
    return [storedLng, storedLat];
  }

  const cleanCandidates = candidates.filter(Boolean);
  for (const candidate of cleanCandidates) {
    const cityCoordinates = findCityCoordinates(candidate);
    if (cityCoordinates) return cityCoordinates;
  }

  for (const candidate of cleanCandidates) {
    const state = extractStateCode(candidate);
    if (state && STATE_CENTERS[state]) return STATE_CENTERS[state];
  }
  return null;
}

export function isTrailerInTransit(trailer) {
  const status = String(trailer?.locationStatus || "").trim().toLowerCase();
  return trailer?.inTransit === true || status === "transit" || status === "in_transit";
}

export function getTrailerTransitOrigin(trailer) {
  return (
    String(trailer?.locationCurrentName || "").trim() ||
    String(trailer?.locationCurrentClientLocation || "").trim() ||
    String(trailer?.locationCurrent || "").trim() ||
    String(trailer?.location || "").trim()
  );
}

export function getTrailerTransitDestination(trailer) {
  return (
    String(trailer?.locationNextName || "").trim() ||
    String(trailer?.locationNextClientLocation || "").trim() ||
    String(trailer?.locationNext || "").trim()
  );
}

export function getTrailerMapLocation(trailer) {
  if (isTrailerInTransit(trailer)) {
    const origin = getTrailerTransitOrigin(trailer) || "Unknown origin";
    const destination = getTrailerTransitDestination(trailer) || "Unknown destination";
    return `${origin} to ${destination}`;
  }
  return (
    String(trailer?.locationCurrentClientLocation || "").trim() ||
    String(trailer?.locationCurrentName || "").trim() ||
    String(trailer?.locationCurrent || "").trim() ||
    String(trailer?.location || "").trim()
  );
}

export function resolveTrailerCoordinates(trailer) {
  return resolveCoordinatesFromCandidates(
    [
      trailer?.locationCurrentClientLocation,
      trailer?.locationCurrentName,
      trailer?.locationCurrent,
      trailer?.location,
    ],
    trailer?.locationCurrentLatitude ??
      trailer?.currentLatitude ??
      trailer?.latitude ??
      trailer?.lat,
    trailer?.locationCurrentLongitude ??
      trailer?.currentLongitude ??
      trailer?.longitude ??
      trailer?.lng,
  );
}

export function resolveTrailerDestinationCoordinates(trailer) {
  return resolveCoordinatesFromCandidates(
    [
      trailer?.locationNextClientLocation,
      trailer?.locationNextName,
      trailer?.locationNext,
    ],
    trailer?.locationNextLatitude ?? trailer?.nextLatitude,
    trailer?.locationNextLongitude ?? trailer?.nextLongitude,
  );
}

export function buildTrailerMapDescription(trailer) {
  const name = String(trailer?.name || trailer?.mondayBoardName || trailer?.id || "")
    .trim();
  const model = String(trailer?.model || "").trim();
  const nameDescription = name.includes("-")
    ? name.split("-").slice(1).join("-").trim()
    : "";
  return model || nameDescription || "Mobile imaging trailer";
}

export function getTrailerSortNumber(trailer) {
  const stored = Number(trailer?.number);
  if (Number.isFinite(stored)) return stored;
  const match = String(trailer?.id || trailer?.name || "").match(/\bAIS\s*(\d+)\b/i);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

export function offsetProjectedTrailerMarkers(trailers, projection) {
  const projected = trailers
    .map((trailer) => {
      const originCoordinates = resolveTrailerCoordinates(trailer);
      const destinationCoordinates = isTrailerInTransit(trailer)
        ? resolveTrailerDestinationCoordinates(trailer)
        : null;
      const originPoint = originCoordinates ? projection(originCoordinates) : null;
      const destinationPoint = destinationCoordinates
        ? projection(destinationCoordinates)
        : null;
      const point =
        originPoint && destinationPoint
          ? [
              (originPoint[0] + destinationPoint[0]) / 2,
              (originPoint[1] + destinationPoint[1]) / 2,
            ]
          : destinationPoint || originPoint;
      return point
        ? {
            trailer,
            coordinates: destinationCoordinates || originCoordinates,
            originCoordinates,
            destinationCoordinates,
            originPoint,
            destinationPoint,
            baseX: point[0],
            baseY: point[1],
          }
        : null;
    })
    .filter(Boolean);

  const groups = new Map();
  projected.forEach((entry) => {
    const key = `${entry.baseX.toFixed(1)}:${entry.baseY.toFixed(1)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  });

  return projected.map((entry) => {
    const key = `${entry.baseX.toFixed(1)}:${entry.baseY.toFixed(1)}`;
    const group = groups.get(key) || [entry];
    const index = group.indexOf(entry);
    if (group.length === 1) {
      return { ...entry, x: entry.baseX, y: entry.baseY };
    }
    const radius = Math.min(18, 7 + group.length * 1.2);
    const angle = (Math.PI * 2 * index) / group.length - Math.PI / 2;
    return {
      ...entry,
      x: entry.baseX + Math.cos(angle) * radius,
      y: entry.baseY + Math.sin(angle) * radius,
    };
  });
}
