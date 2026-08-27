const test = require("node:test");
const assert = require("node:assert/strict");

const {
  extractDocumentId,
  serializeFirestoreDate,
  serializeMachineDocument,
  sortMachineRecords,
} = require("../lib/clientMachines.cjs");

test("extractDocumentId supports references, IDs, and legacy paths", () => {
  assert.equal(extractDocumentId({ id: "AIS100" }, "Machine"), "AIS100");
  assert.equal(extractDocumentId("AIS101", "Machine"), "AIS101");
  assert.equal(extractDocumentId("Machine/AIS102", "Machine"), "AIS102");
  assert.equal(extractDocumentId("/Machine/AIS103", "Machine"), "AIS103");
  assert.equal(
    extractDocumentId(
      "projects/magmo/databases/(default)/documents/Machine/AIS104",
      "Machine"
    ),
    "AIS104"
  );
  assert.equal(
    extractDocumentId({ _path: { segments: ["Machine", "AIS105"] } }, "Machine"),
    "AIS105"
  );
  assert.equal(extractDocumentId("Client/AIS106", "Machine"), "");
});

test("serializeFirestoreDate makes Firestore timestamps JSON-safe", () => {
  const date = new Date("2026-08-19T12:00:00.000Z");
  assert.equal(serializeFirestoreDate(date), date.toISOString());
  assert.equal(
    serializeFirestoreDate({ toDate: () => date }),
    date.toISOString()
  );
  assert.equal(serializeFirestoreDate("2026-08-19"), "2026-08-19");
  assert.equal(serializeFirestoreDate({ seconds: 123 }), null);
});

test("serializeMachineDocument normalizes legacy field casing", () => {
  const result = serializeMachineDocument({
    id: "AIS200",
    exists: true,
    data: () => ({
      name: "Lake Forest MRI",
      local: "Lake Forest",
      oem: "GE",
      modality: "MRI",
      model: "Signa",
    }),
  });

  assert.deepEqual(result, {
    id: "AIS200",
    name: "Lake Forest MRI",
    local: "Lake Forest",
    OEM: "GE",
    Modality: "MRI",
    Model: "Signa",
    lastPM: null,
    nextPM: null,
  });
});

test("serializeMachineDocument ignores missing documents", () => {
  assert.equal(serializeMachineDocument(null), null);
  assert.equal(serializeMachineDocument({ exists: false }), null);
});

test("sortMachineRecords produces stable name and ID ordering", () => {
  const original = [
    { id: "AIS20", name: "MRI 10" },
    { id: "AIS3", name: "ct" },
    { id: "AIS10", name: "MRI 2" },
    { id: "AIS2", name: "CT" },
  ];

  assert.deepEqual(
    sortMachineRecords(original).map((machine) => machine.id),
    ["AIS2", "AIS3", "AIS10", "AIS20"]
  );
  assert.deepEqual(original.map((machine) => machine.id), [
    "AIS20",
    "AIS3",
    "AIS10",
    "AIS2",
  ]);
});
