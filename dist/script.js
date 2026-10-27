const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const languageToggle = document.querySelector("[data-language-toggle]");
const languageLabel = document.querySelector("[data-language-label]");
const languageIcon = document.querySelector("[data-language-icon]");
const themeColor = document.querySelector('meta[name="theme-color"]');
const descriptionMeta = document.querySelector('meta[name="description"]');
let refreshActivityLanguage = () => {};

function getLanguage() {
  return document.documentElement.dataset.language === "zh" ? "zh" : "en";
}

const translationSpecs = [
  { selector: ".skip-link", zh: "跳至主要内容" },
  { selector: ".brand strong", zh: "智能可视媒体实验室" },
  { selector: ".brand small", zh: "中南大学" },
  { selector: ".site-nav a", zh: ["关于", "动态", "论文发表", "成员", "活动展示", "加入我们"] },
  { selector: ".menu-button > span:first-child", zh: "菜单" },
  { selector: ".hero .eyebrow", zh: "智能可视媒体实验室" },
  { selector: "#hero-title", zh: "智能可视媒体实验室" },
  { selector: ".hero-intro", zh: "我们研究数据、视觉表达、人类认知与智能模型之间的关系，致力于构建准确、可信且可交互的可视化方法。" },
  { selector: ".hero-aside p", zh: ["中南大学计算机学院", "中国 · 长沙"] },
  { selector: ".hero-aside a", zh: "了解实验室 <span aria-hidden=\"true\">↓</span>", html: true },
  { selector: "#about > .section-header > p", zh: "<span>01</span> 关于", html: true },
  { selector: "#about-title", zh: "从问题出发。<br>构建理解世界的技术。", html: true },
  { selector: ".about-video > p", zh: "实验室影像 · 简介" },
  { selector: ".about-copy > p", zh: ["智能可视媒体实验室依托中南大学计算机学院，聚焦数据可视分析与大模型驱动的智能可视化研究。", "我们连接基础研究与真实问题，探索复杂数据如何在开放协作、交叉融合的环境中被表达、理解和分析。"] },
  { selector: "#news > .section-header > p", zh: "<span>02</span> 动态", html: true },
  { selector: "#news-title", zh: "实验室最近在发生什么。" },
  { selector: ".news-item div > p", zh: ["科研动态", "开放讲座", "实验室动态"] },
  { selector: ".news-item h3", zh: ["占位：实验室论文被重要会议接收", "占位：特邀学者将带来前沿学术报告", "占位：欢迎新成员加入实验室"] },
  { selector: ".news-item > a", zh: "阅读 <span>↗</span>", html: true },
  { selector: "#publications .section-header-split > div:first-child > p", zh: "<span>03</span> 论文发表", html: true },
  { selector: "#publications-title", zh: "论文发表与开放实践。" },
  { selector: ".filter-group .filter", zh: ["论文", "开源"] },
  { selector: ".filter-field > span", zh: ["搜索", "年份", "会议或期刊"] },
  { selector: "[data-year-filter] option:first-child", zh: "全部年份" },
  { selector: "[data-venue-filter] option:first-child", zh: "全部会议或期刊" },
  { selector: ".paper-entry .paper-tags span:not(:first-child)", zh: ["长文", "移动可视分析", "长文", "降维"] },
  { selector: ".paper-venue", zh: "IEEE VIS 2026 · VIS 长文" },
  { selector: ".paper-abstract", zh: ["MobileGroupVis 帮助教师在教室中走动时同时监测多个小组的讨论。系统通过流式音频分析管线和六个协调联动的移动端视图呈现参与度、互动关系、话题进展与话题偏离；案例研究和专家访谈表明，它能帮助教师发现需要关注的小组，并在掌握更多上下文的情况下进行干预。", "传统的邻域保持度量可能给降维布局打出很高分数，即使其中仍存在明显的局部失真。该工作提出基于感知的标注方法和 NPNet——一种从成对人类判断中学习得到的神经网络质量度量，并以此比较现有投影度量并提供实用建议。"] },
  { selector: ".paper-links .abstract-toggle", zh: "<span aria-hidden=\"true\">+</span> 摘要", html: true },
  { selector: ".paper-links a", zh: ["<span aria-hidden=\"true\">↓</span> 论文", "<span aria-hidden=\"true\">↗</span> DOI", "<span aria-hidden=\"true\">↓</span> 论文", "<span aria-hidden=\"true\">⌘</span> 代码"], html: true },
  { selector: ".output-row .output-meta > span", zh: "开源" },
  { selector: ".output-row .output-body h3", zh: "开源数据集、工具或系统——标题占位" },
  { selector: ".output-row .output-body p", zh: "简要说明其解决的问题、规模与使用方式" },
  { selector: ".output-empty", zh: "没有匹配的论文或开源成果。" },
  { selector: "#people .section-header-split > div:first-child > p", zh: "<span>04</span> 成员", html: true },
  { selector: "#people-title", zh: "不同视角，共同方向。" },
  { selector: ".tabs .tab", zh: ["教师", "学生", "毕业成员"] },
  { selector: ".person-role", zh: ["实验室负责人", "教师", "教师", "教师"] },
  { selector: ".person-copy h3", zh: ["夏佳志 <span>教授 · 博士生导师</span>", "阚世超 <span>副教授</span>", "李奕君 <span>特聘副教授</span>", "周杰辉 <span>博士后</span>"], html: true },
  { selector: ".person-copy > p:last-child", zh: ["研究方向：数据可视化。中南大学计算机学院教授、博士生导师。", "研究方向：多模态大模型。", "研究方向：虚拟现实。", "研究方向：数据可视化。"] },
  { selector: ".student-cohort-head p", zh: ["博士研究生", "硕士研究生"] },
  { selector: ".student-cohort-head h3", zh: ["博士研究生", "硕士研究生"] },
  { selector: ".student h4", zh: ["赵昕", "孙一平", "黄普", "邓志伟", "魏玮峰", "严月日", "冯昕浩", "陈恺人", "邓淳熙", "何晨", "张忠瑾", "王利峰", "康梓瑶", "田霖轩", "梁宇", "李云涛", "张鲲鹏", "闫博超", "彭馨仪", "王稼轩", "高爽", "袁煜倬", "黄涛", "林海"] },
  { selector: ".alumni-list strong", zh: "毕业成员" },
  { selector: ".alumni-list p", zh: "去向：高校 / 企业 / 科研机构" },
  { selector: "#activities > .section-header > p", zh: "<span>05</span> 活动展示", html: true },
  { selector: "#activities-title", zh: "科研之外，我们共同成长。" },
  { selector: "#join > .section-header > p", zh: "<span>06</span> 加入我们", html: true },
  { selector: "#join-title", zh: "欢迎始终对问题保持好奇的人。" },
  { selector: ".join-copy > p", zh: "我们欢迎希望参与真实研究问题的博士生、硕士生、科研助理与实习生。来信请附个人简历，并简要介绍你的研究兴趣和相关经历。" },
  { selector: ".join-copy .button", zh: "联系我们 <span>↗</span>", html: true },
  { selector: ".position span", zh: ["博士研究生", "硕士研究生", "科研助理 / 实习生"] },
  { selector: ".position strong", zh: ["博士项目", "硕士项目", "科研助理与实习"] },
  { selector: ".position i", zh: ["开放", "开放", "长期"] },
  { selector: ".join-board > p", zh: "申请邮箱 <a href=\"mailto:xiajiazhi@csu.edu.cn\">xiajiazhi@csu.edu.cn</a>", html: true },
  { selector: ".site-footer > div:first-child strong", zh: "智能可视媒体实验室" },
  { selector: ".site-footer > div:first-child p", zh: "中南大学 · 中国长沙" },
  { selector: ".footer-links a:last-child", zh: "邮箱 ↗" },
  { selector: ".footer-bottom", zh: "© <span data-current-year></span> 智能可视媒体实验室", html: true },
];

const translatedElements = translationSpecs.flatMap((spec) =>
  [...document.querySelectorAll(spec.selector)].map((element, index) => ({
    element,
    html: Boolean(spec.html),
    en: spec.html ? element.innerHTML : element.textContent,
    zh: Array.isArray(spec.zh) ? spec.zh[index] : spec.zh,
  })),
);

const attributeSpecs = [
  { selector: ".brand", attribute: "aria-label", zh: "返回首页" },
  { selector: ".site-nav", attribute: "aria-label", zh: "主导航" },
  { selector: ".hero-lab-name img", attribute: "alt", zh: "智能可视媒体实验室视觉标识" },
  { selector: ".hero-aside", attribute: "aria-label", zh: "实验室信息" },
  { selector: "[data-lab-video]", attribute: "aria-label", zh: "智能可视媒体实验室介绍" },
  { selector: ".news-item > a", attribute: "aria-label", zh: ["阅读第一条动态", "阅读第二条动态", "阅读第三条动态"] },
  { selector: ".filter-group", attribute: "aria-label", zh: "筛选论文发表" },
  { selector: "[data-output-search]", attribute: "placeholder", zh: "按题目、作者或关键词搜索" },
  { selector: ".paper-entry-figure img", attribute: "alt", zh: ["用于现场小组讨论分析的 MobileGroupVis 界面", "面向感知驱动降维质量度量的 NPNet 示意图"] },
  { selector: ".paper-tags", attribute: "aria-label", zh: "论文标签" },
  { selector: ".paper-links", attribute: "aria-label", zh: ["《Walking Through Discussions》相关链接", "《Beyond Quantification of Neighborhoods》相关链接"] },
  { selector: ".output-row > a", attribute: "aria-label", zh: "查看开源成果" },
  { selector: ".tabs", attribute: "aria-label", zh: "成员分组" },
  { selector: ".portrait img", attribute: "alt", zh: ["夏佳志教授", "阚世超副教授", "李奕君副教授", "周杰辉博士后"] },
  { selector: "[data-activity-gallery]", attribute: "aria-label", zh: "实验室活动展示" },
  { selector: ".activity-slide img", attribute: "alt", zh: ["实验室成员庆祝毕业", "实验室成员参加羽毛球活动", "实验室成员参加羽毛球活动"] },
  { selector: "[data-activity-prev]", attribute: "aria-label", zh: "上一张活动照片" },
  { selector: "[data-activity-next]", attribute: "aria-label", zh: "下一张活动照片" },
  { selector: ".join-board", attribute: "aria-label", zh: "开放岗位" },
];

const translatedAttributes = attributeSpecs.flatMap((spec) =>
  [...document.querySelectorAll(spec.selector)].map((element, index) => ({
    element,
    attribute: spec.attribute,
    en: element.getAttribute(spec.attribute) || "",
    zh: Array.isArray(spec.zh) ? spec.zh[index] : spec.zh,
  })),
);

function applyLanguage(language) {
  const nextLanguage = language === "zh" ? "zh" : "en";
  document.documentElement.dataset.language = nextLanguage;
  document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  localStorage.setItem("ivm-language", nextLanguage);

  translatedElements.forEach(({ element, html, en, zh }) => {
    if (html) element.innerHTML = nextLanguage === "zh" ? zh : en;
    else element.textContent = nextLanguage === "zh" ? zh : en;
  });
  translatedAttributes.forEach(({ element, attribute, en, zh }) => {
    element.setAttribute(attribute, nextLanguage === "zh" ? zh : en);
  });

  const displayedYear = document.querySelector("[data-current-year]");
  if (displayedYear) displayedYear.textContent = new Date().getFullYear();

  document.title = nextLanguage === "zh" ? "智能可视媒体实验室 · 中南大学" : "Intelligent Visual Media Lab · Central South University";
  descriptionMeta?.setAttribute("content", nextLanguage === "zh" ? "中南大学智能可视媒体实验室聚焦数据可视分析与大模型驱动的智能可视化研究。" : "The Intelligent Visual Media Lab at Central South University studies visual analytics and intelligent visualization powered by foundation models.");
  if (languageLabel) languageLabel.textContent = nextLanguage === "zh" ? "EN" : "中文";
  if (languageIcon) languageIcon.textContent = nextLanguage === "zh" ? "A" : "中";
  languageToggle?.setAttribute("aria-label", nextLanguage === "zh" ? "Switch to English" : "切换至中文");
  updateThemeControl(document.documentElement.dataset.theme || "light");
  updateVideoButton();
  applyOutputFilters();
  refreshActivityLanguage();
}

function updateThemeControl(theme) {
  const isDark = theme === "dark";
  const isChinese = getLanguage() === "zh";
  if (themeLabel) themeLabel.textContent = isDark ? (isChinese ? "白天" : "Light") : (isChinese ? "夜间" : "Dark");
  themeToggle?.setAttribute("aria-label", isDark ? (isChinese ? "切换至白天模式" : "Switch to light mode") : (isChinese ? "切换至夜间模式" : "Switch to dark mode"));
  themeColor?.setAttribute("content", isDark ? "#171a18" : "#f4f4f0");
}

updateThemeControl(document.documentElement.dataset.theme || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("ivm-theme", nextTheme);
  updateThemeControl(nextTheme);
});

languageToggle?.addEventListener("click", () => {
  applyLanguage(getLanguage() === "zh" ? "en" : "zh");
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
  const isChinese = getLanguage() === "zh";
  videoPlayer?.classList.toggle("is-playing", isPlaying);
  videoPlayButton?.setAttribute("aria-label", isPlaying ? (isChinese ? "暂停实验室介绍视频" : "Pause the lab introduction video") : (isChinese ? "播放实验室介绍视频" : "Play the lab introduction video"));
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
const outputSearch = document.querySelector("[data-output-search]");
const yearFilter = document.querySelector("[data-year-filter]");
const venueFilter = document.querySelector("[data-venue-filter]");
const venueControl = document.querySelector("[data-venue-control]");
const filterStatus = document.querySelector("[data-filter-status]");
const outputEmpty = document.querySelector("[data-output-empty]");

filters.forEach((item) => item.setAttribute("aria-pressed", String(item.classList.contains("is-active"))));

function applyOutputFilters() {
  const activeType = document.querySelector("[data-filter].is-active")?.dataset.filter || "paper";
  const query = outputSearch?.value.trim().toLowerCase() || "";
  const selectedYear = yearFilter?.value || "";
  const selectedVenue = venueFilter?.value || "";
  let visibleCount = 0;

  if (venueControl) venueControl.hidden = activeType !== "paper";

  outputs.forEach((output) => {
    const searchText = output.textContent.toLowerCase();
    const typeMatches = output.dataset.type === activeType;
    const searchMatches = !query || searchText.includes(query);
    const yearMatches = !selectedYear || output.dataset.year === selectedYear;
    const venueMatches = activeType !== "paper" || !selectedVenue || output.dataset.venue === selectedVenue;
    const visible = typeMatches && searchMatches && yearMatches && venueMatches;
    output.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (filterStatus) filterStatus.textContent = getLanguage() === "zh" ? `${visibleCount} 项结果` : `${visibleCount} ${visibleCount === 1 ? "result" : "results"}`;
  if (outputEmpty) outputEmpty.hidden = visibleCount !== 0;
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    applyOutputFilters();
  });
});

outputSearch?.addEventListener("input", applyOutputFilters);
yearFilter?.addEventListener("change", applyOutputFilters);
venueFilter?.addEventListener("change", applyOutputFilters);

document.querySelectorAll("[data-abstract-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const abstract = document.getElementById(button.getAttribute("aria-controls"));
    if (!abstract) return;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    abstract.hidden = expanded;
  });
});

applyOutputFilters();

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
    const isChinese = getLanguage() === "zh";
    if (kicker) kicker.textContent = isChinese ? activeSlide.dataset.kickerZh : activeSlide.dataset.kicker;
    if (title) title.textContent = isChinese ? activeSlide.dataset.titleZh : activeSlide.dataset.title;
    if (description) description.textContent = isChinese ? activeSlide.dataset.descriptionZh : activeSlide.dataset.description;
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
  refreshActivityLanguage = () => showActivity(activeIndex);
  showActivity(0);
}

document.querySelectorAll("a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

applyLanguage(getLanguage());
