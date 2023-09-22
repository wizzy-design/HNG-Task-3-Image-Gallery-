// Import the functions you need from the SDKs you need
// This is the file where i configure Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "image-gallery-app-f5cdb.firebaseapp.com",
  projectId: "image-gallery-app-f5cdb",
  storageBucket: "image-gallery-app-f5cdb.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_MESSAGE_ID,
  appId: "1:657236266606:web:c705e136cf42cb001b207f",
  measurementId: "G-BNQ2VXS1CV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// To access the currently authenticated user
export const user = auth.currentUser;
