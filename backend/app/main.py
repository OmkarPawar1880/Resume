from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from app.api.resume import router as resume_router

# ---------------------------
# Ensure uploads directory exists
# ---------------------------
UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="CreateResume API")

# ---------------------------
# CORS (React frontend)
# ---------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Serve generated PDFs
# ---------------------------
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ---------------------------
# Register Resume APIs
# ---------------------------
app.include_router(resume_router, prefix="/api/resume")
