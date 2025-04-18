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
                        const configData = await response.json(); // Assuming the config is in JSON format
                        window._env_ = configData; // Assign the loaded config directly
                        console.log('Successfully loaded config:', window._env_);
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
                const termsAccepted = document.getElementById('terms-checkbox').checked;
                
                // Validate terms checkbox
                if (!termsAccepted) {
                    alert('Please agree to the Privacy Policy and Terms & Conditions');
                    return;
                }

                try {
                    const responsesRef = db.ref('responses');
                    
                    const newResponse = {
                        name: name,
                        email: email,
                        comment: comment,
                        termsAccepted: termsAccepted,
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
    
    // Calculator
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

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });

    // Initialize all range inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    // Set initial values
    rangeInputs.forEach(function(input) {
        updateRangeProgress(input);
        
        // Update on input change
        input.addEventListener('input', function() {
            updateRangeProgress(this);
        });
    });
    
    function updateRangeProgress(input) {
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const value = parseFloat(input.value);
        
        // Calculate the percentage
        const percentage = ((value - min) / (max - min)) * 100;
        
        // Apply background gradient for WebKit browsers
        input.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #cccccc ${percentage}%, #cccccc 100%)`;
        
        // Since all sliders are connected, update all sliders with the same percentage
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            if (slider !== input) {
                // Calculate the relative value for this slider based on the percentage
                const sliderMin = parseFloat(slider.min) || 0;
                const sliderMax = parseFloat(slider.max) || 100;
                const sliderValue = (percentage / 100) * (sliderMax - sliderMin) + sliderMin;
                
                // Apply the same gradient
                slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #cccccc ${percentage}%, #cccccc 100%)`;
            }
        });
    }

    // Set up scroll animations for calculator section
    function setupCalcAnimations() {
        const calculator = document.getElementById('calculator');
        if (!calculator) return;
        
        const toggleGroups = document.querySelectorAll('.toggle-group');
        const results = document.querySelector('.results');
        
        // Function to check if element is in viewport
        function isInViewport(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (0.8 - offset) &&
                rect.bottom >= 0
            );
        }
        
        // Handle scroll animation
        function handleScrollAnimation() {
            // Animate calculator section
            if (isInViewport(calculator)) {
                calculator.classList.add('visible');
                
                // Animate toggle groups with delay
                toggleGroups.forEach(group => {
                    group.classList.add('visible');
                });
                
                // Animate results
                if (results) {
                    results.classList.add('visible');
                }
            }
        }
        
        // Check on load and scroll
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
    }

    // Initialize animations
    setupCalcAnimations();
    
    // Fix for checkbox links
    const policyLinks = document.querySelectorAll('.checkbox-group label a');
    
    // Add event listener to each link
    policyLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Stop the event from propagating to the label
        e.stopPropagation();
        // This prevents the checkbox from toggling when the link is clicked
      });
    });

    // Add this to your existing event listeners
    document.getElementById('joinWaitlistButton').addEventListener('click', (e) => {
        e.preventDefault();
        const formModal = document.getElementById('formModal');
        formModal.style.display = 'block';
        formModal.classList.add('show');
    });

    function showAuthModal(mode) {
        console.log('Showing auth modal for:', mode);
        isSignUp = mode === 'signup';
        updateAuthForm();
        authModal.style.display = 'block';
        authModal.classList.add('show');
    }
});

