import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcx2MiwoVRodKHS_JSaeN2GFttfatib28",
  authDomain: "tumin-tutor.firebaseapp.com",
  projectId: "tumin-tutor",
  storageBucket: "tumin-tutor.appspot.com",
  messagingSenderId: "880650428288",
  appId: "1:880650428288:web:a452ec4a21789e87cc2b65",
  measurementId: "G-GJQZZ3WQXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
