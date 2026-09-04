const assert = require("node:assert/strict");
const test = require("node:test");

const {
  createScanResolutionQueue,
} = require("../lib/inventory/scanResolutionQueue.cjs");

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function flushAsyncWork() {
  return new Promise((resolve) => setImmediate(resolve));
}

test("resolution queue caps active work while accepting a fast burst", async () => {
  const gates = [];
  const started = [];
  const succeeded = [];
  let active = 0;
  let peakActive = 0;
  const queue = createScanResolutionQueue({
    concurrency: 2,
    worker: async (entry) => {
      const gate = deferred();
      gates.push(gate);
      started.push(entry.eventId);
      active += 1;
      peakActive = Math.max(peakActive, active);
      await gate.promise;
      active -= 1;
      return entry.eventId;
    },
    onSucceeded: (entry) => succeeded.push(entry.eventId),
  });

  for (let index = 1; index <= 6; index += 1) {
    assert.equal(queue.enqueue({ eventId: `event-${index}` }), true);
  }
  assert.deepEqual(started, ["event-1", "event-2"]);
  assert.deepEqual(queue.stats(), {
    queued: 4,
    active: 2,
    retrying: 0,
    outstanding: 6,
    accepted: 6,
    closed: false,
  });

  while (succeeded.length < 6) {
    const unresolved = gates.find((gate) => !gate.released);
    assert.ok(unresolved, "an active job should be waiting for release");
    unresolved.released = true;
    unresolved.resolve();
    await flushAsyncWork();
  }
  await queue.whenIdle();

  assert.equal(peakActive, 2);
  assert.deepEqual(started, [
    "event-1",
    "event-2",
    "event-3",
    "event-4",
    "event-5",
    "event-6",
  ]);
  assert.deepEqual(succeeded, started);
  assert.equal(queue.stats().outstanding, 0);
});

test("resolution queue retries transient failures without admitting duplicate event IDs", async () => {
  const scheduled = [];
  const attempts = [];
  const succeeded = [];
  const failed = [];
  const queue = createScanResolutionQueue({
    concurrency: 1,
    retryDelaysMs: [25, 75],
    schedule: (callback, delay) => {
      const timer = { callback, delay };
      scheduled.push(timer);
      return timer;
    },
    cancelSchedule: () => {},
    worker: async (entry, context) => {
      attempts.push({ eventId: entry.eventId, attempt: context.attempt });
      if (context.attempt < 3) {
        const error = new Error("temporary outage");
        error.status = 503;
        throw error;
      }
      return { resolved: true };
    },
    onSucceeded: (entry, result, context) =>
      succeeded.push({ eventId: entry.eventId, result, attempt: context.attempt }),
    onFailed: (entry, error) => failed.push({ eventId: entry.eventId, error }),
  });

  assert.equal(queue.enqueue({ eventId: "same-event" }), true);
  assert.equal(queue.enqueue({ eventId: "same-event" }), false);
  await flushAsyncWork();
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].delay, 25);
  assert.equal(queue.stats().retrying, 1);

  scheduled.shift().callback();
  await flushAsyncWork();
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].delay, 75);

  scheduled.shift().callback();
  await queue.whenIdle();

  assert.deepEqual(attempts, [
    { eventId: "same-event", attempt: 1 },
    { eventId: "same-event", attempt: 2 },
    { eventId: "same-event", attempt: 3 },
  ]);
  assert.deepEqual(succeeded, [
    {
      eventId: "same-event",
      result: { resolved: true },
      attempt: 3,
    },
  ]);
  assert.deepEqual(failed, []);
  assert.equal(queue.stats().accepted, 1);
});

test("resolution queue does not retry permanent failures", async () => {
  const attempts = [];
  const failures = [];
  const queue = createScanResolutionQueue({
    retryDelaysMs: [0, 0, 0],
    worker: async (_entry, context) => {
      attempts.push(context.attempt);
      const error = new Error("invalid scan");
      error.status = 400;
      throw error;
    },
    onFailed: (_entry, error, context) =>
      failures.push({ message: error.message, attempt: context.attempt }),
  });

  queue.enqueue({ eventId: "invalid-event" });
  await queue.whenIdle();

  assert.deepEqual(attempts, [1]);
  assert.deepEqual(failures, [{ message: "invalid scan", attempt: 1 }]);
});
