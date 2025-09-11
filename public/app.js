// ===== Element References =====
const includeEmailCb = document.getElementById("includeEmail");
const statusMsg = document.getElementById("statusMessage");
const complaintsList = document.getElementById("complaintsList");
const submitAnonymouslyCb = document.getElementById("submitAnonymously");
const privacyTooltipBtn = document.getElementById("privacyTooltipBtn");
const privacyTooltip = document.getElementById("privacyTooltip");
const privacyBadgeContainer = document.getElementById("privacyBadgeContainer");
const privacyLiveRegion = document.getElementById("privacyLiveRegion");
const darkModeToggle = document.getElementById("darkModeToggle");
const complaintForm = document.getElementById("complaintForm");
const issueText = document.getElementById("issueText");

// File upload elements
const fileInput = document.getElementById('fileInput');
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInputLabel = document.getElementById('fileInputLabel');
const filePreviewContainer = document.getElementById('filePreviewContainer');
const filePreviewGrid = document.getElementById('filePreviewGrid');
const uploadProgressContainer = document.getElementById('uploadProgressContainer');
const uploadProgressBar = document.getElementById('uploadProgressBar');
const uploadProgressText = document.getElementById('uploadProgressText');
const uploadPercentage = document.getElementById('uploadPercentage');
const fileCount = document.getElementById('fileCount');
const totalSize = document.getElementById('totalSize');
const clearAllFiles = document.getElementById('clearAllFiles');

// ===== File Upload Configuration =====
const allowedTypes = [
  'image/jpeg','image/png','image/gif','image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg','audio/wav','audio/mp3','audio/aac',
  'video/mp4','video/avi','video/mov','video/quicktime'
];
const maxFileSize = 5 * 1024 * 1024;
const maxTotalSize = 20 * 1024 * 1024;
const maxFiles = 10;

let selectedFiles = [];
let uploadInProgress = false;

// ===== File Type Icons =====
const fileTypeIcons = {
  'image': '🖼️',
  'audio': '🎵',
  'video': '🎬',
  'application/pdf': '📄',
  'application/msword': '📝',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
  'default': '📎'
};

// ===== Utility Functions =====
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes','KB','MB','GB'];
  const i = Math.floor(Math.log(bytes)/Math.log(k));
  return parseFloat((bytes/Math.pow(k,i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileIcon(file) {
  if (file.type.startsWith('image/')) return fileTypeIcons.image;
  if (file.type.startsWith('audio/')) return fileTypeIcons.audio;
  if (file.type.startsWith('video/')) return fileTypeIcons.video;
  return fileTypeIcons[file.type] || fileTypeIcons.default;
}

function validateFile(file) {
  const errors = [];
  if (!allowedTypes.includes(file.type)) errors.push(`File type not allowed: ${file.name}`);
  if (file.size > maxFileSize) errors.push(`File too large: ${file.name} (${formatFileSize(file.size)})`);
  if (selectedFiles.some(f=>f.name===file.name && f.size===file.size)) errors.push(`File already selected: ${file.name}`);
  return errors;
}

// ===== Tooltip =====
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

// ===== Privacy Badge =====
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

// ===== Dark Mode =====
function updateAllDarkModeElements() {
  const isDark = document.body.classList.contains('dark');

  // File preview items
  document.querySelectorAll('.file-preview-item').forEach(item => item.classList.toggle('dark-mode-item', isDark));
  
  // Complaint items
  document.querySelectorAll('#complaintsList > div').forEach(item => item.classList.toggle('dark-mode-item', isDark));

  // Privacy badge
  privacyBadgeContainer.classList.toggle('dark-mode-item', isDark);

  // Tooltip
  privacyTooltip.classList.toggle('dark-mode-item', isDark);

  // File upload area
  fileUploadArea.classList.toggle('dark-mode-item', isDark);
}

// Load dark mode on startup
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") document.body.classList.add("dark");
  updateAllDarkModeElements();
});

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "enabled" : "disabled");
  updateAllDarkModeElements();
});

// MutationObserver to update dynamic elements
const observer = new MutationObserver(() => updateAllDarkModeElements());
observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

// ===== File Preview =====
function updateFilePreview() {
  filePreviewGrid.innerHTML = '';
  if (selectedFiles.length === 0) { 
    filePreviewContainer.classList.add('hidden'); 
    updateFileStats(); 
    return; 
  }
  filePreviewContainer.classList.remove('hidden');
  
  selectedFiles.forEach((file, idx) => {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-preview-item bg-white rounded-lg p-3 shadow-md border border-gray-200';
    const icon = getFileIcon(file);
    const isImage = file.type.startsWith('image/');
    fileDiv.innerHTML = `
      <div class="relative">
        <div class="flex flex-col items-center">
          ${isImage ? `<img src="${URL.createObjectURL(file)}" class="w-16 h-16 object-cover rounded mb-2 file-icon" alt="${file.name}">` :
          `<div class="w-16 h-16 flex items-center justify-center text-3xl file-type-icon">${icon}</div>`}
          <div class="text-center">
            <div class="text-xs font-medium text-gray-800 truncate max-w-20" title="${file.name}">${file.name}</div>
            <div class="text-xs text-gray-500">${formatFileSize(file.size)}</div>
          </div>
        </div>
        <button class="remove-btn absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors" onclick="removeFile(${idx})" title="Remove file">✕</button>
      </div>
    `;
    filePreviewGrid.appendChild(fileDiv);
  });

  updateFileStats();
  updateAllDarkModeElements(); // Ensure dark mode applied to new previews
}

function updateFileStats() {
  const totalSizeBytes = selectedFiles.reduce((sum,f)=>sum+f.size,0);
  fileCount.textContent = selectedFiles.length;
  totalSize.textContent = formatFileSize(totalSizeBytes);
}

function removeFile(index) { selectedFiles.splice(index,1); updateFilePreview(); showNotification('File removed','info'); }
function clearAllFilesHandler() { selectedFiles=[]; updateFilePreview(); showNotification('All files cleared','info'); }

function processFiles(files) {
  const fileArray = Array.from(files);
  const errors = [];
  const validFiles = [];
  const totalError = validateTotalSize(fileArray);
  if (totalError) { showNotification(totalError,'error'); return; }
  fileArray.forEach(file => { 
    const fileErrors = validateFile(file); 
    if (fileErrors.length) errors.push(...fileErrors); 
    else validFiles.push(file); 
  });
  if (errors.length) errors.forEach(error => showNotification(error,'error'));
  if (validFiles.length) { 
    selectedFiles.push(...validFiles); 
    updateFilePreview(); 
    showNotification(`${validFiles.length} file(s) added successfully`,'success'); 
  }
}

function validateTotalSize(newFiles) {
  const currentTotal = selectedFiles.reduce((sum,f)=>sum+f.size,0);
  const newTotal = newFiles.reduce((sum,f)=>sum+f.size,0);
  if (currentTotal+newTotal > maxTotalSize) return `Total file size limit exceeded. Current: ${formatFileSize(currentTotal)}, Adding: ${formatFileSize(newTotal)}, Limit: ${formatFileSize(maxTotalSize)}`;
  if (selectedFiles.length + newFiles.length > maxFiles) return `Maximum ${maxFiles} files allowed. Current: ${selectedFiles.length}, Adding: ${newFiles.length}`;
  return null;
}

// Drag & Drop
fileUploadArea.addEventListener('dragover', e => { e.preventDefault(); fileUploadArea.classList.add('drag-over'); });
fileUploadArea.addEventListener('dragleave', e => { e.preventDefault(); fileUploadArea.classList.remove('drag-over'); });
fileUploadArea.addEventListener('drop', e => { 
  e.preventDefault(); 
  fileUploadArea.classList.remove('drag-over'); 
  if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files); 
});

// File Input & Click
fileInput.addEventListener('change', e => { if(e.target.files.length){ processFiles(e.target.files); fileInput.value=''; } });
fileUploadArea.addEventListener('click', e => { if(e.target===fileUploadArea||e.target.id==='fileInputLabel'||e.target.closest('#fileInputLabel')||e.target.textContent.includes('Click to add more files')) fileInput.click(); });

// Clear Files Button
clearAllFiles.addEventListener('click', clearAllFilesHandler);

// ===== Form Submission =====
complaintForm.addEventListener("submit", async e => {
  e.preventDefault();
  const text = issueText.value.trim();
  if(!text) return showNotification("Please enter an issue description.","error");
  if(uploadInProgress) return showNotification("Please wait for file upload to complete.","warning");

  try {
    if(selectedFiles.length) await simulateFileUpload();
    const complaintItem = document.createElement("div");
    complaintItem.className = "bg-white rounded-lg p-4 shadow-md border border-gray-200";
    complaintItem.innerHTML = `<div class="flex items-start justify-between"><div class="flex-1"><p class="text-gray-800 text-sm md:text-base">${text}</p>${selectedFiles.length>0?`<div class="text-xs text-gray-500 mt-2">📎 ${selectedFiles.length} file(s) attached</div>`:''}</div><span class="ml-3 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span></div>`;
    complaintsList.prepend(complaintItem);
    issueText.value=""; selectedFiles=[]; updateFilePreview();
    showNotification("✅ Issue submitted successfully!","success");
  } catch(err){ showNotification("Submission failed: "+err.message,"error"); }
});

// ===== Simulate File Upload =====
async function simulateFileUpload() {
  uploadInProgress = true;
  uploadProgressContainer.classList.remove('hidden'); 
  uploadProgressContainer.classList.add('uploading');
  for(let i=0;i<selectedFiles.length;i++){
    const file = selectedFiles[i];
    uploadProgressText.textContent = `Uploading ${file.name}... (${i+1}/${selectedFiles.length})`;
    for(let p=0;p<=100;p+=10){
      const overallProgress = ((i + p/100)/selectedFiles.length)*100;
      uploadProgressBar.style.width = `${overallProgress}%`;
      uploadPercentage.textContent = `${Math.round(overallProgress)}%`;
      await new Promise(r=>setTimeout(r,50));
    }
  }
  uploadProgressBar.style.width='100%'; uploadPercentage.textContent='100%'; uploadProgressText.textContent='All files uploaded successfully!';
  setTimeout(()=>{
    uploadProgressContainer.classList.add('hidden'); 
    uploadProgressContainer.classList.remove('uploading'); 
    uploadProgressBar.style.width='0%'; 
    uploadPercentage.textContent='0%'; 
    uploadProgressText.textContent=''; 
    uploadInProgress=false;
  },2000);
}
