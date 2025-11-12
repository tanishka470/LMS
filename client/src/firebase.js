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
  storageBucket: "laundry-management-73dd1.firebasestorage.app",
  messagingSenderId: "818899466987",
  appId: "1:818899466987:web:f2f5a935ea024d3b3edcae",
  measurementId: "G-VL92Q0NFGQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
