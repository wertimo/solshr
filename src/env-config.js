const getFirebaseConfig = () => {
  // Try to get runtime config first
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
    measurementId: config.measurementId
  };
};

// For browser usage
if (typeof window !== 'undefined') {
  window.getFirebaseConfig = getFirebaseConfig;
}

// For module usage
if (typeof module !== 'undefined') {
  module.exports = { getFirebaseConfig };
}