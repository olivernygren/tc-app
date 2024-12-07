import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase Client Config
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'training-central-app.firebaseapp.com',
  projectId: 'training-central-app',
  storageBucket: 'training-central-app.appspot.com',
  messagingSenderId: '925204716398',
  appId: '1:925204716398:web:73f6087936954200057f7f',
};

// Initialize Firebase Client SDK
const clientApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(clientApp);
export const provider = new GoogleAuthProvider();
export const clientDb = getFirestore(clientApp);
