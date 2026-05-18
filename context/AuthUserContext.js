import { createContext, useContext } from "react";
import useFirebaseAuth from "./useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  authError: "",
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshAuthUserClaims: async () => null,
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
