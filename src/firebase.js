import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRb5CfkIIXbUEYG5cnfaWxZPTO44T0gQ0",
    authDomain: "vitagaurd-3739d.firebaseapp.com",
    projectId: "vitagaurd-3739d",
    storageBucket: "vitagaurd-3739d.firebasestorage.app",
    messagingSenderId: "1026762924536",
    appId: "1:1026762924536:web:cfe77fd270867a5055f60d"
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
