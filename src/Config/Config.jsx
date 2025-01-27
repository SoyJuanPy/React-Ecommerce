import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx6yWq9a7wu1hWHO7ORkuDc7cC5pHEJMw",
  authDomain: "rectcoder.firebaseapp.com",
  projectId: "rectcoder",
  storageBucket: "rectcoder.firebasestorage.app",
  messagingSenderId: "993515313483",
  appId: "1:993515313483:web:4200b1dafae4a9b40770ce",
  measurementId: "G-EQ5ZN8HXBF",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
