// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNgegztT3dnL50HRcVBexr0LlhjEOod2U",
  authDomain: "forms-3f450.firebaseapp.com",
  projectId: "forms-3f450",
  storageBucket: "forms-3f450.appspot.com",
  messagingSenderId: "54670370104",
  appId: "1:54670370104:web:7fe8179c4a85f14f754dcd",
  measurementId: "G-931QSCMQ6E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const db = firebase.firestore();
export const auth = getAuth();
export const user = auth.currentUser;
