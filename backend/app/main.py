from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from pathlib import Path

from app.api.resume import router as resume_router
from app.utils.error_handler import validation_exception_handler

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
# GLOBAL VALIDATION ERROR HANDLER
# ---------------------------
app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

# ---------------------------
# Register Resume APIs (ONLY ONCE)
# ---------------------------
app.include_router(
    resume_router,
    prefix="/api/resume",
    tags=["Resume"]
)
