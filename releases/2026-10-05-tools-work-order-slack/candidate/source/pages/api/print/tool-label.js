import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { adminDb } from "../../../context/FirebaseAdmin";
import toolLabelData from "../../../lib/inventory/toolLabelData.cjs";

const { loadToolLabelPayload } = toolLabelData;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }
  await requireFirebaseAuth(req, res);
  if (res.writableEnded) return;
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body) ||
      Object.keys(body).length !== 1 || !Object.hasOwn(body, "toolId")) {
    return res.status(400).json({ ok: false, code: "invalid_request", error: "Request body may contain only toolId." });
  }
  const token = String(process.env.STORAGE_SCAN_BRIDGE_TOKEN || "").trim();
  if (!/^[A-Za-z0-9._~-]{32,512}$/.test(token)) {
    return res.status(503).json({ ok: false, code: "printer_auth_missing", error: "The tool-label printer credential is not configured." });
  }
  let payload;
  try {
    payload = await loadToolLabelPayload({ db: adminDb, toolId: body.toolId });
  } catch (error) {
    const status = Number(error?.statusCode) || 500;
    return res.status(status).json({ ok: false, code: error?.code || "tool_label_payload_failed", error: status >= 500 ? "The tool label data could not be loaded." : error.message });
  }
  const publicBase = process.env.NGROK_BASE_URL || "https://unobtruded-unquibbling-kandice.ngrok-free.dev";
  const target = process.env.PRINT_TOOL_LABEL_PROXY_URL || `${String(publicBase).replace(/\/$/, "")}/print-tool-label`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    // One request only. A timeout may mean the printer received the job; never
    // send a fallback/retry automatically and risk printing duplicate labels.
    const upstream = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(/ngrok/i.test(target) ? { "ngrok-skip-browser-warning": "true" } : {}) },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const response = await upstream.json().catch(() => null);
    if (!upstream.ok || response?.ok !== true) {
      return res.status(upstream.ok ? 502 : upstream.status).json({
        ok: false,
        code: response?.code || "tool_label_upstream_failed",
        error: response?.code === "print_failed" ? "The printer could not finish the tool label. Check the printer before retrying." : "The tool-label printer did not accept the request. Check the printer connection.",
      });
    }
    return res.status(200).json({ ok: true, status: "printed", toolId: payload.tool_id, pagesPrinted: 1 });
  } catch (error) {
    return res.status(error?.name === "AbortError" ? 504 : 502).json({
      ok: false, code: "tool_label_delivery_uncertain",
      error: "The printer response was not received. Check whether the label printed before trying again.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
