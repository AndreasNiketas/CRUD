import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBURR8RC4XjjAJrc8JwXzZIkPtYnCOkz-o",
  authDomain: "crud-productos-68ed0.firebaseapp.com",
  projectId: "crud-productos-68ed0",
  storageBucket: "crud-productos-68ed0.firebasestorage.app",
  messagingSenderId: "466917824273",
  appId: "1:466917824273:web:2ea60864c4b8b9a8035eb0",
  measurementId: "G-QNKNZWZ04C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };