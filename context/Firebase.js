import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "magmo-ac10c.firebaseapp.com",
  projectId: "magmo-ac10c",
  storageBucket: "magmo-ac10c.appspot.com",
  messagingSenderId: "177857525147",
  appId: "1:177857525147:web:ac8e3c87d82396beb1dd3e",
  measurementId: "G-L0236JT5N3",
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
