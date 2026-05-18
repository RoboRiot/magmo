const DEFAULT_PUBLIC_BASE =
  process.env.NGROK_BASE_URL ||
  "https://unobtruded-unquibbling-kandice.ngrok-free.dev";
const PRINT_MULTI_PROXY_URL =
  process.env.PRINT_MULTI_PROXY_URL ||
  `${String(DEFAULT_PUBLIC_BASE).replace(/\/$/, "")}/print_multi`;
const PRINT_MULTI_LOCAL_URL =
  process.env.PRINT_MULTI_LOCAL_URL || "http://127.0.0.1:5000/print_multi";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
  await requireFirebaseAuth(req, res);
  if (res.writableEnded) return;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const candidates = Array.from(
      new Set([PRINT_MULTI_PROXY_URL, PRINT_MULTI_LOCAL_URL].filter(Boolean))
    );
    const attempts = [];
    let upstream = null;

    for (const targetUrl of candidates) {
      const headers = { "Content-Type": "application/json" };
      if (/ngrok/i.test(targetUrl)) {
        headers["ngrok-skip-browser-warning"] = "true";
      }

      try {
        const attempt = await fetch(targetUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(req.body || {}),
          signal: controller.signal,
        });
        attempts.push({ url: targetUrl, status: attempt.status });
        if (attempt.status === 404) {
          continue;
        }
        upstream = attempt;
        break;
      } catch (attemptError) {
        attempts.push({
          url: targetUrl,
          error: String(attemptError?.message || attemptError),
        });
      }
    }

    if (!upstream) {
      const all404 =
        attempts.length > 0 && attempts.every((entry) => entry.status === 404);
      return res.status(all404 ? 404 : 502).json({
        ok: false,
        error: all404
          ? "Print multi endpoint not found on configured upstreams"
          : "Print multi upstream request failed on all configured upstreams",
        attempts,
      });
    }

    const raw = await upstream.text();
    let payload = null;
    try {
      payload = raw ? JSON.parse(raw) : null;
    } catch {
      payload = { raw };
    }

    const responsePayload = {
      ok: upstream.ok,
      status: upstream.status,
      ...(payload && typeof payload === "object" ? payload : { data: payload }),
      attempts,
    };
    if (!upstream.ok && !responsePayload.error) {
      responsePayload.error = `Print multi upstream returned ${upstream.status}`;
    }

    return res.status(upstream.status).json(responsePayload);
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    return res.status(isAbort ? 504 : 502).json({
      ok: false,
      error: isAbort ? "Print multi upstream timeout" : "Print multi upstream request failed",
      details: String(error?.message || error),
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
