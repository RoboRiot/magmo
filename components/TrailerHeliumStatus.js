import Link from "next/link";
import {
  formatHeliumReadingTime,
  getTrailerHeliumSnapshot,
} from "../utils/trailerHelium";
import styles from "./TrailerHeliumStatus.module.css";

function Metric({ label, value, accent = false }) {
  return (
    <div className={`${styles.metric} ${accent ? styles.metricAccent : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function TrailerHeliumStatus({ telemetry, compact = false }) {
  const snapshot = getTrailerHeliumSnapshot(telemetry);
  if (!snapshot) return null;

  return (
    <section
      className={`${styles.panel} ${compact ? styles.panelCompact : ""}`}
      aria-label="Helium and magnet telemetry"
    >
      <div className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.icon} aria-hidden="true">
            He
          </span>
          <div>
            <div className={styles.eyebrow}>Live magnet health</div>
            <h3>{compact ? "Helium status" : "Helium & magnet monitoring"}</h3>
          </div>
        </div>
        <span
          className={`${styles.status} ${
            snapshot.isStale ? styles.statusStale : styles.statusLive
          }`}
        >
          <i aria-hidden="true" />
          {snapshot.isStale ? "Last reported" : "Live"}
        </span>
      </div>

      <div className={styles.metricsPrimary}>
        <Metric label="Helium" value={snapshot.heliumDisplay} accent />
        <Metric label="Magnet PSI" value={snapshot.magnetPsiDisplay} />
        <Metric label="Coldhead" value={snapshot.coldheadDisplay} />
      </div>

      {!compact && (
        <>
          <div className={styles.metricsSecondary}>
            <Metric label="Compressor" value={snapshot.compressorDisplay} />
            <Metric label="Shield" value={snapshot.shieldDisplay} />
            <Metric label="Magnet power" value={snapshot.magnetPowerDisplay} />
          </div>
          <div className={styles.footer}>
            <span>
              {snapshot.systemName}
              {snapshot.manufacturer ? ` · ${snapshot.manufacturer}` : ""}
              {` · Updated ${formatHeliumReadingTime(snapshot.collectedAt)}`}
            </span>
            <Link
              href={
                snapshot.systemId
                  ? `/Magmonitor?systems=${encodeURIComponent(snapshot.systemId)}`
                  : "/Magmonitor"
              }
            >
              Open Magmonitor
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
