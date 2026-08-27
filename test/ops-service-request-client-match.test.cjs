const assert = require("node:assert/strict");
const test = require("node:test");

const {
  addressParts,
  collectClientAddresses,
  learningKeyRows,
  rankClientCandidates,
  rankMachineCandidates,
  trailerCurrentEvidence,
} = require("../lib/ops/serviceRequestClientMatch.cjs");

function request(overrides = {}) {
  return {
    companyName: "Las Vegas NV, Simonmed",
    streetAddress: "8530 W Sunset Rd",
    addressLine2: "UNIT 120",
    city: "Las Vegas",
    region: "Nevada",
    postalCode: "89113",
    country: "United States",
    issueTitle: "Lights are not responding",
    manufacturer: "GE Healthcare",
    modality: "MRI",
    ...overrides,
  };
}

function client(id, name, data = {}, extras = {}) {
  return { id, name, data, addresses: collectClientAddresses(data), ...extras };
}

test("normalizes unit, state, country, and street suffix variations", () => {
  const left = addressParts(
    "8530 W Sunset Road, Suite 120, Las Vegas, Nevada 89113, United States"
  );
  const right = addressParts(
    "8530 W Sunset Rd, UNIT 120, Las Vegas, NV, 89113, US"
  );
  assert.equal(left.street, right.street);
  assert.equal(left.postalCode, right.postalCode);
});

test("uses the canonical nested BlueFolder matched address before fuzzy company names", () => {
  const clients = [
    client("wrong", "SimonMed LV Flamingo", {
      location: "Las Vegas, NV",
    }),
    client("AIS39496", "Simonmed Northwest NV", {
      bluefolderMatchedLocation: {
        addressStreet: "8530 W Sunset Road",
        addressCity: "Las Vegas",
        addressState: "NV",
        addressPostalCode: "89113",
        addressCountry: "US",
      },
    }),
  ];
  const result = rankClientCandidates({ request: request(), clients });
  assert.equal(result.suggestion.id, "AIS39496");
  assert.match(result.suggestion.source, /address/);
  assert.ok(result.suggestion.confidence >= 0.99);
});

test("reads legacy local and Location address fallbacks", () => {
  const legacyLocal = client("local", "Local", { local: "1 Main St, Irvine, CA 92614" });
  const legacyCapital = client("capital", "Capital", {
    Location: "2 Main St, Irvine, CA 92614",
  });
  assert.deepEqual(legacyLocal.addresses, ["1 Main St, Irvine, CA 92614"]);
  assert.deepEqual(legacyCapital.addresses, ["2 Main St, Irvine, CA 92614"]);
});

test("does not auto-select when two client records have the same exact address", () => {
  const data = {
    address: {
      street: "8530 W Sunset Rd",
      city: "Las Vegas",
      state: "NV",
      postalCode: "89113",
    },
  };
  const result = rankClientCandidates({
    request: request(),
    clients: [client("one", "SimonMed One", data), client("two", "SimonMed Two", data)],
  });
  assert.equal(result.suggestion, null);
  assert.equal(result.needsAi, true);
});

test("uses current trailer/site aliases as context without requiring a legacy Machine.client", () => {
  const result = rankClientCandidates({
    request: request({ streetAddress: "", addressLine2: "", postalCode: "", country: "" }),
    clients: [
      client("AIS39496", "Simonmed Northwest NV", {}, {
        aliases: ["Las Vegas", "Trailer AIS14 HDxt"],
      }),
      client("flamingo", "SimonMed LV Flamingo", {}),
    ],
  });
  assert.equal(result.suggestion.id, "AIS39496");
  assert.equal(result.suggestion.source, "client_site_context");
});

test("suggests the associated machine/trailer when it is the only current client system", () => {
  const result = rankMachineCandidates({
    request: request(),
    clientId: "AIS39496",
    machines: [
      {
        id: "AIS75631",
        name: "Trailer AIS14 HDxt",
        label: "Trailer AIS14 HDxt - GE - MRI",
        clientIds: ["AIS62854", "AIS39496"],
        location: "Las Vegas",
      },
    ],
  });
  assert.equal(result.suggestion.id, "AIS75631");
  assert.equal(result.suggestion.source, "unique_client_machine");
});

test("screenshot request is reviewably matched through current trailer, city, brand, and equipment context", () => {
  const trailer = trailerCurrentEvidence(
    {
      name: "Trailer AIS14",
      locationCurrentId: "AIS39496",
      locationCurrentName: "SimonMed Imaging Northwest",
      locationCurrentClientLocation: "Las Vegas, NV",
      associatedMachineId: "AIS75631",
      model: "HDxt",
    },
    "AIS14"
  );
  const clients = [
    client("AIS39496", "Simonmed Northwest NV", {}, { aliases: trailer.aliases }),
    client("other", "SimonMed LV Flamingo", {}),
  ];
  const clientResult = rankClientCandidates({
    request: request({
      locationText:
        "8530 W Sunset Rd, UNIT 120, Las Vegas, Nevada, 89113, United States",
      streetAddress: "",
      addressLine2: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
      systemModel: "GE MRI HDxt",
    }),
    clients,
  });
  assert.equal(trailer.currentClientId, "AIS39496");
  assert.equal(trailer.associatedMachineId, "AIS75631");
  assert.equal(clientResult.candidates[0].id, "AIS39496");
  assert.equal(clientResult.suggestion.id, "AIS39496");

  const machineResult = rankMachineCandidates({
    request: request({ systemModel: "GE MRI HDxt" }),
    clientId: trailer.currentClientId,
    machines: [
      {
        id: trailer.associatedMachineId,
        name: "Trailer AIS14 HDxt",
        label: "Trailer AIS14 HDxt - GE - MRI",
        oem: "GE",
        modality: "MRI",
        model: "HDxt",
        clientIds: [trailer.currentClientId],
      },
    ],
  });
  assert.equal(machineResult.suggestion.id, "AIS75631");
});

test("positive reviewed memory promotes the corrected client for the same address", () => {
  const result = rankClientCandidates({
    request: request(),
    clients: [
      client("correct", "Simonmed Northwest NV", {}),
      client("wrong", "Las Vegas NV Simonmed", {}),
    ],
    memoryRows: [{ acceptedClientId: "correct", rejectedClientIds: ["wrong"] }],
  });
  assert.equal(result.suggestion.id, "correct");
  assert.equal(result.suggestion.source, "reviewed_feedback");
});

test("negative reviewed memory excludes a denied suggestion for the same fingerprint", () => {
  const result = rankClientCandidates({
    request: request(),
    clients: [
      client("denied", "Las Vegas NV Simonmed", {}),
      client("other", "Simonmed Northwest NV", {}, { aliases: ["Las Vegas"] }),
    ],
    memoryRows: [{ rejectedClientIds: ["denied"] }],
  });
  assert.notEqual(result.suggestion?.id, "denied");
  assert.equal(result.candidates.some((candidate) => candidate.id === "denied"), false);
});

test("learning keys are deterministic and contain no request or user identifier", () => {
  const first = learningKeyRows(request());
  const second = learningKeyRows({ ...request(), id: "different-request" });
  assert.deepEqual(first, second);
  assert.ok(first.some((key) => key.kind === "street_postal"));
  assert.ok(first.every((key) => /^[a-f0-9]{64}$/.test(key.id)));
});
