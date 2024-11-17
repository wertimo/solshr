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
    const modal = document.getElementById('formModal');
    
    console.log('Nav button:', navButton);
    console.log('Hero button:', heroButton);
    console.log('Newsletter button:', newsletterButton);
    console.log('Modal element:', modal);

    // Function to open modal
    const openModal = (e) => {
        e.preventDefault();
        console.log('Opening modal');
        modal.style.display = 'block';
        modal.classList.add('show'); // Add show class for animation
    };

    // Add click handlers to all buttons
    [navButton, heroButton, newsletterButton].forEach(button => {
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

    // Your Firebase configuration - make sure these values are correct
    const firebaseConfig = {
        apiKey: "your-actual-api-key",
        authDomain: "solshr-social.firebaseapp.com",
        databaseURL: "https://solshr-social-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "solshr-social",
        storageBucket: "solshr-social.appspot.com",
        messagingSenderId: "your-actual-sender-id",
        appId: "your-actual-app-id"
    };

    // Initialize Firebase using compat version
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    const form = document.getElementById('responseForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted - starting process');

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            try {
                const responsesRef = db.ref('responses');
                
                const newResponse = {
                    name: name,
                    email: email,
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