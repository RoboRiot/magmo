const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildClientList,
  filterClientListRecords,
  serializeClientListDocument,
  sortClientListRecords,
} = require("../lib/clientList.cjs");

function clientDoc(id, data) {
  return {
    id,
    exists: true,
    data: () => data,
  };
}

test("client-list serialization exposes only ID and display name", () => {
  const result = serializeClientListDocument(
    clientDoc(" AIS17182 ", {
      name: "  SoCalWarehouse   - Lake Forest ",
      contactEmail: "private@example.com",
      billing: { account: "secret" },
      machines: [{ id: "AIS1" }],
      apiToken: "do-not-expose",
    })
  );

  assert.deepEqual(result, {
    id: "AIS17182",
    name: "SoCalWarehouse - Lake Forest",
  });
  assert.equal(Object.hasOwn(result, "contactEmail"), false);
  assert.equal(Object.hasOwn(result, "machines"), false);
  assert.equal(Object.hasOwn(result, "apiToken"), false);
});

test("client-list serialization safely ignores invalid documents", () => {
  assert.equal(serializeClientListDocument(null), null);
  assert.equal(serializeClientListDocument({ id: "AIS1", exists: false }), null);
  assert.equal(serializeClientListDocument(clientDoc("", { name: "Missing ID" })), null);
});

test("client-list serialization supports the legacy Name field", () => {
  assert.deepEqual(
    serializeClientListDocument(
      clientDoc("AIS42", { Name: " Legacy Client Name " })
    ),
    { id: "AIS42", name: "Legacy Client Name" }
  );
});

test("client-list sorting is deterministic and does not mutate input", () => {
  const original = [
    { id: "AIS20", name: "SimonMed 10" },
    { id: "AIS3", name: "alpha" },
    { id: "AIS10", name: "SimonMed 2" },
    { id: "AIS2", name: "Alpha" },
  ];

  assert.deepEqual(
    sortClientListRecords(original).map((client) => client.id),
    ["AIS2", "AIS3", "AIS10", "AIS20"]
  );
  assert.deepEqual(
    original.map((client) => client.id),
    ["AIS20", "AIS3", "AIS10", "AIS2"]
  );
});

test("client-list search is case, accent, whitespace, and ID tolerant", () => {
  const clients = [
    { id: "AIS17182", name: "SoCalWarehouse - Lake Forest" },
    { id: "AIS200", name: "Cl\u00ednica Norte" },
    { id: "AIS300", name: "SimonMed Northwest" },
  ];

  assert.deepEqual(
    filterClientListRecords(clients, "  LAKE   FOREST ").map((client) => client.id),
    ["AIS17182"]
  );
  assert.deepEqual(
    filterClientListRecords(clients, "clinica").map((client) => client.id),
    ["AIS200"]
  );
  assert.deepEqual(
    filterClientListRecords(clients, "17182").map((client) => client.id),
    ["AIS17182"]
  );
  assert.notEqual(filterClientListRecords(clients, ""), clients);
  assert.deepEqual(filterClientListRecords(clients, ""), clients);
});

test("buildClientList serializes, removes invalid documents, and sorts", () => {
  const result = buildClientList([
    clientDoc("AIS12", { name: "Zulu", privateNote: "hidden" }),
    clientDoc("AIS2", { name: "Alpha" }),
    { id: "AIS9", exists: false },
  ]);

  assert.deepEqual(result, [
    { id: "AIS2", name: "Alpha" },
    { id: "AIS12", name: "Zulu" },
  ]);
});
