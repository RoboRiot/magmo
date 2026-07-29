import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";

export const OPS_COMPANY_MEMORY_COLLECTION = "OpsCompanyMemory";

const VALID_KINDS = new Set([
  "assignment_pattern",
  "priority_pattern",
  "workflow_pattern",
  "manual_assignment_example",
  "manual_priority_example",
]);
const VALID_TIERS = new Set([
  "hard_down",
  "in_progress",
  "needs_scheduled",
  "anytime",
]);
const GENERATED_TIER_PATTERN = /^generated_[a-z0-9]+(?:_[a-z0-9]+){0,4}$/;
let memoryCache = { expiresAt: 0, rows: [] };

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "by", "for", "from",
  "has", "have", "in", "is", "it", "of", "on", "or", "that", "the", "this",
  "to", "was", "were", "will", "with", "work", "order",
]);

function clean(value, maxLength = 500) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function safeId(value) {
  return clean(value, 180).replace(/[^A-Za-z0-9_.-]/g, "_");
}

function tokens(value) {
  return Array.from(
    new Set(
      clean(value, 5000)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .split(/\s+/)
        .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
    )
  ).slice(0, 80);
}

function normalizeKeywords(value, fallback = "") {
  const supplied = Array.isArray(value) ? value.join(" ") : value;
  return tokens(`${supplied || ""} ${fallback}`).slice(0, 18);
}

function normalizeTier(value, allowNone = true) {
  const tier = clean(value, 40).toLowerCase();
  if (VALID_TIERS.has(tier) || GENERATED_TIER_PATTERN.test(tier)) return tier;
  return allowNone ? "" : "needs_scheduled";
}

function normalizeLesson(lesson = {}, context = {}) {
  const summary = clean(lesson.summary, 600);
  if (!summary) return null;
  const kind = VALID_KINDS.has(clean(lesson.kind, 60))
    ? clean(lesson.kind, 60)
    : "workflow_pattern";
  const assigneeNames = Array.from(
    new Set(
      (Array.isArray(lesson.assigneeNames) ? lesson.assigneeNames : [])
        .map((name) => clean(name, 100))
        .filter(Boolean)
    )
  ).slice(0, 8);
  return {
    kind,
    summary,
    keywords: normalizeKeywords(
      lesson.keywords,
      `${context.subject || ""} ${context.customer || ""}`
    ),
    assigneeNames,
    priorityTier: normalizeTier(lesson.priorityTier),
    rejectedPriorityTier: normalizeTier(lesson.rejectedPriorityTier),
    polarity: clean(lesson.polarity, 20) === "negative" ? "negative" : "positive",
    confidence: Math.max(0, Math.min(1, Number(lesson.confidence || 0))),
  };
}

export async function saveOpsCompanyLessons({
  workOrder = {},
  lessons = [],
  source = "completion",
  sourceId = "",
  approvedBy = "",
}) {
  if (!adminDb) return [];
  const normalized = (Array.isArray(lessons) ? lessons : [])
    .map((lesson) => normalizeLesson(lesson, workOrder))
    .filter(Boolean)
    .slice(0, 3);
  if (!normalized.length) return [];

  const workOrderId = clean(workOrder.id || workOrder.workOrderId || workOrder.number, 180);
  const baseId = safeId(sourceId || `${source}-${workOrderId}-${Date.now()}`);
  const batch = adminDb.batch();
  const ids = [];
  normalized.forEach((lesson, index) => {
    const id = `${baseId}-${index + 1}`;
    ids.push(id);
    batch.set(
      adminDb.collection(OPS_COMPANY_MEMORY_COLLECTION).doc(id),
      {
        ...lesson,
        status: "active",
        source: clean(source, 60),
        sourceId: clean(sourceId, 180),
        sourceWorkOrderId: workOrderId,
        sourceWorkOrderNumber: clean(workOrder.number || workOrderId, 120),
        sourceSubject: clean(workOrder.subject, 500),
        sourceCustomer: clean(workOrder.customer, 220),
        approvedBy: clean(approvedBy, 180),
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  await batch.commit();
  memoryCache = { expiresAt: 0, rows: [] };
  return ids;
}

export async function saveManualOpsMemory({
  workOrder,
  kind,
  summary,
  assigneeNames = [],
  priorityTier = "",
  rejectedPriorityTier = "",
  polarity = "positive",
  changedBy = "",
  sourceId = "",
}) {
  return saveOpsCompanyLessons({
    workOrder,
    source: "admin_correction",
    sourceId: sourceId || `admin-${workOrder?.id || Date.now()}-${Date.now()}`,
    approvedBy: changedBy,
    lessons: [
      {
        kind,
        summary,
        keywords: tokens(`${workOrder?.subject || ""} ${workOrder?.customer || ""}`),
        assigneeNames,
        priorityTier,
        rejectedPriorityTier,
        polarity,
        confidence: 1,
      },
    ],
  });
}

export async function getRelevantOpsCompanyMemory(workOrder = {}, message = {}) {
  if (!adminDb) return [];
  const queryTokens = new Set(
    tokens(
      `${workOrder.subject || ""} ${workOrder.customer || ""} ${
        workOrder.description || ""
      } ${message.text || ""}`
    )
  );
  if (!queryTokens.size) return [];

  if (memoryCache.expiresAt <= Date.now()) {
    const snapshot = await adminDb
      .collection(OPS_COMPANY_MEMORY_COLLECTION)
      .limit(250)
      .get();
    memoryCache = {
      expiresAt: Date.now() + 120000,
      rows: snapshot.docs.map((document) => ({
        id: document.id,
        data: document.data() || {},
      })),
    };
  }
  return memoryCache.rows
    .map(({ id, data }) => {
      if (String(data.status || "active").toLowerCase() !== "active") return null;
      const memoryTokens = new Set(
        normalizeKeywords(data.keywords, `${data.summary || ""} ${data.sourceSubject || ""}`)
      );
      let overlap = 0;
      memoryTokens.forEach((token) => {
        if (queryTokens.has(token)) overlap += token.length >= 7 ? 2 : 1;
      });
      const customerMatch =
        clean(workOrder.customer, 220) &&
        clean(workOrder.customer, 220).toLowerCase() ===
          clean(data.sourceCustomer, 220).toLowerCase();
      const score = overlap + (customerMatch ? 4 : 0);
      if (score <= 0) return null;
      return {
        id,
        kind: clean(data.kind, 60),
        summary: clean(data.summary, 600),
        assigneeNames: (Array.isArray(data.assigneeNames) ? data.assigneeNames : [])
          .map((name) => clean(name, 100))
          .filter(Boolean)
          .slice(0, 8),
        priorityTier: normalizeTier(data.priorityTier),
        rejectedPriorityTier: normalizeTier(data.rejectedPriorityTier),
        polarity: clean(data.polarity, 20) === "negative" ? "negative" : "positive",
        confidence: Number(data.confidence || 0),
        score,
      };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score || right.confidence - left.confidence)
    .slice(0, 5);
}
