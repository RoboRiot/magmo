import { adminDb } from "../../../context/FirebaseAdmin";
import { loadDashboardData } from "../../../lib/magmonitor/server";
import { requireFirebaseAuth } from "../../../utils/apiAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return;
  if (!user?.uid) {
    return res.status(401).json({ error: "Authentication required." });
  }
  if (!adminDb) {
    return res.status(503).json({ error: "Magmonitor data is unavailable." });
  }

  try {
    const payload = await loadDashboardData(adminDb, {
      range: req.query?.range,
      systemIds: req.query?.systems,
      includeHistory: req.query?.history !== "false",
    });
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({ ok: true, ...payload });
  } catch (error) {
    console.error("[Magmonitor][data]", error?.message);
    return res.status(500).json({
      error: "Magmonitor could not load the requested readings.",
    });
  }
}
