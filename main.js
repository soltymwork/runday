// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const currentScroll = window.pageYOffset;

  // Background change logic (keeping this to avoid breaking the design)
  if (currentScroll > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });
const countdownDate = new Date("June 13, 2026 13:00:00").getTime();

const interval = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update DOM elements
  document.getElementById("cd-days").innerText = days < 10 ? '0' + days : days;
  document.getElementById("cd-hours").innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById("cd-minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById("cd-seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

  // Output 0 if time is up
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "<div class='time-val'>MÁME ODBEHNUTÉ!</div>";
  }
}, 1000);



// --- Mobile Navigation ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = mobileBtn.querySelectorAll('span');
  if(navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    if(navLinks.classList.contains('active')) {
      mobileBtn.click();
    }
  });
});

// --- Scroll Reveal Animation with Intersection Observer ---
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Optional: stop observing once it's visible
    }
  });
}, observerOptions);

revealElements.forEach(el => {
  observer.observe(el);
});

// Immediately add 'active' to hero elements to ensure they display on load
document.querySelectorAll('.hero .reveal').forEach(el => {
  el.classList.add('active');
});

// --- Active Nav Link Highlight ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(li => {
    li.classList.remove('active');
    if (li.getAttribute('href') === `#${current}`) {
      li.classList.add('active');
    }
  });
}, { passive: true });
