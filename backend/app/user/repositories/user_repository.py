from uuid import UUID

from sqlalchemy.orm import Session

from app.user.models.user import User
from app.user.schemas.user import UserCreate, UserUpdate


class UserRepository:
    """
    Repository for User database operations.
    """

    def __init__(self, db: Session):
        self.db = db

    # ==========================================================
    # Create User
    # ==========================================================
    def create_user(
        self,
        user: UserCreate,
        hashed_password: str
    ) -> User:

        new_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            phone=user.phone,
            password_hash=hashed_password,
        )

        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)

        return new_user

    # ==========================================================
    # Get User By ID
    # ==========================================================
    def get_by_id(
        self,
        user_id: UUID
    ) -> User | None:

        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    # ==========================================================
    # Get User By Email
    # ==========================================================
    def get_by_email(
        self,
        email: str
    ) -> User | None:

        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    # ==========================================================
    # Update User
    # ==========================================================
    def update_user(
        self,
        db_user: User,
        user_update: UserUpdate
    ) -> User:

        update_data = user_update.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_user, key, value)

        self.db.commit()
        self.db.refresh(db_user)

        return db_user

    # ==========================================================
    # Update Password
    # ==========================================================
    def update_password(
        self,
        db_user: User,
        hashed_password: str
    ) -> User:

        db_user.password_hash = hashed_password

        self.db.commit()
        self.db.refresh(db_user)

        return db_user

    # ==========================================================
    # Delete User
    # ==========================================================
    def delete_user(
        self,
        db_user: User
    ) -> None:

        self.db.delete(db_user)
        self.db.commit()