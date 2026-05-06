/* ═══════════════════════════
   HOTEL SHANVI — MAIN JS
   ═══════════════════════════ */

// ─── PRELOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    const pl = document.getElementById('preloader');
    if (pl) pl.classList.add('done');
  }, 1800);
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ─── HERO SLIDER ───
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goSlide(idx) {
  slides[slideIndex].classList.remove('active');
  dots[slideIndex].classList.remove('active');
  slideIndex = idx;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  const next = (slideIndex + 1) % slides.length;
  goSlide(next);
}

let slideTimer = setInterval(nextSlide, 5000);

// Reset timer on manual click
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goSlide(i);
    slideTimer = setInterval(nextSlide, 5000);
  });
});

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── WHATSAPP WIDGET ───
const waChatBox = document.getElementById('waChatBox');

function toggleChat() {
  waChatBox.classList.toggle('open');
}

function sendWA(msg) {
  const url = `https://wa.me/919859858383?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ─── SMOOTH ANCHOR SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── GALLERY LIGHTBOX (Simple) ───
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
    bigImg.src = img.src;
    bigImg.style.cssText = `max-width:90vw;max-height:88vh;border-radius:8px;object-fit:contain;`;
    overlay.appendChild(bigImg);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// ─── Active nav link on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sTop = section.offsetTop - 120;
    if (window.scrollY >= sTop) current = section.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--gold-light)';
    }
  });
});