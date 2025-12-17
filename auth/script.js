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
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();

      const data = {
        username: signupForm.username.value.trim(),
        email: signupForm.email.value.trim(),
        mobile: signupForm.mobile.value.trim(),
        password: signupForm.password.value
      };

      if (!Object.values(data).every(v => v)) {
        alert("Please fill all fields");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(u => u.email === data.email)) {
        alert("User already exists");
        return;
      }

      users.push(data);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful");
      window.location.href = "login.html";
    });
  }

  /* ========== LOGIN ========== */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const captchaInput = document.getElementById("captchaAnswer").value;
      if (parseInt(captchaInput) !== answer) {
        alert("CAPTCHA incorrect");
        return;
      }

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("currentUser", user.email);
      localStorage.setItem("currentUserName", user.username);

      alert("Login successful");
      window.location.href = "../index.html";
    });
  }

});
