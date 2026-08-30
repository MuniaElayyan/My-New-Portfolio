/* ======================================================
   Mobile Hamburger Menu
====================================================== */
(function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (!toggle || !navLinks) return;

  function closeMenu() {
    toggle.classList.remove("active");
    navLinks.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle("active");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", toggleMenu);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("active")) return;
    if (navLinks.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });
})();

/* ======================================================
   Projects data — each item opens the live website
   directly in a new tab. Drop screenshots into
   assets/images/projects/ using the exact filenames
   below and they'll appear automatically; until then a
   soft placeholder is shown instead.
====================================================== */
const projectsData = [
  {
    name: "Al-Nabdh Specialized Hospital",
    description: "A specialized cardiology hospital website with service pages, a medical staff directory, and a dedicated staff login portal.",
    image: "assets/images/projects/01-al-nabdh-hospital.jpg",
    url: "https://muniaelayyan.github.io/Al-Nabdh-Specialized-Hospital-FINAL-/"
  },
  {
    name: "Sustainable Innovation Center",
    description: "An architecture & engineering studio site showcasing services, featured projects, and team profiles with a sustainability focus.",
    image: "assets/images/projects/02-sustainable-innovation-center.jpg",
    url: "https://muniaelayyan.github.io/sustainable-innovation-center/"
  },
  {
    name: "Basil & Vine Restaurant",
    description: "A multi-page fine dining restaurant website featuring a menu, photo gallery, and table reservation page.",
    image: "assets/images/projects/03-basil-vine-restaurant.jpg",
    url: "https://muniaelayyan.github.io/basil-vine-restaurant/"
  },
  {
    name: "Olive Beauty",
    description: "A natural skincare e-commerce store with a product catalog, an admin dashboard, and inventory management tools.",
    image: "assets/images/projects/04-olive-beauty.jpg",
    url: "https://muniaelayyan.github.io/Olive-Beauty/index.html"
  },
  {
    name: "She Moda",
    description: "A women's fashion boutique storefront with a product catalog and direct WhatsApp inquiries.",
    image: "assets/images/projects/05-she-moda.jpg",
    url: "https://muniaelayyan.github.io/she-moda/"
  },
  {
    name: "EduVault",
    description: "A student course enrollment dashboard for managing students, courses, and enrollments in one place.",
    image: "assets/images/projects/06-eduvault.jpg",
    url: "https://muniaelayyan.github.io/EduVault/"
  },
  {
    name: "CodeNest",
    description: "A coding education platform offering live, project-based courses that take learners from their first line of code to job-ready skills.",
    image: "assets/images/projects/07-codenest.jpg",
    url: "https://codenest-w70j.onrender.com/"
  },
  {
    name: "MindSpace",
    description: "A personal notes app for capturing ideas, plans, and reminders, organized by category and mood.",
    image: "assets/images/projects/08-mindspace.jpg",
    url: "https://muniaelayyan.github.io/MindSpace/"
  },
  {
    name: "Luma — Productivity",
    description: "A cozy productivity & to-do app that tracks daily tasks alongside a mood check-in.",
    image: "assets/images/projects/09-luma-todo.jpg",
    url: "https://muniaelayyan.github.io/luma-todo/"
  },
];

function projectPlaceholder(name) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#8C6B4F"/>
        <stop offset="100%" stop-color="#D7A8B8"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#g)"/>
    <text x="50%" y="54%" font-family="Poppins, sans-serif" font-size="120" fill="white" fill-opacity="0.9" text-anchor="middle" dominant-baseline="middle">${initial}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

/* ======================================================
   Projects Carousel
====================================================== */
(function initProjectCarousel() {
  const viewport = document.getElementById("projectViewport");
  const prevBtn = document.getElementById("projectPrev");
  const nextBtn = document.getElementById("projectNext");
  const counter = document.getElementById("projectCounter");

  if (!viewport) return;

  viewport.innerHTML = projectsData.map((project) => `
    <div class="project-card">
      <div class="project-frame">
        <img src="${project.image}" alt="${project.name}" loading="lazy"
             onerror="this.onerror=null;this.src='${projectPlaceholder(project.name)}';">
      </div>
      <div class="project-info">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.url}" target="_blank" rel="noopener" class="project-btn">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          View Website
        </a>
      </div>
    </div>
  `).join("");

  const cards = Array.from(viewport.children);

  function updateCounter() {
    const cardWidth = cards[0].getBoundingClientRect().width + 30; // + gap
    const index = Math.round(viewport.scrollLeft / cardWidth);
    const clamped = Math.min(Math.max(index, 0), cards.length - 1);
    counter.textContent = `${clamped + 1} / ${cards.length}`;
  }

  function scrollByCard(direction) {
    const cardWidth = cards[0].getBoundingClientRect().width + 30; // + gap
    viewport.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));
  viewport.addEventListener("scroll", () => {
    window.clearTimeout(viewport._scrollTimeout);
    viewport._scrollTimeout = window.setTimeout(updateCounter, 80);
  });
  window.addEventListener("resize", updateCounter);

  updateCounter();
})();

/* ======================================================
   Certificates data — ordered from strongest to latest.
   Reorder this array any time to change the display order.
====================================================== */
const certificatesData = [
  {
    title: "Intro to Programming — Nanodegree",
    org: "Udacity (Google x Palestine Launchpad)",
    date: "Apr 2026",
    image: "assets/certificates/images/01-udacity-intro-to-programming.png",
    file: "assets/certificates/pdfs/01-udacity-intro-to-programming.pdf"
  },
  {
    title: "One Million Prompters Initiative",
    org: "Dubai Future Foundation",
    date: "2026",
    image: "assets/certificates/images/02-dubai-1-million-prompters.png",
    file: "assets/certificates/pdfs/02-dubai-1-million-prompters.pdf"
  },
  {
    title: "Introduction to Artificial Intelligence Engineering",
    org: "Kernel",
    date: "25 Jul 2026",
    image: "assets/certificates/images/03-kernel-ai-engineering-intro.png",
    file: "assets/certificates/pdfs/03-kernel-ai-engineering-intro.pdf"
  },
  {
    title: "Data Science & Analytics",
    org: "HP LIFE",
    date: "13 Jun 2026",
    image: "assets/certificates/images/04-hp-life-data-science-analytics.png",
    file: "assets/certificates/images/04-hp-life-data-science-analytics.png"
  },
  {
    title: "AI Foundations & MVP Bootcamp",
    org: "BinX Tech",
    date: "2026",
    image: "assets/certificates/images/05-binx-ai-foundations-mvp-bootcamp.png",
    file: "assets/certificates/pdfs/05-binx-ai-foundations-mvp-bootcamp.pdf"
  },
  {
    title: "ML Foundations Bootcamp (12h)",
    org: "BinX Tech x IT Club AAUP",
    date: "2026",
    image: "assets/certificates/images/06-binx-ml-foundations-bootcamp.jpg",
    file: "assets/certificates/images/06-binx-ml-foundations-bootcamp.jpg"
  },
  {
    title: "Python Programming (40h)",
    org: "CSE Club PTUK",
    date: "2026",
    image: "assets/certificates/images/07-cse-python-programming.png",
    file: "assets/certificates/images/07-cse-python-programming.png"
  },
  {
    title: "JAVA & OOP (50h)",
    org: "Training Program",
    date: "2026",
    image: "assets/certificates/images/08-java-oop.jpg",
    file: "assets/certificates/images/08-java-oop.jpg"
  },
  {
    title: "Data Structures (36h)",
    org: "Training Program",
    date: "2026",
    image: "assets/certificates/images/09-data-structures.jpg",
    file: "assets/certificates/images/09-data-structures.jpg"
  },
  {
    title: "Computer Vision Workshop",
    org: "Qafza Tech",
    date: "18 Jul 2026",
    image: "assets/certificates/images/10-qafza-computer-vision.png",
    file: "assets/certificates/pdfs/10-qafza-computer-vision.pdf"
  },
  {
    title: "Data Storytelling Workshop",
    org: "Qafza Tech",
    date: "14 Jul 2026",
    image: "assets/certificates/images/11-qafza-data-storytelling-titanic.png",
    file: "assets/certificates/pdfs/11-qafza-data-storytelling-titanic.pdf"
  },
  {
    title: "AI Marketing Video Workshop",
    org: "Qafza Tech",
    date: "29 Jul 2026",
    image: "assets/certificates/images/12-qafza-ai-marketing-video.png",
    file: "assets/certificates/pdfs/12-qafza-ai-marketing-video.pdf"
  },
  {
    title: "Build a Website That Tells Your Story",
    org: "Qafza Tech",
    date: "5 Aug 2026",
    image: "assets/certificates/images/13-qafza-build-website.png",
    file: "assets/certificates/pdfs/13-qafza-build-website.pdf"
  },
  {
    title: "AI & Vibe Coding Workshop",
    org: "Flasha Academy",
    date: "2026",
    image: "assets/certificates/images/14-flasha-ai-vibe-coding.png",
    file: "assets/certificates/pdfs/14-flasha-ai-vibe-coding.pdf"
  },
  {
    title: "Cloud Computing Workshop",
    org: "Flasha Academy",
    date: "24 Jun 2026",
    image: "assets/certificates/images/15-flasha-cloud-computing.jpg",
    file: "assets/certificates/images/15-flasha-cloud-computing.jpg"
  },
  {
    title: "Problem Solving Workshop — Part 2",
    org: "Flasha Academy",
    date: "5 Jun 2026",
    image: "assets/certificates/images/16-flasha-problem-solving-part2.jpg",
    file: "assets/certificates/images/16-flasha-problem-solving-part2.jpg"
  },
  {
    title: "How to Build a Portfolio",
    org: "Kernel",
    date: "28 Jun 2026",
    image: "assets/certificates/images/17-kernel-portfolio-workshop.png",
    file: "assets/certificates/pdfs/17-kernel-portfolio-workshop.pdf"
  },
  {
    title: "AI Design with Claude, ChatGPT & Gemini",
    org: "forsa.com",
    date: "15 Jul 2026",
    image: "assets/certificates/images/18-forsa-ai-design-course.png",
    file: "assets/certificates/pdfs/18-forsa-ai-design-course.pdf"
  },
  {
    title: "Social Media Marketing",
    org: "HP LIFE",
    date: "18 Oct 2025",
    image: "assets/certificates/images/19-hp-life-social-media-marketing.png",
    file: "assets/certificates/images/19-hp-life-social-media-marketing.png"
  },
  {
    title: "Effective Presentations",
    org: "HP LIFE",
    date: "31 Mar 2026",
    image: "assets/certificates/images/20-hp-life-effective-presentations.png",
    file: "assets/certificates/images/20-hp-life-effective-presentations.png"
  },
  {
    title: "Resume Writing & Job Interviews",
    org: "HP LIFE",
    date: "17 Oct 2025",
    image: "assets/certificates/images/21-hp-life-resume-interview.png",
    file: "assets/certificates/images/21-hp-life-resume-interview.png"
  },
  {
    title: "C++ Basics",
    org: "Kiraz Academy",
    date: "25 Dec 2024",
    image: "assets/certificates/images/22-cpp-basics.jpg",
    file: "assets/certificates/images/22-cpp-basics.jpg"
  },
  {
    title: "Intro to the World of Programming",
    org: "Udemy",
    date: "1 Apr 2026",
    image: "assets/certificates/images/23-udemy-intro-programming-world.png",
    file: "assets/certificates/images/23-udemy-intro-programming-world.png"
  },
  {
    title: "Learn Git",
    org: "Boot.dev",
    date: "16 Jul 2026",
    image: "assets/certificates/images/24-bootdev-learn-git.png",
    file: "assets/certificates/images/24-bootdev-learn-git.png"
  },
  {
    title: "Cybersecurity Essentials Bootcamp",
    org: "ENG4YOU",
    date: "2026",
    image: "assets/certificates/images/25-eng4you-cybersecurity.png",
    file: "assets/certificates/pdfs/25-eng4you-cybersecurity.pdf"
  },
  {
    title: "Technical & Professional Skills Series",
    org: "NawrasEdu",
    date: "2026",
    image: "assets/certificates/images/26-nawrasedu-skills-series.png",
    file: "assets/certificates/images/26-nawrasedu-skills-series.png"
  },
  {
    title: "LinkedIn Profile & CV Writing",
    org: "CSE Club PTUK",
    date: "2026",
    image: "assets/certificates/images/27-cse-linkedin-cv.jpg",
    file: "assets/certificates/images/27-cse-linkedin-cv.jpg"
  },
  {
    title: "Web Development Boot Camp",
    org: "CSE Club PTUK",
    date: "2026",
    image: "assets/certificates/images/28-cse-web-dev-bootcamp.jpg",
    file: "assets/certificates/images/28-cse-web-dev-bootcamp.jpg"
  },
  {
    title: "IEEE Training",
    org: "CSE Club PTUK",
    date: "2026",
    image: "assets/certificates/images/29-cse-ieee-training.jpg",
    file: "assets/certificates/images/29-cse-ieee-training.jpg"
  },
  {
    title: "AI Bootcamp (Two-Session)",
    org: "CSE Club PTUK",
    date: "2025",
    image: "assets/certificates/images/30-cse-ai-bootcamp-2session.jpg",
    file: "assets/certificates/images/30-cse-ai-bootcamp-2session.jpg"
  },
  {
    title: "AI & Machine Learning Session",
    org: "BinX Tech",
    date: "2026",
    image: "assets/certificates/images/31-binx-ai-ml-session.jpg",
    file: "assets/certificates/images/31-binx-ai-ml-session.jpg"
  },
  {
    title: "Intro to ASP.NET Core Back-End",
    org: "Flasha Academy",
    date: "14 Aug 2026",
    image: "assets/certificates/images/32-flasha-aspnet-core-intro.png",
    file: "assets/certificates/images/32-flasha-aspnet-core-intro.png"
  },
  {
    title: "Intro to Mobile App Development",
    org: "Flasha Academy",
    date: "7 Aug 2026",
    image: "assets/certificates/images/33-flasha-mobile-app-intro.jpg",
    file: "assets/certificates/images/33-flasha-mobile-app-intro.jpg"
  },
];

/* ======================================================
   Certificates Carousel
====================================================== */
(function initCertCarousel() {
  const viewport = document.getElementById("certViewport");
  const prevBtn = document.getElementById("certPrev");
  const nextBtn = document.getElementById("certNext");
  const counter = document.getElementById("certCounter");

  if (!viewport) return;

  viewport.innerHTML = certificatesData.map((cert) => `
    <div class="cert-card">
      <div class="cert-frame">
        <img src="${cert.image}" alt="${cert.title}" loading="lazy">
      </div>
      <div class="cert-info">
        <h3>${cert.title}</h3>
        <p class="cert-org">${cert.org}</p>
        <p class="cert-date"><i class="fa-solid fa-calendar"></i> ${cert.date}</p>
        <a href="${cert.file}" target="_blank" rel="noopener" class="certificate-btn">
          <i class="fa-solid fa-eye"></i> View Certificate
        </a>
      </div>
    </div>
  `).join("");

  const cards = Array.from(viewport.children);

  function updateCounter() {
    const cardWidth = cards[0].getBoundingClientRect().width + 30; // + gap
    const index = Math.round(viewport.scrollLeft / cardWidth);
    const clamped = Math.min(Math.max(index, 0), cards.length - 1);
    counter.textContent = `${clamped + 1} / ${cards.length}`;
  }

  function scrollByCard(direction) {
    const cardWidth = cards[0].getBoundingClientRect().width + 30; // + gap
    viewport.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));
  viewport.addEventListener("scroll", () => {
    window.clearTimeout(viewport._scrollTimeout);
    viewport._scrollTimeout = window.setTimeout(updateCounter, 80);
  });
  window.addEventListener("resize", updateCounter);

  updateCounter();
})();

/* ======================================================
   Contact Form — sends a real email via FormSubmit
   (no backend required). First submission needs a
   one-time confirmation click in the inbox.
====================================================== */
(function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";
    note.textContent = "";
    note.className = "form-note";

    try {
      const formData = new FormData(form);
      const action = form.getAttribute("action").replace(
        "https://formsubmit.co/",
        "https://formsubmit.co/ajax/"
      );

      const response = await fetch(action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      if (response.ok) {
        note.textContent = "Message sent successfully! I'll get back to you soon.";
        note.classList.add("form-note-success");
        form.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      note.textContent =
        "Something went wrong sending the message. Please try again or email me directly.";
      note.classList.add("form-note-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
})();
