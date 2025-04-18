import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
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

// Ensure the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Account page loaded');

    // Get Firebase config safely
    const firebaseConfig = window.getFirebaseConfig?.();
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.error('Firebase configuration missing');
        return;
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
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

    // Check authentication state
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            console.log('User not authenticated, redirecting to home...');
            window.location.replace('/index.html');
            return;
        }

        console.log('User authenticated, loading account page...');

        if (userName) userName.textContent = user.displayName || 'N/A';
        if (userEmail) userEmail.textContent = user.email || 'N/A';

        // Fetch user data from Realtime Database
        try {
            const snapshot = await get(ref(db, 'users/' + user.uid));
            const userData = snapshot.val();

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
                window.location.replace('/index.html');
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
                window.location.replace('/index.html');
            } catch (error) {
                console.error('Error deleting account:', error);
                if (error.code === 'auth/requires-recent-login') {
                    alert('For security, please sign in again before deleting your account.');
                    await signOut(auth);
                    window.location.replace('/index.html');
                } else {
                    alert('Error deleting account: ' + error.message);
                }
            }
        });
    }
});
