/*  public/app.js  */
import {
  getAuth, GoogleAuthProvider,
  signInWithRedirect, getRedirectResult, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore, collection, addDoc,
  query, where, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { app } from "./firebase-config.js";

/*  Firebase services  */
const auth = getAuth(app);
const db   = getFirestore(app);
const provider = new GoogleAuthProvider();

/*  DOM refs  */
const signInBtn      = document.getElementById("signInBtn");
const userEmailLbl   = document.getElementById("userEmail");
const complaintForm  = document.getElementById("complaintForm");
const issueText      = document.getElementById("issueText");
const includeEmailCb = document.getElementById("includeEmail");
const statusMsg      = document.getElementById("statusMessage");
const complaintsList = document.getElementById("complaintsList");

let currentUser = null;

/*  Sign‑in button → redirect  */
signInBtn.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

/*  Handle redirect result errors (optional)  */
getRedirectResult(auth).catch(err => {
  console.error("Redirect error:", err.message);
});

/*  Auth state listener (fires after redirect)  */
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    userEmailLbl.textContent = `Signed in as ${user.email}`;
    signInBtn.style.display = "none";
    loadComplaints(user.email);
  } else {
    signInBtn.style.display = "block";
    userEmailLbl.textContent = "";
    complaintsList.innerHTML = "";
  }
});

/*  Submit complaint  */
complaintForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return alert("Please sign in first.");

  const text = issueText.value.trim();
  if (!text) return alert("Enter an issue.");

  const email = includeEmailCb.checked ? currentUser.email : "anonymous";

  try {
    await addDoc(collection(db, "complaints"), {
      issue: text,
      email,
      timestamp: Date.now()
    });
    issueText.value = "";
    includeEmailCb.checked = false;
    statusMsg.textContent = "✅ Complaint submitted!";
    setTimeout(() => statusMsg.textContent = "", 2500);
  } catch (err) {
    alert("Submission failed: " + err.message);
  }
});

/*  Load complaints in real‑time  */
function loadComplaints(email) {
  const q = query(
    collection(db, "complaints"),
    where("email", "==", email),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snap) => {
    complaintsList.innerHTML = "";
    snap.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().issue;
      complaintsList.appendChild(li);
    });
  });
}
