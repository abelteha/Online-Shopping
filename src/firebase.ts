// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { get } from "immer/dist/internal";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtC4a-ge3O-RgGH-Huy4p0Mj_8kKDnFi4",
  authDomain: "ecommerce-auth-7369e.firebaseapp.com",
  databaseURL:
    "https://ecommerce-auth-7369e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecommerce-auth-7369e",
  storageBucket: "ecommerce-auth-7369e.appspot.com",
  messagingSenderId: "721396743990",
  appId: "1:721396743990:web:e2295cb54876c4cc63bd97",
  measurementId: "G-1408CH91DW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);
