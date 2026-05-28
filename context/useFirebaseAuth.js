import { useState, useEffect } from "react";
import Firebase, { auth } from "./Firebase";
import {
  ALLOWED_EMAIL_DOMAIN,
  getRoleFromClaims,
  isAdminEmail,
  isAllowedEmailDomain,
  USER_ROLES,
} from "../utils/authAccess";

const DOMAIN_ERROR_MESSAGE = `Only @${ALLOWED_EMAIL_DOMAIN} accounts are allowed to sign in.`;

const formatAuthUser = async (user, forceRefresh = false) => {
  const tokenResult = await user.getIdTokenResult(forceRefresh);
  const claims = tokenResult && tokenResult.claims ? tokenResult.claims : {};
  const role = isAdminEmail(user.email)
    ? USER_ROLES.ADMIN
    : getRoleFromClaims(claims);
  const isAdmin = role === USER_ROLES.ADMIN;

  return {
    uid: user.uid,
    email: user.email,
    role,
    isAdmin,
    claims,
  };
};

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setAuthError("");
      setLoading(false);
      return;
    }

    if (!isAllowedEmailDomain(authState.email)) {
      setAuthError(DOMAIN_ERROR_MESSAGE);
      try {
        await auth.signOut();
      } catch (error) {
        console.error("Error signing out unauthorized domain user:", error);
      }
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAuthError("");
    try {
      // Force-refresh token claims so role updates (custom claims) are picked up immediately.
      const formattedUser = await formatAuthUser(authState, true);
      setAuthUser(formattedUser);
    } catch (error) {
      console.error("Error formatting auth user:", error);
      setAuthUser({
        uid: authState.uid,
        email: authState.email,
        role: USER_ROLES.REGULAR,
        isAdmin: false,
        claims: {},
      });
    }
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setAuthError("");
    setLoading(true);
  };

  //sign in with google
  const signInWithGoogle = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
      hd: ALLOWED_EMAIL_DOMAIN,
    });

    return auth.signInWithRedirect(provider).catch((error) => {
      console.error("Google Sign-In Error:", error);
      throw error;
    });
  };

  const signOut = () => auth.signOut().then(clear);

  const refreshAuthUserClaims = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    setLoading(true);
    const refreshedUser = await formatAuthUser(currentUser, true);
    setAuthUser(refreshedUser);
    setLoading(false);
    return refreshedUser;
  };

  // Listen for Firebase auth state changes
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    let unsubscribe;
    auth
      .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // Now set up the listener
        unsubscribe = auth.onAuthStateChanged(authStateChanged);
      })
      .catch((error) => console.error("Error setting persistence:", error));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    authUser,
    loading,
    authError,
    signInWithGoogle,
    signOut,
    refreshAuthUserClaims,
  };
}
