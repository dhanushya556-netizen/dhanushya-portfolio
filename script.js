// Dark / light theme toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  themeToggle.textContent = isLight ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
});

// Back-to-top button appears after scrolling
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 350);
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal sections/cards as they enter the viewport
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Keep footer year current
document.getElementById('year').textContent = new Date().getFullYear();
// ===== QUOTES SLIDER =====
const quoteSlides = document.querySelectorAll(".quote-slide");
const quoteCount = document.getElementById("quote-count");
const quotePrev = document.getElementById("quote-prev");
const quoteNext = document.getElementById("quote-next");
const quoteTrack = document.getElementById("quote-track");

let quoteIndex = 0;
let quoteTouchStart = 0;

function showQuote(index) {
  if (!quoteSlides.length) return;

  quoteIndex = (index + quoteSlides.length) % quoteSlides.length;

  quoteSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === quoteIndex);
  });

  if (quoteCount) {
    quoteCount.textContent =
      String(quoteIndex + 1).padStart(2, "0") +
      " / " +
      String(quoteSlides.length).padStart(2, "0");
  }
}

quotePrev?.addEventListener("click", () => showQuote(quoteIndex - 1));
quoteNext?.addEventListener("click", () => showQuote(quoteIndex + 1));

quoteTrack?.addEventListener("touchstart", event => {
  quoteTouchStart = event.changedTouches[0].clientX;
}, { passive: true });

quoteTrack?.addEventListener("touchend", event => {
  const distance = event.changedTouches[0].clientX - quoteTouchStart;

  if (Math.abs(distance) > 45) {
    showQuote(quoteIndex + (distance < 0 ? 1 : -1));
  }
}, { passive: true });

showQuote(0);