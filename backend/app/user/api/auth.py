from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.user.schemas.user import (
    UserCreate,
    UserResponse
)

from app.user.schemas.auth import (
    LoginRequest,
    TokenResponse
)

from app.user.services.auth_services import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================================================
# Register User
# ==========================================================
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    auth_service = AuthService(db)
    return auth_service.register_user(user)


# ==========================================================
# Login User (OAuth2 Compatible)
# ==========================================================
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    print("=" * 50)
    print("Username:", form_data.username)
    print("Password:", form_data.password)

    auth_service = AuthService(db)

    login_data = LoginRequest(
        email=form_data.username,
        password=form_data.password
    )

    return auth_service.login(login_data)