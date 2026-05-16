/* =========================
   Main JavaScript
   Smooth scroll + section loading animations
========================= */

gsap.registerPlugin(ScrollTrigger);

/* =========================
   DOM Elements
========================= */

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================
   Header Scroll State
========================= */

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true }
);

/* =========================
   Mobile Menu
========================= */

menuToggle?.addEventListener("click", () => {
  const active = mobileMenu?.classList.toggle("active");

  menuToggle.classList.toggle("active", active);
  menuToggle.setAttribute("aria-expanded", String(active));
  document.body.classList.toggle("menu-open", active);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  mobileMenu?.classList.remove("active");
  menuToggle?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
});

/* =========================
   Smooth Anchor Scroll
========================= */

function smoothScrollTo(targetY, duration = 1.05) {
  if (prefersReducedMotion) {
    window.scrollTo(0, targetY);
    return;
  }

  const scrollObject = {
    y: window.scrollY,
  };

  gsap.killTweensOf(scrollObject);

  gsap.to(scrollObject, {
    y: targetY,
    duration,
    ease: "power3.inOut",
    onUpdate: () => {
      window.scrollTo(0, scrollObject.y);
    },
  });
}

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    const headerOffset = header ? header.offsetHeight + 34 : 110;
    const targetTop =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    smoothScrollTo(targetTop, 1.05);
  });
});

/* =========================
   Reveal Elements On Scroll
========================= */

function initRevealAnimations() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  revealElements.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: "top 84%",
      once: true,
      onEnter: () => {
        element.classList.add("is-visible");
      },
    });
  });
}

initRevealAnimations();

/* =========================
   Hero Load Animation
========================= */

if (!prefersReducedMotion) {
  gsap.to(".hero-title .word", {
    y: 0,
    opacity: 1,
    duration: 1.05,
    stagger: 0.075,
    ease: "power4.out",
    delay: 0.18,
  });

  gsap.fromTo(
    ".hero .eyebrow",
    {
      y: 24,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.08,
    }
  );

  gsap.fromTo(
    ".hero-copy",
    {
      y: 32,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.55,
    }
  );

  gsap.fromTo(
    ".hero-actions",
    {
      y: 32,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.7,
    }
  );

  gsap.fromTo(
    ".hero-trust",
    {
      y: 32,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.85,
    }
  );

  gsap.fromTo(
    ".hero-visual",
    {
      y: 44,
      opacity: 0,
      scale: 0.96,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.55,
    }
  );
} else {
  document
    .querySelectorAll(".hero-title .word, .hero-copy, .hero-actions, .hero-trust, .hero-visual")
    .forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
}

/* =========================
   Floating Hero Elements
========================= */

if (!prefersReducedMotion) {
  gsap.to(".floating-card", {
    y: -12,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.18,
  });

  gsap.to(".preview-glow", {
    x: -45,
    y: 35,
    scale: 1.15,
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".preview-grid span", {
    y: -8,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.14,
  });

  gsap.to(".preview-bars span", {
    scaleX: 0.86,
    transformOrigin: "left center",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.18,
  });

  gsap.to(".hero-ring", {
    scale: 1.05,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/* =========================
   Counters Load Only When Visible
========================= */

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const target = Number(counter.dataset.target || 0);

  ScrollTrigger.create({
    trigger: counter,
    start: "top 88%",
    once: true,
    onEnter: () => {
      const state = {
        value: 0,
      };

      gsap.to(state, {
        value: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = Math.round(state.value);
        },
      });
    },
  });
});

/* =========================
   Skill Bars Load Only When Visible
========================= */

const skillBars = document.querySelectorAll(".skill-bar");

skillBars.forEach((bar) => {
  const percent = bar.dataset.percent || 0;
  const line = bar.querySelector(".skill-line span");

  ScrollTrigger.create({
    trigger: bar,
    start: "top 88%",
    once: true,
    onEnter: () => {
      if (line) {
        line.style.width = `${percent}%`;
      }
    },
  });
});

/* =========================
   Project Slider
========================= */

const projectTrack = document.getElementById("projectTrack");
const projectSlides = document.querySelectorAll(".project-slide");
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const projectCurrent = document.getElementById("projectCurrent");
const projectTotal = document.getElementById("projectTotal");
const projectProgress = document.getElementById("projectProgress");

let projectIndex = 0;
let projectAutoplay;

function formatProjectNumber(number) {
  return String(number).padStart(2, "0");
}

function updateProjectSlider() {
  if (!projectTrack || !projectSlides.length) return;

  projectTrack.style.transform = `translateX(-${projectIndex * 100}%)`;

  if (projectCurrent) {
    projectCurrent.textContent = formatProjectNumber(projectIndex + 1);
  }

  if (projectTotal) {
    projectTotal.textContent = formatProjectNumber(projectSlides.length);
  }

  if (projectProgress) {
    projectProgress.style.width = `${
      ((projectIndex + 1) / projectSlides.length) * 100
    }%`;
  }
}

function goToNextProject() {
  projectIndex = (projectIndex + 1) % projectSlides.length;
  updateProjectSlider();
}

function goToPrevProject() {
  projectIndex = (projectIndex - 1 + projectSlides.length) % projectSlides.length;
  updateProjectSlider();
}

function startProjectAutoplay() {
  stopProjectAutoplay();

  if (!projectSlides.length || prefersReducedMotion) return;

  projectAutoplay = setInterval(() => {
    goToNextProject();
  }, 5500);
}

function stopProjectAutoplay() {
  if (projectAutoplay) {
    clearInterval(projectAutoplay);
  }
}

projectNext?.addEventListener("click", () => {
  goToNextProject();
  startProjectAutoplay();
});

projectPrev?.addEventListener("click", () => {
  goToPrevProject();
  startProjectAutoplay();
});

document
  .querySelector(".project-slider")
  ?.addEventListener("mouseenter", stopProjectAutoplay);

document
  .querySelector(".project-slider")
  ?.addEventListener("mouseleave", startProjectAutoplay);

updateProjectSlider();
startProjectAutoplay();

/* =========================
   Testimonials Slider
========================= */

const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");
const testimonialCurrent = document.getElementById("testimonialCurrent");
const testimonialTotal = document.getElementById("testimonialTotal");
const testimonialProgress = document.getElementById("testimonialProgress");

let testimonialIndex = 0;
let testimonialAutoplay;

function formatTestimonialNumber(number) {
  return String(number).padStart(2, "0");
}

function updateTestimonialSlider() {
  if (!testimonialTrack || !testimonialSlides.length) return;

  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

  if (testimonialCurrent) {
    testimonialCurrent.textContent = formatTestimonialNumber(testimonialIndex + 1);
  }

  if (testimonialTotal) {
    testimonialTotal.textContent = formatTestimonialNumber(testimonialSlides.length);
  }

  if (testimonialProgress) {
    testimonialProgress.style.width = `${
      ((testimonialIndex + 1) / testimonialSlides.length) * 100
    }%`;
  }
}

function goToNextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  updateTestimonialSlider();
}

function goToPrevTestimonial() {
  testimonialIndex =
    (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;

  updateTestimonialSlider();
}

function startTestimonialAutoplay() {
  stopTestimonialAutoplay();

  if (!testimonialSlides.length || prefersReducedMotion) return;

  testimonialAutoplay = setInterval(() => {
    goToNextTestimonial();
  }, 5200);
}

function stopTestimonialAutoplay() {
  if (testimonialAutoplay) {
    clearInterval(testimonialAutoplay);
  }
}

testimonialNext?.addEventListener("click", () => {
  goToNextTestimonial();
  startTestimonialAutoplay();
});

testimonialPrev?.addEventListener("click", () => {
  goToPrevTestimonial();
  startTestimonialAutoplay();
});

document
  .querySelector(".testimonial-slider")
  ?.addEventListener("mouseenter", stopTestimonialAutoplay);

document
  .querySelector(".testimonial-slider")
  ?.addEventListener("mouseleave", startTestimonialAutoplay);

updateTestimonialSlider();
startTestimonialAutoplay();

/* =========================
   FAQ Accordion
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (item.classList.contains("active") && answer) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }

  question?.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((otherItem) => {
      const otherAnswer = otherItem.querySelector(".faq-answer");

      otherItem.classList.remove("active");

      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    if (!isActive) {
      item.classList.add("active");

      if (answer) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    }
  });
});

/* =========================
   Contact Form Demo Handler
========================= */

const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  alert(
    "Your message is ready. Connect this form with Formspree, Web3Forms, EmailJS, or your backend to receive messages."
  );
});

/* =========================
   Magnetic Button Hover
========================= */

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    if (prefersReducedMotion) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.35,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  });
});

/* =========================
   Hero Card 3D Hover
========================= */

const heroCard = document.querySelector(".main-hero-card");

heroCard?.addEventListener("mousemove", (event) => {
  if (prefersReducedMotion || window.innerWidth < 920) return;

  const rect = heroCard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateX = (y / rect.height - 0.5) * -8;
  const rotateY = (x / rect.width - 0.5) * 8;

  gsap.to(heroCard, {
    rotateX,
    rotateY,
    transformPerspective: 1000,
    transformOrigin: "center",
    duration: 0.45,
    ease: "power2.out",
  });
});

heroCard?.addEventListener("mouseleave", () => {
  if (window.innerWidth < 920) return;

  gsap.to(heroCard, {
    rotateX: 4,
    rotateY: -8,
    x: 0,
    y: 0,
    duration: 0.65,
    ease: "power3.out",
  });
});

/* =========================
   Refresh ScrollTrigger After Page Load
========================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
