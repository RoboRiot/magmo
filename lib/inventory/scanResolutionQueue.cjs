"use strict";

const DEFAULT_RETRY_DELAYS_MS = Object.freeze([250, 750, 1500]);

function normalizeConcurrency(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? Math.max(1, Math.min(8, parsed)) : 3;
}

function createScanResolutionQueue({
  worker,
  keyOf = (entry) => entry?.eventId,
  concurrency = 3,
  retryDelaysMs = DEFAULT_RETRY_DELAYS_MS,
  shouldRetry = (error) => {
    const status = Number(error?.status);
    return !status || status === 408 || status === 429 || status >= 500;
  },
  onQueued = () => {},
  onStarted = () => {},
  onSucceeded = () => {},
  onFailed = () => {},
  onStats = () => {},
  schedule = (callback, delay) => setTimeout(callback, delay),
  cancelSchedule = (timer) => clearTimeout(timer),
} = {}) {
  if (typeof worker !== "function") throw new TypeError("worker must be a function.");
  const maxActive = normalizeConcurrency(concurrency);
  const delays = (Array.isArray(retryDelaysMs) ? retryDelaysMs : [])
    .map(Number)
    .filter((value) => Number.isFinite(value) && value >= 0)
    .slice(0, 8);
  const pending = [];
  const known = new Set();
  const retryTimers = new Set();
  const idleWaiters = new Set();
  let active = 0;
  let closed = false;

  const stats = () => ({
    queued: pending.length,
    active,
    retrying: retryTimers.size,
    outstanding: pending.length + active + retryTimers.size,
    accepted: known.size,
    closed,
  });

  const publish = () => {
    const current = stats();
    onStats(current);
    if (current.outstanding === 0) {
      for (const resolve of idleWaiters) resolve(current);
      idleWaiters.clear();
    }
  };

  const retryLater = (entry, attempt, error, pump) => {
    const delay = delays[attempt - 1];
    let timer = null;
    timer = schedule(() => {
      retryTimers.delete(timer);
      if (!closed) {
        pending.push({ entry, attempt });
        onQueued(entry, { attempt, retry: true, error });
      }
      publish();
      pump();
    }, delay);
    retryTimers.add(timer);
  };

  const run = async (job, pump) => {
    active += 1;
    publish();
    onStarted(job.entry, { attempt: job.attempt + 1 });
    try {
      const result = await worker(job.entry, { attempt: job.attempt + 1 });
      if (!closed) onSucceeded(job.entry, result, { attempt: job.attempt + 1 });
    } catch (error) {
      const nextAttempt = job.attempt + 1;
      if (!closed && nextAttempt <= delays.length && shouldRetry(error, job.entry)) {
        retryLater(job.entry, nextAttempt, error, pump);
      } else if (!closed) {
        onFailed(job.entry, error, { attempt: nextAttempt });
      }
    } finally {
      active -= 1;
      publish();
      pump();
    }
  };

  const pump = () => {
    if (closed) return;
    while (active < maxActive && pending.length) {
      const job = pending.shift();
      void run(job, pump);
    }
    publish();
  };

  return Object.freeze({
    enqueue(entry) {
      if (closed) return false;
      const key = String(keyOf(entry) || "").trim();
      if (!key || known.has(key)) return false;
      known.add(key);
      pending.push({ entry, attempt: 0 });
      onQueued(entry, { attempt: 0, retry: false });
      publish();
      pump();
      return true;
    },
    stats,
    whenIdle() {
      const current = stats();
      if (current.outstanding === 0) return Promise.resolve(current);
      return new Promise((resolve) => idleWaiters.add(resolve));
    },
    close() {
      if (closed) return;
      closed = true;
      pending.length = 0;
      for (const timer of retryTimers) cancelSchedule(timer);
      retryTimers.clear();
      publish();
    },
  });
}

module.exports = {
  DEFAULT_RETRY_DELAYS_MS,
  createScanResolutionQueue,
  normalizeConcurrency,
};
