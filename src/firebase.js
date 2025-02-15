import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Try to get config from window._env_ first (for browser)
const getConfig = () => {
  if (typeof window !== 'undefined' && window._env_) {
    return window._env_;
  }
  throw new Error('Firebase configuration is missing.');
};

const app = initializeApp(getConfig());
const db = getDatabase(app);

export { db };