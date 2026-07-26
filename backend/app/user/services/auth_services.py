from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.hashing import password_hasher
from app.core.jwt import jwt_handler

from app.user.repositories.user_repository import UserRepository

from app.user.schemas.user import UserCreate
from app.user.schemas.auth import (
    LoginRequest,
    TokenResponse
)

from app.user.models.user import User


class AuthService:

    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)

    # ======================================================
    # Register User
    # ======================================================
    def register_user(
        self,
        user: UserCreate
    ) -> User:

        # Check email already exists
        existing_user = self.user_repository.get_by_email(
            user.email
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered."
            )

        # Hash Password
        hashed_password = password_hasher.hash_password(
            user.password
        )

        # Save User
        return self.user_repository.create_user(
            user=user,
            hashed_password=hashed_password
        )

    # ======================================================
    # Login
    # ======================================================
    def login(
        self,
        login_data: LoginRequest
    ) -> TokenResponse:

        print("=" * 60)
        print("LOGIN REQUEST")
        print("Email Received:", login_data.email)
        print("Password Received:", login_data.password)

        user = self.user_repository.get_by_email(
            login_data.email
        )

        print("User Found:", user)

        if not user:
            print("ERROR: User not found")

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )

        print("Stored Password Hash:")
        print(user.password_hash)

        is_valid = password_hasher.verify_password(
            login_data.password,
            user.password_hash
        )

        print("Password Valid:", is_valid)

        if not is_valid:
            print("ERROR: Password verification failed")

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )

        print("Login Successful")

        access_token = jwt_handler.create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
            }
        )

        refresh_token = jwt_handler.create_refresh_token(
            {
                "sub": str(user.id)
            }
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )