/* =====================================================
   DASHBOARD LOGIC — BACKEND CONNECTED
   ===================================================== */

const BASE_URL =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1")
    ? "http://127.0.0.1:4000/api"
    : "https://YOUR-RENDER-BACKEND.onrender.com/api";

/* ---------- AUTH HELPERS ---------- */

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("osf_token")}`
  };
}

function logout() {
  localStorage.removeItem("osf_token");
  localStorage.removeItem("osf_user");
  localStorage.removeItem("osf_onboarded");
  window.location.href = "../auth/login.html";
}

function isLoggedIn() {
  return !!localStorage.getItem("osf_token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("osf_user"));
  } catch {
    return null;
  }
}

/* ---------- PROTECT DASHBOARD ---------- */

if (!isLoggedIn()) logout();

/* ---------- USER NAME ---------- */

const user = getUser();
const userNameEl = document.getElementById("userName");

if (user?.name) {
  userNameEl.textContent = user.name;
}

/* ---------- FETCH DASHBOARD DATA ---------- */

async function loadDashboard() {
  try {
    const res = await fetch(`${BASE_URL}/project/my`, {
      headers: authHeaders()
    });

    if (res.status === 401) return logout();

    const projects = await res.json();

    updateStats(projects);
    renderProjects(projects);
  } catch (err) {
    console.error("Dashboard load error:", err);
  }
}

/* ---------- STATUS COUNTERS ---------- */

function updateStats(projects) {
  document.getElementById("activeProjects").textContent =
    projects.filter(p => p.status !== "completed").length;

  document.getElementById("pendingActions").textContent =
    projects.filter(p => p.status === "pending").length;

  document.getElementById("unreadMessages").textContent = 0;
}

/* ---------- PROJECT RENDER ---------- */

const projectsGrid = document.getElementById("projectsGrid");
const emptyState = document.getElementById("noProjects");

function renderProjects(projects) {
  projectsGrid.innerHTML = "";

  if (!projects.length) {
    emptyState.style.display = "block";
    projectsGrid.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  projectsGrid.style.display = "grid";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p class="muted">${project.description || "No description"}</p>
      <div class="project-meta">
        <span class="status ${project.status || "pending"}">
          ${formatStatus(project.status)}
        </span>
        <span class="deadline">
          ${project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}

function formatStatus(status = "pending") {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In Progress";
  return "Pending";
}

/* ---------- CTA ACTIONS ---------- */

document.getElementById("postProjectBtn")
  ?.addEventListener("click", () => {
    window.location.href = "../request-project.html";
  });

/* ---------- FIRST-TIME ONBOARDING ---------- */

const onboardingBox = document.getElementById("onboardingBox");

if (localStorage.getItem("osf_onboarded") === "true") {
  onboardingBox.style.display = "none";
} else {
  onboardingBox.style.display = "block";
}

onboardingBox
  ?.querySelectorAll("button")
  .forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem("osf_onboarded", "true");
      onboardingBox.style.display = "none";
    });
  });

/* ---------- LOGOUT ---------- */

document.addEventListener("click", e => {
  if (e.target.matches(".logout-btn")) logout();
});

/* ---------- INIT ---------- */

loadDashboard();
