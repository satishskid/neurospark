import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCW4Hqi55SWtHt8PMiQk6NrgHnzD_IgAmo",
  authDomain: "neurospark-e728e.firebaseapp.com",
  projectId: "neurospark-e728e",
  storageBucket: "neurospark-e728e.firebasestorage.app",
  messagingSenderId: "128846511485",
  appId: "1:128846511485:web:b137dd890c6cb025a2e014"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);