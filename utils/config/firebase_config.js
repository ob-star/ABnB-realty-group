// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVuNJDjbuWAZGHr4q01PFZI5Ncqv85pP4",
  authDomain: "abnb-group.firebaseapp.com",
  projectId: "abnb-group",
  storageBucket: "abnb-group.firebasestorage.app",
  messagingSenderId: "912818123037",
  appId: "1:912818123037:web:2317ea4747896a797f71f4",
  measurementId: "G-6271Y0V95Z"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
