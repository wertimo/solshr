const getFirebaseConfig = () => {
  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL, // This is crucial for Realtime Database
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_GA_TRACKING_ID
  };

  // Validate the databaseURL is present
  if (!config.databaseURL) {
    throw new Error('Firebase databaseURL is required for Realtime Database');
  }

  return config;
};

export { getFirebaseConfig };