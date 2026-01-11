# 📄 Resume Builder – FastAPI + React + LaTeX

A full-stack **Resume Builder application** that allows users to create resumes using structured JSON data and generate **ATS-friendly, one-page PDF resumes** using **LaTeX**.

---

## 🚀 Features

- 🧾 Form-based resume creation (React)
- 🔄 Partial resume saving (section-wise)
- 📄 JSON → LaTeX conversion
- 🖨️ LaTeX → PDF compilation using `pdflatex`
- 🔗 Clickable icons for:
  - Phone
  - Email
  - LinkedIn
  - GitHub
  - Portfolio
- 📎 External link icons for:
  - Experience certificates
  - Project links
- 📐 One-page resume layout (no overlap)
- 📥 Download generated PDF
- 🌐 Swagger UI for API testing

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Context API
- Fetch API

### Backend
- FastAPI
- Python 3.10+
- Uvicorn

### PDF Engine
- LaTeX
- MiKTeX (Windows) / TeX Live (Linux/macOS)

---

## 📁 Project Structure
```bash
backend/
│
├── app/
│ ├── api/
│ │ └── resume.py
│ ├── Services/
│ │ ├── latex_generator.py
│ │ └── pdf_compiler.py
│ ├── templates/
│ │ └── resume_template.tex
│ ├── uploads/
│ │ └── resumes/
│ └── main.py
│
frontend/
│
├── src/
│ ├── Components/
│ ├── services/
│ │ └── resumeApi.js
│ ├── context/
│ └── App.jsx
```


---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Create virtual environment
```bash
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```
2️⃣ Install dependencies
```bash
pip install fastapi uvicorn python-multipart
```
3️⃣ Install LaTeX (Required)
```bash
Windows
Install MiKTeX
```

Enable pdflatex in PATH
```bash
pdflatex --version
```
Linux
```bash
sudo apt install texlive-full
```
macOS
```bash
brew install mactex
```
4️⃣ Run backend
```bash

uvicorn app.main:app --reload
```
Backend runs at:

```bash
http://localhost:8000
```
Swagger UI:

```bash

http://localhost:8000/docs
```
🎨 Frontend Setup (React)
bash
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
```bash
http://localhost:5173
```
🔁 API Endpoints
➤ Generate Resume PDF
```bash

POST /api/resume/generate
```
Returns:

json
```bash
{
  "success": true,
  "downloadUrl": "/uploads/resumes/resume_123456789.pdf"
}
```
➤ Partial Resume Save
http
```bash
POST /api/resume/partial
```
🧪 Sample JSON (Swagger / Testing)
```bash
json
{
  "personal": {
    "name": "Omkar Pawar",
    "location": "Karad, Maharashtra",
    "phone": "+919172952310",
    "email": "omkarpawar1880@gmail.com",
    "linkedin": "https://www.linkedin.com/in/omkar-pawar-b4a501287",
    "github": "https://github.com/OmkarPawar1880",
    "portfolio": "https://omkarpawarportfolio.netlify.app"
  },
  "education": [
    {
      "institution": "Bharati Vidyapeeth University",
      "degree": "BCA - Bachelor in Computer Application",
      "grade": "CGPA - 8.5",
      "years": "2022 - 2025",
      "location": "Karad, Maharashtra"
    }
  ],
  "experience": [
    {
      "company": "CodeClause",
      "duration": "Dec 2024 - Jan 2025",
      "role": "Web Developer Intern",
      "mode": "Remote",
      "location": "Pune",
      "certificate": "https://certificate-link.com",
      "points": [
        "Built responsive websites",
        "Collaborated with senior developers"
      ]
    }
  ],
  "projects": [
    {
      "title": "Cafe-Shop Management System",
      "tech": "JavaScript, PHP, MySQL",
      "date": "March 2025",
      "link": "https://github.com/project",
      "points": [
        "Developed order management system",
        "Optimized database performance"
      ]
    }
  ],
  "skills": {
    "Languages": ["Java", "JavaScript", "SQL"],
    "Frameworks": ["React", "Bootstrap"]
  },
  "certifications": [
    "Full Stack Development - Simplilearn"
  ]
}
```
🛠️ Common Issues & Fixes
❌ pdflatex not recognized
✔ Ensure LaTeX is installed
✔ Restart terminal
✔ Verify PATH

❌ Undefined control sequence \href
✔ Do NOT escape URLs in Python
✔ Escape only text fields

❌ Icons not visible
✔ Ensure this is in template:

latex
\usepackage{fontawesome5}
✅ Best Practices Used
Safe LaTeX escaping

No overlapping content

One-page resume guarantee

ATS-friendly PDF

Clean separation of logic

📌 Future Improvements
Multiple resume templates

Live PDF preview

User authentication

Cloud storage (S3)

Dark mode UI

👤 Author
Omkar Pawar
📧 omkarpawar1880@gmail.com
🔗 GitHub

⭐ If you like this project
Give it a ⭐ on GitHub and feel free to contribute!



---

If you want next:
- `.env` setup
- production deployment guide
- Docker support
- CI/CD pipeline

Just say the word 👍
