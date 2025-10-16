// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLjCkD09Nwm0rC1eKB_yWIqOPiwyjZJZU",
  authDomain: "personal-finance-tracker-29552.firebaseapp.com",
  projectId: "personal-finance-tracker-29552",
  storageBucket: "personal-finance-tracker-29552.firebasestorage.app",
  messagingSenderId: "911957035745",
  appId: "1:911957035745:web:c9c7ce71d3dcaa28b945a0",
  measurementId: "G-8S9F1QXHJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};