// ═══════════════════════════════════════
// LOADER
// ═══════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // Trigger initial reveals
    revealOnScroll();
    startSkillBars();
  }, 2000);
});

// ═══════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  iconMoon.style.display = isDark ? 'block' : 'none';
  iconSun.style.display = isDark ? 'none' : 'block';
});

// ═══════════════════════════════════════
// HAMBURGER / MOBILE MENU
// ═══════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.setAttribute('aria-expanded', menuOpen);
  mobileMenu.setAttribute('aria-hidden', !menuOpen);
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ═══════════════════════════════════════
// TYPING EFFECT
// ═══════════════════════════════════════
const phrases = [
  'Python Developer',
  'Web Developer',
  'Linux Enthusiast',
  'Automation Builder',
  'Open Source Contributor'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 80);
}

setTimeout(typeEffect, 2200);

// ═══════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════
// SKILL BARS ANIMATION
// ═══════════════════════════════════════
function startSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.getAttribute('data-width');
        entry.target.style.width = w + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════
// ANIMATED COUNTERS
// ═══════════════════════════════════════
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (target >= 100 ? '+' : '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (target >= 100 ? '+' : '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ═══════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if (!name || !email || !msg) return;

  // Simulate send
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    showToast();
  }, 1200);
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ═══════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
