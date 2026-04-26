// Tailwind Configuration
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          orange: {
            400: '#FF8C42',
            500: '#FF6B00',
            600: '#E05A00',
            700: '#C44D00',
          },
          zinc: {
            950: '#0A0A0A',
          }
        },
        fontFamily: {
          display: ['Bebas Neue', 'sans-serif'],
          condensed: ['Barlow Condensed', 'sans-serif'],
          body: ['Barlow', 'sans-serif'],
        }
      }
    }
  };
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });
}

/* ── Mobile menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    const lines = hamburger.querySelectorAll('.hamburger-line');
    if (menuOpen) {
      mobileMenu.classList.add('open');
      mobileMenu.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      const lines = hamburger.querySelectorAll('.hamburger-line');
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    });
  });
}

/* ── Scroll reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Scroll to top ── */
const scrollBtn = document.getElementById('scroll-top');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
    }
  }, { passive: true });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Hero parallax (subtle) ── */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const scrolled = window.scrollY;
  const heroBg = hero.querySelector('.hero-grid-bg');
  if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.2}px)`;
}, { passive: true });

/* ── Active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#FF6B00';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
