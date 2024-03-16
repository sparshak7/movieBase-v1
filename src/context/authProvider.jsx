import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setisLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
