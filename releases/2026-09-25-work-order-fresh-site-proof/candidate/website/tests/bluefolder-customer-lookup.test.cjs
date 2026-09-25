"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  createBlueFolderCustomerLookup,
} = require("../lib/ops/blueFolderCustomerLookup.cjs");

function customerXml({
  status = "success",
  customerId = "customer-1",
  inactive = "false",
  includeInactive = true,
  active = "",
  locationId = "location-2",
  selectedPrimary = "false",
  includeSelectedPrimary = true,
  selectedName = "Verified Satellite",
  street = "100 Verified Ave",
  city = "Fontana",
  state = "CA",
  postalCode = "92337",
  country = "",
  extraLocations = "",
} = {}) {
  return `<?xml version="1.0"?><response><status>${status}</status><customer>` +
    `<customerId>${customerId}</customerId><customerName>Verified Parent</customerName>` +
    (includeInactive ? `<inactive>${inactive}</inactive>` : "") +
    (active !== "" ? `<active>${active}</active>` : "") +
    `<locations><location><customerLocationId>location-primary</customerLocationId>` +
    `<name>Primary</name><addressStreet>1 Main St</addressStreet><addressCity>Los Angeles</addressCity>` +
    `<addressState>CA</addressState><addressPostalCode>90001</addressPostalCode>` +
    `<addressCountry>United States</addressCountry><isPrimary>true</isPrimary></location>` +
    `<location><customerLocationId>${locationId}</customerLocationId><name>${selectedName}</name>` +
    `<addressStreet>${street}</addressStreet><addressCity>${city}</addressCity>` +
    `<addressState>${state}</addressState><addressPostalCode>${postalCode}</addressPostalCode>` +
    `<addressCountry>${country}</addressCountry>` +
    (includeSelectedPrimary ? `<isPrimary>${selectedPrimary}</isPrimary>` : "") +
    `</location>${extraLocations}</locations></customer></response>`;
}

function xmlResponse(xml, { status = 200, headers = {} } = {}) {
  return new Response(xml, {
    status,
    headers: { "content-type": "text/xml", ...headers },
  });
}

function lookupWith(fetchImpl, options = {}) {
  return createBlueFolderCustomerLookup({
    fetchImpl,
    env: {
      BLUEFOLDER_API_TOKEN: "test-token",
      BLUEFOLDER_BASE_URL: "https://example.test/api/2.0",
    },
    ...options,
  });
}

test("returns only normalized exact nonprimary proof and accepts a complete address with blank country", async () => {
  let request;
  const lookup = lookupWith(async (url, options) => {
    request = { url, options };
    return xmlResponse(customerXml());
  });
  const result = await lookup("customer-1", "location-2");
  assert.equal(result.ok, true);
  assert.deepEqual(result.proof, {
    source: "bluefolder_customers_get",
    customerId: "customer-1",
    customerName: "Verified Parent",
    active: true,
    location: {
      bluefolderLocationId: "location-2",
      name: "Verified Satellite",
      addressStreet: "100 Verified Ave",
      city: "Fontana",
      state: "CA",
      postalCode: "92337",
      country: "",
      isPrimary: false,
      formattedAddress: "100 Verified Ave, Fontana, CA 92337",
    },
  });
  assert.equal(request.url, "https://example.test/api/2.0/customers/get.aspx");
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.redirect, "error");
  assert.match(request.options.body, /<customerId>customer-1<\/customerId>/);
  assert.match(request.options.headers.Authorization, /^Basic /);
});

test("coalesces concurrent exact lookups and caches only bounded normalized results", async () => {
  let calls = 0;
  let release;
  const lookup = lookupWith(async () => {
    calls++;
    await new Promise((resolve) => { release = resolve; });
    return xmlResponse(customerXml());
  });
  const first = lookup("customer-1", "location-2");
  const second = lookup("customer-1", "location-2");
  await new Promise((resolve) => setImmediate(resolve));
  release();
  const [left, right] = await Promise.all([first, second]);
  assert.equal(left.ok, true);
  assert.deepEqual(right, left);
  assert.equal(calls, 1);
  assert.equal((await lookup("customer-1", "location-2")).ok, true);
  assert.equal(calls, 1);
});

test("bounds distinct in-flight lookups and returns a retryable busy result", async () => {
  let release;
  const lookup = lookupWith(async () => {
    await new Promise((resolve) => { release = resolve; });
    return xmlResponse(customerXml());
  }, { maxCacheEntries: 1 });
  const first = lookup("customer-1", "location-2");
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(await lookup("customer-2", "location-3"), {
    ok: false,
    reason: "bluefolder_customer_lookup_busy",
  });
  release();
  assert.equal((await first).ok, true);
});

test("fails closed for unknown or primary selected-location flags and ambiguous primary metadata", async () => {
  const cases = [
    [customerXml({ includeSelectedPrimary: false }), "bluefolder_customer_lookup_location_not_explicitly_nonprimary"],
    [customerXml({ selectedPrimary: "true" }), "bluefolder_customer_lookup_location_not_explicitly_nonprimary"],
    [customerXml({ extraLocations: "<location><customerLocationId>other</customerLocationId><name>Other</name><addressStreet>3 St</addressStreet><addressCity>LA</addressCity><addressState>CA</addressState><addressPostalCode>90003</addressPostalCode><isPrimary>true</isPrimary></location>" }), "bluefolder_customer_lookup_primary_location_ambiguous"],
  ];
  for (const [xml, reason] of cases) {
    const result = await lookupWith(async () => xmlResponse(xml))("customer-1", "location-2");
    assert.deepEqual(result, { ok: false, reason });
  }
});

test("requires explicit active customer state, exact IDs, one location, and complete normalized address", async () => {
  const cases = [
    [customerXml({ includeInactive: false }), "customer-1", "location-2", "bluefolder_customer_lookup_customer_not_explicitly_active"],
    [customerXml({ inactive: "true" }), "customer-1", "location-2", "bluefolder_customer_lookup_customer_not_explicitly_active"],
    [customerXml({ inactive: "false", active: "false" }), "customer-1", "location-2", "bluefolder_customer_lookup_customer_not_explicitly_active"],
    [customerXml({ inactive: "true", active: "true" }), "customer-1", "location-2", "bluefolder_customer_lookup_customer_not_explicitly_active"],
    [customerXml({ customerId: "other" }), "customer-1", "location-2", "bluefolder_customer_lookup_customer_mismatch"],
    [customerXml(), "customer-1", "missing", "bluefolder_customer_lookup_location_missing"],
    [customerXml({ street: "" }), "customer-1", "location-2", "bluefolder_customer_lookup_location_incomplete"],
    [customerXml({ extraLocations: `<location><customerLocationId>location-2</customerLocationId><name>Duplicate</name><addressStreet>2 St</addressStreet><addressCity>LA</addressCity><addressState>CA</addressState><addressPostalCode>90002</addressPostalCode><isPrimary>false</isPrimary></location>` }), "customer-1", "location-2", "bluefolder_customer_lookup_location_ambiguous"],
  ];
  for (const [xml, customerId, locationId, reason] of cases) {
    const result = await lookupWith(async () => xmlResponse(xml))(customerId, locationId);
    assert.deepEqual(result, { ok: false, reason });
  }
});

test("timeouts, rate limits, redirects/network failures, malformed XML, and oversized responses expose only safe retry reasons", async () => {
  const timeoutLookup = lookupWith((_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
  }), { timeoutMs: 10 });
  assert.deepEqual(await timeoutLookup("customer-1", "location-2"), {
    ok: false,
    reason: "bluefolder_customer_lookup_timeout",
  });

  const cases = [
    [async () => xmlResponse("rate limited", { status: 429 }), "bluefolder_customer_lookup_rate_limited", {}],
    [async () => { throw new TypeError("redirect blocked"); }, "bluefolder_customer_lookup_unavailable", {}],
    [async () => xmlResponse("<not-xml"), "bluefolder_customer_lookup_malformed_response", {}],
    [async () => xmlResponse(customerXml(), { headers: { "content-length": "9999" } }), "bluefolder_customer_lookup_response_too_large", { maxResponseBytes: 100 }],
  ];
  for (const [fetchImpl, reason, options] of cases) {
    const result = await lookupWith(fetchImpl, options)("customer-1", "location-2");
    assert.deepEqual(result, { ok: false, reason });
  }
});

test("missing credentials and insecure base URLs fail before making a request", async () => {
  let calls = 0;
  const fetchImpl = async () => { calls++; return xmlResponse(customerXml()); };
  const missing = createBlueFolderCustomerLookup({ fetchImpl, env: {} });
  assert.equal((await missing("customer-1", "location-2")).reason, "bluefolder_customer_lookup_credentials_missing");
  const insecure = createBlueFolderCustomerLookup({
    fetchImpl,
    env: { BLUEFOLDER_API_TOKEN: "token", BLUEFOLDER_BASE_URL: "http://example.test/api/2.0" },
  });
  assert.equal((await insecure("customer-1", "location-2")).reason, "bluefolder_customer_lookup_base_url_invalid");
  assert.equal(calls, 0);
});
