import { OpenAI } from "openai";
import { getStorage } from "firebase-admin/storage";
import { adminDb } from "../../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  ITEM_VISION_INDEX_COLLECTION,
  buildItemVisionIndexRecord,
  buildVisionSearchTokens,
  normalizePartNumberKey,
  normalizeVisionIndexCandidate,
  normalizeVisionSearchText,
} from "../../../utils/itemVisionIndex";
import {
  lookupOfficialOemItem,
  resolveOfficialOemDomains,
} from "../../../lib/ai/oemItemLookup";

const ITEM_VISION_MODEL =
  process.env.ITEM_VISION_MODEL || process.env.ASK_MAGMO_MODEL || "gpt-5.5";
const OPENAI_TIMEOUT_MS = Number(
  process.env.ITEM_VISION_OPENAI_TIMEOUT_MS || 90000
);
const MAX_IMAGES = Number(process.env.ITEM_VISION_MAX_IMAGES || 4);
const MAX_IMAGE_CHARS = Number(
  process.env.ITEM_VISION_MAX_IMAGE_CHARS || 4000000
);
const MAX_TOTAL_IMAGE_CHARS = Number(
  process.env.ITEM_VISION_MAX_TOTAL_IMAGE_CHARS || 12000000
);
const SEARCH_RESULT_LIMIT = Number(
  process.env.ITEM_VISION_SEARCH_RESULT_LIMIT || 60
);
const FINAL_CANDIDATE_LIMIT = Number(
  process.env.ITEM_VISION_FINAL_CANDIDATES || 6
);
const CANDIDATE_IMAGE_LIMIT = Number(
  process.env.ITEM_VISION_CANDIDATE_IMAGES || 3
);
const RATE_LIMIT_PER_MINUTE = Number(
  process.env.ITEM_VISION_RATE_LIMIT_PER_MINUTE || 10
);
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const STOP_TOKENS = new Set([
  "and",
  "for",
  "from",
  "item",
  "label",
  "medical",
  "part",
  "the",
  "this",
  "unit",
  "with",
]);

const OBSERVATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    labelFound: { type: "boolean" },
    confidence: { type: "number" },
    partNumbers: { type: "array", items: { type: "string" } },
    serialNumbers: { type: "array", items: { type: "string" } },
    manufacturerNames: { type: "array", items: { type: "string" } },
    modelNumbers: { type: "array", items: { type: "string" } },
    visibleText: { type: "array", items: { type: "string" } },
    searchTerms: { type: "array", items: { type: "string" } },
    itemNameGuess: { type: "string" },
    itemType: { type: "string" },
    oem: { type: "string" },
    modality: { type: "string" },
    model: { type: "string" },
    visualDescription: { type: "string" },
    distinguishingFeatures: { type: "array", items: { type: "string" } },
  },
  required: [
    "labelFound",
    "confidence",
    "partNumbers",
    "serialNumbers",
    "manufacturerNames",
    "modelNumbers",
    "visibleText",
    "searchTerms",
    "itemNameGuess",
    "itemType",
    "oem",
    "modality",
    "model",
    "visualDescription",
    "distinguishingFeatures",
  ],
};

const MATCH_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    topMatchId: { type: "string" },
    confidence: { type: "number" },
    isLikelySameItem: { type: "boolean" },
    matchedPartNumber: { type: "string" },
    reasons: { type: "array", items: { type: "string" } },
    warnings: { type: "array", items: { type: "string" } },
    rankedCandidateIds: { type: "array", items: { type: "string" } },
  },
  required: [
    "topMatchId",
    "confidence",
    "isLikelySameItem",
    "matchedPartNumber",
    "reasons",
    "warnings",
    "rankedCandidateIds",
  ],
};

const globalRateLimitKey = "__magmoItemVisionRateLimits";
const rateLimitStore =
  global[globalRateLimitKey] || (global[globalRateLimitKey] = new Map());

function clampConfidence(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(1, number));
}

function enforceRateLimit(key) {
  if (RATE_LIMIT_PER_MINUTE <= 0) return;
  const now = Date.now();
  const windowStart = now - 60 * 1000;
  const previous = (rateLimitStore.get(key) || []).filter(
    (timestamp) => timestamp >= windowStart
  );
  if (previous.length >= RATE_LIMIT_PER_MINUTE) {
    const error = new Error("Too many image analyses. Please wait a minute.");
    error.status = 429;
    error.code = "item_vision_rate_limit";
    throw error;
  }
  previous.push(now);
  rateLimitStore.set(key, previous);
}

function getClientIp(req) {
  const forwarded = String(req.headers?.["x-forwarded-for"] || "");
  return (
    forwarded.split(",")[0]?.trim() ||
    String(req.headers?.["x-real-ip"] || "").trim() ||
    String(req.socket?.remoteAddress || "unknown")
  );
}

function extractResponseText(response) {
  if (response?.output_text) return response.output_text.trim();
  const parts = [];
  for (const output of response?.output || []) {
    for (const content of output?.content || []) {
      if (content?.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseStructuredResponse(response, label) {
  const text = extractResponseText(response);
  if (!text) throw new Error(`OpenAI returned no ${label} data.`);
  try {
    return JSON.parse(text);
  } catch (error) {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      throw new Error(`OpenAI returned invalid ${label} data.`);
    }
  }
}

function getTextConfig(schema, name) {
  return {
    verbosity: "low",
    format: {
      type: "json_schema",
      name,
      strict: true,
      schema,
    },
  };
}

function getModelControls() {
  if (!String(ITEM_VISION_MODEL).startsWith("gpt-5")) return {};
  return {
    reasoning: {
      effort: process.env.ITEM_VISION_REASONING_EFFORT || "low",
    },
  };
}

function validateImages(rawImages) {
  if (!Array.isArray(rawImages) || rawImages.length === 0) {
    const error = new Error("Add at least one photo before analyzing.");
    error.status = 400;
    error.code = "item_vision_images_required";
    throw error;
  }

  let totalChars = 0;
  const images = rawImages.slice(0, MAX_IMAGES).map((entry) => {
    const imageUrl = String(
      typeof entry === "string"
        ? entry
        : entry?.dataUrl || entry?.imageUrl || entry?.url || ""
    ).trim();
    const isDataImage = /^data:image\/(?:jpeg|jpg|png|webp|gif);base64,/i.test(
      imageUrl
    );
    const isRemoteImage = /^https:\/\//i.test(imageUrl);
    if (!isDataImage && !isRemoteImage) {
      const error = new Error("One of the selected photos could not be read.");
      error.status = 400;
      error.code = "item_vision_invalid_image";
      throw error;
    }
    if (imageUrl.length > MAX_IMAGE_CHARS) {
      const error = new Error("One photo is too large to analyze.");
      error.status = 413;
      error.code = "item_vision_image_too_large";
      throw error;
    }
    totalChars += imageUrl.length;
    return imageUrl;
  });

  if (totalChars > MAX_TOTAL_IMAGE_CHARS) {
    const error = new Error("The selected photos are too large to analyze together.");
    error.status = 413;
    error.code = "item_vision_images_too_large";
    throw error;
  }
  return images;
}

function imageContent(images, firstDetail = "high") {
  return images.map((imageUrl, index) => ({
    type: "input_image",
    image_url: imageUrl,
    detail: index === 0 ? firstDetail : "auto",
  }));
}

async function observeItem(client, images, hints) {
  const response = await client.responses.create({
    model: ITEM_VISION_MODEL,
    store: false,
    input: [
      {
        role: "system",
        content:
          "You identify inventory parts for an internal medical-imaging equipment catalog. " +
          "Treat all photos as views of the same physical item. Read labels carefully. " +
          "A part number (PN, P/N, part no., material number) is the strongest identifier. " +
          "Do not call a serial number, date, voltage, patent, asset tag, or barcode payload a part number unless the label supports it. " +
          "Preserve punctuation in identifiers. Never invent unreadable text. " +
          "Use the other views to describe shape, connectors, color, mounting features, and likely item type. " +
          "Choose short searchTerms that are likely to occur in an existing inventory item name or description.",
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              "Analyze these photos. Extract every plausible PN separately, then summarize the visual identity for catalog retrieval. " +
              "These user-selected fields are optional hints and are not visually confirmed; do not let them override readable label evidence:\n" +
              JSON.stringify(hints),
          },
          ...imageContent(images),
        ],
      },
    ],
    text: getTextConfig(OBSERVATION_SCHEMA, "item_photo_observation"),
    max_output_tokens: Number(process.env.ITEM_VISION_OBSERVE_TOKENS || 1800),
    ...getModelControls(),
  });
  const observation = parseStructuredResponse(response, "photo observation");
  observation.confidence = clampConfidence(observation.confidence);
  return observation;
}

function uniqueStrings(values) {
  const seen = new Set();
  const result = [];
  (values || []).forEach((value) => {
    const text = String(value || "").trim();
    const key = text.toLowerCase();
    if (!text || seen.has(key)) return;
    seen.add(key);
    result.push(text);
  });
  return result;
}

function validateHints(rawHints) {
  const cleanValues = (value) =>
    uniqueStrings(Array.isArray(value) ? value : value ? [value] : [])
      .map((entry) => entry.slice(0, 100))
      .slice(0, 5);
  return {
    oem: cleanValues(rawHints?.oem),
    modality: cleanValues(rawHints?.modality),
    model: cleanValues(rawHints?.model),
  };
}

function hasSelectedHints(hints) {
  return Boolean(hints?.oem?.length || hints?.modality?.length || hints?.model?.length);
}

function buildObservationSearch(observation, hints) {
  const partNumbers = uniqueStrings(observation.partNumbers || []);
  const modelNumbers = uniqueStrings(observation.modelNumbers || []);
  const pseudoItem = {
    name: [observation.itemNameGuess, observation.itemType]
      .filter(Boolean)
      .join(" "),
    pn: partNumbers,
    TheMachine: {
      OEM:
        hints.oem?.[0] ||
        observation.oem ||
        observation.manufacturerNames?.[0] ||
        "",
      Modality: hints.modality?.[0] || observation.modality || "",
      Model:
        hints.model?.[0] || observation.model || observation.modelNumbers?.[0] || "",
    },
    descriptions: [
      {
        description: [
          observation.visualDescription,
          ...(observation.distinguishingFeatures || []),
          ...(observation.searchTerms || []),
          ...(observation.manufacturerNames || []),
          ...modelNumbers,
          ...(hints.oem || []),
          ...(hints.modality || []),
          ...(hints.model || []),
        ]
          .filter(Boolean)
          .join(" "),
      },
    ],
    visionSearchTerms: observation.searchTerms || [],
  };

  const tokens = buildVisionSearchTokens(pseudoItem)
    .filter((token) => !STOP_TOKENS.has(token))
    .sort((left, right) => {
      const leftSpecific = /\d/.test(left) ? 1 : 0;
      const rightSpecific = /\d/.test(right) ? 1 : 0;
      if (leftSpecific !== rightSpecific) return rightSpecific - leftSpecific;
      if (left.includes(" ") !== right.includes(" ")) {
        return left.includes(" ") ? -1 : 1;
      }
      return right.length - left.length;
    });

  return {
    partNumbers,
    partNumberKeys: uniqueStrings(partNumbers.map(normalizePartNumberKey)),
    tokens: uniqueStrings(tokens).slice(0, 10),
  };
}

async function runQueries(queries) {
  const settled = await Promise.allSettled(queries.map((query) => query.get()));
  const docs = [];
  settled.forEach((result) => {
    if (result.status === "fulfilled") docs.push(...result.value.docs);
  });
  return docs;
}

async function findCandidates(observation, hints) {
  const search = buildObservationSearch(observation, hints);
  const indexCollection = adminDb.collection(ITEM_VISION_INDEX_COLLECTION);
  const sourceCollection = adminDb.collection("Test");
  const indexQueries = [];
  const sourceQueries = [];

  search.partNumberKeys.slice(0, 6).forEach((partNumberKey) => {
    indexQueries.push(
      indexCollection
        .where("partNumberKeys", "array-contains", partNumberKey)
        .limit(20)
    );
  });
  [
    ["oem", hints.oem],
    ["modality", hints.modality],
    ["model", hints.model],
  ].forEach(([field, values]) => {
    if (!values?.length) return;
    indexQueries.push(
      indexCollection
        .where(field, "array-contains-any", values.slice(0, 5))
        .limit(SEARCH_RESULT_LIMIT)
    );
  });
  if (search.tokens.length) {
    indexQueries.push(
      indexCollection
        .where("searchTokens", "array-contains-any", search.tokens)
        .limit(SEARCH_RESULT_LIMIT)
    );
    sourceQueries.push(
      sourceCollection
        .where("generalSearchTokens", "array-contains-any", search.tokens)
        .limit(SEARCH_RESULT_LIMIT)
    );
    sourceQueries.push(
      sourceCollection
        .where("nameTokens", "array-contains-any", search.tokens)
        .limit(SEARCH_RESULT_LIMIT)
    );
  }

  search.partNumbers.slice(0, 6).forEach((partNumber) => {
    uniqueStrings([
      partNumber,
      partNumber.toUpperCase(),
      partNumber.toLowerCase(),
    ]).forEach((variant) => {
      sourceQueries.push(
        sourceCollection.where("pn", "array-contains", variant).limit(20)
      );
      sourceQueries.push(sourceCollection.where("pn", "==", variant).limit(20));
    });
  });

  const indexDocs = await runQueries(indexQueries);
  // The compact index is the normal path. Query the larger source collection only
  // if the index has no usable result (for example, during initial deployment).
  const sourceDocs = indexDocs.length ? [] : await runQueries(sourceQueries);
  const candidates = new Map();

  indexDocs.forEach((doc) => {
    const candidate = normalizeVisionIndexCandidate({ id: doc.id, ...doc.data() });
    if (candidate.id) candidates.set(candidate.id, candidate);
  });
  sourceDocs.forEach((doc) => {
    const sourceRecord = buildItemVisionIndexRecord(doc.data() || {}, doc.id, {
      updatedAt: "",
    });
    const candidate = normalizeVisionIndexCandidate(sourceRecord);
    if (!candidate.id) return;
    const existing = candidates.get(candidate.id);
    candidates.set(candidate.id, existing ? { ...candidate, ...existing } : candidate);
  });

  return {
    candidates: Array.from(candidates.values()),
    search,
    indexHits: indexDocs.length,
    sourceHits: sourceDocs.length,
  };
}

function normalizedSet(values) {
  return new Set(
    (values || []).map(normalizeVisionSearchText).filter(Boolean)
  );
}

function setsOverlap(left, right) {
  for (const value of left) {
    if (right.has(value)) return true;
  }
  return false;
}

function scoreCandidate(candidate, observation, search, hints) {
  let score = 0;
  const candidatePnKeys = new Set(
    [
      ...(candidate.partNumberKeys || []),
      ...(candidate.partNumbers || []).map(normalizePartNumberKey),
    ].filter(Boolean)
  );
  const exactPartNumber = search.partNumberKeys.find((key) =>
    candidatePnKeys.has(key)
  );
  if (exactPartNumber) score += 1200;

  const candidateTokens = new Set(candidate.searchTokens || []);
  search.tokens.forEach((token) => {
    if (candidateTokens.has(token)) score += /\d/.test(token) ? 60 : 22;
  });

  const observedOem = normalizedSet([
    observation.oem,
    ...(observation.manufacturerNames || []),
  ]);
  const observedModality = normalizedSet([observation.modality]);
  const observedModel = normalizedSet([
    observation.model,
    ...(observation.modelNumbers || []),
  ]);
  if (setsOverlap(observedOem, normalizedSet(candidate.oem))) score += 90;
  if (setsOverlap(observedModality, normalizedSet(candidate.modality))) score += 65;
  if (setsOverlap(observedModel, normalizedSet(candidate.model))) score += 130;

  if (setsOverlap(normalizedSet(hints.oem), normalizedSet(candidate.oem))) {
    score += 100;
  }
  if (
    setsOverlap(normalizedSet(hints.modality), normalizedSet(candidate.modality))
  ) {
    score += 80;
  }
  if (setsOverlap(normalizedSet(hints.model), normalizedSet(candidate.model))) {
    score += 160;
  }

  const observedNameTokens = new Set(
    normalizeVisionSearchText(
      `${observation.itemNameGuess || ""} ${observation.itemType || ""}`
    )
      .split(" ")
      .filter((token) => token.length >= 2)
  );
  const candidateNameTokens = new Set(
    normalizeVisionSearchText(candidate.name).split(" ").filter(Boolean)
  );
  observedNameTokens.forEach((token) => {
    if (candidateNameTokens.has(token)) score += 30;
  });

  return { ...candidate, heuristicScore: score, exactPartNumber };
}

function rankCandidates(candidates, observation, search, hints) {
  return candidates
    .map((candidate) => scoreCandidate(candidate, observation, search, hints))
    .sort((left, right) => right.heuristicScore - left.heuristicScore)
    .slice(0, FINAL_CANDIDATE_LIMIT);
}

function getStorageBucket() {
  return getStorage().bucket(
    process.env.FIREBASE_STORAGE_BUCKET || "magmo-ac10c.appspot.com"
  );
}

function imageContentType(fileName) {
  if (/\.png$/i.test(fileName)) return "image/png";
  if (/\.webp$/i.test(fileName)) return "image/webp";
  if (/\.gif$/i.test(fileName)) return "image/gif";
  return "image/jpeg";
}

async function loadCandidateImage(candidate) {
  try {
    const prefix =
      candidate.photoStoragePrefix || `Parts/${candidate.id}/`;
    const [files] = await getStorageBucket().getFiles({
      prefix,
      maxResults: 20,
    });
    const file = files
      .filter((entry) => /\.(?:png|jpe?g|webp|gif)$/i.test(entry.name))
      .sort((left, right) => left.name.localeCompare(right.name))[0];
    if (!file) return null;
    const [buffer] = await file.download({ validation: false });
    if (!buffer?.length || buffer.length > 5000000) return null;
    return `data:${imageContentType(file.name)};base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.warn("[ItemVision][candidate-image]", {
      itemId: candidate.id,
      reason: error.message,
    });
    return null;
  }
}

async function compareCandidates(client, images, observation, candidates) {
  const imageFetchStartedAt = Date.now();
  const candidateImages = await Promise.all(
    candidates.slice(0, CANDIDATE_IMAGE_LIMIT).map(loadCandidateImage)
  );
  const candidateImageFetchMs = Date.now() - imageFetchStartedAt;
  const candidateSummary = candidates.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    partNumbers: candidate.partNumbers,
    oem: candidate.oem,
    modality: candidate.modality,
    model: candidate.model,
    description: candidate.descriptionSnippet,
    exactPartNumber: candidate.exactPartNumber || "",
    retrievalScore: candidate.heuristicScore,
  }));
  const content = [
    {
      type: "input_text",
      text:
        "Observed item analysis:\n" +
        `${JSON.stringify(observation)}\n\nCandidate metadata:\n` +
        `${JSON.stringify(candidateSummary)}\n\n` +
        "The first image group is the observed item. Candidate photos follow with explicit IDs. " +
        "Rank only the supplied IDs. Decide whether each candidate is the same part or product type, not the same serialized physical unit. " +
        "Different serial numbers are expected and must not lower confidence when the PN and product identity agree. " +
        "An exact, clearly read PN match is the strongest evidence. " +
        "Use shape, connectors, labels, color, mounting points, OEM, modality, and model as supporting evidence. " +
        "If evidence is weak, still return the closest supplied candidate but set isLikelySameItem false and lower confidence.",
    },
    { type: "input_text", text: "Observed item photos:" },
    ...imageContent(images),
  ];
  candidates.slice(0, CANDIDATE_IMAGE_LIMIT).forEach((candidate, index) => {
    content.push({
      type: "input_text",
      text: `Candidate ${candidate.id}: ${candidate.name || "Unnamed item"}`,
    });
    if (candidateImages[index]) {
      content.push({
        type: "input_image",
        image_url: candidateImages[index],
        detail: "auto",
      });
    }
  });

  const comparisonStartedAt = Date.now();
  const response = await client.responses.create({
    model: ITEM_VISION_MODEL,
    store: false,
    input: [
      {
        role: "system",
        content:
          "You compare an observed inventory item against a short retrieved candidate list. " +
          "Do not introduce any item not supplied. Prefer explicit identifier agreement over appearance alone. " +
          "The catalog candidate is normally a previously recorded unit, so a different serial number is not a mismatch. " +
          "Set isLikelySameItem true when it is likely the same reusable part/product definition, even if it is not the same physical unit. " +
          "Explain the strongest two or three comparison points in plain warehouse language.",
      },
      { role: "user", content },
    ],
    text: getTextConfig(MATCH_SCHEMA, "item_catalog_match"),
    max_output_tokens: Number(process.env.ITEM_VISION_MATCH_TOKENS || 1600),
    ...getModelControls(),
  });
  return {
    comparison: parseStructuredResponse(response, "catalog comparison"),
    timings: {
      candidateImageFetchMs,
      comparisonModelMs: Date.now() - comparisonStartedAt,
    },
  };
}

function buildMatchResponse(comparison, candidates) {
  const candidateById = new Map(
    candidates.map((candidate) => [candidate.id, candidate])
  );
  const rankedIds = uniqueStrings([
    comparison?.topMatchId,
    ...(comparison?.rankedCandidateIds || []),
    ...candidates.map((candidate) => candidate.id),
  ]).filter((id) => candidateById.has(id));
  const topId = rankedIds[0] || candidates[0]?.id;
  const topCandidate = candidateById.get(topId);
  if (!topCandidate) return { match: null, alternatives: [] };

  const toPublicCandidate = (candidate) => ({
    id: candidate.id,
    name: candidate.name,
    partNumbers: candidate.partNumbers,
    oem: candidate.oem,
    modality: candidate.modality,
    model: candidate.model,
    photoStoragePrefix: candidate.photoStoragePrefix,
  });
  const confidence = clampConfidence(comparison?.confidence);
  return {
    match: {
      ...toPublicCandidate(topCandidate),
      confidence,
      isLikelySameItem: Boolean(comparison?.isLikelySameItem),
      matchedPartNumber:
        String(comparison?.matchedPartNumber || "").trim() ||
        topCandidate.exactPartNumber ||
        "",
      reasons: uniqueStrings(comparison?.reasons).slice(0, 4),
      warnings: uniqueStrings(comparison?.warnings).slice(0, 3),
    },
    alternatives: rankedIds
      .slice(1, 4)
      .map((id) => candidateById.get(id))
      .filter(Boolean)
      .map(toPublicCandidate),
  };
}

function addOemMatchSupport(oemEvidence, match) {
  if (!oemEvidence) return null;
  const officialPartNumbers = new Map(
    (oemEvidence.officialPartNumbers || [])
      .map((value) => [normalizePartNumberKey(value), value])
      .filter(([key]) => key)
  );
  const catalogPartNumbers = uniqueStrings([
    ...(match?.partNumbers || []),
    match?.matchedPartNumber,
  ]);
  const matchedPartNumbers = catalogPartNumbers.filter((value) =>
    officialPartNumbers.has(normalizePartNumberKey(value))
  );
  return {
    ...oemEvidence,
    supportsMatch: matchedPartNumbers.length > 0,
    matchedPartNumbers,
  };
}

async function lookupOemEvidenceSafely({
  client,
  hints,
  observation,
  candidate,
}) {
  const startedAt = Date.now();
  const domains = resolveOfficialOemDomains([
    ...(hints.oem || []),
    observation.oem,
    ...(observation.manufacturerNames || []),
    ...(candidate?.oem || []),
  ]);
  if (!domains.length) {
    return { evidence: null, elapsedMs: 0, cached: false };
  }
  try {
    const evidence = await lookupOfficialOemItem({
      client,
      db: adminDb,
      hints,
      observation,
      domains,
    });
    return {
      evidence,
      elapsedMs: Date.now() - startedAt,
      cached: Boolean(evidence?.cached),
    };
  } catch (error) {
    console.warn("[ItemVision][oem-lookup]", {
      domains,
      reason: error?.message,
      elapsedMs: Date.now() - startedAt,
    });
    return {
      evidence: null,
      elapsedMs: Date.now() - startedAt,
      cached: false,
    };
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const startedAt = Date.now();
  try {
    const authUser = await requireFirebaseAuth(req, res);
    if (res.headersSent) return;
    if (IS_PRODUCTION && !authUser?.uid) return;
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Image analysis is not configured." });
    }
    if (!adminDb) {
      return res.status(503).json({ error: "The item catalog is not available." });
    }

    enforceRateLimit(authUser?.uid || getClientIp(req));
    const images = validateImages(req.body?.images);
    const hints = validateHints(req.body?.hints);
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: OPENAI_TIMEOUT_MS,
    });
    const observationStartedAt = Date.now();
    const observation = await observeItem(client, images, hints);
    const observationMs = Date.now() - observationStartedAt;
    const catalogSearchStartedAt = Date.now();
    const retrieval = await findCandidates(observation, hints);
    const candidates = rankCandidates(
      retrieval.candidates,
      observation,
      retrieval.search,
      hints
    );
    const catalogSearchMs = Date.now() - catalogSearchStartedAt;

    if (!candidates.length) {
      const oemLookup = hasSelectedHints(hints)
        ? await lookupOemEvidenceSafely({
            client,
            hints,
            observation,
            candidate: null,
          })
        : { evidence: null, elapsedMs: 0, cached: false };
      const metrics = {
        candidatesCompared: 0,
        indexHits: retrieval.indexHits,
        sourceHits: retrieval.sourceHits,
        observationMs,
        catalogSearchMs,
        candidateImageFetchMs: 0,
        comparisonModelMs: 0,
        oemLookupMs: oemLookup.elapsedMs,
        oemLookupCached: oemLookup.cached,
        elapsedMs: Date.now() - startedAt,
      };
      console.info("[ItemVision][timing]", metrics);
      return res.status(200).json({
        observation,
        match: null,
        alternatives: [],
        oemEvidence: addOemMatchSupport(oemLookup.evidence, null),
        message:
          "No catalog item was close enough to compare. Try adding a clear label photo.",
        metrics,
      });
    }

    const hasExactPartNumberMatch = candidates.some((candidate) =>
      Boolean(candidate.exactPartNumber)
    );
    const comparisonPromise = compareCandidates(
      client,
      images,
      observation,
      candidates
    );
    const oemLookupPromise =
      hasSelectedHints(hints) && !hasExactPartNumberMatch
        ? lookupOemEvidenceSafely({
            client,
            hints,
            observation,
            candidate: candidates[0],
          })
        : Promise.resolve({ evidence: null, elapsedMs: 0, cached: false });
    const [comparisonResult, oemLookup] = await Promise.all([
      comparisonPromise,
      oemLookupPromise,
    ]);
    const matchResult = buildMatchResponse(
      comparisonResult.comparison,
      candidates
    );
    const metrics = {
      candidatesCompared: candidates.length,
      indexHits: retrieval.indexHits,
      sourceHits: retrieval.sourceHits,
      observationMs,
      catalogSearchMs,
      candidateImageFetchMs:
        comparisonResult.timings.candidateImageFetchMs,
      comparisonModelMs: comparisonResult.timings.comparisonModelMs,
      oemLookupMs: oemLookup.elapsedMs,
      oemLookupCached: oemLookup.cached,
      elapsedMs: Date.now() - startedAt,
    };
    console.info("[ItemVision][timing]", metrics);
    return res.status(200).json({
      observation,
      ...matchResult,
      oemEvidence: addOemMatchSupport(oemLookup.evidence, matchResult.match),
      metrics,
    });
  } catch (error) {
    const status = Number(error?.status || error?.statusCode) || 500;
    const safeStatus = status >= 400 && status < 600 ? status : 500;
    console.error("[ItemVision][error]", {
      name: error?.name,
      code: error?.code,
      status: safeStatus,
      message: error?.message,
      elapsedMs: Date.now() - startedAt,
    });
    return res.status(safeStatus).json({
      error:
        safeStatus === 429
          ? "Smart Camera is temporarily busy. Please wait a minute and try again."
          : safeStatus >= 500
          ? "The photos could not be analyzed right now. Please try again."
          : error.message,
      code: error?.code || "item_vision_failed",
    });
  }
}
