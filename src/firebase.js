import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirebaseConfig } from './env-config';

const app = initializeApp(getFirebaseConfig());
const db = getDatabase(app);

export { db };