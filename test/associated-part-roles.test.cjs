const test = require("node:test");
const assert = require("node:assert/strict");

const {
  assertAuthoritativeQueriesComplete,
  firstEntityRoleValue,
  getEntityRoleIds,
  getStoredClientId,
  groupAssociatedParts,
  mapSettledWithConcurrency,
  matchesEntityRole,
  referenceId,
  selectRoleMachineSnapshot,
  uniqueReferenceCandidates,
} = require("../lib/associatedPartRoles.cjs");

test("normalizes Firestore references, paths, and legacy ids", () => {
  assert.equal(referenceId({ id: "AIS23" }), "AIS23");
  assert.equal(referenceId({ path: "Trailers/AIS23" }), "AIS23");
  assert.equal(referenceId("/Machine/AIS15216"), "AIS15216");
  assert.equal(
    referenceId({ _path: { segments: ["Client", "FOOTHILL"] } }),
    "FOOTHILL"
  );
});

test("classifies direct From and Current references without guessing", () => {
  const part = {
    MachineFrom: { path: "Machine/M1" },
    machineCurrentId: "M2",
    ClientFrom: "Client/C1",
    currentClientId: "C2",
    trailerFromId: "AIS23",
  };

  assert.equal(matchesEntityRole(part, "machine", "M1", "from"), true);
  assert.equal(matchesEntityRole(part, "machine", "M1", "current"), false);
  assert.equal(matchesEntityRole(part, "machine", "M2", "current"), true);
  assert.deepEqual(getEntityRoleIds(part, "client", "from"), ["C1"]);
  assert.equal(matchesEntityRole(part, "client", "C2", "current"), true);
  assert.equal(matchesEntityRole(part, "trailer", "AIS23", "from"), true);
  assert.equal(matchesEntityRole({}, "machine", "M1", "current"), false);
});

test("groups, deduplicates, and sorts only validated role matches", () => {
  const groups = groupAssociatedParts(
    [
      { id: "I2", name: "Zulu", TrailerFrom: "Trailers/AIS23" },
      { id: "I1", name: "Alpha", trailerCurrentId: "AIS23" },
      {
        id: "I3",
        name: "Both",
        trailerFromId: "AIS23",
        TrailerCurrent: { id: "AIS23" },
      },
      { id: "I2", name: "Duplicate", TrailerFrom: "Trailers/AIS23" },
      { id: "STALE", name: "Stale inverse-only candidate" },
      { id: "OTHER", name: "Other", TrailerFrom: "Trailers/AIS99" },
    ],
    "trailer",
    "AIS23"
  );

  assert.deepEqual(
    groups.from.map((part) => part.id),
    ["I3", "I2"]
  );
  assert.deepEqual(
    groups.current.map((part) => part.id),
    ["I1", "I3"]
  );
});

test("selects the requested role for print resolution", () => {
  const part = {
    MachineFrom: { id: "M-FROM" },
    CurrentMachine: { id: "M-CURRENT" },
    ClientFrom: { id: "C-FROM" },
    ClientCurrent: { id: "C-CURRENT" },
  };

  assert.equal(
    referenceId(firstEntityRoleValue(part, "machine", "from")),
    "M-FROM"
  );
  assert.equal(
    referenceId(firstEntityRoleValue(part, "machine", "current")),
    "M-CURRENT"
  );
  assert.equal(
    referenceId(firstEntityRoleValue(part, "client", "current")),
    "C-CURRENT"
  );
});

test("canonical role fields override stale legacy aliases", () => {
  const canonicalReference = {
    MachineCurrent: { id: "M-CANONICAL" },
    machineCurrentId: "M-CANONICAL-ID",
    CurrentMachine: { id: "M-STALE" },
    currentMachineId: "M-STALE-ID",
  };
  assert.deepEqual(getEntityRoleIds(canonicalReference, "machine", "current"), [
    "M-CANONICAL",
  ]);
  assert.equal(
    matchesEntityRole(canonicalReference, "machine", "M-STALE", "current"),
    false
  );

  const canonicalId = {
    machineCurrentId: "M-CANONICAL-ID",
    CurrentMachine: { id: "M-STALE" },
  };
  assert.deepEqual(getEntityRoleIds(canonicalId, "machine", "current"), [
    "M-CANONICAL-ID",
  ]);

  const legacyOnly = { CurrentMachine: { id: "M-LEGACY" } };
  assert.deepEqual(getEntityRoleIds(legacyOnly, "machine", "current"), [
    "M-LEGACY",
  ]);
});

test("stored clients resolve canonical, then association map, then legacy", () => {
  const allTiers = {
    ClientFrom: "Client/C-CANONICAL",
    clientFromId: "C-CANONICAL-ID",
    associationFrom: { clientId: "C-MAP" },
    fromClient: "Client/C-LEGACY",
  };
  assert.equal(getStoredClientId(allTiers, "from"), "C-CANONICAL");

  const mapAndLegacy = {
    associationFrom: { clientId: "/Client/C-MAP" },
    fromClient: { id: "C-LEGACY" },
    fromClientId: "C-LEGACY-ID",
  };
  assert.equal(getStoredClientId(mapAndLegacy, "from"), "C-MAP");

  assert.equal(
    getStoredClientId({ CurrentClient: "Client/C-LEGACY" }, "current"),
    "C-LEGACY"
  );
});

test("every accepted legacy association alias survives centralized hydration", () => {
  const cases = [
    ["client", "from", ["fromClient", "clientFrom", "Client", "fromClientId"]],
    [
      "client",
      "current",
      ["currentClient", "clientCurrent", "CurrentClient", "currentClientId"],
    ],
    ["machine", "from", ["Machine", "fromMachine", "fromMachineId", "machineId"]],
    ["machine", "current", ["CurrentMachine", "currentMachine", "currentMachineId"]],
    ["trailer", "from", ["fromTrailer", "trailerFrom", "fromTrailerId"]],
    ["trailer", "current", ["currentTrailer", "trailerCurrent", "currentTrailerId"]],
  ];

  for (const [entityType, role, fields] of cases) {
    for (const field of fields) {
      const expected = `${entityType}-${role}-${field}`;
      assert.deepEqual(
        getEntityRoleIds({ [field]: expected }, entityType, role),
        [expected],
        `${entityType}.${role}.${field}`
      );
    }
  }
});

test("association maps outrank legacy aliases for every entity type", () => {
  for (const entityType of ["client", "machine", "trailer"]) {
    const idField = `${entityType}Id`;
    const legacyField =
      entityType === "client"
        ? "fromClient"
        : entityType === "machine"
          ? "fromMachine"
          : "fromTrailer";
    assert.equal(
      firstEntityRoleValue(
        {
          associationFrom: { [idField]: `${entityType}-map` },
          [legacyField]: `${entityType}-legacy`,
        },
        entityType,
        "from"
      ),
      `${entityType}-map`
    );
  }
});

test("uses only a machine snapshot that belongs to the requested role", () => {
  const currentSnapshot = { id: "M-CURRENT", OEM: "Current OEM" };
  const record = {
    MachineFrom: { id: "M-FROM" },
    MachineCurrent: { id: "M-CURRENT" },
    TheMachine: currentSnapshot,
  };

  assert.equal(selectRoleMachineSnapshot(record, "from"), null);
  assert.equal(selectRoleMachineSnapshot(record, "current"), currentSnapshot);
  assert.equal(
    selectRoleMachineSnapshot({ TheMachine: currentSnapshot }, "current"),
    null
  );

  const historicalSnapshot = { id: "M-FROM", OEM: "Historical OEM" };
  assert.equal(
    selectRoleMachineSnapshot(
      { ...record, machineData: historicalSnapshot },
      "from"
    ),
    historicalSnapshot
  );
  assert.deepEqual(
    selectRoleMachineSnapshot(
      { MachineFrom: "M-FROM", machineData: { OEM: "Legacy snapshot" } },
      "from"
    ),
    { OEM: "Legacy snapshot" }
  );
});

test("deduplicates inverse candidates and excludes direct query results", () => {
  const candidateA = { id: "A" };
  const candidates = uniqueReferenceCandidates(
    [candidateA, "Test/A", { path: "Test/B" }, { id: "C" }, null],
    ["B", "Test/C"]
  );
  assert.deepEqual(candidates, [candidateA]);
});

test("settles inverse reads with bounded concurrency", async () => {
  let active = 0;
  let maxActive = 0;
  const results = await mapSettledWithConcurrency(
    Array.from({ length: 20 }, (_, index) => index),
    3,
    async (value) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setImmediate(resolve));
      active -= 1;
      if (value === 7) throw new Error("expected failure");
      return value * 2;
    }
  );

  assert.equal(maxActive, 3);
  assert.equal(results.length, 20);
  assert.deepEqual(results[2], { status: "fulfilled", value: 4 });
  assert.equal(results[7].status, "rejected");
  assert.match(results[7].reason.message, /expected failure/);
});

test("blocks an incomplete authoritative query set", () => {
  const cause = new Error("permission denied");
  assert.doesNotThrow(() =>
    assertAuthoritativeQueriesComplete([
      { status: "fulfilled", value: { docs: [] } },
    ])
  );
  assert.throws(
    () =>
      assertAuthoritativeQueriesComplete([
        { status: "fulfilled", value: { docs: [] } },
        { status: "rejected", reason: cause },
      ]),
    (error) =>
      /1 of 2 authoritative queries failed/.test(error.message) &&
      error.cause === cause
  );
});

test("keeps a removed trailer part in trailer From and warehouse machine Current", () => {
  const pellet = {
    id: "AIS17704",
    name: "Pellet",
    TrailerFrom: { path: "Trailers/AIS23" },
    MachineFrom: { path: "Machine/AIS15216" },
    ClientFrom: { path: "Client/FOOTHILL" },
    MachineCurrent: { path: "Machine/WAREHOUSE-MACHINE" },
    ClientCurrent: { path: "Client/SOCAL-WAREHOUSE" },
  };

  assert.deepEqual(
    groupAssociatedParts([pellet], "trailer", "AIS23").from.map(
      (part) => part.id
    ),
    ["AIS17704"]
  );
  assert.deepEqual(
    groupAssociatedParts([pellet], "trailer", "AIS23").current,
    []
  );
  assert.deepEqual(
    groupAssociatedParts([pellet], "machine", "AIS15216").from.map(
      (part) => part.id
    ),
    ["AIS17704"]
  );
  assert.deepEqual(
    groupAssociatedParts(
      [pellet],
      "machine",
      "WAREHOUSE-MACHINE"
    ).current.map((part) => part.id),
    ["AIS17704"]
  );
  assert.equal(matchesEntityRole(pellet, "client", "FOOTHILL", "from"), true);
});
