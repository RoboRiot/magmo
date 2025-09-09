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
  // Only initialize if we have valid credentials
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.FIREBASE_FUNCTIONS_CLIENT_EMAIL ||
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
    (functions ? functions.config().admin?.client_email || functions.config().ssr?.firebase_client_email : undefined);

  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIREBASE_FUNCTIONS_PRIVATE_KEY ||
    process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    (functions ? functions.config().admin?.private_key || functions.config().ssr?.firebase_private_key : undefined);

  if (clientEmail && privateKey) {
    try {
      initializeApp({
        credential: cert({
          projectId: "magmo-ac10c",
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
        databaseURL: "https://magmo-ac10c.firebaseio.com",
      });
    } catch (error) {
      console.warn("Firebase Admin initialization failed:", error.message);
      // Don't throw error during build process
    }
  } else {
    console.warn(
      "Firebase Admin credentials not available, skipping initialization"
    );
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
