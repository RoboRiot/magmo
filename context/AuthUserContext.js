import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "./useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
<<<<<<< HEAD

export const useAuth = () => useContext(authUserContext);
=======
export const useAuth = () => useContext(authUserContext);
>>>>>>> df9194ffb0f9cf9b08e887e3fd681f32cd0f7c13
