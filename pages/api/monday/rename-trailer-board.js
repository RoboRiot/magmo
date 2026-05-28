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
      payload?.errors?.[0]?.message || "Monday API request failed."
    );
    error.statusCode = 502;
    error.details = payload?.errors || payload;
    throw error;
  }

  return payload?.data || {};
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
    await requireFirebaseAuth(req, res);
    if (res.writableEnded) return;

    const boardId = String(req.body?.boardId || "").trim();
    const name = String(req.body?.name || "").trim();
    if (!boardId || !name) {
      res.status(400).json({ error: "Missing boardId or name." });
      return;
    }

    const data = await mondayRequest(
      `
        mutation RenameTrailerBoard($boardId: ID!, $name: String!) {
          update_board(
            board_id: $boardId
            board_attribute: name
            new_value: $name
          )
        }
      `,
      { boardId, name }
    );

    res.status(200).json({
      ok: true,
      boardId,
      name,
      result: data?.update_board || null,
    });
  } catch (error) {
    console.error("Monday trailer rename API failed:", error);
    res.status(error.statusCode || 500).json({
      error: error.message || "Failed to rename Monday trailer board.",
    });
  }
}
