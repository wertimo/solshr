// Add this at the top of your script.js file
function toggleMenu() {
    const navList = document.querySelector('nav ul');
    const burger = document.querySelector('.burger');
    
    if (navList) {
        navList.classList.toggle('show');
        console.log('Toggled menu');
    }

    // Optional: Animate burger menu
    if (burger) {
        burger.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Add early debugging
    console.log('Script loaded');
    console.log('Window _env_:', window._env_);
    console.log('Document readyState:', document.readyState);
    
    // Try to load config file if not present
    if (!window._env_) {
        console.log('Config not found, attempting to load');
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        const configPaths = isDevelopment 
            ? ['env-config.dev.js'] 
            : [
                './env-config.js',
                '../env-config.js',
                'env-config.js'
              ];

        console.log('Environment:', isDevelopment ? 'development' : 'production');
        console.log('Location:', window.location.href);
        console.log('Pathname:', window.location.pathname);
        console.log('Config paths to try:', configPaths);

        const loadConfig = async () => {
            for (const path of configPaths) {
                try {
                    console.log('Attempting to load config from:', path);
                    const response = await fetch(path, {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        }
                    });
                    if (response.ok) {
                        const text = await response.text();
                        console.log('Successfully loaded config from:', path);
                        eval(text);
                        return true;
                    }
                } catch (error) {
                    console.log(`Failed to load from ${path}:`, error.message);
                }
            }
            throw new Error('Failed to load configuration from any path');
        };

        // Initialize Firebase after config is loaded
        loadConfig()
            .then(() => {
                initializeFirebase();
            })
            .catch(error => {
                console.error('Configuration loading failed:', error);
                if (isDevelopment) {
                    console.error('Development config file (env-config.dev.js) not found. Please create this file with your development Firebase configuration.');
                }
            });
    } else {
        // Config already exists, initialize Firebase directly
        initializeFirebase();
    }

    // Move Firebase initialization to a separate function
    function initializeFirebase() {
        // Check if Firebase is loaded
        if (typeof firebase === 'undefined') {
            console.error('Firebase is not loaded. Check your script tags.');
            return;
        }

        const firebaseConfig = window._env_;

        // Add check for valid config
        if (!firebaseConfig || !firebaseConfig.apiKey) {
            console.error('Firebase configuration is missing. Check env-config.js is loaded.');
            return;
        }

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();

        // Setup form handling
        setupFormHandling(db);
    }

    // Move form handling to a separate function
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

    // Add burger menu click handler
    const burger = document.querySelector('.burger');
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Get all join waitlist buttons
    const navButton = document.getElementById('joinWaitlistButton');
    const heroButton = document.getElementById('joinWaitlistHero');
    const newsletterButton = document.getElementById('joinWaitlistNewsletter');
    const scrollerButton = document.getElementById('joinWaitlistScroller');
    const modal = document.getElementById('formModal');
    
    console.log('Nav button:', navButton);
    console.log('Hero button:', heroButton);
    console.log('Newsletter button:', newsletterButton);
    console.log('Scroller button:', scrollerButton);
    console.log('Modal element:', modal);

    // Function to open modal
    const openModal = (e) => {
        e.preventDefault();
        console.log('Opening modal');
        modal.style.display = 'block';
        modal.classList.add('show'); // Add show class for animation
    };

    // Add click handlers to all buttons
    [navButton, heroButton, newsletterButton, scrollerButton].forEach(button => {
        if (button) {
            button.addEventListener('click', openModal);
            console.log('Added click handler to button:', button.id);
        }
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match this with your CSS transition time
    };

    // Close modal when clicking outside or on close button
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close button handler
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

