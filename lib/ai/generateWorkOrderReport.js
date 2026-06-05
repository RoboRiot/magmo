import { OpenAI } from "openai";

function extractResponseText(response) {
  if (response?.output_text) return response.output_text.trim();
  const parts = [];
  for (const output of response?.output || []) {
    for (const content of output?.content || []) {
      if (content?.text) parts.push(content.text);
      if (content?.type === "output_text" && content?.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function transcriptFromMessages(messages) {
  return (messages || [])
    .map((message, index) => {
      const text = String(message.text || "").replace(/\s+/g, " ").trim();
      return `${index + 1}. ${message.user}: ${text}`;
    })
    .join("\n");
}

export async function generateWorkOrderReport({ conversation }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: Number(process.env.SERVICE_REPORT_OPENAI_TIMEOUT_MS || 60000),
  });
  const model =
    process.env.OPENAI_SERVICE_REPORT_MODEL ||
    process.env.ASK_MAGMO_MODEL ||
    "gpt-5.5";
  const workOrder = conversation.workOrder || {};
  const transcript = transcriptFromMessages(conversation.messages).slice(0, 18000);

  const response = await client.responses.create({
    model,
    store: false,
    input: [
      {
        role: "system",
        content:
          "You write concise, professional field service reports for Advanced Imaging Solutions. " +
          "Use only the Slack conversation and work-order metadata provided. Do not invent parts, serial numbers, test results, times, or root causes. " +
          "If a detail is missing, omit it or state that it was not specified. " +
          "Return clean Slack-ready Markdown with sections for Service Report, Work Performed, Findings, Resolution/Status, Parts/Materials, and Follow-Up.",
      },
      {
        role: "user",
        content:
          `Work order ID: ${workOrder.work_order_id || "unknown"}\n` +
          `Work order number: ${workOrder.number || "unknown"}\n` +
          `Subject: ${workOrder.subject || "unknown"}\n` +
          `BlueFolder URL: ${workOrder.bluefolder_url || ""}\n` +
          `Slack permalink: ${workOrder.slack_permalink || ""}\n\n` +
          `Slack conversation transcript:\n${transcript || "(No conversation text found.)"}`,
      },
    ],
    max_output_tokens: Number(process.env.OPENAI_SERVICE_REPORT_MAX_TOKENS || 1200),
    ...(String(model).startsWith("gpt-5")
      ? {
          reasoning: {
            effort: process.env.OPENAI_SERVICE_REPORT_REASONING_EFFORT || "low",
          },
          text: {
            verbosity: process.env.OPENAI_SERVICE_REPORT_VERBOSITY || "medium",
          },
        }
      : {}),
  });

  const text = extractResponseText(response);
  if (!text) throw new Error("OpenAI returned no service report text.");
  return text;
}
