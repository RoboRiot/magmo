import { adminDb } from "../../../context/FirebaseAdmin";
import { generateOpsUpdate } from "../../../lib/ai/generateOpsUpdate";
import { saveOpsCompanyLessons } from "../../../lib/ops/companyMemory";
import {
  completeOpsWorkOrder,
  deleteOpsWorkOrder,
  getOpsUpdateContext,
  listOpsAssigneeOptions,
  listOpsWorkOrders,
  reorderOpsWorkOrders,
  saveOpsWorkOrderUpdate,
  serviceCompleteOpsWorkOrder,
  submitOpsCategoryFeedback,
  updateOpsAssignees,
} from "../../../lib/ops/workOrders";
import { readOpsSlackThread } from "../../../lib/slack/readOpsThread";
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

function hasUsableUpdate(context, finalOnly = false) {
  const update = context.previousUpdate;
  return Boolean(
    update &&
      !update.legacyFormat &&
      Number(update.sourceMessageCount || 0) > 0 &&
      (!finalOnly || update.finalSummary)
  );
}

async function prepareSummaryContext(context, { finalSummary = false } = {}) {
  let messages = finalSummary ? context.allMessages || [] : context.messages || [];
  let sourceMessageCount = Number(context.sourceMessageCount || 0);
  let throughSlackTs = context.throughSlackTs;
  let recoveredFromSlack = false;
  const replaceLegacyHistory = Boolean(context.previousUpdate?.legacyFormat);

  if (!messages.length && context.allMessages?.length) {
    messages = context.allMessages;
    sourceMessageCount = context.allMessages.length;
    throughSlackTs = context.allMessages[context.allMessages.length - 1].slackTs;
  }

  if (!sourceMessageCount) {
    const recovered = await readOpsSlackThread(context.workOrder);
    messages = recovered.messages;
    sourceMessageCount = recovered.sourceMessageCount;
    throughSlackTs = recovered.throughSlackTs;
    recoveredFromSlack = true;
  }

  if (!sourceMessageCount || !messages.length) {
    throw new Error("No Slack conversation was available to summarize.");
  }

  return {
    ...context,
    workOrder: finalSummary
      ? {
          ...context.workOrder,
          status: "completed",
          workflowStatus: "done",
        }
      : context.workOrder,
    previousUpdate:
      finalSummary || recoveredFromSlack || context.previousUpdate?.legacyFormat
        ? null
        : context.previousUpdate,
    messages,
    sourceMessageCount,
    throughSlackTs,
    recoveredFromSlack,
    replaceLegacyHistory,
  };
}

async function createAndSaveUpdate(context, options = {}) {
  const generated = await generateOpsUpdate(context);
  const { usage, companyLessons = [], ...update } = generated;
  const saved = await saveOpsWorkOrderUpdate({
    workOrderId: context.workOrder.id,
    update,
    throughSlackTs: context.throughSlackTs,
    sourceMessageCount: context.sourceMessageCount,
    usage,
    replaceHistory: Boolean(options.replaceHistory),
    recoveredFromSlack: Boolean(context.recoveredFromSlack),
    finalSummary: Boolean(options.finalSummary),
  });
  if (options.finalSummary && companyLessons.length) {
    await saveOpsCompanyLessons({
      workOrder: context.workOrder,
      lessons: companyLessons,
      source: "completion",
      sourceId: `completion-${context.workOrder.id}`,
    }).catch((error) => {
      console.warn("[Ops][memory][completion]", error?.message);
    });
  }
  return saved;
}

export default async function handler(req, res) {
  if (!["GET", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", "GET, PATCH");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const user = await requireOpsAdmin(req, res);
    if (res.headersSent || !user) return;
    if (!adminDb) {
      return res.status(503).json({ error: "The Ops board is not available." });
    }

    if (req.method === "GET") {
      const workOrders = await listOpsWorkOrders();
      return res.status(200).json({
        ok: true,
        ...workOrders,
        assigneeOptions: listOpsAssigneeOptions(),
      });
    }

    const action = String(req.body?.action || "").trim();
    if (action === "reorder") {
      const orderedIds = await reorderOpsWorkOrders(
        req.body?.orderedIds || [],
        req.body?.tierById || {},
        user.email || user.uid || "Magmo admin"
      );
      return res.status(200).json({ ok: true, orderedIds });
    }

    if (action === "assign") {
      const changedBy = user.email || user.uid || "Magmo user";
      const workOrder = await updateOpsAssignees(
        req.body?.workOrderId,
        req.body?.assigneeIds || [],
        changedBy
      );
      return res.status(200).json({ ok: true, workOrder });
    }

    if (action === "delete") {
      const result = await deleteOpsWorkOrder(
        req.body?.workOrderId,
        user.email || user.uid || "Magmo admin"
      );
      return res.status(200).json({ ok: true, ...result });
    }

    if (action === "category_feedback") {
      const result = await submitOpsCategoryFeedback({
        workOrderId: req.body?.workOrderId,
        vote: req.body?.vote,
        changedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, ...result });
    }

    if (action === "generate_update") {
      let context = await getOpsUpdateContext(req.body?.workOrderId);
      const finalOnly = context.workOrder.status === "completed";
      if (
        hasUsableUpdate(context, finalOnly) &&
        !context.hasNewMessages &&
        !req.body?.force
      ) {
        return res.status(200).json({
          ok: true,
          reused: true,
          update: context.previousUpdate,
        });
      }
      context = await prepareSummaryContext(context, {
        finalSummary: finalOnly,
      });
      const saved = await createAndSaveUpdate(context, {
        replaceHistory: Boolean(
          context.replaceLegacyHistory ||
            (context.recoveredFromSlack && finalOnly)
        ),
        finalSummary: finalOnly,
      });
      return res.status(200).json({
        ok: true,
        reused: false,
        recoveredFromSlack: context.recoveredFromSlack,
        update: saved,
      });
    }

    if (action === "complete") {
      const completedBy = user.email || user.uid || "Magmo user";
      let context = await getOpsUpdateContext(req.body?.workOrderId);
      context = await prepareSummaryContext(context, { finalSummary: true });
      const summary = await createAndSaveUpdate(context, {
        replaceHistory: true,
        finalSummary: true,
      });
      const cleanup = await completeOpsWorkOrder(
        req.body?.workOrderId,
        completedBy
      );
      return res.status(200).json({
        ok: true,
        completed: true,
        summary,
        ...cleanup,
      });
    }

    if (action === "service_complete") {
      const completedBy = user.email || user.uid || "Magmo user";
      const workOrder = await serviceCompleteOpsWorkOrder(
        req.body?.workOrderId,
        completedBy
      );
      return res.status(200).json({
        ok: true,
        serviceComplete: true,
        workOrder,
      });
    }

    return res.status(400).json({ error: "Unsupported Ops action." });
  } catch (error) {
    console.error("[Ops][work-orders]", {
      method: req.method,
      name: error?.name,
      message: error?.message,
    });
    return res.status(500).json({
      error:
        error?.message === "No Slack conversation was available to summarize."
          ? error.message
          : "The Ops board could not be updated.",
    });
  }
}
