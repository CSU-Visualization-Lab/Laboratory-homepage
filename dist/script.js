const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeColor = document.querySelector('meta[name="theme-color"]');

function updateThemeControl(theme) {
  const isDark = theme === "dark";
  if (themeLabel) themeLabel.textContent = isDark ? "Light" : "Dark";
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeColor?.setAttribute("content", isDark ? "#171a18" : "#f4f4f0");
}

updateThemeControl(document.documentElement.dataset.theme || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("ivm-theme", nextTheme);
  updateThemeControl(nextTheme);
});

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

const videoPlayer = document.querySelector("[data-video-player]");
const labVideo = document.querySelector("[data-lab-video]");
const videoPlayButton = document.querySelector("[data-video-play]");

function updateVideoButton() {
  const isPlaying = Boolean(labVideo && !labVideo.paused && !labVideo.ended);
  videoPlayer?.classList.toggle("is-playing", isPlaying);
  videoPlayButton?.setAttribute("aria-label", isPlaying ? "Pause the lab introduction video" : "Play the lab introduction video");
}

function toggleLabVideo() {
  if (!labVideo) return;
  if (labVideo.paused || labVideo.ended) {
    labVideo.play().catch(() => updateVideoButton());
  } else {
    labVideo.pause();
  }
}

videoPlayButton?.addEventListener("click", toggleLabVideo);
labVideo?.addEventListener("play", updateVideoButton);
labVideo?.addEventListener("pause", updateVideoButton);
labVideo?.addEventListener("ended", updateVideoButton);
updateVideoButton();

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
  });
});

const activityGallery = document.querySelector("[data-activity-gallery]");

if (activityGallery) {
  const slides = [...activityGallery.querySelectorAll("[data-activity-slide]")];
  const kicker = activityGallery.querySelector("[data-activity-kicker]");
  const title = activityGallery.querySelector("[data-activity-title]");
  const description = activityGallery.querySelector("[data-activity-description]");
  const current = activityGallery.querySelector("[data-activity-current]");
  const previousButton = activityGallery.querySelector("[data-activity-prev]");
  const nextButton = activityGallery.querySelector("[data-activity-next]");
  let activeIndex = 0;
  let activityLocked = false;

  function showActivity(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const stackIndex = (slideIndex - activeIndex + slides.length) % slides.length;
      slide.style.setProperty("--stack-index", String(stackIndex));
      slide.classList.toggle("is-active", stackIndex === 0);
      slide.setAttribute("aria-hidden", String(stackIndex !== 0));
    });

    const activeSlide = slides[activeIndex];
    if (kicker) kicker.textContent = activeSlide.dataset.kicker;
    if (title) title.textContent = activeSlide.dataset.title;
    if (description) description.textContent = activeSlide.dataset.description;
    if (current) current.textContent = String(activeIndex + 1).padStart(2, "0");
  }

  function moveActivity(direction) {
    if (activityLocked || slides.length < 2) return;
    activityLocked = true;
    const leavingSlide = slides[activeIndex];
    const animationClass = direction > 0 ? "is-flipping-next" : "is-flipping-prev";
    leavingSlide.classList.add(animationClass);

    const finish = () => {
      leavingSlide.classList.add("is-resetting");
      showActivity(activeIndex + direction);
      leavingSlide.classList.remove(animationClass);
      void leavingSlide.offsetWidth;
      leavingSlide.classList.remove("is-resetting");
      activityLocked = false;
    };

    if (reducedMotion) finish();
    else window.setTimeout(finish, 380);
  }

  previousButton?.addEventListener("click", () => moveActivity(-1));
  nextButton?.addEventListener("click", () => moveActivity(1));
  showActivity(0);
}

document.querySelectorAll("a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
