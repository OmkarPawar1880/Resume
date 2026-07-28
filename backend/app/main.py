from pathlib import Path
from contextlib import asynccontextmanager

from app.db.base import Base
from app.db.database import engine
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.user.api.router import router as user_router
from app.core.config import settings
from app.resume.utils.error_handler import validation_exception_handler

# Resume Router
from app.resume.api.resume import router as resume_router


# ==========================================================
# Create Upload Directory
# ==========================================================
UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all database tables
    Base.metadata.create_all(bind=engine)
    yield

# ==========================================================
# Create FastAPI Application
# ==========================================================
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    description="Resume Builder API",
    lifespan=lifespan
)


# ==========================================================
# CORS Configuration
# ==========================================================
origins = [
    "https://createresume1880.vercel.app", #VERCEL
    "http://localhost:5173",  # React (Vite)
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# Static Files
# ==========================================================
app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)


# ==========================================================
# Global Exception Handlers
# ==========================================================
app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)


# ==========================================================
# API Routers
# ==========================================================

# Authentication & User APIs
app.include_router(
    user_router,
    prefix="/api"
)

# Resume APIs
app.include_router(
    resume_router,
    prefix="/api/resume",
    tags=["Resume"]
)


# ==========================================================
# Root Endpoint
# ==========================================================
@app.get("/", tags=["Home"])
async def root():
    return {
        "message": "Welcome to Resume Builder API",
        "version": settings.APP_VERSION,
        "status": "Running"
    }


# ==========================================================
# Health Check
# ==========================================================
@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "Healthy"
    }