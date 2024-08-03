// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_SECRET,
  authDomain: process.env.FIREBASE_URL,
  projectId: "pos-system-d288b",
  storageBucket: process.env.FIREBASE_STORAGE,
  messagingSenderId: "477090000716",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-P9EYXWL0VT"
};