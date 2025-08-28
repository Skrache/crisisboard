// Set current year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Animation Controller
class AnimationController {
    constructor() {
        this.initializeAnimations();
        this.initializeInteractions();
    }

    initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        document
            .querySelectorAll(
                ".fade-in, .slide-in-left, .slide-in-right, .scale-in",
            )
            .forEach((el) => {
                observer.observe(el);
            });
    }

    initializeInteractions() {
        // Ripple effect for buttons
        document
            .querySelectorAll(".btn-primary")
            .forEach((button) => {
                button.addEventListener("click", this.createRipple);
            });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Theme Controller
class ThemeController {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.getElementById("themeToggle");
        this.themeToggleMobile = document.getElementById("themeToggleMobile");
        this.currentTheme = localStorage.getItem("theme") || "light";

        this.initializeTheme();
        this.bindEvents();
    }

    initializeTheme() {
        this.body.classList.toggle("dark", this.currentTheme === "dark");
        this.themeToggle?.classList.toggle("dark", this.currentTheme === "dark");
        this.themeToggleMobile?.classList.toggle("dark", this.currentTheme === "dark");
    }

    toggleTheme() {
        const isDark = this.body.classList.toggle("dark");
        this.themeToggle?.classList.toggle("dark", isDark);
        this.themeToggleMobile?.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    bindEvents() {
        this.themeToggle?.addEventListener("click", () => this.toggleTheme());
        this.themeToggleMobile?.addEventListener("click", () => this.toggleTheme());
    }
}

// Mobile Menu Controller
class MobileMenuController {
    constructor() {
        this.mobileMenu = document.querySelector(".sidebar");
        this.openButton = document.getElementById("mobileMenuToggle");
        this.closeButton = document.getElementById("mobileCloseBtn");

        this.bindEvents();
    }

    bindEvents() {
        this.openButton?.addEventListener("click", () => this.openMenu());
        this.closeButton?.addEventListener("click", () => this.closeMenu());

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (
                !this.mobileMenu?.contains(e.target) &&
                !this.openButton?.contains(e.target)
            ) {
                this.closeMenu();
            }
        });
    }

    openMenu() {
        this.mobileMenu?.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    closeMenu() {
        this.mobileMenu?.classList.remove("open");
        document.body.style.overflow = "";
    }
}

// Enhanced Form Handler
class FormHandler {
    constructor() {
        this.form = document.getElementById("complaintForm");
        this.textArea = document.getElementById("issueText");
        this.fileInput = document.getElementById("fileInput");
        this.fileUploadArea = document.getElementById("fileUploadArea");
        this.filePreviewContainer = document.getElementById("filePreviewContainer");
        this.filePreviewGrid = document.getElementById("filePreviewGrid");
        this.statusMessage = document.getElementById("statusMessage");
        this.charCount = document.getElementById("charCount");
        this.fileCount = document.getElementById("fileCount");
        this.totalSize = document.getElementById("totalSize");

        this.selectedFiles = [];
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
        this.maxTotalSize = 20 * 1024 * 1024; // 20MB
        this.maxFiles = 10;

        this.bindEvents();
    }

    bindEvents() {
        this.form?.addEventListener("submit", (e) => this.handleSubmit(e));
        this.textArea?.addEventListener("input", () => this.updateCharCount());
        this.fileInput?.addEventListener("change", (e) => this.handleFileSelect(e));

        // Drag and drop
        this.fileUploadArea?.addEventListener("dragover", (e) => this.handleDragOver(e));
        this.fileUploadArea?.addEventListener("dragleave", (e) => this.handleDragLeave(e));
        this.fileUploadArea?.addEventListener("drop", (e) => this.handleDrop(e));
        this.fileUploadArea?.addEventListener("click", () => this.fileInput?.click());

        // Clear all files
        document.getElementById("clearAllFiles")?.addEventListener("click", () => this.clearAllFiles());
    }

    updateCharCount() {
        const count = this.textArea?.value.length || 0;
        if (this.charCount) {
            this.charCount.textContent = `${count} / 500`;
            if (count < 20) {
                this.charCount.style.color = "#ef4444";
            } else if (count > 450) {
                this.charCount.style.color = "#f59e0b";
            } else {
                this.charCount.style.color = "#10b981";
            }
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        this.fileUploadArea?.classList.add("drag-over");
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.fileUploadArea?.classList.remove("drag-over");
    }

    handleDrop(e) {
        e.preventDefault();
        this.fileUploadArea?.classList.remove("drag-over");
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    }

    processFiles(files) {
        const validFiles = files.filter((file) => {
            if (file.size > this.maxFileSize) {
                this.showMessage(`File "${file.name}" is too large (max 5MB)`, "error");
                return false;
            }
            return true;
        });

        if (this.selectedFiles.length + validFiles.length > this.maxFiles) {
            this.showMessage(`Maximum ${this.maxFiles} files allowed`, "error");
            return;
        }

        const totalSize = [...this.selectedFiles, ...validFiles].reduce((sum, file) => sum + file.size, 0);
        if (totalSize > this.maxTotalSize) {
            this.showMessage("Total file size exceeds 20MB limit", "error");
            return;
        }

        this.selectedFiles.push(...validFiles);
        this.updateFilePreview();
        this.showPrivacyBadge();
    }

    updateFilePreview() {
        if (this.selectedFiles.length === 0) {
            this.filePreviewContainer?.classList.add("hidden");
            return;
        }

        this.filePreviewContainer?.classList.remove("hidden");
        this.filePreviewGrid.innerHTML = "";

        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement("div");
            fileItem.className = "interactive-card rounded-xl p-3 text-center relative card-hover";

            const fileIcon = this.getFileIcon(file.type);
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);

            fileItem.innerHTML = `
                <div class="text-2xl mb-2">${fileIcon}</div>
                <div class="text-xs font-medium text-gray-800 truncate">${file.name}</div>
                <div class="text-xs text-gray-500">${fileSize} MB</div>
                <button type="button" class="remove-btn absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors" onclick="formHandler.removeFile(${index})">
                    <svg class="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            `;

            this.filePreviewGrid.appendChild(fileItem);
        });

        this.updateFileStats();
    }

    getFileIcon(mimeType) {
        if (mimeType.startsWith("image/")) return "📷";
        if (mimeType.startsWith("video/")) return "🎬";
        if (mimeType.startsWith("audio/")) return "🎵";
        if (mimeType.includes("pdf")) return "📄";
        if (mimeType.includes("document") || mimeType.includes("word")) return "📝";
        return "📎";
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.updateFilePreview();
    }

    clearAllFiles() {
        this.selectedFiles = [];
        this.updateFilePreview();
        this.fileInput.value = "";
    }

    updateFileStats() {
        const totalSize = this.selectedFiles.reduce((sum, file) => sum + file.size, 0);
        const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

        if (this.fileCount) this.fileCount.textContent = this.selectedFiles.length;
        if (this.totalSize) this.totalSize.textContent = `${totalSizeMB} MB`;
    }

    showPrivacyBadge() {
        const badge = document.getElementById("privacyBadgeContainer");
        if (badge) {
            badge.style.opacity = "1";
            setTimeout(() => {
                badge.style.opacity = "0";
            }, 3000);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const issueText = this.textArea?.value.trim();
        if (!issueText || issueText.length < 20) {
            this.showMessage("Please provide a detailed description (minimum 20 characters)", "error");
            return;
        }

        this.showMessage("Submitting your issue...", "info");
        this.form?.classList.add("loading");

        try {
            // Simulate upload progress
            await this.simulateUpload();

            // Here you would integrate with your existing app.js functionality
            this.showMessage("Issue submitted successfully! You will receive updates on the progress.", "success");
            this.resetForm();
        } catch (error) {
            this.showMessage("Failed to submit issue. Please try again.", "error");
        } finally {
            this.form?.classList.remove("loading");
        }
    }

    async simulateUpload() {
        if (this.selectedFiles.length === 0) return;

        const progressContainer = document.getElementById("uploadProgressContainer");
        const progressBar = document.getElementById("uploadProgressBar");
        const progressText = document.getElementById("uploadProgressText");
        const progressPercentage = document.getElementById("uploadPercentage");

        progressContainer?.classList.remove("hidden");

        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            if (progressBar) progressBar.style.width = `${i}%`;
            if (progressPercentage) progressPercentage.textContent = `${i}%`;
            if (progressText) {
                if (i < 30) progressText.textContent = "Preparing files...";
                else if (i < 70) progressText.textContent = "Uploading files...";
                else if (i < 90) progressText.textContent = "Processing...";
                else progressText.textContent = "Complete!";
            }
        }

        setTimeout(() => {
            progressContainer?.classList.add("hidden");
        }, 2000);
    }

    showMessage(message, type) {
        if (!this.statusMessage) return;

        const colors = {
            success: "text-green-600 bg-green-50 border-green-200",
            error: "text-red-600 bg-red-50 border-red-200",
            info: "text-blue-600 bg-blue-50 border-blue-200",
        };

        this.statusMessage.className = `p-4 rounded-xl border-2 ${colors[type] || colors.info} transition-all duration-300`;
        this.statusMessage.textContent = message;
        this.statusMessage.style.opacity = "1";

        if (type === "success" || type === "error") {
            setTimeout(() => {
                this.statusMessage.style.opacity = "0";
            }, 5000);
        }
    }

    resetForm() {
        this.form?.reset();
        this.selectedFiles = [];
        this.updateFilePreview();
        this.updateCharCount();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const animationController = new AnimationController();
    const themeController = new ThemeController();
    const mobileMenuController = new MobileMenuController();
    window.formHandler = new FormHandler(); // Make it globally accessible for onclick handlers
});