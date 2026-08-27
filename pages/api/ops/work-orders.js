import { adminDb } from "../../../context/FirebaseAdmin";
import { generateOpsCommandReport } from "../../../lib/ai/generateOpsCommandReport";
import { generateOpsUpdate } from "../../../lib/ai/generateOpsUpdate";
import { inferWorkOrderAssignment } from "../../../lib/ai/inferWorkOrderAssignment";
import {
  getRelevantOpsCompanyMemory,
  saveOpsCompanyLessons,
} from "../../../lib/ops/companyMemory";
import {
  closeOpsWorkOrder,
  completeOpsWorkOrder,
  deleteOpsWorkOrder,
  getOpsUpdateContext,
  listOpsAssigneeOptions,
  listOpsConnectionOptions,
  listOpsWorkOrders,
  moveOpsWorkOrderStage,
  recordOpsMessage,
  recoverOpsWorkOrderRecord,
  reviewOpsWorkflowDecision,
  reopenOpsWorkOrder,
  reorderOpsWorkOrders,
  saveOpsAssignmentAnalysis,
  saveOpsCommandReport,
  saveOpsWorkOrderUpdate,
  serviceCompleteOpsWorkOrder,
  submitOpsCategoryFeedback,
  updateOpsAssignees,
  updateOpsConnections,
  updateOpsInventoryMovement,
  updateOpsPeople,
} from "../../../lib/ops/workOrders";
import { SlackClient } from "../../../lib/slack/client";
import {
  findOpsSlackWorkOrderThread,
  getOpsSlackCoordinates,
  mergeOpsSlackMessages,
  readOpsSlackThread,
} from "../../../lib/slack/readOpsThread";
const {
  initialRecoveryStage,
  recoveryCandidates,
  recoveryTranscript,
  rootDispatchAssignees,
  slackTsToIso,
} = require("../../../lib/ops/recoveryState.cjs");
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  getRoleFromClaims,
  isAdminEmail,
  isAdminRole,
  isMasterAdminEmail,
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
  if (!isAdminRole(role) && !isAdminEmail(user.email)) {
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

  if (!messages.length && context.allMessages?.length && !context.previousUpdate) {
    messages = context.allMessages;
    sourceMessageCount = context.allMessages.length;
    throughSlackTs = context.allMessages[context.allMessages.length - 1].slackTs;
  }

  if (!messages.length && !finalSummary) {
    try {
      const recovered = await readOpsSlackThread(context.workOrder);
      const previousSlackTs = Number(context.previousUpdate?.throughSlackTs || 0);
      messages = previousSlackTs
        ? recovered.messages.filter(
            (message) => Number(message.slackTs || 0) > previousSlackTs
          )
        : recovered.messages;
      sourceMessageCount = recovered.sourceMessageCount;
      throughSlackTs = recovered.throughSlackTs;
      recoveredFromSlack = true;
    } catch (error) {
      if (!context.previousUpdate) throw error;
    }
  }

  if (!messages.length && context.previousUpdate && !finalSummary) {
    return {
      ...context,
      messages: [],
      noMaterialChange: true,
      recoveredFromSlack,
      replaceLegacyHistory,
    };
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
      finalSummary || context.previousUpdate?.legacyFormat
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
  const {
    usage,
    companyLessons = [],
    hasMaterialUpdate = true,
    ...update
  } = generated;
  if (!hasMaterialUpdate && context.previousUpdate && !options.finalSummary) {
    return { ...context.previousUpdate, noMaterialChange: true };
  }
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

async function prepareCommandContext(workOrderId) {
  let context = await getOpsUpdateContext(workOrderId, {
    fullConversation: true,
  });
  try {
    const recovered = await readOpsSlackThread(context.workOrder);
    const mergedMessages = mergeOpsSlackMessages(
      context.messages,
      recovered.messages
    );
    const reportEventTypes = new Set([
      "magmo_ops_done_summary",
      "magmo_ops_service_complete_summary",
      "magmo_done_report",
      "magmo_service_complete_report",
      "magmo_parts_report",
      "magmo_daily_report",
    ]);
    const sourceMessages = mergedMessages.filter(
      (message) => !reportEventTypes.has(String(message?.metadata?.event_type || ""))
    );
    const existingReportEventTypes = mergedMessages
      .map((message) => String(message?.metadata?.event_type || ""))
      .filter((eventType) => reportEventTypes.has(eventType));
    context = {
      ...context,
      messages: sourceMessages,
      allMessages: sourceMessages,
      sourceMessageCount: sourceMessages.length,
      throughSlackTs: sourceMessages.length
        ? sourceMessages[sourceMessages.length - 1].slackTs
        : recovered.throughSlackTs,
      recoveredFromSlack:
        sourceMessages.length > context.messages.length ||
        !context.messages.length,
      existingReportEventTypes,
    };
  } catch (error) {
    if (!context.messages.length) throw error;
  }
  if (!context.messages.length) {
    throw new Error("No Slack conversation was available to summarize.");
  }
  return context;
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
      const includeConnections = String(req.query?.includeConnections || "") === "1";
      const [workOrders, connectionOptions] = await Promise.all([
        listOpsWorkOrders({ since: String(req.query?.since || "") }),
        includeConnections ? listOpsConnectionOptions() : Promise.resolve(null),
      ]);
      return res.status(200).json({
        ok: true,
        ...workOrders,
        ...(connectionOptions ? { connectionOptions } : {}),
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

    if (action === "update_connections") {
      const workOrder = await updateOpsConnections({
        workOrderId: req.body?.workOrderId,
        clientId: req.body?.clientId,
        machineId: req.body?.machineId,
        trailerId: req.body?.trailerId,
        changedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, workOrder });
    }

    if (["update_people", "participate", "oversight"].includes(action)) {
      const role =
        action === "participate"
          ? "participation"
          : action === "oversight"
            ? "oversight"
            : req.body?.role;
      const workOrder = await updateOpsPeople({
        workOrderId: req.body?.workOrderId,
        role,
        people: req.body?.people || [],
        changedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, workOrder });
    }

    if (action === "move_stage") {
      const workOrder = await moveOpsWorkOrderStage({
        workOrderId: req.body?.workOrderId,
        targetStage: req.body?.targetStage,
        scheduledFor: req.body?.scheduledFor,
        reason: req.body?.reason,
        changedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, workOrder });
    }

    if (action === "review_workflow_decision") {
      const workOrder = await reviewOpsWorkflowDecision({
        workOrderId: req.body?.workOrderId,
        correctedStage: req.body?.correctedStage,
        feedbackReason: req.body?.feedbackReason,
        reviewedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, workOrder });
    }

    if (action === "update_inventory_movement") {
      const workOrder = await updateOpsInventoryMovement({
        workOrderId: req.body?.workOrderId,
        movementId: req.body?.movementId,
        disposition: req.body?.disposition,
        swapMovementId: req.body?.swapMovementId,
        updateSwapLink: req.body?.updateSwapLink === true,
        changedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, workOrder });
    }

    if (action === "delete") {
      if (!isMasterAdminEmail(user.email)) {
        return res.status(403).json({
          error: "Only the Magmo owner can delete Ops work orders.",
        });
      }
      const result = await deleteOpsWorkOrder(
        req.body?.workOrderId,
        user.email || user.uid || "Magmo admin"
      );
      return res.status(200).json({ ok: true, ...result });
    }

    if (action === "recover") {
      if (!isMasterAdminEmail(user.email)) {
        return res.status(403).json({
          error: "Only the Magmo owner can recover Ops work orders.",
        });
      }
      const recoveredBy = user.email || user.uid || "Magmo owner";
      const found = await findOpsSlackWorkOrderThread(
        req.body?.workOrderNumber
      );
      const slack = await readOpsSlackThread(found);
      if (!slack.messages.length) {
        throw new Error("The Slack work-order thread was found but had no readable messages.");
      }
      const root = slack.messages[0];
      const bluefolderAssignees = rootDispatchAssignees(root);
      const recoveredState = initialRecoveryStage({
        messages: slack.messages,
        bluefolderAssignees,
      });
      const latestHumanMessage = [...slack.messages]
        .reverse()
        .find((message) => !message?.botMessage && message?.sender?.id);
      let workOrder = await recoverOpsWorkOrderRecord(
        {
          ...found,
          workOrderId: found.number,
          bluefolderAssignees,
          recoveredWorkflowStatus: recoveredState.workflowStatus,
          recoveryReason: recoveredState.reason,
          recoveryConfidence: recoveredState.confidence,
          recoveryCommand: recoveredState.command?.command || "",
          recoveryCommandTs: recoveredState.command?.slackTs || "",
          recoveryCommandSender: recoveredState.command?.sender || null,
          lastActivityAtIso: slackTsToIso(latestHumanMessage?.slackTs),
        },
        recoveredBy
      );

      for (const message of slack.messages) {
        await recordOpsMessage({
          workOrderId: found.number,
          slackTs: message.slackTs,
          senderId: message.sender?.id,
          senderName: message.sender?.name,
          candidates: message.candidates,
          text: message.text,
          recoveredSnapshot: true,
        });
      }

      const candidates = recoveryCandidates(slack.messages);
      const syntheticMessage = {
        id: `recovery-${Date.now()}`,
        slackTs: slack.throughSlackTs,
        sender: null,
        candidates,
        text: recoveryTranscript(slack.messages),
        recoveryMode: true,
      };
      const companyMemory = await getRelevantOpsCompanyMemory(
        workOrder,
        syntheticMessage
      );
      const analysis = await inferWorkOrderAssignment({
        workOrder,
        message: syntheticMessage,
        companyMemory,
      });
      await saveOpsAssignmentAnalysis({
        workOrderId: found.number,
        messageId: syntheticMessage.id,
        ...analysis,
        triggerMessage: "Full Slack thread recovery analysis.",
        triggerSender: "Magmo recovery",
        triggerSlackTs: slack.throughSlackTs,
      });

      const warnings = [];
      const summaryContext = await getOpsUpdateContext(found.number, {
        fullConversation: true,
      });
      try {
        const generated = await generateOpsUpdate({
          ...summaryContext,
          previousUpdate: null,
          messages: slack.messages,
          allMessages: slack.messages,
          sourceMessageCount: slack.sourceMessageCount,
          throughSlackTs: slack.throughSlackTs,
        });
        const { usage, companyLessons = [], ...update } = generated;
        await saveOpsWorkOrderUpdate({
          workOrderId: found.number,
          update,
          throughSlackTs: slack.throughSlackTs,
          sourceMessageCount: slack.sourceMessageCount,
          usage,
          recoveredFromSlack: true,
        });
        if (companyLessons.length) {
          await saveOpsCompanyLessons({
            workOrder: summaryContext.workOrder,
            lessons: companyLessons,
            source: "recovery",
            sourceId: `recovery-${found.number}`,
          }).catch(() => {});
        }
      } catch (summaryError) {
        warnings.push("The operations summary could not be regenerated.");
      }
      try {
        const partsReport = await generateOpsCommandReport({
          workOrder: summaryContext.workOrder,
          messages: slack.messages,
          reportType: "parts",
        });
        await saveOpsCommandReport({
          workOrderId: found.number,
          commandTs: `recovery-${Date.now()}`,
          reportType: "parts",
          report: partsReport,
          sourceMessageCount: slack.sourceMessageCount,
          completedBy: recoveredBy,
        });
      } catch (partsError) {
        warnings.push("The parts summary could not be regenerated.");
      }

      const refreshed = await getOpsUpdateContext(found.number, {
        fullConversation: true,
      });
      workOrder = refreshed.workOrder;
      return res.status(200).json({
        ok: true,
        recovered: true,
        workOrder,
        workflowStatus: workOrder.workflowStatus,
        workflowStageLabel: workOrder.workflowStageLabel,
        sourceMessageCount: slack.sourceMessageCount,
        warnings,
      });
    }

    if (action === "category_feedback") {
      const result = await submitOpsCategoryFeedback({
        workOrderId: req.body?.workOrderId,
        vote: req.body?.vote,
        reason: req.body?.reason,
        correctedTier: req.body?.correctedTier,
        changedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({ ok: true, ...result });
    }

    if (action === "generate_update") {
      let context = await getOpsUpdateContext(req.body?.workOrderId);
      const finalOnly = context.workOrder.status === "completed";
      if (
        finalOnly &&
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
      if (context.noMaterialChange && context.previousUpdate) {
        return res.status(200).json({
          ok: true,
          reused: true,
          noMaterialChange: true,
          recoveredFromSlack: Boolean(context.recoveredFromSlack),
          update: context.previousUpdate,
        });
      }
      const saved = await createAndSaveUpdate(context, {
        replaceHistory: Boolean(
          context.replaceLegacyHistory ||
            (context.recoveredFromSlack && finalOnly)
        ),
        finalSummary: finalOnly,
      });
      return res.status(200).json({
        ok: true,
        reused: Boolean(saved?.noMaterialChange),
        noMaterialChange: Boolean(saved?.noMaterialChange),
        recoveredFromSlack: context.recoveredFromSlack,
        update: saved,
      });
    }

    if (action === "generate_parts") {
      const context = await prepareCommandContext(req.body?.workOrderId);
      const report = await generateOpsCommandReport({
        workOrder: context.workOrder,
        messages: context.messages,
        reportType: "parts",
      });
      const saved = await saveOpsCommandReport({
        workOrderId: context.workOrder.id,
        commandTs: context.throughSlackTs || (Date.now() / 1000).toFixed(6),
        reportType: "parts",
        report,
        sourceMessageCount: context.sourceMessageCount,
        completedBy: user.email || user.uid || "Magmo admin",
      });
      return res.status(200).json({
        ok: true,
        postedToSlack: false,
        recoveredFromSlack: Boolean(context.recoveredFromSlack),
        ...saved,
      });
    }

    if (action === "complete") {
      const completedBy = user.email || user.uid || "Magmo user";
      const context = await prepareCommandContext(req.body?.workOrderId);
      const report = await generateOpsCommandReport({
        workOrder: {
          ...context.workOrder,
          status: "completed",
          workflowStatus: "done",
        },
        messages: context.messages,
        reportType: "final",
      });
      const summary = await saveOpsCommandReport({
        workOrderId: context.workOrder.id,
        commandTs: context.throughSlackTs || (Date.now() / 1000).toFixed(6),
        reportType: "final",
        report,
        sourceMessageCount: context.sourceMessageCount,
        completedBy,
      });
      const { channel, threadTs } = getOpsSlackCoordinates(context.workOrder);
      if (!channel || !threadTs) {
        throw new Error("This work order does not have a Slack thread for its final summary.");
      }
      const posted =
        summary.duplicate ||
        (context.existingReportEventTypes || []).some((eventType) =>
          ["magmo_ops_done_summary", "magmo_done_report"].includes(eventType)
        )
        ? null
        : await new SlackClient().postReport({
            channel,
            threadTs,
            text: report.slackReport,
            metadata: {
              event_type: "magmo_ops_done_summary",
              event_payload: {
                work_order_id: String(context.workOrder.id),
                source: "magmo_ops_admin",
                through_slack_ts: String(context.throughSlackTs || ""),
              },
            },
          });
      const cleanup = await completeOpsWorkOrder(
        req.body?.workOrderId,
        completedBy
      );
      return res.status(200).json({
        ok: true,
        completed: true,
        summary,
        slackSummaryTs: String(posted?.ts || ""),
        ...cleanup,
      });
    }

    if (action === "service_complete") {
      const completedBy = user.email || user.uid || "Magmo user";
      const context = await prepareCommandContext(req.body?.workOrderId);
      const report = await generateOpsCommandReport({
        workOrder: {
          ...context.workOrder,
          workflowStatus: "service_complete",
        },
        messages: context.messages,
        reportType: "service_complete",
      });
      const summary = await saveOpsCommandReport({
        workOrderId: context.workOrder.id,
        commandTs: context.throughSlackTs || (Date.now() / 1000).toFixed(6),
        reportType: "service_complete",
        report,
        sourceMessageCount: context.sourceMessageCount,
        completedBy,
      });
      const { channel, threadTs } = getOpsSlackCoordinates(context.workOrder);
      if (!channel || !threadTs) {
        throw new Error("This work order does not have a Slack thread for its service-complete summary.");
      }
      const posted =
        summary.duplicate ||
        (context.existingReportEventTypes || []).some((eventType) =>
          ["magmo_ops_service_complete_summary", "magmo_service_complete_report"].includes(eventType)
        )
        ? null
        : await new SlackClient().postReport({
            channel,
            threadTs,
            text: report.slackReport,
            metadata: {
              event_type: "magmo_ops_service_complete_summary",
              event_payload: {
                work_order_id: String(context.workOrder.id),
                source: "magmo_ops_admin",
                through_slack_ts: String(context.throughSlackTs || ""),
              },
            },
          });
      const workOrder = await serviceCompleteOpsWorkOrder(
        req.body?.workOrderId,
        completedBy
      );
      return res.status(200).json({
        ok: true,
        serviceComplete: true,
        summary,
        slackSummaryTs: String(posted?.ts || ""),
        workOrder,
      });
    }

    if (action === "close") {
      const workOrder = await closeOpsWorkOrder(
        req.body?.workOrderId,
        user.email || user.uid || "Magmo admin"
      );
      return res.status(200).json({ ok: true, closed: true, workOrder });
    }

    if (action === "reopen") {
      const result = await reopenOpsWorkOrder(
        req.body?.workOrderId,
        user.email || user.uid || "Magmo admin",
        req.body?.targetStage || "active",
        {
          scheduledFor: req.body?.scheduledFor || "",
          reason: req.body?.reason || "",
        }
      );
      const { channel, threadTs } = getOpsSlackCoordinates(result.workOrder);
      let slackNotificationTs = "";
      if (channel && threadTs) {
        const posted = await new SlackClient().postReport({
          channel,
          threadTs,
          text: `Work order has been moved from ${result.transition.from.replace(/_/g, " ")} back to ${result.transition.to.replace(/_/g, " ")}.`,
          metadata: {
            event_type: "magmo_ops_workflow_reopened",
            event_payload: {
              work_order_id: String(result.workOrder.id),
              from_stage: result.transition.from,
              to_stage: result.transition.to,
            },
          },
        });
        slackNotificationTs = String(posted?.ts || "");
      }
      return res.status(200).json({
        ok: true,
        reopened: true,
        ...result,
        slackNotificationTs,
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
      error: [
        "No Slack conversation was available to summarize.",
        "This work order does not have a Slack thread for its final summary.",
        "This work order does not have a Slack thread for its service-complete summary.",
        "Enter a valid numeric work order number.",
        "The Slack work-order thread was found but had no readable messages.",
      ].includes(error?.message)
        ? error.message
        : /Choose Unassigned|Choose the date|Scheduled work must|specific reason|Reopen this work order|Select a (?:valid )?(?:Client|machine|trailer)|not linked to that client|does not match the machine attached|Client DB record/i.test(
            String(error?.message || "")
          )
        ? error.message
        : /^Work order #\d+ was not found in the configured Slack dispatch history\.$/.test(
            String(error?.message || "")
          )
        ? error.message
        : String(error?.message || "").startsWith("Slack API ")
        ? "The Slack summary could not be posted. The work order was not moved to Done."
        : "The Ops board could not be updated.",
    });
  }
}
