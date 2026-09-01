const assert = require("node:assert/strict");
const test = require("node:test");

const limiter = require("../lib/inventory/scanCallbackRateLimit.cjs");

test("scanner callbacks are bounded per source and recover after the window", () => {
  const nowMs = Date.parse("2026-09-01T20:00:00.000Z");
  const request = {
    headers: { "x-forwarded-for": "203.0.113.88, 10.0.0.1" },
    socket: { remoteAddress: "127.0.0.1" },
  };
  const options = { namespace: "callback-limit-test", nowMs };
  for (let index = 0; index < limiter.PER_SOURCE_LIMIT; index += 1) {
    assert.equal(limiter.scanCallbackRetryAfter(request, options), 0);
  }
  assert.equal(limiter.scanCallbackRetryAfter(request, options), 60);

  assert.equal(
    limiter.scanCallbackRetryAfter(
      { headers: { "x-forwarded-for": "203.0.113.89" } },
      options
    ),
    0
  );
  assert.equal(
    limiter.scanCallbackRetryAfter(request, {
      ...options,
      nowMs: nowMs + limiter.WINDOW_MS + 1,
    }),
    0
  );
});
