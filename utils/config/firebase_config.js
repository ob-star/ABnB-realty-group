// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "abnb-group.firebaseapp.com",
  projectId: "abnb-group",
  storageBucket: "abnb-group.firebasestorage.app",
  messagingSenderId: "912818123037",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: "G-6271Y0V95Z"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
