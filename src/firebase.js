// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"; // 👈 Buraya dikkat
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnJrhi98EbqGmMkuIsT17gA2TIMYI_l20",
    authDomain: "rekabetciyayinlari-2bbe8.firebaseapp.com",
    projectId: "rekabetciyayinlari-2bbe8",
    storageBucket: "rekabetciyayinlari-2bbe8.firebasestorage.app",
    messagingSenderId: "439494226547",
    appId: "1:439494226547:web:46f3d9457b4f8a721a3006"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  export const auth = getAuth(app);
  export const db = getFirestore(app);