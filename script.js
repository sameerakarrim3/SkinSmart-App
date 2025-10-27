// =====================
// AUTHENTICATION SYSTEM
// =====================

// Redirect to login if not logged in
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser && !window.location.href.includes("login.html")) {
  window.location.href = "login.html";
}

// LOGIN FUNCTION
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMsg");

  if (!username || !password) {
    msg.textContent = "Please enter username and password!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[username] && users[username] === password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html";
  } else {
    msg.textContent = "Invalid username or password!";
  }
}

// SIGN-UP FUNCTION
function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const msg = document.getElementById("signupMsg");

  if (!username || !password) {
    msg.textContent = "Please enter both username and password!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[username]) {
    msg.textContent = "Username already exists!";
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  msg.textContent = "Sign-up successful! You can now log in.";

  document.getElementById("signupUsername").value = "";
  document.getElementById("signupPassword").value = "";
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// =====================
// JOURNAL SYSTEM
// =====================
function saveEntry() {
  const entry = document.getElementById("journalEntry").value.trim();
  const msg = document.getElementById("msg");
  if (!entry) {
    msg.textContent = "Cannot save empty entry!";
    return;
  }

  const past = JSON.parse(localStorage.getItem("journalEntries") || "[]");
  past.push({ date: new Date().toLocaleString(), text: entry });
  localStorage.setItem("journalEntries", JSON.stringify(past));

  msg.textContent = "Entry saved!";
  document.getElementById("journalEntry").value = "";
  displayEntries();
}

function displayEntries() {
  const container = document.getElementById("pastEntries");
  if (!container) return;

  const past = JSON.parse(localStorage.getItem("journalEntries") || "[]");
  container.innerHTML = past
    .map(e => `<div class="entry"><strong>${e.date}:</strong> ${e.text}</div>`)
    .join("");
}

// =====================
// CYCLE ADVICE SYSTEM
// =====================
function showAdvice() {
  const phase = document.getElementById("phase")?.value;
  const advice = document.getElementById("advice");
  if (!advice) return;

  const tips = {
    follicular: "🌸 Follicular Phase: Your skin is resilient! Great time for exfoliation and active ingredients.",
    ovulation: "💖 Ovulation Phase: Skin often looks radiant. Focus on hydration and light makeup.",
    luteal: "🔥 Luteal Phase: Skin may be oily or break out. Use gentle cleansers and calming serums.",
    menstrual: "🌙 Menstrual Phase: Skin can be sensitive. Avoid harsh treatments and prioritize moisturization."
  };

  advice.textContent = tips[phase] || "";
}

// =====================
// RITUAL CHECKBOX PERSISTENCE
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Ritual checkboxes
  const steps = document.querySelectorAll(".step");
  steps.forEach(step => {
    const stepKey = `ritual-step-${step.dataset.step}`;
    step.checked = localStorage.getItem(stepKey) === "true";

    step.addEventListener("change", () => {
      localStorage.setItem(stepKey, step.checked);
    });
  });

  // Load journal entries
  displayEntries();
});
