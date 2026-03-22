import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFadV2nRIpzxvXIkY77wqsFyAASuXjDjc",
    authDomain: "shaifly-count-download.firebaseapp.com",
    projectId: "shaifly-count-download",
    storageBucket: "shaifly-count-download.firebasestorage.app",
    messagingSenderId: "233333471094",
    appId: "1:233333471094:web:31048db979b1b66f352c57",
    measurementId: "G-TBKNWM1C4X"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
