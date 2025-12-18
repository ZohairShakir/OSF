/* ========= GLOBAL SITE SCRIPT ========= */
document.addEventListener("DOMContentLoaded", () => {
  // FRONTEND BASE URL
// For local development: http://localhost:4000
// For production: your deployed URL
  const BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:4000/api"
  : "http://127.0.0.1:4000/api";


  // ===== FORCE CLIENT THEME =====
  document.documentElement.classList.remove("theme-light", "theme-corporate");
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

        <a href="request-project.html" class="header-cta">Book Free Call</a>

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
          <li>📍 Navlakha, Indore</li>
          <li>✉️ <a href="mailto:info@ourstartupfreelancer.com">info@ourstartupfreelancer.com</a></li>
          <li>💬 <a href="https://wa.me/917067548217" target="_blank">Chat on WhatsApp</a></li>
        </ul>
      </div>
      <div style="text-align:center;margin-top:14px;color:var(--muted)">
        © 2025 Our Startup Freelancer. All rights reserved.
      </div>
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
      link.addEventListener("click", () => mobileNav.classList.remove("active"));
    });
  }

  /* ================= AUTH NAV STATE ================= */
const updateNav = () => {
  const token = localStorage.getItem("osf_token");
  const user = JSON.parse(localStorage.getItem("osf_user") || "null");
  const logged = !!token;

  document.querySelectorAll(".nav-auth").forEach(el => {
    el.style.display = logged ? "none" : "inline-block";
  });

  document.querySelectorAll(".nav-logout").forEach(el => {
    el.style.display = logged ? "inline-block" : "none";
  });

  document.querySelectorAll(".nav-username").forEach(el => {
    el.textContent = logged && user?.name ? user.name : "";
  });
};

updateNav();


  document.addEventListener("click", e => {
    if (e.target.matches(".logout-btn")) {
      e.preventDefault();
      localStorage.removeItem("osf_token");
      localStorage.removeItem("osf_user");
      showToast("Logged out");
      updateNav();
      setTimeout(() => window.location.href = "index.html", 700);
    }
  });

  /* ================= SIGNUP API ================= */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async e => {
      e.preventDefault();
      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const mobile = signupForm.mobile.value.trim();
      const password = signupForm.password.value;

      if (!name || !email || !mobile || !password) {
        showToast("Please complete the form");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, mobile, password })
        });
        const result = await res.json();
        if (res.ok) {
          showToast(result.message);
          setTimeout(() => window.location.href = "login.html", 800);
        } else {
          showToast(result.message);
        }
      } catch (err) {
        console.error(err);
        showToast("Server error");
      }
    });
  }

  /* ================= LOGIN API + CAPTCHA ================= */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const captchaQ = document.getElementById("captchaQuestion");
    const captchaA = document.getElementById("captchaAnswer");
    if (captchaQ && captchaA) {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      const correct = a + b;
      captchaQ.textContent = `${a} + ${b} = ?`;

      loginForm.addEventListener("submit", async e => {
        e.preventDefault();
        if (Number(captchaA.value) !== correct) {
          showToast("Incorrect CAPTCHA");
          captchaA.focus();
          return;
        }

        const identifier = loginForm.identifier.value.trim();
        const password = loginForm.password.value;

        if (!identifier || !password) {
          showToast("Please enter email & password");
          return;
        }

        try {
          const res = await fetch(`${BASE_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ identifier, password })
});
          const result = await res.json();
          if (res.ok) {
  localStorage.setItem("osf_token", result.token);
  localStorage.setItem(
    "osf_user",
    JSON.stringify(result.user)
  );

  showToast("Login successful");
  setTimeout(() => {
    window.location.href = "../dashboard.html";
  }, 700);
}

        } catch (err) {
          console.error(err);
          showToast("Server error");
        }
      });
    }
  }

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

  /* ================= PROJECT FORM ================= */
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
      const whatsappURL = "https://wa.me/917067548217?text=" + encodeURIComponent(message);
      window.open(whatsappURL, "_blank");
      showToast("Booking submitted successfully!");
      setTimeout(() => window.location.href = "success.html", 600);
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
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);
document.querySelectorAll(
  ".card, .process-card, .stat-box, .port-card, .contact-info, .hire-form-card"
).forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});
