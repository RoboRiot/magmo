import { OpenAI } from "openai";
import {
  inferPartMovementsFromMessages,
  simplifyOpsPartName,
} from "../ops/parts";
const {
  applyOpsCommandReportScope,
  messagesAfterOpsUpdate,
  normalizeOpsCommandReportType,
} = require("../ops/commandReportContract.cjs");

const PART_MOVEMENTS = [
  "ordered",
  "incoming",
  "received",
  "to_site",
  "installed",
  "removed",
  "outgoing",
  "returned",
  "unknown",
];

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

function transcriptFromMessages(messages) {
  return (messages || [])
    .filter((message, index) => index === 0 || !message.botMessage)
    .slice(-200)
    .map(
      (message, index) =>
        `${index + 1}. ${clean(message.sender?.name || "Slack", 100)}: ${clean(
          message.text,
          1200
        )}`
    )
    .join("\n")
    .slice(-30000);
}

function normalizeReport(output, response, reportType) {
  const partsState = clean(output?.partsState, 40).toLowerCase();
  const normalized = {
    slackReport: String(output?.slackReport || "").trim().slice(0, 3000),
    opsHeadline: clean(output?.opsHeadline, 220),
    opsStatusLine: clean(output?.opsStatusLine, 300),
    opsSummary: clean(output?.opsSummary, 900),
    partSummary: clean(output?.partSummary, 700),
    partsState: ["none", "open", "returned", "unknown"].includes(partsState)
      ? partsState
      : "unknown",
    partMovements: (Array.isArray(output?.partMovements)
      ? output.partMovements
      : []
    )
      .map((movement) => ({
        partName: simplifyOpsPartName(movement?.partName),
        movement: PART_MOVEMENTS.includes(clean(movement?.movement, 40))
          ? clean(movement?.movement, 40)
          : "unknown",
        status: clean(movement?.status, 180),
      }))
      .filter(
        (movement) =>
          movement.partName &&
          !/^(?:Rec[A-Za-z0-9]+|[CFDTUW][A-Z0-9]{7,})$/i.test(
            movement.partName
          )
      )
      .slice(0, 8),
    partsOutstanding: (Array.isArray(output?.partsOutstanding)
      ? output.partsOutstanding
      : []
    )
      .map((item) => clean(item, 180))
      .filter(Boolean)
      .slice(0, 8),
    companyLessons: Array.isArray(output?.companyLessons)
      ? output.companyLessons.slice(0, 3)
      : [],
    usage: {
      inputTokens: Number(response?.usage?.input_tokens || 0),
      outputTokens: Number(response?.usage?.output_tokens || 0),
    },
  };
  return applyOpsCommandReportScope(normalized, reportType);
}

export async function generateOpsCommandReport({
  workOrder,
  messages,
  reportType,
}) {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const normalizedType = normalizeOpsCommandReportType(reportType);
  const previousUpdate = Array.isArray(workOrder?.opsUpdates)
    ? workOrder.opsUpdates[workOrder.opsUpdates.length - 1]
    : null;
  const reportMessages = messagesAfterOpsUpdate(
    messages,
    previousUpdate,
    normalizedType
  );
  const transcript =
    transcriptFromMessages(reportMessages) ||
    (normalizedType !== "parts" && previousUpdate?.summary
      ? "No Slack messages were added after the previous Ops summary."
      : "");
  if (!transcript) {
    throw new Error("No Slack conversation was available to summarize.");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: Number(process.env.OPS_OPENAI_TIMEOUT_MS || 45000),
  });
  const scope =
    normalizedType === "final"
      ? "Write the final closeout. Done confirms service is complete and service parts were returned, or no return was required."
      : normalizedType === "service_complete"
        ? "Write the service-completion report. Service work is complete, but the work order remains open for parts return and final closeout."
        : "Report only physical part movement: ordered, shipped, received, taken to site, installed, removed, sent back, or returned. Omit unrelated service detail.";
  const currentOwners = (workOrder?.assignees || [])
    .map((entry) => clean(entry?.name, 100))
    .filter(Boolean)
    .join(", ");

  const response = await client.responses.create({
    model:
      process.env.OPENAI_SERVICE_REPORT_MODEL ||
      process.env.OPS_SUMMARY_MODEL ||
      "gpt-5-nano",
    store: false,
    input: [
      {
        role: "system",
        content:
          "You are the reporting side of Magmo Ops for Advanced Imaging Solutions. Convert a field-service Slack thread into a concise report that operations and finance can understand immediately. Treat the Slack conversation as the strongest evidence. Never invent work, results, costs, dates, people, part movements, or return status. Use resolved human names and recognizable simplified part names. Never print raw Slack user IDs, Slack List record IDs, internal database field names, or purchase-order sourcing details as a part name. Remove repetition, chatter, and deep technical detail. A Slack closeout must be one message with a short bold title and at most three compact bullets. The Ops summary must be one plain-language paragraph of 2 to 4 compact sentences and no more than 95 words. Use enough supported detail to state the issue, meaningful work completed, present operating condition or business impact, and any important unresolved blocker; omit generic next steps from a final closeout. When a previous Ops summary is supplied, it is already recorded: report only newer material and the requested command's state change, without retelling prior facts. If no newer Slack message exists, summarize only that state change. The parts summary must be one paragraph of no more than 55 words. Do not repeat the same facts in multiple sections. For parts-only reports, do not infer installation or return unless the conversation says so. For final closeout, Done is evidence that return obligations are complete or not applicable. Give concise conclusions, not private reasoning, and never output phrases such as no new messages.",
      },
      {
        role: "user",
        content:
          `Work order: #${clean(workOrder?.number, 100)} ${clean(
            workOrder?.subject,
            400
          )}\n` +
          `Customer: ${clean(workOrder?.customer, 220)}\n` +
          `Description: ${clean(workOrder?.description, 1200)}\n` +
          `Current owners: ${currentOwners || "Unassigned"}\n` +
          `Previous Ops summary: ${
            previousUpdate?.summary
              ? clean(previousUpdate.summary, 1200)
              : "None"
          }\n` +
          `Task: ${scope}\n\nSlack conversation:\n${transcript}`,
      },
    ],
    max_output_tokens: Number(
      process.env.OPENAI_SERVICE_REPORT_MAX_TOKENS || 1600
    ),
    reasoning: {
      effort: process.env.OPENAI_SERVICE_REPORT_REASONING_EFFORT || "low",
    },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "magmo_service_report",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            slackReport: { type: "string" },
            opsHeadline: { type: "string" },
            opsStatusLine: { type: "string" },
            opsSummary: { type: "string" },
            partSummary: { type: "string" },
            partsState: {
              type: "string",
              enum: ["none", "open", "returned", "unknown"],
            },
            partMovements: {
              type: "array",
              maxItems: 8,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  partName: { type: "string" },
                  movement: { type: "string", enum: PART_MOVEMENTS },
                  status: { type: "string" },
                },
                required: ["partName", "movement", "status"],
              },
            },
            partsOutstanding: {
              type: "array",
              maxItems: 8,
              items: { type: "string" },
            },
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
          required: [
            "slackReport",
            "opsHeadline",
            "opsStatusLine",
            "opsSummary",
            "partSummary",
            "partsState",
            "partMovements",
            "partsOutstanding",
            "companyLessons",
          ],
        },
      },
    },
  });

  const responseText = extractResponseText(response);
  let output;
  try {
    output = JSON.parse(responseText);
  } catch (error) {
    if (normalizedType !== "parts") throw error;
    const deterministic = inferPartMovementsFromMessages(messages);
    const movementText = deterministic.movements.length
      ? deterministic.movements
          .map((entry) => `${entry.partName}: ${entry.status}`)
          .join(" ")
      : "No confirmed part movement was found in the Slack thread.";
    return normalizeReport(
      {
        slackReport: "",
        opsHeadline: "",
        opsStatusLine: "",
        opsSummary: "",
        partSummary: movementText,
        partsState: deterministic.state,
        partMovements: deterministic.movements,
        partsOutstanding: [],
        companyLessons: [],
      },
      response,
      normalizedType
    );
  }
  const report = normalizeReport(output, response, normalizedType);
  if (normalizedType === "parts") {
    const deterministic = inferPartMovementsFromMessages(messages);
    if (!report.partMovements.length && deterministic.movements.length) {
      report.partMovements = deterministic.movements;
      report.partsState = deterministic.state;
      const movementText = deterministic.movements
        .map((entry) => `${entry.partName}: ${entry.status}`)
        .join(" ");
      report.partSummary = clean(movementText, 700);
    }
  }
  if (
    ["service_complete", "final"].includes(normalizedType) &&
    (!report.slackReport || !report.opsSummary || !report.partSummary)
  ) {
    throw new Error(`OpenAI returned an incomplete ${normalizedType} report.`);
  }
  if (normalizedType === "parts" && !report.partSummary) {
    throw new Error("OpenAI returned an empty parts summary.");
  }
  return report;
}
