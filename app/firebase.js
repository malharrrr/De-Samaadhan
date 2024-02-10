// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI8Hp5Fo9s31wVE1nH1LTUF1SJEqx2Kzg",
  authDomain: "de-samadhan.firebaseapp.com",
  projectId: "de-samadhan",
  storageBucket: "de-samadhan.appspot.com",
  messagingSenderId: "862779802213",
  appId: "1:862779802213:web:0bedd66b46d19ad0747c8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);