import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth } from "../../context/AuthUserContext";
import firebase from "../../context/Firebase";
import { useSingleTabPolling } from "../../utils/useSingleTabPolling";
import {
  formatMetric,
  MAGMONITOR_STALE_AFTER_MS,
  MANUFACTURERS,
  MAX_CHART_SYSTEMS,
  METRIC_DEFINITIONS,
  metricState,
} from "../../lib/magmonitor/shared";
import styles from "../../styles/Magmonitor.module.css";

const COLORS = [
  "#16866f",
  "#315fcb",
  "#dd7a22",
  "#9c4dcc",
  "#d63d5c",
  "#0c8da6",
  "#8a7424",
  "#64748b",
];

const FLEET_REFRESH_MS = 15 * 60 * 1000;
const SYSTEM_REFRESH_MS = 5 * 60 * 1000;

const RANGE_OPTIONS = [
  ["1h", "1H"],
  ["6h", "6H"],
  ["12h", "12H"],
  ["24h", "24H"],
  ["7d", "7D"],
];

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16M7 12h10M10 19h4" />
    </svg>
  );
}

function formatDateTime(value, includeDate = true) {
  if (!value) return "Never";
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Unknown";
  return date.toLocaleString(undefined, {
    month: includeDate ? "short" : undefined,
    day: includeDate ? "numeric" : undefined,
    hour: "numeric",
    minute: "2-digit",
    second: includeDate ? undefined : "2-digit",
  });
}

function relativeTime(value) {
  if (!value) return "never";
  const timestamp = new Date(value || 0).getTime();
  if (!Number.isFinite(timestamp)) return "never";
  const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function mostRecentTimestamp(...values) {
  return values.reduce((latest, value) => {
    const timestamp = new Date(value || 0).getTime();
    if (!Number.isFinite(timestamp)) return latest;
    const latestTimestamp = new Date(latest || 0).getTime();
    return !Number.isFinite(latestTimestamp) || timestamp > latestTimestamp
      ? value
      : latest;
  }, null);
}

function niceNumber(value, round) {
  if (!Number.isFinite(value) || value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const fraction = value / 10 ** exponent;
  const niceFraction = round
    ? fraction < 1.5
      ? 1
      : fraction < 3
      ? 2
      : fraction < 7
      ? 5
      : 10
    : fraction <= 1
    ? 1
    : fraction <= 2
    ? 2
    : fraction <= 5
    ? 5
    : 10;
  return niceFraction * 10 ** exponent;
}

function smoothLinePath(points, xScale, yScale) {
  const coordinates = points.map((point) => ({
    x: xScale(point.timestamp),
    y: yScale(point.value),
  }));
  if (!coordinates.length) return "";
  if (coordinates.length < 3) {
    return coordinates
      .map(
        (point, index) =>
          `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`
      )
      .join(" ");
  }

  const segmentSlopes = coordinates.slice(0, -1).map((point, index) => {
    const next = coordinates[index + 1];
    const width = next.x - point.x;
    return width > 0 ? (next.y - point.y) / width : 0;
  });
  const tangents = coordinates.map((point, index) => {
    if (index === 0) return segmentSlopes[0];
    if (index === coordinates.length - 1) {
      return segmentSlopes[segmentSlopes.length - 1];
    }
    const previousSlope = segmentSlopes[index - 1];
    const nextSlope = segmentSlopes[index];
    if (!previousSlope || !nextSlope || previousSlope * nextSlope <= 0) return 0;

    const previousWidth = point.x - coordinates[index - 1].x;
    const nextWidth = coordinates[index + 1].x - point.x;
    const firstWeight = 2 * nextWidth + previousWidth;
    const secondWeight = nextWidth + 2 * previousWidth;
    return (
      (firstWeight + secondWeight) /
      (firstWeight / previousSlope + secondWeight / nextSlope)
    );
  });

  return coordinates.slice(0, -1).reduce((path, point, index) => {
    const next = coordinates[index + 1];
    const width = next.x - point.x;
    if (width <= 0) {
      return `${path} L${next.x.toFixed(2)},${next.y.toFixed(2)}`;
    }
    return `${path} C${(point.x + width / 3).toFixed(2)},${(
      point.y + (tangents[index] * width) / 3
    ).toFixed(2)} ${(next.x - width / 3).toFixed(2)},${(
      next.y - (tangents[index + 1] * width) / 3
    ).toFixed(2)} ${next.x.toFixed(2)},${next.y.toFixed(2)}`;
  }, `M${coordinates[0].x.toFixed(2)},${coordinates[0].y.toFixed(2)}`);
}

function formatChartTick(value, step) {
  const decimals = Math.min(
    3,
    Math.max(0, Math.ceil(-Math.log10(Math.abs(step || 1))))
  );
  return Number(value.toFixed(decimals)).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatChartTime(timestamp, span) {
  const date = new Date(timestamp);
  if (span > 36 * 60 * 60 * 1000) {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatHoverDateTime(timestamp) {
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) return "Unknown reading time";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

function MetricChart({ definition, systems, history }) {
  const [hoverTimestamp, setHoverTimestamp] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const series = useMemo(
    () =>
      systems
        .map((system, index) => ({
          system,
          color: COLORS[index % COLORS.length],
          points: history
            .filter((reading) => reading.systemId === system.id)
            .map((reading) => ({
              timestamp: new Date(reading.collectedAt).getTime(),
              value: Number(reading.metrics?.[definition.key]),
            }))
            .filter(
              (point) =>
                Number.isFinite(point.timestamp) && Number.isFinite(point.value)
            )
            .sort((left, right) => left.timestamp - right.timestamp),
        }))
        .filter((item) => item.points.length),
    [definition.key, history, systems]
  );

  const geometry = useMemo(() => {
    const allPoints = series.flatMap((item) => item.points);
    if (!allPoints.length) return null;

    let minTime = Math.min(...allPoints.map((point) => point.timestamp));
    let maxTime = Math.max(...allPoints.map((point) => point.timestamp));
    let minValue = Math.min(...allPoints.map((point) => point.value));
    let maxValue = Math.max(...allPoints.map((point) => point.value));
    if (minTime === maxTime) {
      minTime -= 30 * 60 * 1000;
      maxTime += 30 * 60 * 1000;
    }
    const observedMinimum = minValue;
    const center = (minValue + maxValue) / 2;
    const resolution = 10 ** -(definition.decimals ?? 2);
    const minimumSpan = Math.max(resolution * 4, Math.abs(center) * 0.02);
    const balancedSpan = Math.max(maxValue - minValue, minimumSpan);
    minValue = center - balancedSpan * 0.62;
    maxValue = center + balancedSpan * 0.62;
    if (observedMinimum >= 0 && minValue < 0) minValue = 0;

    const tickStep = niceNumber((maxValue - minValue) / 4, true);
    minValue = Math.floor(minValue / tickStep) * tickStep;
    maxValue = Math.ceil(maxValue / tickStep) * tickStep;
    if (observedMinimum >= 0 && minValue < 0) minValue = 0;
    if (maxValue <= minValue) maxValue = minValue + tickStep * 4;
    const yTickCount = Math.round((maxValue - minValue) / tickStep);
    const yTickValues = Array.from(
      { length: Math.min(yTickCount, 7) + 1 },
      (_, index) => minValue + index * tickStep
    );
    if (yTickCount > 7) {
      const widerStep = niceNumber((maxValue - minValue) / 5, false);
      const firstTick = Math.ceil(minValue / widerStep) * widerStep;
      yTickValues.splice(
        0,
        yTickValues.length,
        ...Array.from(
          { length: Math.floor((maxValue - firstTick) / widerStep) + 1 },
          (_, index) => firstTick + index * widerStep
        )
      );
    }

    const left = 56;
    const right = 16;
    const top = 16;
    const bottom = 32;
    const width = 760;
    const height = 250;
    const xScale = (timestamp) =>
      left + ((timestamp - minTime) / (maxTime - minTime)) * (width - left - right);
    const yScale = (value) =>
      top + ((maxValue - value) / (maxValue - minValue)) * (height - top - bottom);

    return {
      allPoints,
      bottom,
      height,
      left,
      maxTime,
      maxValue,
      minTime,
      minValue,
      right,
      tickStep:
        yTickValues.length > 1 ? yTickValues[1] - yTickValues[0] : tickStep,
      top,
      width,
      xScale,
      yScale,
      yTickValues,
    };
  }, [definition.decimals, series]);

  const hoverDetails = useMemo(() => {
    if (!geometry || !hoverTimestamp) return [];
    return series
      .map((item) => {
        const point = item.points.reduce((nearest, candidate) =>
          Math.abs(candidate.timestamp - hoverTimestamp) <
          Math.abs(nearest.timestamp - hoverTimestamp)
            ? candidate
            : nearest
        );
        return { ...item, point };
      })
      .sort((left, right) => right.point.value - left.point.value);
  }, [geometry, hoverTimestamp, series]);

  if (!geometry) {
    return (
      <article className={styles.chartCard}>
        <div className={styles.chartHeading}>
          <div>
            <span>{definition.unit || "state"}</span>
            <h3>{definition.label}</h3>
          </div>
        </div>
        <div className={styles.emptyChart}>No readings in this time range.</div>
      </article>
    );
  }

  const yTicks = geometry.yTickValues
    .map((value) => ({ value, y: geometry.yScale(value) }))
    .reverse();
  const xTicks = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    return {
      timestamp:
        geometry.minTime + ratio * (geometry.maxTime - geometry.minTime),
      x:
        geometry.left +
        ratio * (geometry.width - geometry.left - geometry.right),
    };
  });
  const hoverX = hoverTimestamp !== null ? geometry.xScale(hoverTimestamp) : null;

  const handlePointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
    const svgX = (position / bounds.width) * geometry.width;
    const ratio = Math.max(
      0,
      Math.min(
        1,
        (svgX - geometry.left) /
          (geometry.width - geometry.left - geometry.right)
      )
    );
    const targetTimestamp =
      geometry.minTime + ratio * (geometry.maxTime - geometry.minTime);
    const snappedPoint = geometry.allPoints.reduce((nearest, candidate) =>
      Math.abs(candidate.timestamp - targetTimestamp) <
      Math.abs(nearest.timestamp - targetTimestamp)
        ? candidate
        : nearest
    );
    const cardBounds = event.currentTarget.closest("article")?.getBoundingClientRect();

    setHoverTimestamp(snappedPoint.timestamp);
    setHoverPosition({
      xRatio: position / bounds.width,
      xPercent: cardBounds
        ? ((event.clientX - cardBounds.left) / cardBounds.width) * 100
        : (position / bounds.width) * 100,
    });
  };

  const clearHover = () => {
    setHoverTimestamp(null);
    setHoverPosition(null);
  };

  return (
    <article className={styles.chartCard}>
      <div className={styles.chartHeading}>
        <div>
          <span>{definition.unit || "state"}</span>
          <h3>{definition.label}</h3>
        </div>
        <strong>{series.length} system{series.length === 1 ? "" : "s"}</strong>
      </div>
      <div className={styles.chartCanvas}>
        <svg
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          role="img"
          aria-label={`${definition.label} time series`}
          onMouseMove={handlePointer}
          onMouseLeave={clearHover}
        >
          {yTicks.map((tick) => (
            <g key={tick.y}>
              <line
                className={styles.gridLine}
                x1={geometry.left}
                x2={geometry.width - geometry.right}
                y1={tick.y}
                y2={tick.y}
              />
              <text
                className={styles.axisLabel}
                x={geometry.left - 9}
                y={tick.y + 4}
                textAnchor="end"
              >
                {formatChartTick(tick.value, geometry.tickStep)}
              </text>
            </g>
          ))}
          {xTicks.map((tick) => (
            <g key={tick.x}>
              <line
                className={styles.gridLine}
                x1={tick.x}
                x2={tick.x}
                y1={geometry.top}
                y2={geometry.height - geometry.bottom}
              />
              <text
                className={styles.axisLabel}
                x={tick.x}
                y={geometry.height - 9}
                textAnchor="middle"
              >
                {formatChartTime(
                  tick.timestamp,
                  geometry.maxTime - geometry.minTime
                )}
              </text>
            </g>
          ))}
          {series.map((item) => (
            <path
              key={item.system.id}
              className={styles.seriesLine}
              d={smoothLinePath(item.points, geometry.xScale, geometry.yScale)}
              stroke={item.color}
            />
          ))}
          {hoverX !== null && (
            <>
              <line
                className={styles.crosshair}
                x1={hoverX}
                x2={hoverX}
                y1={geometry.top}
                y2={geometry.height - geometry.bottom}
              />
              {hoverDetails.map((item) => (
                <circle
                  key={item.system.id}
                  className={styles.hoverPoint}
                  cx={geometry.xScale(item.point.timestamp)}
                  cy={geometry.yScale(item.point.value)}
                  r="4"
                  fill={item.color}
                />
              ))}
            </>
          )}
        </svg>
      </div>
      <div className={styles.chartLegend}>
        {(hoverDetails.length ? hoverDetails : series).map((item) => {
          const latestPoint = item.point || item.points[item.points.length - 1];
          return (
            <span key={item.system.id}>
              <i style={{ background: item.color }} />
              <b>{item.system.displayName}</b>
              {formatMetric(definition, latestPoint.value)}
            </span>
          );
        })}
      </div>
      {hoverTimestamp !== null && hoverPosition && (
        <div
          className={styles.chartTooltip}
          data-side={hoverPosition.xRatio > 0.56 ? "left" : "right"}
          style={{ left: `${hoverPosition.xPercent}%` }}
          role="status"
        >
          <time dateTime={new Date(hoverTimestamp).toISOString()}>
            {formatHoverDateTime(hoverTimestamp)}
          </time>
          <div className={styles.tooltipMetricName}>{definition.label}</div>
          <div className={styles.tooltipRows}>
            {hoverDetails.map((item) => (
              <div key={item.system.id} className={styles.tooltipRow}>
                <i style={{ background: item.color }} />
                <span title={item.system.displayName}>
                  {item.system.displayName}
                </span>
                <strong>{formatMetric(definition, item.point.value)}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function StatusTable({ manufacturer, systems, onView }) {
  const definitions = METRIC_DEFINITIONS[manufacturer] || [];
  const [sortConfig, setSortConfig] = useState(null);
  const sortedSystems = useMemo(() => {
    if (!sortConfig) return systems;

    const valueFor = (system) => {
      if (sortConfig.key === "system") return system.displayName;
      if (sortConfig.key === "lastCollectedAt") {
        const timestamp = new Date(system.lastCollectedAt || 0).getTime();
        return Number.isFinite(timestamp) ? timestamp : null;
      }
      const rawValue = system.metrics?.[sortConfig.key];
      if (typeof rawValue === "boolean") return rawValue ? 1 : 0;
      const value = Number(rawValue);
      return Number.isFinite(value) ? value : null;
    };

    return systems
      .map((system, index) => ({ system, index }))
      .sort((left, right) => {
        const leftValue = valueFor(left.system);
        const rightValue = valueFor(right.system);
        if (leftValue === null && rightValue === null) {
          return left.index - right.index;
        }
        if (leftValue === null) return 1;
        if (rightValue === null) return -1;

        const comparison =
          typeof leftValue === "string"
            ? leftValue.localeCompare(rightValue, undefined, {
                numeric: true,
                sensitivity: "base",
              })
            : leftValue - rightValue;
        return comparison
          ? comparison * (sortConfig.direction === "asc" ? 1 : -1)
          : left.index - right.index;
      })
      .map(({ system }) => system);
  }, [sortConfig, systems]);

  const sortBy = (key, defaultDirection = "desc") => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key
          ? current.direction === "desc"
            ? "asc"
            : "desc"
          : defaultDirection,
    }));
  };
  const ariaSort = (key) =>
    sortConfig?.key === key
      ? sortConfig.direction === "asc"
        ? "ascending"
        : "descending"
      : "none";

  if (!systems.length) return null;

  return (
    <section className={styles.tablePanel}>
      <div className={styles.panelHeading}>
        <div>
          <span>{manufacturer}</span>
          <h2>Current readings</h2>
        </div>
        <strong>{systems.length} connected</strong>
      </div>
      <div className={styles.tableScroller}>
        <table>
          <thead>
            <tr>
              <th aria-sort={ariaSort("system")}>
                <button
                  type="button"
                  className={styles.sortButton}
                  data-active={sortConfig?.key === "system"}
                  onClick={() => sortBy("system", "asc")}
                >
                  <span>System</span>
                  <i aria-hidden="true">
                    {sortConfig?.key === "system"
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </i>
                </button>
              </th>
              {definitions.map((definition) => (
                <th key={definition.key} aria-sort={ariaSort(definition.key)}>
                  <button
                    type="button"
                    className={styles.sortButton}
                    data-active={sortConfig?.key === definition.key}
                    onClick={() => sortBy(definition.key)}
                    title={`Sort ${definition.label} high to low`}
                  >
                    <span>{definition.shortLabel}</span>
                    <i aria-hidden="true">
                      {sortConfig?.key === definition.key
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </i>
                  </button>
                </th>
              ))}
              <th aria-sort={ariaSort("lastCollectedAt")}>
                <button
                  type="button"
                  className={styles.sortButton}
                  data-active={sortConfig?.key === "lastCollectedAt"}
                  onClick={() => sortBy("lastCollectedAt")}
                >
                  <span>Last reading</span>
                  <i aria-hidden="true">
                    {sortConfig?.key === "lastCollectedAt"
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </i>
                </button>
              </th>
              <th className={styles.viewColumn}>Mirror</th>
            </tr>
          </thead>
          <tbody>
            {sortedSystems.map((system) => (
              <tr key={system.id}>
                <th>
                  <span className={styles.systemName}>{system.displayName}</span>
                  <small>{system.stale ? "Delayed" : "Live"}</small>
                </th>
                {definitions.map((definition) => {
                  const state = metricState(
                    definition,
                    system.metrics?.[definition.key]
                  );
                  return (
                    <td key={definition.key}>
                      <span className={styles[state]}>
                        {formatMetric(definition, system.metrics?.[definition.key])}
                      </span>
                    </td>
                  );
                })}
                <td>
                  <span className={system.stale ? styles.staleText : ""}>
                    {relativeTime(system.lastCollectedAt)}
                  </span>
                </td>
                <td className={styles.viewColumn}>
                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() => onView(system)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MirrorPanel({ system, onControl, controlBusy, isAdmin }) {
  if (!system) {
    return (
      <section className={styles.emptyState}>
        <h2>This mirror is no longer available.</h2>
        <p>Return to the fleet tab and open the system again.</p>
      </section>
    );
  }

  const mirror = system.mirror || {};
  const hasMirror = Boolean(system.mirror);
  const definitions = METRIC_DEFINITIONS[system.manufacturer] || [];
  const mirrorMetrics = mirror.metrics || {};
  const metrics = Object.keys(mirrorMetrics).length
    ? mirrorMetrics
    : system.metrics || {};
  const serviceStatus = mirror.serviceStatus || "unknown";
  const portStatus = mirror.portStatus || "unknown";
  const snapshotAt = mostRecentTimestamp(system.lastMirrorAt, system.lastReceivedAt);
  const snapshotAge = Date.now() - new Date(snapshotAt || 0).getTime();
  const snapshotFresh =
    Number.isFinite(snapshotAge) && snapshotAge < MAGMONITOR_STALE_AFTER_MS;
  const controlLastSeenAt = system.controlAgentLastSeenAt || system.lastReceivedAt;
  const controlAgentAge =
    Date.now() - new Date(controlLastSeenAt || 0).getTime();
  const controlAgentOnline =
    Number.isFinite(controlAgentAge) && controlAgentAge < MAGMONITOR_STALE_AFTER_MS;
  const control = system.control;
  const commandPending = control?.status === "pending";
  const statusLabel =
    serviceStatus === "running"
      ? "RUNNING"
      : serviceStatus === "stopped"
      ? "STOPPED"
      : serviceStatus === "not_installed"
      ? "NOT INSTALLED"
      : "STATUS UNKNOWN";
  const statusDetail =
    mirror.detail ||
    (serviceStatus === "running"
      ? "The collector is running. Waiting for the next structured status update."
      : "No controller heartbeat has been received for this system yet.");
  const activity = [
    `${formatDateTime(snapshotAt)}  REMOTE SNAPSHOT // ${system.displayName}`,
    `${formatDateTime(snapshotAt)}  SERVICE // ${statusLabel}`,
    `${formatDateTime(snapshotAt)}  SERIAL ${system.port || "COM1"} // ${portStatus.toUpperCase()}`,
    `${formatDateTime(snapshotAt)}  PAYLOAD // ${(mirror.payloadStatus || "unknown").toUpperCase()}`,
    `${formatDateTime(mirror.lastUpdateAt || system.lastCollectedAt)}  SENSOR UPDATE // ${
      mirror.collectionCount || 0
    } COLLECTIONS OBSERVED`,
    control
      ? `${formatDateTime(control.completedAt || control.requestedAt)}  REMOTE ${control.action.toUpperCase()} // ${control.status.toUpperCase()}`
      : `${formatDateTime(controlLastSeenAt)}  REMOTE CONTROL // ${
          controlAgentOnline ? "READY" : "OFFLINE"
        }`,
  ];

  return (
    <section className={styles.mirrorPanel}>
      <div className={styles.mirrorHeader}>
        <div className={styles.mirrorBrand}>
          <img src="/magmo-logo.png" alt="" />
          <div>
            <span>MAGMO // {system.manufacturer.toUpperCase()}</span>
            <h2>{system.displayName}</h2>
            <p>REMOTE MAGNET MONITOR MIRROR</p>
          </div>
        </div>
        <div className={styles.mirrorConnection} data-online={snapshotFresh}>
          <i />
          <div>
            <strong>
              {snapshotFresh
                ? hasMirror
                  ? "MIRROR LINK ACTIVE"
                  : "TELEMETRY LINK ACTIVE"
                : "LAST KNOWN SNAPSHOT"}
            </strong>
            <span>Updated {relativeTime(snapshotAt)}</span>
          </div>
        </div>
      </div>

      <div className={styles.mirrorGrid}>
        <article
          className={styles.mirrorStatusCard}
          data-service={serviceStatus}
        >
          <div className={styles.mirrorLamp} />
          <div>
            <span>System status</span>
            <h3>{statusLabel}</h3>
            <p>{statusDetail}</p>
          </div>
        </article>
        <article className={styles.mirrorFacts}>
          <div>
            <span>Serial port</span>
            <strong>{system.port || "COM1"} // {portStatus.toUpperCase()}</strong>
          </div>
          <div>
            <span>Collector payload</span>
            <strong>{(mirror.payloadStatus || "unknown").replace(/_/g, " ")}</strong>
          </div>
          <div>
            <span>Controller build</span>
            <strong>{mirror.controllerVersion || system.agentVersion || "Not reported"}</strong>
          </div>
          <div>
            <span>Install layout</span>
            <strong>
              {mirror.localLayout === true
                ? "Local folder"
                : mirror.localLayout === false
                ? "Migration required"
                : "Not reported"}
            </strong>
          </div>
        </article>
      </div>

      <section className={styles.mirrorControlPanel} data-online={controlAgentOnline}>
        <div className={styles.mirrorControlHeading}>
          <div>
            <span>Remote service controls</span>
            <h3>Start or release the Siemens collector</h3>
          </div>
          <strong>
            {controlAgentOnline
              ? `CONTROL AGENT RECENT // ${relativeTime(controlLastSeenAt)}`
              : "NO RECENT TELEMETRY // COMMAND WILL WAIT FOR THE DEVICE STREAM"}
          </strong>
        </div>
        <div className={styles.mirrorControlBody}>
          <button
            type="button"
            className={styles.remoteStartButton}
            disabled={
              !isAdmin ||
              commandPending ||
              controlBusy
            }
            onClick={() => onControl(system, "start")}
          >
            START MONITOR
          </button>
          <button
            type="button"
            className={styles.remoteStopButton}
            disabled={
              !isAdmin ||
              commandPending ||
              controlBusy
            }
            onClick={() => onControl(system, "stop")}
          >
            STOP + RELEASE COM1
          </button>
          <div className={styles.remoteCommandStatus} data-status={control?.status || "idle"}>
            <span>{!isAdmin ? "ADMIN CONTROL REQUIRED" : "COMMAND STATUS"}</span>
            <strong>
              {controlBusy
                ? "SENDING COMMAND..."
                : commandPending
                ? `${control.action.toUpperCase()} REQUEST PENDING`
                : control?.message ||
                  (controlAgentOnline
                    ? "Ready for a remote command."
                    : "Commands are delivered by the device event stream when it connects.")}
            </strong>
          </div>
        </div>
      </section>

      <section className={styles.mirrorSensorPanel}>
        <div className={styles.mirrorSectionHeading}>
          <div>
            <span>Live sensor data</span>
            <h3>{portStatus === "waiting" ? "Waiting to get the port back" : "Latest reading"}</h3>
          </div>
          <strong>LAST UPDATE: {formatDateTime(mirror.lastUpdateAt || system.lastCollectedAt)}</strong>
        </div>
        <div className={styles.mirrorSensorGrid}>
          {definitions.map((definition) => {
            const state = metricState(definition, metrics[definition.key]);
            return (
              <div className={styles.mirrorSensorCard} key={definition.key} data-state={state}>
                <span>{definition.shortLabel}</span>
                <strong>{formatMetric(definition, metrics[definition.key])}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.mirrorTerminal}>
        <div className={styles.mirrorSectionHeading}>
          <div>
            <span>Remote activity</span>
            <h3>Structured status output</h3>
          </div>
          <strong>READ ONLY // AUTO-REFRESH 15 SEC</strong>
        </div>
        <pre>{activity.join("\n")}</pre>
      </section>
    </section>
  );
}

function buildNotificationItems(systems) {
  const notificationMetricKeys = new Set([
    "helium_level1",
    "helium_level2",
    "HeLvl",
    "magnet_psi",
    "HePress",
  ]);
  return systems
    .flatMap((system) => {
      const items = [];
      (METRIC_DEFINITIONS[system.manufacturer] || []).forEach((definition) => {
        if (!notificationMetricKeys.has(definition.key)) return;
        const rawValue = system.metrics?.[definition.key];
        const state = metricState(definition, rawValue);
        if (state !== "critical") return;
        items.push({
          id: `${system.id}-${definition.key}`,
          severity: state,
          system: system.displayName,
          message: `${definition.label} is ${formatMetric(definition, rawValue)}.`,
        });
      });
      return items;
    })
    .sort((left, right) => left.system.localeCompare(right.system));
}

export default function Magmonitor() {
  const { authUser } = useAuth();
  const [dashboard, setDashboard] = useState({
    systems: [],
    history: [],
    generatedAt: null,
  });
  const [range, setRange] = useState("12h");
  const [manufacturer, setManufacturer] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [selectionMessage, setSelectionMessage] = useState("");
  const [openMirrorIds, setOpenMirrorIds] = useState([]);
  const [activePanel, setActivePanel] = useState("fleet");
  const [controlBusyId, setControlBusyId] = useState("");

  const loadData = useCallback(
    async ({ ids = appliedIds, nextRange = range, quiet = false } = {}) => {
      if (!authUser) return;
      quiet ? setRefreshing(true) : setLoading(true);
      setError("");
      try {
        const currentUser = firebase.auth().currentUser;
        const token = await currentUser?.getIdToken();
        const params = new URLSearchParams({ range: nextRange });
        if (ids.length) params.set("systems", ids.join(","));
        const response = await fetch(`/api/magmonitor/data?${params}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.error || "Magmonitor data could not be loaded.");
        }
        const resolvedIds = payload.selectedSystemIds || ids;
        setDashboard(payload);
        setAppliedIds(resolvedIds);
        setSelectedIds((current) => (current.length ? current : resolvedIds));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [appliedIds, authUser, range]
  );

  const pollDashboard = useCallback(
    (quiet) =>
      loadData({
        ids: quiet ? appliedIds : [],
        nextRange: range,
        quiet,
      }),
    [appliedIds, loadData, range]
  );

  useSingleTabPolling({
    enabled: Boolean(authUser),
    intervalMs: activePanel === "fleet" ? FLEET_REFRESH_MS : SYSTEM_REFRESH_MS,
    leaseKey: "magmonitor-dashboard-v2",
    poll: pollDashboard,
  });

  const visibleSystems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return dashboard.systems.filter(
      (system) =>
        (manufacturer === "All" || system.manufacturer === manufacturer) &&
        (!normalizedSearch ||
          system.displayName.toLowerCase().includes(normalizedSearch))
    );
  }, [dashboard.systems, manufacturer, search]);

  const selectedSystems = useMemo(() => {
    const systemById = new Map(
      dashboard.systems.map((system) => [system.id, system])
    );
    return appliedIds.map((id) => systemById.get(id)).filter(Boolean);
  }, [appliedIds, dashboard.systems]);

  const systemById = useMemo(
    () => new Map(dashboard.systems.map((system) => [system.id, system])),
    [dashboard.systems]
  );

  const notificationItems = useMemo(
    () => buildNotificationItems(visibleSystems),
    [visibleSystems]
  );

  const chartGroups = useMemo(
    () =>
      Object.values(MANUFACTURERS)
        .map((vendor) => {
          const vendorSystems = selectedSystems.filter(
            (system) => system.manufacturer === vendor
          );
          return {
            manufacturer: vendor,
            systems: vendorSystems,
            definitions: (METRIC_DEFINITIONS[vendor] || []).filter(
              (definition) =>
                definition.kind !== "boolean" &&
                dashboard.history.some(
                  (reading) =>
                    reading.manufacturer === vendor &&
                    Number.isFinite(Number(reading.metrics?.[definition.key]))
                )
            ),
          };
        })
        .filter((group) => group.systems.length),
    [dashboard.history, selectedSystems]
  );

  const toggleSystem = (systemId) => {
    setSelectionMessage("");
    setSelectedIds((current) => {
      if (current.includes(systemId)) {
        return current.filter((id) => id !== systemId);
      }
      if (current.length >= MAX_CHART_SYSTEMS) {
        setSelectionMessage(
          `Charts are limited to ${MAX_CHART_SYSTEMS} systems so they stay readable.`
        );
        return current;
      }
      return [...current, systemId];
    });
  };

  const chooseVisible = () => {
    const ids = visibleSystems
      .slice(0, MAX_CHART_SYSTEMS)
      .map((system) => system.id);
    setSelectedIds(ids);
    setSelectionMessage(
      visibleSystems.length > MAX_CHART_SYSTEMS
        ? `Showing the ${MAX_CHART_SYSTEMS} most recent matching systems.`
        : ""
    );
  };

  const applySelection = () => {
    if (!selectedIds.length) {
      setSelectionMessage("Choose at least one system for the charts.");
      return;
    }
    setAppliedIds(selectedIds);
    loadData({ ids: selectedIds, nextRange: range });
  };

  const changeRange = (nextRange) => {
    setRange(nextRange);
    loadData({ ids: appliedIds, nextRange, quiet: true });
  };

  const openMirror = (system) => {
    setOpenMirrorIds((current) =>
      current.includes(system.id) ? current : [...current, system.id]
    );
    setActivePanel(system.id);
  };

  const closeMirror = (systemId, event) => {
    event.stopPropagation();
    setOpenMirrorIds((current) => {
      const remaining = current.filter((id) => id !== systemId);
      if (activePanel === systemId) {
        setActivePanel(remaining[remaining.length - 1] || "fleet");
      }
      return remaining;
    });
  };

  const sendControl = async (system, action) => {
    if (!authUser?.isAdmin || !system) return;
    const isStop = action === "stop";
    const confirmed = window.confirm(
      isStop
        ? `Stop ${system.displayName} and release ${system.port || "COM1"}?\n\nThe local control service will remain online so you can start the monitor again from MAGMO.`
        : `Start the Siemens monitor on ${system.displayName}?\n\nThe collector will reclaim ${system.port || "COM1"} and resume scheduled readings.`
    );
    if (!confirmed) return;

    setControlBusyId(system.id);
    setError("");
    try {
      const currentUser = firebase.auth().currentUser;
      const token = await currentUser?.getIdToken();
      const response = await fetch("/api/magmonitor/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ systemId: system.id, action }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "The remote command could not be queued.");
      }
      setDashboard((current) => ({
        ...current,
        systems: current.systems.map((item) =>
          item.id === system.id ? { ...item, control: payload.control } : item
        ),
      }));
    } catch (controlError) {
      setError(controlError.message);
    } finally {
      setControlBusyId("");
    }
  };

  const mostRecent = dashboard.systems[0];
  const liveCount = dashboard.systems.filter((system) => !system.stale).length;

  return (
    <div className={styles.page}>
      <Head>
        <title>Magmonitor | MAGMO</title>
        <meta
          name="description"
          content="MRI magnet telemetry and helium monitoring in MAGMO."
        />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandBlock}>
            <Link
              href="/Warehousedb/WarehouseSelect"
              className={styles.backLink}
              aria-label="Back to Warehouse DB"
            >
              ←
            </Link>
            <img src="/magmo-logo.png" alt="" className={styles.logo} />
            <div>
              <p>MAGMO TELEMETRY</p>
              <h1>Magmonitor</h1>
            </div>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.liveStatus} data-live={liveCount > 0}>
              <span />
              {liveCount > 0
                ? `${liveCount} system${liveCount === 1 ? "" : "s"} reporting`
                : "Waiting for data"}
            </div>
            <button
              type="button"
              className={styles.refreshButton}
              onClick={() => loadData({ quiet: true })}
              disabled={refreshing}
            >
              <span className={refreshing ? styles.spinning : ""}>
                <RefreshIcon />
              </span>
              {refreshing ? "Refreshing" : "Refresh"}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div>
            <p className={styles.overline}>MRI fleet health</p>
            <h2>Clean signals. Faster decisions.</h2>
            <p>
              The same Siemens and GE magnet readings used by the Grafana
              dashboard, arranged for quick fleet review and focused
              troubleshooting.
            </p>
          </div>
          <div className={styles.heroMetric}>
            <span>Latest collection</span>
            <strong>{formatDateTime(mostRecent?.lastCollectedAt)}</strong>
            <small>{mostRecent?.displayName || "No systems received yet"}</small>
          </div>
        </section>

        <section className={styles.filterPanel}>
          <div className={styles.filterTitle}>
            <FilterIcon />
            <div>
              <strong>Focus the dashboard</strong>
              <span>Sort the fleet, then chart one system or compare several.</span>
            </div>
          </div>
          <div className={styles.filters}>
            <label>
              <span>Manufacturer</span>
              <select
                value={manufacturer}
                onChange={(event) => setManufacturer(event.target.value)}
              >
                <option>All</option>
                <option value={MANUFACTURERS.SIEMENS}>Siemens</option>
                <option value={MANUFACTURERS.GE}>GE</option>
              </select>
            </label>
            <label>
              <span>Find system</span>
              <input
                type="search"
                placeholder="Search by system name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <div className={styles.machinePicker}>
              <span>Trend systems</span>
              <details>
                <summary>
                  {selectedIds.length === 1
                    ? "1 selected · single"
                    : selectedIds.length > 1
                    ? `${selectedIds.length} selected · compare`
                    : "Choose systems"}
                </summary>
                <div className={styles.machineMenu}>
                  <div className={styles.quickSelect}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIds(
                          visibleSystems[0] ? [visibleSystems[0].id] : []
                        )
                      }
                    >
                      Top system only
                    </button>
                    <button type="button" onClick={chooseVisible}>
                      Select up to {MAX_CHART_SYSTEMS}
                    </button>
                    <button type="button" onClick={() => setSelectedIds([])}>
                      Clear
                    </button>
                  </div>
                  <div className={styles.machineList}>
                    {visibleSystems.map((system) => (
                      <label key={system.id}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(system.id)}
                          onChange={() => toggleSystem(system.id)}
                        />
                        <span>
                          <b>{system.displayName}</b>
                          <small>{system.manufacturer}</small>
                        </span>
                      </label>
                    ))}
                    {!visibleSystems.length && <p>No matching systems.</p>}
                  </div>
                </div>
              </details>
            </div>
            <button
              type="button"
              className={styles.applyButton}
              onClick={applySelection}
            >
              Apply to charts
            </button>
          </div>
          <div className={styles.rangeRow}>
            <span>Time range</span>
            <div>
              {RANGE_OPTIONS.map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={range === value ? styles.activeRange : ""}
                  onClick={() => changeRange(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <small>
              {selectionMessage ||
                `Updated ${relativeTime(dashboard.generatedAt)} · Auto-refreshes every minute`}
            </small>
          </div>
        </section>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <nav className={styles.workspaceTabs} aria-label="Magmonitor views">
          <div
            className={activePanel === "fleet" ? styles.workspaceTabActive : styles.workspaceTab}
          >
            <button
              type="button"
              className={styles.workspaceTabLabel}
              onClick={() => setActivePanel("fleet")}
            >
              Fleet dashboard
            </button>
          </div>
          {openMirrorIds.map((systemId) => {
            const system = systemById.get(systemId);
            return (
              <div
                key={systemId}
                className={activePanel === systemId ? styles.workspaceTabActive : styles.workspaceTab}
              >
                <button
                  type="button"
                  className={styles.workspaceTabLabel}
                  onClick={() => setActivePanel(systemId)}
                >
                  {system?.displayName || "System mirror"}
                </button>
                <button
                  type="button"
                  className={styles.tabClose}
                  aria-label={`Close ${system?.displayName || "system"} mirror`}
                  onClick={(event) => closeMirror(systemId, event)}
                >
                  x
                </button>
              </div>
            );
          })}
        </nav>

        {loading ? (
          <section className={styles.loadingPanel}>
            <span />
            <h2>Loading Magmonitor</h2>
            <p>Collecting current readings and chart history…</p>
          </section>
        ) : activePanel !== "fleet" ? (
          <MirrorPanel
            system={systemById.get(activePanel)}
            onControl={sendControl}
            controlBusy={controlBusyId === activePanel}
            isAdmin={Boolean(authUser?.isAdmin)}
          />
        ) : (
          <>
            {!dashboard.systems.length && (
              <section className={styles.emptyState}>
                <img src="/magmo-logo.png" alt="" />
                <h2>Magmonitor is ready for its first reading.</h2>
                <p>
                  Install or update a monitor agent with MAGMO delivery enabled.
                  New systems will appear here automatically.
                </p>
              </section>
            )}

            <StatusTable
              manufacturer={MANUFACTURERS.SIEMENS}
              onView={openMirror}
              systems={visibleSystems.filter(
                (system) => system.manufacturer === MANUFACTURERS.SIEMENS
              )}
            />
            <StatusTable
              manufacturer={MANUFACTURERS.GE}
              onView={openMirror}
              systems={visibleSystems.filter(
                (system) => system.manufacturer === MANUFACTURERS.GE
              )}
            />

            {!!dashboard.systems.length && (
              <section className={styles.attentionPanel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span>Red alerts only</span>
                    <h2>Notification queue</h2>
                  </div>
                  <strong>{notificationItems.length}</strong>
                </div>
                {notificationItems.length ? (
                  <div className={styles.attentionList}>
                    {notificationItems.slice(0, 24).map((item) => (
                      <div
                        key={item.id}
                        className={styles[item.severity]}
                      >
                        <i />
                        <b>{item.system}</b>
                        <span>{item.message}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.allClear}>
                    No visible systems have a red helium or pressure reading.
                  </p>
                )}
                <small className={styles.thresholdNote}>
                  Notifications are limited to red helium and pressure readings;
                  yellow table bands remain visual warnings only.
                </small>
              </section>
            )}

            {chartGroups.map((group) => (
              <section
                className={styles.chartSection}
                key={group.manufacturer}
              >
                <div className={styles.sectionHeading}>
                  <div>
                    <span>{group.manufacturer}</span>
                    <h2>Trend charts</h2>
                  </div>
                  <p>
                    {group.systems.map((system) => system.displayName).join(" · ")}
                  </p>
                </div>
                <div className={styles.chartGrid}>
                  {group.definitions.map((definition) => (
                    <MetricChart
                      key={definition.key}
                      definition={definition}
                      systems={group.systems}
                      history={dashboard.history}
                    />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
