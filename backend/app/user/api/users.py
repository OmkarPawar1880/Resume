from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.session import get_db

from app.user.models.user import User
from app.user.schemas.auth import (
    ChangePasswordRequest,
    MessageResponse,
)
from app.user.schemas.user import (
    UserResponse,
    UserUpdate,
)
from app.user.services.user_services import UserService


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# ==========================================================
# Get Current User
# ==========================================================
@router.get(
    "/me",
    response_model=UserResponse
)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    """
    Get logged-in user's profile.
    """
    return current_user


# ==========================================================
# Update Profile
# ==========================================================
@router.put(
    "/me",
    response_model=UserResponse
)
def update_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Update logged-in user's profile.
    """

    service = UserService(db)

    return service.update_profile(
        current_user,
        user_update,
    )


# ==========================================================
# Change Password
# ==========================================================
@router.put(
    "/change-password",
    response_model=MessageResponse
)
def change_password(
    password_data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Change logged-in user's password.
    """

    service = UserService(db)

    service.change_password(
        current_user=current_user,
        current_password=password_data.current_password,
        new_password=password_data.new_password,
    )

    return MessageResponse(
        message="Password changed successfully."
    )


# ==========================================================
# Delete Account
# ==========================================================
@router.delete(
    "/me",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK
)
def delete_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Delete logged-in user's account.
    """

    service = UserService(db)

    service.delete_account(current_user)

    return MessageResponse(
        message="Account deleted successfully."
    )