from fastapi import APIRouter

from app.user.api.auth import router as auth_router
from app.user.api.users import router as users_router

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

router.include_router(auth_router)
router.include_router(users_router)