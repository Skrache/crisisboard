/*  public/app.js - Enhanced File Upload Implementation  */

/*  DOM refs  */
const signInBtn = document.getElementById("signInBtn");
const userEmailLbl = document.getElementById("userEmail");
const complaintForm = document.getElementById("complaintForm");
const issueText = document.getElementById("issueText");
const includeEmailCb = document.getElementById("includeEmail");
const statusMsg = document.getElementById("statusMessage");
const complaintsList = document.getElementById("complaintsList");
const submitAnonymouslyCb = document.getElementById("submitAnonymously");
const privacyTooltipBtn = document.getElementById("privacyTooltipBtn");
const privacyTooltip = document.getElementById("privacyTooltip");
const privacyBadgeContainer = document.getElementById("privacyBadgeContainer");
const privacyLiveRegion = document.getElementById("privacyLiveRegion");

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

/*  File Upload Configuration  */
const allowedTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/aac',
  'video/mp4', 'video/avi', 'video/mov', 'video/quicktime'
];

const maxFileSize = 5 * 1024 * 1024; // 5MB per file
const maxTotalSize = 20 * 1024 * 1024; // 20MB total
const maxFiles = 10; // Maximum number of files

let selectedFiles = [];
let uploadInProgress = false;

/*  File Type Icons Mapping  */
const fileTypeIcons = {
  'image': '🖼️',
  'audio': '🎵',
  'video': '🎬',
  'application/pdf': '📄',
  'application/msword': '📝',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
  'default': '📎'
};

/*  Utility Functions  */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileIcon(file) {
  if (file.type.startsWith('image/')) return fileTypeIcons.image;
  if (file.type.startsWith('audio/')) return fileTypeIcons.audio;
  if (file.type.startsWith('video/')) return fileTypeIcons.video;
  return fileTypeIcons[file.type] || fileTypeIcons.default;
}

function validateFile(file) {
  const errors = [];
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed: ${file.name}`);
  }
  
  // Check file size
  if (file.size > maxFileSize) {
    errors.push(`File too large: ${file.name} (${formatFileSize(file.size)})`);
  }
  
  // Check if file already exists
  if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
    errors.push(`File already selected: ${file.name}`);
  }
  
  return errors;
}
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
function validateTotalSize(newFiles) {
  const currentTotal = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  const newTotal = newFiles.reduce((sum, f) => sum + f.size, 0);
  
  if (currentTotal + newTotal > maxTotalSize) {
    return `Total file size limit exceeded. Current: ${formatFileSize(currentTotal)}, Adding: ${formatFileSize(newTotal)}, Limit: ${formatFileSize(maxTotalSize)}`;
  }
  
  if (selectedFiles.length + newFiles.length > maxFiles) {
    return `Maximum ${maxFiles} files allowed. Current: ${selectedFiles.length}, Adding: ${newFiles.length}`;
  }
  
  return null;
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 transform translate-x-full`;
  
  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };
  
  notification.className += ` ${colors[type]}`;
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white hover:text-gray-200">✕</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}
  let email;
  if (submitAnonymouslyCb.checked) {
    email = "anonymous";
  } else if (includeEmailCb.checked) {
    email = "user@example.com";
  } else {
    email = "not provided";
  }
/*  File Preview Management  */
function updateFilePreview() {
  filePreviewGrid.innerHTML = '';
  
  if (selectedFiles.length === 0) {
    filePreviewContainer.classList.add('hidden');
    updateFileStats(); // Always update stats even when no files
    return;
  }
  
  filePreviewContainer.classList.remove('hidden');
  
  selectedFiles.forEach((file, idx) => {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-preview-item bg-white rounded-lg p-3 shadow-md border border-gray-200 dark-mode-item';
    
    const icon = getFileIcon(file);
    const isImage = file.type.startsWith('image/');
    
    fileDiv.innerHTML = `
      <div class="relative">
        <div class="flex flex-col items-center">
          ${isImage ? 
            `<img src="${URL.createObjectURL(file)}" class="w-16 h-16 object-cover rounded mb-2 file-icon" alt="${file.name}">` :
            `<div class="w-16 h-16 flex items-center justify-center text-3xl file-type-icon">${icon}</div>`
          }
          <div class="text-center">
            <div class="text-xs font-medium text-gray-800 truncate max-w-20" title="${file.name}">${file.name}</div>
            <div class="text-xs text-gray-500">${formatFileSize(file.size)}</div>
          </div>
        </div>
        <button class="remove-btn absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors" 
                onclick="removeFile(${idx})" title="Remove file">
          ✕
        </button>
      </div>
    `;
    
    filePreviewGrid.appendChild(fileDiv);
  });
  
  updateFileStats();
}

function updateFileStats() {
  const totalSizeBytes = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  fileCount.textContent = selectedFiles.length;
  totalSize.textContent = formatFileSize(totalSizeBytes);
  
  // Update upload area text based on file count
  if (selectedFiles.length > 0) {
    fileUploadArea.innerHTML = `
      <div class="space-y-3">
        <div class="text-4xl text-green-500">✅</div>
        <div>
          <p class="text-gray-600 font-medium">Files added successfully</p>
          <p class="text-xs text-blue-600 font-medium mt-2 cursor-pointer hover:text-blue-800 transition-colors underline">Click to add more files</p>
        </div>
        <div class="absolute bottom-2 right-2 text-xs text-green-600 font-medium">
          ${selectedFiles.length === 1 ? 'A file is added' : `${selectedFiles.length} files added`}
        </div>
      </div>
    `;
  } else {
    fileUploadArea.innerHTML = `
      <div class="space-y-3">
        <div class="text-4xl text-gray-400 group-hover:text-blue-500 transition-colors">
          📎
        </div>
        <div>
          <p class="text-gray-600 font-medium">Drag & drop files here, or <span class="text-blue-600 underline cursor-pointer hover:text-blue-800" id="fileInputLabel">browse</span></p>
          <p class="text-xs text-gray-400 mt-2">Max 5MB per file, 20MB total</p>
          <p class="text-xs text-gray-400">Supported: Images, PDFs, Documents, Audio, Video</p>
        </div>
      </div>
    `;
  }
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  updateFilePreview();
  showNotification('File removed', 'info');
}

function clearAllFilesHandler() {
  selectedFiles = [];
  console.log('Clearing all files, selectedFiles length:', selectedFiles.length);
  updateFilePreview();
  showNotification('All files cleared', 'info');
}

/*  File Processing  */
function processFiles(files) {
  const fileArray = Array.from(files);
  const errors = [];
  const validFiles = [];
  
  // Check total size and count limits first
  const totalError = validateTotalSize(fileArray);
  if (totalError) {
    showNotification(totalError, 'error');
    return;
  }
  
  // Validate each file
  fileArray.forEach(file => {
    const fileErrors = validateFile(file);
    if (fileErrors.length > 0) {
      errors.push(...fileErrors);
    } else {
      validFiles.push(file);
    }
  });
  
  // Show errors if any
  if (errors.length > 0) {
    errors.forEach(error => showNotification(error, 'error'));
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
  
  // Add valid files
  if (validFiles.length > 0) {
    selectedFiles.push(...validFiles);
    updateFilePreview();
    showNotification(`${validFiles.length} file(s) added successfully`, 'success');
  }
}

/*  Drag and Drop Handlers  */
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  fileUploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!fileUploadArea.contains(e.relatedTarget)) {
    fileUploadArea.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  fileUploadArea.classList.remove('drag-over');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    processFiles(files);
  }
}

/*  Upload Progress Simulation  */
async function simulateFileUpload() {
  if (selectedFiles.length === 0) return;
  
  uploadInProgress = true;
  uploadProgressContainer.classList.remove('hidden');
  uploadProgressContainer.classList.add('uploading');
  
  const totalFiles = selectedFiles.length;
  let uploadedFiles = 0;
  
  for (let i = 0; i < totalFiles; i++) {
    const file = selectedFiles[i];
    uploadProgressText.textContent = `Uploading ${file.name}... (${i + 1}/${totalFiles})`;
    
    // Simulate upload progress for each file
    for (let progress = 0; progress <= 100; progress += 10) {
      const overallProgress = ((i + progress / 100) / totalFiles) * 100;
      uploadProgressBar.style.width = `${overallProgress}%`;
      uploadPercentage.textContent = `${Math.round(overallProgress)}%`;
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    uploadedFiles++;
  }
  
  // Complete upload
  uploadProgressBar.style.width = '100%';
  uploadPercentage.textContent = '100%';
  uploadProgressText.textContent = 'All files uploaded successfully!';
  
  // Hide progress after delay
  setTimeout(() => {
    uploadProgressContainer.classList.add('hidden');
    uploadProgressContainer.classList.remove('uploading');
    uploadProgressBar.style.width = '0%';
    uploadPercentage.textContent = '0%';
    uploadProgressText.textContent = '';
    uploadInProgress = false;
  }, 2000);
}

/*  Event Listeners  */
document.addEventListener('DOMContentLoaded', function() {
  // File input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      processFiles(e.target.files);
      fileInput.value = ''; // Reset input
    }
  });
  
  // Drag and drop events
  fileUploadArea.addEventListener('dragover', handleDragOver);
  fileUploadArea.addEventListener('dragleave', handleDragLeave);
  fileUploadArea.addEventListener('drop', handleDrop);
  
  // Click to browse - improved event delegation for dynamic elements
  fileUploadArea.addEventListener('click', (e) => {
    // Handle clicks on the upload area itself, browse link, or "add more files" text
    if (e.target === fileUploadArea || 
        e.target.id === 'fileInputLabel' || 
        e.target.closest('#fileInputLabel') ||
        e.target.textContent === 'Click to add more files' ||
        e.target.closest('p')?.textContent?.includes('Click to add more files')) {
      e.preventDefault();
      e.stopPropagation();
      console.log('File input clicked via:', e.target.textContent || e.target.id || 'upload area');
      fileInput.click();
    }
  });
  
  // Clear all files
  clearAllFiles.addEventListener('click', clearAllFilesHandler);
  
  // Dummy sign-in for now
  signInBtn.addEventListener("click", () => {
    showNotification("Sign-in functionality is not implemented yet.", "info");
  });
  
  // Form submission
  complaintForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const text = issueText.value.trim();
    if (!text) {
      showNotification("Please enter an issue description.", "error");
      return;
    }
    
    if (uploadInProgress) {
      showNotification("Please wait for file upload to complete.", "warning");
      return;
    }
    
    const email = includeEmailCb.checked ? "user@example.com" : "anonymous";
    
    try {
      // Simulate file upload if files are selected
      if (selectedFiles.length > 0) {
        await simulateFileUpload();
      }
      
      // TODO: Replace this with actual backend integration
      console.log("Submitting complaint:", { 
        text, 
        email, 
        files: selectedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
      });
      
      // Store file count before clearing
      const fileCountForComplaint = selectedFiles.length;
      
      // Create complaint item with enhanced UI
      const complaintItem = document.createElement("div");
      complaintItem.className = "bg-white rounded-lg p-4 shadow-md border border-gray-200 dark-mode-item mb-3";
      
      const fileInfo = fileCountForComplaint > 0 ? 
        `<div class="text-xs text-gray-500 mt-2">📎 ${fileCountForComplaint} file(s) attached</div>` : '';
      
      complaintItem.innerHTML = `
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-gray-800 text-sm md:text-base">${text}</p>
            <p class="text-xs md:text-sm text-gray-500 mt-2">Submitted just now</p>
            ${fileInfo}
          </div>
          <span class="ml-3 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Pending
          </span>
        </div>
      `;
      
      complaintsList.prepend(complaintItem);
      
      // Clear form
      issueText.value = "";
      includeEmailCb.checked = false;
      selectedFiles = [];
      updateFilePreview();
      
      showNotification("✅ Issue submitted successfully!", "success");
      
    } catch (err) {
      showNotification("Submission failed: " + err.message, "error");
    }
  });
});

/*  Dark Mode Support for File Upload  */
function updateDarkModeForFiles() {
  const isDark = document.body.classList.contains('dark');
  const fileItems = document.querySelectorAll('.file-preview-item');
  
  fileItems.forEach(item => {
    if (isDark) {
      item.classList.add('dark-mode-item');
    } else {
      item.classList.remove('dark-mode-item');
    }
  });
}

// Listen for theme changes
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      updateDarkModeForFiles();
    }
  });
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
