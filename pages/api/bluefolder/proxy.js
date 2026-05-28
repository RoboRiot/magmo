import {
  addServiceItemToBlueFolder,
  blueFolderDebugSummary,
  envValue,
  getBlueFolderWorkOrderStatus,
  hasBlueFolderToken,
  normalizeWorkOrder,
} from "../../../utils/bluefolderApi";

const DEFAULT_PUBLIC_BASE =
  process.env.NGROK_BASE_URL ||
  "https://unobtruded-unquibbling-kandice.ngrok-free.dev";
const BLUEFOLDER_PROXY_URL =
  process.env.BLUEFOLDER_PROXY_URL ||
  `${String(DEFAULT_PUBLIC_BASE).replace(/\/$/, "")}/bluefolder`;
const BLUEFOLDER_LOCAL_URL =
  process.env.BLUEFOLDER_LOCAL_URL || "http://127.0.0.1:5000/bluefolder";

function isStatusCheckRequired() {
  return envValue(process.env.BLUEFOLDER_STATUS_CHECK_REQUIRED).toLowerCase() !==
    "false";
}

function buildStatusUrl(targetUrl) {
  try {
    const url = new URL(targetUrl);
    const path = url.pathname.replace(/\/$/, "");
    url.pathname = path.endsWith("/bluefolder")
      ? `${path}/status`
      : `${path}/bluefolder/status`;
    return url.toString();
  } catch {
    return "";
  }
}

async function getWorkOrderStatusFromConfiguredProxy(workOrder, candidates, signal) {
  const attempts = [];
  for (const targetUrl of candidates) {
    const statusUrl = buildStatusUrl(targetUrl);
    if (!statusUrl) continue;

    const headers = { "Content-Type": "application/json" };
    if (/ngrok/i.test(statusUrl)) {
      headers["ngrok-skip-browser-warning"] = "true";
    }

    try {
      const response = await fetch(statusUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          workOrder,
          serviceRequestId: workOrder,
        }),
        signal,
      });
      attempts.push({ url: statusUrl, status: response.status });
      if (response.status === 404) continue;

      const raw = await response.text();
      let payload = null;
      try {
        payload = raw ? JSON.parse(raw) : {};
      } catch {
        payload = { raw };
      }

      if (!response.ok || payload?.ok === false) {
        return {
          ok: false,
          configured: true,
          reason: payload?.error || `status_proxy_http_${response.status}`,
          attempts,
          payload,
        };
      }

      const status =
        payload?.status ||
        payload?.workOrderStatus ||
        payload?.serviceRequest?.status ||
        "";
      const dateTimeClosed =
        payload?.dateTimeClosed ||
        payload?.closedAt ||
        payload?.serviceRequest?.dateTimeClosed ||
        "";
      return {
        ok: true,
        configured: true,
        source: "configured_status_proxy",
        status,
        dateTimeClosed,
        closed:
          payload?.closed === true ||
          payload?.isClosed === true ||
          String(status || "").trim().toLowerCase() === "closed" ||
          String(dateTimeClosed || "").trim() !== "",
        attempts,
      };
    } catch (error) {
      attempts.push({
        url: statusUrl,
        error: String(error?.message || error),
      });
    }
  }

  return {
    ok: false,
    configured: attempts.length > 0,
    skipped: true,
    reason: "status_proxy_unavailable",
    attempts,
  };
}

async function ensureWorkOrderIsOpen(workOrder, candidates, signal) {
  const normalizedWorkOrder = normalizeWorkOrder(workOrder);
  if (!normalizedWorkOrder) {
    return { ok: true, skipped: true, reason: "missing_work_order" };
  }

  const direct = await getBlueFolderWorkOrderStatus(normalizedWorkOrder, signal);
  if (direct.ok) return direct;

  const proxy = await getWorkOrderStatusFromConfiguredProxy(
    normalizedWorkOrder,
    candidates,
    signal
  );
  if (proxy.ok) return proxy;

  const allowUnverified =
    envValue(process.env.BLUEFOLDER_ALLOW_UNVERIFIED_STATUS).toLowerCase() ===
      "true" && !isStatusCheckRequired();
  if (allowUnverified) {
    return {
      ok: true,
      skipped: true,
      warning:
        "BlueFolder status check was not verified. Configure BLUEFOLDER_API_TOKEN to block closed work orders reliably.",
      reason: "status_check_unverified_allowed",
      direct: blueFolderDebugSummary(direct),
      proxy,
    };
  }

  return {
    ok: false,
    reason: "status_check_unavailable",
    direct: blueFolderDebugSummary(direct),
    proxy,
  };
}

async function forwardToLegacyProxy(requestBody, candidates, signal) {
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
        body: JSON.stringify(requestBody),
        signal,
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
    return {
      status: all404 ? 404 : 502,
      payload: {
        ok: false,
        error: all404
          ? "BlueFolder endpoint not found on configured upstreams"
          : "BlueFolder upstream request failed on all configured upstreams",
        attempts,
      },
    };
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
    source: "legacy_bluefolder_proxy",
  };
  if (!upstream.ok && !responsePayload.error) {
    responsePayload.error = `BlueFolder upstream returned ${upstream.status}`;
  }

  return {
    status: upstream.status,
    payload: responsePayload,
  };
}

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
    const requestBody = {
      ...(req.body || {}),
      taxable: false,
      taxableDefault: false,
      tax: false,
    };
    requestBody.workOrder = normalizeWorkOrder(
      requestBody.workOrder || requestBody.serviceRequestId
    );
    requestBody.serviceRequestId = requestBody.workOrder;

    const candidates = Array.from(
      new Set([BLUEFOLDER_LOCAL_URL, BLUEFOLDER_PROXY_URL].filter(Boolean))
    );
    const statusCheck = await ensureWorkOrderIsOpen(
      requestBody.workOrder,
      candidates,
      controller.signal
    );

    if (statusCheck.ok && statusCheck.closed) {
      return res.status(409).json({
        ok: false,
        error: `Work order ${requestBody.workOrder} is closed.`,
        code: "work_order_closed",
        workOrder: requestBody.workOrder,
        bluefolderStatus: statusCheck.status || "Closed",
        dateTimeClosed: statusCheck.dateTimeClosed || "",
        debug: { statusCheck: blueFolderDebugSummary(statusCheck) || statusCheck },
      });
    }

    if (!statusCheck.ok) {
      return res.status(503).json({
        ok: false,
        error:
          "Could not verify the BlueFolder work order status, so the item was not sent.",
        code: "bluefolder_status_check_unavailable",
        workOrder: requestBody.workOrder,
        details: statusCheck.reason,
        debug: { statusCheck },
      });
    }

    if (hasBlueFolderToken()) {
      const addResult = await addServiceItemToBlueFolder(
        requestBody,
        controller.signal
      );
      const status = addResult.ok ? 200 : 502;
      return res.status(status).json({
        ...addResult,
        source: "next_bluefolder_api",
        bluefolderStatusCheck: blueFolderDebugSummary(statusCheck) || statusCheck,
      });
    }

    const legacy = await forwardToLegacyProxy(
      requestBody,
      candidates,
      controller.signal
    );
    return res.status(legacy.status).json({
      ...legacy.payload,
      bluefolderStatusCheck: statusCheck,
      warning:
        "Using legacy BlueFolder proxy because BLUEFOLDER_API_TOKEN is not configured in this Next app.",
    });
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    return res.status(isAbort ? 504 : 502).json({
      ok: false,
      error: isAbort
        ? "BlueFolder request timeout"
        : "BlueFolder request failed",
      details: String(error?.message || error),
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
