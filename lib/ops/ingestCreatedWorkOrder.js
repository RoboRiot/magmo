import { inferWorkOrderAssignment } from "../ai/inferWorkOrderAssignment";
import { getRelevantOpsCompanyMemory } from "./companyMemory";
import {
  saveOpsInitialPriorityAnalysis,
  upsertOpsWorkOrder,
} from "./workOrders";

export async function ingestCreatedWorkOrder(payload = {}) {
  const workOrderId = String(payload.workOrderId || "").trim();
  if (!workOrderId) throw new Error("A valid work order ID is required.");

  let workOrder = await upsertOpsWorkOrder(payload);
  let priorityAnalyzed = workOrder.priorityInferenceVersion >= 1;
  if (!priorityAnalyzed) {
    try {
      const companyMemory = await getRelevantOpsCompanyMemory(workOrder, {});
      const analysis = await inferWorkOrderAssignment({
        workOrder,
        message: {},
        companyMemory,
        priorityOnly: true,
      });
      workOrder = await saveOpsInitialPriorityAnalysis({
        workOrderId,
        ...analysis,
      });
      priorityAnalyzed = true;
    } catch (error) {
      console.warn("[Ops][initial-priority]", {
        workOrderId,
        message: error?.message,
      });
    }
  }
  return { workOrder, priorityAnalyzed };
}
