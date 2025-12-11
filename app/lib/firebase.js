import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Config for FireBase
const firebaseConfig = {
  apiKey: "AIzaSyBpKOoz1ji5ys-DsSHa1hyJSfYCYq-E-ZE",
  authDomain: "login-form-60586.firebaseapp.com",
  projectId: "login-form-60586",
  storageBucket: "login-form-60586.firebasestorage.app",
  messagingSenderId: "350863819672",
  appId: "1:350863819672:web:282e25341dcd55d9aae1ed"
};

// Starts Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 