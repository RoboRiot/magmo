import {
  createOpsSystemNote,
  listOpsSystemNotes,
} from "../../../lib/ops/systemNotes";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  getRoleFromClaims,
  isAdminEmail,
  isAdminRole,
} from "../../../utils/authAccess";

async function requireOpsAdmin(req, res) {
  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return null;
  if (!user?.uid) {
    res.status(401).json({ error: "Authentication required." });
    return null;
  }
  const role = getRoleFromClaims(user);
  if (!isAdminRole(role) && !isAdminEmail(user.email)) {
    res.status(403).json({ error: "Client system notes are available to Admin users only." });
    return null;
  }
  return { ...user, role };
}
export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  try {
    const user = await requireOpsAdmin(req, res);
    if (!user || res.headersSent) return;
    if (req.method === "GET") {
      const result = await listOpsSystemNotes({
        clientId: req.query?.clientId,
        machineId: req.query?.machineId,
      });
      return res.status(200).json({ ok: true, ...result });
    }
    const note = await createOpsSystemNote({
      workOrderId: req.body?.workOrderId,
      text: req.body?.text,
      scopeType: req.body?.scopeType,
      clientId: req.body?.clientId,
      machineId: req.body?.machineId,
      createdBy: user.email || user.uid || "Magmo admin",
      source: "magmo",
    });
    return res.status(201).json({ ok: true, note });
  } catch (error) {
    const message = String(error?.message || "The system note could not be saved.");
    const userError = /select|write|link|does not|belong|associated|valid/i.test(message);
    return res.status(userError ? 400 : 500).json({
      error: userError ? message : "The client system notes could not be loaded.",
    });
  }
}
