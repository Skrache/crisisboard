// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.body = document.body;
    this.currentTheme = localStorage.getItem("theme") || "light";

    this.init();
  }

  init() {
    // Apply saved theme
    this.body.classList.toggle("dark", this.currentTheme === "dark");

    // Add event listener
    this.themeToggle?.addEventListener("click", () => this.toggleTheme());
  }

  toggleTheme() {
    const isDark = this.body.classList.toggle("dark");
    this.currentTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", this.currentTheme);

    // Animate theme transition
    this.body.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    setTimeout(() => {
      this.body.style.transition = "";
    }, 300);
  }
}

// Mobile Menu Management
class MobileMenuManager {
  constructor() {
    this.menuBtn = document.getElementById("mobileMenuBtn");
    this.mobileMenu = document.getElementById("mobileMenu");
    this.closeBtn = document.getElementById("mobileCloseBtn");
    this.menuLinks = document.querySelectorAll(".mobile-nav-link");

    this.init();
  }

  init() {
    this.menuBtn?.addEventListener("click", () => this.toggleMenu());
    this.closeBtn?.addEventListener("click", () => this.closeMenu());

    // Close menu when clicking links
    this.menuLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (
        !this.mobileMenu?.contains(e.target) &&
        !this.menuBtn?.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    const isActive = this.menuBtn?.classList.toggle("active");
    this.mobileMenu?.classList.toggle("active", isActive);
    document.body.style.overflow = isActive ? "hidden" : "";
  }

  closeMenu() {
    this.menuBtn?.classList.remove("active");
    this.mobileMenu?.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Animation Controller
class AnimationController {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupTypingAnimation();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe animated elements
    document.querySelectorAll(".fade-in, .slide-in-up").forEach((el) => {
      observer.observe(el);
    });
  }

  setupTypingAnimation() {
    const typingText = document.querySelector(".typing-text");
    if (!typingText) return;

    const text = typingText.dataset.text || typingText.textContent;
    let index = 0;

    typingText.textContent = "";

    const typeWriter = () => {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 150);
      }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
  }
}

// Rating System
class RatingSystem {
  constructor() {
    this.stars = document.querySelectorAll(".star");
    this.ratingText = document.getElementById("ratingText");
    this.currentRating = 0;

    this.ratingTexts = {
      1: "Poor - Needs significant improvement",
      2: "Fair - Some issues to address",
      3: "Good - Generally satisfactory",
      4: "Very Good - Mostly excellent",
      5: "Excellent - Outstanding experience",
    };

    this.init();
  }

  init() {
    this.stars.forEach((star, index) => {
      star.addEventListener("mouseover", () => this.highlightStars(index + 1));
      star.addEventListener("mouseout", () =>
        this.highlightStars(this.currentRating)
      );
      star.addEventListener("click", () => this.selectRating(index + 1));
    });
  }

  highlightStars(rating) {
    this.stars.forEach((star, index) => {
      star.classList.toggle("active", index < rating);
    });

    if (rating > 0) {
      this.ratingText.textContent = this.ratingTexts[rating];
    } else {
      this.ratingText.textContent = "Rate your experience";
    }
  }

  selectRating(rating) {
    this.currentRating = rating;
    this.highlightStars(rating);

    // Add a subtle animation
    this.stars.forEach((star, index) => {
      if (index < rating) {
        star.style.transform = "scale(1.2)";
        setTimeout(() => {
          star.style.transform = "scale(1.1)";
        }, 200);
      }
    });
  }

  getRating() {
    return this.currentRating;
  }
}

// Form Validation and Submission
class FeedbackForm {
  constructor() {
    this.form = document.getElementById("feedbackForm");
    this.submitBtn = document.getElementById("submitBtn");
    this.btnText = this.submitBtn?.querySelector(".btn-text");
    this.btnLoading = this.submitBtn?.querySelector(".btn-loading");
    this.messageTextarea = document.getElementById("message");
    this.charCount = document.getElementById("charCount");
    this.successMessage = document.getElementById("successMessage");
    this.formWrapper = document.querySelector(".feedback-form-wrapper");

    this.maxChars = 500;
    this.isSubmitting = false;

    this.init();
  }

  init() {
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));
    this.messageTextarea?.addEventListener("input", () =>
      this.updateCharCount()
    );
    document
      .getElementById("submitAnotherBtn")
      ?.addEventListener("click", () => this.showForm());

    // Add input animations
    this.setupInputAnimations();

    // Initialize character counter
    this.updateCharCount();
  }

  setupInputAnimations() {
    const inputs = document.querySelectorAll(
      ".form-input, .form-textarea, .form-select"
    );

    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        e.target.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", (e) => {
        e.target.parentElement.classList.remove("focused");
      });
    });
  }

  updateCharCount() {
    if (!this.messageTextarea || !this.charCount) return;

    const currentLength = this.messageTextarea.value.length;
    this.charCount.textContent = currentLength;

    // Change color based on character limit
    const percentage = currentLength / this.maxChars;
    if (percentage > 0.9) {
      this.charCount.style.color = "var(--error-color)";
    } else if (percentage > 0.7) {
      this.charCount.style.color = "var(--warning-color)";
    } else {
      this.charCount.style.color = "var(--text-tertiary)";
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Get form data
    const formData = this.getFormData();

    // Validate form
    if (!this.validateForm(formData)) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // Simulate API call
      await this.submitFeedback(formData);

      // Show success message
      this.showSuccessMessage();
    } catch (error) {
      console.error("Submission error:", error);
      this.showErrorMessage("Failed to submit feedback. Please try again.");
    } finally {
      this.setLoadingState(false);
    }
  }

  getFormData() {
    return {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      category: document.getElementById("category")?.value || "",
      rating: window.ratingSystem?.getRating() || 0,
      message: this.messageTextarea?.value.trim() || "",
    };
  }

  validateForm(data) {
    const errors = [];

    if (!data.name) {
      errors.push("Name is required");
      this.highlightError("name");
    }

    if (!data.category) {
      errors.push("Please select a feedback category");
      this.highlightError("category");
    }

    if (!data.message) {
      errors.push("Message is required");
      this.highlightError("message");
    } else if (data.message.length > this.maxChars) {
      errors.push(`Message must be less than ${this.maxChars} characters`);
      this.highlightError("message");
    }

    if (data.email && !this.isValidEmail(data.email)) {
      errors.push("Please enter a valid email address");
      this.highlightError("email");
    }

    if (errors.length > 0) {
      this.showErrorMessage(errors[0]);
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  highlightError(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
      field.style.borderColor = "var(--error-color)";
      field.focus();

      // Remove error styling after a delay
      setTimeout(() => {
        field.style.borderColor = "";
      }, 3000);
    }
  }

  async submitFeedback(data) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 95% success rate
        if (Math.random() > 0.05) {
          console.log("Feedback submitted:", data);
          resolve();
        } else {
          reject(new Error("Submission failed"));
        }
      }, 2000);
    });
  }

  setLoadingState(loading) {
    this.isSubmitting = loading;
    this.submitBtn.disabled = loading;
    this.submitBtn.classList.toggle("loading", loading);
  }

  showSuccessMessage() {
    // Hide form with animation
    this.formWrapper.style.transform = "translateY(-20px)";
    this.formWrapper.style.opacity = "0";

    setTimeout(() => {
      this.formWrapper.style.display = "none";
      this.successMessage.classList.add("show");
      this.successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  }

  showForm() {
    // Reset form
    this.form.reset();
    this.updateCharCount();
    window.ratingSystem?.highlightStars(0);

    // Show form
    this.successMessage.classList.remove("show");
    this.formWrapper.style.display = "block";
    this.formWrapper.style.transform = "translateY(0)";
    this.formWrapper.style.opacity = "1";

    // Focus first input
    document.getElementById("name")?.focus();
  }

  showErrorMessage(message) {
    // Create and show error notification
    const notification = document.createElement("div");
    notification.className = "error-notification";
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--error-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }
}

// Particle System
class ParticleSystem {
  constructor() {
    this.container = document.getElementById("particlesContainer");
    this.particles = [];
    this.isActive = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (this.isActive) {
      this.init();
    }
  }

  init() {
    this.createParticles();
    this.startAnimation();
  }

  createParticles() {
    const particleCount = window.innerWidth < 768 ? 3 : 6;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random positioning and timing
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 20;
    const animationDuration = 15 + Math.random() * 10;

    particle.style.cssText = `
            left: ${left}%;
            animation-delay: ${animationDelay}s;
            animation-duration: ${animationDuration}s;
        `;

    this.container?.appendChild(particle);
    this.particles.push(particle);

    // Remove and recreate particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
        this.createParticle();
      }
    }, (animationDelay + animationDuration) * 1000);
  }

  startAnimation() {
    // Particles are animated via CSS
    // This method can be expanded for more complex animations
  }
}

// Ripple Effect
class RippleEffect {
  static createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  static init() {
    // Add ripple effect to buttons
    document.querySelectorAll(".submit-btn, .btn-primary").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (!button.disabled) {
          RippleEffect.createRipple(e, button);
        }
      });
    });
  }
}

// Performance Monitor
class PerformanceMonitor {
  static init() {
    // Monitor performance and reduce animations if needed
    const connection = navigator.connection;
    const isSlowConnection =
      connection &&
      (connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g");

    if (isSlowConnection) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.1s"
      );
      console.log("Reduced animations for slow connection");
    }

    // Monitor frame rate
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fps = 60;

    function measureFPS() {
      const now = performance.now();
      frameCount++;

      if (now - lastFrameTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = now;

        // Reduce animations if FPS is low
        if (fps < 30) {
          document.documentElement.style.setProperty(
            "--animation-duration",
            "0.2s"
          );
        }
      }

      requestAnimationFrame(measureFPS);
    }

    measureFPS();
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  window.themeManager = new ThemeManager();
  window.mobileMenuManager = new MobileMenuManager();
  window.animationController = new AnimationController();
  window.ratingSystem = new RatingSystem();
  window.feedbackForm = new FeedbackForm();
  window.particleSystem = new ParticleSystem();

  // Initialize effects
  RippleEffect.init();
  PerformanceMonitor.init();

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  console.log("CrisisBoard Feedback Page initialized successfully");
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is hidden to save resources
    document.documentElement.style.animationPlayState = "paused";
  } else {
    document.documentElement.style.animationPlayState = "running";
  }
});

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recalculate particle system if needed
    if (window.particleSystem?.isActive) {
      // Refresh particles for new screen size
      console.log("Adjusting particles for new screen size");
    }
  }, 250);
});

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ThemeManager,
    MobileMenuManager,
    AnimationController,
    RatingSystem,
    FeedbackForm,
    ParticleSystem,
    RippleEffect,
  };
}
