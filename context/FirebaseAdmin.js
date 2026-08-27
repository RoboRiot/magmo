import fs from "fs";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getDatabaseWithUrl } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const adminProjectId =
  process.env.FIREBASE_ADMIN_PROJECT_ID ||
  process.env.FIREBASE_PROJECT_ID ||
  process.env.GCLOUD_PROJECT ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  "magmo-ac10c";
const adminStorageBucket =
  process.env.FIREBASE_STORAGE_BUCKET ||
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  `${adminProjectId}.appspot.com`;
const configuredDatabaseUrl = String(
  process.env.FIREBASE_DATABASE_URL ||
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    `https://${adminProjectId}-default-rtdb.firebaseio.com`
).replace(/\/+$/, "");

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
    serviceAccount?.client_email;

  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY ||
    process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    serviceAccount?.private_key;

  const projectId = serviceAccount?.project_id || adminProjectId;
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
        databaseURL: configuredDatabaseUrl,
        storageBucket: adminStorageBucket,
      });
    } else if (canUseAdc) {
      // Fall back to Application Default Credentials (e.g. Cloud Functions/Run)
      initializeApp({
        projectId,
        databaseURL: configuredDatabaseUrl,
        storageBucket: adminStorageBucket,
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
let adminBucket = null;
let adminRealtimeDb = null;
try {
  if (getApps().length > 0) {
    adminDb = getFirestore();
    adminRealtimeDb = getDatabaseWithUrl(configuredDatabaseUrl);
    // The Functions entrypoint may initialize the default app before this
    // module is loaded. Always pass the bucket explicitly so Cloud Storage
    // never tries to discover the project through the metadata service.
    adminBucket = getStorage().bucket(adminStorageBucket);
  }
} catch (error) {
  console.warn("Firebase Admin not available:", error.message);
}

export { adminDb, adminBucket, adminRealtimeDb, configuredDatabaseUrl };
export default adminDb;
