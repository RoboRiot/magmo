import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Container } from "react-bootstrap";
import { hasRequiredRole } from "../utils/authAccess";

const LoggedIn = ({ children, requiredRole = null }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Redirect only after a short delay if authUser remains null.
  useEffect(() => {
    console.log("=== LOGGEDIN AUTH CHECK ===");
    console.log("loading:", loading);
    console.log("authUser:", authUser);
    console.log("router.asPath:", router.asPath);

    if (!loading && authUser === null) {
      console.log("No auth user, will redirect to login in 800ms");
      // Set a delay (e.g. 500ms) to give Firebase Auth a chance to rehydrate.
      const timer = setTimeout(() => {
        console.log("Redirecting to login now");
        router.push(`/?redirect=${encodeURIComponent(router.asPath)}`);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (!loading && authUser && !hasRequiredRole(authUser, requiredRole)) {
      console.log("User does not have required role for this page");
      router.push("/dashboard");
    }
  }, [authUser, loading, requiredRole, router]);

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

  if (!authUser) return null;
  if (!hasRequiredRole(authUser, requiredRole)) return null;

  return <>{children}</>;
};

export default LoggedIn;
