import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import cosineSim from "../../../utils/cosineSim";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { adminDb } from "../../../context/FirebaseAdmin";

// how many best chunks to send to the model
const TOP_K = 5;
const MAX_CHUNK_CONTEXT_CHARS = 4000;
const STORE_CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_STORE_COLLECTION = "ServiceDocChunks";

// cache store in memory so we don't read disk every request
let STORE_CACHE = [];
let STORE_CACHE_KEY = null;
let STORE_CACHE_AT = 0;

function normalizeChunk(chunk, fallbackSource = "unknown") {
  if (!chunk) return null;
  const source = String(
    chunk.sourcePath ||
      chunk.source ||
      chunk.fileName ||
      fallbackSource
  ).trim();
  const text = String(chunk.text || chunk.summary || "").trim();
  const embedding = Array.isArray(chunk.embedding) ? chunk.embedding : [];
  if (!source || !text || embedding.length === 0) return null;
  return {
    source,
    text,
    embedding,
    metadata: {
      vendor: chunk.vendor || null,
      modality: chunk.modality || null,
      machineFamily: chunk.machineFamily || null,
    },
  };
}

function loadLocalStore() {
  // you're storing knowledge_store.json in the same folder as this route:
  // pages/api/gpt/knowledge_store.json
  const storePath = path.join(process.cwd(), "pages", "api", "gpt", "knowledge_store.json");
  if (!fs.existsSync(storePath)) return [];

  const raw = fs.readFileSync(storePath, "utf-8");
  const parsed = JSON.parse(raw);
  return (Array.isArray(parsed) ? parsed : [])
    .map((entry) => normalizeChunk(entry, "local_store"))
    .filter(Boolean);
}

async function loadFirestoreStore(collectionName) {
  if (!adminDb) return [];
  const snap = await adminDb.collection(collectionName).get();
  if (snap.empty) return [];
  return snap.docs
    .map((doc) => normalizeChunk(doc.data(), doc.id))
    .filter(Boolean);
}

function normalizeScopeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function filterStoreByScope(store, scope) {
  const vendor = normalizeScopeValue(scope?.vendor);
  const modality = normalizeScopeValue(scope?.modality);
  const machineFamily = normalizeScopeValue(scope?.machineFamily);

  if (!vendor && !modality && !machineFamily) {
    return store;
  }

  return store.filter((entry) => {
    const metadata = entry?.metadata || {};
    const chunkVendor = normalizeScopeValue(metadata.vendor);
    const chunkModality = normalizeScopeValue(metadata.modality);
    const chunkMachine = normalizeScopeValue(metadata.machineFamily);

    if (vendor && chunkVendor !== vendor) return false;
    if (modality && chunkModality !== modality) return false;
    if (machineFamily && chunkMachine !== machineFamily) return false;
    return true;
  });
}

async function loadStore(collectionName = DEFAULT_STORE_COLLECTION) {
  const cacheKey = String(collectionName || DEFAULT_STORE_COLLECTION);
  const cacheFresh = Date.now() - STORE_CACHE_AT < STORE_CACHE_TTL_MS;
  if (cacheFresh && STORE_CACHE_KEY === cacheKey && STORE_CACHE.length) {
    return STORE_CACHE;
  }

  let nextStore = [];

  try {
    nextStore = await loadFirestoreStore(cacheKey);
  } catch (error) {
    console.warn("AskMagmo Firestore store load failed:", error.message);
  }

  if (!nextStore.length) {
    nextStore = loadLocalStore();
  }

  STORE_CACHE = nextStore;
  STORE_CACHE_KEY = cacheKey;
  STORE_CACHE_AT = Date.now();

  return STORE_CACHE;
}

async function embedQuestion(client, question) {
  const resp = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: [question],
  });
  return resp.data[0].embedding;
}

function buildContextFromChunks(chunks) {
  return chunks
    .map(
      (c, i) =>
        `Source [${i + 1}]: ${c.source}\nContent:\n${String(c.text || "").slice(0, MAX_CHUNK_CONTEXT_CHARS)}`
    )
    .join("\n\n---\n\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Send POST with { question }." });
  }

  try {
    await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;

    const { question, scope, collection } = req.body || {};

    if (!question || typeof question !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'question' in body." });
    }

    // init OpenAI client with your server-side key
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1. load all chunks from the local knowledge store
    const requestedCollection = String(
      collection || process.env.ASK_MAGMO_CHUNKS_COLLECTION || DEFAULT_STORE_COLLECTION
    ).trim();
    const store = await loadStore(requestedCollection); // [{ source, text, embedding }]
    if (!store.length) {
      return res.status(503).json({
        error: "No service-doc chunks are available. Run the ingest script first.",
      });
    }
    const scopedStore = filterStoreByScope(store, scope);
    const activeStore = scopedStore.length ? scopedStore : store;

    // 2. embed the user's question
    const qVec = await embedQuestion(client, question);

    // 3. score each chunk by cosine similarity
    const scored = activeStore.map((chunk) => {
      const sim = cosineSim(qVec, chunk.embedding);
      return { sim, chunk };
    });

    // 4. take the top K most relevant chunks
    scored.sort((a, b) => b.sim - a.sim);
    const topChunks = scored.slice(0, TOP_K).map((x) => x.chunk);

    // 5. build a context block from those chunks
    const contextText = buildContextFromChunks(topChunks);

    // 6. ask the model to answer USING ONLY THAT CONTEXT
    const completion = await client.responses.create({
      model: "gpt-5", // or "gpt-4o" etc. use the model you have quota for
      input: [
        {
          role: "system",
          content:
            "You are Magmo, an internal AIS service assistant for MRI/CT installs, faults, and safety. " +
            "You must answer using ONLY the provided context below. " +
            "If you are not certain or it is safety critical, say you are not certain and advise escalation. " +
            "Speak in direct technician language, not marketing language.",
        },
        {
          role: "user",
          content:
            `Question: ${question}\n\n` +
            `Relevant manual context:\n${contextText}`,
        },
      ],
    });

    const finalAnswer = completion.output_text || "(No answer)";

    return res.status(200).json({
      answer: finalAnswer,
      sources: topChunks.map((chunk) => chunk.source),
      chunksUsed: topChunks.length,
      storeSize: activeStore.length,
    });
  } catch (err) {
    console.error("AskMagmo API error:", err);
    return res.status(500).json({
      error: "Internal Server Error while answering from manuals.",
    });
  }
}
