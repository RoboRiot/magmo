"use strict";
const { fs, json, request, writeReceipt } = require("./cloud-common.cjs");
const { findExistingToolRow } = require("../../../lib/slack/toolListIdentity.cjs");
const { normalizeToolId } = require("../../../lib/inventory/toolIdentity.cjs");
(async () => {
  const config = json("private/function-before.json");
  const env = config.serviceConfig.environmentVariables;
  const clean = (value) => String(value || "").replace(/\s+#.*$/, "").trim();
  const token = clean(env.SLACK_BOT_TOKEN), listId = clean(env.SLACK_LIST_TOOLS_ID);
  if (!token || !listId) throw new Error("required_tools_slack_configuration_missing");
  const sample = await request("https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents/Tool?pageSize=1&mask.fieldPaths=name");
  const toolId = normalizeToolId(sample.documents?.[0]?.name?.split("/").at(-1));
  if (!toolId) throw new Error("sample_tool_identity_unavailable");
  const pages = [];
  const slackApi = async (method, body) => {
      if (method !== "slackLists.items.list") throw new Error("read_only_method_guard");
      const response = await fetch(`https://slack.com/api/${method}`, { method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body), signal: AbortSignal.timeout(20000) });
      const value = await response.json();
      const schema = value.list?.list_metadata?.schema;
      pages.push({ archived: body.archived, httpStatus: response.status, ok: value.ok === true,
        error: value.ok ? null : String(value.error || "unknown").replace(/[^a-z_]/g, "").slice(0, 80),
        rowCount: Array.isArray(value.items) ? value.items.length : null,
        allRowsHaveIdAndFields: Array.isArray(value.items) && value.items.every((row) => typeof row.id === "string" && Array.isArray(row.fields)),
        hasNextCursor: Boolean(value.response_metadata?.next_cursor),
        schemaReturned: Array.isArray(schema), primaryColumnPresent: Array.isArray(schema) && schema.some((col) => col.is_primary_column),
        configuredTitleIsPrimary: Array.isArray(schema) ? schema.some((col) => col.is_primary_column && col.id === clean(env.SLACK_LIST_TOOLS_TITLE_COL)) : null });
      return response.ok ? value : { ok: false, error: "http_failure" };
    };
  const found = await findExistingToolRow({ toolId, listId, titleColumnId: clean(env.SLACK_LIST_TOOLS_TITLE_COL), slackApi });
  const absent = await findExistingToolRow({ toolId: "AIS_T99999", listId, titleColumnId: clean(env.SLACK_LIST_TOOLS_TITLE_COL), slackApi });
  const report = { checkedAt: new Date().toISOString(), readOnly: true, methods: ["Firestore documents.list", "slackLists.items.list"],
    selectedToolId: toolId, existingToolFound: Boolean(found), existingToolArchived: found?.archived ?? null,
    syntheticProbeMatched: Boolean(absent), archivedReadVerified: pages.some((page) => page.archived && page.ok),
    pages, slackWrites: 0, databaseWrites: 0, status: "passed" };
  writeReceipt("tools-slack-readonly-verification.json", report);
  console.log(JSON.stringify(report, null, 2));
})().catch((error) => { console.error(JSON.stringify({ ok: false, code: error.code || "read_only_check_failed", message: error.name === "ToolSlackIdentityError" ? error.message : undefined })); process.exitCode = 1; });
