// Firebase Configuration
// TODO: Replace with your actual project config keys
const firebaseConfig = {
    apiKey: "AIzaSyBFadV2nRIpzxvXIkY77wqsFyAASuXjDjc",
    authDomain: "shaifly-count-download.firebaseapp.com",
    projectId: "shaifly-count-download",
    storageBucket: "shaifly-count-download.firebasestorage.app",
    messagingSenderId: "233333471094",
    appId: "1:233333471094:web:31048db979b1b66f352c57",
    measurementId: "G-TBKNWM1C4X"
};

// Initialize Firebase safely
if (typeof firebase !== 'undefined') {
    try {
        // Prevent multiple initializations
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // Initialize Firestore
        const db = firebase.firestore();
    } catch (e) {
        console.error("Firebase Initialization Error:", e);
        console.warn("Please check your firebase-config.js keys.");
    }
} else {
    console.error("Firebase SDK not loaded");
}
