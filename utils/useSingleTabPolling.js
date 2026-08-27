import { useEffect, useRef } from "react";

const DEFAULT_LEASE_MS = 75_000;

function makeOwnerId(key) {
  const storedKey = `magmo:poll-owner:${key}`;
  try {
    const existing = window.sessionStorage.getItem(storedKey);
    if (existing) return existing;
    const created =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(storedKey, created);
    return created;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function readLease(storageKey) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Runs one initial load in every mounted tab, then permits only one visible tab
 * to perform recurring polling. The lease is deliberately short-lived so a
 * newly visible tab takes over quickly after the leader closes or is hidden.
 */
export function useSingleTabPolling({
  enabled = true,
  intervalMs = 60_000,
  leaseKey,
  poll,
}) {
  const pollRef = useRef(poll);
  pollRef.current = poll;

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !leaseKey) return undefined;

    const storageKey = `magmo:poll-lease:${leaseKey}`;
    const ownerId = makeOwnerId(leaseKey);
    const leaseMs = Math.max(DEFAULT_LEASE_MS, intervalMs + 15_000);
    let closed = false;
    let running = false;
    let initialized = false;

    const release = () => {
      const current = readLease(storageKey);
      if (current?.ownerId !== ownerId) return;
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // Storage can be unavailable in private browsing. Polling still works.
      }
    };

    const claim = () => {
      if (document.visibilityState === "hidden") {
        release();
        return false;
      }
      const now = Date.now();
      const current = readLease(storageKey);
      if (
        current?.ownerId &&
        current.ownerId !== ownerId &&
        Number(current.expiresAt || 0) > now
      ) {
        return false;
      }
      try {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({ ownerId, expiresAt: now + leaseMs })
        );
        return readLease(storageKey)?.ownerId === ownerId;
      } catch {
        // If storage is blocked, visibility gating still prevents hidden-tab polling.
        return true;
      }
    };

    const run = async ({ initial = false } = {}) => {
      if (closed || running || document.visibilityState === "hidden") return;
      const firstRun = initial || !initialized;
      if (!firstRun && !claim()) return;
      if (firstRun) claim();
      running = true;
      try {
        await pollRef.current(Boolean(!firstRun));
        initialized = true;
      } finally {
        running = false;
      }
    };

    void run({ initial: true });
    const timer = window.setInterval(() => void run(), intervalMs);
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") release();
      else void run();
    };
    const onStorage = (event) => {
      if (event.key === storageKey && !event.newValue) void run();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("storage", onStorage);
    window.addEventListener("pagehide", release);

    return () => {
      closed = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pagehide", release);
      release();
    };
  }, [enabled, intervalMs, leaseKey]);
}
