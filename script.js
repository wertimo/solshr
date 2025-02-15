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

    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('Firebase is not loaded. Check your script tags.');
        return;
    }

    // Initialize Firebase using compat version
    const firebaseConfig = window._env_ ? {
        apiKey: window._env_.REACT_APP_API_KEY,
        authDomain: window._env_.REACT_APP_AUTH_DOMAIN,
        databaseURL: window._env_.REACT_APP_DATABASE_URL,
        projectId: window._env_.REACT_APP_PROJECT_ID,
        storageBucket: window._env_.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: window._env_.REACT_APP_MESSAGING_SENDER_ID,
        appId: window._env_.REACT_APP_APP_ID
    } : {};

    // Add check for valid config
    if (!firebaseConfig.apiKey) {
        console.error('Firebase configuration is missing. Check env-config.js is loaded.');
        return;
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

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
});

