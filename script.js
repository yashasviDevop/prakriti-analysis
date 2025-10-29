let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let recommendations = [];
let notificationData = [];

// Load questions
Papa.parse("questions.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  transformHeader: h => h.trim().replace(/\s+/g, " "),
  complete: function (results) {
    questions = results.data.filter(q => q.Question && q["Option A"]);
    if (questions.length > 0) displayQuestion();
    else document.getElementById("question").innerText = "No valid questions found.";
  }
});

// Load dosha recommendations
Papa.parse("dosha_recommendations.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  delimiter: ";",
  complete: function (results) {
    recommendations = results.data;
  }
});

// Load notification data (new CSV)
Papa.parse("notifications.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  delimiter: ";",
  complete: function (results) {
    notificationData = results.data;
  }
});

function displayQuestion() {
  const questionObj = questions[currentQuestionIndex];
  const questionText = document.getElementById("question");
  const optionsDiv = document.getElementById("options");

  questionText.innerText = `Q${currentQuestionIndex + 1}. ${questionObj.Question}`;
  optionsDiv.innerHTML = "";

  ["A", "B", "C", "D"].forEach(opt => {
    const optText = questionObj[`Option ${opt}`];
    const optValue = questionObj[`Value ${opt}`];

    if (optText && optValue) {
      const label = document.createElement("label");
      label.classList.add("option-label");
      label.innerHTML = `
        <input type="radio" name="option" value="${optValue}" />
        ${optText}
      `;
      optionsDiv.appendChild(label);
    }
  });

  const saved = userAnswers[currentQuestionIndex];
  if (saved) {
    document.querySelectorAll('input[name="option"]').forEach(input => {
      if (input.value === saved) input.checked = true;
    });
  }

  document.getElementById("prev").disabled = currentQuestionIndex === 0;
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  userAnswers[currentQuestionIndex] = selected ? selected.value : null;
}

document.getElementById("next").addEventListener("click", () => {
  saveAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    showResult();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
});

function showResult() {
  const score = { Vata: 0, Pitta: 0, Kapha: 0 };
  userAnswers.forEach(ans => {
    if (ans && score.hasOwnProperty(ans)) score[ans]++;
  });

  let dominant = "Vata";
  if (score.Pitta > score[dominant]) dominant = "Pitta";
  if (score.Kapha > score[dominant]) dominant = "Kapha";

  const tips = recommendations
    .filter(r => r.Dosha && r.Dosha.trim().toLowerCase() === dominant.toLowerCase())
    .map(r => `<li>${r.Tip}</li>`);

  const resultHTML = `
    <div class="quiz-container" style="margin-top: 40px;">
      <h2>🌿 Your Dominant Dosha is: ${dominant}</h2>
      <h3>Recommendations:</h3>
      <ul>${tips.join("") || "<li>No recommendations found.</li>"}</ul>
      <button id="setNotify">🔔 Set Daily Ayurveda Reminders</button>
    </div>
  `;
  document.body.innerHTML = resultHTML;

  document.getElementById("setNotify").addEventListener("click", () => setReminders(dominant));
}

// === Notification Logic ===


// === Notification Logic (Improved + On-screen popup) ===
// === Notification Logic (Improved + Stop Button) ===

let activeReminders = []; // Store active reminder intervals/timeouts

function showNotification(msg) {
  // ✅ Visible popup
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = "#4CAF50";
  popup.style.color = "#fff";
  popup.style.padding = "15px 20px";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.innerText = msg;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 5000);

  // ✅ Try system notification
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification("🌿 Ayurveda Reminder", {
      body: msg,
      icon: "https://cdn-icons-png.flaticon.com/512/1048/1048934.png"
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("🌿 Ayurveda Reminder", { body: msg });
      }
    });
  }
}

function stopReminders() {
  activeReminders.forEach(clearTimeout);
  activeReminders.forEach(clearInterval);
  activeReminders = [];
  showNotification("🛑 All Ayurveda reminders stopped.");
}

function setReminders(dosha) {
  stopReminders(); // Clear previous ones
  const list = notificationData.filter(n => n.Dosha.trim().toLowerCase() === dosha.toLowerCase());

  if (list.length === 0) {
    alert("No reminders found for your dosha.");
    return;
  }

  alert("✅ Reminders set successfully! A test notification will appear now.");
  showNotification("✅ Test Notification: Reminders are now active!");

  // Create Stop Button dynamically
  if (!document.getElementById("stopBtn")) {
    const stopBtn = document.createElement("button");
    stopBtn.id = "stopBtn";
    stopBtn.textContent = "🛑 Stop Daily Ayurveda Reminders";
    stopBtn.style.marginTop = "15px";
    stopBtn.style.padding = "10px 15px";
    stopBtn.style.border = "none";
    stopBtn.style.borderRadius = "8px";
    stopBtn.style.background = "#e53935";
    stopBtn.style.color = "#fff";
    stopBtn.style.cursor = "pointer";
    stopBtn.onclick = stopReminders;
    document.body.appendChild(stopBtn);
  }

  // Show test preview notification instantly
  setTimeout(() => showNotification("🔔 Preview: Your Ayurveda schedule is active."), 2000);

  // Schedule reminders
  list.forEach(entry => {
    const [h, m] = entry.Time.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target < now) target.setDate(target.getDate() + 1);
    const delay = target - now;

    const timeoutId = setTimeout(() => {
      showNotification(entry.Message);
      const intervalId = setInterval(() => showNotification(entry.Message), 24 * 60 * 60 * 1000);
      activeReminders.push(intervalId);
    }, delay);

    activeReminders.push(timeoutId);
  });
}
