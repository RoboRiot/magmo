const crypto = require("crypto");
const { resolveClientAddress } = require("./clientDirectory.cjs");

const CONTRACT_VERSION = "2026-08-19";
const ADDRESS_SUFFIXES = new Map([
  ["street", "st"],
  ["st", "st"],
  ["road", "rd"],
  ["rd", "rd"],
  ["avenue", "ave"],
  ["ave", "ave"],
  ["boulevard", "blvd"],
  ["blvd", "blvd"],
  ["drive", "dr"],
  ["dr", "dr"],
  ["lane", "ln"],
  ["ln", "ln"],
  ["court", "ct"],
  ["ct", "ct"],
  ["parkway", "pkwy"],
  ["pkwy", "pkwy"],
  ["highway", "hwy"],
  ["hwy", "hwy"],
  ["suite", "unit"],
  ["ste", "unit"],
  ["apartment", "unit"],
  ["apt", "unit"],
]);
const CONTEXT_STOP_WORDS = new Set([
  "a", "an", "and", "at", "by", "for", "from", "in", "is", "of", "on",
  "or", "service", "site", "the", "to", "unit", "work", "request", "order",
]);

function clean(value, maxLength = 1000) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return clean(value.split("/").filter(Boolean).pop(), 180);
  }
  if (typeof value === "object") {
    return clean(
      value.id ||
        value._path?.segments?.[value._path.segments.length - 1] ||
        value.path?.split("/").filter(Boolean).pop(),
      180
    );
  }
  return "";
}

function ascii(value) {
  return clean(value, 4000)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeWords(value) {
  return ascii(value)
    .replace(/\b(?:united states of america|united states|usa)\b/g, "us")
    .replace(/\b(?:california)\b/g, "ca")
    .replace(/\b(?:nevada)\b/g, "nv")
    .replace(/\b(?:arizona)\b/g, "az")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => ADDRESS_SUFFIXES.get(token) || token)
    .join(" ");
}

function normalizePostalCode(value) {
  return ascii(value).replace(/[^a-z0-9]/g, "").slice(0, 10);
}

function stripUnit(value) {
  return clean(value, 1000)
    .replace(/\b(?:unit|suite|ste|apartment|apt|#)\s*[a-z0-9-]+\b.*$/i, "")
    .trim();
}

function tokenize(value) {
  return Array.from(
    new Set(
      normalizeWords(value)
        .split(/\s+/)
        .filter((token) => token.length > 1 && !CONTEXT_STOP_WORDS.has(token))
    )
  );
}

function tokenSimilarity(left, right) {
  const leftTokens = new Set(tokenize(left));
  const rightTokens = new Set(tokenize(right));
  if (!leftTokens.size || !rightTokens.size) return 0;
  let overlap = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) overlap += 1;
  });
  return overlap / Math.max(leftTokens.size, rightTokens.size);
}

function addressParts(value) {
  const raw = clean(value, 1000);
  const full = normalizeWords(raw);
  const street = normalizeWords(stripUnit(raw).split(",")[0] || "");
  const postalMatch = raw.match(/\b([A-Z]\d[A-Z][ -]?\d[A-Z]\d|\d{5}(?:-\d{4})?)\b/i);
  const postalCode = normalizePostalCode(postalMatch?.[1] || "");
  const number = street.match(/^\d+[a-z]?\b/)?.[0] || "";
  return { raw, full, street, postalCode, number };
}

function requestAddress(request = {}) {
  const structured = [
    request.streetAddress,
    request.addressLine2,
    request.city,
    request.region || request.state,
    request.postalCode,
    request.country,
  ]
    .map((value) => clean(value, 300))
    .filter(Boolean)
    .join(", ");
  return clean(
    clean(request.streetAddress, 300)
      ? structured
      : request.locationText || request.location || structured,
    1000
  );
}

function collectClientAddresses(data = {}) {
  const values = new Set();
  const add = (value) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      const normalized = clean(value, 1000);
      if (normalized) values.add(normalized);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(add);
      return;
    }
    if (typeof value === "object") {
      const formatted = clean(
        value.formattedAddress || value.formatted || value.locationText,
        1000
      );
      if (formatted) values.add(formatted);
      const assembled = [
        value.addressStreet || value.streetAddress || value.street || value.addressLine1,
        value.addressLine2,
        value.addressCity || value.city,
        value.addressState || value.state || value.region,
        value.addressPostalCode || value.postalCode || value.zipCode || value.zip,
        value.addressCountry || value.country,
      ]
        .map((entry) => clean(entry, 300))
        .filter(Boolean)
        .join(", ");
      if (assembled) values.add(assembled);
    }
  };
  add(resolveClientAddress(data));
  add(data.address);
  add(data.location);
  add(data.local);
  add(data.Location);
  add(data.bluefolderMatchedLocation);
  add(data.bluefolderPrimaryLocation);
  add(data.bluefolderLocations);
  return Array.from(values);
}

function addressMatchEvidence(requestValue, candidateValue) {
  const request = addressParts(requestValue);
  const candidate = addressParts(candidateValue);
  if (!request.full || !candidate.full) return null;
  if (request.full === candidate.full) {
    return {
      score: 1,
      source: "exact_address",
      evidence: `Exact normalized address: ${candidate.raw}`,
      matchedAddress: candidate.raw,
    };
  }
  if (
    request.street.length >= 6 &&
    request.street === candidate.street &&
    request.postalCode &&
    request.postalCode === candidate.postalCode
  ) {
    return {
      score: 0.99,
      source: "street_postal_address",
      evidence: `Street and postal code match: ${candidate.raw}`,
      matchedAddress: candidate.raw,
    };
  }
  const similarity = tokenSimilarity(request.full, candidate.full);
  if (
    request.number && request.number === candidate.number &&
    request.postalCode && request.postalCode === candidate.postalCode &&
    similarity >= 0.72
  ) {
    return {
      score: Math.min(0.97, 0.86 + similarity * 0.11),
      source: "normalized_address",
      evidence: `Normalized street address and postal code match: ${candidate.raw}`,
      matchedAddress: candidate.raw,
    };
  }
  if (request.number && request.number === candidate.number && similarity >= 0.82) {
    return {
      score: 0.9,
      source: "normalized_address",
      evidence: `Normalized street address matches: ${candidate.raw}`,
      matchedAddress: candidate.raw,
    };
  }
  return null;
}

function clientAliases(client = {}) {
  const data = client.data || {};
  const aliases = new Set([
    clean(client.name || data.name || data.Name || data.clientName || data.companyName, 300),
    clean(data.bluefolderLocationName, 300),
    ...(Array.isArray(client.aliases) ? client.aliases.map((value) => clean(value, 300)) : []),
  ]);
  const rows = [
    data.bluefolderMatchedLocation,
    data.bluefolderPrimaryLocation,
    ...(Array.isArray(data.bluefolderLocations) ? data.bluefolderLocations : []),
  ];
  rows.forEach((row) => {
    if (row && typeof row === "object") {
      aliases.add(clean(row.name || row.locationName, 300));
    }
  });
  return Array.from(aliases).filter(Boolean);
}

function learningKeyRows(request = {}) {
  const address = addressParts(requestAddress(request));
  const company = normalizeWords(request.companyName || request.clientName);
  const rows = [];
  if (address.full) rows.push({ kind: "full_address", value: address.full });
  if (address.street && address.postalCode) {
    rows.push({ kind: "street_postal", value: `${address.street}|${address.postalCode}` });
  }
  if (company && address.postalCode) {
    rows.push({ kind: "company_postal", value: `${company}|${address.postalCode}` });
  }
  return rows.map((row) => ({
    ...row,
    id: crypto.createHash("sha256").update(`${row.kind}:${row.value}`).digest("hex"),
  }));
}

function trailerCurrentEvidence(data = {}, id = "") {
  const name = clean(
    data.name || data.Name || data.trailerName || data.number || id,
    220
  );
  const currentClientId = referenceId(
    data.locationCurrentId || data.currentClientId || data.currentLocationClientId
  );
  const currentClientName = clean(
    data.locationCurrentName || data.currentClientName || data.currentLocationName,
    220
  );
  const currentLocationValue =
    data.locationCurrentClientLocation ||
    data.currentClientLocation ||
    data.currentLocation ||
    data.location;
  const currentLocation =
    collectClientAddresses({ location: currentLocationValue })[0] ||
    clean(currentLocationValue, 1000);
  const associatedMachineId = referenceId(
    data.associatedMachineId || data.machineId || data.machine
  );
  return {
    name,
    currentClientId,
    currentClientName,
    currentLocation,
    associatedMachineId,
    aliases: [currentClientName, currentLocation, name, clean(data.model, 220)].filter(Boolean),
  };
}

function memoryDecision(memoryRows = []) {
  const acceptedCounts = new Map();
  const rejectedIds = new Set();
  memoryRows.forEach((row) => {
    const accepted = clean(row?.acceptedClientId, 180);
    if (accepted) acceptedCounts.set(accepted, (acceptedCounts.get(accepted) || 0) + 1);
    (Array.isArray(row?.rejectedClientIds) ? row.rejectedClientIds : [])
      .map((id) => clean(id, 180))
      .filter(Boolean)
      .forEach((id) => rejectedIds.add(id));
  });
  const accepted = Array.from(acceptedCounts.entries()).sort(
    (left, right) => right[1] - left[1] || left[0].localeCompare(right[0])
  );
  return {
    acceptedClientId: accepted[0]?.[0] || "",
    acceptedStrength: accepted[0]?.[1] || 0,
    rejectedIds,
  };
}

function rankClientCandidates({ request = {}, clients = [], memoryRows = [] } = {}) {
  const requestLocation = requestAddress(request);
  const submittedCompany = normalizeWords(request.companyName || request.clientName);
  const contextText = [
    request.companyName,
    request.issueTitle,
    request.description,
    request.locationText,
    request.systemModel,
  ]
    .map((value) => clean(value, 3000))
    .filter(Boolean)
    .join(" ");
  const memory = memoryDecision(memoryRows);
  const ranked = clients
    .map((client) => {
      const id = clean(client.id, 180);
      const addresses = Array.from(
        new Set([...(client.addresses || []), ...collectClientAddresses(client.data || {})])
      ).filter(Boolean);
      let bestAddress = null;
      addresses.forEach((candidateAddress) => {
        const evidence = addressMatchEvidence(requestLocation, candidateAddress);
        if (evidence && (!bestAddress || evidence.score > bestAddress.score)) {
          bestAddress = evidence;
        }
      });
      const aliases = clientAliases(client);
      let nameScore = 0;
      let nameEvidence = "";
      aliases.forEach((alias) => {
        const aliasKey = normalizeWords(alias);
        if (!aliasKey) return;
        let score = 0;
        if (submittedCompany && submittedCompany === aliasKey) score = 0.93;
        else if (
          submittedCompany &&
          Math.min(submittedCompany.length, aliasKey.length) >= 5 &&
          (submittedCompany.includes(aliasKey) || aliasKey.includes(submittedCompany))
        ) score = 0.84;
        else {
          const overlap = tokenSimilarity(contextText, alias);
          if (overlap >= 0.67) score = 0.7 + overlap * 0.12;
        }
        if (score > nameScore) {
          nameScore = score;
          nameEvidence = `Submitted client/site context matches ${alias}.`;
        }
      });
      let score = Math.max(bestAddress?.score || 0, nameScore);
      let source = bestAddress?.source || (nameScore ? "client_site_context" : "");
      const evidence = [];
      if (bestAddress?.evidence) evidence.push(bestAddress.evidence);
      if (nameEvidence) evidence.push(nameEvidence);
      if (memory.acceptedClientId === id) {
        score = Math.max(score, Math.min(0.98, 0.92 + memory.acceptedStrength * 0.02));
        source = "reviewed_feedback";
        evidence.unshift("A prior reviewed request with the same location was assigned to this client.");
      }
      const rejected = memory.rejectedIds.has(id) && memory.acceptedClientId !== id;
      return {
        id,
        name: clean(client.name, 220),
        location: clean(client.location || addresses[0], 1000),
        client,
        confidence: Math.max(0, Math.min(1, score)),
        source,
        matchedAddress: clean(bestAddress?.matchedAddress, 1000),
        evidence: evidence.slice(0, 4),
        rejectedByFeedback: rejected,
      };
    })
    .filter((candidate) => candidate.id && !candidate.rejectedByFeedback && candidate.confidence >= 0.25)
    .sort((left, right) => right.confidence - left.confidence || left.name.localeCompare(right.name));

  const first = ranked[0] || null;
  const second = ranked[1] || null;
  const addressWinner =
    first &&
    ["exact_address", "street_postal_address", "normalized_address"].includes(first.source) &&
    (!second || first.confidence - second.confidence >= 0.03);
  const clearContextWinner = first && first.confidence >= 0.78 && (!second || first.confidence - second.confidence >= 0.12);
  const learnedWinner = first && first.source === "reviewed_feedback" && (!second || first.confidence > second.confidence);
  const suggestion = addressWinner || clearContextWinner || learnedWinner ? first : null;
  return {
    suggestion,
    candidates: ranked.slice(0, 8),
    needsAi: !suggestion && ranked.length > 0,
    learningKeys: learningKeyRows(request),
  };
}

function rankMachineCandidates({ request = {}, machines = [], clientId = "" } = {}) {
  const normalizedClientId = clean(clientId, 180);
  const requestLocation = requestAddress(request);
  const issueContext = normalizeWords(
    [request.systemModel, request.manufacturer, request.modality, request.issueTitle, request.description]
      .filter(Boolean)
      .join(" ")
  );
  const linked = machines.filter((machine) =>
    (Array.isArray(machine.clientIds) ? machine.clientIds : []).includes(normalizedClientId)
  );
  const ranked = linked
    .map((machine) => {
      const labels = [
        machine.name,
        machine.label,
        machine.model,
        machine.oem,
        machine.modality,
        ...(Array.isArray(machine.aliases) ? machine.aliases : []),
      ]
        .map((value) => clean(value, 300))
        .filter(Boolean);
      let score = 0;
      let source = "";
      const evidence = [];
      const addressEvidence = addressMatchEvidence(requestLocation, machine.location || "");
      if (addressEvidence) {
        score = addressEvidence.score;
        source = "machine_address";
        evidence.push(`System location matches the request address: ${clean(machine.location, 500)}.`);
      }
      labels.forEach((label) => {
        const key = normalizeWords(label);
        if (!key) return;
        if (issueContext.includes(key) && key.length >= 3) {
          const next = key.split(" ").length >= 2 ? 0.94 : 0.78;
          if (next > score) source = "machine_context";
          score = Math.max(score, next);
          evidence.push(`Request details identify ${label}.`);
        }
      });
      return {
        id: clean(machine.id, 180),
        name: clean(machine.name, 220),
        label: clean(machine.label || machine.name, 500),
        location: clean(machine.location, 1000),
        machine,
        confidence: Math.max(0, Math.min(1, score)),
        source,
        evidence: Array.from(new Set(evidence)).slice(0, 4),
      };
    })
    .sort((left, right) => right.confidence - left.confidence || left.label.localeCompare(right.label));
  if (linked.length === 1 && (!ranked[0] || ranked[0].confidence < 0.82)) {
    ranked[0] = {
      ...(ranked[0] || {
        id: clean(linked[0].id, 180),
        name: clean(linked[0].name, 220),
        label: clean(linked[0].label || linked[0].name, 500),
        location: clean(linked[0].location, 1000),
        machine: linked[0],
      }),
      confidence: 0.82,
      source: "unique_client_machine",
      evidence: ["This is the only machine/trailer linked to the suggested client."],
    };
  }
  const first = ranked[0] || null;
  const second = ranked[1] || null;
  const suggestion = first && first.confidence >= 0.78 && (!second || first.confidence - second.confidence >= 0.1)
    ? first
    : null;
  return { suggestion, candidates: ranked.slice(0, 8) };
}

module.exports = {
  CONTRACT_VERSION,
  addressMatchEvidence,
  addressParts,
  clean,
  collectClientAddresses,
  learningKeyRows,
  normalizePostalCode,
  normalizeWords,
  rankClientCandidates,
  rankMachineCandidates,
  referenceId,
  requestAddress,
  trailerCurrentEvidence,
  tokenSimilarity,
};
