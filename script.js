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



/* ===== SCROLL REVEAL ANIMATION ===== */

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion) {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
} else {
    document.body.classList.add("animations-ready");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

/* ===== TYPING EFFECT ===== */

const typingText = document.getElementById("typing-text");

if (typingText && !reduceMotion) {
    const roles = [
        "Aspiring Software Developer",
        "Computer Science Student",
        "Future Tech Innovator"
    ];

    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (deleting) {
            characterIndex--;
            typingText.textContent =
                currentRole.substring(0, characterIndex);
        } else {
            characterIndex++;
            typingText.textContent =
                currentRole.substring(0, characterIndex);
        }

        let delay = deleting ? 45 : 85;

        if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        } else if (!deleting && characterIndex === roles[roleIndex].length) {
            deleting = true;
            delay = 1500;
        }

        window.setTimeout(typeRole, delay);
    }

    window.setTimeout(typeRole, 1800);
}


showQuote(0);
