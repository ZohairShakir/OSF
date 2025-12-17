/* ========= GLOBAL SITE SCRIPT ========= */
document.addEventListener("DOMContentLoaded", () => {

  // ===== FORCE CLIENT THEME =====
document.documentElement.classList.remove(
  "theme-light",
  "theme-corporate"
);
document.body.classList.add("theme-client");


  /* ================= HEADER & FOOTER ================= */

const headerHTML = `
<div class="container">
  <div class="inner header-inner premium-header">

    <!-- Brand -->
    <div class="brand premium-brand">
      <div class="logo premium-logo">O</div>
      <div class="brand-text">
        <span class="brand-title">Our Startup Freelancer</span>
        <span class="brand-tagline">Build • Launch • Grow</span>
      </div>
    </div>

    <!-- Mobile toggle -->
    <button class="menu-toggle premium-toggle" id="menuToggle">☰</button>

    <!-- Navigation -->
    <nav class="nav premium-nav" id="mobileNav">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="portfolio.html">Portfolio</a>
      <a href="contact.html">Contact</a>
      <a href="hire-us.html">Hire Us</a>

      <a href="request-project.html" class="header-cta">
        Book Free Call
      </a>

      <a href="auth/login.html" class="nav-auth">Login</a>
      <a href="#" class="logout-btn nav-logout" style="display:none">Logout</a>
      <span class="nav-username"></span>
    </nav>

  </div>
</div>`;


  const footerHTML = `
  <div class="container">
    <div class="grid">
      <div>
        <div style="display:flex;gap:10px;align-items:center">
          <div class="logo" style="width:36px;height:36px;border-radius:8px;background:var(--blue);display:flex;align-items:center;justify-content:center;color:#fff">O</div>
          <strong>OSF</strong>
        </div>
        <p style="color:var(--muted)">Building the future of freelancing</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul style="list-style:none;padding:0">
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul style="list-style:none;padding:0">
          <li>Website Dev</li>
          <li>UI/UX</li>
          <li>Branding</li>
          <li>Video Editing</li>
        </ul>
      </div>
      <div>
  <h4>Contact</h4>
  <ul class="footer-contact">
    <li>
      📍 Navlakha, Indore
    </li>

    <li>
      ✉️ 
      <a href="mailto:info@ourstartupfreelancer.com">
        info@ourstartupfreelancer.com
      </a>
    </li>

    <li>
      💬
      <a
        href="https://wa.me/917067548217"
        target="_blank"
      >
        Chat on WhatsApp
      </a>
    </li>
  </ul>
</div>

    <div style="text-align:center;margin-top:14px;color:var(--muted)">
      © 2025 Our Startup Freelancer. All rights reserved.
    </div>
  </div>`;

  const headerEl = document.getElementById("site-header");
  if (headerEl) headerEl.innerHTML = `<header class="header">${headerHTML}</header>`;

  const footerEl = document.getElementById("site-footer");
  if (footerEl) footerEl.innerHTML = `<footer class="footer">${footerHTML}</footer>`;

  /* ================= TOAST ================= */

  const toast = document.createElement("div");
  toast.id = "osf-toast";
  Object.assign(toast.style, {
    position: "fixed",
    right: "18px",
    bottom: "18px",
    padding: "10px 14px",
    background: "#111",
    color: "#fff",
    borderRadius: "10px",
    opacity: "0",
    transition: "opacity .2s",
    zIndex: "2000"
  });
  document.body.appendChild(toast);

  const showToast = (msg, t = 2200) => {
    toast.textContent = msg;
    toast.style.opacity = "1";
    setTimeout(() => (toast.style.opacity = "0"), t);
  };

  /* ================= MOBILE NAV ================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }

  /* ================= AUTH NAV STATE ================= */

  const updateNav = () => {
    const logged = !!localStorage.getItem("currentUser");
    document.querySelectorAll(".nav-auth").forEach(e => e.style.display = logged ? "none" : "inline-block");
    document.querySelectorAll(".nav-logout").forEach(e => e.style.display = logged ? "inline-block" : "none");
    document.querySelectorAll(".nav-username").forEach(e => e.textContent = localStorage.getItem("currentUserName") || "");
  };
  updateNav();

  document.addEventListener("click", e => {
    if (e.target.matches(".logout-btn")) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserName");
      showToast("Logged out");
      updateNav();
      setTimeout(() => (window.location.href = "index.html"), 700);
    }
  });

  /* ================= SIGNUP ================= */

  const signup = document.getElementById("signupForm");
  if (signup) {
    signup.addEventListener("submit", e => {
      e.preventDefault();
      const { name, email, password } = signup;
      if (!name.value || !email.value || !password.value) {
        showToast("Please complete the form");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(u => u.email === email.value)) {
        showToast("User already exists");
        return;
      }
      users.push({ name: name.value, email: email.value, password: password.value });
      localStorage.setItem("users", JSON.stringify(users));
      showToast("Signup successful");
      setTimeout(() => (window.location.href = "login.html"), 800);
    });
  }

 /* ================= FINAL CAPTCHA FIX ================= */
(function () {
  const form = document.getElementById("loginForm");
  const questionSpan = document.getElementById("captchaQuestion");
  const answerInput = document.getElementById("captchaAnswer");

  if (!form || !questionSpan || !answerInput) return;

  // Generate numbers
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const correctAnswer = a + b;

  // FORCE render question
  questionSpan.innerHTML = `${a} + ${b} = ?`;

  // Validate
  form.addEventListener("submit", function (e) {
    const userAnswer = Number(answerInput.value);

    if (userAnswer !== correctAnswer) {
      e.preventDefault();
      alert("Incorrect CAPTCHA. Please try again.");
      answerInput.focus();
    }
  });
})();


  /* ================= CONTACT FORM ================= */

  const contact = document.getElementById("contactForm");
  if (contact) {
    contact.addEventListener("submit", e => {
      e.preventDefault();
      if (![contact.name, contact.email, contact.message].every(i => i.value.trim())) {
        showToast("Please complete the form");
        return;
      }
      showToast("Message sent successfully ✅");
      contact.reset();
    });
  }

/* ================= PROJECT FORM + WHATSAPP CONFIRMATION (FIXED) ================= */

const project = document.getElementById("projectForm");
if (project) {
  project.addEventListener("submit", e => {
    e.preventDefault();

    const name = project.name?.value.trim();
    const email = project.email?.value.trim();
    const phone = project.phone?.value.trim();
    const slot = project.slot?.value || "Not specified";
    const description = project.description?.value.trim();

    if (!name || !email || !phone || !description) {
      showToast("Please fill all required fields");
      return;
    }

    /* ---------- WhatsApp Message ---------- */
    const message = `
Hello OSF Team 👋

I’ve booked a *Free Consultation Call*.

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Slot: ${slot}

Requirement:
${description}
    `;

    const whatsappURL =
      "https://wa.me/917067548217?text=" +
      encodeURIComponent(message);

    // ✅ MUST be called directly from click
    window.open(whatsappURL, "_blank");

    showToast("Booking submitted successfully!");

    // Redirect AFTER WhatsApp opens
    setTimeout(() => {
      window.location.href = "success.html";
    }, 600);

    project.reset();
  });
}


  /* ================= PORTFOLIO FILTER ================= */

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".port-card").forEach(card => {
        card.style.display = filter === "all" || card.dataset.cat === filter ? "" : "none";
      });
    });
  });

  /* ================= ACTIVE NAV LINK ================= */

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

});
/* ================= SCROLL ANIMATION ================= */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold:0.18 }
);

document.querySelectorAll(
  ".card, .process-card, .stat-box, .port-card, .contact-info, .hire-form-card"
).forEach(el=>{
  el.classList.add("reveal");
  revealObserver.observe(el);
});
