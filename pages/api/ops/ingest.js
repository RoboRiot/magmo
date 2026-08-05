import crypto from "crypto";
import { inferWorkOrderAssignment } from "../../../lib/ai/inferWorkOrderAssignment";
import { ingestCreatedWorkOrder } from "../../../lib/ops/ingestCreatedWorkOrder";
import { getRelevantOpsCompanyMemory } from "../../../lib/ops/companyMemory";
import { runIdempotentOpsCommand } from "../../../lib/ops/commandLedger";
import {
  applyTrailerMovementCommand,
  getTrailerCommandContext,
} from "../../../lib/ops/trailers";
import {
  completeOpsWorkOrder,
  getOpsCommandContext,
  getOpsWorkOrderById,
  markOpsMessageAnalysisFailed,
  recordOpsMessage,
  resetOpsAssignmentAnalysis,
  saveOpsCommandReport,
  saveOpsAssignmentAnalysis,
  serviceCompleteOpsWorkOrder,
} from "../../../lib/ops/workOrders";
const {
  WRITE_EVENT_TYPES,
  buildResourceChange,
  classifyOpsError,
  errorResponse,
  runtimeCapabilities,
  validateIngestRequest,
} = require("../../../lib/ops/ingestContract.cjs");

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function authorizeIngest(req, res, requestId) {
  const expected = String(
    process.env.OPS_INGEST_SECRET || process.env.CRON_SECRET || ""
  ).trim();
  if (!expected) {
    res.status(503).json({
      ok: false,
      code: "service_unavailable",
      error: "Ops ingest is not configured.",
      retryable: true,
      requestId,
    });
    return false;
  }
  const supplied = String(req.headers["x-ops-ingest-secret"] || "").trim();
  if (!supplied || !safeEqual(supplied, expected)) {
    res.status(401).json({
      ok: false,
      code: "unauthorized",
      error: "Invalid Ops ingest credential.",
      retryable: false,
      requestId,
    });
    return false;
  }
  return true;
}

function workOrderChange(workOrderId, before, after) {
  return buildResourceChange("work_order", workOrderId, before, after);
}

async function findWorkOrder(workOrderId) {
  try {
    return await getOpsWorkOrderById(workOrderId);
  } catch (error) {
    if (classifyOpsError(error).statusCode === 404) return null;
    throw error;
  }
}

function commandEvidence(body = {}, source = {}) {
  return String(
    body.report?.slackReport ||
      body.report?.opsSummary ||
      source.command ||
      "Slack command"
  ).slice(0, 2000);
}

async function runWorkOrderCommand({
  eventType,
  workOrderId,
  source,
  actor,
  body,
  operation,
}) {
  return runIdempotentOpsCommand({
    eventType,
    identity: source,
    actor,
    evidence: commandEvidence(body, source),
    operation: async () => {
      const before = await getOpsWorkOrderById(workOrderId);
      const details = await operation();
      const after = await getOpsWorkOrderById(workOrderId);
      return {
        ...details,
        changes: [workOrderChange(workOrderId, before, after)],
      };
    },
  });
}

export default async function handler(req, res) {
  const requestId = crypto.randomBytes(12).toString("hex");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      code: "method_not_allowed",
      error: "Method not allowed.",
      retryable: false,
      requestId,
    });
  }
  if (!authorizeIngest(req, res, requestId)) return;

  let eventType = "";
  let workOrderId = "";
  try {
    const validated = validateIngestRequest(req.body);
    ({ eventType, workOrderId = "" } = validated);
    const capabilities = runtimeCapabilities();
    if (WRITE_EVENT_TYPES.includes(eventType) && !capabilities.writeEnabled) {
      return res.status(403).json({
        ok: false,
        code: "writes_disabled",
        error: "Writes are disabled in this environment.",
        retryable: false,
        action: "Use staging for context and contract testing only.",
        requestId,
      });
    }

    if (eventType === "work_order.created") {
      const before = await findWorkOrder(workOrderId);
      const { workOrder, priorityAnalyzed } = await ingestCreatedWorkOrder(req.body);
      const after = await getOpsWorkOrderById(workOrderId);
      return res.status(200).json({
        ok: true,
        workOrder,
        priorityAnalyzed,
        changes: [workOrderChange(workOrderId, before, after)],
        requestId,
      });
    }

    if (eventType === "work_order.completed") {
      const result = await runWorkOrderCommand({
        eventType,
        workOrderId,
        source: validated.source,
        actor: validated.actor,
        body: req.body,
        operation: async () => {
          const reportResult = req.body?.report
            ? await saveOpsCommandReport({
                workOrderId,
                commandTs: validated.source.commandTs,
                reportType: "final",
                report: req.body.report,
                sourceMessageCount: req.body?.sourceMessageCount,
                completedBy: validated.actor.name,
              })
            : {};
          const cleanup = await completeOpsWorkOrder(
            workOrderId,
            validated.actor.name || "Slack !done"
          );
          return { completed: true, ...reportResult, ...cleanup };
        },
      });
      return res.status(200).json({ ok: true, ...result, requestId });
    }

    if (eventType === "work_order.service_complete") {
      const result = await runWorkOrderCommand({
        eventType,
        workOrderId,
        source: validated.source,
        actor: validated.actor,
        body: req.body,
        operation: async () => {
          const reportResult = req.body?.report
            ? await saveOpsCommandReport({
                workOrderId,
                commandTs: validated.source.commandTs,
                reportType: "service_complete",
                report: req.body.report,
                sourceMessageCount: req.body?.sourceMessageCount,
                completedBy: validated.actor.name,
              })
            : {};
          const workOrder = await serviceCompleteOpsWorkOrder(
            workOrderId,
            validated.actor.name || "Slack !complete"
          );
          return { serviceComplete: true, workOrder, ...reportResult };
        },
      });
      return res.status(200).json({ ok: true, ...result, requestId });
    }

    if (eventType === "work_order.parts") {
      const result = await runWorkOrderCommand({
        eventType,
        workOrderId,
        source: validated.source,
        actor: validated.actor,
        body: req.body,
        operation: () =>
          saveOpsCommandReport({
            workOrderId,
            commandTs: validated.source.commandTs,
            reportType: "parts",
            report: req.body?.report,
            sourceMessageCount: req.body?.sourceMessageCount,
            completedBy: validated.actor.name,
          }),
      });
      return res.status(200).json({ ok: true, ...result, requestId });
    }

    if (eventType === "work_order.command_context") {
      const context = await getOpsCommandContext(workOrderId);
      return res.status(200).json({ ok: true, context, requestId });
    }

    if (eventType === "trailer.command_context") {
      const context = await getTrailerCommandContext();
      return res.status(200).json({ ok: true, context, requestId });
    }

    if (eventType === "trailer.movement") {
      const result = await applyTrailerMovementCommand({
        commandTs: validated.source.commandTs,
        changedBy: validated.actor.name,
        actor: validated.actor,
        analysis: req.body?.analysis,
        sourceMessageCount: req.body?.sourceMessageCount,
        source: validated.source,
      });
      return res.status(200).json({ ok: true, ...result, requestId });
    }

    if (eventType === "work_order.reprocess_assignments") {
      const result = await runWorkOrderCommand({
        eventType,
        workOrderId,
        source: validated.source,
        actor: validated.actor,
        body: req.body,
        operation: async () => ({
          reset: true,
          ...(await resetOpsAssignmentAnalysis(workOrderId)),
        }),
      });
      return res.status(200).json({ ok: true, ...result, requestId });
    }

    if (eventType === "message.created") {
      const before = await getOpsWorkOrderById(workOrderId);
      const recorded = await recordOpsMessage(req.body);
      if (!recorded.accepted || !recorded.needsAnalysis) {
        const after = await getOpsWorkOrderById(workOrderId);
        return res.status(200).json({
          ok: true,
          accepted: recorded.accepted,
          analyzed: false,
          reason: recorded.reason || "no_assignment_or_priority_signal",
          changes: [workOrderChange(workOrderId, before, after)],
          requestId,
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
        const after = await getOpsWorkOrderById(workOrderId);
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
          changes: [workOrderChange(workOrderId, before, after)],
          requestId,
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

    throw new Error("Unsupported Ops event type.");
  } catch (error) {
    const response = errorResponse(error, requestId);
    console.error("[Ops][ingest]", {
      requestId,
      eventType,
      workOrderId,
      statusCode: response.statusCode,
      code: response.body.code,
      name: error?.name,
      message: error?.message,
    });
    return res.status(response.statusCode).json(response.body);
  }
}
