import crypto from "crypto";
import { inferWorkOrderAssignment } from "../../../lib/ai/inferWorkOrderAssignment";
import { ingestCreatedWorkOrder } from "../../../lib/ops/ingestCreatedWorkOrder";
import { getRelevantOpsCompanyMemory } from "../../../lib/ops/companyMemory";
import {
  completeOpsWorkOrder,
  getOpsCommandContext,
  markOpsMessageAnalysisFailed,
  recordOpsMessage,
  resetOpsAssignmentAnalysis,
  saveOpsCommandReport,
  saveOpsAssignmentAnalysis,
  serviceCompleteOpsWorkOrder,
} from "../../../lib/ops/workOrders";

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function authorizeIngest(req, res) {
  const expected = String(
    process.env.OPS_INGEST_SECRET || process.env.CRON_SECRET || ""
  ).trim();
  if (!expected) {
    res.status(503).json({ error: "Ops ingest is not configured." });
    return false;
  }
  const supplied = String(req.headers["x-ops-ingest-secret"] || "").trim();
  if (!supplied || !safeEqual(supplied, expected)) {
    res.status(401).json({ error: "Invalid Ops ingest credential." });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!authorizeIngest(req, res)) return;

  const eventType = String(req.body?.eventType || "").trim();
  const workOrderId = String(req.body?.workOrderId || "").trim();
  try {
    if (eventType === "work_order.created") {
      const { workOrder, priorityAnalyzed } = await ingestCreatedWorkOrder(
        req.body
      );
      return res.status(200).json({ ok: true, workOrder, priorityAnalyzed });
    }

    if (eventType === "work_order.completed") {
      const reportResult = req.body?.report
        ? await saveOpsCommandReport({
            workOrderId,
            commandTs: req.body?.commandTs,
            reportType: "final",
            report: req.body.report,
            sourceMessageCount: req.body?.sourceMessageCount,
            completedBy: req.body?.completedBy,
          })
        : {};
      const cleanup = await completeOpsWorkOrder(
        workOrderId,
        req.body?.completedBy || "Slack !done"
      );
      return res.status(200).json({
        ok: true,
        completed: true,
        ...reportResult,
        ...cleanup,
      });
    }

    if (eventType === "work_order.service_complete") {
      const reportResult = req.body?.report
        ? await saveOpsCommandReport({
            workOrderId,
            commandTs: req.body?.commandTs,
            reportType: "service_complete",
            report: req.body.report,
            sourceMessageCount: req.body?.sourceMessageCount,
            completedBy: req.body?.completedBy,
          })
        : {};
      const workOrder = await serviceCompleteOpsWorkOrder(
        workOrderId,
        req.body?.completedBy || "Slack !complete"
      );
      return res.status(200).json({
        ok: true,
        serviceComplete: true,
        workOrder,
        ...reportResult,
      });
    }

    if (eventType === "work_order.parts") {
      const reportResult = await saveOpsCommandReport({
        workOrderId,
        commandTs: req.body?.commandTs,
        reportType: "parts",
        report: req.body?.report,
        sourceMessageCount: req.body?.sourceMessageCount,
        completedBy: req.body?.completedBy,
      });
      return res.status(200).json({ ok: true, ...reportResult });
    }

    if (eventType === "work_order.command_context") {
      const context = await getOpsCommandContext(workOrderId);
      return res.status(200).json({ ok: true, context });
    }

    if (eventType === "work_order.reprocess_assignments") {
      const reset = await resetOpsAssignmentAnalysis(workOrderId);
      return res.status(200).json({ ok: true, reset: true, ...reset });
    }

    if (eventType === "message.created") {
      const recorded = await recordOpsMessage(req.body);
      if (!recorded.accepted || !recorded.needsAnalysis) {
        return res.status(200).json({
          ok: true,
          accepted: recorded.accepted,
          analyzed: false,
          reason: recorded.reason || "no_assignment_or_priority_signal",
        });
      }

      try {
        const companyMemory = await getRelevantOpsCompanyMemory(
          recorded.workOrder,
          recorded.message
        );
        const analysis = await inferWorkOrderAssignment({
          workOrder: recorded.workOrder,
          message: recorded.message,
          companyMemory,
        });
        const saved = await saveOpsAssignmentAnalysis({
          workOrderId,
          messageId: recorded.message.id,
          ...analysis,
          triggerMessage: recorded.message.text,
          triggerSender: recorded.message.sender?.name,
          triggerSlackTs: recorded.message.slackTs,
        });
        return res.status(200).json({
          ok: true,
          accepted: true,
          analyzed: true,
          changed: saved.changed,
          priorityChanged: saved.priorityChanged,
          remoteChanged: saved.remoteChanged,
          remoteWorkActive: saved.remoteWorkActive,
          priorityTier: analysis.priorityTier,
          assignees: analysis.assignees,
          reason: analysis.reason,
          priorityReason: analysis.priorityReason,
        });
      } catch (error) {
        await markOpsMessageAnalysisFailed(
          workOrderId,
          recorded.message.id,
          error
        ).catch(() => {});
        throw error;
      }
    }

    return res.status(400).json({ error: "Unsupported Ops event type." });
  } catch (error) {
    console.error("[Ops][ingest]", {
      eventType,
      workOrderId,
      name: error?.name,
      message: error?.message,
    });
    return res.status(500).json({
      error: "The Ops event could not be processed.",
      retryable: true,
    });
  }
}
