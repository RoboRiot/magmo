import { checkBlueFolderAndPostToSlack } from "../../../lib/bluefolder/checkBlueFolderAndPostToSlack";

function isAuthorized(req) {
  const secret = process.env.CRON_SECRET || process.env.BLUEFOLDER_SLACK_CRON_SECRET;
  if (!secret) return true;
  const header = req.headers.authorization || "";
  return header === `Bearer ${secret}` || req.query.secret === secret;
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  try {
    const result = await checkBlueFolderAndPostToSlack({
      testSlack: req.query.testSlack === "1",
    });
    return res.status(result.ok ? 200 : 502).json(result);
  } catch (error) {
    console.error("[BlueFolderSlackCron]", error);
    return res.status(500).json({
      ok: false,
      error: "bluefolder_slack_cron_failed",
      message: String(error?.message || error),
    });
  }
}
