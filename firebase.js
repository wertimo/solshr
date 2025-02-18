// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { logEvent } from "firebase/analytics";

// Log a test event
logEvent(analytics, 'notification_received', {
  message: 'Test notification'
});

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
if (firebaseConfig) {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
} else {
  console.error('Failed to initialize Firebase due to missing configuration.');
}

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

