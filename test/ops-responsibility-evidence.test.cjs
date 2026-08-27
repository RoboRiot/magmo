"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  responsibilityEvidenceForUser,
} = require("../lib/ops/responsibilityEvidence.cjs");

const julie = {
  id: "U_JULIE",
  email: "julie@example.com",
  name: "Julie Tang",
};
const joshua = {
  id: "U_JOSHUA",
  email: "joshua@example.com",
  name: "Joshua Yoon",
};
const stanley = {
  id: "U_STANLEY",
  email: "stanley@example.com",
  name: "Stanley Wu",
};
const igor = {
  id: "U_IGOR",
  email: "igor@example.com",
  name: "Igor Savchenko",
};
const julian = {
  id: "U_JULIAN",
  email: "julian@example.com",
  name: "Julian Ortiz",
};

function workOrder(overrides = {}) {
  return {
    workflowStatus: "active",
    assignees: [],
    bluefolderAssignees: [],
    oversightManagers: [],
    assignmentHistory: [],
    ...overrides,
  };
}

test("terminal work never appears as a current Ops-General assignment", () => {
  for (const workflowStatus of [
    "service_complete",
    "done",
    "closed",
    "completed",
  ]) {
    const evidence = responsibilityEvidenceForUser(
      workOrder({
        workflowStatus,
        assignees: [{ ...julie, workMode: "physical" }],
        bluefolderAssignees: [julie],
      }),
      julie,
      { hasRecordedTime: true }
    );
    assert.equal(evidence, null, workflowStatus);
  }
});

test("the exact BlueFolder Assigned To engineer is authoritative", () => {
  const evidence = responsibilityEvidenceForUser(
    workOrder({
      bluefolderAssignments: [
        {
          assignees: [julie],
          startDate: "2026-08-12T08:00:00",
          endDate: "2026-08-12T17:00:00",
          isComplete: false,
        },
      ],
      oversightManagers: [joshua],
    }),
    julie,
    { now: new Date("2026-08-12T12:00:00-07:00") }
  );
  assert.deepEqual(evidence, {
    kind: "physical",
    source: "bluefolder_dispatch",
    label: "BlueFolder dispatch",
  });
  assert.equal(
    responsibilityEvidenceForUser(
      workOrder({ oversightManagers: [julie] }),
      julie
    ),
    null
  );
});

test("legacy or expired BlueFolder assignment rows are not current dispatch", () => {
  const now = new Date("2026-08-12T12:00:00-07:00");
  assert.equal(
    responsibilityEvidenceForUser(
      workOrder({ bluefolderAssignees: [julie] }),
      julie,
      { now }
    ),
    null,
    "legacy broad array"
  );
  assert.equal(
    responsibilityEvidenceForUser(
      workOrder({
        bluefolderAssignments: [
          {
            assignees: [julie],
            startDate: "2026-05-12T08:00:00",
            endDate: "2026-05-12T17:00:00",
            isComplete: false,
            isCurrent: true,
          },
        ],
      }),
      julie,
      { now }
    ),
    null,
    "stale listener flag is defensively recomputed"
  );
  assert.equal(
    responsibilityEvidenceForUser(
      workOrder({
        bluefolderAssignments: [
          {
            assignees: [julie],
            startDate: "2026-08-12T08:00:00",
            isComplete: true,
          },
        ],
      }),
      julie,
      { now }
    ),
    null,
    "completed assignment"
  );
});

test("future and undated incomplete BlueFolder dispatches remain current", () => {
  const now = new Date("2026-08-12T12:00:00-07:00");
  for (const assignment of [
    { assignees: [julie], startDate: "2026-08-13T08:00:00", isComplete: false },
    { assignees: [julie], startDate: "", endDate: "", isComplete: false },
  ]) {
    assert.equal(
      responsibilityEvidenceForUser(
        workOrder({ bluefolderAssignments: [assignment] }),
        julie,
        { now }
      )?.source,
      "bluefolder_dispatch"
    );
  }
});

test("stale assignee mode without supporting evidence is excluded", () => {
  assert.equal(
    responsibilityEvidenceForUser(
      workOrder({ assignees: [{ ...julie, workMode: "remote" }] }),
      julie
    ),
    null
  );
});

test("advice and administrative discussion are participation, not assignment", () => {
  const evidence = responsibilityEvidenceForUser(
    workOrder({
      assignees: [julie],
      assignmentHistory: [
        {
          source: "ai",
          assignees: [julie],
          reason: "AI claimed this was an assignment.",
          triggerSender: "Julie Tang",
          triggerMessage:
            "The serial number is in the earlier photo. Please ask Stanley to check it.",
        },
      ],
    }),
    julie
  );
  assert.equal(evidence, null);
});

test("mass mentions do not inherit another engineer's onsite evidence", () => {
  const order = workOrder({
    assignees: [julie, joshua],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [julie, joshua],
        triggerSender: "Dispatcher",
        triggerMessage:
          "@Julie Tang @Joshua Yoon FYI. Joshua Yoon arrived onsite and started testing the scanner.",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(order, julie), null);
  assert.equal(responsibilityEvidenceForUser(order, joshua)?.kind, "physical");
});

test("authored reports assign the named worker without assigning the reporter", () => {
  const cases = [
    {
      text: "Joshua Yoon arrived onsite and started testing the scanner.",
      worker: joshua,
      kind: "physical",
    },
    {
      text: "I am dispatching Julian Ortiz to the site.",
      worker: julian,
      kind: "physical",
    },
    {
      text: "Stanley Wu installed VNC remotely.",
      worker: stanley,
      kind: "remote",
    },
  ];

  for (const { text, worker, kind } of cases) {
    const order = workOrder({
      assignees: [igor, worker],
      assignmentHistory: [
        {
          source: "ai",
          assignees: [igor, worker],
          triggerSender: "Igor Savchenko",
          triggerMessage: text,
        },
      ],
    });
    assert.equal(
      responsibilityEvidenceForUser(order, igor),
      null,
      `reporter must not inherit: ${text}`
    );
    assert.equal(
      responsibilityEvidenceForUser(order, worker)?.kind,
      kind,
      `named worker should retain evidence: ${text}`
    );
  }
});

test("affirmative person-specific remote work is included", () => {
  const evidence = responsibilityEvidenceForUser(
    workOrder({
      assignees: [stanley],
      assignmentHistory: [
        {
          source: "ai",
          assignees: [stanley],
          triggerSender: "Dispatcher",
          triggerMessage:
            "Stanley Wu is logged in remotely and troubleshooting the scanner.",
        },
      ],
    }),
    stanley
  );
  assert.equal(evidence?.kind, "remote");
});

test("an ETA question is not physical evidence, but an affirmative ETA is", () => {
  const question = workOrder({
    assignees: [joshua],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [joshua],
        triggerSender: "Dispatcher",
        triggerMessage: "Joshua Yoon, what is your ETA?",
      },
    ],
  });
  const affirmative = workOrder({
    assignees: [joshua],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [joshua],
        triggerSender: "Dispatcher",
        triggerMessage: "Joshua Yoon is on the way. ETA 30 minutes.",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(question, joshua), null);
  assert.equal(responsibilityEvidenceForUser(affirmative, joshua)?.kind, "physical");
});

test("a sender-authored ETA to site with a clock time is physical evidence", () => {
  const order = workOrder({
    assignees: [{ ...igor, workMode: "physical" }],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [{ ...igor, workMode: "physical" }],
        triggerSender: "Igor Savchenko",
        triggerMessage: "ETA to site is 4:36pm",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(order, igor)?.kind, "physical");
});

test("a worker bringing a removed core back from site is physical evidence", () => {
  const order = workOrder({
    assignees: [joshua],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [joshua],
        triggerSender: "Joshua Yoon",
        triggerMessage:
          "Finished the repair and brought the failed core part back to AIS.",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(order, joshua)?.kind, "physical");
});

test("a package on the way is logistics participation, not personal travel", () => {
  const order = workOrder({
    assignees: [julie],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [julie],
        triggerSender: "Julie Tang",
        triggerMessage:
          "Ubering the power supply to Alex. A package delivery is on the way.",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(order, julie), null);
});

test("a courier ETA to site is not the message author's physical assignment", () => {
  const order = workOrder({
    assignees: [{ ...igor, workMode: "physical" }],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [{ ...igor, workMode: "physical" }],
        triggerSender: "Igor Savchenko",
        triggerMessage: "The Uber courier ETA to site is 4:36pm",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(order, igor), null);
});

test("an ETA question with a time is not physical assignment evidence", () => {
  const order = workOrder({
    assignees: [{ ...igor, workMode: "physical" }],
    assignmentHistory: [
      {
        source: "ai",
        assignees: [{ ...igor, workMode: "physical" }],
        triggerSender: "Igor Savchenko",
        triggerMessage: "Do we have an ETA to site, 4:36pm?",
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(order, igor), null);
});

test("manual assignment requires an explicit physical or remote mode", () => {
  const withoutMode = workOrder({
    assignees: [julie],
    assignmentHistory: [
      { source: "manual_assignment", assignees: [julie] },
    ],
  });
  const remote = workOrder({
    assignees: [{ ...julie, workMode: "remote" }],
    assignmentHistory: [
      {
        source: "manual_assignment",
        assignees: [{ ...julie, workMode: "remote" }],
      },
    ],
  });
  assert.equal(responsibilityEvidenceForUser(withoutMode, julie), null);
  assert.equal(responsibilityEvidenceForUser(remote, julie)?.kind, "remote");
});

test("reviewed admin corrections with an explicit mode are authoritative", () => {
  const corrected = workOrder({
    assignees: [{ ...joshua, workMode: "physical" }],
    assignmentHistory: [
      {
        source: "admin_correction",
        assignees: [{ ...joshua, workMode: "physical" }],
        triggerMessage: "Admin confirmed the field dispatch.",
      },
    ],
  });
  assert.equal(
    responsibilityEvidenceForUser(corrected, joshua)?.kind,
    "physical"
  );
});

test("a clock is affirmative responsibility evidence for circulating work", () => {
  assert.equal(
    responsibilityEvidenceForUser(workOrder(), julie, {
      hasRecordedTime: true,
    })?.source,
    "manual_clock"
  );
});
