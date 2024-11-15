import Head from 'next/head'
import React, { useState } from "react";
import { Button, Card, Container, Alert } from 'react-bootstrap';
import styles from "../styles/Home.module.css";

import { useAuth } from '../context/AuthUserContext';
import { useRouter } from 'next/router';

export default function Home() {
  const [error, setError] = useState("");
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to log in with Google");
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
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
