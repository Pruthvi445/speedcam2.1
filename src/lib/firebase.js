import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove, get } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3pN3lwUfwU0sc89isAEYY_-D5t_aJZ8I",
  authDomain: "first-6a7dc.firebaseapp.com",
  databaseURL: "https://first-6a7dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "first-6a7dc",
  storageBucket: "first-6a7dc.firebasestorage.app",
  messagingSenderId: "843170337402",
  appId: "1:843170337402:web:f47d5ed299b4e6993ba1c3",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export const signInUser = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log('✅ Auth success:', result.user.uid);
    return result;
  } catch (error) {
    console.error('❌ Auth error:', error);
    return { user: { uid: 'guest-' + Date.now() } };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const dbRef = (path) => ref(db, path);

export const dbPush = async (path, data) => {
  const newRef = push(ref(db, path));
  await set(newRef, { ...data, createdAt: Date.now() });
  return newRef.key;
};

export const dbSet = async (path, data) => {
  await set(ref(db, path), data);
};

export const dbGet = async (path) => {
  const snapshot = await get(ref(db, path));
  return snapshot.val();
};

export const dbUpdate = async (path, data) => {
  await update(ref(db, path), data);
};

export const dbRemove = async (path) => {
  await remove(ref(db, path));
};

export const dbOnValue = (path, callback, errorCallback) => {
  return onValue(ref(db, path), (snapshot) => {
    callback(snapshot.val());
  }, errorCallback);
};