"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const igor = { id: "U_IGOR", name: "Igor Savchenko" };
const stanley = { id: "U_STANLEY", name: "Stanley Wu" };
const julian = { id: "U_JULIAN", name: "Julian Ortiz" };

let inference;
test.before(async () => {
  inference = await import("../lib/ai/inferWorkOrderAssignment.js");
});

test("future remote-access planning does not start remote work", () => {
  const result = inference.inferDeterministicRemoteWork(
    false,
    "We need to add remote access next week before the appointment."
  );

  assert.equal(result.changed, false);
  assert.equal(result.active, false);
  assert.equal(result.workMode, "unspecified");
});

test("an onsite dispatch after failed remote work switches to in-person", () => {
  const result = inference.inferDeterministicRemoteWork(
    true,
    "Could not resolve this remotely, so we are sending a technician onsite."
  );

  assert.equal(result.changed, true);
  assert.equal(result.active, false);
  assert.equal(result.explicitEnd, true);
  assert.equal(result.workMode, "in_person");
});

test("person-specific onsite evidence identifies a non-BlueFolder field worker", () => {
  const messages = [
    "ETA: 25 minutes. I arrived onsite and replaced the failed power supply.",
    "ETA to site is 4:36pm",
    "Finished QA and brought the bad core part back to AIS.",
  ];
  for (const text of messages) {
    assert.equal(
      inference.responsibilityModeForCandidate(igor, {
        sender: igor,
        text,
      }),
      "physical",
      text
    );
  }
});

test("recovery transcripts keep first-person physical evidence attached to its author", () => {
  const text = [
    "1786201000.0 | Stanley Wu: I am troubleshooting remotely in PuTTY.",
    "1786202000.0 | Igor Savchenko: I replaced the board onsite and brought the bad core back to AIS.",
  ].join("\n");
  assert.equal(
    inference.responsibilityModeForCandidate(igor, {
      sender: null,
      text,
      recoveryMode: true,
    }),
    "physical"
  );
  assert.equal(
    inference.responsibilityModeForCandidate(stanley, {
      sender: null,
      text,
      recoveryMode: true,
    }),
    "remote"
  );
});

test("ETA questions and courier movement are not personal onsite evidence", () => {
  assert.equal(
    inference.responsibilityModeForCandidate(igor, {
      sender: julian,
      text: "Igor Savchenko, what is your ETA?",
    }),
    ""
  );
  assert.equal(
    inference.responsibilityModeForCandidate(igor, {
      sender: igor,
      text: "A package delivery is on the way via Uber Courier.",
    }),
    ""
  );
  assert.equal(
    inference.responsibilityModeForCandidate(igor, {
      sender: igor,
      text: "The Uber courier ETA to site is 4:36pm",
    }),
    ""
  );
  assert.equal(
    inference.responsibilityModeForCandidate(igor, {
      sender: igor,
      text: "Do we have an ETA to site, 4:36pm?",
    }),
    ""
  );
  assert.equal(
    inference.responsibilityModeForCandidate(igor, {
      sender: igor,
      text: "I am checking the invoice and will hand it off to accounting.",
    }),
    "",
    "administrative checking is not remote work"
  );
});

test("a sender does not inherit work explicitly performed by another named person", () => {
  const cases = [
    {
      text: "Joshua Yoon arrived onsite and started testing the scanner.",
      worker: { id: "U_JOSHUA", name: "Joshua Yoon" },
      mode: "physical",
    },
    {
      text: "I am dispatching Julian Ortiz to the site.",
      worker: julian,
      mode: "physical",
    },
    {
      text: "Stanley Wu installed VNC remotely.",
      worker: stanley,
      mode: "remote",
    },
  ];

  for (const { text, worker, mode } of cases) {
    assert.equal(
      inference.responsibilityModeForCandidate(igor, {
        sender: igor,
        text,
      }),
      "",
      `sender must not inherit: ${text}`
    );
    assert.equal(
      inference.responsibilityModeForCandidate(worker, {
        sender: igor,
        text,
      }),
      mode,
      `named worker should retain evidence: ${text}`
    );
  }
});

test("explicit takeover makes the new worker current and preserves the prior helper", () => {
  const message = {
    sender: stanley,
    text: "I took over the remote troubleshooting and will handle the rest.",
  };
  const result = inference.reconcileResponsibilityState({
    currentAssignees: [{ ...igor, workMode: "remote" }],
    protectedAssignees: [],
    currentParticipants: [],
    requestedAssignees: [
      { ...igor, workMode: "remote" },
      { ...stanley, workMode: "remote" },
    ],
    requestedParticipants: [],
    candidates: [igor, stanley],
    message,
    useRequestedAssignees: true,
  });

  assert.deepEqual(result.assignees.map((entry) => entry.name), ["Stanley Wu"]);
  assert.deepEqual(result.participants.map((entry) => entry.name), [
    "Igor Savchenko",
  ]);
  assert.equal(result.assignees[0].workMode, "remote");
  assert.equal(result.deterministicAssignmentChanged, true);
});

test("an explicit remote takeover never removes the protected BlueFolder dispatch", () => {
  const result = inference.reconcileResponsibilityState({
    currentAssignees: [
      { ...julian, workMode: "physical" },
      { ...igor, workMode: "remote" },
    ],
    protectedAssignees: [{ ...julian, workMode: "physical" }],
    currentParticipants: [],
    candidates: [julian, igor, stanley],
    message: {
      sender: stanley,
      text: "Stanley Wu took over the remote troubleshooting and will handle the rest.",
    },
  });

  assert.deepEqual(
    result.assignees.map((entry) => entry.name).sort(),
    ["Julian Ortiz", "Stanley Wu"]
  );
  assert.deepEqual(result.participants.map((entry) => entry.name), [
    "Igor Savchenko",
  ]);
});

test("a disconnected remote helper becomes a prior contributor", () => {
  const disconnected = inference.reconcileResponsibilityState({
    currentAssignees: [{ ...igor, workMode: "remote" }],
    currentParticipants: [],
    candidates: [igor, stanley],
    message: {
      sender: igor,
      text: "I lost connection and handed it off.",
    },
  });

  assert.deepEqual(disconnected.assignees, []);
  assert.deepEqual(disconnected.participants.map((entry) => entry.name), [
    "Igor Savchenko",
  ]);
  assert.deepEqual(disconnected.endedPeople.map((entry) => entry.name), [
    "Igor Savchenko",
  ]);

  const takenOver = inference.reconcileResponsibilityState({
    currentAssignees: disconnected.assignees,
    currentParticipants: disconnected.participants,
    candidates: [igor, stanley],
    message: {
      sender: stanley,
      text: "I am logged in remotely and troubleshooting now.",
    },
  });
  assert.deepEqual(takenOver.assignees.map((entry) => entry.name), [
    "Stanley Wu",
  ]);
  assert.deepEqual(takenOver.participants.map((entry) => entry.name), [
    "Igor Savchenko",
  ]);

  assert.deepEqual(
    inference.endedRemoteResponsibilityCandidates(
      {
        sender: igor,
        text: "I was disconnected, but I am reconnecting now.",
      },
      [igor]
    ),
    [],
    "an active reconnect attempt keeps current responsibility"
  );
});
