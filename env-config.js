// Function to get Firebase configuration
const getFirebaseConfig = () => {
    // Check if the _env_ object is defined
    const config = window._env_;
    
    /* If the configuration is not found, log an error and return null
    if (!config) {
        console.error('Firebase configuration not found');
        return null;
    }
    
    // Return the Firebase configuration object
    return {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        databaseURL: config.databaseURL,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
        measurementId: config.measurementId || null // Optional
    }; */
};


// For GitHub Actions
window._env_ = {
    apiKey: "${{ secrets.FIREBASE_API_KEY }}",
    authDomain: "${{ secrets.FIREBASE_AUTH_DOMAIN }}",
    databaseURL: "https://solshr-social-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "${{ secrets.FIREBASE_PROJECT_ID }}",
    storageBucket: "${{ secrets.FIREBASE_STORAGE_BUCKET }}",
    messagingSenderId: "${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}",
    appId: "${{ secrets.FIREBASE_APP_ID }}",
    measurementId: "G-Z8NXBVCDY9"
  };

// For browser usage
if (typeof window !== 'undefined') {
  window.getFirebaseConfig = getFirebaseConfig;
}

// For module usage
if (typeof module !== 'undefined') {
  module.exports = { getFirebaseConfig };
}