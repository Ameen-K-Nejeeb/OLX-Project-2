// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Osf7BgM1hAIZZIF4LHTblY5NPBQahNw",
  authDomain: "olx-project-2.firebaseapp.com",
  projectId: "olx-project-2",
  storageBucket: "olx-project-2.firebasestorage.app",
  messagingSenderId: "786338685869",
  appId: "1:786338685869:web:f426cbfa87f08075e8f724",
  measurementId: "G-FWLJMHJDKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);