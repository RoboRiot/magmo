import { parseStringPromise } from "xml2js";

function envValue(value) {
  return String(value || "").replace(/\s+#.*$/, "").trim();
}

function envBool(name, defaultValue = false) {
  const raw = process.env[name];
  if (raw == null) return defaultValue;
  return ["1", "true", "yes", "y", "on"].includes(
    String(raw).trim().toLowerCase()
  );
}

function isPlaceholderSecret(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return true;
  return (
    normalized.startsWith("your_") ||
    normalized === "xoxb-your-bot-token" ||
    normalized === "u_julie,u_sean,u_wilson,u_alex"
  );
}

export function getBlueFolderSlackSettings() {
  const bluefolderApiToken = envValue(
    process.env.BLUEFOLDER_API_TOKEN || process.env.BLUEFOLDER_API_KEY
  );

  return {
    bluefolderBaseUrl: envValue(
      process.env.BLUEFOLDER_BASE_URL || "https://app.bluefolder.com/api/2.0"
    ).replace(/\/$/, ""),
    bluefolderApiToken,
    bluefolderWorkOrdersPath: envValue(
      process.env.BLUEFOLDER_WORK_ORDERS_PATH || "/workOrders/list.aspx"
    ),
    bluefolderWorkOrderDetailPath: envValue(
      process.env.BLUEFOLDER_WORK_ORDER_DETAIL_PATH ||
        "/serviceRequests/get.aspx?serviceRequestId={id}"
    ),
    bluefolderWorkOrderUrlTemplate: envValue(
      process.env.BLUEFOLDER_WORK_ORDER_URL_TEMPLATE ||
        "https://advancedimaging.bluefolder.com/service/sr.aspx?srid={id}"
    ),
    bluefolderLinkFieldLabel: envValue(
      process.env.BLUEFOLDER_LINK_FIELD_LABEL || "Link to Slack Thread"
    ),
    bluefolderTimeoutMs:
      Number(envValue(process.env.BLUEFOLDER_TIMEOUT || "30")) * 1000,

    slackBotToken: envValue(process.env.SLACK_BOT_TOKEN),
    slackChannelId: envValue(process.env.SLACK_CHANNEL_ID),
    slackChannelName: envValue(process.env.SLACK_CHANNEL_NAME || "dispatch")
      .replace(/^#/, "")
      .trim(),
    slackUserIds: envValue(process.env.SLACK_USER_IDS)
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
    slackMentionText: envValue(process.env.SLACK_MENTION_TEXT),
    requireClickableMentions: envBool("REQUIRE_CLICKABLE_MENTIONS", true),

    dryRun: envBool("DRY_RUN", false),
    baselineOnStartup: envBool("BASELINE_ON_STARTUP", true),
    enableBlueFolder: envBool("ENABLE_BLUEFOLDER", true),
    testSingleSlackSend: envBool("TEST_SINGLE_SLACK_SEND", false),
    testWorkOrderNumber: envValue(process.env.TEST_WORK_ORDER_NUMBER || "9769"),
    testWorkOrderSubject: envValue(
      process.env.TEST_WORK_ORDER_SUBJECT || "DUMMY TEST"
    ),
    testWorkOrderUrl: envValue(
      process.env.TEST_WORK_ORDER_URL ||
        "https://app.bluefolder.com/workOrder/9769"
    ),
  };
}

export function validateBlueFolderSlackSettings(settings, { slackOnly = false } = {}) {
  const missing = [];
  if (!slackOnly && !settings.bluefolderBaseUrl) {
    missing.push("BLUEFOLDER_BASE_URL");
  }
  if (!slackOnly && settings.enableBlueFolder && !settings.dryRun) {
    if (isPlaceholderSecret(settings.bluefolderApiToken)) {
      missing.push("BLUEFOLDER_API_TOKEN");
    }
  }
  if (!settings.dryRun || slackOnly || settings.testSingleSlackSend) {
    if (isPlaceholderSecret(settings.slackBotToken)) {
      missing.push("SLACK_BOT_TOKEN");
    }
    if (!settings.slackChannelId && !settings.slackChannelName) {
      missing.push("SLACK_CHANNEL_ID or SLACK_CHANNEL_NAME");
    }
    if (!settings.slackUserIds.length && !settings.slackMentionText) {
      missing.push("SLACK_USER_IDS or SLACK_MENTION_TEXT");
    }
  }
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function firstValue(value) {
  if (Array.isArray(value)) return firstValue(value[0]);
  if (value && typeof value === "object" && "_" in value) return value._;
  return value == null ? "" : String(value).trim();
}

function stripXmlAttrs(value) {
  if (!value || typeof value !== "object") return firstValue(value);
  const out = { ...(value.$ || {}) };
  if (value._ != null) out.text = firstValue(value._);
  Object.entries(value).forEach(([key, child]) => {
    if (key === "$" || key === "_") return;
    if (Array.isArray(child)) {
      out[key] = child.map(stripXmlAttrs);
    } else if (child && typeof child === "object") {
      out[key] = stripXmlAttrs(child);
    } else {
      out[key] = firstValue(child);
    }
  });
  return out;
}

function collectBlueFolderItems(node, items = []) {
  if (!node || typeof node !== "object") return items;

  for (const key of ["serviceRequest", "workOrder"]) {
    for (const entry of asArray(node[key])) {
      const normalized = stripXmlAttrs(entry);
      if (normalized && typeof normalized === "object") {
        if (normalized.workOrderId && !normalized.serviceRequestId) {
          normalized.serviceRequestId = normalized.workOrderId;
        }
        if (normalized.workOrderNo && !normalized.serviceRequestNo) {
          normalized.serviceRequestNo = normalized.workOrderNo;
        }
        items.push(normalized);
      }
    }
  }

  Object.entries(node).forEach(([key, value]) => {
    if (key === "$" || key === "_" || key === "serviceRequest" || key === "workOrder") {
      return;
    }
    asArray(value).forEach((child) => collectBlueFolderItems(child, items));
  });
  return items;
}

async function parsePayload(response, rawText) {
  const contentType = String(response.headers.get("content-type") || "").toLowerCase();
  const text = String(rawText || "").trim();
  if (!text) return {};

  if (contentType.includes("json")) {
    return JSON.parse(text);
  }

  try {
    return JSON.parse(text);
  } catch {
    // BlueFolder's classic API usually returns XML even for list endpoints.
  }

  try {
    const parsed = await parseStringPromise(text, {
      explicitArray: false,
      trim: true,
    });
    const root = parsed.response || parsed;
    const normalized = stripXmlAttrs(root);
    const payload =
      normalized && typeof normalized === "object" ? normalized : { value: normalized };
    const items = collectBlueFolderItems(root);
    if (items.length) payload.work_orders = items;
    return payload;
  } catch {
    return { raw: text };
  }
}

function payloadErrorMessage(payload) {
  if (!payload || typeof payload !== "object") return "";
  const status = String(payload.status || "").trim().toLowerCase();
  if (!status || status === "ok") return "";
  for (const key of ["error", "message", "details", "detail", "description"]) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value && typeof value === "object" && value.text) return String(value.text);
  }
  return `status=${status}`;
}

function payloadStatusOk(payload) {
  if (!payload || typeof payload !== "object") return true;
  const status = String(payload.status || "").trim().toLowerCase();
  return status ? status === "ok" : true;
}

function extractCollection(payload) {
  if (Array.isArray(payload)) return payload.filter((item) => item && typeof item === "object");
  if (!payload || typeof payload !== "object") return [];
  for (const key of ["work_orders", "items", "data", "results"]) {
    if (Array.isArray(payload[key])) {
      return payload[key].filter((item) => item && typeof item === "object");
    }
  }
  return [];
}

function safeGet(object, keys, defaultValue = "") {
  if (!object || typeof object !== "object") return defaultValue;
  for (const key of keys) {
    if (object[key] != null && object[key] !== "") return String(object[key]).trim();
  }
  const lowered = Object.fromEntries(
    Object.entries(object).map(([key, value]) => [String(key).toLowerCase(), value])
  );
  for (const key of keys) {
    const value = lowered[String(key).toLowerCase()];
    if (value != null && value !== "") return String(value).trim();
  }
  return defaultValue;
}

export function extractWorkOrderFields(item, settings) {
  const workOrderId = safeGet(item, [
    "id",
    "work_order_id",
    "uid",
    "workOrderId",
    "serviceRequestId",
    "serviceRequestID",
    "service_request_id",
    "workOrder",
  ]);
  const number = safeGet(item, [
    "number",
    "work_order_number",
    "display_id",
    "workOrderNo",
    "serviceRequestNumber",
    "serviceRequestNo",
    "serviceRequestNum",
    "service_request_number",
  ]);
  let subject = safeGet(item, [
    "subject",
    "name",
    "title",
    "summary",
    "problemDescription",
    "description",
    "equipment",
  ]);
  const createdAt = safeGet(item, [
    "created_at",
    "created",
    "date_created",
    "dateTimeCreated",
    "dateCreated",
    "dateAdded",
  ]);

  let appBase = settings.bluefolderBaseUrl.replace(/\/$/, "");
  for (const suffix of ["/api/2.0", "/api/2", "/api"]) {
    if (appBase.toLowerCase().endsWith(suffix)) {
      appBase = appBase.slice(0, -suffix.length);
      break;
    }
  }

  let fallbackLink = `${appBase}/workOrder/${workOrderId}`;
  try {
    fallbackLink = settings.bluefolderWorkOrderUrlTemplate
      .replaceAll("{id}", encodeURIComponent(workOrderId))
      .replaceAll("{number}", encodeURIComponent(number || workOrderId));
  } catch {
    // Keep the generic fallback if the env template is malformed.
  }

  const link = safeGet(item, ["url", "link", "html_url", "public_url"], fallbackLink);
  if (!subject) subject = `BlueFolder Work Order ${number || workOrderId}`;

  return {
    id: workOrderId,
    number: number || workOrderId,
    subject,
    created_at: createdAt,
    customer: safeGet(item, ["customer_name", "customer", "account_name"]),
    link,
  };
}

export function parseDate(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  const normalized = text.endsWith("Z") ? text : text;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function sortByCreatedAtDesc(items) {
  return [...items].sort((a, b) => {
    const aDate = parseDate(
      safeGet(a, ["created_at", "created", "date_created", "dateTimeCreated", "dateCreated"])
    );
    const bDate = parseDate(
      safeGet(b, ["created_at", "created", "date_created", "dateTimeCreated", "dateCreated"])
    );
    return (bDate?.getTime() || 0) - (aDate?.getTime() || 0);
  });
}

export class BlueFolderClient {
  constructor(settings = getBlueFolderSlackSettings()) {
    this.settings = settings;
  }

  url(path) {
    if (/^https?:\/\//i.test(path)) return path;
    return `${this.settings.bluefolderBaseUrl}${path}`;
  }

  isXmlMode() {
    return (
      this.settings.bluefolderWorkOrdersPath.toLowerCase().includes(".aspx") ||
      this.settings.bluefolderBaseUrl.toLowerCase().includes("/api/2.0")
    );
  }

  async request(method, path, { params, data, json, headers } = {}) {
    const url = new URL(this.url(path));
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value != null && value !== "") url.searchParams.set(key, String(value));
    });

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.settings.bluefolderTimeoutMs || 30000
    );
    const requestHeaders = {
      Accept: "application/json, text/xml, application/xml",
      ...(headers || {}),
    };
    if (this.settings.bluefolderApiToken) {
      requestHeaders.Authorization = `Basic ${Buffer.from(
        `${this.settings.bluefolderApiToken}:x`
      ).toString("base64")}`;
    }
    if (json !== undefined) requestHeaders["Content-Type"] = "application/json";

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: requestHeaders,
        body: json !== undefined ? JSON.stringify(json) : data,
        signal: controller.signal,
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`BlueFolder ${method} ${url.pathname} returned ${response.status}: ${text.slice(0, 300)}`);
      }
      const payload = await parsePayload(response, text);
      return { response, payload, text };
    } finally {
      clearTimeout(timeout);
    }
  }

  async listRecentWorkOrders() {
    const path = this.settings.bluefolderWorkOrdersPath;
    if (path.toLowerCase().includes(".aspx")) {
      const xmlCandidates = [
        [path, "<request><listType>full</listType></request>"],
        [
          path,
          "<request><serviceRequestList><listType>full</listType></serviceRequestList></request>",
        ],
        ["/workOrders/list.aspx", "<request><listType>full</listType></request>"],
        [
          "/serviceRequests/list.aspx",
          "<request><serviceRequestList><listType>full</listType></serviceRequestList></request>",
        ],
      ];
      let firstSuccessItems = null;
      let lastError = null;
      let lastApiError = "";

      for (const [candidatePath, body] of xmlCandidates) {
        try {
          const result = await this.request("POST", candidatePath, {
            data: body,
            headers: {
              "Content-Type": "text/xml",
              Accept: "text/xml, application/xml, application/json",
            },
          });
          const apiError = payloadErrorMessage(result.payload);
          if (apiError) lastApiError = `${candidatePath}: ${apiError}`;
          const items = extractCollection(result.payload);
          if (firstSuccessItems == null) firstSuccessItems = items;
          if (items.length) return items;
        } catch (error) {
          lastError = error;
        }
      }

      if (lastApiError && firstSuccessItems == null) {
        throw new Error(`BlueFolder list returned an API error: ${lastApiError}`);
      }
      if (firstSuccessItems != null) return firstSuccessItems;
      if (lastError) throw lastError;
      return [];
    }

    // BlueFolder response parsing may need adjustment if your account uses a
    // custom JSON list wrapper. The extractor currently checks work_orders,
    // items, data, and results, matching the Python listener's fallback logic.
    const candidates = [
      { page_size: 100, sort: "created_at desc" },
      { per_page: 100, sort: "created_at desc" },
      { limit: 100, sort: "created_at desc" },
      {},
    ];
    let lastError = null;
    for (const params of candidates) {
      try {
        const result = await this.request("GET", path, { params });
        return extractCollection(result.payload);
      } catch (error) {
        lastError = error;
      }
    }
    if (lastError) throw lastError;
    return [];
  }

  async getWorkOrder(workOrderId) {
    const path = this.settings.bluefolderWorkOrderDetailPath.replaceAll(
      "{id}",
      encodeURIComponent(workOrderId)
    );
    const result = await this.request("GET", path);
    const payload = result.payload;
    if (payload && typeof payload === "object") {
      for (const key of [
        "work_order",
        "data",
        "item",
        "serviceRequest",
        "service_request",
        "workOrder",
      ]) {
        if (payload[key] && typeof payload[key] === "object") return payload[key];
      }
      return payload;
    }
    throw new Error(`Unexpected BlueFolder detail payload for ${workOrderId}`);
  }

  async addCommentWithSlackLink(workOrderId, slackUrl) {
    const comment = xmlEscape(`Slack thread: ${slackUrl}`);
    const safeId = xmlEscape(workOrderId);
    const payloads = [
      `<request><serviceRequestAddComment><serviceRequestId>${safeId}</serviceRequestId><comment>${comment}</comment><commentIsPublic>false</commentIsPublic></serviceRequestAddComment></request>`,
      `<request><serviceRequestAddComment><serviceRequestId>${safeId}</serviceRequestId><comment>${comment}</comment></serviceRequestAddComment></request>`,
    ];
    const endpoints = ["/serviceRequests/addComment.aspx", "/serviceRequests/addNote.aspx"];
    let lastError = null;

    for (const endpoint of endpoints) {
      for (const payload of payloads) {
        try {
          const result = await this.request("POST", endpoint, {
            data: payload,
            headers: {
              "Content-Type": "text/xml",
              Accept: "text/xml, application/xml, application/json",
            },
          });
          if (payloadStatusOk(result.payload)) return;
        } catch (error) {
          lastError = error;
        }
      }
    }
    if (lastError) throw lastError;
    throw new Error("BlueFolder comment write-back failed");
  }

  async updateSlackLink(workOrderId, slackUrl) {
    if (this.isXmlMode()) {
      try {
        await this.addCommentWithSlackLink(workOrderId, slackUrl);
        return;
      } catch {
        // Fall through to the JSON-style patch attempts below.
      }
    }

    const detail = await this.getWorkOrder(workOrderId);
    const label = this.settings.bluefolderLinkFieldLabel;
    const updatePayloads = [];

    for (const fieldName of ["additional_information", "custom_fields"]) {
      if (!Array.isArray(detail[fieldName])) continue;
      let found = false;
      const patched = detail[fieldName].map((entry) => {
        if (!entry || typeof entry !== "object") return entry;
        const entryLabel = String(entry.label || entry.name || "").trim();
        if (entryLabel !== label) return entry;
        found = true;
        return {
          ...entry,
          [Object.prototype.hasOwnProperty.call(entry, "value") ? "value" : "text"]:
            slackUrl,
        };
      });
      if (!found) patched.push({ label, value: slackUrl });
      updatePayloads.push({ [fieldName]: patched });
    }

    if (!updatePayloads.length) {
      updatePayloads.push(
        { additional_information: [{ label, value: slackUrl }] },
        { custom_fields: [{ label, value: slackUrl }] }
      );
    }

    const path = this.settings.bluefolderWorkOrderDetailPath.replaceAll(
      "{id}",
      encodeURIComponent(workOrderId)
    );
    let lastError = null;
    for (const payload of updatePayloads) {
      for (const method of ["PATCH", "PUT"]) {
        try {
          await this.request(method, path, { json: payload });
          return;
        } catch (error) {
          lastError = error;
        }
      }
    }
    if (lastError) throw lastError;
  }
}

export function createBlueFolderClient(settings) {
  return new BlueFolderClient(settings);
}
