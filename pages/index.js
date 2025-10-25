// pages/index.js
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Container, Alert } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import firebase from "../context/Firebase"; // compat default export ONLY

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const unsubRef = useRef(null);

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

  // One-time auth listener
  useEffect(() => {
    if (!hasMounted) return;
    (async () => {
      try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // simple storage probe to detect hostile environments
        try {
          localStorage.setItem("__magmo_probe", "1");
        } catch (e) {
          console.warn("[auth] localStorage not available; redirects may fail");
        }

        unsubRef.current = firebase.auth().onAuthStateChanged((user) => {
          console.log("[auth] onAuthStateChanged:", user);
          setAuthReady(true);
          if (user) {
            const dest = getDestination();
            router.replace(dest);
          }
        });
      } catch (e) {
        console.error("[auth] persistence setup error:", e);
        setError("Authentication init failed.");
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
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.setCustomParameters({ prompt: "select_account" });

      // prefer popup (no redirect state), fallback to redirect only where needed
      if (isIosSafari()) {
        console.log("[auth] Using redirect (iOS Safari)");
        // mark that we attempted sign-in (to detect storage loss)
        try { localStorage.setItem("__magmo_signin_attempt", Date.now().toString()); } catch (_) {}
        await firebase.auth().signInWithRedirect(provider);
      } else {
        console.log("[auth] Using popup");
        const result = await firebase.auth().signInWithPopup(provider);
        console.log("[auth] popup result:", result && result.user);
        // onAuthStateChanged will route; but we can route immediately too:
        if (result && result.user) {
          const dest = getDestination();
          router.replace(dest);
        }
      }
    } catch (err) {
      console.error("[auth] sign-in error:", err);
      setError("Failed to log in with Google: " + (err && err.message ? err.message : String(err)));
    }
  };

  const handleTestLogin = async () => {
    setError("");
    const password = prompt("Enter password:");
    if (!password) return;
    try {
      await firebase.auth().signInWithEmailAndPassword("test@test.com", password);
      router.replace("/NewSearch/searchTest");
    } catch (err) {
      setError("Test login failed: " + (err && err.message ? err.message : String(err)));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>magmo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <div
                className="text-center mb-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <img
                  src="/magmo.png"
                  alt="Magmo Logo"
                  style={{
                    width: "100%",
                    maxWidth: "400px", // adjust this if needed
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              {!authReady && <div className="mb-2 small text-muted">Initializing…</div>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Button
                variant="light"
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={handleGoogleSignIn}
                style={{
                  border: "1px solid #dadce0",
                  borderRadius: "0.375rem",
                  color: "#757575",
                  padding: "0.5rem 1rem",
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google logo"
                  width="20"
                  height="20"
                  className="me-2"
                />
                Sign in with Google
              </Button>

              <Button variant="secondary" className="w-100 mt-3" onClick={handleTestLogin}>
                Test Login
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
