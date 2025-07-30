/*  public/app.js  */

/*  DOM refs  */
const signInBtn      = document.getElementById("signInBtn");
const userEmailLbl   = document.getElementById("userEmail");
const complaintForm  = document.getElementById("complaintForm");
const issueText      = document.getElementById("issueText");
const includeEmailCb = document.getElementById("includeEmail");
const statusMsg      = document.getElementById("statusMessage");
const complaintsList = document.getElementById("complaintsList");

/*  Dummy sign-in for now  */
signInBtn.addEventListener("click", () => {
  alert("Sign-in functionality is not implemented yet.");
});

/*  Submit complaint (dummy logic, replace with Gemini/your backend later)  */
complaintForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = issueText.value.trim();
  if (!text) return alert("Enter an issue.");

  const email = includeEmailCb.checked ? "user@example.com" : "anonymous";

  try {
    // TODO: Replace this with Gemini or your backend POST call
    console.log("Submitting complaint:", { text, email });

    // UI feedback
    const li = document.createElement("li");
    li.textContent = text;
    complaintsList.prepend(li);

    issueText.value = "";
    includeEmailCb.checked = false;
    statusMsg.textContent = "✅ Complaint submitted!";
    setTimeout(() => statusMsg.textContent = "", 2500);
  } catch (err) {
    alert("Submission failed: " + err.message);
  }
});
