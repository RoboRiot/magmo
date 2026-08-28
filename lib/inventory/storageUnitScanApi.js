import { requireFirebaseAuth } from "../../utils/apiAuth";
import {
  USER_ROLES,
  getEffectiveRole,
  isAllowedEmailDomain,
} from "../../utils/authAccess";

export async function requireStorageScanUser(req, res) {
  const authUser = await requireFirebaseAuth(req, res);
  if (res.headersSent || res.writableEnded) return null;
  if (!authUser?.uid) {
    res.status(401).json({
      ok: false,
      code: "auth_required",
      error: "Authentication is required.",
    });
    return null;
  }
  if (
    authUser.email_verified !== true ||
    authUser.magmoAccessRevoked === true ||
    !isAllowedEmailDomain(authUser.email) ||
    getEffectiveRole(authUser.email, authUser) === USER_ROLES.VIEWER
  ) {
    res.status(403).json({
      ok: false,
      code: "internal_access_required",
      error: "A verified AIS account is required for warehouse scanning.",
    });
    return null;
  }
  return authUser;
}

export function setStorageScanResponseHeaders(res) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
}

export function sendStorageScanError(res, error, context = "request") {
  const statusCode = Number(error?.statusCode);
  const status =
    Number.isInteger(statusCode) && statusCode >= 400 && statusCode < 600
      ? statusCode
      : 500;
  if (status >= 500) {
    console.error(`[StorageScan][${context}]`, {
      code: String(error?.code || "internal_error").slice(0, 80),
      message: String(error?.message || "Unknown error").slice(0, 300),
    });
  }
  return res.status(status).json({
    ok: false,
    code: error?.code || "internal_error",
    error:
      status >= 500
        ? "The warehouse scanner request could not be completed."
        : error?.message || "The warehouse scanner request was rejected.",
  });
}

export function hasOnlyBodyKeys(body, allowedKeys) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const allowed = new Set(allowedKeys);
  return Object.keys(body).every((key) => allowed.has(key));
}
