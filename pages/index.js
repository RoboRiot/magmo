import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Alert } from "react-bootstrap";
import styles from "../styles/Home.module.css";

import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import firebase, { auth } from "../context/Firebase";

export default function Home() {
  const [error, setError] = useState("");
  // Prevent our main-useEffect from hijacking the test-login flow:
  const [isTestLogin, setIsTestLogin] = useState(false);

  const { authUser, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  // Ensure we are on the client side
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Handle redirect result from Google Auth
  // Handle redirect result from Google Auth (runs everywhere)
  useEffect(() => {
    if (hasMounted && !loading) {
      auth
        .getRedirectResult()
        .then((result) => {
          console.log("=== REDIRECT RESULT ===");
          console.log("Result:", result);
          if (result.credential) {
            const destination = router.query.redirect || "/NewSearch/mainSearch";
            console.log("User authenticated, redirecting to:", destination);
            router.replace(destination);
          } else {
            console.log("No credential found in redirect result");
          }
        })
        .catch((error) => {
          console.error("Redirect result error:", error);
          setError("Authentication failed. Please try again.");
        });
    }
  }, [hasMounted, loading, router]);


  // If auth status is known and the user is already logged in, redirect them.
  useEffect(() => {
    if (isTestLogin) return; // ← skip for test login
    if (hasMounted && !loading && authUser) {
      const destination = router.query.redirect || "/NewSearch/mainSearch";
  // use replace to avoid stacking multiple entries
      router.replace(destination);
    }
  }, [isTestLogin, hasMounted, authUser, loading, router]);

  if (!hasMounted) return null; // Prevent rendering until mounted

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      // Note: With redirect, the user will be redirected to Google and then back to this page
      // The redirect result will be handled in the useEffect above
    } catch (err) {
      setError("Failed to log in with Google");
    }
  };

  const handleTestLogin = async () => {
    setError("");
    setIsTestLogin(true);
    const password = prompt("Enter password:");
    if (!password) return;

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword("test@test.com", password);
      // now go to your custom test-search page:
      router.replace("/NewSearch/searchTest");
    } catch (err) {
      setError("Test login failed: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>magmo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">MAGMO</h2>
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

              <Button
                variant="secondary"
                className="w-100 mt-3"
                onClick={handleTestLogin}
              >
                Test Login
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
