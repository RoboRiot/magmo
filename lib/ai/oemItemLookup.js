import { createHash } from "crypto";

const OEM_LOOKUP_CACHE_COLLECTION = "ItemOemLookupCache";
const OEM_LOOKUP_CACHE_DAYS = Number(
  process.env.ITEM_OEM_LOOKUP_CACHE_DAYS || 30
);
const OEM_WEB_MODEL =
  process.env.ITEM_OEM_WEB_MODEL ||
  process.env.ITEM_VISION_MODEL ||
  process.env.ASK_MAGMO_MODEL ||
  "gpt-5.5";

const OEM_DOMAIN_RULES = [
  {
    domain: "gehealthcare.com",
    aliases: ["ge", "ge healthcare", "gehealthcare", "general electric", "gehc"],
  },
  {
    domain: "siemens-healthineers.com",
    aliases: ["siemens", "siemens healthineers", "siemens healthcare"],
  },
  {
    domain: "philips.com",
    aliases: ["philips", "philips healthcare", "philips medical"],
  },
  {
    domain: "medical.canon",
    aliases: [
      "canon",
      "canon medical",
      "canon medical systems",
      "toshiba",
      "toshiba medical",
      "toshiba medical systems",
    ],
  },
  {
    domain: "fujifilm.com",
    aliases: [
      "fujifilm",
      "fujifilm healthcare",
      "hitachi",
      "hitachi healthcare",
      "hitachi medical",
    ],
  },
  { domain: "varian.com", aliases: ["varian", "varian medical systems"] },
  { domain: "hologic.com", aliases: ["hologic"] },
  { domain: "carestream.com", aliases: ["carestream", "carestream health"] },
  { domain: "agfa.com", aliases: ["agfa", "agfa healthcare"] },
  { domain: "shimadzu.com", aliases: ["shimadzu"] },
  { domain: "ziehm.com", aliases: ["ziehm", "ziehm imaging"] },
  { domain: "bayer.com", aliases: ["bayer", "medrad", "bayer medrad"] },
  { domain: "elekta.com", aliases: ["elekta"] },
  { domain: "accuray.com", aliases: ["accuray"] },
  {
    domain: "samsunghealthcare.com",
    aliases: ["samsung", "samsung healthcare", "samsung medison"],
  },
  { domain: "mindray.com", aliases: ["mindray"] },
];

const OEM_LOOKUP_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    found: { type: "boolean" },
    confidence: { type: "number" },
    oem: { type: "string" },
    productName: { type: "string" },
    officialPartNumbers: { type: "array", items: { type: "string" } },
    models: { type: "array", items: { type: "string" } },
    modality: { type: "string" },
    summary: { type: "string" },
    evidence: { type: "array", items: { type: "string" } },
  },
  required: [
    "found",
    "confidence",
    "oem",
    "productName",
    "officialPartNumbers",
    "models",
    "modality",
    "summary",
    "evidence",
  ],
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function uniqueStrings(values, limit = 20) {
  const seen = new Set();
  const result = [];
  (values || []).forEach((value) => {
    const text = String(value || "").trim();
    const key = normalizeText(text);
    if (!text || !key || seen.has(key) || result.length >= limit) return;
    seen.add(key);
    result.push(text);
  });
  return result;
}

export function resolveOfficialOemDomains(values = []) {
  const normalizedValues = uniqueStrings(values).map(normalizeText);
  const domains = [];
  OEM_DOMAIN_RULES.forEach((rule) => {
    const matches = normalizedValues.some((value) =>
      rule.aliases.some((alias) => {
        const normalizedAlias = normalizeText(alias);
        return (
          value === normalizedAlias ||
          ` ${value} `.includes(` ${normalizedAlias} `)
        );
      })
    );
    if (matches) domains.push(rule.domain);
  });
  return uniqueStrings(domains, 5);
}

function extractResponseText(response) {
  if (response?.output_text) return response.output_text.trim();
  const parts = [];
  for (const output of response?.output || []) {
    for (const content of output?.content || []) {
      if (content?.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseResponse(response) {
  const text = extractResponseText(response);
  if (!text) throw new Error("The OEM website search returned no result.");
  try {
    return JSON.parse(text);
  } catch (error) {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    return JSON.parse(cleaned);
  }
}

function isAllowedSource(url, domains) {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    return domains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch (error) {
    return false;
  }
}

function extractSources(response, domains) {
  const seen = new Set();
  const sources = [];
  const addSource = (source) => {
    const url = String(source?.url || source?.uri || "").trim();
    if (!url || seen.has(url) || !isAllowedSource(url, domains)) return;
    seen.add(url);
    sources.push({
      url,
      title: String(source?.title || "Official manufacturer source").trim(),
    });
  };

  for (const output of response?.output || []) {
    if (Array.isArray(output?.action?.sources)) {
      output.action.sources.forEach(addSource);
    }
    for (const content of output?.content || []) {
      for (const annotation of content?.annotations || []) {
        if (annotation?.type === "url_citation") addSource(annotation);
      }
    }
  }
  return sources.slice(0, 6);
}

function buildLookupInput({ hints, observation }) {
  return {
    selectedOem: uniqueStrings(hints?.oem, 5),
    selectedModality: uniqueStrings(hints?.modality, 5),
    selectedModel: uniqueStrings(hints?.model, 5),
    observedPartNumbers: uniqueStrings(observation?.partNumbers, 8),
    observedManufacturers: uniqueStrings(
      [observation?.oem, ...(observation?.manufacturerNames || [])],
      8
    ),
    observedModels: uniqueStrings(
      [observation?.model, ...(observation?.modelNumbers || [])],
      8
    ),
    observedItemName: String(
      observation?.itemNameGuess || observation?.itemType || ""
    ).trim(),
  };
}

function buildCacheKey(domains, input) {
  const normalized = JSON.stringify({
    domains: [...domains].sort(),
    selectedOem: input.selectedOem.map(normalizeText).sort(),
    selectedModality: input.selectedModality.map(normalizeText).sort(),
    selectedModel: input.selectedModel.map(normalizeText).sort(),
    observedPartNumbers: input.observedPartNumbers.map(normalizeText).sort(),
    observedModels: input.observedModels.map(normalizeText).sort(),
  });
  return createHash("sha256").update(normalized).digest("hex");
}

function publicCacheResult(data, cached) {
  if (!data || typeof data !== "object") return null;
  return {
    found: Boolean(data.found),
    confidence: Math.max(0, Math.min(1, Number(data.confidence) || 0)),
    oem: String(data.oem || "").trim(),
    productName: String(data.productName || "").trim(),
    officialPartNumbers: uniqueStrings(data.officialPartNumbers, 12),
    models: uniqueStrings(data.models, 12),
    modality: String(data.modality || "").trim(),
    summary: String(data.summary || "").trim().slice(0, 700),
    evidence: uniqueStrings(data.evidence, 6).map((value) => value.slice(0, 300)),
    sources: (Array.isArray(data.sources) ? data.sources : [])
      .map((source) => ({
        url: String(source?.url || "").trim(),
        title: String(source?.title || "Official manufacturer source").trim(),
      }))
      .filter((source) => source.url)
      .slice(0, 6),
    domains: uniqueStrings(data.domains, 5),
    cached: Boolean(cached),
  };
}

function getModelControls() {
  if (!/^gpt-5/i.test(String(OEM_WEB_MODEL))) return {};
  return {
    reasoning: {
      effort: process.env.ITEM_OEM_WEB_REASONING_EFFORT || "low",
    },
  };
}

export async function lookupOfficialOemItem({
  client,
  db,
  hints,
  observation,
  domains,
}) {
  if (!client || !db || !domains?.length) return null;
  const input = buildLookupInput({ hints, observation });
  const cacheKey = buildCacheKey(domains, input);
  const cacheRef = db.collection(OEM_LOOKUP_CACHE_COLLECTION).doc(cacheKey);
  const cacheDoc = await cacheRef.get();
  const cachedData = cacheDoc.exists ? cacheDoc.data() : null;
  const expiresAtMs = Date.parse(cachedData?.expiresAt || "");
  if (cachedData && Number.isFinite(expiresAtMs) && expiresAtMs > Date.now()) {
    return publicCacheResult(cachedData, true);
  }

  const response = await client.responses.create({
    model: OEM_WEB_MODEL,
    store: false,
    tools: [
      {
        type: "web_search",
        search_context_size: "low",
        filters: { allowed_domains: domains },
        user_location: {
          type: "approximate",
          country: "US",
          timezone: "America/Los_Angeles",
        },
      },
    ],
    tool_choice: "auto",
    include: ["web_search_call.action.sources"],
    input: [
      {
        role: "system",
        content:
          "You verify medical-imaging parts using only the official manufacturer domains allowed by the web search tool. " +
          "Search for the supplied part numbers and model identifiers. Prefer official product pages, catalogs, manuals, and parts PDFs. " +
          "Do not treat distributor, reseller, marketplace, or inferred information as official confirmation. " +
          "If an identifier cannot be verified on an allowed official source, set found false or keep confidence low. " +
          "Never invent a part number. Keep the summary short and useful to a warehouse user.",
      },
      {
        role: "user",
        content:
          "Find official manufacturer evidence for this photographed item. " +
          "The selected fields are hints and may be incomplete. Return only facts supported by the official search results.\n\n" +
          JSON.stringify(input),
      },
    ],
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "official_oem_item_lookup",
        strict: true,
        schema: OEM_LOOKUP_SCHEMA,
      },
    },
    max_output_tokens: Number(process.env.ITEM_OEM_WEB_TOKENS || 1000),
    ...getModelControls(),
  });

  const parsed = parseResponse(response);
  const sources = extractSources(response, domains);
  const result = publicCacheResult(
    { ...parsed, sources, domains },
    false
  );
  const now = Date.now();
  try {
    await cacheRef.set({
      ...result,
      query: input,
      model: OEM_WEB_MODEL,
      createdAt: new Date(now).toISOString(),
      expiresAt: new Date(
        now + Math.max(1, OEM_LOOKUP_CACHE_DAYS) * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  } catch (error) {
    console.warn("[ItemVision][oem-cache-write]", {
      reason: error?.message,
    });
  }
  return result;
}
