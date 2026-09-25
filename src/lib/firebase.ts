import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Silence non-fatal Firestore network polling and timeout notices
try {
  setLogLevel('silent');
} catch {
  // Ignore
}

// Filter the harmless 10-second backend polling notice from standard console
if (typeof window !== 'undefined') {
  const filterMsg = (msg: any) => 
    typeof msg === 'string' && (
      msg.includes('Could not reach Cloud Firestore backend') ||
      msg.includes('Backend didn\'t respond within 10 seconds')
    );

  const origWarn = console.warn;
  const origError = console.error;
  
  console.warn = (...args: any[]) => {
    if (args.some(filterMsg)) return;
    origWarn.apply(console, args);
  };

  console.error = (...args: any[]) => {
    if (args.some(filterMsg)) return;
    origError.apply(console, args);
  };
}

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const dbId = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)')
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
    ignoreUndefinedProperties: true
  }, dbId);
} catch {
  firestoreInstance = dbId ? getFirestore(app, dbId) : getFirestore(app);
}

export const db = firestoreInstance;
