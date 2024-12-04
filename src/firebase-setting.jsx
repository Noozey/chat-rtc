// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdtI1wWgZ2-6sF9Qmkkdhk0HE1wmmxZcY",
  authDomain: "chat-rtc-a3e4a.firebaseapp.com",
  projectId: "chat-rtc-a3e4a",
  storageBucket: "chat-rtc-a3e4a.firebasestorage.app",
  messagingSenderId: "659592126143",
  appId: "1:659592126143:web:d02caaca0c2e231434300a",
  measurementId: "G-1K3ZMREWKB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const data = getFirestore(app);
