import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth script loaded');
    
    // Check Firebase configuration
    if (!window._env_ || !window._env_.apiKey) {
        console.error('Firebase configuration is missing:', window._env_);
        return;
    }

    // Initialize Firebase
    const app = initializeApp(window._env_);
    const auth = getAuth(app);
    const db = getDatabase(app);

    // DOM Elements
    const authModal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const authName = document.getElementById('authName');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const switchAuthMode = document.getElementById('switchAuthMode');
    const authSwitch = document.getElementById('authSwitch');
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const closeButton = authModal ? authModal.querySelector('.close') : null;
    const accountMenuItem = document.getElementById('accountMenuItem');
    const signOutMenuItem = document.getElementById('signOutMenuItem');
    const signOutMenuButton = document.getElementById('signOutMenuButton');

    let isSignUp = false;

    // Only run setup if all required elements exist
    if (!authModal || !authForm || !authTitle || !authName || !authSubmitBtn || 
        !switchAuthMode || !authSwitch || !signInButton || !signUpButton || !closeButton || !accountMenuItem || !signOutMenuItem || !signOutMenuButton) {
        console.warn('Auth.js: Required DOM elements not found for auth modal. Skipping auth setup on this page.');
        return;
    }

    console.log('All auth elements found, setting up event listeners');

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
        authName.style.display = isSignUp ? 'block' : 'none';

        // Toggle required attribute for name input
        const nameInput = document.getElementById('authNameInput');
        if (nameInput) {
            if (isSignUp) {
                nameInput.setAttribute('required', 'required');
            } else {
                nameInput.removeAttribute('required');
            }
        }

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
        const name = document.getElementById('authNameInput').value;

        try {
            if (isSignUp) {
                console.log('Attempting sign up...');
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // Update profile with display name
                if (name) {
                    await updateProfile(userCredential.user, { displayName: name });
                }
                
                // Save user data to database
                await set(ref(db, 'users/' + userCredential.user.uid), {
                    email: email,
                    displayName: name,
                    createdAt: new Date().toISOString(),
                    investment: {
                        total: 0,
                        power: 0,
                        co2: 0
                    }
                });
                
                console.log('Sign up successful');
            } else {
                console.log('Attempting sign in...');
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Sign in successful');
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
            
            // Show specific error messages
            let errorMessage = 'An error occurred during authentication. Please try again.';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'An account with this email already exists. Please sign in instead.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email. Please sign up instead.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters long.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }
            
            // Remove any existing error messages
            const existingError = authForm.querySelector('.auth-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Insert error message after the form title
            const errorDiv = document.createElement('div');
            errorDiv.className = 'auth-error';
            errorDiv.textContent = errorMessage;
            authTitle.insertAdjacentElement('afterend', errorDiv);
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
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log('User signed in:', user.email);
            signInButton.style.display = 'none';
            signUpButton.style.display = 'none';
            if (accountMenuItem) accountMenuItem.style.display = 'block';
            if (signOutMenuItem) signOutMenuItem.style.display = 'block';
        } else {
            // User is signed out
            console.log('User signed out');
            signInButton.style.display = 'inline-block';
            signUpButton.style.display = 'inline-block';
            if (accountMenuItem) accountMenuItem.style.display = 'none';
            if (signOutMenuItem) signOutMenuItem.style.display = 'none';
        }
    });

    // Global sign out function for burger menu
    window.signOutUser = async function() {
        try {
            await auth.signOut();
            window.location.replace('index.html');
        } catch (error) {
            alert('Error signing out. Please try again.');
        }
    };
    if (signOutMenuButton) {
        signOutMenuButton.addEventListener('click', window.signOutUser);
    }
}); 