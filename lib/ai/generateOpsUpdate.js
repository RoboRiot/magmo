import { OpenAI } from "openai";

function clean(value, maxLength = 1200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
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

function normalizeLessons(value) {
  return (Array.isArray(value) ? value : [])
    .map((lesson) => ({
      kind: clean(lesson?.kind, 60),
      summary: clean(lesson?.summary, 600),
      keywords: (Array.isArray(lesson?.keywords) ? lesson.keywords : [])
        .map((keyword) => clean(keyword, 80))
        .filter(Boolean)
        .slice(0, 12),
      assigneeNames: (Array.isArray(lesson?.assigneeNames)
        ? lesson.assigneeNames
        : []
      )
        .map((name) => clean(name, 100))
        .filter(Boolean)
        .slice(0, 8),
      priorityTier:
        lesson?.priorityTier === "none" ? "" : clean(lesson?.priorityTier, 40),
      confidence: Math.max(0, Math.min(1, Number(lesson?.confidence || 0))),
    }))
    .filter((lesson) => lesson.summary)
    .slice(0, 3);
}

export async function generateOpsUpdate({ workOrder, previousUpdate, messages }) {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

  const workflowLabel =
    {
      unassigned: "Unassigned",
      active: "Active",
      in_progress: "Active",
      service_complete: "Service complete",
      done: "Done",
      completed: "Done",
    }[workOrder.workflowStatus] || "Unassigned";
  const isCompleted = ["done", "completed"].includes(
    workOrder.workflowStatus
  );

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: Number(process.env.OPS_OPENAI_TIMEOUT_MS || 30000),
  });
  const transcript = (messages || [])
    .slice(-160)
    .map(
      (message) =>
        "[" +
        clean(message.slackTs, 40) +
        "] " +
        clean(message.sender?.name, 100) +
        ": " +
        clean(message.text, 900)
    )
    .join("\n")
    .slice(-30000);

  const response = await client.responses.create({
    model: process.env.OPS_SUMMARY_MODEL || "gpt-5-nano",
    store: false,
    input: [
      {
        role: "system",
        content:
          "Write a concise but useful work-order update for finance and operations. Treat the Slack conversation as candidate new material since the previous summary. Compare it to that summary and return hasMaterialUpdate=false when it adds no new status, action, blocker, responsibility, schedule, part movement, or outcome. When there is a material update, keep the headline, status line, and summary focused on only the new information. Write the summary as one plain-language paragraph of 2 to 4 compact sentences and no more than 95 words. When the evidence supports it, use enough detail to cover the material change clearly, but never pad a small update. State what changed or was completed, the present operating condition or business impact, and the most important next action, owner, schedule, or blocker when supported. Do not restate prior facts unless needed to make the change understandable. For completed work, write a final closeout summary in past tense and omit generic next steps. Avoid deep technical detail, filler, headings inside the paragraph, and phrases such as no new messages. Never invent costs, dates, commitments, or outcomes. Never expose internal field names or codes. " +
          "For completed work only, also extract at most three compact, reusable company-operating lessons. A lesson must be supported by the conversation and useful for understanding assignment, operational category, or workflow on a similar future order. Generalize away customer-specific facts and never evaluate employee performance. Return an empty companyLessons array when nothing is safely reusable.",
      },
      {
        role: "user",
        content:
          "Work order: #" +
          clean(workOrder.number, 100) +
          " " +
          clean(workOrder.subject, 400) +
          "\nStatus: " +
          workflowLabel +
          "\nCurrent category: " +
          clean(workOrder.priorityTier, 40) +
          "\nCurrent owners: " +
          ((workOrder.assignees || []).map((entry) => entry.name).join(", ") ||
            "Unassigned") +
          "\nPrevious summary: " +
          (previousUpdate ? clean(previousUpdate.summary, 1800) : "None") +
          "\nSlack conversation:\n" +
          (transcript || "No locally stored messages are available."),
      },
    ],
    max_output_tokens: Number(process.env.OPS_SUMMARY_MAX_OUTPUT_TOKENS || 600),
    reasoning: {
      effort: process.env.OPS_SUMMARY_REASONING_EFFORT || "minimal",
    },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "ops_work_order_update",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            hasMaterialUpdate: { type: "boolean" },
            headline: { type: "string" },
            statusLine: { type: "string" },
            summary: { type: "string" },
            companyLessons: {
              type: "array",
              maxItems: 3,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  kind: {
                    type: "string",
                    enum: [
                      "assignment_pattern",
                      "priority_pattern",
                      "workflow_pattern",
                    ],
                  },
                  summary: { type: "string" },
                  keywords: {
                    type: "array",
                    maxItems: 12,
                    items: { type: "string" },
                  },
                  assigneeNames: {
                    type: "array",
                    maxItems: 8,
                    items: { type: "string" },
                  },
                  priorityTier: {
                    type: "string",
                    enum: [
                      "hard_down",
                      "in_progress",
                      "needs_scheduled",
                      "anytime",
                      "none",
                    ],
                  },
                  confidence: { type: "number", minimum: 0, maximum: 1 },
                },
                required: [
                  "kind",
                  "summary",
                  "keywords",
                  "assigneeNames",
                  "priorityTier",
                  "confidence",
                ],
              },
            },
          },
          required: ["hasMaterialUpdate", "headline", "statusLine", "summary", "companyLessons"],
        },
      },
    },
  });

  const output = JSON.parse(extractResponseText(response));
  return {
    hasMaterialUpdate: Boolean(output.hasMaterialUpdate),
    headline: clean(output.headline, 220),
    statusLine: clean(output.statusLine, 300),
    summary: clean(output.summary, 1800),
    companyLessons: isCompleted ? normalizeLessons(output.companyLessons) : [],
    usage: {
      inputTokens: Number(response?.usage?.input_tokens || 0),
      outputTokens: Number(response?.usage?.output_tokens || 0),
    },
  };
}
