import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABFEQuh4PbtOBOK5PT37YxSwG6MZZNNNI",
  authDomain: "event-website-c8499.firebaseapp.com",
  projectId: "event-website-c8499",
  storageBucket: "event-website-c8499.firebasestorage.app",
  messagingSenderId: "836463246529",
  appId: "1:836463246529:web:f98ddf976db341182fa840",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;