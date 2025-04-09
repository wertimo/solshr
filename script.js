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

// Google Analytics setup
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Z8NXBVCDY9');

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
            : ['env-config.js'];

        console.log('Environment:', isDevelopment ? 'development' : 'production');
        console.log('Current path:', window.location.pathname);

        const loadConfig = async () => {
            for (const path of configPaths) {
                try {
                    console.log('Attempting to load config from:', path);
                    const response = await fetch(path);
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

    // Dark Mode Toggle Functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleButton) { // Check if the button exists
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Change the icon based on the current mode
            if (body.classList.contains('dark-mode')) {
                themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
            } else {
                themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
            }
        });
    }

    // Add to your script.js file
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('languageSelect');
        const icon = document.querySelector('.fa-globe');
        
        // Skip if clicking on the globe icon (let the toggle function handle it)
        if (event.target === icon) return;
        
        // Hide dropdown when clicking outside of it
        if (dropdown && dropdown.style.display === 'block' && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    function updateSavings() {
        const amountInvested = parseFloat(document.getElementById('amount-invested').value);
        const powerGenerated = parseFloat(document.getElementById('power-generated').value);
        const potentialSavings = parseFloat(document.getElementById('potential-savings').value);

        // Constants
        const kWhPerKW = 1200; // kWh generated per kW per year
        const savingsMultiplier = 1.67; // Savings multiplier
        const savingsDivisor = 24; // Divisor for savings calculation

        // Calculate power generated based on amount invested
        const calculatedPowerGenerated = (amountInvested / 1000) * 2.4; // Assuming 2.4 kW per 1000 EUR
        const calculatedPotentialSavings = (calculatedPowerGenerated * kWhPerKW * savingsMultiplier) / savingsDivisor;

        // Update displayed values
        document.getElementById('amount-invested-value').innerText = `€${amountInvested}`;
        document.getElementById('power-generated').value = calculatedPowerGenerated.toFixed(2);
        document.getElementById('power-generated-value').innerText = `${calculatedPowerGenerated.toFixed(2)} kWh`;
        document.getElementById('potential-savings').value = calculatedPotentialSavings.toFixed(2);
        document.getElementById('potential-savings-value').innerText = `€${calculatedPotentialSavings.toFixed(2)}`;

        // Calculate CO2 reduction (example calculation)
        const co2Reduction = (calculatedPowerGenerated * 0.5).toFixed(2); // Example: 0.5 kg CO2 saved per kWh
        document.getElementById('co2-reduction').innerText = `${co2Reduction} kg CO2`;
    }

    // Add event listeners to the sliders to update other values accordingly
    document.getElementById('amount-invested').addEventListener('input', function() {
        const amountInvested = parseFloat(this.value);
        const calculatedPowerGenerated = (amountInvested / 1000) * 2.4; // Calculate power generated
        const calculatedPotentialSavings = (calculatedPowerGenerated * 1200 * 1.67) / 24; // Calculate potential savings

        document.getElementById('power-generated').value = calculatedPowerGenerated.toFixed(2);
        document.getElementById('potential-savings').value = calculatedPotentialSavings.toFixed(2);
        updateSavings(); // Update all values
    });

    document.getElementById('power-generated').addEventListener('input', function() {
        const powerGenerated = parseFloat(this.value);
        const calculatedAmountInvested = (powerGenerated / 2.4) * 1000; // Reverse calculation for amount invested
        const calculatedPotentialSavings = (powerGenerated * 1.67 * 1200) / 24; // Calculate potential savings

        document.getElementById('amount-invested').value = calculatedAmountInvested.toFixed(2);
        document.getElementById('potential-savings').value = calculatedPotentialSavings.toFixed(2);
        updateSavings(); // Update all values
    });

    document.getElementById('potential-savings').addEventListener('input', function() {
        const potentialSavings = parseFloat(this.value);
        const calculatedPowerGenerated = (potentialSavings * 24) / (1.67 * 1200); // Reverse calculation for power generated
        const calculatedAmountInvested = (calculatedPowerGenerated / 2.4) * 1000; // Reverse calculation for amount invested

        document.getElementById('power-generated').value = calculatedPowerGenerated.toFixed(2);
        document.getElementById('amount-invested').value = calculatedAmountInvested.toFixed(2);
        updateSavings(); // Update all values
    });

    // Initial call to set values correctly on page load
    updateSavings();
});

