// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCizu8R-qLtpIRc3etKy-i6KcH8tmAJoJ0",
  authDomain: "crisisboard-f9c15.firebaseapp.com",
  projectId: "crisisboard-f9c15",
  storageBucket: "crisisboard-f9c15.firebasestorage.app",
  messagingSenderId: "186183309267",
  appId: "1:186183309267:web:b6116772f63e9c0ac9c126",
  measurementId: "G-HCR54Q6MEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configure provider
provider.addScope('email');
provider.addScope('profile');

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };