
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth.js';
import { getFirestore, setDoc, doc} from firebase-firestore.js


const firebaseConfig = {
  apiKey: "AIzaSyBpKOoz1ji5ys-DsSHa1hyJSfYCYq-E-ZE",
  authDomain: "login-form-60586.firebaseapp.com",
  projectId: "login-form-60586",
  storageBucket: "login-form-60586.firebasestorage.app",
  messagingSenderId: "350863819672",
  appId: "1:350863819672:web:282e25341dcd55d9aae1ed"
};

const app = initializeApp(firebaseConfig);