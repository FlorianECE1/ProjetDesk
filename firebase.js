import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN1wzcKdJMwuICEJolvO9anCx0wZ29t7Y",
  authDomain: "desk-5babe.firebaseapp.com",
  projectId: "desk-5babe",
  storageBucket: "desk-5babe.firebasestorage.app",
  messagingSenderId: "266686263856",
  appId: "1:266686263856:web:bceea87592c03c41dbb3f5",
};

const app = initializeApp(firebaseConfig);

// 🔐 Authentification
export const auth = getAuth(app);

// 🗄️ Base de données Firestore
export const db = getFirestore(app);
//intégration
