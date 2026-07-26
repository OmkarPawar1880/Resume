from fastapi import APIRouter

from app.user.api.router import router as user_router
from app.resume.api.router import router as resume_router

api_router = APIRouter()

# User Module
api_router.include_router(user_router)

# Resume Module
api_router.include_router(resume_router)