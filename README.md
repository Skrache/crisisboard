# 🛡️ CrisisBoard

CrisisBoard is a simple and powerful web app that helps college students submit complaints or issues to their college authorities — **anonymously or with their identity**. It makes sure that every complaint is sent to the right department and is also stored safely.

---

## 🔍 What This App Does

- Students log in using their **college email only**.
- They can submit any issue (like hygiene, food, bullying, etc.).
- If they want, they can **stay anonymous**.
- The issue is **automatically categorized** using **AI (Gemini API)**.
- The complaint is then **emailed to the correct authority**.
- Students can see all their past complaints in a simple list.
- The interface is clean, mobile-friendly, and supports **dark mode**.
- They can also **delete** their complaints with a smooth animation.

---

## ✨ Main Features

- 🔒 Login with only college email (e.g., `yourname@college.edu`)
- 🆓 Anonymous submission (checkbox toggle)
- 🧠 AI categorization of complaints using Gemini API
- 📬 Automatic email to relevant college department
- 📋 See your own submitted complaints
- 🗑️ Delete button with smooth animation
- ✅ Easy and clean user interface inspired by ChatGPT

---

## 🛠️ Technologies Used

### Frontend:
- React (in-browser development using Google IDX)
- Tailwind CSS (for styling)
- ShadCN UI (for basic components)
- Lucide Icons (for icons)
- Framer Motion (for smooth animations)

### Backend:
- Firebase Authentication (for login)
- Firebase Firestore (for storing complaints)
- Firebase Cloud Functions (for secure backend code)
- Google Gemini API (for auto-categorizing issues)
- SendGrid or Nodemailer (to send complaint emails)

---

## 🧠 How It Works (Simple Explanation)

1. **Login**: Only users with a valid college email can log in.
2. **Form**: Student writes their complaint and checks the "Anonymous" box if they don’t want to reveal their identity.
3. **AI Categorization**: The complaint is sent to a server where Gemini AI reads it and decides what kind of issue it is.
4. **Email Sending**: Based on the category, the complaint is sent to the correct department (like Security or Maintenance).
5. **Storage**: The complaint is saved in a database (Firestore).
6. **Your Dashboard**: You can see your past complaints and even delete them.

---

## 🧪 Example Categories

- Hygiene
- Security
- Food quality
- Harassment or bullying
- Electrical issues
- Cleanliness
- Maintenance

---

## 🧾 How to Run (for Developers)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/crisisboard.git
   cd crisisboard
