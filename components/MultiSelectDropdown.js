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
  enableAdd = false,
  addPlaceholder = "Add new option",
  addButtonLabel = "Add",
  onAddOption,
  addDisabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draftOption, setDraftOption] = useState("");
  const menuRef = useRef(null);

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

  const requestDelete = (value, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!enableDelete || typeof onDeleteOption !== "function") return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${value}" from the list?`
    );
    if (confirmed) {
      onDeleteOption(value);
    }
  };

  const handleAdd = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!enableAdd || typeof onAddOption !== "function") return;
    const normalized = normalizeValue(draftOption);
    if (!normalized) return;

    try {
      const result = await onAddOption(normalized);
      if (result !== false) {
        setDraftOption("");
      }
    } catch (error) {
      console.error("Failed to add option:", error);
    }
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
    if (!open) {
      setQuery("");
      setDraftOption("");
    }
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
          {enableAdd && (
            <div className={styles.addRow}>
              <input
                className={styles.addInput}
                placeholder={addPlaceholder}
                value={draftOption}
                onChange={(event) => setDraftOption(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleAdd(event);
                  }
                }}
                disabled={disabled || addDisabled}
              />
              <button
                type="button"
                className={styles.addButton}
                onClick={handleAdd}
                disabled={
                  disabled ||
                  addDisabled ||
                  !normalizeValue(draftOption)
                }
              >
                {addButtonLabel}
              </button>
            </div>
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
                  onClick={() => toggleOption(option)}
                >
                  <div className={styles.optionMain}>
                    <input
                      type="checkbox"
                      className={styles.optionCheckbox}
                      checked={checked}
                      readOnly
                    />
                    <span className={styles.optionLabel}>{option}</span>
                  </div>
                  {enableDelete && typeof onDeleteOption === "function" ? (
                    <button
                      type="button"
                      className={styles.deleteButton}
                      aria-label={`Delete ${option}`}
                      title={`Delete ${option}`}
                      onClick={(event) => requestDelete(option, event)}
                    >
                      x
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
