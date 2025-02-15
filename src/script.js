document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');
    console.log('Window _env_:', window._env_);
    console.log('Document readyState:', document.readyState);

    if (!window._env_) {
        console.log('Config not found, attempting to load');
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const configPath = isDevelopment ? 'env-config.dev.js' : 'env-config.js';

        const loadConfig = async () => {
            try {
                console.log('Attempting to load config from:', configPath);
                const response = await fetch(configPath);
                if (response.ok) {
                    const text = await response.text();
                    eval(text);
                    console.log('Successfully loaded config from:', configPath);
                    initializeFirebase();
                } else {
                    console.error('Failed to load config from:', configPath);
                }
            } catch (error) {
                console.error(`Error loading config from ${configPath}:`, error.message);
            }
        };

        loadConfig().catch(error => {
            console.error('Configuration loading failed:', error);
            if (isDevelopment) {
                console.error('Development config file (env-config.dev.js) not found. Please create this file with your development Firebase configuration.');
            }
        });
    } else {
        initializeFirebase();
    }

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

    const burger = document.querySelector('.burger');
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    const navButton = document.getElementById('joinWaitlistButton');
    const heroButton = document.getElementById('joinWaitlistHero');
    const newsletterButton = document.getElementById('joinWaitlistNewsletter');
    const scrollerButton = document.getElementById('joinWaitlistScroller');
    const modal = document.getElementById('formModal');

    const openModal = (e) => {
        e.preventDefault();
        console.log('Opening modal');
        modal.style.display = 'block';
        modal.classList.add('show');
    };

    [navButton, heroButton, newsletterButton, scrollerButton].forEach(button => {
        if (button) {
            button.addEventListener('click', openModal);
            console.log('Added click handler to button:', button.id);
        }
    });

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}); 