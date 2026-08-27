import React from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.3A8.5 8.5 0 0 1 8.7 4a8.5 8.5 0 1 0 11.3 11.3Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, savingTheme, themeError, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <div className={styles.positioner}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${nextTheme} theme`}
        className={styles.toggle}
        onClick={toggleTheme}
        title={
          themeError ||
          `Using ${isDark ? "dark" : "light"} theme. Switch to ${nextTheme}.`
        }
      >
        <span className={styles.label}>{isDark ? "Dark" : "Light"}</span>
        <span className={styles.track} aria-hidden="true">
          <span className={`${styles.icon} ${styles.sun}`}>
            <SunIcon />
          </span>
          <span className={`${styles.icon} ${styles.moon}`}>
            <MoonIcon />
          </span>
          <span
            className={`${styles.thumb} ${isDark ? styles.thumbDark : ""}`}
          />
        </span>
        <span className={styles.srOnly} aria-live="polite">
          {savingTheme
            ? "Saving theme"
            : themeError
            ? themeError
            : `${isDark ? "Dark" : "Light"} theme active`}
        </span>
      </button>
    </div>
  );
}
