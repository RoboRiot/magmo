import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { adminDb } from "../../../context/FirebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import crypto from "crypto";

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

function normalizeSearchText(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeScopeValue(value) {
  return String(value || "").trim();
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

function getTerms(question) {
  const stop = new Set([
    "a",
    "an",
    "and",
    "are",
    "can",
    "do",
    "does",
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
  return normalizeSearchText(question)
    .split(" ")
    .filter((word) => (word.length >= 2 || /\d/.test(word)) && !stop.has(word))
    .slice(0, 10);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const authUser = await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;
    if (!adminDb) {
      return res.status(503).json({ error: "Firebase Admin not available." });
    }

    const {
      responseId,
      rating,
      correction,
      sessionId,
      question,
      scope,
      sources,
    } = req.body || {};
    const normalizedRating = String(rating || "").trim();
    if (!["helpful", "not_helpful"].includes(normalizedRating)) {
      return res.status(400).json({ error: "Invalid feedback rating." });
    }

    const id =
      responseId && typeof responseId === "string"
        ? responseId
        : `feedback_${Date.now()}`;
    let interaction = null;
    try {
      const interactionSnap = await adminDb
        .collection("AskMagmoInteractions")
        .doc(id)
        .get();
      interaction = interactionSnap.exists ? interactionSnap.data() : null;
    } catch (error) {
      console.warn("[AskMagmo][feedback-interaction-lookup]", {
        responseId: id,
        reason: error.message,
      });
    }

    const payload = {
      responseId: id,
      rating: normalizedRating,
      correction: redactSensitiveText(String(correction || "").trim()).slice(0, 4000),
      questionPreview: redactSensitiveText(
        interaction?.questionPreview || question || ""
      ).slice(0, 240),
      scope: scope || interaction?.scope || null,
      scopeKey: buildScopeKey(scope || interaction?.scope),
      sources: Array.isArray(sources) ? sources.slice(0, 20) : [],
      terms:
        Array.isArray(interaction?.terms) && interaction.terms.length
          ? interaction.terms.slice(0, 10)
          : getTerms(redactSensitiveText(question)),
      userHash: hashIdentifier(authUser?.uid || authUser?.email),
      sessionHash: hashIdentifier(sessionId),
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    };

    await adminDb.collection("AskMagmoFeedback").doc(id).set(payload, {
      merge: true,
    });

    await adminDb.collection("AskMagmoInteractions").doc(id).set(
      {
        feedbackRating: normalizedRating,
        feedbackCorrection: payload.correction,
        feedbackUpdatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("AskMagmo feedback error:", {
      name: error?.name || null,
      code: error?.code || null,
      message: String(error?.message || "").slice(0, 300),
    });
    return res.status(500).json({ error: "Could not save AskMagmo feedback." });
  }
}
