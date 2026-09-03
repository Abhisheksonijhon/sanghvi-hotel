/* ═══════════════════════════
   HOTEL SHANVI — MAIN JS
   Improvements: safer DOM access, mobile menu aria toggles, hero slider guards,
   close mobile menu on anchor click, and small robustness fixes for mobile/iOS.
   ═══════════════════════════ */

// ─── PRELOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    const pl = document.getElementById('preloader');
    if (pl) pl.classList.add('done');
  }, 1200);
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', String(expanded));
  });
}

function closeMobile() {
  const menu = document.getElementById('mobileMenu');
  const hb = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (hb) hb.setAttribute('aria-expanded', 'false');
  if (menu) menu.setAttribute('aria-hidden', 'true');
}

// ─── HERO SLIDER ───
let slideIndex = 0;
const slides = document.querySelectorAll('.slide') || [];
const dots = document.querySelectorAll('.dot') || [];

function goSlide(idx) {
  if (!slides.length || !dots.length) return;
  slides[slideIndex].classList.remove('active');
  dots[slideIndex].classList.remove('active');
  slideIndex = idx % slides.length;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  if (!slides.length) return;
  const next = (slideIndex + 1) % slides.length;
  goSlide(next);
}

let slideTimer = slides.length ? setInterval(nextSlide, 5000) : null;

// Reset timer on manual click
if (dots && dots.length) {
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (slideTimer) clearInterval(slideTimer);
      goSlide(i);
      slideTimer = setInterval(nextSlide, 5000);
    });
  });
}

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
if (revealEls && revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ─── WHATSAPP WIDGET ───
const waChatBox = document.getElementById('waChatBox');
function toggleChat() {
  const box = document.getElementById('waChatBox');
  const fab = document.getElementById('waFab');
  if (!box || !fab) return;
  if (box.classList.contains('open')) {
    box.classList.remove('open');
    fab.style.display = 'block';
  } else {
    box.classList.add('open');
    fab.style.display = 'none';
  }
}

function sendWA(msg) {
  const url = `https://wa.me/919859858383?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ─── SMOOTH ANCHOR SCROLL — close mobile when clicking
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      closeMobile();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── GALLERY LIGHTBOX (Simple) — guard
document.querySelectorAll('.gm-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.9);
      display:flex;align-items:center;justify-content:center;cursor:zoom-out;
      animation: fadeIn 0.3s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.getAttribute('data-full') || img.src;
    bigImg.style.cssText = `max-width:90vw;max-height:88vh;border-radius:8px;object-fit:contain;`;
    overlay.appendChild(bigImg);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// ─── Active nav link on scroll — light weight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
if (sections.length && navLinks.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 140;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.remove('active-link');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active-link');
      }
    });
  });
}
