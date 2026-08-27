"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildOnsiteSessionBounds,
  buildOnsiteSessionDetails,
  isAuthoredOnsiteContext,
  isEvidenceCaughtUp,
  isImmediateAuthoredDeparture,
  resolveAuthoredRetrospectiveArrival,
  shouldCloseAuthoredOnsiteSession,
  shouldRenderTimedAssignmentHistory,
} = require("../lib/ops/calendarSessionEvidence.cjs");

test("WO #10193 late-reported arrival uses the stated 6 AM time", () => {
  const arrivalReportedAt = new Date("2026-08-26T16:17:41.656Z");
  const departureAt = new Date("2026-08-26T16:48:45.620Z");
  const arrivalText = [
    "I arrived on site at 6am.",
    "Trailer has been setup. Leveling is good.",
    "Was able to do a test scan.",
    "Going to stay for a bit longer to make sure they scan their first patient successfully.",
  ].join(" ");
  const effectiveArrival = resolveAuthoredRetrospectiveArrival(
    arrivalText,
    arrivalReportedAt,
    "America/Los_Angeles"
  );

  assert.ok(effectiveArrival);
  assert.equal(effectiveArrival.toISOString(), "2026-08-26T13:00:00.000Z");
  assert.equal(
    shouldCloseAuthoredOnsiteSession("Heading out now", true),
    true
  );

  const details = buildOnsiteSessionDetails(
    [
      {
        at: arrivalReportedAt,
        effectiveArrival,
        phase: "arrived",
        message: {
          id: "arrival",
          slackTs: "1787761061.656549",
          text: arrivalText,
        },
      },
      {
        at: departureAt,
        phase: "ended",
        message: {
          id: "departure",
          slackTs: "1787762925.620299",
          text: "Heading out now",
        },
      },
    ],
    { cutoff: departureAt }
  );

  assert.equal(details.status, "determined");
  assert.equal(details.arrival.at, "2026-08-26T13:00:00.000Z");
  assert.equal(details.arrival.reportedAt, arrivalReportedAt.toISOString());
  assert.equal(details.arrival.basis, "authored_retrospective_arrival");
  assert.equal(details.departure.at, departureAt.toISOString());
  assert.equal(details.service.durationMinutes, 228);
  assert.equal(details.travel.durationMinutes, null);
  assert.equal(details.travel.basis, "undetermined");
  assert.equal(details.evidence[0].at, arrivalReportedAt.toISOString());
  assert.equal(details.evidence[0].effectiveAt, effectiveArrival.toISOString());
});

test("ordinary arrival wording keeps the Slack message timestamp", () => {
  const postedAt = new Date("2026-08-26T16:17:41.656Z");
  assert.equal(
    resolveAuthoredRetrospectiveArrival(
      "Arrived at site",
      postedAt,
      "America/Los_Angeles"
    ),
    null
  );

  const bounds = buildOnsiteSessionBounds([
    { at: postedAt, phase: "arrived" },
    { at: new Date("2026-08-26T16:48:45.620Z"), phase: "ended" },
  ]);
  assert.equal(bounds.start.toISOString(), postedAt.toISOString());
});

test("a post shortly after midnight can report the previous evening's arrival", () => {
  const reportedAt = new Date("2026-08-26T08:15:00.000Z");
  const effectiveArrival = resolveAuthoredRetrospectiveArrival(
    "I arrived on site at 11:30pm",
    reportedAt,
    "America/Los_Angeles"
  );
  assert.ok(effectiveArrival);
  assert.equal(effectiveArrival.toISOString(), "2026-08-26T06:30:00.000Z");
});

test("retrospective arrivals reject third parties, plans, questions, ambiguity, and stale times", () => {
  const postedAt = new Date("2026-08-26T16:17:41.656Z");
  const rejected = [
    "Josh arrived on site at 6am",
    "The trailer arrived at 6am",
    "I will arrive on site at 6am",
    "Did I arrive on site at 6am?",
    "I did not arrive on site at 6am",
    "I arrived on site and the scan was at 6am",
    "I arrived on site at 6",
  ];
  for (const phrase of rejected) {
    assert.equal(
      resolveAuthoredRetrospectiveArrival(
        phrase,
        postedAt,
        "America/Los_Angeles"
      ),
      null,
      phrase
    );
  }

  assert.equal(
    resolveAuthoredRetrospectiveArrival(
      "I arrived on site at 6am",
      new Date("2026-08-27T08:30:00.000Z"),
      "America/Los_Angeles"
    ),
    null
  );
});

test("WO #10431 ETA and departure produce a 65-minute inferred onsite session", () => {
  const etaMessageAt = new Date("2026-08-20T22:54:28.034Z");
  const statedArrivalAt = new Date("2026-08-20T23:36:00.000Z");
  const departureAt = new Date("2026-08-21T00:41:20.997Z");

  assert.equal(
    shouldCloseAuthoredOnsiteSession("Going to head out now", true),
    true
  );

  const bounds = buildOnsiteSessionBounds([
    {
      at: etaMessageAt,
      phase: "traveling",
      estimatedArrival: statedArrivalAt,
    },
    {
      at: departureAt,
      phase: "ended",
    },
  ]);

  assert.equal(bounds.bounded, true);
  assert.equal(bounds.start.toISOString(), statedArrivalAt.toISOString());
  assert.equal(bounds.end.toISOString(), departureAt.toISOString());
  assert.equal(bounds.end.getTime() - bounds.start.getTime(), 3_920_997);
  assert.equal(Math.floor((bounds.end - bounds.start) / 60_000), 65);

  // Slack-derived bounds are evidence for an inferred calendar event. They do
  // not manufacture an official/manual time-entry record.
  assert.deepEqual(Object.keys(bounds).sort(), [
    "bounded",
    "end",
    "marker",
    "start",
  ]);
  assert.equal(Object.hasOwn(bounds, "timeEntryId"), false);
  assert.equal(Object.hasOwn(bounds, "source"), false);
});

test("common immediate first-person departure wording is recognized", () => {
  const phrases = [
    "Going to head out now",
    "I'm heading out now.",
    "We are leaving the site.",
    "I am about to leave now.",
    "On my way out.",
    "We're headed back to the warehouse.",
    "I am wrapping up and leaving.",
    "Calling it a day here.",
    "I'm going home now.",
    "Gonna head out.",
    "Finished up here.",
    "I just departed the facility.",
  ];

  for (const phrase of phrases) {
    assert.equal(isImmediateAuthoredDeparture(phrase), true, phrase);
    assert.equal(
      shouldCloseAuthoredOnsiteSession(phrase, true),
      true,
      phrase
    );
  }
});

test("departure wording closes only an already established onsite session", () => {
  assert.equal(
    shouldCloseAuthoredOnsiteSession("Going to head out now", false),
    false
  );
  assert.equal(
    shouldCloseAuthoredOnsiteSession("Going to head out now", true),
    true
  );
});

test("an explicit arrival overrides an earlier ETA estimate", () => {
  const etaMessageAt = new Date("2026-08-20T22:54:28.034Z");
  const statedArrivalAt = new Date("2026-08-20T23:36:00.000Z");
  const explicitArrivalAt = new Date("2026-08-20T23:42:00.000Z");
  const departureAt = new Date("2026-08-21T00:41:20.997Z");

  const bounds = buildOnsiteSessionBounds([
    {
      at: etaMessageAt,
      phase: "traveling",
      estimatedArrival: statedArrivalAt,
    },
    { at: explicitArrivalAt, phase: "arrived" },
    { at: departureAt, phase: "ended" },
  ]);

  assert.equal(bounds.bounded, true);
  assert.equal(bounds.start.toISOString(), explicitArrivalAt.toISOString());
  assert.equal(bounds.end.toISOString(), departureAt.toISOString());
});

test("onsite departure remains recognizable when the final update discusses VNC", () => {
  const finalPlacentiaUpdate = [
    "The remote computer is setup and is able to VNC into both CT consoles.",
    "The current plan is to continue monitoring the system remotely if it goes down again.",
    "Going to head out now",
  ].join(" ");

  assert.equal(isImmediateAuthoredDeparture(finalPlacentiaUpdate), true);
  assert.equal(
    shouldCloseAuthoredOnsiteSession(finalPlacentiaUpdate, true),
    true
  );
});

test("questions, negation, future plans, couriers, and third parties do not close the reporter's session", () => {
  const phrases = [
    "Am I clear to leave?",
    "Should I head out now?",
    "I am not leaving yet.",
    "I will leave tomorrow after the replacement arrives.",
    "The courier is leaving the site now.",
    "The electrician left the site.",
    "Josh is heading out now.",
    "The customer left the office.",
    "I think Josh is heading out now.",
    "My package is headed out now.",
    "They are leaving the site now.",
  ];

  for (const phrase of phrases) {
    assert.equal(isImmediateAuthoredDeparture(phrase), false, phrase);
    assert.equal(
      shouldCloseAuthoredOnsiteSession(phrase, true),
      false,
      phrase
    );
  }
});

test("ETA, arrival, and physical context remain attached to the author", () => {
  const authored = [
    ["ETA to site is 4:36pm", "traveling"],
    [
      "The table is still having issues with undocking while going up. I'm going to head over and take a look at it. ETA is 10:48am",
      "traveling",
    ],
    ["Arrived at site", "arrived"],
    ["Replaced the board", "working"],
    ["Joshua and I arrived at site", "arrived"],
  ];
  const attributedElsewhere = [
    ["What is the tech ETA?", "traveling"],
    ["Courier ETA 4:30", "traveling"],
    ["Joshua's ETA is 4:30", "traveling"],
    ["Joshua is going to head over. ETA is 10:48am", "traveling"],
    ["Tech arrived on site", "arrived"],
    ["Joshua arrived at site", "arrived"],
    ["Joshua replaced the board", "working"],
    ["They arrived at site", "arrived"],
    ["The scanner arrived at site", "arrived"],
    ["The board was replaced", "working"],
    ["I think the board was replaced", "working"],
  ];

  for (const [text, phase] of authored) {
    assert.equal(isAuthoredOnsiteContext(text, phase), true, text);
  }
  for (const [text, phase] of attributedElsewhere) {
    assert.equal(isAuthoredOnsiteContext(text, phase), false, text);
  }
});

test("WO #10472 travel intent and departure produce Igor's 153-minute onsite session", () => {
  const etaMessageAt = new Date("2026-08-25T16:50:28.529Z");
  const statedArrivalAt = new Date("2026-08-25T17:48:00.000Z");
  const departureAt = new Date("2026-08-25T20:21:25.068Z");
  const etaText = [
    "The table is still having issues with undocking while going up.",
    "I'm going to head over and take a look at it.",
    "ETA is 10:48am",
  ].join(" ");

  assert.equal(isAuthoredOnsiteContext(etaText, "traveling"), true);
  assert.equal(
    shouldCloseAuthoredOnsiteSession("Heading out now", true),
    true
  );

  const details = buildOnsiteSessionDetails(
    [
      {
        at: etaMessageAt,
        phase: "traveling",
        estimatedArrival: statedArrivalAt,
        message: { id: "eta", slackTs: "1787676628.529609", text: etaText },
      },
      {
        at: departureAt,
        phase: "ended",
        message: {
          id: "departure",
          slackTs: "1787689285.068749",
          text: "Performed a successful QA scan. Heading out now",
        },
      },
    ],
    { cutoff: departureAt }
  );

  assert.equal(details.status, "determined");
  assert.equal(details.travel.durationMinutes, 57);
  assert.equal(details.service.durationMinutes, 153);
  assert.equal(details.arrival.basis, "authored_eta_estimate");
  assert.equal(details.departure.basis, "authored_departure");
});

test("administrative reconciliation history does not invent a 45-minute work block", () => {
  assert.equal(
    shouldRenderTimedAssignmentHistory({
      source: "dispatch_backlog_correction",
      triggerSlackTs: "1787689297.048419",
    }),
    false
  );
  assert.equal(
    shouldRenderTimedAssignmentHistory({
      source: "historical_inactivity_repair",
      triggerSlackTs: "1787689297.048419",
    }),
    false
  );
  assert.equal(
    shouldRenderTimedAssignmentHistory({
      source: "ai",
      triggerSlackTs: "1787689297.048419",
    }),
    true
  );
});

test("photo-only activity does not invent an arrival or departure", () => {
  for (const text of ["", "   ", "[image]", "Uploaded 3 photos"]) {
    assert.equal(isImmediateAuthoredDeparture(text), false, JSON.stringify(text));
    assert.equal(
      shouldCloseAuthoredOnsiteSession(text, true),
      false,
      JSON.stringify(text)
    );
  }
});

test("physical work confirms the worker but cannot invent the session start", () => {
  const workingAt = new Date("2026-08-20T23:42:00.000Z");
  const departureAt = new Date("2026-08-21T00:41:20.997Z");
  const rows = [
    {
      at: workingAt,
      phase: "working",
      message: {
        id: "work",
        slackTs: "1787269320.000000",
        text: "Replaced the board and ran QA.",
      },
    },
    {
      at: departureAt,
      phase: "ended",
      message: {
        id: "leave",
        slackTs: "1787272880.000000",
        text: "Heading out now.",
      },
    },
  ];
  const bounds = buildOnsiteSessionBounds(rows);
  const details = buildOnsiteSessionDetails(rows, { cutoff: departureAt });
  assert.equal(bounds.start, null);
  assert.equal(bounds.bounded, false);
  assert.equal(details.confirmedPhysical, true);
  assert.equal(details.status, "undetermined");
  assert.equal(details.service.durationMinutes, null);
});

test("an open ETA session is provisional until departure and becomes stale after 18 hours", () => {
  const travelAt = new Date("2026-08-20T20:00:00.000Z");
  const arrivalAt = new Date("2026-08-20T21:00:00.000Z");
  const rows = [
    {
      at: travelAt,
      phase: "traveling",
      estimatedArrival: arrivalAt,
      message: {
        id: "eta",
        slackTs: "1787256000.000000",
        text: "My ETA is 60 minutes.",
      },
    },
  ];
  const ongoing = buildOnsiteSessionDetails(rows, {
    cutoff: new Date("2026-08-20T22:30:00.000Z"),
  });
  assert.equal(ongoing.status, "ongoing");
  assert.equal(ongoing.service.serviceMinutesSoFar, 90);
  assert.equal(ongoing.service.provisional, true);

  const stale = buildOnsiteSessionDetails(rows, {
    cutoff: new Date("2026-08-21T16:00:01.000Z"),
  });
  assert.equal(stale.status, "undetermined");
  assert.match(stale.reason, /exceeds 18 hours/i);
});

test("evidence freshness supports terminal work orders without requiring the command message", () => {
  assert.equal(isEvidenceCaughtUp("", ""), true);
  assert.equal(isEvidenceCaughtUp("", "1787272879.999999"), false);
  assert.equal(
    isEvidenceCaughtUp("1787272879.999999", "1787272879.999999"),
    true
  );
  assert.equal(
    isEvidenceCaughtUp("1787272880.000001", "1787272879.999999"),
    true
  );
  assert.equal(
    isEvidenceCaughtUp("1787272879.999998", "1787272879.999999"),
    false
  );
});
