// Payment Testing Script for SOLSHR
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment test script loaded');

    // Initialize Stripe
    let stripe;
    let elements;
    let emailAddress = '';
    let clientSecret = '';

    // DOM elements
    const paymentModal = document.getElementById('paymentModal');
    const paymentForm = document.getElementById('payment-form');
    const paymentElement = document.getElementById('payment-element');
    const submitButton = document.getElementById('submit');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('button-text');
    const paymentMessage = document.getElementById('payment-message');
    const successSection = document.getElementById('success');
    const customerEmail = document.getElementById('customer-email');
    const closeButton = document.querySelector('.close');
    const startPaymentButton = document.getElementById('start-payment');

    // Initialize Stripe when config is loaded
    function initializeStripe() {
        const stripePublishableKey = window._env_?.STRIPE_PUBLISHABLE_KEY;
        
        if (!stripePublishableKey) {
            console.error('Stripe publishable key not found');
            alert('Payment system not configured. Please contact support.');
            return;
        }

        stripe = Stripe(stripePublishableKey);
        console.log('Stripe initialized successfully');
    }

    // Load configuration and initialize
    if (window._env_) {
        initializeStripe();
    } else {
        // Wait for config to load
        const checkConfig = setInterval(() => {
            if (window._env_) {
                clearInterval(checkConfig);
                initializeStripe();
            }
        }, 100);
    }

    // Start payment flow
    startPaymentButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Starting payment flow');
        
        if (!stripe) {
            alert('Payment system not ready. Please try again.');
            return;
        }

        try {
            // Create payment intent
            const response = await fetch('/createPaymentIntent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 10, // €10 test payment
                    currency: 'eur'
                })
            });

            const { clientSecret: secret } = await response.json();
            clientSecret = secret;

            // Create payment element
            elements = stripe.elements({
                clientSecret: secret,
                appearance: {
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#0570de',
                    },
                },
            });

            // Create and mount payment element
            const paymentElementInstance = elements.create('payment');
            paymentElementInstance.mount(paymentElement);

            // Show modal
            paymentModal.style.display = 'block';
            paymentModal.classList.add('show');

        } catch (error) {
            console.error('Error starting payment:', error);
            alert('Failed to start payment. Please try again.');
        }
    });

    // Handle form submission
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
            alert('Payment system not ready. Please try again.');
            return;
        }

        setLoading(true);

        emailAddress = document.getElementById('payment-email').value;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success.html`,
                receipt_email: emailAddress,
            },
        });

        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                showMessage(error.message);
            } else {
                showMessage('An unexpected error occurred.');
            }
        }

        setLoading(false);
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        paymentModal.classList.remove('show');
        resetForm();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            paymentModal.classList.remove('show');
            resetForm();
        }
    });

    // Utility functions
    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            spinner.classList.remove('hidden');
            buttonText.classList.add('hidden');
        } else {
            submitButton.disabled = false;
            spinner.classList.add('hidden');
            buttonText.classList.remove('hidden');
        }
    }

    function showMessage(messageText) {
        const messageContainer = paymentMessage;
        messageContainer.classList.remove('hidden');
        messageContainer.textContent = messageText;

        setTimeout(function () {
            messageContainer.classList.add('hidden');
            messageContainer.textContent = '';
        }, 4000);
    }

    function resetForm() {
        paymentForm.reset();
        paymentElement.innerHTML = '';
        paymentMessage.classList.add('hidden');
        successSection.classList.add('hidden');
    }

    // Handle payment success page
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntentId = urlParams.get('payment_intent');
    
    if (paymentIntentId) {
        // Payment was successful
        console.log('Payment successful:', paymentIntentId);
        showSuccessMessage();
    }

    function showSuccessMessage() {
        if (paymentModal) {
            paymentModal.style.display = 'block';
            paymentModal.classList.add('show');
            paymentForm.style.display = 'none';
            successSection.classList.remove('hidden');
            customerEmail.textContent = emailAddress || 'your email';
        }
    }

    // Test server connection
    async function testServerConnection() {
        try {
            const response = await fetch('/health');
            const data = await response.json();
            console.log('Server health check:', data);
            return true;
        } catch (error) {
            console.error('Server connection failed:', error);
            return false;
        }
    }

    // Test server on load
    testServerConnection();
}); 