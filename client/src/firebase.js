// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// Prefer Vite environment variables (VITE_FIREBASE_*) for local config.
// If they are not provided, fall back to the embedded values.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCfICVftPBhWjtqreH4E7ircIzbCGCyjEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "laundry-management-73dd1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "laundry-management-73dd1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "laundry-management-73dd1.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "818899466987",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:818899466987:web:f2f5a935ea024d3b3edcae",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VL92Q0NFGQ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// debug: log that firebase was initialized (do not log secrets in production)
console.debug('Firebase initialized with projectId=', firebaseConfig.projectId)

// Export Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Export config for debug/UI
export { firebaseConfig }

export const firebaseInitialized = true
