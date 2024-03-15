import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const key = import.meta.env.VITE_FIREBASE_KEY;
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: `${key}`,
  authDomain: "moviebase-v1.firebaseapp.com",
  projectId: "moviebase-v1",
  storageBucket: "moviebase-v1.appspot.com",
  messagingSenderId: "184036212451",
  appId: "1:184036212451:web:5d8a706750a15cebe48fd6",
  measurementId: "G-N47M9MW52W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
