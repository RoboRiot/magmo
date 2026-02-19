import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MultiSelectDropdown.module.css";

function normalizeValue(value) {
  if (value == null) return "";
  return String(value).trim();
}

export default function MultiSelectDropdown({
  label,
  placeholder = "Select Option",
  options = [],
  selected = [],
  onChange,
  searchable = true,
  disabled = false,
  enableDelete = false,
  onDeleteOption,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef(null);
  const holdTimerRef = useRef(null);
  const holdTriggeredRef = useRef(false);

  const selectedSet = useMemo(
    () => new Set((selected || []).map(normalizeValue).filter(Boolean)),
    [selected]
  );

  const filteredOptions = useMemo(() => {
    const search = query.trim().toLowerCase();
    const normalized = (options || [])
      .map(normalizeValue)
      .filter(Boolean);
    if (!search) return normalized;
    return normalized.filter((option) =>
      option.toLowerCase().includes(search)
    );
  }, [options, query]);

  const toggleOption = (value) => {
    const normalized = normalizeValue(value);
    if (!normalized || typeof onChange !== "function") return;
    const next = new Set(selectedSet);
    if (next.has(normalized)) {
      next.delete(normalized);
    } else {
      next.add(normalized);
    }
    onChange(Array.from(next));
  };

  const startHold = (value) => {
    if (!enableDelete || typeof onDeleteOption !== "function") return;
    holdTriggeredRef.current = false;
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      holdTriggeredRef.current = true;
      const confirmed = window.confirm(`Delete "${value}" from the list?`);
      if (confirmed) {
        onDeleteOption(value);
      }
    }, 650);
  };

  const cancelHold = () => {
    clearTimeout(holdTimerRef.current);
  };

  const handleOptionClick = (value) => {
    if (holdTriggeredRef.current) {
      holdTriggeredRef.current = false;
      return;
    }
    toggleOption(value);
  };

  const displayText = useMemo(() => {
    if (!selectedSet.size) return placeholder;
    const values = Array.from(selectedSet);
    if (values.length === 1) return values[0];
    return `Multi (${values.length})`;
  }, [placeholder, selectedSet]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span className={styles.toggleText}>{displayText}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className={styles.menu}>
          {searchable && (
            <input
              className={styles.search}
              placeholder="Search..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}
          <div className={styles.list}>
            {!filteredOptions.length && (
              <div className={styles.emptyState}>No results</div>
            )}
            {filteredOptions.map((option) => {
              const checked = selectedSet.has(option);
              return (
                <div
                  key={option}
                  className={styles.option}
                  onMouseDown={() => startHold(option)}
                  onMouseUp={cancelHold}
                  onMouseLeave={cancelHold}
                  onTouchStart={() => startHold(option)}
                  onTouchEnd={cancelHold}
                  onClick={() => handleOptionClick(option)}
                >
                  <input
                    type="checkbox"
                    className={styles.optionCheckbox}
                    checked={checked}
                    readOnly
                  />
                  <span className={styles.optionLabel}>{option}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
