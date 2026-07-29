import {
  acceptServiceRequest,
  archiveServiceRequest,
  confirmServiceRequestClient,
  denyServiceRequest,
  getServiceRequestDetail,
  listServiceRequests,
} from "../../../lib/ops/serviceRequests";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  getRoleFromClaims,
  isAdminEmail,
  USER_ROLES,
} from "../../../utils/authAccess";

async function requireOpsAdmin(req, res) {
  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return null;
  if (!user?.uid) {
    res.status(401).json({ error: "Authentication required." });
    return null;
  }
  const role = getRoleFromClaims(user);
  if (role !== USER_ROLES.ADMIN && !isAdminEmail(user.email)) {
    res.status(403).json({ error: "Ops is available to Admin users only." });
    return null;
  }
  return { ...user, role };
}

export default async function handler(req, res) {
  if (!["GET", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", "GET, PATCH");
    return res.status(405).json({ error: "Method not allowed." });
  }
  try {
    const user = await requireOpsAdmin(req, res);
    if (!user || res.headersSent) return;
    const changedBy = user.email || user.uid || "Magmo admin";

    if (req.method === "GET") {
      if (req.query.id) {
        const request = await getServiceRequestDetail(req.query.id);
        return res.status(200).json({ ok: true, request });
      }
      const result = await listServiceRequests({
        archived: String(req.query.archived || "") === "1",
      });
      return res.status(200).json({ ok: true, ...result });
    }

    const action = String(req.body?.action || "").trim();
    const requestId = String(req.body?.requestId || "").trim();
    if (!requestId) {
      return res.status(400).json({ error: "A service request ID is required." });
    }
    if (action === "confirm_client") {
      const client = await confirmServiceRequestClient({
        requestId,
        clientId: req.body?.clientId,
        changedBy,
      });
      return res.status(200).json({ ok: true, client });
    }
    if (action === "archive") {
      const result = await archiveServiceRequest({ requestId, changedBy });
      return res.status(200).json({ ok: true, ...result });
    }
    if (action === "deny") {
      const result = await denyServiceRequest({ requestId, changedBy });
      return res.status(200).json({ ok: true, ...result });
    }
    if (action === "accept") {
      const request = await acceptServiceRequest({
        requestId,
        clientId: req.body?.clientId,
        assigneeIds: req.body?.assigneeIds,
        acceptedBy: changedBy,
      });
      return res.status(200).json({ ok: true, request });
    }
    return res.status(400).json({ error: "Unsupported service request action." });
  } catch (error) {
    console.error("[Ops][service-requests]", {
      method: req.method,
      message: error?.message,
    });
    const userErrorPattern =
      /select|confirm|does not exist|cannot be|already being|already created|valid client/i;
    return res.status(userErrorPattern.test(error?.message || "") ? 400 : 500).json({
      error: error?.message || "The service request could not be updated.",
    });
  }
}
