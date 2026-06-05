import { handleSlackEventsRequest } from "../../../../lib/slack/eventsHandler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const result = await handleSlackEventsRequest({
      rawBody,
      headers: request.headers,
    });
    return Response.json(result.body, { status: result.status });
  } catch (error) {
    console.error("[SlackEvents]", error);
    return Response.json(
      { ok: false, error: "slack_event_failed", message: String(error?.message || error) },
      { status: 500 }
    );
  }
}
