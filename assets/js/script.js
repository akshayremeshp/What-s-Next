document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  /* ========== Hamburger Menu ========== */
  if (menuToggle && nav) {
    // Toggle menu on button click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();

      nav.classList.toggle("nav-open");
      menuToggle.classList.toggle("is-open");

      const isOpen = menuToggle.classList.contains("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside the header
    document.addEventListener("click", (e) => {
      const insideHeader = e.target.closest(".header");

      if (!insideHeader) {
        nav.classList.remove("nav-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ========== Smooth Scroll with Header Offset ========== */
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");

      // Ignore empty, "#" only, or non-existent targets
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const rect = target.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ========== Chat Widget ========== */
  const chatToggle = document.querySelector(".chat-toggle");
  const chatPanel = document.querySelector(".chat-panel");
  const chatClose = document.querySelector(".chat-close");
  const chatMessages = document.querySelector(".chat-messages");
  const chatForm = document.querySelector(".chat-form");
  const chatInput = document.querySelector("#chat-input");
  const quickReplies = document.querySelectorAll(".quick-reply");

  const addMessage = (text, sender) => {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const respondToUser = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("after 10th") || lower.includes("10th")) {
      return "For after 10th, explore streams like science, commerce and arts. If you want tech direction, the After 10th module explains options by interest and study plan.";
    }

    if (lower.includes("plus two") || lower.includes("plus 2")) {
      return "After Plus Two, choose a degree or skill track based on what you enjoy. Check the Plus Two module for degree options, career fit, and practical next steps.";
    }

    if (lower.includes("mentorship") || lower.includes("mentor") || lower.includes("guidance")) {
      return "Mentorship helps with direction, confidence, and accountability. The Mentorship page explains the support available and how you can get 1-to-1 help.";
    }

    if (lower.includes("linkedin") || lower.includes("profile")) {
      return "You can build your professional brand with the LinkedIn Mastery module. It covers profile setup, networking, and growth strategies for students and freshers.";
    }

    if (lower.includes("interview") || lower.includes("college students")) {
      return "Interview preparation is covered in the College Students & Interviews module. It includes communication tips, confidence-building, and how to present yourself well.";
    }

    return "Hi! I can help with module guidance, study path choices, or how to contact Akshay. Try mentioning After 10th, Plus Two, Mentorship, or LinkedIn.";
  };

  const openChat = () => {
    if (!chatPanel) return;
    chatPanel.hidden = false;
    chatToggle.setAttribute("aria-expanded", "true");
    chatInput.focus();
  };

  const closeChat = () => {
    if (!chatPanel) return;
    chatPanel.hidden = true;
    chatToggle.setAttribute("aria-expanded", "false");
  };

  if (chatToggle && chatPanel) {
    chatToggle.addEventListener("click", () => {
      if (chatPanel.hidden) {
        openChat();
      } else {
        closeChat();
      }
    });
  }

  if (chatClose) {
    chatClose.addEventListener("click", closeChat);
  }

  document.addEventListener("click", (event) => {
    const isInsideChat = event.target.closest(".chat-widget");
    if (!isInsideChat && chatPanel && !chatPanel.hidden) {
      closeChat();
    }
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      addMessage(text, "user");
      chatInput.value = "";
      const reply = respondToUser(text);
      setTimeout(() => addMessage(reply, "bot"), 250);
    });
  }

  quickReplies.forEach((button) => {
    button.addEventListener("click", () => {
      const text = button.textContent.trim();
      if (!text) return;
      addMessage(text, "user");
      const reply = respondToUser(text);
      setTimeout(() => addMessage(reply, "bot"), 250);
      openChat();
    });
  });
});
