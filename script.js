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
});
