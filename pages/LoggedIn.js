import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { Container } from 'react-bootstrap';

const LoggedIn = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated and loading is complete
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/');
    }
  }, [authUser, loading, router]);

  // Display loading indicator until auth status is determined
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

  // Render the children only if user is authenticated
  return <>{authUser && children}</>;
};

export default LoggedIn;
