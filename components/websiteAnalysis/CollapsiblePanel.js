import { useId, useState } from "react";
import styles from "../../styles/WebsiteAnalysis.module.css";

export default function CollapsiblePanel({
  title,
  description = "",
  eyebrow = "",
  meta = null,
  children,
  className = "",
  defaultOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className={`${styles.panel} ${className}`.trim()}>
      <div
        className={`${styles.panelHeading} ${styles.collapsibleHeading} ${
          isOpen ? styles.collapsibleHeadingOpen : ""
        }`}
      >
        <div className={styles.collapsibleTitle}>
          {eyebrow ? <p className={styles.sectionEyebrow}>{eyebrow}</p> : null}
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        <div className={styles.panelActions}>
          {meta ? <span className={styles.panelMeta}>{meta}</span> : null}
          <button
            type="button"
            className={styles.collapseButton}
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls={contentId}
            aria-label={`${isOpen ? "Minimize" : "Expand"} ${title}`}
            title={isOpen ? "Minimize section" : "Expand section"}
          >
            <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
          </button>
        </div>
      </div>
      {isOpen ? (
        <div className={styles.collapsibleBody} id={contentId}>
          {children}
        </div>
      ) : null}
    </section>
  );
}
