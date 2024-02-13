// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "firebase_app_api_key",
  authDomain: "de-samadhan.firebaseapp.com",
  projectId: "de-samadhan",
  storageBucket: "de-samadhan.appspot.com",
  messagingSenderId: "862779802213",
  appId: "1:862779802213:web:0bedd66b46d19ad0747c8c"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
module.exports = db;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
