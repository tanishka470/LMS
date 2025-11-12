// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfICVftPBhWjtqreH4E7ircIzbCGCyjEY",
  authDomain: "laundry-management-73dd1.firebaseapp.com",
  projectId: "laundry-management-73dd1",
  storageBucket: "laundry-management-73dd1.appspot.com",
  messagingSenderId: "818899466987",
  appId: "1:818899466987:web:f2f5a935ea024d3b3edcae",
  measurementId: "G-VL92Q0NFGQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// debug: log that firebase was initialized (do not log secrets in production)
console.debug('Firebase initialized with projectId=', firebaseConfig.projectId)

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
