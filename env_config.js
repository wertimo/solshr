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

function loadConfig() {
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const configPath = isDevelopment ? 'env-config.dev.js' : 'env_config.js';

    console.log('Environment:', isDevelopment ? 'development' : 'production');
    console.log('Attempting to load config from:', configPath);

    fetch(configPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load config from ${configPath}`);
            }
            return response.text();
        })
        .then(text => {
            eval(text);
            console.log('Successfully loaded config from:', configPath);
            initializeFirebase();
        })
        .catch(error => {
            console.error('Configuration loading failed:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window._env_) {
        loadConfig();
    } else {
        initializeFirebase();
    }
});

function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase is not loaded. Check your script tags.');
        return;
    }

    const firebaseConfig = window._env_;
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.error('Firebase configuration is missing. Check env-config.js is loaded.');
        return;
    }

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    setupFormHandling(db);
}

function setupFormHandling(db) {
    const form = document.getElementById('responseForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted - starting process');

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;

            try {
                const responsesRef = db.ref('responses');
                const newResponse = {
                    name: name,
                    email: email,
                    comment: comment,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                };

                const result = await responsesRef.push(newResponse);
                console.log('Push successful, new key:', result.key);

                alert('Thank you for joining the waitlist!');
                form.reset();
                modal.style.display = 'none';
            } catch (error) {
                console.error('Submission error:', error);
                alert('There was an error submitting your response. Please try again.');
            }
        });
    }
}

