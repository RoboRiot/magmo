import { handleSlackEventsRequest } from "../../../lib/slack/eventsHandler";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    const rawBody = await readRawBody(req);
    const result = await handleSlackEventsRequest({
      rawBody,
      headers: req.headers,
    });
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("[SlackEvents]", error);
    return res.status(500).json({
      ok: false,
      error: "slack_event_failed",
      message: String(error?.message || error),
    });
  }
}
