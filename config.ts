// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7h1BOzlw_1lLLEASTkOjOrTDB5O64hic",
  authDomain: "shadow-talk-fba95.firebaseapp.com",
  projectId: "shadow-talk-fba95",
  storageBucket: "shadow-talk-fba95.firebasestorage.app",
  messagingSenderId: "328053960955",
  appId: "1:328053960955:web:06e4b5a68768cb95de405e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
