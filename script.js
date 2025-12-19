// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ========== Hamburger Menu Toggle ========== */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    // Open / close on button click
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation(); // prevent outside-click handler from instantly closing
      nav.classList.toggle("nav-open");
      menuToggle.classList.toggle("is-open");
    });

    // Close on nav-link click
    const navLinks = nav.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        menuToggle.classList.remove("is-open");
      });
    });

    // Close when clicking outside header / nav
    document.addEventListener("click", (event) => {
      const clickedInsideHeader = event.target.closest(".header");
      if (!clickedInsideHeader) {
        nav.classList.remove("nav-open");
        menuToggle.classList.remove("is-open");
      }
    });
  }

  /* ========== Smooth Scroll for Anchor Links ========== */
  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      // ignore empty or just "#"
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const targetRect = target.getBoundingClientRect();
      const offsetTop = targetRect.top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
});