import https from "https";

const MONDAY_API_URL = "https://api.monday.com/v2";
const MAX_BOARD_IDS = 24;

function readLocalEnvValue(key) {
  if (process.env[key]) return process.env[key];
  if (process.env.NODE_ENV === "production") return "";

  try {
    const fs = require("fs");
    const path = require("path");
    const envPath = path.join(process.cwd(), ".env.local");
    const raw = fs.readFileSync(envPath, "utf8");
    const line = raw
      .split(/\r?\n/)
      .find((entry) => entry.startsWith(`${key}=`));
    if (!line) return "";
    let value = line.slice(key.length + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    return value;
  } catch {
    return "";
  }
}

async function mondayRequest(query, variables = {}) {
  const token =
    readLocalEnvValue("MONDAY_API_TOKEN") || readLocalEnvValue("MONDAY_TOKEN");
  if (!token) {
    const error = new Error("MONDAY_API_TOKEN is not configured.");
    error.statusCode = 503;
    throw error;
  }

  const payload = await new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const request = https.request(
      MONDAY_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          Authorization: token,
        },
        timeout: 25000,
      },
      (response) => {
        let raw = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          raw += chunk;
        });
        response.on("end", () => {
          let parsed = null;
          try {
            parsed = raw ? JSON.parse(raw) : null;
          } catch {
            parsed = { raw };
          }

          if (response.statusCode < 200 || response.statusCode >= 300) {
            const error = new Error(
              parsed?.errors?.[0]?.message ||
                parsed?.error_message ||
                `Monday API request failed (${response.statusCode}).`
            );
            error.statusCode = response.statusCode;
            reject(error);
            return;
          }
          resolve(parsed);
        });
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error("Monday API request timed out."));
    });
    request.on("error", reject);
    request.write(body);
    request.end();
  });

  if (payload?.errors?.length) {
    const error = new Error(
      payload.errors[0]?.message || "Monday API request failed."
    );
    error.statusCode = 502;
    throw error;
  }

  return payload?.data || {};
}

function getColumn(item, predicate) {
  return (item?.column_values || []).find((columnValue) =>
    predicate({
      id: String(columnValue?.id || "").toLowerCase(),
      title: String(columnValue?.column?.title || "").toLowerCase(),
      type: String(columnValue?.type || "").toLowerCase(),
    })
  );
}

function normalizeStatus(value) {
  const label = String(value?.text || "").trim();
  const normalized = label.toLowerCase();
  if (/done|complete|finished/.test(normalized)) {
    return { label: label || "Done", tone: "done" };
  }
  if (/working|progress|stuck|hold|pending/.test(normalized)) {
    return { label: label || "Working on it", tone: "working" };
  }
  return { label: label || "Not started", tone: "empty" };
}

function normalizeBoard(board) {
  const groups = new Map(
    (board?.groups || []).map((group) => [
      String(group?.id || ""),
      {
        id: String(group?.id || ""),
        title: String(group?.title || "Tasks").trim(),
        archived: group?.archived === true,
        deleted: group?.deleted === true,
        tasks: [],
      },
    ])
  );

  (board?.items_page?.items || []).forEach((item) => {
    const groupId = String(item?.group?.id || "");
    const groupTitle = String(item?.group?.title || "Tasks").trim();
    if (!groups.has(groupId)) {
      groups.set(groupId, {
        id: groupId,
        title: groupTitle,
        archived: false,
        deleted: false,
        tasks: [],
      });
    }

    const statusValue = getColumn(
      item,
      ({ id, title, type }) =>
        type === "status" || id === "status" || title === "status"
    );
    const peopleValue = getColumn(
      item,
      ({ id, title, type }) =>
        type === "people" ||
        id === "person" ||
        /person|people|owner|assignee/.test(title)
    );
    const dateValue = getColumn(
      item,
      ({ title, type }) => type === "date" || title === "date"
    );
    const status = normalizeStatus(statusValue);
    if (status.tone === "done") return;

    groups.get(groupId).tasks.push({
      id: String(item?.id || ""),
      name: String(item?.name || "Untitled task").trim(),
      assignee: String(peopleValue?.text || "").trim() || "Unassigned",
      status: status.label,
      statusTone: status.tone,
      date: String(dateValue?.text || "").trim(),
    });
  });

  return {
    id: String(board?.id || ""),
    name: String(board?.name || "").trim(),
    groups: Array.from(groups.values()).filter(
      (group) =>
        group.tasks.length > 0 &&
        /service/i.test(group.title) &&
        !group.archived &&
        !group.deleted
    ),
  };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
    await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;

    const boardIds = String(req.query.boardIds || "")
      .split(",")
      .map((value) => value.trim())
      .filter((value) => /^\d+$/.test(value))
      .slice(0, MAX_BOARD_IDS);

    if (!boardIds.length) {
      res.status(200).json({ boards: [] });
      return;
    }

    const data = await mondayRequest(
      `
        query ($boardIds: [ID!]) {
          boards(ids: $boardIds) {
            id
            name
            groups {
              id
              title
              archived
              deleted
            }
            items_page(limit: 500) {
              items {
                id
                name
                group {
                  id
                  title
                }
                column_values {
                  id
                  text
                  type
                  column {
                    title
                  }
                }
              }
            }
          }
        }
      `,
      { boardIds }
    );

    res.status(200).json({
      boards: (data.boards || []).map(normalizeBoard),
      refreshedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Monday trailer tasks API failed:", error);
    res.status(error.statusCode || 500).json({
      error: error.message || "Failed to load Monday trailer tasks.",
    });
  }
}
