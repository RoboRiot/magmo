import { createHash } from "crypto";
import { adminDb } from "../../../context/FirebaseAdmin";
import {
  listOpsWorkOrders,
  removeOpsSelfAssignment,
  reportOpsAssignmentDispute,
} from "../../../lib/ops/workOrders";
import {
  approveClockOutRequest,
  clockInToWorkOrder,
  listClockOutApprovalsForManager,
  listOpenClocksForUser,
  listOpsTimeEditRequestsForUser,
  listRecentUserTimeEntries,
  listUserTimeEntriesForRange,
  lookupSlackUserByEmail,
  prepareOpsTravelStart,
  recordOpsClockStartSlackDelivery,
  requestClockOutOfWorkOrder,
  requestOpsTimeEntryEdit,
  workOrderResponsibilityEvidenceForUser,
  workOrderWasParticipatedInByUser,
} from "../../../lib/ops/timeTracking";
import { SlackClient } from "../../../lib/slack/client";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { isMasterAdminEmail } from "../../../utils/authAccess";

const OPS_GENERAL_CURRENT_STAGES = new Set(["unassigned", "remote", "active"]);

function clean(value, limit = 1000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function isCurrentGeneralWorkOrder(workOrder = {}) {
  const stage = clean(
    workOrder.workflowStatus || workOrder.workflowStage,
    60
  )
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return OPS_GENERAL_CURRENT_STAGES.has(stage);
}

function uuidFromEntryId(value) {
  const hex = createHash("sha256").update(String(value || "")).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function etaClockLabel(value) {
  const time = Date.parse(value || "");
  if (!Number.isFinite(time)) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: process.env.OPS_TIME_ZONE || "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(time));
}

async function postClockStartToSlack({ entry, slackUserId }) {
  if (!entry?.id || entry.slackStartNotification?.status === "posted") {
    return { sent: true, duplicate: true };
  }
  const workOrderSnapshot = await adminDb
    .collection("OpsWorkOrders")
    .doc(clean(entry.workOrderId, 180))
    .get();
  const workOrder = workOrderSnapshot.data() || {};
  const channel = clean(workOrder.slackChannel, 120);
  const threadTs = clean(workOrder.slackThreadTs, 120);
  if (!channel || !threadTs) {
    const error = "This work order does not have a linked Slack thread.";
    await recordOpsClockStartSlackDelivery({
      entryId: entry.id,
      status: "failed",
      error,
    });
    return { sent: false, error };
  }
  const mention = slackUserId ? `<@${slackUserId}>` : clean(entry.person?.name, 120);
  let text;
  if (entry.timeType === "travel") {
    const minutes = Math.max(0, Number(entry.travel?.etaMinutes || 0));
    const arrival = etaClockLabel(entry.travel?.estimatedArrivalAtIso);
    if (!minutes) {
      const error = "Travel started, but no reliable ETA was available to post.";
      await recordOpsClockStartSlackDelivery({
        entryId: entry.id,
        status: "failed",
        error,
      });
      return { sent: false, error };
    }
    text = `${mention} is on the way. ETA is approximately ${minutes} minute${minutes === 1 ? "" : "s"}${arrival ? ` (${arrival})` : ""}.`;
  } else {
    text = `${mention} has arrived on site.`;
  }
  try {
    const result = await new SlackClient().postReport({
      channel,
      threadTs,
      text,
      clientMsgId: uuidFromEntryId(`ops-clock-start:${entry.id}`),
      metadata: {
        event_type: "magmo_ops_clock_start",
        event_payload: {
          clock_entry_id: String(entry.id),
          work_order_id: String(entry.workOrderId),
          time_type: String(entry.timeType),
        },
      },
    });
    await recordOpsClockStartSlackDelivery({
      entryId: entry.id,
      status: "posted",
      messageTs: result?.ts,
    });
    return { sent: true, ts: result?.ts || "" };
  } catch (error) {
    await recordOpsClockStartSlackDelivery({
      entryId: entry.id,
      status: "failed",
      error: error?.message,
    }).catch(() => null);
    return { sent: false, error: "Slack could not be notified. The clock is still running." };
  }
}

function safeWorkOrder(workOrder = {}) {
  return {
    id: workOrder.id,
    number: workOrder.number,
    subject: workOrder.subject,
    customer: workOrder.customer,
    workflowStatus: workOrder.workflowStatus,
    workflowStageLabel: workOrder.workflowStageLabel,
    priorityTier: workOrder.priorityTier,
    priorityLabel: workOrder.priorityLabel,
    priorityOrder: workOrder.priorityOrder,
    assignees: workOrder.assignees || [],
    participants: workOrder.participants || [],
    oversightManagers: workOrder.oversightManagers || [],
    workMode: workOrder.workMode,
    slackPermalink: workOrder.slackPermalink,
    bluefolderUrl: workOrder.bluefolderUrl,
    lastActivityAt: workOrder.lastActivityAt,
    createdAt: workOrder.createdAt,
  };
}

async function requireOpsUser(req, res) {
  const user = await requireFirebaseAuth(req, res);
  if (res.headersSent) return null;
  if (!user?.uid || !user?.email) {
    res.status(401).json({ error: "Authentication required." });
    return null;
  }
  return user;
}

function requestedHistoryRange(req) {
  const source = req.method === "PATCH" ? req.body || {} : req.query || {};
  const requestedStart = String(source.historyStart || "");
  const requestedEnd = String(source.historyEnd || "");
  const startMs = Date.parse(requestedStart);
  const endMs = Date.parse(requestedEnd);
  if (
    Number.isFinite(startMs) &&
    Number.isFinite(endMs) &&
    endMs > startMs &&
    endMs - startMs <= 15 * 86400000
  ) {
    return {
      startIso: new Date(startMs).toISOString(),
      endIso: new Date(endMs).toISOString(),
    };
  }
  const now = new Date();
  const start = new Date(now);
  const day = start.getUTCDay() || 7;
  start.setUTCDate(start.getUTCDate() - day + 1);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

async function loadGeneralOps(user, historyRange) {
  const slackIdentity = await lookupSlackUserByEmail(user.email);
  const [
    workOrders,
    openClocks,
    recentEntries,
    responsibilityEntries,
    approvalRequests,
    timeEditRequests,
  ] = await Promise.all([
      listOpsWorkOrders(),
      listOpenClocksForUser(user.uid),
      listUserTimeEntriesForRange({
        userUid: user.uid,
        slackUserId: slackIdentity.id,
        userEmail: user.email,
        startIso: historyRange.startIso,
        endIso: historyRange.endIso,
      }),
      listRecentUserTimeEntries(user.uid, 100),
      listClockOutApprovalsForManager(slackIdentity.id),
      listOpsTimeEditRequestsForUser(user.uid),
    ]);
  const allWorkOrders = Array.from(
    new Map(
      [
        ...workOrders.unassigned,
        ...workOrders.active,
        ...(workOrders.remote || []),
        ...(workOrders.scheduled || []),
        ...(workOrders.onHold || []),
        ...(workOrders.inactive || []),
        ...(workOrders.serviceComplete || []),
        ...(workOrders.done || []),
        ...(workOrders.closed || []),
      ].map((workOrder) => [workOrder.id, workOrder])
    ).values()
  );
  const circulation = [
    ...workOrders.unassigned,
    ...workOrders.active,
    ...(workOrders.remote || []),
  ].filter(isCurrentGeneralWorkOrder);
  const responsibilityIdentity = {
    ...slackIdentity,
    email: user.email,
    name: slackIdentity.name || user.name || user.magmoName || "",
  };
  const recordedWorkOrderIds = new Set(
    [...openClocks, ...responsibilityEntries]
      .map((entry) => clean(entry?.workOrderId, 180))
      .filter(Boolean)
  );
  const assigned = [];
  const participated = [];
  const other = [];
  circulation.forEach((workOrder) => {
    const responsibilityEvidence = workOrderResponsibilityEvidenceForUser(
      workOrder,
      responsibilityIdentity,
      { hasRecordedTime: recordedWorkOrderIds.has(workOrder.id) }
    );
    if (responsibilityEvidence) {
      assigned.push({
        ...safeWorkOrder(workOrder),
        responsibilityEvidence,
      });
    } else if (
      workOrderWasParticipatedInByUser(workOrder, responsibilityIdentity)
    ) {
      participated.push(safeWorkOrder(workOrder));
    } else {
      other.push(safeWorkOrder(workOrder));
    }
  });
  const workOrdersById = new Map(
    circulation.map((workOrder) => [workOrder.id, workOrder])
  );
  const normalizedEmail = clean(user.email, 320).toLowerCase();
  const assignmentDisputes = allWorkOrders
    .flatMap((workOrder) =>
      (workOrder.assignmentDisputes || []).map((dispute) => ({
        ...dispute,
        workOrderId: workOrder.id,
        workOrderNumber: workOrder.number,
        workOrderSubject: workOrder.subject,
        workOrder: safeWorkOrder(workOrder),
      }))
    )
    .filter(
      (dispute) =>
        dispute.requester?.uid === user.uid ||
        (slackIdentity.id && dispute.requester?.slackUserId === slackIdentity.id) ||
        (normalizedEmail && dispute.requester?.email === normalizedEmail)
    )
    .sort(
      (left, right) =>
        Date.parse(right.updatedAtIso || 0) - Date.parse(left.updatedAtIso || 0)
    );
  const clocksWithOversight = openClocks.map((clock) => ({
    ...clock,
    canSelfApproveClockOut: Boolean(
      (workOrdersById.get(clock.workOrderId)?.oversightManagers || []).some(
        (manager) =>
          (slackIdentity.id && manager.id === slackIdentity.id) ||
          (manager.email &&
            clean(manager.email, 320).toLowerCase() ===
              clean(user.email, 320).toLowerCase())
      )
    ),
  }));
  return {
    currentUser: {
      uid: user.uid,
      email: clean(user.email, 320).toLowerCase(),
      name: clean(
        slackIdentity.name ||
          user.name ||
          user.magmoName ||
          user.email.split("@")[0],
        120
      ),
      slack: {
        matched: slackIdentity.matched,
        id: slackIdentity.id,
        name: slackIdentity.name,
        avatar: slackIdentity.avatar || "",
        reason: slackIdentity.reason || "",
      },
      canRemoveAssignmentImmediately: isMasterAdminEmail(user.email),
    },
    assigned,
    participated,
    other,
    openClocks: clocksWithOversight,
    openClock: clocksWithOversight[0] || null,
    approvalRequests,
    recentEntries,
    timeEditRequests,
    assignmentDisputes,
    historyRange,
  };
}

export default async function handler(req, res) {
  if (!["GET", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", "GET, PATCH");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const user = await requireOpsUser(req, res);
    if (res.headersSent || !user) return;
    if (!adminDb) {
      return res
        .status(503)
        .json({ error: "Ops-General is temporarily unavailable." });
    }

    let actionWarning = "";
    if (req.method === "PATCH") {
      const action = clean(req.body?.action, 40).toLowerCase();
      const slackIdentity = await lookupSlackUserByEmail(user.email);
      const userName = clean(
        slackIdentity.name ||
          user.name ||
          user.magmoName ||
          user.email.split("@")[0],
        120
      );
      if (action === "prepare_travel") {
        const travel = await prepareOpsTravelStart({
          userUid: user.uid,
          workOrderId: req.body?.workOrderId,
        });
        res.setHeader("Cache-Control", "private, no-store");
        return res.status(200).json({ ok: true, travel });
      } else if (action === "clock_in") {
        const entry = await clockInToWorkOrder({
          userUid: user.uid,
          userEmail: user.email,
          userName,
          slackUserId: slackIdentity.id,
          workOrderId: req.body?.workOrderId,
          timeType: req.body?.timeType,
          travelOrigin: req.body?.travelOrigin,
          manualEtaMinutes: req.body?.manualEtaMinutes,
        });
        const slackStart = await postClockStartToSlack({
          entry,
          slackUserId: slackIdentity.id,
        });
        if (!slackStart.sent) {
          actionWarning = clean(slackStart.error, 500);
        }
      } else if (action === "clock_out") {
        const approval = await requestClockOutOfWorkOrder({
          userUid: user.uid,
          entryId: req.body?.entryId,
        });
        if (!approval?.duplicate && !approval?.selfApproved) {
          const protocol = String(req.headers["x-forwarded-proto"] || "https")
            .split(",")[0]
            .trim();
          const host = String(req.headers["x-forwarded-host"] || req.headers.host || "magmo.cloud")
            .split(",")[0]
            .trim();
          const approvalUrl = `${protocol}://${host}/Ops-General?approval=${encodeURIComponent(approval.id)}`;
          const slack = new SlackClient();
          await Promise.all(
            (approval.managers || []).map((manager) =>
              slack.postDirectMessage({
                userId: manager.id,
                text:
                  `*Clock-out approval requested*\n${approval.requesterName} is ready to clock out of WO #${approval.workOrderNumber} — ${approval.workOrderSubject}.\n<${approvalUrl}|Review and approve in Magmo>`,
                metadata: {
                  event_type: "magmo_ops_clock_out_approval",
                  event_payload: {
                    approval_id: String(approval.id),
                    work_order_id: String(approval.workOrderId),
                  },
                },
              }).catch((error) => {
                console.warn("[Ops][clock-out-dm]", manager.id, error?.message);
                return null;
              })
            )
          );
        }
      } else if (action === "retry_clock_start_notification") {
        const entryId = clean(req.body?.entryId, 180);
        const snapshot = await adminDb.collection("OpsTimeEntries").doc(entryId).get();
        const data = snapshot.data() || {};
        if (!snapshot.exists || clean(data.userUid, 180) !== clean(user.uid, 180)) {
          throw new Error("That clock session is not available for Slack retry.");
        }
        const slackStart = await postClockStartToSlack({
          entry: {
            id: snapshot.id,
            workOrderId: clean(data.workOrderId, 180),
            timeType: clean(data.timeType, 20) === "travel" ? "travel" : "work",
            person: { name: clean(data.userName || data.userEmail, 120) },
            travel: data.travel || null,
            slackStartNotification: data.slackStartNotification || null,
          },
          slackUserId: slackIdentity.id,
        });
        if (!slackStart.sent) actionWarning = clean(slackStart.error, 500);
      } else if (["approve_clock_out", "reject_clock_out"].includes(action)) {
        if (!slackIdentity.id) {
          throw new Error("Your Magmo login must match Slack before you can review clock-out requests.");
        }
        await approveClockOutRequest({
          approvalId: req.body?.approvalId,
          managerSlackUserId: slackIdentity.id,
          managerName: userName,
          approved: action === "approve_clock_out",
        });
      } else if (action === "report_assignment_mismatch") {
        if (!slackIdentity.id) {
          throw new Error(
            "Your Magmo login must match Slack before you can report an assignment mismatch."
          );
        }
        await reportOpsAssignmentDispute({
          workOrderId: req.body?.workOrderId,
          requester: {
            uid: user.uid,
            email: user.email,
            name: userName,
            slackUserId: slackIdentity.id,
          },
          reason: req.body?.reason,
        });
      } else if (action === "remove_self_assignment") {
        if (!isMasterAdminEmail(user.email)) {
          throw new Error(
            "Only the Magmo master admin can remove an assignment immediately."
          );
        }
        if (!slackIdentity.id) {
          throw new Error(
            "Your Magmo login must match Slack before you can remove an assignment."
          );
        }
        await removeOpsSelfAssignment({
          workOrderId: req.body?.workOrderId,
          requester: {
            uid: user.uid,
            email: user.email,
            name: userName,
            slackUserId: slackIdentity.id,
          },
          reason: req.body?.reason,
        });
      } else if (action === "request_time_edit") {
        await requestOpsTimeEntryEdit({
          userUid: user.uid,
          userEmail: user.email,
          userName,
          slackUserId: slackIdentity.id,
          entryId: req.body?.entryId,
          startIso: req.body?.startIso,
          endIso: req.body?.endIso,
          timeType: req.body?.timeType,
          reason: req.body?.reason,
        });
      } else {
        return res.status(400).json({ error: "Unknown clock action." });
      }
    }

    const payload = await loadGeneralOps(user, requestedHistoryRange(req));
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({
      ok: true,
      ...payload,
      ...(actionWarning ? { warning: actionWarning } : {}),
    });
  } catch (error) {
    console.error("[Ops][general]", error?.message);
    const expected =
      /already running|clocked|clock-out|approval|oversight manager|valid work order|no longer exists|currently in circulation|clock session|clock record|time entry|recorded hours|assigned to you|assignment mismatch|remove an assignment|master admin|explain why|match Slack|authenticated user|request changes|pending|24 hours|travel|routing|ETA|ZIP code|origin|destination|site/i.test(
        error?.message || ""
      );
    return res.status(expected ? 400 : 500).json({
      error: expected
        ? error.message
        : "Ops-General could not complete that request.",
    });
  }
}
