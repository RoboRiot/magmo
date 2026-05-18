// pages/index.js
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { Button, Alert } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import firebase from "../context/Firebase"; // compat default export ONLY
import {
  ALLOWED_EMAIL_DOMAIN,
  isAllowedEmailDomain,
} from "../utils/authAccess";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const unsubRef = useRef(null);
  const persistenceModeRef = useRef("unknown");
  const domainErrorMessage = `Only @${ALLOWED_EMAIL_DOMAIN} accounts can sign in.`;

  const getDestination = () => {
    const q = router?.query?.redirect;
    return Array.isArray(q) ? q[0] || "/NewSearch/mainSearch" : (q || "/NewSearch/mainSearch");
  };

  const isIosSafari = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    const isIOS = /iP(hone|ad|od)/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/i.test(ua);
    return isIOS && isSafari;
  };

  useEffect(() => setHasMounted(true), []);

  const ensurePersistence = async () => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      persistenceModeRef.current = "local";
      return "local";
    } catch (error) {
      console.warn("[auth] LOCAL persistence failed, falling back to SESSION", error);
      try {
        await firebase.auth().setPersistence(
          firebase.auth.Auth.Persistence.SESSION
        );
        persistenceModeRef.current = "session";
        return "session";
      } catch (innerError) {
        console.warn("[auth] SESSION persistence failed", innerError);
        persistenceModeRef.current = "none";
        return "none";
      }
    }
  };

  // One-time auth listener
  useEffect(() => {
    if (!hasMounted) return;
    (async () => {
      try {
        await ensurePersistence();
        // simple storage probe to detect hostile environments
        try {
          localStorage.setItem("__magmo_probe", "1");
        } catch (e) {
          console.warn("[auth] localStorage not available; redirects may fail");
        }

        try {
          const redirectResult = await firebase.auth().getRedirectResult();
          if (redirectResult && redirectResult.user) {
            const redirectEmail = redirectResult.user.email;
            if (!isAllowedEmailDomain(redirectEmail)) {
              await firebase.auth().signOut();
              setError(domainErrorMessage);
              return;
            }
            const dest = getDestination();
            router.replace(dest);
            return;
          }
        } catch (redirectError) {
          console.error("[auth] redirect result error:", redirectError);
          setError(
            "Google sign-in failed. Please try again."
          );
        }

        try {
          const hadAttempt = localStorage.getItem("__magmo_signin_attempt");
          if (hadAttempt) {
            localStorage.removeItem("__magmo_signin_attempt");
            setTimeout(() => {
              const user = firebase.auth().currentUser;
              if (!user) {
                setError(
                  "Google sign-in did not complete in Safari. Please allow cookies or try again."
                );
              }
            }, 1500);
          }
        } catch (_) {}

        unsubRef.current = firebase.auth().onAuthStateChanged((user) => {
          console.log("[auth] onAuthStateChanged:", user);
          setAuthReady(true);
          if (user) {
            if (!isAllowedEmailDomain(user.email)) {
              firebase
                .auth()
                .signOut()
                .catch((error) => {
                  console.error("[auth] sign-out failed for unauthorized domain:", error);
                });
              setError(domainErrorMessage);
              return;
            }
            const dest = getDestination();
            router.replace(dest);
          }
        });
      } catch (e) {
        console.error("[auth] persistence setup error:", e);
        setError("Authentication init failed.");
      } finally {
        setAuthReady(true);
      }
    })();

    return () => {
      if (unsubRef.current) unsubRef.current();
    };
  }, [hasMounted, router]);

  if (!hasMounted) return null;

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await ensurePersistence();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.setCustomParameters({
        prompt: "select_account",
        hd: ALLOWED_EMAIL_DOMAIN,
      });

      console.log("[auth] Using popup");
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log("[auth] popup result:", result && result.user);
        // onAuthStateChanged will route; but we can route immediately too:
        if (result && result.user) {
          if (!isAllowedEmailDomain(result.user.email)) {
            await firebase.auth().signOut();
            setError(domainErrorMessage);
            return;
          }
          const dest = getDestination();
          router.replace(dest);
        }
      } catch (popupError) {
        if (
          isIosSafari() &&
          (popupError?.code === "auth/popup-blocked" ||
            popupError?.code === "auth/popup-closed-by-user" ||
            popupError?.code === "auth/operation-not-supported-in-this-environment")
        ) {
          setError("Safari blocked the sign-in popup. Please allow popups and try again.");
          return;
        }
        throw popupError;
      }
    } catch (err) {
      console.error("[auth] sign-in error:", err);
      if (err?.code === "auth/unauthorized-domain") {
        setError(
          "This host is not authorized in Firebase Auth settings. Add your app host in Firebase Auth > Settings > Authorized domains."
        );
      } else {
        setError("Failed to log in with Google: " + (err && err.message ? err.message : String(err)));
      }
    }
  };

  const handleTestLogin = async () => {
    setError("");
    const testEmail = "test@test.com";
    if (!isAllowedEmailDomain(testEmail)) {
      setError(domainErrorMessage);
      return;
    }
    const password = prompt("Enter password:");
    if (!password) return;
    try {
      await firebase.auth().signInWithEmailAndPassword(testEmail, password);
      router.replace("/NewSearch/searchTest");
    } catch (err) {
      setError("Test login failed: " + (err && err.message ? err.message : String(err)));
    }
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>magmo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles.shell}>
        <div className={styles.card}>
          <img src="/magmo.png" alt="Magmo Logo" className={styles.logo} />
          <div className={styles.cardTitle}>Welcome back</div>

          {!authReady && (
            <div className={styles.status}>Initializing…</div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            variant="light"
            className={styles.googleButton}
            onClick={handleGoogleSignIn}
          >
            <span className={styles.googleIcon}>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                width="20"
                height="20"
              />
            </span>
            Continue with Google
          </Button>

          <Button
            variant="outline-secondary"
            className={styles.testButton}
            onClick={handleTestLogin}
          >
            Test
          </Button>
        </div>
      </div>
    </div>
  );
}

