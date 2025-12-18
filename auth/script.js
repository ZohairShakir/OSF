document.addEventListener("DOMContentLoaded", () => {

  /* ========== PASSWORD TOGGLE ========== */
  document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const input = toggle.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  /* ========== CAPTCHA (LOGIN ONLY) ========== */
  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);
  let answer = a + b;

  const captchaQ = document.getElementById("captchaQuestion");
  if (captchaQ) captchaQ.textContent = `What is ${a} + ${b}?`;

  /* ========== SIGNUP ========== */
  /* ========== SIGNUP ========== */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async e => {
    e.preventDefault();

    const data = {
      name: signupForm.username.value.trim(),
      email: signupForm.email.value.trim(),
      mobile: signupForm.mobile.value.trim(),
      password: signupForm.password.value
    };

    if (!Object.values(data).every(v => v)) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Signup failed");
        return;
      }

      alert("Signup successful");
      window.location.href = "login.html";

    } catch (err) {
      alert("Server error. Try again later.");
      console.error(err);
    }
  });
}


/* ========== LOGIN ========== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    // CAPTCHA check
    const captchaInput = document.getElementById("captchaAnswer").value;
    if (parseInt(captchaInput) !== answer) {
      alert("CAPTCHA incorrect");
      return;
    }

    const payload = {
      email: loginForm.email.value.trim(),
      password: loginForm.password.value
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // ✅ REAL AUTH STORAGE
      localStorage.setItem("osf_token", data.token);
      localStorage.setItem("osf_user", JSON.stringify(data.user));

      alert("Login successful");
      window.location.href = "../dashboard/dashboard.html";

    } catch (err) {
      alert("Server error. Try again later.");
      console.error(err);
    }
  });
}
});

