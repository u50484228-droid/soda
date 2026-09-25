import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)')
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

async function resetAll() {
  console.log('Resetting Firebase Firestore analytics...');

  // 1. Reset global_metrics document
  const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
  await setDoc(summaryRef, {
    isRealOnly: true,
    totalVisits: 0,
    uniqueVisitors: 0,
    totalTimeSeconds: 0,
    sessionCountForAvg: 0,
    maxScrollDepthPercent: 0,
    totalClicks: 0,
    checkoutClicks: 0,
    countries: {},
    buttonClicks: {},
    scrollMilestones: {
      hero: 0,
      ingredients: 0,
      efficacy: 0,
      pricing: 0,
      guarantee: 0,
      footer: 0
    },
    lastUpdated: new Date().toISOString()
  });

  console.log('✓ global_metrics set to 0');

  // 2. Clean all existing analytics_events
  const eventsCollection = collection(db, 'analytics_events');
  const snapshot = await getDocs(eventsCollection);
  console.log(`Found ${snapshot.size} events to clear...`);
  
  for (const docSnap of snapshot.docs) {
    await deleteDoc(docSnap.ref);
  }

  console.log('✓ All events cleared.');
  console.log('🎉 Reset complete! All metrics in Firebase are now 0.');
  process.exit(0);
}

resetAll().catch((err) => {
  console.error('Error resetting analytics:', err);
  process.exit(1);
});
