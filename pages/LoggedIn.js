import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Container } from "react-bootstrap";

const LoggedIn = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Redirect only after a short delay if authUser remains null.
  useEffect(() => {
    if (!loading && authUser === null) {
      // Set a delay (e.g. 500ms) to give Firebase Auth a chance to rehydrate.
      const timer = setTimeout(() => {
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [authUser, loading, router]);

  if (loading) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <h3>Loading...</h3>
      </Container>
    );
  }

  return <>{authUser && children}</>;
};

export default LoggedIn;
