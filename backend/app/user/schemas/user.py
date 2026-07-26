from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# ==========================================================
# Base User Schema
# ==========================================================
class UserBase(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=15)


# ==========================================================
# Register User
# ==========================================================
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)


# ==========================================================
# Update User
# ==========================================================
class UserUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=2, max_length=100)
    last_name: str | None = Field(default=None, min_length=2, max_length=100)
    phone: str | None = Field(default=None, max_length=15)


# ==========================================================
# User Response
# ==========================================================
class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime