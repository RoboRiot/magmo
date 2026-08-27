import { OpenAI } from "openai";
const {
  dateFromSlackTs,
  hasTrailerMovementSignal,
} = require("../ops/trailerMonitorContract.cjs");

function clean(value, maxLength = 1000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function responseText(response) {
  if (response?.output_text) return response.output_text;
  for (const item of response?.output || []) {
    for (const content of item?.content || []) {
      if (content?.text) return content.text;
    }
  }
  throw new Error("The trailer movement review returned no structured output.");
}

function tokenSet(value) {
  return new Set(
    clean(value, 24000)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 3)
  );
}

function scoreClient(client, evidenceTokens) {
  const clientTokens = tokenSet(
    [client.name, client.location, ...(client.aliases || [])].join(" ")
  );
  let score = 0;
  clientTokens.forEach((token) => {
    if (evidenceTokens.has(token)) score += token.length >= 7 ? 3 : 1;
  });
  return score;
}

function candidateClients(trailer, clients, evidence) {
  const requiredIds = new Set(
    [
      trailer.currentClientId,
      trailer.nextClientId,
      trailer.transit?.fromClientId,
      trailer.transit?.toClientId,
    ].filter(Boolean)
  );
  const evidenceTokens = tokenSet(evidence);
  return clients
    .map((client) => ({
      ...client,
      score: requiredIds.has(client.id) ? 1000 : scoreClient(client, evidenceTokens),
    }))
    .filter((client) => client.score > 0)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name))
    .slice(0, 45)
    .map(({ score, ...client }) => client);
}

function buildEvidence(messages = [], maxLength = 24000, perMessage = 1400) {
  const sorted = [...messages].sort(
    (left, right) => Number(left?.ts || 0) - Number(right?.ts || 0)
  );
  const prioritized = [
    ...sorted.filter((message) => hasTrailerMovementSignal(message?.text)),
    ...sorted.slice(-22).reverse(),
    ...sorted.slice(0, 6),
  ];
  const seen = new Set();
  const lines = [];
  let length = 0;
  for (const message of prioritized) {
    const key = `${message?.channelId || ""}:${message?.ts || ""}`;
    if (!message?.ts || seen.has(key)) continue;
    seen.add(key);
    const line = clean(message.formattedText, perMessage);
    if (!line) continue;
    if (length + line.length + 1 > maxLength) continue;
    lines.push(line);
    length += line.length + 1;
  }
  return lines.join("\n");
}

function arrivalCorroboration(trailer, channel, messages, linkedMessages) {
  const currentlyInTransit = ["transit", "in_transit", "departed"].includes(
    clean(trailer?.transitStatus, 40).toLowerCase()
  );
  const departureDate = clean(
    trailer?.transit?.departureDate || trailer?.currentDepartureDate,
    20
  );
  const destination = clean(
    [
      trailer?.nextClientName,
      trailer?.nextClientLocation,
      trailer?.transit?.toClientName,
      trailer?.transit?.toClientLocation,
    ].join(" "),
    800
  );
  const destinationTokens = [...tokenSet(destination)].filter(
    (token) => !["unknown", "client", "location", "imaging"].includes(token)
  );
  const allMessages = [...messages, ...linkedMessages];
  const postDepartureMessages = allMessages.filter((message) => {
    const date = dateFromSlackTs(message?.ts);
    return !departureDate || (date && date >= departureDate);
  });
  const corroboratingText = clean(
    `${channel?.name || ""} ${postDepartureMessages
      .map((message) => message?.text || "")
      .join(" ")}`,
    50000
  ).toLowerCase();
  const matchedDestinationTokens = destinationTokens.filter((token) =>
    corroboratingText.includes(token)
  );
  const physicalPattern =
    /\b(?:set ?up|equipment room|injector|coil|clean(?:ing|ed)?|battery charger|plug(?:ged|ging)? in|network|cradlepoint|system testing|troubleshoot(?:ing|ed)?)\b/i;
  const physicalActivityMessages = postDepartureMessages.filter((message) =>
    physicalPattern.test(message?.text || "")
  );
  const contradictionPattern =
    /\b(?:trailer (?:did not|didn't|never) arrive|trailer remains? at (?:the )?origin|trailer returned|trailer move (?:was )?cancelled|trailer pickup (?:was )?cancelled)\b/i;
  const hasExplicitContradiction = postDepartureMessages.some((message) =>
    contradictionPattern.test(message?.text || "")
  );
  const strongestPhysicalMessage = [...physicalActivityMessages].sort(
    (left, right) => Number(right?.ts || 0) - Number(left?.ts || 0)
  )[0];
  return {
    qualifiesAsArrivalEvidence:
      currentlyInTransit &&
      matchedDestinationTokens.length >= Math.min(2, destinationTokens.length) &&
      destinationTokens.length > 0 &&
      physicalActivityMessages.length >= 2 &&
      !hasExplicitContradiction,
    currentlyInTransit,
    recordedDepartureDate: departureDate,
    existingDestination: destination,
    matchedDestinationTokens,
    destinationTokenCount: destinationTokens.length,
    postDepartureMessageCount: postDepartureMessages.length,
    destinationSpecificPhysicalActivityCount: physicalActivityMessages.length,
    hasExplicitContradiction,
    evidenceSlackTs: clean(strongestPhysicalMessage?.ts, 80),
    evidenceText: clean(strongestPhysicalMessage?.text, 500),
  };
}

export async function inferTrailerMovement({
  trailer,
  clients = [],
  channel = {},
  messages = [],
  linkedMessages = [],
}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const directEvidence = buildEvidence(messages, 26000, 1400);
  const workOrderEvidence = buildEvidence(linkedMessages, 18000, 1200);
  const relevantClients = candidateClients(
    trailer,
    clients,
    `${channel.name || ""}\n${directEvidence}\n${workOrderEvidence}`
  );
  const corroboration = arrivalCorroboration(
    trailer,
    channel,
    messages,
    linkedMessages
  );
  const response = await openai.responses.create({
    model: process.env.TRAILER_MONITOR_MODEL || "gpt-5-mini",
    store: false,
    input: [
      {
        role: "system",
        content:
          "You are the trailer movement auditor inside Magmo for Advanced Imaging Solutions. " +
          "Review one trailer's dedicated Slack channel and any work-order threads linked from it. " +
          "Return a movement only when the messages confirm that the physical movement actually happened. " +
          "Plans, ETAs, schedules, questions, future-tense statements, and a destination appearing only in a channel name are not proof. " +
          "A channel rename may support other evidence but cannot prove arrival by itself. An explicit arrived/onsite statement can confirm arrival. When Magmo already says the trailer is in transit, a scheduled delivery followed after departure by destination-specific activity that could only occur with the trailer physically present also confirms arrival—for example a technician setting up or troubleshooting that trailer, cleaning its coil, working on its injector or network in the site's equipment room, or recording that destination's connection details. The dedicated channel identity establishes which trailer is being discussed. Do not reject such corroborated physical evidence merely because nobody typed the literal word 'arrived'. " +
          "A linked work order is supporting evidence only when its thread clearly refers to this exact trailer. " +
          "Never create a client, guess a client ID, or choose a destination outside the supplied client list. If Magmo already has a typed in-transit destination with no client ID, you may confirm arrival there by leaving toClientId empty and copying that existing nextClientName and nextClientLocation exactly; this preserves the site text without creating a client. " +
          "Prefer Magmo's existing in-transit destination for an arrival. Do not report a change already reflected in Magmo. " +
          "Use the local calendar date of the strongest confirming Slack message unless an explicit actual movement date is stated. " +
          "For departed/in_transit, require evidence the pickup or departure occurred, not merely that it is expected. " +
          "For arrived, require evidence the trailer reached the destination. The supplied arrival-corroboration object is a deterministic summary of visible facts: when qualifiesAsArrivalEvidence is true, treat the arrival as confirmed unless a newer message specifically says the trailer itself did not arrive or returned elsewhere. A cancelled parts shipment is not a cancelled trailer movement. Use moved only when the conversation confirms an already-completed relocation without a separate transit phase. " +
          "Evidence must briefly quote or paraphrase the observable Slack facts; do not reveal hidden reasoning.",
      },
      {
        role: "user",
        content:
          `Trailer channel: #${clean(channel.name, 180)} (${clean(channel.id, 80)})\n` +
          `Trailer in Magmo: ${JSON.stringify(trailer)}\n` +
          `Allowed existing clients: ${JSON.stringify(relevantClients)}\n` +
          `Arrival corroboration: ${JSON.stringify(corroboration)}\n` +
          `Dedicated trailer-channel evidence:\n${directEvidence || "No new direct messages."}\n` +
          `New evidence from linked work-order threads:\n${workOrderEvidence || "No new linked-thread messages."}`,
      },
    ],
    max_output_tokens: Math.max(
      1200,
      Number(process.env.TRAILER_MONITOR_MAX_OUTPUT_TOKENS || 1800)
    ),
    reasoning: {
      effort: process.env.TRAILER_MONITOR_REASONING_EFFORT || "low",
    },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "trailer_movement_review",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            hasConfirmedMovement: { type: "boolean" },
            movementType: {
              type: "string",
              enum: ["departed", "in_transit", "moved", "arrived", "none"],
            },
            fromClientId: { type: "string" },
            toClientId: { type: "string" },
            toClientName: { type: "string" },
            toClientLocation: { type: "string" },
            departureDate: { type: "string" },
            arrivalDate: { type: "string" },
            evidenceSlackTs: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            evidence: { type: "string" },
            noChangeReason: { type: "string" },
          },
          required: [
            "hasConfirmedMovement",
            "movementType",
            "fromClientId",
            "toClientId",
            "toClientName",
            "toClientLocation",
            "departureDate",
            "arrivalDate",
            "evidenceSlackTs",
            "confidence",
            "evidence",
            "noChangeReason",
          ],
        },
      },
    },
  });
  const output = JSON.parse(responseText(response));
  const corroboratedArrival =
    corroboration.qualifiesAsArrivalEvidence && !output.hasConfirmedMovement;
  const allowedClientIds = new Set(relevantClients.map((client) => client.id));
  const evidenceTsValues = new Set(
    [...messages, ...linkedMessages].map((message) => clean(message.ts, 80))
  );
  const confidence = corroboratedArrival
    ? Math.max(0.9, Math.min(1, Number(output.confidence || 0)))
    : Math.max(0, Math.min(1, Number(output.confidence || 0)));
  const threshold = Math.max(
    0.85,
    Math.min(1, Number(process.env.TRAILER_MONITOR_MIN_CONFIDENCE || 0.9))
  );
  const movementType = corroboratedArrival
    ? "arrived"
    : clean(output.movementType, 40).toLowerCase();
  const toClientId = corroboratedArrival
    ? clean(trailer.nextClientId || trailer.transit?.toClientId, 180)
    : clean(output.toClientId, 180);
  const toClientName = corroboratedArrival
    ? clean(trailer.nextClientName || trailer.transit?.toClientName, 180)
    : clean(output.toClientName, 180);
  const toClientLocation = corroboratedArrival
    ? clean(
        trailer.nextClientLocation || trailer.transit?.toClientLocation,
        300
      )
    : clean(output.toClientLocation, 300);
  const evidenceSlackTs = corroboratedArrival
    ? corroboration.evidenceSlackTs
    : clean(output.evidenceSlackTs, 80);
  const movementEvidence = corroboratedArrival
    ? clean(
        `Post-departure destination-specific trailer activity: ${corroboration.evidenceText}`,
        700
      )
    : clean(output.evidence, 700);
  const currentlyInTransit = ["transit", "in_transit", "departed"].includes(
    clean(trailer.transitStatus, 40).toLowerCase()
  );
  const alreadyAtDestination =
    trailer.currentClientId && trailer.currentClientId === toClientId;
  const expectedTypedDestination = clean(
    trailer.nextClientName || trailer.transit?.toClientName,
    180
  );
  const exactTypedDestination =
    currentlyInTransit &&
    !toClientId &&
    Boolean(expectedTypedDestination) &&
    toClientName.toLowerCase() === expectedTypedDestination.toLowerCase();
  const destinationAllowed = allowedClientIds.has(toClientId) || exactTypedDestination;
  const accepted =
    (Boolean(output.hasConfirmedMovement) || corroboratedArrival) &&
    ["departed", "in_transit", "moved", "arrived"].includes(movementType) &&
    destinationAllowed &&
    evidenceTsValues.has(evidenceSlackTs) &&
    confidence >= threshold &&
    movementEvidence.length > 0 &&
    !(
      ["arrived", "moved"].includes(movementType) &&
      alreadyAtDestination &&
      !currentlyInTransit
    );
  return {
    accepted,
    update: accepted
      ? {
          trailerId: trailer.id,
          movementType,
          fromClientId: clean(output.fromClientId, 180),
          toClientId,
          toClientName: exactTypedDestination ? expectedTypedDestination : toClientName,
          toClientLocation: exactTypedDestination
            ? clean(
                trailer.nextClientLocation || trailer.transit?.toClientLocation,
                300
              )
            : toClientLocation,
          departureDate: clean(output.departureDate, 20),
          arrivalDate: clean(output.arrivalDate, 20),
          confidence,
          evidence: movementEvidence,
        }
      : null,
    evidenceSlackTs,
    summary: accepted
      ? movementEvidence
      : clean(output.noChangeReason || "No confirmed movement was found.", 700),
    confidence,
    usage: {
      inputTokens: Number(response?.usage?.input_tokens || 0),
      outputTokens: Number(response?.usage?.output_tokens || 0),
    },
  };
}
