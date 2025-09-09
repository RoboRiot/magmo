// components/ProtectedRoute.js
import { useAuth } from '../context/AuthUserContext';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!authUser) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
