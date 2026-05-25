/* =========================================================
   Shared Header Loader
========================================================= */

async function loadSharedHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) return;

  try {
    const response = await fetch("/components/header.html");

    if (!response.ok) {
      throw new Error("Header file not found: /components/header.html");
    }

    const html = await response.text();

    headerPlaceholder.innerHTML = html;

    const scripts = headerPlaceholder.querySelectorAll("script");

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      [...oldScript.attributes].forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  } catch (error) {
    console.error("Header loading failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSharedHeader);


/* =========================================================
   Shared Footer Loader
========================================================= */

async function loadSharedFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");

  if (!footerPlaceholder) return;

  try {
    const response = await fetch("/components/footer.html");

    if (!response.ok) {
      throw new Error("Footer file not found: /components/footer.html");
    }

    const html = await response.text();

    footerPlaceholder.innerHTML = html;

    const scripts = footerPlaceholder.querySelectorAll("script");

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      [...oldScript.attributes].forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  } catch (error) {
    console.error("Footer loading failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSharedFooter);

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
   Project Slider with Swipe
========================= */

const projectTrack = document.getElementById("projectTrack");
const projectSlides = document.querySelectorAll(".project-slide");
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const projectCurrent = document.getElementById("projectCurrent");
const projectTotal = document.getElementById("projectTotal");
const projectProgress = document.getElementById("projectProgress");
const projectSlider = document.querySelector(".project-slider");
const projectSliderWindow = document.querySelector(".project-slider-window");

let projectIndex = 0;
let projectAutoplay;
let projectStartX = 0;
let projectCurrentX = 0;
let projectIsDragging = false;
let projectIsHovered = false;

function formatProjectNumber(number) {
  return String(number).padStart(2, "0");
}

function updateProjectSlider() {
  if (!projectTrack || !projectSlides.length) return;

  projectTrack.style.transform = `translateX(-${projectIndex * 100}%)`;

  projectSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === projectIndex);
    slide.classList.toggle("is-prev", index < projectIndex);
    slide.classList.toggle("is-next", index > projectIndex);
  });

  if (projectCurrent) {
    projectCurrent.textContent = formatProjectNumber(projectIndex + 1);
  }

  if (projectTotal) {
    projectTotal.textContent = formatProjectNumber(projectSlides.length);
  }

  if (projectProgress) {
    projectProgress.style.width = `${((projectIndex + 1) / projectSlides.length) * 100}%`;
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

  if (!projectSlides.length || prefersReducedMotion || projectIsHovered) return;

  projectAutoplay = setInterval(() => {
    goToNextProject();
  }, 5500);
}

function stopProjectAutoplay() {
  if (projectAutoplay) {
    clearInterval(projectAutoplay);
    projectAutoplay = null;
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

/* Pause autoplay on hover */
projectSlider?.addEventListener("mouseenter", () => {
  projectIsHovered = true;
  stopProjectAutoplay();
});

projectSlider?.addEventListener("mouseleave", () => {
  projectIsHovered = false;
  startProjectAutoplay();
});

/* Touch + Mouse Swipe */
function projectDragStart(clientX) {
  projectStartX = clientX;
  projectCurrentX = clientX;
  projectIsDragging = true;
  stopProjectAutoplay();

  if (projectTrack) {
    projectTrack.style.transition = "none";
  }
}

function projectDragMove(clientX) {
  if (!projectIsDragging || !projectTrack || !projectSliderWindow) return;

  projectCurrentX = clientX;

  const diff = projectCurrentX - projectStartX;
  const dragPercent = (diff / projectSliderWindow.offsetWidth) * 100;

  projectTrack.style.transform = `translateX(calc(-${projectIndex * 100}% + ${dragPercent}%))`;
}

function projectDragEnd() {
  if (!projectIsDragging || !projectTrack) return;

  const diff = projectCurrentX - projectStartX;
  const threshold = 70;

  projectTrack.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";

  if (Math.abs(diff) > threshold) {
    if (diff < 0) {
      goToNextProject();
    } else {
      goToPrevProject();
    }
  } else {
    updateProjectSlider();
  }

  projectIsDragging = false;

  if (!projectIsHovered) {
    startProjectAutoplay();
  }
}

/* Mobile touch */
projectSliderWindow?.addEventListener(
  "touchstart",
  (event) => {
    projectDragStart(event.touches[0].clientX);
  },
  { passive: true }
);

projectSliderWindow?.addEventListener(
  "touchmove",
  (event) => {
    projectDragMove(event.touches[0].clientX);
  },
  { passive: true }
);

projectSliderWindow?.addEventListener("touchend", projectDragEnd);

/* Desktop drag */
projectSliderWindow?.addEventListener("mousedown", (event) => {
  projectDragStart(event.clientX);
});

window.addEventListener("mousemove", (event) => {
  projectDragMove(event.clientX);
});

window.addEventListener("mouseup", projectDragEnd);

updateProjectSlider();
startProjectAutoplay();

/* =========================
   Testimonials Slider with Swipe
========================= */

const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");
const testimonialCurrent = document.getElementById("testimonialCurrent");
const testimonialTotal = document.getElementById("testimonialTotal");
const testimonialProgress = document.getElementById("testimonialProgress");
const testimonialWindow = document.querySelector(".testimonial-window");

let testimonialIndex = 0;
let testimonialAutoplay;
let testimonialStartX = 0;
let testimonialCurrentX = 0;
let testimonialIsDragging = false;

function formatTestimonialNumber(number) {
  return String(number).padStart(2, "0");
}

function updateTestimonialSlider() {
  if (!testimonialTrack || !testimonialSlides.length) return;

  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

  testimonialSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === testimonialIndex);
    slide.classList.toggle("is-prev", index < testimonialIndex);
    slide.classList.toggle("is-next", index > testimonialIndex);
  });

  if (testimonialCurrent) {
    testimonialCurrent.textContent = formatTestimonialNumber(testimonialIndex + 1);
  }

  if (testimonialTotal) {
    testimonialTotal.textContent = formatTestimonialNumber(testimonialSlides.length);
  }

  if (testimonialProgress) {
    testimonialProgress.style.width = `${((testimonialIndex + 1) / testimonialSlides.length) * 100}%`;
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

/* Touch + Mouse Swipe */
function testimonialDragStart(clientX) {
  testimonialStartX = clientX;
  testimonialCurrentX = clientX;
  testimonialIsDragging = true;
  stopTestimonialAutoplay();

  if (testimonialTrack) {
    testimonialTrack.style.transition = "none";
  }
}

function testimonialDragMove(clientX) {
  if (!testimonialIsDragging || !testimonialTrack) return;

  testimonialCurrentX = clientX;
  const diff = testimonialCurrentX - testimonialStartX;
  const dragPercent = (diff / testimonialWindow.offsetWidth) * 100;

  testimonialTrack.style.transform = `translateX(calc(-${testimonialIndex * 100}% + ${dragPercent}%))`;
}

function testimonialDragEnd() {
  if (!testimonialIsDragging || !testimonialTrack) return;

  const diff = testimonialCurrentX - testimonialStartX;
  const threshold = 70;

  testimonialTrack.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";

  if (Math.abs(diff) > threshold) {
    if (diff < 0) {
      goToNextTestimonial();
    } else {
      goToPrevTestimonial();
    }
  } else {
    updateTestimonialSlider();
  }

  testimonialIsDragging = false;
  startTestimonialAutoplay();
}

/* Mobile touch */
testimonialWindow?.addEventListener(
  "touchstart",
  (event) => {
    testimonialDragStart(event.touches[0].clientX);
  },
  { passive: true }
);

testimonialWindow?.addEventListener(
  "touchmove",
  (event) => {
    testimonialDragMove(event.touches[0].clientX);
  },
  { passive: true }
);

testimonialWindow?.addEventListener("touchend", testimonialDragEnd);

/* Desktop drag */
testimonialWindow?.addEventListener("mousedown", (event) => {
  testimonialDragStart(event.clientX);
});

window.addEventListener("mousemove", (event) => {
  testimonialDragMove(event.clientX);
});

window.addEventListener("mouseup", testimonialDragEnd);

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
   Contact Form Submit State
========================= */

const contactForm = document.getElementById("contactForm");
const contactSubmit = document.querySelector(".contact-submit");

contactForm?.addEventListener("submit", () => {
  if (contactSubmit) {
    contactSubmit.disabled = true;
    contactSubmit.innerHTML = "Sending...";
  }
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

/* =========================================================
   Official Profiles Page JS
   Header menu + reveal animation + hero interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* ================================
     Mobile Menu
  ================================ */

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

      body.classList.toggle("menu-open", isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ================================
     Header Scroll Effect
  ================================ */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  /* ================================
     Reveal Animations
  ================================ */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ================================
     Magnetic Button Hover
  ================================ */

  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* ================================
     Hero Photo Soft Movement
  ================================ */

  const photoCard = document.querySelector(".profiles-photo-card");
  const floatingOne = document.querySelector(".profiles-floating-one");
  const floatingTwo = document.querySelector(".profiles-floating-two");

  if (photoCard && window.matchMedia("(min-width: 981px)").matches) {
    photoCard.addEventListener("mousemove", (event) => {
      const rect = photoCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      photoCard.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;

      if (floatingOne) {
        floatingOne.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      }

      if (floatingTwo) {
        floatingTwo.style.transform = `translate(${x * -12}px, ${y * -12}px)`;
      }
    });

    photoCard.addEventListener("mouseleave", () => {
      photoCard.style.transform = "rotateX(0deg) rotateY(0deg)";

      if (floatingOne) {
        floatingOne.style.transform = "translate(0, 0)";
      }

      if (floatingTwo) {
        floatingTwo.style.transform = "translate(0, 0)";
      }
    });
  }
});

/* =========================================================
   Projects Page JS
   Mobile menu + header scroll + reveal + magnetic + hero card
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* ================================
     Mobile Menu
  ================================ */

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ================================
     Header Scroll Effect
  ================================ */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ================================
     Reveal Animations
  ================================ */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ================================
     Magnetic Buttons
  ================================ */

  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* ================================
     Projects Hero Preview Card Movement
  ================================ */

  const projectPreviewCard = document.querySelector(".projects-preview-card");
  const tagOne = document.querySelector(".projects-tag-one");
  const tagTwo = document.querySelector(".projects-tag-two");

  if (projectPreviewCard && window.matchMedia("(min-width: 981px)").matches) {
    projectPreviewCard.addEventListener("mousemove", (event) => {
      const rect = projectPreviewCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      projectPreviewCard.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;

      if (tagOne) {
        tagOne.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      }

      if (tagTwo) {
        tagTwo.style.transform = `translate(${x * -12}px, ${y * -12}px)`;
      }
    });

    projectPreviewCard.addEventListener("mouseleave", () => {
      projectPreviewCard.style.transform = "rotateX(0deg) rotateY(0deg)";

      if (tagOne) {
        tagOne.style.transform = "translate(0, 0)";
      }

      if (tagTwo) {
        tagTwo.style.transform = "translate(0, 0)";
      }
    });
  }

  /* ================================
     Smooth Anchor Scroll
  ================================ */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});


/* =========================================================
   About Page JS - Homepage Style
   Soft header + menu + reveal + gentle floating hero card
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* Mobile Menu */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Header Scroll */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Reveal Animation */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* Magnetic Buttons - Same soft feel */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* Homepage-style floating cards */
  const floatingCards = document.querySelectorAll(
    ".about-profile-card, .about-floating-one, .about-floating-two"
  );

  if (floatingCards.length && window.matchMedia("(min-width: 981px)").matches) {
    floatingCards.forEach((card, index) => {
      let currentY = 0;
      let direction = index % 2 === 0 ? 1 : -1;
      let speed = 0.018 + index * 0.004;
      let distance = index === 0 ? 8 : 12;

      const floatCard = () => {
        currentY += speed;

        const y = Math.sin(currentY) * distance * direction;
        const x = Math.cos(currentY * 0.7) * 4 * direction;

        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        requestAnimationFrame(floatCard);
      };

      floatCard();
    });
  }

  /* Smooth Anchor Scroll */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});


/* =========================================================
   Services Page JS
   Mobile menu + header scroll + reveal + magnetic + 3D card
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* ================================
     Mobile Menu
  ================================ */

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ================================
     Header Scroll Effect
  ================================ */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ================================
     Reveal Animations
  ================================ */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ================================
     Magnetic Buttons
  ================================ */

  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* ================================
     Services Hero 3D Card
     Smooth, no zoom, premium card tilt
  ================================ */

  const servicesCard = document.querySelector(".services-preview-card");
  const tagOne = document.querySelector(".services-tag-one");
  const tagTwo = document.querySelector(".services-tag-two");

  if (servicesCard && window.matchMedia("(min-width: 981px)").matches) {
    let rect = servicesCard.getBoundingClientRect();
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;

    const lerp = (start, end, speed) => {
      return start + (end - start) * speed;
    };

    const animateServicesCard = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);

      const rotateY = currentX * 8;
      const rotateX = currentY * -8;

      if (isHovering) {
        servicesCard.style.transform = `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-6px)
        `;

        if (tagOne) {
          tagOne.style.transform = `
            translate3d(${currentX * 18}px, ${currentY * 16}px, 0)
          `;
        }

        if (tagTwo) {
          tagTwo.style.transform = `
            translate3d(${currentX * -18}px, ${currentY * -16}px, 0)
          `;
        }
      } else {
        servicesCard.style.transform = `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(0)
        `;

        if (tagOne) {
          tagOne.style.transform = "translate3d(0, 0, 0)";
        }

        if (tagTwo) {
          tagTwo.style.transform = "translate3d(0, 0, 0)";
        }
      }

      requestAnimationFrame(animateServicesCard);
    };

    animateServicesCard();

    servicesCard.addEventListener("mouseenter", () => {
      isHovering = true;
      rect = servicesCard.getBoundingClientRect();
    });

    servicesCard.addEventListener("mousemove", (event) => {
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetX = x - 0.5;
      targetY = y - 0.5;
    });

    servicesCard.addEventListener("mouseleave", () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
    });

    window.addEventListener(
      "resize",
      () => {
        rect = servicesCard.getBoundingClientRect();
      },
      { passive: true }
    );
  }

  /* ================================
     Smooth Anchor Scroll
  ================================ */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});


/* =========================================================
   Contact Page JS
   Mobile menu + header scroll + reveal + magnetic + soft card movement
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* Mobile Menu */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);
      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Header Scroll */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Reveal Animation */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* Magnetic Buttons */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* Contact Hero Card - Same soft style as homepage */
  const contactFloatingItems = document.querySelectorAll(
    ".contact-hero-card, .contact-floating-one, .contact-floating-two"
  );

  if (contactFloatingItems.length && window.matchMedia("(min-width: 981px)").matches) {
    contactFloatingItems.forEach((item, index) => {
      let progress = index * 0.8;
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.018 + index * 0.004;
      const distance = index === 0 ? 8 : 12;

      const animateFloat = () => {
        progress += speed;

        const y = Math.sin(progress) * distance * direction;
        const x = Math.cos(progress * 0.7) * 4 * direction;

        if (item.classList.contains("contact-hero-card")) {
          item.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotateX(4deg)
            rotateY(-8deg)
          `;
        } else {
          item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        requestAnimationFrame(animateFloat);
      };

      animateFloat();
    });
  }

  /* Smooth Anchor Scroll */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});


/* =========================================================
   Contact Page FAQ Accordion
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const contactFaqItems = document.querySelectorAll(".contact-faq-item");

  if (!contactFaqItems.length) return;

  contactFaqItems.forEach((item) => {
    const question = item.querySelector(".contact-faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      contactFaqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});


/* =========================================================
   Local SEO Page JS
   WordPress Developer Pakistan
   Mobile menu + header scroll + reveal + magnetic + soft floating card
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* Mobile Menu */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);
      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Header Scroll */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Reveal Animation */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* Magnetic Buttons */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* Local SEO Hero Card - Soft homepage-style floating */
  const localSeoFloatingItems = document.querySelectorAll(
    ".local-seo-card, .local-seo-floating-one, .local-seo-floating-two"
  );

  if (localSeoFloatingItems.length && window.matchMedia("(min-width: 981px)").matches) {
    localSeoFloatingItems.forEach((item, index) => {
      let progress = index * 0.8;
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.018 + index * 0.004;
      const distance = index === 0 ? 8 : 12;

      const animateFloat = () => {
        progress += speed;

        const y = Math.sin(progress) * distance * direction;
        const x = Math.cos(progress * 0.7) * 4 * direction;

        if (item.classList.contains("local-seo-card")) {
          item.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotateX(4deg)
            rotateY(-8deg)
          `;
        } else {
          item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        requestAnimationFrame(animateFloat);
      };

      animateFloat();
    });
  }

  /* Smooth Anchor Scroll */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});


/* =========================================================
   Local SEO Page FAQ Accordion
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const localFaqItems = document.querySelectorAll(".local-faq-item");

  if (!localFaqItems.length) return;

  localFaqItems.forEach((item) => {
    const question = item.querySelector(".local-faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      localFaqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});

/* =========================================================
   Landing Page Design JS
   Mobile menu + header scroll + reveal + magnetic + soft floating card
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* Mobile Menu */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);
      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Header Scroll */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Reveal Animation */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* Magnetic Buttons */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* Landing Hero Card - Soft homepage-style floating */
  const landingFloatingItems = document.querySelectorAll(
    ".landing-card, .landing-floating-one, .landing-floating-two"
  );

  if (landingFloatingItems.length && window.matchMedia("(min-width: 981px)").matches) {
    landingFloatingItems.forEach((item, index) => {
      let progress = index * 0.8;
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.018 + index * 0.004;
      const distance = index === 0 ? 8 : 12;

      const animateFloat = () => {
        progress += speed;

        const y = Math.sin(progress) * distance * direction;
        const x = Math.cos(progress * 0.7) * 4 * direction;

        if (item.classList.contains("landing-card")) {
          item.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotateX(4deg)
            rotateY(-8deg)
          `;
        } else {
          item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        requestAnimationFrame(animateFloat);
      };

      animateFloat();
    });
  }

  /* Smooth Anchor Scroll */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});



/* =========================================================
   Landing Page FAQ Accordion
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const landingFaqItems = document.querySelectorAll(".landing-faq-item");

  if (!landingFaqItems.length) return;

  landingFaqItems.forEach((item) => {
    const question = item.querySelector(".landing-faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      landingFaqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});



/* =========================================================
   Website Redesign Page JS
   Mobile menu + header scroll + reveal + magnetic + soft floating card
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-card a");

  /* Mobile Menu */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("menu-open", isOpen);
      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Header Scroll */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Reveal Animation */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* Magnetic Buttons */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* Redesign Hero Card - Soft homepage-style floating */
  const redesignFloatingItems = document.querySelectorAll(
    ".redesign-card, .redesign-floating-one, .redesign-floating-two"
  );

  if (redesignFloatingItems.length && window.matchMedia("(min-width: 981px)").matches) {
    redesignFloatingItems.forEach((item, index) => {
      let progress = index * 0.8;
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.018 + index * 0.004;
      const distance = index === 0 ? 8 : 12;

      const animateFloat = () => {
        progress += speed;

        const y = Math.sin(progress) * distance * direction;
        const x = Math.cos(progress * 0.7) * 4 * direction;

        if (item.classList.contains("redesign-card")) {
          item.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotateX(4deg)
            rotateY(-8deg)
          `;
        } else {
          item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        requestAnimationFrame(animateFloat);
      };

      animateFloat();
    });
  }

  /* Smooth Anchor Scroll */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});



/* =========================================================
   Website Redesign Page FAQ Accordion
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const redesignFaqItems = document.querySelectorAll(".redesign-faq-item");

  if (!redesignFaqItems.length) return;

  redesignFaqItems.forEach((item) => {
    const question = item.querySelector(".redesign-faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      redesignFaqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
