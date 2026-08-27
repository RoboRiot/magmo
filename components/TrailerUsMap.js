import { useEffect, useMemo, useRef, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import usTopology from "us-atlas/states-albers-10m.json";
import {
  buildTrailerMapDescription,
  getTrailerMapLocation,
  getTrailerSortNumber,
  getTrailerTransitDestination,
  getTrailerTransitOrigin,
  isTrailerInTransit,
  offsetProjectedTrailerMarkers,
} from "../utils/trailerUsMap";
import { getTrailerHeliumSnapshot } from "../utils/trailerHelium";
import { STATE_CITY_REFERENCES } from "../utils/usStateCities";
import TrailerMapSummary from "./TrailerMapSummary";
import styles from "./TrailerUsMap.module.css";

const VIEWBOX_WIDTH = 975;
const VIEWBOX_HEIGHT = 610;
const MIN_ZOOM = 1;
const MAX_ZOOM = 24;
const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
const path = geoPath();
const nation = feature(usTopology, usTopology.objects.nation);
const STATE_NAMES = {
  "01": "Alabama",
  "02": "Alaska",
  "04": "Arizona",
  "05": "Arkansas",
  "06": "California",
  "08": "Colorado",
  "09": "Connecticut",
  "10": "Delaware",
  "11": "District of Columbia",
  "12": "Florida",
  "13": "Georgia",
  "15": "Hawaii",
  "16": "Idaho",
  "17": "Illinois",
  "18": "Indiana",
  "19": "Iowa",
  "20": "Kansas",
  "21": "Kentucky",
  "22": "Louisiana",
  "23": "Maine",
  "24": "Maryland",
  "25": "Massachusetts",
  "26": "Michigan",
  "27": "Minnesota",
  "28": "Mississippi",
  "29": "Missouri",
  "30": "Montana",
  "31": "Nebraska",
  "32": "Nevada",
  "33": "New Hampshire",
  "34": "New Jersey",
  "35": "New Mexico",
  "36": "New York",
  "37": "North Carolina",
  "38": "North Dakota",
  "39": "Ohio",
  "40": "Oklahoma",
  "41": "Oregon",
  "42": "Pennsylvania",
  "44": "Rhode Island",
  "45": "South Carolina",
  "46": "South Dakota",
  "47": "Tennessee",
  "48": "Texas",
  "49": "Utah",
  "50": "Vermont",
  "51": "Virginia",
  "53": "Washington",
  "54": "West Virginia",
  "55": "Wisconsin",
  "56": "Wyoming",
};
const stateFeatures = feature(
  usTopology,
  usTopology.objects.states,
).features.map((state) => ({
  ...state,
  id: String(state.id).padStart(2, "0"),
}));
const stateFeatureById = new Map(
  stateFeatures.map((state) => [state.id, state]),
);
const stateOptions = stateFeatures
  .map((state) => ({ id: state.id, name: STATE_NAMES[state.id] || state.id }))
  .sort((left, right) => left.name.localeCompare(right.name));
const stateBorders = mesh(
  usTopology,
  usTopology.objects.states,
  (left, right) => left !== right,
);

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function formatMapNumber(value) {
  return Math.round(Number(value) * 1000) / 1000;
}

function isPointInRing([pointX, pointY], ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [x, y] = ring[index];
    const [previousX, previousY] = ring[previous];
    const crosses =
      y > pointY !== previousY > pointY &&
      pointX < ((previousX - x) * (pointY - y)) / (previousY - y) + x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function isPointInPolygon(point, polygon) {
  return (
    polygon.length > 0 &&
    isPointInRing(point, polygon[0]) &&
    !polygon.slice(1).some((hole) => isPointInRing(point, hole))
  );
}

function isPointInFeature(point, state) {
  if (!point || !state?.geometry) return false;
  const { coordinates, type } = state.geometry;
  if (type === "Polygon") return isPointInPolygon(point, coordinates);
  if (type === "MultiPolygon") {
    return coordinates.some((polygon) => isPointInPolygon(point, polygon));
  }
  return false;
}

function clampViewport(viewport, contentBounds = null) {
  const scale = clamp(Number(viewport.scale) || 1, MIN_ZOOM, MAX_ZOOM);
  if (contentBounds) {
    const [[left, top], [right, bottom]] = contentBounds;
    const minimumVisible = 72;
    return {
      scale,
      x: clamp(
        Number(viewport.x) || 0,
        minimumVisible - right * scale,
        VIEWBOX_WIDTH - minimumVisible - left * scale,
      ),
      y: clamp(
        Number(viewport.y) || 0,
        minimumVisible - bottom * scale,
        VIEWBOX_HEIGHT - minimumVisible - top * scale,
      ),
    };
  }
  return {
    scale,
    x: clamp(Number(viewport.x) || 0, VIEWBOX_WIDTH * (1 - scale), 0),
    y: clamp(Number(viewport.y) || 0, VIEWBOX_HEIGHT * (1 - scale), 0),
  };
}

function getTrailerLabel(trailer) {
  return String(
    trailer?.name || trailer?.mondayBoardName || trailer?.id || "Trailer",
  ).trim();
}

function getTransitRoutePath(originPoint, destinationPoint) {
  if (!originPoint || !destinationPoint) return "";
  const deltaX = destinationPoint[0] - originPoint[0];
  const deltaY = destinationPoint[1] - originPoint[1];
  const distance = Math.max(1, Math.hypot(deltaX, deltaY));
  const curve = Math.min(92, Math.max(36, distance * 0.28));
  const midX = (originPoint[0] + destinationPoint[0]) / 2;
  const midY = (originPoint[1] + destinationPoint[1]) / 2;
  const controlX = midX - (deltaY / distance) * curve;
  const controlY = midY + (deltaX / distance) * curve;
  return `M${formatMapNumber(originPoint[0])},${formatMapNumber(
    originPoint[1],
  )} Q${formatMapNumber(controlX)},${formatMapNumber(
    controlY,
  )} ${formatMapNumber(destinationPoint[0])},${formatMapNumber(
    destinationPoint[1],
  )}`;
}

export default function TrailerUsMap({
  trailers = [],
  highlightedTrailerId = "",
  onOpenTrailer,
  onTrailerHoverChange,
}) {
  const [hoveredTrailerId, setHoveredTrailerId] = useState("");
  const [focusedTrailerId, setFocusedTrailerId] = useState("");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [visibleStatuses, setVisibleStatuses] = useState({
    onsite: true,
    transit: true,
  });
  const [viewport, setViewport] = useState({ scale: 1, x: 0, y: 0 });
  const [selectedStateId, setSelectedStateId] = useState("");
  const [isPanning, setIsPanning] = useState(false);
  const mapRef = useRef(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    clientX: 0,
    clientY: 0,
    suppressStateClickUntil: 0,
  });

  const statusCounts = useMemo(
    () =>
      trailers.reduce(
        (counts, trailer) => {
          counts[isTrailerInTransit(trailer) ? "transit" : "onsite"] += 1;
          return counts;
        },
        { onsite: 0, transit: 0 },
      ),
    [trailers],
  );

  const sortedTrailers = useMemo(
    () =>
      trailers
        .filter((trailer) =>
          isTrailerInTransit(trailer)
            ? visibleStatuses.transit
            : visibleStatuses.onsite,
        )
        .sort(
        (left, right) =>
          getTrailerSortNumber(left) - getTrailerSortNumber(right) ||
          getTrailerLabel(left).localeCompare(getTrailerLabel(right)),
      ),
    [trailers, visibleStatuses],
  );
  const markers = useMemo(
    () => offsetProjectedTrailerMarkers(sortedTrailers, projection),
    [sortedTrailers],
  );
  const focusedState = selectedStateId
    ? stateFeatureById.get(selectedStateId) || null
    : null;
  const focusedStateBounds = useMemo(
    () => (focusedState ? path.bounds(focusedState) : null),
    [focusedState],
  );
  const focusedCities = useMemo(
    () =>
      selectedStateId
        ? (STATE_CITY_REFERENCES[selectedStateId] || [])
            .map(([name, longitude, latitude]) => ({
              name,
              point: projection([longitude, latitude]),
            }))
            .filter(({ point }) => point)
        : [],
    [selectedStateId],
  );
  const visibleMarkers = useMemo(() => {
    if (!focusedState) return markers;
    return markers.filter(
      ({ originPoint, destinationPoint }) =>
        isPointInFeature(originPoint, focusedState) ||
        isPointInFeature(destinationPoint, focusedState),
    );
  }, [focusedState, markers]);
  const mappedIds = useMemo(
    () => new Set(markers.map((marker) => marker.trailer.id)),
    [markers],
  );
  const unmappedCount = sortedTrailers.filter(
    (trailer) => !mappedIds.has(trailer.id),
  ).length;
  const activeMarker =
    visibleMarkers.find(
      ({ trailer }) =>
        trailer.id ===
        (hoveredTrailerId || focusedTrailerId || highlightedTrailerId),
    ) || null;
  const activeHelium = activeMarker
    ? getTrailerHeliumSnapshot(activeMarker.trailer)
    : null;
  const activeScreenPoint = activeMarker
    ? {
        x: viewport.x + activeMarker.x * viewport.scale,
        y: viewport.y + activeMarker.y * viewport.scale,
      }
    : null;

  useEffect(() => {
    if (
      selectedTrailer &&
      !sortedTrailers.some((trailer) => trailer.id === selectedTrailer.id)
    ) {
      setSelectedTrailer(null);
    }
  }, [selectedTrailer, sortedTrailers]);

  const toggleStatus = (status) => {
    setVisibleStatuses((current) => ({
      ...current,
      [status]: !current[status],
    }));
  };

  const updateZoom = (nextScale, anchorX = VIEWBOX_WIDTH / 2, anchorY = VIEWBOX_HEIGHT / 2) => {
    setViewport((current) => {
      const scale = clamp(nextScale, MIN_ZOOM, MAX_ZOOM);
      const ratio = scale / current.scale;
      return clampViewport(
        {
          scale,
          x: anchorX - (anchorX - current.x) * ratio,
          y: anchorY - (anchorY - current.y) * ratio,
        },
        focusedStateBounds,
      );
    });
  };

  const resetViewport = () => {
    setViewport({ scale: 1, x: 0, y: 0 });
    setSelectedStateId("");
  };

  const focusState = (stateId) => {
    const normalizedId = String(stateId || "").padStart(2, "0");
    const state = stateFeatureById.get(normalizedId);
    if (!state) {
      resetViewport();
      return;
    }
    const [[left, top], [right, bottom]] = path.bounds(state);
    const stateWidth = Math.max(1, right - left);
    const stateHeight = Math.max(1, bottom - top);
    const padding = 24;
    const scale = clamp(
      Math.min(
        (VIEWBOX_WIDTH - padding * 2) / stateWidth,
        (VIEWBOX_HEIGHT - padding * 2) / stateHeight,
      ),
      MIN_ZOOM,
      MAX_ZOOM,
    );
    setViewport({
      scale,
      x: VIEWBOX_WIDTH / 2 - ((left + right) / 2) * scale,
      y: VIEWBOX_HEIGHT / 2 - ((top + bottom) / 2) * scale,
    });
    setSelectedStateId(normalizedId);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect?.width || !rect?.height) return;
    const anchorX = ((event.clientX - rect.left) / rect.width) * VIEWBOX_WIDTH;
    const anchorY = ((event.clientY - rect.top) / rect.height) * VIEWBOX_HEIGHT;
    const zoomFactor = event.deltaY < 0 ? 1.22 : 1 / 1.22;
    const nextScale = viewport.scale * zoomFactor;
    updateZoom(nextScale, anchorX, anchorY);
    if (nextScale <= MIN_ZOOM) setSelectedStateId("");
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest?.('[data-map-action="true"]')) return;
    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      clientX: event.clientX,
      clientY: event.clientY,
      suppressStateClickUntil: 0,
    };
    setIsPanning(false);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect?.width || !rect?.height) return;
    if (!drag.moved) {
      const distance = Math.hypot(
        event.clientX - drag.startX,
        event.clientY - drag.startY,
      );
      if (distance < 6) return;
      drag.moved = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      setIsPanning(true);
    }
    const deltaX = ((event.clientX - drag.clientX) / rect.width) * VIEWBOX_WIDTH;
    const deltaY = ((event.clientY - drag.clientY) / rect.height) * VIEWBOX_HEIGHT;
    drag.clientX = event.clientX;
    drag.clientY = event.clientY;
    setViewport((current) =>
      clampViewport(
        {
          ...current,
          x: current.x + deltaX,
          y: current.y + deltaY,
        },
        focusedStateBounds,
      ),
    );
  };

  const handlePointerEnd = (event) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsPanning(false);
    if (dragRef.current.moved) {
      dragRef.current.suppressStateClickUntil = Date.now() + 350;
    }
  };

  const handleStateClick = (stateId) => {
    if (
      dragRef.current.moved ||
      Date.now() < dragRef.current.suppressStateClickUntil
    ) {
      dragRef.current.moved = false;
      return;
    }
    if (selectedStateId === stateId) {
      resetViewport();
      return;
    }
    focusState(stateId);
  };

  return (
    <section className={styles.shell} aria-label="United States trailer map">
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>National deployment view</div>
          <h3 className={styles.title}>Trailer locations and transit</h3>
          <p className={styles.subtitle}>
            Drag to move, scroll to zoom, or select a state for a focused view.
          </p>
        </div>
        <div className={styles.headerTools}>
          <div className={styles.filters} aria-label="Trailer status filters">
            <button
              type="button"
              className={`${styles.filterButton} ${
                visibleStatuses.onsite ? styles.filterButtonActive : ""
              }`}
              aria-pressed={visibleStatuses.onsite}
              onClick={() => toggleStatus("onsite")}
            >
              <span className={styles.filterDotOnsite} />
              On site
              <b>{statusCounts.onsite}</b>
            </button>
            <button
              type="button"
              className={`${styles.filterButton} ${
                visibleStatuses.transit ? styles.filterButtonTransitActive : ""
              }`}
              aria-pressed={visibleStatuses.transit}
              onClick={() => toggleStatus("transit")}
            >
              <span className={styles.filterDotTransit} />
              In transit
              <b>{statusCounts.transit}</b>
            </button>
          </div>
          <div className={styles.summary}>
            <span className={styles.summaryValue}>{visibleMarkers.length}</span>
            <span className={styles.summaryLabel}>shown</span>
          </div>
        </div>
      </div>

      <div className={styles.mapCard}>
        <div className={styles.mapGlow} aria-hidden="true" />
        <div
          className={styles.mapControls}
          data-map-action="true"
          onPointerDown={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
        >
          <label className={styles.stateSelector}>
            <span>Focus state</span>
            <select
              value={selectedStateId}
              onChange={(event) =>
                event.target.value
                  ? focusState(event.target.value)
                  : resetViewport()
              }
              aria-label="Focus the map on a state"
            >
              <option value="">All United States</option>
              {stateOptions.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.zoomControls} aria-label="Map zoom controls">
            <button
              type="button"
              onClick={() => updateZoom(viewport.scale * 1.35)}
              aria-label="Zoom in"
              title="Zoom in"
            >
              +
            </button>
            <span>{Math.round(viewport.scale * 100)}%</span>
            <button
              type="button"
              onClick={() => {
                const nextScale = viewport.scale / 1.35;
                updateZoom(nextScale);
                if (nextScale <= MIN_ZOOM) setSelectedStateId("");
              }}
              aria-label="Zoom out"
              title="Zoom out"
            >
              &minus;
            </button>
            <button
              type="button"
              className={styles.resetMapButton}
              onClick={resetViewport}
              disabled={viewport.scale === 1 && viewport.x === 0 && viewport.y === 0}
            >
              Reset
            </button>
          </div>
        </div>
        <svg
          ref={mapRef}
          className={`${styles.map} ${isPanning ? styles.mapPanning : ""}`}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          role="img"
          aria-label={`${
            selectedStateId
              ? `${STATE_NAMES[selectedStateId]} isolated with ${focusedCities.length} reference cities`
              : "United States"
          } map with ${visibleMarkers.length} trailer locations`}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <defs>
            <linearGradient id="transit-route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="48%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="transit-route-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            className={`${styles.mapWorld} ${
              isPanning ? styles.mapWorldPanning : ""
            }`}
            transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.scale})`}
          >
          {focusedState ? (
            <path
              className={`${styles.stateShape} ${styles.stateShapeSelected} ${styles.focusedStateShape}`}
              d={path(focusedState)}
              onClick={() => handleStateClick(focusedState.id)}
              aria-label={`Return from ${STATE_NAMES[focusedState.id]} to the United States map`}
            >
              <title>{STATE_NAMES[focusedState.id]}</title>
            </path>
          ) : (
            <>
              <path className={styles.nation} d={path(nation)} />
              {stateFeatures.map((state) => (
                <path
                  key={state.id}
                  className={styles.stateShape}
                  d={path(state)}
                  onClick={() => handleStateClick(state.id)}
                  aria-label={`Focus ${STATE_NAMES[state.id] || "state"}`}
                >
                  <title>{STATE_NAMES[state.id] || "State"}</title>
                </path>
              ))}
              <path className={styles.stateBorders} d={path(stateBorders)} />
            </>
          )}
          {focusedCities.map(({ name, point }) => (
            <g
              key={name}
              className={styles.cityReference}
              transform={`translate(${formatMapNumber(point[0])} ${formatMapNumber(
                point[1],
              )}) scale(${formatMapNumber(1 / viewport.scale)})`}
              aria-hidden="true"
            >
              <circle className={styles.cityReferenceDot} r="2.7" />
              <text className={styles.cityReferenceLabel} x="7" y="3.5">
                {name}
              </text>
            </g>
          ))}
          {visibleMarkers.map(({ trailer, originPoint, destinationPoint }) => {
            if (!isTrailerInTransit(trailer) || !originPoint || !destinationPoint) {
              return null;
            }
            const isActive =
              trailer.id === hoveredTrailerId ||
              trailer.id === focusedTrailerId ||
              trailer.id === highlightedTrailerId;
            const routePath = getTransitRoutePath(originPoint, destinationPoint);
            return (
              <g
                key={`${trailer.id}-route`}
                className={`${styles.transitRouteGroup} ${
                  isActive ? styles.transitRouteActive : ""
                }`}
                data-map-action="true"
                role="button"
                tabIndex={0}
                aria-label={`${getTrailerLabel(trailer)} in transit from ${
                  getTrailerTransitOrigin(trailer) || "unknown origin"
                } to ${getTrailerTransitDestination(trailer) || "unknown destination"}`}
                onMouseEnter={() => {
                  setHoveredTrailerId(trailer.id);
                  onTrailerHoverChange?.(trailer);
                }}
                onMouseLeave={() => {
                  setHoveredTrailerId("");
                  onTrailerHoverChange?.(null);
                }}
                onFocus={() => {
                  setFocusedTrailerId(trailer.id);
                  onTrailerHoverChange?.(trailer);
                }}
                onBlur={() => {
                  setFocusedTrailerId("");
                  onTrailerHoverChange?.(null);
                }}
                onClick={() => {
                  setHoveredTrailerId("");
                  onTrailerHoverChange?.(null);
                  setSelectedTrailer(trailer);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onTrailerHoverChange?.(null);
                    setSelectedTrailer(trailer);
                  }
                }}
              >
                <path className={styles.transitRouteHitbox} d={routePath} />
                <path className={styles.transitRouteGlow} d={routePath} />
                <path className={styles.transitRouteBase} d={routePath} />
                <path className={styles.transitRouteFlow} d={routePath} />
                <g
                  className={`${styles.transitEndpoint} ${styles.transitEndpointOrigin}`}
                  transform={`translate(${formatMapNumber(
                    originPoint[0],
                  )} ${formatMapNumber(originPoint[1])}) scale(${formatMapNumber(
                    1 / viewport.scale,
                  )})`}
                  aria-hidden="true"
                >
                  <circle className={styles.transitEndpointAura} r="10" />
                  <circle className={styles.transitEndpointRing} r="5.5" />
                  <circle className={styles.transitEndpointCore} r="2.3" />
                </g>
                <g
                  className={`${styles.transitEndpoint} ${styles.transitEndpointDestination}`}
                  transform={`translate(${formatMapNumber(
                    destinationPoint[0],
                  )} ${formatMapNumber(
                    destinationPoint[1],
                  )}) scale(${formatMapNumber(1 / viewport.scale)})`}
                  aria-hidden="true"
                >
                  <circle className={styles.transitEndpointAura} r="12" />
                  <circle className={styles.transitEndpointRing} r="6.5" />
                  <circle className={styles.transitEndpointCore} r="2.8" />
                </g>
              </g>
            );
          })}
          {visibleMarkers.map(({ trailer, x, y }) => {
            const isActive =
              trailer.id === hoveredTrailerId ||
              trailer.id === focusedTrailerId ||
              trailer.id === highlightedTrailerId;
            const helium = getTrailerHeliumSnapshot(trailer);
            const inTransit = isTrailerInTransit(trailer);
            if (inTransit) return null;
            return (
              <g
                key={trailer.id}
                className={`${styles.marker} ${
                  isActive ? styles.markerActive : ""
                }`}
                transform={`translate(${formatMapNumber(x)} ${formatMapNumber(
                  y,
                )}) scale(${formatMapNumber(1 / viewport.scale)})`}
                data-map-action="true"
                role="button"
                tabIndex={0}
                aria-label={`${getTrailerLabel(trailer)} at ${getTrailerMapLocation(
                  trailer,
                )}`}
                onMouseEnter={() => {
                  setHoveredTrailerId(trailer.id);
                  onTrailerHoverChange?.(trailer);
                }}
                onMouseLeave={() => {
                  setHoveredTrailerId("");
                  onTrailerHoverChange?.(null);
                }}
                onFocus={() => {
                  setFocusedTrailerId(trailer.id);
                  onTrailerHoverChange?.(trailer);
                }}
                onBlur={() => {
                  setFocusedTrailerId("");
                  onTrailerHoverChange?.(null);
                }}
                onClick={() => {
                  setHoveredTrailerId("");
                  onTrailerHoverChange?.(null);
                  setSelectedTrailer(trailer);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onTrailerHoverChange?.(null);
                    setSelectedTrailer(trailer);
                  }
                }}
              >
                <circle className={styles.markerHalo} r="14" />
                <path
                  className={styles.markerPin}
                  d="M0,-13 C-7.2,-13 -12,-8 -12,-1.4 C-12,6.2 0,16 0,16 C0,16 12,6.2 12,-1.4 C12,-8 7.2,-13 0,-13 Z"
                />
                <circle className={styles.markerCore} r="3.5" cy="-1.5" />
                {helium && (
                  <g className={styles.heliumMarker} aria-hidden="true">
                    <circle r="6.8" cx="10" cy="-11" />
                    <text x="10" y="-8.8">
                      He
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          </g>
        </svg>

        {activeMarker && !selectedTrailer && (
          <div
            className={styles.tooltip}
            style={{
              left: `clamp(132px, ${(activeScreenPoint.x / VIEWBOX_WIDTH) * 100}%, calc(100% - 132px))`,
              top: `${clamp(activeScreenPoint.y, 18, VIEWBOX_HEIGHT - 18) / VIEWBOX_HEIGHT * 100}%`,
              transform:
                activeScreenPoint.y < 220
                  ? "translate(-50%, 22px)"
                  : "translate(-50%, calc(-100% - 22px))",
            }}
          >
            <div className={styles.tooltipEyebrow}>
              {isTrailerInTransit(activeMarker.trailer) ? "In transit" : "On site"}
            </div>
            <div className={styles.tooltipTitle}>
              {getTrailerLabel(activeMarker.trailer)}
            </div>
            <div className={styles.tooltipDescription}>
              {buildTrailerMapDescription(activeMarker.trailer)}
            </div>
            <div className={styles.tooltipLocation}>
              {getTrailerMapLocation(activeMarker.trailer)}
            </div>
            {isTrailerInTransit(activeMarker.trailer) && (
              <div className={styles.tooltipRoute}>
                <span>{getTrailerTransitOrigin(activeMarker.trailer) || "Unknown"}</span>
                <b aria-hidden="true">&rarr;</b>
                <span>
                  {getTrailerTransitDestination(activeMarker.trailer) || "Unknown"}
                </span>
              </div>
            )}
            {activeHelium && (
              <div className={styles.tooltipHelium}>
                <span>He</span>
                <b>{activeHelium.heliumDisplay}</b>
                <small>
                  {activeHelium.magnetPsiDisplay}
                  {" · "}
                  {activeHelium.coldheadDisplay}
                </small>
              </div>
            )}
            <div className={styles.tooltipAction}>Click for quick details</div>
          </div>
        )}

        <TrailerMapSummary
          trailer={selectedTrailer}
          eyebrow={isTrailerInTransit(selectedTrailer) ? "Trailer in transit" : "On-site trailer"}
          onClose={() => setSelectedTrailer(null)}
          onMoreDetails={onOpenTrailer}
        />

        <div className={styles.legend} aria-hidden="true">
          <span className={styles.legendItem}>
            <span className={styles.legendPin} />
            On site
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendTransit} />
            In transit
          </span>
        </div>
        <div className={styles.mapHint} aria-hidden="true">
          Drag to pan <span>&middot;</span> Scroll to zoom <span>&middot;</span> Click a state
        </div>
      </div>

      {unmappedCount > 0 && (
        <div className={styles.locationNotice}>
          {unmappedCount} trailer{unmappedCount === 1 ? "" : "s"} need a city and
          state before they can be positioned.
        </div>
      )}
    </section>
  );
}
