import { useState, useEffect } from "react";
import Firebase, { auth } from "./Firebase";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  //sign in with google
  const signInWithGoogle = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        const userEmail = result.user.email;
        // Check if the email ends with the specified domain
        if (!userEmail.endsWith("@advancedimagingparts.com")) {
          // Log the user out if they are not from the allowed domain
          auth.signOut();
          throw new Error("Only @advancedimagingparts.com emails are allowed.");
        }
        return result.user;
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        throw error;
      });
  };

  const signOut = () => auth.signOut().then(clear);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
