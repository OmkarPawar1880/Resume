from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.hashing import password_hasher

from app.user.models.user import User
from app.user.repositories.user_repository import UserRepository
from app.user.schemas.user import UserUpdate


class UserService:
    """
    Business logic for user operations.
    """

    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)

    # ==========================================================
    # Get User by ID
    # ==========================================================
    def get_user_by_id(self, user_id: UUID) -> User:

        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found."
            )

        return user

    # ==========================================================
    # Update Profile
    # ==========================================================
    def update_profile(
        self,
        current_user: User,
        user_update: UserUpdate
    ) -> User:

        return self.user_repository.update_user(
            current_user,
            user_update
        )

    # ==========================================================
    # Change Password
    # ==========================================================
    def change_password(
        self,
        current_user: User,
        current_password: str,
        new_password: str
    ) -> User:

        if not password_hasher.verify_password(
            current_password,
            current_user.password_hash
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect."
            )

        hashed_password = password_hasher.hash_password(
            new_password
        )

        return self.user_repository.update_password(
            current_user,
            hashed_password
        )

    # ==========================================================
    # Delete Account
    # ==========================================================
    def delete_account(
        self,
        current_user: User
    ) -> None:

        self.user_repository.delete_user(current_user)