import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import cosineSim from "../../../utils/cosineSim";

// how many best chunks to send to the model
const TOP_K = 5;

// cache store in memory so we don't read disk every request
let STORE_CACHE = null;

function loadStore() {
  if (STORE_CACHE) return STORE_CACHE;

  // you're storing knowledge_store.json in the same folder as this route:
  // pages/api/gpt/knowledge_store.json
  const storePath = path.join(process.cwd(), "pages", "api", "gpt", "knowledge_store.json");

  const raw = fs.readFileSync(storePath, "utf-8");
  STORE_CACHE = JSON.parse(raw); // [{ source, text, embedding: [ ...numbers ] }, ...]
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
        `Source: ${c.source}\nContent:\n${c.text}`
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
    const { question } = req.body || {};

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
    const store = loadStore(); // array of { source, text, embedding }

    // 2. embed the user's question
    const qVec = await embedQuestion(client, question);

    // 3. score each chunk by cosine similarity
    const scored = store.map((chunk) => {
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
    });
  } catch (err) {
    console.error("AskMagmo API error:", err);
    return res.status(500).json({
      error: "Internal Server Error while answering from manuals.",
    });
  }
}
