const getFirebaseConfig = () => {
  // Try to get runtime config first, fall back to build-time env vars
  const config = window._env_ || process.env;
  
  return {  
    apiKey: config.REACT_APP_API_KEY,
    authDomain: config.REACT_APP_AUTH_DOMAIN,
    databaseURL: config.REACT_APP_DATABASE_URL,
    projectId: config.REACT_APP_PROJECT_ID,
    storageBucket: config.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: config.REACT_APP_MESSAGING_SENDER_ID,
    appId: config.REACT_APP_APP_ID,
    measurementId: config.REACT_APP_GA_TRACKING_ID
  };
};