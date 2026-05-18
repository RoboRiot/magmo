#!/usr/bin/env node

import fs from "fs";
import path from "path";
import process from "process";
import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const ALLOWED_EMAIL_DOMAIN = "advancedimagingparts.com";
const VALID_ROLES = new Set(["admin", "regular"]);

function stripQuotes(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  const startsWithQuote = trimmed.startsWith('"') || trimmed.startsWith("'");
  const endsWithQuote = trimmed.endsWith('"') || trimmed.endsWith("'");
  if (startsWithQuote && endsWithQuote && trimmed.length >= 2) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  let raw = "";
  try {
    raw = fs.readFileSync(envPath, "utf8");
  } catch (_) {
    return;
  }

  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex <= 0) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    if (!key) continue;
    if (process.env[key]) continue;

    const value = stripQuotes(trimmed.slice(equalsIndex + 1));
    process.env[key] = value;
  }
}

function printUsage() {
  console.log(`
Usage:
  node scripts/set-user-role.mjs --email "<user@advancedimagingparts.com>" --role <admin|regular>
  node scripts/set-user-role.mjs --uid "<firebase-uid>" --role <admin|regular>

Optional:
  --project-id <firebase-project-id>

Environment for admin credentials (one option is enough):
  1) FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH (or FIREBASE_SERVICE_ACCOUNT_PATH)
  2) FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
  3) GOOGLE_APPLICATION_CREDENTIALS

Examples:
  node scripts/set-user-role.mjs --email "jane@advancedimagingparts.com" --role admin
  node scripts/set-user-role.mjs --uid "abcd1234" --role regular
`.trim());
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;

    const equalsIndex = token.indexOf("=");
    if (equalsIndex > -1) {
      const key = token.slice(2, equalsIndex);
      const value = token.slice(equalsIndex + 1);
      args[key] = value;
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function normalizeRole(roleValue) {
  return String(roleValue || "").trim().toLowerCase();
}

function isAllowedDomain(email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return normalizedEmail.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

function initAdminApp(projectIdOverride) {
  if (getApps().length > 0) return getApps()[0];

  const serviceAccountPath =
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;
  let serviceAccount = null;

  if (serviceAccountPath) {
    try {
      const raw = fs.readFileSync(serviceAccountPath, "utf8");
      serviceAccount = JSON.parse(raw);
    } catch (error) {
      console.warn(
        `Could not parse service account at "${serviceAccountPath}": ${error.message}`
      );
    }
  }

  const projectId =
    projectIdOverride ||
    process.env.FIREBASE_ADMIN_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    serviceAccount?.project_id ||
    "magmo-ac10c";

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
    serviceAccount?.client_email;
  const privateKeyRaw =
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    serviceAccount?.private_key;
  const privateKey = privateKeyRaw ? privateKeyRaw.replace(/\\n/g, "\n") : "";

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  }

  if (serviceAccount) {
    return initializeApp({
      credential: cert(serviceAccount),
      projectId,
    });
  }

  return initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

async function main() {
  loadDotEnvLocal();

  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    process.exit(0);
  }

  const role = normalizeRole(args.role);
  if (!VALID_ROLES.has(role)) {
    throw new Error('Missing or invalid "--role". Use "admin" or "regular".');
  }

  const email = args.email ? String(args.email).trim().toLowerCase() : "";
  const uid = args.uid ? String(args.uid).trim() : "";

  if (!email && !uid) {
    throw new Error('Provide either "--email" or "--uid".');
  }
  if (email && uid) {
    throw new Error('Use either "--email" or "--uid", not both.');
  }
  if (email && !isAllowedDomain(email)) {
    throw new Error(
      `Only @${ALLOWED_EMAIL_DOMAIN} users can receive app roles. Received: ${email}`
    );
  }

  initAdminApp(args["project-id"] ? String(args["project-id"]).trim() : "");
  const adminAuth = getAuth();

  const userRecord = email
    ? await adminAuth.getUserByEmail(email)
    : await adminAuth.getUser(uid);

  if (!isAllowedDomain(userRecord.email)) {
    throw new Error(
      `Refusing to update role. User email "${userRecord.email}" is outside @${ALLOWED_EMAIL_DOMAIN}.`
    );
  }

  const nextClaims = {
    ...(userRecord.customClaims || {}),
    role,
    isAdmin: role === "admin",
  };

  await adminAuth.setCustomUserClaims(userRecord.uid, nextClaims);

  console.log(
    JSON.stringify(
      {
        ok: true,
        uid: userRecord.uid,
        email: userRecord.email,
        role,
        isAdmin: role === "admin",
      },
      null,
      2
    )
  );
  console.log("Done. User should sign out/in (or refresh token) to pick up the new role.");
}

main().catch((error) => {
  console.error(`set-user-role failed: ${error.message}`);
  process.exit(1);
});
