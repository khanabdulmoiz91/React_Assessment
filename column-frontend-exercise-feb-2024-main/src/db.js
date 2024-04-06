import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  projectId: 'demo-column-frontend-exercise'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);