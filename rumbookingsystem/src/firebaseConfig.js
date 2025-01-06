// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBshYZxt_dPOwVAbkRCjtVBUwrSEoANgI",
  authDomain: "rumbooking-4fd87.firebaseapp.com",
  projectId: "rumbooking-4fd87",
  storageBucket: "rumbooking-4fd87.firebasestorage.app",
  messagingSenderId: "14031810139",
  appId: "1:14031810139:web:c58fb2ee64fbbd6514597e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
