import { useState, useEffect } from "react";
import Firebase from "./Firebase";

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});
console.log("check");
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
  
  const signInWithEmailAndPassword = (email, password) => {
    console.log(email + "," + password)
    Firebase.auth().signInWithEmailAndPassword(email, password);
  }

  const createUserWithEmailAndPassword = (email, password) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () => Firebase.auth().signOut().then(clear);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
