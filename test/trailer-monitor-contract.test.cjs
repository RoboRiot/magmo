const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildTrailerByNumber,
  dateFromSlackTs,
  extractSlackThreadLinks,
  hasTrailerMovementSignal,
  slackDigitsToTs,
  trailerNumberFromChannel,
} = require("../lib/ops/trailerMonitorContract.cjs");
const trailerChannels = require("../lib/ops/trailerSlackChannels.cjs");

test("trailerNumberFromChannel recognizes current and previous trailer channel names", () => {
  assert.equal(trailerNumberFromChannel({ name: "34mr-23xew-smi-eureka" }), 34);
  assert.equal(trailerNumberFromChannel({ name: "01mr-23x-carsontahoe" }), 1);
  assert.equal(
    trailerNumberFromChannel({
      name: "renamed-channel",
      previous_names: ["mobilemr18-old-site"],
    }),
    18
  );
  assert.equal(trailerNumberFromChannel({ name: "dispatch" }), null);
});

test("Slack message links resolve to their thread timestamp", () => {
  const links = extractSlackThreadLinks(
    "See https://ais.slack.com/archives/C07EPLKV9JT/p1786501000123456?thread_ts=1786501000.654321&cid=C07EPLKV9JT"
  );
  assert.deepEqual(links, [
    {
      channel: "C07EPLKV9JT",
      threadTs: "1786501000.654321",
      url: "https://ais.slack.com/archives/C07EPLKV9JT/p1786501000123456?thread_ts=1786501000.654321&cid=C07EPLKV9JT",
    },
  ]);
  assert.equal(slackDigitsToTs("1786501000123456"), "1786501000.123456");
});

test("movement signal filter keeps arrivals, departures, and channel rename evidence", () => {
  assert.equal(hasTrailerMovementSignal("Trailer arrived and is onsite."), true);
  assert.equal(hasTrailerMovementSignal("Pickup completed; it is in transit."), true);
  assert.equal(hasTrailerMovementSignal("has renamed the channel"), true);
  assert.equal(hasTrailerMovementSignal("The magnet is ramping normally."), false);
});

test("Slack timestamps are converted to the Pacific local calendar date", () => {
  const seconds = Date.parse("2026-08-12T06:30:00.000Z") / 1000;
  assert.equal(dateFromSlackTs(String(seconds)), "2026-08-11");
});

test("reviewed channel registry has valid unique Slack IDs and matching trailer names", () => {
  assert.equal(new Set(trailerChannels.map((channel) => channel.id)).size, trailerChannels.length);
  trailerChannels.forEach((channel) => {
    assert.match(channel.id, /^C[A-Z0-9]+$/);
    assert.equal(trailerNumberFromChannel(channel), channel.trailerNumber);
  });
});

test("canonical AIS[number] trailer wins over legacy duplicate documents", () => {
  const byNumber = buildTrailerByNumber([
    {
      id: "AIS34 - HDxt 23x",
      name: "AIS34 - HDxt 23x",
      number: "34",
      currentClientId: "AIS17182",
    },
    {
      id: "AIS34",
      name: "AIS34 - HDxt 23x",
      number: "34",
      currentClientId: "AIS17182",
      transitStatus: "transit",
    },
    { id: "AIS34 - 23x", name: "AIS34", number: "34" },
  ]);
  assert.equal(byNumber.get(34).id, "AIS34");
});
