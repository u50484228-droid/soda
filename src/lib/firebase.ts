import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const dbId = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)')
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

// Use initializeFirestore with experimentalForceLongPolling to eliminate the 10-second WebChannel timeout warning
// and ensure instantaneous connection in all browser environments, iframes, mobile networks, and proxies.
let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    ignoreUndefinedProperties: true
  }, dbId);
} catch {
  // If already initialized in hot-reload or another module
  firestoreInstance = dbId ? getFirestore(app, dbId) : getFirestore(app);
}

export const db = firestoreInstance;
