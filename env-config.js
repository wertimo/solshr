// Function to get Firebase configuration
const getFirebaseConfig = () => {
    // Check if the _env_ object is defined
    const config = window._env_;
    return config;
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
    measurementId: "G-Z8NXBVCDY9",
    STRIPE_PUBLISHABLE_KEY: "${{ secrets.STRIPE_PUBLISHABLE_KEY }}",
    STRIPE_SECRET_KEY: "${{ secrets.STRIPE_SECRET_KEY }}",
    STRIPE_WEBHOOK_SECRET: "${{ secrets.STRIPE_WEBHOOK_SECRET }}"
};

// For browser usage
if (typeof window !== 'undefined') {
  window.getFirebaseConfig = getFirebaseConfig;
}

// For module usage
if (typeof module !== 'undefined') {
  module.exports = { getFirebaseConfig };
}