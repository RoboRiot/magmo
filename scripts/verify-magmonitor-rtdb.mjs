import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { cert, deleteApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

function readEnvFile(filePath) {
  const values = new Map();
  const contents = fs.readFileSync(filePath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
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

function requireValue(values, key) {
  const value = String(values.get(key) || process.env[key] || "").trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

async function expectStatus(response, expected, label) {
  if (response.status !== expected) {
    throw new Error(`${label} returned HTTP ${response.status}; expected ${expected}.`);
  }
}

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), "..");
const envPath = path.join(repoRoot, ".env.local");
const env = readEnvFile(envPath);
const projectId = env.get("FIREBASE_PROJECT_ID") || "magmo-ac10c";
const databaseUrl =
  env.get("FIREBASE_DATABASE_URL") ||
  `https://${projectId}-default-rtdb.firebaseio.com`;
const apiKey = requireValue(env, "NEXT_PUBLIC_FIREBASE_API_KEY");
const serviceAccountPath = path.resolve(
  repoRoot,
  requireValue(env, "FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH")
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
const systemId = "siemens--rtdb-verifier--9f72a1";
const otherSystemId = "siemens--rtdb-verifier--other";
const commandPath = `magmonitor/commands/${systemId}`;
const app = initializeApp(
  {
    credential: cert(serviceAccount),
    databaseURL: databaseUrl,
    projectId,
  },
  `magmonitor-rtdb-verifier-${Date.now()}`
);
const database = getDatabase(app);

try {
  const customToken = await getAuth(app).createCustomToken(
    `magmonitor-rtdb-verifier-${Date.now()}`,
    {
      magmonitorDevice: true,
      magmonitorSystemId: systemId,
      magmonitorSessionExpiresAt: Math.floor(Date.now() / 1000) + 600,
    }
  );
  const exchange = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: customToken, returnSecureToken: true }),
    }
  );
  await expectStatus(exchange, 200, "Custom-token exchange");
  const { idToken } = await exchange.json();
  if (!idToken) throw new Error("Custom-token exchange did not return an ID token.");

  const ownUrl = `${databaseUrl}/${commandPath}.json?auth=${encodeURIComponent(idToken)}`;
  const otherUrl = `${databaseUrl}/magmonitor/commands/${otherSystemId}.json?auth=${encodeURIComponent(idToken)}`;
  await expectStatus(await fetch(ownUrl), 200, "Scoped device read");
  await expectStatus(await fetch(otherUrl), 401, "Cross-device read denial");
  await expectStatus(
    await fetch(ownUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ forbidden: true }),
    }),
    401,
    "Device write denial"
  );

  const command = {
    commandId: "verification-command",
    action: "stop",
    issuedAtMs: Date.now(),
    expiresAtMs: Date.now() + 60_000,
    protocolVersion: 2,
  };
  await database.ref(commandPath).set(command);
  const delivered = await fetch(ownUrl);
  await expectStatus(delivered, 200, "Published command read");
  const deliveredCommand = await delivered.json();
  if (deliveredCommand?.commandId !== command.commandId) {
    throw new Error("The scoped device did not receive the published command.");
  }

  console.log(
    "Magmonitor RTDB verification passed: scoped reads work, cross-device reads and device writes are denied, and Admin command delivery works."
  );
} finally {
  await database.ref(commandPath).remove().catch(() => {});
  await deleteApp(app).catch(() => {});
}
