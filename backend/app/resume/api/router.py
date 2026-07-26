from fastapi import APIRouter

from app.resume.api.resume import router as resume_router

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

router.include_router(resume_router)