import fs from "fs";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Import Firebase Functions for config access
let functions;
try {
  functions = require("firebase-functions");
} catch (error) {
  // Not running in Firebase Functions environment
  functions = null;
}

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  const serviceAccountPath =
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  let serviceAccount = null;
  if (serviceAccountPath) {
    try {
      const raw = fs.readFileSync(serviceAccountPath, "utf8");
      serviceAccount = JSON.parse(raw);
    } catch (error) {
      console.warn(
        "Firebase Admin service account file could not be loaded:",
        error.message
      );
    }
  }

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.FIREBASE_FUNCTIONS_CLIENT_EMAIL ||
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
    serviceAccount?.client_email ||
    (functions
      ? functions.config().admin?.client_email ||
        functions.config().ssr?.firebase_client_email
      : undefined);

  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY ||
    process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    serviceAccount?.private_key ||
    (functions
      ? functions.config().admin?.private_key ||
        functions.config().ssr?.firebase_private_key
      : undefined);

  const projectId =
    process.env.FIREBASE_ADMIN_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    serviceAccount?.project_id ||
    "magmo-ac10c";
  const hasExplicitAdminCreds = Boolean(clientEmail && privateKey);
  const isGoogleRuntime = Boolean(
    process.env.K_SERVICE ||
      process.env.FUNCTION_TARGET ||
      process.env.GAE_ENV ||
      process.env.GOOGLE_CLOUD_PROJECT
  );
  const canUseAdc =
    isGoogleRuntime || Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    if (hasExplicitAdminCreds) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com",
      });
    } else if (canUseAdc) {
      // Fall back to Application Default Credentials (e.g. Cloud Functions/Run)
      initializeApp({
        projectId,
        databaseURL: "https://magmo-ac10c.firebaseio.com",
      });
    } else {
      console.warn(
        "Firebase Admin not initialized: missing service account credentials in local environment."
      );
    }
  } catch (error) {
    console.warn("Firebase Admin initialization failed:", error.message);
    // Don't throw error during build process
  }
}

// Only export Firestore if Firebase Admin is properly initialized
let adminDb = null;
try {
  if (getApps().length > 0) {
    adminDb = getFirestore();
  }
} catch (error) {
  console.warn("Firebase Admin not available:", error.message);
}

export { adminDb };
export default adminDb;
