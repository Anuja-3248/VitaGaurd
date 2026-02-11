import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJgTEheRU5NvH0ihCRmKUwAkTJEKqs6fs",
    authDomain: "vitaguard-cc314.firebaseapp.com",
    projectId: "vitaguard-cc314",
    storageBucket: "vitaguard-cc314.firebasestorage.app",
    messagingSenderId: "383290056908",
    appId: "1:383290056908:web:24f7a711365d483d45e269",
    measurementId: "G-350HQ3H4YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use initializeFirestore with settings for better connectivity
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false
});

export default app;
