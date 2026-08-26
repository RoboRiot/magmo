import React from "react";
import { trailerProvenanceDisplay } from "../utils/trailerProvenance";
import styles from "./TrailerProvenanceBadge.module.css";

export default function TrailerProvenanceBadge({ provenance }) {
  const display = trailerProvenanceDisplay(provenance);
  const toneClass =
    display.sourceType === "ai"
      ? styles.ai
      : display.sourceType === "manual"
        ? styles.manual
        : styles.legacy;

  return (
    <span
      className={`${styles.badge} ${toneClass}`}
      title={display.title || display.label}
      aria-label={`Location update source: ${display.label}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      {display.label}
    </span>
  );
}
