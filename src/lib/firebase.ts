import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  projectId: "planbot-n07",
  appId: "1:980208884640:web:f56952f1f4003336b922c5",
  storageBucket: "planbot-n07.firebasestorage.app",
  apiKey: "AIzaSyB4vgBqlNvLGGMfbWutkCriKqCiDHf7kw0",
  authDomain: "planbot-n07.firebaseapp.com",
  messagingSenderId: "980208884640",
  measurementId: "G-6277W1SJ5Z",
  databaseURL: "https://planbot-n07-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Realtime Database
const rtdb = getDatabase(app);

export { app, rtdb };
