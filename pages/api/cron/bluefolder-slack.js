export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }
  // Fail closed permanently so this old web poller cannot race either active
  // creator: MAGMO Dispatch for MAGMO requests, or the standalone Python
  // listener for work orders created directly in BlueFolder.
  res.setHeader("Cache-Control", "no-store");
  return res.status(410).json({
    ok: false,
    error: "legacy_bluefolder_slack_cron_disabled",
    message:
      "This legacy web poller is disabled. MAGMO Dispatch owns MAGMO-created roots; the standalone Python listener owns BlueFolder-created roots.",
  });
}
