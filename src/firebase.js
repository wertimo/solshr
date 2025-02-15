import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Try to get config from window._env_ first (for browser)
const getConfig = () => {
  if (typeof window !== 'undefined' && window._env_) {
    return window._env_;
  }
  // Fallback to importing the config file
  try {
    const { getFirebaseConfig } = require('./env-config');
    return getFirebaseConfig();
  } catch (error) {
    console.error('Failed to load Firebase config:', error);
    throw error;
  }
};

const app = initializeApp(getConfig());
const db = getDatabase(app);

export { db };