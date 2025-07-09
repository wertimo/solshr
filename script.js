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

function main() {
    // Add early debugging
    console.log('Script loaded');
    console.log('Window _env_:', window._env_);
    console.log('Document readyState:', document.readyState);
    
    // Burger menu logic (always runs)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('show');
            burger.classList.toggle('active');
        });
    } else {
        if (!burger) console.warn('Burger menu element not found');
        if (!nav) console.warn('Navigation ul element not found');
    }

    // Modal logic (only runs if modal exists)
    const modal = document.getElementById('formModal');
    if (modal) {
        const openModalButtons = [
            document.getElementById('joinWaitlistButton'),
            document.getElementById('joinWaitlistHero'),
            document.getElementById('joinWaitlistNewsletter'),
            document.getElementById('joinWaitlistScroller')
        ].filter(Boolean);
        openModalButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                modal.classList.add('show');
            });
        });
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });
        }
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                }
            });
    } else {
        console.warn('Form modal not found on this page.');
    }

    // Form handling (Firebase v9+ modular API)
    import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js').then(({ initializeApp }) => {
        import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js').then(({ getDatabase, ref, push, serverTimestamp }) => {
            const firebaseConfig = window._env_;
            if (!firebaseConfig || !firebaseConfig.apiKey) {
                console.error('Firebase configuration is missing.');
            return;
        }
            const app = initializeApp(firebaseConfig);
            const db = getDatabase(app);
            const form = document.getElementById('responseForm');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const name = document.getElementById('name')?.value;
                    const email = document.getElementById('email')?.value;
                    const comment = document.getElementById('comment')?.value;
                    const termsAccepted = document.getElementById('terms-checkbox')?.checked;
                    if (!termsAccepted) {
                        alert('Please agree to the Privacy Policy and Terms & Conditions');
            return;
        }
                    try {
                        await push(ref(db, 'responses'), {
                            name,
                            email,
                            comment,
                            termsAccepted,
                            timestamp: serverTimestamp()
                        });
                        
                        // Only handle deck download if on deck.html
                        if (window.location.pathname.endsWith('deck.html')) {
                            // Check if we're in development (local) or production
                            const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                            
                            if (isDevelopment) {
                                // In development, call the local Express server
                                console.log('Development detected, calling local Express server');
                                
                                try {
                                    const response = await fetch('/join-waitlist-deck', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name,
                                            email,
                                            comment,
                                            termsAccepted
                                        })
                                    });
                                    
                                    console.log('Express server response status:', response.status);
                                    
                                    if (response.ok) {
                                        console.log('Form submitted successfully, downloading PDF');
                                        // Download the PDF directly from Express server
                                        window.location.href = '/deck/solshr-pitch-deck.pdf';
                                    } else {
                                        console.error('Express server error:', response.status);
                                        alert('Error submitting form. Please try again.');
                                    }
                                } catch (error) {
                                    console.error('Express server call failed:', error);
                                    alert('Error submitting form. Please try again.');
                                }
                            } else {
                                // In production, use the cloud function
                                callCloudFunction();
                            }
                            
                            // Cloud function call (for production)
                            async function callCloudFunction() {
                                const cloudFunctionUrl = 'https://europe-west1-928758805701.cloudfunctions.net/joinWaitlistDeck';
                                console.log('Calling cloud function:', cloudFunctionUrl);
                                
                                try {
                                    const response = await fetch(cloudFunctionUrl, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name,
                                            email,
                                            comment,
                                            termsAccepted
                                        })
                                    });
                                    
                                    console.log('Cloud function response status:', response.status);
                                    
                                    if (response.ok) {
                                        const result = await response.json();
                                        console.log('Cloud function response:', result);
                                        
                                        if (result.pdfUrl) {
                                            console.log('Downloading PDF from cloud function');
                                            
                                            // Download the PDF from the cloud function
                                            window.location.href = result.pdfUrl;
                                        } else {
                                            console.error('No PDF URL in response');
                                            alert('PDF URL not received. Please contact support.');
                                        }
                                    } else {
                                        console.error('Cloud function error:', response.status, response.statusText);
                                        const errorText = await response.text();
                                        console.error('Error response:', errorText);
                                        alert('Error submitting form. Please try again.');
                                    }
                                } catch (cloudError) {
                                    console.error('Cloud function call failed:', cloudError);
                                    alert('Error submitting form. Please try again.');
                                }
                            }
                        } else {
                            alert('Thank you for joining the waitlist!');
                            form.reset();
                            if (modal) {
                                modal.style.display = 'none';
                            }
                        }
                    } catch (error) {
                        console.error('Submission error:', error);
                        alert('There was an error submitting your response. Please try again.');
                    }
                });
            }
        });
    });

    // Initialize Stripe
    function initializeStripe() {
        const stripePublishableKey = window._env_?.STRIPE_PUBLISHABLE_KEY;
        
        if (!stripePublishableKey) {
            console.error('Stripe publishable key not found in configuration');
            return;
        }

        // Initialize Stripe with the correct key
        window.stripe = Stripe(stripePublishableKey);
        console.log('Stripe initialized successfully');
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
    
    // --- Calculator Logic ---
    // updateSavings only updates the display
    function updateSavings() {
        const amountInvestedInput = document.getElementById('amount-invested');
        const powerGeneratedInput = document.getElementById('power-generated');
        const potentialSavingsInput = document.getElementById('potential-savings');
        const co2Reduction = document.getElementById('co2-reduction');
        if (!(amountInvestedInput && powerGeneratedInput && potentialSavingsInput && co2Reduction)) return;

        const amountInvested = parseFloat(amountInvestedInput.value);
        const powerGenerated = parseFloat(powerGeneratedInput.value);
        const potentialSavings = parseFloat(potentialSavingsInput.value);

        document.getElementById('amount-invested-value').innerText = `€${amountInvested}`;
        document.getElementById('power-generated-value').innerText = `${powerGenerated.toFixed(2)} kWh`;
        document.getElementById('potential-savings-value').innerText = `€${potentialSavings.toFixed(2)}`;

        // Calculate CO2 reduction (example calculation)
        const co2 = (powerGenerated * 0.5).toFixed(2); // Example: 0.5 kg CO2 saved per kWh
        co2Reduction.innerText = `${co2} kg CO2`;
    }

    // Interconnected slider logic
    const amountInvestedInput = document.getElementById('amount-invested');
    const powerGeneratedInput = document.getElementById('power-generated');
    const potentialSavingsInput = document.getElementById('potential-savings');

    function updateFromAmountInvested() {
        if (!amountInvestedInput || !powerGeneratedInput || !potentialSavingsInput) return;
        const amountInvested = parseFloat(amountInvestedInput.value);
        const calculatedPowerGenerated = (amountInvested / 1000) * 2.4;
        const calculatedPotentialSavings = (calculatedPowerGenerated * 1200 * 1.67) / 24;
        powerGeneratedInput.value = calculatedPowerGenerated.toFixed(2);
        potentialSavingsInput.value = calculatedPotentialSavings.toFixed(2);
        updateSavings();
    }
    function updateFromPowerGenerated() {
        if (!amountInvestedInput || !powerGeneratedInput || !potentialSavingsInput) return;
        const powerGenerated = parseFloat(powerGeneratedInput.value);
        const calculatedAmountInvested = (powerGenerated / 2.4) * 1000;
        const calculatedPotentialSavings = (powerGenerated * 1200 * 1.67) / 24;
        amountInvestedInput.value = calculatedAmountInvested.toFixed(2);
        potentialSavingsInput.value = calculatedPotentialSavings.toFixed(2);
        updateSavings();
    }
    function updateFromPotentialSavings() {
        if (!amountInvestedInput || !powerGeneratedInput || !potentialSavingsInput) return;
        const potentialSavings = parseFloat(potentialSavingsInput.value);
        const calculatedPowerGenerated = (potentialSavings * 24) / (1.67 * 1200);
        const calculatedAmountInvested = (calculatedPowerGenerated / 2.4) * 1000;
        powerGeneratedInput.value = calculatedPowerGenerated.toFixed(2);
        amountInvestedInput.value = calculatedAmountInvested.toFixed(2);
        updateSavings();
    }

    if (amountInvestedInput && powerGeneratedInput && potentialSavingsInput) {
        amountInvestedInput.addEventListener('input', updateFromAmountInvested);
        powerGeneratedInput.addEventListener('input', updateFromPowerGenerated);
        potentialSavingsInput.addEventListener('input', updateFromPotentialSavings);
    // Initial call to set values correctly on page load
        updateFromAmountInvested();
    }

    // Robust AOS initialization
    if (window.AOS) {
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
    } else {
        console.warn('AOS library not loaded');
    }

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

    // Robust Calculator Animation
    function setupCalcAnimations() {
        const calculator = document.getElementById('calculator');
        if (!calculator) return;
        const toggleGroups = document.querySelectorAll('.toggle-group');
        const results = document.querySelector('.results');
        function isInViewport(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (0.8 - offset) &&
                rect.bottom >= 0
            );
        }
        function handleScrollAnimation() {
            if (isInViewport(calculator)) {
                calculator.classList.add('visible');
                toggleGroups.forEach(group => {
                    group.classList.add('visible');
                });
                if (results) {
                    results.classList.add('visible');
                }
            }
        }
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
    }
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

    // Robust FAQ Animation
    function handleFAQVisibility() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems || faqItems.length === 0) return;
        
        if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        faqItems.forEach(item => {
            observer.observe(item);
        });
        } else {
            // Fallback: just show all
            faqItems.forEach(item => item.classList.add('visible'));
        }
    }
    handleFAQVisibility();

    // Stripe Payment Functions
    async function createCheckoutSession(amount) {
        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount
                })
            });

            const session = await response.json();
            
            if (!response.ok) {
                throw new Error(session.error || 'Failed to create checkout session');
            }

            return session;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }

    async function redirectToCheckout(amount) {
        try {
            if (!window.stripe) {
                throw new Error('Stripe not initialized');
            }

            const session = await createCheckoutSession(amount);
            
            if (session.url) {
                // Redirect to Stripe Checkout
                window.location.href = session.url;
            } else {
                throw new Error('No checkout URL received');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to initialize payment. Please try again.');
        }
    }

    function handleInvestmentClick() {
        const amountInvested = parseFloat(document.getElementById('amount-invested').value);
        
        if (amountInvested && amountInvested > 0) {
            redirectToCheckout(amountInvested);
        } else {
            alert('Please set a valid investment amount');
        }
    }

    // Add event listeners for investment buttons
    const investButton = document.getElementById('invest-button');
    if (investButton) {
        investButton.addEventListener('click', handleInvestmentClick);
    }

    // Handle payment success page
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && window.location.pathname.includes('/payment-success.html')) {
        fetch(`/session-status?session_id=${sessionId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'paid') {
                    console.log('Payment successful!');
                    // You can add success handling here
                }
            })
            .catch(error => {
                console.error('Error checking payment status:', error);
            });
    }

    // Payment Elements integration (for embedded payments)
    async function createPaymentElement(amount) {
        try {
            if (!window.stripe) {
                throw new Error('Stripe not initialized');
            }

            const response = await fetch('/createPaymentIntent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: 'eur'
                })
            });

            const { clientSecret } = await response.json();
            
            const elements = window.stripe.elements({
                clientSecret: clientSecret
            });

            const paymentElement = elements.create('payment');
            paymentElement.mount('#payment-element');

            return { elements, clientSecret };
        } catch (error) {
            console.error('Error creating payment element:', error);
            throw error;
        }
    }

    async function confirmPayment(elements, clientSecret) {
        try {
            if (!window.stripe) {
                throw new Error('Stripe not initialized');
            }

            const result = await window.stripe.confirmPayment({
                elements: elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success.html`,
                }
            });

            if (result.error) {
                console.error('Payment confirmation error:', result.error);
                alert('Payment failed: ' + result.error.message);
            }
        } catch (error) {
            console.error('Payment confirmation error:', error);
            alert('Payment failed: ' + error.message);
        }
    }

    // Payment modal logic (only runs if payment modal exists)
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        const startPaymentBtn = document.getElementById('start-payment');
        if (startPaymentBtn) {
            startPaymentBtn.addEventListener('click', async () => {
                try {
                    const response = await fetch('/create-checkout-session', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const { url } = await response.json();
                    window.location.href = url;
                } catch (error) {
                    console.error('Error:', error);
                    alert('Something went wrong. Please try again.');
                }
            });
        }
    }

    // Cookie consent logic (only runs if cookie banner exists)
    const banner = document.getElementById('cookieConsentBanner');
    const acceptBtn = document.getElementById('cookieConsentAccept');
    if (banner && acceptBtn) {
        if (!localStorage.getItem('cookieConsent')) {
            banner.style.display = 'flex';
        }
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.style.display = 'none';
        });
    }

    // Add any other UI logic here, always checking if elements exist before using them
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}

