// Demo credentials for this practice app only. They are fake and protect nothing.
const DEMO_USER = { username: "demo", password: "demo-password" };

const loginSection = document.getElementById("login-section");
const welcomeSection = document.getElementById("welcome-section");
const welcomeHeading = document.getElementById("welcome-heading");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const logoutButton = document.getElementById("logout-button");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    loginMessage.textContent = "Username and password are required.";
    return;
  }

  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    loginMessage.textContent = "Invalid username or password.";
    return;
  }

  loginMessage.textContent = "";
  welcomeHeading.textContent = "Welcome, " + username + "!";
  loginSection.hidden = true;
  welcomeSection.hidden = false;
});

logoutButton.addEventListener("click", function () {
  loginForm.reset();
  loginMessage.textContent = "";
  welcomeSection.hidden = true;
  loginSection.hidden = false;
});
