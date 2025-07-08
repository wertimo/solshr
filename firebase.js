// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { ref, set } from "firebase/database";

// Log a test event
logEvent(analytics, 'notification_received', {
  message: 'Test notification'
});

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
let app = null;
let auth = null;
let analytics = null;
let database = null;

const firebaseConfig = getFirebaseConfig();
if (firebaseConfig) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
  
  // Initialize analytics only if measurementId is provided
  if (firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }
  
  console.log('Firebase initialized successfully');
} else {
  console.error('Failed to initialize Firebase due to missing configuration.');
}

// Export Firebase instances
export { app, auth, analytics, database, getFirebaseConfig };
