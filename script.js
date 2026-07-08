/* =========================================================
   Arjumand Ali One Page Portfolio JS
   Header + Mobile Menu + Reveal + Counters + Card Sliders
   FAQ + Skill Bars + Smooth Scroll + Back To Top
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* =========================
     Header Scroll + Active Nav
     (combined into a single scroll listener)
  ========================= */
  const header = document.getElementById("aaHeader");
  const navLinks = document.querySelectorAll(".aa-nav a, .aa-mobile-card a");
  const sections = [...document.querySelectorAll("section[id]")];

  const handleScroll = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    }

    let activeId = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${activeId}`);
    });
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  /* =========================
     Mobile Menu
  ========================= */
  const menuToggle = document.getElementById("aaMenuToggle");
  const mobileMenu = document.getElementById("aaMobileMenu");
  const mobileLinks = document.querySelectorAll(".aa-mobile-card a");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      body.classList.toggle("aa-menu-open", isOpen);
      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        body.classList.remove("aa-menu-open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* =========================
     Smooth Scroll
     Handled natively via CSS (scroll-behavior: smooth +
     scroll-margin-top on each section) — see smooth-scroll.css.
     No JS needed here, which also means it can't be broken by an
     unrelated script error elsewhere on the page.
  ========================= */

  /* =========================
     Reveal Animation
  ========================= */
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  /* =========================
     Hero Counters
  ========================= */
  const counters = document.querySelectorAll(".counter");
  let countersStarted = false;

  const animateCounters = () => {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      const duration = 1400;
      const startTime = performance.now();

      const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(easedProgress * target);

        counter.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(update);
    });
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    counterObserver.observe(counters[0]);
  }

  /* =========================
     Reusable Card Slider
  ========================= */
  const createCardSlider = ({
    trackSelector,
    slideSelector,
    prevSelector,
    nextSelector,
    progressSelector,
    currentSelector,
    totalSelector,
  }) => {
    const track = document.querySelector(trackSelector);
    const slides = [...document.querySelectorAll(slideSelector)];
    const prevButton = document.querySelector(prevSelector);
    const nextButton = document.querySelector(nextSelector);
    const progress = document.querySelector(progressSelector);
    const current = document.querySelector(currentSelector);
    const total = document.querySelector(totalSelector);

    if (!track || !slides.length) return;

    let index = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const getVisibleCount = () => {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 980) return 2;
      return 3;
    };

    const getMaxIndex = () => {
      return Math.max(slides.length - getVisibleCount(), 0);
    };

    const getSlideMove = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || 0);

      return slideWidth + gap;
    };

    const updateSlider = () => {
      const maxIndex = getMaxIndex();

      if (index > maxIndex) index = maxIndex;
      if (index < 0) index = 0;

      const move = getSlideMove() * index;

      track.style.transform = `translateX(-${move}px)`;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });

      if (current) {
        current.textContent = String(index + 1).padStart(2, "0");
      }

      if (total) {
        total.textContent = String(slides.length).padStart(2, "0");
      }

      if (progress) {
        const steps = maxIndex + 1;
        const percentage = steps <= 1 ? 100 : ((index + 1) / steps) * 100;
        progress.style.width = `${percentage}%`;
      }
    };

    const nextSlide = () => {
      const maxIndex = getMaxIndex();
      index = index >= maxIndex ? 0 : index + 1;
      updateSlider();
    };

    const prevSlide = () => {
      const maxIndex = getMaxIndex();
      index = index <= 0 ? maxIndex : index - 1;
      updateSlider();
    };

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    track.addEventListener(
      "touchstart",
      (event) => {
        startX = event.touches[0].clientX;
        currentX = startX;
        isDragging = true;
      },
      { passive: true }
    );

    track.addEventListener(
      "touchmove",
      (event) => {
        if (!isDragging) return;
        currentX = event.touches[0].clientX;
      },
      { passive: true }
    );

    track.addEventListener("touchend", () => {
      if (!isDragging) return;

      const distance = startX - currentX;

      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      startX = 0;
      currentX = 0;
      isDragging = false;
    });

    window.addEventListener("resize", updateSlider);

    updateSlider();
  };

  /* =========================
     Projects Card Slider
  ========================= */
  createCardSlider({
    trackSelector: ".project-card-track",
    slideSelector: ".project-card-slide",
    prevSelector: "#projectPrev",
    nextSelector: "#projectNext",
    progressSelector: "#projectProgress",
    currentSelector: "#projectCurrent",
    totalSelector: "#projectTotal",
  });

  /* =========================
     Testimonials Card Slider
  ========================= */
  createCardSlider({
    trackSelector: ".testimonial-card-track",
    slideSelector: ".testimonial-card-slide",
    prevSelector: "#testimonialPrev",
    nextSelector: "#testimonialNext",
    progressSelector: "#testimonialProgress",
    currentSelector: "#testimonialCurrent",
    totalSelector: "#testimonialTotal",
  });

  /* =========================
     FAQ Accordion
  ========================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });

  /* =========================
     Skill Bars
  ========================= */
  const skillBars = document.querySelectorAll(".skill-bar");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const skill = entry.target;
        const percent = skill.dataset.percent || 0;
        const line = skill.querySelector(".skill-line span");

        if (line) {
          line.style.width = `${percent}%`;
        }

        skillObserver.unobserve(skill);
      });
    },
    {
      threshold: 0.35,
    }
  );

  skillBars.forEach((skill) => skillObserver.observe(skill));

  /* =========================
     Back To Top
  ========================= */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================
     Magnetic Buttons
  ========================= */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* =========================
     Contact Form Small UX
  ========================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const submitButton = contactForm.querySelector(".contact-submit");

      if (submitButton) {
        submitButton.innerHTML = `Sending... <span>→</span>`;
        submitButton.disabled = true;
      }
    });
  }
});
