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

document.addEventListener('DOMContentLoaded', function() {
    if (!window._env_) {
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const configPaths = isDevelopment ? ['env-config.dev.js'] : ['env_config.js'];

        const loadConfig = async () => {
            for (const path of configPaths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        const text = await response.text();
                        eval(text);
                        return true;
                    }
                } catch (error) {
                    console.error(`Failed to load from ${path}:`, error.message);
                }
            }
            throw new Error('Failed to load configuration from any path');
        };

        loadConfig().then(() => {
            initializeFirebase();
        }).catch(error => {
            console.error('Configuration loading failed:', error);
        });
    } else {
        initializeFirebase();
    }
});