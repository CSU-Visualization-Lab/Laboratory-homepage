const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === tab.dataset.tab;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
  });
});

const filters = document.querySelectorAll("[data-filter]");
const outputs = document.querySelectorAll("[data-type]");
const publicationContent = document.querySelector("[data-publication-content]");
const paperGallery = document.querySelector("[data-paper-gallery]");

filters.forEach((item) => item.setAttribute("aria-pressed", String(item.classList.contains("is-active"))));

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    outputs.forEach((output) => {
      output.hidden = filter.dataset.filter !== "all" && output.dataset.type !== filter.dataset.filter;
    });

    const showPaperGallery = filter.dataset.filter === "paper";
    publicationContent?.classList.toggle("is-paper-view", showPaperGallery);
    if (paperGallery) paperGallery.hidden = !showPaperGallery;
  });
});

const paperCarousel = document.querySelector("[data-paper-carousel]");

if (paperCarousel) {
  const track = paperCarousel.querySelector("[data-paper-track]");
  const slides = [...paperCarousel.querySelectorAll(".paper-slide")];
  const current = paperCarousel.querySelector("[data-paper-current]");
  const progress = paperCarousel.querySelector("[data-paper-progress]");
  const previousButton = paperCarousel.querySelector("[data-paper-prev]");
  const nextButton = paperCarousel.querySelector("[data-paper-next]");
  let activeIndex = 0;
  let autoplayTimer;

  function showPaper(nextIndex) {
    activeIndex = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    current.textContent = String(activeIndex + 1).padStart(2, "0");
    progress.style.transform = `translateX(${activeIndex * 100}%)`;
  }

  function stopPaperAutoplay() {
    window.clearInterval(autoplayTimer);
  }

  function startPaperAutoplay() {
    stopPaperAutoplay();
    if (reducedMotion || slides.length < 2 || document.hidden) return;
    autoplayTimer = window.setInterval(() => showPaper(activeIndex + 1), 5200);
  }

  previousButton?.addEventListener("click", () => {
    showPaper(activeIndex - 1);
    startPaperAutoplay();
  });
  nextButton?.addEventListener("click", () => {
    showPaper(activeIndex + 1);
    startPaperAutoplay();
  });
  paperCarousel.addEventListener("mouseenter", stopPaperAutoplay);
  paperCarousel.addEventListener("mouseleave", startPaperAutoplay);
  paperCarousel.addEventListener("focusin", stopPaperAutoplay);
  paperCarousel.addEventListener("focusout", (event) => {
    if (!paperCarousel.contains(event.relatedTarget)) startPaperAutoplay();
  });
  document.addEventListener("visibilitychange", startPaperAutoplay);

  showPaper(0);
  startPaperAutoplay();
}

document.querySelectorAll("a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
