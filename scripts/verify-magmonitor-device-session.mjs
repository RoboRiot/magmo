import fs from "node:fs";
import path from "node:path";

function loadEnv(filePath) {
  const values = new Map();
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }
    values.set(match[1], value);
  }
  return values;
}

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), "..");
const env = loadEnv(path.join(repoRoot, ".env.local"));
const ingestKey = String(env.get("MAGMONITOR_INGEST_KEY") || "").trim();
if (ingestKey.length < 32) throw new Error("MAGMONITOR_INGEST_KEY is missing.");

const baseUrl = String(process.argv[2] || "https://magmo.cloud").replace(/\/+$/, "");
const sessionResponse = await fetch(`${baseUrl}/api/magmonitor/device-session`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Magmonitor-Key": ingestKey,
  },
  body: JSON.stringify({
    manufacturer: "Siemens",
    systemName: "MAGMO_RUNTIME_VERIFIER",
    agentVersion: "runtime-verifier",
    serviceStatus: "stopped",
  }),
});
if (sessionResponse.status !== 200) {
  throw new Error(`Device session returned HTTP ${sessionResponse.status}.`);
}
const session = await sessionResponse.json();
if (!session.streamUrl || !session.expiresAt || !session.systemId) {
  throw new Error("Device session response is incomplete.");
}

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10_000);
try {
  const stream = await fetch(session.streamUrl, {
    headers: { Accept: "text/event-stream" },
    signal: controller.signal,
  });
  if (stream.status !== 200 || !stream.body) {
    throw new Error(`Device event stream returned HTTP ${stream.status}.`);
  }
  const firstChunk = await stream.body.getReader().read();
  const text = new TextDecoder().decode(firstChunk.value || new Uint8Array());
  if (!/event:\s*(put|patch)/i.test(text) || !/data:/i.test(text)) {
    throw new Error("Device event stream did not return an initial Firebase event.");
  }
  console.log(
    "Production Magmonitor device session verification passed: runtime token signing, token exchange, and the passive Firebase stream are working."
  );
} finally {
  clearTimeout(timeout);
  controller.abort();
}
