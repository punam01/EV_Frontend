// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAr6aOLtkfyY0_GV7UXD7P0dA-wroRjww",
  authDomain: "auth-otp-ab2dd.firebaseapp.com",
  projectId: "auth-otp-ab2dd",
  storageBucket: "auth-otp-ab2dd.appspot.com",
  messagingSenderId: "272650269656",
  appId: "1:272650269656:web:ba9e9c7e91a0895456f8ad",
  measurementId: "G-9GHD08FE4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app); 