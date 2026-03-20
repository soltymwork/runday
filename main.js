// Countdown target date
const countdownDate = new Date("June 13, 2026 09:00:00").getTime();

// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const currentScroll = window.pageYOffset;
  if (currentScroll > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// --- Mobile Menu ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// --- Countdown Timer ---
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "<span style='font-size:1.5rem'>Beh začal! 🏃</span>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("cd-days").innerText = days < 10 ? '0' + days : days;
  document.getElementById("cd-hours").innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById("cd-minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById("cd-seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);

// --- Reveal on Scroll ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Hero elements activate immediately on load (double RAF ensures browser paints initial state first)
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
  });
});

// --- YouTube Facade ---
document.querySelectorAll('.yt-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const id = facade.dataset.videoid;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?controls=1&autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
  });
});

// Handle bfcache restore (back/forward navigation)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.remove('active');
      void el.offsetWidth;
      el.classList.add('active');
    });
  }
});
