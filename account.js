console.log('account.js loaded');

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    updatePassword,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, get, remove } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Add a loading indicator to the page
let loadingDiv = document.createElement('div');
loadingDiv.id = 'account-loading';
loadingDiv.style.position = 'fixed';
loadingDiv.style.top = '0';
loadingDiv.style.left = '0';
loadingDiv.style.width = '100vw';
loadingDiv.style.height = '100vh';
loadingDiv.style.background = 'rgba(255,255,255,0.8)';
loadingDiv.style.display = 'flex';
loadingDiv.style.alignItems = 'center';
loadingDiv.style.justifyContent = 'center';
loadingDiv.style.zIndex = '9999';
loadingDiv.innerHTML = '<div style="font-size:2rem; color:#333;">Loading...</div>';
document.body.appendChild(loadingDiv);

// Ensure the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Account page loaded');

    // Get Firebase config safely
    const firebaseConfig = window.getFirebaseConfig?.();
    console.log('Firebase config in account.js:', firebaseConfig);
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.error('Firebase configuration missing');
        return;
    }

    // Robust singleton Firebase initialization
    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        console.log('Firebase app initialized.');
    } else {
        app = getApps()[0];
        console.log('Firebase app already initialized.');
    }

    const auth = getAuth(app);
    const db = getDatabase(app);

    // DOM elements
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const totalInvested = document.getElementById('totalInvested');
    const powerGenerated = document.getElementById('powerGenerated');
    const co2Saved = document.getElementById('co2Saved');
    const logoutButton = document.getElementById('logoutButton');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');

    // Warn if any expected DOM element is missing
    if (!userName) console.warn('userName element not found');
    if (!userEmail) console.warn('userEmail element not found');
    if (!totalInvested) console.warn('totalInvested element not found');
    if (!powerGenerated) console.warn('powerGenerated element not found');
    if (!co2Saved) console.warn('co2Saved element not found');
    if (!logoutButton) console.warn('logoutButton element not found');
    if (!changePasswordBtn) console.warn('changePasswordBtn element not found');
    if (!deleteAccountBtn) console.warn('deleteAccountBtn element not found');

    // Check authentication state ONLY inside onAuthStateChanged
    onAuthStateChanged(auth, async (user) => {
        console.log('Auth state changed. User:', user);
        // Hide loading indicator
        if (loadingDiv) loadingDiv.style.display = 'none';

        if (!user) {
            console.log('User not authenticated, redirecting to home in 5 seconds...');
            // Show a visible message
            let msg = document.createElement('div');
            msg.style.position = 'fixed';
            msg.style.top = '0';
            msg.style.left = '0';
            msg.style.width = '100vw';
            msg.style.height = '100vh';
            msg.style.background = 'rgba(255,255,255,0.95)';
            msg.style.display = 'flex';
            msg.style.alignItems = 'center';
            msg.style.justifyContent = 'center';
            msg.style.zIndex = '10000';
            msg.style.fontSize = '2rem';
            msg.style.color = '#c00';
            msg.innerText = 'You are not signed in. Redirecting to home in 5 seconds...';
            document.body.appendChild(msg);

            setTimeout(() => {
                window.location.replace('index.html');
            }, 5000);
            return;
        }

        console.log('User authenticated, loading account page...');

        if (userName) userName.textContent = user.displayName || 'N/A';
        if (userEmail) userEmail.textContent = user.email || 'N/A';

        // Fetch user data from Realtime Database
        try {
            const snapshot = await get(ref(db, 'users/' + user.uid));
            const userData = snapshot.val();
            console.log('User data from database:', userData);

            if (userData && userData.investment) {
                if (totalInvested) totalInvested.textContent = `€${userData.investment.total || 0}`;
                if (powerGenerated) powerGenerated.textContent = `${userData.investment.power || 0} kWh`;
                if (co2Saved) co2Saved.textContent = `${userData.investment.co2 || 0} kg`;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    });

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                window.location.replace('index.html');
            } catch (error) {
                console.error('Error signing out:', error);
                alert('Error signing out. Please try again.');
            }
        });
    }

    // Change password functionality
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', async () => {
            const user = auth.currentUser;
            if (!user) return alert('No authenticated user found.');

            const currentPassword = prompt('Please enter your current password:');
            if (!currentPassword) return;

            try {
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                const newPassword = prompt('Please enter your new password:');
                if (!newPassword) return;

                await updatePassword(user, newPassword);
                alert('Password updated successfully!');
            } catch (error) {
                console.error('Error updating password:', error);
                alert('Error updating password. Please try again.');
            }
        });
    }

    // Delete account functionality
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', async () => {
            const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
            if (!confirmed) return;

            const user = auth.currentUser;
            if (!user) return alert('No authenticated user found.');

            const password = prompt('Please enter your password to confirm:');
            if (!password) return;

            try {
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);

                await remove(ref(db, 'users/' + user.uid));
                await deleteUser(user);

                alert('Your account has been deleted.');
                window.location.replace('index.html');
            } catch (error) {
                console.error('Error deleting account:', error);
                if (error.code === 'auth/requires-recent-login') {
                    alert('For security, please sign in again before deleting your account.');
                    await signOut(auth);
                    window.location.replace('index.html');
                } else {
                    alert('Error deleting account: ' + error.message);
                }
            }
        });
    }
});
