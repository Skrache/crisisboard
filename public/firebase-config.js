/*  public/firebase-config.js  */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBc2u4x0FsD-4ZQky2FD9zkKkXk1oktWYY",
  authDomain: "crisisboard-b78cc.firebaseapp.com",
  projectId: "crisisboard-b78cc",
  storageBucket: "crisisboard-b78cc.appspot.com",
  messagingSenderId: "404790020757",
  appId: "1:404790020757:web:e63a541ae7ba0f7074299c"
};

export const app = initializeApp(firebaseConfig);
