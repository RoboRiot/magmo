import path from "path";
import crypto from "crypto";
import { OpenAI } from "openai";
import cosineSim from "../../../utils/cosineSim";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { adminDb } from "../../../context/FirebaseAdmin";
import { FieldPath, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const TOP_K = Number(process.env.ASK_MAGMO_TOP_K || 4);
const PAGE_SIZE = Number(process.env.ASK_MAGMO_PAGE_SIZE || 1000);
const MAX_CHUNK_CONTEXT_CHARS = Number(
  process.env.ASK_MAGMO_MAX_CHUNK_CONTEXT_CHARS || 1100
);
const MAX_CONTEXT_CHARS = Number(process.env.ASK_MAGMO_MAX_CONTEXT_CHARS || 5200);
const MAX_QUESTION_CHARS = Number(process.env.ASK_MAGMO_MAX_QUESTION_CHARS || 1000);
const MAX_CONVERSATION_MESSAGES = Number(
  process.env.ASK_MAGMO_CONVERSATION_MESSAGES || 10
);
const MAX_CONVERSATION_TEXT_CHARS = Number(
  process.env.ASK_MAGMO_CONVERSATION_TEXT_CHARS || 1200
);
const MAX_RETRIEVAL_QUERY_CHARS = Number(
  process.env.ASK_MAGMO_MAX_RETRIEVAL_QUERY_CHARS || 1800
);
const REQUEST_TIMEOUT_MS = Number(process.env.ASK_MAGMO_TIMEOUT_MS || 150000);
const OPENAI_TIMEOUT_MS = Number(process.env.ASK_MAGMO_OPENAI_TIMEOUT_MS || 120000);
const CANDIDATE_POOL_SIZE = Number(
  process.env.ASK_MAGMO_CANDIDATE_POOL_SIZE || 150
);
const ASK_MAGMO_MODEL = process.env.ASK_MAGMO_MODEL || "gpt-5.5";
const ASK_MAGMO_REASONING_EFFORT =
  process.env.ASK_MAGMO_REASONING_EFFORT || "low";
const ASK_MAGMO_VERBOSITY = process.env.ASK_MAGMO_VERBOSITY || "medium";
const ASK_MAGMO_WEB_SEARCH_ENABLED =
  process.env.ASK_MAGMO_WEB_SEARCH_ENABLED !== "false";
const ASK_MAGMO_WEB_SEARCH_CONTEXT_SIZE =
  process.env.ASK_MAGMO_WEB_SEARCH_CONTEXT_SIZE || "medium";
const ASK_MAGMO_RATE_LIMIT_ENABLED =
  process.env.ASK_MAGMO_RATE_LIMIT_ENABLED !== "false";
const ASK_MAGMO_ALLOWED_EMAIL_DOMAINS = String(
  process.env.ASK_MAGMO_ALLOWED_EMAIL_DOMAINS || "advancedimagingparts.com"
)
  .split(",")
  .map((domain) => domain.trim().toLowerCase())
  .filter(Boolean);
const ASK_MAGMO_REQUIRE_VERIFIED_EMAIL =
  process.env.ASK_MAGMO_REQUIRE_VERIFIED_EMAIL !== "false";
const ASK_MAGMO_PER_MINUTE_LIMIT = Number(
  process.env.ASK_MAGMO_PER_MINUTE_LIMIT || 6
);
const ASK_MAGMO_PER_HOUR_LIMIT = Number(
  process.env.ASK_MAGMO_PER_HOUR_LIMIT || 40
);
const ASK_MAGMO_PER_DAY_LIMIT = Number(
  process.env.ASK_MAGMO_PER_DAY_LIMIT || 120
);
const ASK_MAGMO_IP_PER_MINUTE_LIMIT = Number(
  process.env.ASK_MAGMO_IP_PER_MINUTE_LIMIT || 20
);
const ASK_MAGMO_IP_PER_HOUR_LIMIT = Number(
  process.env.ASK_MAGMO_IP_PER_HOUR_LIMIT || 120
);
const EMBEDDING_FETCH_BATCH_SIZE = Number(
  process.env.ASK_MAGMO_EMBEDDING_FETCH_BATCH_SIZE || 40
);
const MAX_OUTPUT_TOKENS = Number(process.env.ASK_MAGMO_MAX_OUTPUT_TOKENS || 1800);
const PREFILTER_INDEX_TTL_MS = Number(
  process.env.ASK_MAGMO_PREFILTER_INDEX_TTL_MS || 30 * 60 * 1000
);
const PREFILTER_INDEX_MAX_SCOPES = Number(
  process.env.ASK_MAGMO_PREFILTER_INDEX_MAX_SCOPES || 3
);
const DEFAULT_STORE_COLLECTION = "ServiceDocChunks";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const KEYWORD_BOOST_PER_TEXT_MATCH = 0.015;
const KEYWORD_BOOST_PER_TITLE_MATCH = 0.025;
const KEYWORD_BOOST_CAP = 0.15;
const SEARCH_PROJECTION_FIELDS = [
  "text",
  "summary",
  "searchTerms",
  "acronyms",
  "partNumbers",
  "headingPath",
  "vendor",
  "modality",
  "machineFamily",
  "manualSet",
  "category",
  "title",
  "sourcePath",
  "sourceStoragePath",
  "sourceFileName",
  "sourceFileType",
  "chunkIndex",
];
const KEYWORD_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "does",
  "do",
  "doing",
  "done",
  "did",
  "for",
  "from",
  "how",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "to",
  "the",
  "this",
  "what",
  "when",
  "where",
  "with",
  "you",
  "your",
  "please",
  "about",
]);
const CASUAL_QUESTION_PATTERNS = [
  /^(hi|hello|hey|yo|sup)\b/i,
  /\bhow are you\b/i,
  /\bwho are you\b/i,
  /\bwhat can you do\b/i,
  /\bthanks?\b/i,
];
const EXPLICIT_WEB_SEARCH_PATTERNS = [
  /\b(check|look|search|find|verify|confirm)\s+(it\s+)?(online|on the web|on the internet|internet|web)\b/i,
  /\b(online|internet|web|google|public source|public spec|outside source)s?\b/i,
  /\bup[-\s]?to[-\s]?date\b/i,
  /\blatest\b/i,
  /\bcite\b/i,
  /\bsources?\s+online\b/i,
];
const PUBLIC_SPEC_WEB_SEARCH_PATTERNS = [
  /\b(size|dimensions?|dimensioned|height|width|length|depth|footprint|envelope|bore|clearance|weight|specs?|specifications?)\b/i,
  /\bcompatible|compatibility|part\s*(number|#)|model\s*(number|#)|replacement|equivalent\b/i,
];
const PUBLIC_SPEC_SUBJECT_PATTERNS = [
  /\b(ge|toshiba|canon|siemens|philips|signa|hdxt|aquilion|aq64|mri|ct|scanner|magnet|tube|x[-\s]?ray|coil|gradient|chiller|coldhead)\b/i,
];

const PREFILTER_INDEX_CACHE = new Map();
const IMAGE_REF_CACHE = new Map();

function redactSensitiveText(value) {
  return String(value || "")
    .replace(
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
      "[redacted-email]"
    )
    .replace(
      /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g,
      "[redacted-phone]"
    )
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[redacted-ssn]")
    .replace(
      /\b(?:sk|xoxb|ghp|glpat|AIza)[A-Za-z0-9_\-]{16,}\b/g,
      "[redacted-token]"
    )
    .replace(
      /\b(?:api[_-]?key|token|password|secret)\s*[:=]\s*\S+/gi,
      "$1=[redacted-secret]"
    );
}

function hashIdentifier(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

function getClientIp(req) {
  const forwarded = String(req.headers?.["x-forwarded-for"] || "");
  const firstForwarded = forwarded.split(",")[0]?.trim();
  return (
    firstForwarded ||
    String(req.headers?.["x-real-ip"] || "").trim() ||
    String(req.socket?.remoteAddress || "").trim() ||
    "unknown"
  );
}

function getEmailDomain(email) {
  const parts = String(email || "").trim().toLowerCase().split("@");
  return parts.length === 2 ? parts[1] : "";
}

function assertAskMagmoUserAllowed(user) {
  if (!IS_PRODUCTION && !user) return;

  if (!user?.uid) {
    throw new AskMagmoAccessError(
      "AskMagmo requires a signed-in Advanced Imaging account.",
      401,
      "askmagmo_auth_required"
    );
  }

  const email = String(user.email || "").trim().toLowerCase();
  const domain = getEmailDomain(email);
  if (!email || !domain) {
    throw new AskMagmoAccessError(
      "AskMagmo requires an account with a verified company email.",
      403,
      "askmagmo_email_required"
    );
  }

  if (
    ASK_MAGMO_REQUIRE_VERIFIED_EMAIL &&
    user.email_verified === false
  ) {
    throw new AskMagmoAccessError(
      "AskMagmo requires a verified company email.",
      403,
      "askmagmo_email_not_verified"
    );
  }

  if (
    ASK_MAGMO_ALLOWED_EMAIL_DOMAINS.length &&
    !ASK_MAGMO_ALLOWED_EMAIL_DOMAINS.includes(domain)
  ) {
    throw new AskMagmoAccessError(
      "AskMagmo is only available to approved company email domains.",
      403,
      "askmagmo_domain_not_allowed"
    );
  }
}

function getWindowStart(nowMs, windowMs) {
  return Math.floor(nowMs / windowMs) * windowMs;
}

function getRetryAfterSeconds(nowMs, windowStart, windowMs) {
  return Math.max(1, Math.ceil((windowStart + windowMs - nowMs) / 1000));
}

function prepareRateLimitWindow(limitConfig, nowMs) {
  const { subjectType, subjectHash, windowName, windowMs, limit } = limitConfig;
  if (!limit || limit < 1) return null;

  const windowStart = getWindowStart(nowMs, windowMs);
  const retryAfterSeconds = getRetryAfterSeconds(nowMs, windowStart, windowMs);
  const docId = `${subjectType}_${subjectHash}_${windowName}_${windowStart}`;
  const ref = adminDb.collection("AskMagmoRateLimits").doc(docId);

  return {
    ...limitConfig,
    ref,
    windowStart,
    retryAfterSeconds,
  };
}

function writeRateLimitWindow(transaction, prepared, snap) {
  if (!prepared) return;
  const { subjectType, subjectHash, windowName, windowMs, limit } = prepared;
  const currentCount = snap.exists ? Number(snap.data()?.count || 0) : 0;

  if (currentCount >= limit) {
    throw new AskMagmoRateLimitError(
      "AskMagmo request limit reached. Please wait before asking again.",
      prepared.retryAfterSeconds,
      `askmagmo_${subjectType}_${windowName}_limit`
    );
  }

  transaction.set(
    prepared.ref,
    {
      subjectType,
      subjectHash,
      windowName,
      windowStart: new Date(prepared.windowStart),
      windowMs,
      limit,
      count: currentCount + 1,
      expiresAt: new Date(prepared.windowStart + windowMs * 3),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

async function enforceAskMagmoRateLimit({ req, user }) {
  if (!ASK_MAGMO_RATE_LIMIT_ENABLED) return;
  if (!adminDb) {
    if (IS_PRODUCTION) {
      throw new AskMagmoAccessError(
        "AskMagmo protection services are unavailable.",
        503,
        "askmagmo_rate_limit_unavailable"
      );
    }
    return;
  }

  const nowMs = Date.now();
  const uidHash = hashIdentifier(user?.uid || user?.email || getClientIp(req));
  const ipHash = hashIdentifier(getClientIp(req));
  const configs = [
    {
      subjectType: "user",
      subjectHash: uidHash,
      windowName: "minute",
      windowMs: 60 * 1000,
      limit: ASK_MAGMO_PER_MINUTE_LIMIT,
    },
    {
      subjectType: "user",
      subjectHash: uidHash,
      windowName: "hour",
      windowMs: 60 * 60 * 1000,
      limit: ASK_MAGMO_PER_HOUR_LIMIT,
    },
    {
      subjectType: "user",
      subjectHash: uidHash,
      windowName: "day",
      windowMs: 24 * 60 * 60 * 1000,
      limit: ASK_MAGMO_PER_DAY_LIMIT,
    },
    {
      subjectType: "ip",
      subjectHash: ipHash,
      windowName: "minute",
      windowMs: 60 * 1000,
      limit: ASK_MAGMO_IP_PER_MINUTE_LIMIT,
    },
    {
      subjectType: "ip",
      subjectHash: ipHash,
      windowName: "hour",
      windowMs: 60 * 60 * 1000,
      limit: ASK_MAGMO_IP_PER_HOUR_LIMIT,
    },
  ].filter((config) => config.subjectHash);

  await adminDb.runTransaction(async (transaction) => {
    const prepared = configs
      .map((config) => prepareRateLimitWindow(config, nowMs))
      .filter(Boolean);
    const snapshots = await Promise.all(
      prepared.map((config) => transaction.get(config.ref))
    );
    prepared.forEach((config, index) => {
      writeRateLimitWindow(transaction, config, snapshots[index]);
    });
  });
}

function createLocalResponseId() {
  return `askmagmo_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;
}

function safeErrorDetails(error) {
  return {
    name: error?.name || null,
    code: error?.code || null,
    status: error?.status || null,
    message: String(error?.message || "").slice(0, 300),
  };
}

class AskMagmoTimeoutError extends Error {
  constructor(message, code = "askmagmo_timeout") {
    super(message);
    this.name = "AskMagmoTimeoutError";
    this.code = code;
  }
}

class AskMagmoRetrievalError extends Error {
  constructor(message, details = "") {
    super(message);
    this.name = "AskMagmoRetrievalError";
    this.code = "manual_chunk_retrieval_failed";
    this.details = details;
  }
}

class AskMagmoAccessError extends Error {
  constructor(message, status = 403, code = "askmagmo_access_denied") {
    super(message);
    this.name = "AskMagmoAccessError";
    this.status = status;
    this.code = code;
  }
}

class AskMagmoRateLimitError extends Error {
  constructor(message, retryAfterSeconds, code = "askmagmo_rate_limited") {
    super(message);
    this.name = "AskMagmoRateLimitError";
    this.status = 429;
    this.retryAfterSeconds = retryAfterSeconds;
    this.code = code;
  }
}

function firstPresent(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function normalizeScopeValue(value) {
  return String(value || "").trim();
}

function hasScope(scope) {
  return Boolean(
    normalizeScopeValue(scope?.vendor) ||
      normalizeScopeValue(scope?.modality) ||
      normalizeScopeValue(scope?.machineFamily) ||
      normalizeScopeValue(scope?.manualSet)
  );
}

function formatSelectedScope(scope) {
  return [
    scope?.vendor,
    scope?.modality,
    scope?.machineFamily,
    scope?.manualSet,
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" / ");
}

function getScopeCacheKey(collectionName, scope) {
  return JSON.stringify({
    collectionName: String(collectionName || DEFAULT_STORE_COLLECTION),
    vendor: normalizeScopeValue(scope?.vendor),
    modality: normalizeScopeValue(scope?.modality),
    machineFamily: normalizeScopeValue(scope?.machineFamily),
    manualSet: normalizeScopeValue(scope?.manualSet),
  });
}

function buildScopeKey(scope) {
  return [
    normalizeScopeValue(scope?.vendor),
    normalizeScopeValue(scope?.modality),
    normalizeScopeValue(scope?.machineFamily),
    normalizeScopeValue(scope?.manualSet),
  ]
    .join("|")
    .toLowerCase();
}

function getElapsedMs(startedAt) {
  return Date.now() - startedAt;
}

function checkRequestBudget(startedAt, phase) {
  if (Date.now() - startedAt > REQUEST_TIMEOUT_MS) {
    throw new AskMagmoTimeoutError(
      `AskMagmo timed out while ${phase}.`,
      "request_budget_timeout"
    );
  }
}

function normalizeChunk(chunk, fallbackSource = "unknown") {
  if (!chunk) return null;
  const rawMetadata =
    chunk.metadata && typeof chunk.metadata === "object" ? chunk.metadata : {};
  const sourcePath = String(
    firstPresent(
      chunk.sourcePath,
      rawMetadata.sourcePath,
      chunk.source,
      rawMetadata.source,
      chunk.path,
      rawMetadata.path,
      chunk.fileName,
      rawMetadata.fileName,
      fallbackSource
    )
  ).trim();
  const source = sourcePath;
  const text = String(chunk.text || chunk.summary || "").trim();
  const embedding = Array.isArray(chunk.embedding) ? chunk.embedding : [];
  if (!source || !text || embedding.length === 0) return null;

  const sourceFileName =
    firstPresent(
      chunk.sourceFileName,
      rawMetadata.sourceFileName,
      chunk.fileName,
      rawMetadata.fileName
    ) || (sourcePath ? path.basename(sourcePath) : null);
  const relatedImages = normalizeImageRefs(
    firstPresent(chunk.relatedImages, rawMetadata.relatedImages, chunk.images, rawMetadata.images),
    sourcePath
  );

  return {
    source,
    text,
    embedding,
    metadata: {
      vendor: firstPresent(chunk.vendor, rawMetadata.vendor) || null,
      modality: firstPresent(chunk.modality, rawMetadata.modality) || null,
      machineFamily:
        firstPresent(chunk.machineFamily, rawMetadata.machineFamily) || null,
      manualSet: firstPresent(chunk.manualSet, rawMetadata.manualSet) || null,
      category: firstPresent(chunk.category, rawMetadata.category) || null,
      title: firstPresent(chunk.title, rawMetadata.title) || null,
      sourcePath,
      sourceStoragePath:
        firstPresent(
          chunk.sourceStoragePath,
          rawMetadata.sourceStoragePath,
          chunk.storagePath,
          rawMetadata.storagePath
        ) || null,
      sourceFileName,
      sourceFileType:
        firstPresent(
          chunk.sourceFileType,
          rawMetadata.sourceFileType,
          chunk.fileType,
          rawMetadata.fileType,
          chunk.fileExtension,
          rawMetadata.fileExtension
        ) || null,
      chunkIndex: firstPresent(chunk.chunkIndex, rawMetadata.chunkIndex) ?? null,
      relatedImages,
    },
  };
}

function normalizeSearchChunk(chunk, fallbackSource = "unknown") {
  if (!chunk) return null;
  const rawMetadata =
    chunk.metadata && typeof chunk.metadata === "object" ? chunk.metadata : {};
  const sourcePath = String(
    firstPresent(
      chunk.sourcePath,
      rawMetadata.sourcePath,
      chunk.source,
      rawMetadata.source,
      chunk.path,
      rawMetadata.path,
      chunk.fileName,
      rawMetadata.fileName,
      fallbackSource
    )
  ).trim();
  const text = String(chunk.text || chunk.summary || "").trim();
  if (!sourcePath || !text) return null;

  const sourceFileName =
    firstPresent(
      chunk.sourceFileName,
      rawMetadata.sourceFileName,
      chunk.fileName,
      rawMetadata.fileName
    ) || (sourcePath ? path.basename(sourcePath) : null);
  const relatedImages = normalizeImageRefs(
    firstPresent(chunk.relatedImages, rawMetadata.relatedImages, chunk.images, rawMetadata.images),
    sourcePath
  );

  return {
    source: sourcePath,
    text,
    metadata: {
      vendor: firstPresent(chunk.vendor, rawMetadata.vendor) || null,
      modality: firstPresent(chunk.modality, rawMetadata.modality) || null,
      machineFamily:
        firstPresent(chunk.machineFamily, rawMetadata.machineFamily) || null,
      manualSet: firstPresent(chunk.manualSet, rawMetadata.manualSet) || null,
      category: firstPresent(chunk.category, rawMetadata.category) || null,
      title: firstPresent(chunk.title, rawMetadata.title) || null,
      sourcePath,
      sourceStoragePath:
        firstPresent(
          chunk.sourceStoragePath,
          rawMetadata.sourceStoragePath,
          chunk.storagePath,
          rawMetadata.storagePath
        ) || null,
      sourceFileName,
      sourceFileType:
        firstPresent(
          chunk.sourceFileType,
          rawMetadata.sourceFileType,
          chunk.fileType,
          rawMetadata.fileType,
          chunk.fileExtension,
          rawMetadata.fileExtension
        ) || null,
      chunkIndex: firstPresent(chunk.chunkIndex, rawMetadata.chunkIndex) ?? null,
      relatedImages,
    },
  };
}

function normalizeImageRefs(rawImages, sourcePath = "") {
  if (!Array.isArray(rawImages)) return [];
  return rawImages
    .map((image) => {
      if (typeof image === "string") {
        return {
          name: path.basename(image),
          sourcePath: image,
          storagePath: image.startsWith("ServiceDocs/")
            ? image
            : `ServiceDocs/${image}`,
        };
      }

      if (!image || typeof image !== "object") return null;
      const imageSourcePath = String(
        firstPresent(image.sourcePath, image.path, image.filePath, image.name)
      ).trim();
      const imageName = String(
        firstPresent(image.name, image.fileName, path.basename(imageSourcePath))
      ).trim();
      const storagePath = String(
        firstPresent(
          image.storagePath,
          image.sourceStoragePath,
          imageSourcePath
            ? imageSourcePath.startsWith("ServiceDocs/")
              ? imageSourcePath
              : `ServiceDocs/${imageSourcePath}`
            : ""
        )
      ).trim();

      if (!imageName && !storagePath && !imageSourcePath) return null;
      return {
        name: imageName || path.basename(storagePath || imageSourcePath),
        sourcePath: imageSourcePath || null,
        storagePath: storagePath || null,
        fileExtension: image.fileExtension || null,
        sourceChunkPath: sourcePath || null,
      };
    })
    .filter(Boolean);
}

function normalizeKeywordText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getQueryTerms(question) {
  const normalized = normalizeKeywordText(question);
  if (!normalized) return [];

  const words = normalized
    .split(" ")
    .filter(
      (word) =>
        (word.length >= 2 || /\d/.test(word)) &&
        !KEYWORD_STOP_WORDS.has(word)
    );
  const terms = new Set(words);

  for (let i = 0; i < words.length - 1; i += 1) {
    terms.add(`${words[i]} ${words[i + 1]}`);
    terms.add(`${words[i]}${words[i + 1]}`);
  }

  return Array.from(terms);
}

function getIndexedSearchTerms(question) {
  return getQueryTerms(question)
    .filter((term) => !term.includes(" "))
    .filter((term) => term.length >= 2 || /\d/.test(term))
    .slice(0, 10);
}

function isCasualQuestion(question) {
  const text = String(question || "").trim();
  if (!text) return false;
  if (CASUAL_QUESTION_PATTERNS.some((pattern) => pattern.test(text))) {
    return true;
  }
  return getQueryTerms(text).length === 0 && text.length < 80;
}

function isExplicitWebSearchRequest(question, conversation = []) {
  const currentQuestion = String(question || "");
  if (EXPLICIT_WEB_SEARCH_PATTERNS.some((pattern) => pattern.test(currentQuestion))) {
    return true;
  }

  const recentUserText = conversation
    .filter((message) => message.role === "user")
    .slice(-2)
    .map((message) => message.text)
    .join("\n");

  return EXPLICIT_WEB_SEARCH_PATTERNS.some((pattern) => pattern.test(recentUserText));
}

function isLikelyPublicSpecRequest(question, retrievalQuestion) {
  const currentQuestion = String(question || "");
  const combined = String(retrievalQuestion || currentQuestion || "");

  return (
    PUBLIC_SPEC_WEB_SEARCH_PATTERNS.some((pattern) => pattern.test(currentQuestion)) &&
    PUBLIC_SPEC_SUBJECT_PATTERNS.some((pattern) => pattern.test(combined))
  );
}

function getWebSearchReason({
  enabled,
  skipManualSearch,
  topChunks,
  question,
  retrievalQuestion,
  conversation,
}) {
  if (!enabled) return null;
  if (skipManualSearch) return "casual_or_general_question";
  if (!topChunks.length) return "no_matching_manual_chunks";
  if (isExplicitWebSearchRequest(question, conversation)) {
    return "technician_requested_online_lookup";
  }
  if (isLikelyPublicSpecRequest(question, retrievalQuestion)) {
    return "public_spec_or_compatibility_lookup";
  }
  return null;
}

function countOccurrences(text, term) {
  if (!text || !term) return 0;

  let count = 0;
  let index = text.indexOf(term);
  while (index !== -1 && count < 20) {
    count += 1;
    index = text.indexOf(term, index + term.length);
  }

  return count;
}

function getKeywordCandidateScoreFromIndex(terms, entry) {
  if (!terms.length) return 0;

  let score = 0;
  for (const term of terms) {
    const isPhrase = term.includes(" ");
    const isJoinedPhrase = !isPhrase && term.length > 5;
    const titleHits = countOccurrences(entry.title, term);
    const categoryHits = countOccurrences(entry.category, term);
    const textHits = countOccurrences(entry.text, term);
    const indexedTermHit = entry.searchTerms?.has(term) ? 1 : 0;
    const acronymHit = entry.acronyms?.has(term) ? 1 : 0;
    const partNumberHit = entry.partNumbers?.has(term.toUpperCase()) ? 1 : 0;

    if (partNumberHit) score += 30;
    if (acronymHit) score += 20;
    if (indexedTermHit) score += isPhrase ? 8 : 3;
    if (titleHits) score += titleHits * (isPhrase ? 10 : 5);
    if (categoryHits) score += categoryHits * (isPhrase ? 6 : 3);
    if (textHits) {
      score += Math.min(textHits, 12) * (isPhrase || isJoinedPhrase ? 4 : 1);
    }
  }

  return score;
}

function getKeywordBoost(question, chunk) {
  const terms = getQueryTerms(question);
  if (!terms.length) return 0;

  const text = normalizeKeywordText(chunk.text);
  const title = normalizeKeywordText(chunk.metadata?.title);
  let boost = 0;

  for (const term of terms) {
    if (title && title.includes(term)) {
      boost += KEYWORD_BOOST_PER_TITLE_MATCH;
    }
    if (text && text.includes(term)) {
      boost += KEYWORD_BOOST_PER_TEXT_MATCH;
    }
    if (boost >= KEYWORD_BOOST_CAP) return KEYWORD_BOOST_CAP;
  }

  return boost;
}

function addTopChunk(topScored, candidate, topK = TOP_K) {
  topScored.push(candidate);
  topScored.sort((a, b) => b.score - a.score);
  if (topScored.length > topK) {
    topScored.pop();
  }
}

function addTopCandidate(topCandidates, candidate, topK = CANDIDATE_POOL_SIZE) {
  topCandidates.push(candidate);
  topCandidates.sort((a, b) => b.keywordScore - a.keywordScore);
  if (topCandidates.length > topK) {
    topCandidates.pop();
  }
}

function stripEmbedding(chunk) {
  return {
    ...chunk,
    embedding: [],
  };
}

function buildScopedQuery(collectionName, scope) {
  let query = adminDb.collection(collectionName);
  const vendor = normalizeScopeValue(scope?.vendor);
  const modality = normalizeScopeValue(scope?.modality);
  const machineFamily = normalizeScopeValue(scope?.machineFamily);
  const manualSet = normalizeScopeValue(scope?.manualSet);

  if (vendor) query = query.where("vendor", "==", vendor);
  if (modality) query = query.where("modality", "==", modality);
  if (machineFamily) query = query.where("machineFamily", "==", machineFamily);
  if (manualSet) query = query.where("manualSet", "==", manualSet);

  return query;
}

async function countScopedChunks(collectionName, scope) {
  try {
    const snap = await buildScopedQuery(collectionName, scope).count().get();
    return snap.data().count;
  } catch (error) {
    console.warn("AskMagmo count query failed:", error.message);
    return null;
  }
}

async function embedQuestion(client, question) {
  const resp = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: [question],
  });
  return resp.data[0].embedding;
}

function prunePrefilterIndexCache() {
  while (PREFILTER_INDEX_CACHE.size > PREFILTER_INDEX_MAX_SCOPES) {
    let oldestKey = null;
    let oldestAt = Infinity;

    for (const [key, value] of PREFILTER_INDEX_CACHE.entries()) {
      if (value.cachedAt < oldestAt) {
        oldestAt = value.cachedAt;
        oldestKey = key;
      }
    }

    if (!oldestKey) break;
    PREFILTER_INDEX_CACHE.delete(oldestKey);
  }
}

async function getOrBuildPrefilterIndex({
  collectionName,
  scope,
  startedAt,
}) {
  const cacheKey = getScopeCacheKey(collectionName, scope);
  const cached = PREFILTER_INDEX_CACHE.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.cachedAt < PREFILTER_INDEX_TTL_MS) {
    cached.lastUsedAt = now;
    console.log("[AskMagmo][prefilter-index]", {
      cacheHit: true,
      indexedDocs: cached.entries.length,
      cacheAgeMs: now - cached.cachedAt,
    });
    return {
      ...cached.stats,
      entries: cached.entries,
      cacheHit: true,
      cacheAgeMs: now - cached.cachedAt,
    };
  }

  const baseQuery = buildScopedQuery(collectionName, scope)
    .orderBy(FieldPath.documentId())
    .select(...SEARCH_PROJECTION_FIELDS);
  const entries = [];
  let lastDoc = null;
  let pagesRead = 0;
  let docsRead = 0;
  let skippedChunks = 0;

  while (true) {
    checkRequestBudget(startedAt, "building manual search index");
    let pageQuery = baseQuery.limit(PAGE_SIZE);
    if (lastDoc) {
      pageQuery = pageQuery.startAfter(lastDoc);
    }

    let snap;
    try {
      snap = await pageQuery.get();
    } catch (error) {
      throw new AskMagmoRetrievalError(
        "AskMagmo could not retrieve service manual chunks for this scope.",
        error.message
      );
    }

    if (snap.empty) break;

    pagesRead += 1;
    docsRead += snap.docs.length;

    for (const doc of snap.docs) {
      const chunk = normalizeSearchChunk(doc.data(), doc.id);
      if (!chunk) {
        skippedChunks += 1;
        continue;
      }

      entries.push({
        docId: doc.id,
        text: normalizeKeywordText(chunk.text),
        title: normalizeKeywordText(chunk.metadata?.title),
        category: normalizeKeywordText(chunk.metadata?.category),
        searchTerms: new Set(
          Array.isArray(doc.get("searchTerms")) ? doc.get("searchTerms") : []
        ),
        acronyms: new Set(
          Array.isArray(doc.get("acronyms")) ? doc.get("acronyms") : []
        ),
        partNumbers: new Set(
          Array.isArray(doc.get("partNumbers")) ? doc.get("partNumbers") : []
        ),
        previewSource: chunk.metadata?.sourcePath || chunk.source || doc.id,
        previewTitle: chunk.metadata?.title || null,
      });
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    if (pagesRead === 1 || pagesRead % 5 === 0) {
      console.log("[AskMagmo][prefilter-index]", {
        cacheHit: false,
        pagesRead,
        docsRead,
        indexedDocs: entries.length,
      });
    }

    if (snap.docs.length < PAGE_SIZE) break;
  }

  const stats = {
    pagesRead,
    docsRead,
    skippedChunks,
  };

  PREFILTER_INDEX_CACHE.set(cacheKey, {
    entries,
    stats,
    cachedAt: Date.now(),
    lastUsedAt: Date.now(),
  });
  prunePrefilterIndexCache();

  console.log("[AskMagmo][prefilter-index]", {
    cacheHit: false,
    pagesRead,
    docsRead,
    indexedDocs: entries.length,
    elapsedMs: getElapsedMs(startedAt),
  });

  return {
    ...stats,
    entries,
    cacheHit: false,
    cacheAgeMs: 0,
  };
}

async function collectIndexedSearchCandidates({
  collectionName,
  scope,
  question,
  startedAt,
}) {
  const searchTerms = getIndexedSearchTerms(question);
  if (!searchTerms.length) {
    return null;
  }

  const topCandidates = [];
  let docsRead = 0;
  let keywordMatches = 0;
  let skippedChunks = 0;

  try {
    let query = buildScopedQuery(collectionName, scope)
      .where("searchTerms", "array-contains-any", searchTerms)
      .limit(Math.max(CANDIDATE_POOL_SIZE * 4, 500))
      .select(...SEARCH_PROJECTION_FIELDS);

    const snap = await query.get();
    docsRead = snap.docs.length;

    for (const doc of snap.docs) {
      checkRequestBudget(startedAt, "using indexed manual search");
      const chunk = normalizeSearchChunk(doc.data(), doc.id);
      if (!chunk) {
        skippedChunks += 1;
        continue;
      }

      const entry = {
        docId: doc.id,
        text: normalizeKeywordText(chunk.text),
        title: normalizeKeywordText(chunk.metadata?.title),
        category: normalizeKeywordText(chunk.metadata?.category),
        searchTerms: new Set(
          Array.isArray(doc.get("searchTerms")) ? doc.get("searchTerms") : []
        ),
        acronyms: new Set(
          Array.isArray(doc.get("acronyms")) ? doc.get("acronyms") : []
        ),
        partNumbers: new Set(
          Array.isArray(doc.get("partNumbers")) ? doc.get("partNumbers") : []
        ),
        previewSource: chunk.metadata?.sourcePath || chunk.source || doc.id,
        previewTitle: chunk.metadata?.title || null,
      };
      const keywordScore = getKeywordCandidateScoreFromIndex(
        getQueryTerms(question),
        entry
      );
      if (keywordScore <= 0) continue;

      keywordMatches += 1;
      addTopCandidate(topCandidates, {
        docId: entry.docId,
        keywordScore,
        previewSource: entry.previewSource,
        previewTitle: entry.previewTitle,
      });
    }

    console.log("[AskMagmo][indexed-search]", {
      used: true,
      searchTerms,
      docsRead,
      keywordMatches,
      retainedCandidates: topCandidates.length,
      topKeywordScore: topCandidates[0]?.keywordScore ?? null,
      elapsedMs: getElapsedMs(startedAt),
    });

    return {
      topCandidates,
      pagesRead: 1,
      docsRead,
      keywordMatches,
      skippedChunks,
      cacheHit: false,
      cacheAgeMs: 0,
      indexedDocs: docsRead,
      usedIndexedSearch: true,
    };
  } catch (error) {
    console.warn("[AskMagmo][indexed-search]", {
      used: false,
      searchTerms,
      reason: error.message,
    });
    return null;
  }
}

async function collectKeywordCandidates({
  collectionName,
  scope,
  question,
  startedAt,
}) {
  if (!adminDb) {
    throw new AskMagmoRetrievalError(
      "AskMagmo could not retrieve service manual chunks for this scope.",
      "Firebase admin database is not configured."
    );
  }
  if (!hasScope(scope)) {
    throw new AskMagmoRetrievalError(
      "AskMagmo could not retrieve service manual chunks for this scope.",
      "A vendor/modality/machine/manual scope is required."
    );
  }

  const indexedResult = await collectIndexedSearchCandidates({
    collectionName,
    scope,
    question,
    startedAt,
  });
  if (indexedResult?.topCandidates?.length) {
    return indexedResult;
  }

  const indexResult = await getOrBuildPrefilterIndex({
    collectionName,
    scope,
    startedAt,
  });
  const terms = getQueryTerms(question);
  const topCandidates = [];
  let keywordMatches = 0;

  for (let i = 0; i < indexResult.entries.length; i += 1) {
    if (i > 0 && i % 2500 === 0) {
      checkRequestBudget(startedAt, "prefiltering cached manual chunks");
    }

    const entry = indexResult.entries[i];
    const keywordScore = getKeywordCandidateScoreFromIndex(terms, entry);
    if (keywordScore <= 0) continue;

    keywordMatches += 1;
    addTopCandidate(topCandidates, {
      docId: entry.docId,
      keywordScore,
      previewSource: entry.previewSource,
      previewTitle: entry.previewTitle,
    });
  }

  console.log("[AskMagmo][prefilter]", {
    cacheHit: indexResult.cacheHit,
    indexedDocs: indexResult.entries.length,
    keywordMatches,
    retainedCandidates: topCandidates.length,
    topKeywordScore: topCandidates[0]?.keywordScore ?? null,
    elapsedMs: getElapsedMs(startedAt),
  });

  return {
    topCandidates,
    pagesRead: indexResult.pagesRead,
    docsRead: indexResult.docsRead,
    keywordMatches,
    skippedChunks: indexResult.skippedChunks,
    cacheHit: indexResult.cacheHit,
    cacheAgeMs: indexResult.cacheAgeMs,
    indexedDocs: indexResult.entries.length,
  };
}

async function fetchDocsInBatches(collectionName, docIds, startedAt) {
  const docs = [];

  for (let i = 0; i < docIds.length; i += EMBEDDING_FETCH_BATCH_SIZE) {
    checkRequestBudget(startedAt, "fetching candidate embeddings");
    const batchIds = docIds.slice(i, i + EMBEDDING_FETCH_BATCH_SIZE);
    const refs = batchIds.map((docId) =>
      adminDb.collection(collectionName).doc(docId)
    );
    const batchDocs = await Promise.all(refs.map((ref) => ref.get()));
    docs.push(...batchDocs);
  }

  return docs;
}

async function scoreCandidateChunks({
  collectionName,
  candidates,
  qVec,
  question,
  startedAt,
}) {
  const topScored = [];
  const candidateIds = candidates.map((candidate) => candidate.docId);
  const docs = await fetchDocsInBatches(collectionName, candidateIds, startedAt);
  let chunksScored = 0;
  let skippedChunks = 0;

  for (const doc of docs) {
    checkRequestBudget(startedAt, "scoring candidate chunks");
    if (!doc.exists) {
      skippedChunks += 1;
      continue;
    }

    const chunk = normalizeChunk(doc.data(), doc.id);
    if (!chunk) {
      skippedChunks += 1;
      continue;
    }

    const sim = cosineSim(qVec, chunk.embedding);
    const keywordBoost = getKeywordBoost(question, chunk);
    addTopChunk(topScored, {
      sim,
      keywordBoost,
      score: sim + keywordBoost,
      chunk: stripEmbedding(chunk),
    });
    chunksScored += 1;
  }

  console.log("[AskMagmo][candidate-score]", {
    candidatesFetched: docs.length,
    chunksScored,
    skippedChunks,
    topScore: topScored[0]?.score ?? null,
  });

  return {
    topScored,
    docsRead: docs.length,
    chunksScored,
    skippedChunks,
  };
}

function buildContextFromChunks(chunks) {
  const context = chunks
    .map((c, i) => {
      const metadata = c.metadata || {};
      const imageNames = (metadata.relatedImages || [])
        .map(
          (image, imageIndex) =>
            image.displayName ||
            image.label ||
            (image.illustrationNumber
              ? `Illustration ${image.illustrationNumber}: ${
                  image.name || image.sourcePath || image.storagePath
                }`
              : `Picture ${imageIndex + 1}: ${
                  image.name || image.sourcePath || image.storagePath
                }`)
        )
        .filter(Boolean)
        .slice(0, 8);
      const sourceParts = [
        metadata.title ? `Title: ${metadata.title}` : "",
        metadata.category ? `Category: ${metadata.category}` : "",
        metadata.manualSet ? `Manual set: ${metadata.manualSet}` : "",
        metadata.sourcePath ? `Path: ${metadata.sourcePath}` : `Path: ${c.source}`,
        metadata.chunkIndex !== null && metadata.chunkIndex !== undefined
          ? `Chunk: ${metadata.chunkIndex}`
          : "",
        imageNames.length ? `Related pictures: ${imageNames.join(", ")}` : "",
      ].filter(Boolean);

      return (
        `Source [${i + 1}]\n${sourceParts.join("\n")}\nContent:\n` +
        redactSensitiveText(String(c.text || "")).slice(0, MAX_CHUNK_CONTEXT_CHARS)
      );
    })
    .join("\n\n---\n\n");

  return context.slice(0, MAX_CONTEXT_CHARS);
}

function buildSourceDebug(topChunks) {
  return topChunks.map((chunk) => {
    const metadata = chunk.metadata || {};
    return {
      sourcePath: metadata.sourcePath || chunk.source || null,
      sourceStoragePath: metadata.sourceStoragePath || null,
      title: metadata.title || null,
      category: metadata.category || null,
      manualSet: metadata.manualSet || null,
      chunkIndex: metadata.chunkIndex ?? null,
      relatedImages: metadata.relatedImages || [],
    };
  });
}

function extractWebSources(response) {
  const seen = new Set();
  const sources = [];

  function addSource(source) {
    const url = String(source?.url || source?.uri || "").trim();
    if (!url || seen.has(url)) return;
    seen.add(url);
    sources.push({
      sourcePath: url,
      title: source?.title || null,
      sourceType: "web",
    });
  }

  for (const output of response?.output || []) {
    const actionSources = output?.action?.sources;
    if (Array.isArray(actionSources)) {
      actionSources.forEach(addSource);
    }

    for (const content of output?.content || []) {
      for (const annotation of content?.annotations || []) {
        if (annotation?.type === "url_citation") {
          addSource({
            url: annotation.url,
            title: annotation.title,
          });
        }
      }
    }
  }

  return sources;
}

function buildImageRefs(topChunks) {
  const seen = new Set();
  const images = [];

  for (const chunk of topChunks) {
    const metadata = chunk.metadata || {};
    for (const image of metadata.relatedImages || []) {
      const key =
        image.storagePath || image.sourcePath || image.name || JSON.stringify(image);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      images.push({
        name: image.name || path.basename(key),
        label: image.label || null,
        displayName:
          image.displayName ||
          (image.label
            ? `${image.label}: ${image.name || path.basename(key)}`
            : image.name || path.basename(key)),
        illustrationNumber: image.illustrationNumber || null,
        storagePath: image.storagePath || null,
        sourcePath: image.sourcePath || null,
        sourceChunkPath: metadata.sourcePath || chunk.source || null,
        title: metadata.title || null,
      });
      if (images.length >= 16) return images;
    }
  }

  return images;
}

function getStorageBucket() {
  try {
    return getStorage().bucket(
      process.env.FIREBASE_STORAGE_BUCKET || "magmo-ac10c.appspot.com"
    );
  } catch (error) {
    console.warn("[AskMagmo][image-storage]", {
      reason: error.message,
    });
    return null;
  }
}

function getMediaPrefixesForChunk(chunk) {
  const metadata = chunk.metadata || {};
  const storagePath = String(metadata.sourceStoragePath || "").trim();
  const sourcePath = String(metadata.sourcePath || chunk.source || "").trim();
  const vendor = String(metadata.vendor || "").trim();
  const modality = String(metadata.modality || "").trim();
  const sourceForBase = storagePath || sourcePath;
  const fileName = path.basename(sourceForBase);
  const baseName = fileName.replace(/\.[^.]+$/, "");
  if (!baseName) return [];

  const baseNames = [baseName];
  if (/summ$/i.test(baseName)) {
    baseNames.push(baseName.replace(/summ$/i, ""));
  }

  const prefixes = [];
  const contentIndex = storagePath.indexOf("/content/");
  if (contentIndex > -1) {
    const root = storagePath.slice(0, contentIndex);
    baseNames.forEach((base) => prefixes.push(`${root}/media/${base}-`));
  }

  if (sourcePath.startsWith("data/") && vendor && modality) {
    const sourceContentIndex = sourcePath.indexOf("/content/");
    if (sourceContentIndex > -1) {
      const root = sourcePath.slice(0, sourceContentIndex);
      baseNames.forEach((base) =>
        prefixes.push(`Ask_Magmo/${vendor}/${modality}/${root}/media/${base}-`)
      );
    }
  }

  return Array.from(new Set(prefixes));
}

async function inferImagesForChunk(chunk) {
  const prefixes = getMediaPrefixesForChunk(chunk);
  if (!prefixes.length) return [];

  const bucket = getStorageBucket();
  if (!bucket) return [];

  const images = [];
  for (const prefix of prefixes) {
    if (IMAGE_REF_CACHE.has(prefix)) {
      images.push(...IMAGE_REF_CACHE.get(prefix));
      continue;
    }

    try {
      const [files] = await bucket.getFiles({ prefix, maxResults: 40 });
      const refs = files
        .map((file) => file.name)
        .filter((name) => /\.(png|jpe?g|gif|webp|bmp|tiff?)$/i.test(name))
        .map((name, index) => {
          const fileName = path.basename(name);
          return {
            name: fileName,
            label: `Illustration ${index + 1}`,
            displayName: `Illustration ${index + 1}: ${fileName}`,
            illustrationNumber: index + 1,
            storagePath: name,
            sourcePath: name,
            inferred: true,
          };
        })
        .slice(0, 12);
      IMAGE_REF_CACHE.set(prefix, refs);
      images.push(...refs);
    } catch (error) {
      console.warn("[AskMagmo][image-infer]", {
        prefix,
        reason: error.message,
      });
      IMAGE_REF_CACHE.set(prefix, []);
    }
  }

  const seen = new Set();
  return images.filter((image) => {
    const key = image.storagePath || image.sourcePath || image.name;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function addInferredImagesToChunks(chunks) {
  const enriched = [];
  for (const chunk of chunks) {
    const metadata = chunk.metadata || {};
    const existingImages = Array.isArray(metadata.relatedImages)
      ? metadata.relatedImages
      : [];
    if (existingImages.length) {
      enriched.push(chunk);
      continue;
    }

    const inferredImages = await inferImagesForChunk(chunk);
    enriched.push({
      ...chunk,
      metadata: {
        ...metadata,
        relatedImages: inferredImages,
      },
    });
  }

  const imageCount = enriched.reduce(
    (total, chunk) => total + (chunk.metadata?.relatedImages?.length || 0),
    0
  );
  if (imageCount) {
    console.log("[AskMagmo][images]", {
      chunksChecked: chunks.length,
      imageRefs: imageCount,
    });
  }

  return enriched;
}

async function loadFeedbackHints(scope, question, startedAt) {
  if (!adminDb) return [];
  const scopeKey = buildScopeKey(scope);
  const terms = getIndexedSearchTerms(question);
  if (!scopeKey || !terms.length) return [];

  try {
    const snap = await adminDb
      .collection("AskMagmoFeedback")
      .where("scopeKey", "==", scopeKey)
      .where("terms", "array-contains-any", terms)
      .limit(8)
      .get();

    const hints = [];
    snap.docs.forEach((doc) => {
      const data = doc.data() || {};
      const correction = String(data.correction || "").trim();
      if (!correction) return;
      hints.push({
        question: redactSensitiveText(String(data.questionPreview || data.question || "")).slice(0, 240),
        correction: redactSensitiveText(correction).slice(0, 900),
      });
    });

    if (hints.length) {
      console.log("[AskMagmo][feedback-hints]", {
        hints: hints.length,
        elapsedMs: getElapsedMs(startedAt),
      });
    }
    return hints;
  } catch (error) {
    console.warn("[AskMagmo][feedback-hints]", {
      reason: error.message,
    });
    return [];
  }
}

function buildFeedbackContext(hints) {
  if (!Array.isArray(hints) || !hints.length) return "";
  return hints
    .map(
      (hint, index) =>
        `Feedback note [${index + 1}]\nPrior question: ${hint.question}\nTechnician correction: ${hint.correction}`
    )
    .join("\n\n---\n\n");
}

function normalizeConversation(rawConversation) {
  if (!Array.isArray(rawConversation)) return [];

  return rawConversation
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.text === "string" &&
        message.text.trim()
    )
    .slice(-MAX_CONVERSATION_MESSAGES)
    .map((message) => ({
      role: message.role,
      text: redactSensitiveText(message.text.trim()).slice(
        0,
        MAX_CONVERSATION_TEXT_CHARS
      ),
      sources: Array.isArray(message.sources)
        ? message.sources
            .map((source) => String(source || "").trim())
            .filter(Boolean)
            .slice(0, 8)
        : [],
      feedbackRating: message.feedbackRating || null,
      feedbackCorrection: redactSensitiveText(
        String(message.feedbackCorrection || "").trim()
      ).slice(0, 600),
    }));
}

function buildConversationContext(conversation) {
  if (!conversation.length) return "";

  return conversation
    .map((message, index) => {
      const lines = [
        `${index + 1}. ${message.role === "user" ? "Technician" : "Magmo"}: ${
          message.text
        }`,
      ];

      if (message.sources?.length) {
        lines.push(`Sources shown: ${message.sources.join(", ")}`);
      }
      if (message.feedbackRating) {
        lines.push(`Feedback: ${message.feedbackRating}`);
      }
      if (message.feedbackCorrection) {
        lines.push(`Technician correction: ${message.feedbackCorrection}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

function buildRetrievalQuestion(question, conversation) {
  const priorUserQuestions = conversation
    .filter((message) => message.role === "user")
    .slice(-3)
    .map((message) => message.text);
  const recentCorrections = conversation
    .filter((message) => message.feedbackCorrection)
    .slice(-2)
    .map((message) => message.feedbackCorrection);

  const combined = [
    ...priorUserQuestions,
    ...recentCorrections.map((correction) => `Correction: ${correction}`),
    question,
  ]
    .filter(Boolean)
    .join("\n");

  return combined.slice(-MAX_RETRIEVAL_QUERY_CHARS);
}

async function saveAskMagmoInteraction({
  responseId,
  sessionId,
  user,
  question,
  retrievalQuestion,
  scope,
  sources,
  images,
  metrics,
}) {
  if (!adminDb || !responseId) return;
  try {
    await adminDb.collection("AskMagmoInteractions").doc(responseId).set(
      {
        responseId,
        userHash: hashIdentifier(user?.uid || user?.email),
        sessionHash: hashIdentifier(sessionId),
        questionPreview: redactSensitiveText(question).slice(0, 240),
        retrievalPreview: redactSensitiveText(retrievalQuestion).slice(0, 500),
        scope: scope || null,
        scopeKey: buildScopeKey(scope),
        sources: Array.isArray(sources) ? sources.slice(0, 20) : [],
        images: Array.isArray(images) ? images : [],
        terms: getIndexedSearchTerms(redactSensitiveText(question)),
        metrics,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("[AskMagmo][interaction-save]", {
      responseId,
      reason: error.message,
    });
  }
}

function extractResponseText(response) {
  if (response?.output_text) return response.output_text;

  const parts = [];
  for (const output of response?.output || []) {
    for (const content of output?.content || []) {
      if (content?.text) parts.push(content.text);
      if (content?.type === "output_text" && content?.text) {
        parts.push(content.text);
      }
    }
  }

  return parts.join("\n").trim();
}

function supportsGpt5Controls(model) {
  return /^gpt-5/i.test(String(model || ""));
}

function buildWebSearchTool() {
  return {
    type: "web_search",
    search_context_size: ASK_MAGMO_WEB_SEARCH_CONTEXT_SIZE,
    user_location: {
      type: "approximate",
      country: "US",
      timezone: "America/Los_Angeles",
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Send POST with { question }." });
  }

  const startedAt = Date.now();

  try {
    const authUser = await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;
    assertAskMagmoUserAllowed(authUser);

    const { question, scope, collection, conversation: rawConversation, sessionId } =
      req.body || {};
    if (!question || typeof question !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'question' in body." });
    }

    const originalQuestion = question.trim();
    if (originalQuestion.length > MAX_QUESTION_CHARS) {
      return res.status(413).json({
        error: `Question is too long. Please keep it under ${MAX_QUESTION_CHARS} characters.`,
        code: "question_too_large",
      });
    }
    const normalizedQuestion = redactSensitiveText(originalQuestion);
    await enforceAskMagmoRateLimit({ req, user: authUser });

    const requestedCollection =
      String(
        collection ||
          process.env.ASK_MAGMO_CHUNKS_COLLECTION ||
          DEFAULT_STORE_COLLECTION
      ).trim() || DEFAULT_STORE_COLLECTION;
    const conversation = normalizeConversation(rawConversation);
    const conversationContext = buildConversationContext(conversation);
    const retrievalQuestion = buildRetrievalQuestion(
      normalizedQuestion,
      conversation
    );

    console.log("[AskMagmo][request]", {
      collection: requestedCollection,
      scope: formatSelectedScope(scope),
      pageSize: PAGE_SIZE,
      candidatePoolSize: CANDIDATE_POOL_SIZE,
      topK: TOP_K,
      model: ASK_MAGMO_MODEL,
      conversationMessages: conversation.length,
      retrievalTerms: getIndexedSearchTerms(retrievalQuestion),
    });

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: OPENAI_TIMEOUT_MS,
    });

    const skipManualSearch = isCasualQuestion(normalizedQuestion);
    const scopedCountPromise = skipManualSearch
      ? Promise.resolve(null)
      : countScopedChunks(requestedCollection, scope);
    let prefilterResult = {
      topCandidates: [],
      pagesRead: 0,
      docsRead: 0,
      keywordMatches: 0,
      skippedChunks: 0,
      cacheHit: false,
      cacheAgeMs: 0,
      indexedDocs: 0,
      usedIndexedSearch: false,
    };
    let scoredResult = {
      topScored: [],
      docsRead: 0,
      chunksScored: 0,
      skippedChunks: 0,
    };
    let topChunks = [];

    if (skipManualSearch) {
      console.log("[AskMagmo][manual-search]", {
        skipped: true,
        reason: "casual_or_empty_service_terms",
      });
    } else {
      const qVecPromise = embedQuestion(client, retrievalQuestion).then((qVec) => {
        checkRequestBudget(startedAt, "embedding the question");
        console.log("[AskMagmo][timing]", {
          phase: "embedding",
          elapsedMs: getElapsedMs(startedAt),
        });
        return qVec;
      });
      const prefilterPromise = collectKeywordCandidates({
        collectionName: requestedCollection,
        scope,
        question: retrievalQuestion,
        startedAt,
      });

      const [qVec, collectedPrefilterResult] = await Promise.all([
        qVecPromise,
        prefilterPromise,
      ]);
      prefilterResult = collectedPrefilterResult;
      checkRequestBudget(startedAt, "prefiltering manual chunks");
      console.log("[AskMagmo][timing]", {
        phase: "prefilter",
        cacheHit: prefilterResult.cacheHit,
        elapsedMs: getElapsedMs(startedAt),
      });

      if (prefilterResult.topCandidates.length) {
        scoredResult = await scoreCandidateChunks({
          collectionName: requestedCollection,
          candidates: prefilterResult.topCandidates,
          qVec,
          question: retrievalQuestion,
          startedAt,
        });
        checkRequestBudget(startedAt, "scoring candidate manual chunks");
        console.log("[AskMagmo][timing]", {
          phase: "candidate-score",
          candidateDocsFetched: scoredResult.docsRead,
          elapsedMs: getElapsedMs(startedAt),
        });

        topChunks = scoredResult.topScored.map((x) => x.chunk);
      } else {
        console.log("[AskMagmo][manual-search]", {
          skipped: false,
          reason: "no_matching_manual_chunks",
          elapsedMs: getElapsedMs(startedAt),
        });
      }
    }

    if (topChunks.length) {
      topChunks = await addInferredImagesToChunks(topChunks);
    }

    const contextText = buildContextFromChunks(topChunks);
    const feedbackHints = await loadFeedbackHints(
      scope,
      retrievalQuestion,
      startedAt
    );
    const feedbackContext = buildFeedbackContext(feedbackHints);
    const manualContextBlock = contextText
      ? contextText
      : "No relevant manual chunks were found for this question in the selected scope.";
    const webSearchReason = getWebSearchReason({
      enabled: ASK_MAGMO_WEB_SEARCH_ENABLED,
      skipManualSearch,
      topChunks,
      question: normalizedQuestion,
      retrievalQuestion,
      conversation,
    });
    const webSearchInstruction = webSearchReason
      ? `Web search is enabled for this response because: ${webSearchReason}. If the manual context does not answer the user's requested detail, perform a web search and clearly label internet-sourced details.`
      : "";
    const completionRequest = {
      model: ASK_MAGMO_MODEL,
      store: false,
      input: [
        {
          role: "system",
          content:
            "You are Magmo, an internal AIS service assistant for MRI/CT installs, faults, and safety. " +
            "For service questions, use the provided service manual context as the primary source of truth. " +
            "If the manuals answer the question, rely on them and do not use outside information to override them. " +
            "If the manuals are missing the needed detail, if the question is casual/general, or if current outside information is needed, you may use web search. " +
            "When you use web search, clearly say which details came from the internet and include/carry through citations. " +
            "For safety-critical service, parts compatibility, tube compatibility, calibration, or replacement decisions, never present web results as final approval; treat them as leads and advise verification against OEM service parts/manuals. " +
            "Treat the current question as part of the same chat. Resolve follow-up questions using the conversation history, " +
            "so phrases like 'what about unified?' or 'that setup' refer to the previous coil, system, and procedure unless the technician clearly changes topics. " +
            "Do not switch to a different coil/body part just because a follow-up question is short. " +
            "If you are not certain or it is safety critical, say you are not certain and advise escalation. " +
            "Speak in direct technician language, not marketing language. " +
            "Use clean Markdown formatting when it improves readability: concise headings, bullets, numbered steps, bold for important labels, inline code for exact names, and links when needed. Do not overuse bold or decorate every key phrase. " +
            "Choose the answer format that best fits the question instead of using a fixed template. " +
            "For procedural service questions, use concise section headings only when they help scanning, such as Summary, Setup, Steps, Checks, Troubleshooting, Pictures, Sources, or Uncertainty. " +
            "For quick facts, definitions, casual chat, or follow-up clarifications, answer naturally without forcing safety, procedure, checks, or uncertainty sections. " +
            "Include safety notes only when the task has a real safety risk. Include sources when manual or web evidence was used. " +
            "If the context does not support a requested detail, say what is missing instead of inventing it. " +
            "If technician feedback notes are provided, use them as preference/correction hints only when they are relevant to this question. " +
            "When relevant pictures are listed in the manual context, mention their Illustration numbers in the exact procedural step where they belong, " +
            "for example 'as shown in Illustration 2', so the UI can place picture buttons near the matching text. " +
            "Do not save all picture references for the end if they apply to specific steps.",
        },
        {
          role: "user",
          content:
            `Question: ${normalizedQuestion}\n\n` +
            (conversationContext
              ? `Conversation history for this chat:\n${conversationContext}\n\n`
              : "") +
            (feedbackContext
              ? `Relevant technician feedback notes:\n${feedbackContext}\n\n`
              : "") +
            (webSearchInstruction ? `${webSearchInstruction}\n\n` : "") +
            `Relevant manual context:\n${manualContextBlock}`,
        },
      ],
    };

    const shouldAllowWebSearch = Boolean(webSearchReason);

    if (shouldAllowWebSearch) {
      completionRequest.tools = [buildWebSearchTool()];
      completionRequest.tool_choice = "auto";
      completionRequest.include = ["web_search_call.action.sources"];
      console.log("[AskMagmo][web-search]", {
        enabled: true,
        reason: webSearchReason,
        manualChunksFound: topChunks.length,
      });
    }

    if (MAX_OUTPUT_TOKENS > 0) {
      completionRequest.max_output_tokens = MAX_OUTPUT_TOKENS;
    }
    if (supportsGpt5Controls(ASK_MAGMO_MODEL)) {
      completionRequest.reasoning = {
        effort: ASK_MAGMO_REASONING_EFFORT,
      };
      completionRequest.text = {
        verbosity: ASK_MAGMO_VERBOSITY,
      };
    }

    const completion = await client.responses.create(completionRequest);
    console.log("[AskMagmo][timing]", {
      phase: "openai-completion",
      responseStatus: completion?.status || null,
      incompleteReason: completion?.incomplete_details?.reason || null,
      elapsedMs: getElapsedMs(startedAt),
    });

    const scopedStoreSize = await scopedCountPromise;
    const finalAnswer = extractResponseText(completion);
    const manualSources = buildSourceDebug(topChunks);
    const webSources = extractWebSources(completion);
    const sources = [...manualSources, ...webSources];
    const images = buildImageRefs(topChunks);
    const responseId = createLocalResponseId();

    if (!finalAnswer) {
      console.warn("[AskMagmo][empty-answer]", {
        responseStatus: completion?.status || null,
        incompleteDetails: completion?.incomplete_details || null,
        outputTypes: Array.isArray(completion?.output)
          ? completion.output.map((output) => output?.type)
          : [],
      });
    }

    const metrics = {
      chunksUsed: topChunks.length,
      scopedStoreSize: scopedStoreSize ?? scoredResult.docsRead,
      pagesRead: prefilterResult.pagesRead,
      docsRead: prefilterResult.docsRead,
      chunksScored: scoredResult.chunksScored,
      skippedChunks: prefilterResult.skippedChunks + scoredResult.skippedChunks,
      keywordMatches: prefilterResult.keywordMatches,
      prefilterCacheHit: prefilterResult.cacheHit,
      prefilterIndexedDocs: prefilterResult.indexedDocs,
      candidateDocsFetched: scoredResult.docsRead,
      feedbackHintsUsed: feedbackHints.length,
      webSearchEnabled: shouldAllowWebSearch,
      webSourcesUsed: webSources.length,
      usedIndexedSearch: Boolean(prefilterResult.usedIndexedSearch),
      contextChars: contextText.length,
      elapsedMs: Date.now() - startedAt,
    };

    await saveAskMagmoInteraction({
      responseId,
      sessionId,
      user: authUser,
      question: originalQuestion,
      retrievalQuestion,
      scope,
      sources,
      images,
      metrics,
    });

    return res.status(200).json({
      answer:
        finalAnswer ||
        "Magmo found relevant manual sections, but the model did not return answer text. Try the question again.",
      responseId,
      sources,
      images,
      chunksUsed: metrics.chunksUsed,
      scopedStoreSize: metrics.scopedStoreSize,
      storeSize: null,
      pagesRead: metrics.pagesRead,
      docsRead: metrics.docsRead,
      chunksScored: metrics.chunksScored,
      skippedChunks: metrics.skippedChunks,
      keywordMatches: metrics.keywordMatches,
      prefilterCacheHit: metrics.prefilterCacheHit,
      prefilterIndexedDocs: metrics.prefilterIndexedDocs,
      candidateDocsFetched: metrics.candidateDocsFetched,
      feedbackHintsUsed: metrics.feedbackHintsUsed,
      webSearchEnabled: metrics.webSearchEnabled,
      webSourcesUsed: metrics.webSourcesUsed,
      conversationMessages: conversation.length,
      usedIndexedSearch: metrics.usedIndexedSearch,
      contextChars: metrics.contextChars,
      elapsedMs: metrics.elapsedMs,
    });
  } catch (err) {
    if (err instanceof AskMagmoAccessError) {
      console.warn("[AskMagmo][access-denied]", safeErrorDetails(err));
      return res.status(err.status || 403).json({
        error: err.message,
        code: err.code,
      });
    }

    if (err instanceof AskMagmoRateLimitError) {
      console.warn("[AskMagmo][rate-limit]", {
        code: err.code,
        retryAfterSeconds: err.retryAfterSeconds,
      });
      res.setHeader("Retry-After", String(err.retryAfterSeconds || 60));
      return res.status(429).json({
        error: err.message,
        code: err.code,
        retryAfterSeconds: err.retryAfterSeconds,
      });
    }

    if (err instanceof AskMagmoRetrievalError) {
      console.error("AskMagmo retrieval error:", err);
      return res.status(503).json({
        error: "AskMagmo could not retrieve service manual chunks for this scope.",
        code: err.code,
        details: err.details,
      });
    }

    if (err instanceof AskMagmoTimeoutError || err?.code?.includes("timeout")) {
      console.warn("AskMagmo timeout:", safeErrorDetails(err));
      return res.status(504).json({
        error:
          "AskMagmo stopped because the selected manual data was too large or took too long to search. Try a narrower question or manual scope.",
        code: err.code || "askmagmo_timeout",
      });
    }

    if (err?.name === "APIConnectionTimeoutError") {
      console.warn("AskMagmo OpenAI timeout:", safeErrorDetails(err));
      return res.status(504).json({
        error:
          "AskMagmo found relevant manual sections, but the model took too long to write the answer. Try asking a narrower question.",
        code: "openai_response_timeout",
      });
    }

    console.error("AskMagmo API error:", safeErrorDetails(err));
    return res.status(500).json({
      error: "Internal Server Error while answering from manuals.",
    });
  }
}
