import { adminDb } from "../../../context/FirebaseAdmin";
import { listOpsCalendarEvents } from "../../../lib/ops/calendar";
import { saveManualOpsMemory } from "../../../lib/ops/companyMemory";
import {
  listPendingOpsTimeEditRequests,
  lookupSlackUserByEmail,
  recordOpsTimeEditRequestSlackDelivery,
  reviewOpsTimeEditRequest,
  saveOpsCalendarCorrection,
  setOpsTimeEntryOvertime,
  splitOpsTimeEntryBlock,
  updateOpsTimeEntryHours,
} from "../../../lib/ops/timeTracking";
import {
  listPendingOpsAssignmentDisputes,
  recordOpsAssignmentDisputeSlackDelivery,
  reviewOpsAssignmentDispute,
} from "../../../lib/ops/workOrders";
import { SlackClient } from "../../../lib/slack/client";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  getEffectiveRole,
  isAdminRole,
  isMasterAdminEmail,
} from "../../../utils/authAccess";

async function requireOpsAdmin(req, res) {
  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return null;
  if (!user?.uid) {
    res.status(401).json({ error: "Authentication required." });
    return null;
  }
  const role = getEffectiveRole(user.email, user);
  if (!isAdminRole(role)) {
    res.status(403).json({ error: "Ops is available to Admin users only." });
    return null;
  }
  return { ...user, role };
}

function clean(value, limit = 1000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

async function sendDecisionDm({ type, record, approved, applied = true }) {
  const requester = record?.requester || {};
  let slackUserId = clean(requester.slackUserId, 80);
  if (!slackUserId && requester.email) {
    const identity = await lookupSlackUserByEmail(requester.email);
    slackUserId = identity.id;
  }
  if (!slackUserId) throw new Error("No Slack account was available for the requester.");
  const workOrder = record?.workOrder || {};
  const decisionLabel = approved ? "approved" : "denied";
  const protectedNote = approved && type === "assignment_dispute" && !applied
    ? " BlueFolder still lists you as the dispatched engineer, so that protected assignment remains visible."
    : "";
  const decisionNote = clean(record?.decision?.note, 1200);
  return new SlackClient().postDirectMessage({
    userId: slackUserId,
    text:
      `*Magmo request ${decisionLabel}*\n` +
      `Your ${type === "time_edit" ? "hours edit" : "assignment review"} request for ` +
      `WO #${clean(workOrder.number || workOrder.id, 120)} — ${clean(workOrder.subject, 500)} was ${decisionLabel}.` +
      protectedNote +
      (decisionNote ? `\n*Note:* ${decisionNote}` : ""),
    metadata: {
      event_type: "magmo_ops_request_decision",
      event_payload: {
        request_id: String(record?.id || ""),
        request_type: type,
        decision: decisionLabel,
      },
    },
  });
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
      return res.status(503).json({ error: "The Ops calendar is not available." });
    }
    if (req.method === "GET") {
      const start = String(req.query.start || "");
      const end = String(req.query.end || "");
      const canModifyHours = isMasterAdminEmail(user.email);
      const [calendar, timeEditNotifications, assignmentNotifications] =
        await Promise.all([
          listOpsCalendarEvents({ startIso: start, endIso: end }),
          canModifyHours ? listPendingOpsTimeEditRequests() : Promise.resolve([]),
          canModifyHours ? listPendingOpsAssignmentDisputes() : Promise.resolve([]),
        ]);
      const notifications = [
        ...timeEditNotifications.map((request) => ({
          ...request,
          notificationId: `time_edit:${request.id}`,
          notificationType: "time_edit",
        })),
        ...assignmentNotifications.map((dispute) => ({
          ...dispute,
          notificationId: `assignment_dispute:${dispute.workOrder?.id}:${dispute.id}`,
          notificationType: "assignment_dispute",
        })),
      ].sort(
        (left, right) =>
          Date.parse(left.createdAtIso || 0) - Date.parse(right.createdAtIso || 0)
      );
      res.setHeader("Cache-Control", "private, no-store");
      return res.status(200).json({
        ok: true,
        ...calendar,
        canModifyHours,
        canManageOvertime: true,
        canSplitHours: canModifyHours,
        notifications,
      });
    }

    const body = req.body || {};
    const action = String(body.action || "").trim().toLowerCase();
    const changedBy = user.email || user.uid;
    const canModifyHours = isMasterAdminEmail(user.email);

    if (action === "review_notification") {
      if (!canModifyHours) {
        return res.status(403).json({ error: "Only the Magmo owner can review employee requests." });
      }
      const notificationType = clean(body.notificationType || body.type, 40).toLowerCase();
      const decisionValue = clean(body.decision, 20).toLowerCase();
      const approved =
        body.approved === true || ["approve", "approved"].includes(decisionValue);
      const decisionNote = body.note ?? body.decisionNote;
      let record;
      let applied = true;
      let idempotent = false;
      if (notificationType === "time_edit") {
        const reviewed = await reviewOpsTimeEditRequest({
          requestId: body.requestId,
          approved,
          decidedByUid: user.uid,
          decidedByEmail: user.email,
          decidedByName: user.name || user.email,
          note: decisionNote,
        });
        record = reviewed.request;
        applied = record.status === "approved";
        idempotent = Boolean(reviewed.idempotent);
      } else if (notificationType === "assignment_dispute") {
        const reviewed = await reviewOpsAssignmentDispute({
          workOrderId: body.workOrderId,
          disputeId: body.disputeId || body.requestId,
          approved,
          decidedBy: {
            uid: user.uid,
            email: user.email,
            name: user.name || user.email,
          },
          note: decisionNote,
        });
        record = {
          ...reviewed.dispute,
          workOrder: {
            id: reviewed.workOrder.id,
            number: reviewed.workOrder.number,
            subject: reviewed.workOrder.subject,
          },
        };
        applied = Boolean(reviewed.dispute?.applied);
        idempotent = Boolean(reviewed.idempotent);
      } else {
        return res.status(400).json({ error: "Choose a valid notification request." });
      }
      const finalApproved = record?.status === "approved";
      if (idempotent && record?.slackDm?.status === "sent") {
        return res.status(200).json({
          ok: true,
          notification: record,
          slackDm: {
            sent: true,
            ts: clean(record.slackDm.ts, 80),
            duplicate: true,
          },
        });
      }
      let slackDm = { sent: false, error: "" };
      try {
        const posted = await sendDecisionDm({
          type: notificationType,
          record,
          approved: finalApproved,
          applied,
        });
        slackDm = { sent: true, ts: clean(posted?.ts, 80), error: "" };
        if (notificationType === "time_edit") {
          await recordOpsTimeEditRequestSlackDelivery({
            requestId: record.id,
            status: "sent",
            ts: slackDm.ts,
          });
        } else {
          await recordOpsAssignmentDisputeSlackDelivery({
            workOrderId: record.workOrder.id,
            disputeId: record.id,
            status: "sent",
            ts: slackDm.ts,
          });
        }
      } catch (dmError) {
        slackDm = { sent: false, error: clean(dmError?.message, 500) };
        const delivery = {
          status: "failed",
          error: slackDm.error,
        };
        if (notificationType === "time_edit") {
          await recordOpsTimeEditRequestSlackDelivery({
            requestId: record.id,
            ...delivery,
          }).catch(() => {});
        } else {
          await recordOpsAssignmentDisputeSlackDelivery({
            workOrderId: record.workOrder.id,
            disputeId: record.id,
            ...delivery,
          }).catch(() => {});
        }
      }
      return res.status(200).json({ ok: true, notification: record, slackDm });
    }

    if (action === "set_overtime") {
      const entry = await setOpsTimeEntryOvertime({
        entryId: body.timeEntryId,
        isOvertime: Boolean(body.isOvertime),
        changedBy,
        notes: body.notes,
      });
      return res.status(200).json({ ok: true, entry });
    }

    if (action === "split_time_block") {
      if (!canModifyHours) {
        return res.status(403).json({ error: "Only the Magmo owner can split recorded hours." });
      }
      const entries = await splitOpsTimeEntryBlock({
        entryId: body.timeEntryId,
        splitIso: body.splitIso,
        overtimePart: body.overtimePart,
        changedBy,
        notes: body.notes,
      });
      return res.status(200).json({ ok: true, entries });
    }

    const workOrderId = String(body.workOrderId || "").trim();
    const sourceEventId =
      String(body.sourceEventId || "").trim() ||
      (action === "add_time_block"
        ? `admin-created-${user.uid}-${Date.now()}`
        : "");
    if (!workOrderId || !sourceEventId) {
      return res.status(400).json({ error: "The work order and calendar entry are required." });
    }
    const workOrderSnapshot = await adminDb.collection("OpsWorkOrders").doc(workOrderId).get();
    if (!workOrderSnapshot.exists) {
      return res.status(404).json({ error: "The work order no longer exists." });
    }
    const workOrder = { id: workOrderSnapshot.id, ...(workOrderSnapshot.data() || {}) };
    if (
      ["resolve_unknown", "correct_event", "edit_clock", "add_time_block"].includes(action) &&
      !canModifyHours
    ) {
      return res.status(403).json({
        error: "Only the Magmo owner can modify recorded work-order hours.",
      });
    }

    if (["resolve_unknown", "correct_event", "add_time_block"].includes(action)) {
      const entry = await saveOpsCalendarCorrection({
        sourceEventId,
        workOrderId,
        workOrderNumber: workOrder.number,
        workOrderSubject: workOrder.subject,
        person: body.person || {},
        startIso: body.startIso,
        endIso: body.endIso,
        timeType: body.timeType,
        notes: body.notes,
        changedBy,
        isOvertime: Boolean(body.isOvertime),
      });
      await saveManualOpsMemory({
        workOrder,
        kind:
          action === "add_time_block"
            ? "manual_calendar_time_added"
            : "calendar_presence_correction",
        summary:
          `${action === "add_time_block" ? "A master admin added" : "Use"} the confirmed ${entry.timeType === "travel" ? "travel" : "work"} session ` +
          `${entry.startedAt} through ${entry.endedAt}. ` +
          `${String(body.notes || "").trim()}`.trim(),
        assigneeNames: [entry.person?.name].filter(Boolean),
        polarity: "positive",
        changedBy,
        sourceId: `${action}-${sourceEventId}`,
      });
      return res.status(200).json({ ok: true, entry });
    }

    if (action === "edit_clock") {
      const entry = await updateOpsTimeEntryHours({
        entryId: body.timeEntryId,
        startIso: body.startIso,
        endIso: body.endIso,
        notes: body.notes,
        changedBy,
        isOvertime:
          typeof body.isOvertime === "boolean" ? body.isOvertime : undefined,
      });
      await saveManualOpsMemory({
        workOrder,
        kind: "manual_clock_correction",
        summary:
          `The official clocked session was corrected to ${entry.startedAt} ` +
          `through ${entry.endedAt}. ${String(body.notes || "").trim()}`.trim(),
        assigneeNames: [entry.person?.name].filter(Boolean),
        polarity: "positive",
        changedBy,
        sourceId: `clock-correction-${entry.id}-${Date.now()}`,
      });
      return res.status(200).json({ ok: true, entry });
    }

    if (action === "feedback") {
      const vote = ["up", "neutral", "down"].includes(body.vote)
        ? body.vote
        : "";
      const reason = String(body.reason || "").trim().slice(0, 1200);
      if (!vote || (vote === "down" && !reason)) {
        return res.status(400).json({
          error: vote === "down"
            ? "Briefly explain what the AI should have checked."
            : "Choose a feedback rating.",
        });
      }
      const feedbackRef = adminDb.collection("OpsCalendarFeedback").doc();
      await feedbackRef.set({
        workOrderId,
        workOrderNumber: String(workOrder.number || workOrderId),
        sourceEventId,
        person: body.person || {},
        vote,
        reason,
        inferenceReason: String(body.inferenceReason || "").slice(0, 1200),
        changedBy,
        createdAtIso: new Date().toISOString(),
      });
      await saveManualOpsMemory({
        workOrder,
        kind: "calendar_presence_feedback",
        summary:
          `${vote === "down" ? "Incorrect" : vote === "neutral" ? "Uncertain" : "Correct"} ` +
          `calendar inference for ${body.person?.name || "the engineer"}. ${reason}`.trim(),
        assigneeNames: [body.person?.name].filter(Boolean),
        polarity: vote === "down" ? "negative" : "positive",
        changedBy,
        sourceId: `calendar-feedback-${feedbackRef.id}`,
      });
      return res.status(200).json({ ok: true, feedbackId: feedbackRef.id });
    }
    return res.status(400).json({ error: "Unsupported calendar update." });
  } catch (error) {
    console.error("[Ops][calendar]", error?.message);
    const expected = /valid calendar|limited to|valid start|valid clock|cannot exceed|work order and engineer|required|request|notification|overtime|split|recorded block|clock out|no longer exists/i.test(error?.message || "");
    return res.status(expected ? 400 : 500).json({
      error: expected ? error.message : "The Ops calendar could not be loaded.",
    });
  }
}
