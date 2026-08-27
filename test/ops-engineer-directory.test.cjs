const test = require("node:test");
const assert = require("node:assert/strict");
const {
  mergeCoveragePeople,
  normalizeBlueFolderUser,
  normalizeBlueFolderUsers,
  publicCoveragePeople,
} = require("../lib/ops/engineerDirectory.cjs");

function blueFolderUser(overrides = {}) {
  return {
    userId: "33572354",
    fullName: "Anthony G",
    inactive: "0",
    userType: "Standard",
    roles: { role: { name: "Lead Technician" } },
    email: "private@example.com",
    phoneMobile: "private",
    allowAPI: "1",
    ...overrides,
  };
}

test("active BlueFolder technicians are eligible without a Slack or login identity", () => {
  const anthony = normalizeBlueFolderUser(blueFolderUser());
  const noLoginTechnician = normalizeBlueFolderUser(
    blueFolderUser({
      userId: "33518929",
      fullName: "Kelvin Y",
      userType: "No-Login",
      roles: { role: { name: "Technician" } },
    })
  );
  assert.equal(anthony.id, "bluefolder:33572354");
  assert.equal(anthony.eligible, true);
  assert.equal(noLoginTechnician.eligible, true);
});

test("inactive engineers and active non-engineers are excluded", () => {
  const users = normalizeBlueFolderUsers([
    blueFolderUser({ inactive: "1" }),
    blueFolderUser({
      userId: "33518928",
      fullName: "Julie T",
      roles: { role: { name: "Administrator" } },
    }),
  ]);
  assert.equal(users.filter((user) => user.eligible).length, 0);
});

test("role parsing accepts nested arrays and recognized field-service roles", () => {
  const user = normalizeBlueFolderUser(
    blueFolderUser({
      roles: {
        role: [
          { name: "Scheduler" },
          { customName: "Subcontractor" },
        ],
      },
    })
  );
  assert.deepEqual(user.roles, ["Scheduler", "Subcontractor"]);
  assert.equal(user.eligible, true);
});

test("malformed users are ignored and duplicate BlueFolder IDs collapse", () => {
  const users = normalizeBlueFolderUsers([
    blueFolderUser(),
    blueFolderUser({ fullName: "Anthony Updated" }),
    blueFolderUser({ userId: "", fullName: "Missing ID" }),
  ]);
  assert.equal(users.length, 1);
  assert.equal(users[0].name, "Anthony Updated");
});

test("Slack and BlueFolder exact-name identities merge without fuzzy first-name matching", () => {
  const people = mergeCoveragePeople(
    [
      { id: "U-JOSH", name: "Joshua Yoon" },
      { id: "U-SEAN", name: "Sean Wang" },
    ],
    [
      { id: "bluefolder:33577823", name: "Joshua Yoon" },
      { id: "bluefolder:33518925", name: "Sean W" },
    ]
  );
  assert.deepEqual(
    people.map((person) => person.name),
    ["Joshua Yoon", "Sean W", "Sean Wang"]
  );
  const joshua = people.find((person) => person.name === "Joshua Yoon");
  assert.equal(joshua.id, "U-JOSH");
  assert.deepEqual(joshua.aliases, ["U-JOSH", "bluefolder:33577823"]);
});

test("browser-facing people contain only id and name", () => {
  const publicPeople = publicCoveragePeople([
    {
      id: "bluefolder:33572354",
      name: "Anthony G",
      aliases: ["bluefolder:33572354"],
      email: "must-not-leak@example.com",
      roles: ["Lead Technician"],
      tokenApi: "must-not-leak",
    },
  ]);
  assert.deepEqual(publicPeople, [
    { id: "bluefolder:33572354", name: "Anthony G" },
  ]);
});
