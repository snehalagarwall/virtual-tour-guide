// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWsUGsRUKob0fp9wrsPbLiC8e1b8WgSEE",
  authDomain: "virtual-tour-guide-e0425.firebaseapp.com",
  projectId: "virtual-tour-guide-e0425",
  storageBucket: "virtual-tour-guide-e0425.appspot.com",
  messagingSenderId: "976035683984",
  appId: "1:976035683984:web:8346f9de3cc0619fda0215",
  measurementId: "G-LZG2B19CD1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);