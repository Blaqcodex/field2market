// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3NlaB_v5lVb2Ba8AnsHGxxMh0CNleB-E",
  authDomain: "field2market-f98a4.firebaseapp.com",
  projectId: "field2market-f98a4",
  storageBucket: "field2market-f98a4.firebasestorage.app",
  messagingSenderId: "484742893901",
  appId: "1:484742893901:web:06236f08bb224b4da6e704",
  measurementId: "G-KEPM74HGYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);