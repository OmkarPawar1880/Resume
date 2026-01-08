# Create Resume

A full-stack Resume Builder application that allows users to create, edit, validate, and generate professional resumes section-by-section.

```bash

## 📁 Project Structure

Resume/
├── backend/
│ ├── app/
│ │ ├── api/
│ │ │ └── resume.py
│ │ ├── schemas/
│ │ │ └── resume_schema.py
│ │ └── main.py
│ ├── requirements.txt
│ └── .env.example
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── package.json
│ └── vite.config.js
│
├── .gitignore
└── README.md
```


---

## 🚀 Features

- Section-wise resume editing
- Client-side validation (React)
- Backend validation (FastAPI + Pydantic)
- Partial resume saving (per section)
- Unified resume JSON contract
- ATS-friendly data structure
- Ready for AI & PDF generation pipeline

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Context API
- Fetch API

### Backend
- FastAPI
- Pydantic
- Uvicorn

---

## 📄 Resume Data Contract

```json
{
  "personal": {},
  "education": [],
  "experience": [],
  "projects": [],
  "skills": [],
  "certifications": []
}
```
🔧 Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Backend runs at:
```
```bash
http://localhost:8000
```
🌐 Frontend Setup
```bash

cd frontend
npm install
npm run dev
```
Frontend runs at:
```bash
http://localhost:5173
```
🔌 API Endpoints
Save Full Resume

POST /resume
Save Partial Resume (Section-wise)

POST /resume/partial
Example payload:

```bash
{
  "personal": {
    "fullName": "John Doe"
  }
}
```

🔐 Notes
Frontend validation = UX

Backend validation = Security & Trust

Partial save prevents schema violations

No raw LaTeX or unsafe input allowed

📌 Future Enhancements
AI-powered resume optimization

LaTeX → PDF generation

Resume versioning

ATS score analysis

Authentication & user accounts
