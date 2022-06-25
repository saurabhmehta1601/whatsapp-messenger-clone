import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHPVLDWu_V0OAuUeDrmVW3yATM_XjGVJk",
  authDomain: "whatsapp-clone-33c55.firebaseapp.com",
  projectId: "whatsapp-clone-33c55",
  storageBucket: "whatsapp-clone-33c55.appspot.com",
  messagingSenderId: "403831689022",
  appId: "1:403831689022:web:f24c612c9d17b48af5e66f",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
