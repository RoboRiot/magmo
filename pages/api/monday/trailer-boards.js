import https from "https";

const MONDAY_API_URL = "https://api.monday.com/v2";

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
        timeout: 20000,
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
            error.details = parsed;
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
      payload?.errors?.[0]?.message ||
        "Monday API request failed."
    );
    error.statusCode = 502;
    error.details = payload?.errors || payload;
    throw error;
  }

  return payload?.data || {};
}

async function resolveTrailerWorkspaceId() {
  const configuredId = String(
    readLocalEnvValue("MONDAY_TRAILER_WORKSPACE_ID") ||
      readLocalEnvValue("MONDAY_WORKSPACE_ID")
  ).trim();
  if (configuredId) return configuredId;

  const wantedName = String(
    readLocalEnvValue("MONDAY_TRAILER_WORKSPACE_NAME") || "Trailer"
  )
    .trim()
    .toLowerCase();

  const data = await mondayRequest(`
    query {
      workspaces {
        id
        name
      }
    }
  `);

  const workspace = (data.workspaces || []).find((entry) =>
    String(entry?.name || "").trim().toLowerCase().includes(wantedName)
  );
  if (!workspace?.id) {
    const error = new Error(
      "Could not find the Monday trailer workspace. Set MONDAY_TRAILER_WORKSPACE_ID."
    );
    error.statusCode = 404;
    throw error;
  }
  return workspace.id;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
    await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;

    const workspaceId = await resolveTrailerWorkspaceId();
    const data = await mondayRequest(
      `
        query ($workspaceIds: [ID!]) {
          folders(workspace_ids: $workspaceIds) {
            id
            name
            children {
              id
              name
            }
          }
          boards(workspace_ids: $workspaceIds, limit: 500) {
            id
            name
            board_folder_id
          }
        }
      `,
      { workspaceIds: [workspaceId] }
    );

    const boards = (data.boards || [])
      .map((board) => ({
        id: String(board?.id || ""),
        name: String(board?.name || "").trim(),
        folderId: board?.board_folder_id ? String(board.board_folder_id) : null,
      }))
      .filter((board) => board.id && board.name)
      .filter((board) => !/^subitems of /i.test(board.name));

    const folders = (data.folders || []).map((folder) => ({
      id: String(folder?.id || ""),
      name: String(folder?.name || "").trim(),
      boards: (folder?.children || [])
        .map((board) => ({
          id: String(board?.id || ""),
          name: String(board?.name || "").trim(),
          folderId: String(folder?.id || ""),
        }))
        .filter((board) => board.id && board.name)
        .filter((board) => !/^subitems of /i.test(board.name)),
    }));

    const folderBoardIds = new Set(
      folders.flatMap((folder) => folder.boards.map((board) => board.id))
    );
    const contentBoards = boards.filter(
      (board) => !board.folderId && !folderBoardIds.has(board.id)
    );
    const groupedFolders = [
      { id: "content", name: "Content", boards: contentBoards },
      ...folders,
    ];

    res.status(200).json({ boards, folders: groupedFolders, workspaceId });
  } catch (error) {
    console.error("Monday trailer boards API failed:", error);
    res.status(error.statusCode || 500).json({
      error: error.message || "Failed to load Monday boards.",
    });
  }
}
