// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLpGZ477iwbEPuH7sTFGxLEnw7pEfbYmY",
  authDomain: "todolist-f0708.firebaseapp.com",
  projectId: "todolist-f0708",
  storageBucket: "todolist-f0708.firebasestorage.app",
  messagingSenderId: "709556967626",
  appId: "1:709556967626:web:275b2688e9408417f5bc33",
  measurementId: "G-2NWCWPWEDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
