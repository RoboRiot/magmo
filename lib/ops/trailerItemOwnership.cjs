const crypto = require("node:crypto");

const {
  clean,
  clientIdFromRecord,
  machineTrailerIndex,
  referenceId,
  sourceTrailerIndex,
  trailerIdFromRecord,
} = require("./trailerMigration.cjs");

const SYNTHETIC_TRAILER_CLIENT_ID = "AIS62854";

const BRANCH_FIELDS = {
  from: {
    client: [
      "ClientFrom",
      "fromClient",
      "clientFrom",
      "Client",
      "fromClientId",
      "clientFromId",
    ],
    machineRefs: ["MachineFrom", "Machine", "fromMachine"],
    machineIds: ["fromMachineId", "machineFromId", "machineId"],
    machineTarget: "MachineFrom",
    trailerTarget: "TrailerFrom",
    trailerIdTarget: "trailerFromId",
  },
  current: {
    client: [
      "ClientCurrent",
      "currentClient",
      "clientCurrent",
      "currentClientId",
      "clientCurrentId",
    ],
    machineRefs: ["MachineCurrent", "CurrentMachine", "currentMachine"],
    machineIds: ["currentMachineId", "machineCurrentId"],
    machineTarget: "MachineCurrent",
    trailerTarget: "TrailerCurrent",
    trailerIdTarget: "trailerCurrentId",
  },
};

function branchMachineId(record = {}, branch = "current") {
  const fields = BRANCH_FIELDS[branch] || BRANCH_FIELDS.current;
  for (const field of fields.machineRefs) {
    const id = referenceId(record?.[field]);
    if (id) return id;
  }
  for (const field of fields.machineIds) {
    const id = clean(record?.[field], 180);
    if (id) return id;
  }
  return "";
}

function collectTextValues(value, path = "", output = [], depth = 0) {
  if (depth > 8 || output.length >= 1000 || value == null) return output;
  if (typeof value === "string") {
    const text = value.trim();
    if (text && text.length <= 10000) output.push({ path, text });
    return output;
  }
  if (Array.isArray(value)) {
    value.slice(0, 500).forEach((entry, index) =>
      collectTextValues(entry, `${path}[${index}]`, output, depth + 1)
    );
    return output;
  }
  if (typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      if (
        [
          "photos",
          "images",
          "imageAnalysis",
          "selectionHistory",
          "TheMachine",
          "machineData",
          "currentMachineData",
          "nameLower",
          "nameTokens",
          "generalSearchTokens",
          "searchTokens",
        ].includes(key)
      ) {
        continue;
      }
      collectTextValues(nested, path ? `${path}.${key}` : key, output, depth + 1);
      if (output.length >= 1000) break;
    }
  }
  return output;
}

function explicitTrailerTextEvidence(record = {}) {
  const evidence = [];
  const trailerPatterns = [
    /\btrailer\s*(?:#|no\.?\s*)?(?:ais\s*[-_#]?\s*)?(\d{1,3})\b/gi,
    /\bais\s*[-_#]?\s*(\d{1,3})\s+trailer\b/gi,
  ];
  const directionPattern = /\b(from|for|to|in|going\s+to|shipped\s+to)\b/gi;
  for (const entry of collectTextValues(record)) {
    for (const pattern of trailerPatterns) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(entry.text)) !== null) {
        const prefixStart = Math.max(0, match.index - 100);
        const prefix = entry.text.slice(prefixStart, match.index);
        directionPattern.lastIndex = 0;
        const directions = [...prefix.matchAll(directionPattern)];
        const nearest = directions[directions.length - 1];
        if (!nearest) continue;
        const distance = prefix.length - (nearest.index + nearest[0].length);
        if (distance > 80) continue;
        const intervening = prefix.slice(nearest.index + nearest[0].length);
        if (/[.;!?]/.test(intervening)) continue;
        const verb = String(nearest[1] || "")
          .toLowerCase()
          .replace(/\s+/g, " ");
        evidence.push({
          branch: verb === "from" ? "from" : "current",
          number: Number(match[1]),
          path: entry.path,
          phrase: entry.text.slice(
            prefixStart + nearest.index,
            match.index + match[0].length
          ),
        });
      }
    }
  }
  return evidence.filter(
    (entry, index, entries) =>
      entries.findIndex(
        (candidate) =>
          candidate.branch === entry.branch &&
          candidate.number === entry.number &&
          candidate.path === entry.path &&
          candidate.phrase.toLowerCase() === entry.phrase.toLowerCase()
      ) === index
  );
}

function possibleTrailerTextEvidence(record = {}) {
  const evidence = [];
  const patterns = [
    /\btrailer\s*(?:#|no\.?\s*)?(?:ais\s*[-_#]?\s*)?(\d{1,3})\b/gi,
    /\bais\s*[-_#]?\s*(\d{1,3})\s+trailer\b/gi,
    /\b(from|for|to|in)\s+(?:the\s+)?ais\s*[-_#]?\s*(\d{1,3})\b/gi,
  ];
  for (const entry of collectTextValues(record)) {
    for (const [patternIndex, pattern] of patterns.entries()) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(entry.text)) !== null) {
        const shorthand = patternIndex === 2;
        const verb = shorthand ? String(match[1] || "").toLowerCase() : "";
        const number = Number(shorthand ? match[2] : match[1]);
        evidence.push({
          branch: verb ? (verb === "from" ? "from" : "current") : "",
          number,
          path: entry.path,
          phrase: match[0],
          reason: verb
            ? "AIS shorthand does not explicitly say trailer"
            : "trailer is mentioned without an ownership direction",
        });
      }
    }
  }
  return evidence.filter(
    (entry, index, entries) =>
      entries.findIndex(
        (candidate) =>
          candidate.branch === entry.branch &&
          candidate.number === entry.number &&
          candidate.path === entry.path &&
          candidate.phrase.toLowerCase() === entry.phrase.toLowerCase()
      ) === index
  );
}

function trailerMachineIds(group = {}) {
  return Array.from(
    new Set(
      (group.sources || [])
        .map(
          (record) =>
            referenceId(record?.associatedMachine) ||
            clean(record?.associatedMachineId, 180)
        )
        .filter(Boolean)
    )
  );
}

function ownershipState(record = {}) {
  const output = {};
  const fields = Array.from(
    new Set(
      Object.values(BRANCH_FIELDS).flatMap((branch) => [
        ...branch.client,
        ...branch.machineRefs,
        ...branch.machineIds,
        branch.machineTarget,
        branch.trailerTarget,
        branch.trailerIdTarget,
      ])
    )
  ).sort();
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) continue;
    const value = record[field];
    const refId = referenceId(value);
    output[field] = refId
      ? { referenceId: refId, path: clean(value?.path, 500) }
      : value ?? null;
  }
  return output;
}

function ownershipFingerprint(record = {}) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(ownershipState(record)))
    .digest("hex");
}

function canonicalTrailerId(rawId, sourceIndex) {
  const id = clean(rawId, 180);
  if (!id) return "";
  return sourceIndex.get(id) || "";
}

function addCandidate(candidates, canonicalId, evidence) {
  if (!canonicalId) return;
  if (!candidates.has(canonicalId)) candidates.set(canonicalId, []);
  candidates.get(canonicalId).push(evidence);
}

function resolvedBranchOwnership({
  branch,
  canonicalId,
  currentRecord,
  groupsByCanonicalId,
  evidence,
  reviewReasons = [],
  machineOverrideId = "",
}) {
  const group = groupsByCanonicalId.get(canonicalId);
  const machineIds = trailerMachineIds(group);
  const nextReviewReasons = [...reviewReasons];
  if (machineIds.length > 1) {
    nextReviewReasons.push(
      `trailer ${canonicalId} has multiple associated machines: ${machineIds.join(", ")}`
    );
  }

  const fields = BRANCH_FIELDS[branch];
  const currentMachineId = branchMachineId(currentRecord, branch);
  const reviewedMachineId = clean(machineOverrideId, 180);
  const effectiveMachineId =
    reviewedMachineId || currentMachineId || (machineIds.length === 1 ? machineIds[0] : "");
  const setReferences = {
    [fields.trailerTarget]: `Trailers/${canonicalId}`,
  };
  const setValues = { [fields.trailerIdTarget]: canonicalId };
  // Existing machine associations can represent an earlier system that was in
  // the same trailer. Preserve them. Only fill the trailer's current machine
  // when the item branch has no machine at all.
  if (reviewedMachineId && reviewedMachineId !== currentMachineId) {
    setReferences[fields.machineTarget] = `Machine/${reviewedMachineId}`;
  } else if (!currentMachineId && machineIds.length === 1) {
    setReferences[fields.machineTarget] = `Machine/${machineIds[0]}`;
  }

  const deleteFields = fields.client.filter((field) =>
    Object.prototype.hasOwnProperty.call(currentRecord, field)
  );
  const changed =
    trailerIdFromRecord(currentRecord, branch) !== canonicalId ||
    (reviewedMachineId && reviewedMachineId !== currentMachineId) ||
    (!currentMachineId && machineIds.length === 1) ||
    deleteFields.length > 0;

  return {
    branch,
    status: nextReviewReasons.length ? "review" : changed ? "change" : "correct",
    canonicalTrailerId: canonicalId,
    candidateTrailerIds: [canonicalId],
    associatedMachineId: effectiveMachineId,
    evidence,
    reviewReasons: nextReviewReasons,
    setReferences,
    setValues,
    deleteFields,
  };
}

function planBranch({
  branch,
  currentRecord = {},
  originalRecord = {},
  sourceIndex,
  machineIndex,
  trailerByNumber,
  groupsByCanonicalId,
}) {
  const candidates = new Map();
  const possibleCandidates = new Map();
  const unresolvedEvidence = [];

  for (const [snapshot, record] of [
    ["current", currentRecord],
    ["original", originalRecord],
  ]) {
    const storedTrailerId = trailerIdFromRecord(record, branch);
    if (storedTrailerId) {
      const canonicalId = canonicalTrailerId(storedTrailerId, sourceIndex);
      if (canonicalId) {
        addCandidate(candidates, canonicalId, {
          type: "stored-trailer",
          snapshot,
          value: storedTrailerId,
        });
      } else {
        unresolvedEvidence.push(
          `${snapshot} stored trailer ${storedTrailerId} is not in the canonical trailer directory`
        );
      }
    }

    const machineId = branchMachineId(record, branch);
    if (machineId) {
      const matches = machineIndex.get(machineId) || [];
      if (matches.length === 1) {
        addCandidate(candidates, matches[0], {
          type: "unique-trailer-machine",
          snapshot,
          value: machineId,
        });
      } else if (matches.length > 1) {
        unresolvedEvidence.push(
          `${snapshot} machine ${machineId} maps to multiple trailers: ${matches.join(", ")}`
        );
      }
    }
  }

  for (const [snapshot, record] of [
    ["current", currentRecord],
    ["original", originalRecord],
  ]) {
    explicitTrailerTextEvidence(record)
      .filter((entry) => entry.branch === branch)
      .forEach((entry) => {
        const canonicalId = trailerByNumber.get(entry.number) || "";
        if (canonicalId) {
          addCandidate(candidates, canonicalId, {
            type: "explicit-text",
            snapshot,
            value: entry.phrase,
            path: entry.path,
          });
        } else {
          unresolvedEvidence.push(
            `${snapshot} text names Trailer AIS${entry.number}, but no canonical trailer record exists`
          );
        }
      });
  }

  for (const [snapshot, record] of [
    ["current", currentRecord],
    ["original", originalRecord],
  ]) {
    const explicitEntries = explicitTrailerTextEvidence(record);
    possibleTrailerTextEvidence(record)
      .filter((entry) => !entry.branch || entry.branch === branch)
      .forEach((entry) => {
        if (
          explicitEntries.some(
            (explicitEntry) =>
              explicitEntry.number === entry.number &&
              explicitEntry.path === entry.path
          )
        ) {
          return;
        }
        const canonicalId = trailerByNumber.get(entry.number) || "";
        if (!canonicalId || candidates.has(canonicalId)) return;
        addCandidate(possibleCandidates, canonicalId, {
          type: "possible-text",
          snapshot,
          value: entry.phrase,
          path: entry.path,
          reason: entry.reason,
        });
      });
  }

  const candidateIds = [...candidates.keys()].sort((left, right) =>
    left.localeCompare(right, "en", { numeric: true })
  );
  const possibleCandidateIds = [...possibleCandidates.keys()].sort((left, right) =>
    left.localeCompare(right, "en", { numeric: true })
  );
  if (candidateIds.length !== 1) {
    const allCandidateIds = Array.from(
      new Set([...candidateIds, ...possibleCandidateIds])
    ).sort((left, right) => left.localeCompare(right, "en", { numeric: true }));
    return {
      branch,
      status:
        candidateIds.length > 1 ||
        possibleCandidateIds.length ||
        unresolvedEvidence.length ||
        (!allCandidateIds.length &&
          [currentRecord, originalRecord].some(
            (record) =>
              clientIdFromRecord(record, branch) === SYNTHETIC_TRAILER_CLIENT_ID
          ))
          ? "review"
          : "none",
      candidateTrailerIds: allCandidateIds,
      evidence: Object.fromEntries(
        [...candidates.entries(), ...possibleCandidates.entries()]
      ),
      reviewReasons: [
        ...(candidateIds.length > 1
          ? [`conflicting trailer evidence: ${candidateIds.join(", ")}`]
          : []),
        ...(possibleCandidateIds.length
          ? [
              `possible trailer text requires branch confirmation: ${possibleCandidateIds.join(", ")}`,
            ]
          : []),
        ...(!allCandidateIds.length &&
        [currentRecord, originalRecord].some(
          (record) => clientIdFromRecord(record, branch) === SYNTHETIC_TRAILER_CLIENT_ID
        )
          ? [
              "item branch is linked to the legacy AIS TRAILERS client but has no evidence identifying which trailer",
            ]
          : []),
        ...unresolvedEvidence,
      ],
      setReferences: {},
      setValues: {},
      deleteFields: [],
    };
  }

  const canonicalId = candidateIds[0];
  return resolvedBranchOwnership({
    branch,
    canonicalId,
    currentRecord,
    groupsByCanonicalId,
    evidence: Object.fromEntries(candidates),
    reviewReasons: unresolvedEvidence,
  });
}

function planItemTrailerOwnership({
  id,
  currentRecord = {},
  originalRecord = {},
  sourceIndex,
  machineIndex,
  trailerByNumber,
  groupsByCanonicalId,
  reviewedOverrides = {},
}) {
  const branches = ["from", "current"].map((branch) =>
    planBranch({
      branch,
      currentRecord,
      originalRecord,
      sourceIndex,
      machineIndex,
      trailerByNumber,
      groupsByCanonicalId,
    })
  );
  const itemOverrides = reviewedOverrides?.[id] || {};
  for (let index = 0; index < branches.length; index += 1) {
    const branch = branches[index];
    const override = itemOverrides?.[branch.branch];
    if (!override) continue;
    if (override.decision === "no-active-trailer") {
      branches[index] = {
        ...branch,
        status: "none",
        canonicalTrailerId: "",
        candidateTrailerIds: [],
        evidence: {
          reviewedOverride: [
            { type: "reviewed-override", value: override.reason || "reviewed" },
          ],
        },
        reviewReasons: [],
        setReferences: {},
        setValues: {},
        deleteFields: [],
      };
      continue;
    }
    const canonicalId = clean(override.trailerId, 180);
    if (!groupsByCanonicalId.has(canonicalId)) {
      branches[index] = {
        ...branch,
        status: "review",
        reviewReasons: [
          `reviewed override names missing canonical trailer ${canonicalId}`,
        ],
      };
      continue;
    }
    branches[index] = resolvedBranchOwnership({
      branch: branch.branch,
      canonicalId,
      currentRecord,
      groupsByCanonicalId,
      evidence: {
        reviewedOverride: [
          { type: "reviewed-override", value: override.reason || "reviewed" },
        ],
      },
      machineOverrideId: override.machineId,
    });
  }
  for (const branch of branches) {
    if (branch.status !== "review") continue;
    const onlyPossibleText = Object.values(branch.evidence || {})
      .flat()
      .every((entry) => entry.type === "possible-text");
    if (!onlyPossibleText) continue;
    const otherBranch = branches.find((candidate) => candidate !== branch);
    const otherTrailerId = otherBranch?.canonicalTrailerId || "";
    if (
      otherTrailerId &&
      branch.candidateTrailerIds.length === 1 &&
      branch.candidateTrailerIds[0] === otherTrailerId
    ) {
      branch.status = "none";
      branch.reviewReasons = [];
      branch.suppressedReason =
        `directionless text for ${otherTrailerId} corroborates the ${otherBranch.branch} branch`;
    }
  }
  const changedBranches = branches.filter((branch) => branch.status === "change");
  const reviewBranches = branches.filter((branch) => branch.status === "review");
  const setReferences = Object.assign(
    {},
    ...changedBranches.map((branch) => branch.setReferences)
  );
  const setValues = Object.assign(
    {},
    ...changedBranches.map((branch) => branch.setValues)
  );
  const deleteFields = Array.from(
    new Set(changedBranches.flatMap((branch) => branch.deleteFields))
  ).sort();
  return {
    id: clean(id, 180),
    name: clean(currentRecord.name || currentRecord.Name, 300),
    status: reviewBranches.length
      ? "review"
      : changedBranches.length
        ? "change"
        : branches.some((branch) => branch.status === "correct")
          ? "correct"
          : "none",
    beforeFingerprint: ownershipFingerprint(currentRecord),
    branches,
    patch: { setReferences, setValues, deleteFields },
  };
}

function buildTrailerOwnershipIndexes(groups = []) {
  const sourceIndex = sourceTrailerIndex(groups);
  const machineIndex = machineTrailerIndex(groups);
  const trailerByNumber = new Map();
  const groupsByCanonicalId = new Map();
  for (const group of groups) {
    if (!group?.canonicalId || group.conflict) continue;
    groupsByCanonicalId.set(group.canonicalId, group);
    if (Number.isInteger(group.number) && group.number > 0) {
      trailerByNumber.set(group.number, group.canonicalId);
    }
  }
  return { sourceIndex, machineIndex, trailerByNumber, groupsByCanonicalId };
}

module.exports = {
  BRANCH_FIELDS,
  branchMachineId,
  buildTrailerOwnershipIndexes,
  collectTextValues,
  explicitTrailerTextEvidence,
  ownershipFingerprint,
  ownershipState,
  planItemTrailerOwnership,
  possibleTrailerTextEvidence,
  trailerMachineIds,
};
