/* ===== Typewriter ===== */
const typewriterEl = document.getElementById("typewriter");
const phrases = [
  "CSE Student | Full-Stack Developer",
  "AI & ML Enthusiast",
  "Problem Solver | Quick Learner",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (!typewriterEl) return;
  const current = phrases[phraseIndex];
  const display = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  typewriterEl.textContent = display + "|";

  if (!isDeleting) charIndex++;
  else charIndex--;

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    delay = 1800;
    charIndex = current.length;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* ===== Particles ===== */
const canvas = document.getElementById("particles-canvas");
const ctx = canvas?.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5,
  }));
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.x !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        p.x -= dx * 0.008;
        p.y -= dy * 0.008;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    const particleColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--particle-color")
      .trim() || "rgba(0, 240, 255, 0.55)";
    ctx.fillStyle = particleColor;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - d / 110)})`;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

if (canvas && ctx) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
}

/* ===== Cursor trail ===== */
const trail = document.getElementById("cursor-trail");
const cursorToggle = document.getElementById("cursor-toggle");
let cursorOn = true;

document.body.classList.add("cursor-on");
cursorToggle?.classList.add("active");

document.addEventListener("mousemove", (e) => {
  if (!trail || !cursorOn) return;
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
});

cursorToggle?.addEventListener("click", () => {
  cursorOn = !cursorOn;
  document.body.classList.toggle("cursor-on", cursorOn);
  cursorToggle.classList.toggle("active", cursorOn);
});

/* ===== Scroll spy & header ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link[data-section]");
const header = document.getElementById("site-header");

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = "hero";

  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current);
  });

  header?.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

/* ===== Scroll to top ===== */
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  scrollTopBtn?.classList.toggle("visible", window.scrollY > 400);
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== Smooth scroll for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    const nav = document.getElementById("mainNav");
    if (nav?.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

/* ===== Skill bars on scroll ===== */
const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const pct = card.dataset.skill || 80;
      card.style.setProperty("--skill-width", `${pct}%`);
      card.classList.add("animated");
      skillObserver.unobserve(card);
    });
  },
  { threshold: 0.35 }
);

skillCards.forEach((card) => skillObserver.observe(card));

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll(
  ".glass-card, .section-header, .project-card, .hero-title, .profile-frame"
);

revealEls.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ===== Project filter ===== */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectItems.forEach((item) => {
      const cats = (item.dataset.category || "").split(/\s+/);
      const show = filter === "all" || cats.includes(filter);
      item.classList.toggle("hidden", !show);
    });
  });
});

/* ===== Config-driven links ===== */
document.getElementById("portfolio-live-link")?.setAttribute(
  "href",
  typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.liveSiteUrl : "#"
);
document.getElementById("portfolio-repo-link")?.setAttribute(
  "href",
  typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.githubRepo : "https://github.com/24A31A05BP"
);

/* ===== Theme toggle (dark / light) ===== */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const metaTheme = document.getElementById("meta-theme-color");
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  if (themeIcon) {
    themeIcon.className = theme === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill";
  }
  if (metaTheme) metaTheme.content = theme === "light" ? "#f0f4f8" : "#0b0f19";
}

applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
});

/* ===== Project modal content ===== */
const projectData = {
  portfolio: {
    title: "Personal Portfolio Website",
    body: `
      <p>My professional portfolio site to showcase skills, projects, and resume.</p>
      <ul>
        <li>Built a responsive, SEO-friendly site with semantic HTML5 &amp; Bootstrap 5</li>
        <li>Interactive resume viewer, project modals, skill animations, and particle background</li>
        <li>Contact form with email notifications (Web3Forms / Formspree)</li>
        <li>Dark/light mode, glassmorphic UI, and mobile-first responsive design</li>
      </ul>
      <p><strong>Stack:</strong> HTML, CSS3, Bootstrap 5, Vanilla JavaScript</p>
    `,
  },
  taskplanner: {
    title: "Task Planner (To-Do List Manager)",
    body: `
      <p>One project — a responsive To-Do / Task Planner web app (same codebase on GitHub: <strong>Task-Planner</strong>).</p>
      <ul>
        <li>Add, view, and delete tasks using JavaScript arrays</li>
        <li>Real-time DOM updates and event-driven interactions</li>
        <li>Practiced HTML, CSS, and frontend fundamentals</li>
      </ul>
      <a href="https://github.com/24A31A05BP/Task-Planner" target="_blank" rel="noopener" class="btn btn-neon-primary mt-2">View on GitHub</a>
    `,
  },
  ai: {
    title: "AI-Powered Interview Simulation Platform",
    body: `
      <p>An AI-driven platform for practicing technical and HR interview scenarios.</p>
      <ul>
        <li>Simulates real-time interview questions interactively</li>
        <li>Helps improve confidence, communication, and preparation</li>
        <li>Explores AI-based systems for education and career readiness</li>
      </ul>
      <a href="https://github.com/Jeavan5493/AI-BASED-INTERVIEW-SIMULATOR" target="_blank" rel="noopener" class="btn btn-neon-primary mt-2">View on GitHub</a>
    `,
  },
};

const projectModal = document.getElementById("projectModal");
const projectModalLabel = document.getElementById("projectModalLabel");
const projectModalBody = document.getElementById("project-modal-body");

projectModal?.addEventListener("show.bs.modal", (e) => {
  const trigger = e.relatedTarget;
  const key = trigger?.dataset?.project;
  const data = projectData[key];
  if (!data) return;
  projectModalLabel.textContent = data.title;
  projectModalBody.innerHTML = data.body;
});

/* ===== Contact form (email notifications) ===== */
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const formError = document.getElementById("form-error");
const contactSubmit = document.getElementById("contact-submit");
const submitText = contactSubmit?.querySelector(".submit-text");
const submitLoading = contactSubmit?.querySelector(".submit-loading");

function setFormLoading(loading) {
  contactSubmit.disabled = loading;
  submitText?.classList.toggle("d-none", loading);
  submitLoading?.classList.toggle("d-none", !loading);
}

async function sendViaWeb3Forms(payload) {
  const key = SITE_CONFIG.web3formsAccessKey;
  if (!key || key.includes("YOUR_")) throw new Error("Configure web3formsAccessKey in config.js");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      from_name: "Portfolio Contact Form",
    }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Send failed");
}

async function sendViaFormspree(payload) {
  const endpoint = SITE_CONFIG.formspreeEndpoint;
  if (!endpoint || endpoint.includes("YOUR_")) throw new Error("Configure formspreeEndpoint in config.js");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Formspree error");
}

function sendViaMailto(payload) {
  const subject = encodeURIComponent(payload.subject);
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
  );
  window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
}

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  contactForm.classList.add("was-validated");
  formSuccess?.classList.add("d-none");
  formError?.classList.add("d-none");

  if (!contactForm.checkValidity()) return;

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject:
      document.getElementById("subject").value.trim() ||
      `Portfolio message from ${document.getElementById("name").value.trim()}`,
    message: document.getElementById("message").value.trim(),
  };

  setFormLoading(true);

  try {
    const method =
      typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.contactMethod : "mailto";

    if (method === "web3forms") await sendViaWeb3Forms(payload);
    else if (method === "formspree") await sendViaFormspree(payload);
    else sendViaMailto(payload);

    formSuccess?.classList.remove("d-none");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  } catch {
    formError?.classList.remove("d-none");
    if (typeof SITE_CONFIG !== "undefined") sendViaMailto(payload);
  } finally {
    setFormLoading(false);
  }
});

/* ===== Print resume ===== */
document.getElementById("print-resume")?.addEventListener("click", () => {
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("resumeModal")
  );
  modal.show();
  setTimeout(() => window.print(), 600);
});
