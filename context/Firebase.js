import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const browserHostname =
  typeof window !== "undefined"
    ? String(window.location.hostname || "").toLowerCase()
    : "";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    // Keep the OAuth helper on the same origin in production. This is required
    // for reliable redirect sign-in in Safari and other browsers that partition
    // third-party storage. Local/test builds can still opt into another domain.
    (browserHostname === "magmo.cloud" ? "magmo.cloud" : "") ||
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "magmo-ac10c.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "magmo-ac10c",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "magmo-ac10c.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "177857525147",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:177857525147:web:ac8e3c87d82396beb1dd3e",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-L0236JT5N3",
};
// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials);
}

// Some networks/proxies block Firestore's streaming transport.
// Force long polling in the browser to avoid stalled writes/listens.
if (typeof window !== "undefined") {
  try {
    const db = Firebase.firestore();
    if (!window.__magmoFirestoreSettingsApplied) {
      db.settings({
        experimentalForceLongPolling: true,
        useFetchStreams: false,
        merge: true,
      });
      window.__magmoFirestoreSettingsApplied = true;
    }
  } catch (error) {
    // Ignore if Firestore has already been initialized with settings.
  }
}

export const auth = Firebase.auth();
export default Firebase;
