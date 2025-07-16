import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA79rboSWMThMwBK8f2G2i2UZENbFfeojE",
  authDomain: "letswork-80bcb.firebaseapp.com",
  projectId: "letswork-80bcb",
  storageBucket: "letswork-80bcb.firebasestorage.app",
  messagingSenderId: "691292383081",
  appId: "1:691292383081:web:5831bdc776db187efa7ff8",
  measurementId: "G-N3VD0PWF5N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db };
