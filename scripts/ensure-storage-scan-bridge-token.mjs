import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(
  new URL("..", import.meta.url).pathname.replace(/^\/(.:)/, "$1")
);
const envPath = path.join(repoRoot, ".env.local");
const key = "STORAGE_SCAN_BRIDGE_TOKEN";

function findValue(content) {
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(
      new RegExp(`^\\s*(?:export\\s+)?${key}\\s*=\\s*(.*)\\s*$`)
    );
    if (match) return match[1].replace(/^(['"])(.*)\1$/, "$2").trim();
  }
  return "";
}

if (!fs.existsSync(envPath)) {
  throw new Error(".env.local was not found; refusing to create a partial environment file.");
}

const content = fs.readFileSync(envPath, "utf8");
const existing = findValue(content);
if (existing) {
  if (Buffer.byteLength(existing, "utf8") < 32) {
    throw new Error(`${key} exists but is shorter than 32 bytes.`);
  }
  console.log("Storage scan bridge credential is already configured.");
  process.exit(0);
}

const generated = crypto.randomBytes(32).toString("base64url");
const normalized = content.replace(/\s*$/, "");
const updated = `${normalized}\n\n# Server-to-server authorization for storage Scan In start/stop. Do not share or commit.\n${key}=${generated}\n`;
const temporaryPath = `${envPath}.storage-scan-${process.pid}.tmp`;

fs.writeFileSync(temporaryPath, updated, { encoding: "utf8", mode: 0o600 });
fs.renameSync(temporaryPath, envPath);
try {
  fs.chmodSync(envPath, 0o600);
} catch {}

console.log("Configured a new storage scan bridge credential without displaying it.");
