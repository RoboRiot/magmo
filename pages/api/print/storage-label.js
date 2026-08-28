import storageUnitContract from "../../../lib/inventory/storageUnitContract.cjs";
import { requireFirebaseAuth } from "../../../utils/apiAuth";

const { buildStorageUnitLabelPayload } = storageUnitContract;

const DEFAULT_PUBLIC_BASE =
  process.env.NGROK_BASE_URL ||
  "https://unobtruded-unquibbling-kandice.ngrok-free.dev";
const PRINT_LABEL_PROXY_URL =
  process.env.PRINT_LABEL_PROXY_URL ||
  `${String(DEFAULT_PUBLIC_BASE).replace(/\/$/, "")}/print-label`;
const PRINT_LABEL_LOCAL_URL =
  process.env.PRINT_LABEL_LOCAL_URL || "http://127.0.0.1:5000/print-label";
const PRINT_TIMEOUT_MS = 20000;

function validateRequestBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Request body must be an object containing only unitId." };
  }

  const keys = Object.keys(body);
  if (keys.length !== 1 || keys[0] !== "unitId") {
    return { error: "Request body may contain only unitId." };
  }

  try {
    return { payload: buildStorageUnitLabelPayload(body.unitId) };
  } catch (error) {
    return {
      error:
        error?.message ||
        "unitId must be a positive bin or pallet ID such as B47 or P65.",
      code: error?.code || "invalid_storage_unit_id",
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  await requireFirebaseAuth(req, res);
  if (res.writableEnded) return;

  const validation = validateRequestBody(req.body);
  if (!validation.payload) {
    return res.status(400).json({
      ok: false,
      code: validation.code || "invalid_request",
      error: validation.error,
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PRINT_TIMEOUT_MS);

  try {
    const candidates = Array.from(
      new Set([PRINT_LABEL_PROXY_URL, PRINT_LABEL_LOCAL_URL].filter(Boolean))
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
          body: JSON.stringify(validation.payload),
          signal: controller.signal,
        });
        attempts.push({ url: targetUrl, status: attempt.status });
        if (attempt.status === 404) continue;
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
          ? "Storage label template was not found on configured upstreams"
          : "Storage label upstream request failed on all configured upstreams",
        attempts,
      });
    }

    const raw = await upstream.text();
    let upstreamPayload = null;
    try {
      upstreamPayload = raw ? JSON.parse(raw) : null;
    } catch {
      upstreamPayload = { raw };
    }

    const responsePayload = {
      ok: upstream.ok,
      status: upstream.status,
      ...(upstreamPayload && typeof upstreamPayload === "object"
        ? upstreamPayload
        : { data: upstreamPayload }),
      attempts,
    };
    if (!upstream.ok && !responsePayload.error) {
      responsePayload.error = `Storage label upstream returned ${upstream.status}`;
    }

    return res.status(upstream.status).json(responsePayload);
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    return res.status(isAbort ? 504 : 502).json({
      ok: false,
      error: isAbort
        ? "Storage label upstream timeout"
        : "Storage label upstream request failed",
      details: String(error?.message || error),
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
