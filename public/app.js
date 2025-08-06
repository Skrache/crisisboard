/*  public/app.js  */

/*  DOM refs  */
const signInBtn      = document.getElementById("signInBtn");
const userEmailLbl   = document.getElementById("userEmail");
const complaintForm  = document.getElementById("complaintForm");
const issueText      = document.getElementById("issueText");
const includeEmailCb = document.getElementById("includeEmail");
const statusMsg      = document.getElementById("statusMessage");
const complaintsList = document.getElementById("complaintsList");
const submitAnonymouslyCb = document.getElementById("submitAnonymously");
const privacyTooltipBtn = document.getElementById("privacyTooltipBtn");
const privacyTooltip = document.getElementById("privacyTooltip");
const privacyBadgeContainer = document.getElementById("privacyBadgeContainer");
const privacyLiveRegion = document.getElementById("privacyLiveRegion");

/*  Dummy sign-in for now  */
signInBtn.addEventListener("click", () => {
  alert("Sign-in functionality is not implemented yet.");
});

// Tooltip show/hide logic
function showTooltip() {
  privacyTooltip.classList.add("opacity-100", "pointer-events-auto");
  privacyTooltip.classList.remove("opacity-0", "pointer-events-none");
}
function hideTooltip() {
  privacyTooltip.classList.remove("opacity-100", "pointer-events-auto");
  privacyTooltip.classList.add("opacity-0", "pointer-events-none");
}
privacyTooltipBtn.addEventListener("mouseenter", showTooltip);
privacyTooltipBtn.addEventListener("focus", showTooltip);
privacyTooltipBtn.addEventListener("mouseleave", hideTooltip);
privacyTooltipBtn.addEventListener("blur", hideTooltip);

// Badge show/hide logic
function updatePrivacyBadge() {
  if (submitAnonymouslyCb.checked) {
    privacyBadgeContainer.classList.add("opacity-100", "pointer-events-auto");
    privacyBadgeContainer.classList.remove("opacity-0", "pointer-events-none");
    privacyLiveRegion.textContent = "Privacy Assured: Your identity is private.";
  } else {
    privacyBadgeContainer.classList.remove("opacity-100", "pointer-events-auto");
    privacyBadgeContainer.classList.add("opacity-0", "pointer-events-none");
    privacyLiveRegion.textContent = "";
  }
}
submitAnonymouslyCb.addEventListener("change", updatePrivacyBadge);
document.addEventListener("DOMContentLoaded", updatePrivacyBadge);

// Mutual exclusivity logic
submitAnonymouslyCb.addEventListener("change", () => {
  if (submitAnonymouslyCb.checked) {
    includeEmailCb.checked = false;
    includeEmailCb.disabled = true;
    privacyLiveRegion.textContent = "Anonymous mode enabled. Your identity will not be stored.";
  } else {
    includeEmailCb.disabled = false;
    privacyLiveRegion.textContent = "";
  }
  updatePrivacyBadge();
});
includeEmailCb.addEventListener("change", () => {
  if (includeEmailCb.checked) {
    submitAnonymouslyCb.checked = false;
    submitAnonymouslyCb.disabled = true;
    privacyLiveRegion.textContent = "Email mode enabled. Your email will be included.";
  } else {
    submitAnonymouslyCb.disabled = false;
    privacyLiveRegion.textContent = "";
  }
  updatePrivacyBadge();
});

/*  Submit complaint (dummy logic, replace with Gemini/your backend later)  */
complaintForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = issueText.value.trim();
  if (!text) return alert("Enter an issue.");

  let email;
  if (submitAnonymouslyCb.checked) {
    email = "anonymous";
  } else if (includeEmailCb.checked) {
    email = "user@example.com";
  } else {
    email = "not provided";
  }

  try {
    // TODO: Replace this with Gemini or your backend POST call
    console.log("Submitting complaint:", { text, email });

    // UI feedback
    const li = document.createElement("li");
    li.textContent = text;
    complaintsList.prepend(li);

    issueText.value = "";
    includeEmailCb.checked = false;
    submitAnonymouslyCb.checked = false;
    includeEmailCb.disabled = false;
    submitAnonymouslyCb.disabled = false;
    privacyLiveRegion.textContent = "";
    updatePrivacyBadge();
    statusMsg.textContent = "✅ Complaint submitted!";
    setTimeout(() => statusMsg.textContent = "", 2500);
  } catch (err) {
    alert("Submission failed: " + err.message);
  }
});
