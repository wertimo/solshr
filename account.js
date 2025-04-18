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

// Initialize Firebase with your config
const app = initializeApp(window._env_);
const auth = getAuth(app);

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If not authenticated, redirect to home page
        console.log('User not authenticated, redirecting to home...');
        window.location.replace('/index.html');
        return;
    }
    
    // User is authenticated, initialize the account page
    console.log('User authenticated, loading account page...');
    initializeAccountPage(user);
});

function initializeAccountPage(user) {
    // Set user information
    document.getElementById('userName').textContent = user.displayName || 'N/A';
    document.getElementById('userEmail').textContent = user.email || 'N/A';
    
    // Setup logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await auth.signOut();
                window.location.replace('/index.html');
            } catch (error) {
                console.error('Error signing out:', error);
                alert('Error signing out. Please try again.');
            }
        });
    }
}

// Change password functionality
document.getElementById('changePasswordBtn').addEventListener('click', async () => {
    const user = auth.currentUser;
    
    // Prompt for current password
    const currentPassword = prompt('Please enter your current password:');
    if (!currentPassword) return;

    try {
        // Reauthenticate user
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Prompt for new password
        const newPassword = prompt('Please enter your new password:');
        if (!newPassword) return;

        await updatePassword(user, newPassword);
        alert('Password updated successfully!');
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Error updating password. Please try again.');
    }
});

// Delete account functionality
document.getElementById('deleteAccountBtn').addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }

    const user = auth.currentUser;
    const password = prompt('Please enter your password to confirm:');
    if (!password) return;

    try {
        // Reauthenticate user
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        // Delete user
        await deleteUser(user);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account. Please try again.');
    }
}); 