import { checkBlueFolderAndPostToSlack } from "../../../../lib/bluefolder/checkBlueFolderAndPostToSlack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET || process.env.BLUEFOLDER_SLACK_CRON_SECRET;
  if (!secret) return true;
  const url = new URL(request.url);
  const header = request.headers.get("authorization") || "";
  return header === `Bearer ${secret}` || url.searchParams.get("secret") === secret;
}

async function run(request) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const result = await checkBlueFolderAndPostToSlack({
    testSlack: url.searchParams.get("testSlack") === "1",
  });
  return Response.json(result, { status: result.ok ? 200 : 502 });
}

export async function GET(request) {
  return run(request);
}

export async function POST(request) {
  return run(request);
}
