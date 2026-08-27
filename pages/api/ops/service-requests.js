import {
  acceptServiceRequest,
  archiveServiceRequest,
  checkGeneratedServiceRequestDuplicate,
  confirmServiceRequestClient,
  createGeneratedServiceRequest,
  denyServiceRequest,
  getServiceRequestDetail,
  listServiceRequests,
  reviewServiceRequestClientMatch,
  setServiceRequestOverseerApproval,
  suggestServiceRequestClientMatch,
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

function verifiedViewer(user) {
  const email = String(user?.email || "").trim().toLowerCase();
  const fallbackName = email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return {
    id: String(user?.uid || "").trim(),
    email,
    name: String(
      user?.magmoName ||
        user?.name ||
        user?.displayName ||
        fallbackName ||
        "Magmo admin"
    )
      .trim()
      .slice(0, 180),
    canApproveOverseer: true,
  };
}

export default async function handler(req, res) {
  if (!["GET", "POST", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST, PATCH");
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
      const requestedView = String(req.query.view || "").trim().toLowerCase();
      const includeCatalog = String(req.query.includeCatalog || "") === "1";
      const result = await listServiceRequests({
        view: ["requests", "accepted", "archived"].includes(requestedView)
          ? requestedView
          : String(req.query.archived || "") === "1"
          ? "archived"
          : "requests",
        since: String(req.query.since || ""),
        includeCatalog,
      });
      res.setHeader("Cache-Control", "private, no-store");
      return res.status(200).json({
        ok: true,
        ...result,
        viewer: verifiedViewer(user),
      });
    }

    if (req.method === "POST") {
      const request = await createGeneratedServiceRequest({
        requestId: req.body?.requestId,
        clientId: req.body?.clientId,
        machineId: req.body?.machineId,
        trailerId: req.body?.trailerId,
        assignmentMode: req.body?.assignmentMode,
        assigneeIds: req.body?.assigneeIds,
        remoteAssigneeIds: req.body?.remoteAssigneeIds,
        dispatchAssigneeIds: req.body?.dispatchAssigneeIds,
        oversightManagerIds: req.body?.oversightManagerIds,
        urgency: req.body?.urgency,
        issueTitle: req.body?.issueTitle,
        description: req.body?.description,
        files: req.body?.files,
        createdBy: changedBy,
      });
      return res.status(201).json({ ok: true, request });
    }

    const action = String(req.body?.action || "").trim();
    if (action === "check_duplicate") {
      const result = await checkGeneratedServiceRequestDuplicate({
        clientId: req.body?.clientId,
        machineId: req.body?.machineId,
        issueTitle: req.body?.issueTitle,
        excludeRequestId: req.body?.excludeRequestId,
      });
      return res.status(200).json({ ok: true, ...result });
    }
    const requestId = String(req.body?.requestId || "").trim();
    if (!requestId) {
      return res.status(400).json({ error: "A service request ID is required." });
    }
    if (action === "confirm_client") {
      const result = await confirmServiceRequestClient({
        requestId,
        clientId: req.body?.clientId,
        machineId: req.body?.machineId,
        changedBy,
      });
      return res.status(200).json({ ok: true, ...result });
    }
    if (action === "suggest_client") {
      const result = await suggestServiceRequestClientMatch({
        requestId,
        changedBy,
        force: Boolean(req.body?.force),
      });
      return res.status(200).json({ ok: true, ...result });
    }
    if (action === "review_client_suggestion") {
      const result = await reviewServiceRequestClientMatch({
        requestId,
        decision: req.body?.decision,
        suggestedClientId: req.body?.suggestedClientId,
        selectedClientId: req.body?.selectedClientId,
        reason: req.body?.reason,
        changedBy,
      });
      return res.status(200).json({ ok: true, ...result });
    }
    if (["approve_overseer", "set_overseer_approval"].includes(action)) {
      if (typeof req.body?.approved !== "boolean") {
        return res.status(400).json({
          error: "Choose whether to add or remove your overseer approval.",
        });
      }
      const request = await setServiceRequestOverseerApproval({
        requestId,
        approved: req.body.approved,
        approver: {
          approverId: user.uid,
          email: user.email,
          name: user.magmoName || user.name || user.displayName,
        },
      });
      return res.status(200).json({ ok: true, request });
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
        assignmentMode: req.body?.assignmentMode,
        remoteAssigneeIds: req.body?.remoteAssigneeIds,
        dispatchAssigneeIds: req.body?.dispatchAssigneeIds,
        oversightManagerIds: req.body?.oversightManagerIds,
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
      /select|choose|confirm|suggestion|explain|incorrect|does not exist|cannot be|already being|already created|already been added|valid client|valid machine|attachment|issue title|description|required|approv/i;
    return res.status(userErrorPattern.test(error?.message || "") ? 400 : 500).json({
      error: error?.message || "The service request could not be updated.",
    });
  }
}
