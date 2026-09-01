"use strict";

const WINDOW_MS = 60_000;
// One physical session can legitimately contain up to 250 events. Leave room
// for idempotent callback retries while still bounding unauthenticated reads.
const PER_SOURCE_LIMIT = 300;
const PER_INSTANCE_LIMIT = 2_000;
const MAX_SOURCE_BUCKETS = 2_000;
const STATE_KEY = "__magmoInventoryScanCallbackRateLimits";
const states = global[STATE_KEY] || (global[STATE_KEY] = new Map());

function cleanSource(value) {
  const source = String(value == null ? "" : value).trim();
  return source && source.length <= 180 ? source : "unknown";
}

function requestSource(req) {
  const forwarded = String(req?.headers?.["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  return cleanSource(forwarded || req?.socket?.remoteAddress);
}

function retryAfterSeconds(startedAt, nowMs) {
  return Math.max(1, Math.ceil((startedAt + WINDOW_MS - nowMs) / 1000));
}

function scanCallbackRetryAfter(req, { namespace = "inventory-scan", nowMs = Date.now() } = {}) {
  const safeNamespace = String(namespace || "inventory-scan").slice(0, 80);
  let state = states.get(safeNamespace);
  if (!state) {
    state = {
      instance: { startedAt: Number(nowMs), count: 0 },
      sources: new Map(),
    };
    states.set(safeNamespace, state);
  }

  const now = Number(nowMs);
  if (!Number.isFinite(now)) return 60;
  if (now - state.instance.startedAt >= WINDOW_MS || now < state.instance.startedAt) {
    state.instance = { startedAt: now, count: 0 };
    state.sources.clear();
  }
  if (state.instance.count >= PER_INSTANCE_LIMIT) {
    return retryAfterSeconds(state.instance.startedAt, now);
  }

  const sourceKey = requestSource(req);
  let source = state.sources.get(sourceKey);
  if (!source || now - source.startedAt >= WINDOW_MS || now < source.startedAt) {
    source = { startedAt: now, count: 0 };
  }
  if (source.count >= PER_SOURCE_LIMIT) {
    return retryAfterSeconds(source.startedAt, now);
  }

  source.count += 1;
  state.instance.count += 1;
  state.sources.set(sourceKey, source);
  if (state.sources.size > MAX_SOURCE_BUCKETS) {
    for (const [key, bucket] of state.sources) {
      if (now - bucket.startedAt >= WINDOW_MS || now < bucket.startedAt) {
        state.sources.delete(key);
      }
    }
  }
  return 0;
}

module.exports = {
  PER_INSTANCE_LIMIT,
  PER_SOURCE_LIMIT,
  WINDOW_MS,
  requestSource,
  scanCallbackRetryAfter,
};
