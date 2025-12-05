// Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    menuToggle.classList.toggle('is-open');
  });

  // Close menu when a link is clicked
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      menuToggle.classList.remove('is-open');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header')) {
    nav?.classList.remove('nav-open');
    menuToggle?.classList.remove('is-open');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
