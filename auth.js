import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Check Firebase configuration
if (!window._env_ || !window._env_.apiKey) {
    console.error('Firebase configuration is missing:', window._env_);
    throw new Error('Firebase configuration is missing.'); // This will stop execution
}

// Initialize Firebase
const app = initializeApp(window._env_);
const auth = getAuth(app);

// DOM Elements
const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const nameField = document.getElementById('nameField');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const switchAuthMode = document.getElementById('switchAuthMode');
const authSwitch = document.getElementById('authSwitch');
const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');
const closeButton = authModal ? authModal.querySelector('.close') : null;

let isSignUp = false;

// Verify all required elements exist
if (!authModal || !authForm || !authTitle || !nameField || !authSubmitBtn || 
    !switchAuthMode || !authSwitch || !signInButton || !signUpButton || !closeButton) {
    console.error('Required DOM elements not found');
} else {
    console.log('authModal:', authModal);
    console.log('authForm:', authForm);
    console.log('authTitle:', authTitle);
    console.log('nameField:', nameField);
    console.log('authSubmitBtn:', authSubmitBtn);
    console.log('switchAuthMode:', switchAuthMode);
    console.log('authSwitch:', authSwitch);
    console.log('signInButton:', signInButton);
    console.log('signUpButton:', signUpButton);
    console.log('closeButton:', closeButton);

    // Show/Hide Auth Modal
    function showAuthModal(mode) {
        console.log('Showing auth modal for:', mode);
        isSignUp = mode === 'signup';
        updateAuthForm();
        authModal.style.display = 'block';
        authModal.classList.add('show');
    }

    function hideAuthModal() {
        authModal.classList.remove('show');
        setTimeout(() => {
            authModal.style.display = 'none';
        }, 300);
    }

    // Update Auth Form based on mode
    function updateAuthForm() {
        const titleKey = isSignUp ? 'sign-up-title' : 'sign-in-title';
        const buttonKey = isSignUp ? 'sign-up-button' : 'sign-in-button';
        const switchTextKey = isSignUp ? 'have-account' : 'no-account';
        const switchLinkKey = isSignUp ? 'sign-in-link' : 'sign-up-link';

        authTitle.setAttribute('data-lang', titleKey);
        authSubmitBtn.setAttribute('data-lang', buttonKey);
        authSwitch.setAttribute('data-lang', switchTextKey);
        switchAuthMode.setAttribute('data-lang', switchLinkKey);
        nameField.style.display = isSignUp ? 'block' : 'none';

        // Update translations
        if (typeof changeLanguage === 'function') {
            changeLanguage();
        }
    }

    // Event Listeners
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submission started');
        
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const name = document.getElementById('name').value;

        try {
            if (isSignUp) {
                console.log('Attempting sign up...');
                // Check if email already exists
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    if (name) {
                        await updateProfile(userCredential.user, { displayName: name });
                    }
                    console.log('Sign up successful');
                } catch (error) {
                    console.error('Sign up error:', error);
                    throw new Error('An error occurred during sign up. Please try again.');
                }
            } else {
                console.log('Attempting sign in...');
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('Sign in successful');
                } catch (error) {
                    console.error('Sign in error:', error);
                    throw new Error('An error occurred during sign in. Please try again.');
                }
            }
            
            // Hide the modal first
            hideAuthModal();
            
            // Add a small delay before redirect to ensure modal is hidden
            setTimeout(() => {
                console.log('Redirecting to account page...');
                window.location.replace('account.html');
            }, 500);
            
        } catch (error) {
            console.error('Authentication error:', error);
            // Show a generic error message to the user
            const errorMessage = document.createElement('div');
            errorMessage.className = 'auth-error';
            errorMessage.textContent = 'An error occurred during authentication. Please try again.';
            
            // Remove any existing error messages
            const existingError = authForm.querySelector('.auth-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Insert error message after the form title
            authTitle.insertAdjacentElement('afterend', errorMessage);
        }
    });

    signInButton.addEventListener('click', () => showAuthModal('signin'));
    signUpButton.addEventListener('click', () => showAuthModal('signup'));
    switchAuthMode.addEventListener('click', (e) => {
        e.preventDefault();
        isSignUp = !isSignUp;
        updateAuthForm();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            hideAuthModal();
        }
    });

    // Close modal when clicking close button
    closeButton.addEventListener('click', () => {
        hideAuthModal();
    });

    // Handle authentication state changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            signInButton.style.display = 'none';
            signUpButton.style.display = 'none';
        } else {
            // User is signed out
            signInButton.style.display = 'inline-block';
            signUpButton.style.display = 'inline-block';
        }
    });
} 