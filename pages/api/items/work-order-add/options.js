import { adminDb } from "../../../../context/FirebaseAdmin";
import {
  MAX_WORK_ORDER_ADD_SEARCH_RESULTS,
  listWorkOrderAddOptions,
} from "../../../../lib/inventory/workOrderAddOptions";
import {
  requireStorageScanUser,
  setStorageScanResponseHeaders,
} from "../../../../lib/inventory/storageUnitScanApi";

function cleanQuery(value) {
  return String(value == null ? "" : value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

function resultLimit(value, hasQuery) {
  if (value === undefined || value === null || value === "") {
    return hasQuery ? 12 : 50;
  }
  if (!/^\d+$/.test(String(value))) return 0;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return 0;
  return hasQuery
    ? Math.min(MAX_WORK_ORDER_ADD_SEARCH_RESULTS, parsed)
    : Math.min(MAX_WORK_ORDER_ADD_SEARCH_RESULTS, parsed);
}

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      ok: false,
      code: "method_not_allowed",
      error: "Method not allowed.",
    });
  }

  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.headersSent || res.writableEnded) return;
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      code: "work_order_options_unavailable",
      error: "Work-order choices are temporarily unavailable.",
    });
  }

  const query = cleanQuery(req.query?.q);
  const limit = resultLimit(req.query?.limit, Boolean(query));
  if (!limit) {
    return res.status(400).json({
      ok: false,
      code: "invalid_limit",
      error: "limit must be a positive whole number.",
    });
  }

  try {
    const result = await listWorkOrderAddOptions({
      db: adminDb,
      query,
      resultLimit: limit,
    });
    return res.status(200).json({
      ok: true,
      query,
      ...result,
      workOrders: result.options,
    });
  } catch (error) {
    console.error("[WorkOrderAdd][options]", {
      code: String(error?.code || "internal_error").slice(0, 80),
      message: String(error?.message || "Unknown error").slice(0, 300),
    });
    return res.status(500).json({
      ok: false,
      code: "work_order_options_failed",
      error: "Work-order choices could not be loaded.",
    });
  }
}

export { cleanQuery, resultLimit };
