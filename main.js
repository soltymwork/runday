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
const interval = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("cd-days").innerText = days < 10 ? '0' + days : days;
  document.getElementById("cd-hours").innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById("cd-minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById("cd-seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "<span style='font-size:1.5rem'>Beh začal! 🏃</span>";
  }
}, 1000);

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

// Hero elements activate immediately on load
document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
