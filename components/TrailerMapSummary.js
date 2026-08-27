import {
  buildTrailerMapDescription,
  getTrailerMapLocation,
  getTrailerTransitDestination,
  getTrailerTransitOrigin,
  isTrailerInTransit,
} from "../utils/trailerUsMap";
import {
  getTrailerContractSnapshot,
  UNKNOWN_TRAILER_VALUE,
} from "../utils/trailerContract";
import TrailerHeliumStatus from "./TrailerHeliumStatus";
import styles from "./TrailerUsMap.module.css";

function getTrailerLabel(trailer) {
  return String(
    trailer?.name || trailer?.mondayBoardName || trailer?.id || "Trailer",
  ).trim();
}

function getTrailerSystem(trailer) {
  const description = buildTrailerMapDescription(trailer);
  return description === "Mobile imaging trailer"
    ? UNKNOWN_TRAILER_VALUE
    : description;
}

function formatTransitDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return UNKNOWN_TRAILER_VALUE;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))));
}

export default function TrailerMapSummary({
  trailer,
  eyebrow = "Trailer snapshot",
  compact = false,
  onClose,
  onMoreDetails,
}) {
  if (!trailer) return null;

  const contract = getTrailerContractSnapshot(trailer);
  const inTransit = isTrailerInTransit(trailer);
  const titleId = `trailer-map-summary-${String(
    trailer.persistId || trailer.id || "trailer",
  ).replace(/[^A-Za-z0-9_-]/g, "-")}`;

  return (
    <div
      className={`${styles.summaryBackdrop} ${
        compact ? styles.summaryBackdropCompact : ""
      }`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        className={`${styles.summaryDialog} ${
          compact ? styles.summaryDialogWide : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose?.();
        }}
      >
        <div className={styles.summaryHeader}>
          <div>
            <div className={styles.summaryEyebrow}>{eyebrow}</div>
            <h4 id={titleId} className={styles.summaryTitle}>
              {getTrailerLabel(trailer)}
            </h4>
          </div>
          <button
            type="button"
            className={styles.summaryClose}
            aria-label="Close trailer summary"
            onClick={onClose}
            autoFocus
          >
            &times;
          </button>
        </div>

        <dl
          className={`${styles.summaryGrid} ${
            compact ? styles.summaryGridCompact : ""
          }`}
        >
          <div className={styles.summaryField}>
            <dt>Trailer name</dt>
            <dd>{getTrailerLabel(trailer)}</dd>
          </div>
          <div className={styles.summaryField}>
            <dt>System</dt>
            <dd>{getTrailerSystem(trailer)}</dd>
          </div>
          <div className={styles.summaryField}>
            <dt>{inTransit ? "Route" : "Location"}</dt>
            <dd>{getTrailerMapLocation(trailer) || UNKNOWN_TRAILER_VALUE}</dd>
          </div>
          {inTransit && (
            <>
              <div className={styles.summaryField}>
                <dt>Transit status</dt>
                <dd>In transit</dd>
              </div>
              <div className={styles.summaryField}>
                <dt>Departed from</dt>
                <dd>{getTrailerTransitOrigin(trailer) || UNKNOWN_TRAILER_VALUE}</dd>
              </div>
              <div className={styles.summaryField}>
                <dt>Destination</dt>
                <dd>
                  {getTrailerTransitDestination(trailer) || UNKNOWN_TRAILER_VALUE}
                </dd>
              </div>
              <div className={styles.summaryField}>
                <dt>Transit departure</dt>
                <dd>{formatTransitDate(trailer.transitDepartureDate)}</dd>
              </div>
              <div className={styles.summaryField}>
                <dt>Expected arrival</dt>
                <dd>{formatTransitDate(trailer.transitExpectedArrivalDate)}</dd>
              </div>
            </>
          )}
          <div className={styles.summaryField}>
            <dt>Arrival date</dt>
            <dd>{contract.arrivalDate}</dd>
          </div>
          <div className={styles.summaryField}>
            <dt>Departure date</dt>
            <dd>{contract.departureDate}</dd>
          </div>
          <div className={styles.summaryField}>
            <dt>Days remaining</dt>
            <dd>{contract.daysRemaining}</dd>
          </div>
          <div className={styles.summaryField}>
            <dt>Total contract length</dt>
            <dd>{contract.totalContractLength}</dd>
          </div>
        </dl>

        <TrailerHeliumStatus
          telemetry={trailer.heliumTelemetry}
          compact
        />

        <div className={styles.summaryActions}>
          <button
            type="button"
            className={styles.summarySecondaryButton}
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className={styles.summaryPrimaryButton}
            onClick={() =>
              onMoreDetails?.(trailer.persistId || trailer.id)
            }
          >
            More Details
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
