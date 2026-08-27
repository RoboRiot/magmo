import { useState, useEffect } from "react";
import Firebase, { auth } from "./Firebase";
import {
  ALLOWED_EMAIL_DOMAIN,
  canAccessMagmo,
  getEffectiveRole,
  isAccessRevokedError,
  isAdminRole,
  USER_ROLES,
} from "../utils/authAccess";

const ACCESS_ERROR_MESSAGE = `Only @${ALLOWED_EMAIL_DOMAIN} accounts and approved Viewer accounts can sign in.`;

const formatAuthUser = async (user, forceRefresh = false) => {
  const tokenResult = await user.getIdTokenResult(forceRefresh);
  const claims = tokenResult && tokenResult.claims ? tokenResult.claims : {};
  const role = getEffectiveRole(user.email, claims);
  const isAdmin = isAdminRole(role);
  const displayName =
    String(claims.magmoName || user.displayName || "").trim() ||
    String(user.email || "").split("@")[0];

  return {
    uid: user.uid,
    email: user.email,
    displayName,
    name: displayName,
    role,
    isAdmin,
    isMasterAdmin: role === USER_ROLES.MASTER_ADMIN,
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

    setLoading(true);
    setAuthError("");
    try {
      // Force-refresh token claims so role updates (custom claims) are picked up immediately.
      const formattedUser = await formatAuthUser(authState, true);
      if (!canAccessMagmo(authState.email, formattedUser.claims)) {
        setAuthError(ACCESS_ERROR_MESSAGE);
        await auth.signOut();
        setAuthUser(null);
        setLoading(false);
        return;
      }
      setAuthUser(formattedUser);
    } catch (error) {
      console.error("Error formatting auth user:", error);
      if (isAccessRevokedError(error)) {
        setAuthError("Your Magmo access has been removed.");
        try {
          await auth.signOut();
        } catch (signOutError) {
          console.error("Error signing out removed user:", signOutError);
        }
        setAuthUser(null);
        setLoading(false);
        return;
      }
      if (!String(authState.email || "").toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`)) {
        setAuthError(ACCESS_ERROR_MESSAGE);
        try {
          await auth.signOut();
        } catch (signOutError) {
          console.error("Error signing out unauthorized user:", signOutError);
        }
        setAuthUser(null);
        setLoading(false);
        return;
      }
      setAuthUser({
        uid: authState.uid,
        email: authState.email,
        displayName: authState.displayName || authState.email?.split("@")[0] || "",
        name: authState.displayName || authState.email?.split("@")[0] || "",
        role: USER_ROLES.USER,
        isAdmin: false,
        isMasterAdmin: false,
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
    try {
      const refreshedUser = await formatAuthUser(currentUser, true);
      if (!canAccessMagmo(currentUser.email, refreshedUser.claims)) {
        await auth.signOut();
        setAuthUser(null);
        return null;
      }
      setAuthUser(refreshedUser);
      return refreshedUser;
    } catch (error) {
      if (isAccessRevokedError(error)) {
        await auth.signOut();
        setAuthUser(null);
        return null;
      }
      throw error;
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    let checking = false;

    const verifyCurrentUserAccess = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser || checking) return;
      checking = true;
      try {
        await currentUser.reload();
        const refreshedUser = await formatAuthUser(currentUser, true);
        if (!canAccessMagmo(currentUser.email, refreshedUser.claims)) {
          await auth.signOut();
          setAuthUser(null);
          return;
        }
        setAuthUser(refreshedUser);
      } catch (error) {
        if (isAccessRevokedError(error)) {
          try {
            await auth.signOut();
          } catch (signOutError) {
            console.error("Error signing out removed user:", signOutError);
          }
          setAuthUser(null);
          return;
        }
        console.warn("Unable to recheck Magmo access:", error);
      } finally {
        checking = false;
      }
    };

    const intervalId = setInterval(verifyCurrentUserAccess, 30000);
    window.addEventListener("focus", verifyCurrentUserAccess);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", verifyCurrentUserAccess);
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
