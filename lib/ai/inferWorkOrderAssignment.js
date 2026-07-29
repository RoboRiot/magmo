import { OpenAI } from "openai";

const VALID_PRIORITY_TIERS = new Set([
  "hard_down",
  "in_progress",
  "needs_scheduled",
  "anytime",
]);
const GENERATED_PRIORITY_PATTERN = /^generated_[a-z0-9]+(?:_[a-z0-9]+){0,4}$/;
const PRIORITY_LABELS = {
  hard_down: "Hard down",
  in_progress: "In progress",
  needs_scheduled: "Needs to be scheduled",
  anytime: "Anytime",
};

function validPriorityTier(value) {
  const tier = clean(value, 60).toLowerCase();
  return VALID_PRIORITY_TIERS.has(tier) || GENERATED_PRIORITY_PATTERN.test(tier)
    ? tier
    : "";
}

function priorityLabel(tier, value = "") {
  if (PRIORITY_LABELS[tier]) return PRIORITY_LABELS[tier];
  return (
    clean(value, 80).replace(/\s*\(Generated\)\s*$/i, "") ||
    tier
      .replace(/^generated_/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
  );
}

function clean(value, maxLength = 700) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function uniqueCandidates(candidates = []) {
  const seen = new Set();
  return candidates.reduce((result, candidate) => {
    const name = clean(candidate?.name || candidate, 100);
    const id = clean(candidate?.id, 80);
    const key = name.toLowerCase();
    if (name && !seen.has(key) && result.length < 30) {
      seen.add(key);
      result.push({ id, name });
    }
    return result;
  }, []);
}

function extractResponseText(response) {
  if (response?.output_text) return response.output_text.trim();
  return (response?.output || [])
    .flatMap((output) => output?.content || [])
    .map((content) => content?.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

function memoryContext(companyMemory = []) {
  const lines = (Array.isArray(companyMemory) ? companyMemory : [])
    .slice(0, 5)
    .map((memory, index) => {
      const details = [
        memory.priorityTier ? `category=${memory.priorityTier}` : "",
        memory.rejectedPriorityTier
          ? `rejected_category=${memory.rejectedPriorityTier}`
          : "",
        memory.assigneeNames?.length
          ? `people=${memory.assigneeNames.join(", ")}`
          : "",
      ]
        .filter(Boolean)
        .join("; ");
      const prefix = memory.polarity === "negative" ? "AVOID: " : "CONFIRMED: ";
      return `${index + 1}. ${prefix}${clean(memory.summary, 500)}${details ? ` (${details})` : ""}`;
    });
  return lines.length
    ? lines.join("\n")
    : "No relevant saved company examples were found.";
}

export async function inferWorkOrderAssignment({
  workOrder,
  message = {},
  companyMemory = [],
  priorityOnly = false,
}) {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const currentAssignees = uniqueCandidates(workOrder.assignees);
  const candidates = uniqueCandidates([
    ...currentAssignees,
    ...(message.candidates || []),
    message.sender,
  ]);
  const candidateByName = new Map(
    candidates.map((candidate) => [candidate.name.toLowerCase(), candidate])
  );
  const currentPriorityTier = validPriorityTier(workOrder.priorityTier) || "needs_scheduled";
  const currentPriorityLabel = priorityLabel(
    currentPriorityTier,
    workOrder.priorityLabel
  );
  const currentPriorityGenerated =
    Boolean(workOrder.priorityGenerated) ||
    GENERATED_PRIORITY_PATTERN.test(currentPriorityTier);
  const currentPriorityOrder = Number.isFinite(Number(workOrder.priorityOrder))
    ? Math.max(0, Math.min(3, Number(workOrder.priorityOrder)))
    : VALID_PRIORITY_TIERS.has(currentPriorityTier)
    ? ["hard_down", "in_progress", "needs_scheduled", "anytime"].indexOf(
        currentPriorityTier
      )
    : 2;
  const rejectedTiers = new Set(
    (Array.isArray(workOrder.rejectedPriorityTiers)
      ? workOrder.rejectedPriorityTiers
      : []
    )
      .map(validPriorityTier)
      .filter(Boolean)
  );
  const currentRemoteWorkActive = Boolean(workOrder.remoteWorkActive);
  const currentWorkMode = ["remote", "in_person", "mixed", "unspecified"].includes(
    clean(workOrder.workMode, 40).toLowerCase()
  )
    ? clean(workOrder.workMode, 40).toLowerCase()
    : "unspecified";
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: Number(process.env.OPS_OPENAI_TIMEOUT_MS || 30000),
  });
  const response = await client.responses.create({
    model: process.env.OPS_ASSIGNMENT_MODEL || "gpt-5-nano",
    store: false,
    input: [
      {
        role: "system",
        content:
          "Update a field-service work order from its current state and one new Slack message. " +
          "For assignment, change responsibility only for an explicit assignment, acceptance, handoff, removal, or clear statement that someone is now handling the task. Interpret first-person commitments as the sender. Technical advisers, people merely notified, question askers, and status reporters are not owners unless they accept responsibility. Multiple owners are allowed, but use only supplied candidate names. " +
          "The newest Slack message is the strongest category evidence; compact prior context and saved examples only provide continuity or explain company language. " +
          "For operational category, choose hard_down only when equipment or the customer operation is currently stopped or unusable; needs_scheduled when the next meaningful step is arranging a date, visit, technician, part, or delivery; in_progress when active work is underway; and anytime when the work is genuinely non-urgent with no required schedule or current response. Prefer these four categories. Only when none fits a distinct reusable state, create a concise 2-4 word generated_lowercase_slug category, mark it generated, and assign urgency order 0-3. Never reuse a rejected category. Do not mark completed from conversation text because only !done completes an order. " +
          "Separately determine whether someone is actively working the issue remotely right now. Remote means current hands-on remote troubleshooting, diagnosis, testing, software work, or a live remote session. A request to add remote access, a future remote plan, or merely mentioning the word remote is not active remote work. Preserve the current remote state unless the newest evidence clearly starts or ends remote work. " +
          "Update priorityContext as a short factual statement of the current operational situation. Saved company examples are advisory and never stronger than current evidence. Return observable reasons, not private chain-of-thought.",
      },
      {
        role: "user",
        content:
          `Mode: ${priorityOnly ? "initial category classification; do not change assignment" : "incremental Slack update"}\n` +
          `Work order: #${clean(workOrder.number, 100)} ${clean(workOrder.subject, 400)}\n` +
          `Customer: ${clean(workOrder.customer, 220) || "Unknown"}\n` +
          `Description: ${clean(workOrder.description, 1200) || "Not supplied"}\n` +
          `Current assignees: ${currentAssignees.map((entry) => entry.name).join(", ") || "Unassigned"}\n` +
          `Prior assignment summary: ${clean(workOrder.assignmentSummary, 500) || "None"}\n` +
          `Allowed candidate names: ${candidates.map((entry) => entry.name).join(", ") || "None"}\n` +
          `Current operational category: ${currentPriorityTier} (${currentPriorityLabel})\n` +
          `Current category is generated: ${currentPriorityGenerated}\n` +
          `Current operational situation: ${clean(workOrder.priorityContext || workOrder.priorityReason, 900) || "Not established yet"}\n` +
          `Current remote work active: ${currentRemoteWorkActive}\n` +
          `Current work mode: ${currentWorkMode}\n` +
          `Rejected categories: ${[...rejectedTiers].join(", ") || "None"}\n` +
          `New message sender: ${clean(message.sender?.name, 100) || "None"}\n` +
          `New message: ${clean(message.text, 2400) || "No Slack message yet"}\n` +
          `Relevant saved company examples:\n${memoryContext(companyMemory)}`,
      },
    ],
    max_output_tokens: Math.max(
      440,
      Number(process.env.OPS_ASSIGNMENT_MAX_OUTPUT_TOKENS || 440)
    ),
    reasoning: {
      effort: process.env.OPS_ASSIGNMENT_REASONING_EFFORT || "minimal",
    },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "ops_state_update",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            changed: { type: "boolean" },
            assigneeNames: {
              type: "array",
              items: { type: "string" },
              maxItems: 12,
            },
            summary: { type: "string" },
            reason: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            priorityChanged: { type: "boolean" },
            priorityTier: {
              type: "string",
              maxLength: 60,
            },
            priorityLabel: { type: "string", maxLength: 80 },
            priorityGenerated: { type: "boolean" },
            priorityOrder: { type: "integer", minimum: 0, maximum: 3 },
            priorityReason: { type: "string" },
            priorityContext: { type: "string" },
            priorityConfidence: { type: "number", minimum: 0, maximum: 1 },
            workMode: {
              type: "string",
              enum: ["remote", "in_person", "mixed", "unspecified"],
            },
            remoteWorkActive: { type: "boolean" },
            remoteStateChanged: { type: "boolean" },
            remoteWorkReason: { type: "string" },
            remoteWorkConfidence: {
              type: "number",
              minimum: 0,
              maximum: 1,
            },
          },
          required: [
            "changed",
            "assigneeNames",
            "summary",
            "reason",
            "confidence",
            "priorityChanged",
            "priorityTier",
            "priorityLabel",
            "priorityGenerated",
            "priorityOrder",
            "priorityReason",
            "priorityContext",
            "priorityConfidence",
            "workMode",
            "remoteWorkActive",
            "remoteStateChanged",
            "remoteWorkReason",
            "remoteWorkConfidence",
          ],
        },
      },
    },
  });

  const output = JSON.parse(extractResponseText(response));
  const requested = Array.isArray(output.assigneeNames)
    ? output.assigneeNames
        .map((name) => candidateByName.get(clean(name, 100).toLowerCase()))
        .filter(Boolean)
    : [];
  const assignmentChanged = !priorityOnly && Boolean(output.changed);
  const assignees = assignmentChanged
    ? uniqueCandidates(requested)
    : currentAssignees;
  let requestedTier = validPriorityTier(output.priorityTier) || currentPriorityTier;
  let requestedGenerated = GENERATED_PRIORITY_PATTERN.test(requestedTier);
  let requestedLabel = priorityLabel(requestedTier, output.priorityLabel);
  let requestedOrder = Number.isFinite(Number(output.priorityOrder))
    ? Math.max(0, Math.min(3, Number(output.priorityOrder)))
    : currentPriorityOrder;
  if (rejectedTiers.has(requestedTier)) {
    requestedTier = currentPriorityTier;
    requestedGenerated = currentPriorityGenerated;
    requestedLabel = currentPriorityLabel;
    requestedOrder = currentPriorityOrder;
  }
  const priorityConfidence = Number(output.priorityConfidence || 0);
  const priorityChanged =
    Boolean(output.priorityChanged) &&
    requestedTier !== currentPriorityTier &&
    priorityConfidence >= Number(process.env.OPS_PRIORITY_MIN_CONFIDENCE || 0.72) &&
    (!requestedGenerated || priorityConfidence >= 0.82);
  const remoteWorkConfidence = Number(output.remoteWorkConfidence || 0);
  const remoteStateChanged =
    (Boolean(output.remoteStateChanged) || priorityOnly) &&
    Boolean(output.remoteWorkActive) !== currentRemoteWorkActive &&
    remoteWorkConfidence >=
      Number(process.env.OPS_REMOTE_MIN_CONFIDENCE || 0.72);
  const remoteWorkActive = remoteStateChanged
    ? Boolean(output.remoteWorkActive)
    : currentRemoteWorkActive;
  const requestedWorkMode = clean(output.workMode, 40).toLowerCase();
  const workMode = remoteStateChanged
    ? ["remote", "in_person", "mixed", "unspecified"].includes(
        requestedWorkMode
      )
      ? requestedWorkMode
      : remoteWorkActive
      ? "remote"
      : "unspecified"
    : currentWorkMode;

  return {
    changed: assignmentChanged,
    assignees,
    summary: clean(
      output.summary ||
        (assignees.length
          ? `Currently assigned to ${assignees.map((entry) => entry.name).join(", ")}.`
          : "Currently unassigned."),
      700
    ),
    reason: clean(
      output.reason ||
        (assignmentChanged
          ? "The latest Slack message explicitly changed who is responsible."
          : "The latest Slack message did not clearly change responsibility."),
      700
    ),
    confidence: Number(output.confidence || 0),
    priorityChanged,
    priorityTier: priorityChanged ? requestedTier : currentPriorityTier,
    priorityLabel: priorityChanged ? requestedLabel : currentPriorityLabel,
    priorityGenerated: priorityChanged
      ? requestedGenerated
      : currentPriorityGenerated,
    priorityOrder: priorityChanged ? requestedOrder : currentPriorityOrder,
    priorityReason: clean(
      output.priorityReason ||
        (priorityChanged
          ? "The latest work-order evidence changed the operational category."
          : "The latest evidence did not justify a category change."),
      700
    ),
    priorityContext: clean(
      output.priorityContext || workOrder.priorityContext || output.priorityReason,
      900
    ),
    priorityConfidence,
    workMode,
    remoteWorkActive,
    remoteStateChanged,
    remoteWorkReason: clean(
      output.remoteWorkReason ||
        (remoteWorkActive
          ? "The conversation indicates active remote work."
          : "The latest message does not establish active remote work."),
      700
    ),
    remoteWorkConfidence,
    memoryIds: (Array.isArray(companyMemory) ? companyMemory : [])
      .map((memory) => clean(memory.id, 180))
      .filter(Boolean)
      .slice(0, 5),
    usage: {
      inputTokens: Number(response?.usage?.input_tokens || 0),
      outputTokens: Number(response?.usage?.output_tokens || 0),
    },
  };
}
