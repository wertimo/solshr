// Global variables
let stripe;
let checkout;
let isInitialized = false;

// Initialize Stripe after environment is loaded
async function initializeStripe() {
    // Wait for environment to be available
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!window._env_ && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }

    if (!window._env_ || !window._env_.STRIPE_PUBLISHABLE_KEY) {
        console.error('Stripe publishable key not found in environment configuration');
        showMessage('Payment system configuration error. Please refresh the page and try again.');
        return false;
    }
    
    try {
        stripe = Stripe(window._env_.STRIPE_PUBLISHABLE_KEY);
        await initialize();
        isInitialized = true;
        return true;
    } catch (error) {
        console.error('Error initializing Stripe:', error);
        showMessage('Payment system initialization failed. Please refresh the page and try again.');
        return false;
    }
}

// Validate email format
const validateEmail = async (email) => {
    if (!isInitialized || !checkout) {
        console.error('Checkout not initialized');
        return { isValid: false, message: 'Payment system not initialized. Please refresh the page and try again.' };
    }
    
    try {
        const updateResult = await checkout.updateEmail(email);
        const isValid = updateResult.type !== "error";
        return { isValid, message: !isValid ? updateResult.error.message : null };
    } catch (error) {
        console.error('Error validating email:', error);
        return { isValid: false, message: 'Error validating email. Please try again.' };
    }
};

// Initialize the embedded Checkout
async function initialize() {
    try {
        // Fetch the Checkout Session
        const response = await fetch("/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        
        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }
        
        const { clientSecret } = await response.json();

        // Configure the appearance
        const appearance = {
            theme: 'stripe',
            variables: {
                colorPrimary: '#BB6552',
                colorBackground: '#ffffff',
                colorText: '#333333',
                colorDanger: '#df1b41',
                fontFamily: 'Arial, sans-serif',
                spacingUnit: '4px',
                borderRadius: '4px'
            }
        };

        // Initialize the embedded Checkout
        checkout = await stripe.initCheckout({
            clientSecret,
            appearance,
        });

        // Update button text with total amount
        const total = checkout.session().total.total.amount;
        const buttonText = document.querySelector("#button-text");
        if (buttonText) {
            buttonText.textContent = `Pay €${(total / 100).toFixed(2)} now`;
        }

        // Set up email validation
        const emailInput = document.getElementById("email");
        const emailErrors = document.getElementById("email-errors");

        if (emailInput && emailErrors) {
            emailInput.addEventListener("input", () => {
                emailErrors.textContent = "";
            });

            emailInput.addEventListener("blur", async () => {
                const newEmail = emailInput.value;
                if (!newEmail) return;

                const { isValid, message } = await validateEmail(newEmail);
                if (!isValid) {
                    emailErrors.textContent = message;
                }
            });
        }

        // Mount the payment and billing address elements
        const paymentElement = checkout.createPaymentElement();
        paymentElement.mount("#payment-element");
        
        const billingAddressElement = checkout.createBillingAddressElement();
        billingAddressElement.mount("#billing-address-element");

        return true;
    } catch (error) {
        console.error('Error initializing checkout:', error);
        showMessage('An error occurred while initializing the payment system. Please refresh the page and try again.');
        return false;
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    if (!isInitialized || !checkout) {
        showMessage('Payment system not initialized. Please refresh the page and try again.');
        return;
    }

    setLoading(true);

    try {
        // Validate email
        const email = document.getElementById("email")?.value;
        if (!email) {
            showMessage('Please enter your email address.');
            setLoading(false);
            return;
        }

        const { isValid, message } = await validateEmail(email);
        if (!isValid) {
            showMessage(message);
            setLoading(false);
            return;
        }

        // Confirm the payment
        const { error } = await checkout.confirm();

        if (error) {
            showMessage(error.message);
        }
        // If successful, the customer will be redirected to the return_url
        // specified in the Checkout Session creation

    } catch (error) {
        console.error('Error processing payment:', error);
        showMessage('An error occurred while processing your payment. Please try again.');
    }

    setLoading(false);
}

// UI helper functions
function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
    if (messageContainer) {
        messageContainer.classList.remove("hidden");
        messageContainer.textContent = messageText;

        setTimeout(() => {
            messageContainer.classList.add("hidden");
            messageContainer.textContent = "";
        }, 4000);
    }
}

function setLoading(isLoading) {
    const submitButton = document.querySelector("#submit");
    const spinner = document.querySelector("#spinner");
    const buttonText = document.querySelector("#button-text");

    if (submitButton && spinner && buttonText) {
        if (isLoading) {
            submitButton.disabled = true;
            spinner.classList.remove("hidden");
            buttonText.classList.add("hidden");
        } else {
            submitButton.disabled = false;
            spinner.classList.add("hidden");
            buttonText.classList.remove("hidden");
        }
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Add form submit handler
    const form = document.querySelector("#payment-form");
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    // Initialize Stripe
    await initializeStripe();
});