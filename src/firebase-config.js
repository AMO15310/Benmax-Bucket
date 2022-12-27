import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGsxgu8slMpckIxFUEK_198D7uqBuul2A",
  authDomain: "benmax-bucket.firebaseapp.com",
  projectId: "benmax-bucket",
  storageBucket: "benmax-bucket.appspot.com",
  messagingSenderId: "951257768881",
  appId: "1:951257768881:web:92aa45cbe17cadb9541390",
  measurementId: "G-E475TWEQF9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
