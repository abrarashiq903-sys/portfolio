// Mobile nav toggle
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// Smooth scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Simple scroll reveal
const revealEls = document.querySelectorAll(
  ".skills-grid, .projects-grid, .about-grid, .contact-form, .contact-methods"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// Theme toggle (light / dark)
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const root = document.documentElement;

const THEME_KEY = "portfolio-theme";

function setTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    if (themeIcon) themeIcon.textContent = "🌙";
  }
  localStorage.setItem(THEME_KEY, theme);
}

const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme === "light" || storedTheme === "dark") {
  setTheme(storedTheme);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  setTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
  });
}

// Dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Contact form: FormSubmit.co — set redirect URL and show success when returning
const contactForm = document.getElementById("contact-form");
const formFields = document.getElementById("form-fields");
const formSuccess = document.getElementById("form-success");

if (contactForm) {
  var nextUrl = window.location.origin + window.location.pathname + "?sent=1#contact";
  var nextInput = document.createElement("input");
  nextInput.type = "hidden";
  nextInput.name = "_next";
  nextInput.value = nextUrl;
  contactForm.appendChild(nextInput);
}

if (formFields && formSuccess && window.location.search.includes("sent=1")) {
  formFields.hidden = true;
  formSuccess.hidden = false;
}

