const test = require("node:test");
const assert = require("node:assert/strict");
const {
  autoTrailerForClient,
  clientLocation,
  connectionSelectionForClient,
  connectionSelectionForTrailer,
  resolveClientRecord,
} = require("../lib/ops/trailerClientLinks.cjs");

const trailers = [
  {
    id: "AIS14",
    locationCurrentId: "CLIENT_A",
    associatedMachineId: "MACHINE_A",
  },
  { id: "AIS15", currentClientId: "CLIENT_B" },
  { id: "AIS16", currentClientId: "CLIENT_B" },
];

test("reads the Client DB address across legacy client field names", () => {
  assert.equal(clientLocation(null), "");
  assert.equal(clientLocation({ local: "Las Vegas, NV" }), "Las Vegas, NV");
  assert.equal(clientLocation({ address: { city: "Upland", state: "CA" } }), "Upland, CA");
});

test("resolves a unique legacy client name but not an ambiguous one", () => {
  const clients = [
    { id: "A", name: "SimonMed" },
    { id: "B", name: "Shared" },
    { id: "C", name: "Shared" },
  ];
  assert.equal(resolveClientRecord(clients, "", "SimonMed")?.id, "A");
  assert.equal(resolveClientRecord(clients, "", "Shared"), null);
});

test("auto-selects a trailer only when one current trailer belongs to the client", () => {
  assert.equal(autoTrailerForClient(trailers, "CLIENT_A")?.id, "AIS14");
  assert.equal(autoTrailerForClient(trailers, "CLIENT_B"), null);
});

test("selecting a client preserves independently selected trailer and machine", () => {
  assert.deepEqual(
    connectionSelectionForClient({
      clientId: "CLIENT_A",
      trailers,
      currentTrailerId: "AIS16",
      currentMachineId: "MACHINE_CUSTOM",
    }),
    {
      clientId: "CLIENT_A",
      trailerId: "AIS16",
      machineId: "MACHINE_CUSTOM",
    }
  );
});

test("selecting a trailer supplies its client and machine IDs", () => {
  assert.deepEqual(
    connectionSelectionForTrailer({ trailerId: "AIS14", trailers }),
    { clientId: "CLIENT_A", trailerId: "AIS14", machineId: "MACHINE_A" }
  );
});
