// Hamburger menu logic for AvatarVerse

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('header .site-header nav, .site-header nav');
  const hamburger = document.getElementById('mobile-nav-toggle');
  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', function() {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // If menu is opened, add outside click listener
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', outsideClickListener);
      }, 0);
    } else {
      document.removeEventListener('click', outsideClickListener);
    }
  });

  // Function to close menu if click is outside nav or hamburger
  function outsideClickListener(e) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', outsideClickListener);
    }
  }

  // Close menu when a nav link is clicked (on mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 600) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Ripple effect for .cta-btn and .secondary-cta
  function addRippleEffect(e) {
    const btn = e.currentTarget;
    btn.classList.remove('ripple');
    void btn.offsetWidth; // force reflow
    btn.classList.add('ripple');
    setTimeout(() => btn.classList.remove('ripple'), 400);
  }
  document.querySelectorAll('.cta-btn, .secondary-cta').forEach(btn => {
    btn.addEventListener('click', addRippleEffect);
  });

  // Entrance animation for sections when in view
  function animateOnScroll() {
    document.querySelectorAll('.steps-section, .featured-avatars-section').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.classList.add('in-view');
      }
    });
  }
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}); 