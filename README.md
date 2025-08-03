**NOTE: This project is part of my personal submissions under a special Google program and will also be deployed across multiple college campuses. At the end of **GSSoC’25**, I’ll submit the project (including contributor credits) to Google’s program. **Top contributors will be highlighted in the credits**, so if you want your work to stand out in front of Google — you’re at the right place!**

**Join our telegram for proper communication - https://t.me/+Aq8v-Ig2SqFjZjRl**


# 🛡️ CrisisBoard

![Status](https://img.shields.io/badge/status-active-success.svg)  
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react&logoColor=white) 
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)  
![Firestore](https://img.shields.io/badge/Database-Firestore-orange?logo=firebase&logoColor=white)  
![Gemini API](https://img.shields.io/badge/AI-Gemini_API-yellow?logo=google&logoColor=black)  
![Vercel](https://img.shields.io/badge/Hosting-Vercel-black?logo=vercel&logoColor=white)  
![GSSoC](https://img.shields.io/badge/Open%20Source-GSSoC'25-brightgreen?logo=github&logoColor=white)

CrisisBoard is a simple and powerful web app that helps college students submit complaints or issues to their college authorities — **anonymously or with their identity**. It makes sure that every complaint is sent to the right department and is also stored safely.
---

## 🔍 What This App Does

- Students log in using their **college email only**.
- They can submit any issue (like hygiene, food, bullying, etc.).
- If they want, they can **stay anonymous**.
- The issue is **automatically categorized** using **AI (Gemini API)**.
- The complaint is then **emailed to the correct authority**.
- Students can see all their past complaints in a simple list.
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
-Vercel (for serverless backend & deployment)
-Firestore (for storing complaints)
- Google Gemini API (for auto-categorizing issues)
- SendGrid or Nodemailer or EmailJs (to send complaint emails)

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


1. **Clone the repository**
```bash
git clone https://github.com/your-username/crisisboard.git
cd crisisboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a .env file with the following keys**
```bash
VITE_FIRESTORE_PROJECT_ID=your_project_id
VITE_FIRESTORE_API_KEY=your_firestore_api_key
VITE_GEMINI_API_KEY=your_gemini_key
VITE_EMAIL_SERVICE_KEY=your_email_service_key
```

4. **Start development server**
```bash
npm run dev
```

---

## 🤝 Contribution Guidelines
We welcome contributors from **GSSoC’25** to make this project more Awesome!  

---

### 📌 Steps to Contribute

1. **Fork** the repository  

2. **Create a new branch** (do not commit directly to `main`)  
```bash
git checkout -b feature/your-feature-name
````

3. **Make your changes**

4. **Commit with clear messages**

```bash
git commit -m "Added: [Feature name/bug fix]"
```

5. **Push your branch**

```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request (PR)** to the `main` branch

---

## *Tip:* Check existing issues or open a new one before starting work.

REMEMBER TO CREATE A SEPERATE BRANCH AND THEN WORK ON IT, DON'T COMMIT AND RAISE PR TO THE DEFAULT BRANCH
