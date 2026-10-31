/* ═══════════════════════════
   HOTEL SHANVI — MAIN JS
   Performance-safe version: throttled scroll handling, reduced motion support,
   paused hero slider when hidden, body lock for overlays, and safer DOM checks.
   ═══════════════════════════ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navbar = document.getElementById('navbar');
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const revealEls = Array.from(document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right'));
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const delay = prefersReducedMotion ? 200 : 1200;
  setTimeout(() => preloader.classList.add('done'), delay);
});

let scrollTick = false;

function updateScrollState() {
  if (!navbar) return;
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);

  if (!sections.length || !navLinks.length) return;
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active-link', href === `#${current}`);
  });
}

window.addEventListener('scroll', () => {
  if (scrollTick) return;
  scrollTick = true;
  requestAnimationFrame(() => {
    updateScrollState();
    scrollTick = false;
  });
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function setMobileMenu(open) {
  if (!mobileMenu || !hamburger) return;
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('body-lock', open);
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    setMobileMenu(!expanded);
  });
}

function closeMobile() {
  setMobileMenu(false);
}

let slideIndex = 0;
let slideTimer = null;

function goSlide(index) {
  if (!slides.length || !dots.length) return;
  slides[slideIndex]?.classList.remove('active');
  dots[slideIndex]?.classList.remove('active');
  slideIndex = (index + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  if (!slides.length) return;
  goSlide(slideIndex + 1);
}

function stopSlideLoop() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}

function startSlideLoop() {
  if (!slides.length || prefersReducedMotion) return;
  stopSlideLoop();
  slideTimer = setInterval(nextSlide, 5000);
}

if (slides.length && dots.length) {
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopSlideLoop();
      goSlide(index);
      startSlideLoop();
    });
  });
  startSlideLoop();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopSlideLoop();
  } else if (!prefersReducedMotion) {
    startSlideLoop();
  }
});

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
}

function toggleChat() {
  const box = document.getElementById('waChatBox');
  const fab = document.getElementById('waFab');
  if (!box || !fab) return;
  const isOpen = box.classList.contains('open');
  box.classList.toggle('open', !isOpen);
  fab.style.display = isOpen ? 'block' : 'none';
}

function sendWA(msg) {
  const url = `https://wa.me/919859858383?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    closeMobile();
    const offset = 84;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
});

document.querySelectorAll('.gm-item img').forEach((img) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9000;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: zoom-out;
      animation: fadeIn 0.25s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.getAttribute('data-full') || img.src;
    bigImg.style.cssText = 'max-width:90vw;max-height:88vh;border-radius:8px;object-fit:contain;';
    overlay.appendChild(bigImg);
    overlay.addEventListener('click', () => {
      overlay.remove();
      document.body.classList.remove('body-lock');
    });
    document.body.classList.add('body-lock');
    document.body.appendChild(overlay);
  });
});
