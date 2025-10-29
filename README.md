# prakriti-analysis
# 🌿 Ayurvedic Dosha Quiz & Daily Notification App

## 🧘‍♀️ Overview
This project is a **web-based Ayurvedic Prakriti (Dosha) Quiz App** that helps users discover their dominant **Dosha type** — *Vata, Pitta, or Kapha*.  
After completing the quiz, the app provides **personalized Ayurvedic lifestyle and diet recommendations**, and sets **daily reminder notifications** according to the user’s Dosha type (like "Drink warm water" or "Eat cooling foods").  

It is a **fully front-end app** (HTML, CSS, JavaScript) and works using local files — no backend or database required.

---

## 🚀 Features
- ✅ Interactive multi-question Dosha quiz  
- ✅ Personalized results (Vata, Pitta, or Kapha)  
- ✅ Recommendations fetched dynamically from CSV  
- ✅ Daily Ayurveda routine notifications  
- ✅ Test notification system for quick verification  
- ✅ Works offline after loading once  
- ✅ 100% HTML, CSS, and JavaScript-based (no installation required)

---

## 🧩 Project File Structure
Ayurveda-Dosha-Quiz/
│
├── index.html
├── quiz.html
├── style.css
├── script.js
├── papaparse.min.js
├── questions.csv
├── dosha_recommendations.csv
├── notifications.csv
└── green3.png

---

## 📂 File Explanations

### `index.html`
This is the **home page** of the app with an intro section and a button that starts the quiz (`quiz.html`).

### `quiz.html`
Contains the full quiz interface, question area, next/previous buttons, and result display area.

### `style.css`
Manages the app design — background, button styles, fonts, color themes, animations, and layout.

### `script.js`
Contains the quiz logic:
- Loads quiz questions from `questions.csv`  
- Stores user’s answers  
- Calculates the dominant dosha  
- Displays recommendations  
- Loads `dosha_recommendations.csv` for dosha tips  
- Loads `notifications.csv` for scheduling daily notifications  

### `papaparse.min.js`
External library used to read data from CSV files in the browser.

### `questions.csv`
Holds all the quiz questions and options with their dosha value mapping.

### `dosha_recommendations.csv`
Contains the dosha name and related Ayurvedic tips or lifestyle suggestions.

### `notifications.csv`
Contains pre-defined daily routine reminders for each dosha type that will be shown as browser notifications.

---

## ⚙️ Step-by-Step Setup Guide

### 🪄 Step 1: Clone or Download the Project
If you have Git installed:
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
If not, download the ZIP from GitHub and extract it on your computer.

🌐 Step 2: Open in Your Editor

Open the extracted project folder in VS Code or any preferred editor.

🔍 Step 3: Ensure All Required Files Exist

Before running, confirm these files are in the folder:
index.html
quiz.html
style.css
script.js
papaparse.min.js
questions.csv
dosha_recommendations.csv
notifications.csv
green3.png
🚀 Step 4: Run Using Live Server

Since notifications and local CSV access require a local server, open the app using VS Code Live Server.

Install the Live Server extension in VS Code.

Right-click on quiz.html → Click “Open with Live Server”.

It will open your app at something like:
http://127.0.0.1:5500/quiz.html
 Step 5: Taking the Quiz


Start the quiz and answer all questions.


Click “Next” until the end — your Dosha result will appear.


Recommendations will automatically display below your Dosha.


A “Set Daily Ayurveda Reminder” button will appear (depends on script setup).


When clicked, it will ask for notification permission if not already granted.


A test notification will appear first.


Then, your daily reminders will be set based on your Dosha type.





🧾 Step 6: Example Notifications
Example notifications according to Dosha type:
For Pitta


Morning (8:00 AM): “🌞 Drink coconut water and stay calm.”


Afternoon (1:00 PM): “🥗 Eat cooling foods like cucumber and mint.”


Evening (8:00 PM): “🌙 Practice meditation before bed.”


For Vata


Morning: “🌅 Drink warm water and stretch lightly.”


Afternoon: “🍲 Eat grounding foods like rice and ghee.”


Night: “💤 Avoid late-night meals; sleep early.”


For Kapha


Morning: “🏃‍♀️ Go for a brisk walk.”


Afternoon: “🥦 Eat light meals with spices.”


Night: “🕯️ Avoid heavy dinners.”



🧠 Example Quiz Flow


You start the quiz.


Each option you choose adds points to a dosha (Vata, Pitta, or Kapha).


At the end:


The dosha with the highest score is your dominant one.


The app displays tips from dosha_recommendations.csv.


Notifications for your dosha type are automatically set using notifications.csv.





📊 CSV File Formats
📁 questions.csv
Used for quiz questions and answers.
QuestionOption AValue AOption BValue BOption CValue COption DValue DWhat describes your skin type best?Dry and roughVataWarm and oilyPittaSmooth and moistKapha

📁 dosha_recommendations.csv
Used to show final result recommendations.
DoshaRecommendation TypeTipPittaBalanceEat cooling foods like cucumber, mint, coconut, and milk.VataBalanceEat warm soups, drink hot water, and maintain routine sleep.KaphaBalanceStay active, eat light foods, and avoid sugar.

📁 notifications.csv
Used to set reminders automatically for each dosha.
DoshaTimeMessagePitta08:00🌞 Morning: Drink coconut water and stay calm.Pitta13:00🥗 Afternoon: Eat cooling foods like cucumber.Vata08:00🌅 Morning: Drink warm water.Kapha07:00🏃‍♀️ Morning: Go for a brisk walk.

🧠 Technologies Used


HTML5 → Structure and Layout


CSS3 → Design, Styling, and Animation


JavaScript (Vanilla) → Core logic, quiz, and notifications


PapaParse.js → Reads CSV data dynamically


Browser Notifications API → Triggers timed reminders



🧘 Purpose & Use Case
This project demonstrates how Ayurveda principles can be integrated with modern web technology.
It can be used for:


Wellness & self-assessment tools


Health awareness campaigns


College projects on web development


Educational demonstrations of notifications and CSV handling



🔮 Educational Concepts Covered


Dynamic content generation from CSV


Managing quiz logic and user answers


Calculating scores and displaying results dynamically


Using Notification API in JavaScript


Scheduling delayed notifications with setTimeout()


Frontend-only Ayurvedic project example



🧩 Future Enhancements


Add user profile with saved dosha type


Let users customize reminder times


Add sound or vibration to notifications


Convert into Progressive Web App (PWA)


Store results in localStorage or IndexedDB



🧑‍💻 Author
Developed by: [Your Name]
GitHub: https://github.com/<your-username>
Project Type: Front-End Interactive Web Application

📜 License
This project is open-source and free to use for learning, educational, or personal purposes.

✨ “Balance your Dosha — balance your mind, body, and soul.” 🌿

---

Would you like me to fill in your **GitHub username and repo link** automatically so that the clone command and credits section are personalized?
