import { getAuth } from "firebase/auth";
export const auth = getAuth(firebaseApp);

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // make sure this is your Firestore export

async function createSampleComplaint() {
  try {
    await addDoc(collection(db, "complaints"), {
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues.",
      status: "Pending",
      createdAt: serverTimestamp(),
    });
    console.log("Complaint added successfully!");
  } catch (e) {
    console.error("Error adding complaint: ", e);
  }
}

// Read the admin emails from the .env file
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",") // split by commas
  .map((s) => s.trim()); // remove spaces

// Example usage: check if logged-in user is admin
function isAdmin(userEmail) {
  return ADMIN_EMAILS.includes(userEmail);
}
