// pages/index.js
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { Button, Alert } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import firebase from "../context/Firebase"; // compat default export ONLY
import {
  ALLOWED_EMAIL_DOMAIN,
  canAccessMagmo,
  isAccessRevokedError,
  isAllowedEmailDomain,
} from "../utils/authAccess";

// OAuth client IDs are browser-visible public identifiers. The fallback keeps
// production login working while allowing environment-specific overrides.
const GOOGLE_OAUTH_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ||
  "177857525147-ulm94bugsp0r7kb3eotmbqahvdft38mr.apps.googleusercontent.com";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [mobileBrowser, setMobileBrowser] = useState(false);
  const [googleIdentityReady, setGoogleIdentityReady] = useState(false);
  const [googleIdentityFailed, setGoogleIdentityFailed] = useState(false);
  const unsubRef = useRef(null);
  const persistenceModeRef = useRef("unknown");
  const googleButtonRef = useRef(null);
  const googleIdentityInitializedRef = useRef(false);
  const accessErrorMessage = `Only @${ALLOWED_EMAIL_DOMAIN} accounts and approved Viewer accounts can sign in.`;

  const userCanAccess = async (user) => {
    if (!user) return false;
    try {
      const tokenResult = await user.getIdTokenResult(true);
      return canAccessMagmo(user.email, tokenResult?.claims || {});
    } catch (authError) {
      console.error("[auth] Could not verify access claims:", authError);
      if (isAccessRevokedError(authError)) return false;
      return isAllowedEmailDomain(user.email);
    }
  };

  const getDestination = () => {
    const q = router?.query?.redirect;
    return Array.isArray(q) ? q[0] || "/NewSearch/mainSearch" : (q || "/NewSearch/mainSearch");
  };

  const isMobileBrowser = () => {
    if (typeof navigator === "undefined") return false;
    const ua = String(navigator.userAgent || '');
    const isMobileDevice =
      /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
    const isIpadosDesktopMode =
      /Macintosh/i.test(ua) && Number(navigator.maxTouchPoints || 0) > 1;
    return isMobileDevice || isIpadosDesktopMode;
  };

  useEffect(() => {
    setHasMounted(true);
    setMobileBrowser(isMobileBrowser());
  }, []);

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
            if (!(await userCanAccess(redirectResult.user))) {
              await firebase.auth().signOut();
              setError(accessErrorMessage);
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

        unsubRef.current = firebase.auth().onAuthStateChanged(async (user) => {
          console.log("[auth] onAuthStateChanged:", user);
          setAuthReady(true);
          if (user) {
            if (!(await userCanAccess(user))) {
              try {
                await firebase.auth().signOut();
              } catch (error) {
                console.error("[auth] sign-out failed for unauthorized user:", error);
              }
              setError(accessErrorMessage);
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

  const finishGoogleSignIn = async (result) => {
    if (!result?.user) {
      throw new Error("Google did not return a signed-in user.");
    }
    if (!(await userCanAccess(result.user))) {
      await firebase.auth().signOut();
      setError(accessErrorMessage);
      return;
    }
    router.replace(getDestination());
  };

  const handleGoogleIdentityCredential = async (response) => {
    setError("");
    try {
      await ensurePersistence();
      if (!response?.credential) {
        throw new Error("Google did not return an identity credential.");
      }
      const credential = firebase.auth.GoogleAuthProvider.credential(
        response.credential
      );
      const result = await firebase.auth().signInWithCredential(credential);
      await finishGoogleSignIn(result);
    } catch (identityError) {
      console.error("[auth] Google Identity sign-in error:", identityError);
      if (isAccessRevokedError(identityError)) {
        setError("This account no longer has access to Magmo.");
      } else {
        setError(
          "Google sign-in could not be completed. Please close any old Google sign-in tabs and try again."
        );
      }
    }
  };

  const initializeGoogleIdentity = () => {
    if (
      googleIdentityInitializedRef.current ||
      !mobileBrowser ||
      !googleButtonRef.current ||
      !window.google?.accounts?.id
    ) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_OAUTH_CLIENT_ID,
        callback: handleGoogleIdentityCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      googleButtonRef.current.replaceChildren();
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: Math.min(
          400,
          Math.max(240, googleButtonRef.current.clientWidth || 320)
        ),
      });
      googleIdentityInitializedRef.current = true;
      setGoogleIdentityReady(true);
      setGoogleIdentityFailed(false);
    } catch (identityError) {
      console.error("[auth] Google Identity initialization failed:", identityError);
      setGoogleIdentityFailed(true);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await ensurePersistence();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      if (!isMobileBrowser()) {
        provider.setCustomParameters({
          prompt: "select_account",
        });
      }

      const authDomain = String(
        firebase.app().options.authDomain || ''
      ).toLowerCase();
      const currentHostname = String(window.location.hostname || '').toLowerCase();
      const shouldUseRedirect =
        isMobileBrowser() && authDomain === currentHostname;

      // Firebase recommends redirect sign-in on mobile. With magmo.cloud as the
      // auth domain, the helper and app share an origin, so Safari returns to
      // Magmo cleanly instead of leaving a Google popup or tab on screen.
      if (shouldUseRedirect) {
        try {
          localStorage.setItem('__magmo_signin_attempt', '1');
        } catch (_) {}
        console.log('[auth] Using same-origin redirect');
        await firebase.auth().signInWithRedirect(provider);
        return;
      }

      console.log('[auth] Using popup');
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log("[auth] popup result:", result && result.user);
        // onAuthStateChanged will route; but we can route immediately too:
        if (result && result.user) {
          await finishGoogleSignIn(result);
        }
      } catch (popupError) {
        if (
          isMobileBrowser() &&
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
      console.error('[auth] sign-in error:', err);
      try {
        localStorage.removeItem('__magmo_signin_attempt');
      } catch (_) {}
      if (isAccessRevokedError(err)) {
        setError("This account no longer has access to Magmo.");
      } else if (err?.code === "auth/unauthorized-domain") {
        setError(
          "This host is not authorized in Firebase Auth settings. Add your app host in Firebase Auth > Settings > Authorized domains."
        );
      } else {
        setError("Failed to log in with Google: " + (err && err.message ? err.message : String(err)));
      }
    }
  };

  return (
    <div className={styles.page}>
      {mobileBrowser && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onReady={initializeGoogleIdentity}
          onError={() => setGoogleIdentityFailed(true)}
        />
      )}
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

          {mobileBrowser && !googleIdentityFailed ? (
            <div className={styles.googleIdentityShell}>
              <div
                ref={googleButtonRef}
                className={styles.googleIdentityButton}
                aria-label="Continue with Google"
              />
              {!googleIdentityReady && (
                <div className={styles.googleIdentityLoading}>
                  Loading secure Google sign-in…
                </div>
              )}
            </div>
          ) : (
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
          )}

          <div className={styles.status}>
            Staff accounts and approved guest viewers
          </div>
        </div>
      </div>
    </div>
  );
}

