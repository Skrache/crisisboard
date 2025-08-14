import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, auth } from "../firebase"; // make sure auth is exported from firebase.js
import { useAuthState } from "react-firebase-hooks/auth";
import StatusBadge from "./StatusBadge";
import StatusDropdown from "./StatusDropdown";

export default function ComplaintStatus() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  // Admin check
  const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComplaints(list);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaints();
  }, []);

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Complaint Status Tracker</h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint.id} className="p-4 border rounded-md mb-4 shadow-sm bg-white">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-lg">{complaint.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>

                <div className="mt-3 flex items-center gap-3">
                  <StatusBadge status={complaint.status || "Pending"} />
                  <span className="text-xs text-gray-500">
                    Submitted:{" "}
                    {complaint.createdAt?.toDate
                      ? complaint.createdAt.toDate().toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>

              {isAdmin && (
                <div className="ml-4">
                  <StatusDropdown
                    complaintId={complaint.id}
                    currentStatus={complaint.status || "Pending"}
                    user={user}
                  />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
