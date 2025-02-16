// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// Function to get Firebase configuration
const getFirebaseConfig = () => {
  const config = window._env_;
  
  if (!config) {
    console.error('Firebase configuration not found');
    return null;
  }
  
  return {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId || null // Optional
  };
};

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
if (firebaseConfig) {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app); // Initialize Analytics
  console.log('Firebase Analytics initialized successfully');
} else {
  console.error('Failed to initialize Firebase Analytics due to missing configuration.');
} 