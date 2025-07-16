import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD2fdVbBLYNR7UUgC9zxY8Pu5M7QCZmW0w",
  authDomain: "hirescript-81cb7.firebaseapp.com",
  projectId: "hirescript-81cb7",
  storageBucket: "hirescript-81cb7.firebasestorage.app",
  messagingSenderId: "561385522370",
  appId: "1:561385522370:web:6b3b5329e7800f4332275b",
  measurementId: "G-LQX95Z069W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db };
